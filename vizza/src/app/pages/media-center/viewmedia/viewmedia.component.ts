import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AppSettings} from '../../../app.settings';
import {Settings} from '../../../app.settings.model';

@Component({
  selector: 'app-viewmedia',
  templateUrl: './viewmedia.component.html',
  styleUrls: ['./viewmedia.component.scss']
})
export class ViewmediaComponent implements OnInit {
    public searchText: string;
public page: any;
    public settings: Settings;

  constructor( private router: Router, public appSettings: AppSettings,
  ) {
      this.settings = this.appSettings.settings;

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
}
