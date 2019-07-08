import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Settings} from '../../../app.settings.model';
import {AppSettings} from '../../../app.settings';
import {AuthService} from '../../../shared/services/auth.service';
import {BranchService} from '../../../shared/services/branch.service';
import {ToastrService} from 'ngx-toastr';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfigurationService } from '../../../shared/services/configuration.service';


@Component({
  selector: 'app-edittestimonial',
  templateUrl: './edittestimonial.component.html',
  styleUrls: ['./edittestimonial.component.scss']
})
export class EdittestimonialComponent implements OnInit {
  public form: FormGroup;
  public response: any;
  public status: any;
  public settings: Settings;
  public profile: any;
  public responsedata: any;
  loadingIndicator: boolean = true;
  getDetails: any;
  webhost: any;

  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<EdittestimonialComponent>, public auth: AuthService, public branchservice: BranchService, private toastr: ToastrService, public appSettings: AppSettings,
              @Inject(MAT_DIALOG_DATA) public data: any, public config: ConfigurationService  ) {
    this.getDetails = data;
    console.log(this.getDetails);
    this.webhost = this.config.getimgUrl();
    this.profile = this.getDetails.profile_pic;

    this.form = this.fb.group({
      'comments': ['', Validators.compose([Validators.required])],
      'name': ['', Validators.compose([Validators.required])],
      'designation': ['', Validators.compose([Validators.required])],
      'company': ['', Validators.compose([Validators.required])],
    });
    this.dialogRef.disableClose = true;

  }

  ngOnInit() {
    this.form.controls['comments'].setValue(this.getDetails.comments);
    this.form.controls['name'].setValue(this.getDetails.customer_name);
    this.form.controls['designation'].setValue(this.getDetails.designation);
    this.form.controls['company'].setValue(this.getDetails.company_name);
  }

  close(): void {
    this.dialogRef.close();
  }

  // edit() {
  //   if (this.form.valid) {
  //     const data = {
  //       'role_id': this.auth.getAdminRoleId(),
  //       'adminid': this.auth.getAdminId(),
  //       'platform': 'web',
  //       'manager_name': this.form.controls['name'].value,
  //       'manager_mobile': this.form.controls['mobilenumber'].value,
  //       'manager_email': this.form.controls['email'].value,
  //       'manager_id': this.getDetails.manager_id
  //     };
  //
  //     this.loadingIndicator = true;
  //     this.branchservice.editPosManager(data).subscribe(
  //         (successData) => {
  //           this.editPosSuccess(successData);
  //         },
  //         (error) => {
  //           this.editPosFailure(error);
  //         }
  //     );
  //   }
  // }

  // public editPosSuccess(success) {
  //   console.log(success);
  //   this.loadingIndicator = false;
  //   if (success.IsSuccess) {
  //     this.toastr.success(success.ResponseObject);
  //     this.dialogRef.close(success.IsSuccess);
  //
  //
  //   } else {
  //     this.toastr.error(success.ErrorObject);
  //
  //   }
  // }

  // public editPosFailure(error) {
  //   this.settings.loadingSpinner = false;
  //   if (error.status === 401) {
  //     this.status = error.status;
  //   }
  //
  // }

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
