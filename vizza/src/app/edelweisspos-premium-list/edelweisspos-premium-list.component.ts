import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {ConfigurationService} from '../shared/services/configuration.service';
import {Settings} from '../app.settings.model';
import {AppSettings} from '../app.settings';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {PosstatusAlertTravel} from '../pages/travel-premium-list/travel-premium-list.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {ValidationService} from '../shared/services/validation.service';
import {Subject} from 'rxjs';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonService} from '../shared/services/common.service';

@Component({
  selector: 'app-edelweisspos-premium-list',
  templateUrl: './edelweisspos-premium-list.component.html',
  styleUrls: ['./edelweisspos-premium-list.component.scss']
})
export class EdelweissposPremiumListComponent implements OnInit {
  public settings: Settings;
  allCompanyList: any;
  webhost: any;
  public form: FormGroup;
  allProductLists: any;
  setAllProductLists: any;
  getEnquiryDetials: any;
  compareArray: any;
  selectedAmountTravel: any;
  enquiryFromDetials: any;
  lifePremiumList: any;
  selected: any;
  termListDetails: any;
  checkAllStatus: boolean;
  public suminsuredvalue: any;
  public getEnquiryid: any;

  constructor(public auth: AuthService, public fb: FormBuilder, public datepipe: DatePipe, public dialog: MatDialog, public appSettings: AppSettings, public router: Router, public commonService: CommonService, public config: ConfigurationService, public validation: ValidationService) {
    this.settings = this.appSettings.settings;
    this.settings.HomeSidenavUserBlock = false;
    this.settings.sidenavIsOpened = false;
    this.settings.sidenavIsPinned = false;
    this.webhost = this.config.getimgUrl();
    this.compareArray = [];
    sessionStorage.selectedAmountTravel = this.selectedAmountTravel;

    this.form = this.fb.group({
      termlists: ''
    });
  }

  ngOnInit() {
    this.getsuminsuredlist();
    this.getCompanyList();
    this.enquiryFromDetials = JSON.parse(sessionStorage.enquiryFromDetials);
    this.getEnquiryid = JSON.parse(sessionStorage.getEnquiryDetials);
  }

  getsuminsuredlist() {
    const data = {
      'platform': 'web',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
      'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
    };
    this.commonService.suminsuredlist(data).subscribe(
        (successData) => {
          this.suminsuredlistSuccess(successData);

        },
        (error) => {
          this.suminsuredlistFailure(error);
        });
  }

  public suminsuredlistSuccess(successData) {
    this.suminsuredvalue = successData.ResponseObject;
  }
  public suminsuredlistFailure(error) {
    console.log(error);
  }


  getCompanyList() {
    const data = {
      'platform': 'web',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
      'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
    };
    this.commonService.getComapnyList(data).subscribe(
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
      this.getProductList();
    }
  }

  public companyListFailure(error) {
    console.log(error);
  }

  public getProductList(): void {
    let sum_amount = '';
    const data = {
      'platform': 'web',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
      'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      'policy_id': this.getEnquiryid.enquiry_id,
      'sum_assured': this.enquiryFromDetials.sum_assured_id,
      'company_id': '14',
    };
    this.settings.loadingSpinner = true;
    this.commonService.getProductList(data).subscribe(
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
      sessionStorage.setAllProductLists = JSON.stringify(this.allProductLists);
      sessionStorage.allProductLists = JSON.stringify(this.allProductLists);
    }
    console.log(this.allProductLists, 'allllist');
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
    let dd = today.getDate() - birthDate.getDate();
    if (m < 0 || m == 0 && today.getDate() < birthDate.getDate()) {
      age = age - 1;
    }
    return age;
  }

  buyProduct(value) {
    // console.log(value, 'vlitss');
    // sessionStorage.lifePremiumList = JSON.stringify(value);
    // if ((this.auth.getPosStatus() == '0' || this.auth.getPosStatus() == 0) && (this.auth.getPosRoleId() =='3' && this.auth.getPosRoleId() ==3)) {
    //
    //   let dialogRef = this.dialog.open(PosstatusAlertTravel, {
    //     width: '700px',
    //   });
    //   dialogRef.disableClose = true;
    //   dialogRef.afterClosed().subscribe(result => {
    //     if (result) {
    //       let paymentModeValid = true;
    //       if(value.payment_mode == 'yearly' && parseInt(value.company_id) == 6 && parseInt(value.totalpremium) < 5000) {
    //         paymentModeValid = false;
    //       }
    //
    //       if(paymentModeValid) {
    //         if (value.product_id <= 81 && value.product_id >=78) {
    //           this.router.navigate(['/life-bajaj-proposal'  + '/' + false]);
    //         } else if (value.product_id == 87 ) {
    //           this.router.navigate(['/aegon-term-life'  + '/' + false]);
    //         } else if (value.product_id == 111 || value.product_id == 112 ) {
    //           this.router.navigate(['/edelweiss-term-life'  + '/' + false]);
    //         }
    //         else if (value.product_id <= 110 && value.product_id >=102  ) {
    //           this.router.navigate(['/hdfc-term-life'  + '/' + false]);
    //         }
    //       } else {
    //         let dialogRef = this.dialog.open(PaymentModeValidate, {
    //           width: '700px',
    //         });
    //         dialogRef.disableClose = true;
    //         dialogRef.afterClosed().subscribe(result => {
    //         });
    //       }
    //
    //     }
    //   });
    // }  else {
    //   let paymentModeValid = true;
    //   if(value.payment_mode == 'yearly' && parseInt(value.company_id) == 6 && parseInt(value.totalpremium) < 5000) {
    //     paymentModeValid = false;
    //   }
    //   if(value.payment_mode == 'quarterly' && parseInt(value.company_id) == 6 && parseInt(value.totalpremium) < 1300) {
    //     paymentModeValid = false;
    //   }
    //   if(value.payment_mode == 'halfyearly' && parseInt(value.company_id) == 6 && parseInt(value.totalpremium) < 2550 ) {
    //     paymentModeValid = false;
    //   }
    //   if(value.payment_mode == 'monthly' && parseInt(value.company_id) == 6 && parseInt(value.totalpremium) < 450) {
    //     paymentModeValid = false;
    //   }
    //
    //   if(paymentModeValid) {
    //     if (value.product_id <= 81 && value.product_id >=78) {
    //       this.router.navigate(['/life-bajaj-proposal'  + '/' + false]);
    //     } else if (value.product_id <= 87 && value.product_id >=86) {
    //       this.router.navigate(['/aegon-term-life'  + '/' + false]);
    //     } else if (value.product_id == 111 || value.product_id == 112) {
    //       this.router.navigate(['/edelweiss-term-life'  + '/' + false]);
    //     }else if (value.product_id <= 110 && value.product_id >=102  ) {
    //       this.router.navigate(['/hdfc-term-life'  + '/' + false]);
    //     }
    //   } else {
    //     let dialogRef = this.dialog.open(PaymentModeValidate, {
    //       width: '700px',
    //     });
    //     dialogRef.disableClose = true;
    //     dialogRef.afterClosed().subscribe(result => {
    //     });
    //   }
    //
    //
    // }
  }

  // lifeTermChange(plists, index){
  //   console.log(this.allProductLists, 'allProductListssssssss');
  //   console.log(plists, 'value');
  //   console.log(index, 'index');
  //   // console.log(this.termLists+'-'+index, 'termListstermLists');
  //   let benefit;
  //   let cover;
  //   let productname;
  //
  //   // this.termLists = plists.term[index];
  //   if(plists.company_id == '6'){
  //     cover = plists.cover;
  //   }
  //   if(plists.company_id == '9'){
  //     benefit = plists.benefit_option;
  //   }
  //   if(plists.company_id == '5'){
  //     productname = plists.productname;
  //   }
  //   const data = {
  //     'platform': 'web',
  //     'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
  //     'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
  //     'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
  //     'policy_id': this.getEnquiryDetials.policy_id,
  //     'sum_assured': this.selectedAmountTravel,
  //     'benefit_option': benefit ? benefit : '',//Aegon
  //     'company_id': plists.company_id,
  //     'term':  plists.termDetrails,
  //     'product_id': plists.product_id,
  //     'cover': cover ? cover: '',//Bajaj
  //     'hdfc': productname ? productname :''
  //   };
  //   console.log(data,'data');
  //   this.settings.loadingSpinner = true;
  //   this.commonService.getTermChangeList(data).subscribe(
  //       (successData) => {
  //         this.termChangeSuccess(successData,plists,index);
  //       },
  //       (error) => {
  //         this.termChangeFailure(error);
  //       });
// }
//   public termChangeSuccess(successData, plists, index){
//     if (successData.IsSuccess == true) {
//       this.settings.loadingSpinner = false;
//       this.termListDetails = successData.ResponseObject;
//       this.allProductLists[index].totalpremium =  this.termListDetails.totalpremium;
//       this.allProductLists[index].CoverageAge =  this.termListDetails.CoverageAge;
//
//       console.log(this.allProductLists, 'allProductLists');
//     }
//     console.log(plists, 'plists');
//
//   }
//
//   public termChangeFailure(error){
//
//   }
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
