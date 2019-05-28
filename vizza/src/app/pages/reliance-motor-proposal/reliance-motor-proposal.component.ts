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
  public titleList: any;
  public proposerData: any;
  public summaryData: any;
  public proposerFormData: any;
  public riskFormData: any;
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
  public webhost : any;

  public nationalityList: any;
  public otherSystemNameList: any;
  public prevPolicyList: any;
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
  public buyBikeDetails: any;
  public enquiryFormData: any;
  public bikeEnquiryId: any;

  //dob
  proposerAge : any;
  personalDobError : any;
  previousDateError : any;
  constructor(public fb: FormBuilder ,public appsetting: AppSettings,public config: ConfigurationService, public validation: ValidationService ,private toastr: ToastrService, public bikeInsurance: BikeInsuranceService , public authservice: AuthService , public datepipe: DatePipe) {

    this.setting = appsetting.settings;
    this.webhost = this.config.getimgUrl();

    this.relianceProposal = this.fb.group({
      firstName : ['' , Validators.required],
      lastName : [''],
      middleName : ['' , Validators.required],
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
      prevPolStartDate : ['',Validators.required],
      prevPolSold : ['',Validators.required],
      prevInsurerAddress: ['',Validators.required],
      prevInsuranceValue: [''],
      prevYearPolicyTypeValue: [''],
    });

    this.coverDetails = this.fb.group({
      UnnamedPassengerCovered: [''],
      PAToOwnerDriverCoverd: [''],
      NilDepreciationCoverage: [''],
      LiabilityToPaidDriverCovered: [''],
      TPPDCover: [''],
      BasicODCoverage: [''],
      BasicLiability: [''],
      nrelationValue: [''],
      fuelTypeValue: [''],
      nOtherRelationValue: [''],
      NewVehicle: ['',Validators.required],
      PACoverToOwner: [''],
      cappointeeName: ['',Validators.required],
      cnomineeName: ['',Validators.required],
      cnDob: ['',Validators.required],
      nrelation: ['',Validators.required],
      nOtherRelation: ['',Validators.required],
      cnAddress: ['',Validators.required],
      fuelType: ['',Validators.required],
    });

    this.riskDetails = this.fb.group({
      // AgentName: [''],
      OtherSystemName: ['', Validators.required],
      IDV: ['', Validators.required],
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

  }

  ngOnInit() {

    this.buyBikeDetails = JSON.parse(sessionStorage.buyProductDetails);
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
    this.riskDetails.controls['OtherSystemNameValue'].patchValue(this.otherSystemNameList[this.riskDetails.controls['OtherSystemName'].value]);
  }
  changenRelation(){
    this.coverDetails.controls['nrelationValue'].patchValue(this.relationListData[this.coverDetails.controls['nrelation'].value]);
  }
  changenOtherRelation(){
    this.coverDetails.controls['nOtherRelationValue'].patchValue(this.relationListData[this.coverDetails.controls['nOtherRelation'].value]);
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
          }else if(type == 'insurer'){
            this.personalDobError = '';
          }
        } else {
          if (type == 'proposor') {
            this.personalDobError = 'Enter Valid Dob';
          }else if ( type == 'insurer'){
            this.personalDobError = 'Enter Valid Dob';
          }
        }
        selectedDate = event.value._i;
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (selectedDate.length == 10 && type == 'proposor') {
          this.proposerAge = this.ageCalculate(dob);
          // sessionStorage.proposerAgeForTravel = this.proposerAge;
        }else if(selectedDate.length ==10 && type == 'insurer') {
          this.proposerAge = this.ageCalculate(dob);
        }

      } else if (typeof event.value._i == 'object') {
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (dob.length == 10 && type == 'proposor') {
          this.proposerAge = this.ageCalculate(dob);
          this.personalDobError = '';
          // sessionStorage.proposerAgeForTravel = this.proposerAge;
        }else {
          this.proposerAge = this.ageCalculate(dob);

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

  //stepper
  nextTab(stepper,value,type){

    if(type == 'stepper1'){
      this.proposerData = value;
      sessionStorage.stepper1Details = '';
      sessionStorage.stepper1Details = JSON.stringify(value);
      this.riskDetails.controls['IDV'].patchValue(this.buyBikeDetails.Idv);

      if(this.relianceProposal.valid){
        stepper.next();
      }
    }else if(type == 'stepper2'){
      sessionStorage.stepper2Details = '';
      sessionStorage.stepper2Details = JSON.stringify(value);
      if(this.riskDetails.valid){
        stepper.next();
        this.topScroll();
      }
    }else if(type == 'stepper3'){
      sessionStorage.stepper3Details = '';
      sessionStorage.stepper3Details = JSON.stringify(value);
      if(this.coverDetails.valid){
        stepper.next();
      }
    }else{
      sessionStorage.stepper4Details = '';
      sessionStorage.stepper4Details = JSON.stringify(value);
      if(this.previousInsurance.valid){
        this.proposerFormData = this.relianceProposal.value;
        this.riskFormData = this.riskDetails.value;
        this.coverFormData = this.coverDetails.value;
        this.previousFormData = this.previousInsurance.value;



        this.createProposal(stepper);
        this.summaryData = true;
      }
    }
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

    if(sessionStorage.stepper2Details != '' && sessionStorage.stepper2Details != undefined ){
      this.getStepper2 = JSON.parse(sessionStorage.stepper2Details);
      this.riskDetails = this.fb.group({
        OtherSystemName: this.getStepper2.OtherSystemName,
        IDV: this.getStepper2.IDV,
        OtherSystemNameValue: this.getStepper2.OtherSystemNameValue,
      });
    }

    if(sessionStorage.stepper3Details != '' && sessionStorage.stepper3Details != undefined){
      this.getStepper3 = JSON.parse(sessionStorage.stepper3Details);
      this.coverDetails = this.fb.group({
        UnnamedPassengerCovered: this.getStepper3.UnnamedPassengerCovered,
        PAToOwnerDriverCoverd: this.getStepper3.PAToOwnerDriverCoverd,
        NilDepreciationCoverage: this.getStepper3.NilDepreciationCoverage,
        LiabilityToPaidDriverCovered: this.getStepper3.LiabilityToPaidDriverCovered,
        TPPDCover: this.getStepper3.TPPDCover,
        BasicODCoverage: this.getStepper3.BasicODCoverage,
        BasicLiability: this.getStepper3.BasicLiability,
        NewVehicle: this.getStepper3.NewVehicle,
        PACoverToOwner: this.getStepper3.PACoverToOwner,
        cappointeeName: this.getStepper3.cappointeeName,
        cnomineeName: this.getStepper3.cnomineeName,
        cnDob: this.datepipe.transform(this.getStepper3.cnDob, 'y-MM-dd'),
        nrelation: this.getStepper3.nrelation,
        nOtherRelation: this.getStepper3.nOtherRelation,
        cnAddress: this.getStepper3.cnAddress,
        fuelType: this.getStepper3.fuelType,
        nOtherRelationValue: this.getStepper3.nOtherRelationValue,
        nrelationValue: this.getStepper3.nrelationValue,
        fuelTypeValue: this.getStepper3.fuelTypeValue,
      });
    }

    if(sessionStorage.stepper4Details != '' && sessionStorage.stepper4Details != undefined ){
      this.getStepper4 = JSON.parse(sessionStorage.stepper4Details);
      this.previousInsurance = this.fb.group({
        prevInsurance: this.getStepper4.prevInsurance,
        prevYearPolicyType: this.getStepper4.prevYearPolicyType,
        policyNumber: this.getStepper4.policyNumber,
        prevPolStartDate: this.datepipe.transform(this.getStepper4.prevPolStartDate, 'y-MM-dd'),
        prevPolSold: this.getStepper4.prevPolSold,
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
            this.occupationFailure(error);
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
  createProposal(stepper){
alert('1');
    stepper.next();
    this.topScroll();
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
          'Salutation': this.relianceProposal.controls['title'].value,
          'MaritalStatus': this.relianceProposal.controls['maritalStatus'].value,
          'Nationality': this.relianceProposal.controls['nationality'].value
        },
        'Policy': {

          'AgentName': 'Direct',
          'OtherSystemName': this.riskDetails.controls['OtherSystemName'].value

        },
        'Risk': {
          'IDV': '30773.0',
          'IsRegAddressSameasCommAddress': 'false',
          'IsRegAddressSameasPermanentAddress': 'false',
          'IsPermanentAddressSameasCommAddress': 'true'
        },
        'Vehicle': {

          'TypeOfFuel': this.coverDetails.controls['fuelType'].value,
          'ISNewVehicle': this.coverDetails.controls['NewVehicle'].value
        },
        'Cover': {
          'IsPAToUnnamedPassengerCovered': this.coverDetails.controls['UnnamedPassengerCovered'].value,
          'IsAutomobileAssociationMember': 'true',
          'IsPAToOwnerDriverCoverd': this.coverDetails.controls['PAToOwnerDriverCoverd'].value,
          'IsLiabilityToPaidDriverCovered': this.coverDetails.controls['LiabilityToPaidDriverCovered'].value,
          'IsAntiTheftDeviceFitted': 'false',
          'IsTPPDCover': this.coverDetails.controls['TPPDCover'].value,
          'IsBasicODCoverage': this.coverDetails.controls['BasicODCoverage'].value,
          'IsBasicLiability': this.coverDetails.controls['BasicLiability'].value,
          'IsInsurancePremium': 'true',
          'NilDepreciationCoverage': this.coverDetails.controls['NilDepreciationCoverage'].value,
          'PACoverToOwner': {
            'PACoverToOwner': {
              'IsChecked': this.coverDetails.controls['PACoverToOwner'].value,
              'NoOfItems': '',
              'PackageName': '',
              'AppointeeName': '',
              'NomineeName': 'Reddy',
              'NomineeDOB': '1970-01-07',
              'NomineeRelationship': 'Father',
              'NomineeAddress': '',
              'OtherRelation': ''
            }
          },
          'PAToNamedPassenger': '',
          'PAToUnNamedPassenger': {
            'PAToUnNamedPassenger': {
              'IsChecked': 'false',
              'NoOfItems': '0',
              'SumInsured': '0'
            }
          },
          'PAToPaidDriver': {
            'PAToPaidDriver': {
              'IsChecked': '',
              'NoOfItems': '',
              'SumInsured': ''
            }
          },
          'PAToPaidCleaner': '',
          'LiabilityToPaidDriver': {
            'LiabilityToPaidDriver': {
              'NoOfItems': '1'
            }
          }
        },
        'PreviousInsuranceDetails': {
          'PrevInsuranceID': '',
          'IsVehicleOfPreviousPolicySold': this.previousInsurance.controls['prevPolSold'].value,
          'PrevYearInsurer': this.previousInsurance.controls['prevInsurance'].value,
          'PrevYearPolicyNo': this.previousInsurance.controls['policyNumber'].value,
          'PrevYearInsurerAddress': this.previousInsurance.controls['prevInsurerAddress'].value,
          'PrevYearPolicyType': this.previousInsurance.controls['prevYearPolicyType'].value,
          'PrevYearPolicyStartDate': this.previousInsurance.controls['prevPolStartDate'].value
        }
      }
    };
    this.bikeInsurance.getProposal(data).subscribe(
        (successData) => {
          this.getProposalSucccess(successData);
        },
        (error) => {
          this.getProposalFailure(error);
        }
    );
    console.log(data,'data');
  }

  getProposalSucccess(successData) {
    this.setting.loadingSpinner = false;
    if (successData.IsSuccess) {
      this.toastr.success('Proposal created successfully!!');
      // this.summaryData = successData.ResponseObject;
      // sessionStorage.summaryData = JSON.stringify(this.summaryData);
      // this.proposalId = this.summaryData.policy_id;
      // sessionStorage.bajajTravelproposalID = this.proposalId;
      // this.proposerFormData = this.bajajProposal.value;
      // this.insuredFormData = this.bajajInsuredTravel.value.items;
      // sessionStorage.proposerFormData = JSON.stringify(this.proposerFormData);
      // sessionStorage.insuredFormData = JSON.stringify(this.insuredFormData);
      // stepper.next();
      // this.topScroll();
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
