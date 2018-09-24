import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTabChangeEvent } from '@angular/material';
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
  selector: 'app-pos-edit',
  templateUrl: './pos-edit.component.html',
  styleUrls: ['./pos-edit.component.scss']
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

  constructor(public config: ConfigurationService, public fb: FormBuilder, public router: Router, public datepipe: DatePipe, public appSettings: AppSettings, public login: LoginService, public common: CommonService, public auth: AuthService, private toastr: ToastrService) {
      this.settings = this.appSettings.settings;
      // this.settings.HomeSidenavUserBlock = false;
      this.settings.sidenavIsOpened = false;
      this.settings.sidenavIsPinned = false;
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
      this.aadharfront = '';
      this.aadharback = '';
      this.chequeleaf = '';
      // this.profile = '';
      this.pancard = '';
      this.education = '';
      // this.roleId = this.auth.getPosRoleId();
      // console.log(this.roleId, 'assss');
      // if (this.roleId > 0) {
      //     this.router.navigate(['/pos-profile']);
      // }
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
    checkGender() {
        if (this.form['controls'].personal['controls']['gender'].value != '' && this.form['controls'].personal['controls']['gender'].value != undefined) {
            this.mismatchError = '';
        } else {
            this.mismatchError = 'Gender is required ';
        }
    }

    public keyPress(event: any) {
        if (event.charCode !== 0) {
            const pattern = /[0-9 ]/;
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

    public eventHandler(event) {
        console.log(event, event.keyCode, event.keyIdentifier);
    }

    //dob validation
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
                console.log(birth,'dob');
                if (dob.length == 10) {
                    this.ageCalculate(dob);
                } else {
                    this.img = false;

                }

            } else if (typeof event.value._i == 'object') {

                this.dob = this.datepipe.transform(event.value, 'y-MM-dd');

                this.ageCalculate(this.datepipe.transform(event.value, 'y-MM-dd'));

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


}
