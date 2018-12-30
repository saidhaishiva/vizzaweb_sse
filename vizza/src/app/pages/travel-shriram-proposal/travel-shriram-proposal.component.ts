
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
import {ProposalService} from '../../shared/services/proposal.service';
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
    mediReceiptDtError: any;
    getAge: any;
    paymentGatewayData: any;
    visaTypeAllList: any;
    placeOfVisitNames: any;
    travelPurposeName: any;
    occupationLists: any;
    allPremiumLists: any;
    constructor(public travelservice: TravelService, public proposalservice: ProposalService, public datepipe: DatePipe, private toastr: ToastrService, public appSettings: AppSettings, public dialog: MatDialog,
                public config: ConfigurationService, public common: CommonService, public fb: FormBuilder, public auth: AuthService, public http: HttpClient, @Inject(LOCALE_ID) private locale: string) {
        let today = new Date();
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
            title: ['', Validators.required],
            firstname: ['', Validators.required],
            gender: ['', Validators.compose([Validators.required])],
            dob: ['', Validators.compose([Validators.required])],
            purposeofVisit: ['', Validators.required],
            occupation: ['', Validators.required],
            passportNumber: ['', Validators.required],
            faxNo: '',
            preExistingAilments: '',
            handicapped: ['', Validators.required],
            engagedSports: '',
            address: ['', Validators.required],
            address2: '',
            address3: '',
            pincode: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
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
            'nomineeRelationship': ['', Validators.required]
        });
    }

    ngOnInit() {
        this.nomineeRelationshipList();
        this.travelPurposeOfVisit();
        this.occupationList();
        // this.getIlnessDetails();
        this.getTravelPremiumList = JSON.parse(sessionStorage.travelPremiumList);
        this.allPremiumLists = JSON.parse(sessionStorage.allTravelPremiumLists);
        this.insurePersons = this.getTravelPremiumList.family_details;
        this.sessionData();
    }
    setStep(index: number) {
        this.step = index;
    }
    prevStep() {
        this.step--;
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
            const pattern =/[0-9-]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }

    addEvent(event, type) {
        if (event.value != null) {
            let selectedDate = '';
            this.proposerAge = '';
            let dob = '';
            if (typeof event.value._i == 'string') {
                const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
                if (pattern.test(event.value._i) && event.value._i.length == 10) {

                    console.log(event.value._i.length, 'gggg');

                    if (type == 'proposor') {
                        this.personalDobError = '';
                    } else {
                        this.mediReceiptDtError = '';
                    }

                } else {
                    if (type == 'proposor') {
                        this.personalDobError = 'Enter Valid Dob';
                    } else {
                        this.mediReceiptDtError = 'Enter Valid Dob';
                    }

                }
                selectedDate = event.value._i;
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                if (selectedDate.length == 10) {
                    this.proposerAge = this.ageCalculate(dob);
                    sessionStorage.proposerAgeForTravel = this.proposerAge;
                }

            } else if (typeof event.value._i == 'object') {
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                console.log(dob, '////');
                console.log(type, 'typetype');
                if (dob.length == 10 && type == 'proposor') {
                    this.proposerAge = this.ageCalculate(dob);
                    sessionStorage.proposerAgeForTravel = this.proposerAge;
                }
                this.personalDobError = '';
                this.mediReceiptDtError = '';
            }
            console.log(this.proposerAge, 'this.proposerAgethis.proposerAge');

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
        if (sessionStorage.stepper1ShriramTravel != '' && sessionStorage.stepper1ShriramTravel != undefined) {
            this.getStepper1 = JSON.parse(sessionStorage.stepper1ShriramTravel);
            this.personal = this.fb.group({
                firstname: this.getStepper1.firstname,
                gender: this.getStepper1.gender,
                dob: new FormControl(new Date(this.getStepper1.dob)),
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
                state: this.getStepper1.state,
                email: this.getStepper1.email,
                mobile: this.getStepper1.mobile,
                phone: this.getStepper1.phone,
                physicianName: this.getStepper1.physicianName,
                physicianAddress: this.getStepper1.physicianAddress,
                medicalRepAttach: this.getStepper1.medicalRepAttach,
                medicalRepDate: new FormControl(new Date(this.getStepper1.medicalRepDate))
            });
        }
        if (sessionStorage.stepper2ShriramTravel != '' && sessionStorage.stepper2ShriramTravel != undefined) {
            this.getStepper2 = JSON.parse(sessionStorage.stepper2ShriramTravel);
            this.nomineeDetails = this.fb.group({
                nomineeName: this.getStepper2.nomineeName,
                nomineeRelationship: this.getStepper2.nomineeRelationship
            });
        }


    }
    //personal city detail
    getPostal(pin, title) {
        this.pin = pin;
        this.title = title;
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
                this.personal.controls['state'].setValue(this.response[0].state);
                for (let i = 0; i < this.response.length; i++) {
                    this.personalCitys.push({city: this.response[i].city});
                }
            } else if(successData.IsSuccess != true) {
                this.personal.controls['state'].setValue('');
                for (let i = 0; i < this.response.length; i++) {
                    this.personalCitys.push({city: this.response[i].city = ''});
                }
                this.toastr.error('In valid Pincode');
            }
        }
    }
    public getpostalFailure(error) {
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
        console.log(value, 'valuevaluevalue');
        if (this.personal.valid) {
            if (sessionStorage.proposerAgeForTravel >= 18) {
                stepper.next();
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
                'proposal_id': sessionStorage.travel_proposal_id == '' || sessionStorage.travel_proposal_id == undefined ? '' : sessionStorage.travel_proposal_id,
                'objTravelProposalEntryETT': {
                    'PolicyFromDt': this.datepipe.transform(this.getTravelPremiumList.start_date, 'dd-MM-yyy'),
                    'PolicyToDt': this.datepipe.transform(this.getTravelPremiumList.end_date, 'dd-MM-yyy'),
                    'DurationOfTrip': this.getTravelPremiumList.trip_duration,
                    'InsuredName': this.personalData.firstname,
                    'Address1':  this.personalData.address,
                    'Address2': this.personalData.address2,
                    'Address3': this.personalData.address3,
                    'State': "KA",
                    'City': "Dharmapuri",
                    'PinCode': "636808",
                    'TelephoneNo':  this.personalData.phone,
                    'FaxNo':  this.personalData.faxNo,
                    'EmailID':  this.personalData.email,
                    'MobileNumber':  this.personalData.mobile,
                    'DateOfBirth': this.datepipe.transform(this.personalData.dob, 'dd-MM-yyy'),
                    'Gender': this.personalData.gender,
                    "PassportNumber": this.personalData.passportNumber,
                    "CountryOfVisit": "Excl", //From main page this.getTravelPremiumList.plan_continent,
                    "PlanType": this.getTravelPremiumList.product_code,
                    "PurposeOfVisit": this.personalData.purposeofVisit,
                    "AssigneeName": this.nomineeData.nomineeName,
                    "AssigneeRelationShip": this.nomineeData.nomineeRelationship,
                    "Occupation": this.personalData.occupation,
                    "PreExistingAilments": this.personalData.preExistingAilments,
                    "HandicappedYN": this.personalData.handicapped,
                    "CountriesTobeVisit": this.allPremiumLists.plan_type,
                    "EngagedSportsYN": this.personalData.engagedSports,
                    "NameofPhysician": this.personalData.physicianName,
                    "AddressofPhysician": this.personalData.physicianAddress,
                    "MediReptAttach": this.personalData.medicalRepAttach,
                    "MediReptDT": this.datepipe.transform(this.personalData.medicalRepDate, 'dd-MM-yyy'),
                    "OrgPhysiciansAttach": "",
                    "TravelerType": "IND"//Set Static value - Individul
                }

            }
            console.log(data, 'datadatadatadata');

            // this.settings.loadingSpinner = true;
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
      console.log(successData.ResponseObject, 'successData.ResponseObject');
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {
            stepper.next();
            this.summaryData = successData.ResponseObject.proposal_details;
            sessionStorage.travel_proposal_id = this.summaryData.proposal_id;
            this.insurerDtails = successData.ResponseObject.proposal_details.insure_details;
            this.proposalDtails = this.summaryData.proposal_details[0];
            this.toastr.success('Proposal created successfully!!');



        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }
    public proposalFailure(error) {
    }

    PaymentPage(stepper: MatStepper) {
        stepper.next();
    }

    public payNow() {
        const data = {
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
            'platform': 'web',
            'reference_id' :  this.proposalDtails.referenceId,
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
            window.location.href = this.paymentGatewayData.payment_gateway_url;
            // this.lastStepper.next();

        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }
    public getPolicyTokenFailure(error) {
        this.settings.loadingSpinner = false;
    }


}

