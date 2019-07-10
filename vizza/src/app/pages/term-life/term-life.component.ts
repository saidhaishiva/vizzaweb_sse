import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonService} from '../../shared/services/common.service';
import {ConfigurationService} from '../../shared/services/configuration.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService} from 'ngx-toastr';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS} from '@angular/material';
import {ValidationService} from '../../shared/services/validation.service';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {MY_FORMATS} from '../endowment-life-insurance/life-call-back/life-call-back.component';
import  { AuthService } from '../../shared/services/auth.service';
import { TermLifeCommonService } from '../../shared/services/term-life-common.service';
import * as moment from 'moment';
import { Settings} from '../../app.settings.model';
import {AppSettings} from '../../app.settings';


@Component({
    selector: 'app-term-life',
    templateUrl: './term-life.component.html',
    styleUrls: ['./term-life.component.scss'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
})
export class TermLifeComponent implements OnInit {
    public TermLifeapp: FormGroup;
    public TermLife: FormGroup;
    public setDate: any;
    public age: any;
    public selectDate: any;
    public productName: any;
    public pin:any;
    public title: any;
    public response: any;
    public pincodeErrors: boolean;
    public show: boolean;
    public today : any;
    public companyList: any;
    public dobError: any;
    public lifeEnqAge: any;
    public webhost: any;
    public settings: Settings;

    constructor(public fb: FormBuilder, public router: Router,public commonservices: CommonService, public datepipe: DatePipe,public route: ActivatedRoute, public toastr: ToastrService,public dialog: MatDialog, public config: ConfigurationService,public validation: ValidationService, public auth: AuthService, public commontermlyf: TermLifeCommonService,public appSettings: AppSettings) {
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
        let today  = new Date();
        this.today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        this.TermLifeapp = this.fb.group({
            'appdate': ['', Validators.required],
            'apptime': null,
            'name': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            'contactperson': ['', Validators.compose([Validators.required])],
            'mobile': ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}'), Validators.minLength(10)])],
            'email': ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
            'pincode': ['', Validators.compose([Validators.required])],
            'insurance': ['', Validators.compose([Validators.required])],
            'appointmentwith': ['', Validators.compose([Validators.required])],
        });
        this.TermLife = this.fb.group({
            'lifedob': ['', Validators.required],
            'lifeGender': ['', Validators.required],
            'lifeBenefitTerm': ['', Validators.required],
            'lifePolicy': ['', Validators.required],
            'lifePayment': ['', Validators.required],
            'lifePincode': ['', Validators.compose([Validators.required])],
            'lifesmoker' : false
        });
        this.productName = '';
        this.show = false;
        this.age = 0;
    }

    ngOnInit() {
        sessionStorage.enquiryFromDetials = '';
        sessionStorage.filterCompany = '';
        sessionStorage.getEnquiryDetials = '';
        sessionStorage.allProductLists = '';
        this.show = this.config.getTermLife();
        this.setDate = Date.now();
        this.setDate = this.datepipe.transform(this.setDate, 'y-MM-dd');
        this.route.params.forEach((params) => {
            console.log(params.id);
            this.productName = params.id;
        });
        this.sessionData();
    }
    sessionData() {
        if(sessionStorage.enquiryFormData != '' && sessionStorage.enquiryFormData !=undefined) {
            let enquiryFormData = JSON.parse(sessionStorage.enquiryFormData);
            this.TermLife = this.fb.group({
                lifedob: this.datepipe.transform(enquiryFormData.lifedob, 'y-MM-dd'),
                lifeGender: enquiryFormData.lifeGender,
                lifeBenefitTerm: enquiryFormData.lifeBenefitTerm,
                lifePolicy: enquiryFormData.lifePolicy,
                lifePayment: enquiryFormData.lifePayment,
                lifePincode: enquiryFormData.lifePincode,
                lifesmoker : enquiryFormData.lifesmoker
            });
        }
        if(sessionStorage.pincodeErrors != '' && sessionStorage.pincodeErrors !=undefined) {
            this.pincodeErrors = JSON.parse(sessionStorage.pincodeErrors);
        }
        if(sessionStorage.dobError != '' && sessionStorage.dobError !=undefined) {
            this.dobError = sessionStorage.dobError;
        }

    }
    addEvent(event) {
        if (event.value != null) {
            let selectedDate = '';
            this.lifeEnqAge = '';
            let dob = '';
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
                    this.lifeEnqAge = this.ageCalculate(dob);
                    sessionStorage.lifeEnqAge = this.lifeEnqAge;

                }
            } else if (typeof event.value._i == 'object') {
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                if (dob.length == 10) {
                    this.lifeEnqAge = this.ageCalculate(dob);
                    sessionStorage.lifeEnqAge = this.lifeEnqAge;
                }
                this.dobError = '';
            }
            sessionStorage.dobError = this.dobError;
        }
    }
    ageCalculate(dob) {
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
    TermLifeKeeper(values) {
        if (this.TermLifeapp.valid) {
            console.log(values,'sasdasd');
            const data = {
                'platform': 'web',
                'product_type': 'offline',
                'appointment_date': this.setDate,
                'appointment_time': this.TermLifeapp.controls['apptime'].value,
                'company_name': this.TermLifeapp.controls['name'].value,
                'customer_mobile': this.TermLifeapp.controls['mobile'].value,
                'customer_email': this.TermLifeapp.controls['email'].value,
                'contact_person' : this.TermLifeapp.controls['contactperson'].value,
                'pincode': this.TermLifeapp.controls['pincode'].value,
                'product_name': this.TermLifeapp.controls['insurance'].value,
                'appointment_with': this.TermLifeapp.controls['appointmentwith'].value,

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
        console.log(successData);
    }
    fixAppointmentFailure(error) {
        console.log(error);
    }
    getComapnyListFailure(error) {
        console.log(error);
    }
    getPincodeDetails(pin) {
        const data = {
            'platform': 'web',
            'postalcode': pin
        }
        if (pin.length == 6) {
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
        if (successData) {
            this.pincodeErrors = false;
        }else {
            this.toastr.error(successData.ErrorObject);
            this.pincodeErrors = true;
        }
        sessionStorage.pincodeErrors = this.pincodeErrors;
    }
    public getPincodeDetailsFailure(error) {
        console.log(error);
    }
    public keyPress(event: any) {
        if (event.key == '0') {
            if (event.target.value.length == 0) {
                event.preventDefault();
            }
        } else if (event.charCode !== 0) {
            const pattern = /[0-9\\ ]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                // invalid character, prevent input
                event.preventDefault();
            }
        }
    }
    typingPolicyTerm() {
       // this.TermLife.controls['lifePolicy'].patchValue(this.TermLife.controls['lifeBenefitTerm'].value);
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
    TermLifeInsurer(){
        const dialogRef = this.dialog.open(TermLifeInsurer, {
            width: '1200px',
        });
        dialogRef.disableClose = true;
    }
    productListEnquiry(value) {
        sessionStorage.enquiryFormData = JSON.stringify(value);
        console.log(this.TermLife.valid, 'this.TermLife.valid');
        if(this.TermLife.valid) {
            let valid = false;
            if(this.pincodeErrors == false) {
                valid = true;
            }
            if(valid) {
                if (sessionStorage.lifeEnqAge >= 18) {
                    const data = {
                        'platform': 'web',
                        'created_by': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
                        'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
                        'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
                        'sum_assured_id': '',
                        'age': sessionStorage.lifeEnqAge,
                        'dob': this.datepipe.transform(this.TermLife.controls.lifedob.value, 'y-MM-dd'),
                        'gender': this.TermLife.controls.lifeGender.value,
                        'policy_paying_term': this.TermLife.controls.lifePolicy.value,
                        'benefit_term': this.TermLife.controls.lifeBenefitTerm.value,
                        'payment_mode': this.TermLife.controls.lifePayment.value,
                        'smoker': this.TermLife.controls.lifesmoker.value,
                        'pincode': this.TermLife.controls.lifePincode.value
                    };
                    console.log(data, 'dattttaaaaa');
                    this.commontermlyf.productListEnquiry(data).subscribe(
                        (successData) => {
                            this.productListEnquirySuccess(successData, data);
                        },
                        (error) => {
                            this.productListEnquiryFailure(error);
                        }
                    );
                } else {
                    this.toastr.error('Age should be 18 or above');
                }
            }
        } else {
            this.toastr.error('Please fill the all mandatory fields');
        }
    }
    productListEnquirySuccess(successData, data) {
        console.log(successData);
        if (successData.IsSuccess) {
            sessionStorage.enquiryFromDetials = JSON.stringify(data);
            sessionStorage.getEnquiryDetials = JSON.stringify(successData.ResponseObject);
            this.router.navigate(['/life-premium-list']);
        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }
    productListEnquiryFailure(error) {
        console.log(error)
    }

}
@Component({
    selector: 'termlifeinsurer',
    template: `        
        <div class="container">
        <div  class="row text-justify">
        
            <div class="col-sm-2">
            </div>
            <div class="col-sm-8">
                <h4 class="text-center" style="color: #9ECB3B "><img src="assets/img/term-life-insurance.png" class="logo-size"> About Term Life Insurance</h4>
            </div>
            <div class="col-sm-2 text-right">
                <mat-icon (click)="onNoClick()" style="cursor: pointer">close</mat-icon>
            </div>
            <p>Term Insurance policies otherwise called as Protection plans only cover the risk of death for the specific period of policy. In case of death of insured during the policy period, the suminsured is paid to the nominated person in the policy.</p>
            <p>There is no payment paid if the insured survives after the maturity of term insurance. The term insurance is a pure life insurance and acts as a complete security to the policy holders nominees.</p>
            <p>If a house has been purchased on loan that can be secured by a term insurance, children education can be secured by a term insurance, in other words if planned well in the unfortunate event of death the nominees continue to live in the same life style we provided when we are alive. The Premium rates are very low in this plan since it covers the riskonly. Premium can be paid Single or yearly or half yearly.</p>
            <p>In whole life plans also the risk of death alone can be covered and the nominee receives the sum insured. This premium can also be paid as quarterly or half yearly or annual mode.</p>
         </div>
        </div>`,
})
export class TermLifeInsurer {

    constructor(
        public dialogRef: MatDialogRef<TermLifeInsurer>,
        @Inject(MAT_DIALOG_DATA) public data: any) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

}
