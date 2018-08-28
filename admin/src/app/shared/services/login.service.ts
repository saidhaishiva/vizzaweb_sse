import {AuthService} from './auth.service';
import {ConfigurationService} from './configuration.service';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class LoginService {

    constructor(private http: HttpClient, private configurationService: ConfigurationService, private authService: AuthService) {

    }

    logout() {
        const url = this.configurationService.getHost() + 'auth/logout';
        return this.http.get(url);
    }


    doLogin(data) {
        const json = JSON.stringify(data);
        console.log(json);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHost() + 'admin/login';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    RegisterPos(data) {
        const json = JSON.stringify(data);
        console.log(json);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accesstoken': token})
        };
        const url = this.configurationService.getHost() + 'admin/create_pos';
        return this.http.post(url , json, httpOptions)
        .map(this.extractData )
        .catch(this.handleError);
    }
    getVerifyAssistant(data){
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHost() + 'assistant/verifyAccount' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);

    }
    getResendRequest(data){
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHost() + 'assistant/resendRequest' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);

    }
    assisting(data) {
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accesstoken': token})
        };
        const url = this.configurationService.getHost() + 'assistant/assisting' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    // getFormUrlEncoded(toConvert) {
    //     const formBody = [];
    //     for (const property in toConvert) {
    //         const encodedKey = encodeURIComponent(property);
    //         const encodedValue = encodeURIComponent(toConvert[property]);
    //         formBody.push(encodedKey + '=' + encodedValue);
    //     }
    //     return formBody.join('&');
    // }

    doForgot(data) {
        console.log(data);
        const json = JSON.stringify(data);
        console.log(json);
        // const token = this.authService.getaccesstoken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
        };
        const url = this.configurationService.getHost() + 'admin/forgotPassword';
        return this.http.post(url , json, httpOptions)

            .map(this.extractData )
            .catch(this.handleError);

    }
    doConfirm(data) {
        console.log(data);
        const json = JSON.stringify(data);

        console.log(json);

        // const token = this.authService.getaccesstoken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
        };
        const url = this.configurationService.getHost() + 'admin/setNewPassword';
        return this.http.post(url , json, httpOptions)

            .map(this.extractData )
            .catch(this.handleError);

    }
    signupSelf(data) {
        const json = JSON.stringify(data);
        console.log(data, 'service');
        // const token = this.authService.getaccesstoken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
        };
        const url = this.configurationService.getHost() + 'admin/selfRegister';
        return this.http.post(url , json, httpOptions)
            // .map(this.extractData)
            .catch(this.handleError);
    }
    executiveCallback(data) {
        const json = JSON.stringify(data);
        console.log(data, 'service');
        // const token = this.authService.getaccesstoken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
        };
        const url = this.configurationService.getHost() + 'admin/executiveCallback';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    registerDoctor(data) {
        const json = JSON.stringify(data);
        console.log(data, 'inside service of confirm register');
        // const token = this.authService.getaccesstoken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHost() + 'admin/confirmRegister' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }

    generateOtp(data) {
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHost() + 'common/generateOtp' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }




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
