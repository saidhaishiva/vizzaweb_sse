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
import {ActivatedRoute} from '@angular/router';
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
    selector: 'app-travel-shriram-proposal',
    templateUrl: './travel-shriram-proposal.component.html',
    styleUrls: ['./travel-shriram-proposal.component.scss'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
})
export class TravelShriramProposalComponent implements OnInit {


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
    public relationshipList: any;
    public shriramCitys: any;
    public today: any;
    public declaration: boolean;
    public acceptSummaryDeclaration: boolean;
    public summaryData: any;
    public proposerFormData: any;
    public nomineeFormData: any;
    public paymentData: any;
    public proposalDtails: any;
    public insurerDtails: any;
    public webhost: any;
    public travel_shriram_proposal_id: any;
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
    public shriramStates : any;
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
    public nomineeData: any;
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
    public relationshipcode : any;
    public medicalStatus : any;
    public arr : any;
    public nomineeRelationList : any;
    array: any;
    placeOfVisiLists: any;
    assigneeRelationList: any;
    travelPurposeLists: any;
    preExistingDisease: any;
    personalDobError: any;
    mediReportDtError: any;
    getAge: any;
    paymentGatewayData: any;
    visaTypeAllList: any;
    placeOfVisitNames: any;
    travelPurposeName: any;
    occupationLists: any;
    allPremiumLists: any;
    currentStep: any;
    public sameRelationship: any;
    public getEnquiryDetails: any;
    public proposalId: any;
    public payLaterr: any;
    public proposal_Id: any;
    public status: any;
    constructor(public travelservice: TravelService, public proposalservice: HealthService,public route: ActivatedRoute, public validation: ValidationService, public datepipe: DatePipe, private toastr: ToastrService, public appSettings: AppSettings, public dialog: MatDialog,
                public config: ConfigurationService, public common: CommonService, public fb: FormBuilder, public auth: AuthService, public http: HttpClient, @Inject(LOCALE_ID) private locale: string) {
        let today = new Date();
        let stepperindex = 0;
        this.route.params.forEach((params) => {
            if(params.stepper == true || params.stepper == 'true') {
                stepperindex = 2;
                if(sessionStorage.summaryData != '' && sessionStorage.summaryData != undefined){
                    this.summaryData = JSON.parse(sessionStorage.summaryData);
                    this.proposerFormData = JSON.parse(sessionStorage.proposerFormData);
                    this.nomineeFormData = JSON.parse(sessionStorage.nomineeFormData);
                    this.travel_shriram_proposal_id = sessionStorage.travel_shriram_proposal_id;
                }

            }
            this.status = params.stepper;
            this.proposal_Id = params.proposalId;
            if(this.proposalId != '' || this.proposal_Id != undefined ){
                this.payLaterr = true;
                console.log(this.proposal_Id, 'this.proposalId');
                console.log(this.status, 'this.proposalId');
                // this.getBackRequest();
            }
            if(this.proposal_Id == undefined || this.proposal_Id == '') {
                this.payLaterr = false;
            }
            console.log(this.payLaterr, 'cons');

        });
        this.currentStep = stepperindex;
        console.log(this.currentStep, 'this.currentStep');

        this.today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
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
        this.travel_shriram_proposal_id = 0;
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
            firstname: ['', Validators.required],
            gender: ['', Validators.compose([Validators.required])],
            dob: ['', Validators.compose([Validators.required])],
            purposeofVisit: ['', Validators.required],
            occupation: ['', Validators.required],
            passportNumber: ['', Validators.required],
            faxNo: '',
            preExistingAilments: '',
            handicapped: ['', Validators.required],
            engagedSports: 'N',
            address: ['', Validators.required],
            address2: '',
            address3: '',
            pincode: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            stateName: '',
            cityName: '',
            email: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
            mobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
            phone: '',
            physicianName: ['', Validators.required],
            physicianAddress: ['', Validators.required],
            medicalRepAttach: ['', Validators.required],
            medicalRepDate: ['', Validators.required],
        });
        this.nomineeDetails = this.fb.group({
            'nomineeName': ['', Validators.required],
            'nomineeRelationship': ['', Validators.required],
            'nomineeRelationshipName': ''
        });
        this.personal.controls['handicapped'].patchValue('N');
        this.personal.controls['handicapped'].patchValue('N');
    }

    ngOnInit() {
        this.nomineeRelationshipList();
        this.travelPurposeOfVisit();
        this.occupationList();
        this.getStateList();
        // this.getIlnessDetails();
        this.getTravelPremiumList = JSON.parse(sessionStorage.travelPremiumList);
        let enqList = JSON.parse(sessionStorage.enquiryDetailsTravel);
        this.getEnquiryDetails = enqList[0];
        this.allPremiumLists = JSON.parse(sessionStorage.allTravelPremiumLists);
        this.insurePersons = this.getEnquiryDetails.family_details;
        this.sessionData();
        this.sameRelationship = 'SELF';
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
    canDeactivate() {
        return this.travel_shriram_proposal_id;
    }
    public onAlternative(event: any) {
        if (event.charCode !== 0) {
            const pattern =/[0-9-]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }

    // setStep(index) {
    //     this.step = index;
    // }
    //
    // nextStep() {
    //     this.step++;
    // }
    //
    // prevStep() {
    //     this.step--;
    // }
    //
    //
    // backAll(){
    //     this.topScroll();
    //     this.prevStep();

    addEvent(event, type) {
        if (event.value != null) {
            let selectedDate = '';
            this.proposerAge = '';
            let dob = '';
            if (typeof event.value._i == 'string') {
                const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
                if (pattern.test(event.value._i) && event.value._i.length == 10) {

                    if (type == 'proposor') {
                        this.personalDobError = '';
                    } else {
                        this.mediReportDtError = '';
                    }

                } else {
                    if (type == 'proposor') {
                        this.personalDobError = 'Enter Valid Dob';
                    } else {
                        this.mediReportDtError = 'Enter Valid Report Date';
                    }

                }
                selectedDate = event.value._i;
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                if (selectedDate.length == 10 && type == 'proposor') {
                    this.proposerAge = this.ageCalculate(dob);
                    sessionStorage.proposerAgeForTravel = this.proposerAge;
                }

            } else if (typeof event.value._i == 'object') {
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                if (dob.length == 10 && type == 'proposor') {
                    this.proposerAge = this.ageCalculate(dob);
                    sessionStorage.proposerAgeForTravel = this.proposerAge;
                }
                this.personalDobError = '';
                this.mediReportDtError = '';
            }

        }
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
    // ageValidationInsurer(i, type) {
    //     if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value < 150) {
    //         this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Insurer Date of birth date should be atleast 5 months old');
    //     } else {
    //         this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
    //         this.arr.push(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value);
    //     }
    // }

    stepback() {
        this.back = true;
    }
    quesback() {
        this.back = false;
    }
    sessionData() {
        if (sessionStorage.shriramCitys != '' && sessionStorage.shriramCitys != undefined) {
            this.shriramCitys = JSON.parse(sessionStorage.shriramCitys);
        }
        if (sessionStorage.stepper1ShriramTravel != '' && sessionStorage.stepper1ShriramTravel != undefined) {
            this.getStepper1 = JSON.parse(sessionStorage.stepper1ShriramTravel);
            this.personal = this.fb.group({
                firstname: this.getStepper1.firstname,
                gender: this.getStepper1.gender,
                dob: this.datepipe.transform(this.getStepper1.dob, 'y-MM-dd'),
                purposeofVisit: this.getStepper1.purposeofVisit,
                occupation: this.getStepper1.occupation,
                passportNumber: this.getStepper1.passportNumber,
                faxNo: this.getStepper1.faxNo,
                preExistingAilments: this.getStepper1.preExistingAilments,
                handicapped: this.getStepper1.handicapped,
                engagedSports: this.getStepper1.engagedSports,
                address: this.getStepper1.address,
                address2: this.getStepper1.address2,
                address3: this.getStepper1.address3,
                pincode: this.getStepper1.pincode,
                city: this.getStepper1.city,
                cityName: this.getStepper1.cityName,
                state: this.getStepper1.state,
                stateName: this.getStepper1.stateName,
                email: this.getStepper1.email,
                mobile: this.getStepper1.mobile,
                phone: this.getStepper1.phone,
                physicianName: this.getStepper1.physicianName,
                physicianAddress: this.getStepper1.physicianAddress,
                medicalRepAttach: this.getStepper1.medicalRepAttach,
                medicalRepDate: this.datepipe.transform(this.getStepper1.medicalRepDate, 'y-MM-dd')
            });
        }
        if (sessionStorage.stepper2ShriramTravel != '' && sessionStorage.stepper2ShriramTravel != undefined) {
            this.getStepper2 = JSON.parse(sessionStorage.stepper2ShriramTravel);
            this.nomineeDetails = this.fb.group({
                nomineeName: this.getStepper2.nomineeName,
                nomineeRelationship: this.getStepper2.nomineeRelationship,
                nomineeRelationshipName: this.getStepper2.nomineeRelationshipName
            });
        }
        if (sessionStorage.travel_shriram_proposal_id != '' && sessionStorage.travel_shriram_proposal_id != undefined) {
            this.travel_shriram_proposal_id = sessionStorage.travel_shriram_proposal_id;
        }

    }
    //personal city detail
    getPostal(pin, title) {
        this.pin = pin;
        this.title = title;
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId(),
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
            'pincode': this.pin
        }
        if (this.pin.length == 6) {
            this.travelservice.getPostalShriram(data).subscribe(
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
            if (successData.IsSuccess) {

            } else if(successData.IsSuccess != true) {
                this.toastr.error('In valid Pincode');
            }
        }
    }
    public getpostalFailure(error) {
    }

    // city lists
    selectedSate() {
        this.personal.controls['stateName'].patchValue(this.shriramStates[this.personal.controls['state'].value]);
        console.log(this.personal.value);

        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId(),
            'state_id': '',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0'
        }
        data.state_id = this.personal.controls['state'].value;
        this.travelservice.getShriramCityLists(data).subscribe(
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
            this.shriramCitys = successData.ResponseObject;
            sessionStorage.shriramCitys = JSON.stringify(this.shriramCitys);
        }
    }
    public getCityFailure(error) {
    }
    selectedCity(){
        this.personal.controls['cityName'].patchValue(this.shriramCitys[this.personal.controls['city'].value]);
        console.log(this.personal.value);
    }
    // state lists
    getStateList() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId(),
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0'
        }
        this.travelservice.getShriramStateLists(data).subscribe(
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
            this.shriramStates = successData.ResponseObject;
        }
    }
    public getStateFailure(error) {
    }

    travelPurposeOfVisit() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0'

        }
        this.travelservice.getShriramPurposeOfTravel(data).subscribe(
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
        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }
    public travelPurposeListsFailure(error) {
    }
    occupationList() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0'

        }
        this.travelservice.getOccupationList(data).subscribe(
            (successData) => {
                this.travelOccupationSuccess(successData);
            },
            (error) => {
                this.travelOccupationFailure(error);
            }
        );
    }
    public travelOccupationSuccess(successData) {
        if (successData.IsSuccess) {
            this.occupationLists = successData.ResponseObject;
        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }
    public travelOccupationFailure(error) {
    }

    nomineeRelationshipList() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0'

        }
        this.travelservice.getShriramNomineeRelationship(data).subscribe(
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
            this.nomineeRelationList = successData.ResponseObject;
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
    selectNomineeRelation(){
        this.nomineeDetails.controls['nomineeRelationshipName'].patchValue(this.nomineeRelationList[this.nomineeDetails.controls['nomineeRelationship'].value]);
        console.log(this.nomineeDetails.value);

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
    //Personal Details
    personalDetails(stepper: MatStepper, value) {
        sessionStorage.stepper1ShriramTravel = '';
        sessionStorage.stepper1ShriramTravel = JSON.stringify(value);
        this.personalData = value;
        // if (this.personal.valid) {
        // if (sessionStorage.proposerAgeForTravel >= 18) {
        //     stepper.next();
        //     this.nextStep();
        //     this.topScroll();
        //
        // } else {
        //     this.toastr.error('Proposer age should be 18 or above');
        // }
        // }
        if (this.personal.valid) {
            if (sessionStorage.proposerAgeForTravel >= 18) {
                stepper.next();
                this.topScroll();
            } else {
                this.toastr.error('Proposer age should be 18 or above');
            }
        }
    }
    //Create Proposal
    createProposal(stepper: MatStepper, value) {
        sessionStorage.stepper2ShriramTravel = '';
        sessionStorage.stepper2ShriramTravel = JSON.stringify(value);
        this.nomineeData = value;
        if (this.nomineeDetails.valid) {
            const data = {
                'platform': 'web',
                'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
                'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
                'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
                'enquiry_id': this.getTravelPremiumList.enquiry_id,
                'product_id': this.getTravelPremiumList.product_id,
                'plan_name': this.getTravelPremiumList.plan_name,
                'sum_insured_amount': this.getTravelPremiumList.sum_insured_amount,
                'proposal_id': sessionStorage.travel_shriram_proposal_id == '' || sessionStorage.travel_shriram_proposal_id == undefined ? '' : sessionStorage.travel_shriram_proposal_id,
                'objTravelProposalEntryETT': {
                    'PolicyFromDt': this.datepipe.transform(this.getEnquiryDetails.start_date, 'dd-MM-yyy'),
                    'PolicyToDt': this.datepipe.transform(this.getEnquiryDetails.end_date, 'dd-MM-yyy'),
                    'DurationOfTrip': this.getEnquiryDetails.day_count.toString(),
                    'InsuredName': this.personalData.firstname,
                    'Address1':  this.personalData.address,
                    'Address2': this.personalData.address2,
                    'Address3': this.personalData.address3,
                    'State': this.personalData.state,
                    'City': this.personalData.city,
                    'PinCode': this.personalData.pincode,
                    'TelephoneNo':  this.personalData.phone,
                    'FaxNo':  this.personalData.faxNo,
                    'EmailID':  this.personalData.email,
                    'MobileNumber': this.personalData.mobile,
                    'DateOfBirth': this.datepipe.transform(this.personalData.dob, 'dd-MM-yyy'),
                    'Gender': this.personalData.gender,
                    "PassportNumber": this.personalData.passportNumber,
                    // "CountryOfVisit": this.getEnquiryDetails.travel_place, //From main page this.getTravelPremiumList.plan_continent,
                    "PlanType": this.getTravelPremiumList.plan_id,
                    "PurposeOfVisit": this.personalData.purposeofVisit,
                    "AssigneeName": this.nomineeData.nomineeName,
                    "AssigneeRelationShip": this.nomineeData.nomineeRelationship,
                    "Occupation": this.personalData.occupation,
                    "PreExistingAilments": this.personalData.preExistingAilments,
                    "HandicappedYN": this.personalData.handicapped,
                    "CountriesTobeVisit": this.getTravelPremiumList.travel_place,
                    "EngagedSportsYN": this.personalData.engagedSports,
                    "NameofPhysician": this.personalData.physicianName,
                    "AddressofPhysician": this.personalData.physicianAddress,
                    "MediReptAttach": this.personalData.medicalRepAttach,
                    "MediReptDT": this.datepipe.transform(this.personalData.medicalRepDate, 'dd-MM-yyy'),
                    "OrgPhysiciansAttach": "",
                    "TravelerType": "IND"//Set Static value - Individul
                }
            }
            this.settings.loadingSpinner = true;
            this.travelservice.createShriramTravelProposal(data).subscribe(
                (successData) => {
                    this.proposalSuccess(successData, stepper);
                },
                (error) => {
                    this.proposalFailure(error);
                }
            );
        }
    }
    public proposalSuccess(successData, stepper) {
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {
            this.toastr.success('Proposal created successfully!!');
            stepper.next();
            this.nextStep();

            this.summaryData = successData.ResponseObject;
            sessionStorage.summaryData = JSON.stringify(this.summaryData);
            sessionStorage.travel_shriram_proposal_id = this.summaryData.ProposalId;
            this.proposerFormData = this.personal.value;
            this.nomineeFormData = this.nomineeDetails.value;
            sessionStorage.proposerFormData = JSON.stringify(this.proposerFormData);
            sessionStorage.nomineeFormData = JSON.stringify(this.nomineeFormData);

        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }
    public proposalFailure(error) {
        this.settings.loadingSpinner = false;
    }
    topScroll() {
        document.getElementById('main-content').scrollTop = 0;
    }

    PaymentPage(stepper: MatStepper) {
        stepper.next();
    }


}

