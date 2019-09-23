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
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ]
})
export class PublicComponent implements OnInit {
    public pubapp: FormGroup;
    public setDate: any;
    public selectDate: any;
    public productName: any;
    public pin:any;
    public title: any;
    public response: any;
    public pincodeErrors: any;
    public webhost: any;
    public metaLiability: any;
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
      this.pubapp = this.fb.group({
          'appdate': ['', Validators.required],
          'apptime': null,
          'name': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
          'contactperson':  ['', Validators.compose([Validators.required])],
          'mobile': ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}'), Validators.minLength(10)])],
          'email': ['', Validators.compose([Validators.required,  Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
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
            'component_name': 'Public Liability Policy'
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
        this.metaLiability = successData.ResponseObject[0];
        this.metaTitle = this.metaLiability.title;
        this.metaKeyword = this.metaLiability.keyword;
        this.metaDescription = this.metaLiability.descrition;
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
    publicKeeper(values) {

        if (this.pubapp.valid) {
            console.log(values,'sasdasd');
            const data = {
                'platform': 'web',
                'product_type': 'offline',
                'appointment_date': this.setDate,
                'appointment_time': this.pubapp.controls['apptime'].value,
                'company_name': this.pubapp.controls['name'].value,
                'customer_mobile': this.pubapp.controls['mobile'].value,
                'customer_email': this.pubapp.controls['email'].value,
                'contact_person' : this.pubapp.controls['contactperson'].value,
                'pincode': this.pubapp.controls['pincode'].value,
                'product_name': this.pubapp.controls['insurance'].value,
                'appointment_with': this.pubapp.controls['appointmentwith'].value,

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

    PublicInsurer(){
        const dialogRef = this.dialog.open(PublicInsurer, {
            width: '1200px',
        });
        dialogRef.disableClose = true;
    }
}
@Component({
    selector: 'publicinsurer',
    template: `        
        <div class="container">
        <div  class="row text-justify">
        
            <div class="col-sm-2">
            </div>
            <div class="col-sm-8">
                <h3 class="text-center" style="color: #EF9A9A"> About Public Liability Policy</h3>
            </div>
            <div class="col-sm-2 text-right">
                <mat-icon (click)="onNoClick()" style="cursor: pointer">close</mat-icon>
            </div>
                <p>Public Liability Insurance Policy covers the insured as per stipulation in The Public Liability Insurance Act 1991.The  Act states the responsibility ofthe owner who has control over the hazardous substance at the time of accident whetherhe is involved in manufacturing, processing, treatment, packaging, transporting by vehicleother than railways, storage, sale, collection, use, conversion, destruction of hazardoussubstance, is compulsorily required to take insurance policy to pay compensation to thepersons handling or affected by the accidents caused due to handling of hazardoussubstances.</p>
                <p>The claim for the relief is enquired and awarded by theDistrict Collector. The sum insured should not be less than the amount of paid capital of the institution handling hazardous substances.</p>
                <p>The premium is charged on the sum insured and the insured should alsopay an equal amount to the insurer to be credited to the Environment Relief Fund in addition to the premium. This amount is remitted by the insurer to the concerned authority.</p>
         </div>
        </div>`,
})
export class PublicInsurer {

    constructor(
        public dialogRef: MatDialogRef<PublicInsurer>,
        @Inject(MAT_DIALOG_DATA) public data: any) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

}
