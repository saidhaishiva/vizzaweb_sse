import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatStepper} from '@angular/material';
import {DatePipe} from '@angular/common';
import {ActivatedRoute,Router} from '@angular/router';
import {CommonService} from '../../shared/services/common.service';
import {ValidationService} from '../../shared/services/validation.service';
import {AppSettings} from '../../app.settings';
import {ToastrService} from 'ngx-toastr';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {TermLifeCommonService} from '../../shared/services/term-life-common.service';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import * as moment from 'moment';
import { WINDOW } from '@ng-toolkit/universal';


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
  selector: 'app-edelweiss-pos',
  templateUrl: './edelweiss-pos.component.html',
  styleUrls: ['./edelweiss-pos.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class EdelweissPosComponent implements OnInit {

  public proposer: FormGroup;
  public insureArray: FormGroup;
  public medicalDetail: FormGroup;
  public bankDetail: FormGroup;
  public nomineeDetail: FormGroup;
  public documentDetail: FormGroup;
  public itemsNominee: any;
  public addExistingInsurance: any;
  public addmedicalQuestions: any;
  public addmedFamilyQuestions: any;
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
      emailId: ['', Validators.compose([ Validators.required,Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
      pan: ['', Validators.compose([ Validators.minLength(10)])],
      aadhaarNo: '',
      ageProofIdName: '',
      fatherhusbandName: '',
      ageProofId: ['', Validators.compose([Validators.required])],
      highestQualification: ['', Validators.compose([Validators.required])],
      highestQualificationName: '',
      otherQualification: '',
      mobileNo: ['', Validators.compose([Validators.pattern('[6-9]\\d{9}')])],
      isStaff: 'No',
      employeeCode: '',
      // stitle: '',
      // sfirstName: '',
      // smidName: '',
      // slastName: '',
      // sdob: '',
      // semailId: ['', Validators.compose([ Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
      // smobileNo: '',
      // isSmokerSpouse: 'No',
      // isStaffSpouse: 'No',
      // employeeCodeSpouse: '',
      // relationSpouseProposer: '3',
      // relationSpouseProposerName: 'Spouse',
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
      employerName:'',
      natureduty: ['', Validators.compose([Validators.required])],
      naturedutyName: '',
      employerAddr: ['', Validators.compose([Validators.required])],
      annualIncome: ['', Validators.compose([Validators.required])],
      taxResidence: ['', Validators.compose([Validators.required])],

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
      emailId: ['', Validators.compose([ Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
      pan: ['', Validators.compose([ Validators.minLength(10)])],
      aadhaarNo: ['', Validators.compose([Validators.required])],
      ageProofIdName: '',
      fatherhusbandName: '',
      ageProofId: ['', Validators.compose([Validators.required])],
      highestQualification: ['', Validators.compose([Validators.required])],
      highestQualificationName: '',
      otherQualification: '',
      mobileNo: ['', Validators.compose([Validators.pattern('[6-9]\\d{9}')])],
      isStaff: 'No',
      employeeCode: '',
      // stitle: '',
      // sfirstName: '',
      // smidName: '',
      // slastName: '',
      // sdob: '',
      // semailId: ['', Validators.compose([ Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
      // smobileNo: '',
      // isSmokerSpouse: 'No',
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
      employerName: '',
      natureduty: ['', Validators.compose([Validators.required])],
      naturedutyName: '',
      employerAddr: ['', Validators.compose([Validators.required])],
      annualIncome: ['', Validators.compose([Validators.required])],
      taxResidence: ['', Validators.compose([Validators.required])],
      isPoliticallyExposed: false,
      specification: '',
      isCriminal: 'No',
      criminalDetails: '',
      identityProof: ['', Validators.compose([Validators.required])],
      identityProofName: '',
      categorization: ['', Validators.compose([Validators.required])],

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
      epolicy: '',
      einsureAccNo: 'No',
      epolicy1: '',
      insureRepository: '',
      planOption: 'No',
      workSiteFlag: 'No',
      investmentStrategy: '',
      risingStar: 'No',
      policyOption: '',
      additionalBenefit: '',
      TopUpBenefit: 'No',
      topUpBenefitPercentage: '',
      topUpRate: '',
      betterHalfBenefit: 'No',
      betterHalfsumAssured: '',
      waiverOfPremiumBenefit: 'No',
      criticalIllness: 'No',
      criticalsumAssured: '',
      isADB: 'No',
      sumAssuredADB: '',
      isATPD: 'No',
      sumAssuredATPD: '',
      isHCB: 'No',
      sumAssuredHCB: '',
      payoutOption: '',
      noOfMonths: '',
      payoutPercentageIncome: '',
      sameAsProposer: false,
      medicalTreatment: 'No',
      medicationDetails: '',
      receivedTreatment2: 'No',
      aidsDetails: '',
      receivedTreatment1: 'No',
      diagnosedDetails:  '',

    });

    this.medicalDetail = this.fb.group({
      travelOutsideIndia: 'No',
      pilot: 'No',
      adventurousActivities: '',
      adventurousActivitiesName: '',
      adventurousActivitiesDetails: '',
      medicalTreatment: 'No',
      medicationDetails: '',
      receivedTreatment1: 'No',
      diagnosedDetails:  '',
      receivedTreatment2: 'No',
      aidsDetails: '',
      healthInformation: '',
      drugsInd: 'No',
      drugsDetails: '',
      alcoholInd: 'No',
      alcoholDetails: '',
      alcoholBeer: '',
      alcoholliquar: '',
      alcoholWine: '',
      tobaccoInd: 'No',
      tobaccoDetails: '',
      tobaccoStopInd: '',
      tobaccoStopDetails: '',
      consultDoctorInd: 'No',
      consultDoctorDetails: '',
      ECGInd: 'No',
      ECGDetails: '',
      admitInd: 'No',
      admitDetails:  '',
      heartDieaseInd: 'No',
      heartDieaseDetails: '',
      isHospitalized: 'No',
      hospitalizedDate:  '',
      respiratoryDieaseInd: 'No',
      respiratoryDieaseDetails: '',
      diabetesInd: 'No',
      diabetesDetails: '',
      kidneyDieaseInd: 'No',
      kidneyDieaseDetails: '',
      digestiveDieaseInd: 'No',
      digestiveDieaseDetails: '',
      cancerDieaseInd: 'No',
      cancerDieaseDetails: '',
      tropicalDieaseInd: 'No',
      tropicalDieaseDetails: '',
      thyroidDieaseInd: 'No',
      thyroidDieaseDetails: '',
      bloodDieaseInd: 'No',
      bloodDieaseDetails: '',
      nervousDieaseInd: 'No',
      nervousDieaseDetails: '',
      isRecovered: 'No',
      nonRecoveryDetails: '',
      muscleDieaseInd: 'No',
      muscleDieaseDetails: '',
      alcoholicInd: 'No',
      alcoholicDetails: '',
      otherIllnessInd: 'No',
      otherIllnessDetails: '',
      deformityInd: 'No',
      deformityDetails: '',
      symptomsInd: 'No',
      symptomsDetails: '',
      pregnantInd: 'No',
      pregnantweeks: '',
      femaleDieaseInd: 'No',
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
    this.getesalereqProof();
    this.geteAlcoholDetails();
    this.sessionData();
    this.proposer.controls['dob'].patchValue (this.datepipe.transform(this.enquiryFromDetials.dob, 'y-MM-dd'));
    let dob = this.datepipe.transform(this.enquiryFromDetials.dob, 'y-MM-dd');
    this.proposerAge = this.ageCalculate(dob);
    sessionStorage.proposerAge = this.proposerAge;
    // this.proposer.controls['age'].patchValue(this.proposerAge);
    this.proposer.controls['gender'].patchValue(this.enquiryFromDetials.gender == 'f' ? 'Female' : 'Male');

    // this.proposer.controls['title'].patchValue(this.enquiryFromDetials.gender == 'm' ? 'Mr.' : 'Mrs./Ms.');

    if (this.enquiryFromDetials.gender == 'm') {
      this.proposer.controls['title'].patchValue('1');
      // if (this.enquiryFromDetials.gender == 'm') {
      //   this.proposer.controls['gender'].patchValue('Male');
      // } else {
      //   this.proposer.controls['gender'].patchValue('Female');
      // }
    } else if (this.enquiryFromDetials.gender == 'f') {
      this.proposer.controls['title'].patchValue('2');

    }
    this.proposer.controls['currPincode'].patchValue(this.enquiryFromDetials.pincode);
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
  addressValidate(event: any) {
    this.validation.addressValidate(event);
  }
  employeeCode(event: any) {
    this.validation.employeeCode(event);
  }
  spaceValidator(event: any) {
    this.validation.spaceValidator(event);
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

  // sameAsInsure() {
  //     if (this.insureArray.controls['investing'].value == 'SELF') {
  //       console.log(this.insureArray.controls['investing'].value,'111111')
  //       alert('1111');
  //           this.insureArray.controls['title'].patchValue(this.insureArray.controls['title'].value),
  //           this.insureArray.controls['titleName'].patchValue(this.insureArray.controls['titleName'].value),
  //           this.insureArray.controls['firstName'].patchValue(this.insureArray.controls['firstName'].value),
  //           this.insureArray.controls['midName'].patchValue(this.insureArray.controls['midName'].value),
  //           this.insureArray.controls['lastName'].patchValue(this.insureArray.controls['lastName'].value),
  //           this.insureArray.controls['gender'].patchValue(this.insureArray.controls['gender'].value),
  //           this.insureArray.controls['dob'].patchValue(this.insureArray.controls['dob'].value),
  //           this.insureArray.controls['maritalStatus'].patchValue(this.insureArray.controls['maritalStatus'].value),
  //           this.insureArray.controls['maritalStatusName'].patchValue(this.insureArray.controls['maritalStatusName'].value),
  //           this.insureArray.controls['nationality'].patchValue(this.insureArray.controls['nationality'].value),
  //           this.insureArray.controls['emailId'].patchValue(this.insureArray.controls['emailId'].value),
  //           this.insureArray.controls['pan'].patchValue(this.insureArray.controls['pan'].value),
  //           this.insureArray.controls['aadhaarNo'].patchValue(this.insureArray.controls['aadhaarNo'].value),
  //           this.insureArray.controls['fatherhusbandName'].patchValue(this.insureArray.controls['fatherhusbandName'].value),
  //           this.insureArray.controls['ageProofId'].patchValue(this.insureArray.controls['ageProofId'].value),
  //           this.insureArray.controls['ageProofIdName'].patchValue(this.insureArray.controls['ageProofIdName'].value),
  //           this.insureArray.controls['highestQualification'].patchValue(this.insureArray.controls['highestQualification'].value),
  //           this.insureArray.controls['highestQualificationName'].patchValue(this.insureArray.controls['highestQualificationName'].value),
  //           this.insureArray.controls['otherQualification'].patchValue(this.insureArray.controls['otherQualification'].value),
  //           this.insureArray.controls['mobileNo'].patchValue(this.insureArray.controls['mobileNo'].value),
  //           this.insureArray.controls['isStaff'].patchValue(this.insureArray.controls['isStaff'].value),
  //           this.insureArray.controls['employeeCode'].patchValue(this.insureArray.controls['employeeCode'].value),
  //           // this.insureArray.controls['stitle'].patchValue(this.proposer.controls['stitle'].value),
  //           // this.insureArray.controls['sfirstName'].patchValue(this.proposer.controls['sfirstName'].value),
  //           // this.insureArray.controls['smidName'].patchValue(this.proposer.controls['smidName'].value),
  //           // this.insureArray.controls['slastName'].patchValue(this.proposer.controls['slastName'].value),
  //           // this.insureArray.controls['sdob'].patchValue(this.proposer.controls['sdob'].value),
  //           // this.insureArray.controls['semailId'].patchValue(this.proposer.controls['semailId'].value),
  //           // this.insureArray.controls['smobileNo'].patchValue(this.proposer.controls['smobileNo'].value),
  //           // this.insureArray.controls['isSmokerSpouse'].patchValue(this.proposer.controls['isSmokerSpouse'].value),
  //           // this.insureArray.controls['isStaffSpouse'].patchValue(this.proposer.controls['isStaffSpouse'].value),
  //           // this.insureArray.controls['employeeCodeSpouse'].patchValue(this.proposer.controls['employeeCodeSpouse'].value),
  //           // this.insureArray.controls['relationSpouseInsurer'].patchValue(this.proposer.controls['relationSpouseProposer'].value),
  //           // this.insureArray.controls['relationSpouseInsurerName'].patchValue(this.proposer.controls['relationSpouseProposerName'].value),
  //           this.insureArray.controls['currAddr1'].patchValue(this.insureArray.controls['currAddr1'].value),
  //           this.insureArray.controls['currAddr2'].patchValue(this.insureArray.controls['currAddr2'].value),
  //           this.insureArray.controls['currAddr3'].patchValue(this.insureArray.controls['currAddr3'].value),
  //           this.insureArray.controls['currPincode'].patchValue(this.insureArray.controls['currPincode'].value),
  //           this.insureArray.controls['currState'].patchValue(this.insureArray.controls['currState'].value),
  //           this.insureArray.controls['currCity'].patchValue(this.insureArray.controls['currCity'].value),
  //           this.insureArray.controls['perAddr1'].patchValue(this.insureArray.controls['perAddr1'].value),
  //           this.insureArray.controls['perAddr2'].patchValue(this.insureArray.controls['perAddr2'].value),
  //           this.insureArray.controls['perAddr3'].patchValue(this.insureArray.controls['perAddr3'].value),
  //           this.insureArray.controls['perPincode'].patchValue(this.insureArray.controls['perPincode'].value),
  //           this.insureArray.controls['perState'].patchValue(this.insureArray.controls['perState'].value),
  //           this.insureArray.controls['perCity'].patchValue(this.insureArray.controls['perCity'].value),
  //           this.insureArray.controls['isCurrPerAddrSame'].patchValue(this.insureArray.controls['isCurrPerAddrSame'].value),
  //           this.insureArray.controls['employementTypeOther'].patchValue(this.insureArray.controls['employementTypeOther'].value),
  //           this.insureArray.controls['employementType'].patchValue(this.insureArray.controls['employementType'].value),
  //           this.insureArray.controls['employementTypeName'].patchValue(this.insureArray.controls['employementTypeName'].value),
  //           this.insureArray.controls['employerName'].patchValue(this.insureArray.controls['employerName'].value),
  //           this.insureArray.controls['natureduty'].patchValue(this.insureArray.controls['natureduty'].value),
  //           this.insureArray.controls['naturedutyName'].patchValue(this.insureArray.controls['naturedutyName'].value),
  //           this.insureArray.controls['employerAddr'].patchValue(this.insureArray.controls['employerAddr'].value),
  //           this.insureArray.controls['annualIncome'].patchValue(this.insureArray.controls['annualIncome'].value),
  //           this.insureArray.controls['taxResidence'].patchValue(this.insureArray.controls['taxResidence'].value)
  //
  //         if (this.insureArray.controls['investing'].value == 'SPOUSE'||this.insureArray.controls['investing'].value == 'SON'||this.insureArray.controls['investing'].value == 'DAUGHTER'||this.insureArray.controls['investing'].value == 'FATHER'||this.insureArray.controls['investing'].value == 'MOTHER') {
  //           alert('2222');
  //                   this.insureArray.controls['title'].patchValue(this.proposer.controls['title'].value),
  //                   this.insureArray.controls['titleName'].patchValue(this.proposer.controls['titleName'].value),
  //                   this.insureArray.controls['firstName'].patchValue(this.proposer.controls['firstName'].value),
  //                   this.insureArray.controls['midName'].patchValue(this.proposer.controls['midName'].value),
  //                   this.insureArray.controls['lastName'].patchValue(this.proposer.controls['lastName'].value),
  //                   this.insureArray.controls['gender'].patchValue(this.proposer.controls['gender'].value),
  //                   this.insureArray.controls['dob'].patchValue(this.proposer.controls['dob'].value),
  //                   this.insureArray.controls['maritalStatus'].patchValue(this.proposer.controls['maritalStatus'].value),
  //                   this.insureArray.controls['maritalStatusName'].patchValue(this.proposer.controls['maritalStatusName'].value),
  //                   this.insureArray.controls['nationality'].patchValue(this.proposer.controls['nationality'].value),
  //                   this.insureArray.controls['emailId'].patchValue(this.proposer.controls['emailId'].value),
  //                   this.insureArray.controls['pan'].patchValue(this.proposer.controls['pan'].value),
  //                   this.insureArray.controls['aadhaarNo'].patchValue(this.proposer.controls['aadhaarNo'].value),
  //                   this.insureArray.controls['fatherhusbandName'].patchValue(this.proposer.controls['fatherhusbandName'].value),
  //                   this.insureArray.controls['ageProofId'].patchValue(this.proposer.controls['ageProofId'].value),
  //                   this.insureArray.controls['ageProofIdName'].patchValue(this.proposer.controls['ageProofIdName'].value),
  //                   this.insureArray.controls['highestQualification'].patchValue(this.proposer.controls['highestQualification'].value),
  //                   this.insureArray.controls['highestQualificationName'].patchValue(this.proposer.controls['highestQualificationName'].value),
  //                   this.insureArray.controls['otherQualification'].patchValue(this.proposer.controls['otherQualification'].value),
  //                   this.insureArray.controls['mobileNo'].patchValue(this.proposer.controls['mobileNo'].value),
  //                   this.insureArray.controls['isStaff'].patchValue(this.proposer.controls['isStaff'].value),
  //                   this.insureArray.controls['employeeCode'].patchValue(this.proposer.controls['employeeCode'].value),
  //                   // this.insureArray.controls['stitle'].patchValue(this.proposer.controls['stitle'].value),
  //                   // this.insureArray.controls['sfirstName'].patchValue(this.proposer.controls['sfirstName'].value),
  //                   // this.insureArray.controls['smidName'].patchValue(this.proposer.controls['smidName'].value),
  //                   // this.insureArray.controls['slastName'].patchValue(this.proposer.controls['slastName'].value),
  //                   // this.insureArray.controls['sdob'].patchValue(this.proposer.controls['sdob'].value),
  //                   // this.insureArray.controls['semailId'].patchValue(this.proposer.controls['semailId'].value),
  //                   // this.insureArray.controls['smobileNo'].patchValue(this.proposer.controls['smobileNo'].value),
  //                   // this.insureArray.controls['isSmokerSpouse'].patchValue(this.proposer.controls['isSmokerSpouse'].value),
  //                   // this.insureArray.controls['isStaffSpouse'].patchValue(this.proposer.controls['isStaffSpouse'].value),
  //                   // this.insureArray.controls['employeeCodeSpouse'].patchValue(this.proposer.controls['employeeCodeSpouse'].value),
  //                   // this.insureArray.controls['relationSpouseInsurer'].patchValue(this.proposer.controls['relationSpouseProposer'].value),
  //                   // this.insureArray.controls['relationSpouseInsurerName'].patchValue(this.proposer.controls['relationSpouseProposerName'].value),
  //                   this.insureArray.controls['currAddr1'].patchValue(this.proposer.controls['currAddr1'].value),
  //                   this.insureArray.controls['currAddr2'].patchValue(this.proposer.controls['currAddr2'].value),
  //                   this.insureArray.controls['currAddr3'].patchValue(this.proposer.controls['currAddr3'].value),
  //                   this.insureArray.controls['currPincode'].patchValue(this.proposer.controls['currPincode'].value),
  //                   this.insureArray.controls['currState'].patchValue(this.proposer.controls['currState'].value),
  //                   this.insureArray.controls['currCity'].patchValue(this.proposer.controls['currCity'].value),
  //                   this.insureArray.controls['perAddr1'].patchValue(this.proposer.controls['perAddr1'].value),
  //                   this.insureArray.controls['perAddr2'].patchValue(this.proposer.controls['perAddr2'].value),
  //                   this.insureArray.controls['perAddr3'].patchValue(this.proposer.controls['perAddr3'].value),
  //                   this.insureArray.controls['perPincode'].patchValue(this.proposer.controls['perPincode'].value),
  //                   this.insureArray.controls['perState'].patchValue(this.proposer.controls['perState'].value),
  //                   this.insureArray.controls['perCity'].patchValue(this.proposer.controls['perCity'].value),
  //                   this.insureArray.controls['isCurrPerAddrSame'].patchValue(this.proposer.controls['isCurrPerAddrSame'].value),
  //                   this.insureArray.controls['employementTypeOther'].patchValue(this.proposer.controls['employementTypeOther'].value),
  //                   this.insureArray.controls['employementType'].patchValue(this.proposer.controls['employementType'].value),
  //                   this.insureArray.controls['employementTypeName'].patchValue(this.proposer.controls['employementTypeName'].value),
  //                   this.insureArray.controls['employerName'].patchValue(this.proposer.controls['employerName'].value),
  //                   this.insureArray.controls['natureduty'].patchValue(this.proposer.controls['natureduty'].value),
  //                   this.insureArray.controls['naturedutyName'].patchValue(this.proposer.controls['naturedutyName'].value),
  //                   this.insureArray.controls['employerAddr'].patchValue(this.proposer.controls['employerAddr'].value),
  //                   this.insureArray.controls['annualIncome'].patchValue(this.proposer.controls['annualIncome'].value),
  //                   this.insureArray.controls['taxResidence'].patchValue(this.proposer.controls['taxResidence'].value)
  //         } else {
  //           alert('3333');
  //           this.insureArray.controls['title'].patchValue(''),
  //               this.insureArray.controls['titleName'].patchValue(''),
  //               this.insureArray.controls['firstName'].patchValue(''),
  //               this.insureArray.controls['midName'].patchValue(''),
  //               this.insureArray.controls['lastName'].patchValue(''),
  //               this.insureArray.controls['gender'].patchValue(''),
  //               this.insureArray.controls['dob'].patchValue(''),
  //               this.insureArray.controls['maritalStatus'].patchValue(''),
  //               this.insureArray.controls['nationality'].patchValue(''),
  //               this.insureArray.controls['emailId'].patchValue(''),
  //               this.insureArray.controls['pan'].patchValue(''),
  //               this.insureArray.controls['aadhaarNo'].patchValue(''),
  //               this.insureArray.controls['fatherhusbandName'].patchValue(''),
  //               this.insureArray.controls['ageProofId'].patchValue(''),
  //               this.insureArray.controls['ageProofIdName'].patchValue(''),
  //               this.insureArray.controls['highestQualification'].patchValue(''),
  //               this.insureArray.controls['highestQualificationName'].patchValue(''),
  //               this.insureArray.controls['otherQualification'].patchValue(''),
  //               this.insureArray.controls['mobileNo'].patchValue(''),
  //               this.insureArray.controls['isStaff'].patchValue(''),
  //               this.insureArray.controls['employeeCode'].patchValue(''),
  //               // this.insureArray.controls['stitle'].patchValue(''),
  //               // this.insureArray.controls['sfirstName'].patchValue(''),
  //               // this.insureArray.controls['smidName'].patchValue(''),
  //               // this.insureArray.controls['slastName'].patchValue(''),
  //               // this.insureArray.controls['sdob'].patchValue(''),
  //               // this.insureArray.controls['semailId'].patchValue(''),
  //               // this.insureArray.controls['smobileNo'].patchValue(''),
  //               // this.insureArray.controls['isSmokerSpouse'].patchValue(''),
  //               // this.insureArray.controls['isStaffSpouse'].patchValue(''),
  //               this.insureArray.controls['currAddr1'].patchValue(''),
  //               this.insureArray.controls['currAddr2'].patchValue(''),
  //               this.insureArray.controls['currAddr3'].patchValue(''),
  //               this.insureArray.controls['currPincode'].patchValue(''),
  //               this.insureArray.controls['currState'].patchValue(''),
  //               this.insureArray.controls['currCity'].patchValue(''),
  //               this.insureArray.controls['perAddr1'].patchValue(''),
  //               this.insureArray.controls['perAddr2'].patchValue(''),
  //               this.insureArray.controls['perAddr3'].patchValue(''),
  //               this.insureArray.controls['perPincode'].patchValue(''),
  //               this.insureArray.controls['perState'].patchValue(''),
  //               this.insureArray.controls['perCity'].patchValue(''),
  //               this.insureArray.controls['isCurrPerAddrSame'].patchValue(''),
  //               this.insureArray.controls['employementTypeOther'].patchValue(''),
  //               this.insureArray.controls['employementType'].patchValue(''),
  //               this.insureArray.controls['employerName'].patchValue(''),
  //               this.insureArray.controls['natureduty'].patchValue(''),
  //               this.insureArray.controls['employerAddr'].patchValue(''),
  //               this.insureArray.controls['annualIncome'].patchValue(''),
  //               this.insureArray.controls['taxResidence'].patchValue('')
  //
  //         }
  //     alert('444')
  //           this.insureArray.controls['title'].updateValueAndValidity(),
  //           this.insureArray.controls['titleName'].updateValueAndValidity(),
  //           this.insureArray.controls['firstName'].updateValueAndValidity(),
  //           this.insureArray.controls['midName'].updateValueAndValidity(),
  //           this.insureArray.controls['lastName'].updateValueAndValidity(),
  //           this.insureArray.controls['gender'].updateValueAndValidity(),
  //           this.insureArray.controls['dob'].updateValueAndValidity(),
  //           this.insureArray.controls['maritalStatus'].updateValueAndValidity(),
  //           this.insureArray.controls['nationality'].updateValueAndValidity(),
  //           this.insureArray.controls['emailId'].updateValueAndValidity(),
  //           this.insureArray.controls['pan'].updateValueAndValidity(),
  //           this.insureArray.controls['aadhaarNo'].updateValueAndValidity(),
  //           this.insureArray.controls['fatherhusbandName'].updateValueAndValidity(),
  //           this.insureArray.controls['ageProofId'].updateValueAndValidity(),
  //           this.insureArray.controls['ageProofIdName'].updateValueAndValidity(),
  //           this.insureArray.controls['highestQualification'].updateValueAndValidity(),
  //           this.insureArray.controls['highestQualificationName'].updateValueAndValidity(),
  //           this.insureArray.controls['otherQualification'].updateValueAndValidity(),
  //           this.insureArray.controls['mobileNo'].updateValueAndValidity(),
  //           this.insureArray.controls['isStaff'].updateValueAndValidity(),
  //           this.insureArray.controls['employeeCode'].updateValueAndValidity(),
  //           // this.insureArray.controls['stitle'].patchValue(''),
  //           // this.insureArray.controls['sfirstName'].patchValue(''),
  //           // this.insureArray.controls['smidName'].patchValue(''),
  //           // this.insureArray.controls['slastName'].patchValue(''),
  //           // this.insureArray.controls['sdob'].patchValue(''),
  //           // this.insureArray.controls['semailId'].patchValue(''),
  //           // this.insureArray.controls['smobileNo'].patchValue(''),
  //           // this.insureArray.controls['isSmokerSpouse'].patchValue(''),
  //           // this.insureArray.controls['isStaffSpouse'].patchValue(''),
  //           this.insureArray.controls['currAddr1'].updateValueAndValidity(),
  //           this.insureArray.controls['currAddr2'].updateValueAndValidity(),
  //           this.insureArray.controls['currAddr3'].updateValueAndValidity(),
  //           this.insureArray.controls['currPincode'].updateValueAndValidity(),
  //           this.insureArray.controls['currState'].updateValueAndValidity(),
  //           this.insureArray.controls['currCity'].updateValueAndValidity(),
  //           this.insureArray.controls['perAddr1'].updateValueAndValidity(),
  //           this.insureArray.controls['perAddr2'].updateValueAndValidity(),
  //           this.insureArray.controls['perAddr3'].updateValueAndValidity(),
  //           this.insureArray.controls['perPincode'].updateValueAndValidity(),
  //           this.insureArray.controls['perState'].updateValueAndValidity(),
  //           this.insureArray.controls['perCity'].updateValueAndValidity(),
  //           this.insureArray.controls['isCurrPerAddrSame'].updateValueAndValidity(),
  //           this.insureArray.controls['employementTypeOther'].updateValueAndValidity(),
  //           this.insureArray.controls['employementType'].updateValueAndValidity(),
  //           this.insureArray.controls['employerName'].updateValueAndValidity(),
  //           this.insureArray.controls['natureduty'].updateValueAndValidity(),
  //           this.insureArray.controls['employerAddr'].updateValueAndValidity(),
  //           this.insureArray.controls['annualIncome'].updateValueAndValidity(),
  //           this.insureArray.controls['taxResidence'].updateValueAndValidity()
  //     }
  //     else {
  //       alert('5555');
  //           this.insureArray.controls['title'].patchValue(''),
  //           this.insureArray.controls['titleName'].patchValue(''),
  //           this.insureArray.controls['firstName'].patchValue(''),
  //           this.insureArray.controls['midName'].patchValue(''),
  //           this.insureArray.controls['lastName'].patchValue(''),
  //           this.insureArray.controls['gender'].patchValue(''),
  //           this.insureArray.controls['dob'].patchValue(''),
  //           this.insureArray.controls['maritalStatus'].patchValue(''),
  //           this.insureArray.controls['nationality'].patchValue(''),
  //           this.insureArray.controls['emailId'].patchValue(''),
  //           this.insureArray.controls['pan'].patchValue(''),
  //           this.insureArray.controls['aadhaarNo'].patchValue(''),
  //           this.insureArray.controls['fatherhusbandName'].patchValue(''),
  //           this.insureArray.controls['ageProofId'].patchValue(''),
  //           this.insureArray.controls['ageProofIdName'].patchValue(''),
  //           this.insureArray.controls['highestQualification'].patchValue(''),
  //           this.insureArray.controls['highestQualificationName'].patchValue(''),
  //           this.insureArray.controls['otherQualification'].patchValue(''),
  //           this.insureArray.controls['mobileNo'].patchValue(''),
  //           this.insureArray.controls['isStaff'].patchValue(''),
  //           this.insureArray.controls['employeeCode'].patchValue(''),
  //           // this.insureArray.controls['stitle'].patchValue(''),
  //           // this.insureArray.controls['sfirstName'].patchValue(''),
  //           // this.insureArray.controls['smidName'].patchValue(''),
  //           // this.insureArray.controls['slastName'].patchValue(''),
  //           // this.insureArray.controls['sdob'].patchValue(''),
  //           // this.insureArray.controls['semailId'].patchValue(''),
  //           // this.insureArray.controls['smobileNo'].patchValue(''),
  //           // this.insureArray.controls['isSmokerSpouse'].patchValue(''),
  //           // this.insureArray.controls['isStaffSpouse'].patchValue(''),
  //           this.insureArray.controls['currAddr1'].patchValue(''),
  //           this.insureArray.controls['currAddr2'].patchValue(''),
  //           this.insureArray.controls['currAddr3'].patchValue(''),
  //           this.insureArray.controls['currPincode'].patchValue(''),
  //           this.insureArray.controls['currState'].patchValue(''),
  //           this.insureArray.controls['currCity'].patchValue(''),
  //           this.insureArray.controls['perAddr1'].patchValue(''),
  //           this.insureArray.controls['perAddr2'].patchValue(''),
  //           this.insureArray.controls['perAddr3'].patchValue(''),
  //           this.insureArray.controls['perPincode'].patchValue(''),
  //           this.insureArray.controls['perState'].patchValue(''),
  //           this.insureArray.controls['perCity'].patchValue(''),
  //           this.insureArray.controls['isCurrPerAddrSame'].patchValue(''),
  //           this.insureArray.controls['employementTypeOther'].patchValue(''),
  //           this.insureArray.controls['employementType'].patchValue(''),
  //           this.insureArray.controls['employerName'].patchValue(''),
  //           this.insureArray.controls['natureduty'].patchValue(''),
  //           this.insureArray.controls['employerAddr'].patchValue(''),
  //           this.insureArray.controls['annualIncome'].patchValue(''),
  //           this.insureArray.controls['taxResidence'].patchValue('')
  //     }
  //     alert('666')
  //       this.insureArray.controls['title'].updateValueAndValidity(),
  //       this.insureArray.controls['titleName'].updateValueAndValidity(),
  //       this.insureArray.controls['firstName'].updateValueAndValidity(),
  //       this.insureArray.controls['midName'].updateValueAndValidity(),
  //       this.insureArray.controls['lastName'].updateValueAndValidity(),
  //       this.insureArray.controls['gender'].updateValueAndValidity(),
  //       this.insureArray.controls['dob'].updateValueAndValidity(),
  //       this.insureArray.controls['maritalStatus'].updateValueAndValidity(),
  //       this.insureArray.controls['nationality'].updateValueAndValidity(),
  //       this.insureArray.controls['emailId'].updateValueAndValidity(),
  //       this.insureArray.controls['pan'].updateValueAndValidity(),
  //       this.insureArray.controls['aadhaarNo'].updateValueAndValidity(),
  //       this.insureArray.controls['fatherhusbandName'].updateValueAndValidity(),
  //       this.insureArray.controls['ageProofId'].updateValueAndValidity(),
  //       this.insureArray.controls['ageProofIdName'].updateValueAndValidity(),
  //       this.insureArray.controls['highestQualification'].updateValueAndValidity(),
  //       this.insureArray.controls['highestQualificationName'].updateValueAndValidity(),
  //       this.insureArray.controls['otherQualification'].updateValueAndValidity(),
  //       this.insureArray.controls['mobileNo'].updateValueAndValidity(),
  //       this.insureArray.controls['isStaff'].updateValueAndValidity(),
  //       this.insureArray.controls['employeeCode'].updateValueAndValidity(),
  //       // this.insureArray.controls['stitle'].patchValue(''),
  //       // this.insureArray.controls['sfirstName'].patchValue(''),
  //       // this.insureArray.controls['smidName'].patchValue(''),
  //       // this.insureArray.controls['slastName'].patchValue(''),
  //       // this.insureArray.controls['sdob'].patchValue(''),
  //       // this.insureArray.controls['semailId'].patchValue(''),
  //       // this.insureArray.controls['smobileNo'].patchValue(''),
  //       // this.insureArray.controls['isSmokerSpouse'].patchValue(''),
  //       // this.insureArray.controls['isStaffSpouse'].patchValue(''),
  //       this.insureArray.controls['currAddr1'].updateValueAndValidity(),
  //       this.insureArray.controls['currAddr2'].updateValueAndValidity(),
  //       this.insureArray.controls['currAddr3'].updateValueAndValidity(),
  //       this.insureArray.controls['currPincode'].updateValueAndValidity(),
  //       this.insureArray.controls['currState'].updateValueAndValidity(),
  //       this.insureArray.controls['currCity'].updateValueAndValidity(),
  //       this.insureArray.controls['perAddr1'].updateValueAndValidity(),
  //       this.insureArray.controls['perAddr2'].updateValueAndValidity(),
  //       this.insureArray.controls['perAddr3'].updateValueAndValidity(),
  //       this.insureArray.controls['perPincode'].updateValueAndValidity(),
  //       this.insureArray.controls['perState'].updateValueAndValidity(),
  //       this.insureArray.controls['perCity'].updateValueAndValidity(),
  //       this.insureArray.controls['isCurrPerAddrSame'].updateValueAndValidity(),
  //       this.insureArray.controls['employementTypeOther'].updateValueAndValidity(),
  //       this.insureArray.controls['employementType'].updateValueAndValidity(),
  //       this.insureArray.controls['employerName'].updateValueAndValidity(),
  //       this.insureArray.controls['natureduty'].updateValueAndValidity(),
  //       this.insureArray.controls['employerAddr'].updateValueAndValidity(),
  //       this.insureArray.controls['annualIncome'].updateValueAndValidity(),
  //       this.insureArray.controls['taxResidence'].updateValueAndValidity()
  // }
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
          // this.insureArray.controls['stitle'].patchValue(this.proposer.controls['stitle'].value),
          // this.insureArray.controls['sfirstName'].patchValue(this.proposer.controls['sfirstName'].value),
          // this.insureArray.controls['smidName'].patchValue(this.proposer.controls['smidName'].value),
          // this.insureArray.controls['slastName'].patchValue(this.proposer.controls['slastName'].value),
          // this.insureArray.controls['sdob'].patchValue(this.proposer.controls['sdob'].value),
          // this.insureArray.controls['semailId'].patchValue(this.proposer.controls['semailId'].value),
          // this.insureArray.controls['smobileNo'].patchValue(this.proposer.controls['smobileNo'].value),
          // this.insureArray.controls['isSmokerSpouse'].patchValue(this.proposer.controls['isSmokerSpouse'].value),
          // this.insureArray.controls['isStaffSpouse'].patchValue(this.proposer.controls['isStaffSpouse'].value),
          // this.insureArray.controls['employeeCodeSpouse'].patchValue(this.proposer.controls['employeeCodeSpouse'].value),
          // this.insureArray.controls['relationSpouseInsurer'].patchValue(this.proposer.controls['relationSpouseProposer'].value),
          // this.insureArray.controls['relationSpouseInsurerName'].patchValue(this.proposer.controls['relationSpouseProposerName'].value),
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
    } else  {
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
          // this.insureArray.controls['stitle'].patchValue(''),
          // this.insureArray.controls['sfirstName'].patchValue(''),
          // this.insureArray.controls['smidName'].patchValue(''),
          // this.insureArray.controls['slastName'].patchValue(''),
          // this.insureArray.controls['sdob'].patchValue(''),
          // this.insureArray.controls['semailId'].patchValue(''),
          // this.insureArray.controls['smobileNo'].patchValue(''),
          // this.insureArray.controls['isSmokerSpouse'].patchValue(''),
          // this.insureArray.controls['isStaffSpouse'].patchValue(''),
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
//   investingreq() {
//     alert('spouse');
//   if (this.insureArray.controls['investing'].value == 'SPOUSE') {
//   this.insureArray.controls['title'].patchValue(this.insureArray.controls['title'].value),
//   this.insureArray.controls['titleName'].patchValue(this.insureArray.controls['titleName'].value),
//   this.insureArray.controls['firstName'].patchValue(this.insureArray.controls['firstName'].value),
//   this.insureArray.controls['midName'].patchValue(this.insureArray.controls['midName'].value),
//   this.insureArray.controls['lastName'].patchValue(this.insureArray.controls['lastName'].value),
//   this.insureArray.controls['gender'].patchValue(this.insureArray.controls['gender'].value),
//   this.insureArray.controls['dob'].patchValue(this.insureArray.controls['dob'].value),
//   this.insureArray.controls['maritalStatus'].patchValue(this.insureArray.controls['maritalStatus'].value),
//   this.insureArray.controls['maritalStatusName'].patchValue(this.insureArray.controls['maritalStatusName'].value),
//   this.insureArray.controls['nationality'].patchValue(this.insureArray.controls['nationality'].value),
//   this.insureArray.controls['emailId'].patchValue(this.insureArray.controls['emailId'].value),
//   this.insureArray.controls['pan'].patchValue(this.insureArray.controls['pan'].value),
//   this.insureArray.controls['aadhaarNo'].patchValue(this.insureArray.controls['aadhaarNo'].value),
//   this.insureArray.controls['fatherhusbandName'].patchValue(this.insureArray.controls['fatherhusbandName'].value),
//   this.insureArray.controls['ageProofId'].patchValue(this.insureArray.controls['ageProofId'].value),
//   this.insureArray.controls['ageProofIdName'].patchValue(this.insureArray.controls['ageProofIdName'].value),
//   this.insureArray.controls['highestQualification'].patchValue(this.insureArray.controls['highestQualification'].value),
//   this.insureArray.controls['highestQualificationName'].patchValue(this.insureArray.controls['highestQualificationName'].value),
//   this.insureArray.controls['otherQualification'].patchValue(this.insureArray.controls['otherQualification'].value),
//   this.insureArray.controls['mobileNo'].patchValue(this.insureArray.controls['mobileNo'].value),
//   this.insureArray.controls['isStaff'].patchValue(this.insureArray.controls['isStaff'].value),
//   this.insureArray.controls['employeeCode'].patchValue(this.insureArray.controls['employeeCode'].value),
//   // this.insureArray.controls['stitle'].patchValue(this.proposer.controls['stitle'].value),
//   // this.insureArray.controls['sfirstName'].patchValue(this.proposer.controls['sfirstName'].value),
//   // this.insureArray.controls['smidName'].patchValue(this.proposer.controls['smidName'].value),
//   // this.insureArray.controls['slastName'].patchValue(this.proposer.controls['slastName'].value),
//   // this.insureArray.controls['sdob'].patchValue(this.proposer.controls['sdob'].value),
//   // this.insureArray.controls['semailId'].patchValue(this.proposer.controls['semailId'].value),
//   // this.insureArray.controls['smobileNo'].patchValue(this.proposer.controls['smobileNo'].value),
//   // this.insureArray.controls['isSmokerSpouse'].patchValue(this.proposer.controls['isSmokerSpouse'].value),
//   // this.insureArray.controls['isStaffSpouse'].patchValue(this.proposer.controls['isStaffSpouse'].value),
//   // this.insureArray.controls['employeeCodeSpouse'].patchValue(this.proposer.controls['employeeCodeSpouse'].value),
//   // this.insureArray.controls['relationSpouseInsurer'].patchValue(this.proposer.controls['relationSpouseProposer'].value),
//   // this.insureArray.controls['relationSpouseInsurerName'].patchValue(this.proposer.controls['relationSpouseProposerName'].value),
//   this.insureArray.controls['currAddr1'].patchValue(this.insureArray.controls['currAddr1'].value),
//   this.insureArray.controls['currAddr2'].patchValue(this.insureArray.controls['currAddr2'].value),
//   this.insureArray.controls['currAddr3'].patchValue(this.insureArray.controls['currAddr3'].value),
//   this.insureArray.controls['currPincode'].patchValue(this.insureArray.controls['currPincode'].value),
//   this.insureArray.controls['currState'].patchValue(this.insureArray.controls['currState'].value),
//   this.insureArray.controls['currCity'].patchValue(this.insureArray.controls['currCity'].value),
//   this.insureArray.controls['perAddr1'].patchValue(this.insureArray.controls['perAddr1'].value),
//   this.insureArray.controls['perAddr2'].patchValue(this.insureArray.controls['perAddr2'].value),
//   this.insureArray.controls['perAddr3'].patchValue(this.insureArray.controls['perAddr3'].value),
//   this.insureArray.controls['perPincode'].patchValue(this.insureArray.controls['perPincode'].value),
//   this.insureArray.controls['perState'].patchValue(this.insureArray.controls['perState'].value),
//   this.insureArray.controls['perCity'].patchValue(this.insureArray.controls['perCity'].value),
//   this.insureArray.controls['isCurrPerAddrSame'].patchValue(this.insureArray.controls['isCurrPerAddrSame'].value),
//   this.insureArray.controls['employementTypeOther'].patchValue(this.insureArray.controls['employementTypeOther'].value),
//   this.insureArray.controls['employementType'].patchValue(this.insureArray.controls['employementType'].value),
//   this.insureArray.controls['employementTypeName'].patchValue(this.insureArray.controls['employementTypeName'].value),
//   this.insureArray.controls['employerName'].patchValue(this.insureArray.controls['employerName'].value),
//   this.insureArray.controls['natureduty'].patchValue(this.insureArray.controls['natureduty'].value),
//   this.insureArray.controls['naturedutyName'].patchValue(this.insureArray.controls['naturedutyName'].value),
//   this.insureArray.controls['employerAddr'].patchValue(this.insureArray.controls['employerAddr'].value),
//   this.insureArray.controls['annualIncome'].patchValue(this.insureArray.controls['annualIncome'].value),
//   this.insureArray.controls['taxResidence'].patchValue(this.insureArray.controls['taxResidence'].value)
//   console.log(this.insureArray.controls['title'].value, 'ghghghj');
// } else  {
//   this.insureArray.controls['title'].patchValue(''),
//       this.insureArray.controls['titleName'].patchValue(''),
//       this.insureArray.controls['firstName'].patchValue(''),
//       this.insureArray.controls['midName'].patchValue(''),
//       this.insureArray.controls['lastName'].patchValue(''),
//       this.insureArray.controls['gender'].patchValue(''),
//       this.insureArray.controls['dob'].patchValue(''),
//       this.insureArray.controls['maritalStatus'].patchValue(''),
//       this.insureArray.controls['nationality'].patchValue(''),
//       this.insureArray.controls['emailId'].patchValue(''),
//       this.insureArray.controls['pan'].patchValue(''),
//       this.insureArray.controls['aadhaarNo'].patchValue(''),
//       this.insureArray.controls['fatherhusbandName'].patchValue(''),
//       this.insureArray.controls['ageProofId'].patchValue(''),
//       this.insureArray.controls['ageProofIdName'].patchValue(''),
//       this.insureArray.controls['highestQualification'].patchValue(''),
//       this.insureArray.controls['highestQualificationName'].patchValue(''),
//       this.insureArray.controls['otherQualification'].patchValue(''),
//       this.insureArray.controls['mobileNo'].patchValue(''),
//       this.insureArray.controls['isStaff'].patchValue(''),
//       this.insureArray.controls['employeeCode'].patchValue(''),
//       // this.insureArray.controls['stitle'].patchValue(''),
//       // this.insureArray.controls['sfirstName'].patchValue(''),
//       // this.insureArray.controls['smidName'].patchValue(''),
//       // this.insureArray.controls['slastName'].patchValue(''),
//       // this.insureArray.controls['sdob'].patchValue(''),
//       // this.insureArray.controls['semailId'].patchValue(''),
//       // this.insureArray.controls['smobileNo'].patchValue(''),
//       // this.insureArray.controls['isSmokerSpouse'].patchValue(''),
//       // this.insureArray.controls['isStaffSpouse'].patchValue(''),
//       this.insureArray.controls['currAddr1'].patchValue(''),
//       this.insureArray.controls['currAddr2'].patchValue(''),
//       this.insureArray.controls['currAddr3'].patchValue(''),
//       this.insureArray.controls['currPincode'].patchValue(''),
//       this.insureArray.controls['currState'].patchValue(''),
//       this.insureArray.controls['currCity'].patchValue(''),
//       this.insureArray.controls['perAddr1'].patchValue(''),
//       this.insureArray.controls['perAddr2'].patchValue(''),
//       this.insureArray.controls['perAddr3'].patchValue(''),
//       this.insureArray.controls['perPincode'].patchValue(''),
//       this.insureArray.controls['perState'].patchValue(''),
//       this.insureArray.controls['perCity'].patchValue(''),
//       this.insureArray.controls['isCurrPerAddrSame'].patchValue(''),
//       this.insureArray.controls['employementTypeOther'].patchValue(''),
//       this.insureArray.controls['employementType'].patchValue(''),
//       this.insureArray.controls['employerName'].patchValue(''),
//       this.insureArray.controls['natureduty'].patchValue(''),
//       this.insureArray.controls['employerAddr'].patchValue(''),
//       this.insureArray.controls['annualIncome'].patchValue(''),
//       this.insureArray.controls['taxResidence'].patchValue('')
//
// }
//   }

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
        if (this.getAge < 18) {
          this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nomineeAgeVal.patchValue(1);
          console.log(this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nomineeAgeVal.value,'nomineeagevalue');
        } else {
          this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nomineeAgeVal.patchValue(0);
          console.log(this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nomineeAgeVal.value,'nomineeagevalueelsee');
        }

      }
      console.log(this.getAge,'getaage');
      if (this.getAge < 18) {
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
        // if (sessionStorage.proposerSpouseAge >= 18 || sessionStorage.proposerSpouseAge == undefined ) {
          stepper.next();
          this.sameAsInsure();
          // this.investingreq();

        // }
        // else {
        //   this.toastr.error('Spouse Age should be 18 or above');
        //
        // }
      } else {
        this.toastr.error('Proposer Age should be 18 or above');

      }

    } else {
      this.toastr.error('please enter all the Mandatory field ');
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
        // if (sessionStorage.proposerSpouseAge >= 18 || sessionStorage.proposerSpouseAge == undefined) {
          stepper.next();
          this.topScroll();
        // }
        // else {
        //   this.toastr.error('Spouse Age should be 18 or above');
        //
        // }
      } else {
        this.toastr.error('Insurer Age should be 18 or above');

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
    if (this.medicalDetail.valid) {
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
      if (sessionStorage.nomineAge < 18) {
        nomineeValid = false;
      }
    }
    // appointeeAge validatate
    let appointeeAge = false;
    if (sessionStorage.appointeeAge != '' && sessionStorage.appointeeAge != undefined) {
      if (sessionStorage.appointeeAge > 18) {
        appointeeAge = true;
        console.log(appointeeAge,'appointeeAge');
      }
    }

    let appointeeAge2 = false;
    if (sessionStorage.appointeeAge2 != '' && sessionStorage.appointeeAge2 != undefined ) {
      if ( sessionStorage.appointeeAge2 > 18 ) {
        appointeeAge2 = true;
        console.log(appointeeAge2,'appointeeAge2')
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
          console.log(appointeeAge,'appointeeAgeentry')
          if (appointeeAge2 || sessionStorage.appointeeAge2 == undefined ) {
            console.log(appointeeAge2,'aappointeeAge2eentry')
            stepper.next();
            this.topScroll();
            // console.log(appointeeAge2,'falseApp');
          }
          else {
            this.toastr.error('Appointee 2 age should be greater than 18.');
            // console.log('1111');
          }
        } else {
          this.toastr.error('Appointee age should be greater than 18.');
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
    stepper.next();
    this.topScroll();
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

    this.common.edelweissFileUpload(data).subscribe(
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
    if (this.insureArray.controls['sumAssuredADB'].value > 10000 && this.insureArray.controls['sumAssuredADB'].value < 10000000) {
      this.adbError ='';
    } else {
      this.adbError = 'SumAssured Accidental Death Benefit should be 10000 - 10000000';
    }
  }
  sumAssuredATPDError(event:any) {
    if (this.insureArray.controls['sumAssuredATPD'].value > 100000 && this.insureArray.controls['sumAssuredATPD'].value < 10000000) {
      this.atpdError ='';
    } else {
      this.atpdError = 'SumAssured Accidental Total and Permanent Disability should be 100000 - 10000000';
    }
  }
  sumAssuredCiError(event:any) {
    if (this.insureArray.controls['criticalsumAssured'].value > 100000 && this.insureArray.controls['criticalsumAssured'].value < 5000000) {
      this.ciError ='';
    } else {
      this.ciError = 'SumAssured Critical Illness should be 100000 - 5000000';
    }
  }
  sumAssuredHCBError(event:any) {
    if (this.insureArray.controls['sumAssuredHCB'].value > 100000 && this.insureArray.controls['sumAssuredHCB'].value < 600000) {
      this.hcbdError ='';
    } else {
      this.hcbdError = 'SumAssured Hospital Cash Benefit should be 100000 - 600000';
    }
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
  //
  // changeMaritalInsuReq() {
  //
  //   if (this.insureArray.controls['maritalStatus'].value == 'M') {
  //     this.insureArray.controls['stitle'].patchValue(this.insureArray.controls['stitle'].value);
  //     this.insureArray.controls['sfirstName'].patchValue(this.insureArray.controls['sfirstName'].value);
  //     this.insureArray.controls['smidName'].patchValue(this.insureArray.controls['smidName'].value);
  //     this.insureArray.controls['slastName'].patchValue(this.insureArray.controls['slastName'].value);
  //     this.insureArray.controls['sdob'].patchValue(this.insureArray.controls['sdob'].value);
  //     this.insureArray.controls['semailId'].patchValue(this.insureArray.controls['semailId'].value);
  //     this.insureArray.controls['smobileNo'].patchValue(this.insureArray.controls['smobileNo'].value);
  //     this.insureArray.controls['isSmokerSpouse'].patchValue(this.insureArray.controls['isSmokerSpouse'].value);
  //     this.insureArray.controls['isStaffSpouse'].patchValue(this.insureArray.controls['isStaffSpouse'].value);
  //     this.insureArray.controls['relationSpouseInsurer'].patchValue(this.insureArray.controls['relationSpouseInsurer'].value);
  //
  //     this.insureArray.controls['stitle'].setValidators([Validators.required]);
  //     this.insureArray.controls['sfirstName'].setValidators([Validators.required]);
  //     this.insureArray.controls['smidName'].setValidators(null);
  //     this.insureArray.controls['slastName'].setValidators([Validators.required]);
  //     this.insureArray.controls['sdob'].setValidators([Validators.required]);
  //     this.insureArray.controls['semailId'].setValidators([Validators.required]);
  //     this.insureArray.controls['smobileNo'].setValidators([Validators.required]);
  //     this.insureArray.controls['isSmokerSpouse'].setValidators([Validators.required]);
  //     this.insureArray.controls['isStaffSpouse'].setValidators([Validators.required]);
  //     this.insureArray.controls['relationSpouseInsurer'].setValidators([Validators.required]);
  //   } else {
  //     this.insureArray.controls['stitle'].patchValue('');
  //     this.insureArray.controls['sfirstName'].patchValue('');
  //     this.insureArray.controls['smidName'].patchValue('');
  //     this.insureArray.controls['slastName'].patchValue('');
  //     this.insureArray.controls['sdob'].patchValue('');
  //     this.insureArray.controls['semailId'].patchValue('');
  //     this.insureArray.controls['smobileNo'].patchValue('');
  //     this.insureArray.controls['isSmokerSpouse'].patchValue('No');
  //     this.insureArray.controls['isStaffSpouse'].patchValue('No');
  //     this.insureArray.controls['relationSpouseInsurer'].patchValue('3');
  //
  //     this.insureArray.controls['stitle'].setValidators(null);
  //     this.insureArray.controls['sfirstName'].setValidators(null);
  //     this.insureArray.controls['smidName'].setValidators(null);
  //     this.insureArray.controls['slastName'].setValidators(null);
  //     this.insureArray.controls['sdob'].setValidators(null);
  //     this.insureArray.controls['semailId'].setValidators(null);
  //     this.insureArray.controls['smobileNo'].setValidators(null);
  //     this.insureArray.controls['isSmokerSpouse'].setValidators(null);
  //     this.insureArray.controls['isStaffSpouse'].setValidators(null);
  //     this.insureArray.controls['relationSpouseInsurer'].setValidators(null);
  //
  //   }
  //   this.insureArray.controls['employeeCode'].updateValueAndValidity();
  //   this.insureArray.controls['stitle'].updateValueAndValidity();
  //   this.insureArray.controls['sfirstName'].updateValueAndValidity();
  //   this.insureArray.controls['smidName'].updateValueAndValidity();
  //   this.insureArray.controls['slastName'].updateValueAndValidity();
  //   this.insureArray.controls['sdob'].updateValueAndValidity();
  //   this.insureArray.controls['semailId'].updateValueAndValidity();
  //   this.insureArray.controls['smobileNo'].updateValueAndValidity();
  //   this.insureArray.controls['isSmokerSpouse'].updateValueAndValidity();
  //   this.insureArray.controls['isStaffSpouse'].updateValueAndValidity();
  //   this.insureArray.controls['relationSpouseInsurer'].updateValueAndValidity();
  //
  // }

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

      for (let i=0; i < this.bankDetail['controls'].existingInsurance['controls'].length; i++) {
        if (i != 0) {
        }
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
      this.insureArray.controls['epolicy'].patchValue('');
      this.insureArray.controls['einsureAccNo'].patchValue('');

      this.insureArray.controls['provideAccNo'].setValidators(null);
      this.insureArray.controls['epolicy'].setValidators(null);
      this.insureArray.controls['einsureAccNo'].setValidators(null);

    }

    if (this.insureArray.controls['insureAccNo'].value == 'No') {
      this.insureArray.controls['einsureAccNo'].patchValue(this.insureArray.controls['einsureAccNo'].value);
      this.insureArray.controls['einsureAccNo'].setValidators([Validators.required]);
       } else {
      this.insureArray.controls['einsureAccNo'].patchValue('');

      this.insureArray.controls['einsureAccNo'].setValidators(null);

      }


      if ( this.insureArray.controls['insureAccNo'].value == 'No'  && this.insureArray.controls['einsureAccNo'].value == 'Yes') {
        this.insureArray.controls['epolicy1'].patchValue(this.insureArray.controls['epolicy1'].value);
        this.insureArray.controls['insureRepository'].patchValue(this.insureArray.controls['insureRepository'].value);

        this.insureArray.controls['epolicy1'].setValidators([Validators.required]);
        this.insureArray.controls['insureRepository'].setValidators([Validators.required]);
      } else {
        this.insureArray.controls['epolicy1'].patchValue('');
        this.insureArray.controls['insureRepository'].patchValue('');


        this.insureArray.controls['epolicy1'].setValidators(null);
        this.insureArray.controls['insureRepository'].setValidators(null);
        this.insureArray.controls['einsureAccNo'].setValidators(null);

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

    if (this.insureArray.controls['medicalTreatment'].value == 'Yes') {
      this.insureArray.controls['medicationDetails'].patchValue(this.insureArray.controls['medicationDetails'].value);

      this.insureArray.controls['medicationDetails'].setValidators([Validators.required]);
    } else {
      this.insureArray.controls['medicationDetails'].patchValue('');

      this.insureArray.controls['medicationDetails'].setValidators(null);

    }
    this.insureArray.controls['medicationDetails'].updateValueAndValidity();

  }
  isdiagnosedInd() {

    if (this.insureArray.controls['receivedTreatment1'].value == 'Yes') {
      this.insureArray.controls['diagnosedDetails'].patchValue(this.insureArray.controls['diagnosedDetails'].value);

      this.insureArray.controls['diagnosedDetails'].setValidators([Validators.required]);
    } else {
      this.insureArray.controls['diagnosedDetails'].patchValue('');

      this.insureArray.controls['diagnosedDetails'].setValidators(null);

    }
    this.insureArray.controls['diagnosedDetails'].updateValueAndValidity();

  }

  isaidsInd() {

    if (this.insureArray.controls['receivedTreatment2'].value == 'Yes') {
      this.insureArray.controls['aidsDetails'].patchValue(this.insureArray.controls['aidsDetails'].value);

      this.insureArray.controls['aidsDetails'].setValidators([Validators.required]);
    } else {
      this.insureArray.controls['aidsDetails'].patchValue('');

      this.insureArray.controls['aidsDetails'].setValidators(null);

    }
    this.insureArray.controls['aidsDetails'].updateValueAndValidity();

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
  isWeightReq() {

    if (this.insureArray.controls['hasWeightChanged'].value == 'Gained' || this.insureArray.controls['hasWeightChanged'].value == 'Lost') {
      this.insureArray.controls['inbetweenweight'].patchValue(this.insureArray.controls['inbetweenweight'].value);
      this.insureArray.controls['weightChangedreason'].patchValue(this.insureArray.controls['weightChangedreason'].value);

      this.insureArray.controls['inbetweenweight'].setValidators([Validators.required]);
      this.insureArray.controls['weightChangedreason'].setValidators([Validators.required]);
    } else {
      this.insureArray.controls['inbetweenweight'].patchValue('');
      this.insureArray.controls['weightChangedreason'].patchValue('');

      this.insureArray.controls['inbetweenweight'].setValidators(null);
      this.insureArray.controls['weightChangedreason'].setValidators(null);

    }
    this.insureArray.controls['inbetweenweight'].updateValueAndValidity();
    this.insureArray.controls['weightChangedreason'].updateValueAndValidity();

  }
  isTopUpBenefit() {

    if (this.insureArray.controls['TopUpBenefit'].value == 'Yes') {
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

    if (this.insureArray.controls['betterHalfBenefit'].value == 'Yes') {
      this.insureArray.controls['betterHalfsumAssured'].patchValue(this.insureArray.controls['betterHalfsumAssured'].value);

      this.insureArray.controls['betterHalfsumAssured'].setValidators([Validators.required]);
    } else {
      this.insureArray.controls['betterHalfsumAssured'].patchValue('');

      this.insureArray.controls['betterHalfsumAssured'].setValidators(null);

    }
    this.insureArray.controls['betterHalfsumAssured'].updateValueAndValidity();

  }
  iscriticalIllness() {

    if (this.insureArray.controls['criticalIllness'].value == 'Yes') {
      this.insureArray.controls['criticalsumAssured'].patchValue(this.insureArray.controls['criticalsumAssured'].value);

      this.insureArray.controls['criticalsumAssured'].setValidators([Validators.required]);
    } else {
      this.insureArray.controls['criticalsumAssured'].patchValue('');

      this.insureArray.controls['criticalsumAssured'].setValidators(null);

    }
    this.insureArray.controls['criticalsumAssured'].updateValueAndValidity();

  }

  isDeathBenefit() {

    if (this.insureArray.controls['isADB'].value == 'Yes') {
      this.insureArray.controls['sumAssuredADB'].patchValue(this.insureArray.controls['sumAssuredADB'].value);
      this.insureArray.controls['sumAssuredADB'].setValidators([Validators.required]);

    } else {
      this.insureArray.controls['sumAssuredADB'].patchValue('');

      this.insureArray.controls['sumAssuredADB'].setValidators(null);

    }
    this.insureArray.controls['sumAssuredADB'].updateValueAndValidity();

  }
  isAccidentalTotal() {

    if (this.insureArray.controls['isATPD'].value == 'Yes') {
      this.insureArray.controls['sumAssuredATPD'].patchValue(this.insureArray.controls['sumAssuredATPD'].value);

      this.insureArray.controls['sumAssuredATPD'].setValidators([Validators.required]);
    } else {
      this.insureArray.controls['sumAssuredATPD'].patchValue('');

      this.insureArray.controls['sumAssuredATPD'].setValidators(null);

    }
    this.insureArray.controls['sumAssuredATPD'].updateValueAndValidity();

  }
  isHospitalCash() {

    if (this.insureArray.controls['isHCB'].value == 'Yes') {
      this.insureArray.controls['sumAssuredHCB'].patchValue(this.insureArray.controls['sumAssuredHCB'].value);

      this.insureArray.controls['sumAssuredHCB'].setValidators([Validators.required]);
    } else {
      this.insureArray.controls['sumAssuredHCB'].patchValue('');

      this.insureArray.controls['sumAssuredHCB'].setValidators(null);

    }
    this.insureArray.controls['sumAssuredHCB'].updateValueAndValidity();

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
      "term": this.lifePremiumList.term,
      "suminsured_amount": sessionStorage.sumamount,
      "policy_id": this.getEnquiryDetials.enquiry_id,
      "productDetails":{
        "policyTerm":this.lifePremiumList.term,
        "premiumPayingTerm":this.lifePremiumList.policy_paying_term,
        "frequency":this.enquiryFromDetials.payment_mode,
        "sumAssured": sessionStorage.sumamount,
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
        "relationLAProposer":this.insureArray.controls['investing'].value,
        "height":"",
        "heightFeets":this.insureArray.controls['heightFeets'].value,
        "heightInches":this.insureArray.controls['heightInches'].value,
        "heightCentimeters":"",
        "weight":this.insureArray.controls['weight'].value,
        "hasWeightChanged":this.insureArray.controls['hasWeightChanged'].value =='Same'? 'N' : 'Y',
        "weightChange":this.insureArray.controls['inbetweenweight'].value,
        "weightChangeReason":this.insureArray.controls['weightChangedreason'].value,
        "isStaff":this.insureArray.controls['isStaff'].value == 'Yes' ? 'Y' : 'N',
        "employeeCode":this.insureArray.controls['employeeCode'].value,
        "isHospitalized":this.medicalDetail.controls['isHospitalized'].value  == 'Yes' ? 'Y' : 'N',
        "hospitalizedDate":this.medicalDetail.controls['hospitalizedDate'].value,
        "isRecovered":this.medicalDetail.controls['isRecovered'].value  == 'Yes' ? 'Y' : 'N',
        "nonRecoveryDetails":this.medicalDetail.controls['nonRecoveryDetails'].value,
        "isTaxResOfIndia":this.insureArray.controls['taxResidence'].value,
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
          "medicationInd":this.insureArray.controls['medicalTreatment'].value  == 'Yes' ? 'Y' : 'N',
          "medicationDetails":this.insureArray.controls['medicationDetails'].value,
          "diagnosedInd":this.insureArray.controls['receivedTreatment1'].value  == 'Yes' ? 'Y' : 'N',
          "diagnosedDetails":this.insureArray.controls['diagnosedDetails'].value,
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
          "aidsInd":this.insureArray.controls['receivedTreatment2'].value  == 'Yes' ? 'Y' : 'N',
          "aidsDetails":this.insureArray.controls['aidsDetails'].value,
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
        "title":'',
        "firstName":'',
        "middleName":'',
        "lastName":'',
        "dob":'',
        "emailId":'',
        "phoneNo":'',
        "isSmoker":'',
        "isStaff":'',
        "employeeCode":'',
        "relationLAProposer":'',
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
        "isStaff":this.proposer.controls['isStaff'].value == 'Yes' ? 'Y' : 'N',
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
    console.log(this.enquiryFormData.lifeBenefitTerm,'this.enquiryFormData.lifeBenefitTerm')
    console.log(this.enquiryFormData.lifePolicy,'this.enquiryFormData.lifePolicy')
    console.log(this.medicalDetail.controls['adventurousActivities'].value,'medicalDetailadventurousActivities')
    this.settings.loadingSpinner = true;
    this.common.edelweissposProposalCreation(data).subscribe(
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
    this.common.geteTitle(data).subscribe(
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
    this.common.geteGender(data).subscribe(
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
    this.common.geteMaritalStatus(data).subscribe(
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
    this.common.geteInvesting(data).subscribe(
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
    this.common.bdutyListEdelweiss(data).subscribe(
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
    this.common.alcoholDetailsEdelweiss(data).subscribe(
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
    this.common.tobaccoDetailEdelweiss(data).subscribe(
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
    this.common.getePremiumTerm(data).subscribe(
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
    this.common.getePolicyTerm(data).subscribe(
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
  // getPremiumList() {
  //   const data = {
  //     'platform': 'web',
  //     'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
  //     'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
  //     'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
  //
  //   }
  //   this.termService.getPremiumList(data).subscribe(
  //       (successData) => {
  //         this.getPremiumSuccess(successData);
  //       },
  //       (error) => {
  //         this.getPremiumFailure(error);
  //       }
  //   );
  // }
  //
  // public getPremiumSuccess(successData) {
  //   if (successData.IsSuccess) {
  //     this.payingTermList = successData.ResponseObject;
  //   }
  // }
  //
  // public getPremiumFailure(error) {
  // }
  geteFrequency() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.common.geteFrequency(data).subscribe(
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
    this.common.geteStaff(data).subscribe(
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
    this.common.geteAgeProof(data).subscribe(
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
    this.common.geteIdProof(data).subscribe(
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
    this.common.geteAddressProof(data).subscribe(
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
    this.common.geteQualification(data).subscribe(
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
    this.common.getepolicyStatus(data).subscribe(
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
    this.common.geteacceptanceTerm(data).subscribe(
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
    this.common.geteState(data).subscribe(
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
    this.common.geteemploymentType(data).subscribe(
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
    this.common.geteDuty(data).subscribe(
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
    this.common.geteHeightFeet(data).subscribe(
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
    this.common.getepolicyOption(data).subscribe(
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
    this.common.getepayoutOption(data).subscribe(
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
    this.common.getepayoutMonthOption(data).subscribe(
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
    this.common.geteHeightInches(data).subscribe(
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
    this.common.geteHealthStaus(data).subscribe(
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
    this.common.WeightCdedelweiss(data).subscribe(
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
    this.common.geteChangedWeightCds(data).subscribe(
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
    this.common.getePolicyCategory(data).subscribe(
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
    this.common.edelweissActivities(data).subscribe(
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
    this.common.geteNomineeRelation(data).subscribe(
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
    this.common.geteInsuranceRepository(data).subscribe(
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
    this.common.getTopUpRate(data).subscribe(
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
    this.common.edelweissDocumentProof(data).subscribe(
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
    this.common.edelweissIncomeProof(data).subscribe(
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
    this.common.edelweissProposalProof(data).subscribe(
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
    this.common.edelweissAgeProof(data).subscribe(
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
    this.common.edelweissAddressProof(data).subscribe(
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
    this.common.edelweissKYCProof(data).subscribe(
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
    this.common.edelweissidDocProof(data).subscribe(
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
    this.common.edelweissOtherDocProof(data).subscribe(
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
    this.common.edelweissSalesReqProof(data).subscribe(
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
      "policy_id": this.getEnquiryDetials.enquiry_id,
      "transaction_id":this.summaryData.receipt_no,
      "policy_no":this.summaryData.policy_no,
    };
    this.settings.loadingSpinner = true;
    this.common.edelweissDownloadPdf(data).subscribe(
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
      this.proposalFormPdf = this.proposalNextList.path;
      console.log(this.proposalFormPdf,'this.proposalFormPdf');
      // let dialogRef = this.dialog.open(EdelweissposOpt, {
      //   width: '400px'
      // });
      // dialogRef.disableClose = true;
      // dialogRef.afterClosed().subscribe(result => {
      //   if(result) {
      //
      //   }
      //
      // });

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
      this.common.ifscEdelweissDetails(data).subscribe(
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
        // stitle: this.getStepper1.stitle,
        // sfirstName: this.getStepper1.sfirstName,
        // smidName: this.getStepper1.smidName,
        // slastName: this.getStepper1.slastName,
        // sdob: this.datepipe.transform(this.getStepper1.sdob, 'y-MM-dd'),
        // semailId: this.getStepper1.semailId,
        // smobileNo: this.getStepper1.smobileNo,
        // isSmokerSpouse: this.getStepper1.isSmokerSpouse,
        // isStaffSpouse: this.getStepper1.isStaffSpouse,
        // employeeCodeSpouse: this.getStepper1.employeeCodeSpouse,
        // relationSpouseProposer: this.getStepper1.relationSpouseProposer,
        // relationSpouseProposerName: this.getStepper1.relationSpouseProposerName,
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
        ageProofId: this.getStepper2.ageProofId,
        ageProofIdName: this.getStepper2.ageProofIdName,
        highestQualification: this.getStepper2.highestQualification,
        highestQualificationName: this.getStepper2.highestQualificationName,
        otherQualification: this.getStepper2.otherQualification,
        mobileNo: this.getStepper2.mobileNo,
        isStaff: this.getStepper2.isStaff,
        employeeCode: this.getStepper2.employeeCode,
        // stitle: this.getStepper2.stitle,
        // sfirstName: this.getStepper2.sfirstName,
        // smidName: this.getStepper2.smidName,
        // slastName: this.getStepper2.slastName,
        // sdob: this.datepipe.transform(this.getStepper2.sdob, 'y-MM-dd'),
        // semailId: this.getStepper2.semailId,
        // smobileNo: this.getStepper2.smobileNo,
        // isSmokerSpouse: this.getStepper2.isSmokerSpouse,
        // isStaffSpouse: this.getStepper2.isStaffSpouse,
        // employeeCodeSpouse: this.getStepper2.employeeCodeSpouse,
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
        medicalTreatment: this.getStepper2.medicalTreatment,
        medicationDetails: this.getStepper2.medicationDetails,
        receivedTreatment1: this.getStepper2.receivedTreatment1,
        diagnosedDetails: this.getStepper2.diagnosedDetails,
        receivedTreatment2: this.getStepper2.receivedTreatment2,
        aidsDetails: this.getStepper2.aidsDetails,


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
  selector: ' edelweissposopt ',
  template: `
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
          <button mat-button class="secondary-bg-color"  (click)="onNoClick()">Back</button>
          <button mat-button class="secondary-bg-color" (click)="otpEdVal()" >Ok</button>
        </div>
    `
})
export class EdelweissposOpt {
  otpCode: any;
  constructor(
      public dialogRef: MatDialogRef<EdelweissposOpt>,
      @Inject(MAT_DIALOG_DATA) public data: any, public route: ActivatedRoute, public common: CommonService, public validation: ValidationService, public appSettings: AppSettings, private toastr: ToastrService, public config: ConfigurationService, public authservice: AuthService, public termService: TermLifeCommonService) {
    this.otpCode = '';

  }
  // // Number validation
  // numberValidate(event: any) {
  //   this.validation.numberValidate(event);
  // }

  onNoClick(): void {
    this.dialogRef.close(true);
  }

  otpEdVal() {
    let summaryData = JSON.parse(sessionStorage.summaryData);
    summaryData = summaryData;
    console.log(summaryData,'44444444')
    let getEnquiryDetials = JSON.parse(sessionStorage.getEnquiryDetials);
    console.log(getEnquiryDetials,'11111111')
    let enquiryFormData = JSON.parse(sessionStorage.enquiryFormData);
    console.log(enquiryFormData,'22222222')
    let lifePremiumList = JSON.parse(sessionStorage.lifePremiumList);
    console.log(lifePremiumList,'333333333')
    const data = {
      "user_id": this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      "role_id": this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      "pos_status": this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
      "platform": "web",
      "product_id": lifePremiumList.product_id,
      "policy_id": getEnquiryDetials.policy_id,
      "transaction_id": summaryData.receipt_no,
      "otp":this.otpCode
    }
    console.log(data, '999999999');
    this.common.edelweissOtp(data).subscribe(
        (successData) => {
          this.otpValidationListSuccess(successData);
        },
        (error) => {
          this.otpValidationListFailure(error);
        }
    );
  }

  public otpValidationListSuccess(successData) {
    if (successData.IsSuccess) {
      this.toastr.success(successData.ResponseObject);
      this.dialogRef.close(true);
    } else {
      this.toastr.error(successData.ErrorObject);
    }
  }

  public otpValidationListFailure(error) {
  }

  numberValidate(event: any) {
    this.validation.numberValidate(event);
  }
}
