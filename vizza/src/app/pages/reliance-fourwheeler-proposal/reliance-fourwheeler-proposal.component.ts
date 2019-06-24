import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {ValidationService} from '../../shared/services/validation.service';
import {DatePipe} from '@angular/common';
import {AuthService} from '../../shared/services/auth.service';
import {BikeInsuranceService} from '../../shared/services/bike-insurance.service';
import {ToastrService} from 'ngx-toastr';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {AppSettings} from '../../app.settings';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {FourWheelerService} from '../../shared/services/four-wheeler.service';
import {ActivatedRoute} from '@angular/router';


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

  public nationalityList: any;
  public otherSystemNameList: any;
  public prevPolicyList: any;
  public occupationList: any;
  public financialTypeList: any;
  public commAddressList: any;
  public perAddressList: any;
  public regAddressList: any;
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
  public currentStep: any;
  public ProposalId: any;

  //dob
  proposerAge : any;
  nomineeAge : any;
  npnomineeAge : any;
  showNominee : any;
  npshowNominee : any;
  personalDobError : any;
  previousDateError : any;
  constructor(public fb: FormBuilder ,public appsetting: AppSettings,public config: ConfigurationService, public route: ActivatedRoute, public validation: ValidationService ,private toastr: ToastrService, public fourWheelerInsurance: FourWheelerService , public authservice: AuthService , public datepipe: DatePipe) {

    let stepperindex = 0;
    this.route.params.forEach((params) => {
      if(params.stepper == true || params.stepper == 'true') {
        stepperindex = 4;
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

    this.relianceProposal = this.fb.group({
      firstName : ['' , Validators.required],
      lastName : ['',Validators.required],
      middleName : [''],
      dob : ['' , Validators.required],
      title : ['' , Validators.required],
      occupation : ['' , Validators.required],
      maritalStatus : [''],
      nationality : [''],
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
      regSameAspermAddress : [''],
      occupationValue : [''],
      maritalStatusValue : [''],
      nationalityValue : [''],
      gender : ['' , Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],

      mobile: ['', Validators.compose([Validators.pattern('[6789][0-9]{9}')])],
    });

    this.previousInsurance = this.fb.group({
      prevInsurance : ['',Validators.required],
      prevYearPolicyType : ['',Validators.required],
      policyNumber : ['',Validators.required],
      // prevPolStartDate : ['',Validators.required],
      // prevPolSold : ['',Validators.required],
      prevInsurerAddress: ['',Validators.required],
      prevInsuranceValue: [''],
      prevYearPolicyTypeValue: [''],
    });

    this.coverDetails = this.fb.group({
      UnnamedPassengerCovered: [''],
      AutomobileAssociationMember: [''],
      AntiTheftDeviceFitted: [''],
      InsurancePremium: [''],
      PAToOwnerDriverCoverd: [''],
      PAToOwnerDriverCoverdSi: [''],
      NilDepreciationCoverage: [''],
      applicableRate: [''],
      LiabilityToPaidDriverCovered: [''],
      TPPDCover: [''],
      TPPDCoverSi: [''],
      BasicODCoverage: [''],
      BasicLiability: [''],
      nrelationValue: [''],
      fuelTypeValue: [''],
      nOtherRelationValue: [''],
      NewVehicle: [''],
      PACoverToOwner: [''],
      PAToNamedPassenger: [''],
      NoOfUnnamedPassenegersCovered: [''],
      IsVoluntaryDeductableOpted: [''],
      VoluntaryDeductableAmount: [''],
      IsElectricalItemFitted: [''],
      IsNonElectricalItemFitted: [''],
      ElectricalItemsTotalSI: [''],
      NonElectricalItemsTotalSI: [''],
      BiFuelKitSi: [''],
      IsBiFuelKit: [''],
      IsTotalCover: [''],
      IsRegistrationCover: [''],
      IsPAToDriverCovered: [''],
      IsPAToDriverCoveredSi: [''],
      IsRoadTaxcover: [''],
      UnnamedPassengersSI: [''],
      cappointeeName: [''],
      cnomineeName: [''],
      cnDob: [''],
      nrelation: [''],
      nOtherRelation: [''],
      cnAddress: [''],
      npappointeeName: [''],
      npnomineeName: [''],
      npDob: [''],
      nprelation: [''],
      nprelationValue: [''],
      npOtherRelation: [''],
      npOtherRelationValue: [''],
      npAddress: [''],
      namedPassengersSI: [''],
      nppassengerName: [''],
      fuelType: ['',Validators.required],
    });

    this.riskDetails = this.fb.group({
          // AgentName: [''],
          OtherSystemName: ['', Validators.required],
          IDV: ['', Validators.required],
          FinancierName: [''],
          FinanceType: [''],
          FinancierAddress: [''],
          IsVehicleHypothicated: [''],
          OtherSystemNameValue: [''],
          FinanceTypeValue: [''],
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

  }

  ngOnInit() {

    this.buyBikeDetails = JSON.parse(sessionStorage.buyFourwheelerProductDetails);
    // this.enquiryFormData = JSON.parse(sessionStorage.enquiryFormData);
    this.bikeEnquiryId = sessionStorage.fwEnquiryId;

    // this.buyProduct = JSON.parse(sessionStorage.bikeListDetails);
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
    this.getTppdSi()

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
    this.riskDetails.controls['FinanceTypeValue'].patchValue(this.financialTypeList[this.riskDetails.controls['FinanceTypeValue'].value]);
  }
  changenRelation(){
    this.coverDetails.controls['nrelationValue'].patchValue(this.relationListData[this.coverDetails.controls['nrelation'].value]);
  }
  changenOtherRelation(){
    this.coverDetails.controls['nOtherRelationValue'].patchValue(this.relationListData[this.coverDetails.controls['nOtherRelation'].value]);
  }
  changenpOtherRelation(){
    this.coverDetails.controls['npOtherRelationValue'].patchValue(this.relationListData[this.coverDetails.controls['npOtherRelation'].value]);
  }

  changenpRelation(){
    this.coverDetails.controls['nprelationValue'].patchValue(this.relationListData[this.coverDetails.controls['nprelation'].value]);
  }


  changeFuel(){
    this.coverDetails.controls['fuelTypeValue'].patchValue(this.fuelTypeList[this.coverDetails.controls['fuelType'].value]);

  }
  changeInsurer(){
    this.previousInsurance.controls['prevInsuranceValue'].patchValue(this.prevInsurerList[this.previousInsurance.controls['prevInsurance'].value]);
  }

  changePrevYear(){
    this.previousInsurance.controls['prevYearPolicyTypeValue'].patchValue(this.prevInsurerList[this.previousInsurance.controls['prevYearPolicyType'].value]);
  }


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
  updateMandatory(event) {
    if (event.checked) {
      this.coverDetails.controls['PACoverToOwner'].patchValue(true);

      //
      this.coverDetails.controls['cnomineeName'].setValidators([Validators.required]);
      this.coverDetails.controls['cnomineeName'].updateValueAndValidity();
      //
      this.coverDetails.controls['cnDob'].setValidators([Validators.required]);
      this.coverDetails.controls['cnDob'].updateValueAndValidity();
      //
      this.coverDetails.controls['nrelation'].setValidators([Validators.required]);
      this.coverDetails.controls['nrelation'].updateValueAndValidity();
      ///
      this.coverDetails.controls['cnAddress'].setValidators([Validators.required]);
      this.coverDetails.controls['cnAddress'].updateValueAndValidity();
      //
      this.coverDetails.controls['nOtherRelation'].setValidators([Validators.required]);
      this.coverDetails.controls['nOtherRelation'].updateValueAndValidity();

    } else {
      this.coverDetails.controls['PACoverToOwner'].patchValue(false);

      this.coverDetails.controls['cappointeeName'].patchValue('');
      this.coverDetails.controls['cappointeeName'].setValidators(null);
      this.coverDetails.controls['cappointeeName'].updateValueAndValidity();

      //
      this.coverDetails.controls['cnomineeName'].patchValue('');
      this.coverDetails.controls['cnomineeName'].setValidators(null);
      this.coverDetails.controls['cnomineeName'].updateValueAndValidity();
      //
      this.coverDetails.controls['cnDob'].patchValue('');
      this.coverDetails.controls['cnDob'].setValidators(null);
      this.coverDetails.controls['cnDob'].updateValueAndValidity();
      //
      this.coverDetails.controls['nrelation'].patchValue('');
      this.coverDetails.controls['nrelation'].setValidators(null);
      this.coverDetails.controls['nrelation'].updateValueAndValidity();
      //
      this.coverDetails.controls['cnAddress'].patchValue('');
      this.coverDetails.controls['cnAddress'].setValidators(null);
      this.coverDetails.controls['cnAddress'].updateValueAndValidity();
      //
      this.coverDetails.controls['nOtherRelation'].patchValue('');
      this.coverDetails.controls['nOtherRelation'].setValidators(null);
      this.coverDetails.controls['nOtherRelation'].updateValueAndValidity();
    }
  }


  //
  updatenpMandatory(event) {
    if (event.checked) {
      this.coverDetails.controls['PAToNamedPassenger'].patchValue(true);

      //
      this.coverDetails.controls['namedPassengersSI'].setValidators([Validators.required]);
      this.coverDetails.controls['namedPassengersSI'].updateValueAndValidity();

      this.coverDetails.controls['nppassengerName'].setValidators([Validators.required]);
      this.coverDetails.controls['nppassengerName'].updateValueAndValidity();

      this.coverDetails.controls['npnomineeName'].setValidators([Validators.required]);
      this.coverDetails.controls['npnomineeName'].updateValueAndValidity();
      //
      this.coverDetails.controls['npDob'].setValidators([Validators.required]);
      this.coverDetails.controls['npDob'].updateValueAndValidity();
      //
      this.coverDetails.controls['nprelation'].setValidators([Validators.required]);
      this.coverDetails.controls['nprelation'].updateValueAndValidity();
      ///
      this.coverDetails.controls['npAddress'].setValidators([Validators.required]);
      this.coverDetails.controls['npAddress'].updateValueAndValidity();
      //
      this.coverDetails.controls['npOtherRelation'].setValidators([Validators.required]);
      this.coverDetails.controls['npOtherRelation'].updateValueAndValidity();

    } else {
      this.coverDetails.controls['PAToNamedPassenger'].patchValue(false);


      this.coverDetails.controls['namedPassengersSI'].patchValue('');
      this.coverDetails.controls['namedPassengersSI'].setValidators(null);
      this.coverDetails.controls['namedPassengersSI'].updateValueAndValidity()

      this.coverDetails.controls['nppassengerName'].patchValue('');
      this.coverDetails.controls['nppassengerName'].setValidators(null);
      this.coverDetails.controls['nppassengerName'].updateValueAndValidity()


      this.coverDetails.controls['npappointeeName'].patchValue('');
      this.coverDetails.controls['npappointeeName'].setValidators(null);
      this.coverDetails.controls['npappointeeName'].updateValueAndValidity();

      //
      this.coverDetails.controls['npnomineeName'].patchValue('');
      this.coverDetails.controls['npnomineeName'].setValidators(null);
      this.coverDetails.controls['npnomineeName'].updateValueAndValidity();
      //
      this.coverDetails.controls['npDob'].patchValue('');
      this.coverDetails.controls['npDob'].setValidators(null);
      this.coverDetails.controls['npDob'].updateValueAndValidity();
      //
      this.coverDetails.controls['nprelation'].patchValue('');
      this.coverDetails.controls['nprelation'].setValidators(null);
      this.coverDetails.controls['nprelation'].updateValueAndValidity();
      //
      this.coverDetails.controls['npAddress'].patchValue('');
      this.coverDetails.controls['npAddress'].setValidators(null);
      this.coverDetails.controls['npAddress'].updateValueAndValidity();
      //
      this.coverDetails.controls['npOtherRelation'].patchValue('');
      this.coverDetails.controls['npOtherRelation'].setValidators(null);
      this.coverDetails.controls['npOtherRelation'].updateValueAndValidity();
    }
  }


  updateUnnamedPassenger(event){
    if (event.checked) {
      this.coverDetails.controls['UnnamedPassengerCovered'].patchValue(true);

      //
      // this.coverDetails.controls['UnnamedPassengersSI'].patchValue('100000');

      this.coverDetails.controls['UnnamedPassengersSI'].setValidators([Validators.required]);
      this.coverDetails.controls['UnnamedPassengersSI'].updateValueAndValidity();

      this.coverDetails.controls['NoOfUnnamedPassenegersCovered'].patchValue('5');
      this.coverDetails.controls['NoOfUnnamedPassenegersCovered'].setValidators([Validators.required]);
      this.coverDetails.controls['NoOfUnnamedPassenegersCovered'].updateValueAndValidity();
    }else{
      this.coverDetails.controls['UnnamedPassengerCovered'].patchValue(false);


      this.coverDetails.controls['UnnamedPassengersSI'].patchValue('');
      this.coverDetails.controls['UnnamedPassengersSI'].setValidators(null);
      this.coverDetails.controls['UnnamedPassengersSI'].updateValueAndValidity();

      this.coverDetails.controls['NoOfUnnamedPassenegersCovered'].patchValue('');
      this.coverDetails.controls['NoOfUnnamedPassenegersCovered'].setValidators(null);
      this.coverDetails.controls['NoOfUnnamedPassenegersCovered'].updateValueAndValidity();
    }
    }

  updateVoluntary(event){
    if(event.checked){
      this.coverDetails.controls['IsVoluntaryDeductableOpted'].patchValue(true);
      //
      this.coverDetails.controls['VoluntaryDeductableAmount'].setValidators([Validators.required]);
      this.coverDetails.controls['VoluntaryDeductableAmount'].updateValueAndValidity();
    }else {
      this.coverDetails.controls['IsVoluntaryDeductableOpted'].patchValue(false);


      this.coverDetails.controls['VoluntaryDeductableAmount'].patchValue('');
      this.coverDetails.controls['VoluntaryDeductableAmount'].setValidators(null);
      this.coverDetails.controls['VoluntaryDeductableAmount'].updateValueAndValidity();
    }
  }
  //
  updateOwnerDriverSi(event){
    if(event.checked){
      this.coverDetails.controls['PAToOwnerDriverCoverd'].patchValue(true);
      //
      this.coverDetails.controls['PAToOwnerDriverCoverdSi'].patchValue('1500000');
      this.coverDetails.controls['PAToOwnerDriverCoverdSi'].setValidators([Validators.required]);
      this.coverDetails.controls['PAToOwnerDriverCoverdSi'].updateValueAndValidity();
    }else {
      this.coverDetails.controls['PAToOwnerDriverCoverd'].patchValue(false);


      this.coverDetails.controls['PAToOwnerDriverCoverdSi'].patchValue('');
      this.coverDetails.controls['PAToOwnerDriverCoverdSi'].setValidators(null);
      this.coverDetails.controls['PAToOwnerDriverCoverdSi'].updateValueAndValidity();
    }
  }

  updateNildeprecition(event){
    if(event.checked){
      this.coverDetails.controls['NilDepreciationCoverage'].patchValue(true);
      //
      this.coverDetails.controls['applicableRate'].patchValue('1.0');

      this.coverDetails.controls['applicableRate'].setValidators([Validators.required]);
      this.coverDetails.controls['applicableRate'].updateValueAndValidity();
    }else {
      this.coverDetails.controls['NilDepreciationCoverage'].patchValue(false);


      this.coverDetails.controls['applicableRate'].patchValue('');
      this.coverDetails.controls['applicableRate'].setValidators(null);
      this.coverDetails.controls['applicableRate'].updateValueAndValidity();
    }
  }


  updateTppd(event){
    if(event.checked){
      this.coverDetails.controls['TPPDCover'].patchValue(true);
      //
      this.coverDetails.controls['TPPDCoverSi'].setValidators([Validators.required]);
      this.coverDetails.controls['TPPDCoverSi'].updateValueAndValidity();
    }else {
      this.coverDetails.controls['TPPDCover'].patchValue(false);


      this.coverDetails.controls['TPPDCoverSi'].patchValue('');
      this.coverDetails.controls['TPPDCoverSi'].setValidators(null);
      this.coverDetails.controls['TPPDCoverSi'].updateValueAndValidity();
    }
  }

  updateElectricalItem(event){
    if(event.checked){
      this.coverDetails.controls['IsElectricalItemFitted'].patchValue(true);
      //
      this.coverDetails.controls['ElectricalItemsTotalSI'].patchValue('15000');
      this.coverDetails.controls['ElectricalItemsTotalSI'].setValidators([Validators.required]);
      this.coverDetails.controls['ElectricalItemsTotalSI'].updateValueAndValidity();
    }else {
      this.coverDetails.controls['IsElectricalItemFitted'].patchValue(false);


      this.coverDetails.controls['ElectricalItemsTotalSI'].patchValue('');
      this.coverDetails.controls['ElectricalItemsTotalSI'].setValidators(null);
      this.coverDetails.controls['ElectricalItemsTotalSI'].updateValueAndValidity();
    }
  }

  updatenonElectricalItem(event){
    if(event.checked){
      this.coverDetails.controls['IsNonElectricalItemFitted'].patchValue(true);
      //
      this.coverDetails.controls['NonElectricalItemsTotalSI'].patchValue('12000');

      this.coverDetails.controls['NonElectricalItemsTotalSI'].setValidators([Validators.required]);
      this.coverDetails.controls['NonElectricalItemsTotalSI'].updateValueAndValidity();
    }else {
      this.coverDetails.controls['IsNonElectricalItemFitted'].patchValue(false);


      this.coverDetails.controls['NonElectricalItemsTotalSI'].patchValue('');
      this.coverDetails.controls['NonElectricalItemsTotalSI'].setValidators(null);
      this.coverDetails.controls['NonElectricalItemsTotalSI'].updateValueAndValidity();
    }
  }

  updatenonBiFuelKit(event){
    if(event.checked){
      this.coverDetails.controls['IsBiFuelKit'].patchValue(true);
      //
      this.coverDetails.controls['BiFuelKitSi'].patchValue('20000');

      this.coverDetails.controls['BiFuelKitSi'].setValidators([Validators.required]);
      this.coverDetails.controls['BiFuelKitSi'].updateValueAndValidity();
    }else {
      this.coverDetails.controls['IsBiFuelKit'].patchValue(false);


      this.coverDetails.controls['BiFuelKitSi'].patchValue('');
      this.coverDetails.controls['BiFuelKitSi'].setValidators(null);
      this.coverDetails.controls['BiFuelKitSi'].updateValueAndValidity();
    }
  }

  updateDriverCovered(event){
    if(event.checked){
      this.coverDetails.controls['IsPAToDriverCovered'].patchValue(true);
      //

      this.coverDetails.controls['IsPAToDriverCoveredSi'].setValidators([Validators.required]);
      this.coverDetails.controls['IsPAToDriverCoveredSi'].updateValueAndValidity();
    }else {
      this.coverDetails.controls['IsPAToDriverCovered'].patchValue(false);


      this.coverDetails.controls['IsPAToDriverCoveredSi'].patchValue('');
      this.coverDetails.controls['IsPAToDriverCoveredSi'].setValidators(null);
      this.coverDetails.controls['IsPAToDriverCoveredSi'].updateValueAndValidity();
    }
  }



  //dob
  addEvent(event, type) {
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
          }
        } else {
          if (type == 'proposor') {
            this.personalDobError = 'Enter Valid Dob';
          } else if (type == 'nominee') {
            this.personalDobError = 'Enter Valid Dob';
          }
        }
        selectedDate = event.value._i;
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
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
        if (dob.length == 10 && type == 'proposor') {
          this.proposerAge = this.ageCalculate(dob);
          this.personalDobError = '';
          // sessionStorage.proposerAgeForTravel = this.proposerAge;
        } else if (type == "nominee") {
          this.nomineeAge = this.ageCalculate(dob);
        }else {
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
        if (sessionStorage.nomineeAge <= 18) {
          this.showNominee = true;
          this.coverDetails.controls['cappointeeName'].setValidators([Validators.required]);
          this.coverDetails.controls['cappointeeName'].updateValueAndValidity();
        } else {
          this.coverDetails.controls['cappointeeName'].patchValue('');
          this.coverDetails.controls['cappointeeName'].setValidators(null);
          this.coverDetails.controls['cappointeeName'].updateValueAndValidity();
          this.showNominee = false;

        }
      }

        if (type == 'npnominee') {
          console.log(this.npnomineeAge, 'npnomineeAge');
          sessionStorage.npnomineeAge = this.npnomineeAge;
          if (sessionStorage.npnomineeAge <= 18) {

            this.npshowNominee = true;
            this.coverDetails.controls['npappointeeName'].setValidators([Validators.required]);
            this.coverDetails.controls['npappointeeName'].updateValueAndValidity();
          } else {
            this.coverDetails.controls['npappointeeName'].patchValue('');
            this.coverDetails.controls['npappointeeName'].setValidators(null);
            this.coverDetails.controls['npappointeeName'].updateValueAndValidity();
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

  //stepper
  nextTab(stepper,value,type) {

    if (type == 'stepper1') {
      this.proposerData = value;
      sessionStorage.stepper1Details = '';
      sessionStorage.stepper1Details = JSON.stringify(value);
      this.riskDetails.controls['IDV'].patchValue(this.buyBikeDetails.Idv);
      if (this.relianceProposal.valid) {
        if(sessionStorage.proposerAge >= 18 ){
          stepper.next();
          this.topScroll();
        }else {
          this.toastr.error('Proposer Age should be greater than 18.')
        }
      }
    } else if (type == 'stepper2') {
      sessionStorage.stepper2Details = '';
      sessionStorage.stepper2Details = JSON.stringify(value);
      if (this.riskDetails.valid) {
        stepper.next();
        this.topScroll();
      }
    } else if (type == 'stepper3') {
      sessionStorage.stepper3Details = '';
      sessionStorage.stepper3Details = JSON.stringify(value);
      if (this.coverDetails.valid) {
        stepper.next();
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
  session(){
    if (sessionStorage.stepper1Details != '' && sessionStorage.stepper1Details != undefined) {
      this.getStepper1 = JSON.parse(sessionStorage.stepper1Details);
      this.relianceProposal = this.fb.group({
        firstName : this.getStepper1.firstName,
        lastName : this.getStepper1.lastName,
        middleName : this.getStepper1.middleName,
        dob : this.datepipe.transform(this.getStepper1.dob, 'y-MM-dd'),
        title : this.getStepper1.title,
        occupation : this.getStepper1.occupation,
        maritalStatus : this.getStepper1.maritalStatus,
        nationality : this.getStepper1.nationality,
        address : this.getStepper1.address,
        paddress : this.getStepper1.paddress,
        raddress : this.getStepper1.raddress,
        address2 : this.getStepper1.address2,
        paddress2 : this.getStepper1.paddress2,
        raddress2 : this.getStepper1.raddress2,
        pincode : this.getStepper1.pincode,
        ppincode : this.getStepper1.ppincode,
        rpincode : this.getStepper1.rpincode,
        state : this.getStepper1.state,
        stateId : this.getStepper1.stateId,
        pstate : this.getStepper1.pstate,
        pstateId : this.getStepper1.pstateId,
        rstate : this.getStepper1.rstate,
        rstateId : this.getStepper1.rstateId,
        city : this.getStepper1.city,
        cityId : this.getStepper1.cityId,
        pcity : this.getStepper1.pcity,
        pcityId : this.getStepper1.pcityId,
        rcity : this.getStepper1.rcity,
        rcityId : this.getStepper1.rcityId,
        district : this.getStepper1.district,
        districtId : this.getStepper1.districtId,
        pdistrict : this.getStepper1.pdistrict,
        pdistrictId : this.getStepper1.pdistrictId,
        rdistrict : this.getStepper1.rdistrict,
        rdistrictId : this.getStepper1.rdistrictId,
        landmark : this.getStepper1.landmark,
        plandmark : this.getStepper1.plandmark,
        rlandmark : this.getStepper1.rlandmark,
        address3 : this.getStepper1.address3,
        paddress3 : this.getStepper1.paddress3,
        raddress3 : this.getStepper1.raddress3,
        alternateContact : this.getStepper1.alternateContact,
        // gstNumber : this.getStepper1.gstNumber,
        sameAsAddress : this.getStepper1.sameAsAddress,
        regSameAscommAddress : this.getStepper1.regSameAscommAddress,
        regSameAspermAddress :this.getStepper1.regSameAspermAddress,
        gender : this.getStepper1.gender,
        email: this.getStepper1.email,
        mobile: this.getStepper1.mobile,
        occupationValue: this.getStepper1.occupationValue,
        maritalStatusValue: this.getStepper1.maritalStatusValue,
        nationalityValue: this.getStepper1.nationalityValue,
      });
    }

    if(sessionStorage.stepper2Details != '' && sessionStorage.stepper2Details != undefined ){
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

    if(sessionStorage.stepper3Details != '' && sessionStorage.stepper3Details != undefined){
      this.getStepper3 = JSON.parse(sessionStorage.stepper3Details);
      this.coverDetails = this.fb.group({
        UnnamedPassengerCovered: this.getStepper3.UnnamedPassengerCovered,
        PAToOwnerDriverCoverd: this.getStepper3.PAToOwnerDriverCoverd,
        PAToOwnerDriverCoverdSi: this.getStepper3.PAToOwnerDriverCoverdSi,
        AutomobileAssociationMember: this.getStepper3.AutomobileAssociationMember,
        AntiTheftDeviceFitted: this.getStepper3.AntiTheftDeviceFitted,
        InsurancePremium: this.getStepper3.InsurancePremium,
        NilDepreciationCoverage: this.getStepper3.NilDepreciationCoverage,
        applicableRate: this.getStepper3.applicableRate,
        LiabilityToPaidDriverCovered: this.getStepper3.LiabilityToPaidDriverCovered,
        TPPDCover: this.getStepper3.TPPDCover,
        TPPDCoverSi: this.getStepper3.TPPDCoverSi,
        BasicODCoverage: this.getStepper3.BasicODCoverage,
        BasicLiability: this.getStepper3.BasicLiability,
        NewVehicle: this.getStepper3.NewVehicle,
        PACoverToOwner: this.getStepper3.PACoverToOwner,
        PAToNamedPassenger: this.getStepper3.PAToNamedPassenger,
        IsPAToDriverCovered: this.getStepper3.IsPAToDriverCovered,
        IsPAToDriverCoveredSi: this.getStepper3.IsPAToDriverCoveredSi,
        NoOfUnnamedPassenegersCovered: this.getStepper3.NoOfUnnamedPassenegersCovered,
        ElectricalItemsTotalSI: this.getStepper3.ElectricalItemsTotalSI,
        NonElectricalItemsTotalSI: this.getStepper3.NonElectricalItemsTotalSI,
        BiFuelKitSi: this.getStepper3.BiFuelKitSi,
        UnnamedPassengersSI: this.getStepper3.UnnamedPassengersSI,
        IsVoluntaryDeductableOpted: this.getStepper3.IsVoluntaryDeductableOpted,
        VoluntaryDeductableAmount: this.getStepper3.VoluntaryDeductableAmount,
        IsElectricalItemFitted: this.getStepper3.IsElectricalItemFitted,
        IsNonElectricalItemFitted: this.getStepper3.IsNonElectricalItemFitted,
        IsBiFuelKit: this.getStepper3.IsBiFuelKit,
        IsTotalCover: this.getStepper3.IsTotalCover,
        IsRegistrationCover: this.getStepper3.IsRegistrationCover,
        IsRoadTaxcover: this.getStepper3.IsRoadTaxcover,
        cappointeeName: this.getStepper3.cappointeeName,
        cnomineeName: this.getStepper3.cnomineeName,
        cnDob: this.datepipe.transform(this.getStepper3.cnDob, 'y-MM-dd'),
        nrelation: this.getStepper3.nrelation,
        nOtherRelation: this.getStepper3.nOtherRelation,
        cnAddress: this.getStepper3.cnAddress,
        npappointeeName: this.getStepper3.npappointeeName,
        npnomineeName: this.getStepper3.npnomineeName,
        npDob: this.datepipe.transform(this.getStepper3.npDob, 'y-MM-dd'),
        nprelation: this.getStepper3.nprelation,
        npOtherRelation: this.getStepper3.npOtherRelation,
        npAddress: this.getStepper3.npAddress,
        fuelType: this.getStepper3.fuelType,
        nOtherRelationValue: this.getStepper3.nOtherRelationValue,
        npOtherRelationValue: this.getStepper3.npOtherRelationValue,
        namedPassengersSI: this.getStepper3.namedPassengersSI,
        nppassengerName: this.getStepper3.nppassengerName,
        nrelationValue: this.getStepper3.nrelationValue,
        nprelationValue: this.getStepper3.nprelationValue,
        fuelTypeValue: this.getStepper3.fuelTypeValue,
      });
    }

    if(sessionStorage.nomineeAge != '' && sessionStorage.nomineeAge != undefined) {
      if(sessionStorage.nomineeAge <= 18){
        this.showNominee = true;
        this.coverDetails.controls['cappointeeName'].setValidators([Validators.required]);
        this.coverDetails.controls['cappointeeName'].updateValueAndValidity();
      }else{
        this.coverDetails.controls['cappointeeName'].patchValue('');
        this.coverDetails.controls['cappointeeName'].setValidators(null);
        this.coverDetails.controls['cappointeeName'].updateValueAndValidity();
        this.showNominee = false;

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
          this.occupationFailure(error);
        }
    );
  }
  public fuelTypeListSucccess(successData){
    this.fuelTypeList = successData.ResponseObject;
  }
  public fuelTypeListFailure(error) {
  }


  ////VoluntaryDeductableAmount list
  voluntaryAmount() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    };
    this.fourWheelerInsurance.fourWheelervoluntaryAmountList(data).subscribe(
        (successData) => {
          this.voluntaryAmountListSucccess(successData);
        },
        (error) => {
          this.fourWheelervoluntaryAmountListFailure(error);
        }
    );
  }
  public voluntaryAmountListSucccess(successData){
    this.amountList = successData.ResponseObject;
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
          this.fourWheelervoluntaryAmountListFailure(error);
        }
    );
  }
  public getPaidDriverSiSucccess(successData){
    this.driverCoveredList = successData.ResponseObject;
  }
  public getPaidDriverSiFailure(error) {
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
  unnamedSi() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    };
    this.fourWheelerInsurance.fourWheelerunnamedSiList(data).subscribe(
        (successData) => {
          this.unnamedSiSucccess(successData);
        },
        (error) => {
          this.fourWheelervoluntaryAmountListFailure(error);
        }
    );
  }
  public unnamedSiSucccess(successData){
    this.unnamedList = successData.ResponseObject;
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


  /// create proposal
  createProposal(stepper,value){
    // stepper.next();
    // this.topScroll();
    sessionStorage.stepper4Details = '';
    sessionStorage.stepper4Details = JSON.stringify(value);
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
      'enquiry_id': this.bikeEnquiryId,
      'created_by': '',
      'proposal_id': sessionStorage.shiramBikeproposalID == '' || sessionStorage.shiramBikeproposalID == undefined ? '' : sessionStorage.shiramBikeproposalID,
      'motorproposalObj':{
        'CoverDetails': '',
        'TrailerDetails': '',
        'ClientDetails': {
          'ClientType': '0',
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
            }
          },
          'EmailID': this.relianceProposal.controls['email'].value,
          'Salutation': this.relianceProposal.controls['title'].value,
          'MaritalStatus': this.relianceProposal.controls['maritalStatus'].value,
          'Nationality': this.relianceProposal.controls['nationality'].value
        },
        'Policy': {

          'AgentName': 'Direct',
          'OtherSystemName': this.riskDetails.controls['OtherSystemName'].value

        },
        'Risk': {
          'IDV': this.riskDetails.controls['IDV'].value,
          'IsVehicleHypothicated': this.riskDetails.controls['IsVehicleHypothicated'].value ? 'true' : 'false',
          'FinanceType': this.riskDetails.controls['FinanceType'].value,
          'FinancierName': this.riskDetails.controls['FinancierName'].value,
          'FinancierAddress': this.riskDetails.controls['FinancierAddress'].value,
          'IsRegAddressSameasCommAddress': this.relianceProposal.controls['regSameAscommAddress'].value ? 'true' : 'false',
          'IsRegAddressSameasPermanentAddress': this.relianceProposal.controls['regSameAspermAddress'].value ? 'true' : 'false',
          'IsPermanentAddressSameasCommAddress': this.relianceProposal.controls['sameAsAddress'].value ? 'true' : 'false'
        },
        'Vehicle': {

          'TypeOfFuel': this.coverDetails.controls['fuelType'].value,
          'ISNewVehicle': this.coverDetails.controls['NewVehicle'].value ? 'true' : 'false'
        },
        'Cover': {
          // 'IsPAToUnnamedPassengerCovered': this.coverDetails.controls['UnnamedPassengerCovered'].value ,
          'IsPAToUnnamedPassengerCovered': this.coverDetails.controls['UnnamedPassengerCovered'].value ? 'true' : 'false',
          'IsAutomobileAssociationMember': this.coverDetails.controls['AutomobileAssociationMember'].value ? 'true' : 'false',
          'IsPAToOwnerDriverCoverd': this.coverDetails.controls['PAToOwnerDriverCoverd'].value ? 'true' : 'false',
          'IsLiabilityToPaidDriverCovered': this.coverDetails.controls['LiabilityToPaidDriverCovered'].value ? 'true' : 'false',
          'IsAntiTheftDeviceFitted': this.coverDetails.controls['AntiTheftDeviceFitted'].value ? 'true' : 'false',
          'IsTPPDCover': this.coverDetails.controls['TPPDCover'].value ? 'true' : 'false',
          'IsBasicODCoverage': this.coverDetails.controls['BasicODCoverage'].value ? 'true' : 'false',
          'IsBasicLiability': this.coverDetails.controls['BasicLiability'] ? 'true' : 'false',
          'IsInsurancePremium': this.coverDetails.controls['InsurancePremium'] ? 'true' : 'false',
          'UnnamedPassengersSI': this.coverDetails.controls['UnnamedPassengersSI'].value ,
          // 'NilDepreciationCoverage': this.coverDetails.controls['NilDepreciationCoverage'].value ? 'true' : 'false',
          'IsVoluntaryDeductableOpted': this.coverDetails.controls['IsVoluntaryDeductableOpted'].value ? 'true' : 'false',
          'VoluntaryDeductableAmount': this.coverDetails.controls['VoluntaryDeductableAmount'].value ,
          'IsElectricalItemFitted': this.coverDetails.controls['IsElectricalItemFitted'].value ? 'true' : 'false',
          'ElectricalItemsTotalSI': this.coverDetails.controls['ElectricalItemsTotalSI'].value ,
          'IsNonElectricalItemFitted': this.coverDetails.controls['IsNonElectricalItemFitted'].value ? 'true' : 'false',
          'NonElectricalItemsTotalSI': this.coverDetails.controls['NonElectricalItemsTotalSI'].value ,
          'IsBiFuelKit': this.coverDetails.controls['IsBiFuelKit'].value ? 'true' : 'false',
          'BiFuelKitSi': this.coverDetails.controls['BiFuelKitSi'].value ,
          'IsTotalCover': this.coverDetails.controls['IsTotalCover'].value ? 'true' : 'false',
          'IsRoadTaxcover': this.coverDetails.controls['IsRoadTaxcover'].value ? 'true' : 'false',
          'IsPAToDriverCovered': this.coverDetails.controls['IsPAToDriverCovered'].value ? 'true' : 'false',
          'IsRegistrationCover': this.coverDetails.controls['IsRegistrationCover'].value ? 'true' : 'false',
          'NoOfUnnamedPassenegersCovered': this.coverDetails.controls['NoOfUnnamedPassenegersCovered'].value ,
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
              "Fueltype": this.coverDetails.controls['fuelTypeValue'].value,
              "ISLpgCng": this.coverDetails.controls['IsBiFuelKit'].value ? 'true' : 'false',
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
              "SumInsured": this.coverDetails.controls['VoluntaryDeductableAmount'].value ,
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
              "ApplicableRate": this.coverDetails.controls['applicableRate'].value
            }
          },
          "PACoverToOwner": {
            "PACoverToOwner": {
              'IsChecked': this.coverDetails.controls['PACoverToOwner'].value ? 'true' : 'false',
              'NoOfItems': '',
              'PackageName': '',
              'AppointeeName': this.coverDetails.controls['cappointeeName'].value,
              'NomineeName': this.coverDetails.controls['cnomineeName'].value,
              'NomineeDOB': this.coverDetails.controls['cnDob'].value,
              'NomineeRelationship': this.coverDetails.controls['nrelation'].value,
              'NomineeAddress': this.coverDetails.controls['cnAddress'].value,
              'OtherRelation': this.coverDetails.controls['nOtherRelation'].value
            }
          },
          "PAToNamedPassenger": {
            "PAToNamedPassenger": {
              "IsMandatory": this.coverDetails.controls['PAToNamedPassenger'].value ? 'true' : 'false',
              "IsChecked": this.coverDetails.controls['PAToNamedPassenger'].value ? 'true' : 'false',
              "NoOfItems": "1",
              "PackageName": "",
              "SumInsured": this.coverDetails.controls['namedPassengersSI'].value,
              "PassengerName": this.coverDetails.controls['nppassengerName'].value,
              "NomineeName": this.coverDetails.controls['npnomineeName'].value,
              "NomineeDOB": this.coverDetails.controls['npDob'].value,
              "NomineeRelationship": this.coverDetails.controls['nprelation'].value,
              "NomineeAddress": this.coverDetails.controls['npAddress'].value,
              "OtherRelation": this.coverDetails.controls['npOtherRelation'].value,
              "AppointeeName": this.coverDetails.controls['npappointeeName'].value
            }
          },
          "PAToUnNamedPassenger": {
            "PAToUnNamedPassenger": {
              "IsChecked": this.coverDetails.controls['UnnamedPassengerCovered'].value ? 'true' : 'false',
              "NoOfItems": this.coverDetails.controls['NoOfUnnamedPassenegersCovered'].value,
              "SumInsured": this.coverDetails.controls['UnnamedPassengersSI'].value
            }
          },
          "PAToPaidDriver": {
            "PAToPaidDriver": {
              "SumInsured": this.coverDetails.controls['IsPAToDriverCoveredSi'].value
            }
          },
          "RegistrationCost": {
            "RegistrationCost": {
              "IsMandatory": this.coverDetails.controls['IsRegistrationCover'].value ? 'true' : 'false',
              "IsChecked": this.coverDetails.controls['IsRegistrationCover'].value ? 'true' : 'false',
              "SumInsured": "20000",
              "NoOfItems":"",
              "PackageName":""
            }
          },
          "RoadTax": {
            "RoadTax": {
              "IsMandatory": this.coverDetails.controls['IsRoadTaxcover'].value ? 'true' : 'false',
              "IsChecked": this.coverDetails.controls['IsRoadTaxcover'].value ? 'true' : 'false',
              "NoOfItems": "",
              "PackageName": "",
              "SumInsured": "1800",
              "PolicyCoverID": ""
            }
          },
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
        'PreviousInsuranceDetails': {
          'PrevInsuranceID': '',
          // 'IsVehicleOfPreviousPolicySold': this.previousInsurance.controls['prevPolSold'].value ? 'true' : 'false',
          'PrevYearInsurer': this.previousInsurance.controls['prevInsurance'].value,
          'PrevYearPolicyNo': this.previousInsurance.controls['policyNumber'].value,
          'PrevYearInsurerAddress': this.previousInsurance.controls['prevInsurerAddress'].value,
          'PrevYearPolicyType': this.previousInsurance.controls['prevYearPolicyType'].value
          // 'PrevYearPolicyStartDate': this.previousInsurance.controls['prevPolStartDate'].value
        }
      }
    };
    this.fourWheelerInsurance.fourWheelergetProposal(data).subscribe(
        (successData) => {
          this.getProposalSucccess(successData,stepper);
        },
        (error) => {
          this.getProposalFailure(error);
        }
    );
    console.log(data,'data');
  }

  getProposalSucccess(successData,stepper) {
    this.setting.loadingSpinner = false;
    if (successData.IsSuccess) {
      this.toastr.success('Proposal created successfully!!');
      this.summaryData = successData.ResponseObject;
      sessionStorage.summaryData = JSON.stringify(this.summaryData);
      this.proposalId = this.summaryData.policy_id;
      sessionStorage.relianceMotorproposalID = this.proposalId;
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
      this.toastr.error(successData.ErrorObject);
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
      }
    }

  }
  pinListFailure(error){

  }


  // same as address

  sameAsAddress(type) {
    console.log(this.relianceProposal.controls['regSameAspermAddress'].value,'regperm')
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
    let mdate = dob.toString();
    let yearThen = parseInt(mdate.substring(8, 10), 10);
    let monthThen = parseInt(mdate.substring(5, 7), 10);
    let dayThen = parseInt(mdate.substring(0, 4), 10);
    let todays = new Date();
    let birthday = new Date(dayThen, monthThen - 1, yearThen);
    let differenceInMilisecond = todays.valueOf() - birthday.valueOf();
    let year_age = Math.floor(differenceInMilisecond / 31536000000);
    return year_age;
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

