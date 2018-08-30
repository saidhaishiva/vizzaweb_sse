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

@Component({
  selector: 'app-personalaccident',
  templateUrl: './personalaccident.component.html',
  styleUrls: ['./personalaccident.component.scss']
})
export class PersonalaccidentComponent implements OnInit {

    public personalaccidents: FormGroup;
    public settings: Settings;
    setArray: any;
    setArray1: any;
    getArray: any;
    closeIcon: boolean;

    index: any;
    memberLength: any;
    auto: boolean;
    finalData: any;
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
        this.Occupation = false;
        this.Age = false;
        this.AnnualIncome = false;
        this.updateFlag = false;
        this.ageUpdateFlag = false;
        this.nonEditable = false;
        this.setArray = [];
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
        if (this.pageSettings == 2) {
            this.firstPage = false;
            this.secondPage = true;
        }

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
            this.AnnualIncome = sessionStorage.setAnnualIncome;
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

        if (this.selectedAmount != '' && this.selectedAmount != undefined && this.pincoce != '' && this.pincoce != undefined) {

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
    }


    public personalAccidentSuccess(successData , index) {
        console.log(successData.ResponseObject);
        this.insuranceLists = successData.ResponseObject;//.product_lists;
        console.log(this.insuranceLists, 'jhghfhjfhgfhgfjhyf');
    }

    public personalAccidentFailure(error) {
        console.log(error);
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

}

