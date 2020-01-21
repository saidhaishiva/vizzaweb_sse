  import {Component, Inject, OnInit} from '@angular/core';
  import {FormBuilder, FormGroup, Validators} from '@angular/forms';
  import {BikeInsuranceService} from '../../../shared/services/bike-insurance.service';
  import {DatePipe} from '@angular/common';
  import {ValidationService} from '../../../shared/services/validation.service';
  import {ActivatedRoute, Router} from '@angular/router';
  import {AuthService} from '../../../shared/services/auth.service';
  import {ToastrService} from 'ngx-toastr';
  import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
  import {MomentDateAdapter} from '@angular/material-moment-adapter';
  import * as moment from 'moment';
  import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

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
    selector: 'app-enquiry-popup',
    templateUrl: './enquiry-popup.component.html',
    styleUrls: ['./enquiry-popup.component.scss'],
    providers: [
      {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
      {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ]
  })
  export class EnquiryPopupComponent implements OnInit {
    vehicalDetails: FormGroup;
    public manifactureDetails : any;
    public ccDetails : any;
    public variantDetails : any;
    public modelDetails : any;
    public bikeEnquiryId : any;
    public QuotationList : any;
    public claimDetails : any;
    public regDateDetails : any;
    public ListDetails : any;
    public bussinessList : any;
    public enquiryFormData : any;
    public bikeListDetails : any;
    public cityDetails : any;
    public vehicalNo : any;
    public options : any;
    public config : any;
    public getDays : any;
    public rto: any;
    public maxDateValidate: any;
    public getRegPolicyYear: any;
    public errorFutureDate: any;
    public manfactureErrorDate: any;
    public minDate: any;
    public maxDate: any;
    public start: any;
    public RegYear: any;
    public getLength: any;
    public CityValid: boolean;
    public regionValid: boolean;
    public dobError: any;
    public dobStartError: any;
    public dobendError: any;
    public regionDetails: any;
    public newCompanyName: any;
    public renewelCompanyName: any;
    public typeList: any;
    public manifactureValid: boolean;
    public modelValid: any;
    public variantValid: boolean;
    public ccValid: boolean;
    public vehicleRegNumber: any;
    constructor(public fb: FormBuilder, public bikeService: BikeInsuranceService, public router: Router, public datePipe: DatePipe, public validation: ValidationService, public datepipe: DatePipe, public route: ActivatedRoute, public auth: AuthService, public toastr: ToastrService,
    public dialogRef: MatDialogRef<EnquiryPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.ListDetails = this.data.listData;
      this.vehicalNo = this.ListDetails.vehicalNumber;
      this.regDateDetails=false
      this.vehicalDetails = this.fb.group({
        'vehicalNumber':  '',
        'registrationDate':  ['', Validators.required],
        'previousClaim': '',
        'enquiry': '',
        'vehicleModel':  ['', Validators.required],
        'manufacture': ['', Validators.required],
        // 'manufactureSearch': [''],
        'bussiness': '',
        'ncb': ['', Validators.required],
        'manufactureYear': ['', Validators.required],
        'vehicleCC': '',
        'variant':  '',
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
        this.config = {
        displayKey: "city", //if objects array passed which key to be displayed defaults to description
        search: true,
        limitTo: 5
      };
        this.CityValid = false;
      this.config = {
        displayKey: "regionList", //if objects array passed which key to be displayed defaults to description
        search: true,
        limitTo: 5
      };
      this.regionValid = false;

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
      // alert('construct')
      //   this.vehicalDetails['controls'].city.patchValue(null);
      //   this.vehicalDetails['controls'].regionList.patchValue(null);
      //   this.vehicalDetails['controls'].manufacture.patchValue(null);
      //   this.vehicalDetails['controls'].vehicleModel.patchValue(null);
      //   this.vehicalDetails['controls'].variant.patchValue(null);
      //   this.vehicalDetails['controls'].vehicleCC.patchValue(null);

    }

    ngOnInit() {
      this.newCompanyName =  sessionStorage.newCompanyName;
      this.renewelCompanyName =  sessionStorage.renewelCompanyName;
      this.typeList =  sessionStorage.typeList;
      this.enquiryFormData = JSON.parse(sessionStorage.enquiryFormData);
      this.bikeListDetails = JSON.parse(sessionStorage.bikeListDetails);

      // alert('ngonit')
      //   this.vehicalDetails['controls'].city.patchValue(null);
      //   this.vehicalDetails['controls'].regionList.patchValue(null);
      //   this.vehicalDetails['controls'].manufacture.patchValue(null);
      //   this.vehicalDetails['controls'].vehicleModel.patchValue(null);
      //   this.vehicalDetails['controls'].variant.patchValue(null);
      //   this.vehicalDetails['controls'].vehicleCC.patchValue(null);
      this.rto = sessionStorage.Rto;
      let stringToSplit;
      stringToSplit = this.bikeListDetails.vehicle_no.toUpperCase();
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
      this.getRegionLists();


      this.vehicalDetails.controls['bussiness'].patchValue(this.ListDetails.business_type);
      this.vehicalDetails.controls['manufacture'].patchValue(this.ListDetails.vehicle_manufacture);
      this.vehicalDetails.controls['vehicleModel'].patchValue(this.ListDetails.vehicle_model);
      this.vehicalDetails.controls['variant'].patchValue(this.ListDetails.vehicle_variant);
      this.vehicalDetails.controls['vehicleCC'].patchValue(this.ListDetails.vehicle_cc);
      // alert('console..')
      // console.log(this.vehicalDetails.controls['manufacture'].value,'345678....')

    }


    dataList(){
      // console.log('dataList...')
      // console.log(this.vehicalDetails.controls['vehicleCC'].value,'vehicle.....');
      this.vehicalDetails.patchValue({
        'vehicalNumber': this.ListDetails.vehicle_no,
        'registrationDate': this.datePipe.transform(this.ListDetails.registration_date, 'y-MM-dd'),
        'previousClaim': this.ListDetails.previous_claim_YN,
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

  //   if((this.bikeListDetails.business_type == '1' && this.vehicalDetails.controls['registrationDate'].value >= this.minDate) || (this.bikeListDetails.business_type != '1' && this.vehicalDetails.controls['registrationDate'].value <= this.minDate)){
  //
  // }else{
  //   this.toastr.error('Please check the Registration Date ');
  // }

    manifactureList() {
      const data = {
        'platform': 'web',
        'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
        'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
        'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
        'company_id':this.typeList=='new' ? this.newCompanyName : this.renewelCompanyName,


      }
      this.bikeService.getManifactureList(data).subscribe(
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
console.log(this.manifactureDetails,'this.manifactureDetails...')
        this.modelList1();
        console.log(this.vehicalDetails.controls['manufacture'].value,'vehicalDetails.controls.manufacture....');


      }
    }
    public manifactureFailure(error) {
    }

    // model
    modelList1() {
      console.log(this.vehicalDetails.controls.manufacture.value,'manufa')

      // alert('in Models')
      const data = {
        "platform": 'web',
        "user_id": this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
        "role_id": this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
        "pos_status": this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
        "manufacture": this.vehicalDetails.controls['manufacture'].value,
        'company_id':this.typeList=='new' ? this.newCompanyName : this.renewelCompanyName,

      }
      console.log(data,'data....')
      this.bikeService.getModelList(data).subscribe(
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
        console.log(this.modelDetails,'this.modelDetails..')
        this.variantList();

      }
    }
    public modelFailure(error) {
    }

    // variant
    variantList() {
      const data = {
        "platform": "web",
        "user_id": this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
        "role_id": this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
        "pos_status": this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
        "manufacture": this.vehicalDetails.controls['manufacture'].value,
        "model": this.vehicalDetails.controls['vehicleModel'].value,
        'company_id':this.typeList=='new' ? this.newCompanyName : this.renewelCompanyName,

      }
      this.bikeService.getvariantList(data).subscribe(
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
        console.log( this.variantDetails,' this.variantDetails...')
        this.ccList();
      }
    }
    public variantFailure(error) {
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
        'company_id':this.typeList=='new' ? this.newCompanyName : this.renewelCompanyName,


      }
      this.bikeService.getCCList(data).subscribe(
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
        console.log( this.ccDetails, "ccDetails");
      }
    }
    public ccFailure(error) {
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




    claimpercent() {
      const data = {
        'platform': 'web',
        'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
        'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
        'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0'

      }
      this.bikeService.getClaimList(data).subscribe(
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
      this.bikeService.getCityList(data).subscribe(
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
        console.log(this.cityDetails,'cityDetails......');
            //
      }
    }
    public cityFailure(error) {
    }

    getRegionLists() {
      console.log(this.vehicleRegNumber,'345678765678')
      const data = {
        'platform': 'web',
        'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
        'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
        'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
        'region_code':this.vehicleRegNumber=='-'?'':this.vehicleRegNumber,
      }
      this.bikeService.getRegionList(data).subscribe(
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


    public typeFailure(error) {
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
            if (pattern.test(event.value._i) && event.value._i.length == 10 ) {
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
            if (pattern.test(event.value._i) && event.value._i.length == 10 ) {
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
      console.log(this.vehicalDetails.controls['registrationDate'].value,'456789')
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
      console.log(this.vehicalDetails.controls['registrationDate'].value,'567879')
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
    // changeDate(){
    //   if((this.bikeListDetails.business_type == '1' && this.vehicalDetails.controls['registrationDate'].value >= this.minDate) || (this.bikeListDetails.business_type != '1' && this.vehicalDetails.controls['registrationDate'].value <= this.minDate)){
    //     alert(this.bikeListDetails.business_type)
    //     alert(this.vehicalDetails.controls['registrationDate'].value);
    //     this.regDateDetails=true;
    //     this.regDateDetails = 'Please check the Registration Date';
    //     alert(this.regDateDetails);
    //
    //   }else{
    //     this.regDateDetails=false;
    //     this.regDateDetails='';
    //     alert(this.regDateDetails);
    //
    //   }
    // }

    enquiryQuation(value) {
      if (this.vehicalDetails.controls['city'].value == '') {

        this.CityValid = true;
        console.log(this.CityValid,'cityvalid');
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
        console.log(this.CityValid,'cityvalidfalse');
      }

        if (this.getRegPolicyYear < this.getLength || this.RegYear > this.getLength ) {
          this.manfactureErrorDate=true;
          this.manfactureErrorDate = 'Manufacturing year should be equal to registration year or less than 1year from Registration year';
          // this.toastr.error('Manufacturing year should be equal to registration year or less than 1year from Registration year.');
        }else {
          this.manfactureErrorDate=false;
          this.manfactureErrorDate='';
        }


      // if(this.errorFutureDate == false) {
      //   console.log('innnnnnn');

      if(this.vehicalDetails.valid) {
        console.log(this.vehicalDetails.controls['previousClaim'].value,'previus 3245678')
          const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
            'enquiry_id': '0',
            'vehicle_no':this.vehicalDetails.controls['vehicalNumber'].value,
            // 'registration_date': this.vehicalDetails.controls['registrationDate'].value,
            'registration_date': this.datePipe.transform(this.vehicalDetails.controls['registrationDate'].value, 'y-MM-dd'),
            'previous_policy_expiry_date':this.vehicalDetails.controls['previousPolicyExpiry'].value == null ? '' :this.vehicalDetails.controls['previousPolicyExpiry'].value,
            'previous_policy_no':"12344556",
            'previous_claim_YN': this.enquiryFormData.previous_claim_YN,
            'vehicle_manufacture':this.vehicalDetails.controls['manufacture'].value||this.ListDetails.vehicle_manufacture,
            'vehicle_model':this.vehicalDetails.controls['vehicleModel'].value,
            'vehicle_variant':this.vehicalDetails.controls['variant'].value,
            'vehicle_cc':this.vehicalDetails.controls['vehicleCC'].value,
            'chassis_no':this.vehicalDetails.controls['chasissNumber'].value,
            'engine_no':this.vehicalDetails.controls['engine'].value,
            'manu_yr':this.vehicalDetails.controls['manufactureYear'].value,
            'vehicle_category':"2W",
            'ncb_percent': this.enquiryFormData.ncb_percent ,
            'previous_policy_start_date':this.vehicalDetails.controls['previousPolicyStart'].value == null ? '' : this.vehicalDetails.controls['previousPolicyStart'].value ,
            'business_type': this.vehicalDetails.controls['bussiness'].value,
            'registration_city': this.vehicalDetails.controls['city'].value,
            'region_name': this.vehicalDetails.controls['regionList'].value,
            'rto_code': this.rto,
            'type': this.enquiryFormData.type,
            'company_id':this.typeList=='new' ? this.newCompanyName : this.renewelCompanyName,
            'prev_insurer':this.enquiryFormData.previousCompany== null ? '' :this.enquiryFormData.previousCompany,
            'prev_insurance_name':this.enquiryFormData.prev_insurance_name== null ? '':this.enquiryFormData.prev_insurance_name,
          };
          sessionStorage.vehicledetails = JSON.stringify(data);
          this.bikeService.getEnquiryDetails(data).subscribe(
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
      // }else {
      //   console.log('outtttttt');
      //   this.toastr.error('Future Date is not Acceptable');
      // }
    }
    public enquirySuccess(successData){
      if (successData.IsSuccess) {


        this.QuotationList = successData.ResponseObject;
        sessionStorage.bikeEnquiryId = this.QuotationList.enquiry_id;
        this.ageCalculateInsurer('days');
        // if(this.errorFutureDate == false) {

          if (successData.status == true && this.errorFutureDate == '' && this.manfactureErrorDate == '' && (this.dobError == ''|| this.dobError ==undefined) ) {
            this.dialogRef.close();
            this.router.navigate(['/bikepremium']);
          }else if (successData.status == true ){
            this.toastr.error(successData.ErrorObject);
          }

      } else if(successData.IsSuccess==false){
          this.toastr.error(successData.ErrorObject);
        }
        //   this.toastr.error('Please check');


      // }else {
      //   console.log('outtttttt');
      //   this.toastr.error('Future Date is not Acceptable');
      // }


    }
    public enquiryFailure(error) {
    }
// cityvalid(){
//       alert('innn');
//   if (this.vehicalDetails.controls['city'].value == '') {
//
//     this.CityValid = true;
//     console.log(this.CityValid,'cityvalid');
//   } else {
//     this.CityValid = false;
//     console.log(this.CityValid,'cityvalidfalse');
//   }
//
// }

    close(): void {
      this.dialogRef.close();
    }
     // days validation
    ageCalculateInsurer(getDays) {
      let a = moment(getDays, 'DD/MM/YYYY');
      let b = moment(new Date(), 'DD/MM/YYYY');
      let days = b.diff(a, 'days');
      return days;
    }

  }
