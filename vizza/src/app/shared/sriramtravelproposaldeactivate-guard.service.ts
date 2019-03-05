import { Injectable } from '@angular/core';
import {PersonalAccidentReligareProposalComponent} from '../pages/personal-accident-religare-proposal/personal-accident-religare-proposal.component';
import {TravelShriramProposalComponent} from '../pages/travel-shriram-proposal/travel-shriram-proposal.component';
import {CanDeactivate} from '@angular/router';

@Injectable()
export class SriramtravelproposaldeactivateGuardService implements CanDeactivate<TravelShriramProposalComponent>{

  constructor() { }
  canDeactivate(proposal: TravelShriramProposalComponent) {

    const can = proposal.travel_shriram_proposal_id ;
    console.log(can);
    if (can == 0 || can != '') {
      let r = confirm("You haven't closed the Sriram-Travel-proposal form.Are you sure you want to navigate from this page?");
      if (r == true) {
        return true;
      } else {
        return false;
      }
    }

    return true;
  }

}
