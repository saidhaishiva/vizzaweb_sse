import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Settings} from '../../../app.settings.model';
import {AppSettings} from '../../../app.settings';
import {AuthService} from '../../../shared/services/auth.service';
import {BranchService} from '../../../shared/services/branch.service';
import {DatePipe} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-addposmanager',
  templateUrl: './addposmanager.component.html',
  styleUrls: ['./addposmanager.component.scss']
})
export class AddposmanagerComponent implements OnInit {
    public form: FormGroup;
    public response: any;
    public status: any;
    public settings: Settings;
    public responsedata: any;
    loadingIndicator: boolean = true;

  constructor(public appSettings: AppSettings, public forms: FormBuilder, public auth: AuthService, public branchservice: BranchService,
              public toastr: ToastrService ,public dialogRef: MatDialogRef<AddposmanagerComponent>) {
      this.dialogRef.disableClose = true;

      this.form = this.forms.group ({
          'name': ['', Validators.compose([Validators.required])],
          'mobilenumber': ['', Validators.compose([Validators.required])],
          'email': ['', Validators.compose([Validators.required])],

      });
  }

  ngOnInit() {
  }
    close(): void {
        this.dialogRef.close();
    }

    public addPosManager(): void {
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
            this.branchservice.addPosManager(data).subscribe(
                (successData) => {
                    this.addPosSuccess(successData);
                },
                (error) => {
                    this.addPosFailure(error);
                }
            );
        }
    }
    public addPosSuccess(success) {
        console.log(success);
        this.loadingIndicator = false;
        if (success.IsSuccess) {
            this.toastr.success(success.ResponseObject);
            this.dialogRef.close(success.IsSuccess);

        } else {
          this.toastr.error(success.ErrorObject);

        }
    }

    public addPosFailure(error) {

    }
}
