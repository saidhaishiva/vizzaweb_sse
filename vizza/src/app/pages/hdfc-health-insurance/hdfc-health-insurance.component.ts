import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {TravelService} from '../../shared/services/travel.service';
import {HealthService} from '../../shared/services/health.service';
import {DatePipe} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {AppSettings} from '../../app.settings';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDialog, MatStepper} from '@angular/material';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {HttpClient} from '@angular/common/http';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
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
    selector: 'app-hdfc-health-insurance',
    templateUrl: './hdfc-health-insurance.component.html',
    styleUrls: ['./hdfc-health-insurance.component.scss'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
})

export class HdfcHealthInsuranceComponent implements OnInit {
    public hdfcPersonal: FormGroup;
    public hdfcInsureArray: FormGroup;
    public nomineeDetails: FormGroup;
    public today: any;
    public personalDobError: any;
    public hdfcHealthProposerAge: any;
    public pin: any;
    public title: any;
    public declaration: any;
    public hdfcpersonalValues: any;
    public AcceptDeclaration: any;
    public getHdfcHealthPremiumList: any;
    public insurePersons: any;
    public items: any;
    public step: any;
    public insurerData: any;
    public hdfcStep1: any;
    public hdfcStep2: any;
    public lastStepper: any;
    public back: any;
    public hdfcHealthNomineeDetails: any;
    public totalAmount: any;
    public settings: any;
    public insuredHdfcRelationList: any;
    public nomineeHdfcRelationList: any;
    public summaryData: any;
    public titleList: any;
    public hdfcHealthCitys: any;
    public hdfcHealthStates: any;
    public IsCustomerAccepted: any;
    public getFamilyDetails: any;
    public arr: any;
    public basePremium: any;
    public serviceTax: any;
    public totalPremium: any;
    public webhost: any;
    public sameAsinsure: any;
    public fullName: any;
    public IsCustomerAcceptedPPCPED: boolean;
    public pincodeValid: any;
    public mobileotpgenerate: any;
    public otpvalidation: any;
    public checkotpvalidation: any;
    public checkotp: any;
    public hdfc_health_proposal_id: any;
    public currentStep: any;
    public personlData: any;
    public insuredFormData: any;
    public nomineeFromData: any;
    public status: any;
    public proposalId: any;
    public payLaterr: any;
    public requestDetails: any;
    public createdDate: any;
    public stepperindex: any;
    public requestCustomerDetails: any;
    public requestInsuredDetails: any;
    public PaymentActionUrl: any;
    public ProposalNumber: any;
    public AdditionalInfo1: any;
    public AdditionalInfo2: any;
    public AdditionalInfo3: any;
    public ProductCd: any;
    public productcode: any;
    public returnURL: any;
    public paymentmode: any;
    public email: any;
    public pos_status: any;
    public genderPerson: any;
    public hdfcMobileTrue0: boolean;
    public hdfcMobileTrue1: boolean;
    public hdfcMobileTrue2: boolean;
    public hdfcMobileTrue3: boolean;
    public panCardValue: boolean;
    public submitPayLater: boolean;
    // public sumInsureValues: boolean;
    public enquiryIdPl: any;
    public groupNamePl: any;
    public productIdPl: any;
    public planNamePl: any;
    public sumInsuredPl: any;
    public basePremiumPl: any;
    public serviceTaxPl: any;
    public totalPremiumPl: any;
    public proposalIdPl: any;
    public tierIDPl: any;
    public summaryDataPL: any;
    public proposerDataPl: any;
    public insuredDataPl: any;
    public companyLogoPl: any;
    public newProposalIdPl: any;
    public nomineeDataPl: any;
    public totalAmountPl: any;
    public AdditionalInfo1Pl: any;
    public AdditionalInfo2Pl: any;
    public AdditionalInfo3Pl: any;
    public paymentmodePl: any;
    public fullNamePl: any;
    public emailPl: any;
    public productcodePl: any;
    public ProductCdPl: any;
    public ProposalNumberPl: any;
    public PaymentActionUrlPl: any;
    public changeSuninsuredAmount: any;
    public suminsuredamount: any;
    public prodName: any;
    public suminsuredamountPl: any;
    public sameAsInsValue: any;
    public inputfieldshow: boolean;


    constructor(public proposalservice: HealthService, public validation: ValidationService, public route: ActivatedRoute, public datepipe: DatePipe, private toastr: ToastrService, public appSettings: AppSettings, public dialog: MatDialog,public router: Router,
                public config: ConfigurationService, public fb: FormBuilder, public auth: AuthService, public http: HttpClient, @Inject(LOCALE_ID) private locale: string) {

        this.stepperindex = 0;
        this.route.params.forEach((params) => {
            if(params.stepper == true || params.stepper == 'true') {
                this.stepperindex = 3;

                if (sessionStorage.summaryData != '' && sessionStorage.summaryData != undefined) {
                    this.summaryData = JSON.parse(sessionStorage.summaryData);
                    this.PaymentActionUrl = this.summaryData.PaymentActionUrl;
                    console.log(this.PaymentActionUrl, 'this.PaymentActionUrl');

                    this.ProposalNumber = this.summaryData.ProposalNumber;
                    console.log(this.ProposalNumber, 'this.ProposalNumber');

                    this.AdditionalInfo1 = this.summaryData.AdditionalInfo1;
                    console.log(this.AdditionalInfo1, 'this.AdditionalInfo1');

                    this.AdditionalInfo2 = this.summaryData.AdditionalInfo2;
                    console.log(this.AdditionalInfo2, 'this.AdditionalInfo2');


                    this.AdditionalInfo3 = this.summaryData.AdditionalInfo3;
                    console.log(this.AdditionalInfo3, 'this.AdditionalInfo3');

                    this.ProductCd = this.summaryData.ProductCd;
                    console.log(this.ProductCd, 'this.ProductCd');

                    this.productcode = this.summaryData.productcode;
                    console.log(this.productcode, 'this.productcode');

                    this.returnURL = this.summaryData.returnURL;
                    this.basePremium = this.summaryData.basePremium;
                    this.serviceTax = this.summaryData.serviceTax;
                    this.totalPremium = this.summaryData.totalPremium;
                    this.personlData = JSON.parse(sessionStorage.personlData);
                    this.insuredFormData = JSON.parse(sessionStorage.insuredFormData);
                    this.nomineeFromData = JSON.parse(sessionStorage.nomineeFromData);
                    sessionStorage.hdfc_health_proposal_id = this.summaryData.ProposalId;
                    this.fullName = this.personlData.firstname + ' ' + this.personlData.lastname;
                    this.totalAmount = parseFloat(this.summaryData.totalPremium);
                }
            }
            this.status = params.stepper;
            this.proposalId = params.proposalId;
            if(this.proposalId != '' || this.proposalId != undefined ){
                this.payLaterr = true;
                console.log(this.proposalId, 'this.proposalId');
                console.log(this.status, 'this.proposalId');
                this.getBackRequest();
            }
            if(this.proposalId == undefined || this.proposalId == '') {
                this.payLaterr = false;
            }
            console.log(this.payLaterr, 'cons');


        });
        console.log(this.stepperindex, 'stepperindex');
        this.currentStep = this.stepperindex;
        this.settings = this.appSettings.settings;
        this.settings.HomeSidenavUserBlock = false;
        this.settings.sidenavIsOpened = false;
        this.settings.sidenavIsPinned = false;
        this.IsCustomerAcceptedPPCPED = false;
        this.sameAsinsure = false;
        this.pincodeValid = true;
        this.IsCustomerAccepted = false;
        this.inputfieldshow = false;
        this.arr = [];
        this.webhost = this.config.getimgUrl();
        this.hdfc_health_proposal_id = 0;
        this.step = 0;
        this.hdfcMobileTrue0 = false;
        this.hdfcMobileTrue1 = true;
        this.hdfcMobileTrue2 = true;
        this.hdfcMobileTrue3 = true;
        this.panCardValue = false;
        // this.sumInsureValues = false;

        let today = new Date();
        this.today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        this.hdfcPersonal = this.fb.group({
            title: ['', Validators.required],
            firstname: new FormControl(''),
            lastname: new FormControl(''),
            gender: ['', Validators.required],
            dob: ['', Validators.compose([Validators.required])],
            address1: ['', Validators.required],
            address2: '',
            address3: '',
            pincode: '',
            stateName: '',
            cityName: '',
            titleName: '',
            otp: ['', Validators.required],
            personalPan: [''],
            city: ['', Validators.required],
            state: ['', Validators.required],
            email: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\']+(\\.[^<>()[\\]\\\\.,;:\\s@\\\']+)*)|(\\\'.+\\\'))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
            mobile: ['', Validators.required],
            paymentmode: ['', Validators.required]

        });
        this.nomineeDetails = this.fb.group({
            'nomineeName': ['', Validators.required],
            'nomineeRelationship': ['', Validators.required],
            'nomineeRelationshipName': ''
        });
    }
    canDeactivate() {
        return this.hdfc_health_proposal_id;
    }
    ngOnInit() {
        if (this.payLaterr == true) {
            this.stepperindex = 3;
            this.step = 3;
            this.hdfcMobileTrue0 = true;
            this.hdfcMobileTrue1 = true;
            this.hdfcMobileTrue2 = true;
            this.hdfcMobileTrue3 = false;
            // this.hdfcMobileTrue0 = false;
            console.log(this.payLaterr, 'this.payLaterrolll');
        } else {
            this.sameAsinsure = false;
            this.getHdfcHealthPremiumList = JSON.parse(sessionStorage.buyProductdetails);
            this.getFamilyDetails = JSON.parse(sessionStorage.changedTabDetails);
            this.insurePersons = this.getFamilyDetails.family_members;
            console.log(this.insurePersons, 'helloWorld');
            console.log(this.insurePersons[0].type, 'helloWorld');
            this.hdfcInsureArray = this.fb.group({
                items: this.fb.array([])
            });

            this.inputfieldshow = false;
            for (let i = 0; i < this.insurePersons.length; i++) {
                this.items = this.hdfcInsureArray.get('items') as FormArray;
                this.items.push(this.initItemRows());
                this.hdfcInsureArray['controls'].items['controls'][i]['controls'].type.setValue(this.insurePersons[i].type);
                if (this.insurePersons[i].type == 'Son') {
                    this.hdfcInsureArray['controls'].items['controls'][i]['controls'].title.patchValue('Mr');
                    this.hdfcInsureArray['controls'].items['controls'][i]['controls'].genderStatus.patchValue('Male');
                } else if (this.insurePersons[i].type == 'Daughter') {
                    this.hdfcInsureArray['controls'].items['controls'][i]['controls'].title.patchValue('Ms');
                    this.hdfcInsureArray['controls'].items['controls'][i]['controls'].genderStatus.patchValue('Female');
                }

            }
            this.titleLists();
            this.getStateList();
            this.RelationShipListHdfc();
            this.nomineeRelationShipListHdfc();
            this.panValues();
            this.sessionData();
        }
    }

    panValues(){
        // alert(this.getHdfcHealthPremiumList.premium_total)
        if(this.getHdfcHealthPremiumList.premium_total > 100000){
            // alert(this.getHdfcHealthPremiumList.premium_total > 100000)
            this.panCardValue=true;
            this.hdfcPersonal.controls['personalPan'].setValidators(Validators.required);
        }else{
            this.panCardValue=false;
            this.hdfcPersonal.controls['personalPan'].setValidators(null);
        }

    }
    // suminsuredValue(){
    //     if((this.getHdfcHealthPremiumList.suminsured_amount > 1200000) && (this.getHdfcHealthPremiumList.suminsured_amount <= 20000000)){
    //         this.sumInsureValues=true;
    //     }else{
    //         this.sumInsureValues=false;
    //     }
    // }
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
    heightValidate(event: any) {
        this.validation.heightValidate(event);
    }
    idValidate(event: any){
        this.validation.idValidate(event);
    }

    sameasInsurerDetails(event, clearType) {
        if (this.sameAsinsure == 'true' || this.sameAsinsure == true) {
            this.ageValidationInsurer(0, 'Self');
            this.hdfcInsureArray['controls'].items['controls'][0]['controls'].insurerDobValidError.patchValue('');
            this.hdfcInsureArray['controls'].items['controls'][0]['controls'].insurerDobError.patchValue('');
            this.hdfcInsureArray['controls'].items['controls'][0]['controls'].sameasInsurer.patchValue(true);
            this.hdfcInsureArray['controls'].items['controls'][0]['controls'].title.patchValue(this.hdfcPersonal.controls['title'].value);
            this.hdfcInsureArray['controls'].items['controls'][0]['controls'].firstname.patchValue(this.hdfcPersonal.controls['firstname'].value);
            this.hdfcInsureArray['controls'].items['controls'][0]['controls'].lastname.patchValue(this.hdfcPersonal.controls['lastname'].value);
            this.hdfcInsureArray['controls'].items['controls'][0]['controls'].genderStatus.patchValue(this.hdfcPersonal.controls['gender'].value == 'M' ? 'Male' : 'Female');
            this.hdfcInsureArray['controls'].items['controls'][0]['controls'].dob.patchValue(this.datepipe.transform(this.hdfcPersonal.controls['dob'].value, 'y-MM-dd'));
            this.hdfcInsureArray['controls'].items['controls'][0]['controls'].relationship.patchValue('I');
            let dobAge = this.ageCalculate(this.datepipe.transform(this.hdfcPersonal.controls['dob'].value, 'y-MM-dd'));
            console.log(dobAge,'dobAge');
                 this.hdfcInsureArray['controls'].items['controls'][0]['controls'].relationshipName.patchValue(this.insuredHdfcRelationList[this.hdfcInsureArray['controls'].items['controls'][0]['controls'].relationship.value]);
        } else if(this.sameAsinsure == 'false' || this.sameAsinsure == false) {
            this.ageValidationInsurer(0, 'Self');
            this.sameAsinsure = false;
            if(clearType == 'clear') {
                this.hdfcInsureArray['controls'].items['controls'][0]['controls'].insurerDobValidError.patchValue('');
                this.hdfcInsureArray['controls'].items['controls'][0]['controls'].insurerDobError.patchValue('');
                this.hdfcInsureArray['controls'].items['controls'][0]['controls'].sameasInsurer.patchValue(false);
                this.hdfcInsureArray['controls'].items['controls'][0]['controls'].title.patchValue('');
                this.hdfcInsureArray['controls'].items['controls'][0]['controls'].firstname.patchValue('');
                this.hdfcInsureArray['controls'].items['controls'][0]['controls'].lastname.patchValue('');
                this.hdfcInsureArray['controls'].items['controls'][0]['controls'].genderStatus.patchValue('');
                this.hdfcInsureArray['controls'].items['controls'][0]['controls'].dob.patchValue('');
                this.hdfcInsureArray['controls'].items['controls'][0]['controls'].relationship.patchValue('');
                this.IsCustomerAcceptedPPCPED = false;
            }
        }
        sessionStorage.sameAsinsure = this.sameAsinsure;
    }
    sameasInsurerDetailsPL(event) {
        if (this.sameAsinsure == 'true' || this.sameAsinsure == true) {
            this.sameAsinsure = true;
            console.log(this.hdfcPersonal.controls['gender'].value, 'another know value......')
            this.hdfcInsureArray['controls'].items['controls'][0]['controls'].title.patchValue(this.hdfcPersonal.controls['title'].value);
            this.hdfcInsureArray['controls'].items['controls'][0]['controls'].firstname.patchValue(this.hdfcPersonal.controls['firstname'].value);
            this.hdfcInsureArray['controls'].items['controls'][0]['controls'].lastname.patchValue(this.hdfcPersonal.controls['lastname'].value);
            this.hdfcInsureArray['controls'].items['controls'][0]['controls'].genderStatus.patchValue(this.hdfcPersonal.controls['gender'].value);
            this.hdfcInsureArray['controls'].items['controls'][0]['controls'].dob.patchValue(this.datepipe.transform(this.hdfcPersonal.controls['dob'].value, 'y-MM-dd'));
            this.hdfcInsureArray['controls'].items['controls'][0]['controls'].relationship.patchValue('I');
        } else {
            this.sameAsinsure =true;
            this.hdfcInsureArray['controls'].items['controls'][0]['controls'].title.patchValue('');
            this.hdfcInsureArray['controls'].items['controls'][0]['controls'].firstname.patchValue('');
            this.hdfcInsureArray['controls'].items['controls'][0]['controls'].lastname.patchValue('');
            this.hdfcInsureArray['controls'].items['controls'][0]['controls'].genderStatus.patchValue('');
            this.hdfcInsureArray['controls'].items['controls'][0]['controls'].dob.patchValue('');
            this.hdfcInsureArray['controls'].items['controls'][0]['controls'].relationship.patchValue('');
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

    quesback() {
        this.back = false;
    }

    prevStep() {
        this.step--;
    }

    initItemRows() {
        return this.fb.group(
            {
                title: ['', Validators.required],
                firstname: new FormControl(''),
                lastname: new FormControl(''),
                dob: ['', Validators.required],
                genderStatus: ['', Validators.required],
                gender: '',
                relationship: ['', Validators.required],
                preexdisease: '',
                insurerDobError: '',
                insurerDobValidError: '',
                sameasInsurer: false,
                type: '',
                ins_age: '',
                titleName:'',
                relationshipName:'',
                height:'',
                weight:''
            }
        );
    }

    // dob validation
    addEvent(event, i, type, formtype) {
        if (event.value != null) {
            let selectedDate = '';
            this.hdfcHealthProposerAge = '';
            let dob = '';
            let dob_days = '';
            let insurerAge;
            dob = this.datepipe.transform(event.value, 'y-MM-dd');
            dob_days = this.datepipe.transform(event.value, 'dd-MM-y');

            if (typeof event.value._i == 'string') {
                const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
                if (pattern.test(event.value._i) && event.value._i.length == 10) {
                    if (formtype == 'insurer') {
                        // this.ageValidationInsurer(i, type);
                        this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
                        this.ageValidationInsurer(i, type);
                        // this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
                    } else if (formtype == 'personal') {
                        this.personalDobError = '';
                    }
                } else {
                    if (formtype == 'insurer') {
                        // this.ageValidationInsurer(i, type);
                        this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('Enter Valid Date');
                        this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');

                    } else if (formtype == 'personal') {
                        this.personalDobError = 'Enter Valid Date';
                    }

                }
                selectedDate = event.value._i;
                if (selectedDate.length == 10) {
                    if (formtype == 'personal') {
                        this.personalDobError = '';
                        this.hdfcHealthProposerAge = this.ageCalculate(dob);
                        this.ageData(this.hdfcHealthProposerAge, formtype);
                    } else if (formtype == 'insurer') {
                        // this.ageValidationInsurer(i, type);
                        this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
                        if(i == 0){
                            let getPage = this.ageCalculate(dob);
                            this.ageData(getPage, formtype);
                        }
                        insurerAge = this.DobDaysCalculate(dob_days);
                        this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.patchValue(insurerAge);
                        this.ageValidationInsurer(i, type);
                        this.hdfcInsureArray['controls'].items['controls'][i]['controls'].dob.patchValue(dob);
                    }

                }

            } else if (typeof event.value._i == 'object') {
                if (dob.length == 10) {
                    if (formtype == 'personal') {
                        this.personalDobError = '';
                        this.hdfcHealthProposerAge = this.ageCalculate(dob);
                        this.ageData(this.hdfcHealthProposerAge, formtype);
                    } else if (formtype == 'insurer') {
                        this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
                        if(i == 0){
                            let getPage = this.ageCalculate(dob);
                            this.ageData(getPage, formtype);
                        }
                        insurerAge = this.DobDaysCalculate(dob_days);
                        this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.patchValue(insurerAge);
                        this.ageValidationInsurer(i, type);
                        this.hdfcInsureArray['controls'].items['controls'][i]['controls'].dob.patchValue(dob);

                        sessionStorage.hdfcHealthInsurerAge = insurerAge;

                    }
                }
            }

        }
    }

     ageValidationInsurer(i, type) {
        if (this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value < 6574 && type == 'Self') {
            this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Self age should be 18 and above ');
        } else if (this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value > 6573 && type == 'Self') {
            this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
            this.arr.push(this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value);
        }

        if (this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value < 6574 && type == 'Spouse') {
            this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Spouse age should be 18 and above');
        } else if (this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value > 6573 && type == 'Spouse') {
            this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
            this.arr.push(this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value);
        }
        let smallest = this.arr[0];
        for (let i = 1; i < this.arr.length; i++) {
            if (this.arr[i] < smallest) {
                smallest = this.arr[i];
            }
        }
     if(this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value > 90 && this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 9495 && type == 'Son')  {
             this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
         } else if(this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value < 91 && type == 'Son')  {
             this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 91 days to 25 years');
         } else if(this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value > 9495 && type == 'Son')  {
             this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 91 days to 25 years');
         }
         if(this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value > 90 && this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 9495 && type == 'Daughter')  {
             this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
         } else if(this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value < 91 && type == 'Daughter')  {
             this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 91 days to 25 years');
         } else if(this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value > 9495 && type == 'Daughter')  {
             this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 91 days to 25 years');
         }
        if (this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value < 13149 && type == 'Mother') {
            this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Mother age should be 36 and above');
        } else if (this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value >= 13149 && type == 'Mother') {
            this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        }
        if (this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value < 13149 && type == 'Father') {
            this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Father age should be 36 and above');
        } else if (this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value >= 13149 && type == 'Father') {
            this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        }
        if (this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 1 && type == 'Sister') {
            this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Sister age should be above 1');
        } else if (this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value > 1 && type == 'Sister') {
            this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        }
        if (this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 1 && type == 'Brother') {
            this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Brother age should be above 1');
        } else if (this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value > 1 && type == 'Brother') {
            this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        }
        if (this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value < 36 && type == ' Father In Law') {
            this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue(' Father In Law age should be 36 and above ');
        } else if (this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value >= 36 && type == ' Father In Law') {
            this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        }
        if (this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value < 36 && type == ' Mother In Law') {
            this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue(' Mother In Law age should be 36 and above ');
        } else if (this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value >= 36 && type == ' Mother In Law') {
            this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        }
   }
    // title
    changeTitle(index){
        this.hdfcInsureArray['controls'].items['controls'][index]['controls'].titleName.patchValue(this.hdfcInsureArray['controls'].items['controls'][index]['controls'].title.value);
    }
    relationshipchange(index){
        this.hdfcInsureArray['controls'].items['controls'][index]['controls'].relationshipName.patchValue(this.insuredHdfcRelationList[this.hdfcInsureArray['controls'].items['controls'][index]['controls'].relationship.value]);
    }
    // nomineeRelationship
    nomineeRelationshipChange(){
        this.nomineeDetails.controls['nomineeRelationshipName'].patchValue(this.nomineeHdfcRelationList[(this.nomineeDetails.controls['nomineeRelationship'].value)]);
    }
     ageData(age, type) {
        if (age && type == 'personal') {
            sessionStorage.hdfcHealthProposerAge = age;
        } else {
            if ( age > 45) {
                this.IsCustomerAcceptedPPCPED = true;
            } else {
                this.IsCustomerAcceptedPPCPED = false;
                //this.hdfcInsureArray['controls'].items['controls'][0]['controls']['accepted'].patchValue(false);
            }
        }
    }

    // age calculation
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

    DobDaysCalculate(dob) {
        let a = moment(dob, 'DD/MM/YYYY');
        let b = moment(new Date(), 'DD/MM/YYYY');
        let days = b.diff(a, 'days');
        return days;
    }
TierID
    // city lists
    selectedSate(event, type) {
        console.log(event, 'event...')
        console.log(type, 'type..')
      const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId(),
            'State': '',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0'
        };
        if (type == 'insurer') {
            data.State = event.state;
        } else {
            data.State = event.state;
        }
        this.proposalservice.getHdfcCityLists(data).subscribe(
            (successData) => {
                this.getCitySuccess(successData);
            },
            (error) => {
                this.getCityFailure(error);
            }
        );
    }
    selectedSatePl(){
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId(),
            'State': this.requestCustomerDetails.State,
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0'
        };
        this.proposalservice.getHdfcCityLists(data).subscribe(
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
            this.hdfcHealthCitys = successData.ResponseObject;
            sessionStorage.hdfcHealthCitys = JSON.stringify(this.hdfcHealthCitys);
        }
    }
    public getCityFailure(error) {}

    changeCity() {
        this.hdfcPersonal.controls['cityName'].patchValue(this.hdfcHealthCitys[this.hdfcPersonal.controls['city'].value]);
        console.log(this.hdfcPersonal.controls['cityName'].value, 'cityName');
        console.log(this.hdfcPersonal.controls['city'].value, 'cityId...');
    }
    changeState() {
        this.hdfcPersonal.controls['stateName'].patchValue(this.hdfcHealthStates[this.hdfcPersonal.controls['state'].value]);
        console.log(this.hdfcPersonal.controls['stateName'].value, 'stateName');
        console.log(this.hdfcPersonal.controls['state'].value, 'state...');
    }


    // state lists
    getStateList() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId(),
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0'
        }
        this.proposalservice.getHdfcStateLists(data).subscribe(
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
            this.hdfcHealthStates = successData.ResponseObject;
        }
    }
    public getStateFailure(error) {}

    // Title List
    titleLists() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId(),
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0'
        };
        this.proposalservice.getTitleLists(data).subscribe(
            (successData) => {
                this.titleListsSuccess(successData);
            },
            (error) => {
                this.titleListsFailure(error);
            }
        );
    }
    public titleListsSuccess(successData) {
        if (successData.IsSuccess) {
            this.titleList = successData.ResponseObject;
            for (let i = 0; i < this.titleList.length; i++) {
                this.titleList[i].last = 'last';
            }
        }
    }
    public titleListsFailure(error) {}

// RelationShip List
    RelationShipListHdfc() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId(),
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0'
        };
        this.proposalservice.hdfcRelationshipList(data).subscribe(
            (successData) => {
                this.relationShipSuccess(successData);
            },
            (error) => {
                this.relationShipFailure(error);
            }
        );
    }
    public relationShipSuccess(successData) {
        if (successData.IsSuccess) {
            this.insuredHdfcRelationList = successData.ResponseObject;
            console.log(this.insuredHdfcRelationList, 'this.insuredHdfcRelationList...///')
        }
    }
    public relationShipFailure(error) {}

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
            this.proposalservice.getHdfcPincodeLists(data).subscribe(
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
    public pincodeFailure(successData) {}

    // Nominee RelationShip List
    nomineeRelationShipListHdfc() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId(),
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0'
        };
        this.proposalservice.hdfcNomineeRelationshipList(data).subscribe(
            (successData) => {
                this.hdfcNomineeRelationshipSuccess(successData);
            },
            (error) => {
                this.hdfcNomineeRelationshipFailure(error);
            }
        );
    }
    public hdfcNomineeRelationshipSuccess(successData) {
        if (successData.IsSuccess) {
            this.nomineeHdfcRelationList = successData.ResponseObject;
        }
    }
    public hdfcNomineeRelationshipFailure(error) {}

    backAll(){
        this.topScroll();
        this.prevStep();
    }

    personalDetails(stepper: MatStepper, value) {
        sessionStorage.hdfcStep1 = '';
        sessionStorage.hdfcStep1 = JSON.stringify(value);
        this.hdfcpersonalValues = value;
        this.genderPerson = this.hdfcpersonalValues.gender;
        console.log(this.hdfcpersonalValues, 'this.hdfcpersonalValues.../////')
        console.log(this.genderPerson, 'gender...////')
        if (this.hdfcPersonal.valid) {
            if (sessionStorage.hdfcHealthProposerAge >= 18) {
                if (this.pincodeValid) {
                    stepper.next();
                    this.topScroll();
                    this.nextStep();
                    this.hdfcMobileTrue1 = false;
                } else {
                    this.toastr.error('Enter valid pincode');
                }
            } else {
                this.toastr.error('Proposer age should be 18 or above');
            }
        } else {}
    }

    // otp validate
    otpValidate(value) {
        this.mobileotpgenerate = value;
        const data = {
            'enquiry_id': this.getFamilyDetails.enquiry_id,
            'mobile': this.hdfcPersonal.controls['mobile'].value,
        };
        if (this.mobileotpgenerate.length == 10) {
            this.proposalservice.mobileotp(data).subscribe(
                (successData) => {
                    this.mobileotpSuccess(successData);
                },
                (error) => {
                    this.mobileotpFailure(error);
                }
            );
        }
    }
    otpValidatePL(value) {
        this.mobileotpgenerate = value;
        const data = {
            'enquiry_id': this.enquiryIdPl,
            'mobile': this.hdfcPersonal.controls['mobile'].value,
        };
        if (this.mobileotpgenerate.length == 10) {
            this.proposalservice.mobileotp(data).subscribe(
                (successData) => {
                    this.mobileotpSuccess(successData);
                },
                (error) => {
                    this.mobileotpFailure(error);
                }
            );
        }
    }
    public mobileotpSuccess(successData) {
        if (successData.IsSuccess == true) {
            this.toastr.success(successData.ResponseObject);
            this.otpvalidation = successData.ResponseObject;
        }
    }
    public mobileotpFailure(error) {}

// check otp
    checkotpValidate(value) {
        this.checkotp = value;
        const data = {
            'enquiry_id': this.getFamilyDetails.enquiry_id,
            'otp': this.hdfcPersonal.controls['otp'].value,
        };
        if (this.checkotp.length == 6) {
            this.proposalservice.checkotp(data).subscribe(
                (successData) => {
                    this.checkotpSuccess(successData);
                },
                (error) => {
                    this.checkotpFailure(error);
                }
            );
        }
    }
    checkotpValidatePL(value) {
        this.checkotp = value;
        const data = {
            'enquiry_id': this.enquiryIdPl,
            'otp': this.hdfcPersonal.controls['otp'].value,
        };
        if (this.checkotp.length == 6) {
            this.proposalservice.checkotp(data).subscribe(
                (successData) => {
                    this.checkotpSuccess(successData);
                },
                (error) => {
                    this.checkotpFailure(error);
                }
            );
        }
    }
    public checkotpSuccess(successData) {
        if (successData.IsSuccess == true) {
            this.checkotpvalidation = successData.ResponseObject;
        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }
    public checkotpFailure(error) {}

    // insured page
    InsureDetails(stepper: MatStepper, value) {
        sessionStorage.hdfcStep2 = '';
        sessionStorage.hdfcStep2 = JSON.stringify(value);
        this.insurerData = value;
        console.log(this.insurerData,'');
        for(let i=0; i<this.insurerData.items.length; i++ ){
            if(this.insurerData.items[i].genderStatus == 'Male'){
                this.insurerData.items[i].gender = 'M';
            } else if (this.insurerData.items[i].genderStatus == 'Female'){
                this.insurerData.items[i].gender = 'F';
            }
        }
        let checkValid = false;
        if (this.hdfcInsureArray.valid) {
                checkValid = true;
        } else {
            this.toastr.error('Please fill in all required fields');
        }
        if(checkValid) {
            this.IsCustomerAccepted = false;
            let validData = false;
            for (let i = 0; i < value.items.length; i++) {
                if (value.items[i].insurerDobError != '') {
                    validData = false;
                    break;
                } else if (value.items[i].insurerDobError == '') {
                    validData = true;
                }
            }
            if (validData) {
                stepper.next();
                this.topScroll();
                this.nextStep();
                this.hdfcMobileTrue1 = false;
                this.hdfcMobileTrue2 = false;
            } else {
                //  this.toastr.error('Insured age should be 18 or above');
            }
        } else {
            this.IsCustomerAccepted = true;
        }
    }
    // Nominee Details
    addNomineeDetails(stepper: MatStepper, value) {
        sessionStorage.hdfcHealthNomineeDetails = '';
        sessionStorage.hdfcHealthNomineeDetails = JSON.stringify(value);
        if (this.nomineeDetails.valid) {
            // this.createProposal(stepper);
            // this.changeCity();
            // this.changeState();
            this.suminsureddropdown(stepper);
        }
    }

// star-health-proposal Creation
    createProposal(stepper){
        for(let i=0; i < this.insurerData.items.length; i++) {
            this.insurerData.items[i].NomineeName = this.nomineeDetails.controls['nomineeName'].value;
            this.insurerData.items[i].NomineeRelationship = this.nomineeDetails.controls['nomineeRelationship'].value;
            this.insurerData.items[i].nomineeRelationshipName = this.nomineeDetails.controls['nomineeRelationshipName'].value;
        }
            const data = {
                'platform': 'web',
                'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
                'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
                'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
                'enquiry_id': this.getFamilyDetails.enquiry_id,
                'group_name': this.getFamilyDetails.name,
                'product_id': this.getHdfcHealthPremiumList.product_id,
                'plan_name': this.getHdfcHealthPremiumList.product_name,
                'sum_insured_amount': this.changeSuninsuredAmount != undefined ? this.changeSuninsuredAmount : this.getHdfcHealthPremiumList.suminsured_amount,
                'proposal_id': sessionStorage.hdfc_health_proposal_id == '' || sessionStorage.hdfc_health_proposal_id == undefined ? '' : sessionStorage.hdfc_health_proposal_id,
                'InsuranceDetails': {
                    'CustDetails': {
                        'Title': this.hdfcpersonalValues.title,
                        'ApplFirstName': this.hdfcpersonalValues.firstname,
                        'ApplLastName': this.hdfcpersonalValues.lastname,
                        'ApplDOB': this.datepipe.transform(this.hdfcpersonalValues.dob, 'y-MM-dd'),
                        'ApplGender': this.hdfcpersonalValues.gender,
                        'Address1': this.hdfcpersonalValues.address1,
                        'Address2': this.hdfcpersonalValues.address2,
                        'Address3': this.hdfcpersonalValues.address3,
                        'State': this.hdfcpersonalValues.state,
                        'City': this.hdfcpersonalValues.city,
                        'Pincode': this.hdfcpersonalValues.pincode,
                        'EmailId': this.hdfcpersonalValues.email,
                        'MobileNo': this.hdfcpersonalValues.mobile,
                        // 'IsCustomerAcceptedPPCPED': this.hdfcInsureArray['controls'].items['controls'][0]['controls']['accepted'].value ? '1' : '',
                        'IsCustomerAcceptedPPCPED' : '',
                        'IsProposerSameAsInsured': this.sameAsinsure ? 'Y' : 'N' ,
                        'UIDNo': this.hdfcpersonalValues.otp, //OTP Value
                        'PANCardNumber': this.hdfcpersonalValues.personalPan,
                    },
                    'PlanDetails': {
                        'suminsured': this.changeSuninsuredAmount != undefined ? this.changeSuninsuredAmount : this.getHdfcHealthPremiumList.suminsured_amount,
                        'product_id': this.getHdfcHealthPremiumList.product_id,
                        'TierID':this.getHdfcHealthPremiumList.tier_zone
                    },
                    'PaymentDetails': {
                        'PaymentMode': this.hdfcpersonalValues.paymentmode,
                    },
                    'Member': {
                        'InsuredDetails': this.insurerData.items
                    }
                }
            }
            this.settings.loadingSpinner = true;
            this.proposalservice.createHdfcHealthProposal(data).subscribe(
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
        if (successData.IsSuccess == true) {
            this.toastr.success('Proposal created successfully!!');
            this.summaryData = successData.ResponseObject;
            sessionStorage.summaryData = JSON.stringify(this.summaryData);
            this.personlData = this.hdfcPersonal.value;
            console.log(this.personlData, 'staesdulll.......')
            this.insuredFormData = this.insurerData.items;
            this.nomineeFromData = this.nomineeDetails.value;
            this.PaymentActionUrl = this.summaryData.PaymentActionUrl;
            console.log(this.PaymentActionUrl, 'this.PaymentActionUrl');

            this.ProposalNumber = this.summaryData.ProposalNumber;
            console.log(this.ProposalNumber, 'this.ProposalNumber');

            this.AdditionalInfo1 = this.summaryData.AdditionalInfo1;
            console.log(this.AdditionalInfo1, 'this.AdditionalInfo1');

            this.AdditionalInfo2 = this.summaryData.AdditionalInfo2;
            console.log(this.AdditionalInfo2, 'this.AdditionalInfo2');


            this.AdditionalInfo3 = this.summaryData.AdditionalInfo3;
            console.log(this.AdditionalInfo3, 'this.AdditionalInfo3');

            this.ProductCd = this.summaryData.ProductCd;
            console.log(this.ProductCd, 'this.ProductCd');

            this.productcode = this.summaryData.productcode;
            console.log(this.productcode, 'this.productcode');

            this.returnURL = this.summaryData.returnURL;
            this.basePremium = this.summaryData.basePremium;
            this.serviceTax = this.summaryData.serviceTax;
            this.totalPremium = this.summaryData.totalPremium;
            sessionStorage.personlData = JSON.stringify(this.personlData);
            sessionStorage.insuredFormData = JSON.stringify(this.insuredFormData);
            sessionStorage.nomineeFromData = JSON.stringify(this.nomineeFromData);
            sessionStorage.hdfc_health_proposal_id = successData.ResponseObject.ProposalId;
            this.fullName = this.personlData.firstname +' '+ this.personlData.lastname;
            this.totalAmount = parseFloat(this.summaryData.totalPremium);
            this.paymentmode = this.personlData.paymentmode;
            this.pos_status = this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4';
// this.suminsureddropdown(stepper);
            this.email = this.personlData.email;
            console.log(this.email, 'this.email');
            this.createdDate = new Date();
            stepper.next();
            this.nextStep();
            this.topScroll();
            this.hdfcMobileTrue2 = false;
            this.hdfcMobileTrue3 = false;
        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }
    public proposalFailure(error) {}
// sessionData
    sessionData() {
        if (sessionStorage.hdfcStep1 != '' && sessionStorage.hdfcStep1 != undefined) {
            this.hdfcStep1 = JSON.parse(sessionStorage.hdfcStep1);
            this.hdfcPersonal = this.fb.group({
                title: this.hdfcStep1.title,
                firstname: this.hdfcStep1.firstname,
                lastname: this.hdfcStep1.lastname,
                personalPan: this.hdfcStep1.personalPan,
                dob: new FormControl(new Date(this.hdfcStep1.dob)),
                gender: this.hdfcStep1.gender,
                address1: this.hdfcStep1.address1,
                address2: this.hdfcStep1.address2,
                address3: this.hdfcStep1.address3,
                pincode: this.hdfcStep1.pincode,
                state: this.hdfcStep1.state,
                city: this.hdfcStep1.city,
                email: this.hdfcStep1.email,
                stateName: this.hdfcStep1.stateName,
                cityName: this.hdfcStep1.cityName,
                mobile: '',
                paymentmode: this.hdfcStep1.paymentmode,
                otp: ''
            });

            if (sessionStorage.pincodeValid != '' && sessionStorage.pincodeValid != undefined) {
                this.pincodeValid =  sessionStorage.pincodeValid;
            }

        }
        if (sessionStorage.hdfcHealthCitys != '' && sessionStorage.hdfcHealthCitys != undefined) {
            this.hdfcHealthCitys = JSON.parse(sessionStorage.hdfcHealthCitys);

        }
        if (sessionStorage.hdfcStep2 != '' && sessionStorage.hdfcStep2 != undefined) {
            this.hdfcStep2 = JSON.parse(sessionStorage.hdfcStep2);
            if (this.hdfcStep2.items[0].dob != '') {
                let dob = this.datepipe.transform(this.hdfcStep2.items[0].dob, 'y-MM-dd');
                let getPage = this.ageCalculate(dob);
                this.ageData(getPage, 'insurer');
                // if (getPage > 45) {
                //     this.checkAccepted();
                // }
            }

            for (let i = 0; i < this.hdfcStep2.items.length; i++) {
                let setValue = false;
                if(this.hdfcStep2.items[i].type == 'Self') {
                    setValue = true;
                } else if(this.hdfcStep2.items[i].type == 'Spouse') {
                    setValue = true;
                } else if(this.hdfcStep2.items[i].type == 'Son') {
                    setValue = true;
                } else if(this.hdfcStep2.items[i].type == 'Daughter') {
                    setValue = true;
                }
                if(setValue) {
                    this.hdfcInsureArray['controls'].items['controls'][i]['controls'].title.patchValue(this.hdfcStep2.items[i].title);
                    this.hdfcInsureArray['controls'].items['controls'][i]['controls'].firstname.patchValue(this.hdfcStep2.items[i].firstname);
                    this.hdfcInsureArray['controls'].items['controls'][i]['controls'].lastname.patchValue(this.hdfcStep2.items[i].lastname);
                    this.hdfcInsureArray['controls'].items['controls'][i]['controls'].gender.patchValue(this.hdfcStep2.items[i].gender);
                    this.hdfcInsureArray['controls'].items['controls'][i]['controls'].genderStatus.patchValue(this.hdfcStep2.items[i].genderStatus);
                    this.hdfcInsureArray['controls'].items['controls'][i]['controls'].dob.patchValue(this.hdfcStep2.items[i].dob);
                    this.hdfcInsureArray['controls'].items['controls'][i]['controls'].relationship.patchValue(this.hdfcStep2.items[i].relationship);
                    this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.patchValue(this.hdfcStep2.items[i].ins_age);
                    this.hdfcInsureArray['controls'].items['controls'][i]['controls'].preexdisease.patchValue(this.hdfcStep2.items[i].preexdisease);
                    this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue(this.hdfcStep2.items[i].insurerDobError);
                    this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue(this.hdfcStep2.items[i].insurerDobValidError);
                    // this.hdfcInsureArray['controls'].items['controls'][i]['controls'].accepted.patchValue(this.hdfcStep2.items[i].accepted);
                    this.hdfcInsureArray['controls'].items['controls'][i]['controls'].sameasInsurer.patchValue(this.hdfcStep2.items[i].sameasInsurer);
                    this.hdfcInsureArray['controls'].items['controls'][i]['controls'].relationshipName.patchValue(this.hdfcStep2.items[i].relationshipName);
                }
            }
            if(this.hdfcStep2.items[0].accepted){
                this.IsCustomerAccepted = false;
            } else {
                this.IsCustomerAccepted = true;
            }

        }
        if (sessionStorage.hdfcHealthNomineeDetails != '' && sessionStorage.hdfcHealthNomineeDetails != undefined) {
            this.hdfcHealthNomineeDetails = JSON.parse(sessionStorage.hdfcHealthNomineeDetails);
            this.nomineeDetails = this.fb.group({
                nomineeName: this.hdfcHealthNomineeDetails.nomineeName,
                nomineeRelationship: this.hdfcHealthNomineeDetails.nomineeRelationship,
                nomineeRelationshipName: this.hdfcHealthNomineeDetails.nomineeRelationshipName
            });
        }
        if (sessionStorage.sameAsinsure != '' && sessionStorage.sameAsinsure != undefined) {
            this.sameAsinsure = sessionStorage.sameAsinsure;
            this.sameasInsurerDetails(this.sameAsinsure, 'notClear');
            // if(this.sameAsinsure){
            //     alert('in');
            //     this.sameasInsurerDetails(this.sameAsinsure, 'notClear');
            // } else {
            //     alert('outt');
            //     this.sameasInsurerDetails(this.sameAsinsure, 'notClear');
            // }
        }
        if (sessionStorage.hdfc_health_proposal_id != '' && sessionStorage.hdfc_health_proposal_id != undefined) {
            this.hdfc_health_proposal_id = sessionStorage.hdfc_health_proposal_id;
        }
    }
    payLater(){
        for(let i=0; i < this.insurerData.items.length; i++) {
            this.insurerData.items[i].NomineeName = this.nomineeDetails.controls['nomineeName'].value;
            this.insurerData.items[i].NomineeRelationship = this.nomineeDetails.controls['nomineeRelationship'].value;
            this.insurerData.items[i].nomineeRelationshipName = this.nomineeDetails.controls['nomineeRelationshipName'].value;
        }
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
            'enquiry_id': this.getFamilyDetails.enquiry_id,
            'group_name': this.getFamilyDetails.name,
            'product_id': this.getHdfcHealthPremiumList.product_id,
            'plan_name': this.getHdfcHealthPremiumList.product_name,
            'company_logo': this.getHdfcHealthPremiumList.company_logo,
            'PaymentActionUrl': this.summaryData.PaymentActionUrl,
            'ProposalNumber': this.summaryData.ProposalNumber,
            'AdditionalInfo1': this.summaryData.AdditionalInfo1,
            'AdditionalInfo2': this.summaryData.AdditionalInfo2,
            'AdditionalInfo3': this.summaryData.AdditionalInfo3,
            'ProductCd': this.summaryData.ProductCd,
            'productcode': this.summaryData.productcode,
            'returnURL': this.summaryData.returnURL,
            'basePremium': this.summaryData.basePremium,
            'serviceTax': this.summaryData.serviceTax,
            'totalPremium': this.summaryData.totalPremium,
            'sum_insured_amount': this.getHdfcHealthPremiumList.suminsured_amount,
            'proposal_id': sessionStorage.hdfc_health_proposal_id == '' || sessionStorage.hdfc_health_proposal_id == undefined ? '' : sessionStorage.hdfc_health_proposal_id,
            'InsuranceDetails': {
                'CustDetails': {
                    'Title': this.hdfcpersonalValues.title,
                    'ApplFirstName': this.hdfcpersonalValues.firstname,
                    'ApplLastName': this.hdfcpersonalValues.lastname,
                    'ApplDOB': this.datepipe.transform(this.hdfcpersonalValues.dob, 'y-MM-dd'),
                    'ApplGender': this.hdfcpersonalValues.gender,
                    'Address1': this.hdfcpersonalValues.address1,
                    'Address2': this.hdfcpersonalValues.address2,
                    'Address3': this.hdfcpersonalValues.address3,
                    'State': this.hdfcpersonalValues.state,
                    'stateName': this.hdfcPersonal.controls['stateName'].value,
                    'City': this.hdfcpersonalValues.city,
                    'cityName': this.hdfcPersonal.controls['cityName'].value,
                    'Pincode': this.hdfcpersonalValues.pincode,
                    'EmailId': this.hdfcpersonalValues.email,
                    'MobileNo': this.hdfcpersonalValues.mobile,
                    'PANCardNumber': this.hdfcpersonalValues.personalPan,
                    // 'IsCustomerAcceptedPPCPED': this.hdfcInsureArray['controls'].items['controls'][0]['controls']['accepted'].value ? '1' : '',
                    'IsCustomerAcceptedPPCPED' : '',
                    'IsProposerSameAsInsured': this.sameAsinsure ? 'Y' : 'N' ,
                    'UIDNo': this.hdfcpersonalValues.otp, //OTP Value
                },
                'PlanDetails': {
                    'suminsured': this.getHdfcHealthPremiumList.suminsured_amount,
                    'product_id': this.getHdfcHealthPremiumList.product_id,
                    'TierID':this.getHdfcHealthPremiumList.tier_zone

                },
                'PaymentDetails': {
                    'PaymentMode': this.hdfcpersonalValues.paymentmode,
                },
                'Member': {
                    'InsuredDetails': this.insurerData.items
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
            this.submitPayLater = false;
            this.getStateList();
            this.titleLists();
            this.RelationShipListHdfc();
            this.nomineeRelationShipListHdfc();
            this.requestDetails = successData.ResponseObject;
            console.log(this.requestDetails, 'this.requestDetails...')
            this.pos_status = this.requestDetails.role_id;
            console.log(this.pos_status, 'this.pos_status');
            this.stepperindex = 3;
            this.requestCustomerDetails = this.requestDetails.InsuranceDetails.CustDetails;
            this.requestInsuredDetails = this.requestDetails.InsuranceDetails.Member.InsuredDetails;
            this.sameAsInsValue = this.requestCustomerDetails.IsProposerSameAsInsured;
            this.hdfcInsureArray = this.fb.group({
                items: this.fb.array([])
            });
            for (let i = 0; i < this.requestInsuredDetails.length; i++) {
                this.items = this.hdfcInsureArray.get('items') as FormArray;
                this.items.push(this.initItemRows());
                this.hdfcInsureArray['controls'].items['controls'][i]['controls'].type.setValue(this.requestInsuredDetails[i].type);
                if (this.requestInsuredDetails[i].type == 'Son') {
                    this.hdfcInsureArray['controls'].items['controls'][i]['controls'].title.patchValue('Mr');
                    this.hdfcInsureArray['controls'].items['controls'][i]['controls'].genderStatus.patchValue('Male');
                } else if (this.requestInsuredDetails[i].type == 'Daughter') {
                    this.hdfcInsureArray['controls'].items['controls'][i]['controls'].title.patchValue('Ms');
                    this.hdfcInsureArray['controls'].items['controls'][i]['controls'].genderStatus.patchValue('Female');
                }
            }
            this.fullName = this.requestCustomerDetails.ApplFirstName +' '+ this.requestCustomerDetails.ApplLastName;
            this.totalAmount = parseFloat(this.requestDetails.sum_insured_amount);
            console.log(this.requestInsuredDetails, 'hgghjghjgjh');
            this.PaymentActionUrl = this.requestDetails.PaymentActionUrl;
            this.ProposalNumber = this.requestDetails.ProposalNumber;
            this.AdditionalInfo1 = this.requestDetails.AdditionalInfo1;
            this.AdditionalInfo2 = this.requestDetails.AdditionalInfo2;
            this.AdditionalInfo3 = this.requestDetails.AdditionalInfo3;
            this.ProductCd = this.requestDetails.ProductCd;
            this.productcode = this.requestDetails.productcode;
            this.returnURL = this.requestDetails.returnURL;
            this.paymentmode = this.requestDetails.InsuranceDetails.PaymentDetails.PaymentMode;
            this.email = this.requestCustomerDetails.EmailId;
            this.enquiryIdPl = this.requestDetails.enquiry_id;
            this.groupNamePl = this.requestDetails.group_name;
            this.productIdPl = this.requestDetails.product_id;
            this.planNamePl = this.requestDetails.plan_name;
            this.sumInsuredPl = this.requestDetails.sum_insured_amount;
            this.companyLogoPl = this.requestDetails.company_logo;
            // this.serviceTaxPl = this.requestDetails.serviceTax;
            // this.totalPremiumPl = this.requestDetails.totalPremium;
            this.proposalIdPl = this.requestDetails.proposal_id;
            this.tierIDPl = this.requestDetails.InsuranceDetails.PlanDetails.TierID;
            this.payLaterEdit();
            console.log(this.email, 'this.email');
            console.log(this.paymentmode, 'this.paymentmode');
        }
    }
    public getBackResFailure(successData) {}

    payLaterEdit() {
        this.hdfcPersonal.controls['title'].patchValue(this.requestCustomerDetails.Title);
        this.hdfcPersonal.controls['firstname'].patchValue(this.requestCustomerDetails.ApplFirstName);
        this.hdfcPersonal.controls['lastname'].patchValue(this.requestCustomerDetails.ApplLastName);
        this.hdfcPersonal.controls['gender'].patchValue(this.requestCustomerDetails.ApplGender);
        this.hdfcPersonal.controls['dob'].patchValue(this.requestCustomerDetails.ApplDOB);
        this.hdfcPersonal.controls['email'].patchValue(this.requestCustomerDetails.EmailId);
        this.hdfcPersonal.controls['personalPan'].patchValue(this.requestCustomerDetails.PANCardNumber);
        this.hdfcPersonal.controls['paymentmode'].patchValue(this.paymentmode);
        this.hdfcPersonal.controls['address1'].patchValue(this.requestCustomerDetails.Address1);
        this.hdfcPersonal.controls['address2'].patchValue(this.requestCustomerDetails.Address2);
        this.hdfcPersonal.controls['address3'].patchValue(this.requestCustomerDetails.Address3);
        this.hdfcPersonal.controls['pincode'].patchValue(this.requestCustomerDetails.Pincode);
        this.pincodevalidationHdfc(this.requestCustomerDetails.Pincode);
        this.hdfcPersonal.controls['state'].patchValue(this.requestCustomerDetails.State);
        this.selectedSatePl();
        this.hdfcPersonal.controls['city'].patchValue(this.requestCustomerDetails.City);
        for (let i = 0; i < this.requestInsuredDetails.length; i++) {
            console.log(this.sameAsInsValue, 'kmown valueeeeeee...........')
            console.log(this.requestInsuredDetails[i].gender, 'kmown valueeeeeee.. ogof grender.........')
            if(this.sameAsInsValue == 'Y') {
                this.sameAsinsure = true;
                // console.log()
            } else {
                this.sameAsinsure = false;
            }
            this.hdfcInsureArray['controls'].items['controls'][i]['controls'].title.patchValue(this.requestInsuredDetails[i].title);
            this.hdfcInsureArray['controls'].items['controls'][i]['controls'].firstname.patchValue(this.requestInsuredDetails[i].firstname);
            this.hdfcInsureArray['controls'].items['controls'][i]['controls'].lastname.patchValue(this.requestInsuredDetails[i].lastname);
            if(this.requestInsuredDetails[i].type == 'Son') {
                this.hdfcInsureArray['controls'].items['controls'][i]['controls'].genderStatus.patchValue(this.requestInsuredDetails[i].genderStatus);
            } else if (this.requestInsuredDetails[i].type == 'Daughter') {
                this.hdfcInsureArray['controls'].items['controls'][i]['controls'].genderStatus.patchValue(this.requestInsuredDetails[i].genderStatus);
            } else {
                this.hdfcInsureArray['controls'].items['controls'][i]['controls'].genderStatus.patchValue(this.requestInsuredDetails[i].gender);
            }
            this.hdfcInsureArray['controls'].items['controls'][i]['controls'].dob.patchValue(this.requestInsuredDetails[i].dob);
            this.hdfcInsureArray['controls'].items['controls'][i]['controls'].relationship.patchValue(this.requestInsuredDetails[i].relationship);
            this.hdfcInsureArray['controls'].items['controls'][i]['controls'].preexdisease.patchValue(this.requestInsuredDetails[i].preexdisease);
            this.hdfcInsureArray['controls'].items['controls'][i]['controls'].height.patchValue(this.requestInsuredDetails[i].height);
            this.hdfcInsureArray['controls'].items['controls'][i]['controls'].weight.patchValue(this.requestInsuredDetails[i].weight);
        }
        this.nomineeDetails.controls['nomineeName'].patchValue(this.requestInsuredDetails[0].NomineeName);
        this.nomineeDetails.controls['nomineeRelationship'].patchValue(this.requestInsuredDetails[0].NomineeRelationship);
    }

    createProposalPayLater() {
        console.log(this.sameAsinsure, 'trueOrFalse..')
        console.log(this.hdfcInsureArray.value.items, 'pppppp')
        this.nomineeRelationshipChange();
        for(let i=0; i < this.hdfcInsureArray.value.items.length; i++) {
            this.changeTitle(i);
            this.relationshipchange(i);
            this.hdfcInsureArray.value.items[i].NomineeName = this.nomineeDetails.controls['nomineeName'].value;
            this.hdfcInsureArray.value.items[i].NomineeRelationship = this.nomineeDetails.controls['nomineeRelationship'].value;
            this.hdfcInsureArray.value.items[i].nomineeRelationshipName = this.nomineeDetails.controls['nomineeRelationshipName'].value;
            if(this.hdfcInsureArray.value.items[i].genderStatus == 'M'){
                this.hdfcInsureArray.value.items[i].gender = 'M';
                this.hdfcInsureArray.value.items[i].genderStatus = 'Male';
            } else if (this.hdfcInsureArray.value.items[i].genderStatus == 'F'){
                this.hdfcInsureArray.value.items[i].gender = 'F';
                this.hdfcInsureArray.value.items[i].genderStatus = 'Female';
            }
        }
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
            'enquiry_id': this.enquiryIdPl,
            'group_name': this.groupNamePl,
            'product_id': this.productIdPl,
            'plan_name': this.planNamePl,
            'sum_insured_amount': this.changeSuninsuredAmount != undefined ? this.changeSuninsuredAmount : this.sumInsuredPl,
            'proposal_id': this.newProposalIdPl != undefined ? this.newProposalIdPl : this.proposalIdPl,
            'InsuranceDetails': {
                'CustDetails': {
                    'Title': this.hdfcPersonal.controls['title'].value,
                    'ApplFirstName': this.hdfcPersonal.controls['firstname'].value,
                    'ApplLastName': this.hdfcPersonal.controls['lastname'].value,
                    'ApplDOB': this.datepipe.transform(this.hdfcPersonal.controls['dob'].value, 'y-MM-dd'),
                    'ApplGender': this.hdfcPersonal.controls['gender'].value,
                    'Address1': this.hdfcPersonal.controls['address1'].value,
                    'Address2': this.hdfcPersonal.controls['address2'].value,
                    'Address3': this.hdfcPersonal.controls['address3'].value,
                    'State': this.hdfcPersonal.controls['state'].value,
                    'City': this.hdfcPersonal.controls['city'].value,
                    'Pincode': this.hdfcPersonal.controls['pincode'].value,
                    'EmailId': this.hdfcPersonal.controls['email'].value,
                    'MobileNo': this.hdfcPersonal.controls['mobile'].value,
                    'IsCustomerAcceptedPPCPED' : '',
                    'IsProposerSameAsInsured': this.sameAsinsure ? 'Y' : 'N' ,
                    'UIDNo': this.hdfcPersonal.controls['otp'].value, //OTP Value
                    'PANCardNumber': this.hdfcPersonal.controls['personalPan'].value,
                },
                'PlanDetails': {
                    'suminsured': this.changeSuninsuredAmount != undefined ? this.changeSuninsuredAmount : this.sumInsuredPl,
                    'product_id': this.productIdPl,
                    'TierID':this.tierIDPl
                },
                'PaymentDetails': {
                    'PaymentMode': this.paymentmode,
                },
                'Member': {
                    'InsuredDetails': this.hdfcInsureArray.value.items
                }
            }
        }
console.log(data, 'dataPayLater')
        this.proposalservice.createHdfcHealthProposal(data).subscribe(
            (successData) => {
                this.proposalSuccessPL(successData);
            },
            (error) => {
                this.proposalFailurePL(error);
            }
        );
    }
    public proposalSuccessPL(successData) {
        // this.settings.loadingSpinner = false;
        if (successData.IsSuccess == true) {
            this.toastr.success('Proposal created successfully!!');
            this.summaryDataPL = successData.ResponseObject;
            this.trycondi();
            this.proposerDataPl = this.hdfcPersonal.value;
            this.insuredDataPl = this.hdfcInsureArray.value.items;
            this.nomineeDataPl = this.nomineeDetails.value;
            console.log(this.nomineeDataPl, 'this.nomineeDataPl');
            console.log(this.proposerDataPl, 'this.proposerDataPl........////////////');
            console.log( this.insuredDataPl, 'this.insuredDataPl');
            this.paymentmodePl = this.proposerDataPl.paymentmode;
            this.fullNamePl = this.proposerDataPl.firstname + ' ' + this.proposerDataPl.lastname;
            this.emailPl = this.proposerDataPl.email;
            this.basePremiumPl = this.summaryDataPL.basePremium;
            this.serviceTaxPl = this.summaryDataPL.serviceTax;
            this.totalPremiumPl = this.summaryDataPL.totalPremium;
            this.newProposalIdPl = this.summaryDataPL.ProposalId;
            this.ProposalNumberPl = this.summaryDataPL.ProposalNumber;
            this.PaymentActionUrlPl = this.summaryDataPL.PaymentActionUrl;
            this.totalAmountPl = parseFloat(this.summaryDataPL.totalPremium);
            this.AdditionalInfo1Pl = this.summaryDataPL.AdditionalInfo1;
            this.AdditionalInfo2Pl = this.summaryDataPL.AdditionalInfo2;
            this.AdditionalInfo3Pl = this.summaryDataPL.AdditionalInfo3;
            this.ProductCdPl = this.summaryDataPL.ProductCd;
            this.productcodePl = this.summaryDataPL.productcode;

        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }
    public proposalFailurePL(error) {}

    trycondi() {
        this.submitPayLater = true;
    }

    backPayLtr() {
        this.submitPayLater = false;
    }

    showicon(){
        this.inputfieldshow =true;
    }

    suminsureddropdown(stepper) {
        if(this.getHdfcHealthPremiumList.product_name == 'my:health Suraksha - Silver Smart') {
            this.prodName = 'SilverSmart';
        } else if(this.getHdfcHealthPremiumList.product_name == 'my:health Suraksha - Gold Smart') {
            this.prodName = 'GoldSmart';
        } else if(this.getHdfcHealthPremiumList.product_name == 'my:health Suraksha - Platinum Smart') {
            this.prodName = 'PlatinumSmart';
        }
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'product_name': this.prodName
        }
        this.proposalservice.hdfcSumInsured(data).subscribe(
            (successData) => {
                this.hdfcSumInsuredSuccess(successData, stepper);
            },
            (error) => {
                this.hdfcSumInsuredFailure(error);
            }
        );
    }
    public hdfcSumInsuredSuccess(successData, stepper) {
        // this.settings.loadingSpinner = false;
        if (successData.IsSuccess == true) {
            // this.toastr.success('successfully!!');
            this.suminsuredamount = successData.ResponseObject;
            this.inputfieldshow = false;
            console.log(successData.ResponseObject)
            this.changeCity();
            this.changeState();
            this.createProposal(stepper);
            console.log(this.changeSuninsuredAmount, 'sumIns...')
        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }
    public hdfcSumInsuredFailure(error) {}

    suminsureddropdownPl() {
        console.log(this.planNamePl, 'ooooooooo')
        if(this.planNamePl == 'my:health Suraksha - Silver Smart') {
            this.prodName = 'SilverSmart';
        } else if(this.planNamePl == 'my:health Suraksha - Gold Smart') {
            this.prodName = 'GoldSmart';
        } else if(this.planNamePl == 'my:health Suraksha - Platinum Smart') {
            this.prodName = 'PlatinumSmart';
        }
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'product_name': this.prodName
        }
        console.log(data, 'llllllllllll')
        this.proposalservice.hdfcSumInsured(data).subscribe(
            (successData) => {
                this.hdfcSumInsuredSuccessPl(successData);
            },
            (error) => {
                this.hdfcSumInsuredFailurePl(error);
            }
        );
    }
    public hdfcSumInsuredSuccessPl(successData) {
        // this.settings.loadingSpinner = false;
        if (successData.IsSuccess == true) {
            // this.toastr.success('successfully!!');
            this.suminsuredamountPl = successData.ResponseObject;
            this.inputfieldshow = false;
            console.log(successData.ResponseObject)
            this.createProposalPayLater();
            console.log(this.changeSuninsuredAmount, 'sumIns...')
        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }
    public hdfcSumInsuredFailurePl(error) {}

}




