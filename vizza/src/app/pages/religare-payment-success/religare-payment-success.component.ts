import {Component, Inject, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {AppSettings} from '../../app.settings';
import {HealthService} from '../../shared/services/health.service';
import {ToastrService} from 'ngx-toastr';
import {Settings} from '../../app.settings.model';
import {CommonService} from '../../shared/services/common.service';


@Component({
  selector: 'app-religare-payment-success',
  templateUrl: './religare-payment-success.component.html',
  styleUrls: ['./religare-payment-success.component.scss']
})
export class ReligarePaymentSuccessComponent implements OnInit {
    public paymentStatus: any
    public currenturl: any
    public type: any
    public path: any
    public proposalId: any
    public remainingStatus: any
    public setArray: any
    public insuranceLists: any
    public getArray: any
    public finalData: any
    public selectedAmount: any
    public pincoce: any
    public allCompanyList: any
    public filterCompany: any
    public allGroupDetails: any
    public policyNo: any
    public policyStatus: any
    public settings: Settings;

    constructor(public config: ConfigurationService, public router: Router,public healthService: HealthService ,public proposalservice: HealthService, public route: ActivatedRoute, public appSettings: AppSettings, public toast: ToastrService, public auth: AuthService, public dialog: MatDialog) {
        this.settings = this.appSettings.settings;
        this.remainingStatus = false;
        this.route.params.forEach((params) => {
            this.paymentStatus = params.status;
            this.policyStatus = params.policyStatus;
            this.proposalId = params.proId;
            this.policyNo = params.policyNo;
        });
        let groupDetails = JSON.parse(sessionStorage.groupDetails);
        for(let i = 0; i < groupDetails.family_groups.length; i++) {
            if(groupDetails.family_groups[i].name == groupDetails.family_groups[sessionStorage.changedTabIndex].name){
                groupDetails.family_groups[i].status = 1;
            }
        }
        let status = groupDetails.family_groups.filter(data => data.status == 0);
        if(status.length > 0) {
            this.remainingStatus = true;
        }

  }
  ngOnInit() {
      if (sessionStorage.setFamilyDetails != undefined && sessionStorage.setFamilyDetails != '') {
          this.setArray = JSON.parse(sessionStorage.setFamilyDetails);
          for (let i = 0; i < this.setArray.length; i++) {
              this.setArray[i].auto = false;
              if (this.setArray[i].checked && this.setArray[i].age != '') {
                  this.setArray[i].error = '';
              }
          }
      }
      if (sessionStorage.policyLists != undefined && sessionStorage.policyLists != '') {
          this.insuranceLists = JSON.parse(sessionStorage.policyLists).value;
              let index = sessionStorage.changedTabIndex;
              for (let i = 0; i < this.setArray.length; i++) {
                  this.setArray[i].auto = false;
              }
              this.getArray = this.insuranceLists[index].family_members;
              for (let i = 0; i < this.setArray.length; i++) {
                  for (let j = 0; j < this.getArray.length; j++) {
                      if (this.setArray[i].name == this.getArray[j].type) {
                          this.setArray[i].auto = true;
                      }
                      if (this.setArray[i].checked && this.setArray[i].age != '') {
                          this.setArray[i].error = '';
                      }

                  }
              }
      }
      if (sessionStorage.setInsuredAmount != undefined && sessionStorage.setInsuredAmount != '') {
          this.selectedAmount = sessionStorage.setInsuredAmount;
      }
      if (sessionStorage.setPincode != undefined && sessionStorage.setPincode != '') {
          this.pincoce = sessionStorage.setPincode;
      }
  }

    DownloadPdf() {
        const data = {
            'mail_status': '1',
            'proposal_id' : this.proposalId,
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
        }
        this.settings.loadingSpinner = true;
        this.proposalservice.getDownloadPdfReligare(data).subscribe(
            (successData) => {
                this.downloadPdfSuccess(successData);
            },
            (error) => {
                this.downloadPdfFailure(error);
            }
        );

    }
    public downloadPdfSuccess(successData) {
        this.settings.loadingSpinner = false;
        console.log(successData.ResponseObject, 'ssssssssssssssssssssss');
        this.type = successData.ResponseObject.type;
        this.path = successData.ResponseObject.path;
        if (successData.IsSuccess == true) {
            console.log(this.type, 'ww22');

            this.currenturl = this.config.getimgUrl();
            if (this.type == 'pdf') {
                console.log(successData.ResponseObject, 'www333');
                window.open(this.currenturl + '/' +  this.path,'_blank');
            } else if (this.type === 'pdf') {
                console.log(successData.ResponseObject, 'www3444');
                window.open(this.currenturl + '/' +  this.path,'_blank');
            } else {
                this.downloadMessage();
            }
        } else {
            this.settings.loadingSpinner = false;
            this.toast.error(successData.ErrorObject);
        }

    }
    public downloadPdfFailure(error) {
        this.settings.loadingSpinner = false;
        console.log(error);
    }
    retry() {
        this.router.navigate(['/religare-health-proposal'  + '/' + true]);
    }
    pay() {
        sessionStorage.policyLists = JSON.stringify({index: 0, value: []});
        this.router.navigate(['/healthinsurance']);
    }




        //
        // for (let i = 0; i < allGroupDetails.length; i++) {
        //     let ststus = false;
        //     if(allGroupDetails[i].purchase_status == '0') {
        //         ststus = true;
        //     }
        //     if(ststus) {
        //         if(allGroupDetails[i].name == changedTabDetails.name) {
        //             allGroupDetails.splice(i, 1);
        //         }
        //     } else if(!ststus && allGroupDetails[i].purchase_status == '1') {
        //         allGroupDetails.splice(i, 1);
        //     }
        //
        // }
        // let groups = [];
        // for (let i = 0; i < allGroupDetails.length; i++) {
        //     if(allGroupDetails[i] != changedTabDetails.name) {
        //         groups.push(allGroupDetails[i].name);
        //     }
        // }
        //     console.log(groups, 'groups');
        // for (let i = 0; i < groups.length; i++) {
        //     let index = allGroupDetails.findIndex(item => item.name == groups[i]);
        //     console.log(index, 'indexindex');
        //     // if(allGroupDetails.indexOf(data.name == groups[i])) {
        //     //
        //     // }
        // }

            // changedTabDetails.indexOf(data.purchase_status == -1);

        // sessionStorage.policyLists = JSON.stringify({index: 0, value: allGroupDetails});
        // this.router.navigate(['/healthinsurance']);



    updateTabPolicy(value, index) {
        this.finalData = [];
        for (let i = 0; i < this.setArray.length; i++) {
            if (this.setArray[i].checked) {
                if (this.setArray[i].age == '') {
                    this.setArray[i].error = 'Required';
                } else {
                    this.setArray[i].error = '';
                    this.finalData.push({type: this.setArray[i].name, age: this.setArray[i].age });
                }
            }
        }
        for (let i = 0; i < this.setArray.length; i++) {
            this.setArray[i].auto = false;
        }
        const data = {
            'platform': 'web',
            'postalcode': this.pincoce,
            'sum_insured': this.selectedAmount,
            'family_details': this.finalData,
            'family_group_name': value.name,
            'enquiry_id': value.enquiry_id,
            'created_by': '0',
            'insurance_type' : '1',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0
        };
        this.settings.loadingSpinner = true;
        this.healthService.updateTabPolicyQuotation(data).subscribe(
            (successData) => {
                this.updateTabPolicyQuotationSuccess(successData, index, value.enquiry_id, value.name);
            },
            (error) => {
                this.updateTabPolicyQuotationFailure(error);
            }
        );
    }
    public updateTabPolicyQuotationSuccess(successData, index, enqId, name) {
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {
            this.insuranceLists = successData.ResponseObject;
            let changedTabDetails = JSON.parse(sessionStorage.changedTabDetails);
            for (let j = 0; j < this.insuranceLists.length; j++) {
                if (this.insuranceLists[j].name == changedTabDetails.name) {
                    this.insuranceLists.splice(j, 1);
                }
            }
            console.log(this.insuranceLists, 'this.insuranceListsthis.insuranceLists9099090999091121');
            this.allCompanyList = [];
            for (let i = 0; i < this.insuranceLists.length; i++) {
                for (let j = 0; j < this.insuranceLists[i].product_lists.length; j++) {
                    if(this.allCompanyList.indexOf(this.insuranceLists[i].product_lists[j].company_name) == -1) {
                        this.allCompanyList.push(this.insuranceLists[i].product_lists[j].company_name);
                    }
                    this.insuranceLists[index].product_lists[j].shortlist =  this.insuranceLists[index].product_lists[j].shortlist_status;
                    this.insuranceLists[index].product_lists[j].currentBtn =  this.insuranceLists[index].product_lists[j].shortlist_status;
                    if (this.insuranceLists[index].product_lists[j].indiv_shortlist_status == true) {
                        this.insuranceLists[index].product_lists[j].removebtn = this.insuranceLists[index].product_lists[j].indiv_shortlist_status;
                        this.insuranceLists[index].product_lists[j].currentBtn = false;
                    }

                    this.insuranceLists[index].product_lists[j].premium_amount_format = this.numberWithCommas(this.insuranceLists[index].product_lists[j].premium_amount);
                    this.insuranceLists[index].product_lists[j].suminsured_amount_format = this.numberWithCommas(this.insuranceLists[index].product_lists[j].suminsured_amount);
                }
            }
            for (let i = 0; i < this.setArray.length; i++) {
                this.setArray[i].auto = false;
            }
            this.getArray = this.insuranceLists[index].family_members;
            for (let i = 0; i < this.setArray.length; i++) {
                for (let j = 0; j < this.getArray.length; j++) {
                    if (this.setArray[i].name == this.getArray[j].type) {
                        this.setArray[i].auto = true;
                    }
                }
            }
            // }

            sessionStorage.policyLists = JSON.stringify({index: index, value: this.insuranceLists});
            sessionStorage.allGroupDetails = JSON.stringify(this.insuranceLists);
            sessionStorage.changedTabIndex = 0;
            this.router.navigate(['/healthinsurance']);

        } else {
            this.toast.error(successData.ErrorObject, 'Failed');
        }
    }

    public updateTabPolicyQuotationFailure(error) {
        this.settings.loadingSpinner = false;
    }
    public  numberWithCommas(x) {
        return x.toString().substring(0,x.toString().split('.')[0].length-3).replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + x.toString().substring(x.toString().split('.')[0].length-3);
    }




    downloadMessage() {
    const dialogRef = this.dialog.open(DownloadMessageReligare, {
        width: '400px',
        data: this.path

    });

    dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
    });
}


}
@Component({
    selector: 'downloadmessagereligare',
    template: `<div mat-dialog-content class="text-center">
        <label> {{data}} </label>
    </div>
    <div mat-dialog-actions style="justify-content: center">
        <button mat-raised-button color="primary" (click)="onNoClick()">Ok</button>
    </div>`,
})
export class DownloadMessageReligare {

    constructor(
        public dialogRef: MatDialogRef<DownloadMessageReligare>,
        @Inject(MAT_DIALOG_DATA) public data: any) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

}

