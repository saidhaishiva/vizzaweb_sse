import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {TermLifeCommonService} from '../../shared/services/term-life-common.service';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {Settings} from '../../app.settings.model';
import {AppSettings} from '../../app.settings';
import {Router} from '@angular/router';

@Component({
  selector: 'app-term-life-premium-list',
  templateUrl: './term-life-premium-list.component.html',
  styleUrls: ['./term-life-premium-list.component.scss']
})
export class TermLifePremiumListComponent implements OnInit {
    public settings: Settings;
    allCompanyList: any;
    filterCompany: any;
    webhost: any;
    productListArray: any;
    allProductLists: any;
    setAllProductLists: any;
    getEnquiryDetials: any;
    compareArray: any;
  constructor(public auth: AuthService, public appSettings: AppSettings, public router: Router, public life: TermLifeCommonService, public config: ConfigurationService) {
      this.settings = this.appSettings.settings;
      this.settings.HomeSidenavUserBlock = false;
      this.settings.sidenavIsOpened = false;
      this.settings.sidenavIsPinned = false;
      this.webhost = this.config.getimgUrl();
      this.compareArray = [];
  }
  ngOnInit() {
      this.getCompanyList();
      this.sessionData();
  }
    sessionData() {
        if(sessionStorage.getEnquiryDetials != '' && sessionStorage.getEnquiryDetials !=undefined) {
          this.getEnquiryDetials  = JSON.parse(sessionStorage.getEnquiryDetials);
        }
    }
    getCompanyList() {
    const data = {
        'platform': 'web',
        'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
        'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
        'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0
    };
    this.life.getComapnyList(data).subscribe(
        (successData) => {
            this.companyListSuccess(successData);
        },
        (error) => {
            this.companyListFailure(error);
        });
  }
  public companyListSuccess(successData) {
      console.log(successData.ResponseObject);
      if (successData.IsSuccess) {
          this.allCompanyList = successData.ResponseObject;
          let all = ['All'];
          for (let i = 0; i < this.allCompanyList.length; i++) {
              all.push(this.allCompanyList[i].company_name)
          }
          this.filterCompany = all;
          console.log(sessionStorage.allProductLists, 'ppp');
          if (sessionStorage.allProductLists == undefined || sessionStorage.allProductLists == '') {
              console.log('inn');
              this.getProductList(this.allCompanyList);
          }

      }
  }
  public companyListFailure(error) {
      console.log(error);
  }

    public getProductList(companyList): void {
        this.productListArray = [];
        this.allProductLists = [];
        let sum_amount = '';
        const data = {
            'platform': 'web',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'policy_id': this.getEnquiryDetials.term_policy_id
        };
        this.settings.loadingSpinner = true;
        this.life.getProductList(data,companyList).subscribe(
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
                this.allProductLists[i].compare = false;
                this.allProductLists[i].shortlist = false;
                // this.allProductLists[i].premium_amount_format = this.numberWithCommas(this.allProductLists[i].total_premium);
                //this.allProductLists[i].suminsured_amount_format = this.numberWithCommas(this.allProductLists[i].sum_insured_amount);
            }
            this.setAllProductLists = this.allProductLists;
            sessionStorage.allProductLists = JSON.stringify(this.allProductLists);
            // if(this.allProductLists.length > 0) {
            //     this.enquiryDetails.sum_insured_amount = this.allProductLists[0].sum_insured_amount;
            // }
        }
    }
    public getProductListFailure(error) {
        this.settings.loadingSpinner = false;
        console.log(error, 'error');
    }
}
