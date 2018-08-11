import { CanDeactivate } from '@angular/router';
import { ProposalComponent} from '../pages/proposal/proposal.component';

export  class DeactivateGuard implements CanDeactivate<ProposalComponent> {
    canDeactivate(component: ProposalComponent) {
        const can = component.proposalId;
        console.log(can, 'candeactivate');
        if (can == 0) {
            let txt;
            let r = confirm("You haven't closed the proposal form.Are you sure you want to navigate from this page?");
            if (r == true) {
                return true;
            } else {
                return false;
            }
        }

        return true;
    }

}
