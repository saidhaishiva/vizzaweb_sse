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
import {TermLifeCommonService} from '../../shared/services/term-life-common.service';


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
  public nomineeAge: any;
  public dateError: any;
  public dateError1: any;
  public dateError2: any;
  public today: any;
  public summaryData: any;
  public proposerFormData: any;
  public nomineeFormData: any;
  public stepper1: any;
  public personalData: any;
  public nomineeData: any;
  public appointeeAge: any;
  public proposalId: any;
  public settings: Settings;
  public stepper2: any;
  public inputReadonly: boolean;
  public apponiteeList: boolean;







  constructor(public validation: ValidationService, public fb: FormBuilder,public route: ActivatedRoute,public TermLifeService: TermLifeCommonService,public datepipe: DatePipe, private toastr: ToastrService, public appSettings: AppSettings) {
    let stepperindex = 0;
    this.route.params.forEach((params) => {
      if(params.stepper == true || params.stepper == 'true') {
        stepperindex = 2;
        if (sessionStorage.summaryData != '' && sessionStorage.summaryData != undefined) {
          this.summaryData = JSON.parse(sessionStorage.summaryData);
          // this.RediretUrlLink = this.summaryData.PaymentURL;
          this.proposerFormData = JSON.parse(sessionStorage.proposerFormData);
          this.nomineeFormData = JSON.parse(sessionStorage.nomineeFormData);
          this.proposalId = this.summaryData.ProposalId;
          sessionStorage.aegon_proposal_id = this.proposalId;
        }
      }
    });
    this.inputReadonly=false;
    this.apponiteeList = false;
    this.settings= this.appSettings.settings;
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
      isAddressSame: false,


    });
    this.nominee = this.fb.group({
      ntitle: '',
      nfirstName: '',
      nlastName: '',
      ndob: '',
      nRelation: '',
      nAddress1: '',
      nAddress2: '',
      nCity: '',
      nState: '',
      nPincode: '',
      nPercentage: '',
      atitle: '',
      aFullName: '',
      adob: '',
      aRelation: '',
      aPercentage: '',


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



  addDate(event) {
    if (event.value != null) {
      let selectedDate = '';
      this.nomineeAge = '';
      let dob = '';
      if (typeof event.value._i == 'string') {
        const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
        if (pattern.test(event.value._i) && event.value._i.length == 10) {
          this.dateError1 = '';
        } else {
          this.dateError1 = 'Enter Valid Date';
        }
        selectedDate = event.value._i;
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (selectedDate.length == 10) {
          this.nomineeAge = this.ageCalculate(dob);

        }

      } else if (typeof event.value._i == 'object') {
        // dob = this.datepipe.transform(event.value, 'MMM d, y');
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (dob.length == 10) {
          this.nomineeAge = this.ageCalculate(dob);
          // sessionStorage.insuredAgePA = this.proposerAge;

        }
        this.dateError1 = '';
      }
      sessionStorage.nomineeAge = this.nomineeAge;

    }
  }

  addEvent1(event) {
    if (event.value != null) {
      let selectedDate = '';
      this.appointeeAge = '';
      let dob = '';
      if (typeof event.value._i == 'string') {
        const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
        if (pattern.test(event.value._i) && event.value._i.length == 10) {
          this.dateError2 = '';
        } else {
          this.dateError2 = 'Enter Valid Date';
        }
        selectedDate = event.value._i;
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (selectedDate.length == 10) {
          this.appointeeAge = this.ageCalculate(dob);

        }

      } else if (typeof event.value._i == 'object') {
        // dob = this.datepipe.transform(event.value, 'MMM d, y');
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (dob.length == 10) {
          this.appointeeAge = this.ageCalculate(dob);
          // sessionStorage.insuredAgePA = this.proposerAge;

        }
        this.dateError2 = '';
      }
      sessionStorage.nomineeAge = this.nomineeAge;

    }
  }

  ageNominee() {
    if(sessionStorage.nomineeAge <= 18){
      this.apponiteeList = true;
      console.log(this.apponiteeList,'cccccc')
    } else {
      this.apponiteeList = false;

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

  // sameAddress(event) {
  //   if (event.checked) {
  //     console.log(event.checked,'checked');
  //     // this.personal.controls['isAddressSame'].value){
  //
  //     this.personal.controls['pAddress1'].patchValue(this.personal.controls['cAddress1'].value);
  //     this.personal.controls['pAddress2'].patchValue(this.personal.controls['cAddress2'].value);
  //     this.personal.controls['pCity'].patchValue(this.personal.controls['cCity'].value);
  //     this.personal.controls['pState'].patchValue(this.personal.controls['cState'].value);
  //     this.personal.controls['pPincode'].patchValue(this.personal.controls['cPincode'].value);
  //
  //
  //   } else {
  //     this.personal.controls['pAddress1'].patchValue('');
  //     this.personal.controls['pAddress2'].patchValue('');
  //     this.personal.controls['pCity'].patchValue('');
  //     this.personal.controls['pState'].patchValue('');
  //     this.personal.controls['pPincode'].patchValue('');
  //
  //   }
  // }
  // SAME AS ADDRESS
  sameAddress(value:any){
    if (this.personal.controls['isAddressSame'].value) {
      console.log(this.personal.controls['isAddressSame'].value,'ifff');
      this.inputReadonly = true;
      this.personal.controls['cAddress1'].patchValue(this.personal.controls['pAddress1'].value);
      console.log(this.personal.controls['cAddress1'].value,'ytfhfasd');
          this.personal.controls['cAddress2'].patchValue(this.personal.controls['pAddress2'].value);
          this.personal.controls['cCity'].patchValue(this.personal.controls['pCity'].value);
          this.personal.controls['cState'].patchValue(this.personal.controls['pState'].value);
          this.personal.controls['cPincode'].patchValue(this.personal.controls['pPincode'].value);

    } else {
      this.inputReadonly = false;
      this.personal.controls['cAddress1'].patchValue('');
          this.personal.controls['cAddress2'].patchValue('');
          this.personal.controls['cCity'].patchValue('');
          this.personal.controls['cState'].patchValue('');
          this.personal.controls['cPincode'].patchValue('');

    }

  }


  // NEXT BUTTON

  public personalDetails(stepper: MatStepper, value) {
    this.personalData=value;
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

  //NEXT BUTTON NOMINEE
  public nomineeDetails(stepper: MatStepper, value) {
    console.log(value, 'nominee');
    sessionStorage.stepper2 = '';
    sessionStorage.stepper2 = JSON.stringify(value);
    console.log(this.nominee.valid, 'checked');
    if(this.nominee.valid) {
      this.nomineeData= value;
    console.log(this.nomineeData,'nomm')
      this.proposal(stepper);

      // stepper.next();
      //   this.topScroll();
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

    if (sessionStorage.aegon_proposal_id != '' && sessionStorage.aegon_proposal_id != undefined) {
      this.proposalId = sessionStorage.aegon_proposal_id;
    }


  }

  // proposal Creation

  proposal(stepper) {

    const data =
        {
          "user_id": "0",
          "role_id": "4",
          "pos_status": "0",
          "platform": "web",
          "product_id": "86",
          "suminsured_Amount": "5000000",
          "policy_id": "1",
          "benefitOption": "LP",
          "personalInformation": {
            "tittle": this.personal.controls['title'].value,
            "firstName": this.personal.controls['firstName'].value,
            "middleName": this.personal.controls['middleName'].value,
            "lasteName": this.personal.controls['lastName'].value,
            "gender": this.personal.controls['gender'].value,
            "dob": this.datepipe.transform(this.personal.controls['dob'].value,'y-MM-dd'),
            "mobile": this.personal.controls['mobile'].value,
            "email": this.personal.controls['email'].value,
            "fathername": this.personal.controls['fatherName'].value,
            "maritalStatus":this.personal.controls['maritalStatus'].value,
            "qualifiction": this.personal.controls['qualifiction'].value,
            "employeeType": this.personal.controls['employeeType'].value,
            "natureOfWork": this.personal.controls['natureOfWork'].value,
            "annualIncome": this.personal.controls['annualIncome'].value,
            "smoker": this.personal.controls['smoker'].value,
            "isExistingPolicyHolder": this.personal.controls['isExistingPolicyHolder'].value,
            "isPoliticleExposed": this.personal.controls['isPoliticleExposed'].value,
            "diabeteDuration": this.personal.controls['diabeteDuration'].value,
            "isHousewife": this.personal.controls['isHousewife'].value,
            "isHusbandCover": this.personal.controls['isHusbandCover'].value
          },
          "addressDetail": {
            "pAddress1": this.personal.controls['pAddress1'].value,
            "pAddress2": this.personal.controls['pAddress2'].value,
            "pCity": this.personal.controls['pCity'].value,
            "pState": this.personal.controls['pState'].value,
            "pPincode": this.personal.controls['pPincode'].value,
            "cAddress1": this.personal.controls['cAddress1'].value,
            "cAddress2": this.personal.controls['cAddress2'].value,
            "cCity": this.personal.controls['cCity'].value,
            "cState": this.personal.controls['cState'].value,
            "cPincode": this.personal.controls['cPincode'].value,
            "isAddressSame": this.personal.controls['isAddressSame'].value
          },
          "nomineeDetail": {
            "tittle": this.nomineeData.ntitle,
            "firstName": this.nomineeData.nfirstName,
            "lastName":  this.nomineeData.nlastName,
            "dob": this.datepipe.transform(this.nomineeData.ndob,'y-MM-dd'),
            "relation":  this.nomineeData.nRelation,
            "address1":  this.nomineeData.nAddress1,
            "address2":  this.nomineeData.nAddress2,
            "city": this.nomineeData.nCity,
            "state":  this.nomineeData.nState,
            "pincode":  this.nomineeData.nPincode,
            "percent": this.nomineeData.nPercentage,
            "appointeeTittle":  this.nomineeData.atitle,
            "appointeeFullName":  this.nomineeData.aFullName,
            "appointeeDob":  this.nomineeData.adob,
            "appointeeRelation":  this.nomineeData.aRelation,
            "appointeePercent":  this.nomineeData.aPercentage
          },
          "addonITerm": {
            "adbr": "NO",
            "adbrSumAssured": "0",
            "idis": "NO",
            "lumpSumBenefitSA": "0",
            "icir": "NO",
            "icirSumAssured": "0",
            "woprCI": "NO",
            "wcir": "NO"
          },
          "addons_itermplus": {
            "adbrSumAssured": "",
            "deathBenefitSA": "434",
            "deathBenefitTISA": "",
            "enchancedCISA": "",
            "icirSumAssured": ""
          }
        };



    console.log(data,'proposal data')
  //   this.settings.loadingSpinner = true;
  //   this.TermLifeService.getCholaProposal(data).subscribe(
  //       (successData) => {
  //         this.setCholaProposalSuccess(successData, stepper);
  //       },
  //       (error) => {
  //         this.setCholaProposalFailure(error);
  //       }
  //   );
  //
  // }
  // public setCholaProposalSuccess(successData, stepper) {
  //   this.settings.loadingSpinner = false;
  //   if (successData.IsSuccess == true) {
  //     stepper.next();
  //     this.topScroll();
  //     this.toastr.success('Proposal created successfully!!');
  //     this.summaryData = successData.ResponseObject;
  //     sessionStorage.summaryData = JSON.stringify(this.summaryData);
  //     this.proposalId = this.summaryData.ProposalId;
  //     this.proposerFormData = this.personal.value;
  //     this.nomineeFormData = this.nomineeDetails.value;
  //     this.insuredFormData = this.insurerData;
  //     sessionStorage.proposerFormData = JSON.stringify(this.proposerFormData);
  //     sessionStorage.insuredFormData = JSON.stringify(this.insuredFormData);
  //     sessionStorage.nomineeFormData = JSON.stringify(this.nomineeFormData);
  //     sessionStorage.chola_health_proposal_id = this.proposalId;

      stepper.next();
      // this.nextStep();

    // } else {
    //   this.toastr.error(successData.ErrorObject);
    // }
  }
  // public setCholaProposalFailure(error) {
  // }


}
