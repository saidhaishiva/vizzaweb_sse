import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormControlName, FormGroup, Validators} from '@angular/forms';
import {ValidationService} from '../../shared/services/validation.service';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {DatePipe} from '@angular/common';
import {AuthService} from '../../shared/services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {AppSettings} from '../../app.settings';
import {BikeInsuranceService} from '../../shared/services/bike-insurance.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatStepper} from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
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
  selector: 'app-bike-royal-proposal',
  templateUrl: './bike-royal-proposal.component.html',
  styleUrls: ['./bike-royal-proposal.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class BikeRoyalProposalComponent implements OnInit {
public proposer: FormGroup;
public vehical: FormGroup;
public previousInsure: FormGroup;
public nomineeDetail: FormGroup;
public minDate: any;
public settings: any;
public webhost: any;
public titleList: any;
public occupationList: any;
public insurerdateError: any;
public bikeRoyalProposerAge: any;
public pincodeList: any;
public pincodeState: any;
public pincodeCity: any;
public stateList: any;
public hypothecationTypeDetails: any;
public hypothecationTypedm: any;
public previousList: any;
public policyList: any;
public drivenList: any;
public nomineeRelation: any;
public addElectrical: any;
public registrationNameList: any;
public drivingTypeList: any;
public milageList: any;
public addnonElectrical: any;
public buyProduct: any;
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
public VehicleSubLine: any;
public VersionNo: any;
public ComprehensivePremium: any;
public Comprehensivepremium: any;
public coverList: any;
public respincodeList: any;
public vehicledetails: any;
public premiumAmount: any;
public apponiteeList: boolean;
  constructor(public fb: FormBuilder, public validation: ValidationService, public config: ConfigurationService,public datepipe: DatePipe, public authservice: AuthService, private toastr: ToastrService,  public appSettings: AppSettings, public bikeInsurance: BikeInsuranceService ) {

    const minDate = new Date();
    this.minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());

    this.settings = this.appSettings.settings;
    this.webhost = this.config.getimgUrl();

    this.settings.HomeSidenavUserBlock = false;
    this.settings.sidenavIsOpened = false;
    this.settings.sidenavIsPinned = false;

    this.proposer = this.fb.group({
      title: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      dob: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
      mobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
      occupation: ' ',
      address: ['', Validators.required],
      address2: ['', Validators.required],
      address3: '',
      address4: '',
      pincode: ['', Validators.required],
      state: '',
      stateName: '',
      city: '',
      cityName: '',
      raddress: ['', Validators.required],
      raddress2: ['', Validators.required],
      raddress3: '',
      raddress4: '',
      rpincode: ['', Validators.required],
      rstate: '',
      rcity: '',
      rstateName: '',
      rcityName: '',
      sameas:'',
      phoneNumber:  ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
      stdCode: ''
    });

    this.vehical = this.fb.group({
      vehicleMostlyDrivenOn: ['', Validators.required],
      vehicleRegisteredName:'' ,
      // registrationchargesRoadtax: ['', Validators.required],
      coverelectricalaccesss: '',
      drivingExperience: '',
      averageMonthlyMileageRun: ['', Validators.required],
      companyName: '',
      idv: '',
      isTwoWheelerFinancedValue: '',
      financierName: '',
      isTwoWheelerFinanced: '',
      hypothecationType: '',
      typeOfCover: '',
        vechileOwnerShipChanged: 'No',

      electricalAccess : new FormArray([
        this.create()
      ]),
      // nonelectricalAccess : new FormArray([
      //   this.createnonElectrical()
      // ]),
    });

    this.previousInsure = this.fb.group({
      policyNumber: '',
      previousInsured: '',
      previousdob:'',
      isPreviousPolicyHolder:'',
      voluntary:'',
      claimAmount:'',
      previousPolicyType: '',
      personalAccidentCover: '',
      accidentPaid: '',
    });
      this.nomineeDetail = this.fb.group({
          nomineeName: '',
          nomineeAge: '',
          nomineeRelationship: '',
          appointeeName: '',
          appointeeRelationship: '',
        appointeeAge: ''
      });
  }



  ngOnInit() {
    this.buyProduct = JSON.parse(sessionStorage.bikeListDetails);
    this.bikeEnquiryId = sessionStorage.bikeEnquiryId;
    this.enquiryFormData = JSON.parse(sessionStorage.enquiryFormData);
    this.vehicledetails = JSON.parse(sessionStorage.vehicledetails);
    this.productDetails = JSON.parse(sessionStorage.buyProductDetails);
    this.premiumAmount = sessionStorage.premiumAmount;

    this.title();
    this.getOccupation();
    this.changehypothecation();
    this.changehypothecationType();
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
    this.sessionData();

  }
  // validation

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
  topScroll() {
    document.getElementById('main-content').scrollTop = 0;
  }
  // proposer page
  create(){
    return new FormGroup({
      NameOfElectronicAccessories: new FormControl(),
      MakeModel :  new FormControl(),
      Value :  new FormControl(),
    });
  }
  addItems(){
    this.addElectrical =  this.vehical.get('electricalAccess') as FormArray;
    this.addElectrical.push(this.create());
    console.log(this.addElectrical, 'this.addElectrical');
  }
  removeItems(index){
    let ssss =  this.vehical.get('electricalAccess') as FormArray;
    ssss.removeAt(index);
  }
  // non  electrical
  createnonElectrical(){
    return new FormGroup({
      namesOfNonElectrical: new FormControl('', Validators.required),
      modelnonElectrical :  new FormControl('', Validators.required),
      valuenonelectrical :  new FormControl('', Validators.required),
    });
  }
  addnonEelctricalItems(){
    this.addnonElectrical =  this.vehical.get('nonelectricalAccess') as FormArray;
    this.addnonElectrical.push(this.createnonElectrical());
  }
  removenonEelctricalItems(index){
    let ssss =  this.vehical.get('nonelectricalAccess') as FormArray;
    ssss.removeAt(index);
  }
  // title

  title(){
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.bikeInsurance.getTitle(data).subscribe(
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
  public titleFailure(error){
  }
// ocupation List
  getOccupation(){
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.bikeInsurance.getOccupationList(data).subscribe(
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
  public occupationFailure(error){
  }
  //
  getVehicalMostly(){
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.bikeInsurance.getvehicelList(data).subscribe(
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
  // pincode
  getPostalCode(pin) {
    const data = {
      'platform': 'web',
      'pin_code': pin
    };
    console.log(data,'jhgjh');
    if (pin.length == 6) {
      this.bikeInsurance.getPincodeList(data).subscribe(
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
      if(pin.length == '' || pin.length == 0 || pin.length != 6){
        this.proposer.controls['city'].patchValue('');
      }
      for(let key in this.pincodeList.city) {
        this.proposer.controls['city'].patchValue(key);
        this.proposer.controls['cityName'].patchValue(this.pincodeList['city'][key]);
        console.log(this.proposer.controls['city'].patchValue(key),'jhgfdghj');

      }

    } else{
      this.toastr.error(successData.ErrorObject);
      this.vehical.controls['city'].patchValue('');

    }
  }
  public pinProposerListFailure(error) {
  }
  getresPostalCode(pin) {
    const data = {
      'platform': 'web',
      'pin_code': pin
    };
    console.log(data,'jhgjh');
    if (pin.length == 6) {
      this.bikeInsurance.getPincodeList(data).subscribe(
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
      console.log(pin,'jhgfdghj');
      if(pin.length == '' || pin.length == 0 || pin.length != 6){
        this.proposer.controls['rcity'].patchValue('');
      }
      for(let key in this.respincodeList.city) {
        this.proposer.controls['rcity'].patchValue(key);
        this.proposer.controls['rcityName'].patchValue(this.respincodeList['city'][key]);
      }

    } else{
      this.toastr.error(successData.ErrorObject);
      this.proposer.controls['rcity'].patchValue('');

    }
  }

  public pinresProposerListFailure(error) {
  }
    addEventPrevious(evnt){

    }

  // dob validation
  addEvent(event,type) {
    if (event.value != null) {
      let selectedDate = '';
      this.bikeRoyalProposerAge = '';
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
          this.bikeRoyalProposerAge = this.ageCalculate(dob);

        }

      } else if (typeof event.value._i == 'object') {
        // dob = this.datepipe.transform(event.value, 'MMM d, y');
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (dob.length == 10) {
          this.bikeRoyalProposerAge = this.ageCalculate(dob);

        }
        this.insurerdateError = '';
      }
      sessionStorage.bkRoyalProposerAge = this.bikeRoyalProposerAge;

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

  sameAddress(){
      if(this.proposer.controls['sameas'].value == true){
        this.proposer.controls['raddress'].patchValue( this.proposer.controls['address'].value),
        this.proposer.controls['raddress2'].patchValue( this.proposer.controls['address2'].value),
        this.proposer.controls['raddress3'].patchValue( this.proposer.controls['address3'].value),
        this.proposer.controls['raddress4'].patchValue( this.proposer.controls['address4'].value),
        this.proposer.controls['rpincode'].patchValue( this.proposer.controls['pincode'].value),
        this.proposer.controls['rstate'].patchValue( this.proposer.controls['state'].value),
        this.proposer.controls['rcity'].patchValue( this.proposer.controls['city'].value)
      } else {
        this.proposer.controls['raddress'].patchValue(''),
        this.proposer.controls['raddress2'].patchValue(''),
        this.proposer.controls['raddress3'].patchValue(''),
        this.proposer.controls['raddress4'].patchValue(''),
        this.proposer.controls['rpincode'].patchValue(''),
        this.proposer.controls['rstate'].patchValue(''),
        this.proposer.controls['rcity'].patchValue('')
      }
  }
  proposerDetails(stepper: MatStepper,value){
    console.log(value);
    sessionStorage.stepper1 = JSON.stringify(value);
    if(this.proposer.valid) {
      if(sessionStorage.bkRoyalProposerAge >= 18){
        stepper.next();
      } else {
        this.toastr.error('Proposer age should be 18 or above');

      }

  }
    }
  // vehical details
  vehicalDetails(stepper: MatStepper,value){
    console.log(value);
    sessionStorage.stepper2 = '';
    sessionStorage.stepper2 = JSON.stringify(value);
   // / /if(this.vehical.valid){
      stepper.next();
    // }
  }
  isFinaced(){
    if(this.vehical.controls['isTwoWheelerFinanced'].value == true){

    }else{
      this.vehical.controls['isTwoWheelerFinancedValue'].patchValue('');
      this.vehical.controls['financierName'].patchValue('');
    }
  }


  changehypothecation() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0'

    }
    this.bikeInsurance.getHypothecation(data).subscribe(
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
    this.bikeInsurance.changeFinacedType(data).subscribe(
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
    this.bikeInsurance.getCoverLists(data).subscribe(
        (successData) => {
          this.coverTypeSuccess(successData);
        },
        (error) => {
          this.coverTypeFailure(error);
        }
    );
  }
  public coverTypeSuccess(successData){
    if (successData.IsSuccess) {
      this.coverList = successData.ResponseObject;
    }
  }
  public coverTypeFailure(error) {
  }
  changeVehicleName() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0'

    }
    this.bikeInsurance.getRegNameLists(data).subscribe(
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
    this.bikeInsurance.getdrivingExpLists(data).subscribe(
        (successData) => {
          this.drivingSuccess(successData);
        },
        (error) => {
          this.drivingFailure(error);
        }
    );
  }
  public drivingSuccess(successData){
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
    this.bikeInsurance.getmilageLists(data).subscribe(
        (successData) => {
          this.milageSuccess(successData);
        },
        (error) => {
          this.milageFailure(error);
        }
    );
  }
  public milageSuccess(successData){
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
    this.bikeInsurance.getpaLists(data).subscribe(
        (successData) => {
          this.paSuccess(successData);
        },
        (error) => {
          this.paFailure(error);
        }
    );
  }
  public paSuccess(successData){
    if (successData.IsSuccess) {
      this.paList = successData.ResponseObject;
    }
  }
  public paFailure(error) {
  }
  changePaidDriverType() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0'

    }
    this.bikeInsurance.getpaidLists(data).subscribe(
        (successData) => {
          this.paidSuccess(successData);
        },
        (error) => {
          this.paidFailure(error);
        }
    );
  }
  public paidSuccess(successData){
    if (successData.IsSuccess) {
      this.paidList = successData.ResponseObject;
    }
  }
  public paidFailure(error) {
  }
  // third page

  changePreviousInsureType() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0'

    }
    this.bikeInsurance.getPreviousLists(data).subscribe(
        (successData) => {
          this.previousInsureTypeSuccess(successData);
        },
        (error) => {
          this.previousInsureTypeFailure(error);
        }
    );
  }
  public previousInsureTypeSuccess(successData){
    if (successData.IsSuccess) {
      this.previousList = successData.ResponseObject;
    }
  }
  public previousInsureTypeFailure(error) {
  }
  // policy Type
  changePolicyType() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0'

    }
    this.bikeInsurance.getPolicyLists(data).subscribe(
        (successData) => {
          this.previousPolicyTypeSuccess(successData);
        },
        (error) => {
          this.previousPolicyTypeFailure(error);
        }
    );
  }
  public previousPolicyTypeSuccess(successData){
    if (successData.IsSuccess) {
      this.policyList = successData.ResponseObject;
    }
  }
  public previousPolicyTypeFailure(error) {
  }
  // voulntry Type
  changeVoulntaryType() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0'

    }
    this.bikeInsurance.getVountaryLists(data).subscribe(
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
  policyHolder(){
    if(this.previousInsure.controls['isPreviousPolicyHolder'].value == 'Yes'){

    } else {
      this.previousInsure.controls['claimAmount'].patchValue('');
      this.previousInsure.controls['voluntary'].patchValue('');
      this.previousInsure.controls['personalAccidentCover'].patchValue('');
      this.previousInsure.controls['accidentPaid'].patchValue('');
    }
  }
   // next
    previousDetails(stepper: MatStepper,value){
      sessionStorage.stepper3 = JSON.stringify(value);
      if(this.previousInsure.valid){
        if(this.previousInsure.controls['previousPolicyType'].value == 'Thirdparty'){
          this.toastr.error('For Buying a third party insurence. Please contact our Customer service or mail to customer.services@royalsundaram.inor chat Online with our chat repersentative');
        } else {
          stepper.next();

        }
      }

    }


    // fourth page

    ageNominee(){
        if(this.nomineeDetail.controls['nomineeAge'].value <= 17){
            this.apponiteeList = true;
        }  else{
            this.apponiteeList = false;

        }
    }
    //RELATIONSHIP
    nomineeRelationShip(){
        const data = {
            'platform': 'web',
            'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
        }
        this.bikeInsurance.getNomineeRelationship(data).subscribe(
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
        // if(this.nomineeDetail.valid){
          this.proposal(stepper);
        // }
  }
    // proposal creation
proposal(stepper){
    console.log(this.vehical.value, 'jjjcoverelectricalaccesss');
  const data = {
    'platform': 'web',
    'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
    'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
    'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    'enquiry_id': this.bikeEnquiryId,
    "created_by": "",
    'proposal_id': sessionStorage.royalBikeproposalID == '' || sessionStorage.royalBikeproposalID == undefined ? '' : sessionStorage.royalBikeproposalID,
    "company_id": this.productDetails.company_id,
    "business_type": this.vehicledetails.business_type,
    "CALCULATEPREMIUMREQUEST": {
    "proposerDetails": {
          'title': this.proposer.controls['title'].value,
          'firstName': this.proposer.controls['firstname'].value,
          'lastName':  this.proposer.controls['lastname'].value,
          'emailId':  this.proposer.controls['email'].value,
          'mobileNo':  this.proposer.controls['mobile'].value,
          'dateOfBirth': this.datepipe.transform(this.proposer.controls['dob'].value, 'y-MM-dd'),
          'occupation':  this.proposer.controls['occupation'].value,
          'nomineeName':this.nomineeDetail.controls['nomineeName'].value,
          'nomineeAge': this.nomineeDetail.controls['nomineeAge'].value,
          'relationshipWithNominee': this.nomineeDetail.controls['nomineeRelationship'].value,
          'guardianName': this.nomineeDetail.controls['appointeeRelationship'].value,
          'guardianAge':this.nomineeDetail.controls['appointeeAge'].value,
          'relationshipwithGuardian': this.nomineeDetail.controls['nomineeName'].value,
          'permanentAddress1':  this.proposer.controls['address'].value,
          'permanentAddress2':  this.proposer.controls['address2'].value,
          'permanentAddress3':  this.proposer.controls['address3'].value,
          'permanentAddress4':  this.proposer.controls['address4'].value,
          'permanentCity': this.proposer.controls['city'].value,
          'permanentPincode':  this.proposer.controls['pincode'].value,
          'sameAdressReg': this.proposer.controls['sameas'].value ? 'Yes' : 'No',
          'ResidenceAddressOne':  this.proposer.controls['raddress'].value,
          'ResidenceAddressTwo':  this.proposer.controls['raddress2'].value,
          'ResidenceAddressThree':  this.proposer.controls['raddress3'].value,
          'ResidenceAddressFour':  this.proposer.controls['raddress4'].value,
          'ResidenceCity': this.proposer.controls['rcity'].value,
          'ResidencePinCode':  this.proposer.controls['rpincode'].value,
          'passwordResetted': "",
          'strStdCode': this.proposer.controls['stdCode'].value,
          'strPhoneNo': this.proposer.controls['phoneNumber'].value
    },
    "vehicleDetails": {
          "drivingExperience":  this.vehical.controls['drivingExperience'].value,
          "voluntaryDeductible":  this.previousInsure.controls['voluntary'].value ? this.previousInsure.controls['voluntary'].value : '',
          "idv": this.productDetails.Idv,
          "vehicleMostlyDrivenOn":  this.vehical.controls['vehicleMostlyDrivenOn'].value,
          "vehicleRegisteredInTheNameOf":  this.vehical.controls['vehicleRegisteredName'].value,
          "previousPolicyExpiryDate": this.datepipe.transform(this.buyProduct.previous_policy_expiry_date, 'y-MM-dd')? this.datepipe.transform(this.buyProduct.previous_policy_expiry_date, 'y-MM-dd') : '',
          "previousPolicyNo":this.previousInsure.controls['policyNumber'].value? this.previousInsure.controls['policyNumber'].value: '',
          "policyTerm": this.productDetails.year_type,
          "previousInsurerName":  this.previousInsure.controls['previousInsured'].value? this.previousInsure.controls['previousInsured'].value :'',
          "companyNameForCar": this.vehical.controls['companyName'].value,
          "previousPolicyType": this.previousInsure.controls['previousPolicyType'].value ? this.previousInsure.controls['previousPolicyType'].value: '',
          "isTwoWheelerFinanced":  this.vehical.controls['isTwoWheelerFinanced'].value ? 'yes' : 'No',
          "isTwoWheelerFinancedValue":  this.vehical.controls['isTwoWheelerFinancedValue'].value,
          "financierName":  this.vehical.controls['financierName'].value,
          "carRegisteredCity": "MUMBAI",
          "averageMonthlyMileageRun":  this.vehical.controls['averageMonthlyMileageRun'].value,
          "personalAccidentCoverForUnnamedPassengers": '',
          "accidentCoverForPaidDriver": '',
          "policyStartDate": '2019-06-03',
          "typeOfCover": this.vehical.controls['typeOfCover'].value? this.vehical.controls['typeOfCover'].value : '',
          "cover_elec_acc": this.vehical.controls['coverelectricalaccesss'].value ? 'Yes' : 'No',
      "electricalAccessories": {
        "electronicAccessoriesDetails": this.vehical.value.electricalAccess ,
      },
      "vechileOwnerShipChanged": this.vehical.controls['vechileOwnerShipChanged'].value,
          "claimsMadeInPreviousPolicy": this.previousInsure.controls['isPreviousPolicyHolder'].value,
          "claimAmountReceived": this.previousInsure.controls['claimAmount'].value,
    }
  }
  }
  console.log(data,'fileeee');
  this.settings.loadingSpinner = true;

  this.bikeInsurance.proposalCreationRoyal(data).subscribe(
      (successData) => {
        this.proposalSuccess(successData, stepper);
      },
      (error) => {
        this.proposalFailure(error);
      }
  );
}
  public proposalSuccess(successData, stepper){
    this.settings.loadingSpinner = false;
    if(successData.IsSuccess){
      // this.toastr.success('Proposal created successfully!!');
      this.summaryData = successData.ResponseObject;
      this.ProposalId =   this.summaryData.ProposalId;
      // this.PaymentRedirect =   this.summaryData.PaymentRedirect;
      this.referenceId =   this.summaryData.ReferenceId;
      this.ComprehensivePremium =   this.summaryData.Comprehensive_premium;
      sessionStorage.royalBikeproposalID = this.ProposalId;
      this.proposerFormData = this.proposer.value;
      this.vehicalFormData = this.vehical.value;
      this.previousFormData = this.previousInsure.value;
      this.nomineeFormData = this.nomineeDetail.value;
      this.updateproposal(stepper);

      console.log(this.proposerFormData, 'ppp');
      console.log(this.vehicalFormData,'uuuuu');
      console.log(this.previousFormData,'ooo');
      console.log(this.nomineeFormData,'ooo333');
    } else{
      this.toastr.error(successData.ErrorObject);

    }
  }
  public proposalFailure(error){

  }

  updateproposal(stepper){
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
      'enquiry_id': this.bikeEnquiryId,
      "created_by": "",
      'proposal_id': sessionStorage.royalBikeproposalID == '' || sessionStorage.royalBikeproposalID == undefined ? '' : sessionStorage.royalBikeproposalID,
      "company_id": this.productDetails.company_id,
      "business_type": this.vehicledetails.business_type,
      "CALCULATEPREMIUMREQUEST": {
        "proposerDetails": {
          'title': this.proposer.controls['title'].value,
          'firstName': this.proposer.controls['firstname'].value,
          'lastName':  this.proposer.controls['lastname'].value,
          'emailId':  this.proposer.controls['email'].value,
          'mobileNo':  this.proposer.controls['mobile'].value,
          'dateOfBirth': this.datepipe.transform(this.proposer.controls['dob'].value, 'y-MM-dd'),
          'occupation':  this.proposer.controls['occupation'].value,
          'nomineeName':this.nomineeDetail.controls['nomineeName'].value,
          'nomineeAge': this.nomineeDetail.controls['nomineeAge'].value,
          'relationshipWithNominee': this.nomineeDetail.controls['nomineeRelationship'].value,
          'guardianName': this.nomineeDetail.controls['appointeeRelationship'].value,
          'guardianAge':this.nomineeDetail.controls['appointeeAge'].value,
          'relationshipwithGuardian': this.nomineeDetail.controls['nomineeName'].value,
          'permanentAddress1':  this.proposer.controls['address'].value,
          'permanentAddress2':  this.proposer.controls['address2'].value,
          'permanentAddress3':  this.proposer.controls['address3'].value,
          'permanentAddress4':  this.proposer.controls['address4'].value,
          'permanentCity': this.proposer.controls['city'].value,
          'permanentPincode':  this.proposer.controls['pincode'].value,
          'sameAdressReg': this.proposer.controls['sameas'].value ? 'Yes' : 'No',
          'ResidenceAddressOne':  this.proposer.controls['raddress'].value,
          'ResidenceAddressTwo':  this.proposer.controls['raddress2'].value,
          'ResidenceAddressThree':  this.proposer.controls['raddress3'].value,
          'ResidenceAddressFour':  this.proposer.controls['raddress4'].value,
          'ResidenceCity': this.proposer.controls['rcity'].value,
          'ResidencePinCode':  this.proposer.controls['rpincode'].value,
          'passwordResetted': "",
          'strStdCode': this.proposer.controls['stdCode'].value,
          'strPhoneNo': this.proposer.controls['phoneNumber'].value
        },
        "quoteId": this.referenceId,
        "premium": this.ComprehensivePremium,
        "vehicleDetails": {
          "drivingExperience":  this.vehical.controls['drivingExperience'].value,
          "voluntaryDeductible":  this.previousInsure.controls['voluntary'].value ? this.previousInsure.controls['voluntary'].value : '',
          "idv": this.productDetails.Idv,
          "vehicleMostlyDrivenOn":  this.vehical.controls['vehicleMostlyDrivenOn'].value,
          "vehicleRegisteredInTheNameOf":  this.vehical.controls['vehicleRegisteredName'].value,
          "previousPolicyExpiryDate": this.datepipe.transform(this.buyProduct.previous_policy_expiry_date, 'y-MM-dd'),
          "previousPolicyNo":this.previousInsure.controls['policyNumber'].value,
          "policyTerm": this.productDetails.year_type,
          "previousInsurerName":  this.previousInsure.controls['previousInsured'].value,
          "companyNameForCar":  this.vehical.controls['companyName'].value,
          "previousPolicyType": this.previousInsure.controls['previousPolicyType'].value,
          "isTwoWheelerFinanced":  this.vehical.controls['isTwoWheelerFinanced'].value ? 'yes' : 'No',
          "isTwoWheelerFinancedValue":  this.vehical.controls['isTwoWheelerFinancedValue'].value,
          "financierName":  this.vehical.controls['financierName'].value,
          "carRegisteredCity": "MUMBAI",
          "averageMonthlyMileageRun":  this.vehical.controls['averageMonthlyMileageRun'].value,
          "personalAccidentCoverForUnnamedPassengers": '',
          "accidentCoverForPaidDriver": '',
          "policyStartDate": '2019-04-01',
          "typeOfCover": this.vehical.controls['typeOfCover'].value? this.vehical.controls['typeOfCover'].value : '',
          "cover_elec_acc": this.vehical.controls['coverelectricalaccesss'].value ? 'Yes' : 'No',
          "electricalAccessories": {
            "electronicAccessoriesDetails": this.vehical.value.electricalAccess,
          },
          "vechileOwnerShipChanged": this.vehical.controls['vechileOwnerShipChanged'].value,
          "claimsMadeInPreviousPolicy": this.previousInsure.controls['isPreviousPolicyHolder'].value,
          "claimAmountReceived": this.previousInsure.controls['claimAmount'].value,
        }
      }
    }
    console.log(data,'fileeee');
    this.settings.loadingSpinner = true;

    this.bikeInsurance.updateproposalCreationRoyal(data).subscribe(
        (successData) => {
          this.updateproposalSuccess(successData, stepper);
        },
        (error) => {
          this.updateproposalFailure(error);
        }
    );
  }

  public updateproposalSuccess(successData, stepper){
    this.settings.loadingSpinner = false;
    if(successData.IsSuccess){
      stepper.next();
      this.toastr.success('Proposal created successfully!!');
      this.summaryData1 = successData.ResponseObject;
      this.AgentId =  this.summaryData1.AgentId;
      this.Apikey =  this.summaryData1.Apikey;
      this.PaymentRedirect =  this.summaryData1.PaymentRedirect;
      this.PaymentReturn =  this.summaryData1.PaymentReturn;
      this.ElcValue =  this.summaryData1.ElcValue;
      this.VehicleSubLine =  this.summaryData1.VehicleSubLine;
      this.VersionNo =  this.summaryData1.VersionNo;
      this.Comprehensivepremium =  this.summaryData1.Comprehensive_premium;
      this.proposerFormData = this.proposer.value;

    } else{
      this.toastr.error(successData.ErrorObject);

    }
  }
  public updateproposalFailure(error){

  }
  // policyType(){

  // }
//session Data
  sessionData(){
    if(sessionStorage.stepper1 != '' && sessionStorage.stepper1 != undefined) {
      let stepper1 = JSON.parse(sessionStorage.stepper1);
      this.proposer = this.fb.group({
        title: stepper1.title,
        firstname: stepper1.firstname,
        lastname:stepper1.lastname,
        dob :  this.datepipe.transform(stepper1.dob, 'y-MM-dd'),
        email:stepper1.email,
        mobile: stepper1.mobile,
        pincode: stepper1.pincode,
        gender : stepper1.gender,
        phoneNumber: stepper1.phoneNumber,
        occupation: stepper1.occupation,
        stdCode: stepper1.stdCode,
        address: stepper1.address,
        address2: stepper1.address2,
        address3: stepper1.address3,
        address4: stepper1.address4,
        state:stepper1.state,
        stateName:stepper1.stateName,
        city: stepper1.city,
        cityName: stepper1.cityName,
        raddress: stepper1.raddress,
        raddress2: stepper1.raddress2,
        raddress3: stepper1.raddress3,
        raddress4: stepper1.raddress4,
        rpincode: stepper1.rpincode,
        rstate:stepper1.rstate,
        rstateName:stepper1.rstateName,
        rcity: stepper1.rcity,
        rcityName: stepper1.rcityName,
        sameas: stepper1.sameas,


      });
    }
    if(sessionStorage.stepper2 != '' && sessionStorage.stepper2 != undefined) {
      let stepper2 = JSON.parse(sessionStorage.stepper2);
      this.vehical = this.fb.group({
        vehicleMostlyDrivenOn: stepper2.vehicleMostlyDrivenOn,
        vehicleRegisteredName: stepper2.vehicleRegisteredName,
        // registrationchargesRoadtax:stepper2.registrationchargesRoadtax,
        coverelectricalaccesss:stepper2.coverelectricalaccesss,
        drivingExperience: stepper2.drivingExperience,
        averageMonthlyMileageRun: stepper2.averageMonthlyMileageRun,
        companyName: stepper2.companyName,
        idv: stepper2.idv,
        isTwoWheelerFinancedValue : stepper2.isTwoWheelerFinancedValue,
        financierName: stepper2.financierName,
        isTwoWheelerFinanced: stepper2.isTwoWheelerFinanced,
        hypothecationType: stepper2.hypothecationType,
        typeOfCover:stepper2.typeOfCover,
        vechileOwnerShipChanged: stepper2.vechileOwnerShipChanged,
        electricalAccess: stepper2.electricalAccess,
        nonelectricalAccess: stepper2.nonelectricalAccess,
        accidentPaid: stepper2.accidentPaid,
        NameOfElectronicAccessories: stepper2.NameOfElectronicAccessories,
        MakeModel: stepper2.MakeModel,
        Value: stepper2.Value,
      });
    }
    if(sessionStorage.stepper3 != '' && sessionStorage.stepper3 != undefined) {
      let stepper3 = JSON.parse(sessionStorage.stepper3);
      this.previousInsure = this.fb.group({
        policyNumber: stepper3.policyNumber,
        previousInsured: stepper3.previousInsured,
        previousdob:stepper3.previousdob,
        isPreviousPolicyHolder:stepper3.isPreviousPolicyHolder,
        voluntary: stepper3.voluntary,
        claimAmount: stepper3.claimAmount,
        previousPolicyType: stepper3.previousPolicyType,
        personalAccidentCover: stepper3.personalAccidentCover,
        accidentPaid: stepper3.accidentPaid,
      });
    }
  }
}
