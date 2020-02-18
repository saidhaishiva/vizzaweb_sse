import { Component, OnInit, DoCheck} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ValidatorFn, FormControl} from '@angular/forms';
import {HealthService} from '../../shared/services/health.service';
import { MatStepper } from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ProposalmessageComponent} from './proposalmessage/proposalmessage.component';
import { DatePipe } from '@angular/common';
import {AuthService} from '../../shared/services/auth.service';
import {HttpClient} from '@angular/common/http';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {Settings} from '../../app.settings.model';
import { AppSettings } from '../../app.settings';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Pipe, PipeTransform, Inject, LOCALE_ID } from '@angular/core';
import {ValidationService} from '../../shared/services/validation.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';
import { WINDOW } from '@ng-toolkit/universal';
import {CommonService} from '../../shared/services/common.service';
import {FourWheelerService} from '../../shared/services/four-wheeler.service';
// import {DialogData} from '../bike-tataaig-proposal/bike-tataaig-proposal.component';
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
export interface DialogData {
    name: string;
    question1:string
    animal:string
    payanimal:string
    animal1:string
    planname:string
    productID:string

}
@Component({
    selector: 'app-star-health-proposal',
    templateUrl: './star-health-proposal.component.html',
    styleUrls: ['./star-health-proposal.component.scss'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
})
export class StarHealthProposalComponent implements OnInit {
    public personal: FormGroup;
    public summary: FormGroup;
    public checked: boolean;
    public isLinear = false;
    public illnessCheck: boolean;
    public socialStatus: any;
    public statusValue: any;
    public nomineeAdd: boolean;
    public nomineeRemove: boolean;
    public familyMembers: any;
    public nomineeDate: any;
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
    public relationshipList1: any;
    public today: any;
    public declaration: boolean;
    public summaryData: any;
    public lastStepper: any;
    public paymentGatewayData: any;
    public webhost: any;
    public sameAsProposer: any;
    public sameAsValue: any;
    public proposalId: any;
    public proposalIdStar: any;
    public illness: any;
    public settings: Settings;
    public pin: any;
    public response: any;
    public personalCitys: any;
    public sameAs: any;
    public cityList: any;
    public arealist: any;
    public areaName: any;
    public areaNames: any;
    public title: any;
    public residenceCitys: any;
    public cityTitle: any;
    public rAreaNames: any;
    public rAreaNames1: any;
    public fnameInsured: any;
    public fdob: any;
    public frelationship: any;
    public areaNames1: any;
    public rAreaName: any;
    public rResponse: any;
    public socialNo: any;
    public socialStatuss: any;
    public ageSetting: any;
    public rSummaryCity: any;
    public sumTitle: any;
    public sumPin: any;
    public sumAreaName: any;
    public pos_status: any;
    public ageCheck: any;
    public getStepper1: any;
    public illnesStatus: any;
    public insureStatus: any;
    public errorMessage: any;
    public dobError: any;
    public setDateAge: any;
    public personalAge: any;
    public mobileNumber: any;
    public previousinsurance: any;
    public ageRestriction: string;
    public insurerDobError: string;
    public requestInsuredDetails: any;
    public socialAnswer1: any;
    public socialAnswer2: any;
    public socialAnswer3: any;
    public socialAnswer4: any;
    public inputReadonly: any;
    public nominee0: any;
    public relationshipListAppointe1: any;
    public age: any;
    public previousInsurence: any;
    public premium: any;
    public servicetax: any;
    public total_premium: any;
    public nomineeNext: any;
    public sameRelationship: any;
    public socialStatusValue: any;
    currentStep: any;
    proposerFormData: any;
    insuredFormData: any;
    nomineeFormData: any;
    relationshipListAppointe: any;
    relationshipListNomine: any;
    relationshipListNomine1: any;
    requestDetails: any;
    total: number;
    public step: any;
    public gstListType: any;
    public createdDate: any;
    public payLaterr: any;
    public status: any;
    public proposal_Id: any;
    public proposalNumber: any;
    public summaryData1: any;
    public areapatch: any;
    public stepperindex: any;
    public animal: any;
    public gstListType1: any;
    public eventClaimValue: any;
    public pinCode: any;
    public rCitysList: any;
    // public payanimal: any;
    public suminsuredidddd: any;
    public groupDetails: any;
    public pincoce: any;
    public summaryData2: any;
    public summaryData3: any;
    public summaryData4: any;
    public occupationList1: any;
    public product_id: any;
    getservicetax:any;
    getpremium:any;
    getsum_insured_amount:any;
    gettotal_premium:any;
    getcompany_logo: any;
    productid: any;
    productname: any;
    suminsuredidddd1: any;
    enquiry: any;
    group_name: any;
    nclaim:any;
    nrelationship:any;
    annual:any;
    adhar:any;
    pan:any;
    gstId:any;
    social:any;
    social_informal:any;
    social_unorganized:any;
    social_disabled:any;
    nomineevalue:any;
    aname:any;
    aage:any;
    arelationship:any;
    nominee1:any;
    age1:any;
    nrelationship1:any;
    nclaim1:any;
    public nomineeName2:any;
    public nomineeAge2:any;
    public nomineeRelationship2:any;
    public nomineeClaim2:any;
    public appointeeName2:any;
    public appointeeAge2:any;
    public appointeeRelationship2:any;
    public citypatch:any;
    policy_type_name: any;
    paylaterEdit: any;
    policyid1: any;
    sum_insured_amount:any;
    premiumsubmit:any;
    servicetaxsubmit:any;
    policyidpay:any;
    total_premiumsubmit:any;
    group_namesubmit:any;
    titlesubmit:any;
    policyidinsured:any;
    submit:boolean;
    policyidnominee:any;
    policyidappointee:any;
    insurerName:any;

    first_namesubmit:any;
    last_namesubmit:any;
    public healthStarTrue0: boolean;
    public healthStarTrue1: boolean;
    public healthStarTrue2: boolean;
    public healthStarTrue3: boolean;
    public ageSetting1: boolean;

    constructor(@Inject(WINDOW) private window: Window, public proposalservice: HealthService,public route: ActivatedRoute ,public validation: ValidationService, public datepipe: DatePipe, private toastr: ToastrService, public appSettings: AppSettings, public dialog: MatDialog,public router: Router,
                public config: ConfigurationService, public common: HealthService, public fb: FormBuilder, public auth: AuthService, public http:HttpClient, @Inject(LOCALE_ID) private locale: string) {
        this.stepperindex = 0;
        this.proposalId = 0;
        this.route.params.forEach((params) => {
            if(params.stepper == true || params.stepper == 'true') {
                this.stepperindex = 3;
                if (sessionStorage.summaryData != '' && sessionStorage.summaryData != undefined) {
                    this.summaryData = JSON.parse(sessionStorage.summaryData);
                    this.proposerFormData = JSON.parse(sessionStorage.proposerFormData);
                    this.insuredFormData = JSON.parse(sessionStorage.insuredFormData);
                    this.nomineeFormData = JSON.parse(sessionStorage.nomineeFormData);
                    this.proposalId = this.summaryData.policy_id;
                    console.log(this.summaryData.policy_id, 'policy id')
                    console.log(this.proposalId, 'this.proposalId id')
                    sessionStorage.proposalID = this.proposalId;
                }
            }
            this.status = params.stepper;
            this.proposal_Id = params.proposalId;
            if(this.proposal_Id != '' || this.proposal_Id != undefined ){
                this.payLaterr = true;
                console.log(this.proposal_Id, 'this.proposalId');
                console.log(this.status, 'this.proposalId');
                this.getBackRequest();
                // sessionStorage.proposalIdStar='';
                // alert(sessionStorage.proposalIdStar);

            }
            if(this.proposal_Id == undefined || this.proposal_Id == '') {
                this.payLaterr = false;

            }

        });
        this.currentStep = this.stepperindex;
        let today  = new Date();
        this.today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        this.illnessCheck = false;
        this.stopNext = false;
        this.nomineeAdd = true;
        this.nomineeRemove = true;
        this.declaration = false;
        this.inputReadonly = false;
        this.sameAsProposer = false;
        this.socialStatusValue = false;
        this.statusValue = false;
        this.sameAsValue = false;
        this.nomineeNext = true;
        this.paylaterEdit = false;
        this.ageSetting = false;
        this.submit = false;
        this.eventClaimValue = false;
        this.settings = this.appSettings.settings;
        this.settings.HomeSidenavUserBlock = false;
        this.settings.sidenavIsOpened = false;
        this.settings.sidenavIsPinned = false;
        this.webhost = this.config.getimgUrl();
        this.selectDate = '';
        this.proposalIdStar = 0;
        this.step = 0;
        this.mobileNumber = 'true';
        this.ageRestriction = 'true';

        this.healthStarTrue0 = false;
        this.healthStarTrue1 = true;
        this.healthStarTrue2 = true;
        this.healthStarTrue3 = true;
        this.ageSetting1 = false;
        this.animal = '';
        // this.payanimal = '';

        this.personal = this.fb.group({
            personalTitle: ['', Validators.required],
            personalFirstname: ['', Validators.required],
            personalLastname: ['', Validators.required],
            personalDob: ['', Validators.compose([Validators.required])],
            personalOccupation: ['', Validators.required],
            personalOccupationName: '',
            personalIncome: [''],
            personalAadhar: ['', Validators.compose([ Validators.minLength(4)])],
            personalPan: ['', Validators.compose([ Validators.minLength(10)])],
            personalGst: ['', Validators.compose([ Validators.minLength(15)])],
            socialStatus: '',
            socialAnswer1: '',
            socialAnswer2: '',
            socialAnswer3: '',
            socialAnswer4: '',
            personalAddress: ['', Validators.required],
            previousinsurance: '',
            previousinsuranceChecked: '',
            personalAddress2: ['', Validators.required],
            personalPincode: '',
            personalgstIdType: '',
            personalCity: ['', Validators.required],
            personalCityName: '',
            personalArea: ['', Validators.required],
            personalAreaName: '',
            personalState: ['', Validators.required],
            personalEmail: ['', Validators.compose([Validators.required, Validators.pattern("^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$")])],
            personalMobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
            personalAltnumber: '',
            residenceAddress: '',
            residenceAddress2: '',
            residencePincode:'',
            residenceCity: '',
            residenceCityName: '',
            residenceArea: '',
            residenceAreaName: '',
            residenceState: '',
            illnessCheck: '',
            sameas: ''
        });
    }
    ngOnInit() {
        this.setOccupationList1();
        this.gstIdList1();
        this.setRelationship1();
        this.proposalId = 0;
            if (this.payLaterr == true) {
            this.stepperindex = 3;
            this.step = 3;
            this.healthStarTrue0 = true;
            this.healthStarTrue1 = true;
            this.healthStarTrue2 = true;
            this.healthStarTrue3 = false;
            console.log(this.payLaterr, 'this.payLaterrolll');
        } else {
            this.groupDetails = JSON.parse(sessionStorage.groupDetails);
            this.buyProductdetails = JSON.parse(sessionStorage.buyProductdetails);
            this.pincoce = sessionStorage.setPincode;
            this.setDate = Date.now();
            this.setDate = this.datepipe.transform(this.setDate, 'dd-MM-y');
            this.setOccupationList();
            this.setRelationship();
            this.appointeRelationship();
            this.nomineRelationship();
            this.gstIdList();
            if (sessionStorage.changedTabDetails != '' || sessionStorage.changedTabDetails != undefined) {
                this.getFamilyDetails = JSON.parse(sessionStorage.changedTabDetails);
            }
            if (sessionStorage.familyMembers == '' || sessionStorage.familyMembers == undefined) {
                this.groupList();
            } else {
                this.familyMembers = JSON.parse(sessionStorage.familyMembers);
            }
            for (let i = 0; i < this.familyMembers.length; i++) {
                if (this.familyMembers[i].type == 'Spouse') {
                    this.familyMembers[i].ins_gender = 'Female';
                } else if (this.familyMembers[i].type == 'Son') {
                    this.familyMembers[i].ins_gender = 'Male';
                } else if (this.familyMembers[i].type == 'Daughter') {
                    this.familyMembers[i].ins_gender = 'Female';
                } else if (this.familyMembers[i].type == 'Father') {
                    this.familyMembers[i].ins_gender = 'Male';
                } else if (this.familyMembers[i].type == 'Mother') {
                    this.familyMembers[i].ins_gender = 'Female';
                } else if (this.familyMembers[i].type == 'Father In Law') {
                    this.familyMembers[i].ins_gender = 'Male';
                } else if (this.familyMembers[i].type == 'Mother In Law') {
                    this.familyMembers[i].ins_gender = 'Female';
                } else if (this.familyMembers[i].type == 'Brother') {
                    this.familyMembers[i].ins_gender = 'Male';
                } else if (this.familyMembers[i].type == 'Sister') {
                    this.familyMembers[i].ins_gender = 'Female';
                }
            }
            if (sessionStorage.nomineeDate == '' || sessionStorage.nomineeDate == undefined) {
                this.nomineeDate = [{
                    nominee: [{
                        nname: '',
                        nage: '',
                        nrelationship: '',
                        nrelationshipName: '',
                        nclaim: '',
                        aname: '',
                        aage: '',
                        arelationship: '',
                        arelationshipName: '',
                        removeBtn: true,
                        addBtn: true,
                        ageSetting: false,
                        colorStatus: 'red'

                    }]
                }];
            } else {
                this.nomineeDate = JSON.parse(sessionStorage.nomineeDate);
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
            this.personal.controls['socialStatus'].patchValue(false);
            this.personal.controls['previousinsuranceChecked'].patchValue(false);
            this.sessionData();
            this.socialNo = '';
        }
        // if (this.stepperindex == '' && this.stepperindex == undefined) {
        //     this.payLaterr = true;
        // }
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
    backAll(){
        this.topScroll();
        this.prevStep();
    }
    canDeactivate() {
        return this.proposalId;
    }
    sessionData() {
        if (sessionStorage.proposalID != '' && sessionStorage.proposalID != undefined) {
            this.proposalId = sessionStorage.proposalID;
        }
        if (sessionStorage.stepper1Details != '' && sessionStorage.stepper1Details != undefined) {
            console.log(JSON.parse(sessionStorage.stepper1Details), 'sessionStorage.stepper1Details');
            this.getStepper1 = JSON.parse(sessionStorage.stepper1Details);
            this.personal = this.fb.group({
                personalTitle: this.getStepper1.personalTitle,
                personalFirstname: this.getStepper1.personalFirstname,
                personalLastname: this.getStepper1.personalLastname,
                personalDob:new FormControl(new Date(this.getStepper1.personalDob)),
                personalOccupation: this.getStepper1.personalOccupation,
                personalOccupationName: this.getStepper1.personalOccupationName,
                personalIncome: this.getStepper1.personalIncome,
                personalArea: this.getStepper1.personalArea,
                residenceArea: this.getStepper1.residenceArea,
                personalAadhar: this.getStepper1.personalAadhar,
                personalPan: this.getStepper1.personalPan,
                personalGst: this.getStepper1.personalGst,
                socialStatus: this.getStepper1.socialStatus,
                socialAnswer1: this.getStepper1.socialAnswer1,
                socialAnswer2: this.getStepper1.socialAnswer2,
                socialAnswer3: this.getStepper1.socialAnswer3,
                socialAnswer4: this.getStepper1.socialAnswer4,
                personalAddress: this.getStepper1.personalAddress,
                previousinsurance: this.getStepper1.previousinsurance,
                previousinsuranceChecked: this.getStepper1.previousinsuranceChecked,
                personalAddress2: this.getStepper1.personalAddress2,
                personalPincode: this.getStepper1.personalPincode,
                personalCity: this.getStepper1.personalCity,
                personalCityName: this.getStepper1.personalCityName,
                personalAreaName: this.getStepper1.personalAreaName,
                personalState: this.getStepper1.personalState,
                personalEmail: this.getStepper1.personalEmail,
                personalMobile: this.getStepper1.personalMobile,
                personalAltnumber: this.getStepper1.personalAltnumber,
                residenceAddress: this.getStepper1.residenceAddress,
                residenceAddress2: this.getStepper1.residenceAddress2,
                residencePincode: this.getStepper1.residencePincode,
                residenceCity: this.getStepper1.residenceCity,
                residenceCityName: this.getStepper1.residenceCityName,
                residenceState: this.getStepper1.residenceState,
                residenceAreaName: this.getStepper1.residenceAreaName,
                illnessCheck: this.getStepper1.illnessCheck,
                personalgstIdType: this.getStepper1.personalgstIdType,
                sameas: this.getStepper1.sameas

            });

            if (this.getStepper1.socialStatus == true || this.getStepper1.socialStatus == 'true') {
            } else {
                this.personal.controls['socialAnswer1'].reset();
                this.personal.controls['socialAnswer2'].reset();
                this.personal.controls['socialAnswer3'].reset();
                this.personal.controls['socialAnswer4'].reset();
            }
            if (sessionStorage.mobileNumber != '' ) {
                this.mobileNumber = sessionStorage.mobileNumber;
            } else {
                this.mobileNumber = 'true';
            }

        }
        if (sessionStorage.personalCitys != '' && sessionStorage.personalCitys != undefined) {
            this.personalCitys = JSON.parse(sessionStorage.personalCitys);
        }
        if (sessionStorage.residenceCitys != '' && sessionStorage.residenceCitys != undefined) {
            this.residenceCitys = JSON.parse(sessionStorage.residenceCitys);
        }
        if (sessionStorage.rAreaNames != '' && sessionStorage.rAreaNames != undefined) {
            this.rAreaNames = JSON.parse(sessionStorage.rAreaNames);
        }
        if (sessionStorage.areaNames != '' && sessionStorage.areaNames != undefined) {
            this.areaNames = JSON.parse(sessionStorage.areaNames);
        }


        console.log(this.personal.value, 'this.personal');

        if (sessionStorage.familyMembers != '' && sessionStorage.familyMembers != undefined) {
            this.familyMembers = JSON.parse(sessionStorage.familyMembers);
            if (sessionStorage.ageRestriction != undefined) {
                this.ageRestriction = sessionStorage.ageRestriction;
            } else {
                this.ageRestriction = 'true';
            }
        }
        if (sessionStorage.nomineeDate != '' && sessionStorage.nomineeDate != undefined) {
            this.nomineeDate = JSON.parse(sessionStorage.nomineeDate);
        }


    }
    changeOccupation() {
    }
    //Proposer Details

//     stepper(){
//
// }



    setOccupationList() {
        const data = {
            'platform': 'web',
            'product_id': this.buyProductdetails.product_id,
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
        if (successData.IsSuccess) {
            this.occupationList = successData.ResponseObject;
        }
    }
    public occupationListFailure(error) {
        console.log(error);
    }
    //payoutedit occupation
    setOccupationList1() {
        const data = {
            'platform': 'web',
            'product_id': this.productid,
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.proposalservice.getOccupationList(data).subscribe(
            (successData) => {
                this.occupationList1Success(successData);
            },
            (error) => {
                this.occupationList1Failure(error);
            }
        );

    }
    public occupationList1Success(successData) {
        if (successData.IsSuccess) {
            this.occupationList1 = successData.ResponseObject;
        }
    }
    public occupationList1Failure(error) {
        console.log(error);
    }

    insurerNameSameAs() {
        console.log(this.sameAsProposer,'this.sameAsProposer...')
        const data = {
            "platform": "web",
            "user_id": this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            "role_id": this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            "insurer_type": this.sameAsProposer,
            "first_name" : this.personal.controls['personalFirstname'].value,
            "last_name" : this.personal.controls['personalLastname'].value,
        }
        this.proposalservice.getInsurerNameList(data).subscribe(
            (successData) => {
                this.insurerNameSameAsSuccess(successData);
            },
            (error) => {
                this.insurerNameSameAsFailure(error);
            }
        );

    }
    public insurerNameSameAsSuccess(successData) {
        if (successData.IsSuccess) {
            this.insurerName = successData.ResponseObject;
            console.log(this.insurerName,'this.insurerName...');
            this.sameProposer(0)
        }
    }
    public insurerNameSameAsFailure(error) {
        console.log(error);
    }


    setRelationship() {
        const data = {
            'platform': 'web',
            'product_id': this.buyProductdetails.product_id,
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
        if (successData.IsSuccess) {
            this.relationshipList = successData.ResponseObject;
            console.log(this.relationshipList,'relationshipList.......')
        }
    }
    public setRelationshipFailure(error) {
        console.log(error);

    }
setRelationship1() {
        const data = {
            'platform': 'web',
            'product_id': this.productid,
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.proposalservice.getRelationshipList(data).subscribe(
            (successData) => {
                this.setRelationshipSuccess1(successData);
            },
            (error) => {
                this.setRelationshipFailure1(error);
            }
        );
    }
    public setRelationshipSuccess1(successData) {
        if (successData.IsSuccess) {
            this.relationshipList1 = successData.ResponseObject;
            console.log(this.relationshipList,'relationshipList.......')
        }
    }
    public setRelationshipFailure1(error) {
        console.log(error);

    }


    nomineRelationship() {
        const data = {
            'platform': 'web',
            'product_id': this.buyProductdetails.product_id,
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.proposalservice.getNomieRelationshipList(data).subscribe(
            (successData) => {
                this.setNomieRelationshipSuccess(successData);
            },
            (error) => {
                this.setNomieRelationshipFailure(error);
            }
        );
    }
    public setNomieRelationshipSuccess(successData) {
        if (successData.IsSuccess) {
            this.relationshipListNomine = successData.ResponseObject;
            console.log(this.relationshipListNomine, 'nominee relation');
        }
    }
    public setNomieRelationshipFailure(error) {
        console.log(error);
    }
    nomineRelationship1() {
        const data = {
            'platform': 'web',
            'product_id': this.productid,
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.proposalservice.getNomieRelationshipList(data).subscribe(
            (successData) => {
                this.setNomieRelationshipSuccess1(successData);
            },
            (error) => {
                this.setNomieRelationshipFailure1(error);
            }
        );
    }
    public setNomieRelationshipSuccess1(successData) {
        if (successData.IsSuccess) {
            this.relationshipListNomine1 = successData.ResponseObject;
            console.log(this.relationshipListNomine, 'nominee relation');
        }
    }
    public setNomieRelationshipFailure1(error) {
        console.log(error);
    }
    appointeRelationship() {
        const data = {
            'platform': 'web',
            'product_id': this.buyProductdetails.product_id,
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.proposalservice.getAppointeRelationshipList(data).subscribe(
            (successData) => {
                this.setAppointeRelationshipSuccess(successData);
            },
            (error) => {
                this.setAppointeRelationshipFailure(error);
            }
        );
    }
    public setAppointeRelationshipSuccess(successData) {
        if (successData.IsSuccess) {
            this.relationshipListAppointe = successData.ResponseObject;
        }
    }
    public setAppointeRelationshipFailure(error) {
        console.log(error);
    }
    appointeRelationship1() {
        const data = {
            'platform': 'web',
            'product_id': this.productid,
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.proposalservice.getAppointeRelationshipList(data).subscribe(
            (successData) => {
                this.setAppointeRelationship1Success(successData);
            },
            (error) => {
                this.setAppointeRelationship1Failure(error);
            }
        );
    }
    public setAppointeRelationship1Success(successData) {
        if (successData.IsSuccess) {
            this.relationshipListAppointe1 = successData.ResponseObject;
        }
    }
    public setAppointeRelationship1Failure(error) {
        console.log(error);
    }


    topScroll() {
        document.getElementById('main-content').scrollTop = 0;
    }
    alternateChange(event) {
        if (event.target.value.length == 10) {
            if(event.target.value == this.personal.get('personalMobile').value) {
                this.mobileNumber = 'Alternate number should be different from mobile number';
            } else {
                this.mobileNumber = '';
            }
        } else {
            this.mobileNumber = '';
        }
        sessionStorage.mobileNumber = this.mobileNumber;
    }
    PreviousInsure(value) {
        if (value.value == 'true') {
            this.personal.controls['previousinsurance'].setValue('');
        } else {
            this.personal.controls['previousinsurance'].setValue('No');
        }
    }
    criticalIllness(values: any) {
        if (values.checked) {
            const dialogRef = this.dialog.open(ProposalmessageComponent, {
                width: '500px'
            });
            dialogRef.afterClosed().subscribe(result => {
                this.stopNext = true;
            });
        } else {
            this.stopNext = false;
        }
    }
    // changeSocialStatus(event:any) {
    //     if (event.checked==true) {
    //     console.log(event);
    //     }
    //     let btn = this.personal.controls['socialStatus'].value;
    //     if (btn == false || btn == 'false') {
    //         this.personal.controls['socialAnswer1'].setValue('0');
    //         this.personal.controls['socialAnswer2'].setValue('0');
    //         this.personal.controls['socialAnswer3'].setValue('0');
    //         this.personal.controls['socialAnswer4'].setValue('0');
    //         this.socialNo = '';
    //     } else {
    //         this.socialNo = false;
    //
    //     }
    // }

    changeSocialStatus(event:any) {
        if (event.checked==true) {
            this.socialNo = false;
        }else{
            this.personal.controls['socialAnswer1'].setValue('0');
            this.personal.controls['socialAnswer2'].setValue('0');
            this.personal.controls['socialAnswer3'].setValue('0');
            this.personal.controls['socialAnswer4'].setValue('0');
            this.socialNo = '';
        }

    }

   changeSocialStatus1(event:any) {
        // alert(event);
       // this.statusValue=event.value;
       this.statusValue=event.value;
       console.log(event);
       this.personal['controls'].socialStatus.patchValue(this.statusValue)
       // this.personal.controls['socialStatus'].patchValue(this.statusValue)
       console.log(this.personal['controls'].socialStatus.value,'546789')
       // console.log(this.personal.controls['socialStatus'].value,'56789')
       if (this.personal['controls'].socialStatus.value==true||this.personal['controls'].socialStatus.value=='true') {
           this.socialNo = false;
       }else if(this.personal['controls'].socialStatus.value==false||this.personal['controls'].socialStatus.value=='false'){
           this.socialStatusValue=false;
           this.personal['controls'].socialStatus.patchValue(false)
           this.personal.controls['socialAnswer1'].setValue('0');
           this.personal.controls['socialAnswer2'].setValue('0');
           this.personal.controls['socialAnswer3'].setValue('0');
           this.personal.controls['socialAnswer4'].setValue('0');
           this.socialNo = '';
       }

    }

    resetofgstType() {
        this.personal.controls['personalgstIdType'].patchValue('');
    }
    // pincode list
    getPostal(pin, title) {
        const data = {
            'platform': 'web',
            'pincode': pin
        }
        if (pin.length == 6) {
            this.common.getPostal(data).subscribe(
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
                    this.cityList = {};
                } else {
                    this.personal.controls['personalState'].setValue(this.response.state);
                    this.personalCitys = this.response.city;
                    this.cityList = this.response.city;
                }
                sessionStorage.personalCitys = JSON.stringify(this.personalCitys);
            } else if (title == 'residence') {
                if (Object.keys(this.response).length === 0) {
                    this.personal.controls['residenceCity'].setValue('');
                    this.personal.controls['residenceState'].setValue('');
                    this.personal.controls['residenceArea'].setValue('');
                    this.residenceCitys = {};
                    this.rCitysList = {};
                } else {
                    this.personal.controls['residenceState'].setValue(this.response.state);
                    this.residenceCitys = this.response.city;
                    this.rCitysList = this.response.city;
                }
                sessionStorage.residenceCitys = JSON.stringify(this.residenceCitys);
            }
        } else {
            this.toastr.error('In valid Pincode');
            if (title == 'personal') {
                this.personalCitys = {};
                this.cityList = {};
                sessionStorage.personalCitys = '';
                this.personal.controls['personalState'].setValue('');
                this.personal.controls['personalArea'].setValue('');
                this.personal.controls['personalCity'].setValue('');
            } else if (title == 'residence') {
                this.residenceCitys = {};
                this.rCitysList = {};
                sessionStorage.residenceCitys = '';
                this.personal.controls['residenceCity'].setValue('');
                this.personal.controls['residenceState'].setValue('');
                this.personal.controls['residenceArea'].setValue('');
            }
        }
    }
    public getpostalFailure(error) {
        console.log(error);
    }
    // get all areas
    getAreas(title, type) {
        if(type == 'manual') {
            this.typeAddressDeatils();
        }
        const data = {
            'platform': 'web',
            'pincode': title == 'personal' ? this.personal.controls['personalPincode'].value : this.personal.controls['residencePincode'].value,
            'city_id': title == 'personal' ? this.personal.controls['personalCity'].value : this.personal.controls['residenceCity'].value
        }
        this.common.getArea(data).subscribe(
            (successData) => {
                this.getCitySuccess(successData, title);
            },
            (error) => {
                this.getCityFailure(error);
            }
        );
    }
    public getCitySuccess(successData, title) {
        if (successData.IsSuccess == true) {
            if (title == 'personal') {
                this.areaNames = successData.ResponseObject;
                sessionStorage.areaNames = JSON.stringify(this.areaNames);
            } else if (title == 'residence') {
                this.rAreaNames = successData.ResponseObject;
                sessionStorage.rAreaNames = JSON.stringify(this.rAreaNames);
            }
        }
    }
    public getCityFailure(error) {
        console.log(error);
    }// get all areas
    getAreas1(title, type) {
        if(type == 'manual') {
            this.typeAddressDeatils1();
        }
        const data = {
            'platform': 'web',
            'pincode': title == 'personal' ? this.personal.controls['personalPincode'].value : this.personal.controls['residencePincode'].value,
            'city_id': title == 'personal' ? this.personal.controls['personalCity'].value : this.personal.controls['residenceCity'].value
        }
        this.common.getArea(data).subscribe(
            (successData) => {
                this.getCity1Success(successData, title);
            },
            (error) => {
                this.getCity1Failure(error);
            }
        );
    }
    public getCity1Success(successData, title) {
        if (successData.IsSuccess == true) {
            if (title == 'personal') {
                this.areaNames1 = successData.ResponseObject;
                // sessionStorage.areaNames = JSON.stringify(this.areaNames);
            } else if (title == 'residence') {
                this.rAreaNames1 = successData.ResponseObject;
                // sessionStorage.rAreaNames = JSON.stringify(this.rAreaNames);
            }
        }
    }
    public getCity1Failure(error) {
        console.log(error);
    }
    sameAddress(values: any) {
        if (values.checked) {
            this.inputReadonly = true;
            this.personal.controls['residenceAddress'].setValue(this.personal.controls['personalAddress'].value);
            this.personal.controls['residenceAddress2'].setValue(this.personal.controls['personalAddress2'].value);
            this.personal.controls['residenceCity'].setValue(this.personal.controls['personalCity'].value);
            this.personal.controls['residencePincode'].setValue(this.personal.controls['personalPincode'].value);
            this.personal.controls['residenceState'].setValue(this.personal.controls['personalState'].value);
            this.personal.controls['residenceCity'].setValue(this.personal.controls['personalCity'].value);
            this.personal.controls['residenceArea'].setValue(this.personal.controls['personalArea'].value);
            this.residenceCitys = JSON.parse(sessionStorage.personalCitys);
            this.rAreaNames = JSON.parse(sessionStorage.areaNames);

            sessionStorage.residenceCitys = JSON.stringify(this.residenceCitys);
            sessionStorage.rAreaNames = JSON.stringify(this.rAreaNames);

        } else {
            this.inputReadonly = false;
            this.personal.controls['residenceAddress'].setValue('');
            this.personal.controls['residenceAddress2'].setValue('');
            this.personal.controls['residenceCity'].setValue('');
            this.personal.controls['residencePincode'].setValue('');
            this.personal.controls['residenceState'].setValue('');
            this.personal.controls['residenceCity'].setValue('');
            this.personal.controls['residenceArea'].setValue('');
            sessionStorage.residenceCitys = '';
            sessionStorage.rAreaNames = '';
            this.residenceCitys = {};
            this.rAreaNames = {};
            // if (sessionStorage.residenceCitys != '' && sessionStorage.residenceCitys != undefined) {
            //     this.residenceCitys = JSON.parse(sessionStorage.residenceCitys);
            //     this.rAreaNames = JSON.parse(sessionStorage.rAreaNames);
            // } else {
            //     this.residenceCitys = [];
            //     this.rAreaNames = [];
            // }
        }
    }
    typeAddressDeatils() {
        if (this.personal.controls['sameas'].value) {
            this.residenceCitys = JSON.parse(sessionStorage.personalCitys);
            this.rAreaNames = JSON.parse(sessionStorage.areaNames);
            this.personal.controls['residenceAddress'].setValue(this.personal.controls['personalAddress'].value);
            this.personal.controls['residenceAddress2'].setValue(this.personal.controls['personalAddress2'].value);
            this.personal.controls['residenceCity'].setValue(this.personal.controls['personalCity'].value);
            this.personal.controls['residencePincode'].setValue(this.personal.controls['personalPincode'].value);
            this.personal.controls['residenceState'].setValue(this.personal.controls['personalState'].value);
            this.personal.controls['residenceArea'].setValue(this.personal.controls['personalArea'].value);
        }
    }
    sameValues(){
        if(this.sameAs==true){
            this.personal.controls['sameas'].patchValue(true);
            this.sameAddress1();
        }else if(this.sameAs==false){
            this.personal.controls['sameas'].patchValue(false);
            this.sameAddress1();
        }
    }
    sameAddress1() {
        // alert(this.sameAs)
        if ( this.personal.controls['sameas'].value==true) {
            this.inputReadonly = true;
            this.personal.controls['residenceAddress'].setValue(this.personal.controls['personalAddress'].value);
            this.personal.controls['residenceAddress2'].setValue(this.personal.controls['personalAddress2'].value);
            this.personal.controls['residenceCity'].setValue(this.personal.controls['personalCity'].value);
            this.personal.controls['residencePincode'].setValue(this.personal.controls['personalPincode'].value);
            this.getPostal(this.personal.controls['residencePincode'].value,'residence');
            this.personal.controls['residenceState'].setValue(this.personal.controls['personalState'].value);
            this.personal.controls['residenceCity'].setValue(this.personal.controls['personalCity'].value);
            this.getAreas1('residence', 'rmanual');

            this.personal.controls['residenceArea'].setValue(this.personal.controls['personalArea'].value);
            this.rCitysList =this.rCitysList;
            this.rAreaNames1 = this.rAreaNames1;
            //
            // sessionStorage.residenceCitys = JSON.stringify(this.residenceCitys);
            // sessionStorage.rAreaNames = JSON.stringify(this.rAreaNames);

        } else if(this.personal.controls['sameas'].value==false){
            this.inputReadonly = false;
            this.personal.controls['residenceAddress'].setValue('');
            this.personal.controls['residenceAddress2'].setValue('');
            this.personal.controls['residenceCity'].setValue('');
            this.personal.controls['residencePincode'].setValue('');
            this.personal.controls['residenceState'].setValue('');
            this.personal.controls['residenceCity'].setValue('');
            this.personal.controls['residenceArea'].setValue('');
            // sessionStorage.residenceCitys = '';
            // sessionStorage.rAreaNames = '';
            // this.residenceCitys = {};
            // this.rAreaNames = {};
            // if (sessionStorage.residenceCitys != '' && sessionStorage.residenceCitys != undefined) {
            //     this.residenceCitys = JSON.parse(sessionStorage.residenceCitys);
            //     this.rAreaNames = JSON.parse(sessionStorage.rAreaNames);
            // } else {
            //     this.residenceCitys = [];
            //     this.rAreaNames = [];
            // }
        }
    }
    typeAddressDeatils1() {
        if (this.personal.controls['sameas'].value) {
            // this.residenceCitys = JSON.parse(sessionStorage.personalCitys);
            // this.rAreaNames = JSON.parse(sessionStorage.areaNames);
            this.personal.controls['residenceAddress'].setValue(this.personal.controls['personalAddress'].value);
            this.personal.controls['residenceAddress2'].setValue(this.personal.controls['personalAddress2'].value);
            this.personal.controls['residenceCity'].setValue(this.personal.controls['personalCity'].value);
            this.personal.controls['residencePincode'].setValue(this.personal.controls['personalPincode'].value);
            this.personal.controls['residenceState'].setValue(this.personal.controls['personalState'].value);
            this.personal.controls['residenceArea'].setValue(this.personal.controls['personalArea'].value);
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
            sessionStorage.setItem('proposerAge' , this.personalAge);
        }
    }
    selectOccupation(index) {
        this.familyMembers[index].ins_occupation_name = this.occupationList[this.familyMembers[index].ins_occupation_id];
    }
    changeCity() {
        this.personal.controls['personalCityName'].patchValue(this.personalCitys[this.personal.controls['personalCity'].value]);

    }
    changeArea(){
        this.personal.controls['personalAreaName'].patchValue(this.areaNames[this.personal.controls['personalArea'].value]);
    }
    changeresCity(){
        this.personal.controls['residenceCityName'].patchValue(this.residenceCitys[this.personal.controls['residenceCity'].value]);
    }
    changeresArea(){
        this.personal.controls['residenceAreaName'].patchValue(this.rAreaNames[this.personal.controls['residenceArea'].value]);
    }

    personalDetails(stepper: MatStepper, value) {
        sessionStorage.stepper1Details = '';
        sessionStorage.stepper1Details = JSON.stringify(value);
        this.personalData = value;
        console.log(this.personalData,'this.personalData...')
        if (this.personal.valid) {
            if (sessionStorage.proposerAge >= 18 && sessionStorage.proposerAge < 90) {
                if(this.personal.controls['socialStatus'].value == true || this.personal.controls['socialStatus'].value == 'true') {
                    if(value.socialAnswer1 == '1' || value.socialAnswer2 == '1' || value.socialAnswer3 =='1' || value.socialAnswer4 == '1'){
                        if((this.personal.controls['personalgstIdType'].value == '' && this.personal.controls['personalGst'].value == '') || (this.personal.controls['personalgstIdType'].value != '' && this.personal.controls['personalGst'].value != '')) {

                            stepper.next();
                            this.topScroll();
                            this.nextStep();
                            this.healthStarTrue1 = false;
                        } else {
                            if(this.personal.controls['personalgstIdType'].value != '' || this.personal.controls['personalGst'].value != ''){
                                this.toastr.error('Enter GST Number');

                            }
                        }
                    } else {
                        this.toastr.error('Select any one Social Status');
                    }
                } else {
                    // if(value.socialAnswer1 == '0' || value.socialAnswer2 == '0' || value.socialAnswer3 =='0' || value.socialAnswer4 == '0') {
                    stepper.next();
                    this.topScroll()
                    this.nextStep();
                    // }
                }
            } else {
                this.toastr.error('Proposer age should be greater than 18 and less than 90');
            }
        }
    }

    // End

    //Insured Details
    groupList() {
        this.familyMembers = this.getFamilyDetails.family_members;
        for (let i = 0; i < this.familyMembers.length; i++ ) {
            this.familyMembers[i].ins_name = '';
            this.familyMembers[i].ins_dob = '';
            this.familyMembers[i].ins_gender = '';
            this.familyMembers[i].illness = 'false';
            this.familyMembers[i].ins_illness = '';
            this.familyMembers[i].ins_weight = '';
            this.familyMembers[i].ins_height = '';
            this.familyMembers[i].ins_buyBack_cash = '0';
            this.familyMembers[i].ins_occupation_id = '';
            this.familyMembers[i].ins_occupation_name = '';
            this.familyMembers[i].ins_relationship = '';
            this.familyMembers[i].ins_relationship_name = '';
            this.familyMembers[i].ins_hospital_cash = '1';
            this.familyMembers[i].ins_engage_manual_labour = '';
            this.familyMembers[i].ins_engage_winter_sports = 'None';
            this.familyMembers[i].ins_personal_accident_applicable = '0';
            this.familyMembers[i].ins_suminsured_indiv = this.buyProductdetails.suminsured_id;
            this.familyMembers[i].engage_manual_status = '0';
            this.familyMembers[i].engage_winter_status = '0';
            this.familyMembers[i].ageRestriction = '';
            console.log(this.familyMembers[i].ins_buyBack_cash,'ins_buyBack_cash');
        }

    }
    selectProposerRelation(index) {
        this.familyMembers[index].ins_relationship_name = this.relationshipList[this.familyMembers[index].ins_relationship];
        console.log(this.familyMembers[index].ins_relationship_name, 'ins_relationship_name');
        console.log(this.relationshipList[this.familyMembers[index].ins_relationship], 'ins_relationship_name232424');
        if (sessionStorage.nomineeDate != '' && sessionStorage.nomineeDate != undefined) {
            let nominee = JSON.parse(sessionStorage.nomineeDate);
            console.log(nominee[0].nominee[0].nrelationship, 'nominee[0].nominee[0].nrelationship');
            if (nominee[0].nominee[0].nrelationship != '') {
                this.nomineeDate[0].nominee[0].nrelationship = '';
            }
            console.log(nominee[0].nominee.length, 'nominee length');
            // console.log(nominee[1].nominee[1].arelationship, 'nominee length4535');
            if (nominee[0].nominee.length > 1 && nominee[1].nominee[1].arelationship != '') {
                this.nomineeDate[1].nominee[1].arelationship = '';
            }
        }
    }


    InsureDetails(stepper: MatStepper, index, key) {
        sessionStorage.familyMembers = JSON.stringify(this.familyMembers);
        console.log(this.familyMembers,'987654')
        this.illnesStatus = false;
        this.insureStatus = false;
        let errorMessage = true;
        if (key == 'Insured Details') {
            for (let i = 0; i < this.familyMembers.length; i++) {
                if (this.familyMembers[i].ins_name != '' && this.familyMembers[i].ins_dob != '' && this.familyMembers[i].insurerDobError == ''  && this.familyMembers[i].ins_gender != '' && this.familyMembers[i].ins_weight != '' && this.familyMembers[i].ins_height != ''&&  this.familyMembers[i].ins_occupation_id != '' && this.familyMembers[i].ins_relationship != '' && this.familyMembers[i].illness != undefined ) {
                    errorMessage = false;
                    if (this.familyMembers[i].illness != 'false') {
                        if (this.familyMembers[i].ins_illness == '') {
                            this.illnesStatus = true;
                            break;
                        }

                    } else {
                        this.illnesStatus = false;
                    }
                } else {
                    errorMessage = true;
                    break;
                }
            }
            if(errorMessage) {
                this.toastr.error('Please fill the empty fields', key);
            }
            else if (this.illnesStatus) {
                this.toastr.error('Please fill the empty fields', key);
            } else if (this.illnesStatus == false) {
                for (let i = 0; i < this.familyMembers.length; i++) {
                    if (this.buyProductdetails.product_id == 6) {
                        this.insureStatus = false;
                        if (this.familyMembers[i].ins_hospital_cash != '') {
                            if (i == this.familyMembers.length - 1) {
                                this.insureStatus = true;
                            }
                        } else {
                            this.errorMessage = true;
                            break;
                        }

                    } else if (this.buyProductdetails.product_id == 9 || this.buyProductdetails.product_id == 8) {
                        this.errorMessage = false;
                        this.insureStatus = false;
                        this.previousInsurence = [];
                        for (let i = 0; i < this.familyMembers.length; i++) {
                            this.previousInsurence.push(this.familyMembers[i].ins_personal_accident_applicable);
                        }


                        if (this.familyMembers[i].ins_age >= 18 || this.familyMembers[i].ins_age == '') {
                            if (!this.previousInsurence.includes('2')) {
                                this.insureStatus = false;
                                this.toastr.error('You need to select one adult for personal accident cover');
                                break;
                            }
                        } else {
                            if (i == this.familyMembers.length - 1) {
                                this.insureStatus = true;
                            }
                        }
                        if (this.familyMembers[i].engage_manual_status == '2') {
                            if (this.familyMembers[i].ins_engage_manual_labour != '') {
                                if (i == this.familyMembers.length - 1) {
                                    this.insureStatus = true;
                                }
                            } else {
                                this.errorMessage = true;
                                this.insureStatus = false;
                                break;
                            }

                        }  if (this.familyMembers[i].engage_winter_status == '2') {
                            if (this.familyMembers[i].ins_engage_winter_sports != '') {
                                if (i == this.familyMembers.length - 1) {
                                    this.insureStatus = true;
                                }
                            } else {
                                this.errorMessage = true;
                                this.insureStatus = false;
                                break;
                            }
                        } if (this.familyMembers[i].engage_manual_status == '0' && this.familyMembers[i].engage_winter_status == '0' ) {
                            if (i == this.familyMembers.length - 1) {
                                this.insureStatus = true;
                            }
                        }
                    } else {
                        this.insureStatus = true;
                    }
                }
            } else {

            }
        }
        if (this.errorMessage) {
            this.toastr.error('Please fill the empty fields', key);
        }
        if (this.insureStatus) {
            if (sessionStorage.insurerDobError == '' && sessionStorage.ageRestriction =='') {
                stepper.next();
                this.topScroll();
                this.nextStep();
                this.healthStarTrue1 = false;
                this.healthStarTrue2 = false;

            }
        }
        // if(this.familyMembers.length == 1){
        //     this.sameRelationship = this.familyMembers[0].ins_relationship;
        //     console.log(this.sameRelationship,'same relationship')
        // }
    }
    typeAge(value, index, ci) {
        if (value < 18 && value != '') {
            this.nomineeDate[index].nominee[ci].ageSetting = true;
        } else {
            this.nomineeDate[index].nominee[ci].ageSetting = false;
            this.nomineeDate[index].nominee[ci].aname = '';
            this.nomineeDate[index].nominee[ci].aage = '';
            this.nomineeDate[index].nominee[ci].arelationship = '';

        }
    }
    typeAge1() {
        if (this.age < 18 && this.age != '') {
            this.ageSetting = true;
        } else {
            this.ageSetting = false;

        }
    }
    typeAge2() {
        if (this.nomineeAge2 < 18 && this.nomineeAge2 != '') {
            this.ageSetting1 = true;
        } else {
            this.ageSetting1 = false;

        }
    }

    illnessStatus(result: any, index) {
        if (result.value == 'true') {
            this.familyMembers[index].ins_illness = '';
            this.familyMembers[index].illness = result.value;
        } else {
            this.familyMembers[index].illness = result.value;
            this.familyMembers[index].ins_illness = 'No';

        }

    }
    personalAccident(values: any, index) {
        if (values.value == 2) {
            for (let i = 0; i < this.familyMembers.length; i++) {
                if (i != index) {
                    this.familyMembers[i].ins_accident_status = true;
                }
            }
        } else {
            for (let i = 0; i < this.familyMembers.length; i++) {
                this.familyMembers[i].ins_accident_status = false;
            }
        }

    }
    engageWinter(values: any, index, key) {
        if(key == 'manual'){
            if (values.value == '2') {
                this.familyMembers[index].ins_engage_manual_labour = '';
            } else {
                this.familyMembers[index].ins_engage_manual_labour = 'None';
            }
        }
        if(key == 'winter'){
            if (values.value == '2') {
                this.familyMembers[index].ins_engage_winter_sports = '';
            } else {
                this.familyMembers[index].ins_engage_winter_sports = 'None';
            }
        }
    }

    // Dame validation
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
    // insured dob
    addEventInsurerSelect(event, i, type) {
        if (event.value != null) {
            let selectedDate = '';
            let dob = '';
            if (typeof event.value._i == 'string') {
                const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
                if (pattern.test(event.value._i) && event.value._i.length == 10) {
                    this.familyMembers[i].insurerDobError = '';
                } else {
                    this.familyMembers[i].insurerDobError = 'Enter Valid Date';
                }
                selectedDate = event.value._i;
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                if (selectedDate.length == 10) {
                    this.ageValidation(event, i, selectedDate.length, type);
                }

            } else if (typeof event.value._i == 'object') {
                // dob = this.datepipe.transform(event.value, 'MMM d, y');
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                if (dob.length == 10) {
                    this.ageValidation(event, i, dob.length, type);
                }
                this.familyMembers[i].insurerDobError = '';
            }

        }

    }
    ageValidation(event, i, length, type){
        if (length == 10) {
            this.familyMembers[i].insurerDobError = '';
            this.ageCheck = this.datepipe.transform(event.value, 'y-MM-dd');
            let monthCheck = this.datepipe.transform(event.value, 'y,MM,dd');
            let dob_days = this.datepipe.transform(event.value, 'dd-MM-y');

            let age = this.ageCalculate(this.ageCheck);
            console.log(age)

            this.familyMembers[i].ins_dob = this.datepipe.transform(event.value, 'y-MM-dd');
            this.familyMembers[i].ins_age = age;
            if (this.buyProductdetails.company_name.toLowerCase() == 'star health') {

                // if (age < 18 && (type == 'Self' || type == 'Spouse')) {
                //     this.familyMembers[i].ageRestriction = 'Self or Spouse age should be 18 and above ';
                // } else {
                //     this.familyMembers[i].ageRestriction = '';
                // }

                if (this.buyProductdetails.product_id == '9') {
                    if (age < 18 || age > 65) {
                        this.familyMembers[i].ageRestriction = ' Age between 18 years to 65 years';
                    } else {
                        this.familyMembers[i].ageRestriction = '';
                    }
                } else if (this.buyProductdetails.product_id == '10') {
                    if (age < 60 || age > 75) {
                        this.familyMembers[i].ageRestriction = 'Age between 60 years to 75 years';
                    } else {
                        this.familyMembers[i].ageRestriction = '';
                    }
                } else if (this.buyProductdetails.product_id == '6') {
                    let dobmonth = this.DobMonthCalculate(monthCheck);
                    console.log(dobmonth, 'dobmonth1');
                    if (age < 18 || age > 65) {
                        this.familyMembers[i].ageRestriction = 'Age between 18 years to 65 years';
                    } else {
                        this.familyMembers[i].ageRestriction = '';
                    }

                } else if (this.buyProductdetails.product_id == '7' && (type == 'Son' || type == 'Daughter')) {
                    let dobdays = this.DobDaysCalculate(dob_days);
                    if (dobdays < 16 || age > 25) {
                        this.familyMembers[i].ageRestriction = ' Age between 16 days to 25 years';
                    } else {
                        this.familyMembers[i].ageRestriction = '';
                    }
                } else if (this.buyProductdetails.product_id == '7' && (type != 'Son' || type != 'Daughter')) {
                    if (age < 18 || age > 65) {
                        this.familyMembers[i].ageRestriction = ' Age between 18 years to 65 years';
                    } else {
                        this.familyMembers[i].ageRestriction = '';
                    }
                } else if (this.buyProductdetails.product_id == '8' && (type == 'Son' || type == 'Daughter')) {
                    let dobmonth = this.DobMonthCalculate(monthCheck);
                    if (dobmonth < 3 || age > 25) {
                        this.familyMembers[i].ageRestriction = ' Age between 3 months to 25 years';
                    } else {
                        this.familyMembers[i].ageRestriction = '';
                    }
                } else if (this.buyProductdetails.product_id == '8' && (type != 'Son' || type != 'Daughter')) {
                    if (age < 18 || age > 65) {
                        this.familyMembers[i].ageRestriction = 'Age between 18 years to 65 years';
                    } else {
                        this.familyMembers[i].ageRestriction = '';
                    }
                }
            }

        } else {
            this.familyMembers[i].insurerDobError = 'Enter valid dob';
        }
        sessionStorage.ageRestriction = this.familyMembers[i].ageRestriction;
        sessionStorage.insurerDobError = this.familyMembers[i].insurerDobError;
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

    DobDaysCalculate(dobDays) {
        // let mdate = dobDays.toString();
        // let yearThen = parseInt(mdate.substring( 8,10), 10);
        // let monthThen = parseInt(mdate.substring(5,7), 10);
        // let dayThen = parseInt(mdate.substring(0,4), 10);
        // let todays = new Date();
        // let birthday = new Date( dayThen, monthThen-1, yearThen);
        // let differenceInMilisecond = todays.valueOf() - birthday.valueOf();
        // let Bob_days = Math.ceil(differenceInMilisecond / (1000 * 60 * 60 * 24));
        // return Bob_days;
        let a = moment(dobDays, 'DD/MM/YYYY');
        let b = moment(new Date(), 'DD/MM/YYYY');
        let days = b.diff(a, 'days');
        return days;

    }
    DobMonthCalculate(dobMonth) {
        let mdate = dobMonth.toString();
        let yearThen = parseInt(mdate.substring( 8,10), 10);
        let monthThen = parseInt(mdate.substring(5,7), 10);
        let dayThen = parseInt(mdate.substring(0,4), 10);
        let todays = new Date();
        let birthday = new Date( dayThen, monthThen-1, yearThen);
        let differenceInMilisecond = todays.valueOf() - birthday.valueOf();
        let Bob_month = Math.ceil((differenceInMilisecond / (1000 * 60 * 60 * 24)) / 30);

        console.log(dobMonth);
        // var a = moment([2019,02,28]);
        // var b =  moment([2018,10,28]);
        //
        // var years = a.diff(b, 'year');
        // b.add(years, 'years');
        //
        // var months = a.diff(b, 'months');
        // b.add(months, 'months');
        //
        // var days = a.diff(b, 'days');
        //
        // console.log(years + ' years ' + months + ' months ' + days + ' days');

        return Bob_month;

    }




    // Nominee Deatils
    addNominee(value) {
        if (value == 'add' && this.nomineeDate[0].nominee.length != 2) {
            this.nomineeDate[0].nominee.push({
                nname: '',
                nage: '',
                nrelationship: '',
                nrelationshipName: '',
                nclaim: '',
                aname: '',
                aage: '',
                arelationship: '',
                arelationshipName: '',
                removeBtn: false,
                addBtn: false,
                ageSetting: false,
                colorStatus: 'green'

            });
            this.nomineeDate[0].nominee[0].addBtn = false;

            //
            this.nomineeAdd = true;
            this.nomineeRemove = false;
        } if (value == 'delete') {
            if (this.nomineeDate[0].nominee.length == 2) {
                this.nomineeDate[0].nominee.splice(1, 1);
                this.nomineeAdd = false;
                this.nomineeRemove = true;
                this.nomineeDate[0].nominee[0].removeBtn = true;
                this.nomineeDate[0].nominee[0].addBtn = true;
            }
        }
        sessionStorage.nomineeDate = JSON.stringify(this.nomineeDate);

    }
    claimPercent(percent, i, pi) {
        if (this.nomineeDate[0].nominee.length == 1) {
            if (this.nomineeDate[0].nominee[0].nclaim >= 100) {
                this.nomineeDate[0].nominee[0].addBtn = false;
                this.nomineeNext = false;
            } else {
                this.nomineeDate[0].nominee[0].addBtn = true;
                this.nomineeNext = true;
            }
        } else {
            this.nomineeNext = false;

            this.nomineeAdd = true;

        }
        sessionStorage.nomineeDate = JSON.stringify(this.nomineeDate);
    }


    claimPercent1(percent, i, ci) {
        if (ci == 0) {
            console.log(this.nomineeDate[0].nominee[0].nclaim, 'ft');
            if (this.nomineeDate[0].nominee[0].nclaim >= 100 || this.nomineeDate[0].nominee[0].nclaim == '') {
                this.nomineeDate[0].nominee.splice(1, 1);
            } else {
                if (this.nomineeDate[0].nominee.length >= 1 && this.nomineeDate[0].nominee.length < 2) {
                    this.nomineeDate[0].nominee.push({
                        nname: '',
                        nage: '',
                        nrelationship: '',
                        nrelationshipName: '',
                        nclaim: '',
                        aname: '',
                        aage: '',
                        arelationship: '',
                        arelationshipName: '',
                        removeBtn: false,
                        addBtn: false,
                        ageSetting: false,
                        colorStatus: 'green'
                    });
                }
                // this.nomineeDate[0].nominee[1].nclaim = (100 - parseInt(this.nomineeDate[0].nominee[0].nclaim));
            }
        }
    }
    claimPercent2() {
      if(this.nclaim < 100 && this.nclaim!='' ){
          this.eventClaimValue=true;

      }else if(this.nclaim >= 100 || this.nclaim==''){
          this.eventClaimValue=false;
        this.nomineeName2='';
        this.nomineeAge2='';
        this.nomineeRelationship2='';
        this.nomineeClaim2='';
      }
    }
    // sessionStorage.nomineeDate = JSON.stringify(this.nomineeDate);

    //
    // if (value == 'add' && this.nomineeDate[0].nominee.length != 2) {
    //     this.nomineeDate[0].nominee.push({
    //         nname: '',
    //         nage: '',
    //         nrelationship: '',
    //         nrelationshipName: '',
    //         nclaim: '',
    //         aname: '',
    //         aage: '',
    //         arelationship: '',
    //         arelationshipName: '',
    //         removeBtn: false,
    //         addBtn: false,
    //         ageSetting: false,
    //         colorStatus: 'green'
    //
    //     });
    //     this.nomineeDate[0].nominee[0].addBtn = false;
    //
    //     //
    //     this.nomineeAdd = true;
    //     this.nomineeRemove = false;
    // } if (value == 'delete') {
    //     if (this.nomineeDate[0].nominee.length == 2) {
    //         this.nomineeDate[0].nominee.splice(1, 1);
    //         this.nomineeAdd = false;
    //         this.nomineeRemove = true;
    //         this.nomineeDate[0].nominee[0].removeBtn = true;
    //         this.nomineeDate[0].nominee[0].addBtn = true;
    //     }
    // }
    // sessionStorage.nomineeDate = JSON.stringify(this.nomineeDate);

    // }
    // sameProposer(){
    //     alert('inn111')
    //     if(this.sameAsProposer==true){
    //         alert('inn')
    //         this.familyMembers[0].ins_name=this.personal.controls['personalFirstname'].value;
    //         this.familyMembers[0].ins_dob=this.personal.controls['personalDob'].value;
    //         this.familyMembers[0].ins_occupation_id=this.personal.controls['personalOccupation'].value;
    //         this.familyMembers[0].ins_relationship='1';
    //     }else{
    //         alert('else')
    //         this.familyMembers[0].ins_name='';
    //         this.familyMembers[0].ins_dob='';
    //         this.familyMembers[0].ins_occupation_id='';
    //         this.familyMembers[0].ins_relationship='';
    //     }

    // }

        sameProposer(index) {
        if (this.sameAsProposer == true) {
            this.sameAsValue=true;

            this.familyMembers[0].ins_dob = this.datepipe.transform(this.personalData.personalDob, 'y-MM-dd'),
                this.familyMembers[0].insurerDobError = '';
            this.ageCheck = this.datepipe.transform(this.personalData.personalDob, 'y-MM-dd');
            let monthCheck = this.datepipe.transform(this.personalData.personalDob, 'y,MM,dd');
            let dob_days = this.datepipe.transform(this.personalData.personalDob, 'dd-MM-y');
            this.addEventInsurerSelect(this.ageCheck, index, 'Self')
            let age = this.ageCalculate(this.ageCheck);
            console.log(age)

            this.familyMembers[0].ins_dob = this.datepipe.transform(this.personalData.personalDob, 'y-MM-dd');
            this.familyMembers[0].ins_age = age;
            this.familyMembers[0].ins_name = (this.insurerName),

            this.familyMembers[0].ins_occupation_id = this.personal.controls['personalOccupation'].value
            if (this.sameAsProposer == true) {
                this.familyMembers[0].ins_relationship ='1';
                this.selectProposerRelation(index);

            }else{
                this.familyMembers[0].ins_relationship=''
            }
        } else {
            this.familyMembers[0].ins_dob='',
                this.familyMembers[0].ins_name='',
                this.familyMembers[0].ins_occupation_id ='',
                this.familyMembers[0].ins_relationship=''
            // this.familyMembers[index].sameAsProposer = false;

        }
    }
    sameValues1(){
        if(this.requestDetails[0].insured_details[0].sameAsProposer==true){
            this.sameProposer1();
        }else if(this.requestDetails[0].insured_details[0].sameAsProposer==false){
            this.requestDetails[0].insured_details[0].sameAsProposer = false;
            this.sameProposer1();
        }
    }
 // sameProposer1() {
 //        alert(this.requestDetails[0].insured_details[0].sameAsProposer);
 //
 //        if (this.requestDetails[0].insured_details[0].sameAsProposer == true) {
 //
 //            // this.familyMembers[0].sameAsProposer = true;
 //            this.requestDetails[0].insured_details[0].ins_dob = this.datepipe.transform(this.requestDetails[0].prop_dob, 'y-MM-dd'),
 //
 //                this.requestDetails[0].insured_details[0].ins_name = this.requestDetails[0].proposer_fname,
 //                this.requestDetails[0].insured_details[0].ins_occupation_id = this.requestDetails[0].prop_occupation
 //            if (this.requestDetails[0].insured_details[0].sameAsProposer == true) {
 //                this.requestDetails[0].insured_details[0].ins_relationship ='1'
 //            }else{
 //                this.requestDetails[0].insured_details[0].ins_relationship=''
 //            }
 //        } else {
 //            this.requestDetails[0].insured_details[0].ins_dob='',
 //                this.requestDetails[0].insured_details[0].ins_name='',
 //                this.requestDetails[0].insured_details[0].ins_occupation_id ='',
 //                this.requestDetails[0].insured_details[0].ins_relationship=''
 //        }
 //    }

    sameProposer1() {

// alert(this.sameAsProposer)

        if (this.sameAsProposer == true) {

// alert('2');

            // this.familyMembers[0].sameAsProposer = true;

            this.requestInsuredDetails[0].ins_dob = this.datepipe.transform(this.requestDetails[0].prop_dob, 'y-MM-dd'),

                console.log(this.requestInsuredDetails[0].ins_dob);

            console.log(this.requestDetails[0].prop_dob);

            this.requestInsuredDetails[0].ins_name = this.requestDetails[0].proposer_fname,

                this.requestInsuredDetails[0].ins_occupation_id = this.requestDetails[0].prop_occupation

            if (this.sameAsProposer == true) {

                this.requestInsuredDetails[0].ins_relationship ='1'

            }else{

                this.requestInsuredDetails[0].ins_relationship=''

            }

        } else {

            // alert(3)

            this.requestInsuredDetails[0].ins_dob='',

                this.requestInsuredDetails[0].ins_name='',

                this.requestInsuredDetails[0].ins_occupation_id ='',

                this.requestInsuredDetails[0].ins_relationship=''

        }

    }





    // selectNomineRelation(index, cIndex, type) {
    //     if(type == 'first') {
    //         this.nomineeDate[index].nominee[cIndex].nrelationshipName = this.relationshipList[this.nomineeDate[index].nominee[cIndex].nrelationship];
    //     } else if(type == 'second') {
    //         this.nomineeDate[index].nominee[cIndex].arelationshipName = this.relationshipList[this.nomineeDate[index].nominee[cIndex].arelationship];
    //     }
    //
    //
    // }
    // nomineeDetails(stepper: MatStepper, index, key) {
    //     sessionStorage.nomineeDate = JSON.stringify(this.nomineeDate);
    //     this.lastStepper = stepper;
    //
    //     let valid = false;
    //     if (key == 'Nominee Details' && this.nomineeDate[index].nominee[0].nage != '' ) {
    //         for (let i = 0; i < this.nomineeDate[index].nominee.length; i++) {
    //             if (this.nomineeDate[index].nominee[i].nname != '' &&
    //                 this.nomineeDate[index].nominee[i].nage != '' &&
    //                 this.nomineeDate[index].nominee[i].nrelationship != '' &&
    //                 this.nomineeDate[index].nominee[i].nclaim != '') {
    //                 if (this.nomineeDate[index].nominee[i].nage < 18) {
    //                     if (this.nomineeDate[index].nominee[i].aname != '' &&
    //                         this.nomineeDate[index].nominee[i].aage != '' &&
    //                         this.nomineeDate[index].nominee[i].arelationship != '') {
    //                         if (this.nomineeDate[index].nominee[i].aage >= 18) {
    //                             valid = true;
    //                         } else {
    //                             valid = false;
    //                             this.toastr.error('Appointee age should be 18 and above', key);
    //                             break;
    //                         }
    //                     } else {
    //                         if (i == this.nomineeDate[index].nominee.length - 1) {
    //                             valid = false;
    //                             this.toastr.error('Please fill the empty fields', key);
    //                             break;
    //                         }
    //                     }
    //                 } else {
    //                     valid = true;
    //                 }
    //             } else {
    //                 if (i == this.nomineeDate[index].nominee.length - 1) {
    //                     valid = false;
    //                     this.toastr.error('Please fill the empty fields', key);
    //                     break;
    //                 }
    //             }
    //         }
    //     } else {
    //         valid = true;
    //     }
    //     if(valid){
    //         let percentValid = true;
    //         if(this.nomineeDate[0].nominee.length < 2 && this.nomineeDate[0].nominee.length >=1) {
    //             console.log(parseInt(this.nomineeDate[0].nominee[0].nclaim), 'ppp');
    //             if(parseInt(this.nomineeDate[0].nominee[0].nclaim) == 100) {
    //                 percentValid = true;
    //             } else {
    //                 percentValid = false;
    //             }
    //             if(parseInt(this.nomineeDate[0].nominee[0].nclaim) > 100) {
    //                 percentValid = false;
    //                 this.toastr.error('Claim percentage should not be greater than 100', key);
    //             } else if(parseInt(this.nomineeDate[0].nominee[0].nclaim) < 100) {
    //                 percentValid = false;
    //                 this.toastr.error('Claim percentage should not be less than 100', key);
    //             }
    //
    //         } else if(this.nomineeDate[0].nominee.length > 1 && this.nomineeDate[0].nominee.length < 3) {
    //             let total = parseInt(this.nomineeDate[0].nominee[0].nclaim) + parseInt(this.nomineeDate[0].nominee[1].nclaim);
    //             if(total == 100) {
    //                 percentValid = true;
    //             } else {
    //                 percentValid = false;
    //             }
    //             if(total > 100) {
    //                 percentValid = false
    //                 this.toastr.error('Claim percentage should not be greater than 100', key);
    //             } else if(total < 100) {
    //                 percentValid = false;
    //                 this.toastr.error('Claim percentage should not be less than 100', key);
    //             }
    //         }
    //         console.log(percentValid, 'percentValid');
    //         if(this.nomineeDate[0].nominee.length > 1 && this.nomineeDate[0].nominee.length < 3) {
    //
    //         }
    //         if (this.nomineeDate[0].nominee[0].nname == '' &&
    //             this.nomineeDate[0].nominee[0].nage == '' &&
    //             this.nomineeDate[0].nominee[0].nrelationship == '' &&
    //             this.nomineeDate[0].nominee[0].nclaim == '' && this.nomineeDate[0].nominee.length < 2) {
    //             percentValid = true;
    //         }
    //         if(percentValid){
    //             this.proposal(stepper);
    //         }
    //     }
    // }


    nomineeDetails(stepper: MatStepper, index, key) {

        sessionStorage.nomineeDate = JSON.stringify(this.nomineeDate);

        this.lastStepper = stepper;

        let valid = false;

        if (key == 'Nominee Details' && this.nomineeDate[index].nominee[0].nage != '') {

            for (let i = 0; i < this.nomineeDate[index].nominee.length; i++) {

                if (this.nomineeDate[index].nominee[i].nname != '' &&

                    this.nomineeDate[index].nominee[i].nage != '' &&

                    this.nomineeDate[index].nominee[i].nrelationship != '' &&

                    this.nomineeDate[index].nominee[i].nclaim != '') {

                    if (this.nomineeDate[index].nominee[i].nage < 18) {

                        if (this.nomineeDate[index].nominee[i].aname != '' &&

                            this.nomineeDate[index].nominee[i].aage != '' &&

                            this.nomineeDate[index].nominee[i].arelationship != '') {

                            if (this.nomineeDate[index].nominee[i].aage >= 18) {

                                valid = true;

                            } else {

                                valid = false;

                                this.toastr.error('Appointee age should be 18 and above', key);

                                break;

                            }

                        } else {

                            if (i == this.nomineeDate[index].nominee.length - 1) {

                                valid = false;

                                this.toastr.error('Please fill the empty fields', key);

                                break;

                            }

                        }

                    } else {

                        valid = true;

                    }

                } else {

                    if (i == this.nomineeDate[index].nominee.length - 1) {

                        valid = false;

                        this.toastr.error('Please fill the empty fields', key);

                        break;

                    }

                }

            }

        } else {

            valid = true;

        }

        if (valid) {

            let percentValid = true;

            if (this.nomineeDate[0].nominee.length < 2 && this.nomineeDate[0].nominee.length >= 1) {

                console.log(parseInt(this.nomineeDate[0].nominee[0].nclaim), 'ppp');

                if (parseInt(this.nomineeDate[0].nominee[0].nclaim) == 100) {

                    percentValid = true;

                } else {

                    percentValid = false;

                }

                if (parseInt(this.nomineeDate[0].nominee[0].nclaim) > 100) {

                    percentValid = false;

                    this.toastr.error('Claim percentage should not be greater than 100', key);

                } else if (parseInt(this.nomineeDate[0].nominee[0].nclaim) < 100) {

                    percentValid = false;

                    this.toastr.error('Claim percentage should not be less than 100', key);

                }

            } else if (this.nomineeDate[0].nominee.length > 1 && this.nomineeDate[0].nominee.length < 3) {

                let total = parseInt(this.nomineeDate[0].nominee[0].nclaim) + parseInt(this.nomineeDate[0].nominee[1].nclaim);

                if (total == 100) {

                    percentValid = true;

                } else {

                    percentValid = false;

                }

                if (total > 100) {

                    percentValid = false

                    this.toastr.error('Claim percentage should not be greater than 100', key);

                } else if (total < 100) {

                    percentValid = false;

                    this.toastr.error('Claim percentage should not be less than 100', key);

                }

            }

            console.log(percentValid, 'percentValid');

            if (this.nomineeDate[0].nominee.length > 1 && this.nomineeDate[0].nominee.length < 3) {

            }

            if (this.nomineeDate[0].nominee[0].nname == '' &&

                this.nomineeDate[0].nominee[0].nage == '' &&

                this.nomineeDate[0].nominee[0].nrelationship == '' &&

                this.nomineeDate[0].nominee[0].nclaim == '' && this.nomineeDate[0].nominee.length < 2) {

                percentValid = true;

            }

            if (percentValid) {

                this.proposal(stepper);

            }

        }

    }




    // End

    //Create Proposal
    proposal(stepper) {
        // alert(sessionStorage.proposalID)
        // alert(sessionStorage.proposalIdStar)
        const data = [{
            'platform': 'web',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
            // 'proposal_id' :sessionStorage.proposalId,
            'proposal_id' :sessionStorage.proposalIdStar,
            'enquiry_id': this.getFamilyDetails.enquiry_id,
            'group_name':  this.getFamilyDetails.name,
            'company_name': this.buyProductdetails.company_name,
            'product_id': this.buyProductdetails.product_id,
            'plan_name': this.buyProductdetails.product_name,
            'policy_type_name': this.buyProductdetails.prod_shortform,
            'policy_category': 'fresh',
            'policy_started_on': '',
            'policy_end_on': '',
            'policy_period': '1',
            'sum_insured_id': this.buyProductdetails.suminsured_id,
            'sum_insured_amount': this.buyProductdetails.suminsured_amount,
            'scheme_id': this.buyProductdetails.scheme,
            'title': this.personalData.personalTitle,
            'proposer_fname': this.personalData.personalFirstname,
            'proposer_lname': this.personalData.personalLastname,
            'proposer_email': this.personalData.personalEmail,
            'proposer_mobile': this.personalData.personalMobile,
            'proposer_alternate_mobile': this.personalData.personalAltnumber,
            'proposer_res_address1': this.personalData.residenceAddress,
            'proposer_res_address2': this.personalData.residenceAddress2,
            'proposer_res_area': this.personalData.residenceArea.toString(),
            'proposer_res_areaname':  this.personal.controls['residenceAreaName'].value,
            'proposer_res_city': this.personalData.residenceCity.toString(),
            'proposer_res_cityname': this.personal.controls['residenceCityName'].value,
            'proposer_res_state': this.personalData.residenceState,
            'proposer_res_pincode': this.personalData.residencePincode,
            'proposer_comm_address1': this.personalData.personalAddress,
            'proposer_comm_address2': this.personalData.personalAddress2,
            'proposer_comm_area': this.personalData.personalArea.toString(),
            'proposer_comm_areaname': this.personal.controls['personalAreaName'].value,
            'proposer_comm_city': this.personalData.personalCity.toString(),
            'proposer_comm_cityname': this.personal.controls['personalCityName'].value,
            'proposer_comm_state': this.personalData.personalState,
            'proposer_comm_pincode': this.personalData.personalPincode,
            'prop_dob': this.datepipe.transform(this.personalData.personalDob, 'y-MM-dd') ,
            'prop_occupation': this.personalData.personalOccupation,
            'prop_annual_income': this.personalData.personalIncome,
            'prop_pan_no': this.personalData.personalPan.toUpperCase(),
            'prop_aadhar_no': this.personalData.personalAadhar,
            'gst_id_no': this.personalData.personalGst.toUpperCase(),
            'gstType': this.personalData.personalgstIdType,
            'exist_health_ins_covered_persons_details': '',
            'have_eia_no': '1',
            'eia_no': '',
            'previous_medical_insurance': this.personalData.previousinsurance == 'No' ? '' : this.personalData.previousinsurance,
            'critical_illness': 'NO',
            'social_status': this.personalData.socialStatus == true || this.personalData.socialStatus == 'true' ? 1 : 0,
            'social_status_bpl': this.personalData.socialAnswer1 == '' || this.personalData.socialAnswer1 == null ? '0' : this.personalData. socialAnswer1,
            'social_status_disabled': this.personalData.socialAnswer2 == '' || this.personalData.socialAnswer2 == null ? '0' : this.personalData. socialAnswer2,
            'social_status_informal': this.personalData.socialAnswer3 == '' || this.personalData.socialAnswer3  == null ? '0' : this.personalData. socialAnswer3 ,
            'social_status_unorganized': this.personalData.socialAnswer4 == '' || this.personalData.socialAnswer4 == null ? '0' : this.personalData. socialAnswer4,
            'nominee_name_one': this.nomineeDate[0].nominee[0].nname,
            'nominee_age_one': this.nomineeDate[0].nominee[0].nage,
            'nominee_relationship_one': this.nomineeDate[0].nominee[0].nrelationship,
            'nominee_percentclaim_one': this.nomineeDate[0].nominee[0].nclaim,
            'appointee_name_one': this.nomineeDate[0].nominee[0].aname,
            'appointee_age_one': this.nomineeDate[0].nominee[0].aage,
            'appointee_relationship_one': this.nomineeDate[0].nominee[0].arelationship,
            'nominee_name_two': this.nomineeDate[0].nominee.length > 1 ? this.nomineeDate[0].nominee[1].nname : '',
            'nominee_age_two': this.nomineeDate[0].nominee.length > 1 ? this.nomineeDate[0].nominee[1].nage : '',
            'nominee_relationship_two': this.nomineeDate[0].nominee.length > 1 ?  this.nomineeDate[0].nominee[1].nrelationship : '',
            'nominee_percentclaim_two': this.nomineeDate[0].nominee.length > 1 ? this.nomineeDate[0].nominee[1].nclaim : '',
            'appointee_name_two': this.nomineeDate[0].nominee.length > 1 ? this.nomineeDate[0].nominee[1].aname : '',
            'appointee_age_two': this.nomineeDate[0].nominee.length > 1 ? this.nomineeDate[0].nominee[1].aage : '',
            'appointee_relationship_two': this.nomineeDate[0].nominee.length > 1 ? this.nomineeDate[0].nominee[1].arelationship : '',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
            'created_by': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'insured_details': this.familyMembers
        }];
        console.log(data, 'alldata');
        this.settings.loadingSpinner = true;
        this.proposalservice.getProposal(data).subscribe(
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
            sessionStorage.summaryData = JSON.stringify(this.summaryData);
            this.proposalId = this.summaryData.policy_id;
            this.proposalIdStar = this.summaryData.policy_id;
            // alert(this.summaryData.policy_id);
            // alert(this.proposalId);
            this.proposalNumber= this.summaryData.proposalNum;
            sessionStorage.proposalID = this.proposalId;
            // alert(sessionStorage.proposalID)
            this.personal.controls['personalOccupationName'].patchValue(this.occupationList[this.personal.controls['personalOccupation'].value]);
            if (sessionStorage.residenceCitys != '' && sessionStorage.residenceCitys != undefined && !this.personal.controls['sameas'].value) {
                this.personal.controls['residenceCityName'].patchValue(this.residenceCitys[this.personal.controls['residenceCity'].value]);
                this.personal.controls['residenceAreaName'].patchValue(this.rAreaNames[this.personal.controls['residenceArea'].value]);
            } else if(this.personal.controls['sameas'].value){
                this.personal.controls['residenceCityName'].patchValue(this.personalCitys[this.personal.controls['personalCity'].value]);
                this.personal.controls['residenceAreaName'].patchValue(this.areaNames[this.personal.controls['personalArea'].value]);
            }
            this.proposerFormData = this.personal.value;
            console.log(this.proposerFormData);
            console.log(this.personal.value);
            this.insuredFormData = this.familyMembers;
            this.pos_status = this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4;

            this.nomineeFormData = this.nomineeDate;
            sessionStorage.proposerFormData = JSON.stringify(this.proposerFormData);
            sessionStorage.insuredFormData = JSON.stringify(this.insuredFormData);
            sessionStorage.nomineeFormData = JSON.stringify(this.nomineeFormData);
            sessionStorage.proposalIdStar = JSON.parse( this.proposalIdStar);
            // alert(sessionStorage.proposalIdStar);
            this.createdDate = new Date();

            stepper.next();
            this.topScroll();
            this.nextStep();
            this.healthStarTrue3 = false;
        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }
    public proposalFailure(error) {
        this.settings.loadingSpinner = false;
    }

    suminsuredproposal(){
        const data = {

            "platform": "web",
            "postalcode": this.pincoce ? this.pincoce : '',
            "sum_insured": this.suminsuredidddd,
            "family_group_name": this.groupDetails.family_groups[0].name,
            "enquiry_id": this.groupDetails.enquiry_id,
            "created_by": "0",
            "company_id": "2",
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
            'plan_name': this.buyProductdetails.product_name,
            'product_id': this.buyProductdetails.product_id,


        };
        console.log(data, 'alldata');
        this.settings.loadingSpinner = true;
        this.proposalservice.getProposalsss(data).subscribe(
            (successData) => {
                this.suminsuredSuccess(successData);
            },
            (error) => {
                this.suminsuredFailure(error);
            }
        );

    }
    public suminsuredSuccess(successData) {
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {
            this.summaryData1 = successData.ResponseObject[0].name;
            this.summaryData2 = successData.ResponseObject[0].product_lists[0].base_premium;
            console.log( this.summaryData2,' this.summaryData2')
            this.summaryData3= successData.ResponseObject[0].product_lists[0].service_tax;
            console.log( this.summaryData3,' this.summaryData2')

            this.summaryData4 = successData.ResponseObject[0].product_lists[0].premium_total;
            console.log( this.summaryData4,' this.summaryData2')


        } else {
        }
    }
    public suminsuredFailure(error) {
        this.settings.loadingSpinner = false;
    }

    suminsuredproposal1(){
        const data = {

            "platform": "web",
            "postalcode": this.pincoce ? this.pincoce : '',
            "sum_insured": this.suminsuredidddd1,
            "family_group_name": this.group_name,
            "enquiry_id": this.enquiry,
            "created_by": "0",
            "company_id": "2",
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
            'plan_name': this.productname,
            'product_id': this.productid,


        };
        console.log(data, 'alldata');
        this.settings.loadingSpinner = true;
        this.proposalservice.getProposalsss(data).subscribe(
            (successData) => {
                this.suminsured1Success(successData);
            },
            (error) => {
                this.suminsured1Failure(error);
            }
        );

    }
    public suminsured1Success(successData) {
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {
            this.summaryData1 = successData.ResponseObject[0].name;
            this.summaryData2 = successData.ResponseObject[0].product_lists[0].base_premium;
            console.log( this.summaryData2,' this.summaryData2')
            this.summaryData3= successData.ResponseObject[0].product_lists[0].service_tax;
            console.log( this.summaryData3,' this.summaryData2')

            this.summaryData4 = successData.ResponseObject[0].product_lists[0].premium_total;
            console.log( this.summaryData4,' this.summaryData2')


        } else {
        }
    }
    public suminsured1Failure(error) {
        this.settings.loadingSpinner = false;
    }







    // payment
    public payNow() {
        const data = {
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
            'platform': 'web',
            'reference_id' : this.proposalNumber,
            'proposal_id': this.proposalId,
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        console.log(data, 'dataaaa')
        this.settings.loadingSpinner = true;
        this.proposalservice.getPolicyToken(data).subscribe(
            (successData) => {
                this.getPolicyTokenSuccess(successData);
            },
            (error) => {
                this.getPolicyTokenFailure(error);
            }
        );
    }
    public getPolicyTokenSuccess(successData) {
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {
            // this.toastr.success('Proposal created successfully!!');
            this.paymentGatewayData = successData.ResponseObject;
            this.window.location.href = this.paymentGatewayData.payment_gateway_url;
            this.lastStepper.next();
            this.nextStep();

        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }
    public getPolicyTokenFailure(error) {
        this.settings.loadingSpinner = false;
        console.log(error);
    }

    gstIdList() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0'

        }
        this.proposalservice.getGstId(data).subscribe(
            (successData) => {
                this.gstSuccess(successData);
            },
            (error) => {
                this.gstFailure(error);
            }
        );
    }
    public gstSuccess(successData) {
        if (successData.IsSuccess) {
            this.gstListType = successData.ResponseObject;
            console.log(this.gstListType,'this.gstListType' );
        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }
    public gstFailure(error) {
    }
    gstIdList1() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0'

        }
        this.proposalservice.getGstId(data).subscribe(
            (successData) => {
                this.gstSuccess1(successData);
            },
            (error) => {
                this.gstFailure1(error);
            }
        );
    }
    public gstSuccess1(successData) {
        if (successData.IsSuccess) {
            this.gstListType1 = successData.ResponseObject;
            console.log(this.gstListType1,'this.gstListType1' );
        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }
    public gstFailure1(error) {
    }



//
// //Summary residence detail
//     public proposalFailure(error) {
//         console.log(error);
//     }
//
//     getCityIdF2(title, cid, pincode) {
//         const data = {
//             'platform': 'web',
//             'pincode': pincode,
//             'city_id': cid
//         }
//         this.common.getArea(data).subscribe(
//             (successData) => {
//                 this.getCityResistSuccess(successData);
//             },
//             (error) => {
//                 this.getCityResistFailure(error);
//             }
//         );
//     }
//     public getCityResistSuccess(successData) {
//         if (successData.IsSuccess == true) {
//             this.rAreaNames = successData.ResponseObject.area;
//             // this.rAreaName = this.rAreaNames.area;
//             if (this.sumTitle == 'residence') {
//                 for (let i =0; i < this.rAreaNames.length; i++) {
//                     if (this.rAreaNames[i].areaID == this.summaryData.prop_res_area) {
//                         this.sumAreaName = this.rAreaNames[i].areaName;
//                     }
//
//                 }
//             }
//         }
//     }
//
//     public getCityResistFailure(error) {
//         console.log(error);
//     }
//
// //Summary personal detail
//     getCityIdSumm(title, cid, pincode) {
//         const data = {
//             'platform': 'web',
//             'pincode': pincode,
//             'city_id': cid
//         }
//         this.common.getArea(data).subscribe(
//             (successData) => {
//                 this.getCityIdSummSuccess(successData);
//             },
//             (error) => {
//                 this.getCityIdSummFailure(error);
//             }
//         );
//     }
//     public getCityIdSummSuccess(successData) {
//         if (successData.IsSuccess == true) {
//             this.rAreaNames = successData.ResponseObject.area;
//             // this.rAreaName = this.rAreaNames.area;
//             if (this.title == 'personal') {
//                 for (let i =0; i < this.rAreaNames.length; i++) {
//                     if (this.rAreaNames[i].areaID == this.summaryData.prop_comm_area) {
//                         this.sumAreaNameComm = this.rAreaNames[i].areaName;
//                     }
//
//                 }
//             }
//         }
//     }
//     public getCityIdSummFailure(error) {
//         console.log(error);
//     }
    payLater() {
        const data = [{
            'platform': 'web',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
            'proposal_id' : this.proposalId,
            'enquiry_id': this.getFamilyDetails.enquiry_id,
            'user_id':this.getFamilyDetails.enquiry_id,
            'group_name':  this.getFamilyDetails.name,
            'company_name': this.buyProductdetails.company_name,
            'product_id': this.buyProductdetails.product_id,
            'plan_name': this.buyProductdetails.product_name,
            'proposalNum': this.summaryData.proposalNum,
            'created-date': this.createdDate,
            'premium': this.summaryData2==''||this.summaryData2==undefined?this.buyProductdetails.premium_amount:this.summaryData2,
            'servicetax': this.summaryData3==''||this.summaryData3==undefined?this.buyProductdetails.service_tax:this.summaryData3,
            'total_premium': this.summaryData4==''||this.summaryData4==undefined?this.buyProductdetails.totalPremium:this.summaryData4,
            'company_logo': this.buyProductdetails.company_logo,
            'paymentlink-date': '',
            'policy_type_name': this.buyProductdetails.prod_shortform,
            'policy_category': 'fresh',
            'pincode': this.pincoce,
            'policy_started_on': '',
            'policy_end_on': '',
            'policy_period': '1',
            'paylater':this.payLaterr,
            'sum_insured_id':  this.suminsuredidddd==''?this.buyProductdetails.suminsured_id:this.suminsuredidddd,
            'sum_insured_amount': this.animal==''?this.buyProductdetails.suminsured_amount:this.animal,
            'scheme_id': this.buyProductdetails.scheme,
            'title': this.personalData.personalTitle,
            'proposer_fname': this.personalData.personalFirstname,
            'proposer_lname': this.personalData.personalLastname,
            'proposer_email': this.personalData.personalEmail,
            'proposer_mobile': this.personalData.personalMobile,
            'proposer_alternate_mobile': this.personalData.personalAltnumber,
            'proposer_res_address1': this.personalData.residenceAddress,
            'proposer_res_address2': this.personalData.residenceAddress2,
            'proposer_res_area': this.personalData.residenceArea.toString(),
            'proposer_res_areas': this.personalData.residenceArea.value,
            'proposer_res_areaname':  this.personal.controls['residenceAreaName'].value,
            'proposer_res_city': this.personalData.residenceCity.toString(),
            'proposer_res_citys': this.personalData.residenceCity.value,
            'proposer_res_cityname': this.personal.controls['residenceCityName'].value,
            'proposer_res_state': this.personalData.residenceState,
            'proposer_res_pincode': this.personalData.residencePincode,
            'proposer_comm_address1': this.personalData.personalAddress,
            'proposer_comm_address2': this.personalData.personalAddress2,
            'proposer_comm_area': this.personalData.personalArea.toString(),
            'proposer_comm_areas': this.personalData.personalArea.value,
            'proposer_comm_areaname': this.personal.controls['personalAreaName'].value,
            'proposer_comm_city': this.personalData.personalCity.toString(),
            'proposer_comm_citys': this.personalData.personalCity.value,
            'proposer_comm_cityname': this.personal.controls['personalCityName'].value,
            'proposer_comm_state': this.personalData.personalState,
            'proposer_comm_pincode': this.personalData.personalPincode,
            'prop_dob': this.datepipe.transform(this.personalData.personalDob, 'y-MM-dd') ,
            'prop_occupation': this.personalData.personalOccupation,
            'prop_occupationName':  this.personal.controls['personalOccupationName'].value,
            'prop_annual_income': this.personalData.personalIncome,
            'prop_pan_no': this.personalData.personalPan.toUpperCase(),
            'prop_aadhar_no': this.personalData.personalAadhar,
            'gst_id_no': this.personalData.personalGst.toUpperCase(),

            'gstType': this.personalData.personalgstIdType,
            'exist_health_ins_covered_persons_details': '',
            'have_eia_no': '1',
            'eia_no': '',
            'previous_medical_insurance': this.personalData.previousinsurance == 'No' ? '' : this.personalData.previousinsurance,
            'critical_illness': 'NO',
            'social_status':  this.personal['controls'].socialStatus.value,
            'social_status_bpl': this.personalData.socialAnswer1 == ''|| this.personalData.socialAnswer1 == null ? '0' : this.personalData. socialAnswer1,
            'social_status_disabled': this.personalData.socialAnswer2 == '' || this.personalData.socialAnswer2 == null ? '0' : this.personalData. socialAnswer2,
            'social_status_informal': this.personalData.socialAnswer3 == '' || this.personalData.socialAnswer3  == null ? '0' : this.personalData. socialAnswer3 ,
            'social_status_unorganized': this.personalData.socialAnswer4 == '' || this.personalData.socialAnswer4 == null ? '0' : this.personalData. socialAnswer4,
            'nominee_name_one': this.nomineeDate[0].nominee[0].nname,
            'nominee_age_one': this.nomineeDate[0].nominee[0].nage,
            'nominee_relationship_one': this.nomineeDate[0].nominee[0].nrelationship,
            'nominee_percentclaim_one': this.nomineeDate[0].nominee[0].nclaim,
            'appointee_name_one': this.nomineeDate[0].nominee[0].aname,
            'appointee_age_one': this.nomineeDate[0].nominee[0].aage,
            'appointee_relationship_one': this.nomineeDate[0].nominee[0].arelationship,
            'nominee_name_two': this.nomineeDate[0].nominee.length > 1 ? this.nomineeDate[0].nominee[1].nname : '',
            'nominee_age_two': this.nomineeDate[0].nominee.length > 1 ? this.nomineeDate[0].nominee[1].nage : '',
            'nominee_relationship_two': this.nomineeDate[0].nominee.length > 1 ?  this.nomineeDate[0].nominee[1].nrelationship : '',
            'nominee_percentclaim_two': this.nomineeDate[0].nominee.length > 1 ? this.nomineeDate[0].nominee[1].nclaim : '',
            'appointee_name_two': this.nomineeDate[0].nominee.length > 1 ? this.nomineeDate[0].nominee[1].aname : '',
            'appointee_age_two': this.nomineeDate[0].nominee.length > 1 ? this.nomineeDate[0].nominee[1].aage : '',
            'appointee_relationship_two': this.nomineeDate[0].nominee.length > 1 ? this.nomineeDate[0].nominee[1].arelationship : '',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
            'created_by': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'insured_details': this.familyMembers,
            'length':this.nomineeDate[0].nominee.length,
            'nomineeDate':this.nomineeDate,
            'city1':this.personalCitys,
            'area1':this.areaNames,
            'sameas':this.personal.controls['sameas'].value,
            'sameAsProposer':this.sameAsProposer

            // 'payment': this.paymentGatewayData.payment_gateway_url
        }];

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
            this.setOccupationList1();
            this.gstIdList1();
            this.nomineRelationship1();

        } else {
            // this.toastr.error('sorry!');
        }
    }

    public payLaterFailure(successData) {
    }

    policyid() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'policy_id': this.proposalId

        }
        this.proposalservice.policyid(data).subscribe(
            (successData) => {
                this.policyidSuccess1(successData);
            },
            (error) => {
                this.policyidFailure1(error);
            }
        );
    }
    public policyidSuccess1(successData) {
        if (successData.IsSuccess) {
            this.submit=true
            this.policyidpay = successData.ResponseObject
            this.policyid1 = successData.ResponseObject.proposer_details;
            this.policyidinsured = successData.ResponseObject.insured_details;
            this.policyidnominee = successData.ResponseObject.nominee_details;
            this.policyidappointee = successData.ResponseObject.appointee_details;
            console.log(this.policyid1,'this.policyid1' );
            this.sum_insured_amount=this.policyid1.sum_insured_amount;
            console.log(this.sum_insured_amount,'this.sum_insured_amount')
            this.premiumsubmit=this.policyid1.premium;
            console.log(this.premiumsubmit,'this.premiumsubmit')

            this.servicetaxsubmit=this.policyid1.servicetax;
            console.log(this.servicetaxsubmit,'this.servicetaxsubmit')


            this.total_premiumsubmit=this.policyid1.total_premium;
            this.group_namesubmit=this.policyid1.group_name;
            this.titlesubmit=this.policyid1.title;
            this.first_namesubmit=this.policyid1.first_name;
            this.last_namesubmit=this.policyid1.last_name;

        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }

    public policyidFailure1(error) {
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
            'proposal_id': this.proposal_Id,
            // 'proposal_id': this.proposalId=undefined?0:this.proposalId,
        };
        console.log(this.proposalId, 'proposalid');
        // console.log(proposal_id, 'proposalid');
        console.log(data, 'data');
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
            console.log(this.requestDetails, 'requestDetailsrequestDetails');
            this.proposalNumber = this.requestDetails[0].proposalNum;
            this.pos_status = this.requestDetails[0].role_id;
            this.proposalId = this.requestDetails[0].proposal_id;
            console.log(this.proposalId, 'this.proposalId')
            console.log(this.pos_status , 'requestDetailsrequestDetails');
            this.getsum_insured_amount = this.requestDetails[0].sum_insured_amount;
            // alert(this.getsum_insured_amount)
            this.getcompany_logo = this.requestDetails[0].company_logo;
            this.getpremium = this.requestDetails[0].premium;
            this.getservicetax = this.requestDetails[0].servicetax;
            this.gettotal_premium = this.requestDetails[0].total_premium;
            this.nominee0=this.requestDetails[0].nominee_name_one;
            this.age=this.requestDetails[0].nominee_age_one;
            this.nrelationship=this.requestDetails[0].nominee_relationship_one;
            this.nclaim=this.requestDetails[0].nominee_percentclaim_one;
            this.claimPercent2();
            this.productid=this.requestDetails[0].product_id;
            this.productname=this.requestDetails[0].plan_name;
            this.enquiry=this.requestDetails[0].enquiry_id;
            this.policy_type_name=this.requestDetails[0].policy_type_name;
            this.annual=this.requestDetails[0].prop_annual_income;
            this.adhar=this.requestDetails[0].prop_aadhar_no;
            this.pan=this.requestDetails[0].prop_pan_no;
            this.gstId=this.requestDetails[0].gst_id_no;
            this.product_id =this.requestDetails[0].product_id;
            this.nomineevalue =this.requestDetails[0].nomineeDate;
            this.aname =this.requestDetails[0].appointee_name_one;
            this.aage =this.requestDetails[0].appointee_age_one;
            this.arelationship =this.requestDetails[0].appointee_relationship_one;
            this.nominee1 =this.requestDetails[0].appointee_relationship_one;
            this.age1 =this.requestDetails[0].appointee_relationship_one;
            this.typeAge1();
            this.nrelationship1 =this.requestDetails[0].appointee_relationship_one;
            this.nomineeName2=this.requestDetails[0].nominee_name_two;
           this.nomineeAge2=this.requestDetails[0].nominee_age_two;
            this.typeAge2();
            this.nomineeRelationship2=this.requestDetails[0].nominee_relationship_two;
           this.nomineeClaim2=this.requestDetails[0].nominee_percentclaim_two;
           this.appointeeName2=this.requestDetails[0].appointee_name_two;
           this.appointeeAge2=this.requestDetails[0].appointee_age_two;
           this.appointeeRelationship2=this.requestDetails[0].appointee_relationship_two;
           this.pinCode=this.requestDetails[0].proposer_comm_pincode;
           this.cityList=this.requestDetails[0].city1;
           this.arealist=this.requestDetails[0].area1;
           this.sameAs=this.requestDetails[0].sameas;
           this.areapatch= this.requestDetails[0].proposer_comm_areas;
           this.citypatch= this.requestDetails[0].proposer_comm_citys;
           this.group_name=this.requestDetails[0].group_name;
            this.requestInsuredDetails = this.requestDetails[0].insured_details;
            console.log(this.requestInsuredDetails,'this.requestInsuredDetails....')
            console.log(this.getservicetax,'this.requestInsuredDetails....')
            console.log(this.getpremium,'this.gettotal_premium....')
            console.log(this.getsum_insured_amount,'this.gettotal_premium....')
            console.log(this.gettotal_premium,'this.gettotal_premium....')
            sessionStorage.proposalID = this.proposalId;
            this.socialStatuss=this.requestDetails[0].social_status;
            this.social=this.requestDetails[0].social_status_bpl;
            this.social_disabled=this.requestDetails[0].social_status_disabled;
            this.social_informal=this.requestDetails[0].social_status_informal;
            this.social_unorganized=this.requestDetails[0].social_status_unorganized;
            this.openeditproposal();
            this.changeSocialStatus1(this.socialStatuss);
            // alert(this.socialStatuss);
            this.personal['controls'].socialStatus.patchValue(this.socialStatuss);
            this.personal['controls'].socialAnswer1.patchValue(this.social);
            this.personal['controls'].socialAnswer2.patchValue(this.social_disabled);
            this.personal['controls'].socialAnswer3.patchValue(this.social_informal);
            this.personal['controls'].socialAnswer4.patchValue(this.social_unorganized);
            this.setOccupationList1();
            this.gstIdList1();
            // this.changeSocialStatus1($event)
            this.appointeRelationship1();
            this.nomineRelationship1();
            this.setRelationship1();
            this.getPostal(this.pinCode, 'personal');
            this.getAreas1('personal', 'manual');
            this.getAreas1('residence', 'rmanual');
            this.sameValues();






        } else {
        }
    }
    public getBackResFailure(successData) {
    }
    paySuccess(){
        this.window.location.href = this.requestDetails.payment;

    }
    openeditproposal(){
        this.personal.controls['personalTitle'].patchValue(this.requestDetails[0].title);
        this.personal.controls['personalFirstname'].patchValue(this.requestDetails[0].proposer_fname);
        this.personal.controls['personalLastname'].patchValue(this.requestDetails[0].proposer_lname);
        this.personal.controls['personalDob'].patchValue(this.requestDetails[0].prop_dob);
        this.personal.controls['personalEmail'].patchValue(this.requestDetails[0].proposer_email);
        this.personal.controls['personalMobile'].patchValue(this.requestDetails[0].proposer_mobile);
        this.personal.controls['personalAltnumber'].patchValue(this.requestDetails[0].proposer_alternate_mobile);
        this.personal.controls['personalOccupation'].patchValue(this.requestDetails[0].prop_occupation);
        this.personal.controls['personalIncome'].patchValue(this.requestDetails[0].prop_annual_income);
        this.personal.controls['personalAadhar'].patchValue(this.requestDetails[0].prop_aadhar_no);
        this.personal.controls['personalPan'].patchValue(this.requestDetails[0].prop_pan_no );
        this.personal.controls['personalGst'].patchValue(this.requestDetails[0].gst_id_no);
        this.personal.controls['personalgstIdType'].patchValue(this.requestDetails[0].gstType);
        this.personal.controls['previousinsurance'].patchValue(this.requestDetails[0].previous_medical_insurance);
        this.personal.controls['personalAddress'].patchValue(this.requestDetails[0].proposer_comm_address1);
        this.personal.controls['personalAddress2'].patchValue(this.requestDetails[0].proposer_comm_address2);
        this.personal.controls['personalPincode'].patchValue(this.requestDetails[0].proposer_comm_pincode);
        this.personal.controls['personalCity'].patchValue(this.requestDetails[0].proposer_comm_city);
        this.personal.controls['personalState'].patchValue(this.requestDetails[0].proposer_comm_state);
        this.getAreas1('personal', 'manual');
        this.personal.controls['personalArea'].patchValue(this.requestDetails[0].proposer_comm_area);
        this.personal.controls['residenceAddress'].patchValue(this.requestDetails[0].proposer_res_address1);
        this.personal.controls['residenceAddress2'].patchValue(this.requestDetails[0].proposer_res_address2);
        this.personal.controls['residencePincode'].patchValue(this.requestDetails[0].proposer_res_pincode);
        this.personal.controls['residenceCity'].patchValue(this.requestDetails[0].proposer_res_city);
        this.personal.controls['residenceState'].patchValue(this.requestDetails[0].proposer_res_state);
        this.personal.controls['residenceArea'].patchValue(this.requestDetails[0].proposer_res_area);
        this.personal.controls['sameas'].patchValue(this.requestDetails[0].sameas);
        this.personal['controls'].socialStatus.patchValue(this.requestDetails[0].social_status);
        this.changeSocialStatus1(this.requestDetails[0].social_status);
        this.personal['controls'].socialAnswer1.patchValue(this.requestDetails[0].social_status_bpl);
        this.personal['controls'].socialAnswer2.patchValue(this.requestDetails[0].social_status_disabled);
        this.personal['controls'].socialAnswer3.patchValue(this.requestDetails[0].social_status_informal);
        this.personal['controls'].socialAnswer4.patchValue(this.requestDetails[0].social_status_unorganized);


    }
    openedit(value){
        console.log(value);


    }

    openDialog(): void {

        const dialogRef = this.dialog.open(starhealthedit, {
            width: '500px',
            data: {animal1: this.payLaterr,productID:this.productid, planname:this.productname}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result,'result89999.........');
            this.animal = result.name;
            // this.payanimal = result.name;
            if(this.payLaterr==false){
                this.suminsuredId();
            }
            else{
                this.suminsuredId1();
            }

        });
    }

    suminsuredId() {
        const data = {
            'platform': 'web',

            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            "product_id":this.buyProductdetails.product_id,
            "policy_type_name": this.buyProductdetails.prod_shortform,
            "sum_insured_amount": this.animal,
        }
        console.log(data, 'dataaaa')

        this.proposalservice.suminsuredId(data).subscribe(
            (successData) => {
                this.suminsuredIdSuccess(successData);
            },
            (error) => {
                this.suminsuredIdFailure(error);
            }
        );
    }
    public suminsuredIdSuccess(successData) {
        if (successData.IsSuccess) {
            this.suminsuredidddd=successData.ResponseObject.prod_suminsured_id;
            this.suminsuredproposal();
            // this.suminsuredproposal1();
            console.log(this.suminsuredidddd,'this.suminsuredidddd')
            // this.toastr.success('Proposal created successfully!!');


        }
    }
    public suminsuredIdFailure(error) {
    }

    suminsuredId1() {
        const data = {
            'platform': 'web',

            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            "sum_insured_amount": this.animal,
        }
        console.log(data, 'dataaaa')

        this.proposalservice.suminsuredId(data).subscribe(
            (successData) => {
                this.suminsuredId1Success(successData);
            },
            (error) => {
                this.suminsuredId1Failure(error);
            }
        );
    }
    public suminsuredId1Success(successData) {
        if (successData.IsSuccess) {
            this.suminsuredidddd1=successData.ResponseObject.prod_suminsured_id;
            // this.suminsuredproposal();
            this.paylaterEdit=true;
            this.suminsuredproposal1();
            console.log(this.suminsuredidddd1,'this.suminsuredidddd')
            // this.toastr.success('Proposal created successfully!!');


        }
    }
    public suminsuredId1Failure(error) {
    }








}
@Component({
    selector: ' starhealthedit ',
    template: `
        <div class="container" >
            <div class="row">
                <div class="col-md-4" >
                    <mat-form-field class="w-100" *ngIf="valueData==false">
                        <mat-select placeholder="Sum Insured" [(ngModel)]="changeSuninsuredAmount"  (selectionChange)="suminsured()" required>
                            <mat-option *ngFor="let sum of suminsuredserviceDetails | keys" value="{{sum.value}}" > {{sum.value}} </mat-option>
                        </mat-select>
                    </mat-form-field>
                    <!--<div class="col-md-12">-->
                        <!--<button mat-raised-button color="primaryBlue"  type="submit" (click)="onNoClick()">Confirm</button>-->
                        <!--<button mat-raised-button color="primaryBlue" (click)="onNoClose()" >Cancel</button>-->
                    <!--</div>-->

                </div><div class="col-md-4" *ngIf="valueData==true" >
                    <mat-form-field class="w-100">
                        <mat-select placeholder="Sum Insured" [(ngModel)]="changeSuninsuredAmount"  (selectionChange)="suminsured1()" required>
                            <mat-option *ngFor="let sum of suminsuredserviceDetails1 | keys" value="{{sum.value}}" > {{sum.value}} </mat-option>
                        </mat-select>
                    </mat-form-field>
                    <!--<div class="col-md-12">-->
                        <!--<button mat-raised-button color="primaryBlue"  type="submit" (click)="onNoClick()">Confirm</button>-->
                        <!--<button mat-raised-button color="primaryBlue" (click)="onNoClose()" >Cancel</button>-->
                    <!--</div>-->

                </div>
                <div mat-dialog-actions style="justify-content: center">
                    <button mat-raised-button style="background-color: darkblue; color: white;" (click)="onNoClose()">Cancel</button>
                    <button mat-raised-button style="background-color: darkblue; color: white;" (click)="onNoClick()">Confirm</button>
                </div>
            </div>
        </div>
        
       
    `
})
export class starhealthedit {
    changeSuninsuredAmount: any;
    suminsuredserviceDetails: any;
    suminsuredserviceDetails1: any;
    buyProductdetails: any;
    paylaterValue: any;
    valueData: any;
    productId: any;
    productName: any;

    constructor(
        public dialogRef: MatDialogRef<starhealthedit>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData, public proposalservice: HealthService) {

        console.log(data.animal1,'summmmm')
        this.valueData=data.animal1;
        this.productId=data.productID;
        this.productName=data.planname;
        console.log(data.name,'summmmm')
        console.log(data.productID,'summmmm')
        console.log(data.planname,'summmmm')
        // console.log(this.changeSuninsuredAmount,'amouuuuuu')

    }

    ngOnInit() {
        this.testing();
        // this.suminsured();
    }


    onNoClick(): void {
        console.log(this.changeSuninsuredAmount, 'ertyuiouytyui')
        console.log(this.changeSuninsuredAmount.value, 'ertyuiouytyui')
        this.dialogRef.close(
            {name: this.changeSuninsuredAmount}
        );
        console.log(this.changeSuninsuredAmount, 'question2');
        console.log(this.changeSuninsuredAmount.value, 'question2');
    }
    onNoClose(): void {

        this.dialogRef.close();

    }
    testing(){
        if(this.valueData == true){
            this.paylaterValue=true;
            this.suminsured1();
        }else{
            this.paylaterValue=false;
            this.buyProductdetails = JSON.parse(sessionStorage.buyProductdetails);
            this.changeSuninsuredAmount=(this.buyProductdetails.suminsured_id);
            this.suminsured();
        }
    }


    // get request
    suminsured() {


        const data = {
            "platform": "web",
            "role_id": 4,
            "pos_status": "0",
            "user_id": "0",
            "product_id": this.buyProductdetails.product_id,
            'product_name': this.buyProductdetails.product_name,
        };
        // console.log(proposal_id, 'proposalid');
        console.log(data, 'data');
        this.proposalservice.suminsuredservice(data).subscribe(
            (successData) => {

                this.suminsuredserviceSuccess(successData);
            },
            (error) => {
                this.suminsuredserviceFailure(error);
            }
        );

    }

    public suminsuredserviceSuccess(successData) {
        if (successData.IsSuccess) {
            this.suminsuredserviceDetails = successData.ResponseObject;
            console.log(this.suminsuredserviceDetails, 'requestDetailsrequestDetails');


        } else {
        }
    }

    public suminsuredserviceFailure(successData) {
    }

    suminsured1() {


        const data = {
            "platform": "web",
            "role_id": 4,
            "pos_status": "0",
            "user_id": "0",
            "product_id": this.productId,
            'product_name': this.productName,
        };
        // console.log(proposal_id, 'proposalid');
        console.log(data, 'data');
        this.proposalservice.suminsuredservice(data).subscribe(
            (successData) => {

                this.suminsuredservice1Success(successData);
            },
            (error) => {
                this.suminsuredservice1Failure(error);
            }
        );

    }

    public suminsuredservice1Success(successData) {
        if (successData.IsSuccess) {
            this.suminsuredserviceDetails1 = successData.ResponseObject;
            console.log(this.suminsuredserviceDetails1, 'requestDetailsrequestDetails');


        } else {
        }
    }

    public suminsuredservice1Failure(successData) {
    }

}
