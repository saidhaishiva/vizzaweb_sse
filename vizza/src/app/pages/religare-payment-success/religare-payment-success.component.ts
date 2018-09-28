import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-religare-payment-success',
  templateUrl: './religare-payment-success.component.html',
  styleUrls: ['./religare-payment-success.component.scss']
})
export class ReligarePaymentSuccessComponent implements OnInit {
    public paymentStatus: any
  constructor(public route: ActivatedRoute) {
      this.route.params.forEach((params) => {
          console.log(params.id);
          this.paymentStatus = params.id
      });
  }

  ngOnInit() {
  }

}
