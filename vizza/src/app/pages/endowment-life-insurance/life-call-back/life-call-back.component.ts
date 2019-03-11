import {Component, Inject, OnInit} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {AuthService} from '../../../shared/services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LifeService} from '../../../shared/services/life.service';
import {ToastrService} from 'ngx-toastr';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import {ValidationService} from '../../../shared/services/validation.service';
import {Settings} from '../../../app.settings.model';
import {AppSettings} from '../../../app.settings';

export const MY_FORMATS = {
    parse: {
        dateInput: 'DD/MM/YYYY',
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MM YYYY',
        dateA11yLabel: 'DD/MM/YYYY',

        monthYearA11yLabel: 'MM YYYY',
    },
};
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
  public productId : any;
  public time : any;
  public dobError : any;
  public minDate : any;
  public today : any;
  public setFtime : any;
  public settings: Settings;

  meridian = true;


    constructor(public dialogRef : MatDialogRef<LifeCallBackComponent>,
              @Inject(MAT_DIALOG_DATA)public data: any,public auth: AuthService, public FromBuilder: FormBuilder,public fb: FormBuilder,public lifeservices: LifeService,public toastr : ToastrService, public datepipe: DatePipe, public validation: ValidationService,public appSettings: AppSettings,) {
        this.productId = data.productId;
        const minDate = new Date();
        this.minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
        let today  = new Date();
        this.today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        this.settings = this.appSettings.settings;

        this.Lifeapp = this.fb.group({
            'CompanyName': ['', Validators.compose([Validators.required])],
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

    nameValidate(event: any){
        this.validation.nameValidate(event);
    }
    // Dob validation
    dobValidate(event: any){
        this.validation.dobValidate(event);
    }
    // Number validation
    numberValidate(event: any){
        this.validation.numberValidate(event);
    }
    addEvent(event,type) {
        if (event.value != null) {
            let selectedDate = '';
            let dob = '';
            if (typeof event.value._i == 'string') {
                const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
                if (pattern.test(event.value._i) && event.value._i.length == 10) {
                    alert('jjjj');
                    if(type == 'endomentdate'){
                        this.dobError = '';
                    }else {
                        this.dobError = '';
                    }

                } else {
                    if(type == 'endomentdate'){
                        this.dobError = 'Enter Valid Date';
                    }else{
                        this.dobError = 'Enter Valid Date';
                    }
                }
            } else {
                this.dobError = '';
            }

        }
    }
    ageCalculate(dob) {
        let today = new Date();
        let birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        let dd = today.getDate()- birthDate.getDate();
        if( m < 0 || m == 0 && today.getDate() < birthDate.getDate()){
            age = age-1;
        }
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
            //date
            let date = this.datepipe.transform(this.Lifeapp.controls['appdate'].value, 'yyyy-MM-dd');
            //time
            let setTime = this.Lifeapp.controls['apptime'].value;
            let hr = setTime.hour < '10' ? '0' + setTime.hour : setTime.hour.toString();
            let mns = setTime.minute < '10' ? '0' + setTime.minute : setTime.minute.toString();
            let hours = hr[0] + hr[1];
            let min = mns[0] + mns[1];
            if (parseInt(hours) < 12 ) {
                if (hours == 0) {
                    hours = 12;
                }
                this.setFtime = hours + ':' + min + ' AM';
            } else if (parseInt(hours) > 12 ) {
                hours = hours - 12;
                hours = (hours.length < 10) ? '0' + hours : hours;
                this.setFtime = hours + ':' + min + ' PM';
            } else {
                this.setFtime = hours + ':' + min + ' PM';
            }
            const data = {
                'platform': 'web',
                'user_id':this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
                'role_id':this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
                'product_id': this.productId,
                'appoinment_date': date,
                'time': this.setFtime,
                'mobile': this.Lifeapp.controls['mobile'].value,
                'email': this.Lifeapp.controls['email'].value,
                'contact_person' : this.Lifeapp.controls['contactperson'].value,
                'pincode': this.Lifeapp.controls['pincode'].value,
                'call_or_meetperson': this.Lifeapp.controls['appointmentwith'].value,
                'company_name': this.Lifeapp.controls['CompanyName'].value

            };
            this.settings.loadingSpinner = true;
            this.lifeservices.getLifeAssistDetails(data).subscribe(
                (successData) => {
                    this.lifeAppointmentSuccess(successData);
                },
                (error) => {
                    this.lifeAppointmentFailure(error);
                }
            );
        }
    }
    lifeAppointmentSuccess(successData) {
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {
            this.dialogRef.close()
            this.toastr.success('Endowment Life created successfully!!');
        }else{
            this.toastr.error(successData.ErrorObject);
        }
    }
    lifeAppointmentFailure(error) {
        this.settings.loadingSpinner = false;
    }
}
