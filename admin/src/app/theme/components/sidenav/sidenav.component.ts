import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { MenuService } from '../menu/menu.service';
import {Router, ActivatedRoute } from '@angular/router';
import {Menu} from '../menu/menu.model';
import {AuthService} from '../../../shared/services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ MenuService ]
})
export class SidenavComponent implements OnInit {
  public userImage= '../assets/img/users/user.jpg';
  public menuItems:Array<any>;
  public settings: Settings;
  public roleId: any;
  public parentMenu: any;
  constructor(public appSettings: AppSettings, public menuService: MenuService, public router: Router, public auth: AuthService) {
      this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    // this.menuItems = this.menuService.getVerticalMenuItems();
      this.updateSideMenu('router');

  }

    updateSideMenu(router) {
        this.roleId = this.auth.getAdminRoleId();
        console.log(this.roleId, 'ifddddddd');
        if (this.roleId == '2') {
            console.log( 'inn');
            this.parentMenu = [
                new Menu (0, 'Dashboard', '/dashboard', null, 'dashboard', null, false, 0),
                new Menu (1, 'POS', '/pos', null, 'supervisor_account', null, false, 0),
                new Menu (20, 'DM', '/distance-marketing', null, 'supervisor_account', null, false, 0),
                new Menu (16, 'Logout', '/login', null, 'power_settings_new', null, false, 0 ),

            ];
        } else if (this.roleId == '1') {
            console.log( 'out');
            this.parentMenu = this.menuService.getVerticalMenuItems();

        }
    }


    public closeSubMenus(){
    let menu = document.querySelector(".sidenav-menu-outer");
    if(menu){
      for (let i = 0; i < menu.children[0].children.length; i++) {
        let child = menu.children[0].children[i];
        if(child){
          if(child.children[0].classList.contains('expanded')){
              child.children[0].classList.remove('expanded');
              child.children[1].classList.remove('show');
          }
        }
      }
    }
  }
    logout() {
        sessionStorage.clear();
        this.router.navigate(['/login']);
    }

}

