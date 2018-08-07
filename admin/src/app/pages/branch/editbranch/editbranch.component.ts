import {Component, Inject, OnInit} from '@angular/core';
import {BranchService} from '../../../shared/services/branch.service';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../../shared/services/auth.service';
import {AppSettings} from '../../../app.settings';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, Validators,FormGroup} from '@angular/forms';
@Component({
  selector: 'app-editbranch',
  templateUrl: './editbranch.component.html',
  styleUrls: ['./editbranch.component.scss']
})
export class EditbranchComponent implements OnInit {
    public settings: any;
    public form: FormGroup;
    public response: any;
    public status: any;
 public getDetails: any;
 public active: any;

    constructor(public fb: FormBuilder, public auth: AuthService, public dialogRef: MatDialogRef<EditbranchComponent>, private toastr: ToastrService, public appSettings: AppSettings, public branchservice: BranchService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
        this.settings = this.appSettings.settings;
        this.getDetails = data;
        console.log(this.getDetails);
        this.active = [
            {value: '0', name:'InActive'},
            {value: '1', name:'Active'}
        ];
        this.dialogRef.disableClose = true;

        this.form = this.fb.group({
          // 'branchid': ['', Validators.compose([Validators.required])],
          'branchname': ['', Validators.compose([Validators.required, ])],
            'active': ['', Validators.compose([Validators.required,])]

        });

  }

  ngOnInit() {
      this.form.controls['active'].setValue(this.active[1].name);
      this.form.controls['branchname'].setValue(this.getDetails.branchname);
      this.form.controls['active'].setValue(this.getDetails.active);

  }
    close(): void {
        this.dialogRef.close();
    }
    public edit(): void {
        if (this.form.valid) {
            const data = {
                'platform': 'web',
                'roleid': this.auth.getAdminRoleId(),
                'userid': this.auth.getAdminId(),
                'branch_id': this.getDetails.branch_id,
                'branch_name':this.form.controls['branchname'].value,
                'branchstatus': this.form.controls['active'].value

            };
            this.settings.loadingSpinner = true;
            this.branchservice.editbranch(data).subscribe(
                (successData) => {
                    this.editSuccess(successData);
                },
                (error) => {
                    this.editFailure(error);
                }
            );
        }
    }

    public editSuccess(successData) {
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {
            this.dialogRef.close(successData.IsSuccess);
            this.response = successData.ResponseObject;
            this.toastr.success(successData.ResponseObject);
        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }

    public editFailure(error) {
        this.settings.loadingSpinner = false;
        if (error.status === 401) {
            this.status = error.status;
        }
    }
}
