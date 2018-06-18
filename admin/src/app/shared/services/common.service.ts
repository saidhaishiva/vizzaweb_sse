import {AuthService} from './auth.service';
import {ConfigurationService} from './configuration.service';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


@Injectable()
export class CommonService {
    bSubject: any;
    constructor(private http: HttpClient, private configurationService: ConfigurationService, private authService: AuthService) {
         this.bSubject = new BehaviorSubject('');
    }

    updateprofile(data) {
    this.bSubject.next(data);
    }
    getFormUrlEncoded(toConvert) {
        const formBody = [];
        for (const property in toConvert) {
            const encodedKey = encodeURIComponent(property);
            const encodedValue = encodeURIComponent(toConvert[property]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        return formBody.join('&');
    }
    getPostal(data) {
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accesstoken': token})
        };
        const url = this.configurationService.getHost() + 'common/checkPincode' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    sendReplyPatientQuery(data) {
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accesstoken': token})
        };
        const url = this.configurationService.getHost() + 'doctor/answerForPatientQuery' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getPatientQueries(data) {
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*',  'Accesstoken': token})
        };
        const url = this.configurationService.getHost() + 'doctor/patientQueryAndAnswer' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        const body = res;
        return body || {};
    }

    private handleError(error: Response | any) {
        console.log(error);
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
