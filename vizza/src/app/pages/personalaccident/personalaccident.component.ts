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
import {PersonalAccidentService} from '../../shared/services/personal-accident.service';

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
    constructor(public appSettings: AppSettings,public personalService: PersonalAccidentService, public router: Router, public config: ConfigurationService, public fb: FormBuilder, public dialog: MatDialog, public toast: ToastrService, public auth: AuthService) {

        this.settings = this.appSettings.settings;
        this.webhost = this.config.getimgUrl();
        // sessionStorage.sideMenu = false;
        // this.settings.loadingSpinner = true
        if (!sessionStorage.sideMenuP) {
            this.settings.HomeSidenavUserBlock = true;
            this.settings.sidenavIsOpened = true;
            this.settings.sidenavIsPinned = true;
        }
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
        sessionStorage.pincoceP = this.pincoceP;
        sessionStorage.occupationP = this.occupationP;
        sessionStorage.AnnualIncomeP = this.AnnualIncomeP;
        sessionStorage.setAge = this.Age;

        if (event.charCode !== 0) {
            const pattern = /[0-9\\ ]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }
    painsurance(){
        this.firstPage = true;
        this.secondPage = false;
    }
// this function will get the session data
    sessionData() {
        if (sessionStorage.selectedAmountP != undefined && sessionStorage.selectedAmountP != '') {
            this.selectedAmountP = sessionStorage.selectedAmountP;
        }
        if (sessionStorage.pincoceP != undefined && sessionStorage.pincoceP != '') {
            this.pincoceP = sessionStorage.pincoceP;
        }
        if (sessionStorage.setAge != undefined && sessionStorage.setAge) {
            this.Age = sessionStorage.setAge;
        }
        if (sessionStorage.AnnualIncomeP != undefined && sessionStorage.AnnualIncomeP) {
            this.AnnualIncomeP = sessionStorage.AnnualIncomeP;
        }
        if (sessionStorage.occupationP != undefined && sessionStorage.occupationP) {
            this.occupationP = sessionStorage.occupationP;
        }
        if (sessionStorage.setPageP != undefined && sessionStorage.setPageP != '') {
            this.pageSettings = sessionStorage.setPageP;
            if (sessionStorage.sideMenuP) {
                this.settings.HomeSidenavUserBlock = false;
                this.settings.sidenavIsOpened = false;
                this.settings.sidenavIsPinned = false;
            }
        }

        if (sessionStorage.enquiryIdP != undefined && sessionStorage.enquiryIdP != '') {
            this.enquiryIdP = sessionStorage.enquiryIdP;
        }
        if (sessionStorage.personalPremiumLists != undefined && sessionStorage.personalPremiumLists != '') {
            this.personalPremiumLists = JSON.parse(sessionStorage.personalPremiumLists);

        }


    }

    // this function will get the sum insured amounts
    public sumInsuredAmonut(): void {
        const data = {
            'platform': 'web',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
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

    setOccupationListCode() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.personalService.getOccupationCode(data).subscribe(
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
        sessionStorage.selectedAmountP = this.selectedAmountP;
    }

    getPersonalAccident() {

        if (this.Age <= 18) {
            this.toast.error('Personal age should be 18 or above');
            return false;
        }

        if (this.selectedAmountP == '' || this.selectedAmountP == undefined) {
            this.sumerror = true;
        } else {
            this.sumerror = false;
        }
        if (this.pincoceP == '' || this.pincoceP == undefined || this.pincoceP.length < 6) {
            this.pinerror = true;
        } else {
            this.pinerror = false;
        }
        if (this.occupationP == '' || this.occupationP == undefined) {
            this.occerror = true;
        } else {
            this.occerror = false;
        }
        if (this.occupationP == '' || this.occupationP == undefined) {
            this.occerror = true;
        } else {
            this.occerror = false;
        }
        if (this.AnnualIncomeP == '' || this.AnnualIncomeP == undefined) {
            this.annualerror = true;
        } else {
            this.annualerror = false;
        }
        if (this.Age == '' || this.Age == undefined) {
            this.ageerror = true;
        } else {
            this.ageerror = false;
        }
        if (this.selectedAmountP != '' && this.selectedAmountP != undefined && this.pincoceP != '' && this.pincoceP != undefined) {

            const data = {
                "platform": "web",
                "insurance_type": "2",
                "annual_salary": this.AnnualIncomeP,
                "occupation_code": this.occupationP,
                "postalcode": this.pincoceP ? this.pincoceP : '',
                "sum_insured": this.selectedAmountP,
                "created_by": "0",
                "pos_status": "0",
                'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
                "family_details": [{
                    "type": "self",
                    "age": this.Age
                }]
            }
            this.personalService.personalAccident(data).subscribe(
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
        if (successData.IsSuccess) {
            this.personalPremiumLists = successData.ResponseObject;
            sessionStorage.personalPremiumLists = JSON.stringify(successData.ResponseObject);
            console.log(this.personalPremiumLists, 'jhghfhjfhgfhgfjhyf');
            this.firstPage = false;
            this.secondPage = true;
            this.AnnualIncomeP = this.personalPremiumLists.annual_salary;
            this.enquiryIdP = this.personalPremiumLists.enquiry_id;
            this.occupationP = this.personalPremiumLists.occupation_code;
            this.selectedAmountP = this.personalPremiumLists.group_suminsured_id;

            sessionStorage.setPageP = (this.personalPremiumLists.enquiry_id == '') ? 1 : 2;
            if (sessionStorage.setPageP != 1) {
                sessionStorage.sideMenuP = true;
                this.settings.HomeSidenavUserBlock = false;
                this.settings.sidenavIsOpened = false;
                this.settings.sidenavIsPinned = false;

            }
        } else {
            this.toast.error(successData.ErrorObject);
        }


    }

    public personalAccidentFailure(error) {
        console.log(error);
    }

// update
    updatePersonalAccident() {

        const data = {
            'platform': 'web',
            'postalcode': this.pincoceP,
            'sum_insured': this.selectedAmountP,
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
        this.personalService.updatePersonalAccident(data).subscribe(
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
        sessionStorage.personalPremiumLists = JSON.stringify(successData.ResponseObject);
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
        this.enquiryIdP = equiryId;
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
    removeAllCompare() {
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
    // buy details
    buyDetails(value){
        console.log(value);
        sessionStorage.pAccidentProposalList =  JSON.stringify(value);
        this.router.navigate(['/personalaccidentform']);

    }
}


