import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidationService} from '../../shared/services/validation.service';
import {MatStepper} from '@angular/material';
import {PersonalAccidentService} from '../../shared/services/personal-accident.service';
import {Settings} from '../../app.settings.model';
import {AppSettings} from '../../app.settings';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../shared/services/auth.service';
import {DatePipe} from '@angular/common';
@Component({
  selector: 'app-bike-shriram-proposal',
  templateUrl: './bike-shriram-proposal.component.html',
  styleUrls: ['./bike-shriram-proposal.component.scss']
})
export class BikeShriramProposalComponent implements OnInit {
  public proposer: FormGroup;
  public nomineeDetail: FormGroup;
  public minDate: any;
  public maxdate: any;
  public shriramProposer: any;
  public pinProposerList: any;
  public settings: Settings;
  public proposerRatioDetail: boolean;
  public driverAgeDetail: boolean;
  public insurerdateError: any;
  public proposerAgeP: any;
  public insurestardate: any;
  public insureenddate: any;
  public insuredAgeP: any;
  public maxStartdate: any;
  public pannumberP: boolean;
  public bikeCityList: any;
  public bkVehicleList: any;
  public bikeProposerAge: any;
  public proposerdateError: any;
  public nomineeAge: any;

  constructor(public fb: FormBuilder, public validation: ValidationService, public datepipe: DatePipe, public authservice: AuthService, private toastr: ToastrService,  public appSettings: AppSettings, public personalservice: PersonalAccidentService ) {
    this.proposer = this.fb.group({
      title: ['', Validators.required],
      name: new FormControl(''),
      dob: ['', Validators.compose([Validators.required])],
      gender: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
      mobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
      pincode: ['', Validators.required],
      vehiclePurpose: ' ',
      radio: ' ',
      alterMobile: ['', Validators.compose([Validators.pattern('[6789][0-9]{9}')])],
      proposerFax: ['', Validators.compose([ Validators.minLength(10)])],
      proposerPan: ['', Validators.compose([ Validators.minLength(10)])],
      proposerGst: ['', Validators.compose([Validators.minLength(15)])],
      proposerAddress: ['', Validators.required],
      proposerAddress2: '',
      proposerAddress3: '',
      proposerbkState: ['', Validators.required],
      proposerbkCity: ['', Validators.required],
      proposerbkCityName: '',
      convertNoteNo: ['', Validators.required],
      convertNoteDt: ['', Validators.compose([Validators.required])],
      vehicleType: ['', Validators.required],
      vehicleTypeName: '',
      vehicleIDV: '',
      noEmpCoverLL: '',
      vehicleColour: '',
      driverAge: '',
      BreakIn: '',
      nilDepreciationCover: '',
      unnamedPassenger: '',
      unnamedPassengerSI: '',
      electricalAccess: '',
      electricalAccessSI: '',
      nonElectricalAccess: '',
      nonElectricalAccessSI: '',
      pdConductorCleaner: '',
      pdConductorCleanerSI: '',
      pdCount: '',
      pConductorCount: '',
      pCleanerCount: '',
      eleAccessRemark: '',
      nonEleAccessRemark: '',
      specifiedPersonField: '',
      paOWexclusion: '',
      paOWexReason: '',
      insuredPaCityIdP: '',
      insuredPaStateIdP: '',
      nDob: '',
     });
    const minDate = new Date();
    this.minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
    this.maxdate = this.minDate;

    this.settings = this.appSettings.settings;
    this.settings.HomeSidenavUserBlock = false;
    this.settings.sidenavIsOpened = false;
    this.settings.sidenavIsPinned = false;
    this.proposerRatioDetail = false;
    this.driverAgeDetail = false;
    this.proposerAgeP = '';
    this.insuredAgeP = '';
    this.maxStartdate = '';
    this.pannumberP = false;

    this.nomineeDetail = this.fb.group({

    });



  }

  // title change function
  changeGender() {
    if (this.proposer.controls['title'].value == 'MR') {
      this.proposer.controls['gender'].patchValue('Male');
    } else {
      this.proposer.controls['gender'].patchValue('Female');
    }
  }

  ngOnInit() {


  }

  // session Data
  sessionData() {
    if (sessionStorage.shriramProposer != '' && sessionStorage.shriramProposer != undefined) {
      this.shriramProposer = JSON.parse(sessionStorage.shriramProposer);
      if (this.shriramProposer.pincode != '') {
        this.getinsuredPostalCode(this.shriramProposer.pincode);
      }
      this.proposer = this.fb.group({
        title: this.shriramProposer.title,
        name: this.shriramProposer.name,
        gender: this.shriramProposer.gender,
        dob : this.shriramProposer.dob,
        email: this.shriramProposer.email,
        mobile: this.shriramProposer.mobile,
        pincode: this.shriramProposer.pincode,
        proposerRadio: this.shriramProposer.proposerRadio,
        radio: this.shriramProposer.radio,
        alterMobile : this.shriramProposer.alterMobile,
        personalFax: this.shriramProposer.personalFax,
        proposerPan: this.shriramProposer.proposerPan,
        proposerGst: this.shriramProposer.proposerGst,
        proposerAddress: this.shriramProposer.proposerAddress,
        proposerAddress2: this.shriramProposer.proposerAddress2,
        proposerAddress3: this.shriramProposer.proposerAddress3,
        proposerbkState: this.shriramProposer.proposerbkState,
        proposerbkCity: this.shriramProposer.proposerbkCity,


      })

    }
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
  spac(event: any){
    this.validation.spac(event);

  }
  idValidate(event: any) {
    this.validation.idValidate(event);
  }

  public proposerDetails(stepper: MatStepper, value) {
    console.log(value, 'eeeeeeeeeee');
    sessionStorage.shriramProposerDetail = '';
    sessionStorage.shriramProposerDetail = JSON.stringify(value);
    console.log(this.proposer.valid, 'checked');
    if (this.proposer.valid) {
      stepper.next();
    } else {
      this.toastr.error('error');
    }

  }
  // insured pin validate
  getinsuredPostalCode(pin) {
    const data = {
      'platform': 'web',
      'postalcode': pin
    };
    if (pin.length == 6) {
      this.personalservice.pinPaList(data).subscribe(
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
      this.pinProposerList = successData.ResponseObject;
    }
  }

  public pinProposerListFailure(error) {
  }

  vehiclePurposeList() {
    console.log(this.proposer.controls['vehiclePurpose'].value,'eeeeeeeeeeeeeeee')
    if (this.proposer.controls['vehiclePurpose'].value == 'Yes') {
      this.proposerRatioDetail = true;
     } else {
      this.proposerRatioDetail = false;
    }
  }
  driverAgeList() {
    console.log(this.proposer.controls['driverAge'].value,'eeeeeeeeeeeeeeee')
    if (this.proposer.controls['driverAge'].value == 'Yes') {
      this.driverAgeDetail = true;
    } else {
      this.driverAgeDetail = false;
    }
  }
  topScroll() {
    document.getElementById('main-content').scrollTop = 0;
  }

  shriramNomineeDetails(stepper: MatStepper, value) {
    if (this.nomineeDetail.valid) {
      sessionStorage.panomineeData = '';
      sessionStorage.panomineeData = JSON.stringify(value);
      this.createrPoposal(stepper);
    }

  }
  createrPoposal(stepper){

  }

  // insured City
  onChangecityListInsuredPa(){
    const data = {
      'platform': 'web',
      'state_code': this.proposer.controls['insuredPaStateIdP'].value,
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.personalservice.cityPaList(data).subscribe(
        (successData) => {
          this.insuredCityPaListSuccess(successData);
        },
        (error) => {
          this.insuredCityPaListFailure(error);
        }
    );
  }
  public insuredCityPaListSuccess(successData){
    this.bikeCityList = successData.ResponseObject;

  }
  public insuredCityPaListFailure(error){
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


  // date input
  addEvent(event, type) {
    if (event.value != null) {
      let selectedDate = '';
      this.bikeProposerAge = '';
      let dob = '';
      if (typeof event.value._i == 'string') {
        const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
        if (pattern.test(event.value._i) && event.value._i.length == 10) {
          this.proposerdateError = '';
        } else {
          this.proposerdateError = 'Enter Valid Date';
        }
        selectedDate = event.value._i;
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (selectedDate.length == 10) {
          this.bikeProposerAge = this.ageCalculate(dob);
          console.log(this.bikeProposerAge,'agre');
          sessionStorage.bkShriramProposerAge = this.bikeProposerAge;
          console.log(sessionStorage.bkShriramProposerAge,'sessionStorage.bkShriramProposerAge');
          this.proposer.controls['age'].patchValue(this.bikeProposerAge);
        }

      } else if (typeof event.value._i == 'object') {
        // dob = this.datepipe.transform(event.value, 'MMM d, y');
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (dob.length == 10) {
          this.bikeProposerAge = this.ageCalculate(dob);
          sessionStorage.insuredAgePA = this.bikeProposerAge;
          this.proposer.controls['age'].patchValue(this.bikeProposerAge);
        }
        this.proposerdateError = '';
      }
      //sessionStorage.insuredAgePA = this.bikeProposerAge;

    }
  }

  changeCity() {
    this.proposer.controls['proposerbkCityName'].patchValue(this.bikeCityList[this.proposer.controls['proposerbkCity'].value]);

  }
  changevehicle() {
    this.proposer.controls['vehicleTypeName'].patchValue(this.bkVehicleList[this.proposer.controls['vehicleType'].value]);

  }
}
