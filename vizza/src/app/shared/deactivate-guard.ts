import { CanDeactivate } from '@angular/router';
import { ProposalComponent} from '../pages/proposal/proposal.component';
import { ExamComponent} from '../pages/exam/exam.component';

// import { Router} from '@angular/router';
//
//  console.log(this.router.url);



export  class DeactivateGuard implements CanDeactivate<ProposalComponent> {
    canDeactivate(proposal: ProposalComponent) {
        console.log(proposal, 'candeactivate');

        const can = proposal.proposalId;
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
