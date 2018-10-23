import {Component, Inject, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import {CommonService} from '../../../shared/services/common.service';
import {ConfigurationService} from '../../../shared/services/configuration.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ViewdetailsComponent} from '../../health-insurance/viewdetails/viewdetails.component';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss']
})
export class TestimonialComponent implements OnInit {
    public form: FormGroup;
    public fileUploadPath: any;
    type: any;
    size: any;
    getUrl1: any;
    url:any;
    getUrl:any;
    profile:any;
    webhost: any;
    constructor(public dialogRef: MatDialogRef<ViewdetailsComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any, public  fb: FormBuilder ,public config: ConfigurationService, public common: CommonService, public toastr: ToastrService) {
        this.profile = '';
        this.webhost = this.config.getimgUrl();
        this.form = this.fb.group({
            'name': ['', Validators.compose([Validators.required])],
            'designation': ['', Validators.compose([Validators.required])],
            'company': ['', Validators.compose([Validators.required])],
            // 'profile': ['', Validators.compose([Validators.required])],
            'comments': ['', Validators.compose([Validators.required])],
        });
    }


  ngOnInit() {
  }
    onNoClick() {
        this.dialogRef.close();
    }

    submit(form) {
        console.log(form.value, 'formform');
      if (this.form.valid) {
          const data = {
              'platform': 'web',
              'customer_name': this.form.controls['name'].value,
              'designation': this.form.controls['designation'].value,
              'company_name': this.form.controls['company'].value,
              'profile_pic': this.profile == undefined ? '' : this.profile,
              'comments': this.form.controls['comments'].value
          }
          console.log(data);
          this.common.addTestimonial(data).subscribe(
              (successData) => {
                  this.addtestimonialSuccess(successData);
              },
              (error) => {
                  this.addtestimonialFailure(error);
              }
          );
      }
    }
    public addtestimonialSuccess(successData) {
        if (successData.IsSuccess) {
            this.toastr.success(successData.ResponseObject);
            this.dialogRef.close(true);
        }
    }
    public addtestimonialFailure(error) {
        console.log(error);
    }
    readUrl(event: any, type) {
        this.type = type;
        this.size = event.srcElement.files[0].size;
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];

            const reader = new FileReader();

            reader.onload = (event: any) => {
                this.getUrl1 = [];
                this.url = event.target.result;
                this.getUrl = this.url.split(',');
                this.getUrl1.push(this.url.split(','));
                this.onUploadFinished(this.getUrl);

            };
            reader.readAsDataURL(file);
        }
    }
    onUploadFinished(event) {
        this.getUrl = event[1];
        const data = {
            'platform': 'web',
            'uploadtype': 'single',
            'images': this.getUrl,
        };
        console.log(data, 'dfdfdsfdsfdsfds');
        this.common.fileUpload(data).subscribe(
            (successData) => {
                this.fileUploadSuccess(successData);
            },
            (error) => {
                this.fileUploadFailure(error);
            }
        );
    }
    public fileUploadSuccess(successData) {
        if (successData.IsSuccess == true) {
            this.fileUploadPath = successData.ResponseObject.imagePath;
            if (this.type == 'profile') {
                this.profile = this.fileUploadPath;

            }
        } else {
            this.toastr.error(successData.ErrorObject, 'Failed');
        }
    }

    public fileUploadFailure(error) {
        console.log(error);
    }

}
