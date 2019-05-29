import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BikeInsuranceService} from '../../../shared/services/bike-insurance.service';
import {DatePipe} from '@angular/common';
import {ValidationService} from '../../../shared/services/validation.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../shared/services/auth.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-enquiry-popup',
  templateUrl: './enquiry-popup.component.html',
  styleUrls: ['./enquiry-popup.component.scss']
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
  constructor(public fb: FormBuilder, public bikeService: BikeInsuranceService, public router: Router, public datePipe: DatePipe, public validation: ValidationService, public datepipe: DatePipe, public route: ActivatedRoute, public auth: AuthService, public toastr: ToastrService) {
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
  }

  ngOnInit() {
    this.claimpercent();
    this.manifactureList();
    this.sessionData();

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
  enquiryQuation() {
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
      'ncb_amount': '',
      'previous_policy_start_date':this.vehicalDetails.controls['previousPolicyStart'].value

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
      sessionStorage.bikeEnquiryId = this.QuotationList.enquiry_id;
      console.log(this.QuotationList,'jhkhjgkj');
      this.router.navigate(['/bikepremium']);

    } else {
      this.toastr.error(successData.ErrorObject);

    }
  }
  public enquiryFailure(error) {
  }
  sessionData() {
    if (sessionStorage.enquiryFormData != '' && sessionStorage.enquiryFormData != undefined) {
      let stepper = JSON.parse(sessionStorage.enquiryFormData);
      this.vehicalDetails = this.fb.group({
        'enquiry': stepper.enquiry,
        'manufacture': stepper.manufacture,
        'manufactureYear': stepper.manufactureYear,
        'vehicleCC': stepper.vehicleCC,
        'variant': stepper.variant,
        'chasissNumber': stepper.chasissNumber,
        'engine': stepper.engine,
        'ncb':stepper.ncb,
        'previousPolicyExpiry':this.datePipe.transform(stepper.previousPolicyExpiry, 'y-MM-dd'),
        'previousPolicyStart': this.datePipe.transform(stepper.previousPolicyStart, 'y-MM-dd'),
        'vehicleModel': stepper.vehicleModel,
      });
    }
    if (sessionStorage.bikeEnquiryId != '' && sessionStorage.bikeEnquiryId != undefined) {
      this.bikeEnquiryId = sessionStorage.bikeEnquiryId;
    }

  }

}
