import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray, FormControl} from '@angular/forms';
import {HealthService} from '../../shared/services/health.service';
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
  selector: 'app-religare-health-proposal',
  templateUrl: './religare-health-proposal.component.html',
  styleUrls: ['./religare-health-proposal.component.scss'],
    providers: [

        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
})
export class ReligareHealthProposalComponent implements OnInit {
    public personal: FormGroup;
    public summary: FormGroup;
    public insureArray: FormGroup;
    public nomineeDetails: FormGroup;
    public setDate: any;
    public selectDate: any;
    public stopNext: boolean;
    public buyProductdetails: any;
    public groupName: any;
    public getFamilyDetails: any;
    public enquiryId: any;
    public personalData: any;
    public occupationList: any;
    public relationshipList: any;
    public relationshipLists: any;
    public today: any;
    public declaration: boolean;
    public summaryData: any;
    public lastStepper: any;
    public questionerData: any;
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
    public addonDetails: any;
    public rSummaryCity: any;
    public summaryRelationship : any;
    public sumTitle: any;
    public sumPin: any;
    public code: any;
    public sumAreaName: any;
    public sumAreaNameComm: any;
    public setDateAge: any;
    public personalAge: any;
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
    public insureSingle : any;
    public selectMr : any;
    public addon : any;
    public objectKeys : any;
    public setAddonDefault : any;
    religareListQuestions: any;
array: any;
    constructor(public proposalservice: HealthService, public datepipe: DatePipe, private toastr: ToastrService, public appSettings: AppSettings, public dialog: MatDialog,
                public config: ConfigurationService, public common: HealthService, public fb: FormBuilder, public auth: AuthService, public http: HttpClient, @Inject(LOCALE_ID) private locale: string) {
        let today = new Date();
        this.today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        this.stopNext = false;
        this.back = false;
        this.hideQuestion = false;
        this.declaration = false;
        this.setAddonDefault = true;
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
        this.insureSingle = true;
        this.selectMr = true;
        this.proposerInsureData = [];
        this.questions_list = [];
        this.arr = [];
        this.personal = this.fb.group({
            personalTitle: ['', Validators.required],
            personalFirstname: new FormControl(''),
            personalLastname: ['', Validators.required],
            personalGender: ['', Validators.compose([Validators.required])],
            personalDob: ['', Validators.compose([Validators.required])],
            personalrelationship: 'SELF',
            personalAadhar: ['', Validators.compose([Validators.minLength(12)])],
            personalPan: ['', Validators.compose([ Validators.required, Validators.minLength(10)])],
            personalGst: ['', Validators.compose([Validators.minLength(15)])],
            personalAddress: ['', Validators.required],
            personalAddress2: ['', Validators.required],
            personalPincode: ['', Validators.required],
            personalCity: ['', Validators.required],
            personalState: ['', Validators.required],
            personalEmail: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
            personalMobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
            personalAltnumber: '',
            residenceAddress: ['', Validators.required],
            residenceAddress2: [''],
            residencePincode: ['', Validators.required],
            residenceCity: ['', Validators.required],
            residenceState: ['', Validators.required],
            sameas: false,
            rolecd: 'PROPOSER',
            type: '',
            medical_status: 'No'

        });
        this.nomineeDetails = this.fb.group({
            'religareNomineeName': '',
            'religareRelationship': ''
        });


        console.log(this.totalData);

    }
    changeGender() {
        if(this.buyProductdetails.product_name == 'Joy Today' || this.buyProductdetails.product_name == 'Joy Tomorrow') {
            if (this.getFamilyDetails.family_members.length < 2) {
                if(this. personal['controls'].personalTitle.value == 'MR'){
                    this.insureSingle = false;
                    this.insureArray['controls'].items['controls'][0]['controls'].cityHide.patchValue(false);
                    this.insureArray['controls'].items['controls'][0]['controls'].sameAsProposer.patchValue(false);
                    this.insureArray['controls'].items['controls'][0]['controls'].pCityHide.patchValue(true);
                    this.insureArray['controls'].items['controls'][0]['controls'].personalTitle.patchValue('');
                    this.insureArray['controls'].items['controls'][0]['controls'].personalFirstname.patchValue('');
                    this.insureArray['controls'].items['controls'][0]['controls'].personalLastname.patchValue('');
                    this.insureArray['controls'].items['controls'][0]['controls'].personalDob.patchValue('');
                    this.insureArray['controls'].items['controls'][0]['controls'].personalAadhar.patchValue('');
                    this.insureArray['controls'].items['controls'][0]['controls'].personalrelationship.patchValue('');
                    this.insureArray['controls'].items['controls'][0]['controls'].personalGender.patchValue('');
                    this.insureArray['controls'].items['controls'][0]['controls'].personalPan.patchValue('');
                    this.insureArray['controls'].items['controls'][0]['controls'].personalGst.patchValue('');
                    this.insureArray['controls'].items['controls'][0]['controls'].personalAddress.patchValue('');
                    this.insureArray['controls'].items['controls'][0]['controls'].personalAddress2.patchValue('');
                    this.insureArray['controls'].items['controls'][0]['controls'].personalCity.patchValue('');
                    this.insureArray['controls'].items['controls'][0]['controls'].personalPincode.patchValue('');
                    this.insureArray['controls'].items['controls'][0]['controls'].personalState.patchValue('');
                    this.insureArray['controls'].items['controls'][0]['controls'].personalEmail.patchValue('');
                    this.insureArray['controls'].items['controls'][0]['controls'].personalMobile.patchValue('');
                    this.insureArray['controls'].items['controls'][0]['controls'].personalAltnumber.patchValue('');
                    this.insureArray['controls'].items['controls'][0]['controls'].personalrelationship.patchValue('');
                    this.insureArray['controls'].items['controls'][0]['controls'].sameas.patchValue('');
                    this.insureArray['controls'].items['controls'][0]['controls'].personalHeight.patchValue('');
                    this.insureArray['controls'].items['controls'][0]['controls'].personalWeight.patchValue('');
                    this.insureArray['controls'].items['controls'][0]['controls'].residenceAddress.patchValue('');
                    this.insureArray['controls'].items['controls'][0]['controls'].residenceAddress2.patchValue('');
                    this.insureArray['controls'].items['controls'][0]['controls'].residenceCity.patchValue('');
                    this.insureArray['controls'].items['controls'][0]['controls'].residencePincode.patchValue('');
                    this.insureArray['controls'].items['controls'][0]['controls'].residenceState.patchValue('');
                    this.insureArray['controls'].items['controls'][0]['controls'].rolecd.patchValue('PRIMARY');
                } else if(this. personal['controls'].personalTitle.value == 'MS'){
                    this.insureSingle = true;
                }
            }
        }

        if (this.personal.controls['personalTitle'].value == 'MR'){
            this.personal.controls['personalGender'].patchValue('Male');
        } else {
            this.personal.controls['personalGender'].patchValue('Female');
        }
    }
    insureChangeGender(index) {
      if (this.insureArray['controls'].items['controls'][index]['controls'].personalTitle.value == 'MR') {
          this.insureArray['controls'].items['controls'][index]['controls'].personalGender.patchValue('Male');
      } else {
          this.insureArray['controls'].items['controls'][index]['controls'].personalGender.patchValue('Female');
      }

    }




    ngOnInit() {
        this.buyProductdetails = JSON.parse(sessionStorage.buyProductdetails);
        if(this.buyProductdetails.product_id == 1) {
            this.nomineeDetails.get('religareNomineeName').setValidators([Validators.required]);
            this.nomineeDetails.get('religareRelationship').setValidators([Validators.required]);
        }
        if(this.buyProductdetails.product_id != 1) {
            this.nomineeDetails.get('religareNomineeName').setValidators(null);
            this.nomineeDetails.get('religareRelationship').setValidators(null);
        }
        this.nomineeDetails.get('religareNomineeName').updateValueAndValidity();
        this.nomineeDetails.get('religareRelationship').updateValueAndValidity();

        this.enquiryId = sessionStorage.enquiryId;
        this.groupName = sessionStorage.groupName;
        this.getFamilyDetails = JSON.parse(sessionStorage.changedTabDetails);
        this.insurePersons = this.getFamilyDetails.family_members;
        this.setOccupationListCode();
        this.religareQuestions();
        this.setOccupationList();
        this.setRelationship();
        if(this.buyProductdetails.product_id == 1) {
            this.getAddon();
            if(this.buyProductdetails.suminsured_amount == 300000.00){
                this.setAddonDefault = false;
            }
        }
        this.insureArray = this.fb.group({
            items: this.fb.array([])
        });
        for (let i = 0; i < this.getFamilyDetails.family_members.length; i++) {
            this.items = this.insureArray.get('items') as FormArray;
            this.items.push(this.initItemRows());
            this.insureArray['controls'].items['controls'][i]['controls'].type.setValue(this.getFamilyDetails.family_members[i].type);
        }

        if(this.buyProductdetails.product_name == 'Joy Today' || this.buyProductdetails.product_name == 'Joy Tomorrow') {
                if (this.getFamilyDetails.family_members.length < 2) {
                    if (this.personal['controls'].personalTitle.value == 'MR') {
                        this.insureSingle = false;

                    } else if(this.personal['controls'].personalTitle.value == 'MS'){
                        this.insureSingle = true;
                    }
                }
        }

        this.previousinsurance = [
            'IFFCO TOKIO General Insurance Co. Ltd.',
            'Liberty General Insurance Co. Ltd.',
            'Shriram General Insurance Co. Ltd.',
            'Reliance General Insurance Co. Ltd',
            'DHFL General Insurance Co. Ltd.',
            'Bajaj Allianz Allianz General Insurance Co. Ltd.',
            'Edelweiss General Insurance Co.Ltd.',
            'Kotak Mahindra General Insurance Co. Ltd.',
            'Go Digit General Insurance Co. Ltd.',
            'Royal Sundaram General Insurance Co. Ltd.',
            'Exports Credit Guarantee of India Co. Ltd',
            'The New India Assurance Co. Ltd.',
            'Tata AIG General Insurance Company Limited',
            'National Insurance Co. Ltd.',
            'Universal Sompo General Insurance Co. Ltd.',
            'Agriculture Insurance Company of India Ltd.',
            'Acko General Insurance Co. Ltd.',
            'SBI General Insurance Co. Ltd.',
            'Bharti AXA General Insurance Co. Ltd.',
            'ICICI LOMBARD General Insurance Co. Ltd.',
            'Magma HDI General Insurance Co. Ltd.',
            'HDFC ERGO General Insurance Co.Ltd.',
            'United India Insurance Co. Ltd.',
            'The Oriental Insurance Co. Ltd.',
            'Future Generali India Insurance Co. Ltd.',
            'Cholamandalam MS General Insurance Co. Ltd.',
            'Raheja QBE General Insurance Co. Ltd.',
            'Star Health & Allied Insurance Co.Ltd.',
            'Apollo Munich Health Insurance Co. Ltd',
            'Religare Health Insurance Co. Ltd',
            'Max Bupa Health Insurance Co. Ltd',
            'CIGNA TTK Health Insurance Co. Ltd.',
            'Aditya Birla Health Insurance Co. Ltd.'
        ];



        console.log(this.questionerData, 'this.questionerData[i].sub_questions_list.length');
        this.sessionData();


        this.setDate = Date.now();
        this.setDate = this.datepipe.transform(this.setDate, 'dd-MM-y');
        if(this.buyProductdetails.premium_amount >= 50000 || this.getFamilyDetails.family_members.type == 'Self') {
            this.personal.get('personalPan').setValidators([Validators.compose([ Validators.required, Validators.minLength(10)])]);
        } else{
            this.personal.get('personalPan').setValidators(null);
        }
        this.personal.get('personalPan').updateValueAndValidity();


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
                personalTitle: ['', Validators.required],
                personalFirstname: new FormControl(''),
                personalLastname: ['', Validators.required],
                personalDob: ['', Validators.required],
                personalGender: ['', Validators.compose([Validators.required])],
                personalrelationship: ['', Validators.required],
                personalAadhar: ['', Validators.compose([Validators.minLength(12)])],
                personalPan: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
                personalGst: ['', Validators.compose([Validators.minLength(15)])],
                personalAddress: ['', Validators.required],
                sameAsProposer: false,
                personalAddress2: ['', Validators.required],
                personalPincode: ['', Validators.required],
                personalCity: ['', Validators.required],
                personalState: ['', Validators.required],
                personalEmail: '',
                personalMobile: ['', Validators.compose([ Validators.pattern('[6789][0-9]{9}')])],
                personalAltnumber: '',
                residenceAddress: ['', Validators.required],
                residenceAddress2: [''],
                residencePincode: ['', Validators.required],
                residenceCity: ['', Validators.required],
                residenceState: ['', Validators.required],
                personalWeight: ['', Validators.required],
                personalHeight: ['', Validators.required],
                sameas: false,
                type: '',
                cityHide: '',
                pCityHide: '',
                altmobileNumber:'',
                ins_age: '',
                ins_days: '',
                insurerDobError: ''
            }
        );
    }

    //Insure Details
    religareInsureDetails(stepper: MatStepper, value, key) {
        console.log(value);
        sessionStorage.stepper2Details = '';
        sessionStorage.stepper2Details = JSON.stringify(value);
        this.insurerData = value;
        this.proposerInsureData = [];
        this.totalReligareData = [];
        this.proposerInsureData.push(this.personalData);
        if (this.insureArray.valid) {
            for (let i = 0; i < this.insurePersons.length; i++) {
                this.insurerData.items[i].type = this.insurePersons[i].type;
            }
            for (let i = 0; i < this.insurerData.items.length; i++) {
                this.proposerInsureData.push(this.insurerData.items[i]);
            }

            for (let i = 0; i < this.proposerInsureData.length; i++) {
                this.totalReligareData.push({
                    'title': this.proposerInsureData[i].personalTitle,
                    'proposer_fname': this.proposerInsureData[i].personalFirstname,
                    'proposer_lname': this.proposerInsureData[i].personalLastname,
                    'prop_email_list': [{
                        'email': this.proposerInsureData[i].personalEmail,
                        'email_type': 'PERSONAL'
                    }],
                    'prop_contact_list': [{
                        'contact_no': this.proposerInsureData[i].personalMobile,
                        'contact_type': 'MOBILE',
                        'std_code': '91'
                    }],
                    'prop_identity_list': [
                        {
                            'identity_number': this.proposerInsureData[i].personalPan,
                            'identity_type': this.proposerInsureData[i].personalPan != '' ? 'PAN' : ''
                        }
                    ],
                    'proposer_res_address1': this.proposerInsureData[i].residenceAddress,
                    'proposer_res_address2': this.proposerInsureData[i].residenceAddress2,
                    'proposer_res_area': this.proposerInsureData[i].residenceCity,
                    'proposer_res_city': this.proposerInsureData[i].residenceCity,
                    'proposer_res_state': this.proposerInsureData[i].residenceState,
                    'proposer_res_pincode': this.proposerInsureData[i].residencePincode,
                    'proposer_comm_address1': this.proposerInsureData[i].personalAddress,
                    'proposer_comm_address2': this.proposerInsureData[i].personalAddress2,
                    'proposer_comm_area': this.proposerInsureData[i].personalCity,
                    'proposer_comm_city': this.proposerInsureData[i].personalCity,
                    'proposer_comm_state': this.proposerInsureData[i].personalState,
                    'proposer_comm_pincode': this.proposerInsureData[i].personalPincode,
                    'prop_dob': this.proposerInsureData[i].personalDob,
                    'prop_gender': this.proposerInsureData[i].personalGender,
                    'relationship_cd': i == 0 ? 'SELF' : this.proposerInsureData[i].personalrelationship ,
                    'role_cd': this.proposerInsureData[i].rolecd,
                    'height': this.proposerInsureData[i].personalHeight,
                    'weight': this.proposerInsureData[i].personalWeight,
                });
                if (this.proposerInsureData[i].personalAltnumber != '') {
                    this.totalReligareData[i].prop_contact_list.push({
                        'contact_no': this.proposerInsureData[i].personalAltnumber,
                        'contact_type': 'RESEDENTIAL',
                        'std_code': '91'
                    });
                }
                if (this.proposerInsureData[i].personalAadhar != '') {
                    this.totalReligareData[i].prop_identity_list.push({
                        'identity_number': this.proposerInsureData[i].personalAadhar,
                        'identity_type': 'AADHAR'
                    });
                }
                if (this.proposerInsureData[i].personalGst != '') {
                    this.totalReligareData[i].prop_identity_list.push({
                        'identity_number': this.proposerInsureData[i].personalGst,
                        'identity_type': 'GST'
                    });
                }
                // if (this.proposerInsureData[i].personalPan != '') {
                //     this.totalReligareData[i].prop_identity_list.push({
                //         'identity_number': this.proposerInsureData[i].personalPan,
                //         'identity_type': 'PAN'
                //     });
                // }
                console.log(this.totalReligareData, 'this.totalReligareDatathis.totalReligareData');

            }
            let aterMobile = [];
            for(let i=0;i<this.insurerData.items.length; i++) {
                if (this.insureArray['controls'].items['controls'][i]['controls'].altmobileNumber.value != '' ) {
                    aterMobile.push(0);

                } else if (this.insureArray['controls'].items['controls'][i]['controls'].altmobileNumber.value == '' ) {
                    aterMobile.push(1);

                }
                if (this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.value != '') {
                    aterMobile.push(2);

                } else if (this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.value == '') {
                    aterMobile.push(3);

                }

            }

            if (aterMobile.includes(0)) {
                this.toastr.error('Alternative and personal number should be different');
            } else if(aterMobile.includes(2)){} else {
                stepper.next();
            }

        }
    }



    //Nominee Details
    religareNomineeDetails(stepper: MatStepper, value) {
        this.lastStepper = stepper;
        console.log(value);

        if (this.nomineeDetails.valid) {
            sessionStorage.nomineeData = '';
            sessionStorage.nomineeData = JSON.stringify(value);
            this.proposal();
        }
    }

    subStatus(value: any, i, k, j) {
        if (value.checked) {
        } else {
            this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].existingSince = '';
        }

    }


    medicalHistoryDetails(stepper: MatStepper) {

        sessionStorage.stepper3Details = '';
        sessionStorage.stepper3Details = JSON.stringify(this.religareQuestionsList);
        console.log( sessionStorage.stepper3Details, ' sessionStorage.stepper3Details');
        this.questions_list = [];
        this.getFilterData = [];
            for (let i = 0; i < this.religareQuestionsList.length; i++) {
                for (let j = 0; j < this.religareQuestionsList[i].sub_questions_list.length; j++) {
                    for (let k = 0; k < this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group.length; k++) {
                        this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].question_id = this.religareQuestionsList[i].sub_questions_list[j].question_details.question_id;
                        this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].question_set_code = this.religareQuestionsList[i].sub_questions_list[j].question_set_code;
                        this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].question_code = this.religareQuestionsList[i].sub_questions_list[j].question_details.question_code;
                        this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].existing_question_code = this.religareQuestionsList[i].sub_questions_list[j].question_details.existing_question_code;
                        this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].otherdetails_desc_code = this.religareQuestionsList[i].sub_questions_list[j].question_details.other_description_code;
                        this.questions_list.push(this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k]);
                    }
                }
        }

        for (let i = 0; i < this.getFamilyDetails.family_members.length; i++) {
            this.getFilterData.push(this.questions_list.filter(data => data.type == this.getFamilyDetails.family_members[i].type ));
        }
        for (let i = 0; i < this.totalReligareData.length; i++) {
                if (i > 0) {
                    this.totalReligareData[i].questions_list = this.getFilterData[i -1];
                }
        }
        let statusChecked = [];
            this.medicalStatus = [];
            console.log(this.religareQuestionsList, 'this.religareQuestionsList');
        for (let i = 0; i < this.religareQuestionsList.length; i++) {

            if(this.religareQuestionsList[i].mStatus == 'No'){
                this.medicalStatus.push('No');
            } else if(this.religareQuestionsList[i].mStatus == 'Yes') {
                this.medicalStatus.push('Yes');
            }
            

                for (let i = 0; i < this.totalReligareData.length; i++) {
                    this.totalReligareData[i].medical_status = this.medicalStatus.includes('Yes') ? 'Yes' : 'No'
                }


         if (this.religareQuestionsList[i].answer_status == true) {
             for (let j = 0; j < this.religareQuestionsList[i].sub_questions_list.length; j++) {
               for (let k = 0; k < this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group.length; k++) {
                   if (this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].status == true) {
                       if (this.religareQuestionsList[i].sub_questions_list[j].question_details.question_description != '') {
                           statusChecked.push(1);
                       if (this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].existingSince == '') {
                           statusChecked.push(0);
                       }} else {
                           if (this.religareQuestionsList[i].sub_questions_list[j].question_details.description_textarea == '1') {
                               if (this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].diseasesDescription == '') {
                                   statusChecked.push(0);
                               } else {
                                   statusChecked.push(1);
                               }
                           }  else {
                               statusChecked.push(1);
                           }


                       }
                   }
               }
             }
             if (statusChecked.length == 0){
                 statusChecked.push(2);
             }

         } else {

             if (i == this.religareQuestionsList.length - 1) {
                 statusChecked.push(1);
             }

         }
         console.log(this.medicalStatus, 'this.medicalStatus');
         console.log(statusChecked, 'this.statusChecked');

        }

            if (statusChecked.includes(0)) {
                this.toastr.error('Please fill the empty field');
            } else if (statusChecked.includes(2)) {
                this.toastr.error('Please check atleast one checkbox!');
            } else {
                stepper.next();
            }

    }


    //Personal Details
    personalDetails(stepper: MatStepper, value) {
        this.personalData = value;
        console.log(this.personalData, 'dfgdfg');
        this.personalData.rolecd = 'PROPOSER';
        this.personalData.type = 'SELF';
        sessionStorage.stepper1Details = '';
        sessionStorage.stepper1Details = JSON.stringify(value);
        console.log(value.personalDob, 'value');
        this.addonDetails = [];
        if (this.personal.valid) {
            if(this.buyProductdetails.product_id == 1) {
                for (let i = 0; i < this.objectKeys.length; i++) {
                    if (this.objectKeys[i].checked) {
                        this.addonDetails.push(this.objectKeys[i].key);
                    }
                }
                sessionStorage.addonDetails = '';
                sessionStorage.addonDetails = JSON.stringify(this.objectKeys);

            }
            this.proposerInsureData = [];
            if (sessionStorage.proposerAge >= 18) {
                this.proposerInsureData.push(this.personalData);
                if (this.mobileNumber == '' || this.mobileNumber == 'true'){
                    stepper.next();
            }

            } else {
                this.toastr.error('Proposer age should be 18 or above');
            }
            console.log( this.addonDetails, ' this.addonDetails');
        }
    }
    addonItem(event: any, i){
        if (event.checked) {
            this.objectKeys[i].checked = true;

        } else {
            this.objectKeys[i].checked = false;

        }
    }
    religareQuestion(stepper: MatStepper) {
        this.questionEmpty = false;
        for (let i = 0; i < this.religareQuestionsList.length; i++) {
            if (this.religareQuestionsList[i].answer == '') {
                this.questionEmpty = false;
                break;
            } else {
                this.questionEmpty = true;
            }
        }
        if (this.questionEmpty ) {
            stepper.next();

        } else {
            this.toastr.error('Please fill the all Answers');

        }
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

    sameAddress(values: any) {
        this.sameField = values.checked;
        if (values.checked) {
            this.inputReadonly = true;
            console.log(values.checked);
            this.personal.controls['residenceAddress'].setValue(this.personal.controls['personalAddress'].value);
            this.personal.controls['residenceAddress2'].setValue(this.personal.controls['personalAddress2'].value);
            this.personal.controls['residenceCity'].setValue(this.personal.controls['personalCity'].value);
            this.personal.controls['residencePincode'].setValue(this.personal.controls['personalPincode'].value);
            this.personal.controls['residenceState'].setValue(this.personal.controls['personalState'].value);

        } else {
            this.inputReadonly = false;
            this.personal.controls['residenceAddress'].setValue('');
            this.personal.controls['residenceAddress2'].setValue('');
            this.personal.controls['residenceCity'].setValue('');
            this.personal.controls['residencePincode'].setValue('');
            this.personal.controls['residenceState'].setValue('');

        }
    }

    sameAddressInsurer(values: any, index) {

        if (values.checked) {
            this.insureArray['controls'].items['controls'][index]['controls'].cityHide.patchValue(this.insureArray['controls'].items['controls'][index]['controls'].sameas.value);
            this.insureArray['controls'].items['controls'][index]['controls'].residenceAddress.patchValue(this.insureArray['controls'].items['controls'][index]['controls'].personalAddress.value);
            this.insureArray['controls'].items['controls'][index]['controls'].residenceAddress2.patchValue(this.insureArray['controls'].items['controls'][index]['controls'].personalAddress2.value);
            this.insureArray['controls'].items['controls'][index]['controls'].residenceCity.patchValue(this.insureArray['controls'].items['controls'][index]['controls'].personalCity.value);
            this.insureArray['controls'].items['controls'][index]['controls'].residencePincode.patchValue(this.insureArray['controls'].items['controls'][index]['controls'].personalPincode.value);
            this.insureArray['controls'].items['controls'][index]['controls'].residenceState.patchValue(this.insureArray['controls'].items['controls'][index]['controls'].personalState.value);

        } else {
            this.insureArray['controls'].items['controls'][index]['controls'].cityHide.patchValue(this.insureArray['controls'].items['controls'][index]['controls'].sameas.value);
            this.insureArray['controls'].items['controls'][index]['controls'].residenceAddress.patchValue('');
            this.insureArray['controls'].items['controls'][index]['controls'].residenceAddress2.patchValue('');
            this.insureArray['controls'].items['controls'][index]['controls'].residenceCity.patchValue('');
            this.insureArray['controls'].items['controls'][index]['controls'].residencePincode.patchValue('');
            this.insureArray['controls'].items['controls'][index]['controls'].residenceState.patchValue('');

        }
    }

    public keyPress(event: any) {
        if (event.charCode !== 0) {
            const pattern = /[0-9/\\]/;
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
    addEvent(event) {
        this.selectDate = event.value;
        console.log(this.selectDate);
        this.setDate = this.datepipe.transform(this.selectDate, 'dd-MM-y');
        this.setDateAge = this.datepipe.transform(this.selectDate, 'y-MM-dd');
        this.personalAge = this.ageCalculate(this.setDateAge);
        sessionStorage.setItem('proposerAge', this.personalAge);
    }
    addEventInsurer(event,  i, type) {
        this.selectDate = event.value;
        console.log(this.selectDate);
        this.setDate = this.datepipe.transform(this.selectDate, 'dd-MM-y');
        this.setDateAge = this.datepipe.transform(this.selectDate, 'y-MM-dd');
        let days = this.DobDaysCalculate(this.setDateAge);
        let age = this.ageCalculate(this.setDateAge);
        this.insureArray['controls'].items['controls'][i]['controls'].ins_age.patchValue(age);
        this.insureArray['controls'].items['controls'][i]['controls'].ins_days.patchValue(days);
        if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 18 && type == 'Self') {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Self age should be above 18');
        } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value > 18 && type == 'Self')  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        }
        if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 18 && type == 'Spouse') {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Spouse age should be above 18');
        } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value > 18 && type == 'Spouse')  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        }
        if((this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value >=25 || this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value <= 91)  && type == 'Son') {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 91 days to 25 years');
        } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value > 1 && type == 'Son')  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        }
        if((this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value >=25 || this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value <= 91) && type == 'Daughter') {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 91 days to 25 years');
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

        if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value < 46 && type == 'Self' && this.buyProductdetails.product_name == 'Care Freedom') {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Self age should be above 45');
        } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value > 45 && type == 'Self' && this.buyProductdetails.product_name == 'Care Freedom')  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        }
        if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value < 46 && type == 'Spouse' && this.buyProductdetails.product_name == 'Care Freedom') {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Spouse age should be above 45');
        } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value > 45 && type == 'Spouse' && this.buyProductdetails.product_name == 'Care Freedom')  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        }


        console.log(this.insureArray.value);
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
    stepback() {
        this.back = true;
        console.log(this.back);
    }
    quesback() {
        this.back = false;
        console.log(this.back);
    }

    getAddon() {

        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'prod_id': this.buyProductdetails.product_id

        }

        this.proposalservice.getReligareAddon(data).subscribe(
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
            console.log(successData, 'successData');
            this.addon = successData.ResponseObject.addons_list[0];
            this.objectKeys = Object.keys(this.addon).map(k => ({key: k, value:  this.addon[k]}));
            for (let i=0; i < this.objectKeys.length; i++) {
                this.objectKeys[i].checked = false;
            }
        }
    }

    public AddonFailure(error) {
        console.log(error);
    }

    sessionData() {
        console.log(sessionStorage.stepper1Details, 'stepper1Details');
        if (sessionStorage.stepper1Details != '' && sessionStorage.stepper1Details != undefined) {
            console.log(JSON.parse(sessionStorage.stepper1Details), 'sessionStorage.stepper1Details');
            this.getStepper1 = JSON.parse(sessionStorage.stepper1Details);
            this.personal = this.fb.group({
                personalTitle: this.getStepper1.personalTitle,
                personalFirstname: this.getStepper1.personalFirstname,
                personalLastname: this.getStepper1.personalLastname,
                personalDob: new FormControl(new Date(this.getStepper1.personalDob)),
                personalArea: this.getStepper1.personalArea,
                residenceArea: this.getStepper1.residenceArea,
                personalAadhar: this.getStepper1.personalAadhar,
                personalrelationship: this.getStepper1.personalrelationship,
                sameAsProposer: this.getStepper1.sameAsProposer,
                personalGender: this.getStepper1.personalGender,
                personalPan: this.getStepper1.personalPan.toUpperCase(),
                personalGst: this.getStepper1.personalGst,
                personalAddress: this.getStepper1.personalAddress,
                personalAddress2: this.getStepper1.personalAddress2,
                personalPincode: this.getStepper1.personalPincode,
                personalCity: this.getStepper1.personalCity,
                personalState: this.getStepper1.personalState,
                personalEmail: this.getStepper1.personalEmail,
                personalMobile: this.getStepper1.personalMobile,
                personalAltnumber: this.getStepper1.personalAltnumber,
                personalWeight: this.getStepper1.personalWeight,
                personalHeight: this.getStepper1.personalHeight,
                residenceAddress: this.getStepper1.residenceAddress,
                residenceAddress2: this.getStepper1.residenceAddress2,
                residencePincode: this.getStepper1.residencePincode,
                residenceCity: this.getStepper1.residenceCity,
                residenceState: this.getStepper1.residenceState,
                rolecd: this.getStepper1.rolecd,
                relationshipcd: this.getStepper1.relationshipcd,
                sameas: this.getStepper1.sameas
            });

        }
        if (sessionStorage.addonDetails != '' && sessionStorage.addonDetails != undefined) {
            let getAddon = JSON.parse(sessionStorage.addonDetails);
            setTimeout(() => {
            for(let i = 0; i < getAddon.length; i++){
                if(getAddon[i].checked == true){
                    this.objectKeys[i].checked = getAddon[i].checked;
                }
            }
            },2000);

        }


        if (sessionStorage.stepper2Details != '' && sessionStorage.stepper2Details != undefined) {
            console.log(JSON.parse(sessionStorage.stepper2Details), 'sessionStorage.stepper1Details');
            this.getStepper2 = JSON.parse(sessionStorage.stepper2Details);
            for (let i = 0; i < this.getStepper2.items.length; i++) {
                this.insureArray['controls'].items['controls'][i]['controls'].personalTitle.patchValue(this.getStepper2.items[i].personalTitle);
                this.insureArray['controls'].items['controls'][i]['controls'].personalFirstname.patchValue(this.getStepper2.items[i].personalFirstname);
                this.insureArray['controls'].items['controls'][i]['controls'].personalLastname.patchValue(this.getStepper2.items[i].personalLastname);
                this.insureArray['controls'].items['controls'][i]['controls'].personalDob.patchValue(this.getStepper2.items[i].personalDob);
                this.insureArray['controls'].items['controls'][i]['controls'].personalAadhar.patchValue(this.getStepper2.items[i].personalAadhar);
                this.insureArray['controls'].items['controls'][i]['controls'].personalrelationship.patchValue(this.getStepper2.items[i].personalrelationship);
                this.insureArray['controls'].items['controls'][i]['controls'].personalGender.patchValue(this.getStepper2.items[i].personalGender);
                this.insureArray['controls'].items['controls'][i]['controls'].personalPan.patchValue(this.getStepper2.items[i].personalPan.toUpperCase());
                this.insureArray['controls'].items['controls'][i]['controls'].personalGst.patchValue(this.getStepper2.items[i].personalGst);
                this.insureArray['controls'].items['controls'][i]['controls'].personalAddress.patchValue(this.getStepper2.items[i].personalAddress);
                this.insureArray['controls'].items['controls'][i]['controls'].personalAddress2.patchValue(this.getStepper2.items[i].personalAddress2);
                this.insureArray['controls'].items['controls'][i]['controls'].personalCity.patchValue(this.getStepper2.items[i].personalCity);
                this.insureArray['controls'].items['controls'][i]['controls'].personalPincode.patchValue(this.getStepper2.items[i].personalPincode);
                this.insureArray['controls'].items['controls'][i]['controls'].personalState.patchValue(this.getStepper2.items[i].personalState);
                this.insureArray['controls'].items['controls'][i]['controls'].personalEmail.patchValue(this.getStepper2.items[i].personalEmail);
                this.insureArray['controls'].items['controls'][i]['controls'].personalMobile.patchValue(this.getStepper2.items[i].personalMobile);
                this.insureArray['controls'].items['controls'][i]['controls'].personalAltnumber.patchValue(this.getStepper2.items[i].personalAltnumber);
                this.insureArray['controls'].items['controls'][i]['controls'].personalHeight.patchValue(this.getStepper2.items[i].personalHeight);
                this.insureArray['controls'].items['controls'][i]['controls'].personalWeight.patchValue(this.getStepper2.items[i].personalWeight);
                this.insureArray['controls'].items['controls'][i]['controls'].sameas.patchValue(this.getStepper2.items[i].sameas);
                this.insureArray['controls'].items['controls'][i]['controls'].sameAsProposer.patchValue(this.getStepper2.items[i].sameAsProposer);
                this.insureArray['controls'].items['controls'][i]['controls'].residenceAddress.patchValue(this.getStepper2.items[i].residenceAddress);
                this.insureArray['controls'].items['controls'][i]['controls'].residenceAddress2.patchValue(this.getStepper2.items[i].residenceAddress2);
                this.insureArray['controls'].items['controls'][i]['controls'].residenceCity.patchValue(this.getStepper2.items[i].residenceCity);
                this.insureArray['controls'].items['controls'][i]['controls'].residencePincode.patchValue(this.getStepper2.items[i].residencePincode);
                this.insureArray['controls'].items['controls'][i]['controls'].residenceState.patchValue(this.getStepper2.items[i].residenceState);
                this.insureArray['controls'].items['controls'][i]['controls'].rolecd.patchValue(this.getStepper2.items[i].rolecd);
            }
        }





        if (sessionStorage.nomineeData != '' && sessionStorage.nomineeData != undefined) {
            console.log(JSON.parse(sessionStorage.nomineeData), 'sessionStorage.stepper1Details');
            this.getNomineeData = JSON.parse(sessionStorage.nomineeData);
            this.nomineeDetails = this.fb.group({
                religareNomineeName: this.getNomineeData.religareNomineeName,
                religareRelationship: this.getNomineeData.religareRelationship
            });
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


            if (sessionStorage.mobileNumber != '' ) {
                this.mobileNumber = sessionStorage.mobileNumber;
            } else {
                this.mobileNumber = 'true';
            }


        } },4000);

            for (let i = 0; i < this.getStepper2.items.length; i++) {

                if (this.getStepper2.items[i].personalPincode != '') {
                    this.insureArray['controls'].items['controls'][i]['controls'].pCityHide.patchValue(true);
                    this.insureArray['controls'].items['controls'][i]['controls'].personalCity.patchValue(this.getStepper2.items[i].personalCity);
                    this.insureArray['controls'].items['controls'][i]['controls'].personalPincode.patchValue(this.getStepper2.items[i].personalPincode);
                    this.insureArray['controls'].items['controls'][i]['controls'].personalState.patchValue(this.getStepper2.items[i].personalState);

                    if (this.getStepper2.items[0].sameAsProposer) {
                        this.insureArray['controls'].items['controls'][0]['controls'].pCityHide.patchValue(true);
                        this.insureArray['controls'].items['controls'][0]['controls'].cityHide.patchValue(true);
                    }
                        if (this.getStepper2.items[i].sameas) {
                            this.insureArray['controls'].items['controls'][i]['controls'].pCityHide.patchValue(this.getStepper2.items[i].sameas);
                            this.insureArray['controls'].items['controls'][i]['controls'].residencePincode.patchValue(this.getStepper2.items[i].personalPincode);
                            this.insureArray['controls'].items['controls'][i]['controls'].residenceState.patchValue(this.getStepper2.items[i].personalState);
                            this.insureArray['controls'].items['controls'][i]['controls'].residenceCity.patchValue(this.getStepper2.items[i].personalCity);
                        }
                        if (this.getStepper2.items[i].sameas == false && this.getStepper2.items[i].residencePincode != '') {
                            this.insureArray['controls'].items['controls'][i]['controls'].cityHide.patchValue(true);
                            this.insureArray['controls'].items['controls'][i]['controls'].residencePincode.patchValue(this.getStepper2.items[i].residencePincode);
                            this.insureArray['controls'].items['controls'][i]['controls'].residenceState.patchValue(this.getStepper2.items[i].residenceState);
                            this.insureArray['controls'].items['controls'][i]['controls'].residenceCity.patchValue(this.getStepper2.items[i].residenceCity);
                        }
                }
            }
        if (sessionStorage.proposal3Detail != '' && sessionStorage.proposal3Detail != undefined) {
            console.log(JSON.parse(sessionStorage.proposal3Detail), 'sessionStorage.proposal3Detail');
            // this.getStepper3 = JSON.parse(sessionStorage.proposal3Detail);
            this.religareListQuestions = JSON.parse(sessionStorage.proposal3Detail);
            console.log(this.religareListQuestions, 'sessionStorage.this.personalAccidentQuestionsList');

        } else {
            this.religareQuestions();
        }
    }






    sameProposer(value: any) {
        if (value.checked) {
            this.insureArray['controls'].items['controls'][0]['controls'].cityHide.patchValue(true);
            this.insureArray['controls'].items['controls'][0]['controls'].pCityHide.patchValue(true);
            this.insureArray['controls'].items['controls'][0]['controls'].personalTitle.patchValue(this.personal.controls['personalTitle'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].personalFirstname.patchValue(this.personal.controls['personalFirstname'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].personalLastname.patchValue(this.personal.controls['personalLastname'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].personalDob.patchValue(this.personal.controls['personalDob'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].personalAadhar.patchValue(this.personal.controls['personalAadhar'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].personalrelationship.patchValue(this.personal.controls['personalrelationship'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].personalGender.patchValue(this.personal.controls['personalGender'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].personalPan.patchValue(this.personal.controls['personalPan'].value.toUpperCase());
            this.insureArray['controls'].items['controls'][0]['controls'].personalGst.patchValue(this.personal.controls['personalGst'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].personalAddress.patchValue(this.personal.controls['personalAddress'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].personalAddress2.patchValue(this.personal.controls['personalAddress2'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].personalCity.patchValue(this.personal.controls['personalCity'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].personalPincode.patchValue(this.personal.controls['personalPincode'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].personalState.patchValue(this.personal.controls['personalState'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].personalEmail.patchValue(this.personal.controls['personalEmail'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].personalMobile.patchValue(this.personal.controls['personalMobile'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].personalAltnumber.patchValue(this.personal.controls['personalAltnumber'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].personalHeight.patchValue(this.personal.controls['personalHeight'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].personalWeight.patchValue(this.personal.controls['personalWeight'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].sameas.patchValue(this.personal.controls['sameas'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].residenceAddress.patchValue(this.personal.controls['residenceAddress'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].residenceAddress2.patchValue(this.personal.controls['residenceAddress2'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].residenceCity.patchValue(this.personal.controls['residenceCity'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].residencePincode.patchValue(this.personal.controls['residencePincode'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].residenceState.patchValue(this.personal.controls['residenceState'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].rolecd.patchValue('PRIMARY');

        } else {
            this.insureArray['controls'].items['controls'][0]['controls'].cityHide.patchValue(false);
            this.insureArray['controls'].items['controls'][0]['controls'].pCityHide.patchValue(true);
            this.insureArray['controls'].items['controls'][0]['controls'].personalTitle.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].personalFirstname.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].personalLastname.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].personalDob.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].personalAadhar.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].personalrelationship.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].personalGender.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].personalPan.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].personalGst.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].personalAddress.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].personalAddress2.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].personalCity.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].personalPincode.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].personalState.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].personalEmail.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].personalMobile.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].personalAltnumber.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].sameas.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].personalHeight.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].personalWeight.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].residenceAddress.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].residenceAddress2.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].residenceCity.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].residencePincode.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].residenceState.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].rolecd.patchValue('PRIMARY');

        }

    }

    //Create Proposal
    proposal() {

        this.totalData = {
            'platform': 'web',
            'proposal_id': sessionStorage.proposalID ? sessionStorage.proposalID : this.proposalId.toString(),
            'enquiry_id': this.enquiryId,
            'group_name': 'Group A',
            'company_name': 'Religare',
            'add_ons': this.setAddonDefault ? this.addonDetails.toString() : 'CAREWITHNCB',
            'suminsured_amount': this.buyProductdetails.suminsured_amount,
            'proposer_insurer_details': this.totalReligareData,
            'product_id': this.buyProductdetails.product_id,
            'policy_term': this.buyProductdetails.product_id == 4 ? '3' : '1',
            'scheme_id': this.buyProductdetails.scheme,
            'terms_condition': '1',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
            'nominee_name': this.nomineeDetails.controls['religareNomineeName'].value,
            'nominee_relationship': this.nomineeDetails.controls['religareRelationship'].value,
            'medical_status': this.medicalStatus.includes('Yes') ? 'Yes' : 'No'
        };
        if (!this.back){
            this.processDiseaseData(this.totalData);
        }
        this.stepback();

        const data = this.totalData;
        this.settings.loadingSpinner = true;
        this.proposalservice.getReligareProposal(data).subscribe(
            (successData) => {
                this.proposalSuccess(successData);
            },
            (error) => {
                this.proposalFailure(error);
            }
        );

    }

    public proposalSuccess(successData) {
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {
            this.toastr.success('Proposal created successfully!!');
            console.log(this.relationshipList, 'this.relationshipList');
            this.summaryData = successData.ResponseObject;
            let getdata=[];
            for( let i = 0; i <  this.summaryData.proposer_insurer_details.length; i++) {
                  for (let j = 0; j <  this.relationshipList.length; j++) {
                     if(this.summaryData.proposer_insurer_details[i].relationship_code == this.relationshipList[j].relationship_code ) {
                          this.summaryData.proposer_insurer_details[i].relationship_name = this.relationshipList[j].relationship_name;
                      }
                  }
            }
            console.log(this.summaryData, 'this.summaryData,this.summaryDatathis.summaryDatathis.summaryDatathis.summaryData');
            this.proposalId = this.summaryData.proposal_id;
            sessionStorage.proposalID = this.proposalId;
            //console.log(this.proposalId, 'this.summaryDatathis.summaryDatathis.summaryData');
            this.relationshipcode = [];
            console.log(this.relationshipList,'lll');
            for (let i = 0; i < this.relationshipList.length; i++) {
                this.relationshipcode.push(this.relationshipList[i].relationship_name);
            }
            console.log(this.relationshipcode ,'ooooo');
            this.lastStepper.next();

        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }



    processDiseaseData(diseaseData) {

        let updatedFinalData = [];
        for (let i = 0; i < diseaseData.proposer_insurer_details.length; i++ ) {
            if (diseaseData.proposer_insurer_details[i]['role_cd'] == 'PRIMARY') {
                console.log(diseaseData, 'diseaseDatadiseaseDatadiseaseData');
                let updatedData = [];
                for (let j = 0; j < diseaseData.proposer_insurer_details[i]['questions_list'].length; j++ ) {
                    console.log(diseaseData.proposer_insurer_details[i]['questions_list'], 'diseaseData.proposer_insurer_details[i][\'questions_list\']')
                    let newObject = {};
                    newObject['question_id'] = diseaseData.proposer_insurer_details[i]['questions_list'][j]['question_id'];
                    newObject['question_set_cd'] = diseaseData.proposer_insurer_details[i]['questions_list'][j]['question_set_code'];
                    newObject['question_cd'] = diseaseData.proposer_insurer_details[i]['questions_list'][j]['question_code'];

                    if ( diseaseData.proposer_insurer_details[i]['questions_list'][j]['status'] == true) {
                        newObject['response'] = true;

                    } else if (diseaseData.proposer_insurer_details[i]['questions_list'][j]['status']  == false) {
                        newObject['response'] = false;

                    }
                    updatedData.push(newObject);

                    if (diseaseData.proposer_insurer_details[i]['questions_list'][j]['existing_question_code'] != '') {
                        newObject = {};
                        newObject['question_id'] = diseaseData.proposer_insurer_details[i]['questions_list'][j]['question_id'];
                        newObject['question_set_cd'] = diseaseData.proposer_insurer_details[i]['questions_list'][j]['question_set_code'];
                        newObject['question_cd'] = diseaseData.proposer_insurer_details[i]['questions_list'][j]['existing_question_code'];
                        newObject['response'] = diseaseData.proposer_insurer_details[i]['questions_list'][j]['existingSince'];
                        updatedData.push(newObject);

                    }
                    if(diseaseData.proposer_insurer_details[i]['questions_list'][j]['otherdetails_desc_code'] != '') {
                        newObject = {};

                        newObject['question_id'] = diseaseData.proposer_insurer_details[i]['questions_list'][j]['question_id'];
                        newObject['question_set_cd'] = diseaseData.proposer_insurer_details[i]['questions_list'][j]['question_set_code'];
                        newObject['question_cd'] = diseaseData.proposer_insurer_details[i]['questions_list'][j]['otherdetails_desc_code'];
                        newObject['response'] = diseaseData.proposer_insurer_details[i]['questions_list'][j]['diseasesDescription'];
                        updatedData.push(newObject);

                    }

                }
                console.log(updatedData);

                this.totalData.proposer_insurer_details[i]['questions_list'] = updatedData;


            }
            console.log(this.totalData);

        }



    }

//Summary residence detail
    public proposalFailure(error) {
        this.settings.loadingSpinner = false;
        console.log(error);
    }

    getCityIdF2(title, cid, pincode) {
        const data = {
            'platform': 'web',
            'pincode': pincode,
            'city_id': cid
        }
        this.common.getArea(data).subscribe(
            (successData) => {
                this.getCityResistSuccess(successData);
            },
            (error) => {
                this.getCityResistFailure(error);
            }
        );
    }

    public getCityResistSuccess(successData) {
        if (successData.IsSuccess == true) {
            this.rAreaNames = successData.ResponseObject;
            this.rAreaName = this.rAreaNames.area;
            if (this.sumTitle == 'residence') {
                for (let i = 0; i < this.rAreaName.length; i++) {
                    if (this.rAreaName[i].areaID == this.summaryData.prop_res_area) {
                        this.sumAreaName = this.rAreaName[i].areaName;
                    }

                }
            }
        }
    }

    public getCityResistFailure(error) {
        console.log(error);
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
            if (this.title == 'residence') {
                this.iResidenceCitys = [];
                this.rResponse = successData.ResponseObject;
                if (successData.IsSuccess) {
                    for (let i = 0; i < this.rResponse.length; i++) {
                        this.iResidenceCitys.push({city: this.rResponse[i].city});
                    }
                    this.insureArray['controls'].items['controls'][this.index]['controls'].residenceState.patchValue(this.rResponse[0].state);
                    this.insureArray['controls'].items['controls'][this.index]['controls'].cityHide.patchValue(false);
                }
                else if (successData.IsSuccess != true && this.title == 'residence') {
                    for (let i = 0; i < this.rResponse.length; i++) {
                        this.iResidenceCitys.push({city: this.rResponse[i].city = ''});
                    }
                    this.insureArray['controls'].items['controls'][this.index]['controls'].residenceState.patchValue('');
                    this.insureArray['controls'].items['controls'][this.index]['controls'].cityHide.patchValue(false);
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


    religareQuestions() {
        const data = {
            'platform': 'web',
            'product_id': this.buyProductdetails.product_id,
            'family_group': this.insurePersons,
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.proposalservice.getReligareQuestions(data).subscribe(
            (successData) => {
                this.religareQuestionsSuccess(successData);
            },
            (error) => {
                this.religareQuestionsFailure(error);
            }
        );

    }

    public religareQuestionsSuccess(successData) {
        this.religareQuestionsList = successData.ResponseObject;
        for (let i = 0; i < this.religareQuestionsList.length; i++) {
            this.religareQuestionsList[i].mStatus = 'No';
            this.religareQuestionsList[i].answer_status = false;
            for (let j = 0; j < this.religareQuestionsList[i].sub_questions_list.length; j++) {

                for (let k = 0; k < this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group.length; k++) {
                    this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].existingSince = '';
                    this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].diseasesDescription = '';
                    this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].status = false;

                }
            }
        }
    }

    public religareQuestionsFailure(error) {
        console.log(error);
    }



    questionYes(id, value: any) {
        if (value.checked) {
            this.religareQuestionsList[id].mStatus = 'Yes';
            this.religareQuestionsList[id].answer_status = true;
        } else {
            this.religareQuestionsList[id].mStatus = 'No';
            this.religareQuestionsList[id].answer_status = false;
            for (let i = 0; i < this.religareQuestionsList.length; i++) {
                for (let j = 0; j < this.religareQuestionsList[i].sub_questions_list.length; j++) {
                    for (let k = 0; k < this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group.length; k++) {
                        this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].existingSince = '';
                        this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].diseasesDescription = '';
                        this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].status = false;
                    }
                }
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
        this.proposalservice.getOccupationList(data).subscribe(
            (successData) => {
                this.occupationListSuccess(successData);
            },
            (error) => {
                this.occupationListFailure(error);
            }
        );

    }

    public occupationListSuccess(successData) {
        console.log(successData.ResponseObject);
        this.occupationList = successData.ResponseObject;
    }

    public occupationListFailure(error) {
        console.log(error);
    }


    setOccupationListCode() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.proposalservice.getOccupationCode(data).subscribe(
            (successData) => {
                this.occupationCodeSuccess(successData);
            },
            (error) => {
                this.occupationCodeFailure(error);
            }
        );

    }

    public occupationCodeSuccess(successData) {
        console.log(successData.ResponseObject);
        this.occupationCode = successData.ResponseObject;
    }

    public occupationCodeFailure(error) {
        console.log(error);
    }

    setRelationship() {
        const data = {
            'platform': 'web',
            'product_id': '1',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.proposalservice.getRelationshipList(data).subscribe(
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
        this.relationshipList = successData.ResponseObject;
        //this.relationshipLists = this.relationshipList.name;

        this.insureRelationList = [];
        console.log(this.insurePersons.length, 'this.insurePersons.length');
        if(this.insurePersons.length > 1){
            for (let i = 0; i < this.relationshipList.length; i++) {
                if(this.relationshipList[i].status == 1) {
                    this.insureRelationList.push({
                        'relationship_code' : this.relationshipList[i].relationship_code,
                        'relationship_name' : this.relationshipList[i].relationship_name,
                        'status' : this.relationshipList[i].status
                    });
                }
            }
        } else {
            for (let i = 0; i < this.relationshipList.length; i++) {
                this.insureRelationList.push({
                    'relationship_code': this.relationshipList[i].relationship_code,
                    'relationship_name': this.relationshipList[i].relationship_name,
                    'status' : this.relationshipList[i].status
                });
            }
        }

        console.log(this.insureRelationList, 'insureRelationListinsureRelationListinsureRelationList');

    }

    public setRelationshipFailure(error) {
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
            const pattern = /[a-zA-Z]/;
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
        sessionStorage.mobileNumber = this.mobileNumber;
    }
    insuredalternateChange(event ,index) {
        if (event.target.value.length == 10) {

            if (this.insureArray['controls'].items['controls'][index]['controls'].personalMobile.value == this.insureArray['controls'].items['controls'][index]['controls'].personalAltnumber.value) {
                this.insureArray['controls'].items['controls'][index]['controls'].altmobileNumber.setValue('Alternate number should be different from mobile number');
            } else {
                this.insureArray['controls'].items['controls'][index]['controls'].altmobileNumber.setValue('');
            }
        }
        sessionStorage.this.insureArray['controls'].items['controls'][index]['controls'].altmobileNumber = this.insureArray['controls'].items['controls'][index]['controls'].altmobileNumber.value;
        }

}
