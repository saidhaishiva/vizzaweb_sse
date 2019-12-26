import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {AuthService} from '../../shared/services/auth.service';
import {PersonalAccidentService} from '../../shared/services/personal-accident.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatStepper} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {DatePipe} from '@angular/common';
import {AppSettings} from '../../app.settings';
import {Settings} from '../../app.settings.model';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {ValidationService} from '../../shared/services/validation.service';
import {ActivatedRoute, Router} from '@angular/router';
import {element} from 'protractor';

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
    selector: 'app-appollomunichpa',
    templateUrl: './appollo-munich-pa.component.html',
    styleUrls: ['./appollo-munich-pa.component.scss'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ]
})
export class AppollomunichpaComponent implements OnInit {
    public ProposerPa: FormGroup;
    public insured: FormGroup;
    public nomineeDetail: FormGroup;
    public relationshipListPa: any;
    public paIdProofList: any;
    public paMaritalList: any;
    public paStateList: any;
    public settings: Settings;
    public padistrictList: any;
    public paCityList: any;
    public proposerPaData: any;
    public proposal_Id: any;
    public mobileNumber: any;
    public insuredData: any;
    public selectDate: any;
    public setDate: any;
    public setDateAge: any;
    public personalAge: any;
    public lastPage: any;
    public getAllPremiumDetails: any;
    public getBuyDetails: any;
    public preinsure: any;
    public pannumber: boolean;
    public passport: boolean;
    public drivinglicense: boolean;
    public voter: boolean;
    public prevList: boolean;
    public occupationCode: any;
    public appollo1: any;
    public appollo2: any;
    public getpanomineeData: any;
    public summaryData: any;
    public declaration: any;
    public professionList: any;
    public applloPAproposalId: any;
    public webhost: any;
    public paPinList: any;
    public requestDetails: any;
    public idListDetailsProposal: any;
    public todays: any;
    public appolloPA: any;
    public pin: any;
    public insuredPouches: boolean;
    public insuredCheck2: boolean;
    public insuredCheck1: boolean;
    public insuredCheck: boolean;
    public insuredSmoke: boolean;
    public paInsureddistrictList: any;
    public paPinInsuredList: any;
    public paCityInsuredList: any;
    public paPinnomineeList: any;
    public paCityNomineeList: any;
    public paNomineedistrictList: any;
    public insuredate: any;
    public idListDetailsinsured: any;
    public proposerAgeP: any;
    public insuredAgeP: any;
    public insurestardate: any;
    public insureenddate: any;
    public  insurerdateError: any;
    public pannumberP: boolean;
    public voterP: boolean;
    public passportP: boolean;
    public drivinglicenseP: boolean;
    public minDate: any;
    public maxdate: any;
    public pos_status: any;
    public maxStartdate:any;
    public currentStep:any;
    public bmiValue:any;
    public sameRelationship:any;
    public proposerFormData:any;
    public nomineeDataForm:any;
    public sameaddress:boolean;
    public habits: boolean;
    public appolloQuestionsListPa: any;
    public height: any;
    public heighrCal: any;
    public weight:any;
    public BMI: any;
    public proposalId: any;
    public RediretUrlLink: any;
    public occupationClass: any;
    public proposalNum: any;
    public returnURL: any;
    public step: any;
    public nomineesame: any;
    public createdDate: any;
    public stepperindex: any;
    public status: any;
    public proposerRequest: any;
    public proposerRequestAddress: any;
    public insuredRequest: any;
    public nomineeRequest: any;
    public insuredRequestMobile: any;
    public proposerRequestMobile: any;
    public insuredRequestAddress: any;

    CheckHabits : boolean;
    readonlyProposer : boolean;
    occupationClass1 : boolean;
    rider : boolean;
    payLaterr : boolean;

    public appolloPATrue0: boolean;
    public appolloPATrue1: boolean;
    public appolloPATrue2: boolean;
    public appolloPATrue3: boolean;

    constructor(public proposerpa: FormBuilder, public datepipe: DatePipe,public route: ActivatedRoute, public validation: ValidationService,public appSettings: AppSettings, private toastr: ToastrService, public config: ConfigurationService, public authservice: AuthService, public personalservice: PersonalAccidentService,public router: Router,) {
        this.stepperindex = 0;
        this.route.params.forEach((params) => {
            if(params.stepper == true || params.stepper == 'true') {
                this.stepperindex = 3;
                if (sessionStorage.summaryData != '' && sessionStorage.summaryData != undefined) {
                    this.summaryData = JSON.parse(sessionStorage.summaryData);
                    this.RediretUrlLink = this.summaryData.PaymentURL;
                    this.proposalId = this.summaryData.ProposalId;
                    this.nomineeDataForm = JSON.parse(sessionStorage.nomineeDataForm);
                    this.proposerFormData = JSON.parse(sessionStorage.proposerFormData);
                    sessionStorage.appolloPAproposalID = this.proposalId;
                    console.log(this.summaryData ,'this.summaryData ');
                    console.log(sessionStorage.summaryData,'sessionStorage.summaryData ');
                }
            }
            this.status = params.stepper;
            this.proposal_Id = params.proposalId;
            if(this.proposal_Id != '' || this.proposal_Id != undefined ){
                this.payLaterr = true;
                console.log(this.proposal_Id, 'this.proposalId');
                console.log(this.status, 'this.proposalId');
                this.getBackRequest();
            }
            if(this.proposal_Id == undefined || this.proposal_Id == '') {
                this.payLaterr = false;

            }
        });
        this.nomineesame = false;
        this.step = 0;

        this.currentStep = this.stepperindex;
        console.log(this.currentStep,'this.currentStep');

        this.webhost = this.config.getimgUrl();
        const minDate = new Date();
        this.minDate= new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
        this.maxdate = this.minDate;
        this.appolloPA = "0";
        this.mobileNumber = 'true';
        this.idListDetailsinsured = '';
        this.idListDetailsProposal = '';
        this.proposerAgeP = '';
        this.insuredAgeP = '';
        this.maxStartdate = '';
        this.sameaddress = false;
        this.habits = true;
        this.rider = true;
        this.bmiValue = false;

        this.appolloPATrue0 = false;
        this.appolloPATrue1 = true;
        this.appolloPATrue2 = true;
        this.appolloPATrue3 = true;

        this.ProposerPa = this.proposerpa.group({
            proposerPaTitle: ['', Validators.required],
            proposerPaFirstname: ['', Validators.required],
            proposerPaMidname: '',
            proposerPaLastname: ['', Validators.required],
            proposerPaGender: ['', Validators.compose([Validators.required])],
            proposerPaDob: ['', Validators.compose([Validators.required])],
            proposerPaEmail: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
            proposerPaMobile: ['', Validators.compose([Validators.pattern('[6789][0-9]{9}')])],
            maritalStatus: ['', Validators.required],
            proposerParelationship: 'SELF',
            proposerPaIdProof: '',
            proposerPaIdProofIdP: '',
            proposerPaPan: ['', Validators.compose([ Validators.minLength(10)])],
            proposerPaDriving: '',
            proposerPaPassport: '',
            proposerPaVoter: '',
            proposerPaGst: ['', Validators.compose([Validators.minLength(15)])],
            proposerPaAddress: ['', Validators.required],
            proposerPaAddress2: '',
            proposerPaAddress3: '',
            nationality: 'IN',
            proposerPaPincode: ['', Validators.required],
            proposerPaCity: ['', Validators.required],
            proposerPaCountry: 'IN',
            proposerPaState: ['', Validators.required],
            proposerPaDistrict: '',
            proposerPaCityIdP: '',
            proposerPaStateIdP: '',
            proposerPaCountryIdP: '',
            proposerPaDistrictIdP: '',
            rolecd: 'PROPOSER',
            type: ''
        });
        this.insured = this.proposerpa.group({
            insuredPaTitle: ['', Validators.required],
            insuredPaFirstname: ['', Validators.required],
            insuredPaMidname: '',
            insuredPaLastname: ['', Validators.required],
            insuredPaGender: ['', Validators.compose([Validators.required])],
            insuredPaDob: ['', Validators.compose([Validators.required])],
            policyStartDate: '',
            policyEndDate: '',
            insuredPaEmail: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
            insuredPaMobile: ['', Validators.compose([Validators.pattern('[6789][0-9]{9}')])],
            maritalStatus: ['', Validators.required],
            insuredParelationship: '',
            maritalStatusName: '',
            insuredParelationshipName: '',
            insuredPaIdProof: '',
            insuredPaIdProofName: '',
            insuredPaIdProofIdP: '',
            insuredPaPan: ['', Validators.compose([ Validators.minLength(10)])],
            insuredPaDriving: '',
            insuredPaPassport: '',
            insuredPaVoter: '',
            insuredPaGst: ['', Validators.compose([Validators.minLength(15)])],
            insuredPaAddress: ['', Validators.required],
            insuredPaAddress2: '',
            insuredPaAddress3: '',
            nationality: 'IN',
            insuredPaPincode: ['', Validators.required],
            insuredPaCity: ['', Validators.required],
            insuredPaCityName: '',
            insuredPaCountry: 'IN',
            insuredPaState: ['', Validators.required],
            insuredPaDistrict: '',
            insuredPaDistrictName: '',
            insuredPaCityIdP: '',
            insuredPaStateIdP: '',
            insuredPaCountryIdP: '',
            insuredPrevList: '',
            insuredPrevListName: '',
            insuredPrevious:'',
            insureSumInsured:'',
            insuredQualify:'',
            insuredremark:'',
            insuredWaive:'',
            insuredPouches:'',
            insuredSmoke:'',
            insuredCheck:'',
            insuredLiquor:'',
            insuredWine:'',
            insuredBeer:'',
            insuredCheck1:'',
            insuredCheck2:'',
            insuredSmokeList:'',
            insuredPouchesList:'',
            insuredPaDistrictIdP: '',
            insuredOccupationList: ['', Validators.required],
            insuredOccupationListName: '',
            insuredProfessionList:['', Validators.required],
            insuredProfessionListName:'',
            PolicyStartDate:'',
            PolicyEndDate:'',
            MedicalInformations: '',
            insuredPaAge: '',
            insuredAnnual: '',
            previousradio:'2',
            rolecd: 'PROPOSER',
            type: '',
            insuredHeight:'',
            insuredWeight:'',
            ttdrider:false,
            sameAsProposer:false,
            riderList: true
        });
        this.nomineeDetail = this.proposerpa.group({
            paNomineeTitle: ['', Validators.required],
            paNomineeName: ['', Validators.required],
            paRelationship: ['', Validators.required],
            paRelationshipName: '',
            paNomineeAddress: ['', Validators.required],
            paNomineeAddress2:'',
            paNomineeAddress3: '',
            nationality: 'IN',
            paNomineePincode: ['', Validators.required],
            paNomineeCity:'',
            paNomineeCityName:'',
            paNomineeCountry: 'IN',
            paNomineeState: ['', Validators.required],
            paNomineeDistrict: '',
            // paNomineeDistrictName: '',
            paNomineeCityIdP: '',
            paNomineeStateIdP: '',
            paNomineeCountryIdP: '',
            paNomineeDistrictIdP: '',
            sameAsProposer:false

        });

        this.pannumber= false;
        this.passport= false;
        this.voter= false;
        this.drivinglicense= false;
        this.pannumberP= false;
        this.passportP= false;
        this.voterP= false;
        this.drivinglicenseP= false;
        this.settings = this.appSettings.settings;
        this.settings.HomeSidenavUserBlock = false;
        this.settings.sidenavIsOpened = false;
        this.settings.sidenavIsPinned = false;
        this.prevList = false;
        this.CheckHabits = false;
        this.readonlyProposer = false;


    }

    ngOnInit() {
        if (this.payLaterr == true) {
            this.stepperindex = 3;
            console.log(this.payLaterr, 'this.payLaterrolll');
        } else {
            this.relationshipPaProposer();
            this.setOccupationListCode();
            this.setProfessionList();
            this.paIdList();
            this.stateListPa();
            this.paMaritalStatusList();
            this.preInsureList();
            this.getAllPremiumDetails = JSON.parse(sessionStorage.enquiryDetailsPa);
            this.getBuyDetails = JSON.parse(sessionStorage.buyProductsPa);
            this.sessionData();
            this.sameRelationship = 'Self';
            this.questionsList();
        }
    }
    // session Data
    sessionData() {

        if (sessionStorage.appollo2Detail != '' && sessionStorage.appollo2Detail != undefined) {
            this.appollo2 = JSON.parse(sessionStorage.appollo2Detail);
            if (this.appollo2.insuredPaPincode != '') {
                this.getinsuredPostalCode(this.appollo2.insuredPaPincode);
            }

            this.insured = this.proposerpa.group({
                insuredPaTitle: this.appollo2.insuredPaTitle,
                insuredPaFirstname: this.appollo2.insuredPaFirstname,
                insuredPaLastname: this.appollo2.insuredPaLastname,
                insuredPaMidname: this.appollo2.insuredPaMidname,
                insuredPaAge: this.appollo2.insuredPaAge,
                maritalStatus: this.appollo2.maritalStatus,
                maritalStatusName: this.appollo2.maritalStatusName,
                insuredPaDob: new FormControl(new Date(this.appollo2.insuredPaDob)),
                insuredParelationship: this.appollo2.insuredParelationship,
                insuredParelationshipName: this.appollo2.insuredParelationshipName,
                sameAsProposer: this.appollo2.sameAsProposer,
                insuredPaGender: this.appollo2.insuredPaGender,
                insuredPaAddress: this.appollo2.insuredPaAddress,
                insuredPaAddress2: this.appollo2.insuredPaAddress2,
                insuredPaAddress3: this.appollo2.insuredPaAddress3,
                nationality: this.appollo2.nationality,
                insuredPaPincode: this.appollo2.insuredPaPincode,
                insuredPaIdProof: this.appollo2.insuredPaIdProof,
                insuredPaIdProofName: this.appollo2.insuredPaIdProofName,
                insuredAnnual: this.appollo2.insuredAnnual,
                insuredPaIdProofIdP: this.appollo2.insuredPaIdProofIdP,
                insuredPaPan: this.appollo2.insuredPaPan,
                insuredPaPassport: this.appollo2.insuredPaPassport,
                insuredPaVoter: this.appollo2.insuredPaVoter,
                insuredPaGst: this.appollo2.insuredPaGst,
                insuredPaDriving: this.appollo2.insuredPaDriving,
                MedicalInformations: this.appollo2.MedicalInformations,
                insuredPaCity: this.appollo2.insuredPaCity,
                insuredPaCityName: this.appollo2.insuredPaCityName,
                insuredPaState: this.appollo2.insuredPaState,
                insuredPaCountry: this.appollo2.insuredPaCountry,
                insuredPaDistrict: this.appollo2.insuredPaDistrict,
                insuredPaDistrictName: this.appollo2.insuredPaDistrictName,
                insuredPaStateIdP: this.appollo2.insuredPaStateIdP,
                insuredPaCountryIdP: this.appollo2.insuredPaCountryIdP,
                insuredPaCityIdP: this.appollo2.insuredPaCityIdP,
                insuredPaDistrictIdP: this.appollo2.insuredPaDistrictIdP,
                insuredPaEmail: this.appollo2.insuredPaEmail,
                insuredPaMobile: this.appollo2.insuredPaMobile,
                insuredPouchesList: this.appollo2.insuredPouchesList,
                insuredSmokeList: this.appollo2.insuredSmokeList,
                insuredLiquor: this.appollo2.insuredLiquor,
                insuredWine: this.appollo2.insuredWine,
                insuredHeight: this.appollo2.insuredHeight,
                insuredWeight: this.appollo2.insuredWeight,
                insuredPouches: false,
                insuredSmoke: false,
                insuredCheck: false,
                insuredCheck1: false,
                insuredCheck2: false,
                insuredOccupationList: this.appollo2.insuredOccupationList,
                insuredOccupationListName: this.appollo2.insuredOccupationListName,
                insuredProfessionList: this.appollo2.insuredProfessionList,
                insuredProfessionListName: this.appollo2.insuredProfessionListName,
                insuredBeer: this.appollo2.insuredBeer,
                previousradio: this.appollo2.previousradio,
                PolicyStartDate: this.appollo2.PolicyStartDate,
                PolicyEndDate: this.appollo2.PolicyEndDate,
                rolecd: this.appollo2.rolecd,
                insuredPrevList: this.appollo2.insuredPrevList,
                insuredPrevListName: this.appollo2.insuredPrevListName,
                insuredPrevious: this.appollo2.insuredPrevious,
                insureSumInsured: this.appollo2.insureSumInsured,
                insuredQualify: this.appollo2.insuredQualify,
                insuredremark: this.appollo2.insuredremark,
                insuredWaive: this.appollo2.insuredWaive,
                relationshipcd: this.appollo2.relationshipcd,
                ttdrider: this.appollo2.ttdrider,
                riderList: this.appollo2.riderList
            });
            if(this.appollo2.riderList == false){
                this.insured.controls['riderList'].patchValue(false);
            }
            if(this.appollo2.insuredPaIdProof != ''){
                this.panType('insurer');
            }
            this.maxStartdate = this.appollo2.PolicyStartDate;
            this.insureidList();
            if (this.appollo2.insuredSmoke) {
                this.insured.controls['insuredSmoke'].patchValue(this.appollo2.insuredSmoke);
                this.checkHabits(this.appollo2.insuredSmoke, 'smoke');
                this.insured.controls['insuredSmokeList'].patchValue(this.appollo2.insuredSmokeList);
                this.habits = false;
            } else {
                this.insuredSmoke = false;
                this.habits = true;
            }
            if (this.appollo2.insuredPouches) {
                this.insured.controls['insuredPouches'].patchValue(this.appollo2.insuredPouches);
                this.checkHabits(this.appollo2.insuredPouches, 'pouches');
                this.insured.controls['insuredPouchesList'].patchValue(this.appollo2.insuredPouchesList);
                this.habits = false;

            } else {
                this.insuredPouches = false;
                this.habits = true;
                this.insured.controls['insuredPouchesList'].patchValue('');
            }
            if (this.appollo2.insuredCheck) {
                this.insured.controls['insuredLiquor'].patchValue(this.appollo2.insuredLiquor);
                this.checkHabits(this.appollo2.insuredLiquor, 'liquor');
                this.insured.controls['insuredCheck'].patchValue(this.appollo2.insuredCheck);
                this.habits = false;
            } else {
                this.insuredCheck = false;
                this.habits = true;
                this.insured.controls['insuredLiquor'].patchValue('');
            }
            if (this.appollo2.insuredCheck1) {
                this.insured.controls['insuredWine'].patchValue(this.appollo2.insuredWine);
                this.checkHabits(this.appollo2.insuredWine, 'wine');
                this.insured.controls['insuredCheck1'].patchValue(this.appollo2.insuredCheck1);
                this.habits = false;
            } else {
                this.insuredCheck1 = false;
                this.habits = true;
                this.insured.controls['insuredWine'].patchValue('');
            }
            if (this.appollo2.insuredCheck2) {
                this.insured.controls['insuredBeer'].patchValue(this.appollo2.insuredBeer);
                this.checkHabits(this.appollo2.insuredBeer, 'beer');
                this.insured.controls['insuredCheck2'].patchValue(this.appollo2.insuredCheck2);
                this.insured.controls['insuredBeer'].enable();
                this.habits = false;

            } else {
                this.insuredCheck2 = false;
                this.habits = true;
                this.insured.controls['insuredBeer'].patchValue('');
            }
            if (this.appollo2.previousradio == 1) {
                this.insuredSmoke = true;
                this.insured.controls['PolicyStartDate'].patchValue(this.appollo2.PolicyStartDate);
                this.insured.controls['PolicyEndDate'].patchValue(this.appollo2.PolicyEndDate);
                this.insured.controls['insuredPrevList'].patchValue(this.appollo2.insuredPrevList);
                this.insured.controls['insuredPrevious'].patchValue(this.appollo2.insuredPrevious);
                this.insured.controls['insureSumInsured'].patchValue(this.appollo2.insureSumInsured);
                this.insured.controls['insuredQualify'].patchValue(this.appollo2.insuredQualify);
                this.insured.controls['insuredWaive'].patchValue(this.appollo2.insuredWaive);
                this.insured.controls['insuredremark'].patchValue(this.appollo2.insuredremark);
                this.previousinsureList('');

            } else {
                this.insuredSmoke = false;
                this.insured.controls['PolicyStartDate'].patchValue('');
                this.insured.controls['PolicyEndDate'].patchValue('');
                this.insured.controls['insuredPrevList'].patchValue('');
                this.insured.controls['insuredPrevious'].patchValue('');
                this.insured.controls['insureSumInsured'].patchValue('');
                this.insured.controls['insuredQualify'].patchValue('');
                this.insured.controls['insuredWaive'].patchValue('');
                this.insured.controls['insuredremark'].patchValue('');
            }
        }

        if (sessionStorage.panomineeData != '' && sessionStorage.panomineeData != undefined) {
            this.getpanomineeData = JSON.parse(sessionStorage.panomineeData);
            if (this.getpanomineeData.paNomineePincode != '') {
                this.getnomineePostalCode(this.getpanomineeData.paNomineePincode);
            }
            this.nomineeDetail = this.proposerpa.group({
                paNomineeName: this.getpanomineeData.paNomineeName,
                paRelationship: this.getpanomineeData.paRelationship,
                paRelationshipName: this.getpanomineeData.paRelationshipName,
                paNomineeAddress: this.getpanomineeData.paNomineeAddress,
                paNomineeAddress2: this.getpanomineeData.paNomineeAddress2,
                paNomineeAddress3: this.getpanomineeData.paNomineeAddress3,
                paNomineePincode: this.getpanomineeData.paNomineePincode,
                paNomineeCountry: this.getpanomineeData.paNomineeCountry,
                paNomineeCity: this.getpanomineeData.paNomineeCity,
                paNomineeCityName: this.getpanomineeData.paNomineeCityName,
                paNomineeState: this.getpanomineeData.paNomineeState,
                paNomineeCountryIdP: this.getpanomineeData.paNomineeCountryIdP,
                paNomineeDistrict: this.getpanomineeData.paNomineeDistrict,
                // paNomineeDistrictName: this.getpanomineeData.paNomineeDistrictName,
                paNomineeCityIdP: this.getpanomineeData.paNomineeCityIdP,
                paNomineeStateIdP: this.getpanomineeData.paNomineeStateIdP,
                paNomineeDistrictIdP: this.getpanomineeData.paNomineeDistrictIdP,
                paNomineeTitle: this.getpanomineeData.paNomineeTitle,
                sameAsProposer: this.getpanomineeData.sameAsProposer,
            });
        }
        if (sessionStorage.appolloPAproposalID != '' && sessionStorage.appolloPAproposalID != undefined) {
            this.appolloPA = sessionStorage.appolloPAproposalID;
        }
    }

    canDeactivate() {
        return this.appolloPA;
    }

    changeGender() {
        if (this.ProposerPa.controls['proposerPaTitle'].value == 'MR') {
            this.ProposerPa.controls['proposerPaGender'].patchValue('MALE');
        } else {
            this.ProposerPa.controls['proposerPaGender'].patchValue('FEMALE');
        }
    }

    insurechangeGender() {
        if (this.insured.controls['insuredPaTitle'].value == 'MR') {
            this.insured.controls['insuredPaGender'].patchValue('MALE');
        } else {
            this.insured.controls['insuredPaGender'].patchValue('FEMALE');
        }
    }
    topScroll() {
        document.getElementById('main-content').scrollTop = 0;
    }
    nameValidate(event: any){
        this.validation.nameValidate(event);
    }
    // Dob validation
    dobValidate(event: any){
        this.validation.dobValidate(event);
    }
    heightValidate(event: any){
        this.validation.heightValidate(event);
    }
    // Number validation
    numberValidate(event: any){
        this.validation.numberValidate(event);
    }
    idValidate(event: any){
        this.validation.idValidate(event);
    }
    // space
    space(event: any){
        this.validation.space(event);
    }
    spac(event: any){
        this.validation.spac(event);

    }
    // RelationShip with Proposer
    relationshipPaProposer() {
        const data = {
            'platform': 'web',
            'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
        }
        this.personalservice.appolloRelationshipPa(data).subscribe(
            (successData) => {
                this.appolloRelationshipPaSuccess(successData);
            },
            (error) => {
                this.appolloRelationshipPaFailure(error);
            }
        );
    }

    public appolloRelationshipPaSuccess(successData) {
        this.relationshipListPa = successData.ResponseObject;

    }
    public appolloRelationshipPaFailure(error) {
    }
    // Id proof
    paIdList(){
        const data = {
            'platform': 'web',
            'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
        }
        this.personalservice.paIdProofList(data).subscribe(
            (successData) => {
                this.paIdProofListSuccess(successData);
            },
            (error) => {
                this.paIdProofListFailure(error);
            }
        );
    }

    public paIdProofListSuccess(successData){
        this.paIdProofList = successData.ResponseObject;
    }
    public paIdProofListFailure(error){
    }
    // Marital Status
    paMaritalStatusList(){
        const data = {
            'platform': 'web',
            'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
        }
        this.personalservice.paMaritalStatus(data).subscribe(
            (successData) => {
                this.paMaritalListSuccess(successData);
            },
            (error) => {
                this.paMaritalListFailure(error);
            }
        );
    }

    public paMaritalListSuccess(successData){
        this.paMaritalList = successData.ResponseObject;
    }
    public paMaritalListFailure(error){
    }
    // State List Pa
    stateListPa(){
        const data = {
            'platform': 'web',
            'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
        }
        this.personalservice.stateListPa(data).subscribe(
            (successData) => {
                this.pastateListSuccess(successData);
            },
            (error) => {
                this.pastateListFailure(error);
            }
        );
    }

    public pastateListSuccess(successData){
        this.paStateList = successData.ResponseObject;
    }
    public pastateListFailure(error){
    }


    // District List
    onChangeState(){
        const data = {
            'platform': 'web',
            'state_code':this.ProposerPa.controls['proposerPaStateIdP'].value,
            'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
        }
        this.personalservice.districtPaList(data).subscribe(
            (successData) => {
                this.padistrictPaListSuccess(successData);
            },
            (error) => {
                this.padistrictPaListFailure(error);
            }
        );
    }

    public padistrictPaListSuccess(successData){
        this.padistrictList = successData.ResponseObject;
    }
    public padistrictPaListFailure(error){
    }

    // City List
    onChangecityListPa(){
        const data = {
            'platform': 'web',
            'state_code':this.ProposerPa.controls['proposerPaStateIdP'].value,
            'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
        }
        this.personalservice.cityPaList(data).subscribe(
            (successData) => {
                this.paCityPaListSuccess(successData);
            },
            (error) => {
                this.padistrictPaListFailure(error);
            }
        );
    }

    public paCityPaListSuccess(successData){
        this.paCityList = successData.ResponseObject;

    }
    public paCityPaListFailure(error){
    }
    // insured district list
    onChangeStateInsured(){
        const data = {
            'platform': 'web',
            'state_code':this.insured.controls['insuredPaStateIdP'].value,
            'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
        }
        this.personalservice.districtPaList(data).subscribe(
            (successData) => {
                this.insureddistrictPaListSuccess(successData);
            },
            (error) => {
                this.insureddistrictPaListFailure(error);
            }
        );
    }

    public insureddistrictPaListSuccess(successData){
        this.paInsureddistrictList = successData.ResponseObject;
    }
    public insureddistrictPaListFailure(error){
    }
    // insured City
    onChangecityListInsuredPa(){
        const data = {
            'platform': 'web',
            'state_code':this.insured.controls['insuredPaStateIdP'].value,
            'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
        }
        this.personalservice.cityPaList(data).subscribe(
            (successData) => {
                this.insuredCityPaListSuccess(successData);
            },
            (error) => {
                this.insuredCityPaListFailure(error);
            }
        );
    }

    public insuredCityPaListSuccess(successData){
        this.paCityInsuredList = successData.ResponseObject;

    }
    public insuredCityPaListFailure(error){
    }

    // nominee district list
    onChangeStateNominee(){
        const data = {
            'platform': 'web',
            'state_code':this.nomineeDetail.controls['paNomineeStateIdP'].value,
            'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
        }
        this.personalservice.districtPaList(data).subscribe(
            (successData) => {
                this.nomineedistrictPaListSuccess(successData);
            },
            (error) => {
                this.nomineedistrictPaListFailure(error);
            }
        );
    }

    public nomineedistrictPaListSuccess(successData){
        this.paNomineedistrictList = successData.ResponseObject;
    }
    public nomineedistrictPaListFailure(error){
    }
    // nominee City
    onChangecityListNomineePa(){
        const data = {
            'platform': 'web',
            'state_code':this.nomineeDetail.controls['paNomineeStateIdP'].value,
            'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
        }
        this.personalservice.cityPaList(data).subscribe(
            (successData) => {
                this.nomineeCityPaListSuccess(successData);
            },
            (error) => {
                this.nomineeCityPaListFailure(error);
            }
        );
    }

    public nomineeCityPaListSuccess(successData){
        this.paCityNomineeList = successData.ResponseObject;

    }
    public nomineeCityPaListFailure(error){
    }

    setStep(index) {
        this.step = index;
    }

    nextStep() {
        this.step++;
    }

    prevStep() {
        this.step--;
    }


    backAll(){
        this.topScroll();
        this.prevStep();
    }



    // date input
    addEvent(event, type) {

        if (event.value != null) {
            let selectedDate = '';
            let dob = '';
            if (typeof event.value._i == 'string') {
                const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
                if (pattern.test(event.value._i) && event.value._i.length == 10) {
                    if(type == 'personal'){
                        this.insuredate = '';
                    } else if (type == 'insure') {
                        this.insurerdateError = '';
                    } else {
                        if (type == 'startdate') {
                            this.insurestardate = '';
                        }
                    }
                } else {
                    if(type == 'personal'){
                        this.insuredate = 'Enter Valid Date';
                    } else if (type == 'insure') {
                        this.insurerdateError = 'Enter Valid Date';
                    } else {
                        if (type == 'startdate') {
                            this.insurestardate = 'Enter Valid Date';
                        }
                        if(type == 'enddate'){
                            this.insureenddate = 'Enter Valid Date';

                        }
                    }
                }
                selectedDate = event.value._i;
                dob = this.datepipe.transform(event.value, 'y-MM-dd');

                if (selectedDate.length == 10) {
                    if(type == 'personal'){
                        this.insuredate = '';
                        // this.ProposerPa.controls['proposerPaDob'].patchValue(dob);
                        this.proposerAgeP = this.ageCalculate(dob);
                    }  else if (type == 'insure') {
                        this.insurerdateError = '';
                        // this.insured.controls['insuredPaDob'].patchValue(dob);
                        this.insuredAgeP = this.ageCalculate(dob);
                        this.insured.controls['insuredPaAge'].setValue(this.insuredAgeP);

                    } else {
                        if (type == 'startdate') {
                            this.insurestardate = '';
                            this.maxStartdate = dob;
                            // this.insured.controls['PolicyStartDate'].patchValue(dob);
                        }
                        if(type == 'enddate'){
                            this.insureenddate = '';
                        }
                    }
                }
            } else if (typeof event.value._i == 'object') {
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                if (dob.length == 10) {
                    if(type == 'personal'){
                        this.insuredate = '';
                        // this.ProposerPa.controls['proposerPaDob'].patchValue(dob);
                        this.proposerAgeP = this.ageCalculate(dob);
                    } else if (type == 'insure') {
                        this.insurerdateError = '';
                        // this.insured.controls['insuredPaDob'].patchValue(dob);
                        this.insuredAgeP = this.ageCalculate(dob);
                        this.insured.controls['insuredPaAge'].patchValue(this.insuredAgeP);

                    } else {
                        if (type == 'startdate') {
                            this.maxStartdate = dob;
                            this.insurestardate = '';
                            // this.insured.controls['PolicyStartDate'].patchValue(dob);
                        }
                        if(type == 'enddate'){
                            this.insureenddate = '';

                        }
                        // else if (type == 'startdate') {
                        //
                        // }
                    }
                }
            }
            if(type == 'personal'){
                sessionStorage.proposerAgeP = this.proposerAgeP;
            } else if (type == 'insure') {
                sessionStorage.insuredAgeP = this.insuredAgeP;
            }

        }
    }


    ageCalculate(dob) {
        // let mdate = dob.toString();
        // let yearThen = parseInt(mdate.substring(8, 10), 10);
        // let monthThen = parseInt(mdate.substring(5, 7), 10);
        // let dayThen = parseInt(mdate.substring(0, 4), 10);
        // let todays = new Date();
        // let birthday = new Date(dayThen, monthThen - 1, yearThen);
        // let differenceInMilisecond = todays.valueOf() - birthday.valueOf();
        // let year_age = Math.floor(differenceInMilisecond / 31536000000);
        // return year_age;
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

// Pre Insure List
    preInsureList() {
        const data = {
            'platform': 'web',
            'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
        }
        this.personalservice.preInsure(data).subscribe(
            (successData) => {
                this.preinsureSuccess(successData);
            },
            (error) => {
                this.preinsureFailure(error);
            }
        );
    }

    public preinsureSuccess(successData) {
        this.preinsure = successData.ResponseObject;

    }
    public preinsureFailure(error) {
    }
    // checkbox
    checkHabits(value, type) {
        if (value.checked) {
            this.CheckHabits = true;
            if (type == 'smoke') {
                this.insuredSmoke = true;
                this.habits = false;
                // this.insured.controls['insuredSmokeList'].enable();
            } else if (type == 'pouches') {
                this.insuredPouches = true;
                this.habits = false;

                // this.insured.controls['insuredPouchesList'].enable();
            } else if (type == 'liquor') {
                this.insuredCheck = true;
                this.habits = false;

                // this.insured.controls['insuredLiquor'].enable();
            } else if (type == 'wine') {
                this.insuredCheck1 = true;
                this.habits = false;

                // this.insured.controls['insuredWine'].enable();
            } else if (type == 'beer') {
                this.insuredCheck2 = true;
                this.habits = false;

                // this.insured.controls['insuredBeer'].enable();
            }
        } else {
            this.CheckHabits = true;
            if (type == 'smoke') {
                this.insuredSmoke = false;
                this.habits = true;
                this.insured.controls['insuredSmokeList'].patchValue('');
                // this.insured.controls['insuredSmokeList'].disable();

            } else if (type == 'pouches') {
                this.insuredPouches = false;
                this.habits = true;
                this.insured.controls['insuredPouchesList'].patchValue('');
                // this.insured.controls['insuredPouchesList'].disable();
            } else if (type == 'liquor') {
                this.insuredCheck = false;
                this.habits = true;
                this.insured.controls['insuredLiquor'].patchValue('');
                // this.insured.controls['insuredLiquor'].disable();

            } else if (type == 'wine') {
                this.insuredCheck1 = false;
                this.habits = true;
                this.insured.controls['insuredWine'].patchValue('');
                // this.insured.controls['insuredWine'].disable();

            } else if (type == 'beer') {
                this.insuredCheck2 = false;
                this.habits = true;
                this.insured.controls['insuredBeer'].patchValue('');
                // this.insured.controls['insuredBeer'].disable();

            }

        }
    }
    smokingPersonalhabit(){
        console.log(this.insured.controls['insuredSmokeList'].value);
        if(this.insured.controls['insuredSmokeList'].value >10){
            this.toastr.error('As per your smoking count more than 10 per day unable to purchase the policy in online');
        }
    }
    liquorPegPersonalhabit(){
        if(this.insured.controls['insuredLiquor'].value >9){
            this.toastr.error('As per your LiquorPeg count more than 9 per week unable to purchase the policy in online');
        }
    }
    pouchesPersonalhabit(){
        if(this.insured.controls['insuredPouchesList'].value >7){
            this.toastr.error('As per your Pouches count more than 7 per day unable to purchase the policy in online');
        }
    }
    wineGlassPersonalhabit(){
        if(this.insured.controls['insuredWine'].value >6){
            this.toastr.error('As per your WineGlass count more than 6 per week unable to purchase the policy in online');
        }
    }
    beerBottlePersonalhabit(){
        if(this.insured.controls['insuredBeer'].value >10){
            this.toastr.error('As per your BeerBottle count more than 10 per week unable to purchase the policy in online');
        }
    }
// list id
    idList(){
        if(this.ProposerPa.controls['proposerPaIdProof'].value == 'IDNO2'){
            this.pannumber = true;
            this.voter = false;
            this.passport = false;
            this.drivinglicense= false;
        } else  if(this.ProposerPa.controls['proposerPaIdProof'].value == 'IDNO1'){
            this.passport = true;
            this.pannumber = false;
            this.voter = false;
            this.drivinglicense= false;
        } else if(this.ProposerPa.controls['proposerPaIdProof'].value == 'IDNO4'){
            this.voter = true;
            this.passport = false;
            this.pannumber = false;
            this.drivinglicense= false;

        } else if(this.ProposerPa.controls['proposerPaIdProof'].value == 'IDNO3'){
            this.drivinglicense= true;
            this.voter = false;
            this.passport = false;
            this.pannumber = false;
        }
    }
    insureidList(){
        if(this.insured.controls['insuredPaIdProof'].value == 'IDNO2'){
            this.pannumberP= true;
            this.voterP = false;
            this.passportP = false;
            this.drivinglicenseP= false;
        } else  if(this.insured.controls['insuredPaIdProof'].value == 'IDNO1'){
            this.passportP = true;
            this.pannumberP = false;
            this.voterP = false;
            this.drivinglicenseP= false;
        } else if(this.insured.controls['insuredPaIdProof'].value == 'IDNO4'){
            this.voterP = true;
            this.passportP = false;
            this.pannumberP = false;
            this.drivinglicenseP= false;

        } else if(this.insured.controls['insuredPaIdProof'].value == 'IDNO3'){
            this.drivinglicenseP= true;
            this.voterP = false;
            this.passportP = false;
            this.pannumberP = false;
        }
        else {
            if(this.insured.controls['insuredPaIdProof'].value == 'None' || this.insured.controls['insuredPaIdProof'].value == ''){
                this.drivinglicenseP= false;
                this.voterP = false;
                this.passportP = false;
                this.pannumberP = false;
                this.idListDetailsProposal = '';
                this.ProposerPa.controls['proposerPaPan'].patchValue('');
                this.ProposerPa.controls['proposerPaPassport'].patchValue('');
                this.ProposerPa.controls['proposerPaVoter'].patchValue('');
                this.ProposerPa.controls['proposerPaDriving'].patchValue('');
            }
        }
    }
    panType(type) {
        if (type == 'personal') {
            if(this.ProposerPa.controls['proposerPaIdProof'].value == 'IDNO2') {
                this.idListDetailsProposal = this.ProposerPa.controls['proposerPaPan'].value;
            } else  if(this.ProposerPa.controls['proposerPaIdProof'].value == 'IDNO1') {
                this.idListDetailsProposal = this.ProposerPa.controls['proposerPaPassport'].value;
            } else if(this.ProposerPa.controls['proposerPaIdProof'].value == 'IDNO4'){
                this.idListDetailsProposal = this.ProposerPa.controls['proposerPaVoter'].value;
            } else if(this.ProposerPa.controls['proposerPaIdProof'].value == 'IDNO3') {
                this.idListDetailsProposal = this.ProposerPa.controls['proposerPaDriving'].value;
            }

        } else if (type == 'insurer') {
            if(this.insured.controls['insuredPaIdProof'].value == 'IDNO2') {
                this.idListDetailsinsured = this.insured.controls['insuredPaPan'].value;
            } else  if(this.insured.controls['insuredPaIdProof'].value == 'IDNO1') {
                this.idListDetailsinsured = this.insured.controls['insuredPaPassport'].value;
            } else if(this.insured.controls['insuredPaIdProof'].value == 'IDNO4'){
                this.idListDetailsinsured = this.insured.controls['insuredPaVoter'].value;
            } else if(this.insured.controls['insuredPaIdProof'].value == 'IDNO3') {
                this.idListDetailsinsured = this.insured.controls['insuredPaDriving'].value;
            }

        }

    }

    // previous radio
    previousinsureList(value){

        if(this.insured.controls['previousradio'].value == 1){
            this.prevList = true;
            this.insured.controls['PolicyStartDate'].setValidators([Validators.required]);
            this.insured.controls['PolicyEndDate'].setValidators([Validators.required]);
            this.insured.controls['insuredPrevList'].setValidators([Validators.required]);
            this.insured.controls['insuredPrevious'].setValidators([Validators.required]);
            this.insured.controls['insureSumInsured'].setValidators([Validators.required]);
            this.insured.controls['insuredQualify'].setValidators([Validators.required]);
            this.insured.controls['insuredWaive'].setValidators([Validators.required]);
            this.insured.controls['insuredremark'].setValidators([Validators.required]);

        } else{
            this.prevList = false;
            this.insured.controls['PolicyStartDate'].setValidators(null);
            this.insured.controls['PolicyEndDate'].setValidators(null);
            this.insured.controls['insuredPrevList'].setValidators(null);
            this.insured.controls['insuredPrevious'].setValidators(null);
            this.insured.controls['insureSumInsured'].setValidators(null);
            this.insured.controls['insuredQualify'].setValidators(null);
            this.insured.controls['insuredWaive'].setValidators(null);
            this.insured.controls['insuredremark'].setValidators(null);
            this.insured.controls['PolicyStartDate'].patchValue('');
            this.insured.controls['PolicyEndDate'].patchValue('');
            this.insured.controls['insuredPrevList'].patchValue('');
            this.insured.controls['insuredPrevious'].patchValue('');
            this.insured.controls['insureSumInsured'].patchValue('');
            this.insured.controls['insuredQualify'].patchValue('');
            this.insured.controls['insuredWaive'].patchValue('');
            this.insured.controls['insuredremark'].patchValue('');
        }
    }
    // bmi calculation

// Occupation List

    setOccupationListCode() {
        const data = {
            'platform': 'web',
            'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
        }
        this.personalservice.getAppolloOccupationCodeList(data).subscribe(
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
    // occupationClass
    setOccupationListClass() {
        const data = {
            'platform': 'web',
            'created_by': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
            'code': this.insured.controls['insuredOccupationList'].value
        }
        this.personalservice.getAppolloOccupationClassList(data).subscribe(
            (successData) => {
                this.occupationClassSuccess(successData);
            },
            (error) => {
                this.occupationClassFailure(error);
            }
        );

    }


    public occupationClassSuccess(successData) {
        if (successData.IsSuccess) {
            this.occupationClass = successData.ResponseObject;
            for (let i=0; i < this.occupationClass.length ; i++){
                if(this.occupationClass[i].class == '3'|| this.occupationClass[i].class == '4' || this.occupationClass[i].class == '5'){
                    this.insured.controls['riderList'].patchValue(false);
                    this.insured.controls['ttdrider'].patchValue(false);
                    if(this.occupationClass[i].class == '3' || this.occupationClass[i].class == '5')
                        sessionStorage.appollo2Detail ='';

                } else{
                    this.insured.controls['riderList'].patchValue(true);
                }


                if(this.getBuyDetails.product_code == '21008'){
                    if(this.occupationClass[i].class == '4' || this.occupationClass[i].class == '3' ){
                        this.occupationClass1 = false;
                        this.toastr.error('Sorry!, Your occupation is not allowed');
                    } else {
                        this.occupationClass1 = true;

                    }
                } else if(this.getBuyDetails.product_code == '21007') {
                    if(this.occupationClass[i].class == '4'){
                        this.occupationClass1 = false;
                    } else {
                        this.occupationClass1 = true;

                    }
                }
            }
        } else {
            if (successData.ErrorObject){
                this.occupationClass1 = false;
                console.log(this.occupationClass1,'occupationClass1');
            }
            this.toastr.error(successData.ErrorObject);
        }


    }

    public occupationClassFailure(error) {

    }

    // profession List
    setProfessionList() {
        const data = {
            'platform': 'web',
            'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
        }
        this.personalservice.getProfessionList(data).subscribe(
            (successData) => {
                this.professionListSuccess(successData);
            },
            (error) => {
                this.professionListFailure(error);
            }
        );

    }


    public professionListSuccess(successData) {
        this.professionList = successData.ResponseObject;

    }

    public professionListFailure(error) {
    }
// Pin validate
    getPostalCode(pin) {
        this.pin = pin;
        const data = {
            'platform': 'web',
            'postalcode': this.pin
        };
        if (this.pin.length == 6) {
            this.personalservice.pinPaList(data).subscribe(
                (successData) => {
                    this.pinPaListSuccess(successData);
                },
                (error) => {
                    this.pinPaListFailure(error);
                }
            );
        }
    }
    public pinPaListSuccess(successData){
        if (successData.IsSuccess) {
            this.paPinList = successData.ResponseObject;
            this.ProposerPa.controls['proposerPaState'].patchValue(this.paPinList.state);
            this.ProposerPa.controls['proposerPaStateIdP'].patchValue(this.paPinList.state_code);
            this.onChangeState();
            this.onChangecityListPa();
        } else if (successData.IsSuccess != true){
            this.toastr.error('Invalid Pincode');
            this.ProposerPa.controls['proposerPaState'].patchValue('');
            this.ProposerPa.controls['proposerPaStateIdP'].patchValue('');
            this.ProposerPa.controls['proposerPaDistrict'].patchValue('');
            this.ProposerPa.controls['proposerPaCity'].patchValue('');
        }
    }

    public pinPaListFailure(error){
    }
// insured pin validate
    getinsuredPostalCode(pin) {
        const data = {
            'platform': 'web',
            'postalcode': pin
        };
        if (pin.length == 6) {
            this.personalservice.pinPaList(data).subscribe(
                (successData) => {
                    this.pinPaInsuredListSuccess(successData);
                },
                (error) => {
                    this.pinPaInsuredListFailure(error);
                }
            );
        }
    }
    public pinPaInsuredListSuccess(successData){
        if (successData.IsSuccess) {
            this.paPinInsuredList = successData.ResponseObject;
            this.insured.controls['insuredPaState'].patchValue(this.paPinInsuredList.state);
            this.insured.controls['insuredPaStateIdP'].patchValue(this.paPinInsuredList.state_code);
            this.onChangecityListInsuredPa();
            this.onChangeStateInsured();
        } else if (successData.IsSuccess != true) {
            this.toastr.error('Fill Valid Pincode');
            this.insured.controls['insuredPaState'].patchValue('');
            this.insured.controls['insuredPaStateIdP'].patchValue('');
            this.insured.controls['insuredPaDistrict'].patchValue('');
            this.insured.controls['insuredPaCity'].patchValue('');
        }
    }

    public pinPaInsuredListFailure(error){
    }
    // nomineee pin validate
    getnomineePostalCode(pin) {
        const data = {
            'platform': 'web',
            'postalcode': pin
        };
        if (pin.length == 6) {
            this.personalservice.pinPaList(data).subscribe(
                (successData) => {
                    this.pinPanomineeListSuccess(successData);
                },
                (error) => {
                    this.pinPanomineeListFailure(error);
                }
            );
        }
    }
    public pinPanomineeListSuccess(successData){
        if (successData.IsSuccess) {
            this.paPinnomineeList = successData.ResponseObject;
            this.nomineeDetail.controls['paNomineeState'].patchValue(this.paPinnomineeList.state);
            this.nomineeDetail.controls['paNomineeStateIdP'].patchValue(this.paPinnomineeList.state_code);
            this.onChangeStateNominee();
            this.onChangecityListNomineePa();
        } else if (successData.IsSuccess != true) {
            this.toastr.error('Fill Valid Pincode');
            this.nomineeDetail.controls['paNomineeState'].patchValue('');
            this.nomineeDetail.controls['paNomineeStateIdP'].patchValue('');
            this.nomineeDetail.controls['paNomineeDistrict'].patchValue('');
            this.nomineeDetail.controls['paNomineeCity'].patchValue('');

        }
    }

    public pinPanomineeListFailure(error){
    }

    sameasProposer(){
        if(this.nomineeDetail.controls['sameAsProposer'].value){
            this.sameaddress = true;
            this.readonlyProposer = true;
            this.nomineeDetail.controls['paNomineePincode'].patchValue(this.insured.controls['insuredPaPincode'].value);
            this.getnomineePostalCode(this.nomineeDetail.controls['paNomineePincode'].value);
            this.nomineeDetail.controls['paNomineeAddress'].patchValue(this.insured.controls['insuredPaAddress'].value);
            this.nomineeDetail.controls['paNomineeAddress2'].patchValue(this.insured.controls['insuredPaAddress2'].value);
            this.nomineeDetail.controls['paNomineeAddress3'].patchValue(this.insured.controls['insuredPaAddress3'].value);
            this.nomineeDetail.controls['paNomineeCity'].patchValue(this.insured.controls['insuredPaCity'].value);
            this.nomineeDetail.controls['paNomineeCityName'].patchValue(this.insured.controls['insuredPaCityName'].value);
            // this.nomineeDetail.controls['paNomineeDistrictName'].patchValue(this.insured.controls['insuredPaDistrictName'].value);
            this.nomineeDetail.controls['paNomineeState'].patchValue(this.insured.controls['insuredPaState'].value);
            this.nomineeDetail.controls['paNomineeDistrict'].patchValue(this.insured.controls['insuredPaDistrict'].value);
            this.nomineeDetail.controls['paNomineeStateIdP'].patchValue(this.insured.controls['insuredPaStateIdP'].value);
            this.nomineeDetail.controls['paNomineeCityIdP'].patchValue(this.insured.controls['insuredPaCityIdP'].value);
            this.nomineeDetail.controls['paNomineeDistrictIdP'].patchValue(this.insured.controls['insuredPaDistrictIdP'].value);

        } else {
            this.sameaddress = false;
            this.readonlyProposer = false;
            this.nomineeDetail.controls['paNomineeAddress'].patchValue('');
            this.nomineeDetail.controls['paNomineeAddress2'].patchValue('');
            this.nomineeDetail.controls['paNomineeAddress3'].patchValue('');
            this.nomineeDetail.controls['paNomineePincode'].patchValue('');
            this.nomineeDetail.controls['paNomineeCity'].patchValue('');
            this.nomineeDetail.controls['paNomineeState'].patchValue('');
            this.nomineeDetail.controls['paNomineeDistrict'].patchValue('');
            this.nomineeDetail.controls['paNomineeStateIdP'].patchValue('');
            this.nomineeDetail.controls['paNomineeCityIdP'].patchValue('');
            this.nomineeDetail.controls['paNomineeDistrictIdP'].patchValue('');
            // this.nomineeDetail.controls['paNomineeDistrictName'].patchValue('');

        }
    }
    // sameProposer() {
    //
    //   if (this.insured.controls['sameAsProposer'].value) {
    //       this.readonlyProposer = true;
    //       this.insured.controls['insuredPaPincode'].patchValue(this.ProposerPa.controls['proposerPaPincode'].value);
    //       this.getinsuredPostalCode(this.insured.controls['insuredPaPincode'].value);
    //       this.insured.controls['insuredPaIdProof'].patchValue(this.ProposerPa.controls['proposerPaIdProof'].value);
    //       this.insured.controls['insuredPaIdProofIdP'].patchValue(this.ProposerPa.controls['proposerPaIdProof'].value);
    //       this.insureidList();
    //         this.insured.controls['insuredPaTitle'].patchValue(this.ProposerPa.controls['proposerPaTitle'].value);
    //         this.insured.controls['insuredPaFirstname'].patchValue(this.ProposerPa.controls['proposerPaFirstname'].value);
    //         this.insured.controls['insuredPaMidname'].patchValue(this.ProposerPa.controls['proposerPaMidname'].value);
    //         this.insured.controls['insuredPaLastname'].patchValue(this.ProposerPa.controls['proposerPaLastname'].value);
    //         this.insured.controls['insuredPaDob'].patchValue(this.ProposerPa.controls['proposerPaDob'].value, );
    //         this.insured.controls['insuredParelationship'].patchValue('1');
    //         this.insured.controls['insuredPaGender'].patchValue(this.ProposerPa.controls['proposerPaGender'].value);
    //         this.insured.controls['insuredPaPan'].patchValue(this.ProposerPa.controls['proposerPaPan'].value.toUpperCase());
    //         this.insured.controls['maritalStatus'].patchValue(this.ProposerPa.controls['maritalStatus'].value);
    //         this.insured.controls['insuredPaDriving'].patchValue(this.ProposerPa.controls['proposerPaDriving'].value);
    //         this.insured.controls['insuredPaVoter'].patchValue(this.ProposerPa.controls['proposerPaVoter'].value);
    //         this.insured.controls['insuredPaEmail'].patchValue(this.ProposerPa.controls['proposerPaEmail'].value);
    //         this.insured.controls['insuredPaMobile'].patchValue(this.ProposerPa.controls['proposerPaMobile'].value);
    //         this.insured.controls['insuredPaAddress'].patchValue(this.ProposerPa.controls['proposerPaAddress'].value);
    //         this.insured.controls['insuredPaAddress2'].patchValue(this.ProposerPa.controls['proposerPaAddress2'].value);
    //         this.insured.controls['insuredPaAddress3'].patchValue(this.ProposerPa.controls['proposerPaAddress3'].value);
    //         this.insured.controls['insuredPaCity'].patchValue(this.ProposerPa.controls['proposerPaCity'].value);
    //         this.insured.controls['insuredPaState'].patchValue(this.ProposerPa.controls['proposerPaState'].value);
    //         this.insured.controls['insuredPaDistrict'].patchValue(this.ProposerPa.controls['proposerPaDistrict'].value);
    //       let age = this.ageCalculate(this.datepipe.transform(this.ProposerPa.controls['proposerPaDob'].value, 'y-MM-dd'));
    //       this.insured.controls['insuredPaAge'].patchValue(age);
    //         this.insured.controls['insuredPaGst'].patchValue(this.ProposerPa.controls['proposerPaGst'].value);
    //       this.insured.controls['insuredPaStateIdP'].patchValue(this.ProposerPa.controls['proposerPaStateIdP'].value);
    //       this.insured.controls['insuredPaCityIdP'].patchValue(this.ProposerPa.controls['proposerPaCityIdP'].value);
    //       this.insured.controls['insuredPaIdProofIdP'].patchValue(this.ProposerPa.controls['proposerPaIdProof'].value);
    //
    //
    //     } else {
    //       this.readonlyProposer = false;
    //
    //       this.insured.controls['insuredPaTitle'].patchValue('');
    //         this.insured.controls['insuredPaFirstname'].patchValue('');
    //         this.insured.controls['insuredPaMidname'].patchValue('');
    //         this.insured.controls['insuredPaLastname'].patchValue('');
    //         this.insured.controls['insuredPaDob'].patchValue('');
    //
    //         this.insured.controls['insuredPaIdProof'].patchValue('');
    //         this.insured.controls['insuredPaIdProofIdP'].patchValue('');
    //
    //         this.insured.controls['insuredParelationship'].patchValue('SELF');
    //         this.insured.controls['insuredPaGender'].patchValue('');
    //         this.insured.controls['insuredPaPan'].patchValue('');
    //         this.insured.controls['maritalStatus'].patchValue('');
    //         // this.insured.controls['insuredPassPort'].patchValue('');
    //         this.insured.controls['insuredPaDriving'].patchValue('');
    //         this.insured.controls['insuredPaVoter'].patchValue('');
    //         this.insured.controls['insuredPaEmail'].patchValue('');
    //         this.insured.controls['insuredPaMobile'].patchValue('');
    //         this.insured.controls['insuredPaAddress'].patchValue('');
    //         this.insured.controls['insuredPaAddress2'].patchValue('');
    //         this.insured.controls['insuredPaAddress3'].patchValue('');
    //         this.insured.controls['insuredPaCity'].patchValue('');
    //         this.insured.controls['insuredPaPincode'].patchValue('');
    //         this.insured.controls['insuredPaState'].patchValue('');
    //         this.insured.controls['insuredPaDistrict'].patchValue('');
    //         this.insured.controls['insuredPaGst'].patchValue('');
    //       this.insured.controls['insuredPaAge'].patchValue('');
    //       this.insured.controls['insuredPaStateIdP'].patchValue('');
    //     }
    //
    //
    //
    // }
    // Proposal details first Page
    // proposerDetails(stepper: MatStepper, value) {
    //     this.proposerPaData = value;
    //     sessionStorage.appollo1Details = '';
    //     sessionStorage.appollo1Details = JSON.stringify(value);
    //     console.log(this.proposerPaData,'this.proposerPaData ');
    //     if (this.ProposerPa.valid) {
    //         if (sessionStorage.proposerAgeP >= 18 || sessionStorage.proposerAgeP <  56) {
    //             stepper.next();
    //             this.topScroll();
    //         } else {
    //             this.toastr.error('Proposer age should be greater than 18 and lesser than 56');
    //         }
    //     }
    // }

    // insured Details second page
    InsureDetails(stepper: MatStepper, value) {
        console.log(value, 'kjhgfdgh');
        sessionStorage.appollo2Detail = '';
        sessionStorage.appollo2Detail = JSON.stringify(value);
        console.log(this.insured.valid, 'check');
        console.log(this.occupationClass1,'this.occupationClass');
        if (this.insured.valid) {
            if (sessionStorage.insuredAgeP >= 18 && sessionStorage.insuredAgeP < 45) {
                if(this.occupationClass1 != false) {
                    if (this.insured.controls['insuredProfessionList'].value == 'PROFS5' && this.insured.controls['insuredAnnual'].value <= 200000 && this.getBuyDetails.suminsured_amount == 2500000.00) {
                        this.toastr.error('Sum Insured greater then eligible amount');
                    } else if (this.insured.controls['insuredWine'].value > 0 && this.insured.controls['insuredBeer'].value > 0 && this.insured.controls['insuredLiquor'].value > 0) {
                        this.toastr.error('If you have all the drinking Habits, Sorry you are unable to purchase the policy.');
                    } else if (this.insured.controls['insuredSmokeList'].value > 10) {
                        this.toastr.error('As per your smoking count more than 10 per day unable to purchase the policy ');
                    } else if (this.insured.controls['insuredLiquor'].value > 9) {
                        this.toastr.error('As per your LiquorPeg count more than 9 per week unable to purchase the policy in online');
                    } else if (this.insured.controls['insuredPouchesList'].value > 7) {
                        this.toastr.error('As per your Pouches count more than 7 per day unable to purchase the policy in online');
                    } else if (this.insured.controls['insuredWine'].value > 6) {
                        this.toastr.error('As per your WineGlass count more than 6 per week unable to purchase the policy in online');
                    } else if (this.insured.controls['insuredBeer'].value > 10) {
                        this.toastr.error('As per your BeerBottle count more than 10 per week unable to purchase the policy in online');
                    } else {
                        this.height = this.insured.controls['insuredHeight'].value;
                        this.heighrCal = (this.height / 100) * (this.height / 100);
                        this.weight = this.insured.controls['insuredWeight'].value;
                        this.BMI = this.weight / this.heighrCal;
                        if (this.insured.controls['insuredPaAge'].value > 0 && this.insured.controls['insuredPaAge'].value <= 15) {
                            if (this.BMI >= 12 && this.BMI <= 39) {
                                stepper.next();
                            } else {
                                this.toastr.error('For Age less than 15, BMI range should be greater than 12 and less than 39.');

                            }
                        }
                        if (this.insured.controls['insuredPaAge'].value >= 16) {
                            if (this.BMI >= 18 && this.BMI <= 28.99) {
                                stepper.next();
                            } else {
                                this.toastr.error('For Age above 18, BMI range should be greater than 18 and less than 28. ');
                            }
                        }
                    }
                    this.topScroll();
                    this.nextStep();
                    this.appolloPATrue1 = false;
                } else{
                    if(this.occupationClass1 == false){
                        this.toastr.error('Sorry!, Your occupation is not allowed');
                    }
                }
            } else {
                this.toastr.error('Proposer or Insurer age should be greater than 18 and lesser than 45');
            }

        }
    }
    // nomineee details
    religareNomineeDetails(stepper: MatStepper, value) {
        if (this.nomineeDetail.valid) {
            sessionStorage.panomineeData = '';
            sessionStorage.panomineeData = JSON.stringify(value);
            this.createrPoposal(stepper);
        }

    }
    medicalHistoryDetails(stepper: MatStepper) {

        sessionStorage.apollomedical = '';
        sessionStorage.apollomedical = JSON.stringify(this.appolloQuestionsListPa);

        // let statusChecked = [];
        let medicalStatus = [];
        for (let i = 0; i < this.appolloQuestionsListPa.length; i++) {

            if(this.appolloQuestionsListPa[i].mStatus == 'No'){
                console.log(this.appolloQuestionsListPa[i].mStatus, 'mstatus')
                medicalStatus.push('No');
            } else if(this.appolloQuestionsListPa[i].mStatus == 'Yes') {
                console.log(this.appolloQuestionsListPa[i].mStatus, 'mstatusyes')

                medicalStatus.push('Yes');
            }
        }

        if (medicalStatus.includes('Yes')) {
            // this.toastr.error('This medical questions is unable to proceed');
            this.toastr.error('Since you have selected Pre-Existing Disease. You are not allowed to purchase this policy.');
        } else {
            stepper.next();
            this.nextStep();
            this.topScroll();
            this.appolloPATrue2 = false;

        }

    }

    questionsList() {
        const data = {
            'platform': 'web',
            'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
        }
        this.personalservice.questionList(data).subscribe(
            (successData) => {
                this.appolloQuestionsSuccess(successData);
            },
            (error) => {
                this.appolloQuestionsFailure(error);
            }
        );

    }

    public appolloQuestionsSuccess(successData) {
        this.appolloQuestionsListPa = successData.ResponseObject;
        for (let i = 0; i < this.appolloQuestionsListPa.length; i++) {
            this.appolloQuestionsListPa[i].mStatus = 'No';
            this.appolloQuestionsListPa[i].checked = false;
        }
    }


    public appolloQuestionsFailure(error) {
    }

    questionYes(index, event: any) {
        if (event.checked==true) {
            this.appolloQuestionsListPa[index].mStatus = 'Yes';
        } else {
            this.appolloQuestionsListPa[index].mStatus = 'No';
        }
    }

    // ttd(){
    //   alert();
    //   if(this.insured.controls['ttdrider'].value == true){
    //       this.rider = true;
    //   } else{
    //       this.rider = true;
    //
    //   }
    // }
    // star-health-proposal creation
    createrPoposal(stepper){

        let enq_id = this.getAllPremiumDetails.enquiry_id;
        // if(this.insured.controls['riderList'].value) {
        //     this.insured.controls['ttdrider'].patchValue(false);
        // }
        console.log(this.insured.controls['ttdrider'].value,'jhjgdg');
        const data = {
            "enquiry_id": enq_id.toString(),
            'proposal_id': sessionStorage.appolloPAproposalID == '' || sessionStorage.appolloPAproposalID == undefined ? '' : sessionStorage.appolloPAproposalID,
            'user_id' : this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
            'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
            'product_id': this.getBuyDetails.product_id,
            'plan_name': this.getBuyDetails.product_name,
            'sum_insured_amount': this.getBuyDetails.suminsured_amount,
            "ttdrider": this.insured.controls['ttdrider'].value == true || this.insured.controls['ttdrider'].value == 'true' ? '1' : '0',
            "ProposalCaptureServiceRequest": {
                "Prospect": {
                    "Application": {
                        "NomineeAddress": {
                            "AddressLine1": this.nomineeDetail.controls['paNomineeAddress'].value,
                            "AddressLine2": this.nomineeDetail.controls['paNomineeAddress2'].value,
                            "AddressLine3": this.nomineeDetail.controls['paNomineeAddress3'].value,
                            "CountryCode": "IN",
                            "District": this.nomineeDetail.controls['paNomineeDistrict'].value,
                            "PinCode": this.nomineeDetail.controls['paNomineePincode'].value,
                            "StateCode": this.nomineeDetail.controls['paNomineeStateIdP'].value,
                            "TownCode": this.nomineeDetail.controls['paNomineeCity'].value,
                        },
                        "NomineeName": this.nomineeDetail.controls['paNomineeName'].value,
                        "NomineeTitleCode": this.nomineeDetail.controls['paNomineeTitle'].value,
                        "RelationToNomineeCode": this.nomineeDetail.controls['paRelationship'].value,
                        "Proposer": {
                            "Address": {
                                "Address": {
                                    "AddressLine1": this.insured.controls['insuredPaAddress'].value,
                                    "AddressLine2": this.insured.controls['insuredPaAddress2'].value,
                                    "AddressLine3":this.insured.controls['insuredPaAddress3'].value,
                                    "CountryCode": "IN",
                                    "District":this.insured.controls['insuredPaDistrict'].value,
                                    "PinCode": this.insured.controls['insuredPaPincode'].value,
                                    "StateCode": this.insured.controls['insuredPaStateIdP'].value,
                                    "TownCode": this.insured.controls['insuredPaCity'].value,
                                }
                            },
                            "BirthDate": this.datepipe.transform(this.insured.controls['insuredPaDob'].value, 'y-MM-dd'),
                            "ContactInformation": {
                                "ContactNumber": {
                                    "ContactNumber": {
                                        "Number": this.insured.controls['insuredPaMobile'].value,
                                    }
                                },
                                "Email":this.insured.controls['insuredPaEmail'].value,
                            },
                            "Titlecode": this.insured.controls['insuredPaTitle'].value,
                            "FirstName": this.insured.controls['insuredPaFirstname'].value,
                            "GenderCode": this.insured.controls['insuredPaGender'].value,
                            "GstinNumber": this.insured.controls['insuredPaGst'].value,
                            "IDProofNumber": this.idListDetailsinsured.toUpperCase(),
                            "IDProofTypeCode":this.insured.controls['insuredPaIdProof'].value,
                            "LastName": this.insured.controls['insuredPaLastname'].value,
                            "MaritalStatusCode": this.insured.controls['maritalStatus'].value,
                            "MiddleName": this.insured.controls['insuredPaMidname'].value,
                            "RelationshipCode": '1',
                        }
                    },
                    "Client": {
                        "Address": {
                            "Address": {
                                "AddressLine1":  this.insured.controls['insuredPaAddress'].value,
                                "AddressLine2": this.insured.controls['insuredPaAddress2'].value,
                                "AddressLine3":  this.insured.controls['insuredPaAddress3'].value,
                                "CountryCode": "IN",
                                "District": this.insured.controls['insuredPaDistrict'].value,
                                "PinCode": this.insured.controls['insuredPaPincode'].value,
                                "StateCode": this.insured.controls['insuredPaStateIdP'].value,
                                "TownCode":  this.insured.controls['insuredPaCity'].value,
                            }
                        },
                        "Age":  this.insured.controls['insuredPaAge'].value,
                        "AnnualIncome": this.insured.controls['insuredAnnual'].value,
                        "BirthDate":  this.datepipe.transform(this.insured.controls['insuredPaDob'].value, 'y-MM-dd'),
                        "ClientCode": "PolicyHolder",
                        "ContactInformation": {
                            "ContactNumber": {
                                "ContactNumber": {
                                    "Number": this.insured.controls['insuredPaMobile'].value,
                                }
                            },
                            "Email":this.insured.controls['insuredPaEmail'].value,
                        },
                        "Dependants": "",

                        "FamilySize": "1",
                        "FirstName": this.insured.controls['insuredPaFirstname'].value,
                        "GenderCode": this.insured.controls['insuredPaGender'].value,
                        "GstinNumber": this.insured.controls['insuredPaGst'].value,
                        "Height": this.insured.controls['insuredHeight'].value,
                        "Weight": this.insured.controls['insuredWeight'].value,
                        "IDProofNumber": this.idListDetailsinsured.toUpperCase(),
                        "IDProofTypeCode": this.insured.controls['insuredPaIdProof'].value,
                        "LastName": this.insured.controls['insuredPaLastname'].value,
                        "MaritalStatusCode": this.insured.controls['maritalStatus'].value,
                        "MiddleName": this.insured.controls['insuredPaMidname'].value,
                        "NationalityCode": "IN",
                        "OccuptionCode":this.insured.controls['insuredOccupationList'].value,
                        "PreviousInsurer": {
                            "InceptionDate": this.insured.controls['PolicyStartDate'].value,
                            "EndDate":this.insured.controls['PolicyEndDate'].value,
                            "PreviousInsurerCode":this.insured.controls['insuredPrevList'].value,
                            "PreviousPolicyNumber":this.insured.controls['insuredPrevious'].value,
                            "SumInsured":this.insured.controls['insureSumInsured'].value,
                            "QualifyingAmount":this.insured.controls['insuredQualify'].value,
                            "WaivePeriod": this.insured.controls['insuredWaive'].value,
                            "Remarks": this.insured.controls['insuredremark'].value
                        },
                        "LifeStyleHabits": {
                            "BeerBottle": this.insured.controls['insuredBeer'].value || this.insured.controls['insuredBeer'].value != undefined ? this.insured.controls['insuredBeer'].value: 0 ,
                            "LiquorPeg": this.insured.controls['insuredLiquor'].value ||  this.insured.controls['insuredLiquor'].value != undefined ?  this.insured.controls['insuredLiquor'].value: 0 ,
                            "Pouches":this.insured.controls['insuredPouchesList'].value ||  this.insured.controls['insuredPouchesList'].value != undefined ?  this.insured.controls['insuredPouchesList'].value: 0 ,
                            "Smoking": this.insured.controls['insuredSmokeList'].value ||  this.insured.controls['insuredSmokeList'].value != undefined ?  this.insured.controls['insuredSmokeList'].value: 0 ,
                            "WineGlass": this.insured.controls['insuredWine'].value ||  this.insured.controls['insuredWine'].value != undefined ?  this.insured.controls['insuredWine'].value: 0 ,
                        },
                        "Product": {
                            "Product": {
                                "ClientCode": "PolicyHolder",
                                "ProductCode": this.getBuyDetails.product_code,
                                "SumAssured": this.getBuyDetails.suminsured_amount,
                            }
                        },
                        "ProfessionCode": this.insured.controls['insuredProfessionList'].value,
                        "RelationshipCode":'1',
                        "TitleCode": this.insured.controls['insuredPaTitle'].value,
                    },
                    "MedicalInformations": 'Nil'
                }
            },
        }
        console.log(data,'888888888');
        this.settings.loadingSpinner = true;
        this.personalservice.getPersonalAccidentAppolloProposal(data).subscribe(
            (successData) => {
                this.proposalSuccess(successData, stepper);
            },
            (error) => {
                this.proposalFailure(error);
            }
        );

    }

    public proposalSuccess(successData, stepper) {
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {
            stepper.next();
            this.nextStep();
            this.topScroll();
            this.appolloPATrue3 = false;
            this.toastr.success('Proposal created successfully!!');
            this.summaryData = successData.ResponseObject;
            sessionStorage.summaryData = JSON.stringify(this.summaryData);
            this.RediretUrlLink = this.summaryData.PaymentURL;
            this.proposalNum = this.summaryData.proposalNum;
            this.returnURL = this.summaryData.returnURL;
            this.appolloPA = this.summaryData.ProposalId;
            this.proposerFormData = this.insured.value;
            console.log(this.proposerFormData,'this.proposerFormData');
            this.nomineeDataForm = this.nomineeDetail.value;
            console.log(this.nomineeDataForm,'this.nomineeDataForm');
            sessionStorage.appolloPAproposalID = this.appolloPA ;
            sessionStorage.nomineeDataForm = JSON.stringify(this.nomineeDataForm);
            sessionStorage.proposerFormData = JSON.stringify(this.proposerFormData);
            this.createdDate = new Date();
            this.pos_status = this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4';
        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }

    public proposalFailure(error) {
        this.settings.loadingSpinner = false;
    }
    nomineeCity(){
        this.nomineeDetail.controls['paNomineeCityName'].patchValue(this.paCityNomineeList[this.nomineeDetail.controls['paNomineeCity'].value])
    }
    // nomineeDistrict(){
    //     this.nomineeDetail.controls['paNomineeDistrictName'].patchValue(this.paNomineedistrictList[this.nomineeDetail.controls['paNomineeDistrict'].value])
    // }
    changeRelationship(){
        this.nomineeDetail.controls['paRelationshipName'].patchValue(this.relationshipListPa[this.nomineeDetail.controls['paRelationship'].value]);

    }
    professionListCode() {
        this.insured.controls['insuredProfessionListName'].patchValue(this.professionList[this.insured.controls['insuredProfessionList'].value]);
    }
    occupationListCode() {
        this.insured.controls['insuredOccupationListName'].patchValue(this.occupationCode[this.insured.controls['insuredOccupationList'].value]);

    }
    changeidName(){
        this.insured.controls['insuredPaIdProofName'].patchValue(this.paIdProofList[this.insured.controls['insuredPaIdProof'].value]);

    }
    changeDistrictname(){
        this.insured.controls['insuredPaDistrictName'].patchValue(this.paInsureddistrictList[this.insured.controls['insuredPaDistrict'].value]);

    }
    changeCity() {
        this.insured.controls['insuredPaCityName'].patchValue(this.paCityInsuredList[this.insured.controls['insuredPaCity'].value]);

    }  // l
    changePrevName(){
        this.insured.controls['insuredPrevListName'].patchValue(this.preinsure[this.insured.controls['insuredPrevList'].value]);
    }
    changeMarital(){
        this.insured.controls['maritalStatusName'].patchValue(this.paMaritalList[this.insured.controls['maritalStatus'].value]);

    }
    // validationSpace(event){
    //     let elmt = document.getElementById('noSpaces');
    // console.log(elmt,'elmt');
    //     elmt.addEventListener('keydown', function (event) {
    //         if (event.which === 32  ) {
    //             event.preventDefault();
    //         }
    //     });
    // }

    spacing(event) {
        console.log(event);
        let id = document.getElementById('nospace');
        console.log(id,'id');
        id[0].addEventListener("keypress",checkKeyPress, false);
        function checkKeyPress(event) {
            if (event.code == "Space" && event.target.value.length == 0 && event.keyCode == 32) {
                console.log(event.target.value.keyCode,'prevent');
                event.preventDefault();
            } else {
                console.log('else', 'gdghdg');
            }
        }

    }

// pay Later
    payLater() {
        let enq_id = this.getAllPremiumDetails.enquiry_id;
        const data = {
            "enquiry_id": enq_id.toString(),
            'proposal_id': sessionStorage.appolloPAproposalID == '' || sessionStorage.appolloPAproposalID == undefined ? '' : sessionStorage.appolloPAproposalID,
            'user_id' : this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
            'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
            'product_id': this.getBuyDetails.product_id,
            'plan_name': this.getBuyDetails.product_name,
            'company_logo': this.getBuyDetails.company_logo,
            'Tax': this.summaryData.Tax,
            'FinalPremium': this.summaryData.FinalPremium,
            'BasePremium': this.summaryData.BasePremium,
            'created-date': this.createdDate,
            'RediretUrlLink':this.summaryData.PaymentURL,
            'proposalNum':this.summaryData.proposalNum,
            'returnURL':this.summaryData.returnURL,
            'payment-date': '',
            'sum_insured_amount': this.getBuyDetails.suminsured_amount,
            'insuredOccupationListName': this.insured.controls['insuredOccupationListName'].value,
            'insuredProfessionListName': this.insured.controls['insuredProfessionListName'].value,
            "ttdrider": this.insured.controls['ttdrider'].value == true || this.insured.controls['ttdrider'].value == 'true' ? '1' : '0',
            "ProposalCaptureServiceRequest": {
                "Prospect": {
                    "Application": {
                        "NomineeAddress": {
                            "AddressLine1": this.nomineeDetail.controls['paNomineeAddress'].value,
                            "AddressLine2": this.nomineeDetail.controls['paNomineeAddress2'].value,
                            "AddressLine3": this.nomineeDetail.controls['paNomineeAddress3'].value,
                            "CountryCode": "IN",
                            "District": this.nomineeDetail.controls['paNomineeDistrict'].value,
                            "PinCode": this.nomineeDetail.controls['paNomineePincode'].value,
                            "StateCode": this.nomineeDetail.controls['paNomineeStateIdP'].value,
                            "TownCode": this.nomineeDetail.controls['paNomineeCity'].value,
                            "paNomineeState": this.nomineeDetail.controls['paNomineeState'].value,
                            "paNomineeCityName": this.nomineeDetail.controls['paNomineeCityName'].value,
                            "paNomineeDistrict": this.nomineeDetail.controls['paNomineeDistrict'].value,
                        },
                        "NomineeName": this.nomineeDetail.controls['paNomineeName'].value,
                        "NomineeTitleCode": this.nomineeDetail.controls['paNomineeTitle'].value,
                        "RelationToNomineeCode": this.nomineeDetail.controls['paRelationship'].value,
                        "paRelationshipName": this.nomineeDetail.controls['paRelationshipName'].value,
                        "Proposer": {
                            "Address": {
                                "Address": {
                                    "AddressLine1": this.insured.controls['insuredPaAddress'].value,
                                    "AddressLine2": this.insured.controls['insuredPaAddress2'].value,
                                    "AddressLine3":this.insured.controls['insuredPaAddress3'].value,
                                    "CountryCode": "IN",
                                    "District":this.insured.controls['insuredPaDistrict'].value,
                                    "PinCode": this.insured.controls['insuredPaPincode'].value,
                                    "StateCode": this.insured.controls['insuredPaStateIdP'].value,
                                    "TownCode": this.insured.controls['insuredPaCity'].value,
                                    "insuredPaCityName":  this.insured.controls['insuredPaCityName'].value,
                                    "insuredPaDistrict":  this.insured.controls['insuredPaDistrict'].value,
                                    "insuredPaState":  this.insured.controls['insuredPaState'].value,

                                }
                            },
                            "BirthDate": this.datepipe.transform(this.insured.controls['insuredPaDob'].value, 'y-MM-dd'),
                            "ContactInformation": {
                                "ContactNumber": {
                                    "ContactNumber": {
                                        "Number": this.insured.controls['insuredPaMobile'].value,
                                    }
                                },
                                "Email":this.insured.controls['insuredPaEmail'].value,
                            },
                            "Titlecode": this.insured.controls['insuredPaTitle'].value,
                            "FirstName": this.insured.controls['insuredPaFirstname'].value,
                            "GenderCode": this.insured.controls['insuredPaGender'].value,
                            "GstinNumber": this.insured.controls['insuredPaGst'].value,
                            "IDProofNumber": this.idListDetailsinsured.toUpperCase(),
                            "IDProofTypeCode":this.insured.controls['insuredPaIdProof'].value,
                            "LastName": this.insured.controls['insuredPaLastname'].value,
                            "MaritalStatusCode": this.insured.controls['maritalStatus'].value,
                            "MiddleName": this.insured.controls['insuredPaMidname'].value,
                            "RelationshipCode": '1',
                        }
                    },
                    "Client": {
                        "Address": {
                            "Address": {
                                "AddressLine1":  this.insured.controls['insuredPaAddress'].value,
                                "AddressLine2": this.insured.controls['insuredPaAddress2'].value,
                                "AddressLine3":  this.insured.controls['insuredPaAddress3'].value,
                                "CountryCode": "IN",
                                "District": this.insured.controls['insuredPaDistrict'].value,
                                "PinCode": this.insured.controls['insuredPaPincode'].value,
                                "StateCode": this.insured.controls['insuredPaStateIdP'].value,
                                "TownCode":  this.insured.controls['insuredPaCity'].value,
                                "insuredPaCityName":  this.insured.controls['insuredPaCityName'].value,
                                "insuredPaDistrict":  this.insured.controls['insuredPaDistrict'].value,
                                "insuredPaState":  this.insured.controls['insuredPaState'].value,
                            }
                        },
                        "Age":  this.insured.controls['insuredPaAge'].value,
                        "AnnualIncome": this.insured.controls['insuredAnnual'].value,
                        "BirthDate":  this.datepipe.transform(this.insured.controls['insuredPaDob'].value, 'y-MM-dd'),
                        "ClientCode": "PolicyHolder",
                        "ContactInformation": {
                            "ContactNumber": {
                                "ContactNumber": {
                                    "Number": this.insured.controls['insuredPaMobile'].value,
                                }
                            },
                            "Email":this.insured.controls['insuredPaEmail'].value,
                        },
                        "Dependants": "",

                        "FamilySize": "1",
                        "FirstName": this.insured.controls['insuredPaFirstname'].value,
                        "GenderCode": this.insured.controls['insuredPaGender'].value,
                        "GstinNumber": this.insured.controls['insuredPaGst'].value,
                        "Height": this.insured.controls['insuredHeight'].value,
                        "Weight": this.insured.controls['insuredWeight'].value,
                        "IDProofNumber": this.idListDetailsinsured.toUpperCase(),
                        "IDProofTypeCode": this.insured.controls['insuredPaIdProof'].value,
                        "insuredPaIdProofName": this.insured.controls['insuredPaIdProofName'].value,
                        "LastName": this.insured.controls['insuredPaLastname'].value,
                        "MaritalStatusCode": this.insured.controls['maritalStatus'].value,
                        "MaritalStatusName": this.insured.controls['maritalStatusName'].value,
                        "MiddleName": this.insured.controls['insuredPaMidname'].value,
                        "NationalityCode": "IN",
                        "OccuptionCode":this.insured.controls['insuredOccupationList'].value,
                        "PreviousInsurer": {
                            "InceptionDate": this.insured.controls['PolicyStartDate'].value,
                            "EndDate":this.insured.controls['PolicyEndDate'].value,
                            "PreviousInsurerCode":this.insured.controls['insuredPrevList'].value,
                            "insuredPrevListName":this.insured.controls['insuredPrevListName'].value,
                            "PreviousPolicyNumber":this.insured.controls['insuredPrevious'].value,
                            "SumInsured":this.insured.controls['insureSumInsured'].value,
                            "QualifyingAmount":this.insured.controls['insuredQualify'].value,
                            "WaivePeriod": this.insured.controls['insuredWaive'].value,
                            "Remarks": this.insured.controls['insuredremark'].value
                        },
                        "LifeStyleHabits": {
                            "BeerBottle": this.insured.controls['insuredBeer'].value || this.insured.controls['insuredBeer'].value != undefined ? this.insured.controls['insuredBeer'].value: 0 ,
                            "LiquorPeg": this.insured.controls['insuredLiquor'].value ||  this.insured.controls['insuredLiquor'].value != undefined ?  this.insured.controls['insuredLiquor'].value: 0 ,
                            "Pouches":this.insured.controls['insuredPouchesList'].value ||  this.insured.controls['insuredPouchesList'].value != undefined ?  this.insured.controls['insuredPouchesList'].value: 0 ,
                            "Smoking": this.insured.controls['insuredSmokeList'].value ||  this.insured.controls['insuredSmokeList'].value != undefined ?  this.insured.controls['insuredSmokeList'].value: 0 ,
                            "WineGlass": this.insured.controls['insuredWine'].value ||  this.insured.controls['insuredWine'].value != undefined ?  this.insured.controls['insuredWine'].value: 0 ,
                        },
                        "Product": {
                            "Product": {
                                "ClientCode": "PolicyHolder",
                                "ProductCode": this.getBuyDetails.product_code,
                                "SumAssured": this.getBuyDetails.suminsured_amount,
                            }
                        },
                        "ProfessionCode": this.insured.controls['insuredProfessionList'].value,
                        "RelationshipCode":'1',
                        "TitleCode": this.insured.controls['insuredPaTitle'].value,
                    },
                    "MedicalInformations": 'Nil'
                }
            },
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
            this.RediretUrlLink = this.requestDetails.RediretUrlLink;
            this.proposerRequest = this.requestDetails.ProposalCaptureServiceRequest.Prospect.Application.Proposer;
            this.insuredRequest = this.requestDetails.ProposalCaptureServiceRequest.Prospect.Client;
            this.proposerRequestAddress = this.proposerRequest.Address.Address;
            this.insuredRequestAddress = this.insuredRequest.Address.Address;
            this.nomineeRequest = this.requestDetails.ProposalCaptureServiceRequest.Prospect.Application;
            this.insuredRequestMobile = this.proposerRequest.ContactInformation.Email;
            this.proposerRequestMobile = this.proposerRequest.ContactInformation.ContactNumber.ContactNumber.Number;
            console.log(this.requestDetails, 'requestDetailsrequestDetails');
            console.log(this.insuredRequest.IDProofNumber, 'Titlecode');
            console.log(this.insuredRequest.IDProofTypeCode, 'FirstName');
            console.log(this.insuredRequest.GstinNumber, 'insuredRequestMobile');
            // console.log(this.proposerRequestMobile, 'proposerRequestMobile');
            console.log(this.proposerRequest.insuredPaCityName, 'insuredOccupationListName');
            console.log(this.proposerRequest.insuredPaDistrict, 'insuredProfessionListName');
            this.pos_status = this.requestDetails.role_id;

        } else {
        }
    }
    public getBackResFailure(successData) {
    }
}



