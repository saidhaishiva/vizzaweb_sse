import { Component, OnInit } from '@angular/core';
import {AppSettings} from '../../app.settings';
import {Settings} from '../../app.settings.model';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {DatePipe} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {CommonService} from '../../shared/services/common.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';

@Component({
  selector: 'app-renewal-reminder',
  templateUrl: './renewal-reminder.component.html',
  styleUrls: ['./renewal-reminder.component.scss']
})
export class RenewalReminderComponent implements OnInit {
  public form: FormGroup;
  constructor(public auth: AuthService, public fb: FormBuilder, public datepipe: DatePipe , public appSettings: AppSettings, public toastr: ToastrService, public config: ConfigurationService, public common: CommonService, public dialog: MatDialog) {
    this.form =  this.fb.group({
      'insurename': ['', Validators.compose([Validators.required])],
      'startdate': ['', Validators.compose([Validators.required])],
      'enddate': ['', Validators.compose([Validators.required])],
      'insureemail': ['', Validators.compose([Validators.required,Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
      'insurepolicytype':  ['', Validators.compose([Validators.required])],
      'insuremobile': ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}'), Validators.minLength(10)])],
      'insurepolicyno': ['', Validators.compose([Validators.required])],
      'insurepremiumamount': ['', Validators.compose([Validators.required])],
      'insurecompanyname': ['',Validators.compose([Validators.required])],
      'paymentfrequeny': ['',Validators.compose([Validators.required])]
    });

  }

  ngOnInit() {
  }


  renewal(values){
    if (this.form.valid) {
      let sdate = this.datepipe.transform(this.form.controls['startdate'].value, 'y-MM-dd');
      let edate = this.datepipe.transform(this.form.controls['enddate'].value, 'y-MM-dd');
      const data = {
        'platform': 'web',
        'user_id': this.auth.getPosUserId() != null  ? this.auth.getPosUserId() : '0',
        'role_id': this.auth.getPosRoleId() != null  ? this.auth.getPosRoleId() : '4',
        'insure_name': this.form.controls['insurename'].value,
        'insure_start_date': sdate,
        'insure_end_date': edate,
        'insure_email': this.form.controls['insureemail'].value,
        'insure_policy_type': this.form.controls['insurepolicytype'].value,
        'insure_mobile': this.form.controls['insuremobile'].value,
        'insure_policy_no': this.form.controls['insurepolicyno'].value,
        'insure_premium_amount' : this.form.controls['insurepremiumamount'].value,
        'insure_company_name': this.form.controls['insurecompanyname'].value,
        'insure_payment_frequency': this.form.controls['paymentfrequeny'].value
      };

      this.common.policyRenewal(data).subscribe(
          (successData) => {
            this.policyRenewalSuccess(successData);
          },
          (error) => {
            this.policyRenewalFailure(error);
          }
      );
    }
  }
  policyRenewalSuccess(successData) {
    if (successData.IsSuccess) {
      this.toastr.success(successData.ResponseObject);
      this.form =  this.fb.group({
        'insurename': '',
        'startdate': '',
        'enddate': '',
        'insureemail': '',
        'insurepolicytype':  '',
        'insuremobile': '',
        'insurepolicyno': '',
        'insurepremiumamount': '',
        'insurecompanyname': '',
        'paymentfrequeny': ''
      });
    } else {
      this.toastr.error(successData.ErrorObject);
    }
  }
  policyRenewalFailure(error) {
  }
  public keyPress(event: any) {
    if (event.charCode !== 0) {
      const pattern = /[0-9]/;
      const inputChar = String.fromCharCode(event.charCode);

      if (!pattern.test(inputChar)) {
        event.preventDefault();
      }
    }
  }

}
