import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserMenuComponent implements OnInit {
  public userImage = '../assets/img/users/user.jpg';
  constructor(public router: Router) { }

  ngOnInit() {
  }

    logout() {
        sessionStorage.clear();
        this.router.navigate(['/login']);
    }
}
