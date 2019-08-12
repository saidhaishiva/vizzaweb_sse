import { Component, OnInit } from '@angular/core';
import {ConfigurationService} from '../../../shared/services/configuration.service';

import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {CommonService} from '../../../shared/services/common.service';
import {ToastrService} from 'ngx-toastr';
import {MatDialogRef} from '@angular/material';
import {AuthService} from '../../../shared/services/auth.service';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {BranchService} from '../../../shared/services/branch.service';


@Component({
  selector: 'app-add-meta-detail',
  templateUrl: './add-meta-detail.component.html',
  styleUrls: ['./add-meta-detail.component.scss']
})
export class AddMetaDetailComponent implements OnInit {
  public metaDetail: FormGroup;

  constructor(public config: ConfigurationService, public auth: AuthService, public fb: FormBuilder,public common: CommonService,private toastr: ToastrService, public datepipe: DatePipe, public router: Router,  public branchservice: BranchService) {
    this.metaDetail = this.fb.group({
      component: ['', Validators.required],
      title: ['', Validators.required],
      keyword: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  add(value) {
    const data ={
      'platform': 'web',
      'role_id': this.auth.getAdminRoleId(),
      'adminid': this.auth.getAdminId(),
      'component': this.metaDetail.controls['component'].value,
      'title': this.metaDetail.controls['title'].value,
      'keyword': this.metaDetail.controls['keyword'].value,
      'descrition': this.metaDetail.controls['description'].value
    }
    console.log(data);
    this.branchservice.metaDetailAdd(data).subscribe(
        (successData) => {
          this.addCenterSuccess(successData);
        },
        (error) => {
          this.addCenterFailure(error);
        }
    );
  }
  public addCenterSuccess(successData) {
    console.log(successData.ResponseObject);
    if (successData.IsSuccess) {
      this.toastr.success(successData.ResponseObject);
      this.router.navigate(['/metaDetails']);
    }
  }
  public addCenterFailure(error) {
    console.log(error);
  }

}
