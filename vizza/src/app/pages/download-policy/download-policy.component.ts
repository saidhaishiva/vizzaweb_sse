import { Component, OnInit } from '@angular/core';
import {ProposalService} from '../../shared/services/proposal.service';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {Settings} from '../../app.settings.model';
import { AppSettings } from '../../app.settings';

@Component({
  selector: 'app-download-policy',
  templateUrl: './download-policy.component.html',
  styleUrls: ['./download-policy.component.scss']
})
export class DownloadPolicyComponent implements OnInit {
    public settings: Settings;
    public proposalId: any;
  constructor(public proposalservice: ProposalService, public route: ActivatedRoute, public appSettings: AppSettings, public auth: AuthService) {
      this.route.params.forEach((params) => {
          console.log(params.id);
          this.proposalId = params.id;
      });

  }
  ngOnInit() {
    this.DownloadPdf();
  }
    DownloadPdf() {
        const data = {
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
        console.log(successData.ResponseObject);
    }
    public downloadPdfFailure(error) {
        console.log(error);
    }

}
