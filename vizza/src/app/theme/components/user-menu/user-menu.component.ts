import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService} from '../../../shared/services/auth.service';
import {Settings} from '../../../app.settings.model';
import {AppSettings} from '../../../app.settings';
import { MatDialog } from '@angular/material';
import { ChangepasswordComponent } from '../../../pages/changepassword/changepassword.component';
import { DmChangepasswordComponent} from '../../../pages/dm-changepassword/dm-changepassword.component';

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
    loginStatus: any;
    public settings:Settings;
  constructor(public auth: AuthService, public dialog: MatDialog, public appSettings:AppSettings, public router:Router) {
      this.settings = this.appSettings.settings;
      this.loginStatus = this.auth.getSessionData('loginStatus');
      if(this.loginStatus == 'pos') {
          this.firstname = this.auth.getPosFirstName();
          this.lastname = this.auth.getPosLastName();
          this.settings.username =  this.firstname +' '+ this.lastname;
          this.settings.myprofile = this.loginStatus;
      } else if(this.loginStatus == 'dm') {
          this.firstname = this.auth.getDmFirstName();
          this.lastname = this.auth.getDmLastName();
          this.settings.username =  this.firstname +' '+ this.lastname;
          this.settings.myprofile = this.loginStatus;
      }

  }

  ngOnInit() {

  }

    logout(){
      sessionStorage.clear();

      setTimeout(() => {
          this.settings.userId = 0;
          this.settings.username = '';
          this.router.navigate(['/home']);
      },700);

    }
    passwordChange(status) {
      console.log(status, 'oo');
        if(status == 'pos') {
            let dialogRef = this.dialog.open(ChangepasswordComponent, {
                width: '600px'
            });
            dialogRef.afterClosed().subscribe( user => {});

        } else if(status == 'dm') {
            let dialogRef = this.dialog.open(DmChangepasswordComponent, {
                width: '600px'
            });

            dialogRef.afterClosed().subscribe( user => {});
        }

    }


}
