import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Settings} from '../../app.settings.model';
import {ValidationService} from '../../shared/services/validation.service';
import {ActivatedRoute} from '@angular/router';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {DatePipe} from '@angular/common';
import {AuthService} from '../../shared/services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {AppSettings} from '../../app.settings';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatStepper} from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {FourWheelerService} from '../../shared/services/four-wheeler.service';
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
// export interface DialogData {
//   name: string;
//   question1:string;
//   question2:string;
//   id:any;
// }

declare const global: any;
// tslint:disable-next-line:variable-name
const MouseEvent = (global as any).MouseEvent as MouseEvent;

@Component({
  selector: 'app-shriram-fourwheeler-proposal',
  templateUrl: './shriram-fourwheeler-proposal.component.html',
  styleUrls: ['./shriram-fourwheeler-proposal.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})

export class ShriramFourwheelerProposalComponent implements OnInit {
  public proposer: FormGroup;
  public vehical: FormGroup;
  public previousInsure: FormGroup;
  public nomineeDetail: FormGroup;
  public minDate: any;
  public maxdate: any;
  public shriramProposer: any;
  public pincodeList: any;
  public settings: Settings;
  public proposerRatioDetail: boolean;
  public driverAgeDetail: boolean;
  public insurerdateError: any;
  public proposerAgeP: any;
  public insuredAgeP: any;
  public maxStartdate: any;
  public pannumberP: boolean;
  public bikeCityList: any;
  public bkVehicleList: any;
  public bkHypothecationList: any;
  public bikeProposerAge: any;
  public proposerdateError: any;
  public nomineeRelation: any;
  public hypothecationTypedm: any;
  public addonPackagedm: any;
  public titleList: any;
  public policyTypeList: any;
  public proposalTypeList: any;
  public finance: boolean;
  public claimDetails: any;
  public claimList: boolean;
  public previousList: any;
  public summaryData: any;
  public ProposalId: any;
  public apponiteeList: boolean;
  public electricalValid: boolean;
  public nonelectricalValid: boolean;
  public policyTypeDetails: boolean;
  public paUnNamed: boolean;
  public pType: boolean;
  public proposerFormData : any;
  public vehicalFormData : any;
  public previousFormData : any;
  public nomineeFormData : any;
  public buyBikeDetails : any;
  public pincodeHypoCity : any;
  public previousDateError : any;
  public webhost : any;
  public declaration : any;
  public PaymentRedirect : any;
  public PolicySisID : any;
  public PaymentReturn : any;
  public hypothecationTypeDetails : any;
  public enquiryFormData : any;
  public bikeEnquiryId : any;
  public packagelist : any;
  public siValue : any;
  public config : any;
  public getBankHypoDetails: any;
  public photos: any;
  public electricalSumAount: any;
  public pASumAount: any;
  public nonElectricalSumAount: any;
  public electricalMaxValue: any;
  public idvValuess: any;
  public coverPremium: any;
  public idvAmount: any;
  public electricAmount: any;
  public nonElectricAmount: any;
  public voluntaryList: any;
  // public policyDatevalidate : any;
  public currentStep : any;
  public electrical_cover :any;
  public basic_od_cover:any;
  public basic_tp_cover :any;
  public od_total :any;
  public cng_lpg_cover :any;
  public gst :any;
  public anti_theft_cover :any;
  public Nil_depreciation_cover :any;
  public LL_paid_driver:any;
  public pa_owner_driver :any;
  public pa_unnamed_passenger_cover :any;
  public Ncb :any;
  public mobileNumber :any;
  public PreviousValid:any;
  public carListDetails:any;
  public lesserDate:any;
  public nilDepValue:any;
  public proposerGender:any;
  public paOwnerValue:any;
  public titleId:any;
  public PAExclusionList: any;
  public bifuelType: any;
  public bifuelCover: boolean;
  public addonValue: any;
  public preClaim: any;
  public claimDetail: any;
  public detariff: any;
  public hideCNGBox: boolean;

  public genderList: boolean;
  constructor(public fb: FormBuilder, public validation: ValidationService,public route: ActivatedRoute,public dialog: MatDialog, public configs: ConfigurationService,public datepipe: DatePipe, public authservice: AuthService, private toastr: ToastrService,  public appSettings: AppSettings, public fwService: FourWheelerService ) {
    let stepperindex = 0;
    this.route.params.forEach((params) => {
      if(params.stepper == true || params.stepper == 'true') {
        stepperindex = 4;
        if (sessionStorage.summaryData != '' && sessionStorage.summaryData != undefined) {
          this.summaryData = JSON.parse(sessionStorage.summaryData);
          this.PaymentRedirect =   this.summaryData.PaymentRedirect;
          this.ProposalId = this.summaryData.ProposalId;
          this.PolicySisID =   this.summaryData.PolicySisID;
          this.PaymentReturn =   this.summaryData.PaymentReturn;
          sessionStorage.shiramFwProposalID = this.ProposalId;

          this.electrical_cover= sessionStorage.electrical_cover;
          this.basic_od_cover= sessionStorage.basic_od_cover;
          this.basic_tp_cover=  sessionStorage.basic_tp_cover;
          this.od_total=  sessionStorage.od_total;
          this.cng_lpg_cover= sessionStorage.cng_lpg_cover;
          this.gst=sessionStorage.gst;
          this.anti_theft_cover= sessionStorage.anti_theft_cover;
          this.Nil_depreciation_cover=sessionStorage.Nil_depreciation_cover;
          this.LL_paid_driver= sessionStorage.LL_paid_driver;
          this.pa_owner_driver=sessionStorage.pa_owner_driver;
          this.Ncb=sessionStorage.Ncb;
          this.pa_unnamed_passenger_cover=sessionStorage.pa_unnamed_passenger_cover;
          this.detariff=sessionStorage.detariff;
          this.get_PA_exclusion_list()
          this.proposerFormData = JSON.parse(sessionStorage.proposerFormData);
          this.vehicalFormData = JSON.parse(sessionStorage.vehicalFormData);
          this.previousFormData = JSON.parse(sessionStorage.previousFormData);
          this.nomineeFormData = JSON.parse(sessionStorage.nomineeFormData);
          console.log(this.summaryData ,'this.summaryData ');
          console.log(sessionStorage.summaryData,'sessionStorage.summaryData ');
        }
      }
    });
    this.currentStep = stepperindex;
    console.log(this.currentStep,'this.currentStep');
    const minDate = new Date();
    this.minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
    const lateDate=minDate.getFullYear()-5;
    this.lesserDate = new Date(lateDate, minDate.getMonth(), minDate.getDate());

    this.electricalSumAount=false
    this.nonElectricalSumAount=false
    this.pASumAount=false
    this.paOwnerValue=false;
    this.settings = this.appSettings.settings;
    this.webhost = this.configs.getimgUrl();

    this.settings.HomeSidenavUserBlock = false;
    this.settings.sidenavIsOpened = false;
    this.settings.sidenavIsPinned = false;
    this.proposerRatioDetail = false;
    this.driverAgeDetail = false;
    this.proposerAgeP = '';
    this.insuredAgeP = '';
    this.maxStartdate = '';
    this.pannumberP = false;
    this.finance = false;
    this.claimList = false;
    this.apponiteeList = false;
    this.PreviousValid = false;
    this.nilDepValue = false;
    this.mobileNumber = 'true';
    // this.proposerGender = false;
    // this.config = {
    //   displayKey: "hypothecationBankName", //if objects array passed which key to be displayed defaults to description
    //   search: true,
    //   limitTo: 5,
    //   // searchOnKey: 'city'
    // };

    this.pType = false;
    this.electricalValid = false;
    this.nonelectricalValid = false;
    this.paUnNamed = false;
    this.policyTypeDetails = false;
    this.hideCNGBox = false;
    // this.policyDatevalidate = [];
    this.proposer = this.fb.group({
      title: ['', Validators.required],
      name: new FormControl(''),
      dob: '',
      gender: '',
      email: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
      mobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
      pincode: ['', Validators.required],
      radio: ' ',
      alterMobile: ['', Validators.compose([Validators.pattern('[6789][0-9]{9}')])],
      fax: '',
      pan: ['', Validators.compose([ Validators.minLength(10)])],
      gst: ['', Validators.compose([Validators.minLength(15)])],
      address: ['', Validators.required],
      address2: '',
      address3: '',
      state: '',
      stateName: '',
      city: '',
      cityName: '',
      breakIn: '',
    });
    this.vehical = this.fb.group({
      proposalType: 'Renewal',
      policyTypeName: '',
      policyType: ['', Validators.required],
      nilDepreciationCover: '',
      totalAntiTheftPremium: '',
      totalDepreciationPremium: '',
      totalPaforUnnamedPremium: '',
      totalElectricalItemPremium: '',
      totalNonElectricalItemPremium: '',
      electricalAccess: '',
      electricalAccessSI: '',
      nonElectricalAccess: '',
      nonElectricalAccessSI: '',
      paforUnnamed: '',
      paforUnnamedSI: '',
      hypothecationType: '',
      hypothecationTypeName: '',
      hypothecationAddress1: '',
      hypothecationAddress2: '',
      hypothecationAddress3: '',
      hypothecationAgreementNo: '',
      antiTheft: '',
      lltoPaidDriver: '',
      addonPackage:'',
      hypothecationBankName:'',
      hypothecationBankNamevalue:'',
      pincode:'',
      state:'',
      city:'',
      stateName:'',
      cityName:'',
      isFinanced:'',
      SriLanka: '',
      Bangladesh: '',
      Pakistan: '',
      Nepal: '',
      Maldives: '',
      DeTariff: '',
      Bhutan: '',
      geographicalArea:'',
      // paOwnerDriver:'',
      CNGKit:'',
      CNGKitSI:'',
      paPaidDriver:'',
      paPaidDriverSI:'',
      PAPaidDriverCount:'',
      PAPaidConductorCount:'',
      PAPaidCleanerCount:'',
      isPAExclusion:'',
      PAExclusion:'',
      PAExclusionName:'',
      limitOwnPremise:'',
      limitedTPPD:'',
      builtCNGKit:'',
      voluntaryExcess: [''],
      voluntaryExcessName: [''],
      vehicleColour: ['', Validators.required],


    });
    this.previousInsure = this.fb.group({
      policyNumber:['', Validators.required],
      previousInsured: ['', Validators.required],
      previousPolicyType: ['', Validators.required],
      policyNilDescription: ['', Validators.required],
      previousPolicyTypeName:'',
      policySi:['', Validators.required],


    });


    this.nomineeDetail = this.fb.group({
      nomineeName: '',
      nomineeAge: '',
      nomineeRelationship: '',
      appointeeName: '',
      appointeeRelationship: ''
    });
    this.genderList = false;

  }

  ngOnInit() {
    this.buyBikeDetails = JSON.parse(sessionStorage.buyFourwheelerProductDetails);
    this.carListDetails = JSON.parse(sessionStorage.carListDetails);
    console.log(this.carListDetails,'this.carListDetails...')
    this.packagelist = sessionStorage.packageListFw;
    this.bikeEnquiryId = sessionStorage.fwEnquiryId;

    this.changeTitle();
    this.changehypothecation();
    this.policyType();
    this.proposalType();
    this.addonPackage();
    this.claimpercent();
    this.nomineeRelationShip();
    this.previousInsureType();
    this.changehypothecationType();
    this.getHBankLists();
    this.changeCalcMax();
    this.voluntaryExcess();
    this.nilDepDateValidation();
    this.get_PA_exclusion_list();
    this.vehical.controls['isPAExclusion'].patchValue(false);
    this.PAExclusion()
    this.nilDepPolicy()
    this.changeBifuelDrop()

    this.sessionData();

  }

  changeCalcMax(){
    let values=this.buyBikeDetails.Idv;
    console.log(values,'values....');
    let valid = 20/100;
    console.log(valid,'valid....');
    this.electricalMaxValue = valid * values;
    console.log(this.electricalMaxValue ,'this.electricalMaxValue ...')

  }

  changeCalcElect(event:any){
    let electricSum=event.target.value;
    console.log(electricSum,'electricSum...');
    console.log(this.electricalMaxValue,'electricalMaxValue...');
    if((electricSum > 300) && (electricSum < this.electricalMaxValue)){
      this.electricalSumAount=false;
      this.electricalSumAount='';
    }else{
      this.electricalSumAount=true;
      this.electricalSumAount = 'Electrical Accessories Sum Insured Should be greater than 300 and lesser than';
    }

  }
  changeCalcNonElect(event:any){
    let nonElectricSum=event.target.value;
    console.log(nonElectricSum,'electricSum...');
    console.log(this.electricalMaxValue,'electricalMaxValue...');
    if((nonElectricSum> 300) && (nonElectricSum < this.electricalMaxValue)){
      this.nonElectricalSumAount=false;
      this.nonElectricalSumAount='';
    }else{
      this.nonElectricalSumAount=true;
      this.nonElectricalSumAount = 'Non Electrical Accessories Sum Insured Should be greater than 300 and lesser than';
    }

  }

  nilDepDateValidation(){
    let valueDil=this.datepipe.transform(this.lesserDate, 'y-MM-dd')
    console.log(this.lesserDate,'lesserDate....')
    console.log(valueDil,'valueDil....')
    // let valuessss=(valueDil > this.carListDetails.registration_date );
    console.log(this.carListDetails.registration_date,'55555555555555....')
    // console.log(valuessss,'valuessss....')

    if(valueDil < this.carListDetails.registration_date ){
      this.nilDepValue=true;
    }else{
      this.nilDepValue=false;
    }
    console.log(this.nilDepValue,'nilDepValue....')
  }

  hideCNG(){
    if(this.vehical.controls['builtCNGKit'].value==true){
      this.hideCNGBox=true;
      this.vehical.controls['CNGKit'].patchValue('')
      this.vehical.controls['CNGKitSI'].patchValue('')
      this.vehical.controls['CNGKit'].setValidators(null)
      this.vehical.controls['CNGKitSI'].setValidators(null)
    }else{
      this.hideCNGBox=false;
    }
  }

  changeBifuelDrop() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      "enquiry_id": this.bikeEnquiryId,
      "company_id": "7",
    };
    this.fwService.fourWheelerRelianceGetBifuelList(data).subscribe(
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
    if(this.bifuelType == '3'){
      // this.coverDetails['controls'].fuelType.patchValue('5');
      this.bifuelCover=true;
    }else  if(this.bifuelType != '3'){
      this.vehical.controls['CNGKit'].patchValue(false);
      this.vehical.controls['builtCNGKit'].patchValue(false);
      this.bifuelCover=false;
      this.updateCNGKit();
    }
  }

  nilDepPolicy() {
    this.preClaim = this.carListDetails.previous_claim_YN
    if(this.preClaim == 0){
      this.claimDetail=true;

    }else  if(this.preClaim == 1){
      this.claimDetail=false;
    }
  }

  // changeCalcPA(event:any){
  //   let nonPASum=event.target.value;
  //   console.log(nonPASum,'nonPASum...');
  //   console.log(this.electricalMaxValue,'electricalMaxValue...');
  //   if(nonPASum < this.electricalMaxValue){
  //     this.pASumAount=false;
  //     this.pASumAount='';
  //   }else{
  //     this.pASumAount=true;
  //     this.pASumAount = 'PA to Unnamed Passenger Sum Insured Should be lesser than';
  //   }
  // }

    // paOwner(){
    //     if(this.vehical.controls['paOwnerDriver'].value == true){
    //         this.paOwnerValue=true;
    //         this.nomineeDetail.controls['nomineeName'].setValidators([Validators.required]);
    //         this.nomineeDetail.controls['nomineeAge'].setValidators([Validators.required]);
    //         this.nomineeDetail.controls['nomineeRelationship'].setValidators([Validators.required]);
    //
    //     }else if(this.vehical.controls['paOwnerDriver'].value == false){
    //         this.paOwnerValue=false;
    //         this.nomineeDetail.controls['nomineeName'].patchValue('')
    //         this.nomineeDetail.controls['nomineeAge'].patchValue('')
    //         this.nomineeDetail.controls['nomineeRelationship'].patchValue('')
    //         this.nomineeDetail.controls['appointeeName'].patchValue('')
    //         this.nomineeDetail.controls['appointeeRelationship'].patchValue('')
    //     }
    // }


  changeDepreciation() {
    if (this.vehical.controls['nilDepreciationCover'].value == true) {
      this.previousInsure.controls['policyNilDescription'].patchValue('');

    }else{
      this.previousInsure.controls['policyNilDescription'].patchValue('');
    }
  }



  // FIRST STEPPER

  // title change function
  changeTitle() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.fwService.getTitleList(data).subscribe(
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
  changeGender() {
    if (this.proposer.controls['title'].value == 'Mr') {
      this.genderList = false;
      this.proposer.controls['gender'].patchValue('Male');
    } else if(this.proposer.controls['title'].value == 'Ms' || this.proposer.controls['title'].value == 'Mrs'|| this.proposer.controls['title'].value == 'Miss' )  {
      this.genderList = false;
      this.proposer.controls['gender'].patchValue('Female');
      // this.proposer.controls['dob'].setValidators([Validators.required]);

    } else {
      if(this.proposer.controls['title'].value == 'Dr'){
        this.genderList = true;
        this.proposer.controls['gender'].patchValue('');
        this.proposer.controls['gender'].setValidators([Validators.required]);
        // this.proposer.controls['dob'].setValidators([Validators.required]);

        console.log(this.proposer.controls['gender'].value,'genders......')
      }
    }

  }
  changeGenderVales(){
    if (this.proposer.controls['title'].value == 'M/S') {
      this.proposerGender=true;
      this.proposer.controls['dob'].patchValue('');
      this.proposer.controls['gender'].patchValue('');
      this.proposer.controls['dob'].setValidators(null);
      this.proposer.controls['gender'].setValidators(null);
      this.proposer.controls['pan'].setValidators([Validators.required]);
    }else{
      this.proposerGender=false;
      this.proposer.controls['dob'].setValidators([Validators.required]);
      this.proposer.controls['gender'].setValidators([Validators.required]);
      this.proposer.controls['pan'].patchValue('');
      this.proposer.controls['pan'].setValidators(null);


    }
    this.proposer.controls['dob'].updateValueAndValidity();
    this.proposer.controls['gender'].updateValueAndValidity();
    this.proposer.controls['pan'].updateValueAndValidity();
  }


    changeGenderVales1() {
        if (this.proposer.controls['title'].value == 'Mr') {
            this.titleId=1;
          this.get_PA_exclusion_list();
            console.log(this.titleId,'111')
        }
        if (this.proposer.controls['title'].value == 'Mrs') {
            this.titleId=2;
          this.get_PA_exclusion_list();
            console.log(this.titleId,'222')
        }
        if (this.proposer.controls['title'].value == 'M/S') {
            this.titleId=3;
          this.get_PA_exclusion_list();
            console.log(this.titleId,'333')
        }
        if (this.proposer.controls['title'].value == 'Miss') {
            this.titleId=4;
          this.get_PA_exclusion_list();
            console.log(this.titleId,'4444')
        }
        if (this.proposer.controls['title'].value == 'Dr') {
            this.titleId=5;
          this.get_PA_exclusion_list();
            console.log(this.titleId,'555')
        }
    }
  // AGE VALIDATION
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

  // validation previous page


  // date input



  addEvent(event,type) {
    if (event.value != null) {
      let selectedDate = '';
      this.bikeProposerAge = '';
      let dob = '';
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
          this.bikeProposerAge = this.ageCalculate(dob);

        }

      } else if (typeof event.value._i == 'object') {
        // dob = this.datepipe.transform(event.value, 'MMM d, y');
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (dob.length == 10) {
          this.bikeProposerAge = this.ageCalculate(dob);

        }
        this.insurerdateError = '';
      }
      sessionStorage.fwShriramProposerAge = this.bikeProposerAge;

    }
  }
  // // PINCODE
  getPostalCode(pin) {
    const data = {
      'platform': 'web',
      'pin_code': pin
    };
    console.log(data,'jhgjh');
    if (pin.length == 6) {
      this.fwService.getPincodeList(data).subscribe(
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
      console.log(pin,'jhgfdghj');
      if(pin.length == '' || pin.length == 0 || pin.length != 6){
        this.proposer.controls['state'].patchValue('');
        this.proposer.controls['city'].patchValue('');
      }
      for(let key in this.pincodeList.state) {
        this.proposer.controls['state'].patchValue(key);
        this.proposer.controls['stateName'].patchValue(this.pincodeList['state'][key]);
      }
      for(let key in this.pincodeList.city) {
        this.proposer.controls['city'].patchValue(key);
        this.proposer.controls['cityName'].patchValue(this.pincodeList['city'][key]);
      }

    } else{
      this.toastr.error(successData.ErrorObject);
      this.proposer.controls['state'].patchValue('');
      this.proposer.controls['city'].patchValue('');

    }
  }


  public pinProposerListFailure(error) {
  }

  driverAgeList() {
    console.log(this.proposer.controls['driverAge'].value,'eeeeeeeeeeeeeeee');
    if (this.proposer.controls['driverAge'].value == 'Yes') {
      this.driverAgeDetail = true;
    } else {
      this.driverAgeDetail = false;
    }
  }

  changeCity() {
    this.proposer.controls['proposerbkCityName'].patchValue(this.bikeCityList[this.proposer.controls['proposerbkCity'].value]);

  }
  changevehicle() {
    this.proposer.controls['vehicleTypeName'].patchValue(this.bkVehicleList[this.proposer.controls['vehicleType'].value]);

  }
  // changefinancecompany() {
  //   this.vehical.controls['hypothecationBankNamevalue'].patchValue(this.getBankHypoDetails[this.vehical.controls['hypothecationBankName'].value]);
  //   console.log(this.vehical.controls['bankNamevalue'].value,'11111111111111111111');
  // }

  // NEXT BUTTON

  public proposerDetails(stepper: MatStepper, value) {
    console.log(value, 'eeeeeeeeeee');
    sessionStorage.stepper1 = '';
    sessionStorage.stepper1 = JSON.stringify(value);
    console.log(this.proposer.valid, 'checked');
    if(this.proposer.valid ) {
      if(sessionStorage.fwShriramProposerAge >= 18 || this.proposer.controls['dob'].value==''||this.proposer.controls['dob'].value==null){
        if (this.mobileNumber == '' || this.mobileNumber == 'true') {

          stepper.next();
          this.topScroll();
        }
      } else {
        this.toastr.error('Proposer age should be 18 or above');

      }
    }

  }

  // SECOND STEPPER

  addonPackage() {
    if(this.buyBikeDetails.plan_code == 'ADDON_01') {
      this.vehical.controls['addonPackage'].patchValue('BASIC');
    } else if (this.buyBikeDetails.plan_code == 'ADDON_02') {
      this.vehical.controls['addonPackage'].patchValue('SILVER PACKAGE');
    } else if (this.buyBikeDetails.plan_code == 'ADDON_03') {
      this.vehical.controls['addonPackage'].patchValue('GOLD PACKAGE');
    } else if (this.buyBikeDetails.plan_code == 'ADDON_04') {
      this.vehical.controls['addonPackage'].patchValue(' PLATINUM PACKAGE');
    }
  }

  proposalType() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0'


    }
    this.fwService.getProposalDetails(data).subscribe(
        (successData) => {
          this.proposalTypeSuccess(successData);
        },
        (error) => {
          this.proposalTypeFailure(error);
        }
    );
  }
  public proposalTypeSuccess(successData){
    if (successData.IsSuccess) {
      this.proposalTypeList = successData.ResponseObject;
    }
  }
  public proposalTypeFailure(error) {
  }

  // updateElectricalItem(){
  //   if(this.vehical.controls.electricalAccess.value == true){
  //     this.vehical.controls['electricalAccessSI'].setValidators([Validators.required]);
  //   } else {
  //     this.vehical.controls['electricalAccessSI'].patchValue('');
  //
  //     this.vehical.controls['electricalAccessSI'].setValidators(null);
  //     this.electricalSumAount=false;
  //     this.electricalSumAount='';
  //
  //   }
  //   this.vehical.controls['electricalAccessSI'].updateValueAndValidity();
  // }
  //
  // updatenonElectricalItem(){
  //   if(this.vehical.controls.nonElectricalAccess.value == true){
  //     this.vehical.controls['nonElectricalAccessSI'].setValidators([Validators.required]);
  //   } else {
  //     this.vehical.controls['nonElectricalAccessSI'].patchValue('');
  //
  //     this.vehical.controls['nonElectricalAccessSI'].setValidators(null);
  //     this.nonElectricalSumAount=false;
  //     this.nonElectricalSumAount='';
  //
  //   }
  //   this.vehical.controls['nonElectricalAccessSI'].updateValueAndValidity();
  // }
  //
  // updateUnnamedPassenger(){
  //   if(this.vehical.controls.paforUnnamed.value == true){
  //     this.vehical.controls['paforUnnamedSI'].setValidators([Validators.required]);
  //   } else {
  //     this.vehical.controls['paforUnnamedSI'].patchValue('');
  //
  //     this.vehical.controls['paforUnnamedSI'].setValidators(null);
  //   }
  //   this.vehical.controls['paforUnnamedSI'].updateValueAndValidity();
  // }

  get_PA_exclusion_list(){
    const padata = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'prefix': this.titleId
    }
    this.fwService.getPAExclusionList(padata).subscribe(
        (successData) => {
          this.Exclusionsucccess(successData);
        },
        (error) => {
          this.ExclusionSuccess(error);
        }
    );
  }
  public Exclusionsucccess(successData){
    this.PAExclusionList = successData.ResponseObject;
  }
  public ExclusionSuccess(error) {
  }


  PAExclusion(){
    if(this.vehical.controls['isPAExclusion'].value==true) {
      this.paOwnerValue=false;
      this.vehical.controls['PAExclusion'].setValidators([Validators.required]);

      this.nomineeDetail.controls['nomineeName'].patchValue('');
      this.nomineeDetail.controls['nomineeAge'].patchValue('');
      this.nomineeDetail.controls['nomineeRelationship'].patchValue('');
      this.nomineeDetail.controls['appointeeName'].patchValue('');
      this.nomineeDetail.controls['appointeeRelationship'].patchValue('');
      sessionStorage.nomineeFormData='';

      this.nomineeDetail.controls['nomineeName'].setValidators(null);
      this.nomineeDetail.controls['nomineeAge'].setValidators(null);
      this.nomineeDetail.controls['nomineeRelationship'].setValidators(null);
      this.nomineeDetail.controls['appointeeName'].setValidators(null);
      this.nomineeDetail.controls['appointeeRelationship'].setValidators(null);

    }else if(this.vehical.controls['isPAExclusion'].value==false){

      this.paOwnerValue=true;
      this.vehical.controls['PAExclusion'].setValidators(null);
      this.vehical.controls['PAExclusion'].patchValue('');

      this.nomineeDetail.controls['nomineeName'].setValidators([Validators.required]);
      this.nomineeDetail.controls['nomineeAge'].setValidators([Validators.required]);
      this.nomineeDetail.controls['nomineeRelationship'].setValidators([Validators.required]);

    }
    this.vehical.controls['PAExclusion'].updateValueAndValidity();
    this.nomineeDetail.controls['nomineeName'].updateValueAndValidity();
    this.nomineeDetail.controls['nomineeAge'].updateValueAndValidity();
    this.nomineeDetail.controls['nomineeRelationship'].updateValueAndValidity();

  }

  updateElectricalItem(){
    if(this.vehical.controls.electricalAccess.value == true){
      this.vehical.controls['electricalAccessSI'].setValidators([Validators.required]);
      // this.vehical.controls['totalElectricalItemPremium'].setValidators([Validators.required]);

    } else {
      this.vehical.controls['electricalAccessSI'].patchValue('');
      // this.vehical.controls['totalElectricalItemPremium'].patchValue('');

      this.vehical.controls['electricalAccessSI'].setValidators(null);
      // this.vehical.controls['totalElectricalItemPremium'].patchValue('');
      // this.vehical.controls['totalElectricalItemPremium'].setValidators(null);
      this.electricalSumAount=false;
      this.electricalSumAount='';

    }
    this.vehical.controls['electricalAccessSI'].updateValueAndValidity();
    // this.vehical.controls['totalElectricalItemPremium'].updateValueAndValidity();

  }
  // electricalSumInsure(){
  //   if(this.vehical.controls['electricalAccessSI'].value){
  //     // this.vehical.controls['totalElectricalItemPremium'].setValidators([Validators.required]);
  //     // this.getCover();
  //   }else{
  //     this.vehical.controls['totalElectricalItemPremium'].patchValue('');
  //     this.vehical.controls['totalElectricalItemPremium'].setValidators(null);
  //   }
  //   this.vehical.controls['totalElectricalItemPremium'].updateValueAndValidity();
  // }
  // electricalAmount(){
  //   this.vehical.controls['totalElectricalItemPremium'].patchValue(this.electrical_cover);
  //   console.log(this.vehical.controls['totalElectricalItemPremium'].value,'456789087865456')
  // }

  updatenonElectricalItem(){
    if(this.vehical.controls.nonElectricalAccess.value == true){
      this.vehical.controls['nonElectricalAccessSI'].setValidators([Validators.required]);
      // this.vehical.controls['totalNonElectricalItemPremium'].setValidators([Validators.required]);
    } else {
      this.vehical.controls['nonElectricalAccessSI'].patchValue('');
      // this.vehical.controls['totalNonElectricalItemPremium'].patchValue('');

      this.vehical.controls['nonElectricalAccessSI'].setValidators(null);
      // this.vehical.controls['totalNonElectricalItemPremium'].setValidators(null);
      this.nonElectricalSumAount=false;
      this.nonElectricalSumAount='';

    }
    this.vehical.controls['nonElectricalAccessSI'].updateValueAndValidity();
    // this.vehical.controls['totalNonElectricalItemPremium'].updateValueAndValidity();
  }

  // electricalNonSumInsure(){
  //   if(this.vehical.controls['nonElectricalAccessSI'].value){
  //     this.vehical.controls['totalNonElectricalItemPremium'].setValidators([Validators.required]);
  //     this.getCover();
  //   }else{
  //     this.vehical.controls['totalNonElectricalItemPremium'].patchValue('');
  //     this.vehical.controls['totalNonElectricalItemPremium'].setValidators(null);
  //   }
  //   this.vehical.controls['totalNonElectricalItemPremium'].updateValueAndValidity();
  // }
  //
  // electricalNonAmount(){
  //   this.vehical.controls['totalNonElectricalItemPremium'].patchValue(this.electrical_cover);
  // }

  updateUnnamedPassenger(){
    if(this.vehical.controls.paforUnnamed.value == true){
      this.vehical.controls['paforUnnamedSI'].setValidators([Validators.required]);
      // this.vehical.controls['totalPaforUnnamedPremium'].setValidators([Validators.required]);
    } else {
      this.vehical.controls['paforUnnamedSI'].patchValue('');
      // this.vehical.controls['totalPaforUnnamedPremium'].patchValue('');

      this.vehical.controls['paforUnnamedSI'].setValidators(null);
      // this.vehical.controls['totalPaforUnnamedPremium'].setValidators(null);
      this.pASumAount=false;
      this.pASumAount='';

    }
    this.vehical.controls['paforUnnamedSI'].updateValueAndValidity();
    // this.vehical.controls['totalPaforUnnamedPremium'].updateValueAndValidity();
  }

  // unnamedPassengerSumInsure(){
  //   if(this.vehical.controls['paforUnnamedSI'].value){
  //     this.vehical.controls['totalPaforUnnamedPremium'].setValidators([Validators.required]);
  //     this.getCover();
  //   }else{
  //     this.vehical.controls['totalPaforUnnamedPremium'].patchValue('');
  //     this.vehical.controls['totalPaforUnnamedPremium'].setValidators(null);
  //   }
  //   this.vehical.controls['totalPaforUnnamedPremium'].updateValueAndValidity();
  // }
  // unnamedPassengerAmount(){
  //   this.vehical.controls['totalPaforUnnamedPremium'].patchValue(this.pa_unnamed_passenger_cover);
  // }

  // updateAntiTheft(){
  //   if(this.vehical.controls.antiTheft.value == true){
  //     this.vehical.controls['totalAntiTheftPremium'].setValidators([Validators.required]);
  //     this.getCover();
  //   } else {
  //     this.vehical.controls['totalAntiTheftPremium'].patchValue('');
  //
  //     this.vehical.controls['totalAntiTheftPremium'].setValidators(null);
  //
  //   }
  //   this.vehical.controls['totalAntiTheftPremium'].updateValueAndValidity();
  // }
  // antiTheftAmount(){
  //   this.vehical.controls['totalAntiTheftPremium'].patchValue(this.anti_theft_cover);
  // }

  // updateDepreciation(){
  //   if(this.vehical.controls.nilDepreciationCover.value == true){
  //     this.vehical.controls['totalDepreciationPremium'].setValidators([Validators.required]);
  //     this.getCover();
  //   } else {
  //     this.vehical.controls['totalDepreciationPremium'].patchValue('');
  //
  //     this.vehical.controls['totalDepreciationPremium'].setValidators(null);
  //
  //   }
  //   this.vehical.controls['totalDepreciationPremium'].updateValueAndValidity();
  // }
  // depreciationAmount(){
  //   this.vehical.controls['totalDepreciationPremium'].patchValue(this.Nil_depreciation_cover);
  // }

  // updatePaOwnerDriver(){
  //   if(this.vehical.controls.paOwnerDriver.value == true){
  //     this.vehical.controls['totalPaOwnerDriverPremium'].setValidators([Validators.required]);
  //     this.getCover();
  //   } else {
  //     this.vehical.controls['totalPaOwnerDriverPremium'].patchValue('');
  //
  //     this.vehical.controls['totalPaOwnerDriverPremium'].setValidators(null);
  //
  //   }
  //   this.vehical.controls['totalPaOwnerDriverPremium'].updateValueAndValidity();
  // }
  //
  // paOwnerDriverAmount(){
  //   this.vehical.controls['totalPaOwnerDriverPremium'].patchValue(this.pa_owner_driver);
  // }

  updateCNGKit(){
    if(this.vehical.controls.CNGKit.value == true){
      this.vehical.controls['CNGKitSI'].setValidators([Validators.required]);
    } else {
      this.vehical.controls['CNGKitSI'].patchValue('');

      this.vehical.controls['CNGKitSI'].setValidators(null);
    }
    this.vehical.controls['CNGKitSI'].updateValueAndValidity();
  }
  updatePAPaidDriver(){
    if(this.vehical.controls.paPaidDriver.value == true){
      this.vehical.controls['paPaidDriverSI'].setValidators([Validators.required]);
      // this.vehical.controls['PAPaidDriverCount'].setValidators([Validators.required]);
      // this.vehical.controls['PAPaidConductorCount'].setValidators([Validators.required]);
      // this.vehical.controls['PAPaidCleanerCount'].setValidators([Validators.required]);
    } else {
      this.vehical.controls['paPaidDriverSI'].patchValue('');
      // this.vehical.controls['PAPaidDriverCount'].patchValue('');
      // this.vehical.controls['PAPaidConductorCount'].patchValue('');
      // this.vehical.controls['PAPaidCleanerCount'].patchValue('');

      this.vehical.controls['paPaidDriverSI'].setValidators(null);
      // this.vehical.controls['PAPaidDriverCount'].setValidators(null);
      // this.vehical.controls['PAPaidConductorCount'].setValidators(null);
      // this.vehical.controls['PAPaidCleanerCount'].setValidators(null);
    }
    this.vehical.controls['paPaidDriverSI'].updateValueAndValidity();
    // this.vehical.controls['PAPaidDriverCount'].updateValueAndValidity();
    // this.vehical.controls['PAPaidConductorCount'].updateValueAndValidity();
    // this.vehical.controls['PAPaidCleanerCount'].updateValueAndValidity();
  }

  policyDetail(){
    this.previousInsure.controls['previousPolicyTypeName'].patchValue(this.policyTypeList[this.previousInsure.controls['previousPolicyType'].value]);
  }
  policyList(){
    this.vehical.controls['policyTypeName'].patchValue(this.policyTypeList[this.vehical.controls['policyType'].value]);

  }
  alternateChange(event) {
    if (this.proposer['controls'].alterMobile.value.length == 10) {
      if(this.proposer['controls'].alterMobile.value == this.proposer['controls'].alterMobile.value) {
        this.mobileNumber = 'Alternate number should be different from mobile number';
      } else {
        this.mobileNumber = '';
      }
    } else {
      this.mobileNumber = '';
    }
    sessionStorage.mobileNumber = this.mobileNumber;
  }
  policyType() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0'


    }
    this.fwService.getPolicyDetails(data).subscribe(
        (successData) => {
          this.policyTypeSuccess(successData);
        },
        (error) => {
          this.policyTypeFailure(error);
        }
    );
  }
  public policyTypeSuccess(successData){
    if (successData.IsSuccess) {
      this.policyTypeList = successData.ResponseObject;
    }
  }
  public policyTypeFailure(error) {
  }

  changehypothecation() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0'

    }
    this.fwService.getHypothecation(data).subscribe(
        (successData) => {
          this.hypothecationSuccess(successData);
        },
        (error) => {
          this.hypothecationFailure(error);
        }
    );
  }
  public hypothecationSuccess(successData){
    if (successData.IsSuccess) {
      this.hypothecationTypedm = successData.ResponseObject;
    }
    console.log(this.hypothecationTypedm,'this.hypothecationTypedm');
  }
  public hypothecationFailure(error) {
  }
// hypo type
  changehypothecationType() {

    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0'

    }
    this.fwService.getHypothecationType(data).subscribe(
        (successData) => {
          this.hypothecationTypeSuccess(successData);
        },
        (error) => {
          this.hypothecationTypeFailure(error);
        }
    );
  }
  public hypothecationTypeSuccess(successData){
    if (successData.IsSuccess) {
      this.hypothecationTypeDetails = successData.ResponseObject;
    }
    console.log(this.hypothecationTypedm,'this.hypothecationTypedm');
  }
  public hypothecationTypeFailure(error) {
  }
hypoName(){
  this.vehical.controls['hypothecationTypeName'].patchValue(this.hypothecationTypeDetails[this.vehical.controls['hypothecationType'].value]);

}
  // hypo pincode
  getHypoPostalCode(pin) {
    const data = {
      'platform': 'web',
      'pin_code': pin
    };
    console.log(data,'jhgjh');
    if (pin.length == 6) {
      this.fwService.getHypoPincodeList(data).subscribe(
          (successData) => {
            this.pinListSuccess(successData, pin);
          },
          (error) => {
            this.pinListFailure(error);
          }
      );
    }
  }




  public pinListSuccess(successData, pin) {
    if (successData.IsSuccess) {
      this.pincodeHypoCity = successData.ResponseObject;
      console.log(pin,'jhgfdghj');
      if(pin.length == '' || pin.length == 0 || pin.length != 6){
        this.vehical.controls['state'].patchValue('');
        this.vehical.controls['city'].patchValue('');
      }
      for(let key in this.pincodeHypoCity.state) {
        this.vehical.controls['state'].patchValue(key);
        this.vehical.controls['stateName'].patchValue(this.pincodeHypoCity['state'][key]);
      }
      for(let key in this.pincodeHypoCity.city) {
        this.vehical.controls['city'].patchValue(key);
        this.vehical.controls['cityName'].patchValue(this.pincodeHypoCity['city'][key]);
      }

    } else{
      this.toastr.error(successData.ErrorObject);
      this.vehical.controls['state'].patchValue('');
      this.vehical.controls['city'].patchValue('');

    }
  }



  public pinListFailure(error) {
  }

  electricalAccess(value){
    if(value.checked){
      this.electricalValid = true;
      this.vehical.controls['electricalAccessSI'].setValidators([Validators.required]);
    } else {
      this.electricalValid = false;
      this.vehical.controls['electricalAccessSI'].setValidators(null);
      this.vehical.controls['electricalAccessSI'].patchValue('');

    }
  }
  nonElectricalAccess(value){
    if(value.checked){
      this.nonelectricalValid = true;
      this.vehical.controls['nonElectricalAccessSI'].setValidators([Validators.required]);
    } else {
      this.nonelectricalValid = false;
      this.vehical.controls['nonElectricalAccessSI'].setValidators(null);
      this.vehical.controls['nonElectricalAccessSI'].patchValue('');

    }
  }
  changePA(value){
    if(value.checked){
      this.paUnNamed = true;
      this.vehical.controls['paforUnnamedSI'].setValidators([Validators.required]);
    } else {
      this.paUnNamed = false;
      this.vehical.controls['paforUnnamedSI'].setValidators(null);
      this.vehical.controls['paforUnnamedSI'].patchValue('');

    }
  }
  financeType() {

    if (this.vehical.controls['isFinanced'].value==true) {
      // alert(this.photos)
      // alert('true')
      // this.vehical.controls['hypothecationType'].patchValue(this.vehical.controls['hypothecationType'].value);
      // this.vehical.controls['hypothecationAddress1'].patchValue(this.vehical.controls['hypothecationAddress1'].value);
      // this.vehical.controls['hypothecationAddress2'].patchValue(this.vehical.controls['hypothecationAddress2'].value);
      // this.vehical.controls['hypothecationBankName'].patchValue( this.photos);

      this.vehical.controls['hypothecationType'].setValidators([Validators.required]);
      this.vehical.controls['hypothecationAddress1'].setValidators([Validators.required]);
      this.vehical.controls['hypothecationAddress2'].setValidators([Validators.required]);
      this.vehical.controls['hypothecationBankName'].setValidators([Validators.required]);
      // this.photos
      this.finance = true;
    } else {
      // alert('false')
      this.vehical.controls['hypothecationType'].patchValue('');
      this.vehical.controls['hypothecationTypeName'].patchValue('');
      this.vehical.controls['hypothecationAddress1'].patchValue('');
      this.vehical.controls['hypothecationBankName'].patchValue('');
      this.vehical.controls['hypothecationAddress2'].patchValue('');
      this.vehical.controls['hypothecationAddress3'].patchValue('');
      this.vehical.controls['hypothecationAgreementNo'].patchValue('');
      this.vehical.controls['hypothecationBankNamevalue'].patchValue('');
      this.vehical.controls['pincode'].patchValue('');
      this.vehical.controls['stateName'].patchValue('');
      this.vehical.controls['cityName'].patchValue('');
      this.photos='';
      this.vehical.controls['hypothecationType'].setValidators(null);
      this.vehical.controls['hypothecationAddress2'].setValidators(null);
      this.vehical.controls['hypothecationAddress1'].setValidators(null);
      this.vehical.controls['hypothecationBankName'].setValidators(null);
      this.vehical.controls['hypothecationBankNamevalue'].setValidators(null);
      this.finance = false;

    }
    this.vehical.controls['hypothecationType'].updateValueAndValidity();
    this.vehical.controls['hypothecationAddress2'].updateValueAndValidity();
    this.vehical.controls['hypothecationAddress1'].updateValueAndValidity();
    this.vehical.controls['hypothecationBankName'].updateValueAndValidity();
    // this.vehical.controls['hypothecationBankNamevalue'].updateValueAndValidity();

  }

  // financeType(value){
  //   if(value.checked){
  //     this.finance = true;
  //     this.vehical.controls['hypothecationType'].setValidators([Validators.required]);
  //     this.vehical.controls['hypothecationAddress1'].setValidators([Validators.required]);
  //     this.vehical.controls['hypothecationAddress2'].setValidators([Validators.required]);
  //     this.vehical.controls['hypothecationBankName'].setValidators([Validators.required]);
  //
  //   } else{
  //     this.finance = false;
  //     this.vehical.controls['hypothecationType'].setValidators(null);
  //     this.vehical.controls['hypothecationTypeName'].setValidators(null);
  //     this.vehical.controls['hypothecationAddress1'].setValidators(null);
  //     this.vehical.controls['hypothecationAddress2'].setValidators(null);
  //     this.vehical.controls['hypothecationBankName'].setValidators(null);
  //     // this.vehical.controls['hypothecationBankNamevalue'].setValidators(null);
  //     this.vehical.controls['hypothecationType'].patchValue('');
  //     this.vehical.controls['hypothecationTypeName'].patchValue('');
  //     this.vehical.controls['hypothecationAddress1'].patchValue('');
  //     this.vehical.controls['hypothecationAddress2'].patchValue('');
  //     this.vehical.controls['hypothecationBankName'].patchValue('');
  //     // this.vehical.controls['hypothecationBankNamevalue'].patchValue('');
  //     this.photos='';
  //   }
  // }
  selectPolicy(){
    // MOT-PLT-002
    if( this.vehical.controls['policyType'].value == 'MOT-PLT-002'){
      this.policyTypeDetails = true;
      this.vehical.controls['nilDepreciationCover'].patchValue('');
      this.vehical.controls['electricalAccess'].patchValue('');
      this.vehical.controls['nonElectricalAccess'].patchValue('');
      this.vehical.controls['antiTheft'].patchValue('');
      this.vehical.controls['paforUnnamed'].patchValue('');


    } else {
      this.policyTypeDetails = false;
      this.vehical.controls['lltoPaidDriver'].patchValue('');
    }
  }
  // NEXT BUTTON
  vehicalDetails(stepper: MatStepper, value) {
    sessionStorage.stepper2 = '';
    sessionStorage.stepper2 = JSON.stringify(value);
    let valid = 20 / 100;
    this.siValue = valid * this.buyBikeDetails.Idv;
    console.log(this.siValue, 'sdfdfdadf');
    // if (this.vehical.valid && this.electricalSumAount==false && this.nonElectricalSumAount==false && this.pASumAount==false) {
    //   stepper.next();
    //   this.topScroll();
    // }

    if(this.vehical.valid && this.electricalSumAount==false && this.nonElectricalSumAount==false && this.pASumAount==false) {
      let dialogRef = this.dialog.open(shriram4WCover, {
        width: '500px',
        height: '300px'
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

    }else{
      this.toastr.error('Please Fill the Mandatory Fields')
    }
  }




  // THIRD STEPPER
  //       previousClaim(){
  //           if(this.previousInsure.controls['policyClaim'].value == 1) {
  //             this.claimList = true;
  //             this.claimpercent();
  //           }  else {
  //             this.claimList = false;
  //
  //           }
  //       }
  claimpercent() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0'

    }
    this.fwService.getClaimList(data).subscribe(
        (successData) => {
          this.claimSuccess(successData);
        },
        (error) => {
          this.claimFailure(error);
        }
    );
  }
  public claimSuccess(successData){
    if (successData.IsSuccess) {
      this.claimDetails = successData.ResponseObject;
    }
  }
  public claimFailure(error) {
  }

  getHBankLists() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0'

    }
    this.fwService.getHypoBankList(data).subscribe(
        (successData) => {
          this.HBankSuccess(successData);
        },
        (error) => {
          this.HBankFailure(error);
        }
    );
  }
  public HBankSuccess(successData) {
    if (successData.IsSuccess) {
      this.getBankHypoDetails = successData.ResponseObject.bankdetails;
      // this.getBankHypoDetails = successData.ResponseObject;
      console.log(this.getBankHypoDetails,'cityDetails......');
      //
    }
  }
  public HBankFailure(error) {
  }

  hypothecationBankListName() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'bank_id':this.vehical.controls['hypothecationBankName'].value
    }
    this.fwService.getHypoBankName(data).subscribe(
        (successData) => {
          this.financierNamesuccess(successData);
        },
        (error) => {
          this.financierNameFailure(error);
        }
    );
  }

  public financierNamesuccess(successData) {
    if (successData.IsSuccess == true) {
      // this.errortoaster = true;

      this.photos = successData.ResponseObject.bank_name;
      this.vehical.controls['hypothecationBankNamevalue'].patchValue(this.photos)

      console.log(this.photos,'photos');
      console.log(this.vehical.controls['hypothecationBankNamevalue'].value,'hypothecationBankNamevalue...');

    }
    // else {
    //     this.errortoaster = false;
    //     this.toastr.error(successData.ErrorObject);
    // }
  }

  public financierNameFailure(error) {
  }

  // from date
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
        selectedDate = event.value._i;
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (selectedDate.length == 10) {
          let year = new Date(dob);
          let getPolicyYear = year.getFullYear();
          this.previousInsure.controls['policyUwYear'].patchValue(getPolicyYear);
        }

        //sessionStorage.insuredAgePA = this.bikeProposerAge;
      }   else if (typeof event.value._i == 'object') {
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (dob.length == 10) {
          let year = new Date(dob);
          let getPolicyYear = year.getFullYear();
          this.previousInsure.controls['policyUwYear'].patchValue(getPolicyYear);

        }
      }

    }
    // let start = this.datepipe.transform(new Date(this.previousInsure.controls['previousdob'].value), 'y-MM-dd');
    // let end = this.datepipe.transform(new Date(this.previousInsure.controls['previousdEndob'].value), 'y-MM-dd');
    // var d = new Date(this.previousInsure.controls['previousdob'].value);
    // var year = d.getFullYear();
    // var month = d.getMonth();
    // var day = d.getDate();
    // for (let i = 1; i <= 3; i++) {
    //     this.policyDatevalidate.push(this.getFormattedDate(new Date(year + i, month, day - 1)));
    // }
    // console.log(this.policyDatevalidate, 'this.policyDatevalidate');
    // sessionStorage.policyDatevalidateArray = JSON.stringify(this.policyDatevalidate);
  }

  previousInsureType() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0'

    }
    this.fwService.getPreviousList(data).subscribe(
        (successData) => {
          this.previousInsureSuccess(successData);
        },
        (error) => {
          this.previousInsureFailure(error);
        }
    );
  }
  public previousInsureSuccess(successData){
    if (successData.IsSuccess) {
      this.previousList = successData.ResponseObject;
    }
  }
  public previousInsureFailure(error) {
  }

  voluntaryExcess() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0'

    }
    this.fwService.getvoluntaryExcess(data).subscribe(
        (successData) => {
          this.voluntaryExcessSuccess(successData);
        },
        (error) => {
          this.voluntaryExcessFailure(error);
        }
    );
  }
  public voluntaryExcessSuccess(successData){
    if (successData.IsSuccess) {
      this.voluntaryList = successData.ResponseObject;
    }
  }
  public voluntaryExcessFailure(error) {
  }
  vlountaryName(){
    this.vehical.controls['voluntaryExcessName'].patchValue(this.voluntaryList[this.vehical.controls['voluntaryExcess'].value]);

  }

  uvYear(){
    if(this.previousInsure.controls['policyUwYear'].value > 2000){

    }

  }
  getFormattedDate(newdate) {
    var todayTime = new Date();
    var month = newdate .getMonth() + 1;
    var day = newdate .getDate();
    var year =newdate .getFullYear();
    return year + "-" + this.changeValidate(month,2, 0) + "-" + this.changeValidate(day,2, 0);
  }

  changeValidate(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }
  previousNilError(){
    console.log(this.previousInsure.controls['policyNilDescription'].value,'456787656789')
    if ((this.previousInsure.controls['policyNilDescription'].value==''||this.previousInsure.controls['policyNilDescription'].value==undefined||this.previousInsure.controls['policyNilDescription'].value==null)) {
      // alert(this.bikeInsurance.controls['previousClaim'].value)
      this.PreviousValid=true;
      this.PreviousValid = 'Please Select Previous Nil Description';

    } else {
      this.PreviousValid=false;
      this.PreviousValid='';
    }
    console.log(this.PreviousValid,'this.ClaimValid///')
  }

  previousDetails(stepper: MatStepper, value) {
    console.log(value, 'vvvvvv');
    sessionStorage.stepper3 = '';
    sessionStorage.stepper3 = JSON.stringify(value);
   if(this.paOwnerValue==true){
    if (this.previousInsure.valid) {
      if( (this.vehical.controls['nilDepreciationCover'].value==true && this.previousInsure.controls['policyNilDescription'].value==1)||(this.vehical.controls['nilDepreciationCover'].value==false&&(this.previousInsure.controls['policyNilDescription'].value==0||this.previousInsure.controls['policyNilDescription'].value==1))){
        stepper.next();
        this.topScroll();
      }else{
        this.toastr.error('Previous Nil Description  should be Enable. If u select Nil Depreciation Cover ')
      }

    }
   }else  if(this.paOwnerValue==false){
       if (this.previousInsure.valid) {
           if( (this.vehical.controls['nilDepreciationCover'].value==true && this.previousInsure.controls['policyNilDescription'].value==1)||(this.vehical.controls['nilDepreciationCover'].value==false&&(this.previousInsure.controls['policyNilDescription'].value==0||this.previousInsure.controls['policyNilDescription'].value==1))){
               // stepper.next();
               this.topScroll();
               this.proposal(stepper);
           }else{
               this.toastr.error('Previous Nil Description  should be Enable. If u select Nil Depreciation Cover ')
           }
       }
   }

  }

//  fFOURTH sTEPPER (NOMINEE)
  ageNominee(){
    if(this.nomineeDetail.controls['nomineeAge'].value <= 17){
      this.apponiteeList = true;
    }  else{
      this.apponiteeList = false;
      this.nomineeDetail.controls['appointeeName'].patchValue('');
      this.nomineeDetail.controls['appointeeRelationship'].patchValue('');

    }
  }
  //RELATIONSHIP
  nomineeRelationShip(){
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.fwService.getNomineeRelationship(data).subscribe(
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
  public nomineeRelationFailure(error){
  }

  nomineeDetails(stepper: MatStepper, value){
    sessionStorage.stepper4 = '';
    sessionStorage.stepper4 = JSON.stringify(value);
    if(this.nomineeDetail.valid){
      if(this.nomineeDetail['controls'].nomineeAge.value > 17) {
        this.proposal(stepper);
      } else {
        if(this.nomineeDetail['controls'].appointeeName.value !="" && this.nomineeDetail['controls'].appointeeRelationship.value !="")  {
          this.proposal(stepper);
        }   else {
          this.toastr.error('Please fill the appointee details');
        }
      }
    }

  }
  // VALIDATION
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
  spac(event: any){
    this.validation.spac(event);

  }
  idValidate(event: any) {
    this.validation.idValidate(event);
  }
  numDotValidate(event: any) {
    this.validation.numDotValidate(event);
  }
  topScroll() {
    document.getElementById('main-content').scrollTop = 0;
  }

  paExcluseName(){
    this.vehical.controls['PAExclusionName'].patchValue(this.PAExclusionList[this.vehical.controls['PAExclusion'].value]);
  }

  getCover(stepper) {

    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
      'enquiry_id': this.bikeEnquiryId,
      "created_by": "",
      'proposal_id': sessionStorage.shiramFwProposalID == '' || sessionStorage.shiramFwProposalID == undefined ? '' : sessionStorage.shiramFwProposalID,
      "geogrophicalExtensionCover": "false",
      "package_type": this.packagelist,

      "motorProposalObj": {
        // "PreviousPolicyFromDt": this.previousInsure.controls['previousdob'].value,
        "InsuredPrefix": this.titleId,
        "InsuredName": this.proposer.controls['name'].value,
        "Gender": this.proposer.controls['gender'].value == 'Male' ? 'M' : 'F',
        "Address1": this.proposer.controls['address'].value,
        "Address2": this.proposer.controls['address2'].value,
        "Address3": this.proposer.controls['address3'].value,
        "State": 'TN',
        "City": this.proposer.controls['city'].value,
        "PinCode": this.proposer.controls['pincode'].value,
        "PanNo": this.proposer.controls['pan'].value,
        "TelephoneNo": "",
        "FaxNo": "",
        "GSTNo": "",
        "EMailID": this.proposer.controls['email'].value,
        "PolType": this.vehical.controls['policyType'].value,
        "ProposalType": this.vehical.controls['proposalType'].value,
        "MobileNo": this.proposer.controls['mobile'].value,
        "DateOfBirth": this.proposer.controls['dob'].value,
        "CoverNoteNo": "",
        "CoverNoteDt": "",
        "IDV_of_Vehicle": this.buyBikeDetails.Idv,
        "Colour": this.vehical.controls['vehicleColour'].value,
        "NoEmpCoverLL": "",
        "VehiclePurposeYN": "",
        "DriverAgeYN": "0",
        "LimitOwnPremiseYN": "1",
        "CNGKitYN": this.vehical.controls['CNGKit'].value == true ? '1' : '0',
        "CNGKitSI": this.vehical.controls['CNGKitSI'].value,
        "LimitedTPPDYN": "1",
        "InBuiltCNGKitYN": "0",
        "VoluntaryExcess": this.vehical.controls['voluntaryExcess'].value,
        "Bangladesh": "0",
        "Bhutan": "0",
        "SriLanka": "0",
        "Pakistan": "0",
        "Nepal": "0",
        "Maldives": "0",
        "DeTariff": "0",
        "PreInspectionReportYN": "0",
        "PreInspection": "",
        "BreakIn": "NO",
        "AddonPackage": this.buyBikeDetails.plan_code,
        "NilDepreciationCoverYN": this.vehical.controls['nilDepreciationCover'].value == true ? '1' : '0',
        "PAforUnnamedPassengerYN": this.vehical.controls['paforUnnamed'].value == true ? '1' : '0',
        "PAforUnnamedPassengerSI": this.vehical.controls['paforUnnamedSI'].value,
        "ElectricalaccessYN": this.vehical.controls['electricalAccess'].value == true ? '1' : '0',
        "ElectricalaccessSI": this.vehical.controls['electricalAccessSI'].value,
        "NonElectricalaccessYN": this.vehical.controls['nonElectricalAccess'].value == true ? '1' : '0',
        "NonElectricalaccessSI":  this.vehical.controls['nonElectricalAccessSI'].value,
        "PAPaidDriverConductorCleanerYN": this.vehical.controls['paPaidDriver'].value == true ? '1' : '0',
        "PAPaidDriverConductorCleanerSI": this.vehical.controls['paPaidDriverSI'].value,
        "PAPaidDriverCount": this.vehical.controls['PAPaidDriverCount'].value,
        "PAPaidConductorCount": this.vehical.controls['PAPaidConductorCount'].value,
        "PAPaidCleanerCount": this.vehical.controls['PAPaidCleanerCount'].value,
        "ElectricalaccessRemarks": "",
        "NonElectricalaccessRemarks": "",
        "SpecifiedPersonField": "",
        "PAOwnerDriverExclusion": this.vehical.controls['isPAExclusion'].value == true ? '1' : '0',
        "PAOwnerDriverExReason": this.vehical.controls['PAExclusion'].value,
        "NomineeNameforPAOwnerDriver": "Dhinedh",
        "NomineeAgeforPAOwnerDriver": "22",
        "NomineeRelationforPAOwnerDriver": "Son",
        "AppointeeNameforPAOwnerDriver": "",
        "AppointeeRelationforPAOwnerDriver": "",
        "LLtoPaidDriverYN": this.vehical.controls['lltoPaidDriver'].value == true ? '1' : '0',
        "AntiTheftYN": this.vehical.controls['antiTheft'].value == true ? '1' : '0',
        "PreviousPolicyNo": "879797979",
        "PreviousInsurer": "Bajaj Allianz General Insurance Company Limited",
        "PreviousPolicySI": "100000",
        "PreviousPolicyType": "MOT-PLT-001",
        "PreviousNilDepreciation": "1",
        "HypothecationType": "",
        "HypothecationBankName": "",
        "HypothecationAddress1": "",
        "HypothecationAddress2": "",
        "HypothecationAddress3": "",
        "HypothecationAgreementNo": "",
        "HypothecationCountry": "",
        "HypothecationState": "",
        "HypothecationCity": "",
        "HypothecationPinCode": "",
          // "PAOwnerDriver":  this.vehical.controls['paOwnerDriver'].value== true ? '1' : '0' ,
          "MultiCarBenefitYN": "N",
        "KeyReplacementYN": "Y",
        "LossOfPersonBelongYN": "Y"
      },
    }
    this.settings.loadingSpinner = true;
    this.fwService.getCoverPremium(data).subscribe(
        (successData) => {
          this.coverSuccess(successData,stepper);
        },
        (error) => {
          this.coverFailure(error);
        }
    );
  }
  public coverSuccess(successData,stepper){

    if (successData.IsSuccess) {
      this.coverPremium = successData.ResponseObject.cover;
      this.electrical_cover = this.coverPremium.electrical_cover;
      sessionStorage.electrical_cover=this.electrical_cover;

      this.anti_theft_cover = this.coverPremium.anti_theft_cover;
      sessionStorage.anti_theft_cover=this.anti_theft_cover;

      this.Nil_depreciation_cover = this.coverPremium.Nil_depreciation_cover;
      sessionStorage.Nil_depreciation_cover=this.Nil_depreciation_cover;

      this.pa_owner_driver = this.coverPremium.pa_owner_driver;
      sessionStorage.pa_owner_driver=this.pa_owner_driver;

      this.pa_unnamed_passenger_cover = this.coverPremium.pa_unnamed_passenger_cover;
      sessionStorage.pa_unnamed_passenger_cover=this.pa_unnamed_passenger_cover;
      this.settings.loadingSpinner = false;
      this.vehicalDetails(stepper,this.vehical.value)
      // this.electricalAmount();
      // this.electricalNonAmount();
      // this.unnamedPassengerAmount();
      // this.antiTheftAmount();
      // // this.paOwnerDriverAmount();
      // this.depreciationAmount();
    }
    else{
      this.settings.loadingSpinner = false;
        this.toastr.error(successData.ErrorObject);
      }
  }
  public coverFailure(error) {
  }

  // proposal Creation

  proposal(stepper) {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
      'enquiry_id': this.bikeEnquiryId,
      "created_by": "",
      'proposal_id': sessionStorage.shiramFwProposalID == '' || sessionStorage.shiramFwProposalID == undefined ? '' : sessionStorage.shiramFwProposalID,
      "geogrophicalExtensionCover": "false",
      "package_type": this.packagelist,

      "motorProposalObj": {
        // "PreviousPolicyFromDt": this.previousInsure.controls['previousdob'].value,
        "InsuredPrefix": this.titleId,
        "InsuredName": this.proposer.controls['name'].value,
        "Gender": this.proposer.controls['gender'].value == 'Male' ? 'M' : 'F',
        "Address1": this.proposer.controls['address'].value,
        "Address2": this.proposer.controls['address2'].value,
        "Address3": this.proposer.controls['address3'].value,
        "State": 'TN',
        "City": this.proposer.controls['city'].value,
        "PinCode": this.proposer.controls['pincode'].value,
        "PanNo": this.proposer.controls['pan'].value,
        "TelephoneNo": "",
        "FaxNo": "",
        "GSTNo": "",
        "EMailID": this.proposer.controls['email'].value,
        "PolType": this.vehical.controls['policyType'].value,
        "ProposalType": this.vehical.controls['proposalType'].value,
        "MobileNo": this.proposer.controls['mobile'].value,
        "DateOfBirth": this.proposer.controls['dob'].value,
        "CoverNoteNo": "",
        "CoverNoteDt": "",
        "IDV_of_Vehicle": this.buyBikeDetails.Idv,
        "Colour": this.vehical.controls['vehicleColour'].value,
        "NoEmpCoverLL": "",
        "VehiclePurposeYN": "",
        "DriverAgeYN": "0",
        "LimitOwnPremiseYN": this.vehical.controls['limitOwnPremise'].value == true ? '1' : '0',
        "CNGKitYN": this.vehical.controls['CNGKit'].value == true ? '1' : '0',
        "CNGKitSI": this.vehical.controls['CNGKitSI'].value,
        "LimitedTPPDYN": this.vehical.controls['limitedTPPD'].value == true ? '1' : '0',
        "InBuiltCNGKitYN": this.vehical.controls['builtCNGKit'].value == true ? '1' : '0',
        "VoluntaryExcess": this.vehical.controls['voluntaryExcess'].value,
        "Bangladesh": this.vehical.controls['Bangladesh'].value == true ? '1' : '0',
        "Bhutan": this.vehical.controls['Bhutan'].value == true ? '1' : '0',
        "SriLanka": this.vehical.controls['SriLanka'].value == true ? '1' : '0',
        "Pakistan": this.vehical.controls['Pakistan'].value == true ? '1' : '0',
        "Nepal": this.vehical.controls['Nepal'].value == true ? '1' : '0',
        "Maldives": this.vehical.controls['Maldives'].value == true ? '1' : '0',
        "DeTariff": this.vehical.controls['DeTariff'].value == true ? '1' : '0',
        "PreInspectionReportYN": "0",
        "PreInspection": "",
        "BreakIn": "NO",
        "AddonPackage": this.buyBikeDetails.plan_code,
        "NilDepreciationCoverYN": this.vehical.controls['nilDepreciationCover'].value == true ? '1' : '0',
        "PAforUnnamedPassengerYN": this.vehical.controls['paforUnnamed'].value == true ? '1' : '0',
        "PAforUnnamedPassengerSI": this.vehical.controls['paforUnnamedSI'].value,
        "ElectricalaccessYN": this.vehical.controls['electricalAccess'].value == true ? '1' : '0',
        "ElectricalaccessSI": this.vehical.controls['electricalAccessSI'].value,
        "NonElectricalaccessYN": this.vehical.controls['nonElectricalAccess'].value == true ? '1' : '0',
        "NonElectricalaccessSI":  this.vehical.controls['nonElectricalAccessSI'].value,
        "PAPaidDriverConductorCleanerYN": this.vehical.controls['paPaidDriver'].value == true ? '1' : '0',
        "PAPaidDriverConductorCleanerSI": this.vehical.controls['paPaidDriverSI'].value,
        "PAPaidDriverCount": this.vehical.controls['PAPaidDriverCount'].value,
        "PAPaidConductorCount": this.vehical.controls['PAPaidConductorCount'].value,
        "PAPaidCleanerCount": this.vehical.controls['PAPaidCleanerCount'].value,
        "ElectricalaccessRemarks": "",
        "NonElectricalaccessRemarks": "",
        "SpecifiedPersonField": "",
        "PAOwnerDriverExclusion": this.vehical.controls['isPAExclusion'].value == true ? '1' : '0',
        "PAOwnerDriverExReason": this.vehical.controls['PAExclusion'].value,
        "NomineeNameforPAOwnerDriver": this.nomineeDetail.controls['nomineeName'].value,
        "NomineeAgeforPAOwnerDriver": this.nomineeDetail.controls['nomineeAge'].value,
        "NomineeRelationforPAOwnerDriver": this.nomineeDetail.controls['nomineeRelationship'].value,
        "AppointeeNameforPAOwnerDriver": this.nomineeDetail.controls['appointeeName'].value,
        "AppointeeRelationforPAOwnerDriver": this.nomineeDetail.controls['appointeeRelationship'].value,
        "LLtoPaidDriverYN": this.vehical.controls['lltoPaidDriver'].value == true ? '1' : '0',
        "AntiTheftYN": this.vehical.controls['antiTheft'].value == true ? '1' : '0',
        "PreviousPolicyNo": this.previousInsure.controls['policyNumber'].value,
        "PreviousInsurer": this.previousInsure.controls['previousInsured'].value,
        "PreviousPolicySI": this.previousInsure.controls['policySi'].value,
        "PreviousPolicyType": this.previousInsure.controls['previousPolicyType'].value,
        "PreviousNilDepreciation": this.previousInsure.controls['policyNilDescription'].value == 1? '1' : '0',
        "HypothecationType": this.vehical.controls['hypothecationType'].value ? this.vehical.controls['hypothecationType'].value : '',
        "HypothecationBankName": this.vehical.controls['hypothecationBankNamevalue'].value==undefined||null?'':this.vehical.controls['hypothecationBankNamevalue'].value,
        // "HypothecationBankName": this.vehical.controls['hypothecationBankName'].value ? this.vehical.controls['hypothecationBankName'].value : '' ,
        "HypothecationAddress1": this.vehical.controls['hypothecationAddress1'].value ?  this.vehical.controls['hypothecationAddress1'].value: '',
        "HypothecationAddress2": this.vehical.controls['hypothecationAddress2'].value?  this.vehical.controls['hypothecationAddress2'].value : '',
        "HypothecationAddress3": this.vehical.controls['hypothecationAddress3'].value? this.vehical.controls['hypothecationAddress3'].value: '',
        "HypothecationAgreementNo": this.vehical.controls['hypothecationAgreementNo'].value ? this.vehical.controls['hypothecationAgreementNo'].value: '',
        "HypothecationCountry": "",
        "HypothecationState":  this.vehical.controls['state'].value ? this.vehical.controls['state'].value: '',
        "HypothecationCity":  this.vehical.controls['city'].value ? this.vehical.controls['city'].value : '',
        "HypothecationPinCode":  this.vehical.controls['pincode'].value ? this.vehical.controls['pincode'].value : '',
        // "PAOwnerDriver":  this.vehical.controls['paOwnerDriver'].value== true ? '1' : '0' ,
        "MultiCarBenefitYN":"N",
        "KeyReplacementYN":"Y",
        "LossOfPersonBelongYN":"Y"
      },
    }
    console.log(data,'fileeee');
    this.settings.loadingSpinner = true;

    this.fwService.proposalCreation(data).subscribe(
        (successData) => {
          this.proposalSuccess(successData,stepper);
        },
        (error) => {
          this.proposalFailure(error);
        }
    );
  }
  public proposalSuccess(successData, stepper){
    this.settings.loadingSpinner = false;
    if(successData.IsSuccess){
      stepper.next();
      this.topScroll();

      this.toastr.success('Proposal created successfully!!');
      this.summaryData = successData.ResponseObject;
      sessionStorage.summaryData = JSON.stringify(this.summaryData);
      this.ProposalId =   this.summaryData.ProposalId;
      this.PaymentRedirect =   this.summaryData.PaymentRedirect;
      this.PolicySisID =   this.summaryData.PolicySisID;
      this.PaymentReturn =   this.summaryData.PaymentReturn;
      sessionStorage.shiramFwProposalID = this.ProposalId;
      this.proposerFormData = this.proposer.value;
      this.vehicalFormData = this.vehical.value;
      this.previousFormData = this.previousInsure.value;
      this.nomineeFormData = this.nomineeDetail.value;

      this.electrical_cover = this.summaryData.cover.electrical_cover;
      sessionStorage.Nil_depreciation_cover = ( this.Nil_depreciation_cover);

      this.basic_od_cover = this.summaryData.cover.basic_od_cover;
      sessionStorage.basic_od_cover = ( this.basic_od_cover);

      this.basic_tp_cover = this.summaryData.cover.basic_tp_cover;
      sessionStorage.basic_tp_cover = ( this.basic_tp_cover);

      this.od_total = this.summaryData.cover.od_total;
      sessionStorage.od_total = ( this.od_total);

      this.cng_lpg_cover = this.summaryData.cover.cng_lpg_cover;
      sessionStorage.cng_lpg_cover = ( this.cng_lpg_cover);

      this.gst = this.summaryData.cover.gst;
      sessionStorage.gst = ( this.gst);

      this.anti_theft_cover = this.summaryData.cover.anti_theft_cover;
      sessionStorage.anti_theft_cover = ( this.anti_theft_cover);

      this.Nil_depreciation_cover = this.summaryData.cover.Nil_depreciation_cover;
      sessionStorage.Nil_depreciation_cover = ( this.Nil_depreciation_cover);

      this.LL_paid_driver = this.summaryData.cover.LL_paid_driver;
      sessionStorage.LL_paid_driver = ( this.LL_paid_driver);

      this.pa_owner_driver = this.summaryData.cover.pa_owner_driver;
      sessionStorage.pa_owner_driver = ( this.pa_owner_driver);

      this.Ncb = this.summaryData.cover.Ncb;
      sessionStorage.Ncb = ( this.Ncb);

      this.pa_unnamed_passenger_cover = this.summaryData.cover.pa_unnamed_passenger_cover;
      sessionStorage.Ncb = ( this.pa_unnamed_passenger_cover);

      this.detariff = this.summaryData.cover.detariff;
      sessionStorage.detariff = ( this.detariff);


      sessionStorage.proposerFormData = JSON.stringify(this.proposerFormData);
      sessionStorage.vehicalFormData = JSON.stringify(this.vehicalFormData);
      sessionStorage.previousFormData = JSON.stringify(this.previousFormData);
      sessionStorage.nomineeFormData = JSON.stringify(this.nomineeFormData);
      console.log(this.vehicalFormData,'this.proposerFormData');

      this.electrical_cover= sessionStorage.electrical_cover;
      this.basic_od_cover= sessionStorage.basic_od_cover;
      this.basic_tp_cover=  sessionStorage.basic_tp_cover;
      this.od_total=  sessionStorage.od_total;
      this.cng_lpg_cover= sessionStorage.cng_lpg_cover;
      this.gst=sessionStorage.gst;
      this.anti_theft_cover= sessionStorage.anti_theft_cover;
      this.Nil_depreciation_cover=sessionStorage.Nil_depreciation_cover;
      this.LL_paid_driver= sessionStorage.LL_paid_driver;
      this.pa_owner_driver=sessionStorage.pa_owner_driver;
      this.Ncb=sessionStorage.Ncb;
      this.pa_unnamed_passenger_cover=sessionStorage.pa_unnamed_passenger_cover;
      this.detariff=sessionStorage.detariff;
    }
    // else if(successData.IsSuccess==false){
      // this.settings.loadingSpinner = false;
      // if(successData.ErrorObject.type == 'idv') {
      //   this.toastr.error(successData.ErrorObject.ErrorObject);
      //   let dialogRef = this.dialog.open(fourShriramIDVComponent, {
      //     width: '700px',
      //     data: {name: this.buyBikeDetails}
      //   });
      //   dialogRef.disableClose = true;
      //   dialogRef.afterClosed().subscribe(result => {
      //     if (result) {
      //       this.idvValuess = result;
      //       this.idvAmount=this.idvValuess.id;
      //       this.electricAmount=this.idvValuess.question1;
      //       this.nonElectricAmount=this.idvValuess.question2;
      //       console.log(result,'resulit.........');
      //       console.log(this.idvValuess,'23456787656789876');
      //       // console.log(this.checkValue,'23451111111');
      //
      //     }
      //     this.updateProposal(stepper);
      //     console.log('The dialog was closed');
      //   });
      // }
      else{
      this.toastr.error(successData.ErrorObject);
      }
    // }
  }
  public proposalFailure(error){

  }

  // updateProposal(stepper){
  //     const data = {
  //       'platform': 'web',
  //       'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
  //       'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
  //       'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
  //       'enquiry_id': this.bikeEnquiryId,
  //       "created_by": "",
  //       'proposal_id': sessionStorage.shiramFwProposalID == '' || sessionStorage.shiramFwProposalID == undefined ? '' : sessionStorage.shiramFwProposalID,
  //       "geogrophicalExtensionCover": "false",
  //       "package_type": this.packagelist,
  //
  //       "motorProposalObj": {
  //         // "PreviousPolicyFromDt": this.previousInsure.controls['previousdob'].value,
  //         "InsuredPrefix": "1",
  //         "InsuredName": this.proposer.controls['name'].value,
  //         "Gender": this.proposer.controls['gender'].value == 'Male' ? 'M' : 'F',
  //         "Address1": this.proposer.controls['address'].value,
  //         "Address2": this.proposer.controls['address2'].value,
  //         "Address3": this.proposer.controls['address3'].value,
  //         "State": 'TN',
  //         "City": this.proposer.controls['city'].value,
  //         "PinCode": this.proposer.controls['pincode'].value,
  //         "PanNo": this.proposer.controls['pan'].value,
  //         "TelephoneNo": "",
  //         "FaxNo": "",
  //         "GSTNo": "",
  //         "EMailID": this.proposer.controls['email'].value,
  //         "PolType": this.vehical.controls['policyType'].value,
  //         "ProposalType": this.vehical.controls['proposalType'].value,
  //         "MobileNo": this.proposer.controls['mobile'].value,
  //         "DateOfBirth": this.proposer.controls['dob'].value,
  //         "CoverNoteNo": "",
  //         "CoverNoteDt": "",
  //         "IDV_of_Vehicle": this.idvAmount,
  //         "Colour": this.vehical.controls['vehicleColour'].value,
  //         "NoEmpCoverLL": "",
  //         "VehiclePurposeYN": "",
  //         "DriverAgeYN": "0",
  //         "LimitOwnPremiseYN": "0",
  //         "CNGKitYN": "0",
  //         "CNGKitSI": "",
  //         "LimitedTPPDYN": "0",
  //         "InBuiltCNGKitYN": "0",
  //         "VoluntaryExcess": "TWVE1",
  //         "Bangladesh": this.vehical.controls['Bangladesh'].value == true ? '1' : '0',
  //         "Bhutan": this.vehical.controls['Bhutan'].value == true ? '1' : '0',
  //         "SriLanka": this.vehical.controls['SriLanka'].value == true ? '1' : '0',
  //         "Pakistan": this.vehical.controls['Pakistan'].value == true ? '1' : '0',
  //         "Nepal": this.vehical.controls['Nepal'].value == true ? '1' : '0',
  //         "Maldives": this.vehical.controls['Maldives'].value == true ? '1' : '0',
  //         "DeTariff": this.vehical.controls['DeTariff'].value == true ? '1' : '0',
  //         "PreInspectionReportYN": "0",
  //         "PreInspection": "",
  //         "BreakIn": "NO",
  //         "AddonPackage": this.buyBikeDetails.plan_code,
  //         "NilDepreciationCoverYN": this.vehical.controls['nilDepreciationCover'].value == true ? '1' : '0',
  //         "PAforUnnamedPassengerYN": this.vehical.controls['paforUnnamed'].value == true ? '1' : '0',
  //         "PAforUnnamedPassengerSI": this.vehical.controls['paforUnnamedSI'].value,
  //         "ElectricalaccessYN": this.electricAmount != '' ? '1' : '0',
  //         "ElectricalaccessSI":  this.electricAmount,
  //         "NonElectricalaccessYN": this.nonElectricAmount != '' ? '1' : '0',
  //         "NonElectricalaccessSI":  this.nonElectricAmount,
  //         "PAPaidDriverConductorCleanerYN": "0",
  //         "PAPaidDriverConductorCleanerSI": "",
  //         "PAPaidDriverCount": "",
  //         "PAPaidConductorCount": "",
  //         "PAPaidCleanerCount": "",
  //         "ElectricalaccessRemarks": "",
  //         "NonElectricalaccessRemarks": "",
  //         "SpecifiedPersonField": "",
  //         "PAOwnerDriverExclusion": "",
  //         "PAOwnerDriverExReason": "",
  //         "NomineeNameforPAOwnerDriver": this.nomineeDetail.controls['nomineeName'].value,
  //         "NomineeAgeforPAOwnerDriver": this.nomineeDetail.controls['nomineeAge'].value,
  //         "NomineeRelationforPAOwnerDriver": this.nomineeDetail.controls['nomineeRelationship'].value,
  //         "AppointeeNameforPAOwnerDriver": this.nomineeDetail.controls['appointeeName'].value,
  //         "AppointeeRelationforPAOwnerDriver": this.nomineeDetail.controls['appointeeRelationship'].value,
  //         "LLtoPaidDriverYN": this.vehical.controls['lltoPaidDriver'].value == true ? '1' : '0',
  //         "AntiTheftYN": this.vehical.controls['antiTheft'].value == true ? '1' : '0',
  //         "PreviousPolicyNo": this.previousInsure.controls['policyNumber'].value,
  //         "PreviousInsurer": this.previousInsure.controls['previousInsured'].value,
  //         "PreviousPolicySI": this.previousInsure.controls['policySi'].value,
  //         "PreviousPolicyType": this.previousInsure.controls['previousPolicyType'].value,
  //         "PreviousNilDepreciation": this.previousInsure.controls['policyNilDescription'].value,
  //         "HypothecationType": this.vehical.controls['hypothecationType'].value ? this.vehical.controls['hypothecationType'].value : '',
  //         "HypothecationBankName": this.vehical.controls['hypothecationBankNamevalue'].value==undefined||null?'':this.vehical.controls['hypothecationBankNamevalue'].value,
  //         // "HypothecationBankName": this.vehical.controls['hypothecationBankName'].value ? this.vehical.controls['hypothecationBankName'].value : '' ,
  //         "HypothecationAddress1": this.vehical.controls['hypothecationAddress1'].value ?  this.vehical.controls['hypothecationAddress1'].value: '',
  //         "HypothecationAddress2": this.vehical.controls['hypothecationAddress2'].value?  this.vehical.controls['hypothecationAddress2'].value : '',
  //         "HypothecationAddress3": this.vehical.controls['hypothecationAddress3'].value? this.vehical.controls['hypothecationAddress3'].value: '',
  //         "HypothecationAgreementNo": this.vehical.controls['hypothecationAgreementNo'].value ? this.vehical.controls['hypothecationAgreementNo'].value: '',
  //         "HypothecationCountry": "",
  //         "HypothecationState":  this.vehical.controls['state'].value ? this.vehical.controls['state'].value: '',
  //         "HypothecationCity":  this.vehical.controls['city'].value ? this.vehical.controls['city'].value : '',
  //         "HypothecationPinCode":  this.vehical.controls['pincode'].value ? this.vehical.controls['pincode'].value : '',
  //         "MultiCarBenefitYN":"N",
  //         "KeyReplacementYN":"Y",
  //         "LossOfPersonBelongYN":"Y"
  //       },
  //     }
  //     console.log(data,'fileeee');
  //     this.settings.loadingSpinner = true;
  //
  //     this.fwService.proposalCreation(data).subscribe(
  //         (successData) => {
  //           this.updateProposalSuccess(successData,stepper);
  //         },
  //         (error) => {
  //           this.updateProposalFailure(error);
  //         }
  //     );
  //   }
  // public updateProposalSuccess(successData, stepper){
  //     this.settings.loadingSpinner = false;
  //     if(successData.IsSuccess){
  //       stepper.next();
  //       this.topScroll();
  //
  //       this.toastr.success('Proposal created successfully!!');
  //       this.summaryData = successData.ResponseObject;
  //       sessionStorage.summaryData = JSON.stringify(this.summaryData);
  //       this.ProposalId =   this.summaryData.ProposalId;
  //       this.PaymentRedirect =   this.summaryData.PaymentRedirect;
  //       this.PolicySisID =   this.summaryData.PolicySisID;
  //       this.PaymentReturn =   this.summaryData.PaymentReturn;
  //       sessionStorage.shiramFwProposalID = this.ProposalId;
  //       this.proposerFormData = this.proposer.value;
  //       this.vehicalFormData = this.vehical.value;
  //       this.previousFormData = this.previousInsure.value;
  //       this.nomineeFormData = this.nomineeDetail.value;
  //       sessionStorage.proposerFormData = JSON.stringify(this.proposerFormData);
  //       sessionStorage.vehicalFormData = JSON.stringify(this.vehicalFormData);
  //       sessionStorage.previousFormData = JSON.stringify(this.previousFormData);
  //       sessionStorage.nomineeFormData = JSON.stringify(this.nomineeFormData);
  //       console.log(this.vehicalFormData,'this.proposerFormData');
  //
  //     } else{
  //         this.toastr.error(successData.ErrorObject);
  //       }
  //
  //   }
  // public updateProposalFailure(error){
  //
  //   }





  // alternateChange(event) {
  //   if (event.target.value.length == 10) {
  //     if(event.target.value == this.proposer.get('mobile').value) {
  //       this.mobileNumber = 'Alternate number should be different from mobile number';
  //     } else {
  //       this.mobileNumber = '';
  //     }
  //   } else {
  //     // this.mobileNumber = 'false';
  //   }
  //   sessionStorage.mobileNumber = this.mobileNumber;
  // }

  // session Data
  sessionData() {
    if (sessionStorage.stepper1 != '' && sessionStorage.stepper1 != undefined) {
      let stepper1 = JSON.parse(sessionStorage.stepper1);
      this.getPostalCode('pin');
      this.proposer = this.fb.group({
        title: stepper1.title,
        name: stepper1.name,
        gender:stepper1.gender,
        dob :  this.datepipe.transform(stepper1.dob, 'y-MM-dd'),
        email:stepper1.email,
        mobile: stepper1.mobile,
        pincode: stepper1.pincode,
        alterMobile : stepper1.alterMobile,
        fax: stepper1.fax,
        pan: stepper1.pan,
        gst: stepper1.gst,
        address: stepper1.address,
        address2: stepper1.address2,
        address3: stepper1.address3,
        state:stepper1.state,
        city: stepper1.city,
        stateName: stepper1.stateName,
        cityName:stepper1.cityName

      });

    }
    if (sessionStorage.stepper2 != '' && sessionStorage.stepper2 != undefined) {
      let stepper2 = JSON.parse(sessionStorage.stepper2);
      this.vehical = this.fb.group({
        policyType: stepper2.policyType,
        policyTypeName: stepper2.policyTypeName,
        proposalType:stepper2.proposalType ,
        nilDepreciationCover: stepper2.nilDepreciationCover,
        totalAntiTheftPremium: stepper2.totalAntiTheftPremium,
        totalDepreciationPremium: stepper2.totalDepreciationPremium,
        totalNonElectricalItemPremium: stepper2.totalNonElectricalItemPremium,
        totalElectricalItemPremium: stepper2.totalElectricalItemPremium,
        totalPaforUnnamedPremium: stepper2.totalPaforUnnamedPremium,
        electricalAccess:stepper2.electricalAccess,
        electricalAccessSI: stepper2.electricalAccessSI,
        nonElectricalAccess:stepper2.nonElectricalAccess,
        nonElectricalAccessSI: stepper2.nonElectricalAccessSI,
        hypothecationType: stepper2.hypothecationType,
        hypothecationTypeName: stepper2.hypothecationTypeName,
        paforUnnamed: stepper2.paforUnnamed,
        paforUnnamedSI: stepper2.paforUnnamedSI,
        hypothecationAddress1:stepper2.hypothecationAddress1,
        hypothecationAddress2: stepper2.hypothecationAddress2,
        hypothecationAddress3:stepper2.hypothecationAddress3,
        hypothecationAgreementNo:stepper2.hypothecationAgreementNo,
        antiTheft: stepper2.antiTheft,
        lltoPaidDriver: stepper2.lltoPaidDriver,
        addonPackage:stepper2.addonPackage,
        hypothecationBankName:stepper2.hypothecationBankName,
        hypothecationBankNamevalue:stepper2.hypothecationBankNamevalue,
        isFinanced:stepper2.isFinanced,
        pincode:stepper2.pincode,
        state:stepper2.state,
        city:stepper2.city,
        stateName:stepper2.stateName,
        cityName:stepper2.cityName,
        SriLanka:stepper2.SriLanka,
        Bangladesh:stepper2.Bangladesh,
        Pakistan:stepper2.Pakistan,
        Nepal:stepper2.Nepal,
        Maldives:stepper2.Maldives,
        DeTariff:stepper2.DeTariff,
        Bhutan:stepper2.Bhutan,
        geographicalArea:stepper2.geographicalArea,
        CNGKit:stepper2.CNGKit,
        CNGKitSI:stepper2.CNGKitSI,
        paPaidDriver:stepper2.paPaidDriver,
        paPaidDriverSI:stepper2.paPaidDriverSI,
        isPAExclusion:stepper2.isPAExclusion,
        PAExclusion:stepper2.PAExclusion,
        PAExclusionName:stepper2.PAExclusionName,
        PAPaidDriverCount:stepper2.PAPaidDriverCount,
        PAPaidConductorCount:stepper2.PAPaidConductorCount,
        PAPaidCleanerCount:stepper2.PAPaidCleanerCount,
        limitOwnPremise:stepper2.limitOwnPremise,
        limitedTPPD:stepper2.limitedTPPD,
        builtCNGKit:stepper2.builtCNGKit,
          // paOwnerDriver:stepper2.paOwnerDriver,
        voluntaryExcess:stepper2.voluntaryExcess,
        voluntaryExcessName:stepper2.voluntaryExcessName,
        vehicleColour: stepper2.vehicleColour,

      });

    }


    if (sessionStorage.stepper3 != '' && sessionStorage.stepper3 != undefined) {
      let stepper3 = JSON.parse(sessionStorage.stepper3);
      this.previousInsure = this.fb.group({
        policyNumber: stepper3.policyNumber,
        previousInsured: stepper3.previousInsured,
        policySi: stepper3.policySi,
        previousPolicyType: stepper3.previousPolicyType,
        policyNilDescription: stepper3.policyNilDescription,
        previousPolicyTypeName: stepper3.previousPolicyTypeName,

      });

    }
    if (sessionStorage.stepper4 != '' && sessionStorage.stepper4 != undefined) {
      let stepper4 = JSON.parse(sessionStorage.stepper4);
      if(stepper4.nomineeAge < 17){
        this.apponiteeList = true;
      }
      this.nomineeDetail = this.fb.group({
        nomineeName: stepper4.nomineeName,
        nomineeAge: stepper4.nomineeAge,
        nomineeRelationship: stepper4.nomineeRelationship,
        appointeeName: stepper4.appointeeName,
        appointeeRelationship: stepper4.appointeeRelationship
      });

    }
  }

}

@Component({
  selector: ' shriram4WCover ',
  template: `
   
        <div class="container">
            <h5>Addon Cover Premium</h5>
            <div class="row" *ngIf="this.electrical_cover!=''&&this.electrical_cover!=undefined">
                <div class="col-md-12"  >
                    <p ><span style="margin-left: 35px;color: blue;"> Electrical Accessories :</span><span style="margin-left: 146px;">{{this.electrical_cover}} </span> </p>
                </div>
            </div>
            <div class="row" *ngIf="this.electrical_cover!=''&&this.electrical_cover!=undefined">
                <div class="col-md-12"  >
                    <p ><span style="margin-left: 35px;color: blue"> Non Electrical Accessories :</span><span style="margin-left: 117px;">{{this.electrical_cover}} </span></p>
                </div>
            </div>
           
            <div class="row" *ngIf="this.pa_unnamed_passenger_cover!=''&&this.pa_unnamed_passenger_cover!=undefined">
                <div class="col-md-12"  >
                    <p ><span style="margin-left: 35px;color: blue"> PA to Unnamed Passenger :</span><span style="margin-left: 114px;"> {{this.pa_unnamed_passenger_cover}}</span> </p>
                </div>
            </div>
           
            <div class="row" *ngIf="this.Nil_depreciation_cover!=''&&this.Nil_depreciation_cover!=undefined">
                <div class="col-md-12"  >
                    <p ><span style="margin-left: 35px;color: blue"> Nil Depreciation Cover(Bumper To Bumper) :</span><span style="margin-left: 13px;">{{this.Nil_depreciation_cover}}</span>  </p>
                </div>
            </div>
          <div class="row" *ngIf="this.pa_owner_driver!=''&&this.pa_owner_driver!=undefined">
            <div class="col-md-12"  >
              <p ><span style="margin-left: 35px;color: blue"> PA Owner Driver :</span><span style="margin-left: 174px;">{{this.pa_owner_driver}}</span>  </p>
            </div>
          </div>
            
            <div class="row" *ngIf="this.anti_theft_cover!=''||this.anti_theft_cover!=undefined">
                <div class="col-md-12"  >
                    <p ><span style="margin-left: 35px;color: blue"> Anti-Theft Device :</span><span style="margin-left: 174px;">{{this.anti_theft_cover}}</span>  </p>
                </div>
            </div>

            <!--<ul class="m-0 list-group">-->
                <!--<li class="list-group-item"  *ngIf="this.electrical_cover!=''&&this.electrical_cover!=undefined"><strong> Electrical Accessories :</strong> {{this.electrical_cover}}</li>-->
                <!--<li class="list-group-item" *ngIf="this.electrical_cover!=''&&this.electrical_cover!=undefined"><strong> Non Electrical Accessories :</strong> {{this.electrical_cover}}</li>-->
                <!--<li class="list-group-item" *ngIf="this.pa_unnamed_passenger_cover!=''&&this.pa_unnamed_passenger_cover!=undefined"><strong> PA to Unnamed Passenger :</strong> {{this.pa_unnamed_passenger_cover}}</li>-->
                <!--<li class="list-group-item" *ngIf="this.Nil_depreciation_cover!=''&&this.Nil_depreciation_cover!=undefined"><strong> Nil Depreciation Cover(Bumper To Bumper) :</strong> {{this.Nil_depreciation_cover}}</li>-->
                <!--<li class="list-group-item" *ngIf="this.anti_theft_cover!=''||this.anti_theft_cover!=undefined"><strong> Anti-Theft Device :</strong> {{this.anti_theft_cover}}</li>-->
                                                      <!---->
            <!--</ul>-->
                
        </div>
       
        <div mat-dialog-actions style="justify-content: center">
            <button mat-raised-button style="background-color: darkblue; color: white;" (click)="cancel()">Cancel</button>
            <button mat-raised-button style="background-color: darkblue; color: white;" (click)="submit()">Ok</button>

        </div>
        
    `
})

export class shriram4WCover {

  public settings: any;
  public electrical_cover: any;
  public anti_theft_cover: any;
  public pa_owner_driver: any;
  public Nil_depreciation_cover: any;
  public pa_unnamed_passenger_cover: any;

  constructor(
      public dialogRef: MatDialogRef<shriram4WCover>,
      @Inject(MAT_DIALOG_DATA) public data: any, public route: ActivatedRoute,  public common: CommonService, public validation: ValidationService, public appSettings: AppSettings, private toastr: ToastrService, public config: ConfigurationService, public authservice: AuthService, public fwService: FourWheelerService) {

    this.electrical_cover=sessionStorage.electrical_cover;
    console.log(this.electrical_cover,'sessionStorage.electrical_cover....');

    this.anti_theft_cover=sessionStorage.anti_theft_cover;
    console.log(this.anti_theft_cover,'sessionStorage.anti_theft_cover....');

    this.pa_owner_driver=sessionStorage.pa_owner_driver;
    console.log(this.pa_owner_driver,'sessionStorage.pa_owner_driver....');

    this.Nil_depreciation_cover=sessionStorage.Nil_depreciation_cover;
    console.log(this.Nil_depreciation_cover,'sessionStorage.Nil_depreciation_cover....');

    this.pa_unnamed_passenger_cover=sessionStorage.pa_unnamed_passenger_cover;
    console.log(this.pa_unnamed_passenger_cover,'sessionStorage.pa_unnamed_passenger_cover....');

  }

  submit(): void {
    this.dialogRef.close(true);
  }
  cancel(): void {
    this.dialogRef.close(false);
  }



}

// @Component({
//   selector: 'fourShriramIDVComponent',
//   template: `
//         <div class="container-fluid">
//            <div class="row mt-3"[formGroup]="idfGroup">
//                 <div class="col-md-12 box-card pt-3 pb-3" >
//                 <div class="col-md-12 mt-2">
//                     <div class="row">
//                         <div class="col-md-4">
//                           <mat-form-field class="w-100">
//                             <input matInput placeholder="IDV Amount"  formControlName="idvAmount" (keypress)="numberValidate($event)" (input)="changeCalcElect($event)"  autocomplete="off"  required >
//                             <mat-error *ngIf="idfGroup.controls.idvAmount.errors?.required">IDV Amount is required</mat-error>
//                           </mat-form-field>
//                         </div>
//                     </div>
//                 </div>
//                     <div class="col-md-12 " >
//                         <div class="row">
//                             <div class="col-md-4 " >
//                               <mat-checkbox  formControlName="electricalAccessPop" (change)="updateElectricalItem();changeCalcMax()" >Electrical Accessories</mat-checkbox>
//                             </div>
//                             <div class="col-md-4 " *ngIf="idfGroup.controls.electricalAccessPop.value == true">
//                                 <mat-form-field class="w-100">
//                                     <input matInput placeholder="Sum Insured"  formControlName="electricalAccessSIPop" (keypress)="numberValidate($event)" (input)="changeCalcElect($event)"  autocomplete="off"  [required]="idfGroup.controls.electricalAccessPop.value == true" >
//                                     <!--<mat-error *ngIf="coverDetails.controls.ElectricalItemsTotalSI.errors?.required">Sum Insured is required</mat-error>-->
//                                 </mat-form-field>
//                                 <div class="error" *ngIf="electricalSumAount !='' && electricalSumAount != true">{{electricalSumAount}} {{electricalMaxValue}}</div>
//                             </div>
//
//                         </div>
//                     </div>
//
//                     <div class="col-md-12 mt-2" >
//                         <div class="row">
//                             <div class="col-md-4">
//                                 <mat-checkbox  formControlName="nonElectricalAccessPop" (change)="updatenonElectricalItem();changeCalcMax()">Non Electrical Accessories</mat-checkbox>
//                             </div>
//                             <div class="col-md-4" *ngIf="idfGroup.controls.nonElectricalAccessPop.value == true">
//                                 <mat-form-field class="w-100">
//                                     <input matInput placeholder="Sum Insured"  formControlName="nonElectricalAccessSIPop"   autocomplete="off" (input)="changeCalcNonElect($event)" (keypress)="numberValidate($event)"  [required]="idfGroup.controls.nonElectricalAccessPop.value == true"  >
//                                     <!--<mat-error *ngIf="coverDetails.controls.NonElectricalItemsTotalSI.errors?.required">Sum Insured is required</mat-error>-->
//                                 </mat-form-field>
//                                 <div class="error" *ngIf="nonElectricalSumAount !='' && nonElectricalSumAount != true">{{nonElectricalSumAount}} {{electricalMaxValue}}</div>
//                             </div>
//
//                         </div>
//                     </div>
//                 </div>
//
//            </div>
//         </div>
//         <div mat-dialog-actions style="justify-content: center">
//              <button mat-button class="secondary-bg-color" (click)="onClick(true)" >Submit</button>
//         </div>
//     `,
//   styleUrls: ['./shriram-fourwheeler-proposal.component.scss']
//
//
// })
//
// export class fourShriramIDVComponent {
//   public idfGroup : FormGroup;
//   public idv : any;
//   public buyBikeDetails : any;
//   public electricalMaxValue : any;
//   public electricalSumAount : any;
//   public nonElectricalSumAount : any;
//
//   constructor(public dialogRef: MatDialogRef<fourShriramIDVComponent>,
//       @Inject(MAT_DIALOG_DATA) public data: DialogData, public fb: FormBuilder,public validation: ValidationService) {
//     // alert(data.name);
//     console.log(data.name,'previous........');
//     this.electricalSumAount=false;
//     this.nonElectricalSumAount=false;
//
//     this.idfGroup = this.fb.group({
//           idvAmount: ['', Validators.required],
//           electricalAccessPop: ['', Validators.required],
//           nonElectricalAccessPop: ['', Validators.required],
//           electricalAccessSIPop: '',
//           nonElectricalAccessSIPop: '',
//         }
//     );
//
//   }
//   ngOnInit(){
//     this.buyBikeDetails = JSON.parse(sessionStorage.buyFourwheelerProductDetails);
//     this.electricalSumAount=false;
//     this.nonElectricalSumAount=false;
//     this. changeCalcMax();
//   }
//   changeCalcMax(){
//     // alert('calc')
//     let values=this.buyBikeDetails.Idv;
//     console.log(values,'values....');
//     let valid = 20/100;
//     console.log(valid,'valid....');
//     this.electricalMaxValue = valid * values;
//     console.log(this.electricalMaxValue ,'this.electricalMaxValue ...')
//
//   }
//   updateElectricalItem(){
//     if(this.idfGroup.controls.electricalAccessPop.value == true){
//       this.idfGroup.controls['electricalAccessSIPop'].setValidators([Validators.required]);
//     } else {
//       this.idfGroup.controls['electricalAccessSIPop'].patchValue('');
//
//       this.idfGroup.controls['electricalAccessSIPop'].setValidators(null);
//       this.electricalSumAount=false;
//       this.electricalSumAount='';
//
//     }
//     this.idfGroup.controls['electricalAccessSIPop'].updateValueAndValidity();
//   }
//
//   updatenonElectricalItem(){
//     if(this.idfGroup.controls.nonElectricalAccessPop.value == true){
//       this.idfGroup.controls['nonElectricalAccessSIPop'].setValidators([Validators.required]);
//     } else {
//       this.idfGroup.controls['nonElectricalAccessSIPop'].patchValue('');
//
//       this.idfGroup.controls['nonElectricalAccessSIPop'].setValidators(null);
//       this.nonElectricalSumAount=false;
//       this.nonElectricalSumAount='';
//
//     }
//     this.idfGroup.controls['nonElectricalAccessSIPop'].updateValueAndValidity();
//   }
//
//   changeCalcElect(event:any){
//     let electricSum=event.target.value;
//     console.log(electricSum,'electricSum...');
//     console.log(this.electricalMaxValue,'electricalMaxValue...');
//     if(electricSum < this.electricalMaxValue){
//       this.electricalSumAount=false;
//       this.electricalSumAount='';
//     }else{
//       this.electricalSumAount=true;
//       this.electricalSumAount = 'Electrical Accessories Sum Insured Should be lesser than';
//     }
//
//   }
//   changeCalcNonElect(event:any){
//     let nonElectricSum=event.target.value;
//     console.log(nonElectricSum,'electricSum...');
//     console.log(this.electricalMaxValue,'electricalMaxValue...');
//     if(nonElectricSum < this.electricalMaxValue){
//       this.nonElectricalSumAount=false;
//       this.nonElectricalSumAount='';
//     }else{
//       this.nonElectricalSumAount=true;
//       this.nonElectricalSumAount = 'Non Electrical Accessories Sum Insured Should be lesser than';
//     }
//
//   }
//   numberValidate(event: any) {
//     this.validation.numberValidate(event);
//   }
//
//   onClick(): void {
//     console.log(this.idfGroup.controls['electricalAccessSIPop'].value)
//     console.log(this.idfGroup.controls['nonElectricalAccessSIPop'].value)
//     console.log(this.idfGroup.controls['idvAmount'].value)
//
//     this.dialogRef.close({question1:this.idfGroup.controls['electricalAccessSIPop'].value, question2:this.idfGroup.controls['nonElectricalAccessSIPop'].value, id:this.idfGroup.controls['idvAmount'].value});
//     // this.dialogRef.close(this.data.question1);
//   }
// }
