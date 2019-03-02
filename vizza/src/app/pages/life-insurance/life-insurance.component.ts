import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonService} from '../../shared/services/common.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService} from 'ngx-toastr';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-life-insurance',
  templateUrl: './life-insurance.component.html',
  styleUrls: ['./life-insurance.component.scss']
})
export class LifeInsuranceComponent implements OnInit {
    // public Lifeapp: FormGroup;
    public setDate: any;
    public selectDate: any;
    public productName: any;
    public pin: any;
    public title: any;
    public response: any;
    public pincodeErrors: any;

    public insurerLists: any;
    public listAll: any;
    // firstPage: any;
    //     // secondPage: any;

  constructor(public fb: FormBuilder, public commonservices: CommonService, public datepipe: DatePipe, public route: ActivatedRoute, public toastr: ToastrService,public dialog: MatDialog) {
  //     this.Lifeapp = this.fb.group({
  //         'insurance': ['', Validators.compose([Validators.required])],
  //         'name': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
  //         'contactperson': ['', Validators.compose([Validators.required])],
  //         'mobile': ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}'), Validators.minLength(10)])],
  //         'email': ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
  //         'pincode': ['', Validators.compose([Validators.required])],
  //         'appointmentwith': ['', Validators.compose([Validators.required])],
  //         'appdate': ['', Validators.required],
  //         'apptime': null
  //     });
  //     this.productName = '';
  }

  ngOnInit() {

      // this.firstPage = true;
      // this.secondPage = false;
      this.insurerLists = [];
      this.listAll = [];

      this.getDetails();
      this.setDate = Date.now();
      this.setDate = this.datepipe.transform(this.setDate, 'y-MM-dd');
      this.route.params.forEach((params) => {
          this.productName = params.id;

      });
  }
    lifeInsurance(){

    }
    // addEvent(event) {
    //     this.selectDate = event.value;
    //     this.setDate = this.datepipe.transform(this.selectDate, 'y-MM-dd');
    // }
    // LifeKeeper(value) {
    //     if (this.Lifeapp.valid) {
    //             this.firstPage = false;
    //             this.secondPage = true;
    //
    //         // const data = {
    //         //     'platform': 'web',
    //         //     'product_type': 'offline',
    //         //     'appointment_date': this.setDate,
    //         //     'appointment_time': "10.00 PM",
    //         //     'company_name': this.Lifeapp.controls['name'].value,
    //         //     'customer_mobile': this.Lifeapp.controls['mobile'].value,
    //         //     'customer_email': this.Lifeapp.controls['email'].value,
    //         //     'contact_person' : this.Lifeapp.controls['contactperson'].value,
    //         //     'pincode': this.Lifeapp.controls['pincode'].value,
    //         //     'product_name': this.Lifeapp.controls['insurance'].value,
    //         //     'appointment_with': this.Lifeapp.controls['appointmentwith'].value,
    //
    //     //     };
    //     //
    //     //     this.commonservices.setFixAppointment(data).subscribe(
    //     //         (successData) => {
    //     //             this.fixAppointmentSuccess(successData);
    //     //         },
    //     //         (error) => {
    //     //             this.fixAppointmentFailure(error);
    //     //         }
    //     //     );
    //     }
    // }
    // fixAppointmentSuccess(successData) {
    //     this.firstPage = false;
    //     this.secondPage = true;
    // }
    // fixAppointmentFailure(error) {
    // }
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
        } else {
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
    // public keyPress(event: any) {
    //     if (event.charCode !== 0) {
    //         const pattern = /[0-9\\ ]/;
    //         const inputChar = String.fromCharCode(event.charCode);
    //
    //         if (!pattern.test(inputChar)) {
    //             event.preventDefault();
    //         }
    //     }
    // }

    public tab() {
        console.log(this.listAll);
        return this.listAll;
    }

    public getDetails() {
        const data = {
          'platform': 'web',
          'userid': '0',
          'roleid': '4'
      };
        this.commonservices.getInsurerDetails(data).subscribe(
            (successData) => {
                this.getInsurerDetailsSuccess(successData);
            },
            (error) => {
                this.getInsurerDetailsFailure(error);
            }
        );
    }

    public getInsurerDetailsSuccess(successData) {
        this.listAll.push(successData.ResponseObject);
        console.log(this.listAll);
        let all= [];
        if (successData.IsSuccess) {
            for (let i = 0; i < successData.ResponseObject.length; i++) {
                let keyfeatureArray = [];
                for ( let j = 0; j < successData.ResponseObject[i].keyfeature.length; j++) {
                    if (successData.ResponseObject[i].keyfeature[j]['primary_key'] == 1) {
                        keyfeatureArray.push({
                                                key_name: successData.ResponseObject[i].keyfeature[j].key_name,
                                                key_value: successData.ResponseObject[i].keyfeature[j].key_value,
                                                primary_key: successData.ResponseObject[i].keyfeature[j].primary_key
                        });
                    }
                }
                if ( keyfeatureArray.length > 0) {
                    this.insurerLists.push({product_name: successData.ResponseObject[i].product_name,
                        company_name: successData.ResponseObject[i].company_name, keyfeature: keyfeatureArray});
                }

            }
            console.log(this.insurerLists);
            // let id = 1;
        }
    }

    public getInsurerDetailsFailure(error) {
    }
    // lifeInsurance(){
    //     this.firstPage = true;
    //     this.secondPage = false;
    // }

    // LifeInsurer(){
    //     const dialogRef = this.dialog.open(LifeInsurer, {
    //         width: '1200px',
    //     });
    //     dialogRef.disableClose = true;
    // }

}
// @Component({
//     selector: 'lifeinsurer',
//     template: `
//         <div class="container">
//         <div  class="row text-justify">
//
//             <div class="col-sm-2">
//             </div>
//             <div class="col-sm-8">
//                 <h4 class="text-center" style="color: #A521B3 "><img src="assets/img/life-insurances.png" class="logo-size"> About Life Insurance</h4>
//             </div>
//             <div class="col-sm-2 text-right">
//                 <mat-icon (click)="onNoClick()" style="cursor: pointer">close</mat-icon>
//             </div>
//             <p>Life insurance is a must for every individual as it provides financial succour through a lump sum payment when the untimely death of the bread winner happens. There are a wide range of products which ensure the financial safety amongst which the endowment plans are considered as the best. It serves the purpose of liquidity, investment, collateral security and savings in tax. Endowment policies are the best when lump sum money is required. The policies can be taken with bonus or without bonus.</p>
//             <p>Additional sum insured can be opted for death due to accidents and additional cover is available for major diseases. Nomination and assignments can be done and loans are available on the policy. Lapsed policies can be revived.</p>
//          </div>
//         </div>`,
// })
// export class LifeInsurer {
//
//     constructor(
//         public dialogRef: MatDialogRef<LifeInsurer>,
//         @Inject(MAT_DIALOG_DATA) public data: any) {}
//
//     onNoClick(): void {
//         this.dialogRef.close();
//     }
//
// }
