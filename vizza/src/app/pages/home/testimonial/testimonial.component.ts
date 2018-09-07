import {Component, Inject, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import {CommonService} from '../../../shared/services/common.service';
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

    constructor(public dialogRef: MatDialogRef<ViewdetailsComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any, public  fb: FormBuilder, public common: CommonService, public toastr: ToastrService) {
        this.form = this.fb.group({
            'name': ['', Validators.compose([Validators.required])],
            'mobile': '',
            'comments': ['', Validators.compose([Validators.required])],
        });
    }


  ngOnInit() {
  }
    onNoClick() {
        this.dialogRef.close();
    }

    submit(form) {
      if (this.form.valid) {
          const data = {
              'platform': 'web',
              'customer_name': this.form.controls['name'].value,
              'comments': this.form.controls['comments'].value,
              'customer_mobile': this.form.controls['mobile'].value
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

}
