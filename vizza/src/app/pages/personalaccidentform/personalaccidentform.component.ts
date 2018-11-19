import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProposalService} from '../../shared/services/proposal.service';
import {DatePipe} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {AppSettings} from '../../app.settings';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDialog, MatStepper} from '@angular/material';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {CommonService} from '../../shared/services/common.service';
import {AuthService} from '../../shared/services/auth.service';
import {HttpClient} from '@angular/common/http';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {Settings} from '../../app.settings.model';
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
  selector: 'app-personalaccidentform',
  templateUrl: './personalaccidentform.component.html',
  styleUrls: ['./personalaccidentform.component.scss'],
    providers: [

        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
})

export class PersonalaccidentformComponent implements OnInit {
    public personal: FormGroup;
    public summary: FormGroup;
    public nomineeDetails: FormGroup;
    public items: FormArray;
    public setDate: any;
    public selectDate: any;
    public stopNext: boolean;
    public buyPersonaldetails: any;
    public groupName: any;
    public getFamilyDetails: any;
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
    public getNomineeData: any;
    public index: any;
    public previousinsurance: any;
    public previousInsuranceStatus: any;
    public previousInsuranceStatus1: any;
    public hideQuestion: any;
    public getFilterData: any;
    public questions_list: any;
    public totalData: any;
    public iPersonalCitys: any;
    public iResidenceCitys: any;
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
    public familyMembers: any;
    buyProductdetails: any;

    constructor(private fb: FormBuilder, public proposalservice: ProposalService, public datepipe: DatePipe, private toastr: ToastrService, public appSettings: AppSettings, public dialog: MatDialog,
                public config: ConfigurationService, public common: CommonService, public auth: AuthService, public http: HttpClient, @Inject(LOCALE_ID) private locale: string) {
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
        this.proposalId = 0;
        this.step = 0;
        this.mobileNumber = 'true';
        this.inputReadonly = false;
        this.sameField = false;
        this.isDisable = false;
        this.insureCity = false;
        this.proposerInsureData = [];
        this.questions_list = [];
        this.arr = [];
        this.personal = this.fb.group({
            personalTitle: ['', Validators.required],
            personalFirstname: new FormControl(''),
            personalLastname: ['', Validators.required],
            personalGender: ['', Validators.compose([Validators.required])],
            personalDob: ['', Validators.compose([Validators.required])],
            personalrelationship: 'SELF',
            personalAadhar: ['', Validators.compose([Validators.minLength(12)])],
            personalPan: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
            personalGst: ['', Validators.compose([Validators.minLength(15)])],
            personalAddress: ['', Validators.required],
            personalAddress2: ['', Validators.required],
            personalPincode: ['', Validators.required],
            personalCity: ['', Validators.required],
            personalState: ['', Validators.required],
            personalEmail: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
            personalMobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
            personalAltnumber: '',
            residenceAddress: ['', Validators.required],
            residenceAddress2: [''],
            residencePincode: ['', Validators.required],
            residenceCity: ['', Validators.required],
            residenceState: ['', Validators.required],
            sameas: false,
            rolecd: 'PROPOSER',
            type: '',
            medical_status: 'No'

        });
        this.nomineeDetails = this.fb.group({
            'religareNomineeName': '',
            'religareRelationship': ''
        });


        console.log(this.totalData);

    }

    changeGender() {
        if (this.personal.controls['personalTitle'].value == 'MR') {
            this.personal.controls['personalGender'].patchValue('Male');
        } else {
            this.personal.controls['personalGender'].patchValue('Female');
        }
    }


    ngOnInit() {
        this.buyProductdetails = {
            "product_id": "6",
            "product_name": "Mediclassic Individual",
            "premium_id": "1995",
            "premium_amount": "5080.00",
            "scheme": "1A",
            "suminsured_amount": "500000.00",
            "tenure": "1",
            "suminsured_id": "5",
            "prod_shortform": "MCINEW",
            "company_logo": "api/assets/images/starhealth_logo.png",
            "company_name": "Star Health",
            "type_name": "Health",
            "indiv_shortlist_status": false,
            "shortlist_status": false,
            "key_features": [{
                "key_features_name": "Copay",
                "key_features_value": "No-Cap*",
                "kf_info": "",
                "key_feature_status": "1"
            }, {
                "key_features_name": "Room Rent",
                "key_features_value": "Rs.5,000/day",
                "kf_info": "",
                "key_feature_status": "1"
            }, {
                "key_features_name": "Pre Existing Disease",
                "key_features_value": "Covered after 48 months",
                "kf_info": "",
                "key_feature_status": "1"
            }, {
                "key_features_name": "Pre Hospitalization",
                "key_features_value": "Up to 30 days",
                "kf_info": "",
                "key_feature_status": "1"
            }, {
                "key_features_name": "Post Hospitalization",
                "key_features_value": "Up to 60 days",
                "kf_info": "",
                "key_feature_status": "1"
            }],
            "compare": false,
            "shortlist": false
        }
        this.setOccupationListCode();
        this.setOccupationList();
        this.setRelationship();
        this.getFamilyDetails = {
            "name": "Group A",
            "postal_code": "608001",
            "insurance_type": "1",
            "purchase_status": "0",
            "product_lists": [{
                "product_id": "1",
                "product_name": "Care V2",
                "premium_id": "2",
                "premium_amount": "3739.00",
                "scheme": "1A",
                "suminsured_amount": "300000.00",
                "tenure": "1",
                "suminsured_id": null,
                "prod_shortform": null,
                "company_logo": "api/assets/images/religare_logo.png",
                "company_name": "Religare",
                "type_name": "Health",
                "indiv_shortlist_status": false,
                "shortlist_status": false,
                "key_features": [{
                    "key_features_name": "Copay",
                    "key_features_value": "20%",
                    "kf_info": "",
                    "key_feature_status": "0"
                }, {
                    "key_features_name": "Pre Hospitalization",
                    "key_features_value": "Upto 30 days",
                    "kf_info": "",
                    "key_feature_status": "1"
                }, {
                    "key_features_name": "Room Rent",
                    "key_features_value": "Acc. To SI**",
                    "kf_info": "1. If SI is 3-4 L - 1% of SI\r\n2. If SI is 5-10 L - Single Private Room.\r\n3. If SI is 15-75 L - Single Private Room, Upgradable to next level",
                    "key_feature_status": "1"
                }, {
                    "key_features_name": "Post Hospitalization",
                    "key_features_value": "Upto 60 days",
                    "kf_info": "",
                    "key_feature_status": "1"
                }, {
                    "key_features_name": "Pre Existing Disease",
                    "key_features_value": "2 Years waiting period",
                    "kf_info": "",
                    "key_feature_status": "1"
                }]
            }, {
                "product_id": "1",
                "product_name": "Care V2",
                "premium_id": "13",
                "premium_amount": "4187.00",
                "scheme": "1A",
                "suminsured_amount": "400000.00",
                "tenure": "1",
                "suminsured_id": null,
                "prod_shortform": null,
                "company_logo": "api/assets/images/religare_logo.png",
                "company_name": "Religare",
                "type_name": "Health",
                "indiv_shortlist_status": false,
                "shortlist_status": false,
                "key_features": [{
                    "key_features_name": "Copay",
                    "key_features_value": "20%",
                    "kf_info": "",
                    "key_feature_status": "0"
                }, {
                    "key_features_name": "Pre Hospitalization",
                    "key_features_value": "Upto 30 days",
                    "kf_info": "",
                    "key_feature_status": "1"
                }, {
                    "key_features_name": "Room Rent",
                    "key_features_value": "Acc. To SI**",
                    "kf_info": "1. If SI is 3-4 L - 1% of SI\r\n2. If SI is 5-10 L - Single Private Room.\r\n3. If SI is 15-75 L - Single Private Room, Upgradable to next level",
                    "key_feature_status": "1"
                }, {
                    "key_features_name": "Post Hospitalization",
                    "key_features_value": "Upto 60 days",
                    "kf_info": "",
                    "key_feature_status": "1"
                }, {
                    "key_features_name": "Pre Existing Disease",
                    "key_features_value": "2 Years waiting period",
                    "kf_info": "",
                    "key_feature_status": "1"
                }]
            }, {
                "product_id": "1",
                "product_name": "Care V2",
                "premium_id": "24",
                "premium_amount": "5140.00",
                "scheme": "1A",
                "suminsured_amount": "500000.00",
                "tenure": "1",
                "suminsured_id": null,
                "prod_shortform": null,
                "company_logo": "api/assets/images/religare_logo.png",
                "company_name": "Religare",
                "type_name": "Health",
                "indiv_shortlist_status": false,
                "shortlist_status": false,
                "key_features": [{
                    "key_features_name": "Copay",
                    "key_features_value": "20%",
                    "kf_info": "",
                    "key_feature_status": "0"
                }, {
                    "key_features_name": "Pre Hospitalization",
                    "key_features_value": "Upto 30 days",
                    "kf_info": "",
                    "key_feature_status": "1"
                }, {
                    "key_features_name": "Room Rent",
                    "key_features_value": "Acc. To SI**",
                    "kf_info": "1. If SI is 3-4 L - 1% of SI\r\n2. If SI is 5-10 L - Single Private Room.\r\n3. If SI is 15-75 L - Single Private Room, Upgradable to next level",
                    "key_feature_status": "1"
                }, {
                    "key_features_name": "Post Hospitalization",
                    "key_features_value": "Upto 60 days",
                    "kf_info": "",
                    "key_feature_status": "1"
                }, {
                    "key_features_name": "Pre Existing Disease",
                    "key_features_value": "2 Years waiting period",
                    "kf_info": "",
                    "key_feature_status": "1"
                }]
            }, {
                "product_id": "6",
                "product_name": "Mediclassic Individual",
                "premium_id": "1975",
                "premium_amount": "4000.00",
                "scheme": "1A",
                "suminsured_amount": "300000.00",
                "tenure": "1",
                "suminsured_id": "3",
                "prod_shortform": "MCINEW",
                "company_logo": "api/assets/images/starhealth_logo.png",
                "company_name": "Star Health",
                "type_name": "Health",
                "indiv_shortlist_status": false,
                "shortlist_status": false,
                "key_features": [{
                    "key_features_name": "Copay",
                    "key_features_value": "No-Cap*",
                    "kf_info": "",
                    "key_feature_status": "1"
                }, {
                    "key_features_name": "Room Rent",
                    "key_features_value": "Rs.5,000/day",
                    "kf_info": "",
                    "key_feature_status": "1"
                }, {
                    "key_features_name": "Pre Existing Disease",
                    "key_features_value": "Covered after 48 months",
                    "kf_info": "",
                    "key_feature_status": "1"
                }, {
                    "key_features_name": "Pre Hospitalization",
                    "key_features_value": "Up to 30 days",
                    "kf_info": "",
                    "key_feature_status": "1"
                }, {
                    "key_features_name": "Post Hospitalization",
                    "key_features_value": "Up to 60 days",
                    "kf_info": "",
                    "key_feature_status": "1"
                }]
            }, {
                "product_id": "6",
                "product_name": "Mediclassic Individual",
                "premium_id": "1985",
                "premium_amount": "4515.00",
                "scheme": "1A",
                "suminsured_amount": "400000.00",
                "tenure": "1",
                "suminsured_id": "4",
                "prod_shortform": "MCINEW",
                "company_logo": "api/assets/images/starhealth_logo.png",
                "company_name": "Star Health",
                "type_name": "Health",
                "indiv_shortlist_status": false,
                "shortlist_status": false,
                "key_features": [{
                    "key_features_name": "Copay",
                    "key_features_value": "No-Cap*",
                    "kf_info": "",
                    "key_feature_status": "1"
                }, {
                    "key_features_name": "Room Rent",
                    "key_features_value": "Rs.5,000/day",
                    "kf_info": "",
                    "key_feature_status": "1"
                }, {
                    "key_features_name": "Pre Existing Disease",
                    "key_features_value": "Covered after 48 months",
                    "kf_info": "",
                    "key_feature_status": "1"
                }, {
                    "key_features_name": "Pre Hospitalization",
                    "key_features_value": "Up to 30 days",
                    "kf_info": "",
                    "key_feature_status": "1"
                }, {
                    "key_features_name": "Post Hospitalization",
                    "key_features_value": "Up to 60 days",
                    "kf_info": "",
                    "key_feature_status": "1"
                }]
            }, {
                "product_id": "6",
                "product_name": "Mediclassic Individual",
                "premium_id": "1995",
                "premium_amount": "5080.00",
                "scheme": "1A",
                "suminsured_amount": "500000.00",
                "tenure": "1",
                "suminsured_id": "5",
                "prod_shortform": "MCINEW",
                "company_logo": "api/assets/images/starhealth_logo.png",
                "company_name": "Star Health",
                "type_name": "Health",
                "indiv_shortlist_status": false,
                "shortlist_status": false,
                "key_features": [{
                    "key_features_name": "Copay",
                    "key_features_value": "No-Cap*",
                    "kf_info": "",
                    "key_feature_status": "1"
                }, {
                    "key_features_name": "Room Rent",
                    "key_features_value": "Rs.5,000/day",
                    "kf_info": "",
                    "key_feature_status": "1"
                }, {
                    "key_features_name": "Pre Existing Disease",
                    "key_features_value": "Covered after 48 months",
                    "kf_info": "",
                    "key_feature_status": "1"
                }, {
                    "key_features_name": "Pre Hospitalization",
                    "key_features_value": "Up to 30 days",
                    "kf_info": "",
                    "key_feature_status": "1"
                }, {
                    "key_features_name": "Post Hospitalization",
                    "key_features_value": "Up to 60 days",
                    "kf_info": "",
                    "key_feature_status": "1"
                }]
            }, {
                "product_id": "9",
                "product_name": "Star Comprehensive Individual",
                "premium_id": "3210",
                "premium_amount": "7015.00",
                "scheme": "1A",
                "suminsured_amount": "500000.00",
                "tenure": "1",
                "suminsured_id": "1",
                "prod_shortform": "COMPREHENSIVEIND",
                "company_logo": "api/assets/images/starhealth_logo.png",
                "company_name": "Star Health",
                "type_name": "Health",
                "indiv_shortlist_status": false,
                "shortlist_status": false,
                "key_features": [{
                    "key_features_name": "Copay",
                    "key_features_value": "No-Cap*",
                    "kf_info": "",
                    "key_feature_status": "1"
                }, {
                    "key_features_name": "Room Rent",
                    "key_features_value": "Unlimited",
                    "kf_info": "",
                    "key_feature_status": "1"
                }, {
                    "key_features_name": "Pre Existing Disease",
                    "key_features_value": "Covered after 48 months",
                    "kf_info": "",
                    "key_feature_status": "1"
                }, {
                    "key_features_name": "Pre Hospitalization",
                    "key_features_value": "Up to 30 days",
                    "kf_info": "",
                    "key_feature_status": "1"
                }, {
                    "key_features_name": "Post Hospitalization",
                    "key_features_value": "Up to 60 days",
                    "kf_info": "",
                    "key_feature_status": "1"
                }]
            }, {
                "product_id": "11",
                "product_name": "Health Gain",
                "premium_id": "3254",
                "premium_amount": "4700.00",
                "scheme": "1A",
                "suminsured_amount": "300000.00",
                "tenure": "1",
                "suminsured_id": null,
                "prod_shortform": null,
                "company_logo": "api/assets/images/reliance_logo.png",
                "company_name": "Reliance",
                "type_name": "Health",
                "indiv_shortlist_status": false,
                "shortlist_status": false,
                "key_features": [{
                    "key_features_name": "Copay",
                    "key_features_value": "Nil*",
                    "kf_info": "",
                    "key_feature_status": "1"
                }, {
                    "key_features_name": "Pre Existing Disease",
                    "key_features_value": "36 months waiting period",
                    "kf_info": "",
                    "key_feature_status": "1"
                }, {
                    "key_features_name": "Pre Hospitalization",
                    "key_features_value": "Up to 60 days",
                    "kf_info": "",
                    "key_feature_status": "1"
                }, {
                    "key_features_name": "Post Hospitalization",
                    "key_features_value": "Up to 60 days",
                    "kf_info": "",
                    "key_feature_status": "1"
                }]
            }, {
                "product_id": "4",
                "product_name": "Joy Today",
                "premium_id": "3640",
                "premium_amount": "60080.51",
                "scheme": "1A",
                "suminsured_amount": "500000.00",
                "tenure": "3",
                "suminsured_id": null,
                "prod_shortform": null,
                "company_logo": "api/assets/images/religare_logo.png",
                "company_name": "Religare",
                "type_name": "Health",
                "indiv_shortlist_status": false,
                "shortlist_status": false,
                "key_features": [{
                    "key_features_name": "Copay",
                    "key_features_value": "Nil*",
                    "kf_info": "* 20% after 61 years",
                    "key_feature_status": "1"
                }, {
                    "key_features_name": "Pre Hospitalization",
                    "key_features_value": "Upto 30 days",
                    "kf_info": "",
                    "key_feature_status": "1"
                }, {
                    "key_features_name": "Room Rent",
                    "key_features_value": "Private AC room",
                    "kf_info": "",
                    "key_feature_status": "1"
                }, {
                    "key_features_name": "Post Hospitalization",
                    "key_features_value": "Upto 60 days",
                    "kf_info": "",
                    "key_feature_status": "1"
                }, {
                    "key_features_name": "Pre Existing Disease",
                    "key_features_value": "4 years waitng period",
                    "kf_info": "",
                    "key_feature_status": "1"
                }]
            }, {
                "product_id": "4",
                "product_name": "Joy Today",
                "premium_id": "3643",
                "premium_amount": "43824.58",
                "scheme": "1A",
                "suminsured_amount": "300000.00",
                "tenure": "3",
                "suminsured_id": null,
                "prod_shortform": null,
                "company_logo": "api/assets/images/religare_logo.png",
                "company_name": "Religare",
                "type_name": "Health",
                "indiv_shortlist_status": false,
                "shortlist_status": false,
                "key_features": [{
                    "key_features_name": "Copay",
                    "key_features_value": "Nil*",
                    "kf_info": "* 20% after 61 years",
                    "key_feature_status": "1"
                }, {
                    "key_features_name": "Pre Hospitalization",
                    "key_features_value": "Upto 30 days",
                    "kf_info": "",
                    "key_feature_status": "1"
                }, {
                    "key_features_name": "Room Rent",
                    "key_features_value": "Private AC room",
                    "kf_info": "",
                    "key_feature_status": "1"
                }, {
                    "key_features_name": "Post Hospitalization",
                    "key_features_value": "Upto 60 days",
                    "kf_info": "",
                    "key_feature_status": "1"
                }, {
                    "key_features_name": "Pre Existing Disease",
                    "key_features_value": "4 years waitng period",
                    "kf_info": "",
                    "key_feature_status": "1"
                }]
            }, {
                "product_id": "5",
                "product_name": "Joy Tomorrow",
                "premium_id": "3646",
                "premium_amount": "20775.42",
                "scheme": "1A",
                "suminsured_amount": "500000.00",
                "tenure": "1",
                "suminsured_id": null,
                "prod_shortform": null,
                "company_logo": "api/assets/images/religare_logo.png",
                "company_name": "Religare",
                "type_name": "Health",
                "indiv_shortlist_status": false,
                "shortlist_status": false,
                "key_features": [{
                    "key_features_name": "Copay",
                    "key_features_value": "Nil*",
                    "kf_info": "* 20% after 61 years",
                    "key_feature_status": "1"
                }, {
                    "key_features_name": "Pre Hospitalization",
                    "key_features_value": "Upto 30 days",
                    "kf_info": "",
                    "key_feature_status": "1"
                }, {
                    "key_features_name": "Room Rent",
                    "key_features_value": "Private AC room",
                    "kf_info": "",
                    "key_feature_status": "1"
                }, {
                    "key_features_name": "Post Hospitalization",
                    "key_features_value": "Upto 60 days",
                    "kf_info": "",
                    "key_feature_status": "1"
                }, {
                    "key_features_name": "Pre Existing Disease",
                    "key_features_value": "4 years waitng period",
                    "kf_info": "",
                    "key_feature_status": "1"
                }]
            }, {
                "product_id": "12",
                "product_code": "11119",
                "product_name": "Optima Restore Individual One Year ",
                "premium_id": "",
                "premium_amount": "6755.00",
                "scheme": "1A",
                "suminsured_amount": "500000",
                "tenure": 1,
                "suminsured_id": "",
                "prod_shortform": "Optima Restore Individual One Year ",
                "company_logo": "api/assets/images/apollo_munich_logo.png",
                "company_name": "Apollo Munich",
                "type_name": "Helth",
                "indiv_shortlist_status": "",
                "shortlist_status": "",
                "SACCode": 1,
                "DiscountAmount": "0.00",
                "GrossPremiumAmount": "7970.90",
                "TaxAmount": "1215.90",
                "key_features": [{
                    "key_features_name": "Copay",
                    "key_features_value": "No",
                    "kf_info": "",
                    "key_feature_status": "1"
                }, {
                    "key_features_name": "Pre Existing Disease",
                    "key_features_value": "Up to 3 years",
                    "kf_info": "",
                    "key_feature_status": "1"
                }, {
                    "key_features_name": "Pre Hospitalization",
                    "key_features_value": "60 days",
                    "kf_info": "",
                    "key_feature_status": "1"
                }, {
                    "key_features_name": "Post Hospitalization",
                    "key_features_value": "180 days",
                    "kf_info": "",
                    "key_feature_status": "1"
                }]
            }, {
                "product_id": "13",
                "product_code": "11300",
                "product_name": "Health Wallet Individual",
                "premium_id": "",
                "premium_amount": "10906.00",
                "scheme": "1A",
                "suminsured_amount": "500000",
                "tenure": 1,
                "suminsured_id": "",
                "prod_shortform": "Health Wallet Individual",
                "company_logo": "api/assets/images/apollo_munich_logo.png",
                "company_name": "Apollo Munich",
                "type_name": "Helth",
                "indiv_shortlist_status": "",
                "shortlist_status": "",
                "SACCode": 1,
                "DiscountAmount": "0.00",
                "GrossPremiumAmount": "12869.08",
                "TaxAmount": "1963.08",
                "key_features": [{
                    "key_features_name": "Copay",
                    "key_features_value": "No",
                    "kf_info": "",
                    "key_feature_status": "1"
                }, {
                    "key_features_name": "Pre Existing Disease",
                    "key_features_value": "Up to 3 years",
                    "kf_info": "",
                    "key_feature_status": "1"
                }, {
                    "key_features_name": "Pre Hospitalization",
                    "key_features_value": "Up to 30 days",
                    "kf_info": "",
                    "key_feature_status": "1"
                }, {
                    "key_features_name": "Post Hospitalization",
                    "key_features_value": "Up to 90 days",
                    "kf_info": "",
                    "key_feature_status": "1"
                }]
            }, {
                "product_id": "13",
                "product_code": "11410",
                "product_name": "Health Wallet Individual 2 Lacs Deductible",
                "premium_id": "",
                "premium_amount": "8168.00",
                "scheme": "1A",
                "suminsured_amount": "500000",
                "tenure": 1,
                "suminsured_id": "",
                "prod_shortform": "Health Wallet Individual 2 Lacs Deductible",
                "company_logo": "api/assets/images/apollo_munich_logo.png",
                "company_name": "Apollo Munich",
                "type_name": "Helth",
                "indiv_shortlist_status": "",
                "shortlist_status": "",
                "SACCode": 1,
                "DiscountAmount": "0.00",
                "GrossPremiumAmount": "9638.24",
                "TaxAmount": "1470.24",
                "key_features": [{
                    "key_features_name": "Copay",
                    "key_features_value": "No",
                    "kf_info": "",
                    "key_feature_status": "1"
                }, {
                    "key_features_name": "Pre Existing Disease",
                    "key_features_value": "Up to 3 years",
                    "kf_info": "",
                    "key_feature_status": "1"
                }, {
                    "key_features_name": "Pre Hospitalization",
                    "key_features_value": "Up to 30 days",
                    "kf_info": "",
                    "key_feature_status": "1"
                }, {
                    "key_features_name": "Post Hospitalization",
                    "key_features_value": "Up to 90 days",
                    "kf_info": "",
                    "key_feature_status": "1"
                }]
            }, {
                "product_id": "13",
                "product_code": "11411",
                "product_name": "Health Wallet Individual 3 Lacs Deductible",
                "premium_id": "",
                "premium_amount": "7548.00",
                "scheme": "1A",
                "suminsured_amount": "500000",
                "tenure": 1,
                "suminsured_id": "",
                "prod_shortform": "Health Wallet Individual 3 Lacs Deductible",
                "company_logo": "api/assets/images/apollo_munich_logo.png",
                "company_name": "Apollo Munich",
                "type_name": "Helth",
                "indiv_shortlist_status": "",
                "shortlist_status": "",
                "SACCode": 1,
                "DiscountAmount": "0.00",
                "GrossPremiumAmount": "8906.64",
                "TaxAmount": "1358.64",
                "key_features": [{
                    "key_features_name": "Copay",
                    "key_features_value": "No",
                    "kf_info": "",
                    "key_feature_status": "1"
                }, {
                    "key_features_name": "Pre Existing Disease",
                    "key_features_value": "Up to 3 years",
                    "kf_info": "",
                    "key_feature_status": "1"
                }, {
                    "key_features_name": "Pre Hospitalization",
                    "key_features_value": "Up to 30 days",
                    "kf_info": "",
                    "key_feature_status": "1"
                }, {
                    "key_features_name": "Post Hospitalization",
                    "key_features_value": "Up to 90 days",
                    "kf_info": "",
                    "key_feature_status": "1"
                }]
            }],
            "selected_tab_index": 0,
            "family_members": [{
                "type": "Self",
                "age": "25"
            }],
            "enquiry_id": 90,
            "group_suminsured_id": "4-6"
        }
        if (this.familyMembers == '' || this.familyMembers == undefined) {
            this.groupList();
        } else {
            this.familyMembers = [{
                "type": "Self",
                "age": "25",
                "ins_name": "asdd",
                "ins_dob": "1995-09-20",
                "ins_gender": "Male",
                "ins_illness": "No",
                "ins_weight": "78",
                "ins_height": "167",
                "ins_occupation_id": "2",
                "ins_relationship": "1",
                "ins_hospital_cash": "1",
                "ins_engage_manual_labour": "None",
                "ins_engage_winter_sports": "None",
                "ins_personal_accident_applicable": "0",
                "ins_suminsured_indiv": "5",
                "engage_manual_status": "0",
                "engage_winter_status": "0",
                "ageRestriction": "",
                "ins_age": 23,
                "illness": "false"
            }]
        }
        for (let i = 0; i < this.familyMembers.length; i++) {
            if (this.familyMembers[i].type == 'Spouse') {
                this.familyMembers[i].ins_gender = 'Female';
            }
            else if (this.familyMembers[i].type == 'Son') {
                this.familyMembers[i].ins_gender = 'Male';
            }
            else if (this.familyMembers[i].type == 'Daughter') {
                this.familyMembers[i].ins_gender = 'Female';
            }
            else if (this.familyMembers[i].type == 'Father') {
                this.familyMembers[i].ins_gender = 'Male';
            }
            else if (this.familyMembers[i].type == 'Mother') {
                this.familyMembers[i].ins_gender = 'Female';
            }
            else if (this.familyMembers[i].type == 'Father In Law') {
                this.familyMembers[i].ins_gender = 'Male';
            }
            else if (this.familyMembers[i].type == 'Mother In Law') {
                this.familyMembers[i].ins_gender = 'Female';
            }
            else if (this.familyMembers[i].type == 'Brother') {
                this.familyMembers[i].ins_gender = 'Male';
            }
            else if (this.familyMembers[i].type == 'Sister') {
                this.familyMembers[i].ins_gender = 'Female';
            }
        }
    }


    setStep(index: number) {
        this.step = index;
    }

    prevStep() {
        this.step--;
    }


    groupList() {
        this.familyMembers = this.getFamilyDetails.family_members;
        console.log(this.familyMembers);
        for (let i = 0; i < this.familyMembers.length; i++) {
            this.familyMembers[i].ins_name = '';
            this.familyMembers[i].ins_dob = '';
            this.familyMembers[i].ins_gender = '';
            this.familyMembers[i].ins_illness = 'No';
            this.familyMembers[i].ins_weight = '';
            this.familyMembers[i].ins_height = '';
            this.familyMembers[i].ins_occupation_id = '';
            // this.familyMembers[i].insurincome = '';
            this.familyMembers[i].ins_relationship = '';
            this.familyMembers[i].ins_hospital_cash = '1';
            this.familyMembers[i].ins_engage_manual_labour = 'None';
            this.familyMembers[i].ins_engage_winter_sports = 'None';
            this.familyMembers[i].ins_personal_accident_applicable = '0';
            this.familyMembers[i].ins_suminsured_indiv = this.buyProductdetails.suminsured_id;
            this.familyMembers[i].engage_manual_status = '0';
            this.familyMembers[i].engage_winter_status = '0';
            this.familyMembers[i].ageRestriction = '';
        }

    }


    //Personal Details
    personalDetails(stepper: MatStepper, value) {
        stepper.next();
        // this.personalData = value;
        // console.log(this.personalData, 'dfgdfg');
        // this.personalData.rolecd = 'PROPOSER';
        // this.personalData.type = 'SELF';
        // sessionStorage.stepper1Details = '';
        // sessionStorage.stepper1Details = JSON.stringify(value);
        // console.log(value.personalDob, 'value');
        // if (this.personal.valid) {
        //
        //     this.proposerInsureData = [];
        //     if (sessionStorage.proposerAge >= 18) {
        //         this.proposerInsureData.push(this.personalData);
        //         if (this.mobileNumber == '' || this.mobileNumber == 'true'){
        //             stepper.next();
        //         }
        //
        //     } else {
        //         this.toastr.error('Proposer age should be 18 or above');
        //     }
        // }
    }


    sameAddress(values: any) {
        this.sameField = values.checked;
        if (values.checked) {
            this.inputReadonly = true;
            console.log(values.checked);
            this.personal.controls['residenceAddress'].setValue(this.personal.controls['personalAddress'].value);
            this.personal.controls['residenceAddress2'].setValue(this.personal.controls['personalAddress2'].value);
            this.personal.controls['residenceCity'].setValue(this.personal.controls['personalCity'].value);
            this.personal.controls['residencePincode'].setValue(this.personal.controls['personalPincode'].value);
            this.personal.controls['residenceState'].setValue(this.personal.controls['personalState'].value);

        } else {
            this.inputReadonly = false;
            this.personal.controls['residenceAddress'].setValue('');
            this.personal.controls['residenceAddress2'].setValue('');
            this.personal.controls['residenceCity'].setValue('');
            this.personal.controls['residencePincode'].setValue('');
            this.personal.controls['residenceState'].setValue('');

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

    public dobkeyPress(event: any) {
        if (event.charCode !== 0) {
            const pattern = /[0-9/\\ ]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }

    public onAlternative(event: any) {
        if (event.charCode !== 0) {
            const pattern = /[0-9-]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }

    addEvent(event) {
        this.selectDate = event.value;
        console.log(this.selectDate);
        this.setDate = this.datepipe.transform(this.selectDate, 'dd-MM-y');
        this.setDateAge = this.datepipe.transform(this.selectDate, 'y-MM-dd');
        this.personalAge = this.ageCalculate(this.setDateAge);
        sessionStorage.setItem('proposerAge', this.personalAge);
    }


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
        console.log(this.back);
    }

    quesback() {
        this.back = false;
        console.log(this.back);
    }


    //Create Proposal
    // proposal() {
    //
    //     this.totalData = {
    //         'platform': 'web',
    //         'proposal_id': '1',
    //         'enquiry_id': this.enquiryId,
    //         'group_name': 'Group A',
    //         'company_name': 'Religare',
    //         'suminsured_amount': this.buyPersonaldetails.suminsured_amount,
    //         'proposer_insurer_details': this.totalReligareData,
    //         'product_id': this.buyPersonaldetails.product_id,
    //         'policy_term': this.buyPersonaldetails.product_id == 4 ? '3' : '1',
    //         'scheme_id': this.buyPersonaldetails.scheme,
    //         'terms_condition': '1',
    //         'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
    //         'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
    //         'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
    //         'nominee_name': this.nomineeDetails.controls['religareNomineeName'].value,
    //         'nominee_relationship': this.nomineeDetails.controls['religareRelationship'].value,
    //         'medical_status': this.medicalStatus.includes('Yes') ? 'Yes' : 'No'
    //     };
    //     if (!this.back){
    //     }
    //     this.stepback();
    //
    //     const data = this.totalData;
    //     this.settings.loadingSpinner = true;
    //     this.proposalservice.getReligareProposal(data).subscribe(
    //         (successData) => {
    //             this.proposalSuccess(successData);
    //         },
    //         (error) => {
    //             this.proposalFailure(error);
    //         }
    //     );
    //
    // }
    //
    // public proposalSuccess(successData) {
    //     this.settings.loadingSpinner = false;
    //     if (successData.IsSuccess) {
    //         this.toastr.success('Proposal created successfully!!');
    //         console.log(this.relationshipList, 'this.relationshipList');
    //         this.summaryData = successData.ResponseObject;
    //         let getdata=[];
    //         for( let i = 0; i <  this.summaryData.proposer_insurer_details.length; i++) {
    //             for (let j = 0; j <  this.relationshipList.length; j++) {
    //                 if(this.summaryData.proposer_insurer_details[i].relationship_code == this.relationshipList[j].relationship_code ) {
    //                     this.summaryData.proposer_insurer_details[i].relationship_name = this.relationshipList[j].relationship_name;
    //                 }
    //             }
    //         }
    //         console.log(this.summaryData, 'this.summaryData,this.summaryDatathis.summaryDatathis.summaryDatathis.summaryData');
    //         this.proposalId = this.summaryData.proposal_id;
    //         sessionStorage.proposalID = this.proposalId;
    //         //console.log(this.proposalId, 'this.summaryDatathis.summaryDatathis.summaryData');
    //         this.relationshipcode = [];
    //         console.log(this.relationshipList,'lll');
    //         for (let i = 0; i < this.relationshipList.length; i++) {
    //             this.relationshipcode.push(this.relationshipList[i].relationship_name);
    //         }
    //         console.log(this.relationshipcode ,'ooooo');
    //         this.lastStepper.next();
    //
    //     } else {
    //         this.toastr.error(successData.ErrorObject);
    //     }
    // }
    //
    // public proposalFailure(error) {
    //     this.settings.loadingSpinner = false;
    //     console.log(error);
    // }


//Summary residence detail


    getCityIdF2(title, cid, pincode) {
        const data = {
            'platform': 'web',
            'pincode': pincode,
            'city_id': cid
        }
        this.common.getArea(data).subscribe(
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
        console.log(error);
    }


//personal city detail
    getPostal(pin, title) {
        this.pin = pin;
        this.title = title;
        console.log(this.title, 'kjhjkghkhk')
        const data = {
            'platform': 'web',
            'user_id': '0',
            'role_id': '4',
            'pincode': this.pin
        }
        if (this.pin.length == 6) {
            this.proposalservice.getPostalReligare(data).subscribe(
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
        }
    }


    public getpostalFailure(error) {
        console.log(error);
    }


//summary city detail
    getPostalSummary(pin, title) {
        this.sumPin = pin;
        this.sumTitle = title;
        console.log(this.sumPin, 'pin');
        console.log(this.title, 'sumTitle1');
        const data = {
            'platform': 'web',
            'pincode': this.sumPin
        }
        if (this.pin.length == 6) {
            this.common.getPostal(data).subscribe(
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
        console.log(error);
    }

    setOccupationList() {
        const data = {
            'platform': 'web',
            'product_id': '1',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.proposalservice.getOccupationList(data).subscribe(
            (successData) => {
                this.occupationListSuccess(successData);
            },
            (error) => {
                this.occupationListFailure(error);
            }
        );

    }

    public occupationListSuccess(successData) {
        console.log(successData.ResponseObject);
        this.occupationList = successData.ResponseObject;
    }

    public occupationListFailure(error) {
        console.log(error);
    }


    setOccupationListCode() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.proposalservice.getOccupationCode(data).subscribe(
            (successData) => {
                this.occupationCodeSuccess(successData);
            },
            (error) => {
                this.occupationCodeFailure(error);
            }
        );

    }

    public occupationCodeSuccess(successData) {
        console.log(successData.ResponseObject);
        this.occupationCode = successData.ResponseObject;
    }

    public occupationCodeFailure(error) {
        console.log(error);
    }

    setRelationship() {
        const data = {
            'platform': 'web',
            'product_id': '1',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.proposalservice.getRelationshipList(data).subscribe(
            (successData) => {
                this.setRelationshipSuccess(successData);
            },
            (error) => {
                this.setRelationshipFailure(error);
            }
        );
    }

    public setRelationshipSuccess(successData) {
        console.log(successData.ResponseObject);
        this.relationshipList = successData.ResponseObject;
        //this.relationshipLists = this.relationshipList.name;

        this.insureRelationList = [];
        if (this.insurePersons.length > 1) {
            for (let i = 0; i < this.relationshipList.length; i++) {
                if (this.relationshipList[i].status == 1) {
                    this.insureRelationList.push({
                        'relationship_code': this.relationshipList[i].relationship_code,
                        'relationship_name': this.relationshipList[i].relationship_name,
                        'status': this.relationshipList[i].status
                    });
                }
            }
        } else {
            for (let i = 0; i < this.relationshipList.length; i++) {
                this.insureRelationList.push({
                    'relationship_code': this.relationshipList[i].relationship_code,
                    'relationship_name': this.relationshipList[i].relationship_name,
                    'status': this.relationshipList[i].status
                });
            }
        }

        console.log(this.insureRelationList, 'insureRelationListinsureRelationListinsureRelationList');

    }

    public setRelationshipFailure(error) {
        console.log(error);
    }

    add(event: any) {
        if (event.charCode !== 0) {
            const pattern = /[0-9/\\ ]/;
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

    public typeValidate(event: any) {
        if (event.charCode !== 0) {
            const pattern = /[a-zA-Z\\ ]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }

    alternateChange(event) {
        console.log(event, 'ghj');
        if (event.target.value.length == 10) {
            if (event.target.value == this.personal.get('personalMobile').value) {
                this.mobileNumber = 'Alternate number should be different from mobile number';
            } else {
                this.mobileNumber = '';
            }
        } else {
            // this.mobileNumber = 'false';
        }

    }

// insured details
    InsureDetails(stepper: MatStepper, index, key) {
        stepper.next();

    }

    //     sessionStorage.familyMembers = JSON.stringify(this.familyMembers);
    //     // if (this.ageRestriction == '') {
    //     this.illnesStatus = false;
    //     this.insureStatus = false;
    //     console.log(this.familyMembers, 'ghdfkljghdfkljghkldfjghdfkljgh');
    //
    //
    //     if (key == 'Insured Details') {
    //         for (let i = 0; i < this.familyMembers.length; i++) {
    //             if (this.familyMembers[i].ins_name != '' && this.familyMembers[i].ins_dob != '' && this.familyMembers[i].ins_gender != '' && this.familyMembers[i].ins_weight != '' && this.familyMembers[i].ins_height != '' && this.familyMembers[i].ins_occupation_id != '' && this.familyMembers[i].ins_relationship != '' && this.familyMembers[i].illness != undefined) {
    //                 this.errorMessage = false;
    //                 if (this.familyMembers[i].ins_illness != 'No') {
    //                     if (this.familyMembers[i].ins_illness == '') {
    //                         this.illnesStatus = true;
    //                         break;
    //                     }
    //
    //                 } else {
    //                     this.illnesStatus = false;
    //                 }
    //             } else {
    //                 this.errorMessage = true;
    //                 break;
    //             }
    //         }
    //         if (this.errorMessage) {
    //             this.toastr.error('Please fill the empty fields', key);
    //         } else if (this.illnesStatus) {
    //             this.toastr.error('Please fill the empty fields', key);
    //         } else if (this.illnesStatus == false) {
    //             for (let i = 0; i < this.familyMembers.length; i++) {
    //                 if (this.buyProductdetails.product_id == 6) {
    //                     this.insureStatus = false;
    //                     if (this.familyMembers[i].ins_hospital_cash != '') {
    //                         if (i == this.familyMembers.length - 1) {
    //                             this.insureStatus = true;
    //                         }
    //                     } else {
    //                         this.errorMessage = true;
    //                         break;
    //                     }
    //
    //                 } else if (this.buyProductdetails.product_id == 9 || this.buyProductdetails.product_id == 8) {
    //                     this.errorMessage = false;
    //                     this.insureStatus = false;
    //                     this.previousInsurence = [];
    //                     for (let i = 0; i < this.familyMembers.length; i++) {
    //                         this.previousInsurence.push(this.familyMembers[i].ins_personal_accident_applicable);
    //                     }
    //
    //
    //                     if (this.familyMembers[i].ins_age >= 18 || this.familyMembers[i].ins_age == '') {
    //                         if (!this.previousInsurence.includes('2')) {
    //                             this.insureStatus = false;
    //                             this.toastr.error('You need to select one adult for personal accident cover');
    //                             break;
    //                         }
    //
    //
    //                     } else {
    //                         if (i == this.familyMembers.length - 1) {
    //                             this.insureStatus = true;
    //                         }
    //                     }
    //                     if (this.familyMembers[i].engage_manual_status == '2') {
    //                         if (this.familyMembers[i].ins_engage_manual_labour != '') {
    //                             if (i == this.familyMembers.length - 1) {
    //                                 this.insureStatus = true;
    //                             }
    //                         } else {
    //                             this.errorMessage = true;
    //                             this.insureStatus = false;
    //                             break;
    //                         }
    //
    //                     }  if (this.familyMembers[i].engage_winter_status == '2') {
    //                         if (this.familyMembers[i].ins_engage_winter_sports != '') {
    //                             if (i == this.familyMembers.length - 1) {
    //                                 this.insureStatus = true;
    //                             }
    //                         } else {
    //                             this.errorMessage = true;
    //                             this.insureStatus = false;
    //                             break;
    //                         }
    //                     } if (this.familyMembers[i].engage_manual_status == '0' && this.familyMembers[i].engage_winter_status == '0' ) {
    //                         if (i == this.familyMembers.length - 1) {
    //                             this.insureStatus = true;
    //                         }
    //                     }
    //                 } else {
    //                     this.insureStatus = true;
    //                 }
    //             }
    //         } else {
    //
    //         }
    //     }
    //     if (this.errorMessage) {
    //         this.toastr.error('Please fill the empty fields', key);
    //     }
    //     console.log(this.ageRestriction, 'ageRestriction');
    //
    //     if (this.insureStatus) {
    //         if (this.ageRestriction == '') {
    //             stepper.next();
    //         }
    //         if (this.ageRestriction == 'true') {
    //             stepper.next();
    //         }
    //
    //
    //     }
    //
    //     console.log(this.errorMessage, 'errorMessage');
    //     console.log(this.insureStatus, 'insureStatus');
    //     console.log(this.illnesStatus, 'illnesStatus');
    //
    // }

// Medical
    medicalHistoryDetails(stepper: MatStepper) {

        // sessionStorage.stepper3Details = '';
        // sessionStorage.stepper3Details = JSON.stringify(this.religareQuestionsList);
        this.religareQuestionsList = [{
            "main_question": "Does any person(s) to be insured has any Pre-existing diseases?",
            "display_question": "1",
            "sub_questions_list": [{
                "question_set_code": "PEDdiabetesDetails",
                "question_details": {
                    "question_id": "1",
                    "question_code": "205",
                    "question_description": "Diabetes?",
                    "checkbox": "1",
                    "existing_question_code": "diabetesExistingSince",
                    "description_textarea": "0",
                    "other_description_code": "",
                    "family_group": [{
                        "type": "Self",
                        "age": "23",
                        "existingSince": "",
                        "diseasesDescription": "",
                        "status": false
                    }]
                }
            }, {
                "question_set_code": "PEDcancerDetails",
                "question_details": {
                    "question_id": "2",
                    "question_code": "114",
                    "question_description": "Cancer?",
                    "checkbox": "1",
                    "existing_question_code": "cancerExistingSince",
                    "description_textarea": "0",
                    "other_description_code": "",
                    "family_group": [{
                        "type": "Self",
                        "age": "23",
                        "existingSince": "",
                        "diseasesDescription": "",
                        "status": false
                    }]
                }
            }, {
                "question_set_code": "PEDhyperTensionDetails",
                "question_details": {
                    "question_id": "3",
                    "question_code": "207",
                    "question_description": "Hypertension / High Blood Pressure",
                    "checkbox": "1",
                    "existing_question_code": "hyperTensionExistingSince",
                    "description_textarea": "0",
                    "other_description_code": "",
                    "family_group": [{
                        "type": "Self",
                        "age": "23",
                        "existingSince": "",
                        "diseasesDescription": "",
                        "status": false
                    }]
                }
            }, {
                "question_set_code": "PEDliverDetails",
                "question_details": {
                    "question_id": "4",
                    "question_code": "232",
                    "question_description": "Liver Disease?",
                    "checkbox": "1",
                    "existing_question_code": "liverExistingSince",
                    "description_textarea": "0",
                    "other_description_code": "",
                    "family_group": [{
                        "type": "Self",
                        "age": "23",
                        "existingSince": "",
                        "diseasesDescription": "",
                        "status": false
                    }]
                }
            }, {
                "question_set_code": "PEDcardiacDetails",
                "question_details": {
                    "question_id": "5",
                    "question_code": "143",
                    "question_description": "Cardiac Disease?",
                    "checkbox": "1",
                    "existing_question_code": "cardiacExistingSince",
                    "description_textarea": "0",
                    "other_description_code": "",
                    "family_group": [{
                        "type": "Self",
                        "age": "23",
                        "existingSince": "",
                        "diseasesDescription": "",
                        "status": false
                    }]
                }
            }, {
                "question_set_code": "PEDjointpainDetails",
                "question_details": {
                    "question_id": "6",
                    "question_code": "105",
                    "question_description": "Joint Pain?",
                    "checkbox": "1",
                    "existing_question_code": "jointpainExistingSince",
                    "description_textarea": "0",
                    "other_description_code": "",
                    "family_group": [{
                        "type": "Self",
                        "age": "23",
                        "existingSince": "",
                        "diseasesDescription": "",
                        "status": false
                    }]
                }
            }, {
                "question_set_code": "PEDkidneyDetails",
                "question_details": {
                    "question_id": "7",
                    "question_code": "129",
                    "question_description": "Kidney Disease?",
                    "checkbox": "1",
                    "existing_question_code": "kidneyExistingSince",
                    "description_textarea": "0",
                    "other_description_code": "",
                    "family_group": [{
                        "type": "Self",
                        "age": "23",
                        "existingSince": "",
                        "diseasesDescription": "",
                        "status": false
                    }]
                }
            }, {
                "question_set_code": "PEDparalysisDetails",
                "question_details": {
                    "question_id": "8",
                    "question_code": "164",
                    "question_description": "Paralysis?",
                    "checkbox": "1",
                    "existing_question_code": "paralysisExistingSince",
                    "description_textarea": "0",
                    "other_description_code": "",
                    "family_group": [{
                        "type": "Self",
                        "age": "23",
                        "existingSince": "",
                        "diseasesDescription": "",
                        "status": false
                    }]
                }
            }, {
                "question_set_code": "PEDcongenitalDetails",
                "question_details": {
                    "question_id": "9",
                    "question_code": "122",
                    "question_description": "Congenital Disorder?",
                    "checkbox": "1",
                    "existing_question_code": "congenitalExistingSince",
                    "description_textarea": "0",
                    "other_description_code": "",
                    "family_group": [{
                        "type": "Self",
                        "age": "23",
                        "existingSince": "",
                        "diseasesDescription": "",
                        "status": false
                    }]
                }
            }, {
                "question_set_code": "PEDHivaidsDetails",
                "question_details": {
                    "question_id": "10",
                    "question_code": "147",
                    "question_description": "HIV/AIDS?",
                    "checkbox": "1",
                    "existing_question_code": "hivaidsExistingSince",
                    "description_textarea": "0",
                    "other_description_code": "",
                    "family_group": [{
                        "type": "Self",
                        "age": "23",
                        "existingSince": "",
                        "diseasesDescription": "",
                        "status": false
                    }]
                }
            }, {
                "question_set_code": "PEDotherDetails",
                "question_details": {
                    "question_id": "11",
                    "question_code": "210",
                    "question_description": "Any other diseases or ailments not mentioned above ?",
                    "checkbox": "1",
                    "existing_question_code": "otherExistingSince",
                    "description_textarea": "1",
                    "other_description_code": "otherDiseasesDescription",
                    "family_group": [{
                        "type": "Self",
                        "age": "23",
                        "existingSince": "",
                        "diseasesDescription": "",
                        "status": false
                    }]
                }
            }, {
                "question_set_code": "PEDRespiratoryDetails",
                "question_details": {
                    "question_id": "12",
                    "question_code": "250",
                    "question_description": "Respiratory disorders inclusion?",
                    "checkbox": "1",
                    "existing_question_code": "respiratoryExistingSince",
                    "description_textarea": "0",
                    "other_description_code": "",
                    "family_group": [{
                        "type": "Self",
                        "age": "23",
                        "existingSince": "",
                        "diseasesDescription": "",
                        "status": false
                    }]
                }
            }, {
                "question_set_code": "PEDEndoDetails",
                "question_details": {
                    "question_id": "13",
                    "question_code": "222",
                    "question_description": "Any disorders of the endocrine system (including but not limited to Pituitary / Parathyroid / adrenal gland disorders)",
                    "checkbox": "1",
                    "existing_question_code": "EndocriExistingSince",
                    "description_textarea": "0",
                    "other_description_code": "",
                    "family_group": [{
                        "type": "Self",
                        "age": "23",
                        "existingSince": "",
                        "diseasesDescription": "",
                        "status": false
                    }]
                }
            }, {
                "question_set_code": "PEDillnessDetails",
                "question_details": {
                    "question_id": "14",
                    "question_code": "502",
                    "question_description": "Has any of the Proposed to be Insured consulted/taken treatment or recommended to take investigations/medication/surgery other than for childbirth/minor injuries? *",
                    "checkbox": "1",
                    "existing_question_code": "illnessExistingSince",
                    "description_textarea": "0",
                    "other_description_code": "",
                    "family_group": [{
                        "type": "Self",
                        "age": "23",
                        "existingSince": "",
                        "diseasesDescription": "",
                        "status": false
                    }]
                }
            }, {
                "question_set_code": "PEDSurgeryDetails",
                "question_details": {
                    "question_id": "15",
                    "question_code": "503",
                    "question_description": "Has any of the Proposed to be Insured been hospitalized or has been under any prolonged treatment for any illness/injury or has undergone surgery other than for childbirth/minor injuries? *",
                    "checkbox": "1",
                    "existing_question_code": "SurgeryExistingSince",
                    "description_textarea": "0",
                    "other_description_code": "",
                    "family_group": [{
                        "type": "Self",
                        "age": "23",
                        "existingSince": "",
                        "diseasesDescription": "",
                        "status": false
                    }]
                }
            }, {
                "question_set_code": "PEDSmokeDetails",
                "question_details": {
                    "question_id": "16",
                    "question_code": "504",
                    "question_description": "Do You smoke, consume alcohol, or chew tobacco, ghutka or paan or use any recreational drugs? If ‘Yes’ then please provide the frequency & amount consumed. *",
                    "checkbox": "1",
                    "existing_question_code": "SmokeExistingSince",
                    "description_textarea": "1",
                    "other_description_code": "OtherSmokeDetails",
                    "family_group": [{
                        "type": "Self",
                        "age": "23",
                        "existingSince": "",
                        "diseasesDescription": "",
                        "status": false
                    }]
                }
            }],
            "mStatus": "No",
            "answer_status": false
        }, {
            "main_question": "Have any of the above mentioned person(s) to be insured been diagnosed / hospitalized for any illness / injury during the last 48 months?",
            "display_question": "0",
            "sub_questions_list": [{
                "question_set_code": "HEDHealthHospitalized",
                "question_details": {
                    "question_id": "17",
                    "question_code": "H001",
                    "question_description": "",
                    "checkbox": "1",
                    "existing_question_code": "",
                    "description_textarea": "0",
                    "other_description_code": "",
                    "family_group": [{
                        "type": "Self",
                        "age": "23",
                        "existingSince": "",
                        "diseasesDescription": "",
                        "status": false
                    }]
                }
            }],
            "mStatus": "No",
            "answer_status": false
        }, {
            "main_question": "Have any of the person(s) to be insured ever filed a claim with their current / previous insurer? ",
            "display_question": "0",
            "sub_questions_list": [{
                "question_set_code": "HEDHealthClaim",
                "question_details": {
                    "question_id": "18",
                    "question_code": "H002",
                    "question_description": "",
                    "checkbox": "1",
                    "existing_question_code": "",
                    "description_textarea": "0",
                    "other_description_code": "",
                    "family_group": [{
                        "type": "Self",
                        "age": "23",
                        "existingSince": "",
                        "diseasesDescription": "",
                        "status": false
                    }]
                }
            }],
            "mStatus": "No",
            "answer_status": false
        }, {
            "main_question": "Has any proposal for Health insurance been declined, cancelled or charged a higher premium? ",
            "display_question": "0",
            "sub_questions_list": [{
                "question_set_code": "HEDHealthDeclined",
                "question_details": {
                    "question_id": "19",
                    "question_code": "H003",
                    "question_description": "",
                    "checkbox": "1",
                    "existing_question_code": "",
                    "description_textarea": "0",
                    "other_description_code": "",
                    "family_group": [{
                        "type": "Self",
                        "age": "23",
                        "existingSince": "",
                        "diseasesDescription": "",
                        "status": false
                    }]
                }
            }],
            "mStatus": "No",
            "answer_status": false
        }, {
            "main_question": "Is any of the person(s) to be insured, already covered under any other health insurance policy of Religare Health Insurance?",
            "display_question": "0",
            "sub_questions_list": [{
                "question_set_code": "HEDHealthCovered",
                "question_details": {
                    "question_id": "20",
                    "question_code": "H004",
                    "question_description": "",
                    "checkbox": "1",
                    "existing_question_code": "",
                    "description_textarea": "0",
                    "other_description_code": "",
                    "family_group": [{
                        "type": "Self",
                        "age": "23",
                        "existingSince": "",
                        "diseasesDescription": "",
                        "status": false
                    }]
                }
            }],
            "mStatus": "No",
            "answer_status": false
        }]
        // this.questions_list = [];
        // this.getFilterData = [];
        // for (let i = 0; i < this.religareQuestionsList.length; i++) {
        //     for (let j = 0; j < this.religareQuestionsList[i].sub_questions_list.length; j++) {
        //         for (let k = 0; k < this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group.length; k++) {
        //             this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].question_id = this.religareQuestionsList[i].sub_questions_list[j].question_details.question_id;
        //             this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].question_set_code = this.religareQuestionsList[i].sub_questions_list[j].question_set_code;
        //             this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].question_code = this.religareQuestionsList[i].sub_questions_list[j].question_details.question_code;
        //             this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].existing_question_code = this.religareQuestionsList[i].sub_questions_list[j].question_details.existing_question_code;
        //             this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].otherdetails_desc_code = this.religareQuestionsList[i].sub_questions_list[j].question_details.other_description_code;
        //             this.questions_list.push(this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k]);
        //         }
        //     }
        // }
        //
        // for (let i = 0; i < this.getFamilyDetails.family_members.length; i++) {
        //     this.getFilterData.push(this.questions_list.filter(data => data.type == this.getFamilyDetails.family_members[i].type));
        // }
        // for (let i = 0; i < this.totalReligareData.length; i++) {
        //     if (i > 0) {
        //         this.totalReligareData[i].questions_list = this.getFilterData[i - 1];
        //     }
        // }
        // let statusChecked = [];
        // this.medicalStatus = [];
        // console.log(this.religareQuestionsList, 'this.religareQuestionsList');
        // for (let i = 0; i < this.religareQuestionsList.length; i++) {
        //
        //     if (this.religareQuestionsList[i].mStatus == 'No') {
        //         this.medicalStatus.push('No');
        //     } else if (this.religareQuestionsList[i].mStatus == 'Yes') {
        //         this.medicalStatus.push('Yes');
        //     }
        //
        //
        //     for (let i = 0; i < this.totalReligareData.length; i++) {
        //         this.totalReligareData[i].medical_status = this.medicalStatus.includes('Yes') ? 'Yes' : 'No'
        //     }
        //
        //
        //     if (this.religareQuestionsList[i].answer_status == true) {
        //         for (let j = 0; j < this.religareQuestionsList[i].sub_questions_list.length; j++) {
        //             for (let k = 0; k < this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group.length; k++) {
        //                 if (this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].status == true) {
        //                     if (this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].existingSince == '') {
        //
        //                         statusChecked.push(0);
        //                     } else {
        //                         if (this.religareQuestionsList[i].sub_questions_list[j].question_details.description_textarea == '1') {
        //                             if (this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].diseasesDescription == '') {
        //                                 statusChecked.push(0);
        //                             } else {
        //                                 statusChecked.push(1);
        //                             }
        //                         } else {
        //                             statusChecked.push(1);
        //                         }
        //
        //
        //                     }
        //                 }
        //             }
        //         }
        //         if (statusChecked.length == 0) {
        //             statusChecked.push(2);
        //         }
        //
        //     } else {
        //
        //         if (i == this.religareQuestionsList.length - 1) {
        //             statusChecked.push(1);
        //         }
        //
        //     }
        //     console.log(this.medicalStatus, 'this.medicalStatus');
        //
        // }
        //
        // if (statusChecked.includes(0)) {
        //     this.toastr.error('Please fill the empty field');
        // } else if (statusChecked.includes(2)) {
        //     this.toastr.error('Please check atleast one checkbox!');
        // } else {
            stepper.next();

        // }

    }

    subStatus(value: any, i, k, j) {
        if (value.checked) {
        } else {
            this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].existingSince = '';
        }

    }

    // nominee details
    religareNomineeDetails(stepper: MatStepper, value) {
        this.lastStepper = stepper;
        console.log(value);

        //     if (this.nomineeDetails.valid) {
        //         sessionStorage.nomineeData = '';
        //         sessionStorage.nomineeData = JSON.stringify(value);
        //         this.proposal();
        //     }
        // }
    }
}