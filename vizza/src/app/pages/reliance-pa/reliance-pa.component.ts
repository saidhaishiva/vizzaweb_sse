import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators,FormControl} from '@angular/forms';
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
  public currentStep: any;
    public settings: Settings;
    public minDate: any;
  public insuredAgeP: any;
  public paMaritalList: any;
  public insurerdateError: any;
  public insuredate: any;
  public insurestardate: any;
  public insureenddate: any;
  public professionList: any;
  public occupationCode: any;
  public paIdProofList: any;
  public pannumberP: boolean;
  public voterP: boolean;
  public passportP: boolean;
  public drivinglicenseP: boolean;
  public idListDetailsProposal: any;
  public idListDetailsinsured: any;
  public ProposerPa: any;
  public paPinInsuredList: any;
  public paCityInsuredList: any;
  public paInsureddistrictList: any;
  public proposerAgeP: any;
  public maxStartdate:any;
  public insurebtn: boolean;
  public insurebtn1: boolean;






  constructor(public proposerpa: FormBuilder, public validation: ValidationService, public datepipe: DatePipe, public authservice: AuthService, public personalservice: PersonalAccidentService,private toastr: ToastrService, public appSettings: AppSettings) {
    let stepperindex = 0;
      this.settings = this.appSettings.settings;
      this.settings.HomeSidenavUserBlock = false;
      this.settings.sidenavIsOpened = false;
      this.settings.sidenavIsPinned = false;
      this.currentStep = stepperindex;
    const minDate = new Date();
    this.minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
    this.insuredAgeP = '';
    this.idListDetailsProposal = '';
    this.proposerAgeP = '';
    this.maxStartdate = '';


    this.proposer = this.proposerpa.group({
      insuredPaTitle: ['', Validators.required],
      insuredPaFirstname: ['', Validators.required],
      insuredPaMidname: '',
      insuredPaLastname: ['', Validators.required],
      insuredPaGender: ['', Validators.compose([Validators.required])],
      insuredPaDob: ['', Validators.compose([Validators.required])],
      policyStartDate: '',
      policyEndDate: '',
      insuredPaEmail: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
      insuredPaMobile: ['', Validators.compose([Validators.pattern('[6789][0-9]{9}')])],
      maritalStatus: ['', Validators.required],
      insuredParelationship: '',
      maritalStatusName: '',
      insuredParelationshipName: '',
      insuredPaIdProof: '',
      insuredPaIdProofName: '',
      insuredPaIdProofIdP: '',
      insuredPaPan: ['', Validators.compose([Validators.minLength(10)])],
      insuredPaDriving: '',
      insuredPaPassport: '',
      insuredPaVoter: '',
      insuredPaGst: ['', Validators.compose([Validators.minLength(15)])],
      insuredPaAddress: ['', Validators.required],
      insuredPaAddress2: '',
      insuredPaAddress3: '',
      nationality: 'IN',
      insuredPaPincode: ['', Validators.required],
      insuredPaCity: ['', Validators.required],
      insuredPaCityName: '',
      insuredPaCountry: 'IN',
      insuredPaState: ['', Validators.required],
      insuredPaDistrict: '',
      insuredPaDistrictName: '',
      insuredPaCityIdP: '',
      insuredPaStateIdP: '',
      insuredPaCountryIdP: '',
      insuredPrevList: '',
      insuredPrevListName: '',
      insuredPrevious: '',
      insureSumInsured: '',
      insuredQualify: '',
      insuredremark: '',
      insuredWaive: '',
      insuredPouches: '',
      insuredSmoke: '',
      insuredCheck: '',
      insuredLiquor: '',
      insuredWine: '',
      insuredBeer: '',
      insuredCheck1: '',
      insuredCheck2: '',
      insuredSmokeList: '',
      insuredPouchesList: '',
      insuredPaDistrictIdP: '',
      insuredOccupationList: ['', Validators.required],
      insuredOccupationListName: '',
      insuredProfessionList: ['', Validators.required],
      insuredProfessionListName: '',
      PolicyStartDate: '',
      PolicyEndDate: '',
      MedicalInformations: '',
      insuredPaAge: '',
      insuredAnnual: '',
      previousradio: '2',
      rolecd: 'PROPOSER',
      type: '',
      insuredHeight: '',
      insuredWeight: '',
      sameAsProposer: false
    });
    this.ProposerPa = this.proposerpa.group({
      proposerPaTitle: ['', Validators.required],
      proposerPaFirstname: ['', Validators.required],
      proposerPaMidname: '',
      proposerPaLastname: ['', Validators.required],
      proposerPaGender: ['', Validators.compose([Validators.required])],
      proposerPaDob: ['', Validators.compose([Validators.required])],
      proposerPaEmail: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
      proposerPaMobile: ['', Validators.compose([Validators.pattern('[6789][0-9]{9}')])],
      maritalStatus: ['', Validators.required],
      proposerParelationship: 'SELF',
      proposerPaIdProof: '',
      proposerPaIdProofIdP: '',
      proposerPaPan: ['', Validators.compose([ Validators.minLength(10)])],
      proposerPaDriving: '',
      proposerPaPassport: '',
      proposerPaVoter: '',
      proposerPaGst: ['', Validators.compose([Validators.minLength(15)])],
      proposerPaAddress: ['', Validators.required],
      proposerPaAddress2: '',
      proposerPaAddress3: '',
      nationality: 'IN',
      proposerPaPincode: ['', Validators.required],
      proposerPaCity: ['', Validators.required],
      proposerPaCountry: 'IN',
      proposerPaState: ['', Validators.required],
      proposerPaDistrict: '',
      proposerPaCityIdP: '',
      proposerPaStateIdP: '',
      proposerPaCountryIdP: '',
      proposerPaDistrictIdP: '',
      rolecd: 'PROPOSER',
      type: ''
    });
  }

  ngOnInit() {
    this.paMaritalStatusList();
    this.setProfessionList();
    this.setOccupationListCode();
    this.paIdList();

  }

  insurechangeGender() {
    if (this.proposer.controls['insuredPaTitle'].value == 'Mr') {
      this.proposer.controls['insuredPaTitle'].patchValue('MALE')
    } else {
      this.proposer.controls['insuredPaTitle'].patchValue('FEMALE')
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
          if(type == 'personal'){
            this.insuredate = '';
          } else if (type == 'insure') {
            alert('219');
            this.insurerdateError = '';
          } else {
            if (type == 'startdate') {
              this.insurestardate = '';
            }
          }
        } else {
          if(type == 'personal'){
            this.insuredate = 'Enter Valid Date';
          } else if (type == 'insure') {
            this.insurerdateError = 'Enter Valid Date';
          } else {
            if (type == 'startdate') {
              this.insurestardate = 'Enter Valid Date';
            }
            if(type == 'enddate'){
              this.insureenddate = 'Enter Valid Date';

            }
          }
        }
        selectedDate = event.value._i;
        dob = this.datepipe.transform(event.value, 'y-MM-dd');

        if (selectedDate.length == 10) {
          if(type == 'personal'){
            this.insuredate = '';
            this.ProposerPa.controls['proposerPaDob'].patchValue(dob);
            this.proposerAgeP = this.ageCalculate(dob);
          }  else if (type == 'insure') {
            this.insurerdateError = '';
            this.proposer.controls['insuredPaDob'].patchValue(dob);
            this.insuredAgeP = this.ageCalculate(dob);
            this.proposer.controls['insuredPaAge'].patchValue(this.insuredAgeP);

          } else {
            if (type == 'startdate') {
              this.insurestardate = '';
              this.maxStartdate = dob;
              this.proposer.controls['PolicyStartDate'].patchValue(dob);
            }
            if(type == 'enddate'){
              this.insureenddate = '';
            }
          }
        }
      } else if (typeof event.value._i == 'object') {
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (dob.length == 10) {
          if(type == 'personal'){
            this.insuredate = '';
            this.proposer.controls['proposerPaDob'].patchValue(dob);
            this.proposerAgeP = this.ageCalculate(dob);
          } else if (type == 'insure') {
            this.insurerdateError = '';
            this.proposer.controls['insuredPaDob'].patchValue(dob);
            this.insuredAgeP = this.ageCalculate(dob);
            this.proposer.controls['insuredPaAge'].patchValue(this.insuredAgeP);

          } else {
            if (type == 'startdate') {
              this.maxStartdate = dob;
              this.insurestardate = '';
              this.proposer.controls['PolicyStartDate'].patchValue(dob);
            }
            if(type == 'enddate'){
              this.insureenddate = '';

            }
            // else if (type == 'startdate') {
            //
            // }
          }
        }
      }
      if(type == 'personal'){
        sessionStorage.proposerAgeP = this.proposerAgeP;
      } else if (type == 'insure') {
        sessionStorage.insuredAgeP = this.insuredAgeP;
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
    let dd = today.getDate()- birthDate.getDate();
    if( m < 0 || m == 0 && today.getDate() < birthDate.getDate()){
      age = age-1;
    }
    return age;
  }

  changeMarital() {
    this.proposer.controls['maritalStatusName'].patchValue(this.paMaritalList[this.proposer.controls['maritalStatus'].value])
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

  professionListCode() {
    this.proposer.controls['insuredProfessionListName'].patchValue(this.professionList[this.proposer.controls['insuredProfessionList'].value])
  }

  // profession List
  setProfessionList() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.personalservice.getProfessionList(data).subscribe(
        (successData) => {
          this.professionListSuccess(successData);
        },
        (error) => {
          this.professionListFailure(error);
        }
    );

  }

  public professionListSuccess(successData) {
    this.professionList = successData.ResponseObject;

  }

  public professionListFailure(error) {
  }

  occupationListCode() {
    this.proposer.controls['insuredOccupationListName'].patchValue(this.occupationCode[this.proposer.controls['insuredOccupationList'].value])

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

  // Id proof
  paIdList() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.personalservice.paIdProofList(data).subscribe(
        (successData) => {
          this.paIdProofListSuccess(successData);
        },
        (error) => {
          this.paIdProofListFailure(error);
        }
    );
  }

  public paIdProofListSuccess(successData) {
    this.paIdProofList = successData.ResponseObject;
  }

  public paIdProofListFailure(error) {
  }

  insureidList() {
    if (this.proposer.controls['insuredPaIdProof'].value == 'IDNO2') {
      this.pannumberP = true;
      this.voterP = false;
      this.passportP = false;
      this.drivinglicenseP = false;
    } else if (this.proposer.controls['insuredPaIdProof'].value == 'IDNO1') {
      this.passportP = true;
      this.pannumberP = false;
      this.voterP = false;
      this.drivinglicenseP = false;
    } else if (this.proposer.controls['insuredPaIdProof'].value == 'IDNO4') {
      this.voterP = true;
      this.passportP = false;
      this.pannumberP = false;
      this.drivinglicenseP = false;

    } else if (this.proposer.controls['insuredPaIdProof'].value == 'IDNO3') {
      this.drivinglicenseP = true;
      this.voterP = false;
      this.passportP = false;
      this.pannumberP = false;
    } else {
      if (this.proposer.controls['insuredPaIdProof'].value == 'None' || this.proposer.controls['insuredPaIdProof'].value == '') {
        this.drivinglicenseP = false;
        this.voterP = false;
        this.passportP = false;
        this.pannumberP = false;
        this.idListDetailsProposal = '';
        this.ProposerPa.controls['proposerPaPan'].patchValue('');
        this.ProposerPa.controls['proposerPaPassport'].patchValue('');
        this.ProposerPa.controls['proposerPaVoter'].patchValue('');
        this.ProposerPa.controls['proposerPaDriving'].patchValue('');
      }
    }
  }
  panType(type) {
    if (type == 'personal') {
      if(this.ProposerPa.controls['proposerPaIdProof'].value == 'IDNO2') {
        this.idListDetailsProposal = this.ProposerPa.controls['proposerPaPan'].value;
      } else  if(this.ProposerPa.controls['proposerPaIdProof'].value == 'IDNO1') {
        this.idListDetailsProposal = this.ProposerPa.controls['proposerPaPassport'].value;
      } else if(this.ProposerPa.controls['proposerPaIdProof'].value == 'IDNO4'){
        this.idListDetailsProposal = this.ProposerPa.controls['proposerPaVoter'].value;
      } else if(this.ProposerPa.controls['proposerPaIdProof'].value == 'IDNO3') {
        this.idListDetailsProposal = this.ProposerPa.controls['proposerPaDriving'].value;
      }

    } else if (type == 'insurer') {
      if(this.proposer.controls['insuredPaIdProof'].value == 'IDNO2') {
        this.idListDetailsinsured = this.proposer.controls['insuredPaPan'].value;
      } else  if(this.proposer.controls['insuredPaIdProof'].value == 'IDNO1') {
        this.idListDetailsinsured = this.proposer.controls['insuredPaPassport'].value;
      } else if(this.proposer.controls['insuredPaIdProof'].value == 'IDNO4'){
        this.idListDetailsinsured = this.proposer.controls['insuredPaVoter'].value;
      } else if(this.proposer.controls['insuredPaIdProof'].value == 'IDNO3') {
        this.idListDetailsinsured = this.proposer.controls['insuredPaDriving'].value;
      }

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
            this.pinPaInsuredListSuccess(successData);
          },
          (error) => {
            this.pinPaInsuredListFailure(error);
          }
      );
    }
  }
  public pinPaInsuredListSuccess(successData){
    if (successData.IsSuccess) {
      this.paPinInsuredList = successData.ResponseObject;
      this.proposer.controls['insuredPaState'].patchValue(this.paPinInsuredList.state);
      this.proposer.controls['insuredPaStateIdP'].patchValue(this.paPinInsuredList.state_code);
      this.onChangecityListInsuredPa();
      this.onChangeStateInsured();
    } else if (successData.IsSuccess != true) {
      this.toastr.error('Fill Valid Pincode');
      this.proposer.controls['insuredPaState'].patchValue('');
      this.proposer.controls['insuredPaStateIdP'].patchValue('');
      this.proposer.controls['insuredPaDistrict'].patchValue('');
      this.proposer.controls['insuredPaCity'].patchValue('');
    }
  }

  public pinPaInsuredListFailure(error){
  }
  // insured City
  onChangecityListInsuredPa(){
    const data = {
      'platform': 'web',
      'state_code':this.proposer.controls['insuredPaStateIdP'].value,
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
    this.paCityInsuredList = successData.ResponseObject;

  }
  public insuredCityPaListFailure(error){
  }
  // insured district list
  onChangeStateInsured(){
    const data = {
      'platform': 'web',
      'state_code':this.proposer.controls['insuredPaStateIdP'].value,
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

  public insureddistrictPaListSuccess(successData){
    this.paInsureddistrictList = successData.ResponseObject;
  }
  public insureddistrictPaListFailure(error){
  }
  changeidName(){
    this.proposer.controls['insuredPaIdProofName'].patchValue(this.paIdProofList[this.proposer.controls['insuredPaIdProof'].value])

  }
  nexttab(stepper:MatStepper){
    stepper.next();
  }
}

