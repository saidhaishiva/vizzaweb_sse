import {AuthService} from './auth.service';
import {ConfigurationService} from './configuration.service';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';


@Injectable()
export class ProposalService {

    constructor(private http: HttpClient, private configurationService: ConfigurationService, private authService: AuthService) {

    }


    getProposal(data) {
        const json = JSON.stringify(data);
        console.log(json);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHost() + 'quote/create_proposal';
        console.log(url);
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }

    getReligareProposal(data) {
        const json = JSON.stringify(data);
        console.log(json);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHost() + 'quote/create_proposal_religare';
        console.log(url);
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
// presonal accident
    getPersonalAccidentReligareProposal(data) {
        const json = JSON.stringify(data);
        console.log(json);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHost() + 'personalaccident_religare/proposal_creation';
        console.log(url);
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }

    getPolicyToken(data) {
        const json = JSON.stringify(data);
        console.log(json);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHost() + 'quote/get_policy_proposaltoken';
        console.log(url);
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    religarePayment(data, action) {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Origin': '*'})
        };
        const url = action;
        console.log(url);
        return this.http.post(url , data, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }

    getShortlistedProduct(data) {
        const json = JSON.stringify(data);
        console.log(json);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHost() + 'quote/get_enq_shortlistedproduct';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getQuestionList(data) {
        const json = JSON.stringify(data);
        console.log(json);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHost() + 'quote/get_proposalquestions';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getOccupationList(data) {
        const json = JSON.stringify(data);
        console.log(json);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHost() + 'quote/get_occupationcode';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }

    getOccupationCode(data) {
        const json = JSON.stringify(data);
        console.log(json);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHost() + 'quote/get_religare_occupationcode';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    // personal acciddent occupation code
    getPersonalOccupationCode(data) {
        const json = JSON.stringify(data);
        console.log(json);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHost() + 'personalaccident_religare/get_occupationcode';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    // class description
    classOccupationCode(data) {
        const json = JSON.stringify(data);
        console.log(json);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHost() + 'personalaccident_religare/get_occupationname';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getOccupationClass(data) {
        const json = JSON.stringify(data);
        console.log(json);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHost() + 'quote/get_occupationcode';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }

    getReligareQuestions(data) {
        const json = JSON.stringify(data);
        console.log(json);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHost() + 'quote/get_religare_questions';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    persosnalAccidentReligareQuestions(data) {
        const json = JSON.stringify(data);
        console.log(json);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHost() + 'personalaccident_religare/proposalquestions';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }

    getRelationshipList(data) {
        const json = JSON.stringify(data);
        console.log(json);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHost() + 'quote/get_relationshipcode';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getPurchaceStatus(data) {
        const json = JSON.stringify(data);
        console.log(json);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHost() + 'quote/get_policy_purchasetoken';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
// personal accident List
    personalAccident(data) {
        const json = JSON.stringify(data);
        console.log(json);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHost() + 'personal_accident/lists';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    // update personal Accident
    updatePersonalAccident(data) {
        console.log(data, 'ssssssssssss');
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHost() + 'personal_accident/update_familygroup_suminsured' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getDownloadPdf(data) {
        const json = JSON.stringify(data);
        console.log(json);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHost() + 'quote/get_policy_schedule';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getDownloadPdfReligare(data) {
        const json = JSON.stringify(data);
        console.log(json);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHost() + 'quote/get_religare_policypdf';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }

    getDownloadPdfReligarepa(data) {
        const json = JSON.stringify(data);
        console.log(json);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHost() + 'personalaccident_religare/get_religare_pa_policypdf';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getPostalReligare(data) {
        const json = JSON.stringify(data);
        console.log(json);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHost() + 'quote/get_religare_pincodes';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }

    //Appollo-Munich
    getIdProofList(data){
        const json = JSON.stringify(data);
        console.log(json);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHost() + 'apollomunich/get_id_proof';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getAppolloMaritalStatus(data) {
        const json = JSON.stringify(data);
        console.log(json);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHost() + 'apollomunich/get_material_status';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getAppolloOccupation(data) {
        const json = JSON.stringify(data);
        console.log(json);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHost() + 'apollomunich/get_occupation_code';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getAppolloPreviousInsure(data) {
        const json = JSON.stringify(data);
        console.log(json);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHost() + 'apollomunich/get_previous_insure';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getAppolloProffession(data) {
        const json = JSON.stringify(data);
        console.log(json);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHost() + 'apollomunich/get_proffession';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getAppolloRelationship(data) {
        const json = JSON.stringify(data);
        console.log(json);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHost() + 'apollomunich/get_relationship';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getAppolloState(data) {
        const json = JSON.stringify(data);
        console.log(json);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHost() + 'apollomunich/get_state';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getAppolloDistrict(data) {
        const json = JSON.stringify(data);
        console.log(json);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHost() + 'apollomunich/get_district';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getAppolloCity(data) {
        const json = JSON.stringify(data);
        console.log(json);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHost() + 'apollomunich/get_city';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }


    ///Reliance///
    getMaritalStatus(data) {
        const json = JSON.stringify(data);
        console.log(json);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHost() + 'reliance/marital_status_list';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    relianceProposal(data) {
        const json = JSON.stringify(data);
        console.log(json);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHost() + 'reliance/create_proposal_details';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }

    apollomunichProposal(data) {
        const json = JSON.stringify(data);
        console.log(json);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHost() + 'apollomunich/create_proposal_details';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }


    getRelianceOccupation(data) {
        const json = JSON.stringify(data);
        console.log(json);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHost() + 'reliance/occupation_list';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }

    getRelianceNationality(data) {
        const json = JSON.stringify(data);
        console.log(json);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHost() + 'reliance/nationality_list';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getRelatioshipProposerList(data) {
        const json = JSON.stringify(data);
        console.log(json);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHost() + 'reliance/relatioship_proposer_list';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getNomineeRelatioshipList(data) {
        const json = JSON.stringify(data);
        console.log(json);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHost() + 'reliance/nominee_relation_insured_list';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getServiceTax(data) {
        const json = JSON.stringify(data);
        console.log(json);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHost() + 'reliance/service_tax_exemp_master_list';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getCheckpincode(data) {
        const json = JSON.stringify(data);
        console.log(json);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHost() + 'reliance/get_pincode_details';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getDiseaseList(data) {
        const json = JSON.stringify(data);
        console.log(json);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHost() + 'reliance/pre_existing_disease_list';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getCoverType(data) {
        const json = JSON.stringify(data);
        console.log(json);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHost() + 'reliance/cover_type_list';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getDownloadPdfReliance(data) {
        const json = JSON.stringify(data);
        console.log(json);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHost() + 'reliance/schedule_policy_pdf';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
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
