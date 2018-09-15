import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-pos-certificate',
  templateUrl: './pos-certificate.component.html',
  styleUrls: ['./pos-certificate.component.scss']
})
export class PosCertificateComponent implements OnInit {
    firstName: any;
    lastName: any;
    posId: any;
  constructor(public auth: AuthService) {
      this.firstName = this.auth.getPosFirstName();
      this.lastName = this.auth.getPosLastName();
      this.posId = this.auth.getPosUserId();

  }

  ngOnInit() {
  }
  print() {
      window.print();
  }

}
