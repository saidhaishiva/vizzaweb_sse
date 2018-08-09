import { Component, OnInit } from '@angular/core';
import {DatePipe} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../shared/services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {AppSettings} from '../../../app.settings';
import {BranchService} from '../../../shared/services/branch.service';
import {Settings} from '../../../app.settings.model';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
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
  selector: 'app-addrelationalmanager',
  templateUrl: './addrelationalmanager.component.html',
  styleUrls: ['./addrelationalmanager.component.scss'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ]
})
export class AddrelationalmanagerComponent implements OnInit {
    public form: FormGroup;
    branch: any;
    public response: any;
    public status: any;
    public settings: Settings;
    loadingIndicator: boolean = true;
    public branchLists: any;
    public responsedata: any;
    public smList: any;
  constructor(public appSettings: AppSettings, public forms: FormBuilder, public auth: AuthService, public branchservice: BranchService,
              public datepipe: DatePipe, public toastr: ToastrService) {
      this.form = this.forms.group ({
          'firstname': ['', Validators.compose([Validators.required])],
          'lastname': ['', Validators.compose([Validators.required])],
          'mobilenumber': ['', Validators.compose([Validators.required])],
          'dob': ['', Validators.compose([Validators.required])],
          'gender': ['', Validators.compose([Validators.required])],
          'email': ['', Validators.compose([Validators.required])],
          'branch': ['', Validators.compose([Validators.required])],
          'salesmanager': ['', Validators.compose([Validators.required])],

      });
  }


  ngOnInit() {
    this.branchList();
    this.salesManagerList([]);
  }
    public addRelationlManager(): void {
        if (this.form.valid) {
            const date = this.datepipe.transform(this.form.controls['dob'].value, 'yyyy-MM-dd');
            console.log(date);
            const data = {
                'roleid': this.auth.getAdminRoleId(),
                'userid': this.auth.getAdminId(),
                'platform': 'web',
                'firstname': this.form.controls['firstname'].value,
                'lastname': this.form.controls['lastname'].value,
                'mobile': this.form.controls['mobilenumber'].value,
                'dateofbirth': date,
                'gender': this.form.controls['gender'].value,
                'email': this.form.controls['email'].value,
                'branchid': this.form.controls['branch'].value,
                'salesmanagerid': this.form.controls['salesmanager'].value,



            };
            console.log(data, 'aaa');

            this.branchservice.addRelationlManagerList(data).subscribe(
                (successData) => {
                    this.addRelationalSuccess(successData);
                },
                (error) => {
                    this.addRelationalFailure(error);
                }
            );
        }
    }
    public addRelationalSuccess(success) {
        console.log(success);
        if (success.IsSuccess) {
            this.responsedata = success.ResponseObject;
            this.toastr.success(success.ResponseObject);
        } else {
            this.toastr.error(success.ErrorObject);

        }
    }

    public addRelationalFailure(error) {

    }
    public branchList() {
        const data = {
            'platform': 'web',
            'roleid': this.auth.getAdminRoleId(),
            'userid': this.auth.getAdminId(),
            'branchmanagerid': '',

        };
        this.branchservice.branchList(data).subscribe(
            (successData) => {
                this.branchListSuccess(successData);
            },
            (error) => {
                this.branchListFailure(error);
            }
        );
    }
    public branchListSuccess(success) {
        console.log(success);
        if (success.IsSuccess) {
            this.branchLists = success.ResponseObject;

        } else {
        }
    }

    public branchListFailure(error) {

    }
    public salesManagerList(value) {

        const data = {
            'platform': 'web',
            'roleid': this.auth.getAdminRoleId(),
            'userid': this.auth.getAdminId(),
            'bm_id': '',
            'branch_id': [],
        };

        this.branchservice.salesManagerList(data).subscribe(
            (successData) => {
                this.salesSuccess(successData);
            },
            (error) => {
                this.salesFailure(error);
            }
        );
    }
    public salesSuccess(success) {
        console.log(success);
        if (success.IsSuccess) {
            this.smList = success.ResponseObject;
        } else {
        }
    }

    public salesFailure(error) {

    }
    public keyPress(event: any) {
        if (event.charCode !== 0) {
            const pattern = /[0-9\\ ]/;
            const inputChar = String.fromCharCode(event.charCode);

            if (!pattern.test(inputChar)) {
                // invalid character, prevent input
                event.preventDefault();
            }
        }
    }
}
