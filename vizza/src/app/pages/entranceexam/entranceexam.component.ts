import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-entranceexam',
  templateUrl: './entranceexam.component.html',
  styleUrls: ['./entranceexam.component.scss']
})
export class EntranceexamComponent implements OnInit {
    examStatus: any;
  constructor(public router: Router) {
      this.examStatus = sessionStorage.examStatus;
  }

  ngOnInit() {
  }
    startExam() {
    sessionStorage.examBack = 0;
    this.router.navigate(['/dm-exam']);
    }

}
