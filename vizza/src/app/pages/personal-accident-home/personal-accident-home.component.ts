import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {CommonService} from '../../shared/services/common.service';
import {ToastrService} from 'ngx-toastr';
import {HealthService} from '../../shared/services/health.service';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {AuthService} from '../../shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

import {GrouppopupComponent} from '../health-insurance/grouppopup/grouppopup.component';
import {CompareDetailsComponent} from './compare-details/compare-details.component';
import {ComparelistComponent} from '../health-insurance/comparelist/comparelist.component';
import {PersonalAccidentService} from '../../shared/services/personal-accident.service';
import {ViewdetailsComponent} from '../health-insurance/viewdetails/viewdetails.component';
import {ViewProductDetailsComponent} from './view-product-details/view-product-details.component';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-personal-accident-home',
  templateUrl: './personal-accident-home.component.html',
  styleUrls: ['./personal-accident-home.component.scss']
})
export class PersonalaccidentComponent implements OnInit {

    public personalaccidents: FormGroup;
    public settings: Settings;
    public annualErrorMessage: any;
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
    productData: any;
    //fire
    public show: boolean;
    public fireapp: FormGroup;
    public setDate: any;
    public selectDate: any;
    public productName: any;
    public pin: any;
    public title: any;
    public response: any;
    public pincodeErrors: any;
    constructor(public appSettings: AppSettings, public toastr: ToastrService, public datepipe: DatePipe, public commonservices: CommonService, public personalService: PersonalAccidentService, public router: Router, public route: ActivatedRoute, public config: ConfigurationService, public fb: FormBuilder, public dialog: MatDialog, public toast: ToastrService, public auth: AuthService) {

        this.settings = this.appSettings.settings;
        this.webhost = this.config.getimgUrl();
        // sessionStorage.sideMenu = false;
        // this.settings.loadingSpinner = true
        if (!sessionStorage.sideMenuP) {
            this.settings.HomeSidenavUserBlock = true;
            this.settings.sidenavIsOpened = true;
            this.settings.sidenavIsPinned = true;
        }

        this.fireapp = this.fb.group({
            'appdate': ['', Validators.required],
            'apptime': null,
            'name': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            'contactperson':  ['', Validators.compose([Validators.required])],
            'mobile': ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}'), Validators.minLength(10)])],
            'email': ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
            'pincode': ['', Validators.compose([Validators.required])],
            'insurance': ['',Validators.compose([Validators.required])],
            'appointmentwith': ['',Validators.compose([Validators.required])]
        });
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
        this.annualerror = false;
    }

    ngOnInit() {
        this.show = this.config.getpaAccident();
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

        //fire
        this.setDate = Date.now();
        this.setDate = this.datepipe.transform(this.setDate, 'y-MM-dd');
        this.route.params.forEach((params) => {
            this.productName = params.id;

        });

    }

reset() {
    this.selectedAmountP = [];
    this.pincoceP = '';
    this.occupationP = '';
    this.Age = '';
    this.AnnualIncomeP = '';
}

public annualIncome() {
    if (this.AnnualIncomeP == '0') {
        this.annualErrorMessage = true;
    } else {
        this.annualErrorMessage = false;
        this.annualerror = false;
    }
}
    public keyPress(event: any) {
        sessionStorage.pincoceP = this.pincoceP;
        sessionStorage.occupationP = this.occupationP;
        sessionStorage.AnnualIncomeP = this.AnnualIncomeP;
        sessionStorage.setAgeP= this.Age;

        if (event.charCode !== 0) {
            const pattern = /[0-9\\ ]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }
    painsurance() {
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
        if (sessionStorage.setAgeP != undefined && sessionStorage.setAgeP) {
            this.Age = sessionStorage.setAgeP;
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
        }
    }

    public getSumInsuredAmountFailure(error) {
    }

    checkNetwork() {
        if (this.sumInsuredAmountLists == 0) {
            this.toast.error('Unable to connect to the network');
        }
    }

    setOccupationListCode() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        };
        this.personalService.getOccupationCodeList(data).subscribe(
            (successData) => {
                this.occupationCodeSuccess(successData);
            },
            (error) => {
                this.occupationCodeFailure(error);
            }
        );

    }


    public occupationCodeSuccess(successData) {
        this.occupationCode = successData.ResponseObject;

    }

    public occupationCodeFailure(error) {
    }

    changeAmount() {
        sessionStorage.selectedAmountP = this.selectedAmountP;
    }

    getPersonalAccident() {

        if (this.Age < 18) {
            this.toast.error('Personal age should be 18 or above');
            return false;
        }
        // if (this.AnnualIncomeP != 0) {
        //     this.toast.error('Personal age should be 18 or above');
        //     return false;
        // }

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
        if (this.AnnualIncomeP == '' || this.AnnualIncomeP == undefined || this.AnnualIncomeP == '0') {
            this.annualerror = true;
        } else {
            this.annualerror = false;
        }
        if (this.Age == '' || this.Age == undefined) {
            this.ageerror = true;
        } else {
            this.ageerror = false;
        }
        if (this.selectedAmountP != '' && this.selectedAmountP != undefined && this.pincoceP != '' && this.pincoceP != undefined && this.AnnualIncomeP == '' || this.AnnualIncomeP == undefined || this.AnnualIncomeP != 0) {

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
            };
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
        if (successData.IsSuccess) {
            this.personalPremiumLists = successData.ResponseObject;
               // let id = 1;
                for (let j = 0; j < this.personalPremiumLists.product_lists.length; j++) {
                    this.personalPremiumLists.product_lists[j].compare_id = j+1;
                }

            console.log(this.personalPremiumLists, 'pppp099882211qq');

            sessionStorage.personalPremiumLists = JSON.stringify(this.personalPremiumLists);
            this.firstPage = false;
            this.secondPage = true;
            this.AnnualIncomeP = this.personalPremiumLists.annual_salary;
            this.Age = this.personalPremiumLists.family_details[0].age;
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
    }

// update
    updatePersonalAccident() {

        const data = {
            'platform': 'web',
            'postalcode': this.pincoceP,
            'sum_insured': this.selectedAmountP,
            'occupation_code': this.occupationP,
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
    }

    //// compare Details
    compareDetails(value, index, equiryId, name) {
        console.log(value, 'valuevalue1');
        const data = {
            index: index,
            product_id: value.product_id,
            compare_id: value.compare_id,
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
        console.log(index, 'indexindex');
        this.compareArray.splice(index, 1);
        console.log(this.compareArray, 'this.compareArray');
        console.log(this.personalPremiumLists.product_lists, 'this.this.personalPremiumLists.product_lists');

        let getCount;
        for (let i = 0; i < this.personalPremiumLists.product_lists.length; i++) {
            getCount = false;
            for (let j = 0; j < this.compareArray.length; j++) {
                if (this.compareArray[j].compare_id == this.personalPremiumLists.product_lists[i].compare_id) {
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
    public onNumber(event: any) {
        if (event.charCode !== 0) {
            const pattern = /[0-9]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }
    // comparelist
    compareList(value) {
            this.productData = [];
            let scheme = value[0].scheme;
            for (let i = 0; i < value.length; i++) {
                this.productData.push({product_id: value[i].product_id, premium_amount: value[i].premium_amount, suminsured_amount: value[i].suminsured_amount, prod_suminsuredid: value[i].suminsured_id});
            }
            const data = {
                'platform': 'web',
                'scheme': scheme,
                'group_name': 'GROUP A',
                'enquiry_id': this.enquiryIdP,
                'product_lists': this.productData,
                'created_by': 0,
                'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
                'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0

            };
            this.settings.loadingSpinner = true;
            this.personalService.addtoCompare(data).subscribe(
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


        // fire functions

    addEvent(event) {
        this.selectDate = event.value;
        this.setDate = this.datepipe.transform(this.selectDate, 'y-MM-dd');
    }
    fireKeeper(values) {

        if (this.fireapp.valid) {
            const data = {
                'platform': 'web',
                'product_type': 'offline',
                'appointment_date': this.setDate,
                'appointment_time': this.fireapp.controls['apptime'].value,
                'company_name': this.fireapp.controls['name'].value,
                'customer_mobile': this.fireapp.controls['mobile'].value,
                'customer_email': this.fireapp.controls['email'].value,
                'contact_person' : this.fireapp.controls['contactperson'].value,
                'pincode': this.fireapp.controls['pincode'].value,
                'product_name': this.fireapp.controls['insurance'].value,
                'appointment_with': this.fireapp.controls['appointmentwith'].value,

            };

            this.commonservices.setFixAppointment(data).subscribe(
                (successData) => {
                    this.fixAppointmentSuccess(successData);
                },
                (error) => {
                    this.fixAppointmentFailure(error);
                }
            );
        }
    }
    fixAppointmentSuccess(successData) {
    }
    fixAppointmentFailure(error) {
    }
    getPincodeDetails(pin, title) {
        this.pin = pin;
        this.title = title;
        const data = {
            'platform': 'web',
            'postalcode': this.pin
        };
        if (this.pin.length == 6) {
            this.commonservices.getPincodeDetails(data).subscribe(
                (successData) => {
                    this.getPincodeDetailsSuccess(successData);
                },
                (error) => {
                    this.getPincodeDetailsFailure(error);
                }
            );
        }
    }
    public getPincodeDetailsSuccess(successData) {
        if (successData.ErrorObject) {
            this.toastr.error(successData.ErrorObject);
            this.pincodeErrors = false;
        } else {
            this.pincodeErrors = true;
        }
    }

    public getPincodeDetailsFailure(error) {
    }

    public data(event: any) {
        if (event.charCode !== 0) {
            const pattern = /[a-zA-Z\\ ]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }

    FireInsurer() {
        const dialogRef = this.dialog.open(FireInsurer, {
            width: '1200px',
        });
        dialogRef.disableClose = true;
    }



    // buy details
    buyDetails(value) {
        sessionStorage.pAccidentProposalList =  JSON.stringify(value);
        if (value.product_id == 14 || value.product_id == 15) {
            this.router.navigate(['/appollopa' + '/' + false]);
        } else if (value.product_id == 3) {
                this.router.navigate(['/personal-accident-religare' +'/' + false]);
            } else {
            if (value.product_id == 23) {
                this.router.navigate(['/hdfc-personalAccident'+'/' + false]);
            }
        }


    }
    // view key features details
    viewKeyList(value) {
        let dialogRef = this.dialog.open(ViewProductDetailsComponent, {
            width: '1500px', data: {productId : value.product_id, productName: value.product_name}
        });
        dialogRef.disableClose = true;

        dialogRef.afterClosed().subscribe(result => {
        });

    }
    personalInsurer() {
        const dialogRef = this.dialog.open(PersonalInsurer, {
            width: '1200px',
        });
        dialogRef.disableClose = true;
    }
}




@Component({
    selector: 'personalinsurer',
    template: `        
        <div class="container">
        <div  class="row text-justify">
        
            <div class="col-sm-2">
            </div>
            <div class="col-sm-8">
                <h3 class="text-center" style="color: #EF0034"><img src="assets/img/personal-accident.png" class="logo-size"> About Personal Accident</h3>
            </div>
            <div class="col-sm-2 text-right">
                <mat-icon (click)="onNoClick()" style="cursor: pointer">close</mat-icon>
            </div>
            <ol class="ml-4">
                <li>The benefit under the Personal Accidental Death section is payable when an Injury results in the loss of life of the Insured solely due to accidental injury.</li>
                <li>Accidental Injury means bodily injury caused solely and directly by violent, accidental, external and visible means and should necessarily occur during the Insured Period of 12 months from the date of inception of the policy.</li>
                <li>The definition of Injury does not extend to other non physical consequences such as mental, nervous or emotional disorders, depression or anxiety of any Accident and these are specifically  excluded in the Personal Accident  Policy</li>
                <li>The definition of Accident means a sudden, unforeseen and unexpected physical event caused by external, violent and visible means.</li>
                <li>The policy on opting the widest cover provides for weekly compensation benefit to the extent of 1 % of sum insured every week for approximately 100 weeks ( The percentage and number of weeks varies from insurer to insurer) till such time that the insured is able to resume his /  her normal activities.</li>
                <li>The Personal Accident policy has a coverage / compensation for Temporary Total Disablement and Temporary Partial Disablements on a fixed percentage basis if the insured opts with the TTD and TPD benefits apart from the death benefit.</li>
            </ol>
         </div>
        </div>`,
})
export class PersonalInsurer {

    constructor(
        public dialogRef: MatDialogRef<PersonalInsurer>,
        @Inject(MAT_DIALOG_DATA) public data: any) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

}

 // fire

@Component({
    selector: 'fireinsurer',
    template: `        
        <div class="container">
        <div  class="row text-justify">
        
            <div class="col-sm-2">
            </div>
            <div class="col-sm-8">
                <h3 class="text-center" style="color: #F44D00"><img src="assets/img/fire-insurance.png" class="logo-size"> About Fire Insurance</h3>
            </div>
            <div class="col-sm-2 text-right">
                <mat-icon (click)="onNoClick()" style="cursor: pointer">close</mat-icon>
            </div>
            <p>To insure the loss by fire or the risksincidental to fire we require a fire insurance policy. Fire policies are issued to buildings,furniture, fixtures and fittings, plant and machinery, stocks, stocks held in trust and such other items.</p>
            <p>A Standard Fire Policy can cover the loss or damage to the property insured caused by the perils of Fire, Lightning, Explosion/Implosion, Aircraft Damage, impact damage, Riot, Strike,Malicious damage, Terrorism , Storm, Cyclone, Typhoon, Hurricane, Tornado,Flood, Inundation, Impact damage, Subsidence and Landslide, Bursting and or overflowing of water tanks apparatus and pipes, Leakage from automatic sprinkler installations and so on.</p>
            <p>It is also possible to obtain certain additional covers which are available along with the Standard Fire Policy. Fire policies are generally issued for one year but residences can be issued for more than one year. It is possible to obtain fire policies for buildings under construction and for factories which are shut down wherein no manufacturing activity is carried on which are termed as a silent risks.</p>
            <p>There are special types of fire policies like Floater policies which are issued for stocks / raw material / finished stock which keep floating amongst various godowns, Declaration policies can be issued for stocks which keeps on fluctuating and  Floater Declaration policies are also available.</p>
            <p>There is a standard excess which has to be borne by the insured in a fire policy and there is a provision for voluntary excess also. The most important aspect in the event of a fire claim is that the origin of fire is not covered in the fire policy. To be more clear if the fire originates from a refrigerator the claim for the refrigerator is not payable under a fire policy although it would have been covered in the fire policy.</p>
         </div>
        </div>`,
})
export class FireInsurer {

    constructor(
        public dialogRef: MatDialogRef<FireInsurer>,
        @Inject(MAT_DIALOG_DATA) public data: any) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

}
