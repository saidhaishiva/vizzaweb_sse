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
import {Observable, Subject} from 'rxjs';
import {any} from 'codelyzer/util/function';


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
  public annualError: any;
  public sumError: any;
  public incomeError: any;
  public webhost: any;
  public today: any;
  public qualificationList: any;
  public summaryData: any;
  public pincodeList: any;
  public enquiryFormData: any;
  public lifePremiumList: any;
  public stateList: any;
  public premiumList: any;
  public getEnquiryDetials: any;
  public enquiryFromDetials: any;
  public allProductLists: any;

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
  public redirectUrl: any;
  public sum_insured_amount:any;
  public maritialList:any;
  public appointeeRelationList:any;
  public citycList:any;
  public citynList:any;
  public declaration: any;
  public inputReadonly: boolean;
  public apponiteeList: boolean;
  public sum_insure: any;
  public empTypeList: any;
  public premiumData: any;
  public annualData: any;
  public errorMsg: any;
  public errorMsg1: any;
  public errorMsg2: any;
  public errorMsg3: any;
  public errorMsg4: any;
  public errorMsg5: any;
  public errAnnual: any;
  public minDate: any;
  public sameComAddress: any;
  public disabledAddress: any;
  public disabledPerAddress: any;
  public icicMsg : any;
  public ecsaMsg : any;
  public adbsaMsg : any;
  public dbsaMsg : any;
  public husMsg : any;
  public wifeMsg : any;
  public smokerMsg : any;
  public qulMsg : any;
  public dobMsg : any;
  public titleMsg : any;
  public dobAnnualMsg:any;
  public dbsaAnnualMsg:any;
  public adbsaAnnualMsg:any;
  public errorAnnaulMsg:any;
  public annaulIncomeMsg:any;

  public keyUp = new Subject<string>();








  constructor(public validation: ValidationService, public authservice: AuthService ,public fb: FormBuilder,public route: ActivatedRoute,public TermLifeService: TermLifeCommonService,public datepipe: DatePipe, private toastr: ToastrService, public appSettings: AppSettings, public config: ConfigurationService) {
    let stepperindex = 0;
    this.requestedUrl = '';
    this.redirectUrl='';
    const minDate = new Date();
    this.minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
    this.route.params.forEach((params) => {
      if(params.stepper == true || params.stepper == 'true') {
        stepperindex = 2;
        if (sessionStorage.summaryData != '' && sessionStorage.summaryData != undefined) {
          this.summaryData = JSON.parse(sessionStorage.summaryData);
          this.redirectUrl = this.summaryData.redirectLink;
          this.requestedUrl = this.summaryData.bilink;
          this.proposerFormData = JSON.parse(sessionStorage.proposerFormData);
          this.nomineeFormData = JSON.parse(sessionStorage.nomineeFormData);
          this.proposalId = this.summaryData.ProposalId;
          sessionStorage.aegon_proposal_id = this.proposalId;
        }
      }
    });
    this.inputReadonly=false;
    this.disabledAddress = false;
    this.disabledPerAddress = false;

    this.apponiteeList = false;
    this.settings= this.appSettings.settings;
    // const observable = this.keyUp
    //     .map(value => event)
    //     .debounceTime(200)
    //     .distinctUntilChanged()
    //     .flatMap((search) => {
    //       return Observable.of(search).delay(200);
    //     })
    //     .subscribe((data) => {
    //       console.log(data, 'data');
    //       this.getAnnual('annaulIncome');
    //
    //     });

    const observable1 = this.keyUp
        .map(value => event)
        .debounceTime(100)
        .distinctUntilChanged()
        .flatMap((search) => {
          return Observable.of(search).delay(100);
        })
        .subscribe((data) => {
          console.log(data, 'data');
          this.getPremium('');

        });
    this.webhost = this.config.getimgUrl();

    this.personal = this.fb.group({
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: '',
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      fatherName: ['', Validators.required],
      maritalStatus:['', Validators.required],
      qualifiction: ['', Validators.required],
      qualifictionOther:'',
      employeeType: ['', Validators.required],
      natureOfWork: ['', Validators.required],
      natureOfWorkOthers: '',
      annualIncome: ['', Validators.required],
      incomeError: '',
      smoker: ['', Validators.required],
      isExistingPolicyHolder:'NO',
      isPoliticleExposed: 'NO',
      diabeteDuration: '',
      isHousewife: 'No',
      isHusbandCover: 'No',
      email: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
      mobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
      pAddress1: ['', Validators.required],
      pAddress2: ['', Validators.required],
      pPincode: ['', Validators.required],
      pCity: ['', Validators.required],
      pState: ['', Validators.required],
      cAddress1: ['', Validators.required],
      cAddress2: ['', Validators.required],
      cCity: ['', Validators.required],
      cState: ['', Validators.required],
      cPincode: ['', Validators.required],
      isAddressSame: false,
      qualifictionName:'',
      natureOfWorkName:'',
      employeeTypeName:'',
      pStateName:'',
      pCityName:'',
      cCityName:'',
      adbrSumAssured:['', Validators.required],
      deathBenefitSA:'',
      deathBenefitTISA:'',
      enchancedCISA:'',
      cStateName:'',
      icirSumAssured:'',
      criticalIllnessError:'',
      // deathBenefitSAName:'',
      // deathBenefitTISAName:'',['',Validators.compose([Validators.minLength(5),Validators.maxLength(8)])]


    });
    this.nominee = this.fb.group({
      ntitle: ['', Validators.required],
      nfirstName: ['', Validators.required],
      nlastName: ['', Validators.required],
      ndob: ['', Validators.required],
      nRelation: ['', Validators.required],
      relationOther: '',
      nAddress1: ['', Validators.required],
      nAddress2: ['', Validators.required],
      nCity: ['', Validators.required],
      nState: ['', Validators.required],
      nPincode: ['', Validators.required],
      // nPercentage:['', Validators.required],
      atitle: '',
      aFullName:'',
      adob: '',
      aRelation: '',
      appointeeRelationOther:'',
      sameAsProposerAddress: '',
      sameAsPermentAddress: '',
      // aPercentage: '',
      nCityName:'',
      nRelationName:'',
      nStateName:'',
      aRelationName:'',
      appointeeList:'',



    });

    this.errorMsg1 = '';
    this.errorMsg2 = '';
    this.errorMsg3 = '';
    this.errorMsg4 = '';
    this.errorMsg = '';
  }

  ngOnInit() {
    this.enquiryFormData = JSON.parse(sessionStorage.enquiryFormData);
    this.lifePremiumList = JSON.parse(sessionStorage.lifePremiumList);
    console.log(this.lifePremiumList, 'this.lifePremiumList')
    this.getEnquiryDetials = JSON.parse(sessionStorage.getEnquiryDetials);
    this.enquiryFromDetials = JSON.parse(sessionStorage.enquiryFromDetials);

    // if(){
    //     this.personal.controls['adbrSumAssured'].patchValue(this.lifePremiumList.sum_insured_amount);
    // } else {
    //   this.personal.controls['adbrSumAssured'].patchValue('0');
    //
    // }
    this.getQualificationList();

    this.getState();
    this.checkSum();
    this.checkSumAs();
    // this.getPremium();
    this.getnomineerelationship();

    this.getAppointeeRelation();
    // this.getoccupationlist();
    this.sessionData();
    this.personal.controls['dob'].patchValue (this.datepipe.transform(this.enquiryFromDetials.dob, 'y-MM-dd'));

    let dob = this.datepipe.transform(this.enquiryFromDetials.dob, 'y-MM-dd');
    this.proposerAge = this.ageCalculate(dob);
    sessionStorage.proposerAge = this.proposerAge;
    if(this.enquiryFromDetials.gender == 'm')
    {
      this.personal.controls['title'].patchValue('MR');
     if(this.personal.controls['gender'].value == 'm'){
       this.personal.controls['gender'].patchValue('m');
     } else{
       this.personal.controls['gender'].patchValue('f');
     }
    }else if(this.enquiryFromDetials.gender == 'f'){
      this.personal.controls['title'].patchValue('MS');

    }
    this.personal.controls['adbrSumAssured'].patchValue (50000);
    console.log(this.personal.controls['adbrSumAssured'],'this.personal.controls[\'adbrSumAssured\']');
    this.personal.controls['enchancedCISA'].patchValue (500000);
    this.personal.controls['icirSumAssured'].patchValue (500000);
    this.personal.controls['gender'].patchValue(this.enquiryFromDetials.gender);
    this.getMaritalList();
    this.getEmpType();
    this.getnomineerelationship();
    this.personal.controls['cPincode'].patchValue(this.enquiryFromDetials.pincode);
    this.personal.controls['smoker'].patchValue(this.enquiryFromDetials.smoker);


  }

  changeGender() {
    if (this.personal.controls['title'].value == 'MR'){
      this.personal.controls['gender'].patchValue('m');
    } else {
      this.personal.controls['gender'].patchValue('f');
    }

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
  sameascomAddress(){
    if (this.nominee.controls['sameAsProposerAddress'].value) {
      this.sameComAddress = true;
      this.disabledPerAddress = true;
      this.nominee.controls['nAddress1'].patchValue(this.personal.controls['cAddress1'].value);
      this.nominee.controls['nAddress2'].patchValue(this.personal.controls['cAddress2'].value);
      this.nominee.controls['nState'].patchValue(this.personal.controls['cState'].value);
      this.getcitylistn();
      this.nominee.controls['nCity'].patchValue(this.personal.controls['cCity'].value);
      this.nominee.controls['nCityName'].patchValue(this.personal.controls['cCityName'].value);
      this.nominee.controls['nPincode'].patchValue(this.personal.controls['cPincode'].value);
     console.log(this.nominee.controls['nCity'].value);
    } else {
      this.sameComAddress = false;
      this.disabledPerAddress = false;

      this.nominee.controls['nAddress1'].patchValue('');
      this.nominee.controls['nAddress2'].patchValue('');
      this.nominee.controls['nCityName'].patchValue('');
      this.nominee.controls['nCity'].patchValue('');
      this.nominee.controls['nState'].patchValue('');
      this.nominee.controls['nPincode'].patchValue('');
    }

  }
  sameasPerAddress(){
    if (this.nominee.controls['sameAsPermentAddress'].value) {
      this.disabledAddress = true;
      this.sameComAddress = true;
      this.nominee.controls['nAddress1'].patchValue(this.personal.controls['pAddress1'].value);
      this.nominee.controls['nAddress2'].patchValue(this.personal.controls['pAddress2'].value);
      this.nominee.controls['nState'].patchValue(this.personal.controls['pState'].value);
      this.getcitylistn();
      this.nominee.controls['nCity'].patchValue(this.personal.controls['pCity'].value);
      this.nominee.controls['nCityName'].patchValue(this.personal.controls['pCityName'].value);
      this.nominee.controls['nPincode'].patchValue(this.personal.controls['pPincode'].value);


    } else {
      this.sameComAddress = false;
      this.disabledAddress = false;
      this.nominee.controls['nAddress1'].patchValue('');
      this.nominee.controls['nAddress2'].patchValue('');
      this.nominee.controls['nCityName'].patchValue('');
      this.nominee.controls['nCity'].patchValue('');
      this.nominee.controls['nState'].patchValue('');
      this.nominee.controls['nPincode'].patchValue('');

    }

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
        console.log(dob , 'dob');
        if (selectedDate.length == 10) {
          this.proposerAge = this.ageCalculate(dob);
          this.getPremium('dob');
          // sessionStorage.proposerAge = this.proposerAge;

        }

      } else if (typeof event.value._i == 'object') {
        // dob = this.datepipe.transform(event.value, 'MMM d, y');
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (dob.length == 10) {
          this.proposerAge = this.ageCalculate(dob);
          this.getPremium('dob');
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
  //
  // validateAccidental(event:any){
  //   console.log(this.personal.controls['deathBenefitSA'].value, 'err');
  //   if(this.lifePremiumList.benefit_option == 'L' || this.lifePremiumList.benefit_option == 'LP') {
  //     if (this.personal.controls['deathBenefitSA'].value > 30000000) {
  //       this.annualError = ' Maximum Accidental Death Benefit should be 30000000';
  //     } else {
  //       if (((this.personal.controls['adbrSumAssured'].value) <= (this.personal.controls['deathBenefitSA'].value)) && (this.personal.controls['adbrSumAssured'].value >= 50000)) {
  //         console.log(this.personal.controls['adbrSumAssured'].value,'this.personal.controls[\'adbrSumAssured\'].value')
  //         this.annualError = '';
  //       } else {
  //         this.annualError = 'ADB sum assured should be between 50000 to Base SA ';
  //       }
  //     }
  //   }
  validateAnnual(annualIncome){
    if(annualIncome!= '')
    {
      if(annualIncome >= 200000){
        this.annaulIncomeMsg = '';
        this.errorMsg = '';
        this.getAnnual('annaulIncome');
      }else{
        this.annaulIncomeMsg = 'Minimum AnnualIncome Should be 2Lac';
        this.errorMsg = 'Minimum AnnualIncome Should be 2Lac';
      }

    }else{
      this.annaulIncomeMsg = 'Annual Income should not be Empty';
      this.errorMsg = 'Annual Income should not be Empty';
    }

    }
    //AddOn Funcion's
  deathBenefitSA(sumInsured){
    sumInsured = parseInt(sumInsured);
    if(sumInsured!= '')
    {
      if(sumInsured >= 2500000){
        if(sumInsured % 1000 == 0)
        {
        this.dbsaMsg = '';
        this.errorMsg = '';
        this.getPremium('dbsa');
      }
      else{
        this.dbsaMsg = 'Value must be multiple of 1,000';
        this.errorMsg = 'Value must be multiple of 1,000';
      }
      }else{
        this.dbsaMsg = 'Minimum Sum Assured Should be 25Lac';
        this.errorMsg = 'Minimum Sum Assured Should be 25Lac';
      }

    }else{
      this.dbsaMsg = 'Sum Assured should not be Empty';
      this.errorMsg = 'Sum Assured should not be Empty';
    }
  }

  adbrSumAssured(sumInsured){
    sumInsured = parseInt(sumInsured);
    let adbsumInsured = parseInt(this.personal.controls['deathBenefitSA'].value);
    if(sumInsured!= '')
    {
      if(sumInsured >= 50000 && sumInsured <= adbsumInsured){
        if(sumInsured % 1000 == 0)
        {
          if(sumInsured > 30000000)
          {
            this.adbsaMsg = 'The maximum eligibility of this rider is 3 Cr';
            this.errorMsg = 'The maximum eligibility of this rider is 3 Cr';
          }
          else
          {
            this.adbsaMsg = '';
            this.errorMsg = '';
            this.getPremium('adbsa');
          }
        }
        else{
          this.adbsaMsg = 'Value must be multiple of 1,000';
          this.errorMsg = 'Value must be multiple of 1,000';
        }
      }else{
        this.adbsaMsg = 'ADB SA should be min. 50000 and max. 3Cr. or equal to Base SA ';
        this.errorMsg = 'ADB SA should be min. 50000 and max. 3Cr. or equal to Base SA ';
      }

    }else{
      this.adbsaMsg = 'Rider should not be Empty';
      this.errorMsg = 'Rider should not be Empty';
    }
  }

  enchancedCISA(sumInsured){
    sumInsured = parseInt(sumInsured);
    let adbsumInsured = parseInt(this.personal.controls['deathBenefitSA'].value);
    if(sumInsured!= '')
    {
      if(sumInsured >= 500000 && sumInsured <= 5000000){
        if(sumInsured % 1000 == 0) {
          if(sumInsured > adbsumInsured)
          {
            this.ecsaMsg = 'Enhance CI rider sum assured should be between 5Lac to 50 Lac or Base SA';
            this.errorMsg = 'Enhance CI rider sum assured should be between 5Lac to 50 Lac or Base SA';
          }
          else {
            this.ecsaMsg = '';
            this.errorMsg = '';
            this.getPremium('ecsa');
          }
        }
        else{
          this.ecsaMsg = 'Value must be multiple of 1,000';
          this.errorMsg = 'Value must be multiple of 1,000';
        }
      }else{
        this.ecsaMsg = 'Enhance CI rider sum assured should be between 5Lac to 50 Lac or Base SA';
        this.errorMsg = 'Enhance CI rider sum assured should be between 5Lac to 50 Lac or Base SA';
      }

    }else{
      this.ecsaMsg = 'Rider should not be Empty';
      this.errorMsg = 'Rider should not be Empty';
    }
  }

  icirSumAssured(sumInsured){
    sumInsured = parseInt(sumInsured);
    let adbsumInsured = parseInt(this.personal.controls['deathBenefitSA'].value);
    if(sumInsured!= '')
    {
      if(sumInsured >= 500000 && sumInsured <= 5000000){
        if(sumInsured % 1000 == 0) {
        if(sumInsured > adbsumInsured)
        {
          this.icicMsg = 'Basic Critical Illness Benefit rider sum assured should be between 5Lac to 50 Lac or Base SA';
          this.errorMsg = 'Basic Critical Illness Benefit rider sum assured should be between 5Lac to 50 Lac or Base SA';
        }
        else {
          this.icicMsg = '';
          this.errorMsg = '';
          this.getPremium('icic');
        }
        }
        else{
          this.ecsaMsg = 'Value must be multiple of 1,000';
          this.errorMsg = 'Value must be multiple of 1,000';
        }
      }else{
        this.icicMsg = 'Basic Critical Illness Benefit rider sum assured should be between 5Lac to 50 Lac or Base SA';
        this.errorMsg = 'Basic Critical Illness Benefit rider sum assured should be between 5Lac to 50 Lac or Base SA';
      }
    }else{
      this.icicMsg = 'Rider should not be Empty';
      this.errorMsg = 'Rider should not be Empty';
    }
  }


    validatesuminsured(){
      if (this.personal.controls['deathBenefitSA'].value >= 2500000){
      this.sumError = ''
      }else{
        this.sumError = 'Sum assured should be above 2500000 '
      }

    }

  validateCriticalIllness(type) {
    if(type == 'LHP') {
      if(this.personal.controls['deathBenefitTISA'].value == 5000000 ){

        if(this.personal.controls['enchancedCISA'].value <= 1000000 && this.personal.controls['enchancedCISA'].value >= 500000) {
          this.personal.controls['criticalIllnessError'].patchValue('');
        }
        else {
          this.personal.controls['criticalIllnessError'].patchValue('Critical Illness Benefit should be 5 to 10 Lakhs');
        }

      } else if(this.personal.controls['deathBenefitTISA'].value == 7500000 ){
        if(this.personal.controls['enchancedCISA'].value <= 1500000 && this.personal.controls['enchancedCISA'].value >= 500000) {
          this.personal.controls['criticalIllnessError'].patchValue('');
        }
        else {
          this.personal.controls['criticalIllnessError'].patchValue('Critical Illness Benefit should be 5 to 15 Lakhs');
        }
      }else if(this.personal.controls['deathBenefitTISA'].value == 10000000 ){
        if(this.personal.controls['enchancedCISA'].value <= 2000000 && this.personal.controls['enchancedCISA'].value >= 500000) {
          this.personal.controls['criticalIllnessError'].patchValue('');
        }
        else {
          this.personal.controls['criticalIllnessError'].patchValue('Critical Illness Benefit should be 5 to 20 Lakhs');
        }
      }
      else if(this.personal.controls['deathBenefitTISA'].value == 12500000 ){
        if(this.personal.controls['enchancedCISA'].value <= 2500000 && this.personal.controls['enchancedCISA'].value >= 500000) {
          this.personal.controls['criticalIllnessError'].patchValue('');
        }
        else {
          this.personal.controls['criticalIllnessError'].patchValue('Critical Illness Benefit should be 5 to 25 Lakhs');
        }
      }else if(this.personal.controls['deathBenefitTISA'].value == 15000000 ){
        if(this.personal.controls['enchancedCISA'].value <= 3000000 && this.personal.controls['enchancedCISA'].value >= 500000) {
          this.personal.controls['criticalIllnessError'].patchValue('');
        }
        else {
          this.personal.controls['criticalIllnessError'].patchValue('Critical Illness Benefit should be 5 to 30 Lakhs');
        }
      }else if(this.personal.controls['deathBenefitTISA'].value == 17500000 ){
        if(this.personal.controls['enchancedCISA'].value <= 3500000 && this.personal.controls['enchancedCISA'].value >= 500000) {
          this.personal.controls['criticalIllnessError'].patchValue('');
        }
        else {
          this.personal.controls['criticalIllnessError'].patchValue('Critical Illness Benefit should be 5 to 35 Lakhs');
        }
      }else if(this.personal.controls['deathBenefitTISA'].value == 20000000 ){
        if(this.personal.controls['enchancedCISA'].value <= 4000000 && this.personal.controls['enchancedCISA'].value >= 500000) {
          this.personal.controls['criticalIllnessError'].patchValue('');
        }
        else {
          this.personal.controls['criticalIllnessError'].patchValue('Critical Illness Benefit should be 5 to 40 Lakhs');
        }
      }else if(this.personal.controls['deathBenefitTISA'].value == 22500000 ){
        if(this.personal.controls['enchancedCISA'].value <= 4500000 && this.personal.controls['enchancedCISA'].value >= 500000) {
          this.personal.controls['criticalIllnessError'].patchValue('');
        }
        else {
          this.personal.controls['criticalIllnessError'].patchValue('Critical Illness Benefit should be 5 to 45 Lakhs');
        }
      }
      else if(this.personal.controls['deathBenefitTISA'].value == 25000000 ){
        if(this.personal.controls['enchancedCISA'].value <= 5000000 && this.personal.controls['enchancedCISA'].value >= 500000) {
          this.personal.controls['criticalIllnessError'].patchValue('');
        }
        else {
          this.personal.controls['criticalIllnessError'].patchValue('Critical Illness Benefit should be 5 to 50 Lakhs');
        }
      }
    } else if(type == 'LH') {

      if(this.personal.controls['deathBenefitTISA'].value == 5000000){

        if(this.personal.controls['icirSumAssured'].value <= 1000000 && this.personal.controls['icirSumAssured'].value >= 500000) {
          this.personal.controls['criticalIllnessError'].patchValue('');
        }
        else {
          this.personal.controls['criticalIllnessError'].patchValue('Critical Illness Benefit should be 5 to 10 Lakhs');
        }

      } else if(this.personal.controls['deathBenefitTISA'].value == 7500000 ){
        if(this.personal.controls['icirSumAssured'].value <= 1500000 && this.personal.controls['icirSumAssured'].value >= 500000) {
          this.personal.controls['criticalIllnessError'].patchValue('');
        }
        else {
          this.personal.controls['criticalIllnessError'].patchValue('Critical Illness Benefit should be 5 to 15 Lakhs');
        }
      }else if(this.personal.controls['deathBenefitTISA'].value == 10000000 ){
      if(this.personal.controls['icirSumAssured'].value <= 2000000 && this.personal.controls['icirSumAssured'].value >= 500000) {
        this.personal.controls['criticalIllnessError'].patchValue('');
      }
      else {
        this.personal.controls['criticalIllnessError'].patchValue('Critical Illness Benefit should be 5 to 20 Lakhs');
      }
    }
    else if(this.personal.controls['deathBenefitTISA'].value == 12500000 ){
      if(this.personal.controls['icirSumAssured'].value <= 2500000 && this.personal.controls['icirSumAssured'].value >= 500000) {
        this.personal.controls['criticalIllnessError'].patchValue('');
      }
      else {
        this.personal.controls['criticalIllnessError'].patchValue('Critical Illness Benefit should be 5 to 25 Lakhs');
      }
    }else if(this.personal.controls['deathBenefitTISA'].value == 15000000 ){
      if(this.personal.controls['icirSumAssured'].value <= 3000000 && this.personal.controls['icirSumAssured'].value >= 500000) {
        this.personal.controls['criticalIllnessError'].patchValue('');
      }
      else {
        this.personal.controls['criticalIllnessError'].patchValue('Critical Illness Benefit should be 5 to 30 Lakhs');
      }
    }else if(this.personal.controls['deathBenefitTISA'].value == 17500000 ){
      if(this.personal.controls['icirSumAssured'].value <= 3500000 && this.personal.controls['icirSumAssured'].value >= 500000) {
        this.personal.controls['criticalIllnessError'].patchValue('');
      }
      else {
        this.personal.controls['criticalIllnessError'].patchValue('Critical Illness Benefit should be 5 to 35 Lakhs');
      }
    }else if(this.personal.controls['deathBenefitTISA'].value == 20000000 ){
      if(this.personal.controls['icirSumAssured'].value <= 4000000 && this.personal.controls['icirSumAssured'].value >= 500000) {
        this.personal.controls['criticalIllnessError'].patchValue('');
      }
      else {
        this.personal.controls['criticalIllnessError'].patchValue('Critical Illness Benefit should be 5 to 40 Lakhs');
      }
    }else if(this.personal.controls['deathBenefitTISA'].value == 22500000 ){
      if(this.personal.controls['icirSumAssured'].value <= 4500000 && this.personal.controls['icirSumAssured'].value >= 500000) {
        this.personal.controls['criticalIllnessError'].patchValue('');
      }
      else {
        this.personal.controls['criticalIllnessError'].patchValue('Critical Illness Benefit should be 5 to 45 Lakhs');
      }
    }
    else if(this.personal.controls['deathBenefitTISA'].value == 25000000 ){
      if(this.personal.controls['icirSumAssured'].value <= 5000000 && this.personal.controls['icirSumAssured'].value >= 500000) {
        this.personal.controls['criticalIllnessError'].patchValue('');
      }
      else {
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
          console.log(this.nomineeAge, ' this.nomineeAg');

        }

      } else if (typeof event.value._i == 'object') {
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (dob.length == 10) {
          this.nomineeAge = this.ageCalculate(dob);
          console.log(this.nomineeAge,'age')

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

        }
        this.dateError2 = '';
      }
      sessionStorage.appointeeAge = this.appointeeAge;

    }
  }

  ageNominee() {
    if(sessionStorage.nomineeAge < 18){
      this.apponiteeList = true;
      console.log(this.apponiteeList,'cccccc')
    } else {
      this.apponiteeList = false;

    }
  }

  appointeeAgeValid(event: any) {
    if ( this.apponiteeList == true ) {
      this.nominee.controls['atitle'].patchValue(this.nominee.controls['atitle'].value);
      this.nominee.controls['aFullName'].patchValue(this.nominee.controls['aFullName'].value);
      this.nominee.controls['adob'].patchValue(this.nominee.controls['adob'].value);
      this.nominee.controls['aRelation'].patchValue(this.nominee.controls['aRelation'].value);

      this.nominee.controls['atitle'].setValidators([Validators.required]);
      this.nominee.controls['aFullName'].setValidators([Validators.required]);
      this.nominee.controls['adob'].setValidators([Validators.required]);
      this.nominee.controls['aRelation'].setValidators([Validators.required]);
    } else {
      this.nominee.controls['atitle'].patchValue('');
      this.nominee.controls['aFullName'].patchValue('');
      this.nominee.controls['adob'].patchValue('');
      this.nominee.controls['aRelation'].patchValue('');

      this.nominee.controls['atitle'].setValidators(null);
      this.nominee.controls['aFullName'].setValidators(null);
      this.nominee.controls['adob'].setValidators(null);
      this.nominee.controls['aRelation'].setValidators(null);

    }
    this.nominee.controls['atitle'].updateValueAndValidity();
    this.nominee.controls['aFullName'].updateValueAndValidity();
    this.nominee.controls['adob'].updateValueAndValidity();
    this.nominee.controls['aRelation'].updateValueAndValidity();

  }

  otherNominee() {

    if (this.nominee.controls['nRelation'].value == 'Others') {
      this.nominee.controls['relationOther'].patchValue(this.nominee.controls['relationOther'].value);

      this.nominee.controls['relationOther'].setValidators([Validators.required]);
    } else {
      this.nominee.controls['relationOther'].patchValue('');

      this.nominee.controls['relationOther'].setValidators(null);

    }
    this.nominee.controls['relationOther'].updateValueAndValidity();

  }

  otherAppointee() {

    if (this.nominee.controls['aRelation'].value == 'Other') {
      this.nominee.controls['appointeeRelationOther'].patchValue(this.nominee.controls['appointeeRelationOther'].value);

      this.nominee.controls['appointeeRelationOther'].setValidators([Validators.required]);
    } else {
      this.nominee.controls['appointeeRelationOther'].patchValue('');

      this.nominee.controls['appointeeRelationOther'].setValidators(null);

    }
    this.nominee.controls['appointeeRelationOther'].updateValueAndValidity();

  }



  // AGE VALIDATION
  ageCalculate(dob) {
    console.log(dob,'dob');
    let today = new Date();
    let birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    let dd = today.getDate()- birthDate.getDate();
    if( m < 0 || m == 0 && today.getDate() < birthDate.getDate()){
      age = age-1;
    }
    return age;
  }


  // SAME AS ADDRESS
  sameAddress(value:any){
    if (this.personal.controls['isAddressSame'].value) {
      console.log(this.personal.controls['isAddressSame'].value,'ifff');
      this.inputReadonly = true;
      this.personal.controls['pAddress1'].patchValue(this.personal.controls['cAddress1'].value);
          this.personal.controls['pAddress2'].patchValue(this.personal.controls['cAddress2'].value);
          this.personal.controls['pCity'].patchValue(this.personal.controls['cCity'].value);
          this.personal.controls['pCityName'].patchValue(this.personal.controls['cCityName'].value);
          this.personal.controls['pState'].patchValue(this.personal.controls['cState'].value);
          this.personal.controls['pPincode'].patchValue(this.personal.controls['cPincode'].value);
          this.cityList = JSON.parse(sessionStorage.citycList);
          sessionStorage.cityList = JSON.stringify(this.cityList);


    } else {
      this.inputReadonly = false;
      this.personal.controls['pAddress1'].patchValue('');
          this.personal.controls['pAddress2'].patchValue('');
          this.personal.controls['pCityName'].patchValue('');
          this.personal.controls['pCity'].patchValue('');
          this.personal.controls['pState'].patchValue('');
          this.personal.controls['pPincode'].patchValue('');
      if (sessionStorage.cityList != '' && sessionStorage.cityList != undefined) {
        this.cityList = JSON.parse(sessionStorage.cityList);
      } else {
        this.cityList = {};
      }
    }

  }

  typeAddressDeatils() {
    if (this.personal.controls['isAddressSame'].value) {
      this.personal.controls['pAddress1'].setValue(this.personal.controls['cAddress1'].value);
      this.personal.controls['pAddress2'].setValue(this.personal.controls['cAddress2'].value);
      this.personal.controls['pCity'].setValue(this.personal.controls['cCity'].value);
      this.personal.controls['pCityName'].setValue(this.personal.controls['cCityName'].value);
      this.personal.controls['pState'].setValue(this.personal.controls['cState'].value);
      this.personal.controls['pPincode'].setValue(this.personal.controls['cPincode'].value);
      this.cityList = JSON.parse(sessionStorage.citycList);

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

        if(this.errorMsg == '')
        {
          stepper.next();
          this.topScroll();
        }
        else {
          this.toastr.error(this.errorMsg);
        }

        } else {
        this.toastr.error('Proposer age should be 18 or above');

      }

      }

  }

  //NEXT BUTTON NOMINEE
  public nomineeDetails(stepper: MatStepper, value) {
    console.log(value, 'nominee');
    this.nomineeData= value;
    sessionStorage.stepper2 = '';
    sessionStorage.stepper2 = JSON.stringify(value);
    console.log(this.nominee.valid, 'checked');
    if(this.nominee.valid) {
      if(this.apponiteeList == true){
      if(sessionStorage.appointeeAge >= 18) {
        console.log(this.nomineeData,'nomm')
        this.proposal(stepper);
      } else {
        this.toastr.error('Appointee age should be 18 or above');

      }
      }else {
        this.proposal(stepper);

      }



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
      console.log(data,'datapin')
  }


  public getoccupationlistSuccess(successData) {
    if (successData.IsSuccess) {
      this.occupationList = successData.ResponseObject;
      sessionStorage.occupationList = JSON.stringify(this.occupationList);

    }
  }
  public getoccupationlistFailure(error) {
  }
  getcitylistC() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
      'state_name': this.personal.controls['cState'].value,
    }
    this.TermLifeService.getcitylist(data).subscribe(
        (successData) => {
          this.getcityclistSuccess(successData);
        },
        (error) => {
          this.getcityclistFailure(error);
        }
    );
    console.log(data,'dataCity')
  }

  public getcityclistSuccess(successData) {
    if (successData.IsSuccess) {
      this.citycList = successData.ResponseObject;
      sessionStorage.citycList = JSON.stringify(this.citycList);
      console.log(this.citycList,'this.citycList')

    }
  }
  public getcityclistFailure(error) {
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
      sessionStorage.cityList = JSON.stringify(this.cityList);
    }
  }
  public getcitylistFailure(error) {
  }



    getcitylistn() {
        const data = {
            'platform': 'web',
            'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
            'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
            'state_name': this.nominee.controls['nState'].value,
        }
        this.TermLifeService.getcitylist(data).subscribe(
            (successData) => {
                this.getcitynlistSuccess(successData);
            },
            (error) => {
                this.getcitynlistFailure(error);
            }
        );
        console.log(data,'dataCity')
    }

    public getcitynlistSuccess(successData) {
        if (successData.IsSuccess) {
            this.citynList = successData.ResponseObject;
        }
    }
    public getcitynlistFailure(error) {
    }


    getnomineerelationship() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
      'gender': this.nominee.controls['ntitle'].value  == 'MR' ? 'M' : 'F',
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
      sessionStorage.nomineeRelationship = JSON.stringify(this.nomineeRelationship);

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
    if (successData.IsSuccess) {
      this.stateList = successData.ResponseObject;
    }

  }
  public stateFailure(error) {
  }

  getPremium(type) {
    const data = {
      "user_id": this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      "role_id":  this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      "pos_status": this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
      "platform": "web",
      "product_id": this.lifePremiumList.product_id,
      "suminsured_Amount":this.personal.controls['deathBenefitSA'].value,
      "policy_id": this.getEnquiryDetials.policy_id,
      "benefitOption": this.lifePremiumList.benefit_option,
      "type":type,
      "personalInformation": {

        "gender": this.personal.controls['gender'].value == 'f' ? 'F' : 'M',
        "dob": this.datepipe.transform(this.personal.controls['dob'].value,'y-MM-dd'),
        "annualIncome": this.personal.controls['annualIncome'].value,
        "smoker": this.personal.controls['smoker'].value == 'y'? 'YES' : 'NO',
        "diabeteDuration": this.personal.controls['diabeteDuration'].value == null || this.personal.controls['diabeteDuration'].value == '' ? '0' : this.personal.controls['diabeteDuration'].value,
        "isHousewife": this.personal.controls['isHousewife'].value ? '0' : '1',
        "isHusbandCover": this.personal.controls['isHusbandCover'].value ? '0' : '1',
        'age':sessionStorage.proposerAge,
        'emp_type' :this.personal.controls['employeeType'].value ? this.personal.controls['employeeType'].value : '',
        'education' : this.personal.controls['qualifiction'].value ? this.personal.controls['qualifiction'].value : '',
        'nationality' :'Indian',
      },
      "addressDetail": {

        "pCity": this.personal.controls['pCity'].value,
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

    }
    this.TermLifeService.getPremium(data).subscribe(
        (successData) => {
          this.premiumSuccess(successData);
        },
        (error) => {
          this.premiumFailure(error);
        }
    );
  }

  public premiumSuccess(successData) {
    if (successData.IsSuccess) {
       this.premiumData = true;
      this.premiumList = successData.ResponseObject;
      this.lifePremiumList.adbrPremium = this.premiumList.adbrPremium;
      this.lifePremiumList.dethBenefit = this.premiumList.dethBenefit;
      sessionStorage.deathBenefitSA =   this.personal.controls['deathBenefitSA'].value;
      this.lifePremiumList.eCiPremium = this.premiumList.eCiPremium;
      this.lifePremiumList.baseCiPremium = this.premiumList.baseCiPremium;
      this.lifePremiumList.wopPremium = this.premiumList.wopPremium;
      this.lifePremiumList.total = this.premiumList.total;
      console.log(this.premiumList, 'this.premiumList')
      console.log(this.lifePremiumList, 'this.lifePremiumList');
      this.errorMsg = '';
      this.icicMsg = '';
      this.ecsaMsg = '';
      this.adbsaMsg = '';
      this.dbsaMsg = '';
      this.husMsg = '';
      this.wifeMsg = '';
      this.smokerMsg = '';
      this.qulMsg = '';
      this.dobMsg = '';
      this.titleMsg = '';

    }else{
     this.premiumData = false;
      this.errorMsg = successData.ErrorObject;
     if(successData.type == 'title')
     {
       this.titleMsg = successData.ErrorObject;
     }
     else if(successData.type == 'dob')
     {
       this.dobMsg = successData.ErrorObject;
     }
     else if(successData.type == 'qul')
     {
       this.qulMsg = successData.ErrorObject;
     }
     else if(successData.type == 'smoker')
     {
       this.smokerMsg = successData.ErrorObject;
     }
     else if(successData.type == 'wife')
     {
       this.wifeMsg = successData.ErrorObject;
     }
     else if(successData.type == 'hus')
     {
       this.husMsg = successData.ErrorObject;
     }
     else if(successData.type == 'dbsa')
     {
       this.dbsaMsg = successData.ErrorObject;
     }
     else if(successData.type == 'adbsa')
     {
       this.adbsaMsg = successData.ErrorObject;
     }
     else if(successData.type == 'ecsa')
     {
       this.ecsaMsg = successData.ErrorObject;
     }
     else if(successData.type == 'icic')
     {
       this.icicMsg = successData.ErrorObject;
     }
     else {
       console.log(successData);
     }
    }

  }
  public premiumFailure(error) {

  }


  getAnnual(type){
        const data = {
            'platform': 'web',
            'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
            'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
            'age':sessionStorage.proposerAge,
            'emp_type' :this.personal.controls['employeeType'].value,
            'education' : this.personal.controls['qualifiction'].value,
            'type':type,
            'nationality' :'Indian',
            'annual_income':this.personal.controls['annualIncome'].value,
            'sum_assured':this.personal.controls['deathBenefitSA'].value
        }

            this.TermLifeService.getAnnuallist(data).subscribe(
                (successData) => {
                    this.getAnnuallistSuccess(successData);
                },
                (error) => {
                    this.getAnnuallistFailure(error);
                }
            );
            console.log(data,'datapin')
    }
             public getAnnuallistSuccess(successData){
                if (successData.IsSuccess) {

                  this.annualData = true;
                 this.annualList = successData.ResponseObject;
                  this.dobAnnualMsg = '';
                  this.dbsaAnnualMsg = '';
                  this.adbsaAnnualMsg = '';
                  this.dbsaAnnualMsg = '';
                  this.errorAnnaulMsg = '';
                  this.annaulIncomeMsg = '';
                  this.qulMsg = '';

        }else
          {
            this.annualData = false;
            this.errorAnnaulMsg = successData.ErrorObject;
            if(successData.type == 'dob')
            {
              this.dobAnnualMsg = successData.ErrorObject;
            }
            else if(successData.type == 'dbsa')
            {
              this.dbsaAnnualMsg = successData.ErrorObject;
            }
            else if(successData.type == 'adbsa')
            {
              this.adbsaAnnualMsg = successData.ErrorObject;
            }
            else if(successData.type == 'annaulIncome')
            {
              this.annaulIncomeMsg = successData.ErrorObject;
            }
            else if(successData.type == 'qul')
            {
              this.qulMsg = successData.ErrorObject;
            }
            else
            {
              console.log(successData);
            }
            console.log(this.annaulIncomeMsg,'AnnualIncome')
          }
    }

    public getAnnuallistFailure(error){


    }


  getMaritalList(){
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
      'gender': this.personal.controls['title'].value == 'MR' ? 'M' : 'F',
    }
    if (this.personal.controls['title'].value !='') {
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
      sessionStorage.maritialList = JSON.stringify(this.maritialList);

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
      'gender': this.personal.controls['title'].value  == 'MR' ? 'M' : 'F',
    }
    if (this.personal.controls['title'].value !='') {
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
      sessionStorage.empTypeList = JSON.stringify(this.empTypeList);
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


  changecCitylist() {
    this.personal.controls['cCityName'].patchValue(this.cityList[this.personal.controls['cCity'].value]);
  }
  changeCitylist() {
    this.personal.controls['pCityName'].patchValue(this.cityList[this.personal.controls['pCity'].value]);
  }

  changeNcitylist() {
    this.nominee.controls['nCityName'].patchValue(this.cityList[this.nominee.controls['nCity'].value]);
  }
  changenomineerelationship() {
    this.nominee.controls['nRelationName'].patchValue(this.nomineeRelationship[this.nominee.controls['nRelation'].value]);
  }
  // changeAppointeerelationship() {
  //   this.nominee.controls['aRelationName'].patchValue(this.appointeeRelationList[this.nominee.controls['aRelation'].value]);
  // }
  changeEmpType() {
    this.personal.controls['employeeTypeName'].patchValue(this.empTypeList[this.personal.controls['employeeType'].value]);
    this.getoccupationlist();

  }
  changecState()
  {
    this.personal.controls['cStateName'].patchValue(this.stateList[this.personal.controls['cState'].value]);
    this.getcitylistC();

  }
  changeState()
  {
    this.personal.controls['pStateName'].patchValue(this.stateList[this.personal.controls['pState'].value]);
    this.getcitylist();
  }

  changenState()
  {

    this.nominee.controls['nStateName'].patchValue(this.stateList[this.nominee.controls['nState'].value]);
    this.getcitylistn();

  }
  checkSum() {
    if (this.personal.controls['deathBenefitSA'].value == '') {
      this.personal.controls['deathBenefitSA'].patchValue(this.lifePremiumList.sum_insured_amount);

    } else {
      this.personal.controls['deathBenefitSA'].updateValueAndValidity();

        }
}

  checkSumAs()
  {
    this.personal.controls['deathBenefitTISA'].patchValue(this.lifePremiumList.sum_insured_amount);
  }

  sessionData() {
    if (sessionStorage.citycList != '' && sessionStorage.citycList != undefined) {
      this.citycList = JSON.parse(sessionStorage.citycList);
    }
    if (sessionStorage.cityList != '' && sessionStorage.cityList != undefined) {
      this.cityList = JSON.parse(sessionStorage.cityList);
    }

    if (sessionStorage.citynList != '' && sessionStorage.citynList != undefined) {
      this.citynList = JSON.parse(sessionStorage.citynList);
    }
    if (sessionStorage.empTypeList != '' && sessionStorage.empTypeList != undefined) {
      this.empTypeList = JSON.parse(sessionStorage.empTypeList);
    }
    if (sessionStorage.maritialList != '' && sessionStorage.maritialList != undefined) {
          this.maritialList = JSON.parse(sessionStorage.maritialList);
        }
    if (sessionStorage.nomineeRelationship != '' && sessionStorage.nomineeRelationship != undefined) {
      this.nomineeRelationship = JSON.parse(sessionStorage.nomineeRelationship);
    }
    if (sessionStorage.occupationList != '' && sessionStorage.occupationList != undefined) {
      this.occupationList = JSON.parse(sessionStorage.occupationList);
    }


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
        fatherName: stepper1.fatherName,
        maritalStatus: stepper1.maritalStatus,
        qualifiction: stepper1.qualifiction,
        qualifictionOther: stepper1.qualifictionOther,
        employeeType: stepper1.employeeType,
        natureOfWork: stepper1.natureOfWork,
        natureOfWorkOthers: stepper1.natureOfWorkOthers,
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
        isAddressSame: stepper1.isAddressSame,
        qualifictionName: stepper1.qualifictionName,
        natureOfWorkName: stepper1.natureOfWorkName,
        employeeTypeName: stepper1.employeeTypeName,
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
      if(stepper2.nomineeAge <=18)
      {
        this.apponiteeList=true;
      }
      this.nominee = this.fb.group({
        nomineeAge :stepper2.nomineeAge,
        apponiteeList:stepper2.appointeeList,
        ntitle: stepper2.ntitle,
        nfirstName: stepper2.nfirstName,
        nlastName: stepper2.nlastName,
        ndob: this.datepipe.transform(stepper2.ndob, 'y-MM-dd'),
        nRelation: stepper2.nRelation,
        relationOther: stepper2.relationOther,
        nAddress1: stepper2.nAddress1,
        nAddress2: stepper2.nAddress2,
        nCity: stepper2.nCity,
        nState: stepper2.nState,
        sameAsProposerAddress: stepper2.sameAsProposerAddress,
        nPincode: stepper2.nPincode,
        sameAsPermentAddress: stepper2.sameAsPermentAddress,
        atitle: stepper2.atitle,
        aFullName: stepper2.aFullName,
        // adob: stepper2.adob,
        adob: this.datepipe.transform(stepper2.adob, 'y-MM-dd'),
        aRelation: stepper2.aRelation,
        appointeeRelationOther: stepper2.appointeeRelationOther,
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
            "gender": this.personal.controls['gender'].value == 'f' ? 'F' : 'M',
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
            "smoker": this.personal.controls['smoker'].value == 'y'? 'YES' : 'NO',
            "isExistingPolicyHolder": this.personal.controls['isExistingPolicyHolder'].value,
            "isPoliticleExposed": this.personal.controls['isPoliticleExposed'].value,
            "diabeteDuration": this.personal.controls['diabeteDuration'].value == null || this.personal.controls['diabeteDuration'].value == '' ? '0' : this.personal.controls['diabeteDuration'].value,
            "isHousewife": this.personal.controls['isHousewife'].value ? '0' : '1',
            "isHusbandCover": this.personal.controls['isHusbandCover'].value ? '0' : '1',
            'age':sessionStorage.proposerAge,
            'emp_type' :this.personal.controls['employeeType'].value ? this.personal.controls['employeeType'].value : '',
            'education' : this.personal.controls['qualifiction'].value ? this.personal.controls['qualifiction'].value : '',
            'nationality' :'Indian',
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
            "isAddressSame": this.personal.controls['isAddressSame'].value ? 'YES' : 'NO'
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
            "percent": "100",
            "appointeeTittle":  this.nomineeData.atitle,
            "appointeeFullName":  this.nomineeData.aFullName,
            "appointeeDob":  this.nomineeData.adob,
            "appointeeRelation":  this.nomineeData.aRelation,
            "appointeeRelationOther":  this.nomineeData.appointeeRelationOther,
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
      this.toastr.success('BI Generated Sucessfully!!');
      this.summaryData = successData.ResponseObject;
      this.requestedUrl = this.summaryData.bilink;
      this.redirectUrl = this.summaryData.redirectLink;
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
