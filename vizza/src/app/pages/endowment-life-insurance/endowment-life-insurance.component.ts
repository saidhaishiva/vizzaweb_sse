import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LifeService} from '../../shared/services/life.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService} from 'ngx-toastr';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {TravelViewKeyFeaturesComponent} from '../travel-premium-list/travel-view-key-features/travel-view-key-features.component';
import {LifeViewDetailsComponent} from './life-view-details/life-view-details.component';
import {LifeCompareNowComponent} from './life-compare-now/life-compare-now.component';
import {LifeCallBackComponent} from './life-call-back/life-call-back.component';
import {AppSettings} from '../../app.settings';

@Component({
  selector: 'app-endowment-life-insurance',
  templateUrl: './endowment-life-insurance.component.html',
  styleUrls: ['./endowment-life-insurance.component.scss']
})
export class EndowmentLifeInsuranceComponent implements OnInit {
    // public Lifeapp: FormGroup;
    public setDate: any;
    public selectDate: any;
    public productName: any;
    public pin: any;
    public title: any;
    public response: any;
    public pincodeErrors: any;
    public settings: any;

    public insurerLists: any;
    public LifeProductlistAll: any;
    public LifeKeyFeature: any;
    public listAll: any;
    // firstPage: any;
    //     // secondPage: any;

    constructor(public fb: FormBuilder, public lifeservices: LifeService, public datepipe: DatePipe, public route: ActivatedRoute, public toastr: ToastrService,public dialog: MatDialog,public appSettings : AppSettings) {
      this.settings = this.appSettings.settings;
      this.settings.HomeSidenavUserBlock = false;
      this.settings.sidenavIsOpened = false;
  }

  ngOnInit() {

      this.insurerLists = [];

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


    public getDetails() {
        const data = {
          'platform': 'web',
          'userid': '0',
          'roleid': '4'
      };
        this.lifeservices.getInsurerDetails(data).subscribe(
            (successData) => {
                this.getInsurerDetailsSuccess(successData);
            },
            (error) => {
                this.getInsurerDetailsFailure(error);
            }
        );
    }

    public getInsurerDetailsSuccess(successData) {
        if (successData.IsSuccess) {
            // this.LifeProductlistAll =[];
            this.LifeProductlistAll = successData.ResponseObject;
            for (let i = 0; i < this.LifeProductlistAll.length; i++) {
                let keyfeatureArray = [];
                for (let j = 0; j < this.LifeProductlistAll[i].keyfeature.length; j++) {
                    if (this.LifeProductlistAll[i].keyfeature[j]['this_primary'] == 1) {
                        keyfeatureArray.push({
                            key_name: this.LifeProductlistAll[i].keyfeature[j].key_name,
                            key_value: this.LifeProductlistAll[i].keyfeature[j].key_value,
                            primary_key: this.LifeProductlistAll[i].keyfeature[j].primary_key
                        });
                    }
                }
                // if ( keyfeatureArray.length) {
                    this.insurerLists.push({product_id: this.LifeProductlistAll[i].product_id, product_name: this.LifeProductlistAll[i].product_name,
                        company_name: this.LifeProductlistAll[i].company_name, keyfeature: keyfeatureArray});
                // }
                console.log(keyfeatureArray, 'keyfeatureArray');
            }
            console.log(this.LifeProductlistAll, 'LifeProductlistAll');
            console.log(this.insurerLists, 'insurerListsinsurerLists');

        }
    }
    public getInsurerDetailsFailure(error) {
    }

    // view key features details
    viewDetails(value) {
        let dialogRef = this.dialog.open(LifeViewDetailsComponent, {
            width: '1500px',data: {productId : value.product_id, productName: value.product_name}
        });
        dialogRef.disableClose = true;

        dialogRef.afterClosed().subscribe(result => {
        });
    }
    //compare Now Function
    compareNow(value) {
        console.log(value, 'value');
        let dialogRef = this.dialog.open(LifeCompareNowComponent, {
            width: '2500px',data: this.LifeProductlistAll
        });
        dialogRef.disableClose = true;

        dialogRef.afterClosed().subscribe(result => {
            if(result.product_id > 0){
            this.callBack(result);
            console.log(result,'resulttt');
            }else{}
        });
        console.log(this.LifeProductlistAll);
        return this.LifeProductlistAll
    }
    //call Back Function
    callBack(value){
        let dialogRef = this.dialog.open(LifeCallBackComponent, {
            width: '800px',data: {productId : value.product_id, productName: value.product_name}
        });
        dialogRef.disableClose = true;

        dialogRef.afterClosed().subscribe(result => {
        });
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
