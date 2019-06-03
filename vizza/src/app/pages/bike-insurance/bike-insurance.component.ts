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

    constructor(public fb: FormBuilder, public bikeService: BikeInsuranceService, public datePipe: DatePipe, public validation: ValidationService, public datepipe: DatePipe, public route: ActivatedRoute, public auth: AuthService, public toastr: ToastrService,public dialog: MatDialog,public appSettings: AppSettings, public router: Router) {
        const minDate = new Date();
        this.minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
        this.settings = this.appSettings.settings;
        this.listDetails = false;

        this.bikeInsurance = this.fb.group({
            'vehicalNumber': ['', Validators.required],
            'registrationDate': ['', Validators.required],
            'previousClaim': '',
            'claimamount': '',
            'enquiry': '',
            'bussiness':'',
            'ncb':'',
            'previousPolicyExpiry':'',
            'previousPolicyStart':''
        });
        this.claimAmountDetails = false;
        this.expiry = false;
        this.previousDate = true;
        this.productName = '';
  }

  ngOnInit() {
      this.claimpercent();
      this.bussinessType();
      this.setDate = Date.now();
      this.setDate = this.datepipe.transform(this.setDate, 'y-MM-dd');
      this.sessionData();


  }
    setSession(){
        sessionStorage.enquiryFormData = JSON.stringify(this.bikeInsurance.value);
    }
    changeNcbAmt(){
      if(this.bikeInsurance.controls['previousClaim'].value == 'Yes'){
          this.bikeInsurance.controls['ncb'].patchValue('0');
      }
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
                "ncb_percent": this.bikeInsurance.controls['ncb'].value,
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
                     this.enquiry = this.bikeList;
                    sessionStorage.bikeListDetails = JSON.stringify(this.bikeList);
                    sessionStorage.bikeEnquiryId = this.bikeList.enquiry_id;
                    sessionStorage.enquiryFormData = JSON.stringify(data);
                        let dialogRef = this.dialog.open(EnquiryPopupComponent, {
                            width: '1500px',data: {listData: successData.ResponseObject, disableClose: true },
                            height: '500'
                        })
                        dialogRef.disableClose = true;
                        dialogRef.afterClosed().subscribe(result => {
                        });

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

    idValidate(event: any) {
        this.validation.idValidate(event);
    }
    sessionData() {
        if (sessionStorage.enquiryFormData != '' && sessionStorage.enquiryFormData != undefined) {
            let stepper = JSON.parse(sessionStorage.enquiryFormData);
            this.bikeInsurance = this.fb.group({
                'vehicalNumber': stepper.vehicalNumber,
                'registrationDate': this.datePipe.transform(stepper.registrationDate, 'y-MM-dd'),
                'previousClaim': stepper.previousClaim,
                'claimamount': stepper.claimamount,
                'enquiry': stepper.enquiry,
                'bussiness': stepper.bussiness,
                'ncb':stepper.ncb,
                'previousPolicyExpiry':this.datePipe.transform(stepper.previousPolicyExpiry, 'y-MM-dd'),
                'previousPolicyStart': this.datePipe.transform(stepper.previousPolicyStart, 'y-MM-dd'),
            });

        }
        if (sessionStorage.bikeEnquiryId != '' && sessionStorage.bikeEnquiryId != undefined) {
            this.bikeEnquiryId = sessionStorage.bikeEnquiryId;
        }

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
