import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HealthService} from '../../shared/services/health.service';
import {DatePipe} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {AppSettings} from '../../app.settings';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDialog, MatStepper} from '@angular/material';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {AuthService} from '../../shared/services/auth.service';
import {HttpClient} from '@angular/common/http';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {Settings} from '../../app.settings.model';
import {PersonalAccidentService} from '../../shared/services/personal-accident.service';
 import {ValidationService} from '../../shared/services/validation.service';
 import {ActivatedRoute, Router} from '@angular/router';
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
  selector: 'app-personal-accident-religare-proposal',
  templateUrl: './personal-accident-religare-proposal.component.html',
  styleUrls: ['./personal-accident-religare-proposal.component.scss'],
    providers: [

        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
})

export class PersonalAccidentReligareProposalComponent implements OnInit {
    public personal: FormGroup;
    public summary: FormGroup;
    public insured: FormGroup;

    public nomineeDetails: FormGroup;
    public items: FormArray;
    public setDate: any;
    public selectDate: any;
    public stopNext: boolean;
    public buyPersonaldetails: any;
    public groupName: any;
    public getBuyDetails: any;
    public enquiryId: any;
    public personalData: any;
    public occupationList: any;
    public relationshipList: any;
    public today: any;
    public declaration: boolean;
    public summaryData: any;
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
    public residenceCitys: any;
    public cityTitle: any;
    public rAreaNames: any;
    public rAreaName: any;
    public rResponse: any;
    public rSummaryCity: any;
    public sumTitle: any;
    public sumPin: any;
    public code: any;
    public sumAreaName: any;
    public setDateAge: any;
    public personalAge: any;
    public occupationCode: any;
    public religareQuestionsList: any;
    public step: any;
    public questionEmpty: any;
    public proposerInsureData: any;
    public mobileNumber: any;
    public altmobileNumber: any;
    public insurerData: any;
    public totalReligareData: any;
    public getStepper1: any;
    public insurePersons: any;
    public getStepper2: any;
    public getpersonalNomineeData: any;
    public index: any;
    public previousinsurance: any;
    public previousInsuranceStatus: any;
    public getAllPremiumDetails: any;
    public hideQuestion: any;
    public partyQuestionDOList: any;
    public questions_list: any;
    public totalData: any;
    public sameField: any;
    public insureCity: any;
    public isDisable: any;
    public inputReadonly: any;
    public back: boolean;
    public relationshipcode: any;
    public medicalStatus: any;
    public arr: any;
    public insureRelationList: any;
    public sameRelationship: any;
    array: any;
    gender: any;
    sameFieldsInsure: any;
    sameinsure: any;
    proposal_Id: any;
    insurepersonalCitys: any;
    iresponse: any;
    insuredresidenceCitys: any;
    rinsuredResponse: any;
    insuremobileNumber: any;
    personalAccidentQuestionsList: any;
    occupationdescriptionList: any;
    occupationFirst: boolean;
    occupationSecond: boolean;
    occupationDescription: boolean;
    insureoccupationFirst: boolean;
    insureoccupationSecond: boolean;
    insureoccupationdescription: boolean;
    occupationClass: boolean;
    insureClassDescription: any;
    insureoccupationdescriptionList: any;
    personalClassDescription: any;
    insureoccupationDescription: boolean;
    insureoccupationClass: boolean;
    public religarePAProposal: any;
    proposerRequestAddressPerm: any;
    insuredAgePA: any;
    public readonlyproposer: boolean;
    proposerRequestAddress: any;
    proposerRequest: any;
    insurerdateError: any;
    nomineeDataForm: any;
    currentStep: any;
    RediretUrlLink: any;
    city: any;
    personalcity: any;
    proposerDataForm: any;
    personalDescriptionclassPA: boolean;
    Address2: boolean;
    personalAddress2: boolean;
    mobileno: boolean;
    gst: boolean;
    insuredDescriptionValidator: boolean;
    codeList: boolean;
    questionId : any;
    requestDetails : any;
    pos_status : any;
    createdDate : any;
    stepperindex : any;
    status : any;
    mailInfo : any;
    contactInfo : any;
    proposalNum : any;
    returnURL : any;
    action : any;
    public religarePATrue0: boolean;
    public religarePATrue1: boolean;
    public religarePATrue2: boolean;
    public religarePATrue3: boolean;
    public payLaterr: boolean;

    constructor(private fb: FormBuilder, public proposalservice: HealthService, public route: ActivatedRoute, public validation: ValidationService, public personalservice: PersonalAccidentService, public datepipe: DatePipe, private toastr: ToastrService, public appSettings: AppSettings, public dialog: MatDialog, public router: Router,
                public config: ConfigurationService, public auth: AuthService, public http: HttpClient, @Inject(LOCALE_ID) private locale: string) {
        this.stepperindex = 0;
        this.route.params.forEach((params) => {
            if(params.stepper == true || params.stepper == 'true') {
                this.stepperindex = 3;
                if (sessionStorage.summaryData != '' && sessionStorage.summaryData != undefined) {
                    this.summaryData = JSON.parse(sessionStorage.summaryData);
                    this.RediretUrlLink = this.summaryData.PaymentURL;
                    this.proposalId = this.summaryData.ProposalId;
                    this.nomineeDataForm = JSON.parse(sessionStorage.nomineeDataFormReligare);
                    this.proposerDataForm = JSON.parse(sessionStorage.proposerDataFormReligare);
                    sessionStorage.pa_religare_proposal_id = this.proposalId;
                }
            }
            this.status = params.stepper;
            this.proposal_Id = params.proposalId;
            if(this.proposal_Id != '' || this.proposal_Id != undefined ){
                this.payLaterr = true;
                this.getBackRequest();
            }
            if(this.proposal_Id == undefined || this.proposal_Id == '') {
                this.payLaterr = false;

            }
        });
        this.currentStep = this.stepperindex;
        console.log(this.currentStep,'this.currentStep');
        let today = new Date();
        this.today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        this.stopNext = false;
        this.back = false;
        this.hideQuestion = false;
        this.declaration = false;
        this.settings = this.appSettings.settings;
        this.settings.HomeSidenavUserBlock = false;
        this.settings.sidenavIsOpened = false;
        this.settings.sidenavIsPinned = false;
        this.webhost = this.config.getimgUrl();
        this.selectDate = '';
        this.religarePAProposal = 0;
        this.step = 0;
        this.mobileNumber = 'true';
        this.insuremobileNumber = 'true';
        this.inputReadonly = false;
        this.sameField = false;
        this.sameFieldsInsure = false;
        this.sameinsure = false;
        this.isDisable = false;
        this.insureCity = false;
        this.proposerInsureData = [];
        this.questions_list = [];
        this.arr = [];
        this.questionId = [];
        this.personalAccidentQuestionsList = [];
        this.occupationFirst = true;
        this.occupationSecond = false;
        this.insureoccupationFirst = true;
        this.insureoccupationSecond = false;
        this.occupationDescription = false;
        this.insureoccupationDescription = false;
        this.personalDescriptionclassPA = false;
        this.occupationClass = false;
        this.insureoccupationClass = false;
        this.readonlyproposer = false;
        this.insuredDescriptionValidator = false;
        this.codeList = false;

        this.religarePATrue0 = false;
        this.religarePATrue1 = true;
        this.religarePATrue2 = true;
        this.religarePATrue3 = true;

        this.personal = this.fb.group({
            personalTitle: ['', Validators.required],
            personalFirstname: new FormControl(''),
            personalLastname: ['', Validators.required],
            personalGender: ['', Validators.compose([Validators.required])],
            personalDob: ['', Validators.compose([Validators.required])],
            personalrelationship: 'SELF',
            personalAnualIncome: ['', Validators.required],
            personalOccupationCode: '',
            personalDescription: '',
            personalDescriptionCode: '',
            personalClassDescriptionCode: '',
            personalPan: '',
            personalPassPort: '',
            personalAddress: ['', Validators.required],
            personalAddress2: '',
            personalPincode: ['', Validators.required],
            personalCity: ['', Validators.required],
            personalState: ['', Validators.required],
            personalEmail: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
            personalEmail2: ['', Validators.compose([Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
            personalMobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
            personalAltnumber: '',
            residenceAddress: ['', Validators.required],
            residenceAddress2: '',
            residencePincode: ['', Validators.required],
            residenceCity: ['', Validators.required],
            residenceState: ['', Validators.required],
            sameAsProposer: false,
            type: '',
            medical_status: 'No'

        });
        //
        this.insured = this.fb.group({
            insuredTitle: ['', Validators.required],
            insuredFirstname: new FormControl(''),
            insuredLastname: ['', Validators.required],
            insuredGender: ['', Validators.compose([Validators.required])],
            insuredDob: ['', Validators.compose([Validators.required])],
            insuredrelationship: '',
            insuredAnnualIncome: '',
            insuredOccupationCode: '',
            insuredOccupationCodeName: '',
            insuredDescription: '',
            insuredDescriptionCode: '',
            insuredDescriptionCodeName: '',
            insuredClassDescriptionCode: '',
            insuredClassDescriptionCodeName: '',
            insuredPan: '',
            insuredPassPort: '',
            insuredAddress: ['', Validators.required],
            insuredAddress2: '',
            insuredPincode: ['', Validators.required],
            insuredCity: ['', Validators.required],
            insuredState: ['', Validators.required],
            insuredEmail: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
            insuredEmail2: ['', Validators.compose([Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
            insuredMobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
            insuredAltnumber: '',
            insuredrAddress: ['', Validators.required],
            insuredrAddress2: '',
            insuredrPincode: ['', Validators.required],
            insuredrCity: ['', Validators.required],
            insuredrState: ['', Validators.required],
            sameAsinsureProposer: false,
            sameasInsuredAddress: false,
            insuredHeight: ['', Validators.required],
            insuredWeight: ['', Validators.required],
            insuredrolecd: 'PRIMARY',
            type: '',
            insuredrCityName: '',
            insuredCityName: '',
            medical_status: 'No'

        });
        this.nomineeDetails = this.fb.group({
            'religareNomineeName': ['', Validators.required],
            'religareRelationship': ['', Validators.required],
            'religareRelationshipName': ''
        });


    }

    changeGender() {
        if (this.personal.controls['personalTitle'].value == 'MR') {
            this.personal.controls['personalGender'].patchValue('MALE');
        } else {
            this.personal.controls['personalGender'].patchValue('FEMALE');
        }
    }

    insurechangeGender() {
        if (this.insured.controls['insuredTitle'].value == 'MR') {
            this.insured.controls['insuredGender'].patchValue('MALE');
        } else {
            this.insured.controls['insuredGender'].patchValue('FEMALE');
        }
    }

    nameValidate(event: any) {
        this.validation.nameValidate(event);
    }

    // Dob validation
    dobValidate(event: any) {
        this.validation.dobValidate(event);
    }

    // Number validation
    numberValidate(event: any) {
        this.validation.numberValidate(event);
    }

    idValidate(event: any) {
        this.validation.idValidate(event);
    }
    spac(event: any){
        this.validation.spac(event);

    }
    ngOnInit() {
        if (this.payLaterr == true) {
            this.stepperindex = 3;
            console.log(this.payLaterr, 'this.payLaterrolll');
        } else {
            this.setRelationship();
            this.setOccupationListCode();
            this.setpersonalOccupationListCode();
            this.setinsureOccupationListCode();
            this.religareQuestions();

            this.getBuyDetails = JSON.parse(sessionStorage.buyProductsPa);
            this.getAllPremiumDetails = JSON.parse(sessionStorage.enquiryDetailsPa);
            if (this.getBuyDetails.product_id == 1) {
                this.nomineeDetails.get('religareNomineeName').setValidators([Validators.required]);
                this.nomineeDetails.get('religareRelationship').setValidators([Validators.required]);
            }
            if (this.getBuyDetails.product_id != 1) {
                this.nomineeDetails.get('religareNomineeName').setValidators(null);
                this.nomineeDetails.get('religareRelationship').setValidators(null);
            }
            this.nomineeDetails.get('religareNomineeName').updateValueAndValidity();
            this.nomineeDetails.get('religareRelationship').updateValueAndValidity();
            this.sessionData();
            this.sameRelationship = 'SELF';
            // if(this.insured.controls['insuredAnnualIncome'].value == ''){
            //     this.insured.controls['insuredAnnualIncome'].patchValue(this.getAllPremiumDetails.annual_salary);
            // }
            // this.insured.controls['insuredAnnualIncome'].patchValue(this.getAllPremiumDetails.annual_salary);
        }
    }

    setStep(index: number) {
        this.step = index;
    }

    canDeactivate() {
        return this.religarePAProposal;
    }

    nextStep() {
        this.step++;
    }


    prevStep() {
        this.step--;
    }

// session
    sessionData() {

        if (sessionStorage.personalCitys != '' && sessionStorage.personalCitys != undefined) {
            this.personalCitys = JSON.parse(sessionStorage.personalCitys);
        }
        if (sessionStorage.residenceCitys != '' && sessionStorage.residenceCitys != undefined) {
            this.residenceCitys = JSON.parse(sessionStorage.residenceCitys);
        }
        if (sessionStorage.proposal2Detail != '' && sessionStorage.proposal2Detail != undefined) {
            this.getStepper2 = JSON.parse(sessionStorage.proposal2Detail);


            this.insured = this.fb.group({
                insuredTitle: this.getStepper2.insuredTitle,
                insuredFirstname: this.getStepper2.insuredFirstname,
                insuredLastname: this.getStepper2.insuredLastname,
                insuredDob: new FormControl(new Date(this.getStepper2.insuredDob)),
                insuredArea: this.getStepper2.insuredArea,
                insuredAnnualIncome: this.getStepper2.insuredAnnualIncome,
                insuredrelationship: this.getStepper2.insuredrelationship,
                sameAsinsureProposer: this.getStepper2.sameAsinsureProposer,
                sameasInsuredAddress: this.getStepper2.sameasInsuredAddress,
                insuredOccupationCode: this.getStepper2.insuredOccupationCode,
                insuredOccupationCodeName: this.getStepper2.insuredOccupationCodeName,
                insuredDescriptionCode: this.getStepper2.insuredDescriptionCode,
                insuredDescriptionCodeName: this.getStepper2.insuredDescriptionCodeName,
                insuredClassDescriptionCode: this.getStepper2.insuredClassDescriptionCode,
                insuredClassDescriptionCodeName: this.getStepper2.insuredClassDescriptionCodeName,
                insuredDescription: this.getStepper2.insuredDescription,
                insuredGender: this.getStepper2.insuredGender,
                insuredPan: this.getStepper2.insuredPan.toUpperCase(),
                insuredPassPort: this.getStepper2.insuredPassPort,
                insuredAddress: this.getStepper2.insuredAddress,
                insuredAddress2: this.getStepper2.insuredAddress2,
                insuredPincode: this.getStepper2.insuredPincode,
                insuredCity: this.getStepper2.insuredCity,
                insuredCityName: this.getStepper2.insuredCityName,
                insuredState: this.getStepper2.insuredState,
                insuredEmail: this.getStepper2.insuredEmail,
                insuredEmail2: this.getStepper2.insuredEmail2,
                insuredHeight: this.getStepper2.insuredHeight,
                insuredWeight: this.getStepper2.insuredWeight,
                insuredMobile: this.getStepper2.insuredMobile,
                insuredAltnumber: this.getStepper2.insuredAltnumber,
                insuredrAddress: this.getStepper2.insuredrAddress,
                insuredrAddress2: this.getStepper2.insuredrAddress2,
                insuredrPincode: this.getStepper2.insuredrPincode,
                insuredrCity: this.getStepper2.insuredrCity,
                insuredrCityName: this.getStepper2.insuredrCityName,
                insuredrState: this.getStepper2.insuredrState,
                relationshipcd: this.getStepper2.relationshipcd
            });

            if (sessionStorage.mobileNumber != '' && sessionStorage.mobileNumber != undefined) {
                this.mobileNumber = sessionStorage.mobileNumber;
            } else {
                this.mobileNumber = 'true';
            }
            if (sessionStorage.insuremobileNumber != '') {
                this.insuremobileNumber = sessionStorage.insuremobileNumber;
            } else {
                this.insuremobileNumber = 'true';
            }

            if (this.getStepper2.insuredDescriptionCode == 'C5') {
                if (sessionStorage.insureoccupationDescription != '' && sessionStorage.insureoccupationDescription != undefined) {
                    this.insureoccupationDescription = sessionStorage.insureoccupationDescription;
                }
            } else {
                if (sessionStorage.insureoccupationClass != '' && sessionStorage.insureoccupationClass != undefined) {
                    this.insureoccupationClass = sessionStorage.insureoccupationClass;
                }
            }



            // nominee
            if (sessionStorage.personalnomineeData != '' && sessionStorage.personalnomineeData != undefined) {
                this.getpersonalNomineeData = JSON.parse(sessionStorage.personalnomineeData);
                this.nomineeDetails = this.fb.group({
                    religareNomineeName: this.getpersonalNomineeData.religareNomineeName,
                    religareRelationship: this.getpersonalNomineeData.religareRelationship,
                    religareRelationshipName: this.getpersonalNomineeData.religareRelationshipName
                });
            }
            if (sessionStorage.pa_religare_proposal_id != '' && sessionStorage.pa_religare_proposal_id != undefined) {
                this.religarePAProposal = sessionStorage.pa_religare_proposal_id;
            }
            if (sessionStorage.proposal3Detail != '' && sessionStorage.proposal3Detail != undefined) {
                this.personalAccidentQuestionsList = JSON.parse(sessionStorage.proposal3Detail);
            }

        }
    }


    //Personal Details
    personalDetails(stepper: MatStepper, value) {
        this.personalData = value;
        this.personalData.rolecd = 'PROPOSER';
        this.personalData.type = 'SELF';
        sessionStorage.proposal1Detail = '';
        sessionStorage.proposal1Detail = JSON.stringify(value);
        if (this.personal.valid) {
            this.proposerInsureData = [];
            if (sessionStorage.proposerAgePA >= 18) {
                this.proposerInsureData.push(this.personalData);
                if (this.mobileNumber == '' || this.mobileNumber == 'true') {
                    if (this.personal.controls['personalAnualIncome'].value != 0) {
                        stepper.next();
                        this.topScroll();
                        this.nextStep();
                    } else {
                        this.toastr.error('Invalid Annual Income');

                    }
                }

            } else {
                this.toastr.error('Proposer age should be 18 or above');
            }
        }
    }

// insured details
    InsureDetails(stepper: MatStepper, value) {
        sessionStorage.proposal2Detail = '';
        sessionStorage.proposal2Detail = JSON.stringify(value);
        this.insurerData = value;
        console.log(this.insurerData,'this.insurerData');
        if (this.insured.valid) {
            if (sessionStorage.insuredAgePA >= 18 && sessionStorage.insuredAgePA <= 70) {
                if (this.insured.controls['insuredAnnualIncome'].value != 0) {
                    stepper.next();
                    this.topScroll();
                    this.nextStep();
                    this.religarePATrue1 = false;
                } else {
                    this.toastr.error('Invalid Annual Income');

                }
            } else {
                // this.toastr.error('Proposer / Insurer age should be 18 or above');
                this.toastr.error('Proposer or Insurer age should be greater than 18 and till 70yrs');

            }
            // if (this.insuremobileNumber == '' || this.insuremobileNumber == 'true') {
            //     stepper.next();
            // }

        }
    }

    backAll(){
        this.topScroll();
        this.prevStep();
    }

    topScroll() {
        document.getElementById('main-content').scrollTop = 0;
    }

    typeAddressDeatils() {
        if (this.insured.controls['sameasInsuredAddress'].value) {
            this.residenceCitys = JSON.parse(sessionStorage.personalCitys);
            this.insured.controls['insuredrAddress'].patchValue(this.insured.controls['insuredAddress'].value);
            this.insured.controls['insuredrAddress2'].patchValue(this.insured.controls['insuredAddress2'].value);
            this.insured.controls['insuredrCity'].patchValue(this.insured.controls['insuredCity'].value);
            this.insured.controls['insuredrCityName'].patchValue(this.insured.controls['insuredCityName'].value);
            this.insured.controls['insuredrPincode'].patchValue(this.insured.controls['insuredPincode'].value);
            this.insured.controls['insuredrState'].patchValue(this.insured.controls['insuredState'].value);
        }
    }
    // insured
    insuredsameAddress(values: any) {
        this.sameinsure = values.checked;
        if (values.checked) {
            this.residenceCitys = this.personalCitys;
            sessionStorage.residenceCitys = JSON.stringify(this.residenceCitys);
            this.inputReadonly = true;
            this.insured.controls['insuredrAddress'].patchValue(this.insured.controls['insuredAddress'].value);
            this.insured.controls['insuredrAddress2'].patchValue(this.insured.controls['insuredAddress2'].value);
            this.insured.controls['insuredrCity'].patchValue(this.insured.controls['insuredCity'].value);
            this.insured.controls['insuredrCityName'].patchValue(this.insured.controls['insuredCityName'].value);
            this.insured.controls['insuredrPincode'].patchValue(this.insured.controls['insuredPincode'].value);
            this.insured.controls['insuredrState'].patchValue(this.insured.controls['insuredState'].value);

        } else {
            this.residenceCitys= {};
            sessionStorage.residenceCitys = '';
            this.inputReadonly = false;
            this.insured.controls['insuredrAddress'].patchValue('');
            this.insured.controls['insuredrAddress2'].patchValue('');
            this.insured.controls['insuredrCity'].patchValue('');
            this.insured.controls['insuredrCityName'].patchValue('');
            this.insured.controls['insuredrPincode'].patchValue('');
            this.insured.controls['insuredrState'].patchValue('');

        }
    }


    removeSpaces(string) {
        return string.split(' ').join('');
        // if (event.charCode !== 0) {
        //     const pattern = /[a-zA-Z ]/;
        //     const inputChar = String.fromCharCode(event.charCode);
        //     if (!pattern.test(inputChar)) {
        //         event.preventDefault();
        //     }
        // }
    }


    addEvent(event, type) {
        if (event.value != null) {
            let selectedDate = '';
            this.insuredAgePA = '';
            let dob = '';
            if (typeof event.value._i == 'string') {
                const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
                if (pattern.test(event.value._i) && event.value._i.length == 10) {
                    this.insurerdateError = '';
                } else {
                    this.insurerdateError = 'Enter Valid Date';
                }
                selectedDate = event.value._i;
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                if (selectedDate.length == 10) {
                    this.insuredAgePA = this.ageCalculate(dob);
                    sessionStorage.proposerAge = this.insuredAgePA;

                }

            } else if (typeof event.value._i == 'object') {
                // dob = this.datepipe.transform(event.value, 'MMM d, y');
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                if (dob.length == 10) {
                    this.insuredAgePA = this.ageCalculate(dob);
                    sessionStorage.insuredAgePA = this.insuredAgePA;

                }
                this.insurerdateError = '';
            }
            sessionStorage.insuredAgePA = this.insuredAgePA;

        }
    }
    ageCalculate(dob) {
        let today = new Date();
        let birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        let dd = today.getDate()- birthDate.getDate();
        if( m < 0 || m == 0 && today.getDate() < birthDate.getDate()){
            age = age-1;
        }
        return age;
    }

    stepback() {
        this.back = true;
    }

    quesback() {
        this.back = false;
    }

    //Summary residence detail

    getCityIdF2(title, cid, pincode) {
        const data = {
            'platform': 'web',
            'pincode': pincode,
            'city_id': cid
        }
        this.personalservice.getArea(data).subscribe(
            (successData) => {
                this.getCityResistSuccess(successData);
            },
            (error) => {
                this.getCityResistFailure(error);
            }
        );
    }

    public getCityResistSuccess(successData) {
        if (successData.IsSuccess == true) {
            this.rAreaNames = successData.ResponseObject;
            this.rAreaName = this.rAreaNames.area;
            if (this.sumTitle == 'residence') {
                for (let i = 0; i < this.rAreaName.length; i++) {
                    if (this.rAreaName[i].areaID == this.summaryData.prop_res_area) {
                        this.sumAreaName = this.rAreaName[i].areaName;
                    }

                }
            }
        }
    }

    public getCityResistFailure(error) {
    }


    // insured postal details
    getInsurePostal(pin, title) {
        const data = {
            'platform': 'web',
            'user_id': '0',
            'role_id': '4',
            'pincode': pin
        }
        if (pin.length == 6) {
            this.personalservice.getPostalReligare(data).subscribe(
                (successData) => {
                    this.getinsurepostalSuccess(successData, title);
                },
                (error) => {
                    this.getinsurepostalFailure(error);
                }
            );
        }
    }

    public getinsurepostalSuccess(successData, title) {

        if (successData.IsSuccess == true) {
            this.response = successData.ResponseObject;
            if (title == 'personal') {
                if (Object.keys(this.response).length === 0) {
                    this.insured.controls['insuredState'].patchValue('');
                    this.personalCitys = {};
                } else {
                    this.insured.controls['insuredState'].patchValue(this.response.state);
                    this.personalCitys = this.response.city;
                }
                sessionStorage.personalCitys = JSON.stringify(this.personalCitys);
            } else if (title == 'residence') {
                if (Object.keys(this.response).length === 0) {
                    this.insured.controls['insuredrState'].patchValue('');
                    this.residenceCitys = {};
                } else {
                    this.insured.controls['insuredrState'].patchValue(this.response.state);
                    this.residenceCitys = this.response.city;
                }
                sessionStorage.residenceCitys = JSON.stringify(this.residenceCitys);
            }
        } else {
            this.toastr.error('In valid Pincode');
            if (title == 'personal') {
                sessionStorage.personalCitys = '';
                this.personalCitys = {};
                this.insured.controls['insuredState'].patchValue('');
            } else if (title == 'residence') {
                sessionStorage.residenceCitys = '';
                this.residenceCitys = {};
                this.insured.controls['insuredrState'].patchValue('');
            }

        }
    }



    public getinsurepostalFailure(error) {
    }

    setOccupationList() {
        const data = {
            'platform': 'web',
            'product_id': '1',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.personalservice.getOccupationList(data).subscribe(
            (successData) => {
                this.occupationListSuccess(successData);
            },
            (error) => {
                this.occupationListFailure(error);
            }
        );

    }

    public occupationListSuccess(successData) {
        if (successData.IsSuccess) {
            this.occupationList = successData.ResponseObject;
        }
    }

    public occupationListFailure(error) {
    }

    setOccupationListCode() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.personalservice.getOccupationCode(data).subscribe(
            (successData) => {
                this.occupationCodeSuccess(successData);
            },
            (error) => {
                this.occupationCodeFailure(error);
            }
        );

    }

    public occupationCodeSuccess(successData) {
        if (successData.IsSuccess) {
            this.occupationCode = successData.ResponseObject;
        }
    }

    public occupationCodeFailure(error) {
    }
    setpersonalOccupationListCode() {
        const data = {
            'platform': 'web',
            'occupationCode': this.personal.controls['personalOccupationCode'].value,
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.personalservice.getPersonalOccupationCode(data).subscribe(
            (successData) => {
                this.occupationdescriptionSuccess(successData);
            },
            (error) => {
                this.occupationdescriptionFailure(error);
            }
        );

    }

    public occupationdescriptionSuccess(successData) {
        if (successData.IsSuccess) {
            // this.occupationFirst = true;
            // this.occupationSecond = true;
            this.occupationdescriptionList = successData.ResponseObject;
           // this.personal.get('personalDescriptionCode').setValidators([Validators.required]);

        } else {
            // this.occupationFirst = true;
            // this.occupationSecond = false;
          //  this.personal.get('personalDescriptionCode').setValidators(null);
            // this.toastr.error(successData.ErrorObject);
        }

    }

    public occupationdescriptionFailure(error) {
    }
    // setpersonalDescriptionListCode(type) {
    //     if (this.personal.controls['personalDescriptionCode'].value == 'C5') {
    //         this.occupationDescription = true;
    //         if(this.occupationDescription = true) {
    //             this.personalDescriptionclassPA = true;
    //             this.personal.controls['personalDescription'].setValidators([Validators.required]);
    //         } else{
    //             this.personalDescriptionclassPA = false;
    //             this.personal.controls['personalDescription'].setValidators(null);
    //         }
    //         this.occupationClass = false;
    //     } else {
    //         this.occupationDescription = false;
    //         this.occupationClass = true;
    //     }
    //     const data = {
    //         'platform': 'web',
    //         'occupationId':this.personal.controls['personalDescriptionCode'].value,
    //         'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
    //         'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
    //     }
    //     this.personalservice.classOccupationCode(data).subscribe(
    //         (successData) => {
    //             this.classSuccess(successData, type);
    //         },
    //         (error) => {
    //             this.classFailure(error);
    //         }
    //     );
    //
    // }
    // public classSuccess(successData, type) {
    //     if (type != 'session' ) {
    //         this.personal.controls['personalClassDescriptionCode'].patchValue('');
    //     }
    //     this.personalClassDescription = successData.ResponseObject;
    //
    //
    // }
    //
    // public classFailure(error) {
    // }


    // insured occupation list
    setinsureOccupationListCode() {
        const data = {
            'platform': 'web',
            'occupationCode':this.insured.controls['insuredOccupationCode'].value,
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.personalservice.getPersonalOccupationCode(data).subscribe(
            (successData) => {
                this.insureoccupationdescriptionSuccess(successData);
            },
            (error) => {
                this.insureoccupationdescriptionFailure(error);
            }
        );

    }

    public insureoccupationdescriptionSuccess(successData) {
        if (successData.IsSuccess) {
            this.insureoccupationFirst = true;
            this.insureoccupationSecond = true;
            this.insureoccupationdescriptionList = successData.ResponseObject;
        } else {
            this.insureoccupationFirst = true;
            this.insureoccupationSecond = false;

            // this.toastr.error(successData.ErrorObject);
        }

    }

    public insureoccupationdescriptionFailure(error) {
    }
    setinsureDescriptionListCode() {
        if (this.insured.controls['insuredDescriptionCode'].value == 'C5') {
            this.insureoccupationDescription = true;
            this.insureoccupationClass = false;
            if(this.insureoccupationDescription){
                this.insuredDescriptionValidator = true;
            } else {
                this.insuredDescriptionValidator = false;
            }
        } else {
            this.insureoccupationDescription = false;
            this.insureoccupationClass = true;
        }
        sessionStorage.insureoccupationDescription = this.insureoccupationDescription;
        sessionStorage.insureoccupationClass = this.insureoccupationClass;
        const data = {
            'platform': 'web',
            'occupationId':this.insured.controls['insuredDescriptionCode'].value,
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.personalservice.classOccupationCode(data).subscribe(
            (successData) => {
                this.classoccupationSuccess(successData);
            },
            (error) => {
                this.classoccupationFailure(error);
            }
        );

    }
    public classoccupationSuccess(successData) {
        if (successData.IsSuccess) {
            this.insureClassDescription = successData.ResponseObject;
        }
    }
    public classoccupationFailure(error) {
    }

    setRelationship() {
        const data = {
            'platform': 'web',
            'product_id': '1',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.personalservice.getRelationshipListreligare(data).subscribe(
            (successData) => {
                this.setRelationshipSuccess(successData);
            },
            (error) => {
                this.setRelationshipFailure(error);
            }
        );
    }

    public setRelationshipSuccess(successData) {
        this.relationshipList = successData.ResponseObject;

    }

    public setRelationshipFailure(error) {
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

    public typeValidate(event: any) {
        if (event.charCode !== 0) {
            const pattern = /[a-zA-Z ]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }

    alternateChange(event, type) {
        if (type == 'personal') {
                if (event.target.value == this.personal.get('personalMobile').value) {
                    this.mobileNumber = 'Alternate number should be different from mobile number';
                } else {
                    this.mobileNumber = '';
                }
                sessionStorage.mobileNumber = this.mobileNumber;


        } else if (type == 'insurer') {
                if (event.target.value == this.insured.get('insuredMobile').value) {
                    this.insuremobileNumber = 'Alternate number should be different from mobile number';
                } else {
                    this.insuremobileNumber = '';
                }
                sessionStorage.insuremobileNumber = this.insuremobileNumber;

        }

    }


// medical details
    religareQuestions() {
        const data = {
            'platform': 'web',
            'product_id': '1',
            'family_group': this.insurePersons,
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.personalservice.persosnalAccidentReligareQuestions(data).subscribe(
            (successData) => {
                this.religareQuestionsSuccess(successData);
            },
            (error) => {
                this.religareQuestionsFailure(error);
            }
        );

    }

    public religareQuestionsSuccess(successData) {
       // if (sessionStorage.proposal3Detail == '' && sessionStorage.proposal3Detail == undefined) {
            this.personalAccidentQuestionsList = successData.ResponseObject;
            console.log(this.personalAccidentQuestionsList,'this.personalAccidentQuestionsList');
            for (let i = 0; i < this.personalAccidentQuestionsList.length; i++) {
            // this.religareTravelQuestionsList[i].main_qustion = '0';
            this.personalAccidentQuestionsList[i].checked = false;
            this.personalAccidentQuestionsList[i].status = 'No';
            this.personalAccidentQuestionsList[i].fieldValue = '';
        }
        for (let i = 0; i < this.personalAccidentQuestionsList[1].sub_questions_list.length; i++) {
            this.personalAccidentQuestionsList[1].sub_questions_list[i].fieldValue = '';
            this.personalAccidentQuestionsList[1].sub_questions_list[i].checked = false;
            this.personalAccidentQuestionsList[1].sub_questions_list[i].status = 'No';
        }


    }
    public religareQuestionsFailure(error) {
    }
    questionYes(id, value: any) {
        if (value.checked) {
            this.personalAccidentQuestionsList[id].checked = true;
            for (let i = 0; i < this.personalAccidentQuestionsList.length; i++) {
                // if(this.personalAccidentQuestionsList[i].question_code == 'P003') {
                // } else {
                // }
            }
        } else {
            this.personalAccidentQuestionsList[id].checked = false;

        }
    }
// Medical
    medicalHistoryDetails(stepper: MatStepper) {
        sessionStorage.proposal3Detail = '';
        this.partyQuestionDOList = [];
        let valid = true;
        if(this.personalAccidentQuestionsList[1].checked) {
            valid = false;
            let findFieldValue = this.personalAccidentQuestionsList[1].sub_questions_list.filter(values => values.fieldValue == '' );
            console.log(findFieldValue, 'findFieldValuefindFieldValue');
            if(findFieldValue.length == 0) {
                valid = true;
            }
        }
        console.log(this.personalAccidentQuestionsList, 'kllkllk');
        console.log(valid, 'validvalid');

        if(valid) {
            stepper.next();
            this.topScroll();
            this.nextStep();
            this.religarePATrue2 = false;

            let setMainRes = '';
            let setSubRes = '';

            for (let i = 0; i < this.personalAccidentQuestionsList.length; i++) {
                if(this.personalAccidentQuestionsList[i].field_type == 'textbox') {
                    setMainRes =  this.personalAccidentQuestionsList[i].fieldValue;
                } else if(this.personalAccidentQuestionsList[i].field_type == 'checkbox') {
                    setMainRes =  this.personalAccidentQuestionsList[i].checked ? 'YES' : 'NO';
                }
                this.partyQuestionDOList.push({
                    'questionCd': this.personalAccidentQuestionsList[i].question_code,
                    'questionSetCd': this.personalAccidentQuestionsList[i].question_set_code,
                    'response': setMainRes

                });
            }

            for (let i = 0; i < this.personalAccidentQuestionsList[1].sub_questions_list.length; i++) {
                if(this.personalAccidentQuestionsList[1].sub_questions_list[i].field_type == 'textbox') {
                    setSubRes =  this.personalAccidentQuestionsList[1].sub_questions_list[i].fieldValue;
                } else if(this.personalAccidentQuestionsList[1].sub_questions_list[i].field_type == 'checkbox') {
                    setSubRes =  this.personalAccidentQuestionsList[1].sub_questions_list[i].checked ? 'YES' : 'NO';
                }
                this.partyQuestionDOList.push({
                    'questionCd': this.personalAccidentQuestionsList[1].sub_questions_list[i].question_code,
                    'questionSetCd': this.personalAccidentQuestionsList[1].sub_questions_list[i].question_set_code,
                    'response': setSubRes

                });
            }

        } else {
            this.toastr.error('Please fill the required fields');
        }

        sessionStorage.proposal3Detail = JSON.stringify(this.personalAccidentQuestionsList);

    }

    // nominee details
    religareNomineeDetails(stepper: MatStepper, value) {
        if (this.nomineeDetails.valid) {
                sessionStorage.personalnomineeData = '';
                sessionStorage.personalnomineeData = JSON.stringify(value);
                this.proposal();
            }
        this.lastStepper = stepper;

    }

    // Create Proposal
    proposal() {
        let pan = this.personal.controls['personalPan'].value;
      let pan1 = this.insured.controls['insuredPan'].value;
     const data= {
            'product_id': this.getBuyDetails.product_id,
            'policy_term': '1',
            'scheme_id': this.getBuyDetails.scheme,
            'terms_condition': '1',
             'user_id' : this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
             'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
             'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
            'platform': 'web',
            'proposal_id': sessionStorage.pa_religare_proposal_id == '' || sessionStorage.pa_religare_proposal_id == undefined ? '' : sessionStorage.pa_religare_proposal_id,
            'enquiry_id': this.getAllPremiumDetails.enquiry_id,
            'group_name': 'Group A',
            'company_name': this.getBuyDetails.company_name,
            'plan_name': this.getBuyDetails.product_name,
            'suminsured_amount':this.getBuyDetails.suminsured_amount,

        "policy": {
            "partyDOList": [{
                'birthDt': this.datepipe.transform(this.insured.controls['insuredDob'].value, 'y-MM-dd'),
                'firstName': this.insured.controls['insuredFirstname'].value,
                'genderCd': this.insured.controls['insuredGender'].value,
                'relationCd':'SELF',
                'roleCd': "PROPOSER",
                'titleCd': this.insured.controls['insuredTitle'].value,
                'annualSalary': this.insured.controls['insuredAnnualIncome'].value != 0 ? this.insured.controls['insuredAnnualIncome'].value: '',
                'occupationCode':this.insured.controls['insuredOccupationCode'].value,
                'occupationClass': this.insured.controls['insuredDescriptionCode'].value,
                'occupationClassValue':this.insured.controls['insuredDescriptionCodeName'].value,
                'classDescription': this.insured.controls['insuredDescription'].value,
                'classDescriptionValue': this.insureoccupationDescription ? this.insured.controls['insuredClassDescriptionCodeName'].value : this.insured.controls['insuredClassDescriptionCodeName'].value,
                'lastName':  this.insured.controls['insuredLastname'].value,
                "partyAddressDOList": [{
                    'addressLine1Lang1':  this.insured.controls['insuredAddress'].value,
                    'addressLine2Lang1':  this.insured.controls['insuredAddress2'].value,
                    'addressTypeCd': "COMMUNICATION",
                    'areaCd':  this.insured.controls['insuredCity'].value,
                    'cityCd': this.insured.controls['insuredCity'].value,
                    'pinCode':  this.insured.controls['insuredPincode'].value,
                    'stateCd':  this.insured.controls['insuredState'].value,
                    'countryCd': 'IND'
                },
                    {
                        'addressLine1Lang1':  this.insured.controls['insuredrAddress'].value,
                        'addressLine2Lang1':  this.insured.controls['insuredrAddress2'].value,
                        'addressTypeCd': 'PERMANENT',
                        'areaCd':  this.insured.controls['insuredrCity'].value,
                        'cityCd':  this.insured.controls['insuredrCity'].value,
                        'pinCode':  this.insured.controls['insuredrPincode'].value,
                        'stateCd':  this.insured.controls['insuredrState'].value,
                        'countryCd': 'IND'
                    }
                ],
                "partyContactDOList": [{
                    'contactNum':  this.insured.controls['insuredMobile'].value,
                    'contactTypeCd': 'MOBILE',
                    'stdCode': "+91"
                },
                    {
                        'contactNum': this.insured.controls['insuredAltnumber'].value,
                        'contactTypeCd': 'RESIDENTIAL',
                        'stdCode': "+91"
                    }
                ],
                "partyEmailDOList": [{
                    'emailAddress':  this.insured.controls['insuredEmail'].value,
                    'emailTypeCd': "PERSONAL"
                },
                    {
                        'emailAddress':  this.insured.controls['insuredEmail2'].value,
                        'emailTypeCd': "OFFICIAL"
                    }
                ],
                "partyIdentityDOList": [{
                    'identityNum': pan1.toUpperCase(),
                    'identityTypeCd': "PAN"
                },
                    {
                        'identityNum':  this.insured.controls['insuredPassPort'].value,
                        'identityTypeCd': "PASSPORT"
                    }
                ]
            },
                {
                    'birthDt': this.datepipe.transform(this.insured.controls['insuredDob'].value, 'y-MM-dd'),
                    'firstName': this.insured.controls['insuredFirstname'].value,
                    'genderCd':  this.insured.controls['insuredGender'].value,
                    'annualSalary': this.insured.controls['insuredAnnualIncome'].value != 0 ? this.insured.controls['insuredAnnualIncome'].value: '',
                    'occupationCode':this.insured.controls['insuredOccupationCode'].value,
                    'occupationClass': this.insured.controls['insuredDescriptionCode'].value,
                    'occupationClassValue':this.insured.controls['insuredDescriptionCodeName'].value,

                    // 'classDescription': this.insureoccupationDescription ? this.insured.controls['insuredDescription'].value : this.insured.controls['insuredClassDescriptionCode'].value,
                    'classDescription': this.insured.controls['insuredDescription'].value,
                    'classDescriptionValue': this.insureoccupationDescription ? this.insured.controls['insuredClassDescriptionCodeName'].value : this.insured.controls['insuredClassDescriptionCodeName'].value,
                    'lastName':  this.insured.controls['insuredLastname'].value,
                    'height': this.insured.controls['insuredHeight'].value,
                    'weight': this.insured.controls['insuredWeight'].value,
                    "partyAddressDOList": [{
                        'addressLine1Lang1':  this.insured.controls['insuredAddress'].value,
                        'addressLine2Lang1':  this.insured.controls['insuredAddress2'].value,
                        'addressTypeCd': "COMMUNICATION",
                        'areaCd':  this.insured.controls['insuredCity'].value,
                        'cityCd': this.insured.controls['insuredCity'].value,
                        'pinCode':  this.insured.controls['insuredPincode'].value,
                        'stateCd':  this.insured.controls['insuredState'].value,
                        'countryCd': 'IND'
                    },
                        {
                            'addressLine1Lang1':  this.insured.controls['insuredrAddress'].value,
                            'addressLine2Lang1':  this.insured.controls['insuredrAddress2'].value,
                            'addressTypeCd': 'PERMANENT',
                            'areaCd':  this.insured.controls['insuredrCity'].value,
                            'cityCd':  this.insured.controls['insuredrCity'].value,
                            'pinCode':  this.insured.controls['insuredrPincode'].value,
                            'stateCd':  this.insured.controls['insuredrState'].value,
                            'countryCd': 'IND'
                        }
                    ],
                    "partyContactDOList": [{
                        'contactNum':  this.insured.controls['insuredMobile'].value,
                        'contactTypeCd': 'MOBILE',
                        'stdCode': "+91"
                    },
                        {
                            'contactNum': this.insured.controls['insuredAltnumber'].value,
                            'contactTypeCd': 'RESIDENTIAL',
                            'stdCode': "+91"
                        }
                    ],
                    "partyEmailDOList": [{
                        'emailAddress':  this.insured.controls['insuredEmail'].value,
                        'emailTypeCd': "PERSONAL"
                    },
                        {
                            'emailAddress':  this.insured.controls['insuredEmail2'].value,
                            'emailTypeCd': "OFFICIAL"
                        }
                    ],
                    "partyIdentityDOList": [{
                        'identityNum': pan1.toUpperCase(),
                        'identityTypeCd': "PAN"
                    },
                        {
                            'identityNum':  this.insured.controls['insuredPassPort'].value,
                            'identityTypeCd': "PASSPORT"
                        }
                    ],
                    "partyQuestionDOList": this.partyQuestionDOList,
                    'relationCd': 'SELF',
                    'roleCd': 'PRIMARY',
                    'titleCd': this.insured.controls['insuredTitle'].value,
                    'partyEmploymentDOList': {
                        'occupationCd': 'C1'
                    }
                }
            ],
            policyAdditionalFieldsDOList: {
                'field10':  this.nomineeDetails.controls['religareNomineeName'].value,
                'field12':  this.nomineeDetails.controls['religareRelationship'].value,
                'fieldTc': 'YES'
            }
        }
     }

        this.settings.loadingSpinner = true;
        this.personalservice.  getPersonalAccidentReligareProposal(data).subscribe(
            (successData) => {
                this.proposalSuccess(successData);
            },
            (error) => {
                this.proposalFailure(error);
            }
        );

       }

    public proposalSuccess(successData) {
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {
            this.lastStepper.next();
            this.topScroll();
            this.nextStep();
            this.religarePATrue3 = false;
            this.toastr.success('Proposal created successfully!!');
            this.summaryData = successData.ResponseObject;
            this.religarePAProposal = this.summaryData.proposal_id;
            this.proposalNum = this.summaryData.proposalNum;
            this.returnURL = this.summaryData.returnURL;
            this.action = this.summaryData.action;
            sessionStorage.pa_religare_proposal_id = this.religarePAProposal;
            sessionStorage.summaryData = JSON.stringify(this.summaryData);
            console.log(sessionStorage.summaryData,'sessionStorage.summaryData');
            this.proposerDataForm = this.insured.value;
            this.nomineeDataForm = this.nomineeDetails.value;
            sessionStorage.proposerDataFormReligare =  JSON.stringify(this.proposerDataForm);
            sessionStorage.nomineeDataFormReligare = JSON.stringify(this.nomineeDataForm);
            this.createdDate = new Date();
            this.pos_status = this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4';

        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }
    public proposalFailure(error) {
        this.settings.loadingSpinner = false;
    }
    changeRCity(){
        this.insured.controls['insuredrCityName'].patchValue(this.residenceCitys[this.insured.controls['insuredrCity'].value]);
    }
    changeCity() {
        this.insured.controls['insuredCityName'].patchValue(this.personalCitys[this.insured.controls['insuredCity'].value]);
    }
    changeOccupationDescription(){

        for(let i=0 ;i < this.insureClassDescription.length; i++){
            if(this.insureClassDescription[i].occupation_class_description == this.insured.controls['insuredClassDescriptionCode'].value){
                this.insured.controls['insuredClassDescriptionCodeName'].patchValue(this.insureClassDescription[i].occ_name);
            }
        }
        console.log( this.insured.controls['insuredClassDescriptionCodeName'].value,'oooooooooooo');

    }
    changeDescription(){
        this.insured.controls['insuredDescriptionCodeName'].patchValue(this.insureoccupationdescriptionList[this.insured.controls['insuredDescriptionCode'].value]);
    }
    changeOccupation(){
        this.insured.controls['insuredOccupationCodeName'].patchValue(this.occupationCode[this.insured.controls['insuredOccupationCode'].value]);
    }
    changeRelationShip(){
        this.nomineeDetails.controls['religareRelationshipName'].patchValue(this.relationshipList[this.nomineeDetails.controls['religareRelationship'].value]);
    }
    // payLater
    payLater() {

        let pan = this.personal.controls['personalPan'].value;
        let pan1 = this.insured.controls['insuredPan'].value;
        const data= {
            'product_id': this.getBuyDetails.product_id,
            'policy_term': '1',
            'scheme_id': this.getBuyDetails.scheme,
            'terms_condition': '1',
            'user_id' : this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
            'platform': 'web',
            'created-date': this.createdDate,
            'payment-date': '',
            'proposal_id': sessionStorage.pa_religare_proposal_id == '' || sessionStorage.pa_religare_proposal_id == undefined ? '' : sessionStorage.pa_religare_proposal_id,
            'enquiry_id': this.getAllPremiumDetails.enquiry_id,
            'group_name': 'Group A',
            'company_name': this.getBuyDetails.company_name,
            'plan_name': this.getBuyDetails.product_name,
            'suminsured_amount':this.getBuyDetails.suminsured_amount,
            'company_logo': this.getBuyDetails.company_logo,
            'BasePremium': this.summaryData.premium,
            // 'FinalPremium': this.summaryData.FinalPremium,
            'action':this.summaryData.action,
            'proposalNum':this.summaryData.proposalNum,
            'returnURL':this.summaryData.returnURL,
            "policy": {
                "partyDOList": [{
                    'birthDt': this.datepipe.transform(this.insured.controls['insuredDob'].value, 'y-MM-dd'),
                    'firstName': this.insured.controls['insuredFirstname'].value,
                    'genderCd': this.insured.controls['insuredGender'].value,
                    'relationCd':'SELF',
                    'roleCd': "PROPOSER",
                    'titleCd': this.insured.controls['insuredTitle'].value,
                    'annualSalary': this.insured.controls['insuredAnnualIncome'].value != 0 ? this.insured.controls['insuredAnnualIncome'].value: '',
                    'occupationCode':this.insured.controls['insuredOccupationCode'].value,
                    'occupationClass': this.insured.controls['insuredDescriptionCode'].value,
                    'occupationClassValue':this.insured.controls['insuredDescriptionCodeName'].value,
                    'classDescription': this.insured.controls['insuredDescription'].value,
                    'classDescriptionValue': this.insureoccupationDescription ? this.insured.controls['insuredClassDescriptionCodeName'].value : this.insured.controls['insuredClassDescriptionCodeName'].value,
                    'lastName':  this.insured.controls['insuredLastname'].value,
                    "partyAddressDOList": [{
                        'addressLine1Lang1':  this.insured.controls['insuredAddress'].value,
                        'addressLine2Lang1':  this.insured.controls['insuredAddress2'].value,
                        'addressTypeCd': "COMMUNICATION",
                        'areaCd':  this.insured.controls['insuredCity'].value,
                        'cityCd': this.insured.controls['insuredCity'].value,
                        'pinCode':  this.insured.controls['insuredPincode'].value,
                        'stateCd':  this.insured.controls['insuredState'].value,
                        'insuredCityName':  this.insured.controls['insuredCityName'].value,
                        'countryCd': 'IND'
                    },
                        {
                            'addressLine1Lang1':  this.insured.controls['insuredrAddress'].value,
                            'addressLine2Lang1':  this.insured.controls['insuredrAddress2'].value,
                            'addressTypeCd': 'PERMANENT',
                            'areaCd':  this.insured.controls['insuredrCity'].value,
                            'cityCd':  this.insured.controls['insuredrCity'].value,
                            'pinCode':  this.insured.controls['insuredrPincode'].value,
                            'stateCd':  this.insured.controls['insuredrState'].value,
                            'insuredrCityName':  this.insured.controls['insuredrCityName'].value,

                            'countryCd': 'IND'
                        }
                    ],
                    "partyContactDOList": [{
                        'contactNum':  this.insured.controls['insuredMobile'].value,
                        'contactTypeCd': 'MOBILE',
                        'stdCode': "+91"
                    },
                        {
                            'contactNum': this.insured.controls['insuredAltnumber'].value,
                            'contactTypeCd': 'RESIDENTIAL',
                            'stdCode': "+91"
                        }
                    ],
                    "partyEmailDOList": [{
                        'emailAddress':  this.insured.controls['insuredEmail'].value,
                        'emailTypeCd': "PERSONAL"
                    },
                        {
                            'emailAddress':  this.insured.controls['insuredEmail2'].value,
                            'emailTypeCd': "OFFICIAL"
                        }
                    ],
                    "partyIdentityDOList": [{
                        'identityNum': pan1.toUpperCase(),
                        'identityTypeCd': "PAN"
                    },
                        {
                            'identityNum':  this.insured.controls['insuredPassPort'].value,
                            'identityTypeCd': "PASSPORT"
                        }
                    ]
                },
                    {
                        'birthDt': this.datepipe.transform(this.insured.controls['insuredDob'].value, 'y-MM-dd'),
                        'firstName': this.insured.controls['insuredFirstname'].value,
                        'genderCd':  this.insured.controls['insuredGender'].value,
                        'annualSalary': this.insured.controls['insuredAnnualIncome'].value != 0 ? this.insured.controls['insuredAnnualIncome'].value: '',
                        'occupationCode':this.insured.controls['insuredOccupationCode'].value,
                        'occupationClass': this.insured.controls['insuredDescriptionCode'].value,
                        'occupationClassValue':this.insured.controls['insuredDescriptionCodeName'].value,

                        // 'classDescription': this.insureoccupationDescription ? this.insured.controls['insuredDescription'].value : this.insured.controls['insuredClassDescriptionCode'].value,
                        'classDescription': this.insured.controls['insuredDescription'].value,
                        'classDescriptionValue': this.insureoccupationDescription ? this.insured.controls['insuredClassDescriptionCodeName'].value : this.insured.controls['insuredClassDescriptionCodeName'].value,
                        'lastName':  this.insured.controls['insuredLastname'].value,
                        'height': this.insured.controls['insuredHeight'].value,
                        'weight': this.insured.controls['insuredWeight'].value,
                        "partyAddressDOList": [{
                            'addressLine1Lang1':  this.insured.controls['insuredAddress'].value,
                            'addressLine2Lang1':  this.insured.controls['insuredAddress2'].value,
                            'addressTypeCd': "COMMUNICATION",
                            'areaCd':  this.insured.controls['insuredCity'].value,
                            'cityCd': this.insured.controls['insuredCity'].value,
                            'pinCode':  this.insured.controls['insuredPincode'].value,
                            'stateCd':  this.insured.controls['insuredState'].value,
                            'countryCd': 'IND'
                        },
                            {
                                'addressLine1Lang1':  this.insured.controls['insuredrAddress'].value,
                                'addressLine2Lang1':  this.insured.controls['insuredrAddress2'].value,
                                'addressTypeCd': 'PERMANENT',
                                'areaCd':  this.insured.controls['insuredrCity'].value,
                                'cityCd':  this.insured.controls['insuredrCity'].value,
                                'pinCode':  this.insured.controls['insuredrPincode'].value,
                                'stateCd':  this.insured.controls['insuredrState'].value,
                                'countryCd': 'IND'
                            }
                        ],
                        "partyContactDOList": [{
                            'contactNum':  this.insured.controls['insuredMobile'].value,
                            'contactTypeCd': 'MOBILE',
                            'stdCode': "+91"
                        },
                            {
                                'contactNum': this.insured.controls['insuredAltnumber'].value,
                                'contactTypeCd': 'RESIDENTIAL',
                                'stdCode': "+91"
                            }
                        ],
                        "partyEmailDOList": [{
                            'emailAddress':  this.insured.controls['insuredEmail'].value,
                            'emailTypeCd': "PERSONAL"
                        },
                            {
                                'emailAddress':  this.insured.controls['insuredEmail2'].value,
                                'emailTypeCd': "OFFICIAL"
                            }
                        ],
                        "partyIdentityDOList": [{
                            'identityNum': pan1.toUpperCase(),
                            'identityTypeCd': "PAN"
                        },
                            {
                                'identityNum':  this.insured.controls['insuredPassPort'].value,
                                'identityTypeCd': "PASSPORT"
                            }
                        ],
                        "partyQuestionDOList": this.partyQuestionDOList,
                        'relationCd': 'SELF',
                        'roleCd': 'PRIMARY',
                        'titleCd': this.insured.controls['insuredTitle'].value,
                        'partyEmploymentDOList': {
                            'occupationCd': 'C1'
                        }
                    }
                ],
                policyAdditionalFieldsDOList: {
                    'field10':  this.nomineeDetails.controls['religareNomineeName'].value,
                    'field12':  this.nomineeDetails.controls['religareRelationship'].value,
                    'fieldTc': 'YES'
                }
            }
        }


        console.log(data, 'payyyyy');
        this.settings.loadingSpinner = true;
        this.personalservice.proposalPayLater(data).subscribe(
            (successData) => {
                this.payLaterSuccess(successData);
            },
            (error) => {
                this.payLaterFailure(error);
            }
        );

    }
    public payLaterSuccess(successData) {
        if (successData.IsSuccess) {
            this.settings.loadingSpinner = false;
            this.toastr.success(successData.ResponseObject);
            this.saveEdit();
        } else {
        }
    }

    public payLaterFailure(successData) {
    }
    saveEdit(){
        this.router.navigate(['/home']);

    }
    // get request
    getBackRequest() {
        const data = {
            'platform': 'web',
            'user_id': '0',
            'role_id': '4',
            'proposal_id': this.proposal_Id
        };
        this.personalservice.proposalGetRequest(data).subscribe(
            (successData) => {
                this.getBackResSuccess(successData);
            },
            (error) => {
                this.getBackResFailure(error);
            }
        );
    }
    public getBackResSuccess(successData) {
        if (successData.IsSuccess) {
            this.requestDetails = successData.ResponseObject;
            this.proposalNum = this.requestDetails.proposalNum;
            this.returnURL = this.requestDetails.returnURL;
            this.action = this.requestDetails.action;
            this.proposerRequest = this.requestDetails.policy.partyDOList[0];
             let   lll = this.proposerRequest.firstName;
             console.log(lll, 'lll');
            let last = this.proposerRequest.lastName;
            console.log(lll, 'lll');
            let salary = this.proposerRequest.annualSalary;
            console.log(lll, 'lll');
            let occ = this.proposerRequest.occupationClassValue;
            console.log(occ, 'occ');

            let architects = this.proposerRequest.Architects;
            console.log(architects, 'architects');

            let mobile = this.proposerRequest.partyContactDOList[0].contactNum;
            console.log(mobile, 'mobile');

            let email = this.proposerRequest.partyEmailDOList[0].emailAddress;
            console.log(email, 'email');

            // this.contactInfo = this.proposerRequest.partyContactDOList[0].contactNum[0];
            this.proposerRequestAddress = this.proposerRequest.partyAddressDOList[0];
            this.proposerRequestAddressPerm = this.proposerRequest.partyAddressDOList[1];
            this.mailInfo = this.proposerRequest.partyEmailDOList[0].emailAddress;
            // this.insuredRequestMobile = this.insuredRequest.ContactInformation.Email;
            // this.proposerRequestMobile = this.proposerRequest.ContactInformation.ContactNumber.ContactNumber.Number;
            // console.log(this.requestDetails, 'requestDetailsrequestDetails');
            this.pos_status = this.requestDetails.role_id;
        } else {
        }
    }
    public getBackResFailure(successData) {
    }
}
