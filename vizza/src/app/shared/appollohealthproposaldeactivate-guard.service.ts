import { Injectable } from '@angular/core';
import {CanDeactivate} from '@angular/router';
import {AppolloMunichComponent} from '../pages/appollo-munich-health/appollo-munich-health.component';

@Injectable()
export class AppollohealthproposaldeactivateGuardService implements CanDeactivate<AppolloMunichComponent>{

  constructor() { }
  canDeactivate(proposal: AppolloMunichComponent) {

    const can = proposal.proposalId ;
    if (can == 0 || can != '') {
      let r = confirm("You haven't closed the Appollo Munich-health-proposal form.Are you sure you want to navigate from this page?");
      if (r == true) {
        return true;
      } else {
        return false;
      }
    }

    return true;
  }

}
