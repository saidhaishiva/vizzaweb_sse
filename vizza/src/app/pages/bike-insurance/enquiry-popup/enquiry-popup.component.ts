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
    public claimAmountDetails : any;
    public ListDetails : any;
    public bussinessList : any;
    public enquiryFormData : any;
    public bikeListDetails : any;
    public cityDetails : any;
    public vehicalNo : any;
    public options : any;
    public config : any;
    public getDays : any;
    public rto : any;
    public maxDateValidate:any;
    public getRegPolicyYear:any;
    public errorFutureDate:any;
    public manfactureErrorDate:any;
    public minDate:any;
    public maxDate:any;
    public CityValid : boolean;
    constructor(public fb: FormBuilder, public bikeService: BikeInsuranceService, public router: Router, public datePipe: DatePipe, public validation: ValidationService, public datepipe: DatePipe, public route: ActivatedRoute, public auth: AuthService, public toastr: ToastrService,
    public dialogRef: MatDialogRef<EnquiryPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.ListDetails = this.data.listData;
      this.vehicalNo = this.ListDetails.vehicalNumber;
      this.vehicalDetails = this.fb.group({
        'vehicalNumber':  '',
        'registrationDate':  ['', Validators.required],
        'previousClaim': '',
        'enquiry': '',
        'vehicleModel':  ['', Validators.required],
        'manufacture': ['', Validators.required],
        'bussiness': '',
        'ncb': ['', Validators.required],
        'manufactureYear': ['', Validators.required],
        'vehicleCC': ['', Validators.required],
        'variant':  ['', Validators.required],
        'chasissNumber': ['', Validators.required],
        'engine': ['', Validators.required],
        'previousPolicyExpiry':'',
        'previousPolicyStart': '',
        'city': ['', Validators.required]
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

    }

    ngOnInit() {
      this.enquiryFormData = JSON.parse(sessionStorage.enquiryFormData);
      this.bikeListDetails = JSON.parse(sessionStorage.bikeListDetails);
      this.rto = sessionStorage.Rto;
      this.claimpercent();
      this.manifactureList();
      this.dataList();
      this.getCityLists();
      this.vehicalDetails.controls['bussiness'].patchValue(this.ListDetails.business_type);

    }
    dataList(){
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
  }
                               /// manufacture
    manifactureList() {
      const data = {
        'platform': 'web',
        'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
        'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
        'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0'

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
        this.variantList();

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

    // variant
    variantList() {
      const data = {
        'platform': 'web',
        'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
        'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
        'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
        'manufacture': this.vehicalDetails.controls['manufacture'].value,
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
        this.modelList1();
      }
    }
    public variantFailure(error) {
    }

    // model
    modelList1() {
      const data = {
        'platform': 'web',
        'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
        'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
        'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
        'manufacture': this.vehicalDetails.controls['manufacture'].value,
        'variant':  this.vehicalDetails.controls['variant'].value
      }
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
        this.ccList();

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
        'variant':  this.vehicalDetails.controls['variant'].value

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
            //
      }
    }
    public cityFailure(error) {
    }


    public typeFailure(error) {
    }


    // manufactureYear(){
    //   let start = new Date(this.vehicalDetails.controls['registrationDate'].value);
    //   this.getRegPolicyYear = start.getFullYear();
    //   let RegYear = start.getFullYear()-1;
    //   let manStart = new Date(this.vehicalDetails.controls['manufactureYear'].value);
    //   let getLength = manStart.getFullYear();
    //   console.log( getLength,' getLength');
    //   // if(getLength.length == 4) {
    //     if(this.getRegPolicyYear <= getLength ){
    //       alert('success')
    //       this.manfactureErrorDate=true;
    //       this.manfactureErrorDate='';
    //       console.log(this.manfactureErrorDate,'manfactureErrorDate');
    //     }else{
    //       this.manfactureErrorDate=false;
    //       alert('error inn');
    //       console.log(this.manfactureErrorDate,'false man')
    //       this.manfactureErrorDate='Manufacturing year should be equal to registration year or less than  Year of registration.';
    //
    //       // this.toastr.error("Manufacturing year should be equal to registration year or less than  Year of registration.");
    //
    //     }
    //
    //   }
    //
    // // }

    manufactureYear(){
      let start = new Date(this.vehicalDetails.controls['registrationDate'].value);
      let getRegPolicyYear = start.getFullYear();
      let RegYear = start.getFullYear()-1;
      console.log(getRegPolicyYear,'getPolicyYear');
      let getLength = this.vehicalDetails.controls['manufactureYear'].value;
      console.log(getLength, 'getLengthgetLength');
      if(getLength.length == 4) {
        if(getRegPolicyYear < getLength ){
          this.toastr.error("Manufacturing year should be equal to registration year or less than 1year from Registration year.");
        }

      }

    }



    maxDatechange(){
      let startDate = new Date(this.vehicalDetails.controls['registrationDate'].value);
      let regPolicyYear = startDate.getFullYear();
      console.log(regPolicyYear,'registeryear');
      this.maxDateValidate =this.maxDate.getFullYear();
      console.log(this.maxDateValidate,'maxyear');

      if(this.maxDateValidate < regPolicyYear){
        this.errorFutureDate=true;
        this.errorFutureDate ='Future Year is not Acceptable';
      }else{
        this.errorFutureDate=false;
        this.errorFutureDate='';
      }

    }
    enquiryQuation(value) {
      // if(this.errorFutureDate == false) {
      //   console.log('innnnnnn');
        if (this.vehicalDetails.controls['city'].value == '') {

          this.CityValid = true;
          console.log(this.CityValid,'cityvalid');
        } else {
          this.CityValid = false;
          console.log(this.CityValid,'cityvalidfalse');
        }

      if(this.vehicalDetails.valid) {
          const data = {
        'platform': 'web',
        'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
        'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
        'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
        'enquiry_id': '0',
        'vehicle_no':this.vehicalDetails.controls['vehicalNumber'].value,
        'registration_date': this.vehicalDetails.controls['registrationDate'].value,
        'previous_policy_expiry_date':this.vehicalDetails.controls['previousPolicyExpiry'].value == null ? '' :this.vehicalDetails.controls['previousPolicyExpiry'].value,
        'previous_policy_no':"12344556",
        'previous_claim_YN': this.vehicalDetails.controls['previousClaim'].value == 'No' ? '0' : '1',
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
        'business_type': this.vehicalDetails.controls['bussiness'].value,
        'registration_city': this.vehicalDetails.controls['city'].value,
        'rto_code': this.rto,
        'type': this.enquiryFormData.type,
         'prev_insurer':this.enquiryFormData.previousCompany
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
          if(successData.status == true && this.errorFutureDate=='' ) {
            this.dialogRef.close();
            this.router.navigate(['/bikepremium']);
          }

      } else  if(successData.status == true ){
        this.toastr.error(successData.ErrorObject);
        //   this.toastr.error('Please check');

      }
      // }else {
      //   console.log('outtttttt');
      //   this.toastr.error('Future Date is not Acceptable');
      // }


    }
    public enquiryFailure(error) {
    }


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
