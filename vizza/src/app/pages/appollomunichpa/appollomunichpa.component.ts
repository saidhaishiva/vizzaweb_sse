import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {AuthService} from '../../shared/services/auth.service';
import {PersonalAccidentService} from '../../shared/services/personal-accident.service';
import {MatStepper} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {DatePipe} from '@angular/common';
import {AppSettings} from '../../app.settings';
import {Settings} from '../../app.settings.model';


@Component({
  selector: 'app-appollomunichpa',
  templateUrl: './appollomunichpa.component.html',
  styleUrls: ['./appollomunichpa.component.scss']
})
export class AppollomunichpaComponent implements OnInit {
public ProposerPa: FormGroup;
public insured: FormGroup;
public nomineeDetail: FormGroup;
public relationshipListPa: any;
public paIdProofList: any;
public paMaritalList: any;
public paStateList: any;
public settings: Settings;
public padistrictList: any;
public paCityList: any;
public proposerPaData: any;
public proposerIdproof: any;
public mobileNumber: any;
public insuredData: any;
public selectDate: any;
public setDate: any;
public setDateAge: any;
public personalAge: any;
public lastPage: any;
public getAllPremiumDetails: any;
public getBuyDetails: any;
public preinsure: any;
public pannumber: boolean;
public passport: boolean;
public drivinglicense: boolean;
public voter: boolean;
public prevList: boolean;
public occupationCode: any;
public appollo1: any;
public appollo2: any;
public getpanomineeData: any;
public appollosummaryData: any;
public declaration: any;
  constructor(public proposerpa: FormBuilder, public datepipe: DatePipe,public appSettings: AppSettings, private toastr: ToastrService, public config: ConfigurationService, public authservice: AuthService, public personalservice: PersonalAccidentService,) {
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
          MedicalInformations: '',
          rolecd: 'PROPOSER',
          type: ''
      });
      this.insured = this.proposerpa.group({
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
          insuredParelationship: 'SELF',
          insuredPaIdProof: '',
          insuredPaIdProofIdP: '',
          insuredPaPan: ['', Validators.compose([ Validators.minLength(10)])],
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
          insuredPaCountry: 'IN',
          insuredPaState: ['', Validators.required],
          insuredPaDistrict: '',
          insuredPaCityIdP: '',
          insuredPaStateIdP: '',
          insuredPaCountryIdP: '',
          insuredPrevList: '',
          insuredPrevious:'',
          insureSumInsured:'',
          insuredQualify:'',
          insuredremark:'',
          insuredWaive:'',
          insuredPouches:'',
          insuredSmoke:'',
          insuredCheck:'',
          insuredLiquor:'',
          insuredWine:'',
          insuredBeer:'',
          insuredCheck1:'',
          insuredCheck2:'',
          insuredSmokeList:'',
          insuredPouchesList:'',
          insuredPaDistrictIdP: '',
          insuredOccupationList:'',
          MedicalInformations: '',
          insuredAnnual:'',
          previousradio:'',
          rolecd: 'PROPOSER',
          type: ''
      });
      this.nomineeDetail = this.proposerpa.group({
          paNomineeTitle: ['', Validators.required],
          paNomineeName: '',
          paRelationship: '',
          PaNomineeAddress: ['', Validators.required],
          nationality: 'IN',
          PaNomineePincode: ['', Validators.required],
          PaNomineeCity: ['', Validators.required],
          PaNomineeCountry: 'IN',
          PaNomineeState: ['', Validators.required],
          PaNomineeDistrict: '',
          PaNomineeCityIdP: '',
          PaNomineeStateIdP: '',
          PaNomineeCountryIdP: '',
          PaNomineeDistrictIdP: ''
      });
      this.insured.controls['insuredPouchesList'].disable();
      this.insured.controls['insuredSmokeList'].disable();
      this.insured.controls['insuredLiquor'].disable();
      this.insured.controls['insuredWine'].disable();
      this.insured.controls['insuredBeer'].disable();
      this.pannumber= false;
      this.passport= false;
      this.voter= false;
      this.drivinglicense= false;
      this.settings = this.appSettings.settings;
      this.settings.HomeSidenavUserBlock = false;
      this.settings.sidenavIsOpened = false;
      this.settings.sidenavIsPinned = false;
  }

  ngOnInit() {
      this.relationshipPaProposer();
      this. setOccupationListCode();
      this.setProfessionList();
      this.paIdList();
      this.stateListPa();
      this.paMaritalStatusList();
      this.getAllPremiumDetails = JSON.parse(sessionStorage.personalPremiumLists);
      this.getBuyDetails = JSON.parse(sessionStorage.pAccidentProposalList);
      this.sessionData();
  }
    changeGender() {
        if (this.ProposerPa.controls['proposerPaTitle'].value == 'MR') {
            this.ProposerPa.controls['proposerPaGender'].patchValue('MALE');
        } else {
            this.ProposerPa.controls['proposerPaGender'].patchValue('FEMALE');
        }
    }
    insurechangeGender() {
        if (this.insured.controls['insuredPaTitle'].value == 'MR') {
            this.insured.controls['insuredPaGender'].patchValue('MALE');
        } else {
            this.insured.controls['insuredPaGender'].patchValue('FEMALE');
        }
    }
    // RelationShip with Proposer
    relationshipPaProposer() {
        const data = {
            'platform': 'web',
            // 'product_id': '11',
            'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
        }
        this.personalservice.appolloRelationshipPa(data).subscribe(
            (successData) => {
                this.appolloRelationshipPaSuccess(successData);
            },
            (error) => {
                this.appolloRelationshipPaFailure(error);
            }
        );
    }

    public appolloRelationshipPaSuccess(successData) {
        console.log(successData.ResponseObject);
        this.relationshipListPa = successData.ResponseObject;
        console.log( this.relationshipListPa, 'sdfghsdfghszdfgh');

    }
    public appolloRelationshipPaFailure(error) {
        console.log(error);
    }
     // Id proof
    paIdList(){
        const data = {
            'platform': 'web',
            // 'product_id': '11',
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

    public paIdProofListSuccess(successData){
        console.log(successData.ResponseObject);
        this.paIdProofList = successData.ResponseObject;
        console.log( this.paIdProofList, 'IdProofList');
    }
    public paIdProofListFailure(error){
        console.log(error);
    }
    // Marital Status
   paMaritalStatusList(){
        const data = {
            'platform': 'web',
            // 'product_id': '11',
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

    public paMaritalListSuccess(successData){
        console.log(successData.ResponseObject);
        this.paMaritalList = successData.ResponseObject;
        console.log( this.paMaritalList, 'paMaritalList');
    }
    public paMaritalListFailure(error){
        console.log(error);
    }
    // State List Pa
    stateListPa(){
        const data = {
            'platform': 'web',
            // 'product_id': '11',
            'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
        }
        this.personalservice.stateListPa(data).subscribe(
            (successData) => {
                this.pastateListSuccess(successData);
            },
            (error) => {
                this.pastateListFailure(error);
            }
        );
    }

    public pastateListSuccess(successData){
        console.log(successData.ResponseObject);
        this.paStateList = successData.ResponseObject;
        console.log( this.paStateList, 'paStateList');
    }
    public pastateListFailure(error){
        console.log(error);
    }

    // District List
   onChangeState(){
        const data = {
            'platform': 'web',
            'state_code':this.ProposerPa.controls['proposerPaState'].value,
            'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
        }
        this.personalservice.districtPaList(data).subscribe(
            (successData) => {
                this.padistrictPaListSuccess(successData);
            },
            (error) => {
                this.padistrictPaListFailure(error);
            }
        );
    }

    public padistrictPaListSuccess(successData){
        console.log(successData.ResponseObject);
        this.padistrictList = successData.ResponseObject;
        console.log( this.padistrictList, 'padistrictList');
    }
    public padistrictPaListFailure(error){
        console.log(error);
    }

    // City List
    onChangecityListPa(){
        const data = {
            'platform': 'web',
            'state_code':this.ProposerPa.controls['proposerPaState'].value,
            'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
        }
        this.personalservice.cityPaList(data).subscribe(
            (successData) => {
                this.paCityPaListSuccess(successData);
            },
            (error) => {
                this.padistrictPaListFailure(error);
            }
        );
    }

    public paCityPaListSuccess(successData){
        console.log(successData.ResponseObject);
        this.paCityList = successData.ResponseObject;
        console.log( this.paCityList, 'paCityList');
    }
    public paCityPaListFailure(error){
        console.log(error);
    }
    // Proposal details first Page
    proposerDetails(stepper: MatStepper, value) {
        console.log(value, 'value');
        this.proposerPaData = value;
        sessionStorage.appollo1Details = '';
        sessionStorage.appollo1Details = JSON.stringify(value);
        if (this.ProposerPa.valid) {
            // if (sessionStorage.proposerAge >= 18) {
            //     if (this.mobileNumber == '' || this.mobileNumber == 'true'){
                    stepper.next();
                // }

            } else {
                this.toastr.error('Proposer age should be 18 or above');
            }
        }

    // insured Details second page
    InsureDetails(stepper: MatStepper, value) {
        sessionStorage.appollo2Detail = '';
        sessionStorage.appollo2Detail = JSON.stringify(value);
        this.insuredData = value;
        if (this.insured.valid) {
            console.log(value, 'ffffflll');
            stepper.next();

            // if (this.insuremobileNumber == '' || this.insuremobileNumber == 'true') {
            //     stepper.next();
            // }

        }
    }
    // date input
    addEvent(event) {
        this.selectDate = event.value;
        console.log(this.selectDate);
        this.setDate = this.datepipe.transform(this.selectDate, 'dd-MM-y');
        this.setDateAge = this.datepipe.transform(this.selectDate, 'y-MM-dd');
        this.personalAge = this.ageCalculate(this.setDateAge);
        sessionStorage.setItem('proposerAge', this.personalAge);
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

// nomineee details
    religareNomineeDetails(stepper: MatStepper, value) {
        console.log(value);
        if (this.nomineeDetail.valid) {
            sessionStorage.panomineeData = '';
            sessionStorage.panomineeData = JSON.stringify(value);
            alert('innnnn');
            this.createrPoposal();
        }
        this.lastPage = stepper;

    }
// Pre Insure List
preInsureList() {
        const data = {
            'platform': 'web',

            'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
        }
        this.personalservice.preInsure(data).subscribe(
            (successData) => {
                this.preinsureSuccess(successData);
            },
            (error) => {
                this.preinsureFailure(error);
            }
        );
    }

    public preinsureSuccess(successData) {
        console.log(successData.ResponseObject);
        this.preinsure = successData.ResponseObject;
        console.log( this.preinsure, 'preinsure');

    }
    public preinsureFailure(error) {
        console.log(error);
    }
    // checkbox
    checkHabits(value, type){
      if(value.checked && type == 'smoke'){
          this.insured.controls['insuredSmokeList'].enable();
      } else {
          this.insured.controls['insuredSmokeList'].disable();

      }
    if(value.checked && type == 'pouches'){
            this.insured.controls['insuredPouchesList'].enable();
        } else {
            this.insured.controls['insuredPouchesList'].disable();
        }
        if(value.checked && type == 'liquor'){
            this.insured.controls['insuredLiquor'].enable();
        } else {
            this.insured.controls['insuredLiquor'].disable();
        }
        if(value.checked && type == 'wine'){
            this.insured.controls['insuredWine'].enable();
        } else {
            this.insured.controls['insuredWine'].disable();
        }
        if(value.checked && type == 'beer'){
            this.insured.controls['insuredBeer'].enable();
        } else {
            this.insured.controls['insuredBeer'].disable();
        }
    }

// list id
    idList(){
      if(this.ProposerPa.controls['proposerPaIdProof'].value == 'IDNO2'){
      this.pannumber = true;
      } else  if(this.ProposerPa.controls['proposerPaIdProof'].value == 'IDNO1'){
          this.passport = true;
          this.pannumber = false;
      } else if(this.ProposerPa.controls['proposerPaIdProof'].value == 'IDNO4'){
          this.voter = true;
          this.passport = false;
          this.pannumber = false;
      } else if(this.ProposerPa.controls['proposerPaIdProof'].value == 'IDNO3'){
          this.drivinglicense= true;
          this.voter = false;
          this.passport = false;
          this.pannumber = false;
      }
    }
    // previous radio
    previousinsureList(value){
      if(this.insured.controls['previousradio'].value == 1){
          this.prevList = true;
      } else{
          this.prevList = false;
      }
    }
// Occupation List

    setOccupationListCode() {
        const data = {
            'platform': 'web',
            'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
        }
        this.personalservice.getOccupationCodeList(data).subscribe(
            (successData) => {
                this.occupationCodeSuccess(successData);
            },
            (error) => {
                this.occupationCodeFailure(error);
            }
        );

    }


    public occupationCodeSuccess(successData) {
        console.log(successData.ResponseObject);
        this.occupationCode = successData.ResponseObject;

    }

    public occupationCodeFailure(error) {
        console.log(error);
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
        console.log(successData.ResponseObject);
        this.occupationCode = successData.ResponseObject;

    }

    public professionListFailure(error) {
        console.log(error);
    }
// session Data
    sessionData() {
        if (sessionStorage.appollo1Details != '' && sessionStorage.appollo1Details != undefined) {
            this.appollo1 = JSON.parse(sessionStorage.appollo1Details);
            this.ProposerPa = this.proposerpa.group({
                proposerPaTitle: this.appollo1.proposerPaTitle,
                proposerPaFirstname: this.appollo1.proposerPaFirstname,
                proposerPaLastname: this.appollo1.proposerPaLastname,
                proposerPaMidname: this.appollo1.proposerPaMidname,
                maritalStatus: this.appollo1.maritalStatus,
                proposerPaDob: this.appollo1.proposerPaDob,
                proposerParelationship: this.appollo1.proposerParelationship,
                sameAsProposer: this.appollo1.sameAsProposer,
                proposerPaGender: this.appollo1.proposerPaGender,
                proposerPaAddress: this.appollo1.proposerPaAddress,
                proposerPaAddress2: this.appollo1.proposerPaAddress2,
                proposerPaAddress3: this.appollo1.proposerPaAddress3,
                nationality: this.appollo1.nationality,
                proposerPaPincode: this.appollo1.proposerPaPincode,
                proposerPaIdProof: this.appollo1.proposerPaIdProof,
                proposerPaIdProofIdP: this.appollo1.proposerPaIdProofIdP,
                proposerPaPan: this.appollo1.proposerPaPan,
                proposerPaPassport: this.appollo1.proposerPaPassport,
                proposerPaVoter: this.appollo1.proposerPaVoter,
                proposerPaGst: this.appollo1.proposerPaGst,
                proposerPaDriving: this.appollo1.proposerPaDriving,
                MedicalInformations: this.appollo1.MedicalInformations,
                proposerPaCity: this.appollo1.proposerPaCity,
                proposerPaState: this.appollo1.proposerPaState,
                proposerPaCountry: this.appollo1.proposerPaCountry,
                proposerPaDistrict: this.appollo1.proposerPaDistrict,
                proposerPaStateIdP: this.appollo1.proposerPaStateIdP,
                proposerPaCountryIdP: this.appollo1.proposerPaCountryIdP,
                proposerPaCityIdP: this.appollo1.proposerPaCityIdP,
                proposerPaDistrictIdP: this.appollo1.proposerPaDistrictIdP,
                proposerPaEmail: this.appollo1.proposerPaEmail,
                proposerPaMobile: this.appollo1.proposerPaMobile,
                rolecd: this.appollo1.rolecd,
                relationshipcd: this.appollo1.relationshipcd,
            });
        }



        if (sessionStorage.appollo2Detail != '' && sessionStorage.appollo2Detail != undefined) {
            console.log(JSON.parse(sessionStorage.appollo2Detail), 'sessionStorage.stepper1Details');
            this.appollo2 = JSON.parse(sessionStorage.appollo2Detail);
            this.insured = this.proposerpa.group({
                insuredPaTitle: this.appollo2.insuredPaTitle,
                insuredPaFirstname: this.appollo2.insuredPaFirstname,
                insuredPaLastname: this.appollo2.insuredPaLastname,
                insuredPaMidname: this.appollo2.insuredPaMidname,
                maritalStatus: this.appollo2.maritalStatus,
                insuredPaDob: this.appollo2.insuredPaDob,
                insuredParelationship: this.appollo2.insuredParelationship,
                sameAsProposer: this.appollo2.sameAsProposer,
                insuredPaGender: this.appollo2.insuredPaGender,
                insuredPaAddress: this.appollo2.insuredPaAddress,
                insuredPaAddress2: this.appollo2.insuredPaAddress2,
                insuredPaAddress3: this.appollo2.insuredPaAddress3,
                nationality: this.appollo2.nationality,
                insuredPaPincode: this.appollo2.insuredPaPincode,
                insuredPaIdProof: this.appollo2.insuredPaIdProof,
                insuredPaIdProofIdP: this.appollo2.insuredPaIdProofIdP,
                insuredPaPan: this.appollo2.insuredPaPan,
                insuredPaPassport: this.appollo2.insuredPaPassport,
                insuredPaVoter: this.appollo2.insuredPaVoter,
                insuredPaGst: this.appollo2.insuredPaGst,
                insuredPaDriving: this.appollo2.insuredPaDriving,
                MedicalInformations: this.appollo2.MedicalInformations,
                insuredPaCity: this.appollo2.insuredPaCity,
                insuredPaState: this.appollo2.insuredPaState,
                insuredPaCountry: this.appollo2.insuredPaCountry,
                insuredPaDistrict: this.appollo2.insuredPaDistrict,
                insuredPaStateIdP: this.appollo2.insuredPaStateIdP,
                insuredPaCountryIdP: this.appollo2.insuredPaCountryIdP,
                insuredPaCityIdP: this.appollo2.insuredPaCityIdP,
                insuredPaDistrictIdP: this.appollo2.insuredPaDistrictIdP,
                insuredPaEmail: this.appollo2.insuredPaEmail,
                insuredPaMobile: this.appollo2.insuredPaMobile,
                rolecd: this.appollo2.rolecd,
                relationshipcd: this.appollo2.relationshipcd,
            });
        }

        if (sessionStorage.panomineeData != '' && sessionStorage.panomineeData != undefined) {
            console.log(JSON.parse(sessionStorage.panomineeData), 'sessionStorage.stepper1Details');
            this.getpanomineeData = JSON.parse(sessionStorage.panomineeData);
            this.nomineeDetail = this.proposerpa.group({
                paNomineeName: this.getpanomineeData.paNomineeName,
                paRelationship: this.getpanomineeData.paRelationship,
                PaNomineeAddress: this.getpanomineeData.PaNomineeAddress,
                PaNomineePincode: this.getpanomineeData.PaNomineePincode,
                PaNomineeCountry: this.getpanomineeData.PaNomineeCountry,
                PaNomineeCity: this.getpanomineeData.PaNomineeCity,
                PaNomineeState: this.getpanomineeData.PaNomineeState,
                PaNomineeCountryIdP: this.getpanomineeData.PaNomineeCountryIdP,
                PaNomineeCityIdP: this.getpanomineeData.PaNomineeCityIdP,
                PaNomineeStateIdP: this.getpanomineeData.PaNomineeStateIdP,
                PaNomineeDistrictIdP: this.getpanomineeData.PaNomineeDistrictIdP,
                paNomineeTitle: this.getpanomineeData.paNomineeTitle,
            });
        }
    }

    // proposal creation
    createrPoposal(){
      alert();
const data = {
    "enquiry_id": this.getAllPremiumDetails.enquiry_id,
    "proposal_id": 0,
    "user_id": "0",
    "role_id": "4",
    "pos_status": "0",
    "ProposalCaptureServiceRequest": {
        "Prospect": {
            "Application": {
                "NomineeAddress": {
                    "AddressLine1": this.nomineeDetail.controls['PaNomineeAddress'].value,
                    "CountryCode": "IN",
                    "District": this.nomineeDetail.controls['PaNomineeDistrict'].value,
                    "PinCode": this.nomineeDetail.controls['PaNomineePincode'].value,
                    "StateCode": this.nomineeDetail.controls['PaNomineeState'].value,
                    "TownCode": this.nomineeDetail.controls['PaNomineeCity'].value,
                },
                "NomineeName": this.nomineeDetail.controls['paNomineeName'].value,
                "NomineeTitleCode": this.nomineeDetail.controls['paRelationship'].value,
                "RelationToNomineeCode": this.nomineeDetail.controls['paRelationship'].value,
                "Proposer": {
                    "Address": {
                        "Address": {
                            "AddressLine1": this.ProposerPa.controls['proposerPaAddress'].value,
                            "AddressLine2": this.ProposerPa.controls['proposerPaAddress2'].value,
                            "AddressLine3":this.ProposerPa.controls['proposerPaAddress3'].value,
                            "CountryCode": "IN",
                            "District":this.ProposerPa.controls['proposerPaDistrict'].value,
                            "PinCode": this.ProposerPa.controls['proposerPaPincode'].value,
                            "StateCode": this.ProposerPa.controls['proposerPaState'].value,
                            "TownCode": this.ProposerPa.controls['proposerPaCity'].value,
                        }
                    },
                    "BirthDate": this.ProposerPa.controls['proposerPaDob'].value,
                    "ContactInformation": {
                        "ContactNumber": {
                            "ContactNumber": {
                                "Number": this.ProposerPa.controls['proposerPaMobile'].value,
                            }
                        },
                        "Email":this.ProposerPa.controls['proposerPaEmail'].value,
                    },
                    "FirstName": this.ProposerPa.controls['proposerPaFirstname'].value,
                    "GenderCode": this.ProposerPa.controls['proposerPaGender'].value,
                    "GstinNumber": this.ProposerPa.controls['proposerPaGst'].value,
                    "IDProofNumber": this.ProposerPa.controls['proposerPaDriving'].value,
                    "IDProofTypeCode":this.ProposerPa.controls['proposerPaIdProof'].value,
                    "LastName": this.ProposerPa.controls['proposerPaLastname'].value,
                    "MaritalStatusCode": this.ProposerPa.controls['maritalStatus'].value,
                    "MiddleName": this.ProposerPa.controls['proposerPaMidname'].value,
                    "RelationshipCode": this.ProposerPa.controls['proposerParelationship'].value,
                }
            },
            "Client": {
                "Address": {
                    "Address": {
                        "AddressLine1":  this.insured.controls['insuredPaAddress'].value,
                        "AddressLine2": this.insured.controls['insuredPaAddress2'].value,
                        "AddressLine3":  this.insured.controls['insuredPaAddress3'].value,
                        "CountryCode": "IN",
                        "District": this.insured.controls['insuredPaDistrict'].value,
                        "PinCode": this.insured.controls['insuredPaPincode'].value,
                        "StateCode": this.insured.controls['insuredPaState'].value,
                        "TownCode":  this.insured.controls['insuredPaCity'].value,
                    }
                },
                "Age": "26",
                "AnnualIncome":  this.insured.controls['insuredAnnual'].value,
                "BirthDate":  this.insured.controls['insuredPaCity'].value,
                "ClientCode": "PolicyHolder",
                "ContactInformation": {
                    "ContactNumber": {
                        "ContactNumber": {
                            "Number": this.insured.controls['insuredPaMobile'].value,
                        }
                    },
                    "Email":this.insured.controls['insuredPaEmail'].value,
                },
                "Dependants": "",

                "FamilySize": "1",
                "FirstName": this.insured.controls['insuredPaFirstname'].value,
                "GenderCode": this.insured.controls['insuredPaGender'].value,
                "GstinNumber": this.insured.controls['insuredPaCity'].value,

                "IDProofNumber": this.insured.controls['insuredPaCity'].value,
                "IDProofTypeCode": this.insured.controls['insuredPaIdProof'].value,
                "LastName": this.insured.controls['insuredPaLastname'].value,
                "MaritalStatusCode": this.insured.controls['maritalStatus'].value,
                "MiddleName": this.insured.controls['insuredPaMidname'].value,
                "NationalityCode": "IN",
                "OccuptionCode": "303601",

                "PreviousInsurer": {
                    "InceptionDate": this.insured.controls['policyStartDate'].value,
                    "EndDate": this.insured.controls['policyEndDate'].value,
                    "PreviousInsurerCode":this.insured.controls['insuredPrevList'].value,
                    "PreviousPolicyNumber": this.insured.controls['insuredPrevious'].value,
                    "SumInsured":this.insured.controls['insureSumInsured'].value,
                    "QualifyingAmount":this.insured.controls['insuredQualify'].value,
                    "WaivePeriod": this.insured.controls['insuredWaive'].value,
                    "Remarks": this.insured.controls['insuredremark'].value,
                },
                "LifeStyleHabits": {
                    "BeerBottle": this.insured.controls['insuredBeer'].value,
                    "LiquorPeg": this.insured.controls['insuredLiquor'].value,
                    "Pouches":this.insured.controls['insuredPouchesList'].value,
                    "Smoking": this.insured.controls['insuredSmokeList'].value,
                    "WineGlass": this.insured.controls['insuredWine'].value,
                },
                "Product": {
                    "Product": {
                        "ClientCode": "PolicyHolder",
                        "ProductCode": this.getBuyDetails.product_code,
                        "SumAssured": this.getBuyDetails.suminsured_amount,
                    }
                },
                "ProfessionCode": this.insured.controls['insuredOccupationList'].value,
                "RelationshipCode":this.insured.controls['insuredParelationship'].value,
                "TitleCode": this.insured.controls['insuredPaTitle'].value,
            },
            "MedicalInformations": "13131"
        }
    }
}
        this.settings.loadingSpinner = true;
        this.personalservice.  getPersonalAccidentAppolloProposal(data).subscribe(
            (successData) => {
                this.proposalSuccess(successData);
            },
            (error) => {
                this.proposalFailure(error);
            }
        );

    }


    public proposalSuccess(successData) {
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {
            this.toastr.success('Proposal created successfully!!');
            this.appollosummaryData = successData.ResponseObject;
            console.log(this.appollosummaryData, 'this.summaryData');
            this.lastPage.next();

        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }

    public proposalFailure(error) {
        this.settings.loadingSpinner = false;
        console.log(error);
    }
}

