import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
    name: 'age'
})
export class AgePipe implements PipeTransform {

    transform(value: Date): string {

        if (value) {

            let today = moment();
            let birthdate = moment(value);
            let years = today.diff(birthdate, 'years');
            let html: any = years;

            html += today.subtract(years, 'years').diff(birthdate, 'months');

            return html;
        }
    }

}