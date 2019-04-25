import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {AuthService} from '../../shared/services/auth.service';
import {PersonalAccidentService} from '../../shared/services/personal-accident.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatStepper} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {DatePipe} from '@angular/common';
import {AppSettings} from '../../app.settings';
import {Settings} from '../../app.settings.model';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {ValidationService} from '../../shared/services/validation.service';
import {ActivatedRoute} from '@angular/router';
import {element} from 'protractor';
import {TermLifeCommonService} from '../../shared/services/term-life-common.service';
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
  selector: 'app-life-bajaj-proposal',
  templateUrl: './life-bajaj-proposal.component.html',
  styleUrls: ['./life-bajaj-proposal.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class LifeBajajProposalComponent implements OnInit {
  public proposer: FormGroup;
  public questions: FormGroup;
  public nomineeDetail: FormGroup;
  public bankDetail: FormGroup;
  public apointeeDetails: FormGroup;
  public itemsNominee: any;
  public proposerdateError: any;
  public settings: Settings;
  public bajajAge: any;
  public spouseAge:any;
  public nomineeAge: any;
  public paIdProofList: any;
  public ageProofList: any;
  public maritalStatusList: any;
  public languageList: any;
  public proposerTypeList: any;
  public docLanguageList: any;
  public primiumpayList: any;
  public nationalityList: any;
  public citizenshipList: any;
  public countryList: any;
  public TitleList: any;
  public weightList: any;
  public occupationList: any;
  public politicalDetails: boolean;
  public show: boolean;
  public MainQuesList: any;
  public SubQuesList: any;
  public questionId: any;
  public status: any;
  public subQuestionText: any;
  public sampleee: any;
  public mobilecode: any;
  public nomineeRelationList: any;
  public pincodeList:any;
  public lifeBajajProposal:any;
  public nRelationName:any;
  public getNomineeDetails:any;
  public lifePremiumList:any;
  public today:any;
  public getEnquiryDetials:any;
  public idProofList:any;
  public incomeProofList:any;
  public ageProofsList:any;
  public educationList:any;
  public summaryData:any;
  public proposerFormData:any;
  public bankDetailFormData:any;
  public nomineeDetailFormData:any;
  public spouseDobError:any;
  public nomineeDobValidError:any;
  public getDays:any;
  public getAge:any;
  public slectedIndex:any;
  public declaration: any;
  public requestedUrl: any;
  public diseaseLists: any;


  constructor(public Proposer: FormBuilder, public datepipe: DatePipe, public route: ActivatedRoute, public validation: ValidationService, public appSettings: AppSettings, private toastr: ToastrService, public config: ConfigurationService, public authservice: AuthService, public termService: TermLifeCommonService,) {

      let today = new Date();
      this.today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    this.proposer = this.Proposer.group({
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      midName: '',
      lastName: ['', Validators.required],
      gender: ['', Validators.compose([Validators.required])],
      dob: ['', Validators.compose([Validators.required])],
      age: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
      mobile: ['', Validators.compose([Validators.pattern('[6789][0-9]{9}')])],
      alterMobile: ['', Validators.compose([Validators.pattern('[6789][0-9]{9}')])],

      maritalStatus: ['', Validators.required],
      annualIncome: '',
      occupationList: ['', Validators.compose([Validators.required])],
      height: ['', Validators.compose([Validators.minLength(3)])],
      weight: '',
      weightChanged: '',
      weightChangedName: '',
      aadharNum: ['', Validators.required],
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
      politicallyExposedPerson: '',
      countryIpMailing: '',
      relation: '',
      citizenship: '',
      pob: '',
      countryOfResid: '',
      nationality: '',
      premiumfreq: '',
      premiumPayTerm: '',
      lifeBenefit: '',
      language2: '',
      proposerType: '',
      language: '',
      benefitTerm: '',
      comDoorNo:'',
      comBuildingNumber:'',
      comPlotNumber:'',
      comLandmark:'',
      comPlace:'',
      comDistrict:'',
      pincode: '',
      city: '',
      state: '',
      sameAsProposer: '',
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




    });

    // this.nomineeDetail = this.Proposer.group({
    //   nName: ['', Validators.required],
    //   nDob: ['', Validators.required],
    //   nBirthPlace: ['', Validators.required],
    //   nRelation: ['', Validators.required],
    // });
    this.settings = this.appSettings.settings;
    this.settings.HomeSidenavUserBlock = false;
    this.settings.sidenavIsOpened = false;
    this.settings.sidenavIsPinned = false;
    this.politicalDetails = false;

    this.nomineeDetail = this.Proposer.group({
      itemsNominee: this.Proposer.array([]),
      nnName: ['', Validators.required],
      nDob: ['', Validators.required],
      nBirthPlace: ['', Validators.required],
      nRelation:['', Validators.required],
      nRelationName:'',
      nomineeDobValidError: ''

    });

    this.bankDetail = this.Proposer.group({
      accountHolderName:'',
      branchName:'',
      accountNo:'',
      accountType:'',
      ifscCode:'',
      micrCode:'',

    });

    this.apointeeDetails = this.Proposer.group({
      aName: '',
    });

    this.questions = this.Proposer.group({});
  }


  ngOnInit() {

      this.lifePremiumList = JSON.parse(sessionStorage.lifePremiumList);
      console.log(this.lifePremiumList, 'kjhgdhgh');

    this.getEnquiryDetials = JSON.parse(sessionStorage.getEnquiryDetials);

    this.paIdList();
    this.ageProof();
    this.maritalStatus();
    this.cLanguageList();
    this.proposerType();
    this.docLanguage();
    this.primiumList();
    this.nationality();
    this.citizenship();
    this.country();
    this.title();
    this.weightChanged();
    this.mainQuestion();
    this.nomineeRelation();
    this.occupation();
    this.getageProof();
    this.getIdProof();
    this.education();
    this.getDiseaseList();

    //NOMINEE Details
    // this.itemsNominee = this.nomineeDetail.get('itemsNominee') as FormArray;
    // this.itemsNominee.push(this.nomineeItems());
    //
    // console.log(this.itemsNominee,'var');
    // console.log(this.nomineeDetail.get('itemsNominee')['controls'],'controls');

    for (let i = 0; i < 1; i++) {
      this.itemsNominee = this.nomineeDetail.get('itemsNominee') as FormArray;
      this.itemsNominee.push(this.nomineeItems());
    }


    this.sessionData();


  }

  nomineeItems() {
    return this.Proposer.group({
      nnName: '',
      nDob: '',
      nBirthPlace:'',
      nRelation: '',
      nRelationName: '',
      nomineeDobValidError:''
    });
  }

  // add NOmineee
  addNominee(event) {
    console.log(this.itemsNominee.value, 'val');
    console.log(this.itemsNominee.valid, 'valddd');
    if(this.itemsNominee.valid) {
      this.itemsNominee.push(this.nomineeItems());
    }
    // if (this.itemsNominee.length < 2) {
    //   this.itemsNominee.push(this.nomineeItems());
    // }
  }

  removeNominee(event, index) {
    if (index == 1) {
      this.itemsNominee.removeAt(1);
    }

  }


  sameAddress(evnt) {
    if (this.proposer.controls['sameAsProposer'].value) {
      this.proposer.controls['perDoorNo'].patchValue(this.proposer.controls['comDoorNo'].value);
      this.proposer.controls['perBuildingNumber'].patchValue(this.proposer.controls['comBuildingNumber'].value);
      this.proposer.controls['perLandmark'].patchValue(this.proposer.controls['comLandmark'].value);
      this.proposer.controls['perPlotNumber'].patchValue(this.proposer.controls['comPlotNumber'].value);
      this.proposer.controls['perPlace'].patchValue(this.proposer.controls['comPlace'].value);
      this.proposer.controls['perDistrict'].patchValue(this.proposer.controls['comDistrict'].value);
      this.proposer.controls['rpincode'].patchValue(this.proposer.controls['pincode'].value);
      this.proposer.controls['rcity'].patchValue(this.proposer.controls['city'].value);
      this.proposer.controls['rstate'].patchValue(this.proposer.controls['state'].value);


    } else {
      this.proposer.controls['perDoorNo'].patchValue('');
      this.proposer.controls['perBuildingNumber'].patchValue('');
      this.proposer.controls['perPlotNumber'].patchValue('');
      this.proposer.controls['perLandmark'].patchValue('');
      this.proposer.controls['perPlace'].patchValue('');
      this.proposer.controls['perDistrict'].patchValue('');
      this.proposer.controls['rpincode'].patchValue('');
      this.proposer.controls['rcity'].patchValue('');
      this.proposer.controls['rstate'].patchValue('');


    }
  }


  //  validation functions
  topScroll() {
    document.getElementById('main-content').scrollTop = 0;
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

  // proposer page
  changeGender() {
    if (this.proposer.controls['title'].value == 'MR') {
      this.proposer.controls['gender'].patchValue('MALE');
    } else {
      this.proposer.controls['gender'].patchValue('FEMALE');
    }
  }

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

  // addEvent(event, type) {
  //   if (event.value != null) {
  //     let selectedDate = '';
  //     this.bajajAge = '';
  //     let dob = '';
  //     if (typeof event.value._i == 'string') {
  //       const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
  //       if (pattern.test(event.value._i) && event.value._i.length == 10) {
  //         this.proposerdateError = '';
  //       } else {
  //         this.proposerdateError = 'Enter Valid Date';
  //       }
  //       selectedDate = event.value._i;
  //       dob = this.datepipe.transform(event.value, 'y-MM-dd');
  //       if (selectedDate.length == 10) {
  //         this.bajajAge = this.ageCalculate(dob);
  //         console.log(this.bajajAge, 'agre');
  //         sessionStorage.bajajproposerAge = this.bajajAge;
  //         console.log(sessionStorage.bajajproposerAge, 'sessionStorage.bajajproposerAge');
  //         this.proposer.controls['age'].patchValue(this.bajajAge);
  //       }
  //
  //     } else if (typeof event.value._i == 'object') {
  //       dob = this.datepipe.transform(event.value, 'y-MM-dd');
  //       if (dob.length == 10) {
  //         this.bajajAge = this.ageCalculate(dob);
  //         sessionStorage.insuredAgePA = this.bajajAge;
  //         this.proposer.controls['age'].patchValue(this.bajajAge);
  //       }
  //       this.proposerdateError = '';
  //     }
  //     if (type == 'nominee') {
  //       this.nomineeAge = this.ageCalculate(dob);
  //       console.log(this.nomineeAge,'nomineeage');
  //       if (this.nomineeAge < 18) {
  //         this.show = true;
  //       } else {
  //         this.show = false;
  //       }
  //     }
  //
  //     //sessionStorage.insuredAgePA = this.bajajAge;
  //
  //   }
  // }
  //

  addEvent(event) {
    if (event.value != null) {
      let selectedDate = '';
      this.bajajAge = '';
      let dob = '';
      if (typeof event.value._i == 'string') {
        const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
        if (pattern.test(event.value._i) && event.value._i.length == 10) {
          this.proposerdateError = '';
        } else {
          this.proposerdateError = 'Enter Valid Date';
        }
        selectedDate = event.value._i;
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (selectedDate.length == 10) {
          this.bajajAge = this.ageCalculate(dob);
          sessionStorage.bajajproposerAge = this.bajajAge;

        }

      } else if (typeof event.value._i == 'object') {
        // dob = this.datepipe.transform(event.value, 'MMM d, y');
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (dob.length == 10) {
          this.bajajAge = this.ageCalculate(dob);
          sessionStorage.bajajproposerAge = this.bajajAge;

        }
        this.proposerdateError = '';
      }
      if(this.bajajAge!='')
      {
        this.proposer.controls['age'].patchValue(this.bajajAge);
      }

    }
  }


  addEventSpouse(event) {
    if (event.value != null) {
      let selectedDate = '';
      this.spouseAge = '';
      let dob = '';
      if (typeof event.value._i == 'string') {
        const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
        if (pattern.test(event.value._i) && event.value._i.length == 10) {
          this.spouseDobError = '';
        } else {
          this.spouseDobError = 'Enter Valid Date';
        }
        selectedDate = event.value._i;
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (selectedDate.length == 10) {
          this.spouseAge = this.ageCalculate(dob);
          sessionStorage.spouseAge = this.spouseAge;

        }

      } else if (typeof event.value._i == 'object') {
        // dob = this.datepipe.transform(event.value, 'MMM d, y');
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (dob.length == 10) {
          this.spouseAge = this.ageCalculate(dob);
          sessionStorage.spouseAge = this.spouseAge;

        }
        this.spouseDobError = '';
      }

    }
  }





  addEventInsurer(event,  i) {
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
            this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nomineeDobValidError.patchValue('');
          } else {
            this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nomineeDobValidError.patchValue('Enter Valid DOB');
          }

        selectedDate = event.value._i;

        if (selectedDate.length == 10) {
            this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nomineeDobValidError.patchValue('');
            this.getAge = this.ageCalculate(dob);
            this.getDays = this.ageCalculateInsurer(dob_days);
            this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nDob.patchValue(dob);

          }

        }
       else if (typeof event.value._i == 'object') {
         if (dob.length == 10) {
            this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nomineeDobValidError.patchValue('');
            this.getAge = this.ageCalculate(dob);
            this.getDays = this.ageCalculateInsurer(dob_days);
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
  // personal details
  proposerDetails(stepper, value) {
    console.log(value);
    sessionStorage.lifeBajaj1 = JSON.stringify(value);
    console.log(sessionStorage.lifeBajaj1, 'session')
    if (this.proposer.valid) {
      stepper.next();
    } else {
      this.toastr.error('error')
    }
  }

  //Bank Details
  bankDetailNext(stepper, value) {
    console.log(value);
    sessionStorage.lifeBajaj2 = JSON.stringify(value);
    console.log(sessionStorage.lifeBajaj2, 'session')
    if (this.bankDetail.valid) {
      stepper.next();
    } else {
      this.toastr.error('error')
    }
  }

  medicalHistoryDetails(stepper: MatStepper) {

    sessionStorage.lifemedical = '';
    sessionStorage.lifemedical = JSON.stringify(this.MainQuesList);

    console.log(this.MainQuesList, 'lisyduhs');

   // this.question_details
   //
    let medicalStatus = [];
    for (let i = 0; i < this.MainQuesList.length; i++) {
      if(this.MainQuesList[i].mStatus == 'No'){
        medicalStatus.push('No');
      } else if(this.MainQuesList[i].mStatus == 'Yes') {
        medicalStatus.push('Yes');
      }
    }
    console.log(medicalStatus,'medicalStatus');
    if (medicalStatus.includes('Yes')) {
      // this.toastr.error('This medical questions is unable to proceed');
      this.toastr.error('Since you have selected Pre-Existing Disease. You are not allowed to purchase this policy.');
    } else {
      stepper.next();
      // this.nextStep();

    }

  }


  //nominee details
  nomineeDetailNext(stepper, value) {
    console.log(value);
    sessionStorage.nlifeBajaj = JSON.stringify(value);
    console.log(sessionStorage.nlifeBajaj, 'session');
    // if (this.nomineeDetail.valid) {
      this.proposal(stepper);
      alert();
     // stepper.next();

    // } else {
    //   this.toastr.error('error')
    // }
  }

  //services
  paIdList() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.termService.getAddressProof(data).subscribe(
        (successData) => {
          this.paIdProofListSuccess(successData);
        },
        (error) => {
          this.paIdProofListFailure(error);
        }
    );
  }

  // addressproof
  public paIdProofListSuccess(successData) {
    if (successData.IsSuccess) {
      this.paIdProofList = successData.ResponseObject;
      console.log(this.paIdProofList, 'dfgh');
    }
  }

  public paIdProofListFailure(error) {
  }

  // this function will get age proof list
  ageProof() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.termService.getAgeProof(data).subscribe(
        (successData) => {
          this.ageProofListSuccess(successData);
        },
        (error) => {
          this.ageProofListFailure(error);
        }
    );
  }

  public ageProofListSuccess(successData) {
    if (successData.IsSuccess) {
      this.ageProofList = successData.ResponseObject;
      console.log(this.ageProofList, '7656');
    }
  }

  public ageProofListFailure(error) {
  }

  // this function will get Marital status list
  maritalStatus() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.termService.getMaritalStatus(data).subscribe(
        (successData) => {
          this.maritalListSuccess(successData);
        },
        (error) => {
          this.maritalListFailure(error);
        }
    );
  }

  public maritalListSuccess(successData) {
    if (successData.IsSuccess) {
      this.maritalStatusList = successData.ResponseObject;
      console.log(this.maritalStatusList, '7656');
    }
  }

  public maritalListFailure(error) {
  }

  // this function will get communication language list
  cLanguageList() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.termService.getLanguage(data).subscribe(
        (successData) => {
          this.languageListSuccess(successData);
        },
        (error) => {
          this.languageListFailure(error);
        }
    );
  }

  public languageListSuccess(successData) {
    if (successData.IsSuccess) {
      this.languageList = successData.ResponseObject;
      console.log(this.languageList, '7656');
    }
  }

  public languageListFailure(error) {
  }

  // this function will get proposer type
  proposerType() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.termService.getProposerType(data).subscribe(
        (successData) => {
          this.proposerTypeSuccess(successData);
        },
        (error) => {
          this.proposerTypeFailure(error);
        }
    );
  }

  public proposerTypeSuccess(successData) {
    if (successData.IsSuccess) {
      this.proposerTypeList = successData.ResponseObject;
      console.log(this.proposerTypeList, 'pro');
    }
  }

  public proposerTypeFailure(error) {
  }


  // this function will Document Language List
  docLanguage() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.termService.getDocLanguage(data).subscribe(
        (successData) => {
          this.docLanguageSuccess(successData);
        },
        (error) => {
          this.docLanguageFailure(error);
        }
    );
  }

  public docLanguageSuccess(successData) {
    if (successData.IsSuccess) {
      this.docLanguageList = successData.ResponseObject;
      console.log(this.docLanguageList, 'pro');
    }
  }

  public docLanguageFailure(error) {
  }

// this function will Document Language List
  primiumList() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.termService.getDocLanguage(data).subscribe(
        (successData) => {
          this.primiumListSuccess(successData);
        },
        (error) => {
          this.primiumListFailure(error);
        }
    );
  }

  public primiumListSuccess(successData) {
    if (successData.IsSuccess) {
      this.primiumpayList = successData.ResponseObject;
      console.log(this.primiumpayList, 'pro');
    }
  }

  public primiumListFailure(error) {
  }

  nationality() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.termService.getNationality(data).subscribe(
        (successData) => {
          this.nationalityListSuccess(successData);
        },
        (error) => {
          this.nationalityListFailure(error);
        }
    );
  }

  public nationalityListSuccess(successData) {
    if (successData.IsSuccess) {
      this.nationalityList = successData.ResponseObject;
      console.log(this.nationalityList, 'pro');
    }
  }

  public nationalityListFailure(error) {
  }

  citizenship() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.termService.getCitizeship(data).subscribe(
        (successData) => {
          this.citizenshipListSuccess(successData);
        },
        (error) => {
          this.citizenshipListFailure(error);
        }
    );
  }

  public citizenshipListSuccess(successData) {
    if (successData.IsSuccess) {
      this.citizenshipList = successData.ResponseObject;
      console.log(this.citizenshipList, 'pro');
    }
  }

  public citizenshipListFailure(error) {
  }


  country() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.termService.getCountry(data).subscribe(
        (successData) => {
          this.countrySuccess(successData);
        },
        (error) => {
          this.countryFailure(error);
        }
    );
  }

  public countrySuccess(successData) {
    if (successData.IsSuccess) {
      this.countryList = successData.ResponseObject;
      console.log(this.countryList, 'pro');
    }
  }

  public countryFailure(error) {
  }
  education() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.termService.getEducation(data).subscribe(
        (successData) => {
          this.educationSuccess(successData);
        },
        (error) => {
          this.educationFailure(error);
        }
    );
  }

  public educationSuccess(successData) {
    if (successData.IsSuccess) {
      this.educationList = successData.ResponseObject;
      console.log(this.educationList, 'pro');
    }
  }

  public educationFailure(error) {
  }

  weightChanged() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.termService.getWeightChanged(data).subscribe(
        (successData) => {
          this.weightSuccess(successData);
        },
        (error) => {
          this.weightFailure(error);
        }
    );
  }

  public weightSuccess(successData) {
    if (successData.IsSuccess) {
      this.weightList = successData.ResponseObject;
      console.log(this.weightList, 'pro');
    }
  }

  public weightFailure(error) {
  }

  title() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.termService.getTitle(data).subscribe(
        (successData) => {
          this.TitleListSuccess(successData);
        },
        (error) => {
          this.TitleListFailure(error);
        }
    );
  }

  public TitleListSuccess(successData) {
    if (successData.IsSuccess) {
      this.TitleList = successData.ResponseObject;
      console.log(this.TitleList, 'title');
    }
  }

  public TitleListFailure(error) {
  }

  occupation() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.termService.getOccupation(data).subscribe(
        (successData) => {
          this.occupationListSuccess(successData);
        },
        (error) => {
          this.occupationListFailure(error);
        }
    );
  }

  public occupationListSuccess(successData) {
    if (successData.IsSuccess) {
      this.occupationList = successData.ResponseObject;
      console.log(this.occupationList, 'pro');
    }
  }

  public occupationListFailure(error) {
  }

  nomineeRelation() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.termService.getnamineeRelation(data).subscribe(
        (successData) => {
          this.nomineeRelationSuccess(successData);
        },
        (error) => {
          this.nomineeRelationFailure(error);
        }
    );
  }

  public nomineeRelationSuccess(successData) {
    if (successData.IsSuccess) {
      this.nomineeRelationList = successData.ResponseObject;
      console.log(this.nomineeRelationList, 'pro');
    }
  }

  public nomineeRelationFailure(error) {
  }

  getageProof() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.termService.ageProof(data).subscribe(
        (successData) => {
          this.ageProofsSuccess(successData);
        },
        (error) => {
          this.ageProofsFailure(error);
        }
    );
  }

  public ageProofsSuccess(successData) {
    if (successData.IsSuccess) {
      this.ageProofsList = successData.ResponseObject;
      console.log(this.ageProofsList, 'pro');
    }
  }

  public ageProofsFailure(error) {
  }

  getIdProof() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.termService.idProof(data).subscribe(
        (successData) => {
          this.idProofSuccess(successData);
        },
        (error) => {
          this.idProofFailure(error);
        }
    );
  }

  public idProofSuccess(successData) {
    if (successData.IsSuccess) {
      this.idProofList = successData.ResponseObject;
      console.log(this.idProofList, 'pro');
    }
  }

  public idProofFailure(error) {
  }

  getIncomeProof() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
      'occupation_id': this.proposer.controls['occupationList'].value
    }
    this.termService.incomeProof(data).subscribe(
        (successData) => {
          this.incomeProofSuccess(successData);
        },
        (error) => {
          this.incomeProofFailure(error);
        }
    );
  }

  public incomeProofSuccess(successData) {
    if (successData.IsSuccess) {
      this.incomeProofList = successData.ResponseObject;
      console.log(this.incomeProofList, 'pro');
    }
  }

  public incomeProofFailure(error) {
  }
  getPostal(pin, title) {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pincode': pin
    }
    if(pin.length == 6) {
        this.termService.getPincode(data).subscribe(
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
      if(title == 'personal') {
        this.proposer.controls['city'].setValue(this.pincodeList.city);
        this.proposer.controls['state'].setValue(this.pincodeList.state);
      } else {
        this.proposer.controls['rcity'].setValue(this.pincodeList.rcity);
        this.proposer.controls['rstate'].setValue(this.pincodeList.rstate);
      }
      console.log(this.pincodeList, 'pro');
    } else {
      this.toastr.error('In valid Pincode');
      if(title == 'personal') {
        this.proposer.controls['city'].setValue('');
        this.proposer.controls['state'].setValue('');
      } else {
        this.proposer.controls['rcity'].setValue('');
        this.proposer.controls['rstate'].setValue('');
      }

    }
  }

  public pincodeListFailure(error) {
  }


  politicalReson() {
    console.log(this.proposer.controls['politicallyExposedPerson'].value, 'reson');
    if (this.proposer.controls['politicallyExposedPerson'].value == 'Yes') {
      this.politicalDetails = true;
    } else {
      this.politicalDetails = false;

    }
  }

  mainQuestion() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.termService.getMainQues(data).subscribe(
        (successData) => {
          console.log('ok');
          this.MainQuesSuccess(successData);
        },
        (error) => {
          this.MainQuesFailure(error);
        }
    );
  }

  public MainQuesSuccess(successData) {
    if (successData.IsSuccess) {
      this.MainQuesList = successData.ResponseObject;
      console.log(this.MainQuesList, 'pro');
      for (let i = 0; i < this.MainQuesList.length; i++) {
        this.MainQuesList[i].mainQuestionName = '';
        this.MainQuesList[i].SubQuesList = [];
      }
      console.log(this.MainQuesList, 'MainQuesList');

    }
  }

  public MainQuesFailure(error) {
  }

  questionYes(items, value, index) {
    console.log(index, 'index');
    this.slectedIndex = index;
    if (value.checked) {
      if (items.is_sub_question == '1') {
        const data = {
          'platform': 'web',
          'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
          'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
          'questionid': items.id
        }
        this.termService.getSubQues(data).subscribe(
            (successData) => {
              this.SubQuesSuccess(successData, index);
            },
            (error) => {
              this.SubQuesFailure(error);
            }
        );
      } else {
        this.MainQuesList[index].SubQuesList = [];
      }
    } else {
      this.MainQuesList[index].SubQuesList = [];
    }
  }

  public SubQuesSuccess(successData, index) {
    if (successData.IsSuccess) {
      this.MainQuesList[index].SubQuesList = successData.ResponseObject;
      for (let i = 0; i < this.MainQuesList[index].SubQuesList.length; i++) {
        this.MainQuesList[index].subQuestionText = '';
      }
      console.log(this.MainQuesList, 'MainQuesList');
    }
  }

  public SubQuesFailure(error) {
  }
    getDiseaseList() {
        const data = {
            'platform': 'web',
            'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
        }
        this.termService.diseaseList(data).subscribe(
            (successData) => {
                this.diseaseListSuccess(successData);
            },
            (error) => {
                this.diseaseListFailure(error);
            }
        );
    }
    public diseaseListSuccess(successData) {
        if (successData.IsSuccess) {
            this.diseaseLists = successData.ResponseObject;
            console.log(this.diseaseLists, 'DiseaseLists');
        }
    }
    public diseaseListFailure(error) {
    }



    changeWeightChanged() {
    this.proposer.controls['weightChangedName'].patchValue(this.weightList[this.proposer.controls['weightChanged'].value]);
  }

  changeMarital() {
    this.proposer.controls['maritalStatusName'].patchValue(this.maritalStatusList[this.proposer.controls['maritalStatus'].value]);
  }

  occupationListCode() {
    this.proposer.controls['occupationListName'].patchValue(this.occupationList[this.proposer.controls['occupationList'].value]);
    this.getIncomeProof();

  }

  changeLanguage() {
    this.proposer.controls['languageName'].patchValue(this.languageList[this.proposer.controls['language'].value]);

  }

  changeProposerType() {
    this.proposer.controls['proposerTypeName'].patchValue(this.proposerTypeList[this.proposer.controls['proposerType'].value]);
  }

  changeDocLanguage() {
    this.proposer.controls['language2Name'].patchValue(this.docLanguageList[this.proposer.controls['language2'].value]);
  }

  changePremiumPayTerm() {
    this.proposer.controls['premiumPayTermName'].patchValue(this.primiumpayList[this.proposer.controls['premiumPayTerm'].value]);

  }

  changeNationality() {
    this.proposer.controls['nationalityName'].patchValue(this.nationalityList[this.proposer.controls['nationality'].value]);

  }

  changeCountry() {
    this.proposer.controls['countryOfResidName'].patchValue(this.countryList[this.proposer.controls['countryOfResid'].value]);

  }

  changeCitizenship() {
    this.proposer.controls['citizenshipName'].patchValue(this.citizenshipList[this.proposer.controls['citizenship'].value]);

  }
  changeAgeProof(){
    this.proposer.controls['ageProofName'].patchValue(this.ageProofsList[this.proposer.controls['ageProof'].value]);

  }
  changeIncomeProof(){
    this.proposer.controls['incomeProofName'].patchValue(this.incomeProofList[this.proposer.controls['incomeProof'].value]);

  }
  changeIdProof(){
    this.proposer.controls['idProofName'].patchValue(this.idProofList[this.proposer.controls['idProof'].value]);

  }
  changeEducation(){
    this.proposer.controls['educationName'].patchValue(this.educationList[this.proposer.controls['education'].value]);

  }
  changeAddressProof(){
    this.proposer.controls['addressProofName'].patchValue(this.educationList[this.proposer.controls['addressProof'].value]);

  }
  changeNomineeRelation() {
    // console.log(this.nomineeDetail['controls'].itemsNominee['controls'].nRelation.value);
    // this.nomineeDetail.controls['nRelationName'].patchValue(this.nomineeRelationList[this.nomineeDetail.controls['nRelation'].value]);

  }


  // proposal Creation

  proposal(stepper) {
    alert();
    console.log(this.proposer.controls['occupationList'].value,'jkgjhg');
    const data = {
      "user_id": this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      "role_id": this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      "pos_status": this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
      "platform": "web",
      "product_id": this.lifePremiumList.product_id,
      "suminsured_id":  this.getEnquiryDetials.sum_assured_id,
      "policy_id": this.getEnquiryDetials.policy_id,
      "insurer_proposer": {
        "title": this.proposer.controls['title'].value,
        "firstName": this.proposer.controls['firstName'].value,
        "middleName": this.proposer.controls['midName'].value,
        "lastName": this.proposer.controls['lastName'].value,
        "dob": this.proposer.controls['dob'].value,
        "age": this.proposer.controls['age'].value,
        "gender": this.proposer.controls['gender'].value,
        "mobile": this.proposer.controls['mobile'].value,
        "email": this.proposer.controls['email'].value,
        "alternate_contact": this.proposer.controls['alterMobile'].value,
        "maritalStatus": this.proposer.controls['maritalStatus'].value,
        "annualIncome": this.proposer.controls['annualIncome'].value,
        "occupation": this.proposer.controls['occupationList'].value,
        "education": this.proposer.controls['education'].value,
        "height": this.proposer.controls['height'].value,
        "weight": this.proposer.controls['weight'].value,
        "weightChanged":this.proposer.controls['weightChanged'].value,
        "aadhaar": this.proposer.controls['aadharNum'].value,
        "smoker": "N",
        "sameAsProposer": this.proposer.controls['sameAsProposer'].value,
        "modeOfComm": "E",
        "commMail/SMS": "",
        "preferredLanguage": this.proposer.controls['language'].value,
        "proposer_type": this.proposer.controls['proposerType'].value,
        "documentLanguage": this.proposer.controls['language2'].value,
        "lifeBenefit": this.proposer.controls['lifeBenefit'].value,
        "benefitTerm": this.proposer.controls['benefitTerm'].value,
        "premiumPaymentTerm": "10",
        "premiumFrequency": "12",
        "nationality": this.proposer.controls['nationality'].value,
        "countryOfResidence": this.proposer.controls['countryOfResid'].value,
        "placeOfBirth": this.proposer.controls['pob'].value,
        "cititzenship": this.proposer.controls['citizenship'].value,
        "IpRelation":"SELF",
        "CountryIpMailing":"IN",
        "politicallyExposedPerson": this.proposer.controls['politicallyExposedPerson'].value,
        "ifYesGiveDetails": this.proposer.controls['ifYesGiveDetails'].value,
      },
      "family_details": {
        "fatherName": this.proposer.controls['fatherName'].value,
        "motherName": this.proposer.controls['motherName'].value,
        "spouseBirthPlace": this.proposer.controls['spouseBirthPlace'].value,
        "spouseName": this.proposer.controls['spouseName'].value,
        "spouseDob": this.proposer.controls['spouseDob'].value,
      },
      "nominee_details": {
        "nominee1Name": this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].nnName.value,
        "nominee1BirthPlace": this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].nBirthPlace.value,
        "nominee1Dob":  this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].nDob.value,
        "nominee1Relation": this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].nRelation.value,
        "nominee2Name": "",
        "nominee2BirthPlace": "",
        "nominee2Dob": "",
        "nominee2Relation": "",
        "sharePercentage": "",
        "appointeeName": "",
        "appointeeDob": "",
        "appointeeRelationToNominee": "",
        "RelationToInsured": ""
      },

      "address_details": {
        "comDoorNo": this.proposer.controls['comDoorNo'].value,
        "comBuildingNumber": this.proposer.controls['comBuildingNumber'].value,
        "comPlotNumber":this.proposer.controls['comPlotNumber'].value,
        "comLandmark": this.proposer.controls['comLandmark'].value,
        "comPlace": this.proposer.controls['comPlace'].value,
        "comDistrict": this.proposer.controls['comDistrict'].value,
        "comState": this.proposer.controls['state'].value,
        "comPincode": this.proposer.controls['pincode'].value,
        "perDoorNo": this.proposer.controls['perDoorNo'].value,
        "perBuildingNumber": this.proposer.controls['perBuildingNumber'].value,
        "perPlotNumber": this.proposer.controls['perPlotNumber'].value,
        "perLandmark": this.proposer.controls['perLandmark'].value,
        "perPlace": this.proposer.controls['perPlace'].value,
        "perDistrict": this.proposer.controls['perDistrict'].value,
        "perState": this.proposer.controls['rstate'].value,
        "perPincode": this.proposer.controls['rpincode'].value,
        "comSameAsPer": this.proposer.controls['sameAsProposer'].value,

      },

      "question_details": [{
        "questionId": "85",
        "subQuestionId": "1",
        "answer": "N",
        "detailAnswer": "",
        "ipType": "1",
        "questionFlag": "QUES_HEALTH"
      },
        {
          "questionId": "85",
          "subQuestionId": "2",
          "answer": "N",
          "detailAnswer": "",
          "ipType": "1",
          "questionFlag": "QUES_HEALTH"
        },
        {
          "questionId": "85",
          "subQuestionId": "3",
          "answer": "N",
          "detailAnswer": "",
          "ipType": "1",
          "questionFlag": "QUES_HEALTH"
        },
        {
          "questionId": "85",
          "subQuestionId": "4",
          "answer": "N",
          "detailAnswer": "",
          "ipType": "1",
          "questionFlag": "QUES_HEALTH"
        },
        {
          "questionId": "85",
          "subQuestionId": "5",
          "answer": "N",
          "detailAnswer": "",
          "ipType": "1",
          "questionFlag": "QUES_HEALTH"
        },
        {
          "questionId": "85",
          "subQuestionId": "6",
          "answer": "N",
          "detailAnswer": "",
          "ipType": "1",
          "questionFlag": "QUES_HEALTH"
        },
        {
          "questionId": "85",
          "subQuestionId": "7",
          "answer": "N",
          "detailAnswer": "",
          "ipType": "1",
          "questionFlag": "QUES_HEALTH"
        },
        {
          "questionId": "85",
          "subQuestionId": "8",
          "answer": "N",
          "detailAnswer": "",
          "ipType": "1",
          "questionFlag": "QUES_HEALTH"
        },
        {
          "questionId": "85",
          "subQuestionId": "9",
          "answer": "N",
          "detailAnswer": "",
          "ipType": "1",
          "questionFlag": "QUES_HEALTH"
        },
        {
          "questionId": "85",
          "subQuestionId": "10",
          "answer": "N",
          "detailAnswer": "",
          "ipType": "1",
          "questionFlag": "QUES_HEALTH"
        },
        {
          "questionId": "85",
          "subQuestionId": "11",
          "answer": "N",
          "detailAnswer": "",
          "ipType": "1",
          "questionFlag": "QUES_HEALTH"
        },
        {
          "questionId": "85",
          "subQuestionId": "12",
          "answer": "N",
          "detailAnswer": "",
          "ipType": "1",
          "questionFlag": "QUES_HEALTH"
        },
        {
          "questionId": "85",
          "subQuestionId": "13",
          "answer": "N",
          "detailAnswer": "",
          "ipType": "1",
          "questionFlag": "QUES_HEALTH"
        },
        {
          "questionId": "85",
          "subQuestionId": "47",
          "answer": "N",
          "detailAnswer": "",
          "ipType": "1",
          "questionFlag": "QUES_HEALTH"
        },
        {
          "questionId": "85",
          "subQuestionId": "48",
          "answer": "N",
          "detailAnswer": "",
          "ipType": "1",
          "questionFlag": "QUES_HEALTH"
        },
        {
          "questionId": "85",
          "subQuestionId": "57",
          "answer": "N",
          "detailAnswer": "",
          "ipType": "1",
          "questionFlag": "QUES_HEALTH"
        },
        {
          "questionId": "85",
          "subQuestionId": "32",
          "answer": "N",
          "detailAnswer": "",
          "ipType": "1",
          "questionFlag": "QUES_HEALTH"
        },
        {
          "questionId": "85",
          "subQuestionId": "33",
          "answer": "N",
          "detailAnswer": "",
          "ipType": "1",
          "questionFlag": "QUES_HEALTH"
        },
        {
          "questionId": "85",
          "subQuestionId": "34",
          "answer": "N",
          "detailAnswer": "",
          "ipType": "1",
          "questionFlag": "QUES_HEALTH"
        },
        {
          "questionId": "85",
          "subQuestionId": "35",
          "answer": "N",
          "detailAnswer": "",
          "ipType": "1",
          "questionFlag": "QUES_HEALTH"
        },
        {
          "questionId": "85",
          "subQuestionId": "36",
          "answer": "",
          "detailAnswer": "",
          "ipType": "1",
          "questionFlag": "QUES_HEALTH"
        },
        {
          "questionId": "85",
          "subQuestionId": "",
          "answer": "N",
          "detailAnswer": "",
          "ipType": "1",
          "questionFlag": "QUES_HEALTH"
        },
        {
          "questionId": "85",
          "subQuestionId": "",
          "answer": "N",
          "detailAnswer": "",
          "ipType": "1",
          "questionFlag": "QUES_HEALTH"
        },
        {
          "questionId": "85",
          "subQuestionId": "39",
          "answer": "N",
          "detailAnswer": "",
          "ipType": "1",
          "questionFlag": "QUES_HEALTH"
        },
        {
          "questionId": "85",
          "subQuestionId": "40",
          "answer": "",
          "detailAnswer": "",
          "ipType": "1",
          "questionFlag": "QUES_HEALTH"
        },
        {
          "questionId": "85",
          "subQuestionId": "41",
          "answer": "N",
          "detailAnswer": "",
          "ipType": "1",
          "questionFlag": "QUES_HEALTH"
        },
        {
          "questionId": "85",
          "subQuestionId": "42",
          "answer": "EQUALLY",
          "detailAnswer": "",
          "ipType": "1",
          "questionFlag": "QUES_HEALTH"
        }
      ],

      "bank_deatils": {
        "accountHolderName": this.bankDetail.controls['accountHolderName'].value,
        "branchName": this.bankDetail.controls['branchName'].value,
        "accountNo": this.bankDetail.controls['accountNo'].value,
        "accountType": this.bankDetail.controls['accountType'].value,
        "ifscCode": this.bankDetail.controls['ifscCode'].value,
        "micrCode": this.bankDetail.controls['micrCode'].value,
      },
      "office_details": {
        "department":this.proposer.controls['department'].value,
        "officeName": this.proposer.controls['officeName'].value,
        "officeAddress1": this.proposer.controls['officeAddress1'].value,
        "officeAddress2": this.proposer.controls['officeAddress2'].value,
        "officeAddress3": this.proposer.controls['officeAddress3'].value,
        "officeDistrict": this.proposer.controls['officeDistrict'].value,
        "officeState": this.proposer.controls['officeState'].value,
        "officePincode": this.proposer.controls['officePincode'].value,
        "officeNumber": this.proposer.controls['officeNumber'].value,
      },
      "other_details": {
        "addressProof": this.proposer.controls['addressProof'].value,
        "ageProof": this.proposer.controls['ageProof'].value,
        "incomeProof": this.proposer.controls['incomeProof'].value,
        "idProof": this.proposer.controls['idProof'].value,
      },
    }
    console.log(data,'fileeee');
    this.termService.proposalCreation(data).subscribe(
        (successData) => {
          this.proposalSuccess(successData,stepper);
        },
        (error) => {
          this.proposalFailure(error);
        }
    );
  }
  public proposalSuccess(successData, stepper){
    if(successData.IsSuccess){
      stepper.next();
      this.toastr.success('Proposal created successfully!!');
     this.summaryData = successData.ResponseObject;
     this.requestedUrl =this.summaryData.biUrlLink;

     this.proposerFormData = this.proposer.value;
      this.bankDetailFormData = this.bankDetail.value;
      this.nomineeDetailFormData = this.nomineeDetail.value.itemsNominee;
      console.log(this.nomineeDetailFormData,'dff');

    }
  }
  public proposalFailure(error){

  }






  // session Data
  sessionData() {

    if (sessionStorage.lifeBajaj1 != '' && sessionStorage.lifeBajaj1 != undefined) {
      let lifeBajaj1 = JSON.parse(sessionStorage.lifeBajaj1);
      this.proposer = this.Proposer.group({
        title: lifeBajaj1.title,
        firstName: lifeBajaj1.firstName,
        midName: lifeBajaj1.midName,
        lastName: lifeBajaj1.lastName,
        gender: lifeBajaj1.gender,
        dob: this.datepipe.transform(lifeBajaj1.dob, 'y-MM-dd'),
        age: lifeBajaj1.age,
        email: lifeBajaj1.email,
        mobile: lifeBajaj1.mobile,
        alterMobile: lifeBajaj1.alterMobile,
        maritalStatus: lifeBajaj1.maritalStatus,
        annualIncome: lifeBajaj1.annualIncome,
        occupationList: lifeBajaj1.occupationList,
        education:lifeBajaj1.education,
        educationName:lifeBajaj1.educationName,
        benefitTerm: lifeBajaj1.benefitTerm,
        height: lifeBajaj1.height,
        weight: lifeBajaj1.weight,

        weightChanged: lifeBajaj1.weightChanged,
        weightChangedName: lifeBajaj1.weightChangedName,
        countryOfResidName: lifeBajaj1.countryOfResidName,
        citizenshipName: lifeBajaj1.citizenshipName,
        aadharNum: lifeBajaj1.aadharNum,
        comDoorNo: lifeBajaj1.comDoorNo,
        comBuildingNumber: lifeBajaj1.comBuildingNumber,
        comPlotNumber: lifeBajaj1.comPlotNumber,
        comLandmark: lifeBajaj1.comLandmark,
        comPlace: lifeBajaj1.comPlace,
        comDistrict: lifeBajaj1.comDistrict,
        pincode: lifeBajaj1.pincode,
        city: lifeBajaj1.city,
        state: lifeBajaj1.state,
        sameAsProposer: lifeBajaj1.sameAsProposer,
        perDoorNo: lifeBajaj1.perDoorNo,
        perBuildingNumber: lifeBajaj1.perBuildingNumber,
        perPlotNumber: lifeBajaj1.perPlotNumber,
        perLandmark: lifeBajaj1.perLandmark,
        perPlace: lifeBajaj1.perPlace,
        perDistrict: lifeBajaj1.perDistrict,
        rpincode: lifeBajaj1.rpincode,
        rcity: lifeBajaj1.rcity,
        rstate: lifeBajaj1.rstate,
        spouseDob: this.datepipe.transform(lifeBajaj1.spouseDob, 'y-MM-dd'),
        maritalStatusName: lifeBajaj1.maritalStatusName,
        occupationListName: lifeBajaj1.occupationListName,
        languageName: lifeBajaj1.languageName,
        proposerTypeName: lifeBajaj1.proposerTypeName,
        premiumPayTermName: lifeBajaj1.premiumPayTermName,
        nationalityName: lifeBajaj1.nationalityName,
        language2Name: lifeBajaj1.language2Name,
        spouseName: lifeBajaj1.spouseName,
        spouseBirthPlace: lifeBajaj1.spouseBirthPlace,
        motherName: lifeBajaj1.motherName,
        fatherName: lifeBajaj1.fatherName,
        ifYesGiveDetails: lifeBajaj1.ifYesGiveDetails,
        politicallyExposedPerson: lifeBajaj1.politicallyExposedPerson,
        countryIpMailing: lifeBajaj1.countryIpMailing,
        relation: lifeBajaj1.relation,
        citizenship: lifeBajaj1.citizenship,
        pob: lifeBajaj1.pob,
        countryOfResid: lifeBajaj1.countryOfResid,
        nationality: lifeBajaj1.nationality,
        premiumfreq: lifeBajaj1.premiumfreq,
        premiumPayTerm: lifeBajaj1.premiumPayTerm,
        lifeBenefit: lifeBajaj1.lifeBenefit,
        language2: lifeBajaj1.language2,
        proposerType: lifeBajaj1.proposerType,
        language: lifeBajaj1.language,
        department:lifeBajaj1.department,
        officeName:lifeBajaj1.officeName,
        officeAddress1:lifeBajaj1.officeAddress1,
        officeAddress2:lifeBajaj1.officeAddress2,
        officeAddress3:lifeBajaj1.officeAddress3,
        officeDistrict:lifeBajaj1.officeDistrict,
        officeState:lifeBajaj1.officeState,
        officePincode:lifeBajaj1.officePincode,
        officeNumber:lifeBajaj1.officeNumber,
        addressProof:lifeBajaj1.addressProof,
        addressProofName:lifeBajaj1.addressProofName,
        ageProof:lifeBajaj1.ageProof,
        incomeProof:lifeBajaj1.incomeProof,
        idProof:lifeBajaj1.idProof,
        idProofName:lifeBajaj1.idProofName,
        ageProofName:lifeBajaj1.ageProofName,
        incomeProofName:lifeBajaj1.incomeProofName,



      });
    }

        if (sessionStorage.lifeBajaj2 != '' && sessionStorage.lifeBajaj2 != undefined) {
          let lifeBajaj2 = JSON.parse(sessionStorage.lifeBajaj2);
          this.bankDetail = this.Proposer.group({
            accountHolderName: lifeBajaj2.accountHolderName,
            branchName: lifeBajaj2.branchName,
            accountNo: lifeBajaj2.accountNo,
            accountType: lifeBajaj2.accountType,
            ifscCode: lifeBajaj2.ifscCode,
            micrCode: lifeBajaj2.micrCode,


          });

        }


    if (sessionStorage.nlifeBajaj!= '' && sessionStorage.nlifeBajaj != undefined) {
      let nlifeBajaj = JSON.parse(sessionStorage.nlifeBajaj);
      console.log(nlifeBajaj, 'nlifeBajajnlifeBajaj');

        for (let i = 0; i < nlifeBajaj.itemsNominee.length; i++) {

          this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nnName.patchValue(nlifeBajaj.itemsNominee[i].nnName);
          this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nDob.patchValue(nlifeBajaj.itemsNominee[i].nDob);
          this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nBirthPlace.patchValue(nlifeBajaj.itemsNominee[i].nBirthPlace);
          this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nRelation.patchValue(nlifeBajaj.itemsNominee[i].nRelation);
          this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nomineeDobValidError.patchValue(nlifeBajaj.itemsNominee[i].nomineeDobValidError);

        }



    }
    }

}


