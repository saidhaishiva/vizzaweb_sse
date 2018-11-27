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
  selector: 'app-appollo-munich',
  templateUrl: './appollo-munich.component.html',
  styleUrls: ['./appollo-munich.component.scss'],
    providers: [

        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
})
export class AppolloMunichComponent implements OnInit {
    public proposer: FormGroup;
    public insureArray: FormGroup;
    public nomineeDetails: FormGroup;
    public summary: FormGroup;
    public setDate: any;
    public selectDate: any;
    public stopNext: boolean;
    public buyProductdetails: any;
    public groupName: any;
    public getFamilyDetails: any;
    public enquiryId: any;
    public proposerData: any;
    public relationshipList: any;
    public AppolloStateList: any;
    public AppolloDistrictList: any;
    public AppolloCityList: any;
    public occupationList: any;
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
    public proposerCitys: any;
    public areaName: any;
    public title: any;
    public cityTitle: any;
    public rAreaNames: any;
    public rAreaName: any;
    public sumTitle: any;
    public sumAreaName: any;
    public setDateAge: any;
    public dobError: any;
    public proposerAge: any;
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
    public stateCode: any;
    public stateTitle: any;
    public nomineeAppolloDistrictList: any;
    public nomineeAppolloCityLis: any;
    public proposerProofNum: any;
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
      this.proposer = this.fb.group({
          proposerTitle: ['', Validators.required],
          proposerFirstname: ['', Validators.required],
          proposerMidname: '',
          proposerLastname: ['', Validators.required],
          proposerGender: ['', Validators.compose([Validators.required])],
          proposerDob: ['', Validators.compose([Validators.required])],
          proposerEmail: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
          proposerMobile: ['', Validators.compose([Validators.pattern('[6789][0-9]{9}')])],
          maritalStatus: ['', Validators.required],
          proposerrelationship: 'SELF',
          proposerIdProof: '',
          proposerIdProofIdP: '',
          proposerPan: ['', Validators.compose([ Validators.minLength(10)])],
          proposerDriving: '',
          proposerPassport: '',
          proposerVoter: '',
          proposerGst: ['', Validators.compose([Validators.minLength(15)])],
          proposerAddress: ['', Validators.required],
          proposerAddress2: '',
          proposerAddress3: '',
          nationality: 'IN',
          proposerPincode: ['', Validators.required],
          proposerCity: ['', Validators.required],
          proposerCountry: 'IND',
          proposerState: ['', Validators.required],
          proposerDistrict: '',
          proposerCityIdP: '',
          proposerStateIdP: '',
          proposerCountryIdP: '',
          proposerDistrictIdP: '',
          MedicalInformations: '',
          TotalPremiumAmount: ['', Validators.required],
          rolecd: 'PROPOSER',
          type: ''

      });
      this.nomineeDetails = this.fb.group({
          nomineeTitle: '',
          nomineeName: '',
          nomineeAddress: '',
          nomineePincode: '',
          nomineeCity: '',
          nomineeCityId: '',
          nomineeState: '',
          nomineeStateId: '',
          nomineeCountryId: '',
          nomineeCountry: 'IND',
          nationality: 'IN',
          nomineeDistrict: '',
          nomineeDistrictId: '',
          nomineeRelationship: ''

      });
  }
    changeGender() {
        if (this.proposer.controls['proposerTitle'].value == 'MR'){
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





    ngOnInit() {
        this.buyProductdetails = JSON.parse(sessionStorage.buyProductdetails);
        this.enquiryId = sessionStorage.enquiryId;
        this.groupName = sessionStorage.groupName;
        this.getFamilyDetails = JSON.parse(sessionStorage.changedTabDetails);
        this.insurePersons = this.getFamilyDetails.family_members;
        this.setRelationship();
        // this.setNomineeRelationship();
        this.maritalStatus();
        this.IdProofList();
        this.AppolloState();
        this.setOccupationList();
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
                proposerTitle: ['', Validators.required],
                proposerFirstname: ['', Validators.compose([Validators.required])],
                proposerLastname: ['', Validators.required],
                proposerMidname: '',
                proposerDob: ['', Validators.compose([Validators.required])],
                proposerGender: ['', Validators.compose([Validators.required])],
                proposerEmail: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
                proposerMobile: ['', Validators.compose([Validators.pattern('[6789][0-9]{9}')])],
                proposerAge: ['', Validators.compose([Validators.required])],
                maritalStatus: ['', Validators.compose([Validators.required])],
                proposerIdProof: '',
                proposerIdProofIdP: '',
                proposerPan: ['', Validators.compose([ Validators.minLength(10)])],
                proposerDriving: '',
                proposerPassport: '',
                proposerVoter: '',
                proposerGst: ['', Validators.compose([Validators.minLength(15)])],
                proposerAddress: ['', Validators.required],
                proposerAddress2: '',
                proposerAddress3: '',
                nationality: 'IN',
                proposerPincode: ['', Validators.required],
                proposerCity: ['', Validators.required],
                proposerCountry: 'IND',
                proposerState: ['', Validators.required],
                proposerDistrict: '',
                proposerCityIdP: '',
                proposerStateIdP: '',
                proposerCountryIdP: '',
                proposerDistrictIdP: '',
                proposerAnnualIncome: ['', Validators.required],
                proposerFamilySize: ['', Validators.compose([Validators.maxLength(2)])],
                proposerHeight: ['', Validators.required],
                proposerWeight: ['', Validators.required],
                LiquorPeg: ['', Validators.required],
                Smoking: ['', Validators.required],
                WineGlass: ['', Validators.required],
                BeerBottle: ['', Validators.required],
                Pouches: ['', Validators.required],
                PolicyStartDate: '',
                PolicyEndDate: '',
                PreviousInsurer: ['', Validators.required],
                PreviousPolicyNumber: ['', Validators.required],
                SumInsured: ['', Validators.required],
                QualifyingAmount: '',
                WaivePeriod: '',
                Remarks: '',
                Proposeroccupation: ['', Validators.required],
                proposerrelationship: ['', Validators.required],
                sameAsProposer: false,
                sameas: false,
                type: '',
                cityHide: '',
                pCityHide: '',
            }
        );
    }

    //Insure Details
    AppolloInsureDetails(stepper: MatStepper, id, value, key) {
        sessionStorage.stepper2Details = '';
        sessionStorage.stepper2Details = JSON.stringify(value);
        if (this.insureArray.valid) {
            this.insurerData = value.items;
            if(this.insureArray['controls'].items['controls'][id]['controls'].proposerDriving.value != ""){
                this.insureArray['controls'].items['controls'][id]['controls'].proposerIdProofIdP.patchValue(this.insureArray['controls'].items['controls'][id]['controls'].proposerDriving.value);
            } else if(this.insureArray['controls'].items['controls'][id]['controls'].proposerPassport.value != ""){
                this.insureArray['controls'].items['controls'][id]['controls'].proposerIdProofIdP.patchValue(this.insureArray['controls'].items['controls'][id]['controls'].proposerPassport.value);
            }else if(this.insureArray['controls'].items['controls'][id]['controls'].proposerVoter.value != ""){
                this.insureArray['controls'].items['controls'][id]['controls'].proposerIdProofIdP.patchValue(this.insureArray['controls'].items['controls'][id]['controls'].proposerVoter.value);
            } else if(this.insureArray['controls'].items['controls'][id]['controls'].proposerPan.value != ""){
                this.insureArray['controls'].items['controls'][id]['controls'].proposerIdProofIdP.patchValue(this.insureArray['controls'].items['controls'][id]['controls'].proposerPan.value);
            }
            this.totalInsureDetails = [];
            console.log(this.insurerData, 'this.insurerData this.insurerData');
            for (let i = 0; i < this.insurePersons.length; i++) {
                this.totalInsureDetails.push({
                    'AddressLine1': this.insurerData[i].proposerAddress,
                    'AddressLine2': this.insurerData[i].proposerAddress2,
                    'AddressLine3': this.insurerData[i].proposerAddress3,
                    'CountryCode': this.insurerData[i].proposerCountry,
                    'District': this.insurerData[i].proposerDistrict,
                    'PinCode': this.insurerData[i].proposerPincode,
                    'proposerMobile': this.insurerData[i].proposerMobile,
                    'proposerEmail': this.insurerData[i].proposerEmail,
                    'FamilySize': this.insurerData[i].proposerFamilySize,
                    'StateCode': this.insurerData[i].proposerState,
                    'TownCode': this.insurerData[i].proposerCity,
                    'Age': this.insurerData[i].proposerAge,
                    'BirthDate': this.insurerData[i].proposerDob,
                    'ClientCode': this.insurerData[i].ClientCode,
                    'ContactInformation': this.insurerData[i].proposerMobile,
                    'Dependants': '',
                    'FirstName': this.insurerData[i].proposerFirstname,
                    'GenderCode': this.insurerData[i].proposerGender,
                    'GstinNumber': this.insurerData[i].proposerGst,
                    'Height': this.insurerData[i].proposerHeight,
                    'IDProofNumber': this.insurerData[i].proposerIdProofIdP,
                    'IDProofTypeCode': this.insurerData[i].proposerIdProof,
                    'LastName': this.insurerData[i].proposerLastname,
                    'LifeStyleHabits': {
                        'BeerBottle': this.insurerData[i].BeerBottle,
                        'LiquorPeg': this.insurerData[i].LiquorPeg,
                        'Pouches': this.insurerData[i].Pouches,
                        'Smoking': this.insurerData[i].Smoking,
                        'WineGlass': this.insurerData[i].WineGlass
                },
                    'MaritalStatusCode': this.insurerData[i].maritalStatus,
                    'MiddleName': this.insurerData[i].proposerMidname,
                    'NationalityCode': 'IN',
                    'OccuptionCode': this.insurerData[i].Proposeroccupation,
                    'PreviousInsurer': {
                        'InceptionDate': this.insurerData[i].InceptionDate,
                        'EndDate': this.insurerData[i].EndDate,
                        'PreviousInsurerCode': this.insurerData[i].PreviousInsurerCode,
                        'PreviousPolicyNumber': this.insurerData[i].PreviousPolicyNumber,
                        'SumInsured': this.insurerData[i].SumInsured,
                        'QualifyingAmount': this.insurerData[i].QualifyingAmount,
                        'WaivePeriod': this.insurerData[i].WaivePeriod,
                        'Remarks': this.insurerData[i].Remarks
                    },
                    'Product': {
                    'Product': {

                    }
                },
                    'ProfessionCode': this.insurerData[i].Proposeroccupation,
                    'RelationshipCode': this.insurerData[i].proposerrelationship,
                    'TitleCode': this.insurerData[i].proposerTitle,
                    'Weight': this.insurerData[i].proposerWeight
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

    //proposer Details
    proposerDetails(stepper: MatStepper, value) {
        console.log(value, 'value');
        this.proposerData = value;
        if(value.proposerDriving != ""){
            this.proposerProofNum = value.proposerDriving;
        } else if(value.proposerPassport != ""){
            this.proposerProofNum = value.proposerPassport;
        }else if(value.proposerVoter != ""){
            this.proposerProofNum = value.proposerVoter;
        } else if(value.proposerPan != ""){
            this.proposerProofNum = value.proposerPan;
        }
        this.proposer.controls['proposerIdProofIdP'].patchValue(this.proposerProofNum);
        sessionStorage.stepper1Details = '';
        sessionStorage.stepper1Details = JSON.stringify(value);
        if (this.proposer.valid) {
            if(value.proposerDriving != ""){
                this.proposerProofNum = value.proposerDriving;
            } else if(value.proposerPassport != ""){
                this.proposerProofNum = value.proposerPassport;
            }else if(value.proposerVoter != ""){
                this.proposerProofNum = value.proposerVoter;
            } else if(value.proposerPan != ""){
                this.proposerProofNum = value.proposerPan;
            }
            this.proposer.controls['proposerIdProofIdP'].patchValue(this.proposerProofNum);
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
            this.proposer.controls['previousinsurance'].setValue('');
            this.previousInsuranceStatus = true;
        } else {
            this.previousInsuranceStatus = false;
            this.proposer.controls['previousinsurance'].setValue('No');
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


    addEvent(event, title, index) {
        let dd = event.value;
        this.selectDate = event.value;
        console.log(this.selectDate);
        this.setDate = this.datepipe.transform(this.selectDate, 'dd-MM-y');
        this.setDateAge = this.datepipe.transform(this.selectDate, 'y-MM-dd');
        this.proposerAge = this.ageCalculate(this.setDateAge);
        if(title == 'proposer'){
            sessionStorage.setItem('proposerAge', this.proposerAge);
        } else if(title == 'insurer') {
            sessionStorage.setItem('insurerAge', this.proposerAge);
            this.insureArray['controls'].items['controls'][index]['controls'].proposerAge.patchValue(sessionStorage.insurerAge);
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
            this.proposer = this.fb.group({
                proposerTitle: this.getStepper1.proposerTitle,
                proposerFirstname: this.getStepper1.proposerFirstname,
                proposerLastname: this.getStepper1.proposerLastname,
                proposerMidname: this.getStepper1.proposerMidname,
                maritalStatus: this.getStepper1.maritalStatus,
                proposerDob: this.getStepper1.proposerDob,
                proposerrelationship: this.getStepper1.proposerrelationship,
                sameAsProposer: this.getStepper1.sameAsProposer,
                proposerGender: this.getStepper1.proposerGender,
                proposerAddress: this.getStepper1.proposerAddress,
                proposerAddress2: this.getStepper1.proposerAddress2,
                proposerAddress3: this.getStepper1.proposerAddress3,
                nationality: this.getStepper1.nationality,
                proposerPincode: this.getStepper1.proposerPincode,
                proposerIdProof: this.getStepper1.proposerIdProof,
                proposerIdProofIdP: this.getStepper1.proposerIdProofIdP,
                proposerPan: this.getStepper1.proposerPan,
                proposerPassport: this.getStepper1.proposerPassport,
                proposerVoter: this.getStepper1.proposerVoter,
                proposerGst: this.getStepper1.proposerGst,
                proposerDriving: this.getStepper1.proposerDriving,
                TotalPremiumAmount: this.getStepper1.TotalPremiumAmount,
                MedicalInformations: this.getStepper1.MedicalInformations,
                proposerCity: this.getStepper1.proposerCity,
                proposerState: this.getStepper1.proposerState,
                proposerCountry: this.getStepper1.proposerCountry,
                proposerCityIdP: this.getStepper1.proposerCityIdP,
                proposerStateIdP: this.getStepper1.proposerStateIdP,
                proposerCountryIdP: this.getStepper1.proposerCountryIdP,
                proposerCityIdR: this.getStepper1.proposerCityIdR,
                proposerStateIdR: this.getStepper1.proposerStateIdR,
                proposerCountryIdR: this.getStepper1.proposerCountryIdR,
                proposerDistrictIdP: this.getStepper1.proposerDistrictIdP,
                proposerDistrict: this.getStepper1.proposerDistrict,
                proposerEmail: this.getStepper1.proposerEmail,
                proposerMobile: this.getStepper1.proposerMobile,
                rolecd: this.getStepper1.rolecd,
                relationshipcd: this.getStepper1.relationshipcd,
                sameas: this.getStepper1.sameas,
            });
        }

        if (sessionStorage.stepper2Details != '' && sessionStorage.stepper2Details != undefined) {
            console.log(JSON.parse(sessionStorage.stepper2Details), 'sessionStorage.stepper1Details');
            this.getStepper2 = JSON.parse(sessionStorage.stepper2Details);
            for (let i = 0; i < this.getStepper2.items.length; i++) {
                this.insureArray['controls'].items['controls'][i]['controls'].proposerTitle.patchValue(this.getStepper2.items[i].proposerTitle);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerFirstname.patchValue(this.getStepper2.items[i].proposerFirstname);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerGender.patchValue(this.getStepper2.items[i].proposerGender);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerAge.patchValue(this.getStepper2.items[i].proposerAge);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerLastname.patchValue(this.getStepper2.items[i].proposerLastname);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerMobile.patchValue(this.getStepper2.items[i].proposerMobile);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerDob.patchValue(this.getStepper2.items[i].proposerDob);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerrelationship.patchValue(this.getStepper2.items[i].proposerrelationship);
                this.insureArray['controls'].items['controls'][i]['controls'].maritalStatus.patchValue(this.getStepper2.items[i].maritalStatus);
                this.insureArray['controls'].items['controls'][i]['controls'].sameas.patchValue(this.getStepper2.items[i].sameas);
                this.insureArray['controls'].items['controls'][i]['controls'].sameAsProposer.patchValue(this.getStepper2.items[i].sameAsProposer);
                this.insureArray['controls'].items['controls'][i]['controls'].rolecd.patchValue(this.getStepper2.items[i].rolecd);
                this.insureArray['controls'].items['controls'][i]['controls'].SumInsured.patchValue(this.getStepper2.items[i].SumInsured);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerAnnualIncome.patchValue(this.getStepper2.items[i].proposerAnnualIncome);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerFamilySize.patchValue(this.getStepper2.items[i].proposerFamilySize);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerHeight.patchValue(this.getStepper2.items[i].proposerHeight);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerWeight.patchValue(this.getStepper2.items[i].proposerWeight);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerEmail.patchValue(this.getStepper2.items[i].proposerEmail);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerIdProof.patchValue(this.getStepper2.items[i].proposerIdProof);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerIdProofIdP.patchValue(this.getStepper2.items[i].proposerIdProofIdP);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerPan.patchValue(this.getStepper2.items[i].proposerPan);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerDriving.patchValue(this.getStepper2.items[i].proposerDriving);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerPassport.patchValue(this.getStepper2.items[i].proposerPassport);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerVoter.patchValue(this.getStepper2.items[i].proposerVoter);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerGst.patchValue(this.getStepper2.items[i].proposerGst);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerAddress.patchValue(this.getStepper2.items[i].proposerAddress);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerAddress2.patchValue(this.getStepper2.items[i].proposerAddress2);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerAddress3.patchValue(this.getStepper2.items[i].proposerAddress3);
                this.insureArray['controls'].items['controls'][i]['controls'].nationality.patchValue(this.getStepper2.items[i].nationality);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerPincode.patchValue(this.getStepper2.items[i].proposerPincode);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerCity.patchValue(this.getStepper2.items[i].proposerCity);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerCountry.patchValue(this.getStepper2.items[i].proposerCountry);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerState.patchValue(this.getStepper2.items[i].proposerState);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerDistrict.patchValue(this.getStepper2.items[i].proposerDistrict);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerCityIdP.patchValue(this.getStepper2.items[i].proposerCityIdP);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerStateIdP.patchValue(this.getStepper2.items[i].proposerStateIdP);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerCountryIdP.patchValue(this.getStepper2.items[i].proposerCountryIdP);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerDistrictIdP.patchValue(this.getStepper2.items[i].proposerDistrictIdP);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerAnnualIncome.patchValue(this.getStepper2.items[i].proposerAnnualIncome);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerFamilySize.patchValue(this.getStepper2.items[i].proposerFamilySize);
                this.insureArray['controls'].items['controls'][i]['controls'].LiquorPeg.patchValue(this.getStepper2.items[i].LiquorPeg);
                this.insureArray['controls'].items['controls'][i]['controls'].Smoking.patchValue(this.getStepper2.items[i].Smoking);
                this.insureArray['controls'].items['controls'][i]['controls'].WineGlass.patchValue(this.getStepper2.items[i].WineGlass);
                this.insureArray['controls'].items['controls'][i]['controls'].BeerBottle.patchValue(this.getStepper2.items[i].BeerBottle);
                this.insureArray['controls'].items['controls'][i]['controls'].Pouches.patchValue(this.getStepper2.items[i].Pouches);
                this.insureArray['controls'].items['controls'][i]['controls'].PolicyStartDate.patchValue(this.getStepper2.items[i].PolicyStartDate);
                this.insureArray['controls'].items['controls'][i]['controls'].PolicyEndDate.patchValue(this.getStepper2.items[i].PolicyEndDate);
                this.insureArray['controls'].items['controls'][i]['controls'].PreviousInsurer.patchValue(this.getStepper2.items[i].PreviousInsurer);
                this.insureArray['controls'].items['controls'][i]['controls'].PreviousPolicyNumber.patchValue(this.getStepper2.items[i].PreviousPolicyNumber);
                this.insureArray['controls'].items['controls'][i]['controls'].SumInsured.patchValue(this.getStepper2.items[i].SumInsured);
                this.insureArray['controls'].items['controls'][i]['controls'].QualifyingAmount.patchValue(this.getStepper2.items[i].QualifyingAmount);
                this.insureArray['controls'].items['controls'][i]['controls'].WaivePeriod.patchValue(this.getStepper2.items[i].WaivePeriod);
                this.insureArray['controls'].items['controls'][i]['controls'].Remarks.patchValue(this.getStepper2.items[i].Remarks);
                this.insureArray['controls'].items['controls'][i]['controls'].Proposeroccupation.patchValue(this.getStepper2.items[i].Proposeroccupation);
            }
        }

        if (sessionStorage.nomineeData != '' && sessionStorage.nomineeData != undefined) {
            console.log(JSON.parse(sessionStorage.nomineeData), 'sessionStorage.stepper1Details');
            this.getNomineeData = JSON.parse(sessionStorage.nomineeData);
            this.nomineeDetails = this.fb.group({
                nomineeName: this.getNomineeData.nomineeName,
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
                nomineeTitle: this.getNomineeData.nomineeTitle,
                nomineeDob: this.getNomineeData.nomineeDob,
            });
        }


        for (let i = 0; i < this.getStepper2.items.length; i++) {

            if (this.getStepper2.items[i].proposerPincode != '') {
                this.insureArray['controls'].items['controls'][i]['controls'].pCityHide.patchValue(true);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerCity.patchValue(this.getStepper2.items[i].proposerCity);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerPincode.patchValue(this.getStepper2.items[i].proposerPincode);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerState.patchValue(this.getStepper2.items[i].proposerState);

                if (this.getStepper2.items[0].sameAsProposer) {
                    this.insureArray['controls'].items['controls'][0]['controls'].pCityHide.patchValue(true);
                    this.insureArray['controls'].items['controls'][0]['controls'].cityHide.patchValue(true);
                }
                if (this.getStepper2.items[i].sameas) {
                    this.insureArray['controls'].items['controls'][i]['controls'].pCityHide.patchValue(this.getStepper2.items[i].sameas);
                    this.insureArray['controls'].items['controls'][i]['controls'].residencePincode.patchValue(this.getStepper2.items[i].proposerPincode);
                    this.insureArray['controls'].items['controls'][i]['controls'].residenceState.patchValue(this.getStepper2.items[i].proposerState);
                    this.insureArray['controls'].items['controls'][i]['controls'].residenceCity.patchValue(this.getStepper2.items[i].proposerCity);
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
            this.insureArray['controls'].items['controls'][0]['controls'].proposerTitle.patchValue(this.proposer.controls['proposerTitle'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerFirstname.patchValue(this.proposer.controls['proposerFirstname'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerMidname.patchValue(this.proposer.controls['proposerMidname'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerLastname.patchValue(this.proposer.controls['proposerLastname'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerDob.patchValue(this.proposer.controls['proposerDob'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].maritalStatus.patchValue(this.proposer.controls['maritalStatus'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerGender.patchValue(this.proposer.controls['proposerGender'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].sameas.patchValue(this.proposer.controls['sameas'].value);



        } else {
            this.insureArray['controls'].items['controls'][0]['controls'].cityHide.patchValue(false);
            this.insureArray['controls'].items['controls'][0]['controls'].pCityHide.patchValue(true);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerTitle.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerFirstname.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerMidname.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerLastname.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerDob.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].maritalStatus.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerGender.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].sameas.patchValue('');


        }

    }

    //Create Appollo-Munich Details
    proposal() {

      let clientData = this.totalInsureDetails.slice(1);
      console.log(clientData, 'clientDataclientDataclientDataclientData');

        const data  = {
            'enquiry_id': this.enquiryId,
            'proposal_id': this.proposalId,
            'user_id' : this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
            'ProposalCaptureServiceRequest': {
                'Prospect': {
                    'Application': {
                        'NomineeAddress': {
                            'AddressLine1': this.nomineeData.nomineeAddress,
                            'CountryCode': this.nomineeData.nomineeCountry,
                            'District': this.nomineeData.nomineeDistrict,
                            'PinCode': this.nomineeData.nomineePincode,
                            'StateCode': this.nomineeData.nomineeState,
                            'TownCode': this.nomineeData.nomineeCity
                        },
                        'NomineeName': this.nomineeData.nomineeName,
                        'NomineeTitleCode': this.nomineeData.nomineeTitle,
                        'RelationToNomineeCode': this.nomineeData.nomineeRelationship,
                        'Proposer': {
                            'Address': {
                                'Address': {
                                    'AddressLine1': this.proposerData.proposerAddress,
                                    'AddressLine2': this.proposerData.proposerAddress2,
                                    'AddressLine3': this.proposerData.proposerAddress3,
                                    'CountryCode': this.proposerData.proposerCountry,
                                    'District': this.proposerData.proposerDistrict,
                                    'PinCode': this.proposerData.proposerPincode,
                                    'StateCode': this.proposerData.proposerState,
                                    'TownCode': this.proposerData.proposerCity
                                }
                            },
                            'BirthDate': this.proposerData.proposerDob,
                            'ClientCode': this.proposerData.ClientCode,
                            'ContactInformation': {
                                'ContactNumber': {
                                    'ContactNumber': {
                                        'Number': this.proposerData.proposerMobile
                                    }
                                },
                                'Email': this.proposerData.proposerEmail
                            },
                            'FirstName': this.proposerData.proposerFirstname,
                            'GenderCode': this.proposerData.proposerGender,
                            'GstinNumber': this.proposerData.proposerGst,
                            'IDProofNumber': this.proposerData.proposerIdProofIdP,
                            'IDProofTypeCode': this.proposerData.proposerIdProof,
                            'LastName': this.proposerData.proposerLastname,
                            'MaritalStatusCode': this.proposerData.maritalStatus,
                            'MiddleName': this.proposerData.proposerMidname,
                            'RelationshipCode': this.proposerData.proposerrelationship
                        }
                    },

                    'Client': {
                        'Address': {
                            'Address': {
                                'AddressLine1': this.totalInsureDetails[0].AddressLine1,
                                'AddressLine2': this.totalInsureDetails[0].AddressLine2,
                                'AddressLine3': this.totalInsureDetails[0].AddressLine3,
                                'CountryCode': 'IN',
                                'District': this.totalInsureDetails[0].District,
                                'PinCode': this.totalInsureDetails[0].PinCode,
                                'StateCode': this.totalInsureDetails[0].StateCode,
                                'TownCode': this.totalInsureDetails[0].TownCode
                            }
                        },
                        'Age': this.totalInsureDetails[0].Age,
                        'AnnualIncome': this.totalInsureDetails[0].AnnualIncome,
                        'BirthDate': this.totalInsureDetails[0].BirthDate,
                        'ClientCode': 'PolicyHolder',
                        'ContactInformation': {
                            'ContactNumber': {
                                'ContactNumber': {
                                    'Number': this.totalInsureDetails[0].proposerMobile
                                }
                            },
                            'Email': this.totalInsureDetails[0].proposerEmail
                        },
                        'Dependants': {
                                'Client' : clientData
                            },
                        'FamilySize': this.totalInsureDetails[0].FamilySize,
                        'FirstName': this.totalInsureDetails[0].FirstName,
                        'GenderCode': this.totalInsureDetails[0].GenderCode,
                        'GstinNumber': this.totalInsureDetails[0].GstinNumber,
                        'Height': this.totalInsureDetails[0].Height,
                        'IDProofNumber': this.totalInsureDetails[0].IDProofNumber,
                        'IDProofTypeCode': this.totalInsureDetails[0].IDProofTypeCode,
                        'LastName': this.totalInsureDetails[0].LastName,
                        'MaritalStatusCode': this.totalInsureDetails[0].MaritalStatusCode,
                        'MiddleName': this.totalInsureDetails[0].MiddleName,
                        'NationalityCode': this.totalInsureDetails[0].NationalityCode,
                        'OccuptionCode': this.totalInsureDetails[0].OccuptionCode,
                        'PreviousInsurer': {
                            'PreviousInsurer': {
                                'InceptionDate': this.totalInsureDetails[0].InceptionDate,
                                'EndDate': this.totalInsureDetails[0].EndDate,
                                'PreviousInsurerCode': this.totalInsureDetails[0].PreviousInsurerCode,
                                'PreviousPolicyNumber': this.totalInsureDetails[0].PreviousPolicyNumber,
                                'SumInsured': this.totalInsureDetails[0].SumInsured,
                                'QualifyingAmount': this.totalInsureDetails[0].QualifyingAmount,
                                'WaivePeriod': this.totalInsureDetails[0].WaivePeriod,
                                'Remarks': this.totalInsureDetails[0].Remarks
                            }
                        },
                        'LifeStyleHabits': {
                            'BeerBottle': this.totalInsureDetails[0].LifeStyleHabits.BeerBottle,
                            'LiquorPeg': this.totalInsureDetails[0].LifeStyleHabits.LiquorPeg,
                            'Pouches': this.totalInsureDetails[0].LifeStyleHabits.Pouches,
                            'Smoking': this.totalInsureDetails[0].LifeStyleHabits.Smoking,
                            'WineGlass': this.totalInsureDetails[0].LifeStyleHabits.WineGlass
                        },
                        'Product': {
                            'Product': {
                                'ClientCode': 'PolicyHolder',
                                'ProductCode': this.buyProductdetails.product_code,
                                'SumAssured': this.buyProductdetails.suminsured_amount

                            }
                        },
                        'ProfessionCode': this.totalInsureDetails[0].ProfessionCode,
                        'RelationshipCode': this.totalInsureDetails[0].RelationshipCode,
                        'TitleCode': this.totalInsureDetails[0].TitleCode,
                        'Weight': this.totalInsureDetails[0].Weight
                    },
                    'MedicalInformations': this.proposerData.MedicalInformations,
                }
            }


        };
        console.log(data, 'datadata');

        this.settings.loadingSpinner = true;
        this.proposalservice.apollomunichProposal(data).subscribe(
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
                    if(this.summaryData.InsuredDetailsList[i].RelationshipWithProposerID == this.relationshipList[j].relationship_code ) {
                        this.summaryData.InsuredDetailsList[i].relationship_proposer_name = this.relationshipList[j].relationship;
                    }
                }
            }
            for( let j=0; j < this.relationshipList.length; j++){
                if(this.summaryData.NomineeDetails.NomineeRelationshipID == this.relationshipList[j].relationship_code ) {
                    this.summaryData.NomineeDetails.relationship_proposer_name = this.relationshipList[j].relationship;
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

//Summary residence detail
    public proposalFailure(error) {
        this.settings.loadingSpinner = false;
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
        this.proposalservice.getAppolloMaritalStatus(data).subscribe(
            (successData) => {
                this.setMaritalStatusSuccess(successData);
            },
            (error) => {
                this.setMaritalStatusFailure(error);
            }
        );
    }

    public setMaritalStatusSuccess(successData) {
        if (successData.IsSuccess == true) {
            this.maritalDetail = successData.ResponseObject;
            console.log( this.maritalDetail , 'maritalDetailmaritalDetail');

        }
    }

    public setMaritalStatusFailure(error) {
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

    //IdProoofList
    IdProofList(){
        const data = {
            'platform': 'web',
            'product_id': '11',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.proposalservice.getIdProofList(data).subscribe(
            (successData) => {
                this.setIdProofListStatusSuccess(successData);
            },
            (error) => {
                this.setIdProofListStatusFailure(error);
            }
        );
    }

    public setIdProofListStatusSuccess(successData){
        console.log(successData.ResponseObject);
        this.IdProofList = successData.ResponseObject;
        console.log( this.IdProofList, 'IdProofList');
    }
    public setIdProofListStatusFailure(error){
    console.log(error);
    }

    //Appollo state
    AppolloState(){
        const data = {
            'platform': 'web',
            'product_id': '11',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.proposalservice.getAppolloState(data).subscribe(
            (successData) => {
                this.setAppolloStateSuccess(successData);
            },
            (error) => {
                this.setAppolloStateFailure(error);
            }
        );
    }

    public setAppolloStateSuccess(successData){
        console.log(successData.ResponseObject);
        this.AppolloStateList = successData.ResponseObject;
        console.log( this.AppolloStateList, 'AppolloStateList');
    }
    public setAppolloStateFailure(error){
        console.log(error);
    }



    stateChange(stateId: any, title, index){
            this.stateTitle = title;
            this.stateCode = stateId.value
            console.log(this.stateCode);
            const data = {
                'platform': 'web',
                'product_id': '11',
                'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
                'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
                'state_code': this.stateCode
            }


            this.proposalservice.getAppolloDistrict(data).subscribe(
                (successData) => {
                    this.setAppolloDistrictSuccess(successData)
                },
                (error) => {
                    this.setAppolloDistrictFailure(error);
                }
            );

            this.proposalservice.getAppolloCity(data).subscribe(
                (successData) => {
                    this.setAppolloCitySuccess(successData);
                },
                (error) => {
                    this.setAppolloCityFailure(error);
                }
            );
        }


//Appollo District
    public setAppolloDistrictSuccess(successData){
      if (this.stateTitle == 'proposer') {
          this.AppolloDistrictList = successData.ResponseObject;
      } else{
          this.nomineeAppolloDistrictList = successData.ResponseObject;
      }
    }
    public setAppolloDistrictFailure(error){
        console.log(error);
    }

    //Appollo City
    public setAppolloCitySuccess(successData){
        if (this.stateTitle == 'proposer') {
            this.AppolloCityList = successData.ResponseObject;
        }else {
            this.nomineeAppolloCityLis = successData.ResponseObject;
        }
    }
    public setAppolloCityFailure(error){
        console.log(error);
    }




//Insure State
    insureStateChange(stateId: any, title, id){
        this.stateCode = stateId.value
        console.log(this.stateCode);
        const data = {
            'platform': 'web',
            'product_id': '11',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'state_code': this.stateCode
        }
        this.proposalservice.getAppolloDistrict(data).subscribe(
            (successData) => {
                this.setInsureAppolloDistrictSuccess(successData)
            },
            (error) => {
                this.setInsureAppolloDistrictFailure(error);
            }
        );


        this.proposalservice.getAppolloCity(data).subscribe(
            (successData) => {
                this.setInsureAppolloCitySuccess(successData);
            },
            (error) => {
                this.setInsureAppolloCityFailure(error);
            }
        );
    }
//Appollo District
    public setInsureAppolloDistrictSuccess(successData){
        this.AppolloDistrictList = successData.ResponseObject;
        console.log( this.AppolloDistrictList, 'AppolloDistrictList');
    }
    public setInsureAppolloDistrictFailure(error){
        console.log(error);
    }

    //Appollo City
    public setInsureAppolloCitySuccess(successData){
        this.AppolloCityList = successData.ResponseObject;
        console.log( this.AppolloCityList, 'AppolloCityList');
    }
    public setInsureAppolloCityFailure(error){
        console.log(error);
    }

    setRelationship() {
        const data = {
            'platform': 'web',
            'product_id': '11',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.proposalservice.getAppolloRelationship(data).subscribe(
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

    setOccupationList() {
        const data = {
            'platform': 'web',
            'product_id': '11',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.proposalservice.getAppolloOccupation(data).subscribe(
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
        console.log(this.occupationList, 'occupationList');
    }

    public occupationListFailure(error) {
        console.log(error);
    }

    // setNomineeRelationship() {
    //     const data = {
    //         'platform': 'web',
    //         'product_id': '11',
    //         'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
    //         'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
    //     }
    //     this.proposalservice.getNomineeRelatioshipList(data).subscribe(
    //         (successData) => {
    //             this.setNomineeRelationshipSuccess(successData);
    //         },
    //         (error) => {
    //             this.setNomineeRelationshipFailure(error);
    //         }
    //     );
    // }
    //
    // public setNomineeRelationshipSuccess(successData) {
    //     console.log(successData.ResponseObject);
    //     this.nomineeRelationshipList = successData.ResponseObject;
    //     console.log(this.nomineeRelationshipList, 'this.nomineeRelationshipList');
    // }
    //
    // public setNomineeRelationshipFailure(error) {
    //     console.log(error);
    // }
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
            if(event.target.value == this.proposer.get('proposerMobile').value) {
                this.mobileNumber = 'Alternate number should be different from mobile number';
            } else {
                this.mobileNumber = '';
            }
        } else {
            // this.mobileNumber = 'false';
        }
        sessionStorage.mobileNumber = this.mobileNumber;
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
    districtChange(event) {

    }
}
