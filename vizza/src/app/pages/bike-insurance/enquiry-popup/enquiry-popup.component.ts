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
  constructor(public fb: FormBuilder, public bikeService: BikeInsuranceService, public router: Router, public datePipe: DatePipe, public validation: ValidationService, public datepipe: DatePipe, public route: ActivatedRoute, public auth: AuthService, public toastr: ToastrService,
  public dialogRef: MatDialogRef<EnquiryPopupComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any) {
    this.ListDetails = this.data.listData;
  console.log(this.ListDetails, 'this.ListDetails');
    this.vehicalDetails = this.fb.group({
      'vehicalNumber': '',
      'registrationDate': '',
      'previousClaim': '',
      'claimamount': '',
      'enquiry': '',
      'vehicleModel': '',
      'manufacture':'',
      'bussiness':'',
      'ncb':'',
      'manufactureYear':'',
      'vehicleCC':'',
      'variant': '',
      'chasissNumber':'',
      'engine':'',
      'previousPolicyExpiry':'',
      'previousPolicyStart':''
    });
   console.log(this.dataList, 'hgfgdjgh');
  }

  ngOnInit() {
    this.claimpercent();
    this.manifactureList();
    this.bussinessType();
    this.dataList();
    this.modelList1();


  }
  dataList(){
    this.vehicalDetails.patchValue({
      'vehicalNumber': this.ListDetails.vehicle_no,
      'registrationDate': this.datePipe.transform(this.ListDetails.registration_date, 'y-MM-dd'),
      'previousClaim': this.ListDetails.previous_claim_YN,
      'claimamount': this.ListDetails.claim_amount,
      'enquiry': this.ListDetails.enquiry_id,
      'vehicleModel': this.ListDetails.vehicle_model,
      'manufacture': this.ListDetails.vehicle_manufacture,
      'bussiness': this.ListDetails.business_type,
      'ncb': this.ListDetails.ncb_amount,
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

  claim(){
    if(this.vehicalDetails.controls['previousClaim'].value == 'Yes'){
      this.claimAmountDetails = true;
    } else {
      this.claimAmountDetails = false;

    }
    sessionStorage.claimDetail = this.claimAmountDetails;
  }


  // model
  modelList1() {
    const data = {
      'platform': 'web',
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
      'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
      'manufacture': this.vehicalDetails.controls['manufacture'].value

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
      this.variantList();
      this.ccList();
    }
  }
  public modelFailure(error) {
  }
  // variant
  variantList() {
    const data = {
      'platform': 'web',
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
      'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
      'manufacture': this.vehicalDetails.controls['manufacture'].value


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
      'manufacture': this.vehicalDetails.controls['manufacture'].value


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

  bussinessType() {
    const data = {
      'platform': 'web',
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
      'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0'

    }
    this.bikeService.getBuissnessList(data).subscribe(
        (successData) => {
          this.typeSuccess(successData);
        },
        (error) => {
          this.typeFailure(error);
        }
    );
  }
  public typeSuccess(successData){
    if (successData.IsSuccess) {
      this.bussinessList = successData.ResponseObject;
    }
  }
  public typeFailure(error) {
  }
  manufactureYear(){
    let start = new Date(this.vehicalDetails.controls['previousPolicyStart'].value);
    let getPolicyYear = start.getFullYear();
    console.log(getPolicyYear,'getPolicyYear');
    let getLength = this.vehicalDetails.controls['manufactureYear'].value;
    if(getLength.length == 4) {
      if(getPolicyYear >= this.vehicalDetails.controls['manufactureYear'].value){
      }  else {
        this.toastr.error('Manufacture Year should be less than Registration Year');
      }
    }

  }
  enquiryQuation(value) {
    const data = {
      'platform': 'web',
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
      'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
      'enquiry_id': 0,
      'vehicle_no':this.vehicalDetails.controls['vehicalNumber'].value,
      'registration_date': this.vehicalDetails.controls['registrationDate'].value,
      'previous_policy_expiry_date':this.vehicalDetails.controls['previousPolicyExpiry'].value,
      'previous_policy_no':"12344556",
      'previous_claim_YN': this.vehicalDetails.controls['previousClaim'].value == 'No' ? '0' : '1',
      'claim_amount':this.vehicalDetails.controls['claimamount'].value ? this.vehicalDetails.controls['claimamount'].value : '',
      'vehicle_manufacture':this.vehicalDetails.controls['manufacture'].value,
      'vehicle_model':this.vehicalDetails.controls['vehicleModel'].value,
      'vehicle_variant':this.vehicalDetails.controls['variant'].value,
      'vehicle_cc':this.vehicalDetails.controls['vehicleCC'].value,
      'chassis_no':this.vehicalDetails.controls['chasissNumber'].value,
      'engine_no':this.vehicalDetails.controls['engine'].value,
      'manu_yr':this.vehicalDetails.controls['manufactureYear'].value,
      'vehicle_category':"2W",
      'ncb_percent': this.vehicalDetails.controls['ncb'].value,
      'previous_policy_start_date':this.vehicalDetails.controls['previousPolicyStart'].value,
      'business_type': this.vehicalDetails.controls['bussiness'].value

    }
    this.bikeService.getEnquiryDetails(data).subscribe(
        (successData) => {
          this.enquirySuccess(successData);
        },
        (error) => {
          this.enquiryFailure(error);
        }
    );
  }
  public enquirySuccess(successData){
    if (successData.IsSuccess) {
      this.QuotationList = successData.ResponseObject;
      console.log(this.QuotationList, ' this.QuotationList');
      sessionStorage.bikeEnquiryId = this.QuotationList.enquiry_id;
      console.log(this.QuotationList,'jhkhjgkj');
      if(successData.status == true){
        this.dialogRef.close();
        this.router.navigate(['/bikepremium']);
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
