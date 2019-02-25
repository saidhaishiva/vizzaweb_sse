import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray, FormControl} from '@angular/forms';
import {MatStepper} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DatePipe} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {Settings} from '../../app.settings.model';
import {AppSettings} from '../../app.settings';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {MomentDateAdapter } from '@angular/material-moment-adapter';
import {ValidationService} from '../../shared/services/validation.service';
import {ActivatedRoute} from '@angular/router';
import {HealthService} from '../../shared/services/health.service';
import {AuthService} from '../../shared/services/auth.service';
import {TravelService} from '../../shared/services/travel.service';


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
  selector: 'app-travel-reliance-proposal',
  templateUrl: './travel-reliance-proposal.component.html',
  styleUrls: ['./travel-reliance-proposal.component.scss'],
  providers: [

    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class TravelRelianceProposalComponent implements OnInit {
  public personal: FormGroup;
  public relianceInsuredTravel: FormGroup;
  public riskDetails: FormGroup;
  public settings: Settings;
  public minDate: any;
  public webhost: any;

  public getTravelPremiumList: any;
  public getallTravelPremiumList: any;
  public groupName: any;
  public getFamilyDetails: any;
  public insuredTravelPerson: any;
  public insurePersons: any;
  public items: any;

  public sameField: any;
  public inputReadonly: any;
  public inputBurglaryReadonly: any;
  public inputSponsorReadonly: any;
  public common: any;
  public proposalPArea: any;
  public proposalRArea: any;
  public proposalBArea: any;
  public proposalCArea: any;
  public proposalDArea: any;
  public getComAddressList: any;
  public getResAddressList: any;
  public getBurglaryAddressList: any;
  public getSponsorAddressList: any;
  public getCompanyAddressList: any;
  public getDoctorAddressList: any;
  public setPincode: any;
  public pin: any;
  public title: any;

  public personalAge: any;
  public nomineeAge: any;
  public dobError: any;
  public agecal: any;
  public getAge: any;
  public getDays: any;
  public arr: any;
  public today: any;
  public maxDate: any;
  public sufferingError: any;
  public startDateError: any;
  public endDateError: any;
  public riskDOBDateError: any;
  public riskstartDate: any;
  public riskdaysBookingCount: any;
  public riskendDate: any;
  public riskdaysCount: any;

  public insurerData: any;
  public totalInsureDetails: any;
  public totalInsureChildDetails: any;

  public PersonalOccupation: any;
  public Relationship: any;
  public Nationality: any;
  public Marital: any;
  public VisitingCountry: any;
  public PreExistingIllness: any;
  public SportsActivities: any;
  public CoverType: any;

  public overseas :any;
  public riskIsResidingInIndiaTrue :any;
  public riskSportsActivitiesTrue :any;
  public VisitingListTure :any;
  public riskCoverageTypeTrue :any;
  public riskMaxDaysPerTripTrue :any;
  public riskNoOfYearsTrue :any;
  public riskSeniorCitizenTrue :any;
  public TravelCoverageTrue :any;
  public TravelStandardLimitTrue :any;
  public TravelSilverPlanTrue :any;
  public TravelGoldPlanTrue :any;
  public TravelPlatinumPlanTrue :any;
  public TravelBasicPlanTrue :any;
  public TravelElitePlanTrue :any;
  public TravelPlusPlanTrue :any;

  public getStepper1: any;
  public getStepper2: any;
  public personalData :any;

  constructor(public route: ActivatedRoute, public datepipe: DatePipe, public validation: ValidationService, private toastr: ToastrService, public appSettings: AppSettings, public dialog: MatDialog,
              public config: ConfigurationService, public fb: FormBuilder, public auth: AuthService, public http: HttpClient, public travelservice: TravelService) {
    const minDate = new Date();
    this.minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
    let today = new Date();
    this.today = new Date(today.getFullYear(), today.getMonth(), today.getDate() +1);
    this.settings = this.appSettings.settings;
    this.settings.HomeSidenavUserBlock = false;
    this.settings.sidenavIsOpened = false;
    this.settings.sidenavIsPinned = false;
    this.webhost = this.config.getimgUrl();
    this.personal = this.fb.group({
      personalTitle: ['', Validators.required],
      personalFirstname: ['', Validators.required],
      personalMidname: '',
      personalLastname: ['', Validators.required],
      personalDob: ['', Validators.compose([Validators.required])],
      personalGender: ['', Validators.compose([Validators.required])],
      maritalStatus: ['', Validators.required],
      occupation: ['', Validators.required],
      personalAadhar: ['', Validators.compose([Validators.minLength(12)])],
      personalPan: ['', Validators.compose([Validators.minLength(10)])],
      personalEmail: ['', Validators.compose([Validators.required, Validators.pattern("^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$")])],
      personalMobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
      personalPhone: '',
      nationality: ['', Validators.required],
      personalGst: ['', Validators.compose([Validators.minLength(15)])],
      gstin: '',
      relatedParty: '',
      groupCorpID: '',

      personalAddress: ['', Validators.required],
      personalAddress2: ['', Validators.required],
      personalAddress3: '',
      personalPincode: ['', Validators.required],
      personalCity: ['', Validators.required],
      personalArea: ['', Validators.required],
      personalDistrict: ['', Validators.required],
      personalState: ['', Validators.required],
      personalNearestLandMark: '',
      personalCountry: '',

      residenceAddress: ['', Validators.required],
      residenceAddress2: ['', Validators.required],
      residenceAddress3: '',
      residencePincode: ['', Validators.required],
      residenceCity: ['', Validators.required],
      residenceArea: ['', Validators.required],
      residenceDistrict: ['', Validators.required],
      residenceState: ['', Validators.required],
      residenceNearestLandMark: '',
      residenceCountry: '',

      personalUniversityName: '',
      personalUniversityEmail: ['', Validators.compose([Validators.pattern("^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$")])],
      personalUniversityMobileNo: '',
      personalUniversityPhoneNo: '',
      personalUniversityFax: '',
      personalUniversityCity: '',
      personalUniversityState: '',
      personalUniversityCountry: '',

      personalBurglaryEmail: ['', Validators.compose([Validators.pattern("^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$")])],
      personalBurglaryMobileNo: '',
      personalBurglaryPhoneNo: '',
      personalBurglaryFax: '',
      personalBurglaryAddress: '',
      personalBurglaryAddress2: '',
      personalBurglaryAddress3: '',
      personalBurglaryPincode: '',
      personalBurglaryCity: '',
      personalBurglaryArea: '',
      personalBurglaryDistrict: '',
      personalBurglaryState: '',
      personalBurglaryNearestLandMark: '',
      personalBurglaryCountry: '',

      personalSponsorFullname: '',
      personalSponsorEmail: ['', Validators.compose([Validators.pattern("^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$")])],
      personalSponsorMobileNo: '',
      personalSponsorPhoneNo: '',
      personalSponsorAddress: '',
      personalSponsorPincode: '',
      personalSponsorCity: '',
      personalSponsorState: '',
      personalSponsorCountry: '',

      IsDoctorDetails: 'false',
      personalDoctorFullname: '',
      personalDoctorEmail: ['', Validators.compose([Validators.pattern("^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$")])],
      personalDoctorMobileNo: '',
      personalDoctorPhoneNo: '',
      personalDoctorFax: '',
      personalDoctorAddress: '',
      personalDoctorAddress2: '',
      personalDoctorAddress3: '',
      personalDoctorPincode: '',
      personalDoctorCity: '',
      personalDoctorArea: '',
      personalDoctorDistrict: '',
      personalDoctorState: '',
      personalDoctorNearestLandMark: '',
      personalDoctorCountry: '',


      personalCompanyFullname: '',
      personalCompanyEmail: ['', Validators.compose([Validators.pattern("^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$")])],
      personalCompanyMobileNo: '',
      personalCompanyPhoneNo: '',
      personalCompanyFax: '',
      personalCompanyAddress: '',
      personalCompanyAddress2: '',
      personalCompanyAddress3: '',
      personalCompanyPincode: '',
      personalCompanyCity: '',
      personalCompanyArea: '',
      personalCompanyDistrict: '',
      personalCompanyState: '',
      personalCompanyNearestLandMark: '',
      personalCompanyCountry: '',



      personalCityIdP: '',
      personalStateIdP: '',
      personalDistrictIdP: '',
      personalCityIdR: '',
      personalStateIdR: '',
      residenceDistrictIdR: '',
      personalCityIdB: '',
      personalStateIdB: '',
      residenceDistrictIdB: '',
      personalCityIdS: '',
      personalStateIdS: '',
      personalCityIdD: '',
      personalStateIdD: '',
      residenceDistrictIdD: '',
      personalCityIdC: '',
      personalStateIdC: '',
      residenceDistrictIdC: '',

      startDate: '',
      endDate: '',
      sameas: false,
      rolecd: 'PROPOSER',

    });

    this.riskDetails = this.fb.group({
      riskIndian: '',
      riskIsOverSeasCitizen: '',
      riskIsResidingInIndia:'',
      riskPermanentResidenceCountry: '',
      riskOCINumber: '',
      riskPassportIssuingCountry: '',
      riskIsInsuredOnImmigrantVisa: '',
      riskIsTravelInvolvesSportingActivities: '',
      riskSportsActivities: '',
      riskIsSufferingFromPEMC: '',
      riskPreExistDisease: '',
      riskIsVisitingUSACanada: '',
      riskDOB: '',
      riskVisitingCountries: '',
      riskstartDate: '',
      riskendDate: '',
      riskCoverageType: '',
      riskIsVisitingStudent: '',
      riskMaxDaysPerTrip: '',
      riskNoOfYears: '',
      riskSeniorCitizen: '',
      riskSeniorCitizenPlanID: '',
      TravelStandardLimited: '',

      TravelCoverageName:'',
      TravelCoverageDisplayName:'',
      TravelStandardLimitedPlan:'',
      TravelStandardDeductiblePlan:'',
      TravelIsSilverPlan:'',
      TravelSilverPlan:'',
      TravelIsGoldPlan:'',
      TravelGoldPlan:'',
      TravelIsPlatinumPlan:'',
      TravelPlatinumPlan:'',
      TravelIsBasicPlan:'',
      TravelBasicPlan:'',
      TravelIsElitePlan:'',
      TravelElitePlan:'',
      TravelIsPlusPlan:'',
      TravelPlusPlan:'',
      // TravelIsAllPlan:'',

    });

  }

  ngOnInit() {
    this.relianceOccupation();
    this.relainceRelation();
    this.relainceNationality();
    this.relainceMarital();
    this.relainceVisitingCountries();
    this.relaincePreExistingIllness();
    this.relainceSportsActivities();
    this.relainceCoverType();

    this.getTravelPremiumList = JSON.parse(sessionStorage.travelPremiumList);
    let allLists = JSON.parse(sessionStorage.allTravelPremiumLists);
    this.getallTravelPremiumList = allLists[sessionStorage.changedTabIndex];
    console.log(this.getallTravelPremiumList, 'this.getallTravelPremiumList');
    this.insuredTravelPerson = this.getTravelPremiumList.family_details;
    this.relianceInsuredTravel = this.fb.group({
      items: this.fb.array([])
    });
    for (let i = 0; i < this.insuredTravelPerson.length; i++) {
      this.items = this.relianceInsuredTravel.get('items') as FormArray;
      this.items.push(this.initItemRows());
      this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].type.patchValue(this.insuredTravelPerson[i].type);
    }
    this.sessionData();
  }

  initItemRows() {
    return this.fb.group(
        {
          rolecd: 'PRIMARY',
          personalTitle: ['', Validators.required],
          personalFirstname: ['', Validators.required],
          childFullname: ['', Validators.required],
          personalLastname: ['', Validators.required],
          personalMidname: '',
          personalGender: ['', Validators.compose([Validators.required])],
          InsDOB: ['', Validators.required],
          occupation: ['', Validators.required],
          personalEmail: ['', Validators.compose([Validators.required, Validators.pattern("^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$")])],
          relationship: ['', Validators.required],
          passport: ['', Validators.compose([Validators.minLength(10)])],
          personalMobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
          personalPhone1: '',
          VisitingCountries: '',

          IsUnderMedication: 'false',
          PreExistingIllness: '',
          SufferingSince: '',

          nomineeName: ['', Validators.required],
          nomineeRelationship: ['', Validators.required],

          InsuredAge: '',
          insurerDobError: '',
          insurerDobValidError: '',
          sameAsProposer: false,
          sameasreadonly: false,
          sameas: false,
        });
  }

  //Personal Details
  personalDetails(stepper: MatStepper, value) {
    this.personalData = value;
    sessionStorage.stepper1Details = '';
    sessionStorage.stepper1Details = JSON.stringify(value);
    if (this.personal.valid) {
      if (sessionStorage.personalAge >= 18) {
        stepper.next();
      }else {
        this.toastr.error('Proposer age should be 18 or above');
      }
    }
  }
  //Insure Details
  relianceInsureDetails(stepper: MatStepper, id, value, key) {
    console.log(this.insuredTravelPerson,'insuredTravelPerson');
    sessionStorage.stepper2Details = '';
    sessionStorage.stepper2Details = JSON.stringify(value);
    if (this.relianceInsuredTravel.valid) {
      this.insurerData = value.items;
      this.totalInsureDetails = [];
      for (let i = 0; i < this.insuredTravelPerson.length; i++) {
        this.totalInsureDetails.push({
          'RelationshipWithProposerID': this.insurerData[i].relationship,
          'PassportNumber': this.insurerData[i].passport,
          'NameofNominee': this.insurerData[i].nomineeName,
          'RelationshipWithNomineeID': this.insurerData[i].nomineeRelationship,
          'VisitingCountries': this.insurerData[i].VisitingCountries,
          'IsUnderMedication': this.insurerData[i].IsUnderMedication,
          'PreExistingIllness': this.insurerData[i].PreExistingIllness,
          'SufferingSince': this.insurerData[i].SufferingSince,
          'Salutation': this.insurerData[i].personalTitle,
          'ForeName': this.insurerData[i].personalFirstname,
          'LastName': this.insurerData[i].personalLastname,
          'MidName': this.insurerData[i].personalMidname,
          'Gender': this.insurerData[i].personalGender,
          'DateofBirth': this.datepipe.transform(this.insurerData[i].InsDOB, 'y-MM-dd'),
          'OccupationID': this.insurerData[i].occupation,
          'MobileNo': this.insurerData[i].personalMobile,
          'PhoneNo': this.insurerData[i].personalPhone1,
          'Email': this.insurerData[i].personalEmail
        })
      }
      this.totalInsureChildDetails = [];
      for(let j = 0; j < this.insuredTravelPerson.length; j++){
        if(this.insuredTravelPerson.type != 'self' && this.insuredTravelPerson.type != 'spouse'){
        this.totalInsureChildDetails.push({
          'childFullname': this.insurerData[j].childFullname,
          'ChildRelationID': this.insurerData[j].nomineeRelationship,
          'DOB': this.datepipe.transform(this.insurerData[j].InsDOB, 'y-MM-dd'),
          'PassportNo': this.insurerData[j].passport,
          'NomineeName': this.insurerData[j].nomineeName,
          'NomineeRelationshipID': this.insurerData[j].nomineeRelationship,
          'IsUnderMedication': this.insurerData[j].IsUnderMedication,
          'PreExistingMC': this.insurerData[j].PreExistingIllness,
          'SufferingSince': this.insurerData[j].SufferingSince
        })
        }
      }
    }
  }

  topScroll() {
    document.getElementById('main-content').scrollTop = 0;
  }

  changeGender() {
    if (this.personal.controls['personalTitle'].value == 'MR') {
      this.personal.controls['personalGender'].patchValue('Male');
    } else {
      this.personal.controls['personalGender'].patchValue('Female');
    }
  }

  insureChangeGender(index) {
    if (this.relianceInsuredTravel['controls'].items['controls'][index]['controls'].personalTitle.value == 'MR') {
      this.relianceInsuredTravel['controls'].items['controls'][index]['controls'].personalGender.patchValue('Male');
    } else {
      this.relianceInsuredTravel['controls'].items['controls'][index]['controls'].personalGender.patchValue('Female');
    }
  }

  // charactor validation
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
  addEvent(event, type) {
    this.maxDate = '';
    if (event.value != null) {
      let selectedDate = '';
      this.personalAge = '';
      let dob = '';
      if (typeof event.value._i == 'string') {
        const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
        if (pattern.test(event.value._i) && event.value._i.length == 10) {
           if(type == 'sufferingDate'){
            this.sufferingError = '';
          } else if (type == 'proposer') {
            this.dobError = '';
          }else if(type == 'riskDOB'){
            this.riskDOBDateError = '';
          }else if(type == 'sDate'){
            this.startDateError = '';
          }else if(type == 'eDate'){
            this.endDateError = '';
          } else {
            this.dobError = '';
          }
        } else {
           if(type == 'sufferingDate'){
            this.sufferingError = 'Enter Valid Date';
          } else if (type == 'proposer') {
            this.dobError = 'Enter Valid Date';
          }else if(type == 'riskDOB'){
             this.riskDOBDateError = 'Enter Valid Date';
           }else if(type == 'sDate'){
            this.startDateError = 'Enter Valid Date';
          }else if(type == 'eDate'){
            this.endDateError = 'Enter Valid Date';
          }else {
            this.dobError = 'Enter Valid Date';
          }
        }

        selectedDate = event.value._i;
        console.log(selectedDate, 'selectedDate');
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (selectedDate.length == 10) {
          if (type == 'proposer') {
            this.personalAge = this.ageCalculate(dob);
            sessionStorage.personalAge = this.personalAge;
          } else if (type == 'sDate') {
            console.log('inst');
            this.maxDate = event.value;
          }
        }
      } else if (typeof event.value._i == 'object') {
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (dob.length == 10) {
          if (type == 'proposer') {
            this.personalAge = this.ageCalculate(dob);
            sessionStorage.personalAge = this.personalAge;
          }
        }
        if (type == 'sDate') {
          this.startDateError = '';
        } else if (type == 'eDate') {
          this.endDateError = '';
        }
        console.log(event.value, 'event.value');
        if(type == 'sDate'){
          this.maxDate = event.value;
        }
        this.dobError = '';
        this.sufferingError = '';
        this.startDateError = '';
        this.endDateError = '';
        this.riskDOBDateError = '';
      }
    }
    if (type == 'sDate') {
      sessionStorage.riskstartDate = this.riskstartDate;
      console.log(this.riskstartDate, 'startDate1111');
      let fDate = this.datepipe.transform(new Date(), 'MM/dd/yyyy');
      let tDate = this.datepipe.transform(this.riskstartDate, 'MM/dd/yyyy');
      let diff = Date.parse(tDate) - Date.parse(fDate);
      this.riskdaysBookingCount =  Math.floor(diff / 86400000);
      console.log(this.riskdaysBookingCount, 'daysCount111');
      sessionStorage.riskdaysBookingCount = this.riskdaysBookingCount;
      // if (this.daysBookingCount > 60) {
      //     this.toast.error('Travel booking shoud be less than 60 days ')
      // }

    } else if (type == 'eDate') {
      sessionStorage.riskendDate = this.riskendDate;
      let days = this.dyasCalculation();
      this.riskdaysCount = days;
      sessionStorage.riskdaysCount = days;

      console.log(days, 'daysdays');

    }
  }

  addEventInsurer(event, i, type) {

    if (event.value != null) {
      let selectedDate = '';
      let dob = '';
      this.getAge = '';
      this.getDays;
      if (typeof event.value._i == 'string') {
        const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
        if (pattern.test(event.value._i) && event.value._i.length == 10) {
          this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
        } else {
          this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('Enter Valid DOB');
        }
        selectedDate = event.value._i;
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (selectedDate.length == 10) {
          this.getAge = this.ageCalculate(dob);
          this.getDays = this.ageCalculateInsurer(dob);
          this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].InsuredAge.patchValue(this.getAge);
          this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].InsDOB.patchValue(dob);


        } else {
          this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].InsuredAge.patchValue('');
        }
      } else if (typeof event.value._i == 'object') {

        dob = this.datepipe.transform(event.value, 'y-MM-dd');

        if (dob.length == 10) {
          this.getAge = this.ageCalculate(dob);
          this.getDays = this.ageCalculateInsurer(dob);
          this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].InsDOB.patchValue(dob);
        }

      }

    }
    let length = this.datepipe.transform(this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].InsDOB.value, 'y-MM-dd');
    // let length =  this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].proposerDob.value;
    if (length.length == 10) {
      this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
      this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].ins_age.patchValue(this.getAge);
      // this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].InsuredAge.patchValue(this.getAge);
      // this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.patchValue(this.getDays);
      this.ageValidation(i, type);
    } else {

      this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].InsuredAge.patchValue('');
    }
  }


  ageValidation(i, type) {

    if (this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].InsuredAge.value <= 18 && type == 'Self') {
      this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Self age should be above 18');
    } else if (this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].InsuredAge.value > 18 && type == 'Self') {
      this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
      this.arr.push(this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].InsuredAge.value);
    }
    if (this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].InsuredAge.value <= 18 && type == 'Spouse') {
      this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Spouse age should be above 18');
    } else if (this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].InsuredAge.value > 18 && type == 'Spouse') {
      this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
      this.arr.push(this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].InsuredAge.value);
    }
    let smallest = this.arr[0];
    for (let i = 1; i < this.arr.length; i++) {
      if (this.arr[i] < smallest) {
        smallest = this.arr[i];
      }
    }
  }

  ageCalculate(dob) {
    const mdate = dob.toString();
    const yearThen = parseInt(mdate.substring(8, 10), 10);
    const monthThen = parseInt(mdate.substring(5, 7), 10);
    const dayThen = parseInt(mdate.substring(0, 4), 10);
    const todays = new Date();
    const birthday = new Date(dayThen, monthThen - 1, yearThen);
    const differenceInMilisecond = todays.valueOf() - birthday.valueOf();
    const yearAge = Math.floor(differenceInMilisecond / 31536000000);
    this.agecal = yearAge;
    return yearAge;
  }

  ageCalculateInsurer(dob) {
    let mdate = dob.toString();
    let yearThen = parseInt(mdate.substring(8, 10), 10);
    let monthThen = parseInt(mdate.substring(5, 7), 10);
    let dayThen = parseInt(mdate.substring(0, 4), 10);
    let todays = new Date();
    let birthday = new Date(dayThen, monthThen - 1, yearThen);
    let differenceInMilisecond = todays.valueOf() - birthday.valueOf();
    let Bob_days = Math.ceil(differenceInMilisecond / (1000 * 60 * 60 * 24));
    return Bob_days;

  }
  dyasCalculation() {
    let fDate = this.datepipe.transform(this.riskstartDate, 'MM/dd/yyyy');
    let tDate = this.datepipe.transform(this.riskendDate, 'MM/dd/yyyy');
    let diff = Date.parse(tDate) - Date.parse(fDate);
    let days = Math.floor(diff / 86400000);
    return days+1;
  }
  typeAddressDeatils() {
    if (this.personal.controls['sameas'].value) {
      this.personal.controls['residenceAddress'].setValue(this.personal.controls['personalAddress'].value);
      this.personal.controls['residenceAddress2'].setValue(this.personal.controls['personalAddress2'].value);
      this.personal.controls['residenceAddress3'].setValue(this.personal.controls['residenceAddress3'].value);
      this.personal.controls['residenceCity'].setValue(this.personal.controls['personalCity'].value);
      this.personal.controls['residencePincode'].setValue(this.personal.controls['personalPincode'].value);
      this.personal.controls['residenceState'].setValue(this.personal.controls['personalState'].value);
      this.personal.controls['residenceDistrict'].setValue(this.personal.controls['personalDistrict'].value);
      this.personal.controls['residenceNearestLandMark'].setValue(this.personal.controls['personalNearestLandMark'].value);
      this.personal.controls['residenceCountry'].setValue(this.personal.controls['personalCountry'].value);
      this.personal.controls['residenceArea'].setValue(this.personal.controls['personalArea'].value);
    }
  }
  sameAddress(values: any) {
    this.sameField = values.checked;
    if (values.checked) {
      this.commonPincode(this.personal.controls['personalPincode'].value, 'proposalR');
      this.inputReadonly = true;
      this.personal.controls['residenceAddress'].setValue(this.personal.controls['personalAddress'].value);
      this.personal.controls['residenceAddress2'].setValue(this.personal.controls['personalAddress2'].value);
      this.personal.controls['residenceAddress3'].setValue(this.personal.controls['personalAddress3'].value);
      this.personal.controls['residenceCity'].setValue(this.personal.controls['personalCity'].value);
      this.personal.controls['residencePincode'].setValue(this.personal.controls['personalPincode'].value);
      this.personal.controls['residenceState'].setValue(this.personal.controls['personalState'].value);
      this.personal.controls['residenceDistrict'].setValue(this.personal.controls['personalDistrict'].value);
      this.personal.controls['residenceNearestLandMark'].setValue(this.personal.controls['personalNearestLandMark'].value);
      this.personal.controls['residenceCountry'].setValue(this.personal.controls['personalCountry'].value);
      this.personal.controls['residenceArea'].setValue(this.personal.controls['personalArea'].value);
    } else {
      this.inputReadonly = false;
      this.personal.controls['residenceAddress'].setValue('');
      this.personal.controls['residenceAddress2'].setValue('');
      this.personal.controls['residenceAddress3'].setValue('');
      this.personal.controls['residenceCity'].setValue('');
      this.personal.controls['residencePincode'].setValue('');
      this.personal.controls['residenceState'].setValue('');
      this.personal.controls['residenceDistrict'].setValue('');
      this.personal.controls['residenceNearestLandMark'].setValue('');
      this.personal.controls['residenceCountry'].setValue('');
      this.personal.controls['residenceArea'].setValue('');
    }
  }
  sameBurglaryAddress(values: any) {
    this.sameField = values.checked;
    if (values.checked) {
      this.commonPincode(this.personal.controls['personalBurglaryPincode'].value, 'proposalB');
      this.inputBurglaryReadonly = true;
      this.personal.controls['personalBurglaryAddress'].setValue(this.personal.controls['personalAddress'].value);
      this.personal.controls['personalBurglaryAddress2'].setValue(this.personal.controls['personalAddress2'].value);
      this.personal.controls['personalBurglaryAddress3'].setValue(this.personal.controls['personalAddress3'].value);
      this.personal.controls['personalBurglaryCity'].setValue(this.personal.controls['personalCity'].value);
      this.personal.controls['personalBurglaryPincode'].setValue(this.personal.controls['personalPincode'].value);
      this.personal.controls['personalBurglaryState'].setValue(this.personal.controls['personalState'].value);
      this.personal.controls['personalBurglaryDistrict'].setValue(this.personal.controls['personalDistrict'].value);
      this.personal.controls['personalBurglaryNearestLandMark'].setValue(this.personal.controls['personalNearestLandMark'].value);
      this.personal.controls['personalBurglaryCountry'].setValue(this.personal.controls['personalCountry'].value);
      this.personal.controls['personalBurglaryArea'].setValue(this.personal.controls['personalArea'].value);


    } else {
      this.inputBurglaryReadonly = false;
      this.personal.controls['personalBurglaryAddress'].setValue('');
      this.personal.controls['personalBurglaryAddress2'].setValue('');
      this.personal.controls['personalBurglaryAddress3'].setValue('');
      this.personal.controls['personalBurglaryCity'].setValue('');
      this.personal.controls['personalBurglaryPincode'].setValue('');
      this.personal.controls['personalBurglaryState'].setValue('');
      this.personal.controls['personalBurglaryDistrict'].setValue('');
      this.personal.controls['personalBurglaryNearestLandMark'].setValue('');
      this.personal.controls['personalBurglaryCountry'].setValue('');
      this.personal.controls['personalBurglaryArea'].setValue('');


    }
  }
  sameSponsorAddress(values: any){
    this.sameField = values.checked;
    if (values.checked) {
      this.commonPincode(this.personal.controls['personalSponsorPincode'].value, 'proposalS');
      this.inputSponsorReadonly = true;
      this.personal.controls['personalSponsorAddress'].setValue(this.personal.controls['personalAddress'].value);
      this.personal.controls['personalSponsorCity'].setValue(this.personal.controls['personalCity'].value);
      this.personal.controls['personalSponsorPincode'].setValue(this.personal.controls['personalPincode'].value);
      this.personal.controls['personalSponsorState'].setValue(this.personal.controls['personalState'].value);
      this.personal.controls['personalSponsorCountry'].setValue(this.personal.controls['personalCountry'].value);

    }else{
      this.inputSponsorReadonly = false;
      this.personal.controls['personalSponsorAddress'].setValue('');
      this.personal.controls['personalSponsorCity'].setValue('');
      this.personal.controls['personalSponsorPincode'].setValue('');
      this.personal.controls['personalSponsorState'].setValue('');
      this.personal.controls['personalSponsorCountry'].setValue('');
    }
  }


  sameProposer(value: any) {
    if (value.checked) {
      this.relianceInsuredTravel['controls'].items['controls'][0]['controls'].sameasreadonly.patchValue(true);
      this.relianceInsuredTravel['controls'].items['controls'][0]['controls'].personalTitle.patchValue(this.personal.controls['personalTitle'].value);
      this.relianceInsuredTravel['controls'].items['controls'][0]['controls'].personalFirstname.patchValue(this.personal.controls['personalFirstname'].value);
      this.relianceInsuredTravel['controls'].items['controls'][0]['controls'].personalMidname.patchValue(this.personal.controls['personalMidname'].value);
      this.relianceInsuredTravel['controls'].items['controls'][0]['controls'].personalLastname.patchValue(this.personal.controls['personalLastname'].value);
      // this.relianceInsuredTravel['controls'].items['controls'][0]['controls'].personalAge.patchValue(sessionStorage.personalAge);
      // this.relianceInsuredTravel['controls'].items['controls'][0]['controls'].maritalStatus.patchValue(this.personal.controls['maritalStatus'].value);
      // this.relianceInsuredTravel['controls'].items['controls'][0]['controls'].occupation.patchValue(this.personal.controls['occupation'].value);
      // this.relianceInsuredTravel['controls'].items['controls'][0]['controls'].personalGender.patchValue(this.personal.controls['personalGender'].value);
      // this.relianceInsuredTravel['controls'].items['controls'][0]['controls'].personalrelationship.patchValue('345');
      // this.relianceInsuredTravel['controls'].items['controls'][0]['controls'].sameas.patchValue(this.personal.controls['sameas'].value);

      let getDob = this.datepipe.transform(this.personal.controls['personalDob'].value, 'y-MM-dd');
      this.relianceInsuredTravel['controls'].items['controls'][0]['controls'].personalDob.patchValue(getDob);
    } else {
      this.relianceInsuredTravel['controls'].items['controls'][0]['controls'].sameasreadonly.patchValue(false);
      this.relianceInsuredTravel['controls'].items['controls'][0]['controls'].personalTitle.patchValue('');
      this.relianceInsuredTravel['controls'].items['controls'][0]['controls'].personalFirstname.patchValue('');
      this.relianceInsuredTravel['controls'].items['controls'][0]['controls'].personalMidname.patchValue('');
      this.relianceInsuredTravel['controls'].items['controls'][0]['controls'].personalLastname.patchValue('');
      // this.relianceInsuredTravel['controls'].items['controls'][0]['controls'].personalDob.patchValue('');
      // this.relianceInsuredTravel['controls'].items['controls'][0]['controls'].personalAge.patchValue('');
      // this.relianceInsuredTravel['controls'].items['controls'][0]['controls'].occupation.patchValue('');
      // this.relianceInsuredTravel['controls'].items['controls'][0]['controls'].maritalStatus.patchValue('');
      // this.relianceInsuredTravel['controls'].items['controls'][0]['controls'].personalGender.patchValue('');
      // this.relianceInsuredTravel['controls'].items['controls'][0]['controls'].personalrelationship.patchValue('');
      this.relianceInsuredTravel['controls'].items['controls'][0]['controls'].sameas.patchValue('');
    }

  }

  sessionData() {
    if (sessionStorage.stepper1Details != '' && sessionStorage.stepper1Details != undefined) {
      this.getStepper1 = JSON.parse(sessionStorage.stepper1Details);
      this.personal = this.fb.group({
        personalTitle: this.getStepper1.personalTitle,
        personalFirstname: this.getStepper1.personalFirstname,
        personalMidname: this.getStepper1.personalMidname,
        personalLastname: this.getStepper1.personalLastname,
        personalDob: this.getStepper1.personalDob,
        personalGender: this.getStepper1.personalGender,
        maritalStatus: this.getStepper1.maritalStatus,
        occupation: this.getStepper1.occupation,
        personalAadhar: this.getStepper1.personalAadhar,
        personalPan: this.getStepper1.personalPan,
        personalEmail: this.getStepper1.personalEmail,
        personalMobile: this.getStepper1.personalMobile,
        personalPhone: this.getStepper1.personalPhone,
        nationality: this.getStepper1.nationality,
        personalGst: this.getStepper1.personalGst,
        gstin: this.getStepper1.gstin,
        relatedParty: this.getStepper1.relatedParty,
        groupCorpID: this.getStepper1.groupCorpID,
        personalAddress: this.getStepper1.personalAddress,
        personalAddress2: this.getStepper1.personalAddress2,
        personalAddress3: this.getStepper1.personalAddress3,
        personalPincode: this.getStepper1.personalPincode,
        personalCity: this.getStepper1.personalCity,
        personalArea: this.getStepper1.personalArea,
        personalDistrict: this.getStepper1.personalDistrict,
        personalState: this.getStepper1.personalState,
        personalNearestLandMark: this.getStepper1.personalNearestLandMark,
        personalCountry: this.getStepper1.personalCountry,
        residenceAddress: this.getStepper1.residenceAddress,
        residenceAddress2: this.getStepper1.residenceAddress2,
        residenceAddress3: this.getStepper1.residenceAddress3,
        residencePincode: this.getStepper1.residencePincode,
        residenceCity: this.getStepper1.residenceCity,
        residenceArea: this.getStepper1.residenceArea,
        residenceDistrict: this.getStepper1.residenceDistrict,
        residenceState: this.getStepper1.residenceState,
        residenceNearestLandMark: this.getStepper1.residenceNearestLandMark,
        residenceCountry: this.getStepper1.residenceCountry,
        personalUniversityName: this.getStepper1.personalUniversityName,
        personalUniversityEmail: this.getStepper1.personalUniversityEmail,
        personalUniversityMobileNo: this.getStepper1.personalUniversityMobileNo,
        personalUniversityPhoneNo: this.getStepper1.personalUniversityPhoneNo,
        personalUniversityFax: this.getStepper1.personalUniversityFax,
        personalUniversityCity: this.getStepper1.personalUniversityCity,
        personalUniversityState: this.getStepper1.personalUniversityState,
        personalUniversityCountry: this.getStepper1.personalUniversityCountry,
        personalBurglaryEmail: this.getStepper1.personalBurglaryEmail,
        personalBurglaryMobileNo: this.getStepper1.personalBurglaryMobileNo,
        personalBurglaryPhoneNo: this.getStepper1.personalBurglaryPhoneNo,
        personalBurglaryFax: this.getStepper1.personalBurglaryFax,
        personalBurglaryAddress: this.getStepper1.personalBurglaryAddress,
        personalBurglaryAddress2: this.getStepper1.personalBurglaryAddress2,
        personalBurglaryAddress3: this.getStepper1.personalBurglaryAddress3,
        personalBurglaryPincode: this.getStepper1.personalBurglaryPincode,
        personalBurglaryCity: this.getStepper1.personalBurglaryCity,
        personalBurglaryArea: this.getStepper1.personalBurglaryArea,
        personalBurglaryDistrict: this.getStepper1.personalBurglaryDistrict,
        personalBurglaryState: this.getStepper1.personalBurglaryState,
        personalBurglaryNearestLandMark: this.getStepper1.personalBurglaryNearestLandMark,
        personalBurglaryCountry: this.getStepper1.personalBurglaryCountry,
        personalSponsorFullname: this.getStepper1.personalSponsorFullname,
        personalSponsorEmail: this.getStepper1.personalSponsorEmail,
        personalSponsorMobileNo: this.getStepper1.personalSponsorMobileNo,
        personalSponsorPhoneNo: this.getStepper1.personalSponsorPhoneNo,
        personalSponsorAddress: this.getStepper1.personalSponsorAddress,
        personalSponsorPincode: this.getStepper1.personalSponsorPincode,
        personalSponsorCity: this.getStepper1.personalSponsorCity,
        personalSponsorState: this.getStepper1.personalSponsorState,
        personalSponsorCountry: this.getStepper1.personalSponsorCountry,
        IsDoctorDetails: this.getStepper1.IsDoctorDetails,
        personalDoctorFullname: this.getStepper1.personalDoctorFullname,
        personalDoctorEmail: this.getStepper1.personalDoctorEmail,
        personalDoctorMobileNo: this.getStepper1.personalDoctorMobileNo,
        personalDoctorPhoneNo: this.getStepper1.personalDoctorPhoneNo,
        personalDoctorFax: this.getStepper1.personalDoctorFax,
        personalDoctorAddress: this.getStepper1.personalDoctorAddress,
        personalDoctorAddress2: this.getStepper1.personalDoctorAddress2,
        personalDoctorAddress3: this.getStepper1.personalDoctorAddress3,
        personalDoctorPincode: this.getStepper1.personalDoctorPincode,
        personalDoctorCity: this.getStepper1.personalDoctorCity,
        personalDoctorArea: this.getStepper1.personalDoctorArea,
        personalDoctorDistrict: this.getStepper1.personalDoctorDistrict,
        personalDoctorState: this.getStepper1.personalDoctorState,
        personalDoctorNearestLandMark: this.getStepper1.personalDoctorNearestLandMark,
        personalDoctorCountry: this.getStepper1.personalDoctorCountry,
        personalCompanyFullname: this.getStepper1.personalCompanyFullname,
        personalCompanyEmail: this.getStepper1.personalCompanyEmail,
        personalCompanyMobileNo: this.getStepper1.personalCompanyMobileNo,
        personalCompanyPhoneNo: this.getStepper1.personalCompanyPhoneNo,
        personalCompanyFax: this.getStepper1.personalCompanyFax,
        personalCompanyAddress: this.getStepper1.personalCompanyAddress,
        personalCompanyAddress2: this.getStepper1.personalCompanyAddress2,
        personalCompanyAddress3: this.getStepper1.personalCompanyAddress3,
        personalCompanyPincode: this.getStepper1.personalCompanyPincode,
        personalCompanyCity: this.getStepper1.personalCompanyCity,
        personalCompanyArea: this.getStepper1.personalCompanyArea,
        personalCompanyDistrict: this.getStepper1.personalCompanyDistrict,
        personalCompanyState: this.getStepper1.personalCompanyState,
        personalCompanyNearestLandMark: this.getStepper1.personalCompanyNearestLandMark,
        personalCompanyCountry: this.getStepper1.personalCompanyCountry,
        personalCityIdP: this.getStepper1.personalCityIdP,
        personalStateIdP: this.getStepper1.personalStateIdP,
        personalDistrictIdP: this.getStepper1.personalDistrictIdP,
        personalCityIdR: this.getStepper1.personalCityIdR,
        personalStateIdR: this.getStepper1.personalStateIdR,
        residenceDistrictIdR: this.getStepper1.residenceDistrictIdR,
        personalCityIdB: this.getStepper1.personalCityIdB,
        personalStateIdB: this.getStepper1.personalStateIdB,
        residenceDistrictIdB: this.getStepper1.residenceDistrictIdB,
        personalCityIdS: this.getStepper1.personalCityIdS,
        personalStateIdS: this.getStepper1.personalStateIdS,
        personalCityIdD: this.getStepper1.personalCityIdD,
        personalStateIdD: this.getStepper1.personalStateIdD,
        residenceDistrictIdD: this.getStepper1.residenceDistrictIdD,
        personalCityIdC: this.getStepper1.personalCityIdC,
        personalStateIdC: this.getStepper1.personalStateIdC,
        residenceDistrictIdC: this.getStepper1.residenceDistrictIdC,
        startDate: this.getStepper1.startDate,
        endDate: this.getStepper1.endDate,
        sameas: this.getStepper1.sameas,
        rolecd: this.getStepper1.rolecd,
      });

      if (this.getStepper1.personalPincode != '') {
        this.commonPincode(this.getStepper1.personalPincode, 'proposalP');
        setTimeout(() =>{
          if(this.getStepper1.sameas == true) {
            this.inputReadonly = true;
            this.inputBurglaryReadonly = true;
            this.inputSponsorReadonly = true;
            this.commonPincode(this.getStepper1.personalPincode, 'proposalR');
            this.commonPincode(this.getStepper1.personalBurglaryPincode, 'proposalB');
            this.commonPincode(this.getStepper1.personalSponsorPincode, 'proposalS');
          } else if(this.getStepper1.sameas == false) {
            this.commonPincode(this.getStepper1.residencePincode, 'proposalR');
            this.commonPincode(this.getStepper1.personalBurglaryPincode, 'proposalB');
            this.commonPincode(this.getStepper1.personalSponsorPincode, 'proposalS');
          }
        },2000);
      };

      let getPerDob = this.datepipe.transform(this.getStepper1.personalDob, 'y-MM-dd');
      this.personal['controls'].personalDob.patchValue(getPerDob);
    }

    if (sessionStorage.stepper2Details != '' && sessionStorage.stepper2Details != undefined) {
      this.getStepper2 = JSON.parse(sessionStorage.stepper2Details);
      for (let i = 0; i < this.getStepper2.items.length; i++) {
        this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].rolecd.patchValue(this.getStepper2.items[i].rolecd);
        this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].personalTitle.patchValue(this.getStepper2.items[i].personalTitle);
        this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].childFullname.patchValue(this.getStepper2.items[i].childFullname);
        this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].personalFirstname.patchValue(this.getStepper2.items[i].personalFirstname);
        this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].personalLastname.patchValue(this.getStepper2.items[i].personalLastname);
        this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].personalMidname.patchValue(this.getStepper2.items[i].personalMidname);
        this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].personalGender.patchValue(this.getStepper2.items[i].personalGender);
        this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].InsDOB.patchValue(this.getStepper2.items[i].InsDOB);
        this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].occupation.patchValue(this.getStepper2.items[i].occupation);
        this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].personalEmail.patchValue(this.getStepper2.items[i].personalEmail);
        this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].relationship.patchValue(this.getStepper2.items[i].relationship);
        this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].passport.patchValue(this.getStepper2.items[i].passport);
        this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].personalMobile.patchValue(this.getStepper2.items[i].personalMobile);
        this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].personalPhone1.patchValue(this.getStepper2.items[i].personalPhone1);
        this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].IsUnderMedication.patchValue(this.getStepper2.items[i].IsUnderMedication);
        this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].PreExistingIllness.patchValue(this.getStepper2.items[i].PreExistingIllness);
        this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].SufferingSince.patchValue(this.getStepper2.items[i].SufferingSince);
        this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].nomineeName.patchValue(this.getStepper2.items[i].nomineeName);
        this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].nomineeRelationship.patchValue(this.getStepper2.items[i].nomineeRelationship);
        this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].InsuredAge.patchValue(this.getStepper2.items[i].InsuredAge);
        this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue(this.getStepper2.items[i].insurerDobError);
        this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue(this.getStepper2.items[i].insurerDobValidError);
        this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].sameAsProposer.patchValue(this.getStepper2.items[i].sameAsProposer);
        this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].sameasreadonly.patchValue(this.getStepper2.items[i].sameasreadonly);
        this.relianceInsuredTravel['controls'].items['controls'][i]['controls'].sameas.patchValue(this.getStepper2.items[i].sameas);
      }
    }

    if (sessionStorage.riskstartDate != undefined && sessionStorage.riskstartDate != '') {
      this.riskstartDate = this.datepipe.transform(sessionStorage.riskstartDate, 'y-MM-dd');
      this.maxDate = this.riskstartDate;
    }
    if (sessionStorage.riskdaysCount != undefined && sessionStorage.riskdaysCount != '') {
      this.riskdaysCount = sessionStorage.riskdaysCount;
    }
    if (sessionStorage.riskendDate != undefined && sessionStorage.riskendDate != '') {
      this.riskendDate = this.datepipe.transform(sessionStorage.riskendDate, 'y-MM-dd');

    }
  }

  relianceOccupation() {
    const data = {
      'platform': 'web',
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
      'product_id': '11'
    }
    this.travelservice.travelRelianceOccupation(data).subscribe(
        (successData) => {
          this.PersonalOccupationListSuccess(successData);
        },
        (error) => {
          this.PersonalOccupationListFailure(error);
        }
    );
  }

  public PersonalOccupationListSuccess(successData) {
    if (successData.IsSuccess) {
      this.PersonalOccupation = successData.ResponseObject;
    }
  }

  public PersonalOccupationListFailure(error) {
  }
  relainceRelation() {
    const data = {
      'platform': 'web',
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
      'product_id': '11'
    }
    this.travelservice.travelRelianceRelationShip(data).subscribe(
        (successData) => {
          this.relainceRelationListSuccess(successData);
        },
        (error) => {
          this.relainceRelationListFailure(error);
        }
    );
  }

  public relainceRelationListSuccess(successData) {
    if (successData.IsSuccess) {
      this.Relationship = successData.ResponseObject;
    }
  }

  public relainceRelationListFailure(error) {
  }
  relainceNationality() {
    const data = {
      'platform': 'web',
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
      'product_id': '11'
    }
    this.travelservice.travelRelianceNationality(data).subscribe(
        (successData) => {
          this.relainceNationalityListSuccess(successData);
        },
        (error) => {
          this.relainceNationalityListFailure(error);
        }
    );
  }

  public relainceNationalityListSuccess(successData) {
    if (successData.IsSuccess) {
      this.Nationality = successData.ResponseObject;
    }
  }

  public relainceNationalityListFailure(error) {
  }
  relainceMarital() {
    const data = {
      'platform': 'web',
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
      'product_id': '11'
    }
    this.travelservice.travelRelianceMarital(data).subscribe(
        (successData) => {
          this.relainceMaritalListSuccess(successData);
        },
        (error) => {
          this.relainceMaritalListFailure(error);
        }
    );
  }

  public relainceMaritalListSuccess(successData) {
    if (successData.IsSuccess) {
      this.Marital = successData.ResponseObject;
    }
  }

  public relainceMaritalListFailure(error) {
  }

  relainceVisitingCountries() {
    const data = {
      'platform': 'web',
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
      'product_id': '11'
    }
    this.travelservice.travelRelianceVisitingCountries(data).subscribe(
        (successData) => {
          this.relainceVisitingCountriesListSuccess(successData);
        },
        (error) => {
          this.relainceVisitingCountriesListFailure(error);
        }
    );
  }

  public relainceVisitingCountriesListSuccess(successData) {
    if (successData.IsSuccess) {
      this.VisitingCountry = successData.ResponseObject;
    }
  }

  public relainceVisitingCountriesListFailure(error) {
  }
  relaincePreExistingIllness() {
    const data = {
      'platform': 'web',
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
      'product_id': '11'
    }
    this.travelservice.travelReliancePreExistingIllness(data).subscribe(
        (successData) => {
          this.relaincePreExistingIllnessListSuccess(successData);
        },
        (error) => {
          this.relaincePreExistingIllnessListFailure(error);
        }
    );
  }

  public relaincePreExistingIllnessListSuccess(successData) {
    if (successData.IsSuccess) {
      this.PreExistingIllness = successData.ResponseObject;
    }
  }

  public relaincePreExistingIllnessListFailure(error) {
  }

  relainceSportsActivities() {
    const data = {
      'platform': 'web',
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
      'product_id': '11'
    }
    this.travelservice.travelReliancerelainceSportsActivities(data).subscribe(
        (successData) => {
          this.relainceSportsActivitiesListSuccess(successData);
        },
        (error) => {
          this.relainceSportsActivitiesListFailure(error);
        }
    );
  }

  public relainceSportsActivitiesListSuccess(successData) {
    if (successData.IsSuccess) {
      this.SportsActivities = successData.ResponseObject;
    }
  }

  public relainceSportsActivitiesListFailure(error) {
  }
  relainceCoverType() {
    const data = {
      'platform': 'web',
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
      'product_id': '11'
    }
    this.travelservice.travelReliancerelainceCoverType(data).subscribe(
        (successData) => {
          this.relainceCoverTypeListSuccess(successData);
        },
        (error) => {
          this.relainceCoverTypeListFailure(error);
        }
    );
  }

  public relainceCoverTypeListSuccess(successData) {
    if (successData.IsSuccess) {
      this.CoverType = successData.ResponseObject;
    }
  }

  public relainceCoverTypeListFailure(error) {
  }

  commonPincode(pin, title) {
    this.pin = pin;
    this.title = title;
    const data = {
      'platform': 'web',
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
      'product_id' : '11',
      'pincode': this.pin
    }
    if (this.pin.length == 6) {
      this.travelservice.travelRelianceCheckpincode(data).subscribe(
          (successData) => {
            this.commonPincodeSuccess(successData);
          },
          (error) => {
            this.commonPincodeFailure(error);
          }
      );
    }
  }

  public commonPincodeSuccess(successData) {
    this.setPincode = successData.ResponseObject;
    if (this.title == 'proposalP') {
      if (successData.IsSuccess) {
        this.personal['controls'].personalState.patchValue(this.setPincode.state_name);
        this.personal['controls'].personalDistrict.patchValue(this.setPincode.district_name);
        this.personal['controls'].personalCity.patchValue(this.setPincode.city_village_name);
        this.proposalPArea = this.setPincode.area_details;
        this.personal['controls'].personalDistrictIdP.patchValue(this.setPincode.district_id);
        this.personal['controls'].personalCityIdP.patchValue(this.setPincode.city_village_id);
        this.personal['controls'].personalStateIdP.patchValue(this.setPincode.state_id);
        this.getComAddressList = successData.ResponseObject;

      } else {
        this.toastr.error('In valid Pincode');
        this.personal['controls'].personalState.patchValue('');
        this.personal['controls'].personalDistrict.patchValue('');
        this.personal['controls'].personalCity.patchValue('');
        this.proposalPArea = [];
        this.personal['controls'].personalDistrictIdP.patchValue('');
        this.personal['controls'].personalCityIdP.patchValue('');
        this.personal['controls'].personalStateIdP.patchValue('');
        this.getComAddressList = '';
      }
    }
    if (this.title == 'proposalR') {
      if (successData.IsSuccess) {
        this.personal['controls'].residenceState.patchValue(this.setPincode.state_name);
        this.personal['controls'].residenceDistrict.patchValue(this.setPincode.district_name);
        this.personal['controls'].residenceCity.patchValue(this.setPincode.city_village_name);
        this.proposalRArea = this.setPincode.area_details;
        this.personal['controls'].residenceDistrictIdR.patchValue(this.setPincode.district_id);
        this.personal['controls'].personalCityIdR.patchValue(this.setPincode.city_village_id);
        this.personal['controls'].personalStateIdR.patchValue(this.setPincode.state_id);
        this.getResAddressList = successData.ResponseObject;

      } else {
        this.toastr.error('In valid Pincode');
        this.personal['controls'].residenceState.patchValue('');
        this.personal['controls'].residenceDistrict.patchValue('');
        this.personal['controls'].residenceCity.patchValue('');
        this.proposalRArea = [];
        this.personal['controls'].residenceDistrictIdR.patchValue('');
        this.personal['controls'].personalCityIdR.patchValue('');
        this.personal['controls'].personalStateIdR.patchValue('');
        this.getResAddressList = '';
      }
    }

    if(this.title == 'proposalB'){
      if (successData.IsSuccess) {
        this.personal['controls'].personalBurglaryState.patchValue(this.setPincode.state_name);
        this.personal['controls'].personalBurglaryDistrict.patchValue(this.setPincode.district_name);
        this.personal['controls'].personalBurglaryCity.patchValue(this.setPincode.city_village_name);
        this.proposalBArea = this.setPincode.area_details;
        this.personal['controls'].personalyDistrictIdB.patchValue(this.setPincode.district_id);
        this.personal['controls'].personalCityIdB.patchValue(this.setPincode.city_village_id);
        this.personal['controls'].personalStateIdB.patchValue(this.setPincode.state_id);
        this.getBurglaryAddressList = successData.ResponseObject;

      } else {
        this.toastr.error('In valid Pincode');
        this.personal['controls'].personalBurglaryState.patchValue('');
        this.personal['controls'].personalBurglaryDistrict.patchValue('');
        this.personal['controls'].personalBurglaryCity.patchValue('');
        this.proposalBArea = [];
        this.personal['controls'].residenceDistrictIdB.patchValue('');
        this.personal['controls'].personalCityIdB.patchValue('');
        this.personal['controls'].personalStateIdB.patchValue('');
        this.getBurglaryAddressList = '';
      }
    }
    if(this.title == 'proposalS'){
      if (successData.IsSuccess) {
        this.personal['controls'].personalSponsorState.patchValue(this.setPincode.state_name);
        this.personal['controls'].personalSponsorCity.patchValue(this.setPincode.city_village_name);
        this.personal['controls'].personalCityIdS.patchValue(this.setPincode.city_village_id);
        this.personal['controls'].personalStateIdS.patchValue(this.setPincode.state_id);
        this.getSponsorAddressList = successData.ResponseObject;

      } else {
        this.toastr.error('In valid Pincode');
        this.personal['controls'].personalSponsorState.patchValue('');
        this.personal['controls'].personalSponsorCity.patchValue('');
        this.personal['controls'].personalCityIdS.patchValue('');
        this.personal['controls'].personalStateIdS.patchValue('');
        this.getSponsorAddressList = '';
      }
    }
    if(this.title == 'proposalC'){
      if (successData.IsSuccess) {
        this.personal['controls'].personalCompanyState.patchValue(this.setPincode.state_name);
        this.personal['controls'].personalCompanyDistrict.patchValue(this.setPincode.district_name);
        this.personal['controls'].personalCompanyCity.patchValue(this.setPincode.city_village_name);
        this.proposalCArea = this.setPincode.area_details;
        this.personal['controls'].personalyDistrictIdC.patchValue(this.setPincode.district_id);
        this.personal['controls'].personalCityIdC.patchValue(this.setPincode.city_village_id);
        this.personal['controls'].personalStateIdC.patchValue(this.setPincode.state_id);
        this.getCompanyAddressList = successData.ResponseObject;

      } else {
        this.toastr.error('In valid Pincode');
        this.personal['controls'].personalCompanyState.patchValue('');
        this.personal['controls'].personalCompanyDistrict.patchValue('');
        this.personal['controls'].personalCompanyCity.patchValue('');
        this.proposalCArea = [];
        this.personal['controls'].residenceDistrictIdC.patchValue('');
        this.personal['controls'].personalCityIdC.patchValue('');
        this.personal['controls'].personalStateIdC.patchValue('');
        this.getCompanyAddressList = '';
      }
    }
    if(this.title == 'proposalD'){
      if (successData.IsSuccess) {
        this.personal['controls'].personalDoctorState.patchValue(this.setPincode.state_name);
        this.personal['controls'].personalDoctorDistrict.patchValue(this.setPincode.district_name);
        this.personal['controls'].personalDoctorCity.patchValue(this.setPincode.city_village_name);
        this.proposalDArea = this.setPincode.area_details;
        this.personal['controls'].personalyDistrictIdD.patchValue(this.setPincode.district_id);
        this.personal['controls'].personalCityIdD.patchValue(this.setPincode.city_village_id);
        this.personal['controls'].personalStateIdD.patchValue(this.setPincode.state_id);
        this.getDoctorAddressList = successData.ResponseObject;

      } else {
        this.toastr.error('In valid Pincode');
        this.personal['controls'].personalDoctorState.patchValue('');
        this.personal['controls'].personalDoctorDistrict.patchValue('');
        this.personal['controls'].personalDoctorCity.patchValue('');
        this.proposalDArea = [];
        this.personal['controls'].residenceDistrictIdD.patchValue('');
        this.personal['controls'].personalCityIdD.patchValue('');
        this.personal['controls'].personalStateIdD.patchValue('');
        this.getDoctorAddressList = '';
      }
    }
  }
  public commonPincodeFailure(error)
    {
    }
  riskDetailsChange(value: any, title) {
    if (title == 'india') {
      if (value.checked == true) {
        this.riskDetails['controls'].riskIndian.patchValue('true');
        this.riskDetails['controls'].riskIsOverSeasCitizen.patchValue('')
        this.overseas = false;
      } else if (value.checked == false) {
        this.riskDetails['controls'].riskIsOverSeasCitizen.patchValue('true');
        this.overseas = true;
      }
    }
    if (title == 'overseas') {
      if (value.checked == true) {
        this.riskDetails['controls'].riskIsOverSeasCitizen.patchValue('true');
        this.riskDetails['controls'].riskIndian.patchValue('');
        this.overseas = true;
      } else if (value.checked == false) {
        this.riskDetails['controls'].riskIndian.patchValue('true');
        this.overseas = false;
      }
    }
    if (title == 'residingIndia') {
      if (value.checked == true) {
        this.riskDetails['controls'].riskIsResidingInIndia.patchValue('true');
        this.riskIsResidingInIndiaTrue = true;
      } else if (value.checked == false) {
        this.riskIsResidingInIndiaTrue = false;
      }
    }
    if (title == 'ImmigrantVisa') {
      if (value.checked == true) {
        this.riskDetails['controls'].riskIsInsuredOnImmigrantVisa.patchValue('true');
      } else if (value.checked == false) {
      }
    }
    if (title == 'IsSufferingFromPEMC') {
      if (value.checked == true) {
        this.riskDetails['controls'].riskIsSufferingFromPEMC.patchValue('true');
      } else if (value.checked == false) {
      }
    }
    if (title == 'PreExistDisease') {
      if (value.checked == true) {
        this.riskDetails['controls'].riskPreExistDisease.patchValue('true');
      } else if (value.checked == false) {
      }
    }
    if (title == 'TravelInvolvesSporting') {
      if (value.checked == true) {
        this.riskDetails['controls'].riskIsTravelInvolvesSportingActivities.patchValue('true');
        this.riskSportsActivitiesTrue = true;
      } else if (value.checked == false) {
        this.riskSportsActivitiesTrue = false;
      }
    }
    if (title == 'IsVisitingUSACanada') {
      if (value.checked == true) {
        this.riskDetails['controls'].riskIsVisitingUSACanada.patchValue('true');
        this.VisitingListTure = true;
      } else if (value.checked == false) {
        this.VisitingListTure = false;
      }
    }
    if (title == 'IsVisitingFamily') {
      if (value.checked == true) {
        this.riskCoverageTypeTrue = true;
      } else if (value.checked == false) {
        this.riskCoverageTypeTrue = false;
      }
    }
    if (title == 'IsVisitingStudent') {
      if (value.checked == true) {
        this.riskDetails['controls'].riskIsVisitingStudent.patchValue('true');
      } else if (value.checked == false) {
      }
    }
    if (title == 'IsMultitripIndividual') {
      if (value.checked == true) {
        this.riskMaxDaysPerTripTrue = true;
      } else if (value.checked == false) {
        this.riskMaxDaysPerTripTrue = false;
      }
    }
    if (title == 'IsSeniorCitizen') {
      if (value.checked == true) {
        this.riskDetails['controls'].riskSeniorCitizen.patchValue('true');
        this.riskSeniorCitizenTrue = true;
      } else if (value.checked == false) {
        this.riskSeniorCitizenTrue = false;
      }
    }
      if (title == 'TravelCoverage') {
        if (value.checked == true) {
          this.TravelCoverageTrue = true;
        } else if (value.checked == false) {
          this.TravelCoverageTrue = false;
        }
      }
      if (title == 'TravelStandardLimit') {
        if (value.checked == true) {
          this.riskDetails['controls'].TravelStandardLimited.patchValue('true');
          this.TravelStandardLimitTrue = true;
        } else if (value.checked == false) {
          this.TravelStandardLimitTrue = false;
        }
      }
      if (title == 'TravelSilverPlan') {
        if (value.checked == true) {
          this.riskDetails['controls'].TravelIsSilverPlan.patchValue('true');
          this.TravelSilverPlanTrue = true;
        } else if (value.checked == false) {
          this.TravelSilverPlanTrue = false;
        }
      }
      if (title == 'TravelGoldPlan') {
        if (value.checked == true) {
          this.riskDetails['controls'].TravelIsGoldPlan.patchValue('true');
          this.TravelGoldPlanTrue = true;
        } else if (value.checked == false) {
          this.TravelGoldPlanTrue = false;
        }
      }
      if (title == 'TravelPlatinumPlan') {
        if (value.checked == true) {
          this.riskDetails['controls'].TravelIsPlatinumPlan.patchValue('true');
          this.TravelPlatinumPlanTrue = true;
        } else if (value.checked == false) {
          this.TravelPlatinumPlanTrue = false;
        }
      }
      if (title == 'TravelBasicPlan') {
        if (value.checked == true) {
          this.riskDetails['controls'].TravelIsBasicPlan.patchValue('true');
          this.TravelBasicPlanTrue = true;
        } else if (value.checked == false) {
          this.TravelBasicPlanTrue = false;
        }
      }
      if (title == 'TravelElitePlan') {
        if (value.checked == true) {
          this.riskDetails['controls'].TravelIsElitePlan.patchValue('true');
          this.TravelElitePlanTrue = true;
        } else if (value.checked == false) {
          this.TravelElitePlanTrue = false;
        }
      }
      if (title == 'TravelPlusPlan') {
        if (value.checked == true) {
          this.riskDetails['controls'].TravelIsPlusPlan.patchValue('true');
          this.TravelPlusPlanTrue = true;
        } else if (value.checked == false) {
          this.TravelPlusPlanTrue = false;
        }
      }
    }
}
