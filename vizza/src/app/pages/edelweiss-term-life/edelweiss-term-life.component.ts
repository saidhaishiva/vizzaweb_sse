import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDialog, MatStepper} from '@angular/material';
import {DatePipe} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {CommonService} from '../../shared/services/common.service';
import {ValidationService} from '../../shared/services/validation.service';
import {AppSettings} from '../../app.settings';
import {ToastrService} from 'ngx-toastr';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {TermLifeCommonService} from '../../shared/services/term-life-common.service';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import * as moment from 'moment';

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
  selector: 'app-edelweiss-term-life',
  templateUrl: './edelweiss-term-life.component.html',
  styleUrls: ['./edelweiss-term-life.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class EdelweissTermLifeComponent implements OnInit {
  public proposer: FormGroup;
  public insureArray: FormGroup;
  public bankDetail: FormGroup;
  public nomineeDetail: FormGroup;
  public itemsNominee: any;
  public addExistingInsurance: any;
  public etitle: any;
  public egender: any;
  public minDate: any;
  public maxDate: any;
  public step: any;
  public taxRequired: any;
  public getStepper1: any;
  public getStepper2: any;
  public getStepper3: any;
  public getStepper4: any;
  public getDays: any;
  public getAge: any;
  public emaritalStatus: any;
  public einvesting: any;
  public ePremiumTerm: any;
  public policyTermList: any;
  public frequencyList: any;
  public lifePremiumList: any;
  public getEnquiryDetials: any;
  public enquiryFormData: any;
  public mobileNo: any;
  public staffList: any;
  public eAgeProof: any;
  public eIdProof: any;
  public declaration: any;
  public eAddressProof: any;
  public eQualification: any;
  public eState: any;
  public eemploymentType: any;
  public eDuty: any;
  public bduty: any;
  public eHeightFeet: any;
  public eHeightInches: any;
  public ePolicyCategory: any;
  public eNomineeRelation: any;
  public eInsuranceRepository: any;
  public proposerAge: any;
  public dateError: any;
  public today: any;
  public currentStep: any;
  public personalData: any;
  public summaryData: any;
  public requestedUrl: any;
  public insurerData: any;
  public proposerFormData: any;
  public nomineeFormData: any;
  public insuredFormData: any;
  public bankFormData: any;
  public proposalId: any;
  public nomineeDetails: any;
  public insurePersons: any;
  public payingTermList: any;
  public valid: any;
  public settings: any;
  public webhost: any;
  public nomineeData: any;
  public showAppointee: boolean;
  public dopDateError: any;




  constructor( public fb: FormBuilder, public dialog: MatDialog, public datepipe: DatePipe, public route: ActivatedRoute, public common: CommonService, public validation: ValidationService, public appSettings: AppSettings, private toastr: ToastrService, public config: ConfigurationService, public authservice: AuthService, public termService: TermLifeCommonService,  ) {
    this.requestedUrl = '';
    let stepperindex = 0;
    this.route.params.forEach((params) => {
      if(params.stepper == true || params.stepper == 'true') {
        stepperindex = 6;
        if (sessionStorage.summaryData != '' && sessionStorage.summaryData != undefined) {
          let summaryData = JSON.parse(sessionStorage.summaryData);
          this.summaryData = summaryData;
          this.requestedUrl = summaryData.payment_link;
          this.proposerFormData = JSON.parse(sessionStorage.proposerFormData);
          this.bankFormData = JSON.parse(sessionStorage.bankFormData);
          this.nomineeFormData = JSON.parse(sessionStorage.nomineeFormData);
          this.insuredFormData = JSON.parse(sessionStorage.insuredFormData);
          this.proposalId = this.summaryData.ProposalId;
          sessionStorage.edelweiss_term_life_id = this.proposalId;
        }

      }
    });
    this.currentStep = stepperindex;
    const minDate = new Date();
    this.minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
    let today  = new Date();
    this.today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    this.valid = false;
    this.settings = this.appSettings.settings;
    this.webhost = this.config.getimgUrl();
    this.nomineeDetails = [];
    this.taxRequired = '';
    this.step = 0;
    this.proposer = this.fb.group({
      title:  ['', Validators.compose([Validators.required])],
      titleName: '',
      firstName: ['', Validators.compose([Validators.required])],
      midName: '',
      lastName: ['', Validators.compose([Validators.required])],
      gender: ['', Validators.compose([Validators.required])],
      dob: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      maritalStatus: ['', Validators.required],
      maritalStatusName: '',
      nationality: '',
      emailId: ['', Validators.compose([ Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
      pan: ['', Validators.compose([ Validators.minLength(10)])],
      aadhaarNo: '',
        ageProofIdName: '',
      fatherhusbandName: '',
      ageProofId: ['', Validators.compose([Validators.required])],
      highestQualification: ['', Validators.compose([Validators.required])],
      highestQualificationName: '',
      otherQualification: '',
      mobileNo: ['', Validators.compose([Validators.pattern('[6-9]\\d{9}')])],
      currAddr1: ['', Validators.compose([Validators.required])],
      currAddr2: ['', Validators.compose([Validators.required])],
      currAddr3: '',
      currPincode: ['', Validators.compose([Validators.required])],
      currState: ['', Validators.compose([Validators.required])],
      currCity: ['', Validators.compose([Validators.required])],
      perAddr1: ['', Validators.compose([Validators.required])],
      perAddr2: ['', Validators.compose([Validators.required])],
      perAddr3: '',
      perPincode: ['', Validators.compose([Validators.required])],
      perState: ['', Validators.compose([Validators.required])],
      perCity: ['', Validators.compose([Validators.required])],
      isCurrPerAddrSame: '',
      employementTypeOther: '',
      employementType: ['', Validators.compose([Validators.required])],
        employementTypeName: '',
      employerName: ['', Validators.compose([Validators.required])],
      natureduty: ['', Validators.compose([Validators.required])],
        naturedutyName: '',
      employerAddr: ['', Validators.compose([Validators.required])],
      annualIncome: ['', Validators.compose([Validators.required])],
      taxResidence: '',

    });

    this.insureArray = this.fb.group({

      investing: ['', Validators.compose([Validators.required])],
      title: ['', Validators.compose([Validators.required])],
      firstName: ['', Validators.compose([Validators.required])],
      titleName: '',
      midName: '',
      lastName: ['', Validators.compose([Validators.required])],
      gender: ['', Validators.compose([Validators.required])],
      dob: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      maritalStatus: ['', Validators.required],
      maritalStatusName: '',
      nationality: '',
      emailId: ['', Validators.compose([ Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
      pan: ['', Validators.compose([ Validators.minLength(10)])],
      aadhaarNo: ['', Validators.compose([Validators.required])],
        ageProofIdName: '',
      fatherhusbandName: '',
      ageProofId: ['', Validators.compose([Validators.required])],
      highestQualification: ['', Validators.compose([Validators.required])],
      highestQualificationName: '',
      otherQualification: '',
      mobileNo: ['', Validators.compose([Validators.pattern('[6-9]\\d{9}')])],

      currAddr1: ['', Validators.compose([Validators.required])],
      currAddr2: ['', Validators.compose([Validators.required])],
      currAddr3: '',
      currPincode: ['', Validators.compose([Validators.required])],
      currState: ['', Validators.compose([Validators.required])],
      currCity: ['', Validators.compose([Validators.required])],
      perAddr1: ['', Validators.compose([Validators.required])],
      perAddr2: ['', Validators.compose([Validators.required])],
      perAddr3: '',
      perPincode: ['', Validators.compose([Validators.required])],
      perState: ['', Validators.compose([Validators.required])],
      perCity: ['', Validators.compose([Validators.required])],
      isCurrPerAddrSame: '',
      employementTypeOther: '',
      employementType: ['', Validators.compose([Validators.required])],
        employementTypeName: '',
      employerName: ['', Validators.compose([Validators.required])],
      natureduty: ['', Validators.compose([Validators.required])],
        naturedutyName: '',
      employerAddr: ['', Validators.compose([Validators.required])],
      annualIncome: ['', Validators.compose([Validators.required])],
      taxResidence: '',
      isPoliticallyExposed: false,
      specification: '',
      identityProof: ['', Validators.compose([Validators.required])],
      identityProofName: '',
      categorization: ['', Validators.compose([Validators.required])],
      addrProof: ['', Validators.compose([Validators.required])],
      addrProofName: '',
      heightFeets: ['', Validators.compose([Validators.required])],
      heightInches: ['', Validators.compose([Validators.required])],
      weight: ['', Validators.compose([Validators.required])],
      medicalTreatment: '',
      receivedTreatment1: '',
      receivedTreatment2: '',
      insureHistory: '',
      insureAccNo: '',
      provideAccNo: '',
      epolicy: 'No',
      einsureAccNo: 'No',
      epolicy1: 'No',
      insureRepository: '',
      sameAsProposer: false,

    });

    this.bankDetail = this.fb.group({
      accountNo: ['', Validators.compose([Validators.required])],
      name: ['', Validators.compose([Validators.required])],
      location: ['', Validators.compose([Validators.required])],
      ifscCode: ['', Validators.compose([Validators.required])],
      investmentStrategy: '',
      existingInsuranceInd: false,
      existingInsurance : new FormArray([
        this.create()
      ]),

    });
    this.nomineeDetail = this.fb.group({
      'itemsNominee' : this.fb.array([
        this.initItemRows()
      ])



    });
  }

  ngOnInit() {
    this.enquiryFormData = JSON.parse(sessionStorage.enquiryFormData);
    this.lifePremiumList = JSON.parse(sessionStorage.lifePremiumList);
    this.getEnquiryDetials = JSON.parse(sessionStorage.getEnquiryDetials);
    this.geteTitle();
    this.geteGender();
    this.geteMaritalStatus();
    this.geteInvesting();
    this.getePremiumTerm();
    this.getePolicyTerm();
    this.geteFrequency();
    this.geteStaff();
    this.geteAgeProof();
    this.geteIdProof();
    this.geteAddressProof();
    this.geteQualification();
    this.geteState();
    this.geteemploymentType();
    this.geteDuty();
    this.setbdutyList();
    this.geteHeightFeet();
    this.geteHeightInches();
    this.getePolicyCategory();
    this.geteNomineeRelation();
    this.geteInsuranceRepository();
    this.sessionData();

  }

  initItemRows() {

    return this.fb.group(
        {
          rolecd: 'PRIMARY',
          nomineeName: ['', Validators.required],
          nDob: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
          gender: ['', Validators.required],
          nomineeRelationship: ['', Validators.required],
          nomineeRelationshipName: '',
          nomineeDobValidError: '',
          appointeeDobValidError: '',
          showAppointee: false,
          relationToInsured: '',
          aGender: '',
          nomineeAgeVal: '',
          appointeeDob: ['', Validators.compose([ Validators.minLength(10)])],
          aName: '',
        }
    );
  }


  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  backAll() {
    this.topScroll();
    this.prevStep();
  }
  nameValidate(event: any) {
    this.validation.nameValidate(event);
  }
  // Dob validation
  dobValidate(event: any) {
    this.validation.dobValidate(event);
  }
  // Number validation
  numberValidate(event: any) {
    this.validation.numberValidate(event);
  }
  heightValidate(event: any) {
    this.validation.heightValidate(event);
  }
  idValidate(event: any) {
    this.validation.idValidate(event);
  }
  topScroll() {
    document.getElementById('main-content').scrollTop = 0;
  }

  // Existing Insurance
  create() {
    return new FormGroup({
      policyNo: new FormControl(),
      companyName :  new FormControl(),
      yearOfIssue :  new FormControl(),
      sumAssured: new FormControl(),
      annualizedPremium :  new FormControl(),
      policyStatus :  new FormControl()
    });
  }

  addItems() {
    if (this.bankDetail.get('existingInsurance').value.length < 5) {
      this.addExistingInsurance = this.bankDetail.get('existingInsurance') as FormArray;
      this.addExistingInsurance.push(this.create());
      console.log(this.addExistingInsurance, 'this.addExistingInsurance');
      console.log('eror3');
    }
  }
  removeItems(index) {
    let ssss =  this.bankDetail.get('existingInsurance') as FormArray;
    console.log(ssss,'ssssss')
    ssss.removeAt(index);
    console.log(index, 'this.index');


  }

  addEvent(event) {
    if (event.value != null) {
      let selectedDate = '';
      this.proposerAge = '';
      let dob = '';
      if (typeof event.value._i == 'string') {
        const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
        if (pattern.test(event.value._i) && event.value._i.length == 10) {
          this.dateError = '';
        } else {
          this.dateError = 'Enter Valid Date';
        }
        selectedDate = event.value._i;
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (selectedDate.length == 10) {
          this.proposerAge = this.ageCalculate(dob);
          // sessionStorage.proposerAge = this.proposerAge;

        }

      } else if (typeof event.value._i == 'object') {
        // dob = this.datepipe.transform(event.value, 'MMM d, y');
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (dob.length == 10) {
          this.proposerAge = this.ageCalculate(dob);
          // sessionStorage.insuredAgePA = this.proposerAge;

        }
        this.dateError = '';
      }
      sessionStorage.proposerAge = this.proposerAge;

    }
  }

  // AGE VALIDATION
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
  sameAddress() {
    if (this.proposer.controls['isCurrPerAddrSame'].value == true) {
      this.proposer.controls['perAddr1'].patchValue( this.proposer.controls['currAddr1'].value),
          this.proposer.controls['perAddr2'].patchValue( this.proposer.controls['currAddr2'].value),
          this.proposer.controls['perAddr3'].patchValue( this.proposer.controls['currAddr3'].value),
          this.proposer.controls['perCity'].patchValue( this.proposer.controls['currCity'].value),
          this.proposer.controls['perPincode'].patchValue( this.proposer.controls['currPincode'].value),
          this.proposer.controls['perState'].patchValue( this.proposer.controls['currState'].value)
      console.log(this.proposer.controls['perCity'].value, 'ghghghj');
    } else {
      this.proposer.controls['perAddr1'].patchValue(''),
          this.proposer.controls['perAddr2'].patchValue(''),
          this.proposer.controls['perAddr3'].patchValue(''),
          this.proposer.controls['perCity'].patchValue(''),
          this.proposer.controls['perPincode'].patchValue(''),
          this.proposer.controls['perState'].patchValue('')
      console.log(this.proposer.controls['perCity'].value, 'eeeeeeee');
    }
  }
  sameAddress1() {
    if (this.insureArray.controls['isCurrPerAddrSame'].value == true) {
      this.insureArray.controls['perAddr1'].patchValue( this.insureArray.controls['currAddr1'].value),
          this.insureArray.controls['perAddr2'].patchValue( this.insureArray.controls['currAddr2'].value),
          this.insureArray.controls['perAddr3'].patchValue( this.insureArray.controls['currAddr3'].value),
          this.insureArray.controls['perCity'].patchValue( this.insureArray.controls['currCity'].value),
          this.insureArray.controls['perPincode'].patchValue( this.insureArray.controls['currPincode'].value),
          this.insureArray.controls['perState'].patchValue( this.insureArray.controls['currState'].value)
      console.log(this.insureArray.controls['perCity'].value, 'ghghghj');
    } else {
      this.insureArray.controls['perAddr1'].patchValue(''),
          this.insureArray.controls['perAddr2'].patchValue(''),
          this.insureArray.controls['perAddr3'].patchValue(''),
          this.insureArray.controls['perCity'].patchValue(''),
          this.insureArray.controls['perPincode'].patchValue(''),
          this.insureArray.controls['perState'].patchValue('')
      console.log(this.insureArray.controls['perCity'].value, 'eeeeeeee');
    }
  }

  sameAsInsure() {

    if (this.insureArray.controls['investing'].value == 'SELF') {

          this.insureArray.controls['title'].patchValue(this.proposer.controls['title'].value),
          this.insureArray.controls['titleName'].patchValue(this.proposer.controls['titleName'].value),
          this.insureArray.controls['firstName'].patchValue(this.proposer.controls['firstName'].value),
          this.insureArray.controls['midName'].patchValue(this.proposer.controls['midName'].value),
          this.insureArray.controls['lastName'].patchValue(this.proposer.controls['lastName'].value),
          this.insureArray.controls['gender'].patchValue(this.proposer.controls['gender'].value),
          this.insureArray.controls['dob'].patchValue(this.proposer.controls['dob'].value),
          this.insureArray.controls['maritalStatus'].patchValue(this.proposer.controls['maritalStatus'].value),
          this.insureArray.controls['maritalStatusName'].patchValue(this.proposer.controls['maritalStatusName'].value),
          this.insureArray.controls['nationality'].patchValue(this.proposer.controls['nationality'].value),
          this.insureArray.controls['emailId'].patchValue(this.proposer.controls['emailId'].value),
          this.insureArray.controls['pan'].patchValue(this.proposer.controls['pan'].value),
          this.insureArray.controls['aadhaarNo'].patchValue(this.proposer.controls['aadhaarNo'].value),
          this.insureArray.controls['fatherhusbandName'].patchValue(this.proposer.controls['fatherhusbandName'].value),
          this.insureArray.controls['ageProofId'].patchValue(this.proposer.controls['ageProofId'].value),
          this.insureArray.controls['ageProofIdName'].patchValue(this.proposer.controls['ageProofIdName'].value),
          this.insureArray.controls['highestQualification'].patchValue(this.proposer.controls['highestQualification'].value),
          this.insureArray.controls['highestQualificationName'].patchValue(this.proposer.controls['highestQualificationName'].value),
          this.insureArray.controls['otherQualification'].patchValue(this.proposer.controls['otherQualification'].value),
          this.insureArray.controls['mobileNo'].patchValue(this.proposer.controls['mobileNo'].value),
          this.insureArray.controls['currAddr1'].patchValue(this.proposer.controls['currAddr1'].value),
          this.insureArray.controls['currAddr2'].patchValue(this.proposer.controls['currAddr2'].value),
          this.insureArray.controls['currAddr3'].patchValue(this.proposer.controls['currAddr3'].value),
          this.insureArray.controls['currPincode'].patchValue(this.proposer.controls['currPincode'].value),
          this.insureArray.controls['currState'].patchValue(this.proposer.controls['currState'].value),
          this.insureArray.controls['currCity'].patchValue(this.proposer.controls['currCity'].value),
          this.insureArray.controls['perAddr1'].patchValue(this.proposer.controls['perAddr1'].value),
          this.insureArray.controls['perAddr2'].patchValue(this.proposer.controls['perAddr2'].value),
          this.insureArray.controls['perAddr3'].patchValue(this.proposer.controls['perAddr3'].value),
          this.insureArray.controls['perPincode'].patchValue(this.proposer.controls['perPincode'].value),
          this.insureArray.controls['perState'].patchValue(this.proposer.controls['perState'].value),
          this.insureArray.controls['perCity'].patchValue(this.proposer.controls['perCity'].value),
          this.insureArray.controls['isCurrPerAddrSame'].patchValue(this.proposer.controls['isCurrPerAddrSame'].value),
          this.insureArray.controls['employementTypeOther'].patchValue(this.proposer.controls['employementTypeOther'].value),
          this.insureArray.controls['employementType'].patchValue(this.proposer.controls['employementType'].value),
          this.insureArray.controls['employementTypeName'].patchValue(this.proposer.controls['employementTypeName'].value),
          this.insureArray.controls['employerName'].patchValue(this.proposer.controls['employerName'].value),
          this.insureArray.controls['natureduty'].patchValue(this.proposer.controls['natureduty'].value),
          this.insureArray.controls['naturedutyName'].patchValue(this.proposer.controls['naturedutyName'].value),
          this.insureArray.controls['employerAddr'].patchValue(this.proposer.controls['employerAddr'].value),
          this.insureArray.controls['annualIncome'].patchValue(this.proposer.controls['annualIncome'].value),
          this.insureArray.controls['taxResidence'].patchValue(this.proposer.controls['taxResidence'].value)
          console.log(this.insureArray.controls['title'].value, 'ghghghj');
    } else {
          this.insureArray.controls['title'].patchValue(''),
          this.insureArray.controls['titleName'].patchValue(''),
          this.insureArray.controls['firstName'].patchValue(''),
          this.insureArray.controls['midName'].patchValue(''),
          this.insureArray.controls['lastName'].patchValue(''),
          this.insureArray.controls['gender'].patchValue(''),
          this.insureArray.controls['dob'].patchValue(''),
          this.insureArray.controls['maritalStatus'].patchValue(''),
          this.insureArray.controls['nationality'].patchValue(''),
          this.insureArray.controls['emailId'].patchValue(''),
          this.insureArray.controls['pan'].patchValue(''),
          this.insureArray.controls['aadhaarNo'].patchValue(''),
          this.insureArray.controls['fatherhusbandName'].patchValue(''),
          this.insureArray.controls['ageProofId'].patchValue(''),
          this.insureArray.controls['ageProofIdName'].patchValue(''),
          this.insureArray.controls['highestQualification'].patchValue(''),
          this.insureArray.controls['highestQualificationName'].patchValue(''),
          this.insureArray.controls['otherQualification'].patchValue(''),
          this.insureArray.controls['mobileNo'].patchValue(''),
          this.insureArray.controls['currAddr1'].patchValue(''),
          this.insureArray.controls['currAddr2'].patchValue(''),
          this.insureArray.controls['currAddr3'].patchValue(''),
          this.insureArray.controls['currPincode'].patchValue(''),
          this.insureArray.controls['currState'].patchValue(''),
          this.insureArray.controls['currCity'].patchValue(''),
          this.insureArray.controls['perAddr1'].patchValue(''),
          this.insureArray.controls['perAddr2'].patchValue(''),
          this.insureArray.controls['perAddr3'].patchValue(''),
          this.insureArray.controls['perPincode'].patchValue(''),
          this.insureArray.controls['perState'].patchValue(''),
          this.insureArray.controls['perCity'].patchValue(''),
          this.insureArray.controls['isCurrPerAddrSame'].patchValue(''),
          this.insureArray.controls['employementTypeOther'].patchValue(''),
          this.insureArray.controls['employementType'].patchValue(''),
          this.insureArray.controls['employerName'].patchValue(''),
          this.insureArray.controls['natureduty'].patchValue(''),
          this.insureArray.controls['employerAddr'].patchValue(''),
          this.insureArray.controls['annualIncome'].patchValue(''),
          this.insureArray.controls['taxResidence'].patchValue('')
          console.log(this.insureArray.controls['taxResidence'].value, 'eeeeeeee');

    }
  }

  addEventNominee(event, i, type) {
    if(type == 'nominee') {
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
          if (pattern.test(event.value._i) && event.value._i.length == 10) {
            this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nomineeDobValidError.patchValue('');

          } else {
            this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nomineeDobValidError.patchValue('Enter Valid DOB');
          }

          selectedDate = event.value._i;

          if (selectedDate.length == 10) {
            this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nomineeDobValidError.patchValue('');
            this.getAge = this.ageCalculate(dob);
            this.getDays = this.ageCalculateInsurer(dob_days);
            this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nDob.patchValue(dob);

          }

        }
        else if (typeof event.value._i == 'object') {
          if (dob.length == 10) {
            this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nomineeDobValidError.patchValue('');
            this.getAge = this.ageCalculate(dob);
            this.getDays = this.ageCalculateInsurer(dob_days);
          }
        }
      }
      if ( i == 0) {
        sessionStorage.nomineAge = this.getAge;
      }

      if ( i != 0) {
        if (this.getAge <= 18){
          this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nomineeAgeVal.patchValue(1);
          console.log(this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nomineeAgeVal.value,'nomineeagevalue');
        } else {
          this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nomineeAgeVal.patchValue(0);
          console.log(this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nomineeAgeVal.value,'nomineeagevalueelsee');
        }

      }
      console.log(this.getAge,'getaage');
      if (this.getAge <= 18) {
        this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].showAppointee.patchValue(true);
      //   this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aName.setValidators([Validators.required]);
      // } else {
      //   this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].showAppointee.patchValue(false);
      //   this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aName.setValidators(null);
      //   this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aName.patchValue('');
      //   this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].appointeeDob.patchValue('');
      //   this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aGender.patchValue('');
      //   this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].relationToInsured.patchValue('');
      //   if (this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].showAppointee.value == true && i == 0) {
          this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aName.patchValue(this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aName.value );
          this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].appointeeDob.patchValue(this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].appointeeDob.value );
          this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aGender.patchValue(this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aGender.value );
          this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].relationToInsured.patchValue(this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].relationToInsured.value );

          this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aName.setValidators([Validators.required]);
          this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].appointeeDob.setValidators([Validators.required]);
          this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aGender.setValidators([Validators.required]);
          this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].relationToInsured.setValidators([Validators.required]);

        } else {
          this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].showAppointee.patchValue(false);
          this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aName.setValidators(null);
          this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].appointeeDob.setValidators(null);
          this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aGender.setValidators(null);
          this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].relationToInsured.setValidators(null);

          this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aName.patchValue('');
          this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].appointeeDob.patchValue('');
          this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aGender.patchValue('');
          this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].relationToInsured.patchValue('');
        }
        this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aName.updateValueAndValidity();
        this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].appointeeDob.updateValueAndValidity();
        this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aGender.updateValueAndValidity();
        this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].relationToInsured.updateValueAndValidity();

      // }
    } else if(type == 'appointee') {

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
          if (pattern.test(event.value._i) && event.value._i.length == 10) {
            this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].appointeeDobValidError.patchValue('');

          } else {
            this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].appointeeDobValidError.patchValue('Enter Valid DOB');
          }

          selectedDate = event.value._i;

          if (selectedDate.length == 10) {
            this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].appointeeDobValidError.patchValue('');
            this.getAge = this.ageCalculate(dob);
            this.getDays = this.ageCalculateInsurer(dob_days);
            this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].appointeeDob.patchValue(dob);

          }

        }
        else if (typeof event.value._i == 'object') {
          if (dob.length == 10) {
            this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].appointeeDobValidError.patchValue('');
            this.getAge = this.ageCalculate(dob);
            this.getDays = this.ageCalculateInsurer(dob_days);
          }
        }
      }
      sessionStorage.appointeeAge = this.getAge;

    }
  }

  ageCalculateInsurer(getDays) {
    let a = moment(getDays, 'DD/MM/YYYY');
    let b = moment(new Date(), 'DD/MM/YYYY');
    let days = b.diff(a, 'days');
    return days;
  }

  dateOfApplicationEvent(event) {
    if (event.value != null) {
      if (typeof event.value._i == 'string') {
        const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
        if (pattern.test(event.value._i) && event.value._i.length == 10) {
          this.dopDateError = '';
        } else {
          this.dopDateError = 'Enter Valid Date';
        }

      } else if (typeof event.value._i == 'object') {
        this.dopDateError = '';
      }

    }
  }


    // add NOmineee
    addNominee(event) {
        // if (this.nomineeDetail.valid) {
            console.log(this.nomineeDetail.get('itemsNominee').value.length,'valueeee')
            if (this.nomineeDetail.get('itemsNominee').value.length < 5) {
                let nomineeForm = this.nomineeDetail.get('itemsNominee') as FormArray;
                nomineeForm.push(this.initItemRows());
            }

        }
    // }

    removeNominee(event, index) {
        let nomineeForm = this.nomineeDetail.get('itemsNominee') as FormArray;
        nomineeForm.removeAt(1);
    }

  ageNominee() {
    if (sessionStorage.nomineeAge <= 18) {
      this.showAppointee = true;
      console.log(this.showAppointee,'cccccc')
    } else {
      this.showAppointee = false;

    }
  }
  // appointeeAgeValid(event: any,i) {
  //
  //   if (this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].showAppointee.value==true ) {
  //     this.nomineeDetail.controls['aName'].patchValue(this.nomineeDetail.controls['aName'].value);
  //     this.nomineeDetail.controls['aGender'].patchValue(this.nomineeDetail.controls['aGender'].value);
  //     this.nomineeDetail.controls['appointeeDob'].patchValue(this.nomineeDetail.controls['appointeeDob'].value);
  //     this.nomineeDetail.controls['relationToInsured'].patchValue(this.nomineeDetail.controls['aRelation'].value);
  //
  //     this.nomineeDetail.controls['aName'].setValidators([Validators.required]);
  //     this.nomineeDetail.controls['aGender'].setValidators([Validators.required]);
  //     this.nomineeDetail.controls['appointeeDob'].setValidators([Validators.required]);
  //     this.nomineeDetail.controls['relationToInsured'].setValidators([Validators.required]);
  //
  //   } else {
  //     this.nomineeDetail.controls['aName'].patchValue('');
  //     this.nomineeDetail.controls['aGender'].patchValue('');
  //     this.nomineeDetail.controls['appointeeDob'].patchValue('');
  //     this.nomineeDetail.controls['relationToInsured'].patchValue('');
  //
  //
  //     this.nomineeDetail.controls['aName'].setValidators(null);
  //     this.nomineeDetail.controls['aGender'].setValidators(null);
  //     this.nomineeDetail.controls['appointeeDob'].setValidators(null);
  //     this.nomineeDetail.controls['relationToInsured'].setValidators(null);
  //
  //   }
  //   this.nomineeDetail.controls['aName'].updateValueAndValidity();
  //   this.nomineeDetail.controls['aGender'].updateValueAndValidity();
  //   this.nomineeDetail.controls['appointeeDob'].updateValueAndValidity();
  //   this.nomineeDetail.controls['relationToInsured'].updateValueAndValidity();
  //
  // }


  // Personal Details
  proposerDetails(stepper: MatStepper, value) {
    this.personalData = value;
    sessionStorage.stepper1Details = '';
    sessionStorage.stepper1Details = JSON.stringify(value);
    console.log(this.proposer, 'proposer');
    if (this.proposer.valid) {
      if (sessionStorage.proposerAge >= 18) {
          this.sameAsInsure();
          stepper.next();
      } else {
        this.toastr.error('Proposer Age should be 18 or above');

      }

    }
  }
  // Insure Details
  edelweissInsureDetails(stepper: MatStepper, value) {
    sessionStorage.stepper2Details = '';
    sessionStorage.stepper2Details = JSON.stringify(value);
    console.log(this.insureArray, 'insureArray');
    console.log(this.insureArray.valid, 'this.valid');
    // let dateErrorMsg = [];
    if (this.insureArray.valid) {
      if (sessionStorage.proposerAge >= 18) {
      stepper.next();
      this.topScroll();
      } else {
        this.toastr.error('Insurer Age should be 18 or above');

      }
    }

  }



  // nominee details
  nomineeDetailNext(stepper, value) {
    console.log(value);
    sessionStorage.stepper3Details = JSON.stringify(value);
    console.log(this.nomineeDetail.valid, 'this.nomineeDetail.valid');
    console.log(this.nomineeDetail.get('itemsNominee')['controls'].length,'length');

    // nomineeAge validate
    let nomineeValid = true;
    if (sessionStorage.nomineAge != '' && sessionStorage.nomineAge != undefined) {
      if (sessionStorage.nomineAge <= 18) {
        nomineeValid = false;
      }
    }
    // appointeeAge validatate
    let appointeeAge = false;
    if (sessionStorage.appointeeAge != '' && sessionStorage.appointeeAge != undefined) {
      if (sessionStorage.appointeeAge >= 18) {
        appointeeAge = true;
      }
    }

    // nominee 2 age validation
    let nominee2ageval;
    for (let i=0; i < this.nomineeDetail.get('itemsNominee')['controls'].length; i++) {
      if ( this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nomineeAgeVal.value == 1) {
        nominee2ageval = true;
      } else {
        nominee2ageval = false;
      }
    }
    console.log(nomineeValid, 'nomineeVLID');
    if (this.nomineeDetail.valid) {

        if (!nomineeValid) {
          if (!nominee2ageval) {
            if (appointeeAge) {
              if (this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].aName.value != '' && this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].appointeeDob.value != '' && this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].relationToInsured.value != '' && this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].aGender.value != '') {
                stepper.next();
                this.topScroll();
              } else {
                this.toastr.error('Please fill the appointee details');
              }
            } else {
              this.toastr.error('Appointee Age should be greater than 18.');
            }
          } else {
            this.toastr.error('Nominee Age should be greater than 18.');

          }

        } else {
          stepper.next();
          this.topScroll();
        }


    }
  }

  // bank detail proposal
  bankDetails(stepper: MatStepper, value) {
    sessionStorage.stepper4Details = '';
    sessionStorage.stepper4Details = JSON.stringify(value);
    console.log( sessionStorage.stepper4Details);
    if (this.bankDetail.valid) {
      console.log(this.bankDetail.valid,'bankDetailvalid')

      this.proposal(stepper);
    }
  }

  othrhighQualify() {

    if (this.proposer.controls['highestQualification'].value == '8') {
      this.proposer.controls['otherQualification'].patchValue(this.proposer.controls['otherQualification'].value);

      this.proposer.controls['otherQualification'].setValidators([Validators.required]);
    } else {
      this.proposer.controls['otherQualification'].patchValue('');

      this.proposer.controls['otherQualification'].setValidators(null);

    }
    this.proposer.controls['otherQualification'].updateValueAndValidity();

  }

  othrhighQualify1() {

    if (this.insureArray.controls['highestQualification'].value == '8') {
      this.insureArray.controls['otherQualification'].patchValue(this.insureArray.controls['otherQualification'].value);

      this.insureArray.controls['otherQualification'].setValidators([Validators.required]);
    } else {
      this.insureArray.controls['otherQualification'].patchValue('');

      this.insureArray.controls['otherQualification'].setValidators(null);

    }
    this.insureArray.controls['otherQualification'].updateValueAndValidity();

  }

  employmentTypereq() {

    if (this.proposer.controls['employementType'].value == '9') {
      this.proposer.controls['employementTypeOther'].patchValue(this.proposer.controls['employementTypeOther'].value);

      this.proposer.controls['employementTypeOther'].setValidators([Validators.required]);
    } else {
      this.proposer.controls['employementTypeOther'].patchValue('');

      this.proposer.controls['employementTypeOther'].setValidators(null);

    }
    this.proposer.controls['employementTypeOther'].updateValueAndValidity();

  }

  employmentTypereq1() {

    if (this.insureArray.controls['employementType'].value == '9') {
      this.insureArray.controls['employementTypeOther'].patchValue(this.insureArray.controls['otherQualification'].value);

      this.insureArray.controls['employementTypeOther'].setValidators([Validators.required]);
    } else {
      this.insureArray.controls['employementTypeOther'].patchValue('');

      this.insureArray.controls['employementTypeOther'].setValidators(null);

    }
    this.insureArray.controls['employementTypeOther'].updateValueAndValidity();

  }

  isPolitical(event: any) {

    if (this.insureArray.controls['isPoliticallyExposed'].value == true) {
      this.insureArray.controls['specification'].patchValue(this.insureArray.controls['specification'].value);

      this.insureArray.controls['specification'].setValidators([Validators.required]);
    } else {
      this.insureArray.controls['specification'].patchValue('');

      this.insureArray.controls['specification'].setValidators(null);

    }
    this.insureArray.controls['specification'].updateValueAndValidity();

  }

  existingInsure() {


    if (this.bankDetail.controls['existingInsuranceInd'].value == true) {
      // for (let i=0; i < this.bankDetail['controls'].existingInsurance['controls'].length; i++) {
      //   console.log('ssssssss')
      //   if (i != 0) {
      //   }
      //   this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].policyNo.patchValue(this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].policyNo.value);
      //   this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].companyName.patchValue(this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].companyName.value);
      //   this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].yearOfIssue.patchValue(this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].yearOfIssue.value);
      //   this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].sumAssured.patchValue(this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].sumAssured.value);
      //   this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].annualizedPremium.patchValue(this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].annualizedPremium.value);
      //   this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].policyStatus.patchValue(this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].policyStatus.value);
      // }
    } else {

      for (let i=0; i < this.bankDetail['controls'].existingInsurance['controls'].length; i++) {


        if ( i !=  0) {
        }
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].policyNo.patchValue('');
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].companyName.patchValue('');
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].yearOfIssue.patchValue('');
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].sumAssured.patchValue('');
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].annualizedPremium.patchValue('');
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].policyStatus.patchValue('');
      }

    }
  }

  existingInsureReq() {
    console.log(this.bankDetail['controls'].existingInsurance['controls'].length,'value');
    if (this.bankDetail.controls['existingInsuranceInd'].value == true) {
      console.log('sharmila')

      for (let i=0; i < this.bankDetail['controls'].existingInsurance['controls'].length; i++) {
        console.log('ssssssss')
        if (i != 0) {
        }
        // this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].policyNo.patchValue(this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].policyNo.value );
        // this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].companyName.patchValue(this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].companyName.value );
        // this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].yearOfIssue.patchValue(this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].yearOfIssue.value );
        // this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].sumAssured.patchValue(this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].sumAssured.value );
        // this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].annualizedPremium.patchValue(this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].annualizedPremium.value );
        // this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].policyStatus.patchValue(this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].policyStatus.value );

        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].policyNo.setValidators([Validators.required]);
              this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].companyName.setValidators([Validators.required]);
              this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].yearOfIssue.setValidators([Validators.required]);
              this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].sumAssured.setValidators([Validators.required]);
              this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].annualizedPremium.setValidators([Validators.required]);
              this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].policyStatus.setValidators([Validators.required]);
      }

    } else if (this.bankDetail.controls['existingInsuranceInd'].value == false) {
      console.log('ggggggggggg')
      for (let i=0; i < this.bankDetail['controls'].existingInsurance['controls'].length; i++) {

        if ( i !=  0) {
        }
              this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].policyNo.patchValue('');
              this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].companyName.patchValue('');
              this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].yearOfIssue.patchValue('');
              this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].sumAssured.patchValue('');
              this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].annualizedPremium.patchValue('');
              this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].policyStatus.patchValue('');

        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].policyNo.setValidators(null);
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].companyName.setValidators(null);
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].yearOfIssue.setValidators(null);
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].sumAssured.setValidators(null);
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].annualizedPremium.setValidators(null);
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].policyStatus.setValidators(null);
      }



    }
    for (let i=0; i < this.bankDetail['controls'].existingInsurance['controls'].length; i++) {

      if ( i !=  0) {
      }
          this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].policyNo.updateValueAndValidity();
          this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].companyName.updateValueAndValidity();
          this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].yearOfIssue.updateValueAndValidity();
          this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].sumAssured.updateValueAndValidity();
          this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].annualizedPremium.updateValueAndValidity();
          this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].policyStatus.updateValueAndValidity();
    }


  }


  appointeeAgeValid(event: any, i) {
    if (this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].showAppointee.value == true && i == 0) {
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aName.patchValue(this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aName.value );
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].appointeeDob.patchValue(this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].appointeeDob.value );
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aGender.patchValue(this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aGender.value );
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].relationToInsured.patchValue(this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].relationToInsured.value );




      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aName.setValidators([Validators.required]);
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].appointeeDob.setValidators([Validators.required]);
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aGender.setValidators([Validators.required]);
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].relationToInsured.setValidators([Validators.required]);

    } else {
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aName.patchValue('');
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].appointeeDob.patchValue('');
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aGender.patchValue('');
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].relationToInsured.patchValue('');


      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aName.setValidators(null);
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].appointeeDob.setValidators(null);
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aGender.setValidators(null);
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].relationToInsured.setValidators(null);


    }
    this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aName.updateValueAndValidity();
    this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].appointeeDob.updateValueAndValidity();
    this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aGender.updateValueAndValidity();
    this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].relationToInsured.updateValueAndValidity();


  }


  isInsureAccNo() {

    if (this.insureArray.controls['insureAccNo'].value == 'Yes'  && this.insureArray.controls['einsureAccNo'].value == 'No') {
      this.insureArray.controls['provideAccNo'].patchValue(this.insureArray.controls['provideAccNo'].value);
      this.insureArray.controls['epolicy'].patchValue(this.insureArray.controls['epolicy'].value);

      this.insureArray.controls['provideAccNo'].setValidators([Validators.required]);
      this.insureArray.controls['epolicy'].setValidators([Validators.required]);

    } else {
      this.insureArray.controls['provideAccNo'].patchValue('');
      this.insureArray.controls['epolicy'].patchValue('');
      this.insureArray.controls['einsureAccNo'].patchValue('');

    }

      if (this.insureArray.controls['insureAccNo'].value == 'No') {
      this.insureArray.controls['einsureAccNo'].patchValue(this.insureArray.controls['einsureAccNo'].value);
      this.insureArray.controls['einsureAccNo'].setValidators([Validators.required]);


      if ( this.insureArray.controls['insureAccNo'].value == 'No'  && this.insureArray.controls['einsureAccNo'].value == 'Yes') {
        this.insureArray.controls['epolicy1'].patchValue(this.insureArray.controls['epolicy1'].value);
        this.insureArray.controls['insureRepository'].patchValue(this.insureArray.controls['insureRepository'].value);

        this.insureArray.controls['epolicy1'].setValidators([Validators.required]);
        this.insureArray.controls['insureRepository'].setValidators([Validators.required]);
      } else {
        this.insureArray.controls['epolicy1'].patchValue('');
        this.insureArray.controls['insureRepository'].patchValue('');

        this.insureArray.controls['provideAccNo'].setValidators(null);
        this.insureArray.controls['epolicy'].setValidators(null);
        this.insureArray.controls['einsureAccNo'].setValidators(null);
        this.insureArray.controls['epolicy1'].setValidators(null);
        this.insureArray.controls['insureRepository'].setValidators(null);
      }
    }
    this.insureArray.controls['provideAccNo'].updateValueAndValidity();
    this.insureArray.controls['epolicy'].updateValueAndValidity();
    this.insureArray.controls['einsureAccNo'].updateValueAndValidity();
    this.insureArray.controls['epolicy1'].updateValueAndValidity();
    this.insureArray.controls['insureRepository'].updateValueAndValidity();

  }

  // proposal creation

  proposal(stepper) {
    console.log( 'proposal');

    let nomineeDetails = [];
    for (let i = 0; i < this.nomineeDetail.value.itemsNominee.length; i++) {
      nomineeDetails.push({
        "name": this.nomineeDetail.value.itemsNominee[i].nomineeName,
        "gender": this.nomineeDetail.value.itemsNominee[i].gender,
        "dob": this.datepipe.transform(this.nomineeDetail.value.itemsNominee[i].nDob, 'y-MM-dd'),
        "relation": this.nomineeDetail.value.itemsNominee[i].nomineeRelationship,
        "allocation": "",
        "appointee": {
        "name": this.nomineeDetail.value.itemsNominee[i].aName,
        "dob": this.datepipe.transform(this.nomineeDetail.value.itemsNominee[i].appointeeDob, 'y-MM-dd') == null ? '' : this.datepipe.transform(this.nomineeDetail.value.itemsNominee[i].appointeeDob, 'y-MM-dd'),
        "relation": this.nomineeDetail.value.itemsNominee[i].relationToInsured,
        "gender": this.nomineeDetail.value.itemsNominee[i].aGender
        }
      });
    }
    const data = {
      "user_id": this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      "role_id": this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      "pos_status":  this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
      "platform": "web",
      "product_id": this.lifePremiumList.product_id,
      "suminsured_amount": sessionStorage.selectedAmountTravel,
      "policy_id": this.getEnquiryDetials.policy_id,
      "productDetails":{
        "policyTerm":this.enquiryFormData.lifeBenefitTerm,
        "premiumPayingTerm":this.enquiryFormData.lifePolicy,
        "frequency":this.enquiryFormData.lifePayment,
        "sumAssured": sessionStorage.selectedAmountTravel,
      },
      "isLAProposerSame":"",
      "LifeAssured": {
        "nomineeData": nomineeDetails,
        // [
        //   {
        //     "nomineeNumber":"",
        //     "name":"",
        //     "dob":"",
        //     "gender":"",
        //     "relation":"",
        //     "allocation":"",
        //     "appointee":{
        //       "name":"",
        //       "dob":"",
        //       "relation":"",
        //       "gender":""
        //     }
        //   }
        // ],
        "title": this.insureArray.controls['title'].value,
        "firstName": this.insureArray.controls['firstName'].value,
        "middleName": this.insureArray.controls['midName'].value,
        "lastName": this.insureArray.controls['lastName'].value,
        "dob": this.datepipe.transform(this.insureArray.controls['dob'].value, 'y-MM-dd'),
        "gender": this.insureArray.controls['gender'].value,
        "isSmoker":"Y",
        "maritalStatus": this.insureArray.controls['maritalStatus'].value,
        "pan": this.insureArray.controls['pan'].value,
        "maidName":"",
        "motherMaidName":"",
        "FHName":this.insureArray.controls['fatherhusbandName'].value,
        "nationality":this.insureArray.controls['nationality'].value,
        "otherNationality":"",
        "ageProofId":this.insureArray.controls['ageProofId'].value,
        "emailId":this.insureArray.controls['emailId'].value,
        "phoneNo":this.insureArray.controls['mobileNo'].value,
        "ResidencePhoneNo":"",
        "currAddr1":this.insureArray.controls['currAddr1'].value,
        "currAddr2":this.insureArray.controls['currAddr2'].value,
        "currAddr3":this.insureArray.controls['currAddr3'].value,
        "currPincode":this.insureArray.controls['currPincode'].value,
        "currState":this.insureArray.controls['currState'].value,
        "currCity":this.insureArray.controls['currCity'].value,
        "perAddr1":this.insureArray.controls['perAddr1'].value,
        "perAddr2":this.insureArray.controls['perAddr2'].value,
        "perAddr3":this.insureArray.controls['perAddr3'].value,
        "perPincode":this.insureArray.controls['perPincode'].value,
        "perState":this.insureArray.controls['perState'].value,
        "perCity":this.insureArray.controls['perCity'].value,
        "isCurrPerAddrSame":this.insureArray.controls['isCurrPerAddrSame'].value,
        "isPerAddrIsCorrAddr":"",
        "education":"",
        "otherEducation":"",
        "highestQualification":this.insureArray.controls['highestQualification'].value,
        "otherQualification":this.insureArray.controls['otherQualification'].value,
        "collegeNameLoc":"",
        "employementType":this.insureArray.controls['employementType'].value,
        "employementTypeOther":this.insureArray.controls['employementTypeOther'].value,
        "employerName":this.insureArray.controls['employerName'].value,
        "employerAddr":this.insureArray.controls['employerAddr'].value,
        "designation":"",
        "natureOfDuty":this.insureArray.controls['naturedutyName'].value,
        "experienceInYears":"",
        "occupationType":"",
        "noOfEmployees":"",
        "natureOfBusiness":"",
        "annualIncome":this.insureArray.controls['annualIncome'].value,
        "isIncomeSource":"",
        "incomeSourceDetails":"",
        "familyDiease_Ind":this.insureArray.controls['insureHistory'].value ? 'Y' : 'N',
        "familyDiease_Details":"",
        "hasfamilyAppliedETLI":"",
        "otherPolicy_Ind":"",
        "otherPolicy_InsurerName":"",
        "otherPolicy_OtherInsurerName":"",
        "otherPolicy_Reason":"",
        "otherPolicy_Date":"",
        "CIB_Ind":"",
        "CIB_InsurerName":"",
        "CIB_Reason":"",
        "CIB_Date":"",
        "isPEP":this.insureArray.controls['isPoliticallyExposed'].value ? 'Yes' : 'No',
        "pepReason":this.insureArray.controls['specification'].value,
        "hasFamPhysician":"",
        "FamPhysicianName":"",
        "FamPhysicianAddr1":"",
        "FamPhysicianAddr2":"",
        "FamPhysicianPhone":"",
        "identityProof":this.insureArray.controls['identityProof'].value,
        "ageProof":this.insureArray.controls['ageProofId'].value,
        "otherAgeProof":"",
        "addrProof":this.insureArray.controls['addrProof'].value,
        "corrAddrProof":"",
        "incomeProof":"",
        "hasEIAccount":this.insureArray.controls['insureAccNo'].value,
        "EIAccountNo":this.insureArray.controls['einsureAccNo'].value ,
        "applyEIAccount":this.insureArray.controls['provideAccNo'].value,
        "EIARepository":this.insureArray.controls['insureRepository'].value,
        "wantEPolicy":this.insureArray.controls['epolicy'].value  ,
        "relationLAProposer":this.insureArray.controls['investing'].value,
        "height":"",
        "heightFeets":this.insureArray.controls['heightFeets'].value,
        "heightInches":this.insureArray.controls['heightInches'].value,
        "heightCentimeters":"",
        "weight":this.insureArray.controls['weight'].value,
        "hasWeightChanged":"",
        "weightChange":"",
        "weightChangeReason":"",
        "isStaff":"",
        "employeeCode":"",
        "isHospitalized":"",
        "hospitalizedDate":"",
        "isRecovered":"",
        "nonRecoveryDetails":"",
        "isTaxResOfIndia":this.insureArray.controls['taxResidence'].value,
        "aadhaarNo":this.insureArray.controls['aadhaarNo'].value,
        "questionnaires":{
          "medicationInd":this.insureArray.controls['medicalTreatment'].value ? 'Y' : 'N',
          "diagnosedInd":this.insureArray.controls['receivedTreatment1'].value ? 'Y' : 'N',
          "aidsInd":this.insureArray.controls['receivedTreatment2'].value ? 'Y' : 'N',
        },
        "bank":{
          "accountNo":this.bankDetail.controls['accountNo'].value,
          "name":this.bankDetail.controls['name'].value,
          "location":this.bankDetail.controls['location'].value,
          "ifscCode":this.bankDetail.controls['ifscCode'].value,
          "investmentStrategy":this.bankDetail.controls['investmentStrategy'].value,
        },
        "existingInsurance_Ind":this.bankDetail.controls['existingInsuranceInd'].value ? 'Yes' : 'No',
        "existingInsurance": this.bankDetail.value.existingInsurance,
        //     [
        //   {
        //     "policyNo":"",
        //     "companyName":"",
        //     "yearOfIssue":"",
        //     "sumAssured":"",
        //     "annualizedPremium":"",
        //     "policyStatus":"",
        //     "acceptanceTerm":""
        //   }
        // ]
      },
      "Spouse":"",
      "Proposer":{
        "title":this.proposer.controls['title'].value,
        "firstName":this.proposer.controls['firstName'].value,
        "middleName":this.proposer.controls['midName'].value,
        "lastName":this.proposer.controls['lastName'].value,
        "dob":this.datepipe.transform(this.proposer.controls['dob'].value, 'y-MM-dd'),
        "gender":this.proposer.controls['gender'].value,
        "isSmoker":"",
        "maritalStatus":this.proposer.controls['maritalStatus'].value,
        "pan":this.proposer.controls['pan'].value,
        "maidName":"",
        "motherMaidName":"",
        "FHName":this.proposer.controls['fatherhusbandName'].value,
        "nationality":this.proposer.controls['nationality'].value,
        "otherNationality":"",
        "ageProofId":this.proposer.controls['ageProofId'].value,
        "emailId":this.proposer.controls['emailId'].value,
        "phoneNo":this.proposer.controls['mobileNo'].value,
        "ResidencePhoneNo":"",
        "alternate_cnt_no":"",
        "currAddr1":this.proposer.controls['currAddr1'].value,
        "currAddr2":this.proposer.controls['currAddr2'].value,
        "currAddr3":this.proposer.controls['currAddr3'].value ? this.proposer.controls['currAddr3'].value : '',
        "currPincode":this.proposer.controls['currPincode'].value,
        "currState":this.proposer.controls['currState'].value,
        "currCity":this.proposer.controls['currCity'].value,
        "perAddr1":this.proposer.controls['perAddr1'].value,
        "perAddr2":this.proposer.controls['perAddr2'].value,
        "perAddr3":this.proposer.controls['perAddr3'].value,
        "perPincode":this.proposer.controls['perPincode'].value,
        "perState":this.proposer.controls['perState'].value,
        "perCity":this.proposer.controls['perCity'].value,
        "isCurrPerAddrSame":this.proposer.controls['isCurrPerAddrSame'].value,
        "isPerAddrIsCorrAddr":"Y",
        "education":"2",
        "otherEducation":"",
        "highestQualification":this.proposer.controls['highestQualification'].value,
        "otherQualification":this.proposer.controls['otherQualification'].value,
        "collegeNameLoc":"DJTI Mumbai",
        "course":"",
        "courseDuration":"",
        "courseYear":"",
        "studentInstruction":"",
        "employementType":this.proposer.controls['employementType'].value,
        "employementTypeOther":this.proposer.controls['employementTypeOther'].value,
        "employerName":this.proposer.controls['employerName'].value,
        "employerAddr":this.proposer.controls['employerAddr'].value,
        "designation":"Senior Executive officer",
        "natureOfDuty":this.proposer.controls['natureduty'].value,
        "experienceInYears":"",
        "occupationType":"",
        "noOfEmployees":"",
        "natureOfBusiness":"",
        "annualIncome":this.proposer.controls['annualIncome'].value,
        "isIncomeSource":"",
        "incomeSourceDetails":"",
        "familyDiease_Ind":"",
        "familyDiease_Details":"",
        "hasfamilyAppliedETLI":"",
        "otherPolicy_Ind":"",
        "otherPolicy_InsurerName":"",
        "otherPolicy_OtherInsurerName":"",
        "otherPolicy_Reason":"",
        "otherPolicy_Date":"",
        "CIB_Ind":"",
        "CIB_InsurerName":"",
        "CIB_Reason":"",
        "CIB_Date":"",
        "isPEP":"",
        "pepReason":"",
        "hasFamPhysician":"",
        "FamPhysicianName":"",
        "FamPhysicianAddr1":"",
        "FamPhysicianAddr2":"",
        "FamPhysicianPhone":"",
        "identityProof":"",
        "ageProof":"",
        "otherAgeProof":"",
        "addrProof":"",
        "corrAddrProof":"",
        "incomeProof":"",
        "incomeProofText":"",
        "isCA":"",
        "hasEIAccount":"",
        "EIAccountNo":"",
        "applyEIAccount":"",
        "EIARepository":"",
        "wantEPolicy":"",
        "relationLAProposer":"",
        "relationLAProposerText":"",
        "height":"",
        "heightFeets":"",
        "heightInches":"",
        "heightCentimeters":"",
        "weight":"",
        "clientId":"",
        "hasWeightChanged":"",
        "weightChange":"",
        "weightChangeReason":"",
        "isTaxResOfIndia":this.proposer.controls['taxResidence'].value,
        "aadhaarNo":this.proposer.controls['aadhaarNo'].value,
        "questionnaires":{
          "medicationInd":"",
          "diagnosedInd":"",
          "aidsInd":""
        },
        "bank":{
          "accountNo":"",
          "name":"",
          "location":"",
          "ifscCode":"",
          "investmentStrategy":""
        },
        "existingInsurance_Ind":"",
        "existingInsurance":[
          {
            "policyNo":"",
            "companyName":"",
            "yearOfIssue":"",
            "sumAssured":"",
            "annualizedPremium":"",
            "policyStatus":"",
            "acceptanceTerm":""
          }
        ],
        "familyIncomeData":""
      }

      }

    console.log(data, ' fileeee');
    this.settings.loadingSpinner = true;
    this.termService.edelweissProposalCreation(data).subscribe(
        (successData) => {
          this.setEdelProposalSuccess(successData, stepper);
        },
        (error) => {
          this.setEdelProposalFailure(error);
        }
    );

  }
  public setEdelProposalSuccess(successData, stepper) {
    this.settings.loadingSpinner = false;
    if (successData.IsSuccess == true) {
      stepper.next();
      this.topScroll();
      this.toastr.success('BI Genereated successfully!!');
      this.summaryData = successData.ResponseObject;
      this.requestedUrl = this.summaryData.payment_link;
      sessionStorage.summaryData = JSON.stringify(this.summaryData);
      this.proposalId = this.summaryData.ProposalId;
      this.proposerFormData = this.proposer.value;
      this.bankFormData = this.bankDetail.value;
      this.nomineeFormData = this.nomineeDetail.value.itemsNominee;
      this.insuredFormData = this.insureArray.value;
      sessionStorage.proposerFormData = JSON.stringify(this.proposerFormData);
      sessionStorage.insuredFormData = JSON.stringify(this.insuredFormData);
      sessionStorage.bankFormData = JSON.stringify(this.bankFormData);
      sessionStorage.nomineeFormData = JSON.stringify(this.nomineeFormData);
      sessionStorage.edelweiss_term_life_id = this.proposalId;
      // this.downloadFile(this.requestedUrl);

      console.log(this.proposerFormData, 'proposerFormData');
      console.log(this.insuredFormData,'insuredFormData');
      console.log(this.bankFormData,'bankFormData');
      console.log(this.nomineeFormData,'nomineeFormData');
    } else {
      this.toastr.error(successData.ErrorObject);
    }
  }
  public setEdelProposalFailure(error) {
  }


// Services

  geteTitle() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.geteTitle(data).subscribe(
        (successData) => {
          this.geteTitleSuccess(successData);
        },
        (error) => {
          this.geteTitleFailure(error);
        }
    );
  }

  public geteTitleSuccess(successData) {
    if (successData.IsSuccess) {
      this.etitle = successData.ResponseObject;
    }
  }

  public geteTitleFailure(error) {
  }

  geteGender() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.geteGender(data).subscribe(
        (successData) => {
          this.geteGenderSuccess(successData);
        },
        (error) => {
          this.geteGenderFailure(error);
        }
    );
  }

  public geteGenderSuccess(successData) {
    if (successData.IsSuccess) {
      this.egender = successData.ResponseObject;
    }
  }

  public geteGenderFailure(error) {
  }

  geteMaritalStatus() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.geteMaritalStatus(data).subscribe(
        (successData) => {
          this.geteMaritalStatusSuccess(successData);
        },
        (error) => {
          this.geteMaritalStatusFailure(error);
        }
    );
  }

  public geteMaritalStatusSuccess(successData) {
    if (successData.IsSuccess) {
      this.emaritalStatus = successData.ResponseObject;
    }
  }

  public geteMaritalStatusFailure(error) {
  }
  geteInvesting() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.geteInvesting(data).subscribe(
        (successData) => {
          this.geteInvestingSuccess(successData);
        },
        (error) => {
          this.geteInvestingFailure(error);
        }
    );
  }

  public geteInvestingSuccess(successData) {
    if (successData.IsSuccess) {
      this.einvesting = successData.ResponseObject;
    }
  }

  public geteInvestingFailure(error) {
  }
  setbdutyList() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.termService.bdutyListEdelweiss(data).subscribe(
        (successData) => {
          this.setRelationshipSuccess(successData);
        },
        (error) => {
          this.setRelationshipFailure(error);
        }
    );
  }

  public setRelationshipSuccess(successData) {
    if (successData.IsSuccess == true) {
      this.bduty = successData.ResponseObject;
      console.log(this.bduty,'fghdg')
    }


  }
  public setRelationshipFailure(error) {
  }
  getePremiumTerm() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.getePremiumTerm(data).subscribe(
        (successData) => {
          this.getePremiumTermSuccess(successData);
        },
        (error) => {
          this.getePremiumTermFailure(error);
        }
    );
  }

  public getePremiumTermSuccess(successData) {
    if (successData.IsSuccess) {
      this.ePremiumTerm = successData.ResponseObject;
    }
  }

  public getePremiumTermFailure(error) {
  }
  getePolicyTerm() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.getePolicyTerm(data).subscribe(
        (successData) => {
          this.getePolicyTermSuccess(successData);
        },
        (error) => {
          this.getePolicyTermFailure(error);
        }
    );
  }

  public getePolicyTermSuccess(successData) {
    if (successData.IsSuccess) {
      this.policyTermList = successData.ResponseObject;
    }
  }

  public getePolicyTermFailure(error) {
  }
  getPremiumList() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.getPremiumList(data).subscribe(
        (successData) => {
          this.getPremiumSuccess(successData);
        },
        (error) => {
          this.getPremiumFailure(error);
        }
    );
  }

  public getPremiumSuccess(successData) {
    if (successData.IsSuccess) {
      this.payingTermList = successData.ResponseObject;
    }
  }

  public getPremiumFailure(error) {
  }
  geteFrequency() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.geteFrequency(data).subscribe(
        (successData) => {
          this.geteFrequencySuccess(successData);
        },
        (error) => {
          this.geteFrequencyFailure(error);
        }
    );
  }

  public geteFrequencySuccess(successData) {
    if (successData.IsSuccess) {
      this.frequencyList = successData.ResponseObject;
    }
  }

  public geteFrequencyFailure(error) {
  }

  geteStaff() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.geteStaff(data).subscribe(
        (successData) => {
          this.geteStaffSuccess(successData);
        },
        (error) => {
          this.geteStaffFailure(error);
        }
    );
  }

  public geteStaffSuccess(successData) {
    if (successData.IsSuccess) {
      this.staffList = successData.ResponseObject;
    }
  }

  public geteStaffFailure(error) {
  }

  geteAgeProof() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.geteAgeProof(data).subscribe(
        (successData) => {
          this.geteAgeProofSuccess(successData);
        },
        (error) => {
          this.geteAgeProofFailure(error);
        }
    );
  }

  public geteAgeProofSuccess(successData) {
    if (successData.IsSuccess) {
      this.eAgeProof = successData.ResponseObject;
    }
  }

  public geteAgeProofFailure(error) {
  }

  geteIdProof() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.geteIdProof(data).subscribe(
        (successData) => {
          this.geteIdProofSuccess(successData);
        },
        (error) => {
          this.geteIdProofFailure(error);
        }
    );
  }

  public geteIdProofSuccess(successData) {
    if (successData.IsSuccess) {
      this.eIdProof = successData.ResponseObject;
    }
  }

  public geteIdProofFailure(error) {
  }

  // getPostal(pin, title) {
  //   const data = {
  //     'platform': 'web',
  //     'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
  //     'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
  //     'pincode': pin
  //   }
  //   if (pin.length == 6) {
  //     this.termService.getChecPincode(data).subscribe(
  //         (successData) => {
  //           this.pincodeListSuccess(successData, title);
  //         },
  //         (error) => {
  //           this.pincodeListFailure(error);
  //         }
  //     );
  //   }
  // }
  // public pincodeListSuccess(successData, title) {
  //   if (successData.IsSuccess) {
  //   } else {
  //     this.toastr.error('Invalid Pincode');
  //   }
  // }
  // public pincodeListFailure(error) {
  // }

  geteAddressProof() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.geteAddressProof(data).subscribe(
        (successData) => {
          this.geteAddressProofSuccess(successData);
        },
        (error) => {
          this.geteAddressProofFailure(error);
        }
    );
  }

  public geteAddressProofSuccess(successData) {
    if (successData.IsSuccess) {
      this.eAddressProof = successData.ResponseObject;
    }
  }

  public geteAddressProofFailure(error) {
  }
  geteQualification() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.geteQualification(data).subscribe(
        (successData) => {
          this.geteQualificationSuccess(successData);
        },
        (error) => {
          this.geteQualificationFailure(error);
        }
    );
  }

  public geteQualificationSuccess(successData) {
    if (successData.IsSuccess) {
      this.eQualification = successData.ResponseObject;
    }
  }

  public geteQualificationFailure(error) {
  }
  geteState() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.geteState(data).subscribe(
        (successData) => {
          this.geteStateSuccess(successData);
        },
        (error) => {
          this.geteStateFailure(error);
        }
    );
  }

  public geteStateSuccess(successData) {
    if (successData.IsSuccess) {
      this.eState = successData.ResponseObject;
    }
  }

  public geteStateFailure(error) {
  }
  geteemploymentType() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.geteemploymentType(data).subscribe(
        (successData) => {
          this.geteemploymentTypeSuccess(successData);
        },
        (error) => {
          this.geteemploymentTypeFailure(error);
        }
    );
  }

  public geteemploymentTypeSuccess(successData) {
    if (successData.IsSuccess) {
      this.eemploymentType = successData.ResponseObject;
    }
  }

  public geteemploymentTypeFailure(error) {
  }
  geteDuty() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.geteDuty(data).subscribe(
        (successData) => {
          this.geteDutySuccess(successData);
        },
        (error) => {
          this.geteDutyFailure(error);
        }
    );
  }

  public geteDutySuccess(successData) {
    if (successData.IsSuccess) {
      this.eDuty = successData.ResponseObject;
    }
  }

  public geteDutyFailure(error) {
  }
  geteHeightFeet() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.geteHeightFeet(data).subscribe(
        (successData) => {
          this.geteHeightFeetSuccess(successData);
        },
        (error) => {
          this.geteHeightFeetFailure(error);
        }
    );
  }

  public geteHeightFeetSuccess(successData) {
    if (successData.IsSuccess) {
      this.eHeightFeet = successData.ResponseObject;
    }
  }

  public geteHeightFeetFailure(error) {
  }
  geteHeightInches() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.geteHeightInches(data).subscribe(
        (successData) => {
          this.geteHeightInchesSuccess(successData);
        },
        (error) => {
          this.geteHeightInchesFailure(error);
        }
    );
  }

  public geteHeightInchesSuccess(successData) {
    if (successData.IsSuccess) {
      this.eHeightInches = successData.ResponseObject;
    }
  }

  public geteHeightInchesFailure(error) {
  }
  getePolicyCategory() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.getePolicyCategory(data).subscribe(
        (successData) => {
          this.getePolicyCategorySuccess(successData);
        },
        (error) => {
          this.getePolicyCategoryFailure(error);
        }
    );
  }

  public getePolicyCategorySuccess(successData) {
    if (successData.IsSuccess) {
      this.ePolicyCategory = successData.ResponseObject;
    }
  }

  public getePolicyCategoryFailure(error) {
  }
  geteNomineeRelation() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.geteNomineeRelation(data).subscribe(
        (successData) => {
          this.geteNomineeRelationSuccess(successData);
        },
        (error) => {
          this.geteNomineeRelationFailure(error);
        }
    );
  }

  public geteNomineeRelationSuccess(successData) {
    if (successData.IsSuccess) {
      this.eNomineeRelation = successData.ResponseObject;
    }
  }

  public geteNomineeRelationFailure(error) {
  }
  geteInsuranceRepository() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.geteInsuranceRepository(data).subscribe(
        (successData) => {
          this.geteInsuranceRepositorySuccess(successData);
        },
        (error) => {
          this.geteInsuranceRepositoryFailure(error);
        }
    );
  }

  public geteInsuranceRepositorySuccess(successData) {
    if (successData.IsSuccess) {
      this.eInsuranceRepository = successData.ResponseObject;
    }
  }

  public geteInsuranceRepositoryFailure(error) {
  }

  // session Data

  sessionData() {
    if (sessionStorage.stepper1Details != '' && sessionStorage.stepper1Details != undefined) {
      this.getStepper1 = JSON.parse(sessionStorage.stepper1Details);
      this.proposer = this.fb.group({

        title: this.getStepper1.title,
        titleName: this.getStepper1.titleName,
        firstName: this.getStepper1.firstName,
        midName: this.getStepper1.midName,
        lastName: this.getStepper1.lastName,
        gender: this.getStepper1.gender,
        dob: this.datepipe.transform(this.getStepper1.dob, 'y-MM-dd'),
        maritalStatus: this.getStepper1.maritalStatus,
        maritalStatusName: this.getStepper1.maritalStatusName,
        nationality: this.getStepper1.nationality,
        emailId: this.getStepper1.emailId,
        pan: this.getStepper1.pan,
        aadhaarNo: this.getStepper1.aadhaarNo,
        fatherhusbandName: this.getStepper1.fatherhusbandName,
        ageProofId: this.getStepper1.ageProofId,
          ageProofIdName: this.getStepper1.ageProofIdName,
        highestQualification: this.getStepper1.highestQualification,
        highestQualificationName: this.getStepper1.highestQualificationName,
        otherQualification: this.getStepper1.otherQualification,
        mobileNo: this.getStepper1.mobileNo,
        currAddr1: this.getStepper1.currAddr1,
        currAddr2: this.getStepper1.currAddr2,
        currAddr3: this.getStepper1.currAddr3,
        currPincode: this.getStepper1.currPincode,
        currState: this.getStepper1.currState,
        currCity: this.getStepper1.currCity,
        perAddr1: this.getStepper1.perAddr1,
        perAddr2: this.getStepper1.perAddr2,
        perAddr3: this.getStepper1.perAddr3,
        perPincode: this.getStepper1.perPincode,
        perState: this.getStepper1.perState,
        perCity: this.getStepper1.perCity,
        isCurrPerAddrSame: this.getStepper1.isCurrPerAddrSame,
        employementTypeOther: this.getStepper1.employementTypeOther,
        employementType: this.getStepper1.employementType,
          employementTypeName: this.getStepper1.employementTypeName,
        employerName: this.getStepper1.employerName,
        natureduty: this.getStepper1.natureduty,
          naturedutyName: this.getStepper1.naturedutyName,
        employerAddr: this.getStepper1.employerAddr,
        annualIncome: this.getStepper1.annualIncome,
        taxResidence: this.getStepper1.taxResidence,

      });

    }
    console.log(this.proposer, 'stepper1');

    if (sessionStorage.stepper2Details != '' && sessionStorage.stepper2Details != undefined) {
      this.getStepper2 = JSON.parse(sessionStorage.stepper2Details);
      this.insureArray = this.fb.group({

        investing: this.getStepper2.investing,
        title: this.getStepper2.title,
        titleName: this.getStepper2.titleName,
        firstName: this.getStepper2.firstName,
        midName: this.getStepper2.midName,
        lastName: this.getStepper2.lastName,
        gender: this.getStepper2.gender,
        dob: this.datepipe.transform(this.getStepper2.dob, 'y-MM-dd'),
        maritalStatus: this.getStepper2.maritalStatus,
        maritalStatusName: this.getStepper2.maritalStatusName,
        nationality: this.getStepper2.nationality,
        emailId: this.getStepper2.emailId,
        pan: this.getStepper2.pan,
        aadhaarNo: this.getStepper2.aadhaarNo,
        fatherhusbandName: this.getStepper2.fatherhusbandName,
        ageProofId: this.getStepper2.ageProofId,
          ageProofIdName: this.getStepper2.ageProofIdName,
        highestQualification: this.getStepper2.highestQualification,
        highestQualificationName: this.getStepper2.highestQualificationName,
        otherQualification: this.getStepper2.otherQualification,
        mobileNo: this.getStepper2.mobileNo,
        currAddr1: this.getStepper2.currAddr1,
        currAddr2: this.getStepper2.currAddr2,
        currAddr3: this.getStepper2.currAddr3,
        currPincode: this.getStepper2.currPincode,
        currState: this.getStepper2.currState,
        currCity: this.getStepper2.currCity,
        perAddr1: this.getStepper2.perAddr1,
        perAddr2: this.getStepper2.perAddr2,
        perAddr3: this.getStepper2.perAddr3,
        perPincode: this.getStepper2.perPincode,
        perState: this.getStepper2.perState,
        perCity: this.getStepper2.perCity,
        isCurrPerAddrSame: this.getStepper2.isCurrPerAddrSame,
        employementTypeOther: this.getStepper2.employementTypeOther,
        employementType: this.getStepper2.employementType,
          employementTypeName: this.getStepper2.employementTypeName,
        employerName: this.getStepper2.employerName,
        natureduty: this.getStepper2.natureduty,
          naturedutyName: this.getStepper2.naturedutyName,
        employerAddr: this.getStepper2.employerAddr,
        annualIncome: this.getStepper2.annualIncome,
        taxResidence: this.getStepper2.taxResidence,
        isPoliticallyExposed: this.getStepper2.isPoliticallyExposed,
        specification: this.getStepper2.specification,
        identityProof: this.getStepper2.identityProof,
        identityProofName: this.getStepper2.identityProofName,
        categorization: this.getStepper2.categorization,
        addrProof: this.getStepper2.addrProof,
        addrProofName: this.getStepper2.addrProofName,
        heightFeets: this.getStepper2.heightFeets,
        heightInches: this.getStepper2.heightInches,
        weight: this.getStepper2.weight,
        receivedTreatment1: this.getStepper2.receivedTreatment1,
        medicalTreatment: this.getStepper2.medicalTreatment,
        receivedTreatment2: this.getStepper2.receivedTreatment2,
        insureHistory: this.getStepper2.insureHistory,
        insureAccNo: this.getStepper2.insureAccNo,
        provideAccNo: this.getStepper2.provideAccNo,
        epolicy: this.getStepper2.epolicy,
        einsureAccNo: this.getStepper2.einsureAccNo,
        epolicy1: this.getStepper2.epolicy1,
        insureRepository: this.getStepper2.insureRepository,
        sameasreadonly: this.getStepper2.sameasreadonly,
        sameas: this.getStepper2.sameas,
        sameAsProposer: this.getStepper2.sameAsProposer,
        insurerDobValidError: this.getStepper2.insurerDobValidError,
        ins_days: this.getStepper2.ins_days,
        ins_age: this.getStepper2.ins_age,
        type: this.getStepper2.type,
      });
    }
    console.log(this.insureArray, ' stepper2 ');



    if (sessionStorage.stepper3Details!= '' && sessionStorage.stepper3Details != undefined) {
      let getStepper3 = JSON.parse(sessionStorage.stepper3Details);
      console.log(getStepper3.itemsNominee[0].nomineeName, ' patchval ');
      console.log(this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].nomineeName, ' nnName ');
      for (let i = 0; i < getStepper3.itemsNominee.length; i++) {
        this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nomineeName.patchValue(getStepper3.itemsNominee[i].nomineeName);
        this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nDob.patchValue(this.datepipe.transform(getStepper3.itemsNominee[i].nDob, 'y-MM-dd'));
        this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].gender.patchValue(getStepper3.itemsNominee[i].gender);
        this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nomineeRelationship.patchValue(getStepper3.itemsNominee[i].nomineeRelationship);
        this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nomineeRelationshipName.patchValue(getStepper3.itemsNominee[i].nomineeRelationshipName);
        this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nomineeDobValidError.patchValue(getStepper3.itemsNominee[i].nomineeDobValidError);
        this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].showAppointee.patchValue(getStepper3.itemsNominee[i].showAppointee);

        this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aName.patchValue(getStepper3.itemsNominee[i].aName);
        this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nomineeAgeVal.patchValue(getStepper3.itemsNominee[i].nomineeAgeVal);
        this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].appointeeDob.patchValue(this.datepipe.transform(getStepper3.itemsNominee[i].appointeeDob, 'y-MM-dd'));
        this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aGender.patchValue(getStepper3.itemsNominee[i].aGender);
        this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].appointeeDobValidError.patchValue(getStepper3.itemsNominee[i].appointeeDobValidError);
        this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].relationToInsured.patchValue(getStepper3.itemsNominee[i].relationToInsured);
      }
    }
    console.log(this.nomineeDetail, ' stepper3 ');






    if (sessionStorage.stepper4Details != '' && sessionStorage.stepper4Details != undefined) {
      let getStepper4 = JSON.parse(sessionStorage.stepper4Details);
      console.log(getStepper4,'step4');
      console.log(getStepper4.existingInsuranceInd,'indvalue');


      this.bankDetail.controls['existingInsuranceInd'].patchValue(getStepper4.existingInsuranceInd);
      // console.log(this.getStepper4.existingInsurance, ' getst2');

      console.log(getStepper4.existingInsurance.length,'lenght');
      for (let i=0; i < getStepper4.existingInsurance.length; i++) {
        if ( i !=  0) {
          this.addItems();
        }
        // this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].policyNo.patchValue(getStepper4['controls'].existingInsurance['controls'][i]['controls'].policyNo.value );
        // this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].companyName.patchValue(getStepper4['controls'].existingInsurance['controls'][i]['controls'].companyName.value );
        // this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].yearOfIssue.patchValue(getStepper4['controls'].existingInsurance['controls'][i]['controls'].yearOfIssue.value );
        // this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].sumAssured.patchValue(getStepper4['controls'].existingInsurance['controls'][i]['controls'].sumAssured.value );
        // this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].annualizedPremium.patchValue(getStepper4['controls'].existingInsurance['controls'][i]['controls'].annualizedPremium.value );
        // this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].policyStatus.patchValue(getStepper4['controls'].existingInsurance['controls'][i]['controls'].policyStatus.value );
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].policyNo.patchValue(getStepper4.existingInsurance[i].policyNo);
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].companyName.patchValue(getStepper4.existingInsurance[i].companyName);
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].yearOfIssue.patchValue(getStepper4.existingInsurance[i].yearOfIssue);
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].sumAssured.patchValue(getStepper4.existingInsurance[i].sumAssured);
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].annualizedPremium.patchValue(getStepper4.existingInsurance[i].annualizedPremium);
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].policyStatus.patchValue(getStepper4.existingInsurance[i].policyStatus);
      }

        this.bankDetail.controls['accountNo'].patchValue(getStepper4.accountNo);
        this.bankDetail.controls['name'].patchValue(getStepper4.name);
        this.bankDetail.controls['location'].patchValue(getStepper4.location);
        this.bankDetail.controls['ifscCode'].patchValue(getStepper4.ifscCode);
        this.bankDetail.controls['investmentStrategy'].patchValue(getStepper4.investmentStrategy);

      console.log(this.bankDetail,'bankDetail');
    }

      console.log(this.bankDetail, " stepper4 ");

  }
  changeTitle() {

    this.proposer.controls['titleName'].patchValue(this.etitle[this.proposer.controls['title'].value]);
  }
  changeTitle1() {
    this.insureArray.controls['titleName'].patchValue(this.etitle[this.insureArray.controls['title'].value]);
  }
    changeMarital() {
    this.proposer.controls['maritalStatusName'].patchValue(this.emaritalStatus[this.proposer.controls['maritalStatus'].value]);

    }
    changeMarital1() {
        this.insureArray.controls['maritalStatusName'].patchValue(this.emaritalStatus[this.insureArray.controls['maritalStatus'].value]);
    }
    ageProofName() {
        this.proposer.controls['ageProofIdName'].patchValue(this.eAgeProof[this.proposer.controls['ageProofId'].value]);
    }
    ageProofName1() {
        this.insureArray.controls['ageProofIdName'].patchValue(this.eAgeProof[this.insureArray.controls['ageProofId'].value]);
    }
  qualificationName() {
    this.proposer.controls['highestQualificationName'].patchValue(this.eQualification[this.proposer.controls['highestQualification'].value]);
  }
  qualificationName1() {
    this.insureArray.controls['highestQualificationName'].patchValue(this.eQualification[this.insureArray.controls['highestQualification'].value]);
  }
    employementTypeName() {
        this.proposer.controls['employementTypeName'].patchValue(this.eemploymentType[this.proposer.controls['employementType'].value]);
    }
    employementTypeName1() {
        this.insureArray.controls['employementTypeName'].patchValue(this.eemploymentType[this.insureArray.controls['employementType'].value]);
    }
    setbdutyListName() {
        this.proposer.controls['naturedutyName'].patchValue(this.bduty[this.proposer.controls['natureduty'].value]);
    }
    setbdutyListName1() {
        this.insureArray.controls['naturedutyName'].patchValue(this.bduty[this.insureArray.controls['natureduty'].value]);
    }
  idProofName() {
    this.insureArray.controls['identityProofName'].patchValue(this.eIdProof[this.insureArray.controls['identityProof'].value]);
  }
  addressProofName() {
    this.insureArray.controls['addrProofName'].patchValue(this.eAddressProof[this.insureArray.controls['addrProof'].value]);
  }
    geteNomineeRelationName(i)
  {

    this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nomineeRelationshipName.patchValue(this.eNomineeRelation[this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nomineeRelationship.value] )
  }



}
