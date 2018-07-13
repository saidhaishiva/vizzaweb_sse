import { Component, OnInit } from '@angular/core';
import {AppSettings} from '../../app.settings';
import {Settings} from '../../app.settings.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public settings: Settings;

  constructor(public appSettings: AppSettings) {
      this.settings = this.appSettings.settings;
      this.settings.HomeSidenavUserBlock = true;
      this.settings.sidenavIsOpened = true;
      this.settings.sidenavIsPinned = true;
      console.log(this.settings, 'this.settings');
  }

  ngOnInit() {
      sessionStorage.setPage = '';
      sessionStorage.sideMenu = false;
      sessionStorage.setFamilyDetails = '';
      sessionStorage.setInsuredAmount = '';
      sessionStorage.setPincode = '';
      sessionStorage.setPage = '';
      sessionStorage.policyLists = '';
      sessionStorage.sideMenu = '';
      sessionStorage.sonBTn = '';
      sessionStorage.daughterBTn = '';
      sessionStorage.fatherBTn = '';
      sessionStorage.motherBtn = '';
      sessionStorage.fatherInLawBTn = '';
      sessionStorage.motherInLawBtn = '';
      sessionStorage.changedTabDetails = '';
      sessionStorage.changeSuninsuredAmount = '';
      sessionStorage.changedTabIndex = '';
  }

}
