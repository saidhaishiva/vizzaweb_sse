import { Injectable } from '@angular/core';
import {PersonalAccidentReligareProposalComponent} from '../pages/personal-accident-religare-proposal/personal-accident-religare-proposal.component';
import {CanDeactivate} from '@angular/router';
import {AppollomunichpaComponent} from '../pages/appollo-munich-pa/appollo-munich-pa.component';

@Injectable()
export class ReligarePaproposaldeactivateGuardService implements CanDeactivate<PersonalAccidentReligareProposalComponent>{

  constructor() { }
  canDeactivate(proposal: PersonalAccidentReligareProposalComponent) {

    const can = proposal.religarePAProposal ;
    console.log(can);
    if (can == 0 || can != '') {
      let r = confirm("You haven't closed the Religare-Personal Accident-proposal form.Are you sure you want to navigate from this page?");
      if (r == true) {
        return true;
      } else {
        return false;
      }
    }

    return true;
  }

}
