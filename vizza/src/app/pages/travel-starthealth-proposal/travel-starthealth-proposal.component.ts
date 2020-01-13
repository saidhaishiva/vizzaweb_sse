
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray, FormControl} from '@angular/forms';
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
import {TravelService} from '../../shared/services/travel.service';
import {HealthService} from '../../shared/services/health.service';
import {ValidationService} from '../../shared/services/validation.service';
import {ActivatedRoute, Router} from '@angular/router';
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
    selector: 'app-travel-starhealth-proposal',
    templateUrl: './travel-starthealth-proposal.component.html',
    styleUrls: ['./travel-starthealth-proposal.component.scss'],
    providers: [

        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
})
export class TravelProposalComponent implements OnInit {
    public personal: FormGroup;
    public summary: FormGroup;
    public insureArray: FormGroup;
    public nomineeDetails: FormGroup;
    public setDate: any;
    public selectDate: any;
    public stopNext: boolean;
    public buyProductdetails: any;
    public groupName: any;
    public getTravelPremiumList: any;
    public enquiryId: any;
    public personalData: any;
    public occupationList: any;
    public relationshipList: any;
    public relationshipLists: any;
    public today: any;
    public declaration: boolean;
    public acceptSummaryDeclaration: boolean;
    public summaryData: any;
    public proposalDtails: any;
    public insurerDtails: any;
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
    public summaryCity: any;
    public rSummaryCity: any;
    public summaryRelationship : any;
    public sumTitle: any;
    public sumPin: any;
    public code: any;
    public sumAreaName: any;
    public sumAreaNameComm: any;
    public setDateAge: any;
    public proposerAge: any;
    public occupationCode: any;
    public religareQuestionsList: any;
    public items: any;
    public step: any;
    public questionEmpty: any;
    public proposerInsureData: any;
    public mobileNumber: any;
    public  altmobileNumber: any;
    public insurerData: any;
    public totalReligareData: any;
    public allInsuredData: any;
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
    public sameRelationship: any;
    public sameRelationshipValue: any;
    array: any;
    placeOfVisiLists: any;
    assigneeRelationList: any;
    travelPurposeLists: any;
    preExistingDisease: any;
    personalDobError: any;
    getAge: any;
    paymentGatewayData: any;
    visaTypeAllList: any;
    placeOfVisitName: any;
    travelPurposeName: any;
    AcceptDeclaration: boolean;
    areaList: any;
    proposerFormData: any;
    travelPlan:any;
    insuredFormData: any;
    nomineeFormData: any;
    travelStartDate: any;
    travelEndDate: any;
    currentStep: any;
    getEnquiryDetails: any;
    gstListType: any;
    public passportPattern: any;
    public patternError: any;
    public passportany: any;
    public placevisting: any;
    public status: any;
    public proposal_Id: any;
    public payLaterr: any;
    public requestDetails: any;
    public pos_status: any;

    constructor(@Inject(WINDOW) private window: Window, public travelservice: TravelService, public route: ActivatedRoute, public validation: ValidationService, public proposalservice: HealthService, public datepipe: DatePipe, private toastr: ToastrService, public appSettings: AppSettings, public dialog: MatDialog,public router: Router,
                public config: ConfigurationService, public common: CommonService, public fb: FormBuilder, public auth: AuthService, public http: HttpClient, @Inject(LOCALE_ID) private locale: string) {
        let today = new Date();
        this.today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        let stepperindex = 0;
        this.route.params.forEach((params) => {
            if(params.stepper == true || params.stepper == 'true') {
                stepperindex = 2;
                if(sessionStorage.summaryData != '' && sessionStorage.summaryData != undefined){
                    this.summaryData = JSON.parse(sessionStorage.summaryData);
                    this.proposerFormData = JSON.parse(sessionStorage.proposerFormData);
                    this.insuredFormData = JSON.parse(sessionStorage.insuredFormData);
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
        this.passportPattern = '^[A-PR-WYa-pr-wy]{0,1}[0-9]{1,6}[1-9]{0,1}$';
        this.currentStep = stepperindex;
        console.log(this.currentStep,' this.currentStep');
        this.stopNext = false;
        this.back = false;
        this.hideQuestion = false;
        this.declaration = false;
        this.acceptSummaryDeclaration = false;
        this.settings = this.appSettings.settings;
        this.settings.HomeSidenavUserBlock = false;
        this.settings.sidenavIsOpened = false;
        this.settings.sidenavIsPinned = false;
        this.webhost = this.config.getimgUrl();
        this.selectDate = '';
        this.patternError = '';
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
        this.travelStartDate = sessionStorage.startDate;
        this.travelEndDate = sessionStorage.endDate;
        let nameFormat = "[a-zA-Z\s]+$";

        // this.name = new FormControl("", Validators.compose([Validators.required, Validators.pattern(nameFormat)]));
        this.personal = this.fb.group({
            personalTitle: ['', Validators.required],
            personalFirstname: ['', Validators.required],
            personalGender: ['', Validators.compose([Validators.required])],
            personalDob: ['', Validators.compose([Validators.required])],
            personalrelationship: 'SELF',
            personalGst: ['', Validators.compose([Validators.minLength(15)])],
            personalAddress: ['', Validators.required],
            personalAddress2: ['', Validators.required],
            personalPincode: ['', Validators.required],
            personalCity: ['', Validators.required],
            personalCityName: '',
            personalArea: ['', Validators.required],
            personalAreaName: '',
            personalgstIdType: '',
            personalAadhar: '',
            personalState: ['', Validators.required],
            personalEmail: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
            personalMobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
            placeOfVisit: ['', Validators.required],
            placeOfVisitName: '',
            travelPurpose: ['', Validators.required],
            travelPurposeName: '',
            physicianName:'',
            physicianContactNumber: '',
            travelDeclaration: ['', Validators.required]
        });
    }
    changeGender() {
        if (this.personal.controls['personalTitle'].value == 'MR'){
            this.personal.controls['personalGender'].patchValue('Male');
        } else {
            this.personal.controls['personalGender'].patchValue('Female');
        }
    }
    insureChangeGender(index) {
        if (this.insureArray['controls'].items['controls'][index]['controls'].insurerTitle.value == 'MR') {
            this.insureArray['controls'].items['controls'][index]['controls'].insurerGender.patchValue('Male');
        } else {
            this.insureArray['controls'].items['controls'][index]['controls'].insurerGender.patchValue('Female');
        }
    }


    ngOnInit() {
        this.placeOfVisits();
        this.insurerRelationship();
        this.assigneeRelationship();
        this.travelPurposeList();
        this.getIlnessDetails();
        this.gstIdList();
        this.visaTypeList();


      //  this.enquiryId = sessionStorage.enquiryId;
        this.getTravelPremiumList = JSON.parse(sessionStorage.travelPremiumList);
        let enqList = JSON.parse(sessionStorage.enquiryDetailsTravel);
        this.getEnquiryDetails = enqList[0];
        this.insurePersons = this.getEnquiryDetails.family_members;
        this.insureArray = this.fb.group({
            items: this.fb.array([])
        });
        for (let i = 0; i < this.insurePersons.length; i++) {
            this.items = this.insureArray.get('items') as FormArray;
            this.items.push(this.initItemRows());
            this.insureArray['controls'].items['controls'][i]['controls'].type.setValue(this.insurePersons[i].type);
        }
        this.sessionData();
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
        console.log(this.insureArray['controls'].items['controls'][i]['controls'].passportNumber.value,'5678')
        if( this.insureArray['controls'].items['controls'][i]['controls'].passportNumber.value != ''){
            this.passportany = false;
            this.passportany = '';
        }
        else{
            this.passportany = true;
            this.passportany = 'Pass Port is required'
        }

    }


    topScroll() {
        document.getElementById('main-content').scrollTop = 0;
    }

    initItemRows() {
        return this.fb.group(
            {
                insurerTitle: ['', Validators.required],
                insurerName: new FormControl(''),
                insurerDob: ['', Validators.required],
                insurerGender: ['', Validators.compose([Validators.required])],
                insurerRelationship: ['', Validators.required],
                insurerRelationshipName: '',
                assigneeName: ['', Validators.required],
                assigneeRelationship: ['', Validators.required],
                assigneeRelationshipName: '',
                passportNumber: ['', Validators.compose([Validators.required])],
                passportExpiry: ['', Validators.required],
                visaType: ['', Validators.required],
                visaTypeName: '',
                illness: ['', Validators.required],
                insurerDobError: '',
                insurerDobValidError: '',
                insurerExpiryValidError: '',
                type: '',
                ins_age: ''
            }
        );
    }
    // testPattern(index) {
    //     console.log(this.insureArray['controls'].items['controls'][index]['controls'].passportNumber.value, 'value');
    //     if (/^[A-PR-WYa-pr-wy]{1,1}[0-9]{6}[1-9]{1,1}$/.test(this.insureArray['controls'].items['controls'][index]['controls'].passportNumber.value)) {
    //         console.log('valid');
    //         this.patternError = '';
    //     } else {
    //         console.log('invalid');
    //         this.patternError = 'Enter Valid Passport Number'
    //     }
    // }

    acceptDeclaration() {
        if (this.personal.controls['travelDeclaration'].value) {
            this.AcceptDeclaration = true;
        } else {
            this.AcceptDeclaration = false;
        }


    }
    addEvent(event, i, type) {
        if (event.value != null) {
            let selectedDate = '';
            this.proposerAge = '';
            let dob = '';
            if (typeof event.value._i == 'string') {
                const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
                if (pattern.test(event.value._i) && event.value._i.length == 10) {
                    if (type == 'insurer') {
                        this.insureArray['controls'].items['controls'][i]['controls'].insurerExpiryValidError.patchValue('');
                    } else {
                        this.personalDobError = '';
                    }

                } else {
                    if (type == 'insurer') {
                        this.insureArray['controls'].items['controls'][i]['controls'].insurerExpiryValidError.patchValue('Enter Valid Date');
                    } else {
                        this.personalDobError = 'Enter Valid Date';
                    }

                }
                selectedDate = event.value._i;
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                if (selectedDate.length == 10) {
                    this.proposerAge = this.ageCalculate(dob);
                }

            } else if (typeof event.value._i == 'object') {
                // dob = this.datepipe.transform(event.value, 'MMM d, y');
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                if (dob.length == 10) {
                    this.proposerAge = this.ageCalculate(dob);
                }
                this.personalDobError = '';
            }

            if (this.proposerAge && type == 'insurer') {
                this.insureArray['controls'].items['controls'][i]['controls'].passportExpiry.patchValue(dob);
                this.insureArray['controls'].items['controls'][i]['controls'].insurerExpiryValidError.patchValue('');
            } else {
                sessionStorage.proposerAgeForTravel = this.proposerAge;
            }

        }
        sessionStorage.personalDobError = this.personalDobError;
    }
    addEventInsurer(event,  i, type) {

        if (event.value != null) {
            let selectedDate = '';
            let dob = '';
            this.getAge = '';
            if (typeof event.value._i == 'string') {
                const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
                if (pattern.test(event.value._i) && event.value._i.length == 10) {
                    this.insureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
                } else {
                    this.insureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('Enter Valid Date');
                }
                console.log(this.insureArray['controls'].items['controls'][i]['controls'].insurerDobValidError,'jkhgfdsfsg');
                selectedDate = event.value._i;
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                if (selectedDate.length == 10) {
                    this.getAge = this.ageCalculateInsurer(dob);
                }

            } else if (typeof event.value._i == 'object') {

                dob = this.datepipe.transform(event.value, 'y-MM-dd');

                if (dob.length == 10) {
                    this.getAge = this.ageCalculateInsurer(dob);
                }

            }
            // if (this.getAge) {
                this.insureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
                // this.insureArray['controls'].items['controls'][i]['controls'].insurerDob.patchValue(dob);
                this.insureArray['controls'].items['controls'][i]['controls'].ins_age.patchValue(this.getAge);
                this.ageValidationInsurer(i, type);
           // }

        }

    }
    ageCalculateInsurer(dob) {
        let mdate = dob.toString();
        let yearThen = parseInt(mdate.substring( 8,10), 10);
        let monthThen = parseInt(mdate.substring(5,7), 10);
        let dayThen = parseInt(mdate.substring(0,4), 10);
        let todays = new Date();
        let birthday = new Date( dayThen, monthThen-1, yearThen);
        let differenceInMilisecond = todays.valueOf() - birthday.valueOf();
        let Bob_days = Math.ceil(differenceInMilisecond / (1000 * 60 * 60 * 24));
        return Bob_days;
    }
    ageValidationInsurer(i, type) {
        if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value < 150) {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Insured Date of birth should be atleast 5 months old');
        } else {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
            this.arr.push(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value);
        }
    }
    ageValidation(i, type) {
        if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 18 && type == 'Self') {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Self age should be above 18');
        } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value > 18 && type == 'Self')  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
            this.arr.push(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value);
        }
        if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 18 && type == 'Spouse') {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Spouse age should be above 18');
        } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value > 18 && type == 'Spouse')  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
            this.arr.push(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value);
        }
        let smallest = this.arr[0];
        for(let i = 1; i<this.arr.length; i++){
            if(this.arr[i] < smallest){
                smallest = this.arr[i];
            }
        }
        if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 1 && type == 'Son') {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Son age should be above 1');
        } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value > 1 && type == 'Son')  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        }
        if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 1 && type == 'Daughter') {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Daughter age should be above 1');
        } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value > 1 && type == 'Daughter')  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
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
    stepback() {
        this.back = true;
    }
    quesback() {
        this.back = false;
    }
    changeRelationSame(event, i){
        this.insureArray['controls'].items['controls'][i]['controls'].insurerRelationshipName.patchValue(this.insureRelationList[this.insureArray['controls'].items['controls'][i]['controls'].insurerRelationship.value]);

            let target = event.source.selected._element.nativeElement;
            let selectedData = {
                value: event.value,
                text: target.innerText.trim()
            };
        this.sameRelationship = selectedData.value;
        for (let j =0; j < this.insureRelationList.length; j++) {
            if (this.sameRelationship == this.insureRelationList[j].relationship_id) {
                this.sameRelationshipValue = this.insureRelationList[j].relationship_name;
            }
        }
    }
    selectAssigneeRealtion(i){
        this.insureArray['controls'].items['controls'][i]['controls'].assigneeRelationshipName.patchValue(this.assigneeRelationList[this.insureArray['controls'].items['controls'][i]['controls'].assigneeRelationship.value]);
    }
    selectVisaType(i){
        this.insureArray['controls'].items['controls'][i]['controls'].visaTypeName.patchValue(this.visaTypeAllList[this.insureArray['controls'].items['controls'][i]['controls'].visaType.value]);
    }


    sessionData() {
        if (sessionStorage.personalCitys != '' && sessionStorage.personalCitys != undefined) {
            this.personalCitys = JSON.parse(sessionStorage.personalCitys);
        }
        if (sessionStorage.areaList != '' && sessionStorage.areaList != undefined) {
            this.areaList = JSON.parse(sessionStorage.areaList);
        }

        if (sessionStorage.stepper1DetailsForTravel != '' && sessionStorage.stepper1DetailsForTravel != undefined) {
            this.getStepper1 = JSON.parse(sessionStorage.stepper1DetailsForTravel);
            this.personal = this.fb.group({
                personalTitle: this.getStepper1.personalTitle,
                personalFirstname: this.getStepper1.personalFirstname,
                personalDob: new FormControl(new Date(this.getStepper1.personalDob)),
                personalrelationship: this.getStepper1.personalrelationship,
                personalGender: this.getStepper1.personalGender,
                personalAddress: this.getStepper1.personalAddress,
                personalAddress2: this.getStepper1.personalAddress2,
                personalPincode: this.getStepper1.personalPincode,
                personalCity: this.getStepper1.personalCity,
                personalCityName: this.getStepper1.personalCityName,
                personalAadhar: this.getStepper1.personalAadhar,
                personalArea: this.getStepper1.personalArea,
                personalAreaName: this.getStepper1.personalAreaName,
                personalState: this.getStepper1.personalState,
                personalEmail: this.getStepper1.personalEmail,
                personalMobile: this.getStepper1.personalMobile,
                personalGst: this.getStepper1.personalGst,
                travelPurpose: this.getStepper1.travelPurpose,
                travelPurposeName: this.getStepper1.travelPurposeName,
                personalgstIdType: this.getStepper1.personalgstIdType,
                placeOfVisit: '',
                placeOfVisitName: '',
                physicianName: this.getStepper1.physicianName,
                physicianContactNumber: this.getStepper1.physicianContactNumber,
                travelDeclaration: this.getStepper1.travelDeclaration
            });

            this.personal.controls['placeOfVisit'].patchValue(this.getStepper1.placeOfVisit);
            if (this.getStepper1.travelDeclaration) {
                this.AcceptDeclaration = true;
            } else {
                this.AcceptDeclaration = false;
            }
            if(this.getStepper1.personalDob !=''){
                let age = this.ageCalculate(this.datepipe.transform(this.getStepper1.personalDob, 'y-MM-dd'));
                sessionStorage.proposerAgeForTravel = age;
            }

            if (sessionStorage.personalDobError != '' && sessionStorage.personalDobError != undefined) {
                this.personalDobError = sessionStorage.personalDobError;
            } else {
                this.personalDobError = '';
            }


            // setTimeout(() => {
            //     if (this.getStepper1.personalPincode != '') {
            //         this.getPostal(this.getStepper1.personalPincode, 'personal');
            //         this.personal.controls['personalPincode'].setValue(this.getStepper1.personalPincode);
            //         this.personal.controls['personalState'].setValue(this.getStepper1.personalState);
            //         this.personal.controls['personalCity'].setValue(this.getStepper1.personalCity);
            //
            //     } },1000);
        }



        if (sessionStorage.stepper2DetailsForTravel != '' && sessionStorage.stepper2DetailsForTravel != undefined) {
            this.getStepper2 = JSON.parse(sessionStorage.stepper2DetailsForTravel);
            for (let i = 0; i < this.getStepper2.items.length; i++) {
                this.insureArray['controls'].items['controls'][i]['controls'].insurerTitle.patchValue(this.getStepper2.items[i].insurerTitle);
                this.insureArray['controls'].items['controls'][i]['controls'].insurerName.patchValue(this.getStepper2.items[i].insurerName);
                this.insureArray['controls'].items['controls'][i]['controls'].insurerGender.patchValue(this.getStepper2.items[i].insurerGender);
                this.insureArray['controls'].items['controls'][i]['controls'].insurerDob.patchValue(this.datepipe.transform(this.getStepper2.items[i].insurerDob, 'y-MM-dd'));
                this.insureArray['controls'].items['controls'][i]['controls'].insurerRelationship.patchValue(this.getStepper2.items[i].insurerRelationship);
                this.insureArray['controls'].items['controls'][i]['controls'].insurerRelationshipName.patchValue(this.getStepper2.items[i].insurerRelationshipName);
                this.insureArray['controls'].items['controls'][i]['controls'].assigneeName.patchValue(this.getStepper2.items[i].assigneeName);
                this.insureArray['controls'].items['controls'][i]['controls'].assigneeRelationship.patchValue(this.getStepper2.items[i].assigneeRelationship);
                this.insureArray['controls'].items['controls'][i]['controls'].assigneeRelationshipName.patchValue(this.getStepper2.items[i].assigneeRelationshipName);
                this.insureArray['controls'].items['controls'][i]['controls'].passportNumber.patchValue(this.getStepper2.items[i].passportNumber);
                this.insureArray['controls'].items['controls'][i]['controls'].passportExpiry.patchValue(this.getStepper2.items[i].passportExpiry);
                this.insureArray['controls'].items['controls'][i]['controls'].visaType.patchValue(this.getStepper2.items[i].visaType);
                this.insureArray['controls'].items['controls'][i]['controls'].visaTypeName.patchValue(this.getStepper2.items[i].visaTypeName);
                this.insureArray['controls'].items['controls'][i]['controls'].assigneeName.patchValue(this.getStepper2.items[i].assigneeName);
                this.insureArray['controls'].items['controls'][i]['controls'].illness.patchValue(this.getStepper2.items[i].illness);
            }
            // for (let i = 0; i < this.getStepper2.items.length; i++) {
            //     if (this.getStepper2.items[i].personalPincode != '') {
            //         // this.insureArray['controls'].items['controls'][i]['controls'].pCityHide.patchValue(true);
            //         this.insureArray['controls'].items['controls'][i]['controls'].personalCity.patchValue(this.getStepper2.items[i].personalCity);
            //         this.insureArray['controls'].items['controls'][i]['controls'].personalPincode.patchValue(this.getStepper2.items[i].personalPincode);
            //         this.insureArray['controls'].items['controls'][i]['controls'].personalState.patchValue(this.getStepper2.items[i].personalState);
            //     }
            // }
        }
    }

    //Personal Details
    personalDetails(stepper: MatStepper, value) {
        sessionStorage.stepper1DetailsForTravel = '';
        sessionStorage.stepper1DetailsForTravel = JSON.stringify(value);
        this.personalData = value;
        console.log(this.personalData,'hgfsdfdsjfg');
       // this.personalData.personalDob = this.datepipe.transform(this.personalData.personalDob, 'MMM d, y');
        console.log(this.personalDobError);
        if (this.personal.valid && this.personalDobError == '') {
            if (sessionStorage.proposerAgeForTravel >= 18 || sessionStorage.proposerAgeForTravel <= 90 ) {
                if((this.personal.controls['physicianName'].value == '' &&  this.personal.controls['physicianContactNumber'].value == '') || (this.personal.controls['physicianName'].value != '' &&  this.personal.controls['physicianContactNumber'].value != '')){
                    if((this.personal.controls['personalgstIdType'].value == '' && this.personal.controls['personalGst'].value == '') || (this.personal.controls['personalgstIdType'].value != '' && this.personal.controls['personalGst'].value != '')){
                        stepper.next();
                        this.topScroll();
                        this.nextStep();

                    } else {
                        if(this.personal.controls['personalgstIdType'].value != '' || this.personal.controls['personalGst'].value != ''){
                            this.toastr.error('Enter GST Number');

                        }

                    }

                } else {
                    if (this.personal.controls['physicianName'].value == '' || this.personal.controls['physicianContactNumber'].value == '') {
                        this.toastr.error('Complete Physician Details');
                    }
                }

            } else {
                this.toastr.error('Proposer age should be 18 or above');
            }
        }
    }
    //Create Proposal
    createProposal(stepper: MatStepper, value, key) {
        // if (this.patternError == '') {
            sessionStorage.stepper2DetailsForTravel = '';
            sessionStorage.stepper2DetailsForTravel = JSON.stringify(value);
            this.insurerData = value;
            this.allInsuredData = [];
            for (let i = 0; i < value.items.length; i++) {
                this.allInsuredData.push({
                    'title': value.items[i].insurerTitle,
                    'name': value.items[i].insurerName,
                    'dob': this.datepipe.transform(value.items[i].insurerDob, 'MMM d, y'),
                    'sex': value.items[i].insurerGender,
                    'relationshipId': value.items[i].insurerRelationship,
                    'passportNumber': value.items[i].passportNumber,
                    'visaType': value.items[i].visaType,
                    'passportExpiry': this.datepipe.transform(value.items[i].passportExpiry, 'MMM d, y'),
                    'assigneeName': value.items[i].assigneeName,
                    'assigneeRelationshipId': value.items[i].assigneeRelationship,
                    'illness': value.items[i].illness.toString()
                });


            }

            if (this.insureArray.valid) {
                let valid = false;
                console.log(this.personalData, 'firstform');
                const data = {
                    'platform': 'web',
                    'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
                    'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
                    'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
                    'title': this.personalData.personalTitle,
                    'gender': this.personalData.personalGender,
                    'enquiry_id': this.getEnquiryDetails.enquiry_id,
                    'product_id': this.getTravelPremiumList.product_id,
                    'plan_name': this.getTravelPremiumList.plan_name,
                    'sum_insured_amount': this.getTravelPremiumList.sum_insured_amount,
                    'proposal_id': sessionStorage.travel_proposal_id == '' || sessionStorage.travel_proposal_id == undefined ? '' : sessionStorage.travel_proposal_id,
                    'travelStartOn': this.datepipe.transform(this.getEnquiryDetails.start_date, 'MMM d, y'),
                    'travelEndOn': this.datepipe.transform(this.getEnquiryDetails.end_date, 'MMM d, y'),
                    'proposerName': this.personalData.personalFirstname,
                    'proposerDob': this.datepipe.transform(this.personalData.personalDob, 'MMM d, y'),
                    'proposerEmail': this.personalData.personalEmail,
                    'gstIdNumber': this.personalData.personalGst,
                    'proposerPhone': this.personalData.personalMobile,
                    'planId': this.getTravelPremiumList.plan_id,
                    'travelPurposeId': this.personalData.travelPurpose,
                    'aadharIdNumber': this.personalData.personalAadhar,
                    'gstType': this.personalData.personalgstIdType,
                    'placeOfVisit': this.personalData.placeOfVisit.toString(),
                    'proposerAddressOne': this.personalData.personalAddress,
                    'proposerAddressTwo': this.personalData.personalAddress2,
                    'proposerAreaId': this.personalData.personalArea,
                    'proposerAreaValue': this.personalData.personalAreaName,
                    'proposerPincode': this.personalData.personalPincode,

                    'physicianName': this.personalData.physicianName,
                    'physicianContactNumber': this.personalData.physicianContactNumber,
                    'travelDeclaration': this.personalData.travelDeclaration ? 1 : 0,

                    'personalCity': this.personalData.personalCity,
                    'personalCityValue': this.personalData.personalCityName,
                    'personalState': this.personalData.personalState,
                    'insureds': this.allInsuredData

                }
                let ageValidate = [];
                for(let i=0;i<this.insurerData.items.length; i++) {
                    if (this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.value != '') {
                        ageValidate.push(1);
                    } else if (this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.value == '') {
                        ageValidate.push(2);
                    }
                }
                if (ageValidate.includes(1)) {
                    this.toastr.error(' Insured Date Of Birth should be at least 5 months old');
                } else if(ageValidate.includes(2)){
                    valid = true;
                }

                if (valid) {
                    this.settings.loadingSpinner = true;
                    this.travelservice.createTravelProposal(data).subscribe(
                        (successData) => {
                            this.proposalSuccess(successData, stepper);
                        },
                        (error) => {
                            this.proposalFailure(error);
                        }
                    );
                }
            }
        // }

    }

    public proposalSuccess(successData, stepper) {
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {
            stepper.next();
            this.topScroll();
            this.nextStep();
            this.summaryData = successData.ResponseObject;
            console.log(this.summaryData, 'this.summaryData');
            sessionStorage.summaryData = JSON.stringify(this.summaryData);
            sessionStorage.travel_proposal_id = this.summaryData.proposal_id;
            this.proposerFormData = this.personal.value;
            this.insuredFormData = this.insureArray.value.items;
            sessionStorage.proposerFormData = JSON.stringify(this.proposerFormData);
            sessionStorage.insuredFormData = JSON.stringify(this.insuredFormData);
            console.log(this.proposerFormData,' this.proposerFormData');
            let places = [];
            for(let j=0; j < this.proposerFormData.placeOfVisit.length; j++) {
                for(let i=0; i < this.placeOfVisiLists.length; i++){
                    if (this.proposerFormData.placeOfVisit[j] == this.placeOfVisiLists[i].country_code) {
                        places.push(this.placeOfVisiLists[i].country_name);
                    }
                }
            }
            console.log(places, 'places');
            this.proposerFormData.placeOfVisitName = places;
            console.log( this.proposerFormData.placeOfVisitName,'iuhgdk');
            console.log(this.proposerFormData.placeOfVisit,'code');
        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }
    public proposalFailure(error) {

    }

    // pincode list
    getPostal(pin, title) {
        const data = {
            'platform': 'web',
            'pincode': pin,
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        if (pin.length == 6) {
            this.travelservice.getPostal(data).subscribe(
                (successData) => {
                    this.getpostalSuccess(successData,title);
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
                    this.toastr.error('In valid Pincode');
                    this.personal.controls['personalState'].setValue('');
                    this.personal.controls['personalCity'].setValue('');
                    this.personalCitys = {};
                } else {
                    this.personal.controls['personalState'].setValue(this.response.state);
                    this.personalCitys = this.response.city;
                }
                sessionStorage.personalCitys = JSON.stringify(this.personalCitys);
            }
        } else {
            this.toastr.error('In valid Pincode');
            if (title == 'personal') {
                this.personalCitys = {};
                sessionStorage.personalCitys = '';
                this.personal.controls['personalState'].setValue('');
                this.personal.controls['personalCity'].setValue('');
            }
        }
    }
    public getpostalFailure(error) {
        console.log(error);
    }
    // area list
    getArea() {
        this.personal.controls['personalCityName'].patchValue(this.personalCitys[this.personal.controls['personalCity'].value]);

        const data = {
            'platform': 'web',
            'pincode': this.personal.controls['personalPincode'].value,
            'city_id': this.personal.controls['personalCity'].value
        }
        this.travelservice.getAreaList(data).subscribe(
            (successData) => {
                this.getAreaSuccess(successData);
            },
            (error) => {
                this.getAreaFailure(error);
            }
        );
    }
    public getAreaSuccess(successData) {
        if (successData.IsSuccess == true) {
            this.areaList = successData.ResponseObject;
            sessionStorage.areaList = JSON.stringify(this.areaList);
        }
    }
    public getAreaFailure(error) {
    }
    selectArea() {
        this.personal.controls['personalAreaName'].patchValue(this.areaList[this.personal.controls['personalArea'].value]);
    }
    // selectCity() {
    //     this.personal.controls['personalCityName'].patchValue(this.personalCitys[this.personal.controls['personalCity'].value]);
    // }
    selectPurpose() {
        this.personal.controls['travelPurposeName'].patchValue(this.travelPurposeLists[this.personal.controls['travelPurpose'].value]);
    }

    // placePurpose(){
    //     this.personal.controls['placeOfVisitName'].patchValue(this.placeOfVisiLists[this.personal.controls['placeOfVisit'].value]);
    //
    // }

//summary city detail
    getPostalSummary(pin, title) {
        this.sumPin = pin;
        this.sumTitle = title;
        const data = {
            'platform': 'web',
            'user_id': '0',
            'role_id': '4',
            'pincode': this.sumPin
        }
        if (this.pin.length == 6) {
            this.proposalservice.getPostalReligare(data).subscribe(
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

    placeOfVisits() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0'

        }
        this.travelservice.getplaceOfVisit(data).subscribe(
            (successData) => {
                this.placeOfVisitSuccess(successData);
            },
            (error) => {
                this.placeOfVisitFailure(error);
            }
        );
    }
    public placeOfVisitSuccess(successData) {
        if (successData.IsSuccess) {
            this.placeOfVisiLists = successData.ResponseObject;
            console.log(this.placeOfVisiLists,'this.placeOfVisiLists' );

            this.placevisting = JSON.parse(sessionStorage.travelPlan);
            let getCpountryCode = [];
            this.placevisting.forEach((selectedData) => {
                console.log(selectedData, 'selectedData');
                let i = this.placeOfVisiLists.findIndex(getIndex => getIndex.country_name == selectedData);
                getCpountryCode.push(this.placeOfVisiLists[i].country_code);
            });
            console.log(getCpountryCode);
            this.personal.controls['placeOfVisit'].patchValue(getCpountryCode);



        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }
    public placeOfVisitFailure(error) {
    }
    gstIdList() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0'

        }
        this.travelservice.getGstId(data).subscribe(
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


    visaTypeList() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0'

        }
        this.travelservice.getVisaTypeList(data).subscribe(
            (successData) => {
                this.visaTypeSuccess(successData);
            },
            (error) => {
                this.visaTypeFailure(error);
            }
        );
    }
    public visaTypeSuccess(successData) {
        if (successData.IsSuccess) {
            this.visaTypeAllList = successData.ResponseObject;
        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }
    public visaTypeFailure(error) {

    }


    travelPurposeList() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0'

        };
        this.travelservice.gettravelPurposeLists(data).subscribe(
            (successData) => {
                this.travelPurposeListsSuccess(successData);
            },
            (error) => {
                this.travelPurposeListsFailure(error);
            }
        );
    }
    public travelPurposeListsSuccess(successData) {
        if (successData.IsSuccess) {
            this.travelPurposeLists = successData.ResponseObject;
            console.log(this.travelPurposeLists);
        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }
    public travelPurposeListsFailure(error) {

    }


    insurerRelationship() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0'

        }
        this.travelservice.getInsurerRelationshipList(data).subscribe(
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
            this.insureRelationList = successData.ResponseObject;
        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }

    public setRelationshipFailure(error) {
    }

    assigneeRelationship() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0'
        }
        this.travelservice.getAssigneeRelationshipList(data).subscribe(
            (successData) => {
                this.assigneeRelationshipSuccess(successData);
            },
            (error) => {
                this.assigneeRelationshipFailure(error);
            }
        );
    }

    public assigneeRelationshipSuccess(successData) {
        if (successData.IsSuccess) {
            this.assigneeRelationList = successData.ResponseObject;
        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }

    public assigneeRelationshipFailure(error) {
    }

    getIlnessDetails() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0'
        }
        this.travelservice.getIlnessList(data).subscribe(
            (successData) => {
                this.getIlnessDetailSuccess(successData);
            },
            (error) => {
                this.getIlnessDetailFailure(error);
            }
        );
    }

    public getIlnessDetailSuccess(successData) {
        if (successData.IsSuccess) {
            this.preExistingDisease = successData.ResponseObject;
        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }

    public getIlnessDetailFailure(error) {
    }


    add(event: any){
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

    passPortValidate(event: any){
        this.validation.passPortValidate(event);

    }
    validateNospace(event: any){
       // this.validation.nameValidateNospace(event);

    }

    alternateChange(event) {
        if (event.target.value.length == 10) {
            if(event.target.value == this.personal.get('personalMobile').value) {
                this.mobileNumber = 'Alternate number should be different from mobile number';
            } else {
                this.mobileNumber = '';
            }
        } else {
            // this.mobileNumber = 'false';
        }
        sessionStorage.mobileNumberForTravel = this.mobileNumber;
    }

    public payNow() {
        const data = {
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
            'platform': 'web',
            'reference_id' :  this.summaryData.referenceId,
            'proposal_id': sessionStorage.travel_proposal_id,
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.settings.loadingSpinner = true;
        this.travelservice.getPolicyToken(data).subscribe(
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
            this.toastr.success('Proposal created successfully!!');
            this.paymentGatewayData = successData.ResponseObject;
            this.window.location.href = this.paymentGatewayData.payment_gateway_url;
           // this.lastStepper.next();

        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }

    public getPolicyTokenFailure(error) {
        this.settings.loadingSpinner = false;
    }
    resetofgstType() {
        this.personal.controls['personalgstIdType'].patchValue('');
    }
// pay Later


    payLater(){
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
            'title': this.personalData.personalTitle,
            'gender': this.personalData.personalGender,
            'enquiry_id': this.getEnquiryDetails.enquiry_id,
            'product_id': this.getTravelPremiumList.product_id,
            'plan_name': this.getTravelPremiumList.plan_name,
            'sum_insured_amount': this.getTravelPremiumList.sum_insured_amount,
            'proposal_id': sessionStorage.travel_proposal_id == '' || sessionStorage.travel_proposal_id == undefined ? '' : sessionStorage.travel_proposal_id,
            'travelStartOn': this.datepipe.transform(this.getEnquiryDetails.start_date, 'MMM d, y'),
            'travelEndOn': this.datepipe.transform(this.getEnquiryDetails.end_date, 'MMM d, y'),
            'proposerName': this.personalData.personalFirstname,
            'proposerDob': this.datepipe.transform(this.personalData.personalDob, 'MMM d, y'),
            'proposerEmail': this.personalData.personalEmail,
            'gstIdNumber': this.personalData.personalGst,
            'proposerPhone': this.personalData.personalMobile,
            'planId': this.getTravelPremiumList.plan_id,
            'travelPurposeId': this.personalData.travelPurpose,
            'aadharIdNumber': this.personalData.personalAadhar,
            'gstType': this.personalData.personalgstIdType,
            'placeOfVisit': this.personalData.placeOfVisit.toString(),
            'proposerAddressOne': this.personalData.personalAddress,
            'proposerAddressTwo': this.personalData.personalAddress2,
            'proposerAreaId': this.personalData.personalArea,
            'proposerAreaValue': this.personalData.personalAreaName,
            'proposerPincode': this.personalData.personalPincode,
            'physicianName': this.personalData.physicianName,
            'physicianContactNumber': this.personalData.physicianContactNumber,
            'travelDeclaration': this.personalData.travelDeclaration ? 1 : 0,
            'personalCity': this.personalData.personalCity,
            'personalCityValue': this.personalData.personalCityName,
            'personalState': this.personalData.personalState,
            'insureds': this.allInsuredData

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
        }
    }
    public getBackResFailure(successData) {
    }
}
