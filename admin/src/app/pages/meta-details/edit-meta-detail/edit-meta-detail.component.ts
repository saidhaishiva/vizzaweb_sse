import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfigurationService} from '../../../shared/services/configuration.service';
import {AuthService} from '../../../shared/services/auth.service';
import {CommonService} from '../../../shared/services/common.service';
import {ToastrService} from 'ngx-toastr';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {BranchService} from '../../../shared/services/branch.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {MatChipInputEvent} from '@angular/material';

@Component({
  selector: 'app-edit-meta-detail',
  templateUrl: './edit-meta-detail.component.html',
  styleUrls: ['./edit-meta-detail.component.scss']
})
export class EditMetaDetailComponent implements OnInit {
  public metaDetail : FormGroup;
  public metaid : any;
  public editcenter : any;


  constructor(public config: ConfigurationService, public common:CommonService, public auth: AuthService, public fb: FormBuilder, public branchservice: BranchService,public datepipe: DatePipe, private toastr: ToastrService,public router: Router,public route: ActivatedRoute) {
    this.route.params.forEach((params: Params) => {
      this.metaid = params.id;
    });

    console.log(this.metaid,'ddd');

    this.metaDetail = this.fb.group({
      component: ['', Validators.required],
      title: ['', Validators.required],
      keyword: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.edit();
  }

  update(row) {
    console.log(row, 'kkk');
    const data ={
      'platform': 'web',
      'role_id': this.auth.getAdminRoleId(),
      'adminid': this.auth.getAdminId(),
      'component': this.metaDetail.controls['component'].value,
      'title': this.metaDetail.controls['title'].value,
      'keyword': this.metaDetail.controls['keyword'].value,
      'descrition': this.metaDetail.controls['description'].value,
      'id': this.metaid,

    }
    console.log(data);
    this.branchservice.metaDetailEdit(data).subscribe(
        (successData) => {
          this.editCenterSuccess(successData);
        },
        (error) => {
          this.editCenterFailure(error);
        }
    );
  }
  public editCenterSuccess(successData) {
    alert('innn')
    if (successData.IsSuccess) {
      this.toastr.success(successData.ResponseObject);
      // this.dialogRef.close(true);
      // this.editList = successData.ResponseObject;
      this.router.navigate(['/metaDetails']);

    }
    // console.log(this.editList, 'this.editList');
  }
  public editCenterFailure(error) {
    console.log(error);
  }

  edit() {
    const data ={
      'platform': 'web',
      'role_id': this.auth.getAdminRoleId(),
      'adminid': this.auth.getAdminId(),
      'id': this.metaid
    }
    console.log(data, 'fghjk');
    this.branchservice.metaDetail(data).subscribe(
        (successData) => {
          this.updateSuccess(successData);
        },
        (error) => {
          this.updateFailure(error);
        }
    );
  }
  public updateSuccess(successData) {
    alert('in')
    if (successData.IsSuccess) {
      this.editcenter = successData.ResponseObject[0];
      this.metaDetail.controls['component'].setValue(this.editcenter.component);
      this.metaDetail.controls['title'].setValue(this.editcenter.title);
      this.metaDetail.controls['keyword'].setValue(this.editcenter.keyword);
      this.metaDetail.controls['description'].setValue(this.editcenter.descrition);
    }
    // console.log( this.editcenter, ' this.editcenter');
  }
  public updateFailure(error) {
    console.log(error);
  }

}
