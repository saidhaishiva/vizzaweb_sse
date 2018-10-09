import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {CommonService} from '../../shared/services/common.service';
import {ToastrService} from 'ngx-toastr';
import {ComparelistComponent} from './comparelist/comparelist.component';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {GrouppopupComponent} from './grouppopup/grouppopup.component';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';
import {ViewdetailsComponent} from './viewdetails/viewdetails.component';
import { Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';



@Component({
  selector: 'app-health-insurance',
  templateUrl: './health-insurance.component.html',
  styleUrls: ['./health-insurance.component.scss']
})
export class HealthInsuranceComponent implements OnInit {

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
    hideChild : any;

    private keyUp = new Subject<string>();


    constructor(public appSettings: AppSettings, public router: Router, public config: ConfigurationService, public fb: FormBuilder, public dialog: MatDialog, public common: CommonService, public toast: ToastrService, public auth: AuthService) {


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
        this.updateFlag = false;
        this.ageUpdateFlag = false;
        this.nonEditable = false;
        this.sbtn = false;
        this.setArray = [];
        this.memberLength = [];
        this.finalData = [];
        this.indexList = [];
        this.hideChild = [];

        this.setArray = [
            {name: 'Self', age: '', disabled: false, checked: false, auto: false, error: ''},
            {name: 'Spouse', age: '', disabled: false, checked: false, auto: false, error: ''},
            {name: 'Son', age: '', disabled: false, checked: false, auto: false, error: ''},
            {name: 'Daughter', age: '', disabled: false, checked: false, auto: false, error: ''}
        ];
        this.compareArray = [];
        this.sumInsuredAmountLists = 0;

        const observable = this.keyUp
            .map(value => event)
            .debounceTime(400)
            .distinctUntilChanged()
            .flatMap((search) => {
                return Observable.of(search).delay(400);
            })
            .subscribe((data) => {
                this.typeAge(data.target);
            });
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
            this.currentGroupName = JSON.parse(sessionStorage.changedTabDetails).name;
        }
        if (sessionStorage.changeSuninsuredAmount != undefined && sessionStorage.changeSuninsuredAmount != '') {
            this.changeSuninsuredAmount = sessionStorage.changeSuninsuredAmount;
        }
        if (sessionStorage.changedTabIndex != undefined && sessionStorage.changedTabIndex != '') {
            this.changedTabIndex = sessionStorage.changedTabIndex;
        }
        if (sessionStorage.shortListCount != undefined && sessionStorage.shortListCount != '') {
            this.shortListCount = sessionStorage.shortListCount;
        }

    }
    // this function will get the sum insured amounts
    public sumInsuredAmonut(): void {
        const data = {
            'platform': 'web',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0
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
        if (successData.IsSuccess) {
            this.sumInsuredAmountLists = successData.ResponseObject;
        }
    }
    public getSumInsuredAmountFailure(error) {
        console.log(error, 'error');
    }
    // checkNetwork() {
    //     if (this.sumInsuredAmountLists == 0) {
    //         this.toast.error("Unable to connect to the network");
    //
    //     }
    // }
    // selected members
    ckeckedUser(value, index, name) {

        if (value) {
            if (name == 'Son' || name == 'Daughter') {
                this.count++;
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

        } else {
            this.setArray[index].age = '';

            if (this.setArray[index].name == 'Son') {
                this.setArray[3].disabled = false;
            } else if (this.setArray[index].name == 'Daughter') {
                this.setArray[2].disabled = false;
            }
            if (name == 'Son' || name == 'Daughter') {
                this.count--;
            }
            console.log(this.count, 'this.count--');
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
            if (name == 'Father') {
                sessionStorage.fatherBTn = false;
                this.fatherBTn = false;
            }
            if (name == 'Mother') {
                sessionStorage.motherBtn = false;
                this.motherBtn = false;
            }
            if (name == 'Father In Law') {
                sessionStorage.fatherInLawBTn = false;
                this.fatherInLawBTn = false;
            }
            if (name == 'Mother In Law') {
                sessionStorage.motherInLawBtn = false;
                this.motherInLawBtn = false;
            }
            if (index > 3 ) {
                this.setArray.splice(index, 1);
            }
        }
        sessionStorage.setFamilyDetails = JSON.stringify(this.setArray);
    }
    changeAmount() {
        sessionStorage.setInsuredAmount = this.selectedAmount;
    }
    selectPincode() {
        sessionStorage.setPincode = this.pincoce;
    }
    // add new user
    addUser(value, index) {
        console.log(this.count, 'add');
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

    typeAge(checked, name, index, value) {
        let checkTrue = true;
        let checkFalse = false;
        if (name == 'Son' || name == 'Daughter') {
            if (value != '' && this.setArray[index].checked != true) {
                this.ckeckedUser(checkTrue, index, name);
            } else if (value == '' && this.setArray[index].checked == true) {
                this.ckeckedUser(checkFalse, index, name);
            }
        }
        if (value != '') {
            this.setArray[index].checked = true;
        } else {
            this.setArray[index].checked = false;
        }
        sessionStorage.setFamilyDetails = JSON.stringify(this.setArray);
        console.log(this.hideChild, 'hideChild')
    }


    // // typeAge(checked, name, index, value) {
    // typeAge(value) {
    //     console.log(value, 'vklllll');
    //     console.log(value.value, 'value');
    //     console.log(value.max, 'indx');
    //     // if (this.setArray[2].age == '' || this.setArray[2].checked == false) {
    //     //     this.count = 0;
    //     // }
    //     let checkTrue = true;
    //     let checkFalse = false;
    //     if (value.max == 'Son' || value.max == 'Daughter') {
    //     // else if (value.length == 0) {
    //         if (value.value != '') {
    //             console.log('in');
    //             this.ckeckedUser(checkTrue, value.alt, value.max);
    //         } else if (value.value == '') {
    //             console.log('out');
    //
    //             this.ckeckedUser(checkFalse, value.alt, value.max);
    //         }
    //     }
    //
    //
    //     if (value.value != '') {
    //         this.setArray[value.alt].checked = true;
    //     } else {
    //         this.setArray[value.alt].checked = false;
    //     }
    //     sessionStorage.setFamilyDetails = JSON.stringify(this.setArray);
    //     console.log(this.hideChild, 'hideChild')
    // }



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

        this.finalData = [];
        let validArray=[];

        for (let i = 0; i < this.setArray.length; i++) {
            if (this.setArray[i].checked) {
                validArray.push(1);
                if (this.setArray[i].age == '') {
                    this.setArray[i].error = 'Required';

                    } else {
                    this.setArray[i].error = '';
                    this.finalData.push({type: this.setArray[i].name, age: this.setArray[i].age });
                }
            }
        }
        if(!validArray.includes(1)){
            this.toast.error("Please select atleast one member");

        }

        if (this.selectedAmount != '' && this.selectedAmount != undefined && this.pincoce != '' && this.pincoce != undefined) {
            if (this.finalData != '') {
                // if (this.setArray[index].age.length > 1) {
                // if (this.setArray[0].age < 18) {
                //     this.toast.error("Self age should not be less than 18");
                // } else if (this.setArray[1].age != '') {
                //     if (this.setArray[1].age < 18) {
                //         this.toast.error("Spouse age should not be less than 18");
                //     }
                // } else {
                    const data = {
                        'platform': 'web',
                        'postalcode': this.pincoce ? this.pincoce : '',
                        'created_by': '0',
                        'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
                        'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
                        'sum_insured': this.selectedAmount,
                        'family_details': this.finalData,
                        'insurance_type': '1',
                        'annual_salary': '',
                        'occupation_code': '',
                    };
                    this.settings.loadingSpinner = true;
                    this.common.getPolicyQuotation(data).subscribe(
                        (successData) => {
                            this.PolicyQuotationSuccess(successData, 0);
                            console.log( successData,'hjj');

                        },
                        (error) => {
                            this.PolicyQuotationFailure(error);
                            // if(this.setArray[i].type == ''){

                        }
                    );
                // }
                // }

            } else {
                    // this.toast.error("Please select atleast one member");
            }
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
            sessionStorage.changeSuninsuredAmount = this.insuranceLists[index].group_suminsured_id;
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
                    console.log( this.setArray[i],'uuuu');
                    console.log(this.getArray[j],'fffff');
                }
            }
            sessionStorage.policyLists = JSON.stringify({index: index, value: successData.ResponseObject});
        } else {
            this.toast.error(successData.ErrorObject);
        }
    }

    public PolicyQuotationFailure(error) {
    this.settings.loadingSpinner = false;
        this.toast.error('Network is unreachable', 'Failed');
    }
    onSelectedIndexChange(index) {
        if (this.insuranceLists.length == index) {
            this.getShortListDetails(this.enquiryId, index, name);
            this.compareArray = [];
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
            sessionStorage.changeSuninsuredAmount = this.changeSuninsuredAmount;
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
        this.nonEditable = true;
        const data = {
            'platform': 'web',
            'scheme': value.scheme,
            'group_name': name,
            'product_id': value.product_id,
            'suminsured_amount': value.suminsured_amount,
            'premium_amount': value.premium_amount,
            'enquiry_id': enqId,
            'shortlisted_by': '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0

        };
        this.settings.loadingSpinner = true;
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
            this.shortListCount = this.shortlistArray.length;
            sessionStorage.shortListCount = this.shortListCount;
            for (let i = 0; i < this.insuranceLists.length; i++) {
                for (let j = 0; j < this.insuranceLists[i].product_lists.length; j++) {
                    for (let k = 0; k < this.shortlistArray.length; k++) {
                        this.insuranceLists[pi].product_lists[j].shortlist_id = this.shortlistArray[k].shortlist_id;
                        this.insuranceLists[pi].product_lists[j].shortlist = this.shortlistArray[k].shortlist_id == '' ? false : true;
                        this.insuranceLists[pi].product_lists[j].currentBtn = this.shortlistArray[k].shortlist_id == '' ? false : true;
                    }
                }
            }
        }
        this.insuranceLists[pi].product_lists[index].currentBtn = false;
        this.insuranceLists[pi].product_lists[index].removebtn = true;
        this.indexList.push({pi: pi, index: index});
        // sessionStorage.shorListTab = JSON.stringify({pi: pi, index: index});
        sessionStorage.policyLists = JSON.stringify({index: index, value: this.insuranceLists});



    }
    public shortListFailure(error) {

    }
    removeShortlist(value, pi, index, enqId, shortId) {
        const data = {
            'platform': 'web',
            'shortlist_id': shortId,
            'enquiry_id': enqId,
            'shortlisted_by': '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0
        };
        this.settings.loadingSpinner = true;
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
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {
            this.shortlistArray.splice(index, 1);
            this.shortListCount = this.shortlistArray.length;
            sessionStorage.shortListCount = this.shortListCount;
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
    }
    public removeShortListFailure(successData) {

    }
    removeShortlistPage(value, pi, index, enqId, shortId) {
        const data = {
            'platform': 'web',
            'shortlist_id': shortId,
            'enquiry_id': enqId,
            'shortlisted_by': '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0
        };
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
        if (successData.IsSuccess) {
            this.shortlistArray.splice(index, 1);
            this.shortListCount = this.shortlistArray.length;
            sessionStorage.shortListCount = this.shortListCount;
            if (this.shortListCount > 0) {
                this.nonEditable = true;
            } else {
                this.nonEditable = false;
            }
        }
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
            'postalcode': this.pincoce,
            'sum_insured': this.selectedAmount,
            'family_details': this.finalData,
            'family_group_name': value.name,
            'enquiry_id': value.enquiry_id,
            'created_by': '0',
            'insurance_type' : '1',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0
        };
        this.settings.loadingSpinner = true;
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
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {
            // if (successData.ResponseObject) {
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
            // }
            sessionStorage.policyLists = JSON.stringify({index: index, value: this.insuranceLists});
        } else {
            this.toast.error(successData.ErrorObject, 'Failed');
        }
    }

    public updateTabPolicyQuotationFailure(error) {
        this.settings.loadingSpinner = false;
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
            'postalcode': this.pincoce,
            'sum_insured': this.changeSuninsuredAmount,
            'family_group_name': this.changedTabDetails.name,
            'enquiry_id': this.changedTabDetails.enquiry_id,
            'created_by': '0',
            'insurance_type' : '1',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0
        };
        this.settings.loadingSpinner = true;
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
        this.settings.loadingSpinner = false;
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
        this.settings.loadingSpinner = false;
    }

    getShortListDetails(enqId, index, name) {
        const data = {
            'platform': 'web',
            'enquiry_id': enqId,
            'shortlisted_by': '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0
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
        this.shortlistArray = successData.ResponseObject;
        this.shortListCount = this.shortlistArray.length;
        if (this.shortListCount > 0) {
            this.nonEditable = true;
            let length = this.shortlistArray.length - 1;
            this.totalSuminsured = this.shortlistArray[length].total_suminsured;
        } else {
            this.nonEditable = false;

        }
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
    }
    public getShortListsFailure(error) {
    }

    updateFunction() {
        if (!this.updateFlag && !this.ageUpdateFlag || this.updateFlag && this.ageUpdateFlag || !this.updateFlag && this.ageUpdateFlag) {
            let dialogRef = this.dialog.open(GroupmembersAlert, {
                width: '700px',
            });
            dialogRef.disableClose = true;
            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.updateDetails();
                }
            });
        } else {
            this.changeSuminsuredFunction();
        }
    }

    // this function will update base details
    updateDetails() {
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
            'postalcode': this.pincoce,
            'sum_insured': sessionStorage.setInsuredAmount,
            'family_details': this.finalData,
            'family_group_name': this.changedTabDetails.name,
            'enquiry_id': this.changedTabDetails.enquiry_id,
            'created_by': '0',
            'insurance_type': '1',
            'annual_salary': '',
            'occupation_code': '',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0
        };
        let index = this.changedTabIndex;
        // this.settings.loadingSpinner = true;
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
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {
            if (this.ageUpdateFlag) {
                let dialogRef = this.dialog.open(GrouppopupComponent, {
                    width: '1500px', data: {comparedata: successData.ResponseObject}});
                dialogRef.disableClose = true;

                dialogRef.afterClosed().subscribe(result => {

                });
                this.insuranceLists = successData.ResponseObject;
                for (let i = 0; i < this.insuranceLists.length; i++) {
                    for (let j = 0; j < this.insuranceLists[i].product_lists.length; j++) {
                        this.insuranceLists[i].product_lists[j].compare = false;
                        this.insuranceLists[i].product_lists[j].shortlist = false;
                    }
                }
                sessionStorage.policyLists = JSON.stringify({index: index, value: successData.ResponseObject});

            }

        } else {

            this.toast.error(successData.ErrorObject, 'Failed');
        }
    }

    public updatePolicyQuotationFailure(error) {
        console.log(error);
        this.settings.loadingSpinner = false;
    }
    // view key features details
    viewKeyList(value) {
        console.log(value, 'value');
        let dialogRef = this.dialog.open(ViewdetailsComponent, {
            width: '1500px', data: value.product_id
        });
        dialogRef.disableClose = true;

        dialogRef.afterClosed().subscribe(result => {
        });

    }

//

    compareList(value) {
        this.productLists = [];
        let scheme = value[0].scheme;
        for (let i = 0; i < value.length; i++) {
            this.productLists.push({product_id: value[i].product_id, premium_amount: value[i].premium_amount, suminsured_amount: value[i].suminsured_amount, prod_suminsuredid: value[i].suminsured_id});
        }
        const data = {
            'platform': 'web',
            'scheme': scheme,
            'group_name': this.goupName,
            'enquiry_id': this.equiryId,
            'product_lists': this.productLists,
            'created_by': 0,
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0

        };
        this.settings.loadingSpinner = true;
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
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {
            let dialogRef = this.dialog.open(ComparelistComponent, {
                width: '1500px', data: {comparedata: successData.ResponseObject}});
            dialogRef.disableClose = true;

            dialogRef.afterClosed().subscribe(result => {
            });
        }
    }
    public compareFailure(error) {
        this.settings.loadingSpinner = false;
    }


    buyProduct(value, enqId, gname) {
        console.log(value, 'value');
        if (this.auth.getPosStatus() == '0') {
            let dialogRef = this.dialog.open(PosstatusAlert, {
                width: '700px',
            });
            dialogRef.disableClose = true;
            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    sessionStorage.buyProductdetails = JSON.stringify(value);
                    sessionStorage.groupName = gname;
                    if (value.product_id <= 5 ) {
                        this.router.navigate(['/religare']);
                    } else if(value.product_id == 11){
                        this.router.navigate(['/reliance']);
                    } else {
                        this.router.navigate(['/proposal']);
                    }
                } else {
                }
            });
        } else {
            sessionStorage.buyProductdetails = JSON.stringify(value);
            sessionStorage.groupName = gname;
            if (value.product_id <= 5) {
                this.router.navigate(['/religare']);
            }  else if(value.product_id == 11){
                this.router.navigate(['/reliance']);
            } else {
                this.router.navigate(['/proposal']);
            }
        }
    }
}

@Component({
    selector: 'groupmembersalert',
    template: `
        <!--<h1 mat-dialog-title>Delete Assistant</h1>-->
        <div mat-dialog-content>
            <label>All you Groups might get changed based on the changes made. Do you want to continue?</label>
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
export class PosstatusAlert {

    constructor(
        public dialogRef: MatDialogRef<PosstatusAlert>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}

