import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {ValidationService} from '../../shared/services/validation.service';
import {DatePipe} from '@angular/common';
import {AuthService} from '../../shared/services/auth.service';
import {BikeInsuranceService} from '../../shared/services/bike-insurance.service';
import {ToastrService} from 'ngx-toastr';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatStepper} from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {AppSettings} from '../../app.settings';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {FourWheelerService} from '../../shared/services/four-wheeler.service';
import {ActivatedRoute} from '@angular/router';
import {PaymentModeValidate} from '../term-life-premium-list/term-life-premium-list.component';
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
  selector: 'app-reliance-fourwheeler-proposal',
  templateUrl: './reliance-fourwheeler-proposal.component.html',
  styleUrls: ['./reliance-fourwheeler-proposal.component.scss'],
  providers: [

    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class RelianceFourwheelerProposalComponent implements OnInit {

  relianceProposal : FormGroup;
  previousInsurance : FormGroup;
  coverDetails : FormGroup;
  riskDetails : FormGroup;
  public titleList: any;
  public proposerData: any;
  public inspReadonly: any;
  public idvCaluculatedValue: any;
  public sicoverValue: any;
  public insuranceidvError: any;
  public roadtaxidvError: any;
  public registrationidvError:any;
  public popupValue: any;
  public summaryData: any;
  public proposerFormData: any;
  public riskFormData: any;
  public proposalId: any;
  public coverFormData: any;
  public previousFormData: any;
  public getStepper1: any;
  public getStepper2: any;
  public getStepper3: any;
  public getStepper4: any;
  public fuelTypeList: any;
  public amountList: any;
  public driverCoveredList: any;
  public tppdList: any;
  public unnamedList: any;
  public relationListData: any;
  public prevInsurerList: any;
  public maritalList: any;
  public webhost : any;
  public bifuelType : any;

  public nationalityList: any;
  public otherSystemNameList: any;
  public bifueltypeList: any;
  public fittngTypeList: any;
  public prevPolicyList: any;
  public occupationList: any;
  public financialTypeList: any;
  public commAddressList: any;
  public perAddressList: any;
  public regAddressList: any;
  public inspectionAddressList: any;
  public checkcomm: boolean;
  public checkperm: boolean;
  public minDate: any;
  public today: any;
  public pcommReadOnly: any;
  public setting: any;
  public declaration : any;
  public PaymentRedirect : any;

  public buyBikeDetails: any;
  public enquiryFormData: any;
  public bikeEnquiryId: any;
  public buyProduct: any;
  public currentStep: any;
  public ProposalId: any;
  public PreviousExpiry: any;
  public coverListValue: any;
  public nil_depreciation: any;
  public basic_od: any;
  public electrical_accessories: any;
  public non_electrical_accessories: any;
  public Anti_theft: any;
  public automobile_association: any;
  public Liability_paid_driver: any;
  public basic_liability: any;
  public pa_unnamed_passenger: any;
  public Bifuel_Kit: any;
  public pa_owner_driver: any;
  public voluntary_deductible: any;
  public showInspection: boolean;
  // public errorRateMsg: any;
  public gstAmount: any;
  public discountAmount: any;
  public electricalSumAount: any;
  public nonElectricalSumAount: any;
  public bifuelChangeList: any;
  public clientTypeField: boolean;
  public bifuelCover: boolean;

  //dob
  proposerAge : any;
  nomineeAge : any;
  npnomineeAge : any;
  showNominee : any;
  npshowNominee : any;
  personalDobError : any;
  previousDateError : any;
  constructor(public fb: FormBuilder ,public appsetting: AppSettings,public config: ConfigurationService,public dialog: MatDialog, public route: ActivatedRoute, public validation: ValidationService ,private toastr: ToastrService, public fourWheelerInsurance: FourWheelerService , public authservice: AuthService , public datepipe: DatePipe) {

    let stepperindex = 0;
    this.nonElectricalSumAount=false
    this.electricalSumAount=false
    this.route.params.forEach((params) => {
      if(params.stepper == true || params.stepper == 'true') {
        stepperindex = 5;
        if (sessionStorage.summaryData != '' && sessionStorage.summaryData != undefined) {
          this.summaryData = JSON.parse(sessionStorage.summaryData);
          // this.ProposalId =   this.summaryData.proposalNo;
          // this.PaymentRedirect =   this.summaryData.PaymentRedirectUrl;
          // this.PolicySisID =   this.summaryData.PolicySisID;
          // this.PaymentReturn =   this.summaryData.PaymentReturn;
          // this.proposerFormData = JSON.parse(sessionStorage.proposerFormData);
          // this.riskFormData = JSON.parse(sessionStorage.riskFormData);
          // this.coverFormData = JSON.parse(sessionStorage.riskFormData);
          // this.previousFormData = JSON.parse(sessionStorage.previousFormData);
          // this.nomineeFormData = JSON.parse(sessionStorage.nomineeFormData);
          sessionStorage.relianceFourwheelerproposalID = this.ProposalId;

          this.proposerFormData = this.relianceProposal.value;
          // this.riskFormData = this.riskDetails.value;
          // this.coverFormData = this.coverDetails.value;
          // this.previousFormData = this.previousInsurance.value;
          // sessionStorage.proposerFormData = JSON.stringify(this.proposerFormData);

        }
      }
    });
    let today = new Date();
    this.today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    this.currentStep = stepperindex;
    this.setting = appsetting.settings;
    this.webhost = this.config.getimgUrl();
    this.showInspection=false;
    // this.errorRateMsg=false;
    this.clientTypeField=false;
    this.bifuelCover=false;
    this.proposerAge='';



    this.relianceProposal = this.fb.group({
      clientType : ['' , Validators.required],
      corporateName : ['' , Validators.required],
      firstName : ['' ],
      lastName : [''],
      middleName : [''],
      dob : ['' , Validators.required],
      title : [''],
      occupation : ['' , Validators.required],
      maritalStatus : [''],
      nationality : [''],
      titleValue : [''],
      address : ['' , Validators.required],
      paddress : ['' , Validators.required],
      raddress : ['' , Validators.required],
      address2 : ['' , Validators.required],
      paddress2 : ['' , Validators.required],
      raddress2 : ['' , Validators.required],
      pincode : ['' , Validators.required],
      ppincode : ['' , Validators.required],
      rpincode : ['' , Validators.required],
      state : ['' , Validators.required],
      stateId : ['' ],
      pstate : ['' , Validators.required],
      pstateId : ['' ],
      rstate : ['' , Validators.required],
      rstateId : ['' ],
      city : ['' , Validators.required],
      cityId : [''],
      pcity : ['' , Validators.required],
      pcityId : [''],
      rcity : ['' , Validators.required],
      rcityId : [''],
      district : ['' , Validators.required],
      districtId : [''],
      pdistrict : ['' , Validators.required],
      pdistrictId : [''],
      rdistrict : ['' , Validators.required],
      rdistrictId : [''],
      landmark : [''],
      plandmark : [''],
      rlandmark : [''],
      address3 : [''],
      paddress3 : [''],
      raddress3 : [''],
      alternateContact : [''],
      // gstNumber : [''],
      sameAsAddress : [''],
      regSameAscommAddress : [''],
      inspSameAscommAddress : [''],
      regSameAspermAddress : [''],
      occupationValue : [''],
      maritalStatusValue : [''],
      nationalityValue : [''],
      gender : ['' , Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],

      mobile: ['', Validators.compose([Validators.pattern('[6789][0-9]{9}')])],

      iaddress: [''],
      iaddress2: [''],
      iaddress3: [''],
      ipincode: [''],
      istate: [''],
      istateId: [''],
      idistrict: [''],
      idistrictId: [''],
      ilandmark: [''],
      icountry: [''],
      icity: [''],
      icityId: [''],
    });

    this.previousInsurance = this.fb.group({
      prevInsurance : ['',Validators.required],
      prevYearPolicyType : ['',Validators.required],
      policyNumber : ['',Validators.required],
      // prevPolStartDate : ['',Validators.required],
      // prevPolSold : ['',Validators.required],
      prevInsurerAddress: ['',Validators.required],
      prevInsuranceValue: [''],
      inspectionId: [''],
      inspectionDone: [''],
      inspectionDate: [''],
      prevYearPolicyTypeValue: [''],
    });

    this.coverDetails = this.fb.group({
      UnnamedPassengerCovered: [''],
      AutomobileAssociationMember: [''],
      AntiTheftDeviceFitted: [''],
      // InsurancePremium: [''],
      PAToOwnerDriverCoverd: [''],
      PAToOwnerDriverCoverdSi: [''],
      NilDepreciationCoverage: [''],
      // applicableRate: [''],
      LiabilityToPaidDriverCovered: [''],
      // TPPDCover: [''],
      // TPPDCoverSi: [''],
      fuelType: [''],
      BasicODCoverage: ['',Validators.required],
      BasicLiability: ['',Validators.required],
      nrelationValue: [''],
      fuelTypeValue: [''],
      nOtherRelationValue: [''],
      PACoverToOwner: [''],
      totalUnnamedPassengerPremium: [''],
      totalOwnerDriverPremium: [''],
      totalDepreciationPremium: [''],
      totalVoluntaryDeductablePremium: [''],
      totalElectricalItemPremium: [''],
      totalNonElectricalItemPremium: [''],
      // PAToNamedPassenger: [''],
      NoOfUnnamedPassenegersCovered: [''],
      IsVoluntaryDeductableOpted: [''],
      VoluntaryDeductableAmount: [''],
      IsElectricalItemFitted: [''],
      IsNonElectricalItemFitted: [''],
      ElectricalItemsTotalSI: [''],
      NonElectricalItemsTotalSI: [''],
      BiFuelKitSi: [''],
      bifueltype: [''],
      cpgLpgKit: '',
      fittngType: [''],
      IsBiFuelKit: [''],
      bifuelAmount: [''],
      // IsTotalCover: [''],
      IsRegistrationCover: [''],
      // IsPAToDriverCovered: [''],
      // IsPAToDriverCoveredSi: [''],
      IsRoadTaxcover: [''],
      UnnamedPassengersSI: [''],
      cappointeeName: [''],
      cnomineeName: [''],
      cnDob: [''],
      nrelation: [''],
      nOtherRelation: [''],
      cnAddress: [''],
      // npappointeeName: [''],
      // npnomineeName: [''],
      // npDob: [''],
      // nprelation: [''],
      // nprelationValue: [''],
      // npOtherRelation: [''],
      // npOtherRelationValue: [''],
      npAddress: [''],
      namedPassengersSI: [''],
      nppassengerName: [''],
      registrationSI: [''],
      roadtaxSI: [''],
      insuranceSI: [''],
      InsurancePremium: [''],
      inspectionNo: [''],
      totalLiabilityToPaidDriverPremium: [''],
      totalAssociationPremium: [''],
      totalAntiTheftDeviceFittedPremium: [''],
      totalBasicODCoveragePremium: [''],
      totalBasicLiabilityPremium: [''],

    });

    this.riskDetails = this.fb.group({
          // AgentName: [''],
          OtherSystemName: ['', Validators.required],
          IDV: ['', Validators.required],
          FinancierName: [''],
          FinanceType: [''],
          FinanceTypeValue: [''],
          FinancierAddress: [''],
          IsVehicleHypothicated: [''],
          OtherSystemNameValue: [''],

        }
    );
    this.nationalityList = {
      '1949': 'Indian',
      '1950': 'others',
    };

    this.otherSystemNameList = {
      '0': 'Customer',
      '1': 'Agent',
    }
    this.bifueltypeList = {
      '0': 'CNG',
      '1': 'LPG',
    }

    this.fittngTypeList ={
      '0': 'Inbuilt',
      '1':'External',
    }

  }

  ngOnInit() {

    this.buyBikeDetails = JSON.parse(sessionStorage.buyFourwheelerProductDetails);
    console.log(this.buyBikeDetails,'bikedetails');
    // this.enquiryFormData = JSON.parse(sessionStorage.enquiryFormData);

    this.bikeEnquiryId = sessionStorage.fwEnquiryId;

    this.buyProduct = JSON.parse(sessionStorage.carListDetails);
    // this.bikeEnquiryId = sessionStorage.bikeEnquiryId;
    // this.enquiryFormData = JSON.parse(sessionStorage.enquiryFormData);
    // this.productDetails = JSON.parse(sessionStorage.buyProductDetails);

    this.changeGender();
    this.occupation();
    this.fueltype();
    this.prevInsurer();
    this.prevPolicy();
    this.session();
    this.maritalStatus();
    this.relationList();
    this.getFinancialType();
    this.voluntaryAmount();
    this.unnamedSi();
    this.getPaidDriverSi();
    this.getTppdSi();
    // this.getCover();
    // this.getBifuelChange();
    // this.coverDetails.controls['fuelType'].patchValue(this.bifuelChangeList)

  }
  clientTypeReq(){
    if(this.relianceProposal.controls['clientType'].value == 0) {
      this.clientTypeField = true;
    }else{
      this.clientTypeField = false;
    }

  }
  clientReqField(){
    if(this.relianceProposal.controls['clientType'].value == 0) {
      this.relianceProposal.controls['title'].setValidators([Validators.required]);
      this.relianceProposal.controls['firstName'].setValidators([Validators.required]);
      this.relianceProposal.controls['middleName'].setValidators(null);
      this.relianceProposal.controls['lastName'].setValidators([Validators.required]);
      this.relianceProposal.controls['gender'].setValidators([Validators.required]);
      this.relianceProposal.controls['dob'].setValidators([Validators.required]);
      this.relianceProposal.controls['occupation'].setValidators([Validators.required]);
      this.relianceProposal.controls['maritalStatus'].setValidators(null);

      this.relianceProposal.controls['corporateName'].patchValue('');
      this.relianceProposal.controls['corporateName'].setValidators(null);
    }else if(this.relianceProposal.controls['clientType'].value == 1){

      this.relianceProposal.controls['corporateName'].setValidators([Validators.required]);


          this.relianceProposal.controls['title'].patchValue('');
          this.relianceProposal.controls['title'].setValidators(null);

          this.relianceProposal.controls['firstName'].patchValue('');
          this.relianceProposal.controls['firstName'].setValidators(null);

          this.relianceProposal.controls['middleName'].patchValue('');
          this.relianceProposal.controls['middleName'].setValidators(null);

          this.relianceProposal.controls['lastName'].patchValue('');
          this.relianceProposal.controls['lastName'].setValidators(null);

          this.relianceProposal.controls['gender'].patchValue('');
          this.relianceProposal.controls['gender'].setValidators(null);

          this.relianceProposal.controls['dob'].patchValue('');
          this.relianceProposal.controls['dob'].setValidators(null);

          this.relianceProposal.controls['occupation'].patchValue('');
          this.relianceProposal.controls['occupation'].setValidators(null);

          this.relianceProposal.controls['maritalStatus'].patchValue('');
          this.relianceProposal.controls['maritalStatus'].setValidators(null);
          this.proposerAge='';

      this.coverDetails.controls['PAToOwnerDriverCoverd'].patchValue(false);
      this.updateMandatory();

    }

      this.relianceProposal.controls['corporateName'].updateValueAndValidity();
      this.relianceProposal.controls['title'].updateValueAndValidity();
      this.relianceProposal.controls['firstName'].updateValueAndValidity();
      this.relianceProposal.controls['middleName'].updateValueAndValidity();
      this.relianceProposal.controls['lastName'].updateValueAndValidity();
      this.relianceProposal.controls['gender'].updateValueAndValidity();
      this.relianceProposal.controls['dob'].updateValueAndValidity();
      this.relianceProposal.controls['occupation'].updateValueAndValidity();
      this.relianceProposal.controls['maritalStatus'].updateValueAndValidity();

  }


  // clientTypeReq(){
  //   if(this.relianceProposal.controls['clientType'].value == 0){
  //     this.clientTypeField=true;
  //     this.relianceProposal.controls['corporateName'].patchValue('');
  //     this.relianceProposal.controls['corporateName'].setValidators(null);
  //
  //     this.relianceProposal.controls['title'].setValidators([Validators.required]);
  //     this.relianceProposal.controls['firstName'].setValidators([Validators.required]);
  //     this.relianceProposal.controls['middleName'].setValidators(null);
  //     this.relianceProposal.controls['lastName'].setValidators([Validators.required]);
  //     this.relianceProposal.controls['gender'].setValidators([Validators.required]);
  //     this.relianceProposal.controls['dob'].setValidators([Validators.required]);
  //     this.relianceProposal.controls['occupation'].setValidators([Validators.required]);
  //     this.relianceProposal.controls['maritalStatus'].setValidators(null);
  //   }else if(this.relianceProposal.controls['clientType'].value == 1) {
  //     this.clientTypeField=false;
  //     this.relianceProposal.controls['corporateName'].setValidators([Validators.required]);
  //
  //     this.coverDetails.controls['PAToOwnerDriverCoverd'].patchValue(false);
  //    this.updateMandatory();
  //     // this.coverDetails.controls['PAToOwnerDriverCoverd'].setValidators(null);
  //     // this.coverDetails.controls['cappointeeName'].patchValue('');
  //     // this.coverDetails.controls['cappointeeName'].setValidators(null);
  //     // this.coverDetails.controls['cnomineeName'].patchValue('');
  //     // this.coverDetails.controls['cnomineeName'].setValidators(null);
  //     // this.coverDetails.controls['cnDob'].patchValue('');
  //     // this.coverDetails.controls['cnDob'].setValidators(null);
  //     // this.coverDetails.controls['nrelation'].patchValue('');
  //     // this.coverDetails.controls['nrelation'].setValidators(null);
  //     // this.coverDetails.controls['cnAddress'].patchValue('');
  //     // this.coverDetails.controls['cnAddress'].setValidators(null);
  //     // this.coverDetails.controls['nOtherRelation'].patchValue('');
  //     // this.coverDetails.controls['nOtherRelation'].setValidators(null);
  //     // this.coverDetails.controls['nrelationValue'].patchValue('');
  //     // this.coverDetails.controls['nrelationValue'].setValidators(null);
  //     // this.coverDetails.controls['totalOwnerDriverPremium'].patchValue('');
  //     // this.coverDetails.controls['totalOwnerDriverPremium'].setValidators(null);
  //
  //     this.relianceProposal.controls['title'].patchValue('');
  //     this.relianceProposal.controls['title'].setValidators(null);
  //
  //     this.relianceProposal.controls['firstName'].patchValue('');
  //     this.relianceProposal.controls['firstName'].setValidators(null);
  //
  //     this.relianceProposal.controls['middleName'].patchValue('');
  //     this.relianceProposal.controls['middleName'].setValidators(null);
  //
  //     this.relianceProposal.controls['lastName'].patchValue('');
  //     this.relianceProposal.controls['lastName'].setValidators(null);
  //
  //     this.relianceProposal.controls['gender'].patchValue('');
  //     this.relianceProposal.controls['gender'].setValidators(null);
  //
  //     this.relianceProposal.controls['dob'].patchValue('');
  //     this.relianceProposal.controls['dob'].setValidators(null);
  //
  //     this.relianceProposal.controls['occupation'].patchValue('');
  //     this.relianceProposal.controls['occupation'].setValidators(null);
  //
  //     this.relianceProposal.controls['maritalStatus'].patchValue('');
  //     this.relianceProposal.controls['maritalStatus'].setValidators(null);
  //     this.proposerAge='';
  //   }
  //
  //   this.relianceProposal.controls['corporateName'].updateValueAndValidity();
  //   this.relianceProposal.controls['title'].updateValueAndValidity();
  //   this.relianceProposal.controls['firstName'].updateValueAndValidity();
  //   this.relianceProposal.controls['middleName'].updateValueAndValidity();
  //   this.relianceProposal.controls['lastName'].updateValueAndValidity();
  //   this.relianceProposal.controls['gender'].updateValueAndValidity();
  //   this.relianceProposal.controls['dob'].updateValueAndValidity();
  //   this.relianceProposal.controls['occupation'].updateValueAndValidity();
  //   this.relianceProposal.controls['maritalStatus'].updateValueAndValidity();
  // }
  /////////////

  idvCalculateDetails(value,type) {
    console.log(value,'sdfsdf');
    let valid = 25 / 100;
    this.idvCaluculatedValue = valid * this.buyBikeDetails.Idv;
    this.sicoverValue = this.idvCaluculatedValue /3;
    console.log(this.sicoverValue,'value');

    if (type == 'insurance'){
      if (value < this.sicoverValue) {
        this.insuranceidvError = '';
      }else{
        this.insuranceidvError = 'Given SI Amount should be less than ' + this.sicoverValue;
      }
    }

    if (type == 'roadtax') {
      if (value < this.sicoverValue) {
        this.roadtaxidvError = '';
      } else {
        this.roadtaxidvError = 'Given SI Amount should be less than ' + this.sicoverValue;
      }
    }

    if (type == 'registration') {
      if (value < this.sicoverValue) {
        this.registrationidvError = '';
      }else{

        this.registrationidvError = 'Given SI Amount should be less than ' + this.sicoverValue;
      }
    }

    if (type == 'popupValue'){
      if (value < this.sicoverValue) {
        this.popupValue = true;
      }else{
        this.popupValue = false;
      }
    }

  }


  changeOccupation(){
    this.relianceProposal.controls['occupationValue'].patchValue(this.occupationList[this.relianceProposal.controls['occupation'].value]);
  }

  changeMarital(){
    this.relianceProposal.controls['maritalStatusValue'].patchValue(this.maritalList[this.relianceProposal.controls['maritalStatus'].value]);

  }
  changeNationality(){
    this.relianceProposal.controls['nationalityValue'].patchValue(this.nationalityList[this.relianceProposal.controls['nationality'].value]);

  }
  changeOtherSystem(){
    console.log(this.otherSystemNameList,'list');
    console.log(this.riskDetails.controls['OtherSystemName'].value)
    this.riskDetails.controls['OtherSystemNameValue'].patchValue(this.otherSystemNameList[this.riskDetails.controls['OtherSystemName'].value]);
    console.log(this.riskDetails.controls['OtherSystemNameValue'],'valllllll')
  }

  changeFinancialType(){
    this.riskDetails.controls['FinanceTypeValue'].patchValue(this.financialTypeList[this.riskDetails.controls['FinanceType'].value]);

  }
  changenRelation(){
    this.coverDetails.controls['nrelationValue'].patchValue(this.relationListData[this.coverDetails.controls['nrelation'].value]);
  }
  changenOtherRelation(){
    this.coverDetails.controls['nOtherRelationValue'].patchValue(this.relationListData[this.coverDetails.controls['nOtherRelation'].value]);
  }
  changeTitle(){
    this.relianceProposal.controls['titleValue'].patchValue(this.titleList[this.relianceProposal.controls['title'].value]);
    console.log(this.relianceProposal.controls['titleValue'],'valueee');
  }
  changenpOtherRelation(){
    this.coverDetails.controls['npOtherRelationValue'].patchValue(this.relationListData[this.coverDetails.controls['npOtherRelation'].value]);
  }

  changenpRelation(){
    this.coverDetails.controls['nprelationValue'].patchValue(this.relationListData[this.coverDetails.controls['nprelation'].value]);
  }


  // changeFuel() {
  //   this.coverDetails.controls['fuelTypeValue'].patchValue(this.fuelTypeList[this.coverDetails.controls['fuelType'].value]);
  //   console.log(this.coverDetails.controls['fuelType'].value);
  //   console.log(this.coverDetails.controls['fuelTypeValue'].value);
  // }
  // changeFuelType(){
  //   if(this.coverDetails.controls['fuelType'].value == 5){
  //     alert('inn')
  //     this.coverDetails.controls['IsBiFuelKit'].setValidators([Validators.required]);
  //
  //     //   this.coverDetails.controls['IsBiFuelKit'].patchValue(true);
  //     // this.coverDetails.controls['cpgLpgKit'].patchValue(this.coverDetails.controls['cpgLpgKit'].value);
  //     //   //
  //     //   this.coverDetails.controls['BiFuelKitSi'].patchValue( this.coverDetails.controls['BiFuelKitSi'].value);
  //     // this.coverDetails.controls['BiFuelKitSi'].updateValueAndValidity();
  //     // this.coverDetails.controls['bifueltype'].setValidators([Validators.required]);
  //       // this.coverDetails.controls['bifueltype'].updateValueAndValidity();
  //     }else if(this.coverDetails.controls['fuelType'].value != 5){
  //     alert(this.coverDetails.controls['IsBiFuelKit'].value)
  //     this.coverDetails.controls['IsBiFuelKit'].setValidators(null);
  //     this.coverDetails.controls['IsBiFuelKit'].patchValue(false);
  //       alert(this.coverDetails.controls['IsBiFuelKit'].value)
  //     // this.coverDetails.controls['IsBiFuelKit'].patchValue('');
  //     // this.coverDetails.controls['cpgLpgKit'].patchValue(this.coverDetails.controls['cpgLpgKit'].value);
  //
  //
  //     // this.coverDetails.controls['IsBiFuelKit'].patchValue('');
  //     // this.coverDetails.controls['BiFuelKitSi'].patchValue('');
  //     //   this.coverDetails.controls['BiFuelKitSi'].setValidators(null);
  //     // this.coverDetails.controls['bifueltype'].patchValue('');
  //     // this.coverDetails.controls['bifueltype'].setValidators(null);
  //     // this.coverDetails.controls['cpgLpgKit'].patchValue('');
  //     // this.coverDetails.controls['cpgLpgKit'].setValidators(null);
  //     // this.coverDetails.controls['fittngType'].patchValue('');
  //     // this.coverDetails.controls['fittngType'].setValidators(null);
  //     // this.coverDetails.controls['bifuelAmount'].patchValue('');
  //     // this.coverDetails.controls['bifuelAmount'].setValidators(null);
  //       // this.coverDetails.controls['BiFuelKitSi'].updateValueAndValidity();
  //
  //
  //       // this.coverDetails.controls['bifueltype'].updateValueAndValidity();
  //     }
  //   this.coverDetails.controls['IsBiFuelKit'].updateValueAndValidity();
  //   // this.coverDetails.controls['BiFuelKitSi'].updateValueAndValidity();
  //   // this.coverDetails.controls['bifueltype'].updateValueAndValidity();
  //   // this.coverDetails.controls['cpgLpgKit'].updateValueAndValidity();
  // }
  changeInsurer(){
    this.previousInsurance.controls['prevInsuranceValue'].patchValue(this.prevInsurerList[this.previousInsurance.controls['prevInsurance'].value]);
  }

  changePrevYear(){
    this.previousInsurance.controls['prevYearPolicyTypeValue'].patchValue(this.prevPolicyList[this.previousInsurance.controls['prevYearPolicyType'].value]);
  }

  inspectionShow() {
    this.PreviousExpiry=this.buyProduct.previous_policy_expiry_date;
    let inspectionDate = moment(this.PreviousExpiry,'YYYY/MM/DD');
    console.log(inspectionDate,'previous date.....');
    // let today = new Date();
    let todayDate = moment(new Date(), 'YYYY/MM/DD');
    console.log(todayDate,'start date.....');
    let inspectionCount = todayDate.diff(inspectionDate, 'days');
    console.log(inspectionCount, 'daysdays');
    if(inspectionCount > 90){
      // alert('inn');
      this.showInspection=true;
    }else{
      this.showInspection=false;
      // alert('out...');
    }
    // return days;

  }

  // inspectionShow(){
  //   this.PreviousExpiry=this.buyProduct.previous_policy_expiry_date;
  //   console.log(this.PreviousExpiry,'PreviousExpiry....');
  //   let today = new Date();
  //   console.log(today,'today...');
  //   let inspectionDate = new Date(this.PreviousExpiry);
  //   console.log(inspectionDate,'inspectionDate.....');
  //   let yrs = today.getFullYear() - inspectionDate.getFullYear();
  //   console.log(yrs,'yrs......');
  //   let months = today.getMonth() - inspectionDate.getMonth();
  //   console.log(months,'months.....');
  //   let inspectionCount = today.getDate() - inspectionDate.getDate();
  //   console.log(inspectionCount,'inspectionCount....');
  //   if(inspectionCount>90){
  //     alert('inn');
  //     this.showInspection=true;
  //   }else{
  //     this.showInspection=false;
  //     alert('out...');
  //   }
  //
  //
  // }

  // //change gender details
  // titleChangeGender() {
  //   if (this.relianceProposal.controls['title'].value == 'Mr') {
  //     this.relianceProposal.controls['gender'].patchValue('Male');
  //   } else if ( this.relianceProposal.controls['title'].value == 'Mrs') {
  //     this.relianceProposal.controls['gender'].patchValue('Female');
  //   }else{
  //     this.relianceProposal.controls['gender'].patchValue('Female');
  //   }
  // }

  updateMandatoryHypothicated(event){
    if( event.checked){
      this.riskDetails.controls['IsVehicleHypothicated'].patchValue(true);
      this.riskDetails.controls['FinanceType'].setValidators([Validators.required]);
      this.riskDetails.controls['FinanceType'].updateValueAndValidity();

      this.riskDetails.controls['FinancierName'].setValidators([Validators.required]);
      this.riskDetails.controls['FinancierName'].updateValueAndValidity();

      this.riskDetails.controls['FinancierAddress'].setValidators([Validators.required]);
      this.riskDetails.controls['FinancierAddress'].updateValueAndValidity();
    }else {

      this.riskDetails.controls['IsVehicleHypothicated'].patchValue(false);

      this.riskDetails.controls['FinanceType'].patchValue('');
      this.riskDetails.controls['FinanceType'].setValidators(null);
      this.riskDetails.controls['FinanceType'].updateValueAndValidity();

      this.riskDetails.controls['FinancierName'].patchValue('');
      this.riskDetails.controls['FinancierName'].setValidators(null);
      this.riskDetails.controls['FinancierName'].updateValueAndValidity();

      this.riskDetails.controls['FinancierAddress'].patchValue('');
      this.riskDetails.controls['FinancierAddress'].setValidators(null);
      this.riskDetails.controls['FinancierAddress'].updateValueAndValidity();
    }

  }
  updateMandatory() {
    if (this.coverDetails.controls['PAToOwnerDriverCoverd'].value==true) {
      // this.coverDetails.controls['PAToOwnerDriverCoverd'].patchValue(true);

      this.coverDetails.controls['cnomineeName'].setValidators([Validators.required]);
      this.coverDetails.controls['cnDob'].setValidators([Validators.required]);
      this.coverDetails.controls['nrelation'].setValidators([Validators.required]);
      this.coverDetails.controls['cnAddress'].setValidators([Validators.required]);
      this.coverDetails.controls['nOtherRelation'].setValidators([Validators.required]);

      this.coverDetails.controls['totalOwnerDriverPremium'].setValidators([Validators.required]);
      this.getCover();

    } else if(this.coverDetails.controls['PAToOwnerDriverCoverd'].value==false) {
      // this.coverDetails.controls['PAToOwnerDriverCoverd'].patchValue(false);

      this.coverDetails.controls['cappointeeName'].patchValue('');
      this.coverDetails.controls['cappointeeName'].setValidators(null);

      this.coverDetails.controls['cnomineeName'].patchValue('');
      this.coverDetails.controls['cnomineeName'].setValidators(null);

      this.coverDetails.controls['cnDob'].patchValue('');
      this.coverDetails.controls['cnDob'].setValidators(null);

      this.coverDetails.controls['nrelation'].patchValue('');
      this.coverDetails.controls['nrelation'].setValidators(null);

      this.coverDetails.controls['cnAddress'].patchValue('');
      this.coverDetails.controls['cnAddress'].setValidators(null);

      this.coverDetails.controls['nOtherRelation'].patchValue('');
      this.coverDetails.controls['nOtherRelation'].setValidators(null);

      this.coverDetails.controls['totalOwnerDriverPremium'].patchValue('');
      this.coverDetails.controls['totalOwnerDriverPremium'].setValidators(null);
    }
    this.coverDetails.controls['cnomineeName'].updateValueAndValidity();
    this.coverDetails.controls['cappointeeName'].updateValueAndValidity();
    this.coverDetails.controls['cnDob'].updateValueAndValidity();
    this.coverDetails.controls['nrelation'].updateValueAndValidity();
    this.coverDetails.controls['cnAddress'].updateValueAndValidity();
    this.coverDetails.controls['nOtherRelation'].updateValueAndValidity();
    this.coverDetails.controls['totalOwnerDriverPremium'].updateValueAndValidity();
  }
changeOwnerDriver(){

    this.coverDetails.controls['totalOwnerDriverPremium'].patchValue(this.pa_owner_driver);

}

  //
  // updatenpMandatory(event) {
  //   if (event.checked) {
  //     this.coverDetails.controls['PAToNamedPassenger'].patchValue(true);
  //
  //     //
  //     this.coverDetails.controls['namedPassengersSI'].setValidators([Validators.required]);
  //     this.coverDetails.controls['namedPassengersSI'].updateValueAndValidity();
  //
  //     this.coverDetails.controls['nppassengerName'].setValidators([Validators.required]);
  //     this.coverDetails.controls['nppassengerName'].updateValueAndValidity();
  //
  //     this.coverDetails.controls['npnomineeName'].setValidators([Validators.required]);
  //     this.coverDetails.controls['npnomineeName'].updateValueAndValidity();
  //     //
  //     this.coverDetails.controls['npDob'].setValidators([Validators.required]);
  //     this.coverDetails.controls['npDob'].updateValueAndValidity();
  //     //
  //     this.coverDetails.controls['nprelation'].setValidators([Validators.required]);
  //     this.coverDetails.controls['nprelation'].updateValueAndValidity();
  //     ///
  //     this.coverDetails.controls['npAddress'].setValidators([Validators.required]);
  //     this.coverDetails.controls['npAddress'].updateValueAndValidity();
  //     //
  //
  //   } else {
  //     this.coverDetails.controls['PAToNamedPassenger'].patchValue(false);
  //
  //
  //     this.coverDetails.controls['namedPassengersSI'].patchValue('');
  //     this.coverDetails.controls['namedPassengersSI'].setValidators(null);
  //     this.coverDetails.controls['namedPassengersSI'].updateValueAndValidity()
  //
  //     this.coverDetails.controls['nppassengerName'].patchValue('');
  //     this.coverDetails.controls['nppassengerName'].setValidators(null);
  //     this.coverDetails.controls['nppassengerName'].updateValueAndValidity()
  //
  //
  //     this.coverDetails.controls['npappointeeName'].patchValue('');
  //     this.coverDetails.controls['npappointeeName'].setValidators(null);
  //     this.coverDetails.controls['npappointeeName'].updateValueAndValidity();
  //
  //     //
  //     this.coverDetails.controls['npnomineeName'].patchValue('');
  //     this.coverDetails.controls['npnomineeName'].setValidators(null);
  //     this.coverDetails.controls['npnomineeName'].updateValueAndValidity();
  //     //
  //     this.coverDetails.controls['npDob'].patchValue('');
  //     this.coverDetails.controls['npDob'].setValidators(null);
  //     this.coverDetails.controls['npDob'].updateValueAndValidity();
  //     //
  //     this.coverDetails.controls['nprelation'].patchValue('');
  //     this.coverDetails.controls['nprelation'].setValidators(null);
  //     this.coverDetails.controls['nprelation'].updateValueAndValidity();
  //     //
  //     this.coverDetails.controls['npAddress'].patchValue('');
  //     this.coverDetails.controls['npAddress'].setValidators(null);
  //     this.coverDetails.controls['npAddress'].updateValueAndValidity();
  //     //
  //     this.coverDetails.controls['npOtherRelation'].patchValue('');
  //     this.coverDetails.controls['npOtherRelation'].setValidators(null);
  //     this.coverDetails.controls['npOtherRelation'].updateValueAndValidity();
  //   }
  // }


  updateUnnamedPassenger(event){
    if (this.coverDetails.controls['UnnamedPassengerCovered'].value==true) {
      // this.coverDetails.controls['UnnamedPassengerCovered'].patchValue(true);

      //
      // this.coverDetails.controls['UnnamedPassengersSI'].patchValue('100000');

      this.coverDetails.controls['UnnamedPassengersSI'].setValidators([Validators.required]);

      // this.coverDetails.controls['NoOfUnnamedPassenegersCovered'].patchValue('');
      this.coverDetails.controls['NoOfUnnamedPassenegersCovered'].setValidators([Validators.required]);



    }else{
      // this.coverDetails.controls['UnnamedPassengerCovered'].patchValue(false);


      this.coverDetails.controls['UnnamedPassengersSI'].patchValue('');
      this.coverDetails.controls['UnnamedPassengersSI'].setValidators(null);

      this.coverDetails.controls['NoOfUnnamedPassenegersCovered'].patchValue('');
      this.coverDetails.controls['NoOfUnnamedPassenegersCovered'].setValidators(null);

    }
    this.coverDetails.controls['UnnamedPassengersSI'].updateValueAndValidity();
    this.coverDetails.controls['NoOfUnnamedPassenegersCovered'].updateValueAndValidity();

  }

  updateVoluntary(){
    if(this.coverDetails.controls['IsVoluntaryDeductableOpted'].value == true){

      this.coverDetails.controls['VoluntaryDeductableAmount'].setValidators([Validators.required]);
      this.coverDetails.controls['totalVoluntaryDeductablePremium'].setValidators([Validators.required]);

    }else {
      this.coverDetails.controls['VoluntaryDeductableAmount'].patchValue('');
      this.coverDetails.controls['VoluntaryDeductableAmount'].setValidators(null);
      this.coverDetails.controls['totalVoluntaryDeductablePremium'].patchValue('');
      this.coverDetails.controls['totalVoluntaryDeductablePremium'].setValidators(null);
    }
    this.coverDetails.controls['VoluntaryDeductableAmount'].updateValueAndValidity();
    this.coverDetails.controls['totalVoluntaryDeductablePremium'].updateValueAndValidity();

  }
  changeVoluntary(){
          this.coverDetails.controls['totalVoluntaryDeductablePremium'].patchValue(this.voluntary_deductible);


  }
  //
  updateOwnerDriverSi(event){
    if(this.coverDetails.controls['PAToOwnerDriverCoverd'].value==true){
      // this.coverDetails.controls['PAToOwnerDriverCoverd'].patchValue(true);
      this.coverDetails.controls['PAToOwnerDriverCoverdSi'].patchValue('1500000');
      this.coverDetails.controls['PAToOwnerDriverCoverdSi'].setValidators([Validators.required]);
    }else {
      // this.coverDetails.controls['PAToOwnerDriverCoverd'].patchValue(false);
      this.coverDetails.controls['PAToOwnerDriverCoverdSi'].patchValue('');
      this.coverDetails.controls['PAToOwnerDriverCoverdSi'].setValidators(null);
    }
    this.coverDetails.controls['PAToOwnerDriverCoverdSi'].updateValueAndValidity();

  }

  updateNildeprecition(event){
    if(event.checked){
      this.coverDetails.controls['NilDepreciationCoverage'].patchValue(true);

      // this.coverDetails.controls['applicableRate'].patchValue( this.coverDetails.controls['applicableRate'].value);
      // this.coverDetails.controls['applicableRate'].setValidators([Validators.required]);
      this.coverDetails.controls['totalDepreciationPremium'].setValidators([Validators.required]);
      this.getCover();
    }else {
      this.coverDetails.controls['NilDepreciationCoverage'].patchValue(false);


      // this.coverDetails.controls['applicableRate'].patchValue('');
      // this.coverDetails.controls['applicableRate'].setValidators(null);
      this.coverDetails.controls['totalDepreciationPremium'].patchValue('');
      this.coverDetails.controls['totalDepreciationPremium'].setValidators(null);
    }
    // this.coverDetails.controls['applicableRate'].updateValueAndValidity();
    this.coverDetails.controls['totalDepreciationPremium'].updateValueAndValidity();

  }

  changeDepreciation(){

          this.coverDetails.controls['totalDepreciationPremium'].patchValue(this.nil_depreciation);


  }

  updateBasicODCoverage(){
    if(this.coverDetails.controls.BasicODCoverage.value == true){
      //
      this.coverDetails.controls['totalBasicODCoveragePremium'].patchValue( this.coverDetails.controls['totalBasicODCoveragePremium'].value);
      this.coverDetails.controls['totalBasicODCoveragePremium'].setValidators([Validators.required]);
      this.getCover();
    }else {

      this.coverDetails.controls['totalBasicODCoveragePremium'].patchValue('');
      this.coverDetails.controls['totalBasicODCoveragePremium'].setValidators(null);
    }
    this.coverDetails.controls['totalBasicODCoveragePremium'].updateValueAndValidity();

  }
  changeBasicODCoverage(){

    this.coverDetails.controls['totalBasicODCoveragePremium'].patchValue(this.basic_od);


  }

  updateAntiTheftCoverage(){
    if(this.coverDetails.controls.AntiTheftDeviceFitted.value == true){
      //
      this.coverDetails.controls['totalAntiTheftDeviceFittedPremium'].patchValue( this.coverDetails.controls['totalAntiTheftDeviceFittedPremium'].value);
      this.coverDetails.controls['totalAntiTheftDeviceFittedPremium'].setValidators([Validators.required]);
      this.getCover();
    }else {

      this.coverDetails.controls['totalAntiTheftDeviceFittedPremium'].patchValue('');
      this.coverDetails.controls['totalAntiTheftDeviceFittedPremium'].setValidators(null);
    }
    this.coverDetails.controls['totalAntiTheftDeviceFittedPremium'].updateValueAndValidity();

  }
  changeAntiTheftCoverage(){

    this.coverDetails.controls['totalAntiTheftDeviceFittedPremium'].patchValue(this.Anti_theft);


  }

  updateAssociationCoverage(){
    if(this.coverDetails.controls.AutomobileAssociationMember.value == true){
      //
      this.coverDetails.controls['totalAssociationPremium'].patchValue( this.coverDetails.controls['totalAssociationPremium'].value);
      this.coverDetails.controls['totalAssociationPremium'].setValidators([Validators.required]);
      this.getCover();
    }else {

      this.coverDetails.controls['totalAssociationPremium'].patchValue('');
      this.coverDetails.controls['totalAssociationPremium'].setValidators(null);
    }
    this.coverDetails.controls['totalAssociationPremium'].updateValueAndValidity();

  }
  changeAssociationCoverage(){

    this.coverDetails.controls['totalAssociationPremium'].patchValue(this.automobile_association);


  }

  updateLiabilityToPaidCoverage(){
    if(this.coverDetails.controls.LiabilityToPaidDriverCovered.value == true){
      //
      this.coverDetails.controls['totalLiabilityToPaidDriverPremium'].patchValue( this.coverDetails.controls['totalLiabilityToPaidDriverPremium'].value);
      this.coverDetails.controls['totalLiabilityToPaidDriverPremium'].setValidators([Validators.required]);
      this.getCover();
    }else {

      this.coverDetails.controls['totalLiabilityToPaidDriverPremium'].patchValue('');
      this.coverDetails.controls['totalLiabilityToPaidDriverPremium'].setValidators(null);
    }
    this.coverDetails.controls['totalLiabilityToPaidDriverPremium'].updateValueAndValidity();

  }
  changeLiabilityToPaidCoverage(){

    this.coverDetails.controls['totalLiabilityToPaidDriverPremium'].patchValue(this.Liability_paid_driver);


  }

  updateBasicLiabilityCoverage(){
    if(this.coverDetails.controls.BasicLiability.value == true){
      //
      this.coverDetails.controls['totalBasicLiabilityPremium'].patchValue( this.coverDetails.controls['totalBasicLiabilityPremium'].value);
      this.coverDetails.controls['totalBasicLiabilityPremium'].setValidators([Validators.required]);
      this.getCover();
    }else {

      this.coverDetails.controls['totalBasicLiabilityPremium'].patchValue('');
      this.coverDetails.controls['totalBasicLiabilityPremium'].setValidators(null);
    }
    this.coverDetails.controls['totalBasicLiabilityPremium'].updateValueAndValidity();

  }
  changeBasicLiabilityCoverage(){

    this.coverDetails.controls['totalBasicLiabilityPremium'].patchValue(this.basic_liability);


  }
  // changeRate(event:any){
  //   // alert('inn')
  //   // console.log(event,'event...');
  //   console.log(event.target.value);
  //   // console.log(this.coverDetails.controls['applicableRate'].value,'applicableRate......');
  //   // console.log(parseFloat('2.3'),'parseFloat......');
  //
  // if(event.target.value < 2.3) {
  //   this.errorRateMsg=true;
  //   this.errorRateMsg = 'Applicable Rate should not be less than 2.3';
  //
  // } else{
  //   // alert('else..')
  //   // console.log(event.target.value);
  //   // console.log(this.coverDetails.controls['applicableRate'].value,'applicableRate......');
  //   this.errorRateMsg=false;
  //   this.errorRateMsg = '';
  // }
  // }


  // updateTppd(event){
  //   if(event.checked){
  //     this.coverDetails.controls['TPPDCover'].patchValue(true);
  //     //
  //     this.coverDetails.controls['TPPDCoverSi'].setValidators([Validators.required]);
  //     this.coverDetails.controls['TPPDCoverSi'].updateValueAndValidity();
  //   }else {
  //     this.coverDetails.controls['TPPDCover'].patchValue(false);
  //
  //
  //     this.coverDetails.controls['TPPDCoverSi'].patchValue('');
  //     this.coverDetails.controls['TPPDCoverSi'].setValidators(null);
  //     this.coverDetails.controls['TPPDCoverSi'].updateValueAndValidity();
  //   }
  // }


  changesumInsu(){
    if(this.coverDetails.controls.NoOfUnnamedPassenegersCovered.value) {
      this.coverDetails.controls['UnnamedPassengersSI'].setValidators([Validators.required]);
      this.coverDetails.controls['totalUnnamedPassengerPremium'].setValidators([Validators.required]);
      this.getCover();
    }else{
        this.coverDetails.controls['UnnamedPassengersSI'].patchValue('');
        this.coverDetails.controls['UnnamedPassengersSI'].setValidators(null);
        this.coverDetails.controls['totalUnnamedPassengerPremium'].patchValue('');
        this.coverDetails.controls['totalUnnamedPassengerPremium'].setValidators(null);
      }
    this.coverDetails.controls['UnnamedPassengersSI'].updateValueAndValidity();
    this.coverDetails.controls['totalUnnamedPassengerPremium'].updateValueAndValidity();

  }
  changeValueUnpass(){
      if(this.coverDetails.controls.UnnamedPassengersSI.value){
      this.coverDetails.controls['totalUnnamedPassengerPremium'].patchValue(this.pa_unnamed_passenger);
      this.coverDetails.controls['totalUnnamedPassengerPremium'].setValidators([Validators.required]);
      this.coverDetails.controls['totalUnnamedPassengerPremium'].updateValueAndValidity();
  }else {

  this.coverDetails.controls['totalUnnamedPassengerPremium'].patchValue('');
  this.coverDetails.controls['totalUnnamedPassengerPremium'].setValidators(null);
  this.coverDetails.controls['totalUnnamedPassengerPremium'].updateValueAndValidity();
    }
  }
  updateElectricalItem(event){
    if(this.coverDetails.controls['IsElectricalItemFitted'].value==true){
      this.coverDetails.controls['ElectricalItemsTotalSI'].setValidators([Validators.required]);
    }else {
      this.coverDetails.controls['ElectricalItemsTotalSI'].patchValue('');
      this.coverDetails.controls['ElectricalItemsTotalSI'].setValidators(null);

    }
    this.coverDetails.controls['ElectricalItemsTotalSI'].updateValueAndValidity();

  }

  changeConditionElect(event:any){
    if((this.coverDetails.controls['ElectricalItemsTotalSI'].value >5000)&&(this.coverDetails.controls['ElectricalItemsTotalSI'].value <60000) ){
      this.electricalSumAount=false;
      this.electricalSumAount='';
      this.getCover();
    }else{
      this.electricalSumAount=true;
      this.electricalSumAount = 'Electrical Accessories Sum Insured Should be greater than 5000 and lesser than 60000';
      this.getCover();
    }
  }
  changeSumElectric(){
    if(this.coverDetails.controls['ElectricalItemsTotalSI'].value){
      this.coverDetails.controls['ElectricalItemsTotalPremium'].setValidators([Validators.required]);

    }else{
      this.coverDetails.controls['ElectricalItemsTotalPremium'].patchValue('');
      this.coverDetails.controls['ElectricalItemsTotalPremium'].setValidators(null);
    }
    this.coverDetails.controls['ElectricalItemsTotalPremium'].updateValueAndValidity();

  }
  changeElect(){
    this.coverDetails.controls['totalElectricalItemPremium'].patchValue(this.electrical_accessories);

  }

  updatenonElectricalItem(event){
    if(this.coverDetails.controls['IsNonElectricalItemFitted'].value==true){
      this.coverDetails.controls['NonElectricalItemsTotalSI'].setValidators([Validators.required]);
    }else {
      this.coverDetails.controls['NonElectricalItemsTotalSI'].patchValue('');
      this.coverDetails.controls['NonElectricalItemsTotalSI'].setValidators(null);

    }
    this.coverDetails.controls['NonElectricalItemsTotalSI'].updateValueAndValidity();

  }

  changeConditionNonElect(event:any){
    if((this.coverDetails.controls['NonElectricalItemsTotalSI'].value >5000)&&(this.coverDetails.controls['NonElectricalItemsTotalSI'].value <60000) ){
      this.nonElectricalSumAount=false;
      this.nonElectricalSumAount='';
      this.getCover();
    }else{
      this.nonElectricalSumAount=true;
      this.nonElectricalSumAount = 'Electrical Accessories Sum Insured Should be greater than 5000 and lesser than 60000';
      this.getCover();
    }
  }
  changeSumNonElectric(){
    if(this.coverDetails.controls['NonElectricalItemsTotalSI'].value){
      this.coverDetails.controls['NonElectricalItemsTotalPremium'].setValidators([Validators.required]);

    }else{
      this.coverDetails.controls['NonElectricalItemsTotalPremium'].patchValue('');
      this.coverDetails.controls['NonElectricalItemsTotalPremium'].setValidators(null);
    }
    this.coverDetails.controls['NonElectricalItemsTotalPremium'].updateValueAndValidity();

  }

changeNonElect(){
          this.coverDetails.controls['totalNonElectricalItemPremium'].patchValue(this.non_electrical_accessories);

}

    changeFuel(){
        this.coverDetails.controls['fuelTypeValue'].patchValue(this.fuelTypeList[this.coverDetails.controls['fuelType'].value]);
        if(this.coverDetails.controls['fuelType'].value == 5){

          this.coverDetails.controls['IsBiFuelKit'].setValidators([Validators.required]);

        }else if(this.coverDetails.controls['fuelType'].value != 5) {
            // alert('false')
          this.coverDetails.controls['IsBiFuelKit'].patchValue(false);
         this.updatenonBiFuelKit()

        }
        this.coverDetails.controls['IsBiFuelKit'].updateValueAndValidity();


    }

    updatenonBiFuelKit(){
        if(this.coverDetails.controls['IsBiFuelKit'].value==true){
            this.coverDetails.controls['BiFuelKitSi'].setValidators([Validators.required]);
            this.coverDetails.controls['bifueltype'].setValidators([Validators.required]);
            this.coverDetails.controls['cpgLpgKit'].setValidators([Validators.required]);
            this.coverDetails.controls['bifuelAmount'].setValidators([Validators.required]);
        }else if(this.coverDetails.controls['IsBiFuelKit'].value==false) {
            this.coverDetails.controls['BiFuelKitSi'].patchValue('');
            this.coverDetails.controls['BiFuelKitSi'].setValidators(null);

            this.coverDetails.controls['bifueltype'].patchValue('');
            this.coverDetails.controls['bifueltype'].setValidators(null);

            this.coverDetails.controls['cpgLpgKit'].patchValue('');
            this.coverDetails.controls['cpgLpgKit'].setValidators(null);
            this.changeCpgLpgKit();

            this.coverDetails.controls['bifuelAmount'].patchValue('');
            this.coverDetails.controls['bifuelAmount'].setValidators(null);
        }
        this.coverDetails.controls['BiFuelKitSi'].updateValueAndValidity();
        this.coverDetails.controls['bifueltype'].updateValueAndValidity();
        this.coverDetails.controls['bifuelAmount'].updateValueAndValidity();

    }
    changeBifuel(){
        this.coverDetails.controls['bifuelAmount'].patchValue(this.Bifuel_Kit);
    }
    changeCpgLpgKit(){
        if (this.coverDetails.controls.cpgLpgKit.value == 'Yes') {
            this.coverDetails.controls['fittngType'].setValidators([Validators.required]);
            this.coverDetails.controls['bifuelAmount'].setValidators([Validators.required]);
        } else  if (this.coverDetails.controls.cpgLpgKit.value == 'No'){
            this.coverDetails.controls['fittngType'].patchValue('');
            this.coverDetails.controls['bifuelAmount'].patchValue('');

            this.coverDetails.controls['fittngType'].setValidators(null);
            this.coverDetails.controls['bifuelAmount'].setValidators(null);

        }
        this.coverDetails.controls['fittngType'].updateValueAndValidity();
        this.coverDetails.controls['bifuelAmount'].updateValueAndValidity();
    }





  // updateDriverCovered(event){
  //   if(event.checked){
  //     this.coverDetails.controls['IsPAToDriverCovered'].patchValue(true);
  //     //
  //
  //     this.coverDetails.controls['IsPAToDriverCoveredSi'].setValidators([Validators.required]);
  //     this.coverDetails.controls['IsPAToDriverCoveredSi'].updateValueAndValidity();
  //   }else {
  //     this.coverDetails.controls['IsPAToDriverCovered'].patchValue(false);
  //
  //
  //     this.coverDetails.controls['IsPAToDriverCoveredSi'].patchValue('');
  //     this.coverDetails.controls['IsPAToDriverCoveredSi'].setValidators(null);
  //     this.coverDetails.controls['IsPAToDriverCoveredSi'].updateValueAndValidity();
  //   }
  // }

  // updateTotalCover(event){
  //   if(event.checked){
  //     console.log(this.coverDetails.controls['IsTotalCover'].value,'isvalue')
  //     this.coverDetails.controls['IsRoadTaxcover'].patchValue(true);
  //     this.coverDetails.controls['IsRegistrationCover'].patchValue(true);
  //     this.coverDetails.controls['InsurancePremium'].patchValue(true);
  //
  //   }else{
  //     this.coverDetails.controls['IsRoadTaxcover'].patchValue(false);
  //     this.coverDetails.controls['IsRoadTaxcover'].updateValueAndValidity();
  //
  //     this.coverDetails.controls['roadtaxSI'].patchValue('');
  //     this.coverDetails.controls['roadtaxSI'].updateValueAndValidity();
  //
  //     this.coverDetails.controls['InsurancePremium'].patchValue(false);
  //     this.coverDetails.controls['InsurancePremium'].updateValueAndValidity();
  //
  //     this.coverDetails.controls['insuranceSI'].patchValue('');
  //     this.coverDetails.controls['insuranceSI'].updateValueAndValidity();
  //
  //
  //     this.coverDetails.controls['IsRegistrationCover'].patchValue(false);
  //     this.coverDetails.controls['IsRegistrationCover'].updateValueAndValidity();
  //
  //     this.coverDetails.controls['registrationSI'].patchValue('');
  //     this.coverDetails.controls['registrationSI'].updateValueAndValidity();
  //
  //
  //   }
  // }



  //dob
  addEvent(event, type) {
    console.log(event.value,'valueeee')
    if (event.value != null) {
      let selectedDate = '';
      this.proposerAge = '';
      let dob = '';
      if (typeof event.value._i == 'string') {
        const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
        if (pattern.test(event.value._i) && event.value._i.length == 10) {
          if (type == 'proposor') {
            this.personalDobError = '';
          } else if (type == 'nominee') {
            this.personalDobError = '';
          }else if (type == 'iDate'){
            this.personalDobError = '';
          }
        } else {
          if (type == 'proposor') {
            this.personalDobError = 'Enter Valid Dob';
          } else if (type == 'nominee') {
            this.personalDobError = 'Enter Valid Dob';
          } else if (type == 'iDate') {
            this.personalDobError = 'Enter Valid Dob';
          }
        }
        selectedDate = event.value._i;
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        console.log(dob,'dobvalue')
        if (selectedDate.length == 10 && type == 'proposor') {
          this.proposerAge = this.ageCalculate(dob);
          // sessionStorage.proposerAgeForTravel = this.proposerAge;
        } else if (selectedDate.length == 10 && type == 'nominee') {
          this.nomineeAge = this.ageCalculate(dob);
        } else {
          this.npnomineeAge = this.ageCalculate(dob);
        }

      } else if (typeof event.value._i == 'object') {
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (dob.length == 10 && type == 'iDate') {
          this.personalDobError = '';
        }
        if (dob.length == 10 && type == 'proposor') {
          this.proposerAge = this.ageCalculate(dob);
          this.personalDobError = '';
          // sessionStorage.proposerAgeForTravel = this.proposerAge;
        } else if (type == "nominee") {
          this.nomineeAge = this.ageCalculate(dob);
        } else {
          this.npnomineeAge = this.ageCalculate(dob);

        }

      }
      if (type == 'proposor') {
        console.log(this.proposerAge, 'age');
        sessionStorage.proposerAge = this.proposerAge;
      }

      if (type == 'nominee') {
        console.log(this.nomineeAge, 'nomineeAge');
        sessionStorage.nomineeAge = this.nomineeAge;
        if (sessionStorage.nomineeAge < 18) {
          this.showNominee = true;
          this.coverDetails.controls['cappointeeName'].setValidators([Validators.required]);
          this.coverDetails.controls['cappointeeName'].updateValueAndValidity();

          this.coverDetails.controls['nOtherRelation'].setValidators([Validators.required]);
          this.coverDetails.controls['nOtherRelation'].updateValueAndValidity();
        } else {
          this.coverDetails.controls['cappointeeName'].patchValue('');
          this.coverDetails.controls['cappointeeName'].setValidators(null);
          this.coverDetails.controls['cappointeeName'].updateValueAndValidity();

          this.coverDetails.controls['nOtherRelation'].patchValue('');
          this.coverDetails.controls['nOtherRelation'].setValidators(null);
          this.coverDetails.controls['nOtherRelation'].updateValueAndValidity();
          this.showNominee = false;

        }
      }

      if (type == 'npnominee') {
        console.log(this.npnomineeAge, 'npnomineeAge');
        sessionStorage.npnomineeAge = this.npnomineeAge;
        if (sessionStorage.npnomineeAge < 18) {

          this.npshowNominee = true;
          this.coverDetails.controls['npappointeeName'].setValidators([Validators.required]);
          this.coverDetails.controls['npappointeeName'].updateValueAndValidity();

          this.coverDetails.controls['npOtherRelation'].setValidators([Validators.required]);
          this.coverDetails.controls['npOtherRelation'].updateValueAndValidity();
        } else {
          this.coverDetails.controls['npappointeeName'].patchValue('');
          this.coverDetails.controls['npappointeeName'].setValidators(null);
          this.coverDetails.controls['npappointeeName'].updateValueAndValidity();

          this.coverDetails.controls['npOtherRelation'].patchValue('');
          this.coverDetails.controls['npOtherRelation'].setValidators(null);
          this.coverDetails.controls['npOtherRelation'].updateValueAndValidity();
          this.npshowNominee = false;

        }
      }

    }
  }


  // FIRST STEPPER

  // title change function
  changeGender() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    };
    this.fourWheelerInsurance.fourWheelerRelianceGetTitleList(data).subscribe(
        (successData) => {
          this.titlesucccess(successData);
        },
        (error) => {
          this.failureSuccess(error);
        }
    );
  }
  public titlesucccess(successData){
    this.titleList = successData.ResponseObject;
  }
  public failureSuccess(error) {
  }

  changeBifuelDrop() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      "enquiry_id": this.bikeEnquiryId,
    };
    this.fourWheelerInsurance.fourWheelerRelianceGetBifuelList(data).subscribe(
        (successData) => {
          this.Bifuelsucccess(successData);
        },
        (error) => {
          this.BifuelfailureSuccess(error);
        }
    );
  }
  public Bifuelsucccess(successData){
    this.bifuelType = successData.ResponseObject.fuel_type;
    console.log(this.bifuelType,'this.bifuelType...');
    this.dropdownFuelType();
  }
  public BifuelfailureSuccess(error) {
  }
  dropdownFuelType(){
    if(this.bifuelType == '5'){
    this.coverDetails['controls'].fuelType.patchValue('5');
      this.bifuelCover=true;
    }else{
      this.bifuelCover=false;
    }
  }


  //stepper
  nextTab(stepper,value,type) {
    if (type == 'stepper1') {
      this.proposerData = value;
      sessionStorage.stepper1Details = '';
      sessionStorage.stepper1Details = JSON.stringify(value);
      this.riskDetails.controls['IDV'].patchValue(this.buyBikeDetails.Idv);
      console.log(this.relianceProposal.value,'this.relianceProposal...')
      console.log(this.proposerData,'this.proposerData...')
      console.log(sessionStorage.proposerAge,'sessionStorage.proposerAge...')
      console.log(this.relianceProposal.controls['clientType'].value,'clienttype...')
      console.log(this.proposerAge,'age.....')
      if (this.relianceProposal.valid) {
        if(sessionStorage.proposerAge >= 18 ||(this.relianceProposal.controls['clientType'].value == 1&&this.proposerAge=='')){
          stepper.next();
          this.topScroll();
        }else {
          this.toastr.error('Proposer Age should be greater than 18.')
        }
      }else{
        this.toastr.error('Please Select the Mandatory Fields')
      }
    } else if (type == 'stepper2') {
      sessionStorage.stepper2Details = '';
      sessionStorage.stepper2Details = JSON.stringify(value);
      if (this.riskDetails.valid) {
        stepper.next();
        this.topScroll();
        this.clientTypeReq();
      }else{
        this.toastr.error('Please Select the Mandatory Fields')

      }
    } else if (type == 'stepper3') {
      sessionStorage.stepper3Details = '';
      sessionStorage.stepper3Details = JSON.stringify(value);
      console.log(this.coverDetails.value,'value...');
      // console.log(this.errorRateMsg,'errorRateMsg...');
      console.log(this.electricalSumAount,'electricalSumAount...');
      console.log(this.nonElectricalSumAount,'electricalSumAount...');

      if (this.coverDetails.valid && (this.electricalSumAount==false)&&(this.nonElectricalSumAount==false)) {
        console.log(typeof (this.buyProduct.business_type),'type');
        if (this.buyProduct.business_type == 1){

          this.createProposal(stepper, value);
        }else{
          stepper.next();
          this.topScroll();
          this.inspectionShow();
        }
      }else{
        this.toastr.error('Please Select the Mandatory Fields')

      }
    }

    // this.proposerFormData = this.relianceProposal.value;
    // this.riskFormData = this.riskDetails.value;
    // this.coverFormData = this.coverDetails.value;
    // this.previousFormData = this.previousInsurance.value;

    // this.summaryData = true;


  }
  topScroll() {
    document.getElementById('main-content').scrollTop = 0;
  }


//session
  session() {

    if (sessionStorage.stepper1Details != '' && sessionStorage.stepper1Details != undefined) {
      this.getStepper1 = JSON.parse(sessionStorage.stepper1Details);
      console.log(this.getStepper1.dob, 'sessiondob');
      this.relianceProposal = this.fb.group({
        clientType: this.getStepper1.clientType,
        corporateName: this.getStepper1.corporateName,
        firstName: this.getStepper1.firstName,
        lastName: this.getStepper1.lastName,
        middleName: this.getStepper1.middleName,
        dob: this.datepipe.transform(this.getStepper1.dob, 'y-MM-dd'),
        title: this.getStepper1.title,
        occupation: this.getStepper1.occupation,
        maritalStatus: this.getStepper1.maritalStatus,
        nationality: this.getStepper1.nationality,
        titleValue: this.getStepper1.titleValue,
        address: this.getStepper1.address,
        paddress: this.getStepper1.paddress,
        raddress: this.getStepper1.raddress,
        address2: this.getStepper1.address2,
        paddress2: this.getStepper1.paddress2,
        raddress2: this.getStepper1.raddress2,
        pincode: this.getStepper1.pincode,
        ppincode: this.getStepper1.ppincode,
        rpincode: this.getStepper1.rpincode,
        state: this.getStepper1.state,
        stateId: this.getStepper1.stateId,
        pstate: this.getStepper1.pstate,
        pstateId: this.getStepper1.pstateId,
        rstate: this.getStepper1.rstate,
        rstateId: this.getStepper1.rstateId,
        city: this.getStepper1.city,
        cityId: this.getStepper1.cityId,
        pcity: this.getStepper1.pcity,
        pcityId: this.getStepper1.pcityId,
        rcity: this.getStepper1.rcity,
        rcityId: this.getStepper1.rcityId,
        district: this.getStepper1.district,
        districtId: this.getStepper1.districtId,
        pdistrict: this.getStepper1.pdistrict,
        pdistrictId: this.getStepper1.pdistrictId,
        rdistrict: this.getStepper1.rdistrict,
        rdistrictId: this.getStepper1.rdistrictId,
        landmark: this.getStepper1.landmark,
        plandmark: this.getStepper1.plandmark,
        rlandmark: this.getStepper1.rlandmark,
        address3: this.getStepper1.address3,
        paddress3: this.getStepper1.paddress3,
        raddress3: this.getStepper1.raddress3,
        alternateContact: this.getStepper1.alternateContact,
        // gstNumber : this.getStepper1.gstNumber,
        sameAsAddress: this.getStepper1.sameAsAddress,
        regSameAscommAddress: this.getStepper1.regSameAscommAddress,
        inspSameAscommAddress: this.getStepper1.inspSameAscommAddress,
        regSameAspermAddress: this.getStepper1.regSameAspermAddress,
        gender: this.getStepper1.gender,
        email: this.getStepper1.email,
        mobile: this.getStepper1.mobile,
        occupationValue: this.getStepper1.occupationValue,
        maritalStatusValue: this.getStepper1.maritalStatusValue,
        nationalityValue: this.getStepper1.nationalityValue,
        iaddress: this.getStepper1.iaddress,
        iaddress2: this.getStepper1.iaddress2,
        iaddress3: this.getStepper1.iaddress3,
        ipincode: this.getStepper1.ipincode,
        istate: this.getStepper1.istate,
        istateId: this.getStepper1.istateId,
        icountry: this.getStepper1.icountry,
        idistrict: this.getStepper1.idistrict,
        idistrictId: this.getStepper1.idistrictId,
        icity: this.getStepper1.icity,
        icityId: this.getStepper1.icityId,
        ilandmark: this.getStepper1.ilandmark,

      });
    }
    console.log(this.relianceProposal, 'reliancproposal');

    if (sessionStorage.stepper2Details != '' && sessionStorage.stepper2Details != undefined) {
      this.getStepper2 = JSON.parse(sessionStorage.stepper2Details);
      this.riskDetails = this.fb.group({
        OtherSystemName: this.getStepper2.OtherSystemName,
        IDV: this.getStepper2.IDV,
        FinanceTypeValue: this.getStepper2.FinanceTypeValue,
        FinanceType: this.getStepper2.FinanceType,
        FinancierName: this.getStepper2.FinancierName,
        FinancierAddress: this.getStepper2.FinancierAddress,
        IsVehicleHypothicated: this.getStepper2.IsVehicleHypothicated,
        OtherSystemNameValue: this.getStepper2.OtherSystemNameValue,
      });
    }

    if (sessionStorage.stepper3Details != '' && sessionStorage.stepper3Details != undefined) {
      this.getStepper3 = JSON.parse(sessionStorage.stepper3Details);
      this.coverDetails = this.fb.group({
        UnnamedPassengerCovered: this.getStepper3.UnnamedPassengerCovered,
        PAToOwnerDriverCoverd: this.getStepper3.PAToOwnerDriverCoverd,
        PAToOwnerDriverCoverdSi: this.getStepper3.PAToOwnerDriverCoverdSi,
        AutomobileAssociationMember: this.getStepper3.AutomobileAssociationMember,
        AntiTheftDeviceFitted: this.getStepper3.AntiTheftDeviceFitted,
        InsurancePremium: this.getStepper3.InsurancePremium,
        NilDepreciationCoverage: this.getStepper3.NilDepreciationCoverage,
        // applicableRate: this.getStepper3.applicableRate,
        LiabilityToPaidDriverCovered: this.getStepper3.LiabilityToPaidDriverCovered,
        // TPPDCover: this.getStepper3.TPPDCover,
        // TPPDCoverSi: this.getStepper3.TPPDCoverSi,
        BasicODCoverage: this.getStepper3.BasicODCoverage,
        BasicLiability: this.getStepper3.BasicLiability,
        PACoverToOwner: this.getStepper3.PACoverToOwner,

        totalUnnamedPassengerPremium: this.getStepper3.totalUnnamedPassengerPremium,
        totalOwnerDriverPremium: this.getStepper3.totalOwnerDriverPremium,
        totalDepreciationPremium: this.getStepper3.totalDepreciationPremium,
        totalVoluntaryDeductablePremium: this.getStepper3.totalVoluntaryDeductablePremium,
        totalElectricalItemPremium: this.getStepper3.totalElectricalItemPremium,
        totalNonElectricalItemPremium: this.getStepper3.totalNonElectricalItemPremium,
        // PAToNamedPassenger: this.getStepper3.PAToNamedPassenger,
        // IsPAToDriverCovered: this.getStepper3.IsPAToDriverCovered,
        // IsPAToDriverCoveredSi: this.getStepper3.IsPAToDriverCoveredSi,
        NoOfUnnamedPassenegersCovered: this.getStepper3.NoOfUnnamedPassenegersCovered,
        ElectricalItemsTotalSI: this.getStepper3.ElectricalItemsTotalSI,
        NonElectricalItemsTotalSI: this.getStepper3.NonElectricalItemsTotalSI,
        BiFuelKitSi: this.getStepper3.BiFuelKitSi,
        bifuelAmount: this.getStepper3.bifuelAmount,
        bifueltype: this.getStepper3.bifueltype,
        cpgLpgKit: this.getStepper3.cpgLpgKit,
        fittngType: this.getStepper3.fittngType,
        UnnamedPassengersSI: this.getStepper3.UnnamedPassengersSI,
        IsVoluntaryDeductableOpted: this.getStepper3.IsVoluntaryDeductableOpted,
        VoluntaryDeductableAmount: this.getStepper3.VoluntaryDeductableAmount,
        totalLiabilityToPaidDriverPremium: this.getStepper3.totalLiabilityToPaidDriverPremium,
        totalAssociationPremium: this.getStepper3.totalAssociationPremium,
        totalAntiTheftDeviceFittedPremium: this.getStepper3.totalAntiTheftDeviceFittedPremium,
        totalBasicODCoveragePremium: this.getStepper3.totalBasicODCoveragePremium,
        totalBasicLiabilityPremium: this.getStepper3.totalBasicLiabilityPremium,
        IsElectricalItemFitted: this.getStepper3.IsElectricalItemFitted,
        IsNonElectricalItemFitted: this.getStepper3.IsNonElectricalItemFitted,
        IsBiFuelKit: this.getStepper3.IsBiFuelKit,
        // IsTotalCover: this.getStepper3.IsTotalCover,
        IsRegistrationCover: this.getStepper3.IsRegistrationCover,
        IsRoadTaxcover: this.getStepper3.IsRoadTaxcover,
        cappointeeName: this.getStepper3.cappointeeName,
        cnomineeName: this.getStepper3.cnomineeName,
        cnDob: this.datepipe.transform(this.getStepper3.cnDob, 'y-MM-dd'),
        nrelation: this.getStepper3.nrelation,
        nOtherRelation: this.getStepper3.nOtherRelation,
        cnAddress: this.getStepper3.cnAddress,
        // npappointeeName: this.getStepper3.npappointeeName,
        // npnomineeName: this.getStepper3.npnomineeName,
        // npDob: this.datepipe.transform(this.getStepper3.npDob, 'y-MM-dd'),
        // nprelation: this.getStepper3.nprelation,
        // npOtherRelation: this.getStepper3.npOtherRelation,
        // npAddress: this.getStepper3.npAddress,
        fuelType: this.getStepper3.fuelType,
        nOtherRelationValue: this.getStepper3.nOtherRelationValue,
        npOtherRelationValue: this.getStepper3.npOtherRelationValue,
        namedPassengersSI: this.getStepper3.namedPassengersSI,
        roadtaxSI: this.getStepper3.roadtaxSI,
        insuranceSI: this.getStepper3.insuranceSI,
        registrationSI: this.getStepper3.insuranceSI,
        nppassengerName: this.getStepper3.nppassengerName,
        nrelationValue: this.getStepper3.nrelationValue,
        nprelationValue: this.getStepper3.nprelationValue,
        fuelTypeValue: this.getStepper3.fuelTypeValue,
        inspectionNo: this.getStepper3.inspectionNo,
      });

      if (this.getStepper3.fuelType == 5) {
        this.coverDetails.controls['IsBiFuelKit'].patchValue(true);
        //
        this.coverDetails.controls['BiFuelKitSi'].patchValue(this.coverDetails.controls['BiFuelKitSi'].value);

        this.coverDetails.controls['BiFuelKitSi'].setValidators([Validators.required]);
        this.coverDetails.controls['BiFuelKitSi'].updateValueAndValidity();

        this.coverDetails.controls['bifueltype'].setValidators([Validators.required]);
        this.coverDetails.controls['bifueltype'].updateValueAndValidity();
      } else {
        this.coverDetails.controls['IsBiFuelKit'].patchValue(false);


        this.coverDetails.controls['BiFuelKitSi'].patchValue('');
        this.coverDetails.controls['BiFuelKitSi'].setValidators(null);
        this.coverDetails.controls['BiFuelKitSi'].updateValueAndValidity();

        this.coverDetails.controls['bifueltype'].patchValue('');
        this.coverDetails.controls['bifueltype'].setValidators(null);
        this.coverDetails.controls['bifueltype'].updateValueAndValidity();
      }
    }

    if(sessionStorage.nomineeAge != '' && sessionStorage.nomineeAge != undefined) {
      if (sessionStorage.nomineeAge < 18) {
        this.showNominee = true;
        this.coverDetails.controls['cappointeeName'].setValidators([Validators.required]);
        this.coverDetails.controls['cappointeeName'].updateValueAndValidity();

        this.coverDetails.controls['nOtherRelation'].setValidators([Validators.required]);
        this.coverDetails.controls['nOtherRelation'].updateValueAndValidity();
      } else {
        this.coverDetails.controls['cappointeeName'].patchValue('');
        this.coverDetails.controls['cappointeeName'].setValidators(null);
        this.coverDetails.controls['cappointeeName'].updateValueAndValidity();

        this.coverDetails.controls['nOtherRelation'].patchValue('');
        this.coverDetails.controls['nOtherRelation'].setValidators(null);
        this.coverDetails.controls['nOtherRelation'].updateValueAndValidity();
        this.showNominee = false;
      }
    }


    if(sessionStorage.npnomineeAge != '' && sessionStorage.npnomineeAge != undefined) {
      if (sessionStorage.npnomineeAge < 18) {
        this.npshowNominee = true;
        this.coverDetails.controls['npappointeeName'].setValidators([Validators.required]);
        this.coverDetails.controls['npappointeeName'].updateValueAndValidity();

        this.coverDetails.controls['npOtherRelation'].setValidators([Validators.required]);
        this.coverDetails.controls['npOtherRelation'].updateValueAndValidity();
      } else {

        this.coverDetails.controls['npappointeeName'].patchValue('');
        this.coverDetails.controls['npappointeeName'].setValidators(null);
        this.coverDetails.controls['npappointeeName'].updateValueAndValidity();

        this.coverDetails.controls['npOtherRelation'].patchValue('');
        this.coverDetails.controls['npOtherRelation'].setValidators(null);
        this.coverDetails.controls['npOtherRelation'].updateValueAndValidity();
        this.npshowNominee = false;
      }
    }

    if(sessionStorage.stepper4Details != '' && sessionStorage.stepper4Details != undefined ){
      this.getStepper4 = JSON.parse(sessionStorage.stepper4Details);
      this.previousInsurance = this.fb.group({
        prevInsurance: this.getStepper4.prevInsurance,
        prevYearPolicyType: this.getStepper4.prevYearPolicyType,
        policyNumber: this.getStepper4.policyNumber,
        // prevPolStartDate: this.datepipe.transform(this.getStepper4.prevPolStartDate, 'y-MM-dd'),
        // prevPolSold: this.getStepper4.prevPolSold,
        prevInsurerAddress: this.getStepper4.prevInsurerAddress,
        prevInsuranceValue: this.getStepper4.prevInsuranceValue,
        prevYearPolicyTypeValue: this.getStepper4.prevYearPolicyTypeValue,
        inspectionId: this.getStepper4.inspectionId,
        inspectionDone: this.getStepper4.inspectionDone,
        inspectionDate: this.datepipe.transform(this.getStepper4.inspectionDate, 'y-MM-dd'),
      });
    }

  }



  // Occupation LIst

  occupation() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    };
    this.fourWheelerInsurance.fourWheeleroccupationList(data).subscribe(
        (successData) => {
          this.occupationSucccess(successData);
        },
        (error) => {
          this.occupationFailure(error);
        }
    );
  }
  public occupationSucccess(successData){
    this.occupationList = successData.ResponseObject;
  }
  public occupationFailure(error) {
  }


  //// GET finansial type

  getFinancialType() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    };
    this.fourWheelerInsurance.getFinancialTypeList(data).subscribe(
        (successData) => {
          this.getFinancialTypeSucccess(successData);
        },
        (error) => {
          this.getFinancialTypeFailure(error);
        }
    );
  }
  public getFinancialTypeSucccess(successData){
    this.financialTypeList = successData.ResponseObject;
  }
  public getFinancialTypeFailure(error) {
  }
  //get marital status list
  maritalStatus() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    };
    this.fourWheelerInsurance.fourWheelermaritalList(data).subscribe(
        (successData) => {
          this.maritalSucccess(successData);
        },
        (error) => {
          this.maritalFailure(error);
        }
    );
  }
  public maritalSucccess(successData){
    this.maritalList = successData.ResponseObject;
  }
  public maritalFailure(error) {
  }

  //fuel type list
  fueltype() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    };
    this.fourWheelerInsurance.fourWheelerfuelTypeList(data).subscribe(
        (successData) => {
          this.fuelTypeListSucccess(successData);
        },
        (error) => {
          this.fuelTypeListFailure(error);
        }
    );
  }
  public fuelTypeListSucccess(successData){
    this.fuelTypeList = successData.ResponseObject;
  }
  public fuelTypeListFailure(error) {
  }


  ////VoluntaryDeductableAmount list
  // voluntaryAmount() {
  //   const data = {
  //     'platform': 'web',
  //     'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
  //     'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
  //   };
  //   this.fourWheelerInsurance.fourWheelervoluntaryAmountList(data).subscribe(
  //       (successData) => {
  //         this.voluntaryAmountListSucccess(successData);
  //       },
  //       (error) => {
  //         this.fourWheelervoluntaryAmountListFailure(error);
  //       }
  //   );
  // }
  // public voluntaryAmountListSucccess(successData){
  //   this.amountList = successData.ResponseObject;
  // }
  // public fourWheelervoluntaryAmountListFailure(error) {
  // }
  voluntaryAmount() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      "pos_status":"0",
      "enquiry_id":"834",
      "company_id":"3",
      "TypeOfFuel":"1",
      "motorproposalObj":{
        "CoverDetails": "",
        "TrailerDetails": "",
        "ClientDetails": {
          'ClientType': this.relianceProposal.controls['clientType'].value,
          'CorporateName':this.relianceProposal.controls['corporateName'].value,
          'LastName': this.relianceProposal.controls['lastName'].value,
          'MidName': this.relianceProposal.controls['middleName'].value,
          'ForeName': this.relianceProposal.controls['firstName'].value,
          'OccupationID': this.relianceProposal.controls['occupation'].value,
          'DOB': this.datepipe.transform(this.relianceProposal.controls['dob'].value, 'y-MM-dd'),
          'Gender': this.relianceProposal.controls['gender'].value,
          'PhoneNo': this.relianceProposal.controls['alternateContact'].value,
          'MobileNo': this.relianceProposal.controls['mobile'].value,
          "ClientAddress": {
            'CommunicationAddress': {
              'AddressType': '0',
              'Address1': this.relianceProposal.controls['address'].value,
              'Address2': this.relianceProposal.controls['address2'].value,
              'Address3': this.relianceProposal.controls['address3'].value,
              'CityID': this.relianceProposal.controls['cityId'].value,
              'DistrictID': this.relianceProposal.controls['districtId'].value,
              'StateID': this.relianceProposal.controls['stateId'].value,
              'Pincode': this.relianceProposal.controls['pincode'].value,
              'Country': '1',
              'NearestLandmark': this.relianceProposal.controls['landmark'].value
            },
            'PermanentAddress': {
              'AddressType': '0',
              'Address1': this.relianceProposal.controls['paddress'].value,
              'Address2': this.relianceProposal.controls['paddress2'].value,
              'Address3': this.relianceProposal.controls['paddress3'].value,
              'CityID': this.relianceProposal.controls['pcityId'].value,
              'DistrictID': this.relianceProposal.controls['pdistrictId'].value,
              'StateID': this.relianceProposal.controls['pstateId'].value,
              'Pincode': this.relianceProposal.controls['ppincode'].value,
              'Country': '1',
              'NearestLandmark': this.relianceProposal.controls['plandmark'].value
            },
            'RegistrationAddress': {
              'AddressType': '0',
              'Address1': this.relianceProposal.controls['raddress'].value,
              'Address2': this.relianceProposal.controls['raddress2'].value,
              'Address3': this.relianceProposal.controls['paddress3'].value,
              'CityID': this.relianceProposal.controls['rcityId'].value,
              'DistrictID': this.relianceProposal.controls['rdistrictId'].value,
              'StateID': this.relianceProposal.controls['rstateId'].value,
              'Pincode': this.relianceProposal.controls['rpincode'].value,
              'Country': '1',
              'NearestLandmark': this.relianceProposal.controls['rlandmark'].value
            },
            "InspectionAddress": {
              "AddressType": "0",
              "Address1": "",
              "Address2": "",
              "Address3": "",
              "CityID": "",
              "DistrictID": "",
              "StateID": "",
              "Pincode": "",
              "Country": "India",
              "NearestLandmark": ""
            }
          },
          'EmailID': this.relianceProposal.controls['email'].value,
          'Salutation': this.relianceProposal.controls['title'].value==''?'M/S':this.relianceProposal.controls['title'].value,
          'MaritalStatus': this.relianceProposal.controls['maritalStatus'].value,
          'Nationality': this.relianceProposal.controls['nationality'].value
        }
      }
    }
    this.fourWheelerInsurance.fourWheelerunnamedSi(data).subscribe(
        (successData) => {
          this.voluntaryAmountListSucccess(successData);
        },
        (error) => {
          this.fourWheelervoluntaryAmountListFailure(error);
        }
    );
  }
  public voluntaryAmountListSucccess(successData){
    this.amountList = successData.coverage[2].Voluntary_Deductible;
    console.log(successData,'45678987678')
  }
  public fourWheelervoluntaryAmountListFailure(error) {
  }

  //getPaidDriverSi

  getPaidDriverSi() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    };
    this.fourWheelerInsurance.fourWheelergetPaidDriverSi(data).subscribe(
        (successData) => {
          this.getPaidDriverSiSucccess(successData);
        },
        (error) => {
          this.getPaidDriverSiFailure(error);
        }
    );
  }
  public getPaidDriverSiSucccess(successData){
    this.driverCoveredList = successData.ResponseObject;
  }
  public getPaidDriverSiFailure(error) {
  }

  getBifuelChange() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'enquiry_id':this.bikeEnquiryId,
    };
    this.fourWheelerInsurance.fourWheelerBifuelChange(data).subscribe(
        (successData) => {
          this.getBifuelChangeSucccess(successData);
        },
        (error) => {
          this.getBifuelChangeFailure(error);
        }
    );
  }
  public getBifuelChangeSucccess(successData){
    this.bifuelChangeList = successData.ResponseObject.fuel_type;
  }
  public getBifuelChangeFailure(error) {
  }
  ///
  getTppdSi() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    };
    this.fourWheelerInsurance.fourWheelergetTppdSi(data).subscribe(
        (successData) => {
          this.getTppdSiSucccess(successData);
        },
        (error) => {
          this.getTppdSiFailure(error);
        }
    );
  }
  public getTppdSiSucccess(successData){
    this.tppdList = successData.ResponseObject;
  }
  public getTppdSiFailure(error) {
  }



  ///unnamed list
  // unnamedSi() {
  //   const data = {
  //     'platform': 'web',
  //     'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
  //     'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
  //   };
  //   this.fourWheelerInsurance.fourWheelerunnamedSiList(data).subscribe(
  //       (successData) => {
  //         this.unnamedSiSucccess(successData);
  //       },
  //       (error) => {
  //         this.unnamedSiFailure(error);
  //       }
  //   );
  // }
  // public unnamedSiSucccess(successData){
  //   this.unnamedList = successData.ResponseObject;
  // }
  // public unnamedSiFailure(error) {
  // }

  unnamedSi() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      "pos_status":"0",
      "enquiry_id":"834",
      "company_id":"3",
      "TypeOfFuel":"1",
      "motorproposalObj":{
        "CoverDetails": "",
        "TrailerDetails": "",
        "ClientDetails": {
          'ClientType': this.relianceProposal.controls['clientType'].value,
          'CorporateName':this.relianceProposal.controls['corporateName'].value,
          'LastName': this.relianceProposal.controls['lastName'].value,
          'MidName': this.relianceProposal.controls['middleName'].value,
          'ForeName': this.relianceProposal.controls['firstName'].value,
          'OccupationID': this.relianceProposal.controls['occupation'].value,
          'DOB': this.datepipe.transform(this.relianceProposal.controls['dob'].value, 'y-MM-dd'),
          'Gender': this.relianceProposal.controls['gender'].value,
          'PhoneNo': this.relianceProposal.controls['alternateContact'].value,
          'MobileNo': this.relianceProposal.controls['mobile'].value,
          "ClientAddress": {
            'CommunicationAddress': {
              'AddressType': '0',
              'Address1': this.relianceProposal.controls['address'].value,
              'Address2': this.relianceProposal.controls['address2'].value,
              'Address3': this.relianceProposal.controls['address3'].value,
              'CityID': this.relianceProposal.controls['cityId'].value,
              'DistrictID': this.relianceProposal.controls['districtId'].value,
              'StateID': this.relianceProposal.controls['stateId'].value,
              'Pincode': this.relianceProposal.controls['pincode'].value,
              'Country': '1',
              'NearestLandmark': this.relianceProposal.controls['landmark'].value
            },
            'PermanentAddress': {
              'AddressType': '0',
              'Address1': this.relianceProposal.controls['paddress'].value,
              'Address2': this.relianceProposal.controls['paddress2'].value,
              'Address3': this.relianceProposal.controls['paddress3'].value,
              'CityID': this.relianceProposal.controls['pcityId'].value,
              'DistrictID': this.relianceProposal.controls['pdistrictId'].value,
              'StateID': this.relianceProposal.controls['pstateId'].value,
              'Pincode': this.relianceProposal.controls['ppincode'].value,
              'Country': '1',
              'NearestLandmark': this.relianceProposal.controls['plandmark'].value
            },
            'RegistrationAddress': {
              'AddressType': '0',
              'Address1': this.relianceProposal.controls['raddress'].value,
              'Address2': this.relianceProposal.controls['raddress2'].value,
              'Address3': this.relianceProposal.controls['paddress3'].value,
              'CityID': this.relianceProposal.controls['rcityId'].value,
              'DistrictID': this.relianceProposal.controls['rdistrictId'].value,
              'StateID': this.relianceProposal.controls['rstateId'].value,
              'Pincode': this.relianceProposal.controls['rpincode'].value,
              'Country': '1',
              'NearestLandmark': this.relianceProposal.controls['rlandmark'].value
            },
            "InspectionAddress": {
              "AddressType": "0",
              "Address1": "",
              "Address2": "",
              "Address3": "",
              "CityID": "",
              "DistrictID": "",
              "StateID": "",
              "Pincode": "",
              "Country": "India",
              "NearestLandmark": ""
            }
          },
          'EmailID': this.relianceProposal.controls['email'].value,
          'Salutation': this.relianceProposal.controls['title'].value==''?'M/S':this.relianceProposal.controls['title'].value,
          'MaritalStatus': this.relianceProposal.controls['maritalStatus'].value,
          'Nationality': this.relianceProposal.controls['nationality'].value
        }
      }
    }
    this.fourWheelerInsurance.fourWheelerunnamedSi(data).subscribe(
        (successData) => {
          this.unnamedSiSucccess(successData);
        },
        (error) => {
          this.unnamedSiFailure(error);
        }
    );
  }
  public unnamedSiSucccess(successData){
    this.unnamedList = successData.coverage[9].PA_to_Unnamed_Passenger;
    console.log(successData,'success');
    console.log(successData.coverage[9],'this.unnamedList');
    console.log(successData.coverage[9].PA_to_Unnamed_Passenger,'this.unnamedList');
    console.log(this.unnamedList,'this.unnamedList');

  }
  public unnamedSiFailure(error) {
  }

///nominee RelationList
  relationList() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    };
    this.fourWheelerInsurance.fourWheelerrelationListDetails(data).subscribe(
        (successData) => {
          this.relationListSucccess(successData);
        },
        (error) => {
          this.relationListFailure(error);
        }
    );
  }
  public relationListSucccess(successData){
    this.relationListData = successData.ResponseObject;
  }
  public relationListFailure(error) {
  }
  ///previous year insurer
  prevInsurer() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    };
    this.fourWheelerInsurance.fourWheelerprevInsureList(data).subscribe(
        (successData) => {
          this.prevInsureSucccess(successData);
        },
        (error) => {
          this.prevInsureFailure(error);
        }
    );
  }
  public prevInsureSucccess(successData){
    this.prevInsurerList = successData.ResponseObject;
  }
  public prevInsureFailure(error) {
  }

  //previous year policy list
  prevPolicy() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    };
    this.fourWheelerInsurance.fourWheelerprevPolicyList(data).subscribe(
        (successData) => {
          this.prevPolicySucccess(successData);
        },
        (error) => {
          this.prevPolicyFailure(error);
        }
    );
  }
  public prevPolicySucccess(successData){
    this.prevPolicyList = successData.ResponseObject;
  }
  public prevPolicyFailure(error) {
  }

  //coverPremium
  getCover() {
    console.log( this.bikeEnquiryId,' this.bikeEnquiryId,')
    const data = {
      "platform": "web",
      "role_id": this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      "pos_status": "0",
      "user_id":  this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      "enquiry_id": this.bikeEnquiryId,
      "company_id": "3",
      "coverdetails": {
        "Cover": {
          'IsAutomobileAssociationMember': this.coverDetails.controls['AutomobileAssociationMember'].value ? 'true' : 'false',
          'IsPAToOwnerDriverCoverd': this.coverDetails.controls['PAToOwnerDriverCoverd'].value ? 'true' : 'false',
          'IsAntiTheftDeviceFitted': this.coverDetails.controls['AntiTheftDeviceFitted'].value ? 'true' : 'false',
          // 'IsTPPDCover': this.coverDetails.controls['TPPDCover'].value ? 'true' : 'false',
          'IsBasicODCoverage': this.coverDetails.controls['BasicODCoverage'].value ? 'true' : 'false',
          'IsBasicLiability': this.coverDetails.controls['BasicLiability'].value ? 'true' : 'false',
          // 'IsInsurancePremium': this.coverDetails.controls['InsurancePremium'].value ? 'true' : 'false',
          'IsElectricalItemFitted': this.coverDetails.controls['IsElectricalItemFitted'].value ? 'true' : 'false',
          'ElectricalItemsTotalSI': this.coverDetails.controls['ElectricalItemsTotalSI'].value ,
          'IsNonElectricalItemFitted': this.coverDetails.controls['IsNonElectricalItemFitted'].value ? 'true' : 'false',
          'IsVoluntaryDeductableOpted': this.coverDetails.controls['IsVoluntaryDeductableOpted'].value ? 'true' : 'false',
          'VoluntaryDeductableAmount': this.coverDetails.controls['VoluntaryDeductableAmount'].value ,
          'NonElectricalItemsTotalSI': this.coverDetails.controls['NonElectricalItemsTotalSI'].value ,
          'IsBiFuelKit': this.coverDetails.controls['IsBiFuelKit'].value ? 'true' : 'false',
          'BiFuelKitSi': this.coverDetails.controls['BiFuelKitSi'].value ,
          'IsNilDepreciation': this.coverDetails.controls['NilDepreciationCoverage'].value ? 'true' : 'false',
          'IsPAToUnnamedPassengerCovered': this.coverDetails.controls['UnnamedPassengerCovered'].value ? 'true' : 'false',
          'NoOfUnnamedPassenegersCovered':this.coverDetails.controls['NoOfUnnamedPassenegersCovered'].value,
          'IsLiabilityToPaidDriverCovered':this.coverDetails.controls['LiabilityToPaidDriverCovered'].value ? 'true' : 'false',

          // 'NoOfUnnamedPassenegersCovered': this.coverDetails.controls['NoOfUnnamedPassenegersCovered'].value != '' ? this.coverDetails.controls['NoOfUnnamedPassenegersCovered'].value : '',
          // 'IsPAToDriverCovered': this.coverDetails.controls['paPaidDriver'].value ? 'true' : 'false',
          // 'IsRoadTaxcover': this.coverDetails.controls['IsRoadTaxcover'].value ? 'true' : 'false',
          "ElectricItems": {
            "ElectricalItems": {
              "ElectricalItemsID": "",
              "PolicyId": "",
              "SerialNo": "",
              "MakeModel": "",
              "ElectricPremium": "",
              "Description": "",
              "ElectricalAccessorySlNo": "",
              "SumInsured": this.coverDetails.controls['ElectricalItemsTotalSI'].value
            }
          },
          "VoluntaryDeductible": {
            "VoluntaryDeductible": {
              "IsMandatory": this.coverDetails.controls['IsVoluntaryDeductableOpted'].value ? 'true' : 'false',
              "PolicyCoverID": "",
              "SumInsured": this.coverDetails.controls['VoluntaryDeductableAmount'].value ,
              "IsChecked": this.coverDetails.controls['IsVoluntaryDeductableOpted'].value ? 'true' : 'false',
              "NoOfItems": "",
              "PackageName": ""
            }
          },
          // "TPPDCover": {
          //   "TPPDCover":{
          //     "SumInsured": this.coverDetails.controls['TPPDCoverSi'].value
          //   }
          // },
          "NonElectricItems": {
            "NonElectricalItems": {
              "NonElectricalItemsID": "",
              "PolicyID": "",
              "SerialNo": "",
              "MakeModel": "",
              "NonElectricPremium": "",
              "Description": "",
              "Category": "",
              "NonElectricalAccessorySlNo": "",
              "SumInsured": this.coverDetails.controls['NonElectricalItemsTotalSI'].value
            }
          },
          "BasicODCoverage": {
            "BasicODCoverage": {
              "IsMandatory": this.coverDetails.controls['BasicODCoverage'].value ? 'true' : 'false',
              "IsChecked": this.coverDetails.controls['BasicODCoverage'].value ? 'true' : 'false',
              "NoOfItems": "",
              "PackageName": ""
            }
          },

          "BifuelKit": {
            "BifuelKit": {
              "IsChecked": this.coverDetails.controls['IsBiFuelKit'].value ? 'true' : 'false',
              "IsMandatory": this.coverDetails.controls['IsBiFuelKit'].value ? 'true' : 'false',
              "PolicyCoverDetailsID": "",
              "Fueltype": this.coverDetails.controls['bifueltype'].value ,
              "ISLpgCng": this.coverDetails.controls['cpgLpgKit'].value? 'true' : 'false' ,
              "PolicyCoverID": "",
              "SumInsured": this.coverDetails.controls['BiFuelKitSi'].value,
              "NoOfItems": "",
              "PackageName": ""
            }
          },
          'PACoverToOwner': {
            'PACoverToOwner': {
              'IsChecked': this.coverDetails.controls['PAToOwnerDriverCoverd'].value ? 'true' : 'false',
              'IsMandatory': this.coverDetails.controls['PAToOwnerDriverCoverd'].value ? 'true' : 'false',
              'NoOfItems': '1',
              'PackageName': '',
              "CPAcovertenure": "1",
              'AppointeeName': this.coverDetails.controls['cappointeeName'].value,
              'NomineeName': this.coverDetails.controls['cnomineeName'].value,
              'NomineeDOB': this.coverDetails.controls['cnDob'].value,
              'NomineeRelationship': this.coverDetails.controls['nrelation'].value,
              'NomineeAddress': this.coverDetails.controls['cnAddress'].value,
              'OtherRelation': this.coverDetails.controls['nOtherRelation'].value
            }
          },
          'PAToUnNamedPassenger': {
            'PAToUnNamedPassenger': {
              'IsChecked': this.coverDetails.controls['UnnamedPassengerCovered'].value ? 'true' : 'false',
              'NoOfItems': this.coverDetails.controls['NoOfUnnamedPassenegersCovered'].value,
              'SumInsured': this.coverDetails.controls['UnnamedPassengersSI'].value
            }
          },
          "AntiTheftDeviceDiscount": {
            "AntiTheftDeviceDiscount": {
              "IsMandatory": this.coverDetails.controls['AntiTheftDeviceFitted'].value ? 'true' : 'false',
              "IsChecked": this.coverDetails.controls['AntiTheftDeviceFitted'].value ? 'true' : 'false',
              "NoOfItems": "",
              "PackageName": ""
            }
          },
          // "PAToNamedPassenger": {
          //   "PAToNamedPassenger": {
          //     "IsMandatory": this.coverDetails.controls['PAToNamedPassenger'].value ? 'true' : 'false',
          //     "IsChecked": this.coverDetails.controls['PAToNamedPassenger'].value ? 'true' : 'false',
          //     "NoOfItems": this.coverDetails.controls['NonamedPassenegers'].value,
          //     "PackageName": "",
          //     "SumInsured": this.coverDetails.controls['namedPassengersSI'].value,
          //     "PassengerName": this.coverDetails.controls['nppassengerName'].value,
          //     "NomineeName": this.coverDetails.controls['npnomineeName'].value,
          //     "NomineeDOB": this.coverDetails.controls['npDob'].value,
          //     "NomineeRelationship": this.coverDetails.controls['nprelation'].value,
          //     "NomineeAddress": this.coverDetails.controls['npAddress'].value,
          //     "OtherRelation": this.coverDetails.controls['npOtherRelation'].value,
          //     "AppointeeName": this.coverDetails.controls['npappointeeName'].value
          //   }
          // },
          // 'PAToPaidDriver': {
          //   'PAToPaidDriver': {
          //     'IsChecked': this.coverDetails.controls['paPaidDriver'].value ? 'true' : 'false',
          //     'NoOfItems': '1',
          //     'SumInsured': this.coverDetails.controls['paPaidDriverSi'].value
          //   }
          // },
          "AutomobileAssociationMembershipDiscount": {
            "AutomobileAssociationMembershipDiscount": {
              "IsMandatory": this.coverDetails.controls['AutomobileAssociationMember'].value ? 'true' : 'false',
              "IsChecked": this.coverDetails.controls['AutomobileAssociationMember'].value ? 'true' : 'false',
              "NoOfItems": "",
              "PackageName": ""
            }
          },
          'PAToPaidCleaner': '',
          'LiabilityToPaidDriver': {
            'LiabilityToPaidDriver': {
              'NoOfItems': '1'
            }
          },
          'NilDepreciationCoverage': {
            'NilDepreciationCoverage': {
              'IsMandatory': this.coverDetails.controls['NilDepreciationCoverage'].value ? 'true' : 'false',
              'IsChecked': this.coverDetails.controls['NilDepreciationCoverage'].value ? 'true' : 'false',
              'NoOfItems': '',
              'PackageName': '',
              'PolicyCoverID': '',
              'ApplicableRate': '1.0',
            }
          }
        }
      }
    }
    this.fourWheelerInsurance.coverPremium(data).subscribe(
        (successData) => {
          this.coverPreSuccess(successData);
        },
        (error) => {
          this.coverPreFailure(error);
        }
    );
  }
  public coverPreSuccess(successData) {
    if (successData.IsSuccess) {
      this.coverListValue = successData.ResponseObject;
      console.log(this.coverListValue,'coverListValue......');
      this.nil_depreciation=this.coverListValue.coverlist[0].nil_depreciation;
      console.log(this.nil_depreciation,'this.nil_depreciation....');

      this.basic_od=this.coverListValue.coverlist[0].basic_od;
      console.log(this.basic_od,'this.basic_od....');

      this.electrical_accessories=this.coverListValue.coverlist[0].electrical_accessories;
      console.log(this.electrical_accessories,'this.electrical_accessories....');

      this.non_electrical_accessories=this.coverListValue.coverlist[0].non_electrical_accessories;
      console.log(this.non_electrical_accessories,'this.non_electrical_accessories...');

      this.Anti_theft=this.coverListValue.coverlist[0].Anti_theft;
      console.log(this.Anti_theft,'this.Anti_theft....');

      this.automobile_association=this.coverListValue.coverlist[0].automobile_association;
      console.log(this.automobile_association,'this.automobile_association....');

      this.Liability_paid_driver=this.coverListValue.coverlist[0].Liability_paid_driver;
      console.log(this.Liability_paid_driver,'this.Liability_paid_driver....');

      this.basic_liability=this.coverListValue.coverlist[0].basic_liability;
      console.log(this.basic_liability,'this.basic_liability....');

      this.pa_unnamed_passenger=this.coverListValue.coverlist[0].pa_unnamed_passenger;
      console.log(this.pa_unnamed_passenger,'this.pa_unnamed_passenger....');

      this.voluntary_deductible=this.coverListValue.coverlist[0].voluntary_deductible;
      console.log(this.voluntary_deductible,'this.voluntary_deductible....');

      this.pa_owner_driver=this.coverListValue.coverlist[0].pa_owner_driver;
      console.log(this.pa_owner_driver,'this.pa_owner_driver....');
      this.Bifuel_Kit=this.coverListValue.coverlist[0].Bifuel_Kit;
      // alert(this.Bifuel_Kit)
      console.log(this.Bifuel_Kit,'this.Bifuel_Kit....');
      console.log(this.unnamedList,'valueOfPermium....');
      this.changeValueUnpass();
      this.changeOwnerDriver();
      this.changeDepreciation();
      this.changeVoluntary();
      this.changeElect();
      this.changeNonElect();
      this.changeLiabilityToPaidCoverage();
      this.changeAssociationCoverage();
      this.changeAntiTheftCoverage();
      this.changeBasicODCoverage();
      this.changeBasicLiabilityCoverage();
      this.changeBifuel();



    }
    else{
      this.toastr.error(successData.ErrorObject);
    }
  }
  public coverPreFailure(error) {
  }


  /// create proposal
  createProposal(stepper,value) {

    // console.log(this.riskDetails.controls.IDV.value,'idvkjkljkjklj');

    // stepper.next();
    this.topScroll();
    if (this.buyProduct.business_type !=1) {
      sessionStorage.stepper4Details = '';
      sessionStorage.stepper4Details = JSON.stringify(value);
    }
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
      'enquiry_id': this.bikeEnquiryId,
      'created_by': '',
      'proposal_id': sessionStorage.relianceFourwheelerproposalID == '' || sessionStorage.relianceFourwheelerproposalID == undefined ? '' : sessionStorage.relianceFourwheelerproposalID,
      'motorproposalObj': {
        'CoverDetails': '',
        'TrailerDetails': '',
        'ClientDetails': {
          'ClientType': this.relianceProposal.controls['clientType'].value,
          'CorporateName':this.relianceProposal.controls['corporateName'].value,
          'LastName': this.relianceProposal.controls['lastName'].value,
          'MidName': this.relianceProposal.controls['middleName'].value,
          'ForeName': this.relianceProposal.controls['firstName'].value,
          'OccupationID': this.relianceProposal.controls['occupation'].value,
          'DOB': this.datepipe.transform(this.relianceProposal.controls['dob'].value, 'y-MM-dd'),
          'Gender': this.relianceProposal.controls['gender'].value,
          'PhoneNo': this.relianceProposal.controls['alternateContact'].value,
          'MobileNo': this.relianceProposal.controls['mobile'].value,
          'RegisteredUnderGST': '0',
          'RelatedParty': '0',
          // 'GSTIN': this.relianceProposal.controls['gstNumber'].value,
          'GroupCorpID': '',
          'ClientAddress': {
            'CommunicationAddress': {
              'AddressType': '0',
              'Address1': this.relianceProposal.controls['address'].value,
              'Address2': this.relianceProposal.controls['address2'].value,
              'Address3': this.relianceProposal.controls['address3'].value,
              'CityID': this.relianceProposal.controls['cityId'].value,
              'DistrictID': this.relianceProposal.controls['districtId'].value,
              'StateID': this.relianceProposal.controls['stateId'].value,
              'Pincode': this.relianceProposal.controls['pincode'].value,
              'Country': '1',
              'NearestLandmark': this.relianceProposal.controls['landmark'].value
            },
            'PermanentAddress': {
              'AddressType': '0',
              'Address1': this.relianceProposal.controls['paddress'].value,
              'Address2': this.relianceProposal.controls['paddress2'].value,
              'Address3': this.relianceProposal.controls['paddress3'].value,
              'CityID': this.relianceProposal.controls['pcityId'].value,
              'DistrictID': this.relianceProposal.controls['pdistrictId'].value,
              'StateID': this.relianceProposal.controls['pstateId'].value,
              'Pincode': this.relianceProposal.controls['ppincode'].value,
              'Country': '1',
              'NearestLandmark': this.relianceProposal.controls['plandmark'].value
            },
            'RegistrationAddress': {
              'AddressType': '0',
              'Address1': this.relianceProposal.controls['raddress'].value,
              'Address2': this.relianceProposal.controls['raddress2'].value,
              'Address3': this.relianceProposal.controls['paddress3'].value,
              'CityID': this.relianceProposal.controls['rcityId'].value,
              'DistrictID': this.relianceProposal.controls['rdistrictId'].value,
              'StateID': this.relianceProposal.controls['rstateId'].value,
              'Pincode': this.relianceProposal.controls['rpincode'].value,
              'Country': '1',
              'NearestLandmark': this.relianceProposal.controls['rlandmark'].value
            },
            'InspectionAddress':{}
          },
          'EmailID': this.relianceProposal.controls['email'].value,
          'Salutation': this.relianceProposal.controls['title'].value==''?'M/S':this.relianceProposal.controls['title'].value,
          'MaritalStatus': this.relianceProposal.controls['maritalStatus'].value,
          'Nationality': this.relianceProposal.controls['nationality'].value
        },
        'Policy': {

          'AgentName': 'Direct',
          'OtherSystemName': this.riskDetails.controls['OtherSystemName'].value

        },
        'Risk': {
          'IDV': this.riskDetails.controls['IDV'].value.toString(),
          'IsVehicleHypothicated': this.riskDetails.controls['IsVehicleHypothicated'].value ? 'true' : 'false',
          'FinanceType': this.riskDetails.controls['FinanceType'].value,
          'FinancierName': this.riskDetails.controls['FinancierName'].value,
          'FinancierAddress': this.riskDetails.controls['FinancierAddress'].value,
          'IsRegAddressSameasCommAddress': this.relianceProposal.controls['regSameAscommAddress'].value ? 'true' : 'false',
          'IsRegAddressSameasPermanentAddress': this.relianceProposal.controls['regSameAspermAddress'].value ? 'true' : 'false',
          'IsPermanentAddressSameasCommAddress': this.relianceProposal.controls['sameAsAddress'].value ? 'true' : 'false',
          'IsInspectionAddressSameasCommAddress': this.relianceProposal.controls['inspSameAscommAddress'].value ? 'true' : 'false',
        },
        'Vehicle': {
          },
        'Cover': {
          // 'IsPAToUnnamedPassengerCovered': this.coverDetails.controls['UnnamedPassengerCovered'].value ,
          'IsPAToUnnamedPassengerCovered': this.coverDetails.controls['UnnamedPassengerCovered'].value ? 'true' : 'false',
          'NoOfUnnamedPassenegersCovered': this.coverDetails.controls['NoOfUnnamedPassenegersCovered'].value ,
          'IsAutomobileAssociationMember': this.coverDetails.controls['AutomobileAssociationMember'].value ? 'true' : 'false',
          'IsPAToOwnerDriverCoverd': this.coverDetails.controls['PAToOwnerDriverCoverd'].value ? 'true' : 'false',
          'IsLiabilityToPaidDriverCovered': this.coverDetails.controls['LiabilityToPaidDriverCovered'].value ? 'true' : 'false',
          'IsAntiTheftDeviceFitted': this.coverDetails.controls['AntiTheftDeviceFitted'].value ? 'true' : 'false',
          // 'IsTPPDCover': this.coverDetails.controls['TPPDCover'].value ? 'true' : 'false',
          'IsBasicODCoverage': this.coverDetails.controls['BasicODCoverage'].value ? 'true' : 'false',
          'IsBasicLiability': this.coverDetails.controls['BasicLiability'] ? 'true' : 'false',
          // 'IsInsurancePremium': this.coverDetails.controls['InsurancePremium'] ? 'true' : 'false',
          'UnnamedPassengersSI': this.coverDetails.controls['UnnamedPassengersSI'].value,
          'IsNilDepreciation': this.coverDetails.controls['NilDepreciationCoverage'].value ? 'true' : 'false',
          'IsVoluntaryDeductableOpted': this.coverDetails.controls['IsVoluntaryDeductableOpted'].value ? 'true' : 'false',
          'VoluntaryDeductableAmount': this.coverDetails.controls['VoluntaryDeductableAmount'].value,
          'IsElectricalItemFitted': this.coverDetails.controls['IsElectricalItemFitted'].value ? 'true' : 'false',
          'ElectricalItemsTotalSI': this.coverDetails.controls['ElectricalItemsTotalSI'].value,
          'IsNonElectricalItemFitted': this.coverDetails.controls['IsNonElectricalItemFitted'].value ? 'true' : 'false',
          'NonElectricalItemsTotalSI': this.coverDetails.controls['NonElectricalItemsTotalSI'].value,
          'IsBiFuelKit': this.coverDetails.controls['IsBiFuelKit'].value ? 'true' : 'false',
          'BiFuelKitSi': this.coverDetails.controls['BiFuelKitSi'].value,
          // 'IsPAToNamedPassenger': this.coverDetails.controls['PAToNamedPassenger'].value ? 'true' : 'false',
          // 'IsPAToDriverCovered': this.coverDetails.controls['IsPAToDriverCovered'].value ? 'true' : 'false',



          // 'IsTotalCover': this.coverDetails.controls['IsTotalCover'].value ? 'true' : 'false',
          'IsRoadTaxcover': this.coverDetails.controls['IsRoadTaxcover'].value ? 'true' : 'false',
          'IsRegistrationCover': this.coverDetails.controls['IsRegistrationCover'].value ? 'true' : 'false',
          "IsInsurancePremium": this.coverDetails.controls['InsurancePremium'].value ? 'true' : 'false',
          "ElectricItems": {
            "ElectricalItems": {
              "ElectricalItemsID": "",
              "PolicyId": "",
              "SerialNo": "",
              "MakeModel": "",
              "ElectricPremium": "",
              "Description": "",
              "ElectricalAccessorySlNo": "",
              "SumInsured": this.coverDetails.controls['ElectricalItemsTotalSI'].value
            }
          },
          "NonElectricItems": {
            "NonElectricalItems": {
              "NonElectricalItemsID": "",
              "PolicyID": "",
              "SerialNo": "",
              "MakeModel": "",
              "NonElectricPremium": "",
              "Description": "",
              "Category": "",
              "NonElectricalAccessorySlNo": "",
              "SumInsured": this.coverDetails.controls['NonElectricalItemsTotalSI'].value
            }
          },
          "BasicODCoverage": {
            "BasicODCoverage": {
              "IsMandatory": this.coverDetails.controls['BasicODCoverage'].value ? 'true' : 'false',
              "IsChecked": this.coverDetails.controls['BasicODCoverage'].value ? 'true' : 'false',
              "NoOfItems": "",
              "PackageName": ""
            }
          },
          "BifuelKit": {
            "BifuelKit": {
              "IsChecked": this.coverDetails.controls['IsBiFuelKit'].value ? 'true' : 'false',
              "IsMandatory": this.coverDetails.controls['IsBiFuelKit'].value ? 'true' : 'false',
              "PolicyCoverDetailsID": "",
              "Fueltype": this.coverDetails.controls['bifueltype'].value,
              "ISLpgCng": this.coverDetails.controls['cpgLpgKit'].value ?'true' : 'false',
              "PolicyCoverID": "",
              "SumInsured": this.coverDetails.controls['BiFuelKitSi'].value,
              "NoOfItems": "",
              "PackageName": ""
            }
          },
          "VoluntaryDeductible": {
            "VoluntaryDeductible": {
              "IsMandatory": this.coverDetails.controls['IsVoluntaryDeductableOpted'].value ? 'true' : 'false',
              "PolicyCoverID": "",
              "SumInsured": this.coverDetails.controls['VoluntaryDeductableAmount'].value,
              "IsChecked": this.coverDetails.controls['IsVoluntaryDeductableOpted'].value ? 'true' : 'false',
              "NoOfItems": "",
              "PackageName": ""
            }
          },
          "NilDepreciationCoverage": {
            "NilDepreciationCoverage": {
              "IsMandatory": this.coverDetails.controls['NilDepreciationCoverage'].value ? 'true' : 'false',
              "IsChecked": this.coverDetails.controls['NilDepreciationCoverage'].value ? 'true' : 'false',
              "NoOfItems": "",
              "PackageName": "",
              "PolicyCoverID": "",
              "ApplicableRate": "1.0",
            }
          },
          "PACoverToOwner": {
            "PACoverToOwner": {
              'IsChecked': this.coverDetails.controls['PAToOwnerDriverCoverd'].value ? 'true' : 'false',
              'NoOfItems': '',
              'PackageName': '',
              'AppointeeName': this.coverDetails.controls['cappointeeName'].value,
              'NomineeName': this.coverDetails.controls['cnomineeName'].value,
              'NomineeDOB': this.datepipe.transform(this.coverDetails.controls['cnDob'].value, 'y-MM-dd'),
              'NomineeRelationship': this.coverDetails.controls['nrelation'].value,
              'NomineeAddress': this.coverDetails.controls['cnAddress'].value,
              'OtherRelation': this.coverDetails.controls['nOtherRelation'].value
            }
          },
          // "PAToNamedPassenger": {
          //   "PAToNamedPassenger": {
          //     "IsMandatory": this.coverDetails.controls['PAToNamedPassenger'].value ? 'true' : 'false',
          //     "IsChecked": this.coverDetails.controls['PAToNamedPassenger'].value ? 'true' : 'false',
          //     "NoOfItems": "1",
          //     "PackageName": "",
          //     "SumInsured": this.coverDetails.controls['namedPassengersSI'].value,
          //     "PassengerName": this.coverDetails.controls['nppassengerName'].value,
          //     "NomineeName": this.coverDetails.controls['npnomineeName'].value,
          //     "NomineeDOB": this.datepipe.transform(this.coverDetails.controls['npDob'].value, 'y-MM-dd'),
          //     "NomineeRelationship": this.coverDetails.controls['nprelation'].value,
          //     "NomineeAddress": this.coverDetails.controls['npAddress'].value,
          //     "OtherRelation": this.coverDetails.controls['npOtherRelation'].value,
          //     "AppointeeName": this.coverDetails.controls['npappointeeName'].value
          //   }
          // },
          "PAToUnNamedPassenger": {
            "PAToUnNamedPassenger": {
              "IsChecked": this.coverDetails.controls['UnnamedPassengerCovered'].value ? 'true' : 'false',
              "NoOfItems": this.coverDetails.controls['NoOfUnnamedPassenegersCovered'].value,
              "SumInsured": this.coverDetails.controls['UnnamedPassengersSI'].value
            }
          },
          // "PAToPaidDriver": {
          //   "PAToPaidDriver": {
          //     "SumInsured": this.coverDetails.controls['IsPAToDriverCoveredSi'].value
          //   }
          // },
          // "TotalCover": {
          //   "TotalCover": {
          //     "IsMandatory": "true",
          //     "IsChecked": this.coverDetails.controls['IsTotalCover'].value ? 'true' : 'false',
          //     "NoOfItems": "",
          //     "PackageName": ""
          //   }
          // },
          // "RegistrationCost": {
          //   "RegistrationCost": {
          //     "IsMandatory": this.coverDetails.controls['IsTotalCover'].value ? 'true' : 'false',
          //     "IsChecked": this.coverDetails.controls['IsRegistrationCover'].value ? 'true' : 'false',
          //     "SumInsured": this.coverDetails.controls['registrationSI'].value,
          //     "NoOfItems": "",
          //     "PackageName": ""
          //   }
          // },
          // "RoadTax": {
          //   "RoadTax": {
          //     "IsMandatory": this.coverDetails.controls['IsTotalCover'].value ? 'true' : 'false',
          //     "IsChecked": this.coverDetails.controls['IsRoadTaxcover'].value ? 'true' : 'false',
          //     "NoOfItems": "",
          //     "PackageName": "",
          //     "SumInsured": this.coverDetails.controls['roadtaxSI'].value,
          //     "PolicyCoverID": ""
          //   }
          // },
          // "InsurancePremium": {
          //   "InsurancePremium": {
          //     "IsMandatory": this.coverDetails.controls['IsTotalCover'].value ? 'true' : 'false',
          //     "IsChecked": this.coverDetails.controls['InsurancePremium'].value ? 'true' : 'false',
          //     "NoOfItems": "",
          //     "PackageName": "",
          //     "SumInsured": this.coverDetails.controls['insuranceSI'].value
          //   }
          // },
          "PAToPaidCleaner": "",
          "LiabilityToPaidDriver": {
            "LiabilityToPaidDriver": {
              "NoOfItems": "1"
            }
          }
        },
        //   'PAToNamedPassenger': '',
        //   'PAToUnNamedPassenger': {
        //     'PAToUnNamedPassenger': {
        //       'IsChecked': 'false',
        //       'NoOfItems': '0',
        //       'SumInsured': '0'
        //     }
        //   },
        //   'PAToPaidDriver': {
        //     'PAToPaidDriver': {
        //       'IsChecked': '',
        //       'NoOfItems': '',
        //       'SumInsured': ''
        //     }
        //   },
        //   'PAToPaidCleaner': '',
        //   'LiabilityToPaidDriver': {
        //     'LiabilityToPaidDriver': {
        //       'NoOfItems': '1'
        //     }
        //   }
        // },
        'PreviousInsuranceDetails': { }
      }
    };

    if(this.buyProduct.business_type ==6){
      data.motorproposalObj.ClientDetails.ClientAddress.InspectionAddress = {
        'AddressType': '0',
        'Address1': this.relianceProposal.controls['iaddress'].value,
        'Address2': this.relianceProposal.controls['iaddress2'].value,
        'Address3': this.relianceProposal.controls['iaddress3'].value,
        'CityID': this.relianceProposal.controls['icityId'].value,
        'DistrictID': this.relianceProposal.controls['idistrictId'].value,
        'StateID': this.relianceProposal.controls['istateId'].value,
        'Pincode': this.relianceProposal.controls['ipincode'].value,
        'Country': '1',
        'NearestLandmark': this.relianceProposal.controls['ilandmark'].value
      }
    }else{
      data.motorproposalObj.ClientDetails.ClientAddress.InspectionAddress = {}
      }

    if (this.buyProduct.business_type ==6) {
      data.motorproposalObj.Vehicle ={
        'TypeOfFuel': this.coverDetails.controls['fuelType'].value,
        'InspectionNo': this.coverDetails.controls['inspectionNo'].value
      }
    }else{
      data.motorproposalObj.Vehicle ={
        'TypeOfFuel': this.coverDetails.controls['fuelType'].value,
      }
    }

    if(this.buyProduct.business_type == 2 || this.buyProduct.business_type == 5){
      data.motorproposalObj.PreviousInsuranceDetails = {
        'PrevInsuranceID': '',
        // 'IsVehicleOfPreviousPolicySold': this.previousInsurance.controls['prevPolSold'].value ? 'true' : 'false',
        'PrevYearInsurer': this.previousInsurance.controls['prevInsurance'].value,
        'PrevYearPolicyNo': this.previousInsurance.controls['policyNumber'].value,
        'PrevYearInsurerAddress': this.previousInsurance.controls['prevInsurerAddress'].value,
        'PrevYearPolicyType': this.previousInsurance.controls['prevYearPolicyType'].value,
        'InspectionID': this.previousInsurance.controls['inspectionId'].value,
        'InspectionDate': this.datepipe.transform(this.previousInsurance.controls['inspectionDate'].value, 'y-MM-dd'),
        'IsInspectionDone': this.previousInsurance.controls['inspectionDone'].value
      }
    }else {
      data.motorproposalObj.PreviousInsuranceDetails = {
        'PrevInsuranceID': '',
        // 'IsVehicleOfPreviousPolicySold': this.previousInsurance.controls['prevPolSold'].value ? 'true' : 'false',
        'PrevYearInsurer': this.previousInsurance.controls['prevInsurance'].value,
        'PrevYearPolicyNo': this.previousInsurance.controls['policyNumber'].value,
        'PrevYearInsurerAddress': this.previousInsurance.controls['prevInsurerAddress'].value,
        'PrevYearPolicyType': this.previousInsurance.controls['prevYearPolicyType'].value
        // 'PrevYearPolicyStartDate': this.previousInsurance.controls['prevPolStartDate'].value

      }
    }

    console.log(data,'datavalue');



    if(this.buyProduct.business_type == 1){
      if (this.coverDetails.valid) {
        this.setting.loadingSpinner = true;
        this.fourWheelerInsurance.fourWheelergetProposal(data).subscribe(
            (successData) => {
              this.getProposalSucccess(successData, stepper);
            },
            (error) => {
              this.getProposalFailure(error);
            }
        );
        console.log(data, 'data');
      }
    }else{
      if (this.previousInsurance.valid) {
        this.setting.loadingSpinner = true;
        this.fourWheelerInsurance.fourWheelergetProposal(data).subscribe(
            (successData) => {
              this.getProposalSucccess(successData, stepper);
            },
            (error) => {
              this.getProposalFailure(error);
            }
        );
        console.log(data, 'data');
      }
    }
  }

  getProposalSucccess(successData,stepper) {
    this.setting.loadingSpinner = false;
    if (successData.IsSuccess) {
      this.toastr.success('Proposal created successfully!!');
      this.summaryData = successData.ResponseObject;
      console.log(this.summaryData,'this.summaryData....');
      sessionStorage.summaryData = JSON.stringify(this.summaryData);
      this.proposalId = this.summaryData.productlist.proposal_id;
      this.gstAmount=this.summaryData.productlist.gst;
      console.log(this.gstAmount,'this.gstAmount..');
      this.discountAmount=this.summaryData.productlist.discount;
      console.log(this.discountAmount,'this.gstAmount..');
      sessionStorage.relianceFourwheelerproposalID = this.proposalId;
      this.PaymentRedirect =   this.summaryData.productlist.PaymentRedirectUrl;

      this.proposerFormData = this.relianceProposal.value;
      this.riskFormData = this.riskDetails.value;
      console.log(this.riskFormData,'RISKDATA')
      this.coverFormData = this.coverDetails.value;
      console.log(this.coverFormData,'coverformdata');
      this.previousFormData = this.previousInsurance.value;
      sessionStorage.proposerFormData = JSON.stringify(this.proposerFormData);
      console.log(this.previousFormData,'prevdata');
      // sessionStorage.insuredFormData = JSON.stringify(this.insuredFormData);
      stepper.next();
      this.topScroll();
      // this.nextStep();

    } else {
      this.setting.loadingSpinner = false;
      if(successData.type == 'idv') {
        sessionStorage.changeIdvDetail = JSON.stringify(successData.ResponseObject);
        let dialogRef = this.dialog.open(idvvalidate, {
          width: '700px',
        });
        dialogRef.disableClose = true;
        dialogRef.afterClosed().subscribe(result=> {
          console.log(result,'inresult');
          this.riskDetails.controls.IDV.patchValue(result.submitedIdv.toString());
          this.coverDetails.controls['registrationSI'].patchValue(result.calValue.toString());
          this.coverDetails.controls['roadtaxSI'].patchValue(result.calValue.toString());
          this.coverDetails.controls['insuranceSI'].patchValue(result.calValue.toString());
          this.createProposal(stepper, this.previousInsurance.value)

          // this.idvCalculateDetails(result,'popupValue');
          // if (this.popupValue){
          //   this.createProposal(stepper, this.previousInsurance.value)
          // }else {
          //   this.toastr.error('Given SI Amount should be less than ' + this.sicoverValue);
          // }
        });
      }else{
        this.toastr.error(successData.ErrorObject);
      }
    }
  }

  getProposalFailure(error) {

  }

  //pincode  details
  pincode(pin,type){
    console.log(pin,'pinvalue');
    const data = {
      'platform': 'web',
      'pincode': pin
    };
    if (pin.length == 6) {
      this.fourWheelerInsurance.fourWheelergetrPincodeList(data).subscribe(
          (successData) => {
            this.pinListSuccess(successData,type);
          },
          (error) => {
            this.pinListFailure(error);
          }
      );
    }
  }
  pinListSuccess(successData,type) {
    if (successData.IsSuccess){
      if (type == 'comm') {
        this.commAddressList = successData.ResponseObject;
        this.relianceProposal.controls['city'].patchValue(this.commAddressList.city_village_name);
        this.relianceProposal.controls['cityId'].patchValue(this.commAddressList.city_village_id);
        this.relianceProposal.controls['state'].patchValue(this.commAddressList.state_name);
        this.relianceProposal.controls['stateId'].patchValue(this.commAddressList.state_id);
        this.relianceProposal.controls['district'].patchValue(this.commAddressList.district_name);
        this.relianceProposal.controls['districtId'].patchValue(this.commAddressList.district_id);
      }else if(type == 'perm'){
        this.perAddressList = successData.ResponseObject;
        this.relianceProposal.controls['pcity'].patchValue(this.perAddressList.city_village_name);
        this.relianceProposal.controls['pcityId'].patchValue(this.perAddressList.city_village_id);
        this.relianceProposal.controls['pstate'].patchValue(this.perAddressList.state_name);
        this.relianceProposal.controls['pstateId'].patchValue(this.perAddressList.state_id);
        this.relianceProposal.controls['pdistrict'].patchValue(this.perAddressList.district_name);
        this.relianceProposal.controls['pdistrictId'].patchValue(this.perAddressList.district_id);
      }else if(type == 'registration'){
        this.regAddressList = successData.ResponseObject;
        this.relianceProposal.controls['rcity'].patchValue(this.regAddressList.city_village_name);
        this.relianceProposal.controls['rcityId'].patchValue(this.regAddressList.city_village_id);
        this.relianceProposal.controls['rstate'].patchValue(this.regAddressList.state_name);
        this.relianceProposal.controls['rstateId'].patchValue(this.regAddressList.state_id);
        this.relianceProposal.controls['rdistrict'].patchValue(this.regAddressList.district_name);
        this.relianceProposal.controls['rdistrictId'].patchValue(this.regAddressList.district_id);
      }else if(type == 'inspection'){
        this.inspectionAddressList = successData.ResponseObject;
        this.relianceProposal.controls['icity'].patchValue(this.inspectionAddressList.city_village_name);
        this.relianceProposal.controls['icityId'].patchValue(this.inspectionAddressList.city_village_id);
        this.relianceProposal.controls['istate'].patchValue(this.inspectionAddressList.state_name);
        this.relianceProposal.controls['istateId'].patchValue(this.inspectionAddressList.state_id);
        this.relianceProposal.controls['idistrict'].patchValue(this.inspectionAddressList.district_name);
        this.relianceProposal.controls['idistrictId'].patchValue(this.inspectionAddressList.district_id);
      }
    } else if (successData.IsSuccess != true ){
      if (type == 'comm') {
        this.toastr.error('Fill Valid Pincode');
        this.relianceProposal.controls['city'].patchValue('');
        this.relianceProposal.controls['cityId'].patchValue('');
        this.relianceProposal.controls['state'].patchValue('');
        this.relianceProposal.controls['stateId'].patchValue('');
        this.relianceProposal.controls['district'].patchValue('');
        this.relianceProposal.controls['districtId'].patchValue('');
      }else if (type == 'perm'){
        this.toastr.error('Fill Valid Pincode');
        this.relianceProposal.controls['pcity'].patchValue('');
        this.relianceProposal.controls['pcityId'].patchValue('');
        this.relianceProposal.controls['pstate'].patchValue('');
        this.relianceProposal.controls['pstateId'].patchValue('');
        this.relianceProposal.controls['pdistrict'].patchValue('');
        this.relianceProposal.controls['pdistrictId'].patchValue('');
      }else if (type == 'registration'){
        this.toastr.error('Fill Valid Pincode');
        this.relianceProposal.controls['rcity'].patchValue('');
        this.relianceProposal.controls['rcityId'].patchValue('');
        this.relianceProposal.controls['rstate'].patchValue('');
        this.relianceProposal.controls['rstateId'].patchValue('');
        this.relianceProposal.controls['rdistrict'].patchValue('');
        this.relianceProposal.controls['rdistrictId'].patchValue('');
      }else if (type == 'inspection'){
        this.toastr.error('Fill Valid Pincode');
        this.relianceProposal.controls['icity'].patchValue('');
        this.relianceProposal.controls['icityId'].patchValue('');
        this.relianceProposal.controls['istate'].patchValue('');
        this.relianceProposal.controls['istateId'].patchValue('');
        this.relianceProposal.controls['idistrict'].patchValue('');
        this.relianceProposal.controls['idistrictId'].patchValue('');
      }
    }

  }
  pinListFailure(error){

  }


  // same as address

  sameAsAddress(type) {
    console.log(this.relianceProposal.controls['regSameAspermAddress'].value,'regperm');
    console.log(this.relianceProposal.controls['regSameAscommAddress'].value,'regcomm');

    if(type == 'pcomm') {
      if (this.relianceProposal.controls['sameAsAddress'].value) {
        this.pcommReadOnly = true;
        this.relianceProposal.controls['paddress'].patchValue(this.relianceProposal.controls['address'].value);
        this.relianceProposal.controls['paddress2'].patchValue(this.relianceProposal.controls['address2'].value);
        this.relianceProposal.controls['paddress3'].patchValue(this.relianceProposal.controls['address3'].value);
        this.relianceProposal.controls['pcity'].patchValue(this.relianceProposal.controls['city'].value);
        this.relianceProposal.controls['pcityId'].patchValue(this.relianceProposal.controls['cityId'].value);
        this.relianceProposal.controls['ppincode'].patchValue(this.relianceProposal.controls['pincode'].value);
        this.relianceProposal.controls['pstate'].patchValue(this.relianceProposal.controls['state'].value);
        this.relianceProposal.controls['pstateId'].patchValue(this.relianceProposal.controls['stateId'].value);
        this.relianceProposal.controls['pdistrict'].patchValue(this.relianceProposal.controls['district'].value);
        this.relianceProposal.controls['pdistrictId'].patchValue(this.relianceProposal.controls['districtId'].value);
        this.relianceProposal.controls['plandmark'].patchValue(this.relianceProposal.controls['landmark'].value);
      }else{
        this.pcommReadOnly = false;
        this.relianceProposal.controls['paddress'].patchValue('');
        this.relianceProposal.controls['paddress2'].patchValue('');
        this.relianceProposal.controls['paddress3'].patchValue('');
        this.relianceProposal.controls['pcity'].patchValue('');
        this.relianceProposal.controls['pcityId'].patchValue('');
        this.relianceProposal.controls['ppincode'].patchValue('');
        this.relianceProposal.controls['pstate'].patchValue('');
        this.relianceProposal.controls['pstateId'].patchValue('');
        this.relianceProposal.controls['pdistrict'].patchValue('');
        this.relianceProposal.controls['pdistrictId'].patchValue('');
        this.relianceProposal.controls['plandmark'].patchValue('');
      }
    }else if (type == 'regcomm'){
      if (this.relianceProposal.controls['regSameAscommAddress'].value ) {
        this.checkcomm = true;
        this.checkperm = false;
        this.relianceProposal.controls['regSameAspermAddress'].patchValue(false);
        this.relianceProposal.controls['raddress'].patchValue(this.relianceProposal.controls['address'].value);
        this.relianceProposal.controls['raddress2'].patchValue(this.relianceProposal.controls['address2'].value);
        this.relianceProposal.controls['raddress3'].patchValue(this.relianceProposal.controls['address3'].value);
        this.relianceProposal.controls['rcity'].patchValue(this.relianceProposal.controls['city'].value);
        this.relianceProposal.controls['rcityId'].patchValue(this.relianceProposal.controls['cityId'].value);
        this.relianceProposal.controls['rpincode'].patchValue(this.relianceProposal.controls['pincode'].value);
        this.relianceProposal.controls['rstate'].patchValue(this.relianceProposal.controls['state'].value);
        this.relianceProposal.controls['rstateId'].patchValue(this.relianceProposal.controls['stateId'].value);
        this.relianceProposal.controls['rdistrict'].patchValue(this.relianceProposal.controls['district'].value);
        this.relianceProposal.controls['rdistrictId'].patchValue(this.relianceProposal.controls['districtId'].value);
        this.relianceProposal.controls['rlandmark'].patchValue(this.relianceProposal.controls['landmark'].value);
      }else{
        this.relianceProposal.controls['raddress'].patchValue('');
        this.relianceProposal.controls['raddress2'].patchValue('');
        this.relianceProposal.controls['raddress3'].patchValue('');
        this.relianceProposal.controls['rcity'].patchValue('');
        this.relianceProposal.controls['rcityId'].patchValue('');
        this.relianceProposal.controls['rpincode'].patchValue('');
        this.relianceProposal.controls['rstate'].patchValue('');
        this.relianceProposal.controls['rstateId'].patchValue('');
        this.relianceProposal.controls['rdistrict'].patchValue('');
        this.relianceProposal.controls['rdistrictId'].patchValue('');
        this.relianceProposal.controls['rlandmark'].patchValue('');
      }
    }else if(type == 'regperm'){
      if (this.relianceProposal.controls['regSameAspermAddress'].value) {
        this.checkperm= true;
        this.checkcomm= false;
        this.relianceProposal.controls['regSameAscommAddress'].patchValue(false);
        this.relianceProposal.controls['raddress'].patchValue(this.relianceProposal.controls['paddress'].value);
        this.relianceProposal.controls['raddress2'].patchValue(this.relianceProposal.controls['paddress2'].value);
        this.relianceProposal.controls['raddress3'].patchValue(this.relianceProposal.controls['paddress3'].value);
        this.relianceProposal.controls['rcity'].patchValue(this.relianceProposal.controls['pcity'].value);
        this.relianceProposal.controls['rcityId'].patchValue(this.relianceProposal.controls['pcityId'].value);
        this.relianceProposal.controls['rpincode'].patchValue(this.relianceProposal.controls['ppincode'].value);
        this.relianceProposal.controls['rstate'].patchValue(this.relianceProposal.controls['pstate'].value);
        this.relianceProposal.controls['rstateId'].patchValue(this.relianceProposal.controls['pstateId'].value);
        this.relianceProposal.controls['rdistrict'].patchValue(this.relianceProposal.controls['pdistrict'].value);
        this.relianceProposal.controls['rdistrictId'].patchValue(this.relianceProposal.controls['pdistrictId'].value);
        this.relianceProposal.controls['rlandmark'].patchValue(this.relianceProposal.controls['plandmark'].value);
      }else{
        this.relianceProposal.controls['raddress'].patchValue('');
        this.relianceProposal.controls['raddress2'].patchValue('');
        this.relianceProposal.controls['raddress3'].patchValue('');
        this.relianceProposal.controls['rcity'].patchValue('');
        this.relianceProposal.controls['rcityId'].patchValue('');
        this.relianceProposal.controls['rpincode'].patchValue('');
        this.relianceProposal.controls['rstate'].patchValue('');
        this.relianceProposal.controls['rstateId'].patchValue('');
        this.relianceProposal.controls['rdistrict'].patchValue('');
        this.relianceProposal.controls['rdistrictId'].patchValue('');
        this.relianceProposal.controls['rlandmark'].patchValue('');
      }
    }else if (type == 'inspcomm'){
      if (this.relianceProposal.controls['inspSameAscommAddress'].value ) {
        // this.inspReadonly = true;
        // this.relianceProposal.controls['inspSameAscommAddress'].patchValue(false);
        this.relianceProposal.controls['iaddress'].patchValue(this.relianceProposal.controls['address'].value);
        this.relianceProposal.controls['iaddress2'].patchValue(this.relianceProposal.controls['address2'].value);
        this.relianceProposal.controls['iaddress3'].patchValue(this.relianceProposal.controls['address3'].value);
        this.relianceProposal.controls['icity'].patchValue(this.relianceProposal.controls['city'].value);
        this.relianceProposal.controls['icityId'].patchValue(this.relianceProposal.controls['cityId'].value);
        this.relianceProposal.controls['ipincode'].patchValue(this.relianceProposal.controls['pincode'].value);
        this.relianceProposal.controls['istate'].patchValue(this.relianceProposal.controls['state'].value);
        this.relianceProposal.controls['istateId'].patchValue(this.relianceProposal.controls['stateId'].value);
        this.relianceProposal.controls['idistrict'].patchValue(this.relianceProposal.controls['district'].value);
        this.relianceProposal.controls['idistrictId'].patchValue(this.relianceProposal.controls['districtId'].value);
        this.relianceProposal.controls['ilandmark'].patchValue(this.relianceProposal.controls['landmark'].value);
      }else{
        // this.inspReadonly = false;
        this.relianceProposal.controls['iaddress'].patchValue('');
        this.relianceProposal.controls['iaddress2'].patchValue('');
        this.relianceProposal.controls['iaddress3'].patchValue('');
        this.relianceProposal.controls['icity'].patchValue('');
        this.relianceProposal.controls['icityId'].patchValue('');
        this.relianceProposal.controls['ipincode'].patchValue('');
        this.relianceProposal.controls['istate'].patchValue('');
        this.relianceProposal.controls['istateId'].patchValue('');
        this.relianceProposal.controls['idistrict'].patchValue('');
        this.relianceProposal.controls['idistrictId'].patchValue('');
        this.relianceProposal.controls['ilandmark'].patchValue('');
      }
    }
  }



  //  from date

  addEventPrevious(event) {
    if (event.value != null) {
      let selectedDate = '';
      let dob = '';
      if (typeof event.value._i == 'string') {
        const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
        if (pattern.test(event.value._i) && event.value._i.length == 10) {
          this.previousDateError = '';
        } else {
          this.previousDateError = 'Enter Valid Date';
        }
      }
      //sessionStorage.insuredAgePA = this.bikeProposerAge;
    }
  }

  ageCalculate(dob) {
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

  ///validation

  nameValidate(event: any){
    this.validation.nameValidate(event);
  }

  numberValidate(event: any){
    this.validation.numberValidate(event);
  }
  dobValidate(event: any){
    this.validation.dobValidate(event);
  }
}




@Component({
  selector: 'idvvalidate',
  template: `
        <div class="container-fluid">
            <div class="row" [formGroup]="idfGroup">
                <div class="col-sm-12">

                  <div class="col-md-12 mt-2" >
                    <p>Please choose IDV Between (min {{idv.min}} - max {{idv.max}})</p>
                  </div>

                  <div class="col-md-12 mt-0" layout>
                    <mat-slider flex md-discrete [value]= "idfGroup.controls.IDV.value" formControlName="IDV"
                                step = "{{idv.min}"
                                min="{{idv.min}}"
                                max="{{idv.max}}">
                    </mat-slider>
                    <i style="font-size:14px" class="fa fa-inr">&#xf156;</i>{{idfGroup.controls.IDV.value}}
                  </div>
                </div>
            </div>
        </div>
        <div mat-dialog-actions style="justify-content: center">
             <button mat-button class="secondary-bg-color" (click)="onClick(true)" >Submit</button>
        </div>
    `,
  styleUrls: ['./reliance-fourwheeler-proposal.component.scss']


})
export class idvvalidate {
  public idv : any;
  public idfGroup : FormGroup;
  public popupValue : any;
  public sicoverValue : any;
  public idvCaluculatedValue : any;
  public buyBikeDetails : any;
  public resArray : any;
  constructor(
      public dialogRef: MatDialogRef<idvvalidate>,
      @Inject(MAT_DIALOG_DATA) public data: any, public fb: FormBuilder,private toastr: ToastrService) {

    this.idfGroup = this.fb.group({
          // AgentName: [''],
          IDV: [''],
        }
    );

  }
  ngOnInit(){
    this.idv = JSON.parse(sessionStorage.changeIdvDetail);
    this.buyBikeDetails = JSON.parse(sessionStorage.buyFourwheelerProductDetails);

  }

  idvCalculateDetails(value,type) {
    console.log(value,'childvalue');
    let valid = 25 / 100;
    this.idvCaluculatedValue = valid * value;

    // this.idvCaluculatedValue = valid * this.buyBikeDetails.Idv;
    this.sicoverValue = this.idvCaluculatedValue /3;
    console.log(this.sicoverValue,'value');

    if (type == 'popupValue'){
      if (value < this.sicoverValue) {
        this.popupValue = true;
      }else{
        this.popupValue = false;
      }
    }

  }



  onClick(result) {
    if(result !=''){

      this.idvCalculateDetails(this.idfGroup.controls.IDV.value,'popupValue');
        // this.dialogRef.close(this.idfGroup.controls.IDV.value);
      const idvData = {
        'calValue':this.sicoverValue,
        'submitedIdv':this.idfGroup.controls.IDV.value
      };
        this.dialogRef.close(idvData);

      console.log(this.popupValue,'popvalue');
      // if (this.popupValue == true){
      //   this.dialogRef.close(this.idfGroup.controls.IDV.value);
      // }else {
      //   this.toastr.error('Given SI Amount should be less than ' + this.sicoverValue);
      // }
    }
  }
}

