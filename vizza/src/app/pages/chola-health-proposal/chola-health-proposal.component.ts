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
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {HealthService} from '../../shared/services/health.service';
import {ActivatedRoute} from '@angular/router';
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
  public personalData: any;
  public mobileNumber: any;
  public taxRequired: any;
  public step: any;
  public items: any;
  public getStepper1: any;
  public getStepper2: any;
  public nomineeData: any;
  public getNomineeData: any;
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
  public agecal: any;
  public getAge: any;
  public getDays: any;
  public personalAge: any;
  public dobError: any;
  public sameValue: any;
  public maritalStatusList: any;
  public pincodeList: any;
  public occupationList: any;
  public summaryData: any;
  public RediretUrlLink: any;
  public proposalId: any;
  public proposerFormData : any;
  public nomineeFormData : any;
  public insuredFormData : any;
  constructor(public fb: FormBuilder, public authservice: AuthService, public http: HttpClient,public route: ActivatedRoute, public datepipe: DatePipe, public validation: ValidationService, public termService: HealthService, private toastr: ToastrService ) {
    let stepperindex = 0;
    this.route.params.forEach((params) => {
      if(params.stepper == true || params.stepper == 'true') {
        stepperindex = 4;
        if (sessionStorage.summaryData != '' && sessionStorage.summaryData != undefined) {
          this.summaryData = JSON.parse(sessionStorage.summaryData);
          this.RediretUrlLink = this.summaryData.PaymentURL;
          this.proposalId = this.summaryData.ProposalId;
          this.proposerFormData = JSON.parse(sessionStorage.proposerFormData);
          this.nomineeFormData = JSON.parse(sessionStorage.nomineeFormData);
          this.insuredFormData = JSON.parse(sessionStorage.insuredFormData);
          sessionStorage.chola_health_proposal_id = this.proposalId;
        }
      }
    });
    const minDate = new Date();
    this.minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
    let today  = new Date();
    this.today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    this.mobileNumber = 'true';
    this.taxRequired = '';
    this.step = 0;
    this.totalInsureDetails = [];
    this.arr = [];
    this.personal = this.fb.group({
      personalTitle: ['', Validators.required],
      personalFirstname: ['', Validators.required],
      personalLastname: ['', Validators.required],
      personalDob: ['', Validators.compose([Validators.required])],
      personalGender: ['', Validators.compose([Validators.required])],
      maritalStatus: '',
      maritalStatusName: '',
      occupation: '',
      occupationName: '',
      personalIncome: '',
      personalEmail: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
      personalMobile: ['', Validators.compose([ Validators.pattern('[6789][0-9]{9}')])],
      personalLandlineno: '',
      personalAddress: ['', Validators.required],
      personalAddress2: '',
      personalState: '',
      personalCity: '',
      personalPincode: '',
      personalstdcode: '',
      custMailStateCd: '',
      personalGst: ['', Validators.compose([Validators.minLength(15)])],
      personalIsdn: '',
      });
    this.nomineeDetails = this.fb.group({
      nomineeName: '',
      nomineeRelationship: '',
    });
  }

  ngOnInit() {

    this.setOccupationList();
    this.maritalStatus();
    this.setRelationship();

    // this.buyProductdetails = JSON.parse(sessionStorage.buyProductdetails);
    // this.getFamilyDetails = JSON.parse(sessionStorage.changedTabDetails);
    // this.insurePersons = this.getFamilyDetails.family_members;
    this.insureArray = this.fb.group({
      items: this.fb.array([])
    });
    for (let i = 0; i < 1; i++) {
      this.items = this.insureArray.get('items') as FormArray;
      console.log(this.items , 'jkgghhfghjf');
      this.items.push(this.initItemRows());
      console.log(this.items , 'jkggooooohjf');

      this.insureArray['controls'].items['controls'][i]['controls'].type.patchValue({type : 'Self'});
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
          personalTitle: '',
          personalFirstname: '',
          personalLastname: '',
          personalDob: '',
          personalGender: '',
          personalrelationship: '',
          personalrelationshipName: '',
          sumInsured: '',
          sameasreadonly: false,
          sameAsProposer: false,
          sameas: false,
          insurerDobError: '',
          insurerDobValidError: '',
          dobErrorStartDate: '',
          type: '',

        }
    );
  }

  changeGender() {
    if (this.personal.controls['personalTitle'].value == 'Mr.') {
      this.personal.controls['personalGender'].patchValue('Male');
    } else {
      this.personal.controls['personalGender'].patchValue('Female');
    }
  }

  insureChangeGender(index) {
    if (this.insureArray['controls'].items['controls'][index]['controls'].personalTitle.value == 'Mr.') {
      this.insureArray['controls'].items['controls'][index]['controls'].personalGender.patchValue('Male');
    } else {
      this.insureArray['controls'].items['controls'][index]['controls'].personalGender.patchValue('Female');
    }
  }

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
        }
        this.dobError = '';

      }
    }
  }
  // insured dob
  addEventInsurer(event,  i, type, name) {
    if (event.value != null) {
      let selectedDate = '';
      let dob = '';
      let dob_days = '';
      this.personalAge = '';
      let getAge;
      let getDays;
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
        if (selectedDate.length == 10) {
          if (name == 'insurer') {
            getAge = this.ageCalculate(dob);
            getDays = this.DobDaysCalculate(dob_days);
            this.insureArray['controls'].items['controls'][i]['controls'].personalDob.patchValue(dob);
          }
        } else {
          this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        }
      } else if (typeof event.value._i == 'object') {
        this.insureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
        if (dob.length == 10) {
          if (name == 'insurer') {
            getAge = this.ageCalculate(dob);
            getDays = this.DobDaysCalculate(dob_days);
            this.insureArray['controls'].items['controls'][i]['controls'].personalDob.patchValue(dob);
          }
        }
      }
      // let length =  this.datepipe.transform(this.insureArray['controls'].items['controls'][i]['controls'].personalDob.value, 'y-MM-dd');
      console.log(getDays, 'getDays');

      if (getDays || getDays == 0) {
        if (name == 'insurer') {
          this.insureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
          this.insureArray['controls'].items['controls'][i]['controls'].ins_age.patchValue(getAge);
          this.insureArray['controls'].items['controls'][i]['controls'].ins_days.patchValue(getDays);
          this.ageValidation(i, type);
        }
      } else {
        this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
      }

    }

  }
  ageValidation(i, type) {

    if (this.buyProductdetails.product_id == "2") {
      if (this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value <= 16800 && type == 'Self') {
        this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Self age should be 46 and above');
      } else if (this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value >=16800 && type == 'Self')  {
        this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        this.arr.push(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value);
      }
      if (this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value < 16800 && type == 'Spouse') {
        this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Spouse age should be 46 and above');
      } else if (this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value >= 16800 && type == 'Spouse')  {
        this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        this.arr.push(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value);
      }
    } else {
      if (this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value < 6574 && type == 'Self') {
        this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Self age should be 18 and above');
      } else if (this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value > 6573 && type == 'Self')  {
        this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        this.arr.push(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value);
      }
      if (this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value < 6574 && type == 'Spouse') {
        this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Spouse age should be 18 and above');
      } else if (this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value > 6573 && type == 'Spouse')  {
        this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        this.arr.push(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value);
      }
    }


    let smallest = this.arr[0];
    for (let i = 1; i < this.arr.length; i++) {
      if (this.arr[i] < smallest) {
        smallest = this.arr[i];
      }
    }


    if (this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value > 90 && this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value <= 9495 && type == 'Son')  {
      this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
    } else if (this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value < 91 && type == 'Son')  {
      this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 91 days to 25 years');
    } else if (this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value >= 9495 && type == 'Son')  {
      this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 91 days to 25 years');
    }

    if (this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value > 90 && this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value <= 9495 && type == 'Daughter')  {
      this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
    } else if (this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value < 91 && type == 'Daughter')  {
      this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 91 days to 25 years');
    } else if (this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value >= 9495 && type == 'Daughter')  {
      this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 91 days to 25 years');
    }



    if (this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 36 && type == 'Mother') {
      this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Mother age should be above 36');
    } else if (this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value > 36 && type == 'Mother')  {
      this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
    }
    if (this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 36 && type == 'Father') {
      this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Father age should be above 36');
    } else if (this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value > 36 && type == 'Father')  {
      this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
    }
    if (this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 1 && type == 'Sister') {
      this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Sister age should be above 1');
    } else if (this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value > 1 && type == 'Sister')  {
      this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
    }
    if (this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 1 && type == 'Brother') {
      this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Brother age should be above 1');
    } else if (this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value > 1 && type == 'Brother')  {
      this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
    }
    if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 36 && type == ' Father In Law') {
      this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue(' Father In Law age should be above 36');
    } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value > 36 && type == ' Father In Law')  {
      this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
    }
    if (this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 36 && type == ' Mother In Law') {
      this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue(' Mother In Law age should be above 36');
    } else if (this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value > 36 && type == ' Mother In Law')  {
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

  // insured page
  changeRelationShipList(index){
    this.insureArray['controls'].items['controls'][index]['controls'].personalrelationshipName.patchValue(this.relationshipList[this.insureArray['controls'].items['controls'][index]['controls'].personalrelationship.value]);
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
  DobDaysCalculate(getDays) {
    let a = moment(getDays, 'DD/MM/YYYY');
    let b = moment(new Date(), 'DD/MM/YYYY');
    let days = b.diff(a, 'days');
    return days;
  }


  //Personal Details
  personalDetails(stepper: MatStepper, value) {
    this.personalData = value;
    sessionStorage.stepper1Details = '';
    sessionStorage.stepper1Details = JSON.stringify(value);
    if (this.personal.valid) {
       if (sessionStorage.personalAge >= 18) {
           if (this.mobileNumber == '' || this.mobileNumber == 'true'){
              stepper.next();
              this.topScroll();
              this.nextStep();
           }
       } else {
       this.toastr.error('Proposer age should be 18 or above');
      }
    }
  }
  //Insure Details
  cholaInsureDetails(stepper: MatStepper, id, value, key) {
    sessionStorage.stepper2Details = '';
    sessionStorage.stepper2Details = JSON.stringify(value);
    console.log(this.insureArray, 'this.insureArray');
    console.log(this.insureArray.valid, 'this.valid');
    if (this.insureArray.valid) {
      // this.insurerData = value.items;
      // this.totalInsureDetails = [];

          stepper.next();
          this.topScroll();
          this.nextStep();


    }

  }

  //Nominee Details
  religareNomineeDetails(stepper: MatStepper, value) {
    sessionStorage.nomineeData = '';
    sessionStorage.nomineeData = JSON.stringify(value);
    if (this.nomineeDetails.valid) {
      this.nomineeData = value;
      this.proposal(stepper);

      // mobile view
      // this.nextStep();
      // this.appolloMobileTrue3 = false;
      // this.appolloMobileTrue4 = false;
    }
  }

  // @ts-ignore
  // backAll(){
  //   this.topScroll();
  //   this.prevStep();
  // }

  // proposal Creation

  proposal(stepper) {
    // console.log(this.proposer.controls['sameAsInsured'].value, 'kjkkj');
    // const data = {
    //   "user_id": this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
    //   "role_id": this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
    //   "pos_status": this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    //   "platform": "web",
    //   "product_id": this.lifePremiumList.product_id,
    //   "suminsured_id":  this.getEnquiryDetials.sum_assured_id,
    //   "policy_id": this.getEnquiryDetials.policy_id,
    //   "insurer_proposer": {
    //     "title": this.proposer.controls['title'].value,
    //     "firstName": this.proposer.controls['firstName'].value,
    //     "middleName": this.proposer.controls['midName'].value,
    //     "lastName": this.proposer.controls['lastName'].value,
    //     "dob":this.datepipe.transform(this.proposer.controls['dob'].value,'yyyy/MM/dd'),
    //     "age": this.proposer.controls['age'].value,
    //     "gender": this.proposer.controls['gender'].value,
    //     "mobile": this.proposer.controls['mobile'].value,
    //     "email": this.proposer.controls['email'].value,
    //     "alternate_contact": this.proposer.controls['alterMobile'].value,
    //     "maritalStatus": this.proposer.controls['maritalStatus'].value,
    //     "annualIncome": this.proposer.controls['annualIncome'].value,
    //     "occupation": this.proposer.controls['occupationList'].value,
    //     "education": this.proposer.controls['education'].value,
    //     "height": this.proposer.controls['height'].value,
    //     "weight": this.proposer.controls['weight'].value,
    //     "weightChanged":this.proposer.controls['weightChanged'].value,
    //     "aadhaar": this.proposer.controls['aadharNum'].value,
    //     "smoker": "N",
    //     "sameAsProposer": this.proposer.controls['sameAsInsured'].value == 'true'  || this.proposer.controls['sameAsInsured'].value == true ? "Y":"N" ,
    //     "modeOfComm": "E",
    //     "commMail/SMS": "",
    //     "preferredLanguage": this.proposer.controls['language'].value,
    //     "proposer_type": this.proposer.controls['proposerType'].value,
    //     "documentLanguage": this.proposer.controls['language2'].value,
    //     "lifeBenefit": this.enquiryFormData.lifePolicy,
    //     "benefitTerm": this.enquiryFormData.lifeBenefitTerm,
    //     "premiumPaymentTerm": "10",
    //     "premiumFrequency": "12",
    //     "nationality": this.proposer.controls['nationality'].value,
    //     "countryOfResidence": this.proposer.controls['countryOfResid'].value,
    //     "placeOfBirth": this.proposer.controls['pob'].value,
    //     "cititzenship": this.proposer.controls['citizenship'].value,
    //     "IpRelation": this.proposer.controls['sameAsInsured'].value == 'true' || this.proposer.controls['sameAsInsured'].value == true ? 'SELF' : this.proposer.controls['IpRelation'].value,
    //     "CountryIpMailing":"IN",
    //     "politicallyExposedPerson": this.proposer.controls['politicallyExposedPerson'].value,
    //     "ifYesGiveDetails": this.proposer.controls['ifYesGiveDetails'].value,
    //   },
    //   "family_details": {
    //     "fatherName": this.proposer.controls['fatherName'].value,
    //     "motherName": this.proposer.controls['motherName'].value,
    //     "spouseBirthPlace": this.proposer.controls['spouseBirthPlace'].value,
    //     "spouseName": this.proposer.controls['spouseName'].value == null ? '' : this.proposer.controls['spouseName'].value,
    //     "spouseDob":this.datepipe.transform(this.proposer.controls['spouseDob'].value,'yyyy/MM/dd')== null ? '' : this.datepipe.transform(this.proposer.controls['spouseDob'].value,'yyyy/MM/dd'),
    //   },
    //   "nominee_details": {
    //     "nominee1Name": this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].nnName.value,
    //     "nominee1BirthPlace": this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].nBirthPlace.value,
    //     "nominee1Dob":  this.datepipe.transform(this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].nDob.value,'yyyy/MM/dd'),
    //     "nominee1Relation": this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].nRelation.value,
    //     "nominee2Name": this.nomineeDetail.value.itemsNominee.length > 1 ? this.nomineeDetail['controls'].itemsNominee['controls'][1]['controls'].nRelation.value : '',
    //     "nominee2BirthPlace":this.nomineeDetail.value.itemsNominee.length > 1 ? this.nomineeDetail['controls'].itemsNominee['controls'][1]['controls'].nBirthPlace.value : '',
    //     "nominee2Dob": this.nomineeDetail.value.itemsNominee.length > 1 ? this.nomineeDetail['controls'].itemsNominee['controls'][1]['controls'].nDob.value : '',
    //     "nominee2Relation": this.nomineeDetail.value.itemsNominee.length > 1 ? this.nomineeDetail['controls'].itemsNominee['controls'][1]['controls'].nRelation.value : '',
    //     "sharePercentage": this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].sharePercentage.value,
    //     "appointeeName": this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].aName.value,
    //     "appointeeDob":this.datepipe.transform(this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].appointeeDob.value,'yyyy/MM/dd')== null ? '': this.datepipe.transform(this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].appointeeDob.value,'yyyy/MM/dd'),
    //     "appointeeRelationToNominee": this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].appointeeRelationToNominee.value,
    //     "RelationToInsured": this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].relationToInsured.value
    //   },
    //
    //   "address_details": {
    //     "comDoorNo": this.proposer.controls['comDoorNo'].value,
    //     "comBuildingNumber": this.proposer.controls['comBuildingNumber'].value,
    //     "comPlotNumber":this.proposer.controls['comPlotNumber'].value,
    //     "comLandmark": this.proposer.controls['comLandmark'].value,
    //     "comPlace": this.proposer.controls['comPlace'].value,
    //     "comDistrict": this.proposer.controls['comDistrict'].value,
    //     "comState": this.proposer.controls['state'].value,
    //     "comPincode": this.proposer.controls['pincode'].value,
    //     "perDoorNo": this.proposer.controls['perDoorNo'].value,
    //     "perBuildingNumber": this.proposer.controls['perBuildingNumber'].value,
    //     "perPlotNumber": this.proposer.controls['perPlotNumber'].value,
    //     "perLandmark": this.proposer.controls['perLandmark'].value,
    //     "perPlace": this.proposer.controls['perPlace'].value,
    //     "perDistrict": this.proposer.controls['perDistrict'].value,
    //     "perState": this.proposer.controls['rstate'].value,
    //     "perPincode": this.proposer.controls['rpincode'].value,
    //     "comSameAsPer": this.proposer.controls['sameAsProposer'].value ? "Y" : "N",
    //
    //   },
    //
    //
    //
    //   "bank_deatils": {
    //     "accountHolderName": this.bankDetail.controls['accountHolderName'].value,
    //     "branchName": this.bankDetail.controls['branchName'].value,
    //     "accountNo": this.bankDetail.controls['accountNo'].value,
    //     "accountType": this.bankDetail.controls['accountType'].value,
    //     "ifscCode": this.bankDetail.controls['ifscCode'].value,
    //     "micrCode": this.bankDetail.controls['micrCode'].value,
    //   },
    //   "office_details": {
    //     "department":this.proposer.controls['department'].value == null ? '' : this.proposer.controls['department'].value,
    //     "officeName": this.proposer.controls['officeName'].value ==null ? '' : this.proposer.controls['officeName'].value,
    //     "officeAddress1": this.proposer.controls['officeAddress1'].value ==null ? '':this.proposer.controls['officeAddress1'].value,
    //     "officeAddress2": this.proposer.controls['officeAddress2'].value ==null ?'':this.proposer.controls['officeAddress2'].value,
    //     "officeAddress3": this.proposer.controls['officeAddress3'].value == null ? '' :this.proposer.controls['officeAddress3'].value,
    //     "officeDistrict": this.proposer.controls['officeDistrict'].value == null ? '':this.proposer.controls['officeDistrict'].value,
    //     "officeState": this.proposer.controls['officeState'].value == null ? '':this.proposer.controls['officeState'].value,
    //     "officePincode": this.proposer.controls['officePincode'].value == null ? '' :this.proposer.controls['officePincode'].value,
    //     "officeNumber": this.proposer.controls['officeNumber'].value == null ? '': this.proposer.controls['officeNumber'].value,
    //   },
    //   "other_details": {
    //     "addressProof": this.proposer.controls['addressProof'].value,
    //     "ageProof": this.proposer.controls['ageProof'].value,
    //     "incomeProof": this.proposer.controls['incomeProof'].value,
    //     "idProof": this.proposer.controls['idProof'].value,
    //   },
    //   "question_details": this.setQuestionDetails
    // }
    // console.log(data,'fileeee');
    // this.settings.loadingSpinner = true;
    // this.termService.proposalCreation(data).subscribe(
    //     (successData) => {
    //       this.proposalSuccess(successData,stepper);
    //     },
    //     (error) => {
    //       this.proposalFailure(error);
    //     }
    // );
  }
  // public proposalSuccess(successData, stepper){
  //   this.settings.loadingSpinner = false;
  //
  //   if(successData.IsSuccess){
  //     stepper.next();
  //     this.topScroll();
  //     this.toastr.success('Proposal created successfully!!');
  //     this.summaryData = successData.ResponseObject;
  //     this.requestedUrl =this.summaryData.biUrlLink;
  //
  //     this.downloadFile(this.requestedUrl);
  //
  //     this.proposerFormData = this.proposer.value;
  //     this.bankDetailFormData = this.bankDetail.value;
  //     this.nomineeDetailFormData = this.nomineeDetail.value.itemsNominee;
  //     console.log(this.nomineeDetailFormData,'dff');
  //
  //   } else {
  //     this.toastr.error(successData.ErrorObject, 'Failed');
  //   }
  //
  // }
  // public proposalFailure(error){
  //
  // }
  //
  // downloadFile(value) {
  //   this.termService.downloadPdfNew().subscribe(
  //       (successData) => {
  //         console.log(successData, 'successDatasuccessData');
  //
  //       },
  //       (error) => {
  //       }
  //   );
  //
  //
  //
  //   // this.http.get(
  //   //     'https://balicuat.bajajallianz.com/lifeinsurance/traditionalProds/generatePdf.do?p_in_obj_1.stringval2=BI_PDF&p_in_var_2=1000000102').subscribe(
  //   //     (response) => {
  //   //         var mediaType = 'application/pdf';
  //   //         var blob = new Blob([response._body], {type: mediaType});
  //   //         var filename = 'test.pdf';
  //   //         saveAs(blob, filename);
  //   //     });
  // }

  // Session Details

  sessionData() {

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
        personalPincode: this.getStepper1.personalPincode,
        personalstdcode: this.getStepper1.personalstdcode,
        custMailStateCd: this.getStepper1.custMailStateCd,
        personalGst: this.getStepper1.personalGst,
        personalIsdn: this.getStepper1.personalIsdn,
        sameAsProposer: this.getStepper1.sameAsProposer,
        sameas: this.getStepper1.sameas,

      });
      let age = this.ageCalculate(this.datepipe.transform(this.getStepper1.proposerDob, 'y-MM-dd'));
      sessionStorage.personalDob = age;

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
        this.insureArray['controls'].items['controls'][i]['controls'].sumInsured.patchValue(this.getStepper2.items[i].sumInsured);
        this.insureArray['controls'].items['controls'][i]['controls'].sameasreadonly.patchValue(this.getStepper2.items[i].sameasreadonly);
        this.insureArray['controls'].items['controls'][i]['controls'].sameas.patchValue(this.getStepper2.items[i].sameas);
        this.insureArray['controls'].items['controls'][i]['controls'].sameAsProposer.patchValue(this.getStepper2.items[i].sameAsProposer);
        this.insureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue(this.getStepper2.items[i].insurerDobValidError);
        this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue(this.getStepper2.items[i].insurerDobError);
        this.insureArray['controls'].items['controls'][i]['controls'].dobErrorStartDate.patchValue(this.getStepper2.items[i].dobErrorStartDate);
      }
    }
    // if (sessionStorage.stepper3Details != '' && sessionStorage.stepper1Details != undefined) {
    //
    //     this.getStepper3 = JSON.parse(sessionStorage.stepper3Details);
    //     this.riskDetails = this.fb.group({
    //         serviceTax: this.getStepper3.serviceTax,
    //         ServicesTaxId: this.getStepper3.ServicesTaxId,
    //         relianceAda: this.getStepper3.relianceAda,
    //         companyname: this.getStepper3.companyname,
    //         employeeCode: this.getStepper3.employeeCode,
    //         emailId: this.getStepper3.emailId,
    //         crossSell: this.getStepper3.crossSell,
    //         crossSellPolicyNo: this.getStepper3.crossSellPolicyNo
    //     });
    //     }




    if (sessionStorage.nomineeData != '' && sessionStorage.nomineeData != undefined) {
      this.getNomineeData = JSON.parse(sessionStorage.nomineeData);
      this.nomineeDetails = this.fb.group({
        nomineeName: this.getNomineeData.nomineeName,
        nomineeRelationship: this.getNomineeData.nomineeRelationship,
        nomineeRelationshipName: this.getNomineeData.nomineeRelationshipName,

      });

    }
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
      this.insureArray['controls'].items['controls'][0]['controls'].personalrelationship.patchValue('1');
      this.insureArray['controls'].items['controls'][0]['controls'].personalrelationshipName.patchValue(this.relationshipList['1']);
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
            this.pincodeList = successData.ResponseObject;
            if (title == 'personal') {
                this.personal.controls['personalCity'].setValue(this.pincodeList.personalCity);
                this.personal.controls['personalState'].setValue(this.pincodeList.personalState);
            } else {
                this.personal.controls['rcity'].setValue(this.pincodeList.rcity);
                this.personal.controls['rstate'].setValue(this.pincodeList.rstate);
            }
            console.log(this.pincodeList, 'pro');
        } else {
            this.toastr.error('In valid Pincode');
            if (title == 'personal') {
                this.personal.controls['personalCity'].setValue('');
                this.personal.controls['personalState'].setValue('');
            } else {
                this.personal.controls['rcity'].setValue('');
                this.personal.controls['rstate'].setValue('');
            }

        }
    }
  public pincodeListFailure(error) {
  }
  //Marital Status
  maritalStatus() {
    const data = {
      'platform': 'web',
      'product_id': '11',
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
  setOccupationList() {
    const data = {
      'platform': 'web',
      'product_id': '11',
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
      'product_id': '11',
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
    this.relationshipList = successData.ResponseObject;

  }
  public setRelationshipFailure(error) {
  }
    //Summary residence detail

    changeMarital() {
        this.personal.controls['maritalStatusName'].patchValue(this.maritalStatusList[this.personal.controls['maritalStatus'].value]);
    }
    occupationListCode() {
        this.personal.controls['occupationName'].patchValue(this.occupationList[this.personal.controls['occupation'].value]);
    }

  changeNomineeRelation() {
        this.nomineeDetails.controls['nomineeRelationshipName'].patchValue(this.relationshipList[this.nomineeDetails.controls['nomineeRelationship'].value]);
  }

}
