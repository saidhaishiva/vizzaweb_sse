import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-edelweiss-term-life',
  templateUrl: './edelweiss-term-life.component.html',
  styleUrls: ['./edelweiss-term-life.component.scss']
})
export class EdelweissTermLifeComponent implements OnInit {


  constructor(public authservice: AuthService) { }

  ngOnInit() {
  }

  //
  // getIncomeProof() {
  //   const data = {
  //     'platform': 'web',
  //     'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
  //     'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
  //     'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
  //     'occupation_id': this.proposal.controls['occupationList'].value
  //   }
  //   this.termService.incomeProof(data).subscribe(
  //       (successData) => {
  //         this.incomeProofSuccess(successData);
  //       },
  //       (error) => {
  //         this.incomeProofFailure(error);
  //       }
  //   );
  // }
  //
  // public incomeProofSuccess(successData) {
  //   if (successData.IsSuccess) {
  //     this.incomeProofList = successData.ResponseObject;
  //     this.incomeList = true;
  //   } else {
  //     this.incomeList = false;
  //
  //   }
  // }

  public incomeProofFailure(error) {
  }

}
