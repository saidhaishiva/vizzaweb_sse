import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTabChangeEvent } from '@angular/material';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CommonService } from '../../shared/services/common.service';
import { AuthService } from '../../shared/services/auth.service';
import { ConfigurationService} from '../../shared/services/configuration.service';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../shared/services/login.service';
import { ActivatedRoute, Params, Router} from '@angular/router';
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
  selector: 'app-pos-edit',
  templateUrl: './pos-edit.component.html',
  styleUrls: ['./pos-edit.component.scss'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ]
})
export class PosEditComponent implements OnInit {
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
    DateValidator: any;
    roleId: any;
    img: boolean;
    profile: any;
    selectedIndex: any;
    public passwordHide: boolean = true;
    personalCitys: any;
    pincodeErrors : any;
    public personal: any;
    public currentTab: any;
    public documentStatus: any;
    public posid: any;
    public posstatus: any;

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
              phone2: '',
              address1: ['', Validators.compose([Validators.required])],
              address2: '',
              pincode: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
          }),
          documents: this.fb.group({
              aadharnumber: ['', Validators.compose([Validators.required])],
              pannumber: ['', Validators.compose([Validators.required, Validators.pattern('^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$')])],
              aadharfront: ['',Validators.compose( [Validators.required])],
              aadharback: ['',Validators.compose( [Validators.required])],
              pancard: ['',Validators.compose( [Validators.required])]
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
          this.posid = params.id;
      });
      this.getPosProfileList();
  }

  ngOnInit() {
      this.settings.loadingSpinner = false;
      this.pincodeErrors = false;
  }
//get Admin pos ProfileList
    getPosProfileList(){
        const data = {
            'platform': 'web',
            'adminid': this.auth.getAdminId(),
            'roleid': this.auth.getAdminRoleId(),
            'pos_id': this.posid
        };
        console.log(data);
        this.common.getPosProfileList(data).subscribe(
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
            this.documentStatus = this.personal.doc_verified_status;
            let date;
            date = this.personal.pos_dob.split('/');
            date = date[2] + '-' + date[1] + '-' + date[0];
            date = this.datepipe.transform(date, 'y-MM-dd');
            console.log(date, 'dateee');
            this.form = this.fb.group({
                personal: this.fb.group({
                id: null,
                firstname: this.personal.pos_firstname,
                lastname: this.personal.pos_lastname,
                birthday: date,
                gender: this.personal.pos_gender,
                referralconduct: this.personal.pos_referral_code,
                // profile: this.personal.pos_profile_img
                }),
                contacts: this.fb.group({
                    email: this.personal.pos_email,
                    phone1: this.personal.pos_mobileno,
                    phone2: this.personal.pos_alternate_mobileno,
                    address1: this.personal.pos_address1,
                    address2: this.personal.pos_address2,
                    pincode: this.personal.pos_postalcode,
                }),
                documents: this.fb.group({
                    aadharnumber: this.personal.doc_aadhar_no,
                    pannumber: this.personal.doc_pan_no,
                    // aadharfront: this.personal.doc_aadhar_front_img,
                    // aadharback: this.personal.doc_aadhar_back_img,
                    // pancard: this.personal.doc_pan_img

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
                    // chequeleaf: this.personal.check_leaf_upload_img
                }),
                // profile: this.personal.pos_profile_img,
                aadharfront: this.personal.doc_aadhar_front_img,
                aadharback: this.personal.doc_aadhar_back_img,
                pancard: this.personal.doc_pan_img,
                education: this.personal.doc_edu_certificate_img,
                chequeleaf: this.personal.check_leaf_upload_img,
        });
        }
    }

    setPosProfileFailure(error) {
        console.log(error);
    }

    updateAdminPosProfile(){
        const data =  {
            "platform": "web",
            "admin_id": this.auth.getAdminId(),
            "admin_roleid": this.auth.getAdminRoleId(),
            "pos_id": this.posid,
            "pos_firstname": this.form ['personal']['firstname'].value,
            "pos_lastname": this.form ['personal']['lastname'].value,
            "pos_dob": this.dob,
            "pos_gender": this.form ['personal']['gender'].value,
            "pos_mobileno": this.form ['contacts']['phone1'].value,
            "pos_email": this.form ['contacts']['email'].value,
            "pos_alternate_mobileno": this.form ['contacts']['phone2'].value,
            "pos_address1": this.form ['contacts']['address1'].value,
            "pos_address2": this.form ['contacts']['address2'].value,
            "pos_postalcode": this.form ['contacts']['pincode'].value,
            "pos_profile_img": this.profile == undefined ? '' : this.profile,
            'bank_name': this.form ['bankdetails']['bankname'].value,
            'bank_acc_no': this.form ['bankdetails']['accountnumber'].value,
            'branch_name': this.form ['bankdetails']['bankbranch'].value,
            'ifsc_code': this.form ['bankdetails']['ifsccode'].value,
            'check_leaf_upload_img':this.chequeleaf
        };
        this.settings.loadingSpinner = true;
        this.common.updateAdminPosProfile(data).subscribe(
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
            this.toastr.success(successData.ResponseObject);
            // this.settings.userId = this.auth.getPosUserId();
        }
    }
    updateaAminPosProfileFailure(error) {
        console.log(error);
        this.settings.loadingSpinner = false;
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

    addEvent(event, i) {
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
            // this.form['controls'].contacts['controls'].pincode.patchValue('');
            // this.toastr.error('Invalid pincode');

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
