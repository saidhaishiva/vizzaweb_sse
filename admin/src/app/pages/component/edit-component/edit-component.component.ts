import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {BranchService} from '../../../shared/services/branch.service';
import {AuthService} from '../../../shared/services/auth.service';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-edit-component',
  templateUrl: './edit-component.component.html',
  styleUrls: ['./edit-component.component.scss']
})
export class EditComponentComponent implements OnInit {
  public component: FormGroup;
  public componentId: any;
  public editcenter: any;

  constructor(public fb: FormBuilder,public route: ActivatedRoute, public branchservice: BranchService, public auth: AuthService, public toastr: ToastrService, public router: Router) {
    this.route.params.forEach((params: Params) => {
      this.componentId = params.id;
    });
    this.component = this.fb.group({
      componentName: ['']
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
      'component_name': this.component.controls['componentName'].value,
      'id': this.componentId,

    }
    console.log(data);
    this.branchservice.componentUpdate(data).subscribe(
        (successData) => {
          this.componentUpdateSuccess(successData);
        },
        (error) => {
          this.componentUpdateFailure(error);
        }
    );
  }
  public componentUpdateSuccess(successData) {
    if (successData.IsSuccess) {
      this.toastr.success(successData.ResponseObject);
      this.router.navigate(['/component']);
    }
  }
  public componentUpdateFailure(error) {
    console.log(error);
  }

  edit() {
    const data ={
      'platform': 'web',
      'role_id': this.auth.getAdminRoleId(),
      'adminid': this.auth.getAdminId(),
      'id': this.componentId
    }
    console.log(data, 'fghjk');
    this.branchservice.componentSelect(data).subscribe(
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
      this.component.controls['componentName'].setValue(this.editcenter.component_name);
    }
  }
  public updateFailure(error) {
    console.log(error);
  }

}
