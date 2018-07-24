import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService} from '../../../shared/services/auth.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserMenuComponent implements OnInit {
  public userImage = '../assets/img/users/user.jpg';
    fristName: string;
  constructor(public auth: AuthService) {
    this.fristName = this.auth.getPosFirstName();
  }

  ngOnInit() {
  }

}
