import { CanDeactivate } from '@angular/router';
import { DmViewresultComponent} from '../pages/dm-exam/dm-viewresult/dm-viewresult.component';

export  class DmresultdeactivatetimeGuard implements CanDeactivate<DmViewresultComponent> {
    // constructor(private authService: AuthService) { }
    canDeactivate(training: DmViewresultComponent) {
        let back = sessionStorage.backDmStatus;
        console.log(back ,'backback');
        if(back == 'true') {
            return true;
        } else {
            return false;
        }

    }

}

