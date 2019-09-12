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
import {Observable, Subject} from 'rxjs';

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
@Component ({
  selector: 'app-hdfc-term-life',
  templateUrl: './hdfc-term-life.component.html',
  styleUrls: ['./hdfc-term-life.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})

export class HdfcTermLifeComponent implements OnInit {

  public personal: FormGroup;
  public nomineeDetail: FormGroup;
  public proposerAge: any;
  public nomineeAge: any;
  public dateError: any;
  public incomeError: any;
  public webhost: any;
  public today: any;
  public summaryData: any;
  public getStepper1: any;
  public getStepper3: any;
  public appTypeHdfcList: any;
  public addressHdfcList: any;
  public alcoholHdfcList: any;
  public dateErrorNominee: any;
  public nomineeDobValidError:any;
  public showAppointee:boolean;
  public annuityOptionHdfcList: any;
  public annualPolicyHdfcList: any;
  public accountTypeHdfcList: any;
  public annualValueHdfcList: any;
  public assignmentTypeHdfcList: any;
  public bussinessHdfcList: any;
  public relationAppointeeHdfcList: any;
  public communicationModeHdfcList: any;
  public impairmentEver4ListHdfcList: any;
  public fhAliveHdfcList: any;
  public docattributeHdfcList: any;
  public countryListHdfcList: any;
  public fundOptionHdfcList: any;
  public cityListHdfcList: any;
  public bankMasterHdfcList: any;
  public educationListHdfcList: any;
  public expectedStayHdfcList: any;
  public fhDiseaseHdfcList: any;
  public frequencyPayHdfcList: any;
  public genderListHdfcList: any;
  public maritalListHdfcList: any;
  public heightListHdfcList: any;
  public impairmentHdfcList: any;
  public impairmentEver2HdfcList: any;
  public impairmentEver3ListHdfcList: any;
  public incomeDocTypeHdfcList: any;
  public industryTypeHdfcList: any;
  public insuranceTypeHdfcList: any;
  public nationalityListHdfcList: any;
  public nomineeLifeassuredListHdfcList: any;
  public occupationTypeHdfcList: any;
  public magnumRelationHdfcList: any;
  public occupationListHdfcList: any;
  public occupationHighRiskHdfcList: any;
  public natureOfWorkHdfcList: any;
  public medicalExamLocationHdfcList: any;
  public partTypeListHdfcList: any;
  public payerwithLifeHdfcList: any;
  public modeOfPaymentHdfcList: any;
  public productionCategoryHdfcList: any;
  public prefferedLangHdfcList: any;
  public previousInsurerHdfcList: any;
  public proposerWithLifeAssureHdfcList: any;
  public relWithHdfcList: any;
  public riderHdfcList: any;
  public weightListHdfcList: any;
  public underwritingListHdfcList: any;
  public tobbacoTypeHdfcList: any;
  public titleListHdfcList: any;
  public stateListHdfcList: any;
  public sourceOfFundHdfcList: any;
  public simultaneousHdfcList: any;
  public residentialStatusHdfcList: any;
  public typeOfContactListHdfcList: any;
  public hdfcSecuritiesHdfcList: any;
  public questionTypeHdfcList: any;
  public insObjLstHdfcList: any;
  public careOfHdfcList: any;
  public appSourceHdfcList: any;
  public avocationHdfcList: any;
  public getDays: any;
  public getAge: any;
  public appModeHdfcList: any;
  public enquiryFormData: any;
  public lifePremiumList: any;
  public premiumList: any;
  public getEnquiryDetials: any;
  public enquiryFromDetials: any;
  public allProductLists: any;
  public appointeeDobValidError: any;
  public proposerFormData: any;
  public nomineeFormData: any;
  public stepper1: any;
  public personalData: any;
  public nomineeRelationship: any;
  public nomineeData: any;
  public appointeeAge: any;
  public response: any;
  public proposalId: any;
  public settings: Settings;
  public stepper2: any;
  public requestedUrl: any;
  public redirectUrl: any;
  public sum_insured_amount: any;
  public appointeeRelationList: any;
  public declaration: any;
  public inputReadonly: boolean;
  public apponiteeList: boolean;
   public minDate: any;
  public disabledAddress: any;
  public disabledPerAddress: any;
  public proposalGenStatus: boolean;
  public keyUp = new Subject<string>();


  constructor(public validation: ValidationService, public authservice: AuthService, public fb: FormBuilder, public route: ActivatedRoute, public TermLifeService: TermLifeCommonService, public datepipe: DatePipe, private toastr: ToastrService, public appSettings: AppSettings, public config: ConfigurationService) {
    let stepperindex = 0;
    // this.requestedUrl = '';
    this.redirectUrl = '';
    const minDate = new Date();
    this.minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
    this.route.params.forEach((params) => {
      if (params.stepper == true || params.stepper == 'true') {
        stepperindex = 2;
        if (sessionStorage.summaryData != '' && sessionStorage.summaryData != undefined) {
          this.summaryData = JSON.parse(sessionStorage.summaryData);
          this.redirectUrl = this.summaryData.redirectLink;
          // this.requestedUrl = this.summaryData.bilink;
          this.proposerFormData = JSON.parse(sessionStorage.proposerFormData);
          this.nomineeFormData = JSON.parse(sessionStorage.nomineeFormData);
          this.proposalId = this.summaryData.ProposalId;
          sessionStorage.aegon_proposal_id = this.proposalId;
        }
      }
    });
    this.inputReadonly = false;
    this.disabledAddress = false;
    this.disabledPerAddress = false;

    this.apponiteeList = false;
    this.settings = this.appSettings.settings;

    this.webhost = this.config.getimgUrl();

    this.personal = this.fb.group({
      title: ['', Validators.required],
      titleName: ['', Validators.required],
      firstnm: ['', Validators.required],
      lastnm: ['', Validators.required],
      gender: ['', Validators.required],
      genderName: ['', Validators.required],
      dob: ['', Validators.required],
      fathernm: ['', Validators.required],
      email: ['', Validators.required],
      maritalstatus: ['', Validators.required],
      maritalstatusName: ['', Validators.required],
      eduqual: ['', Validators.required],
      eduqualName: ['', Validators.required],
      nationality: ['', Validators.required],
      nationalityName: ['', Validators.required],
      residentstatus: ['', Validators.required],
      residentstatusName: ['', Validators.required],
      birthplace: ['', Validators.required],
      ishdfcempflg: 'N',
      exstngcustflg: 'N',
      isdisabledflg: 'N',
      pepflg: 'N',
      nriflg:'N',
      dematflg: 'N',
      smokerstatusflg: 'N',
      historyofconviction: 'N',
      houseno: ['', Validators.required],
      street: ['', Validators.required],
      landmark: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      pincode: ['', Validators.required],
      cityName: ['', Validators.required],
      stateName: ['', Validators.required],
      countryName: ['', Validators.required],
      isAddressSame: '',
      chouseno: ['', Validators.required],
      cstreet: ['', Validators.required],
      clandmark: ['', Validators.required],
      ccity: ['', Validators.required],
      cstate: ['', Validators.required],
      ccityName: ['', Validators.required],
      cstateName: ['', Validators.required],
      cpincode: ['', Validators.required],
      ccountry: ['', Validators.required],
      ccountryName: ['', Validators.required],
      // countrycode: ['', Validators.required],
      mobilenum: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      expdurofstay: ['', Validators.required],
      expdurofstayName: ['', Validators.required],
      prfdcommaddr: ['', Validators.required],
      prfdcommaddrName: ['', Validators.required],
      prfdcommmode: ['', Validators.required],
      prfdcommmodeName: ['', Validators.required],
      prfdcommlangName: ['', Validators.required],
      prfdcommlang: ['', Validators.required],
      occutype: ['', Validators.required],
      occutypeName: ['', Validators.required],
      employernm: ['', Validators.required],
      annualincm: ['', Validators.required],
      natureofoccu: ['', Validators.required],
      natureofoccuName: ['', Validators.required],
      addrline: ['', Validators.required],
      existulipflag: 'N',
      sourcetype: ['', Validators.required],
      sourcetypeName: ['', Validators.required],
      // fundpcntg: ['', Validators.required],
      fathernmtitle: ['', Validators.required],
      fathernmtitleName: ['', Validators.required],
      fatherfirstnm: ['', Validators.required],
      fathermiddlenm: ['', Validators.required],
      fatherlastnm: ['', Validators.required],
      mothernmtitle: ['', Validators.required],
      mothernmtitleName: ['', Validators.required],
      motherfirstnm: ['', Validators.required],
      mothermiddlenm: ['', Validators.required],
      motherlastnm: ['', Validators.required],
      mmaritalstatus: ['', Validators.required],
      mmaritalstatusName: ['', Validators.required],
      spousenmtitle: ['', Validators.required],
      spousenmtitleName: ['', Validators.required],
      spousefirstnm: ['', Validators.required],
      spousemiddlenm: ['', Validators.required],
      spouselastnm: ['', Validators.required],
      occutypesp: ['', Validators.required],
      occutypespName: ['', Validators.required],
      catofoccupation: ['', Validators.required],
      catofoccupationName: ['', Validators.required],
      countryofbirth: ['', Validators.required],
      countryofbirthName: ['', Validators.required],

    });


    this.nomineeDetail = this.fb.group({

      'itemsNominee' : this.fb.array([
        this.initItemRows()
      ])
    });

    // this.appointeeDetails = this.fb.group({
    //
    // });
  }

  ngOnInit() {
    this.enquiryFormData = JSON.parse(sessionStorage.enquiryFormData);
    this.lifePremiumList = JSON.parse(sessionStorage.lifePremiumList);
    console.log(this.lifePremiumList, 'this.lifePremiumList')
    this.getEnquiryDetials = JSON.parse(sessionStorage.getEnquiryDetials);
    this.enquiryFromDetials = JSON.parse(sessionStorage.enquiryFromDetials);
    this.getAddressHdfc();
    this.appTypeHdfc();
    this.accountTypeHdfc();
    this.getAlcoholHdfc();
    this.getAnnualValueHdfc();
    this.getannuityOptionHdfc();
    this.getannualPolicyHdfc();
    this.getappModeHdfc();
    this.getassignmentTypeHdfc();
    this.getavocationHdfc();
    this.getrelationAppointeeHdfc();
    this.getappSourceHdfc();
    this.getbussinessHdfc();
    this.getbankMasterHdfc();
    this.getcareOfHdfc();
    this.getcityListHdfc();
    this.getcommunicationModeHdfc();
    this.getcountryListHdfc();
    this.getdocattributeHdfc();
    this.geteducationListHdfc();
    this.getexpectedStayHdfc();
    this.getfhDiseaseHdfc();
    this.getfhAliveHdfc();
    this.getfrequencyPayHdfc();
    this.getfundOptionHdfc();
    this.getgenderListHdfc();
    this.getmaritalListHdfc();
    this.getheightListHdfc();
    this.getimpairmentHdfc();
    this.getimpairmentEver2Hdfc();
    this.getimpairmentEver3ListHdfc();
    this.getimpairmentEver4ListHdfc();
    this.getincomeDocTypeHdfc();
    this.getindustryTypeHdfc();
    this.getinsuranceTypeHdfc();
    this.getinsObjLstHdfc();
    this.getnationalityListHdfc();
    this.getnatureOfWorkHdfc();
    this.getnomineeLifeassuredListHdfc();
    this.getoccupationListHdfc();
    this.getoccupationTypeHdfc();
    this.getoccupationHighRiskHdfc();
    this.getmagnumRelationHdfc();
    this.getmedicalExamLocationHdfc();
    this.getmodeOfPaymentHdfc();
    this.getpartTypeListHdfc();
    this.getpayerwithLifeHdfc();
    this.getprefferedLangHdfc();
    this.getpreviousInsurerHdfc();
    this.getproductionCategoryHdfc();
    this.getproposerWithLifeAssureHdfc();
    this.getquestionTypeHdfc();
    this.getrelWithHdfc();
    this.gethdfcSecuritiesHdfc();
    this.getresidentialStatusHdfc();
    this.getriderHdfc();
    this.getsimultaneousHdfc();
    this.getsourceOfFundHdfc();
    this.getstateListHdfc();
    this.gettitleListHdfc();
    this.gettobbacoTypeHdfc();
    this.gettypeOfContactListHdfc();
    this.getweightListHdfc();
    this.sessionData();
  }
  initItemRows() {

    return this.fb.group(
        {
          rolecd: 'PRIMARY',
          ntitle: ['', Validators.required],
          // ntitleName: ['', Validators.required],
          nfirstnm: ['', Validators.required],
          nlastnm: ['', Validators.required],
          ngender: ['', Validators.required],
          // ngenderName: ['', Validators.required],
          nmaritalstatus: ['', Validators.required],
          // nmaritalstatusName: ['', Validators.required],
          // entitlepctg: ['', Validators.required],
          nrelationship: ['', Validators.required],
          nmobilenum: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
          nhouseno: ['', Validators.required],
          nstreet: ['', Validators.required],
          nlandmark: ['', Validators.required],
          ncity: ['', Validators.required],
          nstate: ['', Validators.required],
          npincode: ['', Validators.required],
          ncountry: ['', Validators.required],
          ncityName: ['', Validators.required],
          nstateName: ['', Validators.required],
          // npincode: ['', Validators.required],
          ncountryName: ['', Validators.required],
          nDob: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
          dateErrorNominee: '',
          atitle:'',
          // atitleName:'',
          afirstnm:'',
            alastnm: '',
          agender: '',
          // agenderName: '',
          aDob: '',
          amaritalstatus:'',
          // amaritalstatusName:'',
          ahouseno: '',
          astreet: '',
          alandmark:'',
          acity: '',
          astate: '',
          acountry: '',
          acityName: '',
          astateName: '',
          acountryName: '',
          arelationship:'',
          apincode: '',
          nomineeAgeVal: '',
          appointeeDobValidError:'',
          nomineeDobValidError:'',
          showAppointee: false,


        }
    );
  }

  uploadvalid() {

    console.log('11111111doc');
    window.open(this.redirectUrl,'_top')
    console.log('22222');

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
          console.log(this.proposerAge, ' this.proposerAge');

        }

      } else if (typeof event.value._i == 'object') {
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (dob.length == 10) {
          this.proposerAge = this.ageCalculate(dob);
          console.log(this.proposerAge, 'age')

        }
        this.dateError = '';
      }
      sessionStorage.proposerAge = this.proposerAge;

    }
  }


  addEventNominee(event, i, type) {
    if(type == 'nominee') {
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

        } else if (typeof event.value._i == 'object') {
          if (dob.length == 10) {
            this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nomineeDobValidError.patchValue('');
            this.getAge = this.ageCalculate(dob);
            this.getDays = this.ageCalculateInsurer(dob_days);
            console.log(this.getAge, 'getage')
          }
        }
      }
      if (i == 0) {
        sessionStorage.nomineAge = this.getAge;
        console.log(this.getAge, 'getaage');


        if ( i != 0){
          if(this.getAge < 18){
            this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nomineeAgeVal.patchValue(1);
            console.log(this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nomineeAgeVal.value,'nomineeagevalue');
          }else{
            this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nomineeAgeVal.patchValue(0);
            console.log(this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nomineeAgeVal.value,'nomineeagevalueelsee');
          }

        }
        if (this.getAge < 18) {
          console.log(this.getAge < 18, 'true');
          // console.log( this.nomineeDetail['controls'].showAppointee.patchValue(true),'  this.nomineeDetail[\'controls\'].itemsNominee[\'controls\'][i][\'controls\'].showAppointee.patchValue(true)')

          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].showAppointee.patchValue(true);
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].atitle.patchValue(this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].atitle.value);
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].afirstnm.patchValue(this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].afirstnm.value);
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].alastnm.patchValue(this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].alastnm.value);
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].agender.patchValue(this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].agender.value);
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].aDob.patchValue(this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].aDob.value);
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].amaritalstatus.patchValue(this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].amaritalstatus.value);
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].ahouseno.patchValue(this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].ahouseno.value);
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].astreet.patchValue(this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].astreet.value);
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].alandmark.patchValue(this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].alandmark.value);
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].acity.patchValue(this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].acity.value);
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].astate.patchValue(this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].astate.value);
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].acountry.patchValue(this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].acountry.value);
           this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].acityName.patchValue(this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].acityName.value);
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].astateName.patchValue(this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].astateName.value);
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].acountryName.patchValue(this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].acountryName.value);
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].arelationship.patchValue(this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].arelationship.value);
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].apincode.patchValue(this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].apincode.value);


          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].atitle.setValidators([Validators.required]);
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].afirstnm.setValidators([Validators.required]);
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].alastnm.setValidators([Validators.required]);
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].agender.setValidators([Validators.required]);
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].aDob.setValidators([Validators.required]);
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].amaritalstatus.setValidators([Validators.required]);
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].ahouseno.setValidators([Validators.required]);
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].astreet.setValidators([Validators.required]);
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].alandmark.setValidators([Validators.required]);
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].acity.setValidators([Validators.required]);
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].astate.setValidators([Validators.required]);
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].acountry.setValidators([Validators.required]);
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].acityName.setValidators([Validators.required]);
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].astateName.setValidators([Validators.required]);
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].acountryName.setValidators([Validators.required]);
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].arelationship.setValidators([Validators.required]);
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].apincode.setValidators([Validators.required]);
        } else {
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].showAppointee.patchValue(false);
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].afirstnm.setValidators(null);
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].alastnm.setValidators(null);
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].agender.setValidators(null);
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].aDob.setValidators(null);
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].amaritalstatus.setValidators(null);
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].ahouseno.setValidators(null);
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].astreet.setValidators(null);
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].alandmark.setValidators(null);
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].acity.setValidators(null);
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].astate.setValidators(null);
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].acountry.setValidators(null);
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].acityName.setValidators(null);
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].astateName.setValidators(null);
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].acountryName.setValidators(null);
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].arelationship.setValidators(null);
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].apincode.setValidators(null);


          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].atitle.patchValue('');
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].afirstnm.patchValue('');
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].alastnm.patchValue('');
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].agender.patchValue('');
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].aDob.patchValue('');
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].amaritalstatus.patchValue('');
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].ahouseno.patchValue('');
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].astreet.patchValue('');
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].alandmark.patchValue('');
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].acity.patchValue('');
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].astate.patchValue('');
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].acountry.patchValue('');
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].acityName.patchValue('');
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].astateName.patchValue('');
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].acountryName.patchValue('');
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].arelationship.patchValue('');
          this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].apincode.patchValue('');
        }
        this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].atitle.updateValueAndValidity();
        this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].afirstnm.updateValueAndValidity();
        this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].alastnm.updateValueAndValidity();
        this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].agender.updateValueAndValidity();
        this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].aDob.updateValueAndValidity();
        this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].amaritalstatus.updateValueAndValidity();
        this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].ahouseno.updateValueAndValidity();
        this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].astreet.updateValueAndValidity();
        this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].alandmark.updateValueAndValidity();
        this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].acity.updateValueAndValidity();
        this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].astate.updateValueAndValidity();
        this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].acountry.updateValueAndValidity();
         this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].acityName.updateValueAndValidity();
        this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].astateName.updateValueAndValidity();
        this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].acountryName.updateValueAndValidity();
        this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].arelationship.updateValueAndValidity();
        this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].apincode.updateValueAndValidity();


      }
    }
     else if(type == 'appointee') {

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
            this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].appointeeDobValidError.patchValue('');

          } else {
            this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].appointeeDobValidError.patchValue('Enter Valid DOB');
          }

          selectedDate = event.value._i;

          if (selectedDate.length == 10) {
            this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].appointeeDobValidError.patchValue('');
            this.getAge = this.ageCalculate(dob);
            this.getDays = this.ageCalculate(dob_days);
            this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].aDob.patchValue(dob);

          }

        }
        else if (typeof event.value._i == 'object') {
          if (dob.length == 10) {
            this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].appointeeDobValidError.patchValue('');
            this.getAge = this.ageCalculate(dob);
            this.getDays = this.ageCalculateInsurer(dob_days);
          }
        }
      }
      sessionStorage.appointeeAge = this.getAge;
  console.log( sessionStorage.appointeeAge, ' sessionStorage.appointeeAge');
    }
  }

  appointeeAgeValid(event: any, i) {
    if (this.nomineeDetail['controls'].showAppointee.value == true ) {

      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].atitle.patchValue(this.nomineeDetail['controls'].atitle.value);
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].afirstnm.patchValue(this.nomineeDetail['controls'].afirstnm.value);
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].alastnm.patchValue(this.nomineeDetail['controls'].alastnm.value);
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].agender.patchValue(this.nomineeDetail['controls'].agender.value);
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].aDob.patchValue(this.nomineeDetail['controls'].aDob.value);
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].amaritalstatus.patchValue(this.nomineeDetail['controls'].amaritalstatus.value);
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].ahouseno.patchValue(this.nomineeDetail['controls'].ahouseno.value);
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].astreet.patchValue(this.nomineeDetail['controls'].astreet.value);
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].alandmark.patchValue(this.nomineeDetail['controls'].alandmark.value);
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].acity.patchValue(this.nomineeDetail['controls'].acity.value);
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].astate.patchValue(this.nomineeDetail['controls'].astate.value);
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].acountry.patchValue(this.nomineeDetail['controls'].acountry.value);
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].acityName.patchValue(this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].acityName.value);
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].astateName.patchValue(this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].astateName.value);
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].acountryName.patchValue(this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].acountryName.value);
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].arelationship.patchValue(this.nomineeDetail['controls'].arelationship.value);
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].apincode.patchValue(this.nomineeDetail['controls'].apincode.value);


      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].atitle.setValidators([Validators.required]);
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].afirstnm.setValidators([Validators.required]);
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].alastnm.setValidators([Validators.required]);
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].agender.setValidators([Validators.required]);
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].aDob.setValidators([Validators.required]);
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].amaritalstatus.setValidators([Validators.required]);
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].ahouseno.setValidators([Validators.required]);
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].astreet.setValidators([Validators.required]);
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].alandmark.setValidators([Validators.required]);
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].acity.setValidators([Validators.required]);
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].astate.setValidators([Validators.required]);
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].acountry.setValidators([Validators.required]);
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].acityName.setValidators([Validators.required]);
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].astateName.setValidators([Validators.required]);
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].acountryName.setValidators([Validators.required]);

      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].arelationship.setValidators([Validators.required]);
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].apincode.setValidators([Validators.required]);
    } else {
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].showAppointee.patchValue(false);
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].atitle.setValidators(null);
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].afirstnm.setValidators(null);
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].alastnm.setValidators(null);
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].agender.setValidators(null);
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].aDob.setValidators(null);
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].amaritalstatus.setValidators(null);
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].ahouseno.setValidators(null);
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].astreet.setValidators(null);
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].alandmark.setValidators(null);
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].acity.setValidators(null);
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].astate.setValidators(null);
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].acountry.setValidators(null);
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].acityName.setValidators(null);
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].astateName.setValidators(null);
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].acountryName.setValidators(null);

      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].arelationship.setValidators(null);
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].apincode.setValidators(null);


      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].atitle.patchValue('');
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].afirstnm.patchValue('');
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].alastnm.patchValue('');
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].agender.patchValue('');
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].aDob.patchValue('');
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].amaritalstatus.patchValue('');
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].ahouseno.patchValue('');
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].astreet.patchValue('');
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].alandmark.patchValue('');
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].acity.patchValue('');
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].astate.patchValue('');
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].acountry.patchValue('');
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].acityName.patchValue('');
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].astateName.patchValue('');
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].acountryName.patchValue('');
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].arelationship.patchValue('');
      this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].apincode.patchValue('');
    }
    this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].atitle.updateValueAndValidity();
    this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].afirstnm.updateValueAndValidity();
    this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].alastnm.updateValueAndValidity();
    this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].agender.updateValueAndValidity();
    this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].aDob.updateValueAndValidity();
    this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].amaritalstatus.updateValueAndValidity();
    this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].ahouseno.updateValueAndValidity();
    this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].astreet.updateValueAndValidity();
    this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].alandmark.updateValueAndValidity();
    this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].acity.updateValueAndValidity();
    this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].astate.updateValueAndValidity();
    this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].acountry.updateValueAndValidity();
    this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].acityName.updateValueAndValidity();
    this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].astateName.updateValueAndValidity();
    this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].acountryName.updateValueAndValidity();

    this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].arelationship.updateValueAndValidity();
    this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].apincode.updateValueAndValidity();

  }

  ageCalculateInsurer(getDays) {
    let a = moment(getDays, 'DD/MM/YYYY');
    let b = moment(new Date(), 'DD/MM/YYYY');
    let days = b.diff(a, 'days');
    return days;
  }
  sameAddress(value:any){
    if (this.personal.controls['isAddressSame'].value) {
      console.log(this.personal.controls['isAddressSame'].value,'ifff');
      this.inputReadonly = true;
      this.personal.controls['chouseno'].patchValue(this.personal.controls['houseno'].value);
      this.personal.controls['cstreet'].patchValue(this.personal.controls['street'].value);
      this.personal.controls['clandmark'].patchValue(this.personal.controls['landmark'].value);
      this.personal.controls['ccityName'].patchValue(this.personal.controls['cityName'].value);
      this.personal.controls['cstateName'].patchValue(this.personal.controls['stateName'].value);
      this.personal.controls['cpincode'].patchValue(this.personal.controls['pincode'].value);
      this.personal.controls['ccountryName'].patchValue(this.personal.controls['countryName'].value);
      // this.cityList = JSON.parse(sessionStorage.citycList);
      // sessionStorage.cityList = JSON.stringify(this.cityList);


    } else {
      this.inputReadonly = false;
      this.personal.controls['chouseno'].patchValue('');
      this.personal.controls['cstreet'].patchValue('');
      this.personal.controls['clandmark'].patchValue('');
      this.personal.controls['ccityName'].patchValue('');
      this.personal.controls['cstateName'].patchValue('');
      this.personal.controls['cpincode'].patchValue('');
      this.personal.controls['ccountryName'].patchValue('');
      // if (sessionStorage.cityList != '' && sessionStorage.cityList != undefined) {
      //   this.cityList = JSON.parse(sessionStorage.cityList);
      // } else {
      //   this.cityList = {};
      // }
    }

  }

  typeAddressDeatils() {
    if (this.personal.controls['isAddressSame'].value) {
      this.personal.controls['chouseno'].setValue(this.personal.controls['houseno'].value);
      this.personal.controls['cstreet'].setValue(this.personal.controls['street'].value);
      this.personal.controls['clandmark'].setValue(this.personal.controls['landmark'].value);
      this.personal.controls['ccityName'].setValue(this.personal.controls['cityName'].value);
      this.personal.controls['cstateName'].setValue(this.personal.controls['stateName'].value);
      this.personal.controls['cpincode'].setValue(this.personal.controls['pincode'].value);
      this.personal.controls['ccountryName'].setValue(this.personal.controls['countryName'].value);
      // this.cityList = JSON.parse(sessionStorage.citycList);

    }
  }

  changeTitle() {
    this.personal.controls['titleName'].patchValue(this.titleListHdfcList[this.personal.controls['title'].value]);
    console.log( this.personal.controls['titleName'].value,' tittle')
  }
  changeGender() {
    this.personal.controls['genderName'].patchValue(this.genderListHdfcList[this.personal.controls['gender'].value]);
  }
  changeMaritalStatus() {
    this.personal.controls['maritalstatusName'].patchValue(this.maritalListHdfcList[this.personal.controls['maritalstatus'].value]);
  }changeQualification() {
    this.personal.controls['eduqualName'].patchValue(this.educationListHdfcList[this.personal.controls['eduqual'].value]);
  }changeNationality() {
    this.personal.controls['nationalityName'].patchValue(this.nationalityListHdfcList[this.personal.controls['nationality'].value]);
  }changeResident() {
    this.personal.controls['residentstatusName'].patchValue(this.residentialStatusHdfcList[this.personal.controls['residentstatus'].value]);
  }changeexp() {
    this.personal.controls['expdurofstayName'].patchValue(this.expectedStayHdfcList[this.personal.controls['expdurofstay'].value]);
  }changeprfdcommaddr() {
    this.personal.controls['prfdcommaddrName'].patchValue(this.addressHdfcList[this.personal.controls['prfdcommaddr'].value]);
  }changecommodename() {
    this.personal.controls['prfdcommmodeName'].patchValue(this.communicationModeHdfcList[this.personal.controls['prfdcommmode'].value]);
  }changeLang() {
    this.personal.controls['prfdcommlangName'].patchValue(this.prefferedLangHdfcList[this.personal.controls['prfdcommlang'].value]);
  }changeoccutype() {
    this.personal.controls['occutypeName'].patchValue(this. occupationTypeHdfcList[this.personal.controls['occutype'].value]);
  }changenatureOfOccu() {
    this.personal.controls['natureofoccuName'].patchValue(this.natureOfWorkHdfcList[this.personal.controls['natureofoccu'].value]);
  }changesourcetype() {
    this.personal.controls['sourcetypeName'].patchValue(this.sourceOfFundHdfcList[this.personal.controls['sourcetype'].value]);
  }changefathernmtitle() {
    this.personal.controls['fathernmtitleName'].patchValue(this.titleListHdfcList[this.personal.controls['fathernmtitle'].value]);
  }
  changemothernmtitle() {
    this.personal.controls['mothernmtitleName'].patchValue(this.titleListHdfcList[this.personal.controls['mothernmtitle'].value]);
  }
  changemmaritalstatus() {
    this.personal.controls['mmaritalstatusName'].patchValue(this.maritalListHdfcList[this.personal.controls['mmaritalstatus'].value]);
  }
 changespousenmtitle() {
    this.personal.controls['spousenmtitleName'].patchValue(this.titleListHdfcList[this.personal.controls['spousenmtitle'].value]);
  }
 changeoccutypesp() {
    this.personal.controls['occutypespName'].patchValue(this.occupationTypeHdfcList[this.personal.controls['occutypesp'].value]);
  }
changecatofoccupation() {
    this.personal.controls['catofoccupationName'].patchValue(this.occupationListHdfcList[this.personal.controls['catofoccupation'].value]);
  }
changecountryofbirth() {
    this.personal.controls['countryofbirthName'].patchValue(this.countryListHdfcList[this.personal.controls['countryofbirth'].value]);
  }
//   geteNomineeTitle(i) {
//     this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].ntitleName.patchValue(this.titleListHdfcList[this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].ntitle.value] );
//   }
//  geteNomineeGender(i) {
//     this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].ngenderName.patchValue(this.genderListHdfcList[this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].ngender.value] );
//   }
//  getenmaritalstatus(i) {
//     this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nmaritalstatusName.patchValue(this.maritalListHdfcList[this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nmaritalstatus.value] );
//   }
//  getenrelationship(i) {
//     this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nrelationshipName.patchValue(this.nomineeLifeassuredListHdfcList[this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nrelationship.value] );
//   }
//  geteatitle(i) {
//     this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].atitleName.patchValue(this.titleListHdfcList[this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].atitle.value] );
//   }
//
// geteagender(i) {
//     this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].agenderName.patchValue(this.genderListHdfcList[this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].agender.value] );
//   }
//
// geteamaritalstatus(i) {
//     this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].amaritalstatusName.patchValue(this.titleListHdfcList[this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].amaritalstatus.value] );
//   }
//
// geterelationAppointeeHdfcList(i) {
//     this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].arelationshipName.patchValue(this.relationAppointeeHdfcList[this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].arelationship.value] );
//   }



  // AGE VALIDATION
  ageCalculate(dob) {
    console.log(dob, 'dob');
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

  public personalDetails(stepper: MatStepper, value) {

    this.personalData = value;
    // console.log(this.personal.controls['titleName'].value,'titlw nme')
    console.log(value, 'eeeeeeeeeee');
    sessionStorage.stepper1Details = '';
    sessionStorage.stepper1Details = JSON.stringify(value);
    // console.log(this.personal.valid, 'checked');

    if(this.personal.valid) {
      if(sessionStorage.proposerAge >= 18){

        stepper.next();
        this.topScroll();
      } else {
        this.toastr.error('Proposer age should be 18 or above');

      }
    }

  }


  // nominee details
  nomineeDetailNext(stepper, value) {

    console.log(value,'value');
    sessionStorage.stepper3Details = JSON.stringify(value);
    console.log(this.nomineeDetail.valid, 'this.nomineeDetail.valid');
    console.log(this.nomineeDetail.get('itemsNominee')['controls'].length,'length');

    // nomineeAge validate
    let nomineeValid = true;
    if (sessionStorage.nomineAge != '' && sessionStorage.nomineAge != undefined) {
      if (sessionStorage.nomineAge <= 18) {
        nomineeValid = false;
      }
    }
    // appointeeAge validatate
    let appointeeAge = false;
    if (sessionStorage.appointeeAge != '' && sessionStorage.appointeeAge != undefined) {
      if (sessionStorage.appointeeAge >= 18) {
        appointeeAge = true;
      }
    }

    //
    console.log(sessionStorage.appointeeAge,'appointeeAge11222');
    // console.log(sessionStorage.appointeeAge2,'appointeeAge2233');

    // nominee 2 age validation
    let nominee2ageval;
    for (let i=0; i < this.nomineeDetail.get('itemsNominee')['controls'].length; i++) {
      if ( this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nomineeAgeVal.value == 1) {
        nominee2ageval = false;

      } else {
        nominee2ageval = true;
      }
    }

    if (this.nomineeDetail.controls.itemsNominee.valid) {
      if (!nomineeValid || !nominee2ageval) {


        if (appointeeAge ) {
          console.log(appointeeAge,'appointeeAgeentry')
          stepper.next();
          this.topScroll();
          this.proposal(stepper);

        } else {
          this.toastr.error('Appointee Age should be greater than 18.');
          // console.log('2222');

        }
      } else {
        stepper.next();
        this.topScroll();
        this.proposal(stepper);
      }
    }
  }


  // add NOmineee
  addNominee(event) {
    // if (this.nomineeDetail.valid) {
    console.log(this.nomineeDetail.get('itemsNominee').value.length, 'valueeee')
    if (this.nomineeDetail.get('itemsNominee').value.length < 2) {
      let nomineeForm = this.nomineeDetail.get('itemsNominee') as FormArray;
      nomineeForm.push(this.initItemRows());
    }

  }


  removeNominee(event, index) {
    let nomineeForm = this.nomineeDetail.get('itemsNominee') as FormArray;
    nomineeForm.removeAt(1);
  }




  getAddressHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.addressHdfc(data).subscribe(
        (successData) => {
          this.addressHdfcListSuccess(successData);
        },
        (error) => {
         this.addressHdfcListFailure(error);
        }
    );
  }

  public addressHdfcListSuccess(successData) {
    if (successData.IsSuccess) {
      this.addressHdfcList = successData.ResponseObject;
    }
  }
  public addressHdfcListFailure(error) {
  }

  getPostalCode(pin, title) {
    const data = {
      'platform': 'web',
      'pin_code': pin
    };
    console.log(data,'jhgjh');
    if (pin.length == 6) {
      this.TermLifeService.getpincode(data).subscribe(
          (successData) => {
            this.pinProposerListSuccess(successData, pin);
          },
          (error) => {
            this.pinProposerListFailure(error);
          }
      );
    }
  }

  public pinProposerListSuccess(successData, pin) {
    if (successData.IsSuccess) {
      this.response = successData.ResponseObject;
      console.log(pin,'jhgfdghj');
      if(pin.length == '' || pin.length == 0 || pin.length != 6){
        this.personal.controls['state'].patchValue('');
        this.personal.controls['city'].patchValue('');
      }
      for(let key in this.response.state) {
        this.personal.controls['state'].patchValue(key);
        this.personal.controls['stateName'].patchValue(this.response['state'][key]);
      }
      for(let key in this.response.city) {
        this.personal.controls['city'].patchValue(key);
        this.personal.controls['cityName'].patchValue(this.response['city'][key]);
      }

    } else{
      this.toastr.error(successData.ErrorObject);
      this.personal.controls['state'].patchValue('');
      this.personal.controls['city'].patchValue('');

    }
  }


  public pinProposerListFailure(error) {
  }

  getPostal(pin, title) {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pin_code': pin
    }
    if (pin.length == 6) {
      this.TermLifeService.getpincode(data).subscribe(
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
      if (title == 'personal') {
         // this.cityListHdfcList = this.response.city;
         //  console.log(this.cityListHdfcList,'this.CholaCityList')
        // this.personal.controls['country'].setValue(this.response.CNTRY_IND);
        // console.log(this.personal.controls['country'].value,'this.country');
        // this.personal.controls['state'].setValue(this.response.TN);
        //   console.log(this.personal.controls['state'].value,'this.state')
        //   this.personal.controls['city'].setValue(this.response.CTY_CHEN20);
        //   console.log(this.personal.controls['city'].value,'this.city');
        // this.personal.controls['cityId'].setValue(this.response.CTY_CHEN20);

        for(let key in this.response.state) {
          this.personal.controls['state'].patchValue(key);
          this.personal.controls['stateName'].patchValue(this.response['state'][key]);
        }
        for(let key in this.response.city) {
          this.personal.controls['city'].patchValue(key);
          this.personal.controls['cityName'].patchValue(this.response['city'][key]);
        }
        for(let key in this.response.country) {
          this.personal.controls['country'].patchValue(key);
          this.personal.controls['countryName'].patchValue(this.response['country'][key]);
        }
        for(let key in this.response.state) {
          this.personal.controls['cstate'].patchValue(key);
          this.personal.controls['cstateName'].patchValue(this.response['state'][key]);
        }
        for(let key in this.response.city) {
          this.personal.controls['ccity'].patchValue(key);
          this.personal.controls['ccityName'].patchValue(this.response['city'][key]);
        }
        for(let key in this.response.country) {
          this.personal.controls['ccountry'].patchValue(key);
          this.personal.controls['ccountryName'].patchValue(this.response['country'][key]);
        }

      }
      else if(title == 'nominee')
      {
        for (let i = 0; i < this.nomineeDetail.value.itemsNominee.length; i++) {
          // this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].ncountry.patchValue(this.response.CNTRY_IND);
          // this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nstate.patchValue(this.response.TN);
          // this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].ncity.patchValue(this.response.CTY_CHEN20);

          for (let key in this.response.country) {
            this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].ncountry.patchValue(key);
            this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].ncountryName.patchValue(this.response['country'][key]);
          }
          for (let key in this.response.city) {
            this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].ncity.patchValue(key);
            this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].ncityName.patchValue(this.response['city'][key]);
          }
          for (let key in this.response.state) {
            this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nstate.patchValue(key);
            this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nstateName.patchValue(this.response['state'][key]);
          }

        }
      }
      else if(title == 'appointee')
      {
        for (let i = 0; i < this.nomineeDetail.value.itemsNominee.length; i++) {
          // this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].acountry.patchValue(this.response.CNTRY_IND);
          // this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].astate.patchValue(this.response.TN);
          // this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].acity.patchValue(this.response.CTY_CHEN20);
          for (let key in this.response.country) {
            this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].acountry.patchValue(key);
            this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].acountryName.patchValue(this.response['country'][key]);
          }
          for (let key in this.response.state) {
            this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].astate.patchValue(key);
            this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].astateName.patchValue(this.response['state'][key]);
          }
          for (let key in this.response.city) {
            this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].acity.patchValue(key);
            this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].acityName.patchValue(this.response['city'][key]);
          }
        }
      }
      sessionStorage.cityListHdfcList = JSON.stringify(this.cityListHdfcList);

    } else {
      this.toastr.error('Invalid Pincode');
      if (title == 'personal') {
        sessionStorage.cityListHdfcList = '';
        this.cityListHdfcList = {};
        this.personal.controls['cityName'].setValue('');
        this.personal.controls['stateName'].setValue('');
        this.personal.controls['countryName'].setValue('');

      }
      else if(title== 'nominee') {
        sessionStorage.cityListHdfcList ='';
        for (let i = 0; i < this.nomineeDetail.value.itemsNominee.length; i++) {
          this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].ncountryName.setValue('');
          this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nstateName.setValue('');
          this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].ncityName.setValue('');
        }

      }
      else if(title== 'nominee') {
        sessionStorage.cityListHdfcList ='';
        for (let i = 0; i < this.nomineeDetail.value.itemsNominee.length; i++) {
          this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].acountryName.setValue('');
          this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].astateName.setValue('');
          this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].acityName.setValue('');
        }

      }
    }
  }
  public pincodeListFailure(error) {
  }


appTypeHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.appTypeHdfc(data).subscribe(
        (successData) => {
          this.appTypeHdfcSuccess(successData);
        },
        (error) => {
          this.appTypeHdfcFailure(error);
        }
    );
  }

  public appTypeHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.appTypeHdfcList = successData.ResponseObject;
    }
  }
  public appTypeHdfcFailure(error) {
  }
  accountTypeHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.accountTypeHdfc(data).subscribe(
        (successData) => {
          this.accountTypeHdfcSuccess(successData);
        },
        (error) => {
          this.accountTypeHdfcFailure(error);
        }
    );
  }

  public accountTypeHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.accountTypeHdfcList = successData.ResponseObject;
    }
  }
  public accountTypeHdfcFailure(error) {
  }

  getAlcoholHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.alcoholHdfc(data).subscribe(
        (successData) => {
          this.alcoholHdfcSuccess(successData);
        },
        (error) => {
          this.alcoholHdfcFailure(error);
        }
    );
  }

  public alcoholHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.alcoholHdfcList = successData.ResponseObject;
    }
  }
  public alcoholHdfcFailure(error) {
  }

getAnnualValueHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.annualValueHdfc(data).subscribe(
        (successData) => {
          this.annualValueHdfcSuccess(successData);
        },
        (error) => {
          this.annualValueHdfcFailure(error);
        }
    );
  }

  public annualValueHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.annualValueHdfcList = successData.ResponseObject;
    }
  }
  public annualValueHdfcFailure(error) {
  }

getannuityOptionHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.annuityOptionHdfc(data).subscribe(
        (successData) => {
          this.annuityOptionHdfcSuccess(successData);
        },
        (error) => {
          this.annuityOptionHdfcFailure(error);
        }
    );
  }

  public annuityOptionHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.annuityOptionHdfcList = successData.ResponseObject;
    }
  }
  public annuityOptionHdfcFailure(error) {
  }
getannualPolicyHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.annualPolicyHdfc(data).subscribe(
        (successData) => {
          this.annualPolicyHdfcSuccess(successData);
        },
        (error) => {
          this.annualPolicyHdfcFailure(error);
        }
    );
  }

  public annualPolicyHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.annualPolicyHdfcList = successData.ResponseObject;
    }
  }
  public annualPolicyHdfcFailure(error) {
  }
getappModeHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.appModeHdfc(data).subscribe(
        (successData) => {
          this.appModeHdfcSuccess(successData);
        },
        (error) => {
          this.appModeHdfcFailure(error);
        }
    );
  }

  public appModeHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.appModeHdfcList = successData.ResponseObject;
    }
  }
  public appModeHdfcFailure(error) {
  }
getassignmentTypeHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.assignmentTypeHdfc(data).subscribe(
        (successData) => {
          this.assignmentTypeHdfcSuccess(successData);
        },
        (error) => {
          this.assignmentTypeHdfcFailure(error);
        }
    );
  }

  public assignmentTypeHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.assignmentTypeHdfcList = successData.ResponseObject;
    }
  }
  public assignmentTypeHdfcFailure(error) {
  }
getavocationHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.avocationHdfc(data).subscribe(
        (successData) => {
          this.avocationHdfcSuccess(successData);
        },
        (error) => {
          this.avocationHdfcFailure(error);
        }
    );
  }

  public avocationHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.avocationHdfcList = successData.ResponseObject;
    }
  }
  public avocationHdfcFailure(error) {
  }
getrelationAppointeeHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.relationAppointeeHdfc(data).subscribe(
        (successData) => {
          this.relationAppointeeHdfcSuccess(successData);
        },
        (error) => {
          this.relationAppointeeHdfcFailure(error);
        }
    );
  }

  public relationAppointeeHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.relationAppointeeHdfcList = successData.ResponseObject;
    }
  }
  public relationAppointeeHdfcFailure(error) {
  }
  getappSourceHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.appSourceHdfc(data).subscribe(
        (successData) => {
          this.appSourceHdfcSuccess(successData);
        },
        (error) => {
          this.appSourceHdfcFailure(error);
        }
    );
  }

  public appSourceHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.appSourceHdfcList = successData.ResponseObject;
    }
  }
  public appSourceHdfcFailure(error) {
   }
getbussinessHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.bussinessHdfc(data).subscribe(
        (successData) => {
          this.bussinessHdfcSuccess(successData);
        },
        (error) => {
          this.bussinessHdfcFailure(error);
        }
    );
  }

  public bussinessHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.bussinessHdfcList = successData.ResponseObject;
    }
  }
  public bussinessHdfcFailure(error) {
  }
getbankMasterHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.bankMasterHdfc(data).subscribe(
        (successData) => {
          this.bankMasterHdfcSuccess(successData);
        },
        (error) => {
          this.bankMasterHdfcFailure(error);
        }
    );
  }

  public bankMasterHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.bankMasterHdfcList = successData.ResponseObject;
    }
  }
  public bankMasterHdfcFailure(error) {
  }
getcareOfHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.careOfHdfc(data).subscribe(
        (successData) => {
          this.careOfHdfcSuccess(successData);
        },
        (error) => {
          this.careOfHdfcFailure(error);
        }
    );
  }

  public careOfHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.careOfHdfcList = successData.ResponseObject;
    }
  }
  public careOfHdfcFailure(error) {
  }
getcityListHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.cityListHdfc(data).subscribe(
        (successData) => {
          this.cityListHdfcSuccess(successData);
        },
        (error) => {
          this.cityListHdfcFailure(error);
        }
    );
  }

  public cityListHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.cityListHdfcList = successData.ResponseObject;
    }
  }
  public cityListHdfcFailure(error) {
  }
getcommunicationModeHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.communicationModeHdfc(data).subscribe(
        (successData) => {
          this.communicationModeHdfcSuccess(successData);
        },
        (error) => {
          this.communicationModeHdfcFailure(error);
        }
    );
  }

  public communicationModeHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.communicationModeHdfcList = successData.ResponseObject;
    }
  }
  public communicationModeHdfcFailure(error) {
  }
getcountryListHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.countryListHdfc(data).subscribe(
        (successData) => {
          this.countryListHdfcSuccess(successData);
        },
        (error) => {
          this.countryListHdfcFailure(error);
        }
    );
  }

  public countryListHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.countryListHdfcList = successData.ResponseObject;
    }
  }
  public countryListHdfcFailure(error) {
  }
getdocattributeHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.docattributeHdfc(data).subscribe(
        (successData) => {
          this.docattributeHdfcSuccess(successData);
        },
        (error) => {
          this.docattributeHdfcFailure(error);
        }
    );
  }

  public docattributeHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.docattributeHdfcList = successData.ResponseObject;
    }
  }
  public docattributeHdfcFailure(error) {
  }
geteducationListHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.educationListHdfc(data).subscribe(
        (successData) => {
          this.educationListHdfcSuccess(successData);
        },
        (error) => {
          this.educationListHdfcFailure(error);
        }
    );
  }

  public educationListHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.educationListHdfcList = successData.ResponseObject;
    }
  }
  public educationListHdfcFailure(error) {
  }
getexpectedStayHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.expectedStayHdfc(data).subscribe(
        (successData) => {
          this.expectedStayHdfcSuccess(successData);
        },
        (error) => {
          this.expectedStayHdfcFailure(error);
        }
    );
  }

  public expectedStayHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.expectedStayHdfcList = successData.ResponseObject;
    }
  }
  public expectedStayHdfcFailure(error) {
  }
getfhDiseaseHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.fhDiseaseHdfc(data).subscribe(
        (successData) => {
          this.fhDiseaseHdfcSuccess(successData);
        },
        (error) => {
          this.fhDiseaseHdfcFailure(error);
        }
    );
  }

  public fhDiseaseHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.fhDiseaseHdfcList = successData.ResponseObject;
    }
  }
  public fhDiseaseHdfcFailure(error) {
  }
getfhAliveHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.fhAliveHdfc(data).subscribe(
        (successData) => {
          this.fhAliveHdfcSuccess(successData);
        },
        (error) => {
          this.fhAliveHdfcFailure(error);
        }
    );
  }

  public fhAliveHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.fhAliveHdfcList = successData.ResponseObject;
    }
  }
  public fhAliveHdfcFailure(error) {
  }
getfrequencyPayHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.frequencyPayHdfc(data).subscribe(
        (successData) => {
          this.frequencyPayHdfcSuccess(successData);
        },
        (error) => {
          this.frequencyPayHdfcFailure(error);
        }
    );
  }

  public frequencyPayHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.frequencyPayHdfcList = successData.ResponseObject;
    }
  }
  public frequencyPayHdfcFailure(error) {
  }
getfundOptionHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.fundOptionHdfc(data).subscribe(
        (successData) => {
          this.fundOptionHdfcSuccess(successData);
        },
        (error) => {
          this.fundOptionHdfcFailure(error);
        }
    );
  }

  public fundOptionHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.fundOptionHdfcList = successData.ResponseObject;
    }
  }
  public fundOptionHdfcFailure(error) {
  }
getgenderListHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.genderListHdfc(data).subscribe(
        (successData) => {
          this.genderListHdfcSuccess(successData);
        },
        (error) => {
          this.genderListHdfcFailure(error);
        }
    );
  }

  public genderListHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.genderListHdfcList = successData.ResponseObject;
    }
  }
  public genderListHdfcFailure(error) {
  }

getmaritalListHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.maritalListHdfc(data).subscribe(
        (successData) => {
          this.maritalListHdfcSuccess(successData);
        },
        (error) => {
          this.maritalListHdfcFailure(error);
        }
    );
  }

  public maritalListHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.maritalListHdfcList = successData.ResponseObject;
    }
  }
  public maritalListHdfcFailure(error) {
  }

getheightListHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.heightListHdfc(data).subscribe(
        (successData) => {
          this.heightListHdfcSuccess(successData);
        },
        (error) => {
          this.heightListHdfcFailure(error);
        }
    );
  }

  public heightListHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.heightListHdfcList = successData.ResponseObject;
    }
  }
  public heightListHdfcFailure(error) {
  }
getimpairmentHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.impairmentHdfc(data).subscribe(
        (successData) => {
          this.impairmentHdfcSuccess(successData);
        },
        (error) => {
          this.impairmentHdfcFailure(error);
        }
    );
  }

  public impairmentHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.impairmentHdfcList = successData.ResponseObject;
    }
  }
  public impairmentHdfcFailure(error) {
  }
getimpairmentEver2Hdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.impairmentEver2Hdfc(data).subscribe(
        (successData) => {
          this.impairmentEver2HdfcSuccess(successData);
        },
        (error) => {
          this.impairmentEver2HdfcFailure(error);
        }
    );
  }

  public impairmentEver2HdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.impairmentEver2HdfcList = successData.ResponseObject;
    }
  }
  public impairmentEver2HdfcFailure(error) {
  }
getimpairmentEver3ListHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.impairmentEver3ListHdfc(data).subscribe(
        (successData) => {
          this.impairmentEver3ListHdfcSuccess(successData);
        },
        (error) => {
          this.impairmentEver3ListHdfcFailure(error);
        }
    );
  }

  public impairmentEver3ListHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.impairmentEver3ListHdfcList = successData.ResponseObject;
    }
  }
  public impairmentEver3ListHdfcFailure(error) {
  }
getimpairmentEver4ListHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.impairmentEver4ListHdfc(data).subscribe(
        (successData) => {
          this.impairmentEver4ListHdfcSuccess(successData);
        },
        (error) => {
          this.impairmentEver4ListHdfcFailure(error);
        }
    );
  }

  public impairmentEver4ListHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.impairmentEver4ListHdfcList = successData.ResponseObject;
    }
  }
  public impairmentEver4ListHdfcFailure(error) {
  }
getincomeDocTypeHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.incomeDocTypeHdfc(data).subscribe(
        (successData) => {
          this.incomeDocTypeHdfcSuccess(successData);
        },
        (error) => {
          this.incomeDocTypeHdfcFailure(error);
        }
    );
  }

  public incomeDocTypeHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.incomeDocTypeHdfcList = successData.ResponseObject;
    }
  }
  public incomeDocTypeHdfcFailure(error) {
  }
getindustryTypeHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.industryTypeHdfc(data).subscribe(
        (successData) => {
          this.industryTypeHdfcSuccess(successData);
        },
        (error) => {
          this.industryTypeHdfcFailure(error);
        }
    );
  }

  public industryTypeHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.industryTypeHdfcList = successData.ResponseObject;
    }
  }
  public industryTypeHdfcFailure(error) {
  }
getinsuranceTypeHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.insuranceTypeHdfc(data).subscribe(
        (successData) => {
          this.insuranceTypeHdfcSuccess(successData);
        },
        (error) => {
          this.insuranceTypeHdfcFailure(error);
        }
    );
  }

  public insuranceTypeHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.insuranceTypeHdfcList = successData.ResponseObject;
    }
  }
  public insuranceTypeHdfcFailure(error) {
  }
getinsObjLstHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.insObjLstHdfc(data).subscribe(
        (successData) => {
          this.insObjLstHdfcSuccess(successData);
        },
        (error) => {
          this.insObjLstHdfcFailure(error);
        }
    );
  }

  public insObjLstHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.insObjLstHdfcList = successData.ResponseObject;
    }
  }
  public insObjLstHdfcFailure(error) {
  }
getnationalityListHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.nationalityListHdfc(data).subscribe(
        (successData) => {
          this.nationalityListHdfcSuccess(successData);
        },
        (error) => {
          this.nationalityListHdfcFailure(error);
        }
    );
  }

  public nationalityListHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.nationalityListHdfcList = successData.ResponseObject;
    }
  }
  public nationalityListHdfcFailure(error) {
  }
getnatureOfWorkHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.natureOfWorkHdfc(data).subscribe(
        (successData) => {
          this.natureOfWorkHdfcSuccess(successData);
        },
        (error) => {
          this.natureOfWorkHdfcFailure(error);
        }
    );
  }

  public natureOfWorkHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.natureOfWorkHdfcList = successData.ResponseObject;
    }
  }
  public natureOfWorkHdfcFailure(error) {
  }
getnomineeLifeassuredListHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.nomineeLifeassuredListHdfc(data).subscribe(
        (successData) => {
          this.nomineeLifeassuredListHdfcSuccess(successData);
        },
        (error) => {
          this.nomineeLifeassuredListHdfcFailure(error);
        }
    );
  }

  public nomineeLifeassuredListHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.nomineeLifeassuredListHdfcList = successData.ResponseObject;
    }
  }
  public nomineeLifeassuredListHdfcFailure(error) {
  }
getoccupationListHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.occupationListHdfc(data).subscribe(
        (successData) => {
          this.occupationListHdfcSuccess(successData);
        },
        (error) => {
          this.occupationListHdfcFailure(error);
        }
    );
  }

  public occupationListHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.occupationListHdfcList = successData.ResponseObject;
    }
  }
  public occupationListHdfcFailure(error) {
  }
getoccupationTypeHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.occupationTypeHdfc(data).subscribe(
        (successData) => {
          this.occupationTypeHdfcSuccess(successData);
        },
        (error) => {
          this.occupationTypeHdfcFailure(error);
        }
    );
  }

  public occupationTypeHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.occupationTypeHdfcList = successData.ResponseObject;
    }
  }
  public occupationTypeHdfcFailure(error) {
  }
getoccupationHighRiskHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.occupationHighRiskHdfc(data).subscribe(
        (successData) => {
          this.occupationHighRiskHdfcSuccess(successData);
        },
        (error) => {
          this.occupationHighRiskHdfcFailure(error);
        }
    );
  }

  public occupationHighRiskHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.occupationHighRiskHdfcList = successData.ResponseObject;
    }
  }
  public occupationHighRiskHdfcFailure(error) {
  }
getmagnumRelationHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.magnumRelationHdfc(data).subscribe(
        (successData) => {
          this.magnumRelationHdfcSuccess(successData);
        },
        (error) => {
          this.magnumRelationHdfcFailure(error);
        }
    );
  }

  public magnumRelationHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.magnumRelationHdfcList = successData.ResponseObject;
    }
  }
  public magnumRelationHdfcFailure(error) {
  }
getmedicalExamLocationHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.medicalExamLocationHdfc(data).subscribe(
        (successData) => {
          this.medicalExamLocationHdfcSuccess(successData);
        },
        (error) => {
          this.medicalExamLocationHdfcFailure(error);
        }
    );
  }

  public medicalExamLocationHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.medicalExamLocationHdfcList = successData.ResponseObject;
    }
  }
  public medicalExamLocationHdfcFailure(error) {
  }
getmodeOfPaymentHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.modeOfPaymentHdfc(data).subscribe(
        (successData) => {
          this.modeOfPaymentHdfcSuccess(successData);
        },
        (error) => {
          this.modeOfPaymentHdfcFailure(error);
        }
    );
  }

  public modeOfPaymentHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.modeOfPaymentHdfcList = successData.ResponseObject;
    }
  }
  public modeOfPaymentHdfcFailure(error) {
  }
getpartTypeListHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.partTypeListHdfc(data).subscribe(
        (successData) => {
          this.partTypeListHdfcSuccess(successData);
        },
        (error) => {
          this.partTypeListHdfcFailure(error);
        }
    );
  }

  public partTypeListHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.partTypeListHdfcList = successData.ResponseObject;
    }
  }
  public partTypeListHdfcFailure(error) {
  }
getpayerwithLifeHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.payerwithLifeHdfc(data).subscribe(
        (successData) => {
          this.payerwithLifeHdfcSuccess(successData);
        },
        (error) => {
          this.payerwithLifeHdfcFailure(error);
        }
    );
  }

  public payerwithLifeHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.payerwithLifeHdfcList = successData.ResponseObject;
    }
  }
  public payerwithLifeHdfcFailure(error) {
  }
getprefferedLangHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.prefferedLangHdfc(data).subscribe(
        (successData) => {
          this.prefferedLangHdfcSuccess(successData);
        },
        (error) => {
          this.prefferedLangHdfcFailure(error);
        }
    );
  }

  public prefferedLangHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.prefferedLangHdfcList = successData.ResponseObject;
    }
  }
  public prefferedLangHdfcFailure(error) {
  }
getpreviousInsurerHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.previousInsurerHdfc(data).subscribe(
        (successData) => {
          this.previousInsurerHdfcSuccess(successData);
        },
        (error) => {
          this.previousInsurerHdfcFailure(error);
        }
    );
  }

  public previousInsurerHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.previousInsurerHdfcList = successData.ResponseObject;
    }
  }
  public previousInsurerHdfcFailure(error) {
  }
getproductionCategoryHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.productionCategoryHdfc(data).subscribe(
        (successData) => {
          this.productionCategoryHdfcSuccess(successData);
        },
        (error) => {
          this.productionCategoryHdfcFailure(error);
        }
    );
  }

  public productionCategoryHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.productionCategoryHdfcList = successData.ResponseObject;
    }
  }
  public productionCategoryHdfcFailure(error) {
  }

getproposerWithLifeAssureHdfc()
{
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.proposerWithLifeAssureHdfc(data).subscribe(
        (successData) => {
          this.proposerWithLifeAssureHdfcSuccess(successData);
        },
        (error) => {
          this.proposerWithLifeAssureHdfcFailure(error);
        }
    );
  }

  public proposerWithLifeAssureHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.proposerWithLifeAssureHdfcList = successData.ResponseObject;
    }
  }
  public proposerWithLifeAssureHdfcFailure(error) {
  }

  getquestionTypeHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.questionTypeHdfc(data).subscribe(
        (successData) => {
          this.questionTypeHdfcSuccess(successData);
        },
        (error) => {
          this.questionTypeHdfcFailure(error);
        }
    );
  }

  public questionTypeHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.questionTypeHdfcList = successData.ResponseObject;
    }
  }
  public questionTypeHdfcFailure(error) {
  }

getrelWithHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.relWithHdfc(data).subscribe(
        (successData) => {
          this.relWithHdfcSuccess(successData);
        },
        (error) => {
          this.relWithHdfcFailure(error);
        }
    );
  }

  public relWithHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.relWithHdfcList = successData.ResponseObject;
    }
  }
  public relWithHdfcFailure(error) {
  }
gethdfcSecuritiesHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.hdfcSecuritiesHdfc(data).subscribe(
        (successData) => {
          this.hdfcSecuritiesHdfcSuccess(successData);
        },
        (error) => {
          this.hdfcSecuritiesHdfcFailure(error);
        }
    );
  }

  public hdfcSecuritiesHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.hdfcSecuritiesHdfcList = successData.ResponseObject;
    }
  }
  public hdfcSecuritiesHdfcFailure(error) {
  }
getresidentialStatusHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.residentialStatusHdfc(data).subscribe(
        (successData) => {
          this.residentialStatusHdfcSuccess(successData);
        },
        (error) => {
          this.residentialStatusHdfcFailure(error);
        }
    );
  }

  public residentialStatusHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.residentialStatusHdfcList = successData.ResponseObject;
    }
  }
  public residentialStatusHdfcFailure(error) {
  }
getriderHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.riderHdfc(data).subscribe(
        (successData) => {
          this.riderHdfcSuccess(successData);
        },
        (error) => {
          this.riderHdfcFailure(error);
        }
    );
  }

  public riderHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.riderHdfcList = successData.ResponseObject;
    }
  }
  public riderHdfcFailure(error) {
  }
getsimultaneousHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.simultaneousHdfc(data).subscribe(
        (successData) => {
          this.simultaneousHdfcSuccess(successData);
        },
        (error) => {
          this.simultaneousHdfcFailure(error);
        }
    );
  }

  public simultaneousHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.simultaneousHdfcList = successData.ResponseObject;
    }
  }
  public simultaneousHdfcFailure(error) {
  }
getsourceOfFundHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.sourceOfFundHdfc(data).subscribe(
        (successData) => {
          this.sourceOfFundHdfcSuccess(successData);
        },
        (error) => {
          this.sourceOfFundHdfcFailure(error);
        }
    );
  }

  public sourceOfFundHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.sourceOfFundHdfcList = successData.ResponseObject;
    }
  }
  public sourceOfFundHdfcFailure(error) {
  }
getstateListHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.stateListHdfc(data).subscribe(
        (successData) => {
          this.stateListHdfcSuccess(successData);
        },
        (error) => {
          this.stateListHdfcFailure(error);
        }
    );
  }

  public stateListHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.stateListHdfcList = successData.ResponseObject;
    }
  }
  public stateListHdfcFailure(error) {
  }
gettitleListHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.titleListHdfc(data).subscribe(
        (successData) => {
          this.titleListHdfcSuccess(successData);
        },
        (error) => {
          this.titleListHdfcFailure(error);
        }
    );
  }

  public titleListHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.titleListHdfcList = successData.ResponseObject;
    }
  }
  public titleListHdfcFailure(error) {
  }
gettobbacoTypeHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.tobbacoTypeHdfc(data).subscribe(
        (successData) => {
          this.tobbacoTypeHdfcSuccess(successData);
        },
        (error) => {
          this.tobbacoTypeHdfcFailure(error);
        }
    );
  }

  public tobbacoTypeHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.tobbacoTypeHdfcList = successData.ResponseObject;
    }
  }
  public tobbacoTypeHdfcFailure(error) {
  }
gettypeOfContactListHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.typeOfContactListHdfc(data).subscribe(
        (successData) => {
          this.typeOfContactListHdfcSuccess(successData);
        },
        (error) => {
          this.typeOfContactListHdfcFailure(error);
        }
    );
  }

  public typeOfContactListHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.typeOfContactListHdfcList = successData.ResponseObject;
    }
  }
  public typeOfContactListHdfcFailure(error) {
  }
getunderwritingListHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.underwritingListHdfc(data).subscribe(
        (successData) => {
          this.underwritingListHdfcSuccess(successData);
        },
        (error) => {
          this.underwritingListHdfcFailure(error);
        }
    );
  }

  public underwritingListHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.underwritingListHdfcList = successData.ResponseObject;
    }
  }
  public underwritingListHdfcFailure(error) {
  }
getweightListHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.weightListHdfc(data).subscribe(
        (successData) => {
          this.weightListHdfcSuccess(successData);
        },
        (error) => {
          this.weightListHdfcFailure(error);
        }
    );
  }

  public weightListHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.weightListHdfcList = successData.ResponseObject;
    }
  }
  public weightListHdfcFailure(error) {
  }
  // sessionData() {
  //   if (sessionStorage.personalDetails != '' && sessionStorage.personalDetails != undefined) {
  //     this.getStepper1 = JSON.parse(sessionStorage.stepper1Details);
  //     this.proposer = this.fb.group({
  //
  //       title: this.getStepper1.title,
  //
  //
  //     });
  //
  //   }
  // }


  sessionData() {
    if (sessionStorage.stepper1Details != '' && sessionStorage.stepper1Details != undefined) {
      this.getStepper1 = JSON.parse(sessionStorage.stepper1Details);
      this.personal = this.fb.group({


        title: this.getStepper1.title,
        titleName: this.getStepper1.titleName,
        firstnm: this.getStepper1.firstnm,
        lastnm: this.getStepper1.lastnm,
        gender: this.getStepper1.gender,
        genderName: this.getStepper1.genderName,
        dob: this.datepipe.transform(this.getStepper1.dob, 'y-MM-dd'),
        fathernm: this.getStepper1.fathernm,
        maritalstatus: this.getStepper1.maritalstatus,
        maritalstatusName: this.getStepper1.maritalstatusName,
        eduqual: this.getStepper1.eduqual,
        eduqualName: this.getStepper1.eduqualName,
        nationality: this.getStepper1.nationality,
        nationalityName: this.getStepper1.nationalityName,
        residentstatus: this.getStepper1.residentstatus,
        residentstatusName: this.getStepper1.residentstatusName,
        ishdfcempflg: this.getStepper1.ishdfcempflg,
        exstngcustflg: this.getStepper1.exstngcustflg,
        isdisabledflg: this.getStepper1.isdisabledflg,
        dematflg: this.getStepper1.dematflg,
        smokerstatusflg: this.getStepper1.smokerstatusflg,
        historyofconviction: this.getStepper1.historyofconviction,
        houseno: this.getStepper1.houseno,
        street: this.getStepper1.street,
        landmark: this.getStepper1.landmark,
        city: this.getStepper1.city,
        state: this.getStepper1.state,
        stateName: this.getStepper1.stateName,
        cityName: this.getStepper1.cityName,
        countryName: this.getStepper1.countryName,
        pincode: this.getStepper1.pincode,
        country: this.getStepper1.country,
        chouseno: this.getStepper1.chouseno,
        cstreet: this.getStepper1.cstreet,
        clandmark: this.getStepper1.clandmark,
        ccity: this.getStepper1.ccity,
        cstate: this.getStepper1.cstate,
        cpincode: this.getStepper1.cpincode,
        ccountry: this.getStepper1.ccountry,
        ccityName: this.getStepper1.ccityName,
        cstateName: this.getStepper1.cstateName,
        ccountryName: this.getStepper1.ccountryName,
        // countrycode: this.getStepper1.countrycode,
        mobilenum: this.getStepper1.mobilenum,
        email: this.getStepper1.email,
        expdurofstay: this.getStepper1.expdurofstay,
        pepflg: this.getStepper1.pepflg,
        nriflg: this.getStepper1.nriflg,
        prfdcommaddr: this.getStepper1.prfdcommaddr,
        prfdcommmode: this.getStepper1.prfdcommmode,
        prfdcommlang: this.getStepper1.prfdcommlang,
        occutype: this.getStepper1.occutype,
        employernm: this.getStepper1.employernm,
        annualincm: this.getStepper1.annualincm,
        natureofoccu: this.getStepper1.natureofoccu,
        addrline: this.getStepper1.addrline,
        existulipflag: this.getStepper1.existulipflag,
        sourcetype: this.getStepper1.sourcetype,
        // fundpcntg: this.getStepper1.fundpcntg,
        fathernmtitle: this.getStepper1.fathernmtitle,
        fatherfirstnm: this.getStepper1.fatherfirstnm,
        fathermiddlenm: this.getStepper1.fathermiddlenm,
        fatherlastnm: this.getStepper1.fatherlastnm,
        mothernmtitle: this.getStepper1.mothernmtitle,
        motherfirstnm: this.getStepper1.motherfirstnm,
        mothermiddlenm: this.getStepper1.mothermiddlenm,
        motherlastnm: this.getStepper1.motherlastnm,
        mmaritalstatus: this.getStepper1.mmaritalstatus,
        spousenmtitle: this.getStepper1.spousenmtitle,
        spousefirstnm: this.getStepper1.spousefirstnm,
        spousemiddlenm: this.getStepper1.spousemiddlenm,
        spouselastnm: this.getStepper1.spouselastnm,
        occutypesp: this.getStepper1.occutypesp,
        catofoccupation: this.getStepper1.catofoccupation,
        countryofbirth: this.getStepper1.countryofbirth,
        isAddressSame: this.getStepper1.isAddressSame,
        birthplace: this.getStepper1.birthplace,


      });
      console.log( this.getStepper1, ' this.getStepper1')
      console.log( this.personal, ' this.personal')

    }





    if (sessionStorage.stepper3Details!= '' && sessionStorage.stepper3Details != undefined) {

      let getStepper3 = JSON.parse(sessionStorage.stepper3Details);
      // this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].afirstnm.patchValue(getStepper3.afirstnm);
      // this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].alastnm.patchValue(getStepper3.alastnm);
      // this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aDob.patchValue(this.datepipe.transform(getStepper3.aDob, 'y-MM-dd'));
      // this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].agender.patchValue(getStepper3.agender);
      // this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].ahouseno.patchValue(getStepper3.ahouseno);
      // this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].astreet.patchValue(getStepper3.astreet);
      // this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].alandmark.patchValue(getStepper3.alandmark);
      // this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].acity.patchValue(getStepper3.acity);
      // this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].astate.patchValue(getStepper3.astate);
      // this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].acountry.patchValue(getStepper3.acountry);
      // this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].astreet.patchValue(getStepper3.astreet);
      // this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].apincode.patchValue(getStepper3.apincode);
      // this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].showAppointee.patchValue(getStepper3.showAppointee);

      if (getStepper3.itemsNominee.length > 1) {
        this.addNominee(event);
      }
      console.log(getStepper3.itemsNominee[0].nomineeName, ' patchval ');
      console.log(this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].nomineeName, ' nnName ');
      console.log(getStepper3,'333333');
      console.log(getStepper3.itemsNominee.length,'length');
      for (let i = 0; i < getStepper3.itemsNominee.length; i++) {
        this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].ntitle.patchValue(getStepper3.itemsNominee[i].ntitle);
        this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nfirstnm.patchValue(getStepper3.itemsNominee[i].nfirstnm);
        this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nlastnm.patchValue(getStepper3.itemsNominee[i].nlastnm);
        this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nDob.patchValue(this.datepipe.transform(getStepper3.itemsNominee[i].nDob, 'y-MM-dd'));
        this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].ngender.patchValue(getStepper3.itemsNominee[i].ngender);
        this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nmaritalstatus.patchValue(getStepper3.itemsNominee[i].nmaritalstatus);
        // this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].entitlepctg.patchValue(getStepper3.itemsNominee[i].entitlepctg);
        this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nhouseno.patchValue(getStepper3.itemsNominee[i].nhouseno);
        this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nmobilenum.patchValue(getStepper3.itemsNominee[i].nmobilenum);
        this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nrelationship.patchValue(getStepper3.itemsNominee[i].nrelationship);
        this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nstreet.patchValue(getStepper3.itemsNominee[i].nstreet);
        this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nlandmark.patchValue(getStepper3.itemsNominee[i].nlandmark);
        this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].ncity.patchValue(getStepper3.itemsNominee[i].ncity);
        this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nstate.patchValue(getStepper3.itemsNominee[i].nstate);
        this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].ncountry.patchValue(getStepper3.itemsNominee[i].ncountryNmae);
       this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].ncityName.patchValue(getStepper3.itemsNominee[i].ncityName);
        this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nstateName.patchValue(getStepper3.itemsNominee[i].nstateName);
        this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].ncountryName.patchValue(getStepper3.itemsNominee[i].ncountry);
        this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].npincode.patchValue(getStepper3.itemsNominee[i].npincode);
        this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].atitle.patchValue(getStepper3.atitle);
        this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].afirstnm.patchValue(getStepper3.afirstnm);
        this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].alastnm.patchValue(getStepper3.alastnm);
        this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].aDob.patchValue(this.datepipe.transform(getStepper3.aDob, 'y-MM-dd'));
        this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].amaritalstatus.patchValue(getStepper3.amaritalstatus);
        this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].agender.patchValue(getStepper3.agender);
        this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].ahouseno.patchValue(getStepper3.ahouseno);
        this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].astreet.patchValue(getStepper3.astreet);
        this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].alandmark.patchValue(getStepper3.alandmark);
        this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].acity.patchValue(getStepper3.acity);
        this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].astate.patchValue(getStepper3.astate);
        this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].acountry.patchValue(getStepper3.acountry);
         this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].acityName.patchValue(getStepper3.acity);
        this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].astateName.patchValue(getStepper3.astate);
        this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].acountryName.patchValue(getStepper3.acountry);
        this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].arelationship.patchValue(getStepper3.arelationship);
        this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].astreet.patchValue(getStepper3.astreet);
        this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].apincode.patchValue(getStepper3.apincode);
        this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].showAppointee.patchValue(getStepper3.showAppointee);

      }
    }
    console.log(this.nomineeDetail, ' stepper3 ');
    console.log(this.getStepper3, ' getStepper3 ');




  }


  proposal(stepper) {
    let nomineeDetail = [];
    for (let i = 0; i < this.nomineeDetail.value.itemsNominee.length; i++) {
      nomineeDetail.push({

        "partyseqid": "NOMINEE_0",
        "partytype": "PRT_INDIV",
        "personalinfo": {
          "title": this.nomineeDetail.value.itemsNominee[i].ntitle,
          "firstnm": this.nomineeDetail.value.itemsNominee[i].nfirstnm,
          "lastnm": this.nomineeDetail.value.itemsNominee[i].nlastnm,
          "gender": this.nomineeDetail.value.itemsNominee[i].ngender,
          "dob": this.nomineeDetail.value.itemsNominee[i].nDob,
          "maritalstatus": this.nomineeDetail.value.itemsNominee[i].nmaritalstatus
        },
        "additionalinfo": {
          "entitlepctg": "100"
        },
        "addressinfo": {
          "addresstype": "ADD_PMNT",
          "addressdetails": {
            "houseno":this.nomineeDetail.value.itemsNominee[i].nhouseno,
            "street":this.nomineeDetail.value.itemsNominee[i].nstreet,
            "landmark": this.nomineeDetail.value.itemsNominee[i].nlandmark,
            "city": this.nomineeDetail.value.itemsNominee[i].ncity,
            "state": this.nomineeDetail.value.itemsNominee[i].nstate,
            "pincode": this.nomineeDetail.value.itemsNominee[i].npincode,
            "country": this.nomineeDetail.value.itemsNominee[i].ncountry
          }
        },
        "relationshipinfo": {
          "relatedparty": "LA_0",
          "relationship": this.nomineeDetail.value.itemsNominee[i].nrelationship
        },
        "contactdetails": {
          "contype": "CONT_MOBNO",
          "contactval":this.nomineeDetail.value.itemsNominee[i].nmobilenum
        }


      });
    }
    const data = {
      "user_id": this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      "role_id": this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      "pos_status": this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
      "term": this.lifePremiumList.termDetrails,
      "policy_id":this.getEnquiryDetials.policy_id,
      "appsubmission": {

          "applctndetails": {
        "basicappinfo": {
          "apptype": "APP_TYP_LIFE",
              "appmode": "APP_MODE_NON_ASST",
              "appsource": "OL",
              "instype": "INST_INDV",
              "insobjectv": "IOBJ_PROTN_CD",
              "payoutneftflg": "N",
              "appstatus": "APP005",
              "uwtype": "FULLUW",
              "proposalrecvdt": "24/03/2017",
              "chnlpartner": "Online"
        },
        "plandetails": {
          "basicplaninfo": {
            "prodcat": "PROT",
                "prodcd": "C2P3DPER",
                "planoption": "Life",
                "prodnm": "HDFC Life Click 2 Protect 3D Plus",
                "policyterm": "10",
                "ppt": "10",
                "paymntfreq": "FREQ_4",
                "sumassured": "5000000",
                "premiumamnt": "346",
                "paymntmethod": "MOP_ONLINE",
                "magnumbenefit": "Life"
          },
          // "riderdetails": [
          //   {
          //     "ridernm": "RIDER_EXTRA_LIFE",
          //     "ridersa": "20000000",
          //     "riderpremiumamnt": "9828",
          //     "riderterm": "35",
          //     "riderppt": "35"
          //   },
          //   {
          //     "ridernm": "RIDER_CRITICAL_ILLNESS",
          //     "ridersa": "1000000",
          //     "riderpremiumamnt": "3253",
          //     "riderterm": "33",
          //     "riderppt": "33"
          //   }
          // ]
        }
      },
      "lifeassured": {
        "partyseqid": "LA_0",
            "partytype": "PRT_INDIV",
            "personalinfo": {
              "title": this.personal.controls['title'].value,
              "firstnm": this.personal.controls['firstnm'].value,
              "lastnm": this.personal.controls['lastnm'].value,
              "gender": this.personal.controls['gender'].value,
              "dob": this.personal.controls['dob'].value,
              "fathernm": this.personal.controls['fathernm'].value,
              "maritalstatus": this.personal.controls['maritalstatus'].value,
              "eduqual": this.personal.controls['eduqual'].value,
              "nationality": this.personal.controls['nationality'].value,
              "residentstatus": this.personal.controls['residentstatus'].value,
              "birthplace": this.personal.controls['birthplace'].value,
              "nriflg": this.personal.controls['nriflg'].value
        },
        "additionalinfo": {
          "ishdfcempflg": this.personal.controls['ishdfcempflg'].value,
              "exstngcustflg": this.personal.controls['exstngcustflg'].value,
              "isdisabledflg": this.personal.controls['isdisabledflg'].value,
              "pepflg": this.personal.controls['pepflg'].value,
              "dematflg": this.personal.controls['dematflg'].value,
              "smokerstatusflg": this.personal.controls['smokerstatusflg'].value,
              "historyofconviction": this.personal.controls['historyofconviction'].value
        },
        "addressinfo": [{
          "addresstype": "ADD_PMNT",
          "addressdetails": {
            "houseno": this.personal.controls['houseno'].value,
            "street": this.personal.controls['street'].value,
            "landmark": this.personal.controls['landmark'].value,
            "city": this.personal.controls['city'].value,
            "state": this.personal.controls['state'].value,
            "pincode": this.personal.controls['pincode'].value,
            "country": this.personal.controls['country'].value
          }
        },
          {
            "addresstype": "ADD_CORSP",
            "addressdetails": {
              "houseno": this.personal.controls['chouseno'].value,
              "street": this.personal.controls['cstreet'].value,
              "landmark": this.personal.controls['clandmark'].value,
              "city": this.personal.controls['ccity'].value,
              "state": this.personal.controls['cstate'].value,
              "pincode": this.personal.controls['cpincode'].value,
              "country": this.personal.controls['ccountry'].value
            }
          }
        ],
            "contactdetails": [{
          "contype": "CONT_MOBNO",
          "countrycode": "91",
          "contactval": this.personal.controls['mobilenum'].value
        },
          {
            "contype": "CONT_EMAIL",
            "contactval": this.personal.controls['email'].value
          }
        ],
            "commpreference": {
          "expdurofstay": this.personal.controls['expdurofstay'].value,
              "prfdcommaddr": this.personal.controls['prfdcommaddr'].value,
              "prfdcommmode": this.personal.controls['prfdcommmode'].value,
              "prfdcommlang":this.personal.controls['prfdcommlang'].value
        },
        "employmentdetails": {
          "occutype": this.personal.controls['occutype'].value,
              "employernm": this.personal.controls['employernm'].value,
              "annualincm": this.personal.controls['annualincm'].value,
              "natureofoccu": this.personal.controls['natureofoccu'].value,
              "employeraddr": {
            "addrline": this.personal.controls['addrline'].value
          }
        },
        "existingulip": {
          "existulipflag": this.personal.controls['existulipflag'].value
        },
        "fundsource": {
          "sourcetype": this.personal.controls['sourcetype'].value,
              "fundpcntg": "100"
        }
      },
      "nominee": nomineeDetail,

        "appointee": {
          "partyseqid": "APPOINTEE_0",
          "partytype": "PRT_INDIV",
          "personalinfo": {
            "title": this.nomineeDetail.value.itemsNominee[0].atitle,
            "firstnm": this.nomineeDetail.value.itemsNominee[0].afirstnm,
            "lastnm": this.nomineeDetail.value.itemsNominee[0].alastnm,
            "gender":this.nomineeDetail.value.itemsNominee[0].agender,
            "dob": this.nomineeDetail.value.itemsNominee[0].aDob,
            "maritalstatus": this.nomineeDetail.value.itemsNominee[0].amaritalstatus
          },
          "addressinfo": {
            "addresstype": "ADD_PMNT",
            "addressdetails": {
              "houseno": this.nomineeDetail.value.itemsNominee[0].ahouseno,
              "street": this.nomineeDetail.value.itemsNominee[0].astreet,
              "landmark": this.nomineeDetail.value.itemsNominee[0].alandmark,
              "city": this.nomineeDetail.value.itemsNominee[0].acity,
              "state": this.nomineeDetail.value.itemsNominee[0].astate,
              "pincode":this.nomineeDetail.value.itemsNominee[0].apincode,
              "country":this.nomineeDetail.value.itemsNominee[0].acountry
            }
          },
          "relationshipinfo": {
            "relatedparty": "NOMINEE_1",
            "relationship":this.nomineeDetail.value.itemsNominee[0].arelationship
          }
        },


      "proposer": {
        "partysameas": "LA_0"
      },
      "payor": {
        "partysameas": "LA_0"
      }
    },
      "ckyc": {
      "ckycno": "",
          "fathernmtitle": this.personal.controls['fathernmtitle'].value,
          "fatherfirstnm": this.personal.controls['fatherfirstnm'].value,
          "fathermiddlenm":this.personal.controls['fathermiddlenm'].value,
          "fatherlastnm": this.personal.controls['fatherlastnm'].value,
          "mothernmtitle": this.personal.controls['mothernmtitle'].value,
          "motherfirstnm": this.personal.controls['motherfirstnm'].value,
          "mothermiddlenm": this.personal.controls['mothermiddlenm'].value,
          "motherlastnm": this.personal.controls['motherlastnm'].value,
          "maritalstatus": this.personal.controls['mmaritalstatus'].value,
          "cersaipostedflag": [
        "",
        "N"
      ],
          "spousenmtitle":this.personal.controls['spousenmtitle'].value,
          "spousefirstnm": this.personal.controls['spousefirstnm'].value,
          "spousemiddlenm": this.personal.controls['spousemiddlenm'].value,
          "spouselastnm": this.personal.controls['spouselastnm'].value,
          "occutype": this.personal.controls['occutypesp'].value,
          "catofoccupation": this.personal.controls['catofoccupation'].value,
          "countryofbirth": this.personal.controls['countryofbirth'].value
    }
    };

  this.settings.loadingSpinner = true;
  this.TermLifeService.getProposalhdfc(data).subscribe(
(successData) => {
  this.setProposalSuccess(successData, stepper);
},
(error) => {
  this.setProposalFailure(error);
}
);

}
public setProposalSuccess(successData, stepper) {
  this.settings.loadingSpinner = false;
  if (successData.IsSuccess == true) {
    stepper.next();
    this.topScroll();
    this.toastr.success('BI Generated Sucessfully!!');
    this.summaryData = successData.ResponseObject;
    // this.requestedUrl = this.summaryData.bilink;
    this.redirectUrl = this.summaryData.redirectLink;
    sessionStorage.summaryData = JSON.stringify(this.summaryData);
    this.proposalId = this.summaryData.ProposalId;
    this.proposerFormData = this.personal.value;
    this.nomineeFormData = this.nomineeDetail.value;
    console.log(this.proposerFormData, 'this.proposerFormData');
    console.log(this.nomineeFormData, 'nomineeFormData');
    console.log(this.nomineeDetail.value, 'this.nomineeDetail.value');
    sessionStorage.proposerFormData = JSON.stringify(this.proposerFormData);
    sessionStorage.nomineeFormData = JSON.stringify(this.nomineeFormData);
    // sessionStorage.hdfc_proposal_id = this.proposalId;


  } else {
    this.toastr.error(successData.ErrorObject);
  }
}
public setProposalFailure(error) {
}


}
