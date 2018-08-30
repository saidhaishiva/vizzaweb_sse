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
import {GroupmembersAlert, PosstatusAlert} from '../health-insurance/health-insurance.component';
import {ComparelistComponent} from '../health-insurance/comparelist/comparelist.component';
import {ViewdetailsComponent} from '../health-insurance/viewdetails/viewdetails.component';
import {GrouppopupComponent} from '../health-insurance/grouppopup/grouppopup.component';

@Component({
  selector: 'app-personalaccident',
  templateUrl: './personalaccident.component.html',
  styleUrls: ['./personalaccident.component.scss']
})
export class PersonalaccidentComponent implements OnInit {

    public personalaccidents: FormGroup;
    public settings: Settings;
    getArray: any;
    closeIcon: boolean;

    index: any;
    memberLength: any;
    auto: boolean;
    finalData: any;
    sumerror: boolean;
    pinerror: boolean;
    annualerror: boolean;
    occupationerror: boolean;
    ageerror: boolean;
    selectedAmount: any;
    pincoce: any;
    Occupation: any;
    Age: any;
    AnnualInc: any;
    count: any;
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

    totalSuminsured: any;
    indexList: any;
    shortListCount: any;
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
        this.annualerror = false;
        this.occupationerror = false;
        this.ageerror = false;
        this.Occupation = false;
        this.Age = false;
        this.AnnualInc = false;
        this.updateFlag = false;
        this.ageUpdateFlag = false;
        this.nonEditable = false;
        this.memberLength = [];
        this.finalData = [];
        this.indexList = [];
        this.personalaccidents = this.fb.group({
            suminsured: ['', Validators.compose([Validators.required])],
            annualincome: ['', Validators.compose([Validators.required])],
            age: ['', Validators.compose([Validators.required])],
            occupation: ['', Validators.compose([Validators.required])],
            pincode: ['', Validators.compose([Validators.required])]
        });
        this.sumInsuredAmountLists = 0;
        this.compareArray = [];

    }

    ngOnInit() {
        this.firstPage = true;
        this.secondPage = false;
        this.closeIcon = true;
        this.sumInsuredAmonut();
        this.setOccupationListCode();
        this.sessionData();
        this.AnnualInc='';
        this.Age='';
        if (this.pageSettings == 2) {
            this.firstPage = false;
            this.secondPage = true;
        }
        this.count = 0;

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
        if(sessionStorage.setAge != undefined && sessionStorage.setAge){
            this.Age = sessionStorage.setAge;
        }
        if(sessionStorage.setAnnualIncome != undefined && sessionStorage.setAnnualIncome){
            this.AnnualInc = sessionStorage.setAnnualIncome;
        }
        if(sessionStorage.setOccupation != undefined && sessionStorage.setOccupation){
            this.Occupation = sessionStorage.setOccupation;
        }
        if (sessionStorage.setPage != undefined && sessionStorage.setPage != '') {
            this.pageSettings = sessionStorage.setPage;
            if(sessionStorage.sideMenu) {
                this.settings.HomeSidenavUserBlock = false;
                this.settings.sidenavIsOpened = false;
                this.settings.sidenavIsPinned = false;
            }
        }
        if (sessionStorage.enquiryId != undefined && sessionStorage.enquiryId != '') {
            this.enquiryId = sessionStorage.enquiryId;
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
        this.proposalservice.getOccupationCode(data).subscribe(
            (successData) => {
                this.occupationCodeSuccess(successData);
            },
            (error) => {
                this.occupationCodeFailure(error);
            }
        );
    }
    occupationCode : any;
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

    selectAnnualIncome(){
        sessionStorage.setAnnualIncome = this.AnnualInc;
    }

    selectAge(){
        sessionStorage.setAge = this.Age;
    }

    changeOccupation(){
        sessionStorage.setOccupation = this.Occupation;
    }

    selectPincode() {
        sessionStorage.setPincode = this.pincoce;
    }


    getPersonalAccident(value){

        if(this.personalaccidents.controls['age'].value <=18 ){
            this.toast.error('Personal age should be 18 or above');
            return false;
        }

        this.firstPage = false;
        this.secondPage = true;

        // if (this.selectedAmount == '' || this.selectedAmount == undefined) {
        //     this.sumerror = true;
        // } else {
        //     this.sumerror = false;
        // }
        // if(this.AnnualInc == '' || this.AnnualInc == undefined){
        //     this.annualerror = true;
        // }else{
        //     this.annualerror = false;
        // }
        // if(this.Age == '' || this.Age == undefined){
        //     this.ageerror = true;
        // }else{
        //     this.ageerror = false;
        // }
        // if(this.Occupation == ''|| this.Occupation == undefined){
        //     this.occupationerror = true;
        // }else{
        //     this.occupationerror = false;
        // }
        // if (this.pincoce == '' || this.pincoce == undefined || this.pincoce.length < 6) {
        //     this.pinerror = true;
        // } else {
        //     this.pinerror = false;
        // }

        const data = {
            "platform": "web",
            "insurance_type": "2",
            "annual_salary": value.annualincome,
            "occupation_code": value.occupation,
            "postalcode": this.pincoce ? this.pincoce : '',
            "sum_insured": value.suminsured,
            "created_by": "0",
            "pos_status": "0",
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            "family_details": [{
                "type": "self",
                "age": value.age
            }]
        }
        this.proposalservice.personalAccident(data).subscribe(
            (successData) => {
                //this.settings.loadingSpinner = true;
                this.personalAccidentSuccess(successData,0);
            },
            (error) => {
                this.personalAccidentFailure(error);
            }
        );


    }

    public personalAccidentSuccess(successData , index) {
        console.log(successData.ResponseObject);
        this.insuranceLists = successData.ResponseObject;//.product_lists;
        console.log(this.insuranceLists, 'jhghfhjfhgfhgfjhyf');
    }

    public personalAccidentFailure(error) {
        console.log(error);
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

    onSelectedIndexChange(index) {
        if (this.insuranceLists.length == index) {
            // this.getShortListDetails(this.enquiryId, index, name);
            this.compareArray = [];
        } else {
            this.updateFlag = false;
            this.ageUpdateFlag = false;
            // this.settings.loadingSpinner = true;
            this.changedTabDetails = this.insuranceLists[index];
            sessionStorage.changedTabDetails = JSON.stringify(this.insuranceLists[index]);
            this.currentGroupName = this.insuranceLists[index].name;
            this.changedTabIndex = index;
            sessionStorage.changedTabIndex = index;
            this.changeSuninsuredAmount = this.insuranceLists[index].group_suminsured_id;
            sessionStorage.changeSuninsuredAmount = this.changeSuninsuredAmount;
            // this.updateTabPolicy(this.insuranceLists[index], index);
        }
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

    // this function will change the sum insured amount
    changeSuminsuredFunction() {
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
            sessionStorage.policyLists = JSON.stringify({index: index, value: successData.ResponseObject});
        } else {
            this.toast.error(successData.ErrorObject, 'Failed');
        }
    }
    public changeAmountPolicyQuotationFailure(error) {
        this.settings.loadingSpinner = false;
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
                    if (value.product_id == '3') {
                        this.router.navigate(['/religare']);
                    } else {
                        this.router.navigate(['/proposal']);
                    }
                } else {
                }
            });
        } else {
            sessionStorage.buyProductdetails = JSON.stringify(value);
            sessionStorage.groupName = gname;
            if (value.product_id == '3') {
                this.router.navigate(['/religare']);
            } else {
                this.router.navigate(['/proposal']);
            }
        }
    }

}

