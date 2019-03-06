import { Component, OnInit } from '@angular/core';
import {HealthService} from '../../shared/services/health.service';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {Settings} from '../../app.settings.model';
import { AppSettings } from '../../app.settings';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-download-policy',
  templateUrl: './download-policy.component.html',
  styleUrls: ['./download-policy.component.scss']
})
export class DownloadPolicyComponent implements OnInit {
    public settings: Settings;
    public proposalId: any;
    type: any;
    currenturl: any;
    path: any;
  constructor(public config: ConfigurationService, public toast: ToastrService, public proposalservice: HealthService, public route: ActivatedRoute, public appSettings: AppSettings, public auth: AuthService) {
      this.route.params.forEach((params) => {
          this.proposalId = params.id;
      });

  }
  ngOnInit() {
    this.DownloadPdf();
  }
    DownloadPdf() {
        const data = {
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
            'mail_status': '0',
            'proposal_id' : this.proposalId,
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
        }
        this.proposalservice.getDownloadPdf(data).subscribe(
            (successData) => {
                this.downloadPdfSuccess(successData);
            },
            (error) => {
                this.downloadPdfFailure(error);
            }
        );
    }
    public downloadPdfSuccess(successData) {
        if (successData.IsSuccess == true) {
            this.type = successData.ResponseObject.type;
            this.currenturl = this.config.getimgUrl();
            if (this.type == 'pdf') {
                this.path = successData.ResponseObject.path;
                window.open(this.currenturl + '/' + this.path, '_blank');
            }
        } else {
            this.toast.error(successData.ErrorObject);
        }
    }
    public downloadPdfFailure(error) {
    }

}
