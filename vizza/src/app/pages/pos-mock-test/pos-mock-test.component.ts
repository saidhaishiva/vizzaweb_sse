import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-pos-mock-test',
  templateUrl: './pos-mock-test.component.html',
  styleUrls: ['./pos-mock-test.component.scss']
})
export class PosMockTestComponent implements OnInit {
  public form: FormGroup;


  constructor(public fb: FormBuilder) {
    this.form = this.fb.group({
      // 'username': ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      // 'password': ['', Validators.compose([Validators.required, Validators.minLength(5)])]
      'name': [''],
      'email': [''],
      'mobile': ['']
    });
  }

  ngOnInit() {
  }

  login() {
console.log('hello');
  }

}
