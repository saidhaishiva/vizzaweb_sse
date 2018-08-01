import { Component, OnInit } from '@angular/core';
import {AppSettings} from '../../app.settings';
import {Settings} from '../../app.settings.model';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public settings: Settings;

  constructor(public appSettings: AppSettings, public toast: ToastrService) {
      this.settings = this.appSettings.settings;
      this.settings.HomeSidenavUserBlock = false;
      this.settings.sidenavIsOpened = false;
      this.settings.sidenavIsPinned = false;
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
      sessionStorage.shorListTab = '';
      sessionStorage.enquiryId = '';

  }

}
