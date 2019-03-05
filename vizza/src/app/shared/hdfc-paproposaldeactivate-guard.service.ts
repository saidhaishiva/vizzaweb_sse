import { Injectable } from '@angular/core';
import {AppollomunichpaComponent} from '../pages/appollo-munich-pa/appollo-munich-pa.component';
import {CanDeactivate} from '@angular/router';
import {HdfcPersonalaccidentComponent} from '../pages/hdfc-personalaccident/hdfc-personalaccident.component';

@Injectable()
export class HdfcPaproposaldeactivateGuardService implements CanDeactivate<HdfcPersonalaccidentComponent>{

  constructor() { }
  canDeactivate(proposal: HdfcPersonalaccidentComponent) {

    const can = proposal.hdfc_PA_proposal_id ;
    if (can == 0 || can != '') {
      let r = confirm("You haven't closed the HDFC-PersonalAccident-proposal form.Are you sure you want to navigate from this page?");
      if (r == true) {
        return true;
      } else {
        return false;
      }
    }

    return true;
  }
}
