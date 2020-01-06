import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Settings} from '../../app.settings.model';
import {BikeInsuranceService} from '../../shared/services/bike-insurance.service';
import {DatePipe} from '@angular/common';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {ValidationService} from '../../shared/services/validation.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {AppSettings} from '../../app.settings';
import {CommonService} from '../../shared/services/common.service';
import {EnquiryPopupComponent} from '../bike-insurance/enquiry-popup/enquiry-popup.component';
import {FourWheelerService} from '../../shared/services/four-wheeler.service';
import {FourWheelerEnquirypopupComponent} from './four-wheeler-enquirypopup/four-wheeler-enquirypopup.component';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {ClearSessionMotorService} from '../../shared/services/clear-session-motor.service';
import {MetaService} from '../../shared/services/meta.service';
import {Meta, Title} from '@angular/platform-browser';
import { WINDOW } from '@ng-toolkit/universal';
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

declare const global: any;
// tslint:disable-next-line:variable-name
const MouseEvent = (global as any).MouseEvent as MouseEvent;

@Component({
  selector: 'app-four-wheeler-home',
  templateUrl: './four-wheeler-home.component.html',
  styleUrls: ['./four-wheeler-home.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class FourWheelerHomeComponent implements OnInit {
  public fourWheeler: FormGroup;
  public settings: Settings;
  public dobError: any;
  public bikeList: any;
  public claimDetails: any;
  public enquiry: any;
  public QuotationList: any;
  public registrationDate: any;
  public previousClaim: any;
  public previousPolicyExpiry: any;
  public previousPolicyStart: any;
  public bussinessList: any;
  public bussiness: any;
  public engine: any;
  public bikeEnquiryId: any;
  public dobStartError: any;
  public dobendError: any;
  public minDate: any;
  public currentTab: any;
  public typeList: any;
  public companyList: any;
  public productDetails: any;
  public cityDetails: any;
  public webhost: any;
  public listDetails: boolean;
  public expiry: boolean;
  public previousDate: boolean;
  public showSelf: boolean;
  public metaCar: any;
  public metaTitle: any;
  public getRtoDetails: any;
  metaKeyword: any;
  metaDescription: any;
  public config: any;
  public regionDetails: any;
  public vehicleRegNumber: any;
  public companyNameList: any;
  public CityValid: any;
  public CompanyValid: any;
  public previousStartError: any;
  public ClaimValid: any;
  public previousCompanyValid: boolean;
  public registrationStartError: any;
  public lesserDate: any;

  constructor(@Inject(WINDOW) private window: Window, public fb: FormBuilder, public fwService: FourWheelerService, public datePipe: DatePipe, public configs: ConfigurationService, public validation: ValidationService, public datepipe: DatePipe, public route: ActivatedRoute, public auth: AuthService, public toastr: ToastrService, public dialog: MatDialog, public appSettings: AppSettings, public router: Router, public commonservices: CommonService, public toast: ToastrService, public meta: MetaService, public metaTag: Meta, private titleService: Title) {
    this.settings = this.appSettings.settings;
    this.webhost = this.configs.getimgUrl();
    if (window.innerWidth < 787) {
      this.settings.HomeSidenavUserBlock = false;
      this.settings.sidenavIsOpened = false;
      this.settings.sidenavIsPinned = false;
    } else {
      this.settings.HomeSidenavUserBlock = true;
      this.settings.sidenavIsOpened = true;
      this.settings.sidenavIsPinned = true;
    }
    const minDate = new Date();
    this.minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
    const lateDate=minDate.getFullYear()-1;
    this.lesserDate = new Date(lateDate, minDate.getMonth(), minDate.getDate());
    this.listDetails = false;
    this.config = {
      displayKey: "city", //if objects array passed which key to be displayed defaults to description
      search: true,
      limitTo: 5,
      // searchOnKey: 'city'
    };
    this.CityValid = false;
    this.config = {
      displayKey: "previousCompany", //if objects array passed which key to be displayed defaults to description
      search: true,
      limitTo: 5
    };
    this.previousCompanyValid = false;
    this.CityValid = false;
    this.CompanyValid = false;
    this.ClaimValid = false;


    this.dobError = false;
    this.previousStartError = false;

    this.fourWheeler = this.fb.group({
      'companyNameNew': '',
      'companyNameRenewel': '',
      'vehicalNumber': '',
      'registrationDate': '',
      'registrationDateNew': '',
      'previousClaim': '',
      'enquiry': '',
      'ncb': '',
      'previousPolicyExpiry': '',
      'previousPolicyStart': '',
      'previousCompany': '',
      'city': ''
    });

    this.expiry = false;
    this.showSelf = false;
    this.previousDate = true;
    this.fourWheeler.controls['previousCompany'].patchValue(null);
    this.fourWheeler.controls['city'].patchValue(null);
    this.typeList = 'new';
    if (this.typeList == 'new') {
      this.getType(0);
    } else {
      this.getType(1);
    }
  }

  ngOnInit() {
    this.fourWheeler.controls['previousCompany'].patchValue(null);
    this.fourWheeler.controls['city'].patchValue(null);
    this.fourWheeler.controls['previousClaim'].patchValue(null);
    this.claimpercent();
    this.getpreviousCompany();
    this.getCityLists();
    this.metaList();
    this.changeCompanyName();
    this.sessionData();
  }
  getRegionLists() {

    const data = {
      'platform': 'web',
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
      'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
      'region_code':this.vehicleRegNumber,

    }
    console.log(this.vehicleRegNumber,'this.vehicleRegNumber....')
    this.fwService.getRegionList(data).subscribe(
        (successData) => {
          this.regionSuccess(successData);
        },
        (error) => {
          this.regionFailure(error);
        }
    );
  }
  public regionSuccess(successData){
    if (successData.IsSuccess) {
      this.regionDetails = successData.ResponseObject;
      console.log(this.regionDetails,'regionDetails......');
      //
    }
  }
  public regionFailure(error) {
  }
  registrationStart(event:any){
    if(this.lesserDate > this.fourWheeler.controls['registrationDate'].value ){
      this.registrationStartError=false;
      this.registrationStartError='';
    }else{
      this.registrationStartError=true;
      this.registrationStartError='Registration Date should be lesser than Current Date';
    }
  }

  previousStart(event:any){
    if(this.fourWheeler.controls['previousPolicyStart'].value > this.fourWheeler.controls['registrationDate'].value ){
      this.previousStartError=false;
      this.previousStartError='';
    }else{
      this.previousStartError=true;
      this.previousStartError='previous policy start Date should be greater than register Date';
    }
  }

  changeCompanyName() {
    const data = {
      'platform': 'web',
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',

    }
    console.log(this.vehicleRegNumber,'this.vehicleRegNumber....')
    this.fwService.getCompanyName(data).subscribe(
        (successData) => {
          this.CompanyNameNewSuccess(successData);
        },
        (error) => {
          this.CompanyNameNewFailure(error);
        }
    );
  }
  public CompanyNameNewSuccess(successData){
    if (successData.IsSuccess) {
      this.companyNameList = successData.ResponseObject;
      console.log(this.companyNameList,'companyNameList......');
      //
    }
  }
  public CompanyNameNewFailure(error) {
  }

  public metaList() {
    const data = {
      'platform': 'web',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
      'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      'component_name': 'Motor Car'
    };
    this.meta.metaDetail(data).subscribe(
        (successData) => {
          this.metaDetailSuccess(successData);
        },
        (error) => {
          this.metaDetailFailure(error);
        }
    );
  }
  public metaDetailSuccess(successData) {
    this.metaCar = successData.ResponseObject[0];
    this.metaTitle = this.metaCar.title;
    this.metaKeyword = this.metaCar.keyword;
    this.metaDescription = this.metaCar.descrition;
    this.metaTag.addTags([
      {name: 'keywords', content: this.metaKeyword},
      {name: 'description', content: this.metaDescription},
    ]);
    this.setTitle();
  }
  public metaDetailFailure(error) {
    console.log(error);
  }
  public setTitle() {
    this.titleService.setTitle( this.metaTitle );
  }

  setSession() {
    sessionStorage.enquiryFormDatafw = JSON.stringify(this.fourWheeler.value);
    // this.productDetails = JSON.parse(sessionStorage.setAllProductLists);
    // this.productDetails = [];
  }

  changeNcbAmt() {
    if (this.fourWheeler.controls['previousClaim'].value == 'No') {
    } else {
      this.fourWheeler.controls['ncb'].patchValue('');
    }
  }

  rtoError(){
    // alert('inn')
    if ((this.fourWheeler.controls['city'].value==''||this.fourWheeler.controls['city'].value==undefined||this.fourWheeler.controls['city'].value==null)&&this.typeList == 'new') {
      // alert(this.bikeInsurance.controls['city'].value)
      this.CityValid=true;
      this.CityValid = 'Please Select RTO AREA';

    } else {
      this.CityValid=false;
      this.CityValid='';
    }
    console.log(this.CityValid,'this.CityValid///')
  }
  companyError(){
    // alert('inn')
    if ((this.fourWheeler.controls['previousCompany'].value==''||this.fourWheeler.controls['previousCompany'].value==undefined||this.fourWheeler.controls['previousCompany'].value==null)&&this.typeList != 'new') {
      // alert(this.bikeInsurance.controls['previousCompany'].value)
      this.CompanyValid=true;
      this.CompanyValid = 'Please Select Previous Company';

    } else {
      this.CompanyValid=false;
      this.CompanyValid='';
    }
    console.log(this.CompanyValid,'this.CompanyValid///')
  }
  claimError(){
    // alert('inn')
    if ((this.fourWheeler.controls['previousClaim'].value==''||this.fourWheeler.controls['previousClaim'].value==undefined||this.fourWheeler.controls['previousClaim'].value==null)&&this.typeList != 'new') {
      // alert(this.bikeInsurance.controls['previousClaim'].value)
      this.ClaimValid=true;
      this.ClaimValid = 'Please Select Previous Claim';

    } else {
      this.ClaimValid=false;
      this.ClaimValid='';
    }
    console.log(this.ClaimValid,'this.ClaimValid///')
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

  addEvent(event, type) {
    // alert('1111')
    console.log(event, 'eventevent');
    let selectedDate = '';
    let dob = '';
    const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
    if (event.value != null) {

      dob = this.datepipe.transform(event.value, 'y-MM-dd');

      if (typeof event.value._i == 'string') {
        if (type == 'regitser') {
          if (pattern.test(event.value._i) && event.value._i.length == 10 && this.fourWheeler.controls['registrationDateNew'].value >= this.minDate) {
            this.dobError = false;
            this.dobError = '';
          } else {
            this.dobError = true;
            this.dobError = 'Enter Valid Date';
          }
        } else if (typeof event.value._i == 'object') {
          this.dobError = '';
          this.dobError = false;

          if (type == 'regitser') {
            this.dobError = '';
            this.dobError = false;

            if (pattern.test(event.value._i) && event.value._i.length == 10 && this.fourWheeler.controls['registrationDateNew'].value >= this.minDate) {
              this.dobError = '';
              this.dobError = false;
            }
          }

        }
      }
      console.log(this.dobError,'dobError')
    }
  }


  addstart(event) {
    if (event.value != null) {
      let selectedDate = '';
      let dob = '';
      const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
      if (typeof event.value._i == 'string') {
        if (pattern.test(event.value._i) && event.value._i.length == 10) {
          this.dobStartError = '';
        } else {
          this.dobStartError = 'Enter Valid Date';
        }

      }
    }
  }

  addend(event) {
    if (event.value != null) {
      let selectedDate = '';
      let dob = '';
      const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
      if (typeof event.value._i == 'string') {
        if (pattern.test(event.value._i) && event.value._i.length == 10) {
          this.dobendError = '';
        } else {
          this.dobendError = 'Enter Valid Date';
        }

      }
    }
  }


  yearCalculate(dob) {

    let today = new Date();
    console.log(today);
    let birthDate = new Date(dob);
    console.log(birthDate);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    let dd = today.getDate() - birthDate.getDate();
    if (m < 0 || m == 0 && today.getDate() < birthDate.getDate()) {
      age = age - 1;
    }
    return age;
  }

  // home bike
  quationFirstStep(value) {
    sessionStorage.enquiryFormDatafw = JSON.stringify(value);
    console.log(this.fourWheeler.controls['previousCompany'].value,'hgghhg...');
    if ((this.fourWheeler.controls['city'].value==''||this.fourWheeler.controls['city'].value==undefined||this.fourWheeler.controls['city'].value==null)&&this.typeList == 'new') {
      this.CityValid=true;
      this.CityValid = 'Please Select RTO AREA';

    } else {
      this.CityValid=false;
      this.CityValid='';
    }
    console.log(this.CityValid,'this.CityValid///')
    if ((this.fourWheeler.controls['previousCompany'].value==''||this.fourWheeler.controls['previousCompany'].value==undefined||this.fourWheeler.controls['previousCompany'].value==null)&&this.typeList != 'new') {
      // alert(this.bikeInsurance.controls['previousCompany'].value)
      this.CompanyValid=true;
      this.CompanyValid = 'Please Select Previous Company';

    } else {
      this.CompanyValid=false;
      this.CompanyValid='';
    }
    console.log(this.CompanyValid,'this.CompanyValid///')
    if ((this.fourWheeler.controls['previousClaim'].value==''||this.fourWheeler.controls['previousClaim'].value==undefined||this.fourWheeler.controls['previousClaim'].value==null)&&this.typeList != 'new') {
      // alert(this.bikeInsurance.controls['previousClaim'].value)
      this.ClaimValid=true;
      this.ClaimValid = 'Please Select Previous Claim';

    } else {
      this.ClaimValid=false;
      this.ClaimValid='';
    }
    console.log(this.ClaimValid,'this.ClaimValid///')
    console.log(this.fourWheeler.controls['previousPolicyExpiry'].value,'4567876568')
    console.log(this.fourWheeler.controls['previousPolicyStart'].value,'34567887456')
    const data = {
      "platform": "web",
      "created_by": "0",
      "role_id": this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
      "user_id": this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      "enquiry_id": 0,
      "pos_status": this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
      "vehicle_no": this.fourWheeler.controls['vehicalNumber'].value==null||undefined ?'': this.fourWheeler.controls['vehicalNumber'].value,
      "registration_date": this.datepipe.transform(this.fourWheeler.controls['registrationDate'].value, 'y-MM-dd') ? this.datepipe.transform(this.fourWheeler.controls['registrationDate'].value, 'y-MM-dd') : this.datepipe.transform(this.fourWheeler.controls['registrationDateNew'].value, 'y-MM-dd'),
      "previous_claim_YN": this.fourWheeler.controls['previousClaim'].value == 'No' ? '0' : '1',
      "previous_policy_expiry_date": this.fourWheeler.controls['previousPolicyExpiry'].value ==''||this.fourWheeler.controls['previousPolicyExpiry'].value ==undefined||this.fourWheeler.controls['previousPolicyExpiry'].value ==null? '' : this.datepipe.transform(this.fourWheeler.controls['previousPolicyExpiry'].value, 'y-MM-dd'),
      "previous_policy_start_date": this.fourWheeler.controls['previousPolicyStart'].value ==''||this.fourWheeler.controls['previousPolicyStart'].value ==undefined||this.fourWheeler.controls['previousPolicyStart'].value ==null ? '' : this.datePipe.transform(this.fourWheeler.controls['previousPolicyStart'].value, 'y-MM-dd'),
      "type": this.typeList,
      "ncb_percent": this.fourWheeler.controls['ncb'].value ? this.fourWheeler.controls['ncb'].value : '0',
      "prev_insurance_name": this.fourWheeler.controls['previousCompany'].value==null||undefined ?'': this.fourWheeler.controls['previousCompany'].value,

    }
    console.log(data, 'data');
    if (this.fourWheeler.valid  && (this.CityValid==false && this.CompanyValid==false && this.ClaimValid==false&&this.previousStartError==false)) {
      console.log(this.fourWheeler.value,'this.fourWheeler...')
      this.fwService.getMotorHomeDetails(data).subscribe(
          (successData) => {
            this.bikeDetailsSuccess(successData, data);


          },
          (error) => {
            this.bikeDetailsFailure(error);
          }
      );
    }else{
      this.toastr.error('Please select the Mandatory field');

    }
  }

  vechicleValue(){

    let stringToSplit;
    stringToSplit = this.fourWheeler.controls['vehicalNumber'].value.toUpperCase();
    let x = stringToSplit.slice(0, 2);
    console.log(x,'x.....')
    let y = stringToSplit.slice(2, 4);
    console.log(y,'y.....')

    this.vehicleRegNumber = x.concat('-', y);
    console.log( this.vehicleRegNumber,'vehicleRegNumber.....')

  }

  public bikeDetailsSuccess(successData, data) {
    if (successData.IsSuccess) {
      this.bikeList = successData.ResponseObject;
      console.log(this.bikeList, 'hgdj');
      this.enquiry = this.bikeList;
      sessionStorage.carListDetails = JSON.stringify(this.bikeList);
      sessionStorage.bikeEnquiryId = this.bikeList.enquiry_id;
      sessionStorage.enquiryFormDatafw = JSON.stringify(data);
      console.log(sessionStorage.enquiryFormDatafw,'sessionStorage.enquiryFormDatafw...')
      let dialogRef = this.dialog.open(FourWheelerEnquirypopupComponent, {
        width: '1500px', data: {listData: successData.ResponseObject, disableClose: true},
        height: '600px'
      })
      dialogRef.disableClose = true;
      dialogRef.afterClosed().subscribe(result => {
      });


    } else {
      this.toastr.error(successData.ErrorObject);
    }
  }

  public bikeDetailsFailure(error) {
  }

  claimpercent() {
    const data = {
      'platform': 'web',
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
      'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0'

    }
    this.fwService.getClaimList(data).subscribe(
        (successData) => {
          this.claimSuccess(successData);
        },
        (error) => {
          this.claimFailure(error);
        }
    );
  }

  public claimSuccess(successData) {
    if (successData.IsSuccess) {
      this.claimDetails = successData.ResponseObject;
    }
  }

  public claimFailure(error) {
  }

  // previous company
  getpreviousCompany() {
    const data = {
      'platform': 'web',
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
      'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0'

    }
    this.fwService.getCompanyDetails(data).subscribe(
        (successData) => {
          this.companySuccess(successData);
        },
        (error) => {
          this.companyFailure(error);
        }
    );
  }

  public companySuccess(successData) {
    if (successData.IsSuccess) {
      this.companyList = successData.ResponseObject;
    }
  }

  public companyFailure(error) {
  }

  rtoCity() {
    sessionStorage.RtoFour = this.fourWheeler.controls['city'].value;
    console.log(sessionStorage.RtoFour, 'sessionStorage.Rto');
  }
  sessionCompany(){
    // if(this.typeList == 'new') {
      sessionStorage.newCompanyName = this.fourWheeler.controls['companyNameNew'].value;
      console.log(sessionStorage.newCompanyName, 'sessionStorage.newCompanyName');
    sessionStorage.typeList = this.typeList;
    console.log(sessionStorage.typeList, 'sessionStorage.newCompanyName');


    // }else{
    //   sessionStorage.newCompanyName='';
    // }
  }
  sessionrenewelCompanyName(){
    // if(this.typeList == 'other') {
      sessionStorage.renewelCompanyName = this.fourWheeler.controls['companyNameRenewel'].value;
      console.log(sessionStorage.renewelCompanyName, 'sessionStorage.renewelCompanyName');
    sessionStorage.typeList = this.typeList;
    console.log(sessionStorage.typeList, 'sessionStorage.newCompanyName');
    // }else{
    //   sessionStorage.renewelCompanyName=''
    // }
  }

  idValidate(event: any) {
    this.validation.idValidate(event);
  }

  getCityLists() {
    const data = {
      'platform': 'web',
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
      'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0'

    }
    this.fwService.getRtoList(data).subscribe(
        (successData) => {
          this.citySuccess(successData);
        },
        (error) => {
          this.cityFailure(error);
        }
    );
  }

  public citySuccess(successData) {
    if (successData.IsSuccess) {
      this.getRtoDetails = successData.ResponseObject;
      //
    }
  }

  public cityFailure(error) {
  }

  sessionData() {
    // alert('sess')
    if (sessionStorage.enquiryFormDatafw != '' && sessionStorage.enquiryFormDatafw != undefined) {
      let stepper = JSON.parse(sessionStorage.enquiryFormDatafw);
      this.fourWheeler = this.fb.group({
        'vehicalNumber': stepper.vehicalNumber,
        'registrationDate': this.datePipe.transform(stepper.registrationDate, 'y-MM-dd'),
        'registrationDateNew': this.datePipe.transform(stepper.registrationDateNew, 'y-MM-dd'),
        'previousClaim': stepper.previousClaim,
        'enquiry': stepper.enquiry,
        'ncb': stepper.ncb,
        'previousPolicyExpiry': this.datePipe.transform(stepper.previousPolicyExpiry, 'y-MM-dd'),
        'previousPolicyStart': this.datePipe.transform(stepper.previousPolicyStart, 'y-MM-dd'),
        'previousCompany': stepper.previousCompany,
        'city': stepper.city,
        'companyNameNew': stepper.companyNameNew,
        'companyNameRenewel': stepper.companyNameRenewel,
      });

    }
    if (sessionStorage.bikeEnquiryId != '' && sessionStorage.bikeEnquiryId != undefined) {
      this.bikeEnquiryId = sessionStorage.bikeEnquiryId;
    }
    if (sessionStorage.setAllProductLists != '' && sessionStorage.setAllProductLists != undefined) {
      sessionStorage.setAllProductLists = [];
    }
  }


  getType(event) {
    console.log(event, 'value');
    // alert(event);
    this.typeList = '';
    if (event == 0) {
      this.typeList = 'new'
      // alert(this.typeList)
      this.fourWheeler.controls['registrationDateNew'].setValidators([Validators.required]);
    this.fourWheeler.controls['companyNameNew'].setValidators([Validators.required]);
    this.fourWheeler.controls['city'].setValidators([Validators.required]);
      this.dobError=false;

    this.fourWheeler.controls['companyNameRenewel'].setValidators(null);
    this.fourWheeler.controls['companyNameRenewel'].patchValue('');

  this.fourWheeler.controls['previousPolicyExpiry'].setValidators(null);
  this.fourWheeler.controls['previousPolicyExpiry'].patchValue('');

  this.fourWheeler.controls['previousPolicyStart'].setValidators(null);
  this.fourWheeler.controls['previousPolicyStart'].patchValue('');


  this.fourWheeler.controls['registrationDate'].setValidators(null);
  this.fourWheeler.controls['registrationDate'].patchValue('');

  this.fourWheeler.controls['previousCompany'].setValidators(null);
  this.fourWheeler.controls['previousCompany'].patchValue('');

  this.fourWheeler.controls['vehicalNumber'].setValidators(null);
  this.fourWheeler.controls['vehicalNumber'].patchValue('');


  this.fourWheeler.controls['previousClaim'].setValidators(null);
  this.fourWheeler.controls['previousClaim'].patchValue('');



  } else if(event == 1) {
    this.typeList = 'other'
      // alert(this.typeList)
      this.fourWheeler.controls['registrationDate'].setValidators([Validators.required]);
      this.fourWheeler.controls['companyNameRenewel'].setValidators([Validators.required]);
      this.fourWheeler.controls['previousPolicyExpiry'].setValidators([Validators.required]);
      this.fourWheeler.controls['previousPolicyStart'].setValidators([Validators.required]);
      this.fourWheeler.controls['vehicalNumber'].setValidators(Validators.compose([Validators.minLength(9), Validators.pattern('([a-zA-Z]){2}([0-9]){2}([a-zA-Z0-9]){6}')]));
      this.fourWheeler.controls['previousCompany'].setValidators([Validators.required]);
      this.fourWheeler.controls['previousClaim'].setValidators([Validators.required]);

      this.fourWheeler.controls['registrationDateNew'].setValidators(null);
      this.fourWheeler.controls['companyNameNew'].setValidators(null);
      this.fourWheeler.controls['city'].setValidators(null);
      this.fourWheeler.controls['registrationDateNew'].patchValue('');
      this.fourWheeler.controls['companyNameNew'].patchValue('');
      this.fourWheeler.controls['city'].patchValue('');
      this.dobError=''
    }
    this.fourWheeler.controls['registrationDateNew'].updateValueAndValidity();
    this.fourWheeler.controls['companyNameNew'].updateValueAndValidity();
    this.fourWheeler.controls['city'].updateValueAndValidity();

    this.fourWheeler.controls['registrationDate'].updateValueAndValidity();
    this.fourWheeler.controls['companyNameRenewel'].updateValueAndValidity();
    this.fourWheeler.controls['previousPolicyExpiry'].updateValueAndValidity();
    this.fourWheeler.controls['previousPolicyStart'].updateValueAndValidity();
    this.fourWheeler.controls['vehicalNumber'].updateValueAndValidity();
    this.fourWheeler.controls['previousCompany'].updateValueAndValidity();
    this.fourWheeler.controls['previousClaim'].updateValueAndValidity();

  }

  vehicaleValidate(){
    console.log(this.fourWheeler.controls['vehicalNumber'].value.length, 'this.fourWheeler.controls[\'vehicalNumber\'].value.length');
    if(this.fourWheeler.controls['vehicalNumber'].value.length == 9){
      console.log('in');
      this.fourWheeler.controls['vehicalNumber'].setValidators(Validators.compose([Validators.pattern('[a-zA-Z]{2}[0-9]{2}[a-zA-Z0-9]{5}')]));
      this.fourWheeler.controls['vehicalNumber'].updateValueAndValidity();

    } else if(this.fourWheeler.controls['vehicalNumber'].value.length == 10) {
      console.log('out');
      this.fourWheeler.controls['vehicalNumber'].setValidators(Validators.compose([Validators.pattern('([a-zA-Z]){2}([0-9]){2}([a-zA-Z0-9]){6}')]));
      this.fourWheeler.controls['vehicalNumber'].updateValueAndValidity();

    }
  }
  CarInsurer() {
    const dialogRef = this.dialog.open(CarInsurer, {
      width: '1200px',
    });
    dialogRef.disableClose = true;
  }
}

@Component({
  selector: 'carinsurer',
  template: `        
        <div class="container">
        <div  class="row text-justify">
        
            <div class="col-sm-2">
            </div>
            <div class="col-sm-8">
                <h3 class="text-center" style="color: #22B9C6 "><img src="assets/img/car-insurance.png" class="logo-size"> About Car Insurance</h3>
            </div>
            <div class="col-sm-2 text-right">
                <mat-icon (click)="onNoClick()" style="cursor: pointer">close</mat-icon>
            </div>
            <p>The owners of motor vehicles are not aware of  the important aspects of the risks andliabilities associated with owning and /or driving a  motor vehicle. Even though the Motor insurance policies can be bought or renewed online through internet the renewal dates are missed and the vehicle plies on the road without insurance. It is essential to know that as the owner of the vehicle the liability if any in the event of an accident rests on the motor vehicle owner and all negligence arising out of driving is with the driver. </p>
            <p>The motor vehicle insurance has two parts</p>
            <ol class="pl-5" type="i">
                <li>The Own damage portion which takes care of damages and theft of the vehicle</li>
                <li>The liability portion which takes care of liabilities arising at the time of an accident. The Third party damages could be Third party injury, Third party property damages, injury or death of the driver / conductor / cleaner / coolies. If the vehicle is not adequately insured the owner and the driver of the vehicle are at a huge risk from all angles.</li>
            </ol>
            <p>The introduction of long term Third party liability insurance in India is to be considered as a blessing in disguise to some extent. At the same time the probabilities of the risk of forgetting to renew the liability insurance prior to its expiry increases. The Own damage portion is also anticipating a change in the existing pattern very shortly. Motor vehicle insurance has also seen a slight betterment in tune with the international standards like the bumper to bumper cover.</p>
            <p>Please feel free to get in touch with us for any help in motor vehicle insurance. You can contact us by email at cutomercare@vizzafin.comFOR ALL RENEWALS AND MOTOR VEHICLE INSURANCE RELATED QUERIES.</p>
         </div>
        </div>`,
})
export class CarInsurer {

  constructor(
      public dialogRef: MatDialogRef<CarInsurer>,
      @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
