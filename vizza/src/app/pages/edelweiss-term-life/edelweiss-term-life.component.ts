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
import {icuFromI18nMessage} from '@angular/compiler/src/render3/view/i18n/util';



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
  public saddExistingInsurance: any;
  public addmedicalQuestions: any;
  public addmedFamilyQuestions: any;
  public saddmedFamilyQuestions: any;
  public getStepperaddon: any;
  public adbError: any;
  public ciError: any;
  public atpdError: any;
  public hcbdError: any;
  public etitle: any;
  public egender: any;
  public incomeProofs: any;
  public minDate: any;
  public maxDate: any;
  public step: any;
  public taxRequired: any;
  public getStepper1: any;
  public getSteppercustomer: any;
  public getStepper2: any;
  public alcoholDetailValues: any;
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
  public eCauseDeath: any;
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
  public proposerHistoryAge: any;
  public proposerSHistoryAge: any;
  public dateError: any;
  public dateError12: any;
  public customerAge: any;
  public dateSpouseError: any;
  public dateHistoryError: any;
  public dateSHistoryError: any;
  public today: any;
  public currentStep: any;
  public personalData: any;
  public summaryData: any;
  public requestedUrl: any;
  public insurerData: any;
  public proposerFormData: any;
  public nomineeFormData: any;
  public customerFormData: any;
  public addonFormData: any;
  public insuredFormData: any;
  public medicalFormData: any;
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
  public serrortravelOutside:any;
  public pregnantInderror:any;
  public spregnantInderror:any;
  public femaleDieaseInderror:any;
  public sfemaleDieaseInderror:any;
  public bloodDieaseInderror:any;
  public sbloodDieaseInderror:any;
  public otherIllnessInderror:any;
  public sotherIllnessInderror:any;
  public receivedTreatment1error:any;
  public sreceivedTreatment1error:any;
  public symptomsInderror:any;
  public ssymptomsInderror:any;
  public isHospitalizederror:any;
  public sHospitalizederror:any;
  public sRecoverederror:any;
  public isRecoverederror:any;
  public deformityInderror:any;
  public sdeformityInderror:any;
  public receivedTreatment2error:any;
  public sreceivedTreatment2error:any;
  public alcoholicInderror:any;
  public salcoholicInderror:any;
  public nervousDieaseInderror:any;
  public snervousDieaseInderror:any;
  public muscleDieaseInderror:any;
  public smuscleDieaseInderror:any;
  public thyroidDieaseInderror:any;
  public sthyroidDieaseInderror:any;
  public cancerDieaseInderror:any;
  public scancerDieaseInderror:any;
  public tropicalDieaseInderror:any;
  public stropicalDieaseInderror:any;
  public digestiveDieaseInderror:any;
  public sdigestiveDieaseInderror:any;
  public kidneyDieaseInderror:any;
  public skidneyDieaseInderror:any;
  public respiratoryDieaseInderror:any;
  public srespiratoryDieaseInderror:any;
  public diabetesInderror:any;
  public sdiabetesInderror:any;
  public consultDoctorInderror:any;
  public sconsultDoctorInderror:any;
  public heartDieaseInderror:any;
  public sheartDieaseInderror:any;
  public admitInderror:any;
  public sadmitInderror:any;
  public medicalTreatmenterror:any;
  public smedicalTreatmenterror:any;
  public ECGInderror:any;
  public sECGInderror:any;

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
  public spiloterror:any;
  public activityerror:any;
  public sactivityerror:any;
  public drugsInderror:any;
  public sdrugsInderror:any;
  public alcoholInderror:any;
  public salcoholInderror:any;
  public tobaccoInderror:any;
  public stobaccoInderror:any;
  public tobaccoStopInderror:any;
  public stobaccoStopInderror:any;
  public hcb_sumassured_min:any;
  public hcb_sumassured_max:any;
  public atpd_sumassured_min:any;
  public atpd_sumassured_max:any;
  public adb_sumassured_min:any;
  public adb_sumassured_max:any;
  public ci_sumassured_min:any;
  public ci_sumassured_max:any;
  public tittleread :boolean;
  public otpFalseError :boolean;
  public mStatus :any;
  public adb_sumassured:any;
  public atpd_sumassured:any;
  public ci_sumassured:any;
  public hcb_sumassured:any;
  public pdp_sumassured:any;
  public bi_pdf_url:any;
  public maritalValue:any;
  public maritalSpouseValue:any;
  public maritalSpouseSingleValue:any;
  public maritalSingleValue:any;
  public eHistoryFamily:any;
  public eCompanyList:any;
  public premiumValue:boolean;


  constructor(@Inject(WINDOW) private window: Window,  public fb: FormBuilder,public router: Router, public dialog: MatDialog, public datepipe: DatePipe, public route: ActivatedRoute, public common: CommonService, public validation: ValidationService, public appSettings: AppSettings, private toastr: ToastrService, public config: ConfigurationService, public authservice: AuthService, public termService: TermLifeCommonService,  ) {
    this.requestedUrl = '';
    let stepperindex = 0;
    this.route.params.forEach((params) => {
      if(params.stepper == true || params.stepper == 'true') {
        stepperindex = 7;
        if (sessionStorage.summaryData != '' && sessionStorage.summaryData != undefined) {
          let summaryData = JSON.parse(sessionStorage.summaryData);
          this.summaryData = summaryData;
          this.requestedUrl = summaryData.payment_link;
          this.proposerFormData = JSON.parse(sessionStorage.proposerFormData);
          this.bankFormData = JSON.parse(sessionStorage.bankFormData);
          this.nomineeFormData = JSON.parse(sessionStorage.nomineeFormData);
          this.insuredFormData = JSON.parse(sessionStorage.insuredFormData);
          this.customerFormData = JSON.parse(sessionStorage.customerFormData);
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
    this.serrortravelOutside =false;
    this.muscleDieaseInderror =false;
    this.smuscleDieaseInderror =false;
    // this.isRecoverederror =false;
    this.pregnantInderror =false;
    this.spregnantInderror =false;
    this.femaleDieaseInderror =false;
    this.sfemaleDieaseInderror =false;
    this.isRecoverederror =false;
    this.receivedTreatment2error =false;
    this.sreceivedTreatment2error =false;
    this.receivedTreatment1error =false;
    this.sreceivedTreatment1error =false;
    this.symptomsInderror =false;
    this.ssymptomsInderror =false;
    this.isHospitalizederror =false;
    this.sHospitalizederror =false;
    this.sRecoverederror =false;
    this.deformityInderror =false;
    this.sdeformityInderror =false;
    this.otherIllnessInderror =false;
    this.sotherIllnessInderror =false;
    this.alcoholicInderror =false;
    this.salcoholicInderror =false;
    this.cancerDieaseInderror =false;
    this.scancerDieaseInderror =false;
    this.nervousDieaseInderror =false;
    this.snervousDieaseInderror =false;
    this.bloodDieaseInderror =false;
    this.sbloodDieaseInderror =false;
    this.thyroidDieaseInderror =false;
    this.sthyroidDieaseInderror =false;
    this.tropicalDieaseInderror =false;
    this.stropicalDieaseInderror =false;
    this.digestiveDieaseInderror =false;
    this.sdigestiveDieaseInderror =false;
    this.kidneyDieaseInderror =false;
    this.skidneyDieaseInderror =false;
    this.respiratoryDieaseInderror =false;
    this.srespiratoryDieaseInderror =false;
    this.heartDieaseInderror =false;
    this.sheartDieaseInderror =false;
    this.diabetesInderror =false;
    this.sdiabetesInderror =false;
    this.consultDoctorInderror =false;
    this.sconsultDoctorInderror =false;
    this.medicalTreatmenterror =false;
    this.smedicalTreatmenterror =false;
    this.admitInderror =false;
    this.sadmitInderror =false;
    this.ECGInderror =false;
    this.sECGInderror =false;
    this.otpFalseError =false;
    this.eHistoryFamily =false;
    this.premiumValue =false;
    // this.tobaccoStopInderror =false;
    this.piloterror =false;
    this.spiloterror =false;
    this.activityerror =false;
    this.sactivityerror =false;
    this.tittleread == false;
    this.drugsInderror =false;
    this.sdrugsInderror =false;
    this.alcoholInderror =false;
    this.salcoholInderror =false;
    this.hcbdError =false;
    this.ciError =false;
    this.adbError =false;
    this.atpdError =false;
    this.tobaccoInderror =false;
    this.stobaccoInderror =false;
    this.tobaccoStopInderror =false;
    this.stobaccoStopInderror =false;
    this.proposalGenStatus = true;
    this.proposalNextList = '';
    this.optGenStatus = true;
    this.maritalValue = false;
    this.maritalSpouseValue = false;
    this.maritalSpouseSingleValue = false;
    this.maritalSingleValue = false;
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

    this.customerDetails = this.fb.group({
      title: ['', Validators.compose([Validators.required])],
      firstName: ['', Validators.compose([Validators.required])],
      titleName: '',
      midName: '',
      lastName: ['', Validators.compose([Validators.required])],
      dob: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      maritalStatus: ['', Validators.required],
      maritalStatusName: '',
      annualIncome: '',
      mobileNo: ['', Validators.compose([Validators.pattern('[6-9]\\d{9}')])],
      isSmoker:'No',
      emailId: ['', Validators.compose([ Validators.required,Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],

    });
    this.addon = this.fb.group({

      additionalBenefit: '',
      betterHalfBenefit: '',
      betterHalfsumAssured: '5000000',
      waiverOfPremiumBenefit: '',
      criticalIllness: '',
      criticalsumAssured: '',
      isADB: '',
      sumAssuredADB: '',
      isATPD: '',
      sumAssuredATPD: '',
      isHCB: '',
      sumAssuredHCB: '',
      stitle: '',
      stitleName: '',
      sfirstName: '',
      smidName: '',
      slastName: '',
      semailId: ['', Validators.compose([Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
      isSmokerSpouse: 'No',
      sdob: '',
      payoutOption: 'lumpsum',
      payoutOptionName: '',
      payoutOptionToggle: '',
      noOfMonths: '',
      payoutPercentageIncome: '',

    });


    this.insureArray = this.fb.group({
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
      emailId: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
      pan: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      aadhaarNo:'',
      ageProofIdName: '',
      sageProofIdName: '',
      fatherhusbandName: '',
      motherMaidName: '',
      ageProofId: ['', Validators.compose([Validators.required])],
      highestQualification: ['', Validators.compose([Validators.required])],
      highestQualificationName: '',
      otherQualification: '',
      mobileNo: ['', Validators.compose([Validators.pattern('[6-9]\\d{9}')])],
      stitle: '',
      stitleName: '',
      sfirstName: '',
      smidName: '',
      slastName: '',
      sdob: '',
      semailId: ['', Validators.compose([Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
      sppan: ['', Validators.compose([Validators.minLength(10)])],
      saadhaarNo:'',
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
      isSmokerSpouse: '',
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
      // employementTypeOther: '',
      employementType: ['', Validators.compose([Validators.required])],
      employementTypeName: '',
      employerName: [''],
      natureduty: ['', ],
      naturedutyName: '',
      employerAddr: [''],
      isEmploymentIncome: [''],
      employmentIncomeDetails: [''],
      annualIncome: ['', Validators.compose([Validators.required])],
      semployementType: [''],
      semployementTypeName: '',
      semployerName: [''],
      sisEmploymentIncome: [''],
      semploymentIncomeDetails: [''],
      snatureduty: [''],
      snaturedutyName: '',
      semployerAddr: [''],
      sannualIncome: [''],
      taxResidence: ['', Validators.compose([Validators.required])],
      isPoliticallyExposed: false,
      specification: '',
      isCriminal: 'No',
      criminalDetails: '',
      identityProof: ['', Validators.compose([Validators.required])],
      identityProofName: '',
      addrProof: ['', Validators.compose([Validators.required])],
      addrProofName: '',
      heightFeets: ['', Validators.compose([Validators.required])],
      heightInches: ['', Validators.compose([Validators.required])],
      weight: ['', Validators.compose([Validators.required])],
      hasWeightChanged: ['', Validators.compose([Validators.required])],
      inbetweenweight: '',
      weightChangedreason: '',
      insureHistory: 'No',
      reasonInsured: '',
      whenInsured: '',
      sinsureHistory: 'No',
      sreasonInsured: '',
      swhenInsured: '',
      insureHistory1: 'No',
      companyName1: '',
      reasonInsured1: '',
      whenInsured1: '',
      sinsureHistory1: 'No',
      scompanyName1: '',
      sreasonInsured1: '',
      swhenInsured1: '',
      insureHistory2: 'No',
      sinsureHistory2: 'No',
      insureAccNo: '',
      insureRepository: '',
      incomeProof: '',
      incomeProofName: '',

      existingInsuranceInd: '',
      existingInsurance : new FormArray([
        this.create()
      ]),

      sexistingInsuranceInd: '',
      sexistingInsurance : new FormArray([
        this.screate()
      ]),


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
      alcoholDetailName1: '',
      alcoholBeer1: '',
      alcoholliquar1: '',
      alcoholWine1: '',
      tobaccoInd1: '',
      tobaccoDetailName1: '',
      tobaccoStopInd1: '',
      stabaccoDuration: '',
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
      femaleDetails1: '',
      isFemaleHospitalized1: '',
      FemalehospitalizedDate1: '',
      isFemaleRecovered1: '',
      nonFemaleRecoveryDetails1: '',
      healthHistory: '',
      shealthHistory: '',
      healthHistoryDetail: '',
      shealthHistoryDetail: '',
      healthHistory1: '',
      shealthHistory1: '',
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
      alcoholDetailName: '',
      alcoholBeer: '',
      alcoholliquar: '',
      alcoholWine: '',
      tobaccoInd: '',
      tobaccoDetails: '',
      tobaccoDetails1: '',
      tobaccoDetails2: '',
      tobaccoDetails3: '',
      stobaccoDetails: '',
      stobaccoDetails1: '',
      stobaccoDetails2: '',
      stobaccoDetails3: '',
      tobaccoDetailName: '',
      tobaccoStopInd: '',
      tabaccoDuration: '',
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
      femaleDetails: '',
      isFemaleHospitalized: '',
      FemalehospitalizedDate: '',
      isFemaleRecovered: '',
      nonFemaleRecoveryDetails: '',
      // medicalQuestions : new FormArray([
      //   this.medicalQuesCreate()
      // ]),
      medicalFamilyQuestions : new FormArray([
        this.medicalFamilyCreate()
      ]),
      smedicalFamilyQuestions : new FormArray([
        this.smedicalFamilyCreate()
      ]),

    });

    this.bankDetail = this.fb.group({
      accountNo: ['', Validators.compose([Validators.required])],
      accName: ['', Validators.compose([Validators.required])],
      name: '',
      location: '',
      ifscCode: ['', Validators.compose([Validators.required])],
      // investmentStrategy: '',


    });

    this.nomineeDetail = this.fb.group({
      'itemsNominee' : this.fb.array([
        this.initItemRows()
      ])
    });



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
    this.geteIncomeProof();
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
    this.getIncomeProof();
    this.geteproposalProof();
    this.geteageDocProof();
    this.geteaddressDocProof();
    this.getekycProof();
    this.geteOtherDocumentProof();
    this.geteidLifeProof();
    this.geteTobaccoDetail();
    this.getesalereqProof();
    this.geteAlcoholDetails();
    this.geteCompany();
    this.getCauseDeath();
    // this.getFamilyHistory();
    this.sessionData();
    this.edelweissPrimium();
    this.getCover();
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
    // console.log(this.insureArray.controls['modeOfPremium'].value,'lifepayment');
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
    if (this.insureArray.get('existingInsurance').value.length < 5) {
      this.addExistingInsurance = this.insureArray.get('existingInsurance') as FormArray;
      this.addExistingInsurance.push(this.create());
      this.existingInsureReq();
      console.log(this.addExistingInsurance, 'this.addExistingInsurance');
      console.log('eror3');
    }
  }
  removeItems(index) {
    let ssss =  this.insureArray.get('existingInsurance') as FormArray;
    console.log(ssss,'ssssss')
    ssss.removeAt(index);
    console.log(index, 'this.index');
  }
  screate() {
    return new FormGroup({
      spolicyNo: new FormControl(),
      scompanyName :  new FormControl(),
      syearOfIssue :  new FormControl(),
      ssumAssured: new FormControl(),
      sannualizedPremium :  new FormControl(),
      spolicyStatus :  new FormControl(),
      sacceptanceTerm :  new FormControl()
    });
  }
  saddItems() {
    if (this.insureArray.get('sexistingInsurance').value.length < 5) {
      this.saddExistingInsurance = this.insureArray.get('sexistingInsurance') as FormArray;
      this.saddExistingInsurance.push(this.screate());
      this.sexistingInsureReq();
      console.log(this.saddExistingInsurance, 'this.saddExistingInsurance');
      console.log('eror3');
    }
  }
  sremoveItems(index) {
    let ssss =  this.insureArray.get('sexistingInsurance') as FormArray;
    console.log(ssss,'ssssss')
    ssss.removeAt(index);
    console.log(index, 'this.index');
  }

  // Medical Question Create
  // medicalQuesCreate() {
  //   return new FormGroup({
  //     disease : new FormControl(),
  //     datediagnois :  new FormControl(),
  //     treatment :  new FormControl(),
  //     dosage: new FormControl(),
  //     doctor :  new FormControl(),
  //     datefollowup :  new FormControl(),
  //     anycomplications :  new FormControl(),
  //     remarks :  new FormControl(),
  //     medicalDobValidError :  new FormControl(),
  //     medicalfollowDobValidError :  new FormControl()
  //   });
  // }

  // addMedItems() {
  //   if (this.medicalDetail.get('medicalQuestions').value.length < 5) {
  //     this.addmedicalQuestions.push(this.medicalQuesCreate());
  //     console.log(this.addmedicalQuestions, 'this.addmedicalQuestions');
  //   }
  // }
  // removeMedItems(index) {
  //   let removeQue =  this.medicalDetail.get('medicalQuestions') as FormArray;
  //   console.log(removeQue,'ssssss')
  //   removeQue.removeAt(index);
  //   console.log(index, 'this.index');
  //
  //
  // }

  // Medical Family Create
  medicalFamilyCreate() {
    return new FormGroup({
      relation : new FormControl(),
      age :  new FormControl(),
      ageOnDeath :  new FormControl(),
      healthStatus :  new FormControl(),
      relationName :  new FormControl(),
      causeOfDeath :  new FormControl(),
      // causeDeathName :  new FormControl(),

    });
  }
  addFamilyItems() {
    if (this.medicalDetail.get('medicalFamilyQuestions').value.length < 5) {
      this.addmedFamilyQuestions = this.medicalDetail.get('medicalFamilyQuestions') as FormArray;
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
  smedicalFamilyCreate() {
    return new FormGroup({
      srelation : new FormControl(),
      sage :  new FormControl(),
      sageOnDeath :  new FormControl(),
      shealthStatus :  new FormControl(),
      srelationName :  new FormControl(),
      scauseOfDeath :  new FormControl(),
      // causeDeathName :  new FormControl(),

    });
  }

  saddFamilyItems() {
    if (this.medicalDetail.get('smedicalFamilyQuestions').value.length < 5) {
      this.saddmedFamilyQuestions = this.medicalDetail.get('smedicalFamilyQuestions') as FormArray;
      this.saddmedFamilyQuestions.push(this.smedicalFamilyCreate());
      console.log(this.saddmedFamilyQuestions, 'this.saddmedFamilyQuestions');
    }
  }
  sremoveFamilyItems(index) {
    let removeFamily =  this.medicalDetail.get('smedicalFamilyQuestions') as FormArray;
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

  addEventHistory(event) {
    if (event.value != null) {
      let selectedDate = '';
      this.proposerHistoryAge = '';
      let dob = '';
      if (typeof event.value._i == 'string') {
        const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
        if (pattern.test(event.value._i) && event.value._i.length == 10) {
          this.dateHistoryError = '';
        } else {
          this.dateHistoryError = 'Enter Valid Date';
        }
        selectedDate = event.value._i;
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (selectedDate.length == 10) {
          this.proposerHistoryAge = this.ageCalculate(dob);
          // sessionStorage.proposerHistoryAge = this.proposerHistoryAge;

        }

      } else if (typeof event.value._i == 'object') {
        // dob = this.datepipe.transform(event.value, 'MMM d, y');
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (dob.length == 10) {
          this.proposerHistoryAge = this.ageCalculate(dob);
          // sessionStorage.insuredAgePA = this.proposerHistoryAge;

        }
        this.dateHistoryError = '';
      }
      sessionStorage.proposerHistoryAge = this.proposerHistoryAge;
      console.log(sessionStorage.proposerHistoryAge,'spousedetaill111')
      console.log(this.proposerHistoryAge,'spousedate222222')

    }
  }
  addEventSHistory(event) {
    if (event.value != null) {
      let selectedDate = '';
      this.proposerSHistoryAge = '';
      let dob = '';
      if (typeof event.value._i == 'string') {
        const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
        if (pattern.test(event.value._i) && event.value._i.length == 10) {
          this.dateSHistoryError = '';
        } else {
          this.dateSHistoryError = 'Enter Valid Date';
        }
        selectedDate = event.value._i;
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (selectedDate.length == 10) {
          this.proposerSHistoryAge = this.ageCalculate(dob);
          // sessionStorage.proposerSHistoryAge = this.proposerSHistoryAge;

        }

      } else if (typeof event.value._i == 'object') {
        // dob = this.datepipe.transform(event.value, 'MMM d, y');
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (dob.length == 10) {
          this.proposerSHistoryAge = this.ageCalculate(dob);
          // sessionStorage.insuredAgePA = this.proposerSHistoryAge;

        }
        this.dateSHistoryError = '';
      }
      sessionStorage.proposerSHistoryAge = this.proposerSHistoryAge;
      console.log(sessionStorage.proposerSHistoryAge,'spousedetaill111')
      console.log(this.proposerSHistoryAge,'spousedate222222')

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

  smokerChange(){
      this.medicalDetail.controls['tobaccoInd'].patchValue(this.customerDetails.controls['isSmoker'].value );
  }

  smokerChangeSpouse(){
    this.medicalDetail.controls['tobaccoInd1'].patchValue(this.addon.controls['isSmokerSpouse'].value );
  }

  typeAddressDeatils() {
    if (this.insureArray.controls['isCurrPerAddrSame'].value == true) {
      this.insureArray.controls['perAddr1'].patchValue( this.insureArray.controls['currAddr1'].value);
          this.insureArray.controls['perAddr2'].patchValue( this.insureArray.controls['currAddr2'].value);
          this.insureArray.controls['perAddr3'].patchValue( this.insureArray.controls['currAddr3'].value);
          this.insureArray.controls['perCity'].patchValue( this.insureArray.controls['currCity'].value);
          this.insureArray.controls['perPincode'].patchValue( this.insureArray.controls['currPincode'].value);
          this.insureArray.controls['perState'].patchValue( this.insureArray.controls['currState'].value);
      console.log(this.insureArray.controls['perCity'].value, 'ghghghj');
    }
  }
  sameAddress1() {
    if (this.insureArray.controls['isCurrPerAddrSame'].value == true) {
      this.insureArray.controls['perAddr1'].patchValue( this.insureArray.controls['currAddr1'].value);
          this.insureArray.controls['perAddr2'].patchValue( this.insureArray.controls['currAddr2'].value);
          this.insureArray.controls['perAddr3'].patchValue( this.insureArray.controls['currAddr3'].value);
          this.insureArray.controls['perCity'].patchValue( this.insureArray.controls['currCity'].value);
          this.insureArray.controls['perPincode'].patchValue( this.insureArray.controls['currPincode'].value);
          this.insureArray.controls['perState'].patchValue( this.insureArray.controls['currState'].value);
      console.log(this.insureArray.controls['perCity'].value, 'ghghghj');
    }
    else if (this.insureArray.controls['isCurrPerAddrSame'].value == false){
      this.insureArray.controls['perAddr1'].patchValue('');
          this.insureArray.controls['perAddr2'].patchValue('');
          this.insureArray.controls['perAddr3'].patchValue('');
          this.insureArray.controls['perCity'].patchValue('');
          this.insureArray.controls['perPincode'].patchValue('');
          this.insureArray.controls['perState'].patchValue('');
    }
  }

  typeAddressDeatils1() {
    if (this.insureArray.controls['sisCurrPerAddrSame'].value == true) {
      this.insureArray.controls['sperAddr1'].patchValue( this.insureArray.controls['perAddr1'].value);
          this.insureArray.controls['sperAddr2'].patchValue( this.insureArray.controls['perAddr2'].value);
          this.insureArray.controls['sperAddr3'].patchValue( this.insureArray.controls['perAddr3'].value);
          this.insureArray.controls['sperCity'].patchValue( this.insureArray.controls['perCity'].value);
          this.insureArray.controls['sperPincode'].patchValue( this.insureArray.controls['perPincode'].value);
          this.insureArray.controls['sperState'].patchValue( this.insureArray.controls['perState'].value);
      console.log(this.insureArray.controls['perCity'].value, 'ghghghj');
    }
  }
  sameAddress2() {
    if (this.insureArray.controls['sisCurrPerAddrSame'].value == true) {
      this.insureArray.controls['sperAddr1'].patchValue( this.insureArray.controls['perAddr1'].value);
          this.insureArray.controls['sperAddr2'].patchValue( this.insureArray.controls['perAddr2'].value);
          this.insureArray.controls['sperAddr3'].patchValue( this.insureArray.controls['perAddr3'].value);
          this.insureArray.controls['sperCity'].patchValue( this.insureArray.controls['perCity'].value);
          this.insureArray.controls['sperPincode'].patchValue( this.insureArray.controls['perPincode'].value);
          this.insureArray.controls['sperState'].patchValue( this.insureArray.controls['perState'].value);
      console.log(this.insureArray.controls['perCity'].value, 'ghghghj');
    }
    else if (this.insureArray.controls['sisCurrPerAddrSame'].value == false){
      this.insureArray.controls['sperAddr1'].patchValue('');
          this.insureArray.controls['sperAddr2'].patchValue('');
          this.insureArray.controls['sperAddr3'].patchValue('');
          this.insureArray.controls['sperCity'].patchValue('');
          this.insureArray.controls['sperPincode'].patchValue('');
          this.insureArray.controls['sperState'].patchValue('');
    }
  }
  // maritalQuestions() {
  //   console.log(this.customerDetails.controls['maritalStatus'].value, '456789')
  //   console.log(this.addon.controls['betterHalfBenefit'].value, 'addon')
  //   if (this.customerDetails.controls['maritalStatus'].value == 'M') {
  //
  //     this.medicalDetail['controls'].medicalFamilyQuestions['controls'][0]['controls'].relation.patchValue('1');
  //     this.medicalDetail['controls'].medicalFamilyQuestions['controls'][1]['controls'].relation.patchValue('2');
  //     this.medicalDetail['controls'].medicalFamilyQuestions['controls'][2]['controls'].relation.patchValue('3');
  //     this.maritalValue = true;
  //     this.maritalSingleValue = false;
  //   } else if (this.customerDetails.controls['maritalStatus'].value == 'S' && this.addon.controls['betterHalfBenefit'].value == '') {
  //     this.medicalDetail['controls'].medicalFamilyQuestions['controls'][0]['controls'].relation.patchValue('1');
  //     this.medicalDetail['controls'].medicalFamilyQuestions['controls'][1]['controls'].relation.patchValue('2');
  //     this.maritalSingleValue = true;
  //     this.maritalValue = false;
  //
  //   }
  //   if (this.customerDetails.controls['maritalStatus'].value == 'M' && this.addon.controls['betterHalfBenefit'].value == 'Yes') {
  //     this.medicalDetail['controls'].smedicalFamilyQuestions['controls'][0]['controls'].srelation.patchValue('1');
  //     this.medicalDetail['controls'].smedicalFamilyQuestions['controls'][1]['controls'].srelation.patchValue('2');
  //     this.medicalDetail['controls'].smedicalFamilyQuestions['controls'][2]['controls'].srelation.patchValue('3');
  //     this.maritalSpouseValue = true;
  //     this.maritalSpouseSingleValue = false;
  //
  //   } else if (this.customerDetails.controls['maritalStatus'].value == 'S') {
  //     this.medicalDetail['controls'].smedicalFamilyQuestions['controls'][0]['controls'].srelation.patchValue('1');
  //     this.medicalDetail['controls'].smedicalFamilyQuestions['controls'][1]['controls'].srelation.patchValue('2');
  //     this.maritalSpouseSingleValue = true;
  //     this.maritalSpouseValue = false;
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
//   addEventMedical(event, i, type) {
//     if(type == 'medical') {
//       if (event.value != null) {
//         let selectedDate = '';
//         let dob = '';
//         let dob_days = '';
//         this.getAge = '';
//         this.getDays;
//         dob = this.datepipe.transform(event.value, 'y-MM-dd');
//         dob_days = this.datepipe.transform(event.value, 'dd-MM-y');
//
//         if (typeof event.value._i == 'string') {
//           const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
//           if (pattern.test(event.value._i) && event.value._i.length == 10) {
//             this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].medicalDobValidError.patchValue('');
//
//           } else {
//             this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].medicalDobValidError.patchValue('Enter Valid DOB');
//           }
//
//           selectedDate = event.value._i;
//
//           if (selectedDate.length == 10) {
//             this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].medicalDobValidError.patchValue('');
//             this.getAge = this.ageCalculate(dob);
//             this.getDays = this.ageCalculatemedical(dob_days);
//             this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].datediagnois.patchValue(dob);
//
//           }
//
//         } else if (typeof event.value._i == 'object') {
//           if (dob.length == 10) {
//             this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].medicalDobValidError.patchValue('');
//             this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].datediagnois.patchValue(dob);
//
//             this.getAge = this.ageCalculate(dob);
//             this.getDays = this.ageCalculatemedical(dob_days);
//           }
//         }
//       }
//
//
//     }
//     if(type == 'medicalfollowup') {
//
//       if (event.value != null) {
//         let selectedDate = '';
//         let dob = '';
//         let dob_days = '';
//         this.getAge = '';
//         this.getDays;
//         dob = this.datepipe.transform(event.value, 'y-MM-dd');
//         dob_days = this.datepipe.transform(event.value, 'dd-MM-y');
//
//         if (typeof event.value._i == 'string') {
//           const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
//           if (pattern.test(event.value._i) && event.value._i.length == 10) {
//             this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].medicalfollowDobValidError.patchValue('');
//
//           } else {
//             this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].medicalfollowDobValidError.patchValue('Enter Valid DOB');
//           }
//
//           selectedDate = event.value._i;
//
//           if (selectedDate.length == 10) {
//             this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].medicalfollowDobValidError.patchValue('');
//             this.getAge = this.ageCalculate(dob);
//             this.getDays = this.ageCalculatemedical(dob_days);
//             this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].datefollowup.patchValue(dob);
//
//           }
//
//         }
//         else if (typeof event.value._i == 'object') {
//           if (dob.length == 10) {
//             this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].medicalfollowDobValidError.patchValue('');
//             this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].datefollowup.patchValue(dob);
//             this.getAge = this.ageCalculate(dob);
//             this.getDays = this.ageCalculatemedical(dob_days);
//           }
//         }
//       }
//     }
//
//   }

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


  // Insure Details
  edelweissCustomerDetail(stepper: MatStepper, value) {
    sessionStorage.stepperCustomerDetails = '';
    sessionStorage.stepperCustomerDetails = JSON.stringify(value);
    console.log(this.customerDetails, 'customerDetails');
    console.log(this.customerDetails.valid, 'this.valid');
    // let dateErrorMsg = [];
    if (this.customerDetails.valid) {
      if (sessionStorage.customerAge >= 18 && sessionStorage.customerAge <= 65) {
        stepper.next();
        this.topScroll();
        this.betterHalfReq();

      } else {
        this.toastr.error('Customer Age should be 18 to 65');

      }
    } else {
      this.toastr.error('please enter all the Mandatory field');
    }

  }
  edelweissAddonDetail(stepper: MatStepper, value) {
    sessionStorage.stepperAddonDetails = '';
    sessionStorage.stepperAddonDetails = JSON.stringify(value);
    console.log(this.addon, 'addon');
    console.log(this.addon.valid, 'this.valid');
    // let dateErrorMsg = [];
    if (this.addon.valid && this.premiumValue==false) {
      if((this.addon.controls['betterHalfBenefit'].value == 'Yes'&& sessionStorage.SpouseAge >= 18 && sessionStorage.SpouseAge <= 60)||(this.addon.controls['betterHalfBenefit'].value != 'Yes' && sessionStorage.SpouseAge=='')) {

      if (this.atpdError == false && this.adbError == false && this.ciError == false && this.hcbdError == false ) {
        // this.tittleread == true;
        this.insureArray.controls['title'].patchValue(this.customerDetails.controls['title'].value);
        this.insureArray.controls['firstName'].patchValue(this.customerDetails.controls['firstName'].value);
        this.insureArray.controls['midName'].patchValue(this.customerDetails.controls['midName'].value);
        this.insureArray.controls['lastName'].patchValue(this.customerDetails.controls['lastName'].value);
        this.insureArray.controls['dob'].patchValue(this.customerDetails.controls['dob'].value);
        this.insureArray.controls['maritalStatus'].patchValue(this.customerDetails.controls['maritalStatus'].value);
        this.changeMarital1()
        this.insureArray.controls['emailId'].patchValue(this.customerDetails.controls['emailId'].value);
        this.insureArray.controls['mobileNo'].patchValue(this.customerDetails.controls['mobileNo'].value);
        this.insureArray.controls['annualIncome'].patchValue(this.customerDetails.controls['annualIncome'].value);
        // this.insureArray.controls['isSmoker'].patchValue (this.customerDetails.controls['isSmoker'].value);

        // if (this.addon.controls['betterHalfBenefit'].value == 'Yes') {
        //   this.insureArray.controls['stitle'].patchValue(this.addon.controls['stitle'].value);
        //   this.insureArray.controls['sfirstName'].patchValue(this.addon.controls['sfirstName'].value);
        //   this.insureArray.controls['smidName'].patchValue(this.addon.controls['smidName'].value);
        //   this.insureArray.controls['slastName'].patchValue(this.addon.controls['slastName'].value);
        //   this.insureArray.controls['sdob'].patchValue(this.addon.controls['sdob'].value);
        //   this.insureArray.controls['semailId'].patchValue(this.addon.controls['semailId'].value);
        //   // this.insureArray.controls['isSmokerSpouse'].patchValue(this.addon.controls['isSmokerSpouse'].value);
        //
        //   // stepper.next();
        //   // this.topScroll();
        // }
        stepper.next();
        this.topScroll();
      }
      else{
        this.toastr.error('please enter correct Sum Assured Amount');
      }

      } else {
        this.toastr.error('Spouse Age should be 18 or above');

      }
    } else {
      this.toastr.error('please enter all the Mandatory field');
    }

  }

  nextBIUpload(stepper) {
    if(this.bi_pdf_url !=''){
      stepper.next();
      this.topScroll();
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
    console.log(this.errortravelOutside,'errortravelOutside');
    console.log(this.medicalDetail.valid, 'this.valid');
    // if(this.medicalDetail.valid&&((this.errortravelOutside == false||this.errortravelOutside=='') && (this.serrortravelOutside == false ||this.serrortravelOutside=='')&& (this.piloterror ==false||this.piloterror=='') && (this.spiloterror ==false||this.spiloterror=='') && (this.activityerror ==false ||this.activityerror=='')&& (this.sactivityerror ==false||this.sactivityerror=='') && (this.drugsInderror == false||this.drugsInderror=='') &&(this.sdrugsInderror == false||this.sdrugsInderror=='') && (this.alcoholInderror == false||this.alcoholInderror=='') && (this.salcoholInderror == false||this.salcoholInderror=='') && (this.tobaccoInderror == false||this.tobaccoInderror=='')  &&(this.stobaccoInderror == false||this.stobaccoInderror=='')  && (this.consultDoctorInderror == false||this.consultDoctorInderror=='') && (this.sconsultDoctorInderror == false||this.sconsultDoctorInderror=='') && (this.ECGInderror == false ||this.ECGInderror=='' ))) {
// if(this.medicalDetail.valid&&((this.errortravelOutside == false||this.errortravelOutside=='') && (this.serrortravelOutside == false ||this.serrortravelOutside=='')&& (this.piloterror ==false||this.piloterror=='') && (this.spiloterror ==false||this.spiloterror=='') && (this.activityerror ==false ||this.activityerror=='')&& (this.sactivityerror ==false||this.sactivityerror=='') && (this.drugsInderror == false||this.drugsInderror=='') &&(this.sdrugsInderror == false||this.sdrugsInderror=='') && (this.alcoholInderror == false||this.alcoholInderror=='') && (this.salcoholInderror == false||this.salcoholInderror=='') && (this.tobaccoInderror == false||this.tobaccoInderror=='')  &&(this.stobaccoInderror == false||this.stobaccoInderror=='')  && (this.consultDoctorInderror == false||this.consultDoctorInderror=='') && (this.sconsultDoctorInderror == false||this.sconsultDoctorInderror=='') && (this.ECGInderror == false ||this.ECGInderror=='')&& (this.sECGInderror == false||this.sECGInderror=='')
//  && (this.admitInderror == false||this.admitInderror=='') && (this.admitInderror == false||this.admitInderror=='') && (this.medicalTreatmenterror == false||this.smedicalTreatmenterror=='') && (this.smedicalTreatmenterror == false||this.smedicalTreatmenterror=='') && (this.heartDieaseInderror == false ||this.heartDieaseInderror=='')&&(this.sheartDieaseInderror == false||this.sheartDieaseInderror=='') && (this.respiratoryDieaseInderror == false||this.respiratoryDieaseInderror=='')&&(this.srespiratoryDieaseInderror == false||this.srespiratoryDieaseInderror=='') && (this.diabetesInderror == false||this.diabetesInderror=='')&&(this.sdiabetesInderror == false||this.sdiabetesInderror=='')&& (this.kidneyDieaseInderror == false||this.kidneyDieaseInderror=='')&& (this.skidneyDieaseInderror == false||this.skidneyDieaseInderror=='')
//  && (this.digestiveDieaseInderror == false||this.digestiveDieaseInderror=='') && (this.sdigestiveDieaseInderror == false||this.sdigestiveDieaseInderror=='') && (this.cancerDieaseInderror == false||this.cancerDieaseInderror=='')&&(this.scancerDieaseInderror == false||this.scancerDieaseInderror=='')&& (this.tropicalDieaseInderror == false||this.tropicalDieaseInderror=='')&&(this.stropicalDieaseInderror == false||this.stropicalDieaseInderror=='')&& (this.thyroidDieaseInderror == false||this.thyroidDieaseInderror=='')&&(this.sthyroidDieaseInderror == false||this.sthyroidDieaseInderror=='')&& (this.bloodDieaseInderror == false||this.bloodDieaseInderror=='')&&(this.sbloodDieaseInderror == false||this.sbloodDieaseInderror=='')&& (this.nervousDieaseInderror == false||this.nervousDieaseInderror=='') &&(this.snervousDieaseInderror == false||this.snervousDieaseInderror=='') && (this.femaleDieaseInderror == false||this.femaleDieaseInderror=='')&& (this.sfemaleDieaseInderror == false||this.sfemaleDieaseInderror=='')
//  && (this.muscleDieaseInderror == false||this.muscleDieaseInderror=='')&&(this.smuscleDieaseInderror == false||this.smuscleDieaseInderror=='')&& (this.receivedTreatment2error == false||this.receivedTreatment2error=='')&&(this.sreceivedTreatment2error == false||this.sreceivedTreatment2error=='')&& (this.alcoholicInderror == false||this.alcoholicInderror=='')&& (this.salcoholicInderror == false||this.salcoholicInderror=='')&& (this.otherIllnessInderror == false||this.otherIllnessInderror=='')&&(this.sotherIllnessInderror == false||this.sotherIllnessInderror=='')&& (this.deformityInderror == false||this.deformityInderror=='')&&(this.sdeformityInderror == false||this.sdeformityInderror=='')&& (this.receivedTreatment1error == false||this.receivedTreatment1error=='')&&(this.sreceivedTreatment1error == false||this.sreceivedTreatment1error=='')&& (this.symptomsInderror == false||this.symptomsInderror=='')&&(this.ssymptomsInderror == false||this.ssymptomsInderror=='' ))) {
    if (this.medicalDetail.valid){
      this.getFamilyHistory(stepper);

     // if(this.eHistoryFamily==false){
     //   stepper.next();
     //   this.topScroll();
     // }else if(this.eHistoryFamily==true){
     //
     // }
    }else{
      this.toastr.error('Please fill the Mandatory Field ');
    }
  }

  saveImageAs1() {
    this.window.open(this.bi_pdf_url, '_blank');
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
    if(this.otpFalseError==true){
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
  sumAssuredADBError() {
    if ((this.addon.controls['sumAssuredADB'].value <= this.adb_sumassured_max) ) {
      this.adbError =false;
      this.adbError ='';
      if(this.addon.controls['sumAssuredADB'].value >= this.adb_sumassured_min){
        this.adbError =false;
        this.adbError ='';
      }else{
        this.adbError =true;
        this.adbError = "SumAssured Accidental Death Benefit should be";
      }
    } else {
      this.adbError =true;
      this.adbError = "SumAssured Accidental Death Benefit should be";

    }
  }
  sumAssuredATPDError() {
    if ((this.addon.controls['sumAssuredATPD'].value <= this.atpd_sumassured_max)) {
      this.atpdError =false;
      this.atpdError =''
      if(this.addon.controls['sumAssuredATPD'].value >= this.atpd_sumassured_min){
        this.atpdError =false;
        this.atpdError =''
      }else{
        this.atpdError =true;
        this.atpdError = 'SumAssured Accidental Total and Permanent Disability should be ';
      }
    } else {
      this.atpdError =true;
      this.atpdError = 'SumAssured Accidental Total and Permanent Disability should be ';

    }
  }
  history2Change(){
    if (this.insureArray.controls['insureHistory2'].value == 'Yes') {
      this.insureArray.controls['existingInsuranceInd'].patchValue(this.insureArray.controls['existingInsuranceInd'].value);

      this.insureArray.controls['existingInsuranceInd'].setValidators([Validators.required]);
    } else {
      this.insureArray.controls['existingInsuranceInd'].patchValue('');

      this.insureArray.controls['existingInsuranceInd'].setValidators(null);

    }
    this.insureArray.controls['existingInsuranceInd'].updateValueAndValidity();
  }
  history2Change1(){
    if (this.insureArray.controls['sinsureHistory2'].value == 'Yes') {
      this.insureArray.controls['sexistingInsuranceInd'].patchValue(this.insureArray.controls['sexistingInsuranceInd'].value);

      this.insureArray.controls['sexistingInsuranceInd'].setValidators([Validators.required]);
    } else {
      this.insureArray.controls['sexistingInsuranceInd'].patchValue('');

      this.insureArray.controls['sexistingInsuranceInd'].setValidators(null);

    }
    this.insureArray.controls['sexistingInsuranceInd'].updateValueAndValidity();
  }
  sumAssuredCiError() {
    if (this.addon.controls['criticalsumAssured'].value <= this.ci_sumassured_max) {
      this.ciError =false;
      this.ciError ='';
      if (this.addon.controls['criticalsumAssured'].value >= this.ci_sumassured_min){
        this.ciError =false;
        this.ciError ='';
      }else{
        this.ciError = true;
        this.ciError = 'SumAssured Critical Illness should be ';
      }

    } else {
      this.ciError = true;
      this.ciError = 'SumAssured Critical Illness should be ';
    }
  }
  sumAssuredHCBError() {
    if (this.addon.controls['sumAssuredHCB'].value <= this.hcb_sumassured_max)  {
      this.hcbdError=false;
      this.hcbdError ='';
      if(this.addon.controls['sumAssuredHCB'].value >= this.hcb_sumassured_min){
        this.hcbdError=false;
        this.hcbdError ='';
      }else{
        this.hcbdError=true;
        this.hcbdError = 'SumAssured Hospital Cash Benefit should be ';
      }
    } else {
      this.hcbdError=true;
      this.hcbdError = 'SumAssured Hospital Cash Benefit should be ';
    }
  }

  healthStatusReq(i){
    if (this.medicalDetail['controls'].medicalFamilyQuestions['controls'][i]['controls'].healthStatus.value =='Deceased') {
      this.medicalDetail['controls'].medicalFamilyQuestions['controls'][i]['controls'].age.setValidators(null);
      this.medicalDetail['controls'].medicalFamilyQuestions['controls'][i]['controls'].age.patchValue('');


      this.medicalDetail['controls'].medicalFamilyQuestions['controls'][i]['controls'].ageOnDeath.setValidators([Validators.required]);
      this.medicalDetail['controls'].medicalFamilyQuestions['controls'][i]['controls'].causeOfDeath.setValidators([Validators.required]);
      } else {


      this.medicalDetail['controls'].medicalFamilyQuestions['controls'][i]['controls'].ageOnDeath.patchValue('');
      this.medicalDetail['controls'].medicalFamilyQuestions['controls'][i]['controls'].causeOfDeath.patchValue('');
      this.medicalDetail['controls'].medicalFamilyQuestions['controls'][i]['controls'].ageOnDeath.setValidators(null);
      this.medicalDetail['controls'].medicalFamilyQuestions['controls'][i]['controls'].causeOfDeath.setValidators(null);
      this.medicalDetail['controls'].medicalFamilyQuestions['controls'][i]['controls'].age.setValidators([Validators.required]);
      }
    this.medicalDetail['controls'].medicalFamilyQuestions['controls'][i]['controls'].age.updateValueAndValidity();
    this.medicalDetail['controls'].medicalFamilyQuestions['controls'][i]['controls'].ageOnDeath.updateValueAndValidity();
    this.medicalDetail['controls'].medicalFamilyQuestions['controls'][i]['controls'].causeOfDeath.updateValueAndValidity();
    }
  shealthStatusReq(i){
    if (this.medicalDetail['controls'].smedicalFamilyQuestions['controls'][i]['controls'].shealthStatus.value =='Deceased') {
      this.medicalDetail['controls'].smedicalFamilyQuestions['controls'][i]['controls'].sage.setValidators(null);
      this.medicalDetail['controls'].smedicalFamilyQuestions['controls'][i]['controls'].sage.patchValue('');


      this.medicalDetail['controls'].smedicalFamilyQuestions['controls'][i]['controls'].sageOnDeath.setValidators([Validators.required]);
      this.medicalDetail['controls'].smedicalFamilyQuestions['controls'][i]['controls'].scauseOfDeath.setValidators([Validators.required]);
    } else {


      this.medicalDetail['controls'].smedicalFamilyQuestions['controls'][i]['controls'].sageOnDeath.patchValue('');
      this.medicalDetail['controls'].smedicalFamilyQuestions['controls'][i]['controls'].scauseOfDeath.patchValue('');
      this.medicalDetail['controls'].smedicalFamilyQuestions['controls'][i]['controls'].sageOnDeath.setValidators(null);
      this.medicalDetail['controls'].smedicalFamilyQuestions['controls'][i]['controls'].scauseOfDeath.setValidators(null);
      this.medicalDetail['controls'].smedicalFamilyQuestions['controls'][i]['controls'].sage.setValidators([Validators.required]);
    }
    this.medicalDetail['controls'].smedicalFamilyQuestions['controls'][i]['controls'].sage.updateValueAndValidity();
    this.medicalDetail['controls'].smedicalFamilyQuestions['controls'][i]['controls'].sageOnDeath.updateValueAndValidity();
    this.medicalDetail['controls'].smedicalFamilyQuestions['controls'][i]['controls'].scauseOfDeath.updateValueAndValidity();
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


  insureHistorys(){
    if (this.insureArray.controls['insureHistory'].value=='Yes') {
      // this.addon.controls['reasonInsured'].patchValue(this.addon.controls['reasonInsured'].value);
      // this.addon.controls['whenInsured'].patchValue(this.addon.controls['whenInsured'].value);

      this.insureArray.controls['reasonInsured'].setValidators([Validators.required]);
      this.insureArray.controls['whenInsured'].setValidators([Validators.required]);
    } else {
      this.insureArray.controls['reasonInsured'].patchValue('');
      this.insureArray.controls['whenInsured'].patchValue('');

      this.insureArray.controls['reasonInsured'].setValidators(null);
      this.insureArray.controls['whenInsured'].setValidators(null);

    }
    this.insureArray.controls['reasonInsured'].updateValueAndValidity();
    this.insureArray.controls['whenInsured'].updateValueAndValidity();

  }
  insureHistorys1(){
    if (this.insureArray.controls['sinsureHistory'].value=='Yes') {
      // this.addon.controls['sreasonInsured'].patchValue(this.addon.controls['sreasonInsured'].value);
      // this.addon.controls['swhenInsured'].patchValue(this.addon.controls['swhenInsured'].value);

      this.insureArray.controls['sreasonInsured'].setValidators([Validators.required]);
      this.insureArray.controls['swhenInsured'].setValidators([Validators.required]);
    } else if(this.insureArray.controls['sinsureHistory'].value=='No'||this.insureArray.controls['sinsureHistory'].value=='') {
      this.insureArray.controls['sreasonInsured'].patchValue('');
      this.insureArray.controls['swhenInsured'].patchValue('');

      this.insureArray.controls['sreasonInsured'].setValidators(null);
      this.insureArray.controls['swhenInsured'].setValidators(null);

    }
    this.insureArray.controls['sreasonInsured'].updateValueAndValidity();
    this.insureArray.controls['swhenInsured'].updateValueAndValidity();

  }
  insureHistorys2(){
    if (this.insureArray.controls['sinsureHistory1'].value=='Yes') {
      this.insureArray.controls['scompanyName1'].setValidators([Validators.required]);
      this.insureArray.controls['sreasonInsured1'].setValidators([Validators.required]);
      this.insureArray.controls['swhenInsured1'].setValidators([Validators.required]);
    } else  {
      this.insureArray.controls['scompanyName1'].patchValue('');
      this.insureArray.controls['sreasonInsured1'].patchValue('');
      this.insureArray.controls['swhenInsured1'].patchValue('');

      this.insureArray.controls['scompanyName1'].setValidators(null);
      this.insureArray.controls['sreasonInsured1'].setValidators(null);
      this.insureArray.controls['swhenInsured1'].setValidators(null);

    }
    this.insureArray.controls['scompanyName1'].updateValueAndValidity();
    this.insureArray.controls['sreasonInsured1'].updateValueAndValidity();
    this.insureArray.controls['swhenInsured1'].updateValueAndValidity();

  }
  insureHistorys21(){
    if (this.insureArray.controls['insureHistory1'].value=='Yes') {
      this.insureArray.controls['companyName1'].setValidators([Validators.required]);
      this.insureArray.controls['reasonInsured1'].setValidators([Validators.required]);
      this.insureArray.controls['whenInsured1'].setValidators([Validators.required]);
    } else  {
      this.insureArray.controls['companyName1'].patchValue('');
      this.insureArray.controls['reasonInsured1'].patchValue('');
      this.insureArray.controls['whenInsured1'].patchValue('');

      this.insureArray.controls['companyName1'].setValidators(null);
      this.insureArray.controls['reasonInsured1'].setValidators(null);
      this.insureArray.controls['whenInsured1'].setValidators(null);

    }
    this.insureArray.controls['companyName1'].updateValueAndValidity();
    this.insureArray.controls['reasonInsured1'].updateValueAndValidity();
    this.insureArray.controls['whenInsured1'].updateValueAndValidity();

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

  // diseaseReq() {
  //
  //   if (this.medicalDetail.controls['healthInformation'].value == true) {
  //     for (let i = 0; i < this.medicalDetail['controls'].medicalQuestions['controls'].length; i++) {
  //
  //       if (i != 0) {
  //       }
  //
  //       this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].disease.patchValue(this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].disease.value);
  //       this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].datediagnois.patchValue(this.datepipe.transform(this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].datediagnois.value, 'y-MM-dd'));
  //       this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].treatment.patchValue(this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].treatment.value);
  //       this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].dosage.patchValue(this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].dosage.value);
  //       this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].doctor.patchValue(this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].doctor.value);
  //       this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].datefollowup.patchValue(this.datepipe.transform(this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].datefollowup.value, 'y-MM-dd'));
  //       this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].anycomplications.patchValue(this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].anycomplications.value);
  //       this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].remarks.patchValue(this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].remarks.value);
  //
  //       this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].disease.setValidators([Validators.required]);
  //       this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].datediagnois.setValidators([Validators.required]);
  //       this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].treatment.setValidators([Validators.required]);
  //       this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].dosage.setValidators([Validators.required]);
  //       this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].doctor.setValidators([Validators.required]);
  //       this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].datefollowup.setValidators([Validators.required]);
  //       this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].anycomplications.setValidators([Validators.required]);
  //       this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].remarks.setValidators([Validators.required]);
  //     }
  //
  //   } else if (this.medicalDetail.controls['healthInformation'].value == false) {
  //     for (let i = 0; i < this.medicalDetail['controls'].medicalQuestions['controls'].length; i++) {
  //
  //       if (i != 0) {
  //       }
  //       this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].disease.patchValue('');
  //       this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].datediagnois.patchValue(null);
  //       this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].treatment.patchValue('');
  //       this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].dosage.patchValue('');
  //       this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].doctor.patchValue('');
  //       this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].datefollowup.patchValue(null);
  //       this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].anycomplications.patchValue('');
  //       this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].remarks.patchValue('');
  //
  //       this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].disease.setValidators(null);
  //       this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].datediagnois.setValidators(null);
  //       this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].treatment.setValidators(null);
  //       this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].dosage.setValidators(null);
  //       this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].doctor.setValidators(null);
  //       this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].datefollowup.setValidators(null);
  //       this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].anycomplications.setValidators(null);
  //       this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].remarks.setValidators(null);
  //     }
  //
  //
  //   }
  //   for (let i = 0; i < this.medicalDetail['controls'].medicalQuestions['controls'].length; i++) {
  //
  //     if (i != 0) {
  //     }
  //     this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].disease.updateValueAndValidity();
  //     this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].datediagnois.updateValueAndValidity();
  //     this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].treatment.updateValueAndValidity();
  //     this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].dosage.updateValueAndValidity();
  //     this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].doctor.updateValueAndValidity();
  //     this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].datefollowup.updateValueAndValidity();
  //     this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].anycomplications.updateValueAndValidity();
  //     this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].remarks.updateValueAndValidity();
  //
  //
  //   }
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
  changeTitlevalue() {

    if (this.customerDetails.controls['title'].value=='2') {

      this.medicalDetail.controls['pregnantInd'].setValidators([Validators.required]);
      this.medicalDetail.controls['femaleDieaseInd'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['pregnantInd'].patchValue('');
      this.medicalDetail.controls['femaleDieaseInd'].patchValue('');

      this.medicalDetail.controls['pregnantInd'].setValidators(null);
      this.medicalDetail.controls['femaleDieaseInd'].setValidators(null);

    }
    this.medicalDetail.controls['pregnantInd'].updateValueAndValidity();
    this.medicalDetail.controls['femaleDieaseInd'].updateValueAndValidity();

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


  travelOutside(){

    if(this.medicalDetail.controls['travelOutsideIndia'].value == '') {
      this.errortravelOutside = true;
      this.errortravelOutside = 'Field is Mandatory';
    }else if(this.medicalDetail.controls['travelOutsideIndia'].value != ''){
      this.errortravelOutside=false;
      this.errortravelOutside= '';
    }
    if(this.medicalDetail.controls['travelOutsideIndia1'].value == null) {
      this.serrortravelOutside = true;
      this.serrortravelOutside = 'Field is Mandatory';
    }else if(this.medicalDetail.controls['travelOutsideIndia1'].value != null){
      this.serrortravelOutside=false;
      this.serrortravelOutside= '';
    }
    if(this.medicalDetail.controls['pilot'].value == '') {
      this.piloterror=true;
      this.piloterror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['pilot'].value != ''){
      this.piloterror=false;
      this.piloterror= '';
    }
    if(this.medicalDetail.controls['pilot1'].value == null) {
      this.spiloterror=true;
      this.spiloterror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['pilot1'].value != null){
      this.spiloterror=false;
      this.spiloterror= '';
    }
    if(this.medicalDetail.controls['activity'].value == '') {
      this.activityerror=true;
      this.activityerror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['activity'].value != ''){
      this.activityerror=false;
      this.activityerror= '';
    }
    if(this.medicalDetail.controls['activity1'].value == null) {
      this.sactivityerror=true;
      this.sactivityerror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['activity1'].value != null){
      this.sactivityerror=false;
      this.sactivityerror= '';
    }
    if(this.medicalDetail.controls['drugsInd'].value == '') {
      this.drugsInderror=true;
      this.drugsInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['drugsInd'].value != ''){
      this.drugsInderror=false;
      this.drugsInderror= '';
    }
    if(this.medicalDetail.controls['drugsInd1'].value == null) {
      this.sdrugsInderror=true;
      this.sdrugsInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['drugsInd1'].value != null){
      this.sdrugsInderror=false;
      this.sdrugsInderror= '';
    }
    if(this.medicalDetail.controls['alcoholInd'].value == '') {
      this.alcoholInderror=true;
      this.alcoholInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['alcoholInd'].value != ''){
      this.alcoholInderror=false;
      this.alcoholInderror= '';
    }
    if(this.medicalDetail.controls['alcoholInd1'].value == null) {
      this.salcoholInderror=true;
      this.salcoholInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['alcoholInd1'].value != null){
      this.salcoholInderror=false;
      this.salcoholInderror= '';
    }
    if(this.medicalDetail.controls['tobaccoInd'].value == '') {
      this.tobaccoInderror=true;
      this.tobaccoInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['tobaccoInd'].value != ''){
      this.tobaccoInderror=false;
      this.tobaccoInderror= '';
    }
    if(this.medicalDetail.controls['tobaccoInd1'].value == null) {
      this.stobaccoInderror=true;
      this.stobaccoInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['tobaccoInd1'].value != null){
      this.stobaccoInderror=false;
      this.stobaccoInderror= '';
    }
    if(this.medicalDetail.controls['tobaccoStopInd'].value == '') {
      this.tobaccoStopInderror=true;
      this.tobaccoStopInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['tobaccoStopInd'].value != ''){
      this.tobaccoStopInderror=false;
      this.tobaccoStopInderror= '';
    }
    if(this.medicalDetail.controls['tobaccoStopInd1'].value == null) {
      this.stobaccoStopInderror=true;
      this.stobaccoStopInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['tobaccoStopInd1'].value !=null){
      this.stobaccoStopInderror=false;
      this.stobaccoStopInderror= '';
    }
    if(this.medicalDetail.controls['consultDoctorInd'].value == '') {
      this.consultDoctorInderror=true;
      this.consultDoctorInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['consultDoctorInd'].value != ''){
      this.consultDoctorInderror=false;
      this.consultDoctorInderror= '';
    }
    if(this.medicalDetail.controls['consultDoctorInd1'].value == null) {
      this.sconsultDoctorInderror=true;
      this.sconsultDoctorInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['consultDoctorInd1'].value != null){
      this.sconsultDoctorInderror=false;
      this.sconsultDoctorInderror= '';
    }
    if(this.medicalDetail.controls['ECGInd'].value == '') {
      this.ECGInderror=true;
      this.ECGInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['ECGInd'].value != ''){
      this.ECGInderror=false;
      this.ECGInderror= '';
    }
    if(this.medicalDetail.controls['ECGInd1'].value == null) {
      this.sECGInderror=true;
      this.sECGInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['ECGInd1'].value != null){
      this.sECGInderror=false;
      this.sECGInderror= '';
    }
    if(this.medicalDetail.controls['admitInd'].value == '') {
      this.admitInderror=true;
      this.admitInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['admitInd'].value != ''){
      this.admitInderror=false;
      this.admitInderror= '';
    }
    if(this.medicalDetail.controls['admitInd1'].value == null) {
      this.sadmitInderror=true;
      this.sadmitInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['admitInd1'].value != null){
      this.sadmitInderror=false;
      this.sadmitInderror= '';
    }
    if(this.medicalDetail.controls['medicalTreatment'].value == '') {
      this.medicalTreatmenterror=true;
      this.medicalTreatmenterror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['medicalTreatment'].value != ''){
      this.medicalTreatmenterror=false;
      this.medicalTreatmenterror= '';
    }
    if(this.medicalDetail.controls['medicalTreatment1'].value == null) {
      this.smedicalTreatmenterror=true;
      this.smedicalTreatmenterror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['medicalTreatment1'].value != null){
      this.smedicalTreatmenterror=false;
      this.smedicalTreatmenterror= '';
    }
    if(this.medicalDetail.controls['heartDieaseInd'].value == '') {
      this.heartDieaseInderror=true;
      this.heartDieaseInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['heartDieaseInd'].value != ''){
      this.heartDieaseInderror=false;
      this.heartDieaseInderror= '';
    }
    if(this.medicalDetail.controls['heartDieaseInd1'].value == null) {
      this.sheartDieaseInderror=true;
      this.sheartDieaseInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['heartDieaseInd1'].value != null){
      this.sheartDieaseInderror=false;
      this.sheartDieaseInderror= '';
    }
    if(this.medicalDetail.controls['respiratoryDieaseInd'].value == '') {
      this.respiratoryDieaseInderror=true;
      this.respiratoryDieaseInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['respiratoryDieaseInd'].value != ''){
      this.respiratoryDieaseInderror=false;
      this.respiratoryDieaseInderror= '';
    }
    if(this.medicalDetail.controls['respiratoryDieaseInd1'].value == null) {
      this.srespiratoryDieaseInderror=true;
      this.srespiratoryDieaseInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['respiratoryDieaseInd1'].value != null){
      this.srespiratoryDieaseInderror=false;
      this.srespiratoryDieaseInderror= '';
    }
    if(this.medicalDetail.controls['diabetesInd'].value == '') {
      this.diabetesInderror=true;
      this.diabetesInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['diabetesInd'].value != ''){
      this.diabetesInderror=false;
      this.diabetesInderror= '';
    }
    if(this.medicalDetail.controls['diabetesInd1'].value == null) {
      this.sdiabetesInderror=true;
      this.sdiabetesInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['diabetesInd1'].value != null){
      this.sdiabetesInderror=false;
      this.sdiabetesInderror= '';
    }
    if(this.medicalDetail.controls['kidneyDieaseInd'].value == '') {
      this.kidneyDieaseInderror=true;
      this.kidneyDieaseInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['kidneyDieaseInd'].value != ''){
      this.kidneyDieaseInderror=false;
      this.kidneyDieaseInderror= '';
    }
    if(this.medicalDetail.controls['kidneyDieaseInd1'].value == null) {
      this.skidneyDieaseInderror=true;
      this.skidneyDieaseInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['kidneyDieaseInd1'].value != null){
      this.skidneyDieaseInderror=false;
      this.skidneyDieaseInderror= '';
    }
    if(this.medicalDetail.controls['digestiveDieaseInd'].value == '') {
      this.digestiveDieaseInderror=true;
      this.digestiveDieaseInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['digestiveDieaseInd'].value != ''){
      this.digestiveDieaseInderror=false;
      this.digestiveDieaseInderror= '';
    }
    if(this.medicalDetail.controls['digestiveDieaseInd1'].value == null) {
      this.sdigestiveDieaseInderror=true;
      this.sdigestiveDieaseInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['digestiveDieaseInd1'].value != null){
      this.sdigestiveDieaseInderror=false;
      this.sdigestiveDieaseInderror= '';
    }
    if(this.medicalDetail.controls['cancerDieaseInd'].value == '') {
      this.cancerDieaseInderror=true;
      this.cancerDieaseInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['cancerDieaseInd'].value != ''){
      this.cancerDieaseInderror=false;
      this.cancerDieaseInderror= '';
    }
    if(this.medicalDetail.controls['cancerDieaseInd1'].value == null) {
      this.scancerDieaseInderror=true;
      this.scancerDieaseInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['cancerDieaseInd1'].value != null){
      this.scancerDieaseInderror=false;
      this.scancerDieaseInderror= '';
    }
    if(this.medicalDetail.controls['tropicalDieaseInd'].value == '') {
      this.tropicalDieaseInderror=true;
      this.tropicalDieaseInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['tropicalDieaseInd'].value != ''){
      this.tropicalDieaseInderror=false;
      this.tropicalDieaseInderror= '';
    }
    if(this.medicalDetail.controls['tropicalDieaseInd1'].value == null) {
      this.stropicalDieaseInderror=true;
      this.stropicalDieaseInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['tropicalDieaseInd1'].value != null){
      this.stropicalDieaseInderror=false;
      this.stropicalDieaseInderror= '';
    }
    if(this.medicalDetail.controls['thyroidDieaseInd'].value == '') {
      this.thyroidDieaseInderror=true;
      this.thyroidDieaseInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['thyroidDieaseInd'].value != ''){
      this.thyroidDieaseInderror=false;
      this.thyroidDieaseInderror= '';
    }
    if(this.medicalDetail.controls['thyroidDieaseInd1'].value == null) {
      this.sthyroidDieaseInderror=true;
      this.sthyroidDieaseInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['thyroidDieaseInd1'].value != null){
      this.sthyroidDieaseInderror=false;
      this.sthyroidDieaseInderror= '';
    }
    if(this.medicalDetail.controls['bloodDieaseInd'].value == '') {
      this.bloodDieaseInderror=true;
      this.bloodDieaseInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['bloodDieaseInd'].value != ''){
      this.bloodDieaseInderror=false;
      this.bloodDieaseInderror= '';
    }
    if(this.medicalDetail.controls['bloodDieaseInd1'].value == null) {
      this.sbloodDieaseInderror=true;
      this.sbloodDieaseInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['bloodDieaseInd1'].value != null){
      this.sbloodDieaseInderror=false;
      this.sbloodDieaseInderror= '';
    }
    if(this.medicalDetail.controls['nervousDieaseInd'].value == '') {
      this.nervousDieaseInderror=true;
      this.nervousDieaseInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['nervousDieaseInd'].value != ''){
      this.nervousDieaseInderror=false;
      this.nervousDieaseInderror= '';
    }
    if(this.medicalDetail.controls['nervousDieaseInd1'].value == null) {
      this.snervousDieaseInderror=true;
      this.snervousDieaseInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['nervousDieaseInd1'].value != null){
      this.snervousDieaseInderror=false;
      this.snervousDieaseInderror= '';
    }

    if(this.medicalDetail.controls['muscleDieaseInd'].value == '') {
      this.muscleDieaseInderror=true;
      this.muscleDieaseInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['muscleDieaseInd'].value != ''){
      this.muscleDieaseInderror=false;
      this.muscleDieaseInderror= '';
    }
    if(this.medicalDetail.controls['muscleDieaseInd1'].value == null) {
      this.smuscleDieaseInderror=true;
      this.smuscleDieaseInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['muscleDieaseInd1'].value != null){
      this.smuscleDieaseInderror=false;
      this.smuscleDieaseInderror= '';
    }
    if(this.medicalDetail.controls['receivedTreatment2'].value == '') {
      this.receivedTreatment2error=true;
      this.receivedTreatment2error= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['receivedTreatment2'].value != ''){
      this.receivedTreatment2error=false;
      this.receivedTreatment2error= '';
    }
    if(this.medicalDetail.controls['receivedTreatment21'].value == null) {
      this.sreceivedTreatment2error=true;
      this.sreceivedTreatment2error= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['receivedTreatment21'].value != null){
      this.sreceivedTreatment2error=false;
      this.sreceivedTreatment2error= '';
    }
    if(this.medicalDetail.controls['alcoholicInd'].value == '') {
      this.alcoholicInderror=true;
      this.alcoholicInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['alcoholicInd'].value != ''){
      this.alcoholicInderror=false;
      this.alcoholicInderror= '';
    }
    if(this.medicalDetail.controls['alcoholicInd1'].value == null) {
      this.salcoholicInderror=true;
      this.salcoholicInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['alcoholicInd1'].value != null){
      this.salcoholicInderror=false;
      this.salcoholicInderror= '';
    }
    if(this.medicalDetail.controls['otherIllnessInd'].value == '') {
      this.otherIllnessInderror=true;
      this.otherIllnessInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['otherIllnessInd'].value != ''){
      this.otherIllnessInderror=false;
      this.otherIllnessInderror= '';
    }
    if(this.medicalDetail.controls['otherIllnessInd1'].value == null) {
      this.sotherIllnessInderror=true;
      this.sotherIllnessInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['otherIllnessInd1'].value != null){
      this.sotherIllnessInderror=false;
      this.sotherIllnessInderror= '';
    }
    if(this.medicalDetail.controls['deformityInd'].value == '') {
      this.deformityInderror=true;
      this.deformityInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['deformityInd'].value != ''){
      this.deformityInderror=false;
      this.deformityInderror= '';
    }
    if(this.medicalDetail.controls['deformityInd1'].value == null) {
      this.sdeformityInderror=true;
      this.sdeformityInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['deformityInd1'].value != null){
      this.sdeformityInderror=false;
      this.sdeformityInderror= '';
    }
    if(this.medicalDetail.controls['receivedTreatment1'].value == '') {
      this.receivedTreatment1error=true;
      this.receivedTreatment1error= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['receivedTreatment1'].value != ''){
      this.receivedTreatment1error=false;
      this.receivedTreatment1error= '';
    }
    if(this.medicalDetail.controls['receivedTreatment11'].value == null) {
      this.sreceivedTreatment1error=true;
      this.sreceivedTreatment1error= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['receivedTreatment11'].value != null){
      this.sreceivedTreatment1error=false;
      this.sreceivedTreatment1error= '';
    }
    if(this.medicalDetail.controls['symptomsInd'].value == '') {
      this.symptomsInderror=true;
      this.symptomsInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['symptomsInd'].value != ''){
      this.symptomsInderror=false;
      this.symptomsInderror= '';
    }
    if(this.medicalDetail.controls['symptomsInd1'].value == null) {
      this.ssymptomsInderror=true;
      this.ssymptomsInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['symptomsInd1'].value != null){
      this.ssymptomsInderror=false;
      this.ssymptomsInderror= '';
    }
    // if(this.medicalDetail.controls['isHospitalized'].value == '') {
    //   this.isHospitalizederror=true;
    //   this.isHospitalizederror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['symptomsInd'].value != ''){
    //   this.isHospitalizederror=false;
    //   this.isHospitalizederror= '';
    // }
    // if(this.medicalDetail.controls['isHospitalized1'].value == null) {
    //   this.sHospitalizederror=true;
    //   this.sHospitalizederror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['isHospitalized1'].value != null){
    //   this.sHospitalizederror=false;
    //   this.sHospitalizederror= '';
    // }
    // if(this.medicalDetail.controls['isRecovered'].value == '') {
    //   this.isRecoverederror=true;
    //   this.isRecoverederror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['isRecovered'].value != ''){
    //   this.isRecoverederror=false;
    //   this.isRecoverederror= '';
    // }
    // if(this.medicalDetail.controls['isRecovered1'].value == null) {
    //   this.sRecoverederror=true;
    //   this.sRecoverederror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['isRecovered1'].value != null){
    //   this.sRecoverederror=false;
    //   this.sRecoverederror= '';
    // }
    if(this.medicalDetail.controls['pregnantInd'].value == '') {
      this.pregnantInderror=true;
      this.pregnantInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['pregnantInd'].value != ''){
      this.pregnantInderror=false;
      this.pregnantInderror= '';
    }
    if(this.medicalDetail.controls['pregnantInd1'].value == null) {
      this.spregnantInderror=true;
      this.spregnantInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['pregnantInd1'].value != null){
      this.spregnantInderror=false;
      this.spregnantInderror= '';
    }
    if(this.medicalDetail.controls['femaleDieaseInd'].value == '') {
      this.femaleDieaseInderror=true;
      this.femaleDieaseInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['femaleDieaseInd'].value != ''){
      this.femaleDieaseInderror=false;
      this.femaleDieaseInderror= '';
    }
    if(this.medicalDetail.controls['femaleDieaseInd1'].value == null) {
      this.sfemaleDieaseInderror=true;
      this.sfemaleDieaseInderror= 'Field is Mandatory';
    }else if(this.medicalDetail.controls['femaleDieaseInd1'].value != null){
      this.sfemaleDieaseInderror=false;
      this.sfemaleDieaseInderror= '';
    }

    // if(this.medicalDetail.controls['travelOutsideIndia'].value == '') {
    //   this.errortravelOutside = true;
    //   this.errortravelOutside = 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['travelOutsideIndia'].value != ''){
    //   this.errortravelOutside=false;
    //   this.errortravelOutside= '';
    // }
    // if(this.medicalDetail.controls['travelOutsideIndia1'].value == '') {
    //   this.serrortravelOutside = true;
    //   this.serrortravelOutside = 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['travelOutsideIndia1'].value != ''){
    //   this.serrortravelOutside=false;
    //   this.serrortravelOutside= '';
    // }
    // if(this.medicalDetail.controls['pilot'].value == '') {
    //   this.piloterror=true;
    //   this.piloterror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['pilot'].value != ''){
    //   this.piloterror=false;
    //   this.piloterror= '';
    // }
    // if(this.medicalDetail.controls['pilot1'].value == '') {
    //   this.spiloterror=true;
    //   this.spiloterror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['pilot1'].value != ''){
    //   this.spiloterror=false;
    //   this.spiloterror= '';
    // }
    // if(this.medicalDetail.controls['activity'].value == '') {
    //   this.activityerror=true;
    //   this.activityerror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['activity'].value != ''){
    //   this.activityerror=false;
    //   this.activityerror= '';
    // }
    // if(this.medicalDetail.controls['activity1'].value == '') {
    //   this.sactivityerror=true;
    //   this.sactivityerror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['activity1'].value != ''){
    //   this.sactivityerror=false;
    //   this.sactivityerror= '';
    // }
    // if(this.medicalDetail.controls['drugsInd'].value == '') {
    //   this.drugsInderror=true;
    //   this.drugsInderror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['drugsInd'].value != ''){
    //   this.drugsInderror=false;
    //   this.drugsInderror= '';
    // }
    // if(this.medicalDetail.controls['drugsInd1'].value == '') {
    //   this.sdrugsInderror=true;
    //   this.sdrugsInderror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['drugsInd1'].value != ''){
    //   this.sdrugsInderror=false;
    //   this.sdrugsInderror= '';
    // }
    // if(this.medicalDetail.controls['alcoholInd'].value == '') {
    //   this.alcoholInderror=true;
    //   this.alcoholInderror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['alcoholInd'].value != ''){
    //   this.alcoholInderror=false;
    //   this.alcoholInderror= '';
    // }
    // if(this.medicalDetail.controls['alcoholInd1'].value == '') {
    //   this.salcoholInderror=true;
    //   this.salcoholInderror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['alcoholInd1'].value != ''){
    //   this.salcoholInderror=false;
    //   this.salcoholInderror= '';
    // }
    // if(this.medicalDetail.controls['tobaccoInd'].value == '') {
    //   this.tobaccoInderror=true;
    //   this.tobaccoInderror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['tobaccoInd'].value != ''){
    //   this.tobaccoInderror=false;
    //   this.tobaccoInderror= '';
    // }
    // if(this.medicalDetail.controls['tobaccoInd1'].value == '') {
    //   this.stobaccoInderror=true;
    //   this.stobaccoInderror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['tobaccoInd1'].value != ''){
    //   this.stobaccoInderror=false;
    //   this.stobaccoInderror= '';
    // }
    // if(this.medicalDetail.controls['tobaccoStopInd'].value == '') {
    //   this.tobaccoStopInderror=true;
    //   this.tobaccoStopInderror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['tobaccoStopInd'].value != ''){
    //   this.tobaccoStopInderror=false;
    //   this.tobaccoStopInderror= '';
    // }
    // if(this.medicalDetail.controls['tobaccoStopInd1'].value == '') {
    //   this.stobaccoStopInderror=true;
    //   this.stobaccoStopInderror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['tobaccoStopInd1'].value !=''){
    //   this.stobaccoStopInderror=false;
    //   this.stobaccoStopInderror= '';
    // }
    // if(this.medicalDetail.controls['consultDoctorInd'].value == '') {
    //   this.consultDoctorInderror=true;
    //   this.consultDoctorInderror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['consultDoctorInd'].value != ''){
    //   this.consultDoctorInderror=false;
    //   this.consultDoctorInderror= '';
    // }
    // if(this.medicalDetail.controls['consultDoctorInd1'].value == '') {
    //   this.sconsultDoctorInderror=true;
    //   this.sconsultDoctorInderror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['consultDoctorInd1'].value != ''){
    //   this.sconsultDoctorInderror=false;
    //   this.sconsultDoctorInderror= '';
    // }
    // if(this.medicalDetail.controls['ECGInd'].value == '') {
    //   this.ECGInderror=true;
    //   this.ECGInderror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['ECGInd'].value != ''){
    //   this.ECGInderror=false;
    //   this.ECGInderror= '';
    // }
    // if(this.medicalDetail.controls['ECGInd1'].value == '') {
    //   this.sECGInderror=true;
    //   this.sECGInderror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['ECGInd1'].value != ''){
    //   this.sECGInderror=false;
    //   this.sECGInderror= '';
    // }
    // if(this.medicalDetail.controls['admitInd'].value == '') {
    //   this.admitInderror=true;
    //   this.admitInderror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['admitInd'].value != ''){
    //   this.admitInderror=false;
    //   this.admitInderror= '';
    // }
    // if(this.medicalDetail.controls['admitInd1'].value == '') {
    //   this.sadmitInderror=true;
    //   this.sadmitInderror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['admitInd1'].value != ''){
    //   this.sadmitInderror=false;
    //   this.sadmitInderror= '';
    // }
    // if(this.medicalDetail.controls['medicalTreatment'].value == '') {
    //   this.medicalTreatmenterror=true;
    //   this.medicalTreatmenterror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['medicalTreatment'].value != ''){
    //   this.medicalTreatmenterror=false;
    //   this.medicalTreatmenterror= '';
    // }
    // if(this.medicalDetail.controls['medicalTreatment1'].value == '') {
    //   this.smedicalTreatmenterror=true;
    //   this.smedicalTreatmenterror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['medicalTreatment1'].value != ''){
    //   this.smedicalTreatmenterror=false;
    //   this.smedicalTreatmenterror= '';
    // }
    // if(this.medicalDetail.controls['heartDieaseInd'].value == '') {
    //   this.heartDieaseInderror=true;
    //   this.heartDieaseInderror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['heartDieaseInd'].value != ''){
    //   this.heartDieaseInderror=false;
    //   this.heartDieaseInderror= '';
    // }
    // if(this.medicalDetail.controls['heartDieaseInd1'].value == '') {
    //   this.sheartDieaseInderror=true;
    //   this.sheartDieaseInderror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['heartDieaseInd1'].value != ''){
    //   this.sheartDieaseInderror=false;
    //   this.sheartDieaseInderror= '';
    // }
    // if(this.medicalDetail.controls['respiratoryDieaseInd'].value == '') {
    //   this.respiratoryDieaseInderror=true;
    //   this.respiratoryDieaseInderror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['respiratoryDieaseInd'].value != ''){
    //   this.respiratoryDieaseInderror=false;
    //   this.respiratoryDieaseInderror= '';
    // }
    // if(this.medicalDetail.controls['respiratoryDieaseInd1'].value == '') {
    //   this.srespiratoryDieaseInderror=true;
    //   this.srespiratoryDieaseInderror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['respiratoryDieaseInd1'].value != ''){
    //   this.srespiratoryDieaseInderror=false;
    //   this.srespiratoryDieaseInderror= '';
    // }
    // if(this.medicalDetail.controls['diabetesInd'].value == '') {
    //   this.diabetesInderror=true;
    //   this.diabetesInderror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['diabetesInd'].value != ''){
    //   this.diabetesInderror=false;
    //   this.diabetesInderror= '';
    // }
    // if(this.medicalDetail.controls['diabetesInd1'].value == '') {
    //   this.sdiabetesInderror=true;
    //   this.sdiabetesInderror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['diabetesInd1'].value != ''){
    //   this.sdiabetesInderror=false;
    //   this.sdiabetesInderror= '';
    // }
    // if(this.medicalDetail.controls['kidneyDieaseInd'].value == '') {
    //   this.kidneyDieaseInderror=true;
    //   this.kidneyDieaseInderror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['kidneyDieaseInd'].value != ''){
    //   this.kidneyDieaseInderror=false;
    //   this.kidneyDieaseInderror= '';
    // }
    // if(this.medicalDetail.controls['kidneyDieaseInd1'].value == '') {
    //   this.skidneyDieaseInderror=true;
    //   this.skidneyDieaseInderror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['kidneyDieaseInd1'].value != ''){
    //   this.skidneyDieaseInderror=false;
    //   this.skidneyDieaseInderror= '';
    // }
    // if(this.medicalDetail.controls['digestiveDieaseInd'].value == '') {
    //   this.digestiveDieaseInderror=true;
    //   this.digestiveDieaseInderror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['digestiveDieaseInd'].value != ''){
    //   this.digestiveDieaseInderror=false;
    //   this.digestiveDieaseInderror= '';
    // }
    // if(this.medicalDetail.controls['digestiveDieaseInd1'].value == '') {
    //   this.sdigestiveDieaseInderror=true;
    //   this.sdigestiveDieaseInderror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['digestiveDieaseInd1'].value != ''){
    //   this.sdigestiveDieaseInderror=false;
    //   this.sdigestiveDieaseInderror= '';
    // }
    // if(this.medicalDetail.controls['cancerDieaseInd'].value == '') {
    //   this.cancerDieaseInderror=true;
    //   this.cancerDieaseInderror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['cancerDieaseInd'].value != ''){
    //   this.cancerDieaseInderror=false;
    //   this.cancerDieaseInderror= '';
    // }
    // if(this.medicalDetail.controls['cancerDieaseInd1'].value == '') {
    //   this.scancerDieaseInderror=true;
    //   this.scancerDieaseInderror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['cancerDieaseInd1'].value != ''){
    //   this.scancerDieaseInderror=false;
    //   this.scancerDieaseInderror= '';
    // }
    // if(this.medicalDetail.controls['tropicalDieaseInd'].value == '') {
    //   this.tropicalDieaseInderror=true;
    //   this.tropicalDieaseInderror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['tropicalDieaseInd'].value != ''){
    //   this.tropicalDieaseInderror=false;
    //   this.tropicalDieaseInderror= '';
    // }
    // if(this.medicalDetail.controls['tropicalDieaseInd1'].value == '') {
    //   this.stropicalDieaseInderror=true;
    //   this.stropicalDieaseInderror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['tropicalDieaseInd1'].value != ''){
    //   this.stropicalDieaseInderror=false;
    //   this.stropicalDieaseInderror= '';
    // }
    // if(this.medicalDetail.controls['thyroidDieaseInd'].value == '') {
    //   this.thyroidDieaseInderror=true;
    //   this.thyroidDieaseInderror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['thyroidDieaseInd'].value != ''){
    //   this.thyroidDieaseInderror=false;
    //   this.thyroidDieaseInderror= '';
    // }
    // if(this.medicalDetail.controls['thyroidDieaseInd1'].value == '') {
    //   this.sthyroidDieaseInderror=true;
    //   this.sthyroidDieaseInderror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['thyroidDieaseInd1'].value != ''){
    //   this.sthyroidDieaseInderror=false;
    //   this.sthyroidDieaseInderror= '';
    // }
    // if(this.medicalDetail.controls['bloodDieaseInd'].value == '') {
    //   this.bloodDieaseInderror=true;
    //   this.bloodDieaseInderror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['bloodDieaseInd'].value != ''){
    //   this.bloodDieaseInderror=false;
    //   this.bloodDieaseInderror= '';
    // }
    // if(this.medicalDetail.controls['bloodDieaseInd1'].value == '') {
    //   this.sbloodDieaseInderror=true;
    //   this.sbloodDieaseInderror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['bloodDieaseInd1'].value != ''){
    //   this.sbloodDieaseInderror=false;
    //   this.sbloodDieaseInderror= '';
    // }
    // if(this.medicalDetail.controls['nervousDieaseInd'].value == '') {
    //   this.nervousDieaseInderror=true;
    //   this.nervousDieaseInderror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['nervousDieaseInd'].value != ''){
    //   this.nervousDieaseInderror=false;
    //   this.nervousDieaseInderror= '';
    // }
    // if(this.medicalDetail.controls['nervousDieaseInd1'].value == '') {
    //   this.snervousDieaseInderror=true;
    //   this.snervousDieaseInderror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['nervousDieaseInd1'].value != ''){
    //   this.snervousDieaseInderror=false;
    //   this.snervousDieaseInderror= '';
    // }
    //
    // if(this.medicalDetail.controls['muscleDieaseInd'].value == '') {
    //   this.muscleDieaseInderror=true;
    //   this.muscleDieaseInderror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['muscleDieaseInd'].value != ''){
    //   this.muscleDieaseInderror=false;
    //   this.muscleDieaseInderror= '';
    // }
    // if(this.medicalDetail.controls['muscleDieaseInd1'].value == '') {
    //   this.smuscleDieaseInderror=true;
    //   this.smuscleDieaseInderror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['muscleDieaseInd1'].value != ''){
    //   this.smuscleDieaseInderror=false;
    //   this.smuscleDieaseInderror= '';
    // }
    // if(this.medicalDetail.controls['receivedTreatment2'].value == '') {
    //   this.receivedTreatment2error=true;
    //   this.receivedTreatment2error= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['receivedTreatment2'].value != ''){
    //   this.receivedTreatment2error=false;
    //   this.receivedTreatment2error= '';
    // }
    // if(this.medicalDetail.controls['receivedTreatment21'].value == '') {
    //   this.sreceivedTreatment2error=true;
    //   this.sreceivedTreatment2error= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['receivedTreatment21'].value != ''){
    //   this.sreceivedTreatment2error=false;
    //   this.sreceivedTreatment2error= '';
    // }
    // if(this.medicalDetail.controls['alcoholicInd'].value == '') {
    //   this.alcoholicInderror=true;
    //   this.alcoholicInderror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['alcoholicInd'].value != ''){
    //   this.alcoholicInderror=false;
    //   this.alcoholicInderror= '';
    // }
    // if(this.medicalDetail.controls['alcoholicInd1'].value == '') {
    //   this.salcoholicInderror=true;
    //   this.salcoholicInderror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['alcoholicInd1'].value != ''){
    //   this.salcoholicInderror=false;
    //   this.salcoholicInderror= '';
    // }
    // if(this.medicalDetail.controls['otherIllnessInd'].value == '') {
    //   this.otherIllnessInderror=true;
    //   this.otherIllnessInderror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['otherIllnessInd'].value != ''){
    //   this.otherIllnessInderror=false;
    //   this.otherIllnessInderror= '';
    // }
    // if(this.medicalDetail.controls['otherIllnessInd1'].value == '') {
    //   this.sotherIllnessInderror=true;
    //   this.sotherIllnessInderror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['otherIllnessInd1'].value != ''){
    //   this.sotherIllnessInderror=false;
    //   this.sotherIllnessInderror= '';
    // }
    // if(this.medicalDetail.controls['deformityInd'].value == '') {
    //   this.deformityInderror=true;
    //   this.deformityInderror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['deformityInd'].value != ''){
    //   this.deformityInderror=false;
    //   this.deformityInderror= '';
    // }
    // if(this.medicalDetail.controls['deformityInd1'].value == '') {
    //   this.sdeformityInderror=true;
    //   this.sdeformityInderror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['deformityInd1'].value != ''){
    //   this.sdeformityInderror=false;
    //   this.sdeformityInderror= '';
    // }
    // if(this.medicalDetail.controls['receivedTreatment1'].value == '') {
    //   this.receivedTreatment1error=true;
    //   this.receivedTreatment1error= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['receivedTreatment1'].value != ''){
    //   this.receivedTreatment1error=false;
    //   this.receivedTreatment1error= '';
    // }
    // if(this.medicalDetail.controls['receivedTreatment11'].value == '') {
    //   this.sreceivedTreatment1error=true;
    //   this.sreceivedTreatment1error= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['receivedTreatment11'].value != ''){
    //   this.sreceivedTreatment1error=false;
    //   this.sreceivedTreatment1error= '';
    // }
    // if(this.medicalDetail.controls['symptomsInd'].value == '') {
    //   this.symptomsInderror=true;
    //   this.symptomsInderror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['symptomsInd'].value != ''){
    //   this.symptomsInderror=false;
    //   this.symptomsInderror= '';
    // }
    // if(this.medicalDetail.controls['symptomsInd1'].value == '') {
    //   this.ssymptomsInderror=true;
    //   this.ssymptomsInderror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['symptomsInd1'].value != ''){
    //   this.ssymptomsInderror=false;
    //   this.ssymptomsInderror= '';
    // }
    // if(this.medicalDetail.controls['isHospitalized'].value == '') {
    //   this.isHospitalizederror=true;
    //   this.isHospitalizederror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['symptomsInd'].value != ''){
    //   this.isHospitalizederror=false;
    //   this.isHospitalizederror= '';
    // }
    // if(this.medicalDetail.controls['isHospitalized1'].value == '') {
    //   this.sHospitalizederror=true;
    //   this.sHospitalizederror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['isHospitalized1'].value != ''){
    //   this.sHospitalizederror=false;
    //   this.sHospitalizederror= '';
    // }
    // if(this.medicalDetail.controls['isRecovered'].value == '') {
    //   this.isRecoverederror=true;
    //   this.isRecoverederror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['isRecovered'].value != ''){
    //   this.isRecoverederror=false;
    //   this.isRecoverederror= '';
    // }
    // if(this.medicalDetail.controls['isRecovered1'].value == '') {
    //   this.sRecoverederror=true;
    //   this.sRecoverederror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['isRecovered1'].value != ''){
    //   this.sRecoverederror=false;
    //   this.sRecoverederror= '';
    // }
    // if(this.medicalDetail.controls['pregnantInd'].value == '') {
    //   this.pregnantInderror=true;
    //   this.pregnantInderror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['pregnantInd'].value != ''){
    //   this.pregnantInderror=false;
    //   this.pregnantInderror= '';
    // }
    // if(this.medicalDetail.controls['pregnantInd1'].value == '') {
    //   this.spregnantInderror=true;
    //   this.spregnantInderror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['pregnantInd1'].value != ''){
    //   this.spregnantInderror=false;
    //   this.spregnantInderror= '';
    // }
    // if(this.medicalDetail.controls['femaleDieaseInd'].value == '') {
    //   this.femaleDieaseInderror=true;
    //   this.femaleDieaseInderror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['femaleDieaseInd'].value != ''){
    //   this.femaleDieaseInderror=false;
    //   this.femaleDieaseInderror= '';
    // }
    // if(this.medicalDetail.controls['femaleDieaseInd1'].value == '') {
    //   this.sfemaleDieaseInderror=true;
    //   this.sfemaleDieaseInderror= 'Field is Mandatory';
    // }else if(this.medicalDetail.controls['femaleDieaseInd1'].value != ''){
    //   this.sfemaleDieaseInderror=false;
    //   this.sfemaleDieaseInderror= '';
    // }

  }

  travelOutside1(){

   if(this.medicalDetail.controls['travelOutsideIndia'].value != ''){
      this.errortravelOutside=false;
      this.errortravelOutside= '';
    }
    if(this.medicalDetail.controls['travelOutsideIndia1'].value != null){
      this.serrortravelOutside=false;
      this.serrortravelOutside= '';
    }
    if(this.medicalDetail.controls['pilot'].value != ''){
      this.piloterror=false;
      this.piloterror= '';
    }
    if(this.medicalDetail.controls['pilot1'].value != null){
      this.spiloterror=false;
      this.spiloterror= '';
    }
   if(this.medicalDetail.controls['activity'].value != ''){
      this.activityerror=false;
      this.activityerror= '';
    }
   if(this.medicalDetail.controls['activity1'].value != null){
      this.sactivityerror=false;
      this.sactivityerror= '';
    }
   if(this.medicalDetail.controls['drugsInd'].value != ''){
      this.drugsInderror=false;
      this.drugsInderror= '';
    }
    if(this.medicalDetail.controls['drugsInd1'].value != null){
      this.sdrugsInderror=false;
      this.sdrugsInderror= '';
    }
    if(this.medicalDetail.controls['alcoholInd'].value != ''){
      this.alcoholInderror=false;
      this.alcoholInderror= '';
    }
    if(this.medicalDetail.controls['alcoholInd1'].value != null){
      this.salcoholInderror=false;
      this.salcoholInderror= '';
    }
    if(this.medicalDetail.controls['tobaccoInd'].value != ''){
      this.tobaccoInderror=false;
      this.tobaccoInderror= '';
    }
    if(this.medicalDetail.controls['tobaccoInd1'].value != null){
      this.stobaccoInderror=false;
      this.stobaccoInderror= '';
    }
    if(this.medicalDetail.controls['tobaccoStopInd'].value != ''){
      this.tobaccoStopInderror=false;
      this.tobaccoStopInderror= '';
    }
    if(this.medicalDetail.controls['tobaccoStopInd1'].value != null){
      this.stobaccoStopInderror=false;
      this.stobaccoStopInderror= '';
    }
    if(this.medicalDetail.controls['consultDoctorInd'].value != ''){
      this.consultDoctorInderror=false;
      this.consultDoctorInderror= '';
    }
    if(this.medicalDetail.controls['consultDoctorInd1'].value != null){
      this.sconsultDoctorInderror=false;
      this.sconsultDoctorInderror= '';
    }
   if(this.medicalDetail.controls['ECGInd'].value != ''){
      this.ECGInderror=false;
      this.ECGInderror= '';
    }
    if(this.medicalDetail.controls['ECGInd1'].value != null){
      this.sECGInderror=false;
      this.sECGInderror= '';
    }
    if(this.medicalDetail.controls['admitInd'].value != ''){
      this.admitInderror=false;
      this.admitInderror= '';
    }
    if(this.medicalDetail.controls['admitInd1'].value != null){
      this.sadmitInderror=false;
      this.sadmitInderror= '';
    }
    if(this.medicalDetail.controls['medicalTreatment'].value != ''){
      this.medicalTreatmenterror=false;
      this.medicalTreatmenterror= '';
    }
   if(this.medicalDetail.controls['medicalTreatment1'].value != null){
      this.smedicalTreatmenterror=false;
      this.smedicalTreatmenterror= '';
    }
    if(this.medicalDetail.controls['heartDieaseInd'].value != ''){
      this.heartDieaseInderror=false;
      this.heartDieaseInderror= '';
    }
    if(this.medicalDetail.controls['heartDieaseInd1'].value != null){
      this.sheartDieaseInderror=false;
      this.sheartDieaseInderror= '';
    }
    if(this.medicalDetail.controls['respiratoryDieaseInd'].value != ''){
      this.respiratoryDieaseInderror=false;
      this.respiratoryDieaseInderror= '';
    }
    if(this.medicalDetail.controls['respiratoryDieaseInd1'].value != null){
      this.srespiratoryDieaseInderror=false;
      this.srespiratoryDieaseInderror= '';
    }
   if(this.medicalDetail.controls['diabetesInd'].value != ''){
      this.diabetesInderror=false;
      this.diabetesInderror= '';
    }
    if(this.medicalDetail.controls['diabetesInd1'].value != null){
      this.sdiabetesInderror=false;
      this.sdiabetesInderror= '';
    }
   if(this.medicalDetail.controls['kidneyDieaseInd'].value != ''){
      this.kidneyDieaseInderror=false;
      this.kidneyDieaseInderror= '';
    }
   if(this.medicalDetail.controls['kidneyDieaseInd1'].value != null){
      this.skidneyDieaseInderror=false;
      this.skidneyDieaseInderror= '';
    }
    if(this.medicalDetail.controls['digestiveDieaseInd'].value != ''){
      this.digestiveDieaseInderror=false;
      this.digestiveDieaseInderror= '';
    }
    if(this.medicalDetail.controls['digestiveDieaseInd1'].value != null){
      this.sdigestiveDieaseInderror=false;
      this.sdigestiveDieaseInderror= '';
    }
    if(this.medicalDetail.controls['cancerDieaseInd'].value != ''){
      this.cancerDieaseInderror=false;
      this.cancerDieaseInderror= '';
    }
    if(this.medicalDetail.controls['cancerDieaseInd1'].value != null){
      this.scancerDieaseInderror=false;
      this.scancerDieaseInderror= '';
    }
    if(this.medicalDetail.controls['tropicalDieaseInd'].value != ''){
      this.tropicalDieaseInderror=false;
      this.tropicalDieaseInderror= '';
    }
    if(this.medicalDetail.controls['tropicalDieaseInd1'].value != null){
      this.stropicalDieaseInderror=false;
      this.stropicalDieaseInderror= '';
    }
    if(this.medicalDetail.controls['thyroidDieaseInd'].value != ''){
      this.thyroidDieaseInderror=false;
      this.thyroidDieaseInderror= '';
    }
    if(this.medicalDetail.controls['thyroidDieaseInd1'].value != null){
      this.sthyroidDieaseInderror=false;
      this.sthyroidDieaseInderror= '';
    }
   if(this.medicalDetail.controls['bloodDieaseInd'].value != ''){
      this.bloodDieaseInderror=false;
      this.bloodDieaseInderror= '';
    }
    if(this.medicalDetail.controls['bloodDieaseInd1'].value != null){
      this.sbloodDieaseInderror=false;
      this.sbloodDieaseInderror= '';
    }
    if(this.medicalDetail.controls['nervousDieaseInd'].value != ''){
      this.nervousDieaseInderror=false;
      this.nervousDieaseInderror= '';
    }
    if(this.medicalDetail.controls['nervousDieaseInd1'].value != null){
      this.snervousDieaseInderror=false;
      this.snervousDieaseInderror= '';
    }

    if(this.medicalDetail.controls['muscleDieaseInd'].value != ''){
      this.muscleDieaseInderror=false;
      this.muscleDieaseInderror= '';
    }
    if(this.medicalDetail.controls['muscleDieaseInd1'].value != null){
      this.smuscleDieaseInderror=false;
      this.smuscleDieaseInderror= '';
    }
    if(this.medicalDetail.controls['receivedTreatment2'].value != ''){
      this.receivedTreatment2error=false;
      this.receivedTreatment2error= '';
    }
    if(this.medicalDetail.controls['receivedTreatment21'].value != null){
      this.sreceivedTreatment2error=false;
      this.sreceivedTreatment2error= '';
    }
    if(this.medicalDetail.controls['alcoholicInd'].value != ''){
      this.alcoholicInderror=false;
      this.alcoholicInderror= '';
    }
    if(this.medicalDetail.controls['alcoholicInd1'].value != null){
      this.salcoholicInderror=false;
      this.salcoholicInderror= '';
    }
    if(this.medicalDetail.controls['otherIllnessInd'].value != ''){
      this.otherIllnessInderror=false;
      this.otherIllnessInderror= '';
    }
    if(this.medicalDetail.controls['otherIllnessInd1'].value != null){
      this.sotherIllnessInderror=false;
      this.sotherIllnessInderror= '';
    }
    if(this.medicalDetail.controls['deformityInd'].value != ''){
      this.deformityInderror=false;
      this.deformityInderror= '';
    }
    if(this.medicalDetail.controls['deformityInd1'].value != null){
      this.sdeformityInderror=false;
      this.sdeformityInderror= '';
    }
    if(this.medicalDetail.controls['receivedTreatment1'].value != ''){
      this.receivedTreatment1error=false;
      this.receivedTreatment1error= '';
    }
    if(this.medicalDetail.controls['receivedTreatment11'].value != null){
      this.sreceivedTreatment1error=false;
      this.sreceivedTreatment1error= '';
    }
    if(this.medicalDetail.controls['symptomsInd'].value != ''){
      this.symptomsInderror=false;
      this.symptomsInderror= '';
    }
    if(this.medicalDetail.controls['symptomsInd1'].value != null){
      this.ssymptomsInderror=false;
      this.ssymptomsInderror= '';
    }
   //  if(this.medicalDetail.controls['symptomsInd'].value != ''){
   //    this.isHospitalizederror=false;
   //    this.isHospitalizederror= '';
   //  }
   // if(this.medicalDetail.controls['isHospitalized1'].value != null){
   //    this.sHospitalizederror=false;
   //    this.sHospitalizederror= '';
   //  }
    // if(this.medicalDetail.controls['isRecovered'].value != ''){
    //   this.isRecoverederror=false;
    //   this.isRecoverederror= '';
    // }
    // if(this.medicalDetail.controls['isRecovered1'].value != null){
    //   this.sRecoverederror=false;
    //   this.sRecoverederror= '';
    // }
    if(this.medicalDetail.controls['pregnantInd'].value != ''){
      this.pregnantInderror=false;
      this.pregnantInderror= '';
    }
    if(this.medicalDetail.controls['pregnantInd1'].value != null){
      this.spregnantInderror=false;
      this.spregnantInderror= '';
    }
    if(this.medicalDetail.controls['femaleDieaseInd'].value != ''){
      this.femaleDieaseInderror=false;
      this.femaleDieaseInderror= '';
    }
    if(this.medicalDetail.controls['femaleDieaseInd1'].value != null){
      this.sfemaleDieaseInderror=false;
      this.sfemaleDieaseInderror= '';
    }
    // if(this.medicalDetail.controls['travelOutsideIndia'].value != ''){
    //   this.errortravelOutside=false;
    //   this.errortravelOutside= '';
    // }
    // if(this.medicalDetail.controls['travelOutsideIndia1'].value != ''){
    //   this.serrortravelOutside=false;
    //   this.serrortravelOutside= '';
    // }
    // if(this.medicalDetail.controls['pilot'].value != ''){
    //   this.piloterror=false;
    //   this.piloterror= '';
    // }
    // if(this.medicalDetail.controls['pilot1'].value != ''){
    //   this.spiloterror=false;
    //   this.spiloterror= '';
    // }
    // if(this.medicalDetail.controls['activity'].value != ''){
    //   this.activityerror=false;
    //   this.activityerror= '';
    // }
    // if(this.medicalDetail.controls['activity1'].value != ''){
    //   this.sactivityerror=false;
    //   this.sactivityerror= '';
    // }
    // if(this.medicalDetail.controls['drugsInd'].value != ''){
    //   this.drugsInderror=false;
    //   this.drugsInderror= '';
    // }
    // if(this.medicalDetail.controls['drugsInd1'].value != ''){
    //   this.sdrugsInderror=false;
    //   this.sdrugsInderror= '';
    // }
    // if(this.medicalDetail.controls['alcoholInd'].value != ''){
    //   this.alcoholInderror=false;
    //   this.alcoholInderror= '';
    // }
    // if(this.medicalDetail.controls['alcoholInd1'].value != ''){
    //   this.salcoholInderror=false;
    //   this.salcoholInderror= '';
    // }
    // if(this.medicalDetail.controls['tobaccoInd'].value != ''){
    //   this.tobaccoInderror=false;
    //   this.tobaccoInderror= '';
    // }
    // if(this.medicalDetail.controls['tobaccoInd1'].value != ''){
    //   this.stobaccoInderror=false;
    //   this.stobaccoInderror= '';
    // }
    // if(this.medicalDetail.controls['tobaccoStopInd'].value != ''){
    //   this.tobaccoStopInderror=false;
    //   this.tobaccoStopInderror= '';
    // }
    // if(this.medicalDetail.controls['tobaccoStopInd1'].value != ''){
    //   this.stobaccoStopInderror=false;
    //   this.stobaccoStopInderror= '';
    // }
    // if(this.medicalDetail.controls['consultDoctorInd'].value != ''){
    //   this.consultDoctorInderror=false;
    //   this.consultDoctorInderror= '';
    // }
    // if(this.medicalDetail.controls['consultDoctorInd1'].value != ''){
    //   this.sconsultDoctorInderror=false;
    //   this.sconsultDoctorInderror= '';
    // }
    // if(this.medicalDetail.controls['ECGInd'].value != ''){
    //   this.ECGInderror=false;
    //   this.ECGInderror= '';
    // }
    // if(this.medicalDetail.controls['ECGInd1'].value != ''){
    //   this.sECGInderror=false;
    //   this.sECGInderror= '';
    // }
    // if(this.medicalDetail.controls['admitInd'].value != ''){
    //   this.admitInderror=false;
    //   this.admitInderror= '';
    // }
    // if(this.medicalDetail.controls['admitInd1'].value != ''){
    //   this.sadmitInderror=false;
    //   this.sadmitInderror= '';
    // }
    // if(this.medicalDetail.controls['medicalTreatment'].value != ''){
    //   this.medicalTreatmenterror=false;
    //   this.medicalTreatmenterror= '';
    // }
    // if(this.medicalDetail.controls['medicalTreatment1'].value != ''){
    //   this.smedicalTreatmenterror=false;
    //   this.smedicalTreatmenterror= '';
    // }
    // if(this.medicalDetail.controls['heartDieaseInd'].value != ''){
    //   this.heartDieaseInderror=false;
    //   this.heartDieaseInderror= '';
    // }
    // if(this.medicalDetail.controls['heartDieaseInd1'].value != ''){
    //   this.sheartDieaseInderror=false;
    //   this.sheartDieaseInderror= '';
    // }
    // if(this.medicalDetail.controls['respiratoryDieaseInd'].value != ''){
    //   this.respiratoryDieaseInderror=false;
    //   this.respiratoryDieaseInderror= '';
    // }
    // if(this.medicalDetail.controls['respiratoryDieaseInd1'].value != ''){
    //   this.srespiratoryDieaseInderror=false;
    //   this.srespiratoryDieaseInderror= '';
    // }
    // if(this.medicalDetail.controls['diabetesInd'].value != ''){
    //   this.diabetesInderror=false;
    //   this.diabetesInderror= '';
    // }
    // if(this.medicalDetail.controls['diabetesInd1'].value != ''){
    //   this.sdiabetesInderror=false;
    //   this.sdiabetesInderror= '';
    // }
    // if(this.medicalDetail.controls['kidneyDieaseInd'].value != ''){
    //   this.kidneyDieaseInderror=false;
    //   this.kidneyDieaseInderror= '';
    // }
    // if(this.medicalDetail.controls['kidneyDieaseInd1'].value != ''){
    //   this.skidneyDieaseInderror=false;
    //   this.skidneyDieaseInderror= '';
    // }
    // if(this.medicalDetail.controls['digestiveDieaseInd'].value != ''){
    //   this.digestiveDieaseInderror=false;
    //   this.digestiveDieaseInderror= '';
    // }
    // if(this.medicalDetail.controls['digestiveDieaseInd1'].value != ''){
    //   this.sdigestiveDieaseInderror=false;
    //   this.sdigestiveDieaseInderror= '';
    // }
    // if(this.medicalDetail.controls['cancerDieaseInd'].value != ''){
    //   this.cancerDieaseInderror=false;
    //   this.cancerDieaseInderror= '';
    // }
    // if(this.medicalDetail.controls['cancerDieaseInd1'].value != ''){
    //   this.scancerDieaseInderror=false;
    //   this.scancerDieaseInderror= '';
    // }
    // if(this.medicalDetail.controls['tropicalDieaseInd'].value != ''){
    //   this.tropicalDieaseInderror=false;
    //   this.tropicalDieaseInderror= '';
    // }
    // if(this.medicalDetail.controls['tropicalDieaseInd1'].value != ''){
    //   this.stropicalDieaseInderror=false;
    //   this.stropicalDieaseInderror= '';
    // }
    // if(this.medicalDetail.controls['thyroidDieaseInd'].value != ''){
    //   this.thyroidDieaseInderror=false;
    //   this.thyroidDieaseInderror= '';
    // }
    // if(this.medicalDetail.controls['thyroidDieaseInd1'].value != ''){
    //   this.sthyroidDieaseInderror=false;
    //   this.sthyroidDieaseInderror= '';
    // }
    // if(this.medicalDetail.controls['bloodDieaseInd'].value != ''){
    //   this.bloodDieaseInderror=false;
    //   this.bloodDieaseInderror= '';
    // }
    // if(this.medicalDetail.controls['bloodDieaseInd1'].value != ''){
    //   this.sbloodDieaseInderror=false;
    //   this.sbloodDieaseInderror= '';
    // }
    // if(this.medicalDetail.controls['nervousDieaseInd'].value != ''){
    //   this.nervousDieaseInderror=false;
    //   this.nervousDieaseInderror= '';
    // }
    // if(this.medicalDetail.controls['nervousDieaseInd1'].value != ''){
    //   this.snervousDieaseInderror=false;
    //   this.snervousDieaseInderror= '';
    // }
    //
    // if(this.medicalDetail.controls['muscleDieaseInd'].value != ''){
    //   this.muscleDieaseInderror=false;
    //   this.muscleDieaseInderror= '';
    // }
    // if(this.medicalDetail.controls['muscleDieaseInd1'].value != ''){
    //   this.smuscleDieaseInderror=false;
    //   this.smuscleDieaseInderror= '';
    // }
    // if(this.medicalDetail.controls['receivedTreatment2'].value != ''){
    //   this.receivedTreatment2error=false;
    //   this.receivedTreatment2error= '';
    // }
    // if(this.medicalDetail.controls['receivedTreatment21'].value != ''){
    //   this.sreceivedTreatment2error=false;
    //   this.sreceivedTreatment2error= '';
    // }
    // if(this.medicalDetail.controls['alcoholicInd'].value != ''){
    //   this.alcoholicInderror=false;
    //   this.alcoholicInderror= '';
    // }
    // if(this.medicalDetail.controls['alcoholicInd1'].value != ''){
    //   this.salcoholicInderror=false;
    //   this.salcoholicInderror= '';
    // }
    // if(this.medicalDetail.controls['otherIllnessInd'].value != ''){
    //   this.otherIllnessInderror=false;
    //   this.otherIllnessInderror= '';
    // }
    // if(this.medicalDetail.controls['otherIllnessInd1'].value != ''){
    //   this.sotherIllnessInderror=false;
    //   this.sotherIllnessInderror= '';
    // }
    // if(this.medicalDetail.controls['deformityInd'].value != ''){
    //   this.deformityInderror=false;
    //   this.deformityInderror= '';
    // }
    // if(this.medicalDetail.controls['deformityInd1'].value != ''){
    //   this.sdeformityInderror=false;
    //   this.sdeformityInderror= '';
    // }
    // if(this.medicalDetail.controls['receivedTreatment1'].value != ''){
    //   this.receivedTreatment1error=false;
    //   this.receivedTreatment1error= '';
    // }
    // if(this.medicalDetail.controls['receivedTreatment11'].value != ''){
    //   this.sreceivedTreatment1error=false;
    //   this.sreceivedTreatment1error= '';
    // }
    // if(this.medicalDetail.controls['symptomsInd'].value != ''){
    //   this.symptomsInderror=false;
    //   this.symptomsInderror= '';
    // }
    // if(this.medicalDetail.controls['symptomsInd1'].value != ''){
    //   this.ssymptomsInderror=false;
    //   this.ssymptomsInderror= '';
    // }
    // if(this.medicalDetail.controls['symptomsInd'].value != ''){
    //   this.isHospitalizederror=false;
    //   this.isHospitalizederror= '';
    // }
    // if(this.medicalDetail.controls['isHospitalized1'].value != ''){
    //   this.sHospitalizederror=false;
    //   this.sHospitalizederror= '';
    // }
    // if(this.medicalDetail.controls['isRecovered'].value != ''){
    //   this.isRecoverederror=false;
    //   this.isRecoverederror= '';
    // }
    // if(this.medicalDetail.controls['isRecovered1'].value != ''){
    //   this.sRecoverederror=false;
    //   this.sRecoverederror= '';
    // }
    // if(this.medicalDetail.controls['pregnantInd'].value != ''){
    //   this.pregnantInderror=false;
    //   this.pregnantInderror= '';
    // }
    // if(this.medicalDetail.controls['pregnantInd1'].value != ''){
    //   this.spregnantInderror=false;
    //   this.spregnantInderror= '';
    // }
    // if(this.medicalDetail.controls['femaleDieaseInd'].value != ''){
    //   this.femaleDieaseInderror=false;
    //   this.femaleDieaseInderror= '';
    // }
    // if(this.medicalDetail.controls['femaleDieaseInd1'].value != ''){
    //   this.sfemaleDieaseInderror=false;
    //   this.sfemaleDieaseInderror= '';
    // }

  }


  employmentTypereq1() {

    if (this.insureArray.controls['employementType'].value=='1'||this.insureArray.controls['employementType'].value=='5'||this.insureArray.controls['employementType'].value=='7'||this.insureArray.controls['employementType'].value=='8') {

      this.insureArray.controls['natureduty'].setValidators([Validators.required]);
      this.insureArray.controls['employerName'].setValidators([Validators.required]);
      this.insureArray.controls['employerAddr'].setValidators([Validators.required]);
    } else {
      this.insureArray.controls['natureduty'].patchValue('');
      this.insureArray.controls['employerName'].patchValue('');
      this.insureArray.controls['employerAddr'].patchValue('');

      this.insureArray.controls['natureduty'].setValidators(null);
      this.insureArray.controls['employerName'].setValidators(null);
      this.insureArray.controls['employerAddr'].setValidators(null);

    }
    this.insureArray.controls['natureduty'].updateValueAndValidity();
    this.insureArray.controls['employerName'].updateValueAndValidity();
    this.insureArray.controls['employerAddr'].updateValueAndValidity();

  }
  employmentTypereq12() {

    if (this.insureArray.controls['employementType'].value=='2'||this.insureArray.controls['employementType'].value=='3'||this.insureArray.controls['employementType'].value=='6') {

      this.insureArray.controls['annualIncome'].setValidators([Validators.required]);
      this.insureArray.controls['isEmploymentIncome'].setValidators([Validators.required]);
    } else {
      this.insureArray.controls['annualIncome'].patchValue(this.customerDetails.controls['annualIncome'].value);
      this.insureArray.controls['isEmploymentIncome'].patchValue('');

      this.insureArray.controls['annualIncome'].setValidators(null);
      this.insureArray.controls['isEmploymentIncome'].setValidators(null);

    }
    this.insureArray.controls['annualIncome'].updateValueAndValidity();
    this.insureArray.controls['isEmploymentIncome'].updateValueAndValidity();

  }
  semploymentTypereq1() {

    if (this.insureArray.controls['semployementType'].value=='1'||this.insureArray.controls['semployementType'].value=='5'||this.insureArray.controls['semployementType'].value=='7'||this.insureArray.controls['semployementType'].value=='8') {

      this.insureArray.controls['snatureduty'].setValidators([Validators.required]);
      this.insureArray.controls['semployerName'].setValidators([Validators.required]);
      this.insureArray.controls['semployerAddr'].setValidators([Validators.required]);
    } else {
      this.insureArray.controls['snatureduty'].patchValue('');
      this.insureArray.controls['semployerName'].patchValue('');
      this.insureArray.controls['semployerAddr'].patchValue('');

      this.insureArray.controls['snatureduty'].setValidators(null);
      this.insureArray.controls['semployerName'].setValidators(null);
      this.insureArray.controls['semployerAddr'].setValidators(null);

    }
    this.insureArray.controls['snatureduty'].updateValueAndValidity();
    this.insureArray.controls['semployerName'].updateValueAndValidity();
    this.insureArray.controls['semployerAddr'].updateValueAndValidity();

  }
  semploymentTypereq12() {

    if (this.insureArray.controls['semployementType'].value=='2'||this.insureArray.controls['semployementType'].value=='3'||this.insureArray.controls['semployementType'].value=='6') {

      this.insureArray.controls['sannualIncome'].setValidators([Validators.required]);
      this.insureArray.controls['sisEmploymentIncome'].setValidators([Validators.required]);
    } else {
      this.insureArray.controls['sannualIncome'].patchValue('');
      this.insureArray.controls['sisEmploymentIncome'].patchValue('');

      this.insureArray.controls['sannualIncome'].setValidators(null);
      this.insureArray.controls['sisEmploymentIncome'].setValidators(null);

    }
    this.insureArray.controls['sannualIncome'].updateValueAndValidity();
    this.insureArray.controls['sisEmploymentIncome'].updateValueAndValidity();

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
    console.log(this.insureArray['controls'].existingInsurance['controls'].length,'value');
    if (this.insureArray.controls['existingInsuranceInd'].value == 'Yes') {
      console.log(this.insureArray.controls['existingInsuranceInd'].value ,'value');

      for (let i=0; i < this.insureArray['controls'].existingInsurance['controls'].length; i++) {
        // if (i != 0) {
        // }
        this.insureArray['controls'].existingInsurance['controls'][i]['controls'].policyNo.patchValue(this.insureArray['controls'].existingInsurance['controls'][i]['controls'].policyNo.value );
        this.insureArray['controls'].existingInsurance['controls'][i]['controls'].companyName.patchValue(this.insureArray['controls'].existingInsurance['controls'][i]['controls'].companyName.value );
        this.insureArray['controls'].existingInsurance['controls'][i]['controls'].yearOfIssue.patchValue(this.insureArray['controls'].existingInsurance['controls'][i]['controls'].yearOfIssue.value );
        this.insureArray['controls'].existingInsurance['controls'][i]['controls'].sumAssured.patchValue(this.insureArray['controls'].existingInsurance['controls'][i]['controls'].sumAssured.value );
        this.insureArray['controls'].existingInsurance['controls'][i]['controls'].annualizedPremium.patchValue(this.insureArray['controls'].existingInsurance['controls'][i]['controls'].annualizedPremium.value );
        this.insureArray['controls'].existingInsurance['controls'][i]['controls'].policyStatus.patchValue(this.insureArray['controls'].existingInsurance['controls'][i]['controls'].policyStatus.value );
        this.insureArray['controls'].existingInsurance['controls'][i]['controls'].acceptanceTerm.patchValue(this.insureArray['controls'].existingInsurance['controls'][i]['controls'].acceptanceTerm.value );

        this.insureArray['controls'].existingInsurance['controls'][i]['controls'].policyNo.setValidators([Validators.required]);
        this.insureArray['controls'].existingInsurance['controls'][i]['controls'].companyName.setValidators([Validators.required]);
        this.insureArray['controls'].existingInsurance['controls'][i]['controls'].yearOfIssue.setValidators([Validators.required]);
        this.insureArray['controls'].existingInsurance['controls'][i]['controls'].sumAssured.setValidators([Validators.required]);
        this.insureArray['controls'].existingInsurance['controls'][i]['controls'].annualizedPremium.setValidators([Validators.required]);
        this.insureArray['controls'].existingInsurance['controls'][i]['controls'].policyStatus.setValidators([Validators.required]);
        this.insureArray['controls'].existingInsurance['controls'][i]['controls'].acceptanceTerm.setValidators([Validators.required]);
      }

    } else if (this.insureArray.controls['existingInsuranceInd'].value == 'No') {
      for (let i=0; i < this.insureArray['controls'].existingInsurance['controls'].length; i++) {
        if ( i !=  0) {
        }
        this.insureArray['controls'].existingInsurance['controls'][i]['controls'].policyNo.patchValue('');
        this.insureArray['controls'].existingInsurance['controls'][i]['controls'].companyName.patchValue('');
        this.insureArray['controls'].existingInsurance['controls'][i]['controls'].yearOfIssue.patchValue('');
        this.insureArray['controls'].existingInsurance['controls'][i]['controls'].sumAssured.patchValue('');
        this.insureArray['controls'].existingInsurance['controls'][i]['controls'].annualizedPremium.patchValue('');
        this.insureArray['controls'].existingInsurance['controls'][i]['controls'].policyStatus.patchValue('');
        this.insureArray['controls'].existingInsurance['controls'][i]['controls'].acceptanceTerm.patchValue('');

        this.insureArray['controls'].existingInsurance['controls'][i]['controls'].policyNo.setValidators(null);
        this.insureArray['controls'].existingInsurance['controls'][i]['controls'].companyName.setValidators(null);
        this.insureArray['controls'].existingInsurance['controls'][i]['controls'].yearOfIssue.setValidators(null);
        this.insureArray['controls'].existingInsurance['controls'][i]['controls'].sumAssured.setValidators(null);
        this.insureArray['controls'].existingInsurance['controls'][i]['controls'].annualizedPremium.setValidators(null);
        this.insureArray['controls'].existingInsurance['controls'][i]['controls'].policyStatus.setValidators(null);
        this.insureArray['controls'].existingInsurance['controls'][i]['controls'].acceptanceTerm.setValidators(null);
      }
    }
    for (let i=0; i < this.insureArray['controls'].existingInsurance['controls'].length; i++) {

      if ( i !=  0) {
      }
      this.insureArray['controls'].existingInsurance['controls'][i]['controls'].policyNo.updateValueAndValidity();
      this.insureArray['controls'].existingInsurance['controls'][i]['controls'].companyName.updateValueAndValidity();
      this.insureArray['controls'].existingInsurance['controls'][i]['controls'].yearOfIssue.updateValueAndValidity();
      this.insureArray['controls'].existingInsurance['controls'][i]['controls'].sumAssured.updateValueAndValidity();
      this.insureArray['controls'].existingInsurance['controls'][i]['controls'].annualizedPremium.updateValueAndValidity();
      this.insureArray['controls'].existingInsurance['controls'][i]['controls'].policyStatus.updateValueAndValidity();
      this.insureArray['controls'].existingInsurance['controls'][i]['controls'].acceptanceTerm.updateValueAndValidity();
    }


  }
  sexistingInsureReq() {
    console.log(this.insureArray['controls'].sexistingInsurance['controls'].length,'value');
    if (this.insureArray.controls['sexistingInsuranceInd'].value == 'Yes') {
      console.log(this.insureArray.controls['sexistingInsuranceInd'].value ,'value');

      for (let i=0; i < this.insureArray['controls'].sexistingInsurance['controls'].length; i++) {
        // if (i != 0) {
        // }
        this.insureArray['controls'].sexistingInsurance['controls'][i]['controls'].spolicyNo.patchValue(this.insureArray['controls'].sexistingInsurance['controls'][i]['controls'].spolicyNo.value );
        this.insureArray['controls'].sexistingInsurance['controls'][i]['controls'].scompanyName.patchValue(this.insureArray['controls'].sexistingInsurance['controls'][i]['controls'].scompanyName.value );
        this.insureArray['controls'].sexistingInsurance['controls'][i]['controls'].syearOfIssue.patchValue(this.insureArray['controls'].sexistingInsurance['controls'][i]['controls'].syearOfIssue.value );
        this.insureArray['controls'].sexistingInsurance['controls'][i]['controls'].ssumAssured.patchValue(this.insureArray['controls'].sexistingInsurance['controls'][i]['controls'].ssumAssured.value );
        this.insureArray['controls'].sexistingInsurance['controls'][i]['controls'].sannualizedPremium.patchValue(this.insureArray['controls'].sexistingInsurance['controls'][i]['controls'].sannualizedPremium.value );
        this.insureArray['controls'].sexistingInsurance['controls'][i]['controls'].spolicyStatus.patchValue(this.insureArray['controls'].sexistingInsurance['controls'][i]['controls'].spolicyStatus.value );
        this.insureArray['controls'].sexistingInsurance['controls'][i]['controls'].sacceptanceTerm.patchValue(this.insureArray['controls'].sexistingInsurance['controls'][i]['controls'].sacceptanceTerm.value );

        this.insureArray['controls'].sexistingInsurance['controls'][i]['controls'].spolicyNo.setValidators([Validators.required]);
        this.insureArray['controls'].sexistingInsurance['controls'][i]['controls'].scompanyName.setValidators([Validators.required]);
        this.insureArray['controls'].sexistingInsurance['controls'][i]['controls'].syearOfIssue.setValidators([Validators.required]);
        this.insureArray['controls'].sexistingInsurance['controls'][i]['controls'].ssumAssured.setValidators([Validators.required]);
        this.insureArray['controls'].sexistingInsurance['controls'][i]['controls'].sannualizedPremium.setValidators([Validators.required]);
        this.insureArray['controls'].sexistingInsurance['controls'][i]['controls'].spolicyStatus.setValidators([Validators.required]);
        this.insureArray['controls'].sexistingInsurance['controls'][i]['controls'].sacceptanceTerm.setValidators([Validators.required]);
      }

    } else if (this.insureArray.controls['sexistingInsuranceInd'].value == 'No') {
      for (let i=0; i < this.insureArray['controls'].sexistingInsurance['controls'].length; i++) {
        if ( i !=  0) {
        }
        this.insureArray['controls'].sexistingInsurance['controls'][i]['controls'].spolicyNo.patchValue('');
        this.insureArray['controls'].sexistingInsurance['controls'][i]['controls'].scompanyName.patchValue('');
        this.insureArray['controls'].sexistingInsurance['controls'][i]['controls'].syearOfIssue.patchValue('');
        this.insureArray['controls'].sexistingInsurance['controls'][i]['controls'].ssumAssured.patchValue('');
        this.insureArray['controls'].sexistingInsurance['controls'][i]['controls'].sannualizedPremium.patchValue('');
        this.insureArray['controls'].sexistingInsurance['controls'][i]['controls'].spolicyStatus.patchValue('');
        this.insureArray['controls'].sexistingInsurance['controls'][i]['controls'].sacceptanceTerm.patchValue('');

        this.insureArray['controls'].sexistingInsurance['controls'][i]['controls'].spolicyNo.setValidators(null);
        this.insureArray['controls'].sexistingInsurance['controls'][i]['controls'].scompanyName.setValidators(null);
        this.insureArray['controls'].sexistingInsurance['controls'][i]['controls'].syearOfIssue.setValidators(null);
        this.insureArray['controls'].sexistingInsurance['controls'][i]['controls'].ssumAssured.setValidators(null);
        this.insureArray['controls'].sexistingInsurance['controls'][i]['controls'].sannualizedPremium.setValidators(null);
        this.insureArray['controls'].sexistingInsurance['controls'][i]['controls'].spolicyStatus.setValidators(null);
        this.insureArray['controls'].sexistingInsurance['controls'][i]['controls'].sacceptanceTerm.setValidators(null);
      }
    }
    for (let i=0; i < this.insureArray['controls'].sexistingInsurance['controls'].length; i++) {

      if ( i !=  0) {
      }
      this.insureArray['controls'].sexistingInsurance['controls'][i]['controls'].spolicyNo.updateValueAndValidity();
      this.insureArray['controls'].sexistingInsurance['controls'][i]['controls'].scompanyName.updateValueAndValidity();
      this.insureArray['controls'].sexistingInsurance['controls'][i]['controls'].syearOfIssue.updateValueAndValidity();
      this.insureArray['controls'].sexistingInsurance['controls'][i]['controls'].ssumAssured.updateValueAndValidity();
      this.insureArray['controls'].sexistingInsurance['controls'][i]['controls'].sannualizedPremium.updateValueAndValidity();
      this.insureArray['controls'].sexistingInsurance['controls'][i]['controls'].spolicyStatus.updateValueAndValidity();
      this.insureArray['controls'].sexistingInsurance['controls'][i]['controls'].sacceptanceTerm.updateValueAndValidity();
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
      this.insureArray.controls['insureRepository'].setValidators(null);
      this.insureArray.controls['insureRepository'].patchValue('');
    }else if (this.insureArray.controls['insureAccNo'].value == 'No'){
      this.insureArray.controls['insureRepository'].setValidators([Validators.required]);
    }
    this.insureArray.controls['insureRepository'].updateValueAndValidity();


    // if (this.insureArray.controls['insureAccNo'].value == 'Yes') {
    //   this.insureArray.controls['provideAccNo'].patchValue(this.insureArray.controls['provideAccNo'].value);
    //   this.insureArray.controls['epolicy'].patchValue(this.insureArray.controls['epolicy'].value);
    //
    //   this.insureArray.controls['provideAccNo'].setValidators([Validators.required]);
    //   this.insureArray.controls['epolicy'].setValidators([Validators.required]);
    //
    // } else {
    //   this.insureArray.controls['provideAccNo'].patchValue('');
    //   this.insureArray.controls['epolicy'].patchValue('No');
    //   this.insureArray.controls['einsureAccNo'].patchValue('');
    //
    // }
    //
    // if (this.insureArray.controls['insureAccNo'].value == 'No') {
    //   this.insureArray.controls['einsureAccNo'].patchValue(this.insureArray.controls['einsureAccNo'].value);
    //   this.insureArray.controls['einsureAccNo'].setValidators([Validators.required]);
    //
    //
    //   if ( this.insureArray.controls['insureAccNo'].value == 'No'  && this.insureArray.controls['einsureAccNo'].value == 'Yes') {
    //     this.insureArray.controls['epolicy1'].patchValue(this.insureArray.controls['epolicy1'].value);
    //     this.insureArray.controls['insureRepository'].patchValue(this.insureArray.controls['insureRepository'].value);
    //
    //     this.insureArray.controls['epolicy1'].setValidators([Validators.required]);
    //     this.insureArray.controls['insureRepository'].setValidators([Validators.required]);
    //   } else {
    //     this.insureArray.controls['epolicy1'].patchValue('No');
    //     this.insureArray.controls['insureRepository'].patchValue('NSDL Data Management Limited');
    //
    //     this.insureArray.controls['provideAccNo'].setValidators(null);
    //     this.insureArray.controls['epolicy'].setValidators(null);
    //     this.insureArray.controls['einsureAccNo'].setValidators(null);
    //     this.insureArray.controls['epolicy1'].setValidators(null);
    //     this.insureArray.controls['insureRepository'].setValidators(null);
    //   }
    // }
    // this.insureArray.controls['provideAccNo'].updateValueAndValidity();
    // this.insureArray.controls['epolicy'].updateValueAndValidity();
    // this.insureArray.controls['einsureAccNo'].updateValueAndValidity();
    // this.insureArray.controls['epolicy1'].updateValueAndValidity();
    // this.insureArray.controls['insureRepository'].updateValueAndValidity();

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
  isdrugsInd1() {

    if (this.medicalDetail.controls['drugsInd1'].value == 'Yes') {
      this.medicalDetail.controls['drugsDetails1'].patchValue(this.medicalDetail.controls['drugsDetails1'].value);

      this.medicalDetail.controls['drugsDetails1'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['drugsDetails1'].patchValue('');

      this.medicalDetail.controls['drugsDetails1'].setValidators(null);

    }
    this.medicalDetail.controls['drugsDetails1'].updateValueAndValidity();

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
   isactivity1() {

    if (this.medicalDetail.controls['activity1'].value == 'Yes') {
      this.medicalDetail.controls['adventurousActivities1'].patchValue(this.medicalDetail.controls['adventurousActivities1'].value);

      this.medicalDetail.controls['adventurousActivities1'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['adventurousActivities1'].patchValue('');

      this.medicalDetail.controls['adventurousActivities1'].setValidators(null);

    }
    this.medicalDetail.controls['adventurousActivities1'].updateValueAndValidity();

  }


  isalcoholInd() {

    if (this.medicalDetail.controls['alcoholInd'].value == 'Yes') {
      this.medicalDetail.controls['alcoholDetails'].patchValue(this.medicalDetail.controls['alcoholDetails'].value);
      this.medicalDetail.controls['alcoholBeer'].patchValue(this.medicalDetail.controls['alcoholBeer'].value);
      this.medicalDetail.controls['alcoholliquar'].patchValue(this.medicalDetail.controls['alcoholliquar'].value);
      this.medicalDetail.controls['alcoholWine'].patchValue(this.medicalDetail.controls['alcoholWine'].value);

      this.medicalDetail.controls['alcoholDetails'].setValidators([Validators.required]);
      this.medicalDetail.controls['alcoholBeer'].setValidators([Validators.required]);
      this.medicalDetail.controls['alcoholliquar'].setValidators([Validators.required]);
      this.medicalDetail.controls['alcoholWine'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['alcoholDetails'].patchValue('');
      this.medicalDetail.controls['alcoholBeer'].patchValue('');
      this.medicalDetail.controls['alcoholliquar'].patchValue('');
      this.medicalDetail.controls['alcoholWine'].patchValue('');

      this.medicalDetail.controls['alcoholDetails'].setValidators(null);
      this.medicalDetail.controls['alcoholBeer'].setValidators(null);
      this.medicalDetail.controls['alcoholliquar'].setValidators(null);
      this.medicalDetail.controls['alcoholWine'].setValidators(null);

    }
    this.medicalDetail.controls['alcoholDetails'].updateValueAndValidity();
    this.medicalDetail.controls['alcoholBeer'].updateValueAndValidity();
    this.medicalDetail.controls['alcoholliquar'].updateValueAndValidity();
    this.medicalDetail.controls['alcoholWine'].updateValueAndValidity();

  }
  isalcoholInd1() {

    if (this.medicalDetail.controls['alcoholInd1'].value == 'Yes') {
      this.medicalDetail.controls['alcoholDetails1'].patchValue(this.medicalDetail.controls['alcoholDetails1'].value);
      this.medicalDetail.controls['alcoholBeer1'].patchValue(this.medicalDetail.controls['alcoholBeer1'].value);
      this.medicalDetail.controls['alcoholliquar1'].patchValue(this.medicalDetail.controls['alcoholliquar1'].value);
      this.medicalDetail.controls['alcoholWine1'].patchValue(this.medicalDetail.controls['alcoholWine1'].value);

      this.medicalDetail.controls['alcoholDetails1'].setValidators([Validators.required]);
      this.medicalDetail.controls['alcoholBeer1'].setValidators([Validators.required]);
      this.medicalDetail.controls['alcoholliquar1'].setValidators([Validators.required]);
      this.medicalDetail.controls['alcoholWine1'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['alcoholDetails1'].patchValue('');
      this.medicalDetail.controls['alcoholBeer1'].patchValue('');
      this.medicalDetail.controls['alcoholliquar1'].patchValue('');
      this.medicalDetail.controls['alcoholWine1'].patchValue('');

      this.medicalDetail.controls['alcoholDetails1'].setValidators(null);
      this.medicalDetail.controls['alcoholBeer1'].setValidators(null);
      this.medicalDetail.controls['alcoholliquar1'].setValidators(null);
      this.medicalDetail.controls['alcoholWine1'].setValidators(null);

    }
    this.medicalDetail.controls['alcoholDetails1'].updateValueAndValidity();
    this.medicalDetail.controls['alcoholBeer1'].updateValueAndValidity();
    this.medicalDetail.controls['alcoholliquar1'].updateValueAndValidity();
    this.medicalDetail.controls['alcoholWine1'].updateValueAndValidity();

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
  isconsultDoctorInd1() {

    if (this.medicalDetail.controls['consultDoctorInd1'].value == 'Yes') {
      this.medicalDetail.controls['consultDoctorDetails1'].patchValue(this.medicalDetail.controls['consultDoctorDetails1'].value);

      this.medicalDetail.controls['consultDoctorDetails1'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['consultDoctorDetails1'].patchValue('');

      this.medicalDetail.controls['consultDoctorDetails1'].setValidators(null);

    }
    this.medicalDetail.controls['consultDoctorDetails1'].updateValueAndValidity();

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
  isECGInd1() {

    if (this.medicalDetail.controls['ECGInd1'].value == 'Yes') {
      this.medicalDetail.controls['ECGDetails1'].patchValue(this.medicalDetail.controls['ECGDetails1'].value);

      this.medicalDetail.controls['ECGDetails1'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['ECGDetails1'].patchValue('');

      this.medicalDetail.controls['ECGDetails1'].setValidators(null);

    }
    this.medicalDetail.controls['ECGDetails1'].updateValueAndValidity();

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
  isadmitInd1() {

    if (this.medicalDetail.controls['admitInd1'].value == 'Yes') {
      this.medicalDetail.controls['admitDetails1'].patchValue(this.medicalDetail.controls['admitDetails1'].value);

      this.medicalDetail.controls['admitDetails1'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['admitDetails1'].patchValue('');

      this.medicalDetail.controls['admitDetails1'].setValidators(null);

    }
    this.medicalDetail.controls['admitDetails1'].updateValueAndValidity();

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
  isheartDieaseInd1() {

    if (this.medicalDetail.controls['heartDieaseInd1'].value == 'Yes') {
      this.medicalDetail.controls['heartDieaseDetails1'].patchValue(this.medicalDetail.controls['heartDieaseDetails1'].value);

      this.medicalDetail.controls['heartDieaseDetails1'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['heartDieaseDetails1'].patchValue('');

      this.medicalDetail.controls['heartDieaseDetails1'].setValidators(null);

    }
    this.medicalDetail.controls['heartDieaseDetails1'].updateValueAndValidity();

  }
  isHospitalizedMed() {

    if (this.medicalDetail.controls['isHospitalized'].value == 'Yes') {
      this.medicalDetail.controls['hospitalizedDate'].patchValue(this.medicalDetail.controls['hospitalizedDate'].value);
      this.medicalDetail.controls['isRecovered'].patchValue(this.medicalDetail.controls['isRecovered'].value);

      this.medicalDetail.controls['hospitalizedDate'].setValidators([Validators.required]);
      this.medicalDetail.controls['isRecovered'].setValidators([Validators.required]);
      this.isRecoveredInd()

    } else  if (this.medicalDetail.controls['isHospitalized'].value == 'No')  {


      this.medicalDetail.controls['hospitalizedDate'].patchValue('');
      this.medicalDetail.controls['isRecovered'].patchValue('');

      this.medicalDetail.controls['hospitalizedDate'].setValidators(null);
      this.medicalDetail.controls['isRecovered'].setValidators(null);
      this.isRecoveredInd()

    }
    this.medicalDetail.controls['hospitalizedDate'].updateValueAndValidity();
    this.medicalDetail.controls['isRecovered'].updateValueAndValidity();

  }
  isHospitalizedMed1() {

    if (this.medicalDetail.controls['isHospitalized1'].value == 'Yes') {
      this.medicalDetail.controls['hospitalizedDate1'].patchValue(this.medicalDetail.controls['hospitalizedDate1'].value);
      this.medicalDetail.controls['isRecovered1'].patchValue(this.medicalDetail.controls['isRecovered1'].value);

      this.medicalDetail.controls['hospitalizedDate1'].setValidators([Validators.required]);
      this.medicalDetail.controls['isRecovered1'].setValidators([Validators.required]);
      this.isRecoveredInd1()
    } else if (this.medicalDetail.controls['isHospitalized1'].value == 'No') {

      this.medicalDetail.controls['hospitalizedDate1'].patchValue('');
      this.medicalDetail.controls['isRecovered1'].patchValue('');
      this.isRecoveredInd1()

      this.medicalDetail.controls['hospitalizedDate1'].setValidators(null);
      this.medicalDetail.controls['isRecovered1'].setValidators(null);

    }
    this.medicalDetail.controls['hospitalizedDate1'].updateValueAndValidity();
    this.medicalDetail.controls['isRecovered1'].updateValueAndValidity();

  }
  isHospitalizedFemale() {

    if (this.medicalDetail.controls['isFemaleHospitalized'].value == 'Yes') {
      this.medicalDetail.controls['FemalehospitalizedDate'].patchValue(this.medicalDetail.controls['FemalehospitalizedDate'].value);
      this.medicalDetail.controls['isFemaleRecovered'].patchValue(this.medicalDetail.controls['isFemaleRecovered'].value);

      this.medicalDetail.controls['FemalehospitalizedDate'].setValidators([Validators.required]);
      this.medicalDetail.controls['isFemaleRecovered'].setValidators([Validators.required]);
      this.femaleRecover();
    } else if (this.medicalDetail.controls['isFemaleHospitalized'].value == 'No') {

      this.medicalDetail.controls['FemalehospitalizedDate'].patchValue('');
      this.medicalDetail.controls['isFemaleRecovered'].patchValue('');

      this.medicalDetail.controls['FemalehospitalizedDate'].setValidators(null);
      this.medicalDetail.controls['isFemaleRecovered'].setValidators(null);
      this.femaleRecover();

    }
    this.medicalDetail.controls['FemalehospitalizedDate'].updateValueAndValidity();
    this.medicalDetail.controls['isFemaleRecovered'].updateValueAndValidity();

  }
  femaleRecover() {

    if (this.medicalDetail.controls['isFemaleRecovered'].value == 'No') {
      this.medicalDetail.controls['nonFemaleRecoveryDetails'].patchValue(this.medicalDetail.controls['nonFemaleRecoveryDetails'].value);

      this.medicalDetail.controls['nonFemaleRecoveryDetails'].setValidators([Validators.required]);
    } else if (this.medicalDetail.controls['isFemaleRecovered'].value != 'No') {
      this.medicalDetail.controls['nonFemaleRecoveryDetails'].patchValue('');

      this.medicalDetail.controls['nonFemaleRecoveryDetails'].setValidators(null);

    }
    this.medicalDetail.controls['nonFemaleRecoveryDetails'].updateValueAndValidity();

  }
  isHospitalizedFemale1() {

    if (this.medicalDetail.controls['isFemaleHospitalized1'].value == 'Yes') {
      this.medicalDetail.controls['FemalehospitalizedDate1'].patchValue(this.medicalDetail.controls['FemalehospitalizedDate1'].value);
      this.medicalDetail.controls['isFemaleRecovered1'].patchValue(this.medicalDetail.controls['isFemaleRecovered1'].value);

      this.medicalDetail.controls['FemalehospitalizedDate1'].setValidators([Validators.required]);
      this.medicalDetail.controls['isFemaleRecovered1'].setValidators([Validators.required]);
      this.femaleRecover1()
    } else if (this.medicalDetail.controls['isFemaleHospitalized1'].value == 'No') {

      this.medicalDetail.controls['FemalehospitalizedDate1'].patchValue('');
      this.medicalDetail.controls['isFemaleRecovered1'].patchValue('');

      this.medicalDetail.controls['FemalehospitalizedDate1'].setValidators(null);
      this.medicalDetail.controls['isFemaleRecovered1'].setValidators(null);
      this.femaleRecover1()
    }
    this.medicalDetail.controls['FemalehospitalizedDate1'].updateValueAndValidity();
    this.medicalDetail.controls['isFemaleRecovered1'].updateValueAndValidity();

  }
  femaleRecover1() {

    if (this.medicalDetail.controls['isFemaleRecovered1'].value == 'No') {
      this.medicalDetail.controls['nonFemaleRecoveryDetails1'].patchValue(this.medicalDetail.controls['nonFemaleRecoveryDetails1'].value);

      this.medicalDetail.controls['nonFemaleRecoveryDetails1'].setValidators([Validators.required]);
    } else if (this.medicalDetail.controls['isFemaleRecovered1'].value != 'No') {
      this.medicalDetail.controls['nonFemaleRecoveryDetails1'].patchValue('');

      this.medicalDetail.controls['nonFemaleRecoveryDetails1'].setValidators(null);

    }
    this.medicalDetail.controls['nonFemaleRecoveryDetails1'].updateValueAndValidity();

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
  isrespiratoryDieaseInd1() {

    if (this.medicalDetail.controls['respiratoryDieaseInd1'].value == 'Yes') {
      this.medicalDetail.controls['respiratoryDieaseDetails1'].patchValue(this.medicalDetail.controls['respiratoryDieaseDetails1'].value);

      this.medicalDetail.controls['respiratoryDieaseDetails1'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['respiratoryDieaseDetails1'].patchValue('');

      this.medicalDetail.controls['respiratoryDieaseDetails1'].setValidators(null);

    }
    this.medicalDetail.controls['respiratoryDieaseDetails1'].updateValueAndValidity();

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
  isdiabetesInd1() {

    if (this.medicalDetail.controls['diabetesInd1'].value == 'Yes') {
      this.medicalDetail.controls['diabetesDetails1'].patchValue(this.medicalDetail.controls['diabetesDetails1'].value);

      this.medicalDetail.controls['diabetesDetails1'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['diabetesDetails1'].patchValue('');

      this.medicalDetail.controls['diabetesDetails1'].setValidators(null);

    }
    this.medicalDetail.controls['diabetesDetails1'].updateValueAndValidity();

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
  iskidneyDieaseInd1() {

    if (this.medicalDetail.controls['kidneyDieaseInd1'].value == 'Yes') {
      this.medicalDetail.controls['kidneyDieaseDetails1'].patchValue(this.medicalDetail.controls['kidneyDieaseDetails1'].value);

      this.medicalDetail.controls['kidneyDieaseDetails1'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['kidneyDieaseDetails1'].patchValue('');

      this.medicalDetail.controls['kidneyDieaseDetails1'].setValidators(null);

    }
    this.medicalDetail.controls['kidneyDieaseDetails1'].updateValueAndValidity();

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
  isdigestiveDieaseInd1() {

    if (this.medicalDetail.controls['digestiveDieaseInd1'].value == 'Yes') {
      this.medicalDetail.controls['digestiveDieaseDetails1'].patchValue(this.medicalDetail.controls['digestiveDieaseDetails1'].value);

      this.medicalDetail.controls['digestiveDieaseDetails1'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['digestiveDieaseDetails1'].patchValue('');

      this.medicalDetail.controls['digestiveDieaseDetails1'].setValidators(null);

    }
    this.medicalDetail.controls['digestiveDieaseDetails1'].updateValueAndValidity();

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
  iscancerDieaseInd1() {

    if (this.medicalDetail.controls['cancerDieaseInd1'].value == 'Yes') {
      this.medicalDetail.controls['cancerDieaseDetails1'].patchValue(this.medicalDetail.controls['cancerDieaseDetails1'].value);

      this.medicalDetail.controls['cancerDieaseDetails1'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['cancerDieaseDetails1'].patchValue('');

      this.medicalDetail.controls['cancerDieaseDetails1'].setValidators(null);

    }
    this.medicalDetail.controls['cancerDieaseDetails1'].updateValueAndValidity();

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
  istropicalDieaseInd1() {

    if (this.medicalDetail.controls['tropicalDieaseInd1'].value == 'Yes') {
      this.medicalDetail.controls['tropicalDieaseDetails1'].patchValue(this.medicalDetail.controls['tropicalDieaseDetails1'].value);

      this.medicalDetail.controls['tropicalDieaseDetails1'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['tropicalDieaseDetails1'].patchValue('');

      this.medicalDetail.controls['tropicalDieaseDetails1'].setValidators(null);

    }
    this.medicalDetail.controls['tropicalDieaseDetails1'].updateValueAndValidity();

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
  isthyroidDieaseInd1() {

    if (this.medicalDetail.controls['thyroidDieaseInd1'].value == 'Yes') {
      this.medicalDetail.controls['thyroidDieaseDetails1'].patchValue(this.medicalDetail.controls['thyroidDieaseDetails1'].value);

      this.medicalDetail.controls['thyroidDieaseDetails1'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['thyroidDieaseDetails1'].patchValue('');

      this.medicalDetail.controls['thyroidDieaseDetails1'].setValidators(null);

    }
    this.medicalDetail.controls['thyroidDieaseDetails1'].updateValueAndValidity();

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
  isbloodDieaseInd1() {

    if (this.medicalDetail.controls['bloodDieaseInd1'].value == 'Yes') {
      this.medicalDetail.controls['bloodDieaseDetails1'].patchValue(this.medicalDetail.controls['bloodDieaseDetails1'].value);

      this.medicalDetail.controls['bloodDieaseDetails1'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['bloodDieaseDetails1'].patchValue('');

      this.medicalDetail.controls['bloodDieaseDetails1'].setValidators(null);

    }
    this.medicalDetail.controls['bloodDieaseDetails1'].updateValueAndValidity();

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
  isnervousDieaseInd1() {

    if (this.medicalDetail.controls['nervousDieaseInd1'].value == 'Yes') {
      this.medicalDetail.controls['nervousDieaseDetails1'].patchValue(this.medicalDetail.controls['nervousDieaseDetails1'].value);

      this.medicalDetail.controls['nervousDieaseDetails1'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['nervousDieaseDetails1'].patchValue('');

      this.medicalDetail.controls['nervousDieaseDetails1'].setValidators(null);

    }
    this.medicalDetail.controls['nervousDieaseDetails1'].updateValueAndValidity();

  }
  isRecoveredInd() {

    if (this.medicalDetail.controls['isRecovered'].value == 'No') {

      this.medicalDetail.controls['nonRecoveryDetails'].setValidators([Validators.required]);
    } if (this.medicalDetail.controls['isRecovered'].value != 'No')  {

      this.medicalDetail.controls['nonRecoveryDetails'].patchValue('');

      this.medicalDetail.controls['nonRecoveryDetails'].setValidators(null);

    }
    this.medicalDetail.controls['nonRecoveryDetails'].updateValueAndValidity();

  }
  isRecoveredInd1() {

    if (this.medicalDetail.controls['isRecovered1'].value == 'No') {

      this.medicalDetail.controls['nonRecoveryDetails1'].setValidators([Validators.required]);
    } else if (this.medicalDetail.controls['isRecovered1'].value != 'No'){
      this.medicalDetail.controls['nonRecoveryDetails1'].patchValue('');

      this.medicalDetail.controls['nonRecoveryDetails1'].setValidators(null);

    }
    this.medicalDetail.controls['nonRecoveryDetails1'].updateValueAndValidity();

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
  ismuscleDieaseInd1() {

    if (this.medicalDetail.controls['muscleDieaseInd1'].value == 'Yes') {
      this.medicalDetail.controls['muscleDieaseDetails1'].patchValue(this.medicalDetail.controls['muscleDieaseDetails1'].value);

      this.medicalDetail.controls['muscleDieaseDetails1'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['muscleDieaseDetails1'].patchValue('');

      this.medicalDetail.controls['muscleDieaseDetails1'].setValidators(null);

    }
    this.medicalDetail.controls['muscleDieaseDetails1'].updateValueAndValidity();

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
  isalcoholicInd1() {

    if (this.medicalDetail.controls['alcoholicInd1'].value == 'Yes') {
      this.medicalDetail.controls['alcoholicDetails1'].patchValue(this.medicalDetail.controls['alcoholicDetails1'].value);

      this.medicalDetail.controls['alcoholicDetails1'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['alcoholicDetails1'].patchValue('');

      this.medicalDetail.controls['alcoholicDetails1'].setValidators(null);

    }
    this.medicalDetail.controls['alcoholicDetails1'].updateValueAndValidity();

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
  isotherIllnessInd1() {

    if (this.medicalDetail.controls['otherIllnessInd1'].value == 'Yes') {
      this.medicalDetail.controls['otherIllnessDetails1'].patchValue(this.medicalDetail.controls['otherIllnessDetails1'].value);

      this.medicalDetail.controls['otherIllnessDetails1'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['otherIllnessDetails1'].patchValue('');

      this.medicalDetail.controls['otherIllnessDetails1'].setValidators(null);

    }
    this.medicalDetail.controls['otherIllnessDetails1'].updateValueAndValidity();

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
  isdeformityInd1() {

    if (this.medicalDetail.controls['deformityInd1'].value == 'Yes') {
      this.medicalDetail.controls['deformityDetails1'].patchValue(this.medicalDetail.controls['deformityDetails1'].value);

      this.medicalDetail.controls['deformityDetails1'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['deformityDetails1'].patchValue('');

      this.medicalDetail.controls['deformityDetails1'].setValidators(null);

    }
    this.medicalDetail.controls['deformityDetails1'].updateValueAndValidity();

  }
  betterHalfReq(){
  if(this.customerDetails.controls['maritalStatus'].value == 'M' ) {
    // this.addon.controls['betterHalfBenefit'].setValidators([Validators.required]);
    this.addon.controls['betterHalfBenefit'].patchValue( this.addon.controls['betterHalfBenefit'].value);

  } else if(this.customerDetails.controls['maritalStatus'].value != 'M' ){
    this.addon.controls['betterHalfBenefit'].patchValue('');
    this.addon.controls['betterHalfBenefit'].setValidators(null);
    sessionStorage.SpouseAge='';
  }
    this.addon.controls['betterHalfBenefit'].updateValueAndValidity();
  }

  // questionReq(){
  //   if (this.addon.controls['betterHalfBenefit'].value == 'Yes'){
  //     this.medicalDetail.controls['travelOutsideIndia'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['pilot'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['activity'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['drugsInd'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['alcoholInd'].setValidators([Validators.required]);
  //     // this.medicalDetail.controls['tobaccoInd'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['tobaccoStopInd'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['consultDoctorInd'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['ECGInd'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['admitInd'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['medicalTreatment'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['heartDieaseInd'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['respiratoryDieaseInd'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['diabetesInd'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['kidneyDieaseInd'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['digestiveDieaseInd'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['cancerDieaseInd'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['tropicalDieaseInd'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['thyroidDieaseInd'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['bloodDieaseInd'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['muscleDieaseInd'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['receivedTreatment2'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['alcoholicInd'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['otherIllnessInd'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['deformityInd'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['receivedTreatment1'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['symptomsInd'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['isHospitalized'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['healthHistory'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['healthHistory1'].setValidators([Validators.required]);
  //
  //     // this.medicalDetail.controls['pregnantInd'].setValidators([Validators.required]);
  //     // this.medicalDetail.controls['femaleDieaseInd'].setValidators([Validators.required]);
  //
  //
  //     this.medicalDetail.controls['travelOutsideIndia1'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['pilot1'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['activity1'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['drugsInd1'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['alcoholInd1'].setValidators([Validators.required]);
  //     // this.medicalDetail.controls['tobaccoInd1'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['tobaccoStopInd1'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['consultDoctorInd1'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['ECGInd1'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['admitInd1'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['medicalTreatment1'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['heartDieaseInd1'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['respiratoryDieaseInd1'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['diabetesInd1'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['kidneyDieaseInd1'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['digestiveDieaseInd1'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['cancerDieaseInd1'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['tropicalDieaseInd1'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['thyroidDieaseInd1'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['bloodDieaseInd1'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['muscleDieaseInd1'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['receivedTreatment21'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['alcoholicInd1'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['otherIllnessInd1'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['deformityInd1'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['receivedTreatment11'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['symptomsInd1'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['isHospitalized1'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['shealthHistory'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['shealthHistory1'].setValidators([Validators.required]);
  //
  //     // this.medicalDetail.controls['pregnantInd1'].setValidators([Validators.required]);
  //     // this.medicalDetail.controls['femaleDieaseInd1'].setValidators([Validators.required]);
  //
  //
  //
  //     // this.medicalDetail.controls['travelOutsideIndia1'].patchValue(this.medicalDetail.controls['travelOutsideIndia1'].value);
  //     // this.medicalDetail.controls['pilot1'].patchValue(this.medicalDetail.controls['pilot1'].value);
  //     // this.medicalDetail.controls['activity1'].patchValue( this.medicalDetail.controls['activity1'].value);
  //     // this.medicalDetail.controls['drugsInd1'].patchValue(this.medicalDetail.controls['drugsInd1'].value);
  //     // this.medicalDetail.controls['alcoholInd1'].patchValue(this.medicalDetail.controls['alcoholInd1'].value);
  //     // this.medicalDetail.controls['tobaccoInd1'].patchValue(this.medicalDetail.controls['tobaccoInd1'].value);
  //     // this.medicalDetail.controls['tobaccoStopInd1'].patchValue(this.medicalDetail.controls['tobaccoStopInd1'].value);
  //     // this.medicalDetail.controls['consultDoctorInd1'].patchValue(this.medicalDetail.controls['consultDoctorInd1'].value);
  //     // this.medicalDetail.controls['ECGInd1'].patchValue(this.medicalDetail.controls['ECGInd1'].value);
  //     // this.medicalDetail.controls['admitInd1'].patchValue(this.medicalDetail.controls['admitInd1'].value);
  //     // this.medicalDetail.controls['medicalTreatment1'].patchValue(this.medicalDetail.controls['medicalTreatment1'].value);
  //     // this.medicalDetail.controls['heartDieaseInd1'].patchValue(this.medicalDetail.controls['heartDieaseInd1'].value);
  //     // this.medicalDetail.controls['respiratoryDieaseInd1'].patchValue(this.medicalDetail.controls['respiratoryDieaseInd1'].value);
  //     // this.medicalDetail.controls['diabetesInd1'].patchValue(this.medicalDetail.controls['diabetesInd1'].value);
  //     // this.medicalDetail.controls['kidneyDieaseInd1'].patchValue(this.medicalDetail.controls['kidneyDieaseInd1'].value);
  //     // this.medicalDetail.controls['digestiveDieaseInd1'].patchValue(this.medicalDetail.controls['digestiveDieaseInd1'].value);
  //     // this.medicalDetail.controls['cancerDieaseInd1'].patchValue(this.medicalDetail.controls['cancerDieaseInd1'].value);
  //     // this.medicalDetail.controls['tropicalDieaseInd1'].patchValue(this.medicalDetail.controls['tropicalDieaseInd1'].value);
  //     // this.medicalDetail.controls['thyroidDieaseInd1'].patchValue(this.medicalDetail.controls['thyroidDieaseInd1'].value);
  //     // this.medicalDetail.controls['bloodDieaseInd1'].patchValue(this.medicalDetail.controls['bloodDieaseInd1'].value);
  //     // this.medicalDetail.controls['nervousDieaseInd1'].patchValue(this.medicalDetail.controls['nervousDieaseInd1'].value);
  //     // this.medicalDetail.controls['muscleDieaseInd1'].patchValue(this.medicalDetail.controls['muscleDieaseInd1'].value);
  //     // this.medicalDetail.controls['receivedTreatment21'].patchValue(this.medicalDetail.controls['receivedTreatment21'].value);
  //     // this.medicalDetail.controls['alcoholicInd1'].patchValue(this.medicalDetail.controls['alcoholicInd1'].value);
  //     // this.medicalDetail.controls['otherIllnessInd1'].patchValue(this.medicalDetail.controls['otherIllnessInd1'].value);
  //     // this.medicalDetail.controls['deformityInd1'].patchValue(this.medicalDetail.controls['deformityInd1'].value);
  //     // this.medicalDetail.controls['receivedTreatment11'].patchValue(this.medicalDetail.controls['receivedTreatment11'].value);
  //     // this.medicalDetail.controls['symptomsInd1'].patchValue(this.medicalDetail.controls['symptomsInd1'].value);
  //     // this.medicalDetail.controls['isHospitalized1'].patchValue(this.medicalDetail.controls['isHospitalized1'].value);
  //     // this.medicalDetail.controls['isRecovered1'].patchValue(this.medicalDetail.controls['isRecovered1'].value);
  //     // this.medicalDetail.controls['pregnantInd1'].patchValue(this.medicalDetail.controls['pregnantInd1'].value);
  //     // this.medicalDetail.controls['femaleDieaseInd1'].patchValue(this.medicalDetail.controls['femaleDieaseInd1'].value);
  //
  //
  //
  //   }else if(this.addon.controls['betterHalfBenefit'].value == 'No'||this.addon.controls['betterHalfBenefit'].value == '') {
  //
  //     this.medicalDetail.controls['travelOutsideIndia'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['pilot'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['activity'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['drugsInd'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['alcoholInd'].setValidators([Validators.required]);
  //     // this.medicalDetail.controls['tobaccoInd'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['tobaccoStopInd'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['consultDoctorInd'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['ECGInd'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['admitInd'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['medicalTreatment'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['heartDieaseInd'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['respiratoryDieaseInd'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['diabetesInd'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['kidneyDieaseInd'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['digestiveDieaseInd'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['cancerDieaseInd'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['tropicalDieaseInd'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['thyroidDieaseInd'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['bloodDieaseInd'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['muscleDieaseInd'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['receivedTreatment2'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['alcoholicInd'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['otherIllnessInd'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['deformityInd'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['receivedTreatment1'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['symptomsInd'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['isHospitalized'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['healthHistory'].setValidators([Validators.required]);
  //     this.medicalDetail.controls['healthHistory1'].setValidators([Validators.required]);
  //
  //     // this.medicalDetail.controls['travelOutsideIndia'].patchValue('');
  //     // this.medicalDetail.controls['pilot'].patchValue('');
  //     // this.medicalDetail.controls['activity'].patchValue('');
  //     // this.medicalDetail.controls['drugsInd'].patchValue('');
  //     // this.medicalDetail.controls['alcoholInd'].patchValue('');
  //     // // this.medicalDetail.controls['tobaccoInd'].patchValue('');
  //     // this.medicalDetail.controls['tobaccoStopInd'].patchValue('');
  //     // this.medicalDetail.controls['consultDoctorInd'].patchValue('');
  //     // this.medicalDetail.controls['ECGInd'].patchValue('');
  //     // this.medicalDetail.controls['admitInd'].patchValue('');
  //     // this.medicalDetail.controls['medicalTreatment'].patchValue('');
  //     // this.medicalDetail.controls['heartDieaseInd'].patchValue('');
  //     // this.medicalDetail.controls['respiratoryDieaseInd'].patchValue('');
  //     // this.medicalDetail.controls['diabetesInd'].patchValue('');
  //     // this.medicalDetail.controls['kidneyDieaseInd'].patchValue('');
  //     // this.medicalDetail.controls['digestiveDieaseInd'].patchValue('');
  //     // this.medicalDetail.controls['cancerDieaseInd'].patchValue('');
  //     // this.medicalDetail.controls['tropicalDieaseInd'].patchValue('');
  //     // this.medicalDetail.controls['thyroidDieaseInd'].patchValue('');
  //     // this.medicalDetail.controls['bloodDieaseInd'].patchValue('');
  //     // this.medicalDetail.controls['muscleDieaseInd'].patchValue('');
  //     // this.medicalDetail.controls['receivedTreatment2'].patchValue('');
  //     // this.medicalDetail.controls['alcoholicInd'].patchValue('');
  //     // this.medicalDetail.controls['otherIllnessInd'].patchValue('');
  //     // this.medicalDetail.controls['deformityInd'].patchValue('');
  //     // this.medicalDetail.controls['receivedTreatment1'].patchValue('');
  //     // this.medicalDetail.controls['symptomsInd'].patchValue('');
  //     // this.medicalDetail.controls['isHospitalized'].patchValue('');
  //     // this.medicalDetail.controls['healthHistory'].patchValue('');
  //     // this.medicalDetail.controls['healthHistory1'].patchValue('');
  //     //
  //     // this.medicalDetail.controls['pregnantInd'].patchValue('');
  //     // this.medicalDetail.controls['femaleDieaseInd'].patchValue('');
  //     //
  //     //
  //     // this.medicalDetail.controls['shealthHistory'].patchValue('');
  //     // this.medicalDetail.controls['healthHistoryDetail'].patchValue('');
  //     // this.medicalDetail.controls['shealthHistoryDetail'].patchValue('');
  //     // this.medicalDetail.controls['adventurousActivities'].patchValue('');
  //     // this.medicalDetail.controls['adventurousActivitiesName'].patchValue('');
  //     // this.medicalDetail.controls['adventurousActivitiesDetails'].patchValue('');
  //     // this.medicalDetail.controls['medicationDetails'].patchValue('');
  //     // this.medicalDetail.controls['diagnosedDetails'].patchValue('');
  //     // this.medicalDetail.controls['aidsDetails'].patchValue('');
  //     // this.medicalDetail.controls['healthInformation'].patchValue('');
  //     // this.medicalDetail.controls['drugsDetails'].patchValue('');
  //     // this.medicalDetail.controls['alcoholDetails'].patchValue('');
  //     // this.medicalDetail.controls['alcoholDetailName'].patchValue('');
  //     // this.medicalDetail.controls['alcoholBeer'].patchValue('');
  //     // this.medicalDetail.controls['alcoholliquar'].patchValue('');
  //     // this.medicalDetail.controls['alcoholWine'].patchValue('');
  //     // this.medicalDetail.controls['tobaccoDetails'].patchValue('');
  //     // this.medicalDetail.controls['tobaccoDetails1'].patchValue('');
  //     // this.medicalDetail.controls['tobaccoDetails2'].patchValue('');
  //     // this.medicalDetail.controls['tobaccoDetails3'].patchValue('');
  //     // this.medicalDetail.controls['tobaccoDetailName'].patchValue('');
  //     // this.medicalDetail.controls['tabaccoDuration'].patchValue('');
  //     // this.medicalDetail.controls['tobaccoStopDetails'].patchValue('');
  //     // this.medicalDetail.controls['consultDoctorDetails'].patchValue('');
  //     // this.medicalDetail.controls['ECGDetails'].patchValue('');
  //     // this.medicalDetail.controls['admitDetails'].patchValue('');
  //     // this.medicalDetail.controls['heartDieaseDetails'].patchValue('');
  //     // this.medicalDetail.controls['hospitalizedDate'].patchValue('');
  //     // this.medicalDetail.controls['respiratoryDieaseDetails'].patchValue('');
  //     // this.medicalDetail.controls['diabetesDetails'].patchValue('');
  //     // this.medicalDetail.controls['kidneyDieaseDetails'].patchValue('');
  //     // this.medicalDetail.controls['digestiveDieaseDetails'].patchValue('');
  //     // this.medicalDetail.controls['cancerDieaseDetails'].patchValue('');
  //     // this.medicalDetail.controls['tropicalDieaseDetails'].patchValue('');
  //     // this.medicalDetail.controls['thyroidDieaseDetails'].patchValue('');
  //     // this.medicalDetail.controls['bloodDieaseDetails'].patchValue('');
  //     // this.medicalDetail.controls['nervousDieaseDetails'].patchValue('');
  //     // this.medicalDetail.controls['isRecovered'].patchValue('');
  //     // this.medicalDetail.controls['nonRecoveryDetails'].patchValue('');
  //     // this.medicalDetail.controls['muscleDieaseDetails'].patchValue('');
  //     // this.medicalDetail.controls['alcoholicDetails'].patchValue('');
  //     // this.medicalDetail.controls['otherIllnessDetails'].patchValue('');
  //     // this.medicalDetail.controls['deformityDetails'].patchValue('');
  //     // this.medicalDetail.controls['symptomsDetails'].patchValue('');
  //     // this.medicalDetail.controls['pregnantweeks'].patchValue('');
  //     // this.medicalDetail.controls['femaleDetails'].patchValue('');
  //     // this.medicalDetail.controls['isFemaleHospitalized'].patchValue('');
  //     // this.medicalDetail.controls['FemalehospitalizedDate'].patchValue('');
  //     // this.medicalDetail.controls['isFemaleRecovered'].patchValue('');
  //     // this.medicalDetail.controls['nonFemaleRecoveryDetails'].patchValue('');
  //
  //     this.medicalDetail.controls['travelOutsideIndia1'].patchValue(null);
  //     this.medicalDetail.controls['pilot1'].patchValue(null);
  //     this.medicalDetail.controls['activity1'].patchValue(null);
  //     this.medicalDetail.controls['drugsInd1'].patchValue(null);
  //     this.medicalDetail.controls['alcoholInd1'].patchValue(null);
  //     // this.medicalDetail.controls['tobaccoInd1'].patchValue(null);
  //     this.medicalDetail.controls['tobaccoStopInd1'].patchValue(null);
  //     this.medicalDetail.controls['consultDoctorInd1'].patchValue(null);
  //     this.medicalDetail.controls['ECGInd1'].patchValue(null);
  //     this.medicalDetail.controls['admitInd1'].patchValue(null);
  //     this.medicalDetail.controls['medicalTreatment1'].patchValue(null);
  //     this.medicalDetail.controls['heartDieaseInd1'].patchValue(null);
  //     this.medicalDetail.controls['respiratoryDieaseInd1'].patchValue(null);
  //     this.medicalDetail.controls['diabetesInd1'].patchValue(null);
  //     this.medicalDetail.controls['kidneyDieaseInd1'].patchValue(null);
  //     this.medicalDetail.controls['digestiveDieaseInd1'].patchValue(null);
  //     this.medicalDetail.controls['cancerDieaseInd1'].patchValue(null);
  //     this.medicalDetail.controls['tropicalDieaseInd1'].patchValue(null);
  //     this.medicalDetail.controls['thyroidDieaseInd1'].patchValue(null);
  //     this.medicalDetail.controls['bloodDieaseInd1'].patchValue(null);
  //     this.medicalDetail.controls['muscleDieaseInd1'].patchValue(null);
  //     this.medicalDetail.controls['receivedTreatment21'].patchValue(null);
  //     this.medicalDetail.controls['alcoholicInd1'].patchValue(null);
  //     this.medicalDetail.controls['otherIllnessInd1'].patchValue(null);
  //     this.medicalDetail.controls['deformityInd1'].patchValue(null);
  //     this.medicalDetail.controls['receivedTreatment11'].patchValue(null);
  //     this.medicalDetail.controls['symptomsInd1'].patchValue(null);
  //     this.medicalDetail.controls['isHospitalized1'].patchValue(null);
  //     this.medicalDetail.controls['shealthHistory'].patchValue(null);
  //     this.medicalDetail.controls['shealthHistory1'].patchValue(null);
  //
  //     this.medicalDetail.controls['pregnantInd1'].patchValue(null);
  //     this.medicalDetail.controls['femaleDieaseInd1'].patchValue(null);
  //
  //       this.medicalDetail.controls['adventurousActivities1'].patchValue('');
  //       this.medicalDetail.controls['adventurousActivitiesName1'].patchValue('');
  //       this.medicalDetail.controls['adventurousActivitiesDetails1'].patchValue('');
  //       this.medicalDetail.controls['medicationDetails1'].patchValue('');
  //       this.medicalDetail.controls['diagnosedDetails1'].patchValue('');
  //       this.medicalDetail.controls['aidsDetails1'].patchValue('');
  //       this.medicalDetail.controls['healthInformation1'].patchValue('');
  //       this.medicalDetail.controls['drugsDetails1'].patchValue('');
  //       this.medicalDetail.controls['alcoholDetails1'].patchValue('');
  //       this.medicalDetail.controls['alcoholDetailName1'].patchValue('');
  //       this.medicalDetail.controls['alcoholBeer1'].patchValue('');
  //       this.medicalDetail.controls['alcoholliquar1'].patchValue('');
  //       this.medicalDetail.controls['alcoholWine1'].patchValue('');
  //       this.medicalDetail.controls['tobaccoDetailName1'].patchValue('');
  //       this.medicalDetail.controls['stabaccoDuration'].patchValue('');
  //       this.medicalDetail.controls['tobaccoStopDetails1'].patchValue('');
  //       this.medicalDetail.controls['consultDoctorDetails1'].patchValue('');
  //       this.medicalDetail.controls['ECGDetails1'].patchValue('');
  //       this.medicalDetail.controls['admitDetails1'].patchValue('');
  //       this.medicalDetail.controls['heartDieaseDetails1'].patchValue('');
  //       this.medicalDetail.controls['hospitalizedDate1'].patchValue('');
  //       this.medicalDetail.controls['respiratoryDieaseDetails1'].patchValue('');
  //       this.medicalDetail.controls['diabetesDetails1'].patchValue('');
  //       this.medicalDetail.controls['kidneyDieaseDetails1'].patchValue('');
  //       this.medicalDetail.controls['digestiveDieaseDetails1'].patchValue('');
  //       this.medicalDetail.controls['cancerDieaseDetails1'].patchValue('');
  //       this.medicalDetail.controls['tropicalDieaseDetails1'].patchValue('');
  //       this.medicalDetail.controls['thyroidDieaseDetails1'].patchValue('');
  //       this.medicalDetail.controls['bloodDieaseDetails1'].patchValue('');
  //       this.medicalDetail.controls['nervousDieaseInd1'].patchValue('');
  //       this.medicalDetail.controls['nervousDieaseDetails1'].patchValue('');
  //       this.medicalDetail.controls['isRecovered1'].patchValue('');
  //       this.medicalDetail.controls['nonRecoveryDetails1'].patchValue('');
  //       this.medicalDetail.controls['muscleDieaseDetails1'].patchValue('');
  //       this.medicalDetail.controls['alcoholicDetails1'].patchValue('');
  //       this.medicalDetail.controls['otherIllnessDetails1'].patchValue('');
  //       this.medicalDetail.controls['deformityDetails1'].patchValue('');
  //       this.medicalDetail.controls['stobaccoDetails'].patchValue('');
  //       this.medicalDetail.controls['stobaccoDetails1'].patchValue('');
  //       this.medicalDetail.controls['stobaccoDetails2'].patchValue('');
  //       this.medicalDetail.controls['stobaccoDetails3'].patchValue('');
  //       this.medicalDetail.controls['symptomsDetails1'].patchValue('');
  //       this.medicalDetail.controls['pregnantweeks1'].patchValue('');
  //       this.medicalDetail.controls['femaleDetails1'].patchValue('');
  //       this.medicalDetail.controls['isFemaleHospitalized1'].patchValue('');
  //       this.medicalDetail.controls['FemalehospitalizedDate1'].patchValue('');
  //       this.medicalDetail.controls['isFemaleRecovered1'].patchValue('');
  //       this.medicalDetail.controls['nonFemaleRecoveryDetails1'].patchValue('');
  //     this.travelOutside1();
  //
  //       this.medicalDetail.controls['travelOutsideIndia1'].setValidators(null);
  //       this.medicalDetail.controls['pilot1'].setValidators(null);
  //       this.medicalDetail.controls['activity1'].setValidators(null);
  //       this.medicalDetail.controls['drugsInd1'].setValidators(null);
  //       this.medicalDetail.controls['alcoholInd1'].setValidators(null);
  //       this.medicalDetail.controls['tobaccoInd1'].setValidators(null);
  //       this.medicalDetail.controls['tobaccoStopInd1'].setValidators(null);
  //       this.medicalDetail.controls['consultDoctorInd1'].setValidators(null);
  //       this.medicalDetail.controls['ECGInd1'].setValidators(null);
  //       this.medicalDetail.controls['admitInd1'].setValidators(null);
  //       this.medicalDetail.controls['medicalTreatment1'].setValidators(null);
  //       this.medicalDetail.controls['heartDieaseInd1'].setValidators(null);
  //       this.medicalDetail.controls['respiratoryDieaseInd1'].setValidators(null);
  //       this.medicalDetail.controls['diabetesInd1'].setValidators(null);
  //       this.medicalDetail.controls['kidneyDieaseInd1'].setValidators(null);
  //       this.medicalDetail.controls['digestiveDieaseInd1'].setValidators(null);
  //       this.medicalDetail.controls['cancerDieaseInd1'].setValidators(null);
  //       this.medicalDetail.controls['tropicalDieaseInd1'].setValidators(null);
  //       this.medicalDetail.controls['thyroidDieaseInd1'].setValidators(null);
  //       this.medicalDetail.controls['bloodDieaseInd1'].setValidators(null);
  //       this.medicalDetail.controls['muscleDieaseInd1'].setValidators(null);
  //       this.medicalDetail.controls['receivedTreatment21'].setValidators(null);
  //       this.medicalDetail.controls['alcoholicInd1'].setValidators(null);
  //       this.medicalDetail.controls['otherIllnessInd1'].setValidators(null);
  //       this.medicalDetail.controls['deformityInd1'].setValidators(null);
  //       this.medicalDetail.controls['receivedTreatment11'].setValidators(null);
  //       this.medicalDetail.controls['symptomsInd1'].setValidators(null);
  //       this.medicalDetail.controls['isHospitalized1'].setValidators(null);
  //       this.medicalDetail.controls['shealthHistory'].setValidators(null);
  //       this.medicalDetail.controls['shealthHistory1'].setValidators(null);
  //
  //       this.medicalDetail.controls['pregnantInd1'].setValidators(null);
  //       this.medicalDetail.controls['femaleDieaseInd1'].setValidators(null);
  //   }
  //   this.medicalDetail.controls['travelOutsideIndia1'].updateValueAndValidity();
  //   this.medicalDetail.controls['pilot1'].updateValueAndValidity();
  //   this.medicalDetail.controls['activity1'].updateValueAndValidity();
  //   this.medicalDetail.controls['drugsInd1'].updateValueAndValidity();
  //   this.medicalDetail.controls['alcoholInd1'].updateValueAndValidity();
  //   this.medicalDetail.controls['tobaccoInd1'].updateValueAndValidity();
  //   this.medicalDetail.controls['tobaccoStopInd1'].updateValueAndValidity();
  //   this.medicalDetail.controls['consultDoctorInd1'].updateValueAndValidity();
  //   this.medicalDetail.controls['ECGInd1'].updateValueAndValidity();
  //   this.medicalDetail.controls['admitInd1'].updateValueAndValidity();
  //   this.medicalDetail.controls['medicalTreatment1'].updateValueAndValidity();
  //   this.medicalDetail.controls['heartDieaseInd1'].updateValueAndValidity();
  //   this.medicalDetail.controls['respiratoryDieaseInd1'].updateValueAndValidity();
  //   this.medicalDetail.controls['diabetesInd1'].updateValueAndValidity();
  //   this.medicalDetail.controls['kidneyDieaseInd1'].updateValueAndValidity();
  //   this.medicalDetail.controls['digestiveDieaseInd1'].updateValueAndValidity();
  //   this.medicalDetail.controls['cancerDieaseInd1'].updateValueAndValidity();
  //   this.medicalDetail.controls['tropicalDieaseInd1'].updateValueAndValidity();
  //   this.medicalDetail.controls['thyroidDieaseInd1'].updateValueAndValidity();
  //   this.medicalDetail.controls['bloodDieaseInd1'].updateValueAndValidity();
  //   this.medicalDetail.controls['nervousDieaseInd1'].updateValueAndValidity();
  //   this.medicalDetail.controls['muscleDieaseInd1'].updateValueAndValidity();
  //   this.medicalDetail.controls['receivedTreatment21'].updateValueAndValidity();
  //   this.medicalDetail.controls['alcoholicInd1'].updateValueAndValidity();
  //   this.medicalDetail.controls['otherIllnessInd1'].updateValueAndValidity();
  //   this.medicalDetail.controls['deformityInd1'].updateValueAndValidity();
  //   this.medicalDetail.controls['receivedTreatment11'].updateValueAndValidity();
  //   this.medicalDetail.controls['symptomsInd1'].updateValueAndValidity();
  //   this.medicalDetail.controls['isHospitalized1'].updateValueAndValidity();
  //   this.medicalDetail.controls['isRecovered1'].updateValueAndValidity();
  //   this.medicalDetail.controls['pregnantInd1'].updateValueAndValidity();
  //   this.medicalDetail.controls['femaleDieaseInd1'].updateValueAndValidity();
  // }

  isbetterHalfBenefit() {

    if (this.addon.controls['betterHalfBenefit'].value == 'Yes') {
      this.addon.controls['betterHalfsumAssured'].patchValue(this.addon.controls['betterHalfsumAssured'].value);
      this.addon.controls['betterHalfsumAssured'].setValidators([Validators.required]);

      this.addon.controls['stitle'].setValidators([Validators.required]);
      this.addon.controls['sfirstName'].setValidators([Validators.required]);
      this.addon.controls['smidName'].setValidators(null);
      this.addon.controls['slastName'].setValidators([Validators.required]);
      this.addon.controls['sdob'].setValidators([Validators.required]);
      this.addon.controls['semailId'].setValidators([Validators.required]);
      this.addon.controls['isSmokerSpouse'].setValidators([Validators.required]);

      this.insureArray.controls['stitle'].patchValue(this.addon.controls['stitle'].value);
      this.insureArray.controls['sfirstName'].patchValue(this.addon.controls['sfirstName'].value);
      this.insureArray.controls['smidName'].patchValue(this.addon.controls['smidName'].value);
      this.insureArray.controls['slastName'].patchValue(this.addon.controls['slastName'].value);
      this.insureArray.controls['sdob'].patchValue(this.datepipe.transform(this.addon.controls['sdob'].value, 'y-MM-dd'));
      this.insureArray.controls['semailId'].patchValue(this.addon.controls['semailId'].value);

      this.insureArray.controls['stitle'].setValidators([Validators.required]);
      this.insureArray.controls['sfirstName'].setValidators([Validators.required]);
      this.insureArray.controls['smidName'].setValidators(null);
      this.insureArray.controls['slastName'].setValidators([Validators.required]);
      this.insureArray.controls['sdob'].setValidators([Validators.required]);
      this.insureArray.controls['semailId'].setValidators([Validators.required]);

      this.medicalDetail.controls['travelOutsideIndia'].setValidators([Validators.required]);
      this.medicalDetail.controls['pilot'].setValidators([Validators.required]);
      this.medicalDetail.controls['activity'].setValidators([Validators.required]);

      this.medicalDetail.controls['travelOutsideIndia1'].setValidators([Validators.required]);
      this.medicalDetail.controls['pilot1'].setValidators([Validators.required]);
      this.medicalDetail.controls['activity1'].setValidators([Validators.required]);

      this.medicalDetail.controls['travelOutsideIndia1'].patchValue(null);
      this.medicalDetail.controls['pilot1'].patchValue(null);
      this.medicalDetail.controls['activity1'].patchValue(null);
      this.medicalDetail.controls['drugsInd1'].patchValue(null);
      this.medicalDetail.controls['alcoholInd1'].patchValue(null);
      this.medicalDetail.controls['tobaccoInd1'].patchValue(null);
      this.medicalDetail.controls['tobaccoStopInd1'].patchValue(null);
      this.medicalDetail.controls['consultDoctorInd1'].patchValue(null);
      this.medicalDetail.controls['ECGInd1'].patchValue(null);
      this.medicalDetail.controls['admitInd1'].patchValue(null);
      this.medicalDetail.controls['medicalTreatment1'].patchValue(null);
      this.medicalDetail.controls['heartDieaseInd1'].patchValue(null);
      this.medicalDetail.controls['respiratoryDieaseInd1'].patchValue(null);
      this.medicalDetail.controls['diabetesInd1'].patchValue(null);
      this.medicalDetail.controls['kidneyDieaseInd1'].patchValue(null);
      this.medicalDetail.controls['digestiveDieaseInd1'].patchValue(null);
      this.medicalDetail.controls['cancerDieaseInd1'].patchValue(null);
      this.medicalDetail.controls['tropicalDieaseInd1'].patchValue(null);
      this.medicalDetail.controls['thyroidDieaseInd1'].patchValue(null);
      this.medicalDetail.controls['bloodDieaseInd1'].patchValue(null);
      this.medicalDetail.controls['nervousDieaseInd1'].patchValue(null);
      this.medicalDetail.controls['muscleDieaseInd1'].patchValue(null);
      this.medicalDetail.controls['receivedTreatment21'].patchValue(null);
      this.medicalDetail.controls['alcoholicInd1'].patchValue(null);
      this.medicalDetail.controls['otherIllnessInd1'].patchValue(null);
      this.medicalDetail.controls['deformityInd1'].patchValue(null);
      this.medicalDetail.controls['receivedTreatment11'].patchValue(null);
      this.medicalDetail.controls['symptomsInd1'].patchValue(null);
      this.medicalDetail.controls['isHospitalized1'].patchValue(null);
      this.medicalDetail.controls['isRecovered1'].patchValue(null);
      this.medicalDetail.controls['pregnantInd1'].patchValue(null);
      this.medicalDetail.controls['femaleDieaseInd1'].patchValue(null);
      this.travelOutside1();


    } else if((this.addon.controls['betterHalfBenefit'].value == 'No'||this.addon.controls['betterHalfBenefit'].value == '')){
      this.addon.controls['stitle'].patchValue('');
      this.addon.controls['stitleName'].patchValue('');
      this.addon.controls['sfirstName'].patchValue('');
      this.addon.controls['smidName'].patchValue('');
      this.addon.controls['slastName'].patchValue('');
      this.addon.controls['sdob'].patchValue('');
      this.addon.controls['semailId'].patchValue('');
      // this.insureArray.controls['smobileNo'].patchValue('');
      this.addon.controls['isSmokerSpouse'].patchValue('');
      // this.addon.controls['betterHalfsumAssured'].patchValue('');
      sessionStorage.SpouseAge='';

      this.insureArray.controls['stitle'].patchValue('');
      this.insureArray.controls['stitleName'].patchValue('');
      this.insureArray.controls['sfirstName'].patchValue('');
      this.insureArray.controls['smidName'].patchValue('');
      this.insureArray.controls['slastName'].patchValue('');
      this.insureArray.controls['sdob'].patchValue('');
      this.insureArray.controls['semailId'].patchValue('');
      this.insureArray.controls['sinsureHistory'].patchValue('No');
      this.insureHistorys1();
      this.insureArray.controls['swhenInsured'].patchValue('');
      this.insureArray.controls['sexistingInsuranceInd'].patchValue('No');
      this.sexistingInsureReq();
      // this.insureArray.controls['isSmokerSpouse'].patchValue('');

      this.medicalDetail.controls['travelOutsideIndia'].setValidators([Validators.required]);
      this.medicalDetail.controls['pilot'].setValidators([Validators.required]);
      this.medicalDetail.controls['activity'].setValidators([Validators.required]);

      this.medicalDetail.controls['travelOutsideIndia1'].setValidators(null);
      this.medicalDetail.controls['pilot1'].setValidators(null);
      this.medicalDetail.controls['activity1'].setValidators(null);


      this.addon.controls['stitle'].setValidators(null);
      this.addon.controls['stitleName'].setValidators(null);
      this.addon.controls['sfirstName'].setValidators(null);
      this.addon.controls['smidName'].setValidators(null);
      this.addon.controls['slastName'].setValidators(null);
      this.addon.controls['sdob'].setValidators(null);
      this.addon.controls['semailId'].setValidators(null);
      this.addon.controls['isSmokerSpouse'].setValidators(null);
      this.addon.controls['betterHalfsumAssured'].setValidators(null);

      this.insureArray.controls['stitle'].setValidators(null);
      this.insureArray.controls['stitleName'].setValidators(null);
      this.insureArray.controls['sfirstName'].setValidators(null);
      this.insureArray.controls['smidName'].setValidators(null);
      this.insureArray.controls['slastName'].setValidators(null);
      this.insureArray.controls['sdob'].setValidators(null);
      this.insureArray.controls['semailId'].setValidators(null);
      // this.insureArray.controls['isSmokerSpouse'].setValidators(null);


    }
    // this.insureArray.controls['employeeCode'].updateValueAndValidity();
    this.addon.controls['stitle'].updateValueAndValidity();
    // this.addon.controls['stitleName'].updateValueAndValidity();
    this.addon.controls['sfirstName'].updateValueAndValidity();
    this.addon.controls['smidName'].updateValueAndValidity();
    this.addon.controls['slastName'].updateValueAndValidity();
    this.addon.controls['sdob'].updateValueAndValidity();
    this.addon.controls['semailId'].updateValueAndValidity();
    this.addon.controls['isSmokerSpouse'].updateValueAndValidity();
    this.addon.controls['betterHalfsumAssured'].updateValueAndValidity();

    this.insureArray.controls['stitle'].updateValueAndValidity();
    this.insureArray.controls['sfirstName'].updateValueAndValidity();
    this.insureArray.controls['smidName'].updateValueAndValidity();
    this.insureArray.controls['slastName'].updateValueAndValidity();
    this.insureArray.controls['sdob'].updateValueAndValidity();
    this.insureArray.controls['semailId'].updateValueAndValidity();
    // this.insureArray.controls['isSmokerSpouse'].updateValueAndValidity();



  }



  issymptomsInd() {

    if (this.medicalDetail.controls['symptomsInd'].value == 'Yes') {
      this.medicalDetail.controls['symptomsDetails'].patchValue(this.medicalDetail.controls['symptomsDetails'].value);
      this.medicalDetail.controls['isHospitalized'].patchValue(this.medicalDetail.controls['isHospitalized'].value);

      this.medicalDetail.controls['symptomsDetails'].setValidators([Validators.required]);
      this.medicalDetail.controls['isHospitalized'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['symptomsDetails'].patchValue('');
      this.medicalDetail.controls['isHospitalized'].patchValue('No');
      this.isHospitalizedMed();

      this.medicalDetail.controls['symptomsDetails'].setValidators(null);
      this.medicalDetail.controls['isHospitalized'].setValidators(null);

    }
    this.medicalDetail.controls['symptomsDetails'].updateValueAndValidity();
    this.medicalDetail.controls['isHospitalized'].updateValueAndValidity();

  }
  issymptomsInd1() {

    if (this.medicalDetail.controls['symptomsInd1'].value == 'Yes') {
      this.medicalDetail.controls['symptomsDetails1'].patchValue(this.medicalDetail.controls['symptomsDetails1'].value);
      this.medicalDetail.controls['isHospitalized1'].patchValue(this.medicalDetail.controls['isHospitalized1'].value);

      this.medicalDetail.controls['symptomsDetails1'].setValidators([Validators.required]);
      this.medicalDetail.controls['isHospitalized1'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['symptomsDetails1'].patchValue('');
      this.medicalDetail.controls['isHospitalized1'].patchValue('No');
      this.isHospitalizedMed1();

      this.medicalDetail.controls['symptomsDetails1'].setValidators(null);
      this.medicalDetail.controls['isHospitalized1'].setValidators(null);

    }
    this.medicalDetail.controls['symptomsDetails1'].updateValueAndValidity();
    this.medicalDetail.controls['isHospitalized1'].updateValueAndValidity();

  }
  isfemaleDieaseInd() {

    if (this.medicalDetail.controls['femaleDieaseInd'].value == 'Yes') {
      this.medicalDetail.controls['femaleDetails'].patchValue(this.medicalDetail.controls['femaleDetails'].value);
      this.medicalDetail.controls['isFemaleHospitalized'].patchValue(this.medicalDetail.controls['isFemaleHospitalized'].value);

      this.medicalDetail.controls['femaleDetails'].setValidators([Validators.required]);
      this.medicalDetail.controls['isFemaleHospitalized'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['femaleDetails'].patchValue('');
      this.medicalDetail.controls['isFemaleHospitalized'].patchValue('');

      this.medicalDetail.controls['femaleDetails'].setValidators(null);
      this.medicalDetail.controls['isFemaleHospitalized'].setValidators(null);

    }
    this.medicalDetail.controls['femaleDetails'].updateValueAndValidity();
    this.medicalDetail.controls['isFemaleHospitalized'].updateValueAndValidity();

  }
  isfemaleDieaseInd1() {

    if (this.medicalDetail.controls['femaleDieaseInd1'].value == 'Yes') {
      this.medicalDetail.controls['femaleDetails1'].patchValue(this.medicalDetail.controls['femaleDetails1'].value);
      this.medicalDetail.controls['isFemaleHospitalized1'].patchValue(this.medicalDetail.controls['isFemaleHospitalized1'].value);

      this.medicalDetail.controls['femaleDetails1'].setValidators([Validators.required]);
      this.medicalDetail.controls['isFemaleHospitalized1'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['femaleDetails1'].patchValue('');
      this.medicalDetail.controls['isFemaleHospitalized1'].patchValue('');

      this.medicalDetail.controls['femaleDetails1'].setValidators(null);
      this.medicalDetail.controls['isFemaleHospitalized1'].setValidators(null);

    }
    this.medicalDetail.controls['femaleDetails1'].updateValueAndValidity();
    this.medicalDetail.controls['isFemaleHospitalized1'].updateValueAndValidity();

  }
  isHealthHist() {

    if (this.medicalDetail.controls['healthHistory'].value == 'Yes') {
      this.medicalDetail.controls['healthHistoryDetail'].patchValue(this.medicalDetail.controls['healthHistoryDetail'].value);

      this.medicalDetail.controls['healthHistoryDetail'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['healthHistoryDetail'].patchValue('');

      this.medicalDetail.controls['healthHistoryDetail'].setValidators(null);

    }
    this.medicalDetail.controls['healthHistoryDetail'].updateValueAndValidity();

  }
  isHealthHist1() {

    if (this.medicalDetail.controls['shealthHistory'].value == 'Yes') {
      this.medicalDetail.controls['shealthHistoryDetail'].patchValue(this.medicalDetail.controls['shealthHistoryDetail'].value);

      this.medicalDetail.controls['shealthHistoryDetail'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['shealthHistoryDetail'].patchValue('');

      this.medicalDetail.controls['shealthHistoryDetail'].setValidators(null);

    }
    this.medicalDetail.controls['shealthHistoryDetail'].updateValueAndValidity();

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
  ismedicationInd1() {

    if (this.medicalDetail.controls['medicalTreatment1'].value == 'Yes') {
      this.medicalDetail.controls['medicationDetails1'].patchValue(this.medicalDetail.controls['medicationDetails1'].value);

      this.medicalDetail.controls['medicationDetails1'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['medicationDetails1'].patchValue('');

      this.medicalDetail.controls['medicationDetails1'].setValidators(null);

    }
    this.medicalDetail.controls['medicationDetails1'].updateValueAndValidity();

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
  isdiagnosedInd1() {

    if (this.medicalDetail.controls['receivedTreatment11'].value == 'Yes') {
      this.medicalDetail.controls['diagnosedDetails1'].patchValue(this.medicalDetail.controls['diagnosedDetails1'].value);

      this.medicalDetail.controls['diagnosedDetails1'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['diagnosedDetails1'].patchValue('');

      this.medicalDetail.controls['diagnosedDetails1'].setValidators(null);

    }
    this.medicalDetail.controls['diagnosedDetails1'].updateValueAndValidity();

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
  isaidsInd1() {

    if (this.medicalDetail.controls['receivedTreatment21'].value == 'Yes') {
      this.medicalDetail.controls['aidsDetails1'].patchValue(this.medicalDetail.controls['aidsDetails1'].value);

      this.medicalDetail.controls['aidsDetails1'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['aidsDetails1'].patchValue('');

      this.medicalDetail.controls['aidsDetails1'].setValidators(null);

    }
    this.medicalDetail.controls['aidsDetails1'].updateValueAndValidity();

  }

  istobaccoInd() {

    if (this.medicalDetail.controls['tobaccoInd'].value == 'Yes') {
      this.medicalDetail.controls['tobaccoDetails'].patchValue(this.medicalDetail.controls['tobaccoDetails'].value);
      this.medicalDetail.controls['tobaccoDetails1'].patchValue(this.medicalDetail.controls['tobaccoDetails1'].value);
      this.medicalDetail.controls['tobaccoDetails2'].patchValue(this.medicalDetail.controls['tobaccoDetails2'].value);
      this.medicalDetail.controls['tobaccoDetails3'].patchValue(this.medicalDetail.controls['tobaccoDetails3'].value);

      this.medicalDetail.controls['tobaccoDetails'].setValidators([Validators.required]);
      this.medicalDetail.controls['tobaccoDetails1'].setValidators([Validators.required]);
      this.medicalDetail.controls['tobaccoDetails2'].setValidators([Validators.required]);
      this.medicalDetail.controls['tobaccoDetails3'].setValidators([Validators.required]);


    } else
    if (this.medicalDetail.controls['tobaccoInd'].value == 'No') {


      this.medicalDetail.controls['tobaccoDetails'].patchValue('');
      this.medicalDetail.controls['tobaccoDetails1'].patchValue('');
      this.medicalDetail.controls['tobaccoDetails2'].patchValue('');
      this.medicalDetail.controls['tobaccoDetails3'].patchValue('');

      this.medicalDetail.controls['tobaccoDetails'].setValidators(null);
      this.medicalDetail.controls['tobaccoDetails1'].setValidators(null);
      this.medicalDetail.controls['tobaccoDetails2'].setValidators(null);
      this.medicalDetail.controls['tobaccoDetails3'].setValidators(null);

    }
    this.medicalDetail.controls['tobaccoDetails'].updateValueAndValidity();
    this.medicalDetail.controls['tobaccoDetails1'].updateValueAndValidity();
    this.medicalDetail.controls['tobaccoDetails2'].updateValueAndValidity();
    this.medicalDetail.controls['tobaccoDetails3'].updateValueAndValidity();

  }
  istobaccoInd1() {

    if (this.medicalDetail.controls['tobaccoInd1'].value == 'Yes') {
      this.medicalDetail.controls['stobaccoDetails'].patchValue(this.medicalDetail.controls['stobaccoDetails'].value);
      this.medicalDetail.controls['stobaccoDetails1'].patchValue(this.medicalDetail.controls['stobaccoDetails1'].value);
      this.medicalDetail.controls['stobaccoDetails2'].patchValue(this.medicalDetail.controls['stobaccoDetails2'].value);
      this.medicalDetail.controls['stobaccoDetails3'].patchValue(this.medicalDetail.controls['stobaccoDetails3'].value);

      this.medicalDetail.controls['stobaccoDetails'].setValidators([Validators.required]);
      this.medicalDetail.controls['stobaccoDetails1'].setValidators([Validators.required]);
      this.medicalDetail.controls['stobaccoDetails2'].setValidators([Validators.required]);
      this.medicalDetail.controls['stobaccoDetails3'].setValidators([Validators.required]);


    } else
    if (this.medicalDetail.controls['tobaccoInd'].value == 'No') {


      this.medicalDetail.controls['stobaccoDetails'].patchValue('');
      this.medicalDetail.controls['stobaccoDetails1'].patchValue('');
      this.medicalDetail.controls['stobaccoDetails2'].patchValue('');
      this.medicalDetail.controls['stobaccoDetails3'].patchValue('');

      this.medicalDetail.controls['stobaccoDetails'].setValidators(null);
      this.medicalDetail.controls['stobaccoDetails1'].setValidators(null);
      this.medicalDetail.controls['stobaccoDetails2'].setValidators(null);
      this.medicalDetail.controls['stobaccoDetails3'].setValidators(null);

    }
    this.medicalDetail.controls['stobaccoDetails'].updateValueAndValidity();
    this.medicalDetail.controls['stobaccoDetails1'].updateValueAndValidity();
    this.medicalDetail.controls['stobaccoDetails2'].updateValueAndValidity();
    this.medicalDetail.controls['stobaccoDetails3'].updateValueAndValidity();

  }
  istobaccoStopInd() {

    if (this.medicalDetail.controls['tobaccoStopInd'].value == 'Yes') {
      this.medicalDetail.controls['tabaccoDuration'].patchValue(this.medicalDetail.controls['tabaccoDuration'].value);
      this.medicalDetail.controls['tobaccoStopDetails'].patchValue(this.medicalDetail.controls['tobaccoStopDetails'].value);
      this.medicalDetail.controls['tabaccoDuration'].setValidators([Validators.required]);
      this.medicalDetail.controls['tobaccoStopDetails'].setValidators([Validators.required]);

    } else
    if (this.medicalDetail.controls['tobaccoStopInd'].value == 'No') {


      this.medicalDetail.controls['tabaccoDuration'].patchValue('');
      this.medicalDetail.controls['tobaccoStopDetails'].patchValue('');
      this.medicalDetail.controls['tabaccoDuration'].setValidators(null);
      this.medicalDetail.controls['tobaccoStopDetails'].setValidators(null);

    }
    this.medicalDetail.controls['tabaccoDuration'].updateValueAndValidity();
    this.medicalDetail.controls['tobaccoStopDetails'].updateValueAndValidity();

  }

  istobaccoStopInd1() {

    if (this.medicalDetail.controls['tobaccoStopInd'].value == 'Yes') {
      this.medicalDetail.controls['stabaccoDuration'].patchValue(this.medicalDetail.controls['stabaccoDuration'].value);
      this.medicalDetail.controls['tobaccoStopDetails1'].patchValue(this.medicalDetail.controls['tobaccoStopDetails1'].value);
      this.medicalDetail.controls['stabaccoDuration'].setValidators([Validators.required]);
      this.medicalDetail.controls['tobaccoStopDetails1'].setValidators([Validators.required]);

    } else
    if (this.medicalDetail.controls['tobaccoStopInd'].value == 'No') {


      this.medicalDetail.controls['stabaccoDuration'].patchValue('');
      this.medicalDetail.controls['tobaccoStopDetails1'].patchValue('');
      this.medicalDetail.controls['stabaccoDuration'].setValidators(null);
      this.medicalDetail.controls['tobaccoStopDetails1'].setValidators(null);

    }
    this.medicalDetail.controls['stabaccoDuration'].updateValueAndValidity();
    this.medicalDetail.controls['tobaccoStopDetails1'].updateValueAndValidity();

  }

  ispregnantInd() {

    if (this.medicalDetail.controls['pregnantInd'].value == 'Yes') {
      this.medicalDetail.controls['pregnantweeks'].patchValue(this.medicalDetail.controls['pregnantweeks'].value);

      this.medicalDetail.controls['pregnantweeks'].setValidators([Validators.required]);
      this.medicalDetail.controls['isFemaleHospitalized'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['pregnantweeks'].patchValue('');
      this.medicalDetail.controls['isFemaleHospitalized'].patchValue('');

      this.medicalDetail.controls['pregnantweeks'].setValidators(null);
      this.medicalDetail.controls['isFemaleHospitalized'].setValidators(null);

    }
    this.medicalDetail.controls['pregnantweeks'].updateValueAndValidity();
    this.medicalDetail.controls['isFemaleHospitalized'].updateValueAndValidity();

  }
  ispregnantInd1() {

    if (this.medicalDetail.controls['pregnantInd1'].value == 'Yes') {
      this.medicalDetail.controls['pregnantweeks1'].patchValue(this.medicalDetail.controls['pregnantweeks1'].value);
      this.medicalDetail.controls['isFemaleHospitalized1'].patchValue(this.medicalDetail.controls['isFemaleHospitalized1'].value);

      this.medicalDetail.controls['pregnantweeks1'].setValidators([Validators.required]);
      this.medicalDetail.controls['isFemaleHospitalized1'].setValidators([Validators.required]);
    } else {
      this.medicalDetail.controls['pregnantweeks1'].patchValue('');
      this.medicalDetail.controls['isFemaleHospitalized1'].patchValue('');

      this.medicalDetail.controls['pregnantweeks1'].setValidators(null);
      this.medicalDetail.controls['isFemaleHospitalized1'].setValidators(null);

    }
    this.medicalDetail.controls['pregnantweeks1'].updateValueAndValidity();
    this.medicalDetail.controls['isFemaleHospitalized1'].updateValueAndValidity();

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
  isEmploIncomeInd() {

    if (this.insureArray.controls['isEmploymentIncome'].value == 'No') {
      this.insureArray.controls['employmentIncomeDetails'].patchValue(this.insureArray.controls['employmentIncomeDetails'].value);

      this.insureArray.controls['employmentIncomeDetails'].setValidators([Validators.required]);
    } else {
      this.insureArray.controls['employmentIncomeDetails'].patchValue('');

      this.insureArray.controls['employmentIncomeDetails'].setValidators(null);

    }
    this.insureArray.controls['employmentIncomeDetails'].updateValueAndValidity();

  }
  isEmploIncomeInd1() {

    if (this.insureArray.controls['sisEmploymentIncome'].value == 'No') {
      this.insureArray.controls['semploymentIncomeDetails'].patchValue(this.insureArray.controls['semploymentIncomeDetails'].value);

      this.insureArray.controls['semploymentIncomeDetails'].setValidators([Validators.required]);
    } else {
      this.insureArray.controls['semploymentIncomeDetails'].patchValue('');

      this.insureArray.controls['semploymentIncomeDetails'].setValidators(null);

    }
    this.insureArray.controls['semploymentIncomeDetails'].updateValueAndValidity();

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
          "payoutOption": this.addon.controls['payoutOption'].value,
          "incomeOption":this.addon.controls['payoutOptionToggle'].value,
          "payoutPercentageIncome":this.addon.controls['payoutPercentageIncome'].value,
          "noOfMonths": this.addon.controls['noOfMonths'].value,
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
        "motherMaidName":this.insureArray.controls['motherMaidName'].value,
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
        "employementTypeOther":'',
        "employerName":this.insureArray.controls['employerName'].value,
        "employerAddr":this.insureArray.controls['employerAddr'].value,
        "insureHistory1":this.insureArray.controls['insureHistory1'].value ,
        "insureHistory2":this.insureArray.controls['insureHistory2'].value ,
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
        "reasonInsured":this.insureArray.controls['reasonInsured'].value ,
        "whenInsured":this.datepipe.transform(this.insureArray.controls['whenInsured'].value, 'y-MM-dd') ,
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
        "EIAccountNo":'',
        "applyEIAccount":'',
        "EIARepository":this.insureArray.controls['insureRepository'].value,
        "wantEPolicy":'',
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
        "familyHistory":this.medicalDetail.value.medicalFamilyQuestions,
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
          "femaleDieaseWeeks":this.medicalDetail.controls['femaleDetails'].value,
          // "medicalQuestions":this.medicalDetail.value.medicalQuestions,
          "medicalQuestions":'',
        },
        "bank":{
          "accountNo":this.bankDetail.controls['accountNo'].value,
          "accName":this.bankDetail.controls['accName'].value,
          "name":this.bankDetail.controls['name'].value,
          "location":this.bankDetail.controls['location'].value,
          "ifscCode":this.bankDetail.controls['ifscCode'].value,
          "investmentStrategy":'',
        },
        "existingInsurance_Ind":this.insureArray.controls['existingInsuranceInd'].value ? 'Yes' : 'No',
        "existingInsurance": this.insureArray.value.existingInsurance,
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
        "title":this.addon.controls['stitle'].value,
        "firstName":this.addon.controls['sfirstName'].value,
        "middleName":this.addon.controls['smidName'].value,
        "lastName":this.addon.controls['slastName'].value,
        "dob":this.datepipe.transform(this.addon.controls['sdob'].value, 'y-MM-dd'),
        "emailId":this.addon.controls['semailId'].value,
        "phoneNo":this.insureArray.controls['smobileNo'].value,
        "isSmoker":this.addon.controls['isSmokerSpouse'].value,
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
        "employementTypeOther":'',
        "employerName":this.insureArray.controls['employerName'].value,
        "employerAddr":this.insureArray.controls['employerAddr'].value,
        "reasonInsured":this.insureArray.controls['sreasonInsured'].value ,
        "whenInsured":this.datepipe.transform(this.insureArray.controls['swhenInsured'].value, 'y-MM-dd') ,
        "sinsureHistory1":this.insureArray.controls['sinsureHistory1'].value ,
        "sinsureHistory2":this.insureArray.controls['sinsureHistory2'].value ,
        "designation":"Senior Executive officer",
        "natureOfDuty":this.insureArray.controls['naturedutyName'].value,
        "experienceInYears":"",
        "occupationType":"",
        "noOfEmployees":"",
        "natureOfBusiness":"",
        "annualIncome":this.insureArray.controls['annualIncome'].value,
        "isIncomeSource":"",
        "incomeSourceDetails":"",
        "familyHistory":this.medicalDetail.value.smedicalFamilyQuestions,
        "isHospitalized":this.medicalDetail.controls['isHospitalized1'].value  == 'Yes' ? 'Y' : 'N',
        "hospitalizedDate":this.medicalDetail.controls['hospitalizedDate1'].value,
        "isRecovered":this.medicalDetail.controls['isRecovered1'].value  == 'Yes' ? 'Y' : 'N',
        "nonRecoveryDetails":this.medicalDetail.controls['nonRecoveryDetails1'].value,
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
        "femaleDieaseWeeks":this.medicalDetail.controls['femaleDetails1'].value,

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
        "existingInsurance_Ind1":this.insureArray.controls['sexistingInsuranceInd'].value ? 'Yes' : 'No',
        "existingInsurance1":this.insureArray.value.sexistingInsurance,

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
      this.toastr.success('Proposal Genereated successfully!!');
      this.summaryData = successData.ResponseObject;
      this.requestedUrl = this.summaryData.payment_link;
      this.alcoholDetailValues=this.summaryData.alcohol_details
      console.log(this.alcoholDetailValues,'alcoholDetailValues...')
      sessionStorage.summaryData = JSON.stringify(this.summaryData);
      this.proposalId = this.summaryData.ProposalId;
      // this.proposerFormData = this.proposer.value;
      this.bankFormData = this.bankDetail.value;
      this.nomineeFormData = this.nomineeDetail.value.itemsNominee;
      this.insuredFormData = this.insureArray.value;
      this.customerFormData = this.customerDetails.value;
      this.medicalFormData = this.medicalDetail.value;
      this.addonFormData = this.addon.value;
      // sessionStorage.proposerFormData = JSON.stringify(this.proposerFormData);
      sessionStorage.insuredFormData = JSON.stringify(this.insuredFormData);
      sessionStorage.customerFormData = JSON.stringify(this.customerFormData);
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
      console.log(this.customerFormData,'customerFormData');
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
      this.changeTitle();
      this.changeTitle1();
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

  getFamilyHistory(stepper) {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
      "product_id": this.lifePremiumList.product_id,
      "sub_product_id": this.lifePremiumList.sub_product_id,
      "term": this.lifePremiumList.termDetrails,
      "suminsured_amount": sessionStorage.selectedAmountTravel,
      "policy_id": this.getEnquiryDetials.policy_id,
      "maritalStatus": this.customerDetails.controls['maritalStatus'].value,
      "familyHistory":this.medicalDetail.value.medicalFamilyQuestions,
      "betterHalfBenefit":this.addon.controls['betterHalfBenefit'].value,
      "familySpouseHistory":this.medicalDetail.value.smedicalFamilyQuestions,

    }
    this.termService.geteFamilyHistory(data).subscribe(
        (successData) => {
          this.geteFamilyHistorySuccess(successData,stepper);
        },
        (error) => {
          this.geteFamilyHistoryFailure(error);
        }
    );
  }

  public geteFamilyHistorySuccess(successData,stepper) {
    if (successData.IsSuccess==true) {
      this.eHistoryFamily=false;
      // this.eHistoryFamily = successData.ResponseObject;
      stepper.next();
      this.topScroll();
    }else if (successData.IsSuccess==false) {
      this.eHistoryFamily=true;
      this.toastr.error(successData.ErrorObject);
      this.eHistoryFamily=true;
    }
  }
  public geteFamilyHistoryFailure(error) {
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
      this.changeMarital();
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
        // "payoutOption": this.addon.controls['payoutOption'].value,
        // "payoutMonths": this.addon.controls['noOfMonths'].value,
        // "payoutPercentageLumpsum": this.addon.controls['payoutPercentageIncome'].value,

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
          "payoutOption": this.addon.controls['payoutOption'].value,
          "incomeOption":this.addon.controls['payoutOptionToggle'].value,
          "payoutPercentageIncome":this.addon.controls['payoutPercentageIncome'].value,
          "noOfMonths": this.addon.controls['noOfMonths'].value,
        }
      },
      "isLAProposerSame":"",


      "LifeAssured": {
        "title": this.customerDetails.controls['title'].value,
        "firstName": this.customerDetails.controls['firstName'].value,
        "middleName": this.customerDetails.controls['midName'].value,
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
        "middleName":this.addon.controls['smidName'].value,
        "lastName":this.addon.controls['slastName'].value,
        "dob":this.datepipe.transform(this.addon.controls['sdob'].value, 'y-MM-dd'),
        "emailId":this.addon.controls['semailId'].value,
        "phoneNo":'',
        "isSmoker":this.addon.controls['isSmokerSpouse'].value,

      }

    }
    this.settings.loadingSpinner = true;

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
    this.settings.loadingSpinner = false;
    if (successData.IsSuccess) {
      this.eePremiumTerm = successData.ResponseObject;
      // this.eePremiumTerm = this.eePremiumTerm;
      this.premiumValue=false;

      // alert(this.premiumValue);
      this.bi_pdf_url = this.eePremiumTerm.bi_pdf_url;
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
      this.atpd_sumassured_min = this.eePremiumTerm.atpd_sumassured_min;
      this.atpd_sumassured_max = this.eePremiumTerm.atpd_sumassured_max;
      this.ci_sumassured_min = this.eePremiumTerm.ci_sumassured_min;
      this.ci_sumassured_max = this.eePremiumTerm.ci_sumassured_max;
      this.adb_sumassured_min = this.eePremiumTerm.adb_sumassured_min;
      this.adb_sumassured_max = this.eePremiumTerm.adb_sumassured_max;
      this.adb_sumassured = this.eePremiumTerm.adb_sumassured;
      this.atpd_sumassured = this.eePremiumTerm.atpd_sumassured;
      this.ci_sumassured = this.eePremiumTerm.ci_sumassured;
      this.hcb_sumassured = this.eePremiumTerm.hcb_sumassured;
      this.pdp_sumassured = this.eePremiumTerm.pdp_sumassured;

      this.betterhalf();
      // this.addonNextFrom(this.stepper,this.addon.value)
      console.log(sessionStorage.SpouseAge,'spouse agess');


    }
    else {
      this.toastr.error(successData.ErrorObject);
        this.premiumValue=true;
    }

  }

  public edelweissPrimiumFailure(error) {
  }

  // addonNextFrom(stepper, value){
  //     if(this.premiumValue==false){
  //   this.edelweissAddonDetail(stepper,value);
  //     }

  // }

  getCover() {
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
          "payoutOption": this.addon.controls['payoutOption'].value,
          "incomeOption":this.addon.controls['payoutOptionToggle'].value,
          "payoutPercentageIncome":this.addon.controls['payoutPercentageIncome'].value,
          "noOfMonths": this.addon.controls['noOfMonths'].value,
        }
      },
      "isLAProposerSame":"",


      "LifeAssured": {
        "title": this.customerDetails.controls['title'].value,
        "firstName": this.customerDetails.controls['firstName'].value,
        "middleName": this.customerDetails.controls['midName'].value,
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
        "middleName":this.addon.controls['smidName'].value,
        "lastName":this.addon.controls['slastName'].value,
        "dob":this.datepipe.transform(this.addon.controls['sdob'].value, 'y-MM-dd'),
        "emailId":this.addon.controls['semailId'].value,
        "phoneNo":'',
        "isSmoker":this.addon.controls['isSmokerSpouse'].value,

      }

    }
    this.settings.loadingSpinner = true;

    this.termService.coverPrimium(data).subscribe(
        (successData) => {
          this.CoverPrimiumSuccess(successData);

        },
        (error) => {
          this.CoverPrimiumFailure(error);
        }
    );
  }

  public CoverPrimiumSuccess(successData) {
    this.settings.loadingSpinner = false;
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
      this.atpd_sumassured_min = this.eePremiumTerm.atpd_sumassured_min;
      this.atpd_sumassured_max = this.eePremiumTerm.atpd_sumassured_max;
      this.ci_sumassured_min = this.eePremiumTerm.ci_sumassured_min;
      this.ci_sumassured_max = this.eePremiumTerm.ci_sumassured_max;
      this.adb_sumassured_min = this.eePremiumTerm.adb_sumassured_min;
      this.adb_sumassured_max = this.eePremiumTerm.adb_sumassured_max;
      this.adb_sumassured = this.eePremiumTerm.adb_sumassured;
      this.atpd_sumassured = this.eePremiumTerm.atpd_sumassured;
      this.ci_sumassured = this.eePremiumTerm.ci_sumassured;
      this.hcb_sumassured = this.eePremiumTerm.hcb_sumassured;
      this.pdp_sumassured = this.eePremiumTerm.pdp_sumassured;

      this.betterhalf();
      this.sumAssuredAll();


    }
    else {
      this.toastr.error(successData.ErrorObject);
    }

  }

  public CoverPrimiumFailure(error) {
  }


  sumAssuredAll(){
    if( this.addon.controls['sumAssuredHCB'].value==''||this.addon.controls['sumAssuredATPD'].value==''||this.addon.controls['sumAssuredADB'].value==''||this.addon.controls['criticalsumAssured'].value==''){
    this.addon.controls['sumAssuredHCB'].patchValue(this.hcb_sumassured);
    // alert(this.addon.controls['sumAssuredHCB'].value);
    this.addon.controls['sumAssuredATPD'].patchValue(this.atpd_sumassured);
    this.addon.controls['sumAssuredADB'].patchValue(this.adb_sumassured);
    this.addon.controls['criticalsumAssured'].patchValue(this.ci_sumassured);
    }else{
      this.addon.controls['sumAssuredHCB'].patchValue(this.addon.controls['sumAssuredHCB'].value);
      this.addon.controls['sumAssuredATPD'].patchValue(this.addon.controls['sumAssuredATPD'].value);
      this.addon.controls['sumAssuredADB'].patchValue(this.addon.controls['sumAssuredADB'].value);
      this.addon.controls['criticalsumAssured'].patchValue(this.addon.controls['criticalsumAssured'].value);
    }
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

  getIncomeProof() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.eGetIncomeProof(data).subscribe(
        (successData) => {
          this.eIncomeProofSuccess(successData);
        },
        (error) => {
          this.eIncomeProofFailure(error);
        }
    );
  }

  public eIncomeProofSuccess(successData) {
    if (successData.IsSuccess) {
      this.incomeProofs = successData.ResponseObject;
    }
  }

  public eIncomeProofFailure(error) {
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

  geteCompany() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.geteCompany(data).subscribe(
        (successData) => {
          this.geteCompanySuccess(successData);
        },
        (error) => {
          this.geteCompanyFailure(error);
        }
    );
  }

  public geteCompanySuccess(successData) {
    if (successData.IsSuccess) {
      this.eCompanyList = successData.ResponseObject;
    }
  }
  public geteCompanyFailure(error) {
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
    console.log(this.ehealthStatus,'4567890')

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

  getCauseDeath() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.geteCauseDeath(data).subscribe(
        (successData) => {
          this.geteCauseDeathSuccess(successData);
        },
        (error) => {
          this.geteCauseDeathFailure(error);
        }
    );
  }

  public geteCauseDeathSuccess(successData) {
    if (successData.IsSuccess) {
      this.eCauseDeath = successData.ResponseObject;
    }
    console.log(this.eCauseDeath,'this.eCauseDeath')
  }

  public geteCauseDeathFailure(error) {
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
          this.otpFalseError=true
          // this.proposalFormPdf = this.proposalNextList.path;
          this.proposalFormPdf = (this.webhost + '/' + this.proposalNextList.path);
          console.log(this.proposalFormPdf,'this.proposalFormPdf....');
        }else if(result==false){
          this.otpFalseError=false
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
    payOutReq() {

        if (this.addon.controls.payoutOption.value == 'combination' ) {
            this.addon.controls['payoutOptionToggle'].setValidators([Validators.required]);
            this.addon.controls['payoutPercentageIncome'].setValidators([Validators.required]);
            this.addon.controls['noOfMonths'].setValidators([Validators.required]);

          this.addon.controls['payoutOptionToggle'].patchValue('levelIncome');
          this.addon.controls['noOfMonths'].patchValue('');



        } else if (this.addon.controls['payoutOption'].value == 'income_benefit') {
            this.addon.controls['payoutOptionToggle'].setValidators([Validators.required]);
            this.addon.controls['noOfMonths'].setValidators([Validators.required]);

            this.addon.controls['payoutOptionToggle'].patchValue('levelIncome');
            this.addon.controls['payoutPercentageIncome'].patchValue('');

            this.addon.controls['payoutPercentageIncome'].setValidators(null);

        }
        this.addon.controls['payoutOptionToggle'].updateValueAndValidity();
        this.addon.controls['payoutPercentageIncome'].updateValueAndValidity();
        this.addon.controls['noOfMonths'].updateValueAndValidity();

    }
  payoutLumpSum() {
    if (this.addon.controls.payoutOption.value == 'lumpsum') {
      this.addon.controls['payoutOptionToggle'].setValidators(null);
      this.addon.controls['payoutPercentageIncome'].setValidators(null);
      this.addon.controls['noOfMonths'].setValidators(null);

      this.addon.controls['payoutOptionToggle'].patchValue('');
      this.addon.controls['payoutPercentageIncome'].patchValue('');
      this.addon.controls['noOfMonths'].patchValue('');
    }
  }
    // togglePayOption( event: any) {
    //   if (event.checked == true) {
    //         // alert('inn');
    //         this.mStatus = 'Level Income';
    //
    //     } else {
    //         this.mStatus = 'Increasing Income';
    //     }
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


    if (sessionStorage.stepperCustomerDetails != '' && sessionStorage.stepperCustomerDetails != undefined) {
      this.getSteppercustomer = JSON.parse(sessionStorage.stepperCustomerDetails);
      console.log(this.getSteppercustomer,'customer....');

      this.customerDetails = this.fb.group({
        title: this.getSteppercustomer.title,
        titleName: this.getSteppercustomer.titleName,
        stitleName: this.getSteppercustomer.stitleName,
        firstName: this.getSteppercustomer.firstName,
        midName: this.getSteppercustomer.midName,
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
      console.log(this.getStepperaddon,'addons....')
      this.addon = this.fb.group({
        additionalBenefit: this.getStepperaddon.additionalBenefit,
        betterHalfBenefit: this.getStepperaddon.betterHalfBenefit,
        betterHalfsumAssured: this.getStepperaddon.betterHalfsumAssured,
        waiverOfPremiumBenefit: this.getStepperaddon.waiverOfPremiumBenefit,
        criticalIllness: this.getStepperaddon.criticalIllness,
        criticalsumAssured: this.getStepperaddon.criticalsumAssured,
        isADB: this.getStepperaddon.isADB,
        sumAssuredADB: this.getStepperaddon.sumAssuredADB,
        isATPD: this.getStepperaddon.isATPD,
        sumAssuredATPD: this.getStepperaddon.sumAssuredATPD,
        isHCB: this.getStepperaddon.isHCB,
        sumAssuredHCB: this.getStepperaddon.sumAssuredHCB,
        stitle: this.getStepperaddon.stitle,
        stitleName: this.getStepperaddon.stitleName,
        sfirstName: this.getStepperaddon.sfirstName,
        smidName: this.getStepperaddon.smidName,
        slastName: this.getStepperaddon.slastName,
        semailId: this.getStepperaddon.semailId,
        isSmokerSpouse: this.getStepperaddon.isSmokerSpouse,
        sdob: this.datepipe.transform(this.getStepperaddon.sdob, 'y-MM-dd'),
        payoutOption: this.getStepperaddon.payoutOption,
        payoutOptionName: this.getStepperaddon.payoutOptionName,
        payoutOptionToggle: this.getStepperaddon.payoutOptionToggle,
        noOfMonths: this.getStepperaddon.noOfMonths,
        payoutPercentageIncome: this.getStepperaddon.payoutPercentageIncome,



      });

    }
    console.log(this.getStepperaddon, 'getStepperaddon');
    console.log(this.addon, 'addon');

    if (sessionStorage.stepper2Details != '' && sessionStorage.stepper2Details != undefined) {
      this.getStepper2 = JSON.parse(sessionStorage.stepper2Details);
      console.log(this.getStepper2, 'getstepper2');

      this.insureArray.controls['existingInsuranceInd'].patchValue(this.getStepper2.existingInsuranceInd);
      // console.log(this.getStepper4.existingInsurance, ' getst2');

      for (let i = 0; i < this.getStepper2.existingInsurance.length; i++) {
        console.log(this.getStepper2.existingInsurance.length, 'lenght');

        if (i != 0) {
          this.addItems();
        }
        this.insureArray['controls'].existingInsurance['controls'][i]['controls'].policyNo.patchValue(this.getStepper2.existingInsurance[i].policyNo);
        this.insureArray['controls'].existingInsurance['controls'][i]['controls'].companyName.patchValue(this.getStepper2.existingInsurance[i].companyName);
        this.insureArray['controls'].existingInsurance['controls'][i]['controls'].yearOfIssue.patchValue(this.getStepper2.existingInsurance[i].yearOfIssue);
        this.insureArray['controls'].existingInsurance['controls'][i]['controls'].sumAssured.patchValue(this.getStepper2.existingInsurance[i].sumAssured);
        this.insureArray['controls'].existingInsurance['controls'][i]['controls'].annualizedPremium.patchValue(this.getStepper2.existingInsurance[i].annualizedPremium);
        this.insureArray['controls'].existingInsurance['controls'][i]['controls'].policyStatus.patchValue(this.getStepper2.existingInsurance[i].policyStatus);
        this.insureArray['controls'].existingInsurance['controls'][i]['controls'].acceptanceTerm.patchValue(this.getStepper2.existingInsurance[i].acceptanceTerm);
      }

      // console.log(this.getStepper4.existingInsurance, ' getst2');


      // this.bankDetail.controls['accountNo'].patchValue(this.getStepper2.accountNo);

      this.insureArray.controls['title'].patchValue(this.getStepper2.title);
      this.insureArray.controls['titleName'].patchValue(this.getStepper2.titleName);
      this.insureArray.controls['stitleName'].patchValue(this.getStepper2.stitleName);
      this.insureArray.controls['firstName'].patchValue(this.getStepper2.firstName);
      this.insureArray.controls['midName'].patchValue(this.getStepper2.midName);
      this.insureArray.controls['lastName'].patchValue(this.getStepper2.lastName);
      this.insureArray.controls['gender'].patchValue(this.getStepper2.gender);
      this.insureArray.controls['dob'].patchValue(this.datepipe.transform(this.getStepper2.dob, 'y-MM-dd'));
      this.insureArray.controls['maritalStatus'].patchValue(this.getStepper2.maritalStatus);
      this.insureArray.controls['maritalStatusName'].patchValue(this.getStepper2.maritalStatusName);
      this.insureArray.controls['nationality'].patchValue(this.getStepper2.nationality);
      this.insureArray.controls['emailId'].patchValue(this.getStepper2.emailId);
      this.insureArray.controls['pan'].patchValue(this.getStepper2.pan);
      this.insureArray.controls['aadhaarNo'].patchValue(this.getStepper2.aadhaarNo);
      this.insureArray.controls['fatherhusbandName'].patchValue(this.getStepper2.fatherhusbandName);
      this.insureArray.controls['sisCurrPerAddrSame'].patchValue(this.getStepper2.sisCurrPerAddrSame);
      this.insureArray.controls['ageProofId'].patchValue(this.getStepper2.ageProofId);
      this.insureArray.controls['ageProofIdName'].patchValue(this.getStepper2.ageProofIdName);
      this.insureArray.controls['highestQualification'].patchValue(this.getStepper2.highestQualification);
      this.insureArray.controls['highestQualificationName'].patchValue(this.getStepper2.highestQualificationName);
      this.insureArray.controls['shighestQualificationName'].patchValue(this.getStepper2.shighestQualificationName);
      this.insureArray.controls['otherQualification'].patchValue(this.getStepper2.otherQualification);
      this.insureArray.controls['mobileNo'].patchValue(this.getStepper2.mobileNo);

      this.insureArray.controls['stitle'].patchValue(this.getStepper2.stitle);
      this.insureArray.controls['sfirstName'].patchValue(this.getStepper2.sfirstName);
      this.insureArray.controls['smidName'].patchValue(this.getStepper2.smidName);
      this.insureArray.controls['slastName'].patchValue(this.getStepper2.slastName);
      this.insureArray.controls['sdob'].patchValue(this.datepipe.transform(this.getStepper2.sdob, 'y-MM-dd'));
      this.insureArray.controls['semailId'].patchValue(this.getStepper2.semailId);
      this.insureArray.controls['smobileNo'].patchValue(this.getStepper2.smobileNo);
      // this.insureArray.controls['isSmokerSpouse'].patchValue(this.getStepper2.isSmokerSpouse);
      this.insureArray.controls['sppan'].patchValue(this.getStepper2.sppan);
      this.insureArray.controls['saadhaarNo'].patchValue(this.getStepper2.saadhaarNo);
      this.insureArray.controls['sfatherhusbandName'].patchValue(this.getStepper2.sfatherhusbandName);
      this.insureArray.controls['smotherMaidName'].patchValue(this.getStepper2.smotherMaidName);
      this.insureArray.controls['sageProofId'].patchValue(this.getStepper2.sageProofId);
      this.insureArray.controls['shighestQualification'].patchValue(this.getStepper2.shighestQualification);
      this.insureArray.controls['sotherQualification'].patchValue(this.getStepper2.sotherQualification);

      this.insureArray.controls['sperAddr1'].patchValue(this.getStepper2.sperAddr1);
      this.insureArray.controls['sperAddr2'].patchValue(this.getStepper2.sperAddr2);
      this.insureArray.controls['sperAddr3'].patchValue(this.getStepper2.sperAddr3);
      this.insureArray.controls['sperCity'].patchValue(this.getStepper2.sperCity);
      this.insureArray.controls['sperPincode'].patchValue(this.getStepper2.sperPincode);
      this.insureArray.controls['sperState'].patchValue(this.getStepper2.sperState);
      this.insureArray.controls['sheightFeets'].patchValue(this.getStepper2.sheightFeets);
      this.insureArray.controls['sheightInches'].patchValue(this.getStepper2.sheightInches);
      this.insureArray.controls['sweight'].patchValue(this.getStepper2.sweight);
      this.insureArray.controls['shasWeightChanged'].patchValue(this.getStepper2.shasWeightChanged);
      this.insureArray.controls['sinbetweenweight'].patchValue(this.getStepper2.sinbetweenweight);
      this.insureArray.controls['sweightChangedreason'].patchValue(this.getStepper2.sweightChangedreason);
      this.insureArray.controls['currAddr1'].patchValue(this.getStepper2.currAddr1);
      this.insureArray.controls['currAddr2'].patchValue(this.getStepper2.currAddr2);
      this.insureArray.controls['currAddr3'].patchValue(this.getStepper2.currAddr3);
      this.insureArray.controls['currPincode'].patchValue(this.getStepper2.currPincode);
      this.insureArray.controls['currState'].patchValue(this.getStepper2.currState);
      this.insureArray.controls['currCity'].patchValue(this.getStepper2.currCity);
      this.insureArray.controls['perAddr1'].patchValue(this.getStepper2.perAddr1);
      this.insureArray.controls['perAddr2'].patchValue(this.getStepper2.perAddr2);
      this.insureArray.controls['perAddr3'].patchValue(this.getStepper2.perAddr3);
      this.insureArray.controls['perPincode'].patchValue(this.getStepper2.perPincode);
      this.insureArray.controls['perState'].patchValue(this.getStepper2.perState);
      this.insureArray.controls['perCity'].patchValue(this.getStepper2.perCity);
      this.insureArray.controls['isCurrPerAddrSame'].patchValue(this.getStepper2.isCurrPerAddrSame);
      // employementTypeOther: this.getStepper2.employementTypeOther,
      this.insureArray.controls['employementType'].patchValue(this.getStepper2.employementType);
      this.insureArray.controls['employementTypeName'].patchValue(this.getStepper2.employementTypeName);
      this.insureArray.controls['employerName'].patchValue(this.getStepper2.employerName);
      this.insureArray.controls['employmentIncomeDetails'].patchValue(this.getStepper2.employmentIncomeDetails);
      this.insureArray.controls['isEmploymentIncome'].patchValue(this.getStepper2.isEmploymentIncome);
      this.insureArray.controls['natureduty'].patchValue(this.getStepper2.natureduty);
      this.insureArray.controls['naturedutyName'].patchValue(this.getStepper2.naturedutyName);
      this.insureArray.controls['employerAddr'].patchValue(this.getStepper2.employerAddr);
      this.insureArray.controls['annualIncome'].patchValue(this.getStepper2.annualIncome);
      this.insureArray.controls['semployementType'].patchValue(this.getStepper2.semployementType);
      this.insureArray.controls['semployementTypeName'].patchValue(this.getStepper2.semployementTypeName);
      this.insureArray.controls['semploymentIncomeDetails'].patchValue(this.getStepper2.semploymentIncomeDetails);
      this.insureArray.controls['sisEmploymentIncome'].patchValue(this.getStepper2.sisEmploymentIncome);
      this.insureArray.controls['semployerName'].patchValue(this.getStepper2.semployerName);
      this.insureArray.controls['snatureduty'].patchValue(this.getStepper2.snatureduty);
      this.insureArray.controls['snaturedutyName'].patchValue(this.getStepper2.snaturedutyName);
      this.insureArray.controls['semployerAddr'].patchValue(this.getStepper2.semployerAddr);
      this.insureArray.controls['sannualIncome'].patchValue(this.getStepper2.sannualIncome);
      this.insureArray.controls['taxResidence'].patchValue(this.getStepper2.taxResidence);
      this.insureArray.controls['isPoliticallyExposed'].patchValue(this.getStepper2.isPoliticallyExposed);
      this.insureArray.controls['specification'].patchValue(this.getStepper2.specification);
      this.insureArray.controls['motherMaidName'].patchValue(this.getStepper2.motherMaidName);
      this.insureArray.controls['isCriminal'].patchValue(this.getStepper2.isCriminal);
      this.insureArray.controls['criminalDetails'].patchValue(this.getStepper2.criminalDetails);
      this.insureArray.controls['identityProof'].patchValue(this.getStepper2.identityProof);
      this.insureArray.controls['identityProofName'].patchValue(this.getStepper2.identityProofName);
      this.insureArray.controls['incomeProof'].patchValue(this.getStepper2.incomeProof);
      this.insureArray.controls['incomeProofName'].patchValue(this.getStepper2.incomeProofName);
      this.insureArray.controls['addrProof'].patchValue(this.getStepper2.addrProof);
      this.insureArray.controls['addrProofName'].patchValue(this.getStepper2.addrProofName);
      this.insureArray.controls['heightFeets'].patchValue(this.getStepper2.heightFeets);
      this.insureArray.controls['heightInches'].patchValue(this.getStepper2.heightInches);
      this.insureArray.controls['weight'].patchValue(this.getStepper2.weight);
      this.insureArray.controls['hasWeightChanged'].patchValue(this.getStepper2.hasWeightChanged);
      this.insureArray.controls['inbetweenweight'].patchValue(this.getStepper2.inbetweenweight);
      this.insureArray.controls['weightChangedreason'].patchValue(this.getStepper2.weightChangedreason);
      this.insureArray.controls['insureHistory'].patchValue(this.getStepper2.insureHistory);
      this.insureArray.controls['whenInsured'].patchValue(this.datepipe.transform(this.getStepper2.whenInsured, 'y-MM-dd'));

      // this.insureArray.controls['whenInsured'].patchValue(this.getStepper2.whenInsured);
      this.insureArray.controls['reasonInsured'].patchValue(this.getStepper2.reasonInsured);
      this.insureArray.controls['sinsureHistory'].patchValue(this.getStepper2.sinsureHistory);
      this.insureArray.controls['sreasonInsured'].patchValue(this.getStepper2.sreasonInsured);
      this.insureArray.controls['swhenInsured'].patchValue(this.datepipe.transform(this.getStepper2.swhenInsured, 'y-MM-dd'));

      this.insureArray.controls['insureHistory1'].patchValue(this.getStepper2.insureHistory1);
      this.insureArray.controls['companyName1'].patchValue(this.getStepper2.companyName1);
      this.insureArray.controls['reasonInsured1'].patchValue(this.getStepper2.reasonInsured1);
      this.insureArray.controls['whenInsured1'].patchValue(this.datepipe.transform(this.getStepper2.whenInsured1, 'y-MM-dd'));

      this.insureArray.controls['sinsureHistory1'].patchValue(this.getStepper2.sinsureHistory1);
      this.insureArray.controls['scompanyName1'].patchValue(this.getStepper2.scompanyName1);
      this.insureArray.controls['sreasonInsured1'].patchValue(this.getStepper2.sreasonInsured1);
      this.insureArray.controls['swhenInsured1'].patchValue(this.datepipe.transform(this.getStepper2.swhenInsured1, 'y-MM-dd'));
      this.insureArray.controls['insureHistory2'].patchValue(this.getStepper2.insureHistory2);
      this.insureArray.controls['sinsureHistory2'].patchValue(this.getStepper2.sinsureHistory2);
      this.insureArray.controls['insureAccNo'].patchValue(this.getStepper2.insureAccNo);
      this.insureArray.controls['insureRepository'].patchValue(this.getStepper2.insureRepository);
      this.insureArray.controls['sexistingInsuranceInd'].patchValue(this.getStepper2.sexistingInsuranceInd);

      for (let i = 0; i < this.getStepper2.sexistingInsurance.length; i++) {
        console.log(this.getStepper2.sexistingInsurance.length, 'lenght');

        if (i != 0) {
          this.saddItems();
        }
        this.insureArray['controls'].sexistingInsurance['controls'][i]['controls'].spolicyNo.patchValue(this.getStepper2.sexistingInsurance[i].spolicyNo);
        this.insureArray['controls'].sexistingInsurance['controls'][i]['controls'].scompanyName.patchValue(this.getStepper2.sexistingInsurance[i].scompanyName);
        this.insureArray['controls'].sexistingInsurance['controls'][i]['controls'].syearOfIssue.patchValue(this.getStepper2.sexistingInsurance[i].syearOfIssue);
        this.insureArray['controls'].sexistingInsurance['controls'][i]['controls'].ssumAssured.patchValue(this.getStepper2.sexistingInsurance[i].ssumAssured);
        this.insureArray['controls'].sexistingInsurance['controls'][i]['controls'].sannualizedPremium.patchValue(this.getStepper2.sexistingInsurance[i].sannualizedPremium);
        this.insureArray['controls'].sexistingInsurance['controls'][i]['controls'].spolicyStatus.patchValue(this.getStepper2.sexistingInsurance[i].spolicyStatus);
        this.insureArray['controls'].sexistingInsurance['controls'][i]['controls'].sacceptanceTerm.patchValue(this.getStepper2.sexistingInsurance[i].sacceptanceTerm);
      }

    }
    console.log(this.insureArray, ' stepper2 ');


    if (sessionStorage.medicalQuesDetails != '' && sessionStorage.medicalQuesDetails != undefined) {
      let getMedicalDetail = JSON.parse(sessionStorage.medicalQuesDetails);
      console.log(getMedicalDetail,'medical');

      // for (let i=0; i < getMedicalDetail.medicalQuestions.length; i++) {
      //   if ( i !=  0) {
      //     this.addMedItems();
      //     this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].disease.patchValue(getMedicalDetail.medicalQuestions[i].disease);
      //     this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].datediagnois.patchValue(this.datepipe.transform(getMedicalDetail.medicalQuestions[i].datediagnois, 'y-MM-dd'));
      //     this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].treatment.patchValue(getMedicalDetail.medicalQuestions[i].treatment);
      //     this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].dosage.patchValue(getMedicalDetail.medicalQuestions[i].dosage);
      //     this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].doctor.patchValue(getMedicalDetail.medicalQuestions[i].doctor);
      //     this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].datefollowup.patchValue(this.datepipe.transform(getMedicalDetail.medicalQuestions[i].datefollowup, 'y-MM-dd'));
      //     this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].anycomplications.patchValue(getMedicalDetail.medicalQuestions[i].anycomplications);
      //     this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].remarks.patchValue(getMedicalDetail.medicalQuestions[i].remarks);
      //   } else if (i == 0) {
      //
      //     this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].disease.patchValue(getMedicalDetail.medicalQuestions[i].disease);
      //     this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].datediagnois.patchValue(this.datepipe.transform(getMedicalDetail.medicalQuestions[i].datediagnois, 'y-MM-dd'));
      //     this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].treatment.patchValue(getMedicalDetail.medicalQuestions[i].treatment);
      //     this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].dosage.patchValue(getMedicalDetail.medicalQuestions[i].dosage);
      //     this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].doctor.patchValue(getMedicalDetail.medicalQuestions[i].doctor);
      //     this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].datefollowup.patchValue(this.datepipe.transform(getMedicalDetail.medicalQuestions[i].datefollowup, 'y-MM-dd'));
      //     this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].anycomplications.patchValue(getMedicalDetail.medicalQuestions[i].anycomplications);
      //     this.medicalDetail['controls'].medicalQuestions['controls'][i]['controls'].remarks.patchValue(getMedicalDetail.medicalQuestions[i].remarks);
      //
      //   }
      // }
      for (let i=0; i < getMedicalDetail.medicalFamilyQuestions.length; i++) {
        // console.log(getMedicalDetail.medicalFamilyQuestions,'444444444')
        if ( i !=  0) {
          this.addFamilyItems();
          this.medicalDetail['controls'].medicalFamilyQuestions['controls'][i]['controls'].relation.patchValue(getMedicalDetail.medicalFamilyQuestions[i].relation);
          this.medicalDetail['controls'].medicalFamilyQuestions['controls'][i]['controls'].age.patchValue(getMedicalDetail.medicalFamilyQuestions[i].age);
          this.medicalDetail['controls'].medicalFamilyQuestions['controls'][i]['controls'].ageOnDeath.patchValue(getMedicalDetail.medicalFamilyQuestions[i].ageOnDeath);
          this.medicalDetail['controls'].medicalFamilyQuestions['controls'][i]['controls'].healthStatus.patchValue(getMedicalDetail.medicalFamilyQuestions[i].healthStatus);
          this.medicalDetail['controls'].medicalFamilyQuestions['controls'][i]['controls'].relationName.patchValue(getMedicalDetail.medicalFamilyQuestions[i].relationName);
          this.medicalDetail['controls'].medicalFamilyQuestions['controls'][i]['controls'].causeOfDeath.patchValue(getMedicalDetail.medicalFamilyQuestions[i].causeOfDeath);
          // this.medicalDetail['controls'].medicalFamilyQuestions['controls'][i]['controls'].causeDeathName.patchValue(getMedicalDetail.medicalFamilyQuestions[i].causeDeathName);

        } else if (i == 0) {

          this.medicalDetail['controls'].medicalFamilyQuestions['controls'][i]['controls'].relation.patchValue(getMedicalDetail.medicalFamilyQuestions[i].relation);
          this.medicalDetail['controls'].medicalFamilyQuestions['controls'][i]['controls'].age.patchValue(getMedicalDetail.medicalFamilyQuestions[i].age);
          this.medicalDetail['controls'].medicalFamilyQuestions['controls'][i]['controls'].ageOnDeath.patchValue(getMedicalDetail.medicalFamilyQuestions[i].ageOnDeath);
          this.medicalDetail['controls'].medicalFamilyQuestions['controls'][i]['controls'].healthStatus.patchValue(getMedicalDetail.medicalFamilyQuestions[i].healthStatus);
          this.medicalDetail['controls'].medicalFamilyQuestions['controls'][i]['controls'].causeOfDeath.patchValue(getMedicalDetail.medicalFamilyQuestions[i].causeOfDeath);
          this.medicalDetail['controls'].medicalFamilyQuestions['controls'][i]['controls'].relationName.patchValue(getMedicalDetail.medicalFamilyQuestions[i].relationName);

        }
      }

      for (let i=0; i < getMedicalDetail.smedicalFamilyQuestions.length; i++) {
        if ( i !=  0) {
          this.saddFamilyItems();
          this.medicalDetail['controls'].smedicalFamilyQuestions['controls'][i]['controls'].srelation.patchValue(getMedicalDetail.smedicalFamilyQuestions[i].srelation);
          this.medicalDetail['controls'].smedicalFamilyQuestions['controls'][i]['controls'].sage.patchValue(getMedicalDetail.smedicalFamilyQuestions[i].sage);
          this.medicalDetail['controls'].smedicalFamilyQuestions['controls'][i]['controls'].sageOnDeath.patchValue(getMedicalDetail.smedicalFamilyQuestions[i].sageOnDeath);
          this.medicalDetail['controls'].smedicalFamilyQuestions['controls'][i]['controls'].shealthStatus.patchValue(getMedicalDetail.smedicalFamilyQuestions[i].shealthStatus);
          this.medicalDetail['controls'].smedicalFamilyQuestions['controls'][i]['controls'].srelationName.patchValue(getMedicalDetail.smedicalFamilyQuestions[i].srelationName);
          this.medicalDetail['controls'].smedicalFamilyQuestions['controls'][i]['controls'].scauseOfDeath.patchValue(getMedicalDetail.smedicalFamilyQuestions[i].scauseOfDeath);
          // this.medicalDetail['controls'].smedicalFamilyQuestions['controls'][i]['controls'].causeDeathName.patchValue(getMedicalDetail.medicalFamilyQuestions[i].causeDeathName);

        } else if (i == 0) {

          this.medicalDetail['controls'].smedicalFamilyQuestions['controls'][i]['controls'].srelation.patchValue(getMedicalDetail.smedicalFamilyQuestions[i].srelation);
          this.medicalDetail['controls'].smedicalFamilyQuestions['controls'][i]['controls'].sage.patchValue(getMedicalDetail.smedicalFamilyQuestions[i].sage);
          this.medicalDetail['controls'].smedicalFamilyQuestions['controls'][i]['controls'].sageOnDeath.patchValue(getMedicalDetail.smedicalFamilyQuestions[i].sageOnDeath);
          this.medicalDetail['controls'].smedicalFamilyQuestions['controls'][i]['controls'].shealthStatus.patchValue(getMedicalDetail.smedicalFamilyQuestions[i].shealthStatus);
          this.medicalDetail['controls'].smedicalFamilyQuestions['controls'][i]['controls'].scauseOfDeath.patchValue(getMedicalDetail.smedicalFamilyQuestions[i].scauseOfDeath);
          this.medicalDetail['controls'].smedicalFamilyQuestions['controls'][i]['controls'].srelationName.patchValue(getMedicalDetail.smedicalFamilyQuestions[i].srelationName);

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
      this.medicalDetail.controls['alcoholDetailName'].patchValue(getMedicalDetail.alcoholDetailName);
      this.medicalDetail.controls['alcoholBeer'].patchValue(getMedicalDetail.alcoholBeer);
      this.medicalDetail.controls['alcoholliquar'].patchValue(getMedicalDetail.alcoholliquar);
      this.medicalDetail.controls['alcoholWine'].patchValue(getMedicalDetail.alcoholWine);
      this.medicalDetail.controls['tobaccoInd'].patchValue(getMedicalDetail.tobaccoInd);
      this.medicalDetail.controls['tobaccoDetails'].patchValue(getMedicalDetail.tobaccoDetails);
      this.medicalDetail.controls['tobaccoDetails1'].patchValue(getMedicalDetail.tobaccoDetails1);
      this.medicalDetail.controls['tobaccoDetails2'].patchValue(getMedicalDetail.tobaccoDetails2);
      this.medicalDetail.controls['tobaccoDetails3'].patchValue(getMedicalDetail.tobaccoDetails3);
      this.medicalDetail.controls['stobaccoDetails'].patchValue(getMedicalDetail.stobaccoDetails);
      this.medicalDetail.controls['stobaccoDetails1'].patchValue(getMedicalDetail.stobaccoDetails1);
      this.medicalDetail.controls['stobaccoDetails2'].patchValue(getMedicalDetail.stobaccoDetails2);
      this.medicalDetail.controls['stobaccoDetails3'].patchValue(getMedicalDetail.stobaccoDetails3);
      this.medicalDetail.controls['tobaccoDetailName'].patchValue(getMedicalDetail.tobaccoDetailName);
      this.medicalDetail.controls['tobaccoStopInd'].patchValue(getMedicalDetail.tobaccoStopInd);
      this.medicalDetail.controls['tabaccoDuration'].patchValue(getMedicalDetail.tabaccoDuration);
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
      this.medicalDetail.controls['hospitalizedDate'].patchValue(this.datepipe.transform(getMedicalDetail.hospitalizedDate, 'y-MM-dd'));

      this.medicalDetail.controls['isHospitalized'].patchValue(getMedicalDetail.isHospitalized);
      // this.medicalDetail.controls['hospitalizedDate'].patchValue(getMedicalDetail.hospitalizedDate);
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
      this.medicalDetail.controls['femaleDetails'].patchValue(getMedicalDetail.femaleDetails);
      this.medicalDetail.controls['isFemaleHospitalized'].patchValue(getMedicalDetail.isFemaleHospitalized);
      this.medicalDetail.controls['FemalehospitalizedDate'].patchValue(this.datepipe.transform(getMedicalDetail.FemalehospitalizedDate, 'y-MM-dd'));

      // this.medicalDetail.controls['FemalehospitalizedDate'].patchValue(getMedicalDetail.FemalehospitalizedDate);
      this.medicalDetail.controls['isFemaleRecovered'].patchValue(getMedicalDetail.isFemaleRecovered);
      this.medicalDetail.controls['nonFemaleRecoveryDetails'].patchValue(getMedicalDetail.nonFemaleRecoveryDetails);
      this.medicalDetail.controls['alcoholDetails1'].patchValue(getMedicalDetail.alcoholDetails1);
      this.medicalDetail.controls['alcoholDetailName1'].patchValue(getMedicalDetail.alcoholDetailName1);
      this.medicalDetail.controls['healthHistory'].patchValue(getMedicalDetail.healthHistory);
      this.medicalDetail.controls['healthHistoryDetail'].patchValue(getMedicalDetail.healthHistoryDetail);
      this.medicalDetail.controls['healthHistory1'].patchValue(getMedicalDetail.healthHistory1);

      this.medicalDetail.controls['healthInformation1'].patchValue(getMedicalDetail.healthInformation1);

          this.medicalDetail.controls['travelOutsideIndia1'].patchValue(getMedicalDetail.travelOutsideIndia1);
          this.medicalDetail.controls['pilot1'].patchValue(getMedicalDetail.pilot1);
          this.medicalDetail.controls['activity1'].patchValue(getMedicalDetail.activity1);
          this.medicalDetail.controls['adventurousActivities1'].patchValue(getMedicalDetail.adventurousActivities1);
          this.medicalDetail.controls['adventurousActivitiesDetails1'].patchValue(getMedicalDetail.adventurousActivitiesDetails1);
          this.medicalDetail.controls['drugsInd1'].patchValue(getMedicalDetail.drugsInd1);
          this.medicalDetail.controls['drugsDetails1'].patchValue(getMedicalDetail.drugsDetails1);
          this.medicalDetail.controls['alcoholInd1'].patchValue(getMedicalDetail.alcoholInd1);
          this.medicalDetail.controls['alcoholBeer1'].patchValue(getMedicalDetail.alcoholBeer1);
          this.medicalDetail.controls['alcoholliquar1'].patchValue(getMedicalDetail.alcoholliquar1);
          this.medicalDetail.controls['alcoholWine1'].patchValue(getMedicalDetail.alcoholWine1);
          this.medicalDetail.controls['tobaccoInd1'].patchValue(getMedicalDetail.tobaccoInd1);
          this.medicalDetail.controls['tobaccoDetailName1'].patchValue(getMedicalDetail.tobaccoDetailName1);
          this.medicalDetail.controls['tobaccoStopInd1'].patchValue(getMedicalDetail.tobaccoStopInd1);
          this.medicalDetail.controls['stabaccoDuration'].patchValue(getMedicalDetail.stabaccoDuration);
          this.medicalDetail.controls['tobaccoStopDetails1'].patchValue(getMedicalDetail.tobaccoStopDetails1);
          this.medicalDetail.controls['consultDoctorInd1'].patchValue(getMedicalDetail.consultDoctorInd1);
          this.medicalDetail.controls['consultDoctorDetails1'].patchValue(getMedicalDetail.consultDoctorDetails1);
          this.medicalDetail.controls['ECGInd1'].patchValue(getMedicalDetail.ECGInd1);
          this.medicalDetail.controls['ECGDetails1'].patchValue(getMedicalDetail.ECGDetails1);
          this.medicalDetail.controls['admitInd1'].patchValue(getMedicalDetail.admitInd1);
          this.medicalDetail.controls['admitDetails1'].patchValue(getMedicalDetail.admitDetails1);
          this.medicalDetail.controls['medicalTreatment1'].patchValue(getMedicalDetail.medicalTreatment1);
          this.medicalDetail.controls['medicationDetails1'].patchValue(getMedicalDetail.medicationDetails1);
          this.medicalDetail.controls['receivedTreatment11'].patchValue(getMedicalDetail.receivedTreatment11);
      this.medicalDetail.controls['diagnosedDetails1'].patchValue(getMedicalDetail.diagnosedDetails1);
      this.medicalDetail.controls['heartDieaseInd1'].patchValue(getMedicalDetail.heartDieaseInd1);
      this.medicalDetail.controls['heartDieaseDetails1'].patchValue(getMedicalDetail.heartDieaseDetails1);
      this.medicalDetail.controls['hospitalizedDate1'].patchValue(this.datepipe.transform(getMedicalDetail.hospitalizedDate1, 'y-MM-dd'));
      this.medicalDetail.controls['isHospitalized1'].patchValue(getMedicalDetail.isHospitalized1);
      this.medicalDetail.controls['respiratoryDieaseInd1'].patchValue(getMedicalDetail.respiratoryDieaseInd1);
      this.medicalDetail.controls['respiratoryDieaseDetails1'].patchValue(getMedicalDetail.respiratoryDieaseDetails1);
      this.medicalDetail.controls['diabetesInd1'].patchValue(getMedicalDetail.diabetesInd1);
      this.medicalDetail.controls['diabetesDetails1'].patchValue(getMedicalDetail.diabetesDetails1);
      this.medicalDetail.controls['kidneyDieaseInd1'].patchValue(getMedicalDetail.kidneyDieaseInd1);
      this.medicalDetail.controls['kidneyDieaseDetails1'].patchValue(getMedicalDetail.kidneyDieaseDetails1);
      this.medicalDetail.controls['digestiveDieaseInd1'].patchValue(getMedicalDetail.digestiveDieaseInd1);
      this.medicalDetail.controls['digestiveDieaseDetails1'].patchValue(getMedicalDetail.digestiveDieaseDetails1);
      this.medicalDetail.controls['cancerDieaseInd1'].patchValue(getMedicalDetail.cancerDieaseInd1);
      this.medicalDetail.controls['cancerDieaseDetails1'].patchValue(getMedicalDetail.cancerDieaseDetails1);
      this.medicalDetail.controls['tropicalDieaseInd1'].patchValue(getMedicalDetail.tropicalDieaseInd1);
      this.medicalDetail.controls['tropicalDieaseDetails1'].patchValue(getMedicalDetail.tropicalDieaseDetails1);
      this.medicalDetail.controls['thyroidDieaseInd1'].patchValue(getMedicalDetail.thyroidDieaseInd1);
      this.medicalDetail.controls['thyroidDieaseDetails1'].patchValue(getMedicalDetail.thyroidDieaseDetails1);
      this.medicalDetail.controls['bloodDieaseInd1'].patchValue(getMedicalDetail.bloodDieaseInd1);
      this.medicalDetail.controls['bloodDieaseDetails1'].patchValue(getMedicalDetail.bloodDieaseDetails1);
      this.medicalDetail.controls['nervousDieaseInd1'].patchValue(getMedicalDetail.nervousDieaseInd1);
      this.medicalDetail.controls['nervousDieaseDetails1'].patchValue(getMedicalDetail.nervousDieaseDetails1);
      this.medicalDetail.controls['isRecovered1'].patchValue(getMedicalDetail.isRecovered1);
      this.medicalDetail.controls['nonRecoveryDetails1'].patchValue(getMedicalDetail.nonRecoveryDetails1);
      this.medicalDetail.controls['muscleDieaseInd1'].patchValue(getMedicalDetail.muscleDieaseInd1);
      this.medicalDetail.controls['muscleDieaseDetails1'].patchValue(getMedicalDetail.muscleDieaseDetails1);
      this.medicalDetail.controls['receivedTreatment21'].patchValue(getMedicalDetail.receivedTreatment21);
      this.medicalDetail.controls['aidsDetails1'].patchValue(getMedicalDetail.aidsDetails1);
      this.medicalDetail.controls['alcoholicInd1'].patchValue(getMedicalDetail.alcoholicInd1);
      this.medicalDetail.controls['alcoholicDetails1'].patchValue(getMedicalDetail.alcoholicDetails1);
      this.medicalDetail.controls['otherIllnessInd1'].patchValue(getMedicalDetail.otherIllnessInd1);
      this.medicalDetail.controls['otherIllnessDetails1'].patchValue(getMedicalDetail.otherIllnessDetails1);
      this.medicalDetail.controls['deformityInd1'].patchValue(getMedicalDetail.deformityInd1);
      this.medicalDetail.controls['deformityDetails1'].patchValue(getMedicalDetail.deformityDetails1);
      this.medicalDetail.controls['symptomsInd1'].patchValue(getMedicalDetail.symptomsInd1);
      this.medicalDetail.controls['symptomsDetails1'].patchValue(getMedicalDetail.symptomsDetails1);
      this.medicalDetail.controls['pregnantInd1'].patchValue(getMedicalDetail.pregnantInd1);
      this.medicalDetail.controls['pregnantweeks1'].patchValue(getMedicalDetail.pregnantweeks1);
      this.medicalDetail.controls['femaleDieaseInd1'].patchValue(getMedicalDetail.femaleDieaseInd1);
      this.medicalDetail.controls['femaleDetails1'].patchValue(getMedicalDetail.femaleDetails1);
      this.medicalDetail.controls['isFemaleHospitalized1'].patchValue(getMedicalDetail.isFemaleHospitalized1);
      this.medicalDetail.controls['FemalehospitalizedDate1'].patchValue(this.datepipe.transform(getMedicalDetail.FemalehospitalizedDate1, 'y-MM-dd'));

      // this.medicalDetail.controls['FemalehospitalizedDate1'].patchValue(getMedicalDetail.FemalehospitalizedDate1);
      this.medicalDetail.controls['isFemaleRecovered1'].patchValue(getMedicalDetail.isFemaleRecovered1);
      this.medicalDetail.controls['nonFemaleRecoveryDetails1'].patchValue(getMedicalDetail.nonFemaleRecoveryDetails1);
      this.medicalDetail.controls['shealthHistory'].patchValue(getMedicalDetail.shealthHistory);
      this.medicalDetail.controls['shealthHistoryDetail'].patchValue(getMedicalDetail.shealthHistoryDetail);
      this.medicalDetail.controls['shealthHistory1'].patchValue(getMedicalDetail.shealthHistory1);

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
      this.getStepper4 = JSON.parse(sessionStorage.stepper4Details);
      console.log(this.getStepper4 ,'this.getStepper4 ')
      this.bankDetail = this.fb.group({

          accountNo: this.getStepper4.accountNo,
          accName: this.getStepper4.accName,
          name: this.getStepper4.name,
          location: this.getStepper4.location,
          ifscCode: this.getStepper4.ifscCode,


      });

    }
    console.log(this.bankDetail, " stepper4 ");

  }
  changeTitle() {

    this.customerDetails.controls['titleName'].patchValue(this.etitle[this.customerDetails.controls['title'].value]);
    console.log(this.customerDetails.controls['titleName'].value,'456789');
    console.log(this.customerDetails.controls['title'].value,'456789');
  }
  changeTitle1() {
    this.insureArray.controls['titleName'].patchValue(this.etitle[this.insureArray.controls['title'].value]);
    console.log(this.insureArray.controls['titleName'].value,'this.insu54678')
    console.log(this.insureArray.controls['title'].value,'76.insu54678')
  }
  changeSpoTitle() {
    this.proposer.controls['stitleName'].patchValue(this.etitle[this.proposer.controls['stitle'].value]);
  }

  changeFirstname() {
    this.insureArray.controls['firstName'].patchValue(this.customerDetails.controls['firstName'].value);
  }
  changeSpoTitles() {
    this.addon.controls['stitleName'].patchValue(this.etitle[this.addon.controls['stitle'].value]);
    console.log(this.addon.controls['stitle'].value,'45678')
  }
  changeSpoTitle1() {
    this.insureArray.controls['stitleName'].patchValue(this.etitle[this.insureArray.controls['stitle'].value]);
  }
  changeAlcoholValue(){
    this.medicalDetail.controls['alcoholDetailName'].patchValue(this.eAlcoholDetails[this.medicalDetail.controls['alcoholDetails'].value]);
    console.log(this.medicalDetail.controls['alcoholDetailName'].value,'45fdghjk')
    console.log(this.medicalDetail.controls['alcoholDetails'].value,'45fdghjk')
  }
  // TobaccoValues(){
  //   this.customerDetails.controls['tobaccoDetailName'].patchValue(this.eTobaccoDetails[this.customerDetails.controls['tobaccoDetails'].value]);
  //
  // }
  // TobaccoValues1(){
  //   this.customerDetails.controls['tobaccoDetailName1'].patchValue(this.eTobaccoDetails[this.customerDetails.controls['tobaccoDetails1'].value]);
  //
  // }
  changeAlcoholValue1(){
    this.medicalDetail.controls['alcoholDetailName1'].patchValue(this.eAlcoholDetails[this.medicalDetail.controls['alcoholDetails1'].value]);
  }
  isadventurousName() {
    this.medicalDetail.controls['adventurousActivitiesName'].patchValue(this.eAdActivity[this.medicalDetail.controls['adventurousActivities'].value]);
    console.log(this.medicalDetail.controls['adventurousActivities'].value,'adventurousActivities1111111')
    console.log(this.medicalDetail.controls['adventurousActivitiesName'].value,'adventurousActivitiesName1111111')
  }
  changeMarital() {
    this.customerDetails.controls['maritalStatusName'].patchValue(this.emaritalStatus[this.customerDetails.controls['maritalStatus'].value]);
    console.log(this.customerDetails.controls['maritalStatusName'].value,'sadfghjj')

  }
  changeMarital1() {
    this.insureArray.controls['maritalStatusName'].patchValue(this.emaritalStatus[this.insureArray.controls['maritalStatus'].value]);
  }
  ageProofName() {
    this.insureArray.controls['ageProofIdName'].patchValue(this.eAgeProof[this.insureArray.controls['ageProofId'].value]);
  }
  ageProofName1() {
    this.insureArray.controls['sageProofIdName'].patchValue(this.eAgeProof[this.insureArray.controls['sageProofId'].value]);
  }
  // companyNameChange() {
  //   this.insureArray.controls['companyNameChangeName'].patchValue(this.eCompanyList[this.insureArray.controls['companyNameChange'].value]);
  // }
  qualificationName() {
    this.insureArray.controls['highestQualificationName'].patchValue(this.eQualification[this.insureArray.controls['highestQualification'].value]);
  }
  // companyNameChange1() {
  //   this.insureArray.controls['scompanyNameChangeName'].patchValue(this.eCompanyList[this.insureArray.controls['scompanyNameChange'].value]);
  // }
  squalificationName() {
    this.insureArray.controls['shighestQualificationName'].patchValue(this.eQualification[this.insureArray.controls['shighestQualification'].value]);
  }
  // employementTypeName() {
  //   insureArray.controls['employementType'].patchValue(this.eemploymentType[this.proposer.controls['employementType'].value]);
  // }
  employementTypeName1() {
    this.insureArray.controls['employementTypeName'].patchValue(this.eemploymentType[this.insureArray.controls['employementType'].value]);
  }
  semployementTypeName1() {
    this.insureArray.controls['semployementTypeName'].patchValue(this.eemploymentType[this.insureArray.controls['semployementType'].value]);
  }
  setbdutyListName() {
    this.insureArray.controls['snaturedutyName'].patchValue(this.bduty[this.insureArray.controls['snatureduty'].value]);
  }
  setbdutyListName1() {
    this.insureArray.controls['naturedutyName'].patchValue(this.bduty[this.insureArray.controls['natureduty'].value]);
  }
  idProofName() {
    this.insureArray.controls['identityProofName'].patchValue(this.eIdProof[this.insureArray.controls['identityProof'].value]);
  }
  incomeProofName() {
    this.insureArray.controls['incomeProofName'].patchValue(this.incomeProofs[this.insureArray.controls['incomeProof'].value]);
  }
  payoutName(){
    this.addon.controls['payoutOptionName'].patchValue(this.epayoutOption[this.addon.controls['payoutOption'].value]);
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
  sgeteFamRelationshipName(i) {
    this.medicalDetail['controls'].smedicalFamilyQuestions['controls'][i]['controls'].srelationName.patchValue(this.eNomineeRelation[this.medicalDetail['controls'].smedicalFamilyQuestions['controls'][i]['controls'].srelation.value] );
  }
  // geteFacauseDeath(i) {
  //   this.medicalDetail['controls'].medicalFamilyQuestions['controls'][i]['controls'].causeDeathName.patchValue(this.eCauseDeath[this.medicalDetail['controls'].medicalFamilyQuestions['controls'][i]['controls'].causeOfDeath.value] );
  // }
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
