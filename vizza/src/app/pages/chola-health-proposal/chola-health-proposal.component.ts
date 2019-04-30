import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {HttpClient} from '@angular/common/http';
import {ValidationService} from '../../shared/services/validation.service';
import {ToastrService} from 'ngx-toastr';
import {MatStepper} from '@angular/material';

@Component({
  selector: 'app-chola-health-proposal',
  templateUrl: './chola-health-proposal.component.html',
  styleUrls: ['./chola-health-proposal.component.scss']
})
export class CholaHealthProposalComponent implements OnInit {
  public personal: FormGroup;
  public insureArray: FormGroup;
  public nomineeDetails: FormGroup;
  public personalData: any;
  public mobileNumber: any;
  public taxRequired: any;
  public step: any;
  public getStepper1: any;
  public getStepper2: any;
  public nomineeData: any;
  public getNomineeData: any;
  public insurerData: any;
  public totalInsureDetails: any;

  constructor(public fb: FormBuilder, public auth: AuthService, public http: HttpClient, public validation: ValidationService, private toastr: ToastrService ) {
    this.mobileNumber = 'true';
    this.taxRequired = '';
    this.step = 0;
    this.totalInsureDetails = [];
    this.personal = this.fb.group({
      personalFirstname: '',
      personalLastname: '',
      personalDob: '',
      personalGender: '',
      maritalStatus: '',
      occupation: '',
      personalIncome: '',
      personalEmail: ['', Validators.compose([Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
      personalMobile: ['', Validators.compose([ Validators.pattern('[6789][0-9]{9}')])],
      personalLandlineno: '',
      personalAddress: '',
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

    this.insureArray = this.fb.group({
      items: this.fb.array([])
    });
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
          personalDob: ['', Validators.compose([ Validators.minLength(10)])],
          personalGender: ['', Validators.compose([Validators.required])],
          personalrelationship: '',
          personalrelationshipName: '',
          sumInsured: '',

        }
    );
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
  relianceInsureDetails(stepper: MatStepper, id, value, key) {
    sessionStorage.stepper2Details = '';
    sessionStorage.stepper2Details = JSON.stringify(value);
    console.log(this.insureArray, 'this.insureArray');
    console.log(this.insureArray.valid, 'this.valid');
    if (this.insureArray.valid) {
      this.insurerData = value.items;
      this.totalInsureDetails = [];







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
