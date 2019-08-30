import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonService} from '../../shared/services/common.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {Settings} from '../../app.settings.model';
import {AppSettings} from '../../app.settings';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import {MetaService} from '../../shared/services/meta.service';
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
  selector: 'app-workmen',
  templateUrl: './workmen.component.html',
  styleUrls: ['./workmen.component.scss'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ]
})
export class WorkmenComponent implements OnInit {
    public workapp: FormGroup;
    public setDate: any;
    public selectDate: any;
    public productName: any;
    public pin:any;
    public title: any;
    public response: any;
    public pincodeErrors: any;
    public webhost: any;
    public metaWorkman: any;
    public metaTitle: any;
    public settings: Settings;

  constructor(public fb: FormBuilder, public commonservices: CommonService, public datepipe: DatePipe, public route: ActivatedRoute,public toastr: ToastrService,public dialog: MatDialog,public config: ConfigurationService,
              public appSettings: AppSettings, public meta: MetaService, public auth: AuthService) {
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
      this.workapp = this.fb.group({
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
          console.log(params.id);
          this.productName = params.id;
      });
      this.metaList();
  }

    public metaList() {
        const data = {
            'platform': 'web',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'component_name': 'Workmen Compensation'
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
        console.log(successData.ResponseObject);
        this.metaWorkman = successData.ResponseObject;
        this.metaTitle = this.metaWorkman[0].title;
        console.log(this.metaWorkman[0].title, 'titl')
    }
    public metaDetailFailure(error) {
        console.log(error);
    }

    addEvent(event) {
        this.selectDate = event.value;
        this.setDate = this.datepipe.transform(this.selectDate, 'y-MM-dd');
    }
    workKeeper(values) {

        if (this.workapp.valid) {
            console.log(values,'sasdasd');
            const data = {
                'platform': 'web',
                'product_type': 'offline',
                'appointment_date': this.setDate,
                'appointment_time': this.workapp.controls['apptime'].value,
                'company_name': this.workapp.controls['name'].value,
                'customer_mobile': this.workapp.controls['mobile'].value,
                'customer_email': this.workapp.controls['email'].value,
                'contact_person' : this.workapp.controls['contactperson'].value,
                'pincode': this.workapp.controls['pincode'].value,
                'product_name': this.workapp.controls['insurance'].value,
                'appointment_with': this.workapp.controls['appointmentwith'].value,

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
    WorkmenInsurer() {
        const dialogRef = this.dialog.open(WorkmenInsurer, {
            width: '1200px',
        });
        dialogRef.disableClose = true;
    }
}
@Component({
    selector: 'workmeninsurer',
    template: `        
        <div class="container">
        <div  class="row text-justify">
        
            <div class="col-sm-2">
            </div>
            <div class="col-sm-8">
                <h3 class="text-center" style="color: #FFD400; text-shadow: 0 0 3px #fff, 0 0 5px #FCC645;"><img src="assets/img/workmen.png" class="logo-size"> About Workmen Compensation</h3>
            </div>
            <div class="col-sm-2 text-right">
                <mat-icon (click)="onNoClick()" style="cursor: pointer">close</mat-icon>
            </div>
         </div>
         <p>Workmen compensation insurance provides compensation as per WC act to injuries in the course of employment.  The insurance takes care of the liability of the employer as defined under the Workmen Compensation Act for injuries and death of the employee defined as a workman during the course of employment.</p>
         <p>The WC policy can be taken by any employer as a principal or contractor for engaging workmen as defined in the WC Act to cover the liability of the employer under statute and as per common law. The option of covering employees who do not qualify as “ WORKMEN”  by the employer by a separate table is also available.</p>
         <p>The WC policy provides indemnity to the insured as an employer to accidental injuries and fatal accidents sustained by the workmen whilst at work. There is an option to cover medical expenses for accidental employment injuries on payment of extra premium.</p>
         <p>The Workmen compensation act 1923,provides for the payment of compensation by an Employer to his Employees (for their dependants in the event of fatal accidents) If personal injury is caused to them by accidents arising out of and in the course of their employment. There is an amendment to the act in 2000 and as per that amendment the maximum compensation payable for Fatal Injury is Rs 4,57,080, for Permanent Total Disablement it is Rs 5,48,496. For Permanent Partial Disablement it is according to the incapacity caused. In case of Temporary disablement it is Rs 2000 per month upto a period of 5 years.</p>
         <p>TheINDIAN FATAL ACCIDENTS ACT, 1855 enables claims for damages upto an unlimited amount to be maintained against a person who by this wrongful act, neglect or default causes the death of another.</p>
         <p>The Common law gives a person the right to claim from another damages upto an unlimited amount for injury or loss sustained on account of the negligence of such other person or of his servants acting in the scope of their Employment.</p>
        </div>`,
})
export class WorkmenInsurer {

    constructor(
        public dialogRef: MatDialogRef<WorkmenInsurer>,
        @Inject(MAT_DIALOG_DATA) public data: any) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

}
