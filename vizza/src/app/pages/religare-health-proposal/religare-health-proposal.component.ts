import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray, FormControl} from '@angular/forms';
import {HealthService} from '../../shared/services/health.service';
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
import {ValidationService} from '../../shared/services/validation.service';
import {ActivatedRoute, Router} from '@angular/router';
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
    selector: 'app-religare-health-proposal',
    templateUrl: './religare-health-proposal.component.html',
    styleUrls: ['./religare-health-proposal.component.scss'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
})
export class ReligareHealthProposalComponent implements OnInit {
    public personal: FormGroup;
    public summary: FormGroup;
    public insureArray: FormGroup;
    public nomineeDetails: FormGroup;
    public insuredForm1: FormGroup;
    public insuredForm2: FormGroup;
    public insuredForm3: FormGroup;
    public insuredForm4: FormGroup;
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
    public relationshipLists: any;
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
    public areaNames: any;
    public title: any;
    public residenceCitys: any;
    public cityTitle: any;
    public rAreaNames: any;
    public rAreaName: any;
    public rResponse: any;
    public addonDetails: any;
    public rSummaryCity: any;
    public sumTitle: any;
    public sumPin: any;
    public code: any;
    public checkBoxError: any;
    public fillCheckbox: any;
    public pos_status: any;
    public product_id: any;
    public requestInsuredDetails: any;
    public setDateAge: any;
    public personalAge: any;
    public occupationCode: any;
    public religareQuestionsList: any;
    public items: any;
    public step: any;
    public questionEmpty: any;
    public proposerInsureData: any;
    public mobileNumber: any;
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
    public relationshipcode : any;
    public medicalStatus : any;
    public arr : any;
    public insureRelationList : any;
    public insureSingle : any;
    public selectMr : any;
    public addon : any;
    public objectKeys : any;
    public setAddonDefault : any;
    public sameRelationship : any;
    stepperindex: any;
    dobError: any;
    array: any;
    currentStep: any;
    proposerFormData: any;
    insuredFormData: any;
    nomineeFormData: any;
    action: any;
    proposalNum: any;
    returnURL: any;
    genderStatus: any;
    status: any;
    proposal_Id: any;
    createdDate: any;
    requestDetails: any;
    gtotalPremium: any;
    gcompanylogo:any;
    gname:any;
    gsum_insured:any;
    changeSuninsuredAmount:any;
    totalPayLaterDetails:any;
    requestmedicalQuestion: any;
    public religareMobileTrue0: boolean;
    public religareMobileTrue1: boolean;
    public religareMobileTrue2: boolean;
    public religareMobileTrue3: boolean;
    public religareMobileTrue4: boolean;
    public payLaterr: boolean;
    public checkBoxValue: any;
    public personalDetailss: any;
    public insuredDetails: any;
    public requestProserDetails: any;
    public insuredLength: any;
    public proposalIdPayLater: any;
    public enquiryIdPayLater: any;
    public planNamePayLater: any;
    public polocyTermPayLater: any;
    public schemeIdPayLater: any;
    public submitPayLater: boolean;
    public inputfieldshow: boolean;
    public payoutDetaillsss: any;
    public payLaterSubmitDetails: any;
    public payLaterSummary: any;
    public payLaterPrposerDet: any;
    public payLaterInsurdDet: any;
    public payLaterNominDet: any;
    public payLaterCommAdd: any;
    public payLaterPerAdd: any;
    public newProposalId: any;
    public newProposalNum: any;
    public newReturnURL: any;
    public newAction: any;
    public suminsuredamount: any;
    public suminsuredidvalue: any;
    public pincoce: any;
    public productvalue: any;
    public valueSI: any;
    public valueSII: any;
    public valuePremium: any;
    public famNamePayLater: any;
    public insuredtype1: any;
    public insuredtype2: any;
    public insuredtype3: any;
    public insuredtype4: any;
    public addonsPayLater: any;
    public newPremium: any;
    public totalDataPL: any;
    public newSIProposal: any;

    public insuredPayLater: any;
    public insuredPayLater1: any;


    constructor(public proposalservice: HealthService, public route: ActivatedRoute, public datepipe: DatePipe, private toastr: ToastrService, public appSettings: AppSettings, public dialog: MatDialog,public router: Router,
                public config: ConfigurationService, public validation: ValidationService ,public common: HealthService, public fb: FormBuilder, public auth: AuthService, public http: HttpClient, @Inject(LOCALE_ID) private locale: string) {
        this.stepperindex = 0;
        this.route.params.forEach((params) => {
            if(params.stepper == true || params.stepper == 'true') {
                this.stepperindex = 4;
                if (sessionStorage.summaryData != '' && sessionStorage.summaryData != undefined) {
                    this.summaryData = JSON.parse(sessionStorage.summaryData);
                    this.proposerFormData = JSON.parse(sessionStorage.proposerFormData);
                    this.insuredFormData = JSON.parse(sessionStorage.insuredFormData);
                    this.nomineeFormData = JSON.parse(sessionStorage.nomineeFormData);
                    this.proposalId = this.summaryData.policy_id;
                    sessionStorage.proposalID = this.proposalId;

                }
            }
            this.status = params.stepper;
            this.proposal_Id = params.proposalId;
            this.proposalId= sessionStorage.proposalID;
            console.log(this.proposalId,'this.proposalId')

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
        this.currentStep = this.stepperindex;
        let today = new Date();
        this.today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        this.stopNext = false;
        this.back = false;
        this.hideQuestion = false;
        this.declaration = false;
        this.setAddonDefault = true;
        this.checkBoxError = true;
        this.fillCheckbox = true;
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
        this.insureSingle = true;
        this.checkBoxValue = false;
        this.selectMr = true;
        this.genderStatus = false;
        this.inputfieldshow = false;
        // this.submitPayLater = false;
        this.proposerInsureData = [];
        this.questions_list = [];
        this.arr = [];
        this.religareMobileTrue0 = false;
        this.religareMobileTrue1 = true;
        this.religareMobileTrue2 = true;
        this.religareMobileTrue3 = true;
        this.religareMobileTrue4 = true;
        this.personal = this.fb.group({
            personalTitle: ['', Validators.required],
            personalFirstname: new FormControl(''),
            personalLastname: ['', Validators.required],
            personalGender: ['', Validators.compose([Validators.required])],
            personalDob: ['', Validators.compose([Validators.required])],
            personalrelationship: 'SELF',
            personalrelationshipName: 'SELF',
            personalAadhar: ['', Validators.compose([Validators.minLength(12)])],
            personalPan: [''],
            personalGst: ['', Validators.compose([Validators.minLength(15)])],
            personalAddress: ['', Validators.required],
            personalAddress2: ['', Validators.required],
            personalPincode: ['', Validators.required],
            personalCity: ['', Validators.required],
            changecity: [''],
            personalCityName: '',
            personalState: ['', Validators.required],
            personalEmail: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\']+(\\.[^<>()[\\]\\\\.,;:\\s@\\\']+)*)|(\\\'.+\\\'))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
            personalMobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
            personalAltnumber: '',
            residenceAddress: ['', Validators.required],
            residenceAddress2: [''],
            residencePincode: ['', Validators.required],
            residenceCity: ['', Validators.required],
            residenceCityName: '',
            residenceState: ['', Validators.required],
            mobileNumber: '',
            sameas: false,
            rolecd: 'PROPOSER',
            type: '',
            medical_status: 'No'

        });
        this.nomineeDetails = this.fb.group({
            'religareNomineeName': '',
            'religareRelationship': '',
            'nomineRelationshipName': ''
        });
        this.insuredForm1 = this.fb.group({
            'sameAsProposer': [''],
            'title': ['', Validators.required],
            'firstname': ['', Validators.required],
            'lastname': ['', Validators.required],
            'gender': ['', Validators.required],
            'dob': ['', Validators.required],
            'relationship': ['', Validators.required],
            'insuredRelation': [''],
            'aadhar': [''],
            'pan': [''],
            'gst': [''],
            'email': ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\']+(\\.[^<>()[\\]\\\\.,;:\\s@\\\']+)*)|(\\\'.+\\\'))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
            'mobile': ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
            'altnumber': [''],
            'height': ['', Validators.required],
            'weight': ['', Validators.required]
        });
        this.insuredForm2 = this.fb.group({
            'title': ['', Validators.required],
            'firstname': ['', Validators.required],
            'lastname': ['', Validators.required],
            'gender': ['', Validators.required],
            'dob': ['', Validators.required],
            'relationship': ['', Validators.required],
            'insuredRelation': [''],
            'aadhar': [''],
            'pan': [''],
            'gst': [''],
            'email': ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\']+(\\.[^<>()[\\]\\\\.,;:\\s@\\\']+)*)|(\\\'.+\\\'))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
            'mobile': ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
            'altnumber': [''],
            'height': ['', Validators.required],
            'weight': ['', Validators.required]
        });
        this.insuredForm3 = this.fb.group({
            'title': ['', Validators.required],
            'firstname': ['', Validators.required],
            'lastname': ['', Validators.required],
            'gender': ['', Validators.required],
            'dob': ['', Validators.required],
            'relationship': ['', Validators.required],
            'insuredRelation': [''],
            'aadhar': [''],
            'pan': [''],
            'gst': [''],
            'email': [''],
            'mobile': [''],
            'altnumber': [''],
            'height': ['', Validators.required],
            'weight': ['', Validators.required]
        });
        this.insuredForm4 = this.fb.group({
            'title': ['', Validators.required],
            'firstname': ['', Validators.required],
            'lastname': ['', Validators.required],
            'gender': ['', Validators.required],
            'dob': ['', Validators.required],
            'relationship': ['', Validators.required],
            'insuredRelation': [''],
            'aadhar': [''],
            'pan': [''],
            'gst': [''],
            'email': [''],
            'mobile': [''],
            'altnumber': [''],
            'height': ['', Validators.required],
            'weight': ['', Validators.required]
        });

    }
    initItemRows() {
        return this.fb.group(
            {
                rolecd: 'PRIMARY',
                personalTitle: ['', Validators.required],
                personalFirstname: new FormControl(''),
                personalLastname: ['', Validators.required],
                personalDob: ['', Validators.required],
                personalGender: ['', Validators.compose([Validators.required])],
                personalrelationship: ['', Validators.required],
                personalrelationshipName: '',
                personalAadhar: ['', Validators.compose([Validators.minLength(12)])],
                personalPan: ['', Validators.compose([ Validators.minLength(10)])],
                personalGst: ['', Validators.compose([Validators.minLength(15)])],
                personalAddress: '',
                sameAsProposer: false,
                personalAddress2: '',
                personalPincode: '',
                personalCity: '',
                personalState: '',
                personalEmail: '',
                personalMobile: ['', Validators.compose([ Validators.pattern('[6789][0-9]{9}')])],
                personalAltnumber: '',
                residenceAddress: '',
                residenceAddress2: '',
                residencePincode: '',
                residenceCity: '',
                residenceState: '',
                personalWeight: ['', Validators.required],
                personalHeight: ['', Validators.required],
                sameas: false,
                type: '',
                cityHide: '',
                pCityHide: '',
                sameInsureAltMobileNumber:'',
                ins_age: '',
                ins_days: '',
                insurerDobError: '',
                insurerDobValidError: '',
            }
        );
    }
    ngOnInit() {
        if (this.payLaterr == true) {
            this.stepperindex = 4;
            this.step = 4;
            this.religareMobileTrue0 = true;
            this.religareMobileTrue1 = true;
            this.religareMobileTrue2 = true;
            this.religareMobileTrue3 = true;
            this.religareMobileTrue4 = false;
            // this.payLaterEdit();
            // this.submitPayLater = false;
            this.suminsureddropdown();
            // this.suminsureddropdown();

            console.log(this.payLaterr, 'this.payLaterrolll');
        } else {
            this.buyProductdetails = JSON.parse(sessionStorage.buyProductdetails);
            this.getFamilyDetails = JSON.parse(sessionStorage.changedTabDetails);
            this.pincoce = sessionStorage.setPincode;
            console.log( this.pincoce,' this.pincoce');
            this.suminsureddropdown();
            this.insurePersons = this.getFamilyDetails.family_members;
            if (this.insurePersons.length < 2 && (this.buyProductdetails.product_id == 4 || this.buyProductdetails.product_id == 5)) {
                this.genderStatus = true;
            } else {
                this.genderStatus = false;
            }
            this.inputfieldshow = false;

            if (this.buyProductdetails.product_id == 1) {
                this.nomineeDetails.get('religareNomineeName').setValidators([Validators.required]);
                this.nomineeDetails.get('religareRelationship').setValidators([Validators.required]);
            }
            if (this.buyProductdetails.product_id != 1) {
                this.nomineeDetails.get('religareNomineeName').setValidators(null);
                this.nomineeDetails.get('religareRelationship').setValidators(null);
            }
            this.nomineeDetails.get('religareNomineeName').updateValueAndValidity();
            this.nomineeDetails.get('religareRelationship').updateValueAndValidity();

            // this.setOccupationListCode();
            this.religareQuestions();
            // this.setOccupationList();
            this.setRelationship();
            if (this.buyProductdetails.product_id == 1) {
                this.getAddon();
                if (this.buyProductdetails.suminsured_amount == 300000.00) {
                    this.setAddonDefault = false;
                }
            }
            this.insureArray = this.fb.group({
                items: this.fb.array([])
            });
            for (let i = 0; i < this.getFamilyDetails.family_members.length; i++) {
                this.items = this.insureArray.get('items') as FormArray;
                this.items.push(this.initItemRows());
                this.insureArray['controls'].items['controls'][i]['controls'].type.setValue(this.getFamilyDetails.family_members[i].type);
            }

            if (this.buyProductdetails.product_name == '4' || this.buyProductdetails.product_name == '5 ') {
                if (this.getFamilyDetails.family_members.length < 2) {
                    if (this.personal['controls'].personalTitle.value == 'MR') {
                        this.insureSingle = false;

                    } else if (this.personal['controls'].personalTitle.value == 'MS') {
                        this.insureSingle = true;
                    }
                }
            }

            this.previousinsurance = [
                'IFFCO TOKIO GeneralInsurance Co. Ltd.',
                'Liberty GeneralInsurance Co. Ltd.',
                'Shriram GeneralInsurance Co. Ltd.',
                'Reliance GeneralInsurance Co. Ltd',
                'DHFL GeneralInsurance Co. Ltd.',
                'Bajaj Allianz Allianz GeneralInsurance Co. Ltd.',
                'Edelweiss GeneralInsurance Co.Ltd.',
                'Kotak Mahindra GeneralInsurance Co. Ltd.',
                'Go Digit GeneralInsurance Co. Ltd.',
                'Royal Sundaram GeneralInsurance Co. Ltd.',
                'Exports Credit Guarantee of India Co. Ltd',
                'The New India Assurance Co. Ltd.',
                'Tata AIG GeneralInsurance Company Limited',
                'National Insurance Co. Ltd.',
                'Universal Sompo GeneralInsurance Co. Ltd.',
                'Agriculture Insurance Company of India Ltd.',
                'Acko GeneralInsurance Co. Ltd.',
                'SBI GeneralInsurance Co. Ltd.',
                'Bharti AXA GeneralInsurance Co. Ltd.',
                'ICICI LOMBARD GeneralInsurance Co. Ltd.',
                'Magma HDI GeneralInsurance Co. Ltd.',
                'HDFC ERGO GeneralInsurance Co.Ltd.',
                'United India Insurance Co. Ltd.',
                'The Oriental Insurance Co. Ltd.',
                'Future Generali India Insurance Co. Ltd.',
                'Cholamandalam MS GeneralInsurance Co. Ltd.',
                'Raheja QBE GeneralInsurance Co. Ltd.',
                'Star Health & Allied Insurance Co.Ltd.',
                'Apollo Munich Health Insurance Co. Ltd',
                'Religare Health Insurance Co. Ltd',
                'Max Bupa Health Insurance Co. Ltd',
                'CIGNA TTK Health Insurance Co. Ltd.',
                'Aditya Birla Health Insurance Co. Ltd.'
            ];

            this.sessionData();
            this.setDate = Date.now();
            this.setDate = this.datepipe.transform(this.setDate, 'dd-MM-y');
            if (this.buyProductdetails.premium_amount >= 50000 || this.getFamilyDetails.family_members.type == 'Self') {
                this.personal.get('personalPan').setValidators([Validators.compose([Validators.required, Validators.minLength(10)])]);
            } else {
                this.personal.get('personalPan').setValidators(null);
            }
            this.personal.get('personalPan').updateValueAndValidity();


            // if(this.buyProductdetails.product_id == 4 || this.buyProductdetails.product_id == 5){
            //     if (this.getFamilyDetails.family_members.length < 2) {
            //         this.changeGender();
            //     }
            // }

        }
    }


    // Dame validation
    nameValidate(event: any){
        console.log(event.target.value.length);
        // if (event.code == 'Space') {
        //     if (event.target.value.length == 0) {
        //         event.preventDefault();
        //     }
        // } else {
        this.validation.nameValidate(event);
        // }
    }
    // Dob validation
    dobValidate(event: any) {
        this.validation.dobValidate(event);
    }
    // Number validation
    numberValidate(event: any) {
        this.validation.numberValidate(event);
    }
    // height weight validation
    heightValidate(event: any) {
        console.log(event.target.value.length);
        if (event.key == '0') {
            if (event.target.value.length == 0) {
                event.preventDefault();
            }
        } else {
            this.validation.numberValidate(event);
        }
    }

    idValidate(event){
        this.validation.idValidate(event);

    }
    // Proposer Details
    getPostal(pin, title) {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pincode': pin
        }
        if (pin.length == 6) {
            this.proposalservice.getPostalReligare(data).subscribe(
                (successData) => {
                    this.getpostalSuccess(successData,title);
                },
                (error) => {
                    this.getpostalFailure(error);
                }
            );
        }
    }
    public getpostalSuccess(successData,title) {
        if (successData.IsSuccess == true) {
            this.response = successData.ResponseObject;
            if (title == 'personal') {
                if (Object.keys(this.response).length === 0) {
                    this.personal.controls['personalState'].setValue('');
                    this.personal.controls['personalCity'].setValue('');
                    this.personal.controls['personalArea'].setValue('');
                    this.personalCitys = {};
                } else {
                    this.personal.controls['personalState'].setValue(this.response.state);
                    this.personalCitys = this.response.city;
                }
                sessionStorage.personalCitys = JSON.stringify(this.personalCitys);
            } else if (title == 'residence') {
                if (Object.keys(this.response).length === 0) {
                    this.personal.controls['residenceCity'].setValue('');
                    this.personal.controls['residenceState'].setValue('');
                    this.personal.controls['residenceArea'].setValue('');
                    this.residenceCitys = {};
                } else {
                    this.personal.controls['residenceState'].setValue(this.response.state);
                    this.residenceCitys = this.response.city;
                }
                sessionStorage.residenceCitys = JSON.stringify(this.residenceCitys);
            }
        } else {
            this.toastr.error('In valid Pincode');
            if (title == 'personal') {
                sessionStorage.personalCitys = '';
                this.personalCitys = {};
                this.personal.controls['personalState'].setValue('');
                this.personal.controls['personalCity'].setValue('');
            } else if (title == 'residence') {
                sessionStorage.residenceCitys = '';
                this.residenceCitys = {};
                this.personal.controls['residenceCity'].setValue('');
                this.personal.controls['residenceState'].setValue('');
            }

        }
    }
    public getpostalFailure(error) {
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
        if(successData.IsSuccess) {
            this.insureRelationList = successData.ResponseObject;
            // this.insureRelationList = [];
            // if (this.insurePersons.length > 1) {
            //     for (let i = 0; i < this.relationshipList.length; i++) {
            //         if (this.relationshipList[i].status == 1) {
            //             this.insureRelationList.push({
            //                 'relationship_code': this.relationshipList[i].relationship_code,
            //                 'relationship_name': this.relationshipList[i].relationship_name,
            //                 'status': this.relationshipList[i].status
            //             });
            //         }
            //     }
            // } else {
            //     for (let i = 0; i < this.relationshipList.length; i++) {
            //         this.insureRelationList.push({
            //             'relationship_code': this.relationshipList[i].relationship_code,
            //             'relationship_name': this.relationshipList[i].relationship_name,
            //             'status': this.relationshipList[i].status
            //         });
            //     }
            // }
        }
    }

    public setRelationshipFailure(error) {
    }

    alternateChange(event) {
        if (this.personal['controls'].personalAltnumber.value.length == 10) {
            if(this.personal['controls'].personalAltnumber.value == this.personal['controls'].personalMobile.value) {
                this.mobileNumber = 'Alternate number should be different from mobile number';
            } else {
                this.mobileNumber = '';
            }
        } else {
            this.mobileNumber = '';
        }
        sessionStorage.mobileNumber = this.mobileNumber;
    }

    insureChangeGender(index) {
        if (this.insureArray['controls'].items['controls'][index]['controls'].personalTitle.value == 'MR') {
            this.insureArray['controls'].items['controls'][index]['controls'].personalGender.patchValue('Male');
        } else {
            this.insureArray['controls'].items['controls'][index]['controls'].personalGender.patchValue('Female');
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
    sameAddress(values: any) {
        console.log(this.personal.controls['sameas'].value, 'tyyy');
        if (values.checked) {
            this.inputReadonly = true;
            this.personal.controls['residenceAddress'].setValue(this.personal.controls['personalAddress'].value);
            this.personal.controls['residenceAddress2'].setValue(this.personal.controls['personalAddress2'].value);
            this.personal.controls['residenceCity'].setValue(this.personal.controls['personalCity'].value);
            this.personal.controls['residencePincode'].setValue(this.personal.controls['personalPincode'].value);
            this.personal.controls['residenceState'].setValue(this.personal.controls['personalState'].value);
            this.residenceCitys = JSON.parse(sessionStorage.personalCitys);
            sessionStorage.residenceCitys = JSON.stringify(this.residenceCitys);

        } else {
            this.inputReadonly = false;
            this.personal.controls['residenceAddress'].setValue('');
            this.personal.controls['residenceAddress2'].setValue('');
            this.personal.controls['residenceCity'].setValue('');
            this.personal.controls['residencePincode'].setValue('');
            this.personal.controls['residenceState'].setValue('');
            if (sessionStorage.residenceCitys != '' && sessionStorage.residenceCitys != undefined) {
                this.residenceCitys = JSON.parse(sessionStorage.residenceCitys);
            } else {
                this.residenceCitys = {};
            }

        }
    }

    typeAddressDeatils() {
        if (this.personal.controls['sameas'].value) {
            this.residenceCitys = JSON.parse(sessionStorage.personalCitys);
            this.personal.controls['residenceAddress'].setValue(this.personal.controls['personalAddress'].value);
            this.personal.controls['residenceAddress2'].setValue(this.personal.controls['personalAddress2'].value);
            this.personal.controls['residenceCity'].setValue(this.personal.controls['personalCity'].value);
            this.personal.controls['residencePincode'].setValue(this.personal.controls['personalPincode'].value);
            this.personal.controls['residenceState'].setValue(this.personal.controls['personalState'].value);
        }
    }
    topScroll() {
        document.getElementById('main-content').scrollTop = 0;
    }
    setStep(index: number) {
        this.step = index;
    }
    nextStep() {
        this.step++;
    }
    prevStep() {
        this.step--;
    }
    getAddon() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'prod_id': this.buyProductdetails.product_id

        }

        this.proposalservice.getReligareAddon(data).subscribe(
            (successData) => {
                this.AddonSuccess(successData);
            },
            (error) => {
                this.AddonFailure(error);
            }
        );
    }

    public AddonSuccess(successData) {
        if (successData.IsSuccess) {
            this.addon = successData.ResponseObject.addons_list[0];
            this.objectKeys = Object.keys(this.addon).map(k => ({key: k, value:  this.addon[k]}));
            console.log(this.objectKeys, 'this.objectKeys8');
            for (let i=0; i < this.objectKeys.length; i++) {
                this.objectKeys[i].checked = false;
            }
        }
    }

    public AddonFailure(error) {
    }
    addonItem(event: any, i){
        if (event.checked) {
            this.objectKeys[i].checked = true;

        } else {
            this.objectKeys[i].checked = false;

        }
    }
    // proposer dob
    addEvent(event) {
        if (event.value != null) {
            let selectedDate = '';
            let dob = '';
            if (typeof event.value._i == 'string') {
                const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
                if (pattern.test(event.value._i) && event.value._i.length == 10) {
                    this.dobError = '';
                } else {
                    this.dobError = 'Enter Valid Date';
                }
                selectedDate = event.value._i;
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                if (selectedDate.length == 10) {
                    this.personalAge = this.ageCalculate(dob);
                }

            } else if (typeof event.value._i == 'object') {
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                if (dob.length == 10) {
                    this.personalAge = this.ageCalculate(dob);
                }
                this.dobError = '';
            }
            sessionStorage.setItem('proposerAge', this.personalAge);
        }
    }
    existingDob(event,i,j,k) {
        if (event.value != null) {
            let selectedDate = '';
            let dob = '';
            if (typeof event.value._i == 'string') {
                const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
                if (pattern.test(event.value._i) && event.value._i.length == 10) {

                    this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].dobError = '';
                } else {


                    this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].dobError = 'Enter Valid Date';
                }
                // selectedDate = event.value._i;
                // dob = this.datepipe.transform(event.value, 'y-MM-dd');
                // if (selectedDate.length == 10) {
                //     this.personalmedicalAge = this.ageCalculate(dob);
                // }

            } else if (typeof event.value._i == 'object') {
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                if (dob.length == 10) {
                    this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].dobError = '';
                }else{
                    this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].dobError = 'Enter Valid Date';
                }
            }
            console.log(dob.length,'deeeeee');
            // sessionStorage.setItem('proposermedicalAge', this.personalmedicalAge);
        }
    }

    backAll(){
        this.topScroll();
        this.prevStep();
    }
    personalDetails(stepper: MatStepper, value) {
        console.log(value, 'valyueeeeeeeeeeeee')
        this.personalData = value;
        this.personalData.rolecd = 'PROPOSER';
        this.personalData.type = 'SELF';
        sessionStorage.stepper1Details = '';
        sessionStorage.stepper1Details = JSON.stringify(value);
        this.addonDetails = [];

        this.personalDetailss = {
            'title': value.personalTitle,
            'proposer_fname': value.personalFirstname,
            'proposer_lname': value.personalLastname,
            'proposer_gender': value.personalGender,
            'prop_dob': this.datepipe.transform(this.personal.controls['personalDob'].value, 'y-MM-dd'),
            'proposer_aadhar': value.personalAadhar,
            'proposer_pan': value.personalPan,
            'proposer_gst': value.personalGst,
            'proposer_email': value.personalEmail,
            'proposer_mob': value.personalMobile,
            'proposer_alter_mob': value.personalAltnumber,
            'proposer_res_address1': value.residenceAddress,
            'proposer_res_address2': value.residenceAddress2,
            'proposer_res_city': value.residenceCity,
            'proposer_res_cityName': value.residenceCityName,
            'proposer_res_state': value.residenceState,
            'proposer_res_pincode': value.residencePincode,
            'proposer_comm_address1': value.personalAddress,
            'proposer_comm_address2': value.personalAddress2,
            'proposer_comm_pincode': value.personalPincode,
            'proposer_comm_city': value.personalCity,
            'proposer_comm_cityName': value.personalCityName,
            'proposer_comm_state': value.personalState,
            'sameas': false ? 0 :1
        };
        console.log(this.personalDetailss, 'loooooooooo');

        if (this.personal.valid) {
            if(this.buyProductdetails.product_id == 1) {
                for (let i = 0; i < this.objectKeys.length; i++) {
                    if (this.objectKeys[i].checked) {
                        this.addonDetails.push(this.objectKeys[i].key);
                    }
                }
                sessionStorage.addonDetails = '';
                sessionStorage.addonDetails = JSON.stringify(this.objectKeys);
            }
            this.proposerInsureData = [];
            if (sessionStorage.proposerAge >= 18) {
                this.proposerInsureData.push(this.personalData);
                if (this.mobileNumber == '' || this.mobileNumber == 'true'){
                    stepper.next();
                    this.topScroll();
                    this.nextStep();
                    this.religareMobileTrue0 = false;
                    this.religareMobileTrue1 = false;
                }
            } else {
                this.toastr.error('Proposer age should be 18 or above');
            }
        }
    }

    // Insured details
    // getPostalInsurer(pin, index, title) {
    //     const data = {
    //         'platform': 'web',
    //         'user_id': '0',
    //         'role_id': '4',
    //         'pincode': pin
    //     }
    //     if (pin.length == 6) {
    //         this.proposalservice.getPostalReligare(data).subscribe(
    //             (successData) => {
    //                 this.getpostalInsurerSuccess(successData,title,index);
    //             },
    //             (error) => {
    //                 this.getpostalInsurerFailure(error);
    //             }
    //         );
    //     }
    // }
    // public getpostalInsurerSuccess(successData,title,index) {
    //     if (successData.IsSuccess) {
    //         this.insuredCityDetails = successData.ResponseObject;
    //         if (title == 'personal') {
    //             if (Object.keys(this.response).length === 0) {
    //                 this.insureArray['controls'].items['controls'][index]['controls'].personalState.patchValue('');
    //                 this.iPersonalCitys = {};
    //             } else {
    //                 this.insureArray['controls'].items['controls'][index]['controls'].personalState.patchValue(this.insuredCityDetails.state);
    //                 this.iPersonalCitys = this.insuredCityDetails.city;
    //             }
    //             sessionStorage.iPersonalCitys = JSON.stringify(this.iPersonalCitys);
    //
    //         } else  if (title == 'residence') {
    //             if (Object.keys(this.response).length === 0) {
    //                 this.insureArray['controls'].items['controls'][index]['controls'].residenceState.patchValue('');
    //                 this.iResidenceCitys = {};
    //             } else {
    //                 this.insureArray['controls'].items['controls'][index]['controls'].residenceState.patchValue(this.insuredCityDetails.state);
    //                 this.iResidenceCitys = this.insuredCityDetails.city;
    //             }
    //             sessionStorage.iResidenceCitys = JSON.stringify(this.iResidenceCitys);
    //
    //         }
    //     } else {
    //         this.toastr.error('In valid Pincode');
    //         sessionStorage.iPersonalCitys = {};
    //         sessionStorage.iResidenceCitys = {};
    //         this.iPersonalCitys = {};
    //         this.iResidenceCitys = {};
    //     }
    //
    // }
    // public getpostalInsurerFailure(error) {
    // }

    insurerAlternateChange(event ,index) {
        if (this.insureArray['controls'].items['controls'][index]['controls'].personalMobile.value.length == 10) {
            if (this.insureArray['controls'].items['controls'][index]['controls'].personalAltnumber.value == this.insureArray['controls'].items['controls'][index]['controls'].personalMobile.value) {
                this.insureArray['controls'].items['controls'][index]['controls'].sameInsureAltMobileNumber.patchValue('Alternate number should be different from mobile number')

            } else {
                this.insureArray['controls'].items['controls'][index]['controls'].sameInsureAltMobileNumber.patchValue('');
            }
        }else{
            this.insureArray['controls'].items['controls'][index]['controls'].sameInsureAltMobileNumber.patchValue('')
        }
    }

    changeGender() {
        if(this.buyProductdetails.product_name == 'Joy Today' || this.buyProductdetails.product_name == 'Joy Tomorrow') {
            if (this.getFamilyDetails.family_members.length < 2) {
                // if(this.personal['controls'].personalTitle.value == 'MR'){
                //     this.insureSingle = false;
                //     this.insureArray['controls'].items['controls'][0]['controls'].cityHide.patchValue(false);
                //     this.insureArray['controls'].items['controls'][0]['controls'].sameAsProposer.patchValue(false);
                //     this.insureArray['controls'].items['controls'][0]['controls'].pCityHide.patchValue(true);
                //     this.insureArray['controls'].items['controls'][0]['controls'].personalTitle.patchValue('');
                //     this.insureArray['controls'].items['controls'][0]['controls'].personalFirstname.patchValue('');
                //     this.insureArray['controls'].items['controls'][0]['controls'].personalLastname.patchValue('');
                //     this.insureArray['controls'].items['controls'][0]['controls'].personalDob.patchValue('');
                //     this.insureArray['controls'].items['controls'][0]['controls'].personalAadhar.patchValue('');
                //     this.insureArray['controls'].items['controls'][0]['controls'].personalrelationship.patchValue('');
                //     this.insureArray['controls'].items['controls'][0]['controls'].personalGender.patchValue('');
                //     this.insureArray['controls'].items['controls'][0]['controls'].personalPan.patchValue('');
                //     this.insureArray['controls'].items['controls'][0]['controls'].personalGst.patchValue('');
                //     this.insureArray['controls'].items['controls'][0]['controls'].personalEmail.patchValue('');
                //     this.insureArray['controls'].items['controls'][0]['controls'].personalMobile.patchValue('');
                //     this.insureArray['controls'].items['controls'][0]['controls'].personalAltnumber.patchValue('');
                //     this.insureArray['controls'].items['controls'][0]['controls'].personalrelationship.patchValue('');
                //     this.insureArray['controls'].items['controls'][0]['controls'].personalHeight.patchValue('');
                //     this.insureArray['controls'].items['controls'][0]['controls'].personalWeight.patchValue('');
                //     this.insureArray['controls'].items['controls'][0]['controls'].rolecd.patchValue('PRIMARY');
                //
                //     // this.insureArray['controls'].items['controls'][0]['controls'].personalAddress.patchValue('');
                //     // this.insureArray['controls'].items['controls'][0]['controls'].personalAddress2.patchValue('');
                //     // this.insureArray['controls'].items['controls'][0]['controls'].personalCity.patchValue('');
                //     // this.insureArray['controls'].items['controls'][0]['controls'].personalPincode.patchValue('');
                //     // this.insureArray['controls'].items['controls'][0]['controls'].personalState.patchValue('');
                //     // this.insureArray['controls'].items['controls'][0]['controls'].sameas.patchValue('');
                //     // this.insureArray['controls'].items['controls'][0]['controls'].residenceAddress.patchValue('');
                //     // this.insureArray['controls'].items['controls'][0]['controls'].residenceAddress2.patchValue('');
                //     // this.insureArray['controls'].items['controls'][0]['controls'].residenceCity.patchValue('');
                //     // this.insureArray['controls'].items['controls'][0]['controls'].residencePincode.patchValue('');
                //     // this.insureArray['controls'].items['controls'][0]['controls'].residenceState.patchValue('');
                //     //
                // } else if(this. personal['controls'].personalTitle.value == 'MS'){
                //     this.insureSingle = true;
                // }
            }
        }

        if (this.personal.controls['personalTitle'].value == 'MR'){
            this.personal.controls['personalGender'].patchValue('Male');
        } else {
            this.personal.controls['personalGender'].patchValue('Female');
        }

    }
    changeGenderPL() {
        if (this.personal.controls['personalTitle'].value == 'MR'){
            this.personal.controls['personalGender'].patchValue('Male');
        } else {
            this.personal.controls['personalGender'].patchValue('Female');
        }
        if(this.insuredForm1.controls['title'].value == 'MR') {
            this.insuredForm1.controls['gender'].patchValue('Male');
        } else {
            this.insuredForm1.controls['gender'].patchValue('Female');
        }
        if(this.insuredForm2.controls['title'].value == 'MR') {
            this.insuredForm2.controls['gender'].patchValue('Male');
        } else {
            this.insuredForm2.controls['gender'].patchValue('Female');
        }
        if(this.insuredForm3.controls['title'].value == 'MR') {
            this.insuredForm3.controls['gender'].patchValue('Male');
        } else {
            this.insuredForm3.controls['gender'].patchValue('Female');
        }
        if(this.insuredForm4.controls['title'].value == 'MR') {
            this.insuredForm4.controls['gender'].patchValue('Male');
        } else {
            this.insuredForm4.controls['gender'].patchValue('Female');
        }
    }


    selectRelationship(index){
        this.insureArray['controls'].items['controls'][index]['controls'].personalrelationshipName.patchValue(this.insureRelationList[this.insureArray['controls'].items['controls'][index]['controls'].personalrelationship.value]);
        console.log(this.insureArray.value, 'insureArray');
    }
    selectIns1Relationship() {
        this.insuredForm1.controls['insuredRelation'].patchValue(this.insureRelationList[this.insuredForm1.controls['relationship'].value]);
    }
    selectIns2Relationship() {
        this.insuredForm2.controls['insuredRelation'].patchValue(this.insureRelationList[this.insuredForm2.controls['relationship'].value]);
    }
    selectIns3Relationship() {
        this.insuredForm3.controls['insuredRelation'].patchValue(this.insureRelationList[this.insuredForm3.controls['relationship'].value]);
    }
    selectIns4Relationship() {
        this.insuredForm4.controls['insuredRelation'].patchValue(this.insureRelationList[this.insuredForm4.controls['relationship'].value]);
    }
    selectNominRelationship() {
        this.nomineeDetails.controls['nominRelation'].patchValue(this.insureRelationList[this.nomineeDetails.controls['religareRelationship'].value]);
    }
    selectNomineeRelationship() {
        this.nomineeDetails.controls['nomineRelationshipName'].patchValue(this.insureRelationList[this.nomineeDetails.controls['religareRelationship'].value]);
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
    sameAddressInsurer(values: any, index) {
        if (values.checked) {
            this.insureArray['controls'].items['controls'][index]['controls'].cityHide.patchValue(this.insureArray['controls'].items['controls'][index]['controls'].sameas.value);
            this.insureArray['controls'].items['controls'][index]['controls'].residenceAddress.patchValue(this.insureArray['controls'].items['controls'][index]['controls'].personalAddress.value);
            this.insureArray['controls'].items['controls'][index]['controls'].residenceAddress2.patchValue(this.insureArray['controls'].items['controls'][index]['controls'].personalAddress2.value);
            this.insureArray['controls'].items['controls'][index]['controls'].residenceCity.patchValue(this.insureArray['controls'].items['controls'][index]['controls'].personalCity.value);
            this.insureArray['controls'].items['controls'][index]['controls'].residencePincode.patchValue(this.insureArray['controls'].items['controls'][index]['controls'].personalPincode.value);
            this.insureArray['controls'].items['controls'][index]['controls'].residenceState.patchValue(this.insureArray['controls'].items['controls'][index]['controls'].personalState.value);

        } else {
            this.insureArray['controls'].items['controls'][index]['controls'].cityHide.patchValue(this.insureArray['controls'].items['controls'][index]['controls'].sameas.value);
            this.insureArray['controls'].items['controls'][index]['controls'].residenceAddress.patchValue('');
            this.insureArray['controls'].items['controls'][index]['controls'].residenceAddress2.patchValue('');
            this.insureArray['controls'].items['controls'][index]['controls'].residenceCity.patchValue('');
            this.insureArray['controls'].items['controls'][index]['controls'].residencePincode.patchValue('');
            this.insureArray['controls'].items['controls'][index]['controls'].residenceState.patchValue('');

        }
    }
    // insured dob
    addEventInsurer(event,  i, type, name) {
        if (event.value != null) {
            let selectedDate = '';
            let dob = '';
            let dob_days = '';
            let getAge;
            let getDays;
            dob = this.datepipe.transform(event.value, 'y-MM-dd');
            dob_days = this.datepipe.transform(event.value, 'dd-MM-y');
            if (typeof event.value._i == 'string') {
                const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
                if (pattern.test(event.value._i) && event.value._i.length == 10) {
                    this.insureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
                } else {
                    this.insureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('Enter Valid Date');
                }
                selectedDate = event.value._i;
                if (selectedDate.length == 10) {
                    if (name == 'insurer') {
                        getAge = this.ageCalculate(dob);
                        getDays = this.DobDaysCalculate(dob_days);
                        this.insureArray['controls'].items['controls'][i]['controls'].personalDob.patchValue(dob);
                    }
                } else {
                    this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
                }
            }else if (typeof event.value._i == 'object') {
                this.insureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
                if (dob.length == 10) {
                    if (name == 'insurer') {
                        getAge = this.ageCalculate(dob);
                        getDays = this.DobDaysCalculate(dob_days);
                        this.insureArray['controls'].items['controls'][i]['controls'].personalDob.patchValue(dob);
                    }
                }
            }
            // let length =  this.datepipe.transform(this.insureArray['controls'].items['controls'][i]['controls'].personalDob.value, 'y-MM-dd');
            console.log(getDays, 'getDays');

            if (getDays || getDays == 0) {
                if (name == 'insurer') {
                    this.insureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
                    this.insureArray['controls'].items['controls'][i]['controls'].ins_age.patchValue(getAge);
                    this.insureArray['controls'].items['controls'][i]['controls'].ins_days.patchValue(getDays);
                    this.ageValidation(i, type);
                }
            } else {
                this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
            }

        }

    }

    ageValidation(i, type) {

        if(this.buyProductdetails.product_id == '2') {
            if(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value <= 16800 && type == 'Self') {
                this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Self age should be 46 and above');
            } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value >=16800 && type == 'Self')  {
                this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
                this.arr.push(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value);
            }
            if(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value < 16800 && type == 'Spouse') {
                this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Spouse age should be 46 and above');
            } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value >= 16800 && type == 'Spouse')  {
                this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
                this.arr.push(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value);
            }
        } else {
            if(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value < 6574 && type == 'Self') {
                this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Self age should be 18 and above');
            } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value > 6573 && type == 'Self')  {
                this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
                this.arr.push(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value);
            }
            if(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value < 6574 && type == 'Spouse') {
                this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Spouse age should be 18 and above');
            } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value > 6573 && type == 'Spouse')  {
                this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
                this.arr.push(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value);
            }
        }


        let smallest = this.arr[0];
        for(let i = 1; i<this.arr.length; i++){
            if(this.arr[i] < smallest){
                smallest = this.arr[i];
            }
        }


        if(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value > 90 && this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value <= 9130 && type == 'Son')  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value < 91 && type == 'Son')  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 91 days to 25 years');
        } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value >= 9130 && type == 'Son')  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 91 days to 25 years');
        }

        if(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value > 90 && this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value <= 9130 && type == 'Daughter')  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value < 91 && type == 'Daughter')  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 91 days to 25 years');
        } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value >= 9130 && type == 'Daughter')  {
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

    DobDaysCalculate(getDays) {
        let a = moment(getDays, 'DD/MM/YYYY');
        let b = moment(new Date(), 'DD/MM/YYYY');
        let days = b.diff(a, 'days');
        return days;
    }
    sameProposer(value: any) {
        if (value.checked) {
            this.insureArray['controls'].items['controls'][0]['controls'].sameAsProposer.patchValue(true);
            this.insureArray['controls'].items['controls'][0]['controls'].cityHide.patchValue(true);
            this.insureArray['controls'].items['controls'][0]['controls'].pCityHide.patchValue(true);
            this.insureArray['controls'].items['controls'][0]['controls'].personalTitle.patchValue(this.personal.controls['personalTitle'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].personalFirstname.patchValue(this.personal.controls['personalFirstname'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].personalLastname.patchValue(this.personal.controls['personalLastname'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].personalDob.patchValue(this.personal.controls['personalDob'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].personalAadhar.patchValue(this.personal.controls['personalAadhar'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].personalrelationship.patchValue(this.personal.controls['personalrelationship'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].personalrelationshipName.patchValue(this.insureRelationList['SELF']);
            this.insureArray['controls'].items['controls'][0]['controls'].personalGender.patchValue(this.personal.controls['personalGender'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].personalPan.patchValue(this.personal.controls['personalPan'].value.toUpperCase());
            this.insureArray['controls'].items['controls'][0]['controls'].personalGst.patchValue(this.personal.controls['personalGst'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].personalEmail.patchValue(this.personal.controls['personalEmail'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].personalMobile.patchValue(this.personal.controls['personalMobile'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].personalAltnumber.patchValue(this.personal.controls['personalAltnumber'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].rolecd.patchValue('PRIMARY');
            if (sessionStorage.proposerAge >= 18) {
                this.insureArray['controls'].items['controls'][0]['controls'].insurerDobValidError.patchValue('');
            } else {
                this.insureArray['controls'].items['controls'][0]['controls'].insurerDobValidError.patchValue('Enter Valid Date');
            }
        } else {
            this.insureArray['controls'].items['controls'][0]['controls'].sameAsProposer.patchValue(false);
            this.insureArray['controls'].items['controls'][0]['controls'].cityHide.patchValue(false);
            this.insureArray['controls'].items['controls'][0]['controls'].pCityHide.patchValue(true);
            this.insureArray['controls'].items['controls'][0]['controls'].personalTitle.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].personalFirstname.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].personalLastname.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].personalDob.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].personalAadhar.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].personalrelationship.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].personalGender.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].personalPan.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].personalGst.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].personalEmail.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].personalMobile.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].personalAltnumber.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].rolecd.patchValue('PRIMARY');
        }
    }
    sameProposerPL(value: any) {
        if (value.checked) {
            this.insuredForm1.controls['sameAsProposer'].patchValue(true);
            this.insuredForm1.controls['title'].patchValue(this.personal.controls['personalTitle'].value);
            this.insuredForm1.controls['firstname'].patchValue(this.personal.controls['personalFirstname'].value);
            this.insuredForm1.controls['lastname'].patchValue(this.personal.controls['personalLastname'].value);
            this.insuredForm1.controls['gender'].patchValue(this.personal.controls['personalGender'].value);
            this.insuredForm1.controls['dob'].patchValue(this.personal.controls['personalDob'].value);
            this.insuredForm1.controls['relationship'].patchValue('SELF');
            this.insuredForm1.controls['aadhar'].patchValue(this.personal.controls['personalAadhar'].value);
            this.insuredForm1.controls['pan'].patchValue(this.personal.controls['personalPan'].value);
            this.insuredForm1.controls['gst'].patchValue(this.personal.controls['personalGst'].value);
            this.insuredForm1.controls['email'].patchValue(this.personal.controls['personalEmail'].value);
            this.insuredForm1.controls['mobile'].patchValue(this.personal.controls['personalMobile'].value);
            this.insuredForm1.controls['altnumber'].patchValue(this.personal.controls['personalAltnumber'].value);
            // this.insureArray['controls'].items['controls'][0]['controls'].rolecd.patchValue('PRIMARY');
        } else {
            this.insuredForm1.controls['sameAsProposer'].patchValue(false);
            this.insuredForm1.controls['title'].patchValue('');
            this.insuredForm1.controls['firstname'].patchValue('');
            this.insuredForm1.controls['lastname'].patchValue('');
            this.insuredForm1.controls['gender'].patchValue('');
            this.insuredForm1.controls['dob'].patchValue('');
            this.insuredForm1.controls['relationship'].patchValue('');
            this.insuredForm1.controls['aadhar'].patchValue('');
            this.insuredForm1.controls['pan'].patchValue('');
            this.insuredForm1.controls['gst'].patchValue('');
            this.insuredForm1.controls['email'].patchValue('');
            this.insuredForm1.controls['mobile'].patchValue('');
            this.insuredForm1.controls['altnumber'].patchValue('');
        }
    }
    processDiseaseData(diseaseData) {
        console.log(diseaseData, 'diseaseData nrml.......')

        let updatedFinalData = [];
        for (let i = 0; i < diseaseData.proposer_insurer_details.length; i++ ) {
            if (diseaseData.proposer_insurer_details[i]['role_cd'] == 'PRIMARY') {
                let updatedData = [];
                for (let j = 0; j < diseaseData.proposer_insurer_details[i]['questions_list'].length; j++ ) {
                    let newObject = {};
                    newObject['question_id'] = diseaseData.proposer_insurer_details[i]['questions_list'][j]['question_id'];
                    newObject['question_set_cd'] = diseaseData.proposer_insurer_details[i]['questions_list'][j]['question_set_code'];
                    newObject['question_cd'] = diseaseData.proposer_insurer_details[i]['questions_list'][j]['question_code'];

                    if ( diseaseData.proposer_insurer_details[i]['questions_list'][j]['status'] == true) {
                        newObject['response'] = true;

                    } else if (diseaseData.proposer_insurer_details[i]['questions_list'][j]['status']  == false) {
                        newObject['response'] = false;

                    }
                    updatedData.push(newObject);
                    console.log(updatedData, 'updatedData nrml........')

                    if (diseaseData.proposer_insurer_details[i]['questions_list'][j]['existing_question_code'] != '') {
                        newObject = {};
                        newObject['question_id'] = diseaseData.proposer_insurer_details[i]['questions_list'][j]['question_id'];
                        newObject['question_set_cd'] = diseaseData.proposer_insurer_details[i]['questions_list'][j]['question_set_code'];
                        newObject['question_cd'] = diseaseData.proposer_insurer_details[i]['questions_list'][j]['existing_question_code'];
                        newObject['response'] = diseaseData.proposer_insurer_details[i]['questions_list'][j]['existingSince'];
                        updatedData.push(newObject);

                    }
                    if(diseaseData.proposer_insurer_details[i]['questions_list'][j]['otherdetails_desc_code'] != '') {
                        newObject = {};

                        newObject['question_id'] = diseaseData.proposer_insurer_details[i]['questions_list'][j]['question_id'];
                        newObject['question_set_cd'] = diseaseData.proposer_insurer_details[i]['questions_list'][j]['question_set_code'];
                        newObject['question_cd'] = diseaseData.proposer_insurer_details[i]['questions_list'][j]['otherdetails_desc_code'];
                        newObject['response'] = diseaseData.proposer_insurer_details[i]['questions_list'][j]['diseasesDescription'];
                        updatedData.push(newObject);

                    }

                }
                this.totalData.proposer_insurer_details[i]['questions_list'] = updatedData;
            }
        }



    }
    processDiseaseDataPL(diseaseData) {

        let updatedFinalData = [];
        for (let i = 0; i < diseaseData.proposer_insurer_details.length; i++ ) {
            console.log(diseaseData.proposer_insurer_details, 'diseaseData.proposer_insurer_details')
            // alert('1')
            if (diseaseData.proposer_insurer_details[i]['role_cd'] == 'PRIMARY') {
                // alert('2')
                // console.log(iseaseData.proposer_insurer_details.)
                let updatedData = [];
                for (let j = 0; j < diseaseData.proposer_insurer_details[i]['questions_list'].length; j++ ) {
                    // alert('3')
                    let newObject = {};
                    newObject['question_id'] = diseaseData.proposer_insurer_details[i]['questions_list'][j]['question_id'];
                    newObject['question_set_cd'] = diseaseData.proposer_insurer_details[i]['questions_list'][j]['question_set_code'];
                    newObject['question_cd'] = diseaseData.proposer_insurer_details[i]['questions_list'][j]['question_code'];

                    if ( diseaseData.proposer_insurer_details[i]['questions_list'][j]['status'] == true) {
                        newObject['response'] = true;

                    } else if (diseaseData.proposer_insurer_details[i]['questions_list'][j]['status']  == false) {
                        newObject['response'] = false;

                    }
                    updatedData.push(newObject);

                    if (diseaseData.proposer_insurer_details[i]['questions_list'][j]['existing_question_code'] != '') {
                        newObject = {};
                        newObject['question_id'] = diseaseData.proposer_insurer_details[i]['questions_list'][j]['question_id'];
                        newObject['question_set_cd'] = diseaseData.proposer_insurer_details[i]['questions_list'][j]['question_set_code'];
                        newObject['question_cd'] = diseaseData.proposer_insurer_details[i]['questions_list'][j]['existing_question_code'];
                        newObject['response'] = diseaseData.proposer_insurer_details[i]['questions_list'][j]['existingSince'];
                        updatedData.push(newObject);

                    }
                    if(diseaseData.proposer_insurer_details[i]['questions_list'][j]['otherdetails_desc_code'] != '') {
                        newObject = {};

                        newObject['question_id'] = diseaseData.proposer_insurer_details[i]['questions_list'][j]['question_id'];
                        newObject['question_set_cd'] = diseaseData.proposer_insurer_details[i]['questions_list'][j]['question_set_code'];
                        newObject['question_cd'] = diseaseData.proposer_insurer_details[i]['questions_list'][j]['otherdetails_desc_code'];
                        newObject['response'] = diseaseData.proposer_insurer_details[i]['questions_list'][j]['diseasesDescription'];
                        updatedData.push(newObject);

                    }

                }
                this.totalDataPL.proposer_insurer_details[i]['questions_list'] = updatedData;
            }
        }



    }





    religareInsureDetails(stepper: MatStepper, value, key) {
        console.log(value, 'valuevaluevalue.........')
        console.log(this.insureArray.value, 'qqqqqqqqq')
        sessionStorage.stepper2Details = '';
        sessionStorage.stepper2Details = JSON.stringify(value);
        this.insurerData = value;
        // this.personal.controls['personalCityName'].patchValue(this.personalCitys[this.personal.controls['personalCity'].value]);
        // this.personal.controls['residenceCityName'].patchValue(this.residenceCitys[this.personal.controls['residenceCity'].value]);
        this.proposerInsureData = [];
        this.totalReligareData = [];
        this.insuredDetails = [];
        this.proposerInsureData.push(this.personal.value);

        for (let i = 0; i < this.insurerData.items.length; i++) {
            this.insuredDetails.push({
                'title': this.insurerData.items[i].personalTitle,
                'proposer_fname': this.insurerData.items[i].personalFirstname,
                'proposer_lname': this.insurerData.items[i].personalLastname,
                'proposer_gender': this.insurerData.items[i].personalGender,
                'prop_dob': this.datepipe.transform(this.insurerData.items[i].personalDob, 'y-MM-dd'),
                'proposer_aadhar': this.insurerData.items[i].personalAadhar,
                'proposer_pan': this.insurerData.items[i].personalPan,
                'proposer_gst': this.insurerData.items[i].personalGst,
                'proposer_email': this.insurerData.items[i].personalEmail,
                'proposer_mob': this.insurerData.items[i].personalMobile,
                'proposer_alter_mob': this.insurerData.items[i].personalAltnumber,
                'relationship_cd': i == 0 ? 'SELF' : this.insurerData.items[i].personalrelationship ,
                'role_cd': this.insurerData.items[i].rolecd,
                'height': this.insurerData.items[i].personalHeight,
                'weight': this.insurerData.items[i].personalWeight,
                'type': this.insurerData.items[i].type,
                'sameas': false ? 0 : 1
            });
        }
        console.log(this.insuredDetails, 'steppertwoDEtails')

        for (let i = 0; i < this.insurerData.items.length; i++) {
            this.proposerInsureData.push(this.insurerData.items[i]);
        }
        for (let i = 0; i < this.proposerInsureData.length; i++) {
            this.totalReligareData.push({
                'title': this.proposerInsureData[i].personalTitle,
                'proposer_fname': this.proposerInsureData[i].personalFirstname,
                'proposer_lname': this.proposerInsureData[i].personalLastname,
                'prop_email_list': [{
                    'email': this.proposerInsureData[i].personalEmail,
                    'email_type': 'PERSONAL'
                }],
                'prop_contact_list': [{
                    'contact_no': this.proposerInsureData[i].personalMobile,
                    'contact_type': 'MOBILE',
                    'std_code': '91'
                }],
                'prop_identity_list': [
                    {
                        'identity_number': this.proposerInsureData[i].personalPan,
                        'identity_type': this.proposerInsureData[i].personalPan != '' ? 'PAN' : ''
                    }
                ],
                'proposer_res_address1': this.proposerInsureData[0].residenceAddress,
                'proposer_res_address2': this.proposerInsureData[0].residenceAddress2,
                'proposer_res_area': this.proposerInsureData[0].residenceCity,
                'proposer_res_city': this.proposerInsureData[0].residenceCity,
                'proposer_res_state': this.proposerInsureData[0].residenceState,
                'proposer_res_pincode': this.proposerInsureData[0].residencePincode,
                'proposer_comm_address1': this.proposerInsureData[0].personalAddress,
                'proposer_comm_address2': this.proposerInsureData[0].personalAddress2,
                'proposer_comm_area': this.proposerInsureData[0].personalCity,
                'proposer_comm_city': this.proposerInsureData[0].personalCity,
                'proposer_comm_state': this.proposerInsureData[0].personalState,
                'proposer_comm_pincode': this.proposerInsureData[0].personalPincode,
                'prop_dob': this.datepipe.transform(this.proposerInsureData[i].personalDob, 'y-MM-dd'),
                'prop_gender': this.proposerInsureData[i].personalGender,
                'relationship_cd': i == 0 ? 'SELF' : this.proposerInsureData[i].personalrelationship ,
                'role_cd': this.proposerInsureData[i].rolecd,
                'height': this.proposerInsureData[i].personalHeight,
                'weight': this.proposerInsureData[i].personalWeight,
                'type': this.proposerInsureData[i].type,
            });
            if (this.proposerInsureData[i].personalAltnumber != '') {
                this.totalReligareData[i].prop_contact_list.push({
                    'contact_no': this.proposerInsureData[i].personalAltnumber,
                    'contact_type': 'RESEDENTIAL',
                    'std_code': '91'
                });
            }
            if (this.proposerInsureData[i].personalAadhar != '') {
                this.totalReligareData[i].prop_identity_list.push({
                    'identity_number': this.proposerInsureData[i].personalAadhar,
                    'identity_type': 'AADHAR'
                });
            }
            if (this.proposerInsureData[i].personalGst != '') {
                this.totalReligareData[i].prop_identity_list.push({
                    'identity_number': this.proposerInsureData[i].personalGst,
                    'identity_type': 'GST'
                });
            }
            // if (this.proposerInsureData[i].personalPan != '') {
            //     this.totalReligareData[i].prop_identity_list.push({
            //         'identity_number': this.proposerInsureData[i].personalPan,
            //         'identity_type': 'PAN'
            //     });
            // }

        }
        let aterMobile = [];
        if (this.insureArray.valid) {
            for(let i=0;i<this.insurerData.items.length; i++) {
                if (this.insureArray['controls'].items['controls'][i]['controls'].personalMobile.value.length == 10) {
                    if (this.insureArray['controls'].items['controls'][i]['controls'].personalAltnumber.value == this.insureArray['controls'].items['controls'][i]['controls'].personalMobile.value) {
                        aterMobile.push(0);
                    } else {
                        aterMobile.push(1);
                    }
                }else {
                    aterMobile.push(1);
                }
                if (this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.value != '') {
                    aterMobile.push(2);

                } else if (this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.value == '') {
                    aterMobile.push(3);

                }
            }
            if (aterMobile.includes(0)) {
                this.toastr.error('Alternative and personal number should be different');
            } else if(aterMobile.includes(2)){} else {
                stepper.next();
                this.topScroll();
                this.nextStep();
            }
        }
        if(this.insurePersons.length == 1) {
            this.sameRelationship = this.insureArray['controls'].items['controls'][0]['controls'].personalrelationship.value;
        }

        for (let i = 0; i < this.proposerInsureData.length; i++) {
            console.log(this.proposerInsureData[0].residenceAddress, 'ftyy');
            this.proposerInsureData[i].residenceAddress = this.proposerInsureData[0].residenceAddress,
                this.proposerInsureData[i].residenceAddress2 = this.proposerInsureData[0].residenceAddress2,
                this.proposerInsureData[i].residenceCityName = this.proposerInsureData[0].residenceCityName,
                this.proposerInsureData[i].residenceCityName = this.proposerInsureData[0].residenceCityName,
                this.proposerInsureData[i].residenceState = this.proposerInsureData[0].residenceState,
                this.proposerInsureData[i].residencePincode = this.proposerInsureData[0].residencePincode,
                this.proposerInsureData[i].personalAddress = this.proposerInsureData[0].personalAddress,
                this.proposerInsureData[i].personalAddress2 = this.proposerInsureData[0].personalAddress2,
                this.proposerInsureData[i].personalCityName = this.proposerInsureData[0].personalCityName,
                this.proposerInsureData[i].personalState = this.proposerInsureData[0].personalState,
                this.proposerInsureData[i].personalPincode = this.proposerInsureData[0].personalPincode
        }
        console.log(this.proposerInsureData, 'proposerInsureData112');
        console.log(this.totalReligareData, 'riligareData');
    }
    //Risk Details
    religareQuestions() {
        const data = {
            'platform': 'web',
            'product_id': this.buyProductdetails.product_id,
            'family_group': this.insurePersons,
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.proposalservice.getReligareQuestions(data).subscribe(
            (successData) => {
                this.religareQuestionsSuccess(successData);
            },
            (error) => {
                this.religareQuestionsFailure(error);
            }
        );

    }

    public religareQuestionsSuccess(successData) {
        this.religareQuestionsList = successData.ResponseObject;

        for (let i = 0; i < this.religareQuestionsList.length; i++) {
            this.religareQuestionsList[i].mStatus = 'No';
            this.religareQuestionsList[i].answer_status = false;
            for (let j = 0; j < this.religareQuestionsList[i].sub_questions_list.length; j++) {

                for (let k = 0; k < this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group.length; k++) {
                    this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].existingSince = '';
                    this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].diseasesDescription = '';
                    this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].dobError = '';
                    this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].status = false;

                }
            }
        }
        sessionStorage.religareQuestionsList = JSON.stringify(this.religareQuestionsList);
    }
    public religareQuestionsFailure(error) {
    }


    questionYes(id, event: any) {

        if (event.checked==true) {
            this.religareQuestionsList[id].mStatus = 'Yes';
            this.religareQuestionsList[id].answer_status = true;

        } else {
            this.religareQuestionsList[id].mStatus = 'No';
            this.religareQuestionsList[id].answer_status = false;
            for (let i = 0; i < this.religareQuestionsList.length; i++) {

                for (let j = 0; j < this.religareQuestionsList[i].sub_questions_list.length; j++) {

                    for (let k = 0; k < this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group.length; k++) {

                        // alert(this.religareQuestionsList[id].sub_questions_list[j].question_details.family_group[k].status)
                        this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].existingSince = '';
                        this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].dobError = '';
                        this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].diseasesDescription = '';
                        this.religareQuestionsList[id].sub_questions_list[j].question_details.family_group[k].status = false;
                    }
                }
            }
        }
    }
    questionYesPayLater (id, event: any) {
        if (event.checked==true) {
            // alert('inn');
            this.requestmedicalQuestion[id].mStatus = 'Yes';
            this.requestmedicalQuestion[id].answer_status = true;
        } else {
            this.requestmedicalQuestion[id].mStatus = 'No';
            this.requestmedicalQuestion[id].answer_status = false;
            for (let i = 0; i < this.requestmedicalQuestion.length; i++) {
                for (let j = 0; j < this.requestmedicalQuestion[i].sub_questions_list.length; j++) {
                    for (let k = 0; k < this.requestmedicalQuestion[i].sub_questions_list[j].question_details.family_group.length; k++) {
                        // alert(this.religareQuestionsList[id].sub_questions_list[j].question_details.family_group[k].status)
                        this.requestmedicalQuestion[i].sub_questions_list[j].question_details.family_group[k].existingSince = '';
                        this.requestmedicalQuestion[i].sub_questions_list[j].question_details.family_group[k].dobError = '';
                        this.requestmedicalQuestion[i].sub_questions_list[j].question_details.family_group[k].diseasesDescription = '';
                        this.requestmedicalQuestion[id].sub_questions_list[j].question_details.family_group[k].status = false;
                    }
                }
            }
        }
    }


    subStatus(value: any, i, k, j) {
        console.log(value,'value...')
        if (value.checked) {
        } else {
            this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].existingSince = '';
            this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].dobError = '';
        }
    }
    subStatusPayLater(value: any, i, k, j) {
        console.log(value,'value...')
        if (value.checked) {
        } else {
            this.requestmedicalQuestion[i].sub_questions_list[j].question_details.family_group[k].existingSince = '';
            this.requestmedicalQuestion[i].sub_questions_list[j].question_details.family_group[k].dobError = '';
        }
    }


    medicalHistoryDetails(stepper: MatStepper) {
        sessionStorage.stepper3Details = '';
        sessionStorage.stepper3Details = JSON.stringify(this.religareQuestionsList);
        this.questions_list = [];
        this.getFilterData = [];
        for (let i = 0; i < this.religareQuestionsList.length; i++) {
            console.log(this.religareQuestionsList, 'nrml')
            for (let j = 0; j < this.religareQuestionsList[i].sub_questions_list.length; j++) {
                console.log(this.religareQuestionsList[i].sub_questions_list, 'nrml')
                for (let k = 0; k < this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group.length; k++) {
                    console.log(this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group, 'nrml')
                    this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].question_id = this.religareQuestionsList[i].sub_questions_list[j].question_details.question_id;
                    this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].question_set_code = this.religareQuestionsList[i].sub_questions_list[j].question_set_code;
                    this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].question_code = this.religareQuestionsList[i].sub_questions_list[j].question_details.question_code;
                    this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].existing_question_code = this.religareQuestionsList[i].sub_questions_list[j].question_details.existing_question_code;
                    this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].otherdetails_desc_code = this.religareQuestionsList[i].sub_questions_list[j].question_details.other_description_code;
                    this.questions_list.push(this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k]);
                    console.log(this.questions_list,'this.questions_list.')
                }
            }
        }
        for (let i = 0; i < this.getFamilyDetails.family_members.length; i++) {
            this.getFilterData.push(this.questions_list.filter(data => data.type == this.getFamilyDetails.family_members[i].type ));
        }
        console.log(this.getFilterData, 'nrml  this.getFilterData')

        for (let i = 0; i < this.totalReligareData.length; i++) {
            if (i > 0) {
                this.totalReligareData[i].questions_list = this.getFilterData[i -1];
            }
        }
        let statusChecked = [];
        this.medicalStatus = [];
        for (let i = 0; i < this.religareQuestionsList.length; i++) {
            if(this.religareQuestionsList[i].mStatus == 'No'){
                // alert('religareQuestionsList No')
                // alert(this.religareQuestionsList[i].mStatus)  //no  toggle
                this.medicalStatus.push('No');
                // alert(this.medicalStatus)  ///no,ye,no   taoggle

            } else if(this.religareQuestionsList[i].mStatus == 'Yes') {   ///first one yes means satisfied this condition
                // alert('religareQuestionsList yes')
                // alert(this.religareQuestionsList[i].mStatus)
                this.medicalStatus.push('Yes');
                // alert(this.medicalStatus)

            }
            for (let i = 0; i < this.totalReligareData.length; i++) {
                this.totalReligareData[i].medical_status = this.medicalStatus.includes('Yes') ? 'Yes' : 'No'//toggle length
                // alert('medi')
                // alert(this.totalReligareData[i].medical_status)
            }
            if (this.religareQuestionsList[i].answer_status == true) {
                // alert('answer_status');
                // alert(this.religareQuestionsList[i].answer_status)
                for (let j = 0; j < this.religareQuestionsList[i].sub_questions_list.length; j++) {

                    for (let k = 0; k < this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group.length; k++) {
                        if(this.religareQuestionsList[i].mStatus == 'Yes'){

                            if (this.religareQuestionsList[i].mStatus == 'Yes'&&this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].status == true) {
                                // this.checkBoxError=true;

                                if (this.religareQuestionsList[i].sub_questions_list[j].question_details.question_description != '') {
                                    statusChecked.push(1);

                                    if (this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].existingSince == '') {
                                        statusChecked.push(0);

                                    }
                                } else {
                                    if (this.religareQuestionsList[i].sub_questions_list[j].question_details.description_textarea == '1') {
                                        if (this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].diseasesDescription == '') {
                                            statusChecked.push(0);

                                        } else {
                                            statusChecked.push(1);

                                        }
                                    } else {
                                        statusChecked.push(1);

                                    }
                                }

                            }
                            else if(this.religareQuestionsList[i].mStatus == 'Yes'&&this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].status != true){
                                // this.checkBoxError=false;

                            }
                        }
                    }
                }
                if (statusChecked.length == 0){
                    statusChecked.push(2);


                }
            } else {
                if (i == this.religareQuestionsList.length - 1) {
                    statusChecked.push(1);

                }

            }
        }
        if (statusChecked.includes(0)) {

            this.toastr.error('Please fill the empty field');
        } else if (statusChecked.includes(2)) {

            this.toastr.error('Please Select Atleast One Checkbox! for Selected Question');
        } else {

            // if(this.checkBoxError==true){
                stepper.next();
                this.topScroll();
                this.nextStep();
                this.religareMobileTrue2 = false;
                this.religareMobileTrue3 = false;
            // }
            // else  if(this.checkBoxError==false){
            //     this.toastr.error('Please Select Atleast One Checkbox! for Selected Question');
            // }
        }
    }


    medicalHistoryDetailsPayLater() {
        this.questions_list = [];
        this.getFilterData = [];
        for (let i = 0; i < this.requestmedicalQuestion.length; i++) {
            console.log(this.requestmedicalQuestion.length, 'this.requestmedicalQuestion.length')
            console.log(this.requestmedicalQuestion, 'this.requestmedicalQuestion')
            for (let j = 0; j < this.requestmedicalQuestion[i].sub_questions_list.length; j++) {
                console.log(this.requestmedicalQuestion[i].sub_questions_list.length, 'this.requestmedicalQuestion[i].sub_questions_list.length')
                console.log(this.requestmedicalQuestion[i].sub_questions_list, 'this.requestmedicalQuestion[i].sub_questions_list')
                for (let k = 0; k < this.requestmedicalQuestion[i].sub_questions_list[j].question_details.family_group.length; k++) {
                    console.log(this.requestmedicalQuestion[i].sub_questions_list[j].question_details.family_group.length, 'this.requestmedicalQuestion[i].sub_questions_list[j].question_details.family_group.length;')
                    console.log(this.requestmedicalQuestion[i].sub_questions_list[j].question_details.family_group, 'this.requestmedicalQuestion[i].sub_questions_list[j].question_details.family_group')
                    this.requestmedicalQuestion[i].sub_questions_list[j].question_details.family_group[k].question_id = this.requestmedicalQuestion[i].sub_questions_list[j].question_details.question_id;
                    this.requestmedicalQuestion[i].sub_questions_list[j].question_details.family_group[k].question_set_code = this.requestmedicalQuestion[i].sub_questions_list[j].question_set_code;
                    this.requestmedicalQuestion[i].sub_questions_list[j].question_details.family_group[k].question_code = this.requestmedicalQuestion[i].sub_questions_list[j].question_details.question_code;
                    this.requestmedicalQuestion[i].sub_questions_list[j].question_details.family_group[k].existing_question_code = this.requestmedicalQuestion[i].sub_questions_list[j].question_details.existing_question_code;
                    this.requestmedicalQuestion[i].sub_questions_list[j].question_details.family_group[k].otherdetails_desc_code = this.requestmedicalQuestion[i].sub_questions_list[j].question_details.other_description_code;
                    this.questions_list.push(this.requestmedicalQuestion[i].sub_questions_list[j].question_details.family_group[k]);
                    console.log(this.questions_list,'this.questions_list.')
                }
            }
        }
        for (let i = 1; i < this.payoutDetaillsss.length; i++) {
            this.getFilterData.push(this.questions_list.filter(data => data.type == this.payoutDetaillsss[i].type ));
        }
        for (let i = 0; i < this.totalPayLaterDetails.length; i++) {
            if (i > 0) {
                this.totalPayLaterDetails[i].questions_list = this.getFilterData[i -1];
                console.log(this.totalPayLaterDetails[i].questions_list, 'lathaaaaaaaaaa')
            }
        }
        console.log(this.totalPayLaterDetails, 'lathaaaaaaaaaa')
        let statusChecked = [];
        this.medicalStatus = [];
        for (let i = 0; i < this.requestmedicalQuestion.length; i++) {
            if(this.requestmedicalQuestion[i].mStatus == 'No'){
                // alert('religareQuestionsList No')
                // alert(this.religareQuestionsList[i].mStatus)  //no  toggle
                this.medicalStatus.push('No');
                // alert(this.medicalStatus)  ///no,ye,no   taoggle

            } else if(this.requestmedicalQuestion[i].mStatus == 'Yes') {   ///first one yes means satisfied this condition
                // alert('religareQuestionsList yes')
                // alert(this.religareQuestionsList[i].mStatus)
                this.medicalStatus.push('Yes');
                // alert(this.medicalStatus)

            }
            for (let i = 0; i < this.totalPayLaterDetails.length; i++) {
                this.totalPayLaterDetails[i].medical_status = this.medicalStatus.includes('Yes') ? 'Yes' : 'No'//toggle length
                // alert('medi')
                // alert(this.totalReligareData[i].medical_status)
            }
            if (this.requestmedicalQuestion[i].answer_status == true) {
                // alert('answer_status');
                // alert(this.religareQuestionsList[i].answer_status)
                for (let j = 0; j < this.requestmedicalQuestion[i].sub_questions_list.length; j++) {

                    for (let k = 0; k < this.requestmedicalQuestion[i].sub_questions_list[j].question_details.family_group.length; k++) {
                        if(this.requestmedicalQuestion[i].mStatus == 'Yes'){

                            if (this.requestmedicalQuestion[i].mStatus == 'Yes' && this.requestmedicalQuestion[i].sub_questions_list[j].question_details.family_group[k].status == true) {
                                this.checkBoxError=true;

                                if (this.requestmedicalQuestion[i].sub_questions_list[j].question_details.question_description != '') {
                                    statusChecked.push(1);

                                    if (this.requestmedicalQuestion[i].sub_questions_list[j].question_details.family_group[k].existingSince == '') {
                                        statusChecked.push(0);

                                    }
                                } else {
                                    if (this.requestmedicalQuestion[i].sub_questions_list[j].question_details.description_textarea == '1') {
                                        if (this.requestmedicalQuestion[i].sub_questions_list[j].question_details.family_group[k].diseasesDescription == '') {
                                            statusChecked.push(0);

                                        } else {
                                            statusChecked.push(1);

                                        }
                                    } else {
                                        statusChecked.push(1);

                                    }
                                }

                            }
                            else if(this.requestmedicalQuestion[i].mStatus == 'Yes' && this.requestmedicalQuestion[i].sub_questions_list[j].question_details.family_group[k].status != true){
                                this.checkBoxError=false;

                            }
                        }
                    }
                }
                if (statusChecked.length == 0){
                    statusChecked.push(2);


                }
            } else {
                if (i == this.requestmedicalQuestion.length - 1) {
                    statusChecked.push(1);

                }

            }
        }
        if (statusChecked.includes(0)) {

            this.toastr.error('Please fill the empty field');
        } else if (statusChecked.includes(2)) {

            this.toastr.error('Please Select Atleast One Checkbox! for Selected Question');
        } else {

            if(this.checkBoxError==true){
                // stepper.next();
                // this.topScroll();
                // this.nextStep();
                // this.religareMobileTrue2 = false;
                // this.religareMobileTrue3 = false;
            }
            else  if(this.checkBoxError==false){
                this.toastr.error('Please Select Atleast One Checkbox! for Selected Question');
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
            this.topScroll();
            this.nextStep();
        } else {
            this.toastr.error('Please fill the all Answers');

        }
    }
    //Nominee Details
    religareNomineeDetails(stepper: MatStepper, value) {
        this.lastStepper = stepper;
        if (this.nomineeDetails.valid) {
            sessionStorage.nomineeData = '';
            sessionStorage.nomineeData = JSON.stringify(value);
            this.proposal(stepper);
            this.suminsureddropdownProposal(stepper);
        }
    }
    // selectNomineeRelation(){
    //     console.log(this.insureRelationList, 'lyyy');
    //     console.log(this.insureRelationList[this.nomineeDetails['controls'].religareRelationship.value], 'hhhh');
    //     console.log(this.nomineeDetails['controls'].religareRelationship.value, 'wwww');
    //     this.nomineeDetails['controls'].nomineRelationshipName.patchValue(this.insureRelationList[this.nomineeDetails['controls'].religareRelationship.value]);
    //
    //     console.log(this.nomineeDetails.value, 'nomiee');
    // }

    // session Details
    sessionData() {
        if (sessionStorage.personalCitys != '' && sessionStorage.personalCitys != undefined) {
            this.personalCitys = JSON.parse(sessionStorage.personalCitys);
        }
        if (sessionStorage.residenceCitys != '' && sessionStorage.residenceCitys != undefined) {
            this.residenceCitys = JSON.parse(sessionStorage.residenceCitys);
        }
        if (sessionStorage.iPersonalCitys != '' && sessionStorage.iPersonalCitys != undefined) {
            this.iPersonalCitys = JSON.parse(sessionStorage.iPersonalCitys);
        }
        if (sessionStorage.areaNames != '' && sessionStorage.areaNames != undefined) {
            this.areaNames = JSON.parse(sessionStorage.areaNames);
        }
        if (sessionStorage.stepper1Details != '' && sessionStorage.stepper1Details != undefined) {
            this.getStepper1 = JSON.parse(sessionStorage.stepper1Details);
            this.personal = this.fb.group({
                personalTitle: this.getStepper1.personalTitle,
                personalFirstname: this.getStepper1.personalFirstname,
                personalLastname: this.getStepper1.personalLastname,
                personalDob: new FormControl(new Date(this.getStepper1.personalDob)),
                personalArea: this.getStepper1.personalArea,
                residenceArea: this.getStepper1.residenceArea,
                personalAadhar: this.getStepper1.personalAadhar,
                personalrelationship: this.getStepper1.personalrelationship,
                sameAsProposer: this.getStepper1.sameAsProposer,
                personalGender: this.getStepper1.personalGender,
                personalPan: this.getStepper1.personalPan.toUpperCase(),
                personalGst: this.getStepper1.personalGst,
                personalAddress: this.getStepper1.personalAddress,
                personalAddress2: this.getStepper1.personalAddress2,
                personalPincode: this.getStepper1.personalPincode,
                personalCity: this.getStepper1.personalCity,
                personalCityName: this.getStepper1.personalCityName,
                personalState: this.getStepper1.personalState,
                personalEmail: this.getStepper1.personalEmail,
                personalMobile: this.getStepper1.personalMobile,
                personalAltnumber: this.getStepper1.personalAltnumber,
                mobileNumber: this.getStepper1.mobileNumber,
                personalWeight: this.getStepper1.personalWeight,
                personalHeight: this.getStepper1.personalHeight,
                residenceAddress: this.getStepper1.residenceAddress,
                residenceAddress2: this.getStepper1.residenceAddress2,
                residencePincode: this.getStepper1.residencePincode,
                residenceCity: this.getStepper1.residenceCity,
                residenceCityName: this.getStepper1.residenceCityName,
                residenceState: this.getStepper1.residenceState,
                rolecd: this.getStepper1.rolecd,
                relationshipcd: this.getStepper1.relationshipcd,
                sameas: this.getStepper1.sameas
            });

            if (sessionStorage.addonDetails != '' && sessionStorage.addonDetails != undefined) {
                let getAddon = JSON.parse(sessionStorage.addonDetails);
                setTimeout(() => {
                    for(let i = 0; i < getAddon.length; i++){
                        if(getAddon[i].checked == true){
                            this.objectKeys[i].checked = getAddon[i].checked;
                        }
                    }
                },2000);

            }

        }

        if (sessionStorage.stepper2Details != '' && sessionStorage.stepper2Details != undefined) {
            this.getStepper2 = JSON.parse(sessionStorage.stepper2Details);
            for (let i = 0; i < this.getStepper2.items.length; i++) {
                // if(this.buyProductdetails.product_name != 'Care Freedom' && this.insureSingle) {
                //      this.insureArray['controls'].items['controls'][i]['controls'].sameAsProposer.patchValue(false);
                // }
                this.insureArray['controls'].items['controls'][i]['controls'].personalTitle.patchValue(this.getStepper2.items[i].personalTitle);
                this.insureArray['controls'].items['controls'][i]['controls'].personalFirstname.patchValue(this.getStepper2.items[i].personalFirstname);
                this.insureArray['controls'].items['controls'][i]['controls'].personalLastname.patchValue(this.getStepper2.items[i].personalLastname);
                this.insureArray['controls'].items['controls'][i]['controls'].personalDob.patchValue(this.datepipe.transform(this.getStepper2.items[i].personalDob, 'y-MM-dd'));
                this.insureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue(this.getStepper2.items[i].insurerDobValidError);
                this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue(this.getStepper2.items[i].insurerDobError);
                this.insureArray['controls'].items['controls'][i]['controls'].personalAadhar.patchValue(this.getStepper2.items[i].personalAadhar);
                this.insureArray['controls'].items['controls'][i]['controls'].personalrelationship.patchValue(this.getStepper2.items[i].personalrelationship);
                this.insureArray['controls'].items['controls'][i]['controls'].personalrelationshipName.patchValue(this.getStepper2.items[i].personalrelationshipName);
                this.insureArray['controls'].items['controls'][i]['controls'].personalGender.patchValue(this.getStepper2.items[i].personalGender);
                this.insureArray['controls'].items['controls'][i]['controls'].personalPan.patchValue(this.getStepper2.items[i].personalPan.toUpperCase());
                this.insureArray['controls'].items['controls'][i]['controls'].personalGst.patchValue(this.getStepper2.items[i].personalGst);

                this.insureArray['controls'].items['controls'][i]['controls'].personalHeight.patchValue(this.getStepper2.items[i].personalHeight);
                this.insureArray['controls'].items['controls'][i]['controls'].personalWeight.patchValue(this.getStepper2.items[i].personalWeight);
                this.insureArray['controls'].items['controls'][i]['controls'].personalEmail.patchValue(this.getStepper2.items[i].personalEmail);
                this.insureArray['controls'].items['controls'][i]['controls'].personalMobile.patchValue(this.getStepper2.items[i].personalMobile);
                this.insureArray['controls'].items['controls'][i]['controls'].personalAltnumber.patchValue(this.getStepper2.items[i].personalAltnumber);
                this.insureArray['controls'].items['controls'][i]['controls'].rolecd.patchValue(this.getStepper2.items[i].rolecd);
                this.insureArray['controls'].items['controls'][i]['controls'].sameAsProposer.patchValue(this.getStepper2.items[i].sameAsProposer == undefined ? false : this.getStepper2.items[i].sameAsProposer);
                this.insureArray['controls'].items['controls'][i]['controls'].ins_days.patchValue(this.getStepper2.items[i].ins_days);
                this.insureArray['controls'].items['controls'][i]['controls'].ins_age.patchValue(this.getStepper2.items[i].ins_age);

            }
            console.log(this.insureArray.value, ' this.insureArray');

        }

        // if(this.buyProductdetails.product_name != 'Care Freedom' && this.insureSingle) {
        //     // this.insureArray['controls'].items['controls'][i]['controls'].sameAsProposer.patchValue(false);
        // }
        // this.insureArray['controls'].items['controls'][i]['controls'].personalAddress.patchValue(this.getStepper2.items[i].personalAddress);
        // this.insureArray['controls'].items['controls'][i]['controls'].personalAddress2.patchValue(this.getStepper2.items[i].personalAddress2);
        // this.insureArray['controls'].items['controls'][i]['controls'].personalCity.patchValue(this.getStepper2.items[i].personalCity);
        // this.insureArray['controls'].items['controls'][i]['controls'].personalPincode.patchValue(this.getStepper2.items[i].personalPincode);
        // this.insureArray['controls'].items['controls'][i]['controls'].personalState.patchValue(this.getStepper2.items[i].personalState);
        // this.insureArray['controls'].items['controls'][i]['controls'].personalEmail.patchValue(this.getStepper2.items[i].personalEmail);
        // this.insureArray['controls'].items['controls'][i]['controls'].personalMobile.patchValue(this.getStepper2.items[i].personalMobile);
        // this.insureArray['controls'].items['controls'][i]['controls'].personalAltnumber.patchValue(this.getStepper2.items[i].personalAltnumber);
        // this.insureArray['controls'].items['controls'][i]['controls'].sameInsureAltMobileNumber.patchValue(this.getStepper2.items[i].sameInsureAltMobileNumber);
        // this.insureArray['controls'].items['controls'][i]['controls'].personalHeight.patchValue(this.getStepper2.items[i].personalHeight);
        // this.insureArray['controls'].items['controls'][i]['controls'].personalWeight.patchValue(this.getStepper2.items[i].personalWeight);
        // this.insureArray['controls'].items['controls'][i]['controls'].sameAsProposer.patchValue(this.getStepper2.items[i].sameAsProposer);
        //
        // this.insureArray['controls'].items['controls'][i]['controls'].residenceAddress.patchValue(this.getStepper2.items[i].residenceAddress);
        // this.insureArray['controls'].items['controls'][i]['controls'].residenceAddress2.patchValue(this.getStepper2.items[i].residenceAddress2);
        // this.insureArray['controls'].items['controls'][i]['controls'].residenceCity.patchValue(this.getStepper2.items[i].residenceCity);
        // this.insureArray['controls'].items['controls'][i]['controls'].residencePincode.patchValue(this.getStepper2.items[i].residencePincode);
        // this.insureArray['controls'].items['controls'][i]['controls'].residenceState.patchValue(this.getStepper2.items[i].residenceState);

        // this.insureArray['controls'].items['controls'][i]['controls'].sameas.patchValue(this.getStepper2.items[i].sameas);





        // for (let i = 0; i < this.getStepper2.items.length; i++) {
        //     if (this.getStepper2.items[i].personalPincode != '') {
        //         this.insureArray['controls'].items['controls'][i]['controls'].pCityHide.patchValue(true);
        //         this.insureArray['controls'].items['controls'][i]['controls'].personalCity.patchValue(this.getStepper2.items[i].personalCity);
        //         this.insureArray['controls'].items['controls'][i]['controls'].personalPincode.patchValue(this.getStepper2.items[i].personalPincode);
        //         this.insureArray['controls'].items['controls'][i]['controls'].personalState.patchValue(this.getStepper2.items[i].personalState);
        //         if (this.getStepper2.items[0].sameAsProposer) {
        //             this.insureArray['controls'].items['controls'][0]['controls'].pCityHide.patchValue(true);
        //             this.insureArray['controls'].items['controls'][0]['controls'].cityHide.patchValue(true);
        //         }
        //         if (this.getStepper2.items[i].sameas) {
        //             this.insureArray['controls'].items['controls'][i]['controls'].pCityHide.patchValue(this.getStepper2.items[i].sameas);
        //             this.insureArray['controls'].items['controls'][i]['controls'].residencePincode.patchValue(this.getStepper2.items[i].personalPincode);
        //             this.insureArray['controls'].items['controls'][i]['controls'].residenceState.patchValue(this.getStepper2.items[i].personalState);
        //             this.insureArray['controls'].items['controls'][i]['controls'].residenceCity.patchValue(this.getStepper2.items[i].personalCity);
        //         }
        //         if (this.getStepper2.items[i].sameas == false && this.getStepper2.items[i].residencePincode != '') {
        //             this.insureArray['controls'].items['controls'][i]['controls'].cityHide.patchValue(true);
        //             this.insureArray['controls'].items['controls'][i]['controls'].residencePincode.patchValue(this.getStepper2.items[i].residencePincode);
        //             this.insureArray['controls'].items['controls'][i]['controls'].residenceState.patchValue(this.getStepper2.items[i].residenceState);
        //             this.insureArray['controls'].items['controls'][i]['controls'].residenceCity.patchValue(this.getStepper2.items[i].residenceCity);
        //         }
        //     }
        // }



        if (sessionStorage.nomineeData != '' && sessionStorage.nomineeData != undefined) {
            this.getNomineeData = JSON.parse(sessionStorage.nomineeData);
            this.nomineeDetails = this.fb.group({
                religareNomineeName: this.getNomineeData.religareNomineeName,
                religareRelationship: this.getNomineeData.religareRelationship,
                nomineRelationshipName: this.getNomineeData.nomineRelationshipName
            });
        }
        if (sessionStorage.religareQuestionsList != '' && sessionStorage.religareQuestionsList != undefined) {
            this.religareQuestionsList = JSON.parse(sessionStorage.religareQuestionsList);
        } else
        if (sessionStorage.proposalID != '' && sessionStorage.proposalID != undefined) {
            this.proposalId = sessionStorage.proposalID;
        }

    }

    //Create Proposal
    proposal(stepper) {
        this.totalData = {
            'platform': 'web',
            'proposal_id': sessionStorage.proposalID ? sessionStorage.proposalID : this.proposalId.toString(),
            'enquiry_id': this.getFamilyDetails.enquiry_id,
            'group_name': this.getFamilyDetails.name,
            'company_name': 'Religare',
            'add_ons': this.setAddonDefault ? this.addonDetails.toString() : 'CAREWITHNCB',
            'suminsured_amount': this.changeSuninsuredAmount != undefined ? this.changeSuninsuredAmount : this.buyProductdetails.suminsured_amount,
            'proposer_insurer_details': this.totalReligareData,
            'product_id': this.buyProductdetails.product_id,
            'plan_name': this.buyProductdetails.product_name,
            'policy_term': this.buyProductdetails.product_id == 4 ? '3' : '1',
            'scheme_id': this.buyProductdetails.scheme,
            'terms_condition': '1',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
            'nominee_name': this.nomineeDetails.controls['religareNomineeName'].value,
            'nominee_relationship': this.nomineeDetails.controls['religareRelationship'].value,
            'medical_status': this.medicalStatus.includes('Yes') ? 'Yes' : 'No'
        };
        console.log(this.getFamilyDetails.name,'get family details');

        if (!this.back){
            this.processDiseaseData(this.totalData);
        }
        this.stepback();

        const data = this.totalData;
        console.log(data, 'proposalDetail.........')
        this.settings.loadingSpinner = true;
        this.proposalservice.getReligareProposal(data).subscribe(
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
            this.toastr.success('Proposal created successfully!!');
            this.summaryData = successData.ResponseObject;
            console.log(this.summaryData, 'summaryyyy///')
            sessionStorage.summaryData = JSON.stringify(this.summaryData);
            this.proposalId = this.summaryData.policy_id;
            sessionStorage.proposalID = this.proposalId;
            this.proposerFormData = this.personal.value;
            this.insuredFormData = this.insureArray.value;
            this.nomineeFormData = this.nomineeDetails.value;
            console.log(this.nomineeFormData, 'this.nomineeFormData')
            this.action =  this.summaryData.action,
                this.proposalNum = this.summaryData.proposalNum,
                this.returnURL = this.summaryData.returnURL,
                sessionStorage.proposerFormData = JSON.stringify(this.proposerFormData);
            sessionStorage.insuredFormData = JSON.stringify(this.insuredFormData);
            sessionStorage.nomineeFormData = JSON.stringify(this.nomineeFormData);
            this.createdDate = new Date();
            stepper.next();
            this.topScroll();
            this.nextStep();
            this.religareMobileTrue3 = false;
            this.religareMobileTrue4 = false;
            this.pos_status = this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4;
            console.log(this.valueSII, 'this.valueSIIthis.valueSII')
            // this.suminsureddropdownProposal();

        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }
    public proposalFailure(error) {
        this.settings.loadingSpinner = false;
    }


    stepback() {
        this.back = true;
    }
    quesback() {
        this.back = false;
    }

    nameTry(event){
        console.log(event,'evnt');
        if(event.code == 'Space'){
            event.preventDefault();
        }
        if (event.charCode !== 0) {
            const pattern = /[a-zA-Z ]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }

    changeCommCity() {
        console.log(this.personal.controls['personalCity'].value,'this.personal.controls[\'personalCity\'].value...')
        console.log(this.personal.controls['personalCityName'].value,'this.personal.controls[\'personalCityName\']...')
        this.personal.controls['personalCityName'].patchValue(this.personalCitys[this.personal.controls['personalCity'].value]);
    }
    changePerCity() {
        console.log(this.personal.controls['residenceCity'].value,'this.personal.controls[\'personalCity\'].value...')
        console.log(this.personal.controls['residenceCityName'].value,'this.personal.controls[\'personalCityName\']...')
        this.personal.controls['residenceCityName'].patchValue(this.residenceCitys[this.personal.controls['residenceCity'].value]);
    }


    payLater() {
        const data = {
            'platform': 'web',
            'proposal_id': sessionStorage.proposalID ? sessionStorage.proposalID : this.proposalId,
            'enquiry_id': this.getFamilyDetails.enquiry_id,
            'group_name': this.getFamilyDetails.name,
            'company_name': 'Religare',
            'created-date': this.createdDate,
            'action': this.summaryData.action,
            'proposalNum': this.summaryData.proposalNum,
            'total_premium': this.summaryData.total_premium,
            'company_logo': this.buyProductdetails.company_logo,
            'returnURL': this.summaryData.returnURL,
            'paymentlink-date': '',
            'add_ons': this.setAddonDefault ? this.addonDetails.toString() : 'CAREWITHNCB',
            'suminsured_amount': this.changeSuninsuredAmount != undefined ? this.changeSuninsuredAmount : this.buyProductdetails.suminsured_amount,
            // 'proposer_insurer_details': this.totalReligareData,
            'proposer_details': this.personalDetailss,
            'insured_details': this.insuredDetails,
            'product_id': this.buyProductdetails.product_id,
            'plan_name': this.buyProductdetails.product_name,
            'policy_term': this.buyProductdetails.product_id == 4 ? '3' : '1',
            'scheme_id': this.buyProductdetails.scheme,
            'terms_condition': '1',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
            'nominee_name': this.nomineeDetails.controls['religareNomineeName'].value,
            'nominee_relationship': this.nomineeDetails.controls['religareRelationship'].value,
            'medical_status': this.medicalStatus.includes('Yes') ? 'Yes' : 'No',
            'medicalQuestion': this.religareQuestionsList
        };
        console.log(data, 'payyyyy');
        console.log(this.getFamilyDetails.name,'get family details');

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
            'proposal_id': this.proposal_Id
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
            this.submitPayLater = false;
            this.requestDetails = successData.ResponseObject;
            this.gname =this.requestDetails.group_name;
            this.gsum_insured =this.requestDetails.suminsured_amount;
            this.gcompanylogo =this.requestDetails.company_logo;
            this.gtotalPremium =this.requestDetails.total_premium;
            this.gname =this.requestDetails.group_name;
            this.pos_status =  this.requestDetails.role_id;
            this.product_id =  this.requestDetails.product_id;
            this.action =  this.requestDetails.action;
            this.proposalNum = this.requestDetails.proposalNum;
            this.proposalIdPayLater = this.requestDetails.proposal_id;
            console.log(this.proposalId,'lata');
            sessionStorage.proposlID = this.proposalIdPayLater;
            console.log(sessionStorage.proposlID, 'sessionStorage.proposlID');
            this.addonsPayLater = this.requestDetails.add_ons;
            this.enquiryIdPayLater = this.requestDetails.enquiry_id;
            this.planNamePayLater = this.requestDetails.plan_name;
            this.polocyTermPayLater = this.requestDetails.policy_term;
            this.schemeIdPayLater = this.requestDetails.scheme_id;
            this.famNamePayLater = this.requestDetails.group_name;
            this.returnURL = this.requestDetails.returnURL;
            this.requestProserDetails = this.requestDetails.proposer_details;
            this.requestInsuredDetails = this.requestDetails.insured_details;
            this.requestmedicalQuestion = this.requestDetails.medicalQuestion;
            this.suminsureddropdown();
            console.log(this.requestDetails, 'requestDetails')
            console.log(this.requestmedicalQuestion, 'requestmedicalQuestion');
            console.log(this.requestInsuredDetails, 'hgghjghjgjh');
            this.insuredLength = this.requestInsuredDetails.length;
            console.log(this.insuredLength, 'lengthhhh..........////')
            this.payLaterEdit();
            console.log(this.newProposalId, 'newProposalId.........//////////')
        } else {
        }
        console.log(this.requestDetails,'requestDetails');
    }
    public getBackResFailure(successData) {
    }
    payLaterEdit() {

        this.personal.controls['personalTitle'].patchValue(this.requestProserDetails.title);
        this.personal.controls['personalFirstname'].patchValue(this.requestProserDetails.proposer_fname);
        this.personal.controls['personalLastname'].patchValue(this.requestProserDetails.proposer_lname);
        this.personal.controls['personalGender'].patchValue(this.requestProserDetails.proposer_gender);
        this.personal.controls['personalDob'].patchValue(this.datepipe.transform(this.requestProserDetails.prop_dob, 'y-MM-dd'));
        this.personal.controls['personalEmail'].patchValue(this.requestProserDetails.proposer_email);
        this.personal.controls['personalMobile'].patchValue(this.requestProserDetails.proposer_mob);
        this.personal.controls['personalAddress'].patchValue(this.requestProserDetails.proposer_comm_address1);
        this.personal.controls['personalAddress2'].patchValue(this.requestProserDetails.proposer_comm_address2);
        this.personal.controls['personalPincode'].patchValue(this.requestProserDetails.proposer_comm_pincode);
        this.getPostal(this.requestProserDetails.proposer_comm_pincode, 'personal');
        this.personal.controls['personalCity'].patchValue(this.requestProserDetails.proposer_comm_city);
        this.personal.controls['personalState'].patchValue(this.requestProserDetails.proposer_comm_state);
        if(this.requestProserDetails.sameas == 1) {
            this.personal.controls['sameas'].patchValue('1');
        } else {
            this.personal.controls['sameas'].patchValue('0');
        }
        this.personal.controls['residenceAddress'].patchValue(this.requestProserDetails.proposer_res_address1);
        this.personal.controls['residenceAddress2'].patchValue(this.requestProserDetails.proposer_res_address2);
        this.personal.controls['residencePincode'].patchValue(this.requestProserDetails.proposer_res_pincode);
        this.getPostal(this.requestProserDetails.proposer_res_pincode, 'residence');
        this.personal.controls['residenceCity'].patchValue(this.requestProserDetails.proposer_res_city);
        this.personal.controls['residenceState'].patchValue(this.requestProserDetails.proposer_res_state);
        this.personal.controls['personalPan'].patchValue(this.requestProserDetails.proposer_pan);
        this.personal.controls['personalAltnumber'].patchValue(this.requestProserDetails.proposer_alter_mob);
        this.personal.controls['personalAadhar'].patchValue(this.requestProserDetails.proposer_aadhar);
        this.personal.controls['personalGst'].patchValue(this.requestProserDetails.proposer_gst);
        this.setRelationship();
        for(let i=0; i < this.requestInsuredDetails.length; i++) {
            if(this.requestInsuredDetails[0].sameas == 1) {
                this.insuredForm1.controls['sameAsProposer'].patchValue(true);
            } else {
                this.insuredForm1.controls['sameAsProposer'].patchValue(false);
            }
            this.insuredForm1.controls['title'].patchValue(this.requestInsuredDetails[0].title);
            this.insuredForm1.controls['firstname'].patchValue(this.requestInsuredDetails[0].proposer_fname);
            this.insuredForm1.controls['lastname'].patchValue(this.requestInsuredDetails[0].proposer_lname);
            this.insuredForm1.controls['gender'].patchValue(this.requestInsuredDetails[0].proposer_gender);
            this.insuredForm1.controls['dob'].patchValue(this.datepipe.transform(this.requestInsuredDetails[0].prop_dob, 'y-MM-dd'));
            this.insuredForm1.controls['email'].patchValue(this.requestInsuredDetails[0].proposer_email);
            this.insuredForm1.controls['mobile'].patchValue(this.requestInsuredDetails[0].proposer_mob);
            this.insuredForm1.controls['pan'].patchValue(this.requestInsuredDetails[0].proposer_pan);
            this.insuredForm1.controls['altnumber'].patchValue(this.requestInsuredDetails[0].proposer_alter_mob);
            this.insuredForm1.controls['aadhar'].patchValue(this.requestInsuredDetails[0].proposer_aadhar);
            this.insuredForm1.controls['gst'].patchValue(this.requestInsuredDetails[0].proposer_gst);
            this.insuredForm1.controls['relationship'].patchValue(this.requestInsuredDetails[0].relationship_cd);
            this.insuredForm1.controls['height'].patchValue(this.requestInsuredDetails[0].height);
            this.insuredForm1.controls['weight'].patchValue(this.requestInsuredDetails[0].weight);
            this.insuredtype1 = this.requestInsuredDetails[0].type;
            if(i == 1) {
                this.insuredForm2.controls['title'].patchValue(this.requestInsuredDetails[1].title);
                this.insuredForm2.controls['firstname'].patchValue(this.requestInsuredDetails[1].proposer_fname);
                this.insuredForm2.controls['lastname'].patchValue(this.requestInsuredDetails[1].proposer_lname);
                this.insuredForm2.controls['gender'].patchValue(this.requestInsuredDetails[1].proposer_gender);
                this.insuredForm2.controls['dob'].patchValue(this.datepipe.transform(this.requestInsuredDetails[1].prop_dob, 'y-MM-dd'));
                this.insuredForm2.controls['email'].patchValue(this.requestInsuredDetails[1].proposer_email);
                this.insuredForm2.controls['mobile'].patchValue(this.requestInsuredDetails[1].proposer_mob);
                this.insuredForm2.controls['pan'].patchValue(this.requestInsuredDetails[1].proposer_pan);
                this.insuredForm2.controls['altnumber'].patchValue(this.requestInsuredDetails[1].proposer_alter_mob);
                this.insuredForm2.controls['aadhar'].patchValue(this.requestInsuredDetails[1].proposer_aadhar);
                this.insuredForm2.controls['gst'].patchValue(this.requestInsuredDetails[1].proposer_gst);
                this.insuredForm2.controls['relationship'].patchValue(this.requestInsuredDetails[1].relationship_cd);
                this.insuredForm2.controls['height'].patchValue(this.requestInsuredDetails[1].height);
                this.insuredForm2.controls['weight'].patchValue(this.requestInsuredDetails[1].weight);
                this.insuredtype2 = this.requestInsuredDetails[1].type;
            }
            if(i == 2) {
                this.insuredForm3.controls['title'].patchValue(this.requestInsuredDetails[2].title);
                this.insuredForm3.controls['firstname'].patchValue(this.requestInsuredDetails[2].proposer_fname);
                this.insuredForm3.controls['lastname'].patchValue(this.requestInsuredDetails[2].proposer_lname);
                this.insuredForm3.controls['gender'].patchValue(this.requestInsuredDetails[2].proposer_gender);
                this.insuredForm3.controls['dob'].patchValue(this.datepipe.transform(this.requestInsuredDetails[2].prop_dob, 'y-MM-dd'));
                this.insuredForm3.controls['email'].patchValue(this.requestInsuredDetails[2].proposer_email);
                this.insuredForm3.controls['mobile'].patchValue(this.requestInsuredDetails[2].proposer_mob);
                this.insuredForm3.controls['pan'].patchValue(this.requestInsuredDetails[2].proposer_pan);
                this.insuredForm3.controls['altnumber'].patchValue(this.requestInsuredDetails[2].proposer_alter_mob);
                this.insuredForm3.controls['aadhar'].patchValue(this.requestInsuredDetails[2].proposer_aadhar);
                this.insuredForm3.controls['gst'].patchValue(this.requestInsuredDetails[2].proposer_gst);
                this.insuredForm3.controls['relationship'].patchValue(this.requestInsuredDetails[2].relationship_cd);
                this.insuredForm3.controls['height'].patchValue(this.requestInsuredDetails[2].height);
                this.insuredForm3.controls['weight'].patchValue(this.requestInsuredDetails[2].weight);
                this.insuredtype3 = this.requestInsuredDetails[2].type;
            }
            if(i == 3) {
                this.insuredForm4.controls['title'].patchValue(this.requestInsuredDetails[3].title);
                this.insuredForm4.controls['firstname'].patchValue(this.requestInsuredDetails[3].proposer_fname);
                this.insuredForm4.controls['lastname'].patchValue(this.requestInsuredDetails[3].proposer_lname);
                this.insuredForm4.controls['gender'].patchValue(this.requestInsuredDetails[3].proposer_gender);
                this.insuredForm4.controls['dob'].patchValue(this.datepipe.transform(this.requestInsuredDetails[3].prop_dob, 'y-MM-dd'));
                this.insuredForm4.controls['email'].patchValue(this.requestInsuredDetails[3].proposer_email);
                this.insuredForm4.controls['mobile'].patchValue(this.requestInsuredDetails[3].proposer_mob);
                this.insuredForm4.controls['pan'].patchValue(this.requestInsuredDetails[3].proposer_pan);
                this.insuredForm4.controls['altnumber'].patchValue(this.requestInsuredDetails[3].proposer_alter_mob);
                this.insuredForm4.controls['aadhar'].patchValue(this.requestInsuredDetails[3].proposer_aadhar);
                this.insuredForm4.controls['gst'].patchValue(this.requestInsuredDetails[3].proposer_gst);
                this.insuredForm4.controls['relationship'].patchValue(this.requestInsuredDetails[3].relationship_cd);
                this.insuredForm4.controls['height'].patchValue(this.requestInsuredDetails[3].height);
                this.insuredForm4.controls['weight'].patchValue(this.requestInsuredDetails[3].weight);
                this.insuredtype4 = this.requestInsuredDetails[3].type;
            }
        }
        this.nomineeDetails.controls['religareNomineeName'].patchValue(this.requestDetails.nominee_name);
        this.nomineeDetails.controls['religareRelationship'].patchValue(this.requestDetails.nominee_relationship);

    }
    createProposerPayLater() {
        this.payoutDetaillsss = [];
        this.payoutDetaillsss.push(this.personal.value);
        this.payoutDetaillsss.push({
            'personalTitle': this.insuredForm1.controls['title'].value,
            'personalFirstname': this.insuredForm1.controls['firstname'].value,
            'personalLastname': this.insuredForm1.controls['lastname'].value,
            'personalGender': this.insuredForm1.controls['gender'].value,
            'personalDob': this.datepipe.transform(this.insuredForm1.controls['dob'].value, 'y-MM-dd'),
            'personalAadhar': this.insuredForm1.controls['aadhar'].value,
            'personalPan': this.insuredForm1.controls['pan'].value,
            'personalGst': this.insuredForm1.controls['gst'].value,
            'personalEmail': this.insuredForm1.controls['email'].value,
            'personalMobile': this.insuredForm1.controls['mobile'].value,
            'personalAltnumber': this.insuredForm1.controls['altnumber'].value,
            'personalrelationship': this.insuredForm1.controls['relationship'].value,
            'rolecd': 'PRIMARY',
            'height': this.insuredForm1.controls['height'].value,
            'weight': this.insuredForm1.controls['weight'].value,
            'type':'Self',
            'sameas': false ? 0 : 1
        });
        if(this.insuredForm2.controls['firstname'].value != '') {
            this.payoutDetaillsss.push({
                'personalTitle': this.insuredForm2.controls['title'].value,
                'personalFirstname': this.insuredForm2.controls['firstname'].value,
                'personalLastname': this.insuredForm2.controls['lastname'].value,
                'personalGender': this.insuredForm2.controls['gender'].value,
                'personalDob': this.datepipe.transform(this.insuredForm2.controls['dob'].value, 'y-MM-dd'),
                'personalAadhar': this.insuredForm2.controls['aadhar'].value,
                'personalPan': this.insuredForm2.controls['pan'].value,
                'personalGst': this.insuredForm2.controls['gst'].value,
                'personalEmail': this.insuredForm2.controls['email'].value,
                'personalMobile': this.insuredForm2.controls['mobile'].value,
                'personalAltnumber': this.insuredForm2.controls['altnumber'].value,
                'personalrelationship': this.insuredForm2.controls['relationship'].value,
                'rolecd': 'PRIMARY',
                'height': this.insuredForm2.controls['height'].value,
                'weight': this.insuredForm2.controls['weight'].value,
                'type':'Spouse',
                'sameas': false ? 0 : 1
            });
        }
        if(this.insuredForm3.controls['firstname'].value != '') {
            this.payoutDetaillsss.push({
                'personalTitle': this.insuredForm3.controls['title'].value,
                'personalFirstname': this.insuredForm3.controls['firstname'].value,
                'personalLastname': this.insuredForm3.controls['lastname'].value,
                'personalGender': this.insuredForm3.controls['gender'].value,
                'personalDob': this.datepipe.transform(this.insuredForm3.controls['dob'].value, 'y-MM-dd'),
                'personalAadhar': this.insuredForm3.controls['aadhar'].value,
                'personalPan': this.insuredForm3.controls['pan'].value,
                'personalGst': this.insuredForm3.controls['gst'].value,
                'personalEmail': this.insuredForm3.controls['email'].value,
                'personalMobile': this.insuredForm3.controls['mobile'].value,
                'personalAltnumber': this.insuredForm3.controls['altnumber'].value,
                'personalrelationship': this.insuredForm3.controls['relationship'].value,
                'rolecd': 'PRIMARY',
                'height': this.insuredForm3.controls['height'].value,
                'weight': this.insuredForm3.controls['weight'].value,
                'type':'Son',
                'sameas': false ? 0 : 1
            });
        }
        if(this.insuredForm4.controls['firstname'].value != '') {
            this.payoutDetaillsss.push({
                'personalTitle': this.insuredForm4.controls['title'].value,
                'personalFirstname': this.insuredForm4.controls['firstname'].value,
                'personalLastname': this.insuredForm4.controls['lastname'].value,
                'personalGender': this.insuredForm4.controls['gender'].value,
                'personalDob': this.datepipe.transform(this.insuredForm4.controls['dob'].value, 'y-MM-dd'),
                'personalAadhar': this.insuredForm4.controls['aadhar'].value,
                'personalPan': this.insuredForm4.controls['pan'].value,
                'personalGst': this.insuredForm4.controls['gst'].value,
                'personalEmail': this.insuredForm4.controls['email'].value,
                'personalMobile': this.insuredForm4.controls['mobile'].value,
                'personalAltnumber': this.insuredForm4.controls['altnumber'].value,
                'personalrelationship': this.insuredForm4.controls['relationship'].value,
                'rolecd': 'PRIMARY',
                'height': this.insuredForm4.controls['height'].value,
                'weight': this.insuredForm4.controls['weight'].value,
                'type':'Daughter',
                'sameas': false ? 0 : 1
            });
        }
        console.log(this.payoutDetaillsss, 'new11111')
        this.totalPayLaterDetails = [];
        for (let i = 0; i < this.payoutDetaillsss.length; i++) {
            this.totalPayLaterDetails.push({
                'title': this.payoutDetaillsss[i].personalTitle,
                'proposer_fname': this.payoutDetaillsss[i].personalFirstname,
                'proposer_lname': this.payoutDetaillsss[i].personalLastname,
                'prop_email_list': [{
                    'email': this.payoutDetaillsss[i].personalEmail,
                    'email_type': 'PERSONAL'
                }],
                'prop_contact_list': [{
                    'contact_no': this.payoutDetaillsss[i].personalMobile,
                    'contact_type': 'MOBILE',
                    'std_code': '91'
                }],
                'prop_identity_list': [
                    {
                        'identity_number': this.payoutDetaillsss[i].personalPan,
                        'identity_type': this.payoutDetaillsss[i].personalPan != '' ? 'PAN' : ''
                    }
                ],
                'proposer_res_address1': this.payoutDetaillsss[0].residenceAddress,
                'proposer_res_address2': this.payoutDetaillsss[0].residenceAddress2,
                'proposer_res_area': this.payoutDetaillsss[0].residenceCity,
                'proposer_res_city': this.payoutDetaillsss[0].residenceCity,
                'proposer_res_state': this.payoutDetaillsss[0].residenceState,
                'proposer_res_pincode': this.payoutDetaillsss[0].residencePincode,
                'proposer_comm_address1': this.payoutDetaillsss[0].personalAddress,
                'proposer_comm_address2': this.payoutDetaillsss[0].personalAddress2,
                'proposer_comm_area': this.payoutDetaillsss[0].personalCity,
                'proposer_comm_city': this.payoutDetaillsss[0].personalCity,
                'proposer_comm_state': this.payoutDetaillsss[0].personalState,
                'proposer_comm_pincode': this.payoutDetaillsss[0].personalPincode,
                'prop_dob': this.datepipe.transform(this.payoutDetaillsss[i].personalDob, 'y-MM-dd'),
                'prop_gender': this.payoutDetaillsss[i].personalGender,
                'relationship_cd': i == 0 ? 'SELF' : this.payoutDetaillsss[i].personalrelationship ,
                'role_cd': this.payoutDetaillsss[i].rolecd,
                'height': this.payoutDetaillsss[i].height,
                'weight': this.payoutDetaillsss[i].weight,
                'type': this.payoutDetaillsss[i].type,
            });
            if (this.payoutDetaillsss[i].personalAltnumber != '') {
                this.totalPayLaterDetails[i].prop_contact_list.push({
                    'contact_no': this.payoutDetaillsss[i].personalAltnumber,
                    'contact_type': 'RESEDENTIAL',
                    'std_code': '91'
                });
            }
            if (this.payoutDetaillsss[i].personalAadhar != '') {
                this.totalPayLaterDetails[i].prop_identity_list.push({
                    'identity_number': this.payoutDetaillsss[i].personalAadhar,
                    'identity_type': 'AADHAR'
                });
            }
            if (this.payoutDetaillsss[i].personalGst != '') {
                this.totalPayLaterDetails[i].prop_identity_list.push({
                    'identity_number': this.payoutDetaillsss[i].personalGst,
                    'identity_type': 'GST'
                });
            }
        }
        console.log(this.totalPayLaterDetails, 'totalPayLaterDetails...../////');
        this.medicalHistoryDetailsPayLater();
        console.log(this.totalPayLaterDetails, 'totalPayLaterDetails....11111./////');
        // if(this.personal.valid && this.insuredForm1.valid && this.insuredForm2.valid && this.insuredForm3.valid) {
        this.totalDataPL = {
            'platform': 'web',
            'proposal_id': this.newProposalId != undefined ? this.newProposalId : this.proposalIdPayLater,
            'enquiry_id': this.enquiryIdPayLater,
            'group_name': this.gname,
            'company_name': 'Religare',
            'add_ons': this.addonsPayLater,
            'suminsured_amount': this.valueSII != undefined ? this.valueSII : this.gsum_insured,
            'proposer_insurer_details': this.totalPayLaterDetails,
            'product_id': this.product_id,
            'plan_name': this.planNamePayLater,
            'policy_term': this.polocyTermPayLater,
            'scheme_id': this.schemeIdPayLater,
            'terms_condition': '1',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
            'nominee_name': this.nomineeDetails.controls['religareNomineeName'].value,
            'nominee_relationship': this.nomineeDetails.controls['religareRelationship'].value,
            'medical_status': this.medicalStatus.includes('Yes') ? 'Yes' : 'No'
        }

        if(!this.back) {
            this.processDiseaseDataPL(this.totalDataPL);
        }

        const data =  this.totalDataPL;
        console.log(data, 'paylaterdata');
        this.settings.loadingSpinner = true;
        this.proposalservice.getReligareProposal(data).subscribe(
            (successData) => {
                this.proposalSuccessPl(successData);
            },
            (error) => {
                this.proposalFailurePL(error);
            }
        );
        // } else {
        //     this.toastr.error('Please fill the mandatory fields')
        // }

    }
    public proposalSuccessPl(successData) {
        // alert('11')
        this.settings.loadingSpinner = false;
        console.log(successData.ResponseObject, 'successData.ResponseObject....///')
        if (successData.IsSuccess == true) {
            // alert('true')
            this.payLaterSubmitDetails = successData.ResponseObject;
            this.newProposalId = this.payLaterSubmitDetails.policy_id;
            this.newProposalNum = this.payLaterSubmitDetails.proposalNum;
            this.newReturnURL = this.payLaterSubmitDetails.returnURL;
            this.newAction = this.payLaterSubmitDetails.action;
            this.newPremium = this.payLaterSubmitDetails.total_premium;
            // this.proposalId = this.payLaterSubmitDetails.policy_id;
            // sessionStorage.proposalID = this.proposalId;
            this.commonPolicyData();
            this.trycondi();
            // this.suminsureddropdown();
        } else {
            // alert('false')
            this.toastr.error(successData.ErrorObject);
        }
    }
    public proposalFailurePL(error) {
        // alert('2')
        this.settings.loadingSpinner = false;
        console.log(error, 'error');
    }
    commonPolicyData() {
        const data = {
            'platform':'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'policy_id': this.newProposalId
        }
        this.proposalservice.policyid(data).subscribe(
            (successData) => {
                this.policyDataSuccess(successData);
            },
            (error) => {
                this.policyDataFailure(error);
            }
        );
    }
    public policyDataSuccess(successData) {
        console.log(successData.ResponseObject, 'successData.ResponseObject....///')
        if (successData.IsSuccess) {
            this.payLaterSummary = successData.ResponseObject;
            this.payLaterPrposerDet = this.payLaterSummary.proposer_details;
            this.payLaterCommAdd = this.payLaterSummary.communicatiom_details;
            this.payLaterPerAdd = this.payLaterSummary.premanent_details;
            this.payLaterInsurdDet = this.payLaterSummary.insurer_details;
            this.payLaterNominDet = this.payLaterSummary.nominee_details;
        } else {
        }
    }
    public policyDataFailure(error) {
        console.log(error, 'error');
        this.toastr.error(error.ErrorObject);
        // this.commonPolicyData();
    }

    trycondi() {
        this.submitPayLater = true;
    }

    backPayLtr() {
        this.submitPayLater = false;
    }

    showicon(){
        this.inputfieldshow =true;
        // this.suminsureddropdown();
    }
    suminsureddropdown() {
        // alert('in')
        const data = {
            'platform':'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'product_id': this.product_id != undefined ? this.product_id : this.buyProductdetails.product_id,
            'scheme_id': this.schemeIdPayLater != undefined ? this.schemeIdPayLater : this.buyProductdetails.scheme,
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
            'plan_name': this.planNamePayLater != undefined ? this.planNamePayLater : this.buyProductdetails.product_name
        }
        console.log(data, 'suminsData.......')
        this.proposalservice.suminsureddropdown(data).subscribe(
            (successData) => {
                this.suminsureddropdownSuccess(successData);
            },
            (error) => {
                this.suminsureddropdownFailure(error);
            }
        );
    }
    public suminsureddropdownSuccess(successData) {
        console.log(successData.ResponseObject, 'successData.ResponseObject....///')
        this.suminsuredamount = successData.ResponseObject;
        this.suminsuredid();
    }
    public suminsureddropdownFailure(error) {
        console.log(error, 'error');
        this.toastr.error(error.ErrorObject);
    }

    suminsuredid(){
        const data = {
            'platform':'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            // 'product_id': this.buyProductdetails.product_id,
            // 'scheme_id': this.buyProductdetails.scheme,
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
            "sum_insured_amount": this.changeSuninsuredAmount
        };
        this.proposalservice.suminsuredIdval(data).subscribe(
            (successData) => {
                this.suminsuredidSuccess(successData);
            },
            (error) => {
                this.suminsuredidFailure(error);
            }
        );
    }
    public suminsuredidSuccess(successData) {
        console.log(successData.ResponseObject.prod_suminsured_id, 'successData.ResponseObject....///')
        this.suminsuredidvalue = successData.ResponseObject.prod_suminsured_id;
        // this.createProposerPayLater();

        this.productlistsumm();

    }
    public suminsuredidFailure(error) {
        console.log(error, 'error');
        this.toastr.error(error.ErrorObject);
    }

    productlistsumm(){
        const data = {
            'platform':'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'product_id': this.product_id != undefined ? this.product_id : this.buyProductdetails.product_id,
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
            "postalcode": this.pincoce ? this.pincoce : '',
            "sum_insured":this.suminsuredidvalue,
            "created_by": "0",
            "company_id": "1",
            'enquiry_id': this.enquiryIdPayLater != undefined ? this.enquiryIdPayLater : this.getFamilyDetails.enquiry_id,
            'plan_name': this.planNamePayLater != undefined ? this.planNamePayLater : this.buyProductdetails.product_name,
            'family_group_name': this.famNamePayLater != undefined ? this.famNamePayLater : this.getFamilyDetails.name
        }
        this.settings.loadingSpinner = true;
        this.proposalservice.productVal(data).subscribe(
            (successData) => {
                this.suminsuredProductSuccess(successData);
            },
            (error) => {
                this.suminsuredProductFailure(error);
            }
        );
    }
    public suminsuredProductSuccess(successData) {
        this.settings.loadingSpinner = false;
        console.log(successData.ResponseObject, 'successData.ResponseObject....///')
        this.productvalue = successData.ResponseObject;
        for(let i=0; i < this.productvalue.length; i++) {
            this.valueSI = this.productvalue[i].product_lists;
            for(let j=0; j < this.valueSI.length; j++) {
                this.valueSII = this.valueSI[j].suminsured_amount;
                this.valuePremium = this.valueSI[j].premium_total;
            }
        }
        this.inputfieldshow = false;
        this.createProposerPayLater();
        // this.proposal(llop);

        console.log(this.valueSI, 'llllllll')
        console.log(this.valueSII, 'llllllll')
    }
    public suminsuredProductFailure(error) {
        console.log(error, 'error');
        this.toastr.error(error.ErrorObject);
    }




    suminsureddropdownProposal(stepper) {
        // alert('in')
        const data = {
            'platform':'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'product_id': this.product_id != undefined ? this.product_id : this.buyProductdetails.product_id,
            'scheme_id': this.schemeIdPayLater != undefined ? this.schemeIdPayLater : this.buyProductdetails.scheme,
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
            'plan_name': this.planNamePayLater != undefined ? this.planNamePayLater : this.buyProductdetails.product_name
        }
        console.log(data, 'suminsData.......')
        this.proposalservice.suminsureddropdown(data).subscribe(
            (successData) => {
                this.suminsureddropdownProposalSuccess(successData, stepper);
            },
            (error) => {
                this.suminsureddropdownProposalFailure(error);
            }
        );
    }
    public suminsureddropdownProposalSuccess(successData, stepper) {
        console.log(successData.ResponseObject, 'successData.ResponseObject....///')
        this.suminsuredamount = successData.ResponseObject;
        // this.suminsuredidProposal(stepper);
        this.inputfieldshow = false;
        // this.
        console.log(this.changeSuninsuredAmount, 'valuesi')
        console.log(this.changeSuninsuredAmount.value, 'valuesi')
        // this.createProposerPayLater();
        this.proposal(stepper);
        this.newSIProposal = this.changeSuninsuredAmount;

    }
    public suminsureddropdownProposalFailure(error) {
        console.log(error, 'error');
        this.toastr.error(error.ErrorObject);
    }

    // suminsuredidProposal(stepper){
    //     const data = {
    //         'platform':'web',
    //         'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
    //         'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
    //         // 'product_id': this.buyProductdetails.product_id,
    //         // 'scheme_id': this.buyProductdetails.scheme,
    //         'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
    //         "sum_insured_amount": this.changeSuninsuredAmount
    //     };
    //     this.proposalservice.suminsuredIdval(data).subscribe(
    //         (successData) => {
    //             this.suminsuredidProposalSuccess(successData, stepper);
    //         },
    //         (error) => {
    //             this.suminsuredidProposalFailure(error);
    //         }
    //     );
    // }
    // public suminsuredidProposalSuccess(successData, stepper) {
    //     console.log(successData.ResponseObject.prod_suminsured_id, 'successData.ResponseObject....///')
    //     this.suminsuredidvalue = successData.ResponseObject.prod_suminsured_id;
    //     this.productlistsummProposal(stepper);
    // }
    // public suminsuredidProposalFailure(error) {
    //     console.log(error, 'error');
    //     this.toastr.error(error.ErrorObject);
    // }

    // productlistsummProposal(stepper){
    //     const data = {
    //         'platform':'web',
    //         'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
    //         'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
    //         'product_id': this.product_id != undefined ? this.product_id : this.buyProductdetails.product_id,
    //         'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
    //         "postalcode": this.pincoce ? this.pincoce : '',
    //         "sum_insured":this.suminsuredidvalue,
    //         "created_by": "0",
    //         "company_id": "1",
    //         'enquiry_id': this.enquiryIdPayLater != undefined ? this.enquiryIdPayLater : this.getFamilyDetails.enquiry_id,
    //         'plan_name': this.planNamePayLater != undefined ? this.planNamePayLater : this.buyProductdetails.product_name,
    //         'family_group_name': this.famNamePayLater != undefined ? this.famNamePayLater : this.getFamilyDetails.name
    //     }
    //     this.settings.loadingSpinner = true;
    //     this.proposalservice.productVal(data).subscribe(
    //         (successData) => {
    //             this.suminsuredProductProposalSuccess(successData, stepper);
    //         },
    //         (error) => {
    //             this.suminsuredProductProposalFailure(error);
    //         }
    //     );
    // }
    // public suminsuredProductProposalSuccess(successData, stepper) {
    //     this.settings.loadingSpinner = false;
    //     console.log(successData.ResponseObject, 'successData.ResponseObject....///')
    //     this.productvalue = successData.ResponseObject;
    //     for(let i=0; i < this.productvalue.length; i++) {
    //         this.valueSI = this.productvalue[i].product_lists;
    //         for(let j=0; j < this.valueSI.length; j++) {
    //             this.valueSII = this.valueSI[j].suminsured_amount;
    //             this.valuePremium = this.valueSI[j].premium_total;
    //         }
    //     }
    //     this.inputfieldshow = false;
    //     // this.createProposerPayLater();
    //     this.proposal(stepper);
    //
    //     console.log(this.valueSI, 'llllllll')
    //     console.log(this.valueSII, 'llllllll')
    // }
    // public suminsuredProductProposalFailure(error) {
    //     console.log(error, 'error');
    //     this.toastr.error(error.ErrorObject);
    // }


}

