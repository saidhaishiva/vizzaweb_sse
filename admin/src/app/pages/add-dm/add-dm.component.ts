import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatTabChangeEvent} from '@angular/material';
import {AppSettings} from '../../app.settings';
import {Settings} from '../../app.settings.model';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {AuthService} from '../../shared/services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {LoginService} from '../../shared/services/login.service';
import {CommonService} from '../../shared/services/common.service';
import {DatePipe} from '@angular/common';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {Router} from '@angular/router';

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
  selector: 'app-add-dm',
  templateUrl: './add-dm.component.html',
  styleUrls: ['./add-dm.component.scss'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ]
})
export class AddDmComponent implements OnInit {

    public form: FormGroup;
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
    pancard: any;
    education: any;
    dob: any;
    dobError: any;
    today: any;
    mismatchError: any;
    profile: any;
    chequeleaf: any;
    pincodeErrors : any;
    selectedIndex: any;
    public title: any;
    nectStatus: any;
    fileDetails: any;
    pdfSrc: any;
    allImage: any;
    img: boolean;
    public passwordHide: boolean = true;
    constructor(public config: ConfigurationService,
                public fb: FormBuilder,public router: Router, public appSettings: AppSettings,public login: LoginService,
                public common: CommonService, public auth: AuthService, private toastr: ToastrService, public datepipe: DatePipe) {
        this.settings = this.appSettings.settings;
        this.webhost = this.config.getimgUrl();
        this.selectedtab = 0;
        this.today = new Date();
        this.dob = '';
        this.dobError = '';
        this.allImage = [];
        this.mismatchError = '';
        // this.settings.HomeSidenavUserBlock = false;
        this.settings.sidenavIsOpened = false;
        this.settings.sidenavIsPinned = false;
        this.webhost = this.config.getimgUrl();
        this.selectedtab = 0;
        this.nectStatus = true;
        this.selectedIndex = 0;
        this.profile = '';
        this.img = false;
        this.form = this.fb.group({
            personal: this.fb.group({
                id: null,
                firstname: ['', Validators.compose([Validators.required])],
                lastname: ['', Validators.compose([Validators.required])],
                birthday: ['', Validators.compose([Validators.required])],
                gender: ['', Validators.compose([Validators.required])],
                referralconduct: ['', Validators.compose( [ Validators.pattern('[6789][0-9]{9}')])],
                profile: ['',Validators.compose( [Validators.required])]

            }),
            contacts: this.fb.group({
                email: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
                phone1: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
                phone2: ['', Validators.compose([Validators.pattern('[6789][0-9]{9}')])],
                address1: ['', Validators.compose([Validators.required])],
                address2: '',
                pincode: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
            }),
            documents: this.fb.group({
                aadharnumber: ['', Validators.compose([Validators.required])],
                pannumber: ['', Validators.compose([ Validators.pattern('^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$')])],
                aadharfront: ['',Validators.compose( [Validators.required])],
                aadharback: ['',Validators.compose( [Validators.required])],
                pancard: ''
            }),
            education: this.fb.group({
                qualification: ['', Validators.compose([Validators.required])],
                educationdocument:['', Validators.compose( [Validators.required])]

            }),
            bankdetails: this.fb.group({
                bankname: ['', Validators.compose([Validators.required])],
                bankbranch: ['', Validators.compose([Validators.required])],
                ifsccode: ['', Validators.compose([Validators.required])],
                accountnumber: ['', Validators.compose([Validators.required])],
                chequeleaf:['', Validators.compose( [Validators.required])]
            })
        });
        this.profile = '';
        this.aadharfront = '';
        this.aadharback = '';
        this.pancard = '';
        this.education = '';
        this.chequeleaf= '';
    }


    ngOnInit() {
        this.settings.loadingSpinner = false;
        this.pincodeErrors = false;
    }

    public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
        this.selectedIndex = tabChangeEvent.index;
    }

    public nextStep() {
        this.selectedIndex += 1;
    }

    public previousStep() {
        this.selectedIndex -= 1;
    }

    readUrl(event: any, type) {
        this.type = type;
        this.getUrl = '';
        if (type == 'education') {
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
        } else {
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


    }
    onUploadFinished(event) {
        this.allImage.push(event);
        console.log(this.allImage, 'this.fileDetails');

        const data = {
            'platform': 'web',
            'flag':'dm',
            'uploadtype': '',
            'images': ''
        };
        if (this.type == 'education') {
            let length = this.allImage.length-1;
            console.log(length, 'this.lengthlength');
            for (let k = 0; k < this.allImage[length].length; k++) {
                this.fileDetails[k].image = this.allImage[length][k][1];
            }
            data.uploadtype = 'multiple';
            data.images = this.fileDetails;
        } else {
            this.getUrl = event[1];
            data.uploadtype = 'single';
            data.images = this.getUrl;
        }

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
            if (this.type == 'profile'){
                this.profile = this.fileUploadPath;
            }
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
            if (this.type == 'chequeleaf') {
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
        console.log(this.dob, 'dateeee');
        if (this.aadharfront == '') {
            this.toastr.error('Please upload aadhar front page');
        } else if (this.aadharback == '') {
            this.toastr.error('Please upload aadhar back page');
        } else if (this.pancard == '') {
            this.toastr.error('Please upload pancard');
        } else if (this.education == '') {
            this.toastr.error('Please upload educational documents');
        }else if (this.profile == '') {
            this.toastr.error('Please upload profile');
        }
        else if (this.chequeleaf == '') {
            this.toastr.error('Please upload Cheque Leaf (or) Passbook');
        } else {

            const data = {
                'admin_id': this.auth.getAdminId(),
                'admin_roleid': this.auth.getAdminRoleId(),
                "platform": "web",
                "dm_referralcode": this.form.value['personal']['referralconduct'],
                "dm_firstname": this.form.value['personal']['firstname'],
                "dm_lastname": this.form.value['personal']['lastname'],
                "dm_gender": this.form.value['personal']['gender'],
                "dm_dob": this.dob,
                "dm_mobileno": this.form.value['contacts']['phone1'],
                'dm_alternate_mobileno': this.form.value['contacts']['phone2'],
                "dm_email": this.form.value['contacts']['email'],
                "dm_address1": this.form.value['contacts']['address1'],
                "dm_address2": this.form.value['contacts']['address2'],
                "dm_postalcode": this.form.value['contacts']['pincode'],
                "dm_aadhar_no": this.form.value['documents']['aadharnumber'],
                "dm_pan_no": this.form.value['documents']['pannumber'],
                "dm_profile_img": this.profile == undefined ? '' : this.profile,
                "dm_aadhar_front_img": this.aadharfront,
                "dm_aadhar_back_img": this.aadharback,
                "dm_pan_img": this.pancard,
                "dm_education": this.form.value['education']['qualification'],
                "dm_education_doc_img": this.education,
                "check_leaf_upload_img": this.chequeleaf,
                "bank_name": this.form.value['bankdetails']['bankname'],
                "bank_acc_no": this.form.value['bankdetails']['accountnumber'],
                "branch_name": this.form.value['bankdetails']['bankbranch'],
                "ifsc_code": this.form.value['bankdetails']['ifsccode']
            };
            console.log(data, 'sdsdsdsds');
            this.settings.loadingSpinner = true;
            this.login.RegisterDm(data).subscribe(
                (successData) => {
                    this.RegisterDmSuccess(successData);
                },
                (error) => {
                    this.RegisterDmFailure(error);
                }
            );
        }
    }
    RegisterDmSuccess(successData) {
        console.log(successData);
        this.settings.loadingSpinner = false
        if (successData.IsSuccess) {
            this.router.navigate(['/distance-marketing']);
            this.toastr.success('DM added successfully');
        }else {
            this.toastr.error(successData.ErrorObject);
        }
    }
    RegisterDmFailure(error) {
        this.settings.loadingSpinner = false
        console.log(error);
    }
    checkGender() {
        if (this.form['controls'].personal['controls']['gender'].value != '' && this.form['controls'].personal['controls']['gender'].value != undefined) {
            this.mismatchError = '';
        } else {
            this.mismatchError = 'Gender is required ';
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

    public dobkeyPress(event: any) {
        if (event.charCode !== 0) {
            const pattern = /[0-9/\\ ]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }

    public character(event: any) {
        if (event.charCode !== 0) {
            const pattern = /[a-zA-Z0-9 ]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }

    ageCalculate(dob) {
        let mdate = dob.toString();
        let yearThen = parseInt(mdate.substring(8, 10), 10);
        let monthThen = parseInt(mdate.substring(5, 7), 10);
        let dayThen = parseInt(mdate.substring(0, 4), 10);
        let todays = new Date();
        let birthday = new Date(dayThen, monthThen - 1, yearThen);
        let differenceInMilisecond = todays.valueOf() - birthday.valueOf();
        let year_age = Math.floor(differenceInMilisecond / 31536000000);
        let res = year_age;
        console.log(res,'fghjk');
        if (res >= 18) {
            this.img = false;
            this.nectStatus = true;
        } else {
            this.img = true;
            this.nectStatus = false;
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
                // this.dob = event.value._i;
                let birth = this.form.value['personal']['birthday'].value;
                let dob = this.datepipe.transform(event.value, 'y-MM-dd');
                this.dob = dob;
                console.log(dob,'dob');
                if (selectedDate.length == 10) {
                    this.ageCalculate(dob);
                } else {
                    this.img = false;

                }

            } else if (typeof event.value._i == 'object') {

                this.dob = this.datepipe.transform(event.value, 'y-MM-dd');
                if (this.dob.length == 10) {
                    this.ageCalculate(this.datepipe.transform(event.value, 'y-MM-dd'));
                } else {
                    this.img = false;

                }

                this.dobError = '';
                let date = event.value._i.date;
                if (date.toString().length == 1) {
                    date = '0' + date;
                }
                let month = (parseInt(event.value._i.month) + 1).toString();

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
    getPin(pin) {
        console.log(pin, 'pin');
        this.pin = pin;
        const data = {
            'platform': 'web',
            'user_id': '0',
            'role_id': '4',
            'postalcode': this.pin
        }
        if (this.pin.length == 6) {
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
        }
    }

    public getPinlFailure(error) {
    }

}
