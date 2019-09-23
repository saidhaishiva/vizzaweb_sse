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
import {Meta, Title} from '@angular/platform-browser';
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
  selector: 'app-grouppersonal',
  templateUrl: './grouppersonal.component.html',
  styleUrls: ['./grouppersonal.component.scss'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ]
})
export class GrouppersonalComponent implements OnInit {
    public perapp: FormGroup;
    public setDate: any;
    public selectDate: any;
    public productName: any;
    public pin:any;
    public title: any;
    public response: any;
    public pincodeErrors: any;
    public webhost: any;
    public metaGroupPa: any;
    public metaTitle: any;
    metaKeyword: any;
    metaDescription: any;
    public settings: Settings;

  constructor(public fb: FormBuilder, public commonservices: CommonService, public datepipe: DatePipe, public route: ActivatedRoute,public toastr: ToastrService,public dialog: MatDialog,
              public config: ConfigurationService,public appSettings: AppSettings, public meta: MetaService, public auth: AuthService, public metaTag: Meta, private titleService: Title) {
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
      this.perapp = this.fb.group({
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
      this.metaList();
  }

    public metaList() {
        const data = {
            'platform': 'web',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'component_name': 'Group Personal Accident'
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
        this.metaGroupPa = successData.ResponseObject[0];
        this.metaTitle = this.metaGroupPa.title;
        this.metaKeyword = this.metaGroupPa.keyword;
        this.metaDescription = this.metaGroupPa.descrition;
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

    addEvent(event) {
        this.selectDate = event.value;
        this.setDate = this.datepipe.transform(this.selectDate, 'y-MM-dd');
    }
    perKeeper(values) {

        if (this.perapp.valid) {
            const data = {
                'platform': 'web',
                'product_type': 'offline',
                'appointment_date': this.setDate,
                'appointment_time': this.perapp.controls['apptime'].value,
                'company_name': this.perapp.controls['name'].value,
                'customer_mobile': this.perapp.controls['mobile'].value,
                'customer_email': this.perapp.controls['email'].value,
                'contact_person' : this.perapp.controls['contactperson'].value,
                'pincode': this.perapp.controls['pincode'].value,
                'product_name': this.perapp.controls['insurance'].value,
                'appointment_with': this.perapp.controls['appointmentwith'].value,

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
    GroupPersonalAccidentInsurer(){
        const dialogRef = this.dialog.open(GroupPersonalAccidentInsurer, {
            width: '1200px',
        });
        dialogRef.disableClose = true;
    }
}
@Component({
    selector: 'grouppersonalaccidentinsurer',
    template: `        
        <div class="container">
        <div  class="row text-justify">
        
            <div class="col-sm-2">
            </div>
            <div class="col-sm-8">
                <h3 class="text-center" style="color: #32326D"><img src="assets/img/group-personal-accidents.png" class="logo-size"> About Group Personal Accident</h3>
            </div>
            <div class="col-sm-2 text-right">
                <mat-icon (click)="onNoClick()" style="cursor: pointer">close</mat-icon>
            </div>
         </div>
           <p>The personal accident insurance for employees insured as a group can be issued on a named or unnamed basis. The premium will also have the added advantages of group discount and low claim discount. There could be a loading if the claims ratio is high. Another advantage is that the policy can be issued for the employees whilst at work only for which a substantial premium reduction will be there.</p>
           <ol type="1" class="pl-5">
            <li>The benefit under the Personal Accidental Death section is payable when an Injury results in the loss of life of the Insured solely due to accidental injury.</li>
            <li>Accidental Injury means bodily injury caused solely and directly by violent, accidental, external and visible means and should necessarily occur during the Insured Period of 12 months from the date of inception of the policy.</li>
            <li>The definition of Injury does not extend to other non physical consequences such as mental, nervous or emotional disorders, depression or anxiety of any Accident and these are specifically  excluded in the Personal Accident  Policy</li>
            <li>The definition of Accident means a sudden, unforeseen and unexpected physical event caused by external, violent and visible means.</li>
            <li>The policy on opting the widest cover provides for weekly compensation benefit to the extent of 1 % of sum insured every week for approximately 100 weeks ( The percentage and number of weeks varies from insurer to insurer) till such time that the insured is able to resume his /  her normal activities.</li>
            <li>The Personal Accident policy has a coverage / compensation for Temporary Total Disablement and Temporary Partial Disablements on a fixed percentage basis if the insured opts with the TTD and TPD benefits apart from the death benefit.</li>
           </ol>
        </div>`,
})
export class GroupPersonalAccidentInsurer {

    constructor(
        public dialogRef: MatDialogRef<GroupPersonalAccidentInsurer>,
        @Inject(MAT_DIALOG_DATA) public data: any) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

}
