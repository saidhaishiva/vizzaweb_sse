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
import {ActivatedRoute} from '@angular/router';
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
  selector: 'app-aegon-term-life',
  templateUrl: './aegon-term-life.component.html',
  styleUrls: ['./aegon-term-life.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})

export class AegonTermLifeComponent implements OnInit {
  public personal: FormGroup;
  public nominee: FormGroup;
  public proposerAge: any;
  public dateError: any;
  public today: any;


  constructor(public validation: ValidationService, public fb: FormBuilder, public datepipe: DatePipe, private toastr: ToastrService) {
    this.personal = this.fb.group({
      title: ['', Validators.required],
      firstName: '',
      lastName: '',
      middleName: '',
      gender: '',
      dob: '',
      relationship: '',

      pincode: '',
      city: '',
      state: '',
      fatherName: '',
      maritalStatus: '',
      qualifiction: '',
      employeeType: '',
      natureOfWork: '',
      annualIncome: '',
      smoker: '',
      isExistingPolicyHolder: '',
      isPoliticleExposed: '',
      diabeteDuration: '',
      isHousewife: '',
      isHusbandCover: '',
      email: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
      mobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
      pAddress1: '',
      pAddress2: '',
      pPincode: '',
      pCity: '',
      pState: '',
      cAddress1: '',
      cAddress2: '',
      cCity: '',
      cState: '',
      cPincode: '',
      isAddressSame: '',


    });
    this.nominee = this.fb.group({
      'ntitle': '',
      'nfirstName': '',
      'nlastName': '',
      'ndob': '',
      'nRelation': '',
      'nAddress1': '',
      'nAddress2': '',
      'nCity': '',
      'nState': '',
      'nPincode': '',
      'nPercentage': '',
      'atitle': '',
      'aFullName': '',
      'adob': '',
      'aRelation': '',
      'aPercentage': '',


    });
  }

  ngOnInit() {


  }

  // Dame validation
  nameValidate(event: any) {
    console.log(event.target.value.length);
    // if (event.code == 'Space') {
    //     if (event.target.value.length == 0) {
    //         event.preventDefault();
    //     }
    // } else {
    this.validation.nameValidate(event);
    // }
  }

  // Dob validation
  dobValidate(event: any) {
    this.validation.dobValidate(event);
  }

  // Number validation
  numberValidate(event: any) {
    this.validation.numberValidate(event);
  }

  // height weight validation
  heightValidate(event: any) {
    console.log(event.target.value.length);
    if (event.key == '0') {
      if (event.target.value.length == 0) {
        event.preventDefault();
      }
    } else {
      this.validation.numberValidate(event);
    }
  }

  idValidate(event) {
    this.validation.idValidate(event);

  }
  topScroll() {
    document.getElementById('main-content').scrollTop = 0;
  }

  addEvent(event) {
    if (event.value != null) {
      let selectedDate = '';
      this.proposerAge = '';
      let dob = '';
      if (typeof event.value._i == 'string') {
        const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
        if (pattern.test(event.value._i) && event.value._i.length == 10) {
          this.dateError = '';
        } else {
          this.dateError = 'Enter Valid Date';
        }
        selectedDate = event.value._i;
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (selectedDate.length == 10) {
          this.proposerAge = this.ageCalculate(dob);
          // sessionStorage.proposerAge = this.proposerAge;

        }

      } else if (typeof event.value._i == 'object') {
        // dob = this.datepipe.transform(event.value, 'MMM d, y');
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (dob.length == 10) {
          this.proposerAge = this.ageCalculate(dob);
          // sessionStorage.insuredAgePA = this.proposerAge;

        }
        this.dateError = '';
      }
      sessionStorage.proposerAge = this.proposerAge;

    }
  }

  // AGE VALIDATION
  ageCalculate(dob) {
    let today = new Date();
    let birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    let dd = today.getDate() - birthDate.getDate();
    if (m < 0 || m == 0 && today.getDate() < birthDate.getDate()) {
      age = age - 1;
    }
    return age;
  }

  sameAddress(evnt) {
    if (evnt.checked) {
      this.personal.controls['pAddress1'].patchValue(this.personal.controls['cAddress1'].value);
      this.personal.controls['pAddress2'].patchValue(this.personal.controls['cAddress2'].value);
      this.personal.controls['pCity'].patchValue(this.personal.controls['cCity'].value);
      this.personal.controls['pState'].patchValue(this.personal.controls['cState'].value);
      this.personal.controls['pPincode'].patchValue(this.personal.controls['cPincode'].value);


    } else {
      this.personal.controls['pAddress1'].patchValue('');
      this.personal.controls['pAddress2'].patchValue('');
      this.personal.controls['pCity'].patchValue('');
      this.personal.controls['pState'].patchValue('');
      this.personal.controls['pPincode'].patchValue('');

    }
  }


  // NEXT BUTTON

  public personalDetails(stepper: MatStepper, value) {
    console.log(value, 'eeeeeeeeeee');
    sessionStorage.stepper1 = '';
    sessionStorage.stepper1 = JSON.stringify(value);
    console.log(this.personal.valid, 'checked');
    if(this.personal.valid) {
      if(sessionStorage.proposerAge >= 18){
        stepper.next();
        this.topScroll();

      } else {
        this.toastr.error('Proposer age should be 18 or above');

      }
    }

  }


  sessionData() {
    if (sessionStorage.stepper1 != '' && sessionStorage.stepper1 != undefined) {
      let stepper1 = JSON.parse(sessionStorage.stepper1);

      this.personal = this.fb.group({
        title: stepper1.title,
        firstName: stepper1.firstName,
        lastName: stepper1.lastName,
        middleName: stepper1.middleName,
        gender: stepper1.gender,
        dob: this.datepipe.transform(stepper1.dob, 'y-MM-dd'),
        email: stepper1.email,
        mobile: stepper1.mobile,
        pincode: stepper1.pincode,
        relationship: stepper1.relationship,
        fatherName: stepper1.fatherName,
        maritalStatus: stepper1.maritalStatus,
        qualifiction: stepper1.qualifiction,
        employeeType: stepper1.employeeType,
        natureOfWork: stepper1.natureOfWork,
        annualIncome: stepper1.annualIncome,
        smoker: stepper1.smoker,
        isExistingPolicyHolder: stepper1.isExistingPolicyHolder,
        isPoliticleExposed: stepper1.isPoliticleExposed,
        diabeteDuration: stepper1.diabeteDuration,
        isHousewife: stepper1.isHousewife,
        isHusbandCover: stepper1.isHusbandCover,
        pAddress1: stepper1.pAddress1,
        pAddress2: stepper1.pAddress2,
        pPincode: stepper1.pPincode,
        pCity: stepper1.pCity,
        pState: stepper1.pState,
        cAddress1: stepper1.cAddress1,
        cAddress2: stepper1.cAddress2,
        cCity: stepper1.cCity,
        cState: stepper1.cState,
        cPincode: stepper1.cPincode,
        state: stepper1.state,
        city: stepper1.city,
        isAddressSame: stepper1.isAddressSame,


      });
    }
    if (sessionStorage.stepper2 != '' && sessionStorage.stepper2 != undefined) {
      let stepper2 = JSON.parse(sessionStorage.stepper2);
      this.nominee = this.fb.group({
        ntitle: stepper2.ntitle,
        nfirstName: stepper2.nfirstName,
        nlastName: stepper2.nlastName,
        ndob: stepper2.ndob,
        nRelation: stepper2.nRelation,
        nAddress1: stepper2.nAddress1,
        nAddress2: stepper2.nAddress2,
        nCity: stepper2.nCity,
        nState: stepper2.nState,
        nPincode: stepper2.nPincode,
        nPercentage: stepper2.nPercentage,
        atitle: stepper2.atitle,
        aFullName: stepper2.aFullName,
        adob: stepper2.adob,
        aRelation: stepper2.aRelation,
        aPercentage: stepper2.aPercentage,
      });

    }


  }
}
