import { Component, OnInit } from '@angular/core';
import {AppSettings} from '../../app.settings';
import {AuthService} from '../../shared/services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ChangepasswordComponent} from '../changepassword/changepassword.component';
import {Settings} from '../../app.settings.model';
import {CommonService} from '../../shared/services/common.service';
import {MatDialogRef} from '@angular/material';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-dm-changepassword',
  templateUrl: './dm-changepassword.component.html',
  styleUrls: ['./dm-changepassword.component.scss']
})
export class DmChangepasswordComponent implements OnInit {

    public settings:Settings;
    public form: FormGroup;
    newps = true;
    curps = true;
    conps = true;
    mismatchError: any;
    constructor(public auth: AuthService, public toast: ToastrService, public common: CommonService, public dialogRef: MatDialogRef<ChangepasswordComponent>, public fb: FormBuilder, public appSettings:AppSettings, public router:Router) {
        this.settings = this.appSettings.settings;
        this.dialogRef.disableClose = true;
        this.form = this.fb.group({
            currentpassword: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
            password: ['', Validators.compose([Validators.required])],
            confirmpassword: ['', Validators.compose([Validators.required])]
        });
        this.mismatchError = '';
    }

    ngOnInit() {

    }
    close() {
        this.dialogRef.close();
    }
    updatePassword() {
        const data = {
            "platform": "web",
            "dm_id": this.auth.getDmUserId(),
            "role_id": this.auth.getDmRoleId(),
            "old_password": this.form.controls['currentpassword'].value,
            "password": this.form.controls['confirmpassword'].value
        };
        this.settings.loadingSpinner = true;
        this.common.updateDmPassword(data).subscribe(
            (successData) => {
                this.updatePasswordSuccess(successData);
            },
            (error) => {
                this.updatePasswordFailure(error);
            }
        );
    }
    updatePasswordSuccess(successData) {
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {
            this.toast.success(successData.ResponseObject, 'Success');
            this.dialogRef.close();
        } else {
            this.toast.error(successData.ErrorObject, 'Failed');
        }
    }
    updatePasswordFailure(error) {
        this.settings.loadingSpinner = false;
    }
    checkPassword() {
        if (this.form.controls['password'].value === this.form.controls['confirmpassword'].value) {
            this.mismatchError = '';
        } else {
            this.mismatchError = 'Passwords do not match ';
        }
        if (this.form.controls['password'].value == '') {
            this.mismatchError = '';
        }
    }


}
