import {AuthService} from './auth.service';
import {ConfigurationService} from './configuration.service';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable()
export class CommonService {
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

    // getPolicyQuotation(data) {
    //     console.log(data, 'ssssssssssss');
    //     const json = JSON.stringify(data);
    //     const token = this.authService.getAccessToken();
    //     const httpOptions = {
    //         headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    //     };
    //     const url = this.configurationService.getHost() + 'quote/lists' ;
    //     return this.http.post(url, json, httpOptions)
    //         .map(this.extractData)
    //         .catch(this.handleError);
    // }
// this function will get the sum insured amount lists
//     getSumInsuredAmount(data) {
//         const json = JSON.stringify(data);
//         const token = this.authService.getAccessToken();
//         const httpOptions = {
//             headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
//         };
//         const url = this.configurationService.getHost() + 'quote/suminsured_amount' ;
//         return this.http.post(url, json, httpOptions)
//             .map(this.extractData)
//             .catch(this.handleError);
//     }
    // // this function will get the travel-home sum insured amount lists
    // getTravelSumInsuredAmount(data) {
    //     console.log(data, 'ssssssssssss');
    //     const json = JSON.stringify(data);
    //     const token = this.authService.getAccessToken();
    //     const httpOptions = {
    //         headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    //     };
    //     const url = this.configurationService.getHost() + 'starhealthtravel/get_suminsured_details' ;
    //     return this.http.post(url, json, httpOptions)
    //         .map(this.extractData)
    //         .catch(this.handleError);
    // }

// this function will tab update the policy deatils
//     updateTabPolicyQuotation(data) {
//         console.log(data, 'ssssssssssss');
//         const json = JSON.stringify(data);
//         const token = this.authService.getAccessToken();
//         const httpOptions = {
//             headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
//         };
//         const url = this.configurationService.getHost() + 'quote/showquotelist_ontabchange' ;
//         return this.http.post(url, json, httpOptions)
//             .map(this.extractData)
//             .catch(this.handleError);
//     }
    // this function will update the base policy deatils
    // updatePolicyQuotation(data) {
    //     console.log(data, 'ssssssssssss');
    //     const json = JSON.stringify(data);
    //     const token = this.authService.getAccessToken();
    //     const httpOptions = {
    //         headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    //     };
    //     const url = this.configurationService.getHost() + 'quote/update_enqfamily_memberdetails' ;
    //     return this.http.post(url, json, httpOptions)
    //         .map(this.extractData)
    //         .catch(this.handleError);
    // }
    // this function will change the sum insured amount
    // changeAmountPolicyQuotation(data) {
    //     console.log(data, 'ssssssssssss');
    //     const json = JSON.stringify(data);
    //     const token = this.authService.getAccessToken();
    //     const httpOptions = {
    //         headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    //     };
    //     const url = this.configurationService.getHost() + 'quote/update_familygroup_suminsured' ;
    //     return this.http.post(url, json, httpOptions)
    //         .map(this.extractData)
    //         .catch(this.handleError);
    // }

    // this function will compare the product lists
    // addtoCompare(data) {
    //     console.log(data, 'ssssssssssss');
    //     const json = JSON.stringify(data);
    //     const token = this.authService.getAccessToken();
    //     const httpOptions = {
    //         headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    //     };
    //     const url = this.configurationService.getHost() + 'quote/compare_shkeyfeatures' ;
    //     return this.http.post(url, json, httpOptions)
    //         .map(this.extractData)
    //         .catch(this.handleError);
    // }
    // this function will add the short lists
    // addShortList(data) {
    //     console.log(data, 'ssssssssssss');
    //     const json = JSON.stringify(data);
    //     const token = this.authService.getAccessToken();
    //     const httpOptions = {
    //         headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    //     };
    //     const url = this.configurationService.getHost() + 'quote/add_prodshortlist' ;
    //     return this.http.post(url, json, httpOptions)
    //         .map(this.extractData)
    //         .catch(this.handleError);
    // }
    // this function will remove the short lists
    // removeShortList(data) {
    //     console.log(data, 'ssssssssssss');
    //     const json = JSON.stringify(data);
    //     const token = this.authService.getAccessToken();
    //     const httpOptions = {
    //         headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    //     };
    //     const url = this.configurationService.getHost() + 'quote/remove_prodshortlist' ;
    //     return this.http.post(url, json, httpOptions)
    //         .map(this.extractData)
    //         .catch(this.handleError);
    // }
    // this function will get the key feature lists
    // viewKeyFeatureList(data) {
    //     console.log(data, 'ssssssssssss');
    //     const json = JSON.stringify(data);
    //     const token = this.authService.getAccessToken();
    //     const httpOptions = {
    //         headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    //     };
    //     const url = this.configurationService.getHost() + 'starheathproduct/view_keyfeatures' ;
    //     return this.http.post(url, json, httpOptions)
    //         .map(this.extractData)
    //         .catch(this.handleError);
    // }
    // this function will get the short lists
    // getShortLists(data) {
    //     console.log(data, 'ssssssssssss');
    //     const json = JSON.stringify(data);
    //     const token = this.authService.getAccessToken();
    //     const httpOptions = {
    //         headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    //     };
    //     const url = this.configurationService.getHost() + 'quote/get_enq_shortlistedproduct' ;
    //     return this.http.post(url, json, httpOptions)
    //         .map(this.extractData)
    //         .catch(this.handleError);
    // }

    setFixAppointment(data) {
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHealth() + 'healthproduct/enquiry_furtherassistance' ;
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
        const url = this.configurationService.getHostPos() + 'common/webupload' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }

    fileUploadCareer(data) {
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
    getReferral(data) {
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostPos() + 'action/get_referralcode_details' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getPosProfile(data) {
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accesstoken': token})
        };
        const url = this.configurationService.getHostPos() + 'action/viewprofile' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getDmProfile(data) {
        const json = JSON.stringify(data);
        const token = this.authService.getDmAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accesstoken': token})
        };
        const url = this.configurationService.getHostDm() + 'distancemanager/viewprofile' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }

    // get the training details
    getTrainingDetails(data) {
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accesstoken': token})
        };
        const url = this.configurationService.getHostPos() + 'action/get_pos_training_attended_details' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    // get the exam details
    getExamDetails(data) {
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accesstoken': token})
        };
        const url = this.configurationService.getHostPos() + 'posquestion/get_pos_exam_attended_details' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    // get the dm training details
    getDmTrainingDetails(data) {
        const json = JSON.stringify(data);
        const token = this.authService.getDmAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accesstoken': token})
        };
        const url = this.configurationService.getHostDm() + 'distancemanager/get_dm_training_attended_details' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    // get the dm exam details
    getDmExamDetails(data) {
        const json = JSON.stringify(data);
        const token = this.authService.getDmAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accesstoken': token})
        };
        const url = this.configurationService.getHostDm() + 'distancemanager/get_dm_exam_attended_details' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    updatePosProfile(data) {
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accesstoken': token})
        };
        const url = this.configurationService.getHostPos() + 'action/register' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    updateDmProfile(data) {
        const json = JSON.stringify(data);
        const token = this.authService.getDmAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accesstoken': token})
        };
        const url = this.configurationService.getHostDm() + 'distancemanager/register' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    updateDocDetails(data) {
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accesstoken': token})
        };
        const url = this.configurationService.getHostPos() + 'action/update_pos_doccuments' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    updateDmDocDetails(data) {
        const json = JSON.stringify(data);
        const token = this.authService.getDmAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accesstoken': token})
        };
        const url = this.configurationService.getHostDm() + 'distancemanager/update_dm_doccuments' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    updatePassword(data) {
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accesstoken': token})
        };
        const url = this.configurationService.getHostPos() + 'action/change_password' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    updateDmPassword(data) {
        const json = JSON.stringify(data);
        const token = this.authService.getDmAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accesstoken': token})
        };
        const url = this.configurationService.getHostDm() + 'distancemanager/change_password' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
// Get city list
//     getPostal(data) {
//         const json = JSON.stringify(data);
//         const token = this.authService.getAccessToken();
//         const httpOptions = {
//             headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
//         };
//         const url = this.configurationService.getHost() + 'quote/get_city' ;
//         return this.http.post(url, json, httpOptions)
//             .map(this.extractData)
//             .catch(this.handleError);
//     }
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
//     getArea(data) {
//         const json = JSON.stringify(data);
//         const token = this.authService.getAccessToken();
//         const httpOptions = {
//             headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
//         };
//         const url = this.configurationService.getHost() + 'quote/get_area' ;
//         return this.http.post(url, json, httpOptions)
//             .map(this.extractData)
//             .catch(this.handleError);
//     }

    // Get testimonial list
    getTestimonialList(data) {
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHome() + 'testemonial/list_testemonials' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
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
    // getPincode(data) {
    //     console.log(data, 'ssssssssssss');
    //     const json = JSON.stringify(data);
    //     const token = this.authService.getAccessToken();
    //     const httpOptions = {
    //         headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    //     };
    //     const url = this.configurationService.getHost() + 'common/checkpincode';
    //     return this.http.post(url, json, httpOptions)
    //         .map(this.extractData)
    //         .catch(this.handleError);
    // }
    //referral code
    getReferralCode(data){
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostPos() + 'action/get_referralcode_details';
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }

    // add testimonial
    addTestimonial(data) {
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHome() + 'testemonial/add' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    // career update
    careerupdate(data) {
        console.log(data, 'ssssssssssss');
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHome() + 'careers/job_apply' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    jobDescription(data) {
        console.log(data, 'ssssssssssss');
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHome() + 'careers/select_job_profile' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    //policy
    // mediaCenter(data) {
    //     console.log(data, 'ssssssssssss');
    //     const json = JSON.stringify(data);
    //     const token = this.authService.getAccessToken();
    //     const httpOptions = {
    //         headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    //     };
    //     const url = this.configurationService.getHost() + 'policyrenewal/ListMedia' ;
    //     return this.http.post(url, json, httpOptions)
    //         .map(this.extractData)
    //         .catch(this.handleError);
    // }

    // Home page renewal-reminder
    policyRenewalRemainder(data) {
        console.log(data, 'ssssssssssss');
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHome() + 'policyrenewal/create_policy_renewal_details' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    // Home page Renew Exixting Policy
    policyRenewExixting(data) {
        console.log(data, 'ssssssssssss');
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHome() + 'policyrenewal/add_renew_existing' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    // Home page Claim Assistance
    claimAssistanceHome(data) {
        console.log(data, 'ssssssssssss');
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHome() + 'policyrenewal/add_claim_assistance' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }

    fileUploadPolicyHome(data) {
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostHome() + 'policyrenewal/policy_renewal_upload_details' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
// bajaj gold surushka
    getUpdateDetails(data) {
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getmiscproduct() + 'bajaj/create_enquiry' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }

    // edelweisspos homepage
    suminsuredlist(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'productlist/sumAssured' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    premiumlist(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'productlist/premiumTerm' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    policylist(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'productlist/policyTerm' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }

    // edelweisspos premiumpage
    edelweissenquiry(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'productlist/enquiry' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    // edelweisspos premium
    getComapnyList(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'productlist/company' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getProductList(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'productlist/index' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    changetermlist(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'productlist/change_term' ;
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }


    //edelweiss-term-life
    geteTitle(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'edelweiss/title';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    geteGender(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'edelweiss/gender';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    geteMaritalStatus(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'edelweiss/maritalStatus';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    geteInvesting(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'edelweiss/investing';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    bdutyListEdelweiss(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'edelweiss/duty';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    alcoholDetailsEdelweiss(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'edelweiss/alcohol';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    tobaccoDetailEdelweiss(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'edelweiss/tobacco';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getePremiumTerm(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'edelweiss/premiumTerm';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getePolicyTerm(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'edelweiss/policyTerm';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    geteFrequency(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'edelweiss/frequency';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    geteStaff(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'edelweiss/staff';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    geteAgeProof(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'edelweiss/ageProof';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    geteIdProof(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'edelweiss/idProof';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    geteAddressProof(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'edelweiss/addressProof';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    geteQualification(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'edelweiss/qualification';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getepolicyStatus(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'edelweiss/policyStatus';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    geteacceptanceTerm(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'edelweiss/acceptanceTerm';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }

    geteState(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'edelweiss/state';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    ifscEdelweissDetails(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getHostTerm() + 'bajaj/ifsc_code';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    geteemploymentType(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'edelweiss/employmentType';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    geteDuty(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'edelweiss/duty';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    geteHeightFeet(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'edelweiss/heightFeet';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    geteHeightInches(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'edelweiss/heightInches';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    geteHealthStaus(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'edelweiss/healthStaus';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getepayoutMonthOption(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'edelweiss/payoutMonths';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    WeightCdedelweiss(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'edelweiss/changeInWeight';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    geteChangedWeightCds(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'edelweiss/changeInWeightReason';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getePolicyCategory(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'edelweiss/policyCategory';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }

    getepolicyOption(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'edelweiss/policyOption';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getepayoutOption(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'edelweiss/payoutOption';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    geteNomineeRelation(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'edelweiss/nomineeRelationship';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    geteInsuranceRepository(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'edelweiss/insuranceRepository';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    getTopUpRate(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'edelweiss/topUpRate';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    edelweissposProposalCreation(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'edelweiss/bigeneration';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    // document upload Edelweiss
    edelweissDocumentProof(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'edelweiss/otherDoc';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    edelweissIncomeProof(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'edelweiss/incomeProof';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    edelweissProposalProof(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'edelweiss/proposalForm';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    edelweissAddressProof(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'edelweiss/addressProofDoc';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    edelweissAgeProof(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'edelweiss/ageProofDoc';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    edelweissSalesReqProof(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'edelweiss/salesRequirementDoc';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    edelweissKYCProof(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'edelweiss/kycDoc';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    edelweissidDocProof(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'edelweiss/identityProofDoc';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    edelweissOtherDocProof(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'edelweiss/otherDoc';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    edelweissFileUpload(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'edelweiss/doc_upload';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    edelweissActivities(data) {
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'edelweiss/activities';
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }

    fileUploadEdelweiss(data) {
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'edelweiss/contentType';
        return this.http.post(url, json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    edelweissDownloadPdf(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'edelweiss/DocDownload';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
            .catch(this.handleError);
    }
    edelweissOtp(data) {
        const json = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getedelweisspos() + 'edelweiss/verify_otp';
        return this.http.post(url , json, httpOptions)
            .map(this.extractData )
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
