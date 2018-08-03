import { Component, OnInit } from '@angular/core';
import {DatePipe} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../shared/services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {AppSettings} from '../../../app.settings';
import {BranchService} from '../../../shared/services/branch.service';
import {Settings} from '../../../app.settings.model';

@Component({
  selector: 'app-addrelationalmanager',
  templateUrl: './addrelationalmanager.component.html',
  styleUrls: ['./addrelationalmanager.component.scss']
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

      });
  }


  ngOnInit() {
    this.branchList();
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
                'branch_id': this.form.controls['branch'].value,

            };
            alert();
            console.log(data, 'aaa');

            // this.settings.loadingSpinner = true;
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
        // this.settings.loadingSpinner = false;
        if (success.IsSuccess) {
            alert();
            this.responsedata = success.ResponseObject;
            this.toastr.success(success.ResponseObject);

        } else {
            this.toastr.error(success.ResponseObject);

        }
    }

    public addRelationalFailure(error) {

    }
    public branchList() {
        const data = {
            'platform': 'web',
            'roleid': this.auth.getAdminRoleId(),
            'userid': this.auth.getAdminId()
        };
        this.loadingIndicator = true;
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
}
