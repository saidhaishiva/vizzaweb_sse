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
    public selectDate: any;
    public productName: any;
    public pin:any;
    public title: any;
    public response: any;
    public pincodeErrors: any;
    public show: boolean;
    public today : any;

    constructor(public fb: FormBuilder, public commonservices: CommonService, public datepipe: DatePipe,
                public route: ActivatedRoute, public toastr: ToastrService,public dialog: MatDialog, public config: ConfigurationService,public validation: ValidationService) {
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
            'appointmentwith': ['', Validators.compose([Validators.required])]
        });
        this.TermLife = this.fb.group({
            'lifedob': ['', Validators.required],
            'lifeGender': ['', Validators.required],
            'lifeBenefitTerm': ['', Validators.required],
            'lifePolicy': ['', Validators.required],
            'lifePayment': ['', Validators.required],
            'lifePincode': ['', Validators.compose([Validators.required])],

        });
        this.productName = '';
        this.show = false;
    }

    ngOnInit() {
        this.show = this.config.getTermLife();
        this.setDate = Date.now();
        this.setDate = this.datepipe.transform(this.setDate, 'y-MM-dd');
        this.route.params.forEach((params) => {
            console.log(params.id);
            this.productName = params.id;

        });
    }
    addEvent(event) {
        this.selectDate = event.value;
        this.setDate = this.datepipe.transform(this.selectDate, 'y-MM-dd');
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
            this.toastr.error(successData.ErrorObject);
            this.pincodeErrors = false;
        }else {
            this.pincodeErrors = true;
        }
    }

    public getPincodeDetailsFailure(error) {
        console.log(error);
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
}
@Component({
    selector: 'termlifeinsurer',
    template: `        
        <div class="container">
        <div  class="row text-justify">
        
            <div class="col-sm-2">
            </div>
            <div class="col-sm-8">
                <h4 class="text-center" style="color: #A521B3 "><img src="assets/img/term-life-insurance.png" class="logo-size"> About Term Life Insurance</h4>
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
