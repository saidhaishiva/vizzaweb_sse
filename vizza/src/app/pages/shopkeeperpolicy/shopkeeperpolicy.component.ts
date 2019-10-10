import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonService} from '../../shared/services/common.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService} from 'ngx-toastr';
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

@Component({
  selector: 'app-shopkeeperpolicy',
  templateUrl: './shopkeeperpolicy.component.html',
  styleUrls: ['./shopkeeperpolicy.component.scss'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ]
})
export class ShopkeeperpolicyComponent implements OnInit {
    public shopapp: FormGroup;
    public setDate: any;
    public selectDate: any;
    public productName: any;
    public pin:any;
    public title: any;
    public response: any;
    public pincodeErrors: any;
    public webhost: any;
    public metaShopKeeper: any;
    public metaTitle: any;
    metaKeyword: any;
    metaDescription: any;
    public settings: Settings;

  constructor(@Inject(WINDOW) private window: Window, public fb: FormBuilder, public commonservices: CommonService, public datepipe: DatePipe, public route: ActivatedRoute, public toastr: ToastrService, public dialog: MatDialog,
              public config: ConfigurationService,public appSettings: AppSettings,public meta: MetaService, public auth: AuthService, public metaTag: Meta, private titleService: Title) {
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
      this.shopapp = this.fb.group({
          'appdate': ['', Validators.required],
          'apptime': null,
          'name': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
          'contactperson':  ['', Validators.compose([Validators.required])],
          'mobile': ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}'), Validators.minLength(10)])],
          'email': ['', Validators.compose([Validators.required , Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
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
      this.pincodeErrors = false;
      this.metaList();
  }

    public metaList() {
        const data = {
            'platform': 'web',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'component_name': 'Shopkeepers Policy'
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
        this.metaShopKeeper = successData.ResponseObject[0];
        this.metaTitle = this.metaShopKeeper.title;
        this.metaKeyword = this.metaShopKeeper.keyword;
        this.metaDescription = this.metaShopKeeper.descrition;
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
    shopKeeper(values) {

        if (this.shopapp.valid) {
            console.log(values,'sasdasd');
           
            const data = {
                'platform': 'web',
                'product_type': 'offline',
                'appointment_date': this.setDate,
                'appointment_time': this.shopapp.controls['apptime'].value,
                'company_name': this.shopapp.controls['name'].value,
                'customer_mobile': this.shopapp.controls['mobile'].value,
                'customer_email': this.shopapp.controls['email'].value,
                'contact_person' : this.shopapp.controls['contactperson'].value,
                'pincode': this.shopapp.controls['pincode'].value,
                'product_name': this.shopapp.controls['insurance'].value,
                'appointment_with': this.shopapp.controls['appointmentwith'].value,

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
    ShopkepperInsurer(){
        const dialogRef = this.dialog.open(ShopkepperInsurer, {
            width: '1200px',
        });
        dialogRef.disableClose = true;
    }
}
@Component({
    selector: 'shopkepperinsurer',
    template: `        
        <div class="container">
        <div  class="row text-justify">
        
            <div class="col-sm-2">
            </div>
            <div class="col-sm-8">
                <h3 class="text-center" style="color: #EF2A93"><img src="assets/img/Shop-Keepers-Policy.png" class="logo-size"> About Shopkeepers Policy</h3>
            </div>
            <div class="col-sm-2 text-right">
                <mat-icon (click)="onNoClick()" style="cursor: pointer">close</mat-icon>
            </div>
         </div>
         <p>This insurance package provides you the protection for the property / items  you have obtained and covers damages arising out of Fire and natural calamities like flood, earthquake and other risks such as burglary,  theft,  vandalism which are beyond our control and cannot be predicted and losses are unavoidable in spite of our best precautions.</p>
         <p>This policy is a specially packaged policy which protects the entire shop and the building (if owned) also. The policy can be extended to cover the goods held  in trust by the salespersons.</p>
         <p>The Fixed Plate Glasses in the shop is another vulnerable area where any riot and strike or a malicious damage can cause a severe damage which can also be covered under this policy.</p>
         <p>Money in Transit from bank to the shop and vice versa and money held in counter is also insurable.</p>
         <p>Appliances like refrigerator, CCTV, air conditioners and such other items can be insured against Breakdown and all electronic equipments including Personal computers can be covered under this policy.</p>
         <p>Many of us are not aware that we are legally liable for accidents occurring whilst on duty for the workmen like servants, security staff and such other persons. It is essential that we cover the liability of such workmen at the shop on an unnamed basis based on the salaries disbursed to them. There is a provision to cover the same in this package policy.</p>
         <p>Apart from that it is essential that we have a public liability cover which takes care of any liability arising on the shop for example liability could arise from damages caused by a sign board falling on a person or vehicle or customers getting trapped inside the shop at a time of fire or it could be that a customer is injured whilst in the shop for any reason and so on.</p>
        </div>`,
})
export class ShopkepperInsurer {

    constructor(
        public dialogRef: MatDialogRef<ShopkepperInsurer>,
        @Inject(MAT_DIALOG_DATA) public data: any) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

}
