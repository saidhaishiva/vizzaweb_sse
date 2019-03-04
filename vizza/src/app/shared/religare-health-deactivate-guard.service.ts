import { Injectable } from '@angular/core';
import {CanDeactivate} from '@angular/router';
import { ReligareHealthProposalComponent} from '../pages/religare-health-proposal/religare-health-proposal.component';

@Injectable()
export class ReligareHealthDeactivateGuardService implements CanDeactivate<ReligareHealthProposalComponent>{

  constructor() { }
  canDeactivate(proposal: ReligareHealthProposalComponent) {

    const can = proposal.proposalId ;
    console.log(can);
    if (can == 0 || can != '') {
      let r = confirm("You haven't closed the Religare-Health-proposal form.Are you sure you want to navigate from this page?");
      if (r == true) {
        return true;
      } else {
        return false;
      }
    }

    return true;
  }

}
