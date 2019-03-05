import { Injectable } from '@angular/core';
import {CanDeactivate} from '@angular/router';
import {RelianceHeathProposalComponent} from '../pages/reliance-heath-proposal/reliance-heath-proposal.component';

@Injectable()
export class RelianceHealthDeactivateGuardService implements CanDeactivate<RelianceHeathProposalComponent>{

  constructor() { }
  canDeactivate(proposal: RelianceHeathProposalComponent) {
    const can = proposal.proposalId ;
    console.log(can);
    if (can == 0 || can != '') {
      let r = confirm("You haven't closed the Reliance-Health-proposal form.Are you sure you want to navigate from this page?");
      if (r == true) {
        return true;
      } else {
        return false;
      }
    }

    return true;
  }

}
