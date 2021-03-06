import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonService} from '../../shared/services/common.service';
import {DatePipe} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-special-contigency-policy',
  templateUrl: './special-contigency-policy.component.html',
  styleUrls: ['./special-contigency-policy.component.scss']
})

export class SpecialContigencyPolicyComponent implements OnInit {
  public specialPolicy: FormGroup;
  public setDate: any;
  public selectDate: any;
  public productName: any;
  public pin:any;
  public title: any;
  public response: any;
  public pincodeErrors: any;
  constructor(public fb: FormBuilder, public commonservices: CommonService, public datepipe: DatePipe, public route: ActivatedRoute,public toastr: ToastrService) {
    this.specialPolicy = this.fb.group({
      'appdate': ['', Validators.required],
      'apptime': null,
      'name': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'contactperson':  ['', Validators.compose([Validators.required])],
      'mobile': ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}'), Validators.minLength(10)])],
      'email': ['', Validators.compose([Validators.required,  Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
      'pincode': ['', Validators.compose([Validators.required])],
      'insurance': ['',Validators.compose([Validators.required])],
      'appointmentwith': ['',Validators.compose([Validators.required])]
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
  addEvent(event) {
    this.selectDate = event.value;
    this.setDate = this.datepipe.transform(this.selectDate, 'y-MM-dd');
  }
  banKeeper(values) {

    if (this.specialPolicy.valid) {
      const data = {
        'platform': 'web',
        'product_type': 'offline',
        'appointment_date': this.setDate,
        'appointment_time': this.specialPolicy.controls['apptime'].value,
        'company_name': this.specialPolicy.controls['name'].value,
        'customer_mobile': this.specialPolicy.controls['mobile'].value,
        'customer_email': this.specialPolicy.controls['email'].value,
        'contact_person' : this.specialPolicy.controls['contactperson'].value,
        'pincode': this.specialPolicy.controls['pincode'].value,
        'product_name': this.specialPolicy.controls['insurance'].value,
        'appointment_with': this.specialPolicy.controls['appointmentwith'].value,

      };

      this.commonservices.setFixAppointment(data).subscribe(
          (successData) => {
            this.fixAppointmentSuccess(successData);
          },
          (error) => {
            this.fixAppointmentFailure(error);
          }
      );
    }
  }
  fixAppointmentSuccess(successData) {
  }
  fixAppointmentFailure(error) {
  }
  getPincodeDetails(pin, title) {
    this.pin = pin;
    this.title = title;
    const data = {
      'platform': 'web',
      'postalcode': this.pin
    }
    if (this.pin.length == 6) {
      this.commonservices.getPincodeDetails(data).subscribe(
          (successData) => {
            this.getPincodeDetailsSuccess(successData);
          },
          (error) => {
            this.getPincodeDetailsFailure(error);
          }
      );
    }
  }
  public getPincodeDetailsSuccess(successData) {
    if (successData.ErrorObject) {
      this.toastr.error(successData.ErrorObject);
      this.pincodeErrors = false;
    }else {
      this.pincodeErrors = true;
    }
  }

  public getPincodeDetailsFailure(error) {
  }
  public keyPress(event: any) {
    if (event.charCode !== 0) {
      const pattern = /[0-9\\ ]/;
      const inputChar = String.fromCharCode(event.charCode);

      if (!pattern.test(inputChar)) {
        event.preventDefault();
      }
    }
  }
  public data(event: any) {
    if (event.charCode !== 0) {
      const pattern = /[a-zA-Z\\ ]/;
      const inputChar = String.fromCharCode(event.charCode);
      if (!pattern.test(inputChar)) {
        event.preventDefault();
      }
    }
  }

}
