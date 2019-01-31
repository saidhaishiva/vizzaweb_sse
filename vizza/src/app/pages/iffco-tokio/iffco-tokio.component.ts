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
    public previousInsuranceFrom: FormGroup;
    public riskDetails: FormGroup;
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

    public personalData: any;

    public getStepper1: any;
    public getStepper2: any;
    public getStepper3: any;
    public getNomineeData: any;
    public prevviousInsuranceStepperDetails: any;

    public nomineeAge: any;
    public personalAge: any;
    public nomineeDateError: any;
    public previousStartDateError: any;
    public previousEndtDateError: any;
    public getAge: any;
    public getDays: any;
    public arr: any;

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
            proposerAltnumber: ['', Validators.compose([Validators.pattern('[6789][0-9]{9}')])],
            proposerPhone: '',
            proposerMarital: ['', Validators.required],
            proposerOccupation: ['', Validators.required],
            proposerRelationship: ['', Validators.required],
            proposerPan: ['', Validators.compose([ Validators.minLength(10)])],
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
// aadharnumber: ['', Validators.compose([Validators.required])],
        });
        this.previousInsuranceFrom = this.fb.group({
            InsuranceCompName: '',
            PreviousPolNo: '',
            PolicyStartDate: '',
            PolicyEndDate: '',
            CoverTypeID: '',
            SumInsured:'',
            AccumulatedCumulativeBonus: ''
        });
        this.nomineeDetails = this.fb.group({
            nomineeTitle: ['', Validators.required],
            nomineeFirstName: ['', Validators.required],
            nomineeMidName: '',
            nomineeLastName: ['', Validators.required],
            nomineeDob: ['', Validators.compose([Validators.required])],
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
            nearestLandMark: ''
        });
        this.riskDetails = this.fb.group({
            serviceTax: 'No',
            ServicesTaxId: '',
            relianceAda: 'No',
            companyname: '',
            employeeCode: '',
            emailId:'',
            crossSell: 'No',
            crossSellPolicyNo: '',
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
        // this.buyProductdetails = JSON.parse(sessionStorage.buyProductdetails);
        // this.enquiryId = sessionStorage.enquiryId;
        // this.groupName = sessionStorage.groupName;
        // this.getFamilyDetails = JSON.parse(sessionStorage.changedTabDetails);
        // this.insurePersons = this.getFamilyDetails.family_members;
        this.insureArray = this.fb.group({
            items: this.fb.array([])
        });
        let family_members = [{'type':'Self', 'age': '25'}];
        for (let i = 0; i < family_members.length; i++) {
            this.items = this.insureArray.get('items') as FormArray;
            this.items.push(this.initItemRows());
            this.insureArray['controls'].items['controls'][i]['controls'].type.setValue(family_members[i].type);
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
                proposerFirstname: ['', Validators.required],
                proposerLastname: ['', Validators.required],
                proposerMidname: '',
                proposerDob: ['', Validators.compose([Validators.required])],
                proposerGender: ['', Validators.compose([Validators.required])],
                proposerAge: ['', Validators.compose([Validators.required])],
                proposerMaritalStatus: ['', Validators.compose([Validators.required])],
                proposerRelationship: ['', Validators.required],
                proposerOccupation: ['', Validators.required],
                proposerHeight: ['', Validators.required],
                proposerWeight: ['', Validators.required],
                proposerFax: ['', Validators.compose([ Validators.minLength(10)])],
                proposerAadhar: ['', Validators.compose([Validators.minLength(12)])],
                IsExistingIllness: 'No',
                DiseaseID: '',
                IsInsuredConsumetobacco: 'No',
                HasAnyPreClaimOnInsured: 'No',
                HasAnyPreHealthInsuranceCancelled: 'No',
                DetailsOfPreClaimOnInsured: '',
                DetailsOfPrevInsuranceCancelled: '',
                OtherDisease: '',
                sameAsProposer: false,
                sameas: false,
                type: '',
                cityHide: '',
                pCityHide: '',
                altmobileNumber:'',
                ins_age: '',
                ins_days: '',
                insurerDobError: '',
                insurerDobValidError: ''
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
    public keyEvent(event: any) {
        if (event.charCode !== 0) {
            const pattern = /[0-9a-zA-Z ]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }
    addEvent(event, type) {
        if (event.value != null) {
            let selectedDate = '';
            this.personalAge = '';
            let dob = '';
            if (typeof event.value._i == 'string') {
                const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
                if (pattern.test(event.value._i) && event.value._i.length == 10) {
                    if(type == 'nominee') {
                        this.nomineeDateError = '';
                    } else if(type == 'previousStartDate'){
                        this.previousStartDateError = '';
                    } else if(type == 'previousEndStartDate'){
                        this.previousEndtDateError = '';
                    }else if (type == 'personal') {
                        this.dobError = '';
                    }
                    else {
                        this.dobError = '';
                    }
                } else {
                    if(type == 'nominee') {
                        this.nomineeDateError = 'Enter Valid Date';
                    } else if(type == 'previousStartDate'){
                        this.previousStartDateError = 'Enter Valid Date';
                    } else if(type == 'previousEndStartDate'){
                        this.previousEndtDateError = 'Enter Valid Date';
                    } else if(type == 'personal'){
                        this.dobError = 'Enter Valid Date';
                    }else {
                        this.dobError = 'Enter Valid Date';
                    }

                }
                selectedDate = event.value._i;
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                if (selectedDate.length == 10) {
                    if(type == 'personal') {
                        this.personalAge = this.ageCalculate(dob);
                        sessionStorage.personalAge = this.personalAge;
                    } else if(type == 'nominee') {
                        this.nomineeAge = this.ageCalculate(dob);
                        sessionStorage.nomineeAge = this.nomineeAge;
                    }


                }

            } else if (typeof event.value._i == 'object') {
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                if (dob.length == 10) {
                    if(type == 'personal') {
                        this.personalAge = this.ageCalculate(dob);
                        sessionStorage.personalAge = this.personalAge;
                    }
                    else if(type == 'nominee') {
                        this.nomineeAge = this.ageCalculate(dob);
                        sessionStorage.nomineeAge = this.nomineeAge;
                    }
                }
                this.dobError = '';
                this.nomineeDateError = '';
                this.previousStartDateError = '';
                this.previousEndtDateError = '';
            }

        }
    }

    addEventInsurer(event, name, i, type) {

        if (event.value != null) {
            let selectedDate = '';
            let dob = '';
            this.getAge = '';
            this.getDays;
            if (typeof event.value._i == 'string') {
                const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
                if (pattern.test(event.value._i) && event.value._i.length == 10) {
                    this.insureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
                } else {
                    this.insureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('Enter Valid DOB');
                }
                selectedDate = event.value._i;
                dob = this.datepipe.transform(event.value, 'y-MM-dd');

                if (selectedDate.length == 10) {

                    if (name == 'startDate') {
                        // this.insureArray['controls'].items['controls'][i]['controls'].dobErrorStartDate.patchValue('');
                        // this.insureArray['controls'].items['controls'][i]['controls'].PolicyStartDate.patchValue(dob);
                        // this.maxDate = dob;
                    } else {
                        this.getAge = this.ageCalculate(dob);
                        this.getDays = this.ageCalculateInsurer(dob);
                        this.insureArray['controls'].items['controls'][i]['controls'].proposerAge.patchValue(this.getAge);
                        this.insureArray['controls'].items['controls'][i]['controls'].proposerDob.patchValue(dob);

                    }

                } else {
                    if (name == 'startDate') {
                        // this.insureArray['controls'].items['controls'][i]['controls'].dobErrorStartDate.patchValue('Enter Valid Date');
                    } else {
                        this.insureArray['controls'].items['controls'][i]['controls'].proposerAge.patchValue('');
                    }

                }
            }else if (typeof event.value._i == 'object') {

                dob = this.datepipe.transform(event.value, 'y-MM-dd');

                if (dob.length == 10) {
                    if (name == 'startDate') {
                        // this.insureArray['controls'].items['controls'][i]['controls'].PolicyStartDate.patchValue(dob);
                        // this.insureArray['controls'].items['controls'][i]['controls'].dobErrorStartDate.patchValue('');
                        // this.maxDate = dob;
                    } else {
                        this.getAge = this.ageCalculate(dob);
                        this.getDays = this.ageCalculateInsurer(dob);
                        this.insureArray['controls'].items['controls'][i]['controls'].proposerDob.patchValue(dob);
                    }

                }

            }
            console.log(this.insureArray['controls'].items['controls'][i]['controls'].proposerDob.value, 'opopp1');
            console.log(this.datepipe.transform(this.insureArray['controls'].items['controls'][i]['controls'].proposerDob.value, 'y-MM-dd'), 'opopp23');
            let length =  this.datepipe.transform(this.insureArray['controls'].items['controls'][i]['controls'].proposerDob.value, 'y-MM-dd');
            if (length.length == 10) {
                if (name == 'startDate') {
                } else {
                    this.insureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
                    this.insureArray['controls'].items['controls'][i]['controls'].ins_age.patchValue(this.getAge);
                    this.insureArray['controls'].items['controls'][i]['controls'].proposerAge.patchValue(this.getAge);
                    this.insureArray['controls'].items['controls'][i]['controls'].ins_days.patchValue(this.getDays);
                    this.ageValidation(i, type);
                }

            } else {
                if (name == 'startDate') {
                } else {
                    this.insureArray['controls'].items['controls'][i]['controls'].proposerAge.patchValue('');
                }
            }

        }

    }
    ageCalculateInsurer(dob) {

        let mdate = dob.toString();
        let yearThen = parseInt(mdate.substring( 8,10), 10);
        let monthThen = parseInt(mdate.substring(5,7), 10);
        let dayThen = parseInt(mdate.substring(0,4), 10);
        let todays = new Date();
        let birthday = new Date( dayThen, monthThen-1, yearThen);
        let differenceInMilisecond = todays.valueOf() - birthday.valueOf();
        let Bob_days = Math.ceil(differenceInMilisecond / (1000 * 60 * 60 * 24));
        return Bob_days;
    }
    ageValidation(i, type) {
        console.log(type);
        console.log(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value, 'pppp');
        console.log(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value, 'dysssss');

        if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 18 && type == 'Self') {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Self age should be above 18');
        } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value > 18 && type == 'Self')  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
            this.arr.push(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value);
        }
        if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 18 && type == 'Spouse') {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Spouse age should be above 18');
        } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value > 18 && type == 'Spouse')  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
            this.arr.push(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value);
        }
        let smallest = this.arr[0];
        for(let i = 1; i<this.arr.length; i++){
            if(this.arr[i] < smallest){
                smallest = this.arr[i];
            }
        }


        if(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value >= 91 && this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value <= 9131 && type == 'Son')  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value <= 91 && type == 'Son')  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 91 days to 25 years');
        } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value >= 9131 && type == 'Son')  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 91 days to 25 years');
        }

        if(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value >= 91 && this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value <= 9131 && type == 'Daughter')  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value <= 91 && type == 'Daughter')  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 91 days to 25 years');
        } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value >= 9131 && type == 'Daughter')  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 91 days to 25 years');
        }



        if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 36 && type == 'Mother') {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Mother age should be above 36');
        } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value > 36 && type == 'Mother')  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        }
        if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 36 && type == 'Father') {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Father age should be above 36');
        } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value > 36 && type == 'Father')  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        }
        if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 1 && type == 'Sister') {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Sister age should be above 1');
        } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value > 1 && type == 'Sister')  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        }
        if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 1 && type == 'Brother') {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Brother age should be above 1');
        } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value > 1 && type == 'Brother')  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        }
        if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 36 && type == ' Father In Law') {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue(' Father In Law age should be above 36');
        } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value > 36 && type == ' Father In Law')  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        }
        if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 36 && type == ' Mother In Law') {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue(' Mother In Law age should be above 36');
        } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value > 36 && type == ' Mother In Law')  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        }

        // if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 46 && type == 'Self' && this.buyProductdetails.product_name == 'Care Freedom') {
        //     this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Self age should be above 46');
        // } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value > 46 && type == 'Self' && this.buyProductdetails.product_name == 'Care Freedom')  {
        //     this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        // }
        // if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 46 && type == 'Spouse' && this.buyProductdetails.product_name == 'Care Freedom') {
        //     this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Spouse age should be above 46');
        // } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value > 46 && type == 'Spouse' && this.buyProductdetails.product_name == 'Care Freedom')  {
        //     this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        // }

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
            this.mobileNumber = '';
        }
        sessionStorage.mobileNumber = this.mobileNumber;
    }

    proposerDetails(stepper: MatStepper, value){
        this.personalData = value;
        sessionStorage.stepper1Details = '';
        sessionStorage.stepper1Details = JSON.stringify(value);
        if(this.proposer.valid){
            if (sessionStorage.personalAge >= 18) {
                stepper.next();
            }else {
                this.toastr.error('Proposer age should be 18 or above');
            }
        }else{
            this.toastr.error('please enter all filed');
        }
    }

    sessionData() {
        if (sessionStorage.stepper1Details != '' && sessionStorage.stepper1Details != undefined) {
            this.getStepper1 = JSON.parse(sessionStorage.stepper1Details);
            this.proposer = this.fb.group({
                proposerTitle: this.getStepper1.proposerTitle,
                proposerFirstname: this.getStepper1.proposerFirstname,
                proposerMidname: this.getStepper1.proposerMidname,
                proposerLastname: this.getStepper1.proposerLastname,
                proposerGender: this.getStepper1.proposerGender,
                proposerDob: this.getStepper1.proposerDob,
                proposerEmail: this.getStepper1.proposerEmail,
                proposerMobile: this.getStepper1.proposerMobile,
                proposerAltnumber: this.getStepper1.proposerAltnumber,
                proposerPhone: this.getStepper1.proposerPhone,
                proposerMarital: this.getStepper1.proposerMarital,
                proposerOccupation: this.getStepper1.proposerOccupation,
                proposerRelationship: this.getStepper1.proposerRelationship,
                proposerPan: this.getStepper1.proposerPan,
                proposerAddress: this.getStepper1.proposerAddress,
                proposerAddress2: this.getStepper1.proposerAddress2,
                proposerPincode: this.getStepper1.proposerPincode,
                proposerNationality: this.getStepper1.proposerNationality,
                proposerState: this.getStepper1.proposerState,
                proposerDistrict: this.getStepper1.proposerDistrict,
                proposerCity: this.getStepper1.proposerCity,

            });

            if (this.getStepper1.proposerPincode != '') {
                this.commonPincode(this.getStepper1.proposerPincode, 'proposalP');
                setTimeout(() =>{
                    if(this.getStepper1.sameas == true) {
                        // this.inputReadonly = true;
                        this.commonPincode(this.getStepper1.proposerPincode, 'proposalR');
                    } else if(this.getStepper1.sameas == false) {
                        this.commonPincode(this.getStepper1.residencePincode, 'proposalR');
                    }
                },2000);
            };

            let getPerDob = this.datepipe.transform(this.getStepper1.personalDob, 'y-MM-dd');
            this.proposer['controls'].personalDob.patchValue(getPerDob);

        }

        if (sessionStorage.stepper2Details != '' && sessionStorage.stepper2Details != undefined) {
            this.getStepper2 = JSON.parse(sessionStorage.stepper2Details);
            for (let i = 0; i < this.getStepper2.items.length; i++) {
                this.insureArray['controls'].items['controls'][i]['controls'].rolecd.patchValue(this.getStepper2.items[i].rolecd);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerTitle.patchValue(this.getStepper2.items[i].proposerTitle);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerFirstname.patchValue(this.getStepper2.items[i].proposerFirstname);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerGender.patchValue(this.getStepper2.items[i].proposerGender);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerAge.patchValue(this.getStepper2.items[i].proposerAge);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerLastname.patchValue(this.getStepper2.items[i].proposerLastname);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerDob.patchValue(this.getStepper2.items[i].proposerDob);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerRelationship.patchValue(this.getStepper2.items[i].proposerRelationship);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerOccupation.patchValue(this.getStepper2.items[i].proposerOccupation);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerHeight.patchValue(this.getStepper2.items[i].proposerHeight);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerWeight.patchValue(this.getStepper2.items[i].proposerWeight);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerMaritalStatus.patchValue(this.getStepper2.items[i].proposerMaritalStatus);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerFax.patchValue(this.getStepper2.items[i].proposerFax);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerAadhar.patchValue(this.getStepper2.items[i].proposerAadhar);
                this.insureArray['controls'].items['controls'][i]['controls'].sameas.patchValue(this.getStepper2.items[i].sameas);
                this.insureArray['controls'].items['controls'][i]['controls'].sameAsProposer.patchValue(this.getStepper2.items[i].sameAsProposer);
                this.insureArray['controls'].items['controls'][i]['controls'].IsExistingIllness.patchValue(this.getStepper2.items[i].IsExistingIllness);
                this.insureArray['controls'].items['controls'][i]['controls'].DiseaseID.patchValue(this.getStepper2.items[i].DiseaseID);
                this.insureArray['controls'].items['controls'][i]['controls'].IsInsuredConsumetobacco.patchValue(this.getStepper2.items[i].IsInsuredConsumetobacco);
                this.insureArray['controls'].items['controls'][i]['controls'].HasAnyPreClaimOnInsured.patchValue(this.getStepper2.items[i].HasAnyPreClaimOnInsured);
                this.insureArray['controls'].items['controls'][i]['controls'].HasAnyPreHealthInsuranceCancelled.patchValue(this.getStepper2.items[i].HasAnyPreHealthInsuranceCancelled);
                this.insureArray['controls'].items['controls'][i]['controls'].DetailsOfPreClaimOnInsured.patchValue(this.getStepper2.items[i].DetailsOfPreClaimOnInsured);
                this.insureArray['controls'].items['controls'][i]['controls'].DetailsOfPrevInsuranceCancelled.patchValue(this.getStepper2.items[i].DetailsOfPrevInsuranceCancelled);
                this.insureArray['controls'].items['controls'][i]['controls'].OtherDisease.patchValue(this.getStepper2.items[i].OtherDisease);
                this.insureArray['controls'].items['controls'][i]['controls'].ins_age.patchValue(this.getStepper2.items[i].ins_age);
                this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue(this.getStepper2.items[i].insurerDobError);
                this.insureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue(this.getStepper2.items[i].insurerDobValidError);
                this.insureArray['controls'].items['controls'][i]['controls'].ins_days.patchValue(this.getStepper2.items[i].ins_days);
            }
        }

        if (sessionStorage.stepper3Details != '' && sessionStorage.stepper1Details != undefined) {

            this.getStepper3 = JSON.parse(sessionStorage.stepper3Details);
            this.riskDetails = this.fb.group({
                serviceTax: this.getStepper3.serviceTax,
                ServicesTaxId: this.getStepper3.ServicesTaxId,
                relianceAda: this.getStepper3.relianceAda,
                companyname: this.getStepper3.companyname,
                employeeCode: this.getStepper3.employeeCode,
                emailId: this.getStepper3.emailId,
                crossSell: this.getStepper3.crossSell,
                crossSellPolicyNo: this.getStepper3.crossSellPolicyNo
            });
        }

        // if (sessionStorage.nomineeAreaList != '' && sessionStorage.nomineeAreaList != undefined) {
        //     let nomineeRelations = JSON.parse(sessionStorage.nomineeAreaList);
        //     this.nomineeAreaList = nomineeRelations;
        // }


        if (sessionStorage.nomineeData != '' && sessionStorage.nomineeData != undefined) {
            this.getNomineeData = JSON.parse(sessionStorage.nomineeData);
            this.nomineeDetails = this.fb.group({
                nomineeFirstName: this.getNomineeData.nomineeFirstName,
                nomineeMidName: this.getNomineeData.nomineeMidName,
                nomineeLastName: this.getNomineeData.nomineeLastName,
                nomineeRelationship: this.getNomineeData.nomineeRelationship,
                nomineeOtherRelationship: this.getNomineeData.nomineeOtherRelationship,
                nomineeAddress: this.getNomineeData.nomineeAddress,
                nomineeAddress2: this.getNomineeData.nomineeAddress2,
                nomineeAddress3: this.getNomineeData.nomineeAddress3,
                nomineePincode: this.getNomineeData.nomineePincode,
                nomineeCountry: this.getNomineeData.nomineeCountry,
                nomineeCity: this.getNomineeData.nomineeCity,
                nomineeState: this.getNomineeData.nomineeState,
                nomineeCountryId: this.getNomineeData.nomineeCountryId,
                nomineeDistrictId: this.getNomineeData.nomineeDistrictId,
                nomineeCityId: this.getNomineeData.nomineeCityId,
                nomineeStateId: this.getNomineeData.nomineeStateId,
                nomineeDistrict: this.getNomineeData.nomineeDistrict,
                nomineeArea: this.getNomineeData.nomineeArea,
                nearestLandMark: this.getNomineeData.nearestLandMark,
                nomineeTitle: this.getNomineeData.nomineeTitle,
                nomineeDob: this.getNomineeData.nomineeDob
            });
            let getNomineeDob = this.datepipe.transform(this.getNomineeData.nomineeDob, 'y-MM-dd');
            this.nomineeDetails['controls'].nomineeDob.patchValue(getNomineeDob);
        }
        if (sessionStorage.prevviousInsuranceStepperDetails != '' && sessionStorage.prevviousInsuranceStepperDetails != undefined) {
            console.log(sessionStorage.prevviousInsuranceStepperDetails, 'uii');
            let prevviousInsuranceDetails = JSON.parse(sessionStorage.prevviousInsuranceStepperDetails);
            console.log(prevviousInsuranceDetails, 'prevviousInsuranceDetails');
            this.previousInsuranceFrom = this.fb.group({
                InsuranceCompName: prevviousInsuranceDetails.InsuranceCompName,
                PreviousPolNo: prevviousInsuranceDetails.PreviousPolNo,
                PolicyStartDate: this.datepipe.transform(prevviousInsuranceDetails.PolicyStartDate, 'y-MM-dd'),
                PolicyEndDate: this.datepipe.transform(prevviousInsuranceDetails.PolicyEndDate, 'y-MM-dd'),
                CoverTypeID: prevviousInsuranceDetails.CoverTypeID,
                SumInsured: prevviousInsuranceDetails.SumInsured,
                AccumulatedCumulativeBonus: prevviousInsuranceDetails.AccumulatedCumulativeBonus
            });
        }
    }
    sameProposer(value: any) {
        if (value.checked) {
            this.insureArray['controls'].items['controls'][0]['controls'].proposerTitle.patchValue(this.proposer.controls['proposerTitle'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerFirstname.patchValue(this.proposer.controls['proposerFirstname'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerMidname.patchValue(this.proposer.controls['proposerMidname'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerLastname.patchValue(this.proposer.controls['proposerLastname'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerAge.patchValue(sessionStorage.proposerAge);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerMaritalStatus.patchValue(this.proposer.controls['proposerMaritalStatus'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerOccupation.patchValue(this.proposer.controls['proposerOccupation'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerGender.patchValue(this.proposer.controls['proposerGender'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerRelationship.patchValue('345');
            this.insureArray['controls'].items['controls'][0]['controls'].sameas.patchValue(this.proposer.controls['sameas'].value);

            let getDob = this.datepipe.transform(this.proposer.controls['proposerDob'].value, 'y-MM-dd');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerDob.patchValue(getDob);
        } else {
            this.insureArray['controls'].items['controls'][0]['controls'].proposerTitle.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerFirstname.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerMidname.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerLastname.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerDob.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerAge.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerOccupation.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].maritalStatus.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerGender.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerRelationship.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].sameas.patchValue('');
        }
    }
}
