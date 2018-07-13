import {Component, OnInit, ViewChild} from '@angular/core';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {AddfamilymembersComponent} from './addfamilymembers/addfamilymembers.component';
import {CommonService} from '../../shared/services/common.service';
import {ToastrService} from 'ngx-toastr';
import {ComparelistComponent} from './comparelist/comparelist.component';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {GrouppopupComponent} from './grouppopup/grouppopup.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    public form: FormGroup;
    public settings: Settings;
    setArray: any;
    setArray1: any;
    getArray: any;
    fatherBTn: boolean;
    motherBtn: boolean;
    fatherInLawBTn: boolean;
    motherInLawBtn: boolean;
    closeIcon: boolean;

    index: any;
    memberLength: any;
    auto: boolean;
    finalData: any;
    sumerror: boolean;
    pinerror: boolean;
    selectedAmount: any;
    pincoce: any;
    sonStatus: any;
    daugtherStatus: any;
    sumInsuredAmountLists: any;
    insuranceLists: any;
    pageSettings: any;
    firstPage: any;
    secondPage: any;
    compareArray: any;
    scount: any;
    productLists: any;
    goupName: any;
    equiryId: any;
    webhost: any;
    tabIndex: number;

    addSonItems: any;
    count: any;
    sonBTn: any;
    daughterBTn: any;
    changedTabDetails: any;
    changedTabIndex: any;
    currentGroupName: any;
    firstSelectedAmount: any;
    changeSuninsuredAmount: any;
    shortlistArray: any;
    updateFlag: boolean;
    ageUpdateFlag: boolean;


    constructor(public appSettings: AppSettings, public config: ConfigurationService, public fb: FormBuilder, public dialog: MatDialog, public common: CommonService, public toast: ToastrService) {
        this.settings = this.appSettings.settings;
        this.webhost = this.config.getimgUrl();
       // sessionStorage.sideMenu = false;
        // this.settings.loadingSpinner = true
        if(!sessionStorage.sideMenu) {
            this.settings.HomeSidenavUserBlock = true;
            this.settings.sidenavIsOpened = true;
            this.settings.sidenavIsPinned = true;
        }
        console.log(this.settings);
        this.tabIndex = 0;
        this.pageSettings = 0;
        this.sumerror = false;
        this.pinerror = false;
        this.updateFlag = false;
        this.ageUpdateFlag = false;
        this.setArray = [];
        this.memberLength = [];
        this.finalData = [];
        this.shortlistArray = [];
        this.setArray = [
            {name: 'Self', age: '', disabled: false, checked: false, auto: false, error: ''},
            {name: 'Spouse', age: '', disabled: false, checked: false, auto: false, error: ''},
            {name: 'Son', age: '', disabled: false, checked: false, auto: false, error: ''},
            {name: 'Daughter', age: '', disabled: false, checked: false, auto: false, error: ''}
        ];
        this.compareArray = [];
    }
    ngOnInit() {
        this.firstPage = true;
        this.secondPage = false;
        this.sonBTn = false;
        this.daughterBTn = false;
        this.fatherBTn = false;
        this.motherBtn = false;
        this.fatherInLawBTn = false;
        this.motherInLawBtn = false;
        this.closeIcon = true;
        this.sonStatus = 'false';
        this.daugtherStatus = 'false';
        this.sumInsuredAmonut();
        this.sessionData();
        if (this.pageSettings == 2) {
            this.firstPage = false;
            this.secondPage = true;
        }
        this.count = 0;
    }
    numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }
    // this function will get the session data
    sessionData() {
        if (sessionStorage.setFamilyDetails != undefined && sessionStorage.setFamilyDetails != '') {
            console.log(JSON.parse(sessionStorage.setFamilyDetails), 'JSON.pars');
            this.setArray = JSON.parse(sessionStorage.setFamilyDetails);
        }
        if (sessionStorage.setInsuredAmount != undefined && sessionStorage.setInsuredAmount != '') {
            this.selectedAmount = sessionStorage.setInsuredAmount;
        }
        if (sessionStorage.setPincode != undefined && sessionStorage.setPincode != '') {
            this.pincoce = sessionStorage.setPincode;
        }
        if (sessionStorage.setPage != undefined && sessionStorage.setPage != '') {
            this.pageSettings = sessionStorage.setPage;
            if(sessionStorage.sideMenu) {
                this.settings.HomeSidenavUserBlock = false;
                this.settings.sidenavIsOpened = false;
                this.settings.sidenavIsPinned = false;
            }
        }
        if (sessionStorage.sonBTn != '') {
            this.sonBTn = sessionStorage.sonBTn;
        }
        if (sessionStorage.daughterBTn != '') {
            this.daughterBTn = sessionStorage.daughterBTn;
        }
        if (sessionStorage.fatherBTn != '') {
            this.fatherBTn = sessionStorage.fatherBTn;
        }
        if (sessionStorage.motherBtn != '') {
            this.motherBtn = sessionStorage.motherBtn;
        }
        if (sessionStorage.fatherInLawBTn != '' && sessionStorage.fatherInLawBTn != undefined) {
            this.fatherInLawBTn = sessionStorage.fatherInLawBTn;
        }
        if (sessionStorage.motherInLawBtn != '') {
            this.motherInLawBtn = sessionStorage.motherInLawBtn;
        }
        if (sessionStorage.policyLists != undefined && sessionStorage.policyLists != '') {
            console.log(this.setArray, 'session');
            this.insuranceLists = JSON.parse(sessionStorage.policyLists).value;
            console.log(this.insuranceLists, 'set');
            let index = JSON.parse(sessionStorage.policyLists).index;
            for (let i = 0; i < this.setArray.length; i++) {
                this.setArray[i].disabled = false;
            }
            this.getArray = this.insuranceLists[index].family_members;
            for (let i = 0; i < this.setArray.length; i++) {
                for (let j = 0; j < this.getArray.length; j++) {
                    if (this.setArray[i].name == this.getArray[j].type) {
                        this.setArray[i].disabled = true;
                    }
                }
            }
            this.tabIndex = index;
        }
        if (sessionStorage.changedTabDetails != undefined && sessionStorage.changedTabDetails != '') {
            this.changedTabDetails = JSON.parse(sessionStorage.changedTabDetails);
            console.log(JSON.parse(sessionStorage.changedTabDetails), 'sessionStorage.changedTabDetails');
            this.currentGroupName = JSON.parse(sessionStorage.changedTabDetails).name;
        }
        if (sessionStorage.changeSuninsuredAmount != undefined && sessionStorage.changeSuninsuredAmount != '') {
            console.log(sessionStorage.changeSuninsuredAmount, 'this.changeSuninsuredAmount');

            this.changeSuninsuredAmount = sessionStorage.changeSuninsuredAmount;
        }
        if (sessionStorage.changedTabIndex != undefined && sessionStorage.changedTabIndex != '') {
            this.changedTabIndex = sessionStorage.changedTabIndex;
        }

    }
    // this function will get the sum insured amounts
    public sumInsuredAmonut(): void {
         const data = {
            'platform': 'web'
        };
        this.common.getSumInsuredAmount(data).subscribe(
            (successData) => {
                this.getSumInsuredAmountSuccess(successData);
            },
            (error) => {
                this.getSumInsuredAmountFailure(error);
            }
        );
    }
    public getSumInsuredAmountSuccess(successData) {
        console.log(successData.IsSuccess, 'successData');
        if (successData.IsSuccess) {
            this.sumInsuredAmountLists = successData.ResponseObject;
        }
    }
    public getSumInsuredAmountFailure(error) {
        console.log(error, 'error');
    }
    // selected members
    ckeckedUser(value, index, name) {
        if (value) {
            if (name == 'Son' || name == 'Daughter') {
                console.log( 'value');
                this.count++;
            }
            if (this.count >= 2) {
                this.sonBTn = true;
                this.daughterBTn = true;
                sessionStorage.sonBTn = true;
                sessionStorage.daughterBTn = true;
            } else {
                this.sonBTn = false;
                this.daughterBTn = false;
                sessionStorage.sonBTn = false;
                sessionStorage.daughterBTn = false;
            }
        } else {
            if (name == 'Son' || name == 'Daughter') {
                this.count--;
            }
            console.log(this.count, 'this.count');
            if (this.count >= 2) {
                this.sonBTn = true;
                this.daughterBTn = true;
                sessionStorage.sonBTn = true;
                sessionStorage.daughterBTn = true;
            } else {
                this.sonBTn = false;
                this.daughterBTn = false;
                sessionStorage.sonBTn = false;
                sessionStorage.daughterBTn = false;
            }
            if (value == 'Father') {
                sessionStorage.fatherBTn = false;
            }
            if (value == 'Mother') {
                sessionStorage.motherBtn = false;
            }
            if (value == 'Father In Law') {
                sessionStorage.fatherInLawBTn = false;
            }
            if (value == 'Mother In Law') {
                sessionStorage.motherInLawBtn = false;
            }
            if (index > 3 ) {
                this.setArray.splice(index, 1);
            }
        }
        sessionStorage.setFamilyDetails = JSON.stringify(this.setArray);
    }
    changeAmount() {
        sessionStorage.setInsuredAmount = this.selectedAmount;
        // this.firstSelectedAmount = this.selectedAmount;
    }
    selectPincode() {
        sessionStorage.setPincode = this.pincoce;
    }
    // add new user
    addUser(value, index) {
        if (value == 'Son' || value == 'Daughter') {
            this.count++;
            this.addSonItems = this.count;
        }
        if (this.addSonItems <= 2) {
            if (this.setArray[index].checked) {
                // this.setArray.splice(2, 0, {name: value, age: '', disabled: false, checked: true, auto: true, error: ''});
                this.setArray.push({name: value, age: '', disabled: false, checked: true, auto: false, error: ''});
            } else {
                this.setArray[index].checked = true;
            }
        }
        if (this.count >= 2) {
            this.sonBTn = true;
            this.daughterBTn = true;
            sessionStorage.sonBTn = true;
            sessionStorage.daughterBTn = true;
        } else {
            this.sonBTn = false;
            this.daughterBTn = false;
            sessionStorage.sonBTn = false;
            sessionStorage.daughterBTn = false;
        }
        sessionStorage.setFamilyDetails = JSON.stringify(this.setArray);
    }
    typeAge() {
        sessionStorage.setFamilyDetails = JSON.stringify(this.setArray);
    }
    addOthers(value) {
        this.setArray.push({name: value, age: '', disabled: false, checked: true, auto: false, error: ''});
        if (value == 'Father') {
            this.fatherBTn = true;
            sessionStorage.fatherBTn = this.fatherBTn;
        } else if (value == 'Mother') {
            this.motherBtn = true;
            sessionStorage.motherBtn = this.motherBtn;
        } else if (value == 'Father In Law') {
            this.fatherInLawBTn = true;
            sessionStorage.fatherInLawBTn = this.fatherInLawBTn;
        } else if (value == 'Mother In Law') {
            this.motherInLawBtn = true;
            sessionStorage.motherInLawBtn = this.motherInLawBtn;
        }
        sessionStorage.setFamilyDetails = JSON.stringify(this.setArray);
    }
    // this function will get the policy quotation lists
    getPolicyQuotationList() {
        this.settings.loadingSpinner = true;

        if (this.selectedAmount == '' || this.selectedAmount == undefined) {
            this.sumerror = true;
        } else {
            this.sumerror = false;
        }
        if (this.pincoce == '' || this.pincoce == undefined) {
            this.pinerror = true;
        } else {
            this.pinerror = false;
        }
        this.finalData = [];
        for (let i = 0; i < this.setArray.length; i++) {
            if (this.setArray[i].checked) {
                if (this.setArray[i].age == '') {
                    this.setArray[i].error = 'Required';
                } else {
                    this.setArray[i].error = '';
                    this.finalData.push({type: this.setArray[i].name, age: this.setArray[i].age });
                }
            }
        }
        console.log(this.setArray, 'total setArraysetArray');
        if (this.finalData != '' && this.selectedAmount != '' && this.pincoce != '' ) {
                const data = {
                    'platform': 'web',
                    'postalcode': this.pincoce,
                    'created_by': '0',
                    'role_id': 4,
                    'sum_insured': this.selectedAmount,
                    'family_details': this.finalData
                };
                console.log(data, 'data');
            this.common.getPolicyQuotation(data).subscribe(
                (successData) => {
                    this.PolicyQuotationSuccess(successData, 0);
                },
                (error) => {
                    this.PolicyQuotationFailure(error);
                }
            );
        }
    }

    public PolicyQuotationSuccess(successData, index) {
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {

            let dialogRef = this.dialog.open(GrouppopupComponent, {
                width: '1500px', data: {comparedata: successData.ResponseObject}});
            dialogRef.disableClose = true;

            dialogRef.afterClosed().subscribe(result => {
                console.log('The dialog was closed');
            });
            this.firstPage = false;
            this.secondPage = true;
            this.insuranceLists = successData.ResponseObject;
            this.changedTabIndex = 0;
            sessionStorage.changedTabIndex = 0;

            this.changedTabDetails = this.insuranceLists[index];
            this.changeSuninsuredAmount = this.insuranceLists[index].group_suminsured_id;
            this.currentGroupName = this.insuranceLists[index].name;
            sessionStorage.changedTabDetails = JSON.stringify(this.insuranceLists[index]);

            sessionStorage.setPage = (this.insuranceLists[index].enquiry_id == '' ) ? 1 : 2;
            if( sessionStorage.setPage != 1) {
                this.settings.HomeSidenavUserBlock = false;
                this.settings.sidenavIsOpened = false;
                this.settings.sidenavIsPinned = false;

            }
            if (this.insuranceLists[index].enquiry_id != '') {
                sessionStorage.sideMenu = true;
            }
            for (let i = 0; i < this.insuranceLists.length; i++) {
                for (let j = 0; j < this.insuranceLists[i].product_lists.length; j++) {
                    this.insuranceLists[i].product_lists[j].compare = false;
                    this.insuranceLists[i].product_lists[j].shortlist = false;
                }
            }
            this.getArray = this.insuranceLists[index].family_members;
            for (let i = 0; i < this.setArray.length; i++) {
                for (let j = 0; j < this.getArray.length; j++) {
                    if (this.setArray[i].name == this.getArray[j].type) {
                        this.setArray[i].disabled = true;
                    }
                }
            }
            sessionStorage.policyLists = JSON.stringify({index: index, value: successData.ResponseObject});
        } else {
        alert('Invalid pincode');
            this.toast.error(successData.ErrorObject, 'Failed');
        }
    }

    public PolicyQuotationFailure(error) {
        console.log(error);
    }


    onSelectedIndexChange(index) {
        this.updateFlag = false;
        this.ageUpdateFlag = false;
        this.settings.loadingSpinner = true;
        this.changedTabDetails = this.insuranceLists[index];
        sessionStorage.changedTabDetails = JSON.stringify(this.insuranceLists[index]);
        this.currentGroupName = this.insuranceLists[index].name;
        this.changedTabIndex = index;
        sessionStorage.changedTabIndex = index;
        this.changeSuninsuredAmount = this.insuranceLists[index].group_suminsured_id;

        this.updateTabPolicy(this.insuranceLists[index], index);
    }

    addCompare(value, pi, index, equiryId, name) {
        const data  = { index: index, product_id: value.product_id, product_name: value.product_name, premium_id: value.premium_id, premium_amount: value.premium_amount, scheme: value.scheme, suminsured_amount: value.suminsured_amount, suminsured_id: value.suminsured_id, company_logo: value.company_logo, company_name: value.company_name, key_features: value.key_features };
        this.equiryId = equiryId;
        this.goupName = name;
        this.insuranceLists[pi].product_lists[index].compare = true;
        this.compareArray.push(data);
    }
    removeCompare(index ,pindex, tabIndex) {
        this.insuranceLists[tabIndex].product_lists[pindex].compare = false;
        this.compareArray.splice(index, 1);
    }
    addShortlist(value, pi, index) {
        this.count = 0;
        this.scount = this.count ++;
        console.log(value, 'value');

        this.shortlistArray.push(value);
        sessionStorage.shorListTab = JSON.stringify({pi: pi, index: index});
        for (let i = 0; i < this.insuranceLists.length; i++) {
            for (let j = 0; j < this.insuranceLists[i].product_lists.length; j++) {
                this.insuranceLists[pi].product_lists[j].shortlist = true;
                this.insuranceLists[pi].product_lists[j].currentBtn = true;

            }
        }
        this.insuranceLists[pi].product_lists[index].currentBtn = false;
        this.insuranceLists[pi].product_lists[index].removebtn = true;
    }
    removeShortlist(value, pi, index) {
        this.scount = this.count--;
        this.shortlistArray.splice(index, 1);

        for (let i = 0; i < this.insuranceLists.length; i++) {
            for (let j = 0; j < this.insuranceLists[i].product_lists.length; j++) {
                this.insuranceLists[pi].product_lists[j].removebtn = false;
                this.insuranceLists[pi].product_lists[j].shortlist = false;

            }
        }
    }

    updateTabPolicy(value, index) {
        this.finalData = [];
        for (let i = 0; i < this.setArray.length; i++) {
            if (this.setArray[i].checked) {
                if (this.setArray[i].age == '') {
                    this.setArray[i].error = 'Required';
                } else {
                    this.setArray[i].error = '';
                    this.finalData.push({type: this.setArray[i].name, age: this.setArray[i].age });
                }
            }
        }
        for (let i = 0; i < this.setArray.length; i++) {
            this.setArray[i].disabled = false;
        }
        const data = {
            'platform': 'web',
            'postalcode': value.postal_code,
            'sum_insured': this.selectedAmount,
            'family_details': this.finalData,
            'family_group_name': value.name,
            'enquiry_id': value.enquiry_id,
            'created_by': '0',
            'role_id': 4,
        };
        console.log(data, 'data222');
        this.common.updateTabPolicyQuotation(data).subscribe(
            (successData) => {
                this.updateTabPolicyQuotationSuccess(successData, index);
            },
            (error) => {
                this.updateTabPolicyQuotationFailure(error);
            }
        );
    }
    public updateTabPolicyQuotationSuccess(successData, index) {
        this.settings.loadingSpinner = true;
        if (successData.IsSuccess) {
            this.insuranceLists = successData.ResponseObject;
            if (sessionStorage.shorListTab != '' && sessionStorage.shorListTab != undefined) {
                let getValue = JSON.parse(sessionStorage.shorListTab);
                for (let i = 0; i < this.insuranceLists.length; i++) {
                    for (let j = 0; j < this.insuranceLists[i].product_lists.length; j++) {
                        this.insuranceLists[getValue.pi].product_lists[j].shortlist = true;
                        this.insuranceLists[getValue.pi].product_lists[j].currentBtn = true;

                    }
                }
                this.insuranceLists[getValue.pi].product_lists[getValue.index].currentBtn = false;
                this.insuranceLists[getValue.pi].product_lists[getValue.index].removebtn = true;
            } else {
                for (let i = 0; i < this.insuranceLists.length; i++) {
                    for (let j = 0; j < this.insuranceLists[i].product_lists.length; j++) {
                        this.insuranceLists[i].product_lists[j].compare = false;
                        this.insuranceLists[i].product_lists[j].shortlist = false;
                    }
                }
            }
            for (let i = 0; i < this.setArray.length; i++) {
                this.setArray[i].auto = false;
            }
            this.getArray = this.insuranceLists[index].family_members;
            for (let i = 0; i < this.setArray.length; i++) {
                for (let j = 0; j < this.getArray.length; j++) {
                    if (this.setArray[i].name == this.getArray[j].type) {
                        this.setArray[i].disabled = true;
                    }
                }
            }
            sessionStorage.policyLists = JSON.stringify({index: index, value: successData.ResponseObject});
        } else {

            this.toast.error(successData.ErrorObject, 'Failed');
        }
    }

    public updateTabPolicyQuotationFailure(error) {
        console.log(error);
    }
    ageChange() {
        this.ageUpdateFlag = true;
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
    // this function will change the sum insured amount
    changeSuminsuredFunction() {
        for (let i = 0; i < this.setArray.length; i++) {
            this.setArray[i].disabled = false;
        }
        const data = {
            'platform': 'web',
            'postalcode': this.changedTabDetails.postal_code,
            'sum_insured': this.changeSuninsuredAmount,
            'family_group_name': this.changedTabDetails.name,
            'enquiry_id': this.changedTabDetails.enquiry_id,
            'created_by': '0',
            'role_id': 4,
        };
        this.changedTabIndex = sessionStorage.changedTabIndex;
        this.common.changeAmountPolicyQuotation(data).subscribe(
            (successData) => {
                this.changeAmountPolicyQuotationSuccess(successData, this.changedTabIndex);
            },
            (error) => {
                this.changeAmountPolicyQuotationFailure(error);
            }
        );
    }
    public changeAmountPolicyQuotationSuccess(successData, index) {
        this.settings.loadingSpinner = true;
        if (successData.IsSuccess) {
            this.insuranceLists = successData.ResponseObject;
            for (let i = 0; i < this.insuranceLists.length; i++) {
                for (let j = 0; j < this.insuranceLists[i].product_lists.length; j++) {
                    this.insuranceLists[i].product_lists[j].compare = false;
                    this.insuranceLists[i].product_lists[j].shortlist = false;
                }
            }
            for (let i = 0; i < this.setArray.length; i++) {
                this.setArray[i].auto = false;
            }
            this.getArray = this.insuranceLists[index].family_members;
            console.log(this.getArray, 'lost');
            for (let i = 0; i < this.setArray.length; i++) {
                for (let j = 0; j < this.getArray.length; j++) {
                    if (this.setArray[i].name == this.getArray[j].type) {
                        this.setArray[i].disabled = true;
                    }
                }
            }
            sessionStorage.policyLists = JSON.stringify({index: index, value: successData.ResponseObject});
        } else {

            this.toast.error(successData.ErrorObject, 'Failed');
        }
    }

    public changeAmountPolicyQuotationFailure(error) {
        console.log(error);
    }

    updateFunction() {
        if (!this.updateFlag && !this.ageUpdateFlag || this.updateFlag && this.ageUpdateFlag || !this.updateFlag && this.ageUpdateFlag) {
            alert('you lost all');
            this.updateDetails();
        } else {
            this.changeSuminsuredFunction();
        }
    }

    // this function will update base details
    updateDetails() {
        console.log(this.changedTabDetails, 'his.changedTabDetails');
        this.getArray = this.changedTabDetails.family_members;
        for (let i = 0; i < this.setArray.length; i++) {
            for (let j = 0; j < this.getArray.length; j++) {
                if (this.setArray[i].name == this.getArray[j].type) {
                    this.setArray[i].auto = true;
                }
            }
        }
        this.finalData = [];
        for (let i = 0; i < this.setArray.length; i++) {
            if (this.setArray[i].checked) {
                if (this.setArray[i].age == '') {
                    this.setArray[i].error = 'Required';
                } else {
                    this.setArray[i].error = '';
                    this.finalData.push({type: this.setArray[i].name, age: this.setArray[i].age });
                }
            }
        }
        const data = {
            'platform': 'web',
            'postalcode': this.changedTabDetails.postal_code,
            'sum_insured': sessionStorage.setInsuredAmount,
            'family_details': this.finalData,
            'family_group_name': this.changedTabDetails.name,
            'enquiry_id': this.changedTabDetails.enquiry_id,
            'created_by': '0',
            'role_id': 4,
        };
        let index = this.changedTabIndex;
        console.log(data, 'data222');
        this.common.updatePolicyQuotation(data).subscribe(
            (successData) => {
                this.updatePolicyQuotationSuccess(successData, index);
            },
            (error) => {
                this.updatePolicyQuotationFailure(error);
            }
        );
    }
    public updatePolicyQuotationSuccess(successData, index) {
        this.settings.loadingSpinner = true;
        if (successData.IsSuccess) {
            if (this.ageUpdateFlag) {
                let dialogRef = this.dialog.open(GrouppopupComponent, {
                    width: '1500px', data: {comparedata: successData.ResponseObject}});
                dialogRef.disableClose = true;

                dialogRef.afterClosed().subscribe(result => {
                    console.log('The dialog was closed');
                });
            }
            this.insuranceLists = successData.ResponseObject;
            for (let i = 0; i < this.insuranceLists.length; i++) {
                for (let j = 0; j < this.insuranceLists[i].product_lists.length; j++) {
                    this.insuranceLists[i].product_lists[j].compare = false;
                    this.insuranceLists[i].product_lists[j].shortlist = false;
                }
            }
            sessionStorage.policyLists = JSON.stringify({index: index, value: successData.ResponseObject});
        } else {

            this.toast.error(successData.ErrorObject, 'Failed');
        }
    }

    public updatePolicyQuotationFailure(error) {
        console.log(error);
    }

    compareList(value) {
        console.log(value, 'value');
        this.productLists = [];
        let scheme = value[0].scheme;
        for (let i = 0; i < value.length; i++) {
            this.productLists.push({product_id: value[i].product_id, premium_amount: value[i].premium_amount, suminsured_amount: value[i].suminsured_amount, prod_suminsuredid: value[i].suminsured_id});
        }
        console.log(this.productLists, 'this.productLists');
        const data = {
            'platform': 'web',
            'scheme': scheme,
            'group_name': this.goupName,
            'enquiry_id': this.equiryId,
            'product_lists': this.productLists,
            'created_by': 0,
            'role_id': 4,

        };
        console.log(data, 'data222');
        this.common.addtoCompare(data).subscribe(
            (successData) => {
                this.compareSuccess(successData);
            },
            (error) => {
                this.compareFailure(error);
            }
        );
    }
    public compareSuccess(successData) {
        console.log(successData, 'gety');
        if (successData.IsSuccess) {
            let dialogRef = this.dialog.open(ComparelistComponent, {
                width: '1500px', data: {comparedata: successData.ResponseObject}});
            dialogRef.disableClose = true;

            dialogRef.afterClosed().subscribe(result => {
                console.log('The dialog was closed');
            });
        }
    }
    public compareFailure(error) {

    }
}
