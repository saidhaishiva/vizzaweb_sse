import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidationService} from '../../shared/services/validation.service';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {DatePipe} from '@angular/common';
import {AuthService} from '../../shared/services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {AppSettings} from '../../app.settings';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatStepper} from '@angular/material';
import {FourWheelerService} from '../../shared/services/four-wheeler.service';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {forEach} from '@angular/router/src/utils/collection';

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
  public varible: any;
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
  public VehicleSubLine: any;
  public VersionNo: any;
  public ComprehensivePremium: any;
  public Comprehensivepremium: any;
  public coverList: any;
  public respincodeList: any;
  public apponiteeList: boolean;
  public accidentList: any;
  public makeModelList: any;
  public pAUnnamedPassengersList: any;
  public AddonList: any;
  public baggageList: any;
  public today: any;
  public guardianRelationList: any;
  public pincodeList: any;
  public policyList: any;
  public step: any;
  public vehicledetails: any;
  public valueList: any;
  public valueSubList: any;
  public isFourWheelerFinanced: boolean;
  public valueCalc: any;
  public valuesubCalc: any;

  constructor(public fb: FormBuilder, public validation: ValidationService, public config: ConfigurationService, public datepipe: DatePipe, public authservice: AuthService, private toastr: ToastrService,  public appSettings: AppSettings, public fourWheeler: FourWheelerService ) {
    this.step = 0;
    const minDate = new Date();
    this.minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
    let today  = new Date();
    this.today = new Date(today.getFullYear(), today.getMonth(), today.getDate());

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
      occupation: ' ',
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
      phoneNumber:  ['', Validators.compose([ Validators.pattern('[6789][0-9]{9}')])],
      stdCode: '',

    });

    this.vehical = this.fb.group({
      vehicleMostlyDrivenOn: ['', Validators.required],
      vehicleRegisteredName: ['', Validators.required],
      // registrationchargesRoadtax: ['', Validators.required],
      coverelectricalaccesss: false,
        cover_non_elec_acc: false,
      drivingExperience: ['', Validators.required],
      averageMonthlyMileageRun: '',
      accidentCoverForPaidDriver: '',
      companyName: '',
      idv: '',
      isFourWheelerFinancedValue: '',
      valueOfLossOfBaggage: '',
      quoteId: '',
      personalAccidentCoverForUnnamedPassengers: '',
      financierName: '',
      isFourWheelerFinanced: false,
      isAddon: false,
      lossOfBaggage: false,
      hypothecationType: '',
      typeOfCover: ['', Validators.required],
      addon: '',
      total: '',
      subTotal: '',
      vechileOwnerShipChanged: 'No',
      cover_dri_othr_car_ass: 'No',
      fibreGlass: 'No',
      isCarOwnershipChanged: 'No',
      legalliabilityToPaidDriver: 'No',
      windShieldGlass: 'Off',
      keyreplacement: 'Off',
      depreciationWaiver: 'Off',
      engineprotector: 'Off',
      ncbprotector: 'Off',
      registrationchargesRoadtax: 'Off',
      spareCar: 'Off',
      invoicePrice: 'Off',
      // policyED: ['', Validators.compose([ Validators.minLength(10)])],
      // policySD: ['', Validators.compose([ Validators.minLength(10)])],
      vehicleInspectionDate: ['', Validators.compose([ Validators.minLength(10)])],

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
      previousinsurersCorrectAddress: '',
      voluntary: '',
      claimAmountReceived: '',
      claimsReported: '',
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
    this.vehicledetails = JSON.parse(sessionStorage.vehicledetails);
    console.log(this.vehicledetails,'details');

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
      if (pin.length == '' || pin.length == 0 || pin.length != 6) {
        this.proposer.controls['city'].patchValue('');
      }
      for (let key in this.pincodeList.city) {
        this.proposer.controls['city'].patchValue(key);
        this.proposer.controls['cityName'].patchValue(this.pincodeList['city'][key]);
        console.log(this.proposer.controls['city'].patchValue(key),' jhgfdghj');

      }

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
      if (pin.length == '' || pin.length == 0 || pin.length != 6) {
        this.proposer.controls['rcity'].patchValue('');
      } for ( let key in this.respincodeList.city) {
        this.proposer.controls['rcity'].patchValue(key);
        this.proposer.controls['rcityName'].patchValue(this.respincodeList['city'][key]);
        console.log(this.proposer.controls['rcity'].patchValue(key),' rrrrr');
      }

    } else {
      this.toastr.error(successData.ErrorObject);
      this.proposer.controls['rcity'].patchValue('');


    }
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
          this.proposer.controls['rcityName'].patchValue( this.proposer.controls['cityName'].value)
      console.log(this.proposer.controls['rcity'].value, 'ghghghj');
      console.log(this.proposer.controls['rcityName'].value, 'nhghj');
    } else {
      this.proposer.controls['raddress'].patchValue(''),
          this.proposer.controls['raddress2'].patchValue(''),
          this.proposer.controls['rpincode'].patchValue(''),
          this.proposer.controls['rstate'].patchValue(''),
          this.proposer.controls['rcity'].patchValue(''),
          this.proposer.controls['rcityName'].patchValue('')
      console.log(this.proposer.controls['rcity'].value, 'eeeeeeee');
    }
  }
  proposerDetails(stepper: MatStepper, value) {
    console.log(value);
    sessionStorage.stepper1 = JSON.stringify(value);
    if (this.proposer.valid) {
      if (sessionStorage.fwRoyalProposerAge >= 18) {
        stepper.next();
      } else {
        this.toastr.error('Proposer age should be 18 or above');

      }

    }
  }
  // vehical details
  vehicalDetails(stepper: MatStepper, value) {
    console.log(this.vehical.value, 'vall');
    sessionStorage.stepper2 = '';
    sessionStorage.stepper2 = JSON.stringify(this.vehical.value);
    // if (this.vehical.valid) {
      console.log(this.vehical.value.electricalAccess, ' this.vehical.valid')

      this.valueCalc = [];
      this.valueList =  this.vehical.value.electricalAccess;

      console.log(this.valueList,'valueList')
      this.valueList.forEach(data => this.valueCalc.push(data.elecValue));
      console.log(this.valueCalc,'jhgjghgh');
      sessionStorage.valueList = this.valueList;
      let total = this.valueCalc.reduce((a, b) => parseInt(a) + parseInt(b));
      console.log(total,"total")

    this.valuesubCalc = [];
    let valueSubList =  this.vehical.value.nonelectricalAccess;
    console.log(valueSubList, 'nonvalueList');
    valueSubList.forEach(data => this.valuesubCalc.push(data.elecValue));
    console.log(this.valuesubCalc,'subvalue');
    let subTotal = this.valuesubCalc.reduce((a, b) => parseInt(a) + parseInt(b));
    console.log(subTotal,'subtotal');
    sessionStorage.subTotal = subTotal;

    if (total <= 50000) {
      if (subTotal <= 20000) {
        stepper.next();
        this.topScroll();
    } else {
      this.toastr.error('Non Electrical Accessories Values should be less than 20 thousand');
    }
      } else {
        this.toastr.error('Electrical Accessories Values should be less than 50 thousand');
      }

    // }
  }
  isFinaced() {
    if (this.vehical.controls['isFourWheelerFinanced'].value == true) {

    } else {
      this.vehical.controls['isFourWheelerFinancedValue'].patchValue('');
      this.vehical.controls['financierName'].patchValue('');
    }
  }

  isAddoncheck() {
    if (this.vehical.controls['isAddon'].value == true) {

    } else {
      this.vehical.controls['addon'].patchValue('');

    }
  }

  isBaggages() {
    if (this.vehical.controls['lossOfBaggage'].value == true) {

    } else {
      this.vehical.controls['valueOfLossOfBaggage'].patchValue('');
    }
  }

  eleAccess(i) {
    console.log(i, 'valuuuuuu');
    let checking = i;
    if (checking.checked == true) {
      this.vehical.controls['coverelectricalaccesss'].patchValue(true);
    } else {
      this.vehical.controls['coverelectricalaccesss'].patchValue(false);

    }
  }
  noneleAccess(i) {
    console.log(i, 'valuuuuuu');
    let check = i;
    if (check.checked == true) {
      this.vehical.controls['cover_non_elec_acc'].patchValue(true);
    } else {
      this.vehical.controls['cover_non_elec_acc'].patchValue(false);

    }
  }



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
      this.AddonList = successData.ResponseObject;
    }
  }
  public addonFailure(error) {
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
      this.apponiteeList = true;
    }  else {
      this.apponiteeList = false;

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

    const data = {
      "platform": "web",
      "user_id": this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      "role_id": this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      "pos_status": this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
      "enquiry_id": this.bikeEnquiryId,
      "created_by": '',
      "proposal_id": sessionStorage.royalFourWheelerproposalID == '' || sessionStorage.royalFourWheelerproposalID == undefined ? '' : sessionStorage.royalFourWheelerproposalID,
      "company_id": this.buyProduct.company_id,
      "business_type": this.vehicledetails.business_type,
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
          "addonValue": this.vehical.controls['addon'].value,
          "claimsMadeInPreviousPolicy": this.previousInsure.controls['isPreviousPolicyHolder'].value ,
          "claimsReported": this.previousInsure.controls['claimsReported'].value,
          "claimAmountReceived": this.previousInsure.controls['claimAmountReceived'].value,
          "averageMonthlyMileageRun": this.vehical.controls['averageMonthlyMileageRun'].value,
          "companyNameForCar": this.vehical.controls['companyName'].value,
          "cover_dri_othr_car_ass": this.vehical.controls['cover_dri_othr_car_ass'].value ,
          "drivingExperience": this.vehical.controls['drivingExperience'].value,
          "cover_elec_acc": this.vehical.controls['coverelectricalaccesss'].value ? 'Yes' : 'No',
          // "valueofelectricalaccessories": "4000",
          "electricalAccessories": {
            "electronicAccessoriesDetails": this.vehical.value.electricalAccess,
          },
          "valueofelectricalaccessories": this.vehical.controls['total'].value,
          "cover_non_elec_acc": this.vehical.controls['cover_non_elec_acc'].value ? 'Yes' : 'No',
          "nonElectricalAccesories": {
                "nonelectronicAccessoriesDetails": this.vehical.value.nonelectricalAccess,
            },
          "valueofnonelectricalaccessories": this.vehical.controls['subTotal'].value,

          "fibreGlass": this.vehical.controls['fibreGlass'].value ,
          "financierName": this.vehical.controls['financierName'].value,
          // "fuelType": "Petrol",
          "isCarFinanced": this.vehical.controls['isFourWheelerFinanced'].value ? 'Yes' : 'No',
          "isCarFinancedValue": this.vehical.controls['isFourWheelerFinancedValue'].value,
          "isCarOwnershipChanged": this.vehical.controls['isCarOwnershipChanged'].value ,
          // "isPreviousPolicyHolder": "true",
          "legalliabilityToPaidDriver": this.vehical.controls['legalliabilityToPaidDriver'].value ,
          "lossOfBaggage": this.vehical.controls['lossOfBaggage'].value ,
          // "noClaimBonusPercent": "1",
          "personalAccidentCoverForUnnamedPassengers": this.vehical.controls['personalAccidentCoverForUnnamedPassengers'].value,
          // "personalaccidentcoverforunnamedpassengers": "0",
          "policyED":  this.datepipe.transform(this.buyProduct.previous_policy_expiry_date, 'y-MM-dd')? this.datepipe.transform(this.buyProduct.previous_policy_expiry_date, 'y-MM-dd') : '',
          "policySD": this.datepipe.transform(this.buyProduct.previous_policy_start_date, 'y-MM-dd')? this.datepipe.transform(this.buyProduct.previous_policy_start_date, 'y-MM-dd') : '',
          "previousInsurerName": this.previousInsure.controls['previousInsured'].value ? this.previousInsure.controls['previousInsured'].value : '',
          // "previousPolicyExpiryDate": this.datepipe.transform(this.buyProduct.previous_policy_expiry_date, 'y-MM-dd')? this.datepipe.transform(this.buyProduct.previous_policy_expiry_date, 'y-MM-dd') : '',
          "previousPolicyType": this.previousInsure.controls['previousPolicyType'].value ? this.previousInsure.controls['previousPolicyType'].value : '',
          "previousinsurersCorrectAddress": this.previousInsure.controls['previousinsurersCorrectAddress'].value ? this.previousInsure.controls['previousinsurersCorrectAddress'].value : '',
          "previuosPolicyNumber": this.previousInsure.controls['policyNumber'].value ? this.previousInsure.controls['policyNumber'].value : '',
          "valueOfLossOfBaggage": this.vehical.controls['valueOfLossOfBaggage'].value,
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
          "registrationchargesRoadtax": this.vehical.controls['registrationchargesRoadtax'].value ,
          "spareCar": this.vehical.controls['spareCar'].value ,
          "invoicePrice": this.vehical.controls['invoicePrice'].value ,
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
      // this.toastr.success('Proposal created successfully!!');
      this.summaryData = successData.ResponseObject;
      this.ProposalId =   this.summaryData.ProposalId;
      // this.PaymentRedirect =   this.summaryData.PaymentRedirect;
      this.referenceId =   this.summaryData.ReferenceId;
      this.ComprehensivePremium =   this.summaryData.Comprehensive_premium;
      sessionStorage.royalFourWheelerproposalID = this.ProposalId;
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
  public proposalFailure(error) {

  }


  updateproposal(stepper) {
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
      "business_type": this.vehicledetails.business_type,
      "CALCULATEPREMIUMREQUEST": {
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
          "isCarFinanced": this.vehical.controls['isFourWheelerFinanced'].value ? 'Yes' : 'No',
          "financierName": this.vehical.controls['financierName'].value,
          "isCarFinancedValue": this.vehical.controls['isFourWheelerFinancedValue'].value,
          "vehicleRegisteredInTheNameOf": this.vehical.controls['vehicleRegisteredName'].value,
          "companyNameForCar":this.vehical.controls['companyName'].value,
          "vehicleMostlyDrivenOn": this.vehical.controls['vehicleMostlyDrivenOn'].value,
          "drivingExperience": this.vehical.controls['drivingExperience'].value,
          "cover_elec_acc": this.vehical.controls['coverelectricalaccesss'].value ? 'Yes' : 'No',
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
          "legalliabilityToPaidDriver":this.vehical.controls['legalliabilityToPaidDriver'].value ,
          "lossOfBaggage":this.vehical.controls['lossOfBaggage'].value ,
          "electricalAccessories": {
            "electronicAccessoriesDetails": this.vehical.value.electricalAccess,
          },
          "valueofelectricalaccessories": this.vehical.controls['total'].value,
            "cover_non_elec_acc": this.vehical.controls['cover_non_elec_acc'].value ? 'Yes' : 'No',
            "nonElectricalAccesories": {
                "nonelectronicAccessoriesDetails": this.vehical.value.nonelectricalAccess,
            },
          "valueofnonelectricalaccessories": this.vehical.controls['subTotal'].value,
          "addonValue": this.vehical.controls['addon'].value,
          "typeOfCover": this.vehical.controls['typeOfCover'].value,
            "keyreplacement": this.vehical.controls['keyreplacement'].value ,
            "windShieldGlass": this.vehical.controls['windShieldGlass'].value ,
            "depreciationWaiver": this.vehical.controls['depreciationWaiver'].value ,
            "engineprotector": this.vehical.controls['engineprotector'].value ,
            "ncbprotector": this.vehical.controls['ncbprotector'].value ,
            "registrationchargesRoadtax": this.vehical.controls['registrationchargesRoadtax'].value ,
            "spareCar": this.vehical.controls['spareCar'].value ,
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
      this.AgentId =  this.summaryData1.AgentId;
      this.Apikey =  this.summaryData1.Apikey;
      this.PaymentRedirect =  this.summaryData1.PaymentRedirect;
      this.PaymentReturn =  this.summaryData1.PaymentReturn;
      this.ElcValue =  this.summaryData1.ElcValue;
      this.VehicleSubLine =  this.summaryData1.VehicleSubLine;
      this.VersionNo =  this.summaryData1.VersionNo;
      this.Comprehensivepremium =  this.summaryData1.Comprehensive_premium;
      this.proposerFormData = this.proposer.value;

    } else {
      this.toastr.error(successData.ErrorObject);

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
        mobile: stepper1.mobile,
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
      this.vehical.controls['idv'].patchValue(this.getStepper2.idv);
      this.vehical.controls['isFourWheelerFinancedValue'].patchValue(this.getStepper2.isFourWheelerFinancedValue);
      this.vehical.controls['valueOfLossOfBaggage'].patchValue(this.getStepper2.valueOfLossOfBaggage);
      this.vehical.controls['personalAccidentCoverForUnnamedPassengers'].patchValue(this.getStepper2.personalAccidentCoverForUnnamedPassengers);
      this.vehical.controls['financierName'].patchValue(this.getStepper2.financierName);
      this.vehical.controls['isFourWheelerFinanced'].patchValue(this.getStepper2.isFourWheelerFinanced);
      this.vehical.controls['isAddon'].patchValue(this.getStepper2.isAddon);
      this.vehical.controls['lossOfBaggage'].patchValue(this.getStepper2.lossOfBaggage);
      this.vehical.controls['hypothecationType'].patchValue(this.getStepper2.hypothecationType);
      this.vehical.controls['typeOfCover'].patchValue(this.getStepper2.typeOfCover);
      this.vehical.controls['vechileOwnerShipChanged'].patchValue(this.getStepper2.vechileOwnerShipChanged);
      this.vehical.controls['cover_dri_othr_car_ass'].patchValue(this.getStepper2.cover_dri_othr_car_ass);
      this.vehical.controls['addon'].patchValue(this.getStepper2.addon);
      this.vehical.controls['fibreGlass'].patchValue(this.getStepper2.fibreGlass);
      this.vehical.controls['windShieldGlass'].patchValue(this.getStepper2.windShieldGlass);
      this.vehical.controls['keyreplacement'].patchValue(this.getStepper2.keyreplacement);
      this.vehical.controls['depreciationWaiver'].patchValue(this.getStepper2.depreciationWaiver);
      this.vehical.controls['engineprotector'].patchValue(this.getStepper2.engineprotector);
      this.vehical.controls['ncbprotector'].patchValue(this.getStepper2.ncbprotector);
      this.vehical.controls['registrationchargesRoadtax'].patchValue(this.getStepper2.registrationchargesRoadtax);
      this.vehical.controls['spareCar'].patchValue(this.getStepper2.spareCar);
      this.vehical.controls['invoicePrice'].patchValue(this.getStepper2.invoicePrice);
      this.vehical.controls['isCarOwnershipChanged'].patchValue(this.getStepper2.isCarOwnershipChanged);
      this.vehical.controls['legalliabilityToPaidDriver'].patchValue(this.getStepper2.legalliabilityToPaidDriver);
      this.vehical.controls['total'].patchValue(this.getStepper2.total);
      this.vehical.controls['subTotal'].patchValue(this.getStepper2.subTotal);



      //   drivingExperience: this.getStepper2.drivingExperience,
      //   averageMonthlyMileageRun: this.getStepper2.averageMonthlyMileageRun,
      //   accidentCoverForPaidDriver: this.getStepper2.accidentCoverForPaidDriver,
      //   companyName: this.getStepper2.companyName,
      //   idv: this.getStepper2.idv,
      //   isFourWheelerFinancedValue : this.getStepper2.isFourWheelerFinancedValue,
      //   valueOfLossOfBaggage : this.getStepper2.valueOfLossOfBaggage,
      //   quoteId : this.getStepper2.quoteId,
      //   total : this.getStepper2.total,
      //   subTotal : this.getStepper2.subTotal,
      //   personalAccidentCoverForUnnamedPassengers : this.getStepper2.personalAccidentCoverForUnnamedPassengers,
      //   financierName: this.getStepper2.financierName,
      //   isFourWheelerFinanced: this.getStepper2.isFourWheelerFinanced,
      //   isAddon: this.getStepper2.isAddon,
      //     lossOfBaggage: this.getStepper2.lossOfBaggage,
      //   hypothecationType: this.getStepper2.hypothecationType,
      //   typeOfCover: this.getStepper2.typeOfCover,
      //   vechileOwnerShipChanged: this.getStepper2.vechileOwnerShipChanged,
      //   cover_dri_othr_car_ass: this.getStepper2.cover_dri_othr_car_ass,
      //   addon: this.getStepper2.addon,
      //   fibreGlass: this.getStepper2.fibreGlass,
      //   windShieldGlass: this.getStepper2.windShieldGlass,
      //   keyreplacement: this.getStepper2.keyreplacement,
      //     depreciationWaiver: this.getStepper2.depreciationWaiver,
      //     engineprotector: this.getStepper2.engineprotector,
      //     ncbprotector: this.getStepper2.ncbprotector,
      //   registrationchargesRoadtax: this.getStepper2.registrationchargesRoadtax,
      //     spareCar: this.getStepper2.spareCar,
      //     invoicePrice: this.getStepper2.invoicePrice,
      //   isCarOwnershipChanged: this.getStepper2.isCarOwnershipChanged,
      //   legalliabilityToPaidDriver: this.getStepper2.legalliabilityToPaidDriver,
      //   electricalAccess: this.getStepper2.value.electricalAccess,
      //     nonelectricalAccess: this.getStepper2.nonelectricalAccess,
      //   accidentPaid: this.getStepper2.accidentPaid
      // });
      console.log(this.vehical,'vehical');
    }

    console.log(this.vehical, " stepper2 ");

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
    console.log(this.previousInsure, " stepper3 ");

    if (sessionStorage.stepper4 != '' && sessionStorage.stepper4 != undefined) {
      let stepper4 = JSON.parse(sessionStorage.stepper4);
      this.nomineeDetail = this.fb.group({
        nomineeName: stepper4.nomineeName,
        nomineeAge: stepper4.nomineeAge,
        nomineeRelationship: stepper4.nomineeRelationship,
        guardianName: stepper4.guardianName,
        guardianAge: stepper4.guardianAge,
        guardianRelationship: stepper4.guardianRelationship,

      });
    }
    console.log(this.nomineeDetail, " stepper4 ");


  }
  communicateCity() {
    this.proposer.controls['cityName'].patchValue(this.cityCommList[this.proposer.controls['city'].value]);

  }
  registrationCity() {
    this.proposer.controls['rcityName'].patchValue(this.rescityList[this.proposer.controls['rcity'].value]);

  }
}
