import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {DatePipe} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {CommonService} from '../../shared/services/common.service';
import {HealthService} from '../../shared/services/health.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {ViewChild} from '@angular/core';
import {AppSettings} from '../../app.settings';
import {Settings} from '../../app.settings.model';
import {ValidationService} from '../../shared/services/validation.service';
import {Router} from '@angular/router';
// import { StarhealthRenewelProposalComponent } from './pages/star-renewal/starhealth-renewel-proposal/starhealth-renewel-proposal.component';
import { StarhealthRenewelProposalComponent} from './starhealth-renewel-proposal/starhealth-renewel-proposal.component';

import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';


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
  selector: 'app-star-renewal',
  templateUrl: './star-renewal.component.html',
  styleUrls: ['./star-renewal.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class StarRenewalComponent implements OnInit {
  public form: FormGroup;
  public setDate: any;
  public selectDate: any;
  public settings: Settings;
  commentBox: boolean;
  testimonialLists: any;
  companyList: any;
  comments: any;
  webhost: any;
  policyTypes: any;
  paymentFrequency: any;
  allImage: any;
  fileDetails: any;
  url: any;
  getUrl: any;
  today: any;
  maxDate: any;
  sdateError: any;
  edateError: any;


  constructor(public auth: AuthService, public fb: FormBuilder, public datepipe: DatePipe ,public validation: ValidationService, public appSettings: AppSettings, public toastr: ToastrService, public config: ConfigurationService, public healthService: HealthService, public dialog: MatDialog,public router: Router) {
    this.form =  this.fb.group({
      'insurename': ['', Validators.compose([Validators.required])],
      'startdate': ['', Validators.compose([Validators.required])],
      'insurepolicyno': ['', Validators.compose([Validators.required])],
    });
    this.settings = this.appSettings.settings;
    this.webhost = this.config.getimgUrl();
    this.settings.HomeSidenavUserBlock = false;
    this.settings.sidenavIsOpened = false;
    this.settings.sidenavIsPinned = false;
    this.commentBox = false;
    this.selectDate = '';
    this.allImage = [];
    let today = new Date();
    this.today = new Date(today.getFullYear(), today.getMonth(), today.getDate());


  }

  ngOnInit() {
  }

  starrenewal(values){
    if (this.form.valid) {
      let sdate = this.datepipe.transform(this.form.controls['startdate'].value, 'y-MM-dd');
      const data = {
        'platform': 'web',
        'user_id': this.auth.getPosUserId() != null  ? this.auth.getPosUserId() : '0',
        'role_id': this.auth.getPosRoleId() != 0  ? this.auth.getPosRoleId() : '4',
        "pos_status":"0",
        'company_name': this.form.controls['insurename'].value,
        'proposer_dob': sdate,
        'policy_no': this.form.controls['insurepolicyno'].value,
      };
      console.log(data,'data');

      this.healthService.starpolicyRenewalRemainder(data).subscribe(
          (successData) => {
            this.starpolicyRenewalSuccess(successData);
            this.router.navigate(['/starhealthrenewalproposal']);
          },
          (error) => {
            this.starpolicyRenewalFailure(error);
          }
      );
    }
  }
  starpolicyRenewalSuccess(successData) {
    if (successData.IsSuccess == true) {
      this.toastr.success(successData.ResponseObject);
      console.log(successData.ResponseObject,'result')
    } else {
      this.toastr.error(successData.ErrorObject);
    }
  }
  starpolicyRenewalFailure(error) {
  }
  chooseDate(event, type) {
    this.maxDate = '';
    if (event.value != null) {
      if (typeof event.value._i == 'string') {
        const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
        if(type == 'sDate'){
          if (pattern.test(event.value._i) && event.value._i.length == 10) {
            this.sdateError = '';
          } else {
            this.sdateError = 'Enter Valid Date';
          }
        }else{
          if (pattern.test(event.value._i) && event.value._i.length == 10) {
            this.edateError = '';
          } else {
            this.edateError = 'Enter Valid Date';
          }
        }

        let selectedDate;
        selectedDate = event.value._i;

        if (selectedDate.length == 10) {
          if (type == 'sDate') {
            this.maxDate = event.value;
          }
        }
      } else if (typeof event.value._i == 'object') {
        this.sdateError = '';
        if (type == 'sDate') {
          this.maxDate = event.value;
        }
      }
    }
  }


}
