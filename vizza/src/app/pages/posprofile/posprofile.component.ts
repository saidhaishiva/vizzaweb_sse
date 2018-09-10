import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import {Settings} from '../../app.settings.model';
import {AppSettings} from '../../app.settings';
import { ConfigurationService } from '../../shared/services/configuration.service';
import { listTransition } from '../../theme/utils/app-animation';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { AgmCoreModule } from '@agm/core';
import { CommonService } from '../../shared/services/common.service';

declare var google: any;

@Component({
  selector: 'app-posprofile',
  templateUrl: './posprofile.component.html',
  styleUrls: ['./posprofile.component.scss'],
    animations: [ listTransition ],
    host: {
        '[@listTransition]': ''
    }
})
export class PosprofileComponent implements OnInit {
    public settings: Settings;
    public personal: any;
    public webhost: any;
    public sideNav: any;
    public currentTab: any;
    public selectedTab: any;
    public examSchedule: any;
    public examStatus: any;

    @ViewChild('sidenav') sidenav: any;
    public sidenavOpen:boolean = true;

    constructor(public route: ActivatedRoute, public auth: AuthService, public common: CommonService, public appSettings: AppSettings, public config: ConfigurationService, public dialog: MatDialog, public router: Router) {
        this.webhost = this.config.getimgUrl();
        this.settings = this.appSettings.settings;
        this.settings.HomeSidenavUserBlock = false;
        this.settings.sidenavIsOpened = false;
        this.settings.sidenavIsPinned = false;
        this.examStatus = sessionStorage.examStatus;

    }

  ngOnInit() {
      this.getPosProfile();
      // this.settings.loadingSpinner = false;
      this.currentTab = 'Personal';
      this.sideNav = [{
          'name': 'Personal',
          'value': 'active',
          'selected': false
      },{
          'name': 'Contact',
          'value': 'active',
          'selected': false
      },
      {
          'name': 'Documents',
          'value': 'active',
          'selected': false
      },
      {
          'name': 'Bank Details',
          'value': 'active',
          'selected': false
      },
      {
          'name': 'Education',
          'value': 'active',
          'selected': false
      },
      {
          'name': 'Training',
          'value': 'active',
          'selected': false
      },
      {
          'name': 'Examination',
          'value': 'active',
          'selected': false
      },
      {
          'name': 'Approval Letter',
          'value': 'active',
          'selected': false
      },
      {
          'name': 'Appointment Letter',
          'value': 'active',
          'selected': false
      },
      {
          'name': 'Certificate of Training',
          'value': 'active',
          'selected': false
      },
      {
          'name': 'Certificate of Examination',
          'value': 'active',
          'selected': false
      },
      {
          'name': 'Payment Options',
          'value': 'active',
          'selected': false
      }
      ];
      this.sideNav[0].selected = true;
  }

    viewDetail(i, value) {
       // this.sideNav[i].selected = true;
        this.selectedTab = i;
        this.currentTab = value;
        let exStatus = sessionStorage.examStatus;

        if (value == 'Training Period') {
            this.router.navigate(['/training']);
        } else if (value == 'Examination') {
            if (exStatus == 1) {
                this.router.navigate(['/startexam']);
            } else {
                this.examSchedule = 'Please complete training before applying the exam';
            }
        }
    }

  public getPosProfile() {
      console.log(this.settings.loadingSpinner);
      this.settings.loadingSpinner = true;
      console.log(this.settings, 'settings');
      const data = {
      'platform': 'web',
        'roleid': this.auth.getPosRoleId(),
        'userid': this.auth.getPosUserId(),
        'pos_id': this.auth.getPosUserId()
    };
      this.common.getPosProfile(data).subscribe(
          (successData) => {
              this.getPosProfileSuccess(successData);

          },
          (error) => {
              this.getPosProfileFailure(error);
          }
      );
  }
    getPosProfileSuccess(successData) {
        console.log(successData);
        if (successData.IsSuccess) {
            this.settings.loadingSpinner = false;
            this.personal = successData.ResponseObject;

        }


    }

    getPosProfileFailure(error) {
    console.log(error);
    }
    print() {
        window.print();
    }

}


