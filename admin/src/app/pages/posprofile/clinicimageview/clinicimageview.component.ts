import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Settings} from '../../../app.settings.model';
import {AppSettings} from '../../../app.settings';
import { ConfigurationService } from '../../../shared/services/configuration.service';

@Component({
  selector: 'app-clinicimageview',
  templateUrl: './clinicimageview.component.html',
  styleUrls: ['./clinicimageview.component.scss']
})
export class ClinicimageviewComponent implements OnInit {
    public webhost: any;
    public settings: Settings;
    ngOnInit() {
        this.settings = this.appSettings.settings;
        this.webhost = this.config.getimgUrl();
    }
    constructor(
        public dialogRef: MatDialogRef<ClinicimageviewComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any, public appSettings: AppSettings, public config: ConfigurationService) {

    }

    onNoClick(): void {
        this.dialogRef.close();
    }


}
