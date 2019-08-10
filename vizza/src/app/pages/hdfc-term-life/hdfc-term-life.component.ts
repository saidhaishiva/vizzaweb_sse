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
  public dateError1: any;
  public incomeError: any;
  public webhost: any;
  public today: any;
  public summaryData: any;
  public appTypeHdfcList: any;
  public addressHdfcList: any;
  public alcoholHdfcList: any;
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
  public appModeHdfcList: any;
  public enquiryFormData: any;
  public lifePremiumList: any;
  public premiumList: any;
  public getEnquiryDetials: any;
  public enquiryFromDetials: any;
  public allProductLists: any;

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

  public keyUp = new Subject<string>();


  constructor(public validation: ValidationService, public authservice: AuthService, public fb: FormBuilder, public route: ActivatedRoute, public TermLifeService: TermLifeCommonService, public datepipe: DatePipe, private toastr: ToastrService, public appSettings: AppSettings, public config: ConfigurationService) {
    let stepperindex = 0;
    this.requestedUrl = '';
    this.redirectUrl = '';
    const minDate = new Date();
    this.minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
    this.route.params.forEach((params) => {
      if (params.stepper == true || params.stepper == 'true') {
        stepperindex = 2;
        if (sessionStorage.summaryData != '' && sessionStorage.summaryData != undefined) {
          this.summaryData = JSON.parse(sessionStorage.summaryData);
          this.redirectUrl = this.summaryData.redirectLink;
          this.requestedUrl = this.summaryData.bilink;
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
      firstnm: ['', Validators.required],
      lastnm: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      fathernm: ['', Validators.required],
      email: ['', Validators.required],
      maritalstatus: ['', Validators.required],
      eduqual: ['', Validators.required],
      nationality: ['', Validators.required],
      residentstatus: ['', Validators.required],
      ishdfcempflg: ['', Validators.required],
      exstngcustflg: ['', Validators.required],
      isdisabledflg: ['', Validators.required],
      pepflg: ['', Validators.required],
      dematflg: ['', Validators.required],
      smokerstatusflg: ['', Validators.required],
      historyofconviction: ['', Validators.required],
      houseno: ['', Validators.required],
      street: ['', Validators.required],
      landmark: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', Validators.required],
      country: ['', Validators.required],
      isAddressSame: ['', Validators.required],
      chouseno: ['', Validators.required],
      cstreet: ['', Validators.required],
      clandmark: ['', Validators.required],
      ccity: ['', Validators.required],
      cstate: ['', Validators.required],
      cpincode: ['', Validators.required],
      ccountry: ['', Validators.required],
      countrycode: ['', Validators.required],
      mobilenum: ['', Validators.required],
      expdurofstay: ['', Validators.required],
      prfdcommaddr: ['', Validators.required],
      prfdcommmode: ['', Validators.required],
      prfdcommlang: ['', Validators.required],
      occutype: ['', Validators.required],
      employernm: ['', Validators.required],
      annualincm: ['', Validators.required],
      natureofoccu: ['', Validators.required],
      addrline: ['', Validators.required],
      existulipflag: ['', Validators.required],
      sourcetype: ['', Validators.required],
      fundpcntg: ['', Validators.required],
      fathernmtitle: ['', Validators.required],
      fatherfirstnm: ['', Validators.required],
      fathermiddlenm: ['', Validators.required],
      fatherlastnm: ['', Validators.required],
      mothernmtitle: ['', Validators.required],
      motherfirstnm: ['', Validators.required],
      mothermiddlenm: ['', Validators.required],
      motherlastnm: ['', Validators.required],
      mmaritalstatus: ['', Validators.required],
      spousenmtitle: ['', Validators.required],
      spousefirstnm: ['', Validators.required],
      spousemiddlenm: ['', Validators.required],
      spouselastnm: ['', Validators.required],
      occutypesp: ['', Validators.required],
      catofoccupation: ['', Validators.required],
      countryofbirth: ['', Validators.required],

    });

    this.nomineeDetail = this.fb.group({
      'itemsNominee' : this.fb.array([
        this.initItemRows()
      ])
    });
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
  }
  initItemRows() {

    return this.fb.group(
        {
          rolecd: 'PRIMARY',
          ntitle: ['', Validators.required],
          nfirstnm: ['', Validators.required],
          nlastnm: ['', Validators.required],
          ngender: ['', Validators.required],
          nmaritalstatus: ['', Validators.required],
          entitlepctg: ['', Validators.required],
          nrelationship: ['', Validators.required],
          nmobilenum: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
          nhouseno: ['', Validators.required],
          nstreet: ['', Validators.required],
          nlandmark: ['', Validators.required],
          ncity: ['', Validators.required],
          nstate: ['', Validators.required],
          npincode: ['', Validators.required],
          ncountry: ['', Validators.required],
          nDob: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
          afirstnm: ['', Validators.required],
          alastnm: ['', Validators.required],
          agender: ['', Validators.required],
          aDob: ['', Validators.required],
          ahouseno: ['', Validators.required],
          astreet: ['', Validators.required],
          alandmark: ['', Validators.required],
          acity: ['', Validators.required],
          astate: ['', Validators.required],
          acountry: ['', Validators.required],
          apincode: ['', Validators.required],


        }
    );
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
          console.log(this.nomineeAge, ' this.nomineeAg');

        }

      } else if (typeof event.value._i == 'object') {
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (dob.length == 10) {
          this.nomineeAge = this.ageCalculate(dob);
          console.log(this.nomineeAge, 'age')

        }
        this.dateError1 = '';
      }
      sessionStorage.nomineeAge = this.nomineeAge;

    }
  }

  addDatepropo(event) {
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
          console.log(this.nomineeAge, ' this.nomineeAg');

        }

      } else if (typeof event.value._i == 'object') {
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (dob.length == 10) {
          this.nomineeAge = this.ageCalculate(dob);
          console.log(this.nomineeAge, 'age')

        }
        this.dateError1 = '';
      }
      sessionStorage.nomineeAge = this.nomineeAge;

    }
  }

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
    // this.personalData = value;
    console.log(value, 'eeeeeeeeeee');
    sessionStorage.stepper1 = '';
    sessionStorage.stepper1 = JSON.stringify(value);
    // console.log(this.personal.valid, 'checked');
    stepper.next();
    this.topScroll();

    // if(this.personal.valid) {
    //   if(sessionStorage.proposerAge >= 18){
    //   } else {
    //     this.toastr.error('Proposer age should be 18 or above');
    //
    //   }
    // }

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

    let appointeeAge2 = false;
    if (sessionStorage.appointeeAge2 != '' && sessionStorage.appointeeAge2 != undefined ) {
      if ( sessionStorage.appointeeAge2 >=18 ) {
        appointeeAge2 = true;
      }
    }
    console.log(sessionStorage.appointeeAge,'appointeeAge11222');
    console.log(sessionStorage.appointeeAge2,'appointeeAge2233');

    // nominee 2 age validation
    let nominee2ageval;
    for (let i=0; i < this.nomineeDetail.get('itemsNominee')['controls'].length; i++) {
      if ( this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nomineeAgeVal.value == 1) {
        nominee2ageval = false;

      } else {
        nominee2ageval = true;
      }
    }
    // console.log(sessionStorage.appointeeAge,' appointeeAge11232 ');
    //
    // console.log(nominee2ageval, 'nominee2ageval');
    // console.log(nomineeValid, 'nomineeVLID');
    // console.log(this.nomineeDetail.controls.itemsNominee.valid, 'this.nomineeDetail.controls');
    // console.log(this.nomineeDetails.valid,'this.nomineeDetails.valid')
    if (this.nomineeDetail.controls.itemsNominee.valid) {
      if (!nomineeValid || !nominee2ageval) {
        // console.log(!nomineeValid,'111nomineeValid');
        // console.log(nomineeValid,'2222nomineeValid');
        // console.log(!nominee2ageval,'nominee2ageval111');
        // console.log(nominee2ageval,'nominee2ageval33333333');

        if (appointeeAge ) {
          // console.log(appointeeAge,'appointeeAgeentry')
          if (appointeeAge2 || sessionStorage.appointeeAge2 == undefined ) {
            // console.log(appointeeAge2,'aappointeeAge2eentry')
            stepper.next();
            this.topScroll();
            // console.log(appointeeAge2,'falseApp');
          }
          else {
            this.toastr.error('Appointee2 Age should be greater than 18.');
            // console.log('1111');
          }
        } else {
          this.toastr.error('Appointee Age should be greater than 18.');
          // console.log('2222');
        }
      } else {
        stepper.next();
        this.topScroll();
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



  appointeeAgeValid(event: any, i) {
    if (this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].showAppointee.value == true ) {
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].afirstnm.patchValue(this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].afirstnm.value );
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].alastnm.patchValue(this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].alastnm.value );
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].agender.patchValue(this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].agender.value );
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aDob.patchValue(this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aDob.value );
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].ahouseno.patchValue(this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].ahouseno.value );
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].astreet.patchValue(this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].astreet.value );
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].alandmark.patchValue(this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].alandmark.value );
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].acity.patchValue(this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].acity.value );
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].astate.patchValue(this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].astate.value );
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].acountry.patchValue(this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].acountry.value );
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].apincode.patchValue(this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].apincode.value );




      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].afirstnm.setValidators([Validators.required]);
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].alastnm.setValidators([Validators.required]);
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].agender.setValidators([Validators.required]);
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aDob.setValidators([Validators.required]);
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].ahouseno.setValidators([Validators.required]);
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].astreet.setValidators([Validators.required]);
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].alandmark.setValidators([Validators.required]);
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].acity.setValidators([Validators.required]);
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].astate.setValidators([Validators.required]);
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].acountry.setValidators([Validators.required]);
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].apincode.setValidators([Validators.required]);

    } else {
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].afirstnm.patchValue(' ');
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].alastnm.patchValue(' ');
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].agender.patchValue(' ');
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aDob.patchValue(' ');
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].ahouseno.patchValue(' ');
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].astreet.patchValue(' ');
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].alandmark.patchValue(' ');
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].acity.patchValue(' ');
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].astate.patchValue(' ');
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].acountry.patchValue(' ');
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].apincode.patchValue(' ');


      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].afirstnm.setValidators('');
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].alastnm.setValidators('');
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].agender.setValidators('');
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aDob.setValidators('');
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].ahouseno.setValidators('');
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].astreet.setValidators('');
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].alandmark.setValidators('');
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].acity.setValidators('');
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].astate.setValidators('');
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].acountry.setValidators('');
      this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].apincode.setValidators('');


    }
    this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].afirstnm.updateValueAndValidity();
    this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].alastnm.updateValueAndValidity();
    this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].agender.updateValueAndValidity();
    this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aDob.updateValueAndValidity();
    this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].ahouseno.updateValueAndValidity();
    this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].alandmark.updateValueAndValidity();
    this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].acity.updateValueAndValidity();
    this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].astate.updateValueAndValidity();
    this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].acountry.updateValueAndValidity();
    this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].apincode.updateValueAndValidity();


  }


}
