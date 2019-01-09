import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray, FormControl} from '@angular/forms';
import {HealthService} from '../../shared/services/health.service';
import {MatStepper} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DatePipe} from '@angular/common';
import {AuthService} from '../../shared/services/auth.service';
import {HttpClient} from '@angular/common/http';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {Settings} from '../../app.settings.model';
import {AppSettings} from '../../app.settings';
import {CommonService} from '../../shared/services/common.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {MomentDateAdapter } from '@angular/material-moment-adapter';
import {Pipe, PipeTransform, Inject, LOCALE_ID } from '@angular/core';
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
  selector: 'app-iffco-tokio',
  templateUrl: './iffco-tokio.component.html',
  styleUrls: ['./iffco-tokio.component.scss'],
    providers: [

        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
})
export class IffcoTokioComponent implements OnInit {
    public proposer: FormGroup;
    public summary: FormGroup;
    public insureArray: FormGroup;
    public nomineeDetails: FormGroup;
    public setDate: any;
    public selectDate: any;
    public stopNext: boolean;
    public buyProductdetails: any;
    public groupName: any;
    public getFamilyDetails: any;
    public enquiryId: any;
    public proposerData: any;
    public today: any;
    public declaration: boolean;
    public summaryData: any;
    public InsuredDetailsList: any;
    public lastStepper: any;
    public questionerData: any;
    public webhost: any;
    public settings: Settings;
    public proposalId: any;
    public hideQuestion: any;
    public step: any;
    public totalInsureDetails: any;
    public response: any;
    public setDateAge: any;
    public dobError: any;
    public dob: any;
    public minDate: any;
    public RediretUrlLink: any;

    public insurePersons: any;
    public items: any;
    public pin: any;
    public setPincode: any;
    public title: any;
    public proposerAge: any;
    public mobileNumber: any;

    constructor(public proposalservice: HealthService, public datepipe: DatePipe, private toastr: ToastrService, public appSettings: AppSettings, public dialog: MatDialog,
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
        this.totalInsureDetails = [];

        this.proposer = this.fb.group({
            proposerTitle: ['',Validators.required],
            proposerFirstname: ['',Validators.required],
            proposerMidname: '',
            proposerLastname: ['',Validators.required],
            proposerGender: ['', Validators.compose([Validators.required])],
            proposerDob: ['', Validators.compose([Validators.required])],
            proposerEmail: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
            proposerMobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
            proposerAltnumber: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
            proposerOfficePhone: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
            proposerMarital: ['', Validators.required],
            proposerOccupation: ['', Validators.required],
            // aadharnumber: ['', Validators.compose([Validators.required])],
            proposerPan: ['', Validators.compose([ Validators.minLength(10), Validators.required])],
            proposerPhone: '',
            proposerAddress: ['',Validators.required],
            proposerAddress2:'',
            proposerPincode: ['', Validators.required],
            proposerNationality: ['', Validators.required],
            proposerState: ['', Validators.required],
            proposerDistrict: ['', Validators.required],
            proposerCity: ['', Validators.required],
            sameas: false,
            rolecd: 'PROPOSER',
            type: ''

        });
        this.nomineeDetails = this.fb.group({
            nomineeFirstName: ['', Validators.required],
            nomineeMidName: '',
            nomineeLastName: ['', Validators.required],
            nomineeRelationship: ['', Validators.required],
            nomineeOtherRelationship: '',
            nomineeAddress: ['', Validators.required],
            nomineeAddress2: ['', Validators.required],
            nomineeAddress3: '',
            nomineePincode: ['', Validators.required],
            nomineeCountry: 'IND',
            nomineeState: ['', Validators.required],
            nomineeDistrict: ['', Validators.required],
            nomineeCity: ['', Validators.required],
            nomineeArea: ['', Validators.required],
            nearestLandMark: '',
            nomineeTitle: ['', Validators.required],
            nomineeDob: ['', Validators.compose([Validators.required])]

        });
    }

    changeGender() {
        if (this.proposer.controls['proposerTitle'].value == 'MR'){
            this.proposer.controls['proposerGender'].patchValue('Male');
        } else {
            this.proposer.controls['proposerGender'].patchValue('Female');
        }
    }
    insureChangeGender(index) {
        if (this.insureArray['controls'].items['controls'][index]['controls'].proposerTitle.value == 'MR') {
            this.insureArray['controls'].items['controls'][index]['controls'].proposerGender.patchValue('Male');
        } else {
            this.insureArray['controls'].items['controls'][index]['controls'].proposerGender.patchValue('Female');
        }
    }




    ngOnInit() {
        this.buyProductdetails = JSON.parse(sessionStorage.buyProductdetails);
        this.enquiryId = sessionStorage.enquiryId;
        this.groupName = sessionStorage.groupName;
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

        this.sessionData();
        this.setDate = Date.now();
        this.setDate = this.datepipe.transform(this.setDate, 'dd-MM-y');
    }


    setStep(index: number) {
        this.step = index;
    }

    prevStep() {
        this.step--;
    }

    initItemRows() {
        return this.fb.group(
            {
                rolecd: 'PRIMARY',
                proposerTitle: ['', Validators.required],
                proposerFirstname: new FormControl(''),
                proposerLastname: ['', Validators.required],
                proposerMidname: '',
                proposerDob: ['', Validators.compose([Validators.required])],
                proposerGender: ['', Validators.compose([Validators.required])],
                proposerAge: ['', Validators.compose([Validators.required])],
                proposerMaritalStatus: ['', Validators.compose([Validators.required])],
                proposerrelationship: ['', Validators.required],
                proposerOccupation: ['', Validators.required],
                proposerHeight: ['', Validators.required],
                proposerWeight: ['', Validators.required],
                proposerFax: ['', Validators.compose([ Validators.minLength(10)])],
                proposerAadhar: ['', Validators.compose([Validators.minLength(12)])],
                IsExistingIllness: 'No',
                DiseaseID: '',
                IsInsuredConsumetobacco: '',
                HasAnyPreClaimOnInsured: '',
                HasAnyPreHealthInsuranceCancelled: '',
                DetailsOfPreClaimOnInsured: '',
                DetailsOfPrevInsuranceCancelled: '',
                OtherDisease: '',
                InsuranceCompName: '',
                PreviousPolNo: '',
                PolicyStartDate: '',
                PolicyEndDate: '',
                CoverTypeID: '',
                SumInsured: '',
                AccumulatedCumulativeBonus: '',
                sameAsProposer: false,
                sameas: false,
                type: '',
                cityHide: '',
                pCityHide: '',
                altmobileNumber:'',
                ins_age: '',
                ins_days: '',
                insurerDobError: ''
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
        this.setDate = this.datepipe.transform(this.selectDate, 'dd-MM-y');
        this.setDateAge = this.datepipe.transform(this.selectDate, 'y-MM-dd');
        this.proposerAge = this.ageCalculate(this.setDateAge);
        if(title == 'proposer'){
            sessionStorage.setItem('proposerAge', this.proposerAge);
        } else if(title == 'insurer') {
            sessionStorage.setItem('insurerAge', this.proposerAge);
            this.insureArray['controls'].items['controls'][index]['controls'].proposerAge.patchValue(sessionStorage.insurerAge);
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
        return yearAge;
    }

    sessionData() {

    }



    commonPincode(pin, title){
        this.pin = pin;
        this.title = title;
        const data = {
            'platform': 'web',
            'pincode': this.pin
        }
        if (this.pin.length == 6) {
            this.proposalservice.getCheckpincode(data).subscribe(
                (successData) => {
                    this.commonPincodeSuccess(successData);
                },
                (error) => {
                    this.commonPincodeFailure(error);
                }
            );
        }
    }

    public commonPincodeSuccess(successData) {
        this.setPincode = successData.ResponseObject;
        if (this.title == 'proposalP') {
            if (successData.IsSuccess) {
            }
        }
    }

    public commonPincodeFailure(error) {
    }

    //Create IffcoTokio star-health-proposal
    proposal() {

    }

    public proposalSuccess(successData) {
    }
    add(event){
        if (event.charCode !== 0) {
            const pattern = /[0-9/\\ ]/;
            const inputChar = String.fromCharCode(event.charCode);

            if (!pattern.test(inputChar)) {
                // invalid character, prevent input
                event.preventDefault();
            }
        }
    }
    public onCharacter(event: any) {
        if (event.charCode !== 0) {
            const pattern = /[a-zA-Z\\ ]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }
    alternateChange(event) {
        if (event.target.value.length == 10) {
            if(event.target.value == this.proposer.get('proposerMobile').value) {
                this.mobileNumber = 'Alternate number should be different from mobile number';
            } else {
                this.mobileNumber = '';
            }
        } else {
            // this.mobileNumber = 'false';
        }
        sessionStorage.mobileNumber = this.mobileNumber;
    }
}
