import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {BranchService} from '../../../shared/services/branch.service';

@Component({
  selector: 'app-path-popup',
  templateUrl: './path-popup.component.html',
  styleUrls: ['./path-popup.component.scss']
})
export class PathPopupComponent implements OnInit {
public form : FormGroup;
  constructor(public fb : FormBuilder,  public branchservice: BranchService, public dialogRef: MatDialogRef<PathPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  this.form = this.fb.group({
    email: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
    subject: '',
    message: ''

  })

  }

  ngOnInit() {
  }
  close(): void {
    this.dialogRef.close();
  }
  submit(){
    this.dialogRef.close();
      const data = {
        'platform': 'web',
      };
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
        let details = success.ResponseObject;
      }

  }
  public ScheduleFailure(error){

  }

}
