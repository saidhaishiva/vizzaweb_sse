import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {ValidationService} from '../../shared/services/validation.service';
import {DatePipe} from '@angular/common';
import {AuthService} from '../../shared/services/auth.service';
import {BikeInsuranceService} from '../../shared/services/bike-insurance.service';
import {ToastrService} from 'ngx-toastr';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {AppSettings} from '../../app.settings';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {ActivatedRoute} from '@angular/router';
import {CommonService} from '../../shared/services/common.service';
import {Settings} from '../../app.settings.model';



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
  selector: 'app-reliance-motor-proposal',
  templateUrl: './reliance-motor-proposal.component.html',
  styleUrls: ['./reliance-motor-proposal.component.scss'],
  providers: [

    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class RelianceMotorProposalComponent implements OnInit {

  relianceProposal : FormGroup;
  previousInsurance : FormGroup;
  coverDetails : FormGroup;
  riskDetails : FormGroup;
  public titleList:any;
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
  public relationListData: any;
  public prevInsurerList: any;
  public maritalList: any;
  public financialTypeList: any;
  public tppdList: any;
  public amountList: any;
  public unnamedList: any;
  public webhost : any;

  public nationalityList: any;
  public bifueltypeList: any;
  public fittngTypeList: any;
  public prevPolicyList: any;
  public paidDriverList: any;
  public occupationList: any;
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
  public buyProduct: any;
  public enquiryFormData: any;
  public bikeEnquiryId: any;
  public coverListValue: any;
  public pa_owner_driver: any;
  public nil_depreciation: any;
  public pa_unnamed_passenger: any;
  public settings: Settings;
  public Bifuel_Kit: any;
  public basic_od: any;
  public electrical_accessories: any;
  public non_electrical_accessories: any;
  public Anti_theft: any;
  public voluntary_deductible: any;
  public automobile_association: any;
  public basic_liability: any;
  public tppd: any;
  public gstAmount: any;
  public discountAmount: any;
  public electricalSumAount: any;
  public nonElectricalSumAount: any;
  public otherSystemNameList: any;
  public pa_named_passenger: any;
  public specially_designed: any;
  public fibre_glass_tank: any;
  public geographical_extension: any;
  public suminsuredpA: any;
  public suminsuredvoluntarylist: any;
  public suminsuredTPPD: any;
  public coverageValue: any;
  public clientTypeField: boolean;
  public addonValue: boolean;
  public Electrical_accessories: any;
  public Nil_depreciation: any;
  public Non_electrical_accessories: any;
  public PA_to_named_passenger: any;
  public PA_to_owner_driver: any;
  public PA_to_unnamed_passenger: any;
  public preClaim: any;
  public claimDetail: any;
  public tp_premium: any;
  public od_premium: any;
  public comphensivePreminium: any;
  public idv: any;
  //dob
  proposerAge : any;
  nomineeAge : any;
  npnomineeAge : any;
  npshowNominee : any;
  showNominee : any;
  personalDobError : any;
  previousDateError : any;
  ProposalId : any;

  constructor(public fb: FormBuilder ,public appsetting: AppSettings,public config: ConfigurationService,public dialog: MatDialog, public route: ActivatedRoute , public validation: ValidationService ,private toastr: ToastrService, public bikeInsurance: BikeInsuranceService , public authservice: AuthService , public datepipe: DatePipe) {

    let stepperindex = 0;
    this.nonElectricalSumAount=false
    this.electricalSumAount=false
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
          sessionStorage.relianceTwowheelerproposalID = this.ProposalId;

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
    this.settings = appsetting.settings;
    this.webhost = this.config.getimgUrl();
    this.clientTypeField=false;
    this.addonValue=false;
    this.proposerAge='';

    this.relianceProposal = this.fb.group({
      clientType: ['' , Validators.required],
      corporateName: [''],
      firstName : [''],
      lastName : [''],
      middleName : [''],
      dob : ['' , Validators.required],
      title : [''],
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
      titleValue : ['' ],
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
      gstNumber : [''],
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
      // prevPolSold : ['',Validators.required],
      prevInsurerAddress: ['',Validators.required],
      prevInsuranceValue: [''],
      prevYearPolicyTypeValue: [''],
    });

    this.coverDetails = this.fb.group({
      IDV: ['', Validators.required],
      IsVehicleHypothicated: [''],
      FinancierName: [''],
      FinanceType: [''],
      FinancierAddress: [''],
      FinanceTypeValue: [''],

      AutomobileAssociationMember: [''],
      // InsurancePremium: [''],
      PAToOwnerDriverCoverd: [''],
      NilDepreciationCoverage: [''],
      nilDepApplyingFirstTime: 'No',
      // TPPDCover: [''],
      // TPPDCoverSi: [''],
      BasicODCoverage: ['',Validators.required],
      BasicLiability: ['',Validators.required],
      nrelationValue: [''],
      fuelTypeValue: [''],
      nOtherRelationValue: [''],
      // PACoverToOwner: [''],
      IsElectricalItemFitted: [''],
      IsNonElectricalItemFitted: [''],
      ElectricalItemsTotalSI: [''],
      NonElectricalItemsTotalSI: [''],
      BiFuelKitSi: [''],
      bifueltype: [''],
      fittngType: [''],
      cpgLpgKit: [''],
      IsBiFuelKit: [''],
      VoluntaryDeductableAmount: [''],
      IsVoluntaryDeductableOpted: [''],
      UnnamedPassengerCovered: [''],
      NoOfUnnamedPassenegersCovered: [''],
      // totalUnnamedPassengerPremium: [''],
      // NonElectricalItemsTotalPremium: [''],
      // totalVoluntaryPremium: [''],
      // ElectricalItemsTotalPremium: [''],
      // totalPAToOwnerDriverPremium: [''],
      UnnamedPassengersSI: [''],
      cappointeeName: [''],
      cnomineeName: [''],
      cnDob: [''],
      nrelation: [''],
      nOtherRelation: [''],
      cnAddress: [''],
      fuelType: ['',Validators.required],
      AntiTheftDeviceFitted: [''],
      // totalAutomobilePremium: [''],
      // totalAntiTheftPremium: [''],
      // totalBasicODPremium: [''],
      // totalBasicLiabilityPremium: [''],
      bifuelAmount: [''],
      // totalDepreciationPremium: [''],
      PAToNamedPassenger:'',
      noNamedPassenegers:'',
      namedPassengersSI:'',
      // totalNamedPassengerPremium:'',

      // isTPPDCover:'',
      // totalTPPDCover:'',
      // NoOfTPPDCover: [''],
      // tPPDCoverSI: [''],

    });

    // this.riskDetails = this.fb.group({
    //   // AgentName: [''],
    //   // OtherSystemName: ['', Validators.required],
    //   IDV: ['', Validators.required],
    //   IsVehicleHypothicated: [''],
    //   FinancierName: [''],
    //   FinanceType: [''],
    //   FinancierAddress: [''],
    //   // trailerAttached: [''],
    //   // trailerIDV: [''],
    //   // serialNo: [''],
    //   FinanceTypeValue: [''],
    //   // OtherSystemNameValue: [''],
    //     }
    // );
    this.nationalityList = {
      '1949': 'Indian',
      '1950': 'others',
    };

    this.bifueltypeList = {
      '0': 'LPG',
      '1': 'CNG',
    }

    this.fittngTypeList ={
      '0': 'Inbuilt',
      '1':'External',
    }
    this.otherSystemNameList = {
      '0': 'Customer',
      '1': 'Agent',
    }

  }

  ngOnInit() {

    this.buyBikeDetails = JSON.parse(sessionStorage.buyProductDetails);
    this.buyProduct = JSON.parse(sessionStorage.bikeListDetails);

    console.log(this.buyBikeDetails,'buybikedetails');
    this.enquiryFormData = JSON.parse(sessionStorage.enquiryFormData);
    this.bikeEnquiryId = sessionStorage.bikeEnquiryId;
    this.changeGender();
    this.occupation();
    this.fueltype();
    this.prevInsurer();
    this.prevPolicy();
    this.session();
    this.maritalStatus();
    this.relationList();
    this.voluntaryAmount();
    this.unnamedSi();
    this.getTppdSi();
    this.getFinancialType();
    this.getPaSi();
    this.nilDepPolicy();
    // this.getCover();

  }

  // changeClientType(){
  //   alert(this.relianceProposal.controls['clientType'].value)
  //   if(this.relianceProposal.controls['clientType'].value == 0){
  //     alert('individula')
  //     this.clientTypeField==true;
  //   }else if(this.relianceProposal.controls['clientType'].value == 1){
  //     alert('corporate')
  //     this.clientTypeField==false;
  //   }
  // }
  clientTypeReq(){
    if(this.relianceProposal.controls['clientType'].value == 0){
      this.clientTypeField=true;
      this.relianceProposal.controls['corporateName'].patchValue('');
      this.relianceProposal.controls['corporateName'].setValidators(null);

      this.relianceProposal.controls['title'].setValidators([Validators.required]);
      this.relianceProposal.controls['firstName'].setValidators([Validators.required]);
      this.relianceProposal.controls['middleName'].setValidators(null);
      this.relianceProposal.controls['lastName'].setValidators([Validators.required]);
      this.relianceProposal.controls['gender'].setValidators([Validators.required]);
      this.relianceProposal.controls['dob'].setValidators([Validators.required]);
      this.relianceProposal.controls['occupation'].setValidators([Validators.required]);
      this.relianceProposal.controls['maritalStatus'].setValidators(null);

    }else if(this.relianceProposal.controls['clientType'].value == 1) {
        this.clientTypeField=false;
        this.relianceProposal.controls['corporateName'].setValidators([Validators.required]);

      this.coverDetails.controls['PAToOwnerDriverCoverd'].patchValue('');

      this.coverDetails.controls['PAToOwnerDriverCoverd'].setValidators(null);
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
      this.coverDetails.controls['nrelationValue'].patchValue('');
      this.coverDetails.controls['nrelationValue'].setValidators(null);
      // this.coverDetails.controls['totalPAToOwnerDriverPremium'].patchValue('');
      // this.coverDetails.controls['totalPAToOwnerDriverPremium'].setValidators(null);

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

  changeOccupation(){
    this.relianceProposal.controls['occupationValue'].patchValue(this.occupationList[this.relianceProposal.controls['occupation'].value]);
  }

  changeMarital(){
    this.relianceProposal.controls['maritalStatusValue'].patchValue(this.maritalList[this.relianceProposal.controls['maritalStatus'].value]);

  }
  changeNationality(){
    this.relianceProposal.controls['nationalityValue'].patchValue(this.nationalityList[this.relianceProposal.controls['nationality'].value]);

  }

  changenpOtherRelation(){
    this.coverDetails.controls['npOtherRelationValue'].patchValue(this.relationListData[this.coverDetails.controls['npOtherRelation'].value]);
  }

  changeTitle(){
    this.relianceProposal.controls['titleValue'].patchValue(this.titleList[this.relianceProposal.controls['title'].value]);
  }

  changenpRelation(){
    this.coverDetails.controls['nprelationValue'].patchValue(this.relationListData[this.coverDetails.controls['nprelation'].value]);
  }
  changeFinancialType(){
    this.coverDetails.controls['FinanceTypeValue'].patchValue(this.financialTypeList[this.coverDetails.controls['FinanceType'].value]);
  }


  // changeOtherSystem(){
  //   console.log(this.otherSystemNameList,'list');
  //   console.log(this.riskDetails.controls['OtherSystemName'].value)
  //   this.riskDetails.controls['OtherSystemNameValue'].patchValue(this.otherSystemNameList[this.riskDetails.controls['OtherSystemName'].value]);
  //   console.log(this.riskDetails.controls['OtherSystemNameValue'],'valllllll');
  // }
  changenRelation(){
    this.coverDetails.controls['nrelationValue'].patchValue(this.relationListData[this.coverDetails.controls['nrelation'].value]);
  }
  changenOtherRelation(){
    this.coverDetails.controls['nOtherRelationValue'].patchValue(this.relationListData[this.coverDetails.controls['nOtherRelation'].value]);
  }
  changeFuel(){
    this.coverDetails.controls['fuelTypeValue'].patchValue(this.fuelTypeList[this.coverDetails.controls['fuelType'].value]);
    // if(this.coverDetails.controls['fuelType'].value == 5){
    //   // this.coverDetails.controls['IsBiFuelKit'].patchValue(true);
    //   //
    //   // this.coverDetails.controls['BiFuelKitSi'].patchValue(this.coverDetails.controls['BiFuelKitSi'].value);
    //   this.coverDetails.controls['BiFuelKitSi'].setValidators([Validators.required]);
    //   this.coverDetails.controls['bifueltype'].setValidators([Validators.required]);
    // }else {
    //   this.coverDetails.controls['IsBiFuelKit'].patchValue(false);
    //
    //   this.coverDetails.controls['BiFuelKitSi'].patchValue('');
    //   this.coverDetails.controls['BiFuelKitSi'].setValidators(null);
    //   // this.coverDetails.controls['BiFuelKitSi'].updateValueAndValidity();
    //
    //   this.coverDetails.controls['bifueltype'].patchValue('');
    //   this.coverDetails.controls['bifueltype'].setValidators(null);
    //   // this.coverDetails.controls['bifueltype'].updateValueAndValidity();
    // }
    // this.coverDetails.controls['BiFuelKitSi'].updateValueAndValidity();
    // this.coverDetails.controls['bifueltype'].updateValueAndValidity();

  }
  changeInsurer(){
    this.previousInsurance.controls['prevInsuranceValue'].patchValue(this.prevInsurerList[this.previousInsurance.controls['prevInsurance'].value]);
  }

  changePrevYear(){
    this.previousInsurance.controls['prevYearPolicyTypeValue'].patchValue(this.prevPolicyList[this.previousInsurance.controls['prevYearPolicyType'].value]);
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
  // changePAOwnerDriver(){
  //   if(this.relianceProposal.controls['clientType'].value == 1 && this.coverDetails.controls['PAToOwnerDriverCoverd'].value==true){
  //     this.toastr.error('CPA cover is not allowed for Corporate customer');
  //   }
  //
  // }
  maritalvalue1(){
    if (this.relianceProposal.controls['title'].value == 'Mr.') {
      this.relianceProposal.controls['gender'].patchValue('Male');
    } else if(this.relianceProposal.controls['title'].value == 'Mrs.' || this.relianceProposal.controls['title'].value == 'Ms.' )  {
      this.relianceProposal.controls['gender'].patchValue('Female');
      // this.proposer.controls['dob'].setValidators([Validators.required]);
    }
  }
  maritalvalue() {
    if (this.relianceProposal.controls['title'].value == 'Mr.') {
      this.relianceProposal.controls['gender'].patchValue('Male');
    } else if(this.relianceProposal.controls['title'].value == 'Mrs.' || this.relianceProposal.controls['title'].value == 'Ms.' )  {
      this.relianceProposal.controls['gender'].patchValue('Female');
      // this.proposer.controls['dob'].setValidators([Validators.required]);
    } else {
      if(this.relianceProposal.controls['title'].value == 'Dr.'){
        this.relianceProposal.controls['gender'].patchValue('');
        this.relianceProposal.controls['gender'].setValidators([Validators.required]);
        // this.proposer.controls['dob'].setValidators([Validators.required]);
        console.log(this.relianceProposal.controls['gender'].value,'genders......')

      }
    }

  }

  updateMandatory() {
    if (this.coverDetails.controls['PAToOwnerDriverCoverd'].value==true) {
      // this.coverDetails.controls['PAToOwnerDriverCoverd'].patchValue(true);
      //
      this.coverDetails.controls['cnomineeName'].setValidators([Validators.required]);
      //
      this.coverDetails.controls['cnDob'].setValidators([Validators.required]);
      //
      this.coverDetails.controls['nrelation'].setValidators([Validators.required]);
      ///
      this.coverDetails.controls['cnAddress'].setValidators([Validators.required]);
      //
      // this.coverDetails.controls['totalPAToOwnerDriverPremium'].setValidators([Validators.required]);
      // this.getCover();

    } else {

      this.coverDetails.controls['cappointeeName'].patchValue('');
      this.coverDetails.controls['cappointeeName'].setValidators(null);

      //
      this.coverDetails.controls['cnomineeName'].patchValue('');
      this.coverDetails.controls['cnomineeName'].setValidators(null);
      //
      this.coverDetails.controls['cnDob'].patchValue('');
      this.coverDetails.controls['cnDob'].setValidators(null);
      //
      this.coverDetails.controls['nrelation'].patchValue('');
      this.coverDetails.controls['nrelation'].setValidators(null);
      //
      this.coverDetails.controls['cnAddress'].patchValue('');
      this.coverDetails.controls['cnAddress'].setValidators(null);
      //
      this.coverDetails.controls['nOtherRelation'].patchValue('');
      this.coverDetails.controls['nOtherRelation'].setValidators(null);
      this.coverDetails.controls['nrelationValue'].patchValue('');
      this.coverDetails.controls['nrelationValue'].setValidators(null);


      // this.coverDetails.controls['totalPAToOwnerDriverPremium'].patchValue('');
      // this.coverDetails.controls['totalPAToOwnerDriverPremium'].setValidators(null);
    }
    this.coverDetails.controls['cnomineeName'].updateValueAndValidity();
    this.coverDetails.controls['cappointeeName'].updateValueAndValidity();
    this.coverDetails.controls['cnDob'].updateValueAndValidity();
    this.coverDetails.controls['nrelation'].updateValueAndValidity();
    this.coverDetails.controls['cnAddress'].updateValueAndValidity();
    this.coverDetails.controls['nOtherRelation'].updateValueAndValidity();
    // this.coverDetails.controls['totalPAToOwnerDriverPremium'].updateValueAndValidity();

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
  //
  //     this.coverDetails.controls['NonamedPassenegers'].setValidators([Validators.required]);
  //     this.coverDetails.controls['NonamedPassenegers'].updateValueAndValidity();
  //
  //
  //     //
  //     this.coverDetails.controls['nprelation'].setValidators([Validators.required]);
  //     this.coverDetails.controls['nprelation'].updateValueAndValidity();
  //     ///
  //     this.coverDetails.controls['npAddress'].setValidators([Validators.required]);
  //     this.coverDetails.controls['npAddress'].updateValueAndValidity();
  //     //
  //     this.coverDetails.controls['npOtherRelation'].setValidators([Validators.required]);
  //     this.coverDetails.controls['npOtherRelation'].updateValueAndValidity();
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
  //
  //
  //
  //
  //     this.coverDetails.controls['NonamedPassenegers'].patchValue('');
  //     this.coverDetails.controls['NonamedPassenegers'].setValidators(null);
  //     this.coverDetails.controls['NonamedPassenegers'].updateValueAndValidity();
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

  //
  updateVoluntary(){
    if(this.coverDetails.controls['IsVoluntaryDeductableOpted'].value==true){

      this.coverDetails.controls['VoluntaryDeductableAmount'].setValidators([Validators.required]);

    }else {
      this.coverDetails.controls['VoluntaryDeductableAmount'].patchValue('');
      this.coverDetails.controls['VoluntaryDeductableAmount'].setValidators(null);
    }
    this.coverDetails.controls['VoluntaryDeductableAmount'].updateValueAndValidity();

  }

  // updateDrivingTuition(){
  //   if(this.coverDetails.controls['drivingTuitionCoverage'].value==true){
  //
  //     this.coverDetails.controls['NoOfdrivingTuitionCoverage'].setValidators([Validators.required]);
  //     this.coverDetails.controls['totaldrivingTuitionCoverage'].setValidators([Validators.required]);
  //     this.getCover();
  //
  //   }else {
  //     this.coverDetails.controls['NoOfdrivingTuitionCoverage'].patchValue('');
  //     this.coverDetails.controls['NoOfdrivingTuitionCoverage'].setValidators(null);
  //     this.coverDetails.controls['totaldrivingTuitionCoverage'].patchValue('');
  //     this.coverDetails.controls['totaldrivingTuitionCoverage'].setValidators(null);
  //   }
  //   this.coverDetails.controls['NoOfdrivingTuitionCoverage'].updateValueAndValidity();
  //   this.coverDetails.controls['totaldrivingTuitionCoverage'].updateValueAndValidity();
  //
  // }




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
          } else if (type == 'insurer') {
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
        this.proposerAge = this.ageCalculate(dob);
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





      // if (type == 'npnominee') {
      //   console.log(this.npnomineeAge, 'npnomineeAge');
      //   sessionStorage.npnomineeAge = this.npnomineeAge;
      //   if (sessionStorage.npnomineeAge <= 18) {
      //
      //     this.npshowNominee = true;
      //     this.coverDetails.controls['npappointeeName'].setValidators([Validators.required]);
      //     this.coverDetails.controls['npappointeeName'].updateValueAndValidity();
      //
      //     this.coverDetails.controls['npOtherRelation'].setValidators([Validators.required]);
      //     this.coverDetails.controls['npOtherRelation'].updateValueAndValidity();
      //   } else {
      //     this.coverDetails.controls['npappointeeName'].patchValue('');
      //     this.coverDetails.controls['npappointeeName'].setValidators(null);
      //     this.coverDetails.controls['npappointeeName'].updateValueAndValidity();
      //
      //     this.coverDetails.controls['npOtherRelation'].patchValue('');
      //     this.coverDetails.controls['npOtherRelation'].setValidators(null);
      //     this.coverDetails.controls['npOtherRelation'].updateValueAndValidity();
      //     this.npshowNominee = false;
      //
      //   }
      // }
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
    this.bikeInsurance.RelianceGetTitleList(data).subscribe(
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
//coverPremium
  getCover(stepper) {
    console.log( this.bikeEnquiryId,' this.bikeEnquiryId,')
    const data = {
      // 'platform': 'web',
      // 'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      // 'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      // 'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
      // 'enquiry_id': this.bikeEnquiryId,
      // 'created_by': '',
      // 'proposal_id': sessionStorage.relianceTwowheelerproposalID == '' || sessionStorage.relianceTwowheelerproposalID == undefined ? '' : sessionStorage.relianceTwowheelerproposalID,
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
          'IsNilDepApplyingFirstTime':this.coverDetails.controls['nilDepApplyingFirstTime'].value,
          // 'IsPAToDriverCovered': this.coverDetails.controls['paPaidDriver'].value ? 'true' : 'false',
          // 'IsRoadTaxcover': this.coverDetails.controls['IsRoadTaxcover'].value ? 'true' : 'false',
          // 'IsTPPDCover': this.coverDetails.controls['isTPPDCover'].value ? 'true' : 'false',
          'IsTPPDCover': '',
          // "IsFibreGlassFuelTankFitted":this.coverDetails.controls['fibreGlassFuel'].value ? 'true' : 'false',
          // "IsUsedForDrivingTuition": this.coverDetails.controls['drivingTuitionCoverage'].value ? 'true' : 'false',
          // "IsOverTurningCovered": this.coverDetails.controls['turningCovered'].value ? 'true' : 'false',
          // "OverTurningCovered": this.coverDetails.controls['turningCovered'].value ? 'true' : 'false',
          // "IsGeographicalAreaExtended": this.coverDetails.controls['geographical'].value ? 'true' : 'false',
          // "Imt23LampOrTyreTubeOrHeadlight": this.coverDetails.controls['imt23Lamp'].value ? 'true' : 'false',
          // "HiredVehicleDrivenByHirer":'',
          // "IsSpeciallyDesignedForHandicapped": this.coverDetails.controls['speciallyDesigned'].value ? 'true' : 'false',
          "IsPAToUnnamedPassengerCovered": this.coverDetails.controls['UnnamedPassengerCovered'].value ? 'true' : 'false',
          "IsPAToNamedPassenger": this.coverDetails.controls['PAToNamedPassenger'].value ? 'true' : 'false',
          // "IsDetariffRateForOverturning": "",
          // "CommercialVehicleUsedAsPrivate": "",
          // "CommercialVehicleUsedAsPrivateLiability": "",
          // "IsIndemnityToHirerCovered": "",
          // "IndemnityToHirerLiability": "",
          // "IndemnityToHirer": {
          //   "IndemnityToHirer": {
          //     "IsMandatory": "true",
          //     "IsChecked": "true",
          //     "NoOfItems": "2"
          //   }
          // },
          "PAToNamedPassenger": {
            "PAToNamedPassenger": {
              "IsChecked": this.coverDetails.controls['PAToNamedPassenger'].value ? 'true' : 'false',
              "NoOfItems": this.coverDetails.controls['noNamedPassenegers'].value,
              "SumInsured": this.coverDetails.controls['namedPassengersSI'].value
            }
          },
          'PAToUnNamedPassenger': {
            'PAToUnNamedPassenger': {
              'IsChecked': this.coverDetails.controls['UnnamedPassengerCovered'].value ? 'true' : 'false',
              'NoOfItems': this.coverDetails.controls['NoOfUnnamedPassenegersCovered'].value,
              'SumInsured': this.coverDetails.controls['UnnamedPassengersSI'].value
            }
          },

          // "TPPDCover": {
          //   "TPPDCover": {
          //     "IsMandatory": this.coverDetails.controls['isTPPDCover'].value ? 'true' : 'false',
          //     "PolicyCoverID": "",
          //     "SumInsured": this.coverDetails.controls['tPPDCoverSI'].value,
          //     "IsChecked": this.coverDetails.controls['isTPPDCover'].value ? 'true' : 'false',
          //     "NoOfItems": this.coverDetails.controls['NoOfTPPDCover'].value,
          //     "PackageName": ""
          //   }
          // },
          //   "TPPDCover": {
          //   "TPPDCover": {
          //     "IsMandatory": '',
          //     "PolicyCoverID": "",
          //     "SumInsured": '',
          //     "IsChecked":'',
          //     "NoOfItems": '',
          //     "PackageName": ""
          //   }
          // },

          "NilDepreciationCoverage": {
            "NilDepreciationCoverage": {
              "IsMandatory": this.coverDetails.controls['NilDepreciationCoverage'].value ? 'true' : 'false',
              "IsChecked": this.coverDetails.controls['NilDepreciationCoverage'].value ? 'true' : 'false',
              "NoOfItems": "1",
              "PackageName": "",
              "PolicyCoverID": "",
              "ApplicableRate": "1.0"
            }
          },
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
              "ISLpgCng": this.coverDetails.controls['cpgLpgKit'].value ? 'true' : 'false',
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
          }
        }
      }
    }
    this.settings.loadingSpinner = true;
    this.bikeInsurance.coverPremium(data).subscribe(
        (successData) => {
          this.coverPreSuccess(successData,stepper);
        },
        (error) => {
          this.coverPreFailure(error);
        }
    );
  }
  public coverPreSuccess(successData,stepper) {
    if (successData.IsSuccess) {
      this.coverListValue = successData.ResponseObject;
      console.log(this.coverListValue,'coverListValue......');

      this.basic_liability=this.coverListValue.coverlist[0].basic_liability;
        sessionStorage.basic_liability = (this.basic_liability);
      console.log(sessionStorage.basic_liability,'sessionStorage.basic_liability....');

      this.automobile_association=this.coverListValue.coverlist[0].automobile_association;
        sessionStorage.automobile_association = (this.automobile_association);
      console.log(sessionStorage.automobile_association,'automobile_association....');

      this.voluntary_deductible=this.coverListValue.coverlist[0].voluntary_deductible;
        sessionStorage.voluntary_deductible = (this.voluntary_deductible);
      console.log(sessionStorage.voluntary_deductible,'voluntary_deductible....');

      this.Anti_theft=this.coverListValue.coverlist[0].Anti_theft;
        sessionStorage.Anti_theft = (this.Anti_theft);
      console.log(sessionStorage.Anti_theft,'Anti_theft....');

      this.non_electrical_accessories=this.coverListValue.coverlist[0].non_electrical_accessories;
        sessionStorage.non_electrical_accessories = (this.non_electrical_accessories);
      console.log(sessionStorage.non_electrical_accessories,'non_electrical_accessories....');

      this.electrical_accessories=this.coverListValue.coverlist[0].electrical_accessories;
        sessionStorage.electrical_accessories = (this.electrical_accessories);
      console.log(sessionStorage.electrical_accessories,'electrical_accessories....');

      this.basic_od=this.coverListValue.coverlist[0].basic_od;
        sessionStorage.basic_od = (this.basic_od);
      console.log(sessionStorage.basic_od,'basic_od....');

      this.pa_owner_driver=this.coverListValue.coverlist[0].pa_owner_driver;
        sessionStorage.pa_owner_driver = (this.pa_owner_driver);
      console.log(sessionStorage.pa_owner_driver,'pa_owner_driver....');

      this.nil_depreciation=this.coverListValue.coverlist[0].nil_depreciation;
        sessionStorage.nil_depreciation = (this.nil_depreciation);
      console.log(sessionStorage.nil_depreciation,'nil_depreciation....');

      this.pa_unnamed_passenger=this.coverListValue.coverlist[0].pa_unnamed_passenger;
        sessionStorage.pa_unnamed_passenger = (this.pa_unnamed_passenger);

      this.pa_named_passenger=this.coverListValue.coverlist[0].pa_named_passenger;
        sessionStorage.pa_named_passenger = (this.pa_named_passenger);
      console.log(sessionStorage.pa_unnamed_passenger,'pa_unnamed_passenger....');

      this.tppd=this.coverListValue.coverlist[0].tppd;
        sessionStorage.tppd = (this.tppd);
      console.log(sessionStorage.tppd,'tppd....');
      // this.specially_designed=this.coverListValue.coverlist[0].specially_designed;
      // console.log(this.specially_designed,'specially_designed....');
      // this.fibre_glass_tank=this.coverListValue.coverlist[0].fibre_glass_tank;
      // console.log(this.fibre_glass_tank,'fibre_glass_tank....');
      // this.geographical_extension=this.coverListValue.coverlist[0].geographical_extension;
      // console.log(this.geographical_extension,'geographical_extension....');
      // this.driving_tution=this.coverListValue.coverlist[0].driving_tution;
      // console.log(this.driving_tution,'driving_tution....');
      this.Bifuel_Kit=this.coverListValue.coverlist[0].Bifuel_Kit;
        sessionStorage.Bifuel_Kit = (this.Bifuel_Kit);
      console.log(sessionStorage.Bifuel_Kit,'pa_unnamed_passenger....');
      this.settings.loadingSpinner = false;
      this. popUp(stepper);

      // this.valueUnnamedPass();
      // this.valueNamedPass();
      // this.getValueVoluntary();
      // this.getValueDriverCover();
      // this.getValueAutomobile();
      // this.getValueAntiTheft();
      // this.getValueBasicOD();
      // this.getElectric();
      // this.getValueNonElectric();
      // this.getValueBasicLiability();
      // this.changeBifuel();
      // this.getNildepreciationCover();
      // this.gettotalTPPDCover();

      // this.gettotalspeciallyDesigned();
      // this.gettotalfibreGlassFuel();
      // this.gettotalgeographical();
      // this.gettotalDrivingTuition();

    }
    else{
      this.settings.loadingSpinner = false;
      this.toastr.error(successData.ErrorObject);
    }
  }
  public coverPreFailure(error) {
  }

  //stepper
  nextTab(stepper,value,type) {

    if (type == 'stepper1') {
      this.proposerData = value;
      sessionStorage.stepper1Details = '';
      sessionStorage.stepper1Details = JSON.stringify(value);
      this.coverDetails.controls['IDV'].patchValue(this.buyBikeDetails.Idv);
      console.log(this.proposerData.value,'proposerData...')
      console.log(this.relianceProposal.value,'value.....11...')
      console.log(sessionStorage.proposerAge,'age1...')
      if (this.relianceProposal.valid) {
        if(sessionStorage.proposerAge >= 18 ||(this.relianceProposal.controls['clientType'].value == 1&&this.proposerAge=='')){
          stepper.next();
          this.topScroll();
          // this.clientTypeReq();
          // this.coverperimum();
          // this.coverDetails.controls['BasicODCoverage'].patchValue(true);
          // this.coverDetails.controls['BasicLiability'].patchValue(true);
        }else {
          this.toastr.error('Proposer Age should be greater than 18.')
        }
      }else{
        this.toastr.error('Please fill the Mandatory Fields')

      }
    }
    // else if (type == 'stepper2') {
    //   sessionStorage.stepper2Details = '';
    //   sessionStorage.stepper2Details = JSON.stringify(value);
    //   if (this.riskDetails.valid) {
    //     stepper.next();
    //     this.topScroll();
    //     this.clientTypeReq();
    //     this.coverperimum();
    //     this.coverDetails.controls['BasicODCoverage'].patchValue(true);
    //     this.coverDetails.controls['BasicLiability'].patchValue(true);
    //   }else{
    //     this.toastr.error('Please fill the Mandatory Fields')
    //
    //   }
    // }
    else if (type == 'stepper2') {
      sessionStorage.stepper2Details = '';
      sessionStorage.stepper2Details = JSON.stringify(value);
      if (this.previousInsurance.valid) {
        stepper.next();
        this.topScroll();
        this.clientTypeReq();
        this.coverperimum();
        this.coverDetails.controls['BasicODCoverage'].patchValue(true);
        this.coverDetails.controls['BasicLiability'].patchValue(true);
      }else{
        this.toastr.error('Please fill the Mandatory Fields')

      }
    }

    else if (type == 'stepper3') {
      console.log(this.coverDetails.value,'this.coverDetails.....');
      console.log(this.electricalSumAount,'electricalSumAount...');
      console.log(this.nonElectricalSumAount,'electricalSumAount...');
      sessionStorage.stepper3Details = '';
      sessionStorage.stepper3Details = JSON.stringify(value);
      if (this.coverDetails.valid&&(this.electricalSumAount==false)&&(this.nonElectricalSumAount==false)) {
        console.log(typeof (this.buyProduct.business_type),'type');
        if(this.addonValue==true){
          this.createProposal(stepper, value);
        }
        // if (this.buyProduct.business_type == 1){
        //     if(this.addonValue==true) {
        //         this.createProposal(stepper, value);
        //     }
        // }
        // else{
        //     console.log(this.addonValue,'erthjklvcbnn');
        //     if(this.addonValue==true){
        //   stepper.next();
        //   this.topScroll();
        //     }
        // }
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

//Popup
  popUp(stepper){

    let dialogRef = this.dialog.open(reliance2WCover, {
      width: '600px',
      height: '500px'
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(result => {
    console.log(result,'result....')
      if(result==true) {
       this.addonValue=true;
        // this.createProposal(stepper,this.coverDetails.value);
       this.nextTab(stepper,this.coverDetails.value,'stepper3')
      }else if(result==false){
       this.addonValue=false;
      // this.otpFalseError=false
      }

    });
  }


  topScroll() {
    document.getElementById('main-content').scrollTop = 0;
  }


//session
  session(){
    if (sessionStorage.stepper1Details != '' && sessionStorage.stepper1Details != undefined) {
      this.getStepper1 = JSON.parse(sessionStorage.stepper1Details);
      this.relianceProposal = this.fb.group({
        clientType : this.getStepper1.clientType,
        corporateName : this.getStepper1.corporateName,
        firstName : this.getStepper1.firstName,
        lastName : this.getStepper1.lastName,
        middleName : this.getStepper1.middleName,
        dob : this.datepipe.transform(this.getStepper1.dob, 'y-MM-dd'),
        title : this.getStepper1.title,
        titleValue : this.getStepper1.titleValue,
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
        gstNumber : this.getStepper1.gstNumber,
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

    // if(sessionStorage.stepper2Details != '' && sessionStorage.stepper2Details != undefined ){
    //   this.getStepper2 = JSON.parse(sessionStorage.stepper2Details);
    //   this.riskDetails = this.fb.group({
    //     // OtherSystemName: this.getStepper2.OtherSystemName,
    //     IDV: this.getStepper2.IDV,
    //     IsVehicleHypothicated: this.getStepper2.IsVehicleHypothicated,
    //     FinanceTypeValue: this.getStepper2.FinanceTypeValue,
    //     FinanceType: this.getStepper2.FinanceType,
    //     FinancierName: this.getStepper2.FinancierName,
    //     FinancierAddress: this.getStepper2.FinancierAddress,
    //     // trailerAttached: this.getStepper2.trailerAttached,
    //     // trailerIDV: this.getStepper2.trailerIDV,
    //     // serialNo: this.getStepper2.serialNo,
    //     // OtherSystemNameValue: this.getStepper2.OtherSystemNameValue,
    //   });
    // }

    if(sessionStorage.stepper2Details != '' && sessionStorage.stepper2Details != undefined ){
      this.getStepper2 = JSON.parse(sessionStorage.stepper2Details);
      this.previousInsurance = this.fb.group({
        prevInsurance: this.getStepper2.prevInsurance,
        prevYearPolicyType: this.getStepper2.prevYearPolicyType,
        policyNumber: this.getStepper2.policyNumber,
        // prevPolSold: this.getStepper2.prevPolSold,
        prevInsurerAddress: this.getStepper2.prevInsurerAddress,
        prevInsuranceValue: this.getStepper2.prevInsuranceValue,
        prevYearPolicyTypeValue: this.getStepper2.prevYearPolicyTypeValue,
      });
    }

    if(sessionStorage.stepper3Details != '' && sessionStorage.stepper3Details != undefined){
      this.getStepper3 = JSON.parse(sessionStorage.stepper3Details);
      this.coverDetails = this.fb.group({

        IDV: this.getStepper3.IDV,
        IsVehicleHypothicated: this.getStepper3.IsVehicleHypothicated,
        FinanceTypeValue: this.getStepper3.FinanceTypeValue,
        FinanceType: this.getStepper3.FinanceType,
        FinancierName: this.getStepper3.FinancierName,
        FinancierAddress: this.getStepper3.FinancierAddress,

        PAToOwnerDriverCoverd: this.getStepper3.PAToOwnerDriverCoverd,
        AutomobileAssociationMember: this.getStepper3.AutomobileAssociationMember,
        // totalAutomobilePremium: this.getStepper3.totalAutomobilePremium,
        AntiTheftDeviceFitted: this.getStepper3.AntiTheftDeviceFitted,
        // totalAntiTheftPremium: this.getStepper3.totalAntiTheftPremium,
        // totalBasicODPremium: this.getStepper3.totalBasicODPremium,
        // totalBasicLiabilityPremium: this.getStepper3.totalBasicLiabilityPremium,
        bifuelAmount: this.getStepper3.bifuelAmount,
        // totalDepreciationPremium: this.getStepper3.totalDepreciationPremium,
        PAToNamedPassenger: this.getStepper3.PAToNamedPassenger,
        noNamedPassenegers: this.getStepper3.noNamedPassenegers,
        namedPassengersSI: this.getStepper3.namedPassengersSI,
        // drivingTuitionCoverage: this.getStepper3.drivingTuitionCoverage,
        // NoOfdrivingTuitionCoverage: this.getStepper3.NoOfdrivingTuitionCoverage,
        // totaldrivingTuitionCoverage: this.getStepper3.totaldrivingTuitionCoverage,
        // isTPPDCover: this.getStepper3.isTPPDCover,
        // totalNamedPassengerPremium: this.getStepper3.totalNamedPassengerPremium,
        totalTPPDCover: this.getStepper3.totalTPPDCover,
        // totalfibreGlassFuel: this.getStepper3.totalfibreGlassFuel,
        // totalgeographical: this.getStepper3.totalgeographical,
        // totalspeciallyDesigned: this.getStepper3.totalspeciallyDesigned,
        // fibreGlassFuel: this.getStepper3.fibreGlassFuel,
        // turningCovered: this.getStepper3.turningCovered,
        // geographical: this.getStepper3.geographical,
        // imt23Lamp: this.getStepper3.imt23Lamp,
        // HiredVehicleDrivenByHirer: this.getStepper3.HiredVehicleDrivenByHirer,
        // IsDetariffRateForOverturning: this.getStepper3.IsDetariffRateForOverturning,
        // CommercialVehicleUsedAsPrivate: this.getStepper3.CommercialVehicleUsedAsPrivate,
        // CommercialVehicleUsedAsPrivateLiability: this.getStepper3.CommercialVehicleUsedAsPrivateLiability,
        // IsIndemnityToHirerCovered: this.getStepper3.IsIndemnityToHirerCovered,
        // IndemnityToHirerLiability: this.getStepper3.IndemnityToHirerLiability,
        // noOfIndemnityToHirerLiability: this.getStepper3.noOfIndemnityToHirerLiability,
        // speciallyDesigned: this.getStepper3.speciallyDesigned,
        // InsurancePremium: this.getStepper3.InsurancePremium,
        NilDepreciationCoverage: this.getStepper3.NilDepreciationCoverage,
        nilDepApplyingFirstTime: this.getStepper3.nilDepApplyingFirstTime,
        // TPPDCover: this.getStepper3.TPPDCover,
        // TPPDCoverSi: this.getStepper3.TPPDCoverSi,
        BasicODCoverage: this.getStepper3.BasicODCoverage,
        BasicLiability: this.getStepper3.BasicLiability,
        // PACoverToOwner: this.getStepper3.PACoverToOwner,
        IsElectricalItemFitted: this.getStepper3.IsElectricalItemFitted,
        IsNonElectricalItemFitted: this.getStepper3.IsNonElectricalItemFitted,
        IsBiFuelKit: this.getStepper3.IsBiFuelKit,
        ElectricalItemsTotalSI: this.getStepper3.ElectricalItemsTotalSI,
        NoOfUnnamedPassenegersCovered: this.getStepper3.NoOfUnnamedPassenegersCovered,
        NonElectricalItemsTotalSI: this.getStepper3.NonElectricalItemsTotalSI,
        BiFuelKitSi: this.getStepper3.BiFuelKitSi,
        bifueltype: this.getStepper3.bifueltype,
        fittngType: this.getStepper3.fittngType,
        cpgLpgKit: this.getStepper3.cpgLpgKit,
        // paPaidDriver: this.getStepper3.paPaidDriver,
        // paPaidDriverSi: this.getStepper3.paPaidDriverSi,
        // IsRoadTaxcover: this.getStepper3.IsRoadTaxcover,
        // PAToNamedPassenger: this.getStepper3.PAToNamedPassenger,
        // NonamedPassenegers: this.getStepper3.NonamedPassenegers,
        // totalUnnamedPassengerPremium: this.getStepper3.totalUnnamedPassengerPremium,
        // NonElectricalItemsTotalPremium: this.getStepper3.NonElectricalItemsTotalPremium,
        // totalVoluntaryPremium: this.getStepper3.totalVoluntaryPremium,
        // ElectricalItemsTotalPremium: this.getStepper3.ElectricalItemsTotalPremium,
        // totalPAToOwnerDriverPremium: this.getStepper3.totalPAToOwnerDriverPremium,
        VoluntaryDeductableAmount: this.getStepper3.VoluntaryDeductableAmount,
        // NoOfTPPDCover: this.getStepper3.NoOfTPPDCover,
        // tPPDCoverSI: this.getStepper3.tPPDCoverSI,
        IsVoluntaryDeductableOpted: this.getStepper3.IsVoluntaryDeductableOpted,
        UnnamedPassengerCovered: this.getStepper3.UnnamedPassengerCovered,
        UnnamedPassengersSI: this.getStepper3.UnnamedPassengersSI,
        cappointeeName: this.getStepper3.cappointeeName,
        cnomineeName: this.getStepper3.cnomineeName,
        cnDob: this.datepipe.transform(this.getStepper3.cnDob, 'y-MM-dd'),
        nrelation: this.getStepper3.nrelation,
        nOtherRelation: this.getStepper3.nOtherRelation,
        cnAddress: this.getStepper3.cnAddress,
        fuelType: this.getStepper3.fuelType,
        // nOtherRelationValue: this.getStepper3.nOtherRelationValue,
        nrelationValue: this.getStepper3.nrelationValue,
        // npappointeeName: this.getStepper3.npappointeeName,
        // npnomineeName: this.getStepper3.npnomineeName,
        // npDob: this.datepipe.transform(this.getStepper3.npDob, 'y-MM-dd'),
        // nprelation: this.getStepper3.nprelation,
        // npOtherRelation: this.getStepper3.npOtherRelation,
        // npAddress: this.getStepper3.npAddress,
        // npOtherRelationValue: this.getStepper3.npOtherRelationValue,
        // namedPassengersSI: this.getStepper3.namedPassengersSI,
        // nppassengerName: this.getStepper3.nppassengerName,
        // nprelationValue: this.getStepper3.nprelationValue,
        fuelTypeValue: this.getStepper3.fuelTypeValue,
      });

      if (this.getStepper3.fuelType == 5) {
        this.coverDetails.controls['IsBiFuelKit'].patchValue(true);
        this.coverDetails.controls['cpgLpgKit'].patchValue(this.coverDetails.controls['cpgLpgKit'].value);
        //
        this.coverDetails.controls['BiFuelKitSi'].patchValue(this.coverDetails.controls['BiFuelKitSi'].value);

        this.coverDetails.controls['BiFuelKitSi'].setValidators([Validators.required]);
        this.coverDetails.controls['BiFuelKitSi'].updateValueAndValidity();

        this.coverDetails.controls['bifueltype'].setValidators([Validators.required]);
        this.coverDetails.controls['bifueltype'].updateValueAndValidity();
      } else {
        this.coverDetails.controls['IsBiFuelKit'].patchValue(false);
        this.coverDetails.controls['cpgLpgKit'].patchValue(this.coverDetails.controls['cpgLpgKit'].value);


        this.coverDetails.controls['BiFuelKitSi'].patchValue('');
        this.coverDetails.controls['BiFuelKitSi'].setValidators(null);
        this.coverDetails.controls['BiFuelKitSi'].updateValueAndValidity();

        this.coverDetails.controls['bifueltype'].patchValue('');
        this.coverDetails.controls['bifueltype'].setValidators(null);
        this.coverDetails.controls['bifueltype'].updateValueAndValidity();
      }
    }

    if(sessionStorage.nomineeAge != '' && sessionStorage.nomineeAge != undefined) {
      if (sessionStorage.nomineeAge <= 18) {
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

    // if(sessionStorage.npnomineeAge != '' && sessionStorage.npnomineeAge != undefined) {
    //   if (sessionStorage.npnomineeAge <= 18) {
    //     this.npshowNominee = true;
    //     this.coverDetails.controls['npappointeeName'].setValidators([Validators.required]);
    //     this.coverDetails.controls['npappointeeName'].updateValueAndValidity();
    //
    //     this.coverDetails.controls['npOtherRelation'].setValidators([Validators.required]);
    //     this.coverDetails.controls['npOtherRelation'].updateValueAndValidity();
    //   } else {
    //     this.coverDetails.controls['npappointeeName'].patchValue('');
    //     this.coverDetails.controls['npappointeeName'].setValidators(null);
    //     this.coverDetails.controls['npappointeeName'].updateValueAndValidity();
    //
    //     this.coverDetails.controls['npOtherRelation'].patchValue('');
    //     this.coverDetails.controls['npOtherRelation'].setValidators(null);
    //     this.coverDetails.controls['npOtherRelation'].updateValueAndValidity();
    //     this.npshowNominee = false;
    //   }
    // }



  }



  // Occupation LIst

  occupation() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    };
    this.bikeInsurance.occupationList(data).subscribe(
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

  //get marital status list
  maritalStatus() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    };
    this.bikeInsurance.maritalList(data).subscribe(
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
///

  //// GET finansial type

  getFinancialType() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    };
    this.bikeInsurance.getFinancialTypeList(data).subscribe(
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
  ///
  getTppdSi() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    };
    this.bikeInsurance.twoWheelergetTppdSi(data).subscribe(
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

  //
  unnamedSi() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    };
    this.bikeInsurance.twoWheelerunnamedSiList(data).subscribe(
        (successData) => {
          this.unnamedSiSucccess(successData);
        },
        (error) => {
          this.unnamedSiFailure(error);
        }
    );
  }
  public unnamedSiSucccess(successData){
    this.unnamedList = successData.ResponseObject;
  }
  public unnamedSiFailure(error) {
  }

  //fuel type list
  fueltype() {
      const data = {
        'platform': 'web',
        'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
        'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
      };
      this.bikeInsurance.fuelTypeList(data).subscribe(
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

///nominee RelationList
  relationList() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    };
    this.bikeInsurance.relationListDetails(data).subscribe(
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
    this.bikeInsurance.prevInsureList(data).subscribe(
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

  //////VoluntaryDeductableAmount list
    voluntaryAmount() {
      const data = {
        'platform': 'web',
        'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
        'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
      };
      this.bikeInsurance.twoWheelervoluntaryAmountList(data).subscribe(
          (successData) => {
            this.voluntaryAmountListSucccess(successData);
          },
          (error) => {
            this.voluntaryAmountListFailure(error);
          }
      );
    }
    public voluntaryAmountListSucccess(successData){
      this.amountList = successData.ResponseObject;
    }
    public voluntaryAmountListFailure(error) {
    }

    //paPaidDriverAmountList
  getPaSi() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    };
    this.bikeInsurance.twoWheelergetPaSiList(data).subscribe(
        (successData) => {
          this.getPaSiSucccess(successData);
        },
        (error) => {
          this.getPaSiFailure(error);
        }
    );
  }
  public getPaSiSucccess(successData){
    this.paidDriverList = successData.ResponseObject;
  }
  public getPaSiFailure(error) {
  }


  //previous year policy list
  prevPolicy() {
      const data = {
        'platform': 'web',
        'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
        'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
      };
      this.bikeInsurance.prevPolicyList(data).subscribe(
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
      'proposal_id': sessionStorage.relianceTwowheelerproposalID == '' || sessionStorage.relianceTwowheelerproposalID == undefined ? '' : sessionStorage.relianceTwowheelerproposalID,
      'motorproposalObj':{
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
          'GSTIN': this.relianceProposal.controls['gstNumber'].value,
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
          'Salutation': this.relianceProposal.controls['title'].value=='' ? 'M/S' : this.relianceProposal.controls['title'].value,
          'MaritalStatus': this.relianceProposal.controls['maritalStatus'].value,
          'Nationality': this.relianceProposal.controls['nationality'].value
        },
        'Policy': {

          'AgentName': 'Direct',
          'OtherSystemName': "Agent"

        },
        'Risk': {
          'IDV': this.coverDetails.controls['IDV'].value.toString(),
          'IsVehicleHypothicated': this.coverDetails.controls['IsVehicleHypothicated'].value ? 'true' : 'false',
          'FinanceType': this.coverDetails.controls['FinanceType'].value,
          'FinancierName': this.coverDetails.controls['FinancierName'].value,
          'FinancierAddress': this.coverDetails.controls['FinancierAddress'].value,
          'IsRegAddressSameasCommAddress': this.relianceProposal.controls['regSameAscommAddress'].value ? 'true' : 'false',
          'IsRegAddressSameasPermanentAddress': this.relianceProposal.controls['regSameAspermAddress'].value ? 'true' : 'false',
          'IsPermanentAddressSameasCommAddress': this.relianceProposal.controls['sameAsAddress'].value ? 'true' : 'false',
        //   'IsTrailerAttached':this.riskDetails.controls['trailerAttached'].value ? 'true' : 'false',
        //   "TrailerIDV":""
        // },
        // "TrailerInfo": {
        //   "IDV":this.riskDetails.controls['trailerIDV'].value,
        //   "MakeandModel":"",
        //   "SerialNo":this.riskDetails.controls['serialNo'].value
        },
        'Vehicle': {

          'TypeOfFuel': this.coverDetails.controls['fuelType'].value
        },
        'Cover': {
          'IsAutomobileAssociationMember': this.coverDetails.controls['AutomobileAssociationMember'].value ? 'true' : 'false',
          'IsPAToOwnerDriverCoverd': this.coverDetails.controls['PAToOwnerDriverCoverd'].value ? 'true' : 'false',
          'IsAntiTheftDeviceFitted': this.coverDetails.controls['AntiTheftDeviceFitted'].value ? 'true' : 'false',
          // 'IsTPPDCover': this.coverDetails.controls['isTPPDCover'].value ? 'true' : 'false',
          'IsTPPDCover': '',
          // "IsFibreGlassFuelTankFitted":this.coverDetails.controls['fibreGlassFuel'].value ? 'true' : 'false',
          // "IsUsedForDrivingTuition": this.coverDetails.controls['drivingTuitionCoverage'].value ? 'true' : 'false',
          // "IsOverTurningCovered": this.coverDetails.controls['turningCovered'].value ? 'true' : 'false',
          // "OverTurningCovered": this.coverDetails.controls['turningCovered'].value ? 'true' : 'false',
          // "IsGeographicalAreaExtended": this.coverDetails.controls['geographical'].value ? 'true' : 'false',
          // "Imt23LampOrTyreTubeOrHeadlight": this.coverDetails.controls['imt23Lamp'].value ? 'true' : 'false',
          // "HiredVehicleDrivenByHirer":this.coverDetails.controls['HiredVehicleDrivenByHirer'].value ? 'true' : 'false',
          // "IsSpeciallyDesignedForHandicapped": this.coverDetails.controls['speciallyDesigned'].value ? 'true' : 'false',
          "IsPAToUnnamedPassengerCovered": this.coverDetails.controls['UnnamedPassengerCovered'].value ? 'true' : 'false',
          "IsPAToNamedPassenger": this.coverDetails.controls['PAToNamedPassenger'].value ? 'true' : 'false',
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
          'IsNilDepApplyingFirstTime':this.coverDetails.controls['nilDepApplyingFirstTime'].value,
          // 'IsPAToDriverCovered': this.coverDetails.controls['paPaidDriver'].value ? 'true' : 'false',
          // 'IsRoadTaxcover': this.coverDetails.controls['IsRoadTaxcover'].value ? 'true' : 'false',

          // "IsDetariffRateForOverturning": this.coverDetails.controls['IsDetariffRateForOverturning'].value ? 'true' : 'false',
          // "CommercialVehicleUsedAsPrivate": this.coverDetails.controls['CommercialVehicleUsedAsPrivate'].value ? 'true' : 'false',
          // "CommercialVehicleUsedAsPrivateLiability": this.coverDetails.controls['CommercialVehicleUsedAsPrivateLiability'].value ? 'true' : 'false',
          // "IsIndemnityToHirerCovered": this.coverDetails.controls['IsIndemnityToHirerCovered'].value ? 'true' : 'false',
          // "IndemnityToHirerLiability": this.coverDetails.controls['IndemnityToHirerLiability'].value ? 'true' : 'false',
          // "IndemnityToHirer": {
          //   "IndemnityToHirer": {
          //     "IsMandatory": this.coverDetails.controls['IndemnityToHirerLiability'].value ? 'true' : 'false',
          //     "IsChecked": this.coverDetails.controls['IndemnityToHirerLiability'].value ? 'true' : 'false',
          //     "NoOfItems": this.coverDetails.controls['noOfIndemnityToHirerLiability'].value
          //   }
          // },
          "NilDepreciationCoverage": {
            "NilDepreciationCoverage": {
              "IsMandatory":this.coverDetails.controls['NilDepreciationCoverage'].value ? 'true' : 'false',
              "IsChecked": this.coverDetails.controls['NilDepreciationCoverage'].value ? 'true' : 'false',
              "NoOfItems": "1",
              "PackageName": "",
              "PolicyCoverID": "",
              "ApplicableRate": "1.0"
            }
          },
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
              "ISLpgCng": this.coverDetails.controls['cpgLpgKit'].value ? 'true' : 'false',
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
          "PAToNamedPassenger": {
            "PAToNamedPassenger": {
              "IsChecked": this.coverDetails.controls['PAToNamedPassenger'].value ? 'true' : 'false',
              "NoOfItems": this.coverDetails.controls['noNamedPassenegers'].value,
              "SumInsured": this.coverDetails.controls['namedPassengersSI'].value
            }
          },

          // "TPPDCover": {
          //   "TPPDCover": {
          //     "IsMandatory": this.coverDetails.controls['isTPPDCover'].value ? 'true' : 'false',
          //     "PolicyCoverID": "",
          //     "SumInsured": this.coverDetails.controls['tPPDCoverSI'].value,
          //     "IsChecked": this.coverDetails.controls['isTPPDCover'].value ? 'true' : 'false',
          //     "NoOfItems": this.coverDetails.controls['NoOfTPPDCover'].value,
          //     "PackageName": ""
          //   }
          // },
          //   "TPPDCover": {
          //   "TPPDCover": {
          //     "IsMandatory": '',
          //     "PolicyCoverID": "",
          //     "SumInsured": '',
          //     "IsChecked": '',
          //     "NoOfItems": '',
          //     "PackageName": ""
          //   }
          // },
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
          }
        },
        // "RoadTax": {
        //   "RoadTax": {
        //     "IsMandatory": this.coverDetails.controls['IsRoadTaxcover'].value ? 'true' : 'false',
        //     "IsChecked": this.coverDetails.controls['IsRoadTaxcover'].value ? 'true' : 'false',
        //     "NoOfItems": "",
        //     "PackageName": "",
        //     "SumInsured": "180",
        //     "PolicyCoverID": ""
        //   }
        // },
        'PreviousInsuranceDetails': {
          'PrevInsuranceID': '',
          // 'IsVehicleOfPreviousPolicySold': this.previousInsurance.controls['prevPolSold'].value ? 'true' : 'false',
          'PrevYearInsurer': this.previousInsurance.controls['prevInsurance'].value,
          'PrevYearPolicyNo': this.previousInsurance.controls['policyNumber'].value,
          'PrevYearInsurerAddress': this.previousInsurance.controls['prevInsurerAddress'].value,
          'PrevYearPolicyType': this.previousInsurance.controls['prevYearPolicyType'].value
        }
      }
    };
    // if(this.buyProduct.business_type == 1){
      if (this.coverDetails.valid) {
        this.settings.loadingSpinner = true;
        this.bikeInsurance.getProposal(data).subscribe(
            (successData) => {
              this.getProposalSucccess(successData, stepper);
            },
            (error) => {
              this.getProposalFailure(error);
            }
        );
        console.log(data, 'data');
      }
    // }
    // else{
    //   if (this.previousInsurance.valid) {
    //     this.settings.loadingSpinner = true;
    //     this.bikeInsurance.getProposal(data).subscribe(
    //         (successData) => {
    //           this.getProposalSucccess(successData, stepper);
    //         },
    //         (error) => {
    //           this.getProposalFailure(error);
    //         }
    //     );
    //     console.log(data, 'data');
    //   }
    // }
  }

  getProposalSucccess(successData,stepper) {
    this.settings.loadingSpinner = false;
    if (successData.IsSuccess) {
      this.toastr.success('Proposal created successfully!!');
      this.summaryData = successData.ResponseObject;
      sessionStorage.summaryData = JSON.stringify(this.summaryData);
      this.proposalId = this.summaryData.productlist.proposal_id;
      sessionStorage.relianceTwowheelerproposalID = this.proposalId;
      this.PaymentRedirect =   this.summaryData.productlist.PaymentRedirectUrl;
      this.gstAmount=this.summaryData.productlist.gst;
      console.log(this.gstAmount,'this.gstAmount..');
      this.discountAmount=this.summaryData.productlist.discount;
      console.log(this.discountAmount,'this.gstAmount..');
      this.proposerFormData = this.relianceProposal.value;
      this.previousFormData = this.previousInsurance.value;
      sessionStorage.proposerFormData = JSON.stringify(this.proposerFormData);
      // this.riskFormData = this.riskDetails.value;
      // console.log(this.riskFormData,'RISKDATA')
      this.coverFormData = this.coverDetails.value;
      console.log(this.coverFormData,'coverformdata');

      console.log(this.previousFormData,'prevdata');
      this.tp_premium=this.summaryData.productlist.tp_premium;
      this.od_premium=this.summaryData.productlist.od_premium;
      this.comphensivePreminium=this.summaryData.productlist.comphensivePreminium;
      this.idv=this.summaryData.productlist.idv;

      this.coverageValue=this.summaryData.productlist.cover;
      this.Electrical_accessories=this.coverageValue.Electrical_accessories;
      sessionStorage.Electrical_accessories=this.Electrical_accessories;

      this.Nil_depreciation=this.coverageValue.Nil_depreciation;
      sessionStorage.Nil_depreciation=this.Nil_depreciation;

      this.Non_electrical_accessories=this.coverageValue.Non_electrical_accessories;
      sessionStorage.Non_electrical_accessories=this.Non_electrical_accessories;

      this.PA_to_named_passenger=this.coverageValue.PA_to_named_passenger;
      sessionStorage.PA_to_named_passenger=this.PA_to_named_passenger;

      this.PA_to_owner_driver=this.coverageValue.PA_to_owner_driver;
      sessionStorage.PA_to_owner_driver=this.PA_to_owner_driver;

      this.PA_to_unnamed_passenger=this.coverageValue.PA_to_unnamed_passenger;
      sessionStorage.PA_to_unnamed_passenger=this.PA_to_unnamed_passenger;

      this.basic_od=this.coverageValue.basic_od;
      sessionStorage.basic_od=this.basic_od;

      this.basic_liability=this.coverageValue.basic_liability;
      sessionStorage.basic_liability=this.basic_liability;

      this.Electrical_accessories=sessionStorage.Electrical_accessories;
      this.Nil_depreciation=sessionStorage.Nil_depreciation;
      this.Non_electrical_accessories=sessionStorage.Non_electrical_accessories;
      this.PA_to_named_passenger=sessionStorage.PA_to_named_passenger;
      this.PA_to_owner_driver=sessionStorage.PA_to_owner_driver;
      this.PA_to_unnamed_passenger=sessionStorage.PA_to_unnamed_passenger;
      this.basic_od=sessionStorage.basic_od;
      this.basic_liability=sessionStorage.basic_liability;


      stepper.next();
      this.topScroll();
      // this.nextStep();



    } else {
      this.settings.loadingSpinner = false;
      if(successData.type == 'idv') {
        sessionStorage.changeIdvDetail = JSON.stringify(successData.ResponseObject);
        let dialogRef = this.dialog.open(idvvalidatetwoWheeler, {
          width: '700px',
        });
        dialogRef.disableClose = true;
        dialogRef.afterClosed().subscribe(result => {
          this.coverDetails.controls.IDV.patchValue(result);
          this.createProposal(stepper,this.previousInsurance.value);
        });
      }else{
        this.toastr.error(successData.ErrorObject);
      }
    }
  }

  getProposalFailure(error) {

  }


  coverperimum() {
    const data={
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
      'enquiry_id': this.bikeEnquiryId,
      "company_id":"3",
      "TypeOfFuel":this.coverDetails.controls['fuelType'].value==''?'1':this.coverDetails.controls['fuelType'].value,
      'motorproposalObj':{
        'CoverDetails': '',
        'TrailerDetails': '',
        "ClientDetails": {
          "ClientType": this.relianceProposal.controls['clientType'].value,
          "LastName": this.relianceProposal.controls['lastName'].value,
          "MidName": this.relianceProposal.controls['middleName'].value,
          "ForeName": this.relianceProposal.controls['firstName'].value,
          "CorporateName": this.relianceProposal.controls['corporateName'].value,
          "OccupationID": this.relianceProposal.controls['occupation'].value,
          "DOB": this.datepipe.transform(this.relianceProposal.controls['dob'].value, 'y-MM-dd'),
          "Gender": this.relianceProposal.controls['gender'].value,
          "PhoneNo": this.relianceProposal.controls['alternateContact'].value,
          "MobileNo": this.relianceProposal.controls['mobile'].value,

          "ClientAddress": {
            "CommunicationAddress": {

              'AddressType': '0',
              'Address1': this.relianceProposal.controls['address'].value,
              'Address2': this.relianceProposal.controls['address2'].value,
              'Address3': this.relianceProposal.controls['address3'].value,
              'CityID': this.relianceProposal.controls['cityId'].value,
              'DistrictID': this.relianceProposal.controls['districtId'].value,
              'StateID': this.relianceProposal.controls['stateId'].value,
              'Pincode': this.relianceProposal.controls['pincode'].value,
              "Country": "India",
              'NearestLandmark': this.relianceProposal.controls['landmark'].value
            },
            "PermanentAddress": {

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
            "RegistrationAddress": {

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
          'Salutation': this.relianceProposal.controls['title'].value=='' ? 'M/S' : this.relianceProposal.controls['title'].value,
          'MaritalStatus': this.relianceProposal.controls['maritalStatus'].value,
          'Nationality': this.relianceProposal.controls['nationality'].value
        }
      }
    }


  this.bikeInsurance.coveragePremium(data).subscribe(
        (successData) => {
          this.CoverPremiumSucccess(successData);
        },
        (error) => {
          this.CoverPremiumFailure(error);
        }
    );
  }
  public CoverPremiumSucccess(successData){
    // this.amountList = successData.coverage[2].Voluntary_Deductible;
    this.suminsuredvoluntarylist = successData.coverage[0].Voluntary_Deductible;
    console.log( this.suminsuredvoluntarylist,' this.suminsuredvoluntarylist ')
    this.suminsuredpA = successData.coverage[1].PA_to_Unnamed_Passenger;
    this.suminsuredTPPD = successData.coverage[2].TPPD;
    console.log( this.suminsuredpA,' this.suminsuredpA ')
    console.log( this.suminsuredTPPD,' this.suminsuredTPPD ')


  }

  public CoverPremiumFailure(error) {
  }


  //pincode  details
  pincode(pin,type){
    console.log(pin,'pinvalue');
    const data = {
      'platform': 'web',
      'pincode': pin
    };
    if (pin.length == 6) {
      this.bikeInsurance.getrPincodeList(data).subscribe(
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

  //
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

  //updatePaidDriver

  // updatePaidDriver(event){
  //   if(event.checked){
  //     this.coverDetails.controls['paPaidDriver'].patchValue(true);
  //     //
  //     this.coverDetails.controls['paPaidDriverSi'].setValidators([Validators.required]);
  //     this.coverDetails.controls['paPaidDriverSi'].updateValueAndValidity();
  //   }else {
  //     this.coverDetails.controls['paPaidDriver'].patchValue(false);
  //
  //
  //     this.coverDetails.controls['paPaidDriverSi'].patchValue('');
  //     this.coverDetails.controls['paPaidDriverSi'].setValidators(null);
  //     this.coverDetails.controls['paPaidDriverSi'].updateValueAndValidity();
  //   }
  // }


  //
  updateElectricalItem(){
    if(this.coverDetails.controls['IsElectricalItemFitted'].value==true){

      this.coverDetails.controls['ElectricalItemsTotalSI'].setValidators([Validators.required]);

    }else {
      this.coverDetails.controls['ElectricalItemsTotalSI'].patchValue('');
      this.coverDetails.controls['ElectricalItemsTotalSI'].setValidators(null);

    }
    this.coverDetails.controls['ElectricalItemsTotalSI'].updateValueAndValidity();

  }
  changeConditionElect(event:any){
    if((this.coverDetails.controls['ElectricalItemsTotalSI'].value >=1000)&&(this.coverDetails.controls['ElectricalItemsTotalSI'].value <=60000) ){
     this.electricalSumAount=false;
     this.electricalSumAount='';
     // this.getCover();
    }else{
      this.electricalSumAount=true;
      this.electricalSumAount = 'Electrical Accessories Sum Insured Should be greater than 1000 and lesser than 60000';
      // this.getCover();
    }
  }
  // changeMaxElectric(){
  //   if(this.coverDetails.controls['ElectricalItemsTotalSI'].length<3)
  // }
  // changeSumElectric(){
  // if(this.coverDetails.controls['ElectricalItemsTotalSI'].value){
  //   this.coverDetails.controls['ElectricalItemsTotalPremium'].setValidators([Validators.required]);
  //
  // }else{
  //   this.coverDetails.controls['ElectricalItemsTotalPremium'].patchValue('');
  //   this.coverDetails.controls['ElectricalItemsTotalPremium'].setValidators(null);
  // }
  //   this.coverDetails.controls['ElectricalItemsTotalPremium'].updateValueAndValidity();
  //
  // }

  updatenonElectricalItem(){
    if(this.coverDetails.controls['IsNonElectricalItemFitted'].value==true){

      this.coverDetails.controls['NonElectricalItemsTotalSI'].setValidators([Validators.required]);

    }else {
      this.coverDetails.controls['NonElectricalItemsTotalSI'].patchValue('');
      this.coverDetails.controls['NonElectricalItemsTotalSI'].setValidators(null);

    }
    this.coverDetails.controls['NonElectricalItemsTotalSI'].updateValueAndValidity();

  }
  changeConditionNonElect(event:any){
    if((this.coverDetails.controls['NonElectricalItemsTotalSI'].value >=1000)&&(this.coverDetails.controls['NonElectricalItemsTotalSI'].value <=60000) ){
      this.nonElectricalSumAount=false;
      this.nonElectricalSumAount='';
      // this.getCover();
    }else{
      this.nonElectricalSumAount=true;
      this.nonElectricalSumAount = 'Electrical Accessories Sum Insured Should be greater than 1000 and lesser than 60000';
      // this.getCover();
    }
  }
  // changeSumNonElectric(){
  //   if(this.coverDetails.controls['NonElectricalItemsTotalSI'].value){
  //     this.coverDetails.controls['NonElectricalItemsTotalPremium'].setValidators([Validators.required]);
  //
  //   }else{
  //     this.coverDetails.controls['NonElectricalItemsTotalPremium'].patchValue('');
  //     this.coverDetails.controls['NonElectricalItemsTotalPremium'].setValidators(null);
  //   }
  //   this.coverDetails.controls['NonElectricalItemsTotalPremium'].updateValueAndValidity();
  //
  // }


  updatenonBiFuelKit(){
    if(this.coverDetails.controls['IsBiFuelKit'].value==true){

      // this.coverDetails.controls['cpgLpgKit'].patchValue(this.coverDetails.controls['cpgLpgKit'].value);
      //
      // this.coverDetails.controls['BiFuelKitSi'].patchValue(this.coverDetails.controls['BiFuelKitSi'].value);

      this.coverDetails.controls['BiFuelKitSi'].setValidators([Validators.required]);

      this.coverDetails.controls['bifueltype'].setValidators([Validators.required]);

      // this.coverDetails.controls['bifuelAmount'].setValidators([Validators.required]);
      // this.getCover();
    }else {

      // this.coverDetails.controls['cpgLpgKit'].patchValue(this.coverDetails.controls['cpgLpgKit'].value);


      this.coverDetails.controls['BiFuelKitSi'].patchValue('');
      this.coverDetails.controls['BiFuelKitSi'].setValidators(null);

      this.coverDetails.controls['bifueltype'].patchValue('');
      this.coverDetails.controls['bifueltype'].setValidators(null);

      this.coverDetails.controls['cpgLpgKit'].patchValue('');
      this.coverDetails.controls['cpgLpgKit'].setValidators(null);

      // this.coverDetails.controls['bifuelAmount'].patchValue('');
      // this.coverDetails.controls['bifuelAmount'].setValidators(null);
    }
    this.coverDetails.controls['BiFuelKitSi'].updateValueAndValidity();
    this.coverDetails.controls['bifueltype'].updateValueAndValidity();
    // this.coverDetails.controls['bifuelAmount'].updateValueAndValidity();

  }
  // changeBifuel(){
  //   this.coverDetails.controls['bifuelAmount'].patchValue(this.Bifuel_Kit);
  // }
  changeCpgLpgKit(){
    if (this.coverDetails.controls.cpgLpgKit.value == true) {
      // this.coverDetails.controls['totalUnnamedPassengerPremium'].patchValue(this.coverDetails.controls['totalUnnamedPassengerPremium'].value);

      this.coverDetails.controls['fittngType'].setValidators([Validators.required]);
      // this.coverDetails.controls['bifuelAmount'].setValidators([Validators.required]);
    } else {
      this.coverDetails.controls['fittngType'].patchValue('');
      // this.coverDetails.controls['bifuelAmount'].patchValue('');

      this.coverDetails.controls['fittngType'].setValidators(null);
      // this.coverDetails.controls['bifuelAmount'].setValidators(null);

    }
    this.coverDetails.controls['fittngType'].updateValueAndValidity();
    // this.coverDetails.controls['bifuelAmount'].updateValueAndValidity();
  }

  // UnnamedPassengersChange(){
  //   if (this.coverDetails.controls['UnnamedPassengersSI'].value) {
  //     // this.coverDetails.controls['totalUnnamedPassengerPremium'].patchValue(this.coverDetails.controls['totalUnnamedPassengerPremium'].value);
  //     this.coverDetails.controls['totalUnnamedPassengerPremium'].setValidators([Validators.required]);
  //     this.getCover();
  //   } else {
  //     this.coverDetails.controls['totalUnnamedPassengerPremium'].patchValue('');
  //     this.coverDetails.controls['totalUnnamedPassengerPremium'].setValidators(null);
  //
  //   }
  //   this.coverDetails.controls['totalUnnamedPassengerPremium'].updateValueAndValidity();
  // }

  // namedPassengersChange(){
  //   if (this.coverDetails.controls['namedPassengersSI'].value) {
  //     // this.coverDetails.controls['totalUnnamedPassengerPremium'].patchValue(this.coverDetails.controls['totalUnnamedPassengerPremium'].value);
  //     this.coverDetails.controls['totalNamedPassengerPremium'].setValidators([Validators.required]);
  //     this.getCover();
  //   } else {
  //     this.coverDetails.controls['totalNamedPassengerPremium'].patchValue('');
  //     this.coverDetails.controls['totalNamedPassengerPremium'].setValidators(null);
  //
  //   }
  //   this.coverDetails.controls['totalNamedPassengerPremium'].updateValueAndValidity();
  // }




  // totalVoluntaryPremiumChange(){
  //   if (this.coverDetails.controls['VoluntaryDeductableAmount'].value) {
  //     this.coverDetails.controls['totalVoluntaryPremium'].setValidators([Validators.required]);
  //     this.getCover();
  //   } else {
  //     this.coverDetails.controls['totalVoluntaryPremium'].patchValue('');
  //
  //     this.coverDetails.controls['totalVoluntaryPremium'].setValidators(null);
  //
  //   }
  //   this.coverDetails.controls['totalVoluntaryPremium'].updateValueAndValidity();
  // }
  // totaltPPDCoverSIChange(){
  //   if (this.coverDetails.controls['tPPDCoverSI'].value) {
  //     this.coverDetails.controls['totalTPPDCover'].setValidators([Validators.required]);
  //     this.getCover();
  //   } else {
  //     this.coverDetails.controls['totalTPPDCover'].patchValue('');
  //
  //     this.coverDetails.controls['totalTPPDCover'].setValidators(null);
  //
  //   }
  //   this.coverDetails.controls['totalTPPDCover'].updateValueAndValidity();
  // }

  // totalAutomobileAssociatioChange(){
  //   if (this.coverDetails.controls['AutomobileAssociationMember'].value==true) {
  //     // this.coverDetails.controls['totalAutomobilePremium'].patchValue(this.coverDetails.controls['totalAutomobilePremium'].value);
  //
  //     this.coverDetails.controls['totalAutomobilePremium'].setValidators([Validators.required]);
  //     this.getCover();
  //   } else {
  //     this.coverDetails.controls['totalAutomobilePremium'].patchValue('');
  //
  //     this.coverDetails.controls['totalAutomobilePremium'].setValidators(null);
  //
  //   }
  //   this.coverDetails.controls['totalAutomobilePremium'].updateValueAndValidity();
  // }
  // AntiTheftChange(){
  //   if (this.coverDetails.controls['AntiTheftDeviceFitted'].value==true) {
  //     // this.coverDetails.controls['totalAntiTheftPremium'].patchValue(this.coverDetails.controls['totalAntiTheftPremium'].value);
  //
  //     this.coverDetails.controls['totalAntiTheftPremium'].setValidators([Validators.required]);
  //     this.getCover();
  //   } else {
  //     this.coverDetails.controls['totalAntiTheftPremium'].patchValue('');
  //
  //     this.coverDetails.controls['totalAntiTheftPremium'].setValidators(null);
  //
  //   }
  //   this.coverDetails.controls['totalAntiTheftPremium'].updateValueAndValidity();
  // }
  // totalBasicODChange(){
  //   if (this.coverDetails.controls['BasicODCoverage'].value==true) {
  //     // this.coverDetails.controls['totalBasicODPremium'].patchValue(this.coverDetails.controls['totalBasicODPremium'].value);
  //
  //     this.coverDetails.controls['totalBasicODPremium'].setValidators([Validators.required]);
  //     this.getCover();
  //   } else {
  //     this.coverDetails.controls['totalBasicODPremium'].patchValue('');
  //
  //     this.coverDetails.controls['totalBasicODPremium'].setValidators(null);
  //
  //   }
  //   this.coverDetails.controls['totalBasicODPremium'].updateValueAndValidity();
  // }
  // totalBasicLiabilityChange(){
  //   if (this.coverDetails.controls['BasicLiability'].value==true) {
  //     // this.coverDetails.controls['totalBasicODPremium'].patchValue(this.coverDetails.controls['totalBasicODPremium'].value);
  //
  //     this.coverDetails.controls['totalBasicLiabilityPremium'].setValidators([Validators.required]);
  //     this.getCover();
  //   } else {
  //     this.coverDetails.controls['totalBasicLiabilityPremium'].patchValue('');
  //
  //     this.coverDetails.controls['totalBasicLiabilityPremium'].setValidators(null);
  //
  //   }
  //   this.coverDetails.controls['totalBasicLiabilityPremium'].updateValueAndValidity();
  // }
  // totalTPPDCoverChange(){
  //   if (this.coverDetails.controls['isTPPDCover'].value==true) {
  //     // this.coverDetails.controls['totalBasicODPremium'].patchValue(this.coverDetails.controls['totalBasicODPremium'].value);
  //
  //     this.coverDetails.controls['NoOfTPPDCover'].setValidators([Validators.required]);
  //     this.coverDetails.controls['tPPDCoverSI'].setValidators([Validators.required]);
  //
  //   } else {
  //     this.coverDetails.controls['tPPDCoverSI'].patchValue('');
  //     this.coverDetails.controls['tPPDCoverSI'].setValidators(null);
  //     this.coverDetails.controls['NoOfTPPDCover'].patchValue('');
  //     this.coverDetails.controls['NoOfTPPDCover'].setValidators(null);
  //
  //   }
  //   this.coverDetails.controls['NoOfTPPDCover'].updateValueAndValidity();
  //   this.coverDetails.controls['tPPDCoverSI'].updateValueAndValidity();
  // }
  // totalfibreGlassFuelhange(){
  //   if (this.coverDetails.controls['fibreGlassFuel'].value==true) {
  //     // this.coverDetails.controls['totalBasicODPremium'].patchValue(this.coverDetails.controls['totalBasicODPremium'].value);
  //
  //     this.coverDetails.controls['totalfibreGlassFuel'].setValidators([Validators.required]);
  //     this.getCover();
  //   } else {
  //     this.coverDetails.controls['totalfibreGlassFuel'].patchValue('');
  //
  //     this.coverDetails.controls['totalfibreGlassFuel'].setValidators(null);
  //
  //   }
  //   this.coverDetails.controls['totalfibreGlassFuel'].updateValueAndValidity();
  // }
  // totalgeographicalChange(){
  //   if (this.coverDetails.controls['geographical'].value==true) {
  //     // this.coverDetails.controls['totalBasicODPremium'].patchValue(this.coverDetails.controls['totalBasicODPremium'].value);
  //
  //     this.coverDetails.controls['totalgeographical'].setValidators([Validators.required]);
  //     this.getCover();
  //   } else {
  //     this.coverDetails.controls['totalgeographical'].patchValue('');
  //
  //     this.coverDetails.controls['totalgeographical'].setValidators(null);
  //
  //   }
  //   this.coverDetails.controls['totalgeographical'].updateValueAndValidity();
  // }
  // totalspeciallyDesignedChange(){
  //   if (this.coverDetails.controls['speciallyDesigned'].value==true) {
  //     // this.coverDetails.controls['totalBasicODPremium'].patchValue(this.coverDetails.controls['totalBasicODPremium'].value);
  //
  //     this.coverDetails.controls['totalspeciallyDesigned'].setValidators([Validators.required]);
  //     this.getCover();
  //   } else {
  //     this.coverDetails.controls['totalspeciallyDesigned'].patchValue('');
  //
  //     this.coverDetails.controls['totalspeciallyDesigned'].setValidators(null);
  //
  //   }
  //   this.coverDetails.controls['totalspeciallyDesigned'].updateValueAndValidity();
  // }
  nilDepPolicy(){
    this.preClaim=this.enquiryFormData.previous_claim_YN
    if(this.preClaim == 0){
      this.claimDetail=true;

    }else  if(this.preClaim == 1){
      this.claimDetail=false;
      this.coverDetails.controls['NilDepreciationCoverage'].patchValue(false);
    }
  }

  nilDepApplyingChange(){
    if (this.coverDetails.controls.NilDepreciationCoverage.value == true) {

      this.coverDetails.controls['nilDepApplyingFirstTime'].setValidators([Validators.required]);
      // this.coverDetails.controls['totalDepreciationPremium'].setValidators([Validators.required]);
      // this.getCover();
    } else {
      this.coverDetails.controls['nilDepApplyingFirstTime'].patchValue('No');
      // this.coverDetails.controls['totalDepreciationPremium'].patchValue('');

      this.coverDetails.controls['nilDepApplyingFirstTime'].setValidators(null);
      // this.coverDetails.controls['totalDepreciationPremium'].setValidators(null);

    }
    this.coverDetails.controls['nilDepApplyingFirstTime'].updateValueAndValidity();
    // this.coverDetails.controls['totalDepreciationPremium'].updateValueAndValidity();
  }

  //
  // valueUnnamedPass(){
  //   this.coverDetails.controls['totalUnnamedPassengerPremium'].patchValue(this.pa_unnamed_passenger);
  //   console.log( this.coverDetails.controls['totalUnnamedPassengerPremium'].value,'11222')
  // }
  // valueNamedPass(){
  //   this.coverDetails.controls['totalNamedPassengerPremium'].patchValue(this.pa_named_passenger);
  //   console.log( this.coverDetails.controls['totalNamedPassengerPremium'].value,'11222')
  // }
  // getValueVoluntary(){
  //   this.coverDetails.controls['totalVoluntaryPremium'].patchValue(this.voluntary_deductible);
  //   console.log( this.coverDetails.controls['totalVoluntaryPremium'].value,'113333')
  // }
  // getValueDriverCover(){
  //   this.coverDetails.controls['totalPAToOwnerDriverPremium'].patchValue(this.pa_owner_driver);
  //   console.log( this.coverDetails.controls['totalPAToOwnerDriverPremium'].value,'114444')
  // }
  // getNildepreciationCover(){
  //   this.coverDetails.controls['totalDepreciationPremium'].patchValue(this.nil_depreciation);
  //   console.log( this.coverDetails.controls['totalPAToOwnerDriverPremium'].value,'114444')
  // }
  //
  // getValueAutomobile(){
  //   this.coverDetails.controls['totalAutomobilePremium'].patchValue(this.automobile_association);
  //   console.log( this.coverDetails.controls['totalAutomobilePremium'].value,'55555')
  // }
  // getValueAntiTheft(){
  //   this.coverDetails.controls['totalAntiTheftPremium'].patchValue(this.Anti_theft);
  //   console.log( this.coverDetails.controls['totalAntiTheftPremium'].value,'6666')
  // }
  // getValueBasicOD(){
  //   this.coverDetails.controls['totalBasicODPremium'].patchValue(this.basic_od);
  //   console.log( this.coverDetails.controls['totalBasicODPremium'].value,'77777')
  // }
  // getValueBasicLiability(){
  //   this.coverDetails.controls['totalBasicLiabilityPremium'].patchValue(this.basic_liability);
  //   console.log( this.coverDetails.controls['totalBasicLiabilityPremium'].value,'77777')
  // }
  // gettotalTPPDCover(){
  //   this.coverDetails.controls['totalTPPDCover'].patchValue(this.tppd);
  //   console.log( this.coverDetails.controls['totalPAToOwnerDriverPremium'].value,'114444')
  // }



  // gettotalspeciallyDesigned(){
  //   this.coverDetails.controls['totalspeciallyDesigned'].patchValue(this.specially_designed);
  //   console.log( this.coverDetails.controls['totalPAToOwnerDriverPremium'].value,'114444')
  // }
  // gettotalfibreGlassFuel(){
  //   this.coverDetails.controls['totalfibreGlassFuel'].patchValue(this.fibre_glass_tank);
  //   console.log( this.coverDetails.controls['totalPAToOwnerDriverPremium'].value,'114444')
  // }
  // gettotalgeographical(){
  //   this.coverDetails.controls['totalgeographical'].patchValue(this.geographical_extension);
  //   console.log( this.coverDetails.controls['totalPAToOwnerDriverPremium'].value,'114444')
  // }
  // gettotalDrivingTuition(){
  //   this.coverDetails.controls['totaldrivingTuitionCoverage'].patchValue(this.driving_tution);
  //   console.log( this.coverDetails.controls['totaldrivingTuitionCoverage'].value,'114444')
  // }

  // changeElec(){
  //   if (this.coverDetails.controls['IsElectricalItemFitted'].value) {
  //     this.coverDetails.controls['ElectricalItemsTotalPremium'].patchValue(this.electrical_accessories);
  //     this.coverDetails.controls['ElectricalItemsTotalPremium'].setValidators([Validators.required]);
  //   } else {
  //     this.coverDetails.controls['ElectricalItemsTotalPremium'].patchValue('');
  //
  //     this.coverDetails.controls['ElectricalItemsTotalPremium'].setValidators(null);
  //
  //   }
  //   this.coverDetails.controls['ElectricalItemsTotalPremium'].updateValueAndValidity();
  // }

  // getElectric(){
  //   this.coverDetails.controls['ElectricalItemsTotalPremium'].patchValue(this.electrical_accessories);
  //   console.log( this.coverDetails.controls['ElectricalItemsTotalPremium'].value,'115555')
  // }

  // changeNonElec(){
  //   if (this.coverDetails.controls['IsNonElectricalItemFitted'].value) {
  //     // this.coverDetails.controls['NonElectricalItemsTotalPremium'].patchValue(this.non_electrical_accessories);
  //     this.coverDetails.controls['NonElectricalItemsTotalPremium'].setValidators([Validators.required]);
  //   } else {
  //     this.coverDetails.controls['NonElectricalItemsTotalPremium'].patchValue('');
  //
  //     this.coverDetails.controls['NonElectricalItemsTotalPremium'].setValidators(null);
  //
  //   }
  //   this.coverDetails.controls['NonElectricalItemsTotalPremium'].updateValueAndValidity();
  // }

  // getValueNonElectric(){
  //   this.coverDetails.controls['NonElectricalItemsTotalPremium'].patchValue(this.non_electrical_accessories);
  //   console.log( this.coverDetails.controls['NonElectricalItemsTotalPremium'].value,'11666')
  // }



  //
  updateUnnamedPassenger(){
    if (this.coverDetails.controls['UnnamedPassengerCovered'].value==true) {
      // this.coverDetails.controls['UnnamedPassengerCovered'].patchValue(true);
      this.coverDetails.controls['UnnamedPassengersSI'].setValidators([Validators.required]);
      // this.coverDetails.controls['NoOfUnnamedPassenegersCovered'].patchValue('5');
      this.coverDetails.controls['NoOfUnnamedPassenegersCovered'].setValidators([Validators.required]);
      // this.coverDetails.controls['totalUnnamedPassengerPremium'].setValidators([Validators.required]);
    }else{


      this.coverDetails.controls['UnnamedPassengersSI'].patchValue('');
      this.coverDetails.controls['UnnamedPassengersSI'].setValidators(null);

      this.coverDetails.controls['NoOfUnnamedPassenegersCovered'].patchValue('');
      this.coverDetails.controls['NoOfUnnamedPassenegersCovered'].setValidators(null);

      // this.coverDetails.controls['totalUnnamedPassengerPremium'].patchValue('');
      // this.coverDetails.controls['totalUnnamedPassengerPremium'].setValidators(null);

    }
    this.coverDetails.controls['UnnamedPassengersSI'].updateValueAndValidity();
    this.coverDetails.controls['NoOfUnnamedPassenegersCovered'].updateValueAndValidity();
    // this.coverDetails.controls['totalUnnamedPassengerPremium'].updateValueAndValidity();
  }

  updateNamedPassenger(){
    if (this.coverDetails.controls['PAToNamedPassenger'].value==true) {
      this.coverDetails.controls['noNamedPassenegers'].setValidators([Validators.required]);
      this.coverDetails.controls['namedPassengersSI'].setValidators([Validators.required]);
      // this.coverDetails.controls['totalUnnamedPassengerPremium'].setValidators([Validators.required]);
    }else{


      this.coverDetails.controls['noNamedPassenegers'].patchValue('');
      this.coverDetails.controls['noNamedPassenegers'].setValidators(null);

      this.coverDetails.controls['namedPassengersSI'].patchValue('');
      this.coverDetails.controls['namedPassengersSI'].setValidators(null);

      // this.coverDetails.controls['totalUnnamedPassengerPremium'].patchValue('');
      // this.coverDetails.controls['totalUnnamedPassengerPremium'].setValidators(null);

    }
    this.coverDetails.controls['noNamedPassenegers'].updateValueAndValidity();
    this.coverDetails.controls['namedPassengersSI'].updateValueAndValidity();
    // this.coverDetails.controls['totalUnnamedPassengerPremium'].updateValueAndValidity();
  }

  // updateTrailerAttached(){
  //   if (this.riskDetails.controls['trailerAttached'].value==true) {
  //     this.riskDetails.controls['trailerIDV'].setValidators([Validators.required]);
  //     this.riskDetails.controls['serialNo'].setValidators([Validators.required]);
  //     // this.coverDetails.controls['totalUnnamedPassengerPremium'].setValidators([Validators.required]);
  //   }else{
  //
  //
  //     this.riskDetails.controls['trailerIDV'].patchValue('');
  //     this.riskDetails.controls['trailerIDV'].setValidators(null);
  //
  //     this.riskDetails.controls['serialNo'].patchValue('');
  //     this.riskDetails.controls['serialNo'].setValidators(null);
  //
  //     // this.coverDetails.controls['totalUnnamedPassengerPremium'].patchValue('');
  //     // this.coverDetails.controls['totalUnnamedPassengerPremium'].setValidators(null);
  //
  //   }
  //   this.riskDetails.controls['trailerIDV'].updateValueAndValidity();
  //   this.riskDetails.controls['serialNo'].updateValueAndValidity();
  //   // this.coverDetails.controls['totalUnnamedPassengerPremium'].updateValueAndValidity();
  // }

  //
  updateMandatoryHypothicated(event){
    if( event.checked){
      this.coverDetails.controls['IsVehicleHypothicated'].patchValue(true);
      this.coverDetails.controls['FinanceType'].setValidators([Validators.required]);
      this.coverDetails.controls['FinanceType'].updateValueAndValidity();

      this.coverDetails.controls['FinancierName'].setValidators([Validators.required]);
      this.coverDetails.controls['FinancierName'].updateValueAndValidity();

      this.coverDetails.controls['FinancierAddress'].setValidators([Validators.required]);
      this.coverDetails.controls['FinancierAddress'].updateValueAndValidity();
    }else {

      this.coverDetails.controls['IsVehicleHypothicated'].patchValue(false);

      this.coverDetails.controls['FinanceType'].patchValue('');
      this.coverDetails.controls['FinanceType'].setValidators(null);
      this.coverDetails.controls['FinanceType'].updateValueAndValidity();

      this.coverDetails.controls['FinancierName'].patchValue('');
      this.coverDetails.controls['FinancierName'].setValidators(null);
      this.coverDetails.controls['FinancierName'].updateValueAndValidity();

      this.coverDetails.controls['FinancierAddress'].patchValue('');
      this.coverDetails.controls['FinancierAddress'].setValidators(null);
      this.coverDetails.controls['FinancierAddress'].updateValueAndValidity();
    }

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

  idValidate(event: any) {
    this.validation.idValidate(event);
  }
}

@Component({
  selector: 'idvvalidatetwoWheeler',
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
  styleUrls: ['./reliance-motor-proposal.component.scss']


})

export class idvvalidatetwoWheeler {
  public idv : any;
  public idfGroup : FormGroup;
  constructor(
      public dialogRef: MatDialogRef<idvvalidatetwoWheeler>,
      @Inject(MAT_DIALOG_DATA) public data: any, public fb: FormBuilder) {

    this.idfGroup = this.fb.group({
          // AgentName: [''],
          IDV: [''],
        }
    );

  }
  ngOnInit(){
    this.idv = JSON.parse(sessionStorage.changeIdvDetail);
  }


  onClick(result) {
    if(result !=''){
      this.dialogRef.close(this.idfGroup.controls.IDV.value);
    }
  }
}

@Component({
    selector: ' reliance2WCover ',
    template: `
   
        <div class="container">
          <h5>Addon Cover Premium</h5>
            <div class="row" *ngIf="this.basic_od!=''&&this.basic_od!=undefined">
                <div class="col-md-12"  >
                  <p ><span style="margin-left: 35px;color: blue"> Basic OD :</span><span style="margin-left: 252px;">{{this.basic_od}} </span></p>
                </div>
            </div>
            <div class="row" *ngIf="this.basic_liability!=''&&this.basic_liability!=undefined">
                <div class="col-md-12"  >
                  <p ><span style="margin-left: 35px;color: blue"> Basic Liability :</span><span style="margin-left: 221px;">{{this.basic_liability}}</span>  </p>
                </div>
            </div>
            <div class="row" *ngIf="this.pa_named_passenger!=''&&this.pa_named_passenger!=undefined">
                <div class="col-md-12"  >
                    <p ><span style="margin-left: 35px;color: blue"> PA to Named Passenger :</span><span style="margin-left: 155px;"> {{this.pa_named_passenger}} </span></p>
                </div>
            </div>
            <div class="row" *ngIf="this.pa_unnamed_passenger!=''&&this.pa_unnamed_passenger!=undefined">
                <div class="col-md-12"  >
                    <p ><span style="margin-left: 35px;color: blue"> PA to Unnamed Passenger :</span><span style="margin-left: 141px;"> {{this.pa_unnamed_passenger}} </span></p>
                </div>
            </div>
            <div class="row" *ngIf="this.voluntary_deductible!=''&&this.voluntary_deductible!=undefined">
                <div class="col-md-12"  >
                  <p ><span style="margin-left: 35px;color: blue"> Voluntary Deductible :</span><span style="margin-left: 180px;">{{this.voluntary_deductible}}</span> </p>
                </div>
            </div>
            <div class="row" *ngIf="this.pa_owner_driver!=''&&this.pa_owner_driver!=undefined">
                <div class="col-md-12"  >
                  <p ><span style="margin-left: 35px;color: blue"> PA to Owner Driver :</span><span style="margin-left: 193px;">{{this.pa_owner_driver}}</span>  </p>
                </div>
            </div>
            <div class="row" *ngIf="this.electrical_accessories!=''&&this.electrical_accessories!=undefined">
                <div class="col-md-12"  >
                  <p ><span style="margin-left: 35px;color: blue"> Electrical Accessories :</span><span style="margin-left: 172px;">{{this.electrical_accessories}}</span>  </p>
                </div>
            </div>
            <div class="row" *ngIf="this.non_electrical_accessories!=''&&this.non_electrical_accessories!=undefined">
                <div class="col-md-12"  >
                  <p ><span style="margin-left: 35px;color: blue"> Non Electrical Accessories :</span><span style="margin-left: 146px;">{{this.non_electrical_accessories}}</span> </p>
                </div>
            </div>
            <div class="row" *ngIf="this.nil_depreciation!=''&&this.nil_depreciation!=undefined">
                <div class="col-md-12"  >
                  <p ><span style="margin-left: 35px;color: blue"> Nil Depreciation :</span><span style="margin-left: 212px;">{{this.nil_depreciation}}</span> </p>
                </div>
            </div>
            <div class="row" *ngIf="this.automobile_association!=''&&this.automobile_association!=undefined">
                <div class="col-md-12"  >
                  <p ><span style="margin-left: 35px;color: blue"> Automobile Association Membership :</span><span style="margin-left: 81px;">{{this.automobile_association}}</span> </p>
                </div>
            </div>
            <div class="row" *ngIf="this.Anti_theft!=''||this.Anti_theft!=undefined">
                <div class="col-md-12"  >
                  <p ><span style="margin-left: 35px;color: blue"> Anti-Theft Device :</span><span style="margin-left: 205px;">{{this.Anti_theft}}</span>  </p>
                </div>
            </div>
                
        </div>
       
        <div mat-dialog-actions style="justify-content: center">
            <button mat-raised-button style="background-color: darkblue; color: white;" (click)="cancel()">Cancel</button>
            <button mat-raised-button style="background-color: darkblue; color: white;" (click)="submit()">Ok</button>

        </div>
        
    `
})

export class reliance2WCover {

    public settings: any;
    public basic_liability: any;
    public automobile_association: any;
    public voluntary_deductible: any;
    public Anti_theft: any;
    public non_electrical_accessories: any;
    public electrical_accessories: any;
    public basic_od: any;
    public pa_owner_driver: any;
    public nil_depreciation: any;
    public pa_unnamed_passenger: any;
    public pa_named_passenger: any;
    public tppd: any;
    public Bifuel_Kit: any;
    constructor(
        public dialogRef: MatDialogRef<reliance2WCover>,
        @Inject(MAT_DIALOG_DATA) public data: any, public route: ActivatedRoute,  public common: CommonService, public validation: ValidationService, public appSettings: AppSettings, private toastr: ToastrService, public config: ConfigurationService, public authservice: AuthService, public bikeInsurance: BikeInsuranceService) {


        this.basic_liability= sessionStorage.basic_liability;
        console.log(this.basic_liability,'this.basic_liability');
        this.automobile_association=sessionStorage.automobile_association;
        console.log(this.automobile_association,'this.automobile_association');
        this.voluntary_deductible=sessionStorage.voluntary_deductible;
        console.log(this.voluntary_deductible,'this.voluntary_deductible');
        this.Anti_theft=sessionStorage.Anti_theft;
        console.log(this.Anti_theft,'this.Anti_theft');
        this.non_electrical_accessories=sessionStorage.non_electrical_accessories;
        console.log(this.non_electrical_accessories,'this.non_electrical_accessories');
        this.electrical_accessories=sessionStorage.electrical_accessories;
        console.log(this.electrical_accessories,'this.electrical_accessories');
        this.basic_od=sessionStorage.basic_od;
        console.log(this.basic_od,'this.basic_od');
        this.pa_owner_driver=sessionStorage.pa_owner_driver;
        console.log(this.pa_owner_driver,'this.pa_owner_driver');
        this.nil_depreciation=sessionStorage.nil_depreciation;
        console.log(this.nil_depreciation,'this.nil_depreciation');
        this.pa_unnamed_passenger=sessionStorage.pa_unnamed_passenger;
        console.log(this.pa_unnamed_passenger,'this.pa_unnamed_passenger');
        this.pa_named_passenger=sessionStorage.pa_named_passenger;
        console.log(this.pa_named_passenger,'this.pa_named_passenger');
        this.tppd=sessionStorage.tppd ;
        console.log(this.tppd,'this.tppd');
        this.Bifuel_Kit=sessionStorage.Bifuel_Kit ;
        console.log(this.Bifuel_Kit,'this.Bifuel_Kit')

    }

    submit(): void {
        this.dialogRef.close(true);
    }
    cancel(): void {
        this.dialogRef.close(false);
    }



}


