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
import {TermLifeCommonService} from '../../shared/services/term-life-common.service';

@Component({
  selector: 'app-bike-premium-list',
  templateUrl: './bike-premium-list.component.html',
  styleUrls: ['./bike-premium-list.component.scss']
})
export class BikePremiumListComponent implements OnInit {
    public settings: Settings;
    allCompanyList: any;
    filterCompany: any;
    webhost: any;
    productListArray: any;
    allProductLists: any;
    setAllProductLists: any;
    getEnquiryDetials: any;
    compareArray: any;
    bikeEnquiryDetails: any;
    checkAllStatus: boolean;
    thirdParty: boolean;
    comphensivePremium: boolean;
    compherhensive: any;
    constructor(public auth: AuthService, public datepipe: DatePipe, public appSettings: AppSettings, public router: Router, public bikeService: BikeInsuranceService, public config: ConfigurationService) {
        this.settings = this.appSettings.settings;
        this.settings.HomeSidenavUserBlock = false;
        this.settings.sidenavIsOpened = false;
        this.settings.sidenavIsPinned = false;
        this.webhost = this.config.getimgUrl();
        this.compareArray = [];
        this.thirdParty = false;
    }
    ngOnInit()
    {
        this.compherhensive = 'Comprehensive_premium';
        this.getCompanyList();
        this.bikeEnquiryDetails = JSON.parse(sessionStorage.bikeEnquiryDetails);

        this.sessionData();
    }
    sessionData() {
        if(sessionStorage.getEnquiryDetials != '' && sessionStorage.getEnquiryDetials !=undefined) {
            this.getEnquiryDetials  = JSON.parse(sessionStorage.getEnquiryDetials);
        }
        if(sessionStorage.setAllProductLists != '' && sessionStorage.setAllProductLists !=undefined) {
            this.setAllProductLists  = JSON.parse(sessionStorage.setAllProductLists);
        }
        if(sessionStorage.allProductLists != '' && sessionStorage.allProductLists !=undefined) {
            this.allProductLists  = JSON.parse(sessionStorage.allProductLists);
        }
        if (sessionStorage.filterCompany != undefined && sessionStorage.filterCompany != '') {
            this.filterCompany = JSON.parse(sessionStorage.filterCompany);
            if(this.filterCompany.includes('All')) {
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
            this.setAllProductLists = this.allProductLists;
            sessionStorage.setAllProductLists = JSON.stringify(this.allProductLists);
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
        if(this.compherhensive == 'ThridParty_premium'){
            this.thirdParty = true;
            this.comphensivePremium = false;
        } else{
            this.thirdParty = false;
            this.comphensivePremium = true;

        }
    }

    buyProduct(value) {
        console.log(value,'value');
        sessionStorage.buyProductDetails =  JSON.stringify(value);
        if (value.company_id == 7) {
            this.router.navigate(['/bike-shriram-proposal'  + '/' + false]);
        }


    }
}
