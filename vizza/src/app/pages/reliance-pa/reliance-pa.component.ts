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
  public today: any;
  public insureAgeP: any;
  public paMaritalList: any;
  public proposerdateError: any;
  public insuredateError: any;
  public nomineedateError: any;
  public occupationCode: any;
  public shwbtn: boolean;
  public shwbtnone: boolean;
  public idListDetailsProposal: any;
  public paPinInsuredList: any;
  public paNationalList: any;
  public paAreaList: any;
  public paPinNomineeList: any;
  public paCityNomineeList: any;
  public paNomineedistrictList: any;
  public tenureList: any;
  public coverOptList: any;
  public coverSubList: any;
  public annualList: any;
  public customertypeList: any;
  public RelationshipList: any;
  public proposerAgeP: any;
  public proposerdata: any;
  public insuredata: any;


  constructor(public fb: FormBuilder, public validation: ValidationService, public datepipe: DatePipe, public authservice: AuthService, public personalservice: PersonalAccidentService, private toastr: ToastrService, public appSettings: AppSettings) {
    let stepperindex = 0;
    this.currentStep = stepperindex;
    this.settings = this.appSettings.settings;
    this.settings.HomeSidenavUserBlock = false;
    this.settings.sidenavIsOpened = false;
    this.settings.sidenavIsPinned = false;
    const minDate = new Date();
    this.minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
    let today  = new Date();
    this.today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    this.insureAgeP = '';
    this.idListDetailsProposal = '';
    this.proposerAgeP = '';

    this.proposer = this.fb.group({
      proposerPaTitle: ['', Validators.required],
      proposerPaFirstname: ['', Validators.required],
      proposerPaMidname: '',
      proposerPaLastname: ['', Validators.required],
      proposerPaGender: ['', Validators.compose([Validators.required])],
      proposerPaDob: ['', Validators.compose([Validators.required])],
      proposercustomertype: ['', Validators.required],
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
      proposercorporatename: ['', Validators.required],
      proposerPaGst: ['', Validators.compose([Validators.minLength(15)])],
      proposerPaAddressone: ['', Validators.required],
      proposerPaAddresstwo: ['', Validators.required],
      proposerPaAddressthree: '',
      proposerPaPincode: ['', Validators.required],
      nearestlandmark: '',
      nationality: 'IN',
      proposerPaarea: ['', Validators.required],
      proposerPaState: ['', Validators.required],
      proposerPaCity: ['', Validators.required],
      proposerPaDistrict: '',
      proposerPaAddress1: ['', Validators.required],
      proposerPaAddress2: ['', Validators.required],
      proposerPaAddress3: '',
      proposerPaPincode1: ['', Validators.required],
      nearestlandmark1: '',
      proposerPaarea1: ['', Validators.required],
      proposerPaState1: ['', Validators.required],
      proposerPaCity1: ['', Validators.required],
      proposerPaDistrict1: '',
      proposerOccupationList: ['', Validators.required],
      proposerOccupationListName: '',
      proposerAnnual: '',
      proposerPaStateIdP: '',
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
      relationshipWithProposer: ['', Validators.required],
      otherinformation: '',
      insureOccupationList: ['', Validators.required],
      physicaldefectdetail: ['', Validators.required],
      insuredclaimdetails: ['', Validators.required],
      earningmember: '',
      physicaldefect: '',
      previousinsurer: '',
      personalaccident: '',
      insurancecover: '',
      annualincome: ['', Validators.required],
      SIforA: ['', Validators.required],
      SIforB: ['', Validators.required],
      SIforC: ['', Validators.required],
      SIforD: ['', Validators.required],
      TotalCapitalSI: '',
      Loading: '',
      CBRateA: '',
      CBAmountA: '',
      TSIwithCBA: '',
      CBRateB: '',
      CBAmountB: '',
      TSIwithCBB: '',
      CBRateC: '',
      CBAmountC: '',
      TSIwithCBC: '',
      CBRateD: '',
      CBAmountD: '',
      TSIwithCBD: '',
      TableA: '',
      TableB: '',
      TableC: '',
      TableD: '',
      CBtableA: '',
      CBtableB: '',
      CBtableC: '',
      CBtableD: '',
      type: ''
    });

    this.riskDetails = this.fb.group({
      CoverageOptionID: ['', Validators.required],
      coveragesubOptionID: ['', Validators.required],
      SumInsured: '',
      MembertoInsure: '',
      Tenure: ['', Validators.required],
      employername: ['', Validators.required],
      exemptionreason: ['', Validators.required],
      specialconditions: '',
      capitalsuminsured: ['', Validators.required],
      medicalexpense: '',
      extnrate: ['', Validators.required],
      familydiscount: ['', Validators.required],
      employeerelationship: '',
      servicetax: '',
    });

    this.nominee = this.fb.group({
      nomineePaTitle: ['', Validators.required],
      nomineePaFirstname: ['', Validators.required],
      nomineePaMidname: '',
      nomineePaLastname: ['', Validators.required],
      nomineePaGender: ['', Validators.compose([Validators.required])],
      nomineePaDob: '',
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
      nomineePaAddress2: ['', Validators.required],
      nomineePaAddress3: '',
      nationality: 'IN',
      nomineePaPincode: ['', Validators.required],
      nomineePaState: ['', Validators.required],
      nomineePaStateIdP: '',
      nomineePaDistrict: ['', Validators.required],
      nomineePaCity: ['', Validators.required],
      relationshipWithInsure: ['', Validators.required],
      ifothersPleaseSpecify: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.paMaritalStatusList();
    this.setOccupationListCode();
    this.onChangeNationalityList();
    this.paCustomertypeList();
    this.tenure();
    this.PaAnnualIncome();
    this.relationship();
    this.coverOptId();
    this.coverageSubID();
  }

  insurechangeGender(type) {
    if(type == 'proposer') {
      if (this.proposer.controls['proposerPaTitle'].value == 'MR') {
        this.proposer.controls['proposerPaGender'].patchValue('MALE')
      } else {
        this.proposer.controls['proposerPaGender'].patchValue('FEMALE')
      }
    }else if(type == 'insure'){
      if (this.proposer.controls['insurePaTitle'].value == 'MR') {
        this.insure.controls['insurePaGender'].patchValue('MALE')
      } else {
        this.insure.controls['insurePaGender'].patchValue('FEMALE')
      }
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
          } else if (type == 'nominee') {
            this.nomineedateError = '';
          }
        } else {
          if (type == 'proposer') {
            this.proposerdateError = 'Enter Valid Date';
          } else if (type == 'insure') {
            this.insuredateError = 'Enter Valid Date';
          } else if (type == 'nominee') {
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
          if (type == 'proposer') {
            sessionStorage.proposerAgep = this.proposerAgeP;
          } else if (type == 'insure') {
            sessionStorage.insureAgep = this.insureAgeP;
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
          } else if (type == 'nominee') {
            this.nomineedateError = '';
          }
          if (type == 'proposer') {
            sessionStorage.proposerAgep = this.proposerAgeP;
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

  //Relationship
  relationship() {
    const data = {
      'platform': 'web',
      'product_id': '11',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.personalservice.RelationshipList(data).subscribe(
        (successData) => {
          this.RelationshipSuccess(successData);
        },
        (error) => {
          this.RelationshipFailure(error);
        }
    );
  }

  RelationshipSuccess(successData) {
    this.RelationshipList = successData.ResponseObject;
    console.log(this.RelationshipList,'381');
  }

  RelationshipFailure(error) {

  }
  //customertype List
  paCustomertypeList() {
    const data = {
      'platform': 'web',
      'product_id': '11',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.personalservice.getCustomertypeList(data).subscribe(
        (successData) => {
          this.PacustomerSuccess(successData);
        },
        (error) => {
          this.PacustomerFailure(error);
        }
    );
  }

  PacustomerSuccess(successData) {
    this.customertypeList = successData.ResponseObject;
  }

  PacustomerFailure(error) {
  }

  //AnnualIncome
  PaAnnualIncome() {
    const data = {
      'platform': 'web',
      'product_id': '11',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.personalservice.PaAnnualIncome(data).subscribe(
        (successData) => {
          this.annualIncomeSuccess(successData);
        },
        (error) => {
          this.annualIncomeFailure(error);
        }
    );
  }

  annualIncomeSuccess(successData) {
    this.annualList = successData.ResponseObject;
  }

  annualIncomeFailure(error) {

  }

  // Marital Status
  paMaritalStatusList() {
    const data = {
      'platform': 'web',
      'product_id': '11',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.personalservice.PaRelianceMaritalStatus(data).subscribe(
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
      'product_id': '11',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.personalservice.getRelianceOccupationCodeList(data).subscribe(
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
  getPostalCode(pin, type) {
    const data = {
      'platform': 'web',
      'pincode': pin
    };
    if (pin.length == 6) {
      this.personalservice.pincodePaList(data).subscribe(
          (successData) => {
            this.pinPaInsuredListSuccess(successData, type);
          },
          (error) => {
            this.pinPaInsuredListFailure(error);
          }
      );
    }
  }

  public pinPaInsuredListSuccess(successData, type) {
    if (successData.IsSuccess) {
      if (type == 'proposer') {
        this.paPinInsuredList = successData.ResponseObject;
        this.proposer.controls['proposerPaState'].patchValue(this.paPinInsuredList.state_name);
        this.proposer.controls['proposerPaDistrict'].patchValue(this.paPinInsuredList.district_name);
        this.proposer.controls['proposerPaCity'].patchValue(this.paPinInsuredList.city_village_name);
        this.paAreaList = this.paPinInsuredList.area_details;

      } else if (type == 'proposer1') {
        this.paPinInsuredList = successData.ResponseObject;
        this.proposer.controls['proposerPaState1'].patchValue(this.paPinInsuredList.state_name);
        this.proposer.controls['proposerPaDistrict1'].patchValue(this.paPinInsuredList.district_name);
        this.proposer.controls['proposerPaCity1'].patchValue(this.paPinInsuredList.city_village_name);
        this.paAreaList = this.paPinInsuredList.area_details;
      } else if (type == 'nominee') {
        this.paPinNomineeList = successData.ResponseObject;
        this.nominee.controls['nomineePaState'].patchValue(this.paPinNomineeList.state_name);
        this.nominee.controls['nomineePaDistrict'].patchValue(this.paPinNomineeList.district_name);
        this.nominee.controls['nomineePaCity'].patchValue(this.paPinNomineeList.city_village_name);
        this.paAreaList = this.paPinInsuredList.area_details;
      }
    } else if (successData.IsSuccess != true) {
      if (type == 'proposer') {
        this.toastr.error('Fill Valid Pincode');
        this.proposer.controls['proposerPaState'].patchValue('');
        this.proposer.controls['proposerPaDistrict1'].patchValue('');
        this.proposer.controls['proposerPaCity'].patchValue('');
        this.proposer.controls['proposerPaArea'].patchValue('');
      } else if (type == 'proposer1') {
        this.toastr.error('Fill Valid Pincode');
        this.proposer.controls['proposerPaState1'].patchValue('');
        this.proposer.controls['proposerPaDistrict1'].patchValue('');
        this.proposer.controls['proposerPaCity1'].patchValue('');
        this.proposer.controls['proposerPaArea1'].patchValue('');
      } else if (type == 'nominee') {
        this.toastr.error('Fill Valid Pincode');
        this.nominee.controls['nomineePaState'].patchValue('');
        this.nominee.controls['nomineePaDistrict'].patchValue('');
        this.nominee.controls['nomineePaCity'].patchValue('');
        this.nominee.controls['nomineePaArea'].patchValue('');

      }
    }
  }

  public pinPaInsuredListFailure(error) {
  }

  //proposer Nationality
  onChangeNationalityList() {
    const data = {
      'platform': 'web',
      'product_id': '11',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.personalservice.getNationalityList(data).subscribe(
        (successData) => {
          this.nationalityListSuccess(successData);
        },
        (error) => {
          this.nationalityListFailure(error);
        }
    );
  }

  nationalityListSuccess(successData) {
    this.paNationalList = successData.ResponseObject;
  }

  nationalityListFailure(error) {

  }

  //Risk TenureList
  tenure() {
    const data = {
      'platform': 'web',
      'product_id': '',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.personalservice.tenureList(data).subscribe(
        (successData) => {
          this.tenureListSuccess(successData);
        },
        (error) => {
          this.tenureListfailure(error);
        }
    );
  }

  tenureListSuccess(successData) {
    this.tenureList = successData.ResponseObject;
  }

  tenureListfailure(error) {

  }

  //Risk CoveroptionsList
  coverOptId(){
    const data = {
      'platform': 'web',
      'product_id': '11',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.personalservice.covertypeList(data).subscribe(
        (successData) => {
          this.CoverListSuccess(successData);
        },
        (error) => {
          this.CoverListFailure(error);
        }
    );
  }
  CoverListSuccess(successData){
    this.coverOptList = successData.ResponseObject;

  }
  CoverListFailure(error){

  }

  //Riskdetails coverageSubOptionId
  coverageSubID() {
    const data = {
      'platform': 'web',
      'product_id': '11',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.personalservice.coverageList(data).subscribe(
        (successData) => {
          this.coverageSuccess(successData);
        },
        (error) => {
          this.coverageFailure(error);
        }
    );
  }

  coverageSuccess(successData) {
    this.coverSubList = successData.ResponseObject;
  }

  coverageFailure(error) {

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
      this.proposer.controls['proposerPaarea1'].patchValue(this.proposer.controls['proposerPaarea'].value);
      this.proposer.controls['nearestlandmark1'].patchValue(this.proposer.controls['nearestlandmark'].value);
    } else {
      this.proposer.controls['proposerPaAddress1'].patchValue('');
      this.proposer.controls['proposerPaAddress2'].patchValue('');
      this.proposer.controls['proposerPaAddress3'].patchValue('');
      this.proposer.controls['proposerPaPincode1'].patchValue('');
      this.proposer.controls['proposerPaState1'].patchValue('');
      this.proposer.controls['proposerPaDistrict1'].patchValue('');
      this.proposer.controls['proposerPaCity1'].patchValue('');
      this.proposer.controls['nearestlandmark1'].patchValue('');
      this.proposer.controls['proposerPaarea1'].patchValue('');
    }
  }

  show(){
    if(this.riskDetails.controls['CoverageOptionID'].value == '1902'){
      this.shwbtn = true;
      this.shwbtnone = false;
    }else{
      this.shwbtnone = true;
      this.shwbtn = false;
    }
  }

  // proposer next button
  nexttab(stepper: MatStepper, value, type) {
    if (type == 'proposer') {
      stepper.next();
      // this.proposerdata = value;
      // console.log(this.proposerdata, '714');
      // sessionStorage.stepper1Details = '';
      // sessionStorage.stepper1Details = JSON.stringify(value);
      // if (this.proposer.valid) {
      //   if (sessionStorage.proposerAgep >= 18) {
      //     stepper.next();
      //   } else {
      //     this.toastr.error('Proposer age should be 18 or above');
      //   }
      // }
    }else if(type == 'risk'){
      stepper.next();
    } else if (type == 'insure') {
      stepper.next();
      // this.insuredata = value;
      // console.log(this.insuredata, '747');
      // sessionStorage.stepper2Details = '';
      // sessionStorage.stepper2Details = JSON.stringify(value);
      // if (this.insure.valid) {
      //   if (sessionStorage.insureAgep >= 18) {
      //     stepper.next();
      //   } else {
      //     this.toastr.error('insure age should be 18 showfield()  or above');
      //   }
      // }
    }
  }
  topScroll() {
    document.getElementById('main-content').scrollTop = 0;
  }
}



