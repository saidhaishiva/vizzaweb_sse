import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Settings} from '../../../app.settings.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AuthService} from '../../../shared/services/auth.service';
import {BranchService} from '../../../shared/services/branch.service';
import {ToastrService} from 'ngx-toastr';
import {AppSettings} from '../../../app.settings';

@Component({
  selector: 'app-editdm',
  templateUrl: './editdm.component.html',
  styleUrls: ['./editdm.component.scss']
})
export class EditdmComponent implements OnInit {
    public form: FormGroup;
    public response: any;
    public status: any;
    public settings: Settings;
    public responsedata: any;
    loadingIndicator: boolean = true;
    getDetails: any;
  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<EditdmComponent>, public auth: AuthService, public branchservice: BranchService, private toastr: ToastrService, public appSettings: AppSettings,
              @Inject(MAT_DIALOG_DATA) public data: any) {
      this.getDetails = data;

      this.form = this.fb.group({
          'name': ['', Validators.compose([Validators.required])],
          'mobilenumber': ['', Validators.compose([Validators.required])],
          'email': ['', Validators.compose([Validators.required, Validators.pattern("^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$")])],

      });
      this.dialogRef.disableClose = true;

  }
  ngOnInit() {
      this.form.controls['name'].setValue(this.getDetails.manager_name);
      this.form.controls['mobilenumber'].setValue(this.getDetails.manager_mobile);
      this.form.controls['email'].setValue(this.getDetails.manager_email);

  }
    close(): void {
        this.dialogRef.close();
    }
    edit() {
        if (this.form.valid) {
            const data = {
                'role_id': this.auth.getAdminRoleId(),
                'admin_id': this.auth.getAdminId(),
                'platform': 'web',
                'manager_name': this.form.controls['name'].value,
                'manager_mobile': this.form.controls['mobilenumber'].value,
                'manager_email': this.form.controls['email'].value,
                'manager_id': this.getDetails.manager_id
            };

            this.loadingIndicator = true;
            this.branchservice.editDmManager(data).subscribe(
                (successData) => {
                    this.editPosSuccess(successData);
                },
                (error) => {
                    this.editPosFailure(error);
                }
            );
        }
    }

    public editPosSuccess(success) {
        console.log(success);
        this.loadingIndicator = false;
        if (success.IsSuccess) {
            this.toastr.success(success.ResponseObject);
            this.dialogRef.close(success.IsSuccess);


        } else {
            this.toastr.error(success.ErrorObject);

        }
    }

    public editPosFailure(error) {
        this.settings.loadingSpinner = false;
        if (error.status === 401) {
            this.status = error.status;
        }

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
