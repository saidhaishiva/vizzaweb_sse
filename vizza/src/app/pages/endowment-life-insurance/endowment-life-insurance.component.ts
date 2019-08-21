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
import {AuthService} from '../../shared/services/auth.service';
import {MetaService} from '../../shared/services/meta.service';

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
    public metaLifeEndow: any;
    public metaTitle: any;
    // firstPage: any;
    //     // secondPage: any;

    constructor(public fb: FormBuilder, public lifeservices: LifeService, public datepipe: DatePipe, public route: ActivatedRoute, public toastr: ToastrService,public dialog: MatDialog,public appSettings : AppSettings, public auth: AuthService, public meta: MetaService) {
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
      this.metaList();
  }

    public metaList() {
        const data = {
            'platform': 'web',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'component_name': 'Life Insurance - Endowment'
        };
        this.meta.metaDetail(data).subscribe(
            (successData) => {
                this.metaDetailSuccess(successData);
            },
            (error) => {
                this.metaDetailFailure(error);
            }
        );
    }
    public metaDetailSuccess(successData) {
        console.log(successData.ResponseObject);
        this.metaLifeEndow = successData.ResponseObject;
        this.metaTitle = this.metaLifeEndow[0].title;
        console.log(this.metaLifeEndow[0].title, 'titl')
    }
    public metaDetailFailure(error) {
        console.log(error);
    }

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
                    this.insurerLists.push({product_id: this.LifeProductlistAll[i].product_id, product_name: this.LifeProductlistAll[i].product_name,
                        company_name: this.LifeProductlistAll[i].company_name, keyfeature: keyfeatureArray});
            }
        }
    }
    public getInsurerDetailsFailure(error) {
    }

    // view key features details
    viewDetails(value) {
        let dialogRef = this.dialog.open(LifeViewDetailsComponent, {
            width: '1500px',data: {productId : value.product_id, productName: value.product_name, companyName: value.company_name}
        });
        dialogRef.disableClose = true;
        dialogRef.afterClosed().subscribe(result => {
        });
    }
    //compare Now Function
    compareNow(value) {
        let dialogRef = this.dialog.open(LifeCompareNowComponent, {
            width: '2800',data: this.LifeProductlistAll
        });
        dialogRef.disableClose = true;

        dialogRef.afterClosed().subscribe(result => {
            if(result.product_id > 0){
            this.callBack(result);
            }else{}
        });
        return this.LifeProductlistAll
    }
    //call Back Function
    callBack(value){
        let dialogRef = this.dialog.open(LifeCallBackComponent, {
            width: '800px',data: {productId : value.product_id, productName: value.product_name, companyName: value.company_name}
        });
        dialogRef.disableClose = true;

        dialogRef.afterClosed().subscribe(result => {
        });
    }
}

