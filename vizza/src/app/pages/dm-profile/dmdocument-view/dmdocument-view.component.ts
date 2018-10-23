import {Component, Inject, OnInit} from '@angular/core';
import {AppSettings} from '../../../app.settings';
import {ConfigurationService} from '../../../shared/services/configuration.service';
import {Settings} from '../../../../../../admin/src/app/app.settings.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DocumentViewComponent} from '../../posprofile/document-view/document-view.component';

@Component({
  selector: 'app-dmdocument-view',
  templateUrl: './dmdocument-view.component.html',
  styleUrls: ['./dmdocument-view.component.scss']
})
export class DmdocumentViewComponent implements OnInit {

    public webhost: any;
    public settings: Settings;

    constructor(public dialogRef: MatDialogRef<DocumentViewComponent>,
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