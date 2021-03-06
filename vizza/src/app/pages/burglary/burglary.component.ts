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
import { WINDOW } from '@ng-toolkit/universal';
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

declare const global: any;
// tslint:disable-next-line:variable-name
const MouseEvent = (global as any).MouseEvent as MouseEvent;

@Component({
  selector: 'app-burglary',
  templateUrl: './burglary.component.html',
  styleUrls: ['./burglary.component.scss'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ]
})
export class BurglaryComponent implements OnInit {
    public burgapp: FormGroup;
    public setDate: any;
    public selectDate: any;
    public productName: any;
    public pin:any;
    public title: any;
    public response: any;
    public pincodeErrors: any;
    public webhost: any;
    public metaBurglary: any;
    public metaTitle: any;
    metaKeyword: any;
    metaDescription: any;
    public settings: Settings;

  constructor(@Inject(WINDOW) private window: Window, public fb: FormBuilder, public commonservices: CommonService, public datepipe: DatePipe, public route: ActivatedRoute, public toastr: ToastrService, public dialog: MatDialog,
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
      this.burgapp = this.fb.group({
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
          this.productName = params.id;
      });
      this.metaList();
  }

    public metaList() {
        this.settings.loadingSpinner = true;
        const data = {
            'platform': 'web',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'component_name': 'Burglary Insurance'
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
        this.settings.loadingSpinner = false;
        this.metaBurglary = successData.ResponseObject[0];
        this.metaTitle = this.metaBurglary.title;
        this.metaKeyword = this.metaBurglary.keyword;
        this.metaDescription = this.metaBurglary.descrition;
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
    burgKeeper(values) {

        if (this.burgapp.valid) {
            const data = {
                'platform': 'web',
                'product_type': 'offline',
                'appointment_date': this.setDate,
                'appointment_time': this.burgapp.controls['apptime'].value,
                'company_name': this.burgapp.controls['name'].value,
                'customer_mobile': this.burgapp.controls['mobile'].value,
                'customer_email': this.burgapp.controls['email'].value,
                'contact_person' : this.burgapp.controls['contactperson'].value,
                'pincode': this.burgapp.controls['pincode'].value,
                'product_name': this.burgapp.controls['insurance'].value,
                'appointment_with': this.burgapp.controls['appointmentwith'].value,

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
    BurglaryInsurer(){
        const dialogRef = this.dialog.open(BurglaryInsurer, {
            width: '1200px',
        });
        dialogRef.disableClose = true;
    }
}
@Component({
    selector: 'burglaryinsurer',
    template: `        
        <div class="container">
        <div  class="row text-justify">
        
            <div class="col-sm-2">
            </div>
            <div class="col-sm-8">
                <h3 class="text-center" style="color: #171915"><img src="assets/img/burglary-insurance.png" class="logo-size"> About Burglary Insurance</h3>
            </div>
            <div class="col-sm-2 text-right">
                <mat-icon (click)="onNoClick()" style="cursor: pointer">close</mat-icon>
            </div>
            <p>Burglary policy is available in the market  for residences and  business premises (with optional  theft extension). The insurance covers loss or damage  to the insured property, due to burglary of the premises. The damage has to be caused to the insured property by
forcible or violent means.</p>
            <p>The Burglary policy can be issued on a first loss basis which means that if the insured is a godown containing stocks worth several crores in a large volume and a total loss is impossible the insured chooses a rateable portion for the insurance say 25 % and the premium is charged accordingly.</p>
            <p>The policy can also be issued on a declaration basis wherever the value of stocks keeps on fluctuating. For all commercial establishments It is essential that a proper accounting of insured stocks as well as bills of purchase and sales books  are keptseparately in safe custody for the verification by the insurer in the unfortunate event of a claim.</p>
            <p>FIR and NON TRACEABLE CERTIFICATES  are a must in this policy for claim settlement. Lodging of FIR with the nearest police station immediately on noticing the loss is essential under this policy. The policy is generally issued for a year.</p>
            <p>Negligence by the insured person or failure to securely lock the entry to the premises and all openings will result in repudiation of the claim.</p>
            <p>Losses discovered during routine stock verification and accumulated losses are specifically excluded under the policy.</p>
         </div>
        </div>`,
})
export class BurglaryInsurer {

    constructor(
        public dialogRef: MatDialogRef<BurglaryInsurer>,
        @Inject(MAT_DIALOG_DATA) public data: any) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

}
