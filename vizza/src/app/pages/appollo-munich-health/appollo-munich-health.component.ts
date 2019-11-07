import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray, FormControl} from '@angular/forms';
import {HealthService} from '../../shared/services/health.service';
import { MatStepper } from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DatePipe } from '@angular/common';
import {AuthService} from '../../shared/services/auth.service';
import {HttpClient} from '@angular/common/http';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {Settings} from '../../app.settings.model';
import { AppSettings } from '../../app.settings';
import {CommonService} from '../../shared/services/common.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Pipe, PipeTransform, Inject, LOCALE_ID } from '@angular/core';
import {ValidationService} from '../../shared/services/validation.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';

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
  selector: 'app-appollo-munich',
  templateUrl: './appollo-munich-health.component.html',
  styleUrls: ['./appollo-munich-health.component.scss'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
})
export class AppolloMunichComponent implements OnInit {
    public proposer: FormGroup;
    public insureArray: FormGroup;
    public nomineeDetails: FormGroup;
    public summary: FormGroup;
    public setDate: any;
    public selectDate: any;
    public stopNext: boolean;
    public buyProductdetails: any;
    public groupName: any;
    public getFamilyDetails: any;
    public enquiryId: any;
    public proposerData: any;
    public relationshipList: any;
    public AppolloStateList: any;
    public AppolloDistrictList: any;
    public AppolloCityList: any;
    public iAppolloDistrictList: any;
    public iAppolloCityList: any;
    public occupationList: any;
    public today: any;
    public declaration: boolean;
    public summaryData: any;
    public InsurePolicyholderDetails: any;
    public ProposalDetails: any;
    public lastStepper: any;
    public questionerData: any;
    public webhost: any;
    public proposalId: any;
    public settings: Settings;
    public pin: any;
    public response: any;
    public proposerCitys: any;
    public areaName: any;
    public title: any;
    public cityTitle: any;
    public rAreaNames: any;
    public rAreaName: any;
    public sumTitle: any;
    public sumAreaName: any;
    public setDateAge: any;
    public dobError: any;
    public proposerAge: any;
    public religareQuestionsList: any;
    public items: any;
    public step: any;
    public questionEmpty: any;
    public proposerInsureData: any;
    public mobileNumber: any;
    public  altmobileNumber: any;
    public insurerData: any;
    public totalInsureDetails: any;
    public getStepper1: any;
    public insurePersons: any;
    public getStepper2: any;
    public getNomineeData: any;
    public index: any;
    public previousinsurance: any;
    public previousInsuranceStatus: any;
    public previousInsuranceStatus1: any;
    public hideQuestion: any;
    public questions_list: any;
    public insuredFormDataRequest: any;
    public sameField: any;
    public insureCity: any;
    public isDisable: any;
    public inputReadonly: any;
    public defaultTrue: boolean;
    public maritalDetail: any;
    public nationalityList: any;
    public ServiceTaxId: any;
    public setStatecode: any;
    public riskData: any;
    public nomineeData: any;
    public nomineeRelationshipList: any;
    public getStepper3: any;
    public rStateId: any;
    public rCityId: any;
    public rCountryId: any;
    public nStateId: any;
    public nCityId: any;
    public nCountryId: any;
    public pos_status: any;
    public requestDetails: any;
    public proposalPArea: any;
    public proposalRArea: any;
    public nomineeAreaList: any;
    public stateCodeId: any;
    public insurID: any;
    public dob: any;
    public minDate: any;
    public maxDate: any;
    public RediretUrlLink: any;
    public stateCode: any;
    public requestClientDetails: any;
    public nomineeAppolloDistrictList: any;
    public nomineeAppolloCityLis: any;
    public proposerProofNum: any;
    public smokingStatus: boolean;
    public previousInsureList: any;
    public proffessionList: any;
    public titleCodeList: any;
    public iAppolloDistrictName: any;
    public iAppolloCityName: any;
    public createdDate: any;
    public previousDetails: boolean;
    public dobErrorInsure: any;
    public dobErrorStartDate: any;
    public insurepersonstype: any;
    public validateprvious: boolean;
    public titleValidation: boolean;
    public IdProofListss: any;
    public agecal: any;
    public agevalidation: any;
    public arr: any;
    public getDays: any;
    public getAge: any;
    public readonly: any;
    public nomineeList: any;
    public appolloQuestionsList: any;
    public proposerList: any;
    public sameRelationship : any;
    public proposerFormData : any;
    public insuredFormData : any;
    public nomineeFormData : any;
    public Prospect : any;
    currentStep: any;
    proofValid: any;
    proposal_Id: any;
    status: any;
    stepperindex: any;
    public idlistValid: boolean;
    public nomineesame: boolean;
    public appolloMobileTrue0: boolean;
    public appolloMobileTrue1: boolean;
    public appolloMobileTrue2: boolean;
    public appolloMobileTrue3: boolean;
    public payLaterr: boolean;
    public appolloMobileTrue4: boolean;
    public proposallst: boolean;


    constructor(public proposalservice: HealthService,public route: ActivatedRoute, public validation: ValidationService, public datepipe: DatePipe, private toastr: ToastrService, public appSettings: AppSettings, public dialog: MatDialog,public router: Router,
              public config: ConfigurationService, public common: CommonService, public fb: FormBuilder, public auth: AuthService, public http: HttpClient, @Inject(LOCALE_ID) private locale: string) {
      this.stepperindex = 0;
      this.route.params.forEach((params) => {
          if(params.stepper == true || params.stepper == 'true') {
              this.stepperindex = 4;
              if (sessionStorage.summaryData != '' && sessionStorage.summaryData != undefined) {
                  this.summaryData = JSON.parse(sessionStorage.summaryData);
                  this.RediretUrlLink = this.summaryData.PaymentURL;
                  this.proposalId = this.summaryData.ProposalId;
                  this.proposerFormData = JSON.parse(sessionStorage.proposerFormData);
                  this.nomineeFormData = JSON.parse(sessionStorage.nomineeFormData);
                  this.insuredFormData = JSON.parse(sessionStorage.insuredFormData);
                  sessionStorage.appollo_health_proposal_id = this.proposalId;
              }
          }
              this.status = params.stepper;
              this.proposal_Id = params.proposalId;
              if(this.proposal_Id != '' || this.proposal_Id != undefined ){
                  this.payLaterr = true;
                  console.log(this.proposal_Id, 'this.proposalId');
                  console.log(this.status, 'this.proposalId');
                  this.getBackRequest();
              }
              if(this.proposal_Id == undefined || this.proposal_Id == '') {
                  this.payLaterr = false;

              }

      });
      this.currentStep = this.stepperindex;

      const minDate = new Date();
      this.minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
      let today  = new Date();
      this.today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      // this.minDate = this.selectDate;
      this.arr = [];
        this.nomineesame = false;

      this.stopNext = false;
      this.idlistValid = false;
      this.hideQuestion = false;
      this.declaration = false;
      this.settings = this.appSettings.settings;
      this.settings.HomeSidenavUserBlock = false;
      this.settings.sidenavIsOpened = false;
      this.settings.sidenavIsPinned = false;
      this.webhost = this.config.getimgUrl();
      this.selectDate = '';
      this.proposalId = 0;
      this.step = 0;
      this.mobileNumber = 'true';
      this.inputReadonly = false;
      this.defaultTrue = true;
      this.sameField = false;
      this.isDisable = false;
      this.insureCity = false;
      this.previousDetails = false;
      this.titleValidation = true;
      this.proposerInsureData = [];
      this.totalInsureDetails = [];
      this.insuredFormDataRequest = [];
      this.questions_list = [];
    this.validateprvious = false;
        this.proofValid = true;
        this.appolloMobileTrue0 = false;
        this.appolloMobileTrue1 = true;
        this.appolloMobileTrue2 = true;
        this.appolloMobileTrue3 = true;
        this.appolloMobileTrue4 = true;


        this.proposer = this.fb.group({
          proposerTitle: ['', Validators.required],
            proposerTitleName: '',
          proposerFirstname: ['', Validators.required],
          proposerMidname: '',
          proposerLastname: ['', Validators.required],
          proposerGender: ['', Validators.compose([Validators.required])],
          proposerDob: ['', Validators.compose([Validators.required])],
          proposerEmail: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
          proposerMobile: ['', Validators.compose([Validators.pattern('[6789][0-9]{9}')])],
          maritalStatus: ['', Validators.required],
          proposerrelationship: '1',
          proposerIdProof: '',
          proposerIdProofName: '',
          proposerIdProofIdP: '',
          proposerPan: ['', Validators.compose([ Validators.minLength(10)])],
          proposerDriving: '',
          proposerPassport: '',
          proposerVoter: '',
          proposerGst: ['', Validators.compose([Validators.minLength(15)])],
          proposerAddress: ['', Validators.required],
          proposerAddress2: '',
          proposerAddress3: '',
          nationality: 'IN',
          proposerPincode: ['', Validators.required],
          proposerCity: ['', Validators.required],
          proposerCityName: '',
          proposerCountry: 'IN',
          proposerState: ['', Validators.required],
          proposerDistrict: '',
          proposerDistrictName: '',
          proposerCityIdP: '',
          proposerStateIdP: '',
          proposerCountryIdP: '',
          proposerDistrictIdP: '',
          sameAsProposerAddress: '',
          MedicalInformations: '',
          rolecd: 'PROPOSER',
          type: '',
            maritalStatusName:''

      });
      this.nomineeDetails = this.fb.group({
          nomineeTitle: '',
          nomineeTitleName: '',
          nomineeName: '',
          nomineeAddress: '',
          nomineeAddress2: '',
          nomineeAddress3: '',
          nomineePincode: '',
          nomineeCity: '',
          nomineeCityName: '',
          nomineeCityId: '',
          nomineeState: '',
          nomineeStateId: '',
          nomineeCountryId: '',
          nomineeCountry: 'IN',
          nationality: 'IN',
          nomineeDistrict: '',
          nomineeDistrictName: '',
          nomineeDistrictId: '',
          nomineeRelationship: '',
          nomineeRelationshipName: '',
          sameAsProposerAddress: ''

      });
      this.TitleCodeStatus();


  }
    ngOnInit() {
        if (this.payLaterr == true) {
            this.stepperindex = 4;
            console.log(this.payLaterr, 'this.payLaterrolll');
        } else {
            this.buyProductdetails = JSON.parse(sessionStorage.buyProductdetails);
            this.enquiryId = sessionStorage.enquiryId;
            this.groupName = sessionStorage.groupName;
            this.getFamilyDetails = JSON.parse(sessionStorage.changedTabDetails);
            this.insurePersons = this.getFamilyDetails.family_members;
            // for(let i =0; i< this.insurePersons.length; i++){
            //     this.insurepersonstype = this.insurePersons[i].type;
            // }
            this.setRelationship();
            // this.setNomineeRelationship();
            this.maritalStatus();
            this.IdProofList();
            this.AppolloState();
            this.setOccupationList();
            this.getPreviousInsure();
            this.getProffession();
            this.questionsList();
            this.insureArray = this.fb.group({
                items: this.fb.array([])
            });
            for (let i = 0; i < this.getFamilyDetails.family_members.length; i++) {
                this.items = this.insureArray.get('items') as FormArray;
                this.items.push(this.initItemRows());
                this.insureArray['controls'].items['controls'][i]['controls'].type.setValue(this.getFamilyDetails.family_members[i].type);
            }
            this.sessionData();

            this.insureArray['controls'].items['controls'][0]['controls'].set_validator.patchValue(true);

            if (this.getFamilyDetails.family_members.length > 1) {
                if (this.insureArray['controls'].items['controls'][1]['controls'].type.value == 'Spouse') {
                    this.insureArray['controls'].items['controls'][1]['controls'].set_validator.patchValue(true);
                }
            }
        }
    }
    sessionData() {
        if (sessionStorage.AppolloDistrictList != '' && sessionStorage.AppolloDistrictList != undefined) {
            this.AppolloDistrictList = JSON.parse(sessionStorage.AppolloDistrictList);
        }

        if (sessionStorage.iAppolloDistrictList != '' && sessionStorage.iAppolloDistrictList != undefined) {
            this.iAppolloDistrictList = JSON.parse(sessionStorage.iAppolloDistrictList);
        }
        if (sessionStorage.AppolloCityList != '' && sessionStorage.AppolloCityList != undefined) {
            this.AppolloCityList = JSON.parse(sessionStorage.AppolloCityList);
        }
        if (sessionStorage.iAppolloCityList != '' && sessionStorage.iAppolloCityList != undefined) {
            this.iAppolloCityList = JSON.parse(sessionStorage.iAppolloCityList);
        }
        if (sessionStorage.nomineeAppolloCityLis != '' && sessionStorage.nomineeAppolloCityLis != undefined) {
            this.nomineeAppolloCityLis = JSON.parse(sessionStorage.nomineeAppolloCityLis);
        }
        if (sessionStorage.nomineeAppolloDistrictList != '' && sessionStorage.nomineeAppolloDistrictList != undefined) {
            this.nomineeAppolloDistrictList = JSON.parse(sessionStorage.nomineeAppolloDistrictList);
        }

        if (sessionStorage.stepper1Details != '' && sessionStorage.stepper1Details != undefined) {
            this.getStepper1 = JSON.parse(sessionStorage.stepper1Details);
            this.proposer = this.fb.group({
                proposerTitle: this.getStepper1.proposerTitle,
                proposerTitleName: this.getStepper1.proposerTitleName,
                proposerFirstname: this.getStepper1.proposerFirstname,
                proposerLastname: this.getStepper1.proposerLastname,
                proposerMidname: this.getStepper1.proposerMidname,
                maritalStatus: this.getStepper1.maritalStatus,
                proposerDob: this.datepipe.transform(this.getStepper1.proposerDob, 'y-MM-dd'),
                proposerrelationship: this.getStepper1.proposerrelationship,
                sameAsProposer: this.getStepper1.sameAsProposer,
                proposerGender: this.getStepper1.proposerGender,
                proposerAddress: this.getStepper1.proposerAddress,
                proposerAddress2: this.getStepper1.proposerAddress2,
                proposerAddress3: this.getStepper1.proposerAddress3,
                nationality: this.getStepper1.nationality,
                proposerPincode: this.getStepper1.proposerPincode,
                maritalStatusName: this.getStepper1.maritalStatusName,
                proposerIdProof: this.getStepper1.proposerIdProof,
                proposerIdProofName: this.getStepper1.proposerIdProofName,
                proposerIdProofIdP: this.getStepper1.proposerIdProofIdP,
                proposerPan: this.getStepper1.proposerPan,
                proposerPassport: this.getStepper1.proposerPassport,
                proposerVoter: this.getStepper1.proposerVoter,
                proposerGst: this.getStepper1.proposerGst,
                proposerDriving: this.getStepper1.proposerDriving,
                MedicalInformations: this.getStepper1.MedicalInformations,
                proposerCity: this.getStepper1.proposerCity,
                proposerCityName: this.getStepper1.proposerCityName,
                proposerState: this.getStepper1.proposerState,
                proposerCountry: this.getStepper1.proposerCountry,
                proposerCityIdP: this.getStepper1.proposerCityIdP,
                proposerStateIdP: this.getStepper1.proposerStateIdP,
                proposerCountryIdP: this.getStepper1.proposerCountryIdP,
                proposerCityIdR: this.getStepper1.proposerCityIdR,
                proposerStateIdR: this.getStepper1.proposerStateIdR,
                proposerCountryIdR: this.getStepper1.proposerCountryIdR,
                proposerDistrictIdP: this.getStepper1.proposerDistrictIdP,
                proposerDistrict: this.getStepper1.proposerDistrict,
                proposerDistrictName: this.getStepper1.proposerDistrictName,
                proposerEmail: this.getStepper1.proposerEmail,
                proposerMobile: this.getStepper1.proposerMobile,
                rolecd: this.getStepper1.rolecd,
                relationshipcd: this.getStepper1.relationshipcd,
                sameas: this.getStepper1.sameas,
                sameAsProposerAddress: this.getStepper1.sameAsProposerAddress,
            });
            let age = this.ageCalculate(this.datepipe.transform(this.getStepper1.proposerDob, 'y-MM-dd'));
            sessionStorage.proposerAge = age;
        }

        if (sessionStorage.stepper2Details != '' && sessionStorage.stepper2Details != undefined) {
            this.getStepper2 = JSON.parse(sessionStorage.stepper2Details);
            for (let i = 0; i < this.getStepper2.items.length; i++) {
                this.insureArray['controls'].items['controls'][i]['controls'].proposerTitle.patchValue(this.getStepper2.items[i].proposerTitle);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerTitleName.patchValue(this.getStepper2.items[i].proposerTitleName);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerFirstname.patchValue(this.getStepper2.items[i].proposerFirstname);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerGender.patchValue(this.getStepper2.items[i].proposerGender);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerLastname.patchValue(this.getStepper2.items[i].proposerLastname);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerMobile.patchValue(this.getStepper2.items[i].proposerMobile);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerDob.patchValue(this.datepipe.transform(this.getStepper2.items[i].proposerDob, 'y-MM-dd'));
                this.insureArray['controls'].items['controls'][i]['controls'].proposerAge.patchValue(this.getStepper2.items[i].proposerAge);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerrelationship.patchValue(this.getStepper2.items[i].proposerrelationship);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerrelationshipName.patchValue(this.getStepper2.items[i].proposerrelationshipName);
                this.insureArray['controls'].items['controls'][i]['controls'].maritalStatus.patchValue(this.getStepper2.items[i].maritalStatus);
                this.insureArray['controls'].items['controls'][i]['controls'].maritalStatusName.patchValue(this.getStepper2.items[i].maritalStatusName);
                this.insureArray['controls'].items['controls'][i]['controls'].sameas.patchValue(this.getStepper2.items[i].sameas);
                this.insureArray['controls'].items['controls'][i]['controls'].sameAsProposer.patchValue(this.getStepper2.items[i].sameAsProposer);
                this.insureArray['controls'].items['controls'][i]['controls'].rolecd.patchValue(this.getStepper2.items[i].rolecd);
                this.insureArray['controls'].items['controls'][i]['controls'].SumInsured.patchValue(this.getStepper2.items[i].SumInsured);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerAnnualIncome.patchValue(this.getStepper2.items[i].proposerAnnualIncome);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerFamilySize.patchValue(this.getStepper2.items[i].proposerFamilySize);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerHeight.patchValue(this.getStepper2.items[i].proposerHeight);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerWeight.patchValue(this.getStepper2.items[i].proposerWeight);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerEmail.patchValue(this.getStepper2.items[i].proposerEmail);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerIdProof.patchValue(this.getStepper2.items[i].proposerIdProof);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerIdProofName.patchValue(this.getStepper2.items[i].proposerIdProofName);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerIdProofIdP.patchValue(this.getStepper2.items[i].proposerIdProofIdP);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerPan.patchValue(this.getStepper2.items[i].proposerPan);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerDriving.patchValue(this.getStepper2.items[i].proposerDriving);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerPassport.patchValue(this.getStepper2.items[i].proposerPassport);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerVoter.patchValue(this.getStepper2.items[i].proposerVoter);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerGst.patchValue(this.getStepper2.items[i].proposerGst);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerAddress.patchValue(this.getStepper2.items[i].proposerAddress);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerAddress2.patchValue(this.getStepper2.items[i].proposerAddress2);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerAddress3.patchValue(this.getStepper2.items[i].proposerAddress3);
                this.insureArray['controls'].items['controls'][i]['controls'].nationality.patchValue(this.getStepper2.items[i].nationality);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerPincode.patchValue(this.getStepper2.items[i].proposerPincode);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerCountry.patchValue(this.getStepper2.items[i].proposerCountry);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerState.patchValue(this.getStepper2.items[i].proposerState);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerDistrict.patchValue(this.getStepper2.items[i].proposerDistrict);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerCity.patchValue(this.getStepper2.items[i].proposerCity);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerCityName.patchValue(this.getStepper2.items[i].proposerCityName);
                this.insureArray['controls'].items['controls'][i]['controls'].personalHabit.patchValue(this.getStepper2.items[i].personalHabit);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerCityIdP.patchValue(this.getStepper2.items[i].proposerCityIdP);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerStateIdP.patchValue(this.getStepper2.items[i].proposerStateIdP);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerCountryIdP.patchValue(this.getStepper2.items[i].proposerCountryIdP);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerDistrictIdP.patchValue(this.getStepper2.items[i].proposerDistrictIdP == undefined? '' : this.getStepper2.items[i].proposerDistrictIdP);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerAnnualIncome.patchValue(this.getStepper2.items[i].proposerAnnualIncome);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerFamilySize.patchValue(this.getStepper2.items[i].proposerFamilySize);
                this.insureArray['controls'].items['controls'][i]['controls'].LiquorPeg.patchValue(this.getStepper2.items[i].LiquorPeg);
                this.insureArray['controls'].items['controls'][i]['controls'].Smoking.patchValue(this.getStepper2.items[i].Smoking);
                this.insureArray['controls'].items['controls'][i]['controls'].WineGlass.patchValue(this.getStepper2.items[i].WineGlass);
                this.insureArray['controls'].items['controls'][i]['controls'].BeerBottle.patchValue(this.getStepper2.items[i].BeerBottle);
                this.insureArray['controls'].items['controls'][i]['controls'].Pouches.patchValue(this.getStepper2.items[i].Pouches);
                this.insureArray['controls'].items['controls'][i]['controls'].PolicyStartDate.patchValue(this.datepipe.transform(this.getStepper2.items[i].PolicyStartDate, 'y-MM-dd'));
                this.insureArray['controls'].items['controls'][i]['controls'].PolicyEndDate.patchValue(this.datepipe.transform(this.getStepper2.items[i].PolicyEndDate, 'y-MM-dd'));
                this.insureArray['controls'].items['controls'][i]['controls'].PreviousInsurer.patchValue(this.getStepper2.items[i].PreviousInsurer);
                this.insureArray['controls'].items['controls'][i]['controls'].PreviousPolicyNumber.patchValue(this.getStepper2.items[i].PreviousPolicyNumber);
                this.insureArray['controls'].items['controls'][i]['controls'].SumInsured.patchValue(this.getStepper2.items[i].SumInsured);
                this.insureArray['controls'].items['controls'][i]['controls'].QualifyingAmount.patchValue(this.getStepper2.items[i].QualifyingAmount);
                this.insureArray['controls'].items['controls'][i]['controls'].WaivePeriod.patchValue(this.getStepper2.items[i].WaivePeriod);
                this.insureArray['controls'].items['controls'][i]['controls'].Remarks.patchValue(this.getStepper2.items[i].Remarks);
                this.insureArray['controls'].items['controls'][i]['controls'].Proposeroccupation.patchValue(this.getStepper2.items[i].Proposeroccupation);
                this.insureArray['controls'].items['controls'][i]['controls'].ProposeroccupationName.patchValue(this.getStepper2.items[i].ProposeroccupationName);
                this.insureArray['controls'].items['controls'][i]['controls'].SmokingStatus.patchValue(this.getStepper2.items[i].SmokingStatus);
                this.insureArray['controls'].items['controls'][i]['controls'].LiquorPegStatus.patchValue(this.getStepper2.items[i].LiquorPegStatus);
                this.insureArray['controls'].items['controls'][i]['controls'].WineGlassStatus.patchValue(this.getStepper2.items[i].WineGlassStatus);
                this.insureArray['controls'].items['controls'][i]['controls'].PouchesStatus.patchValue(this.getStepper2.items[i].PouchesStatus);
                this.insureArray['controls'].items['controls'][i]['controls'].BeerBottleStatus.patchValue(this.getStepper2.items[i].BeerBottleStatus);
                this.insureArray['controls'].items['controls'][i]['controls'].previousInsurerStatus.patchValue(this.getStepper2.items[i].previousInsurerStatus);
                this.insureArray['controls'].items['controls'][i]['controls'].ProffessionList.patchValue(this.getStepper2.items[i].ProffessionList);
                this.insureArray['controls'].items['controls'][i]['controls'].ProffessionListName.patchValue(this.getStepper2.items[i].ProffessionListName);
                this.insureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue(this.getStepper2.items[i].insurerDobValidError);
                this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue(this.getStepper2.items[i].insurerDobError);
                this.insureArray['controls'].items['controls'][i]['controls'].dobErrorStartDate.patchValue(this.getStepper2.items[i].dobErrorStartDate);
                this.insureArray['controls'].items['controls'][i]['controls'].insurerIdProofError.patchValue(this.getStepper2.items[i].insurerIdProofError);
                this.insureArray['controls'].items['controls'][i]['controls'].ins_days.patchValue(this.getStepper2.items[i].ins_days);
                this.insureArray['controls'].items['controls'][i]['controls'].ins_age.patchValue(this.getStepper2.items[i].ins_age);
                this.insureArray['controls'].items['controls'][i]['controls'].sameasreadonly.patchValue(this.getStepper2.items[i].sameasreadonly);
                this.insureArray['controls'].items['controls'][i]['controls'].cityHide.patchValue(true);
                this.insureArray['controls'].items['controls'][i]['controls'].stateHide.patchValue(true);
            }


        }

        for (let i = 0; i < this.insurePersons.length; i++) {
            if (this.insureArray['controls'].items['controls'][i]['controls'].previousInsurerStatus.value == "Yes") {

                this.items.at(i).controls.PreviousPolicyNumber.setValidators([Validators.required]);
                this.items.at(i).controls.PreviousInsurer.setValidators([Validators.required]);
                this.items.at(i).controls.SumInsured.setValidators([Validators.required]);
            } else if(this.insureArray['controls'].items['controls'][i]['controls'].previousInsurerStatus.value == "No"){

                this.items.at(i).controls.PreviousPolicyNumber.setValidators(null);
                this.items.at(i).controls.PreviousInsurer.setValidators(null);
                this.items.at(i).controls.SumInsured.setValidators(null);
            }
            this.items.at(i).controls.PreviousPolicyNumber.updateValueAndValidity();
            this.items.at(i).controls.PreviousInsurer.updateValueAndValidity();
            this.items.at(i).controls.SumInsured.updateValueAndValidity();
        }
        if (sessionStorage.titleValidation != '' && sessionStorage.titleValidation != undefined) {
            this.titleValidation = sessionStorage.titleValidation;
            // if ( this.titleValidation == false){}
        }
        if (sessionStorage.nomineeData != '' && sessionStorage.nomineeData != undefined) {
            this.getNomineeData = JSON.parse(sessionStorage.nomineeData);
            this.nomineeDetails = this.fb.group({
                nomineeName: this.getNomineeData.nomineeName,
                nomineeRelationship: this.getNomineeData.nomineeRelationship,
                sameAsProposerAddress: this.getNomineeData.sameAsProposerAddress,
                nomineeOtherRelationship: this.getNomineeData.nomineeOtherRelationship,
                nomineeAddress: this.getNomineeData.nomineeAddress,
                nomineeAddress2: this.getNomineeData.nomineeAddress2,
                nomineeAddress3: this.getNomineeData.nomineeAddress3,
                nomineePincode: this.getNomineeData.nomineePincode,
                nomineeCountry: this.getNomineeData.nomineeCountry,
                nomineeCity: this.getNomineeData.nomineeCity,
                nomineeCityName: this.getNomineeData.nomineeCityName,
                nomineeState: this.getNomineeData.nomineeState,
                nomineeCountryId: this.getNomineeData.nomineeCountryId,
                nomineeDistrictId: this.getNomineeData.nomineeDistrictId,
                nomineeCityId: this.getNomineeData.nomineeCityId,
                nomineeStateId: this.getNomineeData.nomineeStateId,
                nomineeDistrict: this.getNomineeData.nomineeDistrict,
                nomineeDistrictName: this.getNomineeData.nomineeDistrictName,
                nomineeRelationshipName: this.getNomineeData.nomineeRelationshipName,
                nomineeTitle: this.getNomineeData.nomineeTitle,
                nomineeTitleName: this.getNomineeData.nomineeTitleName,
                nomineeDob: this.getNomineeData.nomineeDob,
            });
        }

        if (sessionStorage.appollo_health_proposal_id != '' && sessionStorage.appollo_health_proposal_id != undefined) {
            this.proposalId = sessionStorage.appollo_health_proposal_id;
        }
    }

    nameValidate(event: any){
        this.validation.nameValidate(event);
    }
    // Dob validation
    dobValidate(event: any){
        this.validation.dobValidate(event);
    }
    // Number validation
    numberValidate(event: any){
        this.validation.numberValidate(event);
    }
    idValidate(event: any){
        this.validation.idValidate(event);
    }
    space(event: any){
        this.validation.space(event);
    }
    canDeactivate() {
        return this.proposalId;
    }
    changeGender() {
        if (this.proposer.controls['proposerTitle'].value == 'MR'|| this.proposer.controls['proposerTitle'].value == 'MASTER'){
            this.proposer.controls['proposerGender'].patchValue('Male');
        } else {
            this.proposer.controls['proposerGender'].patchValue('Female');
        }

    }
    insureChangeGender(index) {

        if (this.insureArray['controls'].items['controls'][index]['controls'].proposerTitle.value == 'MR' ||
            this.insureArray['controls'].items['controls'][index]['controls'].proposerTitle.value == 'MASTER') {
            this.insureArray['controls'].items['controls'][index]['controls'].proposerGender.patchValue('Male');
            this.titleValidation = true;
        } else if (this.insureArray['controls'].items['controls'][index]['controls'].proposerTitle.value == "BABY" || this.insureArray['controls'].items['controls'][index]['controls'].proposerTitle.value == "MRS" || this.insureArray['controls'].items['controls'][index]['controls'].proposerTitle.value == "MISS" ) {
            this.insureArray['controls'].items['controls'][index]['controls'].proposerGender.patchValue('Female');
            this.titleValidation = true;

        }
            // this.insureArray['controls'].items['controls'][index]['controls'].insurerDobError.value = '';
        // } else {
        //     // if (this.insureArray['controls'].items['controls'][index]['controls'].proposerTitle.value == 'MRS' ||
        //     //     this.insureArray['controls'].items['controls'][index]['controls'].proposerTitle.value == 'BABY' || this.insureArray['controls'].items['controls'][index]['controls'].proposerTitle.value == 'MISS')
        //         this.insureArray['controls'].items['controls'][index]['controls'].proposerGender.patchValue('Female');
        //     this.titleValidation = true;
        // }

        sessionStorage.titleValidation = this.titleValidation;


    }




    setStep(index) {
        this.step = index;
    }

    nextStep() {
        this.step++;
    }

    prevStep() {
        this.step--;
    }

    initItemRows() {
        return this.fb.group(
            {
                rolecd: 'PRIMARY',
                proposerTitle: '',
                proposerTitleName: '',
                proposerFirstname: '',
                proposerLastname: '',
                proposerMidname: '',
                proposerDob: '',
                proposerGender: '',
                proposerEmail: ['', Validators.compose([Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
                proposerMobile: ['', Validators.compose([Validators.pattern('[6789][0-9]{9}')])],
                proposerAge: '',
                maritalStatus: '',
                maritalStatusName: '',
                proposerIdProof: '',
                proposerIdProofName: '',
                proposerIdProofIdP: '',
                proposerPan: ['', Validators.compose([ Validators.minLength(10)])],
                proposerDriving: '',
                proposerPassport: '',
                proposerVoter: ['', Validators.compose([ Validators.minLength(10)])],
                proposerGst: ['', Validators.compose([Validators.minLength(15)])],
                proposerAddress: '',
                proposerAddress2: '',
                proposerAddress3: '',
                nationality: 'IN',
                proposerPincode: '',
                proposerCity: '',
                proposerCityName: '',
                proposerCountry: 'IN',
                proposerState: '',
                proposerDistrict: '',
                proposerDistrictName: '',
                proposerCityIdP: '',
                proposerStateIdP: '',
                proposerCountryIdP: '',
                proposerDistrictIdP: '',
                proposerAnnualIncome: '',
                proposerFamilySize: ['', Validators.required],
                proposerHeight: '',
                proposerWeight: '',
                LiquorPeg: 0,
                LiquorPegStatus: '',
                Smoking: 0,
                SmokingStatus: '',
                WineGlass: 0,
                WineGlassStatus: '',
                BeerBottle: 0,
                BeerBottleStatus: '',
                Pouches: 0,
                PouchesStatus: '',
                PolicyStartDate: '',
                PolicyEndDate: '',
                previousInsurerStatus: 'No',
                PreviousInsurer: '',
                PreviousPolicyNumber: '',
                SumInsured: '',
                QualifyingAmount: '',
                ProffessionList: '',
                ProffessionListName: '',
                WaivePeriod: '',
                Remarks: '',
                Proposeroccupation: '',
                ProposeroccupationName: '',
                proposerrelationship: '',
                proposerrelationshipName: '',
                sameAsProposer: false,
                sameas: false,
                type: '',
                cityHide: false,
                stateHide: false,
                pCityHide: '',
                insurerDobError: '',
                insurerDobValidError: '',
                dobErrorStartDate: '',
                insurerIdProofError: '',
                ins_days: '',
                ins_age: '',
                sameasreadonly:false,
                set_validator: false,
                personalHabit: false
            }
        );
    }




    questionsList() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.proposalservice.getAppolloQuestions(data).subscribe(
            (successData) => {
                this.appolloQuestionsSuccess(successData);
            },
            (error) => {
                this.appolloQuestionsFailure(error);
            }
        );

    }

    public appolloQuestionsSuccess(successData) {
        this.appolloQuestionsList = successData.ResponseObject;
        for (let i = 0; i < this.appolloQuestionsList.length; i++) {
            this.appolloQuestionsList[i].mStatus = 'No';
            this.appolloQuestionsList[i].checked = false;
        }
    }


    public appolloQuestionsFailure(error) {
    }

    questionYes(index, event: any) {
        console.log(event, 'click');
        console.log(event.target.firstChild, 'target..');

        if (event.target.firstChild.value=='on' && event.target.firstChild != null) {
            // alert('inn');
            this.appolloQuestionsList[index].mStatus = 'Yes';

        } else if(event.target.firstChild == null){
            this.appolloQuestionsList[index].mStatus = 'No';
        }
    }


    pInsureStatus(title: any, id){
      if(title.value == 'Yes') {
        this.previousDetails = true;
        this.validateprvious = true;
          this.items.at(id).controls.PreviousPolicyNumber.setValidators([Validators.required]);
          this.items.at(id).controls.PreviousInsurer.setValidators([Validators.required]);
          this.items.at(id).controls.SumInsured.setValidators([Validators.required]);
      } else {
          this.previousDetails = false;
          this.validateprvious = false;
          this.insureArray['controls'].items['controls'][id]['controls'].PreviousPolicyNumber.patchValue('');
          this.insureArray['controls'].items['controls'][id]['controls'].PreviousInsurer.patchValue('');
          this.insureArray['controls'].items['controls'][id]['controls'].SumInsured.patchValue('');
          this.insureArray['controls'].items['controls'][id]['controls'].PolicyStartDate.patchValue('');
          this.insureArray['controls'].items['controls'][id]['controls'].PolicyEndDate.patchValue('');
          this.insureArray['controls'].items['controls'][id]['controls'].WaivePeriod.patchValue('');
          this.insureArray['controls'].items['controls'][id]['controls'].QualifyingAmount.patchValue('');
          this.insureArray['controls'].items['controls'][id]['controls'].Remarks.patchValue('');
          this.items.at(id).controls.PreviousPolicyNumber.setValidators(null);
          this.items.at(id).controls.PreviousInsurer.setValidators(null);
          this.items.at(id).controls.SumInsured.setValidators(null);
      }
        this.items.at(id).controls.PreviousPolicyNumber.updateValueAndValidity();
        this.items.at(id).controls.PreviousInsurer.updateValueAndValidity();
        this.items.at(id).controls.SumInsured.updateValueAndValidity();



}


    changeIdproof(title, index){
        if(title == 'proposer') {
            this.proofValid = true;
            this.proposer.controls['proposerIdProofIdP'].patchValue('');
            this.proposer.controls['proposerDriving'].patchValue('');
            this.proposer.controls['proposerPassport'].patchValue('');
            this.proposer.controls['proposerVoter'].patchValue('');
            this.proposer.controls['proposerPan'].patchValue('');
            // if(this.proposer.controls['proposerIdProof'].value != '') {
            //     this.proposer.controls['proposerDriving'].patchValue('');
            //     this.proposer.controls['proposerPassport'].patchValue('');
            //     this.proposer.controls['proposerVoter'].patchValue('');
            //     this.proposer.controls['proposerPan'].patchValue('');
            // } else {
            //     this.proposer.controls['proposerDriving'].patchValue('');
            //     this.proposer.controls['proposerPassport'].patchValue('');
            //     this.proposer.controls['proposerVoter'].patchValue('');
            //     this.proposer.controls['proposerPan'].patchValue('');
            // }

        } else if(title == 'insurer'){
            this.insureArray['controls'].items['controls'][index]['controls'].proposerIdProofIdP.patchValue('');
            this.insureArray['controls'].items['controls'][index]['controls'].proposerDriving.patchValue('');
            this.insureArray['controls'].items['controls'][index]['controls'].proposerPassport.patchValue('');
            this.insureArray['controls'].items['controls'][index]['controls'].proposerVoter.patchValue('');
            this.insureArray['controls'].items['controls'][index]['controls'].proposerPan.patchValue('');
            if(this.insureArray['controls'].items['controls'][index]['controls'].proposerIdProof.value != '') {
                // if(this.insureArray['controls'].items['controls'][index]['controls'].proposerIdProof.value == 'IDNO2') {
                //     if(this.insureArray['controls'].items['controls'][index]['controls'].proposerPan.value == '') {
                //         this.insureArray['controls'].items['controls'][index]['controls'].insurerIdProofError.patchValue('PAN Number is required');
                //     } else {
                //         this.insureArray['controls'].items['controls'][index]['controls'].insurerIdProofError.patchValue('');
                //     }
                //
                // } else if(this.insureArray['controls'].items['controls'][index]['controls'].proposerIdProof.value == 'IDNO3') {
                //     if(this.insureArray['controls'].items['controls'][index]['controls'].proposerDriving.value == '') {
                //         this.insureArray['controls'].items['controls'][index]['controls'].insurerIdProofError.patchValue('Driving License is required');
                //     } else {
                //         this.insureArray['controls'].items['controls'][index]['controls'].insurerIdProofError.patchValue('');
                //     }
                // } else if(this.insureArray['controls'].items['controls'][index]['controls'].proposerIdProof.value == 'IDNO1') {
                //     if(this.insureArray['controls'].items['controls'][index]['controls'].proposerPassport.value == '') {
                //         this.insureArray['controls'].items['controls'][index]['controls'].insurerIdProofError.patchValue('Passport is required');
                //     } else {
                //         this.insureArray['controls'].items['controls'][index]['controls'].insurerIdProofError.patchValue('');
                //     }
                // } else if(this.insureArray['controls'].items['controls'][index]['controls'].proposerIdProof.value == 'IDNO4') {
                //     if(this.insureArray['controls'].items['controls'][index]['controls'].proposerVoter.value == '') {
                //         this.insureArray['controls'].items['controls'][index]['controls'].insurerIdProofError.patchValue('Voter Id is required');
                //     } else {
                //         this.insureArray['controls'].items['controls'][index]['controls'].insurerIdProofError.patchValue('');
                //     }
                // } else {
                //         this.insureArray['controls'].items['controls'][index]['controls'].insurerIdProofError.patchValue('');
                //  }

            } else {
                this.insureArray['controls'].items['controls'][index]['controls'].insurerIdProofError.patchValue('');


            }

        }
    }
    // insured page
    changeinsuredidList(index){
    this.insureArray['controls'].items['controls'][index]['controls'].proposerIdProofName.patchValue(this.IdProofListss[this.insureArray['controls'].items['controls'][index]['controls'].proposerIdProof.value]);
    }
    changeProffessionList(index){
    this.insureArray['controls'].items['controls'][index]['controls'].ProffessionListName.patchValue(this.proffessionList[this.insureArray['controls'].items['controls'][index]['controls'].ProffessionList.value]);
    }
    changeRelationShipList(index){
        this.insureArray['controls'].items['controls'][index]['controls'].proposerrelationshipName.patchValue(this.relationshipList[this.insureArray['controls'].items['controls'][index]['controls'].proposerrelationship.value]);
    }
    changeOccupationList(index){
        this.insureArray['controls'].items['controls'][index]['controls'].ProposeroccupationName.patchValue(this.occupationList[this.insureArray['controls'].items['controls'][index]['controls'].Proposeroccupation.value]);
    }
    changeInsuredStateList(index){
        this.insureArray['controls'].items['controls'][index]['controls'].proposerDistrictName.patchValue(this.iAppolloDistrictList[this.insureArray['controls'].items['controls'][index]['controls'].proposerDistrict.value]);
    }
    changeInsuredCityList(index){
        this.insureArray['controls'].items['controls'][index]['controls'].proposerCityName.patchValue(this.iAppolloCityList[this.insureArray['controls'].items['controls'][index]['controls'].proposerCity.value]);
    }
    changeMaritalList(index){
        this.insureArray['controls'].items['controls'][index]['controls'].maritalStatusName.patchValue(this.maritalDetail[this.insureArray['controls'].items['controls'][index]['controls'].maritalStatus.value]);
    }
    changetitleiList(index){
        this.insureArray['controls'].items['controls'][index]['controls'].proposerTitleName.patchValue(this.titleCodeList[this.insureArray['controls'].items['controls'][index]['controls'].proposerTitle.value]);
    }
    validateProof(index){
            if(this.insureArray['controls'].items['controls'][index]['controls'].proposerIdProof.value == 'IDNO2') {
                if(this.insureArray['controls'].items['controls'][index]['controls'].proposerPan.value == '') {
                    this.insureArray['controls'].items['controls'][index]['controls'].insurerIdProofError.patchValue('PAN Number is required');
                } else {
                    this.insureArray['controls'].items['controls'][index]['controls'].insurerIdProofError.patchValue('');
                }

            } else if(this.insureArray['controls'].items['controls'][index]['controls'].proposerIdProof.value == 'IDNO3') {
                if(this.insureArray['controls'].items['controls'][index]['controls'].proposerDriving.value == '') {
                    this.insureArray['controls'].items['controls'][index]['controls'].insurerIdProofError.patchValue('Driving License is required');
                } else {
                    this.insureArray['controls'].items['controls'][index]['controls'].insurerIdProofError.patchValue('');
                }
            } else if(this.insureArray['controls'].items['controls'][index]['controls'].proposerIdProof.value == 'IDNO1') {
                if(this.insureArray['controls'].items['controls'][index]['controls'].proposerPassport.value == '') {
                    this.insureArray['controls'].items['controls'][index]['controls'].insurerIdProofError.patchValue('Passport is required');
                } else {
                    this.insureArray['controls'].items['controls'][index]['controls'].insurerIdProofError.patchValue('');
                }
            } else if(this.insureArray['controls'].items['controls'][index]['controls'].proposerIdProof.value == 'IDNO4') {
                if(this.insureArray['controls'].items['controls'][index]['controls'].proposerVoter.value == '') {
                    this.insureArray['controls'].items['controls'][index]['controls'].insurerIdProofError.patchValue('Voter Id is required');
                } else {
                    this.insureArray['controls'].items['controls'][index]['controls'].insurerIdProofError.patchValue('');
                }
            } else {
                this.insureArray['controls'].items['controls'][index]['controls'].insurerIdProofError.patchValue('');
            }

        }

    //Nominee Details
    religareNomineeDetails(stepper: MatStepper, value) {
        sessionStorage.nomineeData = '';
        sessionStorage.nomineeData = JSON.stringify(value);
        if (this.nomineeDetails.valid) {
            this.nomineeData = value;
            this.proposal(stepper);
        }
    }

    backAll(){
        this.topScroll();
        this.prevStep();
    }

    //
    // subStatus(value: any, i, k, j) {
    //     if (value.checked) {
    //     } else {
    //         this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].existingSince = '';
    //     }
    // }




    // religareQuestion(stepper: MatStepper) {
    //     this.questionEmpty = false;
    //     for (let i = 0; i < this.religareQuestionsList.length; i++) {
    //         if (this.religareQuestionsList[i].answer == '') {
    //             this.questionEmpty = false;
    //             break;
    //         } else {
    //             this.questionEmpty = true;
    //         }
    //     }
    //     if (this.questionEmpty ) {
    //         stepper.next();
    //
    //     } else {
    //         this.toastr.error('Please fill the all Answers');
    //
    //     }
    // }

    PreviousInsure(value) {
        if (value.value == 'true') {
            this.proposer.controls['previousinsurance'].setValue('');
            this.previousInsuranceStatus = true;
        } else {
            this.previousInsuranceStatus = false;
            this.proposer.controls['previousinsurance'].setValue('No');
        }
    }

    PreviousInsuredDetail(value, i) {
        if (value.value == 'true') {
            this.insureArray['controls'].items['controls'][i]['controls'].previousinsurance.setValue('');
            this.previousInsuranceStatus1[i] = this.insureArray['controls'].items['controls'][i]['controls'].previousinsuranceChecked.value;
        } else {
            this.previousInsuranceStatus1[i] = this.insureArray['controls'].items['controls'][i]['controls'].previousinsuranceChecked.value;
            this.insureArray['controls'].items['controls'][i]['controls'].previousinsurance.setValue('No');
        }
    }

    selectHabitat(value: any, id, key){
      if(key == 'Smoking' && value.checked) {
          this.insureArray['controls'].items['controls'][id]['controls'].Smoking.patchValue('');
          this.insureArray['controls'].items['controls'][id]['controls'].personalHabit.patchValue(true);
      } else if(key == 'Smoking' && !value.checked){
          this.insureArray['controls'].items['controls'][id]['controls'].personalHabit.patchValue(false);
          this.insureArray['controls'].items['controls'][id]['controls'].Smoking.patchValue(0);
      }
      if (key == 'Pouches' && value.checked) {
          this.insureArray['controls'].items['controls'][id]['controls'].personalHabit.patchValue(true);
          this.insureArray['controls'].items['controls'][id]['controls'].Pouches.patchValue('');
        } else if(key == 'Pouches' && !value.checked){
          this.insureArray['controls'].items['controls'][id]['controls'].personalHabit.patchValue(false);
          this.insureArray['controls'].items['controls'][id]['controls'].Pouches.patchValue(0);
        }
        if (key == 'Liquor' && value.checked) {
            this.insureArray['controls'].items['controls'][id]['controls'].personalHabit.patchValue(true);
            this.insureArray['controls'].items['controls'][id]['controls'].LiquorPeg.patchValue('');
        } else if(key == 'Liquor' && !value.checked){
            this.insureArray['controls'].items['controls'][id]['controls'].personalHabit.patchValue(false);
            this.insureArray['controls'].items['controls'][id]['controls'].LiquorPeg.patchValue(0);
        }

        if (key == 'Wine' && value.checked) {
            this.insureArray['controls'].items['controls'][id]['controls'].personalHabit.patchValue(true);
            this.insureArray['controls'].items['controls'][id]['controls'].WineGlass.patchValue('');
        } else if(key == 'Wine' && !value.checked){
            this.insureArray['controls'].items['controls'][id]['controls'].personalHabit.patchValue(false);
            this.insureArray['controls'].items['controls'][id]['controls'].WineGlass.patchValue(0);
        }

        if (key == 'Beer' && value.checked) {
            this.insureArray['controls'].items['controls'][id]['controls'].personalHabit.patchValue(true);
            this.insureArray['controls'].items['controls'][id]['controls'].BeerBottle.patchValue('');
        } else if(key == 'Beer' && !value.checked){
            this.insureArray['controls'].items['controls'][id]['controls'].personalHabit.patchValue(false);
            this.insureArray['controls'].items['controls'][id]['controls'].BeerBottle.patchValue(0);
        }
    }
    smokingPersonalhabit(id){
      if(this.insureArray['controls'].items['controls'][id]['controls'].Smoking.value >10){
          this.toastr.error('As per your smoking count more than 10 per day unable to purchase the policy in online');
      }
    }
    liquorPegPersonalhabit(id){
        if(this.insureArray['controls'].items['controls'][id]['controls'].LiquorPeg.value >9){
            this.toastr.error('As per your LiquorPeg count more than 9 per week unable to purchase the policy in online');
        }
    }
    pouchesPersonalhabit(id){
        if(this.insureArray['controls'].items['controls'][id]['controls'].Pouches.value >7){
            this.toastr.error('As per your Pouches count more than 7 per day unable to purchase the policy in online');
        }
    }
    wineGlassPersonalhabit(id){
        if(this.insureArray['controls'].items['controls'][id]['controls'].WineGlass.value >6){
            this.toastr.error('As per your WineGlass count more than 6 per week unable to purchase the policy in online');
        }
    }
    beerBottlePersonalhabit(id){
        if(this.insureArray['controls'].items['controls'][id]['controls'].BeerBottle.value >10){
            this.toastr.error('As per your BeerBottle count more than 10 per week unable to purchase the policy in online');
        }
    }
    addEvent(event, type) {
        if (event.value != null) {
            let selectedDate = '';
            this.proposerAge = '';
            let dob = '';
            if (typeof event.value._i == 'string') {
                const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
                if (pattern.test(event.value._i) && event.value._i.length == 10) {
                        this.dobError = '';
                } else {
                        this.dobError = 'Enter Valid Date';
                }
                selectedDate = event.value._i;
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                if (selectedDate.length == 10) {
                    this.proposerAge = this.ageCalculate(dob);
                    sessionStorage.proposerAge = this.proposerAge;

                }

            } else if (typeof event.value._i == 'object') {
                // dob = this.datepipe.transform(event.value, 'MMM d, y');
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                if (dob.length == 10) {
                    this.proposerAge = this.ageCalculate(dob);
                    sessionStorage.proposerAge = this.proposerAge;

                }
                this.dobError = '';
            }

        }
    }




    addEventInsurer(event,  i, type, name) {

        if (event.value != null) {
            let selectedDate = '';
            let dob = '';
            let dob_days = '';
            this.getAge = '';
            this.getDays;
            dob = this.datepipe.transform(event.value, 'y-MM-dd');
            dob_days = this.datepipe.transform(event.value, 'dd-MM-y');

            if (typeof event.value._i == 'string') {
                const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
                if (name == 'insurer') {
                    if (pattern.test(event.value._i) && event.value._i.length == 10) {
                        this.insureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
                    } else {
                        this.insureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('Enter Valid DOB');
                    }
                }
                selectedDate = event.value._i;

                if (selectedDate.length == 10) {

                    if (name == 'startDate') {
                        this.insureArray['controls'].items['controls'][i]['controls'].dobErrorStartDate.patchValue('');
                        this.insureArray['controls'].items['controls'][i]['controls'].PolicyStartDate.patchValue(dob);
                    } else {
                        this.insureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
                        this.getAge = this.ageCalculate(dob);
                        this.getDays = this.ageCalculateInsurer(dob_days);
                        this.insureArray['controls'].items['controls'][i]['controls'].proposerAge.patchValue(this.getAge);
                        this.insureArray['controls'].items['controls'][i]['controls'].proposerDob.patchValue(dob);

                    }

                } else {
                    if (name == 'startDate') {
                        this.insureArray['controls'].items['controls'][i]['controls'].dobErrorStartDate.patchValue('Enter Valid Date');
                    } else {
                        this.insureArray['controls'].items['controls'][i]['controls'].proposerAge.patchValue('');
                    }

                }
            }else if (typeof event.value._i == 'object') {

                console.log(name, 'name');
                if (dob.length == 10) {
                    if (name == 'startDate') {
                        this.insureArray['controls'].items['controls'][i]['controls'].PolicyStartDate.patchValue(dob);
                        this.insureArray['controls'].items['controls'][i]['controls'].dobErrorStartDate.patchValue('');
                    } else if(name == 'insurer') {
                        this.insureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
                        this.getAge = this.ageCalculate(dob);
                        console.log(this.getAge,'age');
                        this.getDays = this.ageCalculateInsurer(dob_days);
                        console.log(this.getDays,'das');
                        this.insureArray['controls'].items['controls'][i]['controls'].proposerDob.patchValue(dob);
                    }
                }
            }
            if (name == 'insurer') {
                console.log(name, 'typettttt');

                let length = this.datepipe.transform(this.insureArray['controls'].items['controls'][i]['controls'].proposerDob.value, 'y-MM-dd');
                if (length.length == 10) {
                    console.log(length, 'length');
                    this.insureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
                    this.insureArray['controls'].items['controls'][i]['controls'].ins_age.patchValue(this.getAge);
                    this.insureArray['controls'].items['controls'][i]['controls'].proposerAge.patchValue(this.getAge);
                    this.insureArray['controls'].items['controls'][i]['controls'].ins_days.patchValue(this.getDays);
                    this.ageValidation(i, type);
                } else {
                   this.insureArray['controls'].items['controls'][i]['controls'].proposerAge.patchValue('');
                }
            }

        }

    }
    ageCalculateInsurer(getDays) {
        let a = moment(getDays, 'DD/MM/YYYY');
        let b = moment(new Date(), 'DD/MM/YYYY');
        let days = b.diff(a, 'days');
        return days;
        // let mdate = dob.toString();
        // let yearThen = parseInt(mdate.substring( 8,10), 10);
        // let monthThen = parseInt(mdate.substring(5,7), 10);
        // let dayThen = parseInt(mdate.substring(0,4), 10);
        // let todays = new Date();
        // let birthday = new Date( dayThen, monthThen-1, yearThen);
        // let differenceInMilisecond = todays.valueOf() - birthday.valueOf();
        // let Bob_days = Math.ceil(differenceInMilisecond / (1000 * 60 * 60 * 24));
        // return Bob_days;
    }
    ageValidation(i, type) {
        console.log(type, 'type');
        console.log(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value, 'days');

        if((this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value < 18 && type == 'Self') || (this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value > 55 && type == 'Self')) {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Self age between 18 to 55');
        } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value >= 18 && type == 'Self')  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
            this.arr.push(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value);
        }
        if((this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value < 18 && type == 'Spouse') || (this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value > 55 && type == 'Spouse')) {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Spouse age between 18 to 55');
            // this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Spouse age should be 18 and above');
        } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value >= 18 && type == 'Spouse')  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
            this.arr.push(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value);
        }
        let smallest = this.arr[0];
        for(let i = 1; i<this.arr.length; i++){
            if(this.arr[i] < smallest){
                smallest = this.arr[i];
            }
        }


        if(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value > 90 && this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value <= 9495 && type == 'Son')  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value < 91 && type == 'Son')  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 91 days to 25 years');
        } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value > 9495 && type == 'Son')  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 91 days to 25 years');
        }

        if(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value > 90 && this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value <= 9495 && type == 'Daughter')  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value < 91 && type == 'Daughter')  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 91 days to 25 years');
        } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value > 9495 && type == 'Daughter')  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 91 days to 25 years');
        }



        if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 36 && type == 'Mother') {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Mother age should be above 36');
        } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value > 36 && type == 'Mother')  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        }
        if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 36 && type == 'Father') {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Father age should be above 36');
        } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value > 36 && type == 'Father')  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        }
        if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 1 && type == 'Sister') {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Sister age should be above 1');
        } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value > 1 && type == 'Sister')  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        }
        if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 1 && type == 'Brother') {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Brother age should be above 1');
        } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value > 1 && type == 'Brother')  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        }
        if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 36 && type == ' Father In Law') {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue(' Father In Law age should be above 36');
        } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value > 36 && type == ' Father In Law')  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        }
        if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 36 && type == ' Mother In Law') {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue(' Mother In Law age should be above 36');
        } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value > 36 && type == ' Mother In Law')  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        }

        // if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 46 && type == 'Self' && this.buyProductdetails.product_name == 'Care Freedom') {
        //     this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Self age should be above 46');
        // } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value > 46 && type == 'Self' && this.buyProductdetails.product_name == 'Care Freedom')  {
        //     this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        // }
        // if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 46 && type == 'Spouse' && this.buyProductdetails.product_name == 'Care Freedom') {
        //     this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Spouse age should be above 46');
        // } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value > 46 && type == 'Spouse' && this.buyProductdetails.product_name == 'Care Freedom')  {
        //     this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        // }

    }
    getPincode(pin, title, i){
            const data = {
                'platform': 'web',
                'postalcode': pin
            }
            if (pin.length == 6) {
                this.proposalservice.getApollomunichPincode(data).subscribe(
                    (successData) => {
                        this.pincodeSuccess(successData, title,i);
                    },
                    (error) => {
                        this.pincodeFailure(error);
                    }
                );
            }
        }

    public pincodeSuccess(successData, title,i) {
        if (successData.IsSuccess) {
            this.setStatecode = successData.ResponseObject;
            if (title == 'proposer') {
                this.proposer.controls['proposerState'].patchValue(this.setStatecode.state);
                this.proposer.controls['proposerStateIdP'].patchValue(this.setStatecode.state_code);
                this.stateChange(this.setStatecode.state_code, title);
            }
            else if (title == 'insure') {
                this.insureArray['controls'].items['controls'][i]['controls'].proposerState.patchValue(this.setStatecode.state);
                this.insureArray['controls'].items['controls'][i]['controls'].proposerStateIdP.patchValue(this.setStatecode.state_code);
                this.insureStateChange(this.insureArray['controls'].items['controls'][i]['controls'].proposerStateIdP.value, title, i);
            }
            else if (title == 'nominee') {
                this.nomineeDetails.controls['nomineeState'].patchValue(this.setStatecode.state);
                this.nomineeDetails.controls['nomineeStateId'].patchValue(this.setStatecode.state_code);
                this.stateChangeN(this.setStatecode.state_code, title);
            }
            else {
                this.toastr.error(successData.ErrorObject);
            }
        } else if (successData.IsSuccess != true) {
            this.toastr.error('Invalid Pincode');
            if (title == 'proposer') {
                this.proposer.controls['proposerState'].patchValue('');
                this.proposer.controls['proposerStateIdP'].patchValue('');
                this.proposer.controls['proposerDistrict'].patchValue('');
                this.proposer.controls['proposerCity'].patchValue('');
            }
            else if (title == 'insure') {
                this.insureArray['controls'].items['controls'][i]['controls'].proposerState.patchValue('');
                this.insureArray['controls'].items['controls'][i]['controls'].proposerStateIdP.patchValue('');
                this.insureArray['controls'].items['controls'][i]['controls'].proposerDistrict.patchValue('');
                this.insureArray['controls'].items['controls'][i]['controls'].proposerCity.patchValue('');
            }
            else if (title == 'nominee') {
                this.nomineeDetails.controls['nomineeState'].patchValue('');
                this.nomineeDetails.controls['nomineeStateId'].patchValue('');
                this.nomineeDetails.controls['nomineeDistrict'].patchValue('');
                this.nomineeDetails.controls['nomineeCity'].patchValue('');

            }
        }
    }
    public pincodeFailure(error) {
    }

    DobDaysCalculate(dobDays) {
        let mdate = dobDays.toString();
        let yearThen = parseInt(mdate.substring( 8,10), 10);
        let monthThen = parseInt(mdate.substring(5,7), 10);
        let dayThen = parseInt(mdate.substring(0,4), 10);
        let todays = new Date();
        let birthday = new Date( dayThen, monthThen-1, yearThen);
        let differenceInMilisecond = todays.valueOf() - birthday.valueOf();
        let Bob_days = Math.ceil(differenceInMilisecond / (1000 * 60 * 60 * 24));
        return Bob_days;
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
            this.agecal = age;
            return age;
    }
    topScroll() {
        document.getElementById('main-content').scrollTop = 0;
    }
    //Marital Status
    maritalStatus() {
        const data = {
            'platform': 'web',
            'product_id': '11',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.proposalservice.getAppolloMaritalStatus(data).subscribe(
            (successData) => {
                this.setMaritalStatusSuccess(successData);
            },
            (error) => {
                this.setMaritalStatusFailure(error);
            }
        );
    }

    public setMaritalStatusSuccess(successData) {
        if (successData.IsSuccess == true) {
            this.maritalDetail = successData.ResponseObject;

        }
    }

    public setMaritalStatusFailure(error) {
    }//TitleCode Status
    TitleCodeStatus() {
        const data = {
            'platform': 'web',
            'product_id': '11',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.proposalservice.getTitleCode(data).subscribe(
            (successData) => {
                this.setTitleCodeSuccess(successData);
            },
            (error) => {
                this.setTitleCodeFailure(error);
            }
        );
    }

    public setTitleCodeSuccess(successData) {
        if (successData.IsSuccess == true) {
            this.titleCodeList = successData.ResponseObject;
        }
    }

    public setTitleCodeFailure(error) {
    }

    //proffession list
    getProffession() {
        const data = {
            'platform': 'web',
            'product_id': '11',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.proposalservice.apollomunichProffession(data).subscribe(
            (successData) => {
                this.getProffessionSuccess(successData);
            },
            (error) => {
                this.getProffessionFailure(error);
            }
        );
    }

    public getProffessionSuccess(successData) {
        if (successData.IsSuccess == true) {
            this.proffessionList = successData.ResponseObject;

        }
    }
    public getProffessionFailure(error) {
    }
    //Previous Insure
    getPreviousInsure() {
        const data = {
            'platform': 'web',
            'product_id': '11',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.proposalservice.apollomunichPreviousInsure(data).subscribe(
            (successData) => {
                this.getPreviousInsureSuccess(successData);
            },
            (error) => {
                this.getPreviousInsureFailure(error);
            }
        );
    }

    public getPreviousInsureSuccess(successData) {
        if (successData.IsSuccess == true) {
            this.previousInsureList = successData.ResponseObject;

        }
    }

    public getPreviousInsureFailure(error) {
    }

    //Nationality List
    NationalityList() {
        const data = {
            'platform': 'web',
            'product_id': '11',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.proposalservice.getRelianceNationality(data).subscribe(
            (successData) => {
                this.getNationalityStatusSuccess(successData);
            },
            (error) => {
                this.getNationalityStatusFailure(error);
            }
        );
    }
    public getNationalityStatusSuccess(successData) {
        if (successData.IsSuccess == true) {
            this.nationalityList = successData.ResponseObject;
        }
    }

    public getNationalityStatusFailure(error) {
    }

    //IdProoofList
    IdProofList(){
        const data = {
            'platform': 'web',
            'product_id': '11',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        };
        this.proposalservice.getIdProofList(data).subscribe(
            (successData) => {
                this.setIdProofListStatusSuccess(successData);
            },
            (error) => {
                this.setIdProofListStatusFailure(error);
            }
        );
    }

    public setIdProofListStatusSuccess(successData){
        if (successData.IsSuccess) {
            this.IdProofListss = successData.ResponseObject;
            sessionStorage.IdProofListss = this.IdProofListss;
        }
    }
    public setIdProofListStatusFailure(error){
    }

    //Appollo state
    AppolloState(){
        const data = {
            'platform': 'web',
            'product_id': '11',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.proposalservice.getAppolloState(data).subscribe(
            (successData) => {
                this.setAppolloStateSuccess(successData);
            },
            (error) => {
                this.setAppolloStateFailure(error);
            }
        );
    }

    public setAppolloStateSuccess(successData){
        this.AppolloStateList = successData.ResponseObject;
    }
    public setAppolloStateFailure(error){
    }



    stateChange(stateId, title){
        const data = {
            'platform': 'web',
            'product_id': '11',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'state_code': stateId
        }
        this.proposalservice.getAppolloDistrict(data).subscribe(
            (successData) => {
                this.setAppolloDistrictSuccess(successData)
            },
            (error) => {
                this.setAppolloDistrictFailure(error);
            }
        );

        this.proposalservice.getAppolloCity(data).subscribe(
            (successData) => {
                this.setAppolloCitySuccess(successData);
            },
            (error) => {
                this.setAppolloCityFailure(error);
            }
        );
    }
    public setAppolloCitySuccess(successData){
        if (successData.IsSuccess) {
            this.AppolloCityList = successData.ResponseObject;
            sessionStorage.AppolloCityList = JSON.stringify(this.AppolloCityList);
        }
    }
    public setAppolloCityFailure(error){
    }

    public setAppolloDistrictSuccess(successData){
        if (successData.IsSuccess) {
            this.AppolloDistrictList = successData.ResponseObject;
            sessionStorage.AppolloDistrictList = JSON.stringify(this.AppolloDistrictList);
        }
    }
    public setAppolloDistrictFailure(error){
    }

    stateChangeN(stateId, title){
        const data = {
            'platform': 'web',
            'product_id': '11',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'state_code': stateId
        }
        this.proposalservice.getAppolloDistrict(data).subscribe(
            (successData) => {
                this.setAppolloDistrictNSuccess(successData)
            },
            (error) => {
                this.setAppolloDistrictNFailure(error);
            }
        );

        this.proposalservice.getAppolloCity(data).subscribe(
            (successData) => {
                this.setAppolloCityNSuccess(successData);
            },
            (error) => {
                this.setAppolloCityNFailure(error);
            }
        );
    }
    public setAppolloDistrictNSuccess(successData){
        if (successData.IsSuccess) {
            this.nomineeAppolloDistrictList = successData.ResponseObject;
            sessionStorage.nomineeAppolloDistrictList = JSON.stringify(this.nomineeAppolloDistrictList);
        }
    }
    public setAppolloDistrictNFailure(error){
    }
    public setAppolloCityNSuccess(successData){
        if (successData.IsSuccess) {
            this.nomineeAppolloCityLis = successData.ResponseObject;
            sessionStorage.nomineeAppolloCityLis = JSON.stringify(this.nomineeAppolloCityLis);
        }

    }
    public setAppolloCityNFailure(error){
    }
//Insure State
    insureStateChange(stateId, title, i){
        this.stateCodeId = i;
        const data = {
            'platform': 'web',
            'product_id': '11',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'state_code': stateId
        }
        this.proposalservice.getAppolloDistrict(data).subscribe(
            (successData) => {
                this.setInsureAppolloDistrictSuccess(successData)
            },
            (error) => {
                this.setInsureAppolloDistrictFailure(error);
            }
        );

        this.proposalservice.getAppolloCity(data).subscribe(
            (successData) => {
                this.setInsureAppolloCitySuccess(successData);
            },
            (error) => {
                this.setInsureAppolloCityFailure(error);
            }
        );
    }


//Appollo District
    public setInsureAppolloDistrictSuccess(successData){
        if (successData.IsSuccess) {
            this.iAppolloDistrictList = successData.ResponseObject;
            sessionStorage.iAppolloDistrictList = JSON.stringify(this.iAppolloDistrictList);
            this.insureArray['controls'].items['controls'][this.stateCodeId]['controls'].stateHide.patchValue(false);
        }
    }
    public setInsureAppolloDistrictFailure(error){
    }

    //Appollo City
    public setInsureAppolloCitySuccess(successData){
        if (successData.IsSuccess) {
            this.iAppolloCityList = successData.ResponseObject;
            sessionStorage.iAppolloCityList = JSON.stringify(this.iAppolloCityList);
            this.insureArray['controls'].items['controls'][this.stateCodeId]['controls'].cityHide.patchValue(false);
        }
    }
    public setInsureAppolloCityFailure(error){
    }


    storeDname(id, title ) {
        if (title == 'district') {
            for(let i =0; i < this.iAppolloDistrictList.length; i++ ) {
                if(this.iAppolloDistrictList[i].district_code == this.insureArray['controls'].items['controls'][id]['controls'].proposerDistrict.value){
                    this.iAppolloDistrictName =  this.iAppolloDistrictList[i].district_name;
                }
            }
            // this.insureArray['controls'].items['controls'][id]['controls'].proposerDistrictIdP.patchValue(this.iAppolloDistrictName);

        }
        else if (title == 'city') {

            for(let i =0; i < this.iAppolloCityList.length; i++ ) {
                if(this.iAppolloCityList[i].city_code == this.insureArray['controls'].items['controls'][id]['controls'].proposerCity.value){
                    this.iAppolloCityName =  this.iAppolloCityList[i].city_name;
                }
            }
            //  this.insureArray['controls'].items['controls'][id]['controls'].proposerCityIdP.patchValue(this.iAppolloCityName);

        }
    }

    setRelationship() {
        const data = {
            'platform': 'web',
            'product_id': '11',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.proposalservice.getAppolloRelationship(data).subscribe(
            (successData) => {
                this.setRelationshipSuccess(successData);
            },
            (error) => {
                this.setRelationshipFailure(error);
            }
        );
    }

    public setRelationshipSuccess(successData) {
        this.relationshipList = successData.ResponseObject;

    }
    public setRelationshipFailure(error) {
    }

    setOccupationList() {
        const data = {
            'platform': 'web',
            'product_id': '11',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.proposalservice.getAppolloOccupation(data).subscribe(
            (successData) => {
                this.occupationListSuccess(successData);
            },
            (error) => {
                this.occupationListFailure(error);
            }
        );

    }

    public occupationListSuccess(successData) {
        if (successData.IsSuccess == true) {
            this.occupationList = successData.ResponseObject;
        }
    }

    public occupationListFailure(error) {
    }
    alternateChange(event) {
        if (event.target.value.length == 10) {
            if(event.target.value == this.proposer.get('proposerMobile').value) {
                this.mobileNumber = 'Alternate number should be different from mobile number';
            } else {
                this.mobileNumber = '';
            }
        } else {
            // this.mobileNumber = 'false';
        }
        sessionStorage.mobileNumber = this.mobileNumber;
    }

    sameProposer() {
        if (this.insureArray['controls'].items['controls'][0]['controls'].sameAsProposer.value) {
            this.iAppolloCityList = this.AppolloCityList;
            this.iAppolloDistrictList = this.AppolloDistrictList;
            // this.titleCodeList =  this.titleCodeList;
            sessionStorage.iAppolloCityList = JSON.stringify(this.iAppolloCityList);
            sessionStorage.iAppolloDistrictList = JSON.stringify(this.iAppolloDistrictList);
            // sessionStorage.titleCodeList = JSON.stringify(this.titleCodeList);
            this.insureArray['controls'].items['controls'][0]['controls'].sameasreadonly.patchValue(true);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerTitle.patchValue(this.proposer.controls['proposerTitle'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerTitleName.patchValue(this.proposer.controls['proposerTitleName'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerFirstname.patchValue(this.proposer.controls['proposerFirstname'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerMidname.patchValue(this.proposer.controls['proposerMidname'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerLastname.patchValue(this.proposer.controls['proposerLastname'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerDob.patchValue(this.proposer.controls['proposerDob'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].maritalStatus.patchValue(this.proposer.controls['maritalStatus'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].maritalStatusName.patchValue(this.proposer.controls['maritalStatusName'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerGender.patchValue(this.proposer.controls['proposerGender'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerEmail.patchValue(this.proposer.controls['proposerEmail'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerMobile.patchValue(this.proposer.controls['proposerMobile'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerAddress.patchValue(this.proposer.controls['proposerAddress'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerAddress2.patchValue(this.proposer.controls['proposerAddress2'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerAddress3.patchValue(this.proposer.controls['proposerAddress3'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerPincode.patchValue(this.proposer.controls['proposerPincode'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerState.patchValue(this.proposer.controls['proposerState'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerrelationship.patchValue('1');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerIdProof.patchValue(this.proposer.controls['proposerIdProof'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerIdProofName.patchValue(this.proposer.controls['proposerIdProofName'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerIdProofIdP.patchValue(this.proposer.controls['proposerIdProofIdP'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerrelationshipName.patchValue(this.relationshipList['1']);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerCity.patchValue(this.proposer.controls['proposerCity'].value);

            console.log(this.AppolloCityList[this.proposer.controls['proposerCityName'].value], 'ctyy');
            console.log(this.AppolloCityList, 'ctyy');


            this.insureArray['controls'].items['controls'][0]['controls'].proposerCityName.patchValue(this.proposer.controls['proposerCityName'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerDistrict.patchValue(this.proposer.controls['proposerDistrict'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerDistrictName.patchValue(this.proposer.controls['proposerDistrictName'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerPan.patchValue(this.proposer.controls['proposerPan'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerDriving.patchValue(this.proposer.controls['proposerDriving'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerPassport.patchValue(this.proposer.controls['proposerPassport'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerVoter.patchValue(this.proposer.controls['proposerVoter'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerGst.patchValue(this.proposer.controls['proposerGst'].value);
            let age = this.ageCalculate(this.datepipe.transform(this.proposer.controls['proposerDob'].value, 'y-MM-dd'));
            this.insureArray['controls'].items['controls'][0]['controls'].proposerAge.patchValue(age);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerCityIdP.patchValue(this.proposer.controls['proposerCityIdP'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerStateIdP.patchValue(this.proposer.controls['proposerStateIdP'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerCountryIdP.patchValue(this.proposer.controls['proposerCountryIdP'].value);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerDistrictIdP.patchValue(this.proposer.controls['proposerDistrictIdP'].value);

            if(this.insureArray['controls'].items['controls'][0]['controls'].proposerAge.value > 55) {
                this.insureArray['controls'].items['controls'][0]['controls'].insurerDobError.value = 'Age between 18 to 55';
            } else {
                this.insureArray['controls'].items['controls'][0]['controls'].insurerDobError.value = '';
            }

        } else {
            this.iAppolloCityList = {};
            this.iAppolloDistrictList = {};
            sessionStorage.iAppolloCityList = '';
            sessionStorage.iAppolloDistrictList = '';
            this.insureArray['controls'].items['controls'][0]['controls'].sameasreadonly.patchValue(false);
            this.insureArray['controls'].items['controls'][0]['controls'].proposerTitle.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerFirstname.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerMidname.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerLastname.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerDob.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].maritalStatus.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].maritalStatusName.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerGender.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerEmail.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerMobile.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerAddress.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerAddress2.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerAddress3.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerPincode.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerCity.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerState.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerrelationship.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerIdProof.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerGst.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerAge.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerPan.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerDriving.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerPassport.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerVoter.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerrelationshipName.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerDistrictName.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerCityName.patchValue('');
            this.insureArray['controls'].items['controls'][0]['controls'].proposerIdProofName.patchValue('');

            this.insureArray['controls'].items['controls'][0]['controls'].insurerDobError.value = '';

        }



    }
    // proposer address
    sameProposerAddress() {
        if (this.nomineeDetails.controls['sameAsProposerAddress'].value) {
            this.nomineesame = true;
            this.getPincode(this.proposer.controls['proposerPincode'].value, 'nominee', 0);
            this.nomineeDetails.controls['nomineeAddress'].patchValue(this.proposer.controls['proposerAddress'].value);
            this.nomineeDetails.controls['nomineeAddress2'].patchValue(this.proposer.controls['proposerAddress2'].value);
            this.nomineeDetails.controls['nomineeAddress3'].patchValue(this.proposer.controls['proposerAddress3'].value);
            this.nomineeDetails.controls['nomineePincode'].patchValue(this.proposer.controls['proposerPincode'].value);
            this.nomineeDetails.controls['nomineeCity'].patchValue(this.proposer.controls['proposerCity'].value);
            this.nomineeDetails.controls['nomineeCityName'].patchValue(this.proposer.controls['proposerCityName'].value);
            this.nomineeDetails.controls['nomineeState'].patchValue(this.proposer.controls['proposerState'].value);
            this.nomineeDetails.controls['nomineeDistrict'].patchValue(this.proposer.controls['proposerDistrict'].value);
            this.nomineeDetails.controls['nomineeCountryId'].patchValue(this.proposer.controls['proposerCountryIdP'].value);
            this.nomineeDetails.controls['nomineeDistrictId'].patchValue(this.proposer.controls['proposerDistrictIdP'].value);
            this.nomineeDetails.controls['nomineeCityId'].patchValue(this.proposer.controls['proposerCityIdP'].value);
            this.nomineeDetails.controls['nomineeStateId'].patchValue(this.proposer.controls['proposerStateIdP'].value);
        } else {
            this.nomineesame = false;
            this.nomineeDetails.controls['nomineeAddress'].patchValue('');
            this.nomineeDetails.controls['nomineeAddress2'].patchValue('');
            this.nomineeDetails.controls['nomineeAddress3'].patchValue('');
            this.nomineeDetails.controls['nomineeAddress'].patchValue('');
            this.nomineeDetails.controls['nomineePincode'].patchValue('');
            this.nomineeDetails.controls['nomineeCity'].patchValue('');
            this.nomineeDetails.controls['nomineeCityName'].patchValue('');
            this.nomineeDetails.controls['nomineeState'].patchValue('');
            this.nomineeDetails.controls['nomineeDistrict'].patchValue('');
            this.nomineeDetails.controls['nomineeCountryId'].patchValue('');
            this.nomineeDetails.controls['nomineeDistrictId'].patchValue('');
            this.nomineeDetails.controls['nomineeCityId'].patchValue('');
            this.nomineeDetails.controls['nomineeStateId'].patchValue('');
        }



    }


//proposer Details
    proposerDetails(stepper: MatStepper, value) {
        this.proposerData = value;
        console.log(this.proposerData, 'this.proposerData');
        this.proofValid = false;
        if (value.proposerIdProof !='') {
            if (value.proposerDriving != "") {
                this.proofValid = true;
                this.proposerProofNum = value.proposerDriving;
                this.proposer.controls['proposerIdProofIdP'].patchValue(this.proposerProofNum);
            } else if (value.proposerPassport != "") {
                this.proofValid = true;
                this.proposerProofNum = value.proposerPassport;
                this.proposer.controls['proposerIdProofIdP'].patchValue(this.proposerProofNum);

            } else if (value.proposerVoter != "") {
                this.proofValid = true;
                this.proposerProofNum = value.proposerVoter;
                this.proposer.controls['proposerIdProofIdP'].patchValue(this.proposerProofNum);

            } else if (value.proposerPan != "") {
                this.proofValid = true;
                this.proposerProofNum = value.proposerPan.toUpperCase();
                this.proposer.controls['proposerIdProofIdP'].patchValue(this.proposerProofNum);
            }
        } else {
            this.proofValid = true;
        }

        console.log(this.proposer, 'proposerproposer');
        sessionStorage.stepper1Details = '';
        sessionStorage.stepper1Details = JSON.stringify(value);
        if (this.proposer.valid) {
            if (sessionStorage.proposerAge >= 18) {
                if (this.mobileNumber == '' || this.mobileNumber == 'true'){
                    if(this.proofValid){
                        stepper.next();
                        this.topScroll();

                        //mobile view
                        this.nextStep();
                        this.appolloMobileTrue1 = false;
                    } else{
                        this.toastr.error('Please enter id proof');
                    }

                }

            } else {
                this.toastr.error('Proposer age should be 18 or above');
            }
        }
    }
// medical details
    medicalHistoryDetails(stepper: MatStepper) {

        sessionStorage.apollomedical = '';
        sessionStorage.apollomedical = JSON.stringify(this.appolloQuestionsList);

        // let statusChecked = [];
         let medicalStatus = [];
        for (let i = 0; i < this.appolloQuestionsList.length; i++) {

            if(this.appolloQuestionsList[i].mStatus == 'No'){
                medicalStatus.push('No');
            } else if(this.appolloQuestionsList[i].mStatus == 'Yes') {
                // alert('in');
                medicalStatus.push('Yes');
            }
        }

        if (medicalStatus.includes('Yes')) {
            // this.toastr.error('This medical questions is unable to proceed');
            this.toastr.error('Since you have selected Pre-Existing Disease. You are not allowed to purchase this policy.');
        } else {
            stepper.next();

            //mobile view
            this.nextStep();
            this.appolloMobileTrue2 = false;
            this.appolloMobileTrue3 = false;
        }

    }


    //Insure Details
    AppolloInsureDetails(stepper: MatStepper, id, value, key) {
        sessionStorage.stepper2Details = '';
        sessionStorage.stepper2Details = JSON.stringify(value);
        if (this.insureArray.valid) {
            this.insurerData = value.items;
            console.log(this.insurerData,'this.insurerData');
            for(let i = 0; i < this.insurerData.length; i++) {
                if (this.insureArray['controls'].items['controls'][i]['controls'].proposerDriving.value != "") {
                    this.insureArray['controls'].items['controls'][i]['controls'].proposerIdProofIdP.patchValue(this.insureArray['controls'].items['controls'][i]['controls'].proposerDriving.value);
                } else if (this.insureArray['controls'].items['controls'][i]['controls'].proposerPassport.value != "") {
                    this.insureArray['controls'].items['controls'][i]['controls'].proposerIdProofIdP.patchValue(this.insureArray['controls'].items['controls'][i]['controls'].proposerPassport.value);
                } else if (this.insureArray['controls'].items['controls'][i]['controls'].proposerVoter.value != "") {
                    this.insureArray['controls'].items['controls'][i]['controls'].proposerIdProofIdP.patchValue(this.insureArray['controls'].items['controls'][i]['controls'].proposerVoter.value);
                } else if (this.insureArray['controls'].items['controls'][i]['controls'].proposerPan.value != "") {
                    this.insureArray['controls'].items['controls'][i]['controls'].proposerIdProofIdP.patchValue(this.insureArray['controls'].items['controls'][i]['controls'].proposerPan.value.toUpperCase());
                }
            }

            this.totalInsureDetails = [];
            for (let i = 0; i < this.insurePersons.length; i++) {
                this.totalInsureDetails.push({
                    'Address': {
                        'Address': {
                            'AddressLine1': this.insurerData[0].proposerAddress,
                            'AddressLine2': this.insurerData[0].proposerAddress2 == null || this.insurerData[0].proposerAddress2 == undefined ? '' : this.insurerData[0].proposerAddress2,
                            'AddressLine3': this.insurerData[0].proposerAddress3 == null || this.insurerData[0].proposerAddress3 == undefined ? '' : this.insurerData[0].proposerAddress3,
                            'CountryCode': this.insurerData[0].proposerCountry,
                            'District': this.insurerData[0].proposerDistrict,
                            'PinCode': this.insurerData[0].proposerPincode,
                            'proposerCityName': this.insurerData[0].proposerCityName,
                            'TownCode': this.insurerData[0].proposerCity,
                            'StateCode': this.insurerData[0].proposerStateIdP,
                        }
                    },
                    'proposerMobile': this.insurerData[i].proposerMobile,
                    'FamilySize': this.insurerData[i].proposerFamilySize,
                    'Age': this.insurerData[i].proposerAge,
                    'BirthDate': this.datepipe.transform(this.insurerData[i].proposerDob, 'y-MM-dd'),
                    'ClientCode': this.insurerData[i].ClientCode,
                    'maritalStatusName': this.insurerData[i].maritalStatusName,
                    'proposerrelationshipName': this.insurerData[i].proposerrelationshipName,
                    "ContactInformation": {
                        "ContactNumber": {
                            "ContactNumber": {
                                "Number": this.insurerData[i].proposerMobile
                            }
                        },
                        "Email": this.insurerData[i].proposerEmail,
                    },
                    'Dependants': '',
                    'FirstName': this.insurerData[i].proposerFirstname,
                    'GenderCode': this.insurerData[i].proposerGender,
                    'GstinNumber': this.insurerData[i].proposerGst == null ? '': this.insurerData[i].proposerGst,
                    'Height': this.insurerData[i].proposerHeight,
                    'IDProofNumber': this.insurerData[i].proposerIdProofIdP == null ? '': this.insurerData[i].proposerIdProofIdP,
                    'IDProofTypeCode': this.insurerData[i].proposerIdProof  == null ? '': this.insurerData[i].proposerIdProof,
                    'LastName': this.insurerData[i].proposerLastname,
                    'type': this.insurerData[i].type,
                    'AnnualIncome': this.insurerData[i].proposerAnnualIncome == undefined ? 0 : (this.insurerData[i].proposerAnnualIncome ? this.insurerData[i].proposerAnnualIncome : 0) ,
                    'LifeStyleHabits': {
                        'BeerBottle': this.insurerData[i].BeerBottle,
                        'LiquorPeg': this.insurerData[i].LiquorPeg,
                        'Pouches': this.insurerData[i].Pouches,
                        'Smoking': this.insurerData[i].Smoking,
                        'WineGlass': this.insurerData[i].WineGlass
                    },
                    'MaritalStatusCode': this.insurerData[i].maritalStatus,
                    'MiddleName': this.insurerData[i].proposerMidname == null ? '': this.insurerData[i].proposerMidname,
                    'NationalityCode': 'IN',
                    'OccuptionCode': this.insurerData[i].Proposeroccupation,
                    'ProposeroccupationName': this.insurerData[i].ProposeroccupationName,
                    'PreviousInsurer': {
                        'InceptionDate': this.insurerData[i].PolicyStartDate == null ? '': this.insurerData[i].PolicyStartDate ,
                        'EndDate': this.insurerData[i].PolicyEndDate == null ? '' : this.insurerData[i].PolicyEndDate,
                        'PreviousInsurerCode': this.insurerData[i].PreviousInsurer,
                        'PreviousPolicyNumber': this.insurerData[i].PreviousPolicyNumber,
                        'SumInsured': this.insurerData[i].SumInsured,
                        'QualifyingAmount': this.insurerData[i].QualifyingAmount,
                        'WaivePeriod': this.insurerData[i].WaivePeriod,
                        'Remarks': this.insurerData[i].Remarks
                    },
                    'Product': {
                        'Product': [{

                        }]
                    },
                    'ProfessionCode': this.insurerData[i].ProffessionList,
                    'RelationshipCode': this.insurerData[i].proposerrelationship,
                    'TitleCode': this.insurerData[i].proposerTitle,
                    'Weight': this.insurerData[i].proposerWeight
                });
            }
            console.log(this.totalInsureDetails,'kjhgfhj');
            if(this.insureArray['controls'].items['controls'][0]['controls'].proposerAge.value > 55) {
                this.insureArray['controls'].items['controls'][0]['controls'].insurerDobError.value = 'Age between 18 to 55';
            } else {
                this.insureArray['controls'].items['controls'][0]['controls'].insurerDobError.value = '';
            }
            let ageValidate = [];
            for (let i = 0; i< this.insurerData.length; i++){
                if (this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.value  != '') {
                    ageValidate.push(1);

                } else{
                    ageValidate.push(0);
                }
            }
            let bmiValue;
            bmiValue = false;
            for (let i = 0; i< this.insurerData.length; i++){
                let height = this.insureArray['controls'].items['controls'][i]['controls'].proposerHeight.value;
                let heighrCal = (height / 100) * (height / 100);
                let weight = this.insureArray['controls'].items['controls'][i]['controls'].proposerWeight.value;
                let BMI = weight / heighrCal;
                if (this.insureArray['controls'].items['controls'][i]['controls'].proposerAge.value > 0 && this.insureArray['controls'].items['controls'][i]['controls'].proposerAge.value <= 15) {
                    if (BMI >= 12 && BMI <= 39) {
                            bmiValue = true;
                        } else {
                        bmiValue = false;
                    }
                }

                if (this.insureArray['controls'].items['controls'][i]['controls'].proposerAge.value  >=16) {
                    if (BMI >= 18 && BMI <= 28.99) {
                        bmiValue = true;
                    } else {
                        bmiValue = false;
                    }
                }
            }


            if(!ageValidate.includes(1)){
                if (this.titleValidation) {
                    let valid;

                    for (let i = 0; i< this.insurerData.length; i++){
                        valid = true;
                        if (this.insureArray['controls'].items['controls'][i]['controls'].BeerBottle.value >0 && this.insureArray['controls'].items['controls'][i]['controls'].WineGlass.value >0 && this.insureArray['controls'].items['controls'][i]['controls'].LiquorPeg.value >0) {
                            valid = false;
                            this.toastr.error('If you have all the drinking Habits,Sorry you are unable to purchase the policy');
                        } else if(this.insureArray['controls'].items['controls'][id]['controls'].Smoking.value >10){
                            valid = false;
                            this.toastr.error('As per your smoking count more than 10 per day unable to purchase the policy in online');
                        } else if(this.insureArray['controls'].items['controls'][id]['controls'].LiquorPeg.value >9){
                            valid = false;
                            this.toastr.error('As per your LiquorPeg count more than 9 per week unable to purchase the policy in online');
                        }   else if(this.insureArray['controls'].items['controls'][id]['controls'].Pouches.value >7){
                            valid = false;
                            this.toastr.error('As per your Pouches count more than 7 per day unable to purchase the policy in online');
                        } else if(this.insureArray['controls'].items['controls'][id]['controls'].WineGlass.value >6){
                            valid = false;
                            this.toastr.error('As per your WineGlass count more than 6 per week unable to purchase the policy in online');
                        } else if(this.insureArray['controls'].items['controls'][id]['controls'].BeerBottle.value >10){
                            valid = false;
                            this.toastr.error('As per your BeerBottle count more than 10 per week unable to purchase the policy in online');
                        }
                    }

                    let proofValidate = [];
                    for (let i = 0; i< this.insurerData.length; i++){
                        if (this.insureArray['controls'].items['controls'][i]['controls'].proposerIdProof.value != '') {
                            if (this.insureArray['controls'].items['controls'][i]['controls'].proposerIdProofIdP.value == '') {
                                this.insureArray['controls'].items['controls'][i]['controls'].insurerIdProofError.patchValue('Please enter id proof');
                                proofValidate.push(1);
                            } else{
                                this.insureArray['controls'].items['controls'][i]['controls'].insurerIdProofError.patchValue('');
                                proofValidate.push(0);
                            }
                        }

                    }

                    if(valid) {
                         if(bmiValue){
                             console.log(proofValidate, 'proofValidate122');

                             if(!proofValidate.includes(1)){

                                 stepper.next();
                                 this.topScroll();

                                 //mobile view
                                 this.nextStep();
                                 this.appolloMobileTrue1 = false;
                                 this.appolloMobileTrue2 = false;
                             } else {
                                 this.toastr.error('Please enter id proof');
                             }

                        } else {
                                 this.toastr.error('BMI Range should be greater than 12 and less than 39 or greater than 18 and less than 28 ');

                         }

                    }

                    // if (sessionStorage.proposerAge >= 18) {
                    //     stepper.next();
                    //     this.topScroll();
                    // } else {
                    //     this.toastr.error('Insurer age should be 18 or above');
                    // }
                } else if (this.titleValidation == false) {
                    stepper.next();
                    console.log(this.totalInsureDetails, ' this.totalInsureDetails ');

                    this.topScroll();
                }
            }

        }
        if(this.insurePersons.length == 1) {
            this.sameRelationship = this.insureArray['controls'].items['controls'][0]['controls'].proposerrelationship.value;
        }
    }


    //Create Appollo-Munich Details
    proposal(stepper) {
        let clientData = this.totalInsureDetails.slice(1);
      const data  = {
            'enquiry_id': this.getFamilyDetails.enquiry_id,
            'product_id': this.buyProductdetails.product_id,
          'plan_name': this.buyProductdetails.product_name,
          'sum_insured_amount': this.buyProductdetails.suminsured_amount,
            'proposal_id': sessionStorage.appollo_health_proposal_id == '' || sessionStorage.appollo_health_proposal_id == undefined ? '' : sessionStorage.appollo_health_proposal_id,
            'user_id' : this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
            'group_name': this.getFamilyDetails.name,
            'ProposalCaptureServiceRequest': {
                'Prospect': {
                    'Application': {
                        'NomineeAddress': {
                            'AddressLine1': this.nomineeData.nomineeAddress,
                            'AddressLine2': this.nomineeData.nomineeAddress2 == null ? '' : this.nomineeData.nomineeAddress2,
                            'AddressLine3': this.nomineeData.nomineeAddress3 == null ? '' : this.nomineeData.nomineeAddress3,
                            'CountryCode': this.nomineeData.nomineeCountry == null ? '' : this.nomineeData.nomineeCountry,
                            'District': this.nomineeData.nomineeDistrict == null ? '' : this.nomineeData.nomineeDistrict,
                            'PinCode': this.nomineeData.nomineePincode,
                            'StateCode': this.nomineeData.nomineeStateId,
                            'TownCode': this.nomineeData.nomineeCity
                        },
                        'NomineeName': this.nomineeData.nomineeName,
                        'NomineeTitleCode': this.nomineeData.nomineeTitle,
                        'RelationToNomineeCode': this.nomineeData.nomineeRelationship,
                        'Proposer': {
                            'Address': {
                                'Address': {
                                    'AddressLine1': this.proposer.controls['proposerAddress'].value,
                                    'AddressLine2': this.proposer.controls['proposerAddress2'].value == null ? '' : this.proposer.controls['proposerAddress2'].value,
                                    'AddressLine3': this.proposer.controls['proposerAddress3'].value == null ? '' :this.proposer.controls['proposerAddress3'].value,
                                    'CountryCode': this.proposer.controls['proposerCountry'].value == null ? '' : this.proposer.controls['proposerCountry'].value ,
                                    'District': this.proposer.controls['proposerDistrict'].value == null ? '' : this.proposer.controls['proposerDistrict'].value,
                                    'PinCode':this.proposer.controls['proposerPincode'].value,
                                    'StateCode': this.proposer.controls['proposerStateIdP'].value,
                                    'TownCode': this.proposer.controls['proposerCity'].value
                                }
                            },
                            'BirthDate': this.datepipe.transform(this.proposerData.proposerDob, 'y-MM-dd'),
                            'ClientCode': this.proposerData.ClientCode,
                            'ContactInformation': {
                                'ContactNumber': {
                                    'ContactNumber': {
                                        'Number':this.proposer.controls['proposerMobile'].value
                                    }
                                },
                                'Email': this.proposer.controls['proposerEmail'].value
                            },
                            'FirstName': this.proposer.controls['proposerFirstname'].value,
                            'GenderCode': this.proposer.controls['proposerGender'].value,
                            'GstinNumber':this.proposer.controls['proposerGst'].value == null ? '':  this.proposer.controls['proposerGst'].value,
                            'IDProofNumber': this.proposer.controls['proposerIdProofIdP'].value == null ? '':  this.proposer.controls['proposerIdProofIdP'].value ,
                            'IDProofTypeCode': this.proposer.controls['proposerIdProof'].value == null ? '':  this.proposer.controls['proposerIdProof'].value,
                            'LastName': this.proposer.controls['proposerLastname'].value == null ? '':  this.proposer.controls['proposerLastname'].value,
                            'MaritalStatusCode': this.proposer.controls['maritalStatus'].value,
                            'MiddleName': this.proposer.controls['proposerMidname'].value == null ? '':  this.proposer.controls['proposerMidname'].value,
                            'RelationshipCode': this.proposer.controls['proposerrelationship'].value == null ? '': this.proposer.controls['proposerrelationship'].value,
                            'TitleCode': this.proposer.controls['proposerTitle'].value
                        }
                    },

                    'Client': {
                        'Address': {
                            'Address': {
                                'AddressLine1': this.totalInsureDetails[0].Address.Address.AddressLine1,
                                'AddressLine2': this.totalInsureDetails[0].Address.Address.AddressLine2 == null ? '' : this.totalInsureDetails[0].Address.Address.AddressLine2,
                                'AddressLine3': this.totalInsureDetails[0].Address.Address.AddressLine3  == null ? '' : this.totalInsureDetails[0].Address.Address.AddressLine3,
                                'CountryCode': 'IN',
                                'District': this.totalInsureDetails[0].Address.Address.District == null ? '' : this.totalInsureDetails[0].Address.Address.District,
                                'PinCode': this.totalInsureDetails[0].Address.Address.PinCode,
                                'StateCode': this.totalInsureDetails[0].Address.Address.StateCode,
                                'TownCode': this.totalInsureDetails[0].Address.Address.TownCode
                            }
                        },
                        'Age': this.totalInsureDetails[0].Age,
                        'AnnualIncome':this.totalInsureDetails[0].proposerAnnualIncome == undefined?  this.insureArray['controls'].items['controls'][0]['controls'].proposerAnnualIncome.value : this.insureArray['controls'].items['controls'][0]['controls'].proposerAnnualIncome.value,
                        'BirthDate': this.datepipe.transform(this.totalInsureDetails[0].BirthDate, 'y-MM-dd'),
                        'ClientCode': 'PolicyHolder',
                        'ContactInformation': {
                            'ContactNumber': {
                                'ContactNumber': {
                                    'Number': this.totalInsureDetails[0].ContactInformation.ContactNumber.ContactNumber.Number
                                }
                            },
                            'Email': this.totalInsureDetails[0].ContactInformation.Email
                        },
                        'Dependants': {
                                'Client' : clientData
                            },
                        'FamilySize': this.totalInsureDetails[0].FamilySize,
                        'FirstName': this.totalInsureDetails[0].FirstName,
                        'GenderCode': this.totalInsureDetails[0].GenderCode,
                        'GstinNumber': this.totalInsureDetails[0].GstinNumber == null ? '':  this.totalInsureDetails[0].GstinNumber,
                        'Height': this.totalInsureDetails[0].Height,
                        'IDProofNumber': this.totalInsureDetails[0].IDProofNumber == null ? '':  this.totalInsureDetails[0].IDProofNumber,
                        'IDProofTypeCode': this.totalInsureDetails[0].IDProofTypeCode == null ? '':  this.totalInsureDetails[0].IDProofTypeCode,
                        'LastName': this.totalInsureDetails[0].LastName,
                        'MaritalStatusCode': this.totalInsureDetails[0].MaritalStatusCode,
                        'MiddleName': this.totalInsureDetails[0].MiddleName == null ? '':  this.totalInsureDetails[0].MiddleName,
                        'NationalityCode': this.totalInsureDetails[0].NationalityCode,
                        'maritalStatusName': this.totalInsureDetails[0].maritalStatusName,
                        'proposerrelationshipName': this.totalInsureDetails[0].proposerrelationshipName,
                        // 'AnnualIncome':  this.totalInsureDetails[0].proposerAnnualIncome,
                        'OccuptionCode': this.totalInsureDetails[0].OccuptionCode,
                            'PreviousInsurer': {
                                'InceptionDate': this.totalInsureDetails[0].PreviousInsurer.InceptionDate == null ? '' :  this.totalInsureDetails[0].PreviousInsurer.InceptionDate ,
                                'EndDate': this.totalInsureDetails[0].PreviousInsurer.EndDate == null  ? '' : this.totalInsureDetails[0].PreviousInsurer.EndDate,
                                'PreviousInsurerCode': this.totalInsureDetails[0].PreviousInsurer.PreviousInsurerCode,
                                'PreviousPolicyNumber': this.totalInsureDetails[0].PreviousInsurer.PreviousPolicyNumber,
                                'SumInsured': this.totalInsureDetails[0].PreviousInsurer.SumInsured,
                                'QualifyingAmount': this.totalInsureDetails[0].PreviousInsurer.QualifyingAmount,
                                'WaivePeriod': this.totalInsureDetails[0].PreviousInsurer.WaivePeriod,
                                'Remarks': this.totalInsureDetails[0].PreviousInsurer.Remarks
                            },

                        'LifeStyleHabits': {
                            'BeerBottle': this.totalInsureDetails[0].LifeStyleHabits.BeerBottle,
                            'LiquorPeg': this.totalInsureDetails[0].LifeStyleHabits.LiquorPeg,
                            'Pouches': this.totalInsureDetails[0].LifeStyleHabits.Pouches,
                            'Smoking': this.totalInsureDetails[0].LifeStyleHabits.Smoking,
                            'WineGlass': this.totalInsureDetails[0].LifeStyleHabits.WineGlass
                        },
                        'Product': {
                            'Product': [{
                                'ClientCode': 'PolicyHolder',
                                'ProductCode': this.buyProductdetails.product_code,
                                'SumAssured': this.buyProductdetails.suminsured_amount

                            }]
                        },
                        'ProfessionCode': this.totalInsureDetails[0].ProfessionCode,
                        'RelationshipCode': this.totalInsureDetails[0].RelationshipCode,
                        'TitleCode': this.totalInsureDetails[0].TitleCode,
                        'Weight': this.totalInsureDetails[0].Weight
                    },
                    'MedicalInformations': this.proposerData.MedicalInformations == null ? '': this.proposerData.MedicalInformations,
                }
            }


        };

        if (clientData == ''){
            delete data.ProposalCaptureServiceRequest.Prospect.Client.Dependants.Client
        }


        this.settings.loadingSpinner = true;
        this.proposalservice.apollomunichProposal(data).subscribe(
            (successData) => {
                this.proposalSuccess(successData,stepper);
            },
            (error) => {
                this.proposalFailure(error);
            }
        );

    }

    public proposalSuccess(successData,stepper) {
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {
            stepper.next();
            this.nextStep();
            this.topScroll();
            this.toastr.success('Proposal created successfully!!');
            this.summaryData = successData.ResponseObject;
            sessionStorage.summaryData = JSON.stringify(this.summaryData);
            this.RediretUrlLink = this.summaryData.PaymentURL;
            this.proposalId = this.summaryData.ProposalId;
            this.proposerFormData = this.proposer.value;
            this.nomineeFormData = this.nomineeDetails.value;
            this.insuredFormData = this.insurerData;
            sessionStorage.proposerFormData = JSON.stringify(this.proposerFormData);
            sessionStorage.nomineeFormData = JSON.stringify(this.nomineeFormData);
            sessionStorage.insuredFormData = JSON.stringify(this.insuredFormData);
            sessionStorage.appollo_health_proposal_id = this.proposalId;
            this.pos_status = this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4;
            this.createdDate = new Date();


            //mobile view
            this.appolloMobileTrue4 = false;
        }
        else{
            this.toastr.error(successData.ErrorObject);
        }
    }

//Summary residence detail
    public proposalFailure(error) {
        this.settings.loadingSpinner = false;
    }
    changeid(){
        this.proposer.controls['proposerIdProofName'].patchValue(this.IdProofListss[this.proposer.controls['proposerIdProof'].value]);
        console.log( this.proposer.controls['proposerIdProofName'].value,'lllllll');
    }
    changegenderId(){
        this.proposer.controls['proposerTitleName'].patchValue(this.titleCodeList[this.proposer.controls['proposerTitle'].value]);

    }
    changeDistrict(){
        // alert('innn');
        this.proposer.controls['proposerDistrictName'].patchValue(this.AppolloDistrictList[this.proposer.controls['proposerDistrict'].value]);
    console.log(this.proposer.controls['proposerDistrict'].value, 'proposerDistrict');
    console.log(this.proposer.controls['proposerDistrictName'].value, 'districtname');
    }
    changeMarital(){
        this.proposer.controls['maritalStatusName'].patchValue(this.maritalDetail[this.proposer.controls['maritalStatus'].value]);

    }
    changeCity(){
        this.proposer.controls['proposerCityName'].patchValue(this.AppolloCityList[this.proposer.controls['proposerCity'].value]);

    }
    changeNomineeDistrict(){
        this.nomineeDetails.controls['nomineeDistrictName'].patchValue(this.nomineeAppolloDistrictList[this.nomineeDetails.controls['nomineeDistrict'].value]);
    }
    changeNomineeCity(){
        this.nomineeDetails.controls['nomineeCityName'].patchValue(this.nomineeAppolloCityLis[this.nomineeDetails.controls['nomineeCity'].value]);
    }
    changeNomineeRelation(){
        this.nomineeDetails.controls['nomineeRelationshipName'].patchValue(this.relationshipList[this.nomineeDetails.controls['nomineeRelationship'].value]);
    }
    changeNomineegenderId(){
        this.nomineeDetails.controls['nomineeTitleName'].patchValue(this.titleCodeList[this.nomineeDetails.controls['nomineeTitle'].value]);

    }
    payLater() {
        // alert('innnn');
        let clientData = this.totalInsureDetails.slice(1);
        const data  = {
            'enquiry_id': this.getFamilyDetails.enquiry_id,
            'product_id': this.buyProductdetails.product_id,
            'plan_name': this.buyProductdetails.product_name,
            'sum_insured_amount': this.buyProductdetails.suminsured_amount,
            'created-date': this.createdDate,
            'company_logo': this.buyProductdetails.company_logo,
            'FinalPremium': this.summaryData.FinalPremium,
            'Tax': this.summaryData.Tax,
            'BasePremium': this.summaryData.BasePremium,
            'proposal_id': sessionStorage.appollo_health_proposal_id == '' || sessionStorage.appollo_health_proposal_id == undefined ? '' : sessionStorage.appollo_health_proposal_id,
            'user_id' : this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
            'group_name': this.getFamilyDetails.name,
            'paymentlink-date': '',
            'ProposalCaptureServiceRequest': {
                'Prospect': {
                    'Application': {
                        'NomineeAddress': {
                            'AddressLine1': this.nomineeData.nomineeAddress,
                            'AddressLine2':  this.nomineeData.nomineeAddress2 == null ? '' : this.nomineeData.nomineeAddress2,
                            'AddressLine3': this.nomineeData.nomineeAddress3 == null ? '' : this.nomineeData.nomineeAddress3,
                            'CountryCode': this.nomineeData.nomineeCountry == null ? '' : this.nomineeData.nomineeCountry,
                            'District': this.nomineeData.nomineeDistrict == null ? '' : this.nomineeData.nomineeDistrict,
                            'PinCode': this.nomineeData.nomineePincode,
                            'StateCode': this.nomineeData.nomineeStateId,
                            'nomineeDistrictName': this.nomineeData.nomineeDistrictName,
                            'TownCode': this.nomineeData.nomineeCity,
                            'nomineeCityName': this.nomineeData.nomineeCityName
                        },
                        'NomineeName': this.nomineeData.nomineeName,
                        'NomineeTitleCode': this.nomineeData.nomineeTitle,
                        'RelationToNomineeCode': this.nomineeData.nomineeRelationship,
                        'nomineeRelationshipName': this.nomineeData.nomineeRelationshipName,
                        'Proposer': {
                            'Address': {
                                'Address': {
                                    'AddressLine1': this.proposer.controls['proposerAddress'].value,
                                    'AddressLine2': this.proposer.controls['proposerAddress2'].value == null ? '' : this.proposer.controls['proposerAddress2'].value,
                                    'AddressLine3': this.proposer.controls['proposerAddress3'].value == null ? '' :this.proposer.controls['proposerAddress3'].value,
                                    'CountryCode': this.proposer.controls['proposerCountry'].value == null ? '' : this.proposer.controls['proposerCountry'].value ,
                                    'District': this.proposer.controls['proposerDistrict'].value == null ? '' : this.proposer.controls['proposerDistrict'].value,
                                    'PinCode':this.proposer.controls['proposerPincode'].value,
                                    'CityName':this.proposer.controls['proposerCityName'].value,
                                    'DistrictName':this.proposer.controls['proposerDistrictName'].value,
                                    'StateCode': this.proposer.controls['proposerStateIdP'].value,
                                    'TownCode': this.proposer.controls['proposerCity'].value
                                }
                            },
                            'BirthDate': this.datepipe.transform(this.proposerData.proposerDob, 'y-MM-dd'),
                            'ClientCode': this.proposerData.ClientCode,
                            'ContactInformation': {
                                'ContactNumber': {
                                    'ContactNumber': {
                                        'Number':this.proposer.controls['proposerMobile'].value
                                    }
                                },
                                'Email': this.proposer.controls['proposerEmail'].value
                            },
                            'FirstName': this.proposer.controls['proposerFirstname'].value,
                            'GenderCode': this.proposer.controls['proposerGender'].value,
                            'GstinNumber':this.proposer.controls['proposerGst'].value == null ? '':  this.proposer.controls['proposerGst'].value,
                            'IDProofNumber': this.proposer.controls['proposerIdProofIdP'].value == null ? '':  this.proposer.controls['proposerIdProofIdP'].value ,
                            'IDProofTypeCode': this.proposer.controls['proposerIdProof'].value == null ? '':  this.proposer.controls['proposerIdProof'].value,
                            'LastName': this.proposer.controls['proposerLastname'].value == null ? '':  this.proposer.controls['proposerLastname'].value,
                            'MaritalStatusCode': this.proposer.controls['maritalStatus'].value,
                            'MiddleName': this.proposer.controls['proposerMidname'].value == null ? '':  this.proposer.controls['proposerMidname'].value,
                            'RelationshipCode': this.proposer.controls['proposerrelationship'].value == null ? '': this.proposer.controls['proposerrelationship'].value,
                            'TitleCode': this.proposer.controls['proposerTitle'].value
                        }
                    },

                    'Client': {
                        'Address': {
                            'Address': {
                                'AddressLine1': this.totalInsureDetails[0].Address.Address.AddressLine1,
                                'AddressLine2': this.totalInsureDetails[0].Address.Address.AddressLine2 == null ? '' : this.totalInsureDetails[0].Address.Address.AddressLine2,
                                'AddressLine3': this.totalInsureDetails[0].Address.Address.AddressLine3  == null ? '' : this.totalInsureDetails[0].Address.Address.AddressLine3,
                                'CountryCode': 'IN',
                                'District': this.totalInsureDetails[0].Address.Address.District == null ? '' : this.totalInsureDetails[0].Address.Address.District,
                                'PinCode': this.totalInsureDetails[0].Address.Address.PinCode,
                                'StateCode': this.totalInsureDetails[0].Address.Address.StateCode,
                                'TownCode': this.totalInsureDetails[0].Address.Address.TownCode
                            }
                        },
                        'Age': this.totalInsureDetails[0].Age,
                        'AnnualIncome':this.totalInsureDetails[0].proposerAnnualIncome == undefined?  this.insureArray['controls'].items['controls'][0]['controls'].proposerAnnualIncome.value : this.insureArray['controls'].items['controls'][0]['controls'].proposerAnnualIncome.value,
                        'BirthDate': this.datepipe.transform(this.totalInsureDetails[0].BirthDate, 'y-MM-dd'),
                        'ClientCode': 'PolicyHolder',
                        'ContactInformation': {
                            'ContactNumber': {
                                'ContactNumber': {
                                    'Number': this.totalInsureDetails[0].ContactInformation.ContactNumber.ContactNumber.Number
                                }
                            },
                            'Email': this.totalInsureDetails[0].ContactInformation.Email
                        },
                        'Dependants': {
                            'Client' : clientData
                        },
                        'FamilySize': this.totalInsureDetails[0].FamilySize,
                        'FirstName': this.totalInsureDetails[0].FirstName,
                        'GenderCode': this.totalInsureDetails[0].GenderCode,
                        'GstinNumber': this.totalInsureDetails[0].GstinNumber == null ? '':  this.totalInsureDetails[0].GstinNumber,
                        'Height': this.totalInsureDetails[0].Height,
                        'IDProofNumber': this.totalInsureDetails[0].IDProofNumber == null ? '':  this.totalInsureDetails[0].IDProofNumber,
                        'IDProofTypeCode': this.totalInsureDetails[0].IDProofTypeCode == null ? '':  this.totalInsureDetails[0].IDProofTypeCode,
                        'LastName': this.totalInsureDetails[0].LastName,
                        'MaritalStatusCode': this.totalInsureDetails[0].MaritalStatusCode,
                        'MiddleName': this.totalInsureDetails[0].MiddleName == null ? '':  this.totalInsureDetails[0].MiddleName,
                        'NationalityCode': this.totalInsureDetails[0].NationalityCode,
                        'maritalStatusName': this.totalInsureDetails[0].maritalStatusName,
                        'proposerrelationshipName': this.totalInsureDetails[0].proposerrelationshipName,
                        // 'AnnualIncome':  this.totalInsureDetails[0].proposerAnnualIncome,
                        'OccuptionCode': this.totalInsureDetails[0].OccuptionCode,
                        'type': this.totalInsureDetails[0].type,
                        'PreviousInsurer': {
                            'InceptionDate': this.totalInsureDetails[0].PreviousInsurer.InceptionDate == null ? '' :  this.totalInsureDetails[0].PreviousInsurer.InceptionDate ,
                            'EndDate': this.totalInsureDetails[0].PreviousInsurer.EndDate == null  ? '' : this.totalInsureDetails[0].PreviousInsurer.EndDate,
                            'PreviousInsurerCode': this.totalInsureDetails[0].PreviousInsurer.PreviousInsurerCode,
                            'PreviousPolicyNumber': this.totalInsureDetails[0].PreviousInsurer.PreviousPolicyNumber,
                            'SumInsured': this.totalInsureDetails[0].PreviousInsurer.SumInsured,
                            'QualifyingAmount': this.totalInsureDetails[0].PreviousInsurer.QualifyingAmount,
                            'WaivePeriod': this.totalInsureDetails[0].PreviousInsurer.WaivePeriod,
                            'Remarks': this.totalInsureDetails[0].PreviousInsurer.Remarks
                        },

                        'LifeStyleHabits': {
                            'BeerBottle': this.totalInsureDetails[0].LifeStyleHabits.BeerBottle,
                            'LiquorPeg': this.totalInsureDetails[0].LifeStyleHabits.LiquorPeg,
                            'Pouches': this.totalInsureDetails[0].LifeStyleHabits.Pouches,
                            'Smoking': this.totalInsureDetails[0].LifeStyleHabits.Smoking,
                            'WineGlass': this.totalInsureDetails[0].LifeStyleHabits.WineGlass
                        },
                        'Product': {
                            'Product': [{
                                'ClientCode': 'PolicyHolder',
                                'ProductCode': this.buyProductdetails.product_code,
                                'SumAssured': this.buyProductdetails.suminsured_amount

                            }]
                        },
                        'ProfessionCode': this.totalInsureDetails[0].ProfessionCode,
                        'RelationshipCode': this.totalInsureDetails[0].RelationshipCode,
                        'TitleCode': this.totalInsureDetails[0].TitleCode,
                        'Weight': this.totalInsureDetails[0].Weight
                    },
                    'MedicalInformations': this.proposerData.MedicalInformations == null ? '': this.proposerData.MedicalInformations,
                }
            }


        };

        console.log(data, 'payyyyy.......');
        console.log(this.nomineeData.nomineeAddress2,'latttttttttttttttttttttttt');

        this.settings.loadingSpinner = true;
        this.proposalservice.proposalPayLater(data).subscribe(
            (successData) => {
                this.payLaterSuccess(successData);
            },
            (error) => {
                this.payLaterFailure(error);
            }
        );

    }
    public payLaterSuccess(successData) {
        if (successData.IsSuccess) {
            this.settings.loadingSpinner = false;
            this.toastr.success(successData.ResponseObject);
            this.saveEdit();
        } else {
            // this.toastr.error('sorry!');
        }
    }

    public payLaterFailure(successData) {
    }
    saveEdit(){
        this.router.navigate(['/home']);

    }
    // get request
    getBackRequest() {
        const data = {
            'platform': 'web',
            'user_id': '0',
            'role_id': '4',
            'proposal_id': this.proposal_Id
        };
        this.proposalservice.proposalGetRequest(data).subscribe(
            (successData) => {
                this.getBackResSuccess(successData);
            },
            (error) => {
                this.getBackResFailure(error);
            }
        );
    }
    public getBackResSuccess(successData) {
        if (successData.IsSuccess) {
            this.requestDetails = successData.ResponseObject;
            console.log(this.requestDetails, 'requestDetailsrequestDetails');
            this.pos_status = this.requestDetails.role_id;
            console.log(this.pos_status , 'requestDetailsrequestDetails');
            this.proposerList = this.requestDetails.ProposalCaptureServiceRequest.Prospect.Application.Proposer;
            this.nomineeList = this.requestDetails.ProposalCaptureServiceRequest.Prospect.Application;
            console.log(this.nomineeList.nomineeAddress2 , 'nomineeaddress 2' )
            console.log(this.proposerList, 'asdadsd');
            console.log(this.proposerList, 'esded');
            console.log(this.nomineeList, 'nominee details');
            this.proposallst = this.requestDetails.ProposalCaptureServiceRequest;
            console.log(this.requestDetails.ProposalCaptureServiceRequest, 'proposl');
            console.log(this.proposallst, 'proposl');
            console.log(this.requestDetails.ProposalCaptureServiceRequest.Prospect, 'proposl2');
            console.log(this.requestDetails.ProposalCaptureServiceRequest.Prospect.Application, 'proposl2');
            this.requestClientDetails = this.requestDetails.ProposalCaptureServiceRequest.Prospect.Client;
            console.log(this.requestClientDetails, 'requestInsuredListrequestInsuredList');
            console.log(this.requestDetails.ProposalCaptureServiceRequest.Prospect.Client, 'this.requestDetails.ProposalCaptureServiceRequest.Prospect.Client');
            this.insuredFormDataRequest.push(this.requestClientDetails);
            console.log(this.insuredFormDataRequest, 'requestInsuredListrequestInsuredList');
        } else {
        }
    }
    public getBackResFailure(successData) {
    }
}
