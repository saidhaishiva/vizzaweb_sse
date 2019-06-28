import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonService} from '../../shared/services/common.service';
import {DatePipe} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material';
import {ValidationService} from '../../shared/services/validation.service';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-bajaj-gold-suraksha',
  templateUrl: './bajaj-gold-suraksha.component.html',
  styleUrls: ['./bajaj-gold-suraksha.component.scss']
})
export class BajajGoldSurakshaComponent implements OnInit {
  public bajajgold: FormGroup;
  public setDate: any;
  public selectDate: any;
  public productName: any;
  public pin:any;
  public title: any;
  public response: any;
  public pincodeErrors: any;

  constructor(public fb: FormBuilder, public commonservices: CommonService,public auth: AuthService, public validation: ValidationService,public datepipe: DatePipe, public route: ActivatedRoute, public toastr: ToastrService, public dialog: MatDialog) {
    this.bajajgold = this.fb.group({
      'gender': ['', Validators.required],
      'fname': ['', Validators.required],
      'lname': ['', Validators.required],
      'frequency': ['', Validators.required],
      'dob': ['', Validators.required],
      'mobile': ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}'), Validators.minLength(10)])],
      'email': ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
      'pincode': ['', Validators.required],
      'paymentTerm': ['', Validators.required],
      'policyTerm': ['', Validators.required],
      'premium': ['', Validators.required]
    });
    this.productName = '';
  }

  ngOnInit() {
    this.setDate = Date.now();
    this.setDate = this.datepipe.transform(this.setDate, 'y-MM-dd');
    this.route.params.forEach((params) => {
      this.productName = params.id;

    });
  }
  FireInsurer() {

  }
  addEvent(event) {
    this.selectDate = event.value;
    this.setDate = this.datepipe.transform(this.selectDate, 'y-MM-dd');
  }
  getSubmitDetails(values) {

    if (this.bajajgold.valid) {
      const data = {
        "platform": "web",
        "created_by": "0",
        'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
        'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
        'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
        "firstName": this.bajajgold.controls['fname'].value,
        "lastName":this.bajajgold.controls['lname'].value,
        "dob": this.bajajgold.controls['dob'].value,
        "gender": this.bajajgold.controls['gender'].value,
        "mobile": this.bajajgold.controls['mobile'].value,
        "email": this.bajajgold.controls['email'].value,
        "pincode": this.bajajgold.controls['pincode'].value,
        "policyTerm": this.bajajgold.controls['policyTerm'].value,
        "paymentTerm": this.bajajgold.controls['paymentTerm'].value,
        "premium":this.bajajgold.controls['premium'].value,
        "paymentFrequency": this.bajajgold.controls['frequency'].value,

      };

      this.commonservices.getUpdateDetails(data).subscribe(
          (successData) => {
            this.getUpdateSuccess(successData);
          },
          (error) => {
            this.getUpdateFailure(error);
          }
      );
    }
  }
  getUpdateSuccess(successData) {
  }
  getUpdateFailure(error) {
  }
  // getPincodeDetails(pin, title) {
  //   this.pin = pin;
  //   this.title = title;
  //   const data = {
  //     'platform': 'web',
  //     'postalcode': this.pin
  //   }
  //   if (this.pin.length == 6) {
  //     this.commonservices.getPincodeDetails(data).subscribe(
  //         (successData) => {
  //           this.getPincodeDetailsSuccess(successData);
  //         },
  //         (error) => {
  //           this.getPincodeDetailsFailure(error);
  //         }
  //     );
  //   }
  // }
  // public getPincodeDetailsSuccess(successData) {
  //   if (successData.ErrorObject) {
  //     this.toastr.error(successData.ErrorObject);
  //     this.pincodeErrors = false;
  //   }else {
  //     this.pincodeErrors = true;
  //   }
  // }

  // public getPincodeDetailsFailure(error) {
  // }

  numberValidate(event: any) {
    this.validation.numberValidate(event);
  }
  nameValidate(event: any) {
    this.validation.nameValidate(event);
  }
}
