import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import {Settings} from '../../app.settings.model';
import {AppSettings} from '../../app.settings';
import { ConfigurationService } from '../../shared/services/configuration.service';
import { listTransition } from '../../theme/utils/app-animation';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { AgmCoreModule } from '@agm/core';
import { CommonService } from '../../shared/services/common.service';
import {DocumentViewComponent} from './document-view/document-view.component';
import {FormGroup, FormBuilder,Validators} from "@angular/forms";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {DatePipe} from '@angular/common';
import { ToastrService } from 'ngx-toastr';

declare var google: any;

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
    selector: 'app-posprofile',
    templateUrl: './posprofile.component.html',
    styleUrls: ['./posprofile.component.scss'],
    animations: [ listTransition ],
    host: {
        '[@listTransition]': ''
    },
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ]
})
export class PosprofileComponent implements OnInit {
    public settings: Settings;
    public personal: any;
    public webhost: any;
    public sideNav: any;
    public currentTab: any;
    public selectedTab: any;
    public examSchedule: any;
    public examStatus: any;
    public trainingStatus: any;
    public documentStatus: any;
    public trainingDetails: any;
    public examDetails: any;
    public recentMark: any;
    public posStatus: any;
    public startTrainingDate: any;
    public posDataAvailable : boolean;
    public PersonalTab: any;

    public personaledit: FormGroup;
    public contacts: FormGroup;
    public documents: FormGroup;
    public educationlist: FormGroup;
    public bankdetails: FormGroup;
    pincode: any;
    response: any;
    isChecked: boolean;
    size: any;
    getUrl1: any;
    getUrl: any;
    url: any;
    fileUploadPath: any;
    imagepath: any;
    profile: any;
    mismatchError: any;
    aadharfront: any;
    aadharback: any;
    pancard: any;
    education: any;
    dobError: any;
    dob: any;
    type: any;
    chequeleaf: any;
    viewTab: any;
    hideTab: any;
    tabKey: any;
    tabValue: any;




    personalEdit: any;
    contactEdit: any;
    bankEdit: any;
    educationEdit: any;
    documentEdit: any;
    disabledList: any;
    editAccess: any;
    pincodeErrors: any;



    public personalshow: any;



    @ViewChild('sidenav') sidenav: any;
    public sidenavOpen:boolean = true;

    constructor(public route: ActivatedRoute, public auth: AuthService, public common: CommonService, public appSettings: AppSettings, public config: ConfigurationService,
                public dialog: MatDialog, public router: Router, public fb: FormBuilder, public datepipe: DatePipe, public toastr: ToastrService) {
        this.webhost = this.config.getimgUrl();
        this.settings = this.appSettings.settings;
        this.settings.HomeSidenavUserBlock = false;
        this.settings.sidenavIsOpened = false;
        this.settings.sidenavIsPinned = false;
        this.personalEdit = false;
        this.disabledList = false;
        this.selectedTab = 0;
        this.examStatus = this.auth.getSessionData('examStatus');
        this.trainingStatus = this.auth.getSessionData('trainingStatus');
        console.log(this.examStatus, 'this.examStatus');
        console.log(this.trainingStatus, 'this.trainingStatus');
        this.documentStatus = this.auth.getSessionData('documentStatus');
        this.posStatus = this.auth.getSessionData('posStatus');
        this.sideNav = [];
        console.log(this.documentStatus, 'this.documentStatus');
        this.posDataAvailable = false;
        this.pincodeErrors = false;
        this.editAccess = true;
        this.tabValue = 'Personal';
        this.tabKey = 'edit';
        this.viewTab = true;
        this.hideTab = false;
        this.personaledit = this.fb.group({
            id: null,
            firstname: ['', Validators.compose([Validators.required])],
            lastname: ['', Validators.compose([Validators.required])],
            birthday: ['', Validators.compose([Validators.required])],
            gender: ['', Validators.compose([Validators.required])],
            referralconduct: ['', Validators.compose( [Validators.required, Validators.pattern('[6789][0-9]{9}')])],
            profile: ['',Validators.compose( [Validators.required])],
        });
        this.contacts = this.fb.group({
            email: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
            phone1: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
            phone2: '',
            address1: ['', Validators.compose([Validators.required])],
            address2: '',
            pincode: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        });
        this.documents = this.fb.group({
            aadharnumber: ['', Validators.compose([Validators.required])],
            pannumber: ['', Validators.compose([Validators.required, Validators.pattern('^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$')])],
            aadharfront: ['',Validators.compose( [Validators.required])],
            aadharback: ['',Validators.compose( [Validators.required])],
            pancard: ['',Validators.compose( [Validators.required])]
        });
        this.educationlist = this.fb.group({
            qualification: ['', Validators.compose([Validators.required])],
        });
        this.bankdetails = this.fb.group({
            bankname: ['', Validators.compose([Validators.required])],
            bankbranch: ['', Validators.compose([Validators.required])],
            ifsccode: ['', Validators.compose([Validators.required])],
            accountnumber: ['', Validators.compose([Validators.required])],
            chequeleaf:['', Validators.compose( [Validators.required])]
        });

        this.aadharfront = '';
        this.aadharback = '';
        this.pancard = '';
        this.education = '';
        this.profile='';
        this.type = '';
        this.chequeleaf ='';
        this.getPosProfile();
    }

    ngOnInit() {

        this.getTrainingDetails();
        this.getExamDetails();
        // this.settings.loadingSpinner = false;
        this.currentTab = 'Personal';
        if (this.documentStatus != 2 || this.documentStatus == 2) {
            this.sideNav = [{
                'name': 'Personal',
                'value': 'active',
                'selected': false
            }, {
                'name': 'Contact',
                'value': 'active',
                'selected': false
            },{
                'name': 'Documents',
                'value': 'active',
                'selected': false
            },
                {
                    'name': 'Education',
                    'value': 'active',
                    'selected': false
                },{
                    'name': 'Bank Details',
                    'value': 'active',
                    'selected': false
                }];
        }
        if (this.documentStatus == 2 ) {
            this.sideNav.push({
                    'name': 'Training',
                    'value': 'active',
                    'selected': false
                },
                {
                    'name': 'Examination',
                    'value': 'active',
                    'selected': false
                });

        }

        if (this.documentStatus == 2 && this.trainingStatus == 1) {
            this.sideNav.push({'name': 'Certificate of Training', 'value': 'active', 'selected': false});
        }
        if (this.documentStatus == 2 && this.examStatus == 2) {
            this.sideNav.push({'name': 'Certificate of Examination', 'value': 'active', 'selected': false});
        }
        if (this.posStatus == 1 ) {
            this.sideNav.push(
                {
                    'name': 'Appointment Letter',
                    'value': 'active',
                    'selected': false
                },
                {
                    'name': 'Agreement Letter',
                    'value': 'active',
                    'selected': false
                },);
        }
        this.sideNav[0].selected = true;
    }
    viewDetail(i, value) {
        this.personalEdit = false;
        this.contactEdit = false;
        this.bankEdit = false;
        this.educationEdit = false;
        this.documentEdit = false;
        this.settings.loadingSpinner = true;
        this.selectedTab = i;
        this.currentTab = value;
        if (value == 'Personal' || value == 'Contact' || value == 'Documents' || value == 'Education' || value == 'Bank Details') {
            this.editAccess = true;
        } else {
            this.editAccess = false;
        }
        console.log(this.currentTab);
        let trainingStatus = this.auth.getSessionData('trainingStatus');
        let examStatus = this.auth.getSessionData('examStatus');
        sessionStorage.currentTab = this.currentTab;
        if (value == 'Contact') {
            this.contactEdit = false;
        }

        if (value == 'Training') {
            if (trainingStatus == '0') {
                this.settings.loadingSpinner = true;
                this.router.navigate(['/training']);
            }
        } else if (value == 'Examination') {

            if (trainingStatus == '0') {
                this.examSchedule = 'Please complete training before applying the exam';
            } else if (examStatus == '0') {
                this.router.navigate(['/startexam']);
            }
        }
        setTimeout(() => {
            this.settings.loadingSpinner = false;

        },500);
    }

    //posprofile services
    public getPosProfile() {
        const data = {
            'platform': 'web',
            'roleid': this.auth.getPosRoleId(),
            'userid': this.auth.getPosUserId(),
            'pos_id': this.auth.getPosUserId()
        };
        this.common.getPosProfile(data).subscribe(

            (successData) => {
                this.getPosProfileSuccess(successData);

            },
            (error) => {
                this.getPosProfileFailure(error);
            }
        );
    }
    getPosProfileSuccess(successData) {
        console.log(successData, 'datadatadatadatadatadatadata');
        if (successData.IsSuccess) {
            this.personal = successData.ResponseObject;
            this.documentStatus = this.personal.doc_verified_status;
            this.posDataAvailable = true;
            this.auth.setSessionData('examStatus', this.personal.exam_status);
            this.auth.setSessionData('trainingStatus', this.personal.training_status);
            this.auth.setSessionData('documentStatus', this.personal.doc_verified_status);
            this.auth.setSessionData('posStatus', this.personal.pos_status);
            // edit
            this.personalshow = successData.ResponseObject;
            console.log(this.personalshow);
            let date;
            date = this.personalshow.pos_dob.split('/');
            date = date[2] + '-' + date[1] + '-' + date[0];
            date = this.datepipe.transform(date, 'y-MM-dd');
            console.log(date, 'dateee');
            this.personaledit = this.fb.group({
                id: null,
                firstname: this.personalshow.pos_firstname,
                lastname: this.personalshow.pos_lastname,
                birthday: date,
                gender: this.personalshow.pos_gender,
                referralconduct: this.personalshow.pos_referral_code,
            });
            this.contacts = this.fb.group({
                email: this.personalshow.pos_email,
                phone1: this.personalshow.pos_mobileno,
                phone2: this.personalshow.pos_alternate_mobileno,
                address1: this.personalshow.pos_address1,
                address2: this.personalshow.pos_address2,
                pincode: this.personalshow.pos_postalcode,
                // city: this.personalshow.pos_cityid,
                // state: this.personalshow.pos_stateid,
                // country: this.personalshow.pos_countryid
            });
            this.documents = this.fb.group({
                aadharnumber: this.personalshow.doc_aadhar_no,
                pannumber: this.personalshow.doc_pan_no,

            });
            this.educationlist = this.fb.group({
                qualification: this.personalshow.doc_education,

            });
            this.bankdetails = this.fb.group({
                bankname: this.personalshow.bank_name,
                bankbranch: this.personalshow.branch_name,
                ifsccode: this.personalshow.ifsc_code,
                accountnumber: this.personalshow.bank_acc_no
            });

            this.profile =  this.personalshow.pos_profile_img;
            this.aadharfront = this.personalshow.doc_aadhar_front_img;
            this.aadharback = this.personalshow.doc_aadhar_back_img;
            this.pancard = this.personalshow.doc_pan_img;
            this.education = this.personalshow.doc_edu_certificate_img;
            this.chequeleaf = this.personalshow.check_leaf_upload_img;

        }
    }

    getPosProfileFailure(error) {
        console.log(error);
    }
    public getTrainingDetails() {
        const data = {
            'platform': 'web',
            'roleid': this.auth.getPosRoleId(),
            'userid': this.auth.getPosUserId(),
            'pos_id': this.auth.getPosUserId()
        };
        this.common.getTrainingDetails(data).subscribe(
            (successData) => {
                this.getTrainingDetailSuccess(successData);

            },
            (error) => {
                this.getTrainingDetailFailure(error);
            }
        );
    }
    getTrainingDetailSuccess(successData) {
        console.log(successData);
        if (successData.IsSuccess) {
            this.trainingDetails = successData.ResponseObject;
            if (typeof (this.trainingDetails) != 'string') {

                for (let i = 0; i < this.trainingDetails.length; i++) {
                    let num = this.trainingDetails[i].entry_time;
                    let hours = (num / 60);
                    let rhours = Math.floor(hours);
                    let minutes = (hours - rhours) * 60;
                    let rminutes = Math.round(minutes);
                    this.trainingDetails[i].time = rhours + " hour(s) and " + rminutes + " minute(s).";
                }


                // let len = successData.ResponseObject.length -1;
                this.startTrainingDate = this.trainingDetails[0].training_attend_date;
            }
        }
    }
    getTrainingDetailFailure(error) {
        console.log(error);
    }
    public getExamDetails() {
        const data = {
            'platform': 'web',
            'roleid': this.auth.getPosRoleId(),
            'userid': this.auth.getPosUserId(),
            'pos_id': this.auth.getPosUserId()
        };
        this.common.getExamDetails(data).subscribe(
            (successData) => {
                this.getExamDetailSuccess(successData);

            },
            (error) => {
                this.getExamDetailFailure(error);
            }
        );
    }
    getExamDetailSuccess(successData) {
        console.log(successData);
        if (successData.IsSuccess) {
            this.examDetails = successData.ResponseObject;
            let len = successData.ResponseObject.length -1;
            this.recentMark = this.examDetails[len].percentage_in_exam;
        }
    }
    getExamDetailFailure(error) {
        console.log(error);
    }
    // print the Appointment letter
    printAppointment () {
        let printContents, popupWin;
        printContents = document.getElementById('appointment').innerHTML;
        popupWin = window.open('', '_blank', 'top=100,left=0, bottom=100,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write(`
      <html>
        <head >
         <style>
        </style>
        </head>
       <body onload="window.print();window.close()" >${printContents}
       </body>
        
      
      </html>`
        );
        popupWin.document.close();
    }
    // print the training letter
    printTraining () {
        let printContents, popupWin;
        printContents = document.getElementById('training').innerHTML;
        popupWin = window.open('', '_blank', 'top=100,left=0, bottom=100,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write(`
      <html>
        <head >
         <style>
     @media print {
     .c2-card{
  border-left: 20px solid #219c44;
  background-image: url("./assets/img/pos-bg.png") !important;
  width: 100%;
  background-size: cover !important;
  }
  .c2-card header{
    border-bottom: 1px solid #006738;
    padding-bottom: 20px;
    }
    .c2-card h5{
      color: #006738;
    }
    .c2-card img{
      width: 350px;
    }

  
    .c2-card .c-profile .c-font{
      font-family: 'Parisienne', cursive;
      font-size: 80px;
      color: #443034;
      text-align: right;
    }
    .c2-card .c-profile h5 span{
      background:  #443034;
      color: #fff;
      padding: 10px 30px;
      font-size: 30px;
    }
  
  .c2-card .c-content{
    position: relative;
    border: 2px solid #443034;
    border-radius: 30px;
    padding: 50px;
    background: rgba(255, 255, 255, 0.6);
    margin-top: 45px;
    }
    .c2-card .c-title{
      position: absolute;
      top: -15px;
      right: 0px;
      bottom: 0;
      width: 100%;
      text-align: center;
      }
       .c2-card .c-title span{
        padding: 10px 35px;
        color: #fff;
        font-size: 25px;
        background: rgba(240,24,24,1);
        background: linear-gradient(to right, rgba(240,24,24,1) 0%, rgba(247,148,123,1) 64%, rgba(255,33,33,1) 100%);
      }

    
    .c2-card p{
      font-size: 22px;
    }
 
  .c2-card table {
    font-size: 20px;
    margin: 185px 28px 100px 28px;
    }
    .c2-card table  tr td {
      padding: 10px;
      vertical-align: top;
    }
    .c2-card table  tr td:first-child {
      color: #443034;
  }
  .c2-card footer{
    font-size: 20px;
  }
  }
        </style>
        </head>
       <body onload="window.print();window.close()" >${printContents}
       </body>
        
      
      </html>`
        );
        popupWin.document.close();
    }
    // print the examination letter
    printExamination () {
        let printContents, popupWin;
        printContents = document.getElementById('examination').innerHTML;
        popupWin = window.open('', '_blank', 'top=100,left=0, bottom=100,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write(`
      <html>
        <head >
         <style>
        </style>
        </head>
       <body onload="window.print();window.close()" >${printContents}
       </body>
        
      
      </html>`
        );
        popupWin.document.close();
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

    public dobkeyPress(event: any) {
        if (event.charCode !== 0) {
            const pattern = /[0-9/\\ ]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }

    checkGender() {
        if (this.personaledit['controls']['gender'].value != '' && this.personaledit['controls']['gender'].value != undefined) {
            this.mismatchError = '';
        } else {
            this.mismatchError = 'Gender is required ';
        }
    }

    //Pincode Validation
    public getpostalSuccess(successData) {
        if (successData.IsSuccess) {
            this.response = successData.ResponseObject;
            console.log(this.response);
            this.contacts.controls['city'].setValue(this.response.city);
            this.contacts.controls['state'].setValue(this.response.state);
            this.contacts.controls['country'].setValue(this.response.country);
        } else {
            this.toastr.error('Invalid Pincode');
        }
    }

    labSuccess(successData) {
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {
            this.toastr.success(successData.ResponseObject);
            this.imagepath = '';
            this.fileUploadPath = '';
            this.size = '';
            this.getUrl = '';
            this.url = '';
            this.reset();
        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }
    readUrl(event: any, type) {
        this.type = type;
        this.size = event.srcElement.files[0].size;
        console.log(this.size);
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();

            reader.onload = (event: any) => {
                this.getUrl1 = [];
                this.url = event.target.result;
                this.getUrl = this.url.split(',');
                this.getUrl1.push(this.url.split(','));
                this.onUploadFinished(this.getUrl);

            };
            reader.readAsDataURL(event.target.files[0]);
        }

    }
    onUploadFinished(event) {
        this.getUrl = event[1];
        const data = {
            'platform': 'web',
            "role_id": this.auth.getPosRoleId(),
            'uploadtype': 'single',
            'images': this.getUrl,
        };
        console.log(data, 'dattattatata');
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
            this.fileUploadPath =  successData.ResponseObject.imagePath;
            if (this.type == 'aadhar front') {
                this.aadharfront = this.fileUploadPath;
            }
            if (this.type == 'aadhar back') {
                this.aadharback = this.fileUploadPath;
            }
            if (this.type == 'pancard') {
                this.pancard = this.fileUploadPath;
            }
            if (this.type == 'education') {
                this.education = this.fileUploadPath;
            }
            if (this.type == 'profile'){
                this.profile = this.fileUploadPath;
            }
            if (this.type == 'chequeleaf'){
                this.chequeleaf = this.fileUploadPath;
            }
            console.log(this.profile, 'hiiiiiiiiiiiiiiiiiiiiii');
        } else {
            this.toastr.error(successData.ErrorObject, 'Failed');
        }


    }
    public fileUploadFailure(error) {
        console.log(error);
    }

    getPin(pin) {
        console.log(pin, 'pin');
        const data = {
            'platform': 'web',
            'user_id': '0',
            'role_id': '4',
            'postalcode': pin
        }
        if (pin.length == 6) {
            this.common.getPincode(data).subscribe(
                (successData) => {
                    this.getPinSuccess(successData);
                },
                (error) => {
                    this.getPinlFailure(error);
                }
            );
        }


    }
    public getPinSuccess(successData) {

        if (successData.IsSuccess) {
            this.pincodeErrors = false;
        } else {
            this.pincodeErrors = true;
            // this.form['controls'].contacts['controls'].pincode.patchValue('');
            // this.toastr.error('Invalid pincode');

        }
    }

    public getPinlFailure(error) {
    }
    // handle error data

    public labFailure(error) {
        console.log(error);
        this.settings.loadingSpinner = false;
    }
    reset() {
        this.personal = this.fb.group({
            'name': '',
            'mobile': '',
            'email': '',
            'labname': '',
            'address1': '',
            'address2': '',
            'contactnumber': '',
            'pincode': '',
            'city': '',
            'state': '',
            'country': '',
            'allowed': '',
            'gst': '',
            'pan': ''
        });
        this.contacts = this.fb.group({

        });
        this.documents = this.fb.group({

        });
        this.educationlist = this.fb.group({

        });
        this.bankdetails = this.fb.group({

        });
    }
    updatePosProfile() {
        let date = this.datepipe.transform(this.personaledit.value['birthday'], 'y-MM-dd');
        const data =  {
            "platform": "web",
            "pos_hidden_id": this.auth.getPosUserId(),
            "role_id": this.auth.getPosRoleId(),
            "pos_referralcode": this.personaledit.value['referralconduct'],
            "pos_firstname": this.personaledit.value['firstname'],
            "pos_lastname": this.personaledit.value['lastname'] ,
            "pos_dob": date,
            "pos_gender": this.personaledit.value['gender'],
            "pos_mobileno": this.contacts.value['phone1'],
            "pos_email": this.contacts.value['email'],
            "pos_alternate_mobileno": this.contacts.value['phone2'],
            "pos_address1": this.contacts.value['address1'],
            "pos_address2": this.contacts.value['address2'],
            "pos_postalcode": this.contacts.value['pincode'],
            "pos_profile_img": this.profile == undefined ? '' : this.profile,
            'bank_name': this.bankdetails.value['bankname'],
            'bank_acc_no': this.bankdetails.value['accountnumber'],
            'branch_name': this.bankdetails.value['bankbranch'],
            'ifsc_code': this.bankdetails.value['ifsccode'],
            'check_leaf_upload_img':this.chequeleaf
        };
        this.settings.loadingSpinner = true;
        this.common.updatePosProfile(data).subscribe(
            (successData) => {
                this.updatePosProfileSuccess(successData);

            },
            (error) => {
                this.updatePosProfileFailure(error);
            }
        );
    }
    updatePosProfileSuccess(successData) {
        console.log(successData);
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {
            this.personalEdit = false;
            this.contactEdit = false;
            this.bankEdit = false;
            this.educationEdit = false;
            this.documentEdit = false;



            this.toastr.success(successData.ResponseObject);
            this.settings.userId = this.auth.getPosUserId();
            this.getPosProfile();

            this.settings.username = this.auth.getPosFirstName() +' '+ this.auth.getPosLastName();
            if (this.personal.doc_verified_status < 2) {
                const data = {
                    "platform": "web",
                    "pos_id": this.auth.getPosUserId(),
                    "role_id": this.auth.getPosRoleId(),
                    "pos_pan_no": this.documents.value['pannumber'],
                    "pos_education": this.educationlist.value['qualification'],
                    "pos_aadhar_no": this.documents.value['aadharnumber'],
                    "pos_aadhar_front_img": this.aadharfront,
                    "pos_aadhar_back_img": this.aadharback,
                    "pos_pan_img": this.pancard,
                    "pos_education_doc_img": this.education,
                }
                if (this.aadharfront == '') {
                    this.toastr.error('Please upload aadhar front page');
                } else if (this.aadharback == '') {
                    this.toastr.error('Please upload aadhar back page');
                } else if (this.pancard == '') {
                    this.toastr.error('Please upload pancard');
                } else if (this.education == '') {
                    this.toastr.error('Please upload educational documents');
                }else if (this.chequeleaf == ''){
                    this.toastr.error('please upload chequeleaf');
                }else if (this.profile == ''){
                    this.toastr.error('Please Upload profile');
                } else {
                    this.updateDocuments(data);
                }

            } else {
                this.toastr.error(successData.ErrorObject);

            }
        }
    }
    updatePosProfileFailure(error) {
        console.log(error);
        this.settings.loadingSpinner = false;
    }
    updateDocuments(data) {
        console.log(data);
        this.common.updateDocDetails(data).subscribe(
            (successData) => {
                this.updateDocumentsSuccess(successData);
            },
            (error) => {
                this.updateDocumentsProfileFailure(error);
            }
        );
    }
    public updateDocumentsSuccess(successData) {
        if (successData.IsSuccess) {
            console.log(successData, 'successData2');
            this.getPosProfile();
        }
    }
    public updateDocumentsProfileFailure(error) {

    }

    addEvent(event) {
        if (event.value != null) {
            console.log(event.value._i,  'kjfhasdjfh');
            let selectedDate = '';
            if (typeof event.value._i == 'string') {
                const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;

                if (pattern.test(event.value._i) && event.value._i.length == 10) {
                    this.dobError = '';
                } else {
                    this.dobError = 'Enter Valid Date';
                }
                selectedDate = event.value._i;
                this.dob = event.value._i;
            } else if (typeof event.value._i == 'object') {
                console.log(event.value._i.date, 'objectttttt');
                this.dobError = '';
                let date = event.value._i.date;
                if (date.toString().length == 1) {
                    date = '0'+date;
                }
                let month =  (parseInt(event.value._i.month)+1).toString();

                if (month.length == 1) {
                    month = '0' + month;
                }
                let year = event.value._i.year;
                this.dob = date + '-' + month + '-' + year;
            }
        }
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
    changeEdit(value, key){
        if (key == 'edit') {
            this.disabledList = true;
            this.personalEdit = true;
            this.contactEdit = true;
            this.bankEdit = true;
            this.educationEdit = true;
            this.documentEdit = true;

        } else if (key == 'close') {
            this.personalEdit = false;
            this.contactEdit = false;
            this.bankEdit = false;
            this.educationEdit = false;
            this.documentEdit = false;

        }





        //
        // this.tabKey = key;
        // this.tabValue = value;
        // if (key == 'edit'){
        //     if(value == 'Personal'){
        //         this.viewTab = true
        //         this.hideTab = false
        //     } else if(value == 'Contact'){
        //         this.viewTab = true
        //         this.hideTab = false
        //
        //     } else if(value == 'Documents'){
        //         this.viewTab = true
        //         this.hideTab = false
        //
        //     } else if(value == 'Bank Details'){
        //         this.viewTab = true
        //         this.hideTab = false
        //
        //     } else if(value == 'Education'){
        //         this.viewTab = true
        //         this.hideTab = false
        //     }
        // }
        //
        // if(key == 'close'){
        //     if(value == 'Personal'){
        //         this.viewTab = false
        //         this.hideTab = true
        //     } else if(value == 'Contact'){
        //         this.viewTab = false
        //         this.hideTab = true
        //
        //     } else if(value == 'Documents'){
        //         this.viewTab = false
        //         this.hideTab = true
        //
        //     } else if(value == 'Bank Details'){
        //         this.viewTab = false
        //         this.hideTab = true
        //
        //     } else if(value == 'Education'){
        //         this.viewTab = false
        //         this.hideTab = true
        //     }
        // }

    }

    viewImage(path, title) {
        const dialogRef = this.dialog.open(DocumentViewComponent, {
            width: '800px',
            data: {'img': path, 'title': title}

        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }



}


