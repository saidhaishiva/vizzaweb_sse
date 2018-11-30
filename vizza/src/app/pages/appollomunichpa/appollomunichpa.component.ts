import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {AuthService} from '../../shared/services/auth.service';
import {PersonalAccidentService} from '../../shared/services/personal-accident.service';
import {MatStepper} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {DatePipe} from '@angular/common';

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
  constructor(public proposerpa: FormBuilder, public datepipe: DatePipe, private toastr: ToastrService, public config: ConfigurationService, public authservice: AuthService, public personalservice: PersonalAccidentService,) {
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
          MedicalInformations: '',
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

  }

  ngOnInit() {
      this.relationshipPaProposer();
      this.paIdList();
      this.stateListPa();
      this.paMaritalStatusList();
      this.getAllPremiumDetails = JSON.parse(sessionStorage.personalPremiumLists);

  }
    changeGender() {
        if (this.ProposerPa.controls['proposerPaTitle'].value == 'MR') {
            this.ProposerPa.controls['proposerPaGender'].patchValue('MALE');
        } else {
            this.ProposerPa.controls['proposerPaGender'].patchValue('FEMALE');
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
            if (sessionStorage.proposerAge >= 18) {
                if (this.mobileNumber == '' || this.mobileNumber == 'true'){
                    stepper.next();
                }

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
            this.proposal();
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
    check1(value, type){
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
    previous(value){
      if(value == 'yes'){
          this.prevList = true;
      } else{
          this.prevList = false;
      }
    }

     // proposal creation
    proposal(){
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
                    "BirthDate": "1992-01-04T18:30:00.000Z",
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
                "AnnualIncome": "999999",
                "BirthDate": "1992-01-04T18:30:00.000Z",
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
                    "InceptionDate": "",
                    "EndDate": "",
                    "PreviousInsurerCode": "616301",
                    "PreviousPolicyNumber": "3455",
                    "SumInsured": "4545454",
                    "QualifyingAmount": "",
                    "WaivePeriod": "",
                    "Remarks": ""
                },
                "LifeStyleHabits": {
                    "BeerBottle": "1",
                    "LiquorPeg": "0",
                    "Pouches": "0",
                    "Smoking": "1",
                    "WineGlass": "1"
                },
                "Product": {
                    "Product": {
                        "ClientCode": "PolicyHolder",
                        "ProductCode": "21007",
                        "SumAssured": "300000"
                    }
                },
                "ProfessionCode": "303960",
                "RelationshipCode": "1",
                "TitleCode": "MR"
            },
            "MedicalInformations": "13131"
        }
    }
}
    }
}
