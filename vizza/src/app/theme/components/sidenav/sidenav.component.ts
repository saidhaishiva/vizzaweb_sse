import { Component, OnInit, ViewEncapsulation, HostListener, Inject } from '@angular/core';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { MenuService } from '../menu/menu.service';
import { WINDOW } from '@ng-toolkit/universal';

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
  public selectedItem: any;
  public head: any;
  public btns: any;
  public current: any;
  public sideNavMobile: any;

  // mobile drop down view
  public showMenu: any;
  public showMenu1: any;
  public showMenu2: any;
  public showMenu3: any;
  public showMenu4: any;
  public showMenu5: any;
  public showMenu6: any;

  constructor(@Inject(WINDOW) private window: Window, public appSettings:AppSettings, public menuService:MenuService){
      this.settings = this.appSettings.settings;
      this.showMenu = false;
      this.showMenu1 = false;
      this.showMenu2 = false;
      this.showMenu3 = false;
      this.showMenu4 = false;
      this.showMenu5 = false;
      this.showMenu6 = false;

  }

  ngOnInit() {
    this.menuItems = this.menuService.getVerticalMenuItems();

    if(this.window.innerWidth < 992){
      this.sideNavMobile = true;
    }
  }

  // mobile drop down view functions
  subMenu(id){
    if(id == 1) {
      this.showMenu = !this.showMenu;
    }else if(id == 2){
      this.showMenu1 = !this.showMenu1;
    }else if(id == 3){
      this.showMenu2 = !this.showMenu2;
    }else if(id == 4){
      this.showMenu3 = !this.showMenu3;
    }else if(id == 5){
      this.showMenu4 = !this.showMenu4;
    }else if(id == 6){
      this.showMenu5 = !this.showMenu5;
    }else if(id == 7){
      this.showMenu6 = !this.showMenu6;
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


  @HostListener('window:resize')
  public onWindowResize():void {
    if(this.window.innerWidth < 992){
      this.sideNavMobile = true;
    }

    else{
      this.sideNavMobile = false;

    }
  }

}
