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
  public arr : any;
  public minDate: any;
  public maxDate: any;
  constructor(public fb: FormBuilder, public auth: AuthService, public http: HttpClient, public datepipe: DatePipe, public validation: ValidationService, private toastr: ToastrService ) {

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
      personalFirstname: ['', Validators.required],
      personalLastname: ['', Validators.required],
      personalDob: ['', Validators.compose([Validators.required])],
      personalGender: ['', Validators.compose([Validators.required])],
      maritalStatus: '',
      occupation: '',
      personalIncome: '',
      personalEmail: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
      personalMobile: ['', Validators.compose([ Validators.pattern('[6789][0-9]{9}')])],
      personalLandlineno: '',
      personalAddress: ['', Validators.required],
      personalAddress2: '',
      personalCity: '',
      personalPincode: '',
      personalstdcode: '',
      custMailStateCd: '',
      personalGst: ['', Validators.compose([Validators.minLength(15)])],
      personalIsdn: '',
      });
    this.nomineeDetails = this.fb.group({
      nomineeName:'',
      nomineeRelationship:'',
    });
  }

  ngOnInit() {
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
  backAll(){
    this.topScroll();
    this.prevStep();
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
  topScroll() {
    document.getElementById('main-content').scrollTop = 0;
  }
  initItemRows() {
    return this.fb.group(
        {
          rolecd: 'PRIMARY',

          personalFirstname: '',
          personalLastname: '',
          personalDob: '',
          personalGender: '',
          personalrelationship: '',
          personalrelationshipName: '',
          sumInsured: '',
          sameasreadonly:false,

        }
    );
  }
  // insured dob
  addEventInsurer(event,  i, type, name) {
    if (event.value != null) {
      let selectedDate = '';
      let dob = '';
      let dob_days = '';
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

    if(this.buyProductdetails.product_id == "2") {
      if(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value <= 16800 && type == 'Self') {
        this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Self age should be 46 and above');
      } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value >=16800 && type == 'Self')  {
        this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        this.arr.push(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value);
      }
      if(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value < 16800 && type == 'Spouse') {
        this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Spouse age should be 46 and above');
      } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value >= 16800 && type == 'Spouse')  {
        this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        this.arr.push(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value);
      }
    } else {
      if(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value < 6574 && type == 'Self') {
        this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Self age should be 18 and above');
      } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value > 6573 && type == 'Self')  {
        this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        this.arr.push(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value);
      }
      if(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value < 6574 && type == 'Spouse') {
        this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Spouse age should be 18 and above');
      } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value > 6573 && type == 'Spouse')  {
        this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        this.arr.push(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value);
      }
    }


    let smallest = this.arr[0];
    for(let i = 1; i < this.arr.length; i++){
      if(this.arr[i] < smallest){
        smallest = this.arr[i];
      }
    }


    if(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value > 90 && this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value <= 9495 && type == 'Son')  {
      this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
    } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value < 91 && type == 'Son')  {
      this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 91 days to 25 years');
    } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value >= 9495 && type == 'Son')  {
      this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 91 days to 25 years');
    }

    if(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value > 90 && this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value <= 9495 && type == 'Daughter')  {
      this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
    } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value < 91 && type == 'Daughter')  {
      this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age between 91 days to 25 years');
    } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_days.value >= 9495 && type == 'Daughter')  {
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
      // if (sessionStorage.personalAge >= 18) {
      //   if (this.mobileNumber == '' || this.mobileNumber == 'true'){
      //
      //     if(this.personal.controls['serviceTax'].value == 'No') {
      //       this.personal.controls['ServicesTaxId'].patchValue('');
      //       this.taxRequired = '';
      //       stepper.next();
      //       this.topScroll();
      //       this.nextStep();
      //     } else {
      //       if(this.personal.controls['ServicesTaxId'].value != '') {
      //         this.taxRequired = '';
              stepper.next();
              this.topScroll();
              this.nextStep();
      //       } else {
      //         this.taxRequired = 'Services Tax is required';
      //       }
      //     }
      //   }
      //
      // } else {
      //   this.toastr.error('Proposer age should be 18 or above');
      // }
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

  // Session Details

  sessionData() {

    if (sessionStorage.stepper1Details != '' && sessionStorage.stepper1Details != undefined) {
      this.getStepper1 = JSON.parse(sessionStorage.stepper1Details);
      this.personal = this.fb.group({
        personalFirstname: this.getStepper1.serviceTax,
        personalLastname: this.getStepper1.serviceTax,
        personalDob: this.getStepper1.serviceTax,
        personalGender: this.getStepper1.serviceTax,
        maritalStatus: this.getStepper1.serviceTax,
        occupation: this.getStepper1.serviceTax,
        personalIncome: this.getStepper1.serviceTax,
        personalEmail: this.getStepper1.serviceTax,
        personalMobile: this.getStepper1.serviceTax,
        personalLandlineno: this.getStepper1.serviceTax,
        personalAddress: this.getStepper1.serviceTax,
        personalAddress2: this.getStepper1.serviceTax,
        personalCity: this.getStepper1.serviceTax,
        personalPincode: this.getStepper1.serviceTax,
        personalstdcode: this.getStepper1.serviceTax,
        custMailStateCd: this.getStepper1.serviceTax,
        personalGst: this.getStepper1.serviceTax,
        personalIsdn: this.getStepper1.serviceTax,

      });


    }

    if (sessionStorage.stepper2Details != '' && sessionStorage.stepper2Details != undefined) {
      this.getStepper2 = JSON.parse(sessionStorage.stepper2Details);
      for (let i = 0; i < this.getStepper2.items.length; i++) {
        this.insureArray['controls'].items['controls'][i]['controls'].personalFirstname.patchValue(this.getStepper2.items[i].personalFirstname);
        this.insureArray['controls'].items['controls'][i]['controls'].personalLastname.patchValue(this.getStepper2.items[i].personalLastname);
        this.insureArray['controls'].items['controls'][i]['controls'].personalDob.patchValue(this.getStepper2.items[i].personalDob);
        this.insureArray['controls'].items['controls'][i]['controls'].personalGender.patchValue(this.getStepper2.items[i].personalGender);
        this.insureArray['controls'].items['controls'][i]['controls'].personalrelationship.patchValue(this.getStepper2.items[i].personalrelationship);
        this.insureArray['controls'].items['controls'][i]['controls'].personalrelationshipName.patchValue(this.getStepper2.items[i].personalrelationshipName);
        this.insureArray['controls'].items['controls'][i]['controls'].sumInsured.patchValue(this.getStepper2.items[i].sumInsured);
        this.insureArray['controls'].items['controls'][i]['controls'].sameasreadonly.patchValue(this.getStepper2.items[i].sameasreadonly);
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

  }

}
