import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonService} from '../../shared/services/common.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService} from 'ngx-toastr';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-groupterm',
  templateUrl: './groupterm.component.html',
  styleUrls: ['./groupterm.component.scss']
})
export class GrouptermComponent implements OnInit {
    public terapp: FormGroup;
    public setDate: any;
    public selectDate: any;
    public productName: any;
    public pin:any;
    public title: any;
    public response: any;
    public pincodeErrors: any;

  constructor(public fb: FormBuilder, public commonservices: CommonService, public datepipe: DatePipe, public route: ActivatedRoute,public toastr: ToastrService,public dialog: MatDialog) {
      this.terapp = this.fb.group({
          'appdate': ['', Validators.required],
          'apptime': null,
          'name': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
          'contactperson':  ['', Validators.compose([Validators.required])],
          'mobile': ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}'), Validators.minLength(10)])],
          'email': ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
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
    terKeeper(values) {

        if (this.terapp.valid) {
            const data = {
                'platform': 'web',
                'product_type': 'offline',
                'appointment_date': this.setDate,
                'appointment_time': this.terapp.controls['apptime'].value,
                'company_name': this.terapp.controls['name'].value,
                'customer_mobile': this.terapp.controls['mobile'].value,
                'customer_email': this.terapp.controls['email'].value,
                'contact_person' : this.terapp.controls['contactperson'].value,
                'pincode': this.terapp.controls['pincode'].value,
                'product_name': this.terapp.controls['insurance'].value,
                'appointment_with': this.terapp.controls['appointmentwith'].value,

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
    GroupTermLifeInsurer(){
        const dialogRef = this.dialog.open(GroupTermLifeInsurer, {
            width: '1200px',
        });
        dialogRef.disableClose = true;
    }
}
@Component({
    selector: 'grouptermlifeInsurer',
    template: `        
        <div class="container">
        <div  class="row text-justify">
        
            <div class="col-sm-2">
            </div>
            <div class="col-sm-8">
                <h3 class="text-center" style="color: #EF0034"><img src="assets/img/Group-Term-Life-Insurance.png" class="logo-size"> About Group Term Life Insurance</h3>
            </div>
            <div class="col-sm-2 text-right">
                <mat-icon (click)="onNoClick()" style="cursor: pointer">close</mat-icon>
            </div>
         </div>
         <p>From the organization point of view this is the best insurance which actually protects the employees family at the time of an unforeseen eventuality. Practically there are no age restrictionsand all individuals in the age group of 18 to 60 can be covered. The coverage can be for a large sum insured, up to 60 times of basic salary and the premium per individual is very low. The annual renewable premium provides for alignment of benefits with appraisals.</p>
         <p>The Group Term Life Insurance provides for flexible benefit plans which can even provide for a percentage of salary for each year of future service until retirement date. Additional benefits like additional voluntary life top up paid by employee, critical illness, accidental death and disability and continuation benefit allowing employees to retain policy even after leaving the organization are some of the salient features available in the market.</p>
         <p>All establishments with over 10 full time permanent employees have a statutory liability to subscribe to EDLI scheme. Employers may opt for an approved life insurance scheme with equivalent or better benefits to replace the same.</p>
         <p>The benefits of opting for GTLI in lieu of EDLI gives a possible cost reduction, a uniform cover, a higher coverage, availability of riders a hassle free administration and an easy claims management.</p>
        </div>`,
})
export class GroupTermLifeInsurer {

    constructor(
        public dialogRef: MatDialogRef<GroupTermLifeInsurer>,
        @Inject(MAT_DIALOG_DATA) public data: any) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

}
