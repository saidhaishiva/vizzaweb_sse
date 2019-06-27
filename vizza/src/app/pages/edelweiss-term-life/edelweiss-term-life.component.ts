import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDialog} from '@angular/material';
import {DatePipe} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {CommonService} from '../../shared/services/common.service';
import {ValidationService} from '../../shared/services/validation.service';
import {AppSettings} from '../../app.settings';
import {ToastrService} from 'ngx-toastr';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {TermLifeCommonService} from '../../shared/services/term-life-common.service';
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
  selector: 'app-edelweiss-term-life',
  templateUrl: './edelweiss-term-life.component.html',
  styleUrls: ['./edelweiss-term-life.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class EdelweissTermLifeComponent implements OnInit {
  public proposer: FormGroup;
  public etitle: any;
  public egender: any;
  public emaritalStatus: any;
  public einvesting: any;
  public ePremiumTerm: any;
  public ePolicyTerm: any;
  public eFrequency: any;
  public eStaff: any;
  public eAgeProof: any;
  public eIdProof: any;
  public eAddressProof: any;
  public eQualification: any;
  public eState: any;
  public eemploymentType: any;
  public eDuty: any;
  public eHeightFeet: any;
  public eHeightInches: any;
  public ePolicyCategory: any;
  public eNomineeRelation: any;
  public eInsuranceRepository: any;
  public proposerAge: any;
  public dateError: any;
  public today: any;




  constructor( public Proposer: FormBuilder,public dialog: MatDialog, public datepipe: DatePipe, public route: ActivatedRoute, public common: CommonService, public validation: ValidationService, public appSettings: AppSettings, private toastr: ToastrService, public config: ConfigurationService, public authservice: AuthService, public termService: TermLifeCommonService, ) {
    let stepperindex = 0;
    this.route.params.forEach((params) => {
      if(params.stepper == true || params.stepper == 'true') {
        stepperindex = 6;
        if (sessionStorage.summaryData != '' && sessionStorage.summaryData != undefined) {
          let summaryData = JSON.parse(sessionStorage.summaryData);
          // this.summaryData = summaryData;
          // this.requestedUrl = summaryData.biUrlLink;
          // this.proposerFormData = JSON.parse(sessionStorage.proposerFormData);
          // this.bankDetailFormData = JSON.parse(sessionStorage.bankDetailFormData);
          // this.nomineeDetailFormData = JSON.parse(sessionStorage.nomineeDetailFormData);
          // this.familyDiseaseFormData = JSON.parse(sessionStorage.familyDiseaseFormData);
        }

      }
    });

    this.proposer = this.Proposer.group({
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      midName: '',
      lastName: ['', Validators.required],
      gender: ['', Validators.compose([Validators.required])],
      dob: ['', Validators.compose([Validators.required])],
      age: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
      mobile: ['', Validators.compose([Validators.pattern('[6-9]\\d{9}')])],
      alterMobile: ['', Validators.compose([Validators.pattern('[6789][0-9]{9}')])],
      maritalStatus: ['', Validators.required],
      annualIncome: '',
      alterMobileError: '',
      occupationList: ['', Validators.compose([Validators.required])],
      height: ['', Validators.compose([Validators.minLength(3)])],
      weight: '',
      inbetweenweight: '',
      weightChangedreason: '',
      weightChanged: '',
      weightChangedName: '',
      weightChangedReasonName: '',
      aadharNum: '',
      spouseDob: '',
      maritalStatusName: '',
      occupationListName: '',
      proposerTypeName: '',
      language2Name: '',
      languageName: '',
      premiumPayTermName: '',
      nationalityName: '',
      citizenshipName: '',
      spouseName: '',
      spouseBirthPlace: '',
      countryOfResidName: '',
      motherName: '',
      fatherName: '',
      ifYesGiveDetails: '',
      panNum:['', Validators.compose([Validators.minLength(10)])],
      politicallyExposedPerson: '',
      countryIpMailing: '',
      relation: '',
      citizenship: '',
      pob: '',
      countryOfResid: '',
      nationality: '',
      language2: '',
      proposerType: '',
      language: '',
      comDoorNo:'',
      comBuildingNumber:'',
      comPlotNumber:'',
      comLandmark:'',
      comPlace:'',
      comDistrict:'',
      pincode: '',
      city: '',
      state: '',
      sameAsProposer: false,
      perDoorNo:'',
      perBuildingNumber:'',
      perPlotNumber:'',
      perLandmark:'',
      perPlace:'',
      perDistrict:'',
      rpincode: '',
      rcity: '',
      rstate: '',
      department:'',
      officeName:'',
      officeAddress1:'',
      officeAddress2:'',
      officeAddress3:'',
      officeDistrict:'',
      officeState:'',
      officePincode:'',
      officeNumber:'',
      addressProof:'',
      addressProofName:'',
      ageProof:'',
      incomeProof:'',
      incomeProofName:'',
      idProof:'',
      idProofName:'',
      ageProofName:'',
      educationName:'',
      education:'',
      isPancard: true,
      jointAcName:'',
      amtTransaction:'',
      dateoftransaction:'',
      isAppliedPan:'',
      dateofapplication:'',
      ackNumber:'',
      totalIncome:'',
      agriculturalIncome:'',
      otherAgriculturalIncome:'',
      modeOfTransaction:'',
    });
  }

  ngOnInit() {
    this.geteTitle();
    this.geteGender();
    this.geteMaritalStatus();
    this.geteInvesting();
    this.getePremiumTerm();
    this.getePolicyTerm();
    this.geteFrequency();
    this.geteStaff();
    this.geteAgeProof();
    this.geteIdProof();
    this.geteAddressProof();
    this.geteQualification();
    this.geteState();
    this.geteemploymentType();
    this.geteDuty();
    this.geteHeightFeet();
    this.geteHeightInches();
    this.getePolicyCategory();
    this.geteNomineeRelation();
    this.geteInsuranceRepository();
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

// Services

  geteTitle() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.geteTitle(data).subscribe(
        (successData) => {
          this.geteTitleSuccess(successData);
        },
        (error) => {
          this.geteTitleFailure(error);
        }
    );
  }

  public geteTitleSuccess(successData) {
    if (successData.IsSuccess) {
      this.etitle = successData.ResponseObject;
    }
  }

  public geteTitleFailure(error) {
  }

  geteGender() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.geteGender(data).subscribe(
        (successData) => {
          this.geteGenderSuccess(successData);
        },
        (error) => {
          this.geteGenderFailure(error);
        }
    );
  }

  public geteGenderSuccess(successData) {
    if (successData.IsSuccess) {
      this.egender = successData.ResponseObject;
    }
  }

  public geteGenderFailure(error) {
  }

  geteMaritalStatus() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.geteMaritalStatus(data).subscribe(
        (successData) => {
          this.geteMaritalStatusSuccess(successData);
        },
        (error) => {
          this.geteMaritalStatusFailure(error);
        }
    );
  }

  public geteMaritalStatusSuccess(successData) {
    if (successData.IsSuccess) {
      this.emaritalStatus = successData.ResponseObject;
    }
  }

  public geteMaritalStatusFailure(error) {
  }
  geteInvesting() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.geteInvesting(data).subscribe(
        (successData) => {
          this.geteInvestingSuccess(successData);
        },
        (error) => {
          this.geteInvestingFailure(error);
        }
    );
  }

  public geteInvestingSuccess(successData) {
    if (successData.IsSuccess) {
      this.einvesting = successData.ResponseObject;
    }
  }

  public geteInvestingFailure(error) {
  }
  getePremiumTerm() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.getePremiumTerm(data).subscribe(
        (successData) => {
          this.getePremiumTermSuccess(successData);
        },
        (error) => {
          this.getePremiumTermFailure(error);
        }
    );
  }

  public getePremiumTermSuccess(successData) {
    if (successData.IsSuccess) {
      this.ePremiumTerm = successData.ResponseObject;
    }
  }

  public getePremiumTermFailure(error) {
  }
  getePolicyTerm() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.getePolicyTerm(data).subscribe(
        (successData) => {
          this.getePolicyTermSuccess(successData);
        },
        (error) => {
          this.getePolicyTermFailure(error);
        }
    );
  }

  public getePolicyTermSuccess(successData) {
    if (successData.IsSuccess) {
      this.ePolicyTerm = successData.ResponseObject;
    }
  }

  public getePolicyTermFailure(error) {
  }
  geteFrequency() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.geteFrequency(data).subscribe(
        (successData) => {
          this.geteFrequencySuccess(successData);
        },
        (error) => {
          this.geteFrequencyFailure(error);
        }
    );
  }

  public geteFrequencySuccess(successData) {
    if (successData.IsSuccess) {
      this.eFrequency = successData.ResponseObject;
    }
  }

  public geteFrequencyFailure(error) {
  }

  geteStaff() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.geteStaff(data).subscribe(
        (successData) => {
          this.geteStaffSuccess(successData);
        },
        (error) => {
          this.geteStaffFailure(error);
        }
    );
  }

  public geteStaffSuccess(successData) {
    if (successData.IsSuccess) {
      this.eStaff = successData.ResponseObject;
    }
  }

  public geteStaffFailure(error) {
  }

  geteAgeProof() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.geteAgeProof(data).subscribe(
        (successData) => {
          this.geteAgeProofSuccess(successData);
        },
        (error) => {
          this.geteAgeProofFailure(error);
        }
    );
  }

  public geteAgeProofSuccess(successData) {
    if (successData.IsSuccess) {
      this.eAgeProof = successData.ResponseObject;
    }
  }

  public geteAgeProofFailure(error) {
  }

  geteIdProof() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.geteIdProof(data).subscribe(
        (successData) => {
          this.geteIdProofSuccess(successData);
        },
        (error) => {
          this.geteIdProofFailure(error);
        }
    );
  }

  public geteIdProofSuccess(successData) {
    if (successData.IsSuccess) {
      this.eIdProof = successData.ResponseObject;
    }
  }

  public geteIdProofFailure(error) {
  }
  geteAddressProof() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.geteAddressProof(data).subscribe(
        (successData) => {
          this.geteAddressProofSuccess(successData);
        },
        (error) => {
          this.geteAddressProofFailure(error);
        }
    );
  }

  public geteAddressProofSuccess(successData) {
    if (successData.IsSuccess) {
      this.eAddressProof = successData.ResponseObject;
    }
  }

  public geteAddressProofFailure(error) {
  }
  geteQualification() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.geteQualification(data).subscribe(
        (successData) => {
          this.geteQualificationSuccess(successData);
        },
        (error) => {
          this.geteQualificationFailure(error);
        }
    );
  }

  public geteQualificationSuccess(successData) {
    if (successData.IsSuccess) {
      this.eQualification = successData.ResponseObject;
    }
  }

  public geteQualificationFailure(error) {
  }
  geteState() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.geteState(data).subscribe(
        (successData) => {
          this.geteStateSuccess(successData);
        },
        (error) => {
          this.geteStateFailure(error);
        }
    );
  }

  public geteStateSuccess(successData) {
    if (successData.IsSuccess) {
      this.eState = successData.ResponseObject;
    }
  }

  public geteStateFailure(error) {
  }
  geteemploymentType() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.geteemploymentType(data).subscribe(
        (successData) => {
          this.geteemploymentTypeSuccess(successData);
        },
        (error) => {
          this.geteemploymentTypeFailure(error);
        }
    );
  }

  public geteemploymentTypeSuccess(successData) {
    if (successData.IsSuccess) {
      this.eemploymentType = successData.ResponseObject;
    }
  }

  public geteemploymentTypeFailure(error) {
  }
  geteDuty() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.geteDuty(data).subscribe(
        (successData) => {
          this.geteDutySuccess(successData);
        },
        (error) => {
          this.geteDutyFailure(error);
        }
    );
  }

  public geteDutySuccess(successData) {
    if (successData.IsSuccess) {
      this.eDuty = successData.ResponseObject;
    }
  }

  public geteDutyFailure(error) {
  }
  geteHeightFeet() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.geteHeightFeet(data).subscribe(
        (successData) => {
          this.geteHeightFeetSuccess(successData);
        },
        (error) => {
          this.geteHeightFeetFailure(error);
        }
    );
  }

  public geteHeightFeetSuccess(successData) {
    if (successData.IsSuccess) {
      this.eHeightFeet = successData.ResponseObject;
    }
  }

  public geteHeightFeetFailure(error) {
  }
  geteHeightInches() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.geteHeightInches(data).subscribe(
        (successData) => {
          this.geteHeightInchesSuccess(successData);
        },
        (error) => {
          this.geteHeightInchesFailure(error);
        }
    );
  }

  public geteHeightInchesSuccess(successData) {
    if (successData.IsSuccess) {
      this.eHeightInches = successData.ResponseObject;
    }
  }

  public geteHeightInchesFailure(error) {
  }
  getePolicyCategory() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.getePolicyCategory(data).subscribe(
        (successData) => {
          this.getePolicyCategorySuccess(successData);
        },
        (error) => {
          this.getePolicyCategoryFailure(error);
        }
    );
  }

  public getePolicyCategorySuccess(successData) {
    if (successData.IsSuccess) {
      this.ePolicyCategory = successData.ResponseObject;
    }
  }

  public getePolicyCategoryFailure(error) {
  }
  geteNomineeRelation() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.geteNomineeRelation(data).subscribe(
        (successData) => {
          this.geteNomineeRelationSuccess(successData);
        },
        (error) => {
          this.geteNomineeRelationFailure(error);
        }
    );
  }

  public geteNomineeRelationSuccess(successData) {
    if (successData.IsSuccess) {
      this.eNomineeRelation = successData.ResponseObject;
    }
  }

  public geteNomineeRelationFailure(error) {
  }
  geteInsuranceRepository() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',

    }
    this.termService.geteInsuranceRepository(data).subscribe(
        (successData) => {
          this.geteInsuranceRepositorySuccess(successData);
        },
        (error) => {
          this.geteInsuranceRepositoryFailure(error);
        }
    );
  }

  public geteInsuranceRepositorySuccess(successData) {
    if (successData.IsSuccess) {
      this.eInsuranceRepository = successData.ResponseObject;
    }
  }

  public geteInsuranceRepositoryFailure(error) {
  }

  changeTitle()
  {
    this.proposer.controls['titleName'].patchValue(this.etitle[this.proposer.controls['title'].value]);
  }
  changeGender() {
    this.proposer.controls['genderName'].patchValue(this.egender[this.proposer.controls['gender'].value]);

  }
  changeMaritalStatus() {
    this.proposer.controls['GenderName'].patchValue(this.emaritalStatus[this.proposer.controls['Gender'].value]);

  }


}
