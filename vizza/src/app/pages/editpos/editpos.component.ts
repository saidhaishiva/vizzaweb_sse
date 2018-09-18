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
  selector: 'app-add-lab',
  templateUrl: './editpos.component.html',
  styleUrls: ['./editpos.component.scss'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ]
})
export class EditposComponent implements OnInit {

    public settings: Settings;
    public form: FormGroup;
    pincode: any;
    response: any;
    isChecked: boolean;
    size: any;
    getUrl1: any;
    getUrl: any;
    url: any;
    fileUploadPath: any;
    imagepath: any;
    webhost: any;
    personal: any;
    mismatchError: any;
    aadharfront: any;
    profile: any;
    aadharback: any;
    pancard: any;
    education: any;
    dobError: any;
    dob: any;
    type: any;

    constructor(public appSettings: AppSettings, public authService: AuthService , public fb: FormBuilder , public common: CommonService ,
                public toastr: ToastrService , public router: Router, public datepipe: DatePipe,  public config: ConfigurationService) {
        this.webhost = this.config.getimgUrl();
        this.settings = this.appSettings.settings;
        this.settings.HomeSidenavUserBlock = false;
        this.settings.sidenavIsOpened = false;
        this.settings.sidenavIsPinned = false;
        this.mismatchError = '';
        this.form = this.fb.group({
            personal: this.fb.group({
                id: null,
                firstname: ['', Validators.compose([Validators.required])],
                lastname: ['', Validators.compose([Validators.required])],
                birthday: ['', Validators.compose([Validators.required])],
                gender: ['', Validators.compose([Validators.required])],
                referralconduct: ['', Validators.compose( [Validators.required, Validators.pattern('[6789][0-9]{9}')])],
                profile: ['',Validators.compose( [Validators.required])],
            }),
            contacts: this.fb.group({
                email: ['', Validators.compose([Validators.required])],
                phone1: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
                address1: ['', Validators.compose([Validators.required])],
                address2: '',
                pincode: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
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
        this.profile='';
        this.type = '';
        this.getPosProfile();
    }
  ngOnInit() {

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
    public getPosProfile() {
        console.log(this.settings.loadingSpinner);
        this.settings.loadingSpinner = true;
        console.log(this.settings, 'settings');
        const data = {
            'platform': 'web',
            'roleid': this.authService.getPosRoleId(),
            'userid': this.authService.getPosUserId(),
            'pos_id': this.authService.getPosUserId()
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
        console.log(successData);
        if (successData.IsSuccess) {
            this.settings.loadingSpinner = false;
            this.personal = successData.ResponseObject;
            console.log(this.personal);
           // let date = this.datepipe.transform(this.personal.pos_dob, 'y-MM-dd');
            let date;
            date = this.personal.pos_dob.split('/');
            date = date[2] + '-' + date[1] + '-' + date[0];
            date = this.datepipe.transform(date, 'y-MM-dd');
          //  let date = this.datepipe.transform(this.personal.pos_dob, 'y-MM-dd');

          console.log(date, 'dateee');

            this.form = this.fb.group({
                personal: this.fb.group({
                id: null,
                firstname: this.personal.pos_firstname,
                lastname: this.personal.pos_lastname,
                birthday: date,
                gender: this.personal.pos_gender,
                    referralconduct: this.personal.pos_referralcode
                }),
                contacts: this.fb.group({
                    email: this.personal.pos_email,
                    phone1: this.personal.pos_mobileno,
                    phone2: '',
                    address1: this.personal.pos_address1,
                    address2: this.personal.pos_address2,
                    pincode: this.personal.pos_postalcode
                    // city: this.personal.pos_cityid,
                    // state: this.personal.pos_stateid,
                    // country: this.personal.pos_countryid
                }),
                documents: this.fb.group({
                    aadharnumber: this.personal.doc_aadhar_no,
                    pannumber: this.personal.doc_pan_no,

                }),
                education: this.fb.group({
                    qualification: this.personal.doc_education,

                }),
            });
            this.profile =  this.personal.doc_profile_img;
            this.aadharfront = this.personal.doc_aadhar_front_img;
            this.aadharback = this.personal.doc_aadhar_back_img;
            this.pancard = this.personal.doc_pan_img;
            this.education = this.personal.doc_edu_certificate_img;
        }
    }
    getPosProfileFailure(error) {
        console.log(error);
    }

    // public getPostal(value) {
    //     this.pincode = value;
    //     if (this.pincode.length == 6) {
    //         const data = {
    //             'platform': 'webadmin',
    //             'roleid': this.authService.getRoleId(),
    //             'userid': this.authService.getUserId(),
    //             'pincode': this.pincode
    //         }
    //         this.common.getPostal(data).subscribe(
    //             (successData) => {
    //                 this.getpostalSuccess(successData);
    //             }
    //         );
    //     }
    // }

    public getpostalSuccess(successData) {
        if (successData.IsSuccess) {
            this.response = successData.ResponseObject;
            this.form.controls['city'].setValue(this.response.city);
            this.form.controls['state'].setValue(this.response.state);
            this.form.controls['country'].setValue(this.response.country);
        } else {
            this.toastr.error('Invalid Pincode');
        }
    }

    // public addLabDetails(formData) {
    //     this.settings.loadingSpinner = false;
    //     if (this.form.valid) {
    //         const data = {
    //             'platform': 'webadmin',
    //             'roleid': this.authService.getRoleId(),
    //             'userid': this.authService.getUserId(),
    //             'contactpersonname': formData.name,
    //             'mobile': formData.mobile,
    //             'email': formData.email,
    //             'labname': formData.labname,
    //             'labaddress1': formData.address1,
    //             'labaddress2': formData.address2,
    //             'contactnumber': formData.contactnumber,
    //             'pincode': formData.pincode,
    //             'cityid': this.response.cityid,
    //             'stateid': this.response.stateid,
    //             'countryid': this.response.countryid,
    //             'isbranch': formData.allowed ? 1 : 0,
    //             'gst': formData.gst == undefined ? '' : formData.gst,
    //             'pan': formData.pan == undefined ? '' : formData.pan,
    //             'logo': this.imagepath
    //         };
    //         // this.authService.setLabData(data);
    //         this.lab.setLabDetails(data).subscribe(
    //             (successData) => {
    //                 this.labSuccess(successData);
    //             },
    //             (error) => {
    //                 this.labFailure(error);
    //             }
    //         );
    //     }
    // }

    public labSuccess(successData) {
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
            "role_id": this.authService.getPosRoleId(),
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

    // handle error data

    public labFailure(error) {
        console.log(error);
        this.settings.loadingSpinner = false;
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
    updatePosProfile() {
        let date = this.datepipe.transform(this.form.controls['birthday'].value, 'y-MM-dd');
        const data =  {
            "platform": "web",
            "pos_hidden_id": this.authService.getPosUserId(),
            "role_id": this.authService.getPosRoleId(),
            "pos_referralcode": this.form.value['personal']['referralconduct'],
            "pos_firstname": this.form.value['personal']['firstname'],
            "pos_lastname": this.form.value['personal']['lastname'] ,
            "pos_dob": date,
            "pos_gender": this.form.value['personal']['gender'],
            "pos_mobileno": this.form.value['contacts']['phone1'],
            "pos_email": this.form.value['contacts']['email'],
            "pos_address1": this.form.value['contacts']['address1'],
            "pos_address2": this.form.value['contacts']['address2'],
            "pos_postalcode": this.form.value['contacts']['pincode'],
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
            this.toastr.success(successData.ResponseObject);
            this.settings.userId = this.authService.getPosUserId();
            this.settings.username = this.authService.getPosFirstName() +' '+ this.authService.getPosLastName();
             if (this.personal.doc_verified_status < 2) {
                 const data = {
                     "platform": "web",
                     "pos_id": this.authService.getPosUserId(),
                     "role_id": this.authService.getPosRoleId(),
                     "pos_pan_no": this.form.value['documents']['pannumber'],
                     "pos_education": this.form.value['education']['qualification'],
                     "pos_aadhar_no": this.form.value['documents']['aadharnumber'],
                     "pos_aadhar_front_img": this.aadharfront,
                     "pos_aadhar_back_img": this.aadharback,
                     "pos_pan_img": this.pancard,
                     "pos_education_doc_img": this.education
                 }
                 if (this.aadharfront == '') {
                     this.toastr.error('Please upload aadhar front page');
                 } else if (this.aadharback == '') {
                     this.toastr.error('Please upload aadhar back page');
                 } else if (this.pancard == '') {
                     this.toastr.error('Please upload pancard');
                 } else if (this.education == '') {
                     this.toastr.error('Please upload educational documents');
                 } else {
                     this.updateDocuments(data);
                 }

             } else {
                 this.router.navigate(['/pos-profile']);
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
            this.router.navigate(['/pos-profile']);
            console.log(successData, 'in');
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

}
