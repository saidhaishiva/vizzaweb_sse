import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidationService} from '../../shared/services/validation.service';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {DatePipe} from '@angular/common';
import {AuthService} from '../../shared/services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {AppSettings} from '../../app.settings';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatStepper} from '@angular/material';
import {FourWheelerService} from '../../shared/services/four-wheeler.service';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
// import {forEach} from '@angular/router/src/utils/collection';
import {ActivatedRoute} from '@angular/router';
import {CommonService} from '../../shared/services/common.service';

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
  selector: 'app-rs-fourwheeler-proposal',
  templateUrl: './rs-fourwheeler-proposal.component.html',
  styleUrls: ['./rs-fourwheeler-proposal.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class RsFourwheelerProposalComponent implements OnInit {
  public proposer: FormGroup;
  public vehical: FormGroup;
  public previousInsure: FormGroup;
  public nomineeDetail: FormGroup;
  public settings: any;
  public webhost: any;
  public getStepper2: any;
  public titleList: any;
  public occupationList: any;
  public insurerdateError: any;
  public carRoyalProposerAge: any;
  public getAge: any;
  public getDays: any;
  public cityCommList: any;
  public minDate: any;
  public maxDate: any;
  public pincodeState: any;
  public rescityList: any;
  public stateList: any;
  public financedValueDetails: any;
  public hypothecationTypedm: any;
  public previousList: any;
  public cityList: any;
  public drivenList: any;
  public nomineeRelation: any;
  public addElectrical: any;
  public registrationNameList: any;
  public drivingTypeList: any;
  public milageList: any;
  public addnonElectrical: any;
  public buyProduct: any;
  public vehicle_age: any;
  public summaryData: any;
  public vountaryList: any;
  public bikeEnquiryId: any;
  public enquiryFormData: any;
  public paList: any;
  public paidList: any;
  public productDetails: any;
  public proposerFormData: any;
  public vehicalFormData: any;
  public previousFormData: any;
  public nomineeFormData: any;
  public ProposalId: any;
  public referenceId: any;
  public declaration: any;
  public summaryData1: any;
  public AgentId: any;
  public Apikey: any;
  public PaymentRedirect: any;
  public PaymentReturn: any;
  public ElcValue: any;
  public NonElcValue: any;
  public VehicleSubLine: any;
  public VersionNo: any;
  public ComprehensivePremium: any;
  public Comprehensivepremium: any;
  public coverList: any;
  public respincodeList: any;
  public guardianList: boolean;
  public accidentList: any;
  public makeModelList: any;
  public pAUnnamedPassengersList: any;
  public AddonList: any;
  public baggageList: any;
  public BiFuelList: any;
  public today: any;
  public guardianRelationList: any;
  public pincodeList: any;
  public policyList: any;
  public step: any;
  public vehicledetailsfw: any;
  public valueList: any;
  public valueSubList: any;
  public isFourWheelerFinanced: boolean;
  public valueCalc: any;
  public valuesubCalc: any;
  public Idv: any;
  public valid: any;
  public currentStep: any;
  public LIABILITY_PA_COVER_TO_PAID_DRIVER: any;
  public DEPRECIATION_WAIVER  : any;
  public NCB_PROTECTOR  : any;
  public ENGINE_PROTECTOR  : any;
  public WIND_SHIELD_GLASS  : any;
  public KEY_REPLACEMENT  : any;
  public LIFE_TIME_ROAD_TAX  : any;
  public AUTOMOBILE_ASSOCIATION_DISCOUNT  : any;
  public LIABILITY_TO_PAID_DRIVERS  : any;
  public TO_EMPLOYEE  : any;
  public BI_FUEL_KIT  : any;
  public FIBER_GLASS_TANK  : any;
  public LOSS_OF_BAGGAGE  : any;
  public TOWING_CHARGE  : any;
  public ELECTRICAL_ACCESSORIES  : any;
  public NON_ELECTRICAL_ACCESSORIES  : any;
  public INVOICE_PRICE_INSURANCE  : any;
  public sameasper: boolean;
  public mobileotpgenerate: any;
  public checkotp: any;
  public otpvalidation: any;
  public checkotpvalidation: any;
  public enquiryList: any;
  public previousClaim: any;
  public previousClaimvalue: any;
  public initialProductListfw: any;
  public carListDetails: any;
  public idv: any;
  public idvValues: any;
  public policyTypesss: any;
  public AddonListss: any;
  public accident_cover_for_paid_driver: any;
  public depreciation_waiver: any;
  public engine_protector: any;
  public key_replacement: any;
  public loss_of_baggage: any;
  public ncb_protector: any;
  public personal_accident_cover: any;
  public spare_car: any;
  public to_drivers: any;
  public to_employees: any;
  public towing_charges: any;
  public wind_shield: any;
  public idvValueDetail: any;
  public towingList: any;
  public lesserDate: any;
  public inVoiceValue: any;
  public invoiceDatess: any;
  public taxDatess: any;
  public nilDepValue: any;
  public vehicleType: any;
  public taxValue: any;
  public packagePolicyYear: any;
  public packageListFw: any;
  public city2List: any;
  public premiumadd: any;
  public cityinList: any;
  public errorOTP: boolean;
  public addonValue: any;



  constructor(public fb: FormBuilder, public validation: ValidationService,public dialog: MatDialog, public config: ConfigurationService, public route: ActivatedRoute, public datepipe: DatePipe, public authservice: AuthService, private toastr: ToastrService,  public appSettings: AppSettings, public fourWheeler: FourWheelerService, ) {
    let stepperindex = 0;
    this.route.params.forEach((params) => {
      if (params.stepper == true || params.stepper == 'true') {
        stepperindex = 4;
        if (sessionStorage.summaryData != '' && sessionStorage.summaryData != undefined) {
          this.summaryData = JSON.parse(sessionStorage.summaryData1);
          this.PaymentRedirect = this.summaryData.PaymentRedirect;

          this.proposerFormData = JSON.parse(sessionStorage.proposerFormData);
          this.vehicalFormData = JSON.parse(sessionStorage.vehicalFormData);
          this.previousFormData = JSON.parse(sessionStorage.previousFormData);
          this.nomineeFormData = JSON.parse(sessionStorage.nomineeFormData);
          this.ProposalId = this.summaryData.ProposalId;
          sessionStorage.royalFourWheelerproposalID = this.ProposalId;
        }
      }
    });
    this.sameasper = false;
    this.errorOTP = false;

    this.currentStep  = stepperindex;
    const minDate = new Date();
    this.minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());

    let today  = new Date();
    this.today = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const lateDate=minDate.getFullYear()-5;
    this.lesserDate = new Date(lateDate, minDate.getMonth(), minDate.getDate());

    const invoiceDate=minDate.getFullYear()-4;
    this.invoiceDatess = new Date(invoiceDate, minDate.getMonth(), minDate.getDate());

    const taxDate=minDate.getFullYear()-4;
    this.taxDatess = new Date(taxDate, minDate.getMonth(), minDate.getDate());

    this.valid = false;
    this.nilDepValue = false;
    this.settings = this.appSettings.settings;
    this.webhost = this.config.getimgUrl();
    this.settings.HomeSidenavUserBlock = false;
    this.settings.sidenavIsOpened = false;
    this.settings.sidenavIsPinned = false;
    this.valueCalc = [];
    this.valuesubCalc = [];
    this.proposer = this.fb.group({
      title: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      dob: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
      mobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
      otp:[''],
      occupation: ['', Validators.required],
      aadharNumber: ['', Validators.compose([Validators.minLength(12)])],
      panNumber: ['', Validators.compose([ Validators.minLength(10)])],
      address: ['', Validators.required],

      address2: '',

      pincode: ['', Validators.required],
      state: '',
      stateName: '',
      city: '',
      cityName: '',
      raddress: ['', Validators.required],
      raddress2:  '',

      rpincode: ['', Validators.required],
      rstate: '',
      rcity: '',
      rstateName: '',
      rcityName: '',
      sameas: '',
      phoneNumber:  '',
      stdCode: '',

    });

    console.log('errrrr1');
    this.vehical = this.fb.group({
      vehicleMostlyDrivenOn: ['', Validators.required],
      vehicleRegisteredName: ['', Validators.required],
      // registrationchargesRoadtax: ['', Validators.required],
      coverelectricalaccesss: '',
        cover_non_elec_acc: '',
      drivingExperience: ['', Validators.required],
      averageMonthlyMileageRun: '',
      accidentCoverForPaidDriver: '',
      // registrationchargesRoadtaxpremium: '',
      ncbprotectorpremium: '',
      companyName: '',
      gstIn: '',
      invoicePricepremium: '',
      automobileAssociationMembershippremium: '',
      legalliabilityToPaidDriverpremium: '',
      fibreGlasspremium: '',
      bifuelpremium: '',
      // idv: '',
      isFourWheelerFinancedValue: '',
      valueOfLossOfBaggage: '',
      isBiFuelKitYes: '',
        // coverdriverpremium:'',
      isCarOwnershipChangedpremium:'',
      depreciationWaiverpremium:'',
      windShieldGlasspremium:'',
      engineprotectorpremium:'',
      keyreplacementpremium:'',
        amountNonElectricalaccesss:'',
        amountElectricalaccesss:'',
      // quoteId: '',
      personalAccidentCoverForUnnamedPassengers: '',
      financierName: '',
      addonValue: ['', Validators.compose([ Validators.maxLength(6)])],
      isFourWheelerFinanced: false,
      // isAddon: false,
      lossOfBaggage: 'No',
      towingCharge: 'No',
      towingChargeSI: '',
      amountTowingCharge: '',
      typeOfCover: '',
      // addon: '',
      amountLossOfBaggage:'',
      total: '',
      subTotal: '',
      vechileOwnerShipChanged: 'No',
      cover_dri_othr_car_ass: 'No',
      fibreGlass: 'No',
      isCarOwnershipChanged: 'No',
      invoicePrice: 'Off',
      isBiFuelKit: 'No',
      automobileAssociationMembership: 'No',
      legalliabilityToPaidDriver: 'No',
      toEmployee: 'No',
      employeepremium: '',
      windShieldGlass: 'Off',
      keyreplacement: 'Off',
      depreciationWaiver: 'Off',
      engineprotector: 'Off',
      ncbprotector: 'Off',
      IDV: [''],
      // registrationchargesRoadtax: 'Off',
      spareCar: 'Off',
      spareCarLimit: ['', Validators.compose([ Validators.maxLength(8)])],
      // policyED: ['', Validators.compose([ Validators.minLength(10)])],
      // policySD: ['', Validators.compose([ Validators.minLength(10)])],
      // vehicleInspectionDate: ['', Validators.compose([ Validators.minLength(10)])],

      electricalAccess : new FormArray([
        this.create()
      ]),
        nonelectricalAccess : new FormArray([
        this.createnonElectrical()
      ]),
    });



    this.previousInsure = this.fb.group({
      policyNumber: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      previousInsured: ['', Validators.required],
      previousdob: '',
      isPreviousPolicyHolder: 'No',
      previousinsurersCorrectAddress: ['', Validators.required],
      voluntary: '',
      claimAmountReceived: '',
      claimsReported: ['', Validators.compose([ Validators.maxLength(2)])],
      previousPolicyType: ['', Validators.required],
      personalAccidentCover: '',
      accidentPaid: '',
    });
    this.nomineeDetail = this.fb.group({
      nomineeName: ['', Validators.required],
      nomineeAge: ['', Validators.required],
      nomineeRelationship: ['', Validators.required],
      guardianName: '',
      guardianRelationship: '',
      guardianAge: ''
    });

  }


  ngOnInit() {
    this.buyProduct = JSON.parse(sessionStorage.buyFourwheelerProductDetails);
    this.bikeEnquiryId = sessionStorage.fwEnquiryId;
    this.enquiryList = JSON.parse(sessionStorage.enquiryFormDatafw);
    this.vehicledetailsfw = JSON.parse(sessionStorage.vehicledetailsfw);
    this.carListDetails = JSON.parse(sessionStorage.carListDetails);
    this.packageListFw = (sessionStorage.packageListFw);
    this.packagePolicyYear = (sessionStorage.packagePolicyYear);

    console.log(this.carListDetails,'this.carListDetails56789');
    this.calculation();
    this.calculation1();
    this.calculation2();
    // this.initialProductListfw = JSON.parse(sessionStorage.initialProductListfw);
    console.log(this.vehicledetailsfw, ' details');
    this.idv=this.buyProduct.Idv;
    console.log(this.idv,'idv......');
    this.vehicleType=this.carListDetails.type;
    console.log(this.vehicleType,'45678');

    this.vehical.controls['IDV'].patchValue('0');
    this.previousClaim=this.enquiryList.previous_claim_YN;
    console.log(this.previousClaim,'4567890');
    if(this.previousClaim==1){
      this.previousClaimvalue='Yes';
    }else{
      this.previousClaimvalue='No';
    }
    this.previousInsure.controls['isPreviousPolicyHolder'].patchValue(this.previousClaimvalue);

    console.log(this.previousInsure.controls['isPreviousPolicyHolder'].value,'546789gcfhjk')
    console.log( this.vehical.controls['IDV'].value,'546789gcfhjk')

    this.title();
    this.getOccupation();
    // this.changehypothecation();
    this.changefinancedValue();
    this.changePreviousInsureType();
    this.getVehicalMostly();
    this.changeVehicleName();
    this.changeDrivingExpType();
    this.changeMilageType();
    this.nomineeRelationShip();
    this.changeVoulntaryType();
    this.changePolicyType();
    this.changePaType();
    this.changePaidDriverType();
    this.changeCoverType();
    this.changeMakeModel();
    this.guardianRelationShip();
    this.changepbaggageValue();
    this.changepolicyType();
    this.changeAccidentPaidDriver();
    this.changeBiFuelValue();
    this.changeAddon();
    // this.getcity();
    this.getcityin();
    this.coverPremium();
    this.idvValuess();
    this.idvValue();
    this.towingChargeSIValue();

    this.sessionData();
  }

  // validation
  prevStep() {
    this.step--;
  }
  backAll() {
    this.topScroll();
    this.prevStep();
  }

  numberValidate(event: any) {
    this.validation.numberValidate(event);
  }
  nameValidate(event: any) {
    this.validation.nameValidate(event);
  }
  // Dob validation
  dobValidate(event: any) {
    this.validation.dobValidate(event);
  }
  spac(event: any) {
    this.validation.spac(event);

  }
  idValidate(event: any) {
    this.validation.idValidate(event);
  }
  topScroll() {
    document.getElementById('main-content').scrollTop = 0;
  }
  // suming the electrical acessories value


  calculation(){
      let valueDil=this.datepipe.transform(this.lesserDate, 'y-MM-dd')
        console.log(this.lesserDate,'lesserDate....');
        console.log(valueDil,'valueDil....');
        console.log(this.carListDetails.registration_date,'55555555555555....')
      if(valueDil <= this.carListDetails.registration_date ){
        this.nilDepValue=true;
      }else{
        this.nilDepValue=false;
      }
      console.log(this.nilDepValue,'nilDepValue....')
  }
  calculation1(){
      let valueInvoice=this.datepipe.transform(this.invoiceDatess, 'y-MM-dd')
        console.log(this.invoiceDatess,'invoiceDatess....');
        console.log(valueInvoice,'valueDil....');
        console.log(this.carListDetails.registration_date,'55555555555555....')
      if(valueInvoice <= this.carListDetails.registration_date ){
        this.inVoiceValue=true;
      }else{
        this.inVoiceValue=false;
      }
      console.log(this.inVoiceValue,'inVoiceValue....')
  }
  calculation2(){
      let valueTax=this.datepipe.transform(this.taxDatess, 'y-MM-dd')
        console.log(this.taxDatess,'taxDatess....');
        console.log(valueTax,'valueDil....');
        console.log(this.carListDetails.registration_date,'55555555555555....')
      if(valueTax <= this.carListDetails.registration_date ){
        this.taxValue=true;
      }else{
        this.taxValue=false;
      }
      console.log(this.taxValue,'taxValue....')
  }



  // Electrical Accessories

  create() {
    return new FormGroup({
      nameOfElectronicAccessories: new FormControl(),
      makeModel :  new FormControl(),
      elecValue :  new FormControl()
    });
  }
  addItems() {
    this.addElectrical =  this.vehical.get('electricalAccess') as FormArray;
    this.addElectrical.push(this.create());
    console.log(this.addElectrical, 'this.addElectrical');
    console.log('eror3');

  }
  removeItems(index) {
    let ssss =  this.vehical.get('electricalAccess') as FormArray;
    console.log(ssss,'ssssss')
    ssss.removeAt(index);
    console.log(index, 'this.index');


  }
  // Non electrical Accessories
  createnonElectrical() {
    return new FormGroup({
        nameOfElectronicAccessories: new FormControl(),
        makeModel :  new FormControl(),
      elecValue :  new FormControl(),
    });
  }
  addnonEelctricalItems() {
    this.addnonElectrical =  this.vehical.get('nonelectricalAccess') as FormArray;
    this.addnonElectrical.push(this.createnonElectrical());
    console.log(this.addnonElectrical, 'this.addnonElectrical');
  }
  removenonEelctricalItems(index) {
    let ssss =  this.vehical.get('nonelectricalAccess') as FormArray;
    console.log(ssss,'sss');
    ssss.removeAt(index);
    console.log(index, 'index');
  }


  changeAddon() {
    const data = {
      "platform": "web",
      "user_id": this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      "role_id": this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      "pos_status": this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
      "enquiry_id": this.bikeEnquiryId,
      "created_by": '',
      "proposal_id": sessionStorage.royalFourWheelerproposalID == '' || sessionStorage.royalFourWheelerproposalID == undefined ? '' : sessionStorage.royalFourWheelerproposalID,
      "company_id": this.buyProduct.company_id,
      "business_type": this.vehicledetailsfw.business_type,
      "CALCULATEPREMIUMREQUEST": {
        "premium": '',
        "proposerDetails": {
          "addressOne": this.proposer.controls['raddress'].value,
          "addressTwo": this.proposer.controls['raddress2'].value,
          "regCity": this.proposer.controls['rcity'].value,
          "regPinCode": this.proposer.controls['rpincode'].value,
          "contactAddress1": this.proposer.controls['address'].value,
          "contactAddress2": this.proposer.controls['address2'].value,
          "contactCity": this.proposer.controls['city'].value,
          "contactPincode": this.proposer.controls['pincode'].value,
          "dateOfBirth": this.datepipe.transform(this.proposer.controls['dob'].value, 'y-MM-dd'),
          "panNumber": this.proposer.controls['panNumber'].value,
          "aadharNumber": this.proposer.controls['aadharNumber'].value,
          "guardianAge": this.nomineeDetail.controls['guardianAge'].value,
          "guardianName": this.nomineeDetail.controls['guardianName'].value,
          "nomineeAge": this.nomineeDetail.controls['nomineeAge'].value,
          "nomineeName": this.nomineeDetail.controls['nomineeName'].value,
          "occupation": this.proposer.controls['occupation'].value,
          "relationshipWithNominee": this.nomineeDetail.controls['nomineeRelationship'].value,
          "relationshipwithGuardian": this.nomineeDetail.controls['guardianRelationship'].value,
          "sameAdressReg": this.proposer.controls['sameas'].value ? 'Yes' : 'No',
          "strPhoneNo": this.proposer.controls['phoneNumber'].value,
          "strStdCode": this.proposer.controls['stdCode'].value,
          "userName": "michael@xerago.com",
          "strEmail": this.proposer.controls['email'].value,
          "strFirstName": this.proposer.controls['firstname'].value,
          "strLastName": this.proposer.controls['lastname'].value,
          "strMobileNo": this.proposer.controls['mobile'].value,
          "strTitle": this.proposer.controls['title'].value,
        },
        "quoteId": '',
        "vehicleDetails": {
          "accidentCoverForPaidDriver": this.vehical.controls['accidentCoverForPaidDriver'].value,
          "addonValue": this.vehical.controls['addonValue'].value,
          "claimsMadeInPreviousPolicy": this.previousInsure.controls['isPreviousPolicyHolder'].value ,
          "claimsReported": this.previousInsure.controls['claimsReported'].value,
          "claimAmountReceived": this.previousInsure.controls['claimAmountReceived'].value,
          "averageMonthlyMileageRun": this.vehical.controls['averageMonthlyMileageRun'].value,
          "companyNameForCar": this.vehical.controls['companyName'].value,
          "GSTIN": this.vehical.controls['gstIn'].value,
          "cover_dri_othr_car_ass": this.vehical.controls['cover_dri_othr_car_ass'].value ,
          "drivingExperience": this.vehical.controls['drivingExperience'].value,
          "cover_elec_acc": this.vehical.controls['coverelectricalaccesss'].value ? 'Yes' : 'No',
          "towingChargesCover": this.vehical.controls['towingCharge'].value ,
          "towingChargesCover_SI": this.vehical.controls['towingChargeSI'].value,
          "legalliabilitytoemployees": this.vehical.controls['toEmployee'].value ? 'Yes' : 'No',
          "type_of_cover":this.packageListFw,
          "policyTerm":this.packagePolicyYear,
          "electricalAccessories": {
            "electronicAccessoriesDetails": this.vehical.value.electricalAccess,
          },
          "valueofelectricalaccessories": this.vehical.controls['total'].value == 'err' ? '' : this.vehical.controls['total'].value,
          "cover_non_elec_acc": this.vehical.controls['cover_non_elec_acc'].value ? 'Yes' : 'No',
          "nonElectricalAccesories": {
            "nonelectronicAccessoriesDetails": this.vehical.value.nonelectricalAccess,
          },
          "valueofnonelectricalaccessories": this.vehical.controls['subTotal'].value == 'err' ? '' : this.vehical.controls['subTotal'].value,
          "fibreGlass": this.vehical.controls['fibreGlass'].value ,
          "financierName": this.vehical.controls['financierName'].value,
          "isCarFinanced": this.vehical.controls['isFourWheelerFinanced'].value ? 'Yes' : 'No',
          "isCarFinancedValue": this.vehical.controls['isFourWheelerFinancedValue'].value,
          "isCarOwnershipChanged": this.vehical.controls['isCarOwnershipChanged'].value ,
          "automobileAssociationMembership": this.vehical.controls['automobileAssociationMembership'].value ,
          "isBiFuelKit": this.vehical.controls['isBiFuelKit'].value ,
          "legalliabilityToPaidDriver": this.vehical.controls['legalliabilityToPaidDriver'].value ,
          "lossOfBaggage": this.vehical.controls['lossOfBaggage'].value ,
          "personalAccidentCoverForUnnamedPassengers": this.vehical.controls['personalAccidentCoverForUnnamedPassengers'].value,
          "policyED":  this.datepipe.transform(this.buyProduct.previous_policy_expiry_date, 'y-MM-dd') ? this.datepipe.transform(this.buyProduct.previous_policy_expiry_date, 'y-MM-dd') : '',
          "policySD": this.datepipe.transform(this.buyProduct.previous_policy_start_date, 'y-MM-dd') ? this.datepipe.transform(this.buyProduct.previous_policy_start_date, 'y-MM-dd') : '',
          "previousInsurerName": this.previousInsure.controls['previousInsured'].value ? this.previousInsure.controls['previousInsured'].value : '',
          "previousPolicyType": this.previousInsure.controls['previousPolicyType'].value ? this.previousInsure.controls['previousPolicyType'].value : '',
          "previousinsurersCorrectAddress": this.previousInsure.controls['previousinsurersCorrectAddress'].value ? this.previousInsure.controls['previousinsurersCorrectAddress'].value : '',
          "previuosPolicyNumber": this.previousInsure.controls['policyNumber'].value ? this.previousInsure.controls['policyNumber'].value : '',
          "valueOfLossOfBaggage": this.vehical.controls['valueOfLossOfBaggage'].value,
          "isBiFuelKitYes": this.vehical.controls['isBiFuelKitYes'].value,
          "vehicleMostlyDrivenOn": this.vehical.controls['vehicleMostlyDrivenOn'].value,
          "vehicleInspectionDate": "28/04/2017 04:00:00",
          "vehicleRegisteredInTheNameOf": this.vehical.controls['vehicleRegisteredName'].value,
          "voluntarydeductible": this.previousInsure.controls['voluntary'].value ? this.previousInsure.controls['voluntary'].value : '',
          "keyreplacement": this.vehical.controls['keyreplacement'].value ,
          "windShieldGlass": this.vehical.controls['windShieldGlass'].value ,
          "depreciationWaiver": this.vehical.controls['depreciationWaiver'].value,
          "engineprotector": this.vehical.controls['engineprotector'].value ,
          "ncbprotector": this.vehical.controls['ncbprotector'].value ,
          "registrationchargesRoadtax": 'Off' ,
          "spareCar": this.vehical.controls['spareCar'].value ,
          "spareCarLimit": this.vehical.controls['spareCarLimit'].value ,
          "invoicePrice": this.vehical.controls['invoicePrice'].value ,
          "typeOfCover": this.vehical.controls['typeOfCover'].value ,
        }
      }
    };
    this.fourWheeler.fourWheeleraddOnsValue(data).subscribe(
        (successData) => {
          this.addonSSuccess(successData);
        },
        (error) => {
          this.addonSFailure(error);
        }
    );
  }
  public addonSSuccess(successData) {
    if (successData.IsSuccess) {
      this.AddonListss = successData.ResponseObject;
      console.log(this.AddonList,'this.AddonList')
      this.accident_cover_for_paid_driver=this.AddonListss.accident_cover_for_paid_driver;
      this.depreciation_waiver=this.AddonListss.depreciation_waiver;
      this.engine_protector=this.AddonListss.engine_protector;
      this.key_replacement=this.AddonListss.key_replacement;
      this.loss_of_baggage=this.AddonListss.loss_of_baggage;
      this.ncb_protector=this.AddonListss.ncb_protector;
      this.personal_accident_cover=this.AddonListss.personal_accident_cover;
      this.spare_car=this.AddonListss.spare_car;
      this.to_drivers=this.AddonListss.to_drivers;
      this.to_employees=this.AddonListss.to_employees;
      this.towing_charges=this.AddonListss.towing_charges;
      this.wind_shield=this.AddonListss.wind_shield;
      // this.premiumadd=this.AddonListss.premium;

    }
  }
  public addonSFailure(error) {
  }

  resendOTP(){
    this.proposer.controls['otp'].patchValue('');
    this.otpValidate(this.proposer.controls['mobile'].value);
  }



  // title

  title() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.fourWheeler.getRoyalfourWheelerTitleList(data).subscribe(
        (successData) => {
          this.titleSuccess(successData);
        },
        (error) => {
          this.titleFailure(error);
        }
    );
  }
  public titleSuccess(successData) {
    if (successData.IsSuccess) {
      this.titleList = successData.ResponseObject;
    }
  }
  public titleFailure(error) {
  }

//OTP
  otpValidate(value) {
    this.mobileotpgenerate = value;

    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      "enquiry_id": this.buyProduct.enquiry_id,
      "mobile": this.proposer.controls['mobile'].value,
      "email": this.proposer.controls['email'].value

    }
    if (this.mobileotpgenerate.length == 10) {
      this.fourWheeler.mobileotp(data).subscribe(
          (successData) => {
            this.mobileotpSuccess(successData);
          },
          (error) => {
            this.mobileotpFailure(error);
          }
      );
    }
  }
  public mobileotpSuccess(successData) {
    if (successData.IsSuccess == true) {
      this.toastr.success(successData.ResponseObject.msg);
      this.otpvalidation = successData.ResponseObject.msg;

    }

  }
  public mobileotpFailure(error) {
  }
// check otp
  checkotpValidate(value) {
    this.checkotp = value;
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      "enquiry_id": this.buyProduct.enquiry_id,
      "mobile": this.proposer.controls['mobile'].value,
      "email": this.proposer.controls['email'].value,
      "otpcode": this.proposer.controls['otp'].value

    }
    if (this.checkotp.length == 6) {
      this.fourWheeler.checkotp(data).subscribe(
          (successData) => {
            this.checkotpSuccess(successData);
          },
          (error) => {
            this.checkotpFailure(error);
          }
      );
    }
  }
  public checkotpSuccess(successData) {
    if (successData.IsSuccess == true) {
      this.toastr.success(successData.ResponseObject.msg);
      this.checkotpvalidation = successData.ResponseObject.msg;
      this.errorOTP=false;
    } else {
      this.toastr.error(successData.ErrorObject);
      this.errorOTP=true;
    }
  }
  public checkotpFailure(error) {
  }

// ocupation List
  getOccupation() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.fourWheeler.getRoyalFourWheelerOccupationList(data).subscribe(
        (successData) => {
          this.occupationSuccess(successData);
        },
        (error) => {
          this.occupationFailure(error);
        }
    );
  }
  public occupationSuccess(successData) {
    if (successData.IsSuccess) {
      this.occupationList = successData.ResponseObject;
    }
  }
  public occupationFailure(error) {
  }

  // getcity() {
  //   const data = {
  //     'platform': 'web',
  //     'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
  //     'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
  //   }
  //   this.fourWheeler.getCityList(data).subscribe(
  //       (successData) => {
  //         this.citySuccess(successData);
  //       },
  //       (error) => {
  //         this.cityFailure(error);
  //       }
  //   );
  // }
  // public citySuccess(successData) {
  //   if (successData.IsSuccess) {
  //     this.city2List = successData.ResponseObject;
  //   }
  // }
  // public cityFailure(error) {
  // }

  getcityin() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.fourWheeler.getCityListin(data).subscribe(
        (successData) => {
          this.cityinSuccess(successData);
        },
        (error) => {
          this.cityinFailure(error);
        }
    );
  }
  public cityinSuccess(successData) {
    if (successData.IsSuccess) {
      this.cityinList = successData.ResponseObject;
    }
  }
  public cityinFailure(error) {
  }
  //
  getVehicalMostly() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.fourWheeler.getvehicleDrivenList(data).subscribe(
        (successData) => {
          this.drivenSuccess(successData);
        },
        (error) => {
          this.drivenFailure(error);
        }
    );
  }
  public drivenSuccess(successData) {
    if (successData.IsSuccess) {
      this.drivenList = successData.ResponseObject;
    }
  }
  public drivenFailure(error){
  }
  // city for communication
  getPostalCode(pin) {
    const data = {
      'platform': 'web',
      'pin_code': pin
    };
    console.log(data,' jhgjh');
    if (pin.length == 6) {
      this.fourWheeler.getRsPincodeList(data).subscribe(
          (successData) => {
            this.pinProposerListSuccess(successData, pin);
          },
          (error) => {
            this.pinProposerListFailure(error);
          }
      );
    }
  }

  public pinProposerListSuccess(successData, pin) {

    if (successData.IsSuccess) {
      this.pincodeList = successData.ResponseObject;
      // if (pin.length == '' || pin.length == 0 || pin.length != 6) {
      //   this.proposer.controls['city'].patchValue('');
      // }
      // for (let key in this.pincodeList.city) {
      //   this.proposer.controls['city'].patchValue(key);
      //   this.proposer.controls['cityName'].patchValue(this.pincodeList['city'][key]);
      //   console.log(this.proposer.controls['city'].patchValue(key),' jhgfdghj');
      //
      // }

    } else {
      this.toastr.error(successData.ErrorObject);
      this.vehical.controls['city'].patchValue('');

    }
  }
  public pinProposerListFailure(error) {
  }

  // city for registration
  getresPostalCode(pin) {
    const data = {
      'platform': 'web',
      'pin_code': pin
    };
    console.log(data, ' jhgjh');
    if (pin.length == 6) {
      this.fourWheeler.getRsPincodeList(data).subscribe(
          (successData) => {
            this.pinresProposerListSuccess(successData, pin);
          },
          (error) => {
            this.pinresProposerListFailure(error);
          }
      );
    }
  }

  public pinresProposerListSuccess(successData, pin) {

    if (successData.IsSuccess) {
      this.respincodeList = successData.ResponseObject;
      console.log(pin,' jhgfdghj');
      // if (pin.length == '' || pin.length == 0 || pin.length != 6) {
        // this.proposer.controls['rcity'].patchValue('');
      // } for ( let key in this.respincodeList.city) {
        // this.proposer.controls['rcity'].patchValue(key);
        // this.proposer.controls['rcityName'].patchValue(this.respincodeList['city'][key]);
        // console.log(this.proposer.controls['rcity'].patchValue(key),' rrrrr');
      // }

    } else {
      this.toastr.error(successData.ErrorObject);
      // this.proposer.controls['rcity'].patchValue('');


    }
    console.log(this.proposer.controls['rcity'].value, 'rcity');
    console.log(this.proposer.controls['city'].value, 'ccity');
  }

  public pinresProposerListFailure(error) {
  }
  addEventPrevious(evnt) {

  }



  // dob validation
  addEvent(event, type) {
    if (event.value != null) {
      let selectedDate = '';
      this.carRoyalProposerAge = '';
      let dob = '';
      let dob_days = '';
      this.getAge = '';
      this.getDays;
      dob_days = this.datepipe.transform(event.value, 'dd-MM-y');
      if (typeof event.value._i == 'string') {
        const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
        if (pattern.test(event.value._i) && event.value._i.length == 10) {
          this.insurerdateError = '';
        } else {
          this.insurerdateError = 'Enter Valid Date';
        }
        selectedDate = event.value._i;
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (selectedDate.length == 10) {
          this.carRoyalProposerAge = this.ageCalculate(dob);

        }

      } else if (typeof event.value._i == 'object') {
        // dob = this.datepipe.transform(event.value, 'MMM d, y');
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (dob.length == 10) {
          this.carRoyalProposerAge = this.ageCalculate(dob);

        }
        this.insurerdateError = '';
      }
      sessionStorage.fwRoyalProposerAge = this.carRoyalProposerAge;

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

  sameAddress() {
    if (this.proposer.controls['sameas'].value == true) {
          this.proposer.controls['raddress'].patchValue( this.proposer.controls['address'].value),
          this.proposer.controls['raddress2'].patchValue( this.proposer.controls['address2'].value),
          this.proposer.controls['rpincode'].patchValue( this.proposer.controls['pincode'].value),
          this.proposer.controls['rstate'].patchValue( this.proposer.controls['state'].value),
          this.proposer.controls['rcity'].patchValue( this.proposer.controls['city'].value),
          this.proposer.controls['rcityName'].patchValue( this.proposer.controls['cityName'].value),
              this.sameasper=true;
      console.log(this.proposer.controls['rcity'].value, 'ghghghj');
    } else {
      this.proposer.controls['raddress'].patchValue(''),
          this.proposer.controls['raddress2'].patchValue(''),
          this.proposer.controls['rpincode'].patchValue(''),
          this.proposer.controls['rstate'].patchValue(''),
          this.proposer.controls['rcity'].patchValue(''),
          this.proposer.controls['rcityName'].patchValue(''),
          this.sameasper=false;
      console.log(this.proposer.controls['rcity'].value, 'eeeeeeee');
    }
  }
  proposerDetails(stepper: MatStepper, value) {
    console.log(value);
    sessionStorage.stepper1 = JSON.stringify(value);
    if (this.proposer.valid && this.errorOTP==false) {
      if (sessionStorage.fwRoyalProposerAge >= 18) {
        stepper.next();
      } else {
        this.toastr.error('Proposer age should be 18 or above');

      }

    }else{
      this.toastr.error('Please Fill the Mandatory Fields');
    }
  }
  // vehical details
  vehicalDetails(stepper: MatStepper, value) {
    console.log(this.vehical.value, 'vall');
    sessionStorage.stepper2 = '';
    sessionStorage.stepper2 = JSON.stringify(this.vehical.value);
    console.log(sessionStorage.stepper2, 'stepper2')
    console.log(this.vehical.value, ' value')
      console.log(this.vehical.valid, ' Vecvalid1111');
    // if (check.checked == true) {

      if (this.vehical.valid ) {
          console.log(this.vehical.valid, ' Vecvalid');
      this.valueCalc = [];
      this.valueList =  this.vehical.value.electricalAccess;
      this.valueList.forEach(data => this.valueCalc.push(data.elecValue));
      sessionStorage.valueList = this.valueList;
      console.log(this.valueList,'gfgffjhjh')
      console.log(sessionStorage.valueList,'sessionStoragevalueList')




      let total = this.valueCalc[0] != '' ? this.valueCalc.reduce((a, b) => parseInt(a) + parseInt(b)) : 'err';
      console.log(total,"total")

    this.valuesubCalc = [];
     this.valueSubList =  this.vehical.value.nonelectricalAccess;
     this.valueSubList.forEach(data => this.valuesubCalc.push(data.elecValue));
    sessionStorage.valueSubList = this.valueSubList;
  console.log(this.valueSubList,'valueSubList')
  console.log(sessionStorage.valueSubList,'sessionStoragevalueSubList')

    let subTotal = this.valuesubCalc[0] != '' ? this.valuesubCalc.reduce((a, b) => parseInt(a) + parseInt(b)) : 'err';
    console.log(subTotal,'subtotal');

    if (total <= 50000 || total == 'err') {
      if (subTotal <= 20000 || subTotal == 'err') {
        const dialogRef = this.dialog.open(rsfourwheelercover, {
          width: '650px',
          height: '400px'
        });

        dialogRef.disableClose = true;
        dialogRef.afterClosed().subscribe(result => {
          console.log(result, 'result....')
          if (result == true) {
            this.addonValue = true;

            stepper.next();
            this.topScroll();
          } else if (result == false) {
            this.addonValue = false;
            // this.otpFalseError=false
          }

        });

        // stepper.next();
        // this.topScroll();
    } else {
      this.toastr.error('Non Electrical Accessories Values should be less than 20,000');
    }
      } else {
        this.toastr.error('Electrical Accessories Values should be less than 50,000');
      }

    }
  }
  isFinaced(event: any) {
    if (this.vehical.controls['isFourWheelerFinanced'].value == true) {
      this.vehical.controls['financierName'].patchValue(this.vehical.controls['financierName'].value);
      this.vehical.controls['isFourWheelerFinancedValue'].patchValue(this.vehical.controls['isFourWheelerFinancedValue'].value);

      this.vehical.controls['financierName'].setValidators([Validators.required]);
      this.vehical.controls['isFourWheelerFinancedValue'].setValidators([Validators.required]);
    } else {
      this.vehical.controls['financierName'].patchValue('');
      this.vehical.controls['isFourWheelerFinancedValue'].patchValue('');

      this.vehical.controls['financierName'].setValidators(null);
      this.vehical.controls['isFourWheelerFinancedValue'].setValidators(null);

    }
    this.vehical.controls['financierName'].updateValueAndValidity();
    this.vehical.controls['isFourWheelerFinancedValue'].updateValueAndValidity();

  }

  addonlimit(event: any) {
    if (this.vehical.controls['addonValue'].value <= 100000) {
      this.vehical.controls['addonValue'].patchValue(this.vehical.controls['addonValue'].value);
      this.coverPremium();
    } else {
      this.toastr.error('Addon Values should be less than 100000');
    }

  }

  // eleAccess() {
  //     if (this.vehical.controls['coverelectricalaccesss'].value == true) {
  //     this.vehical.controls['total'].patchValue(this.vehical.controls['total'].value);
  //     }
  //     else {
  //     this.vehical.controls['total'].patchValue('null');
  //     }
    // else {
    //
    //     for (let i=0; i < this.vehical['controls'].electricalAccess['controls'].length; i++) {
    //
    //
    //       if ( i !=  0) {
    //       }
    //       this.vehical['controls'].electricalAccess['controls'][i]['controls'].nameOfElectronicAccessories.patchValue('');
    //       this.vehical['controls'].electricalAccess['controls'][i]['controls'].makeModel.patchValue('');
    //       this.vehical['controls'].electricalAccess['controls'][i]['controls'].elecValue.patchValue('');
    //     }
    //
    //   }
    // }

  eleAccessReq() {
    console.log(this.vehical['controls'].electricalAccess['controls'].length,'value');
    if (this.vehical.controls['coverelectricalaccesss'].value == true) {
        this.vehical.controls['amountElectricalaccesss'].setValidators([Validators.required]);
        // this.coverPremium();

      for (let i=0; i < this.vehical['controls'].electricalAccess['controls'].length; i++) {

        if (i != 0) {
        }

        this.vehical['controls'].electricalAccess['controls'][i]['controls'].nameOfElectronicAccessories.patchValue(this.vehical['controls'].electricalAccess['controls'][i]['controls'].nameOfElectronicAccessories.value);
        this.vehical['controls'].electricalAccess['controls'][i]['controls'].makeModel.patchValue(this.vehical['controls'].electricalAccess['controls'][i]['controls'].makeModel.value);
        this.vehical['controls'].electricalAccess['controls'][i]['controls'].elecValue.patchValue(this.vehical['controls'].electricalAccess['controls'][i]['controls'].elecValue.value);

        this.vehical['controls'].electricalAccess['controls'][i]['controls'].nameOfElectronicAccessories.setValidators([Validators.required]);
        this.vehical['controls'].electricalAccess['controls'][i]['controls'].makeModel.setValidators([Validators.required]);
        this.vehical['controls'].electricalAccess['controls'][i]['controls'].elecValue.setValidators([Validators.required]);
      }

    } else
    if (this.vehical.controls['coverelectricalaccesss'].value == false)
      {
          this.vehical.controls['amountElectricalaccesss'].setValidators(null);
          this.vehical.controls['amountElectricalaccesss'].patchValue('');

      for (let i=0; i < this.vehical['controls'].electricalAccess['controls'].length; i++) {

        if ( i !=  0) {
        }
        this.vehical['controls'].electricalAccess['controls'][i]['controls'].nameOfElectronicAccessories.patchValue('');
        this.vehical['controls'].electricalAccess['controls'][i]['controls'].makeModel.patchValue('');
        this.vehical['controls'].electricalAccess['controls'][i]['controls'].elecValue.patchValue('');

        this.vehical['controls'].electricalAccess['controls'][i]['controls'].nameOfElectronicAccessories.setValidators(null);
        this.vehical['controls'].electricalAccess['controls'][i]['controls'].makeModel.setValidators(null);
        this.vehical['controls'].electricalAccess['controls'][i]['controls'].elecValue.setValidators(null);
      }


    }
      this.vehical.controls['amountElectricalaccesss'].updateValueAndValidity();

      for (let i=0; i < this.vehical['controls'].electricalAccess['controls'].length; i++) {

      if ( i !=  0) {
      }
      this.vehical['controls'].electricalAccess['controls'][i]['controls'].nameOfElectronicAccessories.updateValueAndValidity();
      this.vehical['controls'].electricalAccess['controls'][i]['controls'].makeModel.updateValueAndValidity();
      this.vehical['controls'].electricalAccess['controls'][i]['controls'].elecValue.updateValueAndValidity();
    }
  }

  // electricValueAmount(){
  //   if (this.vehical.controls['coverelectricalaccesss'].value == true) {
  //     // this.vehical.controls['amountElectricalaccesss'].setValidators([Validators.required]);
  //     this.coverPremium();
  //   }else{
  //     this.vehical.controls['amountElectricalaccesss'].patchValue('');
  //
  //   }
  // }
  //   changeAmountElectri(){
  //       this.vehical.controls['amountElectricalaccesss'].patchValue(this.ELECTRICAL_ACCESSORIES);
  //
  //   }

  noneleAccessReq() {

    if (this.vehical.controls['cover_non_elec_acc'].value == true) {
        this.vehical.controls['amountNonElectricalaccesss'].setValidators([Validators.required]);
        // this.coverPremium();

        for (let i=0; i < this.vehical['controls'].nonelectricalAccess['controls'].length; i++) {

            if (i != 0) {
            }

            this.vehical['controls'].nonelectricalAccess['controls'][i]['controls'].nameOfElectronicAccessories.patchValue(this.vehical['controls'].nonelectricalAccess['controls'][i]['controls'].nameOfElectronicAccessories.value);
            this.vehical['controls'].nonelectricalAccess['controls'][i]['controls'].makeModel.patchValue(this.vehical['controls'].nonelectricalAccess['controls'][i]['controls'].makeModel.value);
            this.vehical['controls'].nonelectricalAccess['controls'][i]['controls'].elecValue.patchValue(this.vehical['controls'].nonelectricalAccess['controls'][i]['controls'].elecValue.value);

            this.vehical['controls'].nonelectricalAccess['controls'][i]['controls'].nameOfElectronicAccessories.setValidators([Validators.required]);
            this.vehical['controls'].nonelectricalAccess['controls'][i]['controls'].makeModel.setValidators([Validators.required]);
            this.vehical['controls'].nonelectricalAccess['controls'][i]['controls'].elecValue.setValidators([Validators.required]);
        }

    } else
    if (this.vehical.controls['cover_non_elec_acc'].value == false)
    {
        this.vehical.controls['amountNonElectricalaccesss'].setValidators(null);
        this.vehical.controls['amountNonElectricalaccesss'].patchValue('');
        for (let i=0; i < this.vehical['controls'].nonelectricalAccess['controls'].length; i++) {

            if ( i !=  0) {
            }
            this.vehical['controls'].nonelectricalAccess['controls'][i]['controls'].nameOfElectronicAccessories.patchValue('');
            this.vehical['controls'].nonelectricalAccess['controls'][i]['controls'].makeModel.patchValue('');
            this.vehical['controls'].nonelectricalAccess['controls'][i]['controls'].elecValue.patchValue('');

            this.vehical['controls'].nonelectricalAccess['controls'][i]['controls'].nameOfElectronicAccessories.setValidators(null);
            this.vehical['controls'].nonelectricalAccess['controls'][i]['controls'].makeModel.setValidators(null);
            this.vehical['controls'].nonelectricalAccess['controls'][i]['controls'].elecValue.setValidators(null);
        }


    }
      this.vehical.controls['amountNonElectricalaccesss'].updateValueAndValidity();

      for (let i=0; i < this.vehical['controls'].nonelectricalAccess['controls'].length; i++) {

          if ( i !=  0) {
          }
          this.vehical['controls'].nonelectricalAccess['controls'][i]['controls'].nameOfElectronicAccessories.updateValueAndValidity();
          this.vehical['controls'].nonelectricalAccess['controls'][i]['controls'].makeModel.updateValueAndValidity();
          this.vehical['controls'].nonelectricalAccess['controls'][i]['controls'].elecValue.updateValueAndValidity();
      }
  }

  // electricNonValueAmount(){
  //   if (this.vehical.controls['cover_non_elec_acc'].value == true) {
  //     // this.vehical.controls['amountElectricalaccesss'].setValidators([Validators.required]);
  //     this.coverPremium();
  //   }else{
  //     this.vehical.controls['amountNonElectricalaccesss'].patchValue('');
  //
  //   }
  //
  // }
  //
  //   changeAmountNonElectri(){
  //       this.vehical.controls['amountNonElectricalaccesss'].patchValue(this.NON_ELECTRICAL_ACCESSORIES);
  //
  //   }
  //
   guardianAgeValid(event:any) {
    if (this.guardianList == true) {
      this.nomineeDetail.controls['guardianName'].patchValue(this.nomineeDetail.controls['guardianName'].value);
      this.nomineeDetail.controls['guardianAge'].patchValue(this.nomineeDetail.controls['guardianAge'].value);
      this.nomineeDetail.controls['guardianRelationship'].patchValue(this.nomineeDetail.controls['guardianRelationship'].value);

      this.nomineeDetail.controls['guardianName'].setValidators([Validators.required]);
      this.nomineeDetail.controls['guardianAge'].setValidators([Validators.required]);
      this.nomineeDetail.controls['guardianRelationship'].setValidators([Validators.required]);
    } else
        if (this.guardianList == false)
        {
      this.nomineeDetail.controls['guardianName'].patchValue('');
      this.nomineeDetail.controls['guardianAge'].patchValue('');
      this.nomineeDetail.controls['guardianRelationship'].patchValue('');

      this.nomineeDetail.controls['guardianName'].setValidators(null);
      this.nomineeDetail.controls['guardianAge'].setValidators(null);
      this.nomineeDetail.controls['guardianRelationship'].setValidators(null);

    }
    this.nomineeDetail.controls['guardianName'].updateValueAndValidity();
    this.nomineeDetail.controls['guardianAge'].updateValueAndValidity();
    this.nomineeDetail.controls['guardianRelationship'].updateValueAndValidity();

  }


  isAddoncheck() {
    if (this.vehical.controls['isAddon'].value == true) {

    } else {
      this.vehical.controls['addon'].patchValue('');

    }
  }

  isBaggages() {

    if (this.vehical.controls['lossOfBaggage'].value == 'Yes') {
      this.vehical.controls['valueOfLossOfBaggage'].patchValue(this.vehical.controls['valueOfLossOfBaggage'].value);

      this.vehical.controls['valueOfLossOfBaggage'].setValidators([Validators.required]);
    } else {
      this.vehical.controls['valueOfLossOfBaggage'].patchValue('');

      this.vehical.controls['valueOfLossOfBaggage'].setValidators(null);

    }
    this.vehical.controls['valueOfLossOfBaggage'].updateValueAndValidity();

  }
    // valueBaggesChange(){
    //     if (this.vehical.controls['valueOfLossOfBaggage'].value) {
    //
    //         this.vehical.controls['amountLossOfBaggage'].setValidators([Validators.required]);
    //         this.coverPremium();
    //     } else {
    //         this.vehical.controls['amountLossOfBaggage'].patchValue('');
    //
    //         this.vehical.controls['amountLossOfBaggage'].setValidators(null);
    //
    //     }
    //     this.vehical.controls['amountLossOfBaggage'].updateValueAndValidity();
    //
    // }
    // amountBagges(){
    //     this.vehical.controls['amountLossOfBaggage'].patchValue(this.LOSS_OF_BAGGAGE)
    // }

  isTowing() {

    if (this.vehical.controls['towingCharge'].value == 'Yes') {
      this.vehical.controls['towingChargeSI'].patchValue(this.vehical.controls['towingChargeSI'].value);
      this.vehical.controls['towingChargeSI'].setValidators([Validators.required]);
    } else {
      this.vehical.controls['towingChargeSI'].patchValue('');
      this.vehical.controls['towingChargeSI'].setValidators(null);
    }
    this.vehical.controls['towingChargeSI'].updateValueAndValidity();

  }
  // valueTowing(){
  //   if (this.vehical.controls['towingChargeSI'].value) {
  //
  //     this.vehical.controls['amountTowingCharge'].setValidators([Validators.required]);
  //     this.coverPremium();
  //   } else {
  //     this.vehical.controls['amountTowingCharge'].patchValue('');
  //
  //     this.vehical.controls['amountTowingCharge'].setValidators(null);
  //
  //   }
  //   this.vehical.controls['amountTowingCharge'].updateValueAndValidity();
  //
  // }
  // amountTowing(){
  //   this.vehical.controls['amountTowingCharge'].patchValue(this.TOWING_CHARGE)
  // }

  isBiFuel() {


      if (this.vehical.controls['isBiFuelKit'].value == 'Yes') {
        this.vehical.controls['isBiFuelKitYes'].patchValue(this.vehical.controls['isBiFuelKitYes'].value);
        this.vehical.controls['addonValue'].patchValue(this.vehical.controls['addonValue'].value);

        this.vehical.controls['isBiFuelKitYes'].setValidators([Validators.required]);
        this.vehical.controls['addonValue'].setValidators([Validators.required]);
      } else {
        this.vehical.controls['isBiFuelKitYes'].patchValue('');
        this.vehical.controls['addonValue'].patchValue('');

        this.vehical.controls['isBiFuelKitYes'].setValidators(null);
        this.vehical.controls['addonValue'].setValidators(null);

      }
      this.vehical.controls['isBiFuelKitYes'].updateValueAndValidity();
      this.vehical.controls['addonValue'].updateValueAndValidity();


  }
  // bifuelcoverPremium(){
  //
  //   if (this.vehical.controls['isBiFuelKitYes'].value) {
  //     this.vehical.controls['bifuelpremium'].setValidators([Validators.required]);
  //     this.coverPremium();
  //   }else{
  //     this.vehical.controls['bifuelpremium'].patchValue('');
  //     this.vehical.controls['bifuelpremium'].setValidators(null);
  //   }
  //   this.vehical.controls['bifuelpremium'].updateValueAndValidity();
  //
  // }
  // changebifuelcoverpremium(){
  //   this.vehical.controls['bifuelpremium'].patchValue(this.BI_FUEL_KIT);
  //
  //
  // }
  changebifuel(){
    console.log(this.vehical.controls['isBiFuelKitYes'].value,'111111')
    if (this.vehical.controls['isBiFuelKitYes'].value == 'Add On') {
      // this.vehical.controls['isBiFuelKitYes'].patchValue(this.vehical.controls['isBiFuelKitYes'].value);
      this.vehical.controls['addonValue'].patchValue(this.vehical.controls['addonValue'].value);

      // this.vehical.controls['isBiFuelKitYes'].setValidators([Validators.required]);
      this.vehical.controls['addonValue'].setValidators([Validators.required]);
    } else {
      // this.vehical.controls['isBiFuelKitYes'].patchValue('');
      this.vehical.controls['addonValue'].patchValue('');

      // this.vehical.controls['isBiFuelKitYes'].setValidators(null);
      this.vehical.controls['addonValue'].setValidators(null);

    }
    // this.vehical.controls['isBiFuelKitYes'].updateValueAndValidity();
    this.vehical.controls['addonValue'].updateValueAndValidity();


  }
  isSpareCar() {


    if (this.vehical.controls['spareCar'].value == 'On') {
      this.vehical.controls['spareCarLimit'].patchValue(this.vehical.controls['spareCarLimit'].value);

      this.vehical.controls['spareCarLimit'].setValidators([Validators.required]);
    } else {
      this.vehical.controls['spareCarLimit'].patchValue('');

      this.vehical.controls['spareCarLimit'].setValidators(null);

    }
    this.vehical.controls['spareCarLimit'].updateValueAndValidity();


  }


  // noneleAccess() {
  //   if (this.vehical.controls['cover_non_elec_acc'].value == true) {
  //
  //   } else {
  //
  //     for (let i=0; i < this.getStepper2.nonelectricalAccess.length; i++) {
  //       if ( i !=  0) {
  //       }
  //       this.vehical['controls'].nonelectricalAccess['controls'][i]['controls'].nameOfElectronicAccessories.patchValue('');
  //       this.vehical['controls'].nonelectricalAccess['controls'][i]['controls'].makeModel.patchValue('');
  //       this.vehical['controls'].nonelectricalAccess['controls'][i]['controls'].elecValue.patchValue('');
  //     }
  //
  //   }
  // }


  changefinancedValue() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0'

    }
    this.fourWheeler.fourWheelerfinancedValue(data).subscribe(
        (successData) => {
          this.hypothecationTypeSuccess(successData);
        },
        (error) => {
          this.hypothecationTypeFailure(error);
        }
    );
  }
  public hypothecationTypeSuccess(successData) {
    if (successData.IsSuccess) {
      this.financedValueDetails = successData.ResponseObject;
    }
  }
  public hypothecationTypeFailure(error) {
  }
// cover type
  changeCoverType() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0'

    }
    this.fourWheeler.fourWheelergettypeOfCover(data).subscribe(
        (successData) => {
          this.coverTypeSuccess(successData);
        },
        (error) => {
          this.coverTypeFailure(error);
        }
    );
  }
  public coverTypeSuccess(successData) {
    if (successData.IsSuccess) {
      this.coverList = successData.ResponseObject;
    }
  }
  public coverTypeFailure(error) {
  }
  vechicleReq(){
    if (this.vehical.controls['vehicleRegisteredName'].value == 'Company') {
      this.vehical.controls['companyName'].setValidators([Validators.required]);
      this.vehical.controls['gstIn'].setValidators([Validators.required]);
    } else  {
      this.vehical.controls['companyName'].patchValue('');
      this.vehical.controls['gstIn'].patchValue('');

      this.vehical.controls['companyName'].setValidators(null);
      this.vehical.controls['gstIn'].setValidators(null);
    }
    this.vehical.controls['companyName'].updateValueAndValidity();
    this.vehical.controls['gstIn'].updateValueAndValidity();
  }
  changeVehicleName() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0'

    }
    this.fourWheeler.fourWheelerGetvehicleRegisteredNameList(data).subscribe(
        (successData) => {
          this.nameListSuccess(successData);
        },
        (error) => {
          this.nameListFailure(error);
        }
    );
  }
  public nameListSuccess(successData){
    if (successData.IsSuccess) {
      this.registrationNameList = successData.ResponseObject;
    }
  }
  public nameListFailure(error) {
  }
  changeDrivingExpType() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0'

    }
    this.fourWheeler.fourWheelergetdrivingExperience(data).subscribe(
        (successData) => {
          this.drivingSuccess(successData);
        },
        (error) => {
          this.drivingFailure(error);
        }
    );
  }
  public drivingSuccess(successData) {
    if (successData.IsSuccess) {
      this.drivingTypeList = successData.ResponseObject;
    }
  }
  public drivingFailure(error) {
  }
  changeMilageType() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0'

    }
    this.fourWheeler.fourWheelerGetmileage(data).subscribe(
        (successData) => {
          this.milageSuccess(successData);
        },
        (error) => {
          this.milageFailure(error);
        }
    );
  }
  public milageSuccess(successData) {
    if (successData.IsSuccess) {
      this.milageList = successData.ResponseObject;
    }
  }
  public milageFailure(error) {
  }
  changePaType() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0'

    }
    this.fourWheeler.fWaccidentCoverUnnamedPassengers(data).subscribe(
        (successData) => {
          this.paSuccess(successData);
        },
        (error) => {
          this.paFailure(error);
        }
    );
  }
  public paSuccess(successData) {
    if (successData.IsSuccess) {
      this.pAUnnamedPassengersList = successData.ResponseObject;
    }
  }
  public paFailure(error) {
  }
  changeMakeModel() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0'

    }
    this.fourWheeler.fourWheelerGetmakeList(data).subscribe(
        (successData) => {
          this.makeModelSuccess(successData);
        },
        (error) => {
          this.makeModelFailure(error);
        }
    );
  }
  public makeModelSuccess(successData) {
    if (successData.IsSuccess) {
      this.makeModelList = successData.ResponseObject;
    }
  }
  public makeModelFailure(error) {
  }

  changePaidDriverType() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0'

    }
    this.fourWheeler.fourWheeleraccidentCoverDriver(data).subscribe(
        (successData) => {
          this.paidSuccess(successData);
        },
        (error) => {
          this.paidFailure(error);
        }
    );
  }
  public paidSuccess(successData) {
    if (successData.IsSuccess) {
      this.paidList = successData.ResponseObject;
    }
  }
  public paidFailure(error) {
  }
  changeAccidentPaidDriver() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0'

    }
    this.fourWheeler.fourWheeleraccidentCoverDriver(data).subscribe(
        (successData) => {
          this.accidentPaidSuccess(successData);
        },
        (error) => {
          this.accidentPaidFailure(error);
        }
    );
  }
  public accidentPaidSuccess(successData) {
    if (successData.IsSuccess) {
      this.accidentList = successData.ResponseObject;

    }
  }
  public accidentPaidFailure(error) {
  }

  idvValuess() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
      "enquiry_id": this.bikeEnquiryId,

    }
    this.fourWheeler.fourWheeleridvssValue(data).subscribe(
        (successData) => {
          this.idvValuessSuccess(successData);
        },
        (error) => {
          this.idvValuessFailure(error);
        }
    );
  }
  public idvValuessSuccess(successData) {
    if (successData.IsSuccess) {
      this.idvValueDetail = successData.ResponseObject;
      this.idvValue();
    }
  }
  public idvValuessFailure(error) {
  }

  idvValue() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
      "enquiry_id": this.bikeEnquiryId,
      "org_idv": this.idv,
      "idv_range": ''?'0':this.vehical.controls['IDV'].value,

    }
    this.fourWheeler.fourWheeleridvValue(data).subscribe(
        (successData) => {
          this.idvValueSuccess(successData);
        },
        (error) => {
          this.idvValueFailure(error);
        }
    );
  }
  public idvValueSuccess(successData) {
    if (successData.IsSuccess) {
      this.idvValues = successData.ResponseObject.modified_idv_value;

    }
  }
  public idvValueFailure(error) {
  }
  // policy
  changepolicyType() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0'

    }
    this.fourWheeler.getRsPolicyDetails(data).subscribe(
        (successData) => {
          this.policyDetailsSuccess(successData);
        },
        (error) => {
          this.policyDetailsFailure(error);
        }
    );
  }
  public policyDetailsSuccess(successData) {
    if (successData.IsSuccess) {
      this.policyList = successData.ResponseObject;
    }
  }
  public policyDetailsFailure(error) {
  }

  // baggage value
  changepbaggageValue() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0'

    }
    this.fourWheeler.getRsbaggageValueDetails(data).subscribe(
        (successData) => {
          this.baggageValueSuccess(successData);
        },
        (error) => {
          this.baggageValueFailure(error);
        }
    );
  }
  public baggageValueSuccess(successData) {
    if (successData.IsSuccess) {
      this.baggageList = successData.ResponseObject;
    }
  }
  public baggageValueFailure(error) {
  }

  towingChargeSIValue() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
      "enquiry_id": this.bikeEnquiryId,

    }
    this.fourWheeler.getTowingDetails(data).subscribe(
        (successData) => {
          this.towingChargeSuccess(successData);
        },
        (error) => {
          this.towingChargeFailure(error);
        }
    );
  }
  public towingChargeSuccess(successData) {
    if (successData.IsSuccess) {
      this.towingList = successData.ResponseObject;
    }
  }
  public towingChargeFailure(error) {
  }

  // BiFuelKit value
  changeBiFuelValue() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0'

    }
    this.fourWheeler.getRsBiFuelKitDetails(data).subscribe(
        (successData) => {
          this.biFuelValueSuccess(successData);
        },
        (error) => {
          this.biFuelValueFailure(error);
        }
    );
  }
  public biFuelValueSuccess(successData) {
    if (successData.IsSuccess) {
      this.BiFuelList = successData.ResponseObject;
    }
  }
  public biFuelValueFailure(error) {
  }
  // PreviousInsure

  changePreviousInsureType() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0'

    }
    this.fourWheeler.fourWheelergetpreviousInsurerList(data).subscribe(
        (successData) => {
          this.previousInsureTypeSuccess(successData);
        },
        (error) => {
          this.previousInsureTypeFailure(error);
        }
    );
  }
  public previousInsureTypeSuccess(successData) {
    if (successData.IsSuccess) {
      this.previousList = successData.ResponseObject;
    }
  }
  public previousInsureTypeFailure(error) {
  }
  // addon
  changePolicyType() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0'

    }
    this.fourWheeler.fourWheeleraddOnList(data).subscribe(
        (successData) => {
          this.addonSuccess(successData);
        },
        (error) => {
          this.addonFailure(error);
        }
    );
  }
  public addonSuccess(successData) {
    if (successData.IsSuccess) {
      this.policyTypesss = successData.ResponseObject;
    }
  }
  public addonFailure(error) {
  }



  coverPremium() {
    const data = {
      "platform": "web",
      "user_id": this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      "role_id": this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      "pos_status": this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
      "enquiry_id": this.bikeEnquiryId,
      "created_by": '',
      "proposal_id": sessionStorage.royalFourWheelerproposalID == '' || sessionStorage.royalFourWheelerproposalID == undefined ? '' : sessionStorage.royalFourWheelerproposalID,
      "company_id": this.buyProduct.company_id,
      "business_type": this.vehicledetailsfw.business_type,
      "CALCULATEPREMIUMREQUEST": {
        "premium": '',
        "proposerDetails": {
          "addressOne": this.proposer.controls['raddress'].value,
          "addressTwo": this.proposer.controls['raddress2'].value,
          "regCity": this.proposer.controls['rcity'].value,
          "regPinCode": this.proposer.controls['rpincode'].value,
          "contactAddress1": this.proposer.controls['address'].value,
          "contactAddress2": this.proposer.controls['address2'].value,
          "contactCity": this.proposer.controls['city'].value,
          "contactPincode": this.proposer.controls['pincode'].value,
          "dateOfBirth": this.datepipe.transform(this.proposer.controls['dob'].value, 'y-MM-dd'),
          "panNumber": this.proposer.controls['panNumber'].value,
          "aadharNumber": this.proposer.controls['aadharNumber'].value,
          "guardianAge": this.nomineeDetail.controls['guardianAge'].value,
          "guardianName": this.nomineeDetail.controls['guardianName'].value,
          "nomineeAge": this.nomineeDetail.controls['nomineeAge'].value,
          "nomineeName": this.nomineeDetail.controls['nomineeName'].value,
          "occupation": this.proposer.controls['occupation'].value,
          "relationshipWithNominee": this.nomineeDetail.controls['nomineeRelationship'].value,
          "relationshipwithGuardian": this.nomineeDetail.controls['guardianRelationship'].value,
          "sameAdressReg": this.proposer.controls['sameas'].value ? 'Yes' : 'No',
          "strPhoneNo": this.proposer.controls['phoneNumber'].value,
          "strStdCode": this.proposer.controls['stdCode'].value,
          "userName": "michael@xerago.com",
          "strEmail": this.proposer.controls['email'].value,
          "strFirstName": this.proposer.controls['firstname'].value,
          "strLastName": this.proposer.controls['lastname'].value,
          "strMobileNo": this.proposer.controls['mobile'].value,
          "strTitle": this.proposer.controls['title'].value,
        },
        "quoteId": '',
        "vehicleDetails": {
          "accidentCoverForPaidDriver": this.vehical.controls['accidentCoverForPaidDriver'].value,
          "addonValue": this.vehical.controls['addonValue'].value,
          "claimsMadeInPreviousPolicy": this.previousInsure.controls['isPreviousPolicyHolder'].value ,
          "claimsReported": this.previousInsure.controls['claimsReported'].value,
          "claimAmountReceived": this.previousInsure.controls['claimAmountReceived'].value,
          "averageMonthlyMileageRun": this.vehical.controls['averageMonthlyMileageRun'].value,
          "companyNameForCar": this.vehical.controls['companyName'].value,
          "GSTIN": this.vehical.controls['gstIn'].value,
          "cover_dri_othr_car_ass": this.vehical.controls['cover_dri_othr_car_ass'].value ,
          "drivingExperience": this.vehical.controls['drivingExperience'].value,
          "cover_elec_acc": this.vehical.controls['coverelectricalaccesss'].value ? 'Yes' : 'No',
          "type_of_cover":this.packageListFw,
          "policyTerm":this.packagePolicyYear,
          "electricalAccessories": {
            "electronicAccessoriesDetails": this.vehical.value.electricalAccess,
          },
          "valueofelectricalaccessories": this.vehical.controls['total'].value == 'err' ? '' : this.vehical.controls['total'].value,
          "cover_non_elec_acc": this.vehical.controls['cover_non_elec_acc'].value ? 'Yes' : 'No',
          "nonElectricalAccesories": {
            "nonelectronicAccessoriesDetails": this.vehical.value.nonelectricalAccess,
          },
          "valueofnonelectricalaccessories": this.vehical.controls['subTotal'].value == 'err' ? '' : this.vehical.controls['subTotal'].value,
          "fibreGlass": this.vehical.controls['fibreGlass'].value ,
          "financierName": this.vehical.controls['financierName'].value,
          "isCarFinanced": this.vehical.controls['isFourWheelerFinanced'].value ? 'Yes' : 'No',
          "isCarFinancedValue": this.vehical.controls['isFourWheelerFinancedValue'].value,
          "isCarOwnershipChanged": this.vehical.controls['isCarOwnershipChanged'].value ,
          "automobileAssociationMembership": this.vehical.controls['automobileAssociationMembership'].value ,
          "isBiFuelKit": this.vehical.controls['isBiFuelKit'].value ,
          "legalliabilityToPaidDriver": this.vehical.controls['legalliabilityToPaidDriver'].value ,
          "lossOfBaggage": this.vehical.controls['lossOfBaggage'].value ,
          "personalAccidentCoverForUnnamedPassengers": this.vehical.controls['personalAccidentCoverForUnnamedPassengers'].value,
          "policyED":  this.datepipe.transform(this.buyProduct.previous_policy_expiry_date, 'y-MM-dd') ? this.datepipe.transform(this.buyProduct.previous_policy_expiry_date, 'y-MM-dd') : '',
          "policySD": this.datepipe.transform(this.buyProduct.previous_policy_start_date, 'y-MM-dd') ? this.datepipe.transform(this.buyProduct.previous_policy_start_date, 'y-MM-dd') : '',
          "previousInsurerName": this.previousInsure.controls['previousInsured'].value ? this.previousInsure.controls['previousInsured'].value : '',
          "previousPolicyType": this.previousInsure.controls['previousPolicyType'].value ? this.previousInsure.controls['previousPolicyType'].value : '',
          "previousinsurersCorrectAddress": this.previousInsure.controls['previousinsurersCorrectAddress'].value ? this.previousInsure.controls['previousinsurersCorrectAddress'].value : '',
          "previuosPolicyNumber": this.previousInsure.controls['policyNumber'].value ? this.previousInsure.controls['policyNumber'].value : '',
          "valueOfLossOfBaggage": this.vehical.controls['valueOfLossOfBaggage'].value,
          "isBiFuelKitYes": this.vehical.controls['isBiFuelKitYes'].value,
          "vehicleMostlyDrivenOn": this.vehical.controls['vehicleMostlyDrivenOn'].value,
          "vehicleInspectionDate": "28/04/2017 04:00:00",
          "vehicleRegisteredInTheNameOf": this.vehical.controls['vehicleRegisteredName'].value,
          "voluntarydeductible": this.previousInsure.controls['voluntary'].value ? this.previousInsure.controls['voluntary'].value : '',
          "keyreplacement": this.vehical.controls['keyreplacement'].value ,
          "windShieldGlass": this.vehical.controls['windShieldGlass'].value ,
          "depreciationWaiver": this.vehical.controls['depreciationWaiver'].value,
          "engineprotector": this.vehical.controls['engineprotector'].value ,
          "ncbprotector": this.vehical.controls['ncbprotector'].value ,
          "registrationchargesRoadtax": 'Off' ,
          "spareCar": this.vehical.controls['spareCar'].value ,
          "spareCarLimit": this.vehical.controls['spareCarLimit'].value ,
          "invoicePrice": this.vehical.controls['invoicePrice'].value ,
          "typeOfCover": this.vehical.controls['typeOfCover'].value ,
          "towingChargesCover": this.vehical.controls['towingCharge'].value ,
          "towingChargesCover_SI": this.vehical.controls['towingChargeSI'].value,
        }
      }
    };
    // this.settings.loadingSpinner = true;

    this.fourWheeler.calculatrepremiumrs(data).subscribe(
        (successData) => {
          this.calculatrepremiumrsSuccess(successData);
        },
        (error) => {
          this.calculatrepremiumrsFailure(error);
        }
    );
  }
  public calculatrepremiumrsSuccess(successData) {
    // this.settings.loadingSpinner = false;

    if (successData.IsSuccess) {
      this.AddonList = successData.ResponseObject;
      this.LIABILITY_PA_COVER_TO_PAID_DRIVER=this.AddonList.LIABILITY_PA_COVER_TO_PAID_DRIVER;
      sessionStorage.LIABILITY_PA_COVER_TO_PAID_DRIVER=this.LIABILITY_PA_COVER_TO_PAID_DRIVER
      this.DEPRECIATION_WAIVER=this.AddonList.DEPRECIATION_WAIVER;
        sessionStorage.DEPRECIATION_WAIVER=this.DEPRECIATION_WAIVER

        this.ENGINE_PROTECTOR=this.AddonList.ENGINE_PROTECTOR;
        sessionStorage.ENGINE_PROTECTOR=this.ENGINE_PROTECTOR

        this.NCB_PROTECTOR=this.AddonList.NCB_PROTECTOR;
        sessionStorage.NCB_PROTECTOR=this.NCB_PROTECTOR

        this.WIND_SHIELD_GLASS=this.AddonList.WIND_SHIELD_GLASS;
        sessionStorage.WIND_SHIELD_GLASS=this.WIND_SHIELD_GLASS

        this.KEY_REPLACEMENT=this.AddonList.KEY_REPLACEMENT;
        sessionStorage.KEY_REPLACEMENT=this.KEY_REPLACEMENT

        this.LIFE_TIME_ROAD_TAX=this.AddonList.LIFE_TIME_ROAD_TAX;
        sessionStorage.LIFE_TIME_ROAD_TAX=this.LIFE_TIME_ROAD_TAX

        this.AUTOMOBILE_ASSOCIATION_DISCOUNT=this.AddonList.AUTOMOBILE_ASSOCIATION_DISCOUNT;
        sessionStorage.AUTOMOBILE_ASSOCIATION_DISCOUNT=this.AUTOMOBILE_ASSOCIATION_DISCOUNT

        this.LIABILITY_TO_PAID_DRIVERS=this.AddonList.LIABILITY_TO_PAID_DRIVERS;
        sessionStorage.LIABILITY_TO_PAID_DRIVERS=this.LIABILITY_TO_PAID_DRIVERS

        this.TO_EMPLOYEE=this.AddonList.TO_EMPLOYEE;
        sessionStorage.TO_EMPLOYEE=this.TO_EMPLOYEE

        this.FIBER_GLASS_TANK=this.AddonList.FIBER_GLASS_TANK;
        sessionStorage.FIBER_GLASS_TANK=this.FIBER_GLASS_TANK

        this.BI_FUEL_KIT=this.AddonList.BI_FUEL_KIT;
        sessionStorage.BI_FUEL_KIT=this.BI_FUEL_KIT

        this.LOSS_OF_BAGGAGE=this.AddonList.LOSS_OF_BAGGAGE;
        sessionStorage.LOSS_OF_BAGGAGE=this.LOSS_OF_BAGGAGE

        this.TOWING_CHARGE=this.AddonList.TOWING_CHARGE;
        sessionStorage.TOWING_CHARGE=this.TOWING_CHARGE

        this.ELECTRICAL_ACCESSORIES=this.AddonList.ELECTRICAL_ACCESSORIES;
        sessionStorage.ELECTRICAL_ACCESSORIES=this.ELECTRICAL_ACCESSORIES

        this.NON_ELECTRICAL_ACCESSORIES=this.AddonList.BASIC_PREMIUM_AND_NON_ELECTRICAL_ACCESSORIES;
        sessionStorage.NON_ELECTRICAL_ACCESSORIES=this.NON_ELECTRICAL_ACCESSORIES

        this.INVOICE_PRICE_INSURANCE=this.AddonList.INVOICE_PRICE_INSURANCE;
        sessionStorage.INVOICE_PRICE_INSURANCE=this.INVOICE_PRICE_INSURANCE

        // this.premiumadd=this.AddonList.premium;
      // console.log(this.premiumadd,'gfhfhgfh')
      // this.coverdriverpremiumchange();
      // this.invoicePriceChangepremium();
      // this.patchkeyreplacementpremium();
      // this.patchdepreciationpremium();
      // this.ncbprotecorchangepremium();
      // this.windShieldGlasspremipatch();
      // // this.changeregistrationchargesRoadtaxpremium();
      // this.automobilepremiumchangepremium();
      // this.changeengineprotectorpremium();
      // this.legalliabilityToPaidDriverchangepremium();
      // this.fibreGlasspremiumchangepremium();
      // this.changebifuelcoverpremium();
      // this.amountBagges();
      // this.changeAmountElectri();
      // this.changeAmountNonElectri();
      // this.amountTowing();
      // this.employeechangepremium();

    }
  }
  public calculatrepremiumrsFailure(error) {
  }

  // voulntry Type
  changeVoulntaryType() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0'

    }
    this.fourWheeler.fourWheelervoluntaryDeductibleListt(data).subscribe(
        (successData) => {
          this.vountaryTypeSuccess(successData);
        },
        (error) => {
          this.vountaryPolicyTypeFailure(error);
        }
    );
  }
  public vountaryTypeSuccess(successData){
    if (successData.IsSuccess) {
      this.vountaryList = successData.ResponseObject;
    }
  }
  public vountaryPolicyTypeFailure(error) {
  }
  policyHolder() {
    if (this.previousInsure.controls['isPreviousPolicyHolder'].value == 'Yes') {

    } else {
      this.previousInsure.controls['claimAmountReceived'].patchValue('');
      console.log(this.previousInsure.controls['claimAmountReceived'].value)
      this.previousInsure.controls['voluntary'].patchValue('');
      this.previousInsure.controls['claimsReported'].patchValue('');
     console.log(this.previousInsure.controls['claimsReported'].value)
    }
  }
  // next
  previousDetails(stepper: MatStepper, value) {
    console.log(value);
    sessionStorage.stepper3 = JSON.stringify(value);
    if (this.previousInsure.valid) {
      if (this.previousInsure.controls['previousPolicyType'].value == 'Thirdparty') {
      this.toastr.error('For Buying a third party insurence. Please contact our Customer service or mail to customer.services@royalsundaram.inor chat Online with our chat repersentative');
      } else {
        stepper.next();

      }
    }

  }


  // fourth page

  ageNominee() {
    if (this.nomineeDetail.controls['nomineeAge'].value <= 17) {
      this.guardianList = true;
    }  else {
      this.guardianList = false;

    }
  }
  // RELATIONSHIP
  nomineeRelationShip() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.fourWheeler.getRSRelationship(data).subscribe(
        (successData) => {
          this.nomineeRelationSuccess(successData);
        },
        (error) => {
          this.nomineeRelationFailure(error);
        }
    );
  }
  public nomineeRelationSuccess(successData) {
    if (successData.IsSuccess) {
      this.nomineeRelation = successData.ResponseObject;
      console.log(this.nomineeRelation, 'this.nomineeRelation');
    }
  }
  public nomineeRelationFailure(error) {
  }

  // Guardian RELATIONSHIP
  guardianRelationShip() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.fourWheeler.getRSRelationship(data).subscribe(
        (successData) => {
          this.guardianRelationSuccess(successData);
        },
        (error) => {
          this.guardianRelationFailure(error);
        }
    );
  }
  public guardianRelationSuccess(successData) {
    if (successData.IsSuccess) {
      this.guardianRelationList = successData.ResponseObject;

    }
  }
  public guardianRelationFailure(error) {
  }

  nomineeDetails(stepper: MatStepper, value) {
    sessionStorage.stepper4 = '';
    sessionStorage.stepper4 = JSON.stringify(value);
    if (this.nomineeDetail.valid) {
    this.proposal(stepper);
    }
  }
  // proposal creation
  proposal(stepper) {
    console.log(this.vehical.value, 'jjjcoverelectricalaccesss');
    console.log(stepper,'stepper')
      // let electricalValue = [];
      // for (let i = 0; i < this.vehical.value.electricalAccess.length; i++) {
      //     electricalValue.push({
      //         "nameOfElectronicAccessories": this.vehical.value.electricalAccess[i].nameOfElectronicAccessories,
      //         "makeModel" :  this.vehical.value.electricalAccess[i].makeModel,
      //         "elecValue": this.vehical.value.electricalAccess[i].elecValue ? 'err' : '',
      //     });
      // }
      // let nonlectricalValue = [];
      // for (let i = 0; i < this.vehical.value.electricalAccess.length; i++) {
      //     electricalValue.push({
      //         "nameOfElectronicAccessories": this.vehical.value.electricalAccess[i].nameOfElectronicAccessories,
      //         "makeModel" :  this.vehical.value.electricalAccess[i].makeModel,
      //         "elecValue": this.vehical.value.electricalAccess[i].elecValue ? 'err' : '',
      //     });
      // }
    console.log(this.proposer.controls['rcity'].value, ' Propossal');
    console.log(this.proposer.controls['city'].value, ' Propossal');

    const data = {
      "platform": "web",
      "user_id": this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      "role_id": this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      "pos_status": this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
      "enquiry_id": this.bikeEnquiryId,
      "created_by": '',
      "proposal_id": sessionStorage.royalFourWheelerproposalID == '' || sessionStorage.royalFourWheelerproposalID == undefined ? '' : sessionStorage.royalFourWheelerproposalID,
      "company_id": this.buyProduct.company_id,
      "business_type": this.vehicledetailsfw.business_type,
      "CALCULATEPREMIUMREQUEST": {
        "premium": '',
        "proposerDetails": {
          "addressOne": this.proposer.controls['raddress'].value,
          "addressTwo": this.proposer.controls['raddress2'].value,
          "regCity": this.proposer.controls['rcity'].value,
          "regPinCode": this.proposer.controls['rpincode'].value,
          "contactAddress1": this.proposer.controls['address'].value,
          "contactAddress2": this.proposer.controls['address2'].value,
          "contactCity": this.proposer.controls['city'].value,
          "contactPincode": this.proposer.controls['pincode'].value,
          "dateOfBirth": this.datepipe.transform(this.proposer.controls['dob'].value, 'y-MM-dd'),
          "panNumber": this.proposer.controls['panNumber'].value,
          "aadharNumber": this.proposer.controls['aadharNumber'].value,
          "guardianAge": this.nomineeDetail.controls['guardianAge'].value,
          "guardianName": this.nomineeDetail.controls['guardianName'].value,
          "nomineeAge": this.nomineeDetail.controls['nomineeAge'].value,
          "nomineeName": this.nomineeDetail.controls['nomineeName'].value,
          "occupation": this.proposer.controls['occupation'].value,
          "relationshipWithNominee": this.nomineeDetail.controls['nomineeRelationship'].value,
          "relationshipwithGuardian": this.nomineeDetail.controls['guardianRelationship'].value,
          "sameAdressReg": this.proposer.controls['sameas'].value ? 'Yes' : 'No',
          "strPhoneNo": this.proposer.controls['phoneNumber'].value,
          "strStdCode": this.proposer.controls['stdCode'].value,
          "userName": "michael@xerago.com",
          "strEmail": this.proposer.controls['email'].value,
          "strFirstName": this.proposer.controls['firstname'].value,
          "strLastName": this.proposer.controls['lastname'].value,
          "strMobileNo": this.proposer.controls['mobile'].value,
          "strTitle": this.proposer.controls['title'].value,
        },
        "quoteId": '',
        "vehicleDetails": {
          "accidentCoverForPaidDriver": this.vehical.controls['accidentCoverForPaidDriver'].value,
          "addonValue": this.vehical.controls['addonValue'].value,
          "claimsMadeInPreviousPolicy": this.previousInsure.controls['isPreviousPolicyHolder'].value ,
          "claimsReported": this.previousInsure.controls['claimsReported'].value,
          "claimAmountReceived": this.previousInsure.controls['claimAmountReceived'].value,
          "averageMonthlyMileageRun": this.vehical.controls['averageMonthlyMileageRun'].value,
          "companyNameForCar": this.vehical.controls['companyName'].value,
          "GSTIN": this.vehical.controls['gstIn'].value,
          "cover_dri_othr_car_ass": this.vehical.controls['cover_dri_othr_car_ass'].value ,
          "drivingExperience": this.vehical.controls['drivingExperience'].value,
          "cover_elec_acc": this.vehical.controls['coverelectricalaccesss'].value ? 'Yes' : 'No',
          "type_of_cover":this.packageListFw,
          "policyTerm":this.packagePolicyYear,
          "towingChargesCover": this.vehical.controls['towingCharge'].value ,
          "towingChargesCover_SI": this.vehical.controls['towingChargeSI'].value,
          "original_idv":this.idv,
          "modify_your_idv":this.vehical.controls['coverelectricalaccesss'].value,
          "modified_idv_value":this.idvValues,
          "idv_range": ''?'0':this.vehical.controls['IDV'].value,
          // "valueofelectricalaccessories": "4000",
          "electricalAccessories": {
            "electronicAccessoriesDetails": this.vehical.value.electricalAccess,
          },
          "valueofelectricalaccessories": this.vehical.controls['total'].value == 'err' ? '' : this.vehical.controls['total'].value,
          "cover_non_elec_acc": this.vehical.controls['cover_non_elec_acc'].value ? 'Yes' : 'No',
          "nonElectricalAccesories": {
                "nonelectronicAccessoriesDetails": this.vehical.value.nonelectricalAccess,
            },
          "valueofnonelectricalaccessories": this.vehical.controls['subTotal'].value == 'err' ? '' : this.vehical.controls['subTotal'].value,

          "fibreGlass": this.vehical.controls['fibreGlass'].value ,
          "financierName": this.vehical.controls['financierName'].value,
          // "fuelType": "Petrol",
          "isCarFinanced": this.vehical.controls['isFourWheelerFinanced'].value ? 'Yes' : 'No',
          "isCarFinancedValue": this.vehical.controls['isFourWheelerFinancedValue'].value,
          "isCarOwnershipChanged": this.vehical.controls['isCarOwnershipChanged'].value ,
          "automobileAssociationMembership": this.vehical.controls['automobileAssociationMembership'].value ,
          "isBiFuelKit": this.vehical.controls['isBiFuelKit'].value ,
          // "isPreviousPolicyHolder": "true",
          "legalliabilityToPaidDriver": this.vehical.controls['legalliabilityToPaidDriver'].value ,
          "lossOfBaggage": this.vehical.controls['lossOfBaggage'].value ,
          // "noClaimBonusPercent": "1",
          "personalAccidentCoverForUnnamedPassengers": this.vehical.controls['personalAccidentCoverForUnnamedPassengers'].value,
          // "personalaccidentcoverforunnamedpassengers": "0",
          "policyED":  this.datepipe.transform(this.buyProduct.previous_policy_expiry_date, 'y-MM-dd') ? this.datepipe.transform(this.buyProduct.previous_policy_expiry_date, 'y-MM-dd') : '',
          "policySD": this.datepipe.transform(this.buyProduct.previous_policy_start_date, 'y-MM-dd') ? this.datepipe.transform(this.buyProduct.previous_policy_start_date, 'y-MM-dd') : '',
          "previousInsurerName": this.previousInsure.controls['previousInsured'].value ? this.previousInsure.controls['previousInsured'].value : '',
          // "previousPolicyExpiryDate": this.datepipe.transform(this.buyProduct.previous_policy_expiry_date, 'y-MM-dd')? this.datepipe.transform(this.buyProduct.previous_policy_expiry_date, 'y-MM-dd') : '',
          "previousPolicyType": this.previousInsure.controls['previousPolicyType'].value ? this.previousInsure.controls['previousPolicyType'].value : '',
          "previousinsurersCorrectAddress": this.previousInsure.controls['previousinsurersCorrectAddress'].value ? this.previousInsure.controls['previousinsurersCorrectAddress'].value : '',
          "previuosPolicyNumber": this.previousInsure.controls['policyNumber'].value ? this.previousInsure.controls['policyNumber'].value : '',
          "valueOfLossOfBaggage": this.vehical.controls['valueOfLossOfBaggage'].value,
          "isBiFuelKitYes": this.vehical.controls['isBiFuelKitYes'].value,
          // "vehicleManufacturerName": "Hyundai Motors Ltd.",
          // "vehicleModelCode": "CMH990",
          "vehicleMostlyDrivenOn": this.vehical.controls['vehicleMostlyDrivenOn'].value,
          "vehicleInspectionDate": "28/04/2017 04:00:00",
          // "VIRNumber": "asdasd123asdasd",
          "vehicleRegisteredInTheNameOf": this.vehical.controls['vehicleRegisteredName'].value,
          // "vehicleregDate": "03/08/2015",
          "voluntarydeductible": this.previousInsure.controls['voluntary'].value ? this.previousInsure.controls['voluntary'].value : '',
          "keyreplacement": this.vehical.controls['keyreplacement'].value ,
          "windShieldGlass": this.vehical.controls['windShieldGlass'].value ,
          "depreciationWaiver": this.vehical.controls['depreciationWaiver'].value,
          "engineprotector": this.vehical.controls['engineprotector'].value ,
          "ncbprotector": this.vehical.controls['ncbprotector'].value ,
          "registrationchargesRoadtax":'Off' ,
          "spareCar": this.vehical.controls['spareCar'].value ,
          "spareCarLimit": this.vehical.controls['spareCarLimit'].value ,
          "invoicePrice": this.vehical.controls['invoicePrice'].value ,
          "typeOfCover": this.vehical.controls['typeOfCover'].value ,
          // "yearOfManufacture": "2015"
        }
      }
    };
    console.log(data,'fileeee');
    this.settings.loadingSpinner = true;

    this.fourWheeler.proposalCreationRoyal(data).subscribe(
        (successData) => {
          this.proposalSuccess(successData, stepper);
        },
        (error) => {
          this.proposalFailure(error);
        }
    );
  }

  public proposalSuccess(successData, stepper) {
    this.settings.loadingSpinner = false;
    if (successData.IsSuccess) {
      // stepper.next();
      // this.topScroll();
      // this.toastr.success('Proposal created successfully!!');
      this.summaryData = successData.ResponseObject;
      this.premiumadd =  this.summaryData.premium;
      console.log(this.premiumadd,'pppppremium')
      sessionStorage.summaryData = JSON.stringify(this.summaryData);
      this.PaymentRedirect = this.summaryData.PaymentRedirect;

      this.ProposalId =   this.summaryData.ProposalId;
      this.referenceId =   this.summaryData.ReferenceId;
      this.ComprehensivePremium =   this.summaryData.Comprehensive_premium;
      sessionStorage.royalFourWheelerproposalID = this.ProposalId;
      this.proposerFormData = this.proposer.value;

      this.vehicalFormData = this.vehical.value;
      this.previousFormData = this.previousInsure.value;
      this.nomineeFormData = this.nomineeDetail.value;
      sessionStorage.proposerFormData = JSON.stringify(this.proposerFormData);
      sessionStorage.vehicalFormData = JSON.stringify(this.vehicalFormData);
      sessionStorage.previousFormData = JSON.stringify(this.previousFormData);
      sessionStorage.nomineeFormData = JSON.stringify(this.nomineeFormData);
      this.updateproposal(stepper);

      console.log(this.proposerFormData, 'ppp');
      console.log(this.proposerFormData.city, 'ppp');
      console.log(this.proposerFormData.rcity, 'ppp');
      console.log(this.vehicalFormData,'uuuuu');
      console.log(this.previousFormData,'ooo');
      console.log(this.nomineeFormData,'ooo333');
    } else{
      this.settings.loadingSpinner = false;
      this.toastr.error(successData.ErrorObject);
      this.settings.loadingSpinner = false;


    }
  }
  public proposalFailure(error) {

  }


  updateproposal(stepper) {
    console.log(this.proposer.controls['rcity'].value, 'cityUpdate Propossal');
    console.log(this.proposer.controls['city'].value, 'cityUpdate Propossal');
    const data = {


      "platform": "web",
      "user_id": this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      "role_id": this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      "pos_status": this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      "enquiry_id": this.bikeEnquiryId,
      "created_by": "",
      "proposal_id": sessionStorage.royalFourWheelerproposalID == '' || sessionStorage.royalFourWheelerproposalID == undefined ? '' : sessionStorage.royalFourWheelerproposalID,
      // "company_id": "12",
      "company_id": this.buyProduct.company_id,
      "business_type": this.vehicledetailsfw.business_type,
      "CALCULATEPREMIUMREQUEST": {
        "premium": this.premiumadd,
        "quoteId": this.referenceId,
        "proposerDetails": {
          "strTitle": this.proposer.controls['title'].value,
          "strFirstName": this.proposer.controls['firstname'].value,
          "strLastName": this.proposer.controls['lastname'].value,
          "dateOfBirth": this.datepipe.transform(this.proposer.controls['dob'].value, 'y-MM-dd'),
          "strEmail": this.proposer.controls['email'].value,
          "strMobileNo": this.proposer.controls['mobile'].value,
          "occupation": this.proposer.controls['occupation'].value,
          "nomineeName": this.nomineeDetail.controls['nomineeName'].value,
          "nomineeAge": this.nomineeDetail.controls['nomineeAge'].value,
          "relationshipWithNominee": this.nomineeDetail.controls['nomineeRelationship'].value,
          "guardianName":this.nomineeDetail.controls['guardianName'].value,
          "guardianAge": this.nomineeDetail.controls['guardianAge'].value,
          "relationshipwithGuardian": this.nomineeDetail.controls['guardianRelationship'].value,
          "addressOne": this.proposer.controls['raddress'].value,
          "addressTwo": this.proposer.controls['raddress2'].value,
          "regCity": this.proposer.controls['rcity'].value,
          "regPinCode":this.proposer.controls['rpincode'].value,
          "sameAdressReg": this.proposer.controls['sameas'].value ? 'Yes' : 'No',
          "contactAddress1": this.proposer.controls['address'].value,
          "contactAddress2": this.proposer.controls['address2'].value,
          "contactCity": this.proposer.controls['city'].value,
          "contactPincode": this.proposer.controls['pincode'].value,
          "panNumber":  this.proposer.controls['panNumber'].value,
          "aadharNumber":  this.proposer.controls['aadharNumber'].value,
          "strPhoneNo": this.proposer.controls['phoneNumber'].value,
          "strStdCode": this.proposer.controls['stdCode'].value,
        },
        "vehicleDetails": {
          "idv": this.buyProduct.Idv,
          "policyED":  this.datepipe.transform(this.buyProduct.previous_policy_expiry_date, 'y-MM-dd'),
          "policySD": this.datepipe.transform(this.buyProduct.previous_policy_start_date, 'y-MM-dd'),
          // "carRegisteredCity": "MUMBAI",
          "isCarOwnershipChanged": this.vehical.controls['isCarOwnershipChanged'].value,
          "automobileAssociationMembership": this.vehical.controls['automobileAssociationMembership'].value,
          "isBiFuelKit": this.vehical.controls['isBiFuelKit'].value,
          "isCarFinanced": this.vehical.controls['isFourWheelerFinanced'].value ? 'Yes' : 'No',
          "financierName": this.vehical.controls['financierName'].value,
          "isCarFinancedValue": this.vehical.controls['isFourWheelerFinancedValue'].value,
          "vehicleRegisteredInTheNameOf": this.vehical.controls['vehicleRegisteredName'].value,
          "companyNameForCar":this.vehical.controls['companyName'].value,
          "GSTIN": this.vehical.controls['gstIn'].value,
          "vehicleMostlyDrivenOn": this.vehical.controls['vehicleMostlyDrivenOn'].value,
          "drivingExperience": this.vehical.controls['drivingExperience'].value,
          "cover_elec_acc": this.vehical.controls['coverelectricalaccesss'].value ? 'Yes' : 'No',
          "towingChargesCover": this.vehical.controls['towingCharge'].value ,
          "towingChargesCover_SI": this.vehical.controls['towingChargeSI'].value,
          "voluntarydeductible": this.previousInsure.controls['voluntary'].value ? this.previousInsure.controls['voluntary'].value : '',
          "previousPolicyType": this.previousInsure.controls['previousPolicyType'].value ? this.previousInsure.controls['previousPolicyType'].value: '',
          "previuosPolicyNumber": this.previousInsure.controls['policyNumber'].value? this.previousInsure.controls['policyNumber'].value: '',
          "previousInsurerName": this.previousInsure.controls['previousInsured'].value ? this.previousInsure.controls['previousInsured'].value : '',
          "previousinsurersCorrectAddress": this.previousInsure.controls['previousinsurersCorrectAddress'].value? this.previousInsure.controls['previousinsurersCorrectAddress'].value: '',
          "averageMonthlyMileageRun": this.vehical.controls['averageMonthlyMileageRun'].value,
          "personalAccidentCoverForUnnamedPassengers":this.vehical.controls['personalAccidentCoverForUnnamedPassengers'].value,
          "claimsMadeInPreviousPolicy": this.previousInsure.controls['isPreviousPolicyHolder'].value ,
          "claimsReported": this.previousInsure.controls['claimsReported'].value,
          "claimAmountReceived": this.previousInsure.controls['claimAmountReceived'].value,
          "accidentCoverForPaidDriver": this.vehical.controls['accidentCoverForPaidDriver'].value,
          "valueOfLossOfBaggage":this.vehical.controls['valueOfLossOfBaggage'].value,
          "isBiFuelKitYes":this.vehical.controls['isBiFuelKitYes'].value,
          "legalliabilityToPaidDriver":this.vehical.controls['legalliabilityToPaidDriver'].value ,
          "type_of_cover":this.packageListFw,
          "policyTerm":this.packagePolicyYear,
          "lossOfBaggage":this.vehical.controls['lossOfBaggage'].value ,
          "original_idv":this.idv,
          "modify_your_idv":this.vehical.controls['coverelectricalaccesss'].value,
          "modified_idv_value":this.idvValues,
          "idv_range": ''?'0':this.vehical.controls['IDV'].value,
          "electricalAccessories": {
            "electronicAccessoriesDetails": this.vehical.value.electricalAccess,
          },
          "valueofelectricalaccessories": this.vehical.controls['total'].value == 'err' ? '' : this.vehical.controls['total'].value,
            "cover_non_elec_acc": this.vehical.controls['cover_non_elec_acc'].value ? 'Yes' : 'No',
            "nonElectricalAccesories": {
                "nonelectronicAccessoriesDetails": this.vehical.value.nonelectricalAccess,
            },
          "valueofnonelectricalaccessories": this.vehical.controls['subTotal'].value == 'err' ? '' : this.vehical.controls['subTotal'].value,
          "addonValue": this.vehical.controls['addonValue'].value,
          "typeOfCover": this.vehical.controls['typeOfCover'].value,
            "keyreplacement": this.vehical.controls['keyreplacement'].value ,
            "windShieldGlass": this.vehical.controls['windShieldGlass'].value ,
            "depreciationWaiver": this.vehical.controls['depreciationWaiver'].value ,
            "engineprotector": this.vehical.controls['engineprotector'].value ,
            "ncbprotector": this.vehical.controls['ncbprotector'].value ,
            // "registrationchargesRoadtax": this.vehical.controls['registrationchargesRoadtax'].value ,
            "spareCar": this.vehical.controls['spareCar'].value ,
            "spareCarLimit": this.vehical.controls['spareCarLimit'].value ,
            "invoicePrice": this.vehical.controls['invoicePrice'].value ,
        }
      }
    }

    console.log(data,' fileeee');
    this.settings.loadingSpinner = true;

    this.fourWheeler.updateproposalCreationRoyal(data).subscribe(
        (successData) => {
          this.updateproposalSuccess(successData, stepper);
        },
        (error) => {
          this.updateproposalFailure(error);
        }
    );
  }

  public updateproposalSuccess(successData, stepper) {
    this.settings.loadingSpinner = false;
    if (successData.IsSuccess) {
      stepper.next();
      this.toastr.success('Proposal created successfully!!');
      this.summaryData1 = successData.ResponseObject;
      sessionStorage.summaryData1 = JSON.stringify(this.summaryData1);
      this.AgentId =  this.summaryData1.AgentId;
      this.Apikey =  this.summaryData1.Apikey;
      this.PaymentRedirect =  this.summaryData1.PaymentRedirect;
      this.PaymentReturn =  this.summaryData1.PaymentReturn;
      this.ElcValue =  this.summaryData1.ElcValue;
      this.NonElcValue =  this.summaryData1.NonElcValue;
      this.VehicleSubLine =  this.summaryData1.VehicleSubLine;
      this.VersionNo =  this.summaryData1.VersionNo;
      this.Comprehensivepremium =  this.summaryData1.Comprehensive_premium;
      this.proposerFormData = this.proposer.value;


    } else {
      console.log(successData.ErrorObject);
      this.toastr.error(successData.ErrorObject);
      this.settings.loadingSpinner = false;


    }
  }
  public updateproposalFailure(error) {

  }
  policyType() {

  }
// session Data
  sessionData() {
    if (sessionStorage.stepper1 != '' && sessionStorage.stepper1 != undefined) {
      let stepper1 = JSON.parse(sessionStorage.stepper1);
      this.proposer = this.fb.group({
        title: stepper1.title,
        firstname: stepper1.firstname,
        lastname: stepper1.lastname,
        dob :  this.datepipe.transform(stepper1.dob, 'y-MM-dd'),
        email: stepper1.email,
        mobile: '',
        otp: '',
        pincode: stepper1.pincode,
        gender : stepper1.gender,
        phoneNumber: stepper1.phoneNumber,
        occupation: stepper1.occupation,
        stdCode: stepper1.stdCode,
        address: stepper1.address,
        address2: stepper1.address2,
        aadharNumber: stepper1.aadharNumber,
        panNumber: stepper1.panNumber,
        state: stepper1.state,
        stateName: stepper1.stateName,
        city: stepper1.city,
        cityName: stepper1.cityName,
        raddress: stepper1.raddress,
        raddress2: stepper1.raddress2,
        rpincode: stepper1.rpincode,
        rstate: stepper1.rstate,
        rstateName: stepper1.rstateName,
        rcity: stepper1.rcity,
        rcityName: stepper1.rcityName,
        sameas: stepper1.sameas,
      });
    }
    console.log(this.proposer, 'stepper1');

    if (sessionStorage.stepper2 != '' && sessionStorage.stepper2 != undefined) {
      this.getStepper2 = JSON.parse(sessionStorage.stepper2);

      this.vehical.controls['coverelectricalaccesss'].patchValue(this.getStepper2.coverelectricalaccesss);
      console.log(this.getStepper2.electricalAccess, ' getst2');

      for (let i=0; i < this.getStepper2.electricalAccess.length; i++) {
        if ( i !=  0) {
          this.addItems();
        }
        this.vehical['controls'].electricalAccess['controls'][i]['controls'].nameOfElectronicAccessories.patchValue(this.getStepper2.electricalAccess[i].nameOfElectronicAccessories);
        this.vehical['controls'].electricalAccess['controls'][i]['controls'].makeModel.patchValue(this.getStepper2.electricalAccess[i].makeModel);
        this.vehical['controls'].electricalAccess['controls'][i]['controls'].elecValue.patchValue(this.getStepper2.electricalAccess[i].elecValue);
      }

      this.vehical.controls['cover_non_elec_acc'].patchValue(this.getStepper2.cover_non_elec_acc);
      console.log(this.getStepper2.nonelectricalAccess, ' cover_non_elec_acc');

      for (let i=0; i < this.getStepper2.nonelectricalAccess.length; i++) {
        if ( i !=  0) {
          this.addnonEelctricalItems();
        }
        this.vehical['controls'].nonelectricalAccess['controls'][i]['controls'].nameOfElectronicAccessories.patchValue(this.getStepper2.nonelectricalAccess[i].nameOfElectronicAccessories);
        this.vehical['controls'].nonelectricalAccess['controls'][i]['controls'].makeModel.patchValue(this.getStepper2.nonelectricalAccess[i].makeModel);
        this.vehical['controls'].nonelectricalAccess['controls'][i]['controls'].elecValue.patchValue(this.getStepper2.nonelectricalAccess[i].elecValue);
      }


      // for (let i=0; i < this.getStepper2.nonelectricalAccess.length; i++) {
      //   this.vehical['controls'].nonelectricalAccess['controls'][i]['controls'].nameOfElectronicAccessories.patchValue(this.getStepper2.nonelectricalAccess[i].nameOfElectronicAccessories);
      //   this.vehical['controls'].nonelectricalAccess['controls'][i]['controls'].makeModel.patchValue(this.getStepper2.nonelectricalAccess[i].makeModel);
      //   this.vehical['controls'].nonelectricalAccess['controls'][i]['controls'].elecValue.patchValue(this.getStepper2.nonelectricalAccess[i].elecValue);
      // }
      // vehical = this.fb.group({
      this.vehical.controls['vehicleMostlyDrivenOn'].patchValue(this.getStepper2.vehicleMostlyDrivenOn);
      this.vehical.controls['vehicleRegisteredName'].patchValue(this.getStepper2.vehicleRegisteredName);
      this.vehical.controls['drivingExperience'].patchValue(this.getStepper2.drivingExperience);
      this.vehical.controls['averageMonthlyMileageRun'].patchValue(this.getStepper2.averageMonthlyMileageRun);
      this.vehical.controls['accidentCoverForPaidDriver'].patchValue(this.getStepper2.accidentCoverForPaidDriver);
      this.vehical.controls['companyName'].patchValue(this.getStepper2.companyName);
      this.vehical.controls['gstIn'].patchValue(this.getStepper2.gstIn);
      // this.vehical.controls['idv'].patchValue(this.getStepper2.idv);
      this.vehical.controls['isFourWheelerFinancedValue'].patchValue(this.getStepper2.isFourWheelerFinancedValue);
      this.vehical.controls['valueOfLossOfBaggage'].patchValue(this.getStepper2.valueOfLossOfBaggage);
      this.vehical.controls['isBiFuelKitYes'].patchValue(this.getStepper2.isBiFuelKitYes);
      this.vehical.controls['personalAccidentCoverForUnnamedPassengers'].patchValue(this.getStepper2.personalAccidentCoverForUnnamedPassengers);
      this.vehical.controls['financierName'].patchValue(this.getStepper2.financierName);
      this.vehical.controls['addonValue'].patchValue(this.getStepper2.addonValue);
      this.vehical.controls['isFourWheelerFinanced'].patchValue(this.getStepper2.isFourWheelerFinanced);
      // this.vehical.controls['coverdriverpremium'].patchValue(this.getStepper2.coverdriverpremium);
      this.vehical.controls['keyreplacementpremium'].patchValue(this.getStepper2.keyreplacementpremium);
      this.vehical.controls['depreciationWaiverpremium'].patchValue(this.getStepper2.depreciationWaiverpremium);
      this.vehical.controls['windShieldGlasspremium'].patchValue(this.getStepper2.windShieldGlasspremium);
      this.vehical.controls['engineprotectorpremium'].patchValue(this.getStepper2.engineprotectorpremium);
      // this.vehical.controls['registrationchargesRoadtaxpremium'].patchValue(this.getStepper2.registrationchargesRoadtaxpremium);
      this.vehical.controls['ncbprotectorpremium'].patchValue(this.getStepper2.ncbprotectorpremium);
      this.vehical.controls['invoicePricepremium'].patchValue(this.getStepper2.invoicePricepremium);
      this.vehical.controls['automobileAssociationMembershippremium'].patchValue(this.getStepper2.automobileAssociationMembershippremium);
      this.vehical.controls['amountLossOfBaggage'].patchValue(this.getStepper2.amountLossOfBaggage);
      this.vehical.controls['amountElectricalaccesss'].patchValue(this.getStepper2.amountElectricalaccesss);
      this.vehical.controls['amountNonElectricalaccesss'].patchValue(this.getStepper2.amountNonElectricalaccesss);
      // this.vehical.controls['isAddon'].patchValue(this.getStepper2.isAddon);
      this.vehical.controls['lossOfBaggage'].patchValue(this.getStepper2.lossOfBaggage);
      this.vehical.controls['amountLossOfBaggage'].patchValue(this.getStepper2.amountLossOfBaggage);
      this.vehical.controls['towingCharge'].patchValue(this.getStepper2.towingCharge);
      this.vehical.controls['towingChargeSI'].patchValue(this.getStepper2.towingChargeSI);
      this.vehical.controls['amountTowingCharge'].patchValue(this.getStepper2.amountTowingCharge);
      // this.vehical.controls['hypothecationType'].patchValue(this.getStepper2.hypothecationType);
      this.vehical.controls['typeOfCover'].patchValue(this.getStepper2.typeOfCover);
      this.vehical.controls['vechileOwnerShipChanged'].patchValue(this.getStepper2.vechileOwnerShipChanged);
      this.vehical.controls['cover_dri_othr_car_ass'].patchValue(this.getStepper2.cover_dri_othr_car_ass);
      // this.vehical.controls['addon'].patchValue(this.getStepper2.addon);
      this.vehical.controls['fibreGlass'].patchValue(this.getStepper2.fibreGlass);
      this.vehical.controls['windShieldGlass'].patchValue(this.getStepper2.windShieldGlass);
      this.vehical.controls['keyreplacement'].patchValue(this.getStepper2.keyreplacement);
      this.vehical.controls['depreciationWaiver'].patchValue(this.getStepper2.depreciationWaiver);
      this.vehical.controls['engineprotector'].patchValue(this.getStepper2.engineprotector);
      this.vehical.controls['ncbprotector'].patchValue(this.getStepper2.ncbprotector);
      this.vehical.controls['IDV'].patchValue(this.getStepper2.IDV);
      // this.vehical.controls['registrationchargesRoadtax'].patchValue(this.getStepper2.registrationchargesRoadtax);
      this.vehical.controls['spareCar'].patchValue(this.getStepper2.spareCar);
      this.vehical.controls['spareCarLimit'].patchValue(this.getStepper2.spareCarLimit);
      this.vehical.controls['invoicePrice'].patchValue(this.getStepper2.invoicePrice);
      this.vehical.controls['isCarOwnershipChanged'].patchValue(this.getStepper2.isCarOwnershipChanged);
      this.vehical.controls['automobileAssociationMembership'].patchValue(this.getStepper2.automobileAssociationMembership);
      this.vehical.controls['isBiFuelKit'].patchValue(this.getStepper2.isBiFuelKit);
      this.vehical.controls['legalliabilityToPaidDriver'].patchValue(this.getStepper2.legalliabilityToPaidDriver);
      this.vehical.controls['toEmployee'].patchValue(this.getStepper2.toEmployee);
      this.vehical.controls['employeepremium'].patchValue(this.getStepper2.employeepremium);
      this.vehical.controls['total'].patchValue(this.getStepper2.total);
      this.vehical.controls['subTotal'].patchValue(this.getStepper2.subTotal);

      console.log(this.vehical,'vehical');
    }

    console.log(this.vehical, ' stepper2 ');

    if (sessionStorage.stepper3 != '' && sessionStorage.stepper3 != undefined) {
      let stepper3 = JSON.parse(sessionStorage.stepper3);
      this.previousInsure = this.fb.group({
        policyNumber: stepper3.policyNumber,
        previousinsurersCorrectAddress: stepper3.previousinsurersCorrectAddress,
        previousInsured: stepper3.previousInsured,
        previousdob: stepper3.previousdob,
        isPreviousPolicyHolder: stepper3.isPreviousPolicyHolder,
        voluntary: stepper3.voluntary,
        claimAmountReceived: stepper3.claimAmountReceived,
        claimsReported: stepper3.claimsReported,
        previousPolicyType: stepper3.previousPolicyType,
        personalAccidentCover: stepper3.personalAccidentCover,
        accidentPaid: stepper3.accidentPaid,
      });
    }
    console.log(this.previousInsure, ' stepper3 ');

    if (sessionStorage.stepper4 != '' && sessionStorage.stepper4 != undefined) {
      let stepper4 = JSON.parse(sessionStorage.stepper4);
      if (stepper4.nomineeAge <= 17) {
        this.guardianList = true;
      }
      this.nomineeDetail = this.fb.group({
        nomineeName: stepper4.nomineeName,
        nomineeAge: stepper4.nomineeAge,
        nomineeRelationship: stepper4.nomineeRelationship,
        guardianName: stepper4.guardianName,
        guardianAge: stepper4.guardianAge,
        guardianRelationship: stepper4.guardianRelationship,

      });
    }
    console.log(this.nomineeDetail, ' stepper4 ');


  }
  communicateCity() {
    this.proposer.controls['cityName'].patchValue(this.cityCommList[this.proposer.controls['city'].value]);
    console.log(this.proposer.controls['city'].value, 'citypatch')

  }
  registrationCity() {
    this.proposer.controls['rcityName'].patchValue(this.rescityList[this.proposer.controls['rcity'].value]);
    console.log(this.proposer.controls['rcity'].value, 'rcitypatch')


  }
  // carAccessories(){
  //   if (this.vehical.controls['cover_dri_othr_car_ass'].value=='Yes') {
  //     this.vehical.controls['coverdriverpremium'].setValidators([Validators.required]);
  //     this.coverPremium();
  //   }else{
  //     this.vehical.controls['coverdriverpremium'].patchValue('');
  //     this.vehical.controls['coverdriverpremium'].setValidators(null);
  //   }
  //   this.vehical.controls['coverdriverpremium'].updateValueAndValidity();
  //
  // }

  // coverdriverpremiumchange(){
  //   this.vehical.controls['coverdriverpremium'].patchValue(this.LIABILITY_PA_COVER_TO_PAID_DRIVER);
  // }

  // keyreplacementpremium(){
  //
  //   if (this.vehical.controls['keyreplacement'].value=='On') {
  //     this.vehical.controls['keyreplacementpremium'].setValidators([Validators.required]);
  //     this.coverPremium();
  //   }else{
  //     this.vehical.controls['keyreplacementpremium'].patchValue('');
  //     this.vehical.controls['keyreplacementpremium'].setValidators(null);
  //   }
  //   this.vehical.controls['keyreplacementpremium'].updateValueAndValidity();
  // }
  //
  // patchkeyreplacementpremium(){
  //   this.vehical.controls['keyreplacementpremium'].patchValue(this.KEY_REPLACEMENT);
  //
  // }

  // depreciationpremium(){
  //   if (this.vehical.controls['depreciationWaiver'].value=='On') {
  //     this.coverPremium();
  //     this.vehical.controls['depreciationWaiverpremium'].setValidators([Validators.required]);
  //   }else{
  //     this.vehical.controls['depreciationWaiverpremium'].patchValue('');
  //     this.vehical.controls['depreciationWaiverpremium'].setValidators(null);
  //   }
  //   this.vehical.controls['depreciationWaiverpremium'].updateValueAndValidity();
  //
  // }
  //
  // patchdepreciationpremium(){
  //   this.vehical.controls['depreciationWaiverpremium'].patchValue(this.DEPRECIATION_WAIVER);
  // }
  // windShieldGlasspremi(){
  //   if (this.vehical.controls['windShieldGlass'].value=='On') {
  //     this.coverPremium();
  //     this.vehical.controls['windShieldGlasspremium'].setValidators([Validators.required]);
  //   }else{
  //     this.vehical.controls['windShieldGlasspremium'].patchValue('');
  //     // this.vehical.controls['windShieldGlasspremium'].setValidators(null);
  //     this.vehical.controls['windShieldGlasspremium'].setValidators([]);
  //   }
  //   this.vehical.controls['windShieldGlasspremium'].updateValueAndValidity();
  // }
  //
  // windShieldGlasspremipatch(){
  //   this.vehical.controls['windShieldGlasspremium'].patchValue(this.WIND_SHIELD_GLASS);
  // }

  // changeengineprotector(){
  //   if (this.vehical.controls['engineprotector'].value=='On') {
  //     this.coverPremium();
  //     this.vehical.controls['engineprotectorpremium'].setValidators([Validators.required]);
  //   }else{
  //     this.vehical.controls['engineprotectorpremium'].patchValue('');
  //     this.vehical.controls['engineprotectorpremium'].setValidators([]);
  //     // this.vehical.controls['engineprotectorpremium'].setValidators(null);
  //   }
  //   this.vehical.controls['engineprotectorpremium'].updateValueAndValidity();
  // }
  //
  // changeengineprotectorpremium(){
  //   this.vehical.controls['engineprotectorpremium'].patchValue(this.ENGINE_PROTECTOR);
  // }

  // changeregistrationchargesRoadtax(){
  //   if (this.vehical.controls['registrationchargesRoadtax'].value=='On') {
  //     this.coverPremium();
  //     this.vehical.controls['registrationchargesRoadtaxpremium'].setValidators([Validators.required]);
  //   }else{
  //     this.vehical.controls['registrationchargesRoadtaxpremium'].patchValue('');
  //     // this.vehical.controls['registrationchargesRoadtaxpremium'].setValidators(null);
  //     this.vehical.controls['registrationchargesRoadtaxpremium'].setValidators([]);
  //   }
  //   this.vehical.controls['registrationchargesRoadtaxpremium'].updateValueAndValidity();
  //
  // }

  // changeregistrationchargesRoadtaxpremium(){
  //   this.vehical.controls['registrationchargesRoadtaxpremium'].patchValue(this.LIFE_TIME_ROAD_TAX);
  // }

  // ncbprotecorchange(){
  //   if (this.vehical.controls['ncbprotector'].value=='On') {
  //     this.coverPremium();
  //     this.vehical.controls['ncbprotectorpremium'].setValidators([Validators.required]);
  //   }else{
  //     this.vehical.controls['ncbprotectorpremium'].patchValue('');
  //     this.vehical.controls['ncbprotectorpremium'].setValidators(null);
  //   }
  //   this.vehical.controls['ncbprotectorpremium'].updateValueAndValidity();
  // }
  //
  // ncbprotecorchangepremium(){
  //   this.vehical.controls['ncbprotectorpremium'].patchValue(this.NCB_PROTECTOR);
  // }

  // invoicePriceChange(){
  //   if (this.vehical.controls['invoicePrice'].value=='On') {
  //     this.coverPremium();
  //     this.vehical.controls['invoicePricepremium'].setValidators([Validators.required]);
  //   }else{
  //     this.vehical.controls['invoicePricepremium'].patchValue('');
  //     this.vehical.controls['invoicePricepremium'].setValidators(null);
  //   }
  //   this.vehical.controls['invoicePricepremium'].updateValueAndValidity();
  // }
  // invoicePriceChangepremium(){
  //   this.vehical.controls['invoicePricepremium'].patchValue(this.INVOICE_PRICE_INSURANCE);
  // }

  // automobilepremium(){
  //   if (this.vehical.controls['automobileAssociationMembership'].value=='Yes') {
  //     this.coverPremium();
  //     this.vehical.controls['automobileAssociationMembershippremium'].setValidators([Validators.required]);
  //   }else{
  //     this.vehical.controls['automobileAssociationMembershippremium'].patchValue('');
  //     this.vehical.controls['automobileAssociationMembershippremium'].setValidators(null);
  //   }
  //   this.vehical.controls['automobileAssociationMembershippremium'].updateValueAndValidity();
  // }
  //
  // automobilepremiumchangepremium(){
  //   this.vehical.controls['automobileAssociationMembershippremium'].patchValue(this.AUTOMOBILE_ASSOCIATION_DISCOUNT);
  // }

  // legalliabilityToPaidDriverchange(){
  //   if (this.vehical.controls['legalliabilityToPaidDriver'].value=='Yes') {
  //     this.coverPremium();
  //     this.vehical.controls['legalliabilityToPaidDriverpremium'].setValidators([Validators.required]);
  //   }else{
  //     this.vehical.controls['legalliabilityToPaidDriverpremium'].patchValue('');
  //     this.vehical.controls['legalliabilityToPaidDriverpremium'].setValidators(null);
  //   }
  //   this.vehical.controls['legalliabilityToPaidDriverpremium'].updateValueAndValidity();
  // }
  //
  // legalliabilityToPaidDriverchangepremium(){
  //   this.vehical.controls['legalliabilityToPaidDriverpremium'].patchValue(this.LIABILITY_TO_PAID_DRIVERS);
  // }

  // employeechanges(){
  //   if (this.vehical.controls['toEmployee'].value=='Yes') {
  //     this.coverPremium();
  //     this.vehical.controls['employeepremium'].setValidators([Validators.required]);
  //   }else{
  //     this.vehical.controls['employeepremium'].patchValue('');
  //     this.vehical.controls['employeepremium'].setValidators(null);
  //   }
  //   this.vehical.controls['employeepremium'].updateValueAndValidity();
  // }
  //
  // employeechangepremium(){
  //   this.vehical.controls['employeepremium'].patchValue(this.TO_EMPLOYEE);
  // }

  // fibreGlassfittedchange(){
  //   if (this.vehical.controls['fibreGlass'].value=='Yes') {
  //     this.coverPremium();
  //     this.vehical.controls['fibreGlasspremium'].setValidators([Validators.required]);
  //   }else{
  //     this.vehical.controls['fibreGlasspremium'].patchValue('');
  //     this.vehical.controls['fibreGlasspremium'].setValidators(null);
  //   }
  //   this.vehical.controls['fibreGlasspremium'].updateValueAndValidity();
  // }
  //
  // fibreGlasspremiumchangepremium(){
  //   this.vehical.controls['fibreGlasspremium'].patchValue(this.FIBER_GLASS_TANK);
  // }



}

@Component({
  selector: 'rsfourwheelercover',
  template:`
      <div class="container">
        <h5>Addon Cover Premium</h5>
        <div class="row" >
        <div class="col-md-12"  *ngIf="this.KEY_REPLACEMENT!=''&& this.KEY_REPLACEMENT!=undefined">
          <p ><span style="margin-left: 35px"> Key Replacement :</span><span style="margin-left: 261px">{{this.KEY_REPLACEMENT}} </span> </p>
        </div> 
          <div class="col-md-12"  *ngIf="this.DEPRECIATION_WAIVER!=''&& this.DEPRECIATION_WAIVER!=undefined">
          <p ><span style="margin-left: 35px"> Depreciation Waiver :</span><span style="margin-left: 244px">{{this.DEPRECIATION_WAIVER}} </span> </p>
        </div> 
          <div class="col-md-12"  *ngIf="this.WIND_SHIELD_GLASS!=''&& this.WIND_SHIELD_GLASS!=undefined">
          <p ><span style="margin-left: 35px"> Wind Shield Glass :</span><span style="margin-left: 256px">{{this.WIND_SHIELD_GLASS}} </span> </p>
        </div>
            <div class="col-md-12"  *ngIf="this.ENGINE_PROTECTOR!=''&& this.ENGINE_PROTECTOR!=undefined">
          <p ><span style="margin-left: 35px">Engine Protector :</span><span style="margin-left: 263px">{{this.ENGINE_PROTECTOR}} </span> </p>
        </div> 
            <div class="col-md-12"  *ngIf="this.NCB_PROTECTOR!=''&& this.NCB_PROTECTOR!=undefined">
          <p ><span style="margin-left: 35px">NCB protector :</span><span style="margin-left: 277px">{{this.NCB_PROTECTOR}} </span> </p>
        </div>
            <div class="col-md-12"  *ngIf="this.INVOICE_PRICE_INSURANCE!=''&& this.INVOICE_PRICE_INSURANCE!=undefined">
          <p ><span style="margin-left: 35px">Full Invoice Price Insurance Covers :</span><span style="margin-left: 150px">{{this.INVOICE_PRICE_INSURANCE}} </span> </p>
        </div> 
            <div class="col-md-12"  *ngIf="this.AUTOMOBILE_ASSOCIATION_DISCOUNT!=''&& this.AUTOMOBILE_ASSOCIATION_DISCOUNT!=undefined">
          <p ><span style="margin-left: 35px">Automobile Association Membership :</span><span style="margin-left: 137px">{{this.AUTOMOBILE_ASSOCIATION_DISCOUNT}} </span> </p>
        </div>
            <div class="col-md-12"  *ngIf="this.LOSS_OF_BAGGAGE!=''&& this.LOSS_OF_BAGGAGE!=undefined">
          <p ><span style="margin-left: 35px">Loss Of Baggages :</span><span style="margin-left: 254px">{{this.LOSS_OF_BAGGAGE}} </span> </p>
        </div> 
            <div class="col-md-12"  *ngIf="this.BI_FUEL_KIT!=''&& this.BI_FUEL_KIT!=undefined">
          <p ><span style="margin-left: 35px">Is BiFuel Kit :</span><span style="margin-left: 294px">{{this.BI_FUEL_KIT}} </span> </p>
        </div> 
            <div class="col-md-12"  *ngIf="this.LIABILITY_TO_PAID_DRIVERS!=''&& this.LIABILITY_TO_PAID_DRIVERS!=undefined">
          <p ><span style="margin-left: 35px">Legal Liability To Paid Driver :</span><span style="margin-left: 191px">{{this.LIABILITY_TO_PAID_DRIVERS}} </span> </p>
        </div>
         <div class="col-md-12"  *ngIf="this.TO_EMPLOYEE!=''&& this.TO_EMPLOYEE!=undefined">
          <p ><span style="margin-left: 35px">To Employee :</span><span style="margin-left: 285px">{{this.TO_EMPLOYEE}} </span> </p>
        </div>
            <div class="col-md-12"  *ngIf="this.TOWING_CHARGE!=''&& this.TOWING_CHARGE!=undefined">
          <p ><span style="margin-left: 35px">Towing Charges:</span><span style="margin-left: 267px">{{this.TOWING_CHARGE}} </span> </p>
        </div>
        <div class="col-md-12"  *ngIf="this.FIBER_GLASS_TANK!=''&& this.FIBER_GLASS_TANK!=undefined">
          <p ><span style="margin-left: 35px">Vehicle Fitted With Fibre Glass Petrol Tank:</span><span style="margin-left: 107px">{{this.FIBER_GLASS_TANK}} </span> </p>
        </div> 
            <div class="col-md-12"  *ngIf="this.ELECTRICAL_ACCESSORIES!=''&& this.ELECTRICAL_ACCESSORIES!=undefined">
          <p ><span style="margin-left: 35px">Cover Electrical Accessories:</span><span style="margin-left: 194px">{{this.ELECTRICAL_ACCESSORIES}} </span> </p>
        </div>
         <div class="col-md-12"  *ngIf="this.NON_ELECTRICAL_ACCESSORIES!=''&& this.NON_ELECTRICAL_ACCESSORIES!=undefined">
          <p ><span style="margin-left: 35px">Cover Non Electrical Accessories:</span><span style="margin-left: 165px">{{this.NON_ELECTRICAL_ACCESSORIES}} </span> </p>
        </div>
          <div mat-dialog-actions style="justify-content: center">
            <button mat-raised-button style="background-color: darkblue; color: white;" (click)="cancel()">Cancel</button>
            <button mat-raised-button style="background-color: darkblue; color: white;" (click)="submit()">Ok</button>

          </div>
          <!--<div mat-dialog-actions style="justify-content: center">-->
            <!--<button mat-raised-button style="background-color: darkblue; color: white;" (click)="cancel()">Cancel</button>-->
            <!--<button mat-raised-button style="background-color: darkblue; color: white;" (click)="submit()">Ok</button>-->

          <!--</div>-->
        
        
        
        
      </div>
        
      </div>
      
  `
})

export class rsfourwheelercover {
    NON_ELECTRICAL_ACCESSORIES:any;
    KEY_REPLACEMENT:any;
    DEPRECIATION_WAIVER:any;
    WIND_SHIELD_GLASS:any;
    ENGINE_PROTECTOR:any;
    NCB_PROTECTOR:any;
    INVOICE_PRICE_INSURANCE:any;
    AUTOMOBILE_ASSOCIATION_DISCOUNT:any;
    LOSS_OF_BAGGAGE:any;
    BI_FUEL_KIT:any;
    LIABILITY_TO_PAID_DRIVERS:any;
    TO_EMPLOYEE:any;
    TOWING_CHARGE:any;
    FIBER_GLASS_TANK:any;
    ELECTRICAL_ACCESSORIES:any;

  constructor(
      public dialogRef: MatDialogRef<rsfourwheelercover>,
      @Inject(MAT_DIALOG_DATA) public data: any, public route: ActivatedRoute,  public common: CommonService, public validation: ValidationService, public appSettings: AppSettings, private toastr: ToastrService, public config: ConfigurationService, public authservice: AuthService, public fwService: FourWheelerService) {
      this.KEY_REPLACEMENT=sessionStorage.KEY_REPLACEMENT;
      console.log(this.KEY_REPLACEMENT,'this.KEY_REPLACEMENT')
      this.DEPRECIATION_WAIVER=sessionStorage.DEPRECIATION_WAIVER;
      this.WIND_SHIELD_GLASS=sessionStorage.WIND_SHIELD_GLASS;
      this.ENGINE_PROTECTOR=sessionStorage.ENGINE_PROTECTOR;
      this.NCB_PROTECTOR=sessionStorage.NCB_PROTECTOR;
      this.INVOICE_PRICE_INSURANCE=sessionStorage.INVOICE_PRICE_INSURANCE;
      this.AUTOMOBILE_ASSOCIATION_DISCOUNT=sessionStorage.AUTOMOBILE_ASSOCIATION_DISCOUNT;
      this.LOSS_OF_BAGGAGE=sessionStorage.LOSS_OF_BAGGAGE;
      this.BI_FUEL_KIT=sessionStorage.BI_FUEL_KIT;
      this.LIABILITY_TO_PAID_DRIVERS=sessionStorage.LIABILITY_TO_PAID_DRIVERS;
      this.TO_EMPLOYEE=sessionStorage.TO_EMPLOYEE;
      this.TOWING_CHARGE=sessionStorage.TOWING_CHARGE;
      this.FIBER_GLASS_TANK=sessionStorage.FIBER_GLASS_TANK;
      this.NON_ELECTRICAL_ACCESSORIES=sessionStorage.NON_ELECTRICAL_ACCESSORIES;
      this.ELECTRICAL_ACCESSORIES=sessionStorage.ELECTRICAL_ACCESSORIES;



  }

  submit(): void {
    this.dialogRef.close(true);
  }
  cancel(): void {
    this.dialogRef.close(false);
  }



}
