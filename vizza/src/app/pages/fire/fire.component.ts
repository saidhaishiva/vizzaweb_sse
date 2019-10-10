import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonService} from '../../shared/services/common.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService} from 'ngx-toastr';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS} from '@angular/material';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {Settings} from '../../app.settings.model';
import {AppSettings} from '../../app.settings';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
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

@Component({
  selector: 'app-fire',
  templateUrl: './fire.component.html',
  styleUrls: ['./fire.component.scss'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ]
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
    public webhost: any;
    public metaFire: any;
    public metaTitle: any;
    metaKeyword: any;
    metaDescription: any;
    public settings: Settings;

  constructor(@Inject(WINDOW) private window: Window, public fb: FormBuilder, public commonservices: CommonService, public datepipe: DatePipe, public route: ActivatedRoute, public toastr: ToastrService, public dialog: MatDialog,public config: ConfigurationService,
              public appSettings: AppSettings, public meta: MetaService, public auth: AuthService, public metaTag: Meta, private titleService: Title) {
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
      this.metaList();
  }

    public metaList() {
        const data = {
            'platform': 'web',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'component_name': 'Fire Insurance'
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
        this.metaFire = successData.ResponseObject[0];
        this.metaTitle = this.metaFire.title;
        this.metaKeyword = this.metaFire.keyword;
        this.metaDescription = this.metaFire.descrition;
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
                <h3 class="text-center" style="color: #F4611F"><img src="assets/img/fire-insurance.png" class="logo-size"> About Fire Insurance</h3>
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
