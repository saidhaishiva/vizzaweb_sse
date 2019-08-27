import {Component,OnInit} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {Settings} from '../../app.settings.model';
import {AppSettings} from '../../app.settings';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {ValidationService} from '../../shared/services/validation.service';
import {FormBuilder} from '@angular/forms';
import {CommonService} from '../../shared/services/common.service';

@Component({
  selector: 'app-edelweisspos-premium-list',
  templateUrl: './edelweisspos-premium-list.component.html',
  styleUrls: ['./edelweisspos-premium-list.component.scss']
})
export class EdelweissposPremiumListComponent implements OnInit {
  public settings: Settings;
  allCompanyList: any;
  webhost: any;
  allProductLists: any;
  setAllProductLists: any;
  getEnquiryDetials: any;
  compareArray: any;
  choosenpolicy: any;
  enquiryFromDetials: any;
  lifePremiumList: any;
  selected: any;
  checkAllStatus: boolean;
  public suminsuredvalue: any;
  public getEnquiryid: any;
  public policyterm: any;
  public premiumterm: any;
  public companylist: any;
  public productid: any;

  constructor(public auth: AuthService, public fb: FormBuilder, public datepipe: DatePipe, public appSettings: AppSettings, public router: Router, public commonService: CommonService, public config: ConfigurationService, public validation: ValidationService) {
    this.settings = this.appSettings.settings;
    this.settings.HomeSidenavUserBlock = false;
    this.settings.sidenavIsOpened = false;
    this.settings.sidenavIsPinned = false;
    this.webhost = this.config.getimgUrl();
    this.compareArray = [];
  }

  ngOnInit() {
    this.getsuminsuredlist();
    this.getCompanyList();
    this.policylist();
    // this.premiumlist();
    this.enquiryFromDetials = JSON.parse(sessionStorage.enquiryFromDetials);
    this.getEnquiryid = JSON.parse(sessionStorage.getEnquiryDetials);
  }

  getsuminsuredlist() {
    const data = {
      'platform': 'web',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
      'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
    };
    this.commonService.suminsuredlist(data).subscribe(
        (successData) => {
          this.suminsuredlistSuccess(successData);

        },
        (error) => {
          this.suminsuredlistFailure(error);
        });
  }

  public suminsuredlistSuccess(successData) {
    this.suminsuredvalue = successData.ResponseObject;
  }

  public suminsuredlistFailure(error) {
    console.log(error);
  }

  policylist() {
    const data = {
      'platform': 'web',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
      'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0'
    };
    this.commonService.policylist(data).subscribe(
        (successData) => {
          this.policylistSuccess(successData);

        },
        (error) => {
          this.policylistFailure(error);
        });
  }

  public policylistSuccess(successData) {
    this.policyterm = successData.ResponseObject;
  }

  public policylistFailure(error) {
    console.log(error);
  }

  // premiumlist() {
  //   const data = {
  //     'platform': 'web',
  //     'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
  //     'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
  //     'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0'
  //   };
  //   this.commonService.premiumlist(data).subscribe(
  //       (successData) => {
  //         this.premiumlistSuccess(successData);
  //
  //       },
  //       (error) => {
  //         this.premiumlistFailure(error);
  //       });
  // }
  //
  // public premiumlistSuccess(successData) {
  //   this.premiumterm = successData.ResponseObject;
  // }
  //
  // public premiumlistFailure(error) {
  //   console.log(error);
  // }

  getCompanyList() {
    const data = {
      'platform': 'web',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
      'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0'
    };
    this.commonService.getComapnyList(data).subscribe(
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
      this.getProductList();
    }
  }

  public companyListFailure(error) {
    console.log(error);
  }

  public getProductList() {
    const data = {
      'platform': 'web',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
      'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      'policy_id': this.getEnquiryid.enquiry_id,
      'sum_assured': this.enquiryFromDetials.sum_assured_id,
      'company_id': '14'
    };
    this.settings.loadingSpinner = true;
    this.commonService.getProductList(data).subscribe(
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
      this.productid = successData.ResponseObject.policy_id;
      this.companylist = successData.ResponseObject.productlist[0];
    }
  }

  public getProductListFailure(error) {
    this.settings.loadingSpinner = false;
    console.log(error, 'error');
  }

  ageCalculate(dob) {
    let today = new Date();
    let birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    let dd = today.getDate() - birthDate.getDate();
    if (m < 0 || m == 0 && today.getDate() < birthDate.getDate()) {
      age = age - 1;
    }
    return age;
  }

  buyProduct(value) {
    this.router.navigate(['/edelweiss-pos']);
  }
}
