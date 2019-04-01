import { Component, OnInit } from '@angular/core';
import {AppSettings} from '../../app.settings';
import {Router} from '@angular/router';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {FormBuilder} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {TravelService} from '../../shared/services/travel.service';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../shared/services/auth.service';
import {DatePipe} from '@angular/common';
import {Settings} from '../../app.settings.model';

@Component({
  selector: 'app-bike-premium-list',
  templateUrl: './bike-premium-list.component.html',
  styleUrls: ['./bike-premium-list.component.scss']
})
export class BikePremiumListComponent implements OnInit {
  public settings: Settings;
  tabIndex: any;
  webhost: any;
    filterCompany: any;
  constructor(public appSettings: AppSettings, public router: Router, public config: ConfigurationService, public fb: FormBuilder, public dialog: MatDialog, public travel: TravelService, public toast: ToastrService, public auth: AuthService, public datePipe : DatePipe) {
    this.settings = this.appSettings.settings;
    this.tabIndex = 0;
    this.settings.HomeSidenavUserBlock = false;
    this.settings.sidenavIsOpened = false;
    this.settings.sidenavIsPinned = false;
    this.webhost = this.config.getimgUrl();
    // this.compareArray = [];
    // this.productListArray = [];
    // this.allProductLists = [];
  }

  ngOnInit() {
  }

}
