import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Settings} from '../../app.settings.model';
import {BikeInsuranceService} from '../../shared/services/bike-insurance.service';
import {DatePipe} from '@angular/common';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {ValidationService} from '../../shared/services/validation.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material';
import {AppSettings} from '../../app.settings';
import {CommonService} from '../../shared/services/common.service';
import {EnquiryPopupComponent} from '../bike-insurance/enquiry-popup/enquiry-popup.component';

@Component({
  selector: 'app-four-wheeler-home',
  templateUrl: './four-wheeler-home.component.html',
  styleUrls: ['./four-wheeler-home.component.scss']
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
  public listDetails: boolean;
  public expiry: boolean;
  public previousDate: boolean;
  public showSelf: boolean;

  constructor(public fb: FormBuilder, public bikeService: BikeInsuranceService, public datePipe: DatePipe, public config: ConfigurationService, public validation: ValidationService, public datepipe: DatePipe, public route: ActivatedRoute, public auth: AuthService, public toastr: ToastrService, public dialog: MatDialog, public appSettings: AppSettings, public router: Router, public commonservices: CommonService, public toast: ToastrService) {
    const minDate = new Date();
    this.minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
    this.settings = this.appSettings.settings;
    this.listDetails = false;

    this.fourWheeler = this.fb.group({
      'vehicalNumber': ['', Validators.required],
      'registrationDate': ['', Validators.required],
      'previousClaim': 'Yes',
      'enquiry': '',
      'bussiness': '',
      'ncb': '',
      'previousPolicyExpiry': '',
      'previousPolicyStart': '',
      'previousCompany': ''
    });
    this.expiry = false;
    this.showSelf = false;
    this.previousDate = true;
    this.typeList = 'new';

  }

  ngOnInit() {
    this.claimpercent();
    this.bussinessType();
    this.getpreviousCompany();
    this.sessionData();


  }

  setSession() {
    sessionStorage.enquiryFormData = JSON.stringify(this.fourWheeler.value);
  }

  changeNcbAmt() {
    if (this.fourWheeler.controls['previousClaim'].value == 'No') {
    } else {
      this.fourWheeler.controls['ncb'].patchValue('');
    }
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
    console.log(event, 'eventevent');
    let selectedDate = '';
    let dob = '';
    const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
    if (event.value != null) {

      dob = this.datepipe.transform(event.value, 'y-MM-dd');

      if (typeof event.value._i == 'string') {
        if (type == 'regitser') {
          if (pattern.test(event.value._i) && event.value._i.length == 10) {
            this.dobError = '';
          } else {
            this.dobError = 'Enter Valid Date';
          }
        }
      }
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

  // home bike
  quationFirstStep(value) {
    sessionStorage.enquiryFormData = JSON.stringify(value);
    const data = {
      "platform": "web",
      "created_by": "0",
      "role_id": this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
      "user_id": this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      "enquiry_id": 0,
      "pos_status": this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
      "vehicle_no": this.fourWheeler.controls['vehicalNumber'].value,
      "registration_date": this.fourWheeler.controls['registrationDate'].value,
      "previous_claim_YN": this.fourWheeler.controls['previousClaim'].value == 'No' ? '0' : '1',
      "previous_policy_expiry_date": this.fourWheeler.controls['previousPolicyExpiry'].value ? this.fourWheeler.controls['previousPolicyExpiry'].value : '',
      "previous_policy_start_date": this.fourWheeler.controls['previousPolicyStart'].value ? this.fourWheeler.controls['previousPolicyStart'].value : '',
      "type": this.typeList,
      "ncb_percent": this.fourWheeler.controls['ncb'].value ? this.fourWheeler.controls['ncb'].value : '0',
      "prev_insurance_name": this.fourWheeler.controls['previousCompany'].value ? this.fourWheeler.controls['previousCompany'].value : '',
    }
    console.log(data, 'data');
    this.bikeService.getMotorHomeDetails(data).subscribe(
        (successData) => {
          this.bikeDetailsSuccess(successData, data);
        },
        (error) => {
          this.bikeDetailsFailure(error);
        }
    );
  }

  public bikeDetailsSuccess(successData, data) {
    if (successData.IsSuccess) {
      this.bikeList = successData.ResponseObject;
      console.log(this.bikeList, 'hgdj');
      this.enquiry = this.bikeList;
      sessionStorage.bikeListDetails = JSON.stringify(this.bikeList);
      sessionStorage.bikeEnquiryId = this.bikeList.enquiry_id;
      sessionStorage.enquiryFormData = JSON.stringify(data);
      if (this.fourWheeler.valid) {
        let dialogRef = this.dialog.open(EnquiryPopupComponent, {
          width: '1500px', data: {listData: successData.ResponseObject, disableClose: true},
          height: '1200'
        })
        dialogRef.disableClose = true;
        dialogRef.afterClosed().subscribe(result => {
        });

      }

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
    this.bikeService.getClaimList(data).subscribe(
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
    this.bikeService.getCompanyDetails(data).subscribe(
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

  public typeSuccess(successData) {
    if (successData.IsSuccess) {
      this.bussinessList = successData.ResponseObject;
    }
  }

  public typeFailure(error) {
  }

  idValidate(event: any) {
    this.validation.idValidate(event);
  }

  sessionData() {
    if (sessionStorage.enquiryFormData != '' && sessionStorage.enquiryFormData != undefined) {
      let stepper = JSON.parse(sessionStorage.enquiryFormData);
      this.fourWheeler = this.fb.group({
        'vehicalNumber': stepper.vehicalNumber,
        'registrationDate': this.datePipe.transform(stepper.registrationDate, 'y-MM-dd'),
        'previousClaim': stepper.previousClaim,
        'enquiry': stepper.enquiry,
        'bussiness': stepper.bussiness,
        'ncb': stepper.ncb,
        'previousPolicyExpiry': this.datePipe.transform(stepper.previousPolicyExpiry, 'y-MM-dd'),
        'previousPolicyStart': this.datePipe.transform(stepper.previousPolicyStart, 'y-MM-dd'),
        'previousCompany': stepper.previousCompany
      });

    }
    if (sessionStorage.bikeEnquiryId != '' && sessionStorage.bikeEnquiryId != undefined) {
      this.bikeEnquiryId = sessionStorage.bikeEnquiryId;
    }

  }


  getType(event) {
    console.log(event, 'value');
    this.typeList = '';
    if (event == 0) {
      this.typeList = 'new';
      console.log(this.typeList,'0');
    } else {
      this.typeList = 'other';
      console.log(this.typeList,'1');

    }


  }
}
