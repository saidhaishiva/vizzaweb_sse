import { Component, OnInit } from '@angular/core';
import {AppSettings} from '../../app.settings';
import {Router} from '@angular/router';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {FormBuilder} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {TravelService} from '../../shared/services/travel.service';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../shared/services/auth.service';
import {DatePipe} from '@angular/common';
import {Settings} from '../../app.settings.model';
import {BikeInsuranceService} from '../../shared/services/bike-insurance.service';

@Component({
  selector: 'app-bike-premium-list',
  templateUrl: './bike-premium-list.component.html',
  styleUrls: ['./bike-premium-list.component.scss']
})
export class BikePremiumListComponent implements OnInit {
  public settings: Settings;
  tabIndex: any;
  webhost: any;
  allCompanyList: any;
  filterCompany: any;
 allProductLists: any;
  productListArray: any;
  setAllProductLists: any;
  bikeEnquiryDetails: any;

  constructor(public appSettings: AppSettings, public router: Router, public config: ConfigurationService, public fb: FormBuilder, public dialog: MatDialog, public bikeService: BikeInsuranceService, public toast: ToastrService, public auth: AuthService, public datePipe : DatePipe) {
    this.settings = this.appSettings.settings;
    this.tabIndex = 0;
    this.settings.HomeSidenavUserBlock = false;
    this.settings.sidenavIsOpened = false;
    this.settings.sidenavIsPinned = false;
    this.webhost = this.config.getimgUrl();
    // this.compareArray = [];
    // this.productListArray = [];
    // this.allProductLists = [];
  }

  ngOnInit() {
    this.companyList();
    this.bikeEnquiryDetails = JSON.parse(sessionStorage.bikeEnquiryDetails);
    console.log(this.bikeEnquiryDetails ,'jhgfdsghjgf');
    console.log(this.bikeEnquiryDetails.enquiry_id ,'oiutiytryryu');
  }
  companyList() {
    const data = {
        'platform': 'web',
        'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
        'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
        'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,

    };
      this.bikeService.getCompanyList(data).subscribe(
          (successData) => {
            this.companyListSuccess(successData);
          },
          (error) => {
            this.companyListFailure(error);
          }
      );
    }
  public companyListSuccess(successData) {
          console.log(successData.ResponseObject);
            if (successData.IsSuccess) {
              this.allCompanyList = successData.ResponseObject;
              console.log(this.allCompanyList,'this.allCompanyList');
              let all = ['All'];
              for (let i = 0; i < this.allCompanyList.length; i++) {
                all.push(this.allCompanyList[i].company_name)
              }
              this.filterCompany = all;
              console.log(sessionStorage.allProductLists, 'ppp');
              if (sessionStorage.allProductLists == undefined || sessionStorage.allProductLists == '') {
                console.log('inn');
                this.getProductLists(this.allCompanyList, 'enquiry');
              }

            }
  }
  public companyListFailure(error) {
    console.log(error);
  }

  // Product List
  public getProductLists(companyList, type): void {
      this.productListArray = [];
      this.allProductLists = [];
      const data = {
          'platform': 'web',
          'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
          'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
          'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
          'enquiry_id': this.bikeEnquiryDetails.enquiry_id,
          'company_id':''

       };
    this.settings.loadingSpinner = true;
        this.bikeService.getPremieumList(data,companyList).subscribe(
            (successData) => {
              this.getProductListSuccess(successData);
            },
            (error) => {
              this.getProductListFailure(error);
            }
        );
  }
  public getProductListSuccess(successData) {
     this.settings.loadingSpinner = false;
        console.log(successData, 'successData');
        if (successData) {
          for(let i = 0; i < successData.length; i++) {
            if (successData[i].IsSuccess) {
              let policylists = successData[i].ResponseObject;
              this.productListArray.push(policylists.product_list);
            }
            this.allProductLists = [].concat.apply([], this.productListArray);
          }
          console.log(this.allProductLists, 'all');
          for (let i = 0; i < this.allProductLists.length; i++) {
            // this.allProductLists[i].compare = false;
            // this.allProductLists[i].shortlist = false;
            // this.allProductLists[i].premium_amount_format = this.numberWithCommas(this.allProductLists[i].total_premium);
            //this.allProductLists[i].suminsured_amount_format = this.numberWithCommas(this.allProductLists[i].sum_insured_amount);
          }
          sessionStorage.allTravelPremiumLists = JSON.stringify(this.allProductLists);
          this.setAllProductLists = this.allProductLists;
          sessionStorage.allProductLists = JSON.stringify(this.allProductLists);
        }
  }
  public getProductListFailure(error) {
        this.settings.loadingSpinner = false;
        console.log(error, 'error');
      }

}
