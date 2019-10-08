import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonService} from '../../shared/services/common.service';
import {DatePipe} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {ValidationService} from '../../shared/services/validation.service';
import {AuthService} from '../../shared/services/auth.service';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {Settings} from '../../app.settings.model';
import {AppSettings} from '../../app.settings';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {PersonalInsurer} from '../personal-accident-home/personal-accident-home.component';


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
  selector: 'app-bajaj-gold-suraksha',
  templateUrl: './bajaj-gold-suraksha.component.html',
  styleUrls: ['./bajaj-gold-suraksha.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class BajajGoldSurakshaComponent implements OnInit {
  public bajajgold: FormGroup;
  public setDate: any;
  public selectDate: any;
  public productName: any;
  public pin:any;
  public title: any;
  public response: any;
  public redirectUrl: any;
  public pincodeErrors: any;
  public webhost: any;
  public settings: Settings;

  constructor(public fb: FormBuilder, public commonservices: CommonService,public auth: AuthService, public validation: ValidationService,public datepipe: DatePipe, public route: ActivatedRoute, public toastr: ToastrService, public dialog: MatDialog,public config: ConfigurationService,public appSettings: AppSettings) {
    this.settings = this.appSettings.settings;
    this.webhost = this.config.getimgUrl();
    if(window.innerWidth < 787){
      this.settings.HomeSidenavUserBlock = false;
      this.settings.sidenavIsOpened = false;
      this.settings.sidenavIsPinned = false;
    }else{
      this.settings.HomeSidenavUserBlock = true;
      this.settings.sidenavIsOpened = true;
      this.settings.sidenavIsPinned = true;
    }
    this.bajajgold = this.fb.group({
      'gender': ['', Validators.required],
      'fname': ['', Validators.required],
      'lname': ['', Validators.required],
      'frequency': ['', Validators.required],
      'dob': ['', Validators.required],
      'mobile': ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}'), Validators.minLength(10)])],
      'email': ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
      'pincode': ['', Validators.required],
      'paymentTerm': ['', Validators.required],
      'policyTerm': ['', Validators.required],
      'premium': ['', Validators.required]
    });
    this.productName = '';
  }

  ngOnInit() {
    this.setDate = Date.now();
    this.setDate = this.datepipe.transform(this.setDate, 'y-MM-dd');
    this.route.params.forEach((params) => {
      this.productName = params.id;

    });
  }
  FireInsurer() {

  }
  addEvent(event) {
    this.selectDate = event.value;
    this.setDate = this.datepipe.transform(this.selectDate, 'y-MM-dd');
  }
  getSubmitDetails(values) {

    if (this.bajajgold.valid) {
      const data = {
        "platform": "web",
        "created_by": "0",
        'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
        'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
        'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
        "firstName": this.bajajgold.controls['fname'].value,
        "lastName":this.bajajgold.controls['lname'].value,
        "dob": this.bajajgold.controls['dob'].value,
        "gender": this.bajajgold.controls['gender'].value,
        "mobile": this.bajajgold.controls['mobile'].value,
        "email": this.bajajgold.controls['email'].value,
        "pincode": this.bajajgold.controls['pincode'].value,
        "policyTerm": this.bajajgold.controls['policyTerm'].value,
        "paymentTerm": this.bajajgold.controls['paymentTerm'].value,
        "premium":this.bajajgold.controls['premium'].value,
        "paymentFrequency": this.bajajgold.controls['frequency'].value,
        "pos_id": "197"
        // this.auth.getPosUserId() ? this.auth.getPosUserId() : '0'

      };

      this.commonservices.getUpdateDetails(data).subscribe(
          (successData) => {
            this.getUpdateSuccess(successData);
            // this.redirectUrl = successData.ResponseObject.redirect_url;

          },
          (error) => {
            this.getUpdateFailure(error);
          }
      );
    }
  }
  getUpdateSuccess(successData) {
    this.redirectUrl = successData.ResponseObject.redirect_url;
    console.log(this.redirectUrl, 'redirect')
    window.open(this.redirectUrl,'_top');

  }
  getUpdateFailure(error) {
  }
  getPincodeDetails(pin, title) {
    this.pin = pin;
    this.title = title;
    const data = {
      'platform': 'web',
      'postalcode': this.pin
    }
    if (this.pin.length == 6) {
      this.commonservices.getPincodeDetails(data).subscribe(
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
    }else {
      this.pincodeErrors = true;
    }
  }

  public getPincodeDetailsFailure(error) {
  }

  numberValidate(event: any) {
    this.validation.numberValidate(event);
  }
  nameValidate(event: any) {
    this.validation.nameValidate(event);
  }
  bajajgoal() {
    const dialogRef = this.dialog.open(BajajGoal, {
      autoFocus: false,
      maxHeight: '50vh'
    });
    dialogRef.disableClose = true;
  }
}
@Component({
  selector: 'BajajGoal',
  template: `        
        <div  class="container-fluid">
        <div  class="row text-justify">
            <div class="container">
            <div class="col-sm-12 col-md-12  text-right">
                <mat-icon (click)="onNoClick()" style="cursor: pointer">close</mat-icon>
            </div>
            <div class="col-sm-8 col-md-8">
                <h4 class="text-center" style="color: #17a2b8"> Why This Plan Should Not Be Missed by Anyone</h4>
            </div>
            <div id="personal-details">
                <ol class="ml-4">
                    <li> Rare opportunity to lock high returns for the next 10/15 years .</li>
                    <li> Returns of up to 6.20% tax-free.</li>
                    <li>FD rates as of Oct 2018 for 3-year FD is 7.5% and 5-year FD is 7.25% (constantly reducing)</li>
                </ol>
                  The current FD rates of about 7.25% (Oct 2018) will reduce significantly in the coming years because of the following major national and international developments: .
                  <ol class="ml-4">
                    <li> Reduction in crude oil prices .</li>
                    <li> Decline in interest rate of G-Sec (Government of India Securities) .</li>
                    <li>Appreciation of the Rupee.</li>
                    <li>Decline in inflation.</li>
                  </ol>
            </div>
         </div>
        </div>
        </div>`,
})
export class BajajGoal {

  constructor(
      public dialogRef: MatDialogRef<BajajGoal>,
      @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
