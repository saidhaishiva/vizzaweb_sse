import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {BranchService} from '../../../shared/services/branch.service';
import {AuthService} from '../../../shared/services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {AppSettings} from '../../../app.settings';
import {Settings} from '../../../app.settings.model';

@Component({
  selector: 'app-path-popup',
  templateUrl: './path-popup.component.html',
  styleUrls: ['./path-popup.component.scss']
})
export class PathPopupComponent implements OnInit {
public form : FormGroup;
public careerId: any;
public email: any;
  public settings: Settings;

  constructor(public fb : FormBuilder,  public branchservice: BranchService, public auth: AuthService, public dialogRef: MatDialogRef<PathPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,  private toastr: ToastrService, public appSettings: AppSettings) {
    console.log(data,'datat');
    this.careerId = data.careerid;
    this.email = data.email;
    this.settings = this.appSettings.settings;

    this.form = this.fb.group({
    email: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
    subject: '',
    message: ''

  })
    this.form.controls['email'].patchValue(this.email);

  }

  ngOnInit() {
  }
  close(): void {
    this.dialogRef.close();
  }
  submit(){
    this.dialogRef.close();
      const data = {
        "platform" : "web",
        "role_id" : this.auth.getAdminRoleId(),
        "user_id" : this.auth.getAdminId(),
        "career_id" :this.careerId,
        "subject" : this.form.controls['subject'].value,
        "content" : this.form.controls['message'].value
      };
    this.settings.loadingSpinner = true;

    this.branchservice.scheduleDetails(data).subscribe(
          (successData) => {
            this.ScheduleSuccess(successData);
          },
          (error) => {
            this.ScheduleFailure(error);
          }
      );
    }

  public ScheduleSuccess(success) {
      console.log(success);
      if (success.IsSuccess) {
        this.settings.loadingSpinner = false;

        this.toastr.success(success.ResponseObject);
        let details = success.ResponseObject;
      } else{
        this.toastr.error(success.ErrorObject);
        this.settings.loadingSpinner = false;

      }

  }
  public ScheduleFailure(error){
    this.settings.loadingSpinner = false;

  }

}
