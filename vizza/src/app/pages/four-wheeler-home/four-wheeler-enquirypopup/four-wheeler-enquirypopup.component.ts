import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BikeInsuranceService} from '../../../shared/services/bike-insurance.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {ValidationService} from '../../../shared/services/validation.service';
import {AuthService} from '../../../shared/services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import * as moment from '../../bike-insurance/enquiry-popup/enquiry-popup.component';
import {FourWheelerService} from '../../../shared/services/four-wheeler.service';
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
  selector: 'app-four-wheeler-enquirypopup',
  templateUrl: './four-wheeler-enquirypopup.component.html',
  styleUrls: ['./four-wheeler-enquirypopup.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class FourWheelerEnquirypopupComponent implements OnInit {
  vehicalDetails: FormGroup;
  public manifactureDetails : any;
  public ccDetails : any;
  public variantDetails : any;
  public modelDetails : any;
  public bikeEnquiryId : any;
  public QuotationList : any;
  public claimDetails : any;
  public claimAmountDetails : any;
  public ListDetails : any;
  public bussinessList : any;
  public enquiryFormData : any;
  public carListDetails : any;
  public cityDetails : any;
  public vehicalNo : any;
  public options : any;
  public config : any;
  public rto : any;
  public citySettings : any;
  public getDays : any;
  public dobError: any;
  public dobStartError: any;
  public dobendError: any;
  public maxDateValidate: any;
  public getRegPolicyYear: any;
  public errorFutureDate: any;
  public manfactureErrorDate: any;
  public minDate: any;
  public maxDate: any;
  public start: any;
  public RegYear: any;
  public getLength: any;
  public regionDetails: any;
  public vehicleRegNumber: any;
  public newCompanyName: any;
  public renewelCompanyName: any;
  public typeList: any;
  public CityValid : boolean;
  public regionValid : boolean;
  public manifactureValid: boolean;
  public modelValid: boolean;
  public variantValid: boolean;
  public ccValid: boolean;
  constructor(public fb: FormBuilder, public fwService: FourWheelerService, public router: Router, public datePipe: DatePipe, public validation: ValidationService, public datepipe: DatePipe, public route: ActivatedRoute, public auth: AuthService, public toastr: ToastrService,
              public dialogRef: MatDialogRef<FourWheelerEnquirypopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.ListDetails = this.data.listData;
    this.vehicalNo = this.ListDetails.vehicalNumber;
    console.log(this.ListDetails, 'this.ListDetails');
    this.vehicalDetails = this.fb.group({
      'vehicalNumber':  '',
      'registrationDate':  ['', Validators.required],
      'previousClaim': '',
      'enquiry': '',
      'vehicleModel':  ['', Validators.required],
      'manufacture': ['', Validators.required],
      'bussiness': ['', Validators.required],
      'ncb': '',
      'manufactureYear': ['', Validators.required],
      'vehicleCC': ['', Validators.required],
      'variant':  ['', Validators.required],
      'chasissNumber': ['', Validators.required],
      'engine': ['', Validators.required],
      'previousPolicyExpiry':'',
      'previousPolicyStart': '',
      'city': ['', Validators.required],
      'regionList': ['', Validators.required]
    });
    this.getDays = this.datePipe.transform(this.ListDetails.previous_policy_start_date, 'y-MM-dd');
    const miniDate = new Date();
    this.minDate = new Date(miniDate.getFullYear(), miniDate.getMonth(), miniDate.getDate());
    this.maxDate = this.minDate;
    // this.maxDateValidate  = new Date();
    this.errorFutureDate = false;
    this.manfactureErrorDate = false;
    console.log(this.dataList, 'hgfgdjgh');
    this.config = {
      displayKey: "city", //if objects array passed which key to be displayed defaults to description
      search: true,
      limitTo: 5
    };
    this.config = {
      displayKey: "regionList", //if objects array passed which key to be displayed defaults to description
      search: true,
      limitTo: 5
    };
    this.regionValid = false;
    this.CityValid = false;

  // this.CityValid = false;
  //   this.citySettings = {
  //     singleSelection: false,
  //     text: 'Select Speciality',
  //     selectAllText: 'Select All',
  //     unSelectAllText: 'UnSelect All',
  //     enableSearchFilter: true,
  //     classes: 'myclass custom-class',
  //     noDataLabel: 'Speciality not found'
  //   };
    this.config = {
      displayKey: "manufacture", //if objects array passed which key to be displayed defaults to description
      search: true,
      limitTo: 5
    };
    this.manifactureValid = false;

    this.config = {
      displayKey: "vehicleModel", //if objects array passed which key to be displayed defaults to description
      search: true,
      limitTo: 5
    };
    this.modelValid = false;

    this.config = {
      displayKey: "variant", //if objects array passed which key to be displayed defaults to description
      search: true,
      limitTo: 5
    };
    this.variantValid = false;

    this.config = {
      displayKey: "vehicleCC", //if objects array passed which key to be displayed defaults to description
      search: true,
      limitTo: 5
    };
    this.ccValid = false;



  }

  // onItemSelect(item: any) {
  //   if (this.selectedQualification.length > 0) {
  //     this.qualificationError = '';
  //   } else {
  //     this.qualificationError = 'Qualification is Required';
  //   }
  // }
  //
  // OnItemDeSelect(item: any) {
  //   // console.log(this.selectedItems);
  //   if (this.selectedQualification.length > 0) {
  //     this.qualificationError = '';
  //   } else {
  //     this.qualificationError = 'Qualification is Required';
  //   }
  // }
  //
  // onSelectAll(items: any) {
  //   if (this.selectedQualification.length > 0) {
  //     this.qualificationError = '';
  //   } else {
  //     this.qualificationError = 'Qualification is Required';
  //   }
  // }
  ngOnInit() {
    this.enquiryFormData = JSON.parse(sessionStorage.enquiryFormDatafw);
    this.carListDetails = JSON.parse(sessionStorage.carListDetails);
    this.rto = sessionStorage.RtoFour;
    this.newCompanyName =  sessionStorage.newCompanyName;
    this.renewelCompanyName =  sessionStorage.renewelCompanyName;
    this.typeList =  sessionStorage.typeList;
    // alert(this.typeList);
    console.log(this.typeList,'this.typeList...')

    let stringToSplit;
    stringToSplit = this.carListDetails.vehicle_no.toUpperCase();
    let x = stringToSplit.slice(0, 2);
    console.log(x,'x.....')
    let y = stringToSplit.slice(2, 4);
    console.log(y,'y.....')
    // let oo = stringToSplit.slice(5, 6);
    // console.log(oo,'oo.....')
    // let w = '';
    // let z = stringToSplit.slice(4, 6);
    // console.log(z,'z.....')
    // if (!isNaN(oo)) {
    //   let j = stringToSplit.slice(4, 5);
    //   console.log(j,'j...')
    //   w = stringToSplit.slice(5);
    //   console.log(w,'w.....')
    this.vehicleRegNumber = x.concat('-', y);
    console.log( this.vehicleRegNumber,'vehicleRegNumber.....')
    // } else {
    //   w = stringToSplit.slice(6);
    //   this.vehicleRegNumber = x.concat('-', y, '-', z, '-', w);
    //   console.log( this.vehicleRegNumber,'vehicleRegNumber1111.....')
    //
    // }
    this.CityValid = false;
    this.regionValid = false;


    this.claimpercent();
    this.manifactureList();
    this.dataList();
    this.getCityLists();


    this.vehicalDetails.controls['manufacture'].patchValue(this.ListDetails.vehicle_manufacture);
    this.vehicalDetails.controls['vehicleModel'].patchValue(this.ListDetails.vehicle_model);
    this.vehicalDetails.controls['variant'].patchValue(this.ListDetails.vehicle_variant);
    this.vehicalDetails.controls['vehicleCC'].patchValue(this.ListDetails.vehicle_cc);
    // alert('console..')
    // console.log(this.vehicalDetails.controls['manufacture'].value,'345678....')
    this.getRegionLists();
  }
  dataList(){
    console.log('dataList...')
    console.log(this.vehicalDetails.controls['vehicleCC'].value,'vehicle.....');
    this.vehicalDetails.patchValue({
      'vehicalNumber': this.ListDetails.vehicle_no,
      'registrationDate': this.datePipe.transform(this.ListDetails.registration_date, 'y-MM-dd'),
      'previousClaim': this.ListDetails.previous_claim_YN,
      // 'claimamount': this.ListDetails.claim_amount,
      'enquiry': this.ListDetails.enquiry_id,
      'vehicleModel': this.ListDetails.vehicle_model,
      'manufacture': this.ListDetails.vehicle_manufacture,
      'bussiness': this.ListDetails.business_type,
      'ncb': this.ListDetails.ncb_percent,
      'manufactureYear': this.ListDetails.manu_yr,
      'vehicleCC': this.ListDetails.vehicle_cc,
      'variant': this.ListDetails.vehicle_variant,
      'chasissNumber': this.ListDetails.chassis_no,
      'engine': this.ListDetails.engine_no,
      'previousPolicyExpiry': this.datePipe.transform(this.ListDetails.previous_policy_expiry_date, 'y-MM-dd'),
      'previousPolicyStart': this.datePipe.transform(this.ListDetails.previous_policy_start_date, 'y-MM-dd')

    });
    // console.log(this.vehicalDetails.controls['vehicleCC'].value,'vehicle1111111.....');
    // console.log(this.vehicalDetails.controls['variant'].value,'variantttttt.....');
    // console.log(this.vehicalDetails.controls['manufacture'].value,'manufacture.....');//bajai2
  }
  /// manufacture
  manifactureList() {
    console.log(this.newCompanyName,'this.newCompanyName')
    console.log(this.renewelCompanyName,'this.newCompanyName')
    const data = {
      'platform': 'web',
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
      'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
      'company_id':this.typeList='new' ? this.newCompanyName : this.renewelCompanyName,

    }
    this.fwService.getManifactureList(data).subscribe(
        (successData) => {
          this.manifactureSuccess(successData);
        },
        (error) => {
          this.manifactureFailure(error);
        }
    );
  }
  public manifactureSuccess(successData){
    if (successData.IsSuccess) {
      this.manifactureDetails = successData.ResponseObject;
        this.modelList1();

    }
  }
  public manifactureFailure(error) {
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
  idValidate(event: any) {
    this.validation.idValidate(event);
  }

  // claim(){
  //   if(this.vehicalDetails.controls['previousClaim'].value == 'Yes'){
  //     this.claimAmountDetails = true;
  //   } else {
  //     this.claimAmountDetails = false;
  //
  //   }
  //   sessionStorage.claimDetail = this.claimAmountDetails;
  // }


  // model

  // variant
  variantList() {
    const data = {
      'platform': 'web',
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
      'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
      'manufacture': this.vehicalDetails.controls['manufacture'].value,
      'model':  this.vehicalDetails.controls['vehicleModel'].value,
      'company_id':this.typeList='new' ? this.newCompanyName : this.renewelCompanyName,
       // 'variant':  this.vehicalDetails.controls['variant'].value

    }
    this.fwService.getvariantList(data).subscribe(
        (successData) => {
          this.variantSuccess(successData);
        },
        (error) => {
          this.variantFailure(error);
        }
    );
  }
  public variantSuccess(successData){
    if (successData.IsSuccess) {
      this.variantDetails = successData.ResponseObject;
        this.ccList();


    }
  }
  public variantFailure(error) {
  }
  modelList1() {
    const data = {

      'platform': 'web',
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
      'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
      'manufacture': this.vehicalDetails.controls['manufacture'].value,
      'company_id':this.typeList='new' ? this.newCompanyName : this.renewelCompanyName,
      // 'variant':  this.vehicalDetails.controls['variant'].value

    }
    this.fwService.getModelList(data).subscribe(
        (successData) => {
          this.modelSuccess(successData);
        },
        (error) => {
          this.modelFailure(error);
        }
    );
  }
  public modelSuccess(successData){
    if (successData.IsSuccess) {
      this.modelDetails = successData.ResponseObject;
      this.variantList();

    }
  }
  public modelFailure(error) {
  }
  // cc
  ccList() {
    const data = {
      'platform': 'web',
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
      'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
      'manufacture': this.vehicalDetails.controls['manufacture'].value,
      'model':  this.vehicalDetails.controls['vehicleModel'].value,
      'variant':  this.vehicalDetails.controls['variant'].value,
      'company_id':this.typeList='new' ? this.newCompanyName : this.renewelCompanyName,
    }
    this.fwService.getCCList(data).subscribe(
        (successData) => {
          this.ccSuccess(successData);
        },
        (error) => {
          this.ccFailure(error);
        }
    );
  }
  public ccSuccess(successData){
    if (successData.IsSuccess) {
      this.ccDetails = successData.ResponseObject;
    }
  }
  public ccFailure(error) {
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
  public claimSuccess(successData){
    if (successData.IsSuccess) {
      this.claimDetails = successData.ResponseObject;
    }
  }
  public claimFailure(error) {
  }
  getCityLists() {
    const data = {
      'platform': 'web',
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
      'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0'

    }
    this.fwService.getCityList(data).subscribe(
        (successData) => {
          this.citySuccess(successData);
        },
        (error) => {
          this.cityFailure(error);
        }
    );
  }
  public citySuccess(successData){
    if (successData.IsSuccess) {
      this.cityDetails = successData.ResponseObject;
      //
    }
  }
  public cityFailure(error) {
  }

  getRegionLists() {
    const data = {
      'platform': 'web',
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
      'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
      'region_code':this.vehicleRegNumber=='-'?'':this.vehicleRegNumber,
    }
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


  addEvent(event, type) {
    console.log(event, 'eventevent');
    let selectedDate = '';
    let dob = '';
    const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
    if (event.value != null) {

      dob = this.datepipe.transform(event.value, 'y-MM-dd');

      if (typeof event.value._i == 'string') {
        console.log('in');
        if (type == 'regitser') {
          if (pattern.test(event.value._i) && event.value._i.length == 10 && this.vehicalDetails.controls['registrationDate'].value >= this.minDate) {
            this.dobError = '';
          } else {
            this.dobError = 'Enter Valid Date';
          }
        }
      } else if (typeof event.value._i == 'object') {
        this.dobError = '';

        if (type == 'regitser') {
          this.dobError = '';
          console.log('out');
          if (pattern.test(event.value._i) && event.value._i.length == 10 && this.vehicalDetails.controls['registrationDate'].value >= this.minDate) {
            this.dobError = '';
          }
        }
      }
      console.log(this.dobError, 'this.dobError');
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
    let birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    let dd = today.getDate() - birthDate.getDate();
    if (m < 0 || m == 0 && today.getDate() < birthDate.getDate()) {
      age = age - 1;
    }
    return age;
  }
  manufactureYear() {
    this.start = new Date(this.vehicalDetails.controls['registrationDate'].value);
    this.getRegPolicyYear = this.start.getFullYear();
    this.RegYear = this.start.getFullYear()-1;
    console.log(this.getRegPolicyYear, 'getPolicyYear');
    console.log(this.RegYear, 'RegYear');
    this.getLength = this.vehicalDetails.controls['manufactureYear'].value;
    console.log(this.getLength, 'getLengthgetLength');
    if (this.getLength.length == 4) {
      if (this.getRegPolicyYear < this.getLength || this.RegYear > this.getLength ) {
        this.manfactureErrorDate=true;
        this.manfactureErrorDate = 'Manufacturing year should be equal to registration year or less than 1year from Registration year';
        // this.toastr.error('Manufacturing year should be equal to registration year or less than 1year from Registration year.');
      }else {
        this.manfactureErrorDate=false;
        this.manfactureErrorDate='';
      }

    }

  }



  maxDatechange() {
    let startDate = new Date(this.vehicalDetails.controls['registrationDate'].value);
    let regPolicyYear = startDate.getFullYear();
    console.log(regPolicyYear,'registeryear');
    this.maxDateValidate =this.maxDate.getFullYear();
    console.log(this.maxDateValidate,'maxyear');

    if (this.maxDateValidate < regPolicyYear) {
      this.errorFutureDate=true;
      this.errorFutureDate = 'Future Year is not Acceptable';
    } else {
      this.errorFutureDate=false;
      this.errorFutureDate='';
    }

  }
  enquiryQuation(value) {
    if( this.vehicalDetails.controls['city'].value == ''){
      this.CityValid = true;
      if(this.vehicalDetails.controls['regionList'].value == ''){
        this.regionValid = true;
        console.log(this.regionValid,'regionValid...');
        if(this.vehicalDetails.controls['manufacture'].value == ''){
          this.manifactureValid = true;
          console.log(this.manifactureValid,'manifactureValid...');
          if(this.vehicalDetails.controls['vehicleModel'].value == ''){
            this.modelValid = true;
            console.log(this.modelValid,'modelValid...');
            if(this.vehicalDetails.controls['variant'].value == ''){
              this.variantValid = true;
              console.log(this.variantValid,'variantValid...');
              if(this.vehicalDetails.controls['vehicleCC'].value == ''){
                this.ccValid = true;
                console.log(this.ccValid,'ccValid...');
              }else{
                this.ccValid = false;
                console.log(this.ccValid,'rccValidfalse...');
              }
            }else{
              this.variantValid = false;
              console.log(this.variantValid,'regionValidfalse...');
            }
          }else{
            this.modelValid = false;
            console.log(this.modelValid,'rmodelValidfalse...');
          }
        }else{
          this.manifactureValid = false;
          console.log(this.manifactureValid,'manifactureValidfalse...');
        }
      }else{
        this.regionValid = false;
        console.log(this.regionValid,'regionValidfalse...');
      }
    } else {
      this.CityValid = false;

    }

    if(this.vehicalDetails.valid) {
      const data = {
      'platform': 'web',
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
      'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
      'enquiry_id': '0',
      'vehicle_no':this.vehicalDetails.controls['vehicalNumber'].value ? this.vehicalDetails.controls['vehicalNumber'].value : '',
      'registration_date': this.vehicalDetails.controls['registrationDate'].value,
      'previous_policy_expiry_date':this.vehicalDetails.controls['previousPolicyExpiry'].value == null ? '' :this.vehicalDetails.controls['previousPolicyExpiry'].value,
      'previous_policy_no':"12344556",
      'previous_claim_YN': this.vehicalDetails.controls['previousClaim'].value == 'No' ? '0' : '1',
      // 'claim_amount':this.vehicalDetails.controls['claimamount'].value ? this.vehicalDetails.controls['claimamount'].value : '',
      'vehicle_manufacture':this.vehicalDetails.controls['manufacture'].value,
      'vehicle_model':this.vehicalDetails.controls['vehicleModel'].value,
      'vehicle_variant':this.vehicalDetails.controls['variant'].value,
      'vehicle_cc':this.vehicalDetails.controls['vehicleCC'].value,
      'chassis_no':this.vehicalDetails.controls['chasissNumber'].value,
      'engine_no':this.vehicalDetails.controls['engine'].value,
      'manu_yr':this.vehicalDetails.controls['manufactureYear'].value,
      'vehicle_category':"2W",
      'ncb_percent': this.vehicalDetails.controls['ncb'].value ? this.vehicalDetails.controls['ncb'].value : '',
      'previous_policy_start_date':this.vehicalDetails.controls['previousPolicyStart'].value == null ? '' : this.vehicalDetails.controls['previousPolicyStart'].value ,
      'business_type':this.ListDetails.business_type,
      'registration_city': this.vehicalDetails.controls['city'].value,
      'rto_code': this.rto,
       'region_name': this.vehicalDetails.controls['regionList'].value,
      'prev_insurance_name': this.enquiryFormData.prev_insurance_name == null ? '' :this.enquiryFormData.prev_insurance_name

      };
      console.log(data,'data');
      sessionStorage.vehicledetailsfw = JSON.stringify(data);
      this.fwService.getEnquiryDetails(data).subscribe(
          (successData) => {
            this.enquirySuccess(successData);
          },
          (error) => {
            this.enquiryFailure(error);
          }
      );
    }else{
      this.toastr.error('Please select the Mandatory field');
    }
  }
  public enquirySuccess(successData){
    if (successData.IsSuccess) {
      this.QuotationList = successData.ResponseObject;
      console.log(this.QuotationList, ' this.QuotationList');
      sessionStorage.fwEnquiryId = this.QuotationList.enquiry_id;
      console.log(this.QuotationList,'jhkhjgkj');
      console.log(this.errorFutureDate,'errorFutureDate');
      console.log(this.manfactureErrorDate,'manfactureErrorDate');
      console.log(this.dobStartError,'dobStartError');
        if(successData.status == true && this.errorFutureDate == '' && this.manfactureErrorDate == '' && (this.dobError == ''|| this.dobError ==undefined)){
          this.dialogRef.close();
          this.router.navigate(['/four-wheeler-list']);
        }
    } else {
      this.toastr.error(successData.ErrorObject);

    }
  }
  public enquiryFailure(error) {
  }


  close(): void {
    this.dialogRef.close();
  }


}
