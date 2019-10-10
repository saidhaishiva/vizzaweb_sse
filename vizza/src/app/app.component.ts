import {Component, HostListener, ViewChild, Inject} from '@angular/core';
import { AppSettings } from './app.settings';
import { Settings } from './app.settings.model';
import { WINDOW } from '@ng-toolkit/universal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public settings: Settings;
  public mobileView: any;
  constructor(@Inject(WINDOW) private window: Window, public appSettings:AppSettings){
      this.settings = this.appSettings.settings;
      this.mobileView = true;
      console.log(this.settings);

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
