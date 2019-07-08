import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
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
  ],
})
export class EdelweissTermLifeComponent implements OnInit {
  public proposer: FormGroup;
  public insureArray: FormGroup;
  public bankDetail: FormGroup;
  public etitle: any;
  public egender: any;
  public minDate: any;
  public maxDate: any;
  public emaritalStatus: any;
  public einvesting: any;
  public ePremiumTerm: any;
  public policyTermList: any;
  public frequencyList: any;
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
  public totalInsureDetails: any;
  public insurePersons: any;
  public payingTermList: any;
  public valid: any;
  public settings: any;
  public webhost: any;





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
          // this.proposerFormData = JSON.parse(sessionStorage.proposerFormData);
          // this.bankDetailFormData = JSON.parse(sessionStorage.bankDetailFormData);
          // this.nomineeDetailFormData = JSON.parse(sessionStorage.nomineeDetailFormData);
          // this.familyDiseaseFormData = JSON.parse(sessionStorage.familyDiseaseFormData);
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
    this.totalInsureDetails = [];
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
      natureduty: '',
      employerAddr: '',
      annualIncome: '',
      taxResidence: '',

    });

    this.insureArray = this.fb.group({
      'items' : this.fb.array([
        this.initItemRows()
      ])
    });

    this.bankDetail = this.fb.group({
      accountNo: '',
      name: '',
      location: '',
      ifscCode: '',
      investmentStrategy: '',

    });
  }

  ngOnInit() {
    // this.enquiryFormData = JSON.parse(sessionStorage.enquiryFormData);
    // this.lifePremiumList = JSON.parse(sessionStorage.lifePremiumList);
    // this.getEnquiryDetials = JSON.parse(sessionStorage.getEnquiryDetials);
    // this.proposer.controls['amtTransaction'].patchValue(this.lifePremiumList.totalpremium);
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





    // this.sessionData();

  }

  initItemRows() {
    alert('1');
    return this.fb.group(
        {
          rolecd: 'PRIMARY',
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
          natureduty: '',
          employerAddr: '',
          annualIncome: '',
          taxResidence: '',
          isPoliticallyExposed: 'No',
          specification: '',
          identityProof: '',
          categorization: '',
          addrProof: '',
          heightFeets: '',
          heightInches: '',
          weight: '',
          medicalTreatment: 'No',
          receivedTreatment1: 'No',
          receivedTreatment2: 'No',
          insureHistory: 'No',
          insureAccNo: 'No',
          provideAccNo: '',
          epolicy: 'No',
          einsureAccNo: 'No',
          epolicy1: 'No',
          insureRepository: 'No',
        }
    );
  }


  // Dame validation
  nameValidate(event: any) {
    console.log(event.target.value.length);
    // if (event.code == 'Space') {
    //     if (event.target.value.length == 0) {
    //         event.preventDefault();
    //     }
    // } else {
    this.validation.nameValidate(event);
    // }
  }

  // Dob validation
  dobValidate(event: any) {
    this.validation.dobValidate(event);
  }

  // Number validation
  numberValidate(event: any) {
    this.validation.numberValidate(event);
  }

  // height weight validation
  heightValidate(event: any) {
    console.log(event.target.value.length);
    if (event.key == '0') {
      if (event.target.value.length == 0) {
        event.preventDefault();
      }
    } else {
      this.validation.numberValidate(event);
    }
  }

  idValidate(event) {
    this.validation.idValidate(event);

  }
  topScroll() {
    document.getElementById('main-content').scrollTop = 0;
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
  // Personal Details
  proposerDetails(stepper: MatStepper, value) {
    console.log(value);
    sessionStorage.stepper1 = JSON.stringify(value);
    if (this.proposer.valid) {
      if (sessionStorage.proposerAge >= 18) {
        stepper.next();
      } else {
        this.toastr.error('Proposer age should be 18 or above');

      }

    }
  }
  // Insure Details
  edelweissInsureDetails(stepper: MatStepper, value, i) {
    sessionStorage.stepper2Details = '';
    sessionStorage.stepper2Details = JSON.stringify(value);
    console.log(value, 'this.value');
    console.log(this.insureArray.valid, 'this.valid');
    // let dateErrorMsg = [];
    if (this.insureArray.valid) {
      let pedValid = true;
      for (let i= 0; i < this.insureArray.value.items.length; i++) {
        // if (this.insureArray['controls'].items['controls'][i]['controls'].preExistingDisease.value == 'Yes') {
        //   pedValid = false;
        // }
        // if (this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.value != '') {
        //   dateErrorMsg.push(2);
        //
        // } else if (this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.value == '') {
        //   dateErrorMsg.push(3);
        //
        // }
      }
      console.log(pedValid, 'pedValid');
      if (pedValid) {
        this.insurerData = value.items;
        console.log(this.insurerData, 'this.insurerData');
        this.totalInsureDetails = [];
        for (let i = 0; i < this.insurePersons.length; i++) {
          this.totalInsureDetails.push({
            'Title': this.insurerData[i].personalTitle,
            'FirstName': this.insurerData[i].personalFirstname,
            'LastName': this.insurerData[i].personalLastname,
            'Gender': this.insurerData[i].personalGender,
            'DOB': this.datepipe.transform(this.insurerData[i].personalDob, 'y-MM-dd'),
            'Relationship': this.insurerData[i].personalrelationship,
            // 'SumInsured': this.buyProductdetails.suminsured_amount,
            'PreExistingDisease': this.insurerData[i].preExistingDisease
          });
        }
        // if (dateErrorMsg.includes(2)) {
        //   this.toastr.error('check the date');
        // } else {
        //   stepper.next();
        //   this.topScroll();
        // }
      } else {
        this.toastr.error(' Sorry, PreExistingDisease are not allowed to purchase policy ');
      }
    }

  }
  isPolitical(event: any) {
    alert('j');
    if (this.proposer.controls['isPoliticallyExposed'].value == true) {
      this.proposer.controls['specification'].patchValue(this.proposer.controls['specification'].value);

      this.proposer.controls['specification'].setValidators([Validators.required]);
    } else {
      this.proposer.controls['specification'].patchValue('');

      this.proposer.controls['specification'].setValidators(null);

    }
    this.proposer.controls['specification'].updateValueAndValidity();

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

  getPostal(pin, title) {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pincode': pin
    }
    if (pin.length == 6) {
      this.termService.getChecPincode(data).subscribe(
          (successData) => {
            this.pincodeListSuccess(successData, title);
          },
          (error) => {
            this.pincodeListFailure(error);
          }
      );
    }
  }
  public pincodeListSuccess(successData, title) {
    if (successData.IsSuccess) {
    } else {
      this.toastr.error('Invalid Pincode');
    }
  }
  public pincodeListFailure(error) {
  }

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
