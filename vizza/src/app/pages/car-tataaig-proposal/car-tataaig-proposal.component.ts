import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidationService} from '../../shared/services/validation.service';
import {DatePipe} from '@angular/common';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatStepper} from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../shared/services/auth.service';
import {Settings} from '../../app.settings.model';
import {AppSettings} from '../../app.settings';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {FourWheelerService} from '../../shared/services/four-wheeler.service';
import { ActivatedRoute } from '@angular/router';
import {CommonService} from '../../shared/services/common.service';
import {TermLifeCommonService} from '../../shared/services/term-life-common.service';
import {WINDOW} from '@ng-toolkit/universal';
import {EdelweissOpt} from '../edelweiss-term-life/edelweiss-term-life.component';
import {BehaviorSubject} from 'rxjs';


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
export interface DialogData {
  name: string;
  animal:string;
}

@Component({
  selector: 'app-car-tataaig-proposal',
  templateUrl: './car-tataaig-proposal.component.html',
  styleUrls: ['./car-tataaig-proposal.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class CarTataaigProposalComponent implements OnInit {

  public proposer: FormGroup;
  public vehicle: FormGroup;
  public previouspolicy: FormGroup;
  public nominee: FormGroup;
  // public popup: FormGroup;
  public minDate: any;
  public maxdate: any;
  public proposerdateError: any;
  public automobdateError: any;
  public proposerPinList: any;
  public prepolicyPinList: any;
  public proposerGenderlist: any;
  // public preNamelist: any;
  public relationlist: any;
  public Quotelist: any;
  public banklist: any;
  public currentStep: any;
  public settings: Settings;
  public webhost: any;
  public summaryData: any;
  public Proposalnumber: any;
  public PaymentRedirect: any;
  public PaymentReturn: any;
  public proposerFormData: any;
  public vehicalFormData: any;
  public previousFormData: any;
  public nomineeFormData: any;
  public ProposalId: any;
  public poldate: any;
  public vehicledata: any;
  public buycarDetails: any;
  public enquiryFormData: any;
  public carEnquiryId: any;
  public declaration: any;
  public getstepper1: any;
  public getstepper2: any;
  public getstepper3: any;
  public getstepper4: any;
  public packagelist: any;
  public QConsumableExpenses: any;
  public QDepreciationReImb: any;
  public QEmergencytransport: any;
  public QKeyReplacement: any;
  public QLossPersonalIDV: any;
  public QRepairGlass: any;
  public QRoadsideAssistance: any;
  public QTyreSecure: any;
  public QReturnInvoice: any;
  public QEngineSecure: any;
  public quotationNo: any;
  public ElectricalAccessoriesAmt: any;
  public NonElectricalAccessoriesAmt: any;
  public AutomobileAssociationAmt: any;
  public AntitheftdeviceAmt: any;
  public TPPDAmt: any;
  public carProposerAge: any;
  public agecount: any;
  public premium: any;
  public visible: any;
  public config: any;
  public ispreviousPolicy: any;
  public newPackageList: any;
  // public ispreviousPolicy: any;
  public bankValid: boolean;
  public modelBoxList: boolean;
  public errorMsg: any;
  public errorNonMsg: any;
  public packagesslist: any;
  public packaageList: any;
  public finlist: any;
  photos = [];
  photosBuffer = [];
  bufferSize = 50;
  numberOfItemsFromEndBeforeFetchingMore = 10;
  loading = false;
  animal: string;
  name: string;


  constructor(@Inject(WINDOW) private window: Window,public fb: FormBuilder,public validation: ValidationService,public datepipe: DatePipe,public carinsurance: FourWheelerService, public dialog: MatDialog,public toastr: ToastrService,public authservice: AuthService,public appSettings: AppSettings,public configs: ConfigurationService,public route: ActivatedRoute,) {

    let stepperindex = 0;
    this.route.params.forEach((params) => {
      if (params.stepper == true || params.stepper == 'true') {
        stepperindex = 4;
        if (sessionStorage.summaryDatacartata != '' && sessionStorage.summaryDatacartata != undefined) {
          this.summaryData = JSON.parse(sessionStorage.summaryDatacartata);
          this.ProposalId = this.summaryData.ProposalId;
          this.PaymentRedirect = this.summaryData.PaymentRedirect;
          this.PaymentReturn = this.summaryData.PaymentReturn;
          this.proposerFormData = JSON.parse(sessionStorage.tatacarproposer);
          this.vehicalFormData = JSON.parse(sessionStorage.tatacarvehicle);
          this.previousFormData = JSON.parse(sessionStorage.tatacarprepolicy);
          this.nomineeFormData = JSON.parse(sessionStorage.tatacarnominee);
          this.ProposalId = sessionStorage.tatacarproposalID;


        }
      }
    });
    this.currentStep = stepperindex;
    this.settings = this.appSettings.settings;
    this.webhost = this.configs.getimgUrl();
    this.settings.HomeSidenavUserBlock = false;
    this.settings.sidenavIsOpened = false;
    this.settings.sidenavIsPinned = false;
    const miniDate = new Date();
    this.minDate = new Date(miniDate.getFullYear(), miniDate.getMonth(), miniDate.getDate());
    this.maxdate = this.minDate;
    this.bankValid = false;

    this.errorMsg = false;
    this.errorNonMsg = false;
    this.ispreviousPolicy = '';
    this.config = {
      displayKey: "bankName",
      search: true,
      limitTo: 10,
      // searchOnKey: 'city'
    };
    console.log(this.ispreviousPolicy,'ispreviousPolicy767878')

    this.proposer = this.fb.group({
      proposerTitle: ['', Validators.required],
      proposerFirstname: ['', Validators.required],
      proposerMidname: '',
      proposerLastname: ['', Validators.required],
      proposerGender: ['', Validators.compose([Validators.required])],
      proposerDob: ['', Validators.compose([Validators.required])],
      maritalStatus: ['', Validators.required],
      proposerMobile: ['', Validators.compose([Validators.pattern('[6789][0-9]{9}')])],
      proposerEmail: ['', Validators.compose([Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
      proposerAadhar: '',
      proposerAccount: '',
      Addressone: ['', Validators.required],
      Addresstwo: '',
      Addressthree: '',
      Addressfour: '',
      proposerPincode: ['', Validators.required],
      proposerState: ['', Validators.required],
      proposerDistrict: ['', Validators.required],
      proposerCity: ['', Validators.required],
      driveflag: '',
      driveFirstname: '',
      driveLastname: '',
      driveGender: '',
      driveAge: '',
      drivingexp: '',
      drivemaritalStatus: '',
    });

    this.previouspolicy = this.fb.group({
      // preflag: ['', Validators.required],
      // preName: ['', Validators.required],
      // preNamevalue: '',
      prepolno: '',
      preAddressone: ['', Validators.required],
      preAddresstwo: '',
      preAddressthree: '',
      prepincode: '',
      preState: '',
      preDistrict: '',
      preCity: '',

    });

    this.vehicle = this.fb.group({
      engine: ['', Validators.required],
      chassis: ['', Validators.required],
      Financetype: false,
      banktype: '',
      bankName: '',
      bankNamevalue: '',
      Address: '',
      package: ['', Validators.required],
      packagevalue: '',
      Depreciation: '',
      DepreciationAmount: '',
      Allowance: '',
      Invoice: '',
      personaloss: '',
      transport: '',
      keyReplacement: '',
      Enginesecure: '',
      Consumableexpence: '',
      Repairofglass: '',
      Tyresecure: '',
      protectioncover: '',
      Roadside: '',
      transportAmount: '',
      RepairglassAmount: '',
      personalossAmount: '',
      roadsideAmount: '',
      protectioncoverAmount: '',
      tyresecureAmount: '',
      consexpenceAmount: '',
      enginesecureAmount: '',
      keyReplacementAmount: '',
      invoiceAmount: '',
      electriAccess: '',
      electriAccessSI: '',
      electriAccessSIAmount: '',
      nonElectricAcess: '',
      nonElectricAcessSI: '',
      nonElectricAcessSIAmount: '',
      autoAsso: '',
      autoAssoAmount: '',
      antitheft: '',
      antitheftAmount: '',
      tppdRes: '',
      tppdResAmount: '',
      ispreviousPolicy:'',
    });



    this.nominee = this.fb.group({
      nomineeName: ['', Validators.required],
      nomineeAge: ['', Validators.required],
      nomineerelation: ['', Validators.required],
    })

    // this.popup = this.fb.group({
    //   ispreviousPolicy: '',
    //
    // })

  }

  ngOnInit() {
    this.visible = false;
    this.ispreviousPolicy='';
    this.getGenderlist();
    this.financiertype();
    // this.getNamelist();
    // this.getRelationList();
    // this.packageaddon();
    this.sessionData();
    this.vehicledata = JSON.parse(sessionStorage.vehicledetailsfw);
    console.log(this.vehicledata);
    this.buycarDetails = JSON.parse(sessionStorage.buyFourwheelerProductDetails);
    this.enquiryFormData = JSON.parse(sessionStorage.carListDetails);
    console.log(this.enquiryFormData, 'enquiry data');
    this.carEnquiryId = sessionStorage.fwEnquiryId;
    this.vehicle.controls['engine'].patchValue(this.vehicledata.engine_no);
    this.vehicle.controls['chassis'].patchValue(this.vehicledata.chassis_no);
    this.premium = sessionStorage.packageListFw;
    const poldate = new Date(this.vehicledata.previous_policy_expiry_date);
    console.log(poldate,'poldate');
    this.poldate = new Date(poldate.getFullYear(), poldate.getMonth(), poldate.getDate() + 1);
    console.log(this.poldate, 'policy date');
    console.log(this.ispreviousPolicy, 'ispreviousPolicy12234555');

    if (this.premium != 'Comprehensive_premium') {
    }
  }

  // changeflag(event: any) {
  //   if (this.previouspolicy.controls['preflag'].value == 'Y') {
  //     this.previouspolicy.controls['preName'].setValidators([Validators.required]);
  //     this.previouspolicy.controls['prepolno'].setValidators([Validators.required]);
  //   } else if (this.previouspolicy.controls['preflag'].value == 'N') {
  //     this.previouspolicy.controls['preName'].patchValue('');
  //     this.previouspolicy.controls['preName'].setValidators(null);
  //     this.previouspolicy.controls['prepolno'].setValidators(null);
  //   }
  //   this.previouspolicy.controls['preName'].updateValueAndValidity();
  //   this.previouspolicy.controls['prepolno'].updateValueAndValidity();
  // }

  nameValidate(event: any) {
    this.validation.nameValidate(event);
  }

  // Dob validation
  dobValidate(event: any) {
    this.validation.dobValidate(event);
  }

  // Number validation
  numberValidate(event: any) {
    this.validation.numberValidate(event);
  }

  // Number validation
  numValidate(event: any) {
    if (event.charCode !== 0) {
      const pattern = /[0-9]/;
      const inputChar = String.fromCharCode(event.charCode);
      if (!pattern.test(inputChar) || event.target.value.length >= 2) {
        event.preventDefault();
      }
    }
  }
  idValidate(event: any) {
    this.validation.idValidate(event);
  }

  // space
  space(event: any) {
    this.validation.space(event);
  }

  onpaste(event: any) {
      this.validation.paste(event);
  }

  firstname(event) {
    this.proposer.controls['driveFirstname'].patchValue(event.target.value);
  }

  lastname(event) {
    this.proposer.controls['driveLastname'].patchValue(event.target.value);
  }

  maritial() {
    this.proposer.controls['drivemaritalStatus'].patchValue(this.proposer.controls['maritalStatus'].value);
    const data = {
      'platform': 'web',
      'marital_status': this.proposer.controls['maritalStatus'].value == 'single' ? 'Y' : 'N',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    };
    this.carinsurance.RelationList(data).subscribe(
        (successData) => {
          this.nomineeRelationSuccess(successData);
        },
        (error) => {
          this.nomineeRelationFailure(error);
        }
    );
  }
  nomineeRelationSuccess(successData) {
    this.relationlist = successData.ResponseObject;
    sessionStorage.relation = JSON.stringify(this.relationlist);
  }

  nomineeRelationFailure(error) {

  }



  addEvent(event: any) {
    let selectedDate = '';
    this.carProposerAge = '';
    let dob = '';
    if (event.value != null) {
      if (typeof event.value._i == 'string') {
        const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
        if (pattern.test(event.value._i) && event.value._i.length == 10) {
          this.proposerdateError = '';
        } else {
          this.proposerdateError = 'Enter Valid Date';
        }
        selectedDate = event.value._i;
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (selectedDate.length == 10) {
          this.carProposerAge = this.ageCalculate(dob);
        }
      } else if (typeof event.value._i == 'object') {
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (dob.length == 10) {
          this.proposerdateError = '';
          this.carProposerAge = this.ageCalculate(dob);
        }
      }
      sessionStorage.carproposerAge = this.carProposerAge;
      this.proposer.controls['driveAge'].patchValue(sessionStorage.carproposerAge);

    }
  }

  // AGE VALIDATION
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


  //Proposer PincodeList
  getPostalCode(pin, type) {
    console.log(pin, type, 'pincode');
    const data = {
      'platform': 'web',
      'pincode': pin,
    };
    if (pin.length == 6) {
      this.carinsurance.PincodeList(data).subscribe(
          (successData) => {
            this.proposerpincodeListSuccess(successData, type);
          },
          (error) => {
            this.proposerpincodeListFailure(error);
          }
      );
    }
  }

  proposerpincodeListSuccess(successData, type) {
    if (successData.IsSuccess) {
      if (type == 'proposer') {
        this.proposerPinList = successData.ResponseObject;
        this.proposer.controls['proposerState'].patchValue(this.proposerPinList.text_state);
        this.proposer.controls['proposerDistrict'].patchValue(this.proposerPinList.text_city_district);
        this.proposer.controls['proposerCity'].patchValue(this.proposerPinList.text_pincode_locality);
      } else if (type == 'prepolicy') {
        this.prepolicyPinList = successData.ResponseObject;
        this.previouspolicy.controls['preState'].patchValue(this.prepolicyPinList.text_state);
        this.previouspolicy.controls['preDistrict'].patchValue(this.prepolicyPinList.text_city_district);
        this.previouspolicy.controls['preCity'].patchValue(this.prepolicyPinList.text_pincode_locality);
      }
    } else if (successData.IsSuccess != true) {
      this.toastr.error('Please Fill Valid Pincode');
      if (type == 'proposer') {
        this.proposer.controls['proposerState'].patchValue('');
        this.proposer.controls['proposerDistrict'].patchValue('');
        this.proposer.controls['proposerCity'].patchValue('');
      } else if (type == 'prepolicy') {
        this.previouspolicy.controls['preState'].patchValue('');
        this.previouspolicy.controls['preDistrict'].patchValue('');
        this.previouspolicy.controls['preCity'].patchValue('');
      }
    }
  }

  proposerpincodeListFailure(error) {

  }

  choosegen() {
    if(this.proposer.controls['proposerTitle'].value == 'Mr.') {
      this.proposer.controls['proposerGender'].patchValue('MALE');
      this.proposer.controls['driveGender'].patchValue('MALE')
    }else if(this.proposer.controls['proposerTitle'].value == 'Mrs.' || this.proposer.controls['proposerTitle'].value == 'Miss.' ) {
      this.proposer.controls['proposerGender'].patchValue('FEMALE');
      this.proposer.controls['driveGender'].patchValue('FEMALE')
    }
  }

//Proposer GenderList
  getGenderlist() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    };
    this.carinsurance.GenderList(data).subscribe(
        (successData) => {
          this.proposerGenderListSuccess(successData);
        },
        (error) => {
          this.proposerGenderListFailure(error);
        }
    );
  }

  proposerGenderListSuccess(successData) {
    this.proposerGenderlist = successData.ResponseObject;

  }

  proposerGenderListFailure(error) {

  }

  getPackagelist() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'package':this.vehicle.controls['package'].value
    };
    this.carinsurance.packagesList(data).subscribe(
        (successData) => {
          this.packaaageListSuccess(successData);
        },
        (error) => {
          this.packaaageListFailure(error);
        }
    );
  }

  packaaageListSuccess(successData) {
    this.packagesslist = successData.ResponseObject;
this.packaageList=this.packagesslist.content;
    // let bSubject = new BehaviorSubject(this.packaageList);
  // this.newPackageList = new BehaviorSubject<string>(this.packaageList);
    // cast = this. newPackageList.asObservable();

    // sessionStorage.packaageList = this.packaageList;
console.log(this.packaageList,'this.packaageList');
console.log( sessionStorage.packaageList,'this.packaageList');

  }

  packaaageListFailure(error) {

  }
  // //PreviousPolicy NameList
  // getNamelist() {
  //   const data = {
  //     'platform': 'web',
  //     'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
  //     'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
  //   };
  //   this.carinsurance.NameList(data).subscribe(
  //       (successData) => {
  //         this.prepolicyNameListSuccess(successData);
  //       },
  //       (error) => {
  //         this.prepolicyNameListFailure(error);
  //       }
  //   );
  // }
  //
  // prepolicyNameListSuccess(successData) {
  //   this.preNamelist = successData.ResponseObject;
  // }
  //
  // prepolicyNameListFailure(error) {
  //
  // }
  //
  // select() {
  //   this.previouspolicy.controls['preNamevalue'].patchValue(this.preNamelist[this.previouspolicy.controls['preName'].value]);
  // }
  // changepopup(){
  //     if(this.vehicle.controls['package'].value == '3' || this.vehicle.controls['package'].value == '4' || this.vehicle.controls['package'].value == '5' || this.vehicle.controls['package'].value == '6' || this.vehicle.controls['package'].value == '7'){
  //         this.modelBoxList = true
  //
  //         console.log(this.modelBoxList,'this.modelBox......');
  //     }else{
  //         this.modelBoxList = false
  //         console.log(this.modelBoxList,'this.modelBox111......');
  //     }
  // }


// Addons Package
    packageaddon() {
        const data = {

            'platform': 'web',
            'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
            'addons': this.ispreviousPolicy=''?'Y':this.ispreviousPolicy
        };
        console.log(data,'data.......');
        this.carinsurance.packagetype(data).subscribe(
            (successData) => {
                this.packageListSuccess(successData);
            },
            (error) => {
                this.packageListFailure(error);
            }
        );
    }

    packageListSuccess(successData) {
      if (successData.IsSuccess) {
        this.packagelist = successData.ResponseObject;
        if(this.vehicle.controls['package'].value == '3' || this.vehicle.controls['package'].value == '4' || this.vehicle.controls['package'].value == '5' || this.vehicle.controls['package'].value == '6' || this.vehicle.controls['package'].value == '7'){
          let dialogRef = this.dialog.open(tataigCarOpt, {
            width: '400px',
            data: {name: this.packaageList, animal: this.ispreviousPolicy}
          });
          console.log(name,'hjhjkjkjkkjjkdataaaaaa')
          console.log(this.ispreviousPolicy,'55555555555233');
          dialogRef.disableClose = true;
          dialogRef.afterClosed().subscribe(result => {
            if(result) {
              this.ispreviousPolicy = result;
              console.log(result,'23456787656789876');
              console.log(this.ispreviousPolicy,'23456787656789876');

              }

            console.log('The dialog was closed');
            // this.packageaddon()
          });
          // let dialogRef = this.dialog.open(tataigCarOpt, {
          //   width: '400px',
          //   data: {name: this.packaageList,ispreviousPolicy: this.ispreviousPolicy}
          //
          // });
          // console.log(name,'hjhjkjkjkkjjkdataaaaaa')
          // console.log(this.ispreviousPolicy,'55555555555233');
          // // console.log(this.data.prev,'55555555555233');
          // dialogRef.disableClose = true;
          // dialogRef.afterClosed().subscribe(result => {
          //   // if(result) {
          //   // this.ispreviousPolicy = result;
          //   //
          //   // }
          //
          //   // console.log(data.prev,'777777');
          //   console.log('The dialog was closed');
          //
          // });
        }
        this.toastr.error(successData.ErrorObject);

    } else {
      this.toastr.error(successData.ResponseObject.ErrorObject);
    }

    }

    packageListFailure(error) {

    }

  selectopt(event: any) {
    console.log(this.vehicle.controls['packagevalue'].value, 'alue');
    this.vehicle.controls['packagevalue'].patchValue(this.packagelist[this.vehicle.controls['package'].value]);
    if (this.vehicle.controls['package'].value == '1') {
      this.visible = true;
      this.vehicle.controls['Repairofglass'].patchValue(true);
      this.vehicle.controls['Depreciation'].patchValue('');
      this.vehicle.controls['Invoice'].patchValue('');
      this.vehicle.controls['personaloss'].patchValue('');
      this.vehicle.controls['transport'].patchValue('');
      this.vehicle.controls['keyReplacement'].patchValue('');
      this.vehicle.controls['Enginesecure'].patchValue('');
      this.vehicle.controls['Consumableexpence'].patchValue('');
      this.vehicle.controls['Tyresecure'].patchValue('');
      this.vehicle.controls['Roadside'].patchValue(true);
    }else if(this.vehicle.controls['package'].value == '2'){
      this.visible = true;
      this.vehicle.controls['personaloss'].patchValue(true);
      this.vehicle.controls['transport'].patchValue(true);
      this.vehicle.controls['keyReplacement'].patchValue(true);
      this.vehicle.controls['Repairofglass'].patchValue(true);
      this.vehicle.controls['Roadside'].patchValue(true);
      this.vehicle.controls['Depreciation'].patchValue('');
      this.vehicle.controls['Invoice'].patchValue('');
      this.vehicle.controls['Enginesecure'].patchValue('');
      this.vehicle.controls['Consumableexpence'].patchValue('');
      this.vehicle.controls['Tyresecure'].patchValue('');
    }else if(this.vehicle.controls['package'].value == '3') {
      this.visible = true;
      this.vehicle.controls['Depreciation'].patchValue(true);
      this.vehicle.controls['personaloss'].patchValue(true);
      this.vehicle.controls['transport'].patchValue(true);
      this.vehicle.controls['keyReplacement'].patchValue(true);
      this.vehicle.controls['Repairofglass'].patchValue(true);
      this.vehicle.controls['Roadside'].patchValue(true);
      this.vehicle.controls['Invoice'].patchValue('');
      this.vehicle.controls['Enginesecure'].patchValue('');
      this.vehicle.controls['Consumableexpence'].patchValue('');
      this.vehicle.controls['Tyresecure'].patchValue('');
    }else if(this.vehicle.controls['package'].value == '4') {
      this.visible = true;
      this.vehicle.controls['Depreciation'].patchValue(true);
      this.vehicle.controls['personaloss'].patchValue(true);
      this.vehicle.controls['transport'].patchValue(true);
      this.vehicle.controls['keyReplacement'].patchValue(true);
      this.vehicle.controls['Enginesecure'].patchValue(true);
      this.vehicle.controls['Consumableexpence'].patchValue(true);
      this.vehicle.controls['Repairofglass'].patchValue(true);
      this.vehicle.controls['Roadside'].patchValue(true);
      this.vehicle.controls['Invoice'].patchValue('');
      this.vehicle.controls['Tyresecure'].patchValue('');
    }else if(this.vehicle.controls['package'].value == '5') {
      this.visible = true;
      this.vehicle.controls['Depreciation'].patchValue(true);
      this.vehicle.controls['personaloss'].patchValue(true);
      this.vehicle.controls['transport'].patchValue(true);
      this.vehicle.controls['keyReplacement'].patchValue(true);
      this.vehicle.controls['Consumableexpence'].patchValue(true);
      this.vehicle.controls['Repairofglass'].patchValue(true);
      this.vehicle.controls['Tyresecure'].patchValue(true);
      this.vehicle.controls['Roadside'].patchValue(true);
      this.vehicle.controls['Invoice'].patchValue('');
      this.vehicle.controls['Enginesecure'].patchValue('');
    }else if(this.vehicle.controls['package'].value == '6') {
      this.visible = true;
      this.vehicle.controls['Depreciation'].patchValue(true);
      this.vehicle.controls['personaloss'].patchValue(true);
      this.vehicle.controls['transport'].patchValue(true);
      this.vehicle.controls['keyReplacement'].patchValue(true);
      this.vehicle.controls['Enginesecure'].patchValue(true);
      this.vehicle.controls['Consumableexpence'].patchValue(true);
      this.vehicle.controls['Repairofglass'].patchValue(true);
      this.vehicle.controls['Tyresecure'].patchValue(true);
      this.vehicle.controls['Roadside'].patchValue(true);
      this.vehicle.controls['Invoice'].patchValue('');
    }else if(this.vehicle.controls['package'].value == '7') {
      this.visible = true;
      this.vehicle.controls['Depreciation'].patchValue(true);
      this.vehicle.controls['Invoice'].patchValue(true);
      this.vehicle.controls['personaloss'].patchValue(true);
      this.vehicle.controls['transport'].patchValue(true);
      this.vehicle.controls['keyReplacement'].patchValue(true);
      this.vehicle.controls['Enginesecure'].patchValue(true);
      this.vehicle.controls['Consumableexpence'].patchValue(true);
      this.vehicle.controls['Repairofglass'].patchValue(true);
      this.vehicle.controls['Tyresecure'].patchValue(true);
      this.vehicle.controls['Roadside'].patchValue(true);
    }
  }


  // //Nominee RelationList
  // getRelationList() {
  //   const data = {
  //     'platform': 'web',
  //     'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
  //     'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
  //   };
  //   this.carinsurance.RelationList(data).subscribe(
  //       (successData) => {
  //         this.nomineeRelationSuccess(successData);
  //       },
  //       (error) => {
  //         this.nomineeRelationFailure(error);
  //       }
  //   );
  // }
  //
  // nomineeRelationSuccess(successData) {
  //   this.relationlist = successData.ResponseObject;
  // }
  //
  // nomineeRelationFailure(error) {
  //
  // }
  financiertype() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'

    }
    this.carinsurance.Finacetype(data).subscribe(
        (successData) => {
          this.financesuccess(successData);
        },
        (error) => {
          this.failureSuccess(error);
        }
    );
  }

  public financesuccess(successData) {
    if (successData.IsSuccess == true) {
      // this.errortoaster = true;
      // this.banklist = successData.ResponseObject;
      this.finlist = successData.ResponseObject.financerdetails;
      console.log(this.finlist,'finlist');
      // this.photosBuffer = this.photos.slice(0, this.bufferSize);
      // console.log(this.photosBuffer,'photos');
      this.financierListname();
    }else{
      // this.errortoaster = false;
      this.toastr.error(successData.ErrorObject);
    }
  }

  public failureSuccess(error) {
  }

  financierListname() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'financial_code':this.vehicle.controls['bankName'].value
    }
    this.carinsurance.tataFinancierName(data).subscribe(
        (successData) => {
          this.financierNamesuccess(successData);
        },
        (error) => {
          this.financierNameFailure(error);
        }
    );
  }

  public financierNamesuccess(successData) {
    if (successData.IsSuccess == true) {
      // this.errortoaster = true;

      this.photos = successData.ResponseObject;
      console.log(this.photos,'photos');

    }

  }

  public financierNameFailure(error) {
  }

  onScrollToEnd() {
    this.fetchMore();
  }

  onScroll({ end }) {
    if (this.loading || this.photos.length <= this.photosBuffer.length) {
      return;
    }

    if (end + this.numberOfItemsFromEndBeforeFetchingMore >= this.photosBuffer.length) {
      this.fetchMore();
    }
  }

  private fetchMore() {
    const len = this.photosBuffer.length;
    const more = this.photos.slice(len, this.bufferSize + len);
    this.loading = true;
    // using timeout here to simulate backend API delay
    setTimeout(() => {
      this.loading = false;
      this.photosBuffer = this.photosBuffer.concat(more);
    }, 200)
  }

  chooseflag(event: any) {
    console.log(this.proposer.controls['driveflag'].value, 'driveflag');
    if (this.proposer.controls['driveflag'].value == 'Y') {
      console.log(this.proposer.controls['proposerLastname'].value, 'value');
      this.proposer.controls['driveFirstname'].patchValue(this.proposer.controls['proposerFirstname'].value);
      this.proposer.controls['driveLastname'].patchValue(this.proposer.controls['proposerLastname'].value);
      this.proposer.controls['driveGender'].patchValue(this.proposer.controls['proposerGender'].value);
      this.proposer.controls['drivemaritalStatus'].patchValue(this.proposer.controls['maritalStatus'].value);
      // this.proposer.controls['driveFirstname'].setValidators([Validators.required]);
      // this.proposer.controls['driveLastname'].setValidators([Validators.required]);
      // this.proposer.controls['driveGender'].setValidators([Validators.required]);
      // this.proposer.controls['driveAge'].setValidators([Validators.required]);
      this.proposer.controls['drivingexp'].setValidators([Validators.required]);
      // this.proposer.controls['drivemaritalStatus'].setValidators([Validators.required]);
    } else if (this.proposer.controls['driveflag'].value == 'N') {
      // this.proposer.controls['driveFirstname'].patchValue('');
      // this.proposer.controls['driveLastname'].patchValue('');
      // this.proposer.controls['driveGender'].patchValue('');
      // this.proposer.controls['driveAge'].patchValue('');
      // this.proposer.controls['drivingexp'].patchValue('');
      // this.proposer.controls['drivemaritalStatus'].patchValue('');
      //
      // this.proposer.controls['driveFirstname'].setValidators(null);
      // this.proposer.controls['driveLastname'].setValidators(null);
      // this.proposer.controls['driveGender'].setValidators(null);
      // this.proposer.controls['driveAge'].setValidators(null);
      this.proposer.controls['drivingexp'].setValidators(null);
      // this.proposer.controls['drivemaritalStatus'].setValidators(null);
    }
    // this.proposer.controls['driveFirstname'].updateValueAndValidity();
    // this.proposer.controls['driveLastname'].updateValueAndValidity();
    // this.proposer.controls['driveGender'].updateValueAndValidity();
    // this.proposer.controls['driveAge'].updateValueAndValidity();
    this.proposer.controls['drivingexp'].updateValueAndValidity();
    // this.proposer.controls['drivemaritalStatus'].updateValueAndValidity();
  }

  check(event) {
    if (event.checked == true) {
      this.vehicle.controls['banktype'].setValidators([Validators.required]);
      this.vehicle.controls['bankName'].setValidators([Validators.required]);
      this.vehicle.controls['Address'].setValidators([Validators.required]);
    } else if (event.checked != true) {
      this.vehicle.controls['banktype'].patchValue('');
      this.vehicle.controls['bankName'].patchValue('');
      this.vehicle.controls['bankNamevalue'].patchValue('');
      this.vehicle.controls['Address'].patchValue('');
      this.vehicle.controls['banktype'].setValidators(null);
      this.vehicle.controls['bankName'].setValidators(null);
      this.vehicle.controls['bankNamevalue'].setValidators(null);
      this.vehicle.controls['Address'].setValidators(null);
    }
    this.vehicle.controls['banktype'].updateValueAndValidity();
    this.vehicle.controls['bankName'].updateValueAndValidity();
    this.vehicle.controls['bankNamevalue'].updateValueAndValidity();
    this.vehicle.controls['Address'].updateValueAndValidity();
  }

  proposerDetails(stepper: MatStepper, value) {
    console.log(this.proposer.controls['proposerFirstname'],' form');
    sessionStorage.tatacarproposer = '';
    sessionStorage.tatacarproposer = JSON.stringify(value);
    if (this.proposer.valid) {
      if (sessionStorage.carproposerAge >= 18) {
        this.agecount = sessionStorage.carproposerAge;
        let age = this.agecount - 18;
        if (this.proposer.controls['drivingexp'].value <= age) {
          console.log(value, 'proposer');
          stepper.next();
          this.topScroll();
        } else {
          this.toastr.error('Invalid Driving Experience');
        }
      } else {
        this.toastr.error('Proposer Age Should Be Greater than 18 and Above');
      }
    } else {
      this.toastr.error('Please Fill All The Mandtory Fields');
    }
  }


  vehicleDetails(stepper: MatStepper, value) {
    sessionStorage.tatacarvehicle = '';
    sessionStorage.tatacarvehicle = JSON.stringify(value);
    if (this.vehicle.valid ) {
      if(this.vehicle.controls['electriAccessSI'].value <= 50000 && this.vehicle.controls['nonElectricAcessSI'].value <= 50000){
      console.log(value, 'vehicle');
      stepper.next();
      this.topScroll();
      }else{
        this.toastr.error('Sum Insured should be less then or equal to 50000');
      }
    }
    else {
      this.toastr.error('Please Fill All The Mandtory Fields');
    }
  }

  prepolicyDetails(stepper: MatStepper, value) {
    sessionStorage.tatacarprepolicy = '';
    sessionStorage.tatacarprepolicy = JSON.stringify(value);
    if (this.previouspolicy.valid) {
      if (this.enquiryFormData.business_type != '1') {
        if(this.previouspolicy.controls['prepolno'].value != '') {
          console.log(value, 'prepolicy');
          stepper.next();
          this.topScroll();
        } else {
          this.toastr.error('Policy No should not be empty');
        }
      }
    }
  }

  nomineeDetails(stepper: MatStepper, value) {
    sessionStorage.tatacarnominee = '';
    sessionStorage.tatacarnominee = JSON.stringify(value);
    if (this.nominee.valid) {
      if (this.nominee.controls['nomineeAge'].value >= 18) {
        this.createproposal(stepper);
      }else{
        this.toastr.error('Nominee Age should Be 18 or above');
      }
    }
  }

  QuoteList() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'enquiry_id': this.carEnquiryId,
      'company_id': "13",
      'package_type': this.premium,
      'Idv': this.buycarDetails.Idv,
      'revised_idv': this.buycarDetails.Idv,
      'Package': this.vehicle.controls['packagevalue'].value,
      'Depreciation_reimbursement': this.vehicle.controls['Depreciation'].value == true ? 'Y' : 'N',
      'Daily_allowance': 'N',
      'Return_to_Invoice': this.vehicle.controls['Invoice'].value == true ? 'Y' : 'N',
      'Loss_of_Personal_belongings_IDV': this.vehicle.controls['personaloss'].value == true ? 'Y' : 'N',
      'Emergency_transport_and_Hotel_expenses_IDV': this.vehicle.controls['transport'].value == true ? 'Y' : 'N',
      'Key_Replacement': this.vehicle.controls['keyReplacement'].value == true ? 'Y' : 'N',
      'Engine_Secure': this.vehicle.controls['Enginesecure'].value == true ? 'Y' : 'N',
      'Consumables_expenses': this.vehicle.controls['Consumableexpence'].value == true ? 'Y' : 'N',
      'Repairglass_plastic_fibre_and_rubberglass': this.vehicle.controls['Repairofglass'].value == true ? 'Y' : 'N',
      'Tyre_Secure': this.vehicle.controls['Tyresecure'].value == true ? 'Y' : 'N',
      'NCB_protection_cover': this.vehicle.controls['protectioncover'].value == true ? 'Y' : 'N',
      'Roadside_Assistance':this.vehicle.controls['Roadside'].value == true ? 'Y' : 'N',
      "Electrical_Accessories": this.vehicle.controls['electriAccess'].value == true ? 'Y' : 'N',
      "Electrical_Accessories_SI":this.vehicle.controls['electriAccessSI'].value,
      "Non_Electrical_Accessories": this.vehicle.controls['nonElectricAcess'].value == true ? 'Y' : 'N',
      "Non_Electrical_Accessories_SI": this.vehicle.controls['nonElectricAcessSI'].value,
      "Automobile_Association_Membership": this.vehicle.controls['autoAsso'].value == true ? 'Y' : 'N',
      "Antitheft": this.vehicle.controls['antitheft'].value == true ? 'Y' : 'N',
      "TPPD_Restricted": this.vehicle.controls['tppdRes'].value == true ? 'Y' : 'N',
    };
    console.log(data,'fullquote');
    this.carinsurance.QuoteList(data).subscribe(
        (successData) => {
          this.QuoteSuccess(successData);
        },
        (error) => {
          this.QuoteFailure(error);
        }
    );
  }

  QuoteSuccess(successData) {
    if (successData.IsSuccess) {
      this.Quotelist = successData.ResponseObject;
      console.log(this.Quotelist,'quotationdata');
      this.QConsumableExpenses=this.Quotelist.productlist.addons.Consumables_expenses;
      this.QDepreciationReImb=this.Quotelist.productlist.addons.Depreciation_reimbursement;
      this.QEmergencytransport=this.Quotelist.productlist.addons.Emergency_transport_and_Hotel_expenses_IDV;
      this.QKeyReplacement=this.Quotelist.productlist.addons.Key_Replacement;
      this.QLossPersonalIDV=this.Quotelist.productlist.addons.Loss_of_Personal_belongings_IDV;
      this.QRepairGlass=this.Quotelist.productlist.addons.Repair_Glass;
      this.QRoadsideAssistance=this.Quotelist.productlist.addons.Roadside_Assistance;
      this.QTyreSecure=this.Quotelist.productlist.addons.Tyre_Secure;
      this.QReturnInvoice=this.Quotelist.productlist.addons.Return_to_Invoice;
      this.QEngineSecure=this.Quotelist.productlist.addons.Engine_Secure;
      this.quotationNo=this.Quotelist.productlist.quotation_no;
      this.ElectricalAccessoriesAmt=this.Quotelist.productlist.accessories.Electrical_Accessories;
      this.NonElectricalAccessoriesAmt=this.Quotelist.productlist.accessories.NonElectrical_accessories;
      this.AutomobileAssociationAmt=this.Quotelist.productlist.accessories.Automobile_Association;
      this.AntitheftdeviceAmt=this.Quotelist.productlist.accessories.Anti_theft_device;
      this.TPPDAmt=this.Quotelist.productlist.accessories.TPPD;
      console.log(this.quotationNo,'quotationNoooo');
      // this.quotationNo=sessionStorage.this.quotationNo

      this.depreciationChange();
      this.invoiceChange();
      this.keyReplacementChange();
      this.enginesecureChange();
      this.consexpenceChange();
      this.tyresecureChange();
      // this.protectioncoverChange();
      this.roadsideChange();
      this.personalossChange();
      this.RepairGlassChange();
      this.transportAmountChange();
      this.eAcessSIChange();
      this.nEAcessChange();
      this.autoAssoAmountChange();
      this.antitheftAmountChange();
      this.ttppdResAmountChange();
      // this.createproposal(stepper);
    }
  }

  QuoteFailure(error) {

  }

  depreciationChange()
  {
    this.vehicle.controls['DepreciationAmount'].patchValue(this.QDepreciationReImb);
    // console.log(this.Quotelist.productlist.addons.Automobile_Association_Membership,'quoteValueeee')
    console.log(this.QDepreciationReImb,'quoteValueesssss')
    // console.log( this.vehicle.controls['Associationamount'].value,'quoteListsss')

  }
  invoiceChange()
  {
    this.vehicle.controls['invoiceAmount'].patchValue(this.QReturnInvoice);
    console.log(this.QReturnInvoice,'quoteValueesssss')

  }

  keyReplacementChange()
  {
    this.vehicle.controls['keyReplacementAmount'].patchValue(this.QKeyReplacement);
    // console.log(this.Quotelist.productlist.addons.Automobile_Association_Membership,'quoteValueeee')
    console.log(this.QKeyReplacement,'quoteValueesssss')
    // console.log( this.vehicle.controls['Associationamount'].value,'quoteListsss')

  }

  enginesecureChange()
  {
    this.vehicle.controls['enginesecureAmount'].patchValue(this.QEngineSecure);
    console.log(this.QEngineSecure,'quoteValueesssss')
    // console.log( this.vehicle.controls['Associationamount'].value,'quoteListsss')

  }
  consexpenceChange()
  {
    this.vehicle.controls['consexpenceAmount'].patchValue(this.QConsumableExpenses);
    console.log(this.QConsumableExpenses,'quoteValueesssss')

  }

  tyresecureChange()
  {
    this.vehicle.controls['tyresecureAmount'].patchValue(this.QTyreSecure);
    console.log(this.QTyreSecure,'quoteValueesssss')

  }
  // protectioncoverChange()
  // {
  //   this.vehicle.controls['protectioncoverAmount'].patchValue(this.QTyreSecure);
  //   // console.log(this.Quotelist.productlist.addons.Automobile_Association_Membership,'quoteValueeee')
  //   console.log(this.QTyreSecure,'quoteValueesssss')
  //   // console.log( this.vehicle.controls['Associationamount'].value,'quoteListsss')
  //
  // }
  roadsideChange()
  {
    this.vehicle.controls['roadsideAmount'].patchValue(this.QRoadsideAssistance);
    console.log(this.QRoadsideAssistance,'quoteValueesssss')

  }
  personalossChange()
  {
    this.vehicle.controls['personalossAmount'].patchValue(this.QLossPersonalIDV);
    console.log(this.QLossPersonalIDV,'quoteValueesssss')

  }
  RepairGlassChange()
  {
    this.vehicle.controls['RepairglassAmount'].patchValue(this.QRepairGlass);
    console.log(this.QLossPersonalIDV,'quoteValueesssss')

  }

  transportAmountChange()
  {
    this.vehicle.controls['transportAmount'].patchValue(this.QEmergencytransport);
    console.log(this.QEmergencytransport,'quoteValueesssss')

  }
  electricAccess() {
    if (this.vehicle.controls['electriAccess'].value == true) {
      this.vehicle.controls['electriAccessSI'].patchValue(this.vehicle.controls['electriAccessSI'].value),
          this.vehicle.controls['electriAccessSI'].setValidators([Validators.required]);

    } else {
      this.vehicle.controls['electriAccessSI'].patchValue(''),
          this.vehicle.controls['electriAccessSI'].clearValidators();

    }
    this.vehicle.controls['electriAccessSI'].updateValueAndValidity();
  }
  electricReq() {
    if (this.vehicle.controls['electriAccessSI'].value ) {
      this.vehicle.controls['electriAccessSIAmount'].patchValue(this.vehicle.controls['electriAccessSIAmount'].value),
          this.vehicle.controls['electriAccessSIAmount'].setValidators([Validators.required]);

    } else {
      this.vehicle.controls['electriAccessSIAmount'].patchValue(''),
          this.vehicle.controls['electriAccessSIAmount'].clearValidators();

    }
    this.vehicle.controls['electriAccessSIAmount'].updateValueAndValidity();
  }
  eAcessSIChange()
  {
    this.vehicle.controls['electriAccessSIAmount'].patchValue(this.ElectricalAccessoriesAmt);
    console.log(this.QEmergencytransport,'quoteValueesssss')

  }
  nonelectricAccess() {
    if (this.vehicle.controls['nonElectricAcess'].value == true) {
      this.vehicle.controls['nonElectricAcessSI'].patchValue(this.vehicle.controls['nonElectricAcessSI'].value),
          this.vehicle.controls['nonElectricAcessSI'].setValidators([Validators.required]);

    } else {
      this.vehicle.controls['nonElectricAcessSI'].patchValue(''),
          this.vehicle.controls['nonElectricAcessSI'].clearValidators();

    }
    this.vehicle.controls['nonElectricAcessSI'].updateValueAndValidity();
  }
  electricNonReq() {
    if (this.vehicle.controls['nonElectricAcessSI'].value ) {
      this.vehicle.controls['nonElectricAcessSIAmount'].patchValue(this.vehicle.controls['nonElectricAcessSIAmount'].value),
          this.vehicle.controls['nonElectricAcessSIAmount'].setValidators([Validators.required]);

    } else {
      this.vehicle.controls['nonElectricAcessSIAmount'].patchValue(''),
          this.vehicle.controls['nonElectricAcessSIAmount'].clearValidators();

    }
    this.vehicle.controls['nonElectricAcessSIAmount'].updateValueAndValidity();
  }
  nEAcessChange()
  {
    this.vehicle.controls['nonElectricAcessSIAmount'].patchValue(this.NonElectricalAccessoriesAmt);
    console.log(this.QEmergencytransport,'quoteValueesssss')

  }
  autoAssoReq() {
    if (this.vehicle.controls['autoAsso'].value == true ) {
      this.vehicle.controls['autoAssoAmount'].patchValue(this.vehicle.controls['autoAssoAmount'].value),
          this.vehicle.controls['autoAssoAmount'].setValidators([Validators.required]);

    } else {
      this.vehicle.controls['autoAssoAmount'].patchValue(''),
          this.vehicle.controls['autoAssoAmount'].clearValidators();

    }
    this.vehicle.controls['autoAssoAmount'].updateValueAndValidity();
  }
  autoAssoAmountChange()
  {
    this.vehicle.controls['autoAssoAmount'].patchValue(this.AutomobileAssociationAmt);
    console.log(this.QEmergencytransport,'quoteValueesssss')

  }
  antitheftReq() {
    if (this.vehicle.controls['antitheft'].value == true ) {
      this.vehicle.controls['antitheftAmount'].patchValue(this.vehicle.controls['antitheftAmount'].value),
          this.vehicle.controls['antitheftAmount'].setValidators([Validators.required]);

    } else {
      this.vehicle.controls['antitheftAmount'].patchValue(''),
          this.vehicle.controls['antitheftAmount'].clearValidators();

    }
    this.vehicle.controls['antitheftAmount'].updateValueAndValidity();
  }
  antitheftAmountChange()
  {
    this.vehicle.controls['antitheftAmount'].patchValue(this.AntitheftdeviceAmt);
    console.log(this.QEmergencytransport,'quoteValueesssss')

  }
  tppdResReq() {
    if (this.vehicle.controls['tppdRes'].value == true ) {
      this.vehicle.controls['tppdResAmount'].patchValue(this.vehicle.controls['tppdResAmount'].value),
          this.vehicle.controls['tppdResAmount'].setValidators([Validators.required]);

    } else {
      this.vehicle.controls['tppdResAmount'].patchValue(''),
          this.vehicle.controls['tppdResAmount'].clearValidators();

    }
    this.vehicle.controls['tppdResAmount'].updateValueAndValidity();
  }
  ttppdResAmountChange()
  {
    this.vehicle.controls['tppdResAmount'].patchValue(this.TPPDAmt);
    console.log(this.QEmergencytransport,'quoteValueesssss')

  }
  electriError(){
    if(this.vehicle.controls['electriAccessSI'].value <= 50000 ){
      this.errorMsg=false;
      this.errorMsg='';
    }else{

      this.errorMsg=true;
      this.errorMsg = 'Sum Insured should be less then or equal to 50000';
    }
  }
  nonelectriError(){
    if( this.vehicle.controls['nonElectricAcessSI'].value <= 50000){
      this.errorNonMsg=false;
      this.errorNonMsg='';
    }else{

      this.errorNonMsg=true;
      this.errorNonMsg = 'Sum Insured should be less then or equal to 50000';
    }
  }

  sessionData() {
    if (sessionStorage.tatacarproposer != '' && sessionStorage.tatacarproposer != undefined) {
      this.getstepper1 = JSON.parse(sessionStorage.tatacarproposer);
      this.proposer = this.fb.group({
        proposerTitle: this.getstepper1.proposerTitle,
        proposerFirstname: this.getstepper1.proposerFirstname,
        proposerMidname: this.getstepper1.proposerMidname,
        proposerLastname: this.getstepper1.proposerLastname,
        proposerGender: this.getstepper1.proposerGender,
        proposerDob: this.datepipe.transform(this.getstepper1.proposerDob, 'y-MM-dd'),
        maritalStatus: this.getstepper1.maritalStatus,
        proposerMobile: this.getstepper1.proposerMobile,
        proposerEmail: this.getstepper1.proposerEmail,
        proposerAadhar: this.getstepper1.proposerAadhar,
        Addressone: this.getstepper1.Addressone,
        Addresstwo: this.getstepper1.Addresstwo,
        Addressthree: this.getstepper1.Addressthree,
        Addressfour: this.getstepper1.Addressfour,
        proposerPincode: this.getstepper1.proposerPincode,
        proposerState: this.getstepper1.proposerState,
        proposerDistrict: this.getstepper1.proposerDistrict,
        proposerCity: this.getstepper1.proposerCity,
        driveflag: this.getstepper1.driveflag,
        driveFirstname: this.getstepper1.driveFirstname,
        driveLastname: this.getstepper1.driveLastname,
        driveGender: this.getstepper1.driveGender,
        driveAge: this.getstepper1.driveAge,
        drivingexp: this.getstepper1.drivingexp,
        drivemaritalStatus: this.getstepper1.drivemaritalStatus,
      })
    }
    if (sessionStorage.tatacarvehicle != '' && sessionStorage.tatacarvehicle != undefined) {
      this.getstepper3 = JSON.parse(sessionStorage.tatacarvehicle);
      this.vehicle = this.fb.group({
        engine: this.getstepper3.engine,
        chassis: this.getstepper3.chassis,
        Financetype: this.getstepper3.Financetype,
        banktype: this.getstepper3.banktype,
        bankName: this.getstepper3.bankName,
        bankNamevalue: this.getstepper3.bankNamevalue,
        Address: this.getstepper3.Address,
        package: this.getstepper3.package,
        packagevalue:  this.getstepper3.packagevalue,
        Depreciation: this.getstepper3.Depreciation,
        DepreciationAmount: this.getstepper3.DepreciationAmount,
        Allowance: this.getstepper3.Allowance,
        Invoice: this.getstepper3.Invoice,
        personaloss: this.getstepper3.personaloss,
        transport: this.getstepper3.transport,
        keyReplacement: this.getstepper3.keyReplacement,
        Enginesecure: this.getstepper3.Enginesecure,
        Consumableexpence: this.getstepper3.Consumableexpence,
        Repairofglass: this.getstepper3.Repairofglass,
        Tyresecure: this.getstepper3.Tyresecure,
        protectioncover: this.getstepper3.protectioncover,
        Roadside: this.getstepper3.Roadside,
        transportAmount: this.getstepper3.transportAmount,
        RepairglassAmount: this.getstepper3.RepairglassAmount,
        personalossAmount: this.getstepper3.personalossAmount,
        roadsideAmount: this.getstepper3.roadsideAmount,
        protectioncoverAmount: this.getstepper3.protectioncoverAmount,
        tyresecureAmount: this.getstepper3.tyresecureAmount,
        consexpenceAmount: this.getstepper3.consexpenceAmount,
        enginesecureAmount: this.getstepper3.enginesecureAmount,
        keyReplacementAmount: this.getstepper3.keyReplacementAmount,
        electriAccess: this.getstepper3.electriAccess,
        electriAccessSI: this.getstepper3.electriAccessSI,
        electriAccessSIAmount: this.getstepper3.electriAccessSIAmount,
        nonElectricAcess: this.getstepper3.nonElectricAcess,
        nonElectricAcessSI: this.getstepper3.nonElectricAcessSI,
        nonElectricAcessSIAmount:this.getstepper3.nonElectricAcessSIAmount,
        autoAsso:this.getstepper3.autoAsso,
        autoAssoAmount:this.getstepper3.autoAssoAmount,
        antitheft: this.getstepper3.antitheft,
        antitheftAmount: this.getstepper3.antitheftAmount,
        tppdRes:this.getstepper3.tppdRes,
        tppdResAmount: this.getstepper3.tppdResAmount,
        invoiceAmount: this.getstepper3.invoiceAmount,
        ispreviousPolicy: this.getstepper3.ispreviousPolicy,
        // quotationNo: this.getstepper2.this.quotationNo,

      });
      this.visible = true;
    }
    if (sessionStorage.tatacarprepolicy != '' && sessionStorage.tatacarprepolicy != undefined) {
      this.getstepper2 = JSON.parse(sessionStorage.tatacarprepolicy);
      this.previouspolicy = this.fb.group({
        // preflag: this.getstepper3.preflag,
        // preName: this.getstepper3.preName,
        // preNamevalue:  this.getstepper3.preNamevalue,
        prepolno: this.getstepper2.prepolno,
        preAddressone: this.getstepper2.preAddressone,
        preAddresstwo: this.getstepper2.preAddresstwo,
        preAddressthree: this.getstepper2.preAddressthree,
        prepincode: this.getstepper2.prepincode,
        preState: this.getstepper2.preState,
        preDistrict: this.getstepper2.preDistrict,
        preCity: this.getstepper2.preCity,

      })
    }
    if (sessionStorage.tatacarnominee != '' && sessionStorage.tatacarnominee != undefined) {
      this.getstepper4 = JSON.parse(sessionStorage.tatacarnominee);
      this.nominee = this.fb.group({
        nomineeName: this.getstepper4.nomineeName,
        nomineeAge: this.getstepper4.nomineeAge,
        nomineerelation: this.getstepper4.nomineerelation,
      })
    }
  }

  //Proposal Creation
  createproposal(stepper: MatStepper) {
    console.log(this.quotationNo,'qqqqqqqqqqqqqqqqqqqqq...')
    const data = {
      "platform": "web",
      "user_id": this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      "role_id": this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      "pos_status": this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
      "enquiry_id": this.carEnquiryId,
      "created_by": "",
      "proposal_id": sessionStorage.tatacarproposalID == '' || sessionStorage.tatacarproposalID == undefined ? '' : sessionStorage.tatacarproposalID,
      'package_type': this.premium,
      "motorproposalObj": {
        "quotation_no": this.quotationNo,
        "pol_sdate": this.enquiryFormData.business_type == '1'? this.datepipe.transform(this.minDate,'yMMdd') : this.datepipe.transform(this.poldate, 'yMMdd'),
        "sp_name": "Name",
        "sp_license": "Lino12345566",
        "sp_place": "Mahbubnagar",
        "customer": {
          "salutation": this.proposer.controls['proposerTitle'].value,
          "first_name": this.proposer.controls['proposerFirstname'].value,
          "middle_name": this.proposer.controls['proposerMidname'].value,
          "last_name": this.proposer.controls['proposerLastname'].value,
          "gender": this.proposer.controls['proposerGender'].value,
          "dob": this.datepipe.transform(this.proposer.controls['proposerDob'].value, 'yMMdd'),
          "marital_status": this.proposer.controls['maritalStatus'].value,
          "address_1": this.proposer.controls['Addressone'].value,
          "address_2": this.proposer.controls['Addresstwo'].value,
          "address_3": this.proposer.controls['Addressthree'].value,
          "address_4": this.proposer.controls['Addressfour'].value,
          "pincode": this.proposer.controls['proposerPincode'].value,
          "cust_aadhaar": this.proposer.controls['proposerAadhar'].value,
          "mobile_no": this.proposer.controls['proposerMobile'].value,
          "email_id": this.proposer.controls['proposerEmail'].value
        },
        "vehicle": {
          "engine_no": this.vehicle.controls['engine'].value,
          "chassis_no": this.vehicle.controls['chassis'].value
        },
        "prevpolicy": {
          "flag": this.enquiryFormData.business_type == '1'? 'N' : 'Y',
          // "name":  this.previouspolicy.controls['preName'].value == null ? '' : this.previouspolicy.controls['preName'].value,
          "address1": this.previouspolicy.controls['preAddressone'].value == null ? '' : this.previouspolicy.controls['preAddressone'].value,
          "address2": this.previouspolicy.controls['preAddresstwo'].value == null ? '' : this.previouspolicy.controls['preAddresstwo'].value,
          "address3": this.previouspolicy.controls['preAddressthree'].value == null ? '' : this.previouspolicy.controls['preAddressthree'].value,
          "polno": this.previouspolicy.controls['prepolno'].value == null ? '' : this.previouspolicy.controls['prepolno'].value,
          "pincode": this.previouspolicy.controls['prepincode'].value == null ? '' : this.previouspolicy.controls['prepincode'].value,
        },
        "financier": {
          "type": this.vehicle.controls['banktype'].value,
          "name": this.vehicle.controls['bankName'].value,
          "address": this.vehicle.controls['Address'].value,
          "loanacno": ""
        },
        "nominee": {
          "name": this.nominee.controls['nomineeName'].value,
          "age": this.nominee.controls['nomineeAge'].value,
          "relation": this.nominee.controls['nomineerelation'].value
        },
        "driver": {
          "flag": this.proposer.controls['driveflag'].value,
          "fname": this.proposer.controls['driveflag'].value == 'Y' ? this.proposer.controls['driveFirstname'].value : '',
          "lname": this.proposer.controls['driveflag'].value == 'Y' ? this.proposer.controls['driveLastname'].value : '',
          "gender": this.proposer.controls['driveflag'].value == 'Y' ? this.proposer.controls['driveGender'].value : '',
          "age": this.proposer.controls['driveflag'].value == 'Y' ? this.proposer.controls['driveAge'].value : '',
          "drivingexp": this.proposer.controls['drivingexp'].value,
          "marital_status": this.proposer.controls['driveflag'].value == 'Y' ? this.proposer.controls['drivemaritalStatus'].value : '',
        }
      }
    };
    console.log(data,'dataproposal');
    this.settings.loadingSpinner = true;
    this.carinsurance.proposal(data).subscribe(
        (successData) => {
          this.proposalSuccess(successData, stepper);
        },
        (error) => {
          this.proposalFailure(error);
        }
    );
  }

  proposalSuccess(successData, stepper) {
    this.settings.loadingSpinner = false;
    if (successData.IsSuccess) {
      stepper.next();
      this.topScroll();
      this.toastr.success('Proposal created successfully!!');
      this.summaryData = successData.ResponseObject;
      sessionStorage.summaryDatacartata = JSON.stringify(this.summaryData);
      this.Proposalnumber = this.summaryData.Proposal_Number;
      this.PaymentRedirect = this.summaryData.PaymentRedirect;
      this.PaymentReturn = this.summaryData.PaymentReturn;
      sessionStorage.tatacarproposalID = this.summaryData.ProposalId;
      this.proposerFormData = this.proposer.value;
      this.vehicalFormData = this.vehicle.value;
      this.previousFormData = this.previouspolicy.value;
      this.nomineeFormData = this.nominee.value;
    } else {
      if (successData.ErrorDes) {
        this.toastr.error(successData.ErrorDes);
        console.log(successData.ErrorDes, 'errordes');
      } else {
        this.toastr.error(successData.ErrorObject);
        console.log(successData.ErrorObject, 'errorobj');
        this.settings.loadingSpinner = false;
      }
    }
  }

  proposalFailure(error) {
  }

  topScroll() {
    document.getElementById('main-content').scrollTop = 0;
  }
  changefinancecompany() {
    this.vehicle.controls['bankNamevalue'].patchValue(this.finlist[this.vehicle.controls['bankName'].value]);

  }
}

@Component({
  selector: ' tataigCarOpt ',
  template: `
        <div class="container">
            <div class="row">
                <div class="col-md-12 text-center w-100">
                  <p>{{data.name}}<span class="error">*</span></p>
                  <mat-radio-group  [(ngModel)]="data.animal" (change)="outChange()" [mat-dialog-close]="data.animal" required>
                    <mat-radio-button value="Y" >Yes</mat-radio-button>
                    <mat-radio-button value="N">No</mat-radio-button>
                  </mat-radio-group>
                </div>
            </div>
        </div>
       
    `
})
export class tataigCarOpt {
 public ispreviousPolicy: any;
  public previousPolicyvalue:any;
  public packaageList:any
  // public newPackageList:any
  constructor(
      public dialogRef: MatDialogRef<tataigCarOpt>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData, public route: ActivatedRoute, public common: CommonService, public validation: ValidationService, public appSettings: AppSettings, private toastr: ToastrService, public config: ConfigurationService, public authservice: AuthService, public carinsurance: FourWheelerService) {
    data.animal = "";
    // this.packaageList = JSON.parse(sessionStorage.packaageList);
console.log(data.name,'previous........');
console.log(data.animal,'previous........');
  }


  outChange(): void {
   if(this.data.animal == 'N'){
          this.toastr.error('Eligible Only for Gold and Silver Plan ');
        }

        console.log(this.data.animal, '122345566677');
        this.dialogRef.close(
            this.data.animal
        );
    console.log('outtttt111111111');
  }

  // outChange(){
  //   if(data.prev == 'No'){
  //           this.toastr.error('Eligible Only for Gold and Silver Plan ');
  //         }
  //         console.log(this.data.prev, '122345566677');
  //         this.dialogRef.close(true);
  //   console.log('outtttt111111111');
  // }

  // prePolicyVal() {
  //
  //   const data = {
  //     "platform": "web",
  //     "user_id": this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
  //     "role_id": this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
  //     "addons": this.data.animal == "Yes"?'Y':'N'
  //
  //   }
  //   console.log(data, '999999999');
  //   this.carinsurance.packagetype(data).subscribe(
  //       (successData) => {
  //         this.otpValidationListSuccess(successData);
  //       },
  //       (error) => {
  //         this.otpValidationListFailure(error);
  //       }
  //   );
  // }
  //
  // public otpValidationListSuccess(successData) {
  //   if (successData.IsSuccess) {
  //     this.previousPolicyvalue = successData.ResponseObject;
  //     if(this.data.animal == 'No'){
  //       this.toastr.error('Eligible Only for Gold and Silver Plan ');
  //     }
  //
  //     console.log(this.data.animal, '122345566677');
  //     this.dialogRef.close(
  //         this.data.animal
  //     );
  //   }
  //
  //
  //   console.log(this.data.animal,'tpreviousPolicyvalue....');
  // }
  //
  // public otpValidationListFailure(error) {
  // }



  numberValidate(event: any) {
    this.validation.numberValidate(event);
  }
}
