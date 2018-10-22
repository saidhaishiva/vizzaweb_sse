import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Settings} from '../../../app.settings.model';
import {AppSettings} from '../../../app.settings';
import {AuthService} from '../../../shared/services/auth.service';
import {BranchService} from '../../../shared/services/branch.service';
import {ToastrService} from 'ngx-toastr';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-adddm',
  templateUrl: './adddm.component.html',
  styleUrls: ['./adddm.component.scss']
})
export class AdddmComponent implements OnInit {
    public form: FormGroup;
    public response: any;
    public status: any;
    public settings: Settings;
    public responsedata: any;
    loadingIndicator: boolean = true;
  constructor(public appSettings: AppSettings, public forms: FormBuilder, public auth: AuthService, public branchservice: BranchService,
              public toastr: ToastrService ,public dialogRef: MatDialogRef<AdddmComponent>) {
      this.dialogRef.disableClose = true;


      this.form = this.forms.group ({
          'name': ['', Validators.compose([Validators.required])],
          'mobilenumber': ['', Validators.compose([Validators.required])],
          'email': ['', Validators.compose([Validators.required, Validators.pattern("^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$")])],

      });
  }
    close(): void {
        this.dialogRef.close();
    }


    ngOnInit() {
  }
    public adddmManager(): void {
        if (this.form.valid) {
            const data = {
                'role_id': this.auth.getAdminRoleId(),
                'adminid': this.auth.getAdminId(),
                'platform': 'web',
                'manager_name': this.form.controls['name'].value,
                'manager_mobile': this.form.controls['mobilenumber'].value,
                'manager_email': this.form.controls['email'].value,
            };

            this.loadingIndicator = true;
            this.branchservice.addDmManager(data).subscribe(
                (successData) => {
                    this.addSuccess(successData);
                },
                (error) => {
                    this.addFailure(error);
                }
            );
        }
    }
    public addSuccess(success) {
        console.log(success);
        this.loadingIndicator = false;
        if (success.IsSuccess) {
            this.toastr.success(success.ResponseObject);
            this.dialogRef.close(success.IsSuccess);

        } else {
            this.toastr.error(success.ErrorObject);

        }
    }

    public addFailure(error) {

    }
    public keyPress(event: any) {
        if (event.charCode !== 0) {
            const pattern =/[0-9 ]/;
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
