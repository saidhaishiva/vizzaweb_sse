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
  public medicalDetail: FormGroup;
  public bankDetail: FormGroup;
  public nomineeDetail: FormGroup;
  public documentDetail: FormGroup;
  public itemsNominee: any;
  public addExistingInsurance: any;
  public addmedicalQuestions: any;
  public etitle: any;
  public egender: any;
  public minDate: any;
  public maxDate: any;
  public step: any;
  public taxRequired: any;
  public getStepper1: any;
  public getStepper2: any;
  public getMedicalDetail: any;
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
  public epolicyOption: any;
  public epayoutOption: any;
  public eHeightInches: any;
  public eWeightChanged: any;
  public weightList: any;
  public ePolicyCategory: any;
  public eNomineeRelation: any;
  public eInsuranceRepository: any;
  public etopUpRates: any;
  public eDocumentProof: any;
  public eIncomeProof: any;
  public eproposalProof: any;
  public eageDocProof: any;
  public eaddressProof: any;
  public eaddressDocProof: any;
  public ekycProof: any;
  public eOtherDocumentProof: any;
  public identityLifeProof: any;
  public esalereqProof: any;
  public proposerAge: any;
  public proposerSpouseAge: any;
  public dateError: any;
  public dateSpouseError: any;
  public today: any;
  public currentStep: any;
  public personalData: any;
  public summaryData: any;
  public requestedUrl: any;
  public insurerData: any;
  public proposerFormData: any;
  public nomineeFormData: any;
  public insuredFormData: any;
  public medicalFormData: any;
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
  public fileDetails: any;
  public url: any;
  public uploadIdProofName: any;
  public uploadBankProofName: any;
  public uploadAgeProofName: any;
  public uploadIncomeProofName: any;
  public uploadAddressProofName: any;
  public uploadAddressProposal: any;
  public uploadIncomeProposal: any;
  public uploadIdProposal: any;
  public uploadAgeProposal: any;
  public uploadDocumentProofName: any;
  public uploadDocumentProposal: any;
  public proposalProofName: any;
  public proposalProProof: any;
  public salesReqProofName: any;
  public salesReqProposal: any;
  public photoProofName: any;
  public photoProposal: any;
  public kycProofName: any;
  public kycProposal: any;
  public ageProofPath: any;
  public ageProposalPath: any;
  public addressProofPath: any;
  public idProposalPath: any;
  public kycProposalPath: any;
  public incomeProofProposalPath: any;
  public addressProposalPath: any;
  public incomeProofPath: any;
  public documentProofPath: any;
  public documentProposalPath: any;
  public proposalProofPath: any;
  public proposalProPath: any;
  public salesReqProofPath: any;
  public salesReqProposalPath: any;
  public PhotographPath: any;
  public PhotographProPath: any;
  public kycProofPath: any;
  public idProofPath: any;
  public allImage: any;
  public documentPath: any;
  public fileUploadStatus: boolean;


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
          this.medicalFormData = JSON.parse(sessionStorage.medicalFormData);
          this.proposalId = this.summaryData.ProposalId;
          sessionStorage.edelweiss_term_life_id = this.proposalId;
        }

      }
    });
    this.currentStep = stepperindex;
    this.addressProofPath = [];
    this.idProposalPath = [];
    this.kycProposalPath = [];
    this.incomeProofProposalPath = [];
    this.addressProposalPath = [];
    this.proposalProofPath = [];
    this.proposalProPath = [];
    this.salesReqProofPath = [];
    this.salesReqProposalPath = [];
    this.documentProofPath = [];
    this.documentProposalPath = [];
    this.PhotographPath = [];
    this.PhotographProPath = [];
    this.incomeProofPath = [];
    this.ageProofPath = [];
    this.ageProposalPath = [];
    this.kycProofPath = [];
    this.idProofPath = [];
    this.allImage = [];
    this.fileUploadStatus = true;
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
      isStaff: '',
      employeeCode: '',
      stitle: '',
      sfirstName: '',
      smidName: '',
      slastName: '',
      sdob: '',
      semailId: '',
      smobileNo: '',
      isSmokerSpouse: '',
      isStaffSpouse: '',
      employeeCodeSpouse: '',
      relationSpouseProposer: '',
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
      isStaff: '',
      employeeCode: '',
      stitle: '',
      sfirstName: '',
      smidName: '',
      slastName: '',
      sdob: '',
      semailId: '',
      smobileNo: '',
      isSmokerSpouse: '',
      isStaffSpouse: '',
      employeeCodeSpouse: '',
      relationSpouseInsurer: '',
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
      isCriminal: '',
      criminalDetails: '',
      identityProof: ['', Validators.compose([Validators.required])],
      identityProofName: '',
      categorization: ['', Validators.compose([Validators.required])],
      travelOutsideIndia: '',
      pilot: '',
      adventurousActivities: '',
      adventurousActivitiesDetails: '',
      addrProof: ['', Validators.compose([Validators.required])],
      addrProofName: '',
      heightFeets: ['', Validators.compose([Validators.required])],
      heightInches: ['', Validators.compose([Validators.required])],
      weight: ['', Validators.compose([Validators.required])],
      hasWeightChanged: ['', Validators.compose([Validators.required])],
      inbetweenweight: '',
      weightChangedreason: '',
      insureHistory: 'No',
      insureAccNo: '',
      provideAccNo: '',
      epolicy: 'No',
      einsureAccNo: 'No',
      epolicy1: 'No',
      insureRepository: '',
      planOption: '',
      workSiteFlag: '',
      investmentStrategy: '',
      risingStar: '',
      policyOption: '',
      additionalBenefit: '',
      TopUpBenefit: '',
      topUpBenefitPercentage: '',
      topUpRate: '',
      betterHalfBenefit: '',
      betterHalfsumAssured: '',
      waiverOfPremiumBenefit: '',
      criticalIllness: '',
      criticalsumAssured: '',
      isADB: '',
      sumAssuredADB: '',
      isATPD: '',
      sumAssuredATPD: '',
      isHCB: '',
      sumAssuredHCB: '',
      payoutOption: '',
      noOfMonths: '',
      payoutPercentageIncome: '',
      sameAsProposer: false,

    });

      this.medicalDetail = this.fb.group({
        medicalTreatment: '',
        medicationDetails: '',
        receivedTreatment1: '',
        diagnosedDetails:  '',
        receivedTreatment2: '',
        aidsDetails: '',
        healthInformation: '',
        drugsInd: '',
        drugsDetails: '',
        alcoholInd: '',
        alcoholDetails: '',
        tobaccoInd: '',
        tobaccoDetails: '',
        tobaccoStopInd: '',
        tobaccoStopDetails: '',
        consultDoctorInd: '',
        consultDoctorDetails: '',
        ECGInd: '',
        ECGDetails: '',
        admitInd: '',
        admitDetails:  '',
        heartDieaseInd: '',
        heartDieaseDetails: '',
        BPInd: '',
        BPDetails:  '',
        respiratoryDieaseInd: '',
        respiratoryDieaseDetails: '',
        diabetesInd: '',
        diabetesDetails: '',
        kidneyDieaseInd: '',
        kidneyDieaseDetails: '',
        digestiveDieaseInd: '',
        digestiveDieaseDetails: '',
        cancerDieaseInd: '',
        cancerDieaseDetails: '',
        tropicalDieaseInd: '',
        tropicalDieaseDetails: '',
        thyroidDieaseInd: '',
        thyroidDieaseDetails: '',
        bloodDieaseInd: '',
        bloodDieaseDetails: '',
        nervousDieaseInd: '',
        nervousDieaseDetails: '',
        ENTDieaseInd: '',
        ENTDieaseDetails: '',
        muscleDieaseInd: '',
        muscleDieaseDetails: '',
        alcoholicInd: '',
        alcoholicDetails: '',
        otherIllnessInd: '',
        otherIllnessDetails: '',
        deformityInd: '',
        deformityDetails: '',
        symptomsInd: '',
        symptomsDetails: '',
        pregnantInd: '',
        pregnantweeks: '',
        femaleDieaseInd: '',
        femaleDieaseWeeks: '',
        medicalQuestions : new FormArray([
              this.medicalQuesCreate()
          ]),

      });

    this.bankDetail = this.fb.group({
      accountNo: ['', Validators.compose([Validators.required])],
      accName: ['', Validators.compose([Validators.required])],
      name: '',
      location: '',
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

    this.addmedicalQuestions = this.medicalDetail.get('medicalQuestions') as FormArray;

    this.documentDetail = this.fb.group({
      incomeLA: '',
      identityLA: '',
      addressLA: '',
      ageLA: '',
      documentLA: '',
      proposalLA: '',
      salereqLA: '',
      // photoLA: '',
      kycLA: '',
      incomePA: '',
      identityPA: '',
      addressPA: '',
      agePA: '',
      documentPA: '',
      proposalPA: '',
      salereqPA: '',
      // photoPA: '',
      kycPA: '',


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
    this.getPolicyOption();
    this.getpayoutOption();
    this.geteWeightChanged();
    this.changeWeightChanged();
    this.getePolicyCategory();
    this.geteNomineeRelation();
    this.geteInsuranceRepository();
    this.getetopUpRate();
    this.geteDocumentProof();
    this.geteIncomeProof();
    this.geteproposalProof();
    this.geteageDocProof();
    this.geteaddressDocProof();
    this.getekycProof();
    this.geteOtherDocumentProof();
    this.geteidLifeProof();
    this.getesalereqProof();
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
      this.existingInsureReq();
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

    // Medical Question Create
    medicalQuesCreate() {
        return new FormGroup({
            disease: new FormControl(),
            datediagnois :  new FormControl(),
            treatment :  new FormControl(),
            dosage: new FormControl(),
            doctor :  new FormControl(),
            datefollowup :  new FormControl(),
            anycomplications :  new FormControl(),
            remarks :  new FormControl(),
            medicalDobValidError :  new FormControl(),
            medicalfollowDobValidError :  new FormControl()
        });
    }

    addMedItems() {
        if (this.medicalDetail.get('medicalQuestions').value.length < 5) {
            this.addmedicalQuestions.push(this.medicalQuesCreate());
            // this.existingInsureReq();
            console.log(this.addmedicalQuestions, 'this.addmedicalQuestions');
        }
    }
    removeMedItems(index) {
        let removeQue =  this.medicalDetail.get('medicalQuestions') as FormArray;
        console.log(removeQue,'ssssss')
        removeQue.removeAt(index);
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

  addEventSpouse(event) {
    if (event.value != null) {
      let selectedDate = '';
      this.proposerSpouseAge = '';
      let dob = '';
      if (typeof event.value._i == 'string') {
        const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
        if (pattern.test(event.value._i) && event.value._i.length == 10) {
          this.dateSpouseError = '';
        } else {
          this.dateSpouseError = 'Enter Valid Date';
        }
        selectedDate = event.value._i;
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (selectedDate.length == 10) {
          this.proposerSpouseAge = this.ageCalculate(dob);
          // sessionStorage.proposerSpouseAge = this.proposerSpouseAge;

        }

      } else if (typeof event.value._i == 'object') {
        // dob = this.datepipe.transform(event.value, 'MMM d, y');
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (dob.length == 10) {
          this.proposerSpouseAge = this.ageCalculate(dob);
          // sessionStorage.insuredAgePA = this.proposerSpouseAge;

        }
        this.dateSpouseError = '';
      }
      sessionStorage.proposerSpouseAge = this.proposerSpouseAge;

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
    }
  }

  typeAddressDeatils() {
    if (this.proposer.controls['isCurrPerAddrSame'].value) {
      this.proposer.controls['perAddr1'].setValue( this.proposer.controls['currAddr1'].value),
          this.proposer.controls['perAddr2'].setValue( this.proposer.controls['currAddr2'].value),
          this.proposer.controls['perAddr3'].setValue( this.proposer.controls['currAddr3'].value),
          this.proposer.controls['perCity'].setValue( this.proposer.controls['currCity'].value),
          this.proposer.controls['perPincode'].setValue( this.proposer.controls['currPincode'].value),
          this.proposer.controls['perState'].setValue( this.proposer.controls['currState'].value)

    }
  }

  typeAddressDeatils1() {
    if (this.insureArray.controls['isCurrPerAddrSame'].value) {
          this.insureArray.controls['perAddr1'].setValue( this.insureArray.controls['currAddr1'].value),
          this.insureArray.controls['perAddr2'].setValue( this.insureArray.controls['currAddr2'].value),
          this.insureArray.controls['perAddr3'].setValue( this.insureArray.controls['currAddr3'].value),
          this.insureArray.controls['perCity'].setValue( this.insureArray.controls['currCity'].value),
          this.insureArray.controls['perPincode'].setValue( this.insureArray.controls['currPincode'].value),
          this.insureArray.controls['perState'].setValue( this.insureArray.controls['currState'].value)

    } else {
          this.insureArray.controls['perAddr1'].setValue(''),
          this.insureArray.controls['perAddr2'].setValue(''),
          this.insureArray.controls['perAddr3'].setValue(''),
          this.insureArray.controls['perCity'].setValue(''),
          this.insureArray.controls['perPincode'].setValue(''),
          this.insureArray.controls['perState'].setValue('')
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
          this.insureArray.controls['isStaff'].patchValue(this.proposer.controls['isStaff'].value),
          this.insureArray.controls['employeeCode'].patchValue(this.proposer.controls['employeeCode'].value),
          this.insureArray.controls['stitle'].patchValue(this.proposer.controls['stitle'].value),
          this.insureArray.controls['sfirstName'].patchValue(this.proposer.controls['sfirstName'].value),
          this.insureArray.controls['smidName'].patchValue(this.proposer.controls['smidName'].value),
          this.insureArray.controls['slastName'].patchValue(this.proposer.controls['slastName'].value),
          this.insureArray.controls['sdob'].patchValue(this.proposer.controls['sdob'].value),
          this.insureArray.controls['semailId'].patchValue(this.proposer.controls['semailId'].value),
          this.insureArray.controls['smobileNo'].patchValue(this.proposer.controls['smobileNo'].value),
          this.insureArray.controls['isSmokerSpouse'].patchValue(this.proposer.controls['isSmokerSpouse'].value),
          this.insureArray.controls['isStaffSpouse'].patchValue(this.proposer.controls['isStaffSpouse'].value),
          this.insureArray.controls['employeeCodeSpouse'].patchValue(this.proposer.controls['employeeCodeSpouse'].value),
          this.insureArray.controls['relationSpouseInsurer'].patchValue(this.proposer.controls['relationSpouseProposer'].value),
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
          this.insureArray.controls['isStaff'].patchValue(''),
          this.insureArray.controls['employeeCode'].patchValue(''),
          this.insureArray.controls['stitle'].patchValue(''),
          this.insureArray.controls['sfirstName'].patchValue(''),
          this.insureArray.controls['smidName'].patchValue(''),
          this.insureArray.controls['slastName'].patchValue(''),
          this.insureArray.controls['sdob'].patchValue(''),
          this.insureArray.controls['semailId'].patchValue(''),
          this.insureArray.controls['smobileNo'].patchValue(''),
          this.insureArray.controls['isSmokerSpouse'].patchValue(''),
          this.insureArray.controls['isStaffSpouse'].patchValue(''),
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
            this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nDob.patchValue(dob);

            this.getAge = this.ageCalculate(dob);
            this.getDays = this.ageCalculateInsurer(dob_days);
          }
        }
      }
      if ( i == 0) {
        sessionStorage.nomineAge = this.getAge;
      }

      if ( i != 0) {
        if (this.getAge <= 18) {
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
      if ( i == 0) {
        sessionStorage.appointeeAge = this.getAge;
      } else {
        sessionStorage.appointeeAge2 = this.getAge;
      }

      console.log(sessionStorage.appointeeAge,'appointeeAge1111');
      console.log(sessionStorage.appointeeAge2,'appointeeAge2222');



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

// // date of medical
    addEventMedical(event, i, type) {
        if(type == 'medical') {
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
                        this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].medicalDobValidError.patchValue('');

                    } else {
                        this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].medicalDobValidError.patchValue('Enter Valid DOB');
                    }

                    selectedDate = event.value._i;

                    if (selectedDate.length == 10) {
                        this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].medicalDobValidError.patchValue('');
                        this.getAge = this.ageCalculate(dob);
                        this.getDays = this.ageCalculatemedical(dob_days);
                        this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].datediagnois.patchValue(dob);

                    }

                } else if (typeof event.value._i == 'object') {
                    if (dob.length == 10) {
                        this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].medicalDobValidError.patchValue('');
                        this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].datediagnois.patchValue(dob);

                        this.getAge = this.ageCalculate(dob);
                        this.getDays = this.ageCalculatemedical(dob_days);
                    }
                }
            }


        } else if(type == 'medicalfollowup') {

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
                        this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].medicalfollowDobValidError.patchValue('');

                    } else {
                        this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].medicalfollowDobValidError.patchValue('Enter Valid DOB');
                    }

                    selectedDate = event.value._i;

                    if (selectedDate.length == 10) {
                        this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].medicalfollowDobValidError.patchValue('');
                        this.getAge = this.ageCalculate(dob);
                        this.getDays = this.ageCalculatemedical(dob_days);
                        this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].datefollowup.patchValue(dob);

                    }

                }
                else if (typeof event.value._i == 'object') {
                    if (dob.length == 10) {
                        this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].medicalfollowDobValidError.patchValue('');
                        this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].datefollowup.patchValue(dob);
                        this.getAge = this.ageCalculate(dob);
                        this.getDays = this.ageCalculatemedical(dob_days);
                    }
                }
            }




        }
    }

  ageCalculatemedical(getDays) {
        let a = moment(getDays, 'DD/MM/YYYY');
        let b = moment(new Date(), 'DD/MM/YYYY');
        let days = b.diff(a, 'days');
        return days;
    }

    dateOfmedicalEvent(event) {
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
            if (this.nomineeDetail.get('itemsNominee').value.length < 2) {
                let nomineeForm = this.nomineeDetail.get('itemsNominee') as FormArray;
                nomineeForm.push(this.initItemRows());
            }

        }
    // }

    removeNominee(event, index) {
        let nomineeForm = this.nomineeDetail.get('itemsNominee') as FormArray;
        nomineeForm.removeAt(1);
    }




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

    // Medical Details
    medicalDetails(stepper: MatStepper, value) {
        sessionStorage.medicalQuesDetails = '';
        sessionStorage.medicalQuesDetails = JSON.stringify(value);
        console.log(this.medicalDetail, 'medicalDetail');
        console.log(this.medicalDetail.valid, 'this.valid');
        if (this.medicalDetail.valid) {
            stepper.next();
            this.topScroll();
        }
  }



  // nominee details
  nomineeDetailNext(stepper, value) {
    console.log(value,'value');
    sessionStorage.stepper3Details = JSON.stringify(value);
    console.log(this.nomineeDetail.valid, 'this.nomineeDetail.valid');
    console.log(this.nomineeDetail.get('itemsNominee')['controls'].length,'length');

    // nomineeAge validate
    let nomineeValid = false;
    if (sessionStorage.nomineAge != '' && sessionStorage.nomineAge != undefined) {
      if (sessionStorage.nomineAge <= 18) {
        nomineeValid = true;
      }
    }
    // appointeeAge validatate
    let appointeeAge = false;
    if (sessionStorage.appointeeAge != '' && sessionStorage.appointeeAge != undefined) {
      if (sessionStorage.appointeeAge >= 18) {
        appointeeAge = true;
      }
    }

    let appointeeAge2 = false;
    if (sessionStorage.appointeeAge2 != '' && sessionStorage.appointeeAge2 != undefined ) {
      if ( sessionStorage.appointeeAge2 >=18 ) {
        appointeeAge2 = true;
      }
    }
    console.log(sessionStorage.appointeeAge,'appointeeAge11222');
    console.log(sessionStorage.appointeeAge2,'appointeeAge2233');

    // nominee 2 age validation
    let nominee2ageval;
    for (let i=0; i < this.nomineeDetail.get('itemsNominee')['controls'].length; i++) {
      if ( this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nomineeAgeVal.value == 1) {
        nominee2ageval = true;

      } else {
        nominee2ageval = false;
      }
    }
    console.log(sessionStorage.appointeeAge,'appointeeAge11232');

    console.log(nominee2ageval, 'nominee2ageval');
    console.log(nomineeValid, 'nomineeVLID');
    if (this.nomineeDetail.controls.itemsNominee.valid) {
      // if ( nomineeValid == true || nominee2ageval = true ) {
            if ( appointeeAge == true || appointeeAge2 == true) {


                  stepper.next();
                  this.topScroll();

            } else {
              this.toastr.error('Appointee Age should be greater than 18.');
            }
      // }


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

  summaryNext(stepper) {
    stepper.next();
    this.topScroll();
  }

  // document Upload
  uploadProof(event: any, type) {
  console.log(event,'event');
    let getUrlEdu = [];
    this.fileDetails = [];
    if (type == 'address_LifeAssured') {

      for (let i = 0; i < event.target.files.length; i++) {
        this.fileDetails.push({
          'base64': '',
          'content_type': this.documentDetail.controls['addressLA'].value,
          'proofType': type,
          'fileExt': event.target.files[i].type,
          'name': event.target.files[i].name
        });
      }
      for (let i = 0; i < event.target.files.length; i++) {
        const reader = new FileReader();
        reader.onload = ( event: any) => {
          this.url = event.target.result;
          getUrlEdu.push(this.url.split(','));
          this.onUploadFinished(this.fileDetails, getUrlEdu, 'add_LA');
        };
        reader.readAsDataURL(event.target.files[0]);
      }
      this.uploadAddressProofName = this.fileDetails[0].name;

    }
    else if (type == 'address_Proposal') {

      for (let i = 0; i < event.target.files.length; i++) {
        this.fileDetails.push({
          'base64': '',
          'content_type': this.documentDetail.controls['addressPA'].value,
          'proofType': type,
          'fileExt': event.target.files[i].type,
          'name': event.target.files[i].name
        });
      }
      for (let i = 0; i < event.target.files.length; i++) {
        const reader = new FileReader();
        reader.onload = ( event: any) => {
          this.url = event.target.result;
          getUrlEdu.push(this.url.split(','));
          this.onUploadFinished(this.fileDetails, getUrlEdu, 'add_p');
        };
        reader.readAsDataURL(event.target.files[0]);
      }
      this.uploadAddressProposal = this.fileDetails[0].name;

    }
    else if (type == 'income_LifeAssured') {

      for (let i = 0; i < event.target.files.length; i++) {
        this.fileDetails.push({
          'base64': '',
          'content_type': this.documentDetail.controls['incomeLA'].value,
          'proofType': type,
          'fileExt': event.target.files[i].type,
          'name': event.target.files[i].name
        });
      }
      for (let i = 0; i < event.target.files.length; i++) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          this.url = event.target.result;
          getUrlEdu.push(this.url.split(','));
          this.onUploadFinished(this.fileDetails, getUrlEdu, 'income_LA');
        };
        reader.readAsDataURL(event.target.files[i]);
      }
      this.uploadIncomeProofName = this.fileDetails[0].name;

    } else if (type == 'income_Proposal') {

      for (let i = 0; i < event.target.files.length; i++) {
        this.fileDetails.push({
          'base64': '',
          'content_type': this.documentDetail.controls['incomePA'].value,
          'proofType': type,
          'fileExt': event.target.files[i].type,
          'name': event.target.files[i].name
        });
      }
      for (let i = 0; i < event.target.files.length; i++) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          this.url = event.target.result;
          getUrlEdu.push(this.url.split(','));
          this.onUploadFinished(this.fileDetails, getUrlEdu, 'income_P');

        };
        reader.readAsDataURL(event.target.files[i]);
      } this.uploadIncomeProposal = this.fileDetails[0].name;
    }

      else if (type == 'id_LifeAssured') {

      for (let i = 0; i < event.target.files.length; i++) {
        this.fileDetails.push({
          'base64': '',
          'content_type': this.documentDetail.controls['identityLA'].value,
          'proofType': type,
          'fileExt': event.target.files[i].type,
          'name': event.target.files[i].name
        });
      }
      for (let i = 0; i < event.target.files.length; i++) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          this.url = event.target.result;
          getUrlEdu.push(this.url.split(','));
          this.onUploadFinished(this.fileDetails, getUrlEdu, 'id_LA');
        };
        reader.readAsDataURL(event.target.files[i]);
      }
      this.uploadIdProofName = this.fileDetails[0].name;
    } else if (type == 'id_Proposal') {

      for (let i = 0; i < event.target.files.length; i++) {
        this.fileDetails.push({
          'base64': '',
          'content_type': this.documentDetail.controls['identityPA'].value,
          'proofType': type,
          'fileExt': event.target.files[i].type,
          'name': event.target.files[i].name
        });
      }
      for (let i = 0; i < event.target.files.length; i++) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          this.url = event.target.result;
          getUrlEdu.push(this.url.split(','));
          this.onUploadFinished(this.fileDetails, getUrlEdu, 'id_p');
        };
        reader.readAsDataURL(event.target.files[i]);
      }
      this.uploadIdProposal = this.fileDetails[0].name;
    } else if (type == 'age_LifeAssured') {

      for (let i = 0; i < event.target.files.length; i++) {
        this.fileDetails.push({
          'base64': '',
          'content_type': this.documentDetail.controls['ageLA'].value,
          'proofType': type,
          'fileExt': event.target.files[i].type,
          'name': event.target.files[i].name
        });
      }
      for (let i = 0; i < event.target.files.length; i++) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          this.url = event.target.result;
          getUrlEdu.push(this.url.split(','));
          this.onUploadFinished(this.fileDetails, getUrlEdu, 'age_LA');
        };
        reader.readAsDataURL(event.target.files[i]);
      }
      this.uploadAgeProofName = this.fileDetails[0].name;

    } else if (type == 'age_Proposal') {

      for (let i = 0; i < event.target.files.length; i++) {
        this.fileDetails.push({
          'base64': '',
          'content_type': this.documentDetail.controls['agePA'].value,
          'proofType': type,
          'fileExt': event.target.files[i].type,
          'name': event.target.files[i].name
        });
      }
      for (let i = 0; i < event.target.files.length; i++) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          this.url = event.target.result;
          getUrlEdu.push(this.url.split(','));
          this.onUploadFinished(this.fileDetails, getUrlEdu, 'age_p');
        };
        reader.readAsDataURL(event.target.files[i]);
      }
      this.uploadAgeProposal = this.fileDetails[0].name;

    } else if (type == 'document_LifeAssured') {

      for (let i = 0; i < event.target.files.length; i++) {
        this.fileDetails.push({
          'base64': '',
          'content_type': this.documentDetail.controls['documentLA'].value,
          'proofType': type,
          'fileExt': event.target.files[i].type,
          'name': event.target.files[i].name
        });
      }
      for (let i = 0; i < event.target.files.length; i++) {
        const reader = new FileReader();
        reader.onload = ( event: any) => {
          this.url = event.target.result;
          getUrlEdu.push(this.url.split(','));
          this.onUploadFinished(this.fileDetails, getUrlEdu, 'document_LA');
        };
        reader.readAsDataURL(event.target.files[i]);
      }
      this.uploadDocumentProofName = this.fileDetails[0].name;

    } else if (type == 'document_Proposal') {

      for (let i = 0; i < event.target.files.length; i++) {
        this.fileDetails.push({
          'base64': '',
          'content_type': this.documentDetail.controls['documentPA'].value,
          'proofType': type,
          'fileExt': event.target.files[i].type,
          'name': event.target.files[i].name
        });
      }
      for (let i = 0; i < event.target.files.length; i++) {
        const reader = new FileReader();
        reader.onload = ( event: any) => {
          this.url = event.target.result;
          getUrlEdu.push(this.url.split(','));
          this.onUploadFinished(this.fileDetails, getUrlEdu, 'document_p');
        };
        reader.readAsDataURL(event.target.files[i]);
      }
      this. uploadDocumentProposal= this.fileDetails[0].name;

    } else if (type == 'proposal_LifeAssured') {

      for (let i = 0; i < event.target.files.length; i++) {
        this.fileDetails.push({
          'base64': '',
          'content_type': this.documentDetail.controls['proposalLA'].value,
          'proofType': type,
          'fileExt': event.target.files[i].type,
          'name': event.target.files[i].name
        });
      }
      for (let i = 0; i < event.target.files.length; i++) {
        const reader = new FileReader();
        reader.onload = ( event: any) => {
          this.url = event.target.result;
          getUrlEdu.push(this.url.split(','));
          this.onUploadFinished(this.fileDetails, getUrlEdu, 'proposal_LA');
        };
        reader.readAsDataURL(event.target.files[i]);
      }
      this.proposalProofName = this.fileDetails[0].name;

    } else if (type == 'proposal_Proposal') {

      for (let i = 0; i < event.target.files.length; i++) {
        this.fileDetails.push({
          'base64': '',
          'content_type': this.documentDetail.controls['proposalPA'].value,
          'proofType': type,
          'fileExt': event.target.files[i].type,
          'name': event.target.files[i].name
        });
      }
      for (let i = 0; i < event.target.files.length; i++) {
        const reader = new FileReader();
        reader.onload = ( event: any) => {
          this.url = event.target.result;
          getUrlEdu.push(this.url.split(','));
          this.onUploadFinished(this.fileDetails, getUrlEdu, 'proposal_p');
        };
        reader.readAsDataURL(event.target.files[i]);
      }
      this.proposalProProof = this.fileDetails[0].name;

    } else if (type == 'salesReq_LifeAssured') {

      for (let i = 0; i < event.target.files.length; i++) {
        this.fileDetails.push({
          'base64': '',
          'content_type': this.documentDetail.controls['salereqLA'].value,
          'proofType': type,
          'fileExt': event.target.files[i].type,
          'name': event.target.files[i].name
        });
      }
      for (let i = 0; i < event.target.files.length; i++) {
        const reader = new FileReader();
        reader.onload = ( event: any) => {
          this.url = event.target.result;
          getUrlEdu.push(this.url.split(','));
          this.onUploadFinished(this.fileDetails, getUrlEdu, 'salesReq_LA');
        };
        reader.readAsDataURL(event.target.files[i]);
      }
      this.salesReqProofName = this.fileDetails[0].name;

    } else if (type == 'salesReq_Proposal') {

      for (let i = 0; i < event.target.files.length; i++) {
        this.fileDetails.push({
          'base64': '',
          'content_type': this.documentDetail.controls['salereqPA'].value,
          'proofType': type,
          'fileExt': event.target.files[i].type,
          'name': event.target.files[i].name
        });
      }
      for (let i = 0; i < event.target.files.length; i++) {
        const reader = new FileReader();
        reader.onload = ( event: any) => {
          this.url = event.target.result;
          getUrlEdu.push(this.url.split(','));
          this.onUploadFinished(this.fileDetails, getUrlEdu, 'salesReq_p');
        };
        reader.readAsDataURL(event.target.files[i]);
      }
      this.salesReqProposal = this.fileDetails[0].name;

    } else if (type == 'photograph_LifeAssured') {

      for (let i = 0; i < event.target.files.length; i++) {
        this.fileDetails.push({
          'base64': '',
          'content_type': '1',
          'proofType': type,
          'fileExt': event.target.files[i].type,
          'name': event.target.files[i].name
        });
      }
      for (let i = 0; i < event.target.files.length; i++) {
        const reader = new FileReader();
        reader.onload = ( event: any) => {
          this.url = event.target.result;
          getUrlEdu.push(this.url.split(','));
          this.onUploadFinished(this.fileDetails, getUrlEdu, 'photo_LA');
        };
        reader.readAsDataURL(event.target.files[i]);
      }
      this.photoProofName = this.fileDetails[0].name;

    } else if (type == 'photograph_Proposal') {

      for (let i = 0; i < event.target.files.length; i++) {
        this.fileDetails.push({
          'base64': '',
          'content_type': '2',
          'proofType': type,
          'fileExt': event.target.files[i].type,
          'name': event.target.files[i].name
        });
      }
      for (let i = 0; i < event.target.files.length; i++) {
        const reader = new FileReader();
        reader.onload = ( event: any) => {
          this.url = event.target.result;
          getUrlEdu.push(this.url.split(','));
          this.onUploadFinished(this.fileDetails, getUrlEdu, 'photo_p');
        };
        reader.readAsDataURL(event.target.files[i]);
      }
      this.photoProposal = this.fileDetails[0].name;

    } else if (type == 'kyc_LifeAssured') {

      for (let i = 0; i < event.target.files.length; i++) {
        this.fileDetails.push({
          'base64': '',
          'content_type': this.documentDetail.controls['kycLA'].value,
          'proofType': type,
          'fileExt': event.target.files[i].type,
          'name': event.target.files[i].name
        });
      }
      for (let i = 0; i < event.target.files.length; i++) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          this.url = event.target.result;
          getUrlEdu.push(this.url.split(','));
          this.onUploadFinished(this.fileDetails, getUrlEdu, 'kyc_LA');
        };
        reader.readAsDataURL(event.target.files[i]);
      }
      this.kycProofName = this.fileDetails[0].name;
    } else if (type == 'kyc_Proposal') {

      for (let i = 0; i < event.target.files.length; i++) {
        this.fileDetails.push({
          'base64': '',
          'content_type': this.documentDetail.controls['kycPA'].value,
          'proofType': type,
          'fileExt': event.target.files[i].type,
          'name': event.target.files[i].name
        });
      }
      for (let i = 0; i < event.target.files.length; i++) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          this.url = event.target.result;
          getUrlEdu.push(this.url.split(','));
          this.onUploadFinished(this.fileDetails, getUrlEdu, 'kyc_p');
        };
        reader.readAsDataURL(event.target.files[i]);
      }
      this.kycProposal = this.fileDetails[0].name;
    }

  }

  onUploadFinished(values, basecode, type) {
    values[0].base64 = basecode[0][1];

    for (let k = 0; k < values.length; k++) {
      if (this.allImage.indexOf(values[k].name) == -1) {
        this.allImage.push(values[k]);
      }
    }
    console.log(this.allImage , 'this.allImage.this.allImage.');
    if (type == 'add_LA') {
      this.addressProofPath = [];
      for (let k = 0; k < values.length; k++) {
        if (this.addressProofPath.indexOf(values[k].name) == -1) {
          this.addressProofPath.push(values[k]);
        }
      }
    }
    else  if (type == 'add_p') {
      this.addressProposalPath = [];
      for (let k = 0; k < values.length; k++) {
        if (this.addressProposalPath.indexOf(values[k].name) == -1) {
          this.addressProposalPath.push(values[k]);
        }
      }
    }
    else if (type == 'income_LA') {
      this.incomeProofPath = [];
      for (let k = 0; k < values.length; k++) {
        if (this.incomeProofPath.indexOf(values[k].name) == -1) {
          this.incomeProofPath.push(values[k]);
        }
      }
    }
    else if (type == 'income_P') {
      this.incomeProofProposalPath = [];
      for (let k = 0; k < values.length; k++) {
        if (this.incomeProofProposalPath.indexOf(values[k].name) == -1) {
          this.incomeProofProposalPath.push(values[k]);
        }
      }
    }
    else if (type == 'id_LA') {
      this.idProofPath = [];
      for (let k = 0; k < values.length; k++) {
        if (this.idProofPath.indexOf(values[k].name) == -1) {
          this.idProofPath.push(values[k]);
        }
      }
    }
    else if (type == 'id_p') {
      this.idProposalPath = [];
      for (let k = 0; k < values.length; k++) {
        if (this.idProposalPath.indexOf(values[k].name) == -1) {
          this.idProposalPath.push(values[k]);
        }
      }
    }
    else if (type == 'age_LA') {
      this.ageProofPath = [];
      for (let k = 0; k < values.length; k++) {
        if (this.ageProofPath.indexOf(values[k].name) == -1) {
          this.ageProofPath.push(values[k]);
        }
      }
    }
    else if (type == 'age_p') {
      this.ageProposalPath = [];
      for (let k = 0; k < values.length; k++) {
        if (this.ageProposalPath.indexOf(values[k].name) == -1) {
          this.ageProposalPath.push(values[k]);
        }
      }
    }
    else if (type == 'document_LA') {
      this.documentProofPath = [];
      for (let k = 0; k < values.length; k++) {
        if (this.documentProofPath.indexOf(values[k].name) == -1) {
          this.documentProofPath.push(values[k]);
        }
      }
    }
    else if (type == 'document_p') {
      this.documentProposalPath = [];
      for (let k = 0; k < values.length; k++) {
        if (this.documentProposalPath.indexOf(values[k].name) == -1) {
          this.documentProposalPath.push(values[k]);
        }
      }
    }
    else if (type == 'proposal_LA') {
      this.proposalProofPath = [];
      for (let k = 0; k < values.length; k++) {
        if (this.proposalProofPath.indexOf(values[k].name) == -1) {
          this.proposalProofPath.push(values[k]);
        }
      }
    }
    else if (type == 'proposal_p') {
      this.proposalProPath = [];
      for (let k = 0; k < values.length; k++) {
        if (this.proposalProPath.indexOf(values[k].name) == -1) {
          this.proposalProPath.push(values[k]);
        }
      }
    }
    else if (type == 'salesReq_LA') {
      this.salesReqProofPath = [];
      for (let k = 0; k < values.length; k++) {
        if (this.salesReqProofPath.indexOf(values[k].name) == -1) {
          this.salesReqProofPath.push(values[k]);
        }
      }
    }
    else if (type == 'salesReq_p') {
      this.salesReqProposalPath = [];
      for (let k = 0; k < values.length; k++) {
        if (this.salesReqProposalPath.indexOf(values[k].name) == -1) {
          this.salesReqProposalPath.push(values[k]);
        }
      }
    }
    else if (type == 'photo_LA') {
      this.PhotographPath = [];
      for (let k = 0; k < values.length; k++) {
        if (this.PhotographPath.indexOf(values[k].name) == -1) {
          this.PhotographPath.push(values[k]);
        }
      }
    }
    else if (type == 'photo_p') {
      this.PhotographProPath = [];
      for (let k = 0; k < values.length; k++) {
        if (this.PhotographProPath.indexOf(values[k].name) == -1) {
          this.PhotographProPath.push(values[k]);
        }
      }
    }
    else if (type == 'kyc_LA') {
      this.kycProofPath = [];
      for (let k = 0; k < values.length; k++) {
        if (this.kycProofPath.indexOf(values[k].name) == -1) {
          this.kycProofPath.push(values[k]);
        }
      }
    }else if (type == 'kyc_p') {
      this.kycProposalPath = [];
      for (let k = 0; k < values.length; k++) {
        if (this.kycProposalPath.indexOf(values[k].name) == -1) {
          this.kycProposalPath.push(values[k]);
        }
      }
    }

    console.log(this.addressProofPath, 'this.addressProofPath');
    console.log(this.addressProposalPath, 'this.addressProposalPath');
    console.log(this.ageProofPath, 'this.ageProofPath');
    console.log(this.incomeProofProposalPath, 'this.incomeProofProposalPath');
    console.log(this.idProposalPath, 'this.idProposalPath');
    console.log(this.ageProposalPath, 'this.ageProposalPath');
    console.log(this.documentProposalPath, 'this.documentProposalPath');
    console.log(this.proposalProPath, 'this.proposalProPath');
    console.log(this.incomeProofPath, 'this.incomeProofPath');
    console.log(this.documentProofPath, 'this.documentProofPath');
    console.log(this.proposalProofPath, 'this.proposalProofPath');
    console.log(this.salesReqProofPath, 'this.salesReqProofPath');
    console.log(this.salesReqProposalPath, 'this.salesReqProposalPath');
    console.log(this.PhotographPath, 'this.PhotographPath');
    console.log(this.PhotographProPath, 'this.PhotographProPath');
    console.log(this.kycProofPath, 'this.kycProofPath');
    console.log(this.kycProposalPath, 'this.kycProposalPath');
    console.log(this.idProofPath, 'this.idProofPath');

  }

  uploadAll() {
         const data = {


      "user_id": this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      "role_id": this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      "pos_status": this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
      "platform": "web",
      "policy_id": this.getEnquiryDetials.policy_id,
      "policyNo": this.summaryData.policy_no,
      "transactionId": this.summaryData.receipt_no,
           "Prop": this.ageProposalPath.concat(  this.addressProposalPath, this.idProposalPath, this.kycProposalPath, this.documentProposalPath, this.proposalProPath,  this.salesReqProposalPath, this.incomeProofProposalPath, this.PhotographProPath),
             "La":this.ageProofPath.concat(this.addressProofPath, this.idProofPath, this.kycProofPath, this.documentProofPath, this.proposalProofPath, this.salesReqProofPath,  this.incomeProofPath, this.PhotographPath),

         }

    console.log(data, 'dattattatata');
    console.log(this.fileDetails[0].name, 'fileDetailsname');
    console.log(this.ageProofPath.concat(this.ageProposalPath,this.addressProofPath, this.addressProposalPath, this.idProofPath,this.idProposalPath,this.incomeProofProposalPath, this.kycProofPath,this.kycProposalPath, this.documentProofPath,this.documentProposalPath, this.proposalProofPath,this.proposalProPath, this.salesReqProofPath,this.salesReqProposalPath, this.incomeProofPath, this.PhotographPath, this.PhotographProPath), 'resultttttttt');

    this.termService.edelweissFileUpload(data).subscribe(
        (successData) => {
          this.fileUploadSuccess(successData);
        },
        (error) => {
          this.fileUploadFailure(error);
        }
    );
  }

  public fileUploadSuccess(successData) {
    if (successData.IsSuccess == true) {
      this.documentPath = successData.ResponseObject.filePath;
      this.toastr.success(successData.ResponseObject.message, 'Success');
      this.fileUploadStatus = false;
    } else {
      this.toastr.error(successData.ErrorObject, 'Failed');
      this.fileUploadStatus = true;
    }
  }

  public fileUploadFailure(error) {
    console.log(error);
  }

  staffChange() {

    if (this.proposer.controls['isStaff'].value == 'Yes') {
      this.proposer.controls['employeeCode'].patchValue(this.proposer.controls['employeeCode'].value);

      this.proposer.controls['employeeCode'].setValidators([Validators.required]);
    } else {
      this.proposer.controls['employeeCode'].patchValue('');

      this.proposer.controls['employeeCode'].setValidators(null);

    }
    this.proposer.controls['employeeCode'].updateValueAndValidity();

  }

  staffChange1() {

    if (this.insureArray.controls['isStaff'].value == 'Yes') {
      this.insureArray.controls['employeeCode'].patchValue(this.insureArray.controls['employeeCode'].value);

      this.insureArray.controls['employeeCode'].setValidators([Validators.required]);
    } else {
      this.insureArray.controls['employeeCode'].patchValue('');

      this.insureArray.controls['employeeCode'].setValidators(null);

    }
    this.insureArray.controls['employeeCode'].updateValueAndValidity();

  }

  staffSpouseChange() {

    if (this.proposer.controls['isStaffSpouse'].value == 'Yes') {
      this.proposer.controls['employeeCodeSpouse'].patchValue(this.proposer.controls['employeeCodeSpouse'].value);

      this.proposer.controls['employeeCodeSpouse'].setValidators([Validators.required]);
    } else {
      this.proposer.controls['employeeCodeSpouse'].patchValue('');

      this.proposer.controls['employeeCodeSpouse'].setValidators(null);

    }
    this.proposer.controls['employeeCodeSpouse'].updateValueAndValidity();

  }

  staffSpouseChange1() {

    if (this.insureArray.controls['isStaffSpouse'].value == 'Yes') {
      this.insureArray.controls['employeeCodeSpouse'].patchValue(this.insureArray.controls['employeeCodeSpouse'].value);

      this.insureArray.controls['employeeCodeSpouse'].setValidators([Validators.required]);
    } else {
      this.insureArray.controls['employeeCodeSpouse'].patchValue('');

      this.insureArray.controls['employeeCodeSpouse'].setValidators(null);

    }
    this.insureArray.controls['employeeCodeSpouse'].updateValueAndValidity();

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

  // existingInsure() {
  //
  //
  //   if (this.bankDetail.controls['existingInsuranceInd'].value == true) {
  //     // for (let i=0; i < this.bankDetail['controls'].existingInsurance['controls'].length; i++) {
  //     //   console.log('ssssssss')
  //     //   if (i != 0) {
  //     //   }
  //     //   this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].policyNo.patchValue(this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].policyNo.value);
  //     //   this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].companyName.patchValue(this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].companyName.value);
  //     //   this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].yearOfIssue.patchValue(this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].yearOfIssue.value);
  //     //   this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].sumAssured.patchValue(this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].sumAssured.value);
  //     //   this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].annualizedPremium.patchValue(this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].annualizedPremium.value);
  //     //   this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].policyStatus.patchValue(this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].policyStatus.value);
  //     // }
  //   } else {
  //
  //     for (let i=0; i < this.bankDetail['controls'].existingInsurance['controls'].length; i++) {
  //
  //
  //       if ( i !=  0) {
  //       }
  //       this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].policyNo.patchValue('');
  //       this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].companyName.patchValue('');
  //       this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].yearOfIssue.patchValue('');
  //       this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].sumAssured.patchValue('');
  //       this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].annualizedPremium.patchValue('');
  //       this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].policyStatus.patchValue('');
  //     }
  //
  //   }
  // }

  existingInsureReq() {
    console.log(this.bankDetail['controls'].existingInsurance['controls'].length,'value');
    if (this.bankDetail.controls['existingInsuranceInd'].value == true) {

      for (let i=0; i < this.bankDetail['controls'].existingInsurance['controls'].length; i++) {
        if (i != 0) {
        }
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].policyNo.patchValue(this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].policyNo.value );
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].companyName.patchValue(this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].companyName.value );
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].yearOfIssue.patchValue(this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].yearOfIssue.value );
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].sumAssured.patchValue(this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].sumAssured.value );
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].annualizedPremium.patchValue(this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].annualizedPremium.value );
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].policyStatus.patchValue(this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].policyStatus.value );

        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].policyNo.setValidators([Validators.required]);
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].companyName.setValidators([Validators.required]);
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].yearOfIssue.setValidators([Validators.required]);
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].sumAssured.setValidators([Validators.required]);
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].annualizedPremium.setValidators([Validators.required]);
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].policyStatus.setValidators([Validators.required]);
      }

    } else if (this.bankDetail.controls['existingInsuranceInd'].value == false) {
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


      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aName.setValidators('');
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].appointeeDob.setValidators('');
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aGender.setValidators('');
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].relationToInsured.setValidators('');


    }
    this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aName.updateValueAndValidity();
    this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].appointeeDob.updateValueAndValidity();
    this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aGender.updateValueAndValidity();
    this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].relationToInsured.updateValueAndValidity();


  }


  isInsureAccNo() {

    if (this.insureArray.controls['insureAccNo'].value == 'Yes') {
      this.insureArray.controls['provideAccNo'].patchValue(this.insureArray.controls['provideAccNo'].value);
      this.insureArray.controls['epolicy'].patchValue(this.insureArray.controls['epolicy'].value);

      this.insureArray.controls['provideAccNo'].setValidators([Validators.required]);
      this.insureArray.controls['epolicy'].setValidators([Validators.required]);

    } else {
      this.insureArray.controls['provideAccNo'].patchValue('');
      this.insureArray.controls['epolicy'].patchValue('No');
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
        this.insureArray.controls['epolicy1'].patchValue('No');
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
  isdrugsInd() {

    if (this.medicalDetail.controls['drugsInd'].value == true) {
      this.medicalDetail.controls['drugsDetails'].patchValue(this.medicalDetail.controls['drugsDetails'].value);

      this.medicalDetail.controls['drugsDetails'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['drugsDetails'].patchValue('');

      this.medicalDetail.controls['drugsDetails'].setValidators(null);

    }
    this.medicalDetail.controls['drugsDetails'].updateValueAndValidity();

  }
  isalcoholInd() {

    if (this.medicalDetail.controls['alcoholInd'].value == true) {
      this.medicalDetail.controls['alcoholDetails'].patchValue(this.medicalDetail.controls['alcoholDetails'].value);

      this.medicalDetail.controls['alcoholDetails'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['alcoholDetails'].patchValue('');

      this.medicalDetail.controls['alcoholDetails'].setValidators(null);

    }
    this.medicalDetail.controls['alcoholDetails'].updateValueAndValidity();

  }
  isconsultDoctorInd() {

    if (this.medicalDetail.controls['consultDoctorInd'].value == true) {
      this.medicalDetail.controls['consultDoctorDetails'].patchValue(this.medicalDetail.controls['consultDoctorDetails'].value);

      this.medicalDetail.controls['consultDoctorDetails'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['consultDoctorDetails'].patchValue('');

      this.medicalDetail.controls['consultDoctorDetails'].setValidators(null);

    }
    this.medicalDetail.controls['consultDoctorDetails'].updateValueAndValidity();

  }
  isECGInd() {

    if (this.medicalDetail.controls['ECGInd'].value == true) {
      this.medicalDetail.controls['ECGDetails'].patchValue(this.medicalDetail.controls['ECGDetails'].value);

      this.medicalDetail.controls['ECGDetails'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['ECGDetails'].patchValue('');

      this.medicalDetail.controls['ECGDetails'].setValidators(null);

    }
    this.medicalDetail.controls['ECGDetails'].updateValueAndValidity();

  }
  isadmitInd() {

    if (this.medicalDetail.controls['admitInd'].value == true) {
      this.medicalDetail.controls['admitDetails'].patchValue(this.medicalDetail.controls['admitDetails'].value);

      this.medicalDetail.controls['admitDetails'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['admitDetails'].patchValue('');

      this.medicalDetail.controls['admitDetails'].setValidators(null);

    }
    this.medicalDetail.controls['admitDetails'].updateValueAndValidity();

  }
  isheartDieaseInd() {

    if (this.medicalDetail.controls['heartDieaseInd'].value == true) {
      this.medicalDetail.controls['heartDieaseDetails'].patchValue(this.medicalDetail.controls['heartDieaseDetails'].value);

      this.medicalDetail.controls['heartDieaseDetails'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['heartDieaseDetails'].patchValue('');

      this.medicalDetail.controls['heartDieaseDetails'].setValidators(null);

    }
    this.medicalDetail.controls['heartDieaseDetails'].updateValueAndValidity();

  }
  isBPInd() {

    if (this.medicalDetail.controls['BPInd'].value == true) {
      this.medicalDetail.controls['BPDetails'].patchValue(this.medicalDetail.controls['BPDetails'].value);

      this.medicalDetail.controls['BPDetails'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['BPDetails'].patchValue('');

      this.medicalDetail.controls['BPDetails'].setValidators(null);

    }
    this.medicalDetail.controls['BPDetails'].updateValueAndValidity();

  }
  isrespiratoryDieaseInd() {

    if (this.medicalDetail.controls['respiratoryDieaseInd'].value == true) {
      this.medicalDetail.controls['respiratoryDieaseDetails'].patchValue(this.medicalDetail.controls['respiratoryDieaseDetails'].value);

      this.medicalDetail.controls['respiratoryDieaseDetails'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['respiratoryDieaseDetails'].patchValue('');

      this.medicalDetail.controls['respiratoryDieaseDetails'].setValidators(null);

    }
    this.medicalDetail.controls['respiratoryDieaseDetails'].updateValueAndValidity();

  }
  isdiabetesInd() {

    if (this.medicalDetail.controls['diabetesInd'].value == true) {
      this.medicalDetail.controls['diabetesDetails'].patchValue(this.medicalDetail.controls['diabetesDetails'].value);

      this.medicalDetail.controls['diabetesDetails'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['diabetesDetails'].patchValue('');

      this.medicalDetail.controls['diabetesDetails'].setValidators(null);

    }
    this.medicalDetail.controls['diabetesDetails'].updateValueAndValidity();

  }
  iskidneyDieaseInd() {

    if (this.medicalDetail.controls['kidneyDieaseInd'].value == true) {
      this.medicalDetail.controls['kidneyDieaseDetails'].patchValue(this.medicalDetail.controls['kidneyDieaseDetails'].value);

      this.medicalDetail.controls['kidneyDieaseDetails'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['kidneyDieaseDetails'].patchValue('');

      this.medicalDetail.controls['kidneyDieaseDetails'].setValidators(null);

    }
    this.medicalDetail.controls['kidneyDieaseDetails'].updateValueAndValidity();

  }
  isdigestiveDieaseInd() {

    if (this.medicalDetail.controls['digestiveDieaseInd'].value == true) {
      this.medicalDetail.controls['digestiveDieaseDetails'].patchValue(this.medicalDetail.controls['digestiveDieaseDetails'].value);

      this.medicalDetail.controls['digestiveDieaseDetails'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['digestiveDieaseDetails'].patchValue('');

      this.medicalDetail.controls['digestiveDieaseDetails'].setValidators(null);

    }
    this.medicalDetail.controls['digestiveDieaseDetails'].updateValueAndValidity();

  }
  iscancerDieaseInd() {

    if (this.medicalDetail.controls['cancerDieaseInd'].value == true) {
      this.medicalDetail.controls['cancerDieaseDetails'].patchValue(this.medicalDetail.controls['cancerDieaseDetails'].value);

      this.medicalDetail.controls['cancerDieaseDetails'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['cancerDieaseDetails'].patchValue('');

      this.medicalDetail.controls['cancerDieaseDetails'].setValidators(null);

    }
    this.medicalDetail.controls['cancerDieaseDetails'].updateValueAndValidity();

  }
  istropicalDieaseInd() {

    if (this.medicalDetail.controls['tropicalDieaseInd'].value == true) {
      this.medicalDetail.controls['tropicalDieaseDetails'].patchValue(this.medicalDetail.controls['tropicalDieaseDetails'].value);

      this.medicalDetail.controls['tropicalDieaseDetails'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['tropicalDieaseDetails'].patchValue('');

      this.medicalDetail.controls['tropicalDieaseDetails'].setValidators(null);

    }
    this.medicalDetail.controls['tropicalDieaseDetails'].updateValueAndValidity();

  }
  isthyroidDieaseInd() {

    if (this.medicalDetail.controls['thyroidDieaseInd'].value == true) {
      this.medicalDetail.controls['thyroidDieaseDetails'].patchValue(this.medicalDetail.controls['thyroidDieaseDetails'].value);

      this.medicalDetail.controls['thyroidDieaseDetails'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['thyroidDieaseDetails'].patchValue('');

      this.medicalDetail.controls['thyroidDieaseDetails'].setValidators(null);

    }
    this.medicalDetail.controls['thyroidDieaseDetails'].updateValueAndValidity();

  }
  isbloodDieaseInd() {

    if (this.medicalDetail.controls['bloodDieaseInd'].value == true) {
      this.medicalDetail.controls['bloodDieaseDetails'].patchValue(this.medicalDetail.controls['bloodDieaseDetails'].value);

      this.medicalDetail.controls['bloodDieaseDetails'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['bloodDieaseDetails'].patchValue('');

      this.medicalDetail.controls['bloodDieaseDetails'].setValidators(null);

    }
    this.medicalDetail.controls['bloodDieaseDetails'].updateValueAndValidity();

  }
  isnervousDieaseInd() {

    if (this.medicalDetail.controls['nervousDieaseInd'].value == true) {
      this.medicalDetail.controls['nervousDieaseDetails'].patchValue(this.medicalDetail.controls['nervousDieaseDetails'].value);

      this.medicalDetail.controls['nervousDieaseDetails'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['nervousDieaseDetails'].patchValue('');

      this.medicalDetail.controls['nervousDieaseDetails'].setValidators(null);

    }
    this.medicalDetail.controls['nervousDieaseDetails'].updateValueAndValidity();

  }
  isENTDieaseInd() {

    if (this.medicalDetail.controls['ENTDieaseInd'].value == true) {
      this.medicalDetail.controls['ENTDieaseDetails'].patchValue(this.medicalDetail.controls['ENTDieaseDetails'].value);

      this.medicalDetail.controls['ENTDieaseDetails'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['ENTDieaseDetails'].patchValue('');

      this.medicalDetail.controls['ENTDieaseDetails'].setValidators(null);

    }
    this.medicalDetail.controls['ENTDieaseDetails'].updateValueAndValidity();

  }
  ismuscleDieaseInd() {

    if (this.medicalDetail.controls['muscleDieaseInd'].value == true) {
      this.medicalDetail.controls['muscleDieaseDetails'].patchValue(this.medicalDetail.controls['muscleDieaseDetails'].value);

      this.medicalDetail.controls['muscleDieaseDetails'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['muscleDieaseDetails'].patchValue('');

      this.medicalDetail.controls['muscleDieaseDetails'].setValidators(null);

    }
    this.medicalDetail.controls['muscleDieaseDetails'].updateValueAndValidity();

  }
  isalcoholicInd() {

    if (this.medicalDetail.controls['alcoholicInd'].value == true) {
      this.medicalDetail.controls['alcoholicDetails'].patchValue(this.medicalDetail.controls['alcoholicDetails'].value);

      this.medicalDetail.controls['alcoholicDetails'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['alcoholicDetails'].patchValue('');

      this.medicalDetail.controls['alcoholicDetails'].setValidators(null);

    }
    this.medicalDetail.controls['alcoholicDetails'].updateValueAndValidity();

  }
  isotherIllnessInd() {

    if (this.medicalDetail.controls['otherIllnessInd'].value == true) {
      this.medicalDetail.controls['otherIllnessDetails'].patchValue(this.medicalDetail.controls['otherIllnessDetails'].value);

      this.medicalDetail.controls['otherIllnessDetails'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['otherIllnessDetails'].patchValue('');

      this.medicalDetail.controls['otherIllnessDetails'].setValidators(null);

    }
    this.medicalDetail.controls['otherIllnessDetails'].updateValueAndValidity();

  }
  isdeformityInd() {

    if (this.medicalDetail.controls['deformityInd'].value == true) {
      this.medicalDetail.controls['deformityDetails'].patchValue(this.medicalDetail.controls['deformityDetails'].value);

      this.medicalDetail.controls['deformityDetails'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['deformityDetails'].patchValue('');

      this.medicalDetail.controls['deformityDetails'].setValidators(null);

    }
    this.medicalDetail.controls['deformityDetails'].updateValueAndValidity();

  }
  issymptomsInd() {

    if (this.medicalDetail.controls['symptomsInd'].value == true) {
      this.medicalDetail.controls['symptomsDetails'].patchValue(this.medicalDetail.controls['symptomsDetails'].value);

      this.medicalDetail.controls['symptomsDetails'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['symptomsDetails'].patchValue('');

      this.medicalDetail.controls['symptomsDetails'].setValidators(null);

    }
    this.medicalDetail.controls['symptomsDetails'].updateValueAndValidity();

  }
  isfemaleDieaseInd() {

    if (this.medicalDetail.controls['femaleDieaseInd'].value == true) {
      this.medicalDetail.controls['femaleDieaseWeeks'].patchValue(this.medicalDetail.controls['femaleDieaseWeeks'].value);

      this.medicalDetail.controls['femaleDieaseWeeks'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['femaleDieaseWeeks'].patchValue('');

      this.medicalDetail.controls['femaleDieaseWeeks'].setValidators(null);

    }
    this.medicalDetail.controls['femaleDieaseWeeks'].updateValueAndValidity();

  }
  ismedicationInd() {

    if (this.medicalDetail.controls['medicalTreatment'].value == true) {
      this.medicalDetail.controls['medicationDetails'].patchValue(this.medicalDetail.controls['medicationDetails'].value);

      this.medicalDetail.controls['medicationDetails'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['medicationDetails'].patchValue('');

      this.medicalDetail.controls['medicationDetails'].setValidators(null);

    }
    this.medicalDetail.controls['medicationDetails'].updateValueAndValidity();

  }
  isdiagnosedInd() {

    if (this.medicalDetail.controls['receivedTreatment1'].value == true) {
      this.medicalDetail.controls['diagnosedDetails'].patchValue(this.medicalDetail.controls['diagnosedDetails'].value);

      this.medicalDetail.controls['diagnosedDetails'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['diagnosedDetails'].patchValue('');

      this.medicalDetail.controls['diagnosedDetails'].setValidators(null);

    }
    this.medicalDetail.controls['diagnosedDetails'].updateValueAndValidity();

  }

  isaidsInd() {

    if (this.medicalDetail.controls['receivedTreatment2'].value == true) {
      this.medicalDetail.controls['aidsDetails'].patchValue(this.medicalDetail.controls['aidsDetails'].value);

      this.medicalDetail.controls['aidsDetails'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['aidsDetails'].patchValue('');

      this.medicalDetail.controls['aidsDetails'].setValidators(null);

    }
    this.medicalDetail.controls['aidsDetails'].updateValueAndValidity();

  }

  istobaccoInd() {

    if (this.medicalDetail.controls['tobaccoInd'].value == 'Yes') {
      this.medicalDetail.controls['tobaccoDetails'].patchValue(this.medicalDetail.controls['tobaccoDetails'].value);
      this.medicalDetail.controls['tobaccoStopInd'].patchValue(this.medicalDetail.controls['tobaccoStopInd'].value);

      this.medicalDetail.controls['tobaccoDetails'].setValidators([Validators.required]);
      this.medicalDetail.controls['tobaccoStopInd'].setValidators([Validators.required]);


    } else
      if (this.medicalDetail.controls['tobaccoInd'].value == 'No') {


      this.medicalDetail.controls['tobaccoDetails'].patchValue('');
      this.medicalDetail.controls['tobaccoStopInd'].patchValue('');

      this.medicalDetail.controls['tobaccoDetails'].setValidators(null);
      this.medicalDetail.controls['tobaccoStopInd'].setValidators(null);

    }
    this.medicalDetail.controls['tobaccoDetails'].updateValueAndValidity();
    this.medicalDetail.controls['tobaccoStopInd'].updateValueAndValidity();

  }
  istobaccoStopInd() {

    if (this.medicalDetail.controls['tobaccoStopInd'].value == 'Yes') {
      this.medicalDetail.controls['tobaccoStopDetails'].patchValue(this.medicalDetail.controls['tobaccoStopDetails'].value);
      this.medicalDetail.controls['tobaccoStopDetails'].setValidators([Validators.required]);

    } else
    if (this.medicalDetail.controls['tobaccoStopInd'].value == 'No') {


      this.medicalDetail.controls['tobaccoStopDetails'].patchValue('');
      this.medicalDetail.controls['tobaccoStopDetails'].setValidators(null);

    }
    this.medicalDetail.controls['tobaccoStopDetails'].updateValueAndValidity();

  }

    ispregnantInd() {

        if (this.medicalDetail.controls['pregnantInd'].value == true) {
            this.medicalDetail.controls['pregnantweeks'].patchValue(this.medicalDetail.controls['pregnantweeks'].value);

            this.medicalDetail.controls['pregnantweeks'].setValidators([Validators.required]);
        } else {
            this.medicalDetail.controls['pregnantweeks'].patchValue('');

            this.medicalDetail.controls['pregnantweeks'].setValidators(null);

        }
        this.medicalDetail.controls['pregnantweeks'].updateValueAndValidity();

    }

  isCriminalInd() {

    if (this.insureArray.controls['isCriminal'].value == true) {
      this.insureArray.controls['criminalDetails'].patchValue(this.insureArray.controls['criminalDetails'].value);

      this.insureArray.controls['criminalDetails'].setValidators([Validators.required]);
    } else {
      this.insureArray.controls['criminalDetails'].patchValue('');

      this.insureArray.controls['criminalDetails'].setValidators(null);

    }
    this.insureArray.controls['criminalDetails'].updateValueAndValidity();

  }
  isTopUpBenefit() {

    if (this.insureArray.controls['TopUpBenefit'].value == true) {
      this.insureArray.controls['topUpRate'].patchValue(this.insureArray.controls['topUpRate'].value);
      this.insureArray.controls['topUpBenefitPercentage'].patchValue(this.insureArray.controls['topUpBenefitPercentage'].value);

      this.insureArray.controls['topUpBenefitPercentage'].setValidators([Validators.required]);
      this.insureArray.controls['topUpRate'].setValidators([Validators.required]);
    } else {
      this.insureArray.controls['topUpRate'].patchValue('');
      this.insureArray.controls['topUpBenefitPercentage'].patchValue('');

      this.insureArray.controls['topUpRate'].setValidators(null);
      this.insureArray.controls['topUpBenefitPercentage'].setValidators(null);

    }
    this.insureArray.controls['topUpRate'].updateValueAndValidity();
    this.insureArray.controls['topUpBenefitPercentage'].updateValueAndValidity();

  }
  isbetterHalfBenefit() {

    if (this.insureArray.controls['betterHalfBenefit'].value == true) {
      this.insureArray.controls['betterHalfsumAssured'].patchValue(this.insureArray.controls['betterHalfsumAssured'].value);

      this.insureArray.controls['betterHalfsumAssured'].setValidators([Validators.required]);
    } else {
      this.insureArray.controls['betterHalfsumAssured'].patchValue('');

      this.insureArray.controls['betterHalfsumAssured'].setValidators(null);

    }
    this.insureArray.controls['betterHalfsumAssured'].updateValueAndValidity();

  }
  iscriticalIllness() {

    if (this.insureArray.controls['criticalIllness'].value == true) {
      this.insureArray.controls['criticalsumAssured'].patchValue(this.insureArray.controls['criticalsumAssured'].value);

      this.insureArray.controls['criticalsumAssured'].setValidators([Validators.required]);
    } else {
      this.insureArray.controls['criticalsumAssured'].patchValue('');

      this.insureArray.controls['criticalsumAssured'].setValidators(null);

    }
    this.insureArray.controls['criticalsumAssured'].updateValueAndValidity();

  }

  isDeathBenefit() {

    if (this.insureArray.controls['isADB'].value == true) {
      this.insureArray.controls['sumAssuredADB'].patchValue(this.insureArray.controls['sumAssuredADB'].value);

      this.insureArray.controls['sumAssuredADB'].setValidators([Validators.required]);
    } else {
      this.insureArray.controls['sumAssuredADB'].patchValue('');

      this.insureArray.controls['sumAssuredADB'].setValidators(null);

    }
    this.insureArray.controls['sumAssuredADB'].updateValueAndValidity();

  }
  isAccidentalTotal() {

    if (this.insureArray.controls['isATPD'].value == true) {
      this.insureArray.controls['sumAssuredATPD'].patchValue(this.insureArray.controls['sumAssuredATPD'].value);

      this.insureArray.controls['sumAssuredATPD'].setValidators([Validators.required]);
    } else {
      this.insureArray.controls['sumAssuredATPD'].patchValue('');

      this.insureArray.controls['sumAssuredATPD'].setValidators(null);

    }
    this.insureArray.controls['sumAssuredATPD'].updateValueAndValidity();

  }
  isHospitalCash() {

    if (this.insureArray.controls['isHCB'].value == true) {
      this.insureArray.controls['sumAssuredHCB'].patchValue(this.insureArray.controls['sumAssuredHCB'].value);

      this.insureArray.controls['sumAssuredHCB'].setValidators([Validators.required]);
    } else {
      this.insureArray.controls['sumAssuredHCB'].patchValue('');

      this.insureArray.controls['sumAssuredHCB'].setValidators(null);

    }
    this.insureArray.controls['sumAssuredHCB'].updateValueAndValidity();

  }
  isadventurous() {

    if (this.insureArray.controls['adventurousActivities'].value == true) {
      this.insureArray.controls['adventurousActivitiesDetails'].patchValue(this.insureArray.controls['adventurousActivitiesDetails'].value);

      this.insureArray.controls['adventurousActivitiesDetails'].setValidators([Validators.required]);
    } else {
      this.insureArray.controls['adventurousActivitiesDetails'].patchValue('');

      this.insureArray.controls['adventurousActivitiesDetails'].setValidators(null);

    }
    this.insureArray.controls['adventurousActivitiesDetails'].updateValueAndValidity();

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
        "planOption": this.insureArray.controls['planOption'].value,
        "riderDetails": {
          "workSiteFlag": this.insureArray.controls['workSiteFlag'].value,
          "investmentStrategy":this.insureArray.controls['investmentStrategy'].value,
          "risingStar":this.insureArray.controls['risingStar'].value,
          "policyOption":this.insureArray.controls['policyOption'].value,
          "additionalBenefit":this.insureArray.controls['additionalBenefit'].value,
          "topUpBenefit": {
            "isTopUpBenefit": this.insureArray.controls['TopUpBenefit'].value,
            "topUpBenefitPercentage":this.insureArray.controls['topUpBenefitPercentage'].value,
            "topUpRate": this.insureArray.controls['topUpRate'].value,
          },
          "betterHalf": {
            "betterHalfBenefit":this.insureArray.controls['betterHalfBenefit'].value,
            "sumAssured": this.insureArray.controls['betterHalfsumAssured'].value,
          },
          "WOP": {
            "waiverOfPremiumBenefit": this.insureArray.controls['waiverOfPremiumBenefit'].value,
          },
          "CI": {
            "criticalIllness": this.insureArray.controls['criticalIllness'].value,
            "sumAssured":this.insureArray.controls['criticalsumAssured'].value,
          },
          "ADB": {
            "isADB": this.insureArray.controls['isADB'].value,
            "sumAssured": this.insureArray.controls['sumAssuredADB'].value,
          },
          "ATPD": {
            "isATPD": this.insureArray.controls['isATPD'].value,
            "sumAssured": this.insureArray.controls['sumAssuredATPD'].value,
          },
          "HCB": {
            "isHCB": this.insureArray.controls['isHCB'].value,
            "sumAssured": this.insureArray.controls['sumAssuredHCB'].value,
          }
        },
        "DeathBenefitOptions": {
          "payoutOption": this.insureArray.controls['payoutOption'].value,
          "payoutPercentageIncome":this.insureArray.controls['payoutPercentageIncome'].value,
          "noOfMonths": this.insureArray.controls['noOfMonths'].value,
        }
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
        "isCriminal":this.insureArray.controls['isCriminal'].value ,
        "criminalDetails":this.insureArray.controls['criminalDetails'].value,
        "identityProof":this.insureArray.controls['identityProof'].value,
        "ageProof":this.insureArray.controls['ageProofId'].value,
        "otherAgeProof":"",
        "addrProof":this.insureArray.controls['addrProof'].value,
        "travelOutsideIndiaInd":this.insureArray.controls['travelOutsideIndia'].value,
        "pilotInd":this.insureArray.controls['pilot'].value,
        "adventurousActivitiesInd":this.insureArray.controls['adventurousActivities'].value,
        "adventurousActivitiesDetails":this.insureArray.controls['adventurousActivitiesDetails'].value,
        "corrAddrProof":"",
        "incomeProof":"",
        "incomeProofText": "",
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
        "hasWeightChanged":this.insureArray.controls['hasWeightChanged'].value =='Same'? 'N' : 'Y',
        "weightChange":this.insureArray.controls['inbetweenweight'].value,
        "weightChangeReason":this.insureArray.controls['weightChangedreason'].value,
        "isStaff":this.insureArray.controls['isStaff'].value ? 'Y' : 'N',
        "employeeCode":this.insureArray.controls['employeeCode'].value,
        "isHospitalized":"",
        "hospitalizedDate":"",
        "isRecovered":"",
        "nonRecoveryDetails":"",
        "isTaxResOfIndia":this.insureArray.controls['taxResidence'].value,
        "aadhaarNo":this.insureArray.controls['aadhaarNo'].value,
        "questionnaires":{
          "healthInformation":this.medicalDetail.controls['healthInformation'].value ? 'Y' : 'N',
          "drugsInd":this.medicalDetail.controls['drugsInd'].value ? 'Y' : 'N',
          "drugsDetails":this.medicalDetail.controls['drugsDetails'].value,
          "alcoholInd":this.medicalDetail.controls['alcoholInd'].value ? 'Y' : 'N',
          "alcoholDetails":this.medicalDetail.controls['alcoholDetails'].value,
          "tobaccoInd":this.medicalDetail.controls['tobaccoInd'].value ? 'Y' : 'N',
          "tobaccoDetails":this.medicalDetail.controls['tobaccoDetails'].value ? 'Y' : 'N',
          "tobaccoStopInd":this.medicalDetail.controls['tobaccoStopInd'].value ? 'Y' : 'N',
          "tobaccoStopDetails":this.medicalDetail.controls['tobaccoStopDetails'].value ? 'Y' : 'N',
          "consultDoctorInd":this.medicalDetail.controls['consultDoctorInd'].value ? 'Y' : 'N',
          "consultDoctorDetails":this.medicalDetail.controls['consultDoctorDetails'].value,
          "ECGInd":this.medicalDetail.controls['ECGInd'].value ? 'Y' : 'N',
          "ECGDetails":this.medicalDetail.controls['ECGDetails'].value,
          "admitInd":this.medicalDetail.controls['admitInd'].value ? 'Y' : 'N',
          "admitDetails":this.medicalDetail.controls['admitDetails'].value,
          "medicationInd":this.medicalDetail.controls['medicalTreatment'].value ? 'Y' : 'N',
          "medicationDetails":this.medicalDetail.controls['medicationDetails'].value,
          "diagnosedInd":this.medicalDetail.controls['receivedTreatment1'].value ? 'Y' : 'N',
          "diagnosedDetails":this.medicalDetail.controls['diagnosedDetails'].value,
          "heartDieaseInd":this.medicalDetail.controls['heartDieaseInd'].value ? 'Y' : 'N',
          "heartDieaseDetails":this.medicalDetail.controls['heartDieaseDetails'].value,
          "BPInd":this.medicalDetail.controls['BPInd'].value ? 'Y' : 'N',
          "BPDetails":this.medicalDetail.controls['BPDetails'].value,
          "respiratoryDieaseInd":this.medicalDetail.controls['respiratoryDieaseInd'].value ? 'Y' : 'N',
          "respiratoryDieaseDetails":this.medicalDetail.controls['respiratoryDieaseDetails'].value,
          "diabetesInd":this.medicalDetail.controls['diabetesInd'].value ? 'Y' : 'N',
          "diabetesDetails":this.medicalDetail.controls['diabetesDetails'].value,
          "kidneyDieaseInd":this.medicalDetail.controls['kidneyDieaseInd'].value ? 'Y' : 'N',
          "kidneyDieaseDetails":this.medicalDetail.controls['kidneyDieaseDetails'].value,
          "digestiveDieaseInd":this.medicalDetail.controls['digestiveDieaseInd'].value ? 'Y' : 'N',
          "digestiveDieaseDetails":this.medicalDetail.controls['digestiveDieaseDetails'].value,
          "cancerDieaseInd":this.medicalDetail.controls['cancerDieaseInd'].value ? 'Y' : 'N',
          "cancerDieaseDetails":this.medicalDetail.controls['cancerDieaseDetails'].value,
          "tropicalDieaseInd":this.medicalDetail.controls['tropicalDieaseInd'].value ? 'Y' : 'N',
          "tropicalDieaseDetails":this.medicalDetail.controls['tropicalDieaseDetails'].value,
          "thyroidDieaseInd":this.medicalDetail.controls['thyroidDieaseInd'].value ? 'Y' : 'N',
          "thyroidDieaseDetails":this.medicalDetail.controls['thyroidDieaseDetails'].value,
          "bloodDieaseInd":this.medicalDetail.controls['bloodDieaseInd'].value ? 'Y' : 'N',
          "bloodDieaseDetails":this.medicalDetail.controls['bloodDieaseDetails'].value,
          "nervousDieaseInd":this.medicalDetail.controls['nervousDieaseInd'].value ? 'Y' : 'N',
          "nervousDieaseDetails":this.medicalDetail.controls['nervousDieaseDetails'].value,
          "ENTDieaseInd":this.medicalDetail.controls['ENTDieaseInd'].value ? 'Y' : 'N',
          "ENTDieaseDetails":this.medicalDetail.controls['ENTDieaseDetails'].value,
          "muscleDieaseInd":this.medicalDetail.controls['muscleDieaseInd'].value ? 'Y' : 'N',
          "muscleDieaseDetails":this.medicalDetail.controls['muscleDieaseDetails'].value,
          "aidsInd":this.medicalDetail.controls['receivedTreatment2'].value ? 'Y' : 'N',
          "aidsDetails":this.medicalDetail.controls['aidsDetails'].value,
          "alcoholicInd":this.medicalDetail.controls['alcoholicInd'].value ? 'Y' : 'N',
          "alcoholicDetails":this.medicalDetail.controls['alcoholicDetails'].value,
          "otherIllnessInd":this.medicalDetail.controls['otherIllnessInd'].value ? 'Y' : 'N',
          "otherIllnessDetails":this.medicalDetail.controls['otherIllnessDetails'].value,
          "deformityInd":this.medicalDetail.controls['deformityInd'].value ? 'Y' : 'N',
          "deformityDetails":this.medicalDetail.controls['deformityDetails'].value,
          "symptomsInd":this.medicalDetail.controls['symptomsInd'].value ? 'Y' : 'N',
          "symptomsDetails":this.medicalDetail.controls['symptomsDetails'].value,
          "pregnantInd":this.medicalDetail.controls['pregnantInd'].value ? 'Y' : 'N',
          "pregnantweeks":this.medicalDetail.controls['pregnantweeks'].value ? 'Y' : 'N',
          "femaleDiease_Ind":this.medicalDetail.controls['femaleDieaseInd'].value ? 'Y' : 'N',
          "femaleDieaseWeeks":this.medicalDetail.controls['femaleDieaseWeeks'].value,
          "medicalQuestions":this.medicalDetail.value.medicalQuestions,
        },
        "bank":{
          "accountNo":this.bankDetail.controls['accountNo'].value,
          "accName":this.bankDetail.controls['accName'].value,
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
      "Spouse":{
        "title":this.proposer.controls['stitle'].value,
        "firstName":this.proposer.controls['sfirstName'].value,
        "middleName":this.proposer.controls['smidName'].value,
        "lastName":this.proposer.controls['slastName'].value,
        "dob":this.datepipe.transform(this.proposer.controls['sdob'].value, 'y-MM-dd'),
        "emailId":this.proposer.controls['semailId'].value,
        "phoneNo":this.proposer.controls['smobileNo'].value,
        "isSmoker":this.proposer.controls['isSmokerSpouse'].value,
        "isStaff":this.proposer.controls['isStaffSpouse'].value,
        "employeeCode":this.proposer.controls['employeeCodeSpouse'].value,
        "relationLAProposer":this.proposer.controls['relationSpouseProposer'].value,
      },
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
        "isStaff":this.proposer.controls['isStaff'].value ? 'Y' : 'N',
        "employeeCode":this.proposer.controls['employeeCode'].value,
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
      this.medicalFormData = this.medicalDetail.value;
      sessionStorage.proposerFormData = JSON.stringify(this.proposerFormData);
      sessionStorage.insuredFormData = JSON.stringify(this.insuredFormData);
      sessionStorage.medicalFormData = JSON.stringify(this.medicalFormData);
      sessionStorage.bankFormData = JSON.stringify(this.bankFormData);
      sessionStorage.nomineeFormData = JSON.stringify(this.nomineeFormData);
      sessionStorage.edelweiss_term_life_id = this.proposalId;
      // this.downloadFile(this.requestedUrl);
console.log(this.summaryData,'summaryData');
console.log(this.proposalId,'proposalId');

      console.log(this.proposerFormData, 'proposerFormData');
      console.log(this.insuredFormData,'insuredFormData');
      console.log(this.medicalFormData,'medicalFormData');
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

  getPolicyOption() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.getepolicyOption(data).subscribe(
        (successData) => {
          this.getepolicyOptionSuccess(successData);
        },
        (error) => {
          this.getepolicyOptionFailure(error);
        }
    );
  }

  public getepolicyOptionSuccess(successData) {
    if (successData.IsSuccess) {
      this.epolicyOption = successData.ResponseObject;
    }
  }

  public getepolicyOptionFailure(error) {
  }
  getpayoutOption() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.getepayoutOption(data).subscribe(
        (successData) => {
          this.getepayoutOptionSuccess(successData);
        },
        (error) => {
          this.getepayoutOptionFailure(error);
        }
    );
  }

  public getepayoutOptionSuccess(successData) {
    if (successData.IsSuccess) {
      this.epayoutOption = successData.ResponseObject;
    }
  }

  public getepayoutOptionFailure(error) {
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

  geteWeightChanged() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.WeightCdedelweiss(data).subscribe(
        (successData) => {
          this.geteWeightChangedsSuccess(successData);
        },
        (error) => {
          this.geteWeightChangedsFailure(error);
        }
    );
  }

  public geteWeightChangedsSuccess(successData) {
    if (successData.IsSuccess) {
      this.eWeightChanged = successData.ResponseObject;
    }
  }

  public geteWeightChangedsFailure(error) {
  }

  changeWeightChanged() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.geteChangedWeightCds(data).subscribe(
        (successData) => {
          this.geteChangedWeightChangeSuccess(successData);
        },
        (error) => {
          this.geteChangedWeightChangeFailure(error);
        }
    );
  }

  public geteChangedWeightChangeSuccess(successData) {
    if (successData.IsSuccess) {
      this.weightList = successData.ResponseObject;
    }
  }

  public geteChangedWeightChangeFailure(error) {
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

  getetopUpRate() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.getTopUpRate(data).subscribe(
        (successData) => {
          this.getetopUpRateSuccess(successData);
        },
        (error) => {
          this.getetopUpRateFailure(error);
        }
    );
  }

  public getetopUpRateSuccess(successData) {
    if (successData.IsSuccess) {
      this.etopUpRates = successData.ResponseObject;
    }
  }

  public getetopUpRateFailure(error) {
  }

  geteDocumentProof() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.edelweissDocumentProof(data).subscribe(
        (successData) => {
          this.geteDocumentProofSuccess(successData);
        },
        (error) => {
          this.geteDocumentProofFailure(error);
        }
    );
  }

  public geteDocumentProofSuccess(successData) {
    if (successData.IsSuccess) {
      this.eDocumentProof = successData.ResponseObject;
    }
  }

  public geteDocumentProofFailure(error) {
  }

  geteIncomeProof() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.edelweissIncomeProof(data).subscribe(
        (successData) => {
          this.geteIncomeProofSuccess(successData);
        },
        (error) => {
          this.geteIncomeProofFailure(error);
        }
    );
  }

  public geteIncomeProofSuccess(successData) {
    if (successData.IsSuccess) {
      this.eIncomeProof = successData.ResponseObject;
    }
  }

  public geteIncomeProofFailure(error) {
  }

  geteproposalProof() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.edelweissProposalProof(data).subscribe(
        (successData) => {
          this.geteProposalProofSuccess(successData);
        },
        (error) => {
          this.geteProposalProofFailure(error);
        }
    );
  }

  public geteProposalProofSuccess(successData) {
    if (successData.IsSuccess) {
      this.eproposalProof = successData.ResponseObject;
    }
  }

  public geteProposalProofFailure(error) {
  }
  geteageDocProof() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.edelweissAgeProof(data).subscribe(
        (successData) => {
          this.geteAgeDocProofSuccess(successData);
        },
        (error) => {
          this.geteAgeProofDocFailure(error);
        }
    );
  }

  public geteAgeDocProofSuccess(successData) {
    if (successData.IsSuccess) {
      this.eageDocProof = successData.ResponseObject;
    }
  }

  public geteAgeProofDocFailure(error) {
  }


  geteaddressDocProof() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.edelweissAddressProof(data).subscribe(
        (successData) => {
          this.geteAddressProofDocSuccess(successData);
        },
        (error) => {
          this.geteAddressProofDocFailure(error);
        }
    );
  }

  public geteAddressProofDocSuccess(successData) {
    if (successData.IsSuccess) {
      this.eaddressDocProof = successData.ResponseObject;
    }
  }
  public geteAddressProofDocFailure(error) {
  }
  getekycProof() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.edelweissKYCProof(data).subscribe(
        (successData) => {
          this.geteKycProofDocSuccess(successData);
        },
        (error) => {
          this.geteKycProofDocFailure(error);
        }
    );
  }

  public geteKycProofDocSuccess(successData) {
    if (successData.IsSuccess) {
      this.ekycProof = successData.ResponseObject;
    }
  }
  public geteKycProofDocFailure(error) {
  }
  geteidLifeProof() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.edelweissidDocProof(data).subscribe(
        (successData) => {
          this.geteIdProofDocSuccess(successData);
        },
        (error) => {
          this.geteIdProofDocFailure(error);
        }
    );
  }

  public geteIdProofDocSuccess(successData) {
    if (successData.IsSuccess) {
      this.identityLifeProof = successData.ResponseObject;
    }
  }
  public geteIdProofDocFailure(error) {
  }
  geteOtherDocumentProof() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.edelweissOtherDocProof(data).subscribe(
        (successData) => {
          this.geteOtherDocSuccess(successData);
        },
        (error) => {
          this.geteOtherDocFailure(error);
        }
    );
  }

  public geteOtherDocSuccess(successData) {
    if (successData.IsSuccess) {
      this.eOtherDocumentProof = successData.ResponseObject;
    }
  }
  public geteOtherDocFailure(error) {
  }
  getesalereqProof() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.edelweissSalesReqProof(data).subscribe(
        (successData) => {
          this.geteSalesReqProofDocSuccess(successData);
        },
        (error) => {
          this.geteSalesReqProofDocFailure(error);
        }
    );
  }

  public geteSalesReqProofDocSuccess(successData) {
    if (successData.IsSuccess) {
      this.esalereqProof = successData.ResponseObject;
    }
  }
  public geteSalesReqProofDocFailure(error) {
  }
  // geteFileUpload() {
  //   const data = {
  //     'platform': 'web',
  //     'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
  //     'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
  //     'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
  //
  //   }
  //   this.termService.edelweissFileUpload(data).subscribe(
  //       (successData) => {
  //         this.geteFileUploadSuccess(successData);
  //       },
  //       (error) => {
  //         this.geteFileUploadFailure(error);
  //       }
  //   );
  // }
  //
  // public geteFileUploadSuccess(successData) {
  //   if (successData.IsSuccess) {
  //     this.esalereqProof = successData.ResponseObject;
  //   }
  // }
  // public geteFileUploadFailure(error) {
  // }

  getifscEdelweissDetails(ifsc) {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'ifsc_code': ifsc
    }
    if(ifsc.length == 11) {
      this.termService.ifscEdelweissDetails(data).subscribe(
          (successData) => {
            this.ifscSuccess(successData);
          },
          (error) => {
            this.ifscFailure(error);
          }
      );
    }
  }
  public ifscSuccess(successData) {
    if (successData.IsSuccess) {
      this.bankDetail.controls['name'].patchValue(successData.ResponseObject.bank_name);
      this.bankDetail.controls['location'].patchValue(successData.ResponseObject.bank_branch);
      // this.bankDetail.controls['micrCode'].patchValue(successData.ResponseObject.bank_micr);
      // // this.bankDetail.controls['bankAddress'].patchValue(successData.ResponseObject.bank_address);
      // this.bankDetail.controls['bankCity'].patchValue(successData.ResponseObject.bank_city);
      // this.bankDetail.controls['bankDistrict'].patchValue(successData.ResponseObject.bank_district);
      // this.bankDetail.controls['bankState'].patchValue(successData.ResponseObject.bank_state);

    }
  }
  public ifscFailure(error) {
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
        isStaff: this.getStepper1.isStaff,
        employeeCode: this.getStepper1.employeeCode,
        stitle: this.getStepper1.stitle,
        sfirstName: this.getStepper1.sfirstName,
        smidName: this.getStepper1.smidName,
        slastName: this.getStepper1.slastName,
        sdob: this.datepipe.transform(this.getStepper1.sdob, 'y-MM-dd'),
        semailId: this.getStepper1.semailId,
        smobileNo: this.getStepper1.smobileNo,
        isSmokerSpouse: this.getStepper1.isSmokerSpouse,
        isStaffSpouse: this.getStepper1.isStaffSpouse,
        employeeCodeSpouse: this.getStepper1.employeeCodeSpouse,
        relationSpouseProposer: this.getStepper1.relationSpouseProposer,
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
        isStaff: this.getStepper2.isStaff,
        employeeCode: this.getStepper2.employeeCode,
        stitle: this.getStepper2.stitle,
        sfirstName: this.getStepper2.sfirstName,
        smidName: this.getStepper2.smidName,
        slastName: this.getStepper2.slastName,
        sdob: this.datepipe.transform(this.getStepper2.sdob, 'y-MM-dd'),
        semailId: this.getStepper2.semailId,
        smobileNo: this.getStepper2.smobileNo,
        isSmokerSpouse: this.getStepper2.isSmokerSpouse,
        isStaffSpouse: this.getStepper2.isStaffSpouse,
        employeeCodeSpouse: this.getStepper2.employeeCodeSpouse,
        relationSpouseInsurer: this.getStepper2.relationSpouseInsurer,
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
        isCriminal: this.getStepper2.isCriminal,
        criminalDetails: this.getStepper2.criminalDetails,
        identityProof: this.getStepper2.identityProof,
        identityProofName: this.getStepper2.identityProofName,
        categorization: this.getStepper2.categorization,
        travelOutsideIndia: this.getStepper2.travelOutsideIndia,
        pilot: this.getStepper2.pilot,
        adventurousActivities: this.getStepper2.adventurousActivities,
        adventurousActivitiesDetails: this.getStepper2.adventurousActivitiesDetails,
        addrProof: this.getStepper2.addrProof,
        addrProofName: this.getStepper2.addrProofName,
        heightFeets: this.getStepper2.heightFeets,
        heightInches: this.getStepper2.heightInches,
        weight: this.getStepper2.weight,
        hasWeightChanged: this.getStepper2.hasWeightChanged,
        inbetweenweight: this.getStepper2.inbetweenweight,
        weightChangedreason: this.getStepper2.weightChangedreason,
        insureHistory: this.getStepper2.insureHistory,
        insureAccNo: this.getStepper2.insureAccNo,
        provideAccNo: this.getStepper2.provideAccNo,
        epolicy: this.getStepper2.epolicy,
        einsureAccNo: this.getStepper2.einsureAccNo,
        epolicy1: this.getStepper2.epolicy1,
        insureRepository: this.getStepper2.insureRepository,
        planOption:  this.getStepper2.planOption,
        workSiteFlag:  this.getStepper2.workSiteFlag,
        investmentStrategy: this.getStepper2.investmentStrategy,
        risingStar:  this.getStepper2.risingStar,
        policyOption:  this.getStepper2.policyOption,
        additionalBenefit: this.getStepper2.additionalBenefit,
        TopUpBenefit:  this.getStepper2.TopUpBenefit,
        topUpBenefitPercentage:  this.getStepper2.topUpBenefitPercentage,
        topUpRate:  this.getStepper2.topUpRate,
        betterHalfBenefit:  this.getStepper2.betterHalfBenefit,
        betterHalfsumAssured:  this.getStepper2.betterHalfsumAssured,
        waiverOfPremiumBenefit: this.getStepper2.waiverOfPremiumBenefit,
        criticalIllness:  this.getStepper2.criticalIllness,
        criticalsumAssured: this.getStepper2.criticalsumAssured,
        isADB:  this.getStepper2.isADB,
        sumAssuredADB:  this.getStepper2.sumAssuredADB,
        isATPD:  this.getStepper2.isATPD,
        sumAssuredATPD:  this.getStepper2.sumAssuredATPD,
        isHCB:  this.getStepper2.isHCB,
        sumAssuredHCB: this.getStepper2.sumAssuredHCB,
        payoutOption:  this.getStepper2.payoutOption,
        payoutPercentageIncome:  this.getStepper2.payoutPercentageIncome,
        noOfMonths:  this.getStepper2.noOfMonths,
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


      if (sessionStorage.medicalQuesDetails != '' && sessionStorage.medicalQuesDetails != undefined) {
          let getMedicalDetail = JSON.parse(sessionStorage.medicalQuesDetails);
          console.log(getMedicalDetail,'step4');

          for (let i=0; i < getMedicalDetail.medicalQuestions.length; i++) {
              if ( i !=  0) {
                  this.addMedItems();
                this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].disease.patchValue(getMedicalDetail.medicalQuestions[i].disease);
                this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].datediagnois.patchValue(this.datepipe.transform(getMedicalDetail.medicalQuestions[i].datediagnois, 'y-MM-dd'));
                this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].treatment.patchValue(getMedicalDetail.medicalQuestions[i].treatment);
                this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].dosage.patchValue(getMedicalDetail.medicalQuestions[i].dosage);
                this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].doctor.patchValue(getMedicalDetail.medicalQuestions[i].doctor);
                this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].datefollowup.patchValue(this.datepipe.transform(getMedicalDetail.medicalQuestions[i].datefollowup, 'y-MM-dd'));
                this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].anycomplications.patchValue(getMedicalDetail.medicalQuestions[i].anycomplications);
                this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].remarks.patchValue(getMedicalDetail.medicalQuestions[i].remarks);
          } else if (i == 0) {

                this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].disease.patchValue(getMedicalDetail.medicalQuestions[i].disease);
                this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].datediagnois.patchValue(this.datepipe.transform(getMedicalDetail.medicalQuestions[i].datediagnois, 'y-MM-dd'));
                this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].treatment.patchValue(getMedicalDetail.medicalQuestions[i].treatment);
                this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].dosage.patchValue(getMedicalDetail.medicalQuestions[i].dosage);
                this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].doctor.patchValue(getMedicalDetail.medicalQuestions[i].doctor);
                this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].datefollowup.patchValue(this.datepipe.transform(getMedicalDetail.medicalQuestions[i].datefollowup, 'y-MM-dd'));
                this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].anycomplications.patchValue(getMedicalDetail.medicalQuestions[i].anycomplications);
                this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].remarks.patchValue(getMedicalDetail.medicalQuestions[i].remarks);

              }
          }

        this.medicalDetail.controls['healthInformation'].patchValue(getMedicalDetail.healthInformation);
        this.medicalDetail.controls['drugsInd'].patchValue(getMedicalDetail.drugsInd);
        this.medicalDetail.controls['drugsDetails'].patchValue(getMedicalDetail.drugsDetails);
        this.medicalDetail.controls['alcoholInd'].patchValue(getMedicalDetail.alcoholInd);
        this.medicalDetail.controls['alcoholDetails'].patchValue(getMedicalDetail.alcoholDetails);
        this.medicalDetail.controls['tobaccoInd'].patchValue(getMedicalDetail.tobaccoInd);
        this.medicalDetail.controls['tobaccoDetails'].patchValue(getMedicalDetail.tobaccoDetails);
        this.medicalDetail.controls['tobaccoStopInd'].patchValue(getMedicalDetail.tobaccoStopInd);
        this.medicalDetail.controls['tobaccoStopDetails'].patchValue(getMedicalDetail.tobaccoStopDetails);
        this.medicalDetail.controls['consultDoctorInd'].patchValue(getMedicalDetail.consultDoctorInd);
        this.medicalDetail.controls['consultDoctorDetails'].patchValue(getMedicalDetail.consultDoctorDetails);
        this.medicalDetail.controls['ECGInd'].patchValue(getMedicalDetail.ECGInd);
        this.medicalDetail.controls['ECGDetails'].patchValue(getMedicalDetail.ECGDetails);
        this.medicalDetail.controls['admitInd'].patchValue(getMedicalDetail.admitInd);
        this.medicalDetail.controls['admitDetails'].patchValue(getMedicalDetail.admitDetails);
        this.medicalDetail.controls['medicalTreatment'].patchValue(getMedicalDetail.medicalTreatment);
        this.medicalDetail.controls['medicationDetails'].patchValue(getMedicalDetail.medicationDetails);
        this.medicalDetail.controls['receivedTreatment1'].patchValue(getMedicalDetail.receivedTreatment1);
        this.medicalDetail.controls['diagnosedDetails'].patchValue(getMedicalDetail.diagnosedDetails);
        this.medicalDetail.controls['heartDieaseInd'].patchValue(getMedicalDetail.heartDieaseInd);
        this.medicalDetail.controls['heartDieaseDetails'].patchValue(getMedicalDetail.heartDieaseDetails);
        this.medicalDetail.controls['BPInd'].patchValue(getMedicalDetail.BPInd);
        this.medicalDetail.controls['BPDetails'].patchValue(getMedicalDetail.BPDetails);
        this.medicalDetail.controls['respiratoryDieaseInd'].patchValue(getMedicalDetail.respiratoryDieaseInd);
        this.medicalDetail.controls['respiratoryDieaseDetails'].patchValue(getMedicalDetail.respiratoryDieaseDetails);
        this.medicalDetail.controls['diabetesInd'].patchValue(getMedicalDetail.diabetesInd);
        this.medicalDetail.controls['diabetesDetails'].patchValue(getMedicalDetail.diabetesDetails);
        this.medicalDetail.controls['kidneyDieaseInd'].patchValue(getMedicalDetail.kidneyDieaseInd);
        this.medicalDetail.controls['kidneyDieaseDetails'].patchValue(getMedicalDetail.kidneyDieaseDetails);
        this.medicalDetail.controls['digestiveDieaseInd'].patchValue(getMedicalDetail.digestiveDieaseInd);
        this.medicalDetail.controls['digestiveDieaseDetails'].patchValue(getMedicalDetail.digestiveDieaseDetails);
        this.medicalDetail.controls['cancerDieaseInd'].patchValue(getMedicalDetail.cancerDieaseInd);
        this.medicalDetail.controls['cancerDieaseDetails'].patchValue(getMedicalDetail.cancerDieaseDetails);
        this.medicalDetail.controls['tropicalDieaseInd'].patchValue(getMedicalDetail.tropicalDieaseInd);
        this.medicalDetail.controls['tropicalDieaseDetails'].patchValue(getMedicalDetail.tropicalDieaseDetails);
        this.medicalDetail.controls['thyroidDieaseInd'].patchValue(getMedicalDetail.thyroidDieaseInd);
        this.medicalDetail.controls['thyroidDieaseDetails'].patchValue(getMedicalDetail.thyroidDieaseDetails);
        this.medicalDetail.controls['bloodDieaseInd'].patchValue(getMedicalDetail.bloodDieaseInd);
        this.medicalDetail.controls['bloodDieaseDetails'].patchValue(getMedicalDetail.bloodDieaseDetails);
        this.medicalDetail.controls['nervousDieaseInd'].patchValue(getMedicalDetail.nervousDieaseInd);
        this.medicalDetail.controls['nervousDieaseDetails'].patchValue(getMedicalDetail.nervousDieaseDetails);
        this.medicalDetail.controls['ENTDieaseInd'].patchValue(getMedicalDetail.ENTDieaseInd);
        this.medicalDetail.controls['ENTDieaseDetails'].patchValue(getMedicalDetail.ENTDieaseDetails);
        this.medicalDetail.controls['muscleDieaseInd'].patchValue(getMedicalDetail.muscleDieaseInd);
        this.medicalDetail.controls['muscleDieaseDetails'].patchValue(getMedicalDetail.muscleDieaseDetails);
        this.medicalDetail.controls['receivedTreatment2'].patchValue(getMedicalDetail.receivedTreatment2);
        this.medicalDetail.controls['aidsDetails'].patchValue(getMedicalDetail.aidsDetails);
        this.medicalDetail.controls['alcoholicInd'].patchValue(getMedicalDetail.alcoholicInd);
        this.medicalDetail.controls['alcoholicDetails'].patchValue(getMedicalDetail.alcoholicDetails);
        this.medicalDetail.controls['otherIllnessInd'].patchValue(getMedicalDetail.otherIllnessInd);
        this.medicalDetail.controls['otherIllnessDetails'].patchValue(getMedicalDetail.otherIllnessDetails);
        this.medicalDetail.controls['deformityInd'].patchValue(getMedicalDetail.deformityInd);
        this.medicalDetail.controls['deformityDetails'].patchValue(getMedicalDetail.deformityDetails);
        this.medicalDetail.controls['symptomsInd'].patchValue(getMedicalDetail.symptomsInd);
        this.medicalDetail.controls['symptomsDetails'].patchValue(getMedicalDetail.symptomsDetails);
        this.medicalDetail.controls['pregnantInd'].patchValue(getMedicalDetail.pregnantInd);
        this.medicalDetail.controls['pregnantweeks'].patchValue(getMedicalDetail.pregnantweeks);
        this.medicalDetail.controls['femaleDieaseInd'].patchValue(getMedicalDetail.femaleDieaseInd);
        this.medicalDetail.controls['femaleDieaseWeeks'].patchValue(getMedicalDetail.femaleDieaseWeeks);

          console.log(this.medicalDetail,'medicalDetail');
      }

      console.log(this.medicalDetail, ' medicalQuesDetails ');



    if (sessionStorage.stepper3Details!= '' && sessionStorage.stepper3Details != undefined) {
      let getStepper3 = JSON.parse(sessionStorage.stepper3Details);
      if (getStepper3.itemsNominee.length > 1) {
        this.addNominee(event);
      }
      console.log(getStepper3.itemsNominee[0].nomineeName, ' patchval ');
      console.log(this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].nomineeName, ' nnName ');
      console.log(getStepper3,'333333');
      console.log(getStepper3.itemsNominee.length,'length');
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
        this.bankDetail.controls['accName'].patchValue(getStepper4.accName);
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
    geteNomineeRelationName(i) {
   this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nomineeRelationshipName.patchValue(this.eNomineeRelation[this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nomineeRelationship.value] );
  }



}
