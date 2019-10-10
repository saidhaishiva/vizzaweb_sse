import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {CommonService} from '../../shared/services/common.service';
import {ToastrService} from 'ngx-toastr';
import {HealthService} from '../../shared/services/health.service';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {AuthService} from '../../shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

import {ComparelistComponent} from '../health-insurance/comparelist/comparelist.component';
import {PersonalAccidentService} from '../../shared/services/personal-accident.service';
import {ViewdetailsComponent} from '../health-insurance/viewdetails/viewdetails.component';
import {ViewProductDetailsComponent} from './view-product-details/view-product-details.component';
import {DatePipe} from '@angular/common';
import {ClearSessionPaService} from '../../shared/services/clear-session-pa.service';
import {ValidationService} from '../../shared/services/validation.service';
import {MetaService} from '../../shared/services/meta.service';
import {Meta, Title} from '@angular/platform-browser';
import { WINDOW } from '@ng-toolkit/universal';

@Component({
  selector: 'app-personal-accident-home',
  templateUrl: './personal-accident-home.component.html',
  styleUrls: ['./personal-accident-home.component.scss']
})
export class PersonalaccidentComponent implements OnInit {

    public personalaccidents: FormGroup;
    public settings: Settings;
    public annualErrorMessage: any;
    setArray: any;
    closeIcon: boolean;
    occerror: boolean;
    index: any;
    memberLength: any;
    auto: boolean;
    finalData: any;
    occupationCode: any;
    sumerror: boolean;
    pinerror: boolean;
    selectedAmountP: any;
    pincoceP: any;
    occupationP: any;
    Age: any;
    AnnualIncomeP: any;
    count: any;
    sumInsuredAmountLists: any;
    insuranceLists: any;
    pageSettings: any;
    firstPage: any;
    secondPage: any;
    compareArray: any;
    webhost: any;
    tabIndex: number;
    indexList: any;
    currentGroupName: any;
    enquiryIdP: any;
    changeSuninsuredAmount: any;
    personalPremiumLists: any;
    updateFlag: boolean;
    ageUpdateFlag: boolean;
    nonEditable: boolean;
    annualerror: any;
    ageerror: any;
    productData: any;
    //fire
    public show: boolean;
    public fireapp: FormGroup;
    public setDate: any;
    public selectDate: any;
    public productName: any;
    public pin: any;
    public title: any;
    public response: any;
    public pincodeErrors: any;
    public selectedProfession: any;
    public annualIncomeLists: any;
    public professions: any;
    public enquiryDetails: any;
    public productListArray: any;
    public allProductLists: any;
    public allCompanyList: any;
    public firstPolicyDetails: any;
    public filterCompany: any;
    public setAllProductLists: any;
    public professionerr: any;
    public checkAllStatus: any;
    public paProceed: boolean;
    metaPa : any;
    metaTitle : any;
    metaKeyword: any;
    metaDescription: any;

    constructor(@Inject(WINDOW) private window: Window, public appSettings: AppSettings, public clearSession: ClearSessionPaService, public validation: ValidationService, public toastr: ToastrService, public datepipe: DatePipe, public commonservices: CommonService, public personalService: PersonalAccidentService, public router: Router, public route: ActivatedRoute, public config: ConfigurationService, public fb: FormBuilder, public dialog: MatDialog, public toast: ToastrService, public auth: AuthService, public meta: MetaService, public metaTag: Meta, private titleService: Title) {

        this.settings = this.appSettings.settings;
        this.webhost = this.config.getimgUrl();
        // sessionStorage.sideMenu = false;
        // this.settings.loadingSpinner = true
        if(window.innerWidth < 787){
            this.settings.HomeSidenavUserBlock = false;
            this.settings.sidenavIsOpened = false;
            this.settings.sidenavIsPinned = false;
        }else{
            this.settings.HomeSidenavUserBlock = true;
            this.settings.sidenavIsOpened = true;
            this.settings.sidenavIsPinned = true;
        }
        this.fireapp = this.fb.group({
            'appdate': ['', Validators.required],
            'apptime': null,
            'name': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            'contactperson': ['', Validators.compose([Validators.required])],
            'mobile': ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}'), Validators.minLength(10)])],
            'email': ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
            'pincode': ['', Validators.compose([Validators.required])],
            'insurance': ['', Validators.compose([Validators.required])],
            'appointmentwith': ['', Validators.compose([Validators.required])]
        });
        this.tabIndex = 0;
        this.pageSettings = 0;
        this.sumerror = false;
        this.pinerror = false;
        this.occupationP = false;
        this.updateFlag = false;
        this.ageUpdateFlag = false;
        this.nonEditable = false;
        this.setArray = [];
        this.memberLength = [];
        this.finalData = [];
        this.indexList = [];
        this.sumInsuredAmountLists = 0;
        this.compareArray = [];
        this.annualerror = false;
        this.paProceed = true;

    }

    ngOnInit() {
        this.checkAllStatus = true;
        this.clearSession.clearSessionPaData();
        this.show = this.config.getpaAccident();
        this.firstPage = true;
        this.secondPage = false;
        this.professionalList();
        this.annualIncomeList();
        this.setOccupationListCode();
        this.companyList();
        this.sessionData();
        if (this.pageSettings == 2) {
            this.firstPage = false;
            this.secondPage = true;
        } else {
            sessionStorage.enquiryDetailsPa = '';
            sessionStorage.setAllProductLists = '';
            sessionStorage.filterCompany = '';
            sessionStorage.allProductLists = '';
        }
        //fire
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
            'component_name': 'Personal Accident'
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
        this.metaPa = successData.ResponseObject[0];
        this.metaTitle = this.metaPa.title;
        this.metaKeyword = this.metaPa.keyword;
        this.metaDescription = this.metaPa.descrition;
        this.metaTag.addTags([
            {name: 'keywords', content: this.metaKeyword},
            {name: 'description', content: this.metaDescription},
        ]);
        this.setTitle();
    }
    public metaDetailFailure(error) {
        console.log(error);
    }
    public setTitle() {
        this.titleService.setTitle( this.metaTitle );
    }

    reset() {
        this.selectedAmountP = '';
        this.pincoceP = '';
        this.occupationP = '';
        this.Age = '';
        this.AnnualIncomeP = '';
    }

    public annualIncome() {
        if (this.AnnualIncomeP == '0') {
            this.annualErrorMessage = true;
        } else {
            this.annualErrorMessage = false;
            this.annualerror = false;
        }
    }

    public keyPress(event: any) {
        sessionStorage.pincoceP = this.pincoceP;
        sessionStorage.occupationP = this.occupationP;
        sessionStorage.AnnualIncomeP = this.AnnualIncomeP;
        sessionStorage.setAgeP = this.Age;
        sessionStorage.selectedProfession = this.selectedProfession;
        if (event.charCode !== 0) {
            const pattern = /[0-9\\ ]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }

    painsurance() {
        this.firstPage = true;
        this.secondPage = false;
        this.paProceed = true;
    }

// this function will get the session data
    sessionData() {
        if (sessionStorage.selectedAmountP != undefined && sessionStorage.selectedAmountP != '') {
            this.selectedAmountP = sessionStorage.selectedAmountP;
        }
        if (sessionStorage.pincoceP != undefined && sessionStorage.pincoceP != '') {
            this.pincoceP = sessionStorage.pincoceP;
        }
        if (sessionStorage.setAgeP != undefined && sessionStorage.setAgeP) {
            this.Age = sessionStorage.setAgeP;
        }
        if (sessionStorage.AnnualIncomeP != undefined && sessionStorage.AnnualIncomeP) {
            this.AnnualIncomeP = sessionStorage.AnnualIncomeP;
        }
        if (sessionStorage.occupationP != undefined && sessionStorage.occupationP) {
            this.occupationP = sessionStorage.occupationP;
        }
        if (sessionStorage.selectedProfession != undefined && sessionStorage.selectedProfession) {
            this.selectedProfession = sessionStorage.selectedProfession;
        }
        if (sessionStorage.setPageP != undefined && sessionStorage.setPageP != '') {
            this.pageSettings = sessionStorage.setPageP;
            if (sessionStorage.sideMenuP) {
                this.settings.HomeSidenavUserBlock = false;
                this.settings.sidenavIsOpened = false;
                this.settings.sidenavIsPinned = false;
            }
        }
        if (sessionStorage.enquiryDetailsPa != undefined && sessionStorage.enquiryDetailsPa != '') {
            this.enquiryDetails = JSON.parse(sessionStorage.enquiryDetailsPa);
        }
        if (sessionStorage.setAllProductLists != undefined && sessionStorage.setAllProductLists != '') {
            this.setAllProductLists = JSON.parse(sessionStorage.setAllProductLists);
        }
        if (sessionStorage.filterCompany != undefined && sessionStorage.filterCompany != '') {
            this.filterCompany = JSON.parse(sessionStorage.filterCompany);
            if (this.filterCompany.includes('All')) {
                this.checkAllStatus = true;
            } else {
                this.checkAllStatus = false;
            }
        }
        if (sessionStorage.allProductLists != undefined && sessionStorage.allProductLists != '') {
            this.allProductLists = JSON.parse(sessionStorage.allProductLists);
            console.log(this.allProductLists, 'sessionn');
        }
        if (sessionStorage.sumInsuredAmountLists != undefined && sessionStorage.sumInsuredAmountLists != '') {
            this.sumInsuredAmountLists = JSON.parse(sessionStorage.sumInsuredAmountLists);
        }


    }

    // get annual income list
    public annualIncomeList(): void {
        const data = {
            'platform': 'web',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0
        };
        this.personalService.getAnnualIncomeList(data).subscribe(
            (successData) => {
                this.getAnnualIncomeListSuccess(successData);
            },
            (error) => {
                this.getAnnualIncomeListFailure(error);
            }
        );
    }

    public getAnnualIncomeListSuccess(successData) {
        if (successData.IsSuccess) {
            this.annualIncomeLists = successData.ResponseObject;
        }
    }

    public getAnnualIncomeListFailure(error) {
    }

    // get annual professional list
    public professionalList(): void {
        const data = {
            'platform': 'web',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0
        };
        this.personalService.getProfessionLists(data).subscribe(
            (successData) => {
                this.getProfessionalSuccess(successData);
            },
            (error) => {
                this.getProfessionalFailure(error);
            }
        );
    }

    public getProfessionalSuccess(successData) {
        if (successData.IsSuccess) {
            this.professions = successData.ResponseObject;
        }
    }

    public getProfessionalFailure(error) {
    }

    // get company list
    public companyList(): void {
        const data = {
            'platform': 'web',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0
        };
        this.personalService.getCompanyList(data).subscribe(
            (successData) => {
                this.getCompanySuccess(successData);
            },
            (error) => {
                this.getCompanyFailure(error);
            }
        );
    }

    public getCompanySuccess(successData) {
        if (successData.IsSuccess) {
            this.allCompanyList = successData.ResponseObject;
            let all = ['All'];
            for (let i = 0; i < this.allCompanyList.length; i++) {
                all.push(this.allCompanyList[i].company_name);
            }
            this.filterCompany = all;
        }
    }

    public getCompanyFailure(error) {
    }


    // this function will get the occupation list
    setOccupationListCode() {
        const data = {
            'platform': 'web',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0
        };
        this.personalService.getOccupationCodeList(data).subscribe(
            (successData) => {
                this.occupationCodeSuccess(successData);
            },
            (error) => {
                this.occupationCodeFailure(error);
            }
        );

    }

    public occupationCodeSuccess(successData) {
        this.occupationCode = successData.ResponseObject;
    }

    public occupationCodeFailure(error) {
    }

    // this function will get the sum insured amounts
    public sumInsuredAmonut(age): void {
        const data = {
            'platform': 'web',
            'age': age,
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0
        };
        this.personalService.getpersonalSumInsuredAmount(data).subscribe(
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
            sessionStorage.sumInsuredAmountLists = JSON.stringify(this.sumInsuredAmountLists);
        }
    }

    public getSumInsuredAmountFailure(error) {
    }

    checkNetwork() {
        if (this.sumInsuredAmountLists == 0) {
            this.toast.error('Unable to connect to the network');
        }
    }

    // create enguiry
    createEnquiryDetails() {
        // this.paProceed = false;
        if (this.Age < 18) {
            this.toast.error('Personal age should be 18 or above');
            return false;
        }

        if (this.pincoceP == '' || this.pincoceP == undefined || this.pincoceP.length < 6) {
            this.pinerror = true;
        } else {
            this.pinerror = false;
        }
        if (this.selectedProfession == '' || this.selectedProfession == undefined) {
            this.professionerr = true;
        } else {
            this.professionerr = false;
        }
        if (this.occupationP == '' || this.occupationP == undefined) {
            this.occerror = true;
        } else {
            this.occerror = false;
        }
        if (this.AnnualIncomeP == '' || this.AnnualIncomeP == undefined || this.AnnualIncomeP == '0') {
            this.annualerror = true;
        } else {
            this.annualerror = false;
        }
        if (this.Age == '' || this.Age == undefined) {
            this.ageerror = true;
        } else {
            this.ageerror = false;
        }
        console.log(this.pinerror);
        console.log(this.professionerr);
        console.log(this.occerror);
        console.log(this.annualerror);
        console.log(this.ageerror);
        if (!this.pinerror && !this.professionerr && !this.occerror && !this.annualerror && !this.ageerror) {
            const data = {
                "platform": "web",
                "insurance_type": "2",
                "annual_salary": this.AnnualIncomeP,
                "occupation_code": this.occupationP,
                "profissional": this.selectedProfession,
                "postalcode": this.pincoceP ? this.pincoceP : '',
                "sum_insured": '',
                "created_by": "0",
                'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
                'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
                'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
                "family_details": [{
                    "type": "Self",
                    "age": this.Age
                }]
            };
            this.settings.loadingSpinner = true;
            this.personalService.createEnquiry(data).subscribe(
                (successData) => {
                    this.createEnquirySuccess(successData);
                },
                (error) => {
                    this.createEnquiryFailure(error);
                }
            );
        } else {
            // this.paProceed = true;
        }
    }

    public createEnquirySuccess(successData) {
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {
            this.enquiryDetails = successData.ResponseObject;
            sessionStorage.enquiryDetailsPa = JSON.stringify(this.enquiryDetails);
            this.selectedAmountP = "6";
            this.sumInsuredAmonut(this.enquiryDetails.age);
            this.productListArray = [];
            this.allProductLists = [];
            // this.settings.loadingSpinner = true;
            for (let i = 0; i < this.allCompanyList.length; i++) {
                this.policyLists(this.allCompanyList[i].company_id);
            }

        } else {
            // this.paProceed = true;
        }
    }

    public createEnquiryFailure(err) {
        this.settings.loadingSpinner = false;
    }

    updateSumInsured() {
        this.settings.loadingSpinner = true;
        sessionStorage.selectedAmountP = this.selectedAmountP;
        this.productListArray = [];
        this.allProductLists = [];
        let getCompanyCount = [];
        for (let i = 0; i < this.allCompanyList.length; i++) {
            for (let j = 0; j < this.filterCompany.length; j++) {
                if (this.filterCompany[j] == this.allCompanyList[i].company_name) {
                    getCompanyCount.push(this.allCompanyList[i].company_id);
                }
            }
        }
        for (let i = 0; i < getCompanyCount.length; i++) {
            this.policyLists(getCompanyCount[i]);
        }


    }

    policyLists(company_id) {
        const data = {
            "platform": "web",
            "sum_insured": this.selectedAmountP != undefined ? this.selectedAmountP : '',
            "enquiry_id": this.enquiryDetails.enquiry_id,
            "created_by": "0",
            "company_id": company_id,
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0'
        }
        this.personalService.getPaPolicyLists(data).subscribe(
            (successData) => {
                this.getPolicyListsSuccess(successData);
            },
            (error) => {
                this.getPolicyListsFailure(error);
            }
        );
    }

    public getPolicyListsSuccess(successData) {
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {
            this.firstPage = false;
            this.secondPage = true;
            sessionStorage.setPageP = (this.enquiryDetails.enquiry_id == '') ? 1 : 2;
            if (sessionStorage.setPageP != 1) {
                sessionStorage.sideMenuP = true;
                this.settings.HomeSidenavUserBlock = false;
                this.settings.sidenavIsOpened = false;
                this.settings.sidenavIsPinned = false;
            }
            let policylists = successData.ResponseObject;
            this.productListArray.push(policylists.product_lists);
            this.allProductLists = [].concat.apply([], this.productListArray);
            let premium;
            let premium_format;

            for (let i = 0; i < this.allProductLists.length; i++) {
                this.allProductLists[i].compare = false;
                let premium = this.numberWithCommas(this.allProductLists[i].premium_amount);
                console.log(premium, 'premiumpremium');
                if(premium.length == 7){
                    premium_format = premium.replace(",","");
                } else if(premium.length != 7){
                    premium_format = premium;
                }
                this.allProductLists[i].premium_amount_format = premium_format;
                this.allProductLists[i].suminsured_amount_format = this.numberWithCommas(this.allProductLists[i].suminsured_amount);
            }
            sessionStorage.selectedAmountP = this.selectedAmountP;
            sessionStorage.firstPolicyDetails = JSON.stringify(policylists);
            this.setAllProductLists = this.allProductLists;
            sessionStorage.setAllProductLists = JSON.stringify(this.allProductLists);
            sessionStorage.allProductLists = JSON.stringify(this.allProductLists);

            console.log(this.allProductLists, 'this.allProductLists');
        } else {
            this.toast.error(successData.ErrorObject);
        }
    }

    public getPolicyListsFailure(error) {
    }

    public numberWithCommas(x) {
        return x.toString().substring(0,x.toString().split('.')[0].length-3).replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + x.toString().substring(x.toString().split('.')[0].length-3);

    }

    // filter by product
    filterByProducts() {

        if (this.filterCompany.includes('All')) {
            console.log('fi');
            this.checkAllStatus = true;
            this.allProductLists = this.setAllProductLists;
            let all = ['All'];
            for (let i = 0; i < this.allCompanyList.length; i++) {
                all.push(this.allCompanyList[i].company_name);
            }
            this.filterCompany = all;
        } else if (!this.filterCompany.includes('All') && this.filterCompany.length == this.allCompanyList.length) {
            console.log('sec');
            this.checkAllStatus = false;
            this.allProductLists = [];
            this.filterCompany = [];
        } else if (!this.filterCompany.includes('All') && this.filterCompany.length > 0) {
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
        } else if (this.filterCompany.length == 0) {
            console.log('frth');
            this.checkAllStatus = false;
            this.allProductLists = [];
            this.filterCompany = [];
        }

        console.log(this.allProductLists, ' this.allProductLists');
        sessionStorage.filterCompany = JSON.stringify(this.filterCompany);
        sessionStorage.allProductLists = JSON.stringify(this.allProductLists);

    }

    numberValidate(event: any) {
        this.validation.numberValidate(event);
    }

    //// compare Details
    compareDetails(value, index) {
        console.log(value, 'valuevalue1');
        const data = {
            index: index,
            product_id: value.product_id,
            compare_id: value.compare_id,
            product_name: value.product_name,
            premium_id: value.premium_id,
            premium_amount: value.premium_amount,
            scheme: value.scheme,
            suminsured_amount: value.suminsured_amount,
            suminsured_id: value.suminsured_id,
            company_logo: value.company_logo,
            company_name: value.company_name,
            key_features: value.key_features
        };
        this.allProductLists[index].compare = true;
        this.compareArray.push(data);
        if (this.compareArray.length >= 3) {
            for (let i = 0; i < this.allProductLists.length; i++) {
                this.allProductLists[i].compare = true;
            }
        }

    }

    // remove compare
    removeCompare(index, pindex) {
        this.compareArray.splice(index, 1);
        console.log(this.compareArray, 'this.compareArray');
        let getCount;
        for (let i = 0; i < this.allProductLists.length; i++) {
            getCount = false;
            for (let j = 0; j < this.compareArray.length; j++) {
                if (this.compareArray[j].compare_id == this.allProductLists[i].compare_id) {
                    getCount = true;
                    this.allProductLists[i].compare = true;
                }
            }
            if (!getCount) {
                this.allProductLists[i].compare = false;
            }
        }

    }

    removeAllCompare() {
        for (let i = 0; i < this.allProductLists.length; i++) {
            this.allProductLists[i].compare = false;
        }
        this.compareArray = [];
    }

    // comparelist
    compareList(value) {
        this.productData = [];
        let scheme = value[0].scheme;
        for (let i = 0; i < value.length; i++) {
            this.productData.push({
                product_id: value[i].product_id,
                premium_amount: value[i].premium_amount,
                suminsured_amount: value[i].suminsured_amount,
                prod_suminsuredid: value[i].suminsured_id
            });
        }
        const data = {
            'platform': 'web',
            'scheme': scheme,
            'group_name': 'GROUP A',
            'enquiry_id': this.enquiryDetails.enquiry_id,
            'product_lists': this.productData,
            'created_by': 0,
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0

        };
        this.settings.loadingSpinner = true;
        this.personalService.addtoCompare(data).subscribe(
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
            let dialogRef = this.dialog.open(ComparelistComponent, {
                width: '1500px', data: {comparedata: successData.ResponseObject, type: 'pa'}
            });
            dialogRef.disableClose = true;

            dialogRef.afterClosed().subscribe(result => {
            });
        }
    }

    public compareFailure(error) {
        this.settings.loadingSpinner = false;
    }


    // fire functions
    addEvent(event) {
        this.selectDate = event.value;
        this.setDate = this.datepipe.transform(this.selectDate, 'y-MM-dd');
    }

    fireKeeper(values) {

        if (this.fireapp.valid) {
            const data = {
                'platform': 'web',
                'product_type': 'offline',
                'appointment_date': this.setDate,
                'appointment_time': this.fireapp.controls['apptime'].value,
                'company_name': this.fireapp.controls['name'].value,
                'customer_mobile': this.fireapp.controls['mobile'].value,
                'customer_email': this.fireapp.controls['email'].value,
                'contact_person': this.fireapp.controls['contactperson'].value,
                'pincode': this.fireapp.controls['pincode'].value,
                'product_name': this.fireapp.controls['insurance'].value,
                'appointment_with': this.fireapp.controls['appointmentwith'].value,

            };

            this.commonservices.setFixAppointment(data).subscribe(
                (successData) => {
                    this.fixAppointmentSuccess(successData);
                },
                (error) => {
                    this.fixAppointmentFailure(error);
                }
            );
        }
    }

    fixAppointmentSuccess(successData) {
    }

    fixAppointmentFailure(error) {
    }

    getPincodeDetails(pin, title) {
        this.pin = pin;
        this.title = title;
        const data = {
            'platform': 'web',
            'postalcode': this.pin
        };
        if (this.pin.length == 6) {
            this.commonservices.getPincodeDetails(data).subscribe(
                (successData) => {
                    this.getPincodeDetailsSuccess(successData);
                },
                (error) => {
                    this.getPincodeDetailsFailure(error);
                }
            );
        }
    }

    public getPincodeDetailsSuccess(successData) {
        if (successData.ErrorObject) {
            this.toastr.error(successData.ErrorObject);
            this.pincodeErrors = false;
        } else {
            this.pincodeErrors = true;
        }
    }

    public getPincodeDetailsFailure(error) {
    }

    public data(event: any) {
        if (event.charCode !== 0) {
            const pattern = /[a-zA-Z\\ ]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }


    // buy details
    buyProduct(value) {
        sessionStorage.buyProductsPa = JSON.stringify(value);
        if (value.product_id == 14 || value.product_id == 15) {
            this.router.navigate(['/appollopa' + '/' + false]);
        } else if (value.product_id == 3) {
            this.router.navigate(['/personal-accident-religare' + '/' + false]);
        } else if (value.product_id == 88 || value.product_id == 89) {
            this.router.navigate(['/reliance-pa' + '/' + false]);
        } else if (value.product_id == 23) {
            this.router.navigate(['/hdfc-personalAccident' + '/' + false]);
        }
    }

    // view key features details
    viewKeyList(value) {
        let dialogRef = this.dialog.open(ViewProductDetailsComponent, {
            width: '1500px', data: {productId : value.product_id, productName: value.product_name}
        });
        dialogRef.disableClose = true;

        dialogRef.afterClosed().subscribe(result => {
        });

    }
    personalInsurer() {
        const dialogRef = this.dialog.open(PersonalInsurer, {
            autoFocus: false,
            maxHeight: '90vh'
        });
        dialogRef.disableClose = true;
    }
}







@Component({
    selector: 'personalinsurer',
    template: `        
        <div  class="container-fluid">
        <div  class="row text-justify">
            <div class="container">
            <div class="col-sm-12 col-md-12  text-right">
                <mat-icon (click)="onNoClick()" style="cursor: pointer">close</mat-icon>
            </div>
            <div class="col-sm-8 col-md-8">
                <h3 class="text-center" style="color: #D92D32"><img src="assets/img/personal-accident.png" class="logo-size"> About Personal Accident</h3>
            </div>
            <div id="personal-details">
                <ol class="ml-4">
                    <li>The benefit under the Personal Accidental Death section is payable when an Injury results in the loss of life of the Insured solely due to accidental injury.</li>
                    <li>Accidental Injury means bodily injury caused solely and directly by violent, accidental, external and visible means and should necessarily occur during the Insured Period of 12 months from the date of inception of the policy.</li>
                    <li>The definition of Injury does not extend to other non physical consequences such as mental, nervous or emotional disorders, depression or anxiety of any Accident and these are specifically  excluded in the Personal Accident  Policy</li>
                    <li>The definition of Accident means a sudden, unforeseen and unexpected physical event caused by external, violent and visible means.</li>
                    <li>The policy on opting the widest cover provides for weekly compensation benefit to the extent of 1 % of sum insured every week for approximately 100 weeks ( The percentage and number of weeks varies from insurer to insurer) till such time that the insured is able to resume his /  her normal activities.</li>
                    <li>The Personal Accident policy has a coverage / compensation for Temporary Total Disablement and Temporary Partial Disablements on a fixed percentage basis if the insured opts with the TTD and TPD benefits apart from the death benefit.</li>
                </ol>
            </div>
         </div>
        </div>
        </div>`,
})
export class PersonalInsurer {

    constructor(
        public dialogRef: MatDialogRef<PersonalInsurer>,
        @Inject(MAT_DIALOG_DATA) public data: any) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

}


/// old
// update
// updatePersonalAccident() {
//
//     const data = {
//         'platform': 'web',
//         'postalcode': this.pincoceP,
//         'sum_insured': this.selectedAmountP,
//         'occupation_code': this.occupationP,
//         'family_details': [{
//             "type": "self",
//             "age": this.Age
//         }],
//         'family_group_name': 'Group A',
//         'enquiry_id': this.personalPremiumLists.enquiry_id,
//         'created_by': '0',
//         'insurance_type': '1',
//         'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
//         'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0
//
//     }
//     this.personalService.updatePersonalAccident(data).subscribe(
//         (successData) => {
//             //this.settings.loadingSpinner = true;
//             this.updateSuccess(successData, 0);
//         },
//         (error) => {
//             this.updateFailure(error);
//         }
//     );
//
// }
//
// public updateSuccess(successData, index) {
//     this.personalPremiumLists = successData.ResponseObject;
//     sessionStorage.personalPremiumLists = JSON.stringify(successData.ResponseObject);
// }
//
//
// public updateFailure(error) {
// }
