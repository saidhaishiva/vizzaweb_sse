import {Component, Inject, OnInit} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {AuthService} from '../../../shared/services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LifeService} from '../../../shared/services/life.service';
import {ToastrService} from 'ngx-toastr';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-life-call-back',
  templateUrl: './life-call-back.component.html',
  styleUrls: ['./life-call-back.component.scss']
})
export class LifeCallBackComponent implements OnInit {
  public Lifeapp: FormGroup;
  public title : any;
  public pin : any;
  public pincodeErrors : any;
  public setDate: any;

  meridian = true;

  constructor(public dialogRef : MatDialogRef<LifeCallBackComponent>,
              @Inject(MAT_DIALOG_DATA)public auth:AuthService, public FromBuilder: FormBuilder,public fb: FormBuilder,public lifeservices:LifeService,public toastr :ToastrService, public datepipe: DatePipe,) {
        this.Lifeapp = this.fb.group({
            'insurance': ['', Validators.compose([Validators.required])],
            'name': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            'contactperson': ['', Validators.compose([Validators.required])],
            'mobile': ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}'), Validators.minLength(10)])],
            'email': ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
            'pincode': ['', Validators.compose([Validators.required])],
            'appointmentwith': ['', Validators.compose([Validators.required])],
            'appdate': ['', Validators.required],
            'apptime': ''
        });
  }

  ngOnInit() {
      this.setDate = Date.now();
      this.setDate = this.datepipe.transform(this.setDate, 'y-MM-dd');
  }

  onNoClick(): void {
    this.dialogRef.close()
  }
    getPincodeDetails(pin, title) {
        this.pin = pin;
        this.title = title;
        const data = {
            'platform': 'web',
            'postalcode': this.pin
        }
        if (this.pin.length == 6) {
            this.lifeservices.getPincodeDetails(data).subscribe(
                (successData) => {
                    this.getPincodeDetailsSuccess(successData);
                },
                (error) => {
                    this.getPincodeDetailsFailure(error);
                }
            );
        }
    }
    public getPincodeDetailsSuccess(successData) {
        if (successData.ErrorObject) {
            this.toastr.error(successData.ErrorObject);
            this.pincodeErrors = false;
        } else {
            this.pincodeErrors = true;
        }
    }

    public getPincodeDetailsFailure(error) {
    }
    LifeKeeper(value) {
        if (this.Lifeapp.valid) {
            const data = {
                'platform': 'web',
                'user_id':'0',
                'role_id':'1',
                'product_id':'3',
                'appointment_date': this.setDate,
                'appointment_time': "10.00 PM",
                'company_name': this.Lifeapp.controls['name'].value,
                'mobile': this.Lifeapp.controls['mobile'].value,
                'email': this.Lifeapp.controls['email'].value,
                'contact_person' : this.Lifeapp.controls['contactperson'].value,
                'pincode': this.Lifeapp.controls['pincode'].value,
                'inurance_type': this.Lifeapp.controls['insurance'].value,
                'call_or_meetperson': this.Lifeapp.controls['appointmentwith'].value,

            };

            this.lifeservices.getLifeAssistDetails(data).subscribe(
                (successData) => {
                    this.fixAppointmentSuccess(successData);
                },
                (error) => {
                    this.fixAppointmentFailure(error);
                }
            );
        }
    }
    fixAppointmentSuccess(successData) {
    }
    fixAppointmentFailure(error) {
    }
}
