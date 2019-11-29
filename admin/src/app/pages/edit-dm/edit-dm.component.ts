import { Component, OnInit } from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatTabChangeEvent} from '@angular/material';
import {AppSettings} from '../../app.settings';
import {Settings} from '../../app.settings.model';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {AuthService} from '../../shared/services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Params} from '@angular/router';
import {LoginService} from '../../shared/services/login.service';
import {CommonService} from '../../shared/services/common.service';
import {DatePipe} from '@angular/common';
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
  selector: 'app-edit-dm',
  templateUrl: './edit-dm.component.html',
  styleUrls: ['./edit-dm.component.scss'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ]
})
export class EditDmComponent implements OnInit {

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
    url: string;
    selectedtab: number;
    type: any;
    public title: any;

    aadharfront: any;
    aadharback: any;
    chequeleaf: any;
    pancard: any;
    education: any;
    dob: any;
    dobError: any;
    today: any;
    nectStatus: any;
    mismatchError: any;
    img: boolean;
    profile: any;
    selectedIndex: any;
    public passwordHide: boolean = true;
    pincodeErrors : any;
    public personal: any;
    public dmid: any;
    public posDataAvailable : boolean;
    imagepath: any;
    size: any;
    fileDetails: any;
    allImage: any;

    constructor(public config: ConfigurationService, public fb: FormBuilder, public router: Router, public datepipe: DatePipe,
                public appSettings: AppSettings, public login: LoginService, public common: CommonService, public auth: AuthService,
                private toastr: ToastrService, public route: ActivatedRoute) {
        this.settings = this.appSettings.settings;
        // this.settings.HomeSidenavUserBlock = false;
        this.webhost = this.config.getimgUrl();
        this.selectedtab = 0;
        this.nectStatus = true;
        this.today = new Date();
        this.dob = '';
        this.dobError = '';
        this.mismatchError = '';
        this.selectedIndex = 0;
        this.profile = '';
        this.img = false;
        this.allImage = [];
        this.posDataAvailable = false;
        this.form = this.fb.group({
            personalEdit: this.fb.group({
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
            educationlist: this.fb.group({
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
        this.route.params.forEach((params: Params) => {
            this.dmid = params.id;
        });
        this.getDmProfileList();
    }

    ngOnInit() {
        this.settings.loadingSpinner = false;
        this.pincodeErrors = false;
    }
//get Admin pos ProfileList
    getDmProfileList(){
        const data = {
            'platform': 'web',
            'admin_id': this.auth.getAdminId(),
            'role_id': this.auth.getAdminRoleId(),
            'dm_id': this.dmid
        };
        console.log(data);
        this.common.getDmProfileList(data).subscribe(
            (successData) => {
                this.setPosProfileSuccess(successData);

            },
            (error) => {
                this.setPosProfileFailure(error);
            }
        );
    }
    setPosProfileSuccess(successData) {
        console.log(successData, 'datadatadatadatadatadatadata');
        if (successData.IsSuccess) {
            this.personal = successData.ResponseObject;
            this.posDataAvailable = true;
            let date;
            date = this.personal.dm_dob.split('/');
            date = date[2] + '-' + date[1] + '-' + date[0];
            date = this.datepipe.transform(date, 'y-MM-dd');
            console.log(date, 'dateee');
            this.form = this.fb.group({
                personalEdit: this.fb.group({
                    id: null,
                    firstname: this.personal.dm_firstname,
                    lastname: this.personal.dm_lastname,
                    birthday: date,
                    gender: this.personal.dm_gender,
                    referralconduct: this.personal.dm_referral_code,
                }),
                contacts: this.fb.group({
                    email: this.personal.dm_email,
                    phone1: this.personal.dm_mobileno,
                    phone2: this.personal.dm_alternate_mobileno,
                    address1: this.personal.dm_address1,
                    address2: this.personal.dm_address2,
                    pincode: this.personal.dm_postalcode,
                }),
                documents: this.fb.group({
                    aadharnumber: this.personal.doc_aadhar_no,
                    pannumber: this.personal.doc_pan_no,
                }),
                educationlist: this.fb.group({
                    qualification: this.personal.doc_education,
                    education: this.personal.doc_edu_certificate_img
                }),
                bankdetails: this.fb.group({
                    bankname: this.personal.bank_name,
                    bankbranch: this.personal.branch_name,
                    ifsccode: this.personal.ifsc_code,
                    accountnumber: this.personal.bank_acc_no,
                }),
            });
            this.profile = this.personal.dm_profile_img;
            this.aadharfront = this.personal.doc_aadhar_front_img;
            this.aadharback = this.personal.doc_aadhar_back_img;
            this.pancard = this.personal.doc_pan_img;
            this.education = this.personal.doc_edu_certificate_img;
            this.chequeleaf = this.personal.check_leaf_upload_img;
        }
    }

    setPosProfileFailure(error) {
        console.log(error);
    }
//Image Upload service
//     onUploadFinished(event) {
//         this.getUrl = event[1];
//         const data = {
//             'platform': 'web',
//             "role_id": this.auth.getAdminRoleId(),
//             'flag':'dm',
//             'uploadtype': 'single',
//             'images': this.getUrl,
//         };
//         console.log(data, 'dattattatata');
//         this.common.fileUpload(data).subscribe(
//             (successData) => {
//                 this.fileUploadSuccess(successData);
//             },
//             (error) => {
//                 this.fileUploadFailure(error);
//             }
//         );
//     }
//
//     public fileUploadSuccess(successData) {
//         if (successData.IsSuccess == true) {
//             this.fileUploadPath =  successData.ResponseObject.imagePath;
//             if (this.type == 'aadhar front') {
//                 this.aadharfront = this.fileUploadPath;
//             }
//             if (this.type == 'aadhar back') {
//                 this.aadharback = this.fileUploadPath;
//             }
//             if (this.type == 'pancard') {
//                 this.pancard = this.fileUploadPath;
//             }
//             if (this.type == 'education') {
//                 this.education = this.fileUploadPath;
//             }
//             if (this.type == 'profile'){
//                 this.profile = this.fileUploadPath;
//             }
//             if (this.type == 'chequeleaf'){
//                 this.chequeleaf = this.fileUploadPath;
//             }
//             console.log(this.profile, 'hiiiiiiiiiiiiiiiiiiiiii');
//         } else {
//             this.toastr.error(successData.ErrorObject, 'Failed');
//         }
//
//
//     }
//     public fileUploadFailure(error) {
//         console.log(error);
//     }

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
    // readUrl(event: any, type) {
    //     this.type = type;
    //     this.size = event.srcElement.files[0].size;
    //     console.log(this.size);
    //     if (event.target.files && event.target.files[0]) {
    //         const reader = new FileReader();
    //
    //         reader.onload = (event: any) => {
    //             this.getUrl1 = [];
    //             this.url = event.target.result;
    //             this.getUrl = this.url.split(',');
    //             this.getUrl1.push(this.url.split(','));
    //             this.onUploadFinished(this.getUrl);
    //
    //         };
    //         reader.readAsDataURL(event.target.files[0]);
    //     }
    //
    // }
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
//Update admin pos profile
    updateAdminDmProfile(event){
        const data =  {
            "platform": "web",
            "admin_id": this.auth.getAdminId(),
            "admin_roleid": this.auth.getAdminRoleId(),
            "dm_id": this.dmid,
            "dm_firstname": this.form['controls'].personalEdit['controls']['firstname'].value,
            "dm_lastname": this.form['controls'].personalEdit['controls']['lastname'].value,
            "dm_dob": this.dob == '' ? this.form['controls'].personalEdit['controls']['birthday'].value : this.dob,
            "dm_gender": this.form['controls'].personalEdit['controls']['gender'].value,
            "dm_mobileno": this.form['controls'].contacts['controls']['phone1'].value,
            "dm_email": this.form['controls'].contacts['controls']['email'].value,
            "dm_alternate_mobileno": this.form['controls'].contacts['controls']['phone2'].value,
            "dm_address1": this.form['controls'].contacts['controls']['address1'].value,
            "dm_address2": this.form['controls'].contacts['controls']['address1'].value,
            "dm_postalcode": this.form['controls'].contacts['controls']['pincode'].value,
            'bank_name': this.form['controls'].bankdetails['controls']['bankname'].value,
            'bank_acc_no': this.form['controls'].bankdetails['controls']['accountnumber'].value,
            'branch_name': this.form['controls'].bankdetails['controls']['bankbranch'].value,
            'ifsc_code': this.form['controls'].bankdetails['controls']['ifsccode'].value,
            "dm_profile_img": this.profile == undefined ? '' : this.profile,
            'check_leaf_upload_img':this.chequeleaf,
        };
        this.settings.loadingSpinner = true;
        //update pos profile service
        this.common.updateAdminDmProfile(data).subscribe(
            (successData) => {
                this.updateaAminPosProfileSuccess(successData);

            },
            (error) => {
                this.updateaAminPosProfileFailure(error);
            }
        );

        console.log(data);
    }
    updateaAminPosProfileSuccess(successData) {
        console.log(successData);
        this.settings.loadingSpinner = false;

        if (successData.IsSuccess) {
            this.getDmProfileList();
            this.toastr.success(successData.ResponseObject);
            this.router.navigate(['/distance-marketing']);

            if(this.personal.doc_verified_status){
                const data = {
                    "platform": "web",
                    "admin_id": this.auth.getAdminId(),
                    "admin_roleid": this.auth.getAdminRoleId(),
                    "dm_id": this.dmid,
                    "dm_pan_no": this.form['controls'].documents['controls']['pannumber'].value,
                    "dm_education": this.form['controls'].educationlist['controls']['qualification'].value,
                    "dm_aadhar_no": this.form['controls'].documents['controls']['aadharnumber'].value,
                    "dm_aadhar_front_img": this.aadharfront,
                    "dm_aadhar_back_img": this.aadharback,
                    "dm_pan_img": this.pancard,
                    "dm_education_doc_img": this.education
                };
                console.log(data);
                if (this.aadharfront == '') {
                    this.toastr.error('Please upload aadhar front page');
                } else if (this.aadharback == '') {
                    this.toastr.error('Please upload aadhar back page');
                }
                // else if (this.pancard == '') {
                //     this.toastr.error('Please upload pancard');
                // }
                else if (this.education == '') {
                    this.toastr.error('Please upload educational documents');
                }else if (this.chequeleaf == ''){
                    this.toastr.error('please upload chequeleaf')
                }else {
                    this.updateDocuments(data);
                }
            }
        }else {
            this.toastr.error(successData.ErrorObject);
        }

    }
    updateaAminPosProfileFailure(error) {
        console.log(error);
        this.settings.loadingSpinner = false;
    }

    //update docment details service
    updateDocuments(data) {
        console.log(data);
        this.common.updateDmDocDetails(data).subscribe(
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
            this.getDmProfileList();
        }
    }
    public updateDocumentsProfileFailure(error) {
        console.log(error);
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
    checkGender() {
        if (this.form['controls'].personalEdit['controls']['gender'].value != '' && this.form['controls'].personalEdit['controls']['gender'].value != undefined) {
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
                // let birth = this.form['controls'].personalEdit['controls']['birthday'].value;
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

    reset() {
        this.form = this.fb.group({
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
    }
}
