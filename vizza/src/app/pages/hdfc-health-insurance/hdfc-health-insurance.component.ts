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
    public insurerDtails: any;
    public proposalDtails: any;
    public nomineeDtails: any;
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
    public hdfcMobileTrue0: boolean;
    public hdfcMobileTrue1: boolean;
    public hdfcMobileTrue2: boolean;
    public hdfcMobileTrue3: boolean;


    constructor(public proposalservice: HealthService, public validation: ValidationService, public route: ActivatedRoute, public datepipe: DatePipe, private toastr: ToastrService, public appSettings: AppSettings, public dialog: MatDialog,public router: Router,
                public config: ConfigurationService, public fb: FormBuilder, public auth: AuthService, public http: HttpClient, @Inject(LOCALE_ID) private locale: string) {

        this.stepperindex = 0;
        this.route.params.forEach((params) => {
            if(params.stepper == true || params.stepper == 'true') {
                this.stepperindex = 3;
                if (sessionStorage.summaryData != '' && sessionStorage.summaryData != undefined) {
                    this.summaryData = JSON.parse(sessionStorage.summaryData);
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
        this.pincodeValid = true;
        this.IsCustomerAccepted = false;
        this.arr = [];
        this.webhost = this.config.getimgUrl();
        this.hdfc_health_proposal_id = 0;
        this.step = 0;
        this.hdfcMobileTrue0 = false;
        this.hdfcMobileTrue1 = true;
        this.hdfcMobileTrue2 = true;
        this.hdfcMobileTrue3 = true;

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
            city: ['', Validators.required],
            state: ['', Validators.required],
            email: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
            mobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
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
            console.log(this.payLaterr, 'this.payLaterrolll');
        } else {
            this.sameAsinsure = false;
            this.getHdfcHealthPremiumList = JSON.parse(sessionStorage.buyProductdetails);
            this.getFamilyDetails = JSON.parse(sessionStorage.changedTabDetails);
            this.insurePersons = this.getFamilyDetails.family_members;
            this.hdfcInsureArray = this.fb.group({
                items: this.fb.array([])
            });
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
            // for (let i = 0; i < this.items.length; i++) {
            //
            //     if(this.hdfcInsureArray['controls'].items['controls'][i]['controls'].type.value == 'Son') {
            //         this.hdfcInsureArray['controls'].items['controls'][i]['controls'].title.patchValue('Mr');
            //         this.hdfcInsureArray['controls'].items['controls'][i]['controls'].gender.patchValue('Male');
            //     } else if(this.hdfcInsureArray['controls'].items['controls'][i]['controls'].type.value == 'Daughter') {
            //         this.hdfcInsureArray['controls'].items['controls'][i]['controls'].title.patchValue('Ms');
            //         this.hdfcInsureArray['controls'].items['controls'][i]['controls'].gender.patchValue('Female');
            //     }
            // }


            this.titleLists();
            this.getStateList();
            this.RelationShipListHdfc();
            this.nomineeRelationShipListHdfc();
            // this.hdfcInsureArray['controls'].items['controls'][0]['controls'].sameasInsurer.patchValue(true);
            this.sessionData();

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

    sameasInsurerDetails(event, clearType) {
        if (this.sameAsinsure == 'true' || this.sameAsinsure == true) {
            this.hdfcInsureArray['controls'].items['controls'][0]['controls'].sameasInsurer.patchValue(true);
            this.hdfcInsureArray['controls'].items['controls'][0]['controls'].title.patchValue(this.hdfcPersonal.controls['title'].value);
            this.hdfcInsureArray['controls'].items['controls'][0]['controls'].firstname.patchValue(this.hdfcPersonal.controls['firstname'].value);
            this.hdfcInsureArray['controls'].items['controls'][0]['controls'].lastname.patchValue(this.hdfcPersonal.controls['lastname'].value);
            this.hdfcInsureArray['controls'].items['controls'][0]['controls'].genderStatus.patchValue(this.hdfcPersonal.controls['gender'].value == 'M' ? 'Male' : 'Female');
            this.hdfcInsureArray['controls'].items['controls'][0]['controls'].dob.patchValue(this.datepipe.transform(this.hdfcPersonal.controls['dob'].value, 'y-MM-dd'));
            this.hdfcInsureArray['controls'].items['controls'][0]['controls'].relationship.patchValue('I');
            let dobAge = this.ageCalculate(this.datepipe.transform(this.hdfcPersonal.controls['dob'].value, 'y-MM-dd'));
            console.log(dobAge,'dobAge');
            if (dobAge > 45) {
                this.IsCustomerAcceptedPPCPED = true;
            } else {
                this.IsCustomerAcceptedPPCPED = false;
            }

            this.hdfcInsureArray['controls'].items['controls'][0]['controls'].relationshipName.patchValue(this.insuredHdfcRelationList[this.hdfcInsureArray['controls'].items['controls'][0]['controls'].relationship.value]);

        } else if(this.sameAsinsure == 'false' || this.sameAsinsure == false) {
            this.sameAsinsure = false;
            if(clearType == 'clear') {
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
    // candeactivate(){
    //     return sessionStorage.hdfc_health_proposal_id;
    // }
    // insure form group
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
                accepted: '',
                titleName:'',
                relationshipName:'',
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
                        this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
                    } else if (formtype == 'personal') {
                        this.personalDobError = '';
                    }
                } else {
                    if (formtype == 'insurer') {
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
                        sessionStorage.hdfcHealthInsurerAge = insurerAge;
                        this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.patchValue(insurerAge);
                        this.ageValidationInsurer(i, type);
                        this.hdfcInsureArray['controls'].items['controls'][i]['controls'].dob.patchValue(dob);
                    }
                }
            }

        }
    }

    // ageValidationInsurer(i, type) {
    //     if(this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value < 18) {
    //         this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Insured age should be 18 or above');
    //     } else {
    //         this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
    //     }
    // }


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
        //  if(this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value >= 91 && this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 9131 && type == 'Son')  {
        //
        //      // if (this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value < 91 && this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value > 9131 && type == 'Son') {
        //     this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Son age should be above 91 days');
        // } else if (this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value > 91 && this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value < 9131 && type == 'Son') {
        //     this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        // }
        // if (this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value <  91 && this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value >  9131 && type == 'Daughter') {
        //     this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Daughter age should be above 91 days');
        // } else if (this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value > 91 && this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value  < 9131 && type == 'Daughter') {
        //     this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        // }


         if(this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value > 90 && this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 8034 && type == 'Son')  {
             this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
         } else if(this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value < 91 && type == 'Son')  {
             this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 91 days to 21 years');
         } else if(this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value > 8034 && type == 'Son')  {
             this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 91 days to 21 years');
         }

         if(this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value > 90 && this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 8034 && type == 'Daughter')  {
             this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
         } else if(this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value < 91 && type == 'Daughter')  {
             this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 91 days to 21 years');
         } else if(this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value > 8034 && type == 'Daughter')  {
             this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 91 days to 21 years');
         }


        if (this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 36 && type == 'Mother') {
            this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Mother age should be above 36');
        } else if (this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value > 36 && type == 'Mother') {
            this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        }
        if (this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 36 && type == 'Father') {
            this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Father age should be above 36');
        } else if (this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value > 36 && type == 'Father') {
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
        if (this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 36 && type == ' Father In Law') {
            this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue(' Father In Law age should be above 36');
        } else if (this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value > 36 && type == ' Father In Law') {
            this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        }
        if (this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 36 && type == ' Mother In Law') {
            this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue(' Mother In Law age should be above 36');
        } else if (this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value > 36 && type == ' Mother In Law') {
            this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
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
            if (age > 45) {
                this.IsCustomerAcceptedPPCPED = true;
            } else {
                this.IsCustomerAcceptedPPCPED = false;
                //this.hdfcInsureArray['controls'].items['controls'][0]['controls']['accepted'].patchValue(false);
            }
        }
    }

    checkAccepted() {
        console.log(this.hdfcInsureArray['controls'].items['controls'][0]['controls']['accepted'].value, 'ss');
         if (this.hdfcInsureArray['controls'].items['controls'][0]['controls']['accepted'].value) {
             // this.IsCustomerAcceptedPPCPED = true;
            this.IsCustomerAccepted = false;
            //   this.hdfcPersonal.controls['accepted'].patchValue(true);
        } else {
            this.IsCustomerAccepted = true;
            // this.IsCustomerAcceptedPPCPED = false;
            //  this.hdfcPersonal.controls['accepted'].patchValue(false);

        }

    }

    // age calculation
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

    DobDaysCalculate(dob) {
        // let mdate = dob.toString();
        // let yearThen = parseInt(mdate.substring(8, 10), 10);
        // let monthThen = parseInt(mdate.substring(5, 7), 10);
        // let dayThen = parseInt(mdate.substring(0, 4), 10);
        // let todays = new Date();
        // let birthday = new Date(dayThen, monthThen - 1, yearThen);
        // let differenceInMilisecond = todays.valueOf() - birthday.valueOf();
        // let Bob_days = Math.ceil(differenceInMilisecond / (1000 * 60 * 60 * 24));
        // return Bob_days;
        let a = moment(dob, 'DD/MM/YYYY');
        let b = moment(new Date(), 'DD/MM/YYYY');
        let days = b.diff(a, 'days');
        return days;

    }

    // city lists
    selectedSate(event, type, i) {
        console.log(this.hdfcPersonal.controls['state'].value,'0000');
        console.log(this.hdfcHealthStates[this.hdfcPersonal.controls['state'].value], 'lll');
        this.hdfcPersonal.controls['stateName'].patchValue(this.hdfcHealthStates[this.hdfcPersonal.controls['state'].value]);

        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId(),
            'State': '',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0'
        }
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

    public getCitySuccess(successData) {
        if (successData.IsSuccess) {
            this.hdfcHealthCitys = successData.ResponseObject;
            sessionStorage.hdfcHealthCitys = JSON.stringify(this.hdfcHealthCitys);

        }
    }

    public getCityFailure(error) {
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

    public getStateFailure(error) {
    }

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

    public titleListsFailure(error) {
    }

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

        }
    }

    public relationShipFailure(error) {
    }

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
            // this.hdfcPersonal.controls['pincode'].setValue('');
        }
        sessionStorage.pincodeValid = this.pincodeValid;
    }
    public pincodeFailure(successData) {
    }

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

    public hdfcNomineeRelationshipFailure(error) {
    }

    backAll(){
        this.topScroll();
        this.prevStep();
    }

    personalDetails(stepper: MatStepper, value) {
        sessionStorage.hdfcStep1 = '';
        sessionStorage.hdfcStep1 = JSON.stringify(value);
        this.hdfcpersonalValues = value;
        if (this.hdfcPersonal.valid) {
            if (sessionStorage.hdfcHealthProposerAge >= 18) {
                if (this.pincodeValid) {
                    // this.sameasInsurerDetails('event', '1');
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

        } else {

        }
    }

    // otp validate
    otpValidate(value) {
        this.mobileotpgenerate = value;

        const data = {
            'enquiry_id': this.getFamilyDetails.enquiry_id,
            'mobile': this.hdfcPersonal.controls['mobile'].value,
        }
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


    public mobileotpFailure(error) {
    }
// check otp
    checkotpValidate(value) {
        this.checkotp = value;
        const data = {
            'enquiry_id': this.getFamilyDetails.enquiry_id,
            'otp': this.hdfcPersonal.controls['otp'].value,
        }
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


    public checkotpFailure(error) {
    }



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
            if (!this.IsCustomerAcceptedPPCPED) {
                checkValid = true;
            } else {
                checkValid = false;
                if(this.hdfcInsureArray['controls'].items['controls'][0]['controls']['accepted'].value) {
                    checkValid = true;
                }
            }
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
            this.createProposal(stepper);
        }
    }
// star-health-proposal Creation
    createProposal(stepper){
        for(let i=0; i < this.insurerData.items.length; i++) {
            this.insurerData.items[i].NomineeName = this.nomineeDetails.controls['nomineeName'].value;
            this.insurerData.items[i].NomineeRelationship = this.nomineeDetails.controls['nomineeRelationship'].value;
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
                        'City': this.hdfcpersonalValues.city,
                        'Pincode': this.hdfcpersonalValues.pincode,
                        'EmailId': this.hdfcpersonalValues.email,
                        'MobileNo': this.hdfcpersonalValues.mobile,
                        'IsCustomerAcceptedPPCPED': this.hdfcInsureArray['controls'].items['controls'][0]['controls']['accepted'].value ? '1' : '',
                        'IsProposerSameAsInsured': this.sameAsinsure ? 'Y' : 'N' ,
                        'UIDNo': this.hdfcpersonalValues.otp //OTP Value
                    },
                    'PlanDetails': {
                        'suminsured': this.getHdfcHealthPremiumList.suminsured_amount,
                        'product_id': this.getHdfcHealthPremiumList.product_id
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
            this.insuredFormData = this.insurerData.items;
            this.nomineeFromData = this.nomineeDetails.value;
            this.PaymentActionUrl = this.summaryData.PaymentActionUrl;
            this.ProposalNumber = this.summaryData.ProposalNumber;
            this.AdditionalInfo1 = this.summaryData.AdditionalInfo1;
            this.AdditionalInfo2 = this.summaryData.AdditionalInfo2;
            this.AdditionalInfo3 = this.summaryData.AdditionalInfo3;
            this.ProductCd = this.summaryData.ProductCd;
            this.productcode = this.summaryData.productcode;
            this.returnURL = this.summaryData.returnURL;
            sessionStorage.personlData = JSON.stringify(this.personlData);
            sessionStorage.insuredFormData = JSON.stringify(this.insuredFormData);
            sessionStorage.nomineeFromData = JSON.stringify(this.nomineeFromData);
            sessionStorage.hdfc_health_proposal_id = successData.ResponseObject.ProposalId;
            this.fullName = this.personlData.firstname +' '+ this.personlData.lastname;
            this.totalAmount = parseFloat(this.summaryData.totalPremium);
            this.paymentmode = this.personlData.paymentmode;
            this.email = this.personlData.email;
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
    public proposalFailure(error) {

    }
// sessionData
    sessionData() {
        if (sessionStorage.hdfcStep1 != '' && sessionStorage.hdfcStep1 != undefined) {
            this.hdfcStep1 = JSON.parse(sessionStorage.hdfcStep1);
            this.hdfcPersonal = this.fb.group({
                title: this.hdfcStep1.title,
                firstname: this.hdfcStep1.firstname,
                lastname: this.hdfcStep1.lastname,
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
                    this.hdfcInsureArray['controls'].items['controls'][i]['controls'].accepted.patchValue(this.hdfcStep2.items[i].accepted);
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
            'PaymentActionUrl': this.summaryData.PaymentActionUrl,
            'ProposalNumber': this.summaryData.ProposalNumber,
            'AdditionalInfo1': this.summaryData.AdditionalInfo1,
            'AdditionalInfo2': this.summaryData.AdditionalInfo2,
            'AdditionalInfo3': this.summaryData.AdditionalInfo3,
            'ProductCd': this.summaryData.ProductCd,
            'productcode': this.summaryData.productcode,
            'returnURL': this.summaryData.returnURL,
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
                    'City': this.hdfcpersonalValues.city,
                    'Pincode': this.hdfcpersonalValues.pincode,
                    'EmailId': this.hdfcpersonalValues.email,
                    'MobileNo': this.hdfcpersonalValues.mobile,
                    'IsCustomerAcceptedPPCPED': this.hdfcInsureArray['controls'].items['controls'][0]['controls']['accepted'].value ? '1' : '',
                    'IsProposerSameAsInsured': this.sameAsinsure ? 'Y' : 'N' ,
                    'UIDNo': this.hdfcpersonalValues.otp //OTP Value
                },
                'PlanDetails': {
                    'suminsured': this.getHdfcHealthPremiumList.suminsured_amount,
                    'product_id': this.getHdfcHealthPremiumList.product_id
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
            this.requestDetails = successData.ResponseObject;
            this.pos_status = this.requestDetails.pos_status;
            this.stepperindex = 3;
            this.requestCustomerDetails = this.requestDetails.InsuranceDetails.CustDetails;
            this.requestInsuredDetails = this.requestDetails.InsuranceDetails.Member.InsuredDetails;
            this.fullName = this.requestDetails.ApplFirstName +' '+ this.requestDetails.ApplLastName;
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
            this.paymentmode = this.requestDetails.paymentmode;
            this.email = this.requestDetails.email;
        } else {
        }
    }
    public getBackResFailure(successData) {
    }

}




