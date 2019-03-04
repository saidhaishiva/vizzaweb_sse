import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {HealthService} from '../../shared/services/health.service';

@Injectable()
export class HealthInsuranceResolver implements Resolve<any> {
    constructor(public health: HealthService) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        return this.health.companyDetails();
    }
}
