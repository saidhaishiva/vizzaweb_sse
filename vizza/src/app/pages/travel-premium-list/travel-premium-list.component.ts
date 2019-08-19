import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TravelService} from '../../shared/services/travel.service';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {AppSettings} from '../../app.settings';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {DatePipe} from '@angular/common';
import {Settings} from '../../app.settings.model';
import { TravelViewKeyFeaturesComponent} from './travel-view-key-features/travel-view-key-features.component';
import { TravelCompareComponent} from './travel-compare/travel-compare.component';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {ClearSessionTravelService} from '../../shared/services/clear-session-travel.service';
export const MY_FORMATS = {
    parse: {
        dateInput: 'DD/MM/YYYY',
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MM YYYY',
        dateA11yLabel: 'DD/MM/YYYY',

        monthYearA11yLabel: 'MM YYYY',
    },
};
@Component({
  selector: 'app-travel-premium-list',
  templateUrl: './travel-premium-list.component.html',
  styleUrls: ['./travel-premium-list.component.scss'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ]
})
export class TravelPremiumListComponent implements OnInit {
    public settings: Settings;
    selfArray: any;
    familyArray: any;
    studentArray: any;
    groupArray: any;
    showFamily: boolean;

    value: any;
    showSelf: boolean;
    showGroup: boolean;
    showstudent: boolean;
    Child3BTn: boolean;
    FatherBTn: boolean;
    MotherBTn: boolean;
    AddFamilyBTN: boolean;
    Member5BTn: boolean;
    Member6BTn: boolean;
    Member7BTn: boolean;
    Member8BTn: boolean;
    Member9BTn: boolean;
    Member10BTn: boolean;
    Student5BTn: boolean;
    Student6BTn: boolean;
    Student7BTn: boolean;
    Student8BTn: boolean;
    Student9BTn: boolean;
    Student10BTn: boolean;
    count: any;
    sumInsuredAmountLists: any;
    currentTab: any;
    maxDate: any;
    startDateError: any;
    endDateError: any;
    today: any;

    selectedAmountTravel: any;
    daysCount: any;
    startDate: any;
    endDate: any;
    travelPlan: any;
    medicalCondition: any;
    finalData: any;
    sumerror: any;
    medicalerror: any;
    duration: any;
    premiumLists: any;
    travelType: any;
    getArray: any;
    webhost: any;
    selectedIndex: any;
    compareArray: any;
    productLists: any;
    equiryId: any;
    daysBookingCount: any;
    viewList: any;
    allCompanyList: any;
    filterCompany: any;
    tabIndex: any;
    enquiryDetails: any;
    insuranceLists: any;
    productListArray: any;
    allProductLists: any;
    setAllProductLists: any;
    courseDuration: any;
    sem: any;
    checkAllStatus: boolean;
    constructor(public appSettings: AppSettings, public clearSession: ClearSessionTravelService, public router: Router, public config: ConfigurationService, public fb: FormBuilder, public dialog: MatDialog, public travel: TravelService, public toast: ToastrService, public auth: AuthService, public datePipe : DatePipe) {
        this.settings = this.appSettings.settings;
        this.tabIndex = 0;
        this.settings.HomeSidenavUserBlock = false;
        this.settings.sidenavIsOpened = false;
        this.settings.sidenavIsPinned = false;
        this.webhost = this.config.getimgUrl();
        this.compareArray = [];
        this.productListArray = [];
        this.allProductLists = [];
        this.filterCompany = [];
    }
    ngOnInit() {
        this.clearSession.clearSessionTravelData();
        this.settings.loadingSpinner = false;
        this.sumInsuredAmonut();
        this.companyList();
        this.sessionData();
    }
    sessionData() {
        if (sessionStorage.enquiryDetailsTravel != undefined && sessionStorage.enquiryDetailsTravel != '') {
            let details = JSON.parse(sessionStorage.enquiryDetailsTravel);
            this.enquiryDetails = details[0];
            this.selectedAmountTravel = this.enquiryDetails.sum_insured_id;
        }
        if (sessionStorage.allTravelPremiumLists != undefined && sessionStorage.allTravelPremiumLists != '') {
            this.setAllProductLists = JSON.parse(sessionStorage.allTravelPremiumLists);
        }
        if (sessionStorage.filterCompany != undefined && sessionStorage.filterCompany != '') {
            this.filterCompany = JSON.parse(sessionStorage.filterCompany);
            if(this.filterCompany.includes('All')) {
                this.checkAllStatus = true;
            } else {
                this.checkAllStatus = false;
            }
        }
        if (sessionStorage.sem != undefined && sessionStorage.sem != '') {
            this.sem = sessionStorage.sem;
        }
        if (sessionStorage.courseDuration != undefined && sessionStorage.courseDuration != '') {
            this.courseDuration = sessionStorage.courseDuration;
        }
        if (sessionStorage.allProductLists != undefined && sessionStorage.allProductLists != '') {
            this.allProductLists = JSON.parse(sessionStorage.allProductLists);
            console.log(this.allProductLists, 'sessionn');
        }
        if (sessionStorage.changeSuninsuredAmount != undefined && sessionStorage.changeSuninsuredAmount != '') {
            this.enquiryDetails.sum_insured_amount = sessionStorage.changeSuninsuredAmount;
        }
    }
    companyList() {
        const data = {
            'platform': 'web',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0
        };
        this.travel.getAllCompany(data).subscribe(
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
            console.log(sessionStorage.allProductLists, 'ppp');
            if (sessionStorage.allProductLists == undefined || sessionStorage.allProductLists == '') {
                console.log('inn');
                this.getProductLists(this.allCompanyList, 'enquiry');
            }

            this.filterCompany = all;
        }
    }
    public companyListFailure(error) {
        console.log(error);
    }

    // this function will get the sum insured amounts
    public sumInsuredAmonut(): void {
        const data = {
            'platform': 'web',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0'
        };
        this.travel.getTravelSumInsuredAmount(data).subscribe(
            (successData) => {
                this.getSumInsuredAmountSuccess(successData);
            },
            (error) => {
                this.getSumInsuredAmountFailure(error);
            }
        );
    }
    public getSumInsuredAmountSuccess(successData) {
        if (successData.IsSuccess) {
            this.sumInsuredAmountLists = successData.ResponseObject;
        }
    }
    public getSumInsuredAmountFailure(error) {
        console.log(error, 'error');
    }
    public getProductLists(companyList, type): void {
        this.productListArray = [];
        this.allProductLists = [];
        let sum_amount = '';
        if(type == 'productLists') {
            for (let i = 0; i < this.sumInsuredAmountLists.length; i++) {
                if (this.sumInsuredAmountLists[i].suminsured_id == this.selectedAmountTravel) {
                    sum_amount = this.sumInsuredAmountLists[i].suminsured_amount;
                }
            }
        }
        const data = {
            'platform': 'web',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            "enquiry_id": this.enquiryDetails.enquiry_id,
            "group_name": this.enquiryDetails.group_name,
            "adult_count": this.enquiryDetails.adult_count,
            "child_count": this.enquiryDetails.child_count,
            "scheme": this.enquiryDetails.scheme,
            "travel_place": this.enquiryDetails.travel_place,
            "travel_plan_type": this.enquiryDetails.travel_plan_type,
            "start_date": this.enquiryDetails.start_date,
            "end_date": this.enquiryDetails.end_date,
            "travel_user_type": this.enquiryDetails.travel_user_type,
            "medical_condition": this.enquiryDetails.medical_condition,
            "duration": this.enquiryDetails.duration,
            "family_members": this.enquiryDetails.family_members,
            "company_id": companyList.company_id,
            "sum_insured_id": type == 'productLists' ? this.selectedAmountTravel : this.enquiryDetails.sum_insured_id,
            "sum_insured_amount": type == 'productLists' ? sum_amount : this.enquiryDetails.sum_insured_amount,
            "pincode": this.enquiryDetails.pincode,
            'course_duration': this.enquiryDetails.travel_user_type ? this.courseDuration : '',
            'semester': this.enquiryDetails.travel_user_type ? this.sem : ''
        };
        this.settings.loadingSpinner = true;
        this.travel.getTravelPremiumList(data,companyList).subscribe(
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
                    if (policylists != '') {
                        this.productListArray.push(policylists.product_list);
                        this.allProductLists = [].concat.apply([], this.productListArray);
                    }
                }
            }
            console.log(this.allProductLists, 'all1');
            for (let i = 0; i < this.allProductLists.length; i++) {
                this.allProductLists[i].compare = false;
                this.allProductLists[i].shortlist = false;
                // this.allProductLists[i].premium_amount_format = this.numberWithCommas(this.allProductLists[i].total_premium);
                //this.allProductLists[i].suminsured_amount_format = this.numberWithCommas(this.allProductLists[i].sum_insured_amount);
            }
            sessionStorage.allTravelPremiumLists = JSON.stringify(this.allProductLists);
            this.setAllProductLists = this.allProductLists;
            sessionStorage.allProductLists = JSON.stringify(this.allProductLists);
            if(this.allProductLists.length > 0) {
                this.enquiryDetails.sum_insured_amount = this.allProductLists[0].sum_insured_amount;
            }
            sessionStorage.changeSuninsuredAmount = this.allProductLists[0].sum_insured_amount;
        }
    }
    public getProductListFailure(error) {
        this.settings.loadingSpinner = false;
        console.log(error, 'error');
    }
    public  numberWithCommas(x) {
        return x.toString().substring(0,x.toString().split('.')[0].length-3).replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + x.toString().substring(x.toString().split('.')[0].length-3);
    }
    updateSumInsured(){
        this.getProductLists(this.allCompanyList, 'productLists');
    }

    selectAllValues() {
        console.log('t1');
        if (!this.filterCompany.includes('All')) {
            this.allProductLists = [];
            this.filterCompany = [];
        } else {
            if(this.filterCompany.length-1 != this.allCompanyList.length) {
                this.allProductLists = this.setAllProductLists;
                let all = ['All'];
                for (let i = 0; i < this.allCompanyList.length; i++) {
                    all.push(this.allCompanyList[i].company_name);
                }
                this.filterCompany = all;
            } else {
                let cmpy = [];
                for (let k = 0; k < this.filterCompany.length; k++) {
                    for (let j = 0; j < this.setAllProductLists.length; j++) {
                        if (this.filterCompany[k] == this.setAllProductLists[j].company_name) {
                            cmpy.push(this.setAllProductLists[j]);
                        }
                    }
                }
                this.allProductLists = cmpy;
            }
        }
    }
    someMethod(value) {
        console.log(value, 'this.value');
        console.log(this.filterCompany, 'this.filterCompany');
        // if(!this.filterCompany.includes(value)){
        //     this.filterCompany.push(value);
        // }
        // console.log(this.filterCompany, 'this.filterCompany2');

        let cmpy = [];
        for (let k = 0; k < this.filterCompany.length; k++) {
            for (let j = 0; j < this.setAllProductLists.length; j++) {
                if (this.filterCompany[k] == this.setAllProductLists[j].company_name) {
                    cmpy.push(this.setAllProductLists[j]);
                }
            }
        }
        this.allProductLists = cmpy;
    }
    // filter by product
    filterByProducts() {
        console.log('t2');

        console.log(this.filterCompany, 'allname');

        let setFieldValues = this.filterCompany;

        let filterWithoutAll = this.filterCompany.filter(data => data != 'All');

        let validAll = true;

        if(this.filterCompany.includes('All')){
            this.allProductLists = this.setAllProductLists;
            let all = ['All'];
            for (let i = 0; i < this.allCompanyList.length; i++) {
                all.push(this.allCompanyList[i].company_name);
            }
            this.filterCompany = all;
        } else if(!this.filterCompany.includes('All') && this.filterCompany.length == this.allCompanyList.length){
            this.allProductLists = [];
            this.filterCompany = [];
        }  else if(!this.filterCompany.includes('All') && this.filterCompany.length > 0){
            let cmpy = [];
            for (let k = 0; k < this.filterCompany.length; k++) {
                for (let j = 0; j < this.setAllProductLists.length; j++) {
                    if (this.filterCompany[k] == this.setAllProductLists[j].company_name) {
                        cmpy.push(this.setAllProductLists[j]);
                    }
                }
            }
            this.allProductLists = cmpy;

        }


        // if(validAll) {
        //     // this.filterCompany = setFieldValues;
        //     console.log(this.filterCompany.length, 'ftcmpy');
        //     console.log(this.allCompanyList.length, 'allcpy');
        //  if (this.filterCompany.includes('All')) {
        //         console.log('third');
        //         this.checkAllStatus = false;
        //
        //
        //
        //      if(this.filterCompany.length-1 == this.allCompanyList.length){
        //
        //           this.checkAllStatus = true;
        //           this.allProductLists = this.setAllProductLists;
        //           let all = ['All'];
        //           for (let i = 0; i < this.allCompanyList.length; i++) {
        //               all.push(this.allCompanyList[i].company_name);
        //           }
        //           this.filterCompany = all;
        //
        //        } else {
        //            let cmpy = [];
        //            for (let k = 0; k < this.filterCompany.length; k++) {
        //                for (let j = 0; j < this.setAllProductLists.length; j++) {
        //                    if (this.filterCompany[k] == this.setAllProductLists[j].company_name) {
        //                        cmpy.push(this.setAllProductLists[j]);
        //                    }
        //                }
        //            }
        //            this.allProductLists = cmpy;
        //        }
        //
        //
        //     } else if (!this.filterCompany.includes('All')) {
        //
        //          if (this.filterCompany.length == this.allCompanyList.length) {
        //
        //              this.checkAllStatus = false;
        //              this.allProductLists = [];
        //              this.filterCompany = [];
        //
        //          } else {
        //
        //              this.checkAllStatus = true;
        //              this.allProductLists = this.setAllProductLists;
        //              let all = [];
        //              for (let i = 0; i < this.allCompanyList.length; i++) {
        //                  all.push(this.allCompanyList[i].company_name);
        //              }
        //              this.filterCompany = all;
        //          }
        //      }
        //
        //
        //
        //
        //  // else if (this.filterCompany.includes('All') && this.filterCompany.length > 0) {
        //  //
        //  //     console.log('new2');
        //  //     this.checkAllStatus = false;
        //  //     let cmpy = [];
        //  //     for (let k = 0; k < this.filterCompany.length; k++) {
        //  //         for (let j = 0; j < this.setAllProductLists.length; j++) {
        //  //             if (this.filterCompany[k] == this.setAllProductLists[j].company_name) {
        //  //                 cmpy.push(this.setAllProductLists[j]);
        //  //             }
        //  //         }
        //  //     }
        //  //     this.allProductLists = cmpy;
        //  //
        //  //    }
        //  //    else if(this.filterCompany.includes('All') ){
        //  //        console.log('first');
        //  //
        //  //        this.checkAllStatus = true;
        //  //        this.allProductLists = this.setAllProductLists;
        //  //        let all = ['All'];
        //  //        for (let i = 0; i < this.allCompanyList.length; i++) {
        //  //            all.push(this.allCompanyList[i].company_name);
        //  //        }
        //  //        if(this.filterCompany.length == this.allCompanyList.length) {
        //  //            this.filterCompany = all;
        //  //        } else {
        //  //            this.filterCompany = setFieldValues;
        //  //
        //  //        }
        //  //
        //  //    } else if(!this.filterCompany.includes('All') && this.filterCompany.length == this.allCompanyList.length){
        //  //        console.log('new');
        //  //
        //  //        this.checkAllStatus = true;
        //  //        this.allProductLists = this.setAllProductLists;
        //  //        let all = [];
        //  //        for (let i = 0; i < this.allCompanyList.length; i++) {
        //  //            all.push(this.allCompanyList[i].company_name);
        //  //        }
        //  //        this.filterCompany = all;
        //  //    }
        //  //    else if (!this.filterCompany.includes('All') && filterWithoutAll.length == 0) {
        //  //        console.log('sec');
        //  //        this.checkAllStatus = false;
        //  //        this.allProductLists = [];
        //  //        this.filterCompany = [];
        //  //    } else if (this.filterCompany.length == 0) {
        //  //        console.log('frth');
        //  //        this.checkAllStatus = false;
        //  //        this.allProductLists = [];
        //  //        this.filterCompany = [];
        //  //    }
        // }
        sessionStorage.filterCompany = JSON.stringify(this.filterCompany);
        sessionStorage.allProductLists = JSON.stringify(this.allProductLists);

    }
    numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }


    booking(value, enqId, gname) {
        console.log(value, 'vlitss');
        sessionStorage.travelPremiumList = JSON.stringify(value);
        if ((this.auth.getPosStatus() == '0' || this.auth.getPosStatus() == 0) && (this.auth.getPosRoleId() =='3' && this.auth.getPosRoleId() ==3)) {
            let dialogRef = this.dialog.open(PosstatusAlertTravel, {
                width: '700px',
            });
            dialogRef.disableClose = true;
            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    if (value.product_id <= 37 && value.product_id >=32) {
                        this.router.navigate(['/travelproposal'  + '/' + false]);
                    }  else if (value.product_id <= 31 && value.product_id >=27 || (value.product_id <= 76 && value.product_id >= 72)) {
                        this.router.navigate(['/hdfc-travel'  + '/' + false]);
                    } else if (value.product_id <= 26 && value.product_id >=24) {
                        this.router.navigate(['/shriram-travel-home' + '/' + false]);
                    }else if (value.product_id == 52) {
                        this.router.navigate(['/reliancetravel' + '/' + false]);
                    }else if (value.product_id <= 59 && value.product_id >=38) {
                        this.router.navigate(['/religaretravel'  + '/' + false]);
                    }else if(value.product_id <= 90) {
                        this.router.navigate(['/bajaj-travel'  + '/' + false]);
                    } else {}
                }
            });
        }  else {
            if (value.product_id <= 37 && value.product_id >=32) {
                this.router.navigate(['/travelproposal'  + '/' + false]);
            }   else if (value.product_id <= 31 && value.product_id >=27 || (value.product_id <= 76 && value.product_id >= 72)) {
                this.router.navigate(['/hdfc-travel'  + '/' + false]);
            } else if (value.product_id <= 26 && value.product_id >=24) {
                this.router.navigate(['/shriram-travel-home'+ '/' + false]);
            }else if (value.product_id == 52 || (value.product_id >= 60 && value.product_id <= 65) || (value.product_id >= 82 && value.product_id <= 85) ) {
                this.router.navigate(['/reliancetravel' + '/' + false]);
            }else if (value.product_id <= 59 && value.product_id >=38) {
                this.router.navigate(['/religaretravel' + '/' + false]);
            } else if(value.product_id <= 90) {
                this.router.navigate(['/bajaj-travel'  + '/' + false]);
            }else {

            }
        }
    }
    dyasCalculation() {
        let fDate = this.datePipe.transform(this.startDate, 'MM/dd/yyyy');
        let tDate = this.datePipe.transform(this.endDate, 'MM/dd/yyyy');
        let diff = Date.parse(tDate) - Date.parse(fDate);
        return Math.floor(diff / 86400000);
    }
    // view key features details
    viewKeyList(value) {
        console.log(value, 'valuevaluevaluevalue');
        let dialogRef = this.dialog.open(TravelViewKeyFeaturesComponent, {
            width: '1500px', data:{ planName: value.plan_name, type: value.travel_user_type, product_id: value.product_id, plan_name: value.plan_name1 }
        });
        dialogRef.disableClose = true;

        dialogRef.afterClosed().subscribe(result => {
        });

    }
    addCompare(value, index) {
        console.log(value, 'valuepp');
        const data  = { index: index, plan_id: value.plan_id, product_id: value.product_id, plan_description: value.plan_description, plan_name: value.plan_name, premium_amount: value.total_premium, suminsured_amount: value.sum_insured_amount, suminsured_id: value.sum_insured_id, company_logo: value.company_logo, company_name: value.company_name, key_features: value.key_features, plan: value.plan, travel_user_type: value.travel_user_type};
        this.equiryId = value.enquiry_id;
        this.allProductLists[index].compare = true;
        this.compareArray.push(data);
        if (this.compareArray.length >= 3) {
            for (let i = 0; i < this.allProductLists.length; i++) {
                this.allProductLists[i].compare = true;
            }
        }

    }
    removeCompare(index , pindex) {
        this.allProductLists[pindex].compare = false;
        this.compareArray.splice(index, 1);
        let getCount;
        for (let i = 0; i < this.allProductLists.length; i++) {
            getCount = false;
            for (let j = 0; j < this.compareArray.length; j++) {
                if (this.compareArray[j].plan_id == this.allProductLists[i].plan_id) {
                    getCount = true;
                    this.allProductLists[i].compare = true;
                }
            }
            if (!getCount) {
                this.allProductLists[i].compare = false;
            }
        }

    }
    removeAllCompare(index) {
        for (let i = 0; i < this.allProductLists.length; i++) {
            this.allProductLists[i].compare = false;
        }
        this.compareArray = [];
    }
    compareList(value) {
        console.log(value, 'lop1');
        let plan;
        this.productLists = [];
        for (let i = 0; i < value.length; i++) {
            this.productLists.push({plan_id: value[i].plan_id, product_id: value[i].product_id, premium_amount: value[i].premium_amount, suminsured_amount: value[i].suminsured_amount, prod_suminsuredid: value[i].suminsured_id, sub_plan: value[i].plan ? value[i].plan : '', travel_user_type: value[i].travel_user_type });
            // if(value[i].product_id == '90'){
            //     plan = value[i].plan;
            }
        console.log(this.compareArray,'this.compareArray');
        console.log(this.productLists,'this.productLists');

        // for(let i = 0; i < this.setAllProductLists.length; i++){
        //     if(this.setAllProductLists[i].product_id == '90'){
        //         plan = this.setAllProductLists[i].plan;
        //     }
        // }
        const data = {
            'platform': 'web',
            'enquiry_id': this.enquiryDetails.enquiry_id,
            'product_lists': this.productLists,
            'created_by': 0,
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',


        };
        this.settings.loadingSpinner = true;
        this.travel.addtoCompare(data).subscribe(
            (successData) => {
                this.compareSuccess(successData);
            },
            (error) => {
                this.compareFailure(error);
            }
        );
    }
    public compareSuccess(successData) {
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {
            let dialogRef = this.dialog.open(TravelCompareComponent, {
                width: '1500px', data: {comparedata: successData.ResponseObject}});
            dialogRef.disableClose = true;

            dialogRef.afterClosed().subscribe(result => {
            });
        }
    }
    public compareFailure(error) {
        this.settings.loadingSpinner = false;
    }


}
 @Component({
    selector: 'posstatusalert',
    template: `
        <div mat-dialog-content class="text-center">
            <label>You're not verified. Do you want to continue?</label>
        </div>
        <div mat-dialog-actions style="justify-content: center">
            <button mat-button class="secondary-bg-color" (click)="onNoClick()" >Cancel</button>
            <button mat-raised-button color="primary" [mat-dialog-close]="true" >Ok</button>
        </div>
    `

})
export class PosstatusAlertTravel {

    constructor(
        public dialogRef: MatDialogRef<PosstatusAlertTravel>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}







// old

// import {Component, Inject, OnInit} from '@angular/core';
// import {Router} from '@angular/router';
// import {TravelService} from '../../shared/services/travel.service';
// import {ToastrService} from 'ngx-toastr';
// import {FormBuilder} from '@angular/forms';
// import {AuthService} from '../../shared/services/auth.service';
// import {AppSettings} from '../../app.settings';
// import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
// import {ConfigurationService} from '../../shared/services/configuration.service';
// import {DatePipe} from '@angular/common';
// import {Settings} from '../../app.settings.model';
// import { TravelViewKeyFeaturesComponent} from './travel-view-key-features/travel-view-key-features.component';
// import { TravelCompareComponent} from './travel-compare/travel-compare.component';
// import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
// import {MomentDateAdapter} from '@angular/material-moment-adapter';
// export const MY_FORMATS = {
//     parse: {
//         dateInput: 'DD/MM/YYYY',
//     },
//     display: {
//         dateInput: 'DD/MM/YYYY',
//         monthYearLabel: 'MM YYYY',
//         dateA11yLabel: 'DD/MM/YYYY',
//
//         monthYearA11yLabel: 'MM YYYY',
//     },
// };
// @Component({
//     selector: 'app-travel-premium-list',
//     templateUrl: './travel-premium-list.component.html',
//     styleUrls: ['./travel-premium-list.component.scss'],
//     providers: [
//         {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
//         {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
//     ]
// })
// export class TravelPremiumListComponent implements OnInit {
//     public settings: Settings;
//     selfArray: any;
//     familyArray: any;
//     studentArray: any;
//     groupArray: any;
//     showFamily: boolean;
//
//     value: any;
//     showSelf: boolean;
//     showGroup: boolean;
//     showstudent: boolean;
//     Child3BTn: boolean;
//     FatherBTn: boolean;
//     MotherBTn: boolean;
//     AddFamilyBTN: boolean;
//     Member5BTn: boolean;
//     Member6BTn: boolean;
//     Member7BTn: boolean;
//     Member8BTn: boolean;
//     Member9BTn: boolean;
//     Member10BTn: boolean;
//     Student5BTn: boolean;
//     Student6BTn: boolean;
//     Student7BTn: boolean;
//     Student8BTn: boolean;
//     Student9BTn: boolean;
//     Student10BTn: boolean;
//     count: any;
//     sumInsuredAmountLists: any;
//     currentTab: any;
//     maxDate: any;
//     startDateError: any;
//     endDateError: any;
//     today: any;
//
//     selectedAmount: any;
//     daysCount: any;
//     startDate: any;
//     endDate: any;
//     travelPlan: any;
//     medicalCondition: any;
//     finalData: any;
//     sumerror: any;
//     medicalerror: any;
//     duration: any;
//     premiumLists: any;
//     travelType: any;
//     getArray: any;
//     webhost: any;
//     selectedIndex: any;
//     compareArray: any;
//     productLists: any;
//     equiryId: any;
//     daysBookingCount: any;
//     viewList: any;
//     setAllTravelFamilyDetails: any;
//     allCompanyList: any;
//     filterCompany: any;
//     tabIndex: any;
//     constructor(public appSettings: AppSettings, public router: Router, public config: ConfigurationService, public fb: FormBuilder, public dialog: MatDialog, public travel: TravelService, public toast: ToastrService, public auth: AuthService, public datePipe : DatePipe) {
//         this.settings = this.appSettings.settings;
//         this.tabIndex = 0;
//         this.premiumLists = JSON.parse(sessionStorage.allTravelPremiumLists);
//         this.setAllTravelFamilyDetails = JSON.parse(sessionStorage.setAllTravelFamilyDetails);
//         this.allCompanyList = [];
//         for (let i = 0; i < this.premiumLists.length; i++) {
//             for (let j = 0; j < this.premiumLists[i].product_lists.length; j++) {
//                 if(this.allCompanyList.indexOf(this.premiumLists[i].product_lists[j].company_name) == -1) {
//                     this.allCompanyList.push(this.premiumLists[i].product_lists[j].company_name);
//                 }
//             }
//         }
//         this.filterCompany = this.allCompanyList;
//
//         console.log(this.premiumLists, 'testy');
//         this.settings.HomeSidenavUserBlock = false;
//         this.settings.sidenavIsOpened = false;
//         this.settings.sidenavIsPinned = false;
//         this.webhost = this.config.getimgUrl();
//         // this.selectedAmount = this.premiumLists.suminsured_id;
//         this.selectedAmount = this.premiumLists.suminsured_amount;
//         this.startDate = this.premiumLists.start_date;
//         this.maxDate = this.startDate;
//         this.endDate = this.premiumLists.end_date;
//         this.travelPlan = this.premiumLists.plan_type;
//         this.travelType = this.premiumLists.travel_time_type;
//         this.duration = this.premiumLists.duration;
//         this.medicalCondition = this.premiumLists.medical_condition;
//         this.daysCount = this.premiumLists.day_count;
//         for (let i = 0; i < this.premiumLists.length; i++) {
//             this.premiumLists[i].compare = false;
//             this.premiumLists[i].shortlist = false;
//         }
//         console.log(this.premiumLists.travel_type, 'pppp');
//         if (this.premiumLists.travel_type == 'self') {
//             this.selectedIndex = 0;
//             this.selfDetails();
//             this.showSelf = true;
//             this.showFamily = false;
//             this.showGroup = false;
//             this.showstudent = false;
//             this.currentTab = 'self';
//         } else if (this.premiumLists.travel_type == 'family') {
//             this.selectedIndex = 1;
//             this.familyDetails();
//             this.showSelf = false;
//             this.showFamily = true;
//             this.showGroup = false;
//             this.showstudent = false;
//             this.currentTab = 'family';
//         } else if (this.premiumLists.travel_type == 'group') {
//             this.selectedIndex = 2;
//             this.groupDetails();
//             this.showSelf = false;
//             this.showFamily = false;
//             this.showGroup = true;
//             this.showstudent = false;
//             this.currentTab = 'group';
//         } else if (this.premiumLists.travel_type == 'students') {
//             this.selectedIndex = 3;
//             this.studentDetails();
//             this.showSelf = false;
//             this.showFamily = false;
//             this.showGroup = false;
//             this.showstudent = true;
//             this.currentTab = 'students';
//         }
//         this.today = new Date();
//         this.compareArray = [];
//
//     }
//     ngOnInit() {
//         this.settings.loadingSpinner = false;
//         this.Child3BTn = true;
//         this.FatherBTn = true;
//         this.MotherBTn = true;
//         this.AddFamilyBTN = true;
//         this.Member5BTn = true;
//         this.Member6BTn = true;
//         this.Member7BTn = true;
//         this.Member8BTn = true;
//         this.Member9BTn = true;
//         this.Member10BTn = true;
//         this.Student5BTn = true;
//         this.Student6BTn = true;
//         this.Student7BTn = true;
//         this.Student8BTn = true;
//         this.Student9BTn = true;
//         this.Student10BTn = true;
//         this.count = 0;
//         this.sumInsuredAmonut();
//         this.viewPlanList();
//         // this.test();
//         if (sessionStorage.filterCompany != undefined && sessionStorage.filterCompany != '') {
//             this.filterCompany = JSON.parse(sessionStorage.filterCompany);
//         }
//     }
//     // filter by product
//     filterByProducts(){
//         let index = sessionStorage.changedTabIndex;
//         let cmpy = [];
//         for (let k = 0; k < this.filterCompany.length; k++) {
//             for (let j = 0; j < this.premiumLists[index].all_product_list.length; j++) {
//                 if (this.filterCompany[k] == this.premiumLists[index].all_product_list[j].company_name) {
//                     // this.insuranceLists[0].product_lists.push(this.insuranceLists[0].product_lists[j]);
//                     cmpy.push(this.premiumLists[index].all_product_list[j]);
//                 }
//             }
//         }
//         if(this.filterCompany.length < 1) {
//             console.log('innnn');
//             this.premiumLists[index].product_lists = this.premiumLists[index].all_product_list;
//         } else {
//             this.premiumLists[index].product_lists = cmpy;
//         }
//         sessionStorage.filterCompany = JSON.stringify(this.filterCompany);
//     }
//
//     selectedSumAmount(){
//     }
//     changeTravelType() {
//     }
//     selfDetails() {
//         this.selfArray = [
//             {name: 'Self', age: '', disabled: false, checked: false, required: true, error: ''}
//         ];
//         this.getArray = this.premiumLists.family_details;
//         for (let i =0; i < this.getArray.length; i++) {
//             if (this.getArray[i].age !='') {
//                 this.selfArray[i].checked = true;
//                 this.selfArray[i].required = false;
//                 this.selfArray[i].age = this.getArray[i].age;
//             }
//         }
//
//     }
//     familyDetails() {
//         this.familyArray = [
//             {name: 'Self', age: '', disabled: false, checked: false, required: true, error: ''},
//             {name: 'Spouse', age: '', disabled: false, checked: false, required: false, error: ''},
//             {name: 'Child1', age: '', disabled: false, checked: false, required: false, error: ''},
//             {name: 'Child2', age: '', disabled: false, checked: false, required: false, error: ''}
//         ];
//         this.getArray = this.premiumLists.family_details;
//         for (let i =0; i < this.getArray.length; i++) {
//             if (this.getArray[i].age !='') {
//                 this.familyArray[i].checked = true;
//                 this.familyArray[i].required = false;
//                 this.familyArray[i].age = this.getArray[i].age;
//             }
//         }
//     }
//     groupDetails() {
//         this.groupArray = [
//             {name: 'Member1', age: '', disabled: false, checked: false, required: true, error: ''},
//             {name: 'Member2', age: '', disabled: false, checked: false, required: true, error: ''},
//             {name: 'Member3', age: '', disabled: false, checked: false, required: true, error: ''},
//             {name: 'Member4', age: '', disabled: false, checked: false, required: true, error: ''}
//         ];
//         this.getArray = this.premiumLists.family_details;
//         for (let i =0; i < this.getArray.length; i++) {
//             if (this.getArray[i].age !='') {
//                 this.groupArray[i].checked = true;
//                 this.groupArray[i].required = false;
//                 this.groupArray[i].age = this.getArray[i].age;
//             }
//         }
//     }
//     studentDetails() {
//         this.studentArray = [
//             {name: 'Student1', age: '', disabled: false, checked: false, required: true, error: ''},
//             {name: 'Student2', age: '', disabled: false, checked: false, required: false, error: ''},
//             {name: 'Student3', age: '', disabled: false, checked: false, required: false, error: ''},
//             {name: 'Student4', age: '', disabled: false, checked: false, required: false, error: ''}
//         ];
//         this.getArray = this.premiumLists.family_details;
//         for (let i =0; i < this.getArray.length; i++) {
//             if (this.getArray[i].age !='') {
//                 this.studentArray[i].checked = true;
//                 this.studentArray[i].required = false;
//                 this.studentArray[i].age = this.getArray[i].age;
//             }
//         }
//     }
//     // view plan
//     viewPlanList() {
//         const data = {
//             'platform': 'web',
//             'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
//             'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
//             'pos_status': '0'
//         }
//         this.travel.getAllcountry(data).subscribe(
//             (successData) => {
//                 this.viewPlanSuccess(successData);
//             },
//             (error) => {
//                 this.viewPlanFailure(error);
//             }
//         );
//
//     }
//
//     public viewPlanSuccess(successData) {
//         console.log(successData.ResponseObject);
//         if (successData.IsSuccess) {
//             // this.occupationFirst = true;
//             // this.occupationSecond = true;
//             this.viewList = successData.ResponseObject;
//             // this.personal.get('personalDescriptionCode').setValidators([Validators.required]);
//
//             console.log(this.viewList, 'occupationdescription');
//         } else {
//             // this.occupationFirst = true;
//             // this.occupationSecond = false;
//             //  this.personal.get('personalDescriptionCode').setValidators(null);
//             // this.toastr.error(successData.ErrorObject);
//         }
//
//     }
//     public viewPlanFailure(error) {
//         console.log(error);
//     }
//
//
//     // this function will get the sum insured amounts
//     public sumInsuredAmonut(): void {
//         const data = {
//             'platform': 'web',
//             'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
//             'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
//             'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0'
//         };
//         this.travel.getTravelSumInsuredAmount(data).subscribe(
//             (successData) => {
//                 this.getSumInsuredAmountSuccess(successData);
//             },
//             (error) => {
//                 this.getSumInsuredAmountFailure(error);
//             }
//         );
//     }
//     public getSumInsuredAmountSuccess(successData) {
//         if (successData.IsSuccess) {
//             this.sumInsuredAmountLists = successData.ResponseObject;
//         }
//     }
//     public getSumInsuredAmountFailure(error) {
//         console.log(error, 'error');
//     }
//
//     onSelectedIndexChange(event){
//         console.log(event, 'value');
//         this.currentTab = this.premiumLists.travel_type;
//         if (event == 0) {
//             this.currentTab = 'self';
//             this.selfDetails();
//             this.showSelf = true;
//             this.showFamily = false;
//             this.showGroup = false;
//             this.showstudent = false;
//         } else if (event == 1) {
//             this.currentTab = 'family';
//             this.familyDetails();
//             this.showSelf = false;
//             this.showFamily = true;
//             this.showGroup = false;
//             this.showstudent = false;
//         } else if (event == 2) {
//             this.currentTab = 'group';
//             this.groupDetails();
//             this.showSelf = false;
//             this.showFamily = false;
//             this.showGroup = true;
//             this.showstudent = false;
//         } else if (event == 3) {
//             this.currentTab = 'students';
//             this.studentDetails();
//             this.showSelf = false;
//             this.showFamily = false;
//             this.showGroup = false;
//             this.showstudent = true;
//         }
//     }
//
//     ckeckedUser(index, checked, name) {
//         console.log(this.currentTab, 'this.currentTab');
//
//         if (checked) {
//             if (this.currentTab == 'self') {
//                 this.selfArray[index].checked = true;
//             } else if (this.currentTab == 'family') {
//                 this.familyArray[index].checked = true;
//             } else if (this.currentTab == 'group') {
//                 this.groupArray[index].checked = true;
//             } else if (this.currentTab == 'students') {
//                 this.studentArray[index].checked = true;
//             }
//         } else {
//             if (this.currentTab == 'self') {
//                 this.selfArray[index].checked = false;
//                 this.selfArray[index].age = '';
//                 if (this.selfArray.length > 1) this.selfArray.splice(index, 1);
//             } else if (this.currentTab == 'family') {
//                 this.familyArray[index].checked = false;
//                 this.familyArray[index].age = '';
//                 if (this.familyArray.length > 4) this.familyArray.splice(index, 1);
//             } else if (this.currentTab == 'group') {
//                 this.groupArray[index].checked = false;
//                 this.groupArray[index].age = '';
//                 if (this.groupArray.length > 4) this.groupArray.splice(index, 1);
//             } else if (this.currentTab == 'students') {
//                 this.studentArray[index].checked = false;
//                 this.studentArray[index].age = '';
//                 if (this.studentArray.length > 1) this.studentArray.splice(index, 1);
//             }
//             this.contrlButtons(name, checked);
//         }
//     }
//     addFamily(value){
//         this.familyArray.push({name: value, age: '', disabled: false, checked: true, required: false, error: ''});
//         this.contrlButtons(value, true);
//     }
//     contrlButtons(value, checked) {
//         if (checked) {
//             if (value == 'Child3'){
//                 this.Child3BTn = false;
//             }
//             else if(value == 'Father'){
//                 this.FatherBTn = false;
//             }
//             else if(value == 'Mother'){
//                 this.MotherBTn = false;
//             } else  if (value == 'Member5'){
//                 this.Member5BTn = false;
//             }
//             else if(value == 'Member6'){
//                 this.Member6BTn = false;
//             }
//             else if(value == 'Member7'){
//                 this.Member7BTn = false;
//             }
//             else if(value == 'Member8'){
//                 this.Member8BTn = false;
//             }
//             else if(value == 'Member9'){
//                 this.Member9BTn = false;
//             }
//             else if(value == 'Member10'){
//                 this.Member10BTn = false;
//             }
//             else if(value == 'Student6'){
//                 this.Student6BTn = false;
//             }
//             else if(value == 'Student7'){
//                 this.Student7BTn = false;
//             }
//             else if(value == 'Student8'){
//                 this.Student8BTn = false;
//             }
//             else if(value == 'Student9'){
//                 this.Student9BTn = false;
//             }
//             else if(value == 'Student10'){
//                 this.Student10BTn = false;
//             }
//         } else {
//             if (value == 'Child3'){
//                 this.Child3BTn = true;
//             }
//             else if(value == 'Father'){
//                 this.FatherBTn = true;
//             }
//             else if(value == 'Mother'){
//                 this.MotherBTn = true;
//             } else  if (value == 'Member5'){
//                 this.Member5BTn = true;
//             }
//             else if(value == 'Member6'){
//                 this.Member6BTn = true;
//             }
//             else if(value == 'Member7'){
//                 this.Member7BTn = true;
//             }
//             else if(value == 'Member8'){
//                 this.Member8BTn = true;
//             }
//             else if(value == 'Member9'){
//                 this.Member9BTn = true;
//             }
//             else if(value == 'Member10'){
//                 this.Member10BTn = true;
//             }
//             else if (value == 'Student5'){
//                 this.Student5BTn = true;
//             }
//             else if(value == 'Student6'){
//                 this.Student6BTn = true;
//             }
//             else if(value == 'Student7'){
//                 this.Student7BTn = true;
//             }
//             else if(value == 'Student8'){
//                 this.Student8BTn = true;
//             }
//             else if(value == 'Student9'){
//                 this.Student9BTn = true;
//             }
//             else if(value == 'Student10'){
//                 this.Student10BTn = true;
//             }
//         }
//         sessionStorage.Child3BTn = this.Child3BTn;
//         sessionStorage.FatherBTn = this.FatherBTn;
//         sessionStorage.Member5BTn = this.Member5BTn;
//         sessionStorage.Member6BTn = this.Member6BTn;
//         sessionStorage.Member7BTn = this.Member7BTn;
//         sessionStorage.Member8BTn = this.Member8BTn;
//         sessionStorage.Member9BTn = this.Member9BTn;
//         sessionStorage.Member10BTn = this.Member10BTn;
//         sessionStorage.Student5BTn = this.Student5BTn;
//         sessionStorage.Student6BTn = this.Student6BTn;
//         sessionStorage.Student7BTn = this.Student7BTn;
//         sessionStorage.Student8BTn = this.Student8BTn;
//         sessionStorage.Student9BTn = this.Student9BTn;
//         sessionStorage.Student10BTn = this.Student10BTn;
//
//     }
//     typeAge(checked, index, value) {
//         if (value != '') {
//             if (this.currentTab == 'self') {
//                 this.selfArray[index].checked = true;
//             } else if (this.currentTab == 'family') {
//                 this.familyArray[index].checked = true;
//             } else if (this.currentTab == 'group') {
//                 this.groupArray[index].checked = true;
//             } else if (this.currentTab == 'students') {
//                 this.studentArray[index].checked = true;
//             }
//         } else {
//             if (this.currentTab == 'self') {
//                 this.selfArray[index].checked = false;
//             } else if (this.currentTab == 'family') {
//                 this.familyArray[index].checked = false;
//             } else if (this.currentTab == 'group') {
//                 this.groupArray[index].checked = false;
//             } else if (this.currentTab == 'students') {
//                 this.studentArray[index].checked = false;
//             }
//         }
//         // sessionStorage.selfArray = JSON.stringify(this.selfArray);
//         // sessionStorage.familyArray = JSON.stringify(this.familyArray);
//         // sessionStorage.groupArray = JSON.stringify(this.groupArray);
//         // sessionStorage.studentArray = JSON.stringify(this.studentArray);
//     }
//     addGroupMembers(value){
//         this.groupArray.push({name: value, age: '', disabled: false, checked: true, required: false, error: ''});
//         this.contrlButtons(value, true);
//     }
//     addStudents(value){
//         this.studentArray.push({name: value, age: '', disabled: false, checked: true, required: false, error: ''});
//         this.contrlButtons(value, true);
//     }
//
//     numberOnly(event): boolean {
//         const charCode = (event.which) ? event.which : event.keyCode;
//         if (charCode > 31 && (charCode < 48 || charCode > 57)) {
//             return false;
//         }
//         return true;
//     }
//
//     chooseDate(event, type) {
//         console.log(event, 'event');
//         this.maxDate = '';
//         if (event.value != null) {
//             if (typeof event.value._i == 'string') {
//                 const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
//                 if (type == 'sDate') {
//                     if (pattern.test(event.value._i) && event.value._i.length == 10) {
//                         this.startDateError = '';
//                     } else {
//                         this.startDateError = 'Enter Valid Date';
//                     }
//                 } else if (type == 'eDate') {
//                     if (pattern.test(event.value._i) && event.value._i.length == 10) {
//                         this.endDateError = '';
//                     } else {
//                         this.endDateError = 'Enter Valid Date';
//                     }
//                 }
//                 let selectedDate;
//                 selectedDate = event.value._i;
//                 console.log(selectedDate, 'selectedDate');
//                 if (selectedDate.length == 10) {
//                     if (type == 'sDate') {
//                         console.log('inst');
//                         this.maxDate = event.value;
//                     }
//                 }
//             } else if (typeof event.value._i == 'object') {
//                 if (type == 'sDate') {
//                     this.startDateError = '';
//                     let fDate = this.datePipe.transform(new Date(), 'MM/dd/yyyy');
//                     let tDate = this.datePipe.transform(this.startDate, 'MM/dd/yyyy');
//                     let diff = Date.parse(tDate) - Date.parse(fDate);
//                     this.daysBookingCount =  Math.floor(diff / 86400000);
//                     console.log(this.daysBookingCount, 'daysCount22');
//                 } else if (type == 'eDate') {
//                     this.endDateError = '';
//                 }
//                 if (type == 'sDate') {
//                     console.log('inobt');
//                     this.maxDate = event.value;
//                 }
//             }
//             if (type == 'sDate') {
//                 sessionStorage.startDate = this.startDate;
//             } else if (type == 'eDate') {
//                 sessionStorage.endDate = this.endDate;
//                 let days = this.dyasCalculation();
//                 this.daysCount = days;
//                 sessionStorage.daysCount = days;
//                 console.log(days, 'daysdays');
//
//             }
//         }
//     }
//
//
//     onSelectedGroupChange(index) {
//         console.log(index, 'indexindexindex');
//         sessionStorage.changedTabIndex = index;
//         console.log(this.premiumLists, 'this.premiumListsthis.premiumLists');
//         const data = {
//             "platform": "web",
//             "suminsured_id": this.premiumLists[index].suminsured_id,
//             "suminsured_amount": this.premiumLists[index].suminsured_amount,
//             "family_details": this.setAllTravelFamilyDetails,
//             "family_group_name": this.premiumLists[index].name,
//             "insurance_type": this.premiumLists[index].insurance_type,
//             "enquiry_id": this.premiumLists[index].enquiry_id,
//             "travel_time_type": this.premiumLists[index].travel_time_type,
//             "travel_type": this.premiumLists[index].travel_type,
//             "role_id": this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
//             "pos_status": this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
//             "user_id": this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '0'
//         }
//         this.settings.loadingSpinner = true;
//         console.log(data, 'this.datadata');
//         this.travel.updatedTravelPremiumCal(data).subscribe(
//             (successData) => {
//                 this.getTabUpdateSuccess(successData);
//             },
//             (error) => {
//                 this.getTabUpdateFailure(error);
//             }
//         );
//
//
//     }
//     getTabUpdateSuccess(successData){
//         console.log(successData, 'successDatasuccessData');
//
//     }
//     getTabUpdateFailure(error){
//         this.settings.loadingSpinner = false;
//
//     }
//
//
//
//     submit(groupname) {
//         console.log(groupname, 'groupname');
//         this.medicalerror = true;
//         this.finalData = [];
//         if (this.selectedAmount == '' || this.selectedAmount == undefined) {
//             this.sumerror = true;
//         } else {
//             this.sumerror = false;
//         }
//         if (this.medicalCondition == '' || this.medicalCondition == undefined) {
//             this.medicalerror = true;
//         } else {
//             this.medicalerror = false;
//         }
//         let memberValid = false;
//         let getFiledData = '';
//         if (groupname == 'self') {
//             getFiledData = this.selfArray.filter(data => data.checked == true);
//             if (getFiledData != '') {
//                 this.selfArray[0].error = '';
//             } else {
//                 this.selfArray[0].error = 'Required';
//             }
//             if (this.selfArray[0].checked) {
//                 if (this.selfArray[0].age == '') {
//                     this.selfArray[0].error = 'Required';
//                     memberValid = true;
//                 } else {
//                     this.selfArray[0].error = '';
//                     memberValid = false;
//                     this.finalData.push({type: this.selfArray[0].name, age: this.selfArray[0].age });
//                 }
//             }
//
//         } else if (groupname == 'family') {
//             getFiledData = this.familyArray.filter(data => data.checked == true);
//             if (getFiledData != '') {
//                 this.familyArray[0].error = '';
//             } else {
//                 this.familyArray[0].error = 'Required';
//             }
//             console.log(getFiledData, 'getFiledData1');
//             for (let i = 0; i < this.familyArray.length; i++) {
//                 memberValid = false;
//                 if (this.familyArray[i].checked) {
//                     if (this.familyArray[i].age == '') {
//                         this.familyArray[i].error = 'Required';
//                         memberValid = true;
//                         break;
//                     } else {
//                         this.familyArray[i].error = '';
//                         memberValid = false;
//                         this.finalData.push({type: this.familyArray[i].name, age: this.familyArray[i].age });
//                     }
//                 }
//             }
//
//         } else if (groupname == 'group') {
//             for (let i = 0; i < 4; i++) {
//                 if (!this.groupArray[i].checked) {
//                     this.groupArray[i].error = 'Required';
//                 }
//             }
//             for (let i = 0; i < this.groupArray.length; i++) {
//                 if (this.groupArray[i].checked) {
//                     if (this.groupArray[i].age == '') {
//                         this.groupArray[i].error = 'Required';
//                     } else {
//                         this.groupArray[i].error = '';
//                         this.finalData.push({type: this.groupArray[i].name, age: this.groupArray[i].age});
//                     }
//                 }
//             }
//         } else if (groupname == 'students') {
//             for (let i = 0; i < 4; i++) {
//                 if (!this.studentArray[i].checked) {
//                     this.studentArray[i].error = 'Required';
//                 }
//             }
//             for (let i = 0; i < this.studentArray.length; i++) {
//                 if (this.studentArray[i].checked) {
//                     if (this.studentArray[i].age == '') {
//                         this.studentArray[i].error = 'Required';
//                     } else {
//                         this.studentArray[i].error = '';
//                         this.finalData.push({type: this.studentArray[i].name, age: this.studentArray[i].age});
//                     }
//                 }
//             }
//         }
//         let sum_amount = '';
//         for (let i = 0; i < this.sumInsuredAmountLists.length; i++) {
//             if (this.sumInsuredAmountLists[i].suminsured_amount == this.selectedAmount) {
//                 sum_amount = this.sumInsuredAmountLists[i].suminsured_id;
//             }
//         }
//         // console.log(this.studentArray, 'this.studentArray');
//         if (!memberValid && this.medicalerror == false && getFiledData != '' && !this.sumerror) {
//             sessionStorage.setAllTravelFamilyDetails = JSON.stringify(this.finalData);
//             let sDate = this.datePipe.transform(this.startDate, 'y-MM-dd');
//             let eDate = this.datePipe.transform(this.endDate, 'y-MM-dd');
//             let days = this.dyasCalculation();
//             console.log(days, 'days');
//             if (days < 180) {
//                 const data = {
//                     'platform': 'web',
//                     'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
//                     'user_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '0',
//                     'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
//                     'sum_insured': sum_amount,
//                     'sum_amount': this.selectedAmount,
//                     'family_members': this.finalData,
//                     'travel_place': this.travelPlan,
//                     'travel_plan_type': this.travelType,
//                     'enquiry_id': this.premiumLists.enquiry_id,
//                     'start_date': sDate,
//                     'end_date': eDate,
//                     'day_count': days,
//                     'duration': this.duration ? this.duration : '',
//                     'travel_user_type': groupname,
//                     'medical_condition': this.medicalCondition
//                 }
//                 this.settings.loadingSpinner = true;
//                 console.log(data, 'this.datadata');
//                 this.travel.getTravelPremiumCal(data).subscribe(
//                     (successData) => {
//                         this.getTravelPremiumCalSuccess(successData);
//                     },
//                     (error) => {
//                         this.getTravelPremiumCalFailure(error);
//                     }
//                 );
//             } else {
//                 this.toast.error('Travel period shoud not be greater than 180 days');
//             }
//         }
//
//     }
//
//     public getTravelPremiumCalSuccess(successData) {
//         console.log(successData);
//         this.settings.loadingSpinner = false;
//         if (successData.IsSuccess) {
//             sessionStorage.allTravelPremiumLists = JSON.stringify(successData.ResponseObject);
//             this.premiumLists = successData.ResponseObject;
//             for (let i = 0; i < this.premiumLists.length; i++) {
//                 this.premiumLists[i].compare = false;
//                 this.premiumLists[i].shortlist = false;
//             }
//             this.router.navigate(['/travelpremium']);
//         } else {
//             this.toast.error(successData.ErrorObject);
//         }
//
//     }
//     public getTravelPremiumCalFailure(error) {
//         this.settings.loadingSpinner = false;
//     }
//     booking(value, enqId, gname) {
//         console.log(value, 'vlitss');
//         sessionStorage.travelPremiumList = JSON.stringify(value);
//         if (this.auth.getPosStatus() == '0') {
//             let dialogRef = this.dialog.open(PosstatusAlertTravel, {
//                 width: '700px',
//             });
//             dialogRef.disableClose = true;
//             dialogRef.afterClosed().subscribe(result => {
//                 if (result) {
//                     if (value.product_id <= 37 && value.product_id >=32) {
//                         this.router.navigate(['/travelproposal'  + '/' + false]);
//                     }  else if (value.product_id <= 31 && value.product_id >=27) {
//                         this.router.navigate(['/hdfc-travel'  + '/' + false]);
//                     } else if (value.product_id <= 26 && value.product_id >=24) {
//                         this.router.navigate(['/shriram-travel-home']);
//                     }else if (value.product_id == 52) {
//                         this.router.navigate(['/reliancetravel']);
//                     }else if (value.product_id <= 59 && value.product_id >=38) {
//                         this.router.navigate(['/religaretravel']);
//                     } else{}
//                 }
//             });
//         }  else {
//             if (value.product_id <= 37 && value.product_id >=32) {
//                 this.router.navigate(['/travelproposal'  + '/' + false]);
//             }   else if (value.product_id <= 31 && value.product_id >=27) {
//                 this.router.navigate(['/hdfc-travel'  + '/' + false]);
//             } else if (value.product_id <= 26 && value.product_id >=24) {
//                 this.router.navigate(['/shriram-travel-home']);
//             }else if (value.product_id == 52) {
//                 this.router.navigate(['/reliancetravel']);
//             }else if (value.product_id <= 59 && value.product_id >=38) {
//                 this.router.navigate(['/religaretravel']);
//             } else {
//
//             }
//         }
//     }
//
//
//     dyasCalculation() {
//         let fDate = this.datePipe.transform(this.startDate, 'MM/dd/yyyy');
//         let tDate = this.datePipe.transform(this.endDate, 'MM/dd/yyyy');
//         let diff = Date.parse(tDate) - Date.parse(fDate);
//         return Math.floor(diff / 86400000);
//     }
//     // view key features details
//     viewKeyList(value, type) {
//         console.log(value, 'valuevaluevaluevalue');
//         let dialogRef = this.dialog.open(TravelViewKeyFeaturesComponent, {
//             width: '1500px', data:{ planName: value.plan_name, type: type, product_id: value.product_id }
//         });
//         dialogRef.disableClose = true;
//
//         dialogRef.afterClosed().subscribe(result => {
//         });
//
//     }
//
//
//     addCompare(value, index) {
//         console.log(value, 'valuepp');
//         const data  = { index: index, plan_id: value.product_id, plan_description: value.plan_description, plan_name: value.plan_name, premium_amount: value.total_premium, suminsured_amount: value.suminsured_amount, suminsured_id: value.suminsured_id, company_logo: value.company_logo, company_name: value.company_name, key_features: value.key_features };
//         this.equiryId = value.enquiry_id;
//         this.premiumLists.product_lists[index].compare = true;
//         this.compareArray.push(data);
//         if (this.compareArray.length >= 3) {
//             for (let i = 0; i < this.premiumLists.product_lists.length; i++) {
//                 this.premiumLists.product_lists[i].compare = true;
//             }
//         }
//
//     }
//     removeCompare(index , pindex) {
//         this.premiumLists.product_lists[pindex].compare = false;
//         this.compareArray.splice(index, 1);
//         let getCount;
//         for (let i = 0; i < this.premiumLists.product_lists.length; i++) {
//             getCount = false;
//             for (let j = 0; j < this.compareArray.length; j++) {
//                 if (this.compareArray[j].premium_id == this.premiumLists.product_lists[i].premium_id) {
//                     getCount = true;
//                     this.premiumLists.product_lists[i].compare = true;
//                 }
//             }
//             if (!getCount) {
//                 this.premiumLists.product_lists[i].compare = false;
//             }
//         }
//
//     }
//     removeAllCompare(index) {
//         for (let i = 0; i < this.premiumLists.product_lists.length; i++) {
//             this.premiumLists.product_lists[i].compare = false;
//         }
//         this.compareArray = [];
//     }
//     compareList(value) {
//         console.log(value, 'lop1');
//         this.productLists = [];
//         for (let i = 0; i < value.length; i++) {
//             this.productLists.push({plan_id: value[i].plan_id, premium_amount: value[i].premium_amount, suminsured_amount: value[i].suminsured_amount, prod_suminsuredid: value[i].suminsured_id});
//         }
//         const data = {
//             'platform': 'web',
//             'enquiry_id': this.equiryId,
//             'product_lists': this.productLists,
//             'created_by': 0,
//             'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
//             'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0
//
//         };
//         this.settings.loadingSpinner = true;
//         this.travel.addtoCompare(data).subscribe(
//             (successData) => {
//                 this.compareSuccess(successData);
//             },
//             (error) => {
//                 this.compareFailure(error);
//             }
//         );
//     }
//     public compareSuccess(successData) {
//         this.settings.loadingSpinner = false;
//         if (successData.IsSuccess) {
//             let dialogRef = this.dialog.open(TravelCompareComponent, {
//                 width: '1500px', data: {comparedata: successData.ResponseObject}});
//             dialogRef.disableClose = true;
//
//             dialogRef.afterClosed().subscribe(result => {
//             });
//         }
//     }
//     public compareFailure(error) {
//         this.settings.loadingSpinner = false;
//     }
//
//
// }
// @Component({
//     selector: 'posstatusalert',
//     template: `
//         <div mat-dialog-content class="text-center">
//             <label>You're not verified. Do you want to continue?</label>
//         </div>
//         <div mat-dialog-actions style="justify-content: center">
//             <button mat-button class="secondary-bg-color" (click)="onNoClick()" >Cancel</button>
//             <button mat-raised-button color="primary" [mat-dialog-close]="true" >Ok</button>
//         </div>
//     `
//
// })
// export class PosstatusAlertTravel {
//
//     constructor(
//         public dialogRef: MatDialogRef<PosstatusAlertTravel>,
//         @Inject(MAT_DIALOG_DATA) public data: any) { }
//
//     onNoClick(): void {
//         this.dialogRef.close();
//     }
//
// }

