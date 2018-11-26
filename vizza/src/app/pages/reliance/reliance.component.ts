import {Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray, FormControl} from '@angular/forms';
import {ProposalService} from '../../shared/services/proposal.service';
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
    selector: 'app-reliance',
    templateUrl: './reliance.component.html',
    styleUrls: ['./reliance.component.scss'],
    providers: [

        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
})
export class RelianceComponent implements OnInit {
    public personal: FormGroup;
    public summary: FormGroup;
    public insureArray: FormGroup;
    public nomineeDetails: FormGroup;
    public riskDetails: FormGroup;
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
    public InsuredDetailsList: any;
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
    public cityTitle: any;
    public rAreaNames: any;
    public rAreaName: any;
    public sumTitle: any;
    public sumAreaName: any;
    public setDateAge: any;
    public dobError: any;
    public personalAge: any;
    public religareQuestionsList: any;
    public items: any;
    public step: any;
    public questionEmpty: any;
    public proposerInsureData: any;
    public mobileNumber: any;
    public  altmobileNumber: any;
    public insurerData: any;
    public totalInsureDetails: any;
    public getStepper1: any;
    public insurePersons: any;
    public getStepper2: any;
    public getNomineeData: any;
    public index: any;
    public previousinsurance: any;
    public previousInsuranceStatus: any;
    public previousInsuranceStatus1: any;
    public hideQuestion: any;
    public questions_list: any;
    public totalData: any;
    public sameField: any;
    public insureCity: any;
    public isDisable: any;
    public inputReadonly: any;
    public defaultTrue: boolean;
    public maritalDetail: any;
    public nationalityList: any;
    public ServiceTaxId: any;
    public setPincode: any;
    public riskData: any;
    public nomineeData: any;
    public nomineeRelationshipList: any;
    public getStepper3: any;
    public rStateId: any;
    public rCityId: any;
    public rCountryId: any;
    public nStateId: any;
    public nCityId: any;
    public nCountryId: any;
    public pStateId: any;
    public pCityId: any;
    public pCountryId: any;
    public proposalPArea: any;
    public proposalRArea: any;
    public nomineeAreaList: any;
    public diseaseList: any;
    public coverTypeList: any;
    public dob: any;
public minDate: any;
public maxDate: any;
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
        this.mobileNumber = 'true';
        this.inputReadonly = false;
        this.defaultTrue = true;
        this.sameField = false;
        this.isDisable = false;
        this.insureCity = false;
        this.proposerInsureData = [];
        this.totalInsureDetails = [];
        this.questions_list = [];
        this.personal = this.fb.group({
            personalTitle: ['', Validators.required],
            personalFirstname: new FormControl(''),
            personalLastname: ['', Validators.required],
            maritalStatus: ['', Validators.required],
            occupation: ['', Validators.required],
            nationality: ['', Validators.required],
            personalMidname: '',
            personalGender: ['', Validators.compose([Validators.required])],
            personalDob: ['', Validators.compose([Validators.required])],
            personalrelationship: 'SELF',
            personalPan: ['', Validators.compose([ Validators.minLength(10)])],
            personalFax: ['', Validators.compose([ Validators.minLength(10)])],
            personalAddress: ['', Validators.required],
            personalAddress2: ['', Validators.required],
            personalAddress3: '',
            personalPincode: ['', Validators.required],
            personalCity: ['', Validators.required],
            personalState: ['', Validators.required],
            personalCountry: 'IND',
            personalCityIdP: '',
            personalStateIdP: '',
            personalCountryIdP: '',
            personalDistrictIdP: '',
            personalCityIdR: '',
            personalStateIdR: '',
            personalCountryIdR: '',
            residenceDistrictIdR: '',
            personalDistrict: ['', Validators.required],
            personalArea: ['', Validators.required],
            personalNearestLandMark: '',
            personalEmail: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
            personalEmail2: ['', Validators.compose([ Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
            personalMobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
            personalMobile2: ['', Validators.compose([ Validators.pattern('[6789][0-9]{9}')])],
            personalPhone: ['', Validators.compose([ Validators.pattern('[6789][0-9]{9}')])],
            personalPhone2: ['', Validators.compose([ Validators.pattern('[6789][0-9]{9}')])],
            personalAltnumber: '',
            residenceAddress: ['', Validators.required],
            residenceAddress2: ['', Validators.required],
            residenceAddress3: '',
            residenceNearestLandMark: '',
            residencePincode: ['', Validators.required],
            residenceCity: ['', Validators.required],
            residenceArea: ['', Validators.required],
            residenceCountry: 'IND',
            residenceDistrict: ['', Validators.required],
            residenceState: ['', Validators.required],
            sameas: false,
            rolecd: 'PROPOSER',
            type: ''

        });
        this.nomineeDetails = this.fb.group({
            nomineeFirstName: ['', Validators.required],
            nomineeMidName: '',
            nomineeLastName: ['', Validators.required],
            nomineeRelationship: ['', Validators.required],
            nomineeOtherRelationship: '',
            nomineeAddress: ['', Validators.required],
            nomineeAddress2: ['', Validators.required],
            nomineeAddress3: '',
            nomineePincode: ['', Validators.required],
            nomineeCountry: 'IND',
            nomineeState: ['', Validators.required],
            nomineeCountryId: '',
            nomineeStateId: '',
            nomineeCityId: '',
            nomineeDistrict: ['', Validators.required],
            nomineeDistrictId: '',
            nomineeCity: ['', Validators.required],
            nomineeArea: ['', Validators.required],
            nearestLandMark: '',
            nomineeTitle: ['', Validators.required],
            nomineeDob: ['', Validators.compose([Validators.required])]
        });
        this.riskDetails = this.fb.group({
            serviceTax: ['', Validators.required],
            ServicesTaxId: '',
            relianceAda: ['', Validators.required],
            companyname: '',
            employeeCode: '',
            emailId:['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
            crossSell: ['', Validators.required],
            crossSellPolicyNo: '',
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
        if (this.insureArray['controls'].items['controls'][index]['controls'].personalTitle.value == 'MR') {
            this.insureArray['controls'].items['controls'][index]['controls'].personalGender.patchValue('Male');
        } else {
            this.insureArray['controls'].items['controls'][index]['controls'].personalGender.patchValue('Female');
        }
    }




    ngOnInit() {
        this.buyProductdetails = JSON.parse(sessionStorage.buyProductdetails);
        this.enquiryId = sessionStorage.enquiryId;
        this.groupName = sessionStorage.groupName;
        this.getFamilyDetails = JSON.parse(sessionStorage.changedTabDetails);
        this.insurePersons = this.getFamilyDetails.family_members;
        this.setOccupationList();
        this.setRelationship();
        this.setNomineeRelationship()
        this.maritalStatus();
        this.NationalityList();
        this.ServiceTax();
        this.getDiseaseList();
        this.getCoverTypeList();
        this.insureArray = this.fb.group({
            items: this.fb.array([])
        });
        for (let i = 0; i < this.getFamilyDetails.family_members.length; i++) {
            this.items = this.insureArray.get('items') as FormArray;
            this.items.push(this.initItemRows());
            this.insureArray['controls'].items['controls'][i]['controls'].type.setValue(this.getFamilyDetails.family_members[i].type);
        }

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

    initItemRows() {
        return this.fb.group(
            {
                rolecd: 'PRIMARY',
                personalTitle: ['', Validators.required],
                personalFirstname: new FormControl(''),
                personalLastname: ['', Validators.required],
                personalMidname: '',
                personalDob: ['', Validators.compose([Validators.required])],
                personalGender: ['', Validators.compose([Validators.required])],
                personalAge: ['', Validators.compose([Validators.required])],
                maritalStatus: ['', Validators.compose([Validators.required])],
                personalrelationship: ['', Validators.required],
                occupation: ['', Validators.required],
                IsExistingIllness: 'No',
                DiseaseID: '',
                IsInsuredConsumetobacco: '',
                HasAnyPreClaimOnInsured: '',
                HasAnyPreHealthInsuranceCancelled: '',
                DetailsOfPreClaimOnInsured: '',
                DetailsOfPrevInsuranceCancelled: '',
                OtherDisease: '',
                InsuranceCompName: '',
                PreviousPolNo: '',
                PolicyStartDate: '',
                PolicyEndDate: '',
                CoverTypeID: '',
                SumInsured: '',
                AccumulatedCumulativeBonus: '',
                sameAsProposer: false,
                sameas: false,
                type: '',
                cityHide: '',
                pCityHide: '',
                altmobileNumber:''
            }
        );
    }

    //Insure Details
    relianceInsureDetails(stepper: MatStepper, id, value, key) {
        sessionStorage.stepper2Details = '';
        sessionStorage.stepper2Details = JSON.stringify(value);
        if (this.insureArray.valid) {
            this.insurerData = value.items;
            this.totalInsureDetails = [];
            console.log(this.insurerData, 'this.insurerData this.insurerData');
            for (let i = 0; i < this.insurePersons.length; i++) {
                this.totalInsureDetails.push({
                        'RelationshipWithProposerID': this.insurerData[i].personalrelationship,
                        'Salutation': this.insurerData[i].personalTitle,
                        'FirstName': this.insurerData[i].personalFirstname,
                        'LastName': this.insurerData[i].personalLastname,
                        'Gender': this.insurerData[i].personalGender,
                        'Age': this.insurerData[i].personalAge,
                        'DOB': this.insurerData[i].personalDob,
                        'MaritalStatusID': this.insurerData[i].maritalStatus,
                        'OccupationID': this.insurerData[i].occupation,
                        'PreExistingDisease': {
                            'IsExistingIllness': this.insurerData[i].IsExistingIllness == 'Yes' ? 'true' : 'false',
                            'DiseaseList': {
                                'DiseaseDetail': {
                                    'DiseaseID': this.insurerData[i].DiseaseID,
                                    'SufferingSince': '',
                                    'OtherDisease': ''
                                }
                            },

                            'IsInsuredConsumetobacco': this.insurerData[i].IsInsuredConsumetobacco == 'Yes' ? 'true' : 'false',
                            'HasAnyPreClaimOnInsured': this.insurerData[i].HasAnyPreClaimOnInsured == 'Yes' ? 'true' : 'false',
                            'DetailsOfPreClaimOnInsured': this.insurerData[i].DetailsOfPreClaimOnInsured,
                            'HasAnyPreHealthInsuranceCancelled': this.insurerData[i].HasAnyPreHealthInsuranceCancelled == 'Yes' ? 'true' : 'false'
                        },
                        'OtherInsuranceList': this.insurerData[i].personalTitle
                });
            }
            if (sessionStorage.insurerAge  >= 18) {
                    stepper.next();

            } else {
                this.toastr.error('Proposer age should be 18 or above');
            }
        }
    }



    //Nominee Details
    religareNomineeDetails(stepper: MatStepper, value) {
        this.lastStepper = stepper;
        sessionStorage.nomineeData = '';
        sessionStorage.nomineeData = JSON.stringify(value);
        console.log(value);
        if (this.nomineeDetails.valid) {
            this.nomineeData = value;
            this.proposal();
        }
    }

    subStatus(value: any, i, k, j) {
        if (value.checked) {
        } else {
            this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].existingSince = '';
        }

    }


    //Risk Details
    riskDetail(stepper: MatStepper, value) {
        sessionStorage.stepper3Details = '';
        sessionStorage.stepper3Details = JSON.stringify(value);
        if(value.serviceTax == 'Yes') {
            this.riskDetails.get('ServicesTaxId').setValidators([Validators.required]);
        } else if(value.serviceTax == 'No') {
            this.riskDetails.get('ServicesTaxId').setValidators(null);
        }

        if(value.crossSell == 'Yes') {
            this.riskDetails.get('crossSellPolicyNo').setValidators([Validators.required]);
        } else if(value.crossSell == 'No') {
            this.riskDetails.get('crossSellPolicyNo').setValidators(null);
        }

        if(value.relianceAda == 'Yes') {
            this.riskDetails.get('companyname').setValidators([Validators.required]);
            this.riskDetails.get('employeeCode').setValidators([Validators.required]);
            this.riskDetails.get('emailId').setValidators( Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')]));
        } else if(value.relianceAda == 'No') {
            this.riskDetails.get('companyname').setValidators(null);
            this.riskDetails.get('employeeCode').setValidators(null);
            this.riskDetails.get('emailId').setValidators(null);
        }

        this.riskDetails.get('ServicesTaxId').updateValueAndValidity();
        this.riskDetails.get('companyname').updateValueAndValidity();
        this.riskDetails.get('employeeCode').updateValueAndValidity();
        this.riskDetails.get('emailId').updateValueAndValidity();
        this.riskDetails.get('crossSellPolicyNo').updateValueAndValidity();

        if (this.riskDetails.valid) {
            this.riskData = value;
            stepper.next();
        }
    }

    //Personal Details
    personalDetails(stepper: MatStepper, value) {
        console.log(value, 'value');
        this.personalData = value;
        sessionStorage.stepper1Details = '';
        sessionStorage.stepper1Details = JSON.stringify(value);
        if (this.personal.valid) {
            if (sessionStorage.proposerAge >= 18) {
                if (this.mobileNumber == '' || this.mobileNumber == 'true'){
                    stepper.next();
                }

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
            this.commonPincode(this.personal.controls['personalPincode'].value, 'proposalR');
            this.inputReadonly = true;
            this.personal.controls['residenceAddress'].setValue(this.personal.controls['personalAddress'].value);
            this.personal.controls['residenceAddress2'].setValue(this.personal.controls['personalAddress2'].value);
            this.personal.controls['residenceAddress3'].setValue(this.personal.controls['personalAddress3'].value);
            this.personal.controls['residenceCity'].setValue(this.personal.controls['personalCity'].value);
            this.personal.controls['residencePincode'].setValue(this.personal.controls['personalPincode'].value);
            this.personal.controls['residenceState'].setValue(this.personal.controls['personalState'].value);
            this.personal.controls['residenceDistrict'].setValue(this.personal.controls['personalDistrict'].value);
            this.personal.controls['residenceNearestLandMark'].setValue(this.personal.controls['personalNearestLandMark'].value);
            this.personal.controls['residenceArea'].setValue(this.personal.controls['personalArea'].value);


        } else {
            this.inputReadonly = false;
            this.personal.controls['residenceAddress'].setValue('');
            this.personal.controls['residenceAddress2'].setValue('');
            this.personal.controls['residenceAddress3'].setValue('');
            this.personal.controls['residenceCity'].setValue('');
            this.personal.controls['residencePincode'].setValue('');
            this.personal.controls['residenceState'].setValue('');
            this.personal.controls['residenceDistrict'].setValue('');
            this.personal.controls['residenceNearestLandMark'].setValue('');
            this.personal.controls['residenceArea'].setValue('');


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
        console.log(this.selectDate);
        this.setDate = this.datepipe.transform(this.selectDate, 'dd-MM-y');
        this.setDateAge = this.datepipe.transform(this.selectDate, 'y-MM-dd');
        this.personalAge = this.ageCalculate(this.setDateAge);
        if(title == 'proposer'){
            sessionStorage.setItem('proposerAge', this.personalAge);
        } else if(title == 'insurer') {
            sessionStorage.setItem('insurerAge', this.personalAge);
            this.insureArray['controls'].items['controls'][index]['controls'].personalAge.patchValue(sessionStorage.insurerAge);
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
                console.log(dob, 'dob');
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
            console.log( this.dob, 'ghjkl');
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
        console.log(yearAge, 'console.log(yearAge)');
        return yearAge;
    }

    sessionData() {
        if (sessionStorage.stepper1Details != '' && sessionStorage.stepper1Details != undefined) {
            this.getStepper1 = JSON.parse(sessionStorage.stepper1Details);
            this.personal = this.fb.group({
                personalTitle: this.getStepper1.personalTitle,
                personalFirstname: this.getStepper1.personalFirstname,
                personalLastname: this.getStepper1.personalLastname,
                personalMidname: this.getStepper1.personalMidname,
                maritalStatus: this.getStepper1.maritalStatus,
                occupation: this.getStepper1.occupation,
                nationality: this.getStepper1.nationality,
                personalFax: this.getStepper1.personalFax,
                personalDob: this.getStepper1.personalDob,
                personalArea: this.getStepper1.personalArea,
                personalrelationship: this.getStepper1.personalrelationship,
                sameAsProposer: this.getStepper1.sameAsProposer,
                personalGender: this.getStepper1.personalGender,
                personalPan: this.getStepper1.personalPan,
                personalAddress: this.getStepper1.personalAddress,
                personalAddress2: this.getStepper1.personalAddress2,
                personalAddress3: this.getStepper1.personalAddress3,
                personalNearestLandMark: this.getStepper1.personalNearestLandMark,
                personalPincode: this.getStepper1.personalPincode,
                personalCity: this.getStepper1.personalCity,
                personalState: this.getStepper1.personalState,
                personalCountry: this.getStepper1.personalCountry,
                personalCityIdP: this.getStepper1.personalCityIdP,
                personalStateIdP: this.getStepper1.personalStateIdP,
                personalCountryIdP: this.getStepper1.personalCountryIdP,
                personalCityIdR: this.getStepper1.personalCityIdR,
                personalStateIdR: this.getStepper1.personalStateIdR,
                personalCountryIdR: this.getStepper1.personalCountryIdR,
                personalDistrictIdP: this.getStepper1.personalDistrictIdP,
                residenceDistrictIdR: this.getStepper1.residenceDistrictIdR,
                personalDistrict: this.getStepper1.personalDistrict,
                personalEmail: this.getStepper1.personalEmail,
                personalEmail2: this.getStepper1.personalEmail,
                personalMobile2: this.getStepper1.personalMobile,
                personalMobile: this.getStepper1.personalMobile,
                personalPhone: this.getStepper1.personalPhone,
                personalPhone2: this.getStepper1.personalPhone,
                personalAltnumber: this.getStepper1.personalAltnumber,
                residenceAddress: this.getStepper1.residenceAddress,
                residenceAddress2: this.getStepper1.residenceAddress2,
                residenceAddress3: this.getStepper1.residenceAddress3,
                residenceNearestLandMark: this.getStepper1.residenceNearestLandMark,
                residencePincode: this.getStepper1.residencePincode,
                residenceCity: this.getStepper1.residenceCity,
                residenceArea: this.getStepper1.residenceArea,
                residenceCountry: this.getStepper1.residenceCountry,
                residenceDistrict: this.getStepper1.residenceDistrict,
                residenceState: this.getStepper1.residenceState,
                rolecd: this.getStepper1.rolecd,
                relationshipcd: this.getStepper1.relationshipcd,
                sameas: this.getStepper1.sameas,
            });
            if (this.getStepper1.personalPincode != '') {
                this.commonPincode(this.getStepper1.personalPincode, 'proposalP');
                setTimeout(() =>{
                if(this.getStepper1.sameas == true) {
                    this.inputReadonly = true;
                    this.commonPincode(this.getStepper1.personalPincode, 'proposalR');
                } else if(this.getStepper1.sameas == false) {
                    this.commonPincode(this.getStepper1.residencePincode, 'proposalR');
                }
                },2000);
            };

        }

        if (sessionStorage.stepper2Details != '' && sessionStorage.stepper2Details != undefined) {
            console.log(JSON.parse(sessionStorage.stepper2Details), 'sessionStorage.stepper1Details');
            this.getStepper2 = JSON.parse(sessionStorage.stepper2Details);
            for (let i = 0; i < this.getStepper2.items.length; i++) {
                this.insureArray['controls'].items['controls'][i]['controls'].personalTitle.patchValue(this.getStepper2.items[i].personalTitle);
                this.insureArray['controls'].items['controls'][i]['controls'].personalFirstname.patchValue(this.getStepper2.items[i].personalFirstname);
                this.insureArray['controls'].items['controls'][i]['controls'].personalGender.patchValue(this.getStepper2.items[i].personalGender);
                this.insureArray['controls'].items['controls'][i]['controls'].personalAge.patchValue(this.getStepper2.items[i].personalAge);
                this.insureArray['controls'].items['controls'][i]['controls'].personalLastname.patchValue(this.getStepper2.items[i].personalLastname);
                this.insureArray['controls'].items['controls'][i]['controls'].personalDob.patchValue(this.getStepper2.items[i].personalDob);
                this.insureArray['controls'].items['controls'][i]['controls'].personalrelationship.patchValue(this.getStepper2.items[i].personalrelationship);
                this.insureArray['controls'].items['controls'][i]['controls'].occupation.patchValue(this.getStepper2.items[i].occupation);
                //this.insureArray['controls'].items['controls'][i]['controls'].personalHeight.patchValue(this.getStepper2.items[i].personalHeight);
                //this.insureArray['controls'].items['controls'][i]['controls'].personalWeight.patchValue(this.getStepper2.items[i].personalWeight);
                this.insureArray['controls'].items['controls'][i]['controls'].maritalStatus.patchValue(this.getStepper2.items[i].maritalStatus);
                this.insureArray['controls'].items['controls'][i]['controls'].sameas.patchValue(this.getStepper2.items[i].sameas);
                this.insureArray['controls'].items['controls'][i]['controls'].sameAsProposer.patchValue(this.getStepper2.items[i].sameAsProposer);
                this.insureArray['controls'].items['controls'][i]['controls'].rolecd.patchValue(this.getStepper2.items[i].rolecd);
                this.insureArray['controls'].items['controls'][i]['controls'].IsExistingIllness.patchValue(this.getStepper2.items[i].IsExistingIllness);
                this.insureArray['controls'].items['controls'][i]['controls'].DiseaseID.patchValue(this.getStepper2.items[i].DiseaseID);
                this.insureArray['controls'].items['controls'][i]['controls'].IsInsuredConsumetobacco.patchValue(this.getStepper2.items[i].IsInsuredConsumetobacco);
                this.insureArray['controls'].items['controls'][i]['controls'].HasAnyPreClaimOnInsured.patchValue(this.getStepper2.items[i].HasAnyPreClaimOnInsured);
                this.insureArray['controls'].items['controls'][i]['controls'].HasAnyPreHealthInsuranceCancelled.patchValue(this.getStepper2.items[i].HasAnyPreHealthInsuranceCancelled);
                this.insureArray['controls'].items['controls'][i]['controls'].DetailsOfPreClaimOnInsured.patchValue(this.getStepper2.items[i].DetailsOfPreClaimOnInsured);
                this.insureArray['controls'].items['controls'][i]['controls'].DetailsOfPrevInsuranceCancelled.patchValue(this.getStepper2.items[i].DetailsOfPrevInsuranceCancelled);
                this.insureArray['controls'].items['controls'][i]['controls'].OtherDisease.patchValue(this.getStepper2.items[i].OtherDisease);
                this.insureArray['controls'].items['controls'][i]['controls'].InsuranceCompName.patchValue(this.getStepper2.items[i].InsuranceCompName);
                this.insureArray['controls'].items['controls'][i]['controls'].PreviousPolNo.patchValue(this.getStepper2.items[i].PreviousPolNo);
                this.insureArray['controls'].items['controls'][i]['controls'].PolicyStartDate.patchValue(this.getStepper2.items[i].PolicyStartDate);
                this.insureArray['controls'].items['controls'][i]['controls'].PolicyEndDate.patchValue(this.getStepper2.items[i].PolicyEndDate);
                this.insureArray['controls'].items['controls'][i]['controls'].CoverTypeID.patchValue(this.getStepper2.items[i].CoverTypeID);
                this.insureArray['controls'].items['controls'][i]['controls'].SumInsured.patchValue(this.getStepper2.items[i].SumInsured);
                this.insureArray['controls'].items['controls'][i]['controls'].AccumulatedCumulativeBonus.patchValue(this.getStepper2.items[i].AccumulatedCumulativeBonus);
            }
        }
        if (sessionStorage.stepper3Details != '' && sessionStorage.stepper1Details != undefined) {

            console.log(JSON.parse(sessionStorage.stepper3Details), 'sessionStorage.stepper3Details');
            this.getStepper3 = JSON.parse(sessionStorage.stepper3Details);
            this.riskDetails = this.fb.group({
                serviceTax: this.getStepper3.serviceTax,
                ServicesTaxId: this.getStepper3.ServicesTaxId,
                relianceAda: this.getStepper3.relianceAda,
                companyname: this.getStepper3.companyname,
                employeeCode: this.getStepper3.employeeCode,
                emailId: this.getStepper3.emailId,
                crossSell: this.getStepper3.crossSell,
                crossSellPolicyNo: this.getStepper3.crossSellPolicyNo
            });
            }


        if (sessionStorage.nomineeData != '' && sessionStorage.nomineeData != undefined) {
            console.log(JSON.parse(sessionStorage.nomineeData), 'sessionStorage.stepper1Details');
            this.getNomineeData = JSON.parse(sessionStorage.nomineeData);
            this.nomineeDetails = this.fb.group({
                nomineeFirstName: this.getNomineeData.nomineeFirstName,
                nomineeMidName: this.getNomineeData.nomineeMidName,
                nomineeLastName: this.getNomineeData.nomineeLastName,
                nomineeRelationship: this.getNomineeData.nomineeRelationship,
                nomineeOtherRelationship: this.getNomineeData.nomineeOtherRelationship,
                nomineeAddress: this.getNomineeData.nomineeAddress,
                nomineeAddress2: this.getNomineeData.nomineeAddress2,
                nomineeAddress3: this.getNomineeData.nomineeAddress3,
                nomineePincode: this.getNomineeData.nomineePincode,
                nomineeCountry: this.getNomineeData.nomineeCountry,
                nomineeCity: this.getNomineeData.nomineeCity,
                nomineeState: this.getNomineeData.nomineeState,
                nomineeCountryId: this.getNomineeData.nomineeCountryId,
                nomineeDistrictId: this.getNomineeData.nomineeDistrictId,
                nomineeCityId: this.getNomineeData.nomineeCityId,
                nomineeStateId: this.getNomineeData.nomineeStateId,
                nomineeDistrict: this.getNomineeData.nomineeDistrict,
                nomineeArea: this.getNomineeData.nomineeArea,
                nearestLandMark: this.getNomineeData.nearestLandMark,
                nomineeTitle: this.getNomineeData.nomineeTitle,
                nomineeDob: this.getNomineeData.nomineeDob
            });
        }


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
    }


    sameProposer(value: any) {
        if (value.checked) {
            this.insureArray['controls'].items['controls'][0]['controls'].cityHide.patchValue(true);
            this.insureArray['controls'].items['controls'][0]['controls'].pCityHide.patchValue(true);
            this.insureArray['controls'].items['controls'][0]['controls'].personalTitle.patchValue(this.personal.controls['personalTitle'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].personalFirstname.patchValue(this.personal.controls['personalFirstname'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].personalMidname.patchValue(this.personal.controls['personalMidname'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].personalLastname.patchValue(this.personal.controls['personalLastname'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].personalDob.patchValue(this.personal.controls['personalDob'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].maritalStatus.patchValue(this.personal.controls['maritalStatus'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].occupation.patchValue(this.personal.controls['occupation'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].personalGender.patchValue(this.personal.controls['personalGender'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].sameas.patchValue(this.personal.controls['sameas'].value);



        } else {
            this.insureArray['controls'].items['controls'][0]['controls'].cityHide.patchValue(false);
            this.insureArray['controls'].items['controls'][0]['controls'].pCityHide.patchValue(true);
            this.insureArray['controls'].items['controls'][0]['controls'].personalTitle.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].personalFirstname.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].personalMidname.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].personalLastname.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].personalDob.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].occupation.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].maritalStatus.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].personalGender.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].sameas.patchValue('');


        }

    }

    boolenHide(change: any, id, key){
        if(key == 'IsExistingIllness' && change.value == 'No') {
            this.insureArray['controls'].items['controls'][id]['controls'].DiseaseID.patchValue('');
        }

        if (key == 'serviceTax' && change.value == 'No') {
            this.riskDetails['controls'].ServicesTaxId.patchValue('');
        }

        if (key == 'crossSell' && change.value == 'No') {
            this.riskDetails['controls'].crossSellPolicyNo.patchValue('');
        }

        if (key == 'relianceAda' && change.value == 'No') {
            this.riskDetails['controls'].companyname.patchValue('');
            this.riskDetails['controls'].employeeCode.patchValue('');
            this.riskDetails['controls'].emailId.patchValue('');
        }
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

    public commonPincodeSuccess(successData) {
        this.setPincode = successData.ResponseObject;
        if (this.title == 'proposalP') {
            if (successData.IsSuccess) {
                this.personal['controls'].personalState.patchValue(this.setPincode.state_name);
                this.personal['controls'].personalDistrict.patchValue(this.setPincode.district_name);
                this.personal['controls'].personalCity.patchValue(this.setPincode.city_village_name);
                this.proposalPArea = this.setPincode.area_details;
                this.personal['controls'].personalDistrictIdP.patchValue(this.setPincode.district_id);
                this.personal['controls'].personalCityIdP.patchValue(this.setPincode.city_village_id);
                this.personal['controls'].personalStateIdP.patchValue(this.setPincode.state_id);
            } else {
                this.toastr.error('In valid Pincode');
                this.personal['controls'].personalState.patchValue('');
                this.personal['controls'].personalDistrict.patchValue('');
                this.personal['controls'].personalCity.patchValue('');
                this.proposalPArea = [];
                this.personal['controls'].personalDistrictIdP.patchValue('');
                this.personal['controls'].personalCityIdP.patchValue('');
                this.personal['controls'].personalStateIdP.patchValue('');
            }
        }
        if (this.title == 'proposalR') {
            if (successData.IsSuccess) {
                this.personal['controls'].residenceState.patchValue(this.setPincode.state_name);
                this.personal['controls'].residenceDistrict.patchValue(this.setPincode.district_name);
                this.personal['controls'].residenceCity.patchValue(this.setPincode.city_village_name);
                this.proposalRArea = this.setPincode.area_details;
                this.personal['controls'].residenceDistrictIdR.patchValue(this.setPincode.district_id);
                this.personal['controls'].personalCityIdR.patchValue(this.setPincode.city_village_id);
                this.personal['controls'].personalStateIdR.patchValue(this.setPincode.state_id);
            } else {
                this.toastr.error('In valid Pincode');
                this.personal['controls'].residenceState.patchValue('');
                this.personal['controls'].residenceDistrict.patchValue('');
                this.personal['controls'].residenceCity.patchValue('');
                this.proposalRArea = [];
                this.personal['controls'].residenceDistrictIdR.patchValue('');
                this.personal['controls'].personalCityIdR.patchValue('');
                this.personal['controls'].personalStateIdR.patchValue('');
            }
        }

        if (this.title == 'Nominee') {
            if (successData.IsSuccess) {
                this.nomineeDetails['controls'].nomineeState.patchValue(this.setPincode.state_name);
                this.nomineeDetails['controls'].nomineeDistrict.patchValue(this.setPincode.district_name);
                this.nomineeDetails['controls'].nomineeCity.patchValue(this.setPincode.city_village_name);
                this.nomineeAreaList = this.setPincode.area_details;
                this.nomineeDetails['controls'].nomineeDistrictId.patchValue(this.setPincode.district_id);
                this.nomineeDetails['controls'].nomineeCityId.patchValue(this.setPincode.city_village_id);
                this.nomineeDetails['controls'].nomineeStateId.patchValue(this.setPincode.state_id);
            } else {
                this.toastr.error('In valid Pincode');
                this.nomineeDetails['controls'].nomineeState.patchValue('');
                this.nomineeDetails['controls'].nomineeDistrict.patchValue('');
                this.nomineeDetails['controls'].nomineeCity.patchValue('');
                this.nomineeAreaList = [];
                this.nomineeDetails['controls'].nomineeDistrictId.patchValue('');
                this.nomineeDetails['controls'].nomineeCityId.patchValue('');
                this.nomineeDetails['controls'].nomineeStateId.patchValue('');
            }
        }
    }

    public commonPincodeFailure(error) {
        console.log(error);
    }

    //Create Proposal
    proposal() {
        const data  = {
            'ClientDetails': {
                'ClientTypeID' : '0',
                'DOB': this.personalData.personalDob,
                'Email': this.personalData.personalEmail,
                'ForeName': this.personalData.personalFirstname,
                'Gender': this.personalData.personalGender,
                'LastName': this.personalData.personalLastname,
                'MaritalStatusID': this.personalData.maritalStatus,
                'MidName': this.personalData.personalMidname,
                'MobileNo': this.personalData.personalMobile,
                'Nationality': this.personalData.nationality,
                'OccupationID': this.personalData.occupation,
                'PhoneNo': this.personalData.personalPhone,
                'Salutation': this.personalData.personalTitle,
                'ClientAddress': {
                    'CommunicationAddress': {
                        'Address1': this.personalData.personalAddress,
                        'Address2': this.personalData.personalAddress2,
                        'Address3': this.personalData.personalAddress3,
                        'CityID': this.personalData.personalCityIdP,
                        'Country': this.personalData.personalCountry,
                        'DistrictID': this.personalData.personalDistrictIdP,
                        'Email': this.personalData.personalEmail2,
                        'Fax': this.personalData.personalFax,
                        'MobileNo': this.personalData.personalMobile2,
                        'NearestLandmark': this.personalData.personalNearestLandMark,
                        'PanNo': this.personalData.personalPan,
                        'PhoneNo':this.personalData.personalPhone2,
                        'Pincode': this.personalData.personalPincode,
                        'AreaID': this.personalData.personalArea,
                        'StateID': this.personalData.personalStateIdP,
                    },
                    'PermanentAddress': {
                        'Address': {
                            'Address1': this.personalData.residenceAddress,
                            'Address2': this.personalData.residenceAddress2,
                            'Address3': this.personalData.residenceAddress3,
                            'CityID': this.personalData.personalCityIdR,
                            'Country': this.personalData.personalCountry,
                            'DistrictID': this.personalData.residenceDistrictIdR,
                            'NearestLandmark': this.personalData.residenceNearestLandMark,
                            'Pincode': this.personalData.residencePincode,
                            'AreaID': this.personalData.residenceArea,
                            'StateID': this.personalData.personalStateIdR
                        }
                    }
                }
            },
            'InsuredDetailsList': {
                'InsuredDetail': this.totalInsureDetails
            },
            'Policy': {
                'Tenure': '1'
            },
            'RiskDetails': {
                'SumInsured': '300000',
                'IsServiceTaxExemptionApplicable': this.riskData.serviceTax == 'Yes' ? 'true' : 'false',
                'ServiceTaxExemptionID': this.riskData.ServicesTaxId,
                'IsAnyEmployeeOfRelianceADAGroup': this.riskData.relianceAda == 'Yes' ? 'true' : 'false',
                'CompanyNameID': this.riskData.companyname,
                'EmployeeCode': this.riskData.employeeCode,
                'EmailID': this.riskData.emailId,
                'Iscrosssell': this.riskData.crossSell == 'Yes' ? 'true' : 'false',
                'CrossSellPolicyNo': this.riskData.crossSellPolicyNo,
            },
            'NomineeDetails': {
                'FirstName': this.nomineeData.nomineeFirstName,
                'Salutation': this.nomineeData.nomineeTitle,
                'MiddleName': this.nomineeData.nomineeMidName,
                'LastName': this.nomineeData.nomineeLastName,
                'DOB': this.nomineeData.nomineeDob,
                'NomineeRelationshipID': this.nomineeData.nomineeRelationship,
                'NomineeRelationshipOther': this.nomineeData.nomineeOtherRelationship,
                'NomineeAddress': {
                    'Address1': this.nomineeData.nomineeAddress,
                    'Address2': this.nomineeData.nomineeAddress2,
                    'Address3': this.nomineeData.nomineeAddress3,
                    'CityID': this.nomineeData.nomineeCityId,
                    'Country': this.nomineeData.nomineeCountry,
                    'DistrictID': this.nomineeData.nomineeDistrictId,
                    'NearestLandmark': this.nomineeData.nearestLandMark,
                    'Pincode': this.nomineeData.nomineePincode,
                    'AreaID': this.nomineeData.nomineeArea,
                    'StateID': this.nomineeData.nomineeStateId
                }
            },

            'LstHealthCoverDetails': '',
            'PreviousInsuranceDetails': {
                'PrevInsuranceID': '',
                'PrevYearPolicyNo': '',
                'PrevYearPolicyStartDate': '',
                'PrevYearPolicyEndDate': ''
            },
            'enquiry_id': this.enquiryId,
            'proposal_id': sessionStorage.proposalID != '' ? sessionStorage.proposalID : this.proposalId,
            'user_id' : this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
        };

        this.settings.loadingSpinner = true;
        this.proposalservice.relianceProposal(data).subscribe(
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
            if(successData.ResponseObject.ErrorMessages.ErrMessages == ''){
                this.toastr.success('Proposal created successfully!!');
            } else{
                this.toastr.error(successData.ResponseObject.ErrorMessages.ErrMessages);
            }
            this.summaryData = successData.ResponseObject;
            console.log(this.summaryData, 'summaryDatasummaryData');
            let getdata=[];

            for( let i = 0; i <  this.summaryData.InsuredDetailsList.length; i++) {
                for( let j=0; j < this.relationshipList.length; j++){
                    if(this.summaryData.InsuredDetailsList[i].RelationshipWithProposerID == this.relationshipList[j].relationship_proposer_id ) {
                        this.summaryData.InsuredDetailsList[i].relationship_proposer_name = this.relationshipList[j].relationship_proposer_name;
                    }
                }
            }
            for( let j=0; j < this.relationshipList.length; j++){
                if(this.summaryData.NomineeDetails.NomineeRelationshipID == this.relationshipList[j].relationship_proposer_id ) {
                    this.summaryData.NomineeDetails.relationship_proposer_name = this.relationshipList[j].relationship_proposer_name;
                }
            }
            // disease name

                for( let j=0; j < this.diseaseList.length; j++){
                    if( this.summaryData.InsuredDetailsList[0].PreExistingDisease.DiseaseList[0].DiseaseID == this.diseaseList[j].pre_existing_disease_id ) {
                        this.summaryData.InsuredDetailsList[0].PreExistingDisease.DiseaseList[0].pre_existing_disease_name = this.diseaseList[j].pre_existing_disease_name;
                    }
                }

            console.log(this.summaryData.InsuredDetailsList[0].PreExistingDisease.DiseaseList[0].DiseaseID, 'fdghjkwesdrfghjtr');

            for( let i = 0; i <  this.summaryData.InsuredDetailsList.length; i++) {
                for (let j = 0; j < this.maritalDetail.length; j++) {
                    if (this.summaryData.InsuredDetailsList[i].MaritalStatusID == this.maritalDetail[j].marital_status_id) {
                        this.summaryData.InsuredDetailsList[i].marital_status = this.maritalDetail[j].marital_status;
                    }
                }
            }
            for( let i = 0; i <  this.summaryData.InsuredDetailsList.length; i++) {
                for (let j = 0; j < this.occupationList.length; j++) {
                    if (this.summaryData.InsuredDetailsList[i].OccupationID == this.occupationList[j].occupation_id) {
                        this.summaryData.InsuredDetailsList[i].occupation_name = this.occupationList[j].occupation_name;
                    }
                }
            }

                for (let j = 0; j < this.occupationList.length; j++) {
                    if (this.summaryData.ClientDetails.OccupationID == this.occupationList[j].occupation_id) {
                        this.summaryData.ClientDetails.occupation_name = this.occupationList[j].occupation_name;
                    } else {
                    }
                }
                for (let j = 0; j < this.maritalDetail.length; j++) {
                    if (this.summaryData.ClientDetails.MaritalStatusID == this.maritalDetail[j].marital_status_id) {
                        this.summaryData.ClientDetails.marital_status = this.maritalDetail[j].marital_status;
                    }
                }
            for (let j = 0; j <  this.nationalityList.length; j++) {
                if (this.summaryData.ClientDetails.Nationality == this.nationalityList[j].nationality_id) {
                    this.summaryData.ClientDetails.nationality = this.nationalityList[j].nationality;
                }
            }
            console.log(this.setPincode, 'pinn');
             if(this.summaryData.ClientDetails.ClientAddress.CommunicationAddress.CityID == this.setPincode.city_village_id) {
                 this.summaryData.ClientDetails.ClientAddress.CommunicationAddress.city_village_name =  this.setPincode.city_village_name;
             }
             if(this.summaryData.ClientDetails.ClientAddress.CommunicationAddress.StateID == this.setPincode.state_id) {
                this.summaryData.ClientDetails.ClientAddress.CommunicationAddress.state_name =  this.setPincode.state_name;
            }
            if(this.summaryData.ClientDetails.ClientAddress.PermanentAddress.Address.CityID == this.setPincode.city_village_id) {
                this.summaryData.ClientDetails.ClientAddress.PermanentAddress.Address.city_village_name =  this.setPincode.city_village_name;
            }
            if(this.summaryData.ClientDetails.ClientAddress.PermanentAddress.Address.StateID == this.setPincode.state_id) {
                this.summaryData.ClientDetails.ClientAddress.PermanentAddress.Address.state_name =  this.setPincode.state_name;
            }

            for(let i=0; i< this.setPincode.area_details.length; i++ ) {
                console.log(this.setPincode.area_details[0], 'jhfsajhdg');
                if(this.summaryData.ClientDetails.ClientAddress.CommunicationAddress.AreaID == this.setPincode.area_details[i].area_id) {
                    this.summaryData.ClientDetails.ClientAddress.CommunicationAddress.area_name = this.setPincode.area_details[i].area_name;

                }
            }
            for(let i=0; i< this.setPincode.area_details.length; i++ ) {
                if(this.summaryData.ClientDetails.ClientAddress.PermanentAddress.Address.AreaID == this.setPincode.area_details[i].area_id) {
                    this.summaryData.ClientDetails.ClientAddress.PermanentAddress.Address.area_name = this.setPincode.area_details[i].area_name;

                }
            }
            // nominee
              if(this.summaryData.NomineeDetails.NomineeAddress.CityID == this.setPincode.city_village_id) {
                this. summaryData.NomineeDetails.NomineeAddress.city_village_name =  this.setPincode.city_village_name;
              }
              console.log(this. summaryData.NomineeDetails.NomineeAddress, 'sedrtfgyhuj');
              if(this.summaryData.NomineeDetails.NomineeAddress.StateID == this.setPincode.state_id) {
                this.summaryData.NomineeDetails.NomineeAddress.state_name =  this.setPincode.state_name;
              }
             for(let i=0; i< this.setPincode.area_details.length; i++ ) {
                console.log(this.setPincode.area_details[0], 'seeee');
                if (this.summaryData.NomineeDetails.NomineeAddress.AreaID == this.setPincode.area_details[i].area_id) {
                    console.log(this.summaryData.NomineeDetails.NomineeAddress.AreaID, 'nomiee');
                    this. summaryData.NomineeDetails.NomineeAddress.area_name = this.setPincode.area_details[i].area_name;

                }
            }
            this.proposalId = this.summaryData.proposal_id;
            this.RediretUrlLink = successData.RediretUrlLink;
            this.proposalId = this.summaryData.proposal_id;
            sessionStorage.proposalID = this.proposalId;
            if (this.nomineeDetails.valid) {
                if (sessionStorage.proposerAge >= 18) {
                    if (this.mobileNumber == '' || this.mobileNumber == 'true'){
            this.lastStepper.next();
                    }

                } else {
                    this.toastr.error('Proposer age should be 18 or above');
                }
            }
        } else {
            this.toastr.error(successData.ErrorObject);
           // this.toastr.error('Nominee age should be 18 or above');


        }
    }



    ServiceTax(){
        const data = {
            'platform': 'web',
            'product_id': '11',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.proposalservice.getServiceTax(data).subscribe(
            (successData) => {
                this.serviceTaxSuccess(successData);
            },
            (error) => {
                this.serviceTaxFailure(error);
            }
        );
}

    public serviceTaxSuccess(successData) {
        if (successData.IsSuccess == true) {
            this.ServiceTaxId = successData.ResponseObject;
        }
    }

    public serviceTaxFailure(error) {
        console.log(error);
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

//Marital Status
    maritalStatus() {
        const data = {
            'platform': 'web',
            'product_id': '11',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.proposalservice.getMaritalStatus(data).subscribe(
            (successData) => {
                this.getMaritalStatusSuccess(successData);
            },
            (error) => {
                this.getMaritalStatusFailure(error);
            }
        );
    }

    public getMaritalStatusSuccess(successData) {
        if (successData.IsSuccess == true) {
            this.maritalDetail = successData.ResponseObject;
            console.log( this.maritalDetail , 'maritalDetailmaritalDetail');

        }
    }

    public getMaritalStatusFailure(error) {
        console.log(error);
    }



    //Disease List
    getDiseaseList() {
        const data = {
            'platform': 'web',
            'product_id': '11',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.proposalservice.getDiseaseList(data).subscribe(
            (successData) => {
                this.getDiseaseListSuccess(successData);
            },
            (error) => {
                this.getDiseaseListFailure(error);
            }
        );
    }

    public getDiseaseListSuccess(successData) {
        if (successData.IsSuccess == true) {
            this.diseaseList = successData.ResponseObject;
        }
    }

    public getDiseaseListFailure(error) {
        console.log(error);
    }


    //Cover type List
    getCoverTypeList() {
        const data = {
            'platform': 'web',
            'product_id': '11',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.proposalservice.getCoverType(data).subscribe(
            (successData) => {
                this.getCoverTypeSuccess(successData);
            },
            (error) => {
                this.getCoverTypeFailure(error);
            }
        );
    }

    public getCoverTypeSuccess(successData) {
        if (successData.IsSuccess == true) {
            this.coverTypeList = successData.ResponseObject;
        }
    }

    public getCoverTypeFailure(error) {
        console.log(error);
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
        console.log(this.nationalityList,'this.nationalityListthis.nationalityList');
    }

    public getNationalityStatusFailure(error) {
        console.log(error);
    }


    setOccupationList() {
        const data = {
            'platform': 'web',
            'product_id': '11',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.proposalservice.getRelianceOccupation(data).subscribe(
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
            this.occupationList = successData.ResponseObject;
        }
    }

    public occupationListFailure(error) {
        console.log(error);
    }



    setRelationship() {
        const data = {
            'platform': 'web',
            'product_id': '11',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.proposalservice.getRelatioshipProposerList(data).subscribe(
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
        console.log( this.relationshipList, 'sdfghsdfghszdfgh');

    }
    public setRelationshipFailure(error) {
        console.log(error);
    }

    setNomineeRelationship() {
        const data = {
            'platform': 'web',
            'product_id': '11',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.proposalservice.getNomineeRelatioshipList(data).subscribe(
            (successData) => {
                this.setNomineeRelationshipSuccess(successData);
            },
            (error) => {
                this.setNomineeRelationshipFailure(error);
            }
        );
    }

    public setNomineeRelationshipSuccess(successData) {
        console.log(successData.ResponseObject);
        this.nomineeRelationshipList = successData.ResponseObject;
        console.log(this.nomineeRelationshipList, 'this.nomineeRelationshipList');
    }

    public setNomineeRelationshipFailure(error) {
        console.log(error);
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
    public onCharacter(event: any) {
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
        sessionStorage.mobileNumber = this.mobileNumber;
    }


}

