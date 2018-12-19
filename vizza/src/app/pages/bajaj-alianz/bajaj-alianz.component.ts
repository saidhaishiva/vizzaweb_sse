import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray, FormControl} from '@angular/forms';
import {ProposalService} from '../../shared/services/proposal.service';
import { MatStepper } from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DatePipe } from '@angular/common';
import {AuthService} from '../../shared/services/auth.service';
import {HttpClient} from '@angular/common/http';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {Settings} from '../../app.settings.model';
import { AppSettings } from '../../app.settings';
import {CommonService} from '../../shared/services/common.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Pipe, PipeTransform, Inject, LOCALE_ID } from '@angular/core';
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
  selector: 'app-bajaj-alianz',
  templateUrl: './bajaj-alianz.component.html',
  styleUrls: ['./bajaj-alianz.component.scss'],
    providers: [

        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
})
export class BajajAlianzComponent implements OnInit {
    public proposer: FormGroup;
    public insureArray: FormGroup;
    public minDate: any;
    public stopNext: any;
    public hideQuestion: any;
    public declaration: any;
    public settings: Settings;
    public webhost: any;
    public selectDate: any;
    public proposalId: any;
    public step: any;

    public setDate: any;
    public setDateAge: any;
    public dob: any;
    public dobError: any;
    public personalAge: any;
    public getFamilyDetails: any;
    public items: any;
    public insurePersons: any;

  constructor(public proposalservice: ProposalService, public datepipe: DatePipe, private toastr: ToastrService, public appSettings: AppSettings, public dialog: MatDialog,
              public config: ConfigurationService, public common: CommonService, public fb: FormBuilder, public auth: AuthService, public http: HttpClient, @Inject(LOCALE_ID) private locale: string) {
      const minDate = new Date();
      this.minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
      this.stopNext = false;
      this.hideQuestion = false;
      this.declaration = false;
      this.settings = this.appSettings.settings;
      this.settings.HomeSidenavUserBlock = false;
      this.settings.sidenavIsOpened = false;
      this.settings.sidenavIsPinned = false;
      this.webhost = this.config.getimgUrl();
      this.selectDate = '';
      this.proposalId = 0;
      this.step = 0;

      this.proposer = this.fb.group({
          proposerTitle: ['',Validators.required],
          proposerFirstname: ['',Validators.required],
          proposerMidname: '',
          proposerLastname: ['',Validators.required],
          proposerGender: ['', Validators.compose([Validators.required])],
          proposerDob: ['', Validators.compose([Validators.required])],
          proposerEmail: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
          proposerMobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
          aadharnumber: ['', Validators.compose([Validators.required])],
          proposerPan: ['', Validators.compose([ Validators.minLength(10), Validators.required])],
          proposerPhone: '',
          proposerAddress: ['',Validators.required],
          proposerAddress2:'',
          proposerPincode: ['', Validators.required],
          proposerNationality: ['', Validators.required],
          proposerState: ['', Validators.required],
          proposerDistrict: ['', Validators.required],
          proposerCity: ['', Validators.required],
          proposerArea: ['', Validators.required],
          proposerPIName:['', Validators.required],
          proposerPIAddress:['', Validators.required],
          proposerPItDate: ['', Validators.compose([Validators.required])],
          proposerPINumber: ['', Validators.required],
          proposerPIClaims: ['', Validators.required]
      });
      this.insureArray = this.fb.group({

      });

  }
    changeGender() {
        if (this.proposer.controls['personalTitle'].value == 'MR'){
            this.proposer.controls['personalGender'].patchValue('Male');
        } else {
            this.proposer.controls['personalGender'].patchValue('Female');
        }
    }
    insureChangeGender(index) {
        if (this.insureArray['controls'].items['controls'][index]['controls'].insureTitle.value == 'MR') {
            this.insureArray['controls'].items['controls'][index]['controls'].insureGender.patchValue('Male');
        } else {
            this.insureArray['controls'].items['controls'][index]['controls'].insureGender.patchValue('Female');
        }
    }

    ngOnInit() {
        this.getFamilyDetails = JSON.parse(sessionStorage.changedTabDetails);
        this.insurePersons = this.getFamilyDetails.family_members;
        this.insureArray = this.fb.group({
            items: this.fb.array([])
        });
        for (let i = 0; i < this.getFamilyDetails.family_members.length; i++) {
            this.items = this.insureArray.get('items') as FormArray;
            this.items.push(this.initItemRows());
            this.insureArray['controls'].items['controls'][i]['controls'].type.setValue(this.getFamilyDetails.family_members[i].type);
        }
  }

    initItemRows() {
        return this.fb.group(
            {
                rolecd: 'PRIMARY',
                insureTitle: ['', Validators.required],
                insureName: ['', Validators.required],
                insureDob: ['', Validators.compose([Validators.required])],
                insureGender: ['', Validators.compose([Validators.required])],
                type: '',
                insureDobError: '',
                ins_days: '',
                ins_age: ''

            }
        );
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


    addEvent(event, title, index) {
        let dd = event.value;
        this.selectDate = event.value;
        console.log(this.selectDate);
        this.setDate = this.datepipe.transform(this.selectDate, 'dd-MM-y');
        this.setDateAge = this.datepipe.transform(this.selectDate, 'y-MM-dd');
        this.personalAge = this.ageCalculate(this.setDateAge);
        if(title == 'proposer'){
            sessionStorage.setItem('proposerAge', this.personalAge);
        } else if(title == 'insurer') {
            sessionStorage.setItem('insurerAge', this.personalAge);
            this.insureArray['controls'].items['controls'][index]['controls'].personalAge.patchValue(sessionStorage.insurerAge);
        }
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

                let dob = this.datepipe.transform(event.value, 'y-MM-dd');
                this.dob = dob;
                console.log(dob, 'dob');
                if (selectedDate.length == 10) {
                    this.ageCalculate(dob);
                } else {
                }

            } else if (typeof event.value._i == 'object') {

                this.dob = this.datepipe.transform(event.value, 'y-MM-dd');
                if (this.dob.length == 10) {
                    this.ageCalculate(this.datepipe.transform(event.value, 'y-MM-dd'));
                } else {

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
            console.log( this.dob, 'ghjkl');
        }

    }

    public onCharacter(event: any) {
        if (event.charCode !== 0) {
            const pattern = /[a-zA-Z]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }

    ageCalculate(dob) {
        const mdate = dob.toString();
        const yearThen = parseInt(mdate.substring(8, 10), 10);
        const monthThen = parseInt(mdate.substring(5, 7), 10);
        const dayThen = parseInt(mdate.substring(0, 4), 10);
        const todays = new Date();
        const birthday = new Date(dayThen, monthThen - 1, yearThen);
        const differenceInMilisecond = todays.valueOf() - birthday.valueOf();
        const yearAge = Math.floor(differenceInMilisecond / 31536000000);
        console.log(yearAge, 'console.log(yearAge)');
        return yearAge;
    }
}
