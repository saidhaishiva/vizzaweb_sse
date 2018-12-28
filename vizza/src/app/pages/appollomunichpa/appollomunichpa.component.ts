import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {AuthService} from '../../shared/services/auth.service';
import {PersonalAccidentService} from '../../shared/services/personal-accident.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatStepper} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {DatePipe} from '@angular/common';
import {AppSettings} from '../../app.settings';
import {Settings} from '../../app.settings.model';
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
  selector: 'app-appollomunichpa',
  templateUrl: './appollomunichpa.component.html',
  styleUrls: ['./appollomunichpa.component.scss'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ]
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
public professionList: any;
public applloPAproposalId: any;
public webhost: any;
public paPinList: any;
public idListDetails: any;
public idListDetailsProposal: any;
public todays: any;
public appolloPA: any;
public pin: any;
public insuredPouches: boolean;
public insuredCheck2: boolean;
public insuredCheck1: boolean;
public insuredCheck: boolean;
public insuredSmoke: boolean;
public paInsureddistrictList: any;
public paPinInsuredList: any;
public paCityInsuredList: any;
public paPinnomineeList: any;
public paCityNomineeList: any;
public paNomineedistrictList: any;
public insuredate: any;
public idListDetailsinsured: any;
public proposerAgeP: any;
public insuredAgeP: any;
public insurestardate: any;
public  insurerdateError: any;
public pannumberP: boolean;
public voterP: boolean;
public passportP: boolean;
public drivinglicenseP: boolean;
public minDate: any;
    CheckHabits : boolean;
  constructor(public proposerpa: FormBuilder, public datepipe: DatePipe,public appSettings: AppSettings, private toastr: ToastrService, public config: ConfigurationService, public authservice: AuthService, public personalservice: PersonalAccidentService,) {
      this.webhost = this.config.getimgUrl();
      const minDate = new Date();
      this.minDate= new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
      this.appolloPA = "0";
      this.mobileNumber = 'true';
      this.idListDetailsinsured = '';
      this.idListDetailsProposal = '';
      this.proposerAgeP = '';
      this.insuredAgeP = '';

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
          proposerParelationship: '',
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
          insuredParelationship: '',
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
          insuredOccupationList: ['', Validators.required],
          insuredProfessionList:'',
          PolicyStartDate:'',
          PolicyEndDate:'',
          MedicalInformations: '',
          insuredAnnual:'',
          previousradio:'2',
          rolecd: 'PROPOSER',
          type: ''
      });
      this.nomineeDetail = this.proposerpa.group({
          paNomineeTitle: ['', Validators.required],
          paNomineeName: ['', Validators.required],
          paRelationship: ['', Validators.required],
          paNomineeAddress: ['', Validators.required],
          paNomineeAddress2:'',
          paNomineeAddress3: '',
          nationality: 'IN',
          paNomineePincode: ['', Validators.required],
          paNomineeCity:'',
          paNomineeCountry: 'IN',
          paNomineeState: ['', Validators.required],
          paNomineeDistrict: '',
          paNomineeCityIdP: '',
          paNomineeStateIdP: '',
          paNomineeCountryIdP: '',
          paNomineeDistrictIdP: ''
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
      this.pannumberP= false;
      this.passportP= false;
      this.voterP= false;
      this.drivinglicenseP= false;
      this.settings = this.appSettings.settings;
      this.settings.HomeSidenavUserBlock = false;
      this.settings.sidenavIsOpened = false;
      this.settings.sidenavIsPinned = false;
      this.prevList = false;
      this.CheckHabits = false;

  }

  ngOnInit() {
      this.relationshipPaProposer();
      this. setOccupationListCode();
      this.setProfessionList();
      this.paIdList();
      this.stateListPa();
      this.paMaritalStatusList();
      this.preInsureList();
      this.getAllPremiumDetails = JSON.parse(sessionStorage.personalPremiumLists);
      this.getBuyDetails = JSON.parse(sessionStorage.pAccidentProposalList);
      this.sessionData();
  }
    canDeactivate() {
        return this.appolloPA;
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
    topScroll() {
        document.getElementById('main-content').scrollTop = 0;
    }
    // RelationShip with Proposer
    relationshipPaProposer() {
        const data = {
            'platform': 'web',
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
        this.relationshipListPa = successData.ResponseObject;

    }
    public appolloRelationshipPaFailure(error) {
    }
     // Id proof
    paIdList(){
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

    public paIdProofListSuccess(successData){
        this.paIdProofList = successData.ResponseObject;
    }
    public paIdProofListFailure(error){
    }
    // Marital Status
   paMaritalStatusList(){
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

    public paMaritalListSuccess(successData){
        this.paMaritalList = successData.ResponseObject;
    }
    public paMaritalListFailure(error){
    }
    // State List Pa
    stateListPa(){
        const data = {
            'platform': 'web',
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
        this.paStateList = successData.ResponseObject;
    }
    public pastateListFailure(error){
    }
// accept Only Number
    public onNumber(event: any) {
        if (event.charCode !== 0) {
            const pattern = /[0-9//]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }
    public onlyNumber(event: any) {
        if (event.charCode !== 0) {
            const pattern = /[0-9]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }
    // Accept Only Character
    public onCharacter(event: any) {
        if (event.charCode !== 0) {
            const pattern = /[a-zA-Z]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }
    // District List
   onChangeState(){
        const data = {
            'platform': 'web',
            'state_code':this.ProposerPa.controls['proposerPaStateIdP'].value,
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
        this.padistrictList = successData.ResponseObject;
    }
    public padistrictPaListFailure(error){
    }

    // City List
    onChangecityListPa(){
        const data = {
            'platform': 'web',
            'state_code':this.ProposerPa.controls['proposerPaStateIdP'].value,
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
        this.paCityList = successData.ResponseObject;

    }
    public paCityPaListFailure(error){
    }
    // insured district list
    onChangeStateInsured(){
        const data = {
            'platform': 'web',
            'state_code':this.insured.controls['insuredPaStateIdP'].value,
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
     // insured City
    onChangecityListInsuredPa(){
        const data = {
            'platform': 'web',
            'state_code':this.insured.controls['insuredPaStateIdP'].value,
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

    // nominee district list
    onChangeStateNominee(){
        const data = {
            'platform': 'web',
            'state_code':this.nomineeDetail.controls['paNomineeStateIdP'].value,
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

    public nomineedistrictPaListSuccess(successData){
        this.paNomineedistrictList = successData.ResponseObject;
    }
    public nomineedistrictPaListFailure(error){
    }
    // nominee City
    onChangecityListNomineePa(){
        const data = {
            'platform': 'web',
            'state_code':this.nomineeDetail.controls['paNomineeStateIdP'].value,
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

    public nomineeCityPaListSuccess(successData){
        this.paCityNomineeList = successData.ResponseObject;

    }
    public nomineeCityPaListFailure(error){
    }
    // Proposal details first Page
    proposerDetails(stepper: MatStepper, value) {
        this.proposerPaData = value;
        sessionStorage.appollo1Details = '';
        sessionStorage.appollo1Details = JSON.stringify(value);
        if (this.ProposerPa.valid) {
            if (sessionStorage.proposerAgeP >= 18) {
                    stepper.next();
                    this.topScroll();
            } else {
                this.toastr.error('Proposer age should be 18 or above');
            }
        }
    }

    // insured Details second page
    InsureDetails(stepper: MatStepper, value) {
        sessionStorage.appollo2Detail = '';
        sessionStorage.appollo2Detail = JSON.stringify(value);
        this.insuredData = value;
        if (this.insured.valid) {
            if (sessionStorage.insuredAgeP >= 18){
                stepper.next();
                this.topScroll();

            } else {
                this.toastr.error('Insured age should be 18 or above');

            }

        }
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
                        this.insured.controls['insuredPaDob'].patchValue(dob);
                        this.insuredAgeP = this.ageCalculate(dob);

                    } else {
                        if (type == 'startdate') {
                            this.insurestardate = '';
                            this.insured.controls['PolicyStartDate'].patchValue(dob);
                        }
                    }
                }
            } else if (typeof event.value._i == 'object') {
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                if (dob.length == 10) {
                    if(type == 'personal'){
                        this.insuredate = '';
                        this.ProposerPa.controls['proposerPaDob'].patchValue(dob);
                        this.proposerAgeP = this.ageCalculate(dob);
                    } else if (type == 'insure') {
                        this.insurerdateError = '';
                        this.insured.controls['insuredPaDob'].patchValue(dob);
                        this.insuredAgeP = this.ageCalculate(dob);

                    } else {
                        if (type == 'startdate') {
                            this.insurestardate = '';
                            this.insured.controls['PolicyStartDate'].patchValue(dob);
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
        // if (this.nomineeDetail.valid) {
            sessionStorage.panomineeData = '';
            sessionStorage.panomineeData = JSON.stringify(value);
            this.createrPoposal();
        // }
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
        this.preinsure = successData.ResponseObject;

    }
    public preinsureFailure(error) {
    }
    // checkbox
    checkHabits(value, type) {
        if (value.checked) {
           this.CheckHabits = true;
            if (type == 'smoke') {
                this.insuredSmoke = true;
                this.insured.controls['insuredSmokeList'].enable();
            } else if (type == 'pouches') {
                this.insuredPouches = true;
                this.insured.controls['insuredPouchesList'].enable();
            } else if (type == 'liquor') {
                this.insuredCheck = true;
                this.insured.controls['insuredLiquor'].enable();
            } else if (type == 'wine') {
                this.insuredCheck1 = true;
                this.insured.controls['insuredWine'].enable();
            } else if (type == 'beer') {
                this.insuredCheck2 = true;
                this.insured.controls['insuredBeer'].enable();
            }
        } else {
            this.CheckHabits = true;
            if (type == 'smoke') {
                this.insuredSmoke = false;
                this.insured.controls['insuredSmokeList'].patchValue('');
                this.insured.controls['insuredSmokeList'].disable();

            } else if (type == 'pouches') {
                this.insuredPouches = false;
                this.insured.controls['insuredPouchesList'].patchValue('');
                this.insured.controls['insuredPouchesList'].disable();
            } else if (type == 'liquor') {
                this.insuredCheck = false;
                this.insured.controls['insuredLiquor'].patchValue('');
                this.insured.controls['insuredLiquor'].disable();

            } else if (type == 'wine') {
                this.insuredCheck1 = false;
                this.insured.controls['insuredWine'].patchValue('');
                this.insured.controls['insuredWine'].disable();

            } else if (type == 'beer') {
                this.insuredCheck2 = false;
                this.insured.controls['insuredBeer'].patchValue('');
                this.insured.controls['insuredBeer'].disable();

            }

        }
    }

// list id
    idList(){
      if(this.ProposerPa.controls['proposerPaIdProof'].value == 'IDNO2'){
          this.pannumber = true;
          this.voter = false;
          this.passport = false;
          this.drivinglicense= false;
      } else  if(this.ProposerPa.controls['proposerPaIdProof'].value == 'IDNO1'){
          this.passport = true;
          this.pannumber = false;
          this.voter = false;
          this.drivinglicense= false;
      } else if(this.ProposerPa.controls['proposerPaIdProof'].value == 'IDNO4'){
          this.voter = true;
          this.passport = false;
          this.pannumber = false;
          this.drivinglicense= false;

      } else if(this.ProposerPa.controls['proposerPaIdProof'].value == 'IDNO3'){
          this.drivinglicense= true;
          this.voter = false;
          this.passport = false;
          this.pannumber = false;
      }
    }
    insureidList(){
        if(this.insured.controls['insuredPaIdProof'].value == 'IDNO2'){
            this.pannumberP= true;
            this.voterP = false;
            this.passportP = false;
            this.drivinglicenseP= false;
        } else  if(this.insured.controls['insuredPaIdProof'].value == 'IDNO1'){
            this.passportP = true;
            this.pannumberP = false;
            this.voterP = false;
            this.drivinglicenseP= false;
        } else if(this.insured.controls['insuredPaIdProof'].value == 'IDNO4'){
            this.voterP = true;
            this.passportP = false;
            this.pannumberP = false;
            this.drivinglicenseP= false;

        } else if(this.insured.controls['insuredPaIdProof'].value == 'IDNO3'){
            this.drivinglicenseP= true;
            this.voterP = false;
            this.passportP = false;
            this.pannumberP = false;
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
          if(this.insured.controls['insuredPaIdProof'].value == 'IDNO2') {
              this.idListDetailsinsured = this.insured.controls['insuredPaPan'].value;
          } else  if(this.insured.controls['insuredPaIdProof'].value == 'IDNO1') {
              this.idListDetailsinsured = this.insured.controls['insuredPaPassport'].value;
          } else if(this.insured.controls['insuredPaIdProof'].value == 'IDNO4'){
              this.idListDetailsinsured = this.insured.controls['insuredPaVoter'].value;
          } else if(this.insured.controls['insuredPaIdProof'].value == 'IDNO3') {
              this.idListDetailsinsured = this.insured.controls['insuredPaDriving'].value;
          }

      }

    }

    // previous radio
    previousinsureList(value){

      if(this.insured.controls['previousradio'].value == 1){
          this.prevList = true;
          this.insuredSmoke = true;
          this.insured.controls['PolicyStartDate'].setValidators([Validators.required]);
          this.insured.controls['PolicyEndDate'].setValidators([Validators.required]);
          this.insured.controls['insuredPrevList'].setValidators([Validators.required]);
          this.insured.controls['insuredPrevious'].setValidators([Validators.required]);
          this.insured.controls['insureSumInsured'].setValidators([Validators.required]);
          this.insured.controls['insuredQualify'].setValidators([Validators.required]);
          this.insured.controls['insuredWaive'].setValidators([Validators.required]);
          this.insured.controls['insuredremark'].setValidators([Validators.required]);
      } else{
          this.prevList = false;
          this.insuredSmoke = false;
          this.insured.controls['PolicyStartDate'].setValidators(null);
          this.insured.controls['PolicyEndDate'].setValidators(null);
          this.insured.controls['insuredPrevList'].setValidators(null);
          this.insured.controls['insuredPrevious'].setValidators(null);
          this.insured.controls['insureSumInsured'].setValidators(null);
          this.insured.controls['insuredQualify'].setValidators(null);
          this.insured.controls['insuredWaive'].setValidators(null);
          this.insured.controls['insuredremark'].setValidators(null);
      }
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
// session Data
    sessionData() {
        if (sessionStorage.appollo1Details != '' && sessionStorage.appollo1Details != undefined) {
            this.appollo1 = JSON.parse(sessionStorage.appollo1Details);
            if (this.appollo1.proposerPaPincode != '') {
                this.getPostalCode(this.appollo1.proposerPaPincode);
            }
            this.ProposerPa = this.proposerpa.group({
                proposerPaTitle: this.appollo1.proposerPaTitle,
                proposerPaFirstname: this.appollo1.proposerPaFirstname,
                proposerPaLastname: this.appollo1.proposerPaLastname,
                proposerPaMidname: this.appollo1.proposerPaMidname,
                maritalStatus: this.appollo1.maritalStatus,
                proposerPaDob: new FormControl(new Date(this.appollo1.proposerPaDob)),
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
            this.appollo2 = JSON.parse(sessionStorage.appollo2Detail);
            if (this.appollo2.insuredPaPincode != '') {
                this.getinsuredPostalCode(this.appollo2.insuredPaPincode);
            }


            this.insured = this.proposerpa.group({
                insuredPaTitle: this.appollo2.insuredPaTitle,
                insuredPaFirstname: this.appollo2.insuredPaFirstname,
                insuredPaLastname: this.appollo2.insuredPaLastname,
                insuredPaMidname: this.appollo2.insuredPaMidname,
                maritalStatus: this.appollo2.maritalStatus,
                insuredPaDob: new FormControl(new Date(this.appollo2.insuredPaDob)),
                insuredParelationship: this.appollo2.insuredParelationship,
                sameAsProposer: this.appollo2.sameAsProposer,
                insuredPaGender: this.appollo2.insuredPaGender,
                insuredPaAddress: this.appollo2.insuredPaAddress,
                insuredPaAddress2: this.appollo2.insuredPaAddress2,
                insuredPaAddress3: this.appollo2.insuredPaAddress3,
                nationality: this.appollo2.nationality,
                insuredPaPincode: this.appollo2.insuredPaPincode,
                insuredPaIdProof: this.appollo2.insuredPaIdProof,
                insuredAnnual: this.appollo2.insuredAnnual,
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
                insuredPouchesList: this.appollo2.insuredPouchesList,
                insuredSmokeList: this.appollo2.insuredSmokeList,
                insuredLiquor: this.appollo2.insuredLiquor,
                insuredWine: this.appollo2.insuredWine,
                insuredPouches: false,
                insuredSmoke: false,
                insuredCheck: false,
                insuredCheck1: false,
                insuredCheck2: false,
                insuredOccupationList: this.appollo2.insuredOccupationList,
                insuredProfessionList: this.appollo2.insuredProfessionList,
                insuredBeer: this.appollo2.insuredBeer,
                previousradio: this.appollo2.previousradio,
                PolicyStartDate: this.appollo2.PolicyStartDate,
                PolicyEndDate: this.appollo2.PolicyEndDate,
                rolecd: this.appollo2.rolecd,
                insuredPrevList: this.appollo2.insuredPrevList,
                insuredPrevious: this.appollo2.insuredPrevious,
                insureSumInsured: this.appollo2.insureSumInsured,
                insuredQualify: this.appollo2.insuredQualify,
                insuredremark: this.appollo2.insuredremark,
                insuredWaive: this.appollo2.insuredWaive,
                relationshipcd: this.appollo2.relationshipcd,
            });

            if (this.appollo2.insuredSmoke) {
                this.insured.controls['insuredSmoke'].patchValue(this.appollo2.insuredSmoke);
                this.checkHabits(this.appollo2.insuredSmoke, 'smoke');
                this.insured.controls['insuredSmokeList'].patchValue(this.appollo2.insuredSmokeList);
                this.insured.controls['insuredSmokeList'].enable();
            } else {
                this.insuredSmoke = false;
                this.insured.controls['insuredSmokeList'].disable();

            }
            if (this.appollo2.insuredPouches) {
                this.insured.controls['insuredPouches'].patchValue(this.appollo2.insuredPouches);
                this.checkHabits(this.appollo2.insuredPouches, 'pouches');
                this.insured.controls['insuredPouchesList'].patchValue(this.appollo2.insuredPouchesList);
                this.insured.controls['insuredPouchesList'].enable();
            } else {
                this.insuredSmoke = false;
                this.insured.controls['insuredPouchesList'].disable();

            }
            if (this.appollo2.insuredCheck) {
                this.insured.controls['insuredLiquor'].patchValue(this.appollo2.insuredLiquor);
                this.checkHabits(this.appollo2.insuredLiquor, 'liquor');
                this.insured.controls['insuredCheck'].patchValue(this.appollo2.insuredCheck);
                this.insured.controls['insuredLiquor'].enable();
            } else {
                this.insuredSmoke = false;
                this.insured.controls['insuredLiquor'].disable();

            }
            if (this.appollo2.insuredCheck1) {
                this.insured.controls['insuredWine'].patchValue(this.appollo2.insuredWine);
                this.checkHabits(this.appollo2.insuredWine, 'wine');
                this.insured.controls['insuredCheck1'].patchValue(this.appollo2.insuredCheck1);
                this.insured.controls['insuredWine'].enable();
            } else {
                this.insuredSmoke = false;
                this.insured.controls['insuredWine'].disable();

            }
            if (this.appollo2.insuredCheck2) {
                this.insured.controls['insuredBeer'].patchValue(this.appollo2.insuredBeer);
                this.checkHabits(this.appollo2.insuredBeer, 'beer');
                this.insured.controls['insuredCheck2'].patchValue(this.appollo2.insuredCheck2);
                this.insured.controls['insuredBeer'].enable();
            } else {
                this.insuredSmoke = false;
                this.insured.controls['insuredBeer'].disable();

            }
            if (this.appollo2.previousradio == 1) {
                this.insuredSmoke = true;
                this.insured.controls['PolicyStartDate'].patchValue(this.appollo2.PolicyStartDate);
                this.insured.controls['PolicyEndDate'].patchValue(this.appollo2.PolicyEndDate);
                this.insured.controls['insuredPrevList'].patchValue(this.appollo2.insuredPrevList);
                this.insured.controls['insuredPrevious'].patchValue(this.appollo2.insuredPrevious);
                this.insured.controls['insureSumInsured'].patchValue(this.appollo2.insureSumInsured);
                this.insured.controls['insuredQualify'].patchValue(this.appollo2.insuredQualify);
                this.insured.controls['insuredWaive'].patchValue(this.appollo2.insuredWaive);
                this.insured.controls['insuredremark'].patchValue(this.appollo2.insuredremark);
                this.previousinsureList('');

            } else {
                this.insuredSmoke = false;
                this.insured.controls['PolicyStartDate'].patchValue('');
                this.insured.controls['PolicyEndDate'].patchValue('');
                this.insured.controls['insuredPrevList'].patchValue('');
                this.insured.controls['insuredPrevious'].patchValue('');
                this.insured.controls['insureSumInsured'].patchValue('');
                this.insured.controls['insuredQualify'].patchValue('');
                this.insured.controls['insuredWaive'].patchValue('');
                this.insured.controls['insuredremark'].patchValue('');
            }
        }

        if (sessionStorage.panomineeData != '' && sessionStorage.panomineeData != undefined) {
            this.getpanomineeData = JSON.parse(sessionStorage.panomineeData);
            if (this.getpanomineeData.paNomineePincode != '') {
                this.getnomineePostalCode(this.getpanomineeData.paNomineePincode);
            }
            this.nomineeDetail = this.proposerpa.group({
                paNomineeName: this.getpanomineeData.paNomineeName,
                paRelationship: this.getpanomineeData.paRelationship,
                paNomineeAddress: this.getpanomineeData.paNomineeAddress,
                paNomineeAddress2: this.getpanomineeData.paNomineeAddress2,
                paNomineeAddress3: this.getpanomineeData.paNomineeAddress3,
                paNomineePincode: this.getpanomineeData.paNomineePincode,
                paNomineeCountry: this.getpanomineeData.paNomineeCountry,
                paNomineeCity: this.getpanomineeData.paNomineeCity,
                paNomineeState: this.getpanomineeData.paNomineeState,
                paNomineeCountryIdP: this.getpanomineeData.paNomineeCountryIdP,
                paNomineeDistrict: this.getpanomineeData.paNomineeDistrict,
                paNomineeCityIdP: this.getpanomineeData.paNomineeCityIdP,
                paNomineeStateIdP: this.getpanomineeData.paNomineeStateIdP,
                paNomineeDistrictIdP: this.getpanomineeData.paNomineeDistrictIdP,
                paNomineeTitle: this.getpanomineeData.paNomineeTitle,
            });
        }
        if (sessionStorage.appolloPAproposalID != '' && sessionStorage.appolloPAproposalID != undefined) {
            this.appolloPA = sessionStorage.appolloPAproposalID;
        }
    }
// Pin validate
    getPostalCode(pin) {
        this.pin = pin;
        const data = {
            'platform': 'web',
            'postalcode': this.pin
        };
        if (this.pin.length == 6) {
            this.personalservice.pinPaList(data).subscribe(
                (successData) => {
                    this.pinPaListSuccess(successData);
                },
                (error) => {
                    this.pinPaListFailure(error);
                }
            );
        }
    }
    public pinPaListSuccess(successData){
        if (successData.IsSuccess) {
            this.paPinList = successData.ResponseObject;
            this.ProposerPa.controls['proposerPaState'].patchValue(this.paPinList.state);
            this.ProposerPa.controls['proposerPaStateIdP'].patchValue(this.paPinList.state_code);
            this.onChangeState();
            this.onChangecityListPa();
        } else if (successData.IsSuccess != true){
            this.toastr.error('Invalid Pincode');
            this.ProposerPa.controls['proposerPaState'].patchValue('');
            this.ProposerPa.controls['proposerPaStateIdP'].patchValue('');
            this.ProposerPa.controls['proposerPaDistrict'].patchValue('');
            this.ProposerPa.controls['proposerPaCity'].patchValue('');
        }
    }

    public pinPaListFailure(error){
    }
// insured pin validate
    getinsuredPostalCode(pin) {
        this.pin = pin;
        const data = {
            'platform': 'web',
            'postalcode': this.pin
        };
        if (this.pin.length == 6) {
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
            this.insured.controls['insuredPaState'].patchValue(this.paPinInsuredList.state);
            this.insured.controls['insuredPaStateIdP'].patchValue(this.paPinInsuredList.state_code);
            this.onChangecityListInsuredPa();
            this.onChangeStateInsured();
        } else if (successData.IsSuccess != true) {
            this.toastr.error('Fill Valid Pincode');
            this.insured.controls['insuredPaState'].patchValue('');
            this.insured.controls['insuredPaStateIdP'].patchValue('');
            this.insured.controls['insuredPaDistrict'].patchValue('');
            this.insured.controls['insuredPaCity'].patchValue('');
        }
    }

    public pinPaInsuredListFailure(error){
    }
    // nomineee pin validate
    getnomineePostalCode(pin) {
        this.pin = pin;
        const data = {
            'platform': 'web',
            'postalcode': this.pin
        };
        if (this.pin.length == 6) {
            this.personalservice.pinPaList(data).subscribe(
                (successData) => {
                    this.pinPanomineeListSuccess(successData);
                },
                (error) => {
                    this.pinPanomineeListFailure(error);
                }
            );
        }
    }
    public pinPanomineeListSuccess(successData){
        if (successData.IsSuccess) {
            this.paPinnomineeList = successData.ResponseObject;
            this.nomineeDetail.controls['paNomineeState'].patchValue(this.paPinnomineeList.state);
            this.nomineeDetail.controls['paNomineeStateIdP'].patchValue(this.paPinnomineeList.state_code);
            this.onChangeStateNominee();
            this.onChangecityListNomineePa();
        } else if (successData.IsSuccess != true) {
            this.toastr.error('Fill Valid Pincode');
            this.nomineeDetail.controls['paNomineeState'].patchValue('');
            this.nomineeDetail.controls['paNomineeStateIdP'].patchValue('');
            this.nomineeDetail.controls['paNomineeDistrict'].patchValue('');
            this.nomineeDetail.controls['paNomineeCity'].patchValue('');

        }
    }

    public pinPanomineeListFailure(error){
    }
    // proposal creation
    createrPoposal(){
      let enq_id = this.getAllPremiumDetails.enquiry_id;
   const data = {
    "enquiry_id": enq_id.toString(),
    "proposal_id": this.appolloPA,
    "user_id": "0",
    "role_id": "4",
    "pos_status": "0",
    "ProposalCaptureServiceRequest": {
        "Prospect": {
            "Application": {
                "NomineeAddress": {
                    "AddressLine1": this.nomineeDetail.controls['paNomineeAddress'].value,
                    "CountryCode": "IN",
                    "District": this.nomineeDetail.controls['paNomineeDistrict'].value,
                    "PinCode": this.nomineeDetail.controls['paNomineePincode'].value,
                    "StateCode": this.nomineeDetail.controls['paNomineeStateIdP'].value,
                    "TownCode": this.nomineeDetail.controls['paNomineeCity'].value,
                },
                "NomineeName": this.nomineeDetail.controls['paNomineeName'].value,
                "NomineeTitleCode": this.nomineeDetail.controls['paNomineeTitle'].value,
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
                            "StateCode": this.ProposerPa.controls['proposerPaStateIdP'].value,
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
                    "IDProofNumber": this.idListDetailsProposal,
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
                        "StateCode": this.insured.controls['insuredPaStateIdP'].value,
                        "TownCode":  this.insured.controls['insuredPaCity'].value,
                    }
                },
                "Age": "26",
                "AnnualIncome": this.insured.controls['insuredAnnual'].value,
                "BirthDate":  this.insured.controls['insuredPaDob'].value,
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
                "GstinNumber": this.insured.controls['insuredPaGst'].value,

                "IDProofNumber": this.idListDetailsinsured,
                "IDProofTypeCode": this.insured.controls['insuredPaIdProof'].value,
                "LastName": this.insured.controls['insuredPaLastname'].value,
                "MaritalStatusCode": this.insured.controls['maritalStatus'].value,
                "MiddleName": this.insured.controls['insuredPaMidname'].value,
                "NationalityCode": "IN",
                "OccuptionCode":this.insured.controls['insuredOccupationList'].value,
                "PreviousInsurer": {
                    "InceptionDate": this.insured.controls['PolicyStartDate'].value,
                    "EndDate":this.insured.controls['PolicyEndDate'].value,
                    "PreviousInsurerCode":this.insured.controls['insuredPrevList'].value,
                    "PreviousPolicyNumber":this.insured.controls['insuredPrevious'].value,
                    "SumInsured":this.insured.controls['insureSumInsured'].value,
                    "QualifyingAmount":this.insured.controls['insuredQualify'].value,
                    "WaivePeriod": this.insured.controls['insuredWaive'].value,
                    "Remarks": this.insured.controls['insuredremark'].value
                },
                "LifeStyleHabits": {
                    "BeerBottle": this.insured.controls['insuredBeer'].value || this.insured.controls['insuredBeer'].value != undefined ? this.insured.controls['insuredBeer'].value: 0 ,
                    "LiquorPeg": this.insured.controls['insuredLiquor'].value ||  this.insured.controls['insuredLiquor'].value != undefined ?  this.insured.controls['insuredLiquor'].value: 0 ,
                    "Pouches":this.insured.controls['insuredPouchesList'].value ||  this.insured.controls['insuredPouchesList'].value != undefined ?  this.insured.controls['insuredPouchesList'].value: 0 ,
                    "Smoking": this.insured.controls['insuredSmokeList'].value ||  this.insured.controls['insuredSmokeList'].value != undefined ?  this.insured.controls['insuredSmokeList'].value: 0 ,
                    "WineGlass": this.insured.controls['insuredWine'].value ||  this.insured.controls['insuredWine'].value != undefined ?  this.insured.controls['insuredWine'].value: 0 ,
                },
                "Product": {
                    "Product": {
                        "ClientCode": "PolicyHolder",
                        "ProductCode": this.getBuyDetails.product_code,
                        "SumAssured": this.getBuyDetails.suminsured_amount,
                    }
                },
                "ProfessionCode": this.insured.controls['insuredProfessionList'].value,
                "RelationshipCode":this.insured.controls['insuredParelationship'].value,
                "TitleCode": this.insured.controls['insuredPaTitle'].value,
            },
            "MedicalInformations": ""
        }
    }
}
        this.settings.loadingSpinner = true;
        this.personalservice.getPersonalAccidentAppolloProposal(data).subscribe(
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
            this.appolloPA = this.appollosummaryData.ProposalId;
            sessionStorage.appolloPAproposalID = this.appolloPA ;
            // Proposer state
            if(this.appollosummaryData.ProposalDetails.p_statecode == this.paPinList.state_code) {
                this.appollosummaryData.ProposalDetails.state =  this.paPinList.state;
            }
            // Insured state
            if(this.appollosummaryData.InsurePolicyholderDetails.i_statecode == this.paPinInsuredList.state_code) {
                this.appollosummaryData.InsurePolicyholderDetails.state =  this.paPinInsuredList.state;
            }
            // nominee state
            if(this.appollosummaryData.ProposalDetails.n_stateCode == this.paPinnomineeList.state_code) {
                this.appollosummaryData.ProposalDetails.state =  this.paPinnomineeList.state;
            }
            // proposer District
                for( let i=0; i < this.padistrictList.length; i++) {
                    if(this.appollosummaryData.ProposalDetails.p_district == this.padistrictList[i].district_code) {
                        this.appollosummaryData.ProposalDetails.district_name =  this.padistrictList[i].district_name;
                    }
                }
            // Insured District
            for( let i=0; i < this.paInsureddistrictList.length; i++) {
                if(this.appollosummaryData.InsurePolicyholderDetails.i_district == this.paInsureddistrictList[i].district_code) {
                    this.appollosummaryData.InsurePolicyholderDetails.district_name =  this.paInsureddistrictList[i].district_name;
                }
            }
            // Nominee District
            for( let i=0; i < this.paNomineedistrictList.length; i++) {
                if(this.appollosummaryData.ProposalDetails.n_district == this.paNomineedistrictList[i].district_code) {
                    this.appollosummaryData.ProposalDetails.district_name =  this.paNomineedistrictList[i].district_name;
                }
            }
            // Proposer City
            for( let i=0; i < this.paCityList.length; i++) {
                if(this.appollosummaryData.ProposalDetails.p_towncode == this.paCityList[i].city_code) {
                    this.appollosummaryData.ProposalDetails.city_name =  this.paCityList[i].city_name;
                }
            }
            // Insured City
            for( let i=0; i < this.paCityInsuredList.length; i++) {
                if(this.appollosummaryData.InsurePolicyholderDetails.i_towncode == this.paCityInsuredList[i].city_code) {
                    this.appollosummaryData.InsurePolicyholderDetails.city_name =  this.paCityInsuredList[i].city_name;
                }
            }
            // nominee  City
            for( let i=0; i < this.paCityNomineeList.length; i++) {
                if(this.appollosummaryData.InsurePolicyholderDetails.i_towncode == this.paCityNomineeList[i].city_code) {
                    this.appollosummaryData.InsurePolicyholderDetails.city_name =  this.paCityNomineeList[i].city_name;
                }
            }

            // Marital List
            if(this.appollosummaryData.ProposalDetails.p_maritalstatus == this.paMaritalList.marital_code) {
                this.appollosummaryData.ProposalDetails.marital_status =  this.paMaritalList.marital_status;
            }
            // relationship list in nominee

            for( let i=0; i < this.relationshipListPa.length; i++) {
                if(this.appollosummaryData.ProposalDetails.n_relation == this.relationshipListPa[i].relationship_code) {
                    this.appollosummaryData.ProposalDetails.relationship =  this.relationshipListPa[i].relationship;
                }
            }
            // relationship list in insured
            for( let i=0; i < this.relationshipListPa.length; i++) {
                if(this.appollosummaryData.InsurePolicyholderDetails.i_relation == this.relationshipListPa[i].relationship_code) {
                    this.appollosummaryData.InsurePolicyholderDetails.relationship =  this.relationshipListPa[i].relationship;
                }
            }
            // relationship list in proposal
            for( let i=0; i < this.relationshipListPa.length; i++) {
                if(this.appollosummaryData.ProposalDetails.p_relation == this.relationshipListPa[i].relationship_code) {
                    this.appollosummaryData.ProposalDetails.relationship =  this.relationshipListPa[i].relationship;
                }
            }
            // occupationCode
            for( let i=0; i < this.occupationCode.length; i++) {
                if(this.appollosummaryData.InsurePolicyholderDetails.i_occuption == this.occupationCode[i].occupation_code) {
                    this.appollosummaryData.InsurePolicyholderDetails.occupation =  this.occupationCode[i].occupation;
                }
            }
            // maritalstatus
            for( let i=0; i < this.paMaritalList.length; i++) {
                if(this.appollosummaryData.ProposalDetails.p_maritalstatus == this.paMaritalList[i].marital_code) {
                    this.appollosummaryData.ProposalDetails.marital_status =  this.paMaritalList[i].marital_status;
                }
            }
            // Id proof
            for( let i=0; i < this.paIdProofList.length; i++) {
                if(this.appollosummaryData.ProposalDetails.p_idproof_code == this.paIdProofList[i].proof_code) {
                    this.appollosummaryData.ProposalDetails.proof_name =  this.paIdProofList[i].proof_name;
                }
            }
            // id insure
            for( let i=0; i < this.paIdProofList.length; i++) {
                if(this.appollosummaryData.InsurePolicyholderDetails.i_idproof_code == this.paIdProofList[i].proof_code) {
                    this.appollosummaryData.InsurePolicyholderDetails.proof_name =  this.paIdProofList[i].proof_name;
                }
            }
            // profession  details

            for( let i=0; i < this.professionList.length; i++) {
                if(this.appollosummaryData.InsurePolicyholderDetails.i_procode == this.professionList[i].code) {
                    this.appollosummaryData.InsurePolicyholderDetails.profession =  this.professionList[i].profession;
                }
            }
            this.lastPage.next();

        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }

    public proposalFailure(error) {
        this.settings.loadingSpinner = false;
    }
    public keyEvent(event: any) {
        if (event.charCode !== 0) {
            const pattern = /[0-9a-zA-Z ]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }

}

