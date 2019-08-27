import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {AppSettings} from '../../app.settings';
import {CommonService} from '../../shared/services/common.service';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';
import {Settings} from '../../app.settings.model';
import {LearningcenterService} from '../../shared/services/learningcenter.service';
import {ViewdetailsComponent} from '../health-insurance/viewdetails/viewdetails.component';
import {ContactComponent} from '../contact/contact.component';
import {ViewmediaComponent} from './viewmedia/viewmedia.component';

@Component({
  selector: 'app-media-center',
  templateUrl: './media-center.component.html',
  styleUrls: ['./media-center.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MediaCenterComponent implements OnInit {
    public searchText: string;
    public page:any;
    public response:any;
    public settings: Settings;
    public FullView: boolean;
    public rows: any;
    constructor(public appSettings:AppSettings,public learning: LearningcenterService, public common: CommonService, public router: Router,  public dialog: MatDialog){
        this.settings = this.appSettings.settings;
        this.rows = [];
    }


  ngOnInit() {
    this.mediaList();
    this.FullView = true;
  }
    mediaList() {
        const data = {
            "platform": "web",
        };
            this.learning.learningcenter(data).subscribe(
            (successData) => {
                this.updateSuccess(successData);
            },
            (error) => {
                this.updateFailure(error);
            }
        );
    }
    updateSuccess(successData) {
        if (successData.IsSuccess == true) {
           this.response= successData.ResponseObject;
            this.rows =  this.response;
           console.log(this.response,'dddddddd');
        } else {
        }
    }
    updateFailure(error) {
    }
    redirect(val){
        console.log(val,'vallllllllll');
        sessionStorage.newsLetterContent = JSON.stringify(val);
        // this.router.navigate(['/viewmedia']);
        let dialogRef = this.dialog.open(ViewmediaComponent, {
            width: '900px',
        });

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
    fullView(){
        this.FullView = true;
    }
    MediumView(){
        this.FullView = false;

    }
}
