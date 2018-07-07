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
    fatherBTn: boolean;
    motherBtn: boolean;
    fatherInLawBTn: boolean;
    motherInLawBtn: boolean;
    sonBtn: boolean;
    daugtherBtn: boolean;
    closeIcon: boolean;

    index: any;
    member: any;
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
    breadcrumbHome: boolean;

    addSonItems: any;
    count: any;
    sonBTn: any;
    daughterBTn: any;


    constructor(public appSettings: AppSettings, public config: ConfigurationService, public fb: FormBuilder, public dialog: MatDialog, public common: CommonService, public toast: ToastrService) {
        this.settings = this.appSettings.settings;
        console.log(this.settings);
        this.webhost = this.config.getimgUrl();
        sessionStorage.sideMenu = true;
        this.settings.HomeSidenavUserBlock = true;
        this.tabIndex = 0;
        this.pageSettings = 0;
        this.sumerror = false;
        this.pinerror = false;
        this.setArray = [];
        this.memberLength = [];
        this.finalData = [];

        this.setArray = [{
                name: 'Self',
                age: '',
                disabled: false,
                checked: false,
                auto: true,
                error: ''
            },
            {
                name: 'Spouse',
                age: '',
                disabled: false,
                checked: false,
                auto: true,
                error: ''
            },
            {
                name: 'Son',
                age: '',
                disabled: false,
                checked: false,
                auto: true,
                error: ''
            },
            {
                name: 'Daughter',
                age: '',
                disabled: false,
                checked: false,
                auto: true,
                error: ''
            }
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
        this.sonBtn = true;
        this.daugtherBtn = true;
        this.closeIcon = true;
        this.sonStatus = 'false';
        this.daugtherStatus = 'false';
        this.sumInsuredAmonut();
        // this.sessionData();
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
    sessionData() {
        if (sessionStorage.setFamilyDetails != undefined && sessionStorage.setFamilyDetails != '') {
            console.log(JSON.parse(sessionStorage.setFamilyDetails), 'JSON.pars');
            this.setArray = JSON.parse(sessionStorage.setFamilyDetails);
            console.log(this.setArray, 'tyyy');
        }
        if (sessionStorage.setInsuredAmount != undefined && sessionStorage.setInsuredAmount != '') {
            this.selectedAmount = sessionStorage.setInsuredAmount;
        }
        if (sessionStorage.setPincode != undefined && sessionStorage.setPincode != '') {
            this.pincoce = sessionStorage.setPincode;
        }
        if (sessionStorage.setPage != undefined && sessionStorage.setPage != '') {
            this.pageSettings = sessionStorage.setPage;
        }
        if( sessionStorage.setPage != 1) {
            this.settings.HomeSidenavUserBlock = false;
            this.settings.sidenavIsOpened = false;
            this.settings.sidenavIsPinned = false;

        }
        if (sessionStorage.sonBTn != '') {
            this.sonBTn = sessionStorage.sonBTn;
        } else if (sessionStorage.daughterBTn != '') {
            this.daughterBTn = sessionStorage.daughterBTn;
        } else if (sessionStorage.fatherBTn != '') {
            this.fatherBTn = sessionStorage.fatherBTn;
        } else if (sessionStorage.motherBtn != '') {
            this.motherBtn = sessionStorage.motherBtn;
        } else if (sessionStorage.fatherInLawBTn != '') {
            this.fatherInLawBTn = sessionStorage.fatherInLawBTn;
        } else if (sessionStorage.motherInLawBtn != '') {
            this.motherInLawBtn = sessionStorage.motherInLawBtn;
        }

        if (sessionStorage.policyLists != undefined && sessionStorage.policyLists != '') {
            console.log(this.setArray, 'session');
            this.insuranceLists = JSON.parse(sessionStorage.policyLists).value;
            let index = JSON.parse(sessionStorage.policyLists).index;
            this.setArray1 = this.insuranceLists[index].family_members;
            for (let i = 0; i < this.setArray1.length; i++) {
                this.setArray1[i].name = this.setArray1[i].type;
                this.setArray1[i].age = this.setArray1[i].age;
                this.setArray1[i].checked = true;
                this.setArray1[i].auto = true;
                if (this.setArray1[i].type == 'Son' || this.setArray1[i].type == 'Daughter') {
                    // this.setArray1[i].auto = false;
                }
            }
            console.log(this.setArray1, 'this.setArray1');
            this.tabIndex = index;
        }

    }

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



    ckeckedUser(value, index, name) {
        if (value) {
            console.log(name, 'value');
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

            ////
            console.log(this.setArray, 'this.setArray');

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
            console.log(index, 'index');
            if (index > 3 ) {
                this.setArray.splice(index, 1);
            }
            console.log(this.setArray, 'this.setArray22');
        }
        sessionStorage.setFamilyDetails = JSON.stringify(this.setArray);
    }
    changeAmount() {
        sessionStorage.setInsuredAmount = this.selectedAmount;
    }
    selectPincode() {
        sessionStorage.setPincode = this.pincoce;
    }
    addUser(value, index) {
        if (value == 'Son' || value == 'Daughter') {
            this.count++;
            this.addSonItems = this.count;
        }
        if (this.addSonItems <= 2) {
            if (this.setArray[index].checked) {
                // this.setArray.splice(2, 0, {name: value, age: '', disabled: false, checked: true, auto: true, error: ''});
                this.setArray.push({name: value, age: '', disabled: false, checked: true, auto: true, error: ''});

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
        console.log(this.setArray, 'this.setArray');
        sessionStorage.setFamilyDetails = JSON.stringify(this.setArray);

    }
    typeAge() {
        sessionStorage.setFamilyDetails = JSON.stringify(this.setArray);
    }
    addOthers(value) {
        this.setArray.push({name: value, age: '', disabled: false, checked: true, auto: true, error: ''});
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


    insureList() {

        console.log(this.pincoce, 'pincoce');
        console.log(this.selectedAmount, 'selectedAmount');
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


    onSelectedIndexChange(index) {
        console.log(this.setArray, 'this.setArray');
        console.log(this.insuranceLists, 'yt');
        console.log(this.insuranceLists[index]);
       // this.memberLength = [];

        // this.setArray = this.insuranceLists[index].family_members;
        // for (let i = 0; i < this.setArray.length; i++) {
        //     this.setArray[i].name = this.setArray[i].type;
        //     this.setArray[i].age = this.setArray[i].age;
        //     this.setArray[i].checked = true;
        //     if (this.setArray[i].name == 'Son' || this.setArray[i].name == 'Daughter') {
        //         this.setArray[i].auto = false;
        //     }
        // }

        this.settings.loadingSpinner = true;
        this.updatePolicy(this.insuranceLists[index], index);
    }

    addCompare(value, pi, index, equiryId, name) {
        console.log(equiryId, 'equiryId')
        this.equiryId = equiryId;
        this.goupName = name;
        this.insuranceLists[pi].product_lists[index].compare = true;
        this.compareArray.push(value);
        console.log(this.compareArray, 'value');
    }
    removeCompare(index) {
        console.log(index);
        for (let i = 0; i < this.insuranceLists.length; i++) {
            for (let j = 0; j < this.insuranceLists[i].product_lists.length; j++) {
                for (let k = 0; k < this.compareArray.length; k++) {
                    if (this.insuranceLists[i].product_lists[j].product_id == this.compareArray[k].product_id) {
                        this.insuranceLists[i].product_lists[index].compare = false;
                        this.insuranceLists[i].product_lists[j].shortlist = false;
                    }
                }
            }
        }
        this.compareArray.splice(index, 1);

    }
    addShortlist(value, pi, index) {
        this.scount = index + 1;
        console.log(index + 1, 'index - 1');
        this.insuranceLists[pi].product_lists[index].shortlist = true;
        this.insuranceLists[pi].product_lists[index].removebtn = true;
        for (let i = 0; i < this.insuranceLists.length; i++) {
            for (let j = 0; j < this.insuranceLists[i].product_lists.length; j++) {
                this.insuranceLists[pi].product_lists[j].shortlist = true;
            }
        }
        console.log(this.insuranceLists, 'this.scount');



    }
    removeShortlist(value, pi, index) {
        this.scount = '';
        for (let i = 0; i < this.insuranceLists.length; i++) {
            for (let j = 0; j < this.insuranceLists[i].product_lists.length; j++) {
                this.insuranceLists[pi].product_lists[j].removebtn = false;
                this.insuranceLists[pi].product_lists[j].shortlist = false;

            }
        }
    }

    updatePolicy(value, index) {
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
            'postalcode': value.postal_code,
            'sum_insured': this.selectedAmount,
            'family_details': this.finalData,
            'family_group_name': value.name,
            'enquiry_id': value.enquiry_id
        };
        console.log(data, 'data222');
        this.common.updatePolicyQuotation(data).subscribe(
            (successData) => {
                this.PolicyQuotationSuccess(successData, index);
            },
            (error) => {
                this.PolicyQuotationFailure(error);
            }
        );
    }
    public PolicyQuotationSuccess(successData, index) {
        this.settings.loadingSpinner = false;

        if (successData.IsSuccess) {
            console.log(index, 'indexindex');
            this.firstPage = false;
            this.secondPage = true;
            this.insuranceLists = successData.ResponseObject;
            sessionStorage.setPage = (this.insuranceLists[index].enquiry_id == '' ) ? 1 : 2;
            if( sessionStorage.setPage != 1) {
                this.settings.HomeSidenavUserBlock = false;
                this.settings.sidenavIsOpened = false;
                this.settings.sidenavIsPinned = false;

            }

            if (this.insuranceLists[index].enquiry_id != '') {
                sessionStorage.sideMenu = false;
            }
            console.log(this.insuranceLists, 'successsssssssssssssssssssssss');

            for (let i = 0; i < this.insuranceLists.length; i++) {
                for (let j = 0; j < this.insuranceLists[i].product_lists.length; j++) {
                    this.insuranceLists[i].product_lists[j].compare = false;
                    this.insuranceLists[i].product_lists[j].shortlist = false;
                }
            }
            this.setArray1 = this.insuranceLists[index].family_members;
            console.log(this.setArray1, 'this.setArray');
            for (let i = 0; i < this.setArray1.length; i++) {
                this.setArray1[i].name = this.setArray1[i].type;
                this.setArray1[i].age = this.setArray1[i].age;
                this.setArray1[i].checked = true;
                this.setArray1[i].auto = true;
                if (this.setArray1[i].name == 'Son' || this.setArray1[i].name == 'Daughter') {
                    // this.setArray1[i].auto = false;
                }
            }

            sessionStorage.policyLists = JSON.stringify({index: index, value: successData.ResponseObject});
        } else {

            this.toast.error(successData.ErrorObject, 'Failed');
        }
    }

    public PolicyQuotationFailure(error) {
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
            'product_lists': this.productLists

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
