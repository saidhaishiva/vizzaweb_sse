import {AuthService} from './auth.service';
import {ConfigurationService} from './configuration.service';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';


@Injectable()
export class HealthService {

    constructor(private http: HttpClient, private configurationService: ConfigurationService, private authService: AuthService, public auth: AuthService ) {

    }
// health insurance home page
    // suminsured ammount in homepage
    getSumInsuredAmount(data) {
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'healthproduct/suminsured_amount';
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    // group details
    getPolicyQuotation(data) {
        console.log(data, 'ssssssssssss');
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'productlist/family_classification' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }





    // new policy lists
    // group details
    getFamilyLists(data) {
        console.log(data, 'ssssssssssss');
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'healthproduct/family_classification' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    // policy details
    getPolicyLists(data) {
        console.log(data, 'ssssssssssss');
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'healthproduct/productList' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }

    // end




// update familygroup suminsured
     changeAmountPolicyQuotation(data) {
        console.log(data, 'ssssssssssss');
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'productlist/update_familygroup_suminsured' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    // this function will tab update the policy deatils
    updateTabPolicyQuotation(data) {
        console.log(data, 'ssssssssssss');
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'productlist/showquotelist_ontabchange' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    // this function will update the base policy deatils
    updatePolicyQuotation(data) {
        console.log(data, 'ssssssssssss');
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'productlist/update_enqfamily_memberdetails' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    // this function will compare the product lists
    addtoCompare(data) {
        console.log(data, 'ssssssssssss');
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'productlist/compare_shkeyfeatures' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    // this function will add the short lists
    addShortList(data) {
        console.log(data, 'ssssssssssss');
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'productlist/add_prodshortlist' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    // this function will remove the short lists
    removeShortList(data) {
        console.log(data, 'ssssssssssss');
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'productlist/remove_prodshortlist' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    // this function will get the key feature lists
    viewKeyFeatureList(data) {
        console.log(data, 'ssssssssssss');
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'starheathproduct/view_keyfeatures' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    // this function will get the short lists
    getShortLists(data) {
        console.log(data, 'ssssssssssss');
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'productlist/get_enq_shortlistedproduct' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    // this function will get the Renewal lists
    policyRenewal(data) {
        console.log(data, 'ssssssssssss');
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'policyrenewal/create_policy_renewal_details' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    setFixAppointment(data) {
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'productlist/enquiry_furtherassistance' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    contactDetails(data) {
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHome() + 'contact/addContactDetails' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    fileUpload(data) {
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'common/webupload' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    fileUploadPolicy(data) {
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'policyrenewal/policy_renewal_upload_details' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    // starHealth
    // Get city list
    getPostal(data) {
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'starhealth/city' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getPincodeDetails(data) {
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'common/checkpincode' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
// Get Area list
    getArea(data) {
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'starhealth/area' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }

    // Get testimonial list
    // getTestimonialList(data) {
    //     const json = JSON.stringify(data);
    //     const token = this.authService.getAccessToken();
    //     const httpOptions = {
    //         headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    //     };
    //     const url = this.configurationService.getHost() + 'testemonial/list_testemonials' ;
    //     return this.http.post(url, json, httpOptions)
    //         .map(this.extractData)
    //         .catch(this.handleError);
    // }
    //Get company list
    getcompanyList(data) {
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'policyrenewal/get_insurance_company_details' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    //Get policy types
    policyTypes(data) {
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'policyrenewal/get_insure_policy_type_details' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    // pincode
    getPincode(data) {
        console.log(data, 'ssssssssssss');
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'common/checkpincode';
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    //referral code
    // getReferralCode(data){
    //     const json = JSON.stringify(data);
    //     const token = this.authService.getAccessToken();
    //     const httpOptions = {
    //         headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    //     };
    //     const url = this.configurationService.getHost() + 'pos/get_referralcode_details';
    //     return this.http.post(url, json, httpOptions)
    //         .map(this.extractData)
    //         .catch(this.handleError);
    // }

    // add testimonial
    // addTestimonial(data) {
    //     const json = JSON.stringify(data);
    //     const token = this.authService.getAccessToken();
    //     const httpOptions = {
    //         headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    //     };
    //     const url = this.configurationService.getHost() + 'testemonial/add' ;
    //     return this.http.post(url, json, httpOptions)
    //         .map(this.extractData)
    //         .catch(this.handleError);
    // }
    // career update
    // careerupdate(data) {
    //     console.log(data, 'ssssssssssss');
    //     const json = JSON.stringify(data);
    //     const token = this.authService.getAccessToken();
    //     const httpOptions = {
    //         headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    //     };
    //     const url = this.configurationService.getHost() + 'careers/job_apply' ;
    //     return this.http.post(url, json, httpOptions)
    //         .map(this.extractData)
    //         .catch(this.handleError);
    // }
    //policy
    mediaCenter(data) {
        console.log(data, 'ssssssssssss');
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'policyrenewal/ListMedia' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    // proposal creation
    //comapny list resolver
    companyDetails() {
        console.log('testyinnn');
        const data = {
            'platform': 'web',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0
        };
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'healthproduct/companyCode' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getProposal(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'starhealth/proposal';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getNomieRelationshipList(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'starhealth/nomineeRelationship';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getAppointeRelationshipList(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'starhealth/appointeeRelationship';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }

    getPolicyToken(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'starhealth/proposalToken';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
// religare health insurance
    // proposal creation
    getReligareProposal(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'religare/proposal';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }

    religarePayment(data, action) {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Origin': '*'})
        };
        const url = action;
        return this.http.post(url , data, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }

    getShortlistedProduct(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'productlist/get_enq_shortlistedproduct';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getQuestionList(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'productlist/get_proposalquestions';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getOccupationList(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'productlist/get_occupationcode';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }

    getOccupationCode(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'religare/occupation';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getOccupationClass(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'productlist/get_occupationcode';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }

    getReligareQuestions(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'religare/questions';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }


    getRelationshipList(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'productlist/get_relationshipcode';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getPurchaceStatus(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'starhealth/purchaseToken';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }

    getDownloadPdf(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'starhealth/policyDownload';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getDownloadPdfReligare(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'religare/policyDownload';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }


    getPostalReligare(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'religare/pincode';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }

    getReligareAddon(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'religare/addons';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    //Appollo-Munich
    getTitleCode(data){
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'apollomunich/get_tittle';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }  getIdProofList(data){
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'apollomunich/get_id_proof';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getAppolloQuestions(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'apollomunich/get_medicalQuestions';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getAppolloMaritalStatus(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'apollomunich/get_material_status';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getAppolloOccupation(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'apollomunich/get_occupation_code';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getAppolloPreviousInsure(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'apollomunich/get_previous_insure';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getAppolloProffession(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'apollomunich/get_proffession';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getAppolloRelationship(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'apollomunich/get_relationship';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getAppolloState(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'apollomunich/get_state';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getAppolloDistrict(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'apollomunich/get_district';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getAppolloCity(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'apollomunich/get_city';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }

    apollomunichProposal(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'apollomunich/proposal';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }

    apollomunichProffession(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'apollomunich/get_proffession';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }


    apollomunichPreviousInsure(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'apollomunich/get_previous_insure';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getApollomunichPincode(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'apollomunich/get_pincode';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    ///Reliance///
    getMaritalStatus(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'reliance/marital_status_list';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    relianceProposal(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'reliance/proposal';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }



    getRelianceOccupation(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'reliance/occupation_list';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }

    getRelianceNationality(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'reliance/nationality_list';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getRelatioshipProposerList(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'reliance/relatioship_proposer_list';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getNomineeRelatioshipList(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + '/reliance/nominee_relation_insured_list';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getServiceTax(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'reliance/service_tax_exemp_master_list';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getCheckpincode(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'reliance/get_pincode_details';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }


    getDiseaseList(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'reliance/pre_existing_disease_list';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getCoverType(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'reliance/cover_type_list';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getDownloadPdfReliance(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'reliance/schedule_policy_pdf';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }

    //HDFC Insurance Services
    getTitleLists(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'hdfc/tittleCodeList';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    mobileotp(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'hdfc/create_otp';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    checkotp(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'hdfc/check_otp';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    hdfcRelationshipList(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'hdfc/RelationShipList';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    hdfcNomineeRelationshipList(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'hdfc/NomineeRelationshipList';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    hdfcOccupationList(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'Personalaccident_hdfc/occupation_lists';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getHdfcCityLists(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'hdfc/cityeList';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getHdfcPincodeLists(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'hdfc/checkValidPincode';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getHdfcStateLists(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'hdfc/stateList';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    createHdfcHealthProposal(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'hdfc/proposal';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getDownloadPdfHdfc(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'hdfc/PolicyDownload';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }

    //Bajaj Services
    getbajajProposal(data) {
        console.log('bajajjjjjjjjjjj');
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'bajajalianz/proposal';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }

    getBajajOccupation(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'bajajalianz/get_occupationcode';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }

    getBajajRelationship(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'bajajalianz/get_relationshipcode';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }

    getDownloadPdfBajaj(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'bajajalianz/get_policypdf';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getCheckpincodeBajai(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'bajajalianz/get_bajaj_pincodedetails';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getZoneCode(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'bajajalianz/check_zone';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }

    // iffco tokyo
    relationshipListIffco(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'iffcotokio/get_relationship_details';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    occupationListIffco(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'iffcotokio/get_occupation_list';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    stateListIffco(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'iffcotokio/get_state_details';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    cityListIffco(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'iffcotokio/get_city_details';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    proposalcreationIffco(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'iffcotokio/proposal';
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
