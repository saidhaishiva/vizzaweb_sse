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
  public vehicledetailsfw : any;
  public cityDetails : any;
  public vehicalNo : any;
  public options : any;
  public config : any;
  public rto : any;
  public citySettings : any;
  public getDays : any;
  public CityValid : boolean;
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
      'city': ['', Validators.required]
    });
    this.getDays = this.datePipe.transform(this.ListDetails.previous_policy_start_date, 'y-MM-dd');

    console.log(this.dataList, 'hgfgdjgh');
    this.config = {
      displayKey: "city", //if objects array passed which key to be displayed defaults to description
      search: true,
      limitTo: 5
    };

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
    // this.vehicledetailsfw = JSON.parse(sessionStorage.vehicledetailsfw);
    this.rto = sessionStorage.RtoFour;

    this.claimpercent();
    this.manifactureList();
    this.dataList();
    this.getCityLists();

  }
  dataList(){
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
  }
  /// manufacture
  manifactureList() {
    const data = {
      'platform': 'web',
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
      'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0'

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
        'variant':  this.vehicalDetails.controls['variant'].value

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
        this.modelList1();


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
      'variant':  this.vehicalDetails.controls['variant'].value

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


  manufactureYear(){
    let start = new Date(this.vehicalDetails.controls['registrationDate'].value);
    let getRegPolicyYear = start.getFullYear();
    let RegYear = start.getFullYear()-1;
    console.log(getRegPolicyYear,'getPolicyYear');
    let getLength = this.vehicalDetails.controls['manufactureYear'].value;
    console.log(getLength, 'getLengthgetLength');
    if(getLength.length == 4) {
      if(getRegPolicyYear < getLength ){
        console.log(getLength, 'getLength');
        this.toastr.error("Manufacturing year should be equal to registration year or less than  Year of registration.");
      }

    }

  }
  enquiryQuation(value) {
    if( this.vehicalDetails.controls['city'].value == ''){
      this.CityValid = true;
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
      'prev_insurance_name': this.enquiryFormData.prev_insurance_name

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
    }
  }
  public enquirySuccess(successData){
    if (successData.IsSuccess) {
      this.QuotationList = successData.ResponseObject;
      console.log(this.QuotationList, ' this.QuotationList');
      sessionStorage.fwEnquiryId = this.QuotationList.enquiry_id;
      console.log(this.QuotationList,'jhkhjgkj');
        if(successData.status == true){
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
