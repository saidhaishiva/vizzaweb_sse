import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonService} from '../../shared/services/common.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-fixappointment',
  templateUrl: './fixappointment.component.html',
  styleUrls: ['./fixappointment.component.scss']
})
export class FixappointmentComponent implements OnInit {
  public fixapp: FormGroup;
  public setDate: any;
  public selectDate: any;
  public productName: any;

  constructor(public fb: FormBuilder, public commonservices: CommonService, public datepipe: DatePipe, public route: ActivatedRoute) {
    this.fixapp = this.fb.group({
        'appdate': ['', Validators.required],
        'apptime': null,
        'name': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
        'contactperson': ['', Validators.compose([Validators.required])],
        'mobile': ['', Validators.compose([Validators.required, Validators.minLength(10)])],
        'email': ['', Validators.compose([Validators.required, Validators.email])],
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

    fixAppointment(values) {

    if (this.fixapp.valid) {
        const data = {
            'platform': 'web',
            'product_type': 'offline',
            'product_name': this.productName,
            'appointment_date': this.setDate,
            'appointment_time': this.fixapp.controls['apptime'].value,
            'customer_name': this.fixapp.controls['name'].value,
            'customer_mobile': this.fixapp.controls['mobile'].value,
            'customer_email': this.fixapp.controls['email'].value,
            'contact_person' : this.fixapp.controls['contactperson'].value,
            'pincode': this.fixapp.controls['pincode'].value,
            'insurance_type': this.fixapp.controls['insurance'].value,
            'appointment_with': this.fixapp.controls['appointmentwith'].value,

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
    public keyPress(event: any) {
        if (event.charCode !== 0) {
            const pattern = /[0-9\\ ]/;
            const inputChar = String.fromCharCode(event.charCode);

            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }

}
