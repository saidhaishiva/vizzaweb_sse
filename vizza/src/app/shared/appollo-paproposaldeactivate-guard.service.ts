import { Injectable } from '@angular/core';
import {AppollomunichpaComponent} from '../pages/appollo-munich-pa/appollo-munich-pa.component';
import {CanDeactivate} from '@angular/router';

@Injectable()
export class AppolloPaproposaldeactivateGuardService implements CanDeactivate<AppollomunichpaComponent>{

  constructor() { }
  canDeactivate(proposal: AppollomunichpaComponent) {

    const can = proposal.appolloPA ;
    if (can == 0 || can != '') {
      let r = confirm("You haven't closed the Appollo Munich-PersonalAccident-proposal form.Are you sure you want to navigate from this page?");
      if (r == true) {
        return true;
      } else {
        return false;
      }
    }

    return true;
  }
}
