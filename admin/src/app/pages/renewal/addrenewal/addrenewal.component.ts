import { Component, OnInit, Inject } from '@angular/core';
import {AppSettings} from '../../../app.settings';
import {ConfigurationService} from '../../../shared/services/configuration.service';
import {AuthService} from '../../../shared/services/auth.service';
import {CommonService} from '../../../shared/services/common.service';
import {DatePipe} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Settings} from '../../../app.settings.model';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MomentDateAdapter} from "@angular/material-moment-adapter";



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
  selector: 'app-addrenewal',
  templateUrl: './addrenewal.component.html',
  styleUrls: ['./addrenewal.component.scss'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ]
})
export class AddrenewalComponent implements OnInit {
    public form: FormGroup;
    public setDate: any;
    public selectDate: any;
    public settings: Settings;
    companyList: any;
    comments: any;
    webhost: any;
    paymentFrequency: any;
    policyTypes: any;
    today: any;
    maxDate: any;
    dateError: any;
    constructor(public dialogRef: MatDialogRef<AddrenewalComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any, public auth: AuthService, public fb: FormBuilder, public datepipe: DatePipe , public appSettings: AppSettings, public toastr: ToastrService, public config: ConfigurationService, public common: CommonService, public dialog: MatDialog) {

        this.form =  this.fb.group({
          'insurename': ['', Validators.required],
          'startdate': ['', Validators.required],
          'enddate': ['', Validators.required],
          'insureemail': ['', Validators.compose([Validators.required,Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
          'insurepolicytype':  ['', Validators.compose([Validators.required])],
          'insuremobile': ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}'), Validators.minLength(10)])],
          'insurepolicyno': ['', Validators.compose([Validators.required])],
          'insurepremiumamount': ['', Validators.compose([Validators.required])],
          'insurecompanyname': ['',Validators.compose([Validators.required])],
          'paymentfrequeny': ['',Validators.compose([Validators.required])]
      });
      this.settings = this.appSettings.settings;
        this.today = new Date();
        this.paymentFrequency = [
            {'id': 1, 'name': 'Annually'},
            {'id': 2, 'name': 'Half Yearly'},
            {'id': 3, 'name': 'Quarterly'},
            {'id': 4, 'name': 'Monthly'}
        ];
  }

  ngOnInit() {
        this.getPolicyTypes();
  }
    onNoClick(): void {
        this.dialogRef.close()
    }
    chooseDate(event, type) {
        console.log(event, 'event');
        this.maxDate = '';
        if (event.value != null) {
            if (typeof event.value._i == 'string') {
                const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
                if (pattern.test(event.value._i) && event.value._i.length == 10) {
                    this.dateError = '';
                } else {
                    this.dateError = 'Enter Valid Date';
                }
                let selectedDate;
                selectedDate = event.value._i;
                console.log(selectedDate, 'selectedDate');

                if (selectedDate.length == 10) {
                    if (type == 'sDate') {
                        this.maxDate = event.value;
                    }
                }
            } else if (typeof event.value._i == 'object') {
                this.dateError = '';
                console.log(event.value, 'event.value');
                if (type == 'sDate') {
                    this.maxDate = event.value;
                }
            }
            console.log(this.maxDate, 'maxDate22');
        }
    }

    selectPolicyType(compId) {
        this.getcompanyList(compId);
    }
    getPolicyTypes() {
        const data = {
            'platform': 'web',
            "adminid": this.auth.getAdminId(),
            "role_id": this.auth.getAdminRoleId()
        }
        this.common.policyTypes(data).subscribe(
            (successData) => {
                this.getpolicytypeSuccess(successData);
            },
            (error) => {
                this.getpolicytypeFailure(error);
            }
        );
    }
    public getpolicytypeSuccess(successData) {
        if (successData.IsSuccess) {
            this.policyTypes = successData.ResponseObject;
        }
    }
    public getpolicytypeFailure(error) {
        console.log(error);
    }

    getcompanyList(cid) {
        const data = {
            'platform': 'web',
            "adminid": this.auth.getAdminId(),
            "role_id": this.auth.getAdminRoleId(),
            "insure_company_type_id": cid
        }
        this.common.getcompanyList(data).subscribe(
            (successData) => {
                this.setcompanyListSuccess(successData);
            },
            (error) => {
                this.setcompanyListFailure(error);
            }
        );
    }
    public setcompanyListSuccess(successData) {
        if (successData.IsSuccess == true) {
            this.companyList = successData.ResponseObject;
            console.log(this.companyList, 'this.companyList');

        }
    }
    public setcompanyListFailure(error) {
        console.log(error);
    }

    renewal(values){
        if (this.form.valid) {
            let sdate = this.datepipe.transform(this.form.controls['startdate'].value, 'y-MM-dd');
            let edate = this.datepipe.transform(this.form.controls['enddate'].value, 'y-MM-dd');
            const data = {
                'platform': 'web',
                "adminid": this.auth.getAdminId(),
                "role_id": this.auth.getAdminRoleId(),
                'insure_name': this.form.controls['insurename'].value,
                'insure_start_date': sdate,
                'insure_end_date': edate,
                'insure_email': this.form.controls['insureemail'].value,
                'insure_policy_type': this.form.controls['insurepolicytype'].value,
                'insure_mobile': this.form.controls['insuremobile'].value,
                'insure_policy_no': this.form.controls['insurepolicyno'].value,
                'insure_premium_amount' : this.form.controls['insurepremiumamount'].value,
                'insure_company_name': this.form.controls['insurecompanyname'].value,
                'insure_payment_frequency': this.form.controls['paymentfrequeny'].value
            };
            console.log(data,'datadata');

            this.common.policyRenewal(data).subscribe(
                (successData) => {
                    this.policyRenewalSuccess(successData);
                },
                (error) => {
                    this.policyRenewalFailure(error);
                }
            );
        }
    }
    policyRenewalSuccess(successData) {
        console.log(successData);
        if (successData.IsSuccess) {
            this.toastr.success(successData.ResponseObject);
            this.dialogRef.close(true);
        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }
    policyRenewalFailure(error) {
        console.log(error);
    }
    public keyPress(event: any) {
        if (event.charCode !== 0) {
            const pattern = /[0-9]/;
            const inputChar = String.fromCharCode(event.charCode);

            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }

    public onChar(event: any) {
        if (event.charCode !== 0) {
            const pattern = /[a-zA-Z]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }
}
