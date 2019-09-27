import { Component, OnInit } from '@angular/core';
import {Settings} from '../../app.settings.model';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HealthService} from '../../shared/services/health.service';
import {AppSettings} from '../../app.settings';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../shared/services/auth.service';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-iffco-tokio-health-payament-success',
  templateUrl: './iffco-tokio-health-payament-success.component.html',
  styleUrls: ['./iffco-tokio-health-payament-success.component.scss']
})
export class IffcoTokioHealthPayamentSuccessComponent implements OnInit {
  public paymentStatus: any
  public type: any
  public path: any
  public proposalId: any
  public remainingStatus: any
  public applicationNo: any
  public settings: Settings;
  constructor(public config: ConfigurationService,public router: Router, public proposalservice: HealthService, public route: ActivatedRoute, public appSettings: AppSettings, public toast: ToastrService, public auth: AuthService, public dialog: MatDialog) {
    this.settings = this.appSettings.settings;
    this.remainingStatus = false;
    this.route.params.forEach((params) => {
      this.paymentStatus = params.status;
      this.applicationNo = params.applicationNo;
      this.proposalId = params.proId;

    });
    // let groupDetails = JSON.parse(sessionStorage.groupDetails);
    // for(let i = 0; i < groupDetails.family_groups.length; i++) {
    //   if(groupDetails.family_groups[i].name == groupDetails.family_groups[sessionStorage.changedTabIndex].name){
    //     groupDetails.family_groups[i].status = 1;
    //   }
    // }
    // let status = groupDetails.family_groups.filter(data => data.status == 0);
    // if(status.length > 0) {
    //   this.remainingStatus = true;
    // }
    // sessionStorage.groupDetails = JSON.stringify(groupDetails);
  }


  ngOnInit() {
  }
  retry() {
    this.router.navigate(['/iffco'  + '/' + true]);
  }
  pay(){
    // sessionStorage.policyLists = JSON.stringify({index: 0, value: []});
    this.router.navigate(['/healthinsurance']);
  }

}
