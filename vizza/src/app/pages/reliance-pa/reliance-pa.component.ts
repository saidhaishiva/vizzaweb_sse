import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators,FormControl,FormArray} from '@angular/forms';
import {ValidationService} from '../../shared/services/validation.service';
import {DatePipe} from '@angular/common';
import {AuthService} from '../../shared/services/auth.service';
import {PersonalAccidentService} from '../../shared/services/personal-accident.service';
import {ToastrService} from 'ngx-toastr';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE,MatStepper} from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {AppSettings} from '../../app.settings';
import {Settings} from '../../app.settings.model';
import {MY_FORMATS} from '../appollo-munich-pa/appollo-munich-pa.component';


@Component({
  selector: 'app-reliance-pa',
  templateUrl: './reliance-pa.component.html',
  styleUrls: ['./reliance-pa.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class ReliancePaComponent implements OnInit {
  public proposer: FormGroup;
  public insure: FormGroup;
  public nominee: FormGroup;
  public riskDetails: FormGroup;
  public currentStep: any;
  public settings: Settings;
  public minDate: any;
  public insureAgeP: any;
  public paMaritalList: any;
  public proposerdateError: any;
  public insuredateError: any;
  public nomineedateError: any;
  public occupationCode: any;
  public coverage: boolean;
  public idListDetailsProposal: any;
  public paPinInsuredList: any;
  public paCityInsuredList: any;
  public paInsureddistrictList: any;
  public paPinNomineeList: any;
  public paCityNomineeList: any;
  public paNomineedistrictList: any;
  public proposerAgeP: any;


  constructor(public fb: FormBuilder, public validation: ValidationService, public datepipe: DatePipe, public authservice: AuthService, public personalservice: PersonalAccidentService, private toastr: ToastrService, public appSettings: AppSettings) {
    let stepperindex = 0;
    this.currentStep = stepperindex;
    this.settings = this.appSettings.settings;
    this.settings.HomeSidenavUserBlock = false;
    this.settings.sidenavIsOpened = false;
    this.settings.sidenavIsPinned = false;
    const minDate = new Date();
    this.minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
    this.insureAgeP = '';
    this.idListDetailsProposal = '';
    this.proposerAgeP = '';

    this.proposer = this.fb.group({
      proposerPaTitle: ['', Validators.required],
      proposerPaFirstname: ['', Validators.required],
      proposerPaMidname:'',
      proposerPaLastname: ['', Validators.required],
      proposerPaGender: ['', Validators.compose([Validators.required])],
      proposerPaDob: ['', Validators.compose([Validators.required])],
      proposercustomertype:['',Validators.required],
      proposerPaEmail: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
      proposerPaMobile: ['', Validators.compose([Validators.pattern('[6789][0-9]{9}')])],
      maritalStatus: '',
      proposerPaAge: '',
      proposerPaIdProof: '',
      proposerPaPan: ['', Validators.compose([Validators.minLength(10)])],
      proposerPaDriving: '',
      proposerPaPassport: '',
      proposerPaVoter: '',
      proposerPaAadhar: '',
      proposerPaGst: ['', Validators.compose([Validators.minLength(15)])],
      proposerPaAddressone: ['', Validators.required],
      proposerPaAddresstwo: ['',Validators.required],
      proposerPaAddressthree: '',
      proposerPaPincode: ['', Validators.required],
      nearestlandmark: '',
      area: ['',Validators.required],
      proposerPaState: ['', Validators.required],
      proposerPaCity: ['', Validators.required],
      proposerPaDistrict: '',
      proposerPaAddress1: ['', Validators.required],
      proposerPaAddress2: ['', Validators.required],
      proposerPaAddress3: '',
      proposerPaPincode1: ['', Validators.required],
      nearestlandmark1: '',
      area1: ['',Validators.required],
      nationality: 'IN',
      proposerPaState1: ['', Validators.required],
      proposerPaCity1: ['', Validators.required],
      proposerPaDistrict1: '',
      proposerPaCountry: 'IN',
      proposerOccupationList: ['', Validators.required],
      proposerOccupationListName: '',
      proposerAnnual: '',
      type: '',
      sameAsProposer: false,
    });
    this.insure = this.fb.group({
      insurePaTitle: ['', Validators.required],
      insurePaFirstname: ['', Validators.required],
      insurePaMidname: '',
      insurePaLastname: ['', Validators.required],
      insurePaGender: ['', Validators.compose([Validators.required])],
      insurePaDob: ['', Validators.compose([Validators.required])],
      insurePaAge: '',
      insurePaEmail: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
      insurePaMobile: ['', Validators.compose([Validators.pattern('[6789][0-9]{9}')])],
      maritalStatus: ['', Validators.required],
      insureAnnual: ['', Validators.required],
      paRelationship: ['',Validators.required],
      otherinformation: '',
      insureOccupationList: ['',Validators.required],
      physicaldefectdetail: ['',Validators.required],
      insuredclaimdetails: ['',Validators.required],
      earningmember: '',
      physicaldefect: '',
      previousinsurer: '',
      personalaccident: '',
      insurancecover: '',
      type: ''
    });
    this.riskDetails = this.fb.group({
        CoverageOptionID: ['', Validators.required],
        coveragesubOptionID: ['', Validators.required],
        SumInsured: '',
        MembertoInsure: '',
        Tenure: '',
        employername: ['', Validators.required],
        exemptionreason: ['', Validators.required],
        specialconditions: '',
        capitalsuminsured: ['', Validators.required],
        medicalexpense: '',
        extnrate: ['',Validators.required],
        familydiscount: ['',Validators.required],
    });

    this.nominee = this.fb.group({
      nomineePaTitle: ['', Validators.required],
      nomineePaFirstname: ['', Validators.required],
      nomineePaMidname: '',
      nomineePaLastname: ['', Validators.required],
      nomineePaGender: ['', Validators.compose([Validators.required])],
      nomineePaDob: ['', Validators.compose([Validators.required])],
      nomineePaAge: '',
      nomineePaEmail: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
      nomineeAnnual: '',
      nomineePaMobile: ['', Validators.compose([Validators.pattern('[6789][0-9]{9}')])],
      maritalStatus: ['', Validators.required],
      nomineeOccupationList: ['', Validators.required],
      nomineePaIdProof: '',
      nomineePaPan: ['', Validators.compose([Validators.minLength(10)])],
      nomineePaDriving: '',
      nomineePaPassport: '',
      nomineePaVoter: '',
      nomineePaGst: ['', Validators.compose([Validators.minLength(15)])],
      nomineePaAddress1: ['', Validators.required],
      nomineePaAddress2: '',
      nomineePaAddress3: '',
      nationality: 'IN',
      nomineePaPincode: ['', Validators.required],
      nomineePaState: ['', Validators.required],
      nomineePaStateIdP: '',
      nomineePaDistrict: '',
      nomineePaCity: ['', Validators.required],
      relationshipWithProposer: ['',Validators.required],
      ifothersPleaseSpecify: ['',Validators.required],
    });
  }

  ngOnInit() {
    this.paMaritalStatusList();
    this.setOccupationListCode();
  }

  insurechangeGender() {
    if (this.proposer.controls['proposerPaTitle'].value == 'Mr') {
      this.proposer.controls['proposerPaGender'].patchValue('MALE')
    } else {
      this.proposer.controls['proposerPaGender'].patchValue('FEMALE')
    }
  }

  nameValidate(event: any) {
    this.validation.nameValidate(event);
  }

  // Dob validation
  dobValidate(event: any) {
    this.validation.dobValidate(event);
  }

  // Number validation
  numberValidate(event: any) {
    this.validation.numberValidate(event);
  }

  idValidate(event: any) {
    this.validation.idValidate(event);
  }

  // space
  space(event: any) {
    this.validation.space(event);
  }

  // date input
  addEvent(event, type) {
    if (event.value != null) {
      let selectedDate = '';
      let dob = '';
      if (typeof event.value._i == 'string') {
        const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
        if (pattern.test(event.value._i) && event.value._i.length == 10) {
          if (type == 'proposer') {
            this.proposerdateError = '';
          } else if (type == 'insure') {
            this.insuredateError = '';
          }else if(type == 'nominee'){
              this.nomineedateError = '';
          }
        } else {
          if (type == 'proposer') {
            this.proposerdateError = 'Enter Valid Date';
          } else if (type == 'insure') {
            this.insuredateError = 'Enter Valid Date';
          }else if(type == 'nominee'){
              this.nomineedateError = 'Enter Valid Date';
          }
        }
        selectedDate = event.value._i;
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (selectedDate.length == 10) {
          if (type == 'proposer') {
            this.proposerdateError = '';
            this.proposer.controls['proposerPaDob'].patchValue(dob);
            this.proposerAgeP = this.ageCalculate(dob);
            this.proposer.controls['proposerPaAge'].patchValue(this.proposerAgeP);
          } else if (type == 'insure') {
            this.insuredateError = '';
            this.insure.controls['insurePaDob'].patchValue(dob);
            this.insureAgeP = this.ageCalculate(dob);
            this.insure.controls['insurePaAge'].patchValue(this.insureAgeP);
          }
        }
      } else if (typeof event.value._i == 'object') {
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (dob.length == 10) {
          if (type == 'proposer') {
            this.proposerdateError = '';
            this.proposer.controls['proposerPaDob'].patchValue(dob);
            this.proposerAgeP = this.ageCalculate(dob);
            this.proposer.controls['proposerPaAge'].patchValue(this.proposerAgeP);
          } else if (type == 'insure') {
            this.insuredateError = '';
            this.insure.controls['insurePaDob'].patchValue(dob);
            this.insureAgeP = this.ageCalculate(dob);
            this.insure.controls['insurePaAge'].patchValue(this.insureAgeP);
          }else if (type == 'nominee'){
            this.nomineedateError = '';
          }
          if (type == 'proposer') {
            sessionStorage.proposerAgeP = this.proposerAgeP;
          } else if (type == 'insure') {
            sessionStorage.insureAgep = this.insureAgeP;
          }
        }
      }
    }
  }


  ageCalculate(dob) {
    // let mdate = dob.toString();
    // let yearThen = parseInt(mdate.substring(8, 10), 10);
    // let monthThen = parseInt(mdate.substring(5, 7), 10);
    // let dayThen = parseInt(mdate.substring(0, 4), 10);
    // let todays = new Date();
    // let birthday = new Date(dayThen, monthThen - 1, yearThen);
    // let differenceInMilisecond = todays.valueOf() - birthday.valueOf();
    // let year_age = Math.floor(differenceInMilisecond / 31536000000);
    // return year_age;
    let today = new Date();
    let birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    let dd = today.getDate() - birthDate.getDate();
    if (m < 0 || m == 0 && today.getDate() < birthDate.getDate()) {
      age = age - 1;
    }
    return age;
  }

  // Marital Status
  paMaritalStatusList() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.personalservice.paMaritalStatus(data).subscribe(
        (successData) => {
          this.paMaritalListSuccess(successData);
        },
        (error) => {
          this.paMaritalListFailure(error);
        }
    );
  }

  public paMaritalListSuccess(successData) {
    this.paMaritalList = successData.ResponseObject;
  }

  public paMaritalListFailure(error) {

  }

  // Occupation List

  setOccupationListCode() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.personalservice.getAppolloOccupationCodeList(data).subscribe(
        (successData) => {
          this.occupationCodeSuccess(successData);
        },
        (error) => {
          this.occupationCodeFailure(error);
        }
    );

  }


  public occupationCodeSuccess(successData) {
    this.occupationCode = successData.ResponseObject;

  }

  public occupationCodeFailure(error) {
  }


  // insured pin validate
  getPostalCode(pin) {
    const data = {
      'platform': 'web',
      'postalcode': pin
    };
    if (pin.length == 6) {
      this.personalservice.pinPaList(data).subscribe(
          (successData) => {
            this.pinPaInsuredListSuccess(successData);
          },
          (error) => {
            this.pinPaInsuredListFailure(error);
          }
      );
    }
  }

  public pinPaInsuredListSuccess(successData) {
    if (successData.IsSuccess) {
      this.paPinInsuredList = successData.ResponseObject;
      this.proposer.controls['proposerPaState'].patchValue(this.paPinInsuredList.state);
      this.proposer.controls['proposerPaStateIdP'].patchValue(this.paPinInsuredList.state_code);
      this.onChangecityListInsuredPa();
      this.onChangeStateInsured();
    } else if (successData.IsSuccess != true) {
      this.toastr.error('Fill Valid Pincode');
      this.proposer.controls['proposerPaState'].patchValue('');
      this.proposer.controls['proposerPaDistrict'].patchValue('');
      this.proposer.controls['proposerPaCity'].patchValue('');
    }
  }

  public pinPaInsuredListFailure(error) {
  }

  // insured City
  onChangecityListInsuredPa() {
    const data = {
      'platform': 'web',
      'state_code': this.proposer.controls['proposerPaStateIdP'].value,
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

  public insuredCityPaListSuccess(successData) {
    this.paCityInsuredList = successData.ResponseObject;

  }

  public insuredCityPaListFailure(error) {
  }

  // insured district list
  onChangeStateInsured() {
    const data = {
      'platform': 'web',
      'state_code': this.proposer.controls['proposerPaStateIdP'].value,
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.personalservice.districtPaList(data).subscribe(
        (successData) => {
          this.insureddistrictPaListSuccess(successData);
        },
        (error) => {
          this.insureddistrictPaListFailure(error);
        }
    );
  }

  public insureddistrictPaListSuccess(successData) {
    this.paInsureddistrictList = successData.ResponseObject;
  }

  public insureddistrictPaListFailure(error) {
  }
// proposer next button
  nexttab(stepper: MatStepper) {
      stepper.next();
    }

  changecover(){
    this.coverage = true;
  }


  // nominee pin validate
  getnomineePostalCode(pin) {
    const data = {
      'platform': 'web',
      'postalcode': pin
    };
    if (pin.length == 6) {
      this.personalservice.pinPaList(data).subscribe(
          (successData) => {
            this.pinPaNomineeListSuccess(successData);
          },
          (error) => {
            this.pinPaNomineeListFailure(error);
          }
      );
    }
  }

  public pinPaNomineeListSuccess(successData) {
    if (successData.IsSuccess) {
      this.paPinNomineeList = successData.ResponseObject;
      this.nominee.controls['nomineePaState'].patchValue(this.paPinNomineeList.state);
      this.nominee.controls['nomineePaStateIdP'].patchValue(this.paPinNomineeList.state_code);
      this.onChangecityListnomineePa();
      this.onChangeStateNominee();
    } else if (successData.IsSuccess != true) {
      this.toastr.error('Fill Valid Pincode');
      this.nominee.controls['nomineePaState'].patchValue('');
      this.nominee.controls['nomineePaDistrict'].patchValue('');
      this.nominee.controls['nomineePaCity'].patchValue('');
    }
  }

  public pinPaNomineeListFailure(error) {
  }

  // nominee City
  onChangecityListnomineePa() {
    const data = {
      'platform': 'web',
      'state_code': this.nominee.controls['nomineePaStateIdP'].value,
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.personalservice.cityPaList(data).subscribe(
        (successData) => {
          this.nomineeCityPaListSuccess(successData);
        },
        (error) => {
          this.nomineeCityPaListFailure(error);
        }
    );
  }

  public nomineeCityPaListSuccess(successData) {
    this.paCityNomineeList = successData.ResponseObject;

  }

  public nomineeCityPaListFailure(error) {
  }

  // nominee district list

  onChangeStateNominee() {
    const data = {
      'platform': 'web',
      'state_code': this.nominee.controls['nomineePaStateIdP'].value,
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.personalservice.districtPaList(data).subscribe(
        (successData) => {
          this.nomineedistrictPaListSuccess(successData);
        },
        (error) => {
          this.nomineedistrictPaListFailure(error);
        }
    );
  }

  public nomineedistrictPaListSuccess(successData) {
    this.paNomineedistrictList = successData.ResponseObject;
  }

  public nomineedistrictPaListFailure(error) {
  }

  sameAsCurrentAddress(value) {
    if (value) {
      this.proposer.controls['proposerPaAddress1'].patchValue(this.proposer.controls['proposerPaAddressone'].value);
      this.proposer.controls['proposerPaAddress2'].patchValue(this.proposer.controls['proposerPaAddresstwo'].value);
      this.proposer.controls['proposerPaAddress3'].patchValue(this.proposer.controls['proposerPaAddressthree'].value);
      this.proposer.controls['proposerPaPincode1'].patchValue(this.proposer.controls['proposerPaPincode'].value);
      this.proposer.controls['proposerPaState1'].patchValue(this.proposer.controls['proposerPaState'].value);
      this.proposer.controls['proposerPaDistrict1'].patchValue(this.proposer.controls['proposerPaDistrict'].value);
      this.proposer.controls['proposerPaCity1'].patchValue(this.proposer.controls['proposerPaCity'].value);
    } else {
      this.proposer.controls['proposerPaAddress1'].patchValue('');
      this.proposer.controls['proposerPaAddress2'].patchValue('');
      this.proposer.controls['proposerPaAddress3'].patchValue('');
      this.proposer.controls['proposerPaPincode1'].patchValue('');
      this.proposer.controls['proposerPaState1'].patchValue('');
      this.proposer.controls['proposerPaDistrict1'].patchValue('');
      this.proposer.controls['proposerPaCity1'].patchValue('');
    }
  }
}


