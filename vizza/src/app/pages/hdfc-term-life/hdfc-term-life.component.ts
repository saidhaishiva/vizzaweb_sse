import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray, FormControl} from '@angular/forms';
import {HealthService} from '../../shared/services/health.service';
import { MatStepper } from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DatePipe } from '@angular/common';
import {AuthService} from '../../shared/services/auth.service';
import {HttpClient} from '@angular/common/http';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {Settings} from '../../app.settings.model';
import { AppSettings } from '../../app.settings';
import {CommonService} from '../../shared/services/common.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Pipe, PipeTransform, Inject, LOCALE_ID } from '@angular/core';
import {ValidationService} from '../../shared/services/validation.service';
import {ActivatedRoute} from '@angular/router';
import * as moment from 'moment';
import {TermLifeCommonService} from '../../shared/services/term-life-common.service';
import {Observable, Subject} from 'rxjs';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',

    monthYearA11yLabel: 'MM YYYY',
  },
};
@Component ({
  selector: 'app-hdfc-term-life',
  templateUrl: './hdfc-term-life.component.html',
  styleUrls: ['./hdfc-term-life.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})

export class HdfcTermLifeComponent implements OnInit {

  public personal: FormGroup;
  public nominee: FormGroup;
  public proposerAge: any;
  public nomineeAge: any;
  public dateError: any;
  public dateError1: any;
  public dateError2: any;
  public annualError: any;
  public sumError: any;
  public incomeError: any;
  public webhost: any;
  public today: any;
  public qualificationList: any;
  public summaryData: any;
  public appTypeHdfcList: any;
  public addressHdfcList: any;
  public alcoholHdfcList: any;
  public annuityOptionHdfcList: any;
  public annualPolicyHdfcList: any;
  public accountTypeHdfcList: any;
  public annualValueHdfcList: any;
  public assignmentTypeHdfcList: any;
  public relationAppointeeHdfcList: any;
  public appSourceHdfcList: any;
  public avocationHdfcList: any;
  public appModeHdfcList: any;
  public enquiryFormData: any;
  public lifePremiumList: any;
  public stateList: any;
  public premiumList: any;
  public getEnquiryDetials: any;
  public enquiryFromDetials: any;
  public allProductLists: any;

  public proposerFormData: any;
  public nomineeFormData: any;
  public stepper1: any;
  public personalData: any;
  public nomineeRelationship: any;
  public nomineeData: any;
  public appointeeAge: any;
  public response: any;
  public proposalList: any;
  public proposalId: any;
  public settings: Settings;
  public stepper2: any;
  public requestedUrl: any;
  public redirectUrl: any;
  public sum_insured_amount:any;
  public maritialList:any;
  public appointeeRelationList:any;
  public citycList:any;
  public citynList:any;
  public declaration: any;
  public inputReadonly: boolean;
  public apponiteeList: boolean;
  public sum_insure: any;
  public empTypeList: any;
  public premiumData: any;
  public annualData: any;
  public errorMsg: any;
  public errAnnual: any;
  public minDate: any;
  public sameComAddress: any;
  public disabledAddress: any;
  public disabledPerAddress: any;

  public keyUp = new Subject<string>();








  constructor(public validation: ValidationService, public authservice: AuthService ,public fb: FormBuilder,public route: ActivatedRoute,public TermLifeService: TermLifeCommonService,public datepipe: DatePipe, private toastr: ToastrService, public appSettings: AppSettings, public config: ConfigurationService) {
    let stepperindex = 0;
    this.requestedUrl = '';
    this.redirectUrl='';
    const minDate = new Date();
    this.minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
    this.route.params.forEach((params) => {
      if(params.stepper == true || params.stepper == 'true') {
        stepperindex = 2;
        if (sessionStorage.summaryData != '' && sessionStorage.summaryData != undefined) {
          this.summaryData = JSON.parse(sessionStorage.summaryData);
          this.redirectUrl = this.summaryData.redirectLink;
          this.requestedUrl = this.summaryData.bilink;
          this.proposerFormData = JSON.parse(sessionStorage.proposerFormData);
          this.nomineeFormData = JSON.parse(sessionStorage.nomineeFormData);
          this.proposalId = this.summaryData.ProposalId;
          sessionStorage.aegon_proposal_id = this.proposalId;
        }
      }
    });
    this.inputReadonly=false;
    this.disabledAddress = false;
    this.disabledPerAddress = false;

    this.apponiteeList = false;
    this.settings= this.appSettings.settings;

    this.webhost = this.config.getimgUrl();

    this.personal = this.fb.group({


    });
    this.nominee = this.fb.group({

    });
  }

  ngOnInit() {
    this.enquiryFormData = JSON.parse(sessionStorage.enquiryFormData);
    this.lifePremiumList = JSON.parse(sessionStorage.lifePremiumList);
    console.log(this.lifePremiumList, 'this.lifePremiumList')
    this.getEnquiryDetials = JSON.parse(sessionStorage.getEnquiryDetials);
    this.enquiryFromDetials = JSON.parse(sessionStorage.enquiryFromDetials);
    this.getAddressHdfc();
    this.appTypeHdfc();
    this.accountTypeHdfc();
    this.getAlcoholHdfc();
    this.getAnnualValueHdfc();
    this.getannuityOptionHdfc();
    this.getannualPolicyHdfc();
    this.getappModeHdfc();
    this.getassignmentTypeHdfc();
    this.getavocationHdfc();
    this.getrelationAppointeeHdfc();
    this.getappSourceHdfc();


  }

  // Dame validation
  nameValidate(event: any) {
    console.log(event.target.value.length);
    // if (event.code == 'Space') {
    //     if (event.target.value.length == 0) {
    //         event.preventDefault();
    //     }
    // } else {
    this.validation.nameValidate(event);
    // }
  }

  // Dob validation
  dobValidate(event: any) {
    this.validation.dobValidate(event);
  }

  // Number validation
  numberValidate(event: any) {
    this.validation.numberValidate(event);
  }

  // height weight validation
  heightValidate(event: any) {
    console.log(event.target.value.length);
    if (event.key == '0') {
      if (event.target.value.length == 0) {
        event.preventDefault();
      }
    } else {
      this.validation.numberValidate(event);
    }
  }

  idValidate(event) {
    this.validation.idValidate(event);

  }
  topScroll() {
    document.getElementById('main-content').scrollTop = 0;
  }




  addDate(event) {
    if (event.value != null) {
      let selectedDate = '';
      this.nomineeAge = '';
      let dob = '';
      if (typeof event.value._i == 'string') {
        const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
        if (pattern.test(event.value._i) && event.value._i.length == 10) {
          this.dateError1 = '';
        } else {
          this.dateError1 = 'Enter Valid Date';
        }
        selectedDate = event.value._i;
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (selectedDate.length == 10) {
          this.nomineeAge = this.ageCalculate(dob);
          console.log(this.nomineeAge, ' this.nomineeAg');

        }

      } else if (typeof event.value._i == 'object') {
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (dob.length == 10) {
          this.nomineeAge = this.ageCalculate(dob);
          console.log(this.nomineeAge,'age')

        }
        this.dateError1 = '';
      }
      sessionStorage.nomineeAge = this.nomineeAge;

    }
  }



  // AGE VALIDATION
  ageCalculate(dob) {
    console.log(dob,'dob');
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

  getAddressHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.addressHdfc(data).subscribe(
        (successData) => {
          this.addressHdfcListSuccess(successData);
        },
        (error) => {
          this.addressHdfcListFailure(error);
        }
    );
  }

  public addressHdfcListSuccess(successData) {
    if (successData.IsSuccess) {
      this.addressHdfcList = successData.ResponseObject;
    }
  }
  public addressHdfcListFailure(error) {
  }



appTypeHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.appTypeHdfc(data).subscribe(
        (successData) => {
          this.appTypeHdfcSuccess(successData);
        },
        (error) => {
          this.appTypeHdfcFailure(error);
        }
    );
  }

  public appTypeHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.appTypeHdfcList = successData.ResponseObject;
    }
  }
  public appTypeHdfcFailure(error) {
  }
  accountTypeHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.accountTypeHdfc(data).subscribe(
        (successData) => {
          this.accountTypeHdfcSuccess(successData);
        },
        (error) => {
          this.accountTypeHdfcFailure(error);
        }
    );
  }

  public accountTypeHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.accountTypeHdfcList = successData.ResponseObject;
    }
  }
  public accountTypeHdfcFailure(error) {
  }

  getAlcoholHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.alcoholHdfc(data).subscribe(
        (successData) => {
          this.alcoholHdfcSuccess(successData);
        },
        (error) => {
          this.alcoholHdfcFailure(error);
        }
    );
  }

  public alcoholHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.alcoholHdfcList = successData.ResponseObject;
    }
  }
  public alcoholHdfcFailure(error) {
  }

getAnnualValueHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.annualValueHdfc(data).subscribe(
        (successData) => {
          this.annualValueHdfcSuccess(successData);
        },
        (error) => {
          this.annualValueHdfcFailure(error);
        }
    );
  }

  public annualValueHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.annualValueHdfcList = successData.ResponseObject;
    }
  }
  public annualValueHdfcFailure(error) {
  }

getannuityOptionHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.annuityOptionHdfc(data).subscribe(
        (successData) => {
          this.annuityOptionHdfcSuccess(successData);
        },
        (error) => {
          this.annuityOptionHdfcFailure(error);
        }
    );
  }

  public annuityOptionHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.annuityOptionHdfcList = successData.ResponseObject;
    }
  }
  public annuityOptionHdfcFailure(error) {
  }
getannualPolicyHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.annualPolicyHdfc(data).subscribe(
        (successData) => {
          this.annualPolicyHdfcSuccess(successData);
        },
        (error) => {
          this.annualPolicyHdfcFailure(error);
        }
    );
  }

  public annualPolicyHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.annualPolicyHdfcList = successData.ResponseObject;
    }
  }
  public annualPolicyHdfcFailure(error) {
  }
getappModeHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.appModeHdfc(data).subscribe(
        (successData) => {
          this.appModeHdfcSuccess(successData);
        },
        (error) => {
          this.appModeHdfcFailure(error);
        }
    );
  }

  public appModeHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.appModeHdfcList = successData.ResponseObject;
    }
  }
  public appModeHdfcFailure(error) {
  }
getassignmentTypeHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.assignmentTypeHdfc(data).subscribe(
        (successData) => {
          this.assignmentTypeHdfcSuccess(successData);
        },
        (error) => {
          this.assignmentTypeHdfcFailure(error);
        }
    );
  }

  public assignmentTypeHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.assignmentTypeHdfcList = successData.ResponseObject;
    }
  }
  public assignmentTypeHdfcFailure(error) {
  }
getavocationHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.avocationHdfc(data).subscribe(
        (successData) => {
          this.avocationHdfcSuccess(successData);
        },
        (error) => {
          this.avocationHdfcFailure(error);
        }
    );
  }

  public avocationHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.avocationHdfcList = successData.ResponseObject;
    }
  }
  public avocationHdfcFailure(error) {
  }
getrelationAppointeeHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.relationAppointeeHdfc(data).subscribe(
        (successData) => {
          this.relationAppointeeHdfcSuccess(successData);
        },
        (error) => {
          this.relationAppointeeHdfcFailure(error);
        }
    );
  }

  public relationAppointeeHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.relationAppointeeHdfcList = successData.ResponseObject;
    }
  }
  public relationAppointeeHdfcFailure(error) {
  }
  getappSourceHdfc() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
    }
    this.TermLifeService.appSourceHdfc(data).subscribe(
        (successData) => {
          this.appSourceHdfcSuccess(successData);
        },
        (error) => {
          this.appSourceHdfcFailure(error);
        }
    );
  }

  public appSourceHdfcSuccess(successData) {
    if (successData.IsSuccess) {
      this.appSourceHdfcList = successData.ResponseObject;
    }
  }
  public appSourceHdfcFailure(error) {
   }
// getAlcoholHdfc() {
//     const data = {
//       'platform': 'web',
//       'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
//       'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
//       'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
//     }
//     this.TermLifeService.alcoholHdfc(data).subscribe(
//         (successData) => {
//           this.alcoholHdfcSuccess(successData);
//         },
//         (error) => {
//           this.alcoholHdfcFailure(error);
//         }
//     );
//   }
//
//   public alcoholHdfcSuccess(successData) {
//     if (successData.IsSuccess) {
//       this.alcoholHdfcList = successData.ResponseObject;
//     }
//   }
//   public alcoholHdfcFailure(error) {
//   }
// getAlcoholHdfc() {
//     const data = {
//       'platform': 'web',
//       'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
//       'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
//       'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
//     }
//     this.TermLifeService.alcoholHdfc(data).subscribe(
//         (successData) => {
//           this.alcoholHdfcSuccess(successData);
//         },
//         (error) => {
//           this.alcoholHdfcFailure(error);
//         }
//     );
//   }
//
//   public alcoholHdfcSuccess(successData) {
//     if (successData.IsSuccess) {
//       this.alcoholHdfcList = successData.ResponseObject;
//     }
//   }
//   public alcoholHdfcFailure(error) {
//   }
// getAlcoholHdfc() {
//     const data = {
//       'platform': 'web',
//       'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
//       'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
//       'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
//     }
//     this.TermLifeService.alcoholHdfc(data).subscribe(
//         (successData) => {
//           this.alcoholHdfcSuccess(successData);
//         },
//         (error) => {
//           this.alcoholHdfcFailure(error);
//         }
//     );
//   }
//
//   public alcoholHdfcSuccess(successData) {
//     if (successData.IsSuccess) {
//       this.alcoholHdfcList = successData.ResponseObject;
//     }
//   }
//   public alcoholHdfcFailure(error) {
//   }
// getAlcoholHdfc() {
//     const data = {
//       'platform': 'web',
//       'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
//       'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
//       'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
//     }
//     this.TermLifeService.alcoholHdfc(data).subscribe(
//         (successData) => {
//           this.alcoholHdfcSuccess(successData);
//         },
//         (error) => {
//           this.alcoholHdfcFailure(error);
//         }
//     );
//   }
//
//   public alcoholHdfcSuccess(successData) {
//     if (successData.IsSuccess) {
//       this.alcoholHdfcList = successData.ResponseObject;
//     }
//   }
//   public alcoholHdfcFailure(error) {
//   }
// getAlcoholHdfc() {
//     const data = {
//       'platform': 'web',
//       'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
//       'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
//       'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
//     }
//     this.TermLifeService.alcoholHdfc(data).subscribe(
//         (successData) => {
//           this.alcoholHdfcSuccess(successData);
//         },
//         (error) => {
//           this.alcoholHdfcFailure(error);
//         }
//     );
//   }
//
//   public alcoholHdfcSuccess(successData) {
//     if (successData.IsSuccess) {
//       this.alcoholHdfcList = successData.ResponseObject;
//     }
//   }
//   public alcoholHdfcFailure(error) {
//   }
// getAlcoholHdfc() {
//     const data = {
//       'platform': 'web',
//       'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
//       'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
//       'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
//     }
//     this.TermLifeService.alcoholHdfc(data).subscribe(
//         (successData) => {
//           this.alcoholHdfcSuccess(successData);
//         },
//         (error) => {
//           this.alcoholHdfcFailure(error);
//         }
//     );
//   }
//
//   public alcoholHdfcSuccess(successData) {
//     if (successData.IsSuccess) {
//       this.alcoholHdfcList = successData.ResponseObject;
//     }
//   }
//   public alcoholHdfcFailure(error) {
//   }
// getAlcoholHdfc() {
//     const data = {
//       'platform': 'web',
//       'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
//       'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
//       'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
//     }
//     this.TermLifeService.alcoholHdfc(data).subscribe(
//         (successData) => {
//           this.alcoholHdfcSuccess(successData);
//         },
//         (error) => {
//           this.alcoholHdfcFailure(error);
//         }
//     );
//   }
//
//   public alcoholHdfcSuccess(successData) {
//     if (successData.IsSuccess) {
//       this.alcoholHdfcList = successData.ResponseObject;
//     }
//   }
//   public alcoholHdfcFailure(error) {
//   }
// getAlcoholHdfc() {
//     const data = {
//       'platform': 'web',
//       'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
//       'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
//       'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
//     }
//     this.TermLifeService.alcoholHdfc(data).subscribe(
//         (successData) => {
//           this.alcoholHdfcSuccess(successData);
//         },
//         (error) => {
//           this.alcoholHdfcFailure(error);
//         }
//     );
//   }
//
//   public alcoholHdfcSuccess(successData) {
//     if (successData.IsSuccess) {
//       this.alcoholHdfcList = successData.ResponseObject;
//     }
//   }
//   public alcoholHdfcFailure(error) {
//   }
// getAlcoholHdfc() {
//     const data = {
//       'platform': 'web',
//       'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
//       'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
//       'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
//     }
//     this.TermLifeService.alcoholHdfc(data).subscribe(
//         (successData) => {
//           this.alcoholHdfcSuccess(successData);
//         },
//         (error) => {
//           this.alcoholHdfcFailure(error);
//         }
//     );
//   }
//
//   public alcoholHdfcSuccess(successData) {
//     if (successData.IsSuccess) {
//       this.alcoholHdfcList = successData.ResponseObject;
//     }
//   }
//   public alcoholHdfcFailure(error) {
//   }
// getAlcoholHdfc() {
//     const data = {
//       'platform': 'web',
//       'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
//       'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
//       'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
//     }
//     this.TermLifeService.alcoholHdfc(data).subscribe(
//         (successData) => {
//           this.alcoholHdfcSuccess(successData);
//         },
//         (error) => {
//           this.alcoholHdfcFailure(error);
//         }
//     );
//   }
//
//   public alcoholHdfcSuccess(successData) {
//     if (successData.IsSuccess) {
//       this.alcoholHdfcList = successData.ResponseObject;
//     }
//   }
//   public alcoholHdfcFailure(error) {
//   }
// getAlcoholHdfc() {
//     const data = {
//       'platform': 'web',
//       'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
//       'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
//       'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
//     }
//     this.TermLifeService.alcoholHdfc(data).subscribe(
//         (successData) => {
//           this.alcoholHdfcSuccess(successData);
//         },
//         (error) => {
//           this.alcoholHdfcFailure(error);
//         }
//     );
//   }
//
//   public alcoholHdfcSuccess(successData) {
//     if (successData.IsSuccess) {
//       this.alcoholHdfcList = successData.ResponseObject;
//     }
//   }
//   public alcoholHdfcFailure(error) {
//   }
// getAlcoholHdfc() {
//     const data = {
//       'platform': 'web',
//       'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
//       'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
//       'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
//     }
//     this.TermLifeService.alcoholHdfc(data).subscribe(
//         (successData) => {
//           this.alcoholHdfcSuccess(successData);
//         },
//         (error) => {
//           this.alcoholHdfcFailure(error);
//         }
//     );
//   }
//
//   public alcoholHdfcSuccess(successData) {
//     if (successData.IsSuccess) {
//       this.alcoholHdfcList = successData.ResponseObject;
//     }
//   }
//   public alcoholHdfcFailure(error) {
//   }
// getAlcoholHdfc() {
//     const data = {
//       'platform': 'web',
//       'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
//       'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
//       'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
//     }
//     this.TermLifeService.alcoholHdfc(data).subscribe(
//         (successData) => {
//           this.alcoholHdfcSuccess(successData);
//         },
//         (error) => {
//           this.alcoholHdfcFailure(error);
//         }
//     );
//   }
//
//   public alcoholHdfcSuccess(successData) {
//     if (successData.IsSuccess) {
//       this.alcoholHdfcList = successData.ResponseObject;
//     }
//   }
//   public alcoholHdfcFailure(error) {
//   }
// getAlcoholHdfc() {
//     const data = {
//       'platform': 'web',
//       'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
//       'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
//       'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
//     }
//     this.TermLifeService.alcoholHdfc(data).subscribe(
//         (successData) => {
//           this.alcoholHdfcSuccess(successData);
//         },
//         (error) => {
//           this.alcoholHdfcFailure(error);
//         }
//     );
//   }
//
//   public alcoholHdfcSuccess(successData) {
//     if (successData.IsSuccess) {
//       this.alcoholHdfcList = successData.ResponseObject;
//     }
//   }
//   public alcoholHdfcFailure(error) {
//   }
// getAlcoholHdfc() {
//     const data = {
//       'platform': 'web',
//       'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
//       'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
//       'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
//     }
//     this.TermLifeService.alcoholHdfc(data).subscribe(
//         (successData) => {
//           this.alcoholHdfcSuccess(successData);
//         },
//         (error) => {
//           this.alcoholHdfcFailure(error);
//         }
//     );
//   }
//
//   public alcoholHdfcSuccess(successData) {
//     if (successData.IsSuccess) {
//       this.alcoholHdfcList = successData.ResponseObject;
//     }
//   }
//   public alcoholHdfcFailure(error) {
//   }
// getAlcoholHdfc() {
//     const data = {
//       'platform': 'web',
//       'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
//       'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
//       'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
//     }
//     this.TermLifeService.alcoholHdfc(data).subscribe(
//         (successData) => {
//           this.alcoholHdfcSuccess(successData);
//         },
//         (error) => {
//           this.alcoholHdfcFailure(error);
//         }
//     );
//   }
//
//   public alcoholHdfcSuccess(successData) {
//     if (successData.IsSuccess) {
//       this.alcoholHdfcList = successData.ResponseObject;
//     }
//   }
//   public alcoholHdfcFailure(error) {
//   }
// getAlcoholHdfc() {
//     const data = {
//       'platform': 'web',
//       'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
//       'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
//       'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
//     }
//     this.TermLifeService.alcoholHdfc(data).subscribe(
//         (successData) => {
//           this.alcoholHdfcSuccess(successData);
//         },
//         (error) => {
//           this.alcoholHdfcFailure(error);
//         }
//     );
//   }
//
//   public alcoholHdfcSuccess(successData) {
//     if (successData.IsSuccess) {
//       this.alcoholHdfcList = successData.ResponseObject;
//     }
//   }
//   public alcoholHdfcFailure(error) {
//   }
// getAlcoholHdfc() {
//     const data = {
//       'platform': 'web',
//       'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
//       'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
//       'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
//     }
//     this.TermLifeService.alcoholHdfc(data).subscribe(
//         (successData) => {
//           this.alcoholHdfcSuccess(successData);
//         },
//         (error) => {
//           this.alcoholHdfcFailure(error);
//         }
//     );
//   }
//
//   public alcoholHdfcSuccess(successData) {
//     if (successData.IsSuccess) {
//       this.alcoholHdfcList = successData.ResponseObject;
//     }
//   }
//   public alcoholHdfcFailure(error) {
//   }


}
