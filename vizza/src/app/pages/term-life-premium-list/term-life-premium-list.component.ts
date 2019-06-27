import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {TermLifeCommonService} from '../../shared/services/term-life-common.service';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {Settings} from '../../app.settings.model';
import {AppSettings} from '../../app.settings';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {PosstatusAlertTravel} from '../travel-premium-list/travel-premium-list.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {ValidationService} from '../../shared/services/validation.service';
import {Subject} from 'rxjs';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-term-life-premium-list',
  templateUrl: './term-life-premium-list.component.html',
  styleUrls: ['./term-life-premium-list.component.scss']
})
export class TermLifePremiumListComponent implements OnInit {
    public settings: Settings;
    allCompanyList: any;
    filterCompany: any;
    webhost: any;
    productListArray: any;
    allProductLists: any;
    setAllProductLists: any;
    getEnquiryDetials: any;
    compareArray: any;
    selectedAmountTravel: any;
    enquiryFromDetials: any;
    checkAllStatus: boolean;
    public keyUp = new Subject<string>();
  constructor(public auth: AuthService, public datepipe: DatePipe, public dialog : MatDialog, public appSettings: AppSettings, public router: Router, public life: TermLifeCommonService, public config: ConfigurationService, public validation: ValidationService) {
      this.settings = this.appSettings.settings;
      this.settings.HomeSidenavUserBlock = false;
      this.settings.sidenavIsOpened = false;
      this.settings.sidenavIsPinned = false;
      this.webhost = this.config.getimgUrl();
      this.compareArray = [];
      this.selectedAmountTravel = '5000000';
      sessionStorage.selectedAmountTravel = this.selectedAmountTravel;
      this.enquiryFromDetials = JSON.parse(sessionStorage.enquiryFromDetials);
      // once user typing stoped after calling function
      const observable = this.keyUp
          .map(value => event)
          .debounceTime(100)
          .distinctUntilChanged()
          .flatMap((search) => {
              return Observable.of(search).delay(100);
          })
          .subscribe((data) => {
              console.log(data, 'data');
              this.updateSumInsured();
          });
  }
  ngOnInit() {
      this.getCompanyList();
      this.sessionData();
  }
    sessionData() {
        if(sessionStorage.getEnquiryDetials != '' && sessionStorage.getEnquiryDetials !=undefined) {
          this.getEnquiryDetials  = JSON.parse(sessionStorage.getEnquiryDetials);
        }
        if(sessionStorage.setAllProductLists != '' && sessionStorage.setAllProductLists !=undefined) {
            this.setAllProductLists  = JSON.parse(sessionStorage.setAllProductLists);
        }
        if(sessionStorage.allProductLists != '' && sessionStorage.allProductLists !=undefined) {
            this.allProductLists  = JSON.parse(sessionStorage.allProductLists);
        }
        if(sessionStorage.selectedAmountTravel != '' && sessionStorage.selectedAmountTravel !=undefined) {
            this.selectedAmountTravel  = sessionStorage.selectedAmountTravel;
        }
        if (sessionStorage.filterCompany != undefined && sessionStorage.filterCompany != '') {
            this.filterCompany = JSON.parse(sessionStorage.filterCompany);
            if(this.filterCompany.includes('All')) {
                this.checkAllStatus = true;
            } else {
                this.checkAllStatus = false;
            }
        }

    }
    // Number validation
    numberValidate(event: any) {
        this.validation.numberValidate(event);
    }
    getCompanyList() {
    const data = {
        'platform': 'web',
        'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
        'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
        'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0
    };
    this.life.getComapnyList(data).subscribe(
        (successData) => {
            this.companyListSuccess(successData);
        },
        (error) => {
            this.companyListFailure(error);
        });
  }
  public companyListSuccess(successData) {
      console.log(successData.ResponseObject);
      if (successData.IsSuccess) {
          this.allCompanyList = successData.ResponseObject;
          let all = ['All'];
          for (let i = 0; i < this.allCompanyList.length; i++) {
              all.push(this.allCompanyList[i].company_name)
          }
          this.filterCompany = all;
          console.log(sessionStorage.allProductLists, 'ppp');
          if (sessionStorage.allProductLists == undefined || sessionStorage.allProductLists == '') {
              console.log('inn');
              this.getProductList(this.allCompanyList, '5000000');
          }

      }
  }
  public companyListFailure(error) {
      console.log(error);
  }

    public getProductList(companyList, sum_assured): void {
        this.productListArray = [];
        this.allProductLists = [];
        let sum_amount = '';
        const data = {
            'platform': 'web',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'policy_id': this.getEnquiryDetials.policy_id,
            'sum_assured': sum_assured,
            'company_id': ''
        };
        this.settings.loadingSpinner = true;
        this.life.getProductList(data,companyList).subscribe(
            (successData) => {
                this.getProductListSuccess(successData);
            },
            (error) => {
                this.getProductListFailure(error);
            }
        );
    }
    public getProductListSuccess(successData) {
        this.settings.loadingSpinner = false;
        console.log(successData, 'successData');
        if (successData) {
            for(let i = 0; i < successData.length; i++) {
                if (successData[i].IsSuccess) {
                    let policylists = successData[i].ResponseObject;
                    this.productListArray.push(policylists.productlist);
                }
                this.allProductLists = [].concat.apply([], this.productListArray);
            }
            console.log(this.allProductLists, 'all');
            for (let i = 0; i < this.allProductLists.length; i++) {
                this.allProductLists[i].compare = false;
                this.allProductLists[i].shortlist = false;
                let dob = this.datepipe.transform(this.allProductLists[i].dob, 'y-MM-dd');
                this.allProductLists[i].age = this.ageCalculate(dob);
                // this.allProductLists[i].premium_amount_format = this.numberWithCommas(this.allProductLists[i].total_premium);
                //this.allProductLists[i].suminsured_amount_format = this.numberWithCommas(this.allProductLists[i].sum_insured_amount);
            }
            this.setAllProductLists = this.allProductLists;
            sessionStorage.setAllProductLists = JSON.stringify(this.allProductLists);
            sessionStorage.allProductLists = JSON.stringify(this.allProductLists);
            // if(this.allProductLists.length > 0) {
            //     this.enquiryDetails.sum_insured_amount = this.allProductLists[0].sum_insured_amount;
            // }
        }
    }
    public getProductListFailure(error) {
        this.settings.loadingSpinner = false;
        console.log(error, 'error');
    }
    ageCalculate(dob) {
        let today = new Date();
        let birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        let dd = today.getDate()- birthDate.getDate();
        if( m < 0 || m == 0 && today.getDate() < birthDate.getDate()){
            age = age-1;
        }
        return age;
    }
    updateSumInsured(){
        sessionStorage.selectedAmountTravel = this.selectedAmountTravel;
        this.getProductList(this.allCompanyList, this.selectedAmountTravel);

    }
    // filter by product
    filterByProducts() {
        if(this.filterCompany.includes('All')){
            this.checkAllStatus = true;
            this.allProductLists = this.setAllProductLists;
            let all = ['All'];
            for (let i = 0; i < this.allCompanyList.length; i++) {
                all.push(this.allCompanyList[i].company_name);
            }
            this.filterCompany = all;
        }
        else if(!this.filterCompany.includes('All') && this.filterCompany.length == this.allCompanyList.length){
            console.log('sec');
            this.checkAllStatus = false;
            this.allProductLists = [];
            this.filterCompany = [];
        }
        else if(!this.filterCompany.includes('All') && this.filterCompany.length > 0){
            console.log('third');
            this.checkAllStatus = false;
            let cmpy = [];
            for (let k = 0; k < this.filterCompany.length; k++) {
                for (let j = 0; j < this.setAllProductLists.length; j++) {
                    if (this.filterCompany[k] == this.setAllProductLists[j].company_name) {
                        cmpy.push(this.setAllProductLists[j]);
                    }
                }
            }
            this.allProductLists = cmpy;
        } else if(this.filterCompany.length == 0){
            console.log('frth');
            this.checkAllStatus = false;
            this.allProductLists = [];
            this.filterCompany = [];
        }
        sessionStorage.filterCompany = JSON.stringify(this.filterCompany);
        sessionStorage.allProductLists = JSON.stringify(this.allProductLists);

    }

    buyProduct(value) {
        console.log(value, 'vlitss');
        sessionStorage.lifePremiumList = JSON.stringify(value);
        if ((this.auth.getPosStatus() == '0' || this.auth.getPosStatus() == 0) && (this.auth.getPosRoleId() =='3' && this.auth.getPosRoleId() ==3)) {

            let dialogRef = this.dialog.open(PosstatusAlertTravel, {
                width: '700px',
            });
            dialogRef.disableClose = true;
            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    let paymentModeValid = true;
                    if(value.payment_mode == 'yearly' && parseInt(value.totalpremium) < 5000) {
                        paymentModeValid = false;
                    }
                    if(value.payment_mode == 'quarterly' && parseInt(value.totalpremium) < 1300) {
                        paymentModeValid = false;
                    }
                    if(value.payment_mode == 'halfyearly' && parseInt(value.totalpremium) < 2550) {
                        paymentModeValid = false;
                    }
                    if(value.payment_mode == 'monthly' && parseInt(value.totalpremium) < 450) {
                        paymentModeValid = false;
                    }

                    if(paymentModeValid) {
                        if (value.product_id <= 81 && value.product_id >=78) {
                            this.router.navigate(['/life-bajaj-proposal'  + '/' + false]);
                        } else if (value.product_id == 87 ) {
                            this.router.navigate(['/aegon-term-life'  + '/' + false]);
                        }
                    } else {
                        let dialogRef = this.dialog.open(PaymentModeValidate, {
                            width: '700px',
                        });
                        dialogRef.disableClose = true;
                        dialogRef.afterClosed().subscribe(result => {
                        });
                    }

                }
            });
        }  else {
            let paymentModeValid = true;
            if(value.payment_mode == 'yearly' && parseInt(value.totalpremium) < 5000) {
                paymentModeValid = false;
            }
            if(value.payment_mode == 'quarterly' && parseInt(value.totalpremium) < 1300) {
                paymentModeValid = false;
            }
            if(value.payment_mode == 'halfyearly' && parseInt(value.totalpremium) < 2550 ) {
                paymentModeValid = false;
            }
            if(value.payment_mode == 'monthly' && parseInt(value.totalpremium) < 450) {
                paymentModeValid = false;
            }

            if(paymentModeValid) {
                if (value.product_id <= 81 && value.product_id >=78) {
                    this.router.navigate(['/life-bajaj-proposal'  + '/' + false]);
                } else if (value.product_id <= 87 && value.product_id >=86) {
                    this.router.navigate(['/aegon-term-life'  + '/' + false]);
                }
            } else {
                let dialogRef = this.dialog.open(PaymentModeValidate, {
                    width: '700px',
                });
                dialogRef.disableClose = true;
                dialogRef.afterClosed().subscribe(result => {
                });
            }


        }
    }
}

@Component({
    selector: 'paymentmodevalidate',
    template: `
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-12">
                    <p> Minimum Premium for Bajaj Allianz Term Life is as follows, Kindly change Sum Insured or Payment Mode to purchase a policy.</p>
                    <table class="table table-bordered">
                        <thead class="thead-light">
                        <tr>
                            <th scope="col">Monthly</th>
                            <th scope="col">Quarterly</th>
                            <th scope="col">Half-Yearly</th>
                            <th scope="col">Yearly</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Rs. 450</td>
                            <td> Rs. 1300</td>
                            <td> Rs. 2550</td>
                            <td>Rs. 5000</td>
                        </tr>
                        </tbody>
                    </table>
                    
<!--                    Monthly - Rs. 450-->
<!--                    Quarterly - Rs. 1300-->
<!--                    Half-Yearly - Rs. 2550-->
<!--                    Yearly - Rs. 5000</p>-->
                </div>
            </div>
        </div>
        <div mat-dialog-actions style="justify-content: center">
<!--            <button mat-button class="secondary-bg-color" (click)="onClick(false)" >Cancel</button>-->
             <button mat-button class="secondary-bg-color" (click)="onClick(true)" >Ok</button>

        </div>
    `
})
export class PaymentModeValidate {
    constructor(
        public dialogRef: MatDialogRef<PaymentModeValidate>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }
    onClick(result) {
        this.dialogRef.close(result);
    }
}
