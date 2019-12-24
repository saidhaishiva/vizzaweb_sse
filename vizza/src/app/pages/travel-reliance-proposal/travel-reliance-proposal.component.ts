import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray, FormControl} from '@angular/forms';
import {MatStepper} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DatePipe} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {Settings} from '../../app.settings.model';
import {AppSettings} from '../../app.settings';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {MomentDateAdapter } from '@angular/material-moment-adapter';
import {ValidationService} from '../../shared/services/validation.service';
import {ActivatedRoute} from '@angular/router';
import {HealthService} from '../../shared/services/health.service';
import {AuthService} from '../../shared/services/auth.service';
import {TravelService} from '../../shared/services/travel.service';
import * as moment from 'moment';


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
    selector: 'app-travel-reliance-proposal',
    templateUrl: './travel-reliance-proposal.component.html',
    styleUrls: ['./travel-reliance-proposal.component.scss'],
    providers: [

        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ]
})
export class TravelRelianceProposalComponent implements OnInit {
    public personal: FormGroup;
    public relianceInsuredTravel: FormGroup;
    public riskDetails: FormGroup;
    public settings: Settings;
    public minDate: any;
    public webhost: any;
    public reliance_Travel_proposal_id: any;

    public getTravelPremiumList: any;
    public getEnquiryDetails: any;
    public groupName: any;
    public getFamilyDetails: any;
    public insuredTravelPerson: any;
    public insurePersons: any;
    public items: any;

    public sameField: any;
    public sameValue: any;
    public inputReadonly: any;
    public inputBurglaryReadonly: any;
    public inputSponsorReadonly: any;
    public common: any;
    public proposalPArea: any;
    public proposalRArea: any;
    public proposalBArea: any;
    public proposalCArea: any;
    public proposalDArea: any;
    public getComAddressList: any;
    public getResAddressList: any;
    public getBurglaryAddressList: any;
    public getSponsorAddressList: any;
    public getCompanyAddressList: any;
    public getDoctorAddressList: any;
    public setPincode: any;
    public pin: any;
    public title: any;

    public personalAge: any;
    public dobError: any;
    public agecal: any;
    public getAge: any;
    public getDays: any;
    public arr: any;
    public today: any;
    public maxDate: any;
    public sufferingError: any;


    public insurerData: any;
    public totalInsureDetails: any;
    public totalInsureSpouseDetails: any;
    public totalInsureChildDetails: any;

    public PersonalOccupation: any;
    public Relationship: any;
    public Nationality: any;
    public Marital: any;
    public VisitingCountry: any;
    public PreExistingIllness: any;
    public SportsActivities: any;
    public CoverType: any;

    public overseas :any;
    public riskIsResidingInIndiaTrue :any;
    public riskSportsActivitiesTrue :any;
    public VisitingListTure :any;
    public riskCoverageTypeTrue :any;
    public riskMaxDaysPerTripTrue :any;
    public riskNoOfYearsTrue :any;
    public riskSeniorCitizenTrue :any;
    public TravelCoverageTrue :any;
    public TravelStandardLimitTrue :any;
    public TravelSilverPlanTrue :any;
    public TravelGoldPlanTrue :any;
    public TravelPlatinumPlanTrue :any;
    public TravelBasicPlanTrue :any;
    public TravelElitePlanTrue :any;
    public TravelPlusPlanTrue :any;

    public getStepper1: any;
    public getStepper2: any;
    public getStepper3: any;
    public sessionStepper3: any;
    public lastStepper: any;
    public personalData :any;
    public RiskData :any;

    public summaryData :any;
    public rediretUrlLink :any;

    public response :any;
    public userTypes :any;

    public proposerFormData: any;
    public insuredFormData: any;
    public riskFormData: any;
    public step: any;
    public seniorCitizenPlans: any;
    public allPreExistingDiseases: any;
    public currentStep: any;
    public placeOfVisit: any;
    public riskVisitingCountryName: any;
    public travelUserType: boolean;
    public acceptSummaryDeclaration: boolean;
    public duration: any;
    public purposeOfVisit: any;



    constructor(public route: ActivatedRoute, public datepipe: DatePipe, public validation: ValidationService, private toastr: ToastrService, public appSettings: AppSettings, public dialog: MatDialog,
                public config: ConfigurationService, public fb: FormBuilder, public auth: AuthService, public http: HttpClient, public travelservice: TravelService) {
        const minDate = new Date();
        this.minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
        let today = new Date();
        let stepperindex = 0;
        this.route.params.forEach((params) => {
            if(params.stepper == true || params.stepper == 'true') {
                stepperindex = 3;
                if(sessionStorage.summaryData != '' && sessionStorage.summaryData != undefined){
                    this.summaryData = JSON.parse(sessionStorage.summaryData);
                    this.proposerFormData = JSON.parse(sessionStorage.proposerFormData);
                    this.insuredFormData = JSON.parse(sessionStorage.insuredFormData);
                    this.riskFormData = JSON.parse(sessionStorage.riskFormData);
                    this.reliance_Travel_proposal_id = sessionStorage.reliance_Travel_proposal_id;
                }

            }
        });
        this.currentStep = stepperindex;
        console.log(this.currentStep,'hfjhfh');
        this.sameValue = false;
        this.today = new Date(today.getFullYear(), today.getMonth(), today.getDate() +1);
        this.settings = this.appSettings.settings;
        this.settings.HomeSidenavUserBlock = false;
        this.settings.sidenavIsOpened = false;
        this.settings.sidenavIsPinned = false;
        this.acceptSummaryDeclaration = false;
        this.webhost = this.config.getimgUrl();
        this.reliance_Travel_proposal_id = '0';
        this.step = 0;
        if(sessionStorage.travelUserType != '' && sessionStorage.travelUserType != undefined) {
            this.travelUserType = JSON.parse(sessionStorage.travelUserType);
        }
        console.log(this.travelUserType, 'this.travelUserType');

        this.personal = this.fb.group({
            personalTitle: ['', Validators.required],
            personalFirstname: ['', Validators.required],
            personalMidname: '',
            personalLastname: ['', Validators.required],
            personalDob: ['', Validators.compose([Validators.required])],
            personalGender: ['', Validators.compose([Validators.required])],
            maritalStatus: ['', Validators.required],
            maritalName: '',
            occupation: ['', Validators.required],
            occupationName: '',
            personalAadhar: ['', Validators.compose([Validators.minLength(12)])],
            personalPan: ['', Validators.compose([Validators.minLength(10)])],
            personalEmail: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
            personalMobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
            personalPhone: '',
            nationality: ['', Validators.required],
            nationalName: '',
            personalGst: ['', Validators.compose([Validators.minLength(15)])],
            gstin: '',
            relatedParty: '',
            groupCorpID: '',

            personalAddress: ['', Validators.required],
            personalAddress2: ['', Validators.required],
            personalAddress3: '',
            personalPincode: ['', Validators.required],
            personalCity: ['', Validators.required],
            personalArea: ['', Validators.required],
            personalAreaName: '',
            personalDistrict: ['', Validators.required],
            personalyDistrictIdC: '',
            personalState: ['', Validators.required],
            personalNearestLandMark: '',
            personalCountry: ['', Validators.required],

            residenceAddress: ['', Validators.required],
            residenceAddress2: ['', Validators.required],
            residenceAddress3: '',
            residencePincode: ['', Validators.required],
            residenceCity: ['', Validators.required],
            residenceArea: ['', Validators.required],
            residenceAreaName: '',
            residenceDistrict: ['', Validators.required],
            residenceState: ['', Validators.required],
            residenceNearestLandMark: '',
            residenceCountry: ['', Validators.required],

            personalCourseName: '',
            personalTutionFeePerSem: '',
            personalNoOfSems: '',
            personalUniversityName: '',
            personalUniversityEmail: ['', Validators.compose([Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
            personalUniversityMobileNo: ['', Validators.compose([Validators.pattern('[6789][0-9]{9}')])],
            personalUniversityPhoneNo: '',
            personalUniversityFax: '',
            personalUniversityCity: '',
            personalUniversityPincode: '',
            personalUniversityState: '',
            personalUniversityCountry: '',

            personalBurglaryEmail: ['', Validators.compose([ Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
            personalBurglaryMobileNo: ['', Validators.compose([ Validators.pattern('[6789][0-9]{9}')])],
            personalBurglaryPhoneNo: '',
            personalBurglaryFax: '',
            personalBurglaryAddress: '',
            personalBurglaryAddress2: '',
            personalBurglaryAddress3: '',
            personalBurglaryPincode: '',
            personalBurglaryCity: '',
            personalyDistrictIdB: '',
            personalBurglaryArea: '',
            personalBurglaryAreaName: '',
            personalBurglaryDistrict: '',
            personalBurglaryState: '',
            personalBurglaryNearestLandMark: '',
            personalBurglaryCountry: '',
            personalSponsorFullname: '',
            personalSponsorEmail: ['', Validators.compose([Validators.pattern("^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$")])],
            personalSponsorMobileNo: ['', Validators.compose([Validators.pattern('[6789][0-9]{9}')])],

            personalSponsorPhoneNo: '',
            personalSponsorAddress: '',
            personalSponsorPincode: '',
            personalSponsorCity: '',
            personalSponsorState: '',
            personalSponsorCountry: '',

            IsDoctorDetails: 'false',
            personalDoctorFullname: '',
            personalDoctorEmail: ['', Validators.compose([Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
            personalDoctorMobileNo: ['', Validators.compose([Validators.pattern('[6789][0-9]{9}')])],
            personalDoctorPhoneNo: '',
            personalDoctorFax: '',
            personalDoctorAddress: '',
            personalDoctorAddress2: '',
            personalDoctorAddress3: '',
            personalDoctorPincode: '',
            personalDoctorCity: '',
            personalDoctorArea: '',
            personalDoctorAreaName: '',
            personalDoctorDistrict: '',
            personalyDistrictIdD: '',
            personalDoctorState: '',
            personalDoctorNearestLandMark: '',
            personalDoctorCountry: '',


            personalCompanyFullname: '',
            personalCompanyEmail: ['', Validators.compose([Validators.pattern("^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$")])],
            personalCompanyMobileNo: ['', Validators.compose([Validators.pattern('[6789][0-9]{9}')])],
            personalCompanyPhoneNo: '',
            personalCompanyFax: '',
            personalCompanyAddress: '',
            personalCompanyAddress2: '',
            personalCompanyAddress3: '',
            personalCompanyPincode: '',
            personalCompanyCity: '',
            personalCompanyArea: '',
            personalCompanyAreaName: '',
            personalCompanyDistrict: '',
            personalCompanyState: '',
            personalCompanyNearestLandMark: '',
            personalCompanyCountry: '',



            personalCityIdP: '',
            personalStateIdP: '',
            personalDistrictIdP: '',
            personalCityIdR: '',
            personalStateIdR: '',
            residenceDistrictIdR: '',
            personalCityIdB: '',
            personalStateIdB: '',
            residenceDistrictIdB: '',
            personalCityIdS: '',
            personalStateIdS: '',
            personalCityIdD: '',
            personalStateIdD: '',
            residenceDistrictIdD: '',
            personalCityIdC: '',
            personalStateIdC: '',
            residenceDistrictIdC: '',

            startDate: '',
            endDate: '',
            sameas: false,
            sameasBurglary: false,
            sameasSponsor: false,
            rolecd: 'PROPOSER',

        });

        this.riskDetails = this.fb.group({
            riskIndian: '',
            riskIsOverSeasCitizen: '',
            riskIsResidingInIndia: '',
            riskPermanentResidenceCountry: '',
            riskOCINumber: '',
            riskPassportIssuingCountry: '',
            riskIsInsuredOnImmigrantVisa: '',
            riskIsTravelInvolvesSportingActivities: '',
            riskSportsActivities: '',
            riskSportsActivitiesName: '',
            riskIsSufferingFromPEMC: '',
            riskPreExistDisease: '',
            riskPreExistDiseaseValue: '',
            riskPreExistDiseaseName: '',
            riskIsVisitingUSACanada: '',
            riskVisitingCountries: '',
            riskVisitingCountriesName: '',
            riskCoverageType: '',
            riskCoverageTypeName: '',
            riskIsVisitingStudent: '',
            riskMaxDaysPerTrip: '',
            riskNoOfYears: '',
            riskSeniorCitizen: '',
            riskSeniorCitizenPlanID: '',
            TravelStandardLimited: '',
            riskSeniorCitizenPlanIDName: '',
            TravelCoverageName:'',
            TravelCoverageDisplayName: '',
            TravelStandardLimitedPlan: '',
            TravelStandardDeductiblePlan:'',
            TravelIsSilverPlan: '',
            TravelSilverPlan: '',
            TravelIsGoldPlan: '',
            TravelGoldPlan: '',
            TravelIsPlatinumPlan: '',
            TravelPlatinumPlan: '',
            TravelIsBasicPlan: '',
            TravelBasicPlan: '',
            TravelIsElitePlan: '',
            TravelElitePlan: '',
            TravelIsPlusPlan: '',
            riskMaxDaysPerTripFlag: 'No',
            TravelPlusPlan: '',
            riskVisitingCountryName: '',
            TravelCoverageTrue: '',

            // TravelIsAllPlan:'',

            // overseas: this.overseas,
            // riskIsResidingInIndiaTrue: this.riskIsResidingInIndiaTrue,
            // riskSportsActivitiesTrue: this.riskSportsActivitiesTrue,
            // VisitingListTure: this.VisitingListTure,
            // riskCoverageTypeTrue: this.riskCoverageTypeTrue,
            // riskMaxDaysPerTripTrue: this.riskMaxDaysPerTripTrue,
            // riskSeniorCitizenTrue: this.riskSeniorCitizenTrue,
            // TravelCoverageTrue: this.TravelCoverageTrue,
            // TravelStandardLimitTrue: this.TravelStandardLimitTrue,
            // TravelSilverPlanTrue: this.TravelSilverPlanTrue,
            // TravelGoldPlanTrue: this.TravelGoldPlanTrue,
            // TravelPlatinumPlanTrue: this.TravelPlatinumPlanTrue,
            // TravelBasicPlanTrue: this.TravelBasicPlanTrue,
            // TravelElitePlanTrue: this.TravelElitePlanTrue,
            // TravelPlusPlanTrue: this.TravelPlusPlanTrue,

        });
        this.totalInsureSpouseDetails = {
            'FirstName': '',
            'DOB': '',
            'PassportNo': '',
            'RelationshipwithInsuredID': '',
            'NomineeName': '',
            'NomineeRelationshipID': '',
            'IsUnderMedication': 'false',
            'SufferingSince': '',
            'PreExistingMC': ''
        };
        this.totalInsureChildDetails = [];



    }

    ngOnInit() {
        this.PersonalOccupation = [];
        this.relianceOccupation();
        this.relainceRelation();
        this.relainceNationality();
        this.relainceMarital();
        this.relainceVisitingCountries();
        this.relaincePreExistingIllness();
        this.relainceSportsActivities();
        this.relainceCoverType();

        this.getSenorCitPlans();
        this.getRiskPreDiseases();

        this.getTravelPremiumList = JSON.parse(sessionStorage.travelPremiumList);
        this.purposeOfVisit = sessionStorage.travelType;

        let enqList = JSON.parse(sessionStorage.enquiryDetailsTravel);
        this.getEnquiryDetails = enqList[0];
        this.insuredTravelPerson = this.getEnquiryDetails.family_members;
        this.relianceInsuredTravel = this.fb.group({
            items: this.fb.array([])
        });
        for (let i = 0; i < this.insuredTravelPerson.length; i++) {
            this.items = this.relianceInsuredTravel.get('items') as FormArray;
            this.items.push(this.initItemRows());
            this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].type.patchValue(this.insuredTravelPerson[i].type);
        }
        this.userTypes = this.getEnquiryDetails.travel_user_type;

        this.sessionData();

        if(this.travelUserType == true ) {
            this.personal['controls'].occupation.patchValue('36');
            this.relianceInsuredTravel['controls'].items['controls'][0]['controls'].occupation.patchValue('36');
        }
        if(sessionStorage.duration !='' && sessionStorage.duration !=undefined) {
            this.duration = sessionStorage.duration;
        }
        if(this.getTravelPremiumList.product_code == '2837') {
            this.riskDetails['controls'].riskMaxDaysPerTripFlag.patchValue(true);
            this.riskDetails.controls['riskMaxDaysPerTrip'].patchValue(this.duration);
        }
    }

    initItemRows() {
        return this.fb.group(
            {
                rolecd: 'PRIMARY',
                personalTitle: '',
                personalFirstname: '',
                insurespouseFullname: '',
                insurechildFullname: '',
                personalLastname: '',
                personalMidname: '',
                personalGender: '',
                InsDOB: ['', Validators.required],
                occupation: '',
                insureOccupationName: '',
                personalEmail: ['', Validators.compose([Validators.pattern("^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$")])],
                relationship: ['', Validators.required],
                insureRelationshipName: '',
                passport: ['', Validators.compose([Validators.minLength(8)])],
                personalMobile: ['', Validators.compose([Validators.pattern('[6789][0-9]{9}')])],
                personalPhone1: '',
                VisitingCountries: '',
                insureVisitingCountryName: '',
                type:'',

                IsUnderMedication: 'false',
                PreExistingIllness: '',
                insurePreExistingIllnessName: '',
                SufferingSince: '',
                nomineeName: ['', Validators.required],
                nomineeRelationship: ['', Validators.required],
                insureNomineeRelationshipName: '',
                nomineeNameRelation : '',
                // InsuredAge: '',
                ins_age: '',
                ins_days: '',
                insurerDobError: '',
                insurerDobValidError: '',
                sameAsProposer: false,
                sameas: false,
            });
    }

    //Personal Details
    personalDetails(stepper: MatStepper, value) {
        this.personalData = value;
        console.log(this.personalData, 'this.personalData');
        console.log(this.personal.valid, 'this.this.personal.valid');
        sessionStorage.stepper1Details = '';
        sessionStorage.stepper1Details = JSON.stringify(value);
        if (this.personal.valid) {
            if (sessionStorage.personalAge >= 18) {
                let isDoctorValid = true;
                if (this.personal['controls'].IsDoctorDetails.value == 'true') {
                    if (this.personal['controls'].personalDoctorFullname.value == '' || this.personal['controls'].personalDoctorEmail.value == '' || this.personal['controls'].personalDoctorMobileNo.value == '' || this.personal['controls'].personalDoctorAddress.value == '' || this.personal['controls'].personalDoctorAddress2.value == '' || this.personal['controls'].personalDoctorPincode.value == '' || this.personal['controls'].personalDoctorState.value == ''  || this.personal['controls'].personalDoctorDistrict.value == ''  || this.personal['controls'].personalDoctorCity.value == '' || this.personal['controls'].personalDoctorArea.value == '' || this.personal['controls'].personalDoctorCountry.value == '' ) {
                        isDoctorValid = false;
                    } else {
                        isDoctorValid = true;
                    }
                }


                let studentValid = false;
                if (this.personal['controls'].occupation.value == '36') {
                    studentValid = true;
                    if (this.personal['controls'].personalCourseName.value == '' || this.personal['controls'].personalNoOfSems.value == '' || this.personal['controls'].personalUniversityName.value == '' || this.personal['controls'].personalSponsorFullname.value == '' || this.personal['controls'].personalSponsorEmail.value == '' || this.personal['controls'].personalSponsorMobileNo.value == '' || this.personal['controls'].personalSponsorAddress.value == '' || this.personal['controls'].personalSponsorPincode.value == ''  ) {
                        studentValid = false;
                    }
                }
                console.log(isDoctorValid, 'isDoctorValid');
                console.log(studentValid, 'studentValid');

                if(isDoctorValid) {
                    if(this.travelUserType == true ) {
                        if (studentValid == false) {
                            this.toastr.error('Please fill Course, University and Sponsor Details');
                        } else {
                            stepper.next();
                            this.topScroll();
                            this.nextStep();
                        }
                    } else {
                        stepper.next();
                        this.topScroll();
                        this.nextStep();
                    }

                } else {
                    this.toastr.error('Please fill Doctor Details');
                }



            } else {
                this.toastr.error('Proposer age should be 18 or above');
            }
        }
    }
    // Insure Details
    underMedication(i) {
        if (this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].IsUnderMedication.value == 'true') {
           // this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].PreExistingIllness.setValidators([Validators.required]);
        } else {
            // this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].PreExistingIllness.setValidators(null);
        }
    }
    underDoctorDetail(values) {
        // if (values.checked) {
        //     this.personal.controls.personalDoctorFullname.setValidators([Validators.required]);
        //     this.personal.controls.personalDoctorEmail.setValidators([Validators.required]);
        //     this.personal.controls.personalDoctorMobileNo.setValidators([Validators.required]);
        //     this.personal.controls.personalDoctorAddress.setValidators([Validators.required]);
        //     this.personal.controls.personalDoctorAddress2.setValidators([Validators.required]);
        //     this.personal.controls.personalDoctorPincode.setValidators([Validators.required]);
        // } else {
        //     this.personal.controls.personalDoctorFullname.setValidators(null);
        //     this.personal.controls.personalDoctorEmail.setValidators(null);
        //     this.personal.controls.personalDoctorMobileNo.setValidators(null);
        //     this.personal.controls.personalDoctorAddress.setValidators(null);
        //     this.personal.controls.personalDoctorAddress2.setValidators(null);
        //     this.personal.controls.personalDoctorPincode.setValidators(null);
        // }
    }
    relianceInsureDetails(stepper: MatStepper, id, value, key) {
        console.log(value,'value');

        sessionStorage.stepper2Details = '';
        sessionStorage.stepper2Details = JSON.stringify(value);
        if (this.relianceInsuredTravel.valid) {
            this.insurerData = value.items;

            let medicationData = [];
            for (let a = 0; a < this.insurerData.length; a++) {
                if (this.insurerData[a].IsUnderMedication == 'true') {
                    if (this.insurerData[a].IsUnderMedication == '' || this.insurerData[a].SufferingSince == '' || this.insurerData[a].IsUnderMedication == null || this.insurerData[a].SufferingSince == null) {
                        medicationData.push('1');
                    }
                }
            }
            console.log(medicationData, 'medicationData');
            if (medicationData.includes('1')) {
                this.toastr.error('Please fill the medication details');
            } else {

                for (let a = 0; a < this.insurerData.length; a++) {
                if (this.insurerData[a].type == 'Self') {
                    this.totalInsureDetails = {};
                    this.totalInsureDetails = {
                        'RelationshipWithProposerID': this.insurerData[a].relationship,
                        'PassportNumber': this.insurerData[a].passport,
                        'NameofNominee': this.insurerData[a].nomineeName,
                        'RelationshipWithNomineeID': this.insurerData[a].nomineeRelationship,
                        'VisitingCountries': this.insurerData[a].VisitingCountries,
                        'IsUnderMedication': this.insurerData[a].IsUnderMedication.toString(),
                        'PreExistingIllness': this.insurerData[a].PreExistingIllness,
                        'SufferingSince': this.insurerData[a].SufferingSince,
                        'Salutation': this.insurerData[a].personalTitle,
                        'ForeName': this.insurerData[a].personalFirstname,
                        'LastName': this.insurerData[a].personalLastname,
                        'MidName': this.insurerData[a].personalMidname,
                        'Gender': this.insurerData[a].personalGender,
                        'DateofBirth': this.datepipe.transform(this.insurerData[a].InsDOB, 'dd/MM/y'),
                        'OccupationID': this.insurerData[a].occupation,
                        'MobileNo': this.insurerData[a].personalMobile,
                        'PhoneNo': this.insurerData[a].personalPhone1,
                        'Email': this.insurerData[a].personalEmail
                    };
                }
                if (this.insurerData[a].type == 'Spouse') {
                    console.log('inside spouse');
                    this.totalInsureSpouseDetails = {};
                    this.totalInsureSpouseDetails = {
                        'FirstName': this.insurerData[a].insurespouseFullname,
                        'RelationshipwithInsuredID': this.insurerData[a].relationship,
                        'DOB': this.datepipe.transform(this.insurerData[a].InsDOB, 'dd/MM/y'),
                        'PassportNo': this.insurerData[a].passport,
                        'NomineeName': this.insurerData[a].nomineeName,
                        'NomineeRelationshipID': this.insurerData[a].nomineeRelationship,
                        'IsUnderMedication': this.insurerData[a].IsUnderMedication.toString(),
                        'PreExistingMC': this.insurerData[a].PreExistingIllness,
                        'SufferingSince': this.insurerData[a].SufferingSince
                    }
                }
                if (this.insurerData[a].type == 'Child1' || this.insurerData[a].type == 'Child2') {
                   // this.insurerData[a].type == 'Child1' ? this.totalInsureChildDetails = [] : '';
                    this.totalInsureChildDetails.push({
                        'ChildName': this.insurerData[a].insurechildFullname,
                        'ChildRelationID': this.insurerData[a].relationship,
                        'DOB': this.datepipe.transform(this.insurerData[a].InsDOB, 'dd/MM/y'),
                        'PassportNo': this.insurerData[a].passport,
                        'NomineeName': this.insurerData[a].nomineeName,
                        'NomineeRelationshipID': this.insurerData[a].nomineeRelationship,
                        'IsUnderMedication': this.insurerData[a].IsUnderMedication.toString(),
                        'PreExistingMC': this.insurerData[a].PreExistingIllness,
                        'SufferingSince': this.insurerData[a].SufferingSince
                    })
                }
            }
            if(this.totalInsureChildDetails == '') {
                this.totalInsureChildDetails.push({
                    'ChildName': '',
                    'ChildRelationID': '',
                    'DOB': '',
                    'PassportNo': '',
                    'NomineeName': '',
                    'NomineeRelationshipID': '',
                    'IsUnderMedication': 'false',
                    'PreExistingMC': '',
                    'SufferingSince': ''
                });
            }

            //age validation
            let ageValidate = [];
            for (let i = 0; i < this.insurerData.length; i++) {
                if (this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.value != '') {
                    ageValidate.push(1);
                } else {
                    ageValidate.push(0);
                }
            }
            if (!ageValidate.includes(1)) {
                this.riskDetails.controls['riskVisitingCountries'].patchValue(value.items[0].VisitingCountries);
                stepper.next();
                this.topScroll();
                this.nextStep();
            } else {
                this.toastr.error('Sorry, you are not allowed to purchase policy ');

            }
        }
        }
    }


    //reliance Risk Details
    relianceRiskDetails(stepper: MatStepper, value) {
        this.RiskData = value;
        console.log(value, 'valuevalue');
        console.log(this.riskDetails.valid, 'this.riskDetails.valid');
        sessionStorage.stepper3Details = '';
        sessionStorage.stepper3Details = JSON.stringify(value);
        if (this.riskDetails.valid) {

            if ((this.RiskData.riskIndian != '' || this.RiskData.riskIndian == true ) || (this.RiskData.riskIsOverSeasCitizen != '' || this.RiskData.riskIsOverSeasCitizen == true)){

                if(this.RiskData.riskIsInsuredOnImmigrantVisa !='' && this.RiskData.riskIsTravelInvolvesSportingActivities !='' && this.RiskData.riskIsSufferingFromPEMC !='' && this.RiskData.riskPreExistDisease !='' ){
                   let validRiskField = true;
                    if(this.getTravelPremiumList.product_code == '2837') {
                       if(this.RiskData.riskMaxDaysPerTripFlag =='') {
                           validRiskField = false;
                       }
                    } else if(this.travelUserType == true) {
                        if(this.RiskData.riskIsVisitingStudent =='') {
                            validRiskField = false;
                        }
                    }
                    if(validRiskField) {
                        this.proposal(stepper);

                    } else {
                        this.toastr.error('Select all the risk details');
                    }

                } else {
                    this.toastr.error('Select all the risk details');
                }
            } else {
                this.toastr.error('select you are Indian Citizen or Overseas Citizen');
            }
        }
    }

    //Create Proposal

    proposal(stepper) {

        const data = {
            'enquiry_id': this.getEnquiryDetails.enquiry_id,
            "role_id": this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            "user_id": this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            "pos_status": this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
            'product_id': this.getTravelPremiumList.product_id,
            'plan_name': this.getTravelPremiumList.plan_name,
            'purposeOf_visit': this.purposeOfVisit ? this.purposeOfVisit : 'student',

            'sum_insured_amount': this.getTravelPremiumList.sum_insured_amount,
            "proposal_id": sessionStorage.reliance_Travel_proposal_id == '' || sessionStorage.reliance_Travel_proposal_id == undefined ? '' : sessionStorage.reliance_Travel_proposal_id,
            "UserID": '100002',
            "ClientDetails": {
                'ClientType': '0',
                'Salutation': this.personalData.personalTitle,
                'ForeName': this.personalData.personalFirstname,
                'LastName': this.personalData.personalLastname,
                'MidName': this.personalData.personalMidname,
                'DOB': this.datepipe.transform(this.personalData.personalDob, 'dd/MM/y'),
                'Gender': this.personalData.personalGender,
                'OccupationID': this.personalData.occupation,
                'MaritalStatus': this.personalData.maritalStatus,
                'Nationality': this.personalData.nationality,
                'RegisteredUnderGST': this.personalData.personalGst,
                'RelatedParty': this.personalData.relatedParty,
                'GSTIN': this.personalData.gstin,
                'GroupCorpID': this.personalData.groupCorpID,
                'ClientAddress': {
                    'CommunicationAddress': {
                        'Address1': this.personalData.personalAddress,
                        'Address2': this.personalData.personalAddress2,
                        'Address3': this.personalData.personalAddress3,
                        'CityID': this.personalData.personalCityIdP,
                        'DistrictID': this.personalData.personalDistrictIdP,
                        'StateID': this.personalData.personalStateIdP,
                        'AreaID': this.personalData.personalArea,
                        'NearestLandmark': this.personalData.personalNearestLandMark,
                        'Country': this.personalData.personalCountry,
                        'Pincode': this.personalData.personalPincode,
                        'MobileNo': this.personalData.personalMobile,
                        'PhoneNo': this.personalData.personalPhone,
                        'Email': this.personalData.personalEmail,
                        'PanNo': this.personalData.personalPan,
                        'Aadhaar': this.personalData.personalAadhar
                    },
                    'PermanentAddress': {
                        'IsPermanentSameasCommAddr': this.personalData.sameas.toString(),
                        'Address': {
                            'Address1': this.personalData.residenceAddress,
                            'Address2': this.personalData.residenceAddress2,
                            'Address3': this.personalData.residenceAddress3,
                            'CityID': this.personalData.personalCityIdR,
                            'DistrictID': this.personalData.residenceDistrictIdR,
                            'StateID': this.personalData.personalStateIdR,
                            'AreaID': this.personalData.residenceArea,
                            'NearestLandmark': this.personalData.residenceNearestLandMark,
                            'Country': this.personalData.residenceCountry,
                            'Pincode': this.personalData.residencePincode
                        }
                    }
                }
            },
            'InsuredDetail': {
                'RelationshipWithProposerID': this.insurerData[0].relationship,
                'PassportNumber': this.insurerData[0].passport,
                'NameofNominee': this.insurerData[0].nomineeName,
                'RelationshipWithNomineeID': this.insurerData[0].nomineeRelationship,
                'VisitingCountries': this.insurerData[0].VisitingCountries,
                'IsUnderMedication': this.insurerData[0].IsUnderMedication.toString(),
                'PreExistingIllness': this.insurerData[0].PreExistingIllness,
                'SufferingSince': this.insurerData[0].SufferingSince,
                'Salutation': this.insurerData[0].personalTitle,
                'ForeName': this.insurerData[0].personalFirstname,
                'LastName': this.insurerData[0].personalLastname,
                'MidName': this.insurerData[0].personalMidname,
                'Gender': this.insurerData[0].personalGender,
                'DateofBirth': this.datepipe.transform(this.insurerData[0].InsDOB, 'dd/MM/y'),
                'OccupationID': this.insurerData[0].occupation,
                'MobileNo': this.insurerData[0].personalMobile,
                'PhoneNo': this.insurerData[0].personalPhone1,
                'Email': this.insurerData[0].personalEmail
            },
            'SpouseDetails': this.totalInsureSpouseDetails,
            'ChildDetailList': {
                'ChildDetails': this.totalInsureChildDetails
            },
            'UniversityDetails': {
                'UniversityName': this.personalData.personalUniversityName,
                'UniversityCountryId': this.personalData.personalUniversityCountry,
                'UniversityStateName': this.personalData.personalUniversityState,
                'CityName': this.personalData.personalUniversityCity,
                'PhoneNumber': this.personalData.personalUniversityPhoneNo,
                'MobileNumber': this.personalData.personalUniversityMobileNo,
                'EmailId': this.personalData.personalUniversityEmail,
                'Fax': this.personalData.personalUniversityFax
            },
            'CourseDetails': {
                'CourseDuration': this.personalData.personalCourseName == null ? '' : this.personalData.personalCourseName,
                'TutionFeePerSem': this.personalData.personalTutionFeePerSem == null ? '' : this.personalData.personalTutionFeePerSem,
                'NoOfSems': this.personalData.personalNoOfSems == null ? '' : this.personalData.personalNoOfSems
            },
            'HomeBurglaryAddress': {
                'IsSameAsCommAddr': this.personalData.sameasBurglary.toString(),
                'Address': {
                    'Address1': this.personalData.personalBurglaryAddress,
                    'Address2': this.personalData.personalBurglaryAddress2,
                    'Address3': this.personalData.personalBurglaryAddress3,
                    'CityID': this.personalData.personalCityIdB,
                    'DistrictID': this.personalData.residenceDistrictIdB,
                    'StateID': this.personalData.personalStateIdB,
                    'AreaID': this.personalData.personalBurglaryArea,
                    'NearestLandmark': this.personalData.personalBurglaryNearestLandMark,
                    'Country': this.personalData.personalBurglaryCountry,
                    'Pincode': this.personalData.personalBurglaryPincode,
                    'MobileNo': this.personalData.personalBurglaryMobileNo,
                    'PhoneNo': this.personalData.personalBurglaryPhoneNo,
                    'Email': this.personalData.personalBurglaryEmail,
                    'Fax': this.personalData.personalBurglaryFax
                }
            },
            'SponsorDetails': {
                'SponsorName': this.personalData.personalSponsorFullname,
                'IsSponserAddressSameasCommAddress': this.personalData.sameasSponsor.toString(),
                'SponserAddress': {
                    'Address1': this.personalData.personalSponsorAddress,
                    'Pincode': this.personalData.personalSponsorPincode,
                    'MobileNo': this.personalData.personalSponsorMobileNo,
                    'PhoneNo': this.personalData.personalSponsorPhoneNo,
                    'Email': this.personalData.personalSponsorEmail,
                    'CityName': this.personalData.personalSponsorCity,
                    'StateName': this.personalData.personalSponsorState,
                    'CountryID': this.personalData.personalSponsorCountry
                }
            },
            'DoctorDetails': {
                'IsDoctorDetails': this.personalData.IsDoctorDetails.toString(),
                'Name': this.personalData.personalDoctorFullname,
                'Address': {
                    'Address1': this.personalData.personalDoctorAddress,
                    'Address2': this.personalData.personalDoctorAddress2,
                    'Address3': this.personalData.personalDoctorAddress3,
                    'CityID': this.personalData.personalCityIdD,
                    'DistrictID': this.personalData.personalyDistrictIdD,
                    'StateID': this.personalData.personalStateIdD,
                    'AreaID': this.personalData.personalDoctorArea,
                    'NearestLandmark': this.personalData.personalDoctorNearestLandMark,
                    'Country': this.personalData.personalDoctorCountry,
                    'Pincode': this.personalData.personalDoctorPincode,
                    'MobileNo': this.personalData.personalDoctorMobileNo,
                    'PhoneNo': this.personalData.personalDoctorPhoneNo,
                    'Email': this.personalData.personalDoctorEmail,
                    'Fax': this.personalData.personalDoctorFax
                }
            },
            'CompanyDetails': {
                'CompanyName': this.personalData.personalCompanyFullname,
                'Address': {
                    'Address1': this.personalData.personalCompanyAddress,
                    'Address2': this.personalData.personalCompanyAddress2,
                    'Address3': this.personalData.personalCompanyAddress3,
                    'CityID': this.personalData.personalCityIdC,
                    'DistrictID': this.personalData.residenceDistrictIdC,
                    'StateID': this.personalData.personalStateIdC,
                    'AreaID': this.personalData.personalCompanyArea,
                    'NearestLandmark': this.personalData.personalCompanyNearestLandMark,
                    'Country': this.personalData.personalCompanyCountry,
                    'Pincode': this.personalData.personalCompanyPincode,
                    'MobileNo': this.personalData.personalCompanyMobileNo,
                    'PhoneNo': this.personalData.personalCompanyPhoneNo,
                    'Email': this.personalData.personalCompanyEmail,
                    'Fax': this.personalData.personalCompanyFax
                }
            },
            'Policy': {
                'BusinessType': '',
                'AgentCode': '',
                'AgentName': '',
                'Branch_Name': '',
                'Branch_Code': '',
                'ProductCode': this.getTravelPremiumList.product_code,
                'OtherSystemName': ''
            },
            'RiskDetails': {
                'IsIndianCitizen': this.RiskData.riskIndian.toString(),
                'IsOverSeasCitizen': this.RiskData.riskIsOverSeasCitizen.toString(),
                'IsOCI': 'false',
                'IsNONOCI': 'false',
                'IsResidingInIndia': this.RiskData.riskIsResidingInIndia.toString(),
                'PermanentResidenceCountry': this.RiskData.riskPermanentResidenceCountry,
                'OCINumber': this.RiskData.riskOCINumber,
                'PassportIssuingCountry': this.RiskData.riskPassportIssuingCountry,
                'IsInsuredOnImmigrantVisa': this.RiskData.riskIsInsuredOnImmigrantVisa.toString(),
                'IsTravelInvolvesSportingActivities': this.RiskData.riskIsTravelInvolvesSportingActivities.toString(),
                'SportsActivitiesID': this.RiskData.riskSportsActivities,
                'IsSufferingFromPEMC': this.RiskData.riskIsSufferingFromPEMC.toString(),
                'PreExistDiseaseID': this.RiskData.riskPreExistDiseaseValue.toString(),
                'IsVisitingUSACanada': this.getTravelPremiumList.isUSCanada,
                'VisitingCountriesID': this.RiskData.riskVisitingCountries.toString(),
                'JourneyStartDate': this.datepipe.transform(this.getEnquiryDetails.start_date, 'dd/MM/y'),
                'JourneyEndDate': this.datepipe.transform(this.getEnquiryDetails.end_date, 'dd/MM/y'),
                'TravelDays': this.getEnquiryDetails.day_count.toString(),
                'DateOfBirth': this.datepipe.transform(this.personalData.personalDob, 'dd/MM/y'),
                'CoverageTypeID': this.RiskData.riskCoverageType,
                'IsAddOnCover': this.RiskData.riskIsVisitingStudent.toString(),
                'MaxDaysPerTrip': this.RiskData.riskMaxDaysPerTrip?this.RiskData.riskMaxDaysPerTrip:'',
                'NoOfYears': this.RiskData.riskNoOfYears,
                'SeniorCitizenPlanID': this.RiskData.riskSeniorCitizenPlanID,
                'PlanName': this.getTravelPremiumList.plan_code,
                'AddOnBnifitsOpted': this.RiskData.riskSeniorCitizen.toString()
            },
             'LstTravelCoverDetails': {
                'LstTravelCovers': {
                    'CoverageName': '',
                    'CoverageDisplayName': '',
                    'StandardLimit': '',
                    'SilverLimit': '',
                    'GoldLimit': '',
                    'PlatinumLimit': '',
                    'BasicLimit': '',
                    'EliteLimit': '',
                    'PlusLimit': '',
                    'StandardDeductible': '',
                    'SilverDeductible': '',
                    'GoldDeductible': '',
                    'PlatinumDeductible': '',
                    'BasicDeductible': '',
                    'IsStandardPlan': 'false',
                    'IsSilverPlan': 'false',
                    'IsGoldPlan': 'false',
                    'IsPlatinumPlan': 'false',
                    'IsBasicPlan': 'false',
                    'IsElitePlan': 'false',
                    'IsPlusPlan': 'false',
                    'IsChecked': 'false'
                }
                // 'LstTravelCovers': {
                //     'CoverageName': this.RiskData.TravelCoverageName,
                //     'CoverageDisplayName': this.RiskData.TravelCoverageDisplayName,
                //     'StandardLimit': this.RiskData.TravelStandardLimited,
                //     'SilverLimit': this.RiskData.TravelSilverPlan,
                //     'GoldLimit': this.RiskData.TravelGoldPlan,
                //     'PlatinumLimit': this.RiskData.TravelPlatinumPlan,
                //     'BasicLimit': this.RiskData.TravelBasicPlan,
                //     'EliteLimit': this.RiskData.TravelElitePlan,
                //     'PlusLimit': this.RiskData.TravelPlusPlan,
                //     'StandardDeductible': '',
                //     'SilverDeductible': '',
                //     'GoldDeductible': '',
                //     'PlatinumDeductible': '',
                //     'BasicDeductible': this.RiskData.TravelStandardDeductiblePlan.toString(),
                //     'IsStandardPlan': this.RiskData.TravelStandardLimitedPlan.toString(),
                //     'IsSilverPlan': this.RiskData.TravelIsSilverPlan.toString(),
                //     'IsGoldPlan': this.RiskData.TravelIsGoldPlan.toString(),
                //     'IsPlatinumPlan': this.RiskData.TravelIsPlatinumPlan.toString(),
                //     'IsBasicPlan': this.RiskData.TravelIsBasicPlan.toString(),
                //     'IsElitePlan': this.RiskData.TravelIsElitePlan.toString(),
                //     'IsPlusPlan': this.RiskData.TravelIsPlusPlan.toString(),
                //     'IsChecked': 'false'
                // }
            }
        }
        this.settings.loadingSpinner = true;
        this.travelservice.createReliancerelainceTravelProposal(data).subscribe(
            (successData) => {
                this.proposalSuccess(successData, stepper);
            },
            (error) => {
                this.proposalFailure(error);

            }
        );
    }

    public proposalSuccess(successData, stepper){
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess == true) {
            stepper.next();
            this.nextStep();
            this.topScroll();
            this.toastr.success('Proposal created successfully!!');
            this.summaryData = successData.ResponseObject;
            console.log(this.summaryData, 'summaryDatasummaryData');
            sessionStorage.summaryData = JSON.stringify(this.summaryData);
            this.proposerFormData = this.personal.value;
            this.insuredFormData = this.relianceInsuredTravel.value.items;
            console.log(this.insuredFormData , ' this.insuredFormData ');
            this.riskFormData = this.riskDetails.value;
            this.reliance_Travel_proposal_id = this.summaryData.policy_id;
            sessionStorage.reliance_Travel_proposal_id = successData.ResponseObject.policy_id;
            for (let i = 0; i < this.insuredFormData.length; i++) {
                for ( let j = 0; j < this.Relationship.length; j++) {
                    if (this.insuredFormData[i].nomineeRelationship === this.Relationship[j].insured_id ) {
                        this.insuredFormData[i].insureNomineeRelationshipName = this.Relationship[j].relation_name;
                    }
                }
                for ( let j = 0; j < this.Relationship.length; j++) {
                    if (this.insuredFormData[i].relationship === this.Relationship[j].insured_id ) {
                        this.insuredFormData[i].insureRelationshipName = this.Relationship[j].relation_name;
                    }
                }
                let country = [];
                for ( let j = 0; j < this.VisitingCountry.length; j++) {
                    for ( let k = 0; k < this.insuredFormData[i].VisitingCountries.length; k++) {
                        if (this.insuredFormData[i].VisitingCountries[k] === this.VisitingCountry[j].visiting_id) {
                            country.push(this.VisitingCountry[j].visiting_name);
                        }
                    }
                }
                console.log(country, 'country');
                this.insuredFormData[i].insureVisitingCountryName = country;
                for ( let j = 0; j < this.PreExistingIllness.length; j++) {
                    if (this.insuredFormData[i].PreExistingIllness === this.PreExistingIllness[j].disease_id ) {
                        this.insuredFormData[i].insurePreExistingIllnessName = this.PreExistingIllness[j].disease_name;
                    }
                }
            }
            let countryRisk = [];
            for (let j = 0; j < this.VisitingCountry.length; j++) {
                for (let k = 0; k < this.riskFormData.riskVisitingCountries.length; k++) {
                    if (this.riskFormData.riskVisitingCountries[k] == this.VisitingCountry[j].visiting_id) {
                        countryRisk.push(this.VisitingCountry[j].visiting_name);
                    }
                }
            }
            this.riskFormData.riskVisitingCountryName = countryRisk;
            let sportsActivities = [];
            for (let j = 0; j < this.SportsActivities.length; j++) {
                for (let k = 0; k < this.riskFormData.riskSportsActivities.length; k++) {
                    if (this.riskFormData.riskSportsActivities[k] == this.SportsActivities[j].sportsactivity_id) {
                        sportsActivities.push(this.SportsActivities[j].sportsactivity_name);
                    }
                }
            }
            console.log(sportsActivities,'sportsActivities');
            this.riskFormData.riskSportsActivitiesName = sportsActivities;
            let diseases = [];
            for (let j = 0; j < this.allPreExistingDiseases.length; j++) {
                for (let k = 0; k < this.riskFormData.riskPreExistDiseaseValue.length; k++) {
                    if (this.riskFormData.riskPreExistDiseaseValue[k] == this.allPreExistingDiseases[j].disease_id) {
                        diseases.push(this.allPreExistingDiseases[j].disease_name);
                    }
                }
            }
            console.log(diseases,'diseases');
            this.riskFormData.riskPreExistDiseaseName = diseases;

            console.log(this.proposerFormData, 'p');
            console.log(this.insuredFormData, 'i');
            console.log(this.riskFormData, 'n');
            sessionStorage.proposerFormData = JSON.stringify(this.proposerFormData);
            sessionStorage.insuredFormData = JSON.stringify(this.insuredFormData);
            sessionStorage.riskFormData = JSON.stringify(this.riskFormData);
        } else {
            this.toastr.error(successData.ErrorObject);

        }
    }
    public proposalFailure(error){
    }

    topScroll() {
        document.getElementById('main-content').scrollTop = 0;
    }

    changeGender() {
        if (this.personal.controls['personalTitle'].value == 'Mr.') {
            this.personal.controls['personalGender'].patchValue('Male');
        } else {
            this.personal.controls['personalGender'].patchValue('Female');
        }
    }

    insureChangeGender(index) {
        if (this.relianceInsuredTravel['controls'].items['controls'][index]['controls'].personalTitle.value == 'Mr.') {
            this.relianceInsuredTravel['controls'].items['controls'][index]['controls'].personalGender.patchValue('Male');
        } else {
            this.relianceInsuredTravel['controls'].items['controls'][index]['controls'].personalGender.patchValue('Female');
        }
    }

    // charactor validation
    nameValidate(event: any) {
        this.validation.nameValidate(event);

    }

    passportIssueValidation(event: any) {
        this.validation.passportIssue(event);

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
    addEvent(event, type) {
        this.maxDate = '';
        if (event.value != null) {
            let selectedDate = '';
            let dob_days = '';
            this.personalAge = '';
            let dob = '';
            dob_days = this.datepipe.transform(event.value, 'dd-MM-y');
            if (typeof event.value._i == 'string') {
                const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
                if (pattern.test(event.value._i) && event.value._i.length == 10) {
                    if(type == 'sufferingDate'){
                        this.sufferingError = '';
                    } else if (type == 'proposer') {
                        this.dobError = '';
                    } else {
                        this.dobError = '';
                    }
                } else {
                    if(type == 'sufferingDate'){
                        this.sufferingError = 'Enter Valid Date';
                    } else if (type == 'proposer') {
                        this.dobError = 'Enter Valid Date';
                    }else {
                        this.dobError = 'Enter Valid Date';
                    }
                }

                selectedDate = event.value._i;
                console.log(selectedDate, 'selectedDate');
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                if (selectedDate.length == 10) {
                    if (type == 'proposer') {
                        this.personalAge = this.ageCalculate(dob);
                        sessionStorage.personalAge = this.personalAge;
                    } else if (type == 'sDate') {
                        console.log('inst');
                        this.maxDate = event.value;
                    }
                }
            } else if (typeof event.value._i == 'object') {
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                if (dob.length == 10) {
                    if (type == 'proposer') {
                        this.personalAge = this.ageCalculate(dob);
                        sessionStorage.personalAge = this.personalAge;
                    }
                }
                this.dobError = '';
                this.sufferingError = '';
            }
        }
    }

    addEventInsurer(event, i, type) {

        if (event.value != null) {
            let selectedDate = '';
            let dob = '';
            let dob_days = '';
            this.getAge = '';
            this.getDays;
            dob_days = this.datepipe.transform(event.value, 'dd-MM-y');
            if (typeof event.value._i == 'string') {
                const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
                if (pattern.test(event.value._i) && event.value._i.length == 10) {
                    this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
                } else {
                    this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('Enter Valid Date');
                    this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
                }
                selectedDate = event.value._i;
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                if (selectedDate.length == 10) {
                    this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
                    this.getAge = this.ageCalculate(dob);
                    this.getDays = this.ageCalculateInsurer(dob_days);
                } else {
                    this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
                }
            } else if (typeof event.value._i == 'object') {
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');

                if (dob.length == 10) {
                    this.getAge = this.ageCalculate(dob);
                    this.getDays = this.ageCalculateInsurer(dob_days);
                    this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].InsDOB.patchValue(dob);
                } else {
                    this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
                }

            }
            console.log(this.relianceInsuredTravel.value, 'inn');

            if (this.getAge !='' || this.getAge == 0) {
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].ins_age.patchValue(this.getAge);
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.patchValue(this.getDays);
                this.ageValidation(i, type);
            }

        }
        // let length = this.datepipe.transform(this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].InsDOB.value, 'y-MM-dd');
        // let length =  this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].proposerDob.value;

    }


    ageValidation(i, type) {

        console.log(this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value, 'daysss');

        if(this.getTravelPremiumList.product_code == '2817') {
            if(this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value > 180 && this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value  <= 22279 && type == 'Self')  {
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
            } else if(this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value < 180 && type == 'Self')  {
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 6 months to 60 years');
            } else if(this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value > 22279 && type == 'Self')  {
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 6 months to 60 years');
            }
        } else  if(this.getTravelPremiumList.product_code == '2818') {
            if(this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value > 6573 && this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value  <= 22279 && type == 'Self')  {
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
            } else if(this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value < 6574 && type == 'Self')  {
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 18 to 60 years');
            } else if(this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value > 22279 && type == 'Self')  {
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 18 to 60 years');
            }
            if(this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value > 6573 && this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value  <= 22279 && type == 'Spouse')  {
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
            } else if(this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value < 6574 && type == 'Spouse')  {
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 18 to 60 years');
            } else if(this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value > 22279 && type == 'Spouse')  {
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 18 to 60 years');
            }
            if(this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value > 90 && this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value  <= 22279 && type == 'Child1')  {
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
            } else if(this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value < 90 && type == 'Child1')  {
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 6 months to 60 years');
            } else if(this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value > 22279 && type == 'Child1')  {
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 6 months to 60 years');
            }
            if(this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value > 90 && this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value  <= 22279 && type == 'Child2')  {
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
            } else if(this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value < 90 && type == 'Child2')  {
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 6 months to 60 years');
            } else if(this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value > 22279 && type == 'Child2')  {
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 6 months to 60 years');
            }
        } else  if(this.getTravelPremiumList.product_code == '2819') {
            if(this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value > 22279 && this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value  <= 25931 && type == 'Self')  {
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
            } else if(this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value < 22280 && type == 'Self')  {
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 61 to 70 years');
            } else if(this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value > 25931 && type == 'Self')  {
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 61 to 70 years');
            }
        } else  if(this.getTravelPremiumList.product_code == '2813' || this.getTravelPremiumList.product_code == '2816') {
            if(this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value > 25931 && this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value  <= 33236 && type == 'Self')  {
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
            } else if(this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value < 25932 && type == 'Self')  {
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 71 to 90 years');
            } else if(this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value > 33236 && type == 'Self')  {
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 71 to 90 years');
            }
        } else  if(this.getTravelPremiumList.product_code == '2821') {
            if(this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value > 5843 && this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value  <= 13148 && type == 'Self')  {
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
            } else if(this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value < 5844 && type == 'Self')  {
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 16 to 35 years');
            } else if(this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value > 13148 && type == 'Self')  {
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 16 to 35 years');
            }
        }




        // if(this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value < 6574 && type == 'Self') {
        //     this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Self age should be 18 and above');
        // } else if(this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value > 6573 && type == 'Self')  {
        //     this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        // }
        // if(this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value < 6574 && type == 'Spouse') {
        //     this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Spouse age should be 18 and above');
        // } else if(this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value > 6573 && type == 'Spouse')  {
        //     this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        // }

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
        this.agecal = age;
        return age;
    }

    ageCalculateInsurer(getDays) {
        // let mdate = dob.toString();
        // let yearThen = parseInt(mdate.substring(8, 10), 10);
        // let monthThen = parseInt(mdate.substring(5, 7), 10);
        // let dayThen = parseInt(mdate.substring(0, 4), 10);
        // let todays = new Date();
        // let birthday = new Date(dayThen, monthThen - 1, yearThen);
        // let differenceInMilisecond = todays.valueOf() - birthday.valueOf();
        // let Bob_days = Math.ceil(differenceInMilisecond / (1000 * 60 * 60 * 24));
        // return Bob_days;

        let a = moment(getDays, 'DD/MM/YYYY');
        let b = moment(new Date(), 'DD/MM/YYYY');
        let days = b.diff(a, 'days');
        return days;

    }
    typeAddressDeatils() {
        this.personal.controls['personalAreaName'].patchValue(this.proposalPArea[this.personal.controls['personalArea'].value]);
        this.personal.controls['residenceAreaName'].patchValue(this.proposalPArea[this.personal.controls['personalArea'].value]);

        if (this.personal.controls['sameas'].value) {
            this.personal.controls['residenceAddress'].setValue(this.personal.controls['personalAddress'].value);
            this.personal.controls['residenceAddress2'].setValue(this.personal.controls['personalAddress2'].value);
            this.personal.controls['residenceAddress3'].setValue(this.personal.controls['residenceAddress3'].value);
            this.personal.controls['residenceCity'].setValue(this.personal.controls['personalCity'].value);
            this.personal.controls['residencePincode'].setValue(this.personal.controls['personalPincode'].value);
            this.personal.controls['residenceState'].setValue(this.personal.controls['personalState'].value);
            this.personal.controls['residenceDistrict'].setValue(this.personal.controls['personalDistrict'].value);
            this.personal.controls['residenceNearestLandMark'].setValue(this.personal.controls['personalNearestLandMark'].value);
            this.personal.controls['residenceCountry'].setValue(this.personal.controls['personalCountry'].value);
            this.personal.controls['residenceArea'].setValue(this.personal.controls['personalArea'].value);

        } else
        if (this.personal.controls['sameasBurglary'].value) {
            this.personal.controls['personalBurglaryAddress'].setValue(this.personal.controls['personalAddress'].value);
            this.personal.controls['personalBurglaryAddress2'].setValue(this.personal.controls['personalAddress2'].value);
            this.personal.controls['personalBurglaryAddress3'].setValue(this.personal.controls['residenceAddress3'].value);
            this.personal.controls['personalBurglaryCity'].setValue(this.personal.controls['personalCity'].value);
            this.personal.controls['personalBurglaryPincode'].setValue(this.personal.controls['personalPincode'].value);
            this.personal.controls['personalBurglaryState'].setValue(this.personal.controls['personalState'].value);
            this.personal.controls['personalBurglaryDistrict'].setValue(this.personal.controls['personalDistrict'].value);
            this.personal.controls['personalBurglaryNearestLandMark'].setValue(this.personal.controls['personalNearestLandMark'].value);
            this.personal.controls['personalBurglaryCountry'].setValue(this.personal.controls['personalCountry'].value);
            this.personal.controls['personalBurglaryArea'].setValue(this.personal.controls['personalArea'].value);
        } else if (this.personal.controls['sameasSponsor'].value) {
            this.personal.controls['personalSponsorAddress'].setValue(this.personal.controls['personalAddress'].value);
            this.personal.controls['personalSponsorCity'].setValue(this.personal.controls['personalCity'].value);
            this.personal.controls['personalSponsorPincode'].setValue(this.personal.controls['personalPincode'].value);
            this.personal.controls['personalSponsorState'].setValue(this.personal.controls['personalState'].value);
            this.personal.controls['personalSponsorCountry'].setValue(this.personal.controls['personalCountry'].value);
        }

    }
    sameAddress(values: any) {

        if (values.checked) {
            this.proposalRArea = JSON.parse(sessionStorage.proposalPArea);
            sessionStorage.proposalRArea = JSON.stringify(this.proposalRArea);
            this.inputReadonly = true;
            this.personal['controls'].residenceDistrictIdR.patchValue(this.personal.controls['personalDistrictIdP'].value);
            this.personal['controls'].personalCityIdR.patchValue(this.personal.controls['personalCityIdP'].value);
            this.personal['controls'].personalStateIdR.patchValue(this.personal.controls['personalStateIdP'].value);

            this.personal.controls['residenceAddress'].setValue(this.personal.controls['personalAddress'].value);
            this.personal.controls['residenceAddress2'].setValue(this.personal.controls['personalAddress2'].value);
            this.personal.controls['residenceAddress3'].setValue(this.personal.controls['personalAddress3'].value);
            this.personal.controls['residenceCity'].setValue(this.personal.controls['personalCity'].value);
            this.personal.controls['residencePincode'].setValue(this.personal.controls['personalPincode'].value);
            this.personal.controls['residenceState'].setValue(this.personal.controls['personalState'].value);
            this.personal.controls['residenceDistrict'].setValue(this.personal.controls['personalDistrict'].value);
            this.personal.controls['residenceNearestLandMark'].setValue(this.personal.controls['personalNearestLandMark'].value);
            this.personal.controls['residenceCountry'].setValue(this.personal.controls['personalCountry'].value);
            this.personal.controls['residenceArea'].setValue(this.personal.controls['personalArea'].value);
            this.personal.controls['residenceAreaName'].setValue(this.personal.controls['personalAreaName'].value);

        } else {
            this.proposalRArea = '';
            sessionStorage.proposalRArea = {};
            this.inputReadonly = false;
            this.personal.controls['residenceAddress'].setValue('');
            this.personal.controls['residenceAddress2'].setValue('');
            this.personal.controls['residenceAddress3'].setValue('');
            this.personal.controls['residenceCity'].setValue('');
            this.personal.controls['residencePincode'].setValue('');
            this.personal.controls['residenceState'].setValue('');
            this.personal.controls['residenceDistrict'].setValue('');
            this.personal.controls['residenceNearestLandMark'].setValue('');
            this.personal.controls['residenceCountry'].setValue('');
            this.personal.controls['residenceArea'].setValue('');
        }
    }
    sameBurglaryAddress(values: any) {
        this.sameField = values.checked;

        // if (values.checked) {
        //     this.commonPincode(this.personal.controls['personalBurglaryPincode'].value, 'proposalB');
        //     this.selectBurglaryArea();
        //     this.inputBurglaryReadonly = true;
        //     this.personal.controls['personalStateIdB'].setValue(this.personal.controls['personalStateIdP'].value);
        //     this.personal.controls['residenceDistrictIdB'].setValue(this.personal.controls['personalDistrictIdP'].value);
        //     this.personal.controls['personalCityIdB'].setValue(this.personal.controls['personalCityIdR'].value);
        //
        //     this.personal.controls['personalBurglaryAddress'].setValue(this.personal.controls['personalAddress'].value);
        //     this.personal.controls['personalBurglaryAddress2'].setValue(this.personal.controls['personalAddress2'].value);
        //     this.personal.controls['personalBurglaryAddress3'].setValue(this.personal.controls['personalAddress3'].value);
        //     this.personal.controls['personalBurglaryCity'].setValue(this.personal.controls['personalCity'].value);
        //     this.personal.controls['personalBurglaryPincode'].setValue(this.personal.controls['personalPincode'].value);
        //     this.personal.controls['personalBurglaryState'].setValue(this.personal.controls['personalState'].value);
        //     this.personal.controls['personalBurglaryDistrict'].setValue(this.personal.controls['personalDistrict'].value);
        //     this.personal.controls['personalBurglaryNearestLandMark'].setValue(this.personal.controls['personalNearestLandMark'].value);
        //     this.personal.controls['personalBurglaryCountry'].setValue(this.personal.controls['personalCountry'].value);
        //     this.personal.controls['personalBurglaryArea'].setValue(this.personal.controls['personalArea'].value);
        //     this.personal.controls['personalBurglaryAreaName'].setValue(this.personal.controls['personalAreaName'].value);
        //     console.log( this.personal.controls['personalBurglaryAreaName'].value,'jhgfjhjfgh');

        if (values.checked) {
            this.proposalBArea = JSON.parse(sessionStorage.proposalPArea);
            sessionStorage.proposalBArea = JSON.stringify(this.proposalBArea);
            this.inputReadonly = true;
            this.personal['controls'].residenceDistrictIdB.patchValue(this.personal.controls['personalDistrictIdP'].value);
            console.log(this.personal['controls'].residenceDistrictIdB.value,'hgdahgdghhsd')
            this.personal['controls'].personalCityIdB.patchValue(this.personal.controls['personalCityIdP'].value);
            this.personal['controls'].personalStateIdB.patchValue(this.personal.controls['personalStateIdP'].value);

            this.personal.controls['personalBurglaryAddress'].setValue(this.personal.controls['personalAddress'].value);
            this.personal.controls['personalBurglaryAddress2'].setValue(this.personal.controls['personalAddress2'].value);
            this.personal.controls['personalBurglaryAddress3'].setValue(this.personal.controls['personalAddress3'].value);
            this.personal.controls['personalBurglaryCity'].setValue(this.personal.controls['personalCity'].value);
            this.personal.controls['personalBurglaryPincode'].setValue(this.personal.controls['personalPincode'].value);
            this.personal.controls['personalBurglaryState'].setValue(this.personal.controls['personalState'].value);
            this.personal.controls['personalBurglaryDistrict'].setValue(this.personal.controls['personalDistrict'].value);
            this.personal.controls['personalBurglaryNearestLandMark'].setValue(this.personal.controls['personalNearestLandMark'].value);
            this.personal.controls['personalBurglaryCountry'].setValue(this.personal.controls['personalCountry'].value);
            this.personal.controls['personalBurglaryArea'].setValue(this.personal.controls['personalArea'].value);
            this.personal.controls['personalBurglaryAreaName'].setValue(this.personal.controls['personalAreaName'].value);

        } else {
            this.inputBurglaryReadonly = false;
            this.personal.controls['personalBurglaryAddress'].setValue('');
            this.personal.controls['personalBurglaryAddress2'].setValue('');
            this.personal.controls['personalBurglaryAddress3'].setValue('');
            this.personal.controls['personalBurglaryCity'].setValue('');
            this.personal.controls['personalBurglaryPincode'].setValue('');
            this.personal.controls['personalBurglaryState'].setValue('');
            this.personal.controls['personalStateIdB'].setValue('');
            this.personal.controls['personalBurglaryDistrict'].setValue('');
            console.log(this.personal.controls['personalBurglaryDistrict'],'eeeeeehghsdhkdnjkn')
            this.personal.controls['personalBurglaryNearestLandMark'].setValue('');
            this.personal.controls['personalBurglaryCountry'].setValue('');
            this.personal.controls['personalBurglaryArea'].setValue('');
            this.personal.controls['personalBurglaryAreaName'].setValue('');
            this.personal.controls['personalStateIdB'].setValue('');
            this.personal.controls['residenceDistrictIdB'].setValue('');
            console.log(this.personal.controls['residenceDistrictIdB'].value,'gdhsghds')
            this.personal.controls['personalCityIdB'].setValue('');


        }
    }
    sameSponsorAddress(values: any) {
        this.sameField = values.checked;
        if (values.checked) {
            this.commonPincode(this.personal.controls['personalSponsorPincode'].value, 'proposalS');
            this.inputSponsorReadonly = true;
            this.personal.controls['personalSponsorAddress'].setValue(this.personal.controls['personalAddress'].value);
            this.personal.controls['personalSponsorCity'].setValue(this.personal.controls['personalCity'].value);
            this.personal.controls['personalSponsorPincode'].setValue(this.personal.controls['personalPincode'].value);
            this.personal.controls['personalSponsorState'].setValue(this.personal.controls['personalState'].value);
            this.personal.controls['personalSponsorCountry'].setValue(this.personal.controls['personalCountry'].value);

        } else {
            this.inputSponsorReadonly = false;
            this.personal.controls['personalSponsorAddress'].setValue('');
            this.personal.controls['personalSponsorCity'].setValue('');
            this.personal.controls['personalSponsorPincode'].setValue('');
            this.personal.controls['personalSponsorState'].setValue('');
            this.personal.controls['personalSponsorCountry'].setValue('');
        }
    }


    sameProposer(value: any) {
        if (value.checked) {
            this.sameValue = true;
            this.relianceInsuredTravel['controls'].items['controls'][0]['controls'].personalTitle.patchValue(this.personal.controls['personalTitle'].value);
            this.relianceInsuredTravel['controls'].items['controls'][0]['controls'].personalFirstname.patchValue(this.personal.controls['personalFirstname'].value);
            this.relianceInsuredTravel['controls'].items['controls'][0]['controls'].personalMidname.patchValue(this.personal.controls['personalMidname'].value);
            this.relianceInsuredTravel['controls'].items['controls'][0]['controls'].personalLastname.patchValue(this.personal.controls['personalLastname'].value);
            this.relianceInsuredTravel['controls'].items['controls'][0]['controls'].personalEmail.patchValue(this.personal.controls['personalEmail'].value);
            this.relianceInsuredTravel['controls'].items['controls'][0]['controls'].occupation.patchValue(this.personal.controls['occupation'].value);
            this.relianceInsuredTravel['controls'].items['controls'][0]['controls'].personalGender.patchValue(this.personal.controls['personalGender'].value);
            this.relianceInsuredTravel['controls'].items['controls'][0]['controls'].personalMobile.patchValue(this.personal.controls['personalMobile'].value);
            this.relianceInsuredTravel['controls'].items['controls'][0]['controls'].personalPhone1.patchValue(this.personal.controls['personalPhone'].value);
            this.relianceInsuredTravel['controls'].items['controls'][0]['controls'].relationship.patchValue('345');
            this.relianceInsuredTravel['controls'].items['controls'][0]['controls'].insureOccupationName.patchValue(this.PersonalOccupation[this.relianceInsuredTravel['controls'].items['controls'][0]['controls'].occupation.value]);


            let getDob = this.datepipe.transform(this.personal.controls['personalDob'].value, 'y-MM-dd');
            this.relianceInsuredTravel['controls'].items['controls'][0]['controls'].InsDOB.patchValue(getDob);
        } else {
            this.sameValue = false;
            this.relianceInsuredTravel['controls'].items['controls'][0]['controls'].personalTitle.patchValue('');
            this.relianceInsuredTravel['controls'].items['controls'][0]['controls'].personalFirstname.patchValue('');
            this.relianceInsuredTravel['controls'].items['controls'][0]['controls'].personalEmail.patchValue('');
            this.relianceInsuredTravel['controls'].items['controls'][0]['controls'].personalMidname.patchValue('');
            this.relianceInsuredTravel['controls'].items['controls'][0]['controls'].personalLastname.patchValue('');
            this.relianceInsuredTravel['controls'].items['controls'][0]['controls'].InsDOB.patchValue('');
            this.relianceInsuredTravel['controls'].items['controls'][0]['controls'].occupation.patchValue('');
            this.relianceInsuredTravel['controls'].items['controls'][0]['controls'].personalGender.patchValue('');
            this.relianceInsuredTravel['controls'].items['controls'][0]['controls'].personalMobile.patchValue('');
            this.relianceInsuredTravel['controls'].items['controls'][0]['controls'].personalPhone1.patchValue('');
            this.relianceInsuredTravel['controls'].items['controls'][0]['controls'].relationship.patchValue('');

        }

    }

    sessionData() {
        if (sessionStorage.travelPlan != '' && sessionStorage.travelPlan != undefined) {
            this.placeOfVisit = JSON.parse(sessionStorage.travelPlan);
        }
        if (sessionStorage.proposalPArea != '' && sessionStorage.proposalPArea != undefined) {
            this.proposalPArea = JSON.parse(sessionStorage.proposalPArea);
        }
        if (sessionStorage.proposalRArea != '' && sessionStorage.proposalRArea != undefined) {
            this.proposalRArea = JSON.parse(sessionStorage.proposalRArea);
        }
        if (sessionStorage.proposalBArea != '' && sessionStorage.proposalBArea != undefined) {
            this.proposalBArea = JSON.parse(sessionStorage.proposalBArea);
        }
        if (sessionStorage.proposalCArea != '' && sessionStorage.proposalCArea != undefined) {
            this.proposalCArea = JSON.parse(sessionStorage.proposalCArea);
        }
        if (sessionStorage.proposalDArea != '' && sessionStorage.proposalDArea != undefined) {
            this.proposalDArea = JSON.parse(sessionStorage.proposalDArea);
        }


        if (sessionStorage.stepper1Details != '' && sessionStorage.stepper1Details != undefined) {
            this.getStepper1 = JSON.parse(sessionStorage.stepper1Details);
            this.personal = this.fb.group({
                personalTitle: this.getStepper1.personalTitle,
                personalFirstname: this.getStepper1.personalFirstname,
                personalMidname: this.getStepper1.personalMidname,
                personalLastname: this.getStepper1.personalLastname,
                personalDob: this.datepipe.transform(this.getStepper1.personalDob, 'y-MM-dd'),
                personalGender: this.getStepper1.personalGender,
                maritalStatus: this.getStepper1.maritalStatus,
                maritalName: this.getStepper1.maritalName,
                occupation: this.getStepper1.occupation,
                occupationName: this.getStepper1.occupationName,
                personalAadhar: this.getStepper1.personalAadhar,
                personalPan: this.getStepper1.personalPan,
                personalEmail: this.getStepper1.personalEmail,
                personalMobile: this.getStepper1.personalMobile,
                personalPhone: this.getStepper1.personalPhone,
                nationality: this.getStepper1.nationality,
                nationalName: this.getStepper1.nationalName,
                personalGst: this.getStepper1.personalGst,
                gstin: this.getStepper1.gstin,
                relatedParty: this.getStepper1.relatedParty,
                groupCorpID: this.getStepper1.groupCorpID,
                personalAddress: this.getStepper1.personalAddress,
                personalAddress2: this.getStepper1.personalAddress2,
                personalAddress3: this.getStepper1.personalAddress3,
                personalPincode: this.getStepper1.personalPincode,
                personalCity: this.getStepper1.personalCity,
                personalArea: this.getStepper1.personalArea,
                personalAreaName: this.getStepper1.personalAreaName,
                personalDistrict: this.getStepper1.personalDistrict,
                personalyDistrictIdC: this.getStepper1.personalyDistrictIdC,
                personalState: this.getStepper1.personalState,
                personalNearestLandMark: this.getStepper1.personalNearestLandMark,
                personalCountry: this.getStepper1.personalCountry,
                residenceAddress: this.getStepper1.residenceAddress,
                residenceAddress2: this.getStepper1.residenceAddress2,
                residenceAddress3: this.getStepper1.residenceAddress3,
                residencePincode: this.getStepper1.residencePincode,
                residenceCity: this.getStepper1.residenceCity,
                residenceArea: this.getStepper1.residenceArea,
                residenceAreaName: this.getStepper1.residenceAreaName,
                residenceDistrict: this.getStepper1.residenceDistrict,
                residenceState: this.getStepper1.residenceState,
                residenceNearestLandMark: this.getStepper1.residenceNearestLandMark,
                residenceCountry: this.getStepper1.residenceCountry,
                personalCourseName: this.getStepper1.personalCourseName,
                personalTutionFeePerSem: this.getStepper1.personalTutionFeePerSem,
                personalNoOfSems: this.getStepper1.personalNoOfSems,
                personalUniversityName: this.getStepper1.personalUniversityName,
                personalUniversityEmail: this.getStepper1.personalUniversityEmail,
                personalUniversityMobileNo: this.getStepper1.personalUniversityMobileNo,
                personalUniversityPhoneNo: this.getStepper1.personalUniversityPhoneNo,
                personalUniversityFax: this.getStepper1.personalUniversityFax,
                personalUniversityCity: this.getStepper1.personalUniversityCity,
                personalUniversityPincode: this.getStepper1.personalUniversityPincode,
                personalUniversityState: this.getStepper1.personalUniversityState,
                personalUniversityCountry: this.getStepper1.personalUniversityCountry,
                personalBurglaryEmail: this.getStepper1.personalBurglaryEmail,
                personalBurglaryMobileNo: this.getStepper1.personalBurglaryMobileNo,
                personalBurglaryPhoneNo: this.getStepper1.personalBurglaryPhoneNo,
                personalBurglaryFax: this.getStepper1.personalBurglaryFax,
                personalBurglaryAddress: this.getStepper1.personalBurglaryAddress,
                personalBurglaryAddress2: this.getStepper1.personalBurglaryAddress2,
                personalBurglaryAddress3: this.getStepper1.personalBurglaryAddress3,
                personalBurglaryPincode: this.getStepper1.personalBurglaryPincode,
                personalBurglaryCity: this.getStepper1.personalBurglaryCity,
                personalyDistrictIdB: this.getStepper1.personalyDistrictIdB,
                personalBurglaryArea: this.getStepper1.personalBurglaryArea,
                personalBurglaryAreaName: this.getStepper1.personalBurglaryAreaName,
                personalBurglaryDistrict: this.getStepper1.personalBurglaryDistrict,
                personalBurglaryState: this.getStepper1.personalBurglaryState,
                personalBurglaryNearestLandMark: this.getStepper1.personalBurglaryNearestLandMark,
                personalBurglaryCountry: this.getStepper1.personalBurglaryCountry,
                personalSponsorFullname: this.getStepper1.personalSponsorFullname,
                personalSponsorEmail: this.getStepper1.personalSponsorEmail,
                personalSponsorMobileNo: this.getStepper1.personalSponsorMobileNo,
                personalSponsorPhoneNo: this.getStepper1.personalSponsorPhoneNo,
                personalSponsorAddress: this.getStepper1.personalSponsorAddress,
                personalSponsorPincode: this.getStepper1.personalSponsorPincode,
                personalSponsorCity: this.getStepper1.personalSponsorCity,
                personalSponsorState: this.getStepper1.personalSponsorState,
                personalSponsorCountry: this.getStepper1.personalSponsorCountry,
                IsDoctorDetails: this.getStepper1.IsDoctorDetails,
                personalDoctorFullname: this.getStepper1.personalDoctorFullname,
                personalDoctorEmail: this.getStepper1.personalDoctorEmail,
                personalDoctorMobileNo: this.getStepper1.personalDoctorMobileNo,
                personalDoctorPhoneNo: this.getStepper1.personalDoctorPhoneNo,
                personalDoctorFax: this.getStepper1.personalDoctorFax,
                personalDoctorAddress: this.getStepper1.personalDoctorAddress,
                personalDoctorAddress2: this.getStepper1.personalDoctorAddress2,
                personalDoctorAddress3: this.getStepper1.personalDoctorAddress3,
                personalDoctorPincode: this.getStepper1.personalDoctorPincode,
                personalDoctorCity: this.getStepper1.personalDoctorCity,
                personalDoctorArea: this.getStepper1.personalDoctorArea,
                personalDoctorAreaName: this.getStepper1.personalDoctorAreaName,
                personalDoctorDistrict: this.getStepper1.personalDoctorDistrict,
                personalDoctorState: this.getStepper1.personalDoctorState,
                personalDoctorNearestLandMark: this.getStepper1.personalDoctorNearestLandMark,
                personalDoctorCountry: this.getStepper1.personalDoctorCountry,
                personalCompanyFullname: this.getStepper1.personalCompanyFullname,
                personalCompanyEmail: this.getStepper1.personalCompanyEmail,
                personalCompanyMobileNo: this.getStepper1.personalCompanyMobileNo,
                personalCompanyPhoneNo: this.getStepper1.personalCompanyPhoneNo,
                personalCompanyFax: this.getStepper1.personalCompanyFax,
                personalCompanyAddress: this.getStepper1.personalCompanyAddress,
                personalCompanyAddress2: this.getStepper1.personalCompanyAddress2,
                personalCompanyAddress3: this.getStepper1.personalCompanyAddress3,
                personalCompanyPincode: this.getStepper1.personalCompanyPincode,
                personalCompanyCity: this.getStepper1.personalCompanyCity,
                personalCompanyArea: this.getStepper1.personalCompanyArea,
                personalCompanyAreaName: this.getStepper1.personalCompanyAreaName,
                personalCompanyDistrict: this.getStepper1.personalCompanyDistrict,
                personalCompanyState: this.getStepper1.personalCompanyState,
                personalCompanyNearestLandMark: this.getStepper1.personalCompanyNearestLandMark,
                personalCompanyCountry: this.getStepper1.personalCompanyCountry,
                personalCityIdP: this.getStepper1.personalCityIdP,
                personalStateIdP: this.getStepper1.personalStateIdP,
                personalDistrictIdP: this.getStepper1.personalDistrictIdP,
                personalCityIdR: this.getStepper1.personalCityIdR,
                personalStateIdR: this.getStepper1.personalStateIdR,
                residenceDistrictIdR: this.getStepper1.residenceDistrictIdR,
                personalCityIdB: this.getStepper1.personalCityIdB,
                personalStateIdB: this.getStepper1.personalStateIdB,
                residenceDistrictIdB: this.getStepper1.residenceDistrictIdB,
                personalCityIdS: this.getStepper1.personalCityIdS,
                personalStateIdS: this.getStepper1.personalStateIdS,
                personalCityIdD: this.getStepper1.personalCityIdD,
                personalStateIdD: this.getStepper1.personalStateIdD,
                residenceDistrictIdD: this.getStepper1.residenceDistrictIdD,
                personalCityIdC: this.getStepper1.personalCityIdC,
                personalStateIdC: this.getStepper1.personalStateIdC,
                residenceDistrictIdC: this.getStepper1.residenceDistrictIdC,
                startDate: this.getStepper1.startDate,
                endDate: this.getStepper1.endDate,
                sameas: this.getStepper1.sameas,
                sameasBurglary: this.getStepper1.sameasBurglary,
                sameasSponsor: this.getStepper1.sameasSponsor,
                rolecd: this.getStepper1.rolecd,
                personalyDistrictIdD: this.getStepper1.personalyDistrictIdD,
            });

            if(this.getStepper1.sameas == true) {
                this.inputReadonly = true;
            } else {
                this.inputReadonly = false;
            }
            if(this.getStepper1.sameasBurglary == true){
                this.inputBurglaryReadonly = true;
            } else {
                this.inputBurglaryReadonly = false;
            }
            if(this.getStepper1.sameasSponsor == true){
                this.inputSponsorReadonly = true;
            } else {
                this.inputSponsorReadonly = false;
            }

        }

        if (sessionStorage.stepper2Details != '' && sessionStorage.stepper2Details != undefined) {
            this.getStepper2 = JSON.parse(sessionStorage.stepper2Details);
            for (let i = 0; i < this.getStepper2.items.length; i++) {
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].rolecd.patchValue(this.getStepper2.items[i].rolecd);
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].personalTitle.patchValue(this.getStepper2.items[i].personalTitle);
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insurespouseFullname.patchValue(this.getStepper2.items[i].insurespouseFullname);
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insurechildFullname.patchValue(this.getStepper2.items[i].insurechildFullname);
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].personalFirstname.patchValue(this.getStepper2.items[i].personalFirstname);
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].personalLastname.patchValue(this.getStepper2.items[i].personalLastname);
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].personalMidname.patchValue(this.getStepper2.items[i].personalMidname);
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].personalGender.patchValue(this.getStepper2.items[i].personalGender);
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].InsDOB.patchValue(this.datepipe.transform(this.getStepper2.items[i].InsDOB, 'y-MM-dd'));
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].occupation.patchValue(this.getStepper2.items[i].occupation);
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insureOccupationName.patchValue(this.getStepper2.items[i].insureOccupationName);
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].personalEmail.patchValue(this.getStepper2.items[i].personalEmail);
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].relationship.patchValue(this.getStepper2.items[i].relationship);
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insureRelationshipName.patchValue(this.getStepper2.items[i].insureRelationshipName);
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].VisitingCountries.patchValue(this.getStepper2.items[i].VisitingCountries);
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insureVisitingCountryName.patchValue(this.getStepper2.items[i].insureVisitingCountryName);
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].passport.patchValue(this.getStepper2.items[i].passport);
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].personalMobile.patchValue(this.getStepper2.items[i].personalMobile);
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].personalPhone1.patchValue(this.getStepper2.items[i].personalPhone1);
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].IsUnderMedication.patchValue(this.getStepper2.items[i].IsUnderMedication);
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].PreExistingIllness.patchValue(this.getStepper2.items[i].PreExistingIllness);
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insurePreExistingIllnessName.patchValue(this.getStepper2.items[i].insurePreExistingIllnessName);
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].SufferingSince.patchValue(this.datepipe.transform(this.getStepper2.items[i].SufferingSince, 'y-MM-dd'));
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].nomineeName.patchValue(this.getStepper2.items[i].nomineeName);
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].nomineeRelationship.patchValue(this.getStepper2.items[i].nomineeRelationship);
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insureNomineeRelationshipName.patchValue(this.getStepper2.items[i].insureNomineeRelationshipName);
                // this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].InsuredAge.patchValue(this.getStepper2.items[i].InsuredAge);
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue(this.getStepper2.items[i].insurerDobError);
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue(this.getStepper2.items[i].insurerDobValidError);
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].sameAsProposer.patchValue(this.getStepper2.items[i].sameAsProposer);
                this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].sameas.patchValue(this.getStepper2.items[i].sameas);
            }
        }

        if (sessionStorage.stepper3Details != '' && sessionStorage.stepper3Details != undefined) {
            this.getStepper3 = JSON.parse(sessionStorage.stepper3Details);
            console.log(this.getStepper3, 'this.getStepper3');

            this.riskDetails.controls['riskPreExistDisease'].patchValue(this.getStepper3.riskPreExistDisease);
            this.riskDetails.controls['riskPreExistDiseaseValue'].patchValue(this.getStepper3.riskPreExistDiseaseValue);
            this.riskDetails.controls['riskPreExistDiseaseName'].patchValue(this.getStepper3.riskPreExistDiseaseName);
            this.riskDetails.controls['riskVisitingCountries'].patchValue(this.getStepper3.riskVisitingCountries);
            this.riskDetails.controls['riskVisitingCountryName'].patchValue(this.getStepper3.riskVisitingCountryName);
            this.riskDetails.controls['TravelCoverageTrue'].patchValue(this.getStepper3.TravelCoverageTrue);

            this.riskDetails.controls['riskIndian'].patchValue(this.getStepper3.riskIndian);
            this.riskDetails.controls['riskIsOverSeasCitizen'].patchValue(this.getStepper3.riskIsOverSeasCitizen);
            this.riskDetails.controls['riskIsResidingInIndia'].patchValue(this.getStepper3.riskIsResidingInIndia);
            this.riskDetails.controls['riskPermanentResidenceCountry'].patchValue(this.getStepper3.riskPermanentResidenceCountry);
            this.riskDetails.controls['riskOCINumber'].patchValue(this.getStepper3.riskOCINumber);
            this.riskDetails.controls['riskPassportIssuingCountry'].patchValue(this.getStepper3.riskPassportIssuingCountry);
            this.riskDetails.controls['riskIsInsuredOnImmigrantVisa'].patchValue(this.getStepper3.riskIsInsuredOnImmigrantVisa);
            this.riskDetails.controls['riskIsTravelInvolvesSportingActivities'].patchValue(this.getStepper3.riskIsTravelInvolvesSportingActivities);
            this.riskDetails.controls['riskSportsActivities'].patchValue(this.getStepper3.riskSportsActivities);
            this.riskDetails.controls['riskSportsActivitiesName'].patchValue(this.getStepper3.riskSportsActivitiesName);
            this.riskDetails.controls['riskIsSufferingFromPEMC'].patchValue(this.getStepper3.riskIsSufferingFromPEMC);
            this.riskDetails.controls['riskIsVisitingUSACanada'].patchValue(this.getStepper3.riskIsVisitingUSACanada);
            this.riskDetails.controls['riskCoverageType'].patchValue(this.getStepper3.riskCoverageType);
            this.riskDetails.controls['riskCoverageTypeName'].patchValue(this.getStepper3.riskCoverageTypeName);
            this.riskDetails.controls['riskIsVisitingStudent'].patchValue(this.getStepper3.riskIsVisitingStudent);
            this.riskDetails.controls['riskMaxDaysPerTrip'].patchValue(this.getStepper3.riskMaxDaysPerTrip);
            this.riskDetails.controls['riskNoOfYears'].patchValue(this.getStepper3.riskNoOfYears);
            this.riskDetails.controls['riskSeniorCitizen'].patchValue(this.getStepper3.riskSeniorCitizen);
            this.riskDetails.controls['riskSeniorCitizenPlanID'].patchValue(this.getStepper3.riskSeniorCitizenPlanID);
            this.riskDetails.controls['TravelStandardLimited'].patchValue(this.getStepper3.TravelStandardLimited);
            this.riskDetails.controls['riskSeniorCitizenPlanIDName'].patchValue(this.getStepper3.riskSeniorCitizenPlanIDName);
            this.riskDetails.controls['TravelCoverageName'].patchValue(this.getStepper3.TravelCoverageName);
            this.riskDetails.controls['TravelCoverageDisplayName'].patchValue(this.getStepper3.TravelCoverageDisplayName);
            this.riskDetails.controls['TravelStandardLimitedPlan'].patchValue(this.getStepper3.TravelStandardLimitedPlan);
            this.riskDetails.controls['TravelStandardDeductiblePlan'].patchValue(this.getStepper3.TravelStandardDeductiblePlan);
            this.riskDetails.controls['TravelIsSilverPlan'].patchValue(this.getStepper3.TravelIsSilverPlan);
            this.riskDetails.controls['TravelSilverPlan'].patchValue(this.getStepper3.TravelSilverPlan);
            this.riskDetails.controls['TravelIsGoldPlan'].patchValue(this.getStepper3.TravelIsGoldPlan);
            this.riskDetails.controls['TravelGoldPlan'].patchValue(this.getStepper3.TravelGoldPlan);
            this.riskDetails.controls['TravelIsPlatinumPlan'].patchValue(this.getStepper3.TravelIsPlatinumPlan);
            this.riskDetails.controls['TravelIsBasicPlan'].patchValue(this.getStepper3.TravelIsBasicPlan);
            this.riskDetails.controls['TravelBasicPlan'].patchValue(this.getStepper3.TravelBasicPlan);
            this.riskDetails.controls['TravelIsElitePlan'].patchValue(this.getStepper3.TravelIsElitePlan);
            this.riskDetails.controls['TravelElitePlan'].patchValue(this.getStepper3.TravelElitePlan);
            this.riskDetails.controls['TravelIsPlusPlan'].patchValue(this.getStepper3.TravelIsPlusPlan);
            this.riskDetails.controls['riskMaxDaysPerTripFlag'].patchValue(this.getStepper3.riskMaxDaysPerTripFlag);
            this.riskDetails.controls['TravelPlusPlan'].patchValue(this.getStepper3.TravelPlusPlan);







        }

        console.log(this.riskDetails, 'this.riskDetails');
        if (sessionStorage.reliance_Travel_proposal_id != '' && sessionStorage.reliance_Travel_proposal_id != undefined) {
            this.reliance_Travel_proposal_id = sessionStorage.reliance_Travel_proposal_id;
            console.log(this.reliance_Travel_proposal_id, 'this.religarePAProposal');
        }


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
    relianceOccupation() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'product_id': '11'
        }
        this.travelservice.travelRelianceOccupation(data).subscribe(
            (successData) => {
                this.PersonalOccupationListSuccess(successData);
            },
            (error) => {
                this.PersonalOccupationListFailure(error);
            }
        );
    }

    public PersonalOccupationListSuccess(successData) {
        if (successData.IsSuccess) {
            this.PersonalOccupation = successData.ResponseObject;
            console.log(this.PersonalOccupation, 'kkkkkkkkk');
            if(this.travelUserType == true ) {
                this.personal.controls['occupationName'].patchValue(this.PersonalOccupation[this.personal.controls['occupation'].value]);
            }
            console.log(this.personal.value, 'bnbbnnbbn');


        }
    }

    public PersonalOccupationListFailure(error) {
    }
    relainceRelation() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'product_id': '11'
        }
        this.travelservice.travelRelianceRelationShip(data).subscribe(
            (successData) => {
                this.relainceRelationListSuccess(successData);
            },
            (error) => {
                this.relainceRelationListFailure(error);
            }
        );
    }

    public relainceRelationListSuccess(successData) {
        if (successData.IsSuccess) {
            this.Relationship = successData.ResponseObject;
        }
    }

    public relainceRelationListFailure(error) {
    }
    relainceNationality() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'product_id': '11'
        }
        this.travelservice.travelRelianceNationality(data).subscribe(
            (successData) => {
                this.relainceNationalityListSuccess(successData);
            },
            (error) => {
                this.relainceNationalityListFailure(error);
            }
        );
    }

    public relainceNationalityListSuccess(successData) {
        if (successData.IsSuccess) {
            this.Nationality = successData.ResponseObject;
        }
    }

    public relainceNationalityListFailure(error) {
    }
    relainceMarital() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'product_id': '11'
        }
        this.travelservice.travelRelianceMarital(data).subscribe(
            (successData) => {
                this.relainceMaritalListSuccess(successData);
            },
            (error) => {
                this.relainceMaritalListFailure(error);
            }
        );
    }

    public relainceMaritalListSuccess(successData) {
        if (successData.IsSuccess) {
            this.Marital = successData.ResponseObject;
            console.log(this.Marital,'MaritalMaritalMarital');
        }
    }

    public relainceMaritalListFailure(error) {
    }

    relainceVisitingCountries() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'product_id': '11'
        }
        this.travelservice.travelRelianceVisitingCountries(data).subscribe(
            (successData) => {
                this.relainceVisitingCountriesListSuccess(successData);
            },
            (error) => {
                this.relainceVisitingCountriesListFailure(error);
            }
        );
    }

    public relainceVisitingCountriesListSuccess(successData) {
        if (successData.IsSuccess) {
            this.VisitingCountry = successData.ResponseObject;
        }
    }

    public relainceVisitingCountriesListFailure(error) {
    }
    relaincePreExistingIllness() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'product_id': '11'
        }
        this.travelservice.travelReliancePreExistingIllness(data).subscribe(
            (successData) => {
                this.relaincePreExistingIllnessListSuccess(successData);
            },
            (error) => {
                this.relaincePreExistingIllnessListFailure(error);
            }
        );
    }

    public relaincePreExistingIllnessListSuccess(successData) {
        if (successData.IsSuccess) {
            this.PreExistingIllness = successData.ResponseObject;
        }
    }

    public relaincePreExistingIllnessListFailure(error) {
    }

    relainceSportsActivities() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'product_id': '11'
        }
        this.travelservice.travelReliancerelainceSportsActivities(data).subscribe(
            (successData) => {
                this.relainceSportsActivitiesListSuccess(successData);
            },
            (error) => {
                this.relainceSportsActivitiesListFailure(error);
            }
        );
    }

    public relainceSportsActivitiesListSuccess(successData) {
        if (successData.IsSuccess) {
            this.SportsActivities = successData.ResponseObject;
        }
    }
    public relainceSportsActivitiesListFailure(error) {
    }

    getRiskPreDiseases() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'product_id': '11'
        }
        this.travelservice.getRiskPreDiseases(data).subscribe(
            (successData) => {
                this.preExDiseaseSuccess(successData);
            },
            (error) => {
                this.preExDiseaseFailure(error);
            }
        );
    }
    public preExDiseaseSuccess(successData) {
        if (successData.IsSuccess) {
            this.allPreExistingDiseases = successData.ResponseObject;
            console.log(this.allPreExistingDiseases,'eeeee')

        }
    }
    public preExDiseaseFailure(error) {
    }
    relainceCoverType() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'product_id': '11'
        }
        this.travelservice.travelReliancerelainceCoverType(data).subscribe(
            (successData) => {
                this.relainceCoverTypeListSuccess(successData);
            },
            (error) => {
                this.relainceCoverTypeListFailure(error);
            }
        );
    }

    public relainceCoverTypeListSuccess(successData) {
        if (successData.IsSuccess) {
            this.CoverType = successData.ResponseObject;
        }
    }

    public relainceCoverTypeListFailure(error) {
    }
    getSenorCitPlans() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'product_id': '11'
        }
        this.travelservice.getSenorCitPlans(data).subscribe(
            (successData) => {
                this.getSenorCitPlansSuccess(successData);
            },
            (error) => {
                this.getSenorCitPlansFailure(error);
            }
        );
    }

    public getSenorCitPlansSuccess(successData) {
        if (successData.IsSuccess) {
            this.seniorCitizenPlans = successData.ResponseObject;
            console.log(this.seniorCitizenPlans, 'this.seniorCitizenPlansthis.seniorCitizenPlans');
        }
    }

    public getSenorCitPlansFailure(error) {
    }

    commonPincode(pin, title) {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'product_id' : '11',
            'pincode': pin
        }
        if (pin.length == 6) {
            this.travelservice.travelRelianceCheckpincode(data).subscribe(
                (successData) => {
                    this.commonPincodeSuccess(successData, title);
                },
                (error) => {
                    this.commonPincodeFailure(error);
                }
            );
        }
    }

    public commonPincodeSuccess(successData, title) {
        if (successData.IsSuccess == true) {
            this.response = successData.ResponseObject;
            if (title == 'proposalP') {
                if (Object.keys(this.response).length === 0) {
                    this.personal['controls'].personalState.patchValue('');
                    this.personal['controls'].personalDistrict.patchValue('');
                    this.personal['controls'].personalCity.patchValue('');
                    this.personal['controls'].personalDistrictIdP.patchValue('');
                    this.personal['controls'].personalCityIdP.patchValue('');
                    this.personal['controls'].personalStateIdP.patchValue('');
                    this.proposalPArea = '';
                    sessionStorage.proposalPArea = {};

                } else {
                    this.personal['controls'].personalState.patchValue(this.response.state_name);
                    this.personal['controls'].personalDistrict.patchValue(this.response.district_name);
                    this.personal['controls'].personalCity.patchValue(this.response.city_village_name);
                    this.personal['controls'].personalDistrictIdP.patchValue(this.response.district_id);
                    this.personal['controls'].personalCityIdP.patchValue(this.response.city_village_id);
                    this.personal['controls'].personalStateIdP.patchValue(this.response.state_id);
                    this.proposalPArea = this.response.area_details;
                    sessionStorage.proposalPArea = JSON.stringify(this.proposalPArea);
                }
            } else if(title == 'proposalR') {
                if (Object.keys(this.response).length === 0) {
                    this.personal['controls'].residenceState.patchValue('');
                    this.personal['controls'].residenceDistrict.patchValue('');
                    this.personal['controls'].residenceCity.patchValue('');
                    this.personal['controls'].residenceDistrictIdR.patchValue('');
                    this.personal['controls'].personalCityIdR.patchValue('');
                    this.personal['controls'].personalStateIdR.patchValue('');
                    this.proposalRArea = '';
                    sessionStorage.proposalRArea = {};

                } else {
                    this.personal['controls'].residenceState.patchValue(this.response.state_name);
                    this.personal['controls'].residenceDistrict.patchValue(this.response.district_name);
                    this.personal['controls'].residenceCity.patchValue(this.response.city_village_name);
                    this.personal['controls'].residenceDistrictIdR.patchValue(this.response.district_id);
                    this.personal['controls'].personalCityIdR.patchValue(this.response.city_village_id);
                    this.personal['controls'].personalStateIdR.patchValue(this.response.state_id);
                    this.proposalRArea = this.response.area_details;
                    sessionStorage.proposalRArea = JSON.stringify(this.proposalRArea);
                }
            } else if(title == 'proposalB') {
                if (Object.keys(this.response).length === 0) {
                    this.personal['controls'].personalBurglaryState.patchValue('');
                    this.personal['controls'].personalBurglaryDistrict.patchValue('');
                    this.personal['controls'].personalBurglaryCity.patchValue('');
                    this.personal['controls'].residenceDistrictIdB.patchValue('');
                    this.personal['controls'].personalCityIdB.patchValue('');
                    this.personal['controls'].personalStateIdB.patchValue('');
                    this.proposalBArea = '';
                    sessionStorage.proposalBArea = {};
                } else {
                    console.log(this.response.district_id,'eeeee');
                    this.personal['controls'].personalBurglaryState.patchValue(this.response.state_name);
                    this.personal['controls'].personalBurglaryDistrict.patchValue(this.response.district_name);
                    this.personal['controls'].personalBurglaryCity.patchValue(this.response.city_village_name);
                    this.personal['controls'].residenceDistrictIdB.patchValue(this.response.district_id);
                    this.personal['controls'].personalCityIdB.patchValue(this.response.city_village_id);
                    this.personal['controls'].personalStateIdB.patchValue(this.response.state_id);
                    this.proposalBArea = this.response.area_details;
                    sessionStorage.proposalBArea = JSON.stringify(this.proposalBArea);
                }
            } else if(title == 'proposalS') {
                if (Object.keys(this.response).length === 0) {
                    this.personal['controls'].personalSponsorState.patchValue('');
                    this.personal['controls'].personalSponsorCity.patchValue('');
                    this.personal['controls'].personalCityIdS.patchValue('');
                    this.personal['controls'].personalStateIdS.patchValue('');
                } else {
                    this.personal['controls'].personalSponsorState.patchValue(this.response.state_name);
                    this.personal['controls'].personalSponsorCity.patchValue(this.response.city_village_name);
                    this.personal['controls'].personalCityIdS.patchValue(this.response.city_village_id);
                    this.personal['controls'].personalStateIdS.patchValue(this.response.state_id);
                }
            } else if(title == 'proposalC') {
                if (Object.keys(this.response).length === 0) {
                    this.personal['controls'].personalCompanyState.patchValue('');
                    this.personal['controls'].personalCompanyDistrict.patchValue('');
                    this.personal['controls'].personalCompanyCity.patchValue('');
                    this.personal['controls'].personalyDistrictIdC.patchValue('');
                    this.personal['controls'].personalCityIdC.patchValue('');
                    this.personal['controls'].personalStateIdC.patchValue('');
                    this.proposalCArea = '';
                    sessionStorage.proposalCArea = {};
                } else {
                    this.personal['controls'].personalCompanyState.patchValue(this.response.state_name);
                    this.personal['controls'].personalCompanyDistrict.patchValue(this.response.district_name);
                    this.personal['controls'].personalCompanyCity.patchValue(this.response.city_village_name);
                    this.personal['controls'].personalyDistrictIdC.patchValue(this.response.district_id);
                    this.personal['controls'].personalCityIdC.patchValue(this.response.city_village_id);
                    this.personal['controls'].personalStateIdC.patchValue(this.response.state_id);
                    this.proposalCArea = this.response.area_details;
                    sessionStorage.proposalCArea = JSON.stringify(this.proposalCArea);

                }
            } else if(title == 'proposalD') {
                if (Object.keys(this.response).length === 0) {
                    this.personal['controls'].personalDoctorState.patchValue('');
                    this.personal['controls'].personalDoctorDistrict.patchValue('');
                    this.personal['controls'].personalDoctorCity.patchValue('');
                    this.personal['controls'].personalyDistrictIdD.patchValue('');
                    this.personal['controls'].personalCityIdD.patchValue('');
                    this.personal['controls'].personalStateIdD.patchValue('');
                    this.proposalDArea = '';
                    sessionStorage.proposalDArea = {};

                } else {
                    this.personal['controls'].personalDoctorState.patchValue(this.response.state_name);
                    this.personal['controls'].personalDoctorDistrict.patchValue(this.response.district_name);
                    this.personal['controls'].personalDoctorCity.patchValue(this.response.city_village_name);
                    this.personal['controls'].personalyDistrictIdD.patchValue(this.response.district_id);
                    this.personal['controls'].personalCityIdD.patchValue(this.response.city_village_id);
                    this.personal['controls'].personalStateIdD.patchValue(this.response.state_id);
                    this.proposalDArea = this.response.area_details;
                    sessionStorage.proposalDArea = JSON.stringify(this.proposalDArea);
                }
            } else if(title == 'proposalU') {
                if (Object.keys(this.response).length === 0) {
                    this.personal['controls'].personalUniversityCity.patchValue('');
                    this.personal['controls'].personalUniversityState.patchValue('');
                } else {
                    this.personal['controls'].personalUniversityCity.patchValue(this.response.city_village_name);
                    this.personal['controls'].personalUniversityState.patchValue(this.response.state_name);
                }
            }
        } else {
            this.toastr.error('In valid Pincode');
            if (title == 'proposalP') {
                this.personal['controls'].personalState.patchValue('');
                this.personal['controls'].personalDistrict.patchValue('');
                this.personal['controls'].personalCity.patchValue('');
                this.personal['controls'].personalDistrictIdP.patchValue('');
                this.personal['controls'].personalCityIdP.patchValue('');
                this.personal['controls'].personalStateIdP.patchValue('');
                this.proposalPArea = '';
                sessionStorage.proposalPArea = {};
            } else if (title == 'proposalR') {
                this.personal['controls'].residenceState.patchValue('');
                this.personal['controls'].residenceDistrict.patchValue('');
                this.personal['controls'].residenceCity.patchValue('');
                this.personal['controls'].residenceDistrictIdR.patchValue('');
                this.personal['controls'].personalCityIdR.patchValue('');
                this.personal['controls'].personalStateIdR.patchValue('');
                this.proposalRArea = '';
                sessionStorage.proposalRArea = {};
            } else if (title == 'proposalB') {
                this.personal['controls'].personalBurglaryState.patchValue('');
                this.personal['controls'].personalBurglaryDistrict.patchValue('');
                this.personal['controls'].personalBurglaryCity.patchValue('');
                this.personal['controls'].personalyDistrictIdB.patchValue('');
                this.personal['controls'].personalCityIdB.patchValue('');
                this.personal['controls'].personalStateIdB.patchValue('');
                this.proposalBArea = '';
                sessionStorage.proposalBArea = {};
            } else if (title == 'proposalS') {
                this.personal['controls'].personalSponsorState.patchValue('');
                this.personal['controls'].personalSponsorCity.patchValue('');
                this.personal['controls'].personalCityIdS.patchValue('');
                this.personal['controls'].personalStateIdS.patchValue('');
            } else if (title == 'proposalC') {
                this.personal['controls'].personalCompanyState.patchValue('');
                this.personal['controls'].personalCompanyDistrict.patchValue('');
                this.personal['controls'].personalCompanyCity.patchValue('');
                this.personal['controls'].personalyDistrictIdC.patchValue('');
                this.personal['controls'].personalCityIdC.patchValue('');
                this.personal['controls'].personalStateIdC.patchValue('');
                this.proposalCArea = '';
                sessionStorage.proposalCArea = {};
            } else if (title == 'proposalD') {
                this.personal['controls'].personalCompanyState.patchValue('');
                this.personal['controls'].personalCompanyDistrict.patchValue('');
                this.personal['controls'].personalCompanyCity.patchValue('');
                this.personal['controls'].personalyDistrictIdD.patchValue('');
                this.personal['controls'].personalCityIdC.patchValue('');
                this.personal['controls'].personalStateIdC.patchValue('');
                this.proposalCArea = '';
                sessionStorage.proposalCArea = {};
            } else if(title == 'proposalU') {
                if (Object.keys(this.response).length === 0) {
                    this.personal['controls'].personalUniversityCity.patchValue('');
                    this.personal['controls'].personalUniversityState.patchValue('');
                } else {
                    this.personal['controls'].personalUniversityCity.patchValue(this.response.city_village_name);
                    this.personal['controls'].personalUniversityState.patchValue(this.response.state_id);
                }
            }
        }

    }
    public commonPincodeFailure(error)
    {
    }
    riskDetailsChange(value: any, title) {
        if (title == 'india') {
            if (this.riskDetails['controls'].riskIndian.value == 'true') {
                this.riskDetails['controls'].riskIsOverSeasCitizen.patchValue('false');
                this.riskDetails['controls'].riskIsResidingInIndia.patchValue('');
                this.overseas = false;
            } else if (this.riskDetails['controls'].riskIndian.value == 'false') {
                this.riskDetails['controls'].riskIsOverSeasCitizen.patchValue('true');
                this.riskDetails['controls'].riskIsResidingInIndia.patchValue('');
                this.overseas = true;
            }

        }
        console.log(this.riskDetails['controls'].riskIndian.value,'riskIndian.');
        console.log(this.riskDetails['controls'].riskIsOverSeasCitizen.value,'riskIsOverSeasCitizen.');
        if (title == 'overseas') {
            if (this.riskDetails['controls'].riskIsOverSeasCitizen.value == 'true') {
                this.riskDetails['controls'].riskIndian.patchValue('false');
                this.overseas = true;
            } else if (this.riskDetails['controls'].riskIsOverSeasCitizen.value == 'false') {
                this.riskDetails['controls'].riskIndian.patchValue('true');
                this.overseas = false;
            }
        }
        // if (title == 'residingIndia') {
        //     if (value.checked == true) {
        //         this.riskIsResidingInIndiaTrue = true;
        //     } else if (value.checked == false) {
        //         this.riskIsResidingInIndiaTrue = false;
        //         this.riskDetails['controls'].riskPassportIssuingCountry.patchValue('');
        //         this.riskDetails['controls'].riskPassportIssuingCountry.patchValue(null);
        //     }
        // }
        // if (title == 'ImmigrantVisa') {
        //     if (value.checked == true) {
        //     } else if (value.checked == false) {
        //     }
        // }
        // if (title == 'IsSufferingFromPEMC') {
        //     if (value.checked == true) {
        //     } else if (value.checked == false) {
        //     }
        // }
        // if (title == 'PreExistDisease') {
        //     if (value.checked == true) {
        //     } else if (value.checked == false) {
        //     }
        // }
        // if (title == 'TravelInvolvesSporting') {
        //     if (value.checked == true) {
        //         this.riskSportsActivitiesTrue = true;
        //     } else if (value.checked == false) {
        //         this.riskSportsActivitiesTrue = false;
        //     }
        // }
        // if (title == 'IsVisitingUSACanada') {
        //     if (value.checked == true) {
        //         this.VisitingListTure = true;
        //     } else if (value.checked == false) {
        //         this.VisitingListTure = false;
        //     }
        // }
        // if (title == 'IsVisitingFamily') {
        //     if (value.checked == true) {
        //         this.riskCoverageTypeTrue = true;
        //     } else if (value.checked == false) {
        //         this.riskCoverageTypeTrue = false;
        //     }
        // }
        // if (title == 'IsVisitingStudent') {
        //     if (value.checked == true) {
        //     } else if (value.checked == false) {
        //     }
        // }
        // if (title == 'IsMultitripIndividual') {
        //     if (value.checked == true) {
        //         this.riskMaxDaysPerTripTrue = true;
        //     } else if (value.checked == false) {
        //         this.riskMaxDaysPerTripTrue = false;
        //     }
        // }
        // if (title == 'IsSeniorCitizen') {
        //     if (value.checked == true) {
        //         this.riskSeniorCitizenTrue = true;
        //     } else if (value.checked == false) {
        //         this.riskSeniorCitizenTrue = false;
        //     }
        // }
        // if (title == 'TravelCoverage') {
        //     if (value.checked == true) {
        //         this.TravelCoverageTrue = true;
        //     } else if (value.checked == false) {
        //         this.TravelCoverageTrue = false;
        //     }
        // }
        // if (title == 'TravelStandardLimit') {
        //     if (value.checked == true) {
        //         this.TravelStandardLimitTrue = true;
        //     } else if (value.checked == false) {
        //         this.TravelStandardLimitTrue = false;
        //     }
        // }
        // if (title == 'TravelSilverPlan') {
        //     if (value.checked == true) {
        //         this.TravelSilverPlanTrue = true;
        //     } else if (value.checked == false) {
        //         this.TravelSilverPlanTrue = false;
        //     }
        // }
        // if (title == 'TravelGoldPlan') {
        //     if (value.checked == true) {
        //         this.TravelGoldPlanTrue = true;
        //     } else if (value.checked == false) {
        //         this.TravelGoldPlanTrue = false;
        //     }
        // }
        // if (title == 'TravelPlatinumPlan') {
        //     if (value.checked == true) {
        //         this.TravelPlatinumPlanTrue = true;
        //     } else if (value.checked == false) {
        //         this.TravelPlatinumPlanTrue = false;
        //     }
        // }
        // if (title == 'TravelBasicPlan') {
        //     if (value.checked == true) {
        //         this.TravelBasicPlanTrue = true;
        //     } else if (value.checked == false) {
        //         this.TravelBasicPlanTrue = false;
        //     }
        // }
        // if (title == 'TravelElitePlan') {
        //     if (value.checked == true) {
        //         this.TravelElitePlanTrue = true;
        //     } else if (value.checked == false) {
        //         this.TravelElitePlanTrue = false;
        //     }
        // }
        // if (title == 'TravelPlusPlan') {
        //     if (value.checked == true) {
        //         this.TravelPlusPlanTrue = true;
        //     } else if (value.checked == false) {
        //         this.TravelPlusPlanTrue = false;
        //     }
        // }
    }
    medicalHistoryDetails(vvv){

    }
    //proposal details view summary
    selectMarital(){
        this.personal.controls['maritalName'].patchValue(this.Marital[this.personal.controls['maritalStatus'].value]);

    }
    selectOccupation() {
        this.personal.controls['occupationName'].patchValue(this.PersonalOccupation[this.personal.controls['occupation'].value]);
    }
    selectNationality(){
        this.personal.controls['nationalName'].patchValue(this.Nationality[this.personal.controls['nationality'].value]);
    }
    selectBurglaryArea(){
        this.personal.controls['personalBurglaryAreaName'].patchValue(this.proposalBArea[this.personal.controls['personalBurglaryArea'].value]);
    }
    selectCompanyArea(){
        this.personal.controls['personalCompanyAreaName'].patchValue(this.proposalCArea[this.personal.controls['personalCompanyArea'].value]);
    }
    selectDoctorArea(){
        this.personal.controls['personalDoctorAreaName'].patchValue(this.proposalDArea[this.personal.controls['personalDoctorArea'].value]);
    }

    selectInsureOccupation(index){
        this.relianceInsuredTravel['controls'].items['controls'][index]['controls'].insureOccupationName.patchValue(this.PersonalOccupation[this.relianceInsuredTravel['controls'].items['controls'][index]['controls'].occupation.value]);
    }
    selectInsureRelationship(index){
        this.relianceInsuredTravel['controls'].items['controls'][index]['controls'].insureRelationshipName.patchValue(this.Relationship[this.relianceInsuredTravel['controls'].items['controls'][index]['controls'].relationship.value]);
    }
    selectInsureVisitingCountries(index){
        this.relianceInsuredTravel['controls'].items['controls'][index]['controls'].insureVisitingCountryName.patchValue(this.VisitingCountry[this.relianceInsuredTravel['controls'].items['controls'][index]['controls'].VisitingCountries.value]);
    }
    selectInsurePreExistingIllness(index){
        this.relianceInsuredTravel['controls'].items['controls'][index]['controls'].insurePreExistingIllnessName.patchValue(this.PreExistingIllness[this.relianceInsuredTravel['controls'].items['controls'][index]['controls'].PreExistingIllness.value]);
    }
    selectInsureNomineeRelationship(index){
        this.relianceInsuredTravel['controls'].items['controls'][index]['controls'].insureNomineeRelationshipName.patchValue(this.Relationship[this.relianceInsuredTravel['controls'].items['controls'][index]['controls'].nomineeRelationship.value]);
    }
    // selectriskSportsActivities(){
    //   this.riskDetails.controls['riskSportsActivitiesName'].patchValue(this.SportsActivities[this.riskDetails.controls['riskSportsActivities'].value]);
    // }
    selectriskVisitingCountries(){
        // this.riskDetails.controls['riskVisitingCountriesName'].patchValue(this.VisitingCountry[this.riskDetails.controls['riskVisitingCountries'].value]);
    }
    selectriskriskCoverageType(){
        this.riskDetails.controls['riskCoverageTypeName'].patchValue(this.CoverType[this.riskDetails.controls['riskCoverageType'].value]);
    }




    selectseniorPlan() {
        this.riskDetails.controls['riskSeniorCitizenPlanIDName'].patchValue(this.seniorCitizenPlans[this.riskDetails.controls['riskSeniorCitizenPlanID'].value]);
    }
}
