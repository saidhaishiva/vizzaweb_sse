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
        const url = this.configurationService.getHost() + 'personalaccident_religare/proposal_creation';
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
         const url = this.configurationService.getHost() + 'personalaccident_religare/get_occupationcode';
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
        const url = this.configurationService.getHost() + 'personalaccident_religare/get_occupationname';
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
        const url = this.configurationService.getHost() + 'personalaccident_religare/proposalquestions';
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
        const url = this.configurationService.getHost() + 'personal_accident/lists';
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
        const url = this.configurationService.getHost() + 'personal_accident/update_familygroup_suminsured' ;
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
        const url = this.configurationService.getHost() + 'personal_accident/suminsured_amount' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    // download pdf

    getDownloadPdfReligarepa(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHost() + 'personalaccident_religare/get_religare_pa_policypdf';
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
        const url = this.configurationService.getHost() + 'quote/get_religare_pincodes';
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
        const url = this.configurationService.getHost() + 'quote/get_area' ;
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
        const url = this.configurationService.getHost() + 'quote/get_city' ;
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
        const url = this.configurationService.getHost() + 'quote/get_occupationcode';
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
        const url = this.configurationService.getHost() + 'quote/get_religare_occupationcode';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getOccupationCodeList(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHost() + 'personal_accident/occupationlist';
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
        const url = this.configurationService.getHost() + 'personalaccident_apollomunich/get_occupation_code';
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
        const url = this.configurationService.getHost() + 'personalaccident_apollomunich/get_proffession';
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
        const url = this.configurationService.getHost() + 'personalaccident_religare/get_relationof_proposer';
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
            const url = this.configurationService.getHost() + 'personal_accident/compare_shkeyfeatures' ;
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
        const url = this.configurationService.getHost() + 'personal_accident/view_keyfeatures' ;
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
        const url = this.configurationService.getHost() + 'personalaccident_apollomunich/get_relationship';
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
        const url = this.configurationService.getHost() + 'personalaccident_apollomunich/get_id_proof';
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
        const url = this.configurationService.getHost() + 'personalaccident_apollomunich/get_material_status';
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
        const url = this.configurationService.getHost() + 'personalaccident_apollomunich/get_previous_insure';
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
        const url = this.configurationService.getHost() + 'personalaccident_apollomunich/get_state';
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
        const url = this.configurationService.getHost() + 'personalaccident_apollomunich/get_district';
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
        const url = this.configurationService.getHost() + 'personalaccident_apollomunich/get_city';
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
        const url = this.configurationService.getHost() + 'personalaccident_apollomunich/get_pincode';
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
        const url = this.configurationService.getHost() + 'personalaccident_apollomunich/create_proposal_details';
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
        const url = this.configurationService.getHost() + '';
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
        const url = this.configurationService.getHostPersonalaccident() + 'Personalaccident_hdfc/occupation_lists';
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
        const url = this.configurationService.getHostPersonalaccident() + 'Personalaccident_hdfc/checkValidPincode';
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
        const url = this.configurationService.getHostPersonalaccident() + 'Personalaccident_hdfc/cityeList';
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
        const url = this.configurationService.getHostPersonalaccident() + 'Personalaccident_hdfc/stateList';
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
        const url = this.configurationService.getHostPersonalaccident() + 'Personalaccident_hdfc/NomineeRelationshipList';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    // hdfc proposal creation

    getHdfcProposalCreation(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url =this.configurationService.getHostPersonalaccident() + 'Personalaccident_hdfc/create_proposal_details';
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
