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
 import {ActivatedRoute} from '@angular/router';
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
    array: any;
    gender: any;
    sameFieldsInsure: any;
    sameinsure: any;
    proposerList: any;
    insurepersonalCitys: any;
    iresponse: any;
    insuredresidenceCitys: any;
    rinsuredResponse: any;
    insuremobileNumber: any;
    personalAccidentQuestionsList: any;
    occupationdescriptionList: any;
    occupationFirst: boolean;
    occupationSecond :boolean;
    occupationDescription: boolean;
    insureoccupationFirst:boolean;
    insureoccupationSecond: boolean;
    insureoccupationdescription:boolean;
    occupationClass: boolean;
    insureClassDescription: any;
    insureoccupationdescriptionList: any;
    personalClassDescription: any;
    insureoccupationDescription: boolean;
    insureoccupationClass: boolean;
    public religarePAProposal: any;
    proposerAgePA: any;
    insuredAgePA: any;
    public readonlyproposer: boolean;
    insuredate: any;
    personaldateError: any;
    insurerdateError: any;
    currentStep: any;
    personalDescriptionclassPA: boolean;
    Address2: boolean;
    personalAddress2: boolean;
    mobileno: boolean;
    resAddress2: boolean;
    gst: boolean;
    gst1: boolean;
    resnumber: boolean;
    passPort1: boolean;
    passPort: boolean;
    addressPr: boolean;
    addressPC: boolean;
    insuredDescriptionValidator: boolean;
    constructor(private fb: FormBuilder, public proposalservice: HealthService,public route: ActivatedRoute, public validation: ValidationService, public personalservice: PersonalAccidentService, public datepipe: DatePipe, private toastr: ToastrService, public appSettings: AppSettings, public dialog: MatDialog,
                public config: ConfigurationService, public auth: AuthService, public http: HttpClient, @Inject(LOCALE_ID) private locale: string) {
        let stepperindex = 0;
        this.route.params.forEach((params) => {
        if(params.stepper == true) {
        stepperindex = 4;
    }
     });
 this.currentStep = stepperindex;
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
        this.religarePAProposal= 0;
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
            personalClassDescriptionCode:'',
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
            insuredDescription: '',
            insuredDescriptionCode: '',
            insuredClassDescriptionCode: '',
            insuredPan: '',
            insuredPassPort: '',
            insuredAddress: ['', Validators.required],
            insuredAddress2: '',
            insuredPincode: ['', Validators.required],
            insuredCity: ['', Validators.required],
            insuredState: ['', Validators.required],
            insuredEmail: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
            insuredEmail2: ['', Validators.compose([ Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
            insuredMobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
            insuredAltnumber: '',
            insuredrAddress: ['', Validators.required],
            insuredrAddress2:'',
            insuredrPincode: ['', Validators.required],
            insuredrCity: ['', Validators.required],
            insuredrState: ['', Validators.required],
            sameAsinsureProposer: false,
            sameasInsuredAddress: false,
            insuredHeight:['', Validators.required],
            insuredWeight:['', Validators.required],
            insuredrolecd: 'PRIMARY',
            type: '',
            medical_status: 'No'

        });
        this.nomineeDetails = this.fb.group({
            'religareNomineeName': ['', Validators.required],
            'religareRelationship': ['', Validators.required]
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
    nameValidate(event: any){
        this.validation.nameValidate(event);
    }
    // Dob validation
    dobValidate(event: any){
        this.validation.dobValidate(event);
    }
    // Number validation
    numberValidate(event: any){
        this.validation.numberValidate(event);
    }
    idValidate(event: any){
        this.validation.idValidate(event);
    }

    ngOnInit() {
        this.setRelationship();
        this.setOccupationListCode();
        this.setpersonalOccupationListCode();
        this.setinsureOccupationListCode();
        this.getBuyDetails = JSON.parse(sessionStorage.pAccidentProposalList);
        this.getAllPremiumDetails = JSON.parse(sessionStorage.personalPremiumLists);
        if(this.getAllPremiumDetails.product_id == 1) {
            this.nomineeDetails.get('religareNomineeName').setValidators([Validators.required]);
            this.nomineeDetails.get('religareRelationship').setValidators([Validators.required]);
        }
        if(this.getAllPremiumDetails.product_id != 1) {
            this.nomineeDetails.get('religareNomineeName').setValidators(null);
            this.nomineeDetails.get('religareRelationship').setValidators(null);
        }
        this.nomineeDetails.get('religareNomineeName').updateValueAndValidity();
        this.nomineeDetails.get('religareRelationship').updateValueAndValidity();
        // this.mobileNumber = '';
        // this.insuremobileNumber = '';
        this.sessionData();
    }
    setStep(index: number) {
        this.step = index;
    }
    canDeactivate() {
        return this.religarePAProposal;
    }



    prevStep() {
        this.step--;
    }
// session
    sessionData() {
        if (sessionStorage.proposal1Detail != '' && sessionStorage.proposal1Detail != undefined) {
            this.getStepper1 = JSON.parse(sessionStorage.proposal1Detail);
            if (this.getStepper1.personalPincode != '') {
                this.getPostal(this.getStepper1.personalPincode, 'personal');
            }
            setTimeout(()=> {
                if (this.getStepper1.residencePincode != '') {
                    this.getPostal(this.getStepper1.residencePincode, 'residence');
                }

            this.personal = this.fb.group({
                personalTitle: this.getStepper1.personalTitle,
                personalFirstname: this.getStepper1.personalFirstname,
                personalLastname: this.getStepper1.personalLastname,
                personalDob:new FormControl(new Date(this.getStepper1.personalDob)),
                personalArea: this.getStepper1.personalArea,
                residenceArea: this.getStepper1.residenceArea,
                personalAnualIncome: this.getStepper1.personalAnualIncome,
                personalrelationship: this.getStepper1.personalrelationship,
                personalOccupationCode: this.getStepper1.personalOccupationCode,
                personalDescriptionCode: this.getStepper1.personalDescriptionCode,
                personalClassDescriptionCode: this.getStepper1.personalClassDescriptionCode,
                personalDescription: this.getStepper1.personalDescription,
                sameAsProposer: this.getStepper1.sameAsProposer,
                personalGender: this.getStepper1.personalGender,
                personalPan: this.getStepper1.personalPan.toUpperCase(),
                personalPassPort: this.getStepper1.personalPassPort,
                personalAddress: this.getStepper1.personalAddress,
                personalAddress2: this.getStepper1.personalAddress2,
                personalPincode: this.getStepper1.personalPincode,
                personalCity: this.getStepper1.personalCity,
                personalState: this.getStepper1.personalState,
                personalEmail: this.getStepper1.personalEmail,
                personalEmail2: this.getStepper1.personalEmail2,
                personalMobile: this.getStepper1.personalMobile,
                personalAltnumber: this.getStepper1.personalAltnumber,
                residenceAddress: this.getStepper1.residenceAddress,
                residenceAddress2: this.getStepper1.residenceAddress2,
                residencePincode: this.getStepper1.residencePincode,
                residenceCity: this.getStepper1.residenceCity,
                residenceState: this.getStepper1.residenceState,
                relationshipcd: this.getStepper1.relationshipcd
            });
            },700);
            // if (this.getStepper1.personalDescriptionCode != '') {
            //     this.personal.controls['personalDescriptionCode'].patchValue(this.getStepper1.personalDescriptionCode);
            //     this.setpersonalDescriptionListCode('session');
            //     this.personal.controls['personalClassDescriptionCode'].patchValue(this.getStepper1.personalClassDescriptionCode);
            // }



            // if (sessionStorage.sameas != '' && sessionStorage.sameas != undefined) {
            //     this.getStepper2 = JSON.parse(sessionStorage.sameas);
            // }

        }

        if (sessionStorage.proposal2Detail != '' && sessionStorage.proposal2Detail != undefined) {
            this.getStepper2= JSON.parse(sessionStorage.proposal2Detail);


            this.insured = this.fb.group({
                insuredTitle: this.getStepper2.insuredTitle,
                insuredFirstname: this.getStepper2.insuredFirstname,
                insuredLastname: this.getStepper2.insuredLastname,
                insuredDob:new FormControl(new Date(this.getStepper2.insuredDob)),
                insuredArea: this.getStepper2.insuredArea,
                insuredAnnualIncome: this.getStepper2.insuredAnnualIncome,
                insuredrelationship: this.getStepper2.insuredrelationship,
                sameAsinsureProposer: this.getStepper2.sameAsinsureProposer,
                sameasInsuredAddress: this.getStepper2.sameasInsuredAddress,
                insuredOccupationCode: this.getStepper2.insuredOccupationCode,
                insuredDescriptionCode: this.getStepper2.insuredDescriptionCode,
                insuredClassDescriptionCode: this.getStepper2.insuredClassDescriptionCode,
                insuredDescription: this.getStepper2.insuredDescription,
                insuredGender: this.getStepper2.insuredGender,
                insuredPan: this.getStepper2.insuredPan.toUpperCase(),
                insuredPassPort: this.getStepper2.insuredPassPort,
                insuredAddress: this.getStepper2.insuredAddress,
                insuredAddress2: this.getStepper2.insuredAddress2,
                insuredPincode: this.getStepper2.insuredPincode,
                insuredCity: this.getStepper2.insuredCity,
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
                insuredrState: this.getStepper2.insuredrState,
                relationshipcd: this.getStepper2.relationshipcd
            });

            if (this.getStepper2.sameAsinsureProposer) {
                this.insuredAgePA = this.ageCalculate(this.getStepper1.personalDob);
                sessionStorage.insuredAgePA = this.insuredAgePA;
                // if (this.getStepper1.personalOccupationCode != '') {
                //     this.insured.controls['insuredOccupationCode'].patchValue(this.getStepper1.personalOccupationCode);
                //     this.setinsureOccupationListCode();
                // }
                this.getInsurePostal(this.getStepper1.personalPincode, 'personal');
                setTimeout(() => {
                    this.getInsurePostal(this.getStepper1.personalPincode, 'residence');
                },600);
                this.insured.controls['insuredDescriptionCode'].patchValue(this.getStepper1.personalDescriptionCode);
                this.setinsureDescriptionListCode();
            }


        }
        if (sessionStorage.mobileNumber != '' && sessionStorage.mobileNumber != undefined) {
            this.mobileNumber = sessionStorage.mobileNumber;
        } else {
            this.mobileNumber = 'true';
        }
        if (sessionStorage.insuremobileNumber != '' ) {
            this.insuremobileNumber = sessionStorage.insuremobileNumber;
        } else {
            this.insuremobileNumber = 'true';
        }
        if (sessionStorage.proposal3Detail != '' && sessionStorage.proposal3Detail != undefined) {
            this.personalAccidentQuestionsList = JSON.parse(sessionStorage.proposal3Detail);

        } else {
            this. religareQuestions();
        }

// nominee
        if (sessionStorage.personalnomineeData != '' && sessionStorage.personalnomineeData != undefined) {
            this.getpersonalNomineeData = JSON.parse(sessionStorage.personalnomineeData);
            this.nomineeDetails = this.fb.group({
                religareNomineeName: this.getpersonalNomineeData.religareNomineeName,
                religareRelationship: this.getpersonalNomineeData.religareRelationship
            });
        }
        if (sessionStorage.pa_religare_proposal_id != '' && sessionStorage.pa_religare_proposal_id != undefined) {
            this.religarePAProposal = sessionStorage.pa_religare_proposal_id;
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
            if (sessionStorage.proposerAgePA >=18) {
                this.proposerInsureData.push(this.personalData);
                if (this.mobileNumber == '' || this.mobileNumber == 'true'){
                    if(this.personal.controls['personalAnualIncome'].value != 0) {
                        stepper.next();
                        this.topScroll();
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
        if (this.insured.valid) {
            if (sessionStorage.insuredAgePA>= 18) {
                if(this.insured.controls['insuredAnnualIncome'].value != 0) {
                    stepper.next();
                    this.topScroll();
                } else {
                    this.toastr.error('Invalid Annual Income');

                }
            } else {
                this.toastr.error('Insured age should be 18 or above');

            }
            // if (this.insuremobileNumber == '' || this.insuremobileNumber == 'true') {
            //     stepper.next();
            // }

        }
    }

    topScroll() {
        document.getElementById('main-content').scrollTop = 0;
    }

    // sameAddress(values: any) {
    //     this.sameField = values.checked;
    //     if (values.checked) {
    //         this.inputReadonly = true;
    //         this.personal.controls['residenceAddress'].setValue(this.personal.controls['personalAddress'].value);
    //         this.personal.controls['residenceAddress2'].setValue(this.personal.controls['personalAddress2'].value);
    //         this.personal.controls['residenceCity'].setValue(this.personal.controls['personalCity'].value);
    //         this.personal.controls['residencePincode'].setValue(this.personal.controls['personalPincode'].value);
    //         this.personal.controls['residenceState'].setValue(this.personal.controls['personalState'].value);
    //
    //     } else {
    //         this.inputReadonly = false;
    //         this.personal.controls['residenceAddress'].setValue('');
    //         this.personal.controls['residenceAddress2'].setValue('');
    //         this.personal.controls['residenceCity'].setValue('');
    //         this.personal.controls['residencePincode'].setValue('');
    //         this.personal.controls['residenceState'].setValue('');
    //
    //     }
    // }
    // insured
    insuredsameAddress(values: any) {
        this.sameinsure = values.checked;
        if (values.checked) {
            this.inputReadonly = true;
            this.insured.controls['insuredrAddress'].patchValue(this.insured.controls['insuredAddress'].value);
            this.insured.controls['insuredrAddress2'].patchValue(this.insured.controls['insuredAddress2'].value);
            this.insured.controls['insuredrCity'].patchValue(this.insured.controls['insuredCity'].value);
            this.insured.controls['insuredrPincode'].patchValue(this.insured.controls['insuredPincode'].value);
            this.insured.controls['insuredrState'].patchValue(this.insured.controls['insuredState'].value);

        } else {
            this.inputReadonly = false;
            this.insured.controls['insuredrAddress'].patchValue('');
            this.insured.controls['insuredrAddress2'].patchValue('');
            this.insured.controls['insuredrCity'].patchValue('');
            this.insured.controls['insuredrPincode'].patchValue('');
            this.insured.controls['insuredrState'].patchValue('');

        }
    }
    // //sameaddress\
    // sameProposer(value: any) {
    //     if (value.checked) {
    //         sessionStorage.insuredAgePA = '';
    //         sessionStorage.sameas = this.readonlyproposer;
    //         this.getInsurePostal(this.personal.controls['personalPincode'].value, 'personal');
    //         setTimeout(() => {
    //             this.getInsurePostal(this.personal.controls['residencePincode'].value, 'residence');
    //         },600);
    //         this.insured.controls['insuredDescriptionCode'].patchValue(this.personal.controls['personalDescriptionCode'].value);
    //         this.insured.controls['insuredClassDescriptionCode'].patchValue(this.personal.controls['personalClassDescriptionCode'].value);
    //
    //         this.setinsureDescriptionListCode();
    //
    //         this.readonlyproposer = true;
    //         this.insured.controls['sameasInsuredAddress'].disable();
    //         this.insured.controls['insuredTitle'].patchValue(this.personal.controls['personalTitle'].value);
    //         this.insured.controls['insuredFirstname'].patchValue(this.personal.controls['personalFirstname'].value);
    //         this.insured.controls['insuredLastname'].patchValue(this.personal.controls['personalLastname'].value);
    //         this.insured.controls['insuredDob'].patchValue(this.personal.controls['personalDob'].value);
    //         this.insured.controls['insuredAnnualIncome'].patchValue(this.personal.controls['personalAnualIncome'].value);
    //         this.insured.controls['insuredOccupationCode'].patchValue(this.personal.controls['personalOccupationCode'].value);
    //         this.insured.controls['insuredDescription'].patchValue(this.personal.controls['personalDescription'].value);
    //
    //         this.insured.controls['insuredrelationship'].patchValue(this.personal.controls['personalrelationship'].value);
    //         this.insured.controls['insuredGender'].patchValue(this.personal.controls['personalGender'].value);
    //         this.insured.controls['insuredPan'].patchValue(this.personal.controls['personalPan'].value.toUpperCase());
    //         this.insured.controls['insuredPassPort'].patchValue(this.personal.controls['personalPassPort'].value);
    //         this.insured.controls['insuredAddress'].patchValue(this.personal.controls['personalAddress'].value);
    //         this.insured.controls['insuredAddress2'].patchValue(this.personal.controls['personalAddress2'].value);
    //         this.insured.controls['insuredCity'].patchValue(this.personal.controls['personalCity'].value);
    //         this.insured.controls['insuredPincode'].patchValue(this.personal.controls['personalPincode'].value);
    //         this.insured.controls['insuredState'].patchValue(this.personal.controls['personalState'].value);
    //         this.insured.controls['insuredEmail'].patchValue(this.personal.controls['personalEmail'].value);
    //         this.insured.controls['insuredEmail2'].patchValue(this.personal.controls['personalEmail2'].value);
    //         this.insured.controls['insuredMobile'].patchValue(this.personal.controls['personalMobile'].value);
    //         this.insured.controls['insuredAltnumber'].patchValue(this.personal.controls['personalAltnumber'].value);
    //         this.insured.controls['insuredrAddress'].patchValue(this.personal.controls['residenceAddress'].value);
    //         this.insured.controls['insuredrAddress2'].patchValue(this.personal.controls['residenceAddress2'].value);
    //         this.insured.controls['insuredrCity'].patchValue(this.personal.controls['residenceCity'].value);
    //         this.insured.controls['insuredrPincode'].patchValue(this.personal.controls['residencePincode'].value);
    //         this.insured.controls['insuredrState'].patchValue(this.personal.controls['residenceState'].value);
    //
    //         let idob = this.datepipe.transform(this.personal.controls['personalDob'].value, 'y-MM-dd');
    //         this.insuredAgePA = this.ageCalculate(idob);
    //         sessionStorage.insuredAgePA = this.insuredAgePA;
    //
    //     }
    //     else{
    //         this.readonlyproposer = false;
    //         this.insured.controls['sameasInsuredAddress'].enable();
    //         this.insured.controls['insuredTitle'].patchValue('');
    //         this.insured.controls['insuredFirstname'].patchValue('');
    //         this.insured.controls['insuredLastname'].patchValue('');
    //         this.insured.controls['insuredDob'].patchValue('');
    //         this.insured.controls['insuredAnnualIncome'].patchValue('');
    //         this.insured.controls['insuredrelationship'].patchValue('');
    //         this.insured.controls['insuredOccupationCode'].patchValue('');
    //         this.insured.controls['insuredClassDescriptionCode'].patchValue('');
    //         this.insured.controls['insuredGender'].patchValue('');
    //         this.insured.controls['insuredPan'].patchValue('');
    //         this.insured.controls['insuredPassPort'].patchValue('');
    //         this.insured.controls['insuredAddress'].patchValue('');
    //         this.insured.controls['insuredAddress2'].patchValue('');
    //         this.insured.controls['insuredCity'].patchValue('');
    //         this.insured.controls['insuredPincode'].patchValue('');
    //         this.insured.controls['insuredState'].patchValue('');
    //         this.insured.controls['insuredEmail'].patchValue('');
    //         this.insured.controls['insuredEmail2'].patchValue('');
    //         this.insured.controls['insuredMobile'].patchValue('');
    //         this.insured.controls['insuredAltnumber'].patchValue('');
    //         this.insured.controls['insuredrAddress'].patchValue('');
    //         this.insured.controls['insuredrAddress2'].patchValue('');
    //         this.insured.controls['insuredrCity'].patchValue('');
    //         this.insured.controls['insuredrPincode'].patchValue('');
    //         this.insured.controls['insuredrState'].patchValue('');
    //         sessionStorage.insuredAgePA = '';
    //
    //
    //     }
    // }

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



//     addEvent(event, type) {
//         if (event.value != null) {
//             let selectedDate = '';
//             this.proposerAgePA = '';
//             this.insuredAgePA = '';
//             let dob = '';
//             if (typeof event.value._i == 'string') {
//                 const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
//                 if (pattern.test(event.value._i) && event.value._i.length == 10) {
//                     if(type == 'personal'){
//                         this.personaldateError = '';
//                     } else if (type == 'insure'){
//                         this.insurerdateError = '';
//                     }
//                 } else {
//                     if(type == 'personal'){
//                         this.personaldateError = 'Enter Valid Date';
//                     } else if (type == 'insure') {
//                         this.insurerdateError = 'Enter Valid Date';
//                     }
//                 }
//                 selectedDate = event.value._i;
//                 dob = this.datepipe.transform(event.value, 'y-MM-dd');
//                 if (selectedDate.length == 10) {
//                     if(type == 'personal'){
//                        this.personaldateError = '';
//                         this.personal.controls['personalDob'].patchValue(dob);
//                         this.proposerAgePA = this.ageCalculate(dob);
//                     } else {
//                         this.insurerdateError = '';
//                         this.insured.controls['insuredDob'].patchValue(dob);
//                         this.insuredAgePA = this.ageCalculate(dob);
//
//                     }
//
//                 }
//             } else if (typeof event.value._i == 'object') {
//                 this.insuredate = '';
//                 dob = this.datepipe.transform(event.value, 'y-MM-dd');
//                 if (dob.length == 10) {
//                     if(type == 'personal'){
//                         this.personaldateError = '';
//                         this.personal.controls['personalDob'].patchValue(dob);
//                     this.proposerAgePA = this.ageCalculate(dob);
//                 } else {
//                         this.insurerdateError = '';
//                         this.insured.controls['insuredDob'].patchValue(dob);
//                         this.insuredAgePA = this.ageCalculate(dob);
//
//                     }
//                 }
//
//             }
//             if(type == 'personal') {
//                 sessionStorage.proposerAgePA = this.proposerAgePA;
//             } else {
//                 sessionStorage.insuredAgePA = this.insuredAgePA;
//             }
//
//         }
//
//
// }


    ageCalculate(dob) {
        let mdate = dob.toString();
        let yearThen = parseInt(mdate.substring(8, 10), 10);
        let monthThen = parseInt(mdate.substring(5, 7), 10);
        let dayThen = parseInt(mdate.substring(0, 4), 10);
        let todays = new Date();
        let birthday = new Date(dayThen, monthThen - 1, yearThen);
        let differenceInMilisecond = todays.valueOf() - birthday.valueOf();
        let year_age = Math.floor(differenceInMilisecond / 31536000000);
        return year_age;
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


//personal city detail
    getPostal(pin, title) {
        this.pin = pin;
        this.title = title;
        const data = {
            'platform': 'web',
            'user_id': '0',
            'role_id': '4',
            'pincode': this.pin
        }
        if (this.pin.length == 6) {
            this.personalservice.getPostalReligare(data).subscribe(
                (successData) => {
                    this.getpostalSuccess(successData);
                },
                (error) => {
                    this.getpostalFailure(error);
                }
            );
        }
    }

    public getpostalSuccess(successData) {


        if (this.title == 'personal') {
            this.personalCitys = [];
            this.response = successData.ResponseObject;
            if (successData.IsSuccess) {

                this.personal.controls['personalState'].setValue(this.response[0].state);
                for (let i = 0; i < this.response.length; i++) {
                    this.personalCitys.push({city: this.response[i].city});
                }
            } else if (successData.IsSuccess != true) {

                this.personal.controls['personalState'].setValue('');
                for (let i = 0; i < this.response.length; i++) {
                    this.personalCitys.push({city: this.response[i].city = ''});
                }
                this.toastr.error('In valid Pincode');
            }
            sessionStorage.personalCitys = JSON.stringify(this.personalCitys);

        }
        if (this.title == 'residence') {
            this.residenceCitys = [];
            this.rResponse = successData.ResponseObject;
            if (successData.IsSuccess) {
                this.personal.controls['residenceState'].setValue(this.rResponse[0].state);
                for (let i = 0; i < this.rResponse.length; i++) {
                    this.residenceCitys.push({city: this.rResponse[i].city});
                }
            } else if (successData.IsSuccess != true) {
                this.personal.controls['residenceState'].setValue('');
                for (let i = 0; i < this.rResponse.length; i++) {
                    this.residenceCitys.push({city: this.rResponse[i].city = ''});
                }
                this.toastr.error('In valid Pincode');
            }
            sessionStorage.residenceCitys = JSON.stringify(this.residenceCitys);

        }
    }
    public getpostalFailure(error) {
    }
    // insured postal details
    getInsurePostal(pin, title) {
        this.pin = pin;
        this.title = title;
        const data = {
            'platform': 'web',
            'user_id': '0',
            'role_id': '4',
            'pincode': this.pin
        }
        if (this.pin.length == 6) {
            this.personalservice.getPostalReligare(data).subscribe(
                (successData) => {
                    this.getinsurepostalSuccess(successData);
                },
                (error) => {
                    this.getinsurepostalFailure(error);
                }
            );
        }
    }

    public getinsurepostalSuccess(successData) {


        if (this.title == 'personal') {
            this.insurepersonalCitys = [];
            this.iresponse = successData.ResponseObject;

            if (successData.IsSuccess) {

                this.insured.controls['insuredState'].setValue(this.iresponse[0].state);
                for (let i = 0; i < this.iresponse.length; i++) {
                    this.insurepersonalCitys.push({city: this.iresponse[i].city});
                }
            } else if (successData.IsSuccess != true) {

                this.insured.controls['insuredState'].setValue('');
                for (let i = 0; i < this.iresponse.length; i++) {
                    this.insurepersonalCitys.push({city: this.iresponse[i].city = ''});
                }
                this.toastr.error('In valid Pincode');
            }
        }
        if (this.title == 'residence') {
            this.insuredresidenceCitys = [];
            this.rinsuredResponse = successData.ResponseObject;
            if (successData.IsSuccess) {
                this.insured.controls['insuredrState'].setValue(this.rinsuredResponse[0].state);
                for (let i = 0; i < this.rinsuredResponse.length; i++) {
                    this.insuredresidenceCitys.push({city: this.rinsuredResponse[i].city});
                }
            } else if (successData.IsSuccess != true) {
                this.insured.controls['insuredrState'].setValue('');
                for (let i = 0; i < this.rResponse.length; i++) {
                    this.insuredresidenceCitys.push({city: this.rinsuredResponse[i].city = ''});
                }
                this.toastr.error('In valid Pincode');
            }
        }
        // if (this.title == 'residenceComunication') {
        //     this.insuredresidenceCitys = [];
        //     this.rinsuredResponse = successData.ResponseObject;
        //     if (successData.IsSuccess) {
        //         this.insured.controls['insuredrState'].setValue(this.rinsuredResponse[0].state);
        //         for (let i = 0; i < this.rinsuredResponse.length; i++) {
        //             this.insuredresidenceCitys.push({city: this.rinsuredResponse[i].city});
        //         }
        //     } else if (successData.IsSuccess != true) {
        //         this.insured.controls['insuredrState'].setValue('');
        //         for (let i = 0; i < this.rResponse.length; i++) {
        //             this.insuredresidenceCitys.push({city: this.rinsuredResponse[i].city = ''});
        //         }
        //         this.toastr.error('In valid Pincode');
        //     }
        // }

    }
    public getinsurepostalFailure(error) {
    }



//summary city detail
    getPostalSummary(pin, title) {
        this.sumPin = pin;
        this.sumTitle = title;
        const data = {
            'platform': 'web',
            'pincode': this.sumPin
        }
        if (this.pin.length == 6) {
            this.personalservice.getPostal(data).subscribe(
                (successData) => {
                    this.PostalSummarySuccess(successData);
                },
                (error) => {
                    this.PostalSummaryFailure(error);
                }
            );
        }
    }

    public PostalSummarySuccess(successData) {
        if (successData.IsSuccess == true) {
            if (this.sumTitle == 'residence') {
                this.rResponse = successData.ResponseObject;
                this.residenceCitys = this.rResponse.city;
                for (let i = 0; i < this.residenceCitys.length; i++) {
                    if (this.residenceCitys[i].city_id == this.summaryData.prop_res_city) {
                        this.rSummaryCity = this.residenceCitys[i].city_name;

                    }
                }
            }


        }
    }

    public PostalSummaryFailure(error) {
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
        this.occupationList = successData.ResponseObject;
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
        this.occupationCode = successData.ResponseObject;
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
    setpersonalDescriptionListCode(type) {
        if (this.personal.controls['personalDescriptionCode'].value == 'C5') {
            this.occupationDescription = true;
            if(this.occupationDescription = true) {
                this.personalDescriptionclassPA = true;
                this.personal.controls['personalDescription'].setValidators([Validators.required]);
            } else{
                this.personalDescriptionclassPA = false;
                this.personal.controls['personalDescription'].setValidators(null);
            }
            this.occupationClass = false;
        } else {
            this.occupationDescription = false;
            this.occupationClass = true;
        }
        const data = {
            'platform': 'web',
            'occupationId':this.personal.controls['personalDescriptionCode'].value,
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.personalservice.classOccupationCode(data).subscribe(
            (successData) => {
                this.classSuccess(successData, type);
            },
            (error) => {
                this.classFailure(error);
            }
        );

    }
    public classSuccess(successData, type) {
        if (type != 'session' ) {
            this.personal.controls['personalClassDescriptionCode'].patchValue('');
        }
        this.personalClassDescription = successData.ResponseObject;


    }

    public classFailure(error) {
    }


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
            if( this.insureoccupationDescription ){
                this.insuredDescriptionValidator = true
                this.insured.controls['insuredDescription'].setValidators([Validators.required]);
            } else {
                this.insuredDescriptionValidator = true
                this.insured.controls['insuredDescription'].setValidators(null);

            }

            this.insureoccupationClass = false;

        } else {
            this.insureoccupationDescription = false;
            this.insureoccupationClass = true;

        }
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
        this.insureClassDescription = successData.ResponseObject;


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
            for (let i = 0; i < this.personalAccidentQuestionsList.length; i++) {
                this.personalAccidentQuestionsList[i].checked = false;
            }
     //   }


    }
    public religareQuestionsFailure(error) {
    }

// Medical
    medicalHistoryDetails(stepper: MatStepper) {
        sessionStorage.proposal3Detail = '';
        sessionStorage.proposal3Detail = JSON.stringify(this.personalAccidentQuestionsList);
        this.partyQuestionDOList = [];
        let count = 0;
        for (let i = 0; i < this.personalAccidentQuestionsList.length; i++) {
           // if (this.personalAccidentQuestionsList[i].checked == true) {
                count ++;
                this.partyQuestionDOList.push({'questionCd':this.personalAccidentQuestionsList[i].question_code, 'questionSetCd':this.personalAccidentQuestionsList[i].question_set_code, 'response': this.personalAccidentQuestionsList[i].checked ? 'YES' : 'NO' });
          //  }
        }
        if (count == 5) {
            stepper.next();
        } else {
            this.toastr.error('All the Question are mandatory')
        }

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
            'user_id': '0',
            'role_id': '4',
            'pos_status': '0',
            'platform': 'web',
            'proposal_id': sessionStorage.pa_religare_proposal_id == '' || sessionStorage.pa_religare_proposal_id == undefined ? '' : sessionStorage.pa_religare_proposal_id,
            'enquiry_id': this.getAllPremiumDetails.enquiry_id,
            'group_name': 'Group A',
            'company_name': this.getBuyDetails.company_name,
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
                'classDescription': this.insureoccupationDescription ? this.insured.controls['insuredDescription'].value : this.insured.controls['insuredClassDescriptionCode'].value,
                'lastName':  this.insured.controls['insuredLastname'].value,
                "partyAddressDOList": [{
                    'addressLine1Lang1':  this.insured.controls['insuredAddress'].value,
                    'addressLine2Lang1':  this.insured.controls['insuredAddress2'].value,
                    'addressTypeCd': "PERMANENT",
                    'areaCd':  this.insured.controls['insuredCity'].value,
                    'cityCd': this.insured.controls['insuredCity'].value,
                    'pinCode':  this.insured.controls['insuredPincode'].value,
                    'stateCd':  this.insured.controls['insuredState'].value,
                    'countryCd': 'IND'
                },
                    {
                        'addressLine1Lang1':  this.insured.controls['insuredrAddress'].value,
                        'addressLine2Lang1':  this.insured.controls['insuredrAddress2'].value,
                        'addressTypeCd': 'COMMUNICATION',
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
                    'classDescription': this.insureoccupationDescription ? this.insured.controls['insuredDescription'].value : this.insured.controls['insuredClassDescriptionCode'].value,
                    'lastName':  this.insured.controls['insuredLastname'].value,
                    'height': this.insured.controls['insuredHeight'].value,
                    'weight': this.insured.controls['insuredWeight'].value,
                    "partyAddressDOList": [{
                        'addressLine1Lang1':  this.insured.controls['insuredAddress'].value,
                        'addressLine2Lang1':  this.insured.controls['insuredAddress2'].value,
                        'addressTypeCd': "PERMANENT",
                        'areaCd':  this.insured.controls['insuredCity'].value,
                        'cityCd': this.insured.controls['insuredCity'].value,
                        'pinCode':  this.insured.controls['insuredPincode'].value,
                        'stateCd':  this.insured.controls['insuredState'].value,
                        'countryCd': 'IND'
                    },
                        {
                            'addressLine1Lang1':  this.insured.controls['insuredrAddress'].value,
                            'addressLine2Lang1':  this.insured.controls['insuredrAddress2'].value,
                            'addressTypeCd': 'COMMUNICATION',
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
            this.toastr.success('Proposal created successfully!!');
            this.summaryData = successData.ResponseObject;
            this.religarePAProposal = this.summaryData.proposer_details.proposal_id;
            sessionStorage.pa_religare_proposal_id = this.religarePAProposal;
            // get religare-health-proposal proposer occupation code
            // for( let i=0; i < this.occupationCode.length; i++) {
            //     if(this.summaryData.proposer_details.p_occupation_code == this.occupationCode[i].occupation_code) {
            //         this.summaryData.proposer_details.occupation_description =  this.occupationCode[i].occupation_description;
            //     }
            // }
            // // get reliagre insure occupation code
            // for( let i=0; i < this.occupationCode.length; i++) {
            //     if(this.summaryData.proposer_insurer_details.i_occupation_code == this.occupationCode[i].occupation_code) {
            //         this.summaryData.proposer_insurer_details.occupation_description =  this.occupationCode[i].occupation_description;
            //     }
            // }
            // // occupation class in proposer
            // for( let i=0; i < this.occupationdescriptionList.length; i++) {
            //     if(this.summaryData.proposer_details.p_occupation_class == this.occupationdescriptionList[i].occupation_class) {
            //         this.summaryData.proposer_details.description =  this.occupationdescriptionList[i].description;
            //     }
            // }
            // // occupation class in insured
            // for( let i=0; i < this.occupationdescriptionList.length; i++) {
            //     if(this.summaryData.proposer_insurer_details.i_occupation_class == this.occupationdescriptionList[i].occupation_code) {
            //         this.summaryData.proposer_insurer_details.description =  this.occupationdescriptionList[i].description;
            //     }
            // }
            //

        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }

    public proposalFailure(error) {
        this.settings.loadingSpinner = false;
    }
    }
