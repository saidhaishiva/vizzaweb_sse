import { Injectable } from '@angular/core';
import {ConfigurationService} from './configuration.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class BranchService {

  constructor(private http: HttpClient, private configurationService: ConfigurationService, private auth: AuthService,
                    ) {}
    branchManagerList(data) {
        const json = JSON.stringify(data);
        const token = this.auth.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accesstoken': token})
        };
        const url = this.configurationService.getHost() + 'branchmanager/bm_list' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);

    }
    posManagerList(data) {
        const json = JSON.stringify(data);
        const token = this.auth.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accesstoken': token})
        };
        const url = this.configurationService.getHost() + 'admin/get_pos_manager_details_list' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);

    }
    testimonialList(data) {
        const json = JSON.stringify(data);
        const token = this.auth.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accesstoken': token})
        };
        const url = this.configurationService.getHost() + 'testemonial/list' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    addTestimonial(data) {
        const json = JSON.stringify(data);
        const token = this.auth.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accesstoken': token})
        };
        const url = this.configurationService.getHost() + 'testemonial/add' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    editTestimonial(data) {
        const json = JSON.stringify(data);
        const token = this.auth.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accesstoken': token})
        };
        const url = this.configurationService.getHost() + 'testemonial/update' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    statusupdate(data) {
        const json = JSON.stringify(data);
        const token = this.auth.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accesstoken': token})
        };
        const url = this.configurationService.getHost() + 'testemonial/update_status' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    fileUpload(data) {
        const json = JSON.stringify(data);
        const token = this.auth.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = 'http://13.127.24.123/vizza/api/index.php/pos/common/webupload';
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    addPosManager(data) {
        const json = JSON.stringify(data);
        const token = this.auth.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accesstoken': token})
        };
        const url = this.configurationService.getHost() + 'admin/pos_manager_details_add' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);

    }
    editPosManager(data) {
        const json = JSON.stringify(data);
        const token = this.auth.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accesstoken': token})
        };
        const url = this.configurationService.getHost() + 'admin/pos_manager_details_edit' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);

    }
    dmManagerList(data) {
        const json = JSON.stringify(data);
        const token = this.auth.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accesstoken': token})
        };
        const url = this.configurationService.getHost() + 'dm/dm_managerList' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);

    }
    mediaCenterList(data) {
        const json = JSON.stringify(data);
        const token = this.auth.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accesstoken': token})
        };
        const url = this.configurationService.getHost() + 'admin/ListMedia' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);

    }
    editCenter(data) {
        const json = JSON.stringify(data);
        const token = this.auth.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accesstoken': token})
        };
        const url = this.configurationService.getHost() + 'admin/UpdateMedia' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    // id
    updateCenter(data) {
        const json = JSON.stringify(data);
        const token = this.auth.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accesstoken': token})
        };
        const url = this.configurationService.getHost() + 'admin/EditMedia' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    deleteMedia(data) {
        const json = JSON.stringify(data);
        const token = this.auth.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accesstoken': token})
        };
        const url = this.configurationService.getHost() + 'admin/DeleteMedia' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);

    }
    addDmManager(data) {
        const json = JSON.stringify(data);
        const token = this.auth.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accesstoken': token})
        };
        const url = this.configurationService.getHost() + 'dm/dm_manager_add' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);

    }
    // edit dm manager
    editDmManager(data) {
        const json = JSON.stringify(data);
        const token = this.auth.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accesstoken': token})
        };
        const url = this.configurationService.getHost() + 'dm/dm_manager_edit' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);

    }
    branchList(data) {
        const json = JSON.stringify(data);
        const token = this.auth.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accesstoken': token})
        };
        const url = this.configurationService.getHost() + 'branch/brancheslist' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);

    }
    addbranchManagerList(data) {
        const json = JSON.stringify(data);
        const token = this.auth.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accesstoken': token})
        };
        const url = this.configurationService.getHost() + 'branchmanager/bm_add' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);

    }
    salesManagerList(data) {
        const json = JSON.stringify(data);
        const token = this.auth.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accesstoken': token})
        };
        const url = this.configurationService.getHost() + 'salesmanager/sm_list' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);

    }
    addsalesManagerList(data) {
        const json = JSON.stringify(data);
        const token = this.auth.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accesstoken': token})
        };
        const url = this.configurationService.getHost() + 'salesmanager/sm_add' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);

    }
    relationalManagerList(data) {
        const json = JSON.stringify(data);
        const token = this.auth.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accesstoken': token})
        };
        const url = this.configurationService.getHost() + 'relationshipmanager/rm_list' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);

    }
    addRelationlManagerList(data) {
        const json = JSON.stringify(data);
        const token = this.auth.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accesstoken': token})
        };
        const url = this.configurationService.getHost() + 'relationshipmanager/rm_add' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);

    }
    branchCoordinatorList(data) {
        const json = JSON.stringify(data);
        const token = this.auth.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accesstoken': token})
        };
        const url = this.configurationService.getHost() + 'branchcoordinator/bc_list' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);

    }
   addbranchCoordinatorList(data) {
        const json = JSON.stringify(data);
        const token = this.auth.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accesstoken': token})
        };
        const url = this.configurationService.getHost() + 'branchcoordinator/bc_add' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);

    }
    addbranch(data) {
        const json = JSON.stringify(data);
        const token = this.auth.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accesstoken': token})
        };
        const url = this.configurationService.getHost() + 'branch/add_branch' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);

    }
    editbranch(data) {
        const json = JSON.stringify(data);
        const token = this.auth.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accesstoken': token})
        };
        const url = this.configurationService.getHost() + 'branch/add_branch' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);

    }
    delete(data) {
        const json = JSON.stringify(data);
        const token = this.auth.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accesstoken': token})
        };
        const url = this.configurationService.getHost() + 'admin/pos_manager_details_delete' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);

    }

    dmDelete(data) {
        const json = JSON.stringify(data);
        const token = this.auth.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accesstoken': token})
        };
        const url = this.configurationService.getHost() + 'dm/dm_manager_delete' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);

    }
    // career List
    careerDetails(data) {
        const json = JSON.stringify(data);
        const token = this.auth.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accesstoken': token})
        };
        const url = this.configurationService.getHost() + 'careers/list' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);

    }
    getStatus(data) {
        const json = JSON.stringify(data);
        const token = this.auth.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accesstoken': token})
        };
        const url = this.configurationService.getHost() + 'careers/status' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);

    }
    updateStatus(data) {
        const json = JSON.stringify(data);
        const token = this.auth.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accesstoken': token})
        };
        const url = this.configurationService.getHost() + 'careers/update' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);

    }
    scheduleDetails(data) {
        const json = JSON.stringify(data);
        const token = this.auth.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accesstoken': token})
        };
        const url = this.configurationService.getHost() + 'careers/schedule' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    metaDetail(data) {
        const json = JSON.stringify(data);
        const token = this.auth.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accesstoken': token})
        };
        const url = this.configurationService.getHost() + 'meta/select' ;
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
