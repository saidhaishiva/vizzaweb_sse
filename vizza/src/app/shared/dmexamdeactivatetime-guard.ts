import { CanDeactivate } from '@angular/router';
import { DmExamComponent} from '../pages/dm-exam/dm-exam.component';

export  class DmexamdeactivatetimeGuard implements CanDeactivate<DmExamComponent> {
    // constructor(private authService: AuthService) { }
    canDeactivate(training: DmExamComponent) {
        console.log(training, 'candeactivate');
        const status = sessionStorage.dmExamBack;
        if (status == 1) {
            return true;
        } else {
            // alert("You can't move the another page until complete your exam");
            return true;
        }
    }

}

