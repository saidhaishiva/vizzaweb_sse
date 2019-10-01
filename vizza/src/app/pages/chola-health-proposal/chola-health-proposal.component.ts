import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {HttpClient} from '@angular/common/http';
import {ValidationService} from '../../shared/services/validation.service';
import {ToastrService} from 'ngx-toastr';
import {MatStepper} from '@angular/material';
import {DatePipe} from '@angular/common';
import * as moment from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {ConfigurationService} from '../../shared/services/configuration.service';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {HealthService} from '../../shared/services/health.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppSettings} from '../../app.settings';
import {Settings} from '../../app.settings.model';
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
  selector: 'app-chola-health-proposal',
  templateUrl: './chola-health-proposal.component.html',
  styleUrls: ['./chola-health-proposal.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class CholaHealthProposalComponent implements OnInit {
  public personal: FormGroup;
  public insureArray: FormGroup;
  public nomineeDetails: FormGroup;
  public settings: Settings;
  public personalData: any;
  public mobileNumber: any;
  public taxRequired: any;
  public step: any;
  public items: any;
  public getStepper1: any;
  public getStepper2: any;
  public getStepper3: any;
  public nomineeData: any;
  public insurerData: any;
  public totalInsureDetails: any;
  public buyProductdetails: any;
  public groupName: any;
  public getFamilyDetails: any;
  public insurePersons: any;
  public today: any;
  public arr: any;
  public minDate: any;
  public maxDate: any;
  public relationshipList: any;
  public getAge: any;
  public getDays: any;
  public personalAge: any;
  public dobError: any;
  public sameValue: any;
  public maritalStatusList: any;
  public occupationList: any;
  public CholaCityList: any;
  public summaryData: any;
  public RediretUrlLink: any;
  public proposalId: any;
  public proposerFormData: any;
  public nomineeFormData: any;
  public insuredFormData: any;
  public enquiryId: any;
  public response: any;
  public genderTitleList: any;
  public declaration: boolean;
  public totalPermiumlist: any;
  public webhost: any;

  public relationsame1: any;
  public requestDetails: any;
  public pos_status: any;
  public currentStep: any;
  public payLaterr: any;
  public nomineerelationshipList: any;
  public createdDate: any;
  public status: any;
  public proposal_Id: any;
  public stepperindex: any;
  public PaymentActionUrl: any;
  public proposerData: any;
  public insuredData: any;
  public nomineeDataPay: any;

  constructor(public fb: FormBuilder, public authservice: AuthService, public config: ConfigurationService, public appSettings: AppSettings, public http: HttpClient, public route: ActivatedRoute, public datepipe: DatePipe, public validation: ValidationService, public termService: HealthService, private toastr: ToastrService,public router: Router, ) {
    this.stepperindex = 0;
    this.route.params.forEach((params) => {
      if(params.stepper == true || params.stepper == 'true') {
        this.stepperindex = 3;
        if (sessionStorage.summaryData != '' && sessionStorage.summaryData != undefined) {
          this.summaryData = JSON.parse(sessionStorage.summaryData);
          this.RediretUrlLink = this.summaryData.PaymentURL;
          this.proposerFormData = JSON.parse(sessionStorage.proposerFormData);
          this.nomineeFormData = JSON.parse(sessionStorage.nomineeFormData);
          this.insuredFormData = JSON.parse(sessionStorage.insuredFormData);
          this.proposalId = this.summaryData.ProposalId;
          sessionStorage.chola_health_proposal_id = this.proposalId;
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
        console.log(this.payLaterr, 'cons');
    });
      this.currentStep  = this.stepperindex;
    const minDate = new Date();
    this.minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
    let today  = new Date();
    this.today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    this.settings = this.appSettings.settings;
    this.mobileNumber = 'true';
    this.webhost = this.config.getimgUrl();
    this.taxRequired = '';
    this.step = 0;
    this.totalInsureDetails = [];
    this.arr = [];
    this.declaration = false;
    this.personal = this.fb.group({
      personalTitle: ['', Validators.required],
      personalFirstname: ['', Validators.required],
      personalLastname: ['', Validators.required],
      personalDob: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      personalGender: ['', Validators.compose([Validators.required])],
      maritalStatus: '',
      maritalStatusName: '',
      occupation: '',
      occupationName: '',
      personalIncome: ['', Validators.compose([Validators.required, Validators.maxLength(9)])],
      personalEmail: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
      personalMobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
      personalLandlineno: '',
      personalAddress: ['', Validators.required],
      personalAddress2: '',
      personalState: ['', Validators.required],
      personalCity: ['', Validators.required],
      personalPincode: ['', Validators.required],
      personalstdcode: '',
      personalGst: ['', Validators.compose([Validators.minLength(15)])],
      personalIsdn: '',
      personalCityName: '',
        personalStateIdP: ''
      });
    this.nomineeDetails = this.fb.group({
      nomineeName: ['', Validators.required],
      nomineeRelationship: ['', Validators.required],
      nomineeRelationshipName: '',

    });
  }

  ngOnInit() {
      if (this.payLaterr == true) {
          this.stepperindex = 3;
          console.log(this.payLaterr, 'this.payLaterrolll');
      } else {
          this.setOccupationList();
          this.maritalStatus();
          this.setRelationship();
          this.cholaTitlegender();
          //   for (let i = 0; i < this.relationsame1.length; i++) {
          //       if (this.relationsame1 = 'Spouse') {
          //           this.insureArray['controls'].items['controls'][i]['controls'].personalrelationship.patchValue('Spouse');
          //           this.insureArray['controls'].items['controls'][i]['controls'].personalrelationshipName.patchValue(this.relationshipList['Spouse']);
          //       }
          //   }
          // this.cholaTotalsuminsuredList();


          this.buyProductdetails = JSON.parse(sessionStorage.buyProductdetails);
          this.getFamilyDetails = JSON.parse(sessionStorage.changedTabDetails);
          this.insurePersons = this.getFamilyDetails.family_members;
          this.totalPermiumlist = this.getFamilyDetails.product_id;
          // for (let i = 0; i < this.getFamilyDetails.product_id.length; i++) {
          // }
          this.insureArray = this.fb.group({
              items: this.fb.array([])
          });
          for (let i = 0; i < this.getFamilyDetails.family_members.length; i++) {
              this.items = this.insureArray.get('items') as FormArray;
              this.items.push(this.initItemRows());
              this.insureArray['controls'].items['controls'][i]['controls'].type.setValue(this.getFamilyDetails.family_members[i].type);
          }
          this.sessionData();

      }
  }
  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  backAll() {
    this.topScroll();
    this.prevStep();
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
  heightValidate(event: any) {
     this.validation.heightValidate(event);
  }
  idValidate(event: any) {
    this.validation.idValidate(event);
  }
  topScroll() {
    document.getElementById('main-content').scrollTop = 0;
  }
  initItemRows() {
    return this.fb.group(
        {
         rolecd: 'PRIMARY',
          personalTitle: ['', Validators.required],
          personalFirstname: ['', Validators.required],
          personalLastname: ['', Validators.required],
          personalDob: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
          personalGender: ['', Validators.compose([Validators.required])],
          personalrelationship: ['', Validators.required],
          personalrelationshipName: '',
          sameasreadonly: false,
          sameAsProposer: false,
          sameas: false,
          insurerDobError: '',
          insurerDobValidError: '',
          type: '',
          ins_age: '',
          ins_days: '',
          preExistingDisease: 'No',

        }
    );
  }

  changeGender() {
    if (this.personal.controls['personalTitle'].value == 'Mr') {
      this.personal.controls['personalGender'].patchValue('MALE');
    } else {
      this.personal.controls['personalGender'].patchValue('FEMALE');
    }
  }

  insureChangeGender(index) {
    if (this.insureArray['controls'].items['controls'][index]['controls'].personalTitle.value == 'Mr') {
      this.insureArray['controls'].items['controls'][index]['controls'].personalGender.patchValue('MALE');
    } else {
      this.insureArray['controls'].items['controls'][index]['controls'].personalGender.patchValue('FEMALE');
    }
  }
  // proposal age calculation
  addEvent(event, type) {
    this.maxDate = '';
    if (event.value != null) {
      let selectedDate = '';
      let dob_days = '';
      this.personalAge = '';
      let dob = '';
      dob_days = this.datepipe.transform(event.value, 'dd-MM-y');
      if (typeof event.value._i == 'string') {
        const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;

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

            // if ((sessionStorage.personalAge >= 18) && (sessionStorage.personalAge <= 65) ) {
            //     this.personalAge.dobError('Proposer age between 18 to 65');
            // }
        }
        this.dobError = '';

      }
    }
  }
  // insured dob
   addEventInsurer(event, i, type) {

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
                if (pattern.test(event.value._i) && event.value._i.length == 10) {
                    this.insureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
                } else {
                    this.insureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('Enter Valid Date');
                }
                selectedDate = event.value._i;
                console.log(selectedDate.length, 'selectedDateselectedDate');
                if (selectedDate.length == 10) {
                    this.getAge = this.ageCalculate(dob);
                    console.log(this.getAge,'agee');
                    this.getDays = this.DobDaysCalculate(dob_days);
                    this.insureArray['controls'].items['controls'][i]['controls'].personalDob.patchValue(dob);
                    this.insureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
                    this.insureArray['controls'].items['controls'][i]['controls'].ins_age.patchValue(this.getAge);
                    this.insureArray['controls'].items['controls'][i]['controls'].ins_days.patchValue(this.getDays);
                } else {
                    this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
                }
            }else if (typeof event.value._i == 'object') {
                this.insureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
                if (dob.length == 10) {
                    this.getAge = this.ageCalculate(dob);
                    console.log(this.getAge,'ages');
                    this.getDays = this.DobDaysCalculate(dob_days);
                    this.insureArray['controls'].items['controls'][i]['controls'].personalDob.patchValue(dob);
                    this.insureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
                    this.insureArray['controls'].items['controls'][i]['controls'].ins_age.patchValue(this.getAge);
                    this.insureArray['controls'].items['controls'][i]['controls'].ins_days.patchValue(this.getDays);
                } else {
                    this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
                }
            }
            console.log(this.getAge, 'abcd');

            if(this.getAge >= 0) {
                this.ageValidation(i, type);
            } else {
                console.log("SDSDSDSDSd");
            }

        }

    }
    DobDaysCalculate(getDays) {
        let a = moment(getDays, 'DD/MM/YYYY');
        let b = moment(new Date(), 'DD/MM/YYYY');
        let days = b.diff(a, 'days');
        console.log(days, 'daysdays');
        return days;
    }
    ageValidation(i, type) {
        console.log(type, 'type');
        console.log(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value, 'days');

        if ((this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value < 6574 && type == 'Self') || (this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value > 24105 && type == 'Self')) {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Self age between 18 to 65');
        } else if (this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value >= 18 && type == 'Self')  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        }

        // if ((this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 18 && type == 'Spouse') || (this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value >= 65 && type == 'Spouse')) {
        //    this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Spouse age between 18 to 65');
        // } else if (this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value >= 18 && type == 'Spouse')  {
        //     this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        // }
        if((this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value < 6574 && type == 'Spouse') || (this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value > 24105 && type == 'Spouse')) {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age should be 18 years to 65 years');
        } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value >= 6574 && type == 'Spouse')  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        }
        console.log(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value);


        if ((parseInt(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value) <= 8034 && parseInt(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value) >= 91) && (type == 'Son' )) {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        }
        else if(parseInt(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value) < 91 && (type == 'Son' ))  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 91 days to 21 years');
        } else if(parseInt(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value) > 8034 && (type == 'Son' ))  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 91 days to 21 years');
        }
        console.log( this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.value);

        if((parseInt(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value) <= 8034 && parseInt(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value) >= 91) && (type == 'Daughter' )) {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        }
        else if(parseInt(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value) < 91 && (type == 'Daughter' ))  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 91 days to 21 years');
        } else if(parseInt(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value) > 8034 && (type == 'Daughter' ))  {
            this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 91 days to 21 years');
        }
        console.log( this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.value);





        // if (this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 36 && type == 'Mother') {
        //     this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Mother age should be above 36');
        // } else if (this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value > 36 && type == 'Mother')  {
        //     this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        // }
        // if (this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 36 && type == 'Father') {
        //     this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Father age should be above 36');
        // } else if (this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value > 36 && type == 'Father')  {
        //     this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        // }
        // if (this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 1 && type == 'Sister') {
        //     this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Sister age should be above 1');
        // } else if (this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value > 1 && type == 'Sister')  {
        //     this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        // }
        // if (this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 1 && type == 'Brother') {
        //     this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Brother age should be above 1');
        // } else if (this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value > 1 && type == 'Brother')  {
        //     this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        // }
        // if (this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 36 && type == ' Father In Law') {
        //     this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue(' Father In Law age should be above 36');
        // } else if (this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value > 36 && type == ' Father In Law')  {
        //     this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        // }
        // if (this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 36 && type == ' Mother In Law') {
        //     this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue(' Mother In Law age should be above 36');
        // } else if (this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value > 36 && type == ' Mother In Law')  {
        //     this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        // }



    }

  // insured page
  changeRelationShipList(index) {
    this.insureArray['controls'].items['controls'][index]['controls'].personalrelationshipName.patchValue(this.relationshipList[this.insureArray['controls'].items['controls'][index]['controls'].personalrelationship.value]);
 this.relationsame1 = this.insureArray['controls'].items['controls'][index]['controls'].personalrelationshipName.value;
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



  // Personal Details
  personalDetails(stepper: MatStepper, value) {
    this.personalData = value;
    sessionStorage.stepper1Details = '';
    sessionStorage.stepper1Details = JSON.stringify(value);
      console.log(this.personal, 'this.personal');
    if (this.personal.valid) {
       if ((sessionStorage.personalAge >= 18) && (sessionStorage.personalAge <= 65)) {
          if (this.mobileNumber == '' || this.mobileNumber == 'true') {
              this.insureArray['controls'].items['controls'][0]['controls'].personalTitle.patchValue(this.personal.controls['personalTitle'].value);
              this.insureArray['controls'].items['controls'][0]['controls'].personalFirstname.patchValue(this.personal.controls['personalFirstname'].value);
              this.insureArray['controls'].items['controls'][0]['controls'].personalLastname.patchValue(this.personal.controls['personalLastname'].value);
              this.insureArray['controls'].items['controls'][0]['controls'].personalDob.patchValue(this.personal.controls['personalDob'].value);
              this.insureArray['controls'].items['controls'][0]['controls'].personalGender.patchValue(this.personal.controls['personalGender'].value);
              this.insureArray['controls'].items['controls'][0]['controls'].personalrelationship.patchValue('Self');
              this.insureArray['controls'].items['controls'][0]['controls'].personalrelationshipName.patchValue(this.relationshipList['Self']);
              for (let i= 0; i < this.insureArray.value.items.length; i++) {
                  if (this.insureArray['controls'].items['controls'][i]['controls'].type.value == 'Spouse') {
                      this.insureArray['controls'].items['controls'][i]['controls'].personalrelationship.patchValue('Spouse');
                      this.insureArray['controls'].items['controls'][i]['controls'].personalrelationshipName.patchValue(this.relationshipList['Spouse']);
                  } else if (this.insureArray['controls'].items['controls'][i]['controls'].type.value == 'Son') {
                      this.insureArray['controls'].items['controls'][i]['controls'].personalrelationship.patchValue('Child1');
                      this.insureArray['controls'].items['controls'][i]['controls'].personalrelationshipName.patchValue('Son');
                  } else if (this.insureArray['controls'].items['controls'][i]['controls'].type.value == 'Daughter') {
                      this.insureArray['controls'].items['controls'][i]['controls'].personalrelationship.patchValue('Child2');
                      this.insureArray['controls'].items['controls'][i]['controls'].personalrelationshipName.patchValue('Daughter');
                  }
              }
              console.log(this.insureArray.value.items,"relationship length")

              stepper.next();
              this.topScroll();
              this.nextStep();
          }
           console.log(this.personal, 'this.personal');
       } else {
       this.toastr.error('Proposer age between 18 to 65');
      }
    }
  }
  // Insure Details
  cholaInsureDetails(stepper: MatStepper, value, i) {
    sessionStorage.stepper2Details = '';
    sessionStorage.stepper2Details = JSON.stringify(value);
    console.log(value, 'this.value');
    console.log(this.insureArray.valid, 'this.valid');
      let dateErrorMsg = [];


      let relationList = this.relationshipList;
      this.nomineerelationshipList = relationList;
      for ( let nrelation in this.nomineerelationshipList) {
          if (nrelation == 'Self') {
              delete this.nomineerelationshipList.Self;
          }
          console.log(this.nomineerelationshipList, 'nomineerelationshipList');
      }



    if (this.insureArray.valid) {
            let pedValid = true;
        for (let i= 0; i < this.insureArray.value.items.length; i++) {
            if (this.insureArray['controls'].items['controls'][i]['controls'].preExistingDisease.value == 'Yes') {
                pedValid = false;
            }
            if (this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.value != '') {
                dateErrorMsg.push(2);

            } else if (this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.value == '') {
                dateErrorMsg.push(3);

            }
        }
        console.log(pedValid, 'pedValid');
        if (pedValid) {
            this.insurerData = value.items;
            console.log(this.insurerData, 'this.insurerData');
            this.totalInsureDetails = [];
            for (let i = 0; i < this.insurePersons.length; i++) {
                this.totalInsureDetails.push({
                    'Title': this.insurerData[i].personalTitle,
                    'FirstName': this.insurerData[i].personalFirstname,
                    'LastName': this.insurerData[i].personalLastname,
                    'Gender': this.insurerData[i].personalGender,
                    'DOB': this.datepipe.transform(this.insurerData[i].personalDob, 'y-MM-dd'),
                    'Relationship': this.insurerData[i].personalrelationship,
                    'SumInsured': this.buyProductdetails.suminsured_amount,
                    'PreExistingDisease': this.insurerData[i].preExistingDisease
                });
            }
            if (dateErrorMsg.includes(2)) {
                this.toastr.error('check the date');
            } else {
                stepper.next();
                this.topScroll();
            }
        } else {
            this.toastr.error(' Sorry, PreExistingDisease are not allowed to purchase policy ');
        }
    }

  }

  // Nominee Details
  cholaNomineeDetails(stepper: MatStepper, value) {
    sessionStorage.stepper3Details = '';
    sessionStorage.stepper3Details = JSON.stringify(value);
console.log( sessionStorage.stepper3Details);
    if (this.nomineeDetails.valid) {
        this.nomineeData = value;
        console.log(this.nomineeData,'this.nomineeData');
        this.proposal(stepper);

      // mobile view
     //this.nextStep();
      // this.appolloMobileTrue3 = false;
      // this.appolloMobileTrue4 = false;
    }
  }

  // @ts-ignore
  // backAll(){
  //   this.topScroll();
  //   this.prevStep();
  // }


  // Session Details

  sessionData() {
    if (sessionStorage.CholaCityList != '' && sessionStorage.CholaCityList != undefined) {
      this.CholaCityList = JSON.parse(sessionStorage.CholaCityList);
    }

    if (sessionStorage.stepper1Details != '' && sessionStorage.stepper1Details != undefined) {
      this.getStepper1 = JSON.parse(sessionStorage.stepper1Details);
      this.personal = this.fb.group({
        personalTitle: this.getStepper1.personalTitle,
        personalFirstname: this.getStepper1.personalFirstname,
        personalLastname: this.getStepper1.personalLastname,
        personalDob: this.datepipe.transform(this.getStepper1.personalDob, 'y-MM-dd'),
        personalGender: this.getStepper1.personalGender,
        maritalStatus: this.getStepper1.maritalStatus,
        maritalStatusName: this.getStepper1.maritalStatusName,
        occupationName: this.getStepper1.occupationName,
        occupation: this.getStepper1.occupation,
        personalIncome: this.getStepper1.personalIncome,
        personalEmail: this.getStepper1.personalEmail,
        personalMobile: this.getStepper1.personalMobile,
        personalLandlineno: this.getStepper1.personalLandlineno,
        personalAddress: this.getStepper1.personalAddress,
        personalAddress2: this.getStepper1.personalAddress2,
        personalState: this.getStepper1.personalState,
        personalCity: this.getStepper1.personalCity,
        personalCityName: this.getStepper1.personalCityName,
        personalPincode: this.getStepper1.personalPincode,
        personalstdcode: this.getStepper1.personalstdcode,
        personalGst: this.getStepper1.personalGst,
        personalIsdn: this.getStepper1.personalIsdn,
        sameAsProposer: this.getStepper1.sameAsProposer,
        sameas: this.getStepper1.sameas,
          personalStateIdP: this.getStepper1.personalStateIdP

      });

    }

    if (sessionStorage.stepper2Details != '' && sessionStorage.stepper2Details != undefined) {
      this.getStepper2 = JSON.parse(sessionStorage.stepper2Details);
      for (let i = 0; i < this.getStepper2.items.length; i++) {
        this.insureArray['controls'].items['controls'][i]['controls'].personalTitle.patchValue(this.getStepper2.items[i].personalTitle);
        this.insureArray['controls'].items['controls'][i]['controls'].personalFirstname.patchValue(this.getStepper2.items[i].personalFirstname);
        this.insureArray['controls'].items['controls'][i]['controls'].personalLastname.patchValue(this.getStepper2.items[i].personalLastname);
        this.insureArray['controls'].items['controls'][i]['controls'].personalDob.patchValue(this.getStepper2.items[i].personalDob);
        this.insureArray['controls'].items['controls'][i]['controls'].personalGender.patchValue(this.getStepper2.items[i].personalGender);
        this.insureArray['controls'].items['controls'][i]['controls'].personalrelationship.patchValue(this.getStepper2.items[i].personalrelationship);
        this.insureArray['controls'].items['controls'][i]['controls'].personalrelationshipName.patchValue(this.getStepper2.items[i].personalrelationshipName);
        this.insureArray['controls'].items['controls'][i]['controls'].preExistingDisease.patchValue(this.getStepper2.items[i].preExistingDisease);
        this.insureArray['controls'].items['controls'][i]['controls'].sameasreadonly.patchValue(this.getStepper2.items[i].sameasreadonly);
        this.insureArray['controls'].items['controls'][i]['controls'].sameas.patchValue(this.getStepper2.items[i].sameas);
        this.insureArray['controls'].items['controls'][i]['controls'].sameAsProposer.patchValue(this.getStepper2.items[i].sameAsProposer);
        this.insureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue(this.getStepper2.items[i].insurerDobValidError);
        this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue(this.getStepper2.items[i].insurerDobError);
        this.insureArray['controls'].items['controls'][i]['controls'].ins_days.patchValue(this.getStepper2.items[i].ins_days);
        this.insureArray['controls'].items['controls'][i]['controls'].ins_age.patchValue(this.getStepper2.items[i].ins_age);
        this.insureArray['controls'].items['controls'][i]['controls'].type.patchValue(this.getStepper2.items[i].type);
      }
    }

   if (sessionStorage.stepper3Details != '' && sessionStorage.stepper3Details != undefined) {
      this.getStepper3 = JSON.parse(sessionStorage.stepper3Details);
      this.nomineeDetails = this.fb.group({
        nomineeName: this.getStepper3.nomineeName,
        nomineeRelationship: this.getStepper3.nomineeRelationship,
        nomineeRelationshipName: this.getStepper3.nomineeRelationshipName,
      });
   }
    console.log(this.getStepper3, 'this.getStepper3');


    if (sessionStorage.chola_health_proposal_id != '' && sessionStorage.chola_health_proposal_id != undefined) {
      this.proposalId = sessionStorage.chola_health_proposal_id;
    }

  }
 sameAsInsure(i) {
  // if(this.insureArray['controls'].items['controls'][0]['controls'].proposerAge.value > 55) {
  //       this.insureArray['controls'].items['controls'][0]['controls'].insurerDobError.value = 'Age between 18 to 55';
  //     } else {
  //       this.insureArray['controls'].items['controls'][0]['controls'].insurerDobError.value = '';
  //     }
    if (this.insureArray['controls'].items['controls'][0]['controls'].sameAsProposer.value) {

      this.insureArray['controls'].items['controls'][0]['controls'].sameasreadonly.patchValue(true);
      this.insureArray['controls'].items['controls'][0]['controls'].personalTitle.patchValue(this.personal.controls['personalTitle'].value);
      this.insureArray['controls'].items['controls'][0]['controls'].personalFirstname.patchValue(this.personal.controls['personalFirstname'].value);
      this.insureArray['controls'].items['controls'][0]['controls'].personalLastname.patchValue(this.personal.controls['personalLastname'].value);
      this.insureArray['controls'].items['controls'][0]['controls'].personalDob.patchValue(this.personal.controls['personalDob'].value);
      this.insureArray['controls'].items['controls'][0]['controls'].personalGender.patchValue(this.personal.controls['personalGender'].value);
      this.insureArray['controls'].items['controls'][0]['controls'].personalrelationship.patchValue('Self');
      this.insureArray['controls'].items['controls'][0]['controls'].personalrelationshipName.patchValue(this.relationshipList['Self']);
      // if(this.insureArray['controls'].items['controls'][0]['controls'].proposerAge.value > 55) {
      //   this.insureArray['controls'].items['controls'][0]['controls'].insurerDobError.value = 'Age between 18 to 55';
      // } else {
      //   this.insureArray['controls'].items['controls'][0]['controls'].insurerDobError.value = '';
      // }

    } else {
      this.insureArray['controls'].items['controls'][0]['controls'].sameasreadonly.patchValue(false);
      this.insureArray['controls'].items['controls'][0]['controls'].personalTitle.patchValue('');
      this.insureArray['controls'].items['controls'][0]['controls'].personalFirstname.patchValue('');
      this.insureArray['controls'].items['controls'][0]['controls'].personalLastname.patchValue('');
      this.insureArray['controls'].items['controls'][0]['controls'].personalDob.patchValue('');
      this.insureArray['controls'].items['controls'][0]['controls'].proposerDob.patchValue('');
      this.insureArray['controls'].items['controls'][0]['controls'].personalrelationship.patchValue('');
      this.insureArray['controls'].items['controls'][0]['controls'].personalrelationshipName.patchValue('');
    }

  }
    getPostal(pin, title) {
        const data = {
            'platform': 'web',
            'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
            'pincode': pin
        }
        if (pin.length == 6) {
            this.termService.getCheckpincodeChola(data).subscribe(
                (successData) => {
                    this.pincodeListSuccess(successData, title);
                },
                (error) => {
                    this.pincodeListFailure(error);
                }
            );
        }
    }
    public pincodeListSuccess(successData, title) {
        if (successData.IsSuccess) {
            this.response = successData.ResponseObject;
            // this.personal.controls['custMailStateCd'].patchValue(this.response.state_code);
            if (title == 'personal') {
                if (Object.keys(this.response).length === 0) {
                   this.personal.controls['personalCity'].patchValue('');
                    this.personal.controls['personalState'].patchValue('');
                    this.personal.controls['personalStateIdP'].patchValue('');
                    this.CholaCityList = {};
                } else {
                    this.CholaCityList = this.response.city;
                    console.log(this.CholaCityList,'this.CholaCityList')
                    this.personal.controls['personalState'].patchValue(this.response.state);
                    console.log(this.personal.controls['personalState'].value,'this.state')
                    this.personal.controls['personalStateIdP'].patchValue(this.response.state_code);
                    console.log(this.personal.controls['personalStateIdP'].value,'this.statecode');
                    this.personal.controls['personalCity'].patchValue(this.response.city);
                    console.log(this.personal.controls['personalCity'].value,'this.city');

                }
            }
            sessionStorage.CholaCityList = JSON.stringify(this.CholaCityList);

        } else {
            this.toastr.error('Invalid Pincode');
            if (title == 'personal') {
                sessionStorage.CholaCityList = '';
                this.CholaCityList = {};
                this.personal.controls['personalCity'].patchValue('');
                this.personal.controls['personalState'].patchValue('');
              this.personal.controls['personalStateIdP'].patchValue('');

            }
        }
    }
  public pincodeListFailure(error) {
  }
  //Title
  cholaTitlegender() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.termService.cholaTitle(data).subscribe(
        (successData) => {
          this.setTitlegenderSuccess(successData);
        },
        (error) => {
          this.setTitlegenderFailure(error);
        }
    );
  }

  public setTitlegenderSuccess(successData) {
    if (successData.IsSuccess == true) {
      this.genderTitleList = successData.ResponseObject;

    }
  }

  public setTitlegenderFailure(error) {
  }
  //Marital Status
  maritalStatus() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.termService.getCholaMaritalStatus(data).subscribe(
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
      this.maritalStatusList = successData.ResponseObject;

    }
  }

  public setMaritalStatusFailure(error) {
  }
    //City
    cholaCityList() {
        const data = {
            'platform': 'web',
            'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
        }
        this.termService.cityListChola(data).subscribe(
            (successData) => {
                this.setCityListSuccess(successData);
            },
            (error) => {
                this.setCityListFailure(error);
            }
        );
    }

    public setCityListSuccess(successData) {
        if (successData.IsSuccess == true) {
            this.CholaCityList = successData.ResponseObject;

        }
    }

    public setCityListFailure(error) {
    }


  setOccupationList() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.termService.occupationListchola(data).subscribe(
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


  setRelationship() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.termService.relationshipListChola(data).subscribe(
        (successData) => {
          this.setRelationshipSuccess(successData);
        },
        (error) => {
          this.setRelationshipFailure(error);
        }
    );
  }

  public setRelationshipSuccess(successData) {
    if (successData.IsSuccess == true) {
      this.relationshipList = successData.ResponseObject;
        console.log(this.relationshipList, 'relationshipListwee');
    }


  }
  public setRelationshipFailure(error) {
  }

    // proposal Creation

    proposal(stepper) {

        const data = {
            "enquiry_id": this.getFamilyDetails.enquiry_id,
            "proposal_id": sessionStorage.chola_health_proposal_id == '' || sessionStorage.chola_health_proposal_id == undefined ? '' : sessionStorage.chola_health_proposal_id,
            "user_id": this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            "role_id": this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
            "pos_status": this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
            "product_id": this.buyProductdetails.product_id,
            "suminsured_id": this.buyProductdetails.suminsured_id,
            "sum_insured_amount": this.buyProductdetails.suminsured_amount,
            "group_name": this.getFamilyDetails.name,
            "ProposalSave": {
                "ObjProposalService": {
                    // "NoOfAdult": "2",
                    // "NoOfChild": "0",
                    "TotalSumInsured": this.buyProductdetails.suminsured_amount,
                    // "DOB": "10/08/1990",
                    // "Relation": "Self",
                    // "Year": "1",
                    // "PreexistingDisease": "No",
                     "InsuranceDetails": "Family",
                    "ProposalDetails": {
                        "ClsMIBLProposalDetails": {
                            "Title": this.personal.controls['personalTitle'].value,
                            "FirstName": this.personal.controls['personalFirstname'].value,
                            "LastName":this.personal.controls['personalLastname'].value,
                            "DOB":this.datepipe.transform(this.personal.controls['personalDob'].value, 'y-MM-dd'),
                            "Maritalstatus": this.personal.controls['maritalStatusName'].value,
                            "Occupation": this.personal.controls['occupation'].value,
                            "Income": this.personal.controls['personalIncome'].value,
                            "Email": this.personal.controls['personalEmail'].value,
                            "Address1": this.personal.controls['personalAddress'].value,
                            "Address2": this.personal.controls['personalAddress2'].value,
                            "State": this.personal.controls['personalState'].value,
                            "City": this.personal.controls['personalCity'].value,
                            "Pincode": this.personal.controls['personalPincode'].value,
                            "STDCode": this.personal.controls['personalstdcode'].value,
                            "Landlineno": this.personal.controls['personalLandlineno'].value,
                            "MobileNumber": this.personal.controls['personalMobile'].value,
                            "Gender": this.personal.controls['personalGender'].value,
                            "CustMailStateCd": this.personal.controls['personalStateIdP'].value,
                            "GSTNumber": this.personal.controls['personalGst'].value,
                            "ISDNNumber": this.personal.controls['personalIsdn'].value,
                        }
                    },
                    "InsuredDetails": {
                        "clsInsuredDetails": this.totalInsureDetails,
                    },
                    "NomineeDetails": {
                        "ClsMIBLNomineeDetails": {
                            "NomineeName": this.nomineeData.nomineeName,
                            "NomineeRelationship": this.nomineeData.nomineeRelationship,
                        }
                    }
                    // "MIBLTransID": "ksakasjaiqw4a"
                }

            }
        };
        console.log(data,'proposal data')
       this.settings.loadingSpinner = true;
       this.termService.getCholaProposal(data).subscribe(
            (successData) => {
                this.setCholaProposalSuccess(successData, stepper);
            },
            (error) => {
                this.setCholaProposalFailure(error);
            }
        );

    }
    public setCholaProposalSuccess(successData, stepper) {
      this.settings.loadingSpinner = false;
        if (successData.IsSuccess == true) {
            stepper.next();
            this.topScroll();
            this.toastr.success('Proposal created successfully!!');
            this.summaryData = successData.ResponseObject;
            sessionStorage.summaryData = JSON.stringify(this.summaryData);
            this.proposalId = this.summaryData.ProposalId;
            this.proposerFormData = this.personal.value;
            this.nomineeFormData = this.nomineeDetails.value;
            this.insuredFormData = this.insurerData;
            sessionStorage.proposerFormData = JSON.stringify(this.proposerFormData);
            sessionStorage.insuredFormData = JSON.stringify(this.insuredFormData);
            sessionStorage.nomineeFormData = JSON.stringify(this.nomineeFormData);
            sessionStorage.chola_health_proposal_id = this.proposalId;
            this.createdDate = new Date();
            this.pos_status = this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4';
            this.PaymentActionUrl = this.summaryData.PaymentActionUrl;

            stepper.next();
          this.nextStep();

        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }
    public setCholaProposalFailure(error) {
    }



    //Summary residence detail

    changeMarital() {
        this.personal.controls['maritalStatusName'].patchValue(this.maritalStatusList[this.personal.controls['maritalStatus'].value]);
    }
    occupationListCode() {
        this.personal.controls['occupationName'].patchValue(this.occupationList[this.personal.controls['occupation'].value]);
    }
    changeCity() {
        this.personal.controls['personalCityName'].patchValue(this.CholaCityList[this.personal.controls['personalCity'].value]);
        console.log( this.personal.controls['personalCityName'].value,'cityghhj')
    }

  changeNomineeRelation() {
        this.nomineeDetails.controls['nomineeRelationshipName'].patchValue(this.relationshipList[this.nomineeDetails.controls['nomineeRelationship'].value]);
  }

  // pay Later
    payLater(){

      const data = {
            "enquiry_id": this.getFamilyDetails.enquiry_id,
            "proposal_id": sessionStorage.chola_health_proposal_id == '' || sessionStorage.chola_health_proposal_id == undefined ? '' : sessionStorage.chola_health_proposal_id,
            "user_id": this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            "role_id": this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
            "pos_status": this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
            "product_id": this.buyProductdetails.product_id,
            "totalPremium": this.summaryData.totalPremium,
            "company_logo": this.buyProductdetails.company_logo,
            "PaymentActionUrl": this.summaryData.PaymentActionUrl,
             'created-date': this.createdDate,
            'paymentlink-date': '',
            "suminsured_id": this.buyProductdetails.suminsured_id,
            "sum_insured_amount": this.buyProductdetails.suminsured_amount,
            "group_name": this.getFamilyDetails.name,
            "ProposalSave": {
                "ObjProposalService": {
                    "TotalSumInsured": this.buyProductdetails.suminsured_amount,
                    "InsuranceDetails": "Family",
                    "ProposalDetails": {
                        "ClsMIBLProposalDetails": {
                            "Title": this.personal.controls['personalTitle'].value,
                            "FirstName": this.personal.controls['personalFirstname'].value,
                            "LastName":this.personal.controls['personalLastname'].value,
                            "DOB":this.datepipe.transform(this.personal.controls['personalDob'].value, 'y-MM-dd'),
                            "Maritalstatus": this.personal.controls['maritalStatusName'].value,
                            "Occupation": this.personal.controls['occupation'].value,
                            "occupationName": this.personal.controls['occupationName'].value,
                            "Income": this.personal.controls['personalIncome'].value,
                            "Email": this.personal.controls['personalEmail'].value,
                            "Address1": this.personal.controls['personalAddress'].value,
                            "Address2": this.personal.controls['personalAddress2'].value,
                            "State": this.personal.controls['personalState'].value,
                            "City": this.personal.controls['personalCity'].value,
                            "Pincode": this.personal.controls['personalPincode'].value,
                            "STDCode": this.personal.controls['personalstdcode'].value,
                            "Landlineno": this.personal.controls['personalLandlineno'].value,
                            "MobileNumber": this.personal.controls['personalMobile'].value,
                            "Gender": this.personal.controls['personalGender'].value,
                            "CustMailStateCd": this.personal.controls['personalStateIdP'].value,
                            "GSTNumber": this.personal.controls['personalGst'].value,
                            "ISDNNumber": this.personal.controls['personalIsdn'].value,
                        }
                    },
                    "InsuredDetails": {
                        "clsInsuredDetails": this.totalInsureDetails,
                    },
                    "NomineeDetails": {
                        "ClsMIBLNomineeDetails": {
                            "NomineeName": this.nomineeData.nomineeName,
                            "NomineeRelationship": this.nomineeData.nomineeRelationship,
                        }
                    }
                    // "MIBLTransID": "ksakasjaiqw4a"
                }

            }
        };
        console.log(data, 'payyyyy');
        this.settings.loadingSpinner = true;
        this.termService.proposalPayLater(data).subscribe(
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
        this.termService.proposalGetRequest(data).subscribe(
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
            this.pos_status = this.requestDetails.role_id;
            this.PaymentActionUrl = this.requestDetails.PaymentActionUrl;
           this.proposerData = this.requestDetails.ProposalSave.ObjProposalService.ProposalDetails.ClsMIBLProposalDetails;
           this.insuredData = this.requestDetails.ProposalSave.ObjProposalService.InsuredDetails.clsInsuredDetails;
           this.nomineeDataPay = this.requestDetails.ProposalSave.ObjProposalService.NomineeDetails.ClsMIBLNomineeDetails;
        }
    }
    public getBackResFailure(successData) {
    }

}
