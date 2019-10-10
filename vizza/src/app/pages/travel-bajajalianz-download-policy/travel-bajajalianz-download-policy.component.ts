import { Component, OnInit, Inject } from '@angular/core';
import {Settings} from '../../app.settings.model';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {ActivatedRoute} from '@angular/router';
import {TravelService} from '../../shared/services/travel.service';
import {AppSettings} from '../../app.settings';
import {AuthService} from '../../shared/services/auth.service';
import { WINDOW } from '@ng-toolkit/universal';

@Component({
  selector: 'app-travel-bajajalianz-download-policy',
  templateUrl: './travel-bajajalianz-download-policy.component.html',
  styleUrls: ['./travel-bajajalianz-download-policy.component.scss']
})
export class TravelBajajalianzDownloadPolicyComponent implements OnInit {
  public settings: Settings;
  public proposalId: any;
  public paymentStatus: any;
  type: any;
  currenturl: any;
  path: any;
  constructor(@Inject(WINDOW) private window: Window, public config: ConfigurationService, public proposalservice: TravelService, public route: ActivatedRoute, public appSettings: AppSettings, public auth: AuthService) {
    this.route.params.forEach((params) => {
      console.log(params.id);
      this.paymentStatus = params.status;
      this.proposalId = params.proId;
    });

  }
  ngOnInit() {
    this.DownloadPdf();

  }

  DownloadPdf() {
    alert('s');
    const data = {
      'mail_status': '0',
      'proposal_id' : this.proposalId,
      'platform': 'web',
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
    }
    this.proposalservice.getDownloadPdfBajaj(data).subscribe(
        (successData) => {

          this.downloadPdfSuccess(successData);
        },
        (error) => {
          this.downloadPdfFailure(error);
        }
    );
  }
  public downloadPdfSuccess(successData) {
    console.log(successData.ResponseObject, 'ssssssssssssssssssssss');
    if (successData.IsSuccess == true) {
      this.type = successData.ResponseObject.type;
      this.path = successData.ResponseObject.path;
      this.currenturl = this.config.getimgUrl();
      if (this.type == 'pdf') {
        console.log(this.currenturl);
        console.log(successData.ResponseObject.path, 'path');
        this.path = successData.ResponseObject.path;
        this.window.open(this.currenturl + '/' + this.path, '_blank');
      }
    }
  }
  public downloadPdfFailure(error) {
    console.log(error);
  }

}
