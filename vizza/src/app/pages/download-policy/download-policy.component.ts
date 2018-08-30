import { Component, OnInit } from '@angular/core';
import {ProposalService} from '../../shared/services/proposal.service';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {Settings} from '../../app.settings.model';
import { AppSettings } from '../../app.settings';
import * as FileSaver from 'file-saver';
import {ConfigurationService} from '../../shared/services/configuration.service';


@Component({
  selector: 'app-download-policy',
  templateUrl: './download-policy.component.html',
  styleUrls: ['./download-policy.component.scss']
})
export class DownloadPolicyComponent implements OnInit {
    public settings: Settings;
    public proposalId: any;
    type: any;
    path: any;
    fileName: any;
    constructor(public proposalservice: ProposalService, public route: ActivatedRoute, public appSettings: AppSettings, public auth: AuthService, public config: ConfigurationService) {
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
        console.log(successData.ResponseObject, 'policyyyyyyyyy');
        this.type = successData.ResponseObject.type;
        this.fileName = this.config.getimgUrl();
        if (this.type == 'pdf') {
            console.log(this.fileName);
            console.log(successData.ResponseObject.path , 'path');
            this.path = successData.ResponseObject.path;
            window.open(this.fileName + '/' +  this.path,'_blank');
            // window.location.href = this.fileName + '/' +  this.path  ;
        }
    }
    public downloadPdfFailure(error) {
        console.log(error);
    }
}
