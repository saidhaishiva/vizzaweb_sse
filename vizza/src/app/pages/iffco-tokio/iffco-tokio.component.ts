import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray, FormControl} from '@angular/forms';
import {ProposalService} from '../../shared/services/proposal.service';
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
    public personal: FormGroup;
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
    public personalData: any;
    public occupationList: any;
    public relationshipList: any;
    public today: any;
    public declaration: boolean;
    public summaryData: any;
    public InsuredDetailsList: any;
    public lastStepper: any;
    public questionerData: any;
    public webhost: any;
    public proposalId: any;
    public settings: Settings;
    public pin: any;
    public response: any;
    public personalCitys: any;
    public areaName: any;
    public title: any;
    public cityTitle: any;
    public rAreaNames: any;
    public rAreaName: any;
    public sumTitle: any;
    public sumAreaName: any;
    public setDateAge: any;
    public dobError: any;
    public personalAge: any;
    public religareQuestionsList: any;
    public items: any;
    public step: any;
    public questionEmpty: any;
    public proposerInsureData: any;
    public mobileNumber: any;
    public  altmobileNumber: any;
    public insurerData: any;
    public totalInsureDetails: any;
    public getStepper1: any;
    public insurePersons: any;
    public getStepper2: any;
    public getNomineeData: any;
    public index: any;
    public previousinsurance: any;
    public previousInsuranceStatus: any;
    public previousInsuranceStatus1: any;
    public hideQuestion: any;
    public questions_list: any;
    public totalData: any;
    public sameField: any;
    public insureCity: any;
    public isDisable: any;
    public inputReadonly: any;
    public defaultTrue: boolean;
    public maritalDetail: any;
    public nationalityList: any;
    public ServiceTaxId: any;
    public setPincode: any;
    public riskData: any;
    public nomineeData: any;
    public nomineeRelationshipList: any;
    public getStepper3: any;
    public rStateId: any;
    public rCityId: any;
    public rCountryId: any;
    public nStateId: any;
    public nCityId: any;
    public nCountryId: any;
    public pStateId: any;
    public pCityId: any;
    public pCountryId: any;
    public proposalPArea: any;
    public proposalRArea: any;
    public nomineeAreaList: any;
    public diseaseList: any;
    public coverTypeList: any;
    public dob: any;
    public minDate: any;
    public maxDate: any;
    public RediretUrlLink: any;
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
        this.mobileNumber = 'true';
        this.inputReadonly = false;
        this.defaultTrue = true;
        this.sameField = false;
        this.isDisable = false;
        this.insureCity = false;
        this.proposerInsureData = [];
        this.totalInsureDetails = [];
        this.questions_list = [];
        this.personal = this.fb.group({
            personalTitle: ['', Validators.required],
            personalFirstname: new FormControl(''),
            personalLastname: ['', Validators.required],
            maritalStatus: ['', Validators.required],
            occupation: ['', Validators.required],
            nationality: ['', Validators.required],
            personalMidname: '',
            personalGender: ['', Validators.compose([Validators.required])],
            personalDob: ['', Validators.compose([Validators.required])],
            personalrelationship: 'SELF',
            personalPan: ['', Validators.compose([ Validators.minLength(10)])],
            personalAddress: ['', Validators.required],
            personalAddress2: ['', Validators.required],
            personalAddress3: '',
            personalPincode: ['', Validators.required],
            personalCity: ['', Validators.required],
            personalState: ['', Validators.required],
            personalCountry: 'IND',
            personalCityIdP: '',
            personalStateIdP: '',
            personalCountryIdP: '',
            personalDistrictIdP: '',
            personalDistrict: ['', Validators.required],
            personalEmail: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
            personalMobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
            personalOfficePhone: ['', Validators.compose([ Validators.pattern('[6789][0-9]{9}')])],
            personalAltnumber: '',
            sameas: false,
            rolecd: 'PROPOSER',
            type: ''

        });
        this.nomineeDetails = this.fb.group({
            nomineeFirstName: ['', Validators.required],
            nomineeMidName: '',
            nomineeLastName: ['', Validators.required],
            nomineeRelationship: ['', Validators.required],
            nomineeAddress: ['', Validators.required],
            nomineeAddress2: ['', Validators.required],
            nomineeAddress3: '',
            nomineePincode: ['', Validators.required],
            nomineeCountry: 'IND',
            nomineeState: ['', Validators.required],
            nomineeCountryId: '',
            nomineeStateId: '',
            nomineeCityId: '',
            nomineeDistrict: ['', Validators.required],
            nomineeDistrictId: '',
            nomineeCity: ['', Validators.required],
            nomineeArea: ['', Validators.required],
            nearestLandMark: '',
            nomineeTitle: ['', Validators.required],
            nomineeDob: ['', Validators.compose([Validators.required])]
        });
    }

    changeGender() {
        if (this.personal.controls['personalTitle'].value == 'MR'){
            this.personal.controls['personalGender'].patchValue('Male');
        } else {
            this.personal.controls['personalGender'].patchValue('Female');
        }
    }
    insureChangeGender(index) {
        if (this.insureArray['controls'].items['controls'][index]['controls'].personalTitle.value == 'MR') {
            this.insureArray['controls'].items['controls'][index]['controls'].personalGender.patchValue('Male');
        } else {
            this.insureArray['controls'].items['controls'][index]['controls'].personalGender.patchValue('Female');
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
                personalTitle: ['', Validators.required],
                personalFirstname: new FormControl(''),
                personalLastname: ['', Validators.required],
                personalMidname: '',
                personalDob: ['', Validators.compose([Validators.required])],
                personalGender: ['', Validators.compose([Validators.required])],
                personalAge: ['', Validators.compose([Validators.required])],
                personalAadhar: '',
                personalFax: '',
                maritalStatus: ['', Validators.compose([Validators.required])],
                personalrelationship: ['', Validators.required],
                occupation: ['', Validators.required],
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
                personalHeight: '',
                personalWeight: ''
            }
        );
    }

    //Nominee Details
    religareNomineeDetails(stepper: MatStepper, value) {
        this.lastStepper = stepper;
        sessionStorage.nomineeData = '';
        sessionStorage.nomineeData = JSON.stringify(value);
        if (this.nomineeDetails.valid) {
            this.nomineeData = value;
            this.proposal();
        }
    }

    subStatus(value: any, i, k, j) {
        if (value.checked) {
        } else {
            this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].existingSince = '';
        }

    }




    //Personal Details
    personalDetails(stepper: MatStepper, value) {
        this.personalData = value;
        sessionStorage.stepper1Details = '';
        sessionStorage.stepper1Details = JSON.stringify(value);
        if (this.personal.valid) {
            if (sessionStorage.proposerAge >= 18) {
                if (this.mobileNumber == '' || this.mobileNumber == 'true'){
                    stepper.next();
                }

            } else {
                this.toastr.error('Proposer age should be 18 or above');
            }
        }
    }

    religareQuestion(stepper: MatStepper) {
        this.questionEmpty = false;
        for (let i = 0; i < this.religareQuestionsList.length; i++) {
            if (this.religareQuestionsList[i].answer == '') {
                this.questionEmpty = false;
                break;
            } else {
                this.questionEmpty = true;
            }
        }
        if (this.questionEmpty ) {
            stepper.next();

        } else {
            this.toastr.error('Please fill the all Answers');

        }
    }

    PreviousInsure(value) {
        if (value.value == 'true') {
            this.personal.controls['previousinsurance'].setValue('');
            this.previousInsuranceStatus = true;
        } else {
            this.previousInsuranceStatus = false;
            this.personal.controls['previousinsurance'].setValue('No');
        }
    }

    PreviousInsuredDetail(value, i) {
        if (value.value == 'true') {
            this.insureArray['controls'].items['controls'][i]['controls'].previousinsurance.setValue('');
            this.previousInsuranceStatus1[i] = this.insureArray['controls'].items['controls'][i]['controls'].previousinsuranceChecked.value;
        } else {
            this.previousInsuranceStatus1[i] = this.insureArray['controls'].items['controls'][i]['controls'].previousinsuranceChecked.value;
            this.insureArray['controls'].items['controls'][i]['controls'].previousinsurance.setValue('No');
        }
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
        if (sessionStorage.stepper1Details != '' && sessionStorage.stepper1Details != undefined) {
            this.getStepper1 = JSON.parse(sessionStorage.stepper1Details);
            this.personal = this.fb.group({
                personalTitle: this.getStepper1.personalTitle,
                personalFirstname: this.getStepper1.personalFirstname,
                personalLastname: this.getStepper1.personalLastname,
                personalMidname: this.getStepper1.personalMidname,
                maritalStatus: this.getStepper1.maritalStatus,
                occupation: this.getStepper1.occupation,
                nationality: this.getStepper1.nationality,
                personalDob: this.getStepper1.personalDob,
                personalrelationship: this.getStepper1.personalrelationship,
                sameAsProposer: this.getStepper1.sameAsProposer,
                personalGender: this.getStepper1.personalGender,
                personalPan: this.getStepper1.personalPan,
                personalAddress: this.getStepper1.personalAddress,
                personalAddress2: this.getStepper1.personalAddress2,
                personalAddress3: this.getStepper1.personalAddress3,
                personalPincode: this.getStepper1.personalPincode,
                personalCity: this.getStepper1.personalCity,
                personalState: this.getStepper1.personalState,
                personalCountry: this.getStepper1.personalCountry,
                personalCityIdP: this.getStepper1.personalCityIdP,
                personalStateIdP: this.getStepper1.personalStateIdP,
                personalCountryIdP: this.getStepper1.personalCountryIdP,
                personalDistrict: this.getStepper1.personalDistrict,
                personalEmail: this.getStepper1.personalEmail,
                personalMobile: this.getStepper1.personalMobile,
                personalOfficePhone: this.getStepper1.personalOfficePhone,
                personalAltnumber: this.getStepper1.personalAltnumber,
                rolecd: this.getStepper1.rolecd,
                relationshipcd: this.getStepper1.relationshipcd,
                sameas: this.getStepper1.sameas,
            });
            if (this.getStepper1.personalPincode != '') {
                this.commonPincode(this.getStepper1.personalPincode, 'proposalP');
                setTimeout(() =>{
                    if(this.getStepper1.sameas == true) {
                        this.inputReadonly = true;
                        this.commonPincode(this.getStepper1.personalPincode, 'proposalR');
                    } else if(this.getStepper1.sameas == false) {
                        this.commonPincode(this.getStepper1.residencePincode, 'proposalR');
                    }
                },2000);
            };

        }

        if (sessionStorage.stepper2Details != '' && sessionStorage.stepper2Details != undefined) {
            this.getStepper2 = JSON.parse(sessionStorage.stepper2Details);
            for (let i = 0; i < this.getStepper2.items.length; i++) {
                this.insureArray['controls'].items['controls'][i]['controls'].personalTitle.patchValue(this.getStepper2.items[i].personalTitle);
                this.insureArray['controls'].items['controls'][i]['controls'].personalFirstname.patchValue(this.getStepper2.items[i].personalFirstname);
                this.insureArray['controls'].items['controls'][i]['controls'].personalGender.patchValue(this.getStepper2.items[i].personalGender);
                this.insureArray['controls'].items['controls'][i]['controls'].personalAge.patchValue(this.getStepper2.items[i].personalAge);
                this.insureArray['controls'].items['controls'][i]['controls'].personalLastname.patchValue(this.getStepper2.items[i].personalLastname);
                this.insureArray['controls'].items['controls'][i]['controls'].personalDob.patchValue(this.getStepper2.items[i].personalDob);
                this.insureArray['controls'].items['controls'][i]['controls'].personalrelationship.patchValue(this.getStepper2.items[i].personalrelationship);
                this.insureArray['controls'].items['controls'][i]['controls'].occupation.patchValue(this.getStepper2.items[i].occupation);
                this.insureArray['controls'].items['controls'][i]['controls'].personalHeight.patchValue(this.getStepper2.items[i].personalHeight);
                this.insureArray['controls'].items['controls'][i]['controls'].personalWeight.patchValue(this.getStepper2.items[i].personalWeight);
                this.insureArray['controls'].items['controls'][i]['controls'].personalFax.patchValue(this.getStepper2.items[i].personalFax);
                this.insureArray['controls'].items['controls'][i]['controls'].maritalStatus.patchValue(this.getStepper2.items[i].maritalStatus);
                this.insureArray['controls'].items['controls'][i]['controls'].sameas.patchValue(this.getStepper2.items[i].sameas);
                this.insureArray['controls'].items['controls'][i]['controls'].sameAsProposer.patchValue(this.getStepper2.items[i].sameAsProposer);
                this.insureArray['controls'].items['controls'][i]['controls'].rolecd.patchValue(this.getStepper2.items[i].rolecd);
                this.insureArray['controls'].items['controls'][i]['controls'].IsExistingIllness.patchValue(this.getStepper2.items[i].IsExistingIllness);
                this.insureArray['controls'].items['controls'][i]['controls'].DiseaseID.patchValue(this.getStepper2.items[i].DiseaseID);
                this.insureArray['controls'].items['controls'][i]['controls'].IsInsuredConsumetobacco.patchValue(this.getStepper2.items[i].IsInsuredConsumetobacco);
                this.insureArray['controls'].items['controls'][i]['controls'].HasAnyPreClaimOnInsured.patchValue(this.getStepper2.items[i].HasAnyPreClaimOnInsured);
                this.insureArray['controls'].items['controls'][i]['controls'].HasAnyPreHealthInsuranceCancelled.patchValue(this.getStepper2.items[i].HasAnyPreHealthInsuranceCancelled);
                this.insureArray['controls'].items['controls'][i]['controls'].DetailsOfPreClaimOnInsured.patchValue(this.getStepper2.items[i].DetailsOfPreClaimOnInsured);
                this.insureArray['controls'].items['controls'][i]['controls'].DetailsOfPrevInsuranceCancelled.patchValue(this.getStepper2.items[i].DetailsOfPrevInsuranceCancelled);
                this.insureArray['controls'].items['controls'][i]['controls'].OtherDisease.patchValue(this.getStepper2.items[i].OtherDisease);
                this.insureArray['controls'].items['controls'][i]['controls'].InsuranceCompName.patchValue(this.getStepper2.items[i].InsuranceCompName);
                this.insureArray['controls'].items['controls'][i]['controls'].PreviousPolNo.patchValue(this.getStepper2.items[i].PreviousPolNo);
                this.insureArray['controls'].items['controls'][i]['controls'].PolicyStartDate.patchValue(this.getStepper2.items[i].PolicyStartDate);
                this.insureArray['controls'].items['controls'][i]['controls'].PolicyEndDate.patchValue(this.getStepper2.items[i].PolicyEndDate);
                this.insureArray['controls'].items['controls'][i]['controls'].CoverTypeID.patchValue(this.getStepper2.items[i].CoverTypeID);
                this.insureArray['controls'].items['controls'][i]['controls'].SumInsured.patchValue(this.getStepper2.items[i].SumInsured);
                this.insureArray['controls'].items['controls'][i]['controls'].AccumulatedCumulativeBonus.patchValue(this.getStepper2.items[i].AccumulatedCumulativeBonus);
            }
        }
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
        }


        for (let i = 0; i < this.getStepper2.items.length; i++) {

            if (this.getStepper2.items[i].personalPincode != '') {
                this.insureArray['controls'].items['controls'][i]['controls'].pCityHide.patchValue(true);
                this.insureArray['controls'].items['controls'][i]['controls'].personalCity.patchValue(this.getStepper2.items[i].personalCity);
                this.insureArray['controls'].items['controls'][i]['controls'].personalPincode.patchValue(this.getStepper2.items[i].personalPincode);
                this.insureArray['controls'].items['controls'][i]['controls'].personalState.patchValue(this.getStepper2.items[i].personalState);

                if (this.getStepper2.items[0].sameAsProposer) {
                    this.insureArray['controls'].items['controls'][0]['controls'].pCityHide.patchValue(true);
                    this.insureArray['controls'].items['controls'][0]['controls'].cityHide.patchValue(true);
                }
                if (this.getStepper2.items[i].sameas) {
                    this.insureArray['controls'].items['controls'][i]['controls'].pCityHide.patchValue(this.getStepper2.items[i].sameas);
                    this.insureArray['controls'].items['controls'][i]['controls'].residencePincode.patchValue(this.getStepper2.items[i].personalPincode);
                    this.insureArray['controls'].items['controls'][i]['controls'].residenceState.patchValue(this.getStepper2.items[i].personalState);
                    this.insureArray['controls'].items['controls'][i]['controls'].residenceCity.patchValue(this.getStepper2.items[i].personalCity);
                }
                if (this.getStepper2.items[i].sameas == false && this.getStepper2.items[i].residencePincode != '') {
                    this.insureArray['controls'].items['controls'][i]['controls'].cityHide.patchValue(true);
                    this.insureArray['controls'].items['controls'][i]['controls'].residencePincode.patchValue(this.getStepper2.items[i].residencePincode);
                    this.insureArray['controls'].items['controls'][i]['controls'].residenceState.patchValue(this.getStepper2.items[i].residenceState);
                    this.insureArray['controls'].items['controls'][i]['controls'].residenceCity.patchValue(this.getStepper2.items[i].residenceCity);
                }
            }
        }
    }


    sameProposer(value: any) {
        if (value.checked) {
            this.insureArray['controls'].items['controls'][0]['controls'].cityHide.patchValue(true);
            this.insureArray['controls'].items['controls'][0]['controls'].pCityHide.patchValue(true);
            this.insureArray['controls'].items['controls'][0]['controls'].personalTitle.patchValue(this.personal.controls['personalTitle'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].personalFirstname.patchValue(this.personal.controls['personalFirstname'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].personalMidname.patchValue(this.personal.controls['personalMidname'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].personalLastname.patchValue(this.personal.controls['personalLastname'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].personalDob.patchValue(this.personal.controls['personalDob'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].maritalStatus.patchValue(this.personal.controls['maritalStatus'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].occupation.patchValue(this.personal.controls['occupation'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].personalGender.patchValue(this.personal.controls['personalGender'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].sameas.patchValue(this.personal.controls['sameas'].value);



        } else {
            this.insureArray['controls'].items['controls'][0]['controls'].cityHide.patchValue(false);
            this.insureArray['controls'].items['controls'][0]['controls'].pCityHide.patchValue(true);
            this.insureArray['controls'].items['controls'][0]['controls'].personalTitle.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].personalFirstname.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].personalMidname.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].personalLastname.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].personalDob.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].occupation.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].maritalStatus.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].personalGender.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].sameas.patchValue('');


        }

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
                this.personal['controls'].personalState.patchValue(this.setPincode.state_name);
                this.personal['controls'].personalDistrict.patchValue(this.setPincode.district_name);
                this.personal['controls'].personalCity.patchValue(this.setPincode.city_village_name);
                this.proposalPArea = this.setPincode.area_details;
                this.personal['controls'].personalDistrictIdP.patchValue(this.setPincode.district_id);
                this.personal['controls'].personalCityIdP.patchValue(this.setPincode.city_village_id);
                this.personal['controls'].personalStateIdP.patchValue(this.setPincode.state_id);
            } else {
                this.toastr.error('In valid Pincode');
                this.personal['controls'].personalState.patchValue('');
                this.personal['controls'].personalDistrict.patchValue('');
                this.personal['controls'].personalCity.patchValue('');
                this.proposalPArea = [];
                this.personal['controls'].personalDistrictIdP.patchValue('');
                this.personal['controls'].personalCityIdP.patchValue('');
                this.personal['controls'].personalStateIdP.patchValue('');
            }
        }
        if (this.title == 'proposalR') {
            if (successData.IsSuccess) {
                this.personal['controls'].residenceState.patchValue(this.setPincode.state_name);
                this.personal['controls'].residenceDistrict.patchValue(this.setPincode.district_name);
                this.personal['controls'].residenceCity.patchValue(this.setPincode.city_village_name);
                this.proposalRArea = this.setPincode.area_details;
                this.personal['controls'].residenceDistrictIdR.patchValue(this.setPincode.district_id);
                this.personal['controls'].personalCityIdR.patchValue(this.setPincode.city_village_id);
                this.personal['controls'].personalStateIdR.patchValue(this.setPincode.state_id);
            } else {
                this.toastr.error('In valid Pincode');
                this.personal['controls'].residenceState.patchValue('');
                this.personal['controls'].residenceDistrict.patchValue('');
                this.personal['controls'].residenceCity.patchValue('');
                this.proposalRArea = [];
                this.personal['controls'].residenceDistrictIdR.patchValue('');
                this.personal['controls'].personalCityIdR.patchValue('');
                this.personal['controls'].personalStateIdR.patchValue('');
            }
        }

        if (this.title == 'Nominee') {
            if (successData.IsSuccess) {
                this.nomineeDetails['controls'].nomineeState.patchValue(this.setPincode.state_name);
                this.nomineeDetails['controls'].nomineeDistrict.patchValue(this.setPincode.district_name);
                this.nomineeDetails['controls'].nomineeCity.patchValue(this.setPincode.city_village_name);
                this.nomineeAreaList = this.setPincode.area_details;
                this.nomineeDetails['controls'].nomineeDistrictId.patchValue(this.setPincode.district_id);
                this.nomineeDetails['controls'].nomineeCityId.patchValue(this.setPincode.city_village_id);
                this.nomineeDetails['controls'].nomineeStateId.patchValue(this.setPincode.state_id);
            } else {
                this.toastr.error('In valid Pincode');
                this.nomineeDetails['controls'].nomineeState.patchValue('');
                this.nomineeDetails['controls'].nomineeDistrict.patchValue('');
                this.nomineeDetails['controls'].nomineeCity.patchValue('');
                this.nomineeAreaList = [];
                this.nomineeDetails['controls'].nomineeDistrictId.patchValue('');
                this.nomineeDetails['controls'].nomineeCityId.patchValue('');
                this.nomineeDetails['controls'].nomineeStateId.patchValue('');
            }
        }
    }

    public commonPincodeFailure(error) {
    }

    //Create IffcoTokio proposal
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
            if(event.target.value == this.personal.get('personalMobile').value) {
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
