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
        const url = this.configurationService.getHostPos() + 'pos/register' ;
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

    // // edelweiss pos
    // suminsuredlist(data) {
    //     const json = JSON.stringify(data);
    //     const token = this.authService.getAccessToken();
    //     const httpOptions = {
    //         headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    //     };
    //     const url = this.configurationService.getedelweisspos() + 'productlist/sumAssured' ;
    //     return this.http.post(url, json, httpOptions)
    //         .map(this.extractData)
    //         .catch(this.handleError);
    // }
    // edelweiss pos
    // premiumlist(data) {
    //     const json = JSON.stringify(data);
    //     const token = this.authService.getAccessToken();
    //     const httpOptions = {
    //         headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    //     };
    //     const url = this.configurationService.getedelweisspos() + 'productlist/premiumTerm' ;
    //     return this.http.post(url, json, httpOptions)
    //         .map(this.extractData)
    //         .catch(this.handleError);
    // }

    // // edelweiss pos
    // policylist(data) {
    //     const json = JSON.stringify(data);
    //     const token = this.authService.getAccessToken();
    //     const httpOptions = {
    //         headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    //     };
    //     const url = this.configurationService.getedelweisspos() + 'productlist/policyTerm' ;
    //     return this.http.post(url, json, httpOptions)
    //         .map(this.extractData)
    //         .catch(this.handleError);
    // }

    // // edelweiss pos
    // edelweissenquiry(data) {
    //     const json = JSON.stringify(data);
    //     const token = this.authService.getAccessToken();
    //     const httpOptions = {
    //         headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    //     };
    //     const url = this.configurationService.getedelweisspos() + 'productlist/enquiry' ;
    //     return this.http.post(url, json, httpOptions)
    //         .map(this.extractData)
    //         .catch(this.handleError);
    // }

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
