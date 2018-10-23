import { Component, OnInit } from '@angular/core';
import {ConfigurationService} from '../../../../../../vizza/src/app/shared/services/configuration.service';
import {FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-addcenter',
  templateUrl: './addcenter.component.html',
  styleUrls: ['./addcenter.component.scss']
})
export class AddcenterComponent implements OnInit {
webhost: any;
form: FormGroup
  constructor(public config: ConfigurationService, public fb: FormBuilder,) {
      this.webhost = this.config.getimgUrl();

  }

  ngOnInit() {
  }

}
