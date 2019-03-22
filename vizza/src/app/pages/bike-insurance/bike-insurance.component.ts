import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonService} from '../../shared/services/common.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService} from 'ngx-toastr';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS} from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {MY_FORMATS} from '../endowment-life-insurance/life-call-back/life-call-back.component';
import {ValidationService} from '../../shared/services/validation.service';
import {Settings} from '../../app.settings.model';
import {AppSettings} from '../../app.settings';


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
    public settings: Settings;


    meridian = true;

    constructor(public fb: FormBuilder, public commonservices: CommonService, public datepipe: DatePipe, public route: ActivatedRoute, public toastr: ToastrService,public dialog: MatDialog, public validation: ValidationService,public appSettings: AppSettings, public router: Router) {
        const minDate = new Date();
        this.minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
        this.settings = this.appSettings.settings;

        this.bikeapp = this.fb.group({
          'appdate': ['', Validators.required],
          'apptime': '',
          'name': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
          'contactperson': ['', Validators.compose([Validators.required])],
          'mobile': ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}'), Validators.minLength(10)])],
          'email': ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
          'pincode': ['', Validators.compose([Validators.required])],
          'insurance': ['', Validators.compose([Validators.required])],
          'appointmentwith': ['', Validators.compose([Validators.required])]
      });
      this.productName = '';
  }

  ngOnInit() {
      this.setDate = Date.now();
      this.setDate = this.datepipe.transform(this.setDate, 'y-MM-dd');
      this.route.params.forEach((params) => {
          this.productName = params.id;

      });
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
        console.log(event.value,'eventevent1');

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
            } else {
                this.dobError = '';
            }

        }
    }
    bikeKeeper(values) {
        if (this.bikeapp.valid) {
            //date
            let date = this.datepipe.transform(this.bikeapp.controls['appdate'].value, 'yyyy-MM-dd');
            //time
            let setTime = this.bikeapp.controls['apptime'].value;
            let hr = setTime.hour < '10' ? '0' + setTime.hour : setTime.hour.toString();
            let mns = setTime.minute < '10' ? '0' + setTime.minute : setTime.minute.toString();
            let hours = hr[0] + hr[1];
            let min = mns[0] + mns[1];
            if (parseInt(hours) < 12 ) {
                if (hours == 0) {
                    hours = 12;
                }
                this.setFtime = hours + ':' + min + ' AM';
            } else if (parseInt(hours) > 12 ) {
                hours = hours - 12;
                hours = (hours.length < 10) ? '0' + hours : hours;
                this.setFtime = hours + ':' + min + ' PM';
            } else {
                this.setFtime = hours + ':' + min + ' PM';
            }
            const data = {
                'platform': 'web',
                'product_type': 'offline',
                'appointment_date': date,
                'appointment_time': this.setFtime,
                'company_name': this.bikeapp.controls['name'].value,
                'customer_mobile': this.bikeapp.controls['mobile'].value,
                'customer_email': this.bikeapp.controls['email'].value,
                'contact_person' : this.bikeapp.controls['contactperson'].value,
                'pincode': this.bikeapp.controls['pincode'].value,
                'product_name': this.bikeapp.controls['insurance'].value,
                'appointment_with': this.bikeapp.controls['appointmentwith'].value,

            };

            this.settings.loadingSpinner = true;
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
        this.settings.loadingSpinner = false;
        console.log(this.bikeapp,'bikeeeeee');
        if (successData.IsSuccess) {
            this.toastr.success('Your Bike insurance appointment has been fixed successfully');
            this.bikeapp.reset();
        }else{
            this.toastr.error(successData.ErrorObject);
        }
    }
    fixAppointmentFailure(error) {
        this.settings.loadingSpinner = false;
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
    }
    BikeInsurer(){
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
                <h4 class="text-center" style="color: #7F7B8A "><img src="assets/img/bike-insurance.png" class="logo-size"> About Bike Insurance</h4>
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