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
        'mobile': ['', Validators.compose([Validators.required, Validators.minLength(10)])],
        'email': ['', Validators.compose([Validators.required, Validators.email])]
    });
    this.productName = '';

  }

  ngOnInit() {
      this.setDate = Date.now();
      this.setDate = this.datepipe.transform(this.setDate, 'y-MM-dd');
      this.fixapp.controls['apptime'].patchValue('00:00');
      this.route.params.forEach((params) => {
          console.log(params.id);
          this.productName = params.id;
      });
  }
    addEvent(event) {
        this.selectDate = event.value;
        this.setDate = this.datepipe.transform(this.selectDate, 'y-MM-dd');
    }

    fixAppointment() {
    if (this.fixapp.valid) {
        const data = {
            'platform': 'web',
            'product_type': 'offline',
            'product_name': this.productName,
            'appointment_date': this.setDate,
            'appointment_time': this.fixapp.controls['apptime'].value,
            'customer_name': this.fixapp.controls['name'].value,
            'customer_mobile': this.fixapp.controls['mobile'].value,
            'customer_email': this.fixapp.controls['email'].value

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
    console.log(successData);
    }
    fixAppointmentFailure(error) {
        console.log(error);
    }

}
