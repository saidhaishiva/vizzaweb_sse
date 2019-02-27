import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray, FormControl} from '@angular/forms';
import {HealthService} from '../../shared/services/health.service';
import {MatStepper} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DatePipe} from '@angular/common';
import {AuthService} from '../../shared/services/auth.service';
import {HttpClient} from '@angular/common/http';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {Settings} from '../../app.settings.model';
import {AppSettings} from '../../app.settings';
import {CommonService} from '../../shared/services/common.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {MomentDateAdapter } from '@angular/material-moment-adapter';
import {Pipe, PipeTransform, Inject, LOCALE_ID } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as moment from 'moment';
import {ValidationService} from '../../shared/services/validation.service';
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
  selector: 'app-iffco-tokio',
  templateUrl: './iffco-tokio.component.html',
  styleUrls: ['./iffco-tokio.component.scss'],
    providers: [

        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
})
export class IffcoTokioComponent implements OnInit {
    public proposer: FormGroup;
    public summary: FormGroup;
    public insureArray: FormGroup;
    public previousInsuranceFrom: FormGroup;
    public riskDetails: FormGroup;
    public nomineeDetails: FormGroup;
    public setDate: any;
    public selectDate: any;
    public stopNext: boolean;
    public buyProductdetails: any;
    public groupName: any;
    public getFamilyDetails: any;
    public enquiryId: any;
    public proposerData: any;
    public today: any;
    public declaration: boolean;
    public summaryData: any;
    public InsuredDetailsList: any;
    public lastStepper: any;
    public questionerData: any;
    public webhost: any;
    public settings: Settings;
    public proposalId: any;
    public hideQuestion: any;
    public step: any;
    public totalInsureDetails: any;
    public response: any;
    public setDateAge: any;
    public dobError: any;
    public dob: any;
    public minDate: any;
    public RediretUrlLink: any;

    public personalData: any;

    public getStepper1: any;
    public getStepper2: any;
    public getStepper3: any;
    public getNomineeData: any;
    public prevviousInsuranceStepperDetails: any;
    public pincodeValid: any;

    public nomineeAge: any;
    public personalAge: any;
    public nomineeDateError: any;
    public previousStartDateError: any;
    public previousEndtDateError: any;
    public getAge: any;
    public getDays: any;
    public arr: any;
    public relationshipDetails: any;
    public occupationDetails: any;
    public stateDetails: any;
    public cityDetails: any;
    public nomineeData: any;
    public insuredDetails: any;
    public insuredData: any;
    public personalFormData: any;
    public insurePersons: any;
    public items: any;
    public pin: any;
    public nomineeFormData: any;
    public insuredFormData: any;
    public setPincode: any;
    public title: any;
    public proposerAge: any;
    public mobileNumber: any;
    public currentStep: any;
    public smokeList: boolean;
    public alchocolList: boolean;
    public tobacoList: boolean;
    public sameValue: boolean;

    constructor(public proposalservice: HealthService, public datepipe: DatePipe, public validation: ValidationService, public route: ActivatedRoute, private toastr: ToastrService, public appSettings: AppSettings, public dialog: MatDialog,
                public config: ConfigurationService, public common: CommonService, public fb: FormBuilder, public auth: AuthService, public http: HttpClient, @Inject(LOCALE_ID) private locale: string) {
        let stepperindex = 0;
        this.route.params.forEach((params) => {
            if (params.stepper == true) {
                stepperindex = 2;
            }
        });
        this.currentStep = stepperindex;
        this.sameValue = false;

        const minDate = new Date();
        this.minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
        this.stopNext = false;
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
        this.totalInsureDetails = [];
        this.insuredData = [];

        this.smokeList = false;
        this.tobacoList = false;
        this.alchocolList = false;
        this.proposer = this.fb.group({
            proposerTitle: ['', Validators.required],
            proposerFirstname: ['', Validators.required],
            proposerLastname: ['', Validators.required],
            proposerGender: ['', Validators.compose([Validators.required])],
            proposerDob: ['', Validators.compose([Validators.required])],
            proposerEmail: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
            proposerMobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
            proposerHomePhone: '',
            proposerOfficePhone: '',
            proposerPassport: '',
            proposerOccupation: '',
            proposerOccupationName: '',
            proposerPan: '',
            proposerAddress: ['', Validators.required],
            proposerAddress2: '',
            proposerAddress3: '',
            proposerAddress4: '',
            proposerFax: '',
            proposerMaritalStatus: ['', Validators.required],
            proposerEmergencyName: '',
            proposerEmergencyMobile: '',
            proposerPincode: ['', Validators.required],
            proposerNationality: '',
            proposerState: '',
            proposerStateName: '',
            proposerCity: '',
            proposerCityName: '',
            criticalIllness: 'No',
            roomRentWaiver: 'No',
            additionalFacts: 'No',
            pastInsuranceDeclined: 'No',
            sameas: false,
            rolecd: 'PROPOSER',
            type: ''
        });

        this.nomineeDetails = this.fb.group({
            nomineeFirstName: ['', Validators.required],
            nomineeRelationship: ['', Validators.required],
            nomineeAddress: ['', Validators.required],
            nomineePincode: ['', Validators.required],
            nomineeCountry: 'IND',
            nomineeState: '',
            nomineeStateName: '',
            nomineeCity: '',
            nomineeCityName:'',
        });

    }

    changeGender() {
        if (this.proposer.controls['proposerTitle'].value == 'MR') {
            this.proposer.controls['proposerGender'].patchValue('Male');
        } else {
            this.proposer.controls['proposerGender'].patchValue('Female');
        }
    }

    insureChangeGender(index) {
        if (this.insureArray['controls'].items['controls'][index]['controls'].proposerTitle.value == 'MR') {
            this.insureArray['controls'].items['controls'][index]['controls'].proposerGender.patchValue('Male');
        } else {
            this.insureArray['controls'].items['controls'][index]['controls'].proposerGender.patchValue('Female');
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
    ngOnInit() {
        this.buyProductdetails = JSON.parse(sessionStorage.buyProductdetails);
        this.enquiryId = sessionStorage.enquiryId;
        this.groupName = sessionStorage.groupName;
        this.getFamilyDetails = JSON.parse(sessionStorage.changedTabDetails);
        this.insurePersons = this.getFamilyDetails.family_members;

        this.insureArray = this.fb.group({
            items: this.fb.array([])
        });
        // let family_members = [{'type':'Self', 'age': '25'}];
        // for (let i = 0; i < family_members.length; i++) {
        //     this.items = this.insureArray.get('items') as FormArray;
        //     this.items.push(this.initItemRows());
        //     this.insureArray['controls'].items['controls'][i]['controls'].type.setValue(family_members[i].type);
        // }
        for (let i = 0; i < this.getFamilyDetails.family_members.length; i++) {
            this.items = this.insureArray.get('items') as FormArray;
            this.items.push(this.initItemRows());
            this.insureArray['controls'].items['controls'][i]['controls'].type.setValue(this.getFamilyDetails.family_members[i].type);
        }
        this.relationshipList();
        this.occupationList();
        this.stateList();
        this.cityList();
        this.sessionData();
        // this.setDate = Date.now();
        // this.setDate = this.datepipe.transform(this.setDate, 'dd-MM-y');
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
                rolecd: 'PRIMARY',
                proposerTitle: ['', Validators.required],
                proposerFirstname: ['', Validators.required],
                proposerLastname: ['', Validators.required],
                proposerDob: ['', Validators.compose([Validators.required])],
                proposerGender: ['', Validators.compose([Validators.required])],
                proposerAge: ['', Validators.compose([Validators.required])],
                proposerMaritalStatus: '',
                proposerRelationship: '',
                proposerOccupation: '',
                proposerHeight: ['', Validators.required],
                proposerWeight: ['', Validators.required],
                PreExistingDisease: 'No',
                Smoke: 'No',
                Alcohol: 'No',
                Tobacco: 'No',
                smokeQuantity: '',
                alcoholQuantity: '',
                tobaccoQuantity: '',
                sameAsProposer: false,
                sameas: false,
                type: '',
                ins_age: '',
                ins_days: '',
                insurerDobError: '',
                insurerDobValidError: ''
            }
        );
    }

    relationshipList() {
        const data = {
            'platform': 'web',
            'product_id': '11',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.proposalservice.relationshipListIffco(data).subscribe(
            (successData) => {
                this.relationshipListIffcoSuccess(successData);
            },
            (error) => {
                this.relationshipListIffcoFailure(error);
            }
        );
    }

    public relationshipListIffcoSuccess(successData) {
        if (successData.IsSuccess == true) {
            this.relationshipDetails = successData.ResponseObject;

        }
    }

    public relationshipListIffcoFailure(error) {
    }

    occupationList() {
        const data = {
            'platform': 'web',
            'product_id': '11',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.proposalservice.occupationListIffco(data).subscribe(
            (successData) => {
                this.occupationListSuccess(successData);
            },
            (error) => {
                this.occupationListFailure(error);
            }
        );
    }

    public occupationListSuccess(successData) {
        if (successData.IsSuccess == true) {
            this.occupationDetails = successData.ResponseObject;

        }
    }

    public occupationListFailure(error) {
    }

    stateList() {
        const data = {
            'platform': 'web',
            'product_id': '11',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.proposalservice.stateListIffco(data).subscribe(
            (successData) => {
                this.stateListSuccess(successData);
            },
            (error) => {
                this.stateListFailure(error);
            }
        );
    }

    public stateListSuccess(successData) {
        if (successData.IsSuccess == true) {
            this.stateDetails = successData.ResponseObject;

        }
    }

    public stateListFailure(error) {
    }

    cityList() {
        const data = {
            'platform': 'web',
            'product_id': '11',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.proposalservice.cityListIffco(data).subscribe(
            (successData) => {
                this.cityListSuccess(successData);
            },
            (error) => {
                this.cityListFailure(error);
            }
        );
    }

    public cityListSuccess(successData) {
        if (successData.IsSuccess == true) {
            this.cityDetails = successData.ResponseObject;

        }
    }

    public cityListFailure(error) {
    }

    addEvent(event, type) {
        if (event.value != null) {
            let selectedDate = '';
            this.proposerAge = '';
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
                    this.proposerAge = this.ageCalculate(dob);
                    sessionStorage.proposerAge = this.proposerAge;

                }

            } else if (typeof event.value._i == 'object') {
                // dob = this.datepipe.transform(event.value, 'MMM d, y');
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                if (dob.length == 10) {
                    this.proposerAge = this.ageCalculate(dob);
                    sessionStorage.proposerAgeiffco = this.proposerAge;

                }
                this.dobError = '';
            }

        }


    }


    addEventInsurer(event, i, type, name) {

        if (event.value != null) {
            let selectedDate = '';
            let dob = '';
            let dob_days = '';
            this.getAge = '';
            this.getDays;
            dob = this.datepipe.transform(event.value, 'y-MM-dd');
            dob_days = this.datepipe.transform(event.value, 'dd-MM-y');

            if (typeof event.value._i == 'string') {
                const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
                if (name == 'insurer') {
                    if (pattern.test(event.value._i) && event.value._i.length == 10) {
                        this.insureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
                    } else {
                        this.insureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('Enter Valid DOB');
                    }
                }
                selectedDate = event.value._i;

                if (selectedDate.length == 10) {

                    if (name == 'startDate') {
                    } else {
                        this.insureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
                        this.getAge = this.ageCalculate(dob);
                        this.getDays = this.ageCalculateInsurer(dob_days);
                        this.insureArray['controls'].items['controls'][i]['controls'].proposerAge.patchValue(this.getAge);
                        this.insureArray['controls'].items['controls'][i]['controls'].proposerDob.patchValue(dob);

                    }

                } else {
                    if (name == 'startDate') {
                        this.insureArray['controls'].items['controls'][i]['controls'].dobErrorStartDate.patchValue('Enter Valid Date');
                    } else {
                        this.insureArray['controls'].items['controls'][i]['controls'].proposerAge.patchValue('');
                    }

                }
            } else if (typeof event.value._i == 'object') {

                console.log(name, 'name');
                if (dob.length == 10) {
                    if (name == 'startDate') {

                    } else if (name == 'insurer') {
                        this.insureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
                        this.getAge = this.ageCalculate(dob);
                        console.log(this.getAge, 'age');
                        this.getDays = this.ageCalculateInsurer(dob_days);
                        console.log(this.getDays, 'das');
                        this.insureArray['controls'].items['controls'][i]['controls'].proposerDob.patchValue(dob);
                    }
                }
            }
            if (name == 'insurer') {
                console.log(name, 'typettttt');

                let length = this.datepipe.transform(this.insureArray['controls'].items['controls'][i]['controls'].proposerDob.value, 'y-MM-dd');
                if (length.length == 10) {
                    console.log(length, 'length');
                    this.insureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
                    this.insureArray['controls'].items['controls'][i]['controls'].ins_age.patchValue(this.getAge);
                    this.insureArray['controls'].items['controls'][i]['controls'].proposerAge.patchValue(this.getAge);
                    this.insureArray['controls'].items['controls'][i]['controls'].ins_days.patchValue(this.getDays);
                    this.ageValidation(i, type);
                } else {
                    this.insureArray['controls'].items['controls'][i]['controls'].proposerAge.patchValue('');
                }
            }

        }

    }


    smoking(value, type) {
        if (this.insureArray['controls'].items['controls'][0]['controls'].Smoke.value == 'Yes' && type == 'smoke') {
            this.smokeList = true;
        } else if (this.insureArray['controls'].items['controls'][0]['controls'].Alcohol.value == 'Yes' && type == 'alcohol') {
            this.tobacoList = true;

        } else if (this.insureArray['controls'].items['controls'][0]['controls'].Tobacco.value == 'Yes' && type == 'Tobacco') {
            this.alchocolList = true;
        }
    }

    ageCalculateInsurer(getDays) {
        let a = moment(getDays, 'DD/MM/YYYY');
        let b = moment(new Date(), 'DD/MM/YYYY');
        let days = b.diff(a, 'days');
        return days;
    }

    ageValidation(i, type) {
        console.log(type, 'type');
        console.log(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value, 'days');

        if ((this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value < 18 && type == 'Self') || (this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value > 55 && type == 'Self')) {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Self age between 18 to 55');
        } else if (this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value >= 18 && type == 'Self') {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
            this.arr.push(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value);
        }
        if ((this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value < 18 && type == 'Spouse') || (this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value > 55 && type == 'Spouse')) {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Spouse age between 18 to 55');
            // this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Spouse age should be 18 and above');
        } else if (this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value >= 18 && type == 'Spouse') {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
            this.arr.push(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value);
        }
        let smallest = this.arr[0];
        for (let i = 1; i < this.arr.length; i++) {
            if (this.arr[i] < smallest) {
                smallest = this.arr[i];
            }
        }


        if (this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value > 90 && this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value <= 9495 && type == 'Son') {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        } else if (this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value < 91 && type == 'Son') {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 91 days to 25 years');
        } else if (this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value > 9495 && type == 'Son') {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 91 days to 25 years');
        }

        if (this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value > 90 && this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value <= 9495 && type == 'Daughter') {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        } else if (this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value < 91 && type == 'Daughter') {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 91 days to 25 years');
        } else if (this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value > 9495 && type == 'Daughter') {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 91 days to 25 years');
        }


        if (this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 36 && type == 'Mother') {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Mother age should be above 36');
        } else if (this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value > 36 && type == 'Mother') {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        }
        if (this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 36 && type == 'Father') {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Father age should be above 36');
        } else if (this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value > 36 && type == 'Father') {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        }
        if (this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 1 && type == 'Sister') {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Sister age should be above 1');
        } else if (this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value > 1 && type == 'Sister') {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        }
        if (this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 1 && type == 'Brother') {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Brother age should be above 1');
        } else if (this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value > 1 && type == 'Brother') {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        }
        if (this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 36 && type == ' Father In Law') {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue(' Father In Law age should be above 36');
        } else if (this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value > 36 && type == ' Father In Law') {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        }
        if (this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 36 && type == ' Mother In Law') {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue(' Mother In Law age should be above 36');
        } else if (this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value > 36 && type == ' Mother In Law') {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        }

    }

    ageCalculate(dob) {
        let today = new Date();
        let birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        let dd = today.getDate() - birthDate.getDate();
        if (m < 0 || m == 0 && today.getDate() < birthDate.getDate()) {
            age = age - 1;
        }
        return age;
    }


    proposerDetails(stepper: MatStepper, value) {
        this.personalData = value;
        sessionStorage.stepper1IffcoDetails = '';
        sessionStorage.stepper1IffcoDetails = JSON.stringify(value);
        if (this.proposer.valid) {
            if (sessionStorage.personalAge >= 18) {
                stepper.next();
            } else {
                this.toastr.error('Proposer age should be 18 or above');
            }
        } else {
            this.toastr.error('please enter all filed');
        }
    }

    iffcoInsureDetails(stepper: MatStepper, index,value) {
        sessionStorage.stepper2IffcoDetails = '';
        sessionStorage.stepper2IffcoDetails = JSON.stringify(value);
        this.insuredDetails = value;
        console.log(this.insuredDetails,'uytrtruty');
        if (this.insureArray.valid) {
            this.insuredData = [];
            for(let i=0;i < this.insuredDetails.items.length; i++){
                this.insuredData.push({
                    'PreExistingDisease': 'No',
                    'Age': this.insuredDetails.items[i].proposerAge,
                    'DateOfBirth': this.insuredDetails.items[i].proposerDob,
                    'FirstName': this.insuredDetails.items[i].proposerFirstname,
                    'Gender': this.insuredDetails.items[i].proposerGender,
                    'Height': this.insuredDetails.items[i].proposerHeight,
                    'Weight': this.insuredDetails.items[i].proposerWeight,
                    'GrossMonthlyIncome': "",
                    'Occupation':this.insuredDetails.items[i].proposerOccupation,
                    'PreviousPolicyFlag': "N",
                    'InsuredPrimaryFlag': "Y",
                    'SumInsured': "300000",
                    'LastName': this.insuredDetails.items[i].proposerLastname,
                    'Salutation': this.insuredDetails.items[i].proposerTitle,
                    'MemberId': "17680879",
                    'RelationtoInsured':this.insuredDetails.items[i].proposerRelationship,
                    'Smoke': this.insuredDetails.items[i].Smoke,
                    'SmokeQuantity': this.insuredDetails.items[i].smokeQuantity,
                    'Alcohol':this.insuredDetails.items[i].Alcohol,
                    'AlcoholQuantity':this.insuredDetails.items[i].alcoholQuantity,
                    'Tobacco': this.insuredDetails.items[i].Tobacco,
                    'TobaccoQuantity': this.insuredDetails.items[i].tobaccoQuantity
                });
            }
            console.log(this.insuredData,'data');

            stepper.next();
        }
    }

    nomineeList(stepper: MatStepper, value) {
        sessionStorage.nomineeData1 = '';
        sessionStorage.nomineeData1 = JSON.stringify(value);
        if (this.nomineeDetails.valid) {
            this.nomineeData = value;
            this.proposal(stepper);
        }
    }
    pincodevalidationiffco(pin) {
        this.pin = pin;
        if (pin == '') {
            this.pincodeValid = true;
        }
        const data = {
            'platform': 'web',
            'user_id': '0',
            'role_id': '4',
            'Pincode': this.pin
        };
        if (this.pin.length == 6) {
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
        sessionStorage.pincodeValidiffco = this.pincodeValid;
    }
    public pincodeFailure(successData) {
    }
    proposal(stepper) {

        const data = {
            'enquiry_id': this.enquiryId,
            'proposal_id': 0,
            'product_id': this.buyProductdetails.product_id,
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
            'platform': "web",
            'group_name': "Group A",
            'company_name': this.buyProductdetails.company_name,
            'Policy': {
                'Product': this.buyProductdetails.product_name,
                'GrossPremium': "5317.44",
                'NetPremiumPayable': "6274.58",
                'ServiceTax': "957.14",
                'PromoCode': "",
                'NomineeName': this.nomineeData.nomineeFirstName,
                'NomineeCity': this.nomineeData.nomineeCity,
                'NomineeState': this.nomineeData.nomineeState,
                'NomineePincode': this.nomineeData.nomineePincode,
                'NomineeRelation': this.nomineeData.nomineeRelationship,
                'CriticalIllness': this.proposer.controls['criticalIllness'].value,
                'RoomRentWaiver': this.proposer.controls['roomRentWaiver'].value,
                'AdditionalFacts': this.proposer.controls['additionalFacts'].value,
                'PastInsuranceDeclined':this.proposer.controls['pastInsuranceDeclined'].value
            },
            "ListOfInsured": {
                "Insured": this.insuredData,
            },
            "Contact": {
                'DOB': this.proposer.controls['proposerDob'].value,
                'PassPort': this.proposer.controls['proposerPassport'].value,
                'PAN': this.proposer.controls['proposerPan'].value,
                'Salutation': this.proposer.controls['proposerTitle'].value,
                'FirstName': this.proposer.controls['proposerFirstname'].value,
                'LastName': this.proposer.controls['proposerLastname'].value,
                'Sex': this.proposer.controls['proposerGender'].value,
                'AddressType': this.proposer.controls['proposerDob'].value,
                'PinCode': this.proposer.controls['proposerPincode'].value,
                'State': this.proposer.controls['proposerState'].value,
                'AddressLine1': this.proposer.controls['proposerAddress'].value,
                'AddressLine2': this.proposer.controls['proposerAddress2'].value,
                'FaxNo': this.proposer.controls['proposerFax'].value,
                'Country': "IND",
                'Occupation': this.proposer.controls['proposerOccupation'].value,
                'City': this.proposer.controls['proposerCity'].value,
                'Nationality': "IND",
                'Married': this.proposer.controls['proposerMaritalStatus'].value,
                'HomePhone': this.proposer.controls['proposerHomePhone'].value,
                'OfficePhone': this.proposer.controls['proposerOfficePhone'].value,
                'MobilePhone': this.proposer.controls['proposerMobile'].value,
                'MailId': this.proposer.controls['proposerEmail'].value,
                'AddressLine3': this.proposer.controls['proposerAddress3'].value,
                'AddressLine4': this.proposer.controls['proposerAddress4'].value,
                'EmergencyContactName': this.proposer.controls['proposerEmergencyName'].value,
                'EmergencyContactMobile': this.proposer.controls['proposerEmergencyMobile'].value
            }
        };
        console.log(data,'fghjkjh');
        this.settings.loadingSpinner = true;
        this.proposalservice.proposalcreationIffco(data).subscribe(
            (successData) => {
                this.proposalSuccess(successData, stepper);
            },
            (error) => {
                this.proposalFailure(error);
            }
        );

    }
    public proposalSuccess(successData,stepper) {
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {
            this.toastr.success('Proposal created successfully!!');
            this.summaryData = successData.ResponseObject;
            sessionStorage.summaryData = JSON.stringify(this.summaryData);
            this.RediretUrlLink = this.summaryData.PaymentURL;
            this.proposalId = this.summaryData.ProposalId;
            sessionStorage.iffco_health_proposal_id = this.proposalId;
            this.proposer.controls['proposerOccupationName'].patchValue(this.occupationDetails[this.proposer.controls['proposerOccupation'].value]);
            this.proposer.controls['proposerStateName'].patchValue(this.stateDetails[this.proposer.controls['proposerState'].value]);
            this.proposer.controls['proposerCityName'].patchValue(this.cityDetails[this.proposer.controls['proposerCity'].value]);
            this.nomineeDetails.controls['nomineeStateName'].patchValue(this.stateDetails[this.nomineeDetails.controls['nomineeState'].value]);
            this.nomineeDetails.controls['nomineeCityName'].patchValue(this.cityDetails[this.nomineeDetails.controls['nomineeCity'].value]);
            this.personalFormData = this.proposer.value;
            this.nomineeFormData = this.getNomineeData;
            this.insuredFormData = this.insuredData;
            stepper.next();
        }
        else{
            this.toastr.error(successData.ErrorObject);
        }
    }

//Summary residence detail
    public proposalFailure(error) {
        this.settings.loadingSpinner = false;
    }


    sessionData() {
        if (sessionStorage.stepper1IffcoDetails != '' && sessionStorage.stepper1IffcoDetails != undefined) {
            this.getStepper1 = JSON.parse(sessionStorage.stepper1IffcoDetails);
            this.proposer = this.fb.group({
                proposerTitle: this.getStepper1.proposerTitle,
                proposerFirstname: this.getStepper1.proposerFirstname,
                proposerLastname: this.getStepper1.proposerLastname,
                proposerGender: this.getStepper1.proposerGender,
                proposerDob: this.getStepper1.proposerDob,
                proposerEmail: this.getStepper1.proposerEmail,
                proposerMobile: this.getStepper1.proposerMobile,
                proposerHomePhone: this.getStepper1.proposerHomePhone,
                proposerOfficePhone: this.getStepper1.proposerOfficePhone,
                proposerOccupation: this.getStepper1.proposerOccupation,
                proposerPan: this.getStepper1.proposerPan,
                proposerPassport: this.getStepper1.proposerPassport,
                proposerOccupationName: this.getStepper1.proposerOccupationName,
                proposerAddress: this.getStepper1.proposerAddress,
                proposerAddress2: this.getStepper1.proposerAddress2,
                proposerAddress3: this.getStepper1.proposerAddress3,
                proposerAddress4: this.getStepper1.proposerAddress4,
                proposerPincode: this.getStepper1.proposerPincode,
                proposerNationality: this.getStepper1.proposerNationality,
                proposerState: this.getStepper1.proposerState,
                proposerStateName: this.getStepper1.proposerStateName,
                proposerCity: this.getStepper1.proposerCity,
                proposerCityName: this.getStepper1.proposerCityName,
                proposerFax: this.getStepper1.proposerFax,
                proposerEmergencyMobile: this.getStepper1.proposerEmergencyMobile,
                proposerEmergencyName: this.getStepper1.proposerEmergencyName,
                proposerMaritalStatus: this.getStepper1.proposerMaritalStatus,
                criticalIllness: this.getStepper1.criticalIllness,
                roomRentWaiver: this.getStepper1.roomRentWaiver,
                additionalFacts: this.getStepper1.additionalFacts,
                pastInsuranceDeclined: this.getStepper1.pastInsuranceDeclined,
            });
        }

        if (sessionStorage.stepper2IffcoDetails != '' && sessionStorage.stepper2IffcoDetails != undefined) {
            this.getStepper2 = JSON.parse(sessionStorage.stepper2IffcoDetails);
            for (let i = 0; i < this.getStepper2.items.length; i++) {
                this.insureArray['controls'].items['controls'][i]['controls'].rolecd.patchValue(this.getStepper2.items[i].rolecd);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerTitle.patchValue(this.getStepper2.items[i].proposerTitle);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerFirstname.patchValue(this.getStepper2.items[i].proposerFirstname);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerGender.patchValue(this.getStepper2.items[i].proposerGender);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerAge.patchValue(this.getStepper2.items[i].proposerAge);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerLastname.patchValue(this.getStepper2.items[i].proposerLastname);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerDob.patchValue(this.getStepper2.items[i].proposerDob);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerRelationship.patchValue('Self');
                this.insureArray['controls'].items['controls'][i]['controls'].proposerOccupation.patchValue(this.getStepper2.items[i].proposerOccupation);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerHeight.patchValue(this.getStepper2.items[i].proposerHeight);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerWeight.patchValue(this.getStepper2.items[i].proposerWeight);
                this.insureArray['controls'].items['controls'][i]['controls'].sameas.patchValue(this.getStepper2.items[i].sameas);
                this.insureArray['controls'].items['controls'][i]['controls'].sameAsProposer.patchValue(this.getStepper2.items[i].sameAsProposer);
                this.insureArray['controls'].items['controls'][i]['controls'].Smoke.patchValue(this.getStepper2.items[i].Smoke);
                this.insureArray['controls'].items['controls'][i]['controls'].Alcohol.patchValue(this.getStepper2.items[i].Alcohol);
                this.insureArray['controls'].items['controls'][i]['controls'].Tobacco.patchValue(this.getStepper2.items[i].Tobacco);
                this.insureArray['controls'].items['controls'][i]['controls'].smokeQuantity.patchValue(this.getStepper2.items[i].smokeQuantity);
                this.insureArray['controls'].items['controls'][i]['controls'].alcoholQuantity.patchValue(this.getStepper2.items[i].alcoholQuantity);
                this.insureArray['controls'].items['controls'][i]['controls'].tobaccoQuantity.patchValue(this.getStepper2.items[i].tobaccoQuantity);
                this.insureArray['controls'].items['controls'][i]['controls'].PreExistingDisease.patchValue(this.getStepper2.items[i].PreExistingDisease);
                this.insureArray['controls'].items['controls'][i]['controls'].ins_age.patchValue(this.getStepper2.items[i].ins_age);
                this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue(this.getStepper2.items[i].insurerDobError);
                this.insureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue(this.getStepper2.items[i].insurerDobValidError);
                this.insureArray['controls'].items['controls'][i]['controls'].ins_days.patchValue(this.getStepper2.items[i].ins_days);
            }
        }


        if (sessionStorage.nomineeData != '' && sessionStorage.nomineeData != undefined) {
            this.getNomineeData = JSON.parse(sessionStorage.nomineeData);
            this.nomineeDetails = this.fb.group({
                nomineeFirstName: this.getNomineeData.nomineeFirstName,
                nomineeAddress: this.getNomineeData.nomineeAddress,
                nomineePincode: this.getNomineeData.nomineePincode,
                nomineeCountry: this.getNomineeData.nomineeCountry,
                nomineeCity: this.getNomineeData.nomineeCity,
                nomineeCityName: this.getNomineeData.nomineeCityName,
                nomineeState: this.getNomineeData.nomineeState,
                nomineeStateName: this.getNomineeData.nomineeStateName,
            });
            let getNomineeDob = this.datepipe.transform(this.getNomineeData.nomineeDob, 'y-MM-dd');
            this.nomineeDetails['controls'].nomineeDob.patchValue(getNomineeDob);
        }

    }
    sameProposer(value: any) {
        if (value.checked) {
            this.sameValue = true;
            this.insureArray['controls'].items['controls'][0]['controls'].proposerTitle.patchValue(this.proposer.controls['proposerTitle'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerFirstname.patchValue(this.proposer.controls['proposerFirstname'].value)
            this.insureArray['controls'].items['controls'][0]['controls'].proposerLastname.patchValue(this.proposer.controls['proposerLastname'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerAge.patchValue(sessionStorage.proposerAge);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerOccupation.patchValue(this.proposer.controls['proposerOccupation'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerGender.patchValue(this.proposer.controls['proposerGender'].value);
            // this.insureArray['controls'].items['controls'][0]['controls'].sameas.patchValue(this.proposer.controls['sameas'].value);

            let getDob = this.datepipe.transform(this.proposer.controls['proposerDob'].value, 'y-MM-dd');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerDob.patchValue(getDob);
        } else {
            this.sameValue = false;
            this.insureArray['controls'].items['controls'][0]['controls'].proposerTitle.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerFirstname.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerLastname.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerDob.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerAge.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerOccupation.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerGender.patchValue('');
            // this.insureArray['controls'].items['controls'][0]['controls'].sameas.patchValue('');
        }
    }
}
