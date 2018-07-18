import {Component, OnInit, ViewChild, Inject} from '@angular/core';
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
    count: any;
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
    totalSuminsured: any;
    indexList: any;
    shortListCount: any;
    sonBTn: any;
    daughterBTn: any;
    changedTabDetails: any;
    changedTabIndex: any;
    currentGroupName: any;
    enquiryId: any;
    firstSelectedAmount: any;
    changeSuninsuredAmount: any;
    shortlistArray: any;
    updateFlag: boolean;
    ageUpdateFlag: boolean;
    nonEditable: boolean;
    sbtn: boolean;


    constructor(public appSettings: AppSettings, public config: ConfigurationService, public fb: FormBuilder, public dialog: MatDialog, public common: CommonService, public toast: ToastrService) {
        this.settings = this.appSettings.settings;
        this.webhost = this.config.getimgUrl();
       // sessionStorage.sideMenu = false;
        // this.settings.loadingSpinner = true
        if (!sessionStorage.sideMenu) {
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
        this.nonEditable = false;
        this.sbtn = false;

        this.setArray = [];
        this.memberLength = [];
        this.finalData = [];
        this.indexList = [];
       // this.shortlistArray = [];
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
        if (sessionStorage.enquiryId != undefined && sessionStorage.enquiryId != '') {
            this.enquiryId = sessionStorage.enquiryId;
        }
        if (sessionStorage.policyLists != undefined && sessionStorage.policyLists != '') {
            this.insuranceLists = JSON.parse(sessionStorage.policyLists).value;
            console.log(this.insuranceLists, 'insuranceListsinsuranceLists');

            console.log(this.insuranceLists, 'set');
            let index = JSON.parse(sessionStorage.policyLists).index;
            for (let i = 0; i < this.setArray.length; i++) {
                this.setArray[i].auto = false;
            }
            this.getArray = this.insuranceLists[index].family_members;
            for (let i = 0; i < this.setArray.length; i++) {
                for (let j = 0; j < this.getArray.length; j++) {
                    if (this.setArray[i].name == this.getArray[j].type) {
                        this.setArray[i].auto = true;
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

            // for (let i = 0; i < this.setArray.length; i++) {
            //     if (this.setArray[i].name == 'Son') {
            //         this.sonCount.push(this.setArray[i]);
            //     } else if (this.setArray[i].name == 'Daughter') {
            //         this.daughterCount.push(this.setArray[i]);
            //     }
            // }
        } else {
            if (this.setArray[index].name == 'Son') {
                this.setArray[3].disabled = false;
            } else if (this.setArray[index].name == 'Daughter') {
                this.setArray[2].disabled = false;
            }

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
        for (let i = 0; i < this.setArray.length; i++) {
            let length = this.setArray.length -1;
            console.log(length, 'length');
            if (this.setArray.length > 4) {
                if (this.setArray[length].name == 'Son') {
                    this.setArray[3].disabled = true;
                } else if (this.setArray[length].name == 'Daughter') {
                    this.setArray[2].disabled = true;
                }
            }
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
            this.enquiryId = this.insuranceLists[index].enquiry_id;
            sessionStorage.enquiryId = this.insuranceLists[index].enquiry_id;

            this.changedTabDetails = this.insuranceLists[index];
            this.changeSuninsuredAmount = this.insuranceLists[index].group_suminsured_id;
            this.currentGroupName = this.insuranceLists[index].name;
            sessionStorage.changedTabDetails = JSON.stringify(this.insuranceLists[index]);

            sessionStorage.setPage = (this.insuranceLists[index].enquiry_id == '' ) ? 1 : 2;
            if (sessionStorage.setPage != 1) {
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
                        this.setArray[i].auto = true;
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
        console.log(index, 'index');

        if (this.insuranceLists.length == index) {
            this.getShortListDetails(this.enquiryId, index, name);

        } else {
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
    }

    addCompare(value, pi, index, equiryId, name) {
        const data  = { index: index, product_id: value.product_id, product_name: value.product_name, premium_id: value.premium_id, premium_amount: value.premium_amount, scheme: value.scheme, suminsured_amount: value.suminsured_amount, suminsured_id: value.suminsured_id, company_logo: value.company_logo, company_name: value.company_name, key_features: value.key_features };
        this.equiryId = equiryId;
        this.goupName = name;
        this.insuranceLists[pi].product_lists[index].compare = true;
        this.compareArray.push(data);
    }
    removeCompare(index , pindex, tabIndex) {
        this.insuranceLists[tabIndex].product_lists[pindex].compare = false;
        this.compareArray.splice(index, 1);
    }
    addShortlist(value, pi, index, enqId, name) {
        console.log(value, 'value');
        console.log(name, 'name');
        // this.shortlistArray.push(value);
        this.nonEditable = true;
        // sessionStorage.shorListTab = JSON.stringify({pi: pi, index: index});


        const data = {
            'platform': 'web',
            'scheme': value.scheme,
            'group_name': name,
            'product_id': value.product_id,
            'suminsured_amount': value.suminsured_amount,
            'premium_amount': value.premium_amount,
            'enquiry_id': enqId,
            'shortlisted_by': '0',
            'role_id': 4,

        };
        console.log(data, 'data222');
        this.common.addShortList(data).subscribe(
            (successData) => {
                this.shortListSuccess(successData, pi, index);
            },
            (error) => {
                this.shortListFailure(error);
            }
        );
    }
    public shortListSuccess(successData, pi, index) {
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {
            this.shortlistArray = successData.ResponseObject;
            console.log(this.shortlistArray, 'shortlistArray');
            this.shortListCount = this.shortlistArray.length;
            for (let i = 0; i < this.insuranceLists.length; i++) {
                for (let j = 0; j < this.insuranceLists[i].product_lists.length; j++) {
                    for (let k = 0; k < this.shortlistArray.length; k++) {
                        this.insuranceLists[pi].product_lists[j].shortlist_id = this.shortlistArray[k].shortlist_id;
                        this.insuranceLists[pi].product_lists[j].shortlist = this.shortlistArray[k].shortlist_id == '' ? false : true;
                        this.insuranceLists[pi].product_lists[j].currentBtn = this.shortlistArray[k].shortlist_id == '' ? false : true;
                    }
                }
            }
            console.log(this.insuranceLists, 'insuranceLists');
        }

        // for (let i = 0; i < this.insuranceLists.length; i++) {
        //     for (let j = 0; j < this.insuranceLists[i].product_lists.length; j++) {
        //         this.insuranceLists[pi].product_lists[j].shortlist = true;
        //         this.insuranceLists[pi].product_lists[j].currentBtn = true;
        //
        //     }
        // }
        this.insuranceLists[pi].product_lists[index].currentBtn = false;
        this.insuranceLists[pi].product_lists[index].removebtn = true;
        this.indexList.push({pi: pi, index: index});
        // sessionStorage.shorListTab = JSON.stringify({pi: pi, index: index});
        sessionStorage.policyLists = JSON.stringify({index: index, value: this.insuranceLists});



    }
    public shortListFailure(error) {

    }
    removeShortlist(value, pi, index, enqId, shortId) {
        console.log(shortId, 'shortId');
        const data = {
            'platform': 'web',
            'shortlist_id': shortId,
            'enquiry_id': enqId,
            'shortlisted_by': '0',
            'role_id': 4,
        };
        console.log(data, 'data222');
        this.common.removeShortList(data).subscribe(
            (successData) => {
                this.removeShortListSuccess(successData, pi, index, enqId, value.group_name);
            },
            (error) => {
                this.removeShortListFailure(error);
            }
        );
    }
    public removeShortListSuccess(successData, pi, index, enqId, name) {
        console.log(successData, 're');
        if (successData.IsSuccess) {
            this.shortlistArray.splice(index, 1);
            this.shortListCount = this.shortlistArray.length;
            if (this.shortListCount > 0) {
                this.nonEditable = true;
            } else {
                this.nonEditable = false;

            }

            for (let i = 0; i < this.insuranceLists.length; i++) {
                for (let j = 0; j < this.insuranceLists[i].product_lists.length; j++) {
                    this.insuranceLists[pi].product_lists[j].removebtn = false;
                    this.insuranceLists[pi].product_lists[j].shortlist = false;

                }
            }

        }

        // this.getShortListDetails(enqId, index, name);

    }
    public removeShortListFailure(successData) {

    }
    removeShortlistPage(value, pi, index, enqId, shortId) {
        console.log(shortId, 'shortId');
        const data = {
            'platform': 'web',
            'shortlist_id': shortId,
            'enquiry_id': enqId,
            'shortlisted_by': '0',
            'role_id': 4,
        };
        console.log(data, 'data222');
        this.common.removeShortList(data).subscribe(
            (successData) => {
                this.removeShortlistPageSuccess(successData, pi, index, enqId, value.group_name);
            },
            (error) => {
                this.removeShortListPageFailure(error);
            }
        );
    }
    public removeShortlistPageSuccess(successData, pi, index, enqId, name) {
        console.log(successData, 're');
        if (successData.IsSuccess) {
            this.shortlistArray.splice(index, 1);
            this.shortListCount = this.shortlistArray.length;
            if (this.shortListCount > 0) {
                this.nonEditable = true;
            } else {
                this.nonEditable = false;
            }
        }

        // this.getShortListDetails(enqId, index, name);

    }
    public removeShortListPageFailure(successData) {

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
            this.setArray[i].auto = false;
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
                this.updateTabPolicyQuotationSuccess(successData, index, value.enquiry_id, value.name);
            },
            (error) => {
                this.updateTabPolicyQuotationFailure(error);
            }
        );
    }
    public updateTabPolicyQuotationSuccess(successData, index, enqId, name) {
        this.settings.loadingSpinner = true;
        if (successData.IsSuccess) {
            this.insuranceLists = successData.ResponseObject;
             this.getShortListDetails(enqId, index, name);
                for (let i = 0; i < this.insuranceLists.length; i++) {
                    for (let j = 0; j < this.insuranceLists[i].product_lists.length; j++) {
                            this.insuranceLists[index].product_lists[j].shortlist =  this.insuranceLists[index].product_lists[j].shortlist_status;
                            this.insuranceLists[index].product_lists[j].currentBtn =  this.insuranceLists[index].product_lists[j].shortlist_status;
                            if (this.insuranceLists[index].product_lists[j].indiv_shortlist_status == true) {
                                this.insuranceLists[index].product_lists[j].removebtn = this.insuranceLists[index].product_lists[j].indiv_shortlist_status;
                                this.insuranceLists[index].product_lists[j].currentBtn = false;
                            }
                    }
                }
                console.log(this.insuranceLists, 'insuranceLists');

            for (let i = 0; i < this.setArray.length; i++) {
                this.setArray[i].auto = false;
            }
            this.getArray = this.insuranceLists[index].family_members;
            for (let i = 0; i < this.setArray.length; i++) {
                for (let j = 0; j < this.getArray.length; j++) {
                    if (this.setArray[i].name == this.getArray[j].type) {
                        this.setArray[i].auto = true;
                    }
                }
            }
            sessionStorage.policyLists = JSON.stringify({index: index, value: this.insuranceLists});
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
            this.setArray[i].auto = false;
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
                        this.setArray[i].auto = true;
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

    getShortListDetails(enqId, index, name) {
        const data = {
            'platform': 'web',
            'enquiry_id': enqId,
            'shortlisted_by': '0',
            'role_id': 4,
        };
        this.changedTabIndex = sessionStorage.changedTabIndex;
        this.common.getShortLists(data).subscribe(
            (successData) => {
                this.getShortListsSuccess(successData, index, name);
            },
            (error) => {
                this.getShortListsFailure(error);
            }
        );
    }
    public getShortListsSuccess(successData, index, name) {
        console.log(successData);
        this.shortlistArray = successData.ResponseObject;
        this.shortListCount = this.shortlistArray.length;
        if (this.shortListCount > 0) {
            this.nonEditable = true;
            let length = this.shortlistArray.length - 1;
            this.totalSuminsured = this.shortlistArray[length].total_suminsured;
        } else {
            this.nonEditable = false;

        }

        console.log(this.shortlistArray, 'shortlistArray');
        for (let i = 0; i < this.shortlistArray.length; i++) {
            this.shortlistArray[i].removebtn = true;
        }
        for (let i = 0; i < this.insuranceLists.length; i++) {
            for (let j = 0; j < this.insuranceLists[i].product_lists.length; j++) {
                for (let k = 0; k < this.shortlistArray.length; k++) {
                    if (this.shortlistArray[k].group_name == name) {
                        this.insuranceLists[index].product_lists[j].shortlist_id = this.shortlistArray[k].shortlist_id;
                    }

                }
            }
        }
        console.log(this.insuranceLists, 'insuranceLists');
    }
    public getShortListsFailure(error) {
        console.log(error);
    }

    updateFunction() {
        if (!this.updateFlag && !this.ageUpdateFlag || this.updateFlag && this.ageUpdateFlag || !this.updateFlag && this.ageUpdateFlag) {
            let dialogRef = this.dialog.open(GroupmembersAlert, {
                width: '600px',
            });
            dialogRef.disableClose = true;
            dialogRef.afterClosed().subscribe(result => {
            });
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

@Component({
    selector: 'groupmembersalert',
    template: `
        <!--<h1 mat-dialog-title>Delete Assistant</h1>-->
        <div mat-dialog-content>
            <label>If you change in members age . Do you want to continue?</label>
        </div>
        <div mat-dialog-actions style="justify-content: center">
            <!--<button mat-button class="secondary-bg-color" (click)="onNoClick()" tabindex="-1">Cancel</button>-->
            <button mat-raised-button color="primary" [mat-dialog-close]="true" tabindex="2">Ok</button>
        </div>
    `

})
export class GroupmembersAlert {

    constructor(
        public dialogRef: MatDialogRef<GroupmembersAlert>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}

