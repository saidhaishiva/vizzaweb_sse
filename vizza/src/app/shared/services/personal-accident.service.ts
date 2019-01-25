import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {ConfigurationService} from './configuration.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
@Injectable()
export class PersonalAccidentService {

  constructor(private http: HttpClient, private configurationService: ConfigurationService, private authService: AuthService) { }
// presonal accident
    getPersonalAccidentReligareProposal(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostPa() + 'religare/proposal_creation';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    // personal acciddent occupation code

       getPersonalOccupationCode(data) {
         const json = JSON.stringify(data);
         const httpOptions = {
             headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
         const url = this.configurationService.getHostPa() + 'religare/get_occupationcode';
         return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    // class description

    classOccupationCode(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostPa() + 'religare/get_occupationname';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }

    // Questions in personal accient

    persosnalAccidentReligareQuestions(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostPa() + 'religare/proposalquestions';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }

    // personal accident List

    personalAccident(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostPa() + 'productlist/lists';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    // update personal Accident

    updatePersonalAccident(data) {
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostPa() + 'productlist/update_familygroup_suminsured' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    // this function will get the personal accident sum insured lists
    getpersonalSumInsuredAmount(data) {
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostPa() + 'productlist/suminsured_amount' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    // relationship
    getRelationshipListreligare(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostPa() + 'religare/get_relationshipcode';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    // download pdf

    getDownloadPdfReligarepa(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostPa() + 'religare/get_religare_pa_policypdf';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    // pincode

    getPostalReligare(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostPa() + 'religare/get_religare_pincodes';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    // Get Area list

    getArea(data) {
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostPa() + 'religare/get_area' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }

// Get city list

    getPostal(data) {
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostPa() + 'religare/get_city' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    // Occupation List

    getOccupationList(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostPa() + 'religare/get_occupationcode';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
// occupation
    getOccupationCode(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostPa() + 'religare/get_religare_occupationcode';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getOccupationCodeList(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostPa() + 'productlist/occupationlist';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    //
    getAppolloOccupationCodeList(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostPa() + 'apollomunich/get_occupation_code';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    // Profession List
    getProfessionList(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostPa() + 'apollomunich/get_proffession';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
// RelationShip List
    getRelationshipList(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostPa() + 'religare/get_relationof_proposer';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    //   // this function will compare the product lists
        addtoCompare(data) {
            const json = JSON.stringify(data);
            const token = this.authService.getAccessToken();
            const httpOptions = {
                headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
            };
            const url = this.configurationService.getHostPa() + 'productlist/compare_shkeyfeatures' ;
            return this.http.post(url, json, httpOptions)
                .map(this.extractData)
                .catch(this.handleError);
        }
        // product Details Key features
    viewKeyFeatureList(data) {
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostPa() + 'productlist/view_keyfeatures' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
     // Appolo Munich Personal Accident
    // Relation with Proposer
    appolloRelationshipPa(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostPa() + 'apollomunich/get_relationship';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    // Id Proof
   paIdProofList(data){
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostPa() + 'apollomunich/get_id_proof';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    // Marital Status
   paMaritalStatus(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostPa() + 'apollomunich/get_material_status';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    // pre insure List
    preInsure(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostPa() + 'apollomunich/get_previous_insure';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    // State List in Appollo Munich List Personal Accident
   stateListPa(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostPa() + 'apollomunich/get_state';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    private extractData(res: Response) {
        const body = res;
        return body || {};
    }
// District List in Appollo Munich List Personal Accident
    districtPaList(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostPa() + 'apollomunich/get_district';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    // City List in Appollo Munich List Persoanl Accident
   cityPaList(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostPa() + 'apollomunich/get_city';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    // Pin validate
    pinPaList(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostPa() + 'apollomunich/get_pincode';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    // Appollo munich Proposal successs
    getPersonalAccidentAppolloProposal(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostPa() + 'apollomunich/create_proposal_details';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }

    // Download Pdf
    getAppolloPersonalAccidentDownloadPdf(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostPa() + '';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    // hdfc personal accident
    // occupation
    hdfcOccupationList(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostPa() + 'hdfc/occupation_lists';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    // pin code
    getHdfcPincodeLists(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostPa() + 'hdfc/checkValidPincode';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    // cityList
    getHdfcCityLists(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostPa() + 'hdfc/cityeList';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }

    // stateList
    getHdfcStateLists(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostPa() + 'hdfc/stateList';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    // nominee Relationship
    getHdfcNomineeRelationLists(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostPa() + 'hdfc/NomineeRelationshipList';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    // hdfc star-health-proposal creation

    getHdfcProposalCreation(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url =this.configurationService.getHostPa() + 'hdfc/create_proposal_details';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
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
