import { CanDeactivate } from '@angular/router';
import {ViewresultComponent} from '../pages/viewresult/viewresult.component';

export  class ResultDeactivateGuard implements CanDeactivate<ViewresultComponent> {
    canDeactivate(proposal: ViewresultComponent) {
        let back = sessionStorage.backPosStatus;
        console.log(back ,'backback222');

        if(back == 'true') {
            return true;
        } else {
            return false;
        }
    }

}
