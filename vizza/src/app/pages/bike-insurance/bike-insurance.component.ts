import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonService} from '../../shared/services/common.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService} from 'ngx-toastr';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS} from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {ValidationService} from '../../shared/services/validation.service';
import {Settings} from '../../app.settings.model';
import {AppSettings} from '../../app.settings';
import {BikeInsuranceService} from '../../shared/services/bike-insurance.service';
import {AuthService} from '../../shared/services/auth.service';
import {EnquiryPopupComponent} from './enquiry-popup/enquiry-popup.component';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {ClearSessionPaService} from '../../shared/services/clear-session-pa.service';
import {ClearSessionMotorService} from '../../shared/services/clear-session-motor.service';
import {MetaService} from '../../shared/services/meta.service';
import {Meta, Title} from '@angular/platform-browser';
import { WINDOW } from '@ng-toolkit/universal';



export const MY_FORMATS = {
    parse: {
        dateInput: 'DD/MM/YYYY',
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MM YYYY',
        dateA11yLabel: 'DD/MM/YYYY',

        monthYearA11yLabel: 'MM YYYY',
    },
};

declare const global: any;
// tslint:disable-next-line:variable-name
const MouseEvent = (global as any).MouseEvent as MouseEvent;


@Component({
  selector: 'app-bike-insurance',
  templateUrl: './bike-insurance.component.html',
  styleUrls: ['./bike-insurance.component.scss'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ]
})
export class BikeInsuranceComponent implements OnInit {

    public bikeInsurance: FormGroup;
    public settings: Settings;
    public dobError: any;
    public bikeList: any;
    public claimDetails: any;
    public enquiry: any;
    public QuotationList: any;
    public registrationDate: any;
    public previousClaim: any;
    public previousPolicyExpiry: any;
    public previousPolicyStart: any;
    public bussinessList: any;
    public bussiness: any;
    public engine: any;
    public bikeEnquiryId: any;
    public dobStartError: any;
    public dobendError: any;
    public minDate: any;
    public currentTab: any;
    public typeList: any;
    public companyList: any;
    public getRtoDetails: any;
    public finalArray: any;
    public productList: any;
    public webhost: any;
    public listDetails: boolean;
    public expiry: boolean;
    public previousDate: boolean;
    public showSelf: boolean;
    public metaBike: any;
    public metaTitle: any;
    public metaKeyword: any;
    public metaDescription: any;
    public config:any;
    public vehicleRegNumber:any;
    public companyNameList:any;
    public regionDetails:any;
    public CityValid: any;
    public CompanyValid: any;
    public ClaimValid: any;
    public previousCompanyValid: boolean;
    public previousStartError: any;
    public registrationStartError: any;
    public lesserDate: any;

    constructor(@Inject(WINDOW) private window: Window, public fb: FormBuilder,  public datePipe: DatePipe, public configs: ConfigurationService, public validation: ValidationService, public datepipe: DatePipe, public route: ActivatedRoute, public auth: AuthService, public toastr: ToastrService, public dialog: MatDialog, public bikeService: BikeInsuranceService,  public appSettings: AppSettings, public router: Router, public commonservices: CommonService, public toast: ToastrService, public meta: MetaService, public metaTag: Meta, public titleService: Title) {
        this.settings = this.appSettings.settings;
        this.webhost = this.configs.getimgUrl();
        if (window.innerWidth < 787) {
            this.settings.HomeSidenavUserBlock = false;
            this.settings.sidenavIsOpened = false;
            this.settings.sidenavIsPinned = false;
        } else {
            this.settings.HomeSidenavUserBlock = true;
            this.settings.sidenavIsOpened = true;
            this.settings.sidenavIsPinned = true;
        }
        const minDate = new Date();
        this.minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
        const lateDate=minDate.getFullYear()-1;
        this.lesserDate = new Date(lateDate, minDate.getMonth(), minDate.getDate());

        this.listDetails = false;
        this.previousStartError = false;
        this.registrationStartError = false;
        this.config = {
            displayKey: "city", //if objects array passed which key to be displayed defaults to description
            search: true,
            limitTo: 5,
            // searchOnKey: 'city'
        };
        this.config = {
            displayKey: "previousCompany", //if objects array passed which key to be displayed defaults to description
            search: true,
            limitTo: 5
        };
        this.previousCompanyValid = false;
        // this.config = [];
        // this.config = {
        //     display: 'city',
        //     search : true,
        //     placeholder : 'RTO AREA',
        //     limitTo : 10,
        //     noResultsFound: 'No results found!',
        //     searchPlaceholder: 'Search',
        //     searchOnKey: this.getRtoDetails,
        // }
        this.CityValid = false;
        this.CompanyValid = false;
        this.ClaimValid = false;
        this.dobError = false;
        console.log(this.dobError,'dobError11111111');
        this.bikeInsurance = this.fb.group({
            'companyNameNew':'',
            'companyNameRenewel':'',
            'vehicalNumber': '',
            'registrationDate': '',
            'registrationDateNew': '',
            'previousClaim': '',
            'enquiry': '',
            'ncb': '',
            'previousPolicyExpiry': '',
            'previousPolicyStart': '',
            'previousCompany': '',
            'city': '',
        });
        this.expiry = false;
        this.showSelf = false;
        this.previousDate = true;
        // this.bikeInsurance.controls['city'].patchValue(null);
        // this.bikeInsurance.controls['previousCompany'].patchValue(null);
        // this.bikeInsurance.controls['previousClaim'].patchValue(null);
        this.typeList = 'new';
        if (this.typeList == 'new') {
           this.getType(0);
        } else{
            this.getType(1);
        }


    }
    ngOnInit() {

        // this.bikeInsurance.controls['city'].patchValue(null);
        // this.bikeInsurance.controls['previousCompany'].patchValue(null);
        // this.bikeInsurance.controls['previousClaim'].patchValue(null);
            // clear session for list page
        sessionStorage.enquiryFormData = '';
        sessionStorage.Rto = '';
        sessionStorage.bikeListDetails = '';
        sessionStorage.bikeEnquiryId = '';
        sessionStorage.setAllProductLists = '';
        sessionStorage.vehicledetails = '';
        sessionStorage.allProductLists = '';
        sessionStorage.initialProductList = '';
        sessionStorage.filterCompany = '';
        sessionStorage.premiumAmount = '';
        sessionStorage.premiumAmount1 = '';
        this.claimpercent();
        // this.bussinessType();
        this.changeCompanyName();
        this.getpreviousCompany();
        this.getCityLists();
        this.sessionData();
        this.metaList();
        this.getRegionLists();
        console.log(this.bikeInsurance.controls['city'].value,'hhhhh');

    }

    vechicleValue(){

        let stringToSplit;
        stringToSplit = this.bikeInsurance.controls['vehicalNumber'].value.toUpperCase();
        let x = stringToSplit.slice(0, 2);
        console.log(x,'x.....')
        let y = stringToSplit.slice(2, 4);
        console.log(y,'y.....')
        // let oo = stringToSplit.slice(5, 6);
        // console.log(oo,'oo.....')
        // let w = '';
        // let z = stringToSplit.slice(4, 6);
        // console.log(z,'z.....')
        // if (!isNaN(oo)) {
        //   let j = stringToSplit.slice(4, 5);
        //   console.log(j,'j...')
        //   w = stringToSplit.slice(5);
        //   console.log(w,'w.....')
        this.vehicleRegNumber = x.concat('-', y);
        console.log( this.vehicleRegNumber,'vehicleRegNumber.....')
        // } else {
        //   w = stringToSplit.slice(6);
        //   this.vehicleRegNumber = x.concat('-', y, '-', z, '-', w);
        //   console.log( this.vehicleRegNumber,'vehicleRegNumber1111.....')
        //
        // }
    }



    changeCompanyName() {
        this.settings.loadingSpinner = true;
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',

        }
        console.log(this.vehicleRegNumber,'this.vehicleRegNumber....')
        this.bikeService.getCompanyName(data).subscribe(
            (successData) => {
                this.CompanyNameNewSuccess(successData);
            },
            (error) => {
                this.CompanyNameNewFailure(error);
            }
        );
    }
    public CompanyNameNewSuccess(successData){
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {
            this.companyNameList = successData.ResponseObject;
            console.log(this.companyNameList,'companyNameList......');
            //
        }
    }
    public CompanyNameNewFailure(error) {
    }

    getRegionLists() {

        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
            'region_code':this.vehicleRegNumber,

        }
        console.log(this.vehicleRegNumber,'this.vehicleRegNumber....')
        this.bikeService.getRegionList(data).subscribe(
            (successData) => {
                this.regionSuccess(successData);
            },
            (error) => {
                this.regionFailure(error);
            }
        );
    }
    public regionSuccess(successData){
        if (successData.IsSuccess) {
            this.regionDetails = successData.ResponseObject;
            console.log(this.regionDetails,'regionDetails......');
            //
        }
    }
    public regionFailure(error) {
    }
    public metaList() {
        const data = {
            'platform': 'web',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'component_name': 'Motor Bike'
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
        this.metaBike = successData.ResponseObject[0];
        this.metaTitle = this.metaBike.title;
        this.metaKeyword = this.metaBike.keyword;
        this.metaDescription = this.metaBike.descrition;
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

    setSession() {
        sessionStorage.enquiryFormData = JSON.stringify(this.bikeInsurance.value);
    }
    rtoCity(){
        sessionStorage.Rto = this.bikeInsurance.controls['city'].value;
        console.log(sessionStorage.Rto,'sessionStorage.Rto');
    }
    sessionCompany(){
        sessionStorage.newCompanyName = this.bikeInsurance.controls['companyNameNew'].value;
        console.log(sessionStorage.newCompanyName, 'sessionStorage.newCompanyName');
        sessionStorage.typeList = this.typeList;
        console.log(sessionStorage.typeList, 'sessionStorage.newCompanyName');
    }
    sessionrenewelCompanyName(){
        sessionStorage.renewelCompanyName = this.bikeInsurance.controls['companyNameRenewel'].value;
        console.log(sessionStorage.renewelCompanyName, 'sessionStorage.renewelCompanyName');
        sessionStorage.typeList = this.typeList;
        console.log(sessionStorage.typeList, 'sessionStorage.newCompanyName');

    }
    changeNcbAmt() {
        if (this.bikeInsurance.controls['previousClaim'].value == 'No') {
            this.bikeInsurance.controls['ncb'].patchValue(this.bikeInsurance.controls['ncb'].value);

            this.bikeInsurance.controls['ncb'].setValidators([Validators.required]);
        } else {
            this.bikeInsurance.controls['ncb'].patchValue('');

            this.bikeInsurance.controls['ncb'].setValidators(null);

        }
        this.bikeInsurance.controls['ncb'].updateValueAndValidity();

    }


    nameValidate(event: any) {
        this.validation.nameValidate(event);
    }

    // Dob validation
    dobValidate(event: any) {
        this.validation.dobValidate(event);
    }

    // Number validation
    numberValidate(event: any) {
        this.validation.numberValidate(event);
    }



    getCityLists() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0'

        }
        this.bikeService.getRtoList(data).subscribe(
            (successData) => {
                this.citySuccess(successData);
            },
            (error) => {
                this.cityFailure(error);
            }
        );
    }
    public citySuccess(successData) {
        if (successData.IsSuccess) {
            this.getRtoDetails = successData.ResponseObject;
            console.log(this.getRtoDetails,'cityDetails......');
            //
        }
    }
    public cityFailure(error) {
    }


    public typeFailure(error) {
    }


    addEvent(event, type) {

        console.log(event, 'eventevent');
        let selectedDate = '';
        let dob = '';
        const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
        if (event.value != null) {

            dob = this.datepipe.transform(event.value, 'y-MM-dd');

            if (typeof event.value._i == 'string') {
                console.log('in');
                if (type == 'regitser') {
                    if (pattern.test(event.value._i) && event.value._i.length == 10 && this.bikeInsurance.controls['registrationDateNew'].value >= this.minDate) {
                        this.dobError = false;
                        this.dobError = '';
                    } else {
                        this.dobError = true;
                        this.dobError = 'Enter Valid Date';

                    }
                }
            } else if (typeof event.value._i == 'object') {
                this.dobError = '';
                this.dobError = false;

                if (type == 'regitser') {
                    this.dobError = '';
                    this.dobError = false;
                    console.log('out');
                    if (pattern.test(event.value._i) && event.value._i.length == 10 && this.bikeInsurance.controls['registrationDateNew'].value >= this.minDate) {
                        this.dobError = '';
                        this.dobError = false;
                    }
                }
            }
            console.log(this.dobError, 'this.dobError');
        }
    }

    registrationStart(){
        if(this.lesserDate > this.bikeInsurance.controls['registrationDate'].value ){
            this.registrationStartError=false;
            this.registrationStartError='';
        }else{
            this.registrationStartError=true;
            this.registrationStartError='Registration Date should be lesser than Current Date';
        }
    }

    previousStart(){
        if(this.bikeInsurance.controls['previousPolicyStart'].value > this.bikeInsurance.controls['registrationDate'].value ){
            this.previousStartError=false;
            this.previousStartError='';
        }else{
            this.previousStartError=true;
            this.previousStartError='previous policy start Date should be greater than register Date';
        }
    }


    addstart(event) {
        if (event.value != null) {
            let selectedDate = '';
            let dob = '';
            const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
            if (typeof event.value._i == 'string') {
                if (pattern.test(event.value._i) && event.value._i.length == 10) {
                    this.dobStartError = '';
                }
                else {
                    this.dobStartError = 'Enter Valid Date';
                }

            }
        }

    }

    addend(event) {
        if (event.value != null) {
            let selectedDate = '';
            let dob = '';
            const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
            if (typeof event.value._i == 'string') {
                if (pattern.test(event.value._i) && event.value._i.length == 10) {
                    this.dobendError = '';
                } else {
                    this.dobendError = 'Enter Valid Date';
                }

            }
        }
    }
    rtoError(){
        // alert('inn')
        if ((this.bikeInsurance.controls['city'].value==''||this.bikeInsurance.controls['city'].value==undefined||this.bikeInsurance.controls['city'].value==null)&&this.typeList == 'new') {
            // alert(this.bikeInsurance.controls['city'].value)
            this.CityValid=true;
            this.CityValid = 'Please Select RTO AREA';

        } else {
                this.CityValid=false;
                this.CityValid='';
        }
        console.log(this.CityValid,'this.CityValid///')
    }
    companyError(){
        // alert('inn')
        if ((this.bikeInsurance.controls['previousCompany'].value==''||this.bikeInsurance.controls['previousCompany'].value==undefined||this.bikeInsurance.controls['previousCompany'].value==null)&&this.typeList != 'new') {
            // alert(this.bikeInsurance.controls['previousCompany'].value)
            this.CompanyValid=true;
            this.CompanyValid = 'Please Select Previous Company';

        } else {
            this.CompanyValid=false;
            this.CompanyValid='';
        }
        console.log(this.CompanyValid,'this.CompanyValid///')
    }
    claimError(){
        // alert('inn')
        if ((this.bikeInsurance.controls['previousClaim'].value==''||this.bikeInsurance.controls['previousClaim'].value==undefined||this.bikeInsurance.controls['previousClaim'].value==null)&&this.typeList != 'new') {
            // alert(this.bikeInsurance.controls['previousClaim'].value)
            this.ClaimValid=true;
            this.ClaimValid = 'Please Select Previous Claim';

        } else {
            this.ClaimValid=false;
            this.ClaimValid='';
        }
        console.log(this.ClaimValid,'this.ClaimValid///')
    }
    yearCalculate(dob) {
        let today = new Date();
        let birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        let dd = today.getDate() - birthDate.getDate();
        if (m < 0 || m == 0 && today.getDate() < birthDate.getDate()) {
            age = age - 1;
        }
        return age;
    }

    // home bike
    quationFirstStep(value) {
        console.log(value,'value');
        sessionStorage.enquiryFormData = JSON.stringify(value);
        if ((this.bikeInsurance.controls['city'].value==''||this.bikeInsurance.controls['city'].value==undefined||this.bikeInsurance.controls['city'].value==null)&&this.typeList == 'new') {
            this.CityValid=true;
            this.CityValid = 'Please Select RTO AREA';

        } else {
            this.CityValid=false;
            this.CityValid='';
        }
        console.log(this.CityValid,'this.CityValid///')
        if ((this.bikeInsurance.controls['previousCompany'].value==''||this.bikeInsurance.controls['previousCompany'].value==undefined||this.bikeInsurance.controls['previousCompany'].value==null)&&this.typeList != 'new') {
            // alert(this.bikeInsurance.controls['previousCompany'].value)
            this.CompanyValid=true;
            this.CompanyValid = 'Please Select Previous Company';

        } else {
            this.CompanyValid=false;
            this.CompanyValid='';
        }
        console.log(this.CompanyValid,'this.CompanyValid///')
        if ((this.bikeInsurance.controls['previousClaim'].value==''||this.bikeInsurance.controls['previousClaim'].value==undefined||this.bikeInsurance.controls['previousClaim'].value==null)&&this.typeList != 'new') {
            // alert(this.bikeInsurance.controls['previousClaim'].value)
            this.ClaimValid=true;
            this.ClaimValid = 'Please Select Previous Claim';

        } else {
            this.ClaimValid=false;
            this.ClaimValid='';
        }
        console.log(this.ClaimValid,'this.ClaimValid///')

        const data = {
            "platform": "web",
            "created_by": "0",
            "role_id": this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
            "user_id": this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            "enquiry_id": 0,
            "pos_status": this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
            "vehicle_no": this.bikeInsurance.controls['vehicalNumber'].value ? this.bikeInsurance.controls['vehicalNumber'].value : '',
            "registration_date": this.datepipe.transform(this.bikeInsurance.controls['registrationDate'].value, 'y-MM-dd') ? this.datepipe.transform(this.bikeInsurance.controls['registrationDate'].value, 'y-MM-dd') : this.datepipe.transform(this.bikeInsurance.controls['registrationDateNew'].value, 'y-MM-dd'),
            "previous_claim_YN": this.bikeInsurance.controls['previousClaim'].value == 'No' ? '0' : '1',
            "previous_policy_expiry_date": this.bikeInsurance.controls['previousPolicyExpiry'].value ==''||this.bikeInsurance.controls['previousPolicyExpiry'].value ==undefined||this.bikeInsurance.controls['previousPolicyExpiry'].value ==null? '' : this.datepipe.transform(this.bikeInsurance.controls['previousPolicyExpiry'].value, 'y-MM-dd'),
            "previous_policy_start_date": this.bikeInsurance.controls['previousPolicyStart'].value ==''||this.bikeInsurance.controls['previousPolicyStart'].value ==undefined||this.bikeInsurance.controls['previousPolicyStart'].value ==null ? '' : this.datePipe.transform(this.bikeInsurance.controls['previousPolicyStart'].value, 'y-MM-dd'),
            "type": this.typeList,
            "ncb_percent": this.bikeInsurance.controls['ncb'].value ? this.bikeInsurance.controls['ncb'].value : '0',
            "prev_insurance_name": this.bikeInsurance.controls['previousCompany'].value==null||undefined ?'': this.bikeInsurance.controls['previousCompany'].value,
        }
        console.log(data, 'data');
        console.log(this.bikeInsurance,'bikegroup');

        console.log(this.bikeInsurance.valid,'valuevalid');
        if(this.bikeInsurance.valid && (this.CityValid==false && this.CompanyValid==false && this.ClaimValid==false&&this.previousStartError==false&&this.registrationStartError==false)) {

            this.bikeService.getMotorHomeDetails(data).subscribe(
                (successData) => {
                    this.bikeDetailsSuccess(successData, data);
                },
                (error) => {
                    this.bikeDetailsFailure(error);
                }
            );

        }else{
            this.toastr.error('Please select the Mandatory field');

        }
    }

    public bikeDetailsSuccess(successData, data) {
        if (successData.IsSuccess) {
            this.bikeList = successData.ResponseObject;
            console.log(this.bikeList, 'hgdj');
            this.enquiry = this.bikeList;
            sessionStorage.bikeListDetails = JSON.stringify(this.bikeList);
            sessionStorage.bikeEnquiryId = this.bikeList.enquiry_id;
            sessionStorage.enquiryFormData = JSON.stringify(data);
            if (this.bikeInsurance.valid) {
                let dialogRef = this.dialog.open(EnquiryPopupComponent, {
                width: '1500px', data: {listData: successData.ResponseObject, disableClose: true},
                height: '500px'
            })
            dialogRef.disableClose = true;
            dialogRef.afterClosed().subscribe(result => {
            });

            }

        } else {
            this.toastr.error(successData.ErrorObject);
         }
    }

    public bikeDetailsFailure(error) {
    }

    claimpercent() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0'

        }
        this.bikeService.getClaimList(data).subscribe(
            (successData) => {
                this.claimSuccess(successData);
            },
            (error) => {
                this.claimFailure(error);
            }
        );
    }

    public claimSuccess(successData) {
        if (successData.IsSuccess) {
            this.claimDetails = successData.ResponseObject;
        }
    }

    public claimFailure(error) {
    }
    // previous company
    getpreviousCompany() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0'

        }
        this.bikeService.getCompanyDetails(data).subscribe(
            (successData) => {
                this.companySuccess(successData);
            },
            (error) => {
                this.companyFailure(error);
            }
        );
    }

    public companySuccess(successData) {
        if (successData.IsSuccess) {
            this.companyList = successData.ResponseObject;
        }
    }

    public companyFailure(error) {
    }


    idValidate(event: any) {
        this.validation.idValidate(event);
    }

    sessionData() {
        if (sessionStorage.enquiryFormData != '' && sessionStorage.enquiryFormData != undefined) {
            let stepper = JSON.parse(sessionStorage.enquiryFormData);
            console.log(stepper,'stepper');
            console.log(stepper.previousClaim,'stepper.previousClaim');
            this.bikeInsurance = this.fb.group({
                'vehicalNumber': stepper.vehicalNumber,
                'registrationDate': this.datePipe.transform(stepper.registrationDate, 'y-MM-dd'),
                'registrationDateNew': this.datePipe.transform(stepper.registrationDateNew, 'y-MM-dd'),
                'previousClaim': stepper.previousClaim,
                'enquiry': stepper.enquiry,
                'ncb': stepper.ncb,
                'previousPolicyExpiry': this.datePipe.transform(stepper.previousPolicyExpiry, 'y-MM-dd'),
                'previousPolicyStart': this.datePipe.transform(stepper.previousPolicyStart, 'y-MM-dd'),
                'previousCompany': stepper.previousCompany,
                'city': stepper.city,
                'companyNameNew': stepper.companyNameNew,
                'companyNameRenewel': stepper.companyNameRenewel,
            });

        }
        if (sessionStorage.bikeEnquiryId != '' && sessionStorage.bikeEnquiryId != undefined) {
            this.bikeEnquiryId = sessionStorage.bikeEnquiryId;
        }
           if (sessionStorage.setAllProductLists != '' && sessionStorage.setAllProductLists != undefined) {
               sessionStorage.setAllProductLists = [];
           }
    }


    getType(event) {
        console.log(event, 'value');
        this.typeList = '';
        if (event == 0) {
            this.typeList = 'new'
            // alert(this.typeList)
            this.bikeInsurance.controls['registrationDateNew'].setValidators([Validators.required]);
            this.bikeInsurance.controls['companyNameNew'].setValidators([Validators.required]);
            this.bikeInsurance.controls['city'].setValidators([Validators.required]);
            this.dobError=false;

            this.bikeInsurance.controls['companyNameRenewel'].setValidators(null);
            this.bikeInsurance.controls['companyNameRenewel'].patchValue('');

            this.bikeInsurance.controls['previousPolicyExpiry'].setValidators(null);
            this.bikeInsurance.controls['previousPolicyExpiry'].patchValue('');

            this.bikeInsurance.controls['previousPolicyStart'].setValidators(null);
            this.bikeInsurance.controls['previousPolicyStart'].patchValue('');


            this.bikeInsurance.controls['registrationDate'].setValidators(null);
            this.bikeInsurance.controls['registrationDate'].patchValue('');

            this.bikeInsurance.controls['previousCompany'].setValidators(null);
            this.bikeInsurance.controls['previousCompany'].patchValue('');

            this.bikeInsurance.controls['vehicalNumber'].setValidators(null);
            this.bikeInsurance.controls['vehicalNumber'].patchValue('');


            this.bikeInsurance.controls['previousClaim'].setValidators(null);
            this.bikeInsurance.controls['previousClaim'].patchValue('');



        } else if(event == 1) {
            this.typeList = 'other'
            // alert(this.typeList)
            this.bikeInsurance.controls['registrationDate'].setValidators([Validators.required]);
            this.bikeInsurance.controls['companyNameRenewel'].setValidators([Validators.required]);
            this.bikeInsurance.controls['previousPolicyExpiry'].setValidators([Validators.required]);
            this.bikeInsurance.controls['previousPolicyStart'].setValidators([Validators.required]);
            this.bikeInsurance.controls['vehicalNumber'].setValidators(Validators.compose([Validators.minLength(9), Validators.pattern('([a-zA-Z]){2}([0-9]){2}([a-zA-Z0-9]){6}')]));
            this.bikeInsurance.controls['previousCompany'].setValidators([Validators.required]);
            this.bikeInsurance.controls['previousClaim'].setValidators([Validators.required]);

            this.bikeInsurance.controls['registrationDateNew'].setValidators(null);
            this.bikeInsurance.controls['companyNameNew'].setValidators(null);
            this.bikeInsurance.controls['city'].setValidators(null);
            this.bikeInsurance.controls['registrationDateNew'].patchValue('');
            this.bikeInsurance.controls['companyNameNew'].patchValue('');
            this.bikeInsurance.controls['city'].patchValue('');
            this.dobError=''
        }
        this.bikeInsurance.controls['registrationDateNew'].updateValueAndValidity();
        this.bikeInsurance.controls['companyNameNew'].updateValueAndValidity();
        this.bikeInsurance.controls['city'].updateValueAndValidity();

        this.bikeInsurance.controls['registrationDate'].updateValueAndValidity();
        this.bikeInsurance.controls['companyNameRenewel'].updateValueAndValidity();
        this.bikeInsurance.controls['previousPolicyExpiry'].updateValueAndValidity();
        this.bikeInsurance.controls['previousPolicyStart'].updateValueAndValidity();
        this.bikeInsurance.controls['vehicalNumber'].updateValueAndValidity();
        this.bikeInsurance.controls['previousCompany'].updateValueAndValidity();
        this.bikeInsurance.controls['previousClaim'].updateValueAndValidity();


        // if (event == 0) {
        //     this.typeList = 'new';
        //     console.log(this.typeList,'0');
        //         this.bikeInsurance.controls['registrationDateNew'].setValidators([Validators.required]);
        //
        //
        //     this.bikeInsurance.controls['city'].setValidators([Validators.required]);
        //
        //     this.bikeInsurance.controls['registrationDate'].setValidators(null);
        //     this.bikeInsurance.controls['registrationDate'].patchValue('');
        //
        //     this.bikeInsurance.controls['previousPolicyExpiry'].setValidators(null);
        //     this.bikeInsurance.controls['previousPolicyExpiry'].patchValue('');
        //
        //     this.bikeInsurance.controls['previousPolicyStart'].setValidators(null);
        //     this.bikeInsurance.controls['previousPolicyStart'].patchValue('');
        //
        //     this.bikeInsurance.controls['previousCompany'].setValidators(null);
        //     this.bikeInsurance.controls['previousCompany'].patchValue('');
        //
        //     this.bikeInsurance.controls['vehicalNumber'].setValidators(null);
        //     this.bikeInsurance.controls['vehicalNumber'].patchValue('');
        //
        //     this.bikeInsurance.controls['previousCompany'].setValidators(null);
        //     this.bikeInsurance.controls['previousCompany'].patchValue('');
        //
        //     this.bikeInsurance.controls['vehicalNumber'].setValidators(null);
        //     this.bikeInsurance.controls['vehicalNumber'].patchValue('');
        //
        //
        //     this.bikeInsurance.controls['previousClaim'].setValidators(null);
        //     this.bikeInsurance.controls['previousClaim'].patchValue('');
        //
        //
        //     this.bikeInsurance.controls['registrationDateNew'].updateValueAndValidity();
        //     this.bikeInsurance.controls['city'].updateValueAndValidity();
        //     this.bikeInsurance.controls['registrationDate'].updateValueAndValidity();
        //     this.bikeInsurance.controls['previousPolicyExpiry'].updateValueAndValidity();
        //     this.bikeInsurance.controls['previousPolicyStart'].updateValueAndValidity();
        //     this.bikeInsurance.controls['previousCompany'].updateValueAndValidity();
        //     this.bikeInsurance.controls['vehicalNumber'].updateValueAndValidity();
        //     this.bikeInsurance.controls['previousClaim'].updateValueAndValidity();
        //
        //
        //
        // } else if(event == 1) {
        //     this.typeList = 'other';
        //     console.log(this.typeList,'1');
        //
        //     this.bikeInsurance.controls['registrationDate'].setValidators([Validators.required]);
        //
        //     // this.bikeInsurance.controls['vehicalNumber'].setValidators(Validators.compose([Validators.pattern('([a-zA-Z]){2}([0-9]){2}([a-zA-Z0-9]){6}')]));
        //
        //     this.bikeInsurance.controls['previousPolicyExpiry'].setValidators([Validators.required]);
        //
        //     this.bikeInsurance.controls['previousPolicyStart'].setValidators([Validators.required]);
        //
        //
        //     this.bikeInsurance.controls['previousCompany'].setValidators([Validators.required]);
        //
        //     this.bikeInsurance.controls['previousClaim'].setValidators([Validators.required]);
        //     this.bikeInsurance.controls['city'].setValidators(null);
        //     this.bikeInsurance.controls['city'].patchValue('');
        //
        //
        //     this.bikeInsurance.controls['registrationDateNew'].setValidators(null);
        //     this.bikeInsurance.controls['registrationDateNew'].patchValue('');
        //
        //     this.bikeInsurance.controls['registrationDateNew'].updateValueAndValidity();
        //     this.bikeInsurance.controls['city'].updateValueAndValidity();
        //     this.bikeInsurance.controls['registrationDate'].updateValueAndValidity();
        //     this.bikeInsurance.controls['previousPolicyExpiry'].updateValueAndValidity();
        //     this.bikeInsurance.controls['previousPolicyStart'].updateValueAndValidity();
        //     this.bikeInsurance.controls['previousCompany'].updateValueAndValidity();
        //     this.bikeInsurance.controls['previousClaim'].updateValueAndValidity();
        //
        // }




    }
    vehicaleValidate(){
        console.log(this.bikeInsurance.controls['vehicalNumber'].value.length, 'this.bikeInsurance.controls[\'vehicalNumber\'].value.length');
        if(this.bikeInsurance.controls['vehicalNumber'].value.length == 9){
            console.log('in');
            this.bikeInsurance.controls['vehicalNumber'].setValidators(Validators.compose([Validators.pattern('[a-zA-Z]{2}[0-9]{2}[a-zA-Z0-9]{5}')]));
            this.bikeInsurance.controls['vehicalNumber'].updateValueAndValidity();

        } else if(this.bikeInsurance.controls['vehicalNumber'].value.length == 10) {
            console.log('out');
            this.bikeInsurance.controls['vehicalNumber'].setValidators(Validators.compose([Validators.pattern('([a-zA-Z]){2}([0-9]){2}([a-zA-Z0-9]){6}')]));
            this.bikeInsurance.controls['vehicalNumber'].updateValueAndValidity();

        }
    }
    bikeinsurer(){
        const dialogRef = this.dialog.open(BikeInsurer, {
            width: '1200px',
        });
        dialogRef.disableClose = true;
    }
}
@Component({
    selector: 'bikeinsurer',
    template: `        
        <div class="container">
        <div  class="row text-justify">
        
            <div class="col-sm-2">
            </div>
            <div class="col-sm-8">
                <h4 class="text-center" style="color: #6A6477 "><img src="assets/img/bike-insurance.png" class="logo-size"> About Bike Insurance</h4>
            </div>
            <div class="col-sm-2 text-right">
                <mat-icon (click)="onNoClick()" style="cursor: pointer">close</mat-icon>
            </div>
            <p>The owners of motor vehicles are not aware of  the important aspects of the risks andliabilities associated with owning and /or driving a  motor vehicle. Even though the Motor insurance policies can be bought or renewed online through internet the renewal dates are missed and the vehicle plies on the road without insurance. It is essential to know that as the owner of the vehicle the liability if any in the event of an accident rests on the motor vehicle owner and all negligence arising out of driving is with the driver. </p>
            <p>The motor vehicle insurance has two parts</p>
            <ol class="pl-5" type="i">
                <li>The Own damage portion which takes care of damages and theft of the vehicle</li>
                <li>The liability portion which takes care of liabilities arising at the time of an accident. The Third party damages could be Third party injury, Third party property damages, injury or death of the driver / conductor / cleaner / coolies. If the vehicle is not adequately insured the owner and the driver of the vehicle are at a huge risk from all angles.</li>
            </ol>
            <p>The introduction of long term Third party liability insurance in India is to be considered as a blessing in disguise to some extent. At the same time the probabilities of the risk of forgetting to renew the liability insurance prior to its expiry increases. The Own damage portion is also anticipating a change in the existing pattern very shortly. Motor vehicle insurance has also seen a slight betterment in tune with the international standards like the bumper to bumper cover.</p>
            <p>Please feel free to get in touch with us for any help in motor vehicle insurance. You can contact us by email at cutomercare@vizzafin.comFOR ALL RENEWALS AND MOTOR VEHICLE INSURANCE RELATED QUERIES.</p>
         </div>
        </div>`,
})
export class BikeInsurer {

    constructor(
        public dialogRef: MatDialogRef<BikeInsurer>,
        @Inject(MAT_DIALOG_DATA) public data: any) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

}
