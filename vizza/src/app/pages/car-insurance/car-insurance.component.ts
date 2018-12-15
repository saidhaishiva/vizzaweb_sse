import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonService} from '../../shared/services/common.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService} from 'ngx-toastr';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FireInsurer} from '../fire/fire.component';

@Component({
  selector: 'app-car-insurance',
  templateUrl: './car-insurance.component.html',
  styleUrls: ['./car-insurance.component.scss']
})
export class CarInsuranceComponent implements OnInit {
    public carapp: FormGroup;
    public setDate: any;
    public selectDate: any;
    public productName: any;
    public pin:any;
    public title: any;
    public response: any;
    public pincodeErrors: any;

  constructor(public fb: FormBuilder, public commonservices: CommonService, public datepipe: DatePipe, public route: ActivatedRoute, public toastr: ToastrService,public dialog: MatDialog) {
      this.carapp = this.fb.group({
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
      this.productName = '';
  }

  ngOnInit() {
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
    carKeeper(values) {

        if (this.carapp.valid) {
            console.log(values,'sasdasd');
            const data = {
                'platform': 'web',
                'product_type': 'offline',
                'appointment_date': this.setDate,
                'appointment_time': this.carapp.controls['apptime'].value,
                'company_name': this.carapp.controls['name'].value,
                'customer_mobile': this.carapp.controls['mobile'].value,
                'customer_email': this.carapp.controls['email'].value,
                'contact_person' : this.carapp.controls['contactperson'].value,
                'pincode': this.carapp.controls['pincode'].value,
                'product_name': this.carapp.controls['insurance'].value,
                'appointment_with': this.carapp.controls['appointmentwith'].value,

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
    public keyPress(event: any) {
        if (event.charCode !== 0) {
            const pattern = /[0-9\\ ]/;
            const inputChar = String.fromCharCode(event.charCode);

            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
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
    CarInsurer(){
        const dialogRef = this.dialog.open(CarInsurer, {
            width: '1200px',
        });
        dialogRef.disableClose = true;
    }

}
@Component({
    selector: 'carinsurer',
    template: `        
        <div class="container">
        <div  class="row text-justify">
        
            <div class="col-sm-2">
            </div>
            <div class="col-sm-8">
                <h3 class="text-center" style="color: #00FB88 "><img src="assets/img/car-insurance.png" class="logo-size"> About Car Insurance</h3>
            </div>
            <div class="col-sm-2 text-right">
                <mat-icon (click)="onNoClick()" style="cursor: pointer">close</mat-icon>
            </div>
            <h3>WRITE UP ON CONTRACTORS ALL RISK POLICY (CAR)</h3>
            <p>Contractor’s All Risks (CAR) policy is a specifically designed policy to protect the interests of contractors and principals in respect of civil engineering projects like construction of buildings, bridges etc.</p>
            <p>Contractor’s all risk policy is an All Risk Cover except the perils, which are specially excluded.The more important causes of losses covered under contractor’s all risk policy are broadly 1. Location Risks: Fire, Lightning,Theft, Burglary and Housebreaking2.  Handling Risks:  Impact from falling objects, Collision, FailureOf Cranes or Tackles etc.	3.    Risks of Human element:   Carelessness, Negligence, Faulty Material, Construction, Strike & Riot, Malicious Damage, Terrorism., 4. Acts of God Risks:  Storm, Tempest, Hurricane,Flood, Inundation,  Subsidence, Landslide, Rockslide, Earthquake, 5. Testing and Commissioning Risks:  Failure of Safety Devices, LeakageOf Electricity, Insulation failure, Short Circuit, Explosion.</p>
            <p>The insurable property includes Civil Engineering projects like dwelling houses, multistoried buildings, office buildings, ware houses, hospitals, schools, churches, theatres, cinemas, factories, silos, water towers, concrete bridges and steel bridges, barrages, dams, canals, tunnels, irrigation and water supply system, drainage and sewer systems, roads, railways, runways of airport, hangers etc., and Construction work in connection with power stations, ports, airports etc.</p>
            <p>The coverage under C.A.R policy is under two sections: Material Damage and Third Party Liability. Each section has its own exclusions. In addition, there are general exclusions applicable to the entire policy and general conditions. The period of cover is defined in the policy as also the basis of indemnification.</p>
            <p>The cover starts from the commencement of work or after the materials required for the project have been unloaded at the site, and terminates when the completed structure or one completed part thereof is taken over or put into service.</p>
            <p>The Insurer’s liability for construction machinery, plant and equipment commences from their unloading at the site and expires on their removal therefrom. In addition, on specific request, it is possible to extend the period to include a maintenance period</p>
            <p>The following additional covers are available. a. Third party liability, b. Clearance and Removal of debris, c. Construction Plant and Machinery, d. Express Freight, (other than Air Freight), Over Time, e. Air Freight Cover, f. Surrounding Property, g. Escalation, h. Maintenance Visits Cover and i. Extended Maintenance Cover.</p>
         </div>
        </div>`,
})
export class CarInsurer {

    constructor(
        public dialogRef: MatDialogRef<CarInsurer>,
        @Inject(MAT_DIALOG_DATA) public data: any) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

}