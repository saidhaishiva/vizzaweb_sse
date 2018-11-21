import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProposalService} from '../../shared/services/proposal.service';
import {DatePipe} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {AppSettings} from '../../app.settings';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDialog, MatStepper} from '@angular/material';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {CommonService} from '../../shared/services/common.service';
import {AuthService} from '../../shared/services/auth.service';
import {HttpClient} from '@angular/common/http';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {Settings} from '../../app.settings.model';
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
  selector: 'app-personalaccidentform',
  templateUrl: './personalaccidentform.component.html',
  styleUrls: ['./personalaccidentform.component.scss'],
    providers: [

        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
})

export class PersonalaccidentformComponent implements OnInit {
    public personal: FormGroup;
    public summary: FormGroup;
    public insured: FormGroup;

    public nomineeDetails: FormGroup;
    public items: FormArray;
    public setDate: any;
    public selectDate: any;
    public stopNext: boolean;
    public buyPersonaldetails: any;
    public groupName: any;
    public getFamilyDetail: any;
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
    public title: any;
    public residenceCitys: any;
    public cityTitle: any;
    public rAreaNames: any;
    public rAreaName: any;
    public rResponse: any;
    public rSummaryCity: any;
    public sumTitle: any;
    public sumPin: any;
    public code: any;
    public sumAreaName: any;
    public setDateAge: any;
    public personalAge: any;
    public occupationCode: any;
    public religareQuestionsList: any;
    public step: any;
    public questionEmpty: any;
    public proposerInsureData: any;
    public mobileNumber: any;
    public altmobileNumber: any;
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
    public relationshipcode: any;
    public medicalStatus: any;
    public arr: any;
    public insureRelationList: any;
    array: any;
    public familyMember: any;
    buyProductdetail: any;
    insureName: any;
    insuredob: any;
    gender: any;
    sameFieldsInsure: any;
    sameinsure: any;
    ipersonalCitys: any;
    insurerResponse: any;
    iresidenceCitys: any;
    constructor(private fb: FormBuilder, public proposalservice: ProposalService, public datepipe: DatePipe, private toastr: ToastrService, public appSettings: AppSettings, public dialog: MatDialog,
                public config: ConfigurationService, public common: CommonService, public auth: AuthService, public http: HttpClient, @Inject(LOCALE_ID) private locale: string) {
        let today = new Date();
        this.today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        this.stopNext = false;
        this.back = false;
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
        this.mobileNumber = 'true';
        this.inputReadonly = false;
        this.sameField = false;
        this.sameFieldsInsure = false;
        this.sameinsure = false;
        this.isDisable = false;
        this.insureCity = false;
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
            personalPan: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
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
            sameAsProposer: false,
            rolecd: 'PROPOSER',
            type: '',
            medical_status: 'No'

        });
        //
        this.insured = this.fb.group({
            insuredTitle: ['', Validators.required],
            insuredFirstname: new FormControl(''),
            insuredLastname: ['', Validators.required],
            insuredGender: ['', Validators.compose([Validators.required])],
            insuredDob: ['', Validators.compose([Validators.required])],
            insuredrelationship: 'SELF',
            insuredAadhar: ['', Validators.compose([Validators.minLength(12)])],
            insuredPan: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
            insuredGst: ['', Validators.compose([Validators.minLength(15)])],
            insuredAddress: ['', Validators.required],
            insuredAddress2: ['', Validators.required],
            insuredPincode: ['', Validators.required],
            insuredCity: ['', Validators.required],
            insuredState: ['', Validators.required],
            insuredEmail: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
            insuredMobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
            insuredAltnumber: '',
            insuredrAddress: ['', Validators.required],
            insuredrAddress2: [''],
            insuredrPincode: ['', Validators.required],
            insuredrCity: ['', Validators.required],
            insuredrState: ['', Validators.required],
            sameAsinsureProposer: false,
            sameasInsuredAddress: false,
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
        if (this.personal.controls['personalTitle'].value == 'MR') {
            this.personal.controls['personalGender'].patchValue('Male');
        } else {
            this.personal.controls['personalGender'].patchValue('Female');
        }
    }
    insurechangeGender() {
        if (this.insured.controls['insuredTitle'].value == 'MR') {
            this.insured.controls['insuredGender'].patchValue('Male');
        } else {
            this.insured.controls['insuredGender'].patchValue('Female');
        }
    }


    ngOnInit() {
        this.setOccupationListCode();
        this.setOccupationList();
        this.setRelationship();
        this.getFamilyDetail = JSON.parse(sessionStorage.pAccidentProposalList);
        console.log(this.getFamilyDetail, 'this.getFamilyDetail');
        this.sessionData();
    }
    setStep(index: number) {
        this.step = index;
    }

    prevStep() {
        this.step--;
    }
// session
    sessionData() {
        if (sessionStorage.proposal1Detail != '' && sessionStorage.proposal1Detail != undefined) {
            console.log(JSON.parse(sessionStorage.proposal1Detail), 'sessionStorage.proposal1Detail');
            this.getStepper1 = JSON.parse(sessionStorage.proposal1Detail);
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
                relationshipcd: this.getStepper1.relationshipcd
            });

        }
        if (sessionStorage.proposal2Detail != '' && sessionStorage.proposal2Detail != undefined) {
            console.log(JSON.parse(sessionStorage.proposal1Detail), 'sessionStorage.proposal2Detail');
            this.getStepper2= JSON.parse(sessionStorage.proposal2Detail);
            this.insured = this.fb.group({
                insuredTitle: this.getStepper2.insuredTitle,
                insuredFirstname: this.getStepper2.insuredFirstname,
                insuredLastname: this.getStepper2.insuredLastname,
                insuredDob: this.getStepper2.insuredDob,
                insuredArea: this.getStepper2.insuredArea,
                insuredAadhar: this.getStepper2.insuredAadhar,
                insuredrelationship: this.getStepper2.insuredrelationship,
                sameAsinsureProposer: this.getStepper2.sameAsinsureProposer,
                insuredGender: this.getStepper2.insuredGender,
                insuredPan: this.getStepper2.insuredPan.toUpperCase(),
                insuredGst: this.getStepper2.insuredGst,
                insuredAddress: this.getStepper2.insuredAddress,
                insuredAddress2: this.getStepper2.insuredAddress2,
                insuredPincode: this.getStepper2.insuredPincode,
                insuredCity: this.getStepper2.insuredCity,
                insuredState: this.getStepper2.insuredState,
                insuredEmail: this.getStepper2.insuredEmail,
                insuredMobile: this.getStepper2.insuredMobile,
                insuredAltnumber: this.getStepper2.insuredAltnumber,
                insuredWeight: this.getStepper2.insuredWeight,
                insuredHeight: this.getStepper2.insuredHeight,
                insuredrAddress: this.getStepper2.insuredrAddress,
                insuredrAddress2: this.getStepper2.insuredrAddress2,
                insuredrPincode: this.getStepper2.insuredrPincode,
                insuredrCity: this.getStepper2.insuredrCity,
                insuredrState: this.getStepper2.insuredrState,
                rolecd: this.getStepper2.rolecd,
                relationshipcd: this.getStepper2.relationshipcd
            });

        }
    }


    //Personal Details
    personalDetails(stepper: MatStepper, value) {
        this.personalData = value;
        console.log(this.personalData, 'dfgdfg');
        this.personalData.rolecd = 'PROPOSER';
        this.personalData.type = 'SELF';
        sessionStorage.proposal1Detail = '';
        sessionStorage.proposal1Detail = JSON.stringify(value);
        console.log(value.personalDob, 'value');
        if (this.personal.valid) {

            this.proposerInsureData = [];
            if (sessionStorage.proposerAge >= 18) {
                this.proposerInsureData.push(this.personalData);
                if (this.mobileNumber == '' || this.mobileNumber == 'true'){
                    stepper.next();
                }

            } else {
                this.toastr.error('Proposer age should be 18 or above');
            }
        }
    }
// insured details
    InsureDetails(stepper: MatStepper, value) {
        console.log(value, 'fffff');
        sessionStorage.proposal2Detail = '';
        sessionStorage.proposal2Detail = JSON.stringify(value);
        stepper.next();

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
    // insured
    insuredsameAddress(values: any) {
        this.sameinsure = values.checked;
        if (values.checked) {
            this.inputReadonly = true;
            console.log(values.checked);
            this.insured.controls['insuredrAddress'].patchValue(this.insured.controls['insuredAddress'].value);
            this.insured.controls['insuredrAddress2'].patchValue(this.insured.controls['insuredAddress2'].value);
            this.insured.controls['insuredrCity'].patchValue(this.insured.controls['insuredCity'].value);
            this.insured.controls['insuredrPincode'].patchValue(this.insured.controls['insuredPincode'].value);
            this.insured.controls['insuredrState'].patchValue(this.insured.controls['insuredState'].value);

        } else {
            this.inputReadonly = false;
            this.insured.controls['insuredrAddress'].patchValue('');
            this.insured.controls['insuredrAddress2'].patchValue('');
            this.insured.controls['insuredrCity'].patchValue('');
            this.insured.controls['insuredrPincode'].patchValue('');
            this.insured.controls['insuredrState'].patchValue('');

        }
    }
    //sameaddress\
    sameProposer(value: any) {
        if (value.checked) {
            // this.insured.controls[''].cityHide.patchValue(true);
            // this.insured.controls['']pCityHide.patchValue(true);
            this.insured.controls['insuredTitle'].patchValue(this.personal.controls['personalTitle'].value);
            this.insured.controls['insuredFirstname'].patchValue(this.personal.controls['personalFirstname'].value);
            this.insured.controls['insuredLastname'].patchValue(this.personal.controls['personalLastname'].value);
            this.insured.controls['insuredDob'].patchValue(this.personal.controls['personalDob'].value);
            this.insured.controls['insuredAadhar'].patchValue(this.personal.controls['personalAadhar'].value);
            this.insured.controls['insuredrelationship'].patchValue(this.personal.controls['personalrelationship'].value);
            this.insured.controls['insuredGender'].patchValue(this.personal.controls['personalGender'].value);
            this.insured.controls['insuredPan'].patchValue(this.personal.controls['personalPan'].value.toUpperCase());
            this.insured.controls['insuredGst'].patchValue(this.personal.controls['personalGst'].value);
            this.insured.controls['insuredAddress'].patchValue(this.personal.controls['personalAddress'].value);
            this.insured.controls['insuredAddress2'].patchValue(this.personal.controls['personalAddress2'].value);
            this.insured.controls['insuredCity'].patchValue(this.personal.controls['personalCity'].value);
            this.insured.controls['insuredPincode'].patchValue(this.personal.controls['personalPincode'].value);
            this.insured.controls['insuredState'].patchValue(this.personal.controls['personalState'].value);
            this.insured.controls['insuredEmail'].patchValue(this.personal.controls['personalEmail'].value);
            this.insured.controls['insuredMobile'].patchValue(this.personal.controls['personalMobile'].value);
            this.insured.controls['insuredAltnumber'].patchValue(this.personal.controls['personalAltnumber'].value);
            this.insured.controls['insuredHeight'].patchValue(this.personal.controls['personalHeight'].value);
            this.insured.controls['insuredWeight'].patchValue(this.personal.controls['personalWeight'].value);
            this.insured.controls['insuredrAddress'].patchValue(this.personal.controls['residenceAddress'].value);
            this.insured.controls['insuredrAddress2'].patchValue(this.personal.controls['residenceAddress2'].value);
            this.insured.controls['insuredrCity'].patchValue(this.personal.controls['residenceCity'].value);
            this.insured.controls['insuredrPincode'].patchValue(this.personal.controls['residencePincode'].value);
            this.insured.controls['insuredrState'].patchValue(this.personal.controls['residenceState'].value);
            this.insured.controls['insuredrolecd'].patchValue('PRIMARY');

        }
        else{
            this.insured.controls['insuredTitle'].patchValue('');
            this.insured.controls['insuredFirstname'].patchValue('');
            this.insured.controls['insuredLastname'].patchValue('');
            this.insured.controls['insuredDob'].patchValue('');
            this.insured.controls['insuredAadhar'].patchValue('');
            this.insured.controls['insuredrelationship'].patchValue('');
            this.insured.controls['insuredGender'].patchValue('');
            this.insured.controls['insuredPan'].patchValue('');
            this.insured.controls['insuredGst'].patchValue('');
            this.insured.controls['insuredAddress'].patchValue('');
            this.insured.controls['insuredAddress2'].patchValue('');
            this.insured.controls['insuredCity'].patchValue('');
            this.insured.controls['insuredPincode'].patchValue('');
            this.insured.controls['insuredState'].patchValue('');
            this.insured.controls['insuredEmail'].patchValue('');
            this.insured.controls['insuredMobile'].patchValue('');
            this.insured.controls['insuredAltnumber'].patchValue('');
            this.insured.controls['insuredHeight'].patchValue('');
            this.insured.controls['insuredWeight'].patchValue('');
            this.insured.controls['insuredrAddress'].patchValue('');
            this.insured.controls['insuredrAddress2'].patchValue('');
            this.insured.controls['insuredrCity'].patchValue('');
            this.insured.controls['insuredrPincode'].patchValue('');
            this.insured.controls['insuredrState'].patchValue('');
            this.insured.controls['insuredrolecd'].patchValue('');

        }
    }


// only numbers can accept
    public onNumber(event: any) {
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
            const pattern = /[0-9-]/;
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

    stepback() {
        this.back = true;
        console.log(this.back);
    }

    quesback() {
        this.back = false;
        console.log(this.back);
    }


    //Create Proposal
    // proposal() {
    //
    //     this.totalData = {
    //         'platform': 'web',
    //         'proposal_id': '1',
    //         'enquiry_id': this.enquiryId,
    //         'group_name': 'Group A',
    //         'company_name': 'Religare',
    //         'suminsured_amount': this.buyPersonaldetails.suminsured_amount,
    //         'proposer_insurer_details': this.totalReligareData,
    //         'product_id': this.buyPersonaldetails.product_id,
    //         'policy_term': this.buyPersonaldetails.product_id == 4 ? '3' : '1',
    //         'scheme_id': this.buyPersonaldetails.scheme,
    //         'terms_condition': '1',
    //         'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
    //         'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
    //         'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
    //         'nominee_name': this.nomineeDetails.controls['religareNomineeName'].value,
    //         'nominee_relationship': this.nomineeDetails.controls['religareRelationship'].value,
    //         'medical_status': this.medicalStatus.includes('Yes') ? 'Yes' : 'No'
    //     };
    //     if (!this.back){
    //     }
    //     this.stepback();
    //
    //     const data = this.totalData;
    //     this.settings.loadingSpinner = true;
    //     this.proposalservice.getReligareProposal(data).subscribe(
    //         (successData) => {
    //             this.proposalSuccess(successData);
    //         },
    //         (error) => {
    //             this.proposalFailure(error);
    //         }
    //     );
    //
    // }
    //
    // public proposalSuccess(successData) {
    //     this.settings.loadingSpinner = false;
    //     if (successData.IsSuccess) {
    //         this.toastr.success('Proposal created successfully!!');
    //         console.log(this.relationshipList, 'this.relationshipList');
    //         this.summaryData = successData.ResponseObject;
    //         let getdata=[];
    //         for( let i = 0; i <  this.summaryData.proposer_insurer_details.length; i++) {
    //             for (let j = 0; j <  this.relationshipList.length; j++) {
    //                 if(this.summaryData.proposer_insurer_details[i].relationship_code == this.relationshipList[j].relationship_code ) {
    //                     this.summaryData.proposer_insurer_details[i].relationship_name = this.relationshipList[j].relationship_name;
    //                 }
    //             }
    //         }
    //         console.log(this.summaryData, 'this.summaryData,this.summaryDatathis.summaryDatathis.summaryDatathis.summaryData');
    //         this.proposalId = this.summaryData.proposal_id;
    //         sessionStorage.proposalID = this.proposalId;
    //         //console.log(this.proposalId, 'this.summaryDatathis.summaryDatathis.summaryData');
    //         this.relationshipcode = [];
    //         console.log(this.relationshipList,'lll');
    //         for (let i = 0; i < this.relationshipList.length; i++) {
    //             this.relationshipcode.push(this.relationshipList[i].relationship_name);
    //         }
    //         console.log(this.relationshipcode ,'ooooo');
    //         this.lastStepper.next();
    //
    //     } else {
    //         this.toastr.error(successData.ErrorObject);
    //     }
    // }
    //
    // public proposalFailure(error) {
    //     this.settings.loadingSpinner = false;
    //     console.log(error);
    // }


//Summary residence detail


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
            } else if (successData.IsSuccess != true) {

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
            } else if (successData.IsSuccess != true) {
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

// insure postal
//     insuregetPostal(pin, title) {
//         this.pin = pin;
//         this.title = title;
//         console.log(this.title, 'kjhjkghkhk')
//         const data = {
//             'platform': 'web',
//             'user_id': '0',
//             'role_id': '4',
//             'pincode': this.pin
//         }
//         if (this.pin.length == 6) {
//             this.proposalservice.getPostalReligare(data).subscribe(
//                 (successData) => {
//                     this.insuregetpostalSuccess(successData);
//                 },
//                 (error) => {
//                     this.insuregetpostalFailure(error);
//                 }
//             );
//         }
//     }
//
//     public insuregetpostalSuccess(successData) {
//
//
//         if (this.title == 'personal') {
//             this.ipersonalCitys = [];
//             this.response = successData.ResponseObject;
//             if (successData.IsSuccess) {
//
//                 this.insured.controls['insuredState'].setValue(this.response[0].state);
//                 for (let i = 0; i < this.response.length; i++) {
//                     this.ipersonalCitys.push({city: this.response[i].city});
//                 }
//             } else if (successData.IsSuccess != true) {
//
//                 this.insured.controls['insuredState'].setValue('');
//                 for (let i = 0; i < this.response.length; i++) {
//                     this.ipersonalCitys.push({city: this.response[i].city = ''});
//                 }
//                 this.toastr.error('In valid Pincode');
//             }
//         }
//         if (this.title == 'residence') {
//             this.iresidenceCitys = [];
//             this.insurerResponse = successData.ResponseObject;
//             if (successData.IsSuccess) {
//                 this.insured.controls['insuredrState'].setValue(this.rResponse[0].state);
//                 for (let i = 0; i < this.rResponse.length; i++) {
//                     this.residenceCitys.push({city: this.rResponse[i].city});
//                 }
//             } else if (successData.IsSuccess != true) {
//                 this.insured.controls['insuredrState'].setValue('');
//                 for (let i = 0; i < this.rResponse.length; i++) {
//                     this.residenceCitys.push({city: this.rResponse[i].city = ''});
//                 }
//                 this.toastr.error('In valid Pincode');
//             }
//         }
//     }
//     public insuregetpostalFailure(error) {
//         console.log(error);
//     }


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
        if (this.insurePersons.length >= 1) {
            for (let i = 0; i < this.relationshipList.length; i++) {
                if (this.relationshipList[i].status == 1) {
                    this.insureRelationList.push({
                        'relationship_code': this.relationshipList[i].relationship_code,
                        'relationship_name': this.relationshipList[i].relationship_name,
                        'status': this.relationshipList[i].status
                    });
                }
            }
        } else {
            for (let i = 0; i < this.relationshipList.length; i++) {
                this.insureRelationList.push({
                    'relationship_code': this.relationshipList[i].relationship_code,
                    'relationship_name': this.relationshipList[i].relationship_name,
                    'status': this.relationshipList[i].status
                });
            }
        }

        console.log(this.insureRelationList, 'insureRelationListinsureRelationListinsureRelationList');

    }

    public setRelationshipFailure(error) {
        console.log(error);
    }

    add(event: any) {
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
        console.log(event, 'ghj');
        if (event.target.value.length == 10) {
            if (event.target.value == this.personal.get('personalMobile').value) {
                this.mobileNumber = 'Alternate number should be different from mobile number';
            } else {
                this.mobileNumber = '';
            }
        } else {
            // this.mobileNumber = 'false';
        }

    }


// medical details
    religareQuestions() {
        const data = {
            'platform': 'web',
            'product_id': '1',
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
// question
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


// Medical
    medicalHistoryDetails(stepper: MatStepper) {

        // sessionStorage.stepper3Details = '';
        // sessionStorage.stepper3Details = JSON.stringify(this.religareQuestionsList);
        this.religareQuestionsList = [{
            "main_question": "Does any person(s) to be insured has any Pre-existing diseases?",
            "display_question": "1",
            "sub_questions_list": [{
                "question_set_code": "PEDdiabetesDetails",
                "question_details": {
                    "question_id": "1",
                    "question_code": "205",
                    "question_description": "Diabetes?",
                    "checkbox": "1",
                    "existing_question_code": "diabetesExistingSince",
                    "description_textarea": "0",
                    "other_description_code": "",
                    "family_group": [{
                        "type": "Self",
                        "age": "23",
                        "existingSince": "",
                        "diseasesDescription": "",
                        "status": false
                    }]
                }
            }, {
                "question_set_code": "PEDcancerDetails",
                "question_details": {
                    "question_id": "2",
                    "question_code": "114",
                    "question_description": "Cancer?",
                    "checkbox": "1",
                    "existing_question_code": "cancerExistingSince",
                    "description_textarea": "0",
                    "other_description_code": "",
                    "family_group": [{
                        "type": "Self",
                        "age": "23",
                        "existingSince": "",
                        "diseasesDescription": "",
                        "status": false
                    }]
                }
            }, {
                "question_set_code": "PEDhyperTensionDetails",
                "question_details": {
                    "question_id": "3",
                    "question_code": "207",
                    "question_description": "Hypertension / High Blood Pressure",
                    "checkbox": "1",
                    "existing_question_code": "hyperTensionExistingSince",
                    "description_textarea": "0",
                    "other_description_code": "",
                    "family_group": [{
                        "type": "Self",
                        "age": "23",
                        "existingSince": "",
                        "diseasesDescription": "",
                        "status": false
                    }]
                }
            }, {
                "question_set_code": "PEDliverDetails",
                "question_details": {
                    "question_id": "4",
                    "question_code": "232",
                    "question_description": "Liver Disease?",
                    "checkbox": "1",
                    "existing_question_code": "liverExistingSince",
                    "description_textarea": "0",
                    "other_description_code": "",
                    "family_group": [{
                        "type": "Self",
                        "age": "23",
                        "existingSince": "",
                        "diseasesDescription": "",
                        "status": false
                    }]
                }
            }, {
                "question_set_code": "PEDcardiacDetails",
                "question_details": {
                    "question_id": "5",
                    "question_code": "143",
                    "question_description": "Cardiac Disease?",
                    "checkbox": "1",
                    "existing_question_code": "cardiacExistingSince",
                    "description_textarea": "0",
                    "other_description_code": "",
                    "family_group": [{
                        "type": "Self",
                        "age": "23",
                        "existingSince": "",
                        "diseasesDescription": "",
                        "status": false
                    }]
                }
            }, {
                "question_set_code": "PEDjointpainDetails",
                "question_details": {
                    "question_id": "6",
                    "question_code": "105",
                    "question_description": "Joint Pain?",
                    "checkbox": "1",
                    "existing_question_code": "jointpainExistingSince",
                    "description_textarea": "0",
                    "other_description_code": "",
                    "family_group": [{
                        "type": "Self",
                        "age": "23",
                        "existingSince": "",
                        "diseasesDescription": "",
                        "status": false
                    }]
                }
            }, {
                "question_set_code": "PEDkidneyDetails",
                "question_details": {
                    "question_id": "7",
                    "question_code": "129",
                    "question_description": "Kidney Disease?",
                    "checkbox": "1",
                    "existing_question_code": "kidneyExistingSince",
                    "description_textarea": "0",
                    "other_description_code": "",
                    "family_group": [{
                        "type": "Self",
                        "age": "23",
                        "existingSince": "",
                        "diseasesDescription": "",
                        "status": false
                    }]
                }
            }, {
                "question_set_code": "PEDparalysisDetails",
                "question_details": {
                    "question_id": "8",
                    "question_code": "164",
                    "question_description": "Paralysis?",
                    "checkbox": "1",
                    "existing_question_code": "paralysisExistingSince",
                    "description_textarea": "0",
                    "other_description_code": "",
                    "family_group": [{
                        "type": "Self",
                        "age": "23",
                        "existingSince": "",
                        "diseasesDescription": "",
                        "status": false
                    }]
                }
            }, {
                "question_set_code": "PEDcongenitalDetails",
                "question_details": {
                    "question_id": "9",
                    "question_code": "122",
                    "question_description": "Congenital Disorder?",
                    "checkbox": "1",
                    "existing_question_code": "congenitalExistingSince",
                    "description_textarea": "0",
                    "other_description_code": "",
                    "family_group": [{
                        "type": "Self",
                        "age": "23",
                        "existingSince": "",
                        "diseasesDescription": "",
                        "status": false
                    }]
                }
            }, {
                "question_set_code": "PEDHivaidsDetails",
                "question_details": {
                    "question_id": "10",
                    "question_code": "147",
                    "question_description": "HIV/AIDS?",
                    "checkbox": "1",
                    "existing_question_code": "hivaidsExistingSince",
                    "description_textarea": "0",
                    "other_description_code": "",
                    "family_group": [{
                        "type": "Self",
                        "age": "23",
                        "existingSince": "",
                        "diseasesDescription": "",
                        "status": false
                    }]
                }
            }, {
                "question_set_code": "PEDotherDetails",
                "question_details": {
                    "question_id": "11",
                    "question_code": "210",
                    "question_description": "Any other diseases or ailments not mentioned above ?",
                    "checkbox": "1",
                    "existing_question_code": "otherExistingSince",
                    "description_textarea": "1",
                    "other_description_code": "otherDiseasesDescription",
                    "family_group": [{
                        "type": "Self",
                        "age": "23",
                        "existingSince": "",
                        "diseasesDescription": "",
                        "status": false
                    }]
                }
            }, {
                "question_set_code": "PEDRespiratoryDetails",
                "question_details": {
                    "question_id": "12",
                    "question_code": "250",
                    "question_description": "Respiratory disorders inclusion?",
                    "checkbox": "1",
                    "existing_question_code": "respiratoryExistingSince",
                    "description_textarea": "0",
                    "other_description_code": "",
                    "family_group": [{
                        "type": "Self",
                        "age": "23",
                        "existingSince": "",
                        "diseasesDescription": "",
                        "status": false
                    }]
                }
            }, {
                "question_set_code": "PEDEndoDetails",
                "question_details": {
                    "question_id": "13",
                    "question_code": "222",
                    "question_description": "Any disorders of the endocrine system (including but not limited to Pituitary / Parathyroid / adrenal gland disorders)",
                    "checkbox": "1",
                    "existing_question_code": "EndocriExistingSince",
                    "description_textarea": "0",
                    "other_description_code": "",
                    "family_group": [{
                        "type": "Self",
                        "age": "23",
                        "existingSince": "",
                        "diseasesDescription": "",
                        "status": false
                    }]
                }
            }, {
                "question_set_code": "PEDillnessDetails",
                "question_details": {
                    "question_id": "14",
                    "question_code": "502",
                    "question_description": "Has any of the Proposed to be Insured consulted/taken treatment or recommended to take investigations/medication/surgery other than for childbirth/minor injuries? *",
                    "checkbox": "1",
                    "existing_question_code": "illnessExistingSince",
                    "description_textarea": "0",
                    "other_description_code": "",
                    "family_group": [{
                        "type": "Self",
                        "age": "23",
                        "existingSince": "",
                        "diseasesDescription": "",
                        "status": false
                    }]
                }
            }, {
                "question_set_code": "PEDSurgeryDetails",
                "question_details": {
                    "question_id": "15",
                    "question_code": "503",
                    "question_description": "Has any of the Proposed to be Insured been hospitalized or has been under any prolonged treatment for any illness/injury or has undergone surgery other than for childbirth/minor injuries? *",
                    "checkbox": "1",
                    "existing_question_code": "SurgeryExistingSince",
                    "description_textarea": "0",
                    "other_description_code": "",
                    "family_group": [{
                        "type": "Self",
                        "age": "23",
                        "existingSince": "",
                        "diseasesDescription": "",
                        "status": false
                    }]
                }
            }, {
                "question_set_code": "PEDSmokeDetails",
                "question_details": {
                    "question_id": "16",
                    "question_code": "504",
                    "question_description": "Do You smoke, consume alcohol, or chew tobacco, ghutka or paan or use any recreational drugs? If ‘Yes’ then please provide the frequency & amount consumed. *",
                    "checkbox": "1",
                    "existing_question_code": "SmokeExistingSince",
                    "description_textarea": "1",
                    "other_description_code": "OtherSmokeDetails",
                    "family_group": [{
                        "type": "Self",
                        "age": "23",
                        "existingSince": "",
                        "diseasesDescription": "",
                        "status": false
                    }]
                }
            }],
            "mStatus": "No",
            "answer_status": false
        }, {
            "main_question": "Have any of the above mentioned person(s) to be insured been diagnosed / hospitalized for any illness / injury during the last 48 months?",
            "display_question": "0",
            "sub_questions_list": [{
                "question_set_code": "HEDHealthHospitalized",
                "question_details": {
                    "question_id": "17",
                    "question_code": "H001",
                    "question_description": "",
                    "checkbox": "1",
                    "existing_question_code": "",
                    "description_textarea": "0",
                    "other_description_code": "",
                    "family_group": [{
                        "type": "Self",
                        "age": "23",
                        "existingSince": "",
                        "diseasesDescription": "",
                        "status": false
                    }]
                }
            }],
            "mStatus": "No",
            "answer_status": false
        }, {
            "main_question": "Have any of the person(s) to be insured ever filed a claim with their current / previous insurer? ",
            "display_question": "0",
            "sub_questions_list": [{
                "question_set_code": "HEDHealthClaim",
                "question_details": {
                    "question_id": "18",
                    "question_code": "H002",
                    "question_description": "",
                    "checkbox": "1",
                    "existing_question_code": "",
                    "description_textarea": "0",
                    "other_description_code": "",
                    "family_group": [{
                        "type": "Self",
                        "age": "23",
                        "existingSince": "",
                        "diseasesDescription": "",
                        "status": false
                    }]
                }
            }],
            "mStatus": "No",
            "answer_status": false
        }, {
            "main_question": "Has any proposal for Health insurance been declined, cancelled or charged a higher premium? ",
            "display_question": "0",
            "sub_questions_list": [{
                "question_set_code": "HEDHealthDeclined",
                "question_details": {
                    "question_id": "19",
                    "question_code": "H003",
                    "question_description": "",
                    "checkbox": "1",
                    "existing_question_code": "",
                    "description_textarea": "0",
                    "other_description_code": "",
                    "family_group": [{
                        "type": "Self",
                        "age": "23",
                        "existingSince": "",
                        "diseasesDescription": "",
                        "status": false
                    }]
                }
            }],
            "mStatus": "No",
            "answer_status": false
        }, {
            "main_question": "Is any of the person(s) to be insured, already covered under any other health insurance policy of Religare Health Insurance?",
            "display_question": "0",
            "sub_questions_list": [{
                "question_set_code": "HEDHealthCovered",
                "question_details": {
                    "question_id": "20",
                    "question_code": "H004",
                    "question_description": "",
                    "checkbox": "1",
                    "existing_question_code": "",
                    "description_textarea": "0",
                    "other_description_code": "",
                    "family_group": [{
                        "type": "Self",
                        "age": "23",
                        "existingSince": "",
                        "diseasesDescription": "",
                        "status": false
                    }]
                }
            }],
            "mStatus": "No",
            "answer_status": false
        }]
        // this.questions_list = [];
        // this.getFilterData = [];
        // for (let i = 0; i < this.religareQuestionsList.length; i++) {
        //     for (let j = 0; j < this.religareQuestionsList[i].sub_questions_list.length; j++) {
        //         for (let k = 0; k < this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group.length; k++) {
        //             this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].question_id = this.religareQuestionsList[i].sub_questions_list[j].question_details.question_id;
        //             this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].question_set_code = this.religareQuestionsList[i].sub_questions_list[j].question_set_code;
        //             this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].question_code = this.religareQuestionsList[i].sub_questions_list[j].question_details.question_code;
        //             this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].existing_question_code = this.religareQuestionsList[i].sub_questions_list[j].question_details.existing_question_code;
        //             this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].otherdetails_desc_code = this.religareQuestionsList[i].sub_questions_list[j].question_details.other_description_code;
        //             this.questions_list.push(this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k]);
        //         }
        //     }
        // }
        //
        // for (let i = 0; i < this.getFamilyDetails.family_members.length; i++) {
        //     this.getFilterData.push(this.questions_list.filter(data => data.type == this.getFamilyDetails.family_members[i].type));
        // }
        // for (let i = 0; i < this.totalReligareData.length; i++) {
        //     if (i > 0) {
        //         this.totalReligareData[i].questions_list = this.getFilterData[i - 1];
        //     }
        // }
        // let statusChecked = [];
        // this.medicalStatus = [];
        // console.log(this.religareQuestionsList, 'this.religareQuestionsList');
        // for (let i = 0; i < this.religareQuestionsList.length; i++) {
        //
        //     if (this.religareQuestionsList[i].mStatus == 'No') {
        //         this.medicalStatus.push('No');
        //     } else if (this.religareQuestionsList[i].mStatus == 'Yes') {
        //         this.medicalStatus.push('Yes');
        //     }
        //
        //
        //     for (let i = 0; i < this.totalReligareData.length; i++) {
        //         this.totalReligareData[i].medical_status = this.medicalStatus.includes('Yes') ? 'Yes' : 'No'
        //     }
        //
        //
        //     if (this.religareQuestionsList[i].answer_status == true) {
        //         for (let j = 0; j < this.religareQuestionsList[i].sub_questions_list.length; j++) {
        //             for (let k = 0; k < this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group.length; k++) {
        //                 if (this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].status == true) {
        //                     if (this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].existingSince == '') {
        //
        //                         statusChecked.push(0);
        //                     } else {
        //                         if (this.religareQuestionsList[i].sub_questions_list[j].question_details.description_textarea == '1') {
        //                             if (this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].diseasesDescription == '') {
        //                                 statusChecked.push(0);
        //                             } else {
        //                                 statusChecked.push(1);
        //                             }
        //                         } else {
        //                             statusChecked.push(1);
        //                         }
        //
        //
        //                     }
        //                 }
        //             }
        //         }
        //         if (statusChecked.length == 0) {
        //             statusChecked.push(2);
        //         }
        //
        //     } else {
        //
        //         if (i == this.religareQuestionsList.length - 1) {
        //             statusChecked.push(1);
        //         }
        //
        //     }
        //     console.log(this.medicalStatus, 'this.medicalStatus');
        //
        // }
        //
        // if (statusChecked.includes(0)) {
        //     this.toastr.error('Please fill the empty field');
        // } else if (statusChecked.includes(2)) {
        //     this.toastr.error('Please check atleast one checkbox!');
        // } else {
            stepper.next();

        // }

    }

    subStatus(value: any, i, k, j) {
        if (value.checked) {
        } else {
            this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].existingSince = '';
        }

    }

    // nominee details
    religareNomineeDetails(stepper: MatStepper, value) {
        this.lastStepper = stepper;
        console.log(value);

        //     if (this.nomineeDetails.valid) {
        //         sessionStorage.nomineeData = '';
        //         sessionStorage.nomineeData = JSON.stringify(value);
        //         this.proposal();
        //     }
        // }
    }
}