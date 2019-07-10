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
          this.requestedUrl = summaryData.biUrlLink;
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
      title: '',
      firstName: '',
      midName: '',
      lastName: '',
      gender: ['', Validators.compose([Validators.required])],
      dob: ['', Validators.compose([Validators.required])],
      maritalStatus: ['', Validators.required],
      nationality: '',
      emailId: ['', Validators.compose([ Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
      pan: ['', Validators.compose([ Validators.minLength(10)])],
      aadhaarNo: '',
      fatherhusbandName: '',
      ageProofId: '',
      highestQualification: '',
      otherQualification: '',
      mobileNo: ['', Validators.compose([Validators.pattern('[6-9]\\d{9}')])],
      currAddr1: '',
      currAddr2: '',
      currAddr3: '',
      currPincode: '',
      currState: '',
      currCity: '',
      perAddr1: '',
      perAddr2: '',
      perAddr3: '',
      perPincode: '',
      perState: '',
      perCity: '',
      isCurrPerAddrSame: '',
      employementTypeOther: '',
      employementType: '',
      employerName: '',
      natureduty: '',
      employerAddr: '',
      annualIncome: '',
      taxResidence: '',

    });

    this.insureArray = this.fb.group({
      title: '',
      firstName: '',
      midName: '',
      lastName: '',
      gender: ['', Validators.compose([Validators.required])],
      dob: ['', Validators.compose([Validators.required])],
      maritalStatus: ['', Validators.required],

      nationality: '',
      emailId: ['', Validators.compose([ Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
      pan: ['', Validators.compose([ Validators.minLength(10)])],
      aadhaarNo: '',
      fatherhusbandName: '',
      ageProofId: '',
      highestQualification: '',
      otherQualification: '',
      mobileNo: ['', Validators.compose([Validators.pattern('[6-9]\\d{9}')])],

      currAddr1: '',
      currAddr2: '',
      currAddr3: '',
      currPincode: '',
      currState: '',
      currCity: '',
      perAddr1: '',
      perAddr2: '',
      perAddr3: '',
      perPincode: '',
      perState: '',
      perCity: '',
      isCurrPerAddrSame: '',
      employementTypeOther: '',
      employementType: '',
      employerName: '',
      natureduty: '',
      employerAddr: '',
      annualIncome: '',
      taxResidence: '',
      isPoliticallyExposed: false,
      specification: '',
      identityProof: '',
      categorization: '',
      addrProof: '',
      heightFeets: '',
      heightInches: '',
      weight: '',
      medicalTreatment: '',
      receivedTreatment1: '',
      receivedTreatment2: '',
      insureHistory: '',
      insureAccNo: '',
      provideAccNo: '',
      epolicy: '',
      einsureAccNo: '',
      epolicy1: '',
      insureRepository: '',
      sameAsProposer: false,

    });

    this.bankDetail = this.fb.group({
      accountNo: '',
      name: '',
      location: '',
      ifscCode: '',
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
          nomineeName: '',
          nDob: '',
          gender: '',
          nomineeRelationship: '',
          relationToInsured: '',
          aGender: '',
          appointeeDob: '',
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

  sameAsInsure() {

    if (this.insureArray.controls['sameAsProposer'].value == true) {

          this.insureArray.controls['title'].patchValue(this.proposer.controls['title'].value),
          this.insureArray.controls['firstName'].patchValue(this.proposer.controls['firstName'].value),
          this.insureArray.controls['midName'].patchValue(this.proposer.controls['midName'].value),
          this.insureArray.controls['lastName'].patchValue(this.proposer.controls['lastName'].value),
          this.insureArray.controls['gender'].patchValue(this.proposer.controls['gender'].value),
          this.insureArray.controls['dob'].patchValue(this.proposer.controls['dob'].value),
          this.insureArray.controls['maritalStatus'].patchValue(this.proposer.controls['maritalStatus'].value),
          this.insureArray.controls['nationality'].patchValue(this.proposer.controls['nationality'].value),
          this.insureArray.controls['emailId'].patchValue(this.proposer.controls['emailId'].value),
          this.insureArray.controls['pan'].patchValue(this.proposer.controls['pan'].value),
          this.insureArray.controls['aadhaarNo'].patchValue(this.proposer.controls['aadhaarNo'].value),
          this.insureArray.controls['fatherhusbandName'].patchValue(this.proposer.controls['fatherhusbandName'].value),
          this.insureArray.controls['ageProofId'].patchValue(this.proposer.controls['ageProofId'].value),
          this.insureArray.controls['highestQualification'].patchValue(this.proposer.controls['highestQualification'].value),
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
          this.insureArray.controls['perCity'].patchValue(this.proposer.controls['currState'].value),
          this.insureArray.controls['isCurrPerAddrSame'].patchValue(this.proposer.controls['isCurrPerAddrSame'].value),
          this.insureArray.controls['employementTypeOther'].patchValue(this.proposer.controls['employementTypeOther'].value),
          this.insureArray.controls['employementType'].patchValue(this.proposer.controls['employementType'].value),
          this.insureArray.controls['employerName'].patchValue(this.proposer.controls['employerName'].value),
          this.insureArray.controls['natureduty'].patchValue(this.proposer.controls['natureduty'].value),
          this.insureArray.controls['employerAddr'].patchValue(this.proposer.controls['employerAddr'].value),
          this.insureArray.controls['annualIncome'].patchValue(this.proposer.controls['annualIncome'].value),
          this.insureArray.controls['taxResidence'].patchValue(this.proposer.controls['taxResidence'].value)
          console.log(this.insureArray.controls['title'].value, 'ghghghj');
    } else {
          this.insureArray.controls['title'].patchValue(''),
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
          this.insureArray.controls['highestQualification'].patchValue(''),
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
      if ( i == 0){
        sessionStorage.nomineAge = this.getAge;
      }

      if ( i != 0){
        if(this.getAge < 18){
          this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nomineeAgeVal.patchValue(1);
          console.log(this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nomineeAgeVal.value,'nomineeagevalue');
        }else{
          this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nomineeAgeVal.patchValue(0);
          console.log(this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nomineeAgeVal.value,'nomineeagevalueelsee');
        }

      }
      console.log(this.getAge,'getaage');
      if (this.getAge < 18) {
        this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].showAppointee.patchValue(true);
        this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aName.setValidators([Validators.required]);
      } else {
        this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].showAppointee.patchValue(false);
        this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aName.setValidators(null);
        this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aName.patchValue('');
        this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].appointeeDob.patchValue('');
        this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].appointeeRelationToNominee.patchValue('');
        this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].relationToInsured.patchValue('');

      }
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



  // Personal Details
  proposerDetails(stepper: MatStepper, value) {
    this.personalData = value;
    sessionStorage.stepper1Details = '';
    sessionStorage.stepper1Details = JSON.stringify(value);
    console.log(this.proposer, 'proposer');
    if (this.proposer.valid) {
      if (sessionStorage.proposerAge >= 18) {
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



  // nomineeDetails
  nomineeDetailNext(stepper: MatStepper, value ) {
    sessionStorage.stepper4Details = '';
    sessionStorage.stepper4Details = JSON.stringify(value);
    console.log( sessionStorage.stepper4Details);
    // if (this.nomineeDetail.valid) {
    // //   const nomineeDetails = [];
    // //   this.nomineeData = value.itemsNominee;
    // //   console.log(this.nomineeData, 'nomineeData');
    // //   for (let i = 0; i < this.nomineeDetail.value.itemsNominee.length; i++) {
    // //     nomineeDetails.push({
    // //       'nomineeName': this.nomineeData.value.itemsNominee[i].nomineeName,
    // //       'gender': this.nomineeData.value.itemsNominee[i].gender,
    // //       'nDob': this.datepipe.transform(this.nomineeData.value.itemsNominee[i].nDob, 'y-MM-dd'),
    // //       'nomineeRelationship': this.nomineeData.value.itemsNominee[i].nomineeRelationship,
    // //       'aName': this.nomineeData.value.itemsNominee[i].aName,
    // //       'aGender': this.nomineeData.value.itemsNominee[i].aGender,
    // //       'appointeeDob': this.datepipe.transform(this.nomineeData.value.itemsNominee[i].appointeeDob, 'y-MM-dd') == null ? '' : this.datepipe.transform(this.nomineeDetails.value.itemsNominee[i].appointeeDob, 'y-MM-dd'),
    // //       'relationToInsured': this.nomineeData.value.itemsNominee[i].relationToInsured,
    //
    //     });
    //   }
      stepper.next();
    // }
  }

  // bank detail proposal
  bankDetails(stepper: MatStepper, value) {
    sessionStorage.stepper3Details = '';
    sessionStorage.stepper3Details = JSON.stringify(value);
    console.log( sessionStorage.stepper3Details);
    if (this.bankDetail.valid) {

      this.proposal(stepper);
    }
  }

  isPolitical(event: any) {

    if (this.proposer.controls['isPoliticallyExposed'].value == true) {
      this.proposer.controls['specification'].patchValue(this.proposer.controls['specification'].value);

      this.proposer.controls['specification'].setValidators([Validators.required]);
    } else {
      this.proposer.controls['specification'].patchValue('');

      this.proposer.controls['specification'].setValidators(null);

    }
    this.proposer.controls['specification'].updateValueAndValidity();

  }

  existingInsure() {


    if (this.bankDetail.controls['existingInsuranceInd'].value == true) {

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
    if (this.bankDetail.controls['existingInsuranceInd'].value == true) {

      for (let i = 0; i < this.bankDetail['controls'].existingInsurance['controls'].length; i++) {


        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].policyNo.setValidators([Validators.required]);
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].companyName.setValidators([Validators.required]);
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].yearOfIssue.setValidators([Validators.required]);
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].sumAssured.setValidators([Validators.required]);
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].annualizedPremium.setValidators([Validators.required]);
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].policyStatus.setValidators([Validators.required]);
      }

    } else {
      for (let i = 0; i <  this.bankDetail['controls'].nonelectricalAccess['controls'].length; i++) {


        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].policyNo.patchValue('');
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].companyName.patchValue('');
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].yearOfIssue.patchValue('');
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].sumAssured.patchValue('');
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].annualizedPremium.patchValue('');
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].policyStatus.patchValue('');
      }

    }
    for (let i = 0; i <  this.bankDetail['controls'].nonelectricalAccess['controls'].length; i++) {


      this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].policyNo.updateValueAndValidity();
      this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].companyName.updateValueAndValidity();
      this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].yearOfIssue.updateValueAndValidity();
      this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].sumAssured.updateValueAndValidity();
      this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].annualizedPremium.updateValueAndValidity();
      this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].policyStatus.updateValueAndValidity();
    }


  }

  guardianAgeValid(event: any) {
    if (this.nomineeDetail.controls['guardianList'].value == true) {
      this.nomineeDetail.controls['guardianName'].patchValue(this.nomineeDetail.controls['guardianName'].value);
      this.nomineeDetail.controls['guardianAge'].patchValue(this.nomineeDetail.controls['guardianAge'].value);
      this.nomineeDetail.controls['guardianRelationship'].patchValue(this.nomineeDetail.controls['guardianRelationship'].value);

      this.nomineeDetail.controls['guardianName'].setValidators([Validators.required]);
      this.nomineeDetail.controls['guardianAge'].setValidators([Validators.required]);
      this.nomineeDetail.controls['guardianRelationship'].setValidators([Validators.required]);
    } else {
      this.nomineeDetail.controls['guardianName'].patchValue('');
      this.nomineeDetail.controls['guardianAge'].patchValue('');
      this.nomineeDetail.controls['guardianRelationship'].patchValue('');

      this.nomineeDetail.controls['guardianName'].setValidators(null);
      this.nomineeDetail.controls['guardianAge'].setValidators(null);
      this.nomineeDetail.controls['guardianRelationship'].setValidators(null);

    }
    this.nomineeDetail.controls['guardianName'].updateValueAndValidity();
    this.nomineeDetail.controls['guardianAge'].updateValueAndValidity();
    this.nomineeDetail.controls['guardianRelationship'].updateValueAndValidity();

  }


  isInsureAccNo() {

    if (this.insureArray.controls['insureAccNo'].value == 'Y') {
      this.insureArray.controls['provideAccNo'].patchValue(this.insureArray.controls['provideAccNo'].value);
      this.insureArray.controls['epolicy'].patchValue(this.insureArray.controls['epolicy'].value);

      this.insureArray.controls['provideAccNo'].setValidators([Validators.required]);
      this.insureArray.controls['epolicy'].setValidators([Validators.required]);

    } else  if (this.insureArray.controls['insureAccNo'].value == 'N') {
      this.insureArray.controls['einsureAccNo'].patchValue(this.insureArray.controls['einsureAccNo'].value);
      if (this.insureArray.controls['einsureAccNo'].value == 'Y') {
        this.insureArray.controls['epolicy1'].patchValue(this.insureArray.controls['epolicy1'].value);
        this.insureArray.controls['insureRepository'].patchValue(this.insureArray.controls['insureRepository'].value);

      }

      this.insureArray.controls['einsureAccNo'].setValidators(null);
      this.insureArray.controls['epolicy1'].setValidators(null);
      this.insureArray.controls['insureRepository'].setValidators(null);

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

    const data = {
      "user_id": this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      "role_id": this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      "pos_status":  this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
      "platform": "web",
      "product_id": this.lifePremiumList.product_id,
      "suminsured_amount": sessionStorage.selectedAmountTravel,
      "policy_id": this.getEnquiryDetials.policy_id,
      "productDetails":{
        "policyTerm":"",
        "premiumPayingTerm":"",
        "frequency":"",
        "sumAssured":""
      },
      "isLAProposerSame":"",
      "LifeAssured": {
        "nomineeData": [
          {
            "nomineeNumber":"",
            "name":"",
            "dob":"",
            "gender":"",
            "relation":"",
            "allocation":"",
            "appointee":{
              "name":"",
              "dob":"",
              "relation":"",
              "gender":""
            }
          }
        ],
        "title":this.proposer.controls['personalFirstname'].value,
        "firstName":this.proposer.controls['personalFirstname'].value,
        "middleName":this.proposer.controls['personalFirstname'].value,
        "lastName":this.proposer.controls['personalFirstname'].value,
        "dob":this.proposer.controls['personalFirstname'].value,
        "gender":this.proposer.controls['personalFirstname'].value,
        "isSmoker":"Y",
        "maritalStatus":this.proposer.controls['personalFirstname'].value,
        "pan":this.proposer.controls['personalFirstname'].value,
        "maidName":"",
        "motherMaidName":"Neha",
        "FHName":"Sandesh",
        "nationality":this.proposer.controls['personalFirstname'].value,
        "otherNationality":"Indian",
        "ageProofId":this.proposer.controls['personalFirstname'].value,
        "emailId":this.proposer.controls['personalFirstname'].value,
        "phoneNo":this.proposer.controls['personalFirstname'].value,
        "ResidencePhoneNo":"",
        "currAddr1":this.proposer.controls['personalFirstname'].value,
        "currAddr2":this.proposer.controls['personalFirstname'].value,
        "currAddr3":this.proposer.controls['personalFirstname'].value,
        "currPincode":this.proposer.controls['personalFirstname'].value,
        "currState":this.proposer.controls['personalFirstname'].value,
        "currCity":this.proposer.controls['personalFirstname'].value,
        "perAddr1":this.proposer.controls['personalFirstname'].value,
        "perAddr2":this.proposer.controls['personalFirstname'].value,
        "perAddr3":this.proposer.controls['personalFirstname'].value,
        "perPincode":this.proposer.controls['personalFirstname'].value,
        "perState":this.proposer.controls['personalFirstname'].value,
        "perCity":this.proposer.controls['personalFirstname'].value,
        "isCurrPerAddrSame":this.proposer.controls['personalFirstname'].value,
        "isPerAddrIsCorrAddr":"",
        "education":"",
        "otherEducation":"",
        "highestQualification":"",
        "collegeNameLoc":"",
        "employementType":"",
        "employementTypeOther":"",
        "employerName":this.proposer.controls['personalFirstname'].value,
        "employerAddr":this.proposer.controls['personalFirstname'].value,
        "designation":"",
        "natureOfDuty":this.proposer.controls['personalFirstname'].value,
        "experienceInYears":"",
        "occupationType":"",
        "noOfEmployees":"",
        "natureOfBusiness":"",
        "annualIncome":this.proposer.controls['personalFirstname'].value,
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
        "identityProof":this.proposer.controls['personalFirstname'].value,
        "ageProof":this.proposer.controls['personalFirstname'].value,
        "otherAgeProof":"",
        "addrProof":this.proposer.controls['personalFirstname'].value,
        "corrAddrProof":"",
        "incomeProof":"",
        "hasEIAccount":"",
        "EIAccountNo":"",
        "applyEIAccount":"",
        "EIARepository":"",
        "wantEPolicy":"",
        "relationLAProposer":"",
        "height":this.proposer.controls['personalFirstname'].value,
        "heightFeets":this.proposer.controls['personalFirstname'].value,
        "heightInches":this.proposer.controls['personalFirstname'].value,
        "heightCentimeters":"",
        "weight":this.proposer.controls['personalFirstname'].value,
        "hasWeightChanged":"",
        "weightChange":"",
        "weightChangeReason":"",
        "isStaff":"",
        "employeeCode":"",
        "isTaxResOfIndia":"",
        "isHospitalized":"",
        "hospitalizedDate":"",
        "isRecovered":"",
        "nonRecoveryDetails":"",
        "aadhaarNo":"",
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
        ]
      },
      "Spouse":"",
      "Proposer":{
        "title":this.proposer.controls['personalFirstname'].value,
        "firstName":this.proposer.controls['personalFirstname'].value,
        "middleName":this.proposer.controls['personalFirstname'].value,
        "lastName":this.proposer.controls['personalFirstname'].value,
        "dob":this.proposer.controls['personalFirstname'].value,
        "gender":this.proposer.controls['personalFirstname'].value,
        "isSmoker":"",
        "maritalStatus":this.proposer.controls['personalFirstname'].value,
        "pan":this.proposer.controls['personalFirstname'].value,
        "maidName":"",
        "motherMaidName":"",
        "FHName":"B",
        "nationality":this.proposer.controls['personalFirstname'].value,
        "otherNationality":"",
        "ageProofId":this.proposer.controls['personalFirstname'].value,
        "emailId":this.proposer.controls['personalFirstname'].value,
        "phoneNo":this.proposer.controls['personalFirstname'].value,
        "ResidencePhoneNo":"",
        "alternate_cnt_no":"",
        "currAddr1":this.proposer.controls['personalFirstname'].value,
        "currAddr2":this.proposer.controls['personalFirstname'].value,
        "currAddr3":this.proposer.controls['personalFirstname'].value,
        "currPincode":this.proposer.controls['personalFirstname'].value,
        "currState":this.proposer.controls['personalFirstname'].value,
        "currCity":this.proposer.controls['personalFirstname'].value,
        "perAddr1":this.proposer.controls['personalFirstname'].value,
        "perAddr2":this.proposer.controls['personalFirstname'].value,
        "perAddr3":this.proposer.controls['personalFirstname'].value,
        "perPincode":this.proposer.controls['personalFirstname'].value,
        "perState":this.proposer.controls['personalFirstname'].value,
        "perCity":this.proposer.controls['personalFirstname'].value,
        "isCurrPerAddrSame":this.proposer.controls['personalFirstname'].value,
        "isPerAddrIsCorrAddr":"Y",
        "education":"2",
        "otherEducation":"",
        "highestQualification":"MCA",
        "collegeNameLoc":"DJTI Mumbai",
        "course":"",
        "courseDuration":"",
        "courseYear":"",
        "studentInstruction":"",
        "employementType":this.proposer.controls['personalFirstname'].value,
        "employementTypeOther":this.proposer.controls['personalFirstname'].value,
        "employerName":this.proposer.controls['personalFirstname'].value,
        "employerAddr":this.proposer.controls['personalFirstname'].value,
        "designation":"Senior Executive officer",
        "natureOfDuty":this.proposer.controls['personalFirstname'].value,
        "experienceInYears":"",
        "occupationType":"",
        "noOfEmployees":"",
        "natureOfBusiness":"",
        "annualIncome":this.proposer.controls['personalFirstname'].value,
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
        "isTaxResOfIndia":"",
        "aadhaarNo":"",
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
      this.toastr.success('Proposal created successfully!!');
      this.summaryData = successData.ResponseObject;
      sessionStorage.summaryData = JSON.stringify(this.summaryData);
      this.proposalId = this.summaryData.ProposalId;
      this.proposerFormData = this.proposer.value;
      this.bankFormData = this.bankDetail.value;
      this.nomineeFormData = this.nomineeDetail.value.itemsNominee;
      this.insuredFormData = this.insurerData;
      sessionStorage.proposerFormData = JSON.stringify(this.proposerFormData);
      sessionStorage.insuredFormData = JSON.stringify(this.insuredFormData);
      sessionStorage.bankFormData = JSON.stringify(this.bankFormData);
      sessionStorage.nomineeFormData = JSON.stringify(this.nomineeFormData);
      sessionStorage.edelweiss_term_life_id = this.proposalId;

      stepper.next();
      this.nextStep();

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
        firstName: this.getStepper1.firstName,
        midName: this.getStepper1.midName,
        lastName: this.getStepper1.lastName,
        gender: this.getStepper1.gender,
        dob: this.datepipe.transform(this.getStepper1.dob, 'y-MM-dd'),
        maritalStatus: this.getStepper1.maritalStatus,
        nationality: this.getStepper1.nationality,
        emailId: this.getStepper1.emailId,
        pan: this.getStepper1.pan,
        aadhaarNo: this.getStepper1.aadhaarNo,
        fatherhusbandName: this.getStepper1.fatherhusbandName,
        ageProofId: this.getStepper1.ageProofId,
        highestQualification: this.getStepper1.highestQualification,
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
        employerName: this.getStepper1.employerName,
        natureduty: this.getStepper1.natureduty,
        employerAddr: this.getStepper1.employerAddr,
        annualIncome: this.getStepper1.annualIncome,
        taxResidence: this.getStepper1.taxResidence,

      });

    }
    console.log(this.proposer, 'stepper1');

    if (sessionStorage.stepper2Details != '' && sessionStorage.stepper2Details != undefined) {
      this.getStepper2 = JSON.parse(sessionStorage.stepper2Details);
      this.insureArray = this.fb.group({

        title: this.getStepper2.title,
        firstName: this.getStepper2.firstName,
        midName: this.getStepper2.midName,
        lastName: this.getStepper2.lastName,
        gender: this.getStepper2.gender,
        dob: this.datepipe.transform(this.getStepper2.dob, 'y-MM-dd'),
        maritalStatus: this.getStepper2.maritalStatus,
        nationality: this.getStepper2.nationality,
        emailId: this.getStepper2.emailId,
        pan: this.getStepper2.pan,
        aadhaarNo: this.getStepper2.aadhaarNo,
        fatherhusbandName: this.getStepper2.fatherhusbandName,
        ageProofId: this.getStepper2.ageProofId,
        highestQualification: this.getStepper2.highestQualification,
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
        employerName: this.getStepper2.employerName,
        natureduty: this.getStepper2.natureduty,
        employerAddr: this.getStepper2.employerAddr,
        annualIncome: this.getStepper2.annualIncome,
        taxResidence: this.getStepper2.taxResidence,
        isPoliticallyExposed: this.getStepper2.isPoliticallyExposed,
        specification: this.getStepper2.specification,
        identityProof: this.getStepper2.identityProof,
        categorization: this.getStepper2.categorization,
        addrProof: this.getStepper2.addrProof,
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
    console.log(this.getStepper2, ' stepper2 ');

    if (sessionStorage.stepper3 != '' && sessionStorage.stepper != undefined) {
      const getStepper3 = JSON.parse(sessionStorage.stepper4Details);
      if ( getStepper3.nomineeAge < 17) {
        this.showAppointee = true;
      }

      for (let i=0; i < this.getStepper3.itemsNominee.length; i++) {

        this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nomineeName.patchValue(this.getStepper3.itemsNominee[i].nomineeName);
        this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].dob.patchValue(this.getStepper3.itemsNominee[i].dob);
        this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].gender.patchValue(this.getStepper3.itemsNominee[i].gender);
        this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nomineeRelationship.patchValue(this.getStepper3.itemsNominee[i].nomineeRelationship);
        this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aName.patchValue(this.getStepper3.itemsNominee[i].aName);
        this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].appointeeDob.patchValue(this.getStepper3.itemsNominee[i].appointeeDob);
        this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aGender.patchValue(this.getStepper3.itemsNominee[i].aGender);
        this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].relationToInsured.patchValue(this.getStepper3.itemsNominee[i].relationToInsured);
      }
    }
    console.log(this.nomineeDetail, ' stepper3 ');




    if (sessionStorage.stepper4Details != '' && sessionStorage.stepper4Details != undefined) {
     const getStepper4 = JSON.parse(sessionStorage.stepper4Details);
      this.bankDetail.controls['existingInsuranceInd'].patchValue(this.getStepper4.existingInsuranceInd);
      console.log(this.getStepper4.existingInsurance, ' getst2');

      for (let i=0; i < this.getStepper4.existingInsurance.length; i++) {

        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].policyNo.patchValue(this.getStepper4.existingInsurance[i].policyNo);
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].companyName.patchValue(this.getStepper4.existingInsurance[i].companyName);
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].yearOfIssue.patchValue(this.getStepper4.existingInsurance[i].yearOfIssue);
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].sumAssured.patchValue(this.getStepper4.existingInsurance[i].sumAssured);
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].annualizedPremium.patchValue(this.getStepper4.existingInsurance[i].annualizedPremium);
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].policyStatus.patchValue(this.getStepper4.existingInsurance[i].policyStatus);
      }
      this.bankDetail = this.fb.group({
        accountNo: getStepper4.accountNo,
        name: getStepper4.name,
        location: getStepper4.location,
        ifscCode: getStepper4.ifscCode,
        investmentStrategy: getStepper4.investmentStrategy,


      });
    }
     console.log(this.bankDetail, ' stepper4 ');

  }
  changeTitle()
  {
    this.proposer.controls['titleName'].patchValue(this.etitle[this.proposer.controls['title'].value]);
  }
  changeGender() {
    this.proposer.controls['genderName'].patchValue(this.egender[this.proposer.controls['gender'].value]);

  }
  changeMaritalStatus() {
    this.proposer.controls['GenderName'].patchValue(this.emaritalStatus[this.proposer.controls['Gender'].value]);

  }


}
