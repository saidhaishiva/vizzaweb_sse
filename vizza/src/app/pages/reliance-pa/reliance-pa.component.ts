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
import {validate} from 'codelyzer/walkerFactory/walkerFn';
import { ConfigurationService} from '../../shared/services/configuration.service';
// import {jsonpCallbackContext} from '@angular/common/http/src/module';
import { ActivatedRoute} from '@angular/router';


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
  public insureAgeP: any;
  public minDate: any;
  public maxdate: any;
  public paMaritalList: any;
  public proposerdateError: any;
  public insuredateError: any;
  public nomineedateError: any;
  public proposeroccupation: any;
  public insureroccupation: any;
  public proposerpaPinList: any;
  public paPincodeList: any;
  public paNationalList: any;
  public proposerpaAreaList: any;
  public paAreaList: any;
  public nomineepaAreaList: any;
  public paPinNomineeList: any;
  public paCityNomineeList: any;
  public paNomineedistrictList: any;
  public tenureList: any;
  // public coverOptList: any;
  public coverSubList: any;
  public Exemptionlist: any;
  public annualList: any;
  public customertypeList: any;
  public RelationshipList: any;
  public proposerAgeP: any;
  public proposerdata: any;
  public insuredata: any;
  public companylist: any;
  public riskdata: any;
  public nomineedata: any;
  public summaryData: any;
  public valueA: any;
  public valueB: any;
  public valueC: any;
  public valueD: any;
  public policystart: any;
  public policyend: any;
  public RediretUrlLink: any;
  public reliancePAproposalID: any;
  public getBuyDetails: any;
  public webhost: any;
  public other: any;
  public getStepper1: any;
  public getStepper2: any;
  public getStepper3: any;
  public getStepper4: any;
  public declaration: any;
  public inputReadonly: any;
  public sessionAge: any;
  public getAllPremiumDetails: any;

  constructor(public fb: FormBuilder,public route: ActivatedRoute, public validation: ValidationService, public config: ConfigurationService, public  datepipe: DatePipe, public authservice: AuthService, public personalservice: PersonalAccidentService, private toastr: ToastrService, public appSettings: AppSettings) {
    let stepperindex = 0;
    this.currentStep = stepperindex;
    this.settings = this.appSettings.settings;
    this.settings.HomeSidenavUserBlock = false;
    this.settings.sidenavIsOpened = false;
    this.settings.sidenavIsPinned = false;
    const miniDate = new Date();
    this.minDate= new Date(miniDate.getFullYear(), miniDate.getMonth(), miniDate.getDate());
    this.maxdate = this.minDate;
    this.route.params.forEach((params) => {
      if(params.stepper == true || params.stepper == 'true') {
        stepperindex = 4;
        if (sessionStorage.summaryData != '' && sessionStorage.summaryData != undefined) {
          this.summaryData = JSON.parse(sessionStorage.summarydata);
          this.RediretUrlLink = this.summaryData.RediretUrlLink;
          this.reliancePAproposalID = this.summaryData.ProposalId;
          this.proposerdata = JSON.parse(sessionStorage.Paproposer);
          this.riskdata = JSON.parse(sessionStorage.Parisk);
          this.insuredata = JSON.parse(sessionStorage.Painsured);
          this.nomineedata = JSON.parse(sessionStorage.Panominee);
          sessionStorage.reliancePAproposalID = this.reliancePAproposalID;
        }
      }
    });
    this.getBuyDetails = JSON.parse(sessionStorage.buyProductsPa);
    console.log(this.getBuyDetails, 'sum insurd amount');
    this.webhost = this.config.getimgUrl();
    let today = new Date();
    this.policystart = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    let minDate = new Date();
    this.policyend = new Date(minDate.getFullYear() + 1 , minDate.getMonth(), minDate.getDate());
    this.proposerAgeP = '';
    this.inputReadonly = false;

    this.proposer = this.fb.group({
      proposerPaTitle: ['', Validators.required],
      proposerPaFirstname: ['', Validators.required],
      proposerPaMidname: '',
      proposerPaLastname: ['', Validators.required],
      proposerPaGender: ['', Validators.compose([Validators.required])],
      proposerPaGenderId: '',
      proposerPaDob: ['', Validators.compose([Validators.required])],
      proposerPaAge: '',
      proposercustomertype: ['', Validators.required],
      proposerPaEmail: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
      proposerPaMobile: ['', Validators.compose([Validators.pattern('[6789][0-9]{9}')])],
      maritalStatus: ['', Validators.required],
      maritalStatusname: '',
      proposerPaPan: ['', Validators.compose([Validators.minLength(10)])],
      proposerPaPassport: '',
      proposerPaAadhar: '',
      proposerPaGst: '',
      proposerPaAddressone: ['', Validators.required],
      proposerPaAddresstwo: ['', Validators.required],
      proposerPaAddressthree: '',
      proposerPaPincode: ['', Validators.required],
      nearestLandmark: '',
      proposerPaCountry: ['', Validators.required],
      nationality: '',
      proposerPaArea: ['', Validators.required],
      proposerPaState: ['', Validators.required],
      proposerPaStatecode: '',
      proposerPaCity: ['', Validators.required],
      proposerPaCitycode: '',
      proposerPaDistrict: ['',Validators.required],
      proposerPaDistrictcode: '',
      PaAddress1: ['', Validators.required],
      PaAddress2: ['', Validators.required],
      PaAddress3: '',
      PaPincode1: ['', Validators.required],
      nearestLandmark1: '',
      PaCountry: ['', Validators.required],
      PaArea1: ['', Validators.required],
      PaState1: ['', Validators.required],
      PaState1code: '',
      PaCity1: ['', Validators.required],
      PaCity1code: '',
      PaDistrict1: '',
      PaDistrict1code: '',
      proposerOccupationList: ['', Validators.required],
      sameAsProposer: false,
      InsuredName: '',
      PolicyNo: '',
      PreInsstartDob: '',
      PreInsendDob: '',
      insurancecompny: '',
      Address: '',
    });
    this.insure = this.fb.group({
      sameAsDetail: false,
      insurePaTitle: ['', Validators.required],
      insurePaFirstname: ['', Validators.required],
      insurePaMidname: '',
      insurePaLastname: ['', Validators.required],
      insurePaGender: ['', Validators.compose([Validators.required])],
      insurePaGenderId: '',
      insurePaDob: ['', Validators.compose([Validators.required])],
      insurePaAge: '',
      relationshipWithProposer: ['', Validators.required],
      otherinformation: '',
      insureOccupationList: ['', Validators.required],
      insureOccupationListname: '',
      physicaldefectdetail: '',
      insuredclaimdetails: '',
      earningmember: false,
      physicaldefect: '',
      previousinsurer: '',
      personalaccident: '',
      insurancecover: '',
      annualincome1: '',
      annualincome1value: '',
      TotalCapital: '',
      annualincome: '',
      tableA: '',
      tableB: '',
      tableC: '',
      tableD: '',
      SIforA: '',
      SIforB: '',
      SIforC: '',
      SIforD: '',
      TotalCapitalSI: '',
    });

    this.riskDetails = this.fb.group({
      coveragesubOptionID: '',
      MembertoInsure: '',
      Tenure: ['', Validators.required],
      employername: ['', Validators.required],
      exemptionreason: '',
      specialconditions: '',
      capitalsuminsured: ['', Validators.required],
      medicalexpense: '',
      extnrate: '',
      familydiscount: '',
      employeerelationship: '',
      servicetax: '',
    });

    this.nominee = this.fb.group({
      nomineePaTitle: ['', Validators.required],
      nomineePaFirstname: ['', Validators.required],
      nomineePaMidname: '',
      nomineePaLastname: ['', Validators.required],
      nomineePaDob: ['', Validators.required],
      nomineePaAddress1: ['', Validators.required],
      nomineePaAddress2: ['', Validators.required],
      nomineePaAddress3: '',
      nomineePaPincode: ['', Validators.required],
      nomineePaState: ['', Validators.required],
      nomineePaStatecode: '',
      nomineePaDistrict: ['', Validators.required],
      nomineePaDistrictcode: '',
      nomineePaCity: ['', Validators.required],
      nomineePaCitycode: '',
      nomineePaArea: ['', Validators.required],
      nomineePaCountry: ['', Validators.required],
      nomineenearestLandmark: '',
      relationshipWithInsure: ['', Validators.required],
      relationshipname: '',
      ifothersPleaseSpecify: '',
    });
  }

  ngOnInit() {
    this.paMaritalStatusList();
    this.ProposerOccupationListCode();
    this.InsurerOccupationListCode();
    this.onChangeNationalityList();
    this.paCustomertypeList();
    this.tenure();
    this.PaAnnualIncome();
    // this.coverOptId();
    this.coverageSubID();
    this.exemption();
    this.insurecompny();
    this.relationship();
    this.sessionData();
    this.getAllPremiumDetails = JSON.parse(sessionStorage.enquiryDetailsPa);
    this.riskDetails.controls['capitalsuminsured'].patchValue(this.getBuyDetails.suminsured_amount)
    this.insure.controls['TotalCapital'].patchValue(this.getBuyDetails.suminsured_amount);
    this.proposer.controls['proposerPaCountry'].patchValue('India');
    this.proposer.controls['PaCountry'].patchValue('India');
    this.nominee.controls['nomineePaCountry'].patchValue('India');
  }

  insurechangeGender(type) {
    if (type == 'proposer') {
      if (this.proposer.controls['proposerPaTitle'].value == 'Mr.' || this.proposer.controls['proposerPaTitle'].value == 'Dr.') {
        this.proposer.controls['proposerPaGender'].patchValue('MALE');
        this.proposer.controls['proposerPaGenderId'].patchValue('0');
      } else {
        this.proposer.controls['proposerPaGender'].patchValue('FEMALE');
        this.proposer.controls['proposerPaGenderId'].patchValue('1');
      }
    } else if (type == 'insure') {
      if (this.insure.controls['insurePaTitle'].value == 'Mr.' || this.insure.controls['insurePaTitle'].value == 'Dr.') {
        this.insure.controls['insurePaGender'].patchValue('MALE');
        this.insure.controls['insurePaGenderId'].patchValue('0');
      } else {
        this.insure.controls['insurePaGender'].patchValue('FEMALE');
        this.insure.controls['insurePaGenderId'].patchValue('0');

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
            // this.proposer.controls['proposerPaDob'].patchValue(dob);
            this.proposerAgeP = this.ageCalculate(dob);
            console.log(this.proposerAgeP,'proposerage');
            sessionStorage.proposerAgeP = JSON.stringify(this.proposerAgeP);
            this.proposer.controls['proposerPaAge'].patchValue(this.proposerAgeP);
          } else if (type == 'insure') {
            this.insuredateError = '';
            this.insureAgeP = this.ageCalculate(dob);
            this.insure.controls['insurePaAge'].patchValue(this.insureAgeP);
          } else if (type == 'nominee') {
            this.nomineedateError = '';
          }
          if (type == 'proposer') {
            sessionStorage.proposerAgeP = JSON.stringify(this.proposerAgeP);
          }
        }
      } else if (typeof event.value._i == 'object') {
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (dob.length == 10) {
          if (type == 'proposer') {
            this.proposerdateError = '';
            this.proposerAgeP = this.ageCalculate(dob);
            sessionStorage.proposerAgeP = JSON.stringify(this.proposerAgeP);
          } else if (type == 'insure') {
            this.insuredateError = '';
            this.insureAgeP = this.ageCalculate(dob);
            this.insure.controls['insurePaAge'].patchValue(this.insureAgeP);
          } else if (type == 'nominee') {
            this.nomineedateError = '';
          }
          if (type == 'proposer') {
            sessionStorage.proposerAgeP = JSON.stringify(this.proposerAgeP);
          }
        }
      }
    }
  }

  ageCalculate(dob) {
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
    };
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
    };
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
    };
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

  annual(){
    this.insure.controls['annualincome1value'].patchValue(this.annualList[this.insure.controls['annualincome1'].value]);
    console.log(this.insure.controls['annualincome1value'].value,'annual');
  }

  // Marital Status
  paMaritalStatusList() {
    const data = {
      'platform': 'web',
      'product_id': '11',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    };
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

  maritalstatusname() {
    this.proposer.controls['maritalStatusname'].patchValue(this.paMaritalList[this.proposer.controls['maritalStatus'].value]);
  }


  // Proposer Occupation List
  ProposerOccupationListCode() {
    const data = {
      'platform': 'web',
      'product_id': '11',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    };
    this.personalservice.OccupationList(data).subscribe(
        (successData) => {
          this.occupationCodeSuccess(successData);
        },
        (error) => {
          this.occupationCodeFailure(error);
        }
    );
  }


  public occupationCodeSuccess(successData) {
    this.proposeroccupation = successData.ResponseObject;

  }

  public occupationCodeFailure(error) {
  }

  // Insurer OccupationList
  InsurerOccupationListCode() {
    const data = {
      'platform': 'web',
      'product_id': '11',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    };
    this.personalservice.InsurerOccupationList(data).subscribe(
        (successData) => {
          this.InsureroccupationCodeSuccess(successData);
        },
        (error) => {
          this.InsureroccupationCodeFailure(error);
        }
    );
  }

  public InsureroccupationCodeSuccess(successData) {
    this.insureroccupation = successData.ResponseObject;

  }

  insureOccupationList(){
    this.insure.controls['insureOccupationListname'].patchValue(this.insureroccupation[this.insure.controls['insureOccupationList'].value]);
  }


  public InsureroccupationCodeFailure(error) {
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
        this.proposerpaPinList = successData.ResponseObject;
        this.proposer.controls['proposerPaState'].patchValue(this.proposerpaPinList.state_name);
        this.proposer.controls['proposerPaStatecode'].patchValue(this.proposerpaPinList.state_id);
        this.proposer.controls['proposerPaDistrict'].patchValue(this.proposerpaPinList.district_name);
        this.proposer.controls['proposerPaDistrictcode'].patchValue(this.proposerpaPinList.district_id);
        this.proposer.controls['proposerPaCity'].patchValue(this.proposerpaPinList.city_village_name);
        this.proposer.controls['proposerPaCitycode'].patchValue(this.proposerpaPinList.city_village_id);
        this.proposerpaAreaList = this.proposerpaPinList.area_details;
        sessionStorage.proposeraArealist = JSON.stringify(this.proposerpaAreaList);
      } else if (type == 'proposer1') {
        this.paPincodeList = successData.ResponseObject;
        this.proposer.controls['PaState1'].patchValue(this.paPincodeList.state_name);
        this.proposer.controls['PaState1code'].patchValue(this.paPincodeList.state_id);
        this.proposer.controls['PaDistrict1'].patchValue(this.paPincodeList.district_name);
        this.proposer.controls['PaDistrict1code'].patchValue(this.paPincodeList.district_id);
        this.proposer.controls['PaCity1'].patchValue(this.paPincodeList.city_village_name);
        this.proposer.controls['PaCity1code'].patchValue(this.paPincodeList.city_village_id);
        console.log( this.proposer.controls['PaCity1code'],'cityid');
        this.paAreaList = this.paPincodeList.area_details;
        sessionStorage.paAreaList = JSON.stringify(this.paAreaList);
      } else if (type == 'nominee') {
        this.paPinNomineeList = successData.ResponseObject;
        this.nominee.controls['nomineePaState'].patchValue(this.paPinNomineeList.state_name);
        this.nominee.controls['nomineePaStatecode'].patchValue(this.paPinNomineeList.state_id);
        this.nominee.controls['nomineePaDistrict'].patchValue(this.paPinNomineeList.district_name);
        this.nominee.controls['nomineePaDistrictcode'].patchValue(this.paPinNomineeList.district_id);
        this.nominee.controls['nomineePaCity'].patchValue(this.paPinNomineeList.city_village_name);
        this.nominee.controls['nomineePaCitycode'].patchValue(this.paPinNomineeList.city_village_id);
        this.nomineepaAreaList = this.paPinNomineeList.area_details;
        sessionStorage.nomineepaAreaList = JSON.stringify(this.nomineepaAreaList);
      }
    } else if (successData.IsSuccess != true) {
      if (type == 'proposer') {
        this.toastr.error('Fill Valid Pincode');
        this.proposer.controls['proposerPaState'].patchValue('');
        this.proposer.controls['proposerPaStatecode'].patchValue('');
        this.proposer.controls['proposerPaDistrict'].patchValue('');
        this.proposer.controls['proposerPaDistrictcode'].patchValue('');
        this.proposer.controls['proposerPaCity'].patchValue('');
        this.proposer.controls['proposerPaCitycode'].patchValue('');
        this.proposer.controls['proposerPaArea'].patchValue('');
      } else if (type == 'proposer1') {
        this.toastr.error('Fill Valid Pincode');
        this.proposer.controls['PaState1'].patchValue('');
        this.proposer.controls['PaState1code'].patchValue('');
        this.proposer.controls['PaDistrict1'].patchValue('');
        this.proposer.controls['PaDistrict1code'].patchValue('');
        this.proposer.controls['PaCity1'].patchValue('');
        this.proposer.controls['PaCity1code'].patchValue('');
        this.proposer.controls['PaArea1'].patchValue('');
      } else if (type == 'nominee') {
        this.toastr.error('Fill Valid Pincode');
        this.nominee.controls['nomineePaState'].patchValue('');
        this.nominee.controls['nomineePaStatecode'].patchValue('');
        this.nominee.controls['nomineePaDistrict'].patchValue('');
        this.nominee.controls['nomineePaDistrictcode'].patchValue('');
        this.nominee.controls['nomineePaCity'].patchValue('');
        this.nominee.controls['nomineePaCitycode'].patchValue('');
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
    };
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

  //previousInsure insurecmpny
  insurecompny() {
    const data = {
      'platform': 'web',
      'product_id': '11',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    };
    this.personalservice.companyList(data).subscribe(
        (successData) => {
          this.companySuccess(successData);
        },
        (error) => {
          this.companyFailure(error);
        }
    );
  }

  public companySuccess(SuccessData) {
    this.companylist = SuccessData.ResponseObject;
  }

  public companyFailure(error) {
  }

  //Risk TenureList
  tenure() {
    const data = {
      'platform': 'web',
      'product_id': '',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    };
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

  // //Risk CoveroptionsList
  // coverOptId() {
  //   const data = {
  //     'platform': 'web',
  //     'product_id': '11',
  //     'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
  //     'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
  //   };
  //   this.personalservice.covertypeList(data).subscribe(
  //       (successData) => {
  //         this.CoverListSuccess(successData);
  //       },
  //       (error) => {
  //         this.CoverListFailure(error);
  //       }
  //   );
  // }
  //
  // CoverListSuccess(successData) {
  //   this.coverOptList = successData.ResponseObject;
  //
  // }
  //
  // CoverListFailure(error) {
  //
  // }

  //Riskdetails coverageSubOptionId
  coverageSubID() {
    const data = {
      'platform': 'web',
      'product_id': '11',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    };
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

   showcheck(event) {
     if (event.checked) {
       this.riskDetails.controls['exemptionreason'].setValidators([Validators.required]);
       this.riskDetails.controls['exemptionreason'].updateValueAndValidity()
    } else {
      this.riskDetails.controls['exemptionreason'].patchValue('');
      this.riskDetails.controls['exemptionreason'].setValidators(null);
      this.riskDetails.controls['exemptionreason'].updateValueAndValidity()
    }
  }

  medical(event) {
    if(event.checked) {
      this.riskDetails.controls['extnrate'].setValidators([Validators.required]);
      this.riskDetails.controls['extnrate'].updateValueAndValidity()
    }else {
      this.riskDetails.controls['extnrate'].patchValue('');
      this.riskDetails.controls['extnrate'].setValidators(null);
      this.riskDetails.controls['extnrate'].updateValueAndValidity()

    }

  }

  // nominee City
  onChangecityListnomineePa() {
    const data = {
      'platform': 'web',
      'state_code': this.nominee.controls['nomineePaStateIdP'].value,
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    };
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
    };
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

  // Riskdetails excemption

  public exemption() {
    const data = {
      'platform': 'web',
      'product_id': '11',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    };
    this.personalservice.exemptionList(data).subscribe(
        (successData) => {
          this.exemptionListSuccess(successData);
        },
        (error) => {
          this.exemptionListFailure(error);
        }
    );
  }

  public exemptionListSuccess(successData) {
    this.Exemptionlist = successData.ResponseObject;
  }

  public exemptionListFailure(error) {

  }


  sameAsCurrentAddress(value: any) {
    if (value.checked) {
      this.paAreaList = JSON.parse(sessionStorage.proposeraArealist);
      this.proposer.controls['PaAddress1'].patchValue(this.proposer.controls['proposerPaAddressone'].value);
      this.proposer.controls['PaAddress2'].patchValue(this.proposer.controls['proposerPaAddresstwo'].value);
      this.proposer.controls['PaAddress3'].patchValue(this.proposer.controls['proposerPaAddressthree'].value);
      this.proposer.controls['PaPincode1'].patchValue(this.proposer.controls['proposerPaPincode'].value);
      this.proposer.controls['PaState1'].patchValue(this.proposer.controls['proposerPaState'].value);
      this.proposer.controls['PaState1code'].patchValue(this.proposer.controls['proposerPaStatecode'].value);
      this.proposer.controls['PaDistrict1'].patchValue(this.proposer.controls['proposerPaDistrict'].value);
      this.proposer.controls['PaDistrict1code'].patchValue(this.proposer.controls['proposerPaDistrictcode'].value);
      this.proposer.controls['PaCity1'].patchValue(this.proposer.controls['proposerPaCity'].value);
      this.proposer.controls['PaArea1'].patchValue(this.proposer.controls['proposerPaArea'].value);
      this.proposer.controls['PaCity1code'].patchValue(this.proposer.controls['proposerPaCitycode'].value);
      this.proposer.controls['nearestLandmark1'].patchValue(this.proposer.controls['nearestLandmark'].value);
    } else {
      this.proposer.controls['PaAddress1'].patchValue('');
      this.proposer.controls['PaAddress2'].patchValue('');
      this.proposer.controls['PaAddress3'].patchValue('');
      this.proposer.controls['PaPincode1'].patchValue('');
      this.proposer.controls['PaState1'].patchValue('');
      this.proposer.controls['PaState1code'].patchValue('');
      this.proposer.controls['PaDistrict1'].patchValue('');
      this.proposer.controls['PaDistrict1code'].patchValue('');
      this.proposer.controls['PaCity1'].patchValue('');
      this.proposer.controls['PaCity1code'].patchValue('');
      this.proposer.controls['PaArea1'].patchValue('');
      this.proposer.controls['nearestLandmark1'].patchValue('');
    }
  }

  phychckbox(event) {
    if (event.checked) {
      this.insure.controls['physicaldefectdetail'].setValidators([Validators.required]);
      this.insure.controls['physicaldefectdetail'].updateValueAndValidity();
    }else{
      this.insure.controls['physicaldefectdetail'].patchValue('');
      this.insure.controls['physicaldefectdetail'].setValidators(null);
      this.insure.controls['physicaldefectdetail'].updateValueAndValidity();
    }
  }
  insclaim(event) {
    if(event.checked){
      this.insure.controls['insuredclaimdetails'].setValidators([Validators.required]);
      this.insure.controls['insuredclaimdetails'].updateValueAndValidity();
    }else{
      this.insure.controls['insuredclaimdetails'].patchValue('');
      this.insure.controls['insuredclaimdetails'].setValidators(null);
      this.insure.controls['insuredclaimdetails'].updateValueAndValidity();
    }

  }

  sameAsProposer(event) {
    if(event.checked) {
      this.inputReadonly = true;
      this.insure.controls['insurePaTitle'].patchValue(this.proposer.controls['proposerPaTitle'].value);
      this.insure.controls['insurePaFirstname'].patchValue(this.proposer.controls['proposerPaFirstname'].value);
      this.insure.controls['insurePaMidname'].patchValue(this.proposer.controls['proposerPaMidname'].value);
      this.insure.controls['insurePaLastname'].patchValue(this.proposer.controls['proposerPaLastname'].value);
      this.insure.controls['insurePaGender'].patchValue(this.proposer.controls['proposerPaGender'].value);
      this.insure.controls['insurePaDob'].patchValue(this.proposer.controls['proposerPaDob'].value);
      this.insure.controls['insurePaAge'].patchValue(JSON.parse(sessionStorage.proposerAgeP));
      this.insure.controls['insureOccupationList'].patchValue(this.proposer.controls['proposerOccupationList'].value);
      this.insure.controls['insureOccupationListname'].patchValue(this.insureroccupation[this.insure.controls['insureOccupationList'].value]);
      this.insure.controls['insurePaGenderId'].patchValue(this.proposer.controls['proposerPaGenderId'].value);
    } else {
      this.inputReadonly = false;
      this.insure.controls['insurePaTitle'].patchValue('');
      this.insure.controls['insurePaFirstname'].patchValue('');
      this.insure.controls['insurePaMidname'].patchValue('');
      this.insure.controls['insurePaLastname'].patchValue('');
      this.insure.controls['insurePaGender'].patchValue('');
      this.insure.controls['insurePaDob'].patchValue('');
      this.insure.controls['insurePaAge'].patchValue('');
      this.insure.controls['insureOccupationList'].patchValue('');
      this.insure.controls['insurePaGenderId'].patchValue('z');
    }
  }

  // checkone(event) {
  //   if (event.checked) {
  //     this.insure.controls['SIforA'].setValidators([Validators.required]);
  //     this.insure.controls['SIforA'].updateValueAndValidity()
  //   } else {
  //     this.insure.controls['SIforA'].patchValue('');
  //     this.insure.controls['SIforA'].setValidators(null);
  //     this.insure.controls['SIforA'].updateValueAndValidity();
  //     this.insure.controls['TotalCapitalSI'].patchValue('');
  //   }
  // }

  choose(){
    if(this.nominee.controls['relationshipWithInsure'].value == '325') {
      this.other = true;
      this.nominee.controls['ifothersPleaseSpecify'].setValidators([Validators.required]);
      this.nominee.controls['ifothersPleaseSpecify'].updateValueAndValidity()
    }else{
      this.other = false;
      this.nominee.controls['ifothersPleaseSpecify'].setValidators(null);
      this.nominee.controls['ifothersPleaseSpecify'].updateValueAndValidity()
    }

  }


  // proposer next button
  proposerDetails(stepper: MatStepper, value) {
    console.log(value, 'proposer');
    sessionStorage.proposerDetails = '';
    sessionStorage.proposerDetails = JSON.stringify(value);
    if(sessionStorage.proposerAgeP != '' && sessionStorage.proposerAgeP != undefined) {
      this.sessionAge = JSON.parse(sessionStorage.proposerAgeP);
    }
    if (this.proposer.valid) {
      if (this.sessionAge >= 18) {
        stepper.next();
      } else {
        this.toastr.error('Proposer age should be 18 or above');
      }
    }
  }

  riskDetail(stepper: MatStepper, value) {
    console.log(value, 'risk');

    console.log(this.insure.controls['tableA'].value,'tableA');
    console.log(this.getBuyDetails.sub_plan_code,'plancode');
    console.log(this.getBuyDetails,'plansss');

    sessionStorage.riskDetails = '';
    sessionStorage.riskDetails = JSON.stringify(value);
    if (this.riskDetails.valid) {
      console.log(this.getBuyDetails,'sum insurd amount');
      let riskValid = true;
      if (this.getBuyDetails.plan_code == '1901') {
        if (this.riskDetails.controls['medicalexpense'].value == true) {
          if (this.riskDetails.controls['extnrate'].value == '') {
            riskValid = false;
          }
        }else if (this.riskDetails.controls['familydiscount'].value == '') {
            riskValid = false;
          }
        }else if (this.getBuyDetails.plan_code == '1902') {
        if (this.riskDetails.controls['coveragesubOptionID'].value == '') {
          riskValid = false;
        }
      }
      if (riskValid) {
        stepper.next();
      } else {
        this.toastr.error('Please Fill All The Mandatory Fields')
      }
    }else{
      this.toastr.error('please Fill All The Mandatory Fields')
    }
    if(this.getBuyDetails.sub_plan_code == 'IsTableA'){
      console.log(this.insure.controls.tableA,'tableA');
      this.insure.controls['tableA'].patchValue(true);
      this.insure.controls['SIforA'].patchValue(this.getBuyDetails.suminsured_amount);
      this.insure.controls['TotalCapitalSI'].patchValue(this.getBuyDetails.suminsured_amount);
    }else if(this.getBuyDetails.sub_plan_code == 'IsTableB') {
      console.log(this.insure.controls.tableA,'tableC');
      this.insure.controls['tableB'].patchValue(true);
      this.insure.controls['SIforB'].patchValue(this.getBuyDetails.suminsured_amount);
      this.insure.controls['TotalCapitalSI'].patchValue(this.getBuyDetails.suminsured_amount);
    } else {
      console.log(this.insure.controls.tableA,'tableC');
      this.insure.controls['tableC'].patchValue(true);
      this.insure.controls['SIforC'].patchValue(this.getBuyDetails.suminsured_amount);
      this.insure.controls['TotalCapitalSI'].patchValue(this.getBuyDetails.suminsured_amount);
    }
  }

  insureDetails(stepper: MatStepper, value) {
    console.log(value, 'insure');
    sessionStorage.insureDetails = '';
    sessionStorage.insureDetails = JSON.stringify(value);
    if (this.insure.valid) {
      let riskValid = true;
      console.log(this.getBuyDetails.plan_code, 'plan');
      if (this.getBuyDetails.plan_code == '1901') {
        if (this.insure.controls['annualincome'].value == '') {
          riskValid = false;
        } else if (this.insure.controls['earningmember'].value == false) {
          console.log('1901');
          riskValid = false;
        }
      } else if (this.getBuyDetails.plan_code == '1902') {
        if (this.insure.controls['annualincome1'].value == '') {
          riskValid = false;
        } else if (this.insure.controls['earningmember'].value == false) {
          console.log('1902');
          riskValid = false;
        }
      }
      if (riskValid) {
        stepper.next();
      } else {
        this.toastr.error('Please Fill All The Mandatory fields ')
      }
    }
  }

  nomineeDetails(stepper: MatStepper, value) {
    console.log(value, 'nominee');
    sessionStorage.nomineeDetails = '';
    sessionStorage.nomineeDetails = JSON.stringify(value);
    if (this.nominee.valid) {
      this.createproposal(stepper);
    }
  }

  // siforA(event) {
  //   console.log(event, 'a');
  //   this.valueA = event;
  //   this.insure.controls['TotalCapitalSI'].patchValue(this.valueA);
  // }


  topScroll() {
    document.getElementById('main-content').scrollTop = 0;
  }

  sessionData() {
    if (sessionStorage.proposeraArealist != '' && sessionStorage.proposeraArealist != undefined) {
      this.proposerpaAreaList = JSON.parse(sessionStorage.proposeraArealist)
    }
    if (sessionStorage.paAreaList != '' && sessionStorage.paAreaList != undefined) {
      this.paAreaList = JSON.parse(sessionStorage.paAreaList)
    }
    if (sessionStorage.nomineepaAreaList != '' && sessionStorage.nomineepaAreaList != undefined) {
      this.nomineepaAreaList = JSON.parse(sessionStorage.nomineepaAreaList)
    }
    if (sessionStorage.proposerDetails != '' && sessionStorage.proposerDetails != undefined) {
      this.getStepper1 = JSON.parse(sessionStorage.proposerDetails);
      this.proposer = this.fb.group({
        proposerPaTitle: this.getStepper1.proposerPaTitle,
        proposerPaFirstname: this.getStepper1.proposerPaFirstname,
        proposerPaMidname: this.getStepper1.proposerPaMidname,
        proposerPaLastname: this.getStepper1.proposerPaLastname,
        proposerPaGender: this.getStepper1.proposerPaGender,
        proposerPaGenderId: this.getStepper1.proposerPaGenderId,
        proposerPaDob: this.datepipe.transform(this.getStepper1.proposerPaDob, 'y-MM-dd'),
        proposerPaAge: this.getStepper1.proposerPaAge,
        proposercustomertype: this.getStepper1.proposercustomertype,
        proposerPaEmail: this.getStepper1.proposerPaEmail,
        proposerPaMobile: this.getStepper1.proposerPaMobile,
        maritalStatus: this.getStepper1.maritalStatus,
        maritalStatusname: this.getStepper1.maritalStatusname,
        proposerPaPan: this.getStepper1.proposerPaPan,
        proposerPaPassport: this.getStepper1.proposerPaPassport,
        proposerPaAadhar: this.getStepper1.proposerPaAadhar,
        proposerPaGst: this.getStepper1.proposerPaGst,
        proposerPaAddressone: this.getStepper1.proposerPaAddressone,
        proposerPaAddresstwo: this.getStepper1.proposerPaAddresstwo,
        proposerPaAddressthree: this.getStepper1.proposerPaAddressthree,
        proposerPaPincode: this.getStepper1.proposerPaPincode,
        nearestLandmark: this.getStepper1.nearestLandmark,
        proposerPaCountry: this.getStepper1.proposerPaCountry,
        nationality: this.getStepper1.nationality,
        proposerPaArea: this.getStepper1.proposerPaArea,
        proposerPaState: this.getStepper1.proposerPaState,
        proposerPaStatecode: this.getStepper1.proposerPaStatecode,
        proposerPaCity: this.getStepper1.proposerPaCity,
        proposerPaCitycode: this.getStepper1.proposerPaCitycode,
        proposerPaDistrict: this.getStepper1.proposerPaDistrict,
        proposerPaDistrictcode: this.getStepper1.proposerPaDistrictcode,
        PaAddress1: this.getStepper1.PaAddress1,
        PaAddress2: this.getStepper1.PaAddress2,
        PaAddress3: this.getStepper1.PaAddress3,
        PaPincode1: this.getStepper1.PaPincode1,
        nearestLandmark1: this.getStepper1.nearestLandmark1,
        PaCountry: this.getStepper1.PaCountry,
        PaArea1: this.getStepper1.PaArea1,
        PaState1: this.getStepper1.PaState1,
        PaState1code: this.getStepper1.PaState1code,
        PaCity1: this.getStepper1.PaCity1,
        PaCity1code: this.getStepper1.PaCity1code,
        PaDistrict1: this.getStepper1.PaDistrict1,
        PaDistrict1code: this.getStepper1.PaDistrict1code,
        proposerOccupationList: this.getStepper1.proposerOccupationList,
        sameAsProposer: this.getStepper1.sameAsProposer,
        InsuredName: this.getStepper1.InsuredName,
        PolicyNo: this.getStepper1.PolicyNo,
        PreInsstartDob: this.getStepper1.PreInsstartDob,
        PreInsendDob: this.getStepper1.PreInsendDob,
        insurancecompny: this.getStepper1.insurancecompny,
        Address: this.getStepper1.Address,
        residenceNearestLandMark: this.getStepper1.residenceNearestLandMark,
      });
    }
    if(this.getStepper1 != '' && this.getStepper1 != undefined) {
      if (this.getStepper1.sameAsProposer) {
        this.paAreaList = JSON.parse(sessionStorage.proposeraArealist)
      }
    }
    if (sessionStorage.riskDetails != '' && sessionStorage.riskDetails != undefined) {
      this.getStepper2 = JSON.parse(sessionStorage.riskDetails);
      this.riskDetails = this.fb.group({
        CoverageOptionID: this.getBuyDetails.plan_code,
        coveragesubOptionID: this.getStepper2.coveragesubOptionID,
        MembertoInsure: this.getStepper2.MembertoInsure,
        Tenure: this.getStepper2.Tenure,
        employername: this.getStepper2.employername,
        exemptionreason: this.getStepper2.exemptionreason,
        specialconditions: this.getStepper2.specialconditions,
        capitalsuminsured: this.getStepper2.capitalsuminsured,
        medicalexpense: this.getStepper2.medicalexpense,
        extnrate: this.getStepper2.extnrate,
        familydiscount: this.getStepper2.familydiscount,
        employeerelationship: this.getStepper2.employeerelationship,
        servicetax: this.getStepper2.servicetax,
      });
    }
    if (sessionStorage.insureDetails != '' && sessionStorage.insureDetails != undefined) {
      this.getStepper3 = JSON.parse(sessionStorage.insureDetails);
      this.insure = this.fb.group({
        sameAsDetail: this.getStepper3.sameAsDetail,
        insurePaTitle: this.getStepper3.insurePaTitle,
        insurePaFirstname: this.getStepper3.insurePaFirstname,
        insurePaMidname: this.getStepper3.insurePaMidname,
        insurePaLastname: this.getStepper3.insurePaLastname,
        insurePaGender: this.getStepper3.insurePaGender,
        insurePaGenderId: this.getStepper3.insurePaGenderId,
        insurePaDob: this.datepipe.transform(this.getStepper3.insurePaDob,'y-MM-dd'),
        insurePaAge: this.getStepper3.insurePaAge,
        relationshipWithProposer: this.getStepper3.relationshipWithProposer,
        otherinformation: this.getStepper3.otherinformation,
        insureOccupationList: this.getStepper3.insureOccupationList,
        insureOccupationListname: this.getStepper3.insureOccupationListname,
        physicaldefectdetail: this.getStepper3.physicaldefectdetail,
        insuredclaimdetails: this.getStepper3.insuredclaimdetails,
        earningmember: this.getStepper3.earningmember,
        physicaldefect: this.getStepper3.physicaldefect,
        previousinsurer: this.getStepper3.previousinsurer,
        personalaccident: this.getStepper3.personalaccident,
        insurancecover: this.getStepper3.insurancecover,
        annualincome1: this.getStepper3.annualincome1,
        annualincome1value: this.getStepper3.annualincome1value,
        TotalCapital: this.getStepper3.TotalCapital,
        annualincome: this.getStepper3.annualincome,
        tableA: this.getStepper3.tableA,
        tableB: this.getStepper3.tableB,
        tableC: this.getStepper3.tableC,
        tableD: this.getStepper3.tableD,
        SIforA: this.getStepper3.SIforA,
        SIforB: this.getStepper3.SIforB,
        SIforC: this.getStepper3.SIforC,
        SIforD: this.getStepper3.SIforD,
        TotalCapitalSI: this.getStepper3.TotalCapitalSI,
      });
    }
    if (sessionStorage.nomineeDetails != '' && sessionStorage.nomineeDetails != undefined) {
      this.getStepper4 = JSON.parse(sessionStorage.nomineeDetails);
      this.nominee = this.fb.group({
        nomineePaTitle: this.getStepper4.nomineePaTitle,
        nomineePaFirstname: this.getStepper4.nomineePaFirstname,
        nomineePaMidname: this.getStepper4.nomineePaMidname,
        nomineePaLastname: this.getStepper4.nomineePaLastname,
        nomineePaDob: this.datepipe.transform(this.getStepper4.nomineePaDob,'y-MM-dd'),
        nomineePaAddress1: this.getStepper4.nomineePaAddress1,
        nomineePaAddress2: this.getStepper4.nomineePaAddress2,
        nomineePaAddress3: this.getStepper4.nomineePaAddress3,
        nomineePaPincode: this.getStepper4.nomineePaPincode,
        nomineePaState: this.getStepper4.nomineePaState,
        nomineePaStatecode: this.getStepper4.nomineePaStatecode,
        nomineePaDistrict: this.getStepper4.nomineePaDistrict,
        nomineePaDistrictcode: this.getStepper4.nomineePaDistrictcode,
        nomineePaCity: this.getStepper4.nomineePaCity,
        nomineePaCitycode: this.getStepper4.nomineePaCitycode,
        nomineePaArea: this.getStepper4.nomineePaArea,
        nomineePaCountry: this.getStepper4.nomineePaCountry,
        nomineenearestLandmark: this.getStepper4.nomineenearestLandmark,
        relationshipWithInsure: this.getStepper4.relationshipWithInsure,
        relationshipname: this.getStepper4.relationshipname,
        ifothersPleaseSpecify: this.getStepper4.ifothersPleaseSpecify,
      });
    }
  }
  //Proposal Creation
  createproposal(stepper) {
    let enq_id = this.getAllPremiumDetails.enquiry_id;
    console.log(enq_id,'enquiryid');

    const data = {
      "proposal_id":sessionStorage.reliancePAproposalID == '' || sessionStorage.reliancePAproposalID == undefined ? '' : sessionStorage.reliancePAproposalID,
      "enquiry_id": enq_id.toString(),
      "role_id": this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      "user_id": this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      "pos_status":"3",

      "ClientDetails": {
        "ClientTypeID": this.proposer.controls['proposercustomertype'].value,
        "DOB": this.datepipe.transform(this.proposer.controls['proposerPaDob'].value, 'dd-MM-y'),
        "Email": this.proposer.controls['proposerPaEmail'].value,
        "ForeName": this.proposer.controls['proposerPaFirstname'].value,
        "Gender": this.proposer.controls['proposerPaGenderId'].value,
        "LastName": this.proposer.controls['proposerPaLastname'].value,
        "MaritalStatusID": this.proposer.controls['maritalStatus'].value,
        "MidName": this.proposer.controls['proposerPaMidname'].value,
        "MobileNo": this.proposer.controls['proposerPaMobile'].value,
        "Nationality": this.proposer.controls['nationality'].value,
        "OccupationID": this.proposer.controls['proposerOccupationList'].value,
        "PhoneNo": "",
        "Salutation": this.proposer.controls['proposerPaTitle'].value,
        "PanNo": this.proposer.controls['proposerPaPan'].value,
        "RegisteredUnderGST": "1",
        "RelatedParty": "1",
        "GSTIN": this.proposer.controls['proposerPaGst'].value,
        "GroupCorpID": '',
        "ClientAddress": {
          "CommunicationAddress": {
            "Address1": this.proposer.controls['proposerPaAddressone'].value,
            "Address2": this.proposer.controls['proposerPaAddresstwo'].value,
            "Address3": this.proposer.controls['proposerPaAddressthree'].value,
            "CityID": this.proposer.controls['proposerPaCitycode'].value,
            "Country": this.proposer.controls['proposerPaCountry'].value,
            "DistrictID": this.proposer.controls['proposerPaDistrictcode'].value,
            "NearestLandmark": this.proposer.controls['nearestLandmark'].value,
            "Pincode": this.proposer.controls['proposerPaPincode'].value,
            "AreaID": this.proposer.controls['proposerPaArea'].value,
            "StateID": this.proposer.controls['proposerPaStatecode'].value
          },
          "PermanentAddress": {
            "Address": {
              "Address1": this.proposer.controls['PaAddress1'].value,
              "Address2": this.proposer.controls['PaAddress2'].value,
              "Address3": this.proposer.controls['PaAddress3'].value,
              "CityID": this.proposer.controls['PaCity1code'].value,
              "Country": this.proposer.controls['PaCountry'].value,
              "DistrictID": this.proposer.controls['PaDistrict1code'].value,
              "NearestLandmark": this.proposer.controls['nearestLandmark1'].value,
              "Pincode": this.proposer.controls['PaPincode1'].value,
              "AreaID": this.proposer.controls['PaArea1'].value,
              "StateID": this.proposer.controls['PaState1code'].value
            },
            "IsPermanentSameasCommAddr": this.proposer.controls['sameAsProposer'].value
          }
        }
      },
      "InsuredDetailsList": {
        "InsuredDetail": {
          "RelationshipWithProposerID": this.insure.controls['relationshipWithProposer'].value,
          "Salutation": this.insure.controls['insurePaTitle'].value,
          "FirstName": this.insure.controls['insurePaFirstname'].value,
          "LastName": this.insure.controls['insurePaLastname'].value,
          "MiddleName": this.insure.controls['insurePaMidname'].value,
          "IsTableA": this.insure.controls['tableA'].value,
          "IsTableB": this.insure.controls['tableB'].value,
          "IsTableC": this.insure.controls['tableC'].value,
          "IsTableD": this.insure.controls['tableD'].value,
          "SumInsuedTableA": this.insure.controls['SIforA'].value,
          "SumInsuedTableB": this.insure.controls['SIforB'].value,
          "SumInsuedTableC": this.insure.controls['SIforC'].value,
          "SumInsuedTableD": this.insure.controls['SIforD'].value,
          "Gender": this.insure.controls['insurePaGenderId'].value,
          "Age": this.insure.controls['insurePaAge'].value.toString(),
          "DOB": this.datepipe.transform(this.insure.controls['insurePaDob'].value,'dd-MM-y'),
          "MaritalStatusID": this.proposer.controls['maritalStatus'].value,
          "OccupationID": this.insure.controls['insureOccupationList'].value,
          "OtherInsuranceList": this.insure.controls['otherinformation'].value,
          "ISPersonEarningMember": this.insure.controls['earningmember'].value,
          "AnnualIncome": this.insure.controls['annualincome'].value != ''? this.insure.controls['annualincome'].value : this.insure.controls['annualincome1'].value,
          "TotalCapitalSI": this.insure.controls['TotalCapital'].value ,
          "NationalityId": "1949",
          "DoesInsuredSmokeOrConsumeAlchohol": "false"
        }
      },
      "lstStandardRiskDetails": "",
      "Policy": {
        "Tenure": "1",
        "PolicyStartDate": this.datepipe.transform(this.policystart,'dd-MM-y'),
        "PolicyEndDate": this.datepipe.transform(this.policyend,'dd-MM-y'),
        "AgentID": "1",
        "AgentName": "Direct",
        "Branch_Code": "9202",
        "Branch_Name": "Test Branch",
        "BusinessType": "1",
        "ProductCode": "2913",
        "ExternalSystemID": "0",
        "status": "1",
        "Channel": ""
      },
      "UploadDetails": {
        "DocumentType": ""
      },
      "RiskDetails": {
        "PlanID": "",
        "MemberCount": this.riskDetails.controls['MembertoInsure'].value,
        "CoverTypeID": '',
        "SumInsured": this.riskDetails.controls['capitalsuminsured'].value,
        "IsServiceTaxExemptionApplicable": this.riskDetails.controls['servicetax'].value,
        "ServiceTaxExemptionID": this.riskDetails.controls['exemptionreason'].value,
        "CoverageOptionID": this.getBuyDetails.plan_code,
        "CoverageSubOptionID": this.riskDetails.controls['coveragesubOptionID'].value,
        "IsMedicalExpenseExtnApplicable": this.riskDetails.controls['medicalexpense'].value,
        "SpecialConditions": this.riskDetails.controls['specialconditions'].value,
        "FamilyDiscountRate": this.riskDetails.controls['familydiscount'].value,
        "MembertoInsure": this.riskDetails.controls['MembertoInsure'].value,
        "Tenure": this.riskDetails.controls['Tenure'].value
      },
      "NomineeDetails": {
        "FirstName": this.nominee.controls['nomineePaFirstname'].value,
        "Salutation": this.nominee.controls['nomineePaTitle'].value,
        "MiddleName": this.nominee.controls['nomineePaMidname'].value,
        "LastName": this.nominee.controls['nomineePaLastname'].value,
        "DOB": this.datepipe.transform(this.nominee.controls['nomineePaDob'].value,'dd-MM-y'),
        "NomineeRelationshipID": this.nominee.controls['relationshipWithInsure'].value,
        "NomineeRelationshipOther": this.nominee.controls['ifothersPleaseSpecify'].value,
        "NomineeAddress": {
          "Address1": this.nominee.controls['nomineePaAddress1'].value,
          "Address2": this.nominee.controls['nomineePaAddress2'].value,
          "Address3":this.nominee.controls['nomineePaAddress3'].value,
          "CityID": this.nominee.controls['nomineePaCitycode'].value,
          "Country": this.nominee.controls['nomineePaCountry'].value,
          "DistrictID": this.nominee.controls['nomineePaDistrictcode'].value,
          "NearestLandmark":this.nominee.controls['nomineenearestLandmark'].value,
          "Pincode": this.nominee.controls['nomineePaPincode'].value,
          "AreaID": this.nominee.controls['nomineePaArea'].value,
          "StateID": this.nominee.controls['nomineePaStatecode'].value,
          "IsNomineeSameasCommAddr": "false"
        }
      },
      "LstPortability": "",
      "LstDiscount": "",
      "LstEMIPremium": "",
      "LstHealthCoverDetails": "",
      "PreviousInsuranceDetails": {
        "PrevYearPolicyNo": "",
        "PrevYearPolicyStartDate": "",
        "PrevYearPolicyEndDate": ""
      },
      "UserID": "dinesh@gmail.com",
      "SourceSystemID": "MossPortal",
      "AuthToken": "pass@123",
      "CoverDetails": "",
      "IsQuickquote": "false",
      "CIServicePEDList": "",
      "CIServicePreviousInsuraceDetailsList": "",
      "ValidateFlag": "false"
    };
    console.log(data,'1245');
    this.settings.loadingSpinner = true;
    this.personalservice.createproposal(data).subscribe(
        (successData) => {
          this.proposalSuccess(successData,stepper);
        },
        (error) => {
          this.proposalFailure(error);
        }
    );
  }

  public proposalSuccess(successData, stepper) {
    console.log(successData, 'response');
    this.settings.loadingSpinner = false;
    if (successData.IsSuccess == true) {
      stepper.next();
      this.toastr.success('Proposal created successfully!!');
      this.summaryData = successData.ResponseObject;
      for (let i = 0; i <= this.RelationshipList.length; i++) {
        if (this.RelationshipList[i].relationship_id == this.nominee.controls['relationshipWithInsure'].value) {
          this.nominee.controls['relationshipname'].patchValue(this.RelationshipList[i].relatinship_name);
        }
      }
      console.log(this.nominee.controls['relationshipname'].value,'relation');
        console.log(this.summaryData, 'response');
        sessionStorage.summaryData = JSON.stringify(this.summaryData);
        this.RediretUrlLink = this.summaryData.RediretUrlLink;
        sessionStorage.reliancePAproposalID = successData.ResponseObject.policy_id;
        this.proposerdata = this.proposer.value;
        this.riskdata = this.riskDetails.value;
        this.insuredata = this.insure.value;
        this.nomineedata = this.nominee.value;
        this.reliancePAproposalID = this.summaryData.policy_id;
        sessionStorage.Paproposer = JSON.stringify(this.proposerdata);
        sessionStorage.Parisk = JSON.stringify(this.riskdata);
        sessionStorage.Painsured = JSON.stringify(this.insuredata);
        sessionStorage.Panominee = JSON.stringify(this.nomineedata);
      }
    else
      {
        this.toastr.error(successData.ErrorObject);
      }
    }

  public proposalFailure(error) {

  }

}



