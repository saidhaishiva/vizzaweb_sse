import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService} from '../../shared/services/auth.service';
import {Settings} from '../../app.settings.model';
import {AppSettings} from '../../app.settings';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CommonService } from '../../shared/services/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-change-password',
    templateUrl: './changepassword.component.html',
    styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
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
            "pos_id": this.auth.getPosUserId(),
            "role_id": this.auth.getPosRoleId(),
            "old_password": this.form.controls['currentpassword'].value,
            "password": this.form.controls['confirmpassword'].value
        };
        this.settings.loadingSpinner = true;
        this.common.updatePassword(data).subscribe(
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
        console.log(error);
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
