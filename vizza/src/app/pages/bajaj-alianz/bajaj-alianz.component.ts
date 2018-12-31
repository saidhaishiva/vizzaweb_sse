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
        this.totalMedicalDetails = [];

        this.insureArray = this.fb.group({

        });
        this.medicalArray = this.fb.group({

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
        this.medicalPersons = this.getFamilyDetails.family_members;
        this.insureArray = this.fb.group({
            items: this.fb.array([])
        });
        this.medicalArray = this.fb.group({
            mitems: this.fb.array([])
        });
        for (let i = 0; i < this.getFamilyDetails.family_members.length; i++) {
            this.items = this.insureArray.get('items') as FormArray;
            this.mitems = this.medicalArray.get('mitems') as FormArray;
            this.items.push(this.initItemRows());
            this.mitems.push(this.medicalItemRows());
            this.insureArray['controls'].items['controls'][i]['controls'].type.setValue(this.getFamilyDetails.family_members[i].type);
            this.medicalArray['controls'].mitems['controls'][i]['controls'].type.setValue(this.getFamilyDetails.family_members[i].type);
        }
        this.sessionData();
        this.setDate = Date.now();
        this.setDate = this.datepipe.transform(this.setDate, 'dd-MM-y');


    }

    initItemRows() {
        return this.fb.group(
            {
                rolecd: 'PRIMARY',
                insureTitle: ['', Validators.required],
                insureFirstname: '',
                insureMidname: '',
                insureLastname: '',
                insureName: '',
                insureDob: ['', Validators.compose([Validators.required])],
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
                insurePItDate:'',
                insureSInsurance:'',
                insurePIClaims:'',
                bajajNomineeName: ['', Validators.required],
                bajajRelationship: ['', Validators.required],
                type: '',
                insureDobError: '',
                ins_days: '',
                ins_age: ''

            }
        );
    }

    medicalItemRows(){
        return this.fb.group(
            {
            rolecd: 'MEDICAL',
            medicalPEDisease: 'No',
            medicalAsthma: 'No',
            medicalDisordr: 'No',
            medicalHeartDisease: 'No',
            medicalHypertension: 'No',
            medicalDiabetes: 'No',
            medicalObesity: 'No',
            medicalSmoking: 'No',
            type: '',
        })
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
                    'membername': i == 0 ? this.insurerData[i].insureFirstname : this.insurerData[i].insureName,
                    'memrelation': this.insurerData[i].insurerelationship,
                    'memdob': this.insurerData[i].insureDob,
                    'memage': this.insurerData[i].insureAge,
                    'memgender': this.insurerData[i].insureGender,
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
                    'memaddflag': 'Y'
                });
            }
            let ageValidate = [];
            for (let i = 0; i< this.insurerData.length; i++){
                if ( this.insureArray['controls'].items['controls'][i]['controls'].insureDobError.value  != '') {
                    ageValidate.push(1);

                } else{
                    ageValidate.push(0);
                }
            }
            if(!ageValidate.includes(1)){
                stepper.next();
            }
        }
    }

    //Medical History
    bajajMedicalDetails(stepper: MatStepper, id, value, key) {
        sessionStorage.stepper2Details = '';
        sessionStorage.stepper2Details = JSON.stringify(value);
        if (this.medicalArray.valid) {
            this.medicalData = value.mitems;
            this.totalMedicalDetails = [];
            console.log(this.totalInsureDetails,'totalInsureDetailstotalInsureDetails');
            for (let i = 0; i < this.insurePersons.length; i++) {
                this.totalMedicalDetails.push({
                    'mempreexistdisease': this.medicalData[i].medicalHeartDisease == 'Yes' ? '1' : '0',
                    'memasthma': this.medicalData[i].medicalAsthma == 'Yes' ? '1' : '0',
                    'memcholstrldisordr': this.medicalData[i].medicalDisordr == 'Yes' ? '1' : '0',
                    'memheartdisease': this.medicalData[i].medicalHeartDisease == 'Yes' ? '1' : '0',
                    'memhypertension': this.medicalData[i].medicalHypertension == 'Yes' ? '1' : '0',
                    'memdiabetes': this.medicalData[i].medicalDiabetes == 'Yes' ? '1' : '0',
                    'memobesity': this.medicalData[i].medicalObesity == 'Yes' ? '1' : '0',
                    'memsmkertbco': this.medicalData[i].medicalSmoking == 'Yes' ? '1' : '0',
                });


            }
            this.totalInsurer = [];
            this.totalInsureDetails.forEach((itm, i) => {
                this.totalInsurer.push(Object.assign({}, itm, this.totalMedicalDetails[i]));
            });

            console.log(this.totalInsurer,'ResultResultResultResult');
            this.lastStepper = stepper;
            this.proposal();
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


    addEvent(event, title, index) {
        let dd = event.value;
        this.selectDate = event.value;
        this.setDate = this.datepipe.transform(this.selectDate, 'dd-MM-y');
        this.setDateAge = this.datepipe.transform(this.selectDate, 'y-MM-dd');
        this.insureAge = this.ageCalculate(this.setDateAge);
        if(title == 'proposer'){
            sessionStorage.setItem('proposerAge', this.insureAge);
        } else if(title == 'insurer') {
            sessionStorage.setItem('insureAge', this.insureAge);
            this.insureArray['controls'].items['controls'][index]['controls'].insureAge.patchValue(sessionStorage.insureAge);
            // this.insureArray['controls'].items['controls'][index]['controls'].proposerPItDate.patchValue(sessionStorage.proposerPItDate);
            // this.insureArray['controls'].items['controls'][index]['controls'].insurePItDate.patchValue(sessionStorage.insurePItDate);
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

    public onCharacter(event: any) {
        if (event.charCode !== 0) {
            const pattern = /[a-zA-Z]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                event.preventDefault();
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
        return yearAge;
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
    }

    public relationListFailure(error) {
    }

    sessionData() {
        if (sessionStorage.stepper1Details != '' && sessionStorage.stepper1Details != undefined) {
            this.getStepper1 = JSON.parse(sessionStorage.stepper1Details);
            for (let i = 0; i < this.getStepper1.items.length; i++) {
                this.insureArray['controls'].items['controls'][i]['controls'].insureTitle.patchValue(this.getStepper1.items[i].insureTitle);
                this.insureArray['controls'].items['controls'][i]['controls'].insureFirstname.patchValue(this.getStepper1.items[i].insureFirstname);
                this.insureArray['controls'].items['controls'][i]['controls'].insureMidname.patchValue(this.getStepper1.items[i].insureMidname);
                this.insureArray['controls'].items['controls'][i]['controls'].insureLastname.patchValue(this.getStepper1.items[i].insureLastname);
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
                this.insureArray['controls'].items['controls'][i]['controls'].rolecd.patchValue(this.getStepper1.items[i].rolecd);
            }
        }
    if (sessionStorage.stepper2Details != '' && sessionStorage.stepper2Details != undefined) {
    this.getStepper2 = JSON.parse(sessionStorage.stepper2Details);
    for (let i = 0; i < this.getStepper2.mitems.length; i++) {
        this.medicalArray['controls'].mitems['controls'][i]['controls'].medicalPEDisease.patchValue(this.getStepper2.mitems[i].medicalPEDisease);
        this.medicalArray['controls'].mitems['controls'][i]['controls'].medicalAsthma.patchValue(this.getStepper2.mitems[i].medicalAsthma);
        this.medicalArray['controls'].mitems['controls'][i]['controls'].medicalDisordr.patchValue(this.getStepper2.mitems[i].medicalDisordr);
        this.medicalArray['controls'].mitems['controls'][i]['controls'].medicalHeartDisease.patchValue(this.getStepper2.mitems[i].medicalHeartDisease);
        this.medicalArray['controls'].mitems['controls'][i]['controls'].medicalHypertension.patchValue(this.getStepper2.mitems[i].medicalHypertension);
        this.medicalArray['controls'].mitems['controls'][i]['controls'].medicalDiabetes.patchValue(this.getStepper2.mitems[i].medicalDiabetes);
        this.medicalArray['controls'].mitems['controls'][i]['controls'].medicalObesity.patchValue(this.getStepper2.mitems[i].medicalObesity);
        this.medicalArray['controls'].mitems['controls'][i]['controls'].medicalSmoking.patchValue(this.getStepper2.mitems[i].medicalSmoking);
        this.medicalArray['controls'].mitems['controls'][i]['controls'].rolecd.patchValue(this.getStepper2.mitems[i].rolecd);
        }
    }
    }
    boolenHide(change: any, id, key){
        if(key == 'PEDisease' && change.value == 'No') {
            this.medicalArray['controls'].mitems['controls'][id]['controls'].medicalPEDisease.patchValue('');
        }
        if(key == 'Asthma' && change.value == 'No') {
            this.medicalArray['controls'].mitems['controls'][id]['controls'].medicalAsthma.patchValue('');
        }
        if(key == 'Disordr' && change.value == 'No') {
            this.medicalArray['controls'].mitems['controls'][id]['controls'].medicalDisordr.patchValue('');
        }
        if(key == 'HeartDisease' && change.value == 'No') {
            this.medicalArray['controls'].mitems['controls'][id]['controls'].medicalHeartDisease.patchValue('');
        }
        if(key == 'Hypertension' && change.value == 'No') {
            this.medicalArray['controls'].mitems['controls'][id]['controls'].medicalHypertension.patchValue('');
        }
        if(key == 'Diabetes' && change.value == 'No') {
            this.medicalArray['controls'].mitems['controls'][id]['controls'].medicalDiabetes.patchValue('');
        }
        if(key == 'Obesity' && change.value == 'No') {
            this.medicalArray['controls'].mitems['controls'][id]['controls'].medicalObesity.patchValue('');
        }
        if(key == 'Smoking' && change.value == 'No') {
            this.medicalArray['controls'].mitems['controls'][id]['controls'].medicalSmoking.patchValue('');
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
                'firstname': this.insureArray['controls'].items['controls'][0]['controls'].insureFirstname.value,
                'surname': this.insureArray['controls'].items['controls'][0]['controls'].insureLastname.value,
                'middlename': this.insureArray['controls'].items['controls'][0]['controls'].insureMidname.value
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
            'hcpdtmemlist': this.totalInsurer,
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
            this.toastr.success('Proposal created successfully!!');
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

    add(event){
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

