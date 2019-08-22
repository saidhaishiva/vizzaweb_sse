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
import {item} from '../add-meta-detail/add-meta-detail.component';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

export interface item {
  name: string;
}

@Component({
  selector: 'app-edit-meta-detail',
  templateUrl: './edit-meta-detail.component.html',
  styleUrls: ['./edit-meta-detail.component.scss']
})
export class EditMetaDetailComponent implements OnInit {
  public metaDetail : FormGroup;
  public metaid : any;
  public editcenter : any;
  public editKey : any;
  public nameArr : any;
  public keyEdiItems : any;
  public itemShow = [];
  public keyItems: any;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  items: item[] = [];


  constructor(public config: ConfigurationService, public common:CommonService, public auth: AuthService, public fb: FormBuilder, public branchservice: BranchService,public datepipe: DatePipe, private toastr: ToastrService,public router: Router,public route: ActivatedRoute) {
    this.route.params.forEach((params: Params) => {
      this.metaid = params.id;
    });
    console.log(this.metaid,'ddd');

    this.metaDetail = this.fb.group({
      component: ['', Validators.required],
      title: ['', Validators.required],
      path: ['', Validators.required],
      keyword: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.edit();
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

  update(row) {
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
      'descrition': this.metaDetail.controls['description'].value,
      'id': this.metaid,
    };
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
      this.router.navigate(['/metaDetails']);
    }
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
    };
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
    if (successData.IsSuccess) {
      this.editcenter = successData.ResponseObject[0];
      let names = this.editcenter.keyword;
      this.nameArr = names.split(',');
      this.metaDetail.controls['component'].setValue(this.editcenter.component);
      this.metaDetail.controls['path'].setValue(this.editcenter.path);
      this.metaDetail.controls['title'].setValue(this.editcenter.title);
      this.metaDetail.controls['description'].setValue(this.editcenter.descrition);
      for(let i=0; i<= this.nameArr.length; i++) {
        if(names == ''){
          this.nameArr = null;
        } else {
        this.items.push({name:this.nameArr[i].trim()});
        }
      }
    }
  }
  public updateFailure(error) {
    console.log(error);
  }

}
