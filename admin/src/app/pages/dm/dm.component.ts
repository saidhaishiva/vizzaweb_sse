import {Component, OnInit, ViewChild} from '@angular/core';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Settings} from '../../app.settings.model';
import {ActivatedRoute, Router} from '@angular/router';
import {AppSettings} from '../../app.settings';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material';
import {AuthService} from '../../shared/services/auth.service';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {CommonService} from '../../shared/services/common.service';
import {DoctorsService} from '../../shared/services/doctors.service';

@Component({
  selector: 'app-dm',
  templateUrl: './dm.component.html',
  styleUrls: ['./dm.component.scss']
})
export class DmComponent implements OnInit {
    @ViewChild(DatatableComponent) table: DatatableComponent;
    pendingDmList: Array<any>;
    approvedDmList: Array<any>;
    holdDmList: Array<any>;
    rejectedDmList: Array<any>;
    filters: string;
    tabStatus: any;
    pageno: number;
    recordsperpage: any;
    public webhost: string;
    public settings: Settings;
    rows = [];
    temp = [];
    selected = [];
    loadingIndicator: boolean = true;
    tabValue: string;
    totalDm: any;
    pendingCount: number;
    approvedDmCount: number;
    holdDmCount: number;
    rejectedDmCount: number;
    dmStatus: any;
    // dmStatus: any;
    pageOffSet: any;
    allManagerLists: any;
    dmManager: any;
    filterStatus: any;
    allLists: any;
    selectedList: any;
    alldmLists: any;
    searchTag: string;
  constructor(public router: Router, public route: ActivatedRoute,
              public appSettings: AppSettings, private toastr: ToastrService,
              public dialog: MatDialog, public auth: AuthService,
              public config: ConfigurationService, public common: CommonService, public doctorService: DoctorsService) {
      this.settings = this.appSettings.settings;
      // this.settings.loadingSpinner = true;
      this.webhost = this.config.getimgUrl();
      this.filters = 'No';
      this.tabStatus = '0';
      this.pageno = 1;
      this.tabValue = 'inactive';
      this.recordsperpage = 10;
      this.pendingDmList = [];
      this.approvedDmList = [];
      this.holdDmList = [];
      this.rejectedDmList = [];
      this.totalDm = 0;
      this.searchTag = '';
      this.dmManager = '';
      this.pendingCount = 0;
      this.approvedDmCount = 0;
      this.holdDmCount = 0;
      this.rejectedDmCount = 0;
      this.dmStatus = '0';
      this.filterStatus = false;
      this.allLists = [
          {name: 'All'},
          {name: 'Documents'},
          {name: 'Training'},
          {name: 'Examination'}
      ];
  }

  ngOnInit() {
  }

}
