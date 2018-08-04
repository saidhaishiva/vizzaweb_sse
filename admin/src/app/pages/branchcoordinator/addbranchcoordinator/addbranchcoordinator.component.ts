import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppSettings} from '../../../app.settings';
import {ToastrService} from 'ngx-toastr';
import {DatePipe} from '@angular/common';
import {BranchService} from '../../../shared/services/branch.service';
import {AuthService} from '../../../shared/services/auth.service';
import {Settings} from '../../../app.settings.model';

@Component({
  selector: 'app-addbranchcoordinator',
  templateUrl: './addbranchcoordinator.component.html',
  styleUrls: ['./addbranchcoordinator.component.scss']
})
export class AddbranchcoordinatorComponent implements OnInit {
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
    public addbranchcoordinator(): void {
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

            this.branchservice.addbranchCoordinatorList(data).subscribe(
                (successData) => {
                    this.addCoordinatorSuccess(successData);
                },
                (error) => {
                    this.addCoordinatorFailure(error);
                }
            );
        }
    }
    public addCoordinatorSuccess(success) {
        console.log(success);
        if (success.IsSuccess) {
            this.responsedata = success.ResponseObject;
            this.toastr.success(success.ResponseObject);
        } else {
            this.toastr.error(success.ErrorObject);

        }
    }

    public addCoordinatorFailure(error) {

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
}
