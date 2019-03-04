import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonService} from '../../shared/services/common.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService} from 'ngx-toastr';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-fire',
  templateUrl: './fire.component.html',
  styleUrls: ['./fire.component.scss']
})
export class FireComponent implements OnInit {
    public fireapp: FormGroup;
    public setDate: any;
    public selectDate: any;
    public productName: any;
    public pin:any;
    public title: any;
    public response: any;
    public pincodeErrors: any;

  constructor(public fb: FormBuilder, public commonservices: CommonService, public datepipe: DatePipe, public route: ActivatedRoute, public toastr: ToastrService, public dialog: MatDialog) {
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
      this.productName = '';
  }

  ngOnInit() {
      this.setDate = Date.now();
      this.setDate = this.datepipe.transform(this.setDate, 'y-MM-dd');
      this.route.params.forEach((params) => {
          this.productName = params.id;

      });
  }
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
            this.toastr.error(successData.ErrorObject);
            this.pincodeErrors = false;
        }else {
            this.pincodeErrors = true;
        }
    }

    public getPincodeDetailsFailure(error) {
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

    FireInsurer(){
        const dialogRef = this.dialog.open(FireInsurer, {
            width: '1200px',
        });
        dialogRef.disableClose = true;
    }
}
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
