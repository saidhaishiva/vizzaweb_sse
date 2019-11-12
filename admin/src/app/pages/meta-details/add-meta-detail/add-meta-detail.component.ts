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
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

export interface item {
  name: string;
}

@Component({
  selector: 'app-add-meta-detail',
  templateUrl: './add-meta-detail.component.html',
  styleUrls: ['./add-meta-detail.component.scss']
})
export class AddMetaDetailComponent implements OnInit {
  public metaDetail: FormGroup;
  public itemShow = [];
  public keyItems: any;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  items: item[] = [];

  constructor(public config: ConfigurationService, public auth: AuthService, public fb: FormBuilder,public common: CommonService,private toastr: ToastrService, public datepipe: DatePipe, public router: Router,  public branchservice: BranchService) {
    this.metaDetail = this.fb.group({
      component: ['', Validators.required],
      path: ['', Validators.required],
      title: ['', Validators.required],
      keyword: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.itemShow = [];
  }

  addi(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.items.push({name: value.trim()});
      console.log(this.items,'items');
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(item: item): void {
    const index = this.items.indexOf(item);
    if (index >= 0) {
      this.items.splice(index, 1);
    }
  }

  add(value) {
    let itemShow = [];
    for(let i=0; i < this.items.length; i++) {
      this.itemShow.push(this.items[i].name);
    }
    console.log(this.itemShow,'itemshow');
    this.keyItems = this.itemShow;
    console.log(this.keyItems,'keyitems');
    const data ={
      'platform': 'web',
      'role_id': this.auth.getAdminRoleId(),
      'adminid': this.auth.getAdminId(),
      'component': this.metaDetail.controls['component'].value,
      'title': this.metaDetail.controls['title'].value,
      'path': this.metaDetail.controls['path'].value,
      'keyword': this.keyItems,
      'descrition': this.metaDetail.controls['description'].value
    }
    console.log(this.metaDetail.controls['keyword'].value,'value');
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
