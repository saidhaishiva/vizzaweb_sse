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
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';

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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ]
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
    policyTypes: any;
    paymentFrequency: any;
    allImage: any;
    fileDetails: any;
    getUrl: any;
    url: any;
    fileUploadPath: any;
    today: any;
    maxDate: any;
    dateError: any;

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
      this.settings = this.appSettings.settings;
      this.webhost = this.config.getimgUrl();
      this.settings.HomeSidenavUserBlock = true;
       this.settings.sidenavIsOpened = true;
        this.settings.sidenavIsPinned = true;
      console.log(this.settings, 'this.settings');
      this.commentBox = false;
      this.selectDate = '';
      this.fileUploadPath = '';
      this.allImage = [];
      this.today = new Date();


      this.paymentFrequency = [
          {'id': 1, 'name': 'Annually'},
          {'id': 2, 'name': 'Half Yearly'},
          {'id': 3, 'name': 'Quarterly'},
          {'id': 4, 'name': 'Monthly'}
      ];
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
      this.getPolicyTypes();
  }
    addEvent(event) {
      console.log(event, 'chek dateeeeee');
        this.selectDate = event.value;
        this.setDate = this.datepipe.transform(this.selectDate, 'y-MM-dd');
    }
    chooseDate(event, type) {
        console.log(event, 'event');
        this.maxDate = '';
        if (event.value != null) {
            if (typeof event.value._i == 'string') {
                const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
                if (pattern.test(event.value._i) && event.value._i.length == 10) {
                    this.dateError = '';
                } else {
                    this.dateError = 'Enter Valid Date';
                }
                let selectedDate;
                selectedDate = event.value._i;
                console.log(selectedDate, 'selectedDate');

                if (selectedDate.length == 10) {
                    if (type == 'sDate') {
                        this.maxDate = event.value;
                    }
                }
            } else if (typeof event.value._i == 'object') {
                this.dateError = '';
                console.log(event.value, 'event.value');
                if (type == 'sDate') {
                    this.maxDate = event.value;
                }
            }
            console.log(this.maxDate, 'maxDate22');
        }
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
    selectPolicyType(compId) {
        this.getcompanyList(compId);
    }
    getPolicyTypes() {
        const data = {
            'platform': 'web',
            "user_id": this.auth.getPosUserId() != null  ? this.auth.getPosUserId() : '0',
            "role_id": this.auth.getPosRoleId() != null  ? this.auth.getPosRoleId() : '4'
        }
        this.common.policyTypes(data).subscribe(
            (successData) => {
                this.getpolicytypeSuccess(successData);
            },
            (error) => {
                this.getpolicytypeFailure(error);
            }
        );
    }
    public getpolicytypeSuccess(successData) {
        if (successData.IsSuccess) {
            this.policyTypes = successData.ResponseObject;
        }
    }
    public getpolicytypeFailure(error) {
        console.log(error);
    }

    getcompanyList(cid) {
        const data = {
            'platform': 'web',
            "user_id": this.auth.getPosUserId() != null  ? this.auth.getPosUserId() : '4',
            "role_id": this.auth.getPosRoleId() != null  ? this.auth.getPosRoleId() : '0',
            "insure_company_type_id": cid
        };
        console.log(data, 'data');
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
            console.log(data,'datadata');

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
        console.log(error);
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


    readUrl(event: any) {
        this.getUrl = '';
            let getUrlEdu = [];
            this.fileDetails = [];
            for (let i = 0; i < event.target.files.length; i++) {
                this.fileDetails.push({'image': '', 'size': event.target.files[i].size, 'type': event.target.files[i].type, 'name': event.target.files[i].name});
            }
            for (let i = 0; i < event.target.files.length; i++) {
                const reader = new FileReader();
                reader.onload = (event: any) => {
                    this.url = event.target.result;
                    getUrlEdu.push(this.url.split(','));
                    this.onUploadFinished(getUrlEdu);
                };
                reader.readAsDataURL(event.target.files[i]);
            }
    }
    onUploadFinished(event) {
        this.allImage.push(event);
    }
    onUpload() {
        const data = {
            'platform': 'web',
            'image_path': ''
        };
        let length = this.allImage.length-1;
        console.log(length, 'this.lengthlength');
        for (let k = 0; k < this.allImage[length].length; k++) {
            this.fileDetails[k].image = this.allImage[length][k][1];
        }
        data.image_path = this.fileDetails;
        console.log(data, 'dattattatata');
        this.common.fileUploadPolicy(data).subscribe(
            (successData) => {
                this.fileUploadSuccess(successData);
            },
            (error) => {
                this.fileUploadFailure(error);
            }
        );
    }

    public fileUploadSuccess(successData) {
        if (successData.IsSuccess) {
            this.fileUploadPath = successData.ResponseObject.imagePath;
            this.toastr.success( successData.ResponseObject.message);
        } else {
            this.toastr.error(successData.ErrorObject, 'Failed');
        }
    }

    public fileUploadFailure(error) {
        console.log(error);
    }
    public data(event: any) {
        if (event.charCode !== 0) {
            const pattern = /[a-zA-Z\\ ]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }


}
