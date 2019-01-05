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
    public iAppolloDistrictList: any;
    public iAppolloCityList: any;
    public occupationList: any;
    public today: any;
    public declaration: boolean;
    public summaryData: any;
    public InsurePolicyholderDetails: any;
    public ProposalDetails: any;
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
    public setStatecode: any;
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
    public stateCodeId: any;
    public insurID: any;
    public dob: any;
    public minDate: any;
    public maxDate: any;
    public RediretUrlLink: any;
    public stateCode: any;
    public stateTitle: any;
    public nomineeAppolloDistrictList: any;
    public nomineeAppolloCityLis: any;
    public proposerProofNum: any;
    public smokingStatus: boolean;
    public previousInsureList: any;
    public proffessionList: any;
    public titleCodeList: any;
    public iAppolloDistrictName: any;
    public iAppolloCityName: any;
    public insurerAge: any;
    public personalhabit: boolean;
    public previousDetails: boolean;
    public dobErrorInsure: any;
    public dobErrorStartDate: any;
    public insurepersonstype: any;
    public validateprvious: boolean;
    public titleValidation: boolean;
    public IdProofListss: any;
    public agecal: any;
    public agevalidation: any;
    public arr: any;
    public getDays: any;
    public getAge: any;

  constructor(public proposalservice: ProposalService, public datepipe: DatePipe, private toastr: ToastrService, public appSettings: AppSettings, public dialog: MatDialog,
              public config: ConfigurationService, public common: CommonService, public fb: FormBuilder, public auth: AuthService, public http: HttpClient, @Inject(LOCALE_ID) private locale: string) {
      const minDate = new Date();
      this.minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
      let today  = new Date();
      this.today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      // this.minDate = this.selectDate;
      this.arr = [];

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
      this.personalhabit = false;
      this.previousDetails = false;
      this.titleValidation = true;
      this.proposerInsureData = [];
      this.totalInsureDetails = [];
      this.questions_list = [];
    this.validateprvious = false;
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
          proposerrelationship: '1',
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
          proposerCountry: 'IN',
          proposerState: ['', Validators.required],
          proposerDistrict: '',
          proposerCityIdP: '',
          proposerStateIdP: '',
          proposerCountryIdP: '',
          proposerDistrictIdP: '',
          MedicalInformations: '',
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
          nomineeCountry: 'IN',
          nationality: 'IN',
          nomineeDistrict: '',
          nomineeDistrictId: '',
          nomineeRelationship: ''

      });
      this.TitleCodeStatus();

  }
    ngOnInit() {
        this.buyProductdetails = JSON.parse(sessionStorage.buyProductdetails);
        this.enquiryId = sessionStorage.enquiryId;
        this.groupName = sessionStorage.groupName;
        this.getFamilyDetails = JSON.parse(sessionStorage.changedTabDetails);
        this.insurePersons = this.getFamilyDetails.family_members;
        // for(let i =0; i< this.insurePersons.length; i++){
        //     this.insurepersonstype = this.insurePersons[i].type;
        // }
        this.setRelationship();
        // this.setNomineeRelationship();
        this.maritalStatus();
        this.IdProofList();
        this.AppolloState();
        this.setOccupationList();
        this.getPreviousInsure();
        this.getProffession();
        this.insureArray = this.fb.group({
            items: this.fb.array([])
        });
        for (let i = 0; i < this.getFamilyDetails.family_members.length; i++) {
            this.items = this.insureArray.get('items') as FormArray;
            this.items.push(this.initItemRows());
            this.insureArray['controls'].items['controls'][i]['controls'].type.setValue(this.getFamilyDetails.family_members[i].type);
        }

        this.sessionData();
        this.insureArray['controls'].items['controls'][0]['controls'].set_validator.patchValue(true);
        if (this.insureArray['controls'].items['controls'][1]['controls'].type.value == 'Spouse') {
            this.insureArray['controls'].items['controls'][1]['controls'].set_validator.patchValue(true);
        }


        // this.setDate = Date.now();
        // this.setDate = this.datepipe.transform(this.setDate, 'dd-MM-y');
    }

    changeGender() {
        if (this.proposer.controls['proposerTitle'].value == 'MR'|| this.proposer.controls['proposerTitle'].value == 'MASTER'){
            this.proposer.controls['proposerGender'].patchValue('Male');
        } else {
            this.proposer.controls['proposerGender'].patchValue('Female');
        }
    }
    insureChangeGender(index) {
        if (this.insureArray['controls'].items['controls'][index]['controls'].proposerTitle.value == 'MR' ||
            this.insureArray['controls'].items['controls'][index]['controls'].proposerTitle.value == 'MASTER') {
            this.insureArray['controls'].items['controls'][index]['controls'].proposerGender.patchValue('Male');
            this.titleValidation = true;
        } else if (this.insureArray['controls'].items['controls'][index]['controls'].proposerTitle.value == "BABY"  || this.insureArray['controls'].items['controls'][index]['controls'].proposerTitle.value == "BABY") {
            this.titleValidation = false;
            this.insureArray['controls'].items['controls'][index]['controls'].insurerDobError.value = '';
        } else {
            this.insureArray['controls'].items['controls'][index]['controls'].proposerGender.patchValue('Female');
            this.titleValidation = true;
        }
        sessionStorage.titleValidation =  this.titleValidation;
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
                proposerTitle: '',
                proposerFirstname: '',
                proposerLastname: '',
                proposerMidname: '',
                proposerDob: '',
                proposerGender: '',
                proposerEmail: ['', Validators.compose([Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
                proposerMobile: ['', Validators.compose([Validators.pattern('[6789][0-9]{9}')])],
                proposerAge: '',
                maritalStatus: '',
                proposerIdProof: '',
                proposerIdProofIdP: '',
                proposerPan: ['', Validators.compose([ Validators.minLength(10)])],
                proposerDriving: '',
                proposerPassport: '',
                proposerVoter: ['', Validators.compose([ Validators.minLength(10)])],
                proposerGst: ['', Validators.compose([Validators.minLength(15)])],
                proposerAddress: '',
                proposerAddress2: '',
                proposerAddress3: '',
                nationality: 'IN',
                proposerPincode: '',
                proposerCity: '',
                proposerCountry: 'IN',
                proposerState: '',
                proposerDistrict: '',
                proposerCityIdP: '',
                proposerStateIdP: '',
                proposerCountryIdP: '',
                proposerDistrictIdP: '',
                proposerAnnualIncome: '',
                proposerFamilySize: ['', Validators.compose([Validators.maxLength(2)])],
                proposerHeight: '',
                proposerWeight: '',
                LiquorPeg: 0,
                LiquorPegStatus: '',
                Smoking: 0,
                SmokingStatus: '',
                WineGlass: 0,
                WineGlassStatus: '',
                BeerBottle: 0,
                BeerBottleStatus: '',
                Pouches: 0,
                PouchesStatus: '',
                PolicyStartDate: '',
                PolicyEndDate: '',
                previousInsurerStatus: 'No',
                PreviousInsurer: '',
                PreviousPolicyNumber: '',
                SumInsured: '',
                QualifyingAmount: '',
                ProffessionList: '',
                WaivePeriod: '',
                Remarks: '',
                Proposeroccupation: '',
                proposerrelationship: '',
                sameAsProposer: false,
                sameas: false,
                type: '',
                cityHide: false,
                stateHide: false,
                pCityHide: '',
                insurerDobError: '',
                insurerDobValidError: '',
                dobErrorStartDate: '',
                ins_days: '',
                ins_age: '',
                set_validator: false
            }
        );
    }





    //Insure Details
    AppolloInsureDetails(stepper: MatStepper, id, value, key) {
        sessionStorage.stepper2Details = '';
        sessionStorage.stepper2Details = JSON.stringify(value);
        if (this.insureArray.valid) {
            this.insurerData = value.items;
            console.log( this.insurerData, ' this.insurerData');
            for(let i = 0; i < this.insurerData.length; i++) {
                if (this.insureArray['controls'].items['controls'][i]['controls'].proposerDriving.value != "") {
                    this.insureArray['controls'].items['controls'][i]['controls'].proposerIdProofIdP.patchValue(this.insureArray['controls'].items['controls'][i]['controls'].proposerDriving.value);
                } else if (this.insureArray['controls'].items['controls'][i]['controls'].proposerPassport.value != "") {
                    this.insureArray['controls'].items['controls'][i]['controls'].proposerIdProofIdP.patchValue(this.insureArray['controls'].items['controls'][i]['controls'].proposerPassport.value);
                } else if (this.insureArray['controls'].items['controls'][i]['controls'].proposerVoter.value != "") {
                    this.insureArray['controls'].items['controls'][i]['controls'].proposerIdProofIdP.patchValue(this.insureArray['controls'].items['controls'][i]['controls'].proposerVoter.value);
                } else if (this.insureArray['controls'].items['controls'][i]['controls'].proposerPan.value != "") {
                    this.insureArray['controls'].items['controls'][i]['controls'].proposerIdProofIdP.patchValue(this.insureArray['controls'].items['controls'][i]['controls'].proposerPan.value);
                }
            }
            console.log(this.insurerData, 'pppp');

            this.totalInsureDetails = [];
            for (let i = 0; i < this.insurePersons.length; i++) {
                this.totalInsureDetails.push({
                    'Address': {
                        'Address': {
                    'AddressLine1': this.insurerData[i].proposerAddress,
                    'AddressLine2': this.insurerData[i].proposerAddress2,
                    'AddressLine3': this.insurerData[i].proposerAddress3,
                    'CountryCode': this.insurerData[i].proposerCountry,
                    'District': this.insurerData[i].proposerDistrict,
                    'PinCode': this.insurerData[i].proposerPincode,
                    'TownCode': this.insurerData[i].proposerCity,
                    'StateCode': this.insurerData[i].proposerStateIdP,
                        }
                    },
                    'proposerMobile': this.insurerData[i].proposerMobile,
                    'FamilySize': this.insurerData[i].proposerFamilySize,
                    'Age': this.insurerData[i].proposerAge,
                    'BirthDate': this.insurerData[i].proposerDob,
                    'ClientCode': this.insurerData[i].ClientCode,
                    "ContactInformation": {
                        "ContactNumber": {
                            "ContactNumber": {
                                "Number": this.insurerData[i].proposerMobile
                            }
                        },
                        "Email": this.insurerData[i].proposerEmail,
                    },
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
                        'InceptionDate': this.insurerData[i].PolicyStartDate,
                        'EndDate': this.insurerData[i].PolicyEndDate,
                        'PreviousInsurerCode': this.insurerData[i].PreviousInsurer,
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
                    'ProfessionCode': this.insurerData[i].ProffessionList,
                    'RelationshipCode': this.insurerData[i].proposerrelationship,
                    'TitleCode': this.insurerData[i].proposerTitle,
                    'Weight': this.insurerData[i].proposerWeight
                });
            }
            let ageValidate = [];
            for (let i = 0; i< this.insurerData.length; i++){
                if (this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.value  != '') {
                    ageValidate.push(1);

                } else{
                    ageValidate.push(0);
                }
            }
            if(!ageValidate.includes(1)){
                if (this.titleValidation) {
                    stepper.next();
                    this.topScroll();
                    // if (sessionStorage.proposerAge >= 18) {
                    //     stepper.next();
                    //     this.topScroll();
                    // } else {
                    //     this.toastr.error('Insurer age should be 18 or above');
                    // }
                } else if (this.titleValidation == false) {
                    stepper.next();
                    this.topScroll();

                }


            }

        }
    }


    pInsureStatus(title: any, id){
console.log(this.insureArray, 'pppp');
      if(title.value == 'Yes') {
        this.previousDetails = true;
        this.validateprvious = true;
          this.items.at(id).controls.PreviousPolicyNumber.setValidators([Validators.required]);
          this.items.at(id).controls.PreviousInsurer.setValidators([Validators.required]);
          this.items.at(id).controls.SumInsured.setValidators([Validators.required]);
      } else {
          this.previousDetails = false;
          this.validateprvious = false;
          this.insureArray['controls'].items['controls'][id]['controls'].PreviousPolicyNumber.patchValue('');
          this.insureArray['controls'].items['controls'][id]['controls'].PreviousInsurer.patchValue('');
          this.insureArray['controls'].items['controls'][id]['controls'].SumInsured.patchValue('');
          this.insureArray['controls'].items['controls'][id]['controls'].PolicyStartDate.patchValue('');
          this.insureArray['controls'].items['controls'][id]['controls'].PolicyEndDate.patchValue('');
          this.insureArray['controls'].items['controls'][id]['controls'].WaivePeriod.patchValue('');
          this.insureArray['controls'].items['controls'][id]['controls'].QualifyingAmount.patchValue('');
          this.insureArray['controls'].items['controls'][id]['controls'].Remarks.patchValue('');
          this.items.at(id).controls.PreviousPolicyNumber.setValidators(null);
          this.items.at(id).controls.PreviousInsurer.setValidators(null);
          this.items.at(id).controls.SumInsured.setValidators(null);
      }
        this.items.at(id).controls.PreviousPolicyNumber.updateValueAndValidity();
        this.items.at(id).controls.PreviousInsurer.updateValueAndValidity();
        this.items.at(id).controls.SumInsured.updateValueAndValidity();



}


    changeIdproof(title){
        if(title == 'proposer') {
            this.proposer.controls['proposerDriving'].patchValue('');
            this.proposer.controls['proposerPassport'].patchValue('');
            this.proposer.controls['proposerVoter'].patchValue('');
            this.proposer.controls['proposerPan'].patchValue('');
        } else if(title == 'insurer'){
            for(let i = 0; i < this.insurePersons.length; i++) {
                this.insureArray['controls'].items['controls'][i]['controls'].proposerDriving.patchValue('');
                this.insureArray['controls'].items['controls'][i]['controls'].proposerPassport.patchValue('');
                this.insureArray['controls'].items['controls'][i]['controls'].proposerVoter.patchValue('');
                this.insureArray['controls'].items['controls'][i]['controls'].proposerPan.patchValue('');
            }
        }
    }



    //Nominee Details
    religareNomineeDetails(stepper: MatStepper, value) {
        this.lastStepper = stepper;
        sessionStorage.nomineeData = '';
        sessionStorage.nomineeData = JSON.stringify(value);
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
        this.proposerData = value;
        console.log(this.proposerData,   this.proposerData);
        if(value.proposerDriving != ""){
            this.proposerProofNum = value.proposerDriving;
            this.proposer.controls['proposerIdProofIdP'].patchValue(this.proposerProofNum);
        } else if(value.proposerPassport != ""){
            this.proposerProofNum = value.proposerPassport;
            this.proposer.controls['proposerIdProofIdP'].patchValue(this.proposerProofNum);

        }else if(value.proposerVoter != ""){
            this.proposerProofNum = value.proposerVoter;
            this.proposer.controls['proposerIdProofIdP'].patchValue(this.proposerProofNum);

        } else if(value.proposerPan != ""){
            this.proposerProofNum = value.proposerPan;
            this.proposer.controls['proposerIdProofIdP'].patchValue(this.proposerProofNum);

        }
        sessionStorage.stepper1Details = '';
        sessionStorage.stepper1Details = JSON.stringify(value);
        if (this.proposer.valid) {
            if (sessionStorage.proposerAge >= 18) {
                if (this.mobileNumber == '' || this.mobileNumber == 'true'){
                    stepper.next();
                    this.topScroll();
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
            const pattern = /[0-9]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }

    selectHabitat(value: any, id, key){
      if(key == 'Smoking' && value.checked) {
          this.personalhabit = true;
          this.insureArray['controls'].items['controls'][id]['controls'].Smoking.patchValue('');
      } else if(key == 'Smoking' && !value.checked){
          this.personalhabit = false;
          this.insureArray['controls'].items['controls'][id]['controls'].Smoking.patchValue(0);
      }
      if (key == 'Pouches' && value.checked) {
          this.personalhabit = true;
          this.insureArray['controls'].items['controls'][id]['controls'].Pouches.patchValue('');
        } else if(key == 'Pouches' && !value.checked){
          this.personalhabit = false;
          this.insureArray['controls'].items['controls'][id]['controls'].Pouches.patchValue(0);
        }
        if (key == 'Liquor' && value.checked) {
            this.personalhabit = true;
            this.insureArray['controls'].items['controls'][id]['controls'].LiquorPeg.patchValue('');
        } else if(key == 'Liquor' && !value.checked){
            this.personalhabit = false;
            this.insureArray['controls'].items['controls'][id]['controls'].LiquorPeg.patchValue(0);
        }

        if (key == 'Wine' && value.checked) {
            this.personalhabit = true;
            this.insureArray['controls'].items['controls'][id]['controls'].WineGlass.patchValue('');
        } else if(key == 'Wine' && !value.checked){
            this.personalhabit = false;
            this.insureArray['controls'].items['controls'][id]['controls'].WineGlass.patchValue(0);
        }

        if (key == 'Beer' && value.checked) {
            this.personalhabit = true;
            this.insureArray['controls'].items['controls'][id]['controls'].BeerBottle.patchValue('');
        } else if(key == 'Beer' && !value.checked){
            this.personalhabit = false;
            this.insureArray['controls'].items['controls'][id]['controls'].BeerBottle.patchValue(0);
        }
    }


    // addEvent(event, index, type, title) {
    //     let dd = event.value;
    //     this.selectDate = event.value;
    //     this.minDate = this.selectDate;
    //     this.setDate = this.datepipe.transform(this.selectDate, 'dd-MM-y');
    //     this.setDateAge = this.datepipe.transform(this.selectDate, 'y-MM-dd');
    //     let age = this.ageCalculate(this.setDateAge);
    //     this.agevalidation = age;
    //     console.log(  this.agevalidation ,'  this.agevalidation   this.agevalidation ');
    //     let days = this.DobDaysCalculate(this.setDateAge);
    //     this.proposerAge = age;
    //     if(title == 'proposer'){
    //         sessionStorage.proposerAge = this.proposerAge;
    //         sessionStorage.setItem('proposerAge', this.proposerAge);
    //     } else if(title == 'insurer') {
    //         sessionStorage.setItem('insurerAge', this.proposerAge);
    //         this.insureArray['controls'].items['controls'][index]['controls'].proposerAge.patchValue(sessionStorage.insurerAge);
    //         this.insureArray['controls'].items['controls'][index]['controls'].ins_age.patchValue(age);
    //         this.insureArray['controls'].items['controls'][index]['controls'].ins_days.patchValue(days);
    //         if((this.insureArray['controls'].items['controls'][index]['controls'].ins_age.value >= 25 || this.insureArray['controls'].items['controls'][index]['controls'].ins_days.value < 91)  && (type == 'Son' || type == 'Daughter' )) {
    //             this.insureArray['controls'].items['controls'][index]['controls'].insurerDobError.patchValue(' Age between 91 days to 25 years');
    //         } else if((this.insureArray['controls'].items['controls'][index]['controls'].ins_age.value <= 25 || this.insureArray['controls'].items['controls'][index]['controls'].ins_days.value > 91) && (type == 'Son' || type == 'Daughter' ))  {
    //             this.insureArray['controls'].items['controls'][index]['controls'].insurerDobError.patchValue('');
    //         } else{
    //             if(this.insureArray['controls'].items['controls'][index]['controls'].ins_age.value <= 18) {
    //                 this.insureArray['controls'].items['controls'][index]['controls'].insurerDobError.patchValue(' Age between 18 above');
    //             } else if(this.insureArray['controls'].items['controls'][index]['controls'].ins_age.value >= 18)  {
    //                 this.insureArray['controls'].items['controls'][index]['controls'].insurerDobError.patchValue('');
    //             }
    //         }
    //     }
    //     if (event.value != null) {
    //         let selectedDate = '';
    //         let dob = '';
    //         if (typeof event.value._i == 'string') {
    //             const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
    //             if (pattern.test(event.value._i) && event.value._i.length == 10) {
    //                 this.dobError = '';
    //             } else {
    //                 this.dobError = 'Enter Valid Date';
    //             }
    //             selectedDate = event.value._i;
    //
    //             let dob = this.datepipe.transform(event.value, 'y-MM-dd');
    //             if (selectedDate.length == 10) {
    //                 if (title == 'proposer') {
    //                     this.dobError = '';
    //                     this.proposer.controls['proposerDob'].patchValue(dob);
    //                     this.ageCalculate(dob);
    //
    //                 } else if (title == 'insurer') {
    //                     this.dobErrorInsure = '';
    //                     this.insureArray['controls'].items['controls'][index]['controls'].proposerDob.patchValue(dob);
    //                     this.ageCalculate(dob);
    //                 } else if(title == 'startDate'){
    //                     this.dobErrorStartDate = '';
    //                     this.insureArray['controls'].items['controls'][index]['controls'].PolicyStartDate.patchValue(dob);
    //                     this.ageCalculate(dob);
    //                 }
    //             }
    //         } else if (typeof event.value._i == 'object') {
    //             dob = this.datepipe.transform(event.value, 'y-MM-dd');
    //             if (dob.length == 10) {
    //                 if (title == 'insurer') {
    //                     this.dobErrorInsure = '';
    //                     this.insureArray['controls'].items['controls'][index]['controls'].proposerDob.patchValue(dob);
    //                     this.ageCalculate(dob);
    //                 } else if(title == 'startDate'){
    //                     this.dobErrorStartDate = '';
    //                     this.insureArray['controls'].items['controls'][index]['controls'].PolicyStartDate.patchValue(dob);
    //                     this.ageCalculate(dob);
    //                 } else {
    //                     this.dobError = '';
    //                     this.proposer.controls['proposerDob'].patchValue(dob);
    //                     this.ageCalculate(this.datepipe.transform(event.value, 'y-MM-dd'));
    //
    //                 }
    //             }
    //
    //             this.dobError = '';
    //             let date = event.value._i.date;
    //             if (date.toString().length == 1) {
    //                 date = '0' + date;
    //             }
    //             let month = (parseInt(event.value._i.month) + 1).toString();
    //
    //             if (month.length == 1) {
    //                 month = '0' + month;
    //             }
    //             let year = event.value._i.year;
    //             this.dob = date + '-' + month + '-' + year;
    //         }
    //     }
    //
    // }

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
                    sessionStorage.proposerAge = this.proposerAge;

                }
                this.dobError = '';
            }

        }
    }




    addEventInsurer(event,  i, type) {

        if (event.value != null) {
            let selectedDate = '';
            let dob = '';
            this.getAge = '';
            this.getDays;
            if (typeof event.value._i == 'string') {
                const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
                if (pattern.test(event.value._i) && event.value._i.length == 10) {
                    this.insureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
                } else {
                    this.insureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('Enter Valid DOB');
                }
                selectedDate = event.value._i;
                dob = this.datepipe.transform(event.value, 'y-MM-dd');

                if (selectedDate.length == 10) {

                    if (type == 'startDate') {
                        this.insureArray['controls'].items['controls'][i]['controls'].dobErrorStartDate.patchValue('');
                        this.insureArray['controls'].items['controls'][i]['controls'].PolicyStartDate.patchValue(dob);
                    } else {
                        this.getAge = this.ageCalculate(dob);
                        this.getDays = this.ageCalculateInsurer(dob);
                        this.insureArray['controls'].items['controls'][i]['controls'].proposerAge.patchValue(this.getAge);
                        this.insureArray['controls'].items['controls'][i]['controls'].proposerDob.patchValue(dob);

                    }

                } else {
                    if (type == 'startDate') {
                        this.insureArray['controls'].items['controls'][i]['controls'].dobErrorStartDate.patchValue('Enter Valid Date');
                    } else {
                        this.insureArray['controls'].items['controls'][i]['controls'].proposerAge.patchValue('');
                    }

                }
            }else if (typeof event.value._i == 'object') {

                dob = this.datepipe.transform(event.value, 'y-MM-dd');

                if (dob.length == 10) {
                    if (type == 'startDate') {
                        this.insureArray['controls'].items['controls'][i]['controls'].PolicyStartDate.patchValue(dob);
                        this.insureArray['controls'].items['controls'][i]['controls'].dobErrorStartDate.patchValue('');
                    } else {
                        this.getAge = this.ageCalculate(dob);
                        this.getDays = this.ageCalculateInsurer(dob);
                        this.insureArray['controls'].items['controls'][i]['controls'].proposerDob.patchValue(dob);
                    }

                }

            }
            console.log(this.insureArray['controls'].items['controls'][i]['controls'].proposerDob.value, 'opopp1');
            console.log(this.datepipe.transform(this.insureArray['controls'].items['controls'][i]['controls'].proposerDob.value, 'y-MM-dd'), 'opopp23');
            let length =  this.datepipe.transform(this.insureArray['controls'].items['controls'][i]['controls'].proposerDob.value, 'y-MM-dd');
            // let length =  this.insureArray['controls'].items['controls'][i]['controls'].proposerDob.value;
            if (length.length == 10) {
                if (type == 'startDate') {
                } else {
                    this.insureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
                    this.insureArray['controls'].items['controls'][i]['controls'].ins_age.patchValue(this.getAge);
                    this.insureArray['controls'].items['controls'][i]['controls'].proposerAge.patchValue(this.getAge);
                    this.insureArray['controls'].items['controls'][i]['controls'].ins_days.patchValue(this.getDays);
                    this.ageValidation(i, type);
                }

            } else {
                if (type == 'startDate') {
                } else {
                    this.insureArray['controls'].items['controls'][i]['controls'].proposerAge.patchValue('');
                }
            }

        }

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
    ageValidation(i, type) {
      console.log(type);
      console.log(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value, 'pppp');
      console.log(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value, 'dysssss');

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


        if(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value >= 91 && this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value <= 9131 && type == 'Son')  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value <= 91 && type == 'Son')  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 91 days to 25 years');
        } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value >= 9131 && type == 'Son')  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 91 days to 25 years');
        }

        if(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value >= 91 && this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value <= 9131 && type == 'Daughter')  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value <= 91 && type == 'Daughter')  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 91 days to 25 years');
        } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value >= 9131 && type == 'Daughter')  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 91 days to 25 years');
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

    }





    getPincode(pin, title, i){
            this.pin = pin;
            this.title = title;
            this.insurID = i;
            const data = {
                'platform': 'web',
                'postalcode': this.pin
            }
            if (this.pin.length == 6) {
                this.proposalservice.getApollomunichPincode(data).subscribe(
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
            this.setStatecode = successData.ResponseObject;
            if (this.title == 'proposer') {
                this.proposer.controls['proposerState'].patchValue(this.setStatecode.state);
                this.proposer.controls['proposerStateIdP'].patchValue(this.setStatecode.state_code);
                this.stateChange(this.setStatecode.state_code, this.title);
            }
            else if (this.title == 'insure') {
                this.insureArray['controls'].items['controls'][this.insurID]['controls'].proposerState.patchValue(this.setStatecode.state);
                this.insureArray['controls'].items['controls'][this.insurID]['controls'].proposerStateIdP.patchValue(this.setStatecode.state_code);
                this.insureStateChange(this.insureArray['controls'].items['controls'][this.insurID]['controls'].proposerStateIdP.value, this.title, this.insurID);
            }
            else if (this.title == 'nominee') {

                this.nomineeDetails.controls['nomineeState'].patchValue(this.setStatecode.state);
                this.nomineeDetails.controls['nomineeStateId'].patchValue(this.setStatecode.state_code);
                this.stateChangeN(this.setStatecode.state_code, this.title);
            }
            else {
                this.toastr.error(successData.ErrorObject);

            }
        } else if (successData.IsSuccess != true) {
            this.toastr.error('Invalid Pincode');
            if (this.title == 'proposer') {
                this.proposer.controls['proposerState'].patchValue('');
                this.proposer.controls['proposerStateIdP'].patchValue('');
                this.proposer.controls['proposerDistrict'].patchValue('');
                this.proposer.controls['proposerCity'].patchValue('');
            }
            else if (this.title == 'insure') {
                this.insureArray['controls'].items['controls'][this.insurID]['controls'].proposerState.patchValue('');
                this.insureArray['controls'].items['controls'][this.insurID]['controls'].proposerStateIdP.patchValue('');

            }
            else if (this.title == 'nominee') {
                this.nomineeDetails.controls['nomineeState'].patchValue('');
                this.nomineeDetails.controls['nomineeStateId'].patchValue('');
                this.nomineeDetails.controls['nomineeDistrict'].patchValue('');
                this.nomineeDetails.controls['nomineeCity'].patchValue('');

            }
        }
    }
    public pincodeFailure(error) {
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
    topScroll() {
        document.getElementById('main-content').scrollTop = 0;
    }
    sessionData() {
        if (sessionStorage.stepper1Details != '' && sessionStorage.stepper1Details != undefined) {
            this.getStepper1 = JSON.parse(sessionStorage.stepper1Details);
            this.stateChange(this.getStepper1.proposerStateIdP, 'proposer');
            this.proposer = this.fb.group({
                proposerTitle: this.getStepper1.proposerTitle,
                proposerFirstname: this.getStepper1.proposerFirstname,
                proposerLastname: this.getStepper1.proposerLastname,
                proposerMidname: this.getStepper1.proposerMidname,
                maritalStatus: this.getStepper1.maritalStatus,
                proposerDob: new FormControl(new Date(this.getStepper1.proposerDob)),
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
            let age = this.ageCalculate(this.datepipe.transform(this.getStepper1.proposerDob, 'y-MM-dd'));
            sessionStorage.proposerAge = age;
            // this.proposer.controls['proposerDob'].pat();

        }




        if (sessionStorage.stepper2Details != '' && sessionStorage.stepper2Details != undefined) {
            this.getStepper2 = JSON.parse(sessionStorage.stepper2Details);
            console.log( this.getStepper2, ' this.getStepper2');
            // this.getPincode(this.getStepper2.items[0].proposerPincode, 'insure', 0);

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
                this.getPincode(this.getStepper2.items[i].proposerPincode, 'insure', i);

                this.insureArray['controls'].items['controls'][i]['controls'].proposerCountry.patchValue(this.getStepper2.items[i].proposerCountry);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerState.patchValue(this.getStepper2.items[i].proposerState);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerDistrict.patchValue(this.getStepper2.items[i].proposerDistrict);

                this.insureArray['controls'].items['controls'][i]['controls'].proposerCity.patchValue(this.getStepper2.items[i].proposerCity);

                this.insureArray['controls'].items['controls'][i]['controls'].proposerCityIdP.patchValue(this.getStepper2.items[i].proposerCityIdP);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerStateIdP.patchValue(this.getStepper2.items[i].proposerStateIdP);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerCountryIdP.patchValue(this.getStepper2.items[i].proposerCountryIdP);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerDistrictIdP.patchValue(this.getStepper2.items[i].proposerDistrictIdP == undefined? '' : this.getStepper2.items[i].proposerDistrictIdP);
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
                this.insureArray['controls'].items['controls'][i]['controls'].SmokingStatus.patchValue(this.getStepper2.items[i].SmokingStatus);
                this.insureArray['controls'].items['controls'][i]['controls'].LiquorPegStatus.patchValue(this.getStepper2.items[i].LiquorPegStatus);
                this.insureArray['controls'].items['controls'][i]['controls'].WineGlassStatus.patchValue(this.getStepper2.items[i].WineGlassStatus);
                this.insureArray['controls'].items['controls'][i]['controls'].PouchesStatus.patchValue(this.getStepper2.items[i].PouchesStatus);
                this.insureArray['controls'].items['controls'][i]['controls'].BeerBottleStatus.patchValue(this.getStepper2.items[i].BeerBottleStatus);
                this.insureArray['controls'].items['controls'][i]['controls'].previousInsurerStatus.patchValue(this.getStepper2.items[i].previousInsurerStatus);
                this.insureArray['controls'].items['controls'][i]['controls'].ProffessionList.patchValue(this.getStepper2.items[i].ProffessionList);
                this.insureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue(this.getStepper2.items[i].insurerDobValidError);
                this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue(this.getStepper2.items[i].insurerDobError);
                this.insureArray['controls'].items['controls'][i]['controls'].dobErrorStartDate.patchValue(this.getStepper2.items[i].dobErrorStartDate);
                this.insureArray['controls'].items['controls'][i]['controls'].ins_days.patchValue(this.getStepper2.items[i].ins_days);
                this.insureArray['controls'].items['controls'][i]['controls'].ins_age.patchValue(this.getStepper2.items[i].ins_age);
                this.insureArray['controls'].items['controls'][i]['controls'].cityHide.patchValue(true);
                this.insureArray['controls'].items['controls'][i]['controls'].stateHide.patchValue(true);

            }


        }

        for (let i = 0; i < this.insurePersons.length; i++) {
            if (this.insureArray['controls'].items['controls'][i]['controls'].previousInsurerStatus.value == "Yes") {

                this.items.at(i).controls.PreviousPolicyNumber.setValidators([Validators.required]);
                this.items.at(i).controls.PreviousInsurer.setValidators([Validators.required]);
                this.items.at(i).controls.SumInsured.setValidators([Validators.required]);
            } else if(this.insureArray['controls'].items['controls'][i]['controls'].previousInsurerStatus.value == "No"){

                this.items.at(i).controls.PreviousPolicyNumber.setValidators(null);
                this.items.at(i).controls.PreviousInsurer.setValidators(null);
                this.items.at(i).controls.SumInsured.setValidators(null);
            }
            this.items.at(i).controls.PreviousPolicyNumber.updateValueAndValidity();
            this.items.at(i).controls.PreviousInsurer.updateValueAndValidity();
            this.items.at(i).controls.SumInsured.updateValueAndValidity();
        }
        if (sessionStorage.titleValidation != '' && sessionStorage.titleValidation != undefined) {
            this.titleValidation = sessionStorage.titleValidation;
           // if ( this.titleValidation == false){}
        }
        if (sessionStorage.nomineeData != '' && sessionStorage.nomineeData != undefined) {
            this.getNomineeData = JSON.parse(sessionStorage.nomineeData);
            console.log(this.getNomineeData, 'this.getNomineeData');
            this.stateChangeN(this.getNomineeData.nomineeStateId, 'nominee');
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
    }


    sameProposer(value: any, i) {

        if (value.checked) {
            this.getPincode(this.proposer.controls['proposerPincode'].value, 'insure', i);

            this.insureArray['controls'].items['controls'][0]['controls'].proposerTitle.patchValue(this.proposer.controls['proposerTitle'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerFirstname.patchValue(this.proposer.controls['proposerFirstname'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerMidname.patchValue(this.proposer.controls['proposerMidname'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerLastname.patchValue(this.proposer.controls['proposerLastname'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerDob.patchValue(this.proposer.controls['proposerDob'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].maritalStatus.patchValue(this.proposer.controls['maritalStatus'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerGender.patchValue(this.proposer.controls['proposerGender'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerEmail.patchValue(this.proposer.controls['proposerEmail'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerMobile.patchValue(this.proposer.controls['proposerMobile'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerAddress.patchValue(this.proposer.controls['proposerAddress'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerAddress2.patchValue(this.proposer.controls['proposerAddress2'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerAddress3.patchValue(this.proposer.controls['proposerAddress3'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerPincode.patchValue(this.proposer.controls['proposerPincode'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerCity.patchValue(this.proposer.controls['proposerCity'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerState.patchValue(this.proposer.controls['proposerState'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerrelationship.patchValue(1);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerIdProof.patchValue(this.proposer.controls['proposerIdProof'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerPan.patchValue(this.proposer.controls['proposerPan'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerDriving.patchValue(this.proposer.controls['proposerDriving'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerPassport.patchValue(this.proposer.controls['proposerPassport'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerVoter.patchValue(this.proposer.controls['proposerVoter'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerGst.patchValue(this.proposer.controls['proposerGst'].value);
            let age = this.ageCalculate(this.datepipe.transform(this.proposer.controls['proposerDob'].value, 'y-MM-dd'));
            this.insureArray['controls'].items['controls'][0]['controls'].proposerAge.patchValue(age);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerCityIdP.patchValue(this.proposer.controls['proposerCityIdP'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerStateIdP.patchValue(this.proposer.controls['proposerStateIdP'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerCountryIdP.patchValue(this.proposer.controls['proposerCountryIdP'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerDistrictIdP.patchValue(this.proposer.controls['proposerDistrictIdP'].value);

            // setTimeout(() => {
            //     this.storeDname(0, 'district');
            // },200);
            // setTimeout(() => {
            //     this.storeDname(0, 'city');
            // },600);

        } else {
            this.insureArray['controls'].items['controls'][0]['controls'].proposerTitle.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerFirstname.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerMidname.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerLastname.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerDob.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].maritalStatus.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerGender.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerEmail.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerMobile.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerAddress.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerAddress2.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerAddress3.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerPincode.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerCity.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerState.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerrelationship.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerIdProof.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerGst.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerAge.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerPan.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerDriving.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerPassport.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerVoter.patchValue('');
        }

        console.log(this.insureArray, 'this.insureArray1');


    }


    //Create Appollo-Munich Details
    proposal() {

      let clientData = this.totalInsureDetails.slice(1);

        const data  = {
            'enquiry_id': this.enquiryId,
            'proposal_id': sessionStorage.proposalID ? sessionStorage.proposalID : this.proposalId,
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
                            'StateCode': this.nomineeData.nomineeStateId,
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
                                    'StateCode': this.proposerData.proposerStateIdP,
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
                                'AddressLine1': this.totalInsureDetails[0].Address.Address.AddressLine1,
                                'AddressLine2': this.totalInsureDetails[0].Address.Address.AddressLine2,
                                'AddressLine3': this.totalInsureDetails[0].Address.Address.AddressLine3,
                                'CountryCode': 'IN',
                                'District': this.totalInsureDetails[0].Address.Address.District,
                                'PinCode': this.totalInsureDetails[0].Address.Address.PinCode,
                                'StateCode': this.totalInsureDetails[0].Address.Address.StateCode,
                                'TownCode': this.totalInsureDetails[0].Address.Address.TownCode
                            }
                        },
                        'Age': this.totalInsureDetails[0].Age,
                        'AnnualIncome': this.totalInsureDetails[0].AnnualIncome,
                        'BirthDate': this.totalInsureDetails[0].BirthDate,
                        'ClientCode': 'PolicyHolder',
                        'ContactInformation': {
                            'ContactNumber': {
                                'ContactNumber': {
                                    'Number': this.totalInsureDetails[0].ContactInformation.ContactNumber.ContactNumber.Number
                                }
                            },
                            'Email': this.totalInsureDetails[0].ContactInformation.Email
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
                                'InceptionDate': this.totalInsureDetails[0].PreviousInsurer.InceptionDate,
                                'EndDate': this.totalInsureDetails[0].PreviousInsurer.EndDate,
                                'PreviousInsurerCode': this.totalInsureDetails[0].PreviousInsurer.PreviousInsurerCode,
                                'PreviousPolicyNumber': this.totalInsureDetails[0].PreviousInsurer.PreviousPolicyNumber,
                                'SumInsured': this.totalInsureDetails[0].PreviousInsurer.SumInsured,
                                'QualifyingAmount': this.totalInsureDetails[0].PreviousInsurer.QualifyingAmount,
                                'WaivePeriod': this.totalInsureDetails[0].PreviousInsurer.WaivePeriod,
                                'Remarks': this.totalInsureDetails[0].PreviousInsurer.Remarks
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
        if (clientData == ''){
            delete data.ProposalCaptureServiceRequest.Prospect.Client.Dependants.Client
        }


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
            this.toastr.success('Proposal created successfully!!');
            this.summaryData = successData.ResponseObject;
            // let getdata=[];

                        // for (let j = 0; j < this.insurePersons.length; j++) {
                        //     for(let i = 0; i < this.summaryData.InsurePolicyholderDetails.length; i++) {
                        //             this.summaryData.InsurePolicyholderDetails[i].typenamel = this.insurePersons[j].type;
                        //     }
                        // }

            for(let i = 0; i < this.summaryData.InsurePolicyholderDetails.length; i++) {
                for (let j = 0; j < this.relationshipList.length; j++) {
                    if (this.summaryData.InsurePolicyholderDetails[i].i_relation == this.relationshipList[j].relationship_code) {
                        this.summaryData.InsurePolicyholderDetails[i].relationship = this.relationshipList[j].relationship;
                    }
                }
                for (let j = 0; j < this.occupationList.length; j++) {
                    if (this.summaryData.InsurePolicyholderDetails[i].i_occuption == this.occupationList[j].occupation_code) {
                        this.summaryData.InsurePolicyholderDetails[i].occupation = this.occupationList[j].occupation;
                    }
                }
                    for(let j = 0; j< this.maritalDetail.length; j++){
                        if(this.summaryData.InsurePolicyholderDetails[i].i_maritalstatus == this.maritalDetail[j].marital_code ) {
                            this.summaryData.InsurePolicyholderDetails[i].marital_status = this.maritalDetail[j].marital_status;
                        }
                    }
                // for(let j = 0; j< this.proffessionList.length; j++){
                //     if(this.summaryData.InsurePolicyholderDetails[i].i_procode == this.proffessionList[j].proffession.code ) {
                //         this.summaryData.InsurePolicyholderDetails[i].profession = this.proffessionList[j].profession;
                //     }
                // }
                for(let j = 0; j< this.IdProofList.length; j++){
                    if(this.summaryData.ProposalDetails[i].p_idproof_code== this.IdProofList[j].proof_code ) {
                        this.summaryData.ProposalDetails[i].proof_name = this.IdProofList[j].proof_name;
                    }
                }
                }
                for(let j = 0; j< this.relationshipList.length; j++){
                    if(this.summaryData.ProposalDetails.n_relation == this.relationshipList[j].relationship_code ) {
                        this.summaryData.ProposalDetails.relationship = this.relationshipList[j].relationship;
                    }
                }
            for(let i = 0; i< this.IdProofList.length; i++){
                if(this.summaryData.ProposalDetails.p_idproof_code== this.IdProofList[i].proof_code ) {
                    this.summaryData.ProposalDetails.proof_name = this.IdProofList[i].proof_name;
                }
            }
            for(let j = 0; j< this.maritalDetail.length; j++){
                if(this.summaryData.InsurePolicyholderDetails.p_maritalstatus == this.maritalDetail[j].marital_code ) {
                    this.summaryData.InsurePolicyholderDetails.marital_status = this.maritalDetail[j].marital_status;
                }
            }

            // if(this.summaryData.InsurePolicyholderDetails.p_gender == this.relationshipList.relationship_proposer_id ) {
            //     this.summaryData.InsuredDetailsList.relationship_proposer_name = this.relationshipList.relationship_proposer_name;
            // }

            console.log(this.summaryData.InsurePolicyholderDetails, 'this.summaryData.InsurePolicyholderDetailsthis.summaryData.InsurePolicyholderDetails');
            this.RediretUrlLink = this.summaryData.PaymentURL;
            this.proposalId = this.summaryData.ProposalId;
            sessionStorage.proposalID = this.proposalId;
            this.lastStepper.next();
        }
        else{
            this.toastr.error(successData.ErrorObject);
        }
    }

//Summary residence detail
    public proposalFailure(error) {
        this.settings.loadingSpinner = false;
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

        }
    }

    public setMaritalStatusFailure(error) {
    }//TitleCode Status
    TitleCodeStatus() {
        const data = {
            'platform': 'web',
            'product_id': '11',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.proposalservice.getTitleCode(data).subscribe(
            (successData) => {
                this.setTitleCodeSuccess(successData);
            },
            (error) => {
                this.setTitleCodeFailure(error);
            }
        );
    }

    public setTitleCodeSuccess(successData) {
        if (successData.IsSuccess == true) {
            this.titleCodeList = successData.ResponseObject;
                console.log( this.titleCodeList ,' this.titleCodeList  this.titleCodeList ');
        }
    }

    public setTitleCodeFailure(error) {
    }

    //proffession list
    getProffession() {
        const data = {
            'platform': 'web',
            'product_id': '11',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.proposalservice.apollomunichProffession(data).subscribe(
            (successData) => {
                this.getProffessionSuccess(successData);
            },
            (error) => {
                this.getProffessionFailure(error);
            }
        );
    }

    public getProffessionSuccess(successData) {
        if (successData.IsSuccess == true) {
            this.proffessionList = successData.ResponseObject;

        }
    }

    public getProffessionFailure(error) {
    }


    //Previous Insure
    getPreviousInsure() {
        const data = {
            'platform': 'web',
            'product_id': '11',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.proposalservice.apollomunichPreviousInsure(data).subscribe(
            (successData) => {
                this.getPreviousInsureSuccess(successData);
            },
            (error) => {
                this.getPreviousInsureFailure(error);
            }
        );
    }

    public getPreviousInsureSuccess(successData) {
        if (successData.IsSuccess == true) {
            this.previousInsureList = successData.ResponseObject;

        }
    }

    public getPreviousInsureFailure(error) {
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

    //IdProoofList
    IdProofList(){
        const data = {
            'platform': 'web',
            'product_id': '11',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        };
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
        this.IdProofListss = successData.ResponseObject;
    }
    public setIdProofListStatusFailure(error){
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
        this.AppolloStateList = successData.ResponseObject;
    }
    public setAppolloStateFailure(error){
    }



    stateChange(stateId, title){
            this.stateTitle = title;
            this.stateCode = stateId;
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
          this.AppolloDistrictList = successData.ResponseObject;

    }
    public setAppolloDistrictFailure(error){
    }

    //Appollo City
    public setAppolloCitySuccess(successData){
           this.AppolloCityList = successData.ResponseObject;

    }
    public setAppolloCityFailure(error){
    }


    stateChangeN(stateId, title){
        this.stateTitle = title;
        this.stateCode = stateId;
        const data = {
            'platform': 'web',
            'product_id': '11',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'state_code': this.stateCode
        }


        this.proposalservice.getAppolloDistrict(data).subscribe(
            (successData) => {
                this.setAppolloDistrictNSuccess(successData)
            },
            (error) => {
                this.setAppolloDistrictNFailure(error);
            }
        );

        this.proposalservice.getAppolloCity(data).subscribe(
            (successData) => {
                this.setAppolloCityNSuccess(successData);
            },
            (error) => {
                this.setAppolloCityNFailure(error);
            }
        );
    }


//Appollo District
    public setAppolloDistrictNSuccess(successData){

            this.nomineeAppolloDistrictList = successData.ResponseObject;

    }
    public setAppolloDistrictNFailure(error){
    }

    //Appollo City
    public setAppolloCityNSuccess(successData){

            this.nomineeAppolloCityLis = successData.ResponseObject;

    }
    public setAppolloCityNFailure(error){
    }


//Insure State
    insureStateChange(stateId, title, i){
        this.stateCode = stateId;
        this.stateCodeId = i;
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

        this.iAppolloDistrictList = successData.ResponseObject;
        this.insureArray['controls'].items['controls'][this.stateCodeId]['controls'].stateHide.patchValue(false);
    }
    public setInsureAppolloDistrictFailure(error){
    }

    //Appollo City
    public setInsureAppolloCitySuccess(successData){

        this.iAppolloCityList = successData.ResponseObject;
        this.insureArray['controls'].items['controls'][this.stateCodeId]['controls'].cityHide.patchValue(false);

    }
    public setInsureAppolloCityFailure(error){
    }


    storeDname(id, title ) {
      console.log(this.insureArray['controls'].items['controls'][id]['controls'].proposerDistrict.value, 'popp');
        if (title == 'district') {
            console.log(this.iAppolloDistrictList, 'this.iAppolloDistrictList');
            for(let i =0; i < this.iAppolloDistrictList.length; i++ ) {
                if(this.iAppolloDistrictList[i].district_code == this.insureArray['controls'].items['controls'][id]['controls'].proposerDistrict.value){
                   this.iAppolloDistrictName =  this.iAppolloDistrictList[i].district_name;
                }
            }
                // this.insureArray['controls'].items['controls'][id]['controls'].proposerDistrictIdP.patchValue(this.iAppolloDistrictName);

        }
        else if (title == 'city') {
            console.log(this.iAppolloCityList, 'this.iAppolloCityList');

            for(let i =0; i < this.iAppolloCityList.length; i++ ) {
                if(this.iAppolloCityList[i].city_code == this.insureArray['controls'].items['controls'][id]['controls'].proposerCity.value){
                    this.iAppolloCityName =  this.iAppolloCityList[i].city_name;
                }
            }
               //  this.insureArray['controls'].items['controls'][id]['controls'].proposerCityIdP.patchValue(this.iAppolloCityName);

        }
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
        this.relationshipList = successData.ResponseObject;

    }
    public setRelationshipFailure(error) {
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
    }

    public occupationListFailure(error) {
    }
    OnNumber(event){
        if (event.charCode !== 0) {
            const pattern = /[0-9/]/;
            const inputChar = String.fromCharCode(event.charCode);

            if (!pattern.test(inputChar)) {
                // invalid character, prevent input
                event.preventDefault();
            }
        }
    }

    // onlyNum(event){
    //     if (event.charCode !== 0) {
    //         const pattern = /[0-9]/;
    //         const inputChar = String.fromCharCode(event.charCode);
    //
    //         if (!pattern.test(inputChar)) {
    //             // invalid character, prevent input
    //             event.preventDefault();
    //         }
    //     }
    // }
    public onCharacter(event: any) {
        if (event.charCode !== 0) {
            const pattern = /[a-zA-Z]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }
    alternateChange(event) {
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

}
