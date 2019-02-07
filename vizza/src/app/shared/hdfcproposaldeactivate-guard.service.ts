import { Injectable } from '@angular/core';
import {CanDeactivate} from '@angular/router';
import {HdfcHealthInsuranceComponent} from '../pages/hdfc-health-insurance/hdfc-health-insurance.component';
import {StarHealthProposalComponent} from '../pages/star-health-proposal/star-health-proposal.component';

@Injectable()
export class HdfcproposaldeactivateGuardService implements CanDeactivate<HdfcHealthInsuranceComponent>{

  constructor() { }
  canDeactivate(proposal: HdfcHealthInsuranceComponent) {

    const can = proposal.hdfc_health_proposal_id ;
    console.log(can);
    if (can == 0 || can != '') {
      let r = confirm("You haven't closed the hdfc-health-proposal form.Are you sure you want to navigate from this page?");
      if (r == true) {
        return true;
      } else {
        return false;
      }
    }

    return true;
  }

}
