import { Component, OnInit, Inject } from '@angular/core';
import { AppSettings} from '../../../app.settings';
import { ConfigurationService} from '../../../shared/services/configuration.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Settings} from '../../../../../../admin/src/app/app.settings.model';


@Component({
  selector: 'app-document-view',
  templateUrl: './document-view.component.html',
  styleUrls: ['./document-view.component.scss']
})
export class DocumentViewComponent implements OnInit {
    public webhost: any;
    public settings: Settings;

    constructor(
        public dialogRef: MatDialogRef<DocumentViewComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any, public appSettings: AppSettings, public config: ConfigurationService) {
        this.settings = this.appSettings.settings;
        this.webhost = this.config.getimgUrl();
        this.dialogRef.disableClose = true;
    }

    ngOnInit() {

    }
    onNoClick(): void {
        this.dialogRef.close();
    }

}
