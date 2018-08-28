import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-entranceexam',
  templateUrl: './entranceexam.component.html',
  styleUrls: ['./entranceexam.component.scss']
})
export class EntranceexamComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }
    startExam() {
    this.router.navigate(['/exam']);
    }

}
