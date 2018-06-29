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
    personalDetails() {
        const data = {
            'roleid': this.authService.getRoleId(),
            'platform': 'web',
            'doctorid': this.authService.getDoctorId(),
            'userid': this.authService.getUserId()
        };

        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accesstoken': token})
        };
        const url = this.configurationService.getHost() + 'doctor/personalDetails' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    professionalDetails() {
        const data = {
            'roleid': this.authService.getRoleId(),
            'platform': 'web',
            'doctorid': this.authService.getDoctorId(),
            'userid': this.authService.getUserId()
        };
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*',  'Accesstoken': token})
        };
        const url = this.configurationService.getHost() + 'doctor/professionalDetails' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getBookingStatus() {
        const data = {
            'roleid': this.authService.getRoleId(),
            'platform': 'web',
            'doctorid': this.authService.getDoctorId(),
            'userid': this.authService.getUserId()
        };

        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accesstoken': token})
        };
        const url = this.configurationService.getHost() + 'walkin/bookingListCount' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getQualifications(data) {
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*',  'Accesstoken': token})
        };
        const url = this.configurationService.getHost() + 'common/qualificationList' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getSpeciality() {
        const data = {
            'doctorid': this.authService.getDoctorId(),
            'platform': 'web',
            'roleid': this.authService.getRoleId(),
            'userid': this.authService.getUserId()
        };
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*',  'Accesstoken': token})
        };
        const url = this.configurationService.getHost() + 'common/specialityList' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getRegistrationType() {
        const data = {
            'doctorid': this.authService.getDoctorId(),
            'platform': 'web',
            'roleid': this.authService.getRoleId(),
            'userid': this.authService.getUserId()
        };
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*',  'Accesstoken': token})
        };
        const url = this.configurationService.getHost() + 'common/registrationList' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
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
    getPolicyQuotation(data) {
        console.log(data, 'ssssssssssss');
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHost() + 'quote/lists' ;
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
