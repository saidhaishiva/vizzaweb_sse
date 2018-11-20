import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {CommonService} from '../../shared/services/common.service';
import {ToastrService} from 'ngx-toastr';
import {ProposalService} from '../../shared/services/proposal.service';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';
import {GrouppopupComponent} from '../health-insurance/grouppopup/grouppopup.component';
import {CompareDetailsComponent} from './compare-details/compare-details.component';
import {ComparelistComponent} from '../health-insurance/comparelist/comparelist.component';

@Component({
  selector: 'app-personalaccident',
  templateUrl: './personalaccident.component.html',
  styleUrls: ['./personalaccident.component.scss']
})
export class PersonalaccidentComponent implements OnInit {

    public personalaccidents: FormGroup;
    public settings: Settings;
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
    selectedAmount: any;
    pincoce: any;
    Occupation: any;
    Age: any;
    AnnualIncome: any;
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
    enquiryId: any;
    changeSuninsuredAmount: any;
    personalPremiumLists: any;
    updateFlag: boolean;
    ageUpdateFlag: boolean;
    nonEditable: boolean;
    updateData: any;
    equiryId: any;
    goupName: any;

    constructor(public appSettings: AppSettings, public router: Router, public config: ConfigurationService, public fb: FormBuilder, public dialog: MatDialog, public common: CommonService, public toast: ToastrService, public auth: AuthService, public proposalservice: ProposalService) {

        this.settings = this.appSettings.settings;
        this.webhost = this.config.getimgUrl();
        // sessionStorage.sideMenu = false;
        // this.settings.loadingSpinner = true
        if (!sessionStorage.sideMenu) {
            this.settings.HomeSidenavUserBlock = true;
            this.settings.sidenavIsOpened = true;
            this.settings.sidenavIsPinned = true;
        }
        this.tabIndex = 0;
        this.pageSettings = 0;
        this.sumerror = false;
        this.pinerror = false;
        this.Occupation = false;
        this.updateFlag = false;
        this.ageUpdateFlag = false;
        this.nonEditable = false;
        this.setArray = [];
        this.memberLength = [];
        this.finalData = [];
        this.indexList = [];
        this.sumInsuredAmountLists = 0;
        this.compareArray = [];
    }

    ngOnInit() {
        this.firstPage = true;
        this.secondPage = false;
        // this.closeIcon = true;
        this.sumInsuredAmonut();
        this.setOccupationListCode();
        this.sessionData();
        if (this.pageSettings == 2) {
            this.firstPage = false;
            this.secondPage = true;
        }
    console.log(this.compareArray,'compareArraycompareArray');
    }

    public keyPress(event: any) {
        if (event.charCode !== 0) {
            const pattern = /[0-9\\ ]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }

// this function will get the session data
    sessionData() {
        if (sessionStorage.setInsuredAmount != undefined && sessionStorage.setInsuredAmount != '') {
            this.selectedAmount = sessionStorage.setInsuredAmount;
        }
        if (sessionStorage.setPincode != undefined && sessionStorage.setPincode != '') {
            this.pincoce = sessionStorage.setPincode;
        }
        if (sessionStorage.setAge != undefined && sessionStorage.setAge) {
            this.Age = sessionStorage.setAge;
        }
        if (sessionStorage.setAnnualIncome != undefined && sessionStorage.setAnnualIncome) {
            this.AnnualIncome = sessionStorage.setAnnualIncome;
        }
        if (sessionStorage.setOccupation != undefined && sessionStorage.setOccupation) {
            this.Occupation = sessionStorage.setOccupation;
        }
        if (sessionStorage.setPage != undefined && sessionStorage.setPage != '') {
            this.pageSettings = sessionStorage.setPage;
            if (sessionStorage.sideMenu) {
                this.settings.HomeSidenavUserBlock = false;
                this.settings.sidenavIsOpened = false;
                this.settings.sidenavIsPinned = false;
            }
        }

        if (sessionStorage.enquiryId != undefined && sessionStorage.enquiryId != '') {
            this.enquiryId = sessionStorage.enquiryId;
        }
        if (sessionStorage.policyLists != undefined && sessionStorage.policyLists != '') {
            this.personalPremiumLists = JSON.parse(sessionStorage.policyLists).value;

        }

        if (sessionStorage.changeSuninsuredAmount != undefined && sessionStorage.changeSuninsuredAmount != '') {
            this.changeSuninsuredAmount = sessionStorage.changeSuninsuredAmount;
        }


    }

    // this function will get the sum insured amounts
    public sumInsuredAmonut(): void {
        const data = {
            'platform': 'web',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0
        };
        this.common.getpersonalSumInsuredAmount(data).subscribe(
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
            console.log(this.sumInsuredAmountLists, 'this.sumInsuredAmountLists');
        }
    }

    public getSumInsuredAmountFailure(error) {
        console.log(error, 'error');
    }

    checkNetwork() {
        if (this.sumInsuredAmountLists == 0) {
            this.toast.error("Unable to connect to the network");

        }
    }

    changeSuminsured(event) {
        if (event.source.selected) {
            this.updateFlag = true;
        } else {
            this.ageUpdateFlag = true;
            this.updateFlag = false;
        }
        sessionStorage.changeSuninsuredAmount = this.changeSuninsuredAmount;

    }

    setOccupationListCode() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.proposalservice.getOccupationCode(data).subscribe(
            (successData) => {
                this.occupationCodeSuccess(successData);
            },
            (error) => {
                this.occupationCodeFailure(error);
            }
        );

    }


    public occupationCodeSuccess(successData) {
        console.log(successData.ResponseObject);
        this.occupationCode = successData.ResponseObject;

    }

    public occupationCodeFailure(error) {
        console.log(error);
    }

    changeAmount() {
        sessionStorage.setInsuredAmount = this.selectedAmount;
    }

    pincode() {
        sessionStorage.setPincode = this.pincoce;
    }

    occupationList() {
        sessionStorage.setOccupation = this.Occupation;
    }

    annualincome() {
        sessionStorage.setAnnualIncome = this.AnnualIncome;

    }

    ageChange() {

        sessionStorage.setAge = this.Age;
    }

    getPersonalAccident() {

        if (this.Age <= 18) {
            this.toast.error('Personal age should be 18 or above');
            return false;
        }

        if (this.selectedAmount == '' || this.selectedAmount == undefined) {
            this.sumerror = true;
        } else {
            this.sumerror = false;
        }
        if (this.pincoce == '' || this.pincoce == undefined || this.pincoce.length < 6) {
            this.pinerror = true;
        } else {
            this.pinerror = false;
        }
        if (this.Occupation == '' || this.Occupation == undefined) {
            this.occerror = true;
        } else {
            this.occerror = false;
        }
        if (this.selectedAmount != '' && this.selectedAmount != undefined && this.pincoce != '' && this.pincoce != undefined) {

            const data = {
                "platform": "web",
                "insurance_type": "2",
                "annual_salary": this.AnnualIncome,
                "occupation_code": this.Occupation,
                "postalcode": this.pincoce ? this.pincoce : '',
                "sum_insured": this.selectedAmount,
                "created_by": "0",
                "pos_status": "0",
                'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
                "family_details": [{
                    "type": "self",
                    "age": this.Age
                }]
            }
            this.proposalservice.personalAccident(data).subscribe(
                (successData) => {
                    //this.settings.loadingSpinner = true;
                    this.personalAccidentSuccess(successData, 0);
                },
                (error) => {
                    this.personalAccidentFailure(error);
                }
            );

        }
    }


    public personalAccidentSuccess(successData, index) {
        console.log(successData.ResponseObject);
        this.personalPremiumLists = successData.ResponseObject;
        console.log(this.personalPremiumLists, 'jhghfhjfhgfhgfjhyf');
        this.firstPage = false;
        this.secondPage = true;
        sessionStorage.setPage = (this.personalPremiumLists.enquiry_id == '') ? 1 : 2;
        if (sessionStorage.setPage != 1) {
            sessionStorage.sideMenu = true;
            this.settings.HomeSidenavUserBlock = false;
            this.settings.sidenavIsOpened = false;
            this.settings.sidenavIsPinned = false;

        }


    }

    public personalAccidentFailure(error) {
        console.log(error);
    }

// update
    updatePersonalAccident() {

        const data = {
            'platform': 'web',
            'postalcode': this.pincoce,
            'sum_insured': this.selectedAmount,
            'family_details': [{
                "type": "self",
                "age": this.Age
            }],
            'family_group_name': 'Group A',
            'enquiry_id': this.personalPremiumLists.enquiry_id,
            'created_by': '0',
            'insurance_type': '1',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0

        }
        this.proposalservice.updatePersonalAccident(data).subscribe(
            (successData) => {
                //this.settings.loadingSpinner = true;
                this.updateSuccess(successData, 0);
            },
            (error) => {
                this.updateFailure(error);
            }
        );

    }

    public updateSuccess(successData, index) {
        this.personalPremiumLists = successData.ResponseObject;
        console.log(this.personalPremiumLists, '  this.personalPremiumLists');
        sessionStorage.setItem('updateList', this.personalPremiumLists);
    }


    public updateFailure(error) {
        console.log(error);
    }

    //// compare Details
    compareDetails(value, index, equiryId, name) {
       console.log(value, 'valuevalue');
        const data = {
            index: index,
            product_id: value.product_id,
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
        this.equiryId = equiryId;
        this.personalPremiumLists.product_lists[index].compare = true;
        this.compareArray.push(data);
        if (this.compareArray.length >= 3) {
            for (let i = 0; i < this.personalPremiumLists.product_lists.length; i++) {
                this.personalPremiumLists.product_lists[i].compare = true;
            }
        }

    }
    // remove compare
    removeCompare(index , pindex) {
        this.compareArray.splice(index, 1);
        let getCount;
        for (let i = 0; i < this.personalPremiumLists.product_lists.length; i++) {
            getCount = false;
            for (let j = 0; j < this.compareArray.length; j++) {
                if (this.compareArray[j].premium_id == this.personalPremiumLists.product_lists[i].premium_id) {
                    getCount = true;
                    this.personalPremiumLists.product_lists[i].compare = true;
                }
            }
            if (!getCount) {
                this.personalPremiumLists.product_lists[i].compare = false;
            }
        }

    }
    removeAllCompare(index) {
        for (let i = 0; i < this.personalPremiumLists.product_lists.length; i++) {
            this.personalPremiumLists.product_lists[i].compare = false;
        }
        this.compareArray = [];
    }

    // comparelist
    compareList(value) {
        //     this.productLists = [];
        //     let scheme = value[0].scheme;
        //     for (let i = 0; i < value.length; i++) {
        //         this.productLists.push({product_id: value[i].product_id, premium_amount: value[i].premium_amount, suminsured_amount: value[i].suminsured_amount, prod_suminsuredid: value[i].suminsured_id});
        //     }
        //     const data = {
        //         'platform': 'web',
        //         'scheme': scheme,
        //         'group_name': this.goupName,
        //         'enquiry_id': this.equiryId,
        //         'product_lists': this.productLists,
        //         'created_by': 0,
        //         'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
        //         'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0
        //
        //     };
        //     this.settings.loadingSpinner = true;
        //     this.common.addtoCompare(data).subscribe(
        //         (successData) => {
        //             this.compareSuccess(successData);
        //         },
        //         (error) => {
        //             this.compareFailure(error);
        //         }
        //     );
        // }
        // public compareSuccess(successData) {
        //     this.settings.loadingSpinner = false;
        //     if (successData.IsSuccess) {
        //         let dialogRef = this.dialog.open(ComparelistComponent, {
        //             width: '1500px', data: {comparedata: successData.ResponseObject}});
        //         dialogRef.disableClose = true;
        //
        //         dialogRef.afterClosed().subscribe(result => {
        //         });
        //     }
        // }
        // public compareFailure(error) {
        //     this.settings.loadingSpinner = false;
        // }


    }
}


