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
    public bikeapp: FormGroup;
    public bikeInsurance: FormGroup;
    public settings: Settings;
    public setDate: any;
    public selectDate: any;
    public productName: any;
    public pin:any;
    public title: any;
    public response: any;
    public pincodeErrors: any;
    public dobError : any;
    public setFtime : any;
    public minDate : any;
    public time : any;
    public claimAmountDetails : any;
    public bikeList : any;
    public show : any;
    public claimDetails : any;
    public enquiry : any;
    public QuotationList : any;
    public manifactureDetails : any;
    public ccDetails : any;
    public variantDetails : any;
    public modelDetails : any;
    public vehicalnumber : any;
    public registrationDate : any;
    public claimamount : any;
    public previousClaim : any;
    public previousPolicyExpiry : any;
    public previousPolicyStart : any;
    public bussinessList : any;
    public getVehicleCC : any;
    public getccNumber : any;
    public getNcb : any;
    public manufactureDetails : any;
    public bussiness : any;
    public engine : any;
    public getvariant : any;
    public bikeEnquiryId : any;
    public listDetails : boolean;
    public expiry : boolean;
    public previousDate : boolean;
    meridian = true;

    constructor(public fb: FormBuilder, public bikeService: BikeInsuranceService, public validation: ValidationService, public datepipe: DatePipe, public route: ActivatedRoute, public auth: AuthService, public toastr: ToastrService,public dialog: MatDialog,public appSettings: AppSettings, public router: Router) {
        const minDate = new Date();
        // this.minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate() + 365);
        this.minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
        const maxDate = new Date(minDate.getFullYear()+1, minDate.getMonth(), minDate.getDate());
        console.log(maxDate,'  this.minDate  this.minDate');
        this.settings = this.appSettings.settings;
        this.listDetails = false;

        this.bikeInsurance = this.fb.group({
            'vehicalNumber': ['', Validators.required],
            'registrationDate': ['', Validators.required],
            'previousClaim': ['', Validators.required],
            'claimamount': '',
            'enquiry': '',
            'vehicleModel': '',
            'manufacture':'',
            'bussiness':'',
            'ncb':'',
            'manufactureYear':'',
            'vehicleCC':'',
            'variant': '',
            'chasissNumber':'',
            'engine':'',
            'previousPolicyExpiry':'',
            'previousPolicyStart':''
        });
        this.claimAmountDetails = false;
        this.expiry = false;
        this.previousDate = true;


        //   this.bikeapp = this.fb.group({
      //     'appdate': ['', Validators.required],
      //     'apptime': '',
      //     'name': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      //     'contactperson': ['', Validators.compose([Validators.required])],
      //     'mobile': ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}'), Validators.minLength(10)])],
      //     'email': ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
      //     'pincode': ['', Validators.compose([Validators.required])],
      //     'insurance': ['', Validators.compose([Validators.required])],
      //     'appointmentwith': ['', Validators.compose([Validators.required])]
      // });
      //
      this.productName = '';
  }

  ngOnInit() {
      this.claimpercent();
      this.manifactureList();
      this.bussinessType();
      this.setDate = Date.now();
      this.setDate = this.datepipe.transform(this.setDate, 'y-MM-dd');
      this.sessionData();


  }
    vehicalNum(){
        sessionStorage.vehicalnumber = this.bikeInsurance.controls['vehicalNumber'].value;
    }
    bussinessData(){
        sessionStorage.bussiness = this.bikeInsurance.controls['bussiness'].value;
    }
    policyDate(){
        sessionStorage.registrationdate = this.datepipe.transform(this.bikeInsurance.controls['registrationDate'].value, 'y-MM-dd');
    }
    previousclaim(){
        sessionStorage.previousclaim = this.bikeInsurance.controls['previousClaim'].value;
    }
    claimAmount(){
        sessionStorage.claimAmount = this.bikeInsurance.controls['claimamount'].value;
    }
    policyEndDate(){
        sessionStorage.previouspolicyexpiry = this.datepipe.transform(this.bikeInsurance.controls['previousPolicyExpiry'].value, 'y-MM-dd');
    }
    policyStartDate(){

        sessionStorage.previouspolicyStart = this.datepipe.transform(this.bikeInsurance.controls['previousPolicyStart'].value, 'y-MM-dd');
    }
    manufactureYear(){
        let start = new Date(this.bikeInsurance.controls['previousPolicyStart'].value);
        let getPolicyYear = start.getFullYear();
        console.log(getPolicyYear,'getPolicyYear');
        // if(getPolicyYear < this.bikeInsurance.controls['manufactureYear'].value){
        //
        // }
    }
    modelDetail(){
        sessionStorage.getmodelList = this.bikeInsurance.controls['vehicleModel'].value;
        console.log(sessionStorage.getmodelList,'sessionStorage.getmodelList');
    }
    manufactureList(){
        sessionStorage.manufacture = this.bikeInsurance.controls['manufacture'].value;
    }
    ncb(){
        sessionStorage.ncb = this.bikeInsurance.controls['ncb'].value;
    }
    engineList(){
        sessionStorage.engine = this.bikeInsurance.controls['engine'].value;
    }
    keyPress(){
        // sessionStorage.bussinessType = this.bikeInsurance.controls['bussinessType'].value;
        // sessionStorage.manufacture = this.bikeInsurance.controls['manufacture'].value;
        sessionStorage.manufactureYear = this.bikeInsurance.controls['manufactureYear'].value;
        sessionStorage.vehicleCC = this.bikeInsurance.controls['vehicleCC'].value;
        sessionStorage.variant = this.bikeInsurance.controls['variant'].value;
        sessionStorage.chasissNumber = this.bikeInsurance.controls['chasissNumber'].value;
    }

    claim(){
        if(this.bikeInsurance.controls['previousClaim'].value == 'Yes'){
            this.claimAmountDetails = true;
        } else {
            this.claimAmountDetails = false;

        }
        sessionStorage.claimDetail = this.claimAmountDetails;
    }

    nameValidate(event: any){
        this.validation.nameValidate(event);
    }
    // Dob validation
    dobValidate(event: any){
        this.validation.dobValidate(event);
    }
    // Number validation
    numberValidate(event: any){
        this.validation.numberValidate(event);
    }

    addEvent(event) {
        console.log(event,'eventevent');

        if (event.value != null) {
            let selectedDate = '';
            let dob = '';
            // if(this.minDate < event.value){
            //
            // }
            if (typeof event.value._i == 'string') {
                const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
                if (pattern.test(event.value._i) && event.value._i.length == 10) {
                    this.dobError = '';
                } else {
                    this.dobError = 'Enter Valid Date';
                }
                selectedDate = event.value._i;
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                if (selectedDate.length == 10) {
                    let yearValid = this.yearCalculate(dob);
                    console.log(yearValid,'987978');
                }

            } else {
                this.dobError = '';
            }

        }
    }
    yearCalculate(dob) {
        let today = new Date();
        let birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        let dd = today.getDate()- birthDate.getDate();
        if( m < 0 || m == 0 && today.getDate() < birthDate.getDate()){
            age = age-1;
        }
        return age;
    }
    // home bike
    quationFirstStep(value){
        sessionStorage.enquiryFormData = JSON.stringify(value);
        const data = {
                "platform": "web",
                "created_by": "0",
                "role_id": this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
                "user_id":  this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
                "enquiry_id": 0,
                "pos_status": this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
                "vehicle_no":this.bikeInsurance.controls['vehicalNumber'].value,
                "registration_date": this.bikeInsurance.controls['registrationDate'].value,
                "previous_claim_YN":this.bikeInsurance.controls['previousClaim'].value == 'No' ? '0' : '1',
                "previous_policy_expiry_date":this.bikeInsurance.controls['previousPolicyExpiry'].value ? this.bikeInsurance.controls['previousPolicyExpiry'].value : '',
                "previous_policy_start_date":this.bikeInsurance.controls['previousPolicyStart'].value ? this.bikeInsurance.controls['previousPolicyStart'].value : '',
                "business_type":this.bikeInsurance.controls['bussiness'].value,
                "ncb_amount": this.bikeInsurance.controls['ncb'].value,
                "claim_amount":this.bikeInsurance.controls['claimamount'].value ? this.bikeInsurance.controls['claimamount'].value : '',
            }
            console.log(data,'data');
            this.bikeService.getMotorHomeDetails(data).subscribe(
                (successData) => {
                        this.bikeDetailsSuccess(successData,data);
                    },
                    (error) => {
                        this.bikeDetailsFailure(error);
                    }
                );
        }

            public bikeDetailsSuccess(successData, data) {
                if (successData.IsSuccess) {
                    this.bikeList = successData.ResponseObject;
                    console.log(this.bikeList,'hgdj');
                     this.enquiry = this.bikeList.enquiry_id;
                    // sessionStorage.bikeEnquiryDetails = JSON.stringify(this.bikeList);
                    sessionStorage.bikeEnquiryId = this.bikeList.enquiry_id;
                    sessionStorage.enquiryFormData = JSON.stringify(data);
                    if(this.enquiry == 0){
                        this.listDetails = true;
                        this.enquiryQuation();
                    } else {
                        this.listDetails = false;
                        this.router.navigate(['/bikepremium']);

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
    public claimSuccess(successData){
        if (successData.IsSuccess) {
            this.claimDetails = successData.ResponseObject;
        }
    }
    public claimFailure(error) {
    }
    bussinessType() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0'

        }
        this.bikeService.getBuissnessList(data).subscribe(
            (successData) => {
                this.typeSuccess(successData);
            },
            (error) => {
                this.typeFailure(error);
            }
        );
    }
    public typeSuccess(successData){
        if (successData.IsSuccess) {
            this.bussinessList = successData.ResponseObject;
        }
    }
    public typeFailure(error) {
    }

    enquiryQuation() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
            'enquiry_id': 0,
            'vehicle_no':this.bikeInsurance.controls['vehicalNumber'].value,
            'registration_date': this.bikeInsurance.controls['registrationDate'].value,
            'previous_policy_expiry_date':this.bikeInsurance.controls['previousPolicyExpiry'].value,
            'previous_policy_no':"12344556",
            'previous_claim_YN': this.bikeInsurance.controls['previousClaim'].value == 'No' ? '0' : '1',
            'claim_amount':this.bikeInsurance.controls['claimamount'].value ? this.bikeInsurance.controls['claimamount'].value : '',
            'vehicle_manufacture':this.bikeInsurance.controls['manufacture'].value,
            'vehicle_model':this.bikeInsurance.controls['vehicleModel'].value,
            'vehicle_variant':this.bikeInsurance.controls['variant'].value,
            'vehicle_cc':this.bikeInsurance.controls['vehicleCC'].value,
            'chassis_no':this.bikeInsurance.controls['chasissNumber'].value,
            'engine_no':this.bikeInsurance.controls['engine'].value,
            'manu_yr':this.bikeInsurance.controls['manufactureYear'].value,
            'vehicle_category':"2W",
            'ncb_amount':this.bikeInsurance.controls['ncb'].value,
            'business_type': this.bikeInsurance.controls['bussiness'].value,
            'previous_policy_start_date':this.bikeInsurance.controls['previousPolicyStart'].value

        }
        this.bikeService.getEnquiryDetails(data).subscribe(
            (successData) => {
                this.enquirySuccess(successData);
            },
            (error) => {
                this.enquiryFailure(error);
            }
        );
    }
    public enquirySuccess(successData){
        if (successData.IsSuccess) {
            this.QuotationList = successData.ResponseObject;
            sessionStorage.bikeEnquiryId = this.QuotationList.enquiry_id;
            console.log(this.QuotationList,'jhkhjgkj');
            this.router.navigate(['/bikepremium']);

        }
    }
    public enquiryFailure(error) {
    }
    /// manufacture
    manifactureList() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0'

        }
        this.bikeService.getManifactureList(data).subscribe(
            (successData) => {
                this.manifactureSuccess(successData);
            },
            (error) => {
                this.manifactureFailure(error);
            }
        );
    }
    public manifactureSuccess(successData){
        if (successData.IsSuccess) {
            this.manifactureDetails = successData.ResponseObject;
        }
    }
    public manifactureFailure(error) {
    }
    // model
    modelList1() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
            'manufacture': this.bikeInsurance.controls['manufacture'].value

        }
        this.bikeService.getModelList(data).subscribe(
            (successData) => {
                this.modelSuccess(successData);
            },
            (error) => {
                this.modelFailure(error);
            }
        );
    }
    public modelSuccess(successData){
        if (successData.IsSuccess) {
            this.modelDetails = successData.ResponseObject;
        }
    }
    public modelFailure(error) {
    }
    // variant
    variantList() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
            'manufacture': this.bikeInsurance.controls['manufacture'].value


        }
        this.bikeService.getvariantList(data).subscribe(
            (successData) => {
                this.variantSuccess(successData);
            },
            (error) => {
                this.variantFailure(error);
            }
        );
    }
    public variantSuccess(successData){
        if (successData.IsSuccess) {
            this.variantDetails = successData.ResponseObject;
        }
    }
    public variantFailure(error) {
    }
    // cc
    ccList() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
            'manufacture': this.bikeInsurance.controls['manufacture'].value


        }
        this.bikeService.getCCList(data).subscribe(
            (successData) => {
                this.ccSuccess(successData);
            },
            (error) => {
                this.ccFailure(error);
            }
        );
    }
    public ccSuccess(successData){
        if (successData.IsSuccess) {
            this.ccDetails = successData.ResponseObject;
        }
    }
    public ccFailure(error) {
    }
    typeOfBussiness(){
        if(this.bikeInsurance.controls['bussiness'].value == '1'){
            this.previousDate = true;
        } else {
            this.previousDate = false;

        }
    }
    idValidate(event: any) {
        this.validation.idValidate(event);
    }
    sessionData() {
        if (sessionStorage.enquiryFormData != '' && sessionStorage.enquiryFormData != undefined) {
            let stepper = JSON.parse(sessionStorage.enquiryFormData);
            this.bikeInsurance = this.fb.group({
                'vehicalNumber': stepper.vehicalNumber,
                'registrationDate': stepper.registrationDate,
                'previousClaim': stepper.previousClaim,
                'claimamount': stepper.claimamount,
                'enquiry': stepper.enquiry,
                'fuelType': stepper.fuelType,
                'bussiness': stepper.bussiness,
                'manufacture': stepper.manufacture,
                'manufactureYear': stepper.manufactureYear,
                'vehicleCC': stepper.vehicleCC,
                'variant': stepper.variant,
                'chasissNumber': stepper.chasissNumber,
                'engine': stepper.engine,
                'ncb':stepper.ncb,
                'previousPolicyExpiry': stepper.previousPolicyExpiry,
                'previousPolicyStart': stepper.previousPolicyStart,
                'vehicleModel': stepper.vehicleModel,
            });
        }

        if (sessionStorage.bikeEnquiryId != '' && sessionStorage.bikeEnquiryId != undefined) {
            this.bikeEnquiryId = sessionStorage.bikeEnquiryId;
        }

        if (sessionStorage.claimDetail != '' && sessionStorage.claimDetail != undefined) {
            this.claimAmountDetails = sessionStorage.claimDetail;
        }

        if (sessionStorage.vehicalnumber != undefined && sessionStorage.vehicalnumber != '') {
            this.bikeInsurance.controls['vehicalNumber'].patchValue(sessionStorage.vehicalnumber);
        }
        if (sessionStorage.registrationdate != undefined && sessionStorage.registrationdate != '') {
            this.bikeInsurance.controls['registrationDate'].patchValue(sessionStorage.registrationdate);
        }
        if (sessionStorage.previousclaim != undefined && sessionStorage.previousclaim != '') {
            this.bikeInsurance.controls['previousClaim'].patchValue(sessionStorage.previousclaim);
        }
        if (sessionStorage.claimAmount != undefined && sessionStorage.claimAmount != '') {
            this.bikeInsurance.controls['claimamount'].patchValue(sessionStorage.claimAmount);
        }
        if (sessionStorage.previouspolicyexpiry != undefined && sessionStorage.previouspolicyexpiry != '') {
            this.bikeInsurance.controls['previousPolicyExpiry'].patchValue(sessionStorage.previouspolicyexpiry);
        }
        if (sessionStorage.engine != undefined && sessionStorage.engine != '') {
            this.bikeInsurance.controls['engine'].patchValue(sessionStorage.engine);
        }
        if (sessionStorage.previousPolicyStart != undefined && sessionStorage.previousPolicyStart != '') {
            this.bikeInsurance.controls['previousPolicyStart'].patchValue(sessionStorage.previousPolicyStart);
        }
        if (sessionStorage.bussiness != undefined && sessionStorage.bussiness != '') {
            this.bikeInsurance.controls['bussiness'].patchValue(sessionStorage.bussiness);
        }
        if (sessionStorage.manufacture != undefined && sessionStorage.manufacture != '') {
            this.bikeInsurance.controls['manufacture'].patchValue(sessionStorage.manufacture);
        }
        if (sessionStorage.manufactureYear != undefined && sessionStorage.manufactureYear != '') {
            this.bikeInsurance.controls['manufactureYear'].patchValue(sessionStorage.manufactureYear);
        }
        if (sessionStorage.getmodelList != undefined && sessionStorage.getmodelList != '') {
            this.bikeInsurance.controls['model'].patchValue(sessionStorage.getmodelList);
        }
        if (sessionStorage.ncb != undefined && sessionStorage.ncb != '') {
            this.bikeInsurance.controls['ncb'].patchValue(sessionStorage.ncb);
        }
        if (sessionStorage.vehicleCC != undefined && sessionStorage.vehicleCC != '') {
            this.bikeInsurance.controls['vehicleCC'].patchValue(sessionStorage.vehicleCC );
        }
        if (sessionStorage.variant != undefined && sessionStorage.variant != '') {
            this.bikeInsurance.controls['variant'].patchValue(sessionStorage.variant);
        }
        if (sessionStorage.chasissNumber != undefined && sessionStorage.chasissNumber != '') {
            this.bikeInsurance.controls['chasissNumber'].patchValue(sessionStorage.chasissNumber);
        }
        if (sessionStorage.engine != undefined && sessionStorage.engine != '') {
            this.bikeInsurance.controls['engine'].patchValue(sessionStorage.engine);
        }
    }

    // bikeKeeper(values) {
    //     if (this.bikeapp.valid) {
    //         //date
    //         let date = this.datepipe.transform(this.bikeapp.controls['appdate'].value, 'yyyy-MM-dd');
    //         //time
    //         let setTime = this.bikeapp.controls['apptime'].value;
    //         let hr = setTime.hour < '10' ? '0' + setTime.hour : setTime.hour.toString();
    //         let mns = setTime.minute < '10' ? '0' + setTime.minute : setTime.minute.toString();
    //         let hours = hr[0] + hr[1];
    //         let min = mns[0] + mns[1];
    //         if (parseInt(hours) < 12 ) {
    //             if (hours == 0) {
    //                 hours = 12;
    //             }
    //             this.setFtime = hours + ':' + min + ' AM';
    //         } else if (parseInt(hours) > 12 ) {
    //             hours = hours - 12;
    //             hours = (hours.length < 10) ? '0' + hours : hours;
    //             this.setFtime = hours + ':' + min + ' PM';
    //         } else {
    //             this.setFtime = hours + ':' + min + ' PM';
    //         }
    //         const data = {
    //             'platform': 'web',
    //             'product_type': 'offline',
    //             'appointment_date': date,
    //             'appointment_time': this.setFtime,
    //             'company_name': this.bikeapp.controls['name'].value,
    //             'customer_mobile': this.bikeapp.controls['mobile'].value,
    //             'customer_email': this.bikeapp.controls['email'].value,
    //             'contact_person' : this.bikeapp.controls['contactperson'].value,
    //             'pincode': this.bikeapp.controls['pincode'].value,
    //             'product_name': this.bikeapp.controls['insurance'].value,
    //             'appointment_with': this.bikeapp.controls['appointmentwith'].value,
    //
    //         };
    //
    //         this.settings.loadingSpinner = true;
    //         this.commonservices.setFixAppointment(data).subscribe(
    //             (successData) => {
    //                 this.fixAppointmentSuccess(successData);
    //             },
    //             (error) => {
    //                 this.fixAppointmentFailure(error);
    //             }
    //         );
    //     }
    // }
    // fixAppointmentSuccess(successData) {
    //     this.settings.loadingSpinner = false;
    //     console.log(this.bikeapp,'bikeeeeee');
    //     if (successData.IsSuccess) {
    //         this.toastr.success('Your Bike insurance appointment has been fixed successfully');
    //         this.bikeapp.reset();
    //     }else{
    //         this.toastr.error(successData.ErrorObject);
    //     }
    // }
    // fixAppointmentFailure(error) {
    //     this.settings.loadingSpinner = false;
    // }
    // getPincodeDetails(pin, title) {
    //     this.pin = pin;
    //     this.title = title;
    //     const data = {
    //         'platform': 'web',
    //         'postalcode': this.pin
    //     }
    //     if (this.pin.length == 6) {
    //         this.commonservices.getPincodeDetails(data).subscribe(
    //             (successData) => {
    //                 this.getPincodeDetailsSuccess(successData);
    //             },
    //             (error) => {
    //                 this.getPincodeDetailsFailure(error);
    //             }
    //         );
    //     }
    // }
    // public getPincodeDetailsSuccess(successData) {
    //     if (successData.ErrorObject) {
    //         this.toastr.error(successData.ErrorObject);
    //         this.pincodeErrors = false;
    //     }else {
    //         this.pincodeErrors = true;
    //     }
    // }
    //
    // public getPincodeDetailsFailure(error) {
    // }
    BikeInsurer(){
        // const dialogRef = this.dialog.open(BikeInsurer, {
        //     width: '1200px',
        // });
        // dialogRef.disableClose = true;
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
