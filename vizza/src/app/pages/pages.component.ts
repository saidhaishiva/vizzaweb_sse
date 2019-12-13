import { Component, OnInit, ViewChild, HostListener, Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AppSettings } from '../app.settings';
import { Settings } from '../app.settings.model';
import { MenuService } from '../theme/components/menu/menu.service';
import { AuthService} from '../shared/services/auth.service';
import {PosstatusAlert} from './health-insurance/health-insurance.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ContactComponent} from './contact/contact.component';
import { WINDOW } from '@ng-toolkit/universal';
import {ConfigurationService} from '../shared/services/configuration.service';


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  providers: [ MenuService ]
})
export class PagesComponent implements OnInit { 

  @ViewChild('sidenav') sidenav:any;
  public settings:Settings;
  public menus = ['vertical', 'horizontal'];
  public menuOption:string;
  public menuTypes = ['default', 'compact', 'mini'];
  public menuTypeOption:string;
  public isStickyMenu:boolean = false;
  public lastScrollTop:number = 0;
  public showBackToTop:boolean = false;
  public toggleSearchBar:boolean = false;
  private defaultMenu:string; //declared for return default menu when window resized 
  public scrolledContent:any;
  public breadcrumbHome: boolean;
  public userId: any;
  public mHorizontal: any;
  public webhost: any;


  constructor(@Inject(WINDOW) private window: Window, public config: ConfigurationService,public appSettings:AppSettings, public router:Router, private menuService: MenuService, public auth: AuthService, public dialog: MatDialog){
    this.settings = this.appSettings.settings;
    this.breadcrumbHome = true;
    this.userId = 0;
    this.mHorizontal = true;
    this.settings.menu = 'vertical';
    this.settings.sidenavIsOpened = true;
    this.settings.sidenavIsPinned = true;
    this.webhost = this.config.getimgUrl();

  }
  
  ngOnInit() {
    if (this.auth.getSessionData('loginStatus') == 'pos') {
        this.settings.userId = this.auth.getPosUserId() !=null?this.auth.getPosUserId() : this.userId;
    } else if (this.auth.getSessionData('loginStatus') == 'dm') {
        this.settings.userId = this.auth.getDmUserId() !=null?this.auth.getDmUserId() : this.userId;
    }

      if(this.window.innerWidth <= 992){
        this.mHorizontal = false;
      this.settings.menu = 'vertical';
      this.settings.sidenavIsOpened = false;
      this.settings.sidenavIsPinned = false;
    }
    // if(window.innerWidth >= 768){
    //   this.settings.menu = 'horizontal';
    //   this.settings.sidenavIsOpened = true;
    //   this.settings.sidenavIsPinned = true;
    // }


    this.menuOption = this.settings.menu; 
    this.menuTypeOption = this.settings.menuType; 
    this.defaultMenu = this.settings.menu;
  }

    logout(){
        this.router.navigate(['/home']);
        this.settings.userId = 0;
        this.settings.username = '';
         setTimeout(() => {
             sessionStorage.clear();
         },600);
    }

  ngAfterViewInit(){
    setTimeout(() => { this.settings.loadingSpinner = false }, 300)  
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if(!this.settings.sidenavIsPinned){
          this.sidenav.close(); 
        }      
        if(this.window.innerWidth <= 992){
          this.sidenav.close(); 
        } 
      }                
    });

    if(this.settings.menu == "horizantal")
      this.menuService.expandActiveSubMenu(this.menuService.getHorizontalMenuItems());
  }

  public chooseMenu(){
    this.settings.menu = this.menuOption; 
    this.defaultMenu = this.menuOption;
    this.router.navigate(['/']); 
  }

  public chooseMenuType(){
    this.settings.menuType = this.menuTypeOption;
  }

  public changeTheme(theme){
    this.settings.theme = theme;       
  }
   
  public toggleSidenav(){
    // console.log(this.sidenav);
    this.sidenav.toggle();
  }
  
  public onPsScrollY(event){
    this.scrolledContent = event.target;
    (this.scrolledContent.scrollTop > 300) ? this.showBackToTop = true : this.showBackToTop = false; 
    if(this.settings.menu == 'horizontal'){
      if(this.settings.fixedHeader){
        var currentScrollTop = (this.scrolledContent.scrollTop > 56) ? this.scrolledContent.scrollTop : 0;   
        (currentScrollTop > this.lastScrollTop) ? this.isStickyMenu = true : this.isStickyMenu = false;
        this.lastScrollTop = currentScrollTop; 
      } 
      else{
        (this.scrolledContent.scrollTop > 56) ? this.isStickyMenu = true : this.isStickyMenu = false;  
      }
    } 
  }

  public scrollToTop(){
    var scrollDuration = 200;
    var scrollStep = -this.scrolledContent.scrollTop / (scrollDuration / 20);
    var scrollInterval = setInterval(()=>{
      if(this.scrolledContent.scrollTop != 0){
         this.scrolledContent.scrollBy(0, scrollStep);
      }
      else{
        clearInterval(scrollInterval); 
      }
    },10);
    if(this.window.innerWidth <= 992){
      this.scrolledContent.scrollTop = 0;
    }
  }

  @HostListener('window:resize')
  public onWindowResize():void {
    if(this.window.innerWidth <= 992){
      this.mHorizontal = false;
      this.settings.sidenavIsOpened = false;
      this.settings.sidenavIsPinned = false;
      this.settings.menu = 'vertical'

    }

    else{
      this.mHorizontal = true;
      (this.defaultMenu == 'horizontal') ? this.settings.menu = 'horizontal' : this.settings.menu = 'vertical'
      this.settings.sidenavIsOpened = true;
     this.settings.sidenavIsPinned = true;
    }
  }

  iconclick(){
    let dialogRef = this.dialog.open(ContactComponent, {
    width: '1000px',
    height: '500px',
  });
}

  // public closeSubMenus(){
  //   let menu = document.querySelector(".sidenav-menu-outer");
  //   if(menu){
  //     for (let i = 0; i < menu.children[0].children.length; i++) {
  //       let child = menu.children[0].children[i];
  //       if(child){
  //         if(child.children[0].classList.contains('expanded')){
  //             child.children[0].classList.remove('expanded');
  //             child.children[1].classList.remove('show');
  //         }
  //       }
  //     }
  //   }
  // }

}
