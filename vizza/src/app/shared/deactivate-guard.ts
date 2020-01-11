import { CanDeactivate } from '@angular/router';
import { StarHealthProposalComponent} from '../pages/star-health-proposal/star-health-proposal.component';
import {ReligareHealthProposalComponent} from '../pages/religare-health-proposal/religare-health-proposal.component';
import { ExamComponent} from '../pages/exam/exam.component';

// import { Router} from '@angular/router';
//
//  console.log(this.router.url);



export  class DeactivateGuard implements CanDeactivate<StarHealthProposalComponent> {
    canDeactivate(proposal: StarHealthProposalComponent) {
        console.log(proposal, 'candeactivate');

        const can = proposal.proposalId;
        if (can == 0 || can != '') {
            let txt;
            let r = confirm("You haven't closed the star-health-proposal form.Are you sure you want to navigate from this page?");
            if (r == true) {
                return true;
            } else {
                return false;
            }
        }

        return true;
    }

}
