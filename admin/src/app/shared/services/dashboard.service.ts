import {AuthService} from './auth.service';
import {ConfigurationService} from './configuration.service';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable()
export class DashboardService {

    constructor(private http: HttpClient, private configurationService: ConfigurationService, private authService: AuthService) {

    }
    //
    // getDoctorDetails(data) {
    //     const json = JSON.stringify(data);
    //     console.log(json);
    //     const httpOptions = {
    //         headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accesstoken': this.authService.getToken()})
    //     };
    //     const url = this.configurationService.getHostOld() + 'admin/dashboard';
    //     return this.http.post(url , json, httpOptions);
    //     // .map(this.extractData )
    //     // .catch(this.handleError);
    // }

    private extractData(res: Response) {
        const body = res;
        return body || {};
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            // const body = error.json() || '';
            const err = error || JSON.stringify(error);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(error);
    }

}
