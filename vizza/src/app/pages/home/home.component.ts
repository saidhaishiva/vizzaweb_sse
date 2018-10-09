import { Component, OnInit } from '@angular/core';
import {AppSettings} from '../../app.settings';
import {Settings} from '../../app.settings.model';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {DatePipe} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {CommonService} from '../../shared/services/common.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {TestimonialComponent} from './testimonial/testimonial.component';
import {ConfigurationService} from '../../shared/services/configuration.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public form: FormGroup;
    public setDate: any;
    public selectDate: any;
    public settings: Settings;
    commentBox: boolean;
    testimonialLists: any;
    companyList: any;
    comments: any;
    webhost: any;

  constructor(public auth: AuthService, public fb: FormBuilder, public datepipe: DatePipe , public appSettings: AppSettings, public toastr: ToastrService, public config: ConfigurationService, public common: CommonService, public dialog: MatDialog) {
      this.form =  this.fb.group({
          'insurename': ['', Validators.required],
          'startdate': ['', Validators.required],
          'enddate': ['', Validators.required],
          'insureemail': ['', Validators.compose([Validators.required,Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
          'insurepolicytype':  ['', Validators.compose([Validators.required])],
          'insuremobile': ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}'), Validators.minLength(10)])],
          'insurepolicyno': ['', Validators.compose([Validators.required])],
          'insurepremiumamount': ['', Validators.compose([Validators.required])],
          'insurecompanyname': ['',Validators.compose([Validators.required])],
          'paymentfrequeny': ['',Validators.compose([Validators.required])]
      });
      this.settings = this.appSettings.settings;
      this.webhost = this.config.getimgUrl();
      this.settings.HomeSidenavUserBlock = true;
       this.settings.sidenavIsOpened = true;
        this.settings.sidenavIsPinned = true;
      console.log(this.settings, 'this.settings');
      this.commentBox = false;
      this.selectDate = '';
  }

  ngOnInit() {

      this.setDate = Date.now();
      this.setDate = this.datepipe.transform(this.setDate, 'y-MM-dd');
      sessionStorage.nomineeDate = '';
      sessionStorage.familyMembers = '';
      sessionStorage.stepper1Details = '';
      sessionStorage.stepper2Details = '';
      sessionStorage.stepper3Details = '';
      sessionStorage.nomineeData = '';

      //personalaccident components
      sessionStorage.setOccupation = '';
      sessionStorage.setAge = '';
      sessionStorage.setAnnualIncome = '';
      sessionStorage.setPage = '';
      sessionStorage.sideMenu = false;
      sessionStorage.setFamilyDetails = '';
      sessionStorage.setInsuredAmount = '';
      sessionStorage.setPincode = '';
      sessionStorage.setPage = '';
      sessionStorage.policyLists = '';
      sessionStorage.sideMenu = '';
      sessionStorage.sonBTn = '';
      sessionStorage.daughterBTn = '';
      sessionStorage.fatherBTn = '';
      sessionStorage.motherBtn = '';
      sessionStorage.fatherInLawBTn = '';
      sessionStorage.motherInLawBtn = '';
      sessionStorage.changedTabDetails = '';
      sessionStorage.changeSuninsuredAmount = '';
      sessionStorage.changedTabIndex = '';
      sessionStorage.shorListTab = '';
      sessionStorage.enquiryId = '';
      sessionStorage.proposalId = '';
      sessionStorage.mobileNumber = '';
      sessionStorage.ageRestriction = '';
      this.testimonialList();
      this.getcompanyList();
  }
    addEvent(event) {
      console.log(event, 'chek dateeeeee');
        this.selectDate = event.value;
        this.setDate = this.datepipe.transform(this.selectDate, 'y-MM-dd');
    }
    testiComments() {
      // this.commentBox = true;
        let dialogRef = this.dialog.open(TestimonialComponent, {
            width: '800px' });
        dialogRef.disableClose = true;

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.testimonialList();
            }

        });

    }
    onNoClick() {
        this.commentBox = false;
    }



    testimonialList() {
        const data = {
            'platform': 'web'
        }
        this.common.getTestimonialList(data).subscribe(
            (successData) => {
                this.testimonialListSuccess(successData);
            },
            (error) => {
                this.testimonialListFailure(error);
            }
        );
    }
    public testimonialListSuccess(successData) {
        if (successData.IsSuccess == true) {
            this.testimonialLists = successData.ResponseObject;
            console.log(this.testimonialLists);

        }
    }
    public testimonialListFailure(error) {
        console.log(error);
    }
    getcompanyList() {
        const data = {
            'platform': 'web',
            "user_id": this.auth.getPosUserId(),
            "role_id": this.auth.getPosRoleId()
        }
        this.common.getcompanyList(data).subscribe(
            (successData) => {
                this.setcompanyListSuccess(successData);
            },
            (error) => {
                this.setcompanyListFailure(error);
            }
        );
    }
    public setcompanyListSuccess(successData) {
        if (successData.IsSuccess == true) {
            this.companyList = successData.ResponseObject;
            console.log(this.companyList, 'this.companyList');

        }
    }
    public setcompanyListFailure(error) {
        console.log(error);
    }

    home(values){
        if (this.form.valid) {
            console.log(values,'sasdasd');
            const data = {
                'platform': 'web',
                'user_id': this.auth.getPosUserId(),
                'role_id': this.auth.getPosRoleId(),
                'insure_name': 'offline',
                'insure_start_date': this.setDate,
                'insure_end_date': this.setDate,
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
        console.log(successData);
    }
    policyRenewalFailure(error) {
        console.log(error);
    }
    public keyPress(event: any) {
        if (event.charCode !== 0) {
            const pattern = /[0-9\\ ]/;
            const inputChar = String.fromCharCode(event.charCode);

            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }


}
