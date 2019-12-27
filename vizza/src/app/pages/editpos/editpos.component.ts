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
    public personal: FormGroup;
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
    webhost: any;
    profile: any;
    mismatchError: any;
    aadharfront: any;
    profileedit: any;
    aadharback: any;
    pancard: any;
    education: any;
    dobError: any;
    dob: any;
    type: any;
    chequeleaf: any;
    showTab: any;
    public posDataAvailable : boolean;

    constructor(public appSettings: AppSettings, public authService: AuthService , public fb: FormBuilder , public common: CommonService ,
                public toastr: ToastrService , public router: Router, public datepipe: DatePipe,  public config: ConfigurationService) {
        this.webhost = this.config.getimgUrl();
        this.settings = this.appSettings.settings;
        this.settings.HomeSidenavUserBlock = false;
        this.settings.sidenavIsOpened = false;
        this.settings.sidenavIsPinned = false;
        this.mismatchError = '';
        this.posDataAvailable = false;
        this.showTab = sessionStorage.currentTab;
        this.personal = this.fb.group({
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
        if (this.personal['controls']['gender'].value != '' && this.personal['controls']['gender'].value != undefined) {
            this.mismatchError = '';
        } else {
            this.mismatchError = 'Gender is required ';
        }
    }

    public getPosProfile() {
        this.settings.loadingSpinner = true;
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
        console.log(successData.ResponseObject);
        if (successData.IsSuccess) {
            this.settings.loadingSpinner = false;
            this. profileedit = successData.ResponseObject;
            console.log(this. profileedit, 'this. profileedit')
            this.posDataAvailable = true;
           // let date = this.datepipe.transform(this.personal.pos_dob, 'y-MM-dd');
            let date;
            date = this. profileedit.pos_dob.split('/');
            console.log(date, 'date')
            date = date[2] + '-' + date[1] + '-' + date[0];
            console.log(date, 'date')
            date = this.datepipe.transform(date, 'y-MM-dd');
            console.log(date, 'date')
            //  let date = this.datepipe.transform(this.personal.pos_dob, 'y-MM-dd');



          this.personal = this.fb.group({
                id: null,
                firstname: this. profileedit.pos_firstname,
                lastname: this. profileedit.pos_lastname,
                birthday: date,
                gender: this. profileedit.pos_gender,
                referralconduct: this. profileedit.pos_referral_code,
                });
          this.contacts = this.fb.group({
                    email: this. profileedit.pos_email,
                    phone1: this. profileedit.pos_mobileno,
                    phone2: '',
                    address1: this. profileedit.pos_address1,
                    address2: this. profileedit.pos_address2,
                    pincode: this. profileedit.pos_postalcode,
                    // city: this.personal.pos_cityid,
                    // state: this.personal.pos_stateid,
                    // country: this.personal.pos_countryid
                });
          this.documents = this.fb.group({
                    aadharnumber: this. profileedit.doc_aadhar_no,
                    pannumber: this. profileedit.doc_pan_no,

                });
          this.educationlist = this.fb.group({
                    qualification: this. profileedit.doc_education,

                });
          this.bankdetails = this.fb.group({
                    bankname: this. profileedit.bank_name,
                    bankbranch: this. profileedit.branch_name,
                    ifsccode: this. profileedit.ifsc_code,
                    accountnumber: this. profileedit.bank_acc_no
                });

            this.profile =  this. profileedit.pos_profile_img;
            this.aadharfront = this. profileedit.doc_aadhar_front_img;
            this.aadharback = this. profileedit.doc_aadhar_back_img;
            this.pancard = this. profileedit.doc_pan_img;
            this.education = this. profileedit.doc_edu_certificate_img;
            this.chequeleaf = this. profileedit.check_leaf_upload_img;
        }
    }
    getPosProfileFailure(error) {
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
            this.contacts.controls['city'].setValue(this.response.city);
            this.contacts.controls['state'].setValue(this.response.state);
            this.contacts.controls['country'].setValue(this.response.country);
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
        } else {
            this.toastr.error(successData.ErrorObject, 'Failed');
        }


    }
    public fileUploadFailure(error) {
    }

    // handle error data

    public labFailure(error) {
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
        // const formData = new FormData();
        // formData.append("uploadedImage", this.data.image);
        //
        // this._http.post(this.postUrl, formData, { headers: headers })
        //     .subscribe();

        let date = this.datepipe.transform(this.personal.value['birthday'], 'y-MM-dd');
        const data =  {
            "platform": "web",
            "pos_hidden_id": this.authService.getPosUserId(),
            "role_id": this.authService.getPosRoleId(),
            "pos_referralcode": this.personal.value['referralconduct'],
            "pos_firstname": this.personal.value['firstname'],
            "pos_lastname": this.personal.value['lastname'] ,
            "pos_dob": date,
            "pos_gender": this.personal.value['gender'],
            "pos_mobileno": this.contacts.value['phone1'],
            "pos_email": this.contacts.value['email'],
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
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {
            this.toastr.success(successData.ResponseObject);
            this.settings.userId = this.authService.getPosUserId();
            this.settings.username = this.authService.getPosFirstName() +' '+ this.authService.getPosLastName();
             if (this.profileedit.doc_verified_status < 2) {
                 const data = {
                     "platform": "web",
                     "pos_id": this.authService.getPosUserId(),
                     "role_id": this.authService.getPosRoleId(),
                     "pos_pan_no": this.documents.value['pannumber'],
                     "pos_education": this.educationlist.value['qualification'],
                     "pos_aadhar_no": this.documents.value['aadharnumber'],
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
                 }else if (this.chequeleaf == ''){
                     this.toastr.error('please upload chequeleaf')
                 }else if (this.chequeleaf == ''){
                     this.toastr.error('please upload chequeleaf')
                 } else {
                     this.updateDocuments(data);
                 }

             } else {
                 this.router.navigate(['/pos-profile']);
             }

        }
    }
    updatePosProfileFailure(error) {
        this.settings.loadingSpinner = false;
    }
    updateDocuments(data) {
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
        }
    }
    public updateDocumentsProfileFailure(error) {

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
            } else if (typeof event.value._i == 'object') {
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

}
