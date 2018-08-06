import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup,Validators} from '@angular/forms';
import { AuthService} from '../../../shared/services/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ToastrService} from 'ngx-toastr';
import { AppSettings} from '../../../app.settings';
import {BranchService} from '../../../shared/services/branch.service';

@Component({
  selector: 'app-addbranch',
  templateUrl: './addbranch.component.html',
  styleUrls: ['./addbranch.component.scss']
})
export class AddbranchComponent implements OnInit {
public settings: any;
    public form: FormGroup;
    public response: any;
    public status: any;
    loadingIndicator: boolean = true;

    constructor(public fb: FormBuilder, public auth: AuthService, public dialogRef: MatDialogRef<AddbranchComponent>, private toastr: ToastrService, public appSettings: AppSettings, public branchservice: BranchService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
        this.form = this.fb.group({
            // 'branchid': ['', Validators.compose([Validators.required])],
            'branchname': ['', Validators.compose([Validators.required, ])],

        });

    }

  ngOnInit() {
  }
    close(): void {
        this.dialogRef.close();
    }
    public add(): void {
        if (this.form.valid) {
            const data = {
                'platform': 'web',
                'roleid': this.auth.getAdminRoleId(),
                'userid': this.auth.getAdminId(),
                 'branch_id': '',
                'branch_name':this.form.controls['branchname'].value
            };
            this.loadingIndicator = true;
            this.branchservice.addbranch(data).subscribe(
                (successData) => {
                    this.addSuccess(successData);
                },
                (error) => {
                    this.addFailure(error);
                }
            );
        }
    }

    public addSuccess(successData) {
        this.loadingIndicator = false;
        if (successData.IsSuccess) {
            this.dialogRef.close(successData.IsSuccess);
            this.response = successData.ResponseObject;
            this.toastr.success(successData.ResponseObject);
        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }

    public addFailure(error) {
        this.loadingIndicator = true;
        if (error.status === 401) {
            this.status = error.status;
        }
    }
}
