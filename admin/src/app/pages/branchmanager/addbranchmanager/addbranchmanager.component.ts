import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Settings} from '../../../app.settings.model';
import { AppSettings} from '../../../app.settings';
import {AuthService} from '../../../shared/services/auth.service';
import {BranchService} from '../../../shared/services/branch.service';
import { FormControl} from '@angular/forms';
import { DatePipe} from '@angular/common';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-addbranchmanager',
  templateUrl: './addbranchmanager.component.html',
  styleUrls: ['./addbranchmanager.component.scss']
})
export class AddbranchmanagerComponent implements OnInit {
    public form: FormGroup;
    branch: any;
    public response: any;
    public status: any;
    public settings: Settings;
    public responsedata: any;
    public branchLists: any;
    loadingIndicator: boolean = true;


    constructor(public appSettings: AppSettings, public forms: FormBuilder, public auth: AuthService, public branchs: BranchService,
                public datepipe: DatePipe, public toastr: ToastrService) {
        this.settings = this.appSettings.settings;
        // branch = new FormControl();
        // this.branch = [
        //     {value: 'branch_id', name: 'branch_name'},
        // // ];

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
    public addBranchManager(): void {
        if (this.form.valid) {
        const date = this.datepipe.transform(this.form.controls['dob'].value, 'yyyy-MM-dd');
           console.log(date);
            const data = {
                'roleid': this.auth.getAdminRoleId(),
                'userid': this.auth.getAdminId(),
                'platform': 'web',
                'bm_fname': this.form.controls['firstname'].value,
                'bm_lname': this.form.controls['lastname'].value,
                'mobile': this.form.controls['mobilenumber'].value,
                'dateofbirth': date,
                'gender': this.form.controls['gender'].value,
                'bm_email': this.form.controls['email'].value,
                'branch_id': this.form.controls['branch'].value
            };
            console.log(data, 'aaa');

            this.settings.loadingSpinner = true;
            this.branchs.addbranchManagerList(data).subscribe(
                (successData) => {
                    this.addBranchSuccess(successData);
                },
                (error) => {
                    this.addBranchFailure(error);
                }
            );
        }
    }
    public addBranchSuccess(success) {
        console.log(success);
        this.settings.loadingSpinner = false;
        if (success.IsSuccess) {
            this.responsedata = success.ResponseObject;
            this.toastr.success(success.ResponseObject);

        } else {
            this.toastr.error(success.ResponseObject);

        }
    }

    public addBranchFailure(error) {

    }
    public branchList() {

        const data = {
            'platform': 'web',
            'roleid': this.auth.getAdminRoleId(),
            'userid': this.auth.getAdminId()
        };
        this.loadingIndicator = true;
        this.branchs.branchList(data).subscribe(
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
    changeList() {
        // this.addBranchManager(this.branch);

    }
  }

