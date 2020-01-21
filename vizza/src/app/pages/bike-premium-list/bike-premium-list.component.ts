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
import {ClearSessionMotorService} from '../../shared/services/clear-session-motor.service';
import {ViewdetailsComponent} from '../health-insurance/viewdetails/viewdetails.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import {ViewKeyfeaturesComponent} from './view-keyfeatures/view-keyfeatures.component';
import {consoleTestResultHandler} from 'tslint/lib/test';
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
    bikeEnquiryId: any;
    checkAllStatus: boolean;
    thirdParty: boolean;
    comphensivePremium: boolean;
    compherhensive: any;
    getEnquiry: any;
    policyTerm: any;
    initialProductList: any;
    vehicleDetalis: any;
    premiumbreakup: any;
    ownDamage: any;
    pa: any;
    gst: any;
    premium: any;
    Gst: any;
    OwnDamage_premium: any;
    PA_premium: any;
    ThridParty_premium: any;
    constructor(public auth: AuthService, public datepipe: DatePipe,public dialog: MatDialog,public clearSession: ClearSessionMotorService, public appSettings: AppSettings,public router: Router,public bikeService: BikeInsuranceService, public config: ConfigurationService) {
        this.settings = this.appSettings.settings;
        this.settings.HomeSidenavUserBlock = false;
        this.settings.sidenavIsOpened = false;
        this.settings.sidenavIsPinned = false;
        this.webhost = this.config.getimgUrl();
        this.compareArray = [];
        this.initialProductList = [];
        // this.premiumbreakup= [];
        this.Gst = [];
        this.OwnDamage_premium = [];
        this.PA_premium = [];
        this.ThridParty_premium = [];
        this.thirdParty = false;
        this.compherhensive = 'Comprehensive_premium';
        sessionStorage.packae_list = this.compherhensive;
        this.clearSession.clearSessionbikeData();
console.log(sessionStorage.packae_list,'sessionStorage packae_list');
    }
    ngOnInit()
    {
        this.getCompanyList();
        this.bikeEnquiryId = sessionStorage.bikeEnquiryId;
        this.vehicleDetalis = JSON.parse(sessionStorage.vehicledetails);
        this.sessionData();

    }
    sessionData() {
        if(sessionStorage.getEnquiryDetials != '' && sessionStorage.getEnquiryDetials !=undefined) {
            this.getEnquiryDetials  = JSON.parse(sessionStorage.getEnquiryDetials);
        }
        if(sessionStorage.setAllProductLists != '' && sessionStorage.setAllProductLists !=undefined) {
            this.setAllProductLists  = JSON.parse(sessionStorage.setAllProductLists);
        }
        if(sessionStorage.initialProductList != '' && sessionStorage.initialProductList !=undefined) {
            this.initialProductList  = JSON.parse(sessionStorage.initialProductList);
        }
        if (sessionStorage.filterCompany != undefined && sessionStorage.filterCompany != '') {
            this.filterCompany = JSON.parse(sessionStorage.filterCompany);
            if(this.filterCompany.includes('All')) {
                this.checkAllStatus = true;
            } else {
                this.checkAllStatus = false;
            }
        }

        if(this.vehicleDetalis.business_type == '1'){
            this.policyTerm = '5';
            this.premiumlist();

        }  else {
            this.policyTerm = '1';
            this.premiumlist();

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
            'enquiry_id': this.bikeEnquiryId,
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
                    console.log(policylists,'product......');
                    this.productListArray.push(policylists.productlist);
                    console.log(this.productListArray,'productListArray......');

                }
                this.allProductLists = [].concat.apply([], this.productListArray);
            }
            console.log(this.allProductLists, 'all');
            for (let i = 0; i < this.allProductLists.length; i++) {
                this.allProductLists[i].compare = false;
                this.allProductLists[i].shortlist = false;
                let dob = this.datepipe.transform(this.allProductLists[i].dob, 'y-MM-dd');
                this.allProductLists[i].age = this.ageCalculate(dob);
                console.log(this.allProductLists[i],'55555');
                // this.premiumbreakup.push(this.allProductLists[i].premium_breakup)

                // this.Gst[i] = this.allProductLists[i].premium_breakup.GST;
                // console.log( this.Gst[i],'1111');
                // this.OwnDamage_premium = this.allProductLists[i].premium_breakup.OwnDamage_premium;
                // console.log( this.OwnDamage_premium,'1111');
                //
                // this.PA_premium = this.allProductLists[i].premium_breakup.PA_premium;
                // this.ThridParty_premium = this.allProductLists[i].premium_breakup.ThridParty_premium;
                // this.allProductLists[i].premium_amount_format = this.numberWithCommas(this.allProductLists[i].total_premium);
                //this.allProductLists[i].suminsured_amount_format = this.numberWithCommas(this.allProductLists[i].sum_insured_amount);
            }

            for (let i = 0; i < this.allProductLists.length; i++) {
                this.allProductLists[i].year_type == '1';
            }

            if(this.policyTerm == '5'){
                this.initialProductList = this.allProductLists.filter(data => data.year_type == '5');
            } else {
                this.initialProductList = this.allProductLists.filter(data => data.year_type == '1');
            }
            this.setAllProductLists = this.allProductLists;
            sessionStorage.setAllProductLists = JSON.stringify(this.allProductLists);
            sessionStorage.initialProductList = JSON.stringify(this.initialProductList);

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
    bikeInsurer(){
        this.router.navigate(['/bike-insurance']);
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
        sessionStorage.packae_list = this.compherhensive;
        if(this.policyTerm == '2'){
            this.initialProductList = this.allProductLists.filter(data => data.year_type == '2');
         } else if(this.policyTerm == '3'){
                this.initialProductList = this.allProductLists.filter(data => data.year_type == '3');
            } else if(this.policyTerm == '5'){
            this.initialProductList = this.allProductLists.filter(data => data.year_type == '5');
        }
        else{
            this.initialProductList = this.allProductLists.filter(data => data.year_type == '1');

        }
    }
    listDetails(){
        if(this.compherhensive == 'ThridParty_premium'){
            this.thirdParty = true;
            sessionStorage.premiumAmount = this.thirdParty;
            this.comphensivePremium = false;
            sessionStorage.premiumAmount1 = this.comphensivePremium;
        } else{
            this.thirdParty = false;
            this.comphensivePremium = true;
        }
    }

// view key features details
    viewKeyList(value) {
        console.log(value, 'value');
        let dialogRef = this.dialog.open(ViewKeyfeaturesComponent, {
            width: '1500px', data: {productId : value.product_id, productName: value.product_name, productLogo: value.company_logo}
        });
        dialogRef.disableClose = true;
        dialogRef.afterClosed().subscribe(result => {
        });

    }

    buyProduct(value) {
        console.log(value,'value');
        sessionStorage.buyProductDetails =  JSON.stringify(value);
        if (value.company_id == 7) {
            this.router.navigate(['/bike-shriram-proposal'  + '/' + false]);
        } else if (value.company_id == 12){
            this.router.navigate(['/bike-royal-proposal'  + '/' + false]);
        }else if (value.company_id ==3){
            this.router.navigate(['/reliance-motor-proposal' + '/'+ false]);
        }else if(value.company_id == 13){
            this.router.navigate(['/bike-tataaig-proposal'+ '/' + false]);
        }else if(value.company_id == 5){
            this.router.navigate(['/hdfc-twoWheeler-proposal'+ '/' + false]);
        }
    }
    back(){
        this.router.navigate(['/bike-insurance']);

    }
}
