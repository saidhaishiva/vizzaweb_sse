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
import {ValidationService} from '../../shared/services/validation.service';
import {ActivatedRoute} from '@angular/router';
import * as moment from 'moment';
import {TermLifeCommonService} from '../../shared/services/term-life-common.service';


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
  selector: 'app-aegon-term-life',
  templateUrl: './aegon-term-life.component.html',
  styleUrls: ['./aegon-term-life.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})

export class AegonTermLifeComponent implements OnInit {
  public personal: FormGroup;
  public nominee: FormGroup;
  public proposerAge: any;
  public nomineeAge: any;
  public dateError: any;
  public dateError1: any;
  public dateError2: any;
  public incomeError: any;
  public today: any;
  public qualificationList: any;
  public summaryData: any;
  public pincodeList: any;
  public enquiryFormData: any;
  public lifePremiumList: any;
  public stateList: any;
  public getEnquiryDetials: any;
  public proposerFormData: any;
  public nomineeFormData: any;
  public occupationList: any;
  public annualList: any;
  public stepper1: any;
  public personalData: any;
  public nomineeRelationship: any;
  public cityList: any;
  public nomineeData: any;
  public appointeeAge: any;
  public response: any;
  public proposalList: any;
  public proposalId: any;
  public settings: Settings;
  public stepper2: any;
  public requestedUrl: any;
  public sum_insured_amount:any;
  public maritialList:any;
  public appointeeRelationList:any;

  public inputReadonly: boolean;
  public apponiteeList: boolean;
  public sum_insure: any;
  public empTypeList: any;







  constructor(public validation: ValidationService, public authservice: AuthService ,public fb: FormBuilder,public route: ActivatedRoute,public TermLifeService: TermLifeCommonService,public datepipe: DatePipe, private toastr: ToastrService, public appSettings: AppSettings) {
    let stepperindex = 0;
    this.requestedUrl = '';

    this.route.params.forEach((params) => {
      if(params.stepper == true || params.stepper == 'true') {
        stepperindex = 2;
        if (sessionStorage.summaryData != '' && sessionStorage.summaryData != undefined) {
          this.summaryData = JSON.parse(sessionStorage.summaryData);
          // this.requestedUrl = this.summaryData.proposalUrl;
          // this.RediretUrlLink = this.summaryData.PaymentURL;
          this.proposerFormData = JSON.parse(sessionStorage.proposerFormData);
          this.nomineeFormData = JSON.parse(sessionStorage.nomineeFormData);
          this.proposalId = this.summaryData.ProposalId;
          sessionStorage.aegon_proposal_id = this.proposalId;
        }
      }
    });
    this.inputReadonly=false;
    this.apponiteeList = false;
    this.settings= this.appSettings.settings;
    this.personal = this.fb.group({
      title: ['', Validators.required],
      firstName: '',
      lastName: '',
      middleName: '',
      gender: '',
      dob: '',
      relationship: '',
      pincode: '',
      state: '',
      fatherName: '',
      maritalStatus: '',
      qualifiction: '',
      qualifictionOther:'',
      employeeType: '',
      natureOfWork: '',
      annualIncome: ['', Validators.required],
      incomeError: '',
      smoker: '',
      isExistingPolicyHolder: '',
      isPoliticleExposed: '',
      diabeteDuration: '',
      isHousewife: '',
      isHusbandCover: '',
      email: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
      mobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
      pAddress1: '',
      pAddress2: '',
      pPincode: '',
      pCity: '',
      pState: '',
      cAddress1: '',
      cAddress2: '',
      cCity: '',
      cState: '',
      cPincode: '',
      isAddressSame: false,
      qualifictionName:'',
      natureOfWorkName:'',
      pStateName:'',
      pCityName:'',
      cCityName:'',
      adbrSumAssured:['',Validators.compose([Validators.minLength(5),Validators.maxLength(8)])],
      deathBenefitSA:'',
      deathBenefitTISA:'',
      enchancedCISA:'',
      icirSumAssured:'',
      criticalIllnessError:'',
      // deathBenefitSAName:'',
      // deathBenefitTISAName:'',


    });
    this.nominee = this.fb.group({
      ntitle: '',
      nfirstName: '',
      nlastName: '',
      ndob: '',
      nRelation: '',
      relationOther: '',
      nAddress1: '',
      nAddress2: '',
      nCity: '',
      nState: '',
      nPincode: '',
      nPercentage: '',
      atitle: '',
      aFullName: '',
      adob: '',
      aRelation: '',
      appointeeRelationOther:'',
      aPercentage: '',
      nCityName:'',
      nRelationName:'',
      nStateName:'',



    });
  }

  ngOnInit() {
    this.enquiryFormData = JSON.parse(sessionStorage.enquiryFormData);
    this.lifePremiumList = JSON.parse(sessionStorage.lifePremiumList);
    this.getEnquiryDetials = JSON.parse(sessionStorage.getEnquiryDetials);
    // if(){
    //     this.personal.controls['adbrSumAssured'].patchValue(this.lifePremiumList.sum_insured_amount);
    // } else {
    //   this.personal.controls['adbrSumAssured'].patchValue('0');
    //
    // }
    this.getQualificationList();
    this.getoccupationlist();
    this.getnomineerelationship();
    this.getState();
    this.checkSum();
    this.checkSumAs();
    this.getcitylist();
    this.getEmpType();
    this.getAppointeeRelation();


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
  // addAnnual(){
  //   if(this.personal.controls['annualIncome'].value >= 200000 &&  this.personal.controls['annualIncome'].value <= 9999900000){
  //     this.personal.controls['incomeError'].patchValue('');
  //   }else {
  //     this.personal.controls['incomeError'].patchValue('Annual Income should be 2 Lakhs and above');
  //   }
  // }

  validateAccidental(event:any){
    if(this.lifePremiumList.benefit_option == 'L' || this.lifePremiumList.benefit_option == 'LP'){
      if((this.personal.controls['adbrSumAssured'].value >=50000) && (this.personal.controls['adbrSumAssured'].value <=30000000)) {
        this.personal.controls['adbrSumAssured'].patchValue(this.personal.controls['adbrSumAssured'].value);

      }
      else{
        this.toastr.error('adbrSumAssured should be minimum Fifty Thousand to maximum Three Crores');

      }
    }
    }

  validateCriticalIllness(type) {
    if(type == 'LHP') {
      if(this.personal.controls['deathBenefitTISA'].value == 5000000 ){

        if(this.personal.controls['enchancedCISA'].value <= 1000000 && this.personal.controls['enchancedCISA'].value >= 500000) {
          this.personal.controls['criticalIllnessError'].patchValue('');
        } else {
          this.personal.controls['criticalIllnessError'].patchValue('Critical Illness Benefit should be 5 to 10 Lakhs');
        }

      } else if(this.personal.controls['deathBenefitTISA'].value == 7500000 ){
        if(this.personal.controls['enchancedCISA'].value <= 1500000 && this.personal.controls['enchancedCISA'].value >= 500000) {
          this.personal.controls['criticalIllnessError'].patchValue('');
        } else {
          this.personal.controls['criticalIllnessError'].patchValue('Critical Illness Benefit should be 5 to 15 Lakhs');
        }
      }else if(this.personal.controls['deathBenefitTISA'].value == 10000000 ){
        if(this.personal.controls['enchancedCISA'].value <= 2000000 && this.personal.controls['enchancedCISA'].value >= 500000) {
          this.personal.controls['criticalIllnessError'].patchValue('');
        } else {
          this.personal.controls['criticalIllnessError'].patchValue('Critical Illness Benefit should be 5 to 20 Lakhs');
        }
      }
      else if(this.personal.controls['deathBenefitTISA'].value == 12500000 ){
        if(this.personal.controls['enchancedCISA'].value <= 2500000 && this.personal.controls['enchancedCISA'].value >= 500000) {
          this.personal.controls['criticalIllnessError'].patchValue('');
        } else {
          this.personal.controls['criticalIllnessError'].patchValue('Critical Illness Benefit should be 5 to 25 Lakhs');
        }
      }else if(this.personal.controls['deathBenefitTISA'].value == 15000000 ){
        if(this.personal.controls['enchancedCISA'].value <= 3000000 && this.personal.controls['enchancedCISA'].value >= 500000) {
          this.personal.controls['criticalIllnessError'].patchValue('');
        } else {
          this.personal.controls['criticalIllnessError'].patchValue('Critical Illness Benefit should be 5 to 30 Lakhs');
        }
      }else if(this.personal.controls['deathBenefitTISA'].value == 17500000 ){
        if(this.personal.controls['enchancedCISA'].value <= 3500000 && this.personal.controls['enchancedCISA'].value >= 500000) {
          this.personal.controls['criticalIllnessError'].patchValue('');
        } else {
          this.personal.controls['criticalIllnessError'].patchValue('Critical Illness Benefit should be 5 to 35 Lakhs');
        }
      }else if(this.personal.controls['deathBenefitTISA'].value == 20000000 ){
        if(this.personal.controls['enchancedCISA'].value <= 4000000 && this.personal.controls['enchancedCISA'].value >= 500000) {
          this.personal.controls['criticalIllnessError'].patchValue('');
        } else {
          this.personal.controls['criticalIllnessError'].patchValue('Critical Illness Benefit should be 5 to 40 Lakhs');
        }
      }else if(this.personal.controls['deathBenefitTISA'].value == 22500000 ){
        if(this.personal.controls['enchancedCISA'].value <= 4500000 && this.personal.controls['enchancedCISA'].value >= 500000) {
          this.personal.controls['criticalIllnessError'].patchValue('');
        } else {
          this.personal.controls['criticalIllnessError'].patchValue('Critical Illness Benefit should be 5 to 45 Lakhs');
        }
      }
      else if(this.personal.controls['deathBenefitTISA'].value == 25000000 ){
        if(this.personal.controls['enchancedCISA'].value <= 5000000 && this.personal.controls['enchancedCISA'].value >= 500000) {
          this.personal.controls['criticalIllnessError'].patchValue('');
        } else {
          this.personal.controls['criticalIllnessError'].patchValue('Critical Illness Benefit should be 5 to 50 Lakhs');
        }
      }
    } else if(type == 'LH') {

      if(this.personal.controls['deathBenefitTISA'].value == 5000000 ){

        if(this.personal.controls['icirSumAssured'].value <= 1000000 && this.personal.controls['icirSumAssured'].value >= 500000) {
          this.personal.controls['criticalIllnessError'].patchValue('');
        } else {
          this.personal.controls['criticalIllnessError'].patchValue('Critical Illness Benefit should be 5 to 10 Lakhs');
        }

      } else if(this.personal.controls['deathBenefitTISA'].value == 7500000 ){
        if(this.personal.controls['icirSumAssured'].value <= 1500000 && this.personal.controls['icirSumAssured'].value >= 500000) {
          this.personal.controls['criticalIllnessError'].patchValue('');
        } else {
          this.personal.controls['criticalIllnessError'].patchValue('Critical Illness Benefit should be 5 to 15 Lakhs');
        }
      }else if(this.personal.controls['deathBenefitTISA'].value == 10000000 ){
      if(this.personal.controls['icirSumAssured'].value <= 2000000 && this.personal.controls['icirSumAssured'].value >= 500000) {
        this.personal.controls['criticalIllnessError'].patchValue('');
      } else {
        this.personal.controls['criticalIllnessError'].patchValue('Critical Illness Benefit should be 5 to 20 Lakhs');
      }
    }
    else if(this.personal.controls['deathBenefitTISA'].value == 12500000 ){
      if(this.personal.controls['icirSumAssured'].value <= 2500000 && this.personal.controls['icirSumAssured'].value >= 500000) {
        this.personal.controls['criticalIllnessError'].patchValue('');
      } else {
        this.personal.controls['criticalIllnessError'].patchValue('Critical Illness Benefit should be 5 to 25 Lakhs');
      }
    }else if(this.personal.controls['deathBenefitTISA'].value == 15000000 ){
      if(this.personal.controls['icirSumAssured'].value <= 3000000 && this.personal.controls['icirSumAssured'].value >= 500000) {
        this.personal.controls['criticalIllnessError'].patchValue('');
      } else {
        this.personal.controls['criticalIllnessError'].patchValue('Critical Illness Benefit should be 5 to 30 Lakhs');
      }
    }else if(this.personal.controls['deathBenefitTISA'].value == 17500000 ){
      if(this.personal.controls['icirSumAssured'].value <= 3500000 && this.personal.controls['icirSumAssured'].value >= 500000) {
        this.personal.controls['criticalIllnessError'].patchValue('');
      } else {
        this.personal.controls['criticalIllnessError'].patchValue('Critical Illness Benefit should be 5 to 35 Lakhs');
      }
    }else if(this.personal.controls['deathBenefitTISA'].value == 20000000 ){
      if(this.personal.controls['icirSumAssured'].value <= 4000000 && this.personal.controls['icirSumAssured'].value >= 500000) {
        this.personal.controls['criticalIllnessError'].patchValue('');
      } else {
        this.personal.controls['criticalIllnessError'].patchValue('Critical Illness Benefit should be 5 to 40 Lakhs');
      }
    }else if(this.personal.controls['deathBenefitTISA'].value == 22500000 ){
      if(this.personal.controls['icirSumAssured'].value <= 4500000 && this.personal.controls['icirSumAssured'].value >= 500000) {
        this.personal.controls['criticalIllnessError'].patchValue('');
      } else {
        this.personal.controls['criticalIllnessError'].patchValue('Critical Illness Benefit should be 5 to 45 Lakhs');
      }
    }
    else if(this.personal.controls['deathBenefitTISA'].value == 25000000 ){
      if(this.personal.controls['icirSumAssured'].value <= 5000000 && this.personal.controls['icirSumAssured'].value >= 500000) {
        this.personal.controls['criticalIllnessError'].patchValue('');
      } else {
        this.personal.controls['criticalIllnessError'].patchValue('Critical Illness Benefit should be 5 to 50 Lakhs');
      }
    }

    }

  }



  addDate(event) {
    if (event.value != null) {
      let selectedDate = '';
      this.nomineeAge = '';
      let dob = '';
      if (typeof event.value._i == 'string') {
        const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
        if (pattern.test(event.value._i) && event.value._i.length == 10) {
          this.dateError1 = '';
        } else {
          this.dateError1 = 'Enter Valid Date';
        }
        selectedDate = event.value._i;
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (selectedDate.length == 10) {
          this.nomineeAge = this.ageCalculate(dob);

        }

      } else if (typeof event.value._i == 'object') {
        // dob = this.datepipe.transform(event.value, 'MMM d, y');
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (dob.length == 10) {
          this.nomineeAge = this.ageCalculate(dob);
          // sessionStorage.insuredAgePA = this.proposerAge;

        }
        this.dateError1 = '';
      }
      sessionStorage.nomineeAge = this.nomineeAge;

    }
  }

  addEvent1(event) {
    if (event.value != null) {
      let selectedDate = '';
      this.appointeeAge = '';
      let dob = '';
      if (typeof event.value._i == 'string') {
        const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
        if (pattern.test(event.value._i) && event.value._i.length == 10) {
          this.dateError2 = '';
        } else {
          this.dateError2 = 'Enter Valid Date';
        }
        selectedDate = event.value._i;
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (selectedDate.length == 10) {
          this.appointeeAge = this.ageCalculate(dob);

        }

      } else if (typeof event.value._i == 'object') {
        // dob = this.datepipe.transform(event.value, 'MMM d, y');
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (dob.length == 10) {
          this.appointeeAge = this.ageCalculate(dob);
          // sessionStorage.insuredAgePA = this.proposerAge;

        }
        this.dateError2 = '';
      }
      sessionStorage.nomineeAge = this.nomineeAge;

    }
  }

  ageNominee() {
    if(sessionStorage.nomineeAge <= 18){
      this.apponiteeList = true;
      console.log(this.apponiteeList,'cccccc')
    } else {
      this.apponiteeList = false;

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

  // sameAddress(event) {
  //   if (event.checked) {
  //     console.log(event.checked,'checked');
  //     // this.personal.controls['isAddressSame'].value){
  //
  //     this.personal.controls['pAddress1'].patchValue(this.personal.controls['cAddress1'].value);
  //     this.personal.controls['pAddress2'].patchValue(this.personal.controls['cAddress2'].value);
  //     this.personal.controls['pCity'].patchValue(this.personal.controls['cCity'].value);
  //     this.personal.controls['pState'].patchValue(this.personal.controls['cState'].value);
  //     this.personal.controls['pPincode'].patchValue(this.personal.controls['cPincode'].value);
  //
  //
  //   } else {
  //     this.personal.controls['pAddress1'].patchValue('');
  //     this.personal.controls['pAddress2'].patchValue('');
  //     this.personal.controls['pCity'].patchValue('');
  //     this.personal.controls['pState'].patchValue('');
  //     this.personal.controls['pPincode'].patchValue('');
  //
  //   }
  // }
  // SAME AS ADDRESS
  sameAddress(value:any){
    if (this.personal.controls['isAddressSame'].value) {
      console.log(this.personal.controls['isAddressSame'].value,'ifff');
      this.inputReadonly = true;
      this.personal.controls['cAddress1'].patchValue(this.personal.controls['pAddress1'].value);
      console.log(this.personal.controls['cAddress1'].value,'ytfhfasd');
          this.personal.controls['cAddress2'].patchValue(this.personal.controls['pAddress2'].value);
          this.personal.controls['cCity'].patchValue(this.personal.controls['pCity'].value);
          this.personal.controls['cState'].patchValue(this.personal.controls['pState'].value);
          this.personal.controls['cPincode'].patchValue(this.personal.controls['pPincode'].value);

    } else {
      this.inputReadonly = false;
      this.personal.controls['cAddress1'].patchValue('');
          this.personal.controls['cAddress2'].patchValue('');
          this.personal.controls['cCity'].patchValue('');
          this.personal.controls['cState'].patchValue('');
          this.personal.controls['cPincode'].patchValue('');

    }

  }


  // NEXT BUTTON

  public personalDetails(stepper: MatStepper, value) {
    this.personalData=value;
    console.log(value, 'eeeeeeeeeee');
    sessionStorage.stepper1 = '';
    sessionStorage.stepper1 = JSON.stringify(value);
    console.log(this.personal.valid, 'checked');
    if(this.personal.valid) {
      if(sessionStorage.proposerAge >= 18){
        if( this.personal.controls['criticalIllnessError'].value == ''){
          stepper.next();
          this.topScroll();

        }else{
          this.toastr.error('Check the Addon Details');
        }

      } else {
        this.toastr.error('Proposer age should be 18 or above');

      }
    }

  }

  //NEXT BUTTON NOMINEE
  public nomineeDetails(stepper: MatStepper, value) {
    console.log(value, 'nominee');
    sessionStorage.stepper2 = '';
    sessionStorage.stepper2 = JSON.stringify(value);
    console.log(this.nominee.valid, 'checked');
    if(this.nominee.valid) {
      this.nomineeData= value;
    console.log(this.nomineeData,'nomm')
      this.proposal(stepper);

      // stepper.next();
      //   this.topScroll();
      }
    }


  getQualificationList() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.getQualificationList(data).subscribe(
        (successData) => {
          this.getQualificationListSuccess(successData);
        },
        (error) => {
          this.getQualificationListFailure(error);
        }
    );
  }

  public getQualificationListSuccess(successData) {
    if (successData.IsSuccess) {
      this.qualificationList = successData.ResponseObject;
    }
  }
  public getQualificationListFailure(error) {
  }

  getoccupationlist() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
      'emp_type':this.personal.controls['employeeType'].value
    }
    this.TermLifeService.getoccupationlist(data).subscribe(
        (successData) => {
          this.getoccupationlistSuccess(successData);
        },
        (error) => {
          this.getoccupationlistFailure(error);
        }
    );
  }

  public getoccupationlistSuccess(successData) {
    if (successData.IsSuccess) {
      this.occupationList = successData.ResponseObject;
    }
  }
  public getoccupationlistFailure(error) {
  }

  getcitylist() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
      'state_name': this.personal.controls['pState'].value,
    }
    this.TermLifeService.getcitylist(data).subscribe(
        (successData) => {
          this.getcitylistSuccess(successData);
        },
        (error) => {
          this.getcitylistFailure(error);
        }
    );
    console.log(data,'dataCity')
  }

  public getcitylistSuccess(successData) {
    if (successData.IsSuccess) {
      this.cityList = successData.ResponseObject;
    }
  }
  public getcitylistFailure(error) {
  }

  getnomineerelationship() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
      'gender': this.personal.controls['gender'].value,
      'marital_status' : this.personal.controls['maritalStatus'].value
    }
    this.TermLifeService.getnomineerelationship(data).subscribe(
        (successData) => {
          this.nomineerelationshipSuccess(successData);
        },
        (error) => {
          this.nomineerelationshipFailure(error);
        }
    );
  }

  public nomineerelationshipSuccess(successData) {
    if (successData.IsSuccess) {
      this.nomineeRelationship = successData.ResponseObject;
    }
  }
  public nomineerelationshipFailure(error) {
  }

  getAppointeeRelation() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.TermLifeService.getAppointeeRelation(data).subscribe(
        (successData) => {
          this.AppointeeRelationSuccess(successData);
        },
        (error) => {
          this.AppointeeRelationFailure(error);
        }
    );
  }

  public AppointeeRelationSuccess(successData) {
    if (successData.IsSuccess) {
      this.appointeeRelationList = successData.ResponseObject;
    }
  }
  public AppointeeRelationFailure(error) {
  }

  getState() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.getState(data).subscribe(
        (successData) => {
          this.stateSuccess(successData);
        },
        (error) => {
          this.stateFailure(error);
        }
    );
  }

  public stateSuccess(successData) {
    alert();
    if (successData.IsSuccess) {
      this.stateList = successData.ResponseObject;
    }
  }
  public stateFailure(error) {
  }


  getAnnual(title) {
    const data = {

      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
      'validate_Annual_Income' : this.personal.controls['annualIncome'].value,
      'sum_insured': this.personal.controls['deathBenefitTISA'].value,
    }
    console.log(data,'data')

    this.TermLifeService.getAnnuallist(data).subscribe(
        (successData) => {
          this.getAnnuallistSuccess(successData, title);
        },
        (error) => {
          this.getAnnuallistFailure(error);
        }
    );
  }
  public getAnnuallistSuccess(successData, title) {
    if (successData.IsSuccess) {
      this.annualList = successData.ResponseObject;
      console.log(title,'title');
      if (title == 'personal') {
        if (this.personal.controls['annualIncome'].value >= 200000 && this.personal.controls['annualIncome'].value <= 9999900000) {
          this.personal.controls['annualIncome'].patchValue(this.response.annualIncome);
        }else {
          this.toastr.error('Annual Income should be 2 Lakhs and above');
        }
      }

    }
  }
  public getAnnuallistFailure(error) {
  }


  getMaritalList(){
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
      'gender': this.personal.controls['gender'].value
    }
    if (this.personal.controls['gender'].value !='') {
      this.TermLifeService.getMaritalList(data).subscribe(
          (successData) => {
            this.maritalListSuccess(successData);
          },
          (error) => {
            this.maritalListFailure(error);
          }
      );
      console.log(data,'datapin')
    }
  }
  public maritalListSuccess(successData){
    if (successData.IsSuccess) {
      this.maritialList = successData.ResponseObject;
    }
  }

  public maritalListFailure(error){

  }

  getEmpType(){
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
      'gender': this.personal.controls['gender'].value
    }
    if (this.personal.controls['gender'].value !='') {
      this.TermLifeService.getEmpTypeList(data).subscribe(
          (successData) => {
            this.getEmpTypeSuccess(successData);
          },
          (error) => {
            this.getEmpTypeFailure(error);
          }
      );
      console.log(data,'datapin')
    }
  }
  public getEmpTypeSuccess(successData){
    if (successData.IsSuccess) {
      this.empTypeList = successData.ResponseObject;
    }
  }

  public getEmpTypeFailure(error){

  }


  /////////////////////
  getPostal(pin, title) {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pincode': pin
    }
    if (pin.length == 6) {
      this.TermLifeService.getCheckpincode(data).subscribe(
          (successData) => {
            this.pincodeListSuccess(successData, title);
          },
          (error) => {
            this.pincodeListFailure(error);
          }
      );
      console.log(data,'datapin')
    }
  }

  public pincodeListSuccess(successData, title) {
    if (successData.IsSuccess) {
      this.response = successData.ResponseObject;
      // this.personal.controls['custMailStateCd'].patchValue(this.response.state_code);
      // if (title == 'personal') {
      //   if (Object.keys(this.response).length === 0) {
      //     this.personal.controls['pState'].patchValue('');
      //   } else {
      //     this.personal.controls['pState'].patchValue(this.response.state);
      //     console.log(this.personal.controls['pState'].value,'this.state')
      //
      //
      //   }
      } else {
      this.toastr.error('Invalid Pincode');
    }

  }
  public pincodeListFailure(error) {
  }

  changeQualificationList() {
    this.personal.controls['qualifictionName'].patchValue(this.qualificationList[this.personal.controls['qualifiction'].value]);
  }
  changeOccupationlist() {
    this.personal.controls['natureOfWorkName'].patchValue(this.occupationList[this.personal.controls['natureOfWork'].value]);
  }
  changeCitylist() {
    this.personal.controls['pCityName'].patchValue(this.cityList[this.personal.controls['pCity'].value]);
  }
  changecCitylist() {
    this.personal.controls['cCityName'].patchValue(this.cityList[this.personal.controls['cCity'].value]);
  }
  changeNcitylist() {
    this.nominee.controls['nCityName'].patchValue(this.cityList[this.nominee.controls['nCity'].value]);
  }
  changenomineerelationship() {
    this.nominee.controls['nRelationName'].patchValue(this.nomineeRelationship[this.nominee.controls['nRelation'].value]);
  }
  changeAppointeerelationship() {
    this.nominee.controls['aRelationName'].patchValue(this.appointeeRelationList[this.nominee.controls['aRelation'].value]);
  }
  changeEmpType() {
    this.personal.controls['employeeTypeName'].patchValue(this.empTypeList[this.personal.controls['employeeType'].value]);
  }
  changeState()
  {
    this.personal.controls['pStateName'].patchValue(this.stateList[this.personal.controls['pState'].value]);

  }
  changecState()
  {
    this.personal.controls['cStateName'].patchValue(this.stateList[this.personal.controls['cState'].value]);

  }
  changenState()
  {
    this.nominee.controls['nStateName'].patchValue(this.stateList[this.nominee.controls['nState'].value]);

  }
  checkSum()
{
  this.personal.controls['deathBenefitSA'].patchValue(this.lifePremiumList.sum_insured_amount);
}

  checkSumAs()
  {
    this.personal.controls['deathBenefitTISA'].patchValue(this.lifePremiumList.sum_insured_amount);
  }

  sessionData() {
    if (sessionStorage.stepper1 != '' && sessionStorage.stepper1 != undefined) {
      let stepper1 = JSON.parse(sessionStorage.stepper1);

      this.personal = this.fb.group({
        title: stepper1.title,
        firstName: stepper1.firstName,
        lastName: stepper1.lastName,
        middleName: stepper1.middleName,
        gender: stepper1.gender,
        dob: this.datepipe.transform(stepper1.dob, 'y-MM-dd'),
        email: stepper1.email,
        mobile: stepper1.mobile,
        pincode: stepper1.pincode,
        relationship: stepper1.relationship,
        fatherName: stepper1.fatherName,
        maritalStatus: stepper1.maritalStatus,
        qualifiction: stepper1.qualifiction,
        qualifictionOther: stepper1.qualifictionOther,
        employeeType: stepper1.employeeType,
        natureOfWork: stepper1.natureOfWork,
        annualIncome: stepper1.annualIncome,
        incomeError: stepper1.incomeError,
        smoker: stepper1.smoker,
        isExistingPolicyHolder: stepper1.isExistingPolicyHolder,
        isPoliticleExposed: stepper1.isPoliticleExposed,
        diabeteDuration: stepper1.diabeteDuration,
        isHousewife: stepper1.isHousewife,
        isHusbandCover: stepper1.isHusbandCover,
        pAddress1: stepper1.pAddress1,
        pAddress2: stepper1.pAddress2,
        pPincode: stepper1.pPincode,
        pCity: stepper1.pCity,
        pState: stepper1.pState,
        cAddress1: stepper1.cAddress1,
        cAddress2: stepper1.cAddress2,
        cCity: stepper1.cCity,
        cState: stepper1.cState,
        cPincode: stepper1.cPincode,
        state: stepper1.state,
        city: stepper1.city,
        isAddressSame: stepper1.isAddressSame,
        qualifictionName: stepper1.qualifictionName,
        natureOfWorkName: stepper1.natureOfWorkName,
        pCityName: stepper1.pCityName,
        cCityName: stepper1.cCityName,
        pStateName: stepper1.pStateName,
        adbrSumAssured: stepper1.adbrSumAssured,
        deathBenefitSA: stepper1.deathBenefitSA,
        deathBenefitTISA: stepper1.deathBenefitTISA,
        enchancedCISA: stepper1.enchancedCISA,
        icirSumAssured: stepper1.icirSumAssured,
        criticalIllnessError: stepper1.criticalIllnessError,


      });
      console.log( this.personal,' this.personal')
    }
    if (sessionStorage.stepper2 != '' && sessionStorage.stepper2 != undefined) {
      let stepper2 = JSON.parse(sessionStorage.stepper2);
      this.nominee = this.fb.group({
        ntitle: stepper2.ntitle,
        nfirstName: stepper2.nfirstName,
        nlastName: stepper2.nlastName,
        ndob: stepper2.ndob,
        nRelation: stepper2.nRelation,
        relationOther: stepper2.relationOther,
        nAddress1: stepper2.nAddress1,
        nAddress2: stepper2.nAddress2,
        nCity: stepper2.nCity,
        nState: stepper2.nState,
        nPincode: stepper2.nPincode,
        nPercentage: stepper2.nPercentage,
        atitle: stepper2.atitle,
        aFullName: stepper2.aFullName,
        adob: stepper2.adob,
        aRelation: stepper2.aRelation,
        appointeeRelationOther: stepper2.appointeeRelationOther,
        aPercentage: stepper2.aPercentage,
        nCityName: stepper2.nCityName,
        nRelationName: stepper2.nRelationName,
        nStateName: stepper2.nStateName,
      });

    }

    if (sessionStorage.aegon_proposal_id != '' && sessionStorage.aegon_proposal_id != undefined) {
      this.proposalId = sessionStorage.aegon_proposal_id;
    }


  }


  // proposal Creation

  proposal(stepper) {

    const data =
        {
          "user_id": this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
          "role_id":  this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
          "pos_status": this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
          "platform": "web",
          "product_id": this.lifePremiumList.product_id,
          "suminsured_Amount":sessionStorage.selectedAmountTravel,
          "policy_id": this.getEnquiryDetials.policy_id,
          "benefitOption": this.lifePremiumList.benefit_option,
          "personalInformation": {
            "tittle": this.personal.controls['title'].value,
            "firstName": this.personal.controls['firstName'].value,
            "middleName": this.personal.controls['middleName'].value,
            "lasteName": this.personal.controls['lastName'].value,
            "gender": this.personal.controls['gender'].value,
            "dob": this.datepipe.transform(this.personal.controls['dob'].value,'y-MM-dd'),
            "mobile": this.personal.controls['mobile'].value,
            "email": this.personal.controls['email'].value,
            "fathername": this.personal.controls['fatherName'].value,
            "maritalStatus":this.personal.controls['maritalStatus'].value,
            "qualifiction": this.personal.controls['qualifiction'].value,
            "qualifictionOther": this.personal.controls['qualifictionOther'].value,
            "employeeType": this.personal.controls['employeeType'].value,
            "natureOfWork": this.personal.controls['natureOfWork'].value,
            "annualIncome": this.personal.controls['annualIncome'].value,
            "smoker": this.personal.controls['smoker'].value,
            "isExistingPolicyHolder": this.personal.controls['isExistingPolicyHolder'].value,
            "isPoliticleExposed": this.personal.controls['isPoliticleExposed'].value,
            "diabeteDuration": this.personal.controls['diabeteDuration'].value,
            "isHousewife": this.personal.controls['isHousewife'].value,
            "isHusbandCover": this.personal.controls['isHusbandCover'].value
          },
          "addressDetail": {
            "pAddress1": this.personal.controls['pAddress1'].value,
            "pAddress2": this.personal.controls['pAddress2'].value,
            "pCity": this.personal.controls['pCity'].value,
            "pState": this.personal.controls['pState'].value,
            "pPincode": this.personal.controls['pPincode'].value,
            "cAddress1": this.personal.controls['cAddress1'].value,
            "cAddress2": this.personal.controls['cAddress2'].value,
            "cCity": this.personal.controls['cCity'].value,
            "cState": this.personal.controls['cState'].value,
            "cPincode": this.personal.controls['cPincode'].value,
            "isAddressSame": this.personal.controls['isAddressSame'].value
          },
          "nomineeDetail": {
            "tittle": this.nomineeData.ntitle,
            "firstName": this.nomineeData.nfirstName,
            "lastName":  this.nomineeData.nlastName,
            "dob": this.datepipe.transform(this.nomineeData.ndob,'y-MM-dd'),
            "relation":  this.nomineeData.nRelation,
            "relationOther":  this.nomineeData.relationOther,
            "address1":  this.nomineeData.nAddress1,
            "address2":  this.nomineeData.nAddress2,
            "city": this.nomineeData.nCity,
            "state":  this.nomineeData.nState,
            "pincode":  this.nomineeData.nPincode,
            "percent": this.nomineeData.nPercentage,
            "appointeeTittle":  this.nomineeData.atitle,
            "appointeeFullName":  this.nomineeData.aFullName,
            "appointeeDob":  this.nomineeData.adob,
            "appointeeRelation":  this.nomineeData.aRelation,
            "appointeeRelationOther":  this.nomineeData.appointeeRelationOther,
            "appointeePercent":  this.nomineeData.aPercentage
          },
          "addonITerm": {
            "adbr": "NO",
            "adbrSumAssured": "0",
            "idis": "NO",
            "lumpSumBenefitSA": "0",
            "icir": "NO",
            "icirSumAssured": "0",
            "woprCI": "NO",
            "wcir": "NO"
          },
          "addons_itermplus": {
            "adbrSumAssured":this.personal.controls['adbrSumAssured'].value,
            "deathBenefitSA": this.personal.controls['deathBenefitSA'].value,
            "deathBenefitTISA": this.personal.controls['deathBenefitTISA'].value,
            "enchancedCISA":this.personal.controls['enchancedCISA'].value,
            "icirSumAssured": this.personal.controls['icirSumAssured'].value
          }
        };



    console.log(data,'proposal data')
    this.settings.loadingSpinner = true;
    this.TermLifeService.getProposal(data).subscribe(
        (successData) => {
          this.setProposalSuccess(successData, stepper);
        },
        (error) => {
          this.setProposalFailure(error);
        }
    );

  }
  public setProposalSuccess(successData, stepper) {
    this.settings.loadingSpinner = false;
    if (successData.IsSuccess == true) {
      stepper.next();
      this.topScroll();
      this.toastr.success('Proposal created successfully!!');
      this.summaryData = successData.ResponseObject;
      // this.requestedUrl = this.summaryData.proposalUrl;
      sessionStorage.summaryData = JSON.stringify(this.summaryData);
      this.proposalId = this.summaryData.ProposalId;
      this.proposerFormData = this.personal.value;
      this.nomineeFormData = this.nominee.value;
      sessionStorage.proposerFormData = JSON.stringify(this.proposerFormData);
      sessionStorage.nomineeFormData = JSON.stringify(this.nomineeFormData);
      sessionStorage.aegon_proposal_id = this.proposalId;


    } else {
      this.toastr.error(successData.ErrorObject);
    }
  }
  public setProposalFailure(error) {
  }


}
