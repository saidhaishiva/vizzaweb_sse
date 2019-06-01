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
public drivenList: any;
public nomineeRelation: any;
public addElectrical: any;
public registrationNameList: any;
public fuelTypeList: any;
public addnonElectrical: any;
public summaryData: any;
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
      gender: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
      mobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
      occupation: ' ',
      address: ['', Validators.required],
      address2: ['', Validators.required],
      address3: '',
      address4: '',
      pincode: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      raddress: ['', Validators.required],
      raddress2: ['', Validators.required],
      raddress3: '',
      raddress4: '',
      rpincode: ['', Validators.required],
      rstate: ['', Validators.required],
      rcity: ['', Validators.required],
      sameas:''
    });

    this.vehical = this.fb.group({
      vehicleMostlyDrivenOn: ['', Validators.required],
      vehicleRegisteredName:'' ,
      registrationchargesRoadtax: ['', Validators.required],
      coverelectricalaccesss: '',
      drivingExperience: '',
      idv: '',
      isTwoWheelerFinancedValue: '',
      financierName: '',
      fuelType: '',
      isTwoWheelerFinanced: '',
      hypothecationType: '',
        hypothecationBankName: '',
        noncoverelectricalaccesss: '',
        vechileOwnerShipChanged: '',
      electricalAccess : new FormArray([
        this.create()
      ]),
      nonelectricalAccess : new FormArray([
        this.createnonElectrical()
      ]),
    });

    this.previousInsure = this.fb.group({
      policyNumber: '',
      previousInsured: '',
      previousdob:'',
      isPreviousPolicyHolder:''

    });
      this.nomineeDetail = this.fb.group({
          nomineeName: '',
          nomineeAge: '',
          nomineeRelationship: '',
          appointeeName: '',
          appointeeRelationship: ''
      });
  }



  ngOnInit() {
    this.title();
    this.getOccupation();
    this.changehypothecation();
    this.changehypothecationType();
    this.changePreviousInsureType();
    this.getVehicalMostly();
    this.changeVehicleName();
     this.changeFuelType();
     this.nomineeRelationShip();
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
      namesOfElectrical: new FormControl('', Validators.required),
      model :  new FormControl('', Validators.required),
      value :  new FormControl('', Validators.required),
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
            this.pinProposerListSuccess(successData);
          },
          (error) => {
            this.pinProposerListFailure(error);
          }
      );
    }
  }

  public pinProposerListSuccess(successData) {
    if (successData.IsSuccess) {
      this.pincodeList = successData.ResponseObject;
      console.log(this.pincodeList,'jhgfdghj');
      for(let key in this.pincodeList.state) {
        this.pincodeState = key;
        console.log(key);
        console.log(this.pincodeState,'sswdesers');
        console.log(this.pincodeList['state'][key]);
        this.stateList = this.pincodeList['state'][key];
        console.log(this.pincodeState, 'kjhfgdghj');
        this.proposer.controls['state'].patchValue(this.pincodeList['state'][key]);
      }
      for(let key in this.pincodeList.city) {
        this.pincodeCity = key;
        console.log(key);
        console.log(this.pincodeList['state'][key]);
        console.log(this.pincodeCity,'ciytyer');

        this.proposer.controls['city'].patchValue(this.pincodeList['city'][key]);
      }

    } else{
      this.toastr.error(successData.ErrorObject);
      this.proposer.controls['state'].patchValue('');
      this.proposer.controls['city'].patchValue('');
    }
  }


  public pinProposerListFailure(error) {
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
      if(this.proposer.controls['sameas'].patchValue(true)){
        this.proposer.controls['raddress'].patchValue( this.proposer.controls['address'].value),
        this.proposer.controls['raddress2'].patchValue( this.proposer.controls['address2'].value),
        this.proposer.controls['rpincode'].patchValue( this.proposer.controls['pincode'].value),
        this.proposer.controls['rstate'].patchValue( this.proposer.controls['state'].value),
        this.proposer.controls['rcity'].patchValue( this.proposer.controls['city'].value)
      } else {
            this.proposer.controls['sameas'].patchValue(false),
            this.proposer.controls['raddress'].patchValue(''),
            this.proposer.controls['raddress2'].patchValue(''),
            this.proposer.controls['rpincode'].patchValue(''),
            this.proposer.controls['rstate'].patchValue(''),
            this.proposer.controls['rcity'].patchValue('')
      }
  }
  proposerDetails(stepper: MatStepper,value){
    console.log(value);
    sessionStorage.stepper1 = JSON.stringify(value);
    stepper.next();

  }
  // vehical details
  vehicalDetails(stepper: MatStepper,value){
    console.log(value);
    sessionStorage.stepper2 = JSON.stringify(value);
    stepper.next();

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
    this.bikeInsurance.getHypothecationType(data).subscribe(
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
  changeFuelType() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0'

    }
    this.bikeInsurance.getFuelLists(data).subscribe(
        (successData) => {
          this.fuelListSuccess(successData);
        },
        (error) => {
          this.fuelListFailure(error);
        }
    );
  }
  public fuelListSuccess(successData){
    if (successData.IsSuccess) {
      this.fuelTypeList = successData.ResponseObject;
    }
  }
  public fuelListFailure(error) {
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
   // next
    previousDetails(stepper: MatStepper,value){
        stepper.next();

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
        this.proposal(stepper);

      // if(this.nomineeDetail.valid){
        //     if(this.nomineeDetail['controls'].nomineeAge.value > 17) {
        //         this.proposal(stepper);
        //     } else {
        //         if(this.nomineeDetail['controls'].appointeeName.value !="" && this.nomineeDetail['controls'].appointeeRelationship.value !="")  {
        //             this.proposal(stepper);
        //         }   else {
        //             this.toastr.error('Please fill the appointee details');
        //         }
        //     }
        // }

    }
    // proposal creation
proposal(stepper){
  const data = {

    "CALCULATEPREMIUMREQUEST": {
    "proposerDetails": {
          'title': this.proposer.controls['title'].value,
          'firstName': this.proposer.controls['firstname'].value,
          'lastName':  this.proposer.controls['lastname'].value,
          'emailId':  this.proposer.controls['email'].value,
          'mobileNo':  this.proposer.controls['mobile'].value,
          'dateOfBirth':  this.proposer.controls['dob'].value,
          'occupation':  this.proposer.controls['occupation'].value,
          'nomineeName': "nomineename",
          'nomineeAge': "43",
          'relationshipWithNominee': "Cousin",
          'guardianName': "guardianname",
          'guardianAge': "54",
          'relationshipwithGuardian': "Mother",
          'permanentAddress1':  this.proposer.controls['address'].value,
          'permanentAddress2':  this.proposer.controls['address2'].value,
          'permanentAddress3':  this.proposer.controls['address3'].value,
          'permanentAddress4':  this.proposer.controls['address4'].value,
          'permanentCity': this.proposer.controls['city'].value,
          'permanentPincode':  this.proposer.controls['pincode'].value,
          'sameAdressReg': this.proposer.controls['sameas'].value,
          'ResidenceAddressOne':  this.proposer.controls['raddress'].value,
          'ResidenceAddressTwo':  this.proposer.controls['raddress2'].value,
          'ResidenceAddressThree':  this.proposer.controls['raddress3'].value,
          'ResidenceAddressFour':  this.proposer.controls['raddress2'].value,
          'ResidenceCity': this.proposer.controls['rcity'].value,
          'ResidencePinCode':  this.proposer.controls['rpincode'].value,
          'passwordResetted': "",
          'strStdCode': "044",
          'strPhoneNo': "2456984"
    },
    "vehicleDetails": {
      "vehicleModelCode": "ZWTV301",
          "planOpted": "Flexi Plan",
          "yearOfManufacture": "2018",
          "drivingExperience":  this.vehical.controls['drivingExperience'].value,
          "voluntaryDeductible": '',
          "vehicleManufacturerName":  '',
          "engineProtectorPremium": "",
          "idv": "50360",
          "vehicleMostlyDrivenOn":  this.vehical.controls['vehicleMostlyDrivenOn'].value,
          "vehicleRegisteredInTheNameOf":  this.vehical.controls['vehicleRegisteredName'].value,
          "modelName": "Activa 3G",
          "vehicleRegDate": "15/04/2018",
          "isPreviousPolicyHolder": this.vehical.controls['isPreviousPolicyHolder'].value,
          "previousPolicyExpiryDate": "16/05/2019",
          "previousPolicyNo": "",
          "policyTerm": "3",
          "previousInsurerName":  this.previousInsure.controls['previousInsured'].value,
          "registrationNumber": "MH-01-AA-1234",
          "productName": "RolloverTwoWheeler",
          "engineProtector": "off",
          "depreciationWaiver": "off",
          "companyNameForCar": "xerago",
          "engineNumber": "565465466",
          "chassisNumber": "5654656",
          "previousPolicyType": '',
          "isTwoWheelerFinanced":  this.vehical.controls['isTwoWheelerFinanced'].value,
          "isTwoWheelerFinancedValue":  this.vehical.controls['isTwoWheelerFinancedValue'].value,
          "financierName":  this.vehical.controls['financierName'].value,
          "vehicleSubLine": "motorCycle",
          "registrationchargesRoadtax": "off",
          "fuelType":  this.vehical.controls['fuelType'].value,
          "automobileAssociationMembership": "no",
          "region": "West Region",
          "carRegisteredCity": "MUMBAI",
          "averageMonthlyMileageRun":  '',
          "isProductCheck": "true",
          "product": "",
          "engineCapacityAmount": "109.2 CC",
          "personalAccidentCoverForUnnamedPassengers": [
        "",
        "100000"
      ],
          "accidentCoverForPaidDriver": [
        "",
        "100000"
      ],
          "legalliabilityToPaidDriver": "Yes",
          "legalliabilityToEmployees": "No",
          "policyStartDate": "17/04/2019",
          "cover_elec_acc": "No",
          "nonElectricalAccesories": {
        "nonelectronicAccessoriesDetails": [{
          "NameOfElectronicAccessories": "Tyre",
              "MakeModel": "TVS",
              "Value": "0"
        }]
      },
      "electricalAccessories": {
        "electronicAccessoriesDetails": {
          "NameOfElectronicAccessories": "Headlight",
              "MakeModel": "Philips",
              "Value": "0"
        }
      },
      "vechileOwnerShipChanged": "No",
          "claimsMadeInPreviousPolicy": "no",
          "claimAmountReceived": "0",
          "claimsReported": "0",
          "ncbprevious": "1"
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
      stepper.next();
      this.toastr.success('Proposal created successfully!!');
      this.summaryData = successData.ResponseObject;
      // this.ProposalId =   this.summaryData.ProposalId;
      // this.PaymentRedirect =   this.summaryData.PaymentRedirect;
      // this.PolicySisID =   this.summaryData.PolicySisID;
      // this.PaymentReturn =   this.summaryData.PaymentReturn;
      // sessionStorage.shiramBikeproposalID = this.ProposalId;
      // this.proposerFormData = this.proposer.value;
      // this.vehicalFormData = this.vehical.value;
      // this.previousFormData = this.previousInsure.value;
      // this.nomineeFormData = this.nomineeDetail.value;
    } else{
      this.toastr.error(successData.ErrorObject);

    }
  }
  public proposalFailure(error){

  }




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
        occupation: stepper1.occupation,
        address: stepper1.address,
        address2: stepper1.address2,
        address3: stepper1.address3,
        address4: stepper1.address4,
        state:stepper1.state,
        city: stepper1.city,
        raddress: stepper1.raddress,
        raddress2: stepper1.raddress2,
        raddress3: stepper1.raddress3,
        raddress4: stepper1.raddress4,
        rpincode: stepper1.rpincode,
        rstate:stepper1.rstate,
        rcity: stepper1.rcity,
        sameas: stepper1.sameas,


      });
    }
    if(sessionStorage.stepper2 != '' && sessionStorage.stepper2 != undefined) {
      let stepper2 = JSON.parse(sessionStorage.stepper2);
      this.proposer = this.fb.group({
        vehicleMostlyDrivenOn: stepper2.vehicleMostlyDrivenOn,
        vehicleRegisteredName: stepper2.vehicleRegisteredName,
        registrationchargesRoadtax:stepper2.registrationchargesRoadtax,
        coverelectricalaccesss:stepper2.coverelectricalaccesss,
        drivingExperience: stepper2.drivingExperience,
        idv: stepper2.idv,
        isTwoWheelerFinancedValue : stepper2.isTwoWheelerFinancedValue,
        financierName: stepper2.financierName,
        fuelType: stepper2.fuelType,
        isTwoWheelerFinanced: stepper2.isTwoWheelerFinanced,
        hypothecationType: stepper2.hypothecationType,
        hypothecationBankName: stepper2.hypothecationBankName,
        noncoverelectricalaccesss:stepper2.noncoverelectricalaccesss,
        vechileOwnerShipChanged: stepper2.vechileOwnerShipChanged,
        electricalAccess: stepper2.electricalAccess,
        nonelectricalAccess: stepper2.nonelectricalAccess,
        namesOfElectrical: stepper2.namesOfElectrical,
        model: stepper2.model,
        value: stepper2.value,
        namesOfNonElectrical: stepper2.namesOfNonElectrical,
        modelnonElectrical: stepper2.modelnonElectrical,
        valuenonelectrical: stepper2.valuenonelectrical,
      });
    }
  }
}
