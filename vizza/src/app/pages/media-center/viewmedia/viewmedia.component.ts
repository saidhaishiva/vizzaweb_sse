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
    response: any;
    user: any;
  constructor(public router: Router)
   {
     this.user  = JSON.parse(sessionStorage.newsDetails);
       console.log(this.user, 'this.user');
       console.log(sessionStorage.news, 'valll');
       console.log(sessionStorage.name, 'lll');
   }

  ngOnInit() {
  }
media() {
    this.router.navigate(['/mediacenter']);

}
}
