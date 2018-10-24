import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ConfigurationService} from '../../../shared/services/configuration.service';
import {ClinicimageviewComponent} from '../../posprofile/clinicimageview/clinicimageview.component';
import {AppSettings} from '../../../app.settings';
import {Settings} from '../../../app.settings.model';

@Component({
  selector: 'app-view-documents',
  templateUrl: './view-documents.component.html',
  styleUrls: ['./view-documents.component.scss']
})
export class ViewDocumentsComponent implements OnInit {

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
    saveImageAs1(adress) {
        window.open(adress);
    }

}
