import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {CommonService} from '../../shared/services/common.service';
import {ToastrService} from 'ngx-toastr';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {AuthService} from '../../shared/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MomentDateAdapter} from "@angular/material-moment-adapter";
import {DatePipe} from '@angular/common';
import * as moment from 'moment';
import {TravelService} from '../../shared/services/travel.service';
import {PersonalInsurer} from '../personal-accident-home/personal-accident-home.component';
import { ValidationService} from '../../shared/services/validation.service';
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
  selector: 'app-travel-home',
  templateUrl: './travel-home.component.html',
  styleUrls: ['./travel-home.component.scss'],
  providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class TravelHomeComponent implements OnInit {
    @ViewChild('typedValueCountry') typedValueHistoryVariable;

    selfArray: any;
    familyArray: any;
    studentArray: any;
    groupArray: any;
    value: any;
    showSelf: boolean;
    showGroup: boolean;
    showstudent: boolean;
    Child3BTn: boolean;
    FatherBTn: boolean;
    MotherBTn: boolean;
    AddFamilyBTN: boolean;
    Member5BTn: boolean;
    Member6BTn: boolean;
    Member7BTn: boolean;
    Member8BTn: boolean;
    Member9BTn: boolean;
    Member10BTn: boolean;
    Student5BTn: boolean;
    Student6BTn: boolean;
    Student7BTn: boolean;
    Student8BTn: boolean;
    Student9BTn: boolean;
    Student10BTn: boolean;

    count: any;
    sumInsuredAmountLists: any;
    currentTab: any;
    maxDate: any;
    startDateError: any;
    endDateError: any;
    today: any;
    daysCount: any;
    multipleTripe: any;

    selectedAmountTravel: any;
    travelType: any;
    startDate: any;
    endDate: any;
    travelPlan: any;
    medicalCondition: any;
    finalData: any;
    sumerror: any;
    duration: any;
    medicalerror: any;
    showFamily: boolean;
    daysBookingCount: any
    public settings: Settings;
    getAllcountryList: any;
    insuranceLists: any;

    // fire
    show: any;
    public fireapp: FormGroup;
    public setDate: any;
    public selectDate: any;
    public productName: any;
    public pin: any;
    public title: any;
    public response: any;
    public pincodeErrors: any;
    public pincode: any;
    public pinerror: boolean;
    public sem: any;
    public webhost: any;
    public courseDuration: any;
    public travelUserType: boolean;
    public startDateRequired: boolean;
    public endDateRequired: boolean;
    public plcaeOfVisitError: boolean;
    public travelTypeError: boolean;
    public enquiryDetails: any;
    public studentDuration: boolean;
    public travelProceed: boolean;
    metaTravel : any;
    metaTitle : any;
    metaKeyword: any;
    metaDescription: any;

    constructor(@Inject(WINDOW) private window: Window, public appSettings: AppSettings, public router: Router, public config: ConfigurationService, public fb: FormBuilder, public dialog: MatDialog, public travel: TravelService, public toast: ToastrService, public auth: AuthService, public datePipe: DatePipe, public validation: ValidationService, public datepipe: DatePipe, public commonservices: CommonService,  public route: ActivatedRoute, public meta: MetaService, public metaTag: Meta, private titleService: Title) {
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
        this.showSelf = true;
        this.showFamily = false;
        this.showGroup = false;
        this.showstudent = false;
        this.multipleTripe = false;
        this.selfDetails();
        this.familyDetails();
        // this.studentDetails();
        // this.groupDetails();
        this.getAllcountryLists();
        this.sumInsuredAmonut();
        this.currentTab = 'self';
        this.travelUserType = false;
        sessionStorage.travelUserType = this.travelUserType;
        let today = new Date();
        this.today = new Date(today.getFullYear(), today.getMonth(), today.getDate() +1);
        this.maxDate = this.today;

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
    }

    ngOnInit() {
        sessionStorage.selfArray = '';
        sessionStorage.familyArray = '';
        sessionStorage.studentArray = '';
        sessionStorage.selectedAmountTravel = '';
        sessionStorage.Child3BTn = '';
        sessionStorage.FatherBTn = '';
        sessionStorage.Member6BTn = '';
        sessionStorage.Member7BTn = '';
        sessionStorage.Member8BTn = '';
        sessionStorage.Member9BTn = '';
        sessionStorage.Member10BTn = '';
        sessionStorage.Student5BTn = '';
        sessionStorage.Student6BTn = '';
        sessionStorage.Student7BTn = '';
        sessionStorage.Student8BTn = '';
        sessionStorage.Student9BTn = '';
        sessionStorage.Student10BTn = '';
        sessionStorage.startDate = '';
        sessionStorage.endDate = '';
        sessionStorage.travelType = '';
        sessionStorage.travelPlan = '';
        sessionStorage.duration = '';
        sessionStorage.medicalCondition = '';
        sessionStorage.allTravelPremiumLists = '';
        sessionStorage.travelPremiumList = '';
        sessionStorage.stepper1DetailsForTravel = '';
        sessionStorage.stepper2DetailsForTravel = '';
        sessionStorage.proposerAgeForTravel = '';
        sessionStorage.mobileNumberForTravel = '';
        sessionStorage.daysCount = '';
        sessionStorage.pincode = '';
        sessionStorage.travelUserType = '';
        // clear session for list page
        sessionStorage.enquiryDetailsTravel = '';
        sessionStorage.filterCompany = '';
        sessionStorage.allTravelPremiumLists = '';
        sessionStorage.allProductLists = '';
        sessionStorage.changeSuninsuredAmount = '';
        this.courseDuration = '';
        this.sem = '';
        // fire
        this.show = this.config.getTravelInsurance();
        this.setDate = Date.now();
        this.setDate = this.datepipe.transform(this.setDate, 'y-MM-dd');
        this.route.params.forEach((params) => {
            this.productName = params.id;

        });
        this.startDateRequired = false;
        this.endDateRequired = false;
        this.plcaeOfVisitError = false;
        this.travelTypeError = false;
        this.studentDuration = false;
        this.travelProceed = true;


        this.Child3BTn = true;
        this.FatherBTn = true;
        this.MotherBTn = true;
        this.AddFamilyBTN = true;
        this.Member5BTn = true;
        this.Member6BTn = true;
        this.Member7BTn = true;
        this.Member8BTn = true;
        this.Member9BTn = true;
        this.Member10BTn = true;
        this.Student5BTn = true;
        this.Student6BTn = true;
        this.Student7BTn = true;
        this.Student8BTn = true;
        this.Student9BTn = true;
        this.Student10BTn = true;
        this.count = 0;
        this.sessionData();
        this.metaList();
    }

    public metaList() {
        const data = {
            'platform': 'web',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'component_name': 'Travel'
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
        this.metaTravel = successData.ResponseObject[0];
        this.metaTitle = this.metaTravel.title;
        this.metaKeyword = this.metaTravel.keyword;
        this.metaDescription = this.metaTravel.descrition;
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

    selfDetails() {
        this.selfArray = [
            {name: 'Self', age: '', disabled: false, checked: false, required: true, error: ''}
        ];
    }
    familyDetails() {
        this.familyArray = [
            {name: 'Self', age: '', disabled: false, checked: false, required: true, error: ''},
            {name: 'Spouse', age: '', disabled: false, checked: false, required: false, error: ''},
            {name: 'Child1', age: '', disabled: false, checked: false, required: false, error: ''},
            {name: 'Child2', age: '', disabled: false, checked: false, required: false, error: ''}
        ];
    }
    // groupDetails() {
    //     this.groupArray = [
    //         {name: 'Member1', age: '', disabled: false, checked: false, required: true, error: ''},
    //         {name: 'Member2', age: '', disabled: false, checked: false, required: true, error: ''},
    //         {name: 'Member3', age: '', disabled: false, checked: false, required: true, error: ''},
    //         {name: 'Member4', age: '', disabled: false, checked: false, required: true, error: ''}
    //     ];
    // }
    // studentDetails() {
    //     this.studentArray = [
    //         {name: 'Student1', age: '', disabled: false, checked: false, required: true, error: ''},
    //         {name: 'Student2', age: '', disabled: false, checked: false, required: false, error: ''},
    //         {name: 'Student3', age: '', disabled: false, checked: false, required: false, error: ''},
    //         {name: 'Student4', age: '', disabled: false, checked: false, required: false, error: ''}
    //     ];
    // }
    public keyPress(event: any) {
        if (event.charCode !== 0) {
            const pattern = /[0-9]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }
    dobValidate(event: any){
        this.validation.dobValidate(event);
    }
    // this function will get the sum insured amounts
    public sumInsuredAmonut(): void {
        const data = {
            'platform': 'web',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0'
        };
        this.travel.getTravelSumInsuredAmount(data).subscribe(
            (successData) => {
                this.getSumInsuredAmountSuccess(successData);
            },
            (error) => {
                this.getSumInsuredAmountFailure(error);
            });
    }
    public getSumInsuredAmountSuccess(successData) {
        if (successData.IsSuccess) {
            this.sumInsuredAmountLists = successData.ResponseObject;
        }
    }
    public getSumInsuredAmountFailure(error) {
        console.log(error, 'error');
    }
    selectedSumAmount() {
        sessionStorage.selectedAmountTravel = this.selectedAmountTravel;
    }
    refresh() {
        this.selectedAmountTravel = '';
        this.travelType = '';
        this.travelPlan = '';
        this.duration = '';
        this.startDate = '';
        this.endDate = '';
        this.daysCount = '';
        this.maxDate = this.today;
        this.medicalCondition = '';
        this.pincode = '';
        this.travelUserType = false;
        this.Child3BTn = false;
        this.FatherBTn = false;
        this.MotherBTn = false;
        this.Member5BTn = false;
        this.Member6BTn = false;
        this.Member7BTn = false;
        this.Member8BTn = false;
        this.Member9BTn = false;
        this.Member10BTn = false;
        this.Student5BTn = false;
        this.Student6BTn = false;
        this.Student7BTn = false;
        this.Student8BTn = false;
        this.Student9BTn = false;
        this.Student10BTn = false;
        this.selfDetails();
        this.familyDetails();
        // this.groupDetails();
        // this.studentDetails();
        sessionStorage.selfArray = '';
        sessionStorage.familyArray = '';
        sessionStorage.studentArray = '';
        sessionStorage.selectedAmountTravel = '';
        sessionStorage.Child3BTn = '';
        sessionStorage.FatherBTn = '';
        sessionStorage.Member6BTn = '';
        sessionStorage.Member7BTn = '';
        sessionStorage.Member8BTn = '';
        sessionStorage.Member9BTn = '';
        sessionStorage.Member10BTn = '';
        sessionStorage.Student5BTn = '';
        sessionStorage.Student6BTn = '';
        sessionStorage.Student7BTn = '';
        sessionStorage.Student8BTn = '';
        sessionStorage.Student9BTn = '';
        sessionStorage.Student10BTn = '';
        sessionStorage.startDate = '';
        sessionStorage.endDate = '';
        sessionStorage.travelType = '';
        sessionStorage.travelPlan = '';
        sessionStorage.duration = '';
        sessionStorage.medicalCondition = '';
        sessionStorage.allTravelPremiumLists = '';
        sessionStorage.travelPremiumList = '';
        sessionStorage.stepper1DetailsForTravel = '';
        sessionStorage.stepper2DetailsForTravel = '';
        sessionStorage.proposerAgeForTravel = '';
        sessionStorage.mobileNumberForTravel = '';
        sessionStorage.daysCount = '';
        sessionStorage.pincode = '';
        sessionStorage.travelUserType = '';
    }
    getAllcountryLists() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': '0'
        }
        this.travel.getAllcountry(data).subscribe(
            (successData) => {
                this.countrySuccess(successData);
            },
            (error) => {
                this.contryFailure(error);
            }
        );

    }
    public countrySuccess(successData) {
        console.log(successData.ResponseObject);
        if (successData.IsSuccess) {
            this.getAllcountryList = successData.ResponseObject;
        } else {
        }
    }
    public contryFailure(error) {
        console.log(error);
    }

    onSelectedIndexChange(event) {
        console.log(event, 'value');
        this.currentTab = '';
        if (event == 0) {
            this.selectedAmountTravel='';
            this.startDate='';
            this.endDate='';
            this.daysCount='';
            this.travelPlan='';
            this.travelType='';
            this.duration='';
            this.medicalCondition='';
            this.pincode='';

            this.currentTab = 'self';
            this.selfDetails();
            this.showSelf = true;
            this.showFamily = false;
            this.showGroup = false;
            this.showstudent = false;
        } else if (event == 1) {
            this.selectedAmountTravel='';
            this.startDate='';
            this.endDate='';
            this.daysCount='';
            this.travelPlan='';
            this.travelType='';
            this.duration='';
            this.medicalCondition='';
            this.pincode='';

            this.currentTab = 'family';
            this.familyDetails();
            this.showSelf = false;
            this.showFamily = true;
            this.showGroup = false;
            this.showstudent = false;
            this.travelUserType = false;
            console.log(this.travelPlan, 'travelPlantravelPlan');
        }
    //     console.log(event, 'value');
    //     this.typeList = '';
    //     if (event == 0) {
    //         this.typeList = 'new'
    //         // alert(this.typeList)
    //         this.bikeInsurance.controls['registrationDateNew'].setValidators([Validators.required]);
    //         this.bikeInsurance.controls['companyNameNew'].setValidators([Validators.required]);
    //         this.bikeInsurance.controls['city'].setValidators([Validators.required]);
    //         this.dobError = false;
    //
    //         this.bikeInsurance.controls['companyNameRenewel'].setValidators(null);
    //         this.bikeInsurance.controls['companyNameRenewel'].patchValue('');
    //
    //         this.bikeInsurance.controls['previousPolicyExpiry'].setValidators(null);
    //         this.bikeInsurance.controls['previousPolicyExpiry'].patchValue('');
    //
    //         this.bikeInsurance.controls['previousPolicyStart'].setValidators(null);
    //         this.bikeInsurance.controls['previousPolicyStart'].patchValue('');
    //
    //
    //         this.bikeInsurance.controls['registrationDate'].setValidators(null);
    //         this.bikeInsurance.controls['registrationDate'].patchValue('');
    //
    //         this.bikeInsurance.controls['previousCompany'].setValidators(null);
    //         this.bikeInsurance.controls['previousCompany'].patchValue('');
    //
    //         this.bikeInsurance.controls['vehicalNumber'].setValidators(null);
    //         this.bikeInsurance.controls['vehicalNumber'].patchValue('');
    //
    //
    //         this.bikeInsurance.controls['previousClaim'].setValidators(null);
    //         this.bikeInsurance.controls['previousClaim'].patchValue('');
    //
    //
    //     } else if (event == 1) {
    //         this.typeList = 'other'
    //         // alert(this.typeList)
    //         this.bikeInsurance.controls['registrationDate'].setValidators([Validators.required]);
    //         this.bikeInsurance.controls['companyNameRenewel'].setValidators([Validators.required]);
    //         this.bikeInsurance.controls['previousPolicyExpiry'].setValidators([Validators.required]);
    //         this.bikeInsurance.controls['previousPolicyStart'].setValidators([Validators.required]);
    //         this.bikeInsurance.controls['vehicalNumber'].setValidators(Validators.compose([Validators.minLength(9), Validators.pattern('([a-zA-Z]){2}([0-9]){2}([a-zA-Z0-9]){6}')]));
    //         this.bikeInsurance.controls['previousCompany'].setValidators([Validators.required]);
    //         this.bikeInsurance.controls['previousClaim'].setValidators([Validators.required]);
    //
    //         this.bikeInsurance.controls['registrationDateNew'].setValidators(null);
    //         this.bikeInsurance.controls['companyNameNew'].setValidators(null);
    //         this.bikeInsurance.controls['city'].setValidators(null);
    //         this.bikeInsurance.controls['registrationDateNew'].patchValue('');
    //         this.bikeInsurance.controls['companyNameNew'].patchValue('');
    //         this.bikeInsurance.controls['city'].patchValue('');
    //         this.dobError = ''
    //     }
    //     this.bikeInsurance.controls['registrationDateNew'].updateValueAndValidity();
    //     this.bikeInsurance.controls['companyNameNew'].updateValueAndValidity();
    //     this.bikeInsurance.controls['city'].updateValueAndValidity();
    //
    //     this.bikeInsurance.controls['registrationDate'].updateValueAndValidity();
    //     this.bikeInsurance.controls['companyNameRenewel'].updateValueAndValidity();
    //     this.bikeInsurance.controls['previousPolicyExpiry'].updateValueAndValidity();
    //     this.bikeInsurance.controls['previousPolicyStart'].updateValueAndValidity();
    //     this.bikeInsurance.controls['vehicalNumber'].updateValueAndValidity();
    //     this.bikeInsurance.controls['previousCompany'].updateValueAndValidity();
    //     this.bikeInsurance.controls['previousClaim'].updateValueAndValidity();
    }

    // onSelectedIndexChange(event){
    //     console.log(event, 'value');
    //     this.currentTab = '';
    //     if (event == 0) {
    //         this.currentTab = 'self';
    //         this.selfDetails();
    //         this.showSelf = true;
    //         this.showFamily = false;
    //         this.showGroup = false;
    //         this.showstudent = false;
    //     } else if (event == 1) {
    //         this.currentTab = 'family';
    //         this.familyDetails();
    //         this.showSelf = false;
    //         this.showFamily = true;
    //         this.showGroup = false;
    //         this.showstudent = false;
    //         this.travelUserType = false;
    //         console.log(this.travelPlan, 'travelPlantravelPlan');
    //     }
        // else if (event == 2) {
        //     this.currentTab = 'group';
        //     this.groupDetails();
        //     this.showSelf = false;
        //     this.showFamily = false;
        //     this.showGroup = true;
        //     this.showstudent = false;
        // } else if (event == 3) {
        //     this.currentTab = 'student';
        //     this.studentDetails();
        //     this.showSelf = false;
        //     this.showFamily = false;
        //     this.showGroup = false;
        //     this.showstudent = true;
        //     this.travelType = 'Holiday';
        //     this.travelPlan = '';
        //     this.medicalCondition = '';
        // }
    changeType(){
        if(this.travelType=='Multi'){
           if(this.daysCount == 365 || this.daysCount == 366) {
            this.multipleTripe==true
           }else if( this.daysCount != 365 || this.daysCount != 366){
            this.multipleTripe==false

            this.toast.error('Travel Period should be 365 Days or 366 Days');
        }
        }
    }

    ckeckedUser(index, checked, name) {
        console.log(this.currentTab, 'this.currentTab');

        if (checked) {
            if (this.currentTab == 'self') {
                this.selfArray[index].checked = true;
            } else if (this.currentTab == 'family') {
                this.familyArray[index].checked = true;
            } else if (this.currentTab == 'group') {
                this.groupArray[index].checked = true;
            } else if (this.currentTab == 'student') {
                this.studentArray[index].checked = true;
            }
        } else {
            if (this.currentTab == 'self') {
                this.selfArray[index].checked = false;
                this.selfArray[index].age = '';
                if (this.selfArray.length > 1) this.selfArray.splice(index, 1);
            } else if (this.currentTab == 'family') {
                this.familyArray[index].checked = false;
                this.familyArray[index].age = '';
                if (this.familyArray.length > 4) this.familyArray.splice(index, 1);
            } else if (this.currentTab == 'group') {
                this.groupArray[index].checked = false;
                this.groupArray[index].age = '';
                if (this.groupArray.length > 4) this.groupArray.splice(index, 1);
            } else if (this.currentTab == 'student') {
                this.studentArray[index].checked = false;
                this.studentArray[index].age = '';
                if (this.studentArray.length > 1) this.studentArray.splice(index, 1);
            }
            this.contrlButtons(name, checked);
        }
    }
    addFamily(value){
        this.familyArray.push({name: value, age: '', disabled: false, checked: true, required: false, error: ''});
        this.contrlButtons(value, true);
        console.log(this.familyArray, 'this.selfArray');
        sessionStorage.familyArray = this.familyArray
    }
    contrlButtons(value, checked) {
        if (checked) {
            if (value == 'Child3'){
                this.Child3BTn = false;
            }
            else if(value == 'Father'){
                this.FatherBTn = false;
            }
            else if(value == 'Mother'){
                this.MotherBTn = false;
            } else  if (value == 'Member5'){
                this.Member5BTn = false;
            }
            else if(value == 'Member6'){
                this.Member6BTn = false;
            }
            else if(value == 'Member7'){
                this.Member7BTn = false;
            }
            else if(value == 'Member8'){
                this.Member8BTn = false;
            }
            else if(value == 'Member9'){
                this.Member9BTn = false;
            }
            else if(value == 'Member10'){
                this.Member10BTn = false;
            }
            else if(value == 'Student6'){
                this.Student6BTn = false;
            }
            else if(value == 'Student7'){
                this.Student7BTn = false;
            }
            else if(value == 'Student8'){
                this.Student8BTn = false;
            }
            else if(value == 'Student9'){
                this.Student9BTn = false;
            }
            else if(value == 'Student10'){
                this.Student10BTn = false;
            }
        } else {
            if (value == 'Child3'){
                this.Child3BTn = true;
            }
            else if(value == 'Father'){
                this.FatherBTn = true;
            }
            else if(value == 'Mother'){
                this.MotherBTn = true;
            } else  if (value == 'Member5'){
                this.Member5BTn = true;
            }
            else if(value == 'Member6'){
                this.Member6BTn = true;
            }
            else if(value == 'Member7'){
                this.Member7BTn = true;
            }
            else if(value == 'Member8'){
                this.Member8BTn = true;
            }
            else if(value == 'Member9'){
                this.Member9BTn = true;
            }
            else if(value == 'Member10'){
                this.Member10BTn = true;
            }
            else if (value == 'Student5'){
                this.Student5BTn = true;
            }
            else if(value == 'Student6'){
                this.Student6BTn = true;
            }
            else if(value == 'Student7'){
                this.Student7BTn = true;
            }
            else if(value == 'Student8'){
                this.Student8BTn = true;
            }
            else if(value == 'Student9'){
                this.Student9BTn = true;
            }
            else if(value == 'Student10'){
                this.Student10BTn = true;
            }
        }
        sessionStorage.Child3BTn = this.Child3BTn;
        sessionStorage.FatherBTn = this.FatherBTn;
        sessionStorage.Member5BTn = this.Member5BTn;
        sessionStorage.Member6BTn = this.Member6BTn;
        sessionStorage.Member7BTn = this.Member7BTn;
        sessionStorage.Member8BTn = this.Member8BTn;
        sessionStorage.Member9BTn = this.Member9BTn;
        sessionStorage.Member10BTn = this.Member10BTn;
        sessionStorage.Student5BTn = this.Student5BTn;
        sessionStorage.Student6BTn = this.Student6BTn;
        sessionStorage.Student7BTn = this.Student7BTn;
        sessionStorage.Student8BTn = this.Student8BTn;
        sessionStorage.Student9BTn = this.Student9BTn;
        sessionStorage.Student10BTn = this.Student10BTn;

    }
    typeAge(checked, index, value) {
        if (value != '') {
            if (this.currentTab == 'self') {
                this.selfArray[index].checked = true;
            } else if (this.currentTab == 'family') {
                this.familyArray[index].checked = true;
            } else if (this.currentTab == 'group') {
                this.groupArray[index].checked = true;
            } else if (this.currentTab == 'student') {
                this.studentArray[index].checked = true;
            }
        } else {
            if (this.currentTab == 'self') {
                this.selfArray[index].checked = false;
            } else if (this.currentTab == 'family') {
                this.familyArray[index].checked = false;
            } else if (this.currentTab == 'group') {
                this.groupArray[index].checked = false;
            } else if (this.currentTab == 'student') {
                this.studentArray[index].checked = false;
            }
        }
        sessionStorage.selfArray = JSON.stringify(this.selfArray);
        sessionStorage.familyArray = JSON.stringify(this.familyArray);
        // sessionStorage.groupArray = JSON.stringify(this.groupArray);
        // sessionStorage.studentArray = JSON.stringify(this.studentArray);
    }
    addGroupMembers(value){
        this.groupArray.push({name: value, age: '', disabled: false, checked: true, required: false, error: ''});
        this.contrlButtons(value, true);
        sessionStorage.groupArray = JSON.stringify(this.groupArray);

    }
    addStudents(value){
        this.studentArray.push({name: value, age: '', disabled: false, checked: true, required: false, error: ''});
        this.contrlButtons(value, true);
        sessionStorage.studentArray = JSON.stringify(this.studentArray);

    }
    changeTravelType() {
        sessionStorage.travelType = this.travelType;
    }
    changeTravelPlan() {
        sessionStorage.travelPlan = JSON.stringify(this.travelPlan);
    }
    changeTravelDuration() {
        sessionStorage.duration = this.duration;
    }
    changeMedicalCondition() {
        sessionStorage.medicalCondition = this.medicalCondition;
    }
    typePincode() {
        sessionStorage.pincode = this.pincode;
    }
    ckeckedUserType() {
        sessionStorage.travelUserType = this.travelUserType;
    }
    typeCourseDuration() {
        sessionStorage.courseDuration = this.courseDuration;
    }
    typeSemester() {
        sessionStorage.sem = this.sem;
    }
   // studentInfo(){
   //     if(this.travelUserType == true){
   //         this.studentDuration = true;
   //     } else {
   //         this.studentDuration = true;
   //
   //     }
   //  }
    numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }

    chooseDate(event, type) {
        console.log(event, 'event');
        this.maxDate = '';
        if (event.value != null) {
            if (typeof event.value._i == 'string') {
                const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
                if (type == 'sDate') {
                    if (pattern.test(event.value._i) && event.value._i.length == 10) {
                        this.startDateError = '';
                    } else {
                        this.startDateError = 'Enter Valid Date';
                    }
                } else if (type == 'eDate') {
                    if (pattern.test(event.value._i) && event.value._i.length == 10) {
                        this.endDateError = '';
                    } else {
                        this.endDateError = 'Enter Valid Date';
                    }
                }
                let selectedDate;
                selectedDate = event.value._i;
                console.log(selectedDate, 'selectedDate');
                if (selectedDate.length == 10) {
                    if (type == 'sDate') {
                        console.log('inst');
                        this.maxDate = event.value;
                    }
                }
            } else if (typeof event.value._i == 'object') {
                if (type == 'sDate') {
                    this.startDateError = '';
                } else if (type == 'eDate') {
                    this.endDateError = '';
                }
                console.log(event.value, 'event.value');
                if (type == 'sDate') {
                    console.log('inobt');
                    this.maxDate = event.value;
                }
            }
        }
        if (type == 'sDate') {
            sessionStorage.startDate = this.startDate;
            console.log(this.startDate, 'startDate1111');
            let fDate = this.datePipe.transform(new Date(), 'MM/dd/yyyy');
            let tDate = this.datePipe.transform(this.startDate, 'MM/dd/yyyy');
            let diff = Date.parse(tDate) - Date.parse(fDate);
            this.daysBookingCount =  Math.floor(diff / 86400000);
            console.log(this.daysBookingCount, 'daysCount111');
            sessionStorage.daysBookingCount = this.daysBookingCount;
            // if (this.daysBookingCount > 60) {
            //     this.toast.error('Travel booking shoud be less than 60 days ')
            // }

        } else if (type == 'eDate') {
            sessionStorage.endDate = this.endDate;
            let days = this.dyasCalculation();
            this.daysCount = days;
            // alert(this.daysCount)
            sessionStorage.daysCount = days;

            console.log(days, 'daysdays');

        }
    }

    submit(groupname) {
        // if( this.multipleTripe==true){}
        console.log(groupname, 'groupname');
        this.medicalerror = true;
        this.travelProceed = false;
        this.finalData = [];
        if (this.selectedAmountTravel == '' || this.selectedAmountTravel == undefined) {
            this.sumerror = true;
        } else {
            this.sumerror = false;
        }
        if (this.medicalCondition == '' || this.medicalCondition == undefined) {
            this.medicalerror = true;
        } else {
            this.medicalerror = false;
        }
        if (this.startDate == '' || this.startDate == undefined) {
            this.startDateRequired = true;
        } else {
            this.startDateRequired = false;
        }
        if (this.endDate == '' || this.endDate == undefined) {
            this.endDateRequired = true;
        } else {
            this.endDateRequired = false;
        }
        if (this.travelPlan == '' || this.travelPlan == undefined) {
            this.plcaeOfVisitError = true;
        } else {
            this.plcaeOfVisitError = false;
        }
        if(this.travelUserType) {
            this.travelTypeError = false;
        } else {
            if (this.travelType == '' || this.travelType == undefined) {
                this.travelTypeError = true;
            } else {
                this.travelTypeError = false;
            }
        }

        if (this.pincode == '' || this.pincode == undefined) {
            this.pinerror = true;
        } else {
            this.pinerror = false;
        }

        let arrayEmpty = true;
        if (this.travelPlan && this.travelPlan.length) {
            arrayEmpty = false;
        }
        let memberValid = false;
        let getFiledData = '';
        if (groupname == 'self') {
            getFiledData = this.selfArray.filter(data => data.checked == true);
            if (getFiledData != '') {
                this.selfArray[0].error = '';
            } else {
                this.selfArray[0].error = 'Required';
            }
            if (this.selfArray[0].checked) {
                if (this.selfArray[0].age == '') {
                    this.selfArray[0].error = 'Required';
                    memberValid = true;
                } else {
                    this.selfArray[0].error = '';
                    memberValid = false;
                    this.finalData.push({type: this.selfArray[0].name, age: this.selfArray[0].age });
                }
            }

        } else if (groupname == 'family') {
            getFiledData = this.familyArray.filter(data => data.checked == true);
            console.log(getFiledData, 'getFiledDatagetFiledData');
            if (getFiledData != '') {
                this.familyArray[0].error = '';
            } else {
                this.familyArray[0].error = 'Required';
            }
            console.log(getFiledData, 'getFiledData1');
            for (let i = 0; i < this.familyArray.length; i++) {
                memberValid = false;
                if (this.familyArray[i].checked) {
                    if (this.familyArray[i].age == '') {
                        this.familyArray[i].error = 'Required';
                        memberValid = true;
                        break;
                    } else {
                        this.familyArray[i].error = '';
                        memberValid = false;
                        this.finalData.push({type: this.familyArray[i].name, age: this.familyArray[i].age });
                    }
                }
            }
        }
        // else if (groupname == 'group') {
        //     for (let i = 0; i < 4; i++) {
        //         if (!this.groupArray[i].checked) {
        //             this.groupArray[i].error = 'Required';
        //         }
        //     }
        //     for (let i = 0; i < this.groupArray.length; i++) {
        //         if (this.groupArray[i].checked) {
        //             if (this.groupArray[i].age == '') {
        //                 this.groupArray[i].error = 'Required';
        //             } else {
        //                 this.groupArray[i].error = '';
        //                 this.finalData.push({type: this.groupArray[i].name, age: this.groupArray[i].age});
        //             }
        //         }
        //     }
        // } else if (groupname == 'student') {
        //     getFiledData = this.studentArray.filter(data => data.checked == true);
        //     if (getFiledData != '') {
        //         this.studentArray[0].error = '';
        //     } else {
        //         this.studentArray[0].error = 'Required';
        //     }
        //     for (let i = 0; i < this.studentArray.length; i++) {
        //         if (this.studentArray[i].checked) {
        //             if (this.studentArray[i].age == '') {
        //                 this.studentArray[i].error = 'Required';
        //             } else {
        //                 this.studentArray[i].error = '';
        //                 this.finalData.push({type: this.studentArray[i].name, age: this.studentArray[i].age});
        //             }
        //         }
        //     }
        // }
        let sum_amount = '';
        for (let i = 0; i < this.sumInsuredAmountLists.length; i++) {
            if (this.sumInsuredAmountLists[i].suminsured_id == this.selectedAmountTravel) {
                sum_amount = this.sumInsuredAmountLists[i].suminsured_amount;
            }
        }
        console.log(this.pinerror, 'this.pinerror');
        if (this.pinerror == false && !memberValid && !arrayEmpty && this.medicalerror == false && getFiledData != '' && !this.sumerror && this.daysBookingCount <= 60 ) {
            sessionStorage.setAllTravelFamilyDetails = JSON.stringify(this.finalData);
            let sDate = this.datePipe.transform(this.startDate, 'y-MM-dd');
            let eDate = this.datePipe.transform(this.endDate, 'y-MM-dd');
            let days = this.dyasCalculation();
            console.log(days, 'days');

            // if((this.travelType=='Holiday')||(this.travelType=='Business')){
            //         this.daysCount == 180 ;
            //     }

            let travelPeroid = true;
            let travelPeroidValue = '';
            if(this.travelUserType==true && days > 366) {
                travelPeroid = false;
                travelPeroidValue = '366';
                // alert(travelPeroidValue)

            } else  if(this.travelUserType == false && days > 180) {
                travelPeroid = false;
                travelPeroidValue = '180';
                // alert(travelPeroidValue)

            }
            if (travelPeroid) {


                let isStudentAgeValid = true;
                let isMulititripAgeValid = true;
                if(this.travelUserType) {
                    if(this.selfArray[0].age >= 12) {
                        isStudentAgeValid = true;
                    } else {
                        isStudentAgeValid = false;
                        this.toast.error('Student Age should be 12 and above');
                    }
                } else {
                    if(this.travelType == 'Multi') {
                        if(this.selfArray[0].age >= 18) {
                            isMulititripAgeValid = true;
                        } else {
                            isMulititripAgeValid = false;
                            this.toast.error('Multiple trip traveler age should be 18 and above');
                        }
                    }

                }

                if(isStudentAgeValid && isMulititripAgeValid) {


                    let familyCountValid = true;
                    if (groupname == 'family' && getFiledData.length < 2) {
                        familyCountValid = false;
                    }
                    if (familyCountValid) {
                        const data = {
                            'platform': 'web',
                            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
                            'user_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '0',
                            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
                            'sum_insured_id': this.selectedAmountTravel,
                            'sum_insured_amount': sum_amount,
                            'family_members': this.finalData,
                            'travel_place': this.travelPlan,
                            'travel_plan_type': this.travelType == 'Business' ? 'Single' : this.travelType == 'Holiday' ? 'Single' : this.travelType,
                            'enquiry_id': '',
                            'start_date': sDate,
                            'end_date': eDate,
                            'day_count': days,
                            'pincode': this.pincode,
                            'duration': this.duration ? this.duration : '',
                            'travel_user_type': this.travelUserType ? 'student' : groupname,
                            'medical_condition': this.medicalCondition,
                            'course_duration': this.travelUserType ? this.courseDuration : '',
                            'semester': this.travelUserType ? this.sem : ''
                        };
                        if (this.travelUserType) {
                            data.travel_plan_type = '';
                        } else {
                            data.travel_plan_type = this.travelType == 'Business' ? 'Single' : this.travelType == 'Holiday' ? 'Single' : this.travelType;
                        }
                        if(this.multipleTripe==true){
                        this.settings.loadingSpinner = true;
                        console.log(data, 'this.datadata');

                        this.travel.getEnquiryDetails(data).subscribe(
                            (successData) => {
                                this.getTravelPremiumCalSuccess(successData);
                            },
                            (error) => {
                                this.getTravelPremiumCalFailure(error);
                            }
                        );
                        }else{
                            this.toast.error('Travel Period should be 365 Days or 366 Days');
                        }
                    } else {
                        this.travelProceed = true;
                        this.toast.error('Please select minimum two members');
                    }
                } else {
                    this.travelProceed = true;
                }
            } else {
                this.travelProceed = true;
                // alert(travelPeroidValue)
                this.toast.error('Travel Period should be Lesser than' +' '+ travelPeroidValue + ' ' + 'days');
            }
        } else {
            this.travelProceed = true;
        }

    }
    public getTravelPremiumCalSuccess(successData) {
        console.log(successData);
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {
            this.enquiryDetails = successData.ResponseObject;
            sessionStorage.enquiryDetailsTravel = JSON.stringify(this.enquiryDetails);
            this.router.navigate(['/travelpremium']);
            this.selectedAmountTravel = '';
            this.medicalCondition = '';
            this.startDate  = '';
            this.startDate  = '';
            this.endDate  = '';
            this.travelPlan  = '';
            this.travelType  = '';
            this.pincode  = '';
            this.finalData = [];
        }
        else {
            this.travelProceed = true;
            this.toast.error(successData.ErrorObject);
        }
    }
    public getTravelPremiumCalFailure(error) {
        this.settings.loadingSpinner = false;
    }
    public  numberWithCommas(x) {
        return x.toString().substring(0,x.toString().split('.')[0].length-3).replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + x.toString().substring(x.toString().split('.')[0].length-3);
    }
    sessionData() {

        if (sessionStorage.selfArray != undefined && sessionStorage.selfArray != '') {
            this.selfArray = JSON.parse(sessionStorage.selfArray);
            this.members(this.selfArray);
        }
        if (sessionStorage.familyArray != undefined && sessionStorage.familyArray != '') {
            this.familyArray = JSON.parse(sessionStorage.familyArray);
            this.members(this.familyArray);
        }
        // if (sessionStorage.groupArray != undefined && sessionStorage.groupArray != '') {
        //     this.groupArray = JSON.parse(sessionStorage.groupArray);
        //     this.members(this.groupArray);
        // }
        // if (sessionStorage.studentArray != undefined && sessionStorage.studentArray != '') {
        //     this.studentArray = JSON.parse(sessionStorage.studentArray);
        //     this.members(this.studentArray);
        // }
        if (sessionStorage.daysBookingCount != undefined && sessionStorage.daysBookingCount != '') {
            this.daysBookingCount = sessionStorage.daysBookingCount;
        }
        if (sessionStorage.selectedAmountTravel != undefined && sessionStorage.selectedAmountTravel != '') {
            this.selectedAmountTravel = sessionStorage.selectedAmountTravel;
        }
        if (sessionStorage.Child3BTn != undefined && sessionStorage.Child3BTn != '') {
            this.Child3BTn = sessionStorage.Child3BTn;
        }
        if (sessionStorage.FatherBTn != undefined && sessionStorage.FatherBTn != '') {
            this.FatherBTn = sessionStorage.FatherBTn;
        }
        if (sessionStorage.Member5BTn != undefined && sessionStorage.Member5BTn != '') {
            this.Member5BTn = sessionStorage.Member5BTn;
        }
        if (sessionStorage.Member6BTn != undefined && sessionStorage.Member6BTn != '') {
            this.Member6BTn = sessionStorage.Member6BTn;
        }
        if (sessionStorage.Member7BTn != undefined && sessionStorage.Member7BTn != '') {
            this.Member7BTn = sessionStorage.Member7BTn;
        }
        if (sessionStorage.Member8BTn != undefined && sessionStorage.Member8BTn != '') {
            this.Member8BTn = sessionStorage.Member8BTn;
        }
        if (sessionStorage.Member9BTn != undefined && sessionStorage.Member9BTn != '') {
            this.Member9BTn = sessionStorage.Member9BTn;
        }
        if (sessionStorage.Member10BTn != undefined && sessionStorage.Member10BTn != '') {
            this.Member10BTn = sessionStorage.Member10BTn;
        }
        if (sessionStorage.Student5BTn != undefined && sessionStorage.Student5BTn != '') {
            this.Student5BTn = sessionStorage.Student5BTn;
        }
        if (sessionStorage.Student6BTn != undefined && sessionStorage.Student6BTn != '') {
            this.Student6BTn = sessionStorage.Student6BTn;
        }
        if (sessionStorage.Student7BTn != undefined && sessionStorage.Student7BTn != '') {
            this.Student7BTn = sessionStorage.Student7BTn;
        }
        if (sessionStorage.Student8BTn != undefined && sessionStorage.Student8BTn != '') {
            this.Student8BTn = sessionStorage.Student8BTn;
        }
        if (sessionStorage.Student9BTn != undefined && sessionStorage.Student9BTn != '') {
            this.Student9BTn = sessionStorage.Student9BTn;
        }
        if (sessionStorage.Student10BTn != undefined && sessionStorage.Student10BTn != '') {
            this.Student10BTn = sessionStorage.Student10BTn;
        }
        if (sessionStorage.startDate != undefined && sessionStorage.startDate != '') {
            this.startDate = this.datePipe.transform(sessionStorage.startDate, 'y-MM-dd');
            this.maxDate = this.startDate;
        }
        if (sessionStorage.daysCount != undefined && sessionStorage.daysCount != '') {
            this.daysCount = sessionStorage.daysCount;
        }
        if (sessionStorage.endDate != undefined && sessionStorage.endDate != '') {
            this.endDate = this.datePipe.transform(sessionStorage.endDate, 'y-MM-dd');

        }
        if (sessionStorage.travelType != undefined && sessionStorage.travelType != '') {
            this.travelType = sessionStorage.travelType;
        }
        if (sessionStorage.travelPlan != undefined && sessionStorage.travelPlan != '') {
            this.travelPlan = JSON.parse(sessionStorage.travelPlan);
        }
        if (sessionStorage.duration != undefined && sessionStorage.duration != '') {
            this.duration = sessionStorage.duration;
        }
        if (sessionStorage.medicalCondition != undefined && sessionStorage.medicalCondition != '') {
            this.medicalCondition = sessionStorage.medicalCondition;
        }
        if (sessionStorage.travelUserType != undefined && sessionStorage.travelUserType != '') {
            this.travelUserType = JSON.parse(sessionStorage.travelUserType);
        }
        if (sessionStorage.pincode != undefined && sessionStorage.pincode != '') {
            this.pincode = sessionStorage.pincode;
        }
        if (sessionStorage.studentDuration != undefined && sessionStorage.studentDuration != '') {
            this.studentDuration = sessionStorage.studentDuration;
        }
        if (sessionStorage.sem != undefined && sessionStorage.sem != '') {
            this.sem = sessionStorage.sem;
        }
        if (sessionStorage.courseDuration != undefined && sessionStorage.courseDuration != '') {
            this.courseDuration = sessionStorage.courseDuration;
        }



    }
    members(array) {
        for (let i = 0; i < array.length; i++) {
            if (array[i].checked) {
                if (array[i].age == '') {
                    array[i].error = 'Required';
                } else {
                    array[i].error = '';
                }
            }
        }
    }
    dyasCalculation() {
        let fDate = this.datePipe.transform(this.startDate, 'MM/dd/yyyy');
        let tDate = this.datePipe.transform(this.endDate, 'MM/dd/yyyy');
        let diff = Date.parse(tDate) - Date.parse(fDate);
        let days = Math.floor(diff / 86400000);
        return days+1;
    }
    travelInsurer(){
        const dialogRef = this.dialog.open(TravelInsurer, {
            width: '1200px', height: '500px',
        });
        dialogRef.disableClose = true;
    }

    // fire

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
        }
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
            this.toast.error(successData.ErrorObject);
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

}
@Component({
    selector: 'travelinsurer',
    template: `        
        <div class="container">
        <div  class="row text-justify">

            <div class="col-sm-12 col-md-12 text-right">
                <mat-icon (click)="onNoClick()" style="cursor: pointer">close</mat-icon>
            </div>
            <div class="col-sm-8 col-md-8">
                <h3 class="text-center" style="color: #9769DF"><img src="assets/img/travel-insurance.png" class="logo-size"> About Travel Insurance</h3>
            </div>
            <div id="travel-details">
            <h3>OVERSEAS TRAVEL INSURANCE</h3>
           <p>This insurance covers medical expenses incurred whilst travelling abroad for business / holiday / employment / studies. The claims are settled abroad in foreign currency but the  premium has to be paid in rupees. Policies are available for corporate frequent travellers on an annualized basis also.</p>
           <p>The Overseas Travel Health insurance policy covers medical expenses incurred by the insured person, outside India as a direct result of bodily injuries caused or sickness or disease contracted. There are several plans available in the market based on the purpose of travel and sum insured required. If the plan / travelling person requires a medical examination for issuance of the policy the proposer will be requested to undergo prescribed medical examination at their own cost.</p>
           <p>The Overseas Travel insurance generally has the following covers.</p>
            <ul class="col-sm-12">
                <li>Personal Accident </li>
                <li>Loss of checked in Baggage</li>
                <li>Delay of checked in Baggage</li>
                <li>Loss of passport</li>
                <li>Personal Liability</li>
            </ul>
           <p>The Premium depends on the Age-band, Trip-band and Country of visits.  The Insurance also allows extension  on original policy for a further period if the stay is extended  and is   subject to declaration of good health by the insured. The policy is to be taken prior to departure from India. It is also essential that if there has been a pre issuance medical examination of the travelling person the medical records have to be taken along with the travel documents.</p>
            </div>
         </div>
        </div>`,
})
export class TravelInsurer {

    constructor(
        public dialogRef: MatDialogRef<PersonalInsurer>,
        @Inject(MAT_DIALOG_DATA) public data: any) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

}
