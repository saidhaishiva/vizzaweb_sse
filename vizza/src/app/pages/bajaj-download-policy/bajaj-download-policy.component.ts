
import { Component, OnInit } from '@angular/core';
import {HealthService} from '../../shared/services/health.service';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {Settings} from '../../app.settings.model';
import { AppSettings } from '../../app.settings';
import {ConfigurationService} from '../../shared/services/configuration.service';

@Component({
    selector: 'app-bajaj-download-policy',
    templateUrl: './bajaj-download-policy.component.html',
    styleUrls: ['./bajaj-download-policy.component.scss']
})
export class BajajDownloadPolicyComponent implements OnInit {
    public settings: Settings;
    public proposalId: any;
    public paymentStatus: any;
    type: any;
    currenturl: any;
    path: any;
    constructor(public config: ConfigurationService, public proposalservice: HealthService, public route: ActivatedRoute, public appSettings: AppSettings, public auth: AuthService) {
        this.route.params.forEach((params) => {
            this.proposalId = params.proId;
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
        this.settings.loadingSpinner = false;
        console.log(successData.ResponseObject, 'ssssssssssssssssssssss');
        if (successData.IsSuccess == true) {
            this.type = successData.ResponseObject.type;
            this.path = successData.ResponseObject.path;
            this.currenturl = this.config.getimgUrl();
            if (this.type == 'pdf') {
                console.log(this.currenturl);
                console.log(successData.ResponseObject.path, 'path');
                this.path = successData.ResponseObject.path;
                window.open(this.currenturl + '/' + this.path, '_blank');
            }
        }
    }
    public downloadPdfFailure(error) {
        this.settings.loadingSpinner = false;
        console.log(error);
    }

}
