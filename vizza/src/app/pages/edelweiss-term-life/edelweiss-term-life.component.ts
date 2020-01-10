import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatStepper} from '@angular/material';
import {DatePipe} from '@angular/common';
import {ActivatedRoute,Router} from '@angular/router';
import {CommonService} from '../../shared/services/common.service';
import {AppSettings} from '../../app.settings';
import {ToastrService} from 'ngx-toastr';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {TermLifeCommonService} from '../../shared/services/term-life-common.service';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import * as moment from 'moment';
import { WINDOW } from '@ng-toolkit/universal';
import {ValidationService} from '../../shared/services/validation.service';



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
  public customerDetails: FormGroup;
  public addon: FormGroup;
  public insureArray: FormGroup;
  public medicalDetail: FormGroup;
  public bankDetail: FormGroup;
  public nomineeDetail: FormGroup;
  public documentDetail: FormGroup;
  public itemsNominee: any;
  public addExistingInsurance: any;
  public addmedicalQuestions: any;
  public addmedFamilyQuestions: any;
  public getStepperaddon: any;
  public adbError: any;
  public ciError: any;
  public atpdError: any;
  public hcbdError: any;
  public etitle: any;
  public egender: any;
  public minDate: any;
  public maxDate: any;
  public step: any;
  public taxRequired: any;
  public getStepper1: any;
  public getSteppercustomer: any;
  public getStepper2: any;
  public getMedicalDetail: any;
  public getStepper3: any;
  public getStepper4: any;
  public getDays: any;
  public getAge: any;
  public emaritalStatus: any;
  public einvesting: any;
  public ePremiumTerm: any;
  public eAlcoholDetails: any;
  public eTobaccoDetails: any;
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
  public eAcceptanceTerm: any;
  public ePolicyStatus: any;
  public eState: any;
  public eemploymentType: any;
  public eDuty: any;
  public bduty: any;
  public eHeightFeet: any;
  public epolicyOption: any;
  public epayoutOption: any;
  public epayoutMonth: any;
  public eHeightInches: any;
  public ehealthStatus: any;
  public eWeightChanged: any;
  public weightList: any;
  public ePolicyCategory: any;
  public eAdActivity: any;
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
  public dateError12: any;
  public customerAge: any;
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
  public addonFormData: any;
  public bankFormData: any;
  public proposalId: any;
  public nomineeDetails: any;
  public insurePersons: any;
  public payingTermList: any;
  public SpouseAge: any;
  public SpouseError: any;
  public valid: any;
  public settings: any;
  public webhost: any;
  // public weburl:any;
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
  public otpCode: any;
  public salesReqProofPath: any;
  public salesReqProposalPath: any;
  public PhotographPath: any;
  public PhotographProPath: any;
  public kycProofPath: any;
  public idProofPath: any;
  public allImage: any;
  public documentPath: any;
  public fileUploadStatus: boolean;
  public proposalGenStatus: boolean;
  public proposalNextList: any;
  public proposalFormPdf: any;
  public optGenStatus: boolean;
  public otpGenList: any;
  public enquiryFromDetials:any;
  public errortravelOutside:any;
  // public isHospitalizederror:any;
  public pregnantInderror:any;
  public femaleDieaseInderror:any;
  // public isRecoverederror:any;
  public bloodDieaseInderror:any;
  public otherIllnessInderror:any;
  public receivedTreatment1error:any;
  public symptomsInderror:any;
  public deformityInderror:any;
  public receivedTreatment2error:any;
  public alcoholicInderror:any;
  public nervousDieaseInderror:any;
  public muscleDieaseInderror:any;
  public thyroidDieaseInderror:any;
  public cancerDieaseInderror:any;
  public tropicalDieaseInderror:any;
  public digestiveDieaseInderror:any;
  public kidneyDieaseInderror:any;
  public respiratoryDieaseInderror:any;
  public diabetesInderror:any;
  public consultDoctorInderror:any;
  public heartDieaseInderror:any;
  public admitInderror:any;
  public medicalTreatmenterror:any;
  public ECGInderror:any;
  // public tobaccoStopInderror:any;
  public premiumPayment:any;
  public ageTill:any;
  public ADB:any;
  public sum:any;
  public basePremium:any;
  public premium:any;
  public PDP:any;
  public PW:any;
  public CIP:any;
  public BhP:any;
  public hcp:any;
  public better_half_sum_assured:any;
  public planname:any;
  public payingTerm:any;
  public policyTerm:any;
  public eePremiumTerm:any;
  public piloterror:any;
  public activityerror:any;
  public drugsInderror:any;
  public alcoholInderror:any;
  public tobaccoInderror:any;
  public hcb_sumassured_min:any;
  public hcb_sumassured_max:any;
  public tittleread :boolean;
  public otpFalseError :boolean;


  constructor(@Inject(WINDOW) private window: Window,  public fb: FormBuilder,public router: Router, public dialog: MatDialog, public datepipe: DatePipe, public route: ActivatedRoute, public common: CommonService, public validation: ValidationService, public appSettings: AppSettings, private toastr: ToastrService, public config: ConfigurationService, public authservice: AuthService, public termService: TermLifeCommonService,  ) {
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
          this.addonFormData = JSON.parse(sessionStorage.addonFormData);
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
    this.errortravelOutside =false;
    this.muscleDieaseInderror =false;
    // this.isRecoverederror =false;
    this.pregnantInderror =false;
    this.femaleDieaseInderror =false;
    // this.isHospitalizederror =false;
    this.receivedTreatment2error =false;
    this.receivedTreatment1error =false;
    this.symptomsInderror =false;
    this.deformityInderror =false;
    this.otherIllnessInderror =false;
    this.alcoholicInderror =false;
    this.cancerDieaseInderror =false;
    this.nervousDieaseInderror =false;
    this.bloodDieaseInderror =false;
    this.thyroidDieaseInderror =false;
    this.tropicalDieaseInderror =false;
    this.digestiveDieaseInderror =false;
    this.kidneyDieaseInderror =false;
    this.respiratoryDieaseInderror =false;
    this.heartDieaseInderror =false;
    this.diabetesInderror =false;
    this.consultDoctorInderror =false;
    this.medicalTreatmenterror =false;
    this.admitInderror =false;
    this.ECGInderror =false;
    this.otpFalseError =false;
    // this.tobaccoStopInderror =false;
    this.piloterror =false;
    this.activityerror =false;
    this.tittleread == false;
    this.drugsInderror =false;
    this.alcoholInderror =false;
    this.tobaccoInderror =false;
    this.proposalGenStatus = true;
    this.proposalNextList = '';
    this.optGenStatus = true;
    this.otpGenList = '';
    this.otpCode = '';
    const minDate = new Date();
    this.minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
    let today  = new Date();
    this.today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    this.valid = false;
    this.settings = this.appSettings.settings;
    this.webhost = this.config.getimgUrl();
    // this.weburl = this.config.getHostTerm();
    this.nomineeDetails = [];
    this.taxRequired = '';
    this.step = 0;
    // this.proposer = this.fb.group({
    //   title:  ['', Validators.compose([Validators.required])],
    //   titleName: '',
    //   firstName: ['', Validators.compose([Validators.required])],
    //   midName: '',
    //   lastName: ['', Validators.compose([Validators.required])],
    //   gender: ['', Validators.compose([Validators.required])],
    //   dob: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
    //   maritalStatus: ['', Validators.required],
    //   maritalStatusName: '',
    //   nationality: '',
    //   emailId: ['', Validators.compose([ Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
    //   pan: ['', Validators.compose([ Validators.minLength(10)])],
    //   aadhaarNo: '',
    //   ageProofIdName: '',
    //   fatherhusbandName: '',
    //   ageProofId: ['', Validators.compose([Validators.required])],
    //   highestQualification: ['', Validators.compose([Validators.required])],
    //   highestQualificationName: '',
    //   otherQualification: '',
    //   mobileNo: ['', Validators.compose([Validators.pattern('[6-9]\\d{9}')])],
    //   // isStaff: 'No',
    //   // empl
    //   // oyeeCode: '',
    //   stitle: '',
    //   stitleName: '',
    //   sfirstName: '',
    //   smidName: '',
    //   slastName: '',
    //   sdob: '',
    //   semailId: '',
    //   smobileNo: '',
    //   isSmokerSpouse: 'No',
    //   isStaffSpouse: 'No',
    //   employeeCodeSpouse: '',
    //   relationSpouseProposer: '3',
    //   relationSpouseProposerName: 'Spouse',
    //   currAddr1: ['', Validators.compose([Validators.required])],
    //   currAddr2: ['', Validators.compose([Validators.required])],
    //   currAddr3: '',
    //   currPincode: ['', Validators.compose([Validators.required])],
    //   currState: ['', Validators.compose([Validators.required])],
    //   currCity: ['', Validators.compose([Validators.required])],
    //   perAddr1: ['', Validators.compose([Validators.required])],
    //   perAddr2: ['', Validators.compose([Validators.required])],
    //   perAddr3: '',
    //   perPincode: ['', Validators.compose([Validators.required])],
    //   perState: ['', Validators.compose([Validators.required])],
    //   perCity: ['', Validators.compose([Validators.required])],
    //   isCurrPerAddrSame: '',
    //   employementTypeOther: '',
    //   employementType: ['', Validators.compose([Validators.required])],
    //   employementTypeName: '',
    //   employerName: ['', Validators.compose([Validators.required])],
    //   natureduty: ['', Validators.compose([Validators.required])],
    //   naturedutyName: '',
    //   employerAddr: ['', Validators.compose([Validators.required])],
    //   annualIncome: ['', Validators.compose([Validators.required])],
    //   taxResidence: ['', Validators.compose([Validators.required])],
    //
    // });
    this.customerDetails = this.fb.group({
      // investing: ['', Validators.compose([Validators.required])],
      title: ['', Validators.compose([Validators.required])],
      firstName: ['', Validators.compose([Validators.required])],
      titleName: '',
      lastName: ['', Validators.compose([Validators.required])],
      dob: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      maritalStatus: ['', Validators.required],
      maritalStatusName: '',
      annualIncome: '',
      mobileNo: ['', Validators.compose([Validators.pattern('[6-9]\\d{9}')])],
      isSmoker:'No',
      emailId: ['', Validators.compose([ Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
      // motherMaidName: '',

    });
    this.addon = this.fb.group({

      additionalBenefit: '',
      // TopUpBenefit: 'No',
      // topUpBenefitPercentage: '',
      // topUpRate: '',
      betterHalfBenefit: '',
      betterHalfsumAssured: '5000000',
      waiverOfPremiumBenefit: '',
      // DSumAssured: 'No',
      criticalIllness: '',
      // criticalClaim: 'No',
      criticalsumAssured: '1000000',
      isADB: '',
      sumAssuredADB: '1000000',
      isATPD: '',
      sumAssuredATPD: '1000000',
      isHCB: '',
      sumAssuredHCB: '100000',
      payoutOption: '',
      // DSA:'No',
      noOfMonths: '',
      payoutPercentageIncome: '',
      stitle: '',
      stitleName: '',
      sfirstName: '',
      slastName: '',
      semailId: ['', Validators.compose([ Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
      isSmokerSpouse: 'No',
      sdob: '',
      sameAsProposer: false,
    });


    this.insureArray = this.fb.group({
      // investing: ['', Validators.compose([Validators.required])],
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
      pan: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      aadhaarNo:'',
      ageProofIdName: '',
      fatherhusbandName: '',
      motherMaidName: '',
      ageProofId: ['', Validators.compose([Validators.required])],
      highestQualification: ['', Validators.compose([Validators.required])],
      highestQualificationName: '',
      otherQualification: '',
      mobileNo: ['', Validators.compose([Validators.pattern('[6-9]\\d{9}')])],
      // isStaff: 'No',
      // employeeCode: '',
      stitle: '',
      stitleName: '',
      sfirstName: '',
      smidName: '',
      slastName: '',
      sdob: '',
      // semailId: '',
      // smobileNo: '',
      // snationality: '',
      semailId: ['', Validators.compose([ Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
      sppan: ['', Validators.compose([Validators.minLength(10)])],
      saadhaarNo:'',
      // sageProofIdName: '',
      sfatherhusbandName: '',
      smotherMaidName: '',
      sageProofId: '',
      shighestQualification: '',
      shighestQualificationName: '',
      sotherQualification: '',
      smobileNo: ['', Validators.compose([Validators.pattern('[6-9]\\d{9}')])],

      scurrAddr1: '',
      scurrAddr2: '',
      scurrAddr3: '',
      scurrPincode: '',
      scurrState: '',
      scurrCity: '',
      sperAddr1: '',
      sperAddr2: '',
      sperAddr3: '',
      sperPincode: '',
      sperState: '',
      sperCity: '',
      sisCurrPerAddrSame: false,
      sheightFeets: '',
      sheightInches: '',
      sweight: '',
      shasWeightChanged: '',
      sinbetweenweight: '',
      sweightChangedreason: '',

      isSmokerSpouse: 'No',
      // isStaffSpouse: 'No',
      // employeeCodeSpouse: '',
      // relationSpouseInsurer: '3',
      // relationSpouseInsurerName: 'Spouse',
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
      // taxResidence: ['', Validators.compose([Validators.required])],
      isPoliticallyExposed: false,
      specification: '',
      // Cover:['', Validators.compose([Validators.required])],
      // ageTillCoverd: ['40', Validators.compose([Validators.required])],
      // premiumPay: ['2', Validators.compose([Validators.required])],
      // modeOfPremium: ['', Validators.compose([Validators.required])],
      isCriminal: 'No',
      criminalDetails: '',
      identityProof: ['', Validators.compose([Validators.required])],
      identityProofName: '',
      // categorization: '',
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
      // planOption: 'No',
      // workSiteFlag: 'No',
      // investmentStrategy: '',
      // risingStar: 'No',
      // policyOption: '',
      // additionalBenefit: '',
      // TopUpBenefit: 'No',
      // topUpBenefitPercentage: '',
      // topUpRate: '',
      // betterHalfBenefit: 'No',
      // betterHalfsumAssured: '',
      // waiverOfPremiumBenefit: 'No',
      // DSumAssured: 'No',
      // criticalIllness: 'No',
      // criticalClaim: 'No',
      // criticalsumAssured: '',
      // isADB: 'No',
      // sumAssuredADB: '',
      // isATPD: 'No',
      // sumAssuredATPD: '',
      // isHCB: 'No',
      // sumAssuredHCB: '',
      payoutOption: '',
      // DSA:'No',
      noOfMonths: '',
      payoutPercentageIncome: '',
      sameAsProposer: false,

    });



    this.medicalDetail = this.fb.group({
      travelOutsideIndia1:'',
      travelOutsideIndia: '',
      pilot1: '',
      activity1: '',
      adventurousActivities1: '',
      adventurousActivitiesName1: '',
      adventurousActivitiesDetails1: '',
      medicalTreatment1: '',
      medicationDetails1: '',
      receivedTreatment11: '',
      diagnosedDetails1:  '',
      receivedTreatment21: '',
      aidsDetails1: '',
      healthInformation1: '',
      drugsInd1: '',
      drugsDetails1: '',
      alcoholInd1: '',
      alcoholDetails1: '',
      alcoholBeer1: '',
      alcoholliquar1: '',
      alcoholWine1: '',
      tobaccoInd1: '',
      tobaccoDetails1: '',
      tobaccoStopInd1: '',
      tobaccoStopDetails1: '',
      consultDoctorInd1: '',
      consultDoctorDetails1: '',
      ECGInd1: '',
      ECGDetails1: '',
      admitInd1: '',
      admitDetails1:  '',
      heartDieaseInd1: '',
      heartDieaseDetails1: '',
      isHospitalized1: '',
      hospitalizedDate1:  '',
      respiratoryDieaseInd1: '',
      respiratoryDieaseDetails1: '',
      diabetesInd1: '',
      diabetesDetails1: '',
      kidneyDieaseInd1: '',
      kidneyDieaseDetails1: '',
      digestiveDieaseInd1: '',
      digestiveDieaseDetails1: '',
      cancerDieaseInd1: '',
      cancerDieaseDetails1: '',
      tropicalDieaseInd1: '',
      tropicalDieaseDetails1: '',
      thyroidDieaseInd1: '',
      thyroidDieaseDetails1: '',
      bloodDieaseInd1: '',
      bloodDieaseDetails1: '',
      nervousDieaseInd1: '',
      nervousDieaseDetails1: '',
      isRecovered1: '',
      nonRecoveryDetails1: '',
      muscleDieaseInd1: '',
      muscleDieaseDetails1: '',
      alcoholicInd1: '',
      alcoholicDetails1: '',
      otherIllnessInd1: '',
      otherIllnessDetails1: '',
      deformityInd1: '',
      deformityDetails1: '',
      symptomsInd1: '',
      symptomsDetails1: '',
      pregnantInd1: '',
      pregnantweeks1: '',
      femaleDieaseInd1: '',

      pilot: '',
      activity: '',
      adventurousActivities: '',
      adventurousActivitiesName: '',
      adventurousActivitiesDetails: '',
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
      alcoholBeer: '',
      alcoholliquar: '',
      alcoholWine: '',
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
      isHospitalized: '',
      hospitalizedDate:  '',
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
      isRecovered: '',
      nonRecoveryDetails: '',
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
      medicalFamilyQuestions : new FormArray([
        this.medicalFamilyCreate()
      ]),

    });

    this.bankDetail = this.fb.group({
      accountNo: ['', Validators.compose([Validators.required])],
      accName: ['', Validators.compose([Validators.required])],
      name: '',
      location: '',
      ifscCode: ['', Validators.compose([Validators.required])],
      // investmentStrategy: '',
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
    this.addmedFamilyQuestions = this.medicalDetail.get('medicalFamilyQuestions') as FormArray;

    this.documentDetail = this.fb.group({
      incomeLA: '',
      identityLA: '',
      addressLA: '',
      ageLA: '',
      documentLA: '',
      proposalLA: '',
      salereqLA: '',
      kycLA: '',
      incomePA: '',
      identityPA: '',
      addressPA: '',
      agePA: '',
      documentPA: '',
      proposalPA: '',
      salereqPA: '',
      kycPA: '',


    });

  }

  ngOnInit() {
    console.log(this.medicalDetail.controls['travelOutsideIndia'].value ,' travelOutsideIndia')
    // console.log(this.medicalDetail.controls['errortravelOutside'].value ,' errortravelOutside')
    this.enquiryFormData = JSON.parse(sessionStorage.enquiryFormData);
    this.lifePremiumList = JSON.parse(sessionStorage.lifePremiumList);
    this.getEnquiryDetials = JSON.parse(sessionStorage.getEnquiryDetials);
    this.enquiryFromDetials = JSON.parse(sessionStorage.enquiryFromDetials);
    // this.geteGender();
    this.geteTitle();
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
    this.getepolicyStatus();
    this.geteAcceptanceTerm();
    this.geteState();
    this.geteemploymentType();
    this.geteDuty();
    this.setbdutyList();
    this.geteHeightFeet();
    this.geteHeightInches();
    this.getHealthStaus();
    this.getPolicyOption();
    this.getpayoutOption();
    this.geteWeightChanged();
    this.changeWeightChanged();
    this.getePolicyCategory();
    this.getedelweissActivities();
    this.getpayoutMonth();
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
    this.geteTobaccoDetail();
    this.getesalereqProof();
    this.geteAlcoholDetails();
    this.sessionData();
    this.edelweissPrimium();
    // this.premiumPaymentTerm();
    // this.ageTillcoverd();

    // this.insureArray.controls['dob'].patchValue (this.datepipe.transform(this.enquiryFromDetials.dob, 'y-MM-dd'));
    // let dob = this.datepipe.transform(this.enquiryFromDetials.dob, 'y-MM-dd');
    this.customerDetails.controls['dob'].patchValue (this.datepipe.transform(this.enquiryFromDetials.dob, 'y-MM-dd'));
    console.log(this.customerDetails.controls['dob'].value,'dob')
    console.log(this.enquiryFromDetials.dob,'dob')
    let dob = this.datepipe.transform(this.enquiryFromDetials.dob, 'y-MM-dd');
    this.customerAge = this.ageCalculate(dob);
    sessionStorage.customerAge = this.customerAge;
    this.proposerAge = this.ageCalculate(dob);
    sessionStorage.proposerAge = this.proposerAge;
    // this.proposer.controls['age'].patchValue(this.proposerAge);
    this.insureArray.controls['gender'].patchValue(this.enquiryFromDetials.gender == 'f' ? 'Female' : 'Male');
    this.customerDetails.controls['title'].patchValue(this.enquiryFromDetials.gender == 'f' ? '2' : '1');

    this.customerDetails.controls['isSmoker'].patchValue(this.enquiryFromDetials.smoker == 'y' ? 'Yes' : 'No');
    console.log( this.customerDetails.controls['isSmoker'].value,'dob')
    console.log( this.enquiryFromDetials.smoker,'dob')

    this.customerDetails.controls['annualIncome'].patchValue(this.enquiryFromDetials.annualIncome);
    console.log( this.customerDetails.controls['annualIncome'].value,'dob')
    console.log( this.enquiryFromDetials.annualIncome,'dob')

    // this.insureArray.controls['Cover'].patchValue(sessionStorage.selectedAmountTravel);

    // this.proposer.controls['title'].patchValue(this.enquiryFromDetials.gender == 'm' ? 'Mr.' : 'Mrs./Ms.');

    if (this.enquiryFromDetials.gender == 'm') {
      this.insureArray.controls['title'].patchValue('1');
      // if (this.enquiryFromDetials.gender == 'm') {
      //   this.proposer.controls['gender'].patchValue('Male');
      // } else {
      //   this.proposer.controls['gender'].patchValue('Female');
      // }
    } else if (this.enquiryFromDetials.gender == 'f') {
      this.insureArray.controls['title'].patchValue('2');
    }
    this.insureArray.controls['currPincode'].patchValue(this.enquiryFromDetials.pincode);
    // this.insureArray.controls['modeOfPremium'].patchValue(this.enquiryFromDetials.payment_mode);
    console.log(this.enquiryFromDetials.lifePayment,'lifepayment');
    console.log(this.insureArray.controls['modeOfPremium'].value,'lifepayment');
    // this.getPostal(this.proposer.controls['pincode'].value, 'personal');

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
      policyStatus :  new FormControl(),
      acceptanceTerm :  new FormControl()
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
      disease : new FormControl(),
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
      console.log(this.addmedicalQuestions, 'this.addmedicalQuestions');
    }
  }
  removeMedItems(index) {
    let removeQue =  this.medicalDetail.get('medicalQuestions') as FormArray;
    console.log(removeQue,'ssssss')
    removeQue.removeAt(index);
    console.log(index, 'this.index');


  }

  // Medical Family Create
  medicalFamilyCreate() {
    return new FormGroup({
      relation : new FormControl(),
      age :  new FormControl(),
      healthStatus :  new FormControl(),
      relationName :  new FormControl(),

    });
  }
  addFamilyItems() {
    if (this.medicalDetail.get('medicalFamilyQuestions').value.length < 5) {
      this.addmedFamilyQuestions.push(this.medicalFamilyCreate());
      console.log(this.addmedFamilyQuestions, 'this.addmedFamilyQuestions');
    }
  }
  removeFamilyItems(index) {
    let removeFamily =  this.medicalDetail.get('medicalFamilyQuestions') as FormArray;
    console.log(removeFamily,'ssssss')
    removeFamily.removeAt(index);
    console.log(index, 'this.index');


  }
  addEventcus(event) {
    if (event.value != null) {
      let selectedDate = '';
      this.customerAge = '';
      let dob = '';
      if (typeof event.value._i == 'string') {
        const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
        if (pattern.test(event.value._i) && event.value._i.length == 10) {
          this.dateError12 = '';
        } else {
          this.dateError12 = 'Enter Valid Date';
        }
        selectedDate = event.value._i;
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (selectedDate.length == 10) {
          this.customerAge = this.ageCalculate(dob);
          // sessionStorage.proposerAge = this.proposerAge;

        }

      } else if (typeof event.value._i == 'object') {
        // dob = this.datepipe.transform(event.value, 'MMM d, y');
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (dob.length == 10) {
          this.customerAge = this.ageCalculate(dob);
          // sessionStorage.insuredAgePA = this.proposerAge;

        }
        this.dateError12 = '';
      }
      sessionStorage.customerAge = this.customerAge;

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
      console.log(sessionStorage.proposerSpouseAge,'spousedetaill111')
      console.log(this.proposerSpouseAge,'spousedate222222')

    }
  }
  addEventSpouse1(event) {
    if (event.value != null) {
      let selectedDate = '';
      this.SpouseAge = '';
      let dob = '';
      if (typeof event.value._i == 'string') {
        const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
        if (pattern.test(event.value._i) && event.value._i.length == 10) {
          this.SpouseError = '';
        } else {
          this.SpouseError = 'Enter Valid Date';
        }
        selectedDate = event.value._i;
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (selectedDate.length == 10) {
          this.SpouseAge = this.ageCalculate(dob);
          // sessionStorage.proposerSpouseAge = this.proposerSpouseAge;

        }

      } else if (typeof event.value._i == 'object') {
        // dob = this.datepipe.transform(event.value, 'MMM d, y');
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (dob.length == 10) {
          this.SpouseAge = this.ageCalculate(dob);
          // sessionStorage.insuredAgePA = this.proposerSpouseAge;

        }
        this.dateSpouseError = '';
      }
      sessionStorage.SpouseAge = this.SpouseAge;
      console.log(sessionStorage.SpouseAge,'spousedetaill111')
      console.log(this.SpouseAge,'spousedate222222')

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
  // sameAddress() {
  //   if (this.proposer.controls['isCurrPerAddrSame'].value == true) {
  //     this.proposer.controls['perAddr1'].patchValue( this.proposer.controls['currAddr1'].value),
  //         this.proposer.controls['perAddr2'].patchValue( this.proposer.controls['currAddr2'].value),
  //         this.proposer.controls['perAddr3'].patchValue( this.proposer.controls['currAddr3'].value),
  //         this.proposer.controls['perCity'].patchValue( this.proposer.controls['currCity'].value),
  //         this.proposer.controls['perPincode'].patchValue( this.proposer.controls['currPincode'].value),
  //         this.proposer.controls['perState'].patchValue( this.proposer.controls['currState'].value)
  //     console.log(this.proposer.controls['perCity'].value, 'ghghghj');
  //   } else {
  //     this.proposer.controls['perAddr1'].patchValue(''),
  //         this.proposer.controls['perAddr2'].patchValue(''),
  //         this.proposer.controls['perAddr3'].patchValue(''),
  //         this.proposer.controls['perCity'].patchValue(''),
  //         this.proposer.controls['perPincode'].patchValue(''),
  //         this.proposer.controls['perState'].patchValue('')
  //   }
  // }
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
  sameAddress2() {
    if (this.insureArray.controls['sisCurrPerAddrSame'].value == true) {
      this.insureArray.controls['sperAddr1'].patchValue( this.insureArray.controls['scurrAddr1'].value),
          this.insureArray.controls['sperAddr2'].patchValue( this.insureArray.controls['scurrAddr2'].value),
          this.insureArray.controls['sperAddr3'].patchValue( this.insureArray.controls['scurrAddr3'].value),
          this.insureArray.controls['sperCity'].patchValue( this.insureArray.controls['scurrCity'].value),
          this.insureArray.controls['sperPincode'].patchValue( this.insureArray.controls['scurrPincode'].value),
          this.insureArray.controls['sperState'].patchValue( this.insureArray.controls['scurrState'].value)
      console.log(this.insureArray.controls['sperCity'].value, 'ghghghj');
    } else {
      this.insureArray.controls['sperAddr1'].patchValue(''),
          this.insureArray.controls['sperAddr2'].patchValue(''),
          this.insureArray.controls['sperAddr3'].patchValue(''),
          this.insureArray.controls['sperCity'].patchValue(''),
          this.insureArray.controls['sperPincode'].patchValue(''),
          this.insureArray.controls['sperState'].patchValue('')
    }
  }

  // typeAddressDeatils() {
  //   if (this.proposer.controls['isCurrPerAddrSame'].value) {
  //     this.proposer.controls['perAddr1'].setValue( this.proposer.controls['currAddr1'].value),
  //         this.proposer.controls['perAddr2'].setValue( this.proposer.controls['currAddr2'].value),
  //         this.proposer.controls['perAddr3'].setValue( this.proposer.controls['currAddr3'].value),
  //         this.proposer.controls['perCity'].setValue( this.proposer.controls['currCity'].value),
  //         this.proposer.controls['perPincode'].setValue( this.proposer.controls['currPincode'].value),
  //         this.proposer.controls['perState'].setValue( this.proposer.controls['currState'].value)
  //
  //   }
  // }

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

  // sameAsInsure() {
  //
  //   if (this.insureArray.controls['investing'].value == 'SELF') {
  //
  //         this.insureArray.controls['title'].patchValue(this.proposer.controls['title'].value),
  //         this.insureArray.controls['titleName'].patchValue(this.proposer.controls['titleName'].value),
  //         this.insureArray.controls['firstName'].patchValue(this.proposer.controls['firstName'].value),
  //         this.insureArray.controls['midName'].patchValue(this.proposer.controls['midName'].value),
  //         this.insureArray.controls['lastName'].patchValue(this.proposer.controls['lastName'].value),
  //         this.insureArray.controls['gender'].patchValue(this.proposer.controls['gender'].value),
  //         this.insureArray.controls['dob'].patchValue(this.proposer.controls['dob'].value),
  //         this.insureArray.controls['maritalStatus'].patchValue(this.proposer.controls['maritalStatus'].value),
  //         this.insureArray.controls['maritalStatusName'].patchValue(this.proposer.controls['maritalStatusName'].value),
  //         this.insureArray.controls['nationality'].patchValue(this.proposer.controls['nationality'].value),
  //         this.insureArray.controls['emailId'].patchValue(this.proposer.controls['emailId'].value),
  //         this.insureArray.controls['pan'].patchValue(this.proposer.controls['pan'].value),
  //         // this.insureArray.controls['motherMaidName'].patchValue(this.proposer.controls['motherMaidName'].value),
  //         this.insureArray.controls['aadhaarNo'].patchValue(this.proposer.controls['aadhaarNo'].value),
  //         this.insureArray.controls['fatherhusbandName'].patchValue(this.proposer.controls['fatherhusbandName'].value),
  //         this.insureArray.controls['ageProofId'].patchValue(this.proposer.controls['ageProofId'].value),
  //         this.insureArray.controls['ageProofIdName'].patchValue(this.proposer.controls['ageProofIdName'].value),
  //         this.insureArray.controls['highestQualification'].patchValue(this.proposer.controls['highestQualification'].value),
  //         this.insureArray.controls['highestQualificationName'].patchValue(this.proposer.controls['highestQualificationName'].value),
  //         this.insureArray.controls['shighestQualificationName'].patchValue(this.proposer.controls['shighestQualificationName'].value),
  //         this.insureArray.controls['otherQualification'].patchValue(this.proposer.controls['otherQualification'].value),
  //         this.insureArray.controls['mobileNo'].patchValue(this.proposer.controls['mobileNo'].value),
  //         this.insureArray.controls['isStaff'].patchValue(this.proposer.controls['isStaff'].value),
  //         this.insureArray.controls['employeeCode'].patchValue(this.proposer.controls['employeeCode'].value),
  //         this.insureArray.controls['stitle'].patchValue(this.proposer.controls['stitle'].value),
  //         this.insureArray.controls['stitleName'].patchValue(this.proposer.controls['stitleName'].value),
  //         this.insureArray.controls['sfirstName'].patchValue(this.proposer.controls['sfirstName'].value),
  //         this.insureArray.controls['smidName'].patchValue(this.proposer.controls['smidName'].value),
  //         this.insureArray.controls['slastName'].patchValue(this.proposer.controls['slastName'].value),
  //         this.insureArray.controls['sdob'].patchValue(this.proposer.controls['sdob'].value),
  //         this.insureArray.controls['semailId'].patchValue(this.proposer.controls['semailId'].value),
  //         this.insureArray.controls['smobileNo'].patchValue(this.proposer.controls['smobileNo'].value),
  //         this.insureArray.controls['isSmokerSpouse'].patchValue(this.proposer.controls['isSmokerSpouse'].value),
  //         // this.insureArray.controls['isStaffSpouse'].patchValue(this.proposer.controls['isStaffSpouse'].value),
  //         this.insureArray.controls['employeeCodeSpouse'].patchValue(this.proposer.controls['employeeCodeSpouse'].value),
  //         this.insureArray.controls['relationSpouseInsurer'].patchValue(this.proposer.controls['relationSpouseProposer'].value),
  //         this.insureArray.controls['relationSpouseInsurerName'].patchValue(this.proposer.controls['relationSpouseProposerName'].value),
  //         this.insureArray.controls['currAddr1'].patchValue(this.proposer.controls['currAddr1'].value),
  //         this.insureArray.controls['currAddr2'].patchValue(this.proposer.controls['currAddr2'].value),
  //         this.insureArray.controls['currAddr3'].patchValue(this.proposer.controls['currAddr3'].value),
  //         this.insureArray.controls['currPincode'].patchValue(this.proposer.controls['currPincode'].value),
  //         this.insureArray.controls['currState'].patchValue(this.proposer.controls['currState'].value),
  //         this.insureArray.controls['currCity'].patchValue(this.proposer.controls['currCity'].value),
  //         this.insureArray.controls['perAddr1'].patchValue(this.proposer.controls['perAddr1'].value),
  //         this.insureArray.controls['perAddr2'].patchValue(this.proposer.controls['perAddr2'].value),
  //         this.insureArray.controls['perAddr3'].patchValue(this.proposer.controls['perAddr3'].value),
  //         this.insureArray.controls['perPincode'].patchValue(this.proposer.controls['perPincode'].value),
  //         this.insureArray.controls['perState'].patchValue(this.proposer.controls['perState'].value),
  //         this.insureArray.controls['perCity'].patchValue(this.proposer.controls['perCity'].value),
  //         this.insureArray.controls['isCurrPerAddrSame'].patchValue(this.proposer.controls['isCurrPerAddrSame'].value),
  //         this.insureArray.controls['employementTypeOther'].patchValue(this.proposer.controls['employementTypeOther'].value),
  //         this.insureArray.controls['employementType'].patchValue(this.proposer.controls['employementType'].value),
  //         this.insureArray.controls['employementTypeName'].patchValue(this.proposer.controls['employementTypeName'].value),
  //         this.insureArray.controls['employerName'].patchValue(this.proposer.controls['employerName'].value),
  //         this.insureArray.controls['natureduty'].patchValue(this.proposer.controls['natureduty'].value),
  //         this.insureArray.controls['naturedutyName'].patchValue(this.proposer.controls['naturedutyName'].value),
  //         this.insureArray.controls['employerAddr'].patchValue(this.proposer.controls['employerAddr'].value),
  //         this.insureArray.controls['annualIncome'].patchValue(this.proposer.controls['annualIncome'].value),
  //         this.insureArray.controls['taxResidence'].patchValue(this.proposer.controls['taxResidence'].value)
  //         console.log(this.insureArray.controls['title'].value, 'ghghghj');
  //   } else {
  //         this.insureArray.controls['title'].patchValue(''),
  //         this.insureArray.controls['titleName'].patchValue(''),
  //         this.insureArray.controls['firstName'].patchValue(''),
  //         this.insureArray.controls['midName'].patchValue(''),
  //         this.insureArray.controls['lastName'].patchValue(''),
  //         this.insureArray.controls['gender'].patchValue(''),
  //         this.insureArray.controls['dob'].patchValue(''),
  //         this.insureArray.controls['maritalStatus'].patchValue(''),
  //         this.insureArray.controls['nationality'].patchValue(''),
  //         this.insureArray.controls['emailId'].patchValue(''),
  //         this.insureArray.controls['pan'].patchValue(''),
  //         this.insureArray.controls['aadhaarNo'].patchValue(''),
  //         this.insureArray.controls['fatherhusbandName'].patchValue(''),
  //         this.insureArray.controls['ageProofId'].patchValue(''),
  //         this.insureArray.controls['ageProofIdName'].patchValue(''),
  //         this.insureArray.controls['highestQualification'].patchValue(''),
  //         this.insureArray.controls['highestQualificationName'].patchValue(''),
  //         this.insureArray.controls['shighestQualificationName'].patchValue(''),
  //         this.insureArray.controls['otherQualification'].patchValue(''),
  //         this.insureArray.controls['mobileNo'].patchValue(''),
  //         this.insureArray.controls['isStaff'].patchValue(''),
  //         this.insureArray.controls['employeeCode'].patchValue(''),
  //         this.insureArray.controls['stitle'].patchValue(''),
  //         this.insureArray.controls['stitleName'].patchValue(''),
  //         this.insureArray.controls['sfirstName'].patchValue(''),
  //         this.insureArray.controls['smidName'].patchValue(''),
  //         this.insureArray.controls['slastName'].patchValue(''),
  //         this.insureArray.controls['sdob'].patchValue(''),
  //         this.insureArray.controls['semailId'].patchValue(''),
  //         this.insureArray.controls['smobileNo'].patchValue(''),
  //         this.insureArray.controls['isSmokerSpouse'].patchValue(''),
  //         // this.insureArray.controls['isStaffSpouse'].patchValue(''),
  //         this.insureArray.controls['currAddr1'].patchValue(''),
  //         this.insureArray.controls['currAddr2'].patchValue(''),
  //         this.insureArray.controls['currAddr3'].patchValue(''),
  //         this.insureArray.controls['currPincode'].patchValue(''),
  //         this.insureArray.controls['currState'].patchValue(''),
  //         this.insureArray.controls['currCity'].patchValue(''),
  //         this.insureArray.controls['perAddr1'].patchValue(''),
  //         this.insureArray.controls['perAddr2'].patchValue(''),
  //         this.insureArray.controls['perAddr3'].patchValue(''),
  //         this.insureArray.controls['perPincode'].patchValue(''),
  //         this.insureArray.controls['perState'].patchValue(''),
  //         this.insureArray.controls['perCity'].patchValue(''),
  //         this.insureArray.controls['isCurrPerAddrSame'].patchValue(''),
  //         this.insureArray.controls['employementTypeOther'].patchValue(''),
  //         this.insureArray.controls['employementType'].patchValue(''),
  //         this.insureArray.controls['employerName'].patchValue(''),
  //         this.insureArray.controls['natureduty'].patchValue(''),
  //         this.insureArray.controls['employerAddr'].patchValue(''),
  //         this.insureArray.controls['annualIncome'].patchValue(''),
  //         this.insureArray.controls['taxResidence'].patchValue('')
  //
  //   }
  // }

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
  // proposerDetails(stepper: MatStepper, value) {
  //   this.personalData = value;
  //   sessionStorage.stepper1Details = '';
  //   sessionStorage.stepper1Details = JSON.stringify(value);
  //   console.log(this.proposer, 'proposer');
  //   if (this.proposer.valid) {
  //     if (sessionStorage.proposerAge >= 18) {
  //       if (sessionStorage.proposerSpouseAge >= 18 || sessionStorage.proposerSpouseAge == undefined ) {
  //         stepper.next();
  //         // this.sameAsInsure();
  //
  //       }
  //       else {
  //         this.toastr.error('Spouse Age should be 18 or above');
  //
  //       }
  //     } else {
  //       this.toastr.error('Proposer Age should be 18 or above');
  //
  //     }
  //
  //   } else {
  //   this.toastr.error('please enter all the Mandatory field ');
  // }
  // }
  // Insure Details
  edelweissCustomerDetail(stepper: MatStepper, value) {
    sessionStorage.stepperCustomerDetails = '';
    sessionStorage.stepperCustomerDetails = JSON.stringify(value);
    console.log(this.customerDetails, 'customerDetails');
    console.log(this.customerDetails.valid, 'this.valid');
    // let dateErrorMsg = [];
    if (this.customerDetails.valid) {
      if (sessionStorage.customerAge >= 18) {


        stepper.next();
        this.topScroll();

      } else {
        this.toastr.error('Customer Age should be 18 or above');

      }
    } else {
      this.toastr.error('please enter all the Mandatory field');
    }

  }
  edelweissAddonDetail(stepper: MatStepper, value) {
    sessionStorage.getStepperaddon = '';
    sessionStorage.getStepperaddon = JSON.stringify(value);
    console.log(this.addon, 'addon');
    console.log(this.addon.valid, 'this.valid');
    // let dateErrorMsg = [];
    if (this.addon.valid  ) {
      // if(this.atpdError =='' && this.adbError=='' && this.ciError=='' && this.hcbdError==''){}
      // this.tittleread == true;
      this.insureArray.controls['title'].patchValue (this.customerDetails.controls['title'].value);
      this.insureArray.controls['firstName'].patchValue (this.customerDetails.controls['firstName'].value);
      this.insureArray.controls['lastName'].patchValue (this.customerDetails.controls['lastName'].value);
      this.insureArray.controls['dob'].patchValue (this.customerDetails.controls['dob'].value);
      this.insureArray.controls['maritalStatus'].patchValue (this.customerDetails.controls['maritalStatus'].value);
      this.insureArray.controls['emailId'].patchValue (this.customerDetails.controls['emailId'].value);
      this.insureArray.controls['mobileNo'].patchValue (this.customerDetails.controls['mobileNo'].value);
      this.insureArray.controls['annualIncome'].patchValue (this.customerDetails.controls['annualIncome'].value);
      // this.insureArray.controls['isSmoker'].patchValue (this.customerDetails.controls['isSmoker'].value);

      if(this.addon.controls['betterHalfBenefit'].value == 'Yes') {
        this.insureArray.controls['stitle'].patchValue(this.addon.controls['stitle'].value);
        this.insureArray.controls['sfirstName'].patchValue(this.addon.controls['sfirstName'].value);
        this.insureArray.controls['slastName'].patchValue(this.addon.controls['slastName'].value);
        this.insureArray.controls['sdob'].patchValue(this.addon.controls['sdob'].value);
        this.insureArray.controls['semailId'].patchValue(this.addon.controls['semailId'].value);
        this.insureArray.controls['isSmokerSpouse'].patchValue(this.addon.controls['isSmokerSpouse'].value);

        // stepper.next();
        // this.topScroll();
      }


      stepper.next();
      this.topScroll();
    } else {
      this.toastr.error('please enter all the Mandatory field');
    }

  }
  edelweissInsureDetails(stepper: MatStepper, value) {
    sessionStorage.stepper2Details = '';
    sessionStorage.stepper2Details = JSON.stringify(value);
    console.log(this.insureArray, 'insureArray');
    console.log(this.insureArray.valid, 'this.valid');
    // let dateErrorMsg = [];
    if (this.insureArray.valid) {
      console.log(sessionStorage.proposerAge,'sessionStorage.proposerAge......')
      if (sessionStorage.proposerAge >= 18) {
        if (sessionStorage.proposerSpouseAge >= 18 || sessionStorage.proposerSpouseAge == undefined) {
          stepper.next();
          this.topScroll();
        }
        else {
          this.toastr.error('Spouse Age should be 18 or above');

        }
      } else {
        this.toastr.error('Proposer Age should be 18 or above');

      }
    } else {
      this.toastr.error('please enter all the Mandatory field');
    }

  }

  // Medical Details
  medicalDetails(stepper: MatStepper, value) {
    sessionStorage.medicalQuesDetails = '';
    sessionStorage.medicalQuesDetails = JSON.stringify(value);
    console.log(this.medicalDetail, 'medicalDetail');
    console.log(this.medicalDetail.valid, 'this.valid');
    console.log(this.errortravelOutside,'errortravelOutside');
    if (this.medicalDetail.valid && (this.errortravelOutside == false && this.piloterror ==false && this.activityerror ==false && this.drugsInderror == false && this.alcoholInderror == false && this.tobaccoInderror == false  && this.consultDoctorInderror == false&& this.ECGInderror == false
        && this.admitInderror == false&& this.medicalTreatmenterror == false&& this.heartDieaseInderror == false && this.respiratoryDieaseInderror == false&& this.diabetesInderror == false&& this.kidneyDieaseInderror == false
        && this.digestiveDieaseInderror == false && this.cancerDieaseInderror == false&& this.tropicalDieaseInderror == false&& this.thyroidDieaseInderror == false&& this.bloodDieaseInderror == false&& this.nervousDieaseInderror == false && this.femaleDieaseInderror == false
        && this.muscleDieaseInderror == false&& this.receivedTreatment2error == false&& this.alcoholicInderror == false&& this.otherIllnessInderror == false&& this.deformityInderror == false&& this.receivedTreatment1error == false&& this.symptomsInderror == false&& this.pregnantInderror == false)) {
      console.log(this.errortravelOutside,'errortravelOutside');


      stepper.next();
      this.topScroll();
    }
  }

  //upload document valid
  uploadvalid() {
    if (this.documentDetail.valid) {
      console.log('11111111doc');
      this.window.open(this.requestedUrl,'_top')
      console.log('22222');
    } else {
      console.log('3333333333else');
      this.toastr.error('Please Upload the Document');
      console.log('444444444else');
    }
  }

  // nominee details
  nomineeDetailNext(stepper, value) {
    console.log(value,'value');
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
        nominee2ageval = false;

      } else {
        nominee2ageval = true;
      }
    }
    // console.log(sessionStorage.appointeeAge,' appointeeAge11232 ');
    //
    // console.log(nominee2ageval, 'nominee2ageval');
    // console.log(nomineeValid, 'nomineeVLID');
    // console.log(this.nomineeDetail.controls.itemsNominee.valid, 'this.nomineeDetail.controls');
    // console.log(this.nomineeDetails.valid,'this.nomineeDetails.valid')
    if (this.nomineeDetail.controls.itemsNominee.valid) {
      if (!nomineeValid || !nominee2ageval) {
        // console.log(!nomineeValid,'111nomineeValid');
        // console.log(nomineeValid,'2222nomineeValid');
        // console.log(!nominee2ageval,'nominee2ageval111');
        // console.log(nominee2ageval,'nominee2ageval33333333');

        if (appointeeAge ) {
          // console.log(appointeeAge,'appointeeAgeentry')
          if (appointeeAge2 || sessionStorage.appointeeAge2 == undefined ) {
            // console.log(appointeeAge2,'aappointeeAge2eentry')
            stepper.next();
            this.topScroll();
            // console.log(appointeeAge2,'falseApp');
          }
          else {
            this.toastr.error('Appointee2 Age should be greater than 18.');
            // console.log('1111');
          }
        } else {
          this.toastr.error('Appointee Age should be greater than 18.');
          // console.log('2222');
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
      console.log(this.bankDetail.valid, 'bankDetailvalid');
      this.proposal(stepper);

    }
  }

  nextDocUpload(stepper) {
    if(this.otpFalseError==false){
    stepper.next();
    this.topScroll();
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
  sumAssuredADBError(event:any) {
    if (this.addon.controls['sumAssuredADB'].value >= 100000 && this.addon.controls['sumAssuredADB'].value <= 10000000) {
      this.adbError ='';
    } else {
      this.adbError = 'SumAssured Accidental Death Benefit should be 100000 - 10000000';
    }
  }
  sumAssuredATPDError(event:any) {
    if (this.addon.controls['sumAssuredATPD'].value >= 100000 && this.addon.controls['sumAssuredATPD'].value <= 10000000) {
      this.atpdError ='';
    } else {
      this.atpdError = 'SumAssured Accidental Total and Permanent Disability should be 100000 - 10000000';
    }
  }
  sumAssuredCiError(event:any) {
    if (this.addon.controls['criticalsumAssured'].value >= 100000 && this.addon.controls['criticalsumAssured'].value <= 5000000) {
      this.ciError ='';
    } else {
      this.ciError = 'SumAssured Critical Illness should be 100000 - 5000000';
    }
  }
  sumAssuredHCBError(event:any) {
    if (this.addon.controls['sumAssuredHCB'].value >= 100000 && this.addon.controls['sumAssuredHCB'].value <= 600000) {
      this.hcbdError ='';
    } else {
      this.hcbdError = 'SumAssured Hospital Cash Benefit should be 100000 - 600000';
    }
  }
  // staffChange() {
  //
  //   if (this.proposer.controls['isStaff'].value == 'Yes') {
  //     this.proposer.controls['employeeCode'].patchValue(this.proposer.controls['employeeCode'].value);
  //
  //     this.proposer.controls['employeeCode'].setValidators([Validators.required]);
  //   } else {
  //     this.proposer.controls['employeeCode'].patchValue('');
  //
  //     this.proposer.controls['employeeCode'].setValidators(null);
  //
  //   }
  //   this.proposer.controls['employeeCode'].updateValueAndValidity();
  //
  // }

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

  titlespouse() {

    if (this.addon.controls['betterHalfBenefit'].value == 'Yes') {
      this.addon.controls['stitle'].patchValue(this.addon.controls['stitle'].value);

      this.addon.controls['stitle'].setValidators([Validators.required]);
    } else {
      this.addon.controls['stitle'].patchValue('');

      this.addon.controls['stitle'].setValidators(null);

    }
    this.addon.controls['stitle'].updateValueAndValidity();

  }
  firstnamespouse() {

    if (this.addon.controls['betterHalfBenefit'].value == 'Yes') {
      this.addon.controls['sfirstName'].patchValue(this.addon.controls['sfirstName'].value);

      this.addon.controls['sfirstName'].setValidators([Validators.required]);
    } else {
      this.addon.controls['sfirstName'].patchValue('');

      this.addon.controls['sfirstName'].setValidators(null);

    }
    this.addon.controls['sfirstName'].updateValueAndValidity();

  }
  lastnamespouse() {

    if (this.addon.controls['betterHalfBenefit'].value == 'Yes') {
      this.addon.controls['slastName'].patchValue(this.addon.controls['slastName'].value);

      this.addon.controls['slastName'].setValidators([Validators.required]);
    } else {
      this.addon.controls['slastName'].patchValue('');

      this.addon.controls['slastName'].setValidators(null);

    }
    this.addon.controls['slastName'].updateValueAndValidity();

  }
  dobspouse() {

    if (this.addon.controls['betterHalfBenefit'].value == 'Yes') {
      this.addon.controls['sdob'].patchValue(this.addon.controls['sdob'].value);

      this.addon.controls['sdob'].setValidators([Validators.required]);
    } else {
      this.addon.controls['sdob'].patchValue('');

      this.addon.controls['sdob'].setValidators(null);

    }
    this.addon.controls['sdob'].updateValueAndValidity();

  }
  emailspouse() {

    if (this.addon.controls['betterHalfBenefit'].value == 'Yes') {
      this.addon.controls['semailId'].patchValue(this.addon.controls['semailId'].value);

      this.addon.controls['semailId'].setValidators([Validators.required]);
    } else {
      this.addon.controls['semailId'].patchValue('');

      this.addon.controls['semailId'].setValidators(null);

    }
    this.addon.controls['semailId'].updateValueAndValidity();

  }
  smokerSpouse() {

    if (this.addon.controls['betterHalfBenefit'].value == 'Yes') {
      this.addon.controls['isSmokerSpouse'].patchValue(this.addon.controls['isSmokerSpouse'].value);

      this.addon.controls['isSmokerSpouse'].setValidators([Validators.required]);
    } else {
      this.addon.controls['isSmokerSpouse'].patchValue('');

      this.addon.controls['isSmokerSpouse'].setValidators(null);

    }
    this.addon.controls['isSmokerSpouse'].updateValueAndValidity();

  }


  uploadReq() {

    if (this.insureArray.controls['investing'].value == 'SELF') {
      this.documentDetail.controls['addressLA'].patchValue(this.documentDetail.controls['addressLA'].value);
      this.documentDetail.controls['incomeLA'].patchValue(this.documentDetail.controls['incomeLA'].value);
      this.documentDetail.controls['identityLA'].patchValue(this.documentDetail.controls['identityLA'].value);
      this.documentDetail.controls['ageLA'].patchValue(this.documentDetail.controls['ageLA'].value);
      this.documentDetail.controls['documentLA'].patchValue(this.documentDetail.controls['documentLA'].value);

      this.documentDetail.controls['addressLA'].setValidators([Validators.required]);
      this.documentDetail.controls['incomeLA'].setValidators([Validators.required]);
      this.documentDetail.controls['identityLA'].setValidators([Validators.required]);
      this.documentDetail.controls['ageLA'].setValidators([Validators.required]);
      this.documentDetail.controls['documentLA'].setValidators([Validators.required]);
    } else {
      this.documentDetail.controls['addressLA'].patchValue('');
      this.documentDetail.controls['incomeLA'].patchValue('');
      this.documentDetail.controls['identityLA'].patchValue('');
      this.documentDetail.controls['ageLA'].patchValue('');
      this.documentDetail.controls['documentLA'].patchValue('');

      this.documentDetail.controls['addressLA'].setValidators(null);
      this.documentDetail.controls['incomeLA'].setValidators(null);
      this.documentDetail.controls['identityLA'].setValidators(null);
      this.documentDetail.controls['ageLA'].setValidators(null);
      this.documentDetail.controls['documentLA'].setValidators(null);

    }
    this.documentDetail.controls['addressLA'].updateValueAndValidity();
    this.documentDetail.controls['incomeLA'].updateValueAndValidity();
    this.documentDetail.controls['identityLA'].updateValueAndValidity();
    this.documentDetail.controls['ageLA'].updateValueAndValidity();
    this.documentDetail.controls['documentLA'].updateValueAndValidity();

  }

  diseaseReq() {

    if (this.medicalDetail.controls['healthInformation'].value == true) {
      for (let i = 0; i < this.medicalDetail['controls'].medicalQuestions['controls'].length; i++) {

        if (i != 0) {
        }

        this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].disease.patchValue(this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].disease.value);
        this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].datediagnois.patchValue(this.datepipe.transform(this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].datediagnois.value, 'y-MM-dd'));
        this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].treatment.patchValue(this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].treatment.value);
        this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].dosage.patchValue(this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].dosage.value);
        this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].doctor.patchValue(this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].doctor.value);
        this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].datefollowup.patchValue(this.datepipe.transform(this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].datefollowup.value, 'y-MM-dd'));
        this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].anycomplications.patchValue(this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].anycomplications.value);
        this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].remarks.patchValue(this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].remarks.value);

        this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].disease.setValidators([Validators.required]);
        this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].datediagnois.setValidators([Validators.required]);
        this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].treatment.setValidators([Validators.required]);
        this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].dosage.setValidators([Validators.required]);
        this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].doctor.setValidators([Validators.required]);
        this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].datefollowup.setValidators([Validators.required]);
        this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].anycomplications.setValidators([Validators.required]);
        this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].remarks.setValidators([Validators.required]);
      }

    } else if (this.medicalDetail.controls['healthInformation'].value == false) {
      for (let i = 0; i < this.medicalDetail['controls'].medicalQuestions['controls'].length; i++) {

        if (i != 0) {
        }
        this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].disease.patchValue('');
        this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].datediagnois.patchValue('');
        this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].treatment.patchValue('');
        this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].dosage.patchValue('');
        this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].doctor.patchValue('');
        this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].datefollowup.patchValue('');
        this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].anycomplications.patchValue('');
        this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].remarks.patchValue('');

        this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].disease.setValidators(null);
        this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].datediagnois.setValidators(null);
        this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].treatment.setValidators(null);
        this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].dosage.setValidators(null);
        this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].doctor.setValidators(null);
        this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].datefollowup.setValidators(null);
        this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].anycomplications.setValidators(null);
        this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].remarks.setValidators(null);
      }


    }
    for (let i = 0; i < this.medicalDetail['controls'].medicalQuestions['controls'].length; i++) {

      if (i != 0) {
      }
      this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].disease.updateValueAndValidity();
      this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].datediagnois.updateValueAndValidity();
      this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].treatment.updateValueAndValidity();
      this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].dosage.updateValueAndValidity();
      this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].doctor.updateValueAndValidity();
      this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].datefollowup.updateValueAndValidity();
      this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].anycomplications.updateValueAndValidity();
      this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].remarks.updateValueAndValidity();


    }
  }

  // changeMaritalReq() {
  //
  //   if (this.proposer.controls['maritalStatus'].value == 'M') {
  //     this.proposer.controls['stitle'].patchValue(this.proposer.controls['stitle'].value);
  //     this.proposer.controls['sfirstName'].patchValue(this.proposer.controls['sfirstName'].value);
  //     this.proposer.controls['smidName'].patchValue(this.proposer.controls['smidName'].value);
  //     this.proposer.controls['slastName'].patchValue(this.proposer.controls['slastName'].value);
  //     this.proposer.controls['sdob'].patchValue(this.proposer.controls['sdob'].value);
  //     this.proposer.controls['semailId'].patchValue(this.proposer.controls['semailId'].value);
  //     this.proposer.controls['smobileNo'].patchValue(this.proposer.controls['smobileNo'].value);
  //     this.proposer.controls['isSmokerSpouse'].patchValue(this.proposer.controls['isSmokerSpouse'].value);
  //     this.proposer.controls['isStaffSpouse'].patchValue(this.proposer.controls['isStaffSpouse'].value);
  //     this.proposer.controls['relationSpouseProposer'].patchValue(this.proposer.controls['relationSpouseProposer'].value);
  //
  //     this.proposer.controls['stitle'].setValidators([Validators.required]);
  //     this.proposer.controls['sfirstName'].setValidators([Validators.required]);
  //     this.proposer.controls['smidName'].setValidators(null);
  //     this.proposer.controls['slastName'].setValidators([Validators.required]);
  //     this.proposer.controls['sdob'].setValidators([Validators.required]);
  //     this.proposer.controls['semailId'].setValidators([Validators.required]);
  //     this.proposer.controls['smobileNo'].setValidators([Validators.required]);
  //     this.proposer.controls['isSmokerSpouse'].setValidators([Validators.required]);
  //     this.proposer.controls['isStaffSpouse'].setValidators([Validators.required]);
  //     this.proposer.controls['relationSpouseProposer'].setValidators([Validators.required]);
  //   } else {
  //     this.proposer.controls['stitle'].patchValue('');
  //     this.proposer.controls['sfirstName'].patchValue('');
  //     this.proposer.controls['smidName'].patchValue('');
  //     this.proposer.controls['slastName'].patchValue('');
  //     this.proposer.controls['sdob'].patchValue('');
  //     this.proposer.controls['semailId'].patchValue('');
  //     this.proposer.controls['smobileNo'].patchValue('');
  //     this.proposer.controls['isSmokerSpouse'].patchValue('No');
  //     this.proposer.controls['isStaffSpouse'].patchValue('No');
  //     this.proposer.controls['relationSpouseProposer'].patchValue('3');
  //
  //     this.proposer.controls['stitle'].setValidators(null);
  //     this.proposer.controls['sfirstName'].setValidators(null);
  //     this.proposer.controls['smidName'].setValidators(null);
  //     this.proposer.controls['slastName'].setValidators(null);
  //     this.proposer.controls['sdob'].setValidators(null);
  //     this.proposer.controls['semailId'].setValidators(null);
  //     this.proposer.controls['smobileNo'].setValidators(null);
  //     this.proposer.controls['isSmokerSpouse'].setValidators(null);
  //     this.proposer.controls['isStaffSpouse'].setValidators(null);
  //     this.proposer.controls['relationSpouseProposer'].setValidators(null);
  //
  //   }
  //   this.proposer.controls['employeeCode'].updateValueAndValidity();
  //   this.proposer.controls['stitle'].updateValueAndValidity();
  //   this.proposer.controls['sfirstName'].updateValueAndValidity();
  //   this.proposer.controls['smidName'].updateValueAndValidity();
  //   this.proposer.controls['slastName'].updateValueAndValidity();
  //   this.proposer.controls['sdob'].updateValueAndValidity();
  //   this.proposer.controls['semailId'].updateValueAndValidity();
  //   this.proposer.controls['smobileNo'].updateValueAndValidity();
  //   this.proposer.controls['isSmokerSpouse'].updateValueAndValidity();
  //   this.proposer.controls['isStaffSpouse'].updateValueAndValidity();
  //   this.proposer.controls['relationSpouseProposer'].updateValueAndValidity();
  //
  // }

  changeMaritalInsuReq() {

    if (this.addon.controls['betterHalfBenefit'].value == 'Yes') {
      // this.addon.controls['stitle'].patchValue(this.addon.controls['stitle'].value);
      // // this.insureArray.controls['stitleName'].patchValue(this.insureArray.controls['stitleName'].value);
      // this.addon.controls['sfirstName'].patchValue(this.addon.controls['sfirstName'].value);
      // // this.insureArray.controls['stitleName'].patchValue(this.insureArray.controls['stitleName'].value);
      // // this.addon.controls['smidName'].patchValue(this.addon.controls['smidName'].value);
      // this.addon.controls['slastName'].patchValue(this.addon.controls['slastName'].value);
      // this.addon.controls['sdob'].patchValue(this.addon.controls['sdob'].value);
      // this.addon.controls['semailId'].patchValue(this.addon.controls['semailId'].value);
      // // this.insureArray.controls['smobileNo'].patchValue(this.insureArray.controls['smobileNo'].value);
      // this.addon.controls['isSmokerSpouse'].patchValue(this.addon.controls['isSmokerSpouse'].value);
      // // // this.insureArray.controls['isStaffSpouse'].patchValue(this.insureArray.controls['isStaffSpouse'].value);
      // // this.insureArray.controls['sppan'].patchValue(this.insureArray.controls['sppan'].value);
      // // this.insureArray.controls['saadhaarNo'].patchValue(this.insureArray.controls['saadhaarNo'].value);
      // // this.insureArray.controls['sfatherhusbandName'].patchValue(this.insureArray.controls['sfatherhusbandName'].value);
      // // this.insureArray.controls['smotherMaidName'].patchValue(this.insureArray.controls['smotherMaidName'].value);
      // // this.insureArray.controls['sageProofId'].patchValue(this.insureArray.controls['sageProofId'].value);
      // // this.insureArray.controls['shighestQualification'].patchValue(this.insureArray.controls['shighestQualification'].value);
      // // this.insureArray.controls['sotherQualification'].patchValue(this.insureArray.controls['sotherQualification'].value);
      // // this.insureArray.controls['scurrAddr1'].patchValue(this.insureArray.controls['scurrAddr1'].value);
      // // this.insureArray.controls['scurrAddr2'].patchValue(this.insureArray.controls['scurrAddr2'].value);
      // // this.insureArray.controls['scurrAddr3'].patchValue(this.insureArray.controls['scurrAddr3'].value);
      // // this.insureArray.controls['scurrCity'].patchValue(this.insureArray.controls['scurrCity'].value);
      // // this.insureArray.controls['scurrPincode'].patchValue(this.insureArray.controls['scurrPincode'].value);
      // // this.insureArray.controls['scurrState'].patchValue(this.insureArray.controls['scurrState'].value);
      // // this.insureArray.controls['sperAddr1'].patchValue(this.insureArray.controls['sperAddr1'].value);
      // // this.insureArray.controls['sperAddr2'].patchValue(this.insureArray.controls['sperAddr2'].value);
      // // this.insureArray.controls['sperAddr3'].patchValue(this.insureArray.controls['sperAddr3'].value);
      // // this.insureArray.controls['sperCity'].patchValue(this.insureArray.controls['sperCity'].value);
      // // this.insureArray.controls['sperPincode'].patchValue(this.insureArray.controls['sperPincode'].value);
      // // this.insureArray.controls['sperState'].patchValue(this.insureArray.controls['sperState'].value);
      // // this.insureArray.controls['sheightFeets'].patchValue(this.insureArray.controls['sheightFeets'].value);
      // // this.insureArray.controls['sheightInches'].patchValue(this.insureArray.controls['sheightInches'].value);
      // // this.insureArray.controls['sweight'].patchValue(this.insureArray.controls['sweight'].value);
      // // this.insureArray.controls['shasWeightChanged'].patchValue(this.insureArray.controls['shasWeightChanged'].value);
      // // this.insureArray.controls['sweightChangedreason'].patchValue(this.insureArray.controls['sweightChangedreason'].value);
      // this.addon.controls['betterHalfsumAssured'].patchValue(this.addon.controls['betterHalfsumAssured'].value);
      // // this.insureArray.controls['relationSpouseInsurer'].patchValue(this.insureArray.controls['relationSpouseInsurer'].value);

      this.addon.controls['stitle'].setValidators([Validators.required]);
      // this.addon.controls['stitleName'].setValidators([Validators.required]);
      this.addon.controls['sfirstName'].setValidators([Validators.required]);
      this.addon.controls['stitleName'].setValidators([Validators.required]);
      // this.addon.controls['smidName'].setValidators(null);
      this.addon.controls['slastName'].setValidators([Validators.required]);
      this.addon.controls['sdob'].setValidators([Validators.required]);
      this.addon.controls['semailId'].setValidators([Validators.required]);
      // this.addon.controls['smobileNo'].setValidators([Validators.required]);
      this.addon.controls['isSmokerSpouse'].setValidators([Validators.required]);
      // this.insureArray.controls['isStaffSpouse'].setValidators([Validators.required]);
      // this.insureArray.controls['sppan'].setValidators([Validators.required]);
      // this.insureArray.controls['saadhaarNo'].setValidators([Validators.required]);
      // this.insureArray.controls['sfatherhusbandName'].setValidators([Validators.required]);
      // this.insureArray.controls['smotherMaidName'].setValidators([Validators.required]);
      // this.insureArray.controls['sageProofId'].setValidators([Validators.required]);
      // this.insureArray.controls['shighestQualification'].setValidators([Validators.required]);
      // this.insureArray.controls['sotherQualification'].setValidators([Validators.required]);
      // this.insureArray.controls['scurrAddr1'].setValidators([Validators.required]);
      // this.insureArray.controls['scurrAddr2'].setValidators([Validators.required]);
      // this.insureArray.controls['scurrAddr3'].setValidators([Validators.required]);
      // this.insureArray.controls['scurrCity'].setValidators([Validators.required]);
      // this.insureArray.controls['scurrPincode'].setValidators([Validators.required]);
      // this.insureArray.controls['scurrState'].setValidators([Validators.required]);
      // this.insureArray.controls['sperAddr1'].setValidators([Validators.required]);
      // this.insureArray.controls['sperAddr2'].setValidators([Validators.required]);
      // this.insureArray.controls['sperAddr3'].setValidators([Validators.required]);
      // this.insureArray.controls['sperCity'].setValidators([Validators.required]);
      // this.insureArray.controls['sperPincode'].setValidators([Validators.required]);
      // this.insureArray.controls['sperState'].setValidators([Validators.required]);
      // this.insureArray.controls['sheightFeets'].setValidators([Validators.required]);
      // this.insureArray.controls['sheightInches'].setValidators([Validators.required]);
      // this.insureArray.controls['sweight'].setValidators([Validators.required]);
      // this.insureArray.controls['shasWeightChanged'].setValidators([Validators.required]);
      // this.insureArray.controls['sweightChangedreason'].setValidators([Validators.required]);
      this.addon.controls['betterHalfsumAssured'].setValidators([Validators.required]);
      // this.insureArray.controls['relationSpouseInsurer'].setValidators([Validators.required]);
    } else if(this.addon.controls['betterHalfBenefit'].value == 'No'){
      // alert('innn')
      this.addon.controls['stitle'].patchValue('');
      this.addon.controls['stitleName'].patchValue('');
      this.addon.controls['sfirstName'].patchValue('');
      // this.addon.controls['smidName'].patchValue('');
      this.addon.controls['slastName'].patchValue('');
      this.addon.controls['sdob'].patchValue('');
      this.addon.controls['semailId'].patchValue('');
      // this.insureArray.controls['smobileNo'].patchValue('');
      this.addon.controls['isSmokerSpouse'].patchValue('No');
      // this.insureArray.controls['isStaffSpouse'].patchValue('No');
      // this.insureArray.controls['sppan'].patchValue('');
      // this.insureArray.controls['saadhaarNo'].patchValue('');
      // this.insureArray.controls['sfatherhusbandName'].patchValue('');
      // this.insureArray.controls['smotherMaidName'].patchValue('');
      // this.insureArray.controls['sageProofId'].patchValue('');
      // this.insureArray.controls['shighestQualification'].patchValue('');
      // this.insureArray.controls['sotherQualification'].patchValue('');
      // this.insureArray.controls['scurrAddr1'].patchValue('');
      // this.insureArray.controls['scurrAddr2'].patchValue('');
      // this.insureArray.controls['scurrAddr3'].patchValue('');
      // this.insureArray.controls['scurrCity'].patchValue('');
      // this.insureArray.controls['scurrPincode'].patchValue('');
      // this.insureArray.controls['scurrState'].patchValue('');
      // this.insureArray.controls['sperAddr1'].patchValue('');
      // this.insureArray.controls['sperAddr2'].patchValue('');
      // this.insureArray.controls['sperAddr3'].patchValue('');
      // this.insureArray.controls['sperCity'].patchValue('');
      // this.insureArray.controls['sperPincode'].patchValue('');
      // this.insureArray.controls['sperState'].patchValue('');
      // this.insureArray.controls['sheightFeets'].patchValue('');
      // this.insureArray.controls['sheightInches'].patchValue('');
      // this.insureArray.controls['sweight'].patchValue('');
      // this.insureArray.controls['shasWeightChanged'].patchValue('');
      // this.insureArray.controls['sweightChangedreason'].patchValue('');
      this.addon.controls['betterHalfsumAssured'].patchValue('');
      // this.insureArray.controls['relationSpouseInsurer'].patchValue('3');

      this.addon.controls['stitle'].setValidators(null);
      this.addon.controls['stitleName'].setValidators(null);
      this.addon.controls['sfirstName'].setValidators(null);
      // this.addon.controls['smidName'].setValidators(null);
      this.addon.controls['slastName'].setValidators(null);
      this.addon.controls['sdob'].setValidators(null);
      this.addon.controls['semailId'].setValidators(null);
      // this.addon.controls['smobileNo'].setValidators(null);
      this.addon.controls['isSmokerSpouse'].setValidators(null);
      // this.insureArray.controls['isStaffSpouse'].setValidators(null);
      // this.insureArray.controls['sppan'].setValidators(null);
      // this.insureArray.controls['saadhaarNo'].setValidators(null);
      // this.insureArray.controls['sfatherhusbandName'].setValidators(null);
      // this.insureArray.controls['smotherMaidName'].setValidators(null);
      // this.insureArray.controls['sageProofId'].setValidators(null);
      // this.insureArray.controls['shighestQualification'].setValidators(null);
      // this.insureArray.controls['sotherQualification'].setValidators(null);
      // this.insureArray.controls['scurrAddr1'].setValidators(null);
      // this.insureArray.controls['scurrAddr2'].setValidators(null);
      // this.insureArray.controls['scurrAddr3'].setValidators(null);
      // this.insureArray.controls['scurrCity'].setValidators(null);
      // this.insureArray.controls['scurrPincode'].setValidators(null);
      // this.insureArray.controls['scurrState'].setValidators(null);
      // this.insureArray.controls['sperAddr1'].setValidators(null);
      // this.insureArray.controls['sperAddr2'].setValidators(null);
      // this.insureArray.controls['sperAddr3'].setValidators(null);
      // this.insureArray.controls['sperCity'].setValidators(null);
      // this.insureArray.controls['sperPincode'].setValidators(null);
      // this.insureArray.controls['sperState'].setValidators(null);
      // this.insureArray.controls['sheightFeets'].setValidators(null);
      // this.insureArray.controls['sheightInches'].setValidators(null);
      // this.insureArray.controls['sweight'].setValidators(null);
      // this.insureArray.controls['shasWeightChanged'].setValidators(null);
      // this.insureArray.controls['sweightChangedreason'].setValidators(null);
      this.addon.controls['betterHalfsumAssured'].setValidators(null);
      // this.insureArray.controls['relationSpouseInsurer'].setValidators(null);

    }
    // this.insureArray.controls['employeeCode'].updateValueAndValidity();
    this.addon.controls['stitle'].updateValueAndValidity();
    this.addon.controls['stitleName'].updateValueAndValidity();
    this.addon.controls['sfirstName'].updateValueAndValidity();
    // this.addon.controls['stitleName'].updateValueAndValidity();
    // this.addon.controls['smidName'].updateValueAndValidity();
    this.addon.controls['slastName'].updateValueAndValidity();
    this.addon.controls['sdob'].updateValueAndValidity();
    this.addon.controls['semailId'].updateValueAndValidity();
    // this.addon.controls['smobileNo'].updateValueAndValidity();
    this.addon.controls['isSmokerSpouse'].updateValueAndValidity();
    this.addon.controls['betterHalfsumAssured'].updateValueAndValidity();

    // this.insureArray.controls['isStaffSpouse'].updateValueAndValidity();
    // this.insureArray.controls['sppan'].updateValueAndValidity();
    // this.insureArray.controls['saadhaarNo'].updateValueAndValidity();
    // this.insureArray.controls['sfatherhusbandName'].updateValueAndValidity();
    // this.insureArray.controls['smotherMaidName'].updateValueAndValidity();
    // this.insureArray.controls['sageProofId'].updateValueAndValidity();
    // this.insureArray.controls['shighestQualification'].updateValueAndValidity();
    // this.insureArray.controls['sotherQualification'].updateValueAndValidity();
    // this.insureArray.controls['scurrAddr1'].updateValueAndValidity();
    // this.insureArray.controls['scurrAddr2'].updateValueAndValidity();
    // this.insureArray.controls['scurrAddr3'].updateValueAndValidity();
    // this.insureArray.controls['scurrCity'].updateValueAndValidity();
    // this.insureArray.controls['scurrPincode'].updateValueAndValidity();
    // this.insureArray.controls['scurrState'].updateValueAndValidity();
    // this.insureArray.controls['sperAddr1'].updateValueAndValidity();
    // this.insureArray.controls['sperAddr2'].updateValueAndValidity();
    // this.insureArray.controls['sperAddr3'].updateValueAndValidity();
    // this.insureArray.controls['sperCity'].updateValueAndValidity();
    // this.insureArray.controls['sperPincode'].updateValueAndValidity();
    // this.insureArray.controls['sperState'].updateValueAndValidity();
    // this.insureArray.controls['sheightFeets'].updateValueAndValidity();
    // this.insureArray.controls['sheightInches'].updateValueAndValidity();
    // this.insureArray.controls['sweight'].updateValueAndValidity();
    // this.insureArray.controls['shasWeightChanged'].updateValueAndValidity();
    // this.insureArray.controls['sweightChangedreason'].updateValueAndValidity();
    // this.insureArray.controls['relationSpouseInsurer'].updateValueAndValidity();

  }

  // staffSpouseChange() {
  //
  //   if (this.proposer.controls['isStaffSpouse'].value == 'Yes') {
  //     this.proposer.controls['employeeCodeSpouse'].patchValue(this.proposer.controls['employeeCodeSpouse'].value);
  //
  //     this.proposer.controls['employeeCodeSpouse'].setValidators([Validators.required]);
  //   } else {
  //     this.proposer.controls['employeeCodeSpouse'].patchValue('');
  //
  //     this.proposer.controls['employeeCodeSpouse'].setValidators(null);
  //
  //   }
  //   this.proposer.controls['employeeCodeSpouse'].updateValueAndValidity();
  //
  // }


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
  // othrhighQualify() {
  //
  //   if (this.proposer.controls['highestQualification'].value == '8') {
  //     this.proposer.controls['otherQualification'].patchValue(this.proposer.controls['otherQualification'].value);
  //
  //     this.proposer.controls['otherQualification'].setValidators([Validators.required]);
  //   } else {
  //     this.proposer.controls['otherQualification'].patchValue('');
  //
  //     this.proposer.controls['otherQualification'].setValidators(null);
  //
  //   }
  //   this.proposer.controls['otherQualification'].updateValueAndValidity();
  //
  // }

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

  othrhighQualify2() {

    if (this.insureArray.controls['shighestQualification'].value == '8') {
      this.insureArray.controls['sotherQualification'].patchValue(this.insureArray.controls['sotherQualification'].value);

      this.insureArray.controls['sotherQualification'].setValidators([Validators.required]);
    } else {
      this.insureArray.controls['sotherQualification'].patchValue('');

      this.insureArray.controls['sotherQualification'].setValidators(null);

    }
    this.insureArray.controls['sotherQualification'].updateValueAndValidity();

  }

  // employmentTypereq() {
  //
  //   if (this.proposer.controls['employementType'].value == '9') {
  //     this.proposer.controls['employementTypeOther'].patchValue(this.proposer.controls['employementTypeOther'].value);
  //
  //     this.proposer.controls['employementTypeOther'].setValidators([Validators.required]);
  //   } else {
  //     this.proposer.controls['employementTypeOther'].patchValue('');
  //
  //     this.proposer.controls['employementTypeOther'].setValidators(null);
  //
  //   }
  //   this.proposer.controls['employementTypeOther'].updateValueAndValidity();
  //
  // }



  travelOutside(){

    if(this.medicalDetail.controls['travelOutsideIndia'].value == '') {
      this.errortravelOutside = true;
      this.errortravelOutside = 'Field is Mandatory';
    }else if(this.medicalDetail.controls['travelOutsideIndia'].value != ''){
      this.errortravelOutside=false;
      this.errortravelOutside= '';
    }
    if(this.medicalDetail.controls['pilot'].value == '') {
      this.piloterror=true;
      this.piloterror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['pilot'].value != ''){
      this.piloterror=false;
      this.piloterror= '';
    }
    if(this.medicalDetail.controls['activity'].value == '') {
      this.activityerror=true;
      this.activityerror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['activity'].value != ''){
      this.activityerror=false;
      this.activityerror= '';
    }
    if(this.medicalDetail.controls['drugsInd'].value == '') {
      this.drugsInderror=true;
      this.drugsInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['drugsInd'].value != ''){
      this.drugsInderror=false;
      this.drugsInderror= '';
    }
    if(this.medicalDetail.controls['alcoholInd'].value == '') {
      this.alcoholInderror=true;
      this.alcoholInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['alcoholInd'].value != ''){
      this.alcoholInderror=false;
      this.alcoholInderror= '';
    }
    if(this.medicalDetail.controls['tobaccoInd'].value == '') {
      this.tobaccoInderror=true;
      this.tobaccoInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['tobaccoInd'].value != ''){
      this.tobaccoInderror=false;
      this.tobaccoInderror= '';
    }
    if(this.medicalDetail.controls['consultDoctorInd'].value == '') {
      this.consultDoctorInderror=true;
      this.consultDoctorInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['consultDoctorInd'].value != ''){
      this.consultDoctorInderror=false;
      this.consultDoctorInderror= '';
    }
    if(this.medicalDetail.controls['ECGInd'].value == '') {
      this.ECGInderror=true;
      this.ECGInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['ECGInd'].value != ''){
      this.ECGInderror=false;
      this.ECGInderror= '';
    }
    if(this.medicalDetail.controls['admitInd'].value == '') {
      this.admitInderror=true;
      this.admitInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['admitInd'].value != ''){
      this.admitInderror=false;
      this.admitInderror= '';
    }
    if(this.medicalDetail.controls['medicalTreatment'].value == '') {
      this.medicalTreatmenterror=true;
      this.medicalTreatmenterror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['medicalTreatment'].value != ''){
      this.medicalTreatmenterror=false;
      this.medicalTreatmenterror= '';
    }
    if(this.medicalDetail.controls['heartDieaseInd'].value == '') {
      this.heartDieaseInderror=true;
      this.heartDieaseInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['heartDieaseInd'].value != ''){
      this.heartDieaseInderror=false;
      this.heartDieaseInderror= '';
    }
    if(this.medicalDetail.controls['respiratoryDieaseInd'].value == '') {
      this.respiratoryDieaseInderror=true;
      this.respiratoryDieaseInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['respiratoryDieaseInd'].value != ''){
      this.respiratoryDieaseInderror=false;
      this.respiratoryDieaseInderror= '';
    }
    if(this.medicalDetail.controls['diabetesInd'].value == '') {
      this.diabetesInderror=true;
      this.diabetesInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['diabetesInd'].value != ''){
      this.diabetesInderror=false;
      this.diabetesInderror= '';
    }
    if(this.medicalDetail.controls['kidneyDieaseInd'].value == '') {
      this.kidneyDieaseInderror=true;
      this.kidneyDieaseInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['kidneyDieaseInd'].value != ''){
      this.kidneyDieaseInderror=false;
      this.kidneyDieaseInderror= '';
    }
    if(this.medicalDetail.controls['digestiveDieaseInd'].value == '') {
      this.digestiveDieaseInderror=true;
      this.digestiveDieaseInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['digestiveDieaseInd'].value != ''){
      this.digestiveDieaseInderror=false;
      this.digestiveDieaseInderror= '';
    }
    if(this.medicalDetail.controls['cancerDieaseInd'].value == '') {
      this.cancerDieaseInderror=true;
      this.cancerDieaseInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['cancerDieaseInd'].value != ''){
      this.cancerDieaseInderror=false;
      this.cancerDieaseInderror= '';
    }
    if(this.medicalDetail.controls['tropicalDieaseInd'].value == '') {
      this.tropicalDieaseInderror=true;
      this.tropicalDieaseInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['tropicalDieaseInd'].value != ''){
      this.tropicalDieaseInderror=false;
      this.tropicalDieaseInderror= '';
    }
    if(this.medicalDetail.controls['thyroidDieaseInd'].value == '') {
      this.thyroidDieaseInderror=true;
      this.thyroidDieaseInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['thyroidDieaseInd'].value != ''){
      this.thyroidDieaseInderror=false;
      this.thyroidDieaseInderror= '';
    }
    if(this.medicalDetail.controls['bloodDieaseInd'].value == '') {
      this.bloodDieaseInderror=true;
      this.bloodDieaseInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['bloodDieaseInd'].value != ''){
      this.bloodDieaseInderror=false;
      this.bloodDieaseInderror= '';
    }
    if(this.medicalDetail.controls['nervousDieaseInd'].value == '') {
      this.nervousDieaseInderror=true;
      this.nervousDieaseInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['nervousDieaseInd'].value != ''){
      this.nervousDieaseInderror=false;
      this.nervousDieaseInderror= '';
    }
    if(this.medicalDetail.controls['femaleDieaseInd'].value == '') {
      this.femaleDieaseInderror=true;
      this.femaleDieaseInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['femaleDieaseInd'].value != ''){
      this.femaleDieaseInderror=false;
      this.femaleDieaseInderror= '';
    }
    if(this.medicalDetail.controls['muscleDieaseInd'].value == '') {
      this.muscleDieaseInderror=true;
      this.muscleDieaseInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['muscleDieaseInd'].value != ''){
      this.muscleDieaseInderror=false;
      this.muscleDieaseInderror= '';
    }
    if(this.medicalDetail.controls['receivedTreatment2'].value == '') {
      this.receivedTreatment2error=true;
      this.receivedTreatment2error= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['receivedTreatment2'].value != ''){
      this.receivedTreatment2error=false;
      this.receivedTreatment2error= '';
    }
    if(this.medicalDetail.controls['alcoholicInd'].value == '') {
      this.alcoholicInderror=true;
      this.alcoholicInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['alcoholicInd'].value != ''){
      this.alcoholicInderror=false;
      this.alcoholicInderror= '';
    }
    if(this.medicalDetail.controls['otherIllnessInd'].value == '') {
      this.otherIllnessInderror=true;
      this.otherIllnessInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['otherIllnessInd'].value != ''){
      this.otherIllnessInderror=false;
      this.otherIllnessInderror= '';
    }
    if(this.medicalDetail.controls['deformityInd'].value == '') {
      this.deformityInderror=true;
      this.deformityInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['deformityInd'].value != ''){
      this.deformityInderror=false;
      this.deformityInderror= '';
    }
    if(this.medicalDetail.controls['receivedTreatment1'].value == '') {
      this.receivedTreatment1error=true;
      this.receivedTreatment1error= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['receivedTreatment1'].value != ''){
      this.receivedTreatment1error=false;
      this.receivedTreatment1error= '';
    }
    if(this.medicalDetail.controls['symptomsInd'].value == '') {
      this.symptomsInderror=true;
      this.symptomsInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['symptomsInd'].value != ''){
      this.symptomsInderror=false;
      this.symptomsInderror= '';
    }
    if(this.medicalDetail.controls['pregnantInd'].value == '') {
      this.pregnantInderror=true;
      this.pregnantInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['pregnantInd'].value != ''){
      this.pregnantInderror=false;
      this.pregnantInderror= '';
    }

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

  shasweight() {

    if (this.insureArray.controls['shasWeightChanged'].value == 'Gained' || this.insureArray.controls['shasWeightChanged'].value == 'Lost') {
      this.insureArray.controls['sinbetweenweight'].patchValue(this.insureArray.controls['sinbetweenweight'].value);
      this.insureArray.controls['sweightChangedreason'].patchValue(this.insureArray.controls['sweightChangedreason'].value);

      this.insureArray.controls['sinbetweenweight'].setValidators([Validators.required]);
      this.insureArray.controls['sweightChangedreason'].setValidators([Validators.required]);
    } else {
      this.insureArray.controls['sinbetweenweight'].patchValue('');
      this.insureArray.controls['sweightChangedreason'].patchValue('');

      this.insureArray.controls['sinbetweenweight'].setValidators(null);
      this.insureArray.controls['sweightChangedreason'].setValidators(null);

    }
    this.insureArray.controls['sinbetweenweight'].updateValueAndValidity();
    this.insureArray.controls['sweightChangedreason'].updateValueAndValidity();

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
  // otpVal(stepper) {
  //
  //     const data = {
  //         // 'platform': 'web',
  //         // 'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
  //         // 'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
  //         // 'policy_id': getEnquiryDetials.policy_id,
  //         // 'otp': this.otpCode
  //         "user_id": this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
  //         "role_id": this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
  //         "pos_status": this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
  //         "platform": "web",
  //         "product_id": this.lifePremiumList.product_id,
  //         "policy_id": this.getEnquiryDetials.policy_id,
  //         "transaction_id": this.summaryData.receipt_no,
  //         "otp":this.otpCode
  //     }
  //     this.termService.edelweissOTPValidation(data).subscribe(
  //         (successData) => {
  //             this.otpValidationListSuccess(successData,stepper);
  //
  //         },
  //         (error) => {
  //             this.otpValidationListFailure(error);
  //         }
  //     );
  // }
  //
  // public otpValidationListSuccess(successData,stepper) {
  //     if (successData.IsSuccess) {
  //         this.toastr.success(successData.ResponseObject);
  //         // this.dialogRef.close(true);
  //         stepper.next();
  //         this.topScroll();
  //     } else {
  //         this.toastr.error(successData.ErrorObject);
  //     }
  // }
  //
  // public otpValidationListFailure(error) {
  // }

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
      console.log(this.bankDetail.controls['existingInsuranceInd'].value ,'value');

      for (let i=0; i < this.bankDetail['controls'].existingInsurance['controls'].length; i++) {
        // if (i != 0) {
        // }
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].policyNo.patchValue(this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].policyNo.value );
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].companyName.patchValue(this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].companyName.value );
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].yearOfIssue.patchValue(this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].yearOfIssue.value );
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].sumAssured.patchValue(this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].sumAssured.value );
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].annualizedPremium.patchValue(this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].annualizedPremium.value );
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].policyStatus.patchValue(this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].policyStatus.value );
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].acceptanceTerm.patchValue(this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].acceptanceTerm.value );

        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].policyNo.setValidators([Validators.required]);
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].companyName.setValidators([Validators.required]);
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].yearOfIssue.setValidators([Validators.required]);
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].sumAssured.setValidators([Validators.required]);
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].annualizedPremium.setValidators([Validators.required]);
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].policyStatus.setValidators([Validators.required]);
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].acceptanceTerm.setValidators([Validators.required]);
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
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].acceptanceTerm.patchValue('');

        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].policyNo.setValidators(null);
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].companyName.setValidators(null);
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].yearOfIssue.setValidators(null);
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].sumAssured.setValidators(null);
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].annualizedPremium.setValidators(null);
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].policyStatus.setValidators(null);
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].acceptanceTerm.setValidators(null);
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
      this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].acceptanceTerm.updateValueAndValidity();
    }


  }


  appointeeAgeValid(event: any, i) {
    if (this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].showAppointee.value == true ) {
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aName.patchValue(this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aName.value );
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].appointeeDob.patchValue(this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].appointeeDob.value );
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aGender.patchValue(this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aGender.value );
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].relationToInsured.patchValue(this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].relationToInsured.value );




      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aName.setValidators([Validators.required]);
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].appointeeDob.setValidators([Validators.required]);
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aGender.setValidators([Validators.required]);
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].relationToInsured.setValidators([Validators.required]);

    } else {
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aName.patchValue(' ');
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].appointeeDob.patchValue(' ');
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aGender.patchValue(' ');
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].relationToInsured.patchValue(' ');


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
        this.insureArray.controls['insureRepository'].patchValue('NSDL Data Management Limited');

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

    if (this.medicalDetail.controls['drugsInd'].value == 'Yes') {
      this.medicalDetail.controls['drugsDetails'].patchValue(this.medicalDetail.controls['drugsDetails'].value);

      this.medicalDetail.controls['drugsDetails'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['drugsDetails'].patchValue('');

      this.medicalDetail.controls['drugsDetails'].setValidators(null);

    }
    this.medicalDetail.controls['drugsDetails'].updateValueAndValidity();

  }
  isactivity() {

    if (this.medicalDetail.controls['activity'].value == 'Yes') {
      this.medicalDetail.controls['adventurousActivities'].patchValue(this.medicalDetail.controls['adventurousActivities'].value);

      this.medicalDetail.controls['adventurousActivities'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['adventurousActivities'].patchValue('');

      this.medicalDetail.controls['adventurousActivities'].setValidators(null);

    }
    this.medicalDetail.controls['adventurousActivities'].updateValueAndValidity();

  }
  isalcoholInd() {

    if (this.medicalDetail.controls['alcoholInd'].value == 'Yes') {
      this.medicalDetail.controls['alcoholDetails'].patchValue(this.medicalDetail.controls['alcoholDetails'].value);

      this.medicalDetail.controls['alcoholDetails'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['alcoholDetails'].patchValue('');

      this.medicalDetail.controls['alcoholDetails'].setValidators(null);

    }
    this.medicalDetail.controls['alcoholDetails'].updateValueAndValidity();

  }

  isconsultDoctorInd() {

    if (this.medicalDetail.controls['consultDoctorInd'].value == 'Yes') {
      this.medicalDetail.controls['consultDoctorDetails'].patchValue(this.medicalDetail.controls['consultDoctorDetails'].value);

      this.medicalDetail.controls['consultDoctorDetails'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['consultDoctorDetails'].patchValue('');

      this.medicalDetail.controls['consultDoctorDetails'].setValidators(null);

    }
    this.medicalDetail.controls['consultDoctorDetails'].updateValueAndValidity();

  }
  isECGInd() {

    if (this.medicalDetail.controls['ECGInd'].value == 'Yes') {
      this.medicalDetail.controls['ECGDetails'].patchValue(this.medicalDetail.controls['ECGDetails'].value);

      this.medicalDetail.controls['ECGDetails'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['ECGDetails'].patchValue('');

      this.medicalDetail.controls['ECGDetails'].setValidators(null);

    }
    this.medicalDetail.controls['ECGDetails'].updateValueAndValidity();

  }
  isadmitInd() {

    if (this.medicalDetail.controls['admitInd'].value == 'Yes') {
      this.medicalDetail.controls['admitDetails'].patchValue(this.medicalDetail.controls['admitDetails'].value);

      this.medicalDetail.controls['admitDetails'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['admitDetails'].patchValue('');

      this.medicalDetail.controls['admitDetails'].setValidators(null);

    }
    this.medicalDetail.controls['admitDetails'].updateValueAndValidity();

  }
  isheartDieaseInd() {

    if (this.medicalDetail.controls['heartDieaseInd'].value == 'Yes') {
      this.medicalDetail.controls['heartDieaseDetails'].patchValue(this.medicalDetail.controls['heartDieaseDetails'].value);

      this.medicalDetail.controls['heartDieaseDetails'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['heartDieaseDetails'].patchValue('');

      this.medicalDetail.controls['heartDieaseDetails'].setValidators(null);

    }
    this.medicalDetail.controls['heartDieaseDetails'].updateValueAndValidity();

  }
  isHospitalizedMed() {

    if (this.medicalDetail.controls['isHospitalized'].value == 'Yes') {
      this.medicalDetail.controls['hospitalizedDate'].patchValue(this.medicalDetail.controls['hospitalizedDate'].value);

      this.medicalDetail.controls['hospitalizedDate'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['hospitalizedDate'].patchValue('');

      this.medicalDetail.controls['hospitalizedDate'].setValidators(null);

    }
    this.medicalDetail.controls['hospitalizedDate'].updateValueAndValidity();

  }
  isrespiratoryDieaseInd() {

    if (this.medicalDetail.controls['respiratoryDieaseInd'].value == 'Yes') {
      this.medicalDetail.controls['respiratoryDieaseDetails'].patchValue(this.medicalDetail.controls['respiratoryDieaseDetails'].value);

      this.medicalDetail.controls['respiratoryDieaseDetails'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['respiratoryDieaseDetails'].patchValue('');

      this.medicalDetail.controls['respiratoryDieaseDetails'].setValidators(null);

    }
    this.medicalDetail.controls['respiratoryDieaseDetails'].updateValueAndValidity();

  }
  isdiabetesInd() {

    if (this.medicalDetail.controls['diabetesInd'].value == 'Yes') {
      this.medicalDetail.controls['diabetesDetails'].patchValue(this.medicalDetail.controls['diabetesDetails'].value);

      this.medicalDetail.controls['diabetesDetails'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['diabetesDetails'].patchValue('');

      this.medicalDetail.controls['diabetesDetails'].setValidators(null);

    }
    this.medicalDetail.controls['diabetesDetails'].updateValueAndValidity();

  }
  iskidneyDieaseInd() {

    if (this.medicalDetail.controls['kidneyDieaseInd'].value == 'Yes') {
      this.medicalDetail.controls['kidneyDieaseDetails'].patchValue(this.medicalDetail.controls['kidneyDieaseDetails'].value);

      this.medicalDetail.controls['kidneyDieaseDetails'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['kidneyDieaseDetails'].patchValue('');

      this.medicalDetail.controls['kidneyDieaseDetails'].setValidators(null);

    }
    this.medicalDetail.controls['kidneyDieaseDetails'].updateValueAndValidity();

  }
  isdigestiveDieaseInd() {

    if (this.medicalDetail.controls['digestiveDieaseInd'].value == 'Yes') {
      this.medicalDetail.controls['digestiveDieaseDetails'].patchValue(this.medicalDetail.controls['digestiveDieaseDetails'].value);

      this.medicalDetail.controls['digestiveDieaseDetails'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['digestiveDieaseDetails'].patchValue('');

      this.medicalDetail.controls['digestiveDieaseDetails'].setValidators(null);

    }
    this.medicalDetail.controls['digestiveDieaseDetails'].updateValueAndValidity();

  }
  iscancerDieaseInd() {

    if (this.medicalDetail.controls['cancerDieaseInd'].value == 'Yes') {
      this.medicalDetail.controls['cancerDieaseDetails'].patchValue(this.medicalDetail.controls['cancerDieaseDetails'].value);

      this.medicalDetail.controls['cancerDieaseDetails'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['cancerDieaseDetails'].patchValue('');

      this.medicalDetail.controls['cancerDieaseDetails'].setValidators(null);

    }
    this.medicalDetail.controls['cancerDieaseDetails'].updateValueAndValidity();

  }
  istropicalDieaseInd() {

    if (this.medicalDetail.controls['tropicalDieaseInd'].value == 'Yes') {
      this.medicalDetail.controls['tropicalDieaseDetails'].patchValue(this.medicalDetail.controls['tropicalDieaseDetails'].value);

      this.medicalDetail.controls['tropicalDieaseDetails'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['tropicalDieaseDetails'].patchValue('');

      this.medicalDetail.controls['tropicalDieaseDetails'].setValidators(null);

    }
    this.medicalDetail.controls['tropicalDieaseDetails'].updateValueAndValidity();

  }
  isthyroidDieaseInd() {

    if (this.medicalDetail.controls['thyroidDieaseInd'].value == 'Yes') {
      this.medicalDetail.controls['thyroidDieaseDetails'].patchValue(this.medicalDetail.controls['thyroidDieaseDetails'].value);

      this.medicalDetail.controls['thyroidDieaseDetails'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['thyroidDieaseDetails'].patchValue('');

      this.medicalDetail.controls['thyroidDieaseDetails'].setValidators(null);

    }
    this.medicalDetail.controls['thyroidDieaseDetails'].updateValueAndValidity();

  }
  isbloodDieaseInd() {

    if (this.medicalDetail.controls['bloodDieaseInd'].value == 'Yes') {
      this.medicalDetail.controls['bloodDieaseDetails'].patchValue(this.medicalDetail.controls['bloodDieaseDetails'].value);

      this.medicalDetail.controls['bloodDieaseDetails'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['bloodDieaseDetails'].patchValue('');

      this.medicalDetail.controls['bloodDieaseDetails'].setValidators(null);

    }
    this.medicalDetail.controls['bloodDieaseDetails'].updateValueAndValidity();

  }
  isnervousDieaseInd() {

    if (this.medicalDetail.controls['nervousDieaseInd'].value == 'Yes') {
      this.medicalDetail.controls['nervousDieaseDetails'].patchValue(this.medicalDetail.controls['nervousDieaseDetails'].value);

      this.medicalDetail.controls['nervousDieaseDetails'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['nervousDieaseDetails'].patchValue('');

      this.medicalDetail.controls['nervousDieaseDetails'].setValidators(null);

    }
    this.medicalDetail.controls['nervousDieaseDetails'].updateValueAndValidity();

  }
  isRecoveredInd() {

    if (this.medicalDetail.controls['isRecovered'].value == 'Yes') {
      this.medicalDetail.controls['nonRecoveryDetails'].patchValue(this.medicalDetail.controls['nonRecoveryDetails'].value);

      this.medicalDetail.controls['nonRecoveryDetails'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['nonRecoveryDetails'].patchValue('');

      this.medicalDetail.controls['nonRecoveryDetails'].setValidators(null);

    }
    this.medicalDetail.controls['nonRecoveryDetails'].updateValueAndValidity();

  }
  ismuscleDieaseInd() {

    if (this.medicalDetail.controls['muscleDieaseInd'].value == 'Yes') {
      this.medicalDetail.controls['muscleDieaseDetails'].patchValue(this.medicalDetail.controls['muscleDieaseDetails'].value);

      this.medicalDetail.controls['muscleDieaseDetails'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['muscleDieaseDetails'].patchValue('');

      this.medicalDetail.controls['muscleDieaseDetails'].setValidators(null);

    }
    this.medicalDetail.controls['muscleDieaseDetails'].updateValueAndValidity();

  }
  isalcoholicInd() {

    if (this.medicalDetail.controls['alcoholicInd'].value == 'Yes') {
      this.medicalDetail.controls['alcoholicDetails'].patchValue(this.medicalDetail.controls['alcoholicDetails'].value);

      this.medicalDetail.controls['alcoholicDetails'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['alcoholicDetails'].patchValue('');

      this.medicalDetail.controls['alcoholicDetails'].setValidators(null);

    }
    this.medicalDetail.controls['alcoholicDetails'].updateValueAndValidity();

  }
  isotherIllnessInd() {

    if (this.medicalDetail.controls['otherIllnessInd'].value == 'Yes') {
      this.medicalDetail.controls['otherIllnessDetails'].patchValue(this.medicalDetail.controls['otherIllnessDetails'].value);

      this.medicalDetail.controls['otherIllnessDetails'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['otherIllnessDetails'].patchValue('');

      this.medicalDetail.controls['otherIllnessDetails'].setValidators(null);

    }
    this.medicalDetail.controls['otherIllnessDetails'].updateValueAndValidity();

  }
  isdeformityInd() {

    if (this.medicalDetail.controls['deformityInd'].value == 'Yes') {
      this.medicalDetail.controls['deformityDetails'].patchValue(this.medicalDetail.controls['deformityDetails'].value);

      this.medicalDetail.controls['deformityDetails'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['deformityDetails'].patchValue('');

      this.medicalDetail.controls['deformityDetails'].setValidators(null);

    }
    this.medicalDetail.controls['deformityDetails'].updateValueAndValidity();

  }
  issymptomsInd() {

    if (this.medicalDetail.controls['symptomsInd'].value == 'Yes') {
      this.medicalDetail.controls['symptomsDetails'].patchValue(this.medicalDetail.controls['symptomsDetails'].value);

      this.medicalDetail.controls['symptomsDetails'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['symptomsDetails'].patchValue('');

      this.medicalDetail.controls['symptomsDetails'].setValidators(null);

    }
    this.medicalDetail.controls['symptomsDetails'].updateValueAndValidity();

  }
  isfemaleDieaseInd() {

    if (this.medicalDetail.controls['femaleDieaseInd'].value == 'Yes') {
      this.medicalDetail.controls['femaleDieaseWeeks'].patchValue(this.medicalDetail.controls['femaleDieaseWeeks'].value);

      this.medicalDetail.controls['femaleDieaseWeeks'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['femaleDieaseWeeks'].patchValue('');

      this.medicalDetail.controls['femaleDieaseWeeks'].setValidators(null);

    }
    this.medicalDetail.controls['femaleDieaseWeeks'].updateValueAndValidity();

  }
  ismedicationInd() {

    if (this.medicalDetail.controls['medicalTreatment'].value == 'Yes') {
      this.medicalDetail.controls['medicationDetails'].patchValue(this.medicalDetail.controls['medicationDetails'].value);

      this.medicalDetail.controls['medicationDetails'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['medicationDetails'].patchValue('');

      this.medicalDetail.controls['medicationDetails'].setValidators(null);

    }
    this.medicalDetail.controls['medicationDetails'].updateValueAndValidity();

  }
  isdiagnosedInd() {

    if (this.medicalDetail.controls['receivedTreatment1'].value == 'Yes') {
      this.medicalDetail.controls['diagnosedDetails'].patchValue(this.medicalDetail.controls['diagnosedDetails'].value);

      this.medicalDetail.controls['diagnosedDetails'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['diagnosedDetails'].patchValue('');

      this.medicalDetail.controls['diagnosedDetails'].setValidators(null);

    }
    this.medicalDetail.controls['diagnosedDetails'].updateValueAndValidity();

  }

  isaidsInd() {

    if (this.medicalDetail.controls['receivedTreatment2'].value == 'Yes') {
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

    if (this.medicalDetail.controls['pregnantInd'].value == 'Yes') {
      this.medicalDetail.controls['pregnantweeks'].patchValue(this.medicalDetail.controls['pregnantweeks'].value);

      this.medicalDetail.controls['pregnantweeks'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['pregnantweeks'].patchValue('');

      this.medicalDetail.controls['pregnantweeks'].setValidators(null);

    }
    this.medicalDetail.controls['pregnantweeks'].updateValueAndValidity();

  }

  isCriminalInd() {

    if (this.insureArray.controls['isCriminal'].value == 'Yes') {
      this.insureArray.controls['criminalDetails'].patchValue(this.insureArray.controls['criminalDetails'].value);

      this.insureArray.controls['criminalDetails'].setValidators([Validators.required]);
    } else {
      this.insureArray.controls['criminalDetails'].patchValue('');

      this.insureArray.controls['criminalDetails'].setValidators(null);

    }
    this.insureArray.controls['criminalDetails'].updateValueAndValidity();

  }
  isTopUpBenefit() {

    if (this.addon.controls['TopUpBenefit'].value == 'Yes') {
      this.addon.controls['topUpRate'].patchValue(this.addon.controls['topUpRate'].value);
      this.addon.controls['topUpBenefitPercentage'].patchValue(this.addon.controls['topUpBenefitPercentage'].value);

      this.addon.controls['topUpBenefitPercentage'].setValidators([Validators.required]);
      this.addon.controls['topUpRate'].setValidators([Validators.required]);
    } else {
      this.addon.controls['topUpRate'].patchValue('');
      this.addon.controls['topUpBenefitPercentage'].patchValue('');

      this.addon.controls['topUpRate'].setValidators(null);
      this.addon.controls['topUpBenefitPercentage'].setValidators(null);

    }
    this.addon.controls['topUpRate'].updateValueAndValidity();
    this.addon.controls['topUpBenefitPercentage'].updateValueAndValidity();

  }
  isbetterHalfBenefit() {

    if (this.addon.controls['betterHalfBenefit'].value == 'Yes') {
      this.addon.controls['betterHalfsumAssured'].patchValue(this.addon.controls['betterHalfsumAssured'].value);

      this.addon.controls['betterHalfsumAssured'].setValidators([Validators.required]);
    } else {
      this.addon.controls['betterHalfsumAssured'].patchValue('');

      this.addon.controls['betterHalfsumAssured'].setValidators(null);

    }
    this.addon.controls['betterHalfsumAssured'].updateValueAndValidity();

  }
  iscriticalIllness() {

    if (this.addon.controls['criticalIllness'].value == 'Yes') {
      this.addon.controls['criticalsumAssured'].patchValue(this.addon.controls['criticalsumAssured'].value);
      // this.addon.controls['criticalClaim'].patchValue(this.addon.controls['criticalClaim'].value);

      this.addon.controls['criticalsumAssured'].setValidators([Validators.required]);
      // this.addon.controls['criticalClaim'].setValidators([Validators.required]);
    } else {
      this.addon.controls['criticalsumAssured'].patchValue('');
      // this.addon.controls['criticalClaim'].patchValue('');

      this.addon.controls['criticalsumAssured'].setValidators(null);
      // this.addon.controls['criticalClaim'].setValidators(null);

    }
    this.addon.controls['criticalsumAssured'].updateValueAndValidity();
    // this.addon.controls['criticalClaim'].updateValueAndValidity();

  }

  isDeathBenefit() {

    if (this.addon.controls['isADB'].value == 'Yes') {
      this.addon.controls['sumAssuredADB'].patchValue(this.addon.controls['sumAssuredADB'].value);
      this.addon.controls['sumAssuredADB'].setValidators([Validators.required]);

    } else {
      this.addon.controls['sumAssuredADB'].patchValue('');

      this.addon.controls['sumAssuredADB'].setValidators(null);

    }
    this.addon.controls['sumAssuredADB'].updateValueAndValidity();

  }
  isAccidentalTotal() {

    if (this.addon.controls['isATPD'].value == 'Yes') {
      this.addon.controls['sumAssuredATPD'].patchValue(this.addon.controls['sumAssuredATPD'].value);

      this.addon.controls['sumAssuredATPD'].setValidators([Validators.required]);
    } else {
      this.addon.controls['sumAssuredATPD'].patchValue('');

      this.addon.controls['sumAssuredATPD'].setValidators(null);

    }
    this.addon.controls['sumAssuredATPD'].updateValueAndValidity();

  }
  isHospitalCash() {

    if (this.addon.controls['isHCB'].value == 'Yes') {
      this.addon.controls['sumAssuredHCB'].patchValue(this.addon.controls['sumAssuredHCB'].value);

      this.addon.controls['sumAssuredHCB'].setValidators([Validators.required]);
    } else {
      this.addon.controls['sumAssuredHCB'].patchValue('');

      this.addon.controls['sumAssuredHCB'].setValidators(null);

    }
    this.addon.controls['sumAssuredHCB'].updateValueAndValidity();

  }
  isadventurous() {

    if (this.medicalDetail.controls['adventurousActivities'].value == '9~') {
      this.medicalDetail.controls['adventurousActivitiesDetails'].patchValue(this.medicalDetail.controls['adventurousActivitiesDetails'].value);

      this.medicalDetail.controls['adventurousActivitiesDetails'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['adventurousActivitiesDetails'].patchValue('');

      this.medicalDetail.controls['adventurousActivitiesDetails'].setValidators(null);

    }
    this.medicalDetail.controls['adventurousActivitiesDetails'].updateValueAndValidity();

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
      "sub_product_id": this.lifePremiumList.sub_product_id,
      "term": this.lifePremiumList.termDetrails,
      "suminsured_amount": sessionStorage.selectedAmountTravel,
      "policy_id": this.getEnquiryDetials.policy_id,
      "productDetails":{
        "policyTerm": this.lifePremiumList.termDetrails,
        "premiumPayingTerm":this.lifePremiumList.premium_paying_term,
        "frequency":this.enquiryFromDetials.payment_mode,
        "sumAssured": sessionStorage.selectedAmountTravel,
        "planOption": '',
        "riderDetails": {
          "workSiteFlag": 'N',
          "investmentStrategy":'',
          "risingStar":'N',
          "policyOption":'',
          "additionalBenefit":'',
          "topUpBenefit": {
            "isTopUpBenefit": '',
            "topUpBenefitPercentage":'',
            "topUpRate": '',
          },
          "betterHalf": {
            "betterHalfBenefit":this.addon.controls['betterHalfBenefit'].value,
            "sumAssured": this.addon.controls['betterHalfsumAssured'].value,
          },
          "WOP": {
            "waiverOfPremiumBenefit": this.addon.controls['waiverOfPremiumBenefit'].value,
          },
          "CI": {
            "criticalIllness": this.addon.controls['criticalIllness'].value,
            "sumAssured":this.addon.controls['criticalsumAssured'].value,
          },
          "ADB": {
            "isADB": this.addon.controls['isADB'].value,
            "sumAssured": this.addon.controls['sumAssuredADB'].value,
          },
          "ATPD": {
            "isATPD": this.addon.controls['isATPD'].value,
            "sumAssured": this.addon.controls['sumAssuredATPD'].value,
          },
          "HCB": {
            "isHCB": this.addon.controls['isHCB'].value,
            "sumAssured": this.addon.controls['sumAssuredHCB'].value,
          }
        },
        "DeathBenefitOptions": {
          "payoutOption": '',
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
        "isSmoker":this.customerDetails.controls['isSmoker'].value,
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
        "familyDiease_Ind":this.insureArray.controls['insureHistory'].value  == 'Yes' ? 'Y' : 'N',
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
        "travelOutsideIndiaInd":this.medicalDetail.controls['travelOutsideIndia'].value  == 'Yes' ? 'Y' : 'N',
        "pilotInd":this.medicalDetail.controls['pilot'].value  == 'Yes' ? 'Y' : 'N',
        "adventurousActivitiesInd":this.medicalDetail.controls['adventurousActivities'].value  ,
        "adventurousActivitiesDetails":this.medicalDetail.controls['adventurousActivitiesDetails'].value,
        "corrAddrProof":"",
        "incomeProof":"",
        "incomeProofText": "",
        "hasEIAccount":this.insureArray.controls['insureAccNo'].value,
        "EIAccountNo":this.insureArray.controls['einsureAccNo'].value ,
        "applyEIAccount":this.insureArray.controls['provideAccNo'].value,
        "EIARepository":this.insureArray.controls['insureRepository'].value,
        "wantEPolicy":this.insureArray.controls['epolicy'].value  ,
        "relationLAProposer":'SELF',
        "height":"",
        "heightFeets":this.insureArray.controls['heightFeets'].value,
        "heightInches":this.insureArray.controls['heightInches'].value,
        "heightCentimeters":"",
        "weight":this.insureArray.controls['weight'].value,
        "hasWeightChanged":this.insureArray.controls['hasWeightChanged'].value =='Same'? 'N' : 'Y',
        "weightChange":this.insureArray.controls['inbetweenweight'].value,
        "weightChangeReason":this.insureArray.controls['weightChangedreason'].value,
        "isStaff":'N',
        "employeeCode":'',
        "isHospitalized":this.medicalDetail.controls['isHospitalized'].value  == 'Yes' ? 'Y' : 'N',
        "hospitalizedDate":this.medicalDetail.controls['hospitalizedDate'].value,
        "isRecovered":this.medicalDetail.controls['isRecovered'].value  == 'Yes' ? 'Y' : 'N',
        "nonRecoveryDetails":this.medicalDetail.controls['nonRecoveryDetails'].value,
        "isTaxResOfIndia":'LA is a tax resident of India',
        "aadhaarNo":this.insureArray.controls['aadhaarNo'].value,

        "questionnaires":{
          "travelOutsideIndiaInd":this.medicalDetail.controls['travelOutsideIndia'].value  == 'Yes' ? 'Y' : 'N',
          "pilotInd":this.medicalDetail.controls['pilot'].value  == 'Yes' ? 'Y' : 'N',
          "adventurousActivitiesInd":this.medicalDetail.controls['adventurousActivities'].value ,
          "adventurousActivitiesDetails":this.medicalDetail.controls['adventurousActivitiesDetails'].value,
          "healthInformation":"",
          "drugsInd":this.medicalDetail.controls['drugsInd'].value  == 'Yes' ? 'Y' : 'N',
          "drugsDetails":this.medicalDetail.controls['drugsDetails'].value,
          "alcoholInd":this.medicalDetail.controls['alcoholInd'].value  == 'Yes' ? 'Y' : 'N',
          "alcoholDetails":this.medicalDetail.controls['alcoholDetails'].value,
          "tobaccoInd":this.medicalDetail.controls['tobaccoInd'].value  == 'Yes' ? 'Y' : 'N',
          "tobaccoDetails":this.medicalDetail.controls['tobaccoDetails'].value ,
          "tobaccoStopInd":this.medicalDetail.controls['tobaccoStopInd'].value  == 'Yes' ? 'Y' : 'N',
          "tobaccoStopDetails":this.medicalDetail.controls['tobaccoStopDetails'].value ,
          "consultDoctorInd":this.medicalDetail.controls['consultDoctorInd'].value  == 'Yes' ? 'Y' : 'N',
          "consultDoctorDetails":this.medicalDetail.controls['consultDoctorDetails'].value,
          "ECGInd":this.medicalDetail.controls['ECGInd'].value  == 'Yes' ? 'Y' : 'N',
          "ECGDetails":this.medicalDetail.controls['ECGDetails'].value,
          "admitInd":this.medicalDetail.controls['admitInd'].value  == 'Yes' ? 'Y' : 'N',
          "admitDetails":this.medicalDetail.controls['admitDetails'].value,
          "medicationInd":this.medicalDetail.controls['medicalTreatment'].value  == 'Yes' ? 'Y' : 'N',
          "medicationDetails":this.medicalDetail.controls['medicationDetails'].value,
          "diagnosedInd":this.medicalDetail.controls['receivedTreatment1'].value  == 'Yes' ? 'Y' : 'N',
          "diagnosedDetails":this.medicalDetail.controls['diagnosedDetails'].value,
          "heartDieaseInd":this.medicalDetail.controls['heartDieaseInd'].value  == 'Yes' ? 'Y' : 'N',
          "heartDieaseDetails":this.medicalDetail.controls['heartDieaseDetails'].value,
          "BPInd":"",
          "BPDetails":"",
          "respiratoryDieaseInd":this.medicalDetail.controls['respiratoryDieaseInd'].value  == 'Yes' ? 'Y' : 'N',
          "respiratoryDieaseDetails":this.medicalDetail.controls['respiratoryDieaseDetails'].value,
          "diabetesInd":this.medicalDetail.controls['diabetesInd'].value  == 'Yes' ? 'Y' : 'N',
          "diabetesDetails":this.medicalDetail.controls['diabetesDetails'].value,
          "kidneyDieaseInd":this.medicalDetail.controls['kidneyDieaseInd'].value  == 'Yes' ? 'Y' : 'N',
          "kidneyDieaseDetails":this.medicalDetail.controls['kidneyDieaseDetails'].value,
          "digestiveDieaseInd":this.medicalDetail.controls['digestiveDieaseInd'].value  == 'Yes' ? 'Y' : 'N',
          "digestiveDieaseDetails":this.medicalDetail.controls['digestiveDieaseDetails'].value,
          "cancerDieaseInd":this.medicalDetail.controls['cancerDieaseInd'].value  == 'Yes' ? 'Y' : 'N',
          "cancerDieaseDetails":this.medicalDetail.controls['cancerDieaseDetails'].value,
          "tropicalDieaseInd":this.medicalDetail.controls['tropicalDieaseInd'].value  == 'Yes' ? 'Y' : 'N',
          "tropicalDieaseDetails":this.medicalDetail.controls['tropicalDieaseDetails'].value,
          "thyroidDieaseInd":this.medicalDetail.controls['thyroidDieaseInd'].value  == 'Yes' ? 'Y' : 'N',
          "thyroidDieaseDetails":this.medicalDetail.controls['thyroidDieaseDetails'].value,
          "bloodDieaseInd":this.medicalDetail.controls['bloodDieaseInd'].value  == 'Yes' ? 'Y' : 'N',
          "bloodDieaseDetails":this.medicalDetail.controls['bloodDieaseDetails'].value,
          "nervousDieaseInd":this.medicalDetail.controls['nervousDieaseInd'].value  == 'Yes' ? 'Y' : 'N',
          "nervousDieaseDetails":this.medicalDetail.controls['nervousDieaseDetails'].value,
          "ENTDieaseInd":"",
          "ENTDieaseDetails":"",
          "muscleDieaseInd":this.medicalDetail.controls['muscleDieaseInd'].value  == 'Yes' ? 'Y' : 'N',
          "muscleDieaseDetails":this.medicalDetail.controls['muscleDieaseDetails'].value,
          "aidsInd":this.medicalDetail.controls['receivedTreatment2'].value  == 'Yes' ? 'Y' : 'N',
          "aidsDetails":this.medicalDetail.controls['aidsDetails'].value,
          "alcoholicInd":this.medicalDetail.controls['alcoholicInd'].value  == 'Yes' ? 'Y' : 'N',
          "alcoholicDetails":this.medicalDetail.controls['alcoholicDetails'].value,
          "otherIllnessInd":this.medicalDetail.controls['otherIllnessInd'].value  == 'Yes' ? 'Y' : 'N',
          "otherIllnessDetails":this.medicalDetail.controls['otherIllnessDetails'].value,
          "deformityInd":this.medicalDetail.controls['deformityInd'].value == 'Yes' ? 'Y' : 'N',
          "deformityDetails":this.medicalDetail.controls['deformityDetails'].value,
          "symptomsInd":this.medicalDetail.controls['symptomsInd'].value  == 'Yes' ? 'Y' : 'N',
          "symptomsDetails":this.medicalDetail.controls['symptomsDetails'].value,
          "pregnantInd":this.medicalDetail.controls['pregnantInd'].value  == 'Yes' ? 'Y' : 'N',
          "pregnantweeks":this.medicalDetail.controls['pregnantweeks'].value ,
          "femaleDiease_Ind":this.medicalDetail.controls['femaleDieaseInd'].value  == 'Yes' ? 'Y' : 'N',
          "femaleDieaseWeeks":this.medicalDetail.controls['femaleDieaseWeeks'].value,
          "medicalQuestions":this.medicalDetail.value.medicalQuestions,
        },
        "bank":{
          "accountNo":this.bankDetail.controls['accountNo'].value,
          "accName":this.bankDetail.controls['accName'].value,
          "name":this.bankDetail.controls['name'].value,
          "location":this.bankDetail.controls['location'].value,
          "ifscCode":this.bankDetail.controls['ifscCode'].value,
          "investmentStrategy":'',
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
        "title":this.insureArray.controls['stitle'].value,
        "firstName":this.insureArray.controls['sfirstName'].value,
        "middleName":this.insureArray.controls['smidName'].value,
        "lastName":this.insureArray.controls['slastName'].value,
        "dob":this.datepipe.transform(this.insureArray.controls['sdob'].value, 'y-MM-dd'),
        "emailId":this.insureArray.controls['semailId'].value,
        "phoneNo":this.insureArray.controls['smobileNo'].value,
        "isSmoker":this.insureArray.controls['isSmokerSpouse'].value,
        "isStaff":'N',
        "employeeCode":'',
        "relationLAProposer":'Spouse',
      },
      "Proposer":{
        "title": this.insureArray.controls['title'].value,
        "firstName": this.insureArray.controls['firstName'].value,
        "middleName": this.insureArray.controls['midName'].value,
        "lastName": this.insureArray.controls['lastName'].value,
        "dob": this.datepipe.transform(this.insureArray.controls['dob'].value, 'y-MM-dd'),
        "gender": this.insureArray.controls['gender'].value,
        "isSmoker":"Y",
        "maritalStatus": this.insureArray.controls['maritalStatus'].value,
        "pan": this.insureArray.controls['sppan'].value,
        "maidName":"",
        "motherMaidName":this.insureArray.controls['smotherMaidName'].value,
        "FHName":this.insureArray.controls['sfatherhusbandName'].value,
        "nationality":this.insureArray.controls['nationality'].value,
        "otherNationality":"",
        "ageProofId":this.insureArray.controls['sageProofId'].value,
        "emailId":this.insureArray.controls['emailId'].value,
        "phoneNo":this.insureArray.controls['mobileNo'].value,
        "ResidencePhoneNo":"",
        "alternate_cnt_no":"",
        "currAddr1":this.insureArray.controls['scurrAddr1'].value,
        "currAddr2":this.insureArray.controls['scurrAddr2'].value,
        "currAddr3":this.insureArray.controls['scurrAddr3'].value,
        "currPincode":this.insureArray.controls['scurrPincode'].value,
        "currState":this.insureArray.controls['scurrState'].value,
        "currCity":this.insureArray.controls['scurrCity'].value,
        "perAddr1":this.insureArray.controls['sperAddr1'].value,
        "perAddr2":this.insureArray.controls['sperAddr2'].value,
        "perAddr3":this.insureArray.controls['sperAddr3'].value,
        "perPincode":this.insureArray.controls['sperPincode'].value,
        "perState":this.insureArray.controls['sperState'].value,
        "perCity":this.insureArray.controls['sperCity'].value,
        "isCurrPerAddrSame":this.insureArray.controls['sisCurrPerAddrSame'].value==null?'':this.insureArray.controls['sisCurrPerAddrSame'].value,
        "isPerAddrIsCorrAddr":"",
        "education":"",
        "otherEducation":"",
        "highestQualification":this.insureArray.controls['shighestQualification'].value,
        "otherQualification":this.insureArray.controls['sotherQualification'].value,
        "collegeNameLoc":"DJTI Mumbai",
        "course":"",
        "courseDuration":"",
        "courseYear":"",
        "studentInstruction":"",
        "employementType":this.insureArray.controls['employementType'].value,
        "employementTypeOther":this.insureArray.controls['employementTypeOther'].value,
        "employerName":this.insureArray.controls['employerName'].value,
        "employerAddr":this.insureArray.controls['employerAddr'].value,
        "designation":"Senior Executive officer",
        "natureOfDuty":this.insureArray.controls['naturedutyName'].value,
        "experienceInYears":"",
        "occupationType":"",
        "noOfEmployees":"",
        "natureOfBusiness":"",
        "annualIncome":this.insureArray.controls['annualIncome'].value,
        "isIncomeSource":"",
        "incomeSourceDetails":"",
        "familyHistory":this.medicalDetail.value.medicalFamilyQuestions,

        // {
        //   "relation":"1",
        //   "age":"50",
        //   "healthStatus":"Healthy",
        //   "ageOnDeath":"N/A",
        //   "causeOfDeath":"N/A"
        // }],
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
        "isCriminal":"",
        "criminalDetails":"",
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
        "heightFeets":this.insureArray.controls['sheightFeets'].value,
        "heightInches":this.insureArray.controls['sheightInches'].value,
        "heightCentimeters":"",
        "weight":this.insureArray.controls['sweight'].value,
        "clientId":"",
        "hasWeightChanged":this.insureArray.controls['shasWeightChanged'].value,
        "weightChange":this.insureArray.controls['sinbetweenweight'].value,
        "weightChangeReason":this.insureArray.controls['sweightChangedreason'].value,
        "isTaxResOfIndia":'LA is a tax resident of India',
        "aadhaarNo":this.insureArray.controls['saadhaarNo'].value,

        "travelOutsideIndiaInd":this.medicalDetail.controls['travelOutsideIndia1'].value  == 'Yes' ? 'Y' : 'N',
        "pilotInd":this.medicalDetail.controls['pilot1'].value  == 'Yes' ? 'Y' : 'N',
        "adventurousActivitiesInd":this.medicalDetail.controls['adventurousActivities1'].value ,
        "adventurousActivitiesDetails":this.medicalDetail.controls['adventurousActivitiesDetails1'].value,
        "healthInformation":"",
        "drugsInd":this.medicalDetail.controls['drugsInd1'].value  == 'Yes' ? 'Y' : 'N',
        "drugsDetails":this.medicalDetail.controls['drugsDetails1'].value,
        "alcoholInd":this.medicalDetail.controls['alcoholInd1'].value  == 'Yes' ? 'Y' : 'N',
        "alcoholDetails":this.medicalDetail.controls['alcoholDetails1'].value,
        "tobaccoInd":this.medicalDetail.controls['tobaccoInd1'].value  == 'Yes' ? 'Y' : 'N',
        "tobaccoDetails":this.medicalDetail.controls['tobaccoDetails1'].value ,
        "tobaccoStopInd":this.medicalDetail.controls['tobaccoStopInd1'].value  == 'Yes' ? 'Y' : 'N',
        "tobaccoStopDetails":this.medicalDetail.controls['tobaccoStopDetails1'].value ,
        "consultDoctorInd":this.medicalDetail.controls['consultDoctorInd1'].value  == 'Yes' ? 'Y' : 'N',
        "consultDoctorDetails":this.medicalDetail.controls['consultDoctorDetails1'].value,
        "ECGInd":this.medicalDetail.controls['ECGInd1'].value  == 'Yes' ? 'Y' : 'N',
        "ECGDetails":this.medicalDetail.controls['ECGDetails1'].value,
        "admitInd":this.medicalDetail.controls['admitInd1'].value  == 'Yes' ? 'Y' : 'N',
        "admitDetails":this.medicalDetail.controls['admitDetails1'].value,
        "medicationInd":this.medicalDetail.controls['medicalTreatment1'].value  == 'Yes' ? 'Y' : 'N',
        "medicationDetails":this.medicalDetail.controls['medicationDetails1'].value,
        "diagnosedInd":this.medicalDetail.controls['receivedTreatment11'].value  == 'Yes' ? 'Y' : 'N',
        "diagnosedDetails":this.medicalDetail.controls['diagnosedDetails1'].value,
        "heartDieaseInd":this.medicalDetail.controls['heartDieaseInd1'].value  == 'Yes' ? 'Y' : 'N',
        "heartDieaseDetails":this.medicalDetail.controls['heartDieaseDetails1'].value,
        "BPInd":"",
        "BPDetails":"",
        "respiratoryDieaseInd":this.medicalDetail.controls['respiratoryDieaseInd1'].value  == 'Yes' ? 'Y' : 'N',
        "respiratoryDieaseDetails":this.medicalDetail.controls['respiratoryDieaseDetails1'].value,
        "diabetesInd":this.medicalDetail.controls['diabetesInd1'].value  == 'Yes' ? 'Y' : 'N',
        "diabetesDetails":this.medicalDetail.controls['diabetesDetails1'].value,
        "kidneyDieaseInd":this.medicalDetail.controls['kidneyDieaseInd1'].value  == 'Yes' ? 'Y' : 'N',
        "kidneyDieaseDetails":this.medicalDetail.controls['kidneyDieaseDetails1'].value,
        "digestiveDieaseInd":this.medicalDetail.controls['digestiveDieaseInd1'].value  == 'Yes' ? 'Y' : 'N',
        "digestiveDieaseDetails":this.medicalDetail.controls['digestiveDieaseDetails1'].value,
        "cancerDieaseInd":this.medicalDetail.controls['cancerDieaseInd1'].value  == 'Yes' ? 'Y' : 'N',
        "cancerDieaseDetails":this.medicalDetail.controls['cancerDieaseDetails1'].value,
        "tropicalDieaseInd":this.medicalDetail.controls['tropicalDieaseInd1'].value  == 'Yes' ? 'Y' : 'N',
        "tropicalDieaseDetails":this.medicalDetail.controls['tropicalDieaseDetails1'].value,
        "thyroidDieaseInd":this.medicalDetail.controls['thyroidDieaseInd1'].value  == 'Yes' ? 'Y' : 'N',
        "thyroidDieaseDetails":this.medicalDetail.controls['thyroidDieaseDetails1'].value,
        "bloodDieaseInd":this.medicalDetail.controls['bloodDieaseInd1'].value  == 'Yes' ? 'Y' : 'N',
        "bloodDieaseDetails":this.medicalDetail.controls['bloodDieaseDetails1'].value,
        "nervousDieaseInd":this.medicalDetail.controls['nervousDieaseInd1'].value  == 'Yes' ? 'Y' : 'N',
        "nervousDieaseDetails":this.medicalDetail.controls['nervousDieaseDetails1'].value,
        "ENTDieaseInd":"",
        "ENTDieaseDetails":"",
        "muscleDieaseInd":this.medicalDetail.controls['muscleDieaseInd1'].value  == 'Yes' ? 'Y' : 'N',
        "muscleDieaseDetails":this.medicalDetail.controls['muscleDieaseDetails1'].value,
        "aidsInd":this.medicalDetail.controls['receivedTreatment21'].value  == 'Yes' ? 'Y' : 'N',
        "aidsDetails":this.medicalDetail.controls['aidsDetails1'].value,
        "alcoholicInd":this.medicalDetail.controls['alcoholicInd1'].value  == 'Yes' ? 'Y' : 'N',
        "alcoholicDetails":this.medicalDetail.controls['alcoholicDetails1'].value,
        "otherIllnessInd":this.medicalDetail.controls['otherIllnessInd1'].value  == 'Yes' ? 'Y' : 'N',
        "otherIllnessDetails":this.medicalDetail.controls['otherIllnessDetails1'].value,
        "deformityInd":this.medicalDetail.controls['deformityInd1'].value == 'Yes' ? 'Y' : 'N',
        "deformityDetails":this.medicalDetail.controls['deformityDetails1'].value,
        "symptomsInd":this.medicalDetail.controls['symptomsInd1'].value  == 'Yes' ? 'Y' : 'N',
        "symptomsDetails":this.medicalDetail.controls['symptomsDetails1'].value,
        "pregnantInd":this.medicalDetail.controls['pregnantInd1'].value  == 'Yes' ? 'Y' : 'N',
        "pregnantweeks":this.medicalDetail.controls['pregnantweeks1'].value ,
        "femaleDiease_Ind":this.medicalDetail.controls['femaleDieaseInd1'].value  == 'Yes' ? 'Y' : 'N',
        // "femaleDieaseWeeks":this.medicalDetail.controls['femaleDieaseWeeks1'].value,

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
    console.log(this.enquiryFormData.lifeBenefitTerm,'this.enquiryFormData.lifeBenefitTerm')
    console.log(this.enquiryFormData.lifePolicy,'this.enquiryFormData.lifePolicy')
    console.log(this.medicalDetail.controls['adventurousActivities'].value,'medicalDetailadventurousActivities')
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
      // this.proposerFormData = this.proposer.value;
      this.bankFormData = this.bankDetail.value;
      this.nomineeFormData = this.nomineeDetail.value.itemsNominee;
      this.insuredFormData = this.insureArray.value;
      this.medicalFormData = this.medicalDetail.value;
      this.addonFormData = this.addon.value;
      // sessionStorage.proposerFormData = JSON.stringify(this.proposerFormData);
      sessionStorage.insuredFormData = JSON.stringify(this.insuredFormData);
      sessionStorage.medicalFormData = JSON.stringify(this.medicalFormData);
      sessionStorage.bankFormData = JSON.stringify(this.bankFormData);
      sessionStorage.nomineeFormData = JSON.stringify(this.nomineeFormData);
      sessionStorage.addonFormData = JSON.stringify(this.addonFormData);
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

  ageTillcoverd() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
      'age':sessionStorage.proposerAge,
    }
    this.termService.ageTillcoverd(data).subscribe(
        (successData) => {
          this.ageTillcoverdSuccess(successData);
        },
        (error) => {
          this.ageTillcoverdFailure(error);
        }
    );
  }

  public ageTillcoverdSuccess(successData) {
    if (successData.IsSuccess) {
      this.ageTill = successData.ResponseObject;
    }else {
      this.toastr.error(successData.ErrorObject);
    }

  }

  public ageTillcoverdFailure(error) {
  }
  premiumPaymentTerm() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
      'agetillcovered':this.insureArray.controls['ageTillCoverd'].value,
      'age':sessionStorage.proposerAge,
    }
    console.log(this.insureArray.controls['ageTillCoverd'].value,'ageeeeee')

    this.termService.premiumPaymentTerm(data).subscribe(
        (successData) => {
          this.premiumPaymentTermSuccess(successData);
        },
        (error) => {
          this.premiumPaymentTermFailure(error);
        }
    );
  }

  public premiumPaymentTermSuccess(successData) {
    if (successData.IsSuccess) {
      this.premiumPayment = successData.ResponseObject;
    }
    else {
      this.toastr.error(successData.ErrorObject);
    }
  }

  public premiumPaymentTermFailure(error) {
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

  geteAlcoholDetails() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.termService.alcoholDetailsEdelweiss(data).subscribe(
        (successData) => {
          this.setAlcoholDetailsSuccess(successData);
        },
        (error) => {
          this.setAlcoholDetailsFailure(error);
        }
    );
  }

  public setAlcoholDetailsSuccess(successData) {
    if (successData.IsSuccess == true) {
      this.eAlcoholDetails = successData.ResponseObject;
    }


  }
  public setAlcoholDetailsFailure(error) {
  }

  geteTobaccoDetail() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.termService.tobaccoDetailEdelweiss(data).subscribe(
        (successData) => {
          this.setTobaccoDetailSuccess(successData);
        },
        (error) => {
          this.setTobaccoDetailFailure(error);
        }
    );
  }

  public setTobaccoDetailSuccess(successData) {
    if (successData.IsSuccess == true) {
      this.eTobaccoDetails = successData.ResponseObject;
    }


  }
  public setTobaccoDetailFailure(error) {
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

  edelweissPrimium() {
    const data = {
      "user_id": this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      "role_id": this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      "pos_status":  this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
      "platform": "web",
      "product_id": this.lifePremiumList.product_id,
      "sub_product_id": this.lifePremiumList.sub_product_id,
      "term": this.lifePremiumList.termDetrails,
      "suminsured_amount": sessionStorage.selectedAmountTravel,
      "policy_id": this.getEnquiryDetials.policy_id,
      "productDetails":{
        "policyTerm": this.lifePremiumList.termDetrails,
        "premiumPayingTerm":this.lifePremiumList.premium_paying_term,
        "frequency":this.enquiryFromDetials.payment_mode,
        "sumAssured": sessionStorage.selectedAmountTravel,
        "planOption": '',
        "riderDetails": {
          "workSiteFlag": 'N',
          "investmentStrategy":'',
          "risingStar":'N',
          "policyOption":'',
          "additionalBenefit":'',
          "topUpBenefit": {
            "isTopUpBenefit": '',
            "topUpBenefitPercentage":'',
            "topUpRate": '',
          },
          "betterHalf": {
            "betterHalfBenefit":this.addon.controls['betterHalfBenefit'].value,
            "sumAssured": this.addon.controls['betterHalfsumAssured'].value,
          },
          "WOP": {
            "waiverOfPremiumBenefit": this.addon.controls['waiverOfPremiumBenefit'].value ,
          },
          "CI": {
            "criticalIllness": this.addon.controls['criticalIllness'].value,
            "sumAssured":this.addon.controls['criticalsumAssured'].value,
          },
          "ADB": {
            "isADB": this.addon.controls['isADB'].value,
            "sumAssured": this.addon.controls['sumAssuredADB'].value,
          },
          "ATPD": {
            "isATPD": this.addon.controls['isATPD'].value,
            "sumAssured": this.addon.controls['sumAssuredATPD'].value,
          },
          "HCB": {
            "isHCB": this.addon.controls['isHCB'].value,
            "sumAssured": this.addon.controls['sumAssuredHCB'].value,
          }
        },
        "DeathBenefitOptions": {
          "payoutOption": "",
          "payoutPercentageIncome":'',
          "noOfMonths": '',
        }
      },
      "isLAProposerSame":"",


      "LifeAssured": {
        "title": this.customerDetails.controls['title'].value,
        "firstName": this.customerDetails.controls['firstName'].value,
        "middleName": '',
        "lastName": this.customerDetails.controls['lastName'].value,
        "dob": this.datepipe.transform(this.customerDetails.controls['dob'].value, 'y-MM-dd'),
        "gender": '',
        "isSmoker":this.customerDetails.controls['isSmoker'].value,
        "maritalStatus": this.customerDetails.controls['maritalStatus'].value,
        "pan": '',
        "maidName":"",
        "motherMaidName":"",
        "FHName":'',
        "nationality":'',
        "otherNationality":"",
        "ageProofId":'',
        "emailId":this.customerDetails.controls['emailId'].value,
        "phoneNo":this.customerDetails.controls['mobileNo'].value,
      },
      "Spouse": {
        "title":'',
        "firstName":this.addon.controls['sfirstName'].value,
        "middleName":'',
        "lastName":this.addon.controls['slastName'].value,
        "dob":this.datepipe.transform(this.addon.controls['sdob'].value, 'y-MM-dd'),
        "emailId":'',
        "phoneNo":'',
        "isSmoker":this.addon.controls['isSmokerSpouse'].value,

      }

    }

    this.termService.edelweissPrimium(data).subscribe(
        (successData) => {
          this.edelweissPrimiumSuccess(successData);

        },
        (error) => {
          this.edelweissPrimiumFailure(error);
        }
    );
  }

  public edelweissPrimiumSuccess(successData) {
    if (successData.ResponseObject) {
      this.eePremiumTerm = successData.ResponseObject;
      // this.eePremiumTerm = this.eePremiumTerm;
      this.ADB = this.eePremiumTerm.accidental_death_premium;

      this.sum = this.eePremiumTerm.sumAssured;
      this.basePremium = this.eePremiumTerm.Basepremium;
      this.premium = this.eePremiumTerm.Premium;
      this.PDP = this.eePremiumTerm.permanent_disability_premium;
      this.PW = this.eePremiumTerm.premium_waiver;
      this.CIP = this.eePremiumTerm.critical_illness_premium;
      this.BhP = this.eePremiumTerm.better_half_premium;
      this.hcp = this.eePremiumTerm.hcb_premium;
      this.planname = this.eePremiumTerm.planName;
      this.payingTerm = this.eePremiumTerm.payingTerm;
      this.policyTerm = this.eePremiumTerm.policyTerm;
      this.better_half_sum_assured = this.eePremiumTerm.better_half_sum_assured;
      this.hcb_sumassured_min = this.eePremiumTerm.hcb_sumassured_min;
      this.hcb_sumassured_max = this.eePremiumTerm.hcb_sumassured_max;
      this.betterhalf();
      console.log(this.ADB,'this.ADB');
      console.log(this.eePremiumTerm,'this.this.eePremiumTerm');
      console.log(this.sum,'this.sum');
      console.log(this.basePremium,'this.basePremium');
      console.log(this.premium,'this.premium');
      console.log(this.PDP,'this.PDP');
      console.log(this.PW,'this.PW');
      console.log(this.CIP,'this.CIP');
      console.log(this.BhP,'this.BhP');
      console.log(this.hcp,'this.hcp');
      console.log(this.planname,'this.planName');
      console.log(this.payingTerm,'this.payingTerm');
      console.log(this.policyTerm,'this.policyTerm');
      console.log(this.hcb_sumassured_max,'this.hcb_sumassured_max');
      console.log(this.hcb_sumassured_min,'this.hcb_sumassured_min');

    }
    else {
      this.toastr.error(successData.ErrorObject);
    }

  }

  public edelweissPrimiumFailure(error) {
  }
  betterhalf(){
    this.addon.controls['betterHalfsumAssured'].patchValue(this.better_half_sum_assured );
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
    else {
      this.toastr.error(successData.ErrorObject);
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

  getepolicyStatus() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.getepolicyStatus(data).subscribe(
        (successData) => {
          this.getepolicyStatusSuccess(successData);
        },
        (error) => {
          this.getepolicyStatusFailure(error);
        }
    );
  }

  public getepolicyStatusSuccess(successData) {
    if (successData.IsSuccess) {
      this.ePolicyStatus = successData.ResponseObject;
    }
  }
  public getepolicyStatusFailure(error) {
  }

  geteAcceptanceTerm() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.geteacceptanceTerm(data).subscribe(
        (successData) => {
          this.geteacceptanceTermSuccess(successData);
        },
        (error) => {
          this.geteacceptanceTermFailure(error);
        }
    );
  }

  public geteacceptanceTermSuccess(successData) {
    if (successData.IsSuccess) {
      this.eAcceptanceTerm = successData.ResponseObject;
    }
  }

  public geteacceptanceTermFailure(error) {
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
  getpayoutMonth() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.getepayoutMonthOption(data).subscribe(
        (successData) => {
          this.getpayoutMonthSuccess(successData);
        },
        (error) => {
          this.getpayoutMonthFailure(error);
        }
    );
  }

  public getpayoutMonthSuccess(successData) {
    if (successData.IsSuccess) {
      this.epayoutMonth = successData.ResponseObject;
    }
  }

  public getpayoutMonthFailure(error) {
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

  getHealthStaus() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.geteHealthStaus(data).subscribe(
        (successData) => {
          this.geteHealthStausSuccess(successData);
        },
        (error) => {
          this.geteHealthStausFailure(error);
        }
    );
  }

  public geteHealthStausSuccess(successData) {
    if (successData.IsSuccess) {
      this.ehealthStatus = successData.ResponseObject;
    }
  }

  public geteHealthStausFailure(error) {
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

  getedelweissActivities() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.edelweissActivities(data).subscribe(
        (successData) => {
          this.getedelweissActivitiesSuccess(successData);
        },
        (error) => {
          this.getedelweissActivitiesFailure(error);
        }
    );
  }

  public getedelweissActivitiesSuccess(successData) {
    if (successData.IsSuccess) {
      this.eAdActivity = successData.ResponseObject;
    }
  }

  public getedelweissActivitiesFailure(error) {
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
    console.log(this.eNomineeRelation,'this.eNomineeRelation')
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

  getProposalNext(stepper) {
    const data = {
      // 'platform': 'web',
      // 'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      // 'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      // 'pos_status': '0',
      // 'policy_id': this.getEnquiryDetials.policy_id
      "user_id": this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      "role_id": this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      "pos_status": this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
      "platform": "web",
      "product_id": "112",
      "policy_id": this.getEnquiryDetials.policy_id,
      "transaction_id":this.summaryData.receipt_no,
      "policy_no":this.summaryData.policy_no,
    };
    this.settings.loadingSpinner = true;
    this.termService.edelweissDownloadPdf(data).subscribe(
        (successData) => {
          this.ProposalNextSuccess(successData,stepper);
        },
        (error) => {
          this.ProposalNextFailure(error);
        }
    );
  }

  public ProposalNextSuccess(successData,stepper) {
    this.settings.loadingSpinner = false;
    if (successData.IsSuccess) {
      // this.toastr.success(successData.ResponseObject);

      stepper.next();
      this.topScroll();
      this.proposalGenStatus = false;
      this.proposalNextList = successData.ResponseObject;
      // this.proposalFormPdf = this.proposalNextList.path;
      // console.log(this.proposalFormPdf,'this.proposalFormPdf....');
      let dialogRef = this.dialog.open(EdelweissOpt, {
        width: '400px'
      });
      dialogRef.disableClose = true;
      dialogRef.afterClosed().subscribe(result => {
        console.log(result,'result....')
        if(result==true) {
          this.otpFalseError=false
          // this.proposalFormPdf = this.proposalNextList.path;
          this.proposalFormPdf = (this.webhost + '/' + this.proposalNextList.path);
          console.log(this.proposalFormPdf,'this.proposalFormPdf....');
        }else if(result==false){
          this.otpFalseError=true
        }

      });

    } else {
      this.proposalGenStatus = true;
      this.toastr.error(successData.ErrorObject);

    }
  }
  public ProposalNextFailure(error) {
    this.settings.loadingSpinner = false;
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

  //     getProposalNext(stepper) {
  //         const data = {
  //             'platform': 'web',
  //             'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
  //             'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
  //             'pos_status': '0',
  //             'policy_id': this.getEnquiryDetials.policy_id
  //         };
  //         this.settings.loadingSpinner = true;
  //         this.termService.getProposalNext(data).subscribe(
  //             (successData) => {
  //                 this.ProposalNextSuccess(successData,stepper);
  //             },
  //             (error) => {
  //                 this.ProposalNextFailure(error);
  //             }
  //         );
  //     }
  //
  //     public ProposalNextSuccess(successData,stepper) {
  //         this.settings.loadingSpinner = false;
  //     if (successData.IsSuccess) {
  //         // this.toastr.success(successData.ResponseObject);
  //
  //         stepper.next();
  //         this.topScroll();
  //         this.proposalGenStatus = false;
  //         this.proposalNextList = successData.ResponseObject;
  //         this.proposalFormPdf = this.proposalNextList.proposal_form;
  //         // this.otpGen();
  //     } else {
  //         this.proposalGenStatus = true;
  //         this.toastr.error(successData.ErrorObject);
  //
  //     }
  // }
  // public ProposalNextFailure(error) {
  //     this.settings.loadingSpinner = false;
  // }

  // otpGen() {
  //     const data = {
  //         'platform': 'web',
  //         'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
  //         'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
  //         'policy_id':this.getEnquiryDetials.policy_id,
  //
  //     }
  //     this.termService.otpGeneration(data).subscribe(
  //         (successData) => {
  //             this.otpGenerationlListSuccess(successData);
  //         },
  //         (error) => {
  //             this.otpGenerationListFailure(error);
  //         }
  //     );
  // }
  //
  // public otpGenerationlListSuccess(successData) {
  //     if (successData.IsSuccess) {
  //         this.toastr.success(successData.ResponseObject);
  //         this.optGenStatus = false;
  //         this.otpGenList = successData.ResponseObject;
  //
  //         let dialogRef = this.dialog.open(EdelweissOpt, {
  //             width: '1200px'
  //         });
  //         dialogRef.disableClose = true;
  //         dialogRef.afterClosed().subscribe(result => {
  //             if(result) {
  //
  //             }
  //
  //         });
  //
  //     } else {
  //         this.optGenStatus = true;
  //         this.toastr.error(successData.ErrorObject);
  //     }
  // }
  //
  // public otpGenerationListFailure(error) {
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
        stitleName: this.getStepper1.stitleName,
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
        // motherMaidName: this.getStepper1.motherMaidName,
        aadhaarNo: this.getStepper1.aadhaarNo,
        fatherhusbandName: this.getStepper1.fatherhusbandName,
        ageProofId: this.getStepper1.ageProofId,
        ageProofIdName: this.getStepper1.ageProofIdName,
        highestQualification: this.getStepper1.highestQualification,
        highestQualificationName: this.getStepper1.highestQualificationName,
        shighestQualificationName: this.getStepper1.shighestQualificationName,
        otherQualification: this.getStepper1.otherQualification,
        mobileNo: this.getStepper1.mobileNo,
        isStaff: this.getStepper1.isStaff,
        employeeCode: this.getStepper1.employeeCode,
        sisCurrPerAddrSame: this.getStepper1.sisCurrPerAddrSame,
        // stitle: this.getStepper1.stitle,
        // sfirstName: this.getStepper1.sfirstName,
        // smidName: this.getStepper1.smidName,
        // slastName: this.getStepper1.slastName,
        // sdob: this.datepipe.transform(this.getStepper1.sdob, 'y-MM-dd'),
        // semailId: this.getStepper1.semailId,
        // smobileNo: this.getStepper1.smobileNo,
        // isSmokerSpouse: this.getStepper1.isSmokerSpouse,
        // isStaffSpouse: this.getStepperper1.isStaffSpouse,
        employeeCodeSpouse: this.getStepper1.employeeCodeSpouse,
        relationSpouseProposer: this.getStepper1.relationSpouseProposer,
        relationSpouseProposerName: this.getStepper1.relationSpouseProposerName,
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

    if (sessionStorage.stepperCustomerDetails != '' && sessionStorage.stepperCustomerDetails != undefined) {
      this.getSteppercustomer = JSON.parse(sessionStorage.stepperCustomerDetails);
      this.customerDetails = this.fb.group({

        title: this.getSteppercustomer.title,
        titleName: this.getSteppercustomer.titleName,
        stitleName: this.getSteppercustomer.stitleName,
        firstName: this.getSteppercustomer.firstName,
        lastName: this.getSteppercustomer.lastName,
        dob: this.datepipe.transform(this.getSteppercustomer.dob, 'y-MM-dd'),
        maritalStatus: this.getSteppercustomer.maritalStatus,
        maritalStatusName: this.getSteppercustomer.maritalStatusName,
        emailId: this.getSteppercustomer.emailId,
        mobileNo: this.getSteppercustomer.mobileNo,
        annualIncome: this.getSteppercustomer.annualIncome,
        isSmoker: this.getSteppercustomer.isSmoker,

      });

    }
    if (sessionStorage.stepperAddonDetails != '' && sessionStorage.stepperAddonDetails != undefined) {
      this.getStepperaddon = JSON.parse(sessionStorage.stepperAddonDetails);
      this.addon = this.fb.group({

        additionalBenefit: this.getStepperaddon.additionalBenefit,
        TopUpBenefit:  this.getStepperaddon.TopUpBenefit,
        topUpBenefitPercentage:  this.getStepperaddon.topUpBenefitPercentage,
        topUpRate:  this.getStepperaddon.topUpRate,
        betterHalfBenefit:  this.getStepperaddon.betterHalfBenefit,
        betterHalfsumAssured:  this.getStepperaddon.betterHalfsumAssured,
        waiverOfPremiumBenefit: this.getStepperaddon.waiverOfPremiumBenefit,
        DSumAssured: this.getStepperaddon.DSumAssured,
        criticalIllness:  this.getStepperaddon.criticalIllness,
        // criticalClaim:  this.getStepperaddon.criticalClaim,
        criticalsumAssured: this.getStepperaddon.criticalsumAssured,
        isADB:  this.getStepperaddon.isADB,
        sumAssuredADB:  this.getStepperaddon.sumAssuredADB,
        isATPD:  this.getStepperaddon.isATPD,
        sumAssuredATPD:  this.getStepperaddon.sumAssuredATPD,
        isHCB:  this.getStepperaddon.isHCB,
        sfirstName: this.getStepperaddon.sfirstName,
        slastName: this.getStepperaddon.slastName,
        isSmokerSpouse: this.getStepperaddon.isSmokerSpouse,
        sdob: this.getStepperaddon.sdob,


      });

    }
    console.log(this.proposer, 'stepper1');

    if (sessionStorage.stepper2Details != '' && sessionStorage.stepper2Details != undefined) {
      this.getStepper2 = JSON.parse(sessionStorage.stepper2Details);
      this.insureArray = this.fb.group({

        // investing: this.getStepper2.investing,
        title: this.getStepper2.title,
        titleName: this.getStepper2.titleName,

        stitleName: this.getStepper2.stitleName,
        activity: this.getStepper2.activity,
        adventurousActivitiesName: this.getStepper2.adventurousActivitiesName,
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
        sisCurrPerAddrSame: this.getStepper2.sisCurrPerAddrSame,
        ageProofId: this.getStepper2.ageProofId,
        ageProofIdName: this.getStepper2.ageProofIdName,
        highestQualification: this.getStepper2.highestQualification,
        highestQualificationName: this.getStepper2.highestQualificationName,
        shighestQualificationName: this.getStepper2.shighestQualificationName,
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
        sppan: this.getStepper2.sppan,
        saadhaarNo: this.getStepper2.saadhaarNo,
        sfatherhusbandName: this.getStepper2.sfatherhusbandName,
        smotherMaidName: this.getStepper2.smotherMaidName,
        sageProofId: this.getStepper2.sageProofId,
        shighestQualification: this.getStepper2.shighestQualification,
        sotherQualification: this.getStepper2.sotherQualification,
        scurrAddr1: this.getStepper2.scurrAddr1,
        scurrAddr2: this.getStepper2.scurrAddr2,
        scurrAddr3: this.getStepper2.scurrAddr3,
        scurrCity: this.getStepper2.scurrCity,
        scurrPincode: this.getStepper2.scurrPincode,
        scurrState: this.getStepper2.scurrState,
        sperAddr1: this.getStepper2.sperAddr1,
        sperAddr2: this.getStepper2.sperAddr2,
        sperAddr3: this.getStepper2.sperAddr3,
        sperCity: this.getStepper2.sperCity,
        sperPincode: this.getStepper2.sperPincode,
        sperState: this.getStepper2.sperState,
        sheightFeets: this.getStepper2.sheightFeets,
        sheightInches: this.getStepper2.sheightInches,
        sweight: this.getStepper2.sweight,
        shasWeightChanged: this.getStepper2.shasWeightChanged,
        sinbetweenweight: this.getStepper2.sinbetweenweight,
        sweightChangedreason: this.getStepper2.sweightChangedreason,
        // isStaffSpouse: this.getStepper2.isStaffSpouse,
        employeeCodeSpouse: this.getStepper2.employeeCodeSpouse,
        // relationSpouseInsurer: this.getStepper2.relationSpouseInsurer,
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
        motherMaidName: this.getStepper2.motherMaidName,
        // : this.getStepper2.Cover,
        // ageTillCoverd: this.getStepper2.ageTillCoverd,Cover
        // premiumPay: this.getStepper2.premiumPay,
        // modeOfPremium: this.getStepper2.modeOfPremium,
        isCriminal: this.getStepper2.isCriminal,
        criminalDetails: this.getStepper2.criminalDetails,
        identityProof: this.getStepper2.identityProof,
        identityProofName: this.getStepper2.identityProofName,
        categorization: this.getStepper2.categorization,

        addrProof: this.getStepper2.addrProof,
        addrProofName: this.getStepper2.addrProofName,
        relationSpouseInsurerName: this.getStepper2.relationSpouseInsurerName,
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
        // planOption:  this.getStepper2.planOption,
        workSiteFlag:  this.getStepper2.workSiteFlag,
        // investmentStrategy: this.getStepper2.investmentStrategy,
        risingStar:  this.getStepper2.risingStar,
        policyOption:  this.getStepper2.policyOption,
        // additionalBenefit: this.getStepper2.additionalBenefit,
        // TopUpBenefit:  this.getStepper2.TopUpBenefit,
        // topUpBenefitPercentage:  this.getStepper2.topUpBenefitPercentage,
        // topUpRate:  this.getStepper2.topUpRate,
        // betterHalfBenefit:  this.getStepper2.betterHalfBenefit,
        // betterHalfsumAssured:  this.getStepper2.betterHalfsumAssured,
        // waiverOfPremiumBenefit: this.getStepper2.waiverOfPremiumBenefit,
        // DSumAssured: this.getStepper2.DSumAssured,
        // criticalIllness:  this.getStepper2.criticalIllness,
        // criticalClaim:  this.getStepper2.criticalClaim,
        // criticalsumAssured: this.getStepper2.criticalsumAssured,
        // isADB:  this.getStepper2.isADB,
        // sumAssuredADB:  this.getStepper2.sumAssuredADB,
        // isATPD:  this.getStepper2.isATPD,
        // sumAssuredATPD:  this.getStepper2.sumAssuredATPD,
        // isHCB:  this.getStepper2.isHCB,
        // sumAssuredHCB: this.getStepper2.sumAssuredHCB,
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
      for (let i=0; i < getMedicalDetail.medicalFamilyQuestions.length; i++) {
        // console.log(getMedicalDetail.medicalFamilyQuestions,'444444444')
        if ( i !=  0) {
          this.addFamilyItems();
          this.medicalDetail['controls'].medicalFamilyQuestions['controls'][i]['controls'].relation.patchValue(getMedicalDetail.medicalFamilyQuestions[i].relation);
          this.medicalDetail['controls'].medicalFamilyQuestions['controls'][i]['controls'].age.patchValue(getMedicalDetail.medicalFamilyQuestions[i].age);
          this.medicalDetail['controls'].medicalFamilyQuestions['controls'][i]['controls'].healthStatus.patchValue(getMedicalDetail.medicalFamilyQuestions[i].healthStatus);
          this.medicalDetail['controls'].medicalFamilyQuestions['controls'][i]['controls'].relationName.patchValue(getMedicalDetail.medicalFamilyQuestions[i].relationName);

        } else if (i == 0) {

          this.medicalDetail['controls'].medicalFamilyQuestions['controls'][i]['controls'].relation.patchValue(getMedicalDetail.medicalFamilyQuestions[i].relation);
          this.medicalDetail['controls'].medicalFamilyQuestions['controls'][i]['controls'].age.patchValue(getMedicalDetail.medicalFamilyQuestions[i].age);
          this.medicalDetail['controls'].medicalFamilyQuestions['controls'][i]['controls'].healthStatus.patchValue(getMedicalDetail.medicalFamilyQuestions[i].healthStatus);

        }
      }

      this.medicalDetail.controls['healthInformation'].patchValue(getMedicalDetail.healthInformation);

      this.medicalDetail.controls['travelOutsideIndia'].patchValue(getMedicalDetail.travelOutsideIndia);
      this.medicalDetail.controls['pilot'].patchValue(getMedicalDetail.pilot);
      this.medicalDetail.controls['activity'].patchValue(getMedicalDetail.activity);
      this.medicalDetail.controls['adventurousActivities'].patchValue(getMedicalDetail.adventurousActivities);
      this.medicalDetail.controls['adventurousActivitiesDetails'].patchValue(getMedicalDetail.adventurousActivitiesDetails);
      this.medicalDetail.controls['drugsInd'].patchValue(getMedicalDetail.drugsInd);
      this.medicalDetail.controls['drugsDetails'].patchValue(getMedicalDetail.drugsDetails);
      this.medicalDetail.controls['alcoholInd'].patchValue(getMedicalDetail.alcoholInd);
      this.medicalDetail.controls['alcoholDetails'].patchValue(getMedicalDetail.alcoholDetails);
      this.medicalDetail.controls['alcoholBeer'].patchValue(getMedicalDetail.alcoholBeer);
      this.medicalDetail.controls['alcoholliquar'].patchValue(getMedicalDetail.alcoholliquar);
      this.medicalDetail.controls['alcoholWine'].patchValue(getMedicalDetail.alcoholWine);
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
      this.medicalDetail.controls['isHospitalized'].patchValue(getMedicalDetail.isHospitalized);
      this.medicalDetail.controls['hospitalizedDate'].patchValue(getMedicalDetail.hospitalizedDate);
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
      this.medicalDetail.controls['isRecovered'].patchValue(getMedicalDetail.isRecovered);
      this.medicalDetail.controls['nonRecoveryDetails'].patchValue(getMedicalDetail.nonRecoveryDetails);
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

      this.medicalDetail.controls['healthInformation1'].patchValue(getMedicalDetail.healthInformation1);

      //     this.medicalDetail.controls['travelOutsideIndia1'].patchValue(getMedicalDetail.travelOutsideIndia1);
      //     this.medicalDetail.controls['pilot1'].patchValue(getMedicalDetail.pilot1);
      //     this.medicalDetail.controls['activity1'].patchValue(getMedicalDetail.activity1);
      //     this.medicalDetail.controls['adventurousActivities1'].patchValue(getMedicalDetail.adventurousActivities1);
      //     this.medicalDetail.controls['adventurousActivitiesDetails1'].patchValue(getMedicalDetail.adventurousActivitiesDetails1);
      //     this.medicalDetail.controls['drugsInd1'].patchValue(getMedicalDetail.drugsInd1);
      //     this.medicalDetail.controls['drugsDetails1'].patchValue(getMedicalDetail.drugsDetails1);
      //     this.medicalDetail.controls['alcoholInd1'].patchValue(getMedicalDetail.alcoholInd1);
      //     this.medicalDetail.controls['alcoholDetails1'].patchValue(getMedicalDetail.alcoholDetails1);
      //     this.medicalDetail.controls['alcoholBeer1'].patchValue(getMedicalDetail.alcoholBeer1);
      //     this.medicalDetail.controls['alcoholliquar1'].patchValue(getMedicalDetail.alcoholliquar1);
      //     this.medicalDetail.controls['alcoholWine1'].patchValue(getMedicalDetail.alcoholWine1);
      //     this.medicalDetail.controls['tobaccoInd1'].patchValue(getMedicalDetail.tobaccoInd1);
      //     this.medicalDetail.controls['tobaccoDetails1'].patchValue(getMedicalDetail.tobaccoDetails1);
      //     this.medicalDetail.controls['tobaccoStopInd1'].patchValue(getMedicalDetail.tobaccoStopInd1);
      //     this.medicalDetail.controls['tobaccoStopDetails1'].patchValue(getMedicalDetail.tobaccoStopDetails1);
      //     this.medicalDetail.controls['consultDoctorInd1'].patchValue(getMedicalDetail.consultDoctorInd1);
      //     this.medicalDetail.controls['consultDoctorDetails1'].patchValue(getMedicalDetail.consultDoctorDetails1);
      //     this.medicalDetail.controls['ECGInd1'].patchValue(getMedicalDetail.ECGInd1);
      //     this.medicalDetail.controls['ECGDetails1'].patchValue(getMedicalDetail.ECGDetails1);
      //     this.medicalDetail.controls['admitInd1'].patchValue(getMedicalDetail.admitInd1);
      //     this.medicalDetail.controls['admitDetails1'].patchValue(getMedicalDetail.admitDetails1);
      //     this.medicalDetail.controls['medicalTreatment1'].patchValue(getMedicalDetail.medicalTreatment1);
      //     this.medicalDetail.controls['medicationDetails1'].patchValue(getMedicalDetail.medicationDetails1);
      //     this.medicalDetail.controls['receivedTreatment11'].patchValue(getMedicalDetail.receivedTreatment11);
      // this.medicalDetail.controls['diagnosedDetails1'].patchValue(getMedicalDetail.diagnosedDetails1);
      // this.medicalDetail.controls['heartDieaseInd1'].patchValue(getMedicalDetail.heartDieaseInd1);
      // this.medicalDetail.controls['heartDieaseDetails1'].patchValue(getMedicalDetail.heartDieaseDetails1);
      // this.medicalDetail.controls['isHospitalized1'].patchValue(getMedicalDetail.isHospitalized1);
      // this.medicalDetail.controls['hospitalizedDate1'].patchValue(getMedicalDetail.hospitalizedDate1);
      // this.medicalDetail.controls['respiratoryDieaseInd1'].patchValue(getMedicalDetail.respiratoryDieaseInd1);
      // this.medicalDetail.controls['respiratoryDieaseDetails1'].patchValue(getMedicalDetail.respiratoryDieaseDetails1);
      // this.medicalDetail.controls['diabetesInd1'].patchValue(getMedicalDetail.diabetesInd1);
      // this.medicalDetail.controls['diabetesDetails1'].patchValue(getMedicalDetail.diabetesDetails1);
      // this.medicalDetail.controls['kidneyDieaseInd1'].patchValue(getMedicalDetail.kidneyDieaseInd1);
      // this.medicalDetail.controls['kidneyDieaseDetails1'].patchValue(getMedicalDetail.kidneyDieaseDetails1);
      // this.medicalDetail.controls['digestiveDieaseInd1'].patchValue(getMedicalDetail.digestiveDieaseInd1);
      // this.medicalDetail.controls['digestiveDieaseDetails1'].patchValue(getMedicalDetail.digestiveDieaseDetails1);
      // this.medicalDetail.controls['cancerDieaseInd1'].patchValue(getMedicalDetail.cancerDieaseInd1);
      // this.medicalDetail.controls['cancerDieaseDetails1'].patchValue(getMedicalDetail.cancerDieaseDetails1);
      // this.medicalDetail.controls['tropicalDieaseInd1'].patchValue(getMedicalDetail.tropicalDieaseInd1);
      // this.medicalDetail.controls['tropicalDieaseDetails1'].patchValue(getMedicalDetail.tropicalDieaseDetails1);
      // this.medicalDetail.controls['thyroidDieaseInd1'].patchValue(getMedicalDetail.thyroidDieaseInd1);
      // this.medicalDetail.controls['thyroidDieaseDetails1'].patchValue(getMedicalDetail.thyroidDieaseDetails1);
      // this.medicalDetail.controls['bloodDieaseInd1'].patchValue(getMedicalDetail.bloodDieaseInd1);
      // this.medicalDetail.controls['bloodDieaseDetails1'].patchValue(getMedicalDetail.bloodDieaseDetails1);
      // this.medicalDetail.controls['nervousDieaseInd1'].patchValue(getMedicalDetail.nervousDieaseInd1);
      // this.medicalDetail.controls['nervousDieaseDetails1'].patchValue(getMedicalDetail.nervousDieaseDetails1);
      // this.medicalDetail.controls['isRecovered1'].patchValue(getMedicalDetail.isRecovered1);
      // this.medicalDetail.controls['nonRecoveryDetails1'].patchValue(getMedicalDetail.nonRecoveryDetails1);
      // this.medicalDetail.controls['muscleDieaseInd1'].patchValue(getMedicalDetail.muscleDieaseInd1);
      // this.medicalDetail.controls['muscleDieaseDetails1'].patchValue(getMedicalDetail.muscleDieaseDetails1);
      // this.medicalDetail.controls['receivedTreatment21'].patchValue(getMedicalDetail.receivedTreatment21);
      // this.medicalDetail.controls['aidsDetails1'].patchValue(getMedicalDetail.aidsDetails1);
      // this.medicalDetail.controls['alcoholicInd1'].patchValue(getMedicalDetail.alcoholicInd1);
      // this.medicalDetail.controls['alcoholicDetails1'].patchValue(getMedicalDetail.alcoholicDetails1);
      // this.medicalDetail.controls['otherIllnessInd1'].patchValue(getMedicalDetail.otherIllnessInd1);
      // this.medicalDetail.controls['otherIllnessDetails1'].patchValue(getMedicalDetail.otherIllnessDetails1);
      // this.medicalDetail.controls['deformityInd1'].patchValue(getMedicalDetail.deformityInd1);
      // this.medicalDetail.controls['deformityDetails1'].patchValue(getMedicalDetail.deformityDetails1);
      // this.medicalDetail.controls['symptomsInd1'].patchValue(getMedicalDetail.symptomsInd1);
      // this.medicalDetail.controls['symptomsDetails1'].patchValue(getMedicalDetail.symptomsDetails1);
      // this.medicalDetail.controls['pregnantInd1'].patchValue(getMedicalDetail.pregnantInd1);
      // this.medicalDetail.controls['pregnantweeks1'].patchValue(getMedicalDetail.pregnantweeks1);
      // this.medicalDetail.controls['femaleDieaseInd1'].patchValue(getMedicalDetail.femaleDieaseInd1);
      // // this.medicalDetail.controls['femaleDieaseWeeks1'].patchValue(getMedicalDetail.femaleDieaseWeeks1);


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
        this.bankDetail['controls'].existingInsurance['controls'][i]['controls'].acceptanceTerm.patchValue(getStepper4.existingInsurance[i].acceptanceTerm);
      }

      this.bankDetail.controls['accountNo'].patchValue(getStepper4.accountNo);
      this.bankDetail.controls['accName'].patchValue(getStepper4.accName);
      this.bankDetail.controls['name'].patchValue(getStepper4.name);
      this.bankDetail.controls['location'].patchValue(getStepper4.location);
      this.bankDetail.controls['ifscCode'].patchValue(getStepper4.ifscCode);
      // this.bankDetail.controls['investmentStrategy'].patchValue(getStepper4.investmentStrategy);

      console.log(this.bankDetail,'bankDetail');
    }

    console.log(this.bankDetail, " stepper4 ");

  }
  changeTitle() {

    this.proposer.controls['titleName'].patchValue(this.etitle[this.proposer.controls['title'].value]);
  }
  changeSpoTitle() {

    this.proposer.controls['stitleName'].patchValue(this.etitle[this.proposer.controls['stitle'].value]);
  }
  changeTitle1() {
    this.insureArray.controls['titleName'].patchValue(this.etitle[this.insureArray.controls['title'].value]);
  }

  changeTitle1s() {
    this.insureArray.controls['title'].patchValue(this.etitle[this.customerDetails.controls['title'].value]);
  }
  changeFirstname() {
    this.insureArray.controls['firstName'].patchValue(this.customerDetails.controls['firstName'].value);
  }
  changeSpoTitles() {
    this.addon.controls['stitleName'].patchValue(this.etitle[this.addon.controls['stitle'].value]);
  }
  changeSpoTitle1() {
    this.insureArray.controls['stitleName'].patchValue(this.etitle[this.insureArray.controls['stitle'].value]);
  }
  isadventurousName() {
    this.medicalDetail.controls['adventurousActivitiesName'].patchValue(this.eAdActivity[this.medicalDetail.controls['adventurousActivities'].value]);
    console.log(this.medicalDetail.controls['adventurousActivities'].value,'adventurousActivities1111111')
    console.log(this.medicalDetail.controls['adventurousActivitiesName'].value,'adventurousActivitiesName1111111')
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
  squalificationName() {
    this.insureArray.controls['shighestQualificationName'].patchValue(this.eQualification[this.insureArray.controls['shighestQualification'].value]);
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
  geteFamRelationshipName(i) {
    this.medicalDetail['controls'].medicalFamilyQuestions['controls'][i]['controls'].relationName.patchValue(this.eNomineeRelation[this.medicalDetail['controls'].medicalFamilyQuestions['controls'][i]['controls'].relation.value] );
  }
  geteSpouseeRelationName() {
    this.proposer.controls['relationSpouseProposerName'].patchValue(this.eNomineeRelation[this.proposer.controls['relationSpouseProposer'].value]);

  }
  geteSpouseeRelationInsureName() {
    this.insureArray.controls['relationSpouseInsurerName'].patchValue(this.eNomineeRelation[this.insureArray.controls['relationSpouseInsurer'].value]);
    console.log(this.eNomineeRelation,'changre');
    console.log(this.insureArray.controls['relationSpouseInsurerName'],'5555555555555');
    console.log(this.insureArray.controls['relationSpouseInsurerName'].value,'6666');
    console.log(this.insureArray.controls['relationSpouseInsurer'].value,'888888888888888888');
  }



}
@Component({
  selector: ' edelweissopt ',
  template: `
    <div class="col-md-12 text-right" style="margin-left: 20px;
    margin-bottom: 10px;
    margin-top: -8px;
" >
      <i class="material-icons" (click)="close()" style="cursor: pointer">
        cancel
      </i>
    </div>
        <div class="container">
            <div class="row">
                <div class="col-md-12 text-center w-100">
                    <mat-form-field class="w-50">
                        <input matInput placeholder="OTP"  [(ngModel)]="otpCode" maxlength="6"  (keypress)="numberValidate($event)"  autocomplete="off" >
                    </mat-form-field>
                </div>
                <!--<div class="col-md-12">-->
                    <!--<div class="proposal-buttom mb-3 text-center w-100">-->
                        <!--<button mat-raised-button color="primaryBlue" (click)="otpVal(stepper)">Submit</button>-->
                    <!--</div>-->
                <!--</div>-->
            </div>
        </div>
        <div mat-dialog-actions style="justify-content: center">
          <!--<button mat-button class="secondary-bg-color"  style="background-color: darkblue; color: white;" (click)="onNoClick()">Back</button>-->
          <!--<button mat-button class="secondary-bg-color" (click)="resendOPT();clearOtp()">Resend</button>-->
          <!--<button mat-button class="secondary-bg-color" (click)="otpEdVal()">Ok</button>-->

          <button mat-raised-button style="background-color: darkblue; color: white;" (click)="resendOPT();clearOtp()">Resend</button>
          <button mat-raised-button style="background-color: darkblue; color: white;" (click)="otpEdVal()">Ok</button>

        </div>
    `
})
export class EdelweissOpt {
  otpCode: any;
  receiptNo: any;
  summaryData: any;
  getEnquiryDetials: any;
  enquiryFormData: any;
  lifePremiumList: any;
  settings: any;
  constructor(
      public dialogRef: MatDialogRef<EdelweissOpt>,
      @Inject(MAT_DIALOG_DATA) public data: any, public route: ActivatedRoute,  public common: CommonService, public validation: ValidationService, public appSettings: AppSettings, private toastr: ToastrService, public config: ConfigurationService, public authservice: AuthService, public termService: TermLifeCommonService) {
    this.otpCode = '';
    let summaryData = JSON.parse(sessionStorage.summaryData);
    this.summaryData = summaryData;
    console.log(this.summaryData,'44444444')
    this. getEnquiryDetials = JSON.parse(sessionStorage.getEnquiryDetials);
    console.log(this.getEnquiryDetials,'11111111')
    this. enquiryFormData = JSON.parse(sessionStorage.enquiryFormData);
    console.log(this.enquiryFormData,'22222222')
    this. lifePremiumList = JSON.parse(sessionStorage.lifePremiumList);
    console.log(this.lifePremiumList,'333333333')
    this.settings = this.appSettings.settings;
    this.settings.loadingSpinner = false;

  }


  otpEdVal() {

    console.log(this.summaryData.receipt_no,'receipt....')
    if(this.summaryData.receipt_no!=''){
    const data = {
      "user_id": this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      "role_id": this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      "pos_status": this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
      "platform": "web",
      "product_id": this.lifePremiumList.product_id,
      "policy_id": this.getEnquiryDetials.policy_id,
      "transaction_id":this.summaryData.receipt_no,
      "otp":this.otpCode
    }
      this.settings.loadingSpinner = true;

    console.log(data, '999999999');
    this.termService.edelweissOtp(data).subscribe(
        (successData) => {
          this.otpValidationListSuccess(successData);
        },
        (error) => {
          this.otpValidationListFailure(error);
        }
    );
    }
    if(this.summaryData.receipt_no == ''){
      console.log('555555555555.....')
      const data = {
        "user_id": this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
        "role_id": this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
        "pos_status": this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
        "platform": "web",
        "product_id": this.lifePremiumList.product_id,
        "policy_id": this.getEnquiryDetials.policy_id,
        "transaction_id":this.receiptNo,
        "otp":this.otpCode
      }
      this.settings.loadingSpinner = true;

      console.log(data, '999999999');
      this.termService.edelweissOtp(data).subscribe(
          (successData) => {
            this.otpValidationListSuccess(successData);
          },
          (error) => {
            this.otpValidationListFailure(error);
          }
      );

    }
  }


  public otpValidationListSuccess(successData) {
    this.settings.loadingSpinner = false;
    if (successData.IsSuccess) {
      this.toastr.success(successData.ResponseObject);
      this.dialogRef.close(true);
    } else {
      this.toastr.error(successData.ErrorObject);
    }
  }

  public otpValidationListFailure(error) {
  }

  resendOPT() {

    const data = {
      "user_id": this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      "role_id": this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      "pos_status": this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
      "platform": "web",
      "product_id": this.lifePremiumList.product_id,
      "sub_product_id": this.lifePremiumList.sub_product_id,
      "policy_id": this.getEnquiryDetials.policy_id,
      "policyTerm": this.lifePremiumList.policy_term,
      "premiumPayingTerm": this.lifePremiumList.premium_paying_term  ,
      // "betterHalfBenefit": lifePremiumList.sub_product_id
    }
    this.settings.loadingSpinner = true;
    console.log(data, '999999999');
    this.termService.edelweissResendOtp(data).subscribe(
        (successData) => {
          this.resendOTPListSuccess(successData);
        },
        (error) => {
          this.resendOTPListFailure(error);
        }
    );
  }

  public resendOTPListSuccess(successData) {
    this.settings.loadingSpinner = false;
    if (successData.IsSuccess) {
      this.receiptNo = successData.ResponseObject.receipt_no;
      this.toastr.success(successData.ResponseMessage);
      this.summaryData.receipt_no=''
      // this.dialogRef.close(true);
    } else {
      this.toastr.error(successData.ErrorObject);
    }
  }

  public resendOTPListFailure(error) {
  }

  clearOtp(){
    this.otpCode='';
  }
  close(): void {
    this.dialogRef.close(false);
  }


  numberValidate(event: any) {
    this.validation.numberValidate(event);
  }
}
