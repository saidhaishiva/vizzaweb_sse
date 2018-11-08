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

        // const observable = this.keyUp
        //     .map(value => event)
        //     .debounceTime(400)
        //     .distinctUntilChanged()
        //     .flatMap((search) => {
        //         return Observable.of(search).delay(400);
        //     })
        //     .subscribe((data) => {
        //         this.typeAge(data.target);
        //     });
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
        if (this.compareArray.length >= 3) {
            for (let i = 0; i < this.insuranceLists[pi].product_lists.length; i++) {
                this.insuranceLists[pi].product_lists[i].compare = true;
            }
        }

    }
    removeCompare(index , pindex, tabIndex) {
       // this.insuranceLists[tabIndex].product_lists[pindex].compare = false;
        this.compareArray.splice(index, 1);
        let getCount;
        for (let i = 0; i < this.insuranceLists[tabIndex].product_lists.length; i++) {
            getCount = false;
            for (let j = 0; j < this.compareArray.length; j++) {
                if (this.compareArray[j].premium_id == this.insuranceLists[tabIndex].product_lists[i].premium_id) {
                    getCount = true;
                    this.insuranceLists[tabIndex].product_lists[i].compare = true;
                }
            }
            if (!getCount) {
                this.insuranceLists[tabIndex].product_lists[i].compare = false;
            }
        }

    }
    removeAllCompare(index, tabIndex) {
        for (let i = 0; i < this.insuranceLists[tabIndex].product_lists.length; i++) {
            this.insuranceLists[tabIndex].product_lists[i].compare = false;
        }
        this.compareArray = [];
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

    healthInsurer(){
        const dialogRef = this.dialog.open(HealthInsurer, {
            width: '1000px',
            height: '500px'
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }
    headinghealthinsurance(){
        this.firstPage = true;
        this.secondPage = false;
    }
}


@Component({
    selector: 'healthinsurer',
    template: `<mat-accordion>

        <div class="col-sm-12 text-right">
            <mat-icon (click)="onNoClick()" style="cursor: pointer">close</mat-icon>
        </div>
            
        <div class="text-center">
            <h3>About Health Insurance</h3>
        </div>
        <mat-expansion-panel class="mb-3">
            <mat-expansion-panel-header>
                <mat-panel-title>
                    HEALTH INSURANCE- WHAT YOU SHOULD KNOW
                </mat-panel-title>
            </mat-expansion-panel-header>
            Health Insurance is a kind of Insurance that deals with the wellness of your finances when you fall ill. Health Insurance fully or partially covers the expenses incurred due to health and sickness related procedures at the hospital.

        </mat-expansion-panel>

        <mat-expansion-panel class="mb-3">
            <mat-expansion-panel-header>
                <mat-panel-title>
                    UTILISING THE HEALTH INSURANCE POLICY
                </mat-panel-title>
            </mat-expansion-panel-header>
            <p>After opting the health insurance and payment of premium to the insurer a health insurance policy is issued by the insurer along with the policy terms and conditions and a TPA identity card is also issued by the allocated Third Party Administrator ( TPA ).</p>
            <p>You must remember that the TPA is only a facilitator and TPA’s are not empowered to reject claims.</p>
            <p>It is a must that you should read the terms and conditions of the policy and if the terms and conditions are not in line with what was assured at the time of sales or you feel that this policy is not what you required, you can cancel the policy within the free look period and get a full refund of the premium.</p>
            <p>There are certain exclusions found in common with all health insurance policies and in some policies certain exclusions might have been waived by specific wordings.</p>
            <strong>The most common exclusions and salient features to be borne in mind are :</strong>
            <ol><li>Remember a full 24 hour hospitalization is a prime requisite for a hospitalization claim unless the particular procedure has been listed as a day care procedure by the insurer. A discharge with a few minutes short of 24 hours hospitalization could result in repudiation of the claim.</li>
                <li>first 30 days from the date of commencement of the policy no hospitalization claims are payable except in the unfortunate event of an accident hospitalization. This exclusion is not applicable for renewals if renewed prior to the expiry of the existing policy.</li>
                <li>Pre-existing illnesses are generally excluded for a specific period. This exclusion is not applicable where the existing policy holder has completed the requisite period with any insurer and the policy is a continuation without any break in period.</li>
                <li>Although there is a grace time for renewing the policy you must be aware of the fact that generally illnesses contracted during the grace period are excluded from the coverage just like a first year policy holder.</li>
                <li>Certain diseases / illnesses get covered after completion of a particular period of continuous renewal 2 years / 3 years / 4 years. This is specifically mentioned in the policy.</li>
                <li>You must be aware of the fact that the Hospital / Nursing home has to be registered with the local authorities and according to the located city there is a minimum number of beds stipulated. Further the hospital should have a fully equipped operation theater, nurses and doctors available round the clock.</li>
                <li>The unfortunate event of hospitalization could be a planned hospitalization which is after several visits to the doctors a procedure might have to be done under 24/7 monitoring by the medical team or it could be an emergency unplanned hospitalization. Under both the circumstances the eligible policy benefits can be obtained by utilizing the cashless or reimbursement process.</li>
                <li>In every hospitalization procedure it is a foregone fact that there will be a pre hospitalization expenditure and after discharge certain post hospitalization expenditure. Generally both the pre and post hospitalization expenses  do not come under the cashless process and has to be claimed as a reimbursement. You must remember that all expenses must be supported by the relevant prescription and bill along with the original report for diagnostic materials. Normally all insurance policies give a 30 day coverage for pre hospitalization expenses and a 60 day period for post hospitalization expenses. Remember there are variations from insurer to insurer according to the opted policy. All claims are payable up to the sum insured limit only. Please remember there might be sub limits or cash / percentage limitations in procedures which are charged by the hospitals on a package basis. Only relevant ( to the procedure at the hospital) medical expenses are covered in the pre and post hospitalization.</li></ol>
        </mat-expansion-panel>

        <mat-expansion-panel class="mb-3">
            <mat-expansion-panel-header>
                <mat-panel-title>
                    CASHLESS HOSPITALIZATION PROCESS
                </mat-panel-title>
            </mat-expansion-panel-header>
            For you to claim your Insurance by the Cashless Hospitalization manner, you must use any of the hospitals that fall under the network of hospitals registered with that insurer or the Third Party Administrator ( TPA).  All you have to do is to present a physical proof of the health insurance policy you availed or the identity card provided by the insurer / TPA of the insurance along with an approved photo identity of the policy holder as well as the insured person undergoing the treatment and you will be able to avail the benefits of Cashless treatment and hospitalization. Original identity cards have to be shown for verification and immediate return.
        </mat-expansion-panel>

        <mat-expansion-panel class="mb-3">
            <mat-expansion-panel-header>
                <mat-panel-title>
                    REIMBURSEMENT CLAIM PROCESS
                </mat-panel-title>
            </mat-expansion-panel-header>
            <p>Insurers selling health insurance also settle claims on a reimbursement basis. This happens when the hospital that you’re being treated in is not a part of the network of hospitals or the insured would have preferred to pay and claim later with the insurer including pre and post hospitalization expenses or the admissibility of the claim due to coverage eligibility and such other valid reasons. It must be remembered that the denial of cashless benefit does not mean denial of the claim itself. Insurer is the only authorized person to reject a claim and not the TPA.</p>
            <strong>These are a few documents that are mandatory for the reimbursement claim process:</strong>
            <ul><li>A completed Claim Form with the attending doctors certificate.</li>
                <li>Discharge summary giving complete details with DOA and DOD.</li>
                <li>All medicine purchases should be accompanied by prescription and bill.</li>
                <li>Investigation Reports in original to be accompanied by original Prescriptions and Bill.</li>
                <li>In case of accidents, the FIR or Medico Legal Certificate is also mandatory. </li></ul>
            <p>Whether you need health insurance for yourself, your business, or your family, we at Vizza Insurance Broking Services Pvt. Ltd. have a wide range of choices. We help you to find the right health insurance with the right insurer. As a licensed IRDA Broker we work with all insurers and thus we make it easy for individuals to get various  quotes from all insurers, view plan options and provide various permutations and combinations.  Our site is integrated with the health insurance marketplace, making it a one-stop destination for shopping and purchasing the best suitable individual coverage from all insurers.</p>
            <p>No claim bonus and life time renewability</p>
            <p>No Claim Bonus (NCB) is the benefit accrued to an insured for not making any claims during the previous policy period.  As per current norms it ranges from 20% on the premium and progressively increases to a maximum of 50%. The No claim bonus facility varies amongst the insurers. Some of the insurers give a no claim discount in the premium for the subsequent year and every claim free year this discount percentage is increased. In the event of a claim the discount is lost for the subsequent renewal. Some of the insurers provide the no claim bonus as an additional sum insured which is lost in the event of a claim for the next renewal.</p>
            <p>Opening up of the insurance market has facilitated a wide range of products which are lifelong renewable. It is vital for you to go for a policy that offers protection for a very long time, especially during old age. This is the reason why most of the health insurance plans come out with the facility of lifelong renewability. Just to keep your policy active, you have to renew the same at end of every policy year.</p>
        </mat-expansion-panel>

        <mat-expansion-panel class="mb-3">
            <mat-expansion-panel-header>
                <mat-panel-title>
                    DAY CARE PROCEDURES
                </mat-panel-title>
            </mat-expansion-panel-header>
            As mentioned earlier coverage for  procedures which can be completed  in less than 24 hours and discharge of the patient can be on the same day are called Day Care Proceedures. These procedures might be done under local or general anesthesia and there is no need for the patient to remain admitted in the hospital. It is essential that for the claim to be approved it should be listed in the approved list of day care proceedures.
        </mat-expansion-panel>

        <mat-expansion-panel class="mb-3">
            <mat-expansion-panel-header>
                <mat-panel-title>
                    SPECIAL PLANS AND SPECIAL POLICIES FOR ALL CITIZENS
                </mat-panel-title>
            </mat-expansion-panel-header>
            <p>It is never too late to opt for a health insurance policy. Health insurance plans are designed for medical treatments to all individuals. The increasing medical costs have facilitated top up policies which come to the rescue of the policy holder when a sudden huge medical expenses come up.</p>
            <p>Policies are now available in the market for Cancer Care, Diabetes, Cardiac Care, Critical illness and Senior Citizens also. The terms and conditions of the respective insurer applies but the variety and choice of products in health care insurance is abundant.  Some of the critical illness care policies even have the facility of lump sum reimbursement.</p>
        </mat-expansion-panel>

        <mat-expansion-panel class="mb-3">
            <mat-expansion-panel-header>
                <mat-panel-title>
                    FREE MEDICAL CHECKUPS
                </mat-panel-title>
            </mat-expansion-panel-header>
            <p>Reimbursement of the cost of medical check-up at the end of a block of every three / four renewal years, if there are no claims reported during the block. To motivate all policyholders towards a healthy life, At times some insurers offer a free medical check-up facility. </p>
            <p>Reimbursement of Ambulance charges is an additional benefit offered by most of the health insurance policies. Some policies in the market offer the facility of Air Ambulance too.</p>
        </mat-expansion-panel>

        <mat-expansion-panel class="mb-3">
            <mat-expansion-panel-header>
                <mat-panel-title>
                    RESTORATION OF SUM INSURED
                </mat-panel-title>
            </mat-expansion-panel-header>
            <p>This is an add-on option that comes with certain health insurance plans. In case the sum insured is exhausted during a policy year, auto restoration comes in and insurer will reinstate the sum insured. </p>
            <p>Some policies have an option to increase the coverage during the policy term. </p>
            <p>Normally the health insurance policies come with a room rent cap or at times with a co – pay option. The market has policies which has no cap on room rent and co-pay. The advantage of not having a room rent cap is that it facilitates the insured to utilize the available room and it gives the advantage of no proportionate deductions. It means, if there is a room rent cap in a policy and the insured opts for a room for which the insured pays a rent higher than the eligible room rent the claim amount is also reduced proportionately.</p>
        </mat-expansion-panel>

        <mat-expansion-panel class="mb-3">
            <mat-expansion-panel-header>
                <mat-panel-title>
                    VIZZA BENEFITS
                </mat-panel-title>
            </mat-expansion-panel-header>
            <ol><li>We analyze your requirement based on your age, dependents, fund allocation and IT benefit.</li>
                <li>We get quotes for the products available in the market.</li>
                <li>We analyse the quotes and present you the three best suitable products and the three best quotes. </li>
                <li>We suggest the options based on coverage and pricing.</li>
                <li>We place the policy with the insurer of your choice.</li>
                <li>We ensure that the policy issued is as per the terms and conditions proposed.</li>
                <li>We recheck with you prior to the completion of the free look period.</li>
                <li>A senior official guides you at the time of a claim. Our end to end quality support is assured at all times.</li>
                <li>We ensure that the claim is settled according to the TAT.</li>
                <li>We follow the same procedure at the time of renewal.</li>
                <li>We also tailor make policies as per the corporate requirements.</li>
                <li>The entire online process is seamless. </li>
                <li>We update you with the latest developments in the market.</li>
                <li>We are your one stop contact for all your health insurance needs.</li></ol>
        </mat-expansion-panel>


    </mat-accordion>`,
})
export class HealthInsurer {

    constructor(
        public dialogRef: MatDialogRef<HealthInsurer>,
        @Inject(MAT_DIALOG_DATA) public data: any) {}

        onNoClick(): void {
        this.dialogRef.close();
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

