import { Component, OnInit } from '@angular/core';
import {Settings} from '../../app.settings.model';
import {AuthService} from '../../shared/services/auth.service';
import {DatePipe} from '@angular/common';
import {AppSettings} from '../../app.settings';
import {Router} from '@angular/router';
import {BikeInsuranceService} from '../../shared/services/bike-insurance.service';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {FourWheelerService} from '../../shared/services/four-wheeler.service';
import { ClearSessionFourwheelerService } from '../../shared/services/clear-session-fourwheeler.service';

@Component({
  selector: 'app-four-wheeler-product-list',
  templateUrl: './four-wheeler-product-list.component.html',
  styleUrls: ['./four-wheeler-product-list.component.scss']
})
export class FourWheelerProductListComponent implements OnInit {
  public settings: Settings;
  allCompanyList: any;
  filterCompany: any;
  webhost: any;
  productListArray: any;
  allProductLists: any;
  setAllProductLists: any;
  getEnquiryDetials: any;
  compareArray: any;
  fwEnquiryId: any;
  checkAllStatus: boolean;
  thirdParty: boolean;
  comphensivePremium: boolean;
  compherhensive: any;
  getEnquiry: any;
  policyTerm: any;
  vehicledetailsfw: any;
  carListDetails: any;
  initialProductListfw: any;
  constructor(public auth: AuthService, public datepipe: DatePipe, public appSettings: AppSettings, public router: Router, public fwService: FourWheelerService, public config: ConfigurationService, public clearsession: ClearSessionFourwheelerService) {
    this.settings = this.appSettings.settings;
    this.settings.HomeSidenavUserBlock = false;
    this.settings.sidenavIsOpened = false;
    this.settings.sidenavIsPinned = false;
    this.webhost = this.config.getimgUrl();
    this.compareArray = [];
    this.initialProductListfw = [];
    this.thirdParty = false;
    this.compherhensive = 'Comprehensive_premium';
    sessionStorage.packageListFw = this.compherhensive;
    this.clearsession.clearSessionfourwheelerData();
    this.carListDetails = JSON.parse(sessionStorage.carListDetails);
    let type = this.carListDetails.type;
    let bussiness = this.carListDetails.business_type;
    console.log(type, 'type');
    console.log(bussiness, 'bussiness');
    console.log(this.carListDetails, 'carListDetails');
    if(this.carListDetails.business_type =='1'){
      this.policyTerm ='3';
    } else {
      this.policyTerm ='1';
    }
    console.log(this.policyTerm, '  this.policyTerm');
  }
  ngOnInit() {
    this.getCompanyList();
    this.fwEnquiryId = sessionStorage.fwEnquiryId;
    this.sessionData();


  }
  sessionData() {
    if (sessionStorage.getEnquiryDetials != '' && sessionStorage.getEnquiryDetials != undefined) {
      this.getEnquiryDetials = JSON.parse(sessionStorage.getEnquiryDetials);
    }
    if (sessionStorage.setAllProductLists != '' && sessionStorage.setAllProductLists != undefined) {
      this.setAllProductLists = JSON.parse(sessionStorage.setAllProductLists);
      this.allProductLists = JSON.parse(sessionStorage.setAllProductLists);
      console.log(this.allProductLists, 'this.allProductLists');
    }
    if (sessionStorage.initialProductListfw != '' && sessionStorage.initialProductListfw != undefined) {
      this.initialProductListfw = JSON.parse(sessionStorage.initialProductListfw);
      console.log(this.initialProductListfw, 'dfghjkljhgf');
      this.premiumlist();
    }
    if (sessionStorage.filterCompany != undefined && sessionStorage.filterCompany != '') {
      this.filterCompany = JSON.parse(sessionStorage.filterCompany);
      if (this.filterCompany.includes('All')) {
        this.checkAllStatus = true;
      } else {
        this.checkAllStatus = false;
      }
    }
  }
  getCompanyList() {
    const data = {
      'platform': 'web',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,

    };
    this.fwService.getCompanyList(data).subscribe(
        (successData) => {
          this.companyListSuccess(successData);
        },
        (error) => {
          this.companyListFailure(error);
        }
    );

  }
  public companyListSuccess(successData) {
    // console.log(successData.ResponseObjeallProductListsct);
    if (successData.IsSuccess) {
      this.allCompanyList = successData.ResponseObject;
      let all = ['All'];
      for (let i = 0; i < this.allCompanyList.length; i++) {
        all.push(this.allCompanyList[i].company_name)
      }
      this.filterCompany = all;
      if (sessionStorage.setAllProductLists == undefined || sessionStorage.setAllProductLists == '') {
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
      'enquiry_id': this.fwEnquiryId,
      'company_id':''

    };
    this.settings.loadingSpinner = true;
    this.fwService.getPremieumList(data,companyList).subscribe(
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
          this.productListArray.push(policylists.productlist);
        }
        this.allProductLists = [].concat.apply([], this.productListArray);
      }
      console.log(this.allProductLists, 'all');
      for (let i = 0; i < this.allProductLists.length; i++) {
        this.allProductLists[i].compare = false;
        this.allProductLists[i].shortlist = false;
        let dob = this.datepipe.transform(this.allProductLists[i].dob, 'y-MM-dd');
        this.allProductLists[i].age = this.ageCalculate(dob);
        // this.allProductLists[i].premium_amount_format = this.numberWithCommas(this.allProductLists[i].total_premium);
        //this.allProductLists[i].suminsured_amount_format = this.numberWithCommas(this.allProductLists[i].sum_insured_amount);
      }
      if(this.carListDetails.business_type =='1'){
        this.initialProductListfw = this.allProductLists.filter(data => data.year_type == '3');
      } else {
        this.initialProductListfw = this.allProductLists.filter(data => data.year_type == '1');
      }
      this.setAllProductLists = this.allProductLists;
      sessionStorage.setAllProductLists = JSON.stringify(this.allProductLists);
      sessionStorage.initialProductListfw = JSON.stringify(this.initialProductListfw);

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
    let dd = today.getDate()- birthDate.getDate();
    if( m < 0 || m == 0 && today.getDate() < birthDate.getDate()){
      age = age-1;
    }
    return age;
  }
  updateSumInsured(){

  }
  // filter by product
  filterByProducts() {
    if(this.filterCompany.includes('All')){
      this.checkAllStatus = true;
      this.allProductLists = this.setAllProductLists;
      let all = ['All'];
      for (let i = 0; i < this.allCompanyList.length; i++) {
        all.push(this.allCompanyList[i].company_name);
      }
      this.filterCompany = all;
    }
    else if(!this.filterCompany.includes('All') && this.filterCompany.length == this.allCompanyList.length){
      console.log('sec');
      this.checkAllStatus = false;
      this.allProductLists = [];
      this.filterCompany = [];
    }
    else if(!this.filterCompany.includes('All') && this.filterCompany.length > 0){
      console.log('third');
      this.checkAllStatus = false;
      let cmpy = [];
      for (let k = 0; k < this.filterCompany.length; k++) {
        for (let j = 0; j < this.setAllProductLists.length; j++) {
          if (this.filterCompany[k] == this.setAllProductLists[j].company_name) {
            cmpy.push(this.setAllProductLists[j]);
          }
        }
      }
      this.allProductLists = cmpy;
    } else if(this.filterCompany.length == 0){
      console.log('frth');
      this.checkAllStatus = false;
      this.allProductLists = [];
      this.filterCompany = [];
    }
    sessionStorage.filterCompany = JSON.stringify(this.filterCompany);
    sessionStorage.allProductLists = JSON.stringify(this.allProductLists);

  }
  premiumlist(){
    sessionStorage.packageListFw = this.compherhensive;
    console.log(this.allProductLists, 'hgfdhj');
     if(this.carListDetails.business_type =='1'){
      this.initialProductListfw = this.allProductLists.filter(data => data.year_type == '3');
    } else{
      this.initialProductListfw = this.allProductLists.filter(data => data.year_type == '1');

    }
  }



  buyProduct(value) {
    console.log(value,'value');
    sessionStorage.buyFourwheelerProductDetails =  JSON.stringify(value);
    if (value.company_id == 7) {
      this.router.navigate(['/four-wheeler-shriram'  + '/' + false]);
    }
    else if (value.company_id == 12){
      this.router.navigate(['/royal-sundaram-fourwheeler-proposal'  + '/' + false]);
    }else if (value.company_id ==3){
      this.router.navigate(['/reliance-fourwheeler-motor-proposal' + '/'+ false]);
    }else if(value.company_id == 13){
      this.router.navigate(['/car-tataaig-proposal'+ '/' + false]);
    }else if(value.company_id == 5){
      this.router.navigate(['/hdfc-car-proposal'+ '/' + false]);
    }


  }
}
