import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {ValidationService} from '../../shared/services/validation.service';
import {DatePipe} from '@angular/common';
import {AuthService} from '../../shared/services/auth.service';
import {BikeInsuranceService} from '../../shared/services/bike-insurance.service';
import {ToastrService} from 'ngx-toastr';



@Component({
  selector: 'app-reliance-motor-proposal',
  templateUrl: './reliance-motor-proposal.component.html',
  styleUrls: ['./reliance-motor-proposal.component.scss']
})
export class RelianceMotorProposalComponent implements OnInit {

  relianceProposal : FormGroup;
  previousInsurance : FormGroup;
  coverDetails : FormGroup;
  public titleList: any;
  public proposerData: any;
  public getStepper1: any;
  public fuelTypeList: any;
  public prevInsurerList: any;
  public maritalList: any;
  public nationalityList: any;
  public prevPolicyList: any;
  public occupationList: any;
  public commAddressList: any;
  public perAddressList: any;
  public regAddressList: any;
  public checkcomm: boolean;
  public checkperm: boolean;
  public minDate: any;
  public today: any;


  //dob
  proposerAge : any;
  personalDobError : any;
  previousDateError : any;
  ageCalculate : any;
  constructor(public fb: FormBuilder , public validation: ValidationService ,private toastr: ToastrService, public bikeInsurance: BikeInsuranceService , public authservice: AuthService , public datepipe: DatePipe) {
    this.relianceProposal = this.fb.group({
      firstName : ['' , Validators.required],
      lastName : ['' , Validators.required],
      middleName : ['' , Validators.required],
      dob : ['' , Validators.required],
      title : ['' , Validators.required],
      occupation : ['' , Validators.required],
      maritalStatus : ['',Validators.required],
      nationality : ['' , Validators.required],
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
      pstate : ['' , Validators.required],
      rstate : ['' , Validators.required],
      city : ['' , Validators.required],
      pcity : ['' , Validators.required],
      rcity : ['' , Validators.required],
      district : ['' , Validators.required],
      pdistrict : ['' , Validators.required],
      rdistrict : ['' , Validators.required],
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
      gender : ['' , Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],

      mobile: ['', Validators.compose([Validators.pattern('[6789][0-9]{9}')])],
    });

    this.previousInsurance = this.fb.group({
      prevInsurance : [''],
      prevYearPolicyType : [''],
      policyNumber : [''],
      prevPolStartDate : [''],
      prevPolSold : [''],
      prevInsurerAddress: [''],
    });

    this.coverDetails = this.fb.group({
      UnnamedPassengerCovered: [''],
      AutomobileAssociationMember: [''],
      PAToOwnerDriverCoverd: [''],
      LiabilityToPaidDriverCovered: [''],
      AntiTheftDeviceFitted: [''],
      TPPDCover: [''],
      BasicODCoverage: [''],
      BasicLiability: [''],
      InsurancePremium: [''],
      NewVehicle: [''],
      fuelType: ['',Validators.required],
    });
    this.nationalityList = {
      '1949': 'Indian',
      '1950': 'others',
    }

  }

  ngOnInit() {
    this.changeGender();
    this.occupation();
    this.fueltype();
    this.prevInsurer();
    this.prevPolicy();
    this.session();
    this.maritalStatus();
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
    this.bikeInsurance.getTitleList(data).subscribe(
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
    this.proposerData = value;
    sessionStorage.stepper1Details = '';
    sessionStorage.stepper1Details = JSON.stringify(value);
    if(this.relianceProposal.valid){
      stepper.next();
    }
}

//session
  session(){
    if (sessionStorage.stepper1Details != '' && sessionStorage.stepper1Details != undefined) {
      this.getStepper1 = JSON.parse(sessionStorage.stepper1Details);
      this.relianceProposal = this.fb.group({
        firstName : this.getStepper1.firstName,
        lastName : this.getStepper1.lastName,
        middleName : this.getStepper1.middleName,
        dob : this.getStepper1.dob,
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
        pstate : this.getStepper1.pstate,
        rstate : this.getStepper1.rstate,
        city : this.getStepper1.city,
        pcity : this.getStepper1.pcity,
        rcity : this.getStepper1.rcity,
        district : this.getStepper1.district,
        pdistrict : this.getStepper1.pdistrict,
        rdistrict : this.getStepper1.rdistrict,
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


      });
    }}



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
        this.relianceProposal.controls['state'].patchValue(this.commAddressList.state_name);
        this.relianceProposal.controls['district'].patchValue(this.commAddressList.district_name);
      }else if(type == 'perm'){
        this.perAddressList = successData.ResponseObject;
        this.relianceProposal.controls['pcity'].patchValue(this.perAddressList.city_village_name);
        this.relianceProposal.controls['pstate'].patchValue(this.perAddressList.state_name);
        this.relianceProposal.controls['pdistrict'].patchValue(this.perAddressList.district_name);
      }else if(type == 'registration'){
        this.regAddressList = successData.ResponseObject;
        this.relianceProposal.controls['rcity'].patchValue(this.regAddressList.city_village_name);
        this.relianceProposal.controls['rstate'].patchValue(this.regAddressList.state_name);
        this.relianceProposal.controls['rdistrict'].patchValue(this.regAddressList.district_name);
      }
    } else if (successData.IsSuccess != true ){
      if (type == 'comm') {
        this.toastr.error('Fill Valid Pincode');
        this.relianceProposal.controls['city'].patchValue('');
        this.relianceProposal.controls['state'].patchValue('');
        this.relianceProposal.controls['district'].patchValue('');
      }else if (type == 'perm'){
        this.toastr.error('Fill Valid Pincode');
        this.relianceProposal.controls['pcity'].patchValue('');
        this.relianceProposal.controls['pstate'].patchValue('');
        this.relianceProposal.controls['pdistrict'].patchValue('');
      }else if (type == 'registration'){
        this.toastr.error('Fill Valid Pincode');
        this.relianceProposal.controls['rcity'].patchValue('');
        this.relianceProposal.controls['rstate'].patchValue('');
        this.relianceProposal.controls['rdistrict'].patchValue('');
      }
    }

  }
    pinListFailure(error){

  }


  // same as address

  sameAsAddress(type) {
    if(type == 'pcomm') {
      if (this.relianceProposal.controls['sameAsAddress'].value) {
        this.relianceProposal.controls['paddress'].patchValue(this.relianceProposal.controls['address'].value);
        this.relianceProposal.controls['paddress2'].patchValue(this.relianceProposal.controls['address2'].value);
        this.relianceProposal.controls['paddress3'].patchValue(this.relianceProposal.controls['address3'].value);
        this.relianceProposal.controls['pcity'].patchValue(this.relianceProposal.controls['city'].value);
        this.relianceProposal.controls['ppincode'].patchValue(this.relianceProposal.controls['pincode'].value);
        this.relianceProposal.controls['pstate'].patchValue(this.relianceProposal.controls['state'].value);
        this.relianceProposal.controls['pdistrict'].patchValue(this.relianceProposal.controls['district'].value);
      }else{
        this.relianceProposal.controls['paddress'].patchValue('');
        this.relianceProposal.controls['paddress2'].patchValue('');
        this.relianceProposal.controls['paddress3'].patchValue('');
        this.relianceProposal.controls['pcity'].patchValue('');
        this.relianceProposal.controls['ppincode'].patchValue('');
        this.relianceProposal.controls['pstate'].patchValue('');
        this.relianceProposal.controls['pdistrict'].patchValue('');
      }
    }else if (type == 'regcomm'){
      console.log(this.relianceProposal.controls['regSameAscommAddress'],'vvvvv');
      if (this.relianceProposal.controls['regSameAscommAddress'].value ) {
        this.checkcomm = true;
        this.checkperm = false;
        this.relianceProposal.controls['raddress'].patchValue(this.relianceProposal.controls['address'].value);
        this.relianceProposal.controls['raddress2'].patchValue(this.relianceProposal.controls['address2'].value);
        this.relianceProposal.controls['raddress3'].patchValue(this.relianceProposal.controls['address3'].value);
        this.relianceProposal.controls['rcity'].patchValue(this.relianceProposal.controls['city'].value);
        this.relianceProposal.controls['rpincode'].patchValue(this.relianceProposal.controls['pincode'].value);
        this.relianceProposal.controls['rstate'].patchValue(this.relianceProposal.controls['state'].value);
        this.relianceProposal.controls['rdistrict'].patchValue(this.relianceProposal.controls['district'].value);
      }else{
        this.relianceProposal.controls['raddress'].patchValue('');
        this.relianceProposal.controls['raddress2'].patchValue('');
        this.relianceProposal.controls['raddress3'].patchValue('');
        this.relianceProposal.controls['rcity'].patchValue('');
        this.relianceProposal.controls['rpincode'].patchValue('');
        this.relianceProposal.controls['rstate'].patchValue('');
        this.relianceProposal.controls['rdistrict'].patchValue('');
      }
    }else if(type == 'regperm'){

      if (this.relianceProposal.controls['regSameAspermAddress'].value) {
        this.checkperm= true;
        this.checkcomm= false;
        this.relianceProposal.controls['raddress'].patchValue(this.relianceProposal.controls['paddress'].value);
        this.relianceProposal.controls['raddress2'].patchValue(this.relianceProposal.controls['paddress2'].value);
        this.relianceProposal.controls['raddress3'].patchValue(this.relianceProposal.controls['paddress3'].value);
        this.relianceProposal.controls['rcity'].patchValue(this.relianceProposal.controls['pcity'].value);
        this.relianceProposal.controls['rpincode'].patchValue(this.relianceProposal.controls['ppincode'].value);
        this.relianceProposal.controls['rstate'].patchValue(this.relianceProposal.controls['pstate'].value);
        this.relianceProposal.controls['rdistrict'].patchValue(this.relianceProposal.controls['pdistrict'].value);
      }else{
        this.relianceProposal.controls['raddress'].patchValue('');
        this.relianceProposal.controls['raddress2'].patchValue('');
        this.relianceProposal.controls['raddress3'].patchValue('');
        this.relianceProposal.controls['rcity'].patchValue('');
        this.relianceProposal.controls['rpincode'].patchValue('');
        this.relianceProposal.controls['rstate'].patchValue('');
        this.relianceProposal.controls['rdistrict'].patchValue('');
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
