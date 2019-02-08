import { Injectable } from '@angular/core';
import {CanDeactivate} from '@angular/router';
import {BajajAlianzComponent} from '../pages/bajaj-alianz/bajaj-alianz.component';

@Injectable()
export class BajajHealthDeactivateGuardService implements CanDeactivate<BajajAlianzComponent>{

  constructor() { }
  canDeactivate(proposal: BajajAlianzComponent) {
    const can = proposal.proposalId ;
    console.log(can);
    if (can == 0 || can != '') {
      let r = confirm("You haven't closed the Bajaj-Health-proposal form.Are you sure you want to navigate from this page?");
      if (r == true) {
        return true;
      } else {
        return false;
      }
    }

    return true;
  }

}
