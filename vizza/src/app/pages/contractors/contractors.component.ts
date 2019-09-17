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
  selector: 'app-contractors',
  templateUrl: './contractors.component.html',
  styleUrls: ['./contractors.component.scss'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ]
})
export class ContractorsComponent implements OnInit {
    public contapp: FormGroup;
    public setDate: any;
    public selectDate: any;
    public productName: any;
    public pin:any;
    public title: any;
    public response: any;
    public pincodeErrors: any;
    public webhost: any;
    public metaContractor: any;
    public metaTitle: any;
    metaKeyword: any;
    metaDescription: any;
    public settings: Settings;

  constructor(public fb: FormBuilder, public commonservices: CommonService, public datepipe: DatePipe, public route: ActivatedRoute, public toastr: ToastrService,public dialog: MatDialog,
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
      this.contapp = this.fb.group({
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
        const data = {
            'platform': 'web',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'component_name': 'Contractors All Risk Policy'
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
        this.metaContractor = successData.ResponseObject[0];
        this.metaTitle = this.metaContractor.title;
        this.metaKeyword = this.metaContractor.keyword;
        this.metaDescription = this.metaContractor.descrition;
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
    contractKeeper(values) {

        if (this.contapp.valid) {
            const data = {
                'platform': 'web',
                'product_type': 'offline',
                'appointment_date': this.setDate,
                'appointment_time': this.contapp.controls['apptime'].value,
                'company_name': this.contapp.controls['name'].value,
                'customer_mobile': this.contapp.controls['mobile'].value,
                'customer_email': this.contapp.controls['email'].value,
                'contact_person' : this.contapp.controls['contactperson'].value,
                'pincode': this.contapp.controls['pincode'].value,
                'product_name': this.contapp.controls['insurance'].value,
                'appointment_with': this.contapp.controls['appointmentwith'].value,

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
    ContractorsInsurer(){
        const dialogRef = this.dialog.open(ContractorsInsurer, {
            width: '1200px',
        });
        dialogRef.disableClose = true;
    }
}
@Component({
    selector: 'contractorsinsurer',
    template: `        
        <div class="container">
        <div  class="row text-justify">
        
            <div class="col-sm-2">
            </div>
            <div class="col-sm-8">
                <h3 class="text-center" style="color: #9D9C9D"> About Contractors All Risk Policy</h3>
            </div>
            <div class="col-sm-2 text-right">
                <mat-icon (click)="onNoClick()" style="cursor: pointer">close</mat-icon>
            </div>
                <p>Contractor’s All Risks (CAR) policy is a specifically designed policy to protect the interests of contractors and principals in respect of civil engineering projects like construction of buildings, bridges etc.</p>
                <p>Contractor’s all risk policy is an All Risk Cover except the perils, which are specially excluded.The more important causes of losses covered under contractor’s all risk policy are broadly 1. Location Risks: Fire, Lightning,Theft, Burglary and Housebreaking2.  Handling Risks:  Impact from falling objects, Collision, FailureOf Cranes or Tackles etc.	3.    Risks of Human element:   Carelessness, Negligence, Faulty Material, Construction, Strike & Riot, Malicious Damage, Terrorism., 4. Acts of God Risks:  Storm, Tempest, Hurricane,Flood, Inundation,  Subsidence, Landslide, Rockslide, Earthquake, 5. Testing and Commissioning Risks:  Failure of Safety Devices, LeakageOf Electricity, Insulation failure, Short Circuit, Explosion.</p>
                <p>The insurable property includes Civil Engineering projects like dwelling houses, multistoried buildings, office buildings, ware houses, hospitals, schools, churches, theatres, cinemas, factories, silos, water towers, concrete bridges and steel bridges, barrages, dams, canals, tunnels, irrigation and water supply system, drainage and sewer systems, roads, railways, runways of airport, hangers etc., and Construction work in connection with power stations, ports, airports etc.</p>
                <p>The coverage under C.A.R policy is under two sections: Material Damage and Third Party Liability. Each section has its own exclusions. In addition, there are general exclusions applicable to the entire policy and general conditions. The period of cover is defined in the policy as also the basis of indemnification.</p>
                <p>The cover starts from the commencement of work or after the materials required for the project have been unloaded at the site, and terminates when the completed structure or one completed part thereof is taken over or put into service.</p>
                <p>The Insurer’s liability for construction machinery, plant and equipment commences from their unloading at the site and expires on their removal therefrom. In addition, on specific request, it is possible to extend the period to include a maintenance period.</p>
                <p>The following additional covers are available. a. Third party liability, b. Clearance and Removal of debris, c. Construction Plant and Machinery, d. Express Freight, (other than Air Freight), Over Time, e. Air Freight Cover, f. Surrounding Property, g. Escalation, h. Maintenance Visits Cover and i. Extended Maintenance Cover.</p>
         </div>
        </div>`,
})
export class ContractorsInsurer {

    constructor(
        public dialogRef: MatDialogRef<ContractorsInsurer>,
        @Inject(MAT_DIALOG_DATA) public data: any) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

}
