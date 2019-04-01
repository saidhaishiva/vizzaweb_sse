import {AuthService} from './auth.service';
import {ConfigurationService} from './configuration.service';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { ForkJoinObservable } from 'rxjs/observable/ForkJoinObservable';

@Injectable()
export class TermLifeCommonService {
    constructor(private http: HttpClient, private configurationService: ConfigurationService, private authService: AuthService) {
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

    productListEnquiry(data) {
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostTerm() + 'productlist/enquiry' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getComapnyList(data) {
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostTerm() + 'productlist/company' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getProductList(data,list) {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        let response: any;
        response = [];
        for (let i = 0; i < list.length; i++) {
            console.log('insideeee');
            const data = {
                'company_id': list[i].company_id
            };
            let  json = '';
            json = JSON.stringify(data);
            const url = this.configurationService.getHostTerm() + 'productlist/index' ;
            response.push(this.http.post(url, json, httpOptions));
        }
        console.log(response);
        return Observable.forkJoin(response);

        // const data = {
        //     'platform': 'web',
        //     'role_id': this.authService.getPosRoleId() ? this.authService.getPosRoleId() : 4,
        //     'policy_id': sessionStorage.term_policy_id,
        //     'company_id': 6
        // };
        // const data1 = {
        //     'platform': 'web',
        //     'role_id': this.authService.getPosRoleId() ? this.authService.getPosRoleId() : 4,
        //     'policy_id': sessionStorage.term_policy_id,
        //     'company_id': 6
        // };
        // const json = JSON.stringify(data);
        // const json1 = JSON.stringify(data1);
        // const url = this.configurationService.getHostTerm() + 'productlist/index' ;
        //
        //
        // return Observable.forkJoin(this.http.post(url, json, httpOptions), this.http.post(url, json1, httpOptions))

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
