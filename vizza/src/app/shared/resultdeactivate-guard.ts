import { CanDeactivate } from '@angular/router';
import {ViewresultComponent} from '../pages/viewresult/viewresult.component';

export  class ResultDeactivateGuard implements CanDeactivate<ViewresultComponent> {
    canDeactivate(proposal: ViewresultComponent) {
        return false;
    }

}
