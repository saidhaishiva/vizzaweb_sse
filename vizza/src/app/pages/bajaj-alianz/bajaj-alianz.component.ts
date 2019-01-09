import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray, FormControl} from '@angular/forms';
import {ProposalService} from '../../shared/services/proposal.service';
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
    selector: 'app-bajaj-alianz',
    templateUrl: './bajaj-alianz.component.html',
    styleUrls: ['./bajaj-alianz.component.scss'],
    providers: [

        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
})
export class BajajAlianzComponent implements OnInit {
    public medicalArray: FormGroup;
    public insureArray: FormGroup;
    public minDate: any;
    public stopNext: any;
    public hideQuestion: any;
    public declaration: any;
    public settings: Settings;
    public webhost: any;
    public selectDate: any;
    public proposalId: any;
    public step: any;
    public buyProductdetails: any;
    public enquiryId: any;
    public groupName: any;
    public occupationList: any;
    public relationshipList: any;
    public insureRelation: any;
    public nomeeRelation: any;
    public summaryData: any;

    public getStepper2: any;
    public getStepper1: any;
    public proposerData: any;
    public lastStepper: any;
    public nationalityList: any;
    public pin: any;
    public title: any;
    public setPincode: any;
    public insureMArea: any;
    public mitems: any;
    public medicalData: any;
    public totalMedicalDetails: any;
    public medicalPersons: any;
    public totalInsurer: any;
    public relationshipSameError: any;


    public setDate: any;
    public setDateAge: any;
    public dob: any;
    public dobError: any;
    public insureAge: any;
    public getFamilyDetails: any;
    public items: any;
    public insurePersons: any;
    public insurerData: any;
    public totalInsureDetails: any;
    public RediretUrlLink: any;
    public Diseases: any;
    public getDays: any;
    public getAge: any;
    public agecal: any;
    public arr: any;

    constructor(public proposalservice: ProposalService, public datepipe: DatePipe, private toastr: ToastrService, public appSettings: AppSettings, public dialog: MatDialog,
                public config: ConfigurationService, public common: CommonService, public fb: FormBuilder, public auth: AuthService, public http: HttpClient, @Inject(LOCALE_ID) private locale: string) {
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
        this.arr = [];
        this.insureArray = this.fb.group({

        });
    }

    insureChangeGender(index) {
        if (this.insureArray['controls'].items['controls'][index]['controls'].insureTitle.value == 'MR') {
            this.insureArray['controls'].items['controls'][index]['controls'].insureGender.patchValue('Male');
        } else {
            this.insureArray['controls'].items['controls'][index]['controls'].insureGender.patchValue('Female');
        }
    }

    ngOnInit() {
        this.NationalityList();
        this.setOccupationList();
        this.setrelationshipList();
        this.buyProductdetails = JSON.parse(sessionStorage.buyProductdetails);
        this.enquiryId = sessionStorage.enquiryId;
        this.groupName = sessionStorage.groupName;
        this.getFamilyDetails = JSON.parse(sessionStorage.changedTabDetails);
        this.insurePersons = this.getFamilyDetails.family_members;
        this.insureArray = this.fb.group({
            items: this.fb.array([])
        });
        for (let i = 0; i < this.getFamilyDetails.family_members.length; i++) {
            this.items = this.insureArray.get('items') as FormArray;
            this.items.push(this.initItemRows());
            if (i == 0) {
                this.insureArray['controls'].items['controls'][i]['controls'].insurerelationship.patchValue('SELF');
            }
            this.insureArray['controls'].items['controls'][i]['controls'].type.setValue(this.getFamilyDetails.family_members[i].type);
        };

            this.sessionData();
            this.setDate = Date.now();
            this.setDate = this.datepipe.transform(this.setDate, 'dd-MM-y');
    }
    initItemRows() {
        return this.fb.group(
            {
                rolecd: 'PRIMARY',
                insureTitle: ['', Validators.required],
                insureName: ['', Validators.required],
                insureDob: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
                insureGender: ['', Validators.compose([Validators.required])],
                insureAge: ['', Validators.compose([Validators.required])],
                insureHeight: ['', Validators.compose([Validators.required])],
                insureWeight: ['', Validators.compose([Validators.required])],
                insureoccupation: ['', Validators.required],
                insurerelationship: ['', Validators.required],
                insureGMIncome: ['', Validators.required],
                insureEmail: ['', Validators.compose([ Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
                insureMobile: ['', Validators.compose([ Validators.pattern('[6789][0-9]{9}')])],
                insurePhone: '',
                insureAddress: '',
                insureAddress2:'',
                insurePincode: '',
                insureNationality: '',
                insureState: '',
                insureDistrict: '',
                insureCity: '',
                insureArea: '',
                insurePIName:'',
                insurePIAddress:'',
                insureCName:'',
                insurePINumber:'',
                insurePItDate: ['', Validators.compose([Validators.minLength(10)])],
                insureSInsurance:'',
                insurePIClaims:'0',
                bajajNomineeName: ['', Validators.required],
                bajajRelationship: ['', Validators.required],
                medicalPEDisease: 'No',
                medicalAsthma: 'No',
                medicalDisordr: 'No',
                medicalHeartDisease: 'No',
                medicalHypertension: 'No',
                medicalDiabetes: 'No',
                medicalObesity: 'No',
                medicalSmoking: 'No',
                insureDisease: 0,
                type: '',
                insurerDobError: '',
                insurerDobValidError: '',
                ins_age: '',
                ins_days: '',
                relationshipSameError: ''

            }
        );
    }

    //Insure Details
    bajajInsureDetails(stepper: MatStepper, id, value, key) {
        sessionStorage.stepper1Details = '';
        sessionStorage.stepper1Details = JSON.stringify(value);
        if (this.insureArray.valid) {
            this.insurerData = value.items;
            this.totalInsureDetails = [];
            for (let i = 0; i < this.insurePersons.length; i++) {
                this.totalInsureDetails.push({
                    'membername': this.insurerData[i].insureName,
                    'memrelation': this.insurerData[i].insurerelationship,
                    'memdob': this.insurerData[i].insureDob,
                    'memage': this.insurerData[i].insureAge,
                    'memgender': this.insurerData[i].insureGender == 'Male' ? 'M' : 'F',
                    'memheightcm': this.insurerData[i].insureHeight,
                    'memweightkg': this.insurerData[i].insureWeight,
                    'memoccupation': this.insurerData[i].insureoccupation,
                    'memgrossmonthlyincome': this.insurerData[i].insureGMIncome,
                    'memnomineename': this.insurerData[i].bajajNomineeName,
                    'memnomineerelation': this.insurerData[i].bajajRelationship,
                    'memcompname': this.insurerData[i].insureCName,
                    'memprvpolno': this.insurerData[i].insurePINumber,
                    'memprvexpdate': this.insurerData[i].insurePItDate,
                    'memprvsi': this.insurerData[i].insureSInsurance,
                    'noofclaims':this.insurerData[i].insurePIClaims,
                    'membmi': '',
                    'memspecialcondition': 'NA',
                    'memaddflag': 'Y',
                    'mempreexistdisease': '0',
                    'memasthma': '0',
                    'memcholstrldisordr': '0',
                    'memheartdisease': '0',
                    'memhypertension': '0',
                    'memdiabetes': '0',
                    'memobesity': '0',
                    'memsmkertbco': '0',
                });
            }
            console.log(this.totalInsureDetails);
            let ageValidate = [];
            let diseaseValidate = [];
            let relationshipValidate = [];
            for (let i = 0; i< this.insurerData.length; i++){
                if ( this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.value  != '') {
                    ageValidate.push(1);

                } else{
                    ageValidate.push(0);
                }
                if(this.insureArray['controls'].items['controls'][i]['controls'].insureDisease.value == 1){
                    diseaseValidate.push('No');
                } else if(this.insureArray['controls'].items['controls'][i]['controls'].insureDisease.value == 0){
                    diseaseValidate.push('Yes');
                }
                if(this.insureArray['controls'].items['controls'][i]['controls'].insurerelationship.value == this.insureArray['controls'].items['controls'][i]['controls'].bajajRelationship.value){
                    relationshipValidate.push('No')
                }else{
                    relationshipValidate.push('Yes')
                }
            }
            if(!ageValidate.includes(1)){
                if(!diseaseValidate.includes('No')) {
                    if(!relationshipValidate.includes('No')) {
                        this.lastStepper = stepper;
                        this.proposal();
                    }  else{
                        this.toastr.error('Insurer and Nominee relationship should be different');
                    }
                } else{
                    this.toastr.error('Sorry you are selected Pre-Existing Diseases. so you are not allowed to purchase product');
                }
            }
        }
    }
    previousDisease(status: any, index){
        if(status.checked){
            this.insureArray['controls'].items['controls'][index]['controls'].insureDisease.patchValue(1);

            const dialogRef = this.dialog.open(previousDisease, {
                width: '600px',
            });
            dialogRef.disableClose = true;
        } else{
            this.insureArray['controls'].items['controls'][index]['controls'].insureDisease.patchValue(0);
        }
    }
    public keyPress(event: any) {
        if (event.charCode !== 0) {
            const pattern = /[0-9 ]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }

    addEvent(event, title, index, type) {
        let dd = event.value;
        this.selectDate = event.value;
        this.setDate = this.datepipe.transform(this.selectDate, 'dd-MM-y');
        this.setDateAge = this.datepipe.transform(this.selectDate, 'y-MM-dd');
        let age = this.ageCalculate(this.setDateAge);
        let days = this.DobDaysCalculate(this.setDateAge);
        this.insureAge = age;

        if(title == 'insurer') {
            sessionStorage.setItem('insureAge', this.insureAge);
            this.insureArray['controls'].items['controls'][index]['controls'].insureAge.patchValue(sessionStorage.insureAge);
            this.insureArray['controls'].items['controls'][index]['controls'].ins_age.patchValue(age);
            this.insureArray['controls'].items['controls'][index]['controls'].ins_days.patchValue(days);
            if((this.insureArray['controls'].items['controls'][index]['controls'].ins_age.value >= 25 || this.insureArray['controls'].items['controls'][index]['controls'].ins_days.value < 91)  && (type == 'Son' || type == 'Daughter')) {
                this.insureArray['controls'].items['controls'][index]['controls'].insurerDobError.patchValue(' Age between 91 days to 25 years');
            } else if((this.insureArray['controls'].items['controls'][index]['controls'].ins_age.value <= 25 || this.insureArray['controls'].items['controls'][index]['controls'].ins_days.value > 91) && (type == 'Son' || type == 'Daughter' ))  {
                this.insureArray['controls'].items['controls'][index]['controls'].insurerDobError.patchValue('');
            } else{
                if(this.insureArray['controls'].items['controls'][index]['controls'].ins_age.value <= 18) {
                    this.insureArray['controls'].items['controls'][index]['controls'].insurerDobError.patchValue(' Age between 18 above');
                } else if(this.insureArray['controls'].items['controls'][index]['controls'].ins_age.value >= 18)  {
                    this.insureArray['controls'].items['controls'][index]['controls'].insurerDobError.patchValue('');
                }
            }
        }
        if (event.value != null) {
            let selectedDate = '';
            if (typeof event.value._i == 'string') {
                const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;

                if (pattern.test(event.value._i) && event.value._i.length == 10) {
                    this.dobError = '';
                } else {
                    this.dobError = 'Enter Valid Date';
                }
                selectedDate = event.value._i;
                // this.dob = event.value._i;

                let dob = this.datepipe.transform(event.value, 'y-MM-dd');
                this.dob = dob;
                if (selectedDate.length == 10) {
                    this.ageCalculate(dob);
                } else {
                }

            } else if (typeof event.value._i == 'object') {

                this.dob = this.datepipe.transform(event.value, 'y-MM-dd');
                if (this.dob.length == 10) {
                    this.ageCalculate(this.datepipe.transform(event.value, 'y-MM-dd'));
                } else {

                }

                this.dobError = '';
                let date = event.value._i.date;
                if (date.toString().length == 1) {
                    date = '0' + date;
                }
                let month = (parseInt(event.value._i.month) + 1).toString();

                if (month.length == 1) {
                    month = '0' + month;
                }
                let year = event.value._i.year;
                this.dob = date + '-' + month + '-' + year;
            }
        }

    }
    ageCalculate(dob) {
        const mdate = dob.toString();
        const yearThen = parseInt(mdate.substring(8, 10), 10);
        const monthThen = parseInt(mdate.substring(5, 7), 10);
        const dayThen = parseInt(mdate.substring(0, 4), 10);
        const todays = new Date();
        const birthday = new Date(dayThen, monthThen - 1, yearThen);
        const differenceInMilisecond = todays.valueOf() - birthday.valueOf();
        const yearAge = Math.floor(differenceInMilisecond / 31536000000);
        this.agecal = yearAge;
        console.log(this.agecal, '  this.agecal  this.agecal');
        return yearAge;
    }

    DobDaysCalculate(dobDays) {
        let mdate = dobDays.toString();
        let yearThen = parseInt(mdate.substring( 8,10), 10);
        let monthThen = parseInt(mdate.substring(5,7), 10);
        let dayThen = parseInt(mdate.substring(0,4), 10);
        let todays = new Date();
        let birthday = new Date( dayThen, monthThen-1, yearThen);
        let differenceInMilisecond = todays.valueOf() - birthday.valueOf();
        let Bob_days = Math.ceil(differenceInMilisecond / (1000 * 60 * 60 * 24));
        return Bob_days;

    }





    public onCharacter(event: any) {
        if (event.charCode !== 0) {
            const pattern = /[a-zA-Z]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }
    setOccupationList() {
        const data = {
            'platform': 'web',
            'product_id': '1',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.proposalservice.getBajajOccupation(data).subscribe(
            (successData) => {
                this.occupationListSuccess(successData);
            },
            (error) => {
                this.occupationListFailure(error);
            }
        );

    }

    public occupationListSuccess(successData) {
        this.occupationList = successData.ResponseObject;
    }

    public occupationListFailure(error) {
    }

    setrelationshipList() {
        const data = {
            'platform': 'web',
            'product_id': '1',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.proposalservice.getBajajRelationship(data).subscribe(
            (successData) => {
                this.relationListSuccess(successData);
            },
            (error) => {
                this.relationListFailure(error);
            }
        );

    }

    public relationListSuccess(successData) {
        this.relationshipList = successData.ResponseObject;
        this.insureRelation = [];
        this.nomeeRelation = [];
        for (let i = 0; i < this.relationshipList.length; i++) {
            if(this.relationshipList[i].show_prop_relationship == 1) {
                this.insureRelation.push(
                    {
                        'relationship_name': this.relationshipList[i].relationship_name,
                        'relationship_id': this.relationshipList[i].relationship_id
                    });
            }
            if(this.relationshipList[i].show_nominee_relationship == 1) {
                this.nomeeRelation.push(
                    {
                        'relationship_name': this.relationshipList[i].relationship_name,
                        'relationship_id': this.relationshipList[i].relationship_id
                    });
            }

        }
        console.log(this.insureRelation, 'this.insureRelationthis.insureRelation');
    }

    public relationListFailure(error) {
    }

    relationshipSame(i){
        if(this.insureArray['controls'].items['controls'][i]['controls'].insurerelationship.value == this.insureArray['controls'].items['controls'][i]['controls'].bajajRelationship.value){

            this.insureArray['controls'].items['controls'][i]['controls'].relationshipSameError.patchValue('Insurer and Nominee relationship should be different');
        } else{

            this.insureArray['controls'].items['controls'][i]['controls'].relationshipSameError.patchValue('');
        }
    }

    sessionData() {
        if (sessionStorage.stepper1Details != '' && sessionStorage.stepper1Details != undefined) {
            this.getStepper1 = JSON.parse(sessionStorage.stepper1Details);
            for (let i = 0; i < this.getStepper1.items.length; i++) {
                this.insureArray['controls'].items['controls'][i]['controls'].insureTitle.patchValue(this.getStepper1.items[i].insureTitle);
                this.insureArray['controls'].items['controls'][i]['controls'].insureName.patchValue(this.getStepper1.items[i].insureName);
                this.insureArray['controls'].items['controls'][i]['controls'].insureDob.patchValue(this.getStepper1.items[i].insureDob);
                this.insureArray['controls'].items['controls'][i]['controls'].insureGender.patchValue(this.getStepper1.items[i].insureGender);
                this.insureArray['controls'].items['controls'][i]['controls'].insureAge.patchValue(this.getStepper1.items[i].insureAge);
                this.insureArray['controls'].items['controls'][i]['controls'].insureHeight.patchValue(this.getStepper1.items[i].insureHeight);
                this.insureArray['controls'].items['controls'][i]['controls'].insureWeight.patchValue(this.getStepper1.items[i].insureWeight);
                this.insureArray['controls'].items['controls'][i]['controls'].insureEmail.patchValue(this.getStepper1.items[i].insureEmail);
                this.insureArray['controls'].items['controls'][i]['controls'].insureMobile.patchValue(this.getStepper1.items[i].insureMobile);
                this.insureArray['controls'].items['controls'][i]['controls'].insurePhone.patchValue(this.getStepper1.items[i].insurePhone);
                this.insureArray['controls'].items['controls'][i]['controls'].insureAddress.patchValue(this.getStepper1.items[i].insureAddress);
                this.insureArray['controls'].items['controls'][i]['controls'].insureAddress2.patchValue(this.getStepper1.items[i].insureAddress2);
                this.insureArray['controls'].items['controls'][i]['controls'].insurePincode.patchValue(this.getStepper1.items[i].insurePincode);
                this.insureArray['controls'].items['controls'][i]['controls'].insureNationality.patchValue(this.getStepper1.items[i].insureNationality);
                this.insureArray['controls'].items['controls'][i]['controls'].insureState.patchValue(this.getStepper1.items[i].insureState);
                this.insureArray['controls'].items['controls'][i]['controls'].insureDistrict.patchValue(this.getStepper1.items[i].insureDistrict);
                this.insureArray['controls'].items['controls'][i]['controls'].insureCity.patchValue(this.getStepper1.items[i].insureCity);
                this.insureArray['controls'].items['controls'][i]['controls'].insureArea.patchValue(this.getStepper1.items[i].insureArea);
                this.insureArray['controls'].items['controls'][i]['controls'].insureoccupation.patchValue(this.getStepper1.items[i].insureoccupation);
                this.insureArray['controls'].items['controls'][i]['controls'].insurerelationship.patchValue(this.getStepper1.items[i].insurerelationship);
                this.insureArray['controls'].items['controls'][i]['controls'].insureGMIncome.patchValue(this.getStepper1.items[i].insureGMIncome);
                this.insureArray['controls'].items['controls'][i]['controls'].insurePIName.patchValue(this.getStepper1.items[i].insurePIName);
                this.insureArray['controls'].items['controls'][i]['controls'].insurePIAddress.patchValue(this.getStepper1.items[i].insurePIAddress);
                this.insureArray['controls'].items['controls'][i]['controls'].insureCName.patchValue(this.getStepper1.items[i].insureCName);
                this.insureArray['controls'].items['controls'][i]['controls'].insurePItDate.patchValue(this.getStepper1.items[i].insurePItDate);
                this.insureArray['controls'].items['controls'][i]['controls'].insurePINumber.patchValue(this.getStepper1.items[i].insurePINumber);
                this.insureArray['controls'].items['controls'][i]['controls'].insureSInsurance.patchValue(this.getStepper1.items[i].insureSInsurance);
                this.insureArray['controls'].items['controls'][i]['controls'].insurePIClaims.patchValue(this.getStepper1.items[i].insurePIClaims);
                this.insureArray['controls'].items['controls'][i]['controls'].bajajNomineeName.patchValue(this.getStepper1.items[i].bajajNomineeName);
                this.insureArray['controls'].items['controls'][i]['controls'].bajajRelationship.patchValue(this.getStepper1.items[i].bajajRelationship);
                this.insureArray['controls'].items['controls'][i]['controls'].medicalPEDisease.patchValue(this.getStepper1.items[i].medicalPEDisease);
                this.insureArray['controls'].items['controls'][i]['controls'].medicalAsthma.patchValue(this.getStepper1.items[i].medicalAsthma);
                this.insureArray['controls'].items['controls'][i]['controls'].medicalDisordr.patchValue(this.getStepper1.items[i].medicalDisordr);
                this.insureArray['controls'].items['controls'][i]['controls'].medicalHeartDisease.patchValue(this.getStepper1.items[i].medicalHeartDisease);
                this.insureArray['controls'].items['controls'][i]['controls'].medicalHypertension.patchValue(this.getStepper1.items[i].medicalHypertension);
                this.insureArray['controls'].items['controls'][i]['controls'].medicalDiabetes.patchValue(this.getStepper1.items[i].medicalDiabetes);
                this.insureArray['controls'].items['controls'][i]['controls'].medicalObesity.patchValue(this.getStepper1.items[i].medicalObesity);
                this.insureArray['controls'].items['controls'][i]['controls'].medicalSmoking.patchValue(this.getStepper1.items[i].medicalSmoking);
                this.insureArray['controls'].items['controls'][i]['controls'].insureDisease.patchValue(this.getStepper1.items[i].insureDisease);
                this.insureArray['controls'].items['controls'][i]['controls'].rolecd.patchValue(this.getStepper1.items[i].rolecd);
                this.insureArray['controls'].items['controls'][i]['controls'].relationshipSameError.patchValue(this.getStepper1.items[i].relationshipSameError);
                this.insureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue(this.getStepper1.items[i].insurerDobValidError);
                this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue(this.getStepper1.items[i].insurerDobError);
                this.insureArray['controls'].items['controls'][i]['controls'].ins_days.patchValue(this.getStepper1.items[i].ins_days);
                this.insureArray['controls'].items['controls'][i]['controls'].ins_age.patchValue(this.getStepper1.items[i].ins_age);
                this.commonPincode(this.getStepper1.items[i].insurePincode, 'insurer')
            }
        }
    }

    //create poposal
    proposal(){
        console.log(this.insureArray,'insureArrayinsureArrayinsureArrayinsureArrayinsureArray')
        this.settings.loadingSpinner = true;
        const data  = {
            'platform': 'web',
            'product_id': this.buyProductdetails.product_id,
            'proposal_id': sessionStorage.proposalID ? sessionStorage.proposalID.toString(): this.proposalId.toString(),
            'enquiry_id': this.enquiryId,
            'company_name': 'bajajalianz',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
            'transactionid': '',
            'tycpdetails': {
                'beforetitle': this.insureArray['controls'].items['controls'][0]['controls'].insureTitle.value,
                'contact1': this.insureArray['controls'].items['controls'][0]['controls'].insureMobile.value,
                'dateofbirth': this.insureArray['controls'].items['controls'][0]['controls'].insureDob.value,
                'sex': this.insureArray['controls'].items['controls'][0]['controls'].insureGender.value,
                'telephone': this.insureArray['controls'].items['controls'][0]['controls'].insurePhone.value,
                'email': this.insureArray['controls'].items['controls'][0]['controls'].insureEmail.value,
                'firstname': this.insureArray['controls'].items['controls'][0]['controls'].insureName.value,
                'surname': this.insureArray['controls'].items['controls'][0]['controls'].insureName.value,
                'middlename': this.insureArray['controls'].items['controls'][0]['controls'].insureName.value
            },
            'tycpaddrlist': [{
                'postcode': this.insureArray['controls'].items['controls'][0]['controls'].insurePincode.value,
                'addressline1': this.insureArray['controls'].items['controls'][0]['controls'].insureAddress.value,
                'addressline2': this.insureArray['controls'].items['controls'][0]['controls'].insureAddress2.value,
                'areaname': this.insureArray['controls'].items['controls'][0]['controls'].insureArea.value,
                'cityname': this.insureArray['controls'].items['controls'][0]['controls'].insureCity.value,
                'countryname': this.insureArray['controls'].items['controls'][0]['controls'].insureNationality.value,
                'state': this.insureArray['controls'].items['controls'][0]['controls'].insureState.value
            }],
            'previnsdtls': {
                'previnsname': this.insureArray['controls'].items['controls'][0]['controls'].insurePIName.value,
                'previnsaddress': this.insureArray['controls'].items['controls'][0]['controls'].insurePIAddress.value,
                'previnspolicyno': this.insureArray['controls'].items['controls'][0]['controls'].insurePINumber.value,
                'prevpolicyexpirydate': this.insureArray['controls'].items['controls'][0]['controls'].insurePItDate.value,
                'noofclaims': this.insureArray['controls'].items['controls'][0]['controls'].insurePIClaims.value
            },
            'hcpdtmemlist': this.totalInsureDetails,
            'hcpdtmemcovlist': [{
                'memiptreatsi': this.buyProductdetails.suminsured_amount
            }]
        };
        console.log(data,'bajajjjjjjjjjsdddddd')
        this.proposalservice.getbajajProposal(data).subscribe(
            (successData) => {
                this.proposalSuccess(successData);
            },
            (error) => {
                this.proposalFailure(error);
            });
    }
    proposalSuccess(successData){
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess == true) {
            this.toastr.success('Insurer created successfully!!');
            this.summaryData = successData.ResponseObject;
            let getdata=[];
            this.RediretUrlLink = this.summaryData.payment_url;
            this.proposalId = this.summaryData.proposal_id;
            sessionStorage.proposalID = this.proposalId;
            this.lastStepper.next();
        } else{
            this.toastr.error(successData.ErrorObject);
        }
    }

    proposalFailure(error){
        this.settings.loadingSpinner = false;
    }

    add(event: any){
        if (event.charCode !== 0) {
            const pattern = /[0-9/\\ ]/;
            const inputChar = String.fromCharCode(event.charCode);

            if (!pattern.test(inputChar)) {
                // invalid character, prevent input
                event.preventDefault();
            }
        }
    }

    //Nationality List
    NationalityList() {
        const data = {
            'platform': 'web',
            'product_id': '11',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.proposalservice.getRelianceNationality(data).subscribe(
            (successData) => {
                this.getNationalityStatusSuccess(successData);
            },
            (error) => {
                this.getNationalityStatusFailure(error);
            }
        );
    }

    public getNationalityStatusSuccess(successData) {
        if (successData.IsSuccess == true) {
            this.nationalityList = successData.ResponseObject;
        }
    }

    public getNationalityStatusFailure(error) {
    }

    commonPincode(pin, title){
        this.pin = pin;
        this.title = title;
        const data = {
            'platform': 'web',
            'pincode': this.pin
        }
        if (this.pin.length == 6) {
            this.proposalservice.getCheckpincode(data).subscribe(
                (successData) => {
                    this.commonPincodeSuccess(successData);
                },
                (error) => {
                    this.commonPincodeFailure(error);
                }
            );
        }
    }
    commonPincodeSuccess(successData){
        this.setPincode = successData.ResponseObject;
        if (this.title == 'insurer') {
            if (successData.IsSuccess) {
                this.insureArray['controls'].items['controls'][0]['controls'].insureState.patchValue(this.setPincode.state_name);
                this.insureArray['controls'].items['controls'][0]['controls'].insureDistrict.patchValue(this.setPincode.district_name);
                this.insureArray['controls'].items['controls'][0]['controls'].insureCity.patchValue(this.setPincode.city_village_name);
                this.insureMArea = this.setPincode.area_details;
            } else {
                this.toastr.error('In valid Pincode');
                this.insureArray['controls'].items['controls'][0]['controls'].insureState.patchValue('');
                this.insureArray['controls'].items['controls'][0]['controls'].insureDistrict.patchValue('');
                this.insureArray['controls'].items['controls'][0]['controls'].insureCity.patchValue('');
                this.insureMArea = [];
            }
        }
    }
    commonPincodeFailure(error){
    }
}

@Component({
    selector: 'previousdisease',
    template: `        
        <div class="container">
        <div class="row">
            <div class="col-sm-10"></div>
                <div class="col-sm-2 text-right">
                    <mat-icon (click)="onNoClick()" style="cursor: pointer">close</mat-icon>
                </div>
                <div class="col-sm-12">
                    <p>Sorry you are selected Pre-Existing Diseases, so you are not allowed to purchase product.<strong>Please Contact <a class="color-blue"> click here</a></strong></p>
                </div>
            </div>
        </div>`,
})
export class previousDisease {

    constructor(
        public dialogRef: MatDialogRef<previousDisease>,
        @Inject(MAT_DIALOG_DATA) public data: any) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

}
