import {Component, OnInit, ViewChild, Inject, HostListener} from '@angular/core';
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
import {HealthService} from '../../shared/services/health.service';
import {ClearSessionService} from '../../shared/services/clear-session.service';
import {ActivatedRoute} from '@angular/router';
import {MetaService} from '../../shared/services/meta.service';
import {Meta, Title} from '@angular/platform-browser';
import { WINDOW } from '@ng-toolkit/universal';


@Component({
    selector: 'app-health-insurance',
    templateUrl: './health-insurance.component.html',
    styleUrls: ['./health-insurance.component.scss']
})
export class HealthInsuranceComponent implements OnInit {

    public form: FormGroup;
    public settings: Settings;
    setArray: any;
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
    filterCompany: any;
    changeSuninsuredAmount: any;
    shortlistArray: any;
    updateFlag: boolean;
    ageUpdateFlag: boolean;
    nonEditable: boolean;
    sbtn: boolean;
    hideChild : any;
    checkAge : any;
    metaTitle : any;


    allCompanyList : any;
    groupDetails : any;
    groupList : any;
    allProductLists : any;
    productListArray : any;
    allPolicyDetails : any;
    setAllProductLists : any;
    checkAllStatus : any;
    getSumInsureId : any;
    sumInsuredAmount : any;
    healthProceed : any;
    metaHealth : any;
    metaKeyword: any;
    metaDescription: any;

    private keyUp = new Subject<string>();
    constructor(@Inject(WINDOW) private window: Window, public route: ActivatedRoute,public appSettings: AppSettings, public router: Router, public config: ConfigurationService, public fb: FormBuilder, public dialog: MatDialog, public common: HealthService, public toast: ToastrService, public auth: AuthService, public session: ClearSessionService, public meta: MetaService, public metaTag: Meta, private titleService: Title) {
        this.settings = this.appSettings.settings;
        this.webhost = this.config.getimgUrl();
        if(window.innerWidth < 787){
            this.settings.HomeSidenavUserBlock = false;
            this.settings.sidenavIsOpened = false;
            this.settings.sidenavIsPinned = false;
        }else{
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
        this.healthProceed = true;
        this.sbtn = false;
        this.setArray = [];
        this.memberLength = [];
        this.finalData = [];
        this.indexList = [];
        this.hideChild = [];
        this.setArray = [
            {name: 'Self', age: '', disabled: false, checked: false, required: true, auto: false, error: ''},
            {name: 'Spouse', age: '', disabled: false, checked: false, required: false, auto: false, error: ''},
            {name: 'Son', age: '', disabled: false, checked: false, required: false, auto: false, error: ''},
            {name: 'Daughter', age: '', disabled: false, checked: false, required: false, auto: false, error: ''}
        ];
        this.compareArray = [];
        this.sumInsuredAmountLists = 0;
        this.route.data.forEach((data) => {
            if(data.companyDetails.IsSuccess) {
                this.allCompanyList = data.companyDetails.ResponseObject;
                let all = ['All'];
                for (let i = 0; i < this.allCompanyList.length; i++) {
                    all.push(this.allCompanyList[i].company_name);
                }
                this.filterCompany = all;
            }
        });
    }

    ngOnInit() {
        this.checkAllStatus = true;
        this.session.clearSessionData();
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
        this.metaList();
    }

    public metaList() {
        const data = {
            'platform': 'web',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'component_name': 'Health Insurance'
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
        this.metaHealth = successData.ResponseObject[0];
        console.log(this.metaHealth,'metaHealth');
        this.metaTitle = this.metaHealth.title;
        this.metaKeyword = this.metaHealth.keyword;
        this.metaDescription = this.metaHealth.descrition;
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
            for (let i = 0; i < this.setArray.length; i++) {
                this.setArray[i].auto = false;
                if (this.setArray[i].checked && this.setArray[i].age != '') {
                    this.setArray[i].error = '';
                }
            }
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
        if (sessionStorage.allCompanyList != undefined && sessionStorage.allCompanyList != '') {
            this.allCompanyList = JSON.parse(sessionStorage.allCompanyList);
        }
        if (sessionStorage.changedTabIndex != undefined && sessionStorage.changedTabIndex != '') {
            this.changedTabIndex = sessionStorage.changedTabIndex;
        }

        // second page
        if (sessionStorage.groupDetails != undefined && sessionStorage.groupDetails != '') {
            this.groupDetails = JSON.parse(sessionStorage.groupDetails);
            this.groupList = this.groupDetails.family_groups;

        }
        if (sessionStorage.allPolicyDetails != undefined && sessionStorage.allPolicyDetails != '') {
            this.allPolicyDetails = JSON.parse(sessionStorage.allPolicyDetails);
        }
        if (sessionStorage.setAllProductLists != undefined && sessionStorage.setAllProductLists != '') {
            this.setAllProductLists = JSON.parse(sessionStorage.setAllProductLists);
            this.sumInsuredAmount = this.setAllProductLists[0].suminsured_amount;
            this.setAllProductLists.sort((a,b) => a.premium_amount - b.premium_amount);

        }
        if (sessionStorage.changedTabDetails != undefined && sessionStorage.changedTabDetails != '') {
            this.changedTabDetails = JSON.parse(sessionStorage.changedTabDetails);
            this.currentGroupName = JSON.parse(sessionStorage.changedTabDetails).name;
            this.getSumInsureId = this.changedTabDetails.group_suminsured_id;
        }
        if (sessionStorage.changeSuninsuredAmount != undefined && sessionStorage.changeSuninsuredAmount != '') {
            this.changeSuninsuredAmount = sessionStorage.changeSuninsuredAmount;
        }

        if (sessionStorage.policyLists != undefined && sessionStorage.policyLists != '') {
            this.allProductLists = JSON.parse(sessionStorage.policyLists).value;

            // let lists = JSON.parse(sessionStorage.policyLists).value;
            // if(lists.length > 0) {
            //     this.allProductLists = JSON.parse(sessionStorage.policyLists).value;
            // } else {
            //     this.productListArray = [];
            //     this.allProductLists = [];
            //     if(this.groupDetails.family_groups[sessionStorage.changedTabIndex].status == 0) {
            //         for(let i = 0; i < this.allCompanyList.length; i++) {
            //             this.updateTabPolicy(this.allCompanyList[i].company_id, this.groupDetails.family_groups[sessionStorage.changedTabIndex].name, this.groupDetails, sessionStorage.changedTabIndex);
            //         }
            //     }
            // }


            // this.insuranceLists = JSON.parse(sessionStorage.policyLists).value;
            // let index = sessionStorage.changedTabIndex;
            // for (let i = 0; i < this.setArray.length; i++) {
            //     this.setArray[i].auto = false;
            // }
            // this.getArray = this.insuranceLists[index].family_members;
            // for (let i = 0; i < this.setArray.length; i++) {
            //     for (let j = 0; j < this.getArray.length; j++) {
            //         if (this.setArray[i].name == this.getArray[j].type) {
            //             this.setArray[i].auto = true;
            //         }
            //         if (this.setArray[i].checked && this.setArray[i].age != '') {
            //             this.setArray[i].error = '';
            //         }
            //
            //     }
            // }
            // this.tabIndex = index;
            // this.filterCompany = this.allCompanyList;
        }

        if (sessionStorage.shortListCount != undefined && sessionStorage.shortListCount != '') {
            this.shortListCount = sessionStorage.shortListCount;
        }
        if (sessionStorage.filterCompany != undefined && sessionStorage.filterCompany != '') {
            this.filterCompany = JSON.parse(sessionStorage.filterCompany);
            if(this.filterCompany.includes('All')) {
                this.checkAllStatus = true;
            } else {
                this.checkAllStatus = false;
            }
        }


    }
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
                let size= '';
                if (this.setArray.length > 4) {
                    if (this.setArray[index].name == 'Son' && (this.setArray[4].checked && this.setArray[4].name == 'Son')) {
                        this.setArray[3].disabled = true;
                    } else if (this.setArray[index].name == 'Daughter' && (this.setArray[4].checked && this.setArray[4].name == 'Son')) {
                        this.setArray[2].disabled = true;
                    } else if (this.setArray[index].name == 'Daughter' && (this.setArray[4].checked && this.setArray[4].name == 'Daughter')) {
                        this.setArray[2].disabled = true;
                    } else if (this.setArray[index].name == 'Son' && (this.setArray[4].checked && this.setArray[4].name == 'Daughter')) {
                        this.setArray[3].disabled = true;
                    }
                }
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
    reset() {
        this.selectedAmount = '';
        this.pincoce = '';
        for (let i = 0; i < this.setArray.length; i++) {
            this.setArray[i].age = '';
            this.setArray[i].checked = '';
            this.setArray[0].required = true;
        }

    }

    // new policy lists
    getPolicyQuotationList(type) {
        sessionStorage.proposalIdStar='';
        console.log(type,'health')
        this.healthProceed = false;
        this.selectedAmount = ''
        if (this.pincoce == '' || this.pincoce == undefined || this.pincoce.length < 6) {
            this.pinerror = true;
        } else {
            this.pinerror = false;
        }
        this.finalData = [];
        let memberValid = false;

        for (let i = 0; i < this.setArray.length; i++) {
            if (this.setArray[i].checked) {
                if (this.setArray[i].age == '') {
                    this.setArray[i].error = 'Required';
                    memberValid = true;
                    break;
                } else {
                    this.setArray[i].error = '';
                    memberValid = false;
                    this.finalData.push({type: this.setArray[i].name, age: this.setArray[i].age });
                }
            }
        }

        if (this.pincoce != '' && this.pincoce != undefined) {
            if (!memberValid) {
                if (this.finalData != '') {
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
                    this.common.getFamilyLists(data).subscribe(
                        (successData) => {
                            this.getFamilyListsSuccess(successData, 0, type);
                            this.topScroll();
                        },
                        (error) => {
                            this.getFamilyListsFailure(error);
                        }
                    );

                } else {
                    this.healthProceed = true;
                }
            } else {
                this.healthProceed = true;
            }
        } else {
            this.healthProceed = true;
        }
    }

    topScroll() {
        document.getElementById('main-content').scrollTop = 0;
    }

    public getFamilyListsSuccess(successData, index, type) {
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {
            this.groupDetails = successData.ResponseObject;
            sessionStorage.changedTabIndex = 0;
            for(let i = 0; i < this.groupDetails.family_groups.length; i++) {
                this.groupDetails.family_groups[i].status = 0;
            }
            this.groupList = this.groupDetails.family_groups;
            sessionStorage.groupDetails = JSON.stringify(this.groupDetails);
            if(this.groupList.length > 1) {
                if(type == 'mobile'){
                    let dialogRef = this.dialog.open(GrouppopupComponent, {
                        width: '700px',height: '400px', data: {comparedata: successData.ResponseObject.family_groups}});
                    dialogRef.disableClose = true;
                    dialogRef.afterClosed().subscribe(result => {
                    });
                }else{
                    let dialogRef = this.dialog.open(GrouppopupComponent, {
                        width: '1500px', data: {comparedata: successData.ResponseObject.family_groups}});
                    dialogRef.disableClose = true;
                    dialogRef.afterClosed().subscribe(result => {
                    });
                }

            }
            this.productListArray = [];
            this.allProductLists = [];
            // for(let i = 0; i < this.allCompanyList.length; i++) {
            //     this.policyLists(this.allCompanyList[i].company_id);
            // }
            this.policyLists(this.allCompanyList);

        } else {
            this.healthProceed = true;
            this.toast.error(successData.ErrorObject);
        }
    }
    public getFamilyListsFailure(error) {
        this.settings.loadingSpinner = false;
    }

    policyLists(company) {
        const data = {
            "platform": "web",
            "postalcode": this.pincoce ? this.pincoce : '',
            "sum_insured": this.groupDetails.group_suminsured_id,
            "family_group_name": this.groupDetails.family_groups[0].name,
            "enquiry_id": this.groupDetails.enquiry_id,
            "created_by": "0",
            "company_id": '',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0
        }
        this.settings.loadingSpinner = true;
        this.common.getPolicyListsNew(company, data).subscribe(
            (successData) => {
                this.getPolicyListsSuccess(successData);
            },
            (error) => {
                this.getPolicyListsFailure(error);
            }
        );
    }
    public getPolicyListsSuccess(successData){
        this.settings.loadingSpinner = false;
        console.log(successData, 'successDatasuccessDatasuccessDatasuccessData');
        this.firstPage = false;
        this.secondPage = true;
        this.getSumInsureId = successData[0].ResponseObject[0].group_suminsured_id;
        if (successData[0].ResponseObject[0].enquiry_id != '') {
            sessionStorage.sideMenu = true;
        }
        sessionStorage.setPage = (successData[0].ResponseObject[0].enquiry_id == '') ? 1 : 2;
        if (sessionStorage.setPage != 1) {
            this.settings.HomeSidenavUserBlock = false;
            this.settings.sidenavIsOpened = false;
            this.settings.sidenavIsPinned = false;
        }
        for(let i = 0; i < successData.length; i++) {
            if (successData[i].IsSuccess) {
                let policylists = successData[i].ResponseObject;
                console.log(policylists,'sswwwlll');
                this.productListArray.push(policylists[0].product_lists);
                this.allPolicyDetails = policylists;
                this.changedTabDetails = policylists[0];
                this.allPolicyDetails = policylists;
                sessionStorage.allPolicyDetails = JSON.stringify(policylists);
                sessionStorage.changedTabDetails = JSON.stringify(policylists[0]);
            }
            this.changeSuninsuredAmount = "4";
            this.allProductLists = [].concat.apply([], this.productListArray);

            console.log(typeof this.allProductLists[0].premium_amount, 'oooooo');
            // console.log(typeof this.allProductLists[1].premium_amount, 'oooooo');

        }
        for (let i = 0; i < this.allProductLists.length; i++) {
            this.allProductLists[i].compare = false;
            this.allProductLists[i].shortlist = false;
            this.allProductLists[i].premium_amount_format = this.numberWithCommas(this.allProductLists[i].premium_amount);
            this.allProductLists[i].suminsured_amount_format = this.numberWithCommas(this.allProductLists[i].suminsured_amount);
            // allll.sort();
            // console.log(allll, 'allll');

        }
        this.allProductLists.sort((a,b) => a.premium_amount - b.premium_amount);
        sessionStorage.changeSuninsuredAmount = this.changeSuninsuredAmount;
        sessionStorage.setAllProductLists = JSON.stringify(this.allProductLists);
        this.setAllProductLists = this.allProductLists;
        this.setAllProductLists.sort((a,b) => a.premium_amount - b.premium_amount);

        sessionStorage.policyLists = JSON.stringify({index: 0, value: this.allProductLists});
        if(this.allProductLists.length > 1) {
            this.sumInsuredAmount = this.allProductLists[0].suminsured_amount;
        }

        // old

        // if (successData.IsSuccess) {
        //         this.firstPage = false;
        //         this.secondPage = true;
        //         let policylists = successData.ResponseObject;
        //         this.getSumInsureId = policylists[0].group_suminsured_id;
        //         if (policylists[0].enquiry_id != '') {
        //             sessionStorage.sideMenu = true;
        //         }
        //         sessionStorage.setPage = (policylists[0].enquiry_id == '' ) ? 1 : 2;
        //         if (sessionStorage.setPage != 1) {
        //             this.settings.HomeSidenavUserBlock = false;
        //             this.settings.sidenavIsOpened = false;
        //             this.settings.sidenavIsPinned = false;
        //         }
        //         this.changeSuninsuredAmount = "4";
        //         this.productListArray.push(policylists[0].product_lists);
        //         this.allProductLists = [].concat.apply([], this.productListArray);
        //         this.allPolicyDetails = policylists;
        //
        //         for (let i = 0; i < this.allProductLists.length; i++) {
        //             this.allProductLists[i].compare = false;
        //             this.allProductLists[i].shortlist = false;
        //             this.allProductLists[i].premium_amount_format = this.numberWithCommas(this.allProductLists[i].premium_amount);
        //             this.allProductLists[i].suminsured_amount_format = this.numberWithCommas(this.allProductLists[i].suminsured_amount);
        //         }
        //
        //         this.changedTabDetails = policylists[0];
        //          sessionStorage.changeSuninsuredAmount = this.changeSuninsuredAmount;
        //          sessionStorage.allPolicyDetails = JSON.stringify(policylists);
        //          sessionStorage.changedTabDetails = JSON.stringify(policylists[0]);
        //          sessionStorage.setAllProductLists = JSON.stringify(this.allProductLists);
        //          sessionStorage.policyLists = JSON.stringify({index: 0, value: this.allProductLists});
        //          if(this.allProductLists.length > 1) {
        //              this.sumInsuredAmount = this.allProductLists[0].suminsured_amount;
        //          }
        //
        //     } else {
        //         this.toast.error(successData.ErrorObject);
        //     }
    }
    public getPolicyListsFailure(error){
        this.settings.loadingSpinner = false;
    }
    public  numberWithCommas(x) {
        return x.toString().substring(0,x.toString().split('.')[0].length-3).replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + x.toString().substring(x.toString().split('.')[0].length-3);
    }
    // end
    // second page
    // this function will get the sum insured amounts
    public sumInsuredAmonut(): void {
        this.settings.loadingSpinner = true;
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
        this.settings.loadingSpinner = false;
        console.log(successData.ResponseObject, 'kilo1234kg')
        if (successData.IsSuccess) {
            this.sumInsuredAmountLists = successData.ResponseObject;
            console.log(this.sumInsuredAmountLists, 'hello1234')
        }
    }
    public getSumInsuredAmountFailure(error) {
    }
    onSelectedIndexChange(index) {
        sessionStorage.changedTabIndex = index;
        this.productListArray = [];
        this.allProductLists = [];
        if(this.groupDetails.family_groups[index].status == 0) {
            // for(let i = 0; i < this.allCompanyList.length; i++) {
            //     this.updateTabPolicy(this.allCompanyList[i].company_id, this.groupDetails.family_groups[index].name, this.groupDetails, index);
            // }
            this.updateTabPolicy(this.allCompanyList, this.groupDetails.family_groups[index].name, this.groupDetails, index);

        }
    }
    updateTabPolicy(company, gName, value, index) {
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
            'postalcode': this.pincoce ? this.pincoce : '',
            'sum_insured': '',
            'family_details': this.finalData,
            'family_group_name': gName,
            'enquiry_id': value.enquiry_id,
            'created_by': '0',
            "company_id": '',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0
        };
        this.settings.loadingSpinner = true;
        this.common.getPolicyListsNew(company,data).subscribe(
            (successData) => {
                this.updateTabPolicyQuotationSuccess(successData, index);
            },
            (error) => {
                this.updateTabPolicyQuotationFailure(error);
            }
        );
    }
    public updateTabPolicyQuotationSuccess(successData, index) {
        this.settings.loadingSpinner = false;
        for(let i = 0; i < successData.length; i++) {
            if (successData[i].IsSuccess) {
                let policylists = successData[i].ResponseObject;
                this.productListArray.push(policylists[0].product_lists);
                this.allPolicyDetails = policylists;
                this.changedTabDetails = policylists[0];
                this.allPolicyDetails = policylists;
                sessionStorage.allPolicyDetails = JSON.stringify(policylists);
                sessionStorage.changedTabDetails = JSON.stringify(policylists[0]);
            }
            this.allProductLists = [].concat.apply([], this.productListArray);
        }
        for (let i = 0; i < this.allProductLists.length; i++) {
            this.allProductLists[i].compare = false;
            this.allProductLists[i].shortlist = false;
            this.allProductLists[i].premium_amount_format = this.numberWithCommas(this.allProductLists[i].premium_amount);
            this.allProductLists[i].suminsured_amount_format = this.numberWithCommas(this.allProductLists[i].suminsured_amount);
        }

        this.getSumInsureId = successData[0].ResponseObject[0].group_suminsured_id;
        sessionStorage.setAllProductLists = JSON.stringify(this.allProductLists);
        this.setAllProductLists = this.allProductLists;
        this.setAllProductLists.sort((a,b) => a.premium_amount - b.premium_amount);

        sessionStorage.policyLists = JSON.stringify({index: 0, value: this.allProductLists});
        if(this.allProductLists.length > 1) {
            this.sumInsuredAmount = this.allProductLists[0].suminsured_amount;
        }


        // old

        // if (successData.IsSuccess) {
        //     let policylists = successData.ResponseObject;
        //     console.log(policylists, 'policylists11');
        //     this.getSumInsureId = policylists[0].group_suminsured_id;
        //     for (let i = 0; i < policylists.length; i++) {
        //         for (let j = 0; j < policylists[i].product_lists.length; j++) {
        //             policylists[i].product_lists[j].compare = false;
        //             policylists[i].product_lists[j].shortlist = false;
        //             policylists[i].product_lists[j].premium_amount_format =   this.numberWithCommas(policylists[i].product_lists[j].premium_amount);
        //             policylists[i].product_lists[j].suminsured_amount_format =   this.numberWithCommas(policylists[i].product_lists[j].suminsured_amount);
        //         }
        //     }
        //     this.productListArray.push(policylists[0].product_lists);
        //     this.allProductLists = [].concat.apply([], this.productListArray);
        //     this.allPolicyDetails = policylists;
        //     sessionStorage.allPolicyDetails = JSON.stringify(policylists);
        //     sessionStorage.changedTabDetails = JSON.stringify(policylists[0]);
        //     sessionStorage.setAllProductLists = JSON.stringify(this.allProductLists);
        //     this.changedTabDetails = policylists[0];
        //     sessionStorage.policyLists = JSON.stringify({index: 0, value: this.allProductLists});
        //     if(this.allProductLists.length > 1) {
        //         this.sumInsuredAmount = this.allProductLists[0].suminsured_amount;
        //     }
        //
        // } else {
        //     this.toast.error(successData.ErrorObject, 'Failed');
        // }
    }
    public updateTabPolicyQuotationFailure(error) {
        this.settings.loadingSpinner = false;
    }

    addCompare(value,index) {

        value.index = index;
        console.log(value, 'value');

        // const data  = { index: index, product_id: value.product_id, product_name: value.product_name, premium_id: value.premium_id, premium_amount: value.premium_amount, scheme: value.scheme, suminsured_amount: value.suminsured_amount, suminsured_id: value.suminsured_id, company_logo: value.company_logo, company_name: value.company_name, key_features: value.key_features };
        this.allProductLists[index].compare = true;
        this.compareArray.push(value);
        if (this.compareArray.length >= 3) {
            for (let i = 0; i < this.allProductLists.length; i++) {
                this.allProductLists[i].compare = true;
            }
        }

    }

    removeCompare(index , pindex) {
        this.compareArray.splice(index, 1);
        let getCount;
        for (let i = 0; i < this.allProductLists.length; i++) {
            getCount = false;
            for (let j = 0; j < this.compareArray.length; j++) {
                if (this.compareArray[j].premium_id == this.allProductLists[i].premium_id) {
                    getCount = true;
                    this.allProductLists[i].compare = true;
                }
            }
            if (!getCount) {
                this.allProductLists[i].compare = false;
            }
        }
        console.log(this.compareArray, 'this.compareArray');

    }
    removeAllCompare(index) {
        for (let i = 0; i < this.allProductLists.length; i++) {
            this.allProductLists[i].compare = false;
        }
        this.compareArray = [];
    }
    compareList(value) {
        console.log(value,'valuevalue');
        this.productLists = [];
        let scheme = value[0].scheme;
        for (let i = 0; i < value.length; i++) {
            this.productLists.push({product_id: value[i].product_id, premium_amount: value[i].premium_amount, suminsured_amount: value[i].suminsured_amount, prod_suminsuredid: value[i].suminsured_id});
        }
        const data = {
            'platform': 'web',
            'scheme': scheme,
            'group_name': this.groupDetails.family_groups[0].name,
            'enquiry_id': this.groupDetails.enquiry_id,
            'product_lists': this.productLists,
            'created_by': 0,
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0

        };
        this.settings.loadingSpinner = true;
        this.common.addtoCompare(data).subscribe(
            (successData) => {
                this.compareSuccess(successData, value);
            },
            (error) => {
                this.compareFailure(error);
            }
        );
    }
    public compareSuccess(successData, values) {
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {
            values.forEach((data, index) => {
                successData.ResponseObject.productdetails[index].base_premium = data.base_premium;
                successData.ResponseObject.productdetails[index].childmsg = data.childmsg;
                successData.ResponseObject.productdetails[index].company_logo = data.company_logo;
                successData.ResponseObject.productdetails[index].company_name = data.company_name;
                successData.ResponseObject.productdetails[index].compare = data.compare;
                successData.ResponseObject.productdetails[index].max_family_age = data.max_family_age;
                successData.ResponseObject.productdetails[index].premium_amount = data.premium_amount;
                successData.ResponseObject.productdetails[index].premium_amount_format = data.premium_amount_format;
                successData.ResponseObject.productdetails[index].premium_id = data.premium_id;
                successData.ResponseObject.productdetails[index].premium_total = data.premium_total;
                successData.ResponseObject.productdetails[index].product_id = data.product_id;
                successData.ResponseObject.productdetails[index].product_name = data.product_name;
                successData.ResponseObject.productdetails[index].scheme = data.scheme;
                successData.ResponseObject.productdetails[index].service_tax = data.service_tax;
                successData.ResponseObject.productdetails[index].shortlist = data.shortlist;
                successData.ResponseObject.productdetails[index].shortlist_status = data.shortlist_status;
                successData.ResponseObject.productdetails[index].suminsured_amount = data.suminsured_amount;
                successData.ResponseObject.productdetails[index].suminsured_amount_format = data.suminsured_amount_format;
                successData.ResponseObject.productdetails[index].suminsured_id = data.suminsured_id;
                successData.ResponseObject.productdetails[index].tenure = data.tenure;
                successData.ResponseObject.productdetails[index].type_name = data.type_name;
            });

            console.log(successData.ResponseObject, 'successData.ResponseObject1');
            let dialogRef = this.dialog.open(ComparelistComponent, {
                width: '1500px', data: {comparedata: successData.ResponseObject, type: 'health'}});
            dialogRef.disableClose = true;
            dialogRef.afterClosed().subscribe(result => {
                if(result) {
                    console.log(result, 'result');
                    this.buyProduct(result);
                }

            });
        }
    }

    public compareFailure(error) {
        this.settings.loadingSpinner = false;
    }
    // view key features details
    viewKeyList(value) {
        let dialogRef = this.dialog.open(ViewdetailsComponent, {
            width: '1500px', data: {productId : value.product_id, productName: value.product_name, productLogo: value.company_logo, scheme: value.scheme}
        });
        dialogRef.disableClose = true;
        dialogRef.afterClosed().subscribe(result => {
        });

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
    selectedCompany(value) {
        console.log(value, 'this.value');
        console.log(this.filterCompany, 'this.filterCompany');
        console.log(this.setAllProductLists, 'this.setAllProductLists');
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
        // this.insuranceLists = [];
        let index = sessionStorage.changedTabIndex;
        if(this.filterCompany.includes('All')){
            this.checkAllStatus = true;
            this.allProductLists = this.setAllProductLists;
            let all = ['All'];
            for (let i = 0; i < this.allCompanyList.length; i++) {
                all.push(this.allCompanyList[i].company_name);
            }
            this.filterCompany = all;
        } else if(!this.filterCompany.includes('All') && this.filterCompany.length == this.allCompanyList.length){
            this.checkAllStatus = false;
            this.allProductLists = [];
            this.filterCompany = [];
        }  else if(!this.filterCompany.includes('All') && this.filterCompany.length > 0){
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

        }


        // if (this.filterCompany.length < 1) {
        //     console.log('innnn');
        //     this.insuranceLists[index].product_lists = this.insuranceLists[index].all_product_list;
        //    // this.insuranceLists[index].product_lists = [];
        // } else {
        //     this.insuranceLists[index].product_lists = cmpy;
        // }
        sessionStorage.filterCompany = JSON.stringify(this.filterCompany);
        sessionStorage.policyLists = JSON.stringify({index: index, value: this.allProductLists});

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
    updateSumInsured(){
        sessionStorage.changeSuninsuredAmount = this.changeSuninsuredAmount;
        this.productListArray = [];
        this.allProductLists = [];
        let getCompanyCount = [];
        for(let i = 0; i < this.allCompanyList.length; i++) {
            for(let j = 0; j < this.filterCompany.length; j++) {
                if(this.filterCompany[j] == this.allCompanyList[i].company_name) {
                    getCompanyCount.push({company_id : this.allCompanyList[i].company_id, company_name : this.allCompanyList[i].company_name});

                }
            }
        }
        // for(let i = 0; i < getCompanyCount.length; i++) {
        //     this.changeSuminsuredFunction(getCompanyCount[i]);
        // }
        this.changeSuminsuredFunction(getCompanyCount);

    }
    changeSuminsuredFunction(company) {
        for (let i = 0; i < this.setArray.length; i++) {
            this.setArray[i].auto = false;
        }
        const data = {
            'platform': 'web',
            'postalcode': this.pincoce ? this.pincoce : '',
            'sum_insured': this.changeSuninsuredAmount,
            'family_group_name': this.groupDetails.family_groups[sessionStorage.changedTabIndex].name,
            'enquiry_id': this.allPolicyDetails[0].enquiry_id,
            'created_by': '0',
            "company_id": '',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0
        };
        this.settings.loadingSpinner = true;
        this.changedTabIndex = sessionStorage.changedTabIndex;
        this.common.getPolicyListsNew(company,data).subscribe(
            (successData) => {
                this.changeAmountPolicyQuotationSuccess(successData, this.changedTabIndex);
            },
            (error) => {
                this.changeAmountPolicyQuotationFailure(error);
            }
        );
    }
    public changeAmountPolicyQuotationSuccess(successData, index) {
        console.log(successData, 'successDatasuccessData22');
        this.settings.loadingSpinner = false;
        for(let i = 0; i < successData.length; i++) {
            if (successData[i].IsSuccess) {
                let policylists = successData[i].ResponseObject;
                this.productListArray.push(policylists[0].product_lists);
                this.allPolicyDetails = policylists;
                this.changedTabDetails = policylists[0];
                this.allPolicyDetails = policylists;

                sessionStorage.allPolicyDetails = JSON.stringify(policylists);
                sessionStorage.changedTabDetails = JSON.stringify(policylists[0]);
            }
            this.allProductLists = [].concat.apply([], this.productListArray);
        }
        for (let i = 0; i < this.allProductLists.length; i++) {
            this.allProductLists[i].compare = false;
            this.allProductLists[i].shortlist = false;
            this.allProductLists[i].premium_amount_format = this.numberWithCommas(this.allProductLists[i].premium_amount);
            console.log(this.allProductLists[i].premium_amount, 'premium123');
            console.log(this.allProductLists[i].premium_amount_format, 'premium123');

            this.allProductLists[i].suminsured_amount_format = this.numberWithCommas(this.allProductLists[i].suminsured_amount);
        }
        this.allProductLists.sort((a,b) => a.premium_amount - b.premium_amount);
        this.getSumInsureId = successData[0].ResponseObject[0].group_suminsured_id;
        sessionStorage.setAllProductLists = JSON.stringify(this.allProductLists);
        sessionStorage.policyLists = JSON.stringify({index: 0, value: this.allProductLists});
        if(this.allProductLists.length > 1) {
            this.sumInsuredAmount = this.allProductLists[0].suminsured_amount;
        }


        // old

        // if (successData.IsSuccess) {
        //     let result = successData.ResponseObject;
        //     let found = true;
        //     for (let i = 0; i < result.length; i++) {
        //         if (typeof result[i].product_lists != "undefined" && result[i].product_lists != null && result[i].product_lists.length != null && result[i].product_lists.length > 0) {
        //             found = false;
        //         }
        //     }
        //     let policylists = successData.ResponseObject;
        //     this.getSumInsureId = policylists[0].group_suminsured_id;
        //     for (let i = 0; i < policylists.length; i++) {
        //             for (let j = 0; j < policylists[i].product_lists.length; j++) {
        //                 policylists[i].product_lists[j].compare = false;
        //                 policylists[i].product_lists[j].shortlist = false;
        //                 policylists[i].product_lists[j].premium_amount_format =   this.numberWithCommas(policylists[i].product_lists[j].premium_amount);
        //                 policylists[i].product_lists[j].suminsured_amount_format =   this.numberWithCommas(policylists[i].product_lists[j].suminsured_amount);
        //             }
        //         }
        //         this.productListArray.push(policylists[0].product_lists);
        //         this.allProductLists = [].concat.apply([], this.productListArray);
        //         this.allPolicyDetails = policylists;
        //         sessionStorage.allPolicyDetails = JSON.stringify(policylists);
        //         sessionStorage.changedTabDetails = JSON.stringify(policylists[0]);
        //         sessionStorage.setAllProductLists = JSON.stringify(this.allProductLists);
        //         this.changedTabDetails = policylists[0];
        //         sessionStorage.policyLists = JSON.stringify({index: 0, value: this.allProductLists});
        //         if(this.allProductLists.length > 1) {
        //             this.sumInsuredAmount = this.allProductLists[0].suminsured_amount;
        //         }
        //
        // } else {
        //     this.toast.error(successData.ErrorObject, 'Failed');
        // }
    }

    public changeAmountPolicyQuotationFailure(error) {
        this.settings.loadingSpinner = false;
    }

    buyProduct(value) {
        let ages = [];
        for (let i = 0; i < this.allPolicyDetails.length; i++) {
            for (let j = 0; j < this.allPolicyDetails[i].family_members.length; j++) {
                ages.push(this.allPolicyDetails[i].family_members[j].age);
            }
        }
        this.checkAge = Math.max.apply(null, ages);
        if ((this.auth.getPosStatus() == '0' || this.auth.getPosStatus() == 0) && (this.auth.getPosRoleId() =='3' && this.auth.getPosRoleId() == 3)) {
            let dialogRef = this.dialog.open(PosstatusAlert, {
                width: '700px',
            });
            dialogRef.disableClose = true;
            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    sessionStorage.buyProductdetails = JSON.stringify(value);
                    if (value.product_id <= 5) {
                        this.router.navigate(['/religare-proposal' + '/' + false]);
                    } else if (value.product_id == 11) {
                        if (this.checkAge <= 45) {
                            if ((this.checkAge <= 45 && this.checkAge >=18 ) && value.suminsured_amount < 1200000) {
                                this.router.navigate(['/reliance-heath'  + '/' + false]);
                            } else if (this.checkAge < 18) {
                                this.router.navigate(['/reliance-heath'  + '/' + false]);

                            } else {
                                let dialogRef = this.dialog.open(RelainceAgeMin, {
                                    width: '1600px',
                                });
                                dialogRef.disableClose = true;
                                dialogRef.afterClosed()
                            }
                        } else {
                            let dialogRef = this.dialog.open(RelainceAgeMax, {
                                width: '1600px',
                            });
                            dialogRef.disableClose = true;
                            dialogRef.afterClosed()
                        }

                    } else if (value.product_id == 12 || value.product_id == 13) {
                        this.router.navigate(['/appollo-health'  + '/' + false]);

                    } else if (value.product_id >= 17 && value.product_id <= 20) {
                        this.router.navigate(['/hdfc-proposal'  + '/' + false]);
                    } else if (value.product_id == 51 || value.product_id == 21) {
                        this.router.navigate(['/bajaj-health'  + '/' + false]);
                    } else if (value.product_id == 77) {
                        this.router.navigate(['/iffcoProposal'  + '/' + false]);
                    } else if (value.product_id == 90 || value.product_id == 91) {
                        this.router.navigate(['/chola-health-proposal'  + '/' + false]);
                    } else {
                        this.router.navigate(['/star-proposal'  + '/' + false]);
                    }

                } else {
                }
            });
        } else {
            sessionStorage.buyProductdetails = JSON.stringify(value);
            if (value.product_id <= 5) {
                let ageValid = true;
                for(let i=0; i < this.changedTabDetails.family_members.length; i++){
                    if((this.changedTabDetails.family_members[i].type == 'Son' && this.changedTabDetails.family_members[i].age <= 26) || (this.changedTabDetails.family_members[i].type == 'Daughter'&& this.changedTabDetails.family_members[i].age <= 26)){
                        ageValid = false;
                    }
                }
                if (!ageValid) {
                    let dialogRef = this.dialog.open(AgeValidate, {
                        width: '500px',
                    });
                    dialogRef.disableClose = true;
                    dialogRef.afterClosed().subscribe(result => {
                        if(result == true){
                            this.router.navigate(['/religare-proposal'  + '/' + false]);
                        } else {
                        }
                    });
                } else {
                    this.router.navigate(['/religare-proposal'  + '/' + false]);

                }

            } else if (value.product_id == 11) {

                if (this.checkAge <= 45) {
                    if ((this.checkAge <= 45 && this.checkAge >=18 ) && value.suminsured_amount < 1200000) {
                        this.router.navigate(['/reliance-heath'  + '/' + false]);
                    } else if (this.checkAge < 18) {
                        this.router.navigate(['/reliance-heath'  + '/' + false]);
                    } else {
                        let dialogRef = this.dialog.open(RelainceAgeMin, {
                            width: '1600px',
                        });
                        dialogRef.disableClose = true;
                        dialogRef.afterClosed()
                        // this.toast.error('Any Eligible Person above the age of 18 to 45 Years will have to under-go Compulsory Health / Medical Check up at the authorized Health center. For any Assistance contact : 1234567890 or Email: abc@gmail.com');
                    }
                } else {
                    // this.toast.error('Any Eligible Person above the age of 46 Years will have to under-go Compulsory Health / Medical Check up at the authorized Health center. For any Assistance contact : 1234567890 or Email: abc@gmail.com');
                    let dialogRef = this.dialog.open(RelainceAgeMax, {
                        width: '1600px',
                    });
                    dialogRef.disableClose = true;
                    dialogRef.afterClosed()
                }


            } else if (value.product_id == 12 || value.product_id == 13) {
                this.router.navigate(['/appollo-health'  + '/' + false]);

            } else if (value.product_id >= 17 && value.product_id <= 20) {
                let ageValid = true;
                for(let i=0; i < this.changedTabDetails.family_members.length; i++){
                    if((this.changedTabDetails.family_members[i].type == 'Son' && this.changedTabDetails.family_members[i].age < 22) || (this.changedTabDetails.family_members[i].type == 'Daughter'&& this.changedTabDetails.family_members[i].age < 22)){
                        ageValid = false;
                    }
                }
                if (!ageValid) {
                    let dialogRef = this.dialog.open(AgeValidate, {
                        width: '500px',
                    });
                    dialogRef.disableClose = true;
                    dialogRef.afterClosed().subscribe(result => {
                        if(result == true){
                            this.router.navigate(['/hdfc-proposal'  + '/' + false]);
                        } else {
                        }
                    });

                    //     dialogRef.afterClosed().subscribe(agevalue => {
                    //         // if(agevalue){
                    //         //     this.router.navigate(['/hdfc-insurance'  + '/' + false]);
                    //         //
                    //         // }
                    // });
                } else {
                    this.router.navigate(['/hdfc-proposal'  + '/' + false]);

                }


            } else if (value.product_id == 51 || value.product_id == 21) {
                this.router.navigate(['/bajaj-health' + '/' + false]);

            } else if (value.product_id == 77) {
                this.router.navigate(['/iffcoProposal'  + '/' + false]);
            } else if (value.product_id == 90 || value.product_id == 91) {
                this.router.navigate(['/chola-health-proposal'  + '/' + false]);
            } else {
                this.router.navigate(['/star-proposal'  + '/' + false]);
            }
        }
    }

    healthInsurer(){
        const dialogRef = this.dialog.open(HealthInsurer, {
            width: '1200px',
        });
        dialogRef.disableClose = true;
    }
    headinghealthinsurance(){
        this.firstPage = true;
        this.secondPage = false;
        this.healthProceed = true;
    }
}


@Component({
    selector: 'healthinsurer',
    template: `        
        <div class="row">
            <div class="col-sm-12 text-right">
                <mat-icon (click)="onNoClick()" style="cursor: pointer">close</mat-icon>
            </div>
            <div class="col-sm-12">
                <h3 class="text-center color-pink"><img src="assets/img/Health-Insurance.svg" class="logo-size"> About Health Insurance</h3>
            </div>
            
        </div>
        <div mat-dialog-content>
            <mat-accordion>

            <mat-expansion-panel class="mb-3" [expanded]='true'>
            <mat-expansion-panel-header>
                <mat-panel-title>
                    HEALTH INSURANCE- WHAT YOU SHOULD KNOW
                </mat-panel-title>
            </mat-expansion-panel-header>
            Health Insurance is a must for dealing with the wellness of your finances when you or your dependent family member is hospitalised. Health Insurance to a great extent covers the expenses incurred due to accident/health and sickness related procedures at the hospital as impatient. Certain day care proceedures are also covered and the list differs from insurer to insurer.

        </mat-expansion-panel>

        <mat-expansion-panel class="mb-3">
            <mat-expansion-panel-header>
                <mat-panel-title>
                    UTILISING THE HEALTH INSURANCE POLICY
                </mat-panel-title>
            </mat-expansion-panel-header>
            <p>On payment of premium to the insurer a health insurance policy is issued by the insurer along with the policy terms and conditions. An identity card is also issued by the allocated Third Party Administrator ( TPA ). This identity card along with an approved photo identity card like Aadhar, PAN, DL should be produced at the hospital for availing cashless facility. </p>
            <p>You must remember that the TPA is only a facilitator and TPA’s are not empowered to reject claims.</p>
            <p>It is a must that you should read the terms and conditions of the policy and if the terms and conditions are not in line with what was assured at the time of sales or you feel that this policy is not what you required, you can cancel the policy within the free look period and get a full refund of the premium.</p>
            <p>There are certain exclusions in all health insurance policies and the exclusions vary from insurer to insurer and policy to policy. The exclusions are specifically mentioned in the policy.</p>
            <strong>The most common exclusions and salient features to be borne in mind are :</strong>
            <ol><li>Remember a full 24 hour hospitalization is a prime requisite for a hospitalization claim unless the particular procedure has been listed as a day care procedure by the insurer. A discharge with a few minutes short of 24 hours hospitalization could result in repudiation of the claim.</li>
                <li>First 30 days from the date of commencement of the policy. No hospitalization claims are payable except in the unfortunate event of an accident hospitalization. This exclusion is not applicable for renewals if renewed prior to the expiry of the existing policy.</li>
                <li>Pre-existing illnesses are generally excluded for a specific period. This exclusion is not applicable where the existing policy holder has completed the requisite period with any insurer and the policy is a continuation without any break in period and portability has been accepted by the insurer.</li>
                <li>Although there is a grace time for renewing the policy you must be aware of the fact that all hospitalisations during the grace period are excluded from the coverage. Any illness acquired during this period will be excluded on renewal.</li>
                <li>Certain diseases / illnesses get covered after completion of a particular period of continuous renewal 2 years / 3 years / 4 years. This is specifically mentioned in the policy.</li>
                <li>You must be aware of the fact that the Hospital / Nursing home has to be registered with the local authorities and according to the located city there is a minimum number of beds stipulated. Further the hospital should have a fully equipped operation theater, nurses and doctors available round the clock.</li>
                <li>The unfortunate event of hospitalization could be a planned hospitalization which is after several visits to the doctors a procedure might have to be done under 24/7 monitoring by the medical team or it could be an emergency unplanned hospitalization. Under both the circumstances the eligible policy benefits can be obtained by utilizing the cashless or reimbursement process.</li>
                <li>In every hospitalization procedure it is a foregone fact that there will be a pre hospitalization expenditure and after discharge certain post hospitalization expenditure. Generally both the pre and post hospitalization expenses  do not come under the cashless process and has to be claimed as a reimbursement. You must remember that all expenses must be supported by the relevant prescription and bill along with the original report for diagnostic materials. Normally all insurance policies give a 30 day coverage for pre hospitalization expenses and a 60 day period for post hospitalization expenses. Remember there are variations from insurer to insurer according to the opted policy. All claims are payable up to the sum insured limit only. Please remember there might be sub limits or cash / percentage limitations in procedures which are charged by the hospitals on a package basis. Only relevant ( to the procedure at the hospital and disease) medical expenses are covered in the pre and post hospitalization.</li></ol>
        </mat-expansion-panel>

        <mat-expansion-panel class="mb-3">
            <mat-expansion-panel-header>
                <mat-panel-title>
                    CASHLESS HOSPITALIZATION PROCESS
                </mat-panel-title>
            </mat-expansion-panel-header>
            For you to claim your Insurance by the Cashless Hospitalization manner, you must use any of the hospitals that fall under the network of hospitals registered with that insurer or the Third Party Administrator ( TPA).  All you have to do is to present a physical proof of the health insurance policy you availed or the identity card provided by the insurer / TPA of the insurance along with an approved photo identity of the policy holder as well as of the insured person undergoing the treatment and you will be able to avail the benefits of Cashless treatment and hospitalization. Original identity cards have to be shown for verification and immediate return.
        </mat-expansion-panel>

        <mat-expansion-panel class="mb-3">
            <mat-expansion-panel-header>
                <mat-panel-title>
                    REIMBURSEMENT CLAIM PROCESS
                </mat-panel-title>
            </mat-expansion-panel-header>
            <p>Insurers settle claims on a reimbursement basis. This happens when the hospital that you’re being treated in is not a part of the network of hospitals or the insured would have preferred to pay and claim later with the insurer including pre and post hospitalization expenses or the admissibility of the claim due to coverage eligibility and such other valid reasons. It must be remembered that the denial of cashless benefit does not mean denial of the claim itself. Insurer is the only authorized person to reject a claim and not the TPA.</p>
            <strong>These are a few documents that are mandatory for the reimbursement claim process:</strong>
            <ul><li>A completed Claim Form with the treating doctors certificate.</li>
                <li>Discharge summary giving complete details with DOA and DOD (with time).</li>
                <li>All medicine purchases should be accompanied by prescription and bill.</li>
                <li>Investigation Reports in original to be accompanied by original Prescriptions and Bill.</li>
                <li>In case of accidents, the FIR or Medico Legal Certificate is mandatory. </li></ul>
           </mat-expansion-panel>

         <mat-expansion-panel class="mb-3">
            <mat-expansion-panel-header>
                <mat-panel-title>
                    NO CLAIM BONUS AND LIFE TIME RENEWABILITY
                 </mat-panel-title>
             </mat-expansion-panel-header>
             <p>No Claim Bonus (NCB) is the benefit accrued to an insured for not making any claims during the previous policy period.  As per current norms it ranges from 20% on the premium and progressively increases to a maximum of 50%. The No claim bonus facility slabs varies amongst the insurers. Some of the insurers give a no claim discount in the premium for the subsequent year and every claim free year this discount percentage is increased. In the event of a claim the discount is lost for the subsequent renewal. Some of the insurers provide the no claim bonus as an additional sum insured which is lost in the event of a claim for the next renewal.</p>
             <p>Opening up of the insurance market has facilitated a wide range of products which are lifelong renewable. It is vital for you to go for a policy that offers protection for a very long time, especially during old age. This is the reason why most of the health insurance plans come out with the facility of lifelong renewability. Just to keep your policy active, you have to renew the same at end of every policy year, before expiry date to maintain continuity of risk.</p>
         </mat-expansion-panel>       

        <mat-expansion-panel class="mb-3">
            <mat-expansion-panel-header>
                <mat-panel-title>
                    DAY CARE PROCEDURES
                </mat-panel-title>
            </mat-expansion-panel-header>
            <p>As mentioned earlier coverage for  procedures which can be completed  in less than 24 hours and discharge of the patient can be on the same day are called Day Care Proceedures. These procedures might be done under local or general anesthesia and there is no need for the patient to remain admitted in the hospital. It is essential that for the claim to be approved it should be listed in the approved list of day care proceedures. Please verify the list of approved day care proceedures of your insurer.</p>
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
            <p>Reimbursement of the cost of medical check-up at the end of a block of every three / four renewal years, if there are no claims reported during the block. To motivate all policyholders towards a healthy life, at times some insurers offer a free medical check-up facility. </p>
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
            <p>Whether you need health insurance for yourself, your business, or your family, we at Vizza Insurance Broking Services Pvt. Ltd. have a wide range of choices. We help you to find the right health insurance with the right insurer. As a licensed IRDA Broker we work with all insurers and thus we make it easy for individuals to get various  quotes from all insurers, view plan options and provide various permutations and combinations.  Our site is integrated with the health insurance marketplace, making it a one-stop destination for shopping and purchasing the best suitable individual coverage from all insurers.</p>
            <strong>ADVANTAGE VIZZA:</strong>
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


    </mat-accordion>
    </div>`,
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
            <label>You're not verified POS. Do you want to continue?</label>
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
@Component({
    selector: 'relainceagemin',
    template: `
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-12">
                <h3 class="text-center">Health Check Up</h3>
                <p>Any Eligible Person above the age of 18 Years will have to under-go Compulsory Health / Medical Check up at the authorized Health center. For any Assistance contact : 1234567890 or Email: <a href="mailto:abc@gmail.com">abc@gmail.com</a></p>
                </div>
            </div>
        </div>
        <div mat-dialog-actions style="justify-content: center">
            <button mat-button class="secondary-bg-color" (click)="onNoClick()" >Ok</button>
        </div>
    `
})
export class RelainceAgeMin {
    constructor(
        public dialogRef: MatDialogRef<RelainceAgeMin>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
@Component({
    selector: 'relainceagemax',
    template: `
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-12">
                <h3 class="text-center">Health Check Up</h3>
                <p>Any Eligible Person above the age of 46 Years will have to under-go Compulsory Health / Medical Check up at the authorized Health center. For any Assistance contact : 9047078809 or Email: <a href="mailto:online@vizzainsurance.com">online@vizzainsurance.com</a></p>
                </div>
            </div>
        </div>
        <div mat-dialog-actions style="justify-content: center">
            <button mat-button class="secondary-bg-color" (click)="onNoClick()" >Ok</button>
        </div>
    `
})
export class RelainceAgeMax {
    constructor(
        public dialogRef: MatDialogRef<RelainceAgeMax>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
@Component({
    selector: 'agevalidate',
    template: `
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-12">
                <p> {{agemsg}}.If you want to continue</p>
                </div>
            </div>
        </div>
        <div mat-dialog-actions style="justify-content: center">
            <button mat-button class="secondary-bg-color" (click)="onClick(false)" >Cancel</button>
             <button mat-button class="secondary-bg-color" (click)="onClick(true)" >Ok</button>

        </div>
    `
})
export class AgeValidate {
    agemsg: any;
    constructor(
        public dialogRef: MatDialogRef<AgeValidate>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        let msg = JSON.parse(sessionStorage.buyProductdetails);
        this.agemsg = msg.childmsg;

    }
    onClick(result) {
        if(result == true){
            this.dialogRef.close(result);
        } else {
            this.dialogRef.close(result);
        }
    }

}
















// old
// this function will get the policy quotation lists
// getPolicyQuotationList() {
//     this.selectedAmount = ''
//     // if (this.selectedAmount == '' || this.selectedAmount == undefined) {
//     //     this.sumerror = true;
//     // } else {
//     //     this.sumerror = false;
//     // }
//     if (this.pincoce == '' || this.pincoce == undefined || this.pincoce.length < 6) {
//         this.pinerror = true;
//     } else {
//         this.pinerror = false;
//     }
//     this.finalData = [];
//     let memberValid = false;
//
//         for (let i = 0; i < this.setArray.length; i++) {
//             if (this.setArray[i].checked) {
//                 if (this.setArray[i].age == '') {
//                     this.setArray[i].error = 'Required';
//                     memberValid = true;
//                     break;
//                 } else {
//                     this.setArray[i].error = '';
//                     memberValid = false;
//                     this.finalData.push({type: this.setArray[i].name, age: this.setArray[i].age });
//                 }
//             }
//         }
//
//     if (this.pincoce != '' && this.pincoce != undefined) {
//         if (!memberValid) {
//             if (this.finalData != '') {
//                 const data = {
//                     'platform': 'web',
//                     'postalcode': this.pincoce ? this.pincoce : '',
//                     'created_by': '0',
//                     'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
//                     'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
//                     'sum_insured': this.selectedAmount,
//                     'family_details': this.finalData,
//                     'insurance_type': '1',
//                     'annual_salary': '',
//                     'occupation_code': '',
//                 };
//                 this.settings.loadingSpinner = true;
//                 this.common.getPolicyQuotation(data).subscribe(
//                     (successData) => {
//                         this.PolicyQuotationSuccess(successData, 0);
//
//                     },
//                     (error) => {
//                         this.PolicyQuotationFailure(error);
//                     }
//                 );
//
//             } else {
//             }
//         }
//     }
// }
//
// public PolicyQuotationSuccess(successData, index) {
//     this.settings.loadingSpinner = false;
//     if (successData.IsSuccess) {
//         this.insuranceLists = successData.ResponseObject;
//         sessionStorage.allGroupDetails = JSON.stringify(this.insuranceLists);
//         if(this.insuranceLists.length > 1) {
//             let dialogRef = this.dialog.open(GrouppopupComponent, {
//                 width: '1500px', data: {comparedata: successData.ResponseObject}});
//             dialogRef.disableClose = true;
//
//             dialogRef.afterClosed().subscribe(result => {
//             });
//         }
//
//         this.firstPage = false;
//         this.secondPage = true;
//         this.changedTabIndex = 0;
//         sessionStorage.changedTabIndex = 0;
//         this.enquiryId = this.insuranceLists[index].enquiry_id;
//         sessionStorage.enquiryId = this.insuranceLists[index].enquiry_id;
//
//         this.changedTabDetails = this.insuranceLists[index];
//         this.changeSuninsuredAmount = this.insuranceLists[index].group_suminsured_id;
//         sessionStorage.changeSuninsuredAmount = this.insuranceLists[index].group_suminsured_id;
//         this.currentGroupName = this.insuranceLists[index].name;
//         sessionStorage.changedTabDetails = JSON.stringify(this.insuranceLists[index]);
//
//         sessionStorage.setPage = (this.insuranceLists[index].enquiry_id == '' ) ? 1 : 2;
//         if (sessionStorage.setPage != 1) {
//             this.settings.HomeSidenavUserBlock = false;
//             this.settings.sidenavIsOpened = false;
//             this.settings.sidenavIsPinned = false;
//
//         }
//         if (this.insuranceLists[index].enquiry_id != '') {
//             sessionStorage.sideMenu = true;
//         }
//         this.allCompanyList = [];
//         let all_products = [];
//         for (let i = 0; i < this.insuranceLists.length; i++) {
//
//             for (let j = 0; j < this.insuranceLists[i].product_lists.length; j++) {
//                 if(this.allCompanyList.indexOf(this.insuranceLists[i].product_lists[j].company_name) == -1) {
//                     this.allCompanyList.push(this.insuranceLists[i].product_lists[j].company_name);
//                 }
//                 this.insuranceLists[i].product_lists[j].compare = false;
//                 this.insuranceLists[i].product_lists[j].shortlist = false;
//                 this.insuranceLists[i].product_lists[j].premium_amount_format =   this.numberWithCommas(this.insuranceLists[i].product_lists[j].premium_amount);
//                 this.insuranceLists[i].product_lists[j].suminsured_amount_format =   this.numberWithCommas(this.insuranceLists[i].product_lists[j].suminsured_amount);
//             }
//
//             this.insuranceLists[sessionStorage.changedTabIndex].all_product_list = this.insuranceLists[i].product_lists;
//         }
//
//         this.getArray = this.insuranceLists[index].family_members;
//         for (let i = 0; i < this.setArray.length; i++) {
//             for (let j = 0; j < this.getArray.length; j++) {
//                 if (this.setArray[i].name == this.getArray[j].type) {
//                     this.setArray[i].auto = true;
//                 }
//             }
//         }
//         this.filterCompany = this.allCompanyList;
//         sessionStorage.filterCompany = JSON.stringify(this.filterCompany);
//         sessionStorage.policyLists = JSON.stringify({index: index, value: successData.ResponseObject});
//         sessionStorage.allCompanyList = JSON.stringify(this.allCompanyList);
//     } else {
//         this.toast.error(successData.ErrorObject);
//     }
// }
//
// public  numberWithCommas(x) {
//     return x.toString().substring(0,x.toString().split('.')[0].length-3).replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + x.toString().substring(x.toString().split('.')[0].length-3);
// }

// updateFunction() {
//     if (!this.updateFlag && !this.ageUpdateFlag || this.updateFlag && this.ageUpdateFlag || !this.updateFlag && this.ageUpdateFlag) {
//         let dialogRef = this.dialog.open(GroupmembersAlert, {
//             width: '700px',
//         });
//         dialogRef.disableClose = true;
//         dialogRef.afterClosed().subscribe(result => {
//             if (result) {
//                 this.updateDetails();
//             }
//         });
//     } else {
//         this.changeSuminsuredFunction();
//     }
// }
//
// // this function will update base details
// updateDetails() {
//     this.getArray = this.changedTabDetails.family_members;
//     for (let i = 0; i < this.setArray.length; i++) {
//         for (let j = 0; j < this.getArray.length; j++) {
//             if (this.setArray[i].name == this.getArray[j].type) {
//                 this.setArray[i].auto = true;
//             }
//         }
//     }
//     this.finalData = [];
//     for (let i = 0; i < this.setArray.length; i++) {
//         if (this.setArray[i].checked) {
//             if (this.setArray[i].age == '') {
//                 this.setArray[i].error = 'Required';
//             } else {
//                 this.setArray[i].error = '';
//                 this.finalData.push({type: this.setArray[i].name, age: this.setArray[i].age });
//             }
//         }
//     }
//     const data = {
//         'platform': 'web',
//         'postalcode': this.pincoce,
//         'sum_insured': sessionStorage.changeSuninsuredAmount,
//         'family_details': this.finalData,
//         'family_group_name': this.changedTabDetails.name,
//         'enquiry_id': this.changedTabDetails.enquiry_id,
//         'created_by': '0',
//         'insurance_type': '1',
//         'annual_salary': '',
//         'occupation_code': '',
//         'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
//         'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0
//     };
//     let index = this.changedTabIndex;
//     // this.settings.loadingSpinner = true;
//     this.common.updatePolicyQuotation(data).subscribe(
//         (successData) => {
//             this.updatePolicyQuotationSuccess(successData, index);
//         },
//         (error) => {
//             this.updatePolicyQuotationFailure(error);
//         }
//     );
// }
// public updatePolicyQuotationSuccess(successData, index) {
//     this.settings.loadingSpinner = false;
//     if (successData.IsSuccess) {
//         if (this.ageUpdateFlag) {
//             let dialogRef = this.dialog.open(GrouppopupComponent, {
//                 width: '1500px', data: {comparedata: successData.ResponseObject}});
//             dialogRef.disableClose = true;
//             dialogRef.afterClosed().subscribe(result => {
//             });
//             this.insuranceLists = successData.ResponseObject;
//             for (let i = 0; i < this.insuranceLists.length; i++) {
//                 for (let j = 0; j < this.insuranceLists[i].product_lists.length; j++) {
//                     this.insuranceLists[i].product_lists[j].compare = false;
//                     this.insuranceLists[i].product_lists[j].shortlist = false;
//                     this.insuranceLists[i].product_lists[j].premium_amount_format =   this.numberWithCommas(this.insuranceLists[i].product_lists[j].premium_amount);
//                     this.insuranceLists[i].product_lists[j].suminsured_amount_format =   this.numberWithCommas(this.insuranceLists[i].product_lists[j].suminsured_amount);
//                 }
//             }
//             sessionStorage.policyLists = JSON.stringify({index: index, value: successData.ResponseObject});
//
//         }
//
//     } else {
//
//         this.toast.error(successData.ErrorObject, 'Failed');
//     }
// }
//
// public updatePolicyQuotationFailure(error) {
//     this.settings.loadingSpinner = false;
// }

// addShortlist(value, pi, index, enqId, name) {
//     this.nonEditable = true;
//     const data = {
//         'platform': 'web',
//         'scheme': value.scheme,
//         'group_name': name,
//         'product_id': value.product_id,
//         'suminsured_amount': value.suminsured_amount,
//         'premium_amount': value.premium_amount,
//         'enquiry_id': enqId,
//         'shortlisted_by': '0',
//         'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
//         'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0
//
//     };
//     this.settings.loadingSpinner = true;
//     this.common.addShortList(data).subscribe(
//         (successData) => {
//             this.shortListSuccess(successData, pi, index);
//         },
//         (error) => {
//             this.shortListFailure(error);
//         }
//     );
// }
// public shortListSuccess(successData, pi, index) {
//     this.settings.loadingSpinner = false;
//     if (successData.IsSuccess) {
//         this.shortlistArray = successData.ResponseObject;
//         this.shortListCount = this.shortlistArray.length;
//         sessionStorage.shortListCount = this.shortListCount;
//         for (let i = 0; i < this.insuranceLists.length; i++) {
//             for (let j = 0; j < this.insuranceLists[i].product_lists.length; j++) {
//                 for (let k = 0; k < this.shortlistArray.length; k++) {
//                     this.insuranceLists[pi].product_lists[j].shortlist_id = this.shortlistArray[k].shortlist_id;
//                     this.insuranceLists[pi].product_lists[j].shortlist = this.shortlistArray[k].shortlist_id == '' ? false : true;
//                     this.insuranceLists[pi].product_lists[j].currentBtn = this.shortlistArray[k].shortlist_id == '' ? false : true;
//                 }
//             }
//         }
//     }
//     this.insuranceLists[pi].product_lists[index].currentBtn = false;
//     this.insuranceLists[pi].product_lists[index].removebtn = true;
//     this.indexList.push({pi: pi, index: index});
//     // sessionStorage.shorListTab = JSON.stringify({pi: pi, index: index});
//     sessionStorage.policyLists = JSON.stringify({index: index, value: this.insuranceLists});
//
//
//
// }
// public shortListFailure(error) {
//
// }
// removeShortlist(value, pi, index, enqId, shortId) {
//     const data = {
//         'platform': 'web',
//         'shortlist_id': shortId,
//         'enquiry_id': enqId,
//         'shortlisted_by': '0',
//         'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
//         'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0
//     };
//     this.settings.loadingSpinner = true;
//     this.common.removeShortList(data).subscribe(
//         (successData) => {
//             this.removeShortListSuccess(successData, pi, index, enqId, value.group_name);
//         },
//         (error) => {
//             this.removeShortListFailure(error);
//         }
//     );
// }
// public removeShortListSuccess(successData, pi, index, enqId, name) {
//     this.settings.loadingSpinner = false;
//     if (successData.IsSuccess) {
//         this.shortlistArray.splice(index, 1);
//         this.shortListCount = this.shortlistArray.length;
//         sessionStorage.shortListCount = this.shortListCount;
//         if (this.shortListCount > 0) {
//             this.nonEditable = true;
//         } else {
//             this.nonEditable = false;
//
//         }
//         for (let i = 0; i < this.insuranceLists.length; i++) {
//             for (let j = 0; j < this.insuranceLists[i].product_lists.length; j++) {
//                 this.insuranceLists[pi].product_lists[j].removebtn = false;
//                 this.insuranceLists[pi].product_lists[j].shortlist = false;
//
//             }
//         }
//     }
// }
// public removeShortListFailure(successData) {
//
// }
// removeShortlistPage(value, pi, index, enqId, shortId) {
//     const data = {
//         'platform': 'web',
//         'shortlist_id': shortId,
//         'enquiry_id': enqId,
//         'shortlisted_by': '0',
//         'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
//         'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0
//     };
//     this.common.removeShortList(data).subscribe(
//         (successData) => {
//             this.removeShortlistPageSuccess(successData, pi, index, enqId, value.group_name);
//         },
//         (error) => {
//             this.removeShortListPageFailure(error);
//         }
//     );
// }
// public removeShortlistPageSuccess(successData, pi, index, enqId, name) {
//     if (successData.IsSuccess) {
//         this.shortlistArray.splice(index, 1);
//         this.shortListCount = this.shortlistArray.length;
//         sessionStorage.shortListCount = this.shortListCount;
//         if (this.shortListCount > 0) {
//             this.nonEditable = true;
//         } else {
//             this.nonEditable = false;
//         }
//     }
// }
// public removeShortListPageFailure(successData) {
//
// }

// getShortListDetails(enqId, index, name) {
//     const data = {
//         'platform': 'web',
//         'enquiry_id': enqId,
//         'shortlisted_by': '0',
//         'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
//         'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0
//     };
//     this.changedTabIndex = sessionStorage.changedTabIndex;
//     this.common.getShortLists(data).subscribe(
//         (successData) => {
//             this.getShortListsSuccess(successData, index, name);
//         },
//         (error) => {
//             this.getShortListsFailure(error);
//         }
//     );
// }
// public getShortListsSuccess(successData, index, name) {
//     this.shortlistArray = successData.ResponseObject;
//     this.shortListCount = this.shortlistArray.length;
//     if (this.shortListCount > 0) {
//         this.nonEditable = true;
//         let length = this.shortlistArray.length - 1;
//         this.totalSuminsured = this.shortlistArray[length].total_suminsured;
//     } else {
//         this.nonEditable = false;
//
//     }
//     for (let i = 0; i < this.shortlistArray.length; i++) {
//         this.shortlistArray[i].removebtn = true;
//     }
//     for (let i = 0; i < this.insuranceLists.length; i++) {
//         for (let j = 0; j < this.insuranceLists[i].product_lists.length; j++) {
//             for (let k = 0; k < this.shortlistArray.length; k++) {
//                 if (this.shortlistArray[k].group_name == name) {
//                     this.insuranceLists[index].product_lists[j].shortlist_id = this.shortlistArray[k].shortlist_id;
//                 }
//
//             }
//         }
//     }
// }
// public getShortListsFailure(error) {
// }
