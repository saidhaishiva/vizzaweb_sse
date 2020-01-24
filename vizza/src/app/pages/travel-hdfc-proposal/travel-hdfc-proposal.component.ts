import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TravelService} from '../../shared/services/travel.service';
import {HealthService} from '../../shared/services/health.service';
import {DatePipe} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {AppSettings} from '../../app.settings';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDialog, MatStepper} from '@angular/material';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {CommonService} from '../../shared/services/common.service';
import {AuthService} from '../../shared/services/auth.service';
import {HttpClient} from '@angular/common/http';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {ValidationService} from '../../shared/services/validation.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';
import { WINDOW } from '@ng-toolkit/universal';
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
  selector: 'app-travel-hdfc-proposal',
  templateUrl: './travel-hdfc-proposal.component.html',
  styleUrls: ['./travel-hdfc-proposal.component.scss'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
})
export class TravelHdfcProposalComponent implements OnInit {
    public hdfcTravel: FormGroup;
    public hdfcInsuredTravel: FormGroup;
    public nomineeTravelDetails: FormGroup;
    public settings: any;
    public webhost: any;
    public titleList: any;
    public hdfcTravelproposerAge: any;
    public personalDobError: any;
    public pin: any;
    public pincodeValid: any;
    public hdfcTravelStates: any;
    public hdfcTravelCity: any;
    public hdfcTravel1: any;
    public hdfcTravel2: any;
    public getTravelPremiumList: any;
    public insuredTravelPerson: any;
    public getallTravelPremiumList: any;
    public items: any;
    public PaymentActionUrl: any;
    public insuredRelationshipDetails: any;
    public declinedetails: boolean;
    public restrictiondetails: boolean;
    public getpedDetails: any;
    public arr: any;
    public nomineeRelationshipDetails: any;
    public insuredTravelData: any;
    public summaryData: any;
    public lastStepper: any;
    public hdfc_Travel_proposal_id: any;
    public getAge: any;
    public getDays: any;
    public totalInsureDetails: any;
    public hdfcTravel3: any;
    public sameAsinsure: any;
    public declaration: any;
    public fullName: any;
    public totalAmount: any;
    public decline: any;
    public sameRelationship: any;
    public proposerFormData: any;
    public insuredFormData: any;
    public nomineeFormData: any;
    public currentStep: any;
    public today: any;
    public requestDetails: any;
    public pos_status: any;
    public getEnquiryDetails: any;
    public placeOfVisit: any;
    public step: any;
    public travelPurpose: any;
    public requestCustomerDetails: any;
    public proposalId: any;
    public stepperindex: any;
    public payLaterr: any;
    public status: any;
    public passportany: any;
    public proposal_Id: any;
    public productcode: any;
    public hdfc_ergo_payment: any;
    public mobileView: boolean;
    public pedValid: boolean;




    constructor(@Inject(WINDOW) private window: Window, public travelservice: TravelService, public route: ActivatedRoute, public validation: ValidationService, public proposalservice: HealthService, public datepipe: DatePipe, private toastr: ToastrService, public appSettings: AppSettings, public dialog: MatDialog,public router: Router,
                public config: ConfigurationService, public fb: FormBuilder, public auth: AuthService, public http: HttpClient, @Inject(LOCALE_ID) private locale: string) {
        this.settings = this.appSettings.settings;
        this.settings.HomeSidenavUserBlock = false;
        this.settings.sidenavIsOpened = false;
        this.stepperindex = 0;
        this.route.params.forEach((params) => {
            if(params.stepper == true || params.stepper == 'true') {
                this.stepperindex = 3;
                if (sessionStorage.summaryData != '' && sessionStorage.summaryData != undefined) {
                    this.summaryData = JSON.parse(sessionStorage.summaryData);
                    this.proposerFormData = JSON.parse(sessionStorage.proposerFormData);
                    sessionStorage.hdfc_Travel_proposal_id = this.summaryData.ProposalId;
                    this.hdfc_Travel_proposal_id = this.summaryData.ProposalId;
                    this.insuredFormData = JSON.parse(sessionStorage.insuredFormData);
                    this.nomineeFormData = JSON.parse(sessionStorage.nomineeFormData);
                    this.fullName = this.proposerFormData.firstname + ' ' + this.proposerFormData.lastname;
                    this.totalAmount = parseFloat(this.summaryData.totalPremium);

                }
            }
            this.status = params.stepper;
            this.proposal_Id = params.proposalId;
            if(this.proposalId != '' || this.proposal_Id != undefined ){
                this.payLaterr = true;
                console.log(this.proposal_Id, 'this.proposalId');
                console.log(this.status, 'this.proposalId');
                this.getBackRequest();
            }
            if(this.proposal_Id == undefined || this.proposal_Id == '') {
                this.payLaterr = false;
            }
            console.log(this.payLaterr, 'cons');

        });
        this.currentStep = this.stepperindex;
        let today = new Date();
        this.today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        this.totalInsureDetails = [];
        this.step = 0;
        this.decline = false;
        this.settings.sidenavIsPinned = false;
        this.webhost = this.config.getimgUrl();
        this.hdfcTravel = this.fb.group({
            title: ['', Validators.required],
            firstname: new FormControl(''),
            middlename: new FormControl(''),
            lastname: new FormControl(''),
            gender: ['', Validators.compose([Validators.required])],
            dob: ['', Validators.compose([Validators.required])],
            address1: ['', Validators.required],
            address2: '',
            address3: '',
            pincode: ['', Validators.required],
            city: ['', Validators.required],
            cityName: '',
            state: ['', Validators.required],
            stateName: '',
            email: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
            mobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
            stdcode: '',
            telephoneNo: '',
            stdcodeoffice: '',
            telephoneNooffice: '',
            paymentmode: '',
            physicianName: '',
            physicianMobile: '',
            declineinsurance: 'False',
            declineReson: '',
            restrictionbyinsurance: 'False',
            restrictionbyinsurancedetails: '',
            gst: '',
            ped: 'None',
            IsCustomerAuthenticationDone: "1",
            AuthenticationType: "OTP",
            UIDNo: "",// otp value
            IsProposerSameAsInsured: "false",
            IsCustomerAcceptedPED: "true",
            rolecd: 'PROPOSER'
        });
        this.nomineeTravelDetails = this.fb.group({
            'NomineeName': ['', Validators.required],
            'NomineeRelation': ['', Validators.required],
            'NomineeRelationName': ''
        });
        this.pincodeValid = false;
        this.declinedetails = false;
        this.restrictiondetails = false;
        this.hdfc_Travel_proposal_id = 0;
        this.travelPurpose = sessionStorage.travelType;

    }

    ngOnInit() {
        if (this.payLaterr == true) {
            this.stepperindex = 3;
            console.log(this.payLaterr, 'this.payLaterrolll');
        } else {
            if (this.window.innerWidth <= 768) {
                this.mobileView = true;
            } else {
                this.mobileView = false;
            }

            this.titleproposer();
            this.getStateList();
            this.getPedList();
            this.insuredRelationshipList();
            this.nomineeRelationshipList();


            this.getTravelPremiumList = JSON.parse(sessionStorage.travelPremiumList);
            console.log(this.getTravelPremiumList, 'this.getTravelPremiumList');
            let enqList = JSON.parse(sessionStorage.enquiryDetailsTravel);
            this.getEnquiryDetails = enqList[0];
            // this.getallTravelPremiumList = JSON.parse(sessionStorage.allTravelPremiumLists);
            // console.log(this.getallTravelPremiumList, 'this.getallTravelPremiumList');
            this.insuredTravelPerson = this.getEnquiryDetails.family_members;
            console.log(this.insuredTravelPerson, ' this.insuredTravelPerson ');
            this.hdfcInsuredTravel = this.fb.group({
                items: this.fb.array([])
            });
            for (let i = 0; i < this.insuredTravelPerson.length; i++) {
                this.items = this.hdfcInsuredTravel.get('items') as FormArray;
                this.items.push(this.initItemRows());
                this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].type.patchValue(this.insuredTravelPerson[i].type);
            }
            this.sessionData();
        }
    }
    // session Storage
    sessionData() {
        if (sessionStorage.travelPlan != '' && sessionStorage.travelPlan != undefined) {
            this.placeOfVisit = JSON.parse(sessionStorage.travelPlan);
        }
            if (sessionStorage.hdfcTravelCity != '' && sessionStorage.hdfcTravelCity != undefined) {
            this.hdfcTravelCity = JSON.parse(sessionStorage.hdfcTravelCity);
        }
        if (sessionStorage.hdfcTravelDetails1 != '' && sessionStorage.hdfcTravelDetails1 != undefined) {
            this.hdfcTravel1 = JSON.parse(sessionStorage.hdfcTravelDetails1);
            this.hdfcTravel.patchValue({
                title: this.hdfcTravel1.title,
                firstname: this.hdfcTravel1.firstname,
                middlename: this.hdfcTravel1.middlename,
                lastname: this.hdfcTravel1.lastname,
                dob: this.datepipe.transform(this.hdfcTravel1.dob, 'y-MM-dd'),
                gender: this.hdfcTravel1.gender,
                address1: this.hdfcTravel1.address1,
                address2: this.hdfcTravel1.address2,
                address3: this.hdfcTravel1.address3,
                pincode: this.hdfcTravel1.pincode,
                city: this.hdfcTravel1.city,
                cityName: this.hdfcTravel1.cityName,
                state: this.hdfcTravel1.state,
                stateName: this.hdfcTravel1.stateName,
                stdcode: this.hdfcTravel1.stdcode,
                telephoneNo: this.hdfcTravel1.telephoneNo,
                stdcodeoffice: this.hdfcTravel1.stdcodeoffice,
                paymentmode: this.hdfcTravel1.paymentmode,
                telephoneNooffice: this.hdfcTravel1.telephoneNooffice,
                physicianName: this.hdfcTravel1.physicianName,
                physicianMobile: this.hdfcTravel1.physicianMobile,
                email: this.hdfcTravel1.email,
                declineinsurance: this.hdfcTravel1.declineinsurance,
                declineReson: this.hdfcTravel1.declineReson,
                restrictionbyinsurance: this.hdfcTravel1.restrictionbyinsurance,
                restrictionbyinsurancedetails: this.hdfcTravel1.restrictionbyinsurancedetails,
                gst: this.hdfcTravel1.gst,
                sameAsProposer: this.hdfcTravel1.sameAsProposer,
                mobile: this.hdfcTravel1.mobile,
                ped: this.hdfcTravel1.ped,
                rolecd: this.hdfcTravel1.rolecd == null ? 'PROPOSER' : 'PROPOSER'

            });
            this.declinereason();
            this.restrictionReson();
        }
        if (sessionStorage.hdfcTravelDetails2 != '' && sessionStorage.hdfcTravelDetails2 != undefined) {
            this.hdfcTravel2 = JSON.parse(sessionStorage.hdfcTravelDetails2);
            for (let i = 0; i < this.hdfcTravel2.items.length; i++) {
                this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].InsTitle.patchValue(this.hdfcTravel2.items[i].InsTitle);
                this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].InsFirstName.patchValue(this.hdfcTravel2.items[i].InsFirstName);
                this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].InsLastName.patchValue(this.hdfcTravel2.items[i].InsLastName);
                this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].InsMiddleName.patchValue(this.hdfcTravel2.items[i].InsMiddleName);
                this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].InsGender.patchValue(this.hdfcTravel2.items[i].InsGender);
                this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].InsDOB.patchValue(this.hdfcTravel2.items[i].InsDOB);
                this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].InsuredRelation.patchValue(this.hdfcTravel2.items[i].InsuredRelation);
                this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].InsuredRelationName.patchValue(this.hdfcTravel2.items[i].InsuredRelationName);
                this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].InsuredAge.patchValue(this.hdfcTravel2.items[i].InsuredAge);
                this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue(this.hdfcTravel2.items[i].insurerDobValidError);
                this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue(this.hdfcTravel2.items[i].insurerDobError);
                this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].PassportNo.patchValue(this.hdfcTravel2.items[i].PassportNo);
                this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].sameAsProposer.patchValue(this.hdfcTravel2.items[i].sameAsProposer);
                this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].sameasreadonly.patchValue(this.hdfcTravel2.items[i].sameasreadonly);
                this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.patchValue(this.hdfcTravel2.items[i].ins_days);
                this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].ins_age.patchValue(this.hdfcTravel2.items[i].ins_age);
            }
            if (this.hdfcTravel2.items[0].sameAsProposer != '' && this.hdfcTravel2.items[0].sameAsProposer != undefined) {
                this.sameasInsurerDetails();
            }
        }
        let insuretravelDetails = this.totalInsureDetails;
        if (sessionStorage.hdfcTravelDetails3 != '' && sessionStorage.hdfcTravelDetails3 != undefined) {
            this.hdfcTravel3 = JSON.parse(sessionStorage.hdfcTravelDetails3);
            this.nomineeTravelDetails = this.fb.group({
                NomineeName: this.hdfcTravel3.NomineeName,
                NomineeRelation: this.hdfcTravel3.NomineeRelation,
                NomineeRelationName: this.hdfcTravel3.NomineeRelationName
            });
        }
        if (sessionStorage.hdfc_Travel_proposal_id != '' && sessionStorage.hdfc_Travel_proposal_id != undefined) {
            this.hdfc_Travel_proposal_id = sessionStorage.hdfc_Travel_proposal_id;
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

    // validation
    nameValidate(event: any){
        this.validation.nameValidate(event);
    }
    phyname(event: any){
        this.validation.phyname(event);
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

    nameValidateNospace(event: any){
        this.validation.nameValidateNospace(event);
    }
    passportval(i)
    {
        console.log(this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].PassportNo.value,'5678')
        if( this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].PassportNo.value != ''){
            this.passportany = false;
            this.passportany = '';
        }
        else{
            this.passportany = true;
            this.passportany = 'Pass Port is required'
        }

    }
    canDeactivate() {
        return this.hdfc_Travel_proposal_id;
    }
    initItemRows() {
        return this.fb.group(
            {
                InsTitle: ['', Validators.required],
                InsFirstName: new FormControl(''),
                InsLastName: new FormControl(''),
                InsMiddleName: new FormControl(''),
                InsDOB: ['', Validators.required],
                InsGender: ['', Validators.compose([Validators.required])],
                InsuredRelation: ['', Validators.required],
                InsuredRelationName: '',
                InsuredAge: '',
                insurerDobError: '',
                insurerDobValidError: '',
                PassportNo: '',
                rolecd: 'PRIMARY',
                type: '',
                ins_age: '',
                ins_days: '',
                sameAsProposer: false,
                sameasreadonly: false,

            }
        );
    }
    // title for proposer
    titleproposer() {
        const data = {
            'platform': 'web',
        };
        this.travelservice.titleListProposer(data).subscribe(
            (successData) => {
                this.titleSuccess(successData);
            },
            (error) => {
                this.titleFailure(error);
            }
        );
    }
    public titleSuccess(successData) {
        if (successData.IsSuccess) {
            this.titleList = successData.ResponseObject;

        }
    }
    public titleFailure(error) {
    }
    addEvent(event, type) {
        if (event.value != null) {
            let selectedDate = '';
            this.hdfcTravelproposerAge = '';
            let dob = '';
            if (typeof event.value._i == 'string') {
                const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
                if (pattern.test(event.value._i) && event.value._i.length == 10) {
                    this.personalDobError = '';

                } else {
                    this.personalDobError = 'Enter Valid Date';
                }

                selectedDate = event.value._i;
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                if (selectedDate.length == 10) {
                    this.hdfcTravelproposerAge = this.ageCalculate(dob);

                }

            } else if (typeof event.value._i == 'object') {
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                if (dob.length == 10) {
                    this.hdfcTravelproposerAge = this.ageCalculate(dob);
                }
                this.personalDobError = '';
            }

            sessionStorage.proposerAgeHdfcTravel = this.hdfcTravelproposerAge;
        }
    }
    addEventInsurer(event, i, type, name) {

        if (event.value != null) {
            let selectedDate = '';
            let dob = '';
            let dob_days = '';
            this.getAge = '';
            this.getDays;
            dob = this.datepipe.transform(event.value, 'y-MM-dd');
            dob_days = this.datepipe.transform(event.value, 'dd-MM-y');
            if (typeof event.value._i == 'string') {
                const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
                if (pattern.test(event.value._i) && event.value._i.length == 10) {
                    this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
                } else {
                    this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('Enter Valid Date');
                }
                selectedDate = event.value._i;
                console.log(selectedDate.length, 'selectedDateselectedDate');
                if (selectedDate.length == 10) {
                        // this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
                        // this.getAge = this.ageCalculate(dob);
                        // console.log(this.getAge,'ageeee');
                        // this.getDays = this.DobDaysCalculate(dob_days);
                        // console.log(this.getDays,'kjgjhagdjad');
                        // this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].InsuredAge.patchValue(this.getAge);
                        // this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].InsDOB.patchValue(dob);
                    this.getAge = this.ageCalculate(dob);
                    console.log(this.getAge,'agee');
                    this.getDays = this.DobDaysCalculate(dob_days);
                    this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].InsDOB.patchValue(dob);
                    this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].InsuredAge.patchValue(this.getAge);
                    this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
                    this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].ins_age.patchValue(this.getAge);
                    this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.patchValue(this.getDays);
                } else {
                    this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
                }
            }else if (typeof event.value._i == 'object') {
                this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
                if (dob.length == 10) {
                        this.getAge = this.ageCalculate(dob);
                        console.log(this.getAge,'agee');
                        this.getDays = this.DobDaysCalculate(dob_days);
                        this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].InsDOB.patchValue(dob);
                        this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].InsuredAge.patchValue(this.getAge);
                        this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
                        this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].ins_age.patchValue(this.getAge);
                        this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.patchValue(this.getDays);
                } else {
                    this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
                }
            }
            console.log(this.getAge, 'abcd');

            if(this.getAge >= 0) {
                this.ageValidation(i, type);
            } else {
                console.log("SDSDSDSDSd");
            }

        }

    }

    DobDaysCalculate(getDays) {
        let a = moment(getDays, 'DD/MM/YYYY');
        let b = moment(new Date(), 'DD/MM/YYYY');
        let days = b.diff(a, 'days');
        console.log(days, 'daysdays');
        return days;
    }
    ageValidation(i, type) {
        console.log(type,'hfgjfj');
        console.log(this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value,'valuuu');
        // if (this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value < 6574 || this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value >= 25931 && type == 'Self') {
        //     this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age should be 18 years to 70 years');
        //
        // } else if (this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value >= 6574 && this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value <= 25931 && type == 'Self') {
        //     this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        // }
        if(this.getEnquiryDetails.travel_user_type == 'family'){
            console.log('in');
            if((this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value < 6574 && type == 'Self') || (this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value > 22279 && type == 'Self')) {
                this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age should be 18 years to 60 years');
            } else if(this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value >= 6574 && type == 'Self')  {
                this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
            }
            if((this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value < 6574 && type == 'Spouse') || (this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value > 22279 && type == 'Spouse')) {
                this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age should be 18 years to 60 years');
            } else if(this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value >= 6574 && type == 'Spouse')  {
                this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
            }
            console.log(this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value);

            if(this.travelPurpose == 'Multi') {
                if ((parseInt(this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value) <= 8034 && parseInt(this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value) >= 6574) && (type == 'Child1' || type == 'Child2')) {
                    this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
                } else if (parseInt(this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value) < 6574 && (type == 'Child1' || type == 'Child2')) {
                    this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age should be 18 years');
                } else if (parseInt(this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value) > 8034 && (type == 'Child1' || type == 'Child2')) {
                    this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age should be 18 years');
                }

            } else {
                if ((parseInt(this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value) <= 8034 && parseInt(this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value) >= 91) && (type == 'Child1' || type == 'Child2')) {
                    this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
                } else if (parseInt(this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value) < 91 && (type == 'Child1' || type == 'Child2')) {
                    this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 91 days to 21 years');
                } else if (parseInt(this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value) > 8034 && (type == 'Child1' || type == 'Child2')) {
                    this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 91 days to 21 years');
                }
            }




        } else {
            if(this.travelPurpose == 'Multi') {
                if ((parseInt(this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value) < 6574 && type == 'Self')) {
                    this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age should be 18 years and above');
                } else if (parseInt(this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value) >= 6574 && type == 'Self') {
                    this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
                }

            } else {
                if ((parseInt(this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value) < 181 && type == 'Self') || (parseInt(this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value) > 25931 && type == 'Self')) {
                    this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age should be 6 months to 70 years');
                } else if (parseInt(this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value) > 180 && type == 'Self') {
                    this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
                }
            }


            // if((parseInt(this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value) < 6574 && type == 'Self') || (parseInt(this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value) > 25931 && type == 'Self')) {
            //     this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age should be 18 years to 70 years');
            // } else if(parseInt(this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value) >= 6574 && type == 'Self')  {
            //     this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
            // }
            // if((this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].ins_age.value < 6574 && type == 'Spouse') || (this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value > 25931 && type == 'Spouse')) {
            //     this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age should be 18 years to 70 years');
            // } else if(this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value >= 6574 && type == 'Spouse')  {
            //     this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
            // }
        }




        //
        // if (this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value <= 6574 && this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value >= 25931 && type == 'Spouse') {
        //     this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age should be 18 years to 70 years');
        // } else if (this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value >= 6574 && this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value <= 25931 && type == 'Spouse') {
        //     this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        // }

    }

    selectRelation(i){
        this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].InsuredRelationName.patchValue(this.insuredRelationshipDetails[this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].InsuredRelation.value])
        console.log(this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].InsuredRelationName.value,'insurancessssss')
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
    declinereason() {
        if (this.hdfcTravel.controls['declineinsurance'].value == 'True') {
            this.declinedetails = true;
            this.hdfcTravel.controls['declineReson'].setValidators([Validators.required]);

        } else {
            this.declinedetails = false;
            this.hdfcTravel.controls['declineReson'].setValidators(null);
            this.hdfcTravel.controls['declineReson'].patchValue('');


        }
    }

    restrictionReson() {
        if (this.hdfcTravel.controls['restrictionbyinsurance'].value == 'True') {
            this.restrictiondetails = true;
            this.hdfcTravel.controls['restrictionbyinsurancedetails'].setValidators([Validators.required]);
        } else {
            this.restrictiondetails = false;
            this.hdfcTravel.controls['restrictionbyinsurancedetails'].setValidators(null);
            this.hdfcTravel.controls['restrictionbyinsurancedetails'].patchValue('');

        }
    }

    topScroll() {
        document.getElementById('main-content').scrollTop = 0;
    }

    // pincode validation

    pincodevalidationHdfc(pin) {
        if (pin == '') {
            this.pincodeValid = true;
        }
        const data = {
            'platform': 'web',
            'user_id': '0',
            'role_id': '4',
            'Pincode': pin
        };
        if (pin.length == 6) {
            this.travelservice.pincodevalidate(data).subscribe(
                (successData) => {
                    this.pincodeSuccess(successData);
                },
                (error) => {
                    this.pincodeFailure(error);
                }
            );
        }
    }
    public pincodeSuccess(successData) {
        if (successData.IsSuccess) {
            this.pincodeValid = true;
        } else {
            this.pincodeValid = false;
            this.toastr.error(successData.ErrorObject);
        }
        sessionStorage.pincodeValid = this.pincodeValid;
    }

    public pincodeFailure(successData) {
    }

    getStateList() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId(),
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0'
        }
        this.travelservice.statevalidate(data).subscribe(
            (successData) => {
                this.getStateSuccess(successData);
            },
            (error) => {
                this.getStateFailure(error);
            }
        );
    }

    public getStateSuccess(successData) {
        if (successData.IsSuccess) {
            this.hdfcTravelStates = successData.ResponseObject;
        }
    }

    public getStateFailure(error) {
    }

    getCityList(value) {
        this.hdfcTravel.controls['stateName'].patchValue(this.hdfcTravelStates[this.hdfcTravel.controls['state'].value]);
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId(),
            'state_id': this.hdfcTravel.controls['state'].value,
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0'
        }
        this.travelservice.cityvalidate(data).subscribe(
            (successData) => {
                this.getCitySuccess(successData);
            },
            (error) => {
                this.getCityFailure(error);
            }
        );
    }

    public getCitySuccess(successData) {
        if (successData.IsSuccess) {
            this.hdfcTravelCity = successData.ResponseObject;
            sessionStorage.hdfcTravelCity = JSON.stringify(this.hdfcTravelCity);
        }
    }

    public getCityFailure(error) {
    }
    selectCity() {
        this.hdfcTravel.controls['cityName'].patchValue(this.hdfcTravelCity[this.hdfcTravel.controls['city'].value]);
    }

    // get ped list
    getPedList() {
        const data = {
            'platform': 'web',
        }
        this.travelservice.pedList(data).subscribe(
            (successData) => {
                this.getPedSuccess(successData);
            },
            (error) => {
                this.getPedFailure(error);
            }
        );
    }
    public getPedSuccess(successData) {
        if (successData.IsSuccess) {
            this.getpedDetails = successData.ResponseObject;
        }
    }
    public getPedFailure(error) {
    }

    // insured relationship
    insuredRelationshipList() {
        const data = {
            'platform': 'web',
        }
        this.travelservice.realtionshipList(data).subscribe(
            (successData) => {
                this.insuredRelationshipListSuccess(successData);
            },
            (error) => {
                this.insuredRelationshipListFailure(error);
            }
        );
    }

    public insuredRelationshipListSuccess(successData) {
        if (successData.IsSuccess) {
            this.insuredRelationshipDetails = successData.ResponseObject;
        }
    }

    public insuredRelationshipListFailure(error) {
    }
 changePed(){
     this.pedValid = true;
        for(let i = 0; i < this.getpedDetails.length; i++) {
            if(this.getpedDetails[i].pedid == this.hdfcTravel.controls.ped.value) {
                if(this.getpedDetails[i].isAcceptable == '0') {
                   this.pedValid = false;
                }
            }
        }
        sessionStorage.pedValid = this.pedValid;

    }
    // insured relationship
    nomineeRelationshipList() {
        const data = {
            'platform': 'web',
        }
        this.travelservice.nomineerealtionshipList(data).subscribe(
            (successData) => {
                this.nomineeRelationshipListSuccess(successData);
            },
            (error) => {
                this.nomineeRelationshipListFailure(error);
            }
        );
    }

    public nomineeRelationshipListSuccess(successData) {
        if (successData.IsSuccess) {
            this.nomineeRelationshipDetails = successData.ResponseObject;
        }

    }

    public nomineeRelationshipListFailure(error) {
    }

    // proposer Details
    proposerDetails(stepper: MatStepper, value) {
        sessionStorage.hdfcTravelDetails1 = '';
        sessionStorage.hdfcTravelDetails1 = JSON.stringify(value);
        if (this.hdfcTravel.valid) {
            if (sessionStorage.proposerAgeHdfcTravel >= 18) {
                if (sessionStorage.pedValid == true || sessionStorage.pedValid == 'true') {
                    stepper.next();
                    this.nextStep();

                } else {
                    this.toastr.error('Existing Disease should Not allow For this insurance');
                }

            } else {
                this.toastr.error('Proposer age should be 18 or above');
            }

        }
    }
// insured Details
    InsureDetails(stepper: MatStepper, value) {
        sessionStorage.hdfcTravelDetails2 = '';
        sessionStorage.hdfcTravelDetails2 = JSON.stringify(value);
        this.insuredTravelData = value;
        if (this.hdfcInsuredTravel.valid) {
            stepper.next();
            this.nextStep();

        }
        if(this.insuredTravelPerson.length == 1){
            this.sameRelationship = this.hdfcInsuredTravel['controls'].items['controls'][0]['controls'].InsuredRelation.value;
        }
        console.log(this.sameRelationship,'this.sameRelationshipthis.sameRelationship');
    }

    // nominee Details
    nomineeDetails(stepper: MatStepper, value) {
        sessionStorage.hdfcTravelDetails3 = '';
        sessionStorage.hdfcTravelDetails3 = JSON.stringify(value);
        if(this.nomineeTravelDetails.valid){
                this.createProposal(stepper);
                this.lastStepper = stepper;
        }

    }
    selectNomineRelation() {
        // this.nomineeTravelDetails.controls['NomineeRelationName'].patchValue(this.nomineeRelationshipDetails[this.nomineeTravelDetails.controls['NomineeRelation'].value]);
    }

    sameasInsurerDetails() {

        if (this.hdfcInsuredTravel['controls'].items['controls'][0]['controls'].sameAsProposer.value) {
            this.hdfcInsuredTravel['controls'].items['controls'][0]['controls'].sameasreadonly.patchValue(true);
            this.hdfcInsuredTravel['controls'].items['controls'][0]['controls'].InsTitle.patchValue(this.hdfcTravel.controls['title'].value);
            this.hdfcInsuredTravel['controls'].items['controls'][0]['controls'].InsFirstName.patchValue(this.hdfcTravel.controls['firstname'].value);
            this.hdfcInsuredTravel['controls'].items['controls'][0]['controls'].InsLastName.patchValue(this.hdfcTravel.controls['lastname'].value);
            this.hdfcInsuredTravel['controls'].items['controls'][0]['controls'].InsMiddleName.patchValue(this.hdfcTravel.controls['middlename'].value);
            this.hdfcInsuredTravel['controls'].items['controls'][0]['controls'].InsGender.patchValue(this.hdfcTravel.controls['gender'].value);
            this.hdfcInsuredTravel['controls'].items['controls'][0]['controls'].InsDOB.patchValue(this.datepipe.transform(this.hdfcTravel.controls['dob'].value, 'y-MM-dd'));
            let age = this.ageCalculate(this.datepipe.transform(this.hdfcTravel.controls['dob'].value, 'y-MM-dd'));
            this.hdfcInsuredTravel['controls'].items['controls'][0]['controls'].InsuredAge.patchValue(age);
            this.hdfcInsuredTravel['controls'].items['controls'][0]['controls'].InsuredRelation.patchValue('Self');
            // this.hdfcInsuredTravel['controls'].items['controls'][0]['controls'].InsuredRelationName.patchValue(this.insuredRelationshipDetails['Self']);
            if(age >= 18 ||age <= 70 ) {
                this.hdfcInsuredTravel['controls'].items['controls'][0]['controls'].insurerDobError.patchValue('');
            }
        } else {
            this.hdfcInsuredTravel['controls'].items['controls'][0]['controls'].sameasreadonly.patchValue(false);

            this.hdfcInsuredTravel['controls'].items['controls'][0]['controls'].InsTitle.patchValue('');
            this.hdfcInsuredTravel['controls'].items['controls'][0]['controls'].InsFirstName.patchValue('');
            this.hdfcInsuredTravel['controls'].items['controls'][0]['controls'].InsLastName.patchValue('');
            this.hdfcInsuredTravel['controls'].items['controls'][0]['controls'].InsMiddleName.patchValue('');
            this.hdfcInsuredTravel['controls'].items['controls'][0]['controls'].InsGender.patchValue('');
            this.hdfcInsuredTravel['controls'].items['controls'][0]['controls'].InsDOB.patchValue('');
            this.hdfcInsuredTravel['controls'].items['controls'][0]['controls'].InsuredRelation.patchValue('');
            this.hdfcInsuredTravel['controls'].items['controls'][0]['controls'].InsuredAge.patchValue('');
            this.hdfcInsuredTravel['controls'].items['controls'][0]['controls'].InsuredRelationName.patchValue('');
            this.hdfcInsuredTravel['controls'].items['controls'][0]['controls'].insurerDobError.patchValue('');

        }


    }



    // proposal craetion
    createProposal(stepper) {

        let insuretravelDetails = this.totalInsureDetails;
        for (let i = 0; i < this.insuredTravelData.items.length; i++) {
            this.insuredTravelData.items[i].NomineeName = this.nomineeTravelDetails.controls['NomineeName'].value;
            this.insuredTravelData.items[i].NomineeRelation = this.nomineeTravelDetails.controls['NomineeRelation'].value;
        }
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
            'enquiry_id': this.getTravelPremiumList.enquiry_id,
            'product_id': this.getTravelPremiumList.product_id,
            'plan_name': this.getTravelPremiumList.plan_name,
            'sum_insured_amount': this.getTravelPremiumList.sum_insured_amount,
            'proposal_id': sessionStorage.hdfc_Travel_proposal_id ? sessionStorage.hdfc_Travel_proposal_id : this.hdfc_Travel_proposal_id,
            "InsuranceDetails": {
                "PlanDetails": {
                    'TotalSumInsured': this.getTravelPremiumList.sum_insured_amount,//From main page
                    'PlanCd': this.getTravelPremiumList.plan_id,
                    'DepartureDate': this.getEnquiryDetails.start_date,
                    'ArrivalDate': this.getEnquiryDetails.end_date,
                    'TravelDays': this.getEnquiryDetails.day_count.toString(),
                    'purposeofvisitcd': sessionStorage.travelType,
                    'PlacesVisitedCd':this.getEnquiryDetails.travel_place.toString(),
                    'NoOfAdults': this.getEnquiryDetails.adult_count,
                    'NoOfKids': this.getEnquiryDetails.child_count,
                    'FloaterPlan': this.getEnquiryDetails.scheme,
                    'DependentParent': "None",
                    'NoOfAdditionalKids': "0"
                },
                "PaymentDetails": {
                    'PaymentOption': this.hdfcTravel.controls['paymentmode'].value,
                },
                "CustDetails": {
                    'Title': this.hdfcTravel.controls['title'].value,
                    'FirstName': this.hdfcTravel.controls['firstname'].value,
                    'MiddleName': this.hdfcTravel.controls['middlename'].value,
                    'LastName': this.hdfcTravel.controls['lastname'].value,
                    'DOB': this.datepipe.transform(this.hdfcTravel.controls['dob'].value, 'y-MM-dd'),
                    'Gender': this.hdfcTravel.controls['gender'].value,
                    'Address1': this.hdfcTravel.controls['address1'].value,
                    'Address2': this.hdfcTravel.controls['address2'].value,
                    'Address3': this.hdfcTravel.controls['address3'].value,
                    'StateCode': this.hdfcTravel.controls['state'].value,
                    'CityCode': this.hdfcTravel.controls['city'].value,
                    'Pincode': this.hdfcTravel.controls['pincode'].value,
                    'STDCodeResi': this.hdfcTravel.controls['stdcode'].value,
                    'TelResi': this.hdfcTravel.controls['telephoneNo'].value,
                    'STDCodeOff': this.hdfcTravel.controls['stdcodeoffice'].value,
                    'TelOff': this.hdfcTravel.controls['telephoneNooffice'].value,
                    'MobileNumber': this.hdfcTravel.controls['mobile'].value,
                    'OverseasNo': "",
                    'Email': this.hdfcTravel.controls['email'].value,
                    'ExistingAliments': this.hdfcTravel.controls['ped'].value,
                    'PhysicianName': this.hdfcTravel.controls['physicianName'].value,
                    'PhysicianNo': this.hdfcTravel.controls['physicianMobile'].value,
                    'DeclineInsurance': this.hdfcTravel.controls['declineinsurance'].value,
                    'DeclineReason': this.hdfcTravel.controls['declineReson'].value,
                    'RestrictionByIns': this.hdfcTravel.controls['restrictionbyinsurance'].value,
                    'RestrictionByInsDetails': this.hdfcTravel.controls['restrictionbyinsurancedetails'].value,
                    'GSTINNO': this.hdfcTravel.controls['gst'].value,
                    'IsCustomerAuthenticationDone': "1",
                    'AuthenticationType': "OTP",
                    'UIDNo': "",
                    'IsProposerSameAsInsured': this.hdfcInsuredTravel['controls'].items['controls'][0]['controls'].sameAsProposer.value.toString(),
                    'IsCustomerAcceptedPED': sessionStorage.pedValid == undefined || sessionStorage.pedValid == '' ? 'false' : sessionStorage.pedValid
                },
                "Member": {
                    "InsuredDetails": this.insuredTravelData.items

                }
            }
        }
        this.settings.loadingSpinner = true;
        this.travelservice.createHdfcTravelProposal(data).subscribe(
            (successData) => {
                this.proposalSuccess(successData,stepper);
            },

            (error) => {
                this.proposalFailure(error);
            }
        );
    }

    public proposalSuccess(successData,stepper) {
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess == true) {
            stepper.next();
            this.nextStep();
            this.toastr.success('Proposal created successfully!!');
            this.summaryData = successData.ResponseObject;
            console.log(this.summaryData,'summary....')
            this.PaymentActionUrl = this.summaryData.PaymentActionUrl;
            console.log(this.PaymentActionUrl,'payyyyyy')
            sessionStorage.summaryData = JSON.stringify(this.summaryData);
            this.proposerFormData = this.hdfcTravel.value;
            // this.productcode = this.hdfcTravel.value;
            this.insuredFormData = this.hdfcInsuredTravel.value.items;
            this.nomineeFormData = this.nomineeTravelDetails.value;
            this.fullName = this.proposerFormData.firstname + ' ' + this.proposerFormData.lastname;
            this.totalAmount = parseFloat(this.summaryData.totalPremium);
            sessionStorage.hdfc_Travel_proposal_id = successData.ResponseObject.ProposalId;
            this.hdfc_Travel_proposal_id = successData.ResponseObject.ProposalId;


            console.log(this.proposerFormData, 'p');
            console.log(this.insuredFormData, 'i');
            console.log(this.nomineeFormData, 'n');
            sessionStorage.proposerFormData = JSON.stringify(this.proposerFormData);
            sessionStorage.insuredFormData = JSON.stringify(this.insuredFormData);
            sessionStorage.nomineeFormData = JSON.stringify(this.nomineeFormData);
            console.log(this.summaryData, 'summary datat');
            console.log(this.summaryData.productcode, 'summary datat');
            // console.log(this.productcode, 'summary datat');
            console.log(this.proposerFormData, 'this.proposerFormData');
            console.log(this.fullName, 'summary datat');
            console.log(this.totalAmount, ' totalAmount');
            console.log(this.summaryData.ProposalNumber,'proposal num')



        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }

    public proposalFailure(error) {

    }

    // pay Later
    payLater(){
        let insuretravelDetails = this.totalInsureDetails;
        for (let i = 0; i < this.insuredTravelData.items.length; i++) {
            this.insuredTravelData.items[i].NomineeName = this.nomineeTravelDetails.controls['NomineeName'].value;
            this.insuredTravelData.items[i].NomineeRelation = this.nomineeTravelDetails.controls['NomineeRelation'].value;
        }
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
            'enquiry_id': this.getTravelPremiumList.enquiry_id,
            'product_id': this.getTravelPremiumList.product_id,
            'plan_name': this.getTravelPremiumList.plan_name,
            'sum_insured_amount': this.getTravelPremiumList.sum_insured_amount,
            'proposal_id': sessionStorage.hdfc_Travel_proposal_id ? sessionStorage.hdfc_Travel_proposal_id : this.hdfc_Travel_proposal_id,
            "InsuranceDetails": {
                "PlanDetails": {
                    'TotalSumInsured': this.getTravelPremiumList.sum_insured_amount,//From main page
                    'PlanCd': this.getTravelPremiumList.plan_id,
                    'DepartureDate': this.getEnquiryDetails.start_date,
                    'ArrivalDate': this.getEnquiryDetails.end_date,
                    'TravelDays': this.getEnquiryDetails.day_count.toString(),
                    'purposeofvisitcd': sessionStorage.travelType,
                    'PlacesVisitedCd':this.getEnquiryDetails.travel_place.toString(),
                    'NoOfAdults': this.getEnquiryDetails.adult_count,
                    'NoOfKids': this.getEnquiryDetails.child_count,
                    'FloaterPlan': this.getEnquiryDetails.scheme,
                    'DependentParent': "None",
                    'NoOfAdditionalKids': "0"
                },
                "PaymentDetails": {
                    'PaymentOption': this.hdfcTravel.controls['paymentmode'].value,
                },
                "CustDetails": {
                    'Title': this.hdfcTravel.controls['title'].value,
                    'FirstName': this.hdfcTravel.controls['firstname'].value,
                    'MiddleName': this.hdfcTravel.controls['middlename'].value,
                    'LastName': this.hdfcTravel.controls['lastname'].value,
                    'DOB': this.datepipe.transform(this.hdfcTravel.controls['dob'].value, 'y-MM-dd'),
                    'Gender': this.hdfcTravel.controls['gender'].value,
                    'Address1': this.hdfcTravel.controls['address1'].value,
                    'Address2': this.hdfcTravel.controls['address2'].value,
                    'Address3': this.hdfcTravel.controls['address3'].value,
                    'StateCode': this.hdfcTravel.controls['state'].value,
                    'CityCode': this.hdfcTravel.controls['city'].value,
                    'Pincode': this.hdfcTravel.controls['pincode'].value,
                    'STDCodeResi': this.hdfcTravel.controls['stdcode'].value,
                    'TelResi': this.hdfcTravel.controls['telephoneNo'].value,
                    'STDCodeOff': this.hdfcTravel.controls['stdcodeoffice'].value,
                    'TelOff': this.hdfcTravel.controls['telephoneNooffice'].value,
                    'MobileNumber': this.hdfcTravel.controls['mobile'].value,
                    'OverseasNo': "",
                    'Email': this.hdfcTravel.controls['email'].value,
                    'ExistingAliments': this.hdfcTravel.controls['ped'].value,
                    'PhysicianName': this.hdfcTravel.controls['physicianName'].value,
                    'PhysicianNo': this.hdfcTravel.controls['physicianMobile'].value,
                    'DeclineInsurance': this.hdfcTravel.controls['declineinsurance'].value,
                    'DeclineReason': this.hdfcTravel.controls['declineReson'].value,
                    'RestrictionByIns': this.hdfcTravel.controls['restrictionbyinsurance'].value,
                    'RestrictionByInsDetails': this.hdfcTravel.controls['restrictionbyinsurancedetails'].value,
                    'GSTINNO': this.hdfcTravel.controls['gst'].value,
                    'IsCustomerAuthenticationDone': "1",
                    'AuthenticationType': "OTP",
                    'UIDNo': "",
                    'IsProposerSameAsInsured': this.hdfcInsuredTravel['controls'].items['controls'][0]['controls'].sameAsProposer.value.toString(),
                    'IsCustomerAcceptedPED': sessionStorage.pedValid == undefined || sessionStorage.pedValid == '' ? 'false' : sessionStorage.pedValid
                },
                "Member": {
                    "InsuredDetails": this.insuredTravelData.items

                }
            }
        }
        console.log(data, 'payyyyy');
        this.settings.loadingSpinner = true;
        this.proposalservice.proposalPayLater(data).subscribe(
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
            // this.toastr.error('sorry!');
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
            'proposal_id': this.proposalId
        };
        this.proposalservice.proposalGetRequest(data).subscribe(
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
            this.pos_status = this.requestDetails.role_id;
            console.log(this.pos_status, 'this.pos_status');
            this.requestCustomerDetails = this.requestDetails.InsuranceDetails.CustDetails;
            // this.requestInsuredDetails = this.requestDetails.InsuranceDetails.Member.InsuredDetails;
            // this.fullName = this.requestCustomerDetails.ApplFirstName +' '+ this.requestCustomerDetails.ApplLastName;
            // this.totalAmount = parseFloat(this.requestDetails.sum_insured_amount);
            // console.log(this.requestInsuredDetails, 'hgghjghjgjh');
            // this.PaymentActionUrl = this.requestDetails.PaymentActionUrl;
            // this.ProposalNumber = this.requestDetails.ProposalNumber;
            // this.AdditionalInfo1 = this.requestDetails.AdditionalInfo1;
            // this.AdditionalInfo2 = this.requestDetails.AdditionalInfo2;
            // this.AdditionalInfo3 = this.requestDetails.AdditionalInfo3;
            // this.ProductCd = this.requestDetails.ProductCd;
            // this.productcode = this.requestDetails.productcode;
            // this.returnURL = this.requestDetails.returnURL;
            // this.paymentmode = this.requestDetails.InsuranceDetails.PaymentDetails.PaymentMode;
            // this.email = this.requestCustomerDetails.EmailId;
            // console.log(this.email, 'this.email');
            // console.log(this.paymentmode, 'this.paymentmode');
        }
    }
    public getBackResFailure(successData) {
    }
}
