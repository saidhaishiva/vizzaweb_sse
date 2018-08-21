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
  selector: 'app-religare',
  templateUrl: './religare.component.html',
  styleUrls: ['./religare.component.scss'],
    providers: [

        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
})
export class ReligareComponent implements OnInit {
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
    public summaryCity: any;
    public rSummaryCity: any;
    public sumTitle: any;
    public sumPin: any;
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
    public familymember: any;
    public statusIndex: any;

    constructor(public proposalservice: ProposalService, public datepipe: DatePipe, private toastr: ToastrService, public appSettings: AppSettings, public dialog: MatDialog,
                public config: ConfigurationService, public common: CommonService, public fb: FormBuilder, public auth: AuthService, public http: HttpClient, @Inject(LOCALE_ID) private locale: string) {
        let today = new Date();
        this.today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        this.stopNext = false;
        this.declaration = false;
        this.settings = this.appSettings.settings;
        this.settings.HomeSidenavUserBlock = false;
        this.settings.sidenavIsOpened = false;
        this.settings.sidenavIsPinned = false;
        this.webhost = this.config.getimgUrl();
        this.selectDate = '';
        this.proposalId = 0;
        this.step = 0;
        this.proposerInsureData = [];
        this.totalReligareData = [];
        this.personal = this.fb.group({
            personalTitle: ['', Validators.required],
            personalFirstname: new FormControl(''),
            personalLastname: ['', Validators.required],
            personalGender: ['', Validators.compose([Validators.required])],
            personalDob: ['', Validators.compose([Validators.required])],
            personalOccupationCode: ['', Validators.required],
            personalOccupation: ['', Validators.required],
            personalrelationship: ['', Validators.required],
            personalIncome: ['', Validators.required],
            personalAadhar: ['', Validators.compose([Validators.minLength(12)])],
            personalPan: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
            personalGst: ['', Validators.compose([Validators.minLength(15)])],
            personalAddress: ['', Validators.required],
            previousinsurance: '',
            personalAddress2: ['', Validators.required],
            personalPincode: ['', Validators.required],
            personalCity: ['', Validators.required],
            personalState: ['', Validators.required],
            personalEmail: ['', Validators.required],
            personalMobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
            personalAltnumber: ['', Validators.compose([Validators.pattern('[6789][0-9]{9}')])],
            residenceAddress: ['', Validators.required],
            residenceAddress2: ['', Validators.required],
            residencePincode: ['', Validators.required],
            residenceCity: ['', Validators.required],
            residenceState: ['', Validators.required],
            sameas: '',
            rolecd: '',
            type: '',
            previousinsuranceChecked: ''

        });
        this.nomineeDetails = this.fb.group({
            'religareNomineeName': ['', Validators.required],
            'religareRelationship': ['', Validators.required]
        });
        this.previousInsuranceStatus1 = [];
    }


    ngOnInit() {
        this.buyProductdetails = JSON.parse(sessionStorage.buyProductdetails);
        this.enquiryId = sessionStorage.enquiryId;
        this.groupName = sessionStorage.groupName;
        this.getFamilyDetails = JSON.parse(sessionStorage.changedTabDetails);
        this.insurePersons = this.getFamilyDetails.family_members;

        this.setOccupationListCode();
        this.religareQuestions();
        this.setOccupationList();
        this.setRelationship();
        this.insureArray = this.fb.group({
            items: this.fb.array([])
        });
        this.familymember = [];
        for (let i = 0; i < this.getFamilyDetails.family_members.length; i++) {
            this.items = this.insureArray.get('items') as FormArray;
            this.items.push(this.initItemRows());
            const statusIndex = 'status' + i;
            this.getFamilyDetails.family_members[i].statusIndex = '';
            this.familymember.push(this.getFamilyDetails.family_members[i]);
        }

        console.log(this.previousInsuranceStatus1, 'dfsgsdfgsdfgsdgsdgsdfg');

        for (let i = 0; i < this.getFamilyDetails.family_members.length; i++) {
            this.previousInsuranceStatus1[i] = false;
        }
        this.previousinsurance = [
            'IFFCO TOKIO General Insurance Co. Ltd.',
            'Liberty General Insurance Co. Ltd.',
            'Shriram General Insurance Co. Ltd.',
            'Reliance General Insurance Co. Ltd',
            'Reliance General Insurance Co. Ltd.',
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

        this.questionerData = [{
            'main_question': 'Does any person(s) to be insured has any Pre-existing diseases ?',
            'display_question': '1',
            'sub_questions_list': [{
                'question_set_code': 'PEDcancerDetails',
                'question_details': {
                    'question_code': '114',
                    'question_description': 'Cancer?',
                    'checkbox': '1',
                    'existing_question_code': 'cancerExistingSince',
                    'description_textarea': '0',
                    'other_description_code': ''
                }
            },
                {
                    'question_set_code': 'PEDcardiacDetails',
                    'question_details': {
                        'question_code': '143',
                        'question_description': 'Any cardiovascular/Heart Disease (including but not limited to Coronary artery disease / Rheumatic heart disease / Heart Attack or Myocardial infarction / Heart failure / Bypass Grafting or CABG / Angioplasty or PTCA / Heart valve diseases / Pacemaker implantation) ?',
                        'checkbox': '1',
                        'existing_question_code': 'cardiacExistingSince',
                        'description_textarea': '0',
                        'other_description_code': ''
                    }
                },
                {
                    'question_set_code': 'PEDhyperTensionDetails',
                    'question_details': {
                        'question_code': '207',
                        'question_description': 'Hypertension / High Blood Pressure ?',
                        'checkbox': '1',
                        'existing_question_code': 'hyperTensionExistingSince',
                        'description_textarea': '0',
                        'other_description_code': ''
                    }
                },
                {
                    'question_set_code': 'PEDotherDetails',
                    'question_details': {
                        'question_code': '210',
                        'question_description': 'Any other diseases or ailments not mentioned above ?',
                        'checkbox': '1',
                        'existing_question_code': 'otherExistingSince',
                        'description_textarea': '1',
                        'other_description_code': 'otherDiseasesDescription'
                    }
                }
            ]
        },
            {
                'main_question': 'Have any of the person(s) to be insured ever filed a claim with their current / previous insurer ?',
                'display_question': '0',
                'sub_questions_list': [{
                    'question_set_code': 'HEDHealthClaim',
                    'question_details': {
                        'question_code': 'H002',
                        'question_description': '',
                        'checkbox': '1',
                        'existing_question_code': '',
                        'description_textarea': '0',
                        'other_description_code': ''
                    }
                }]
            },
            {
                'main_question': 'Has any proposal for Health insurance been declined, cancelled or charged a higher premium ?',
                'display_question': '0',
                'sub_questions_list': [{
                    'question_set_code': 'HEDHealthDeclined',
                    'question_details': {
                        'question_code': 'H003',
                        'question_description': '',
                        'checkbox': '1',
                        'existing_question_code': '',
                        'description_textarea': '0',
                        'other_description_code': ''
                    }
                }]
            },
            {
                'main_question': 'Is any of the person(s) to be insured, already covered under any other health insurance policy of Religare Health Insurance ?',
                'display_question': '0',
                'sub_questions_list': [{
                    'question_set_code': 'HEDHealthCovered',
                    'question_details': {
                        'question_code': 'H004',
                        'question_description': '',
                        'checkbox': '1',
                        'existing_question_code': '',
                        'description_textarea': '0',
                        'other_description_code': ''
                    }
                }]
            }
        ];

        for (let i = 0; i < this.questionerData.length; i++) {
            for (let j = 0; j < this.questionerData[i].sub_questions_list.length; j++) {
                this.questionerData[i].sub_questions_list[j].question_details.family_group = this.familymember;
            }
        }
        console.log(this.questionerData, 'this.questionerData[i].sub_questions_list.length');
        this.sessionData();


        this.setDate = Date.now();
        this.setDate = this.datepipe.transform(this.setDate, 'dd-MM-y');

    }

    setStep(index: number) {
        this.step = index;
    }

    prevStep() {
        this.step--;
    }

    //Insure Details
    religareInsureDetails(stepper: MatStepper, value, key) {
        console.log(value);
        sessionStorage.stepper2Details = '';
        sessionStorage.stepper2Details = JSON.stringify(value);
        this.insurerData = value;
        if (this.insureArray.valid) {
            this.totalReligareData = [];
            for (let i = 0; i < this.insurePersons.length; i++) {
                this.insurerData.items[i].type = this.insurePersons[i].type;
            }
            for (let i = 0; i < this.insurerData.items.length; i++) {
                this.proposerInsureData.push(this.insurerData.items[i]);
            }
            console.log(this.insurerData, 'this.insurerDatathis.insurerDatathis.insurerData');

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
        'prop_identity_list': [],
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
        'relationship_cd': this.proposerInsureData[i].type,
        'role_cd': this.proposerInsureData[i].rolecd,
        'questions_list': [{
            'question_id': '',
            'question_cd': '',
            'question_set_cd': '',
            'response': ''
        }]

    });
        if (this.proposerInsureData[i].personalAltnumber !='') {
            this.totalReligareData[i].prop_contact_list.push({
                'contact_no': this.proposerInsureData[i].personalAltnumber,
                'contact_type': 'RESEDENTIAL',
                'std_code': '91'
            });
        }
        if (this.proposerInsureData[i].personalAadhar !='') {
            this.totalReligareData[i].prop_identity_list.push({
                'identity_number': this.proposerInsureData[i].personalAadhar,
                'identity_type': 'AADHAR'
            });
        }
        if (this.proposerInsureData[i].personalGst !='') {
            this.totalReligareData[i].prop_identity_list.push( {
                'identity_number': this.proposerInsureData[i].personalGst,
                'identity_type': 'GST'
            });
        }
        if (this.proposerInsureData[i].personalPan !='') {
            this.totalReligareData[i].prop_identity_list.push( {
                'identity_number': this.proposerInsureData[i].personalPan,
                'identity_type': 'PAN'
            });
        }

        }
            if (key == 'createProposal') {
                this.proposal();
            }
            stepper.next();
        }
    }
    initItemRows() {
        return this.fb.group(
            {
                personalTitle: ['', Validators.required],
                personalFirstname: new FormControl(''),
                personalLastname: ['', Validators.required],
                personalDob: ['', Validators.compose([Validators.required])],
                personalGender: ['', Validators.compose([Validators.required])],
                personalOccupationCode: ['', Validators.required],
                personalOccupation: ['', Validators.required],
                personalrelationship: ['', Validators.required],
                personalIncome: ['', Validators.required],
                personalAadhar: ['', Validators.compose([Validators.minLength(12)])],
                personalPan: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
                personalGst: ['', Validators.compose([Validators.minLength(15)])],
                personalAddress: ['', Validators.required],
                previousinsurance: '',
                personalAddress2: ['', Validators.required],
                personalPincode: ['', Validators.required],
                personalCity: ['', Validators.required],
                personalState: ['', Validators.required],
                personalEmail: ['', Validators.required],
                personalMobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
                personalAltnumber: ['', Validators.compose([Validators.pattern('[6789][0-9]{9}')])],
                residenceAddress: ['', Validators.required],
                residenceAddress2: ['', Validators.required],
                residencePincode: ['', Validators.required],
                residenceCity: ['', Validators.required],
                residenceState: ['', Validators.required],
                sameas: '',
                rolecd: 'PRIMARY',
                relationshipcd: '',
                previousinsuranceChecked: false
            }
        );
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
    //Personal Details
    personalDetails(stepper: MatStepper, value) {
        console.log(value, 'value');
        this.personalData = value;
        this.personalData.rolecd = 'PROPOSER';
        this.personalData.type = 'SELF';
        sessionStorage.stepper1Details = '';
        sessionStorage.stepper1Details = JSON.stringify(value);
        if (this.personal.valid) {
            this.proposerInsureData = [];
            if (sessionStorage.proposerAge >= 18) {
                this.proposerInsureData.push(this.personalData);
                stepper.next();
            } else {
                this.toastr.error('Proposer age should be 18 or above');
            }
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
        if (this.questionEmpty) {
                stepper.next();

            } else {
                this.toastr.error('Please fill the all Answers');

            }
    }
    PreviousInsure(value) {
        if (value.checked) {
            this.personal.controls['previousinsurance'].setValue('');
            this.previousInsuranceStatus = true;
        } else {
            this.previousInsuranceStatus = false;
            this.personal.controls['previousinsurance'].setValue('No');
        }
    }
    PreviousInsuredDetail(value, i) {
        if (value.checked) {
            this.insureArray['controls'].items['controls'][i]['controls'].previousinsurance.setValue('');
            this.previousInsuranceStatus1[i] = this.insureArray['controls'].items['controls'][i]['controls'].previousinsuranceChecked.value;
        } else {
            this.previousInsuranceStatus1[i] = this.insureArray['controls'].items['controls'][i]['controls'].previousinsuranceChecked.value;
            this.insureArray['controls'].items['controls'][i]['controls'].previousinsurance.setValue('No');
        }
    }
        sameAddress(values: any, index) {
        if (values.checked) {
            console.log(values.checked);
            this.personal.controls['residenceAddress'].setValue(this.personal.controls['personalAddress'].value);
            this.personal.controls['residenceAddress2'].setValue(this.personal.controls['personalAddress2'].value);
            this.personal.controls['residenceCity'].setValue(this.personal.controls['personalCity'].value);
            this.personal.controls['residencePincode'].setValue(this.personal.controls['personalPincode'].value);
            this.personal.controls['residenceState'].setValue(this.personal.controls['personalState'].value);
            this.insureArray['controls'].items['controls'][index]['controls'].residenceAddress.patchValue(this.insureArray['controls'].items['controls'][index]['controls'].personalAddress.value);
            this.insureArray['controls'].items['controls'][index]['controls'].residenceAddress2.patchValue(this.insureArray['controls'].items['controls'][index]['controls'].personalAddress2.value);
            this.insureArray['controls'].items['controls'][index]['controls'].residenceCity.patchValue(this.insureArray['controls'].items['controls'][index]['controls'].personalCity.value);
            this.insureArray['controls'].items['controls'][index]['controls'].residencePincode.patchValue(this.insureArray['controls'].items['controls'][index]['controls'].personalPincode.value);
            this.insureArray['controls'].items['controls'][index]['controls'].residenceState.patchValue(this.insureArray['controls'].items['controls'][index]['controls'].personalState.value);
        } else {
            this.personal.controls['residenceAddress'].setValue('');
            this.personal.controls['residenceAddress2'].setValue('');
            this.personal.controls['residenceCity'].setValue('');
            this.personal.controls['residencePincode'].setValue('');
            this.personal.controls['residenceState'].setValue('');
            this.insureArray['controls'].items['controls'][index]['controls'].residenceAddress.patchValue('');
            this.insureArray['controls'].items['controls'][index]['controls'].residenceAddress2.patchValue('');
            this.insureArray['controls'].items['controls'][index]['controls'].residenceCity.patchValue('');
            this.insureArray['controls'].items['controls'][index]['controls'].residencePincode.patchValue('');
            this.insureArray['controls'].items['controls'][index]['controls'].residenceState.patchValue('');
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



    addEvent(event) {
        this.selectDate = event.value;
        console.log(this.selectDate);
        this.setDate = this.datepipe.transform(this.selectDate, 'dd-MM-y');
        this.setDateAge = this.datepipe.transform(this.selectDate, 'y-MM-dd');
        this.personalAge = this.ageCalculate(this.setDateAge);
        sessionStorage.setItem('proposerAge', this.personalAge);
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

    sessionData() {
        if (sessionStorage.stepper1Details != '' && sessionStorage.stepper1Details != undefined) {
            console.log(JSON.parse(sessionStorage.stepper1Details), 'sessionStorage.stepper1Details');
            this.getStepper1 = JSON.parse(sessionStorage.stepper1Details);
            this.personal = this.fb.group({
                personalTitle: this.getStepper1.personalTitle,
                personalFirstname: this.getStepper1.personalFirstname,
                personalLastname: this.getStepper1.personalLastname,
                personalDob: this.getStepper1.personalDob,
                personalOccupation: this.getStepper1.personalOccupation,
                personalIncome: this.getStepper1.personalIncome,
                personalArea: this.getStepper1.personalArea,
                residenceArea: this.getStepper1.residenceArea,
                personalAadhar: this.getStepper1.personalAadhar,
                personalrelationship: this.getStepper1.personalrelationship,
                personalGender: this.getStepper1.personalGender,
                personalOccupationCode: this.getStepper1.personalOccupationCode,
                personalPan: this.getStepper1.personalPan,
                personalGst: this.getStepper1.personalGst,
                personalAddress: this.getStepper1.personalAddress,
                previousinsurance: this.getStepper1.previousinsurance,
                personalAddress2: this.getStepper1.personalAddress2,
                personalPincode: this.getStepper1.personalPincode,
                personalCity: this.getStepper1.personalCity,
                personalState: this.getStepper1.personalState,
                personalEmail: this.getStepper1.personalEmail,
                personalMobile: this.getStepper1.personalMobile,
                personalAltnumber: this.getStepper1.personalAltnumber,
                residenceAddress: this.getStepper1.residenceAddress,
                residenceAddress2: this.getStepper1.residenceAddress2,
                residencePincode: this.getStepper1.residencePincode,
                residenceCity: this.getStepper1.residenceCity,
                residenceState: this.getStepper1.residenceState,
                rolecd: this.getStepper1.rolecd,
                relationshipcd: this.getStepper1.relationshipcd,
                sameas: this.getStepper1.sameas,
                previousinsuranceChecked: this.getStepper1.previousinsuranceChecked,
            });

        }
        if (this.getStepper1.previousinsuranceChecked) {
            this.previousInsuranceStatus = this.getStepper1.previousinsuranceChecked;
        }
        if (sessionStorage.stepper2Details != '' && sessionStorage.stepper2Details != undefined) {
            console.log(JSON.parse(sessionStorage.stepper2Details), 'sessionStorage.stepper1Details');
            this.getStepper2 = JSON.parse(sessionStorage.stepper2Details);
        for (let i = 0; i < this.getStepper2.items.length; i++) {
         this.insureArray['controls'].items['controls'][i]['controls'].personalTitle.patchValue(this.getStepper2.items[i].personalTitle);
         this.insureArray['controls'].items['controls'][i]['controls'].personalFirstname.patchValue(this.getStepper2.items[i].personalFirstname);
         this.insureArray['controls'].items['controls'][i]['controls'].personalLastname.patchValue(this.getStepper2.items[i].personalLastname);
         this.insureArray['controls'].items['controls'][i]['controls'].personalDob.patchValue(this.getStepper2.items[i].personalDob);
         this.insureArray['controls'].items['controls'][i]['controls'].personalOccupation.patchValue(this.getStepper2.items[i].personalOccupation);
         this.insureArray['controls'].items['controls'][i]['controls'].personalIncome.patchValue(this.getStepper2.items[i].personalIncome);
         this.insureArray['controls'].items['controls'][i]['controls'].personalAadhar.patchValue(this.getStepper2.items[i].personalAadhar);
         this.insureArray['controls'].items['controls'][i]['controls'].personalrelationship.patchValue(this.getStepper2.items[i].personalrelationship);
         this.insureArray['controls'].items['controls'][i]['controls'].personalGender.patchValue(this.getStepper2.items[i].personalGender);
         this.insureArray['controls'].items['controls'][i]['controls'].personalOccupationCode.patchValue(this.getStepper2.items[i].personalOccupationCode);
         this.insureArray['controls'].items['controls'][i]['controls'].personalPan.patchValue(this.getStepper2.items[i].personalPan);
         this.insureArray['controls'].items['controls'][i]['controls'].personalGst.patchValue(this.getStepper2.items[i].personalGst);
         this.insureArray['controls'].items['controls'][i]['controls'].personalAddress.patchValue(this.getStepper2.items[i].personalAddress);
         this.insureArray['controls'].items['controls'][i]['controls'].personalAddress2.patchValue(this.getStepper2.items[i].personalAddress2);
         this.insureArray['controls'].items['controls'][i]['controls'].personalCity.patchValue(this.getStepper2.items[i].personalCity);
         this.insureArray['controls'].items['controls'][i]['controls'].personalPincode.patchValue(this.getStepper2.items[i].personalPincode);
         this.insureArray['controls'].items['controls'][i]['controls'].personalState.patchValue(this.getStepper2.items[i].personalState);
         this.insureArray['controls'].items['controls'][i]['controls'].personalEmail.patchValue(this.getStepper2.items[i].personalEmail);
         this.insureArray['controls'].items['controls'][i]['controls'].personalMobile.patchValue(this.getStepper2.items[i].personalMobile);
         this.insureArray['controls'].items['controls'][i]['controls'].personalAltnumber.patchValue(this.getStepper2.items[i].personalAltnumber);
         this.insureArray['controls'].items['controls'][i]['controls'].relationshipcd.patchValue(this.getStepper2.items[i].relationshipcd);
         this.insureArray['controls'].items['controls'][i]['controls'].sameas.patchValue(this.getStepper2.items[i].sameas);
         this.insureArray['controls'].items['controls'][i]['controls'].residenceAddress.patchValue(this.getStepper2.items[i].residenceAddress);
         this.insureArray['controls'].items['controls'][i]['controls'].residenceAddress2.patchValue(this.getStepper2.items[i].residenceAddress2);
         this.insureArray['controls'].items['controls'][i]['controls'].residenceCity.patchValue(this.getStepper2.items[i].residenceCity);
         this.insureArray['controls'].items['controls'][i]['controls'].residencePincode.patchValue(this.getStepper2.items[i].residencePincode);
         this.insureArray['controls'].items['controls'][i]['controls'].residenceState.patchValue(this.getStepper2.items[i].residenceState);
         this.insureArray['controls'].items['controls'][i]['controls'].rolecd.patchValue(this.getStepper2.items[i].rolecd);
         this.insureArray['controls'].items['controls'][i]['controls']. previousinsuranceChecked.patchValue(this.getStepper2.items[i].previousinsuranceChecked);
         this.insureArray['controls'].items['controls'][i]['controls']. previousinsurance.patchValue(this.getStepper2.items[i].previousinsurance);
         this.previousInsuranceStatus1[i] = this.getStepper2.items[i].previousinsuranceChecked;
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
    }


    questioner() {

    }


    //Create Proposal
    proposal() {
        const data = {
            'platform': 'web',
            'proposal_id': '1',
            'enquiry_id': this.enquiryId,
            'group_name': 'Group A',
            'company_name': 'Religare',
            'suminsured_amount': this.buyProductdetails.suminsured_amount,
            'proposer_insurer_details' : this.totalReligareData,
            'product_id': this.buyProductdetails.product_id,
            'policy_term': '3',
            'scheme_id': this.buyProductdetails.scheme,
            'terms_condition': '1',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
            'nominee_name': this.nomineeDetails.controls['religareNomineeName'].value,
            'nominee_relationship':  this.nomineeDetails.controls['religareRelationship'].value
        };
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
            this.summaryData = successData.ResponseObject;
            this.proposalId = this.summaryData.proposal_id;
            sessionStorage.proposalID = this.proposalId;
            console.log(this.proposalId, 'this.summaryDatathis.summaryDatathis.summaryData');
            this.lastStepper.next();

        } else {

            this.toastr.error(successData.ErrorObject);
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
    getPostal(pin, index, title) {
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
                    this.getpostalSuccess(successData);
                },
                (error) => {
                    this.getpostalFailure(error);
                }
            );
        }
    }

    public getpostalSuccess(successData) {

        if (successData.IsSuccess == true) {
            if (this.title == 'personal') {
                this.personalCitys = [];
                this.response = successData.ResponseObject;
                this.personal.controls['personalState'].setValue(this.response[0].state);
                for (let i = 0; i < this.response.length; i++) {
                    this.personalCitys.push({city: this.response[i].city});
                }
                this.insureArray['controls'].items['controls'][this.index]['controls'].personalState.patchValue(this.response[0].state);
            }
            if (this.title == 'residence') {
                this.residenceCitys = [];
                this.rResponse = successData.ResponseObject;
                this.personal.controls['residenceState'].setValue(this.rResponse[0].state);
                for (let i = 0; i < this.rResponse.length; i++) {
                    this.residenceCitys.push({city: this.rResponse[i].city});
                }
                this.insureArray['controls'].items['controls'][this.index]['controls'].residenceState.patchValue(this.rResponse[0].state);
            }


        }
    }

    public getpostalFailure(error) {
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
            'product_id': '1',
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
        console.log(successData.ResponseObject);
        this.religareQuestionsList = successData.ResponseObject;
        for (let i = 0; i < this.religareQuestionsList.length; i++) {
            this.religareQuestionsList[i].answer = '';
        }


    }

    public religareQuestionsFailure(error) {
        console.log(error);
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
    }

    public setRelationshipFailure(error) {
        console.log(error);
    }
}
