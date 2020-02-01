import {IffcoTokioComponent} from '../pages/iffco-tokio/iffco-tokio.component';
import {CanDeactivate} from '@angular/router';
import {StarHealthProposalComponent} from '../pages/star-health-proposal/star-health-proposal.component';

export  class IffcoDeactivatedGuardService implements CanDeactivate<IffcoTokioComponent> {
  canDeactivate(proposal: IffcoTokioComponent) {
    console.log(proposal, 'candeactivate');

    const can = proposal.proposalId;
    if (can == 0 || can != '') {
      let txt;
      let r = confirm("You haven't closed the iffco-tokio-proposal form.Are you sure you want to navigate from this page?");
      if (r == true) {
        return true;
      } else {
        return false;
      }
    }

    return true;
  }

}
// export class IffcoDeactivatedGuardService implements CanDeactivate<IffcoTokioComponent> {
//
//   constructor() {
//     canDeactivate(proposal: IffcoTokioComponent) {
//       console.log(proposal, 'candeactivate');
//
//       const can = proposal.proposalId;
//       if (can == 0 || can != '') {
//         let txt;
//         let r = confirm("You haven't closed the iffco-tokio-proposal form.Are you sure you want to navigate from this page?");
//         if (r == true) {
//           return true;
//         } else {
//           return false;
//         }
//       }
//
//       return true;
//     }
//   }
// }
