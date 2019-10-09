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
import {ToastrService} from 'ngx-toastr';

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
  public companylogo: any;
  public suminsure: any;
  public CoverageAge: any;
  public payment_mode: any;
  public totalpremium: any;
  public productname: any;
  public productvalue: any;
  public policy: any;
  public premium: any;
  public changepremium: any;
  public sumamount: any;
  public errorterm: boolean;

  constructor(public auth: AuthService, public fb: FormBuilder, public datepipe: DatePipe, public appSettings: AppSettings, public router: Router, public commonService: CommonService, private toastr: ToastrService, public config: ConfigurationService, public validation: ValidationService) {
    this.settings = this.appSettings.settings;
    this.settings.HomeSidenavUserBlock = false;
    this.settings.sidenavIsOpened = false;
    this.settings.sidenavIsPinned = false;
    this.webhost = this.config.getimgUrl();
    this.compareArray = [];
    // this.enquiryFromDetials = JSON.parse(sessionStorage.enquiryFromDetials);
    // this.getEnquiryid = JSON.parse(sessionStorage.getEnquiryDetials);
    // this.policy =  this.enquiryFromDetials.benefit_term;
    // console.log(this.policy,'policy term222');
    // console.log(this.enquiryFromDetials.benefit_term,'policy term2221');
    // this.premium = this.enquiryFromDetials.policy_paying_term;
    // console.log(this.premium,'paymentterm222');
    // console.log(this.enquiryFromDetials.policy_paying_term,'paymentterm2221');
    // this.sumamount = this.enquiryFromDetials.sum_assured_id;
    // console.log(this.sumamount, 'theyak2222');
    // sessionStorage.sumamount =  this.sumamount;
  }

  ngOnInit() {
    this.getsuminsuredlist();
    this.getCompanyList();
    this.policylist();
    this.premiumlist();
    this.enquiryFromDetials = JSON.parse(sessionStorage.enquiryFromDetials);
    this.getEnquiryid = JSON.parse(sessionStorage.getEnquiryDetials);
    this.policy =  this.enquiryFromDetials.benefit_term;
    console.log(this.policy,'policy term');
    console.log(this.enquiryFromDetials.benefit_term,'policy term1');
    this.premium = this.enquiryFromDetials.policy_paying_term;
    console.log(this.premium,'paymentterm');
    console.log(this.enquiryFromDetials.policy_paying_term,'paymentterm1');
    this.sumamount = this.enquiryFromDetials.sum_assured_id;
    console.log(this.sumamount, 'theyak');
    sessionStorage.sumamount =  this.sumamount;
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

  premiumlist() {
    const data = {
      'platform': 'web',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
      'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0'
    };
    this.commonService.premiumlist(data).subscribe(
        (successData) => {
          this.premiumlistSuccess(successData);

        },
        (error) => {
          this.premiumlistFailure(error);
        });
  }

  public premiumlistSuccess(successData) {
    this.premiumterm = successData.ResponseObject;
  }

  public premiumlistFailure(error) {
    console.log(error);
  }

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
      this.companylogo = successData.ResponseObject.productlist[0].company_logo;
      this.suminsure = successData.ResponseObject.productlist[0].sum_insured_amount;
      this.CoverageAge = successData.ResponseObject.productlist[0].CoverageAge;
      this.payment_mode = successData.ResponseObject.productlist[0].payment_mode;
      this.totalpremium = successData.ResponseObject.productlist[0].totalpremium;
      this.productname = successData.ResponseObject.productlist[0].product_display_name;
      this.productvalue = successData.ResponseObject.productlist[0];
      sessionStorage.lifePremiumList = JSON.stringify(this.productvalue);
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

  changeterm() {
    const data = {
      'platform': 'web',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
      'policy_id': this.getEnquiryid.enquiry_id,
      'sum_assured': this.sumamount,
      'company_id': '14',
      'term': this.policy,
      "payment_term": this.premium,
      "product_id": "112",
    };
    this.settings.loadingSpinner = true;
    this.commonService.changetermlist(data).subscribe(
        (successData) => {
          // if (successData.IsSuccess == true) {
          this.settings.loadingSpinner = false;
          this.totalpremium = successData.ResponseObject.totalpremium;
          this.errorterm = true;
          console.log(this.errorterm, 'katrku');
          // alert('enter');
          // } else {
          // this.errorterm = false;
          // this.toastr.error(successData.ErrorObject);
          // }

          console.log(this.errorterm,'totalpremium');
          console.log(this.errorterm,'errorterm');
        },

        (error) => {
          this.settings.loadingSpinner = false;
          console.log(error);
        }
    );
  }


  buyProduct(value) {
    console.log(value, 'vlitss');

    if (this.productvalue.company_id == 14) {
      if (this.totalpremium !=0) {
      this.router.navigate(['/edelweiss-pos' + '/' + false]);
    } else {
          this.toastr.error('Modal premium should be greater than or equal to 5000 and less than or equal to 100000');
          }
    }
  }
}
