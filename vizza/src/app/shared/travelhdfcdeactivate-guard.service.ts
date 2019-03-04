import { Injectable } from '@angular/core';
import {TravelHdfcProposalComponent} from '../pages/travel-hdfc-proposal/travel-hdfc-proposal.component';
import {CanDeactivate} from '@angular/router';

@Injectable()
export class TravelhdfcdeactivateGuardService implements CanDeactivate<TravelHdfcProposalComponent>{

  constructor() { }
  canDeactivate(proposal: TravelHdfcProposalComponent) {

    const can = proposal.hdfc_Travel_proposal_id ;
    if (can == 0 || can != '') {
      let r = confirm("You haven't closed the Hdfc-Travel-Proposal form.Are you sure you want to navigate from this page?");
      if (r == true) {
        return true;
      } else {
        return false;
      }
    }

    return true;
  }

}
