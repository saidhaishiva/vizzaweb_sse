import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfigurationService} from '../../shared/services/configuration.service';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss']
})
export class CareerComponent implements OnInit {
form: FormGroup;
webhost: any;
  constructor(public fb: FormBuilder, public config: ConfigurationService) {
      this.webhost = this.config.getimgUrl();

    this.form = this.fb.group({
        'name': ['', Validators.required],
        'mobileno':  ['', Validators.required],
        'email':  ['', Validators.required],
        'fathername': ['', Validators.required],
        'dob': ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
  }
update(){

}
}
