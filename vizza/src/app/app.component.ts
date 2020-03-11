import {Component, HostListener, ViewChild, Inject} from '@angular/core';
import { AppSettings } from './app.settings';
import { Settings } from './app.settings.model';
import { WINDOW } from '@ng-toolkit/universal';
import{Router, NavigationEnd} from '@angular/router';
import {Gtag} from 'angular-gtag';

declare let gtag: Function;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  public settings: Settings;
  public mobileView: any;
  constructor(@Inject(WINDOW) private window: Window, public appSettings:AppSettings, public router: Router,gtag: Gtag ){
      this.settings = this.appSettings.settings;
      this.mobileView = true;
      console.log(this.settings);

      // gtag.pageview({
      //     page_title: 'home',
      //     page_path: '/home',
      //     page_location: 'https://vizzainsurance.com/#/home'
      // });

      this.router.events.subscribe(event => {
          if (event instanceof NavigationEnd) {
              (<any>window).ga('set', 'page', event.urlAfterRedirects);
              (<any>window).ga('send', 'pageview');
          }
      });
      // this.router.events.subscribe(event => {
      //     console.log(event,'event');
      //         if(event instanceof NavigationEnd){
      //             console.log(gtag,'gtag');
      //             gtag('config', 'UA-148497492-1',
      //                 {
      //                     'page_path': event.urlAfterRedirects
      //                 }
      //             );
      //         }
      //     }
      // )


  } 

  ngOnInit() { }


// @HostListener('window:resize')
//    public onWindowResize():void {
//     if (window.innerWidth <= 992 && window.innerHeight < window.innerWidth ) {
//         this.mobileView = false;
//     } else{
//         this.mobileView = true;
//     }
// }

}
