import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService} from '../../../shared/services/auth.service';
import {Settings} from '../../../app.settings.model';
import {AppSettings} from '../../../app.settings';
import { MatDialog } from '@angular/material';
import { ChangepasswordComponent } from '../../../pages/changepassword/changepassword.component';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserMenuComponent implements OnInit {
  public userImage = '../assets/img/users/user.jpg';
    firstname: string;
    lastname: string;
    public settings:Settings;
  constructor(public auth: AuthService, public dialog: MatDialog, public appSettings:AppSettings, public router:Router) {
      this.settings = this.appSettings.settings;
      this.firstname = this.auth.getPosFirstName();
      this.lastname = this.auth.getPosLastName();
      this.settings.username =  this.firstname +' '+ this.lastname;
  }

  ngOnInit() {

  }

    logout(){
      sessionStorage.clear();
      this.settings.userId = 0;
      this.settings.username = '';
        this.router.navigate(['/']);
    }
    passwordChange() {
        let dialogRef = this.dialog.open(ChangepasswordComponent, {
          width: '600px'
        });

        dialogRef.afterClosed().subscribe( user => {});
    }

}
