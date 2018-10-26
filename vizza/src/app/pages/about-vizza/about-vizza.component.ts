import { Component, OnInit } from '@angular/core';
import {AppSettings} from '../../app.settings';
import {Settings} from '../../app.settings.model';

@Component({
  selector: 'app-about-vizza',
  templateUrl: './about-vizza.component.html',
  styleUrls: ['./about-vizza.component.scss']
})
export class AboutVizzaComponent implements OnInit {
    public settings: Settings;
  constructor(public appSettings: AppSettings) {
      this.settings = this.appSettings.settings;
      this.settings.HomeSidenavUserBlock = true;
      this.settings.sidenavIsOpened = true;
      this.settings.sidenavIsPinned = true;
  }

  ngOnInit() {
  }

}
