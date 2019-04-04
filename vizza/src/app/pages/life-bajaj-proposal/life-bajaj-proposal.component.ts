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
  public insured: FormGroup;
  public questions: FormGroup;
  public nomineeDetail: any;
  public apointeeDetails: any;
  public itemsNominee: any;
  public proposerdateError : any;
  public settings:Settings;
  public bajajAge : any;
  public nomineeAge : any;
  public paIdProofList: any;
  public ageProofList : any;
  public maritalStatusList : any;
  public languageList: any;
  public proposerTypeList: any;
  public docLanguageList: any;
  public primiumpayList: any;
  public nationalityList: any;
  public citizenshipList:any;
  public countryList: any;
  public TitleList: any;
  public weightList: any;
  public occupationList:any;
  public primiumPayTerm: any;
  public politicalDetails: boolean;
  public show: boolean;


  constructor(public Proposer: FormBuilder, public datepipe: DatePipe,public route: ActivatedRoute, public validation: ValidationService,public appSettings: AppSettings, private toastr: ToastrService, public config: ConfigurationService, public authservice: AuthService, public termService: TermLifeCommonService,) {



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
      height: ['', Validators.compose([ Validators.minLength(3)])],
      weight: ['', Validators.compose([Validators.minLength(3)])],
      weightChanged:'' ,
      weightChangedName:'',
      aadharNum: ['', Validators.required],

      spouseDob:'',
      spouseName:'',
      spouseBirthPlace:'',
      motherName:'',
      fatherName:'',
      ifYesGiveDetails:'',
      politicallyExposedPerson:'',
      countryIpMailing:'',
      relation:'',
      citizenship:'',
      pob:'',
      countryOfResid:'',
      nationality:'',
      premiumfreq:'',
      premiumPayTerm:'',
      lifeBenefit:'',
      language2:'',
      proposerType:'',
      language:'',

    benefitTerm:'',
      address1: '',
      address2 :'',
      pincode :'',
      city:'',
      state:'',
      sameAsProposer:'',
      raddress1 :'',
      raddress2 :'',
      rpincode :'',
      rcity :'',
    rstate :'',
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
      itemsNominee : this.Proposer.array([]),
      nName: '',
      nDob: '',
      nBirthPlace: '',
      nRelation: '',
    });

    this.apointeeDetails = this.Proposer.group({
      aName: '',
    });

    this.questions = this.Proposer.group({
    });
  }


  ngOnInit() {

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
    this.occupation();


    //NOMINEE Details


    this.itemsNominee = this.nomineeDetail.get('itemsNominee') as FormArray;
    this.itemsNominee.push(this.nomineeItems());

  }

  nomineeItems(){
    return this.Proposer.group( {
      nName: '',
      nDob: '',
      nBirthPlace: '',
      nRelation: '',
    });
  }

  // add NOmineee
  addNominee(event) {
    console.log(this.itemsNominee.length);
   // console.log(this.nomineeDetail['controls'].itemsNominee.length);
    if (this.itemsNominee.length < 2) {
      this.itemsNominee.push(this.nomineeItems());
    }
  }

  removeNominee(event , index){
    if (index ==1 ){
      this.itemsNominee.removeAt(1);
    }

  }





  //  validation functions
  topScroll() {
    document.getElementById('main-content').scrollTop = 0;
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
    let dd = today.getDate()- birthDate.getDate();
    if( m < 0 || m == 0 && today.getDate() < birthDate.getDate()){
      age = age-1;
    }
    return age;
  }

  addEvent(event, type) {
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
          console.log(this.bajajAge,'agre');
          sessionStorage.bajajproposerAge = this.bajajAge;
          console.log(sessionStorage.bajajproposerAge,'sessionStorage.bajajproposerAge');
          this.proposer.controls['age'].patchValue(this.bajajAge);
        }

      } else if (typeof event.value._i == 'object') {
        // dob = this.datepipe.transform(event.value, 'MMM d, y');
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (dob.length == 10) {
          this.bajajAge = this.ageCalculate(dob);
          sessionStorage.insuredAgePA = this.bajajAge;
          this.proposer.controls['age'].patchValue(this.bajajAge);
        }
        this.proposerdateError = '';
      } else if ( type == 'nominee') {
        alert('1');
        this.nomineeAge = this.ageCalculate(dob);
        console.log(this.nomineeAge);
        if ( this.nomineeAge < 18) {
          alert('2');
          this.show = true;
        }else {
          this.show = false;
        }

      }
      //sessionStorage.insuredAgePA = this.bajajAge;

    }
  }

  // personal details
  proposerDetails(stepper,value){
    console.log(value);
    sessionStorage.lifeBajaj1 = JSON.stringify(value);
    if (this.proposer.valid)
    {
      stepper.next();
    }else
    {
      this.toastr.error('error')
    }
  }


  //services
  paIdList(){
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
  public paIdProofListSuccess(successData){
    if(successData.IsSuccess){
       this.paIdProofList = successData.ResponseObject;
       console.log(this.paIdProofList,'dfgh');
    }
  }
  public paIdProofListFailure(error){
  }

  // this function will get age proof list
  ageProof(){
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
  public ageProofListSuccess(successData){
    if(successData.IsSuccess){
      this.ageProofList = successData.ResponseObject;
      console.log(this.ageProofList,'7656');
    }
  }
  public ageProofListFailure(error){
  }

  // this function will get Marital status list
  maritalStatus(){
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
  public maritalListSuccess(successData){
    if(successData.IsSuccess){
      this.maritalStatusList = successData.ResponseObject;
      console.log(this.maritalStatusList,'7656');
    }
  }
  public maritalListFailure(error){
  }

  // this function will get communication language list
  cLanguageList(){
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
  public languageListSuccess(successData){
    if(successData.IsSuccess){
      this.languageList = successData.ResponseObject;
      console.log(this.languageList,'7656');
    }
  }
  public languageListFailure(error){
  }

  // this function will get proposer type
  proposerType(){
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
  public proposerTypeSuccess(successData){
    if(successData.IsSuccess){
      this.proposerTypeList = successData.ResponseObject;
      console.log(this.proposerTypeList,'pro');
    }
  }
  public proposerTypeFailure(error){
  }



  // this function will Document Language List
  docLanguage(){
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
  public docLanguageSuccess(successData){
    if(successData.IsSuccess){
      this.docLanguageList = successData.ResponseObject;
      console.log(this.docLanguageList,'pro');
    }
  }
  public docLanguageFailure(error){
  }
// this function will Document Language List
  primiumList(){
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
  public primiumListSuccess(successData){
    if(successData.IsSuccess){
      this.primiumpayList = successData.ResponseObject;
      console.log(this.primiumpayList,'pro');
    }
  }
  public primiumListFailure(error){
  }
  nationality(){
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
  public nationalityListSuccess(successData){
    if(successData.IsSuccess){
      this.nationalityList = successData.ResponseObject;
      console.log(this.nationalityList,'pro');
    }
  }
  public nationalityListFailure(error){
  }
  citizenship(){
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
  public citizenshipListSuccess(successData){
    if(successData.IsSuccess){
      this.citizenshipList = successData.ResponseObject;
      console.log(this.citizenshipList,'pro');
    }
  }
  public citizenshipListFailure(error){
  }


  country(){
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
  public countrySuccess(successData){
    if(successData.IsSuccess){
      this.countryList = successData.ResponseObject;
      console.log(this.countryList,'pro');
    }
  }
  public countryFailure(error){
  }
  weightChanged(){
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
  public weightSuccess(successData){
    if(successData.IsSuccess){
      this.weightList = successData.ResponseObject;
      console.log(this.weightList,'pro');
    }
  }
  public weightFailure(error){
  }
  title(){
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
  public TitleListSuccess(successData){
    if(successData.IsSuccess){
      this.TitleList = successData.ResponseObject;
      console.log(this.TitleList,'pro');
    }
  }
  public TitleListFailure(error){
  }
  occupation(){
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
  public occupationListSuccess(successData){
    if(successData.IsSuccess){
      this.occupationList = successData.ResponseObject;
      console.log(this.occupationList,'pro');
    }
  }
  public occupationListFailure(error){
  }

  politicalReson(){
    console.log(this.proposer.controls['politicallyExposedPerson'].value,'reson');
    if(this.proposer.controls['politicallyExposedPerson'].value == 'Yes'){
      this.politicalDetails = true;
    } else {
      this.politicalDetails = false;

    }
  }



  changeWeightChanged(){
    this.proposer.controls['weightChangedName'].patchValue(this.weightList[this.proposer.controls['weightChanged'].value]);
  }

  changeMarital(){
    this.proposer.controls['maritalStatusName'].patchValue(this.maritalStatusList[this.proposer.controls['maritalStatus'].value]);
  }
  occupationListCode(){
    this.proposer.controls['occupationListName'].patchValue(this.occupationList[this.proposer.controls['occupationList'].value]);
  }
  changeLanguage(){
    this.proposer.controls['languageName'].patchValue(this.languageList[this.proposer.controls['language'].value]);

  }
  changeProposerType()
  {
    this.proposer.controls['proposerTypeName'].patchValue(this.proposerTypeList[this.proposer.controls['proposerType'].value]);
  }
  changeDocLanguage(){
    this.proposer.controls['language2Name'].patchValue(this.docLanguageList[this.proposer.controls['language2'].value]);
  }
  changePremiumPayTerm()
  {
    this.proposer.controls['premiumPayTermName'].patchValue(this.primiumpayList[this.proposer.controls['premiumPayTerm'].value]);

  }
  changeNationality()
  {
    this.proposer.controls['nationalityName'].patchValue(this.nationalityList[this.proposer.controls['nationalityTerm'].value]);

  }

  changeCountry()
  {
    this.proposer.controls['countryOfResidName'].patchValue(this.countryList[this.proposer.controls['countryOfResid'].value]);

  }
  changeCitizenship()
  {
    this.proposer.controls['citizenshipName'].patchValue(this.citizenshipList[this.proposer.controls['citizenship'].value]);

  }
  // session Data
  sessionData() {

    if (sessionStorage.lifeBajaj1 != '' && sessionStorage.lifeBajaj1 != undefined) {
      let lifeBajaj1 = JSON.parse(sessionStorage.appollo2Detail);
      this.proposer = this.Proposer.group({
        title: lifeBajaj1.title,
        firstName: lifeBajaj1.firstName,
        lastName: lifeBajaj1.lastName,
        gender :lifeBajaj1.gender,
        dob :lifeBajaj1.dob,
        email :lifeBajaj1.email,
        mobile :lifeBajaj1.mobile,
        alterMobile :lifeBajaj1.alterMobile,
        maritalStatus: lifeBajaj1.maritalStatus,
        annualIncome: lifeBajaj1.annualIncome,
        occupationList: lifeBajaj1.occupationList,
        height :lifeBajaj1.height,
        weight :lifeBajaj1.weight,
        weightChanged :lifeBajaj1.weightChanged,
        weightChangedName :lifeBajaj1.weightChangedName,
        aadharNum :lifeBajaj1.aadharNum,
        address1 :lifeBajaj1.address1,
        address2 :lifeBajaj1.address2,
        pincode :lifeBajaj1.pincode,
        city :lifeBajaj1.city,
        state: lifeBajaj1.state,
        sameAsProposer: lifeBajaj1.sameAsProposer,
        raddress1: lifeBajaj1.raddress1,
        raddress2 :lifeBajaj1.raddress2,
        rpincode :lifeBajaj1.rpincode,
        rcity :lifeBajaj1.rcity,
        rstate :lifeBajaj1.rstate,
        spouseDob :lifeBajaj1.spouseDob,
        spouseName :lifeBajaj1.spouseName,
        spouseBirthPlace :lifeBajaj1.spouseBirthPlace,
        motherName :lifeBajaj1.motherName,
        fatherName :lifeBajaj1.fatherName,
        ifYesGiveDetails: lifeBajaj1.ifYesGiveDetails,
        politicallyExposedPerson: lifeBajaj1.politicallyExposedPerson,
        countryIpMailing: lifeBajaj1.countryIpMailing,
        relation :lifeBajaj1.relation,
        citizenship :lifeBajaj1.citizenship,
        pob :lifeBajaj1.pob,
        countryOfResid :lifeBajaj1.countryOfResid,
        nationality :lifeBajaj1.nationality,
        premiumfreq :lifeBajaj1.premiumfreq,
        premiumPayTerm :lifeBajaj1.premiumPayTerm,
        lifeBenefit :lifeBajaj1.lifeBenefit,
        language2: lifeBajaj1.language2,
        proposerType: lifeBajaj1.proposerType,
        language: lifeBajaj1.language,







      });


  //     if (sessionStorage.panomineeData != '' && sessionStorage.panomineeData != undefined) {
  //       this.getpanomineeData = JSON.parse(sessionStorage.panomineeData);
  //       this.nomineeDetail = this.proposerpa.group({
  //         paNomineeName: this.getpanomineeData.paNomineeName,
  //         paRelationship: this.getpanomineeData.paRelationship,
  //         paRelationshipName: this.getpanomineeData.paRelationshipName,
  //
  //       });
      }
    }
  }



