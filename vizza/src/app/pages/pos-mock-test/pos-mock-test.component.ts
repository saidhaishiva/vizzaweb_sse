import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {CommonService} from '../../shared/services/common.service';
import {Router} from '@angular/router';
import {ConfrimAlert} from '../exam/exam.component';
import {ValidationService} from '../../shared/services/validation.service';

@Component({
  selector: 'app-pos-mock-test',
  templateUrl: './pos-mock-test.component.html',
  styleUrls: ['./pos-mock-test.component.scss']
})
export class PosMockTestComponent implements OnInit {
  public form: FormGroup;
  public responseObj: any;
  public custumerId: any;


  constructor(public fb: FormBuilder, public auth: AuthService, public common: CommonService, public router: Router, public validation: ValidationService) {
    this.form = this.fb.group({
      'name': ['', Validators.required],
      'email': ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\']+(\\.[^<>()[\\]\\\\.,;:\\s@\\\']+)*)|(\\\'.+\\\'))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
      'mobile': ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}'), Validators.minLength(10)])]
    });
  }

  ngOnInit() {
  }

  login() {
    const data = {
      'platform': 'web',
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
      'person_name': this.form.controls['name'].value,
      'person_mobile': this.form.controls['mobile'].value,
      'person_email': this.form.controls['email'].value
    };
    this.common.mockLogin(data).subscribe(
        (successData) => {
          this.mockLoginSuccess(successData);
        },
        (error) => {
          this.mockLoginFailure(error);
        }
    );
  }
  public mockLoginSuccess(successData) {
    console.log(successData.ResponseObject);
    this.responseObj = successData.ResponseObject;
    this.custumerId = this.responseObj.customer_id;
    this.mockExamid(this.custumerId);
  }
  public mockLoginFailure(error) {}

  mockExamid(custumerId){
    console.log(custumerId, 'custumerId');
    this.router.navigate(['/POS-Mock-Exam/' + custumerId]);
  }

  // validation
  numberValidate(event: any) {
    this.validation.numberValidate(event);
  }
  nameValidate(event: any) {
    this.validation.nameValidate(event);
  }

}
