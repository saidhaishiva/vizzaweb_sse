import { Component, OnInit } from '@angular/core';
import {AppSettings} from '../../../app.settings';
import {AuthService} from '../../../shared/services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {BranchService} from '../../../shared/services/branch.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {Settings} from '../../../app.settings.model';

@Component({
  selector: 'app-addsalesmanager',
  templateUrl: './addsalesmanager.component.html',
  styleUrls: ['./addsalesmanager.component.scss']
})
export class AddsalesmanagerComponent implements OnInit {
    public form: FormGroup;
    branch: any;
    public response: any;
    public status: any;
    public settings: Settings;
    public responsedata: any;
    public branchLists: any;
    loadingIndicator: boolean = true;
    public bmList: any;

  constructor(public appSettings: AppSettings, public forms: FormBuilder, public auth: AuthService, public branchservice: BranchService,
              public datepipe: DatePipe, public toastr: ToastrService) {
      this.settings = this.appSettings.settings;
      this.form = this.forms.group ({
          'firstname': ['', Validators.compose([Validators.required])],
          'lastname': ['', Validators.compose([Validators.required])],
          'mobilenumber': ['', Validators.compose([Validators.required])],
          'dob': ['', Validators.compose([Validators.required])],
          'gender': ['', Validators.compose([Validators.required])],
          'email': ['', Validators.compose([Validators.required])],
          'branch': ['', Validators.compose([Validators.required])],
          'branchmanager': ['', Validators.compose([Validators.required])],

      });
  }
  ngOnInit() {
      this.branchList();
      this.branchManagerList([]);

  }

    public addSalesManager(): void {
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
                'bm_id': this.form.controls['branchmanager'].value

            };
            console.log(data, 'aaa');

            this.loadingIndicator = true;
            this.branchservice.addsalesManagerList(data).subscribe(
                (successData) => {
                    this.addSalesSuccess(successData);
                },
                (error) => {
                    this.addSalesFailure(error);
                }
            );
        }
    }
    public addSalesSuccess(success) {
        console.log(success);
        this.loadingIndicator = false;
        if (success.IsSuccess) {
            this.responsedata = success.ResponseObject;
            this.toastr.success(success.ResponseObject);

        } else {
            this.toastr.error(success.ErrorObject);

        }
    }

    public addSalesFailure(error) {

    }
    public branchList() {
        const data = {
            'platform': 'web',
            'roleid': this.auth.getAdminRoleId(),
            'userid': this.auth.getAdminId(),
            'branchmanagerid': '',

        };
        // this.loadingIndicator = true;
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
    public branchManagerList(value) {
        const data = {
            'platform': 'web',
            'roleid': this.auth.getAdminRoleId(),
            'userid': this.auth.getAdminId(),
            'branchid': value,
            'branch_id': value
        };

        this.branchservice.branchManagerList(data).subscribe(
            (successData) => {
                this.branchSuccess(successData);
            },
            (error) => {
                this.branchFailure(error);
            }
        );
    }
    public branchSuccess(success) {
        console.log(success);
        this.loadingIndicator = false;
        if (success.IsSuccess) {
            this.bmList = success.ResponseObject;
        } else {
        }
    }
    public branchFailure(error) {

    }
            // changeList() {
        // this.addBranchManager(this.branch);
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



