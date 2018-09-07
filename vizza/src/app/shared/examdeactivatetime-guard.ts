import { CanDeactivate } from '@angular/router';
import { ExamComponent} from '../pages/exam/exam.component';

export  class ExamdeactivatetimeGuard implements CanDeactivate<ExamComponent> {
    // constructor(private authService: AuthService) { }
    canDeactivate(training: ExamComponent) {
        console.log(training, 'candeactivate');
        const status = sessionStorage.examBack;
        if (status == 1) {
            return true;
        } else {
            // alert("You can't move the another page until complete your exam");
            return true;
        }
    }

}

