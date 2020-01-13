import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {TravelService} from '../../shared/services/travel.service';
import {HealthService} from '../../shared/services/health.service';
import {DatePipe} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {AppSettings} from '../../app.settings';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDialog, MatStepper} from '@angular/material';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {CommonService} from '../../shared/services/common.service';
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
    selector: 'app-travel-reliagre-proposal',
    templateUrl: './travel-religare-proposal.component.html',
    styleUrls: ['./travel-religare-proposal.component.scss'],
    providers: [

        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
})
export class ReliagretravelproposalComponent implements OnInit {
    public religarePersonal: FormGroup;
    public insureReligareArray: FormGroup;
    public nomineeDetails: FormGroup;
    public today: any;
    public personalDobError: any;
    public religareTravelproposerAge: any;
    public pin: any;
    public title: any;
    public personalTravelCitys: any;
    public responseReligareTravel: any;
    public personalReligareTravelData: any;
    public AcceptDeclaration: any;
    public getTravelPremiumList: any;
    public insureReligarePerson: any;
    public items: any;
    public step: any;
    public insurerData: any;
    public getProposerDetails: any;
    public religareTravel2: any;
    public lastStepper: any;
    public back: any;
    public getReligareTravelNomineeData: any;
    public acceptSummaryDeclaration: boolean;

    public settings: any;
    public insuretravelRelationList: any;
    public religareTravelQuestionsList: any;
    public partyQuestionDOList: any;
    public index: any;
    public iPersonalCitys: any;
    public response: any;
    public personalCitys: any;
    public residenceCitys: any;
    public tripStatus: any;
    public enquiryId: any;
    public stepback: any;
    public summaryData: any;
    public proposalId: any;
    public totalReligareData: any;
    public proposerInsureData: any;
    public getAge: any;
    public arr: any;
    public medicalStatus: any;
    public rPersonalCitys: any;
    public responseres: any;
    public webhost: any;
    public productid: any;
    public getallTravelPremiumList: any;
    public questions_list: any;
    public questionsListTravel: any;
    public inputReadonly: boolean;
    public studentdetails: boolean;
    public isDisable: boolean;
    public religare_Travel_proposal_id: any;
    public sameinsure: any;
    public allLists: any;
    public addon: any;
    public passportany: any;
    public sameRelationship: any;
    public insurer: any;
    public getEnquiryDetails: any;
    public nomineeFormData: any;
    public currentStep: any;
    public setAddons: any;
    public sponserAge: any;
    public sponserDobError: any;
    public placeOfVisit: any;
    public RiskData :any;
    public diseaseFieldView :any;
    public sponserRelationList :any;
    public getEndDate :any;
    public purposeOfVisit :any;
    public religareTravelMobileTrue0: boolean;
    public religareTravelMobileTrue1: boolean;
    public religareTravelMobileTrue2: boolean;
    public religareTravelMobileTrue3: boolean;
    public religareTravelMobileTrue4: boolean;



    constructor(public travelservice: TravelService,public validation: ValidationService, public proposalservice: HealthService, public datepipe: DatePipe, private toastr: ToastrService, public appSettings: AppSettings, public dialog: MatDialog,public route: ActivatedRoute,
                public config: ConfigurationService, public common: CommonService, public fb: FormBuilder, public auth: AuthService, public http: HttpClient, @Inject(LOCALE_ID) private locale: string) {
        this.settings = this.appSettings.settings;
        this.settings.HomeSidenavUserBlock = false;
        this.settings.sidenavIsOpened = false;
        this.settings.sidenavIsPinned = false;
        let stepperindex = 0;
        this.route.params.forEach((params) => {
            if(params.stepper == true || params.stepper == 'true') {
                stepperindex = 4;
                if (sessionStorage.summaryData != '' && sessionStorage.summaryData != undefined) {
                    this.summaryData = JSON.parse(sessionStorage.summaryData);
                    this.proposalId = this.summaryData.proposal_id;
                    sessionStorage.religare_Travel_proposal_id = this.proposalId;
                    this.proposerInsureData = JSON.parse(sessionStorage.proposerInsureData);
                    this.nomineeFormData = JSON.parse(sessionStorage.nomineeFormData);
                }
            }
        });
        this.currentStep = stepperindex;
        let today = new Date();
        this.today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        this.arr = [];
        this.step = 0;
        this.religareTravelMobileTrue0 = false;
        this.religareTravelMobileTrue1 = true;
        this.religareTravelMobileTrue2 = true;
        this.religareTravelMobileTrue3 = true;
        this.religareTravelMobileTrue4 = true;
        this.setAddons = [];
        this.sameinsure = false;
        this.studentdetails = false;
        this.inputReadonly = false;
        this.isDisable = false;
        this.acceptSummaryDeclaration = false;
        this.webhost = this.config.getimgUrl();
        this.religare_Travel_proposal_id ='0';
        this.religarePersonal = this.fb.group({
            title: ['', Validators.required],
            firstname: new FormControl(''),
            lastname: new FormControl(''),
            gender: ['', Validators.compose([Validators.required])],
            dob: ['', Validators.compose([Validators.required])],
            passport: '',
            address1: ['', Validators.required],
            address2: '',
            pincode: ['', Validators.required],
            city: ['', Validators.required],
            cityName: '',
            state: ['', Validators.required],
            raddress1: ['', Validators.required],
            raddress2: '',
            pannumber: '',
            adharnumber: '',
            phone: ['', Validators.compose([Validators.pattern('[6789][0-9]{9}')])],
            sameAsProposer: false,
            rpincode: ['', Validators.required],
            rcity: ['', Validators.required],
            rcityName: '',
            rstate: ['', Validators.required],
            email: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
            mobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
            rolecd: 'PROPOSER',
            sponserdob: '',
            sponsername: '',
            universityname: '',
            universityaddress: '',
            guidetitle: '',
            guidefirstname: '',
            guidelastname: '',
            guideAddress: '',
            coursedetails: '',
            studentRelationShip: '',
            addon: '',
            studentRelationShipName: '',
            relationshipName: '',
            startDate: '',
            betweenMonth: '',
            endDate: '',
            endDateFormat: '',
            addonForm: this.fb.array([]),
            // checked: '',


        });
        this.nomineeDetails = this.fb.group({
            'religareTravelNomineeName': '',
            'religareTravelRelationship': '',
            'religareNomineeRelationshipName': ''

        });
        let sDate = this.datepipe.transform(sessionStorage.startDate, 'dd/MM/yyyy');
        this.religarePersonal.controls['startDate'].patchValue(sDate);
    }

    ngOnInit() {
        this.getTravelPremiumList = JSON.parse(sessionStorage.travelPremiumList);
        this.purposeOfVisit = sessionStorage.travelType;
        let enqList = JSON.parse(sessionStorage.enquiryDetailsTravel);
        this.getEnquiryDetails = enqList[0];
        if(this.getEnquiryDetails.travel_user_type == 'student'){
            this.studentdetails = true;
        } else {
            this.studentdetails = false;

        }
        this.insureReligarePerson =   this.getEnquiryDetails.family_members;
        console.log(this.insureReligarePerson, 'this.insureReligarePerson');
        this.insureReligareArray = this.fb.group({
            items: this.fb.array([])
        });

        for (let i = 0; i < this.insureReligarePerson.length; i++) {
            this.items = this.insureReligareArray.get('items') as FormArray;
            this.items.push(this.initItemRows());
            this.insureReligareArray['controls'].items['controls'][i]['controls'].type.patchValue(this.insureReligarePerson[i].type);
        }
        this.RelationShipListTravel();
        this.sponserRelationship();
        if (sessionStorage.ReligareTravelDetails3 == '' || sessionStorage.ReligareTravelDetails3 == undefined) {
            this.religareTravelQuestions();
        }
        // if (sessionStorage.setAddons == '' || sessionStorage.setAddons == undefined) {
        // }
        this.sessionData();
        if (sessionStorage.travelPlan != '' && sessionStorage.travelPlan != undefined) {
            this.placeOfVisit = JSON.parse(sessionStorage.travelPlan);
        }

    }

    setStep(index: number) {
        this.step = index;
    }
    prevStep() {
        this.step--;
    }
    nextStep() {
        this.step++;
    }
    backAll() {
        this.topScroll();
        this.prevStep();
    }
    passportval(i)
    {
        console.log(this.insureReligareArray['controls'].items['controls'][i]['controls'].passports.value,'5678')
        if( this.insureReligareArray['controls'].items['controls'][i]['controls'].passports.value != ''){
            this.passportany = false;
            this.passportany = '';
        }
        else{
            this.passportany = true;
            this.passportany = 'Pass Port is required'
        }

    }
    // PROPOSER PAGE
    // title change function
    changeGender() {
        if (this.religarePersonal.controls['title'].value == 'MR') {
            this.religarePersonal.controls['gender'].patchValue('Male');
        } else {
            this.religarePersonal.controls['gender'].patchValue('Female');
        }
    }
    // dob validation
    addEvent(event, type) {
        if (event.value != null) {
            let selectedDate = '';
            this.religareTravelproposerAge = '';
            let dob = '';
            if (typeof event.value._i == 'string') {
                const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
                if(type == 'personal') {
                    if (pattern.test(event.value._i) && event.value._i.length == 10) {
                        this.personalDobError = '';
                    } else {
                        this.personalDobError = 'Enter Valid Date';
                    }
                    selectedDate = event.value._i;
                    dob = this.datepipe.transform(event.value, 'y-MM-dd');
                    if (selectedDate.length == 10) {
                        this.religareTravelproposerAge = this.ageCalculate(dob);
                    }

                } else {
                    if (pattern.test(event.value._i) && event.value._i.length == 10) {
                        this.sponserDobError = '';
                    } else {
                        this.sponserDobError = 'Enter Valid Date';
                    }
                    selectedDate = event.value._i;
                    dob = this.datepipe.transform(event.value, 'y-MM-dd');
                    if (selectedDate.length == 10) {
                        this.sponserAge = this.ageCalculate(dob);
                    }
                }

            } else if (typeof event.value._i == 'object') {
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                if (dob.length == 10) {
                    if(type == 'personal') {
                        this.personalDobError = '';
                        this.religareTravelproposerAge = this.ageCalculate(dob);

                    } else {
                        this.sponserDobError = '';
                        this.sponserAge = this.ageCalculate(dob);
                    }
                }
            }
            if(type == 'personal') {
                sessionStorage.proposerAgeReligareTravel = this.religareTravelproposerAge;
            } else {
                sessionStorage.sponserAge = this.sponserAge;
            }
        }
    }
    selectMonths(){
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
            "trip_start_on": this.datepipe.transform(sessionStorage.startDate, 'y-MM-dd'),
            "month": this.religarePersonal.controls['betweenMonth'].value
        }
        this.travelservice.travelMonthDuration(data).subscribe(
            (successData) => {
                this.travelMonthDurationSuccess(successData);
            },
            (error) => {
                this.travelMonthDurationFailure(error);
            }
        );
    }
    public travelMonthDurationSuccess(successData) {
        if (successData.IsSuccess) {
            this.religarePersonal.controls['endDate'].patchValue(this.datepipe.transform(successData.ResponseObject.end_date , 'dd/MM/yyyy'));
            this.religarePersonal.controls['endDateFormat'].patchValue(successData.ResponseObject.end_date);
        }
    }

    public travelMonthDurationFailure(error) {
    }

    // RelationShip List
    RelationShipListTravel() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
            "type": "self"
        };
        this.travelservice.religareTravelRelationshipList(data).subscribe(
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
            this.insuretravelRelationList = successData.ResponseObject;

        }
    }

    public relationShipFailure(error) {
    }

    sponserRelationship() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
            "type": "sponser"
        };
        this.travelservice.religareTravelRelationshipList(data).subscribe(
            (successData) => {
                this.sponserRelationShipSuccess(successData);
            },
            (error) => {
                this.sponserRelationFailure(error);
            }
        );
    }
    public sponserRelationShipSuccess(successData) {
        if (successData.IsSuccess) {
            this.sponserRelationList = successData.ResponseObject;

        }
    }
    public sponserRelationFailure(error) {
    }

    // postal code in religareproposal
    getPostal(pin, title) {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
            'pincode': pin
        }
        if (pin.length == 6) {
            this.proposalservice.getPostalReligare(data).subscribe(
                (successData) => {
                    this.getpostalSuccess(successData, title);
                },
                (error) => {
                    this.getpostalFailure(error);
                }
            );
        }
    }

    public getpostalSuccess(successData, title) {
        if (successData.IsSuccess == true) {
            this.response = successData.ResponseObject;
            if (title == 'personal') {
                if (Object.keys(this.response).length === 0) {
                    this.religarePersonal.controls['state'].setValue('');
                    this.religarePersonal.controls['city'].setValue('');
                    this.personalCitys = {};
                } else {
                    this.religarePersonal.controls['state'].setValue(this.response.state);
                    this.personalCitys = this.response.city;
                }
                sessionStorage.personalCitys = JSON.stringify(this.personalCitys);
            } else if (title == 'residence') {
                if (Object.keys(this.response).length === 0) {
                    this.religarePersonal.controls['rcity'].setValue('');
                    this.religarePersonal.controls['rstate'].setValue('');
                    this.residenceCitys = {};
                } else {
                    this.religarePersonal.controls['rstate'].setValue(this.response.state);
                    this.residenceCitys = this.response.city;
                }
                sessionStorage.residenceCitys = JSON.stringify(this.residenceCitys);
            }
        } else {
            this.toastr.error('In valid Pincode');
            if (title == 'personal') {
                sessionStorage.personalCitys = '';
                this.personalCitys = {};
                this.religarePersonal.controls['state'].setValue('');
                this.religarePersonal.controls['city'].setValue('');
            } else if (title == 'residence') {
                sessionStorage.residenceCitys = '';
                this.residenceCitys = {};
                this.religarePersonal.controls['rcity'].setValue('');
                this.religarePersonal.controls['rstate'].setValue('');
            }

        }
    }

    public getpostalFailure(error) {
    }

    selectResCity() {
        // this.religarePersonal.controls['rcityName'].patchValue(this.residenceCitys[this.religarePersonal.controls['rcity'].value]);
    }
    insureTravelRelationListName(i) {
        console.log(i, 'innn');
        console.log(this.insureReligareArray['controls'].items['controls'][i]['controls'].relationship.value, 'ffff');
        console.log(this.insuretravelRelationList, 'insuretravelRelationList');
        this.insureReligareArray['controls'].items['controls'][i]['controls'].relationshipName.patchValue(this.insuretravelRelationList[this.insureReligareArray['controls'].items['controls'][i]['controls'].relationship.value]);

    }

    iPersonalCitysName() {
        this.insureReligareArray.controls['cityName'].patchValue(this.iPersonalCitys[this.insureReligareArray.controls['city'].value]);
    }
    rPersonalCitysName() {
        this.insureReligareArray.controls['rcityName'].patchValue(this.rPersonalCitys[this.insureReligareArray.controls['rcity'].value]);
    }
    religareTravelRelationshipList() {
       // this.nomineeDetails.controls['religareNomineeRelationshipName'].patchValue(this.insuretravelRelationList[this.nomineeDetails.controls['religareTravelRelationship'].value]);
    }
    studentRelationshipList() {
        this.religarePersonal.controls['studentRelationShipName'].patchValue(this.insuretravelRelationList[this.religarePersonal.controls['studentRelationShip'].value]);
    }
    selectComCity() {
        this.religarePersonal.controls['cityName'].patchValue(this.personalCitys[this.religarePersonal.controls['city'].value]);
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
    // SAME AS ADDRESS
    sameAddress(values){
        if (this.religarePersonal.controls['sameAsProposer'].value) {
            this.residenceCitys = this.personalCitys;
            sessionStorage.residenceCitys = JSON.stringify(this.residenceCitys);
            this.inputReadonly = true;
            this.religarePersonal.controls['raddress1'].patchValue(this.religarePersonal.controls['address1'].value);
            this.religarePersonal.controls['raddress2'].patchValue(this.religarePersonal.controls['address2'].value);
            this.religarePersonal.controls['rcity'].patchValue(this.religarePersonal.controls['city'].value);
            this.religarePersonal.controls['rpincode'].patchValue(this.religarePersonal.controls['pincode'].value);
            this.religarePersonal.controls['rstate'].patchValue(this.religarePersonal.controls['state'].value);

        } else {
            this.inputReadonly = false;
            this.religarePersonal.controls['raddress1'].patchValue('');
            this.religarePersonal.controls['raddress2'].patchValue('');
            this.religarePersonal.controls['rcity'].patchValue('');
            this.religarePersonal.controls['rpincode'].patchValue('');
            this.religarePersonal.controls['rstate'].patchValue('');

        }

    }

    // ADDON
    getAddon() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',

        };
        this.travelservice.addOn(data).subscribe(
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
            this.addon = successData.ResponseObject;
            for (let i=0; i < this.addon.length; i++) {
                let addonForm = this.religarePersonal.get('addonForm') as FormArray;
                console.log(addonForm,'addonform');
                addonForm.push(
                    this.fb.group(
                        {
                            title: this.addon[i].addon_description,
                            addonValue: this.addon[i].addon_name,
                            checked: false
                        })
                );
            }

            console.log(this.religarePersonal, ' this.religarePersonal');
        }
    }
    public AddonFailure(error) {
    }
    addonList(event, i){
        // if(event.checked){
        //     // this.toastr.error('Your SumInsured Amount should be different');
        //     this.addon[i].checked = true;
        // } else {
        //     this.addon[i].checked = false;
        //
        // }
        sessionStorage.setAddons = JSON.stringify(this.religarePersonal.value.addonForm);
        console.log(sessionStorage.setAddons,'setaddon')

    }
    // NEXT BUTTON
    personalDetails(stepper: MatStepper, value) {
        sessionStorage.stepperDetails1 = '';
        sessionStorage.stepperDetails1 = JSON.stringify(value);
        this.personalReligareTravelData = value;
        console.log(this.personalReligareTravelData,'this.personalReligareTravelData');
        console.log(this.personalReligareTravelData, 'first');
        console.log(this.religarePersonal.valid, 'this.religarePersonal.valid');
        let sponserValidDob = true;
        if(this.getEnquiryDetails.travel_user_type == 'student') {
            sponserValidDob = false;
            if (sessionStorage.sponserAge >= 18) {
                sponserValidDob = true;
            }
        }
        console.log(sponserValidDob, 'sponserValidDob');
        if (this.religarePersonal.valid) {
            if (sessionStorage.proposerAgeReligareTravel >= 18) {
                if (sponserValidDob) {
                    stepper.next();
                    this.topScroll();
                    this.nextStep();
                    this.religareTravelMobileTrue1 = false;
                } else {
                    this.toastr.error('Sponsor age should be 18 or above');
                }
            } else {
                this.toastr.error('Proposer age should be 18 or above');
            }
        }
    }
    // INSURED PAGE

    initItemRows() {
        return this.fb.group(
            {
                title: ['', Validators.required],
                firstname: new FormControl(''),
                lastname: new FormControl(''),
                dob: ['', Validators.required],
                gender: ['', Validators.compose([Validators.required])],
                relationship: ['', Validators.required],
                relationshipName: '',
                insurerDobError: '',
                insurerDobValidError: '',
                passport: ['', Validators.compose([Validators.minLength(8)])],
                pannumber: '',
                adharnumber: '',
                sameAsInsuredProposer: false,
                email: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
                mobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
                type: '',
                phone: '',
                sameasreadonly:false,
                rolecd: 'PRIMARY',
                ins_age: '',
                ins_days: ''
            }
        );
    }

    //  Title change Function in insured
    insureChangeGender(index) {
        if (this.insureReligareArray['controls'].items['controls'][index]['controls'].title.value == 'MR') {
            this.insureReligareArray['controls'].items['controls'][index]['controls'].gender.patchValue('Male');
        } else {
            this.insureReligareArray['controls'].items['controls'][index]['controls'].gender.patchValue('Female');
        }
    }


    // dob insurer
    addEventInsurer(event,  i, type) {
        if (event.value != null) {
            let selectedDate = '';
            let dob = '';
            let dob_days = '';
            this.getAge = '';
            if (typeof event.value._i == 'string') {
                const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
                if (pattern.test(event.value._i) && event.value._i.length == 10) {
                    this.insureReligareArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
                } else {
                    this.insureReligareArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('Enter Valid Date');
                }
                selectedDate = event.value._i;
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                dob_days = this.datepipe.transform(event.value, 'dd-MM-y');
                if (selectedDate.length == 10) {
                    this.getAge = this.ageCalculateInsurer(dob_days);
                }

            } else if (typeof event.value._i == 'object') {
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                dob_days = this.datepipe.transform(event.value, 'dd-MM-y');

                console.log(dob, 'dob11');

                if (dob.length == 10) {
                    this.getAge = this.ageCalculateInsurer(dob_days);
                }

            }
            if (this.getAge) {
                console.log(this.getAge, 'newwagee11');
                console.log(dob, 'dob2');
                this.insureReligareArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
                this.insureReligareArray['controls'].items['controls'][i]['controls'].dob.patchValue(dob);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].ins_days.patchValue(this.getAge);
                this.ageValidationInsurer(i, type);
            }

        }
        sessionStorage.InsurerAgeReligareTravel = this.getAge;


    }
    // ageCalculateInsurer(dob) {
    //     let mdate = dob.toString();
    //     let yearThen = parseInt(mdate.substring(8, 10), 10);
    //     let monthThen = parseInt(mdate.substring(5, 7), 10);
    //     let dayThen = parseInt(mdate.substring(0, 4), 10);
    //     let todays = new Date();
    //     let birthday = new Date(dayThen, monthThen - 1, yearThen);
    //     let differenceInMilisecond = todays.valueOf() - birthday.valueOf();
    //     let year_age = Math.floor(differenceInMilisecond / 31536000000);
    //     let day_age = Math.floor((differenceInMilisecond % 31536000000) / 86400000);
    //     let month_age = Math.floor(day_age/30);
    //     console.log(month_age, 'month_agepppp');
    //     return month_age;
    // }
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
    ageValidationInsurer(i, type) {

        // if(this.insureReligareArray['controls'].items['controls'][i]['controls'].ins_age.value < 5) {
        //     this.insureReligareArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Insurer Date of birth date should be atleast 5 months old');
        // } else {
        //     this.insureReligareArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        // }

        if (this.getEnquiryDetails.travel_user_type == 'student') {

            if(this.insureReligareArray['controls'].items['controls'][i]['controls'].ins_days.value > 4382 && this.insureReligareArray['controls'].items['controls'][i]['controls'].ins_days.value  <= 14974 && type == 'Self')  {
                this.insureReligareArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
            } else if(this.insureReligareArray['controls'].items['controls'][i]['controls'].ins_days.value < 4383 && type == 'Self')  {
                this.insureReligareArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 12 to 40 years');
            } else if(this.insureReligareArray['controls'].items['controls'][i]['controls'].ins_days.value > 14974 && type == 'Self')  {
                this.insureReligareArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 12 to 40 years');
            }

        } else {
            // if(this.insureReligareArray['controls'].items['controls'][i]['controls'].ins_days.value < 6574 && type == 'Self') {
            //     this.insureReligareArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Self age should be 18 and above');
            // } else if(this.insureReligareArray['controls'].items['controls'][i]['controls'].ins_days.value > 6573 && type == 'Self')  {
            //     this.insureReligareArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
            // }

            if(this.insureReligareArray['controls'].items['controls'][i]['controls'].ins_days.value > 6573 && this.insureReligareArray['controls'].items['controls'][i]['controls'].ins_days.value  <= 29584 && type == 'Self')  {
                this.insureReligareArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
            } else if(this.insureReligareArray['controls'].items['controls'][i]['controls'].ins_days.value < 6574 && type == 'Self')  {
                this.insureReligareArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 18 to 80 years');
            } else if(this.insureReligareArray['controls'].items['controls'][i]['controls'].ins_days.value > 29584 && type == 'Self')  {
                this.insureReligareArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 18 to 80 years');
            }

        }



    }

    // SAME DETAILS IN PROPOSER
    sameInsuredProposer(){

        if (this.insureReligareArray['controls'].items['controls'][0]['controls'].sameAsInsuredProposer.value) {
            this.insureReligareArray['controls'].items['controls'][0]['controls'].sameasreadonly.patchValue(true);
            this.insureReligareArray['controls'].items['controls'][0]['controls'].title.patchValue(this.religarePersonal.controls['title'].value);
            this.insureReligareArray['controls'].items['controls'][0]['controls'].firstname.patchValue(this.religarePersonal.controls['firstname'].value);
            this.insureReligareArray['controls'].items['controls'][0]['controls'].lastname.patchValue(this.religarePersonal.controls['lastname'].value);
            this.insureReligareArray['controls'].items['controls'][0]['controls'].dob.patchValue(this.religarePersonal.controls['dob'].value);
            this.insureReligareArray['controls'].items['controls'][0]['controls'].gender.patchValue(this.religarePersonal.controls['gender'].value);
            this.insureReligareArray['controls'].items['controls'][0]['controls'].relationship.patchValue('SELF');
            this.insureReligareArray['controls'].items['controls'][0]['controls'].email.patchValue(this.religarePersonal.controls['email'].value);
            this.insureReligareArray['controls'].items['controls'][0]['controls'].mobile.patchValue(this.religarePersonal.controls['mobile'].value);
            this.insureReligareArray['controls'].items['controls'][0]['controls'].passport.patchValue(this.religarePersonal.controls['passport'].value);
            this.insureReligareArray['controls'].items['controls'][0]['controls'].pannumber.patchValue(this.religarePersonal.controls['pannumber'].value);
            this.insureReligareArray['controls'].items['controls'][0]['controls'].adharnumber.patchValue(this.religarePersonal.controls['adharnumber'].value);
            this.insureReligareArray['controls'].items['controls'][0]['controls'].phone.patchValue(this.religarePersonal.controls['phone'].value);

            this.insureReligareArray['controls'].items['controls'][0]['controls'].relationshipName.patchValue(this.insuretravelRelationList['SELF']);

        } else {
            this.insureReligareArray['controls'].items['controls'][0]['controls'].sameasreadonly.patchValue(false);
            this.insureReligareArray['controls'].items['controls'][0]['controls'].title.patchValue('');
            this.insureReligareArray['controls'].items['controls'][0]['controls'].firstname.patchValue('');
            this.insureReligareArray['controls'].items['controls'][0]['controls'].lastname.patchValue('');
            this.insureReligareArray['controls'].items['controls'][0]['controls'].dob.patchValue('');
            this.insureReligareArray['controls'].items['controls'][0]['controls'].gender.patchValue('');
            this.insureReligareArray['controls'].items['controls'][0]['controls'].relationship.patchValue('');
            this.insureReligareArray['controls'].items['controls'][0]['controls'].email.patchValue('');
            this.insureReligareArray['controls'].items['controls'][0]['controls'].mobile.patchValue('');
            this.insureReligareArray['controls'].items['controls'][0]['controls'].passport.patchValue('');
            this.insureReligareArray['controls'].items['controls'][0]['controls'].pannumber.patchValue('');
            this.insureReligareArray['controls'].items['controls'][0]['controls'].adharnumber.patchValue('');
            this.insureReligareArray['controls'].items['controls'][0]['controls'].phone.patchValue('');
            this.insureReligareArray['controls'].items['controls'][0]['controls'].relationshipName.patchValue('');

        }
    }

    // NEXT BUTTON (SECOND PAGE)
    InsureDetails(stepper: MatStepper, value) {
        sessionStorage.stepperDetails2 = '';
        sessionStorage.stepperDetails2 = JSON.stringify(value);
        this.insurerData = value;
        this.proposerInsureData = [];
        this.totalReligareData = [];
        for (let i = 0; i < this.insureReligarePerson.length; i++) {
            this.personalReligareTravelData.type = this.insureReligarePerson[i].type;
        }
        this.proposerInsureData.push(this.personalReligareTravelData);
        sessionStorage.proposerInsureData = JSON.stringify(this.proposerInsureData);

        if (this.insureReligareArray.valid) {
            for (let i = 0; i < this.insureReligarePerson.length; i++) {
                this.insurerData.items[i].type = this.insureReligarePerson[i].type;
            }
            console.log(this.insurerData, 'insurerDatainsurerData');
            for (let i = 0; i < this.insurerData.items.length; i++) {
                this.proposerInsureData.push(this.insurerData.items[i]);
            }

            console.log(this.proposerInsureData, 'this.proposerInsureData9');


            for (let i = 0; i < this.proposerInsureData.length; i++) {
                this.totalReligareData.push({
                    'title': this.proposerInsureData[i].title,
                    'proposer_fname': this.proposerInsureData[i].firstname,
                    'proposer_lname': this.proposerInsureData[i].lastname,
                    'prop_email_list': [{
                        'email': this.proposerInsureData[i].email,
                        'email_type': 'PERSONAL'
                    }],
                    'prop_contact_list': [{
                        'contact_no': this.proposerInsureData[i].mobile,
                        'contact_type': 'MOBILE',
                        'std_code': '91'
                    }],
                    'prop_identity_list': [
                        {
                            'identity_number': this.proposerInsureData[i].passport,
                            'identity_type': 'passport',
                        },
                        {
                            'identity_number': this.proposerInsureData[i].pannumber == '' || this.proposerInsureData[i].pannumber == undefined ? '' : this.proposerInsureData[i].pannumber,
                            'identity_type': 'pan',
                        },
                        {
                            'identity_number': this.proposerInsureData[i].adharnumber == '' || this.proposerInsureData[i].adharnumber == undefined ? '' : this.proposerInsureData[i].adharnumber,
                            'identity_type': 'aadhar',
                        }
                    ],
                    'proposer_res_address1': this.proposerInsureData[0].address1,
                    'proposer_res_address2': this.proposerInsureData[0].address2,
                    'proposer_res_area': '',
                    'proposer_res_city': this.proposerInsureData[0].city,
                    'proposer_res_state': this.proposerInsureData[0].state,
                    'proposer_res_pincode': this.proposerInsureData[0].pincode,
                    'proposer_comm_address1': this.proposerInsureData[0].raddress1,
                    'proposer_comm_address2': this.proposerInsureData[0].raddress2,
                    'proposer_comm_area': '',
                    'proposer_comm_city': this.proposerInsureData[0].rcity,
                    'proposer_comm_state': this.proposerInsureData[0].rstate,
                    'proposer_comm_pincode': this.proposerInsureData[0].rpincode,
                    'prop_dob': this.datepipe.transform(this.proposerInsureData[i].dob, 'y-MM-dd'),
                    'prop_gender': this.proposerInsureData[i].gender,
                    // 'relationship_cd': this.proposerInsureData[i].type == "Student1" ? 'Self' : this.proposerInsureData[i].type,
                    'relationship_cd': i == 0 ? 'SELF' : this.proposerInsureData[i].relationship,
                    'role_cd': this.proposerInsureData[i].rolecd
                });
                if (this.proposerInsureData[i].phone != '') {
                    this.totalReligareData[i].prop_contact_list.push({
                        'contact_no': this.proposerInsureData[i].phone,
                        'contact_type': 'RESEDENTIAL',
                        'std_code': '91'
                    });
                }
            }
            console.log( this.totalReligareData, ' this.totalReligareData this.totalReligareData this.totalReligareData');
            let ageValidate = [];
            for (let i = 0; i < this.insurerData.items.length; i++) {
                if (this.insureReligareArray['controls'].items['controls'][i]['controls'].insurerDobError.value != '') {
                    ageValidate.push(1);
                } else if (this.insureReligareArray['controls'].items['controls'][i]['controls'].insurerDobError.value == '') {
                    ageValidate.push(2);
                }
            }
            if (ageValidate.includes(1)) {
               // this.toastr.error('Insurer Date of birth date should be atleast 5 months old');
            } else if (ageValidate.includes(2)) {
                stepper.next();
                for (let i = 0; i < this.religareTravelQuestionsList.length; i++) {
                    if(this.religareTravelQuestionsList[i].field_type == 'datefield') {
                        console.log(this.religarePersonal.controls.sponserdob.value, 'value');
                        this.religareTravelQuestionsList[i].fieldValue = this.religarePersonal.controls.sponserdob.value;
                    }


                }
                this.topScroll();
                this.nextStep();
                this.religareTravelMobileTrue2 = false;
                // this.religareTravelMobileTrue3 = false;


            }

        }
        if(this.insurerData.items.length == 1){
            this.sameRelationship = this.insureReligareArray['controls'].items['controls'][0]['controls'].relationship.value;
        }
    }


    // MEDICAL THIRD PAGE
    // OuestionList
    changereligareTravelQuestions(value, index, type, pi) {
        if(index == 5 && this.religareTravelQuestionsList[0].sub_questions_list[index].checked) {
            this.diseaseFieldView = true;
        } else if(index == 5 && this.religareTravelQuestionsList[0].sub_questions_list[index].checked == false) {
            this.diseaseFieldView = false;
        }
        sessionStorage.diseaseFieldView = this.diseaseFieldView;

        if(type == 'main') {
            if(value.checked){
                this.religareTravelQuestionsList[index].status = 'Yes';
            } else {
                this.religareTravelQuestionsList[index].status = 'No';
                for (let i = 0; i < this.religareTravelQuestionsList[index].sub_questions_list.length; i++) {
                    this.religareTravelQuestionsList[index].sub_questions_list[i].fieldValue = '';
                    this.religareTravelQuestionsList[index].sub_questions_list[i].checked = false;
                    this.religareTravelQuestionsList[index].sub_questions_list[i].status = 'No';
                }
            }
        } else if(type == 'sub') {
            if(value.checked){
                this.religareTravelQuestionsList[index].sub_questions_list[index].status = 'Yes';
            } else {
                this.religareTravelQuestionsList[index].sub_questions_list[index].status = 'No';
            }
        }
        console.log(this.religareTravelQuestionsList, 'this.religareTravelQuestionsLis');

    }
    religareTravelQuestions() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
            "travel_type": this.getEnquiryDetails.travel_user_type ? this.getEnquiryDetails.travel_user_type : ''

        };
        this.travelservice.religareTravelQuestionList(data).subscribe(
            (successData) => {
                this.religareTravelQuestionsSuccess(successData);
            },
            (error) => {
                this.religareTravelQuestionsFailure(error);
            }
        );

    }
    public religareTravelQuestionsSuccess(successData) {
        if (successData.IsSuccess) {
            this.religareTravelQuestionsList = successData.ResponseObject;
            for (let i = 0; i < this.religareTravelQuestionsList.length; i++) {
                this.religareTravelQuestionsList[i].checked = false;
                this.religareTravelQuestionsList[i].status = 'No';
                this.religareTravelQuestionsList[i].fieldValue = '';
                // if(this.religareTravelQuestionsList[i].field_type == 'datefield') {
                //
                //     alert('d');
                //     console.log(this.religarePersonal.controls.sponserdob.value, 'value');
                //     this.religareTravelQuestionsList[i].fieldValue = this.religarePersonal.controls.sponserdob.value;
                //
                // }


            }
            for (let i = 0; i < this.religareTravelQuestionsList[0].sub_questions_list.length; i++) {
                this.religareTravelQuestionsList[0].sub_questions_list[i].fieldValue = '';
                this.religareTravelQuestionsList[0].sub_questions_list[i].checked = false;
                this.religareTravelQuestionsList[0].sub_questions_list[i].status = 'No';
            }
        }
    }

    public religareTravelQuestionsFailure(error) {
        console.log(error);
    }

    quesback() {
        this.back = false;
    }

    // Medical Details
    medicalHistoryDetails(stepper: MatStepper) {
        sessionStorage.ReligareTravelDetails3 = '';
        this.questionsListTravel = [];
        let fieldValid = false;
        let setMainRes = '';
        let setSubRes = '';
        for (let i = 0; i < this.religareTravelQuestionsList.length; i++) {
            if(this.religareTravelQuestionsList[i].field_type == 'dropdown' || this.religareTravelQuestionsList[i].field_type == 'textarea' || this.religareTravelQuestionsList[i].field_type == 'textbox') {
                setMainRes =  this.religareTravelQuestionsList[i].fieldValue;
            } else if(this.religareTravelQuestionsList[i].field_type == 'datefield') {
                setMainRes =  this.datepipe.transform(this.religareTravelQuestionsList[i].fieldValue, 'y-MM-dd');
            } else if(this.religareTravelQuestionsList[i].field_type == 'checkbox') {
                setMainRes =  this.religareTravelQuestionsList[i].checked ? 'YES' : 'NO';
            }
            this.questionsListTravel.push({
                'questionCd': this.religareTravelQuestionsList[i].question_code,
                'questionSetCd': this.religareTravelQuestionsList[i].question_set_code,
                'response': setMainRes
            });
        }
        let sponserValidDob = true;

        if(this.getEnquiryDetails.travel_user_type == 'student') {

            for (let i = 0; i < this.religareTravelQuestionsList[0].sub_questions_list.length; i++) {
                if (this.religareTravelQuestionsList[0].sub_questions_list[i].field_type == 'datefield' || this.religareTravelQuestionsList[0].sub_questions_list[i].field_type == 'textarea' || this.religareTravelQuestionsList[0].sub_questions_list[i].field_type == 'textbox') {
                    setSubRes = this.religareTravelQuestionsList[0].sub_questions_list[i].fieldValue;
                } else if (this.religareTravelQuestionsList[0].sub_questions_list[i].field_type == 'checkbox') {
                    setSubRes = this.religareTravelQuestionsList[0].sub_questions_list[i].checked ? 'YES' : 'NO';
                }
                this.questionsListTravel.push({
                    'questionCd': this.religareTravelQuestionsList[0].sub_questions_list[i].question_code,
                    'questionSetCd': this.religareTravelQuestionsList[0].sub_questions_list[i].question_set_code,
                    'response': setSubRes
                });
            }
        } else {
            for (let i = 0; i < this.religareTravelQuestionsList.length; i++) {
                for (let j = 0; j < this.religareTravelQuestionsList[i].sub_questions_list.length; j++) {
                    if (this.religareTravelQuestionsList[i].sub_questions_list[j].field_type == 'datefield' || this.religareTravelQuestionsList[i].sub_questions_list[j].field_type == 'textarea' || this.religareTravelQuestionsList[i].sub_questions_list[j].field_type == 'textbox') {
                        setSubRes = this.religareTravelQuestionsList[i].sub_questions_list[j].fieldValue;
                    } else if (this.religareTravelQuestionsList[i].sub_questions_list[j].field_type == 'checkbox') {
                        setSubRes = this.religareTravelQuestionsList[i].sub_questions_list[j].checked ? 'YES' : 'NO';
                    }
                    this.questionsListTravel.push({
                        'questionCd': this.religareTravelQuestionsList[i].sub_questions_list[j].question_code,
                        'questionSetCd': this.religareTravelQuestionsList[i].sub_questions_list[j].question_set_code,
                        'response': setSubRes == undefined || setSubRes == null ? '' :  setSubRes
                    });
                }
            }
            // for (let i = 0; i < this.religareTravelQuestionsList[2].sub_questions_list.length; i++) {
            //     if (this.religareTravelQuestionsList[2].sub_questions_list[i].field_type == 'datefield' || this.religareTravelQuestionsList[2].sub_questions_list[i].field_type == 'textarea' || this.religareTravelQuestionsList[2].sub_questions_list[i].field_type == 'textbox') {
            //         setSubRes = this.religareTravelQuestionsList[2].sub_questions_list[i].fieldValue;
            //     } else if (this.religareTravelQuestionsList[2].sub_questions_list[i].field_type == 'checkbox') {
            //         setSubRes = this.religareTravelQuestionsList[2].sub_questions_list[i].checked ? 'YES' : 'NO';
            //     }
            //     this.questionsListTravel.push({
            //         'questionCd': this.religareTravelQuestionsList[2].sub_questions_list[i].question_code,
            //         'questionSetCd': this.religareTravelQuestionsList[2].sub_questions_list[i].question_set_code,
            //         'response': setSubRes
            //     });
            // }
        }
        console.log(this.religareTravelQuestionsList, 'this.religareTravelQuestionsList');
        for (let i = 0; i < this.totalReligareData.length; i++) {
            this.totalReligareData[i].questions_list = this.questionsListTravel;
        }

        if(this.getEnquiryDetails.travel_user_type == 'student') {
            if(this.getEnquiryDetails.sum_insured_amount > 100000 ) {
                if (this.religareTravelQuestionsList[0].checked || this.religareTravelQuestionsList[1].checked || this.religareTravelQuestionsList[2].checked || this.religareTravelQuestionsList[3].checked) {
                    fieldValid = false;
                } else {
                    fieldValid = true;
                }
            } else {
                fieldValid = true;
            }
        } else {
            fieldValid = true;
        }
        if(fieldValid) {
            let required = true;
            if(this.getEnquiryDetails.travel_user_type == 'student') {
                let findQuesCode = this.questionsListTravel.filter(data => data.questionSetCd == 'SPDsponsorDetails');
                console.log(findQuesCode, 'findQuesCode');
                let findFieldValid = findQuesCode.filter(data => data.response == '');
                console.log(findFieldValid, 'findFieldValid11');
                if (findFieldValid != '') {
                    required = false;
                }
            } else {
                if (this.religareTravelQuestionsList[1].checked && this.religareTravelQuestionsList[1].sub_questions_list[0].fieldValue =='') {
                    fieldValid = false;
                } else {
                    fieldValid = true;
                }
                if (this.religareTravelQuestionsList[2].checked && this.religareTravelQuestionsList[1].sub_questions_list[0].fieldValue =='') {
                    fieldValid = false;
                } else {
                    fieldValid = true;
                }
            }

            console.log(required, 'requiredrequired');

            if(required) {
                stepper.next();
                this.topScroll();
                this.nextStep();
                this.religareTravelMobileTrue3 = false;
            } else {
                this.toastr.error('Please fill the required fields');
            }

        } else {
            this.toastr.error('Sorry! If you have any pre existing disease not allowed to purchase.');

        }
        sessionStorage.ReligareTravelDetails3 = JSON.stringify(this.religareTravelQuestionsList);
    }

    // NOMINEE DETAILS
    religareNomineeDetails(stepper: MatStepper, value) {
        if (this.nomineeDetails.valid) {
            sessionStorage.ReligareTravelNomineeDetails = '';
            sessionStorage.ReligareTravelNomineeDetails = JSON.stringify(value);
            this.religareTravelproposal(stepper);
            this.nextStep();
            this.religareTravelMobileTrue4 = false;
        }
    }

    // religareNomineeDetails(stepper: MatStepper, value) {
    //     this.RiskData = value;
    //     console.log(value, 'valuevalue');
    //     console.log(this.nomineeDetails.valid, 'this.nomineeDetails.valid');
    //     sessionStorage.stepper3Details = '';
    //     sessionStorage.stepper3Details = JSON.stringify(value);
    //     if (this.nomineeDetails.valid) {
    //         if(this.RiskData.riskIndian == true || this.RiskData.riskIsOverSeasCitizen == true){
    //             this.lastStepper = stepper;
    //             this.proposal(stepper);
    //         } else {
    //             this.toastr.error('select you are Indian Citizen or Over Seas Citizen');
    //
    //         }
    //     }
    // }
    // SCROLL PAGE
    topScroll() {
        document.getElementById('main-content').scrollTop = 0;
    }
    // VALIDATIONS
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

    nameValidateNospace(event: any){
        this.validation.nameValidateNospace(event);
    }

    // PROPOSAL CREATION TRAVEL RELIGARE
    religareTravelproposal(stepper) {
        let mcondition = this.religareTravelQuestionsList.filter(data => data.status == 'Yes');
        let addonDetails = [];
        console.log(this.religarePersonal.value.addonForm, 'll');
        for (let i=0; i < this.religarePersonal.value.addonForm.length; i++) {
            console.log(this.religarePersonal.value.addonForm[i].checked, 'chhh');

            if (this.religarePersonal.value.addonForm[i].checked == true) {
                addonDetails.push(this.religarePersonal.value.addonForm[i].addonValue);
            }
        }
        const data = {
            'platform': 'web',
            'travel_type':this.getEnquiryDetails.travel_user_type,
            'proposal_id': sessionStorage.religare_Travel_proposal_id ? sessionStorage.religare_Travel_proposal_id : this.religare_Travel_proposal_id,
            'product_id': this.getTravelPremiumList.product_id,
            'purposeOf_visit': this.purposeOfVisit ? this.purposeOfVisit : 'student',
            'enquiry_id': this.getEnquiryDetails.enquiry_id,
            'trip_start_on': this.datepipe.transform( this.getEnquiryDetails.start_date , 'y-MM-dd'),
            'trip_end_on': this.getEnquiryDetails.travel_user_type == 'student' ? this.religarePersonal.controls['endDateFormat'].value : this.datepipe.transform(this.getEnquiryDetails.end_date , 'y-MM-dd'),
            'baseProductId': this.getTravelPremiumList.geography_code,
            'trip_type': this.getEnquiryDetails.travel_plan_type,
            'plan_name': this.getTravelPremiumList.plan_name,
            'company_name': this.getTravelPremiumList.company_name,
            'suminsured_amount': this.getTravelPremiumList.sum_insured_amount,
            'proposer_insurer_details': this.totalReligareData,
            'travel_geography_code': this.getTravelPremiumList.geography_code,
            'maxTripPeriod':this.getEnquiryDetails.day_count,
            'plan_id': this.getTravelPremiumList.geography_code,
            'policy_term':this.getEnquiryDetails.day_count,
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
            'nominee_name':this.nomineeDetails.controls['religareTravelNomineeName'].value,
            'nominee_relationship': this.nomineeDetails.controls['religareTravelRelationship'].value,
            'medical_status': mcondition != '' ? 'Yes' : 'No',
            'sponser_dob':this.religarePersonal.controls['sponserdob'].value ? this.datepipe.transform(this.religarePersonal.controls['sponserdob'].value,'y-MM-dd') : '',
            'sponser_name':this.religarePersonal.controls['sponsername'].value ? this.religarePersonal.controls['sponsername'].value : '',
            'student_relationship': this.religarePersonal.controls['studentRelationShip'].value,
            'university_name':this.religarePersonal.controls['universityname'].value ? this.religarePersonal.controls['universityname'].value : '',
            'address':this.religarePersonal.controls['guideAddress'].value,
            'title':this.religarePersonal.controls['guidetitle'].value ? this.religarePersonal.controls['guidetitle'].value : '',
            'course_details':this.religarePersonal.controls['coursedetails'].value ? this.religarePersonal.controls['coursedetails'].value : '',
            // 'field11':'',
            'university_address':this.religarePersonal.controls['universityaddress'].value ? this.religarePersonal.controls['universityaddress'].value : '',
            'gfirstname':this.religarePersonal.controls['guidefirstname'].value ? this.religarePersonal.controls['guidefirstname'].value : '',
            'glastname':this.religarePersonal.controls['guidelastname'].value ? this.religarePersonal.controls['guidelastname'].value : '',
            'addons': addonDetails ? addonDetails.toString() : '',
        };

        this.settings.loadingSpinner = true;
        this.travelservice.createReligareTravelProposal(data).subscribe(
            (successData) => {
                this.proposalSuccess(successData, stepper);
            },
            (error) => {
                this.proposalFailure(error);
            }
        );
    }
    public proposalSuccess(successData, stepper) {
        console.log(this.setAddons,'this.setAddons');
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {
            stepper.next();
            this.toastr.success('Proposal created successfully!!');
            this.summaryData = successData.ResponseObject;
            sessionStorage.summaryData = JSON.stringify(this.summaryData);
            this.proposalId = this.summaryData.proposal_id;
            sessionStorage.religare_Travel_proposal_id = this.proposalId;
            this.nomineeFormData = this.nomineeDetails.value;
            sessionStorage.nomineeFormData = JSON.stringify(this.nomineeFormData);
            if (sessionStorage.setAddons != '' && sessionStorage.setAddons != undefined) {
                this.setAddons = JSON.parse(sessionStorage.setAddons);
            }
            if(this.getEnquiryDetails.travel_user_type == 'student') {
                this.getEndDate = this.religarePersonal.controls['endDate'].value;
            } else {
                this.getEndDate = this.getEnquiryDetails.end_date;
            }
            this.religareTravelQuestionsList[4].fieldValue = this.insuretravelRelationList[this.religareTravelQuestionsList[4].fieldValue];

        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }
    public proposalFailure(error){

    }

    // sessionData
    sessionData() {
        if (sessionStorage.stepperDetails1 != '' && sessionStorage.stepperDetails1 != undefined) {
            this.residenceCitys = JSON.parse(sessionStorage.residenceCitys);
            this.personalCitys = JSON.parse(sessionStorage.personalCitys);
            let getProposerDetails = JSON.parse(sessionStorage.stepperDetails1);
            console.log(getProposerDetails,'getdata')
            this.religarePersonal = this.fb.group({
                title: getProposerDetails.title,
                firstname: getProposerDetails.firstname,
                lastname: getProposerDetails.lastname,
                dob: this.datepipe.transform(getProposerDetails.dob , 'y-MM-dd'),
                gender: getProposerDetails.gender,
                address1: getProposerDetails.address1,
                address2: getProposerDetails.address2,
                pincode: getProposerDetails.pincode,
                city: getProposerDetails.city,
                cityName: getProposerDetails.cityName,
                state: getProposerDetails.state,
                raddress1: getProposerDetails.raddress1,
                raddress2: getProposerDetails.raddress2,
                rpincode: getProposerDetails.rpincode,
                rcity: getProposerDetails.rcity,
                rcityName: getProposerDetails.rcityName,
                rstate: getProposerDetails.rstate,
                pannumber: getProposerDetails.pannumber,
                adharnumber: getProposerDetails.adharnumber,
                email: getProposerDetails.email,
                sameAsProposer: getProposerDetails.sameAsProposer,
                sponserdob: this.datepipe.transform(getProposerDetails.sponserdob,'y-MM-dd'),
                sponsername: getProposerDetails.sponsername,
                universityname: getProposerDetails.universityname,
                universityaddress: getProposerDetails.universityaddress,
                guidetitle: getProposerDetails.guidetitle,
                guidefirstname: getProposerDetails.guidefirstname,
                guidelastname: getProposerDetails.guidelastname,
                studentRelationShip: getProposerDetails.studentRelationShip,
                coursedetails: getProposerDetails.coursedetails,
                guideAddress: getProposerDetails.guideAddress,
                mobile: getProposerDetails.mobile,
                passport: getProposerDetails.passport,
                phone: getProposerDetails.phone,
                addon: getProposerDetails.addon,
                studentRelationShipName: getProposerDetails.studentRelationShipName,
                relationshipName: getProposerDetails.relationshipName,
                startDate: getProposerDetails.startDate,
                betweenMonth: getProposerDetails.betweenMonth,
                endDate: getProposerDetails.endDate,
                endDateFormat: getProposerDetails.endDateFormat,
                addonForm: this.fb.array([]),
                rolecd: getProposerDetails.rolecd == null ? 'PROPOSER' : 'PROPOSER'

            });
            for (let i=0; i < getProposerDetails.addonForm.length; i++) {
                console.log(getProposerDetails.addonForm[i],'addonlen')
                let addonForm = this.religarePersonal.get('addonForm') as FormArray;
                addonForm.push(
                    this.fb.group(
                        {
                            title: getProposerDetails.addonForm[i].title,
                            addonValue: getProposerDetails.addonForm.addonValue,
                            checked: getProposerDetails.addonForm[i].checked
                        })
                );
            }
            console.log(this.religarePersonal.value,'religarePersonal');

            // for (let i = 0; i < getProposerDetails.addonForm.length; i++) {
            //     console.log(getProposerDetails.addonForm[i],'length')
            //     this.religarePersonal.value.addonForm[i]['controls'].title.patchValue(getProposerDetails.addonForm[i].title);
            //     this.religarePersonal.value.addonForm[i]['controls'].addonValue.patchValue(getProposerDetails.addonForm[i].addonValue);
            //     this.religarePersonal.value.addonForm[i]['controls'].checked.patchValue(getProposerDetails.addonForm[i].checked);
            // }
        } else {
            this.getAddon();
        }
        if (sessionStorage.stepperDetails2 != '' && sessionStorage.stepperDetails2 != undefined) {
            this.religareTravel2 = JSON.parse(sessionStorage.stepperDetails2);
            for (let i = 0; i < this.religareTravel2.items.length; i++) {
                this.insureReligareArray['controls'].items['controls'][i]['controls'].title.patchValue(this.religareTravel2.items[i].title);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].firstname.patchValue(this.religareTravel2.items[i].firstname);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].lastname.patchValue(this.religareTravel2.items[i].lastname);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].gender.patchValue(this.religareTravel2.items[i].gender);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].dob.patchValue(this.datepipe.transform(this.religareTravel2.items[i].dob, 'y-MM-dd'));
                this.insureReligareArray['controls'].items['controls'][i]['controls'].relationship.patchValue(this.religareTravel2.items[i].relationship);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].passport.patchValue(this.religareTravel2.items[i].passport);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].email.patchValue(this.religareTravel2.items[i].email);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].mobile.patchValue(this.religareTravel2.items[i].mobile);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].sameAsInsuredProposer.patchValue(this.religareTravel2.items[i].sameAsInsuredProposer);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].sameasreadonly.patchValue(this.religareTravel2.items[i].sameasreadonly);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].pannumber.patchValue(this.religareTravel2.items[i].pannumber);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].adharnumber.patchValue(this.religareTravel2.items[i].adharnumber);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].phone.patchValue(this.religareTravel2.items[i].phone);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].ins_days.patchValue(this.religareTravel2.items[i].ins_days);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].relationshipName.patchValue(this.religareTravel2.items[i].relationshipName);

            }
        }
        if (sessionStorage.ReligareTravelDetails3 != '' && sessionStorage.ReligareTravelDetails3 != undefined) {
            this.religareTravelQuestionsList = JSON.parse(sessionStorage.ReligareTravelDetails3);
        }
        if (sessionStorage.ReligareTravelNomineeDetails != '' && sessionStorage.ReligareTravelNomineeDetails != undefined) {
            this.getReligareTravelNomineeData = JSON.parse(sessionStorage.ReligareTravelNomineeDetails);
            this.nomineeDetails = this.fb.group({
                religareTravelNomineeName: this.getReligareTravelNomineeData.religareTravelNomineeName,
                religareTravelRelationship: this.getReligareTravelNomineeData.religareTravelRelationship,
                religareNomineeRelationshipName: this.getReligareTravelNomineeData.religareNomineeRelationshipName,
            });
        }
        if (sessionStorage.religare_Travel_proposal_id != '' && sessionStorage.religare_Travel_proposal_id != undefined) {
            this.religare_Travel_proposal_id = sessionStorage.religare_Travel_proposal_id;
        }
        if (sessionStorage.setAddons != '' && sessionStorage.setAddons != undefined) {
            this.setAddons = JSON.parse(sessionStorage.setAddons);
            this.addon = JSON.parse(sessionStorage.setAddons);
        }

        if (sessionStorage.diseaseFieldView != '' && sessionStorage.diseaseFieldView != undefined) {
            this.diseaseFieldView = sessionStorage.diseaseFieldView;
        }

    }

}


// HOLD

// getPostalInsurer(pin, i, title) {
//     this.pin = pin;
//     console.log(this.pin, 'this.pin');
//     this.title = title;
//     this.index = i;
//     console.log(this.title, 'kjhjkghkhk');
//     const data = {
//         'platform': 'web',
//         'user_id': '0',
//         'role_id': '4',
//         'pincode': this.pin
//     }
//     console.log(data, 'datadata');
//     if (this.pin.length == 6) {
//         this.proposalservice.getPostalReligare(data).subscribe(
//             (successData) => {
//                 this.getpostalInsureSuccess(successData);
//             },
//             (error) => {
//                 this.getpostalInsureFailure(error);
//             }
//         );
//     }
// }
//
// public getpostalInsureSuccess(successData) {
//     if (successData.IsSuccess) {
//         if (this.title == 'insurer') {
//             this.iPersonalCitys = [];
//             this.response = successData.ResponseObject;
//             this.insureReligareArray['controls'].items['controls'][this.index]['controls'].state.setValue(this.response[0].state);
//             for (let i = 0; i < this.response.length; i++) {
//                 this.iPersonalCitys.push({city: this.response[i].city});
//             }
//             console.log(this.iPersonalCitys, 'this.iPersonalCitys ');
//             this.insureReligareArray['controls'].items['controls'][this.index]['controls'].state.setValue(this.response[0].state);
//         } else if (successData.IsSuccess != true) {
//             this.toastr.error('In valid Pincode');
//             this.insureReligareArray['controls'].items['controls'][this.index]['controls'].state.setValue('');
//             for (let i = 0; i < this.response.length; i++) {
//                 this.iPersonalCitys.push({city: this.response[i].city = ''});
//             }
//             this.insureReligareArray['controls'].items['controls'][this.index]['controls'].state.setValue('');
//
//         }
//         if(this.title == 'permment') {
//             this.rPersonalCitys = [];
//             this.responseres = successData.ResponseObject;
//             console.log(this.responseres, 'this.responseres');
//             this.insureReligareArray['controls'].items['controls'][this.index]['controls'].rstate.setValue(this.responseres[0].state);
//             for (let i = 0; i < this.responseres.length; i++) {
//                 this.rPersonalCitys.push({city: this.responseres[i].city});
//             }
//             console.log(this.rPersonalCitys, 'this.iPersonalCitys ');
//         } else if (successData.IsSuccess != true) {
//             this.toastr.error('In valid Pincode');
//             this.insureReligareArray['controls'].items['controls'][this.index]['controls'].rstate.setValue('');
//             for (let i = 0; i < this.responseres.length; i++) {
//                 this.rPersonalCitys.push({city: this.responseres[i].city = ''});
//             }
//             this.insureReligareArray['controls'].items['controls'][this.index]['controls'].rstate.setValue('');
//
//         }
//     }
// }
//
//
// public getpostalInsureFailure(error) {
//     console.log(error);
// }
//
//

