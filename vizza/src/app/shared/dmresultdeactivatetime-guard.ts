import { CanDeactivate } from '@angular/router';
import { DmViewresultComponent} from '../pages/dm-exam/dm-viewresult/dm-viewresult.component';

export  class DmresultdeactivatetimeGuard implements CanDeactivate<DmViewresultComponent> {
    // constructor(private authService: AuthService) { }
    canDeactivate(training: DmViewresultComponent) {
        return false;
    }

}

