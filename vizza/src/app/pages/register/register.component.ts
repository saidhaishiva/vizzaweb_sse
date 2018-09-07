import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CommonService } from '../../shared/services/common.service';
import { AuthService } from '../../shared/services/auth.service';
import { ConfigurationService} from '../../shared/services/configuration.service';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../shared/services/login.service';
import { Router } from '@angular/router';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {DatePipe} from '@angular/common';
import { emailValidator, matchingPasswords } from '../../theme/utils/app-validators';
import {Settings} from '../../app.settings.model';
import { AppSettings } from '../../app.settings';

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
    selector: 'app-register',
    templateUrl: './register.component.html',
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ]
})
export class RegisterComponent implements OnInit {
    public registerform : FormGroup;
    response: any;
    pin: any;
    fixed: boolean;
    range: boolean;
    header: boolean;
    public settings: Settings;
    checked: boolean;
    public fileUploadPath: any;
    getUrl: any;
    image: any;
    webhost: any;
    getUrl1: any;
    size: number;
    url: string;
    selectedtab: number;
    type: any;
    aadharfront: any;
    aadharback: any;
    chequeleaf: any;
    pancard: any;
    education: any;
    dob: any;
    dobError: any;
    today: any;
    mismatchError: any;
    DateValidator: any;
    roleId: any;
    img: any;
    profile: any;
    public passwordHide: boolean = true;
    constructor(public config: ConfigurationService, public fb: FormBuilder, public router: Router, public datepipe: DatePipe, public appSettings: AppSettings, public login: LoginService, public common: CommonService, public auth: AuthService, private toastr: ToastrService) {
        this.settings = this.appSettings.settings;
        this.settings.HomeSidenavUserBlock = false;
        this.settings.sidenavIsOpened = false;
        this.settings.sidenavIsPinned = false;
        this.webhost = this.config.getimgUrl();
        this.selectedtab = 0;
        this.today = new Date();
        this.dob = '';
        this.dobError = '';
        this.mismatchError = '';
        this.img = false;
        this.registerform = this.fb.group({
            id: null,
            firstname: ['', Validators.compose([Validators.required])],
            lastname: ['', Validators.compose( [Validators.required])],
            birthday: ['', Validators.compose([Validators.required])],
            // gender: ['', Validators.compose([Validators.required])],
            formemail: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
            referralcode: '',
            contacts: this.fb.group({
                email: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
                phone1: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
                phone2: '',
                address1: ['', Validators.compose([Validators.required])],
                address2: '',
                pincode: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
            }),
            documents: this.fb.group({
                aadharnumber: ['', Validators.compose([Validators.required])],
                pannumber: ['',  Validators.compose([Validators.required, Validators.pattern('^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$')])],
            }),
            education: this.fb.group({
                qualification: ['', Validators.compose([Validators.required])],

            }),
            bankdetails: this.fb.group({
                bankname: ['', Validators.compose([Validators.required])],
                bankbranch: ['', Validators.compose([Validators.required])],
                ifsccode: ['', Validators.compose([Validators.required])],
                accountnumber: ['', Validators.compose([Validators.required])]
            })
        });
        this.aadharfront = '';
        this.aadharback = '';
        this.chequeleaf = '';
        this.profile = '';
        this.pancard = '';
        this.education = '';
        this.roleId = this.auth.getPosRoleId() ;
                       console.log(this.roleId,'assss');
        if(this.roleId > 0){
            this.router.navigate(['/pos-profile']);
        }
    }

    ngOnInit() {
          this.settings.loadingSpinner = false;
    }
    readUrl(event: any, type) {
        this.type = type;
        this.size = event.srcElement.files[0].size;
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
            if (this.type == 'profile') {
                this.profile = this.fileUploadPath;
            }
            if (this.type == 'chequeleaf'){
                this.chequeleaf = this.fileUploadPath;
            }
        } else {
            this.toastr.error(successData.ErrorObject, 'Failed');
        }


    }
    public fileUploadFailure(error) {
        console.log(error);
    }
    submit(value) {
        console.log(value);
        console.log(this.dob, 'dateeee');
        if (this.aadharfront == '') {
            this.toastr.error('Please upload aadhar front page');
        } else if (this.aadharback == '') {
            this.toastr.error('Please upload aadhar back page');
        } else if (this.pancard == '') {
            this.toastr.error('Please upload pancard');
        } else if (this.education == '') {
            this.toastr.error('Please upload educational documents');
        } else if (this.profile == '') {
            this.toastr.error('Please upload profile');
        }
        else if (this.chequeleaf == '') {
            this.toastr.error('Please upload Cheque Leaf (or) Passbook');
        }else {
            const data = {
                "platform": "web",
                "pos_hidden_id": "",
                "pos_referralcode": this.registerform.controls['referralcode'].value,
                "pos_firstname": this.registerform.controls['firstname'].value,
                "pos_lastname": this.registerform.controls['lastname'].value,
                // "pos_gender": this.registerform.controls['gender'].value,
                "pos_dob": this.dob,
                "pos_profile": this.profile,
                "pos_mobileno": this.registerform.value['contacts']['phone1'],
                "pos_email": this.registerform.value['contacts']['email'],
                "pos_address1": this.registerform.value['contacts']['address1'],
                "pos_address2": this.registerform.value['contacts']['address2'],
                "pos_postalcode": this.registerform.value['contacts']['pincode'],
                "pos_aadhar_no": this.registerform.value['documents']['aadharnumber'],
                "pos_pan_no": this.registerform.value['documents']['pannumber'],
                "pos_profile_img": this.profile,
                "pos_aadhar_front_img": this.aadharfront,
                "pos_aadhar_back_img": this.aadharback,
                "pos_pan_img": this.pancard,
                "check_leaf_upload_img": this.chequeleaf,
                "pos_education": this.registerform.value['education']['qualification'],
                "pos_education_doc_img": this.education,
                "bank_name": this.registerform.value['bankdetails']['bankname'],
                "bank_acc_no": this.registerform.value['bankdetails']['accountnumber'],
                "branch_name": this.registerform.value['bankdetails']['bankbranch'],
                "ifsc_code": this.registerform.value['bankdetails']['ifsccode']
            };
            console.log(data, 'dattatta');
            this.settings.loadingSpinner = true;
            this.login.signUp(data).subscribe(
                (successData) => {
                    this.signUpSuccess(successData);
                },
                (error) => {
                    this.signUpFailure(error);
                }
            );
        }
    }
    signUpSuccess(successData) {
        this.settings.loadingSpinner = false;
        console.log(successData);
        if (successData.IsSuccess) {
            this.router.navigate(['/pos']);
            this.toastr.success('Registration Completed', 'Success!!!');
        } else {
            this.toastr.error(successData.ErrorObject, 'Failed');
        }
    }
    signUpFailure(error) {
        this.settings.loadingSpinner = false;
        console.log(error);
    }

    checkGender() {
        if (this.registerform.controls['gender'].value != '' && this.registerform.controls['gender'].value != undefined) {
            this.mismatchError = '';
        } else {
            this.mismatchError = 'Gender is required ';
        }
    }
    // checkPassword() {
    //     if (this.form.controls['password'].value === this.form.controls['confirmpassword'].value) {
    //         this.mismatchError = '';
    //     } else {
    //         this.mismatchError = 'Passwords do not match ';
    //     }
    //     if (this.form.controls['password'].value == '') {
    //         this.mismatchError = '';
    //     }
    // }


    public keyPress(event: any) {
        if (event.charCode !== 0) {
            const pattern = /[0-9/\\ ]/;
            const inputChar = String.fromCharCode(event.charCode);

            if (!pattern.test(inputChar)) {
                // invalid character, prevent input
                event.preventDefault();
            }
        }
    }
    public character(event: any) {
        if (event.charCode !== 0) {
            const pattern = /[a-zA-Z\\ ]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }


    ageCalculate(dob) {
        let mdate = dob.toString();
        let yearThen = parseInt(mdate.substring( 8,10), 10);
        let monthThen = parseInt(mdate.substring(5,7), 10);
        let dayThen = parseInt(mdate.substring(0,4), 10);
        let todays = new Date();
        let birthday = new Date( dayThen, monthThen-1, yearThen);
        let differenceInMilisecond = todays.valueOf() - birthday.valueOf();
        let year_age = Math.floor(differenceInMilisecond / 31536000000);
         let res = year_age;
console.log(res);
    if(res>=18) {
        this.img=false;
    } else {
        this.img = true;

    }
}

    addEvent(event) {
        if (event.value != null) {
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

                let birth = this.registerform.controls['birthday'].value;
                let dob = this.datepipe.transform(event.value, 'y-MM-dd');

                if(birth._i.length == '10') {

                    this.ageCalculate(dob);
                } else {
                    this.img=false;

                }

            } else if (typeof event.value._i == 'object') {

                this.ageCalculate(this.datepipe.transform(event.value, 'y-MM-dd'));

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

}
