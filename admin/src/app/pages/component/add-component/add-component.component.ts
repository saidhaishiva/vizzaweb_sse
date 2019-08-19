import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../../shared/services/auth.service';
import {BranchService} from '../../../shared/services/branch.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-component',
  templateUrl: './add-component.component.html',
  styleUrls: ['./add-component.component.scss']
})
export class AddComponentComponent implements OnInit {
  public component: FormGroup;

  constructor(public fb: FormBuilder, public auth: AuthService, public branchservice: BranchService, public toastr: ToastrService, public router: Router) {
    this.component = this.fb.group({
      componentName: ['',Validators.required]
    })
  }

  ngOnInit() {
  }

  add(value) {
    const data = {
      'platform': 'web',
      'role_id': this.auth.getAdminRoleId(),
      'adminid': this.auth.getAdminId(),
      'component_name': this.component.controls['componentName'].value,
    }
    this.branchservice.componentAdd(data).subscribe(
        (successData) => {
          this.componentAddSuccess(successData);
        },
        (error) => {
          this.componentAddFailure(error);
        }
    );
  }
  public componentAddSuccess(successData) {
    console.log(successData.ResponseObject);
    if (successData.IsSuccess) {
      this.toastr.success(successData.ResponseObject);
      this.router.navigate(['/component']);
    }
  }
  public componentAddFailure(error) {
    console.log(error);
  }

}
