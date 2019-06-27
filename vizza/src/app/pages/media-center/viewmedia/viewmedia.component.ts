import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppSettings} from '../../../app.settings';
import {Settings} from '../../../app.settings.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MediaCenterComponent} from '../media-center.component';

@Component({
  selector: 'app-viewmedia',
  templateUrl: './viewmedia.component.html',
  styleUrls: ['./viewmedia.component.scss']
})
export class ViewmediaComponent implements OnInit {
    public searchText: string;
    public page: any;
    public settings: Settings;
    details: any;

  constructor(public dialogRef: MatDialogRef<MediaCenterComponent>,
              @Inject(MAT_DIALOG_DATA) private router: Router, public appSettings: AppSettings, public dialog: MatDialog) {
      this.settings = this.appSettings.settings;
      this.details = JSON.parse(sessionStorage.newsLetterContent);
  }

  ngOnInit() {
  }
  media(){
      this.router.navigate(['/mediacenter']);
  }
    public onPageChanged(event){
        this.page = event;
        if(this.settings.fixedHeader){
            document.getElementById('main-content').scrollTop = 0;
        }
        else{
            document.getElementsByClassName('mat-drawer-content')[0].scrollTop = 0;
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
