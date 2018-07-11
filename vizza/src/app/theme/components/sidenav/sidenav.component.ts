import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { MenuService } from '../menu/menu.service';

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

  constructor(public appSettings:AppSettings, public menuService:MenuService){
      this.settings = this.appSettings.settings;


  }

  ngOnInit() {
    this.menuItems = this.menuService.getVerticalMenuItems();


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

  listion(){

      this.head = document.getElementById('myNav');
      this.btns = this.head.getElementsByClassName('nav-item');
      for (let i = 0; i < this.btns.length; i++) {

          this.btns[i].addEventListener('click', function() {
              alert();
              this.current = document.getElementsByClassName('active');
              this.current[0].className = this.current[0].className.replace(' active', '');
              this.className += ' active';
          });
      }
  }


}
