import {Component, Inject, OnInit} from '@angular/core';
import { Settings} from '../../app.settings.model';
import { AuthService} from '../../shared/services/auth.service';
import { Router, ActivatedRoute} from '@angular/router';
import { ToastrService} from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CommonService} from '../../shared/services/common.service';
import { AppSettings} from '../../app.settings';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ComparelistComponent} from '../health-insurance/comparelist/comparelist.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
    public form: FormGroup;
    public settings: Settings;
    public url: any;
    public uploadAddressProofName: any;
    public uploadType: any;
    public getBase64: any;
    public fileUploadPath: any;
    public data: any;
    public getUrl: any;
    public fileDetails: any;
    public allImage: any;

    public uploadTypeTest: any;
    imageSrc: string;


    constructor(public dialogRef: MatDialogRef<ComparelistComponent>,
              @Inject(MAT_DIALOG_DATA)  public data1: any,  public fb: FormBuilder, public commonService: CommonService, public auth: AuthService, public toastr: ToastrService, public appSettings: AppSettings,public common: CommonService) {
      this.settings = this.appSettings.settings;
      this.fileUploadPath = '';
      this.allImage = [];


      this.form = this.fb.group({
          'name': ['', Validators.compose([Validators.required])],
          'email': ['', Validators.compose([Validators.required])],
          'subject': ['', Validators.compose([Validators.required])],
          'message': ['', Validators.compose([Validators.required])],
          // 'profile': ['',Validators.compose( [Validators.required])]

      });
  }

  ngOnInit() {
      this.uploadTypeTest= true;
      this.imageSrc = '';
      this.uploadType = '';
      this.getBase64 = '';
  }
    public contactDetails(): void {
        if (this.form.valid) {
            const data = {
                'name': this.form.controls['name'].value,
                'email': this.form.controls['email'].value,
                'subject': this.form.controls['subject'].value,
                'message': this.form.controls['message'].value,
                'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
                'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
                'platform': 'web',
                'base64': this.getBase64,
                'file_ext': this.uploadType
            };
            this.commonService.contactDetails(data).subscribe(
                (successData) => {
                    this.getDetailsSuccess(successData);
                },
                (error) => {
                    this.getDetailsFailure(error);
                }
            );
        }
    }
    public getDetailsSuccess(successData) {
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {
            this.dialogRef.close();
            this.data = successData.ResponseObject;
        } else {
            this.toastr.success('Contact details added successfully');
        }
    }

    // handle error data

    public getDetailsFailure(error) {
        // console.log(error);
        this.settings.loadingSpinner = false;
    }

    uploadProof(event: any) {
        let getUrlEdu = [];
        // let typeList = [];
        for (let i = 0; i < event.target.files.length; i++) {
            const reader = new FileReader();
            reader.onload = (event: any) => {
                this.url = event.target.result;
                getUrlEdu.push(this.url.split(','));
                this.onUploadFinished(getUrlEdu);
            };
            reader.readAsDataURL(event.target.files[i]);
        }
        this.uploadAddressProofName = event.target.files[0].name;
        this.uploadType =  event.target.files[0].type;
        this.uploadTypeTest = true;
        // console.log(this.uploadType, 'jhgfghj');
        // console.log(event, 'jhgfghj');
        //   typeList = split( event.target.files[0].type);
        //   console.log(typeList, 'typeList');
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];

            const reader = new FileReader();
            reader.onload = e => this.imageSrc = reader.result;

            reader.readAsDataURL(file);
            // console.log(reader,'sssssss');
            // console.log(this.imageSrc,'this.imageSrc');

        }
    }
    onUploadFinished( basecode) {
        this.getBase64 = basecode[0][1];
    }


}
