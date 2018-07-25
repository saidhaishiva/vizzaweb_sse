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
    public form: FormGroup;
    response: any;
    pin: any;
    fixed: boolean;
    range: boolean;
    header: boolean;
    pdfpreview: boolean;
    public settings: Settings;
    checked: boolean;
    pdfback: boolean;
    public fileUploadPath: any;
    getUrl: any;
    imagepath: any;
    image: any;
    webhost: any;
    defaultchecked: boolean;
    getUrl1: any;
    size: number;
    url: string;
    subsequentError: string;
    fromtoValueError: string;
    selectedtab: number;
    type: any;
    aadharfront: any;
    aadharback: any;
    pancard: any;
    education: any;
    dob: any;
    dobError: any;
    today: any;
    mismatchError: any;
    newps = true;
    conps = true;

    public passwordHide: boolean = true;
    constructor(public config: ConfigurationService,
                public fb: FormBuilder,public router: Router, public datepipe: DatePipe, public appSettings: AppSettings, public login: LoginService, public common: CommonService, public auth: AuthService, private toastr: ToastrService) {
        this.settings = this.appSettings.settings;
        this.settings.HomeSidenavUserBlock = false;
        this.settings.sidenavIsOpened = false;
        this.settings.sidenavIsPinned = false;
        this.fixed = false;
        this.range = false;
        this.subsequentError = '';
        this.fromtoValueError = '';
        this.webhost = this.config.getimgUrl();
        this.header = false;
        this.pdfpreview = true;
        this.pdfback = true;
        this.defaultchecked = false;
        this.selectedtab = 0;
        this.imagepath = '';
        this.today = new Date();
        this.dob = '';
        this.dobError = '';
        this.mismatchError = '';
        this.form = this.fb.group({
            id: null,
            firstname: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
            lastname: ['', Validators.compose([Validators.required])],
            birthday: '',
            gender: '',
            password: ['', Validators.compose([Validators.required])],
            confirmpassword: ['', Validators.compose([Validators.required])],
            referralcode: '',

            contacts: this.fb.group({
                email: '',
                phone1: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
                phone2: '',
                address1: ['', Validators.compose([Validators.required])],
                address2: '',
                pincode: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
                city: '',
                state: '',
                country: ''
            }),
            documents: this.fb.group({
                aadharnumber: ['', Validators.compose([Validators.required])],
                pannumber: ['', Validators.compose([Validators.required])],

            }),
            education: this.fb.group({
                qualification: ['', Validators.compose([Validators.required])],

            }),
        });
        this.aadharfront = '';
        this.aadharback = '';
        this.pancard = '';
        this.education = '';
    }

    ngOnInit() {

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
        } else {
            this.toastr.error(successData.ErrorObject, 'Failed');
        }


    }
    public fileUploadFailure(error) {
        console.log(error);
    }
    submit() {
        console.log(this.dob, 'dateeee');
        const data = {
            "platform": "web",
            "pos_hidden_id": "",
            "pos_referralcode":  this.form.controls['referralcode'].value,
            "pos_firstname": this.form.controls['firstname'].value,
            "pos_lastname": this.form.controls['lastname'].value,
            "pos_dob": this.dob,
            "pos_mobileno": this.form.value['contacts']['phone1'],
            "pos_email":  this.form.value['contacts']['email'],
            "pos_address1": this.form.value['contacts']['address1'],
            "pos_address2": this.form.value['contacts']['address2'],
            "pos_postalcode":  this.form.value['contacts']['pincode'],
            "password": this.form.controls['confirmpassword'].value,
            "pos_aadhar_no":  this.form.value['documents']['aadharnumber'],
            "pos_pan_no": this.form.value['documents']['pannumber'] ,
            "pos_aadhar_front_img": this.aadharfront,
            "pos_aadhar_back_img": this.aadharback,
            "pos_pan_img": this.pancard,
            "pos_education": this.form.value['education']['qualification'],
            "pos_education_doc_img": this.education
        };
        console.log(data, 'dattatta');
        this.login.signUp(data).subscribe(
            (successData) => {
                this.signUpSuccess(successData);
            },
            (error) => {
                this.signUpFailure(error);
            }
        );
    }
    signUpSuccess(successData) {
        console.log(successData);
        if (successData.IsSuccess) {
            this.router.navigate(['/pos']);
            this.toastr.success('Registration Completed', 'Success!!!');
        } else {
            this.toastr.error(successData.ErrorObject, 'Failed');
        }
    }
    signUpFailure(error) {
        console.log(error);
    }
    checkPassword() {
        if (this.form.controls['password'].value === this.form.controls['confirmpassword'].value) {
            this.mismatchError = '';
        } else {
            this.mismatchError = 'Passwords do not match ';
        }
        if (this.form.controls['password'].value == '') {
            this.mismatchError = '';
        }
    }


    public keyPress(event: any) {
        if (event.charCode !== 0) {
            const pattern = /[0-9\\ ]/;
            const inputChar = String.fromCharCode(event.charCode);

            if (!pattern.test(inputChar)) {
                // invalid character, prevent input
                event.preventDefault();
            }
        }
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
}
