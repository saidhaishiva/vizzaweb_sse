
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
    selector: 'app-travel-proposal',
    templateUrl: './travel-proposal.component.html',
    styleUrls: ['./travel-proposal.component.scss'],
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
    public relationshipcode : any;
    public medicalStatus : any;
    public arr : any;
    public insureRelationList : any;
    array: any;
    placeOfVisiLists: any;
    assigneeRelationList: any;
    travelPurposeLists: any;
    preExistingDisease: any;
    personalDobError: any;
    getAge: any;
    paymentGatewayData: any;
    visaTypeAllList: any;
    AcceptDeclaration: boolean;
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
            personalTitle: ['', Validators.required],
            personalFirstname: new FormControl(''),
            personalGender: ['', Validators.compose([Validators.required])],
            personalDob: ['', Validators.compose([Validators.required])],
            personalrelationship: 'SELF',
            personalGst: ['', Validators.compose([Validators.minLength(15)])],
            personalAddress: ['', Validators.required],
            personalAddress2: ['', Validators.required],
            personalPincode: ['', Validators.required],
            personalCity: ['', Validators.required],
            personalState: ['', Validators.required],
            personalEmail: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
            personalMobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
            placeOfVisit: ['', Validators.required],
            travelPurpose: ['', Validators.required],
            physicianName: ['', Validators.required],
            physicianContactNumber: ['', Validators.required],
            travelDeclaration: ['', Validators.required]
        });
        console.log(this.totalData);
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
        this.visaTypeList();

      //  this.enquiryId = sessionStorage.enquiryId;
        this.getTravelPremiumList = JSON.parse(sessionStorage.travelPremiumList);
        console.log(this.getTravelPremiumList, 'this.getTravelPremiumList');
        this.insurePersons = this.getTravelPremiumList.family_details;
        this.insureArray = this.fb.group({
            items: this.fb.array([])
        });
        for (let i = 0; i < this.getTravelPremiumList.family_details.length; i++) {
            this.items = this.insureArray.get('items') as FormArray;
            this.items.push(this.initItemRows());
            this.insureArray['controls'].items['controls'][i]['controls'].type.setValue(this.getTravelPremiumList.family_details[i].type);
        }
        console.log(this.insureArray, 'insureArray');
        console.log(this.items, 'items');
        this.sessionData();
    }
    setStep(index: number) {
        this.step = index;
    }

    prevStep() {
        this.step--;
    }
    initItemRows() {
        return this.fb.group(
            {
                insurerTitle: ['', Validators.required],
                insurerName: new FormControl(''),
                insurerDob: ['', Validators.required],
                insurerGender: ['', Validators.compose([Validators.required])],
                insurerRelationship: ['', Validators.required],
                assigneeName: ['', Validators.required],
                assigneeRelationship: ['', Validators.required],
                passportNumber: ['', Validators.required],
                passportExpiry: ['', Validators.required],
                visaType: ['', Validators.required],
                illness: ['', Validators.required],
                insurerDobError: '',
                insurerDobValidError: '',
                insurerExpiryValidError: '',
                type: '',
                ins_age: ''
            }
        );
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

    PreviousInsuredDetail(value, i) {
        if (value.value == 'true') {
            this.insureArray['controls'].items['controls'][i]['controls'].previousinsurance.setValue('');
            this.previousInsuranceStatus1[i] = this.insureArray['controls'].items['controls'][i]['controls'].previousinsuranceChecked.value;
        } else {
            this.previousInsuranceStatus1[i] = this.insureArray['controls'].items['controls'][i]['controls'].previousinsuranceChecked.value;
            this.insureArray['controls'].items['controls'][i]['controls'].previousinsurance.setValue('No');
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
            const pattern =/[0-9-]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }
    acceptDeclaration() {
        console.log(this.personal.controls['travelDeclaration'].value, 'value');
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
                console.log(dob,'dob');
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
                console.log(dob, 'dobdob');
                this.insureArray['controls'].items['controls'][i]['controls'].passportExpiry.patchValue(dob);
                this.insureArray['controls'].items['controls'][i]['controls'].insurerExpiryValidError.patchValue('');
            } else {
                sessionStorage.proposerAgeForTravel = this.proposerAge;
            }

        }
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
                selectedDate = event.value._i;
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                if (selectedDate.length == 10) {
                    this.getAge = this.ageCalculateInsurer(dob);
                }

            } else if (typeof event.value._i == 'object') {

                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                console.log(dob, 'dob11');

                if (dob.length == 10) {
                    this.getAge = this.ageCalculateInsurer(dob);
                }

            }
            // if (this.getAge) {
                console.log(this.getAge, 'newwagee11');
                console.log(dob, 'dob2');
                this.insureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
                this.insureArray['controls'].items['controls'][i]['controls'].insurerDob.patchValue(dob);
                this.insureArray['controls'].items['controls'][i]['controls'].ins_age.patchValue(this.getAge);
                this.ageValidationInsurer(i, type);
           // }

        }

    }
    ageCalculateInsurer(dob) {
        let mdate = dob.toString();
        let yearThen = parseInt(mdate.substring(8, 10), 10);
        let monthThen = parseInt(mdate.substring(5, 7), 10);
        let dayThen = parseInt(mdate.substring(0, 4), 10);
        let todays = new Date();
        let birthday = new Date(dayThen, monthThen - 1, yearThen);
        let differenceInMilisecond = todays.valueOf() - birthday.valueOf();
        let year_age = Math.floor(differenceInMilisecond / 31536000000);
        let day_age = Math.floor((differenceInMilisecond % 31536000000) / 86400000);
        let month_age = Math.floor(day_age/30);
        console.log(month_age, 'month_agepppp');
        return month_age;
    }
    ageValidationInsurer(i, type) {
        if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value < 5) {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Insurer Date of birth date should be atleast 5 months old');
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

        console.log(smallest, 'smallest');
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

    sessionData() {
        if (sessionStorage.stepper1DetailsForTravel != '' && sessionStorage.stepper1DetailsForTravel != undefined) {
            console.log(JSON.parse(sessionStorage.stepper1DetailsForTravel), 'sessionStorage.stepper1Details');
            this.getStepper1 = JSON.parse(sessionStorage.stepper1DetailsForTravel);
            this.personal = this.fb.group({
                personalTitle: this.getStepper1.personalTitle,
                personalFirstname: this.getStepper1.personalFirstname,
                personalDob: new FormControl(new Date(this.getStepper1.personalDob)),
                personalArea: this.getStepper1.personalArea,
                residenceArea: this.getStepper1.residenceArea,
                personalrelationship: this.getStepper1.personalrelationship,
                personalGender: this.getStepper1.personalGender,
                personalAddress: this.getStepper1.personalAddress,
                personalAddress2: this.getStepper1.personalAddress2,
                personalPincode: this.getStepper1.personalPincode,
                personalCity: this.getStepper1.personalCity,
                personalState: this.getStepper1.personalState,
                personalEmail: this.getStepper1.personalEmail,
                personalMobile: this.getStepper1.personalMobile,
                personalGst: this.getStepper1.personalGst,
                travelPurpose: this.getStepper1.travelPurpose,
                placeOfVisit: '',
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


            setTimeout(() => {
                if (this.getStepper1.personalPincode != '') {
                    this.getPostal(this.getStepper1.personalPincode, 'personal');
                    this.personal.controls['personalPincode'].setValue(this.getStepper1.personalPincode);
                    this.personal.controls['personalState'].setValue(this.getStepper1.personalState);
                    this.personal.controls['personalCity'].setValue(this.getStepper1.personalCity);

                    if (this.getStepper1.sameas) {
                        this.sameField = this.getStepper1.sameas;
                        this.inputReadonly = true;
                        this.personal.controls['residencePincode'].setValue(this.getStepper1.personalPincode);
                        this.personal.controls['residenceState'].setValue(this.getStepper1.personalState);
                        this.personal.controls['residenceCity'].setValue(this.getStepper1.personalCity);
                    }
                    setTimeout(() => {
                        if (this.getStepper1.sameas == false && this.getStepper1.residencePincode != '') {
                            this.getPostal(this.getStepper1.residencePincode, 'residence');
                            this.personal.controls['residencePincode'].setValue(this.getStepper1.residencePincode);
                            this.personal.controls['residenceState'].setValue(this.getStepper1.residenceState);
                            this.personal.controls['residenceCity'].setValue(this.getStepper1.residenceCity);
                        } },2000);

                } },4000);
        }



        if (sessionStorage.stepper2DetailsForTravel != '' && sessionStorage.stepper2DetailsForTravel != undefined) {
            console.log(JSON.parse(sessionStorage.stepper2DetailsForTravel), 'sessionStorage');
            this.getStepper2 = JSON.parse(sessionStorage.stepper2DetailsForTravel);
            for (let i = 0; i < this.getStepper2.items.length; i++) {
                this.insureArray['controls'].items['controls'][i]['controls'].insurerTitle.patchValue(this.getStepper2.items[i].insurerTitle);
                this.insureArray['controls'].items['controls'][i]['controls'].insurerName.patchValue(this.getStepper2.items[i].insurerName);
                this.insureArray['controls'].items['controls'][i]['controls'].insurerGender.patchValue(this.getStepper2.items[i].insurerGender);
                this.insureArray['controls'].items['controls'][i]['controls'].insurerDob.patchValue(this.getStepper2.items[i].insurerDob);
                this.insureArray['controls'].items['controls'][i]['controls'].insurerRelationship.patchValue(this.getStepper2.items[i].insurerRelationship);
                this.insureArray['controls'].items['controls'][i]['controls'].assigneeName.patchValue(this.getStepper2.items[i].assigneeName);
                this.insureArray['controls'].items['controls'][i]['controls'].assigneeRelationship.patchValue(this.getStepper2.items[i].assigneeRelationship);
                this.insureArray['controls'].items['controls'][i]['controls'].passportNumber.patchValue(this.getStepper2.items[i].passportNumber);
                this.insureArray['controls'].items['controls'][i]['controls'].passportExpiry.patchValue(this.getStepper2.items[i].passportExpiry);
                this.insureArray['controls'].items['controls'][i]['controls'].visaType.patchValue(this.getStepper2.items[i].visaType);
                this.insureArray['controls'].items['controls'][i]['controls'].assigneeName.patchValue(this.getStepper2.items[i].assigneeName);
                this.insureArray['controls'].items['controls'][i]['controls'].assigneeRelationship.patchValue(this.getStepper2.items[i].assigneeRelationship);
                this.insureArray['controls'].items['controls'][i]['controls'].illness.patchValue(this.getStepper2.items[i].illness);
            }
            for (let i = 0; i < this.getStepper2.items.length; i++) {
                if (this.getStepper2.items[i].personalPincode != '') {
                    this.insureArray['controls'].items['controls'][i]['controls'].pCityHide.patchValue(true);
                    this.insureArray['controls'].items['controls'][i]['controls'].personalCity.patchValue(this.getStepper2.items[i].personalCity);
                    this.insureArray['controls'].items['controls'][i]['controls'].personalPincode.patchValue(this.getStepper2.items[i].personalPincode);
                    this.insureArray['controls'].items['controls'][i]['controls'].personalState.patchValue(this.getStepper2.items[i].personalState);
                }
            }
        }
    }

    //Personal Details
    personalDetails(stepper: MatStepper, value) {
        sessionStorage.stepper1DetailsForTravel = '';
        sessionStorage.stepper1DetailsForTravel = JSON.stringify(value);
        this.personalData = value;
       // this.personalData.personalDob = this.datepipe.transform(this.personalData.personalDob, 'MMM d, y');
        console.log(this.personalData, 'first');
        if (this.personal.valid) {
            if (sessionStorage.proposerAgeForTravel >= 18) {
                stepper.next();
            } else {
                this.toastr.error('Proposer age should be 18 or above');
            }
        }
    }
    //Create Proposal
    createProposal(stepper: MatStepper, value, key) {
        console.log(value);
        console.log(this.personalData, 'fft');
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
                'illness': value.items[i].illness
            });

            console.log(this.allInsuredData, 'this.allInsuredData1');

        }

        if (this.insureArray.valid) {
            let valid = false;
            const data = {
                'platform': 'web',
                'product_id': '1',
                'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
                'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
                'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
                'title': this.personalData.personalTitle,
                'gender': this.personalData.personalGender,
                'enquiry_id': this.getTravelPremiumList.enquiry_id,
                'proposal_id': sessionStorage.travel_proposal_id == '' || sessionStorage.travel_proposal_id == undefined ? '' : sessionStorage.travel_proposal_id,
                'travelStartOn': this.datepipe.transform(this.getTravelPremiumList.start_date, 'MMM d, y'),
                'travelEndOn': this.datepipe.transform(this.getTravelPremiumList.end_date, 'MMM d, y'),
                'proposerName': this.personalData.personalFirstname,
                'proposerDob': this.datepipe.transform(this.personalData.personalDob, 'MMM d, y'),
                'proposerEmail': this.personalData.personalEmail,
                'gstIdNumber': this.personalData.personalGst,
                'proposerPhone': this.personalData.personalMobile,
                'planId': this.getTravelPremiumList.plan_id,
                'travelPurposeId': this.personalData.travelPurpose,
                'placeOfVisit': this.personalData.placeOfVisit.toString(),
                'proposerAddressOne': this.personalData.personalAddress,
                'proposerAddressTwo': this.personalData.personalAddress2,
                'proposerAreaId': this.personalData.personalPincode,

                'physicianName': this.personalData.physicianName,
                'physicianContactNumber': this.personalData.physicianContactNumber,
                'travelDeclaration': this.personalData.travelDeclaration ? 1 : 0,

                'personalCity': this.personalData.personalCity,
                'personalState': this.personalData.personalState,
                'insureds': this.allInsuredData

            }
            console.log(data, 'data');
            let ageValidate = [];
            for(let i=0;i<this.insurerData.items.length; i++) {
                if (this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.value != '') {
                    ageValidate.push(1);
                } else if (this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.value == '') {
                    ageValidate.push(2);
                }
            }
            if (ageValidate.includes(1)) {
                this.toastr.error('Insurer Date of birth date should be atleast 5 months old');
            } else if(ageValidate.includes(2)){
                stepper.next();
                valid = true;
            }

            if (valid) {
                this.settings.loadingSpinner = true;
                this.travelservice.createTravelProposal(data).subscribe(
                    (successData) => {
                        this.proposalSuccess(successData);
                    },
                    (error) => {
                        this.proposalFailure(error);
                    }
                );
            }




            }

    }


    public proposalSuccess(successData) {
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {
            this.summaryData = successData.ResponseObject.proposal_details;
            console.log(this.summaryData);
            sessionStorage.travel_proposal_id = this.summaryData.proposal_id;
            this.insurerDtails = successData.ResponseObject.proposal_details.insure_details;
            this.proposalDtails = this.summaryData.proposal_details[0];
            this.toastr.success('Proposal created successfully!!');
            for (let i =0; i < this.insurerDtails.length; i++) {
                for (let j =0; j < this.insureRelationList.length; j++) {
                    if (this.insurerDtails[i].relationshipId == this.insureRelationList[j].relationship_id) {
                        this.insurerDtails[i].relationship_name = this.insureRelationList[j].relationship_name;
                    }
                }
            }
        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }
    public proposalFailure(error) {

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
            } else if(successData.IsSuccess != true) {
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
            } else if(successData.IsSuccess != true) {
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
    //insurer city detail
    getPostalInsurer(pin, index, title) {
        this.pin = pin;
        this.title = title;
        this.index = index;
        const data = {
            'platform': 'web',
            'user_id': '0',
            'role_id': '4',
            'pincode': this.pin
        }
        if (this.pin.length == 6) {
            this.proposalservice.getPostalReligare(data).subscribe(
                (successData) => {
                    this.getpostalInsurerSuccess(successData);
                },
                (error) => {
                    this.getpostalInsurerFailure(error);
                }
            );
        }
    }

    public getpostalInsurerSuccess(successData) {

        if (this.title == 'personal') {
            this.iPersonalCitys = [];
            this.response = successData.ResponseObject;
            if (successData.IsSuccess) {
                for (let i = 0; i < this.response.length; i++) {
                    this.iPersonalCitys.push({city: this.response[i].city});
                }
                this.insureArray['controls'].items['controls'][this.index]['controls'].personalState.patchValue(this.response[0].state);
                this.insureArray['controls'].items['controls'][this.index]['controls'].pCityHide.patchValue(false);
            } else if(successData.IsSuccess != true && this.title == 'personal') {
                for (let i = 0; i < this.response.length; i++) {
                    this.iPersonalCitys.push({city: this.response[i].city = ''});
                }
                this.insureArray['controls'].items['controls'][this.index]['controls'].personalState.patchValue('');
                this.insureArray['controls'].items['controls'][this.index]['controls'].pCityHide.patchValue(false);
                this.toastr.error('In valid Pincode');
            }
        }

    }

    public getpostalInsurerFailure(error) {
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

    placeOfVisits() {
        const data = {
            'platform': 'web',
            'product_id': '1',
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
            console.log(this.placeOfVisiLists, 'vvv');
        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }
    public placeOfVisitFailure(error) {
    }

    visaTypeList() {
        const data = {
            'platform': 'web',
            'product_id': '1',
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
            'product_id': '1',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0'

        }
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
            console.log(this.placeOfVisiLists, 'vvv');
        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }
    public travelPurposeListsFailure(error) {

    }


    insurerRelationship() {
        const data = {
            'platform': 'web',
            'product_id': '1',
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
        console.log(successData.ResponseObject);
        if (successData.IsSuccess) {
            this.insureRelationList = successData.ResponseObject;
        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }

    public setRelationshipFailure(error) {
        console.log(error);
    }

    assigneeRelationship() {
        const data = {
            'platform': 'web',
            'product_id': '1',
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
        console.log(successData.ResponseObject);
        if (successData.IsSuccess) {
            this.assigneeRelationList = successData.ResponseObject;
            console.log(this.assigneeRelationList, 'assigneeRelationList');
        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }

    public assigneeRelationshipFailure(error) {
        console.log(error);
    }

    getIlnessDetails() {
        const data = {
            'platform': 'web',
            'product_id': '1',
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
        console.log(successData.ResponseObject);
        if (successData.IsSuccess) {
            this.preExistingDisease = successData.ResponseObject;
        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }

    public getIlnessDetailFailure(error) {
        console.log(error);
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
        console.log(event,'ghj');
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
            console.log(this.paymentGatewayData);
            window.location.href = this.paymentGatewayData.payment_gateway_url;
           // this.lastStepper.next();

        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }

    public getPolicyTokenFailure(error) {
        this.settings.loadingSpinner = false;
        console.log(error);
    }

}
