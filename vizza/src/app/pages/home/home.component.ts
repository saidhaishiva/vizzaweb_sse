import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {AppSettings} from '../../app.settings';
import {Settings} from '../../app.settings.model';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {DatePipe} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {CommonService} from '../../shared/services/common.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {TestimonialComponent} from './testimonial/testimonial.component';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {ClearSessionService} from '../../shared/services/clear-session.service';
import {MetaService} from '../../shared/services/meta.service';

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
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ]
})
export class HomeComponent implements OnInit {
    public form: FormGroup;
    public setDate: any;
    public selectDate: any;
    public settings: Settings;
    commentBox: boolean;
    testimonialLists: any;
    companyList: any;
    comments: any;
    webhost: any;
    policyTypes: any;
    paymentFrequency: any;
    allImage: any;
    fileDetails: any;
    getUrl: any;
    url: any;
    fileUploadPath: any;
    today: any;
    maxDate: any;
    dateError: any;
    metaHome: any;
    metaTitle: any;

    constructor(public auth: AuthService, public fb: FormBuilder, public datepipe: DatePipe ,public session: ClearSessionService, public appSettings: AppSettings, public toastr: ToastrService,
                public config: ConfigurationService, public common: CommonService, public dialog: MatDialog, public meta: MetaService) {
        // this.form =  this.fb.group({
        //     'insurename': ['', Validators.compose([Validators.required])],
        //     'startdate': ['', Validators.compose([Validators.required])],
        //     'enddate': ['', Validators.compose([Validators.required])],
        //     'insureemail': ['', Validators.compose([Validators.required,Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
        //     'insurepolicytype':  ['', Validators.compose([Validators.required])],
        //     'insuremobile': ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}'), Validators.minLength(10)])],
        //     'insurepolicyno': ['', Validators.compose([Validators.required])],
        //     'insurepremiumamount': ['', Validators.compose([Validators.required])],
        //     'insurecompanyname': ['',Validators.compose([Validators.required])],
        //     'paymentfrequeny': ['',Validators.compose([Validators.required])]
        // });
        this.settings = this.appSettings.settings;
        this.webhost = this.config.getimgUrl();
        if(window.innerWidth < 787){
            this.settings.HomeSidenavUserBlock = false;
            this.settings.sidenavIsOpened = false;
            this.settings.sidenavIsPinned = false;
        }else{
        this.settings.HomeSidenavUserBlock = true;
        this.settings.sidenavIsOpened = true;
        this.settings.sidenavIsPinned = true;
        }
        this.settings.menu = 'vertical';
        this.commentBox = false;
        this.selectDate = '';
        this.fileUploadPath = '';
        this.allImage = [];
        this.today = new Date();


        // this.paymentFrequency = [
        //     {'id': 1, 'name': 'Annually'},
        //     {'id': 2, 'name': 'Half Yearly'},
        //     {'id': 3, 'name': 'Quarterly'},
        //     {'id': 4, 'name': 'Monthly'}
        // ];
        sessionStorage.setPageP = 1;
        sessionStorage.sideMenuP = '';
    }

    ngOnInit() {
        this.session.clearSessionData();
        this.setDate = Date.now();
        this.setDate = this.datepipe.transform(this.setDate, 'y-MM-dd');

        sessionStorage.familyMembers = '';
        sessionStorage.buyProductdetails = '';
        sessionStorage.sideMenu = '';
        sessionStorage.sonBTn = '';
        sessionStorage.daughterBTn = '';
        sessionStorage.fatherBTn = '';
        sessionStorage.motherBtn = '';
        sessionStorage.fatherInLawBTn = '';
        sessionStorage.motherInLawBtn = '';
        sessionStorage.changedTabDetails = '';
        sessionStorage.changeSuninsuredAmount = '';
        sessionStorage.changedTabIndex = '';
        sessionStorage.shorListTab = '';
        sessionStorage.filterCompany = '';
        sessionStorage.allGroupDetails = '';



        //appollo helth
        sessionStorage.stepper1Details = '';
        sessionStorage.stepper2Details = '';
        sessionStorage.proposerAge = '';
        sessionStorage.titleValidation = '';
        sessionStorage.nomineeData = '';
        sessionStorage.appollo_health_proposal_id = '';
        sessionStorage.proposerAge = '';
        sessionStorage.mobileNumber = '';
        sessionStorage.apollomedical = '';

        sessionStorage.summaryData = '';


        // personal accident
        sessionStorage.setOccupation = '';
        sessionStorage.setAge = '';
        sessionStorage.setAnnualIncome = '';
        sessionStorage.setPage = '';
        sessionStorage.sideMenu = false;
        sessionStorage.setFamilyDetails = '';
        sessionStorage.setInsuredAmount = '';
        sessionStorage.setPincode = '';
        sessionStorage.setPage = '';
        sessionStorage.policyLists = '';




        this.testimonialList();
        this.metaList();
    }

    public metaList() {
        const data = {
            'platform': 'web',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'component_name': 'Home'
        };
        this.meta.metaDetail(data).subscribe(
            (successData) => {
                this.metaDetailSuccess(successData);
            },
            (error) => {
                this.metaDetailFailure(error);
            }
        );
    }
    public metaDetailSuccess(successData) {
        console.log(successData.ResponseObject);
        this.metaHome = successData.ResponseObject;
        this.metaTitle = this.metaHome[0].title;
        console.log(this.metaHome[0].title, 'titl')
    }
    public metaDetailFailure(error) {
        console.log(error);
    }



    slides = [
        {img: "./assets/img/partner/GeneralInsurance/apolloMunich.png"},
        {img: "./assets/img/partner/GeneralInsurance/bajaj-allianz.png"},
        {img: "./assets/img/partner/GeneralInsurance/bharti-axa.png"},
        {img: "./assets/img/partner/GeneralInsurance/cholamandalam-ms.png"},
        {img: "./assets/img/partner/GeneralInsurance/cigna-ttk.png"},
        {img: "./assets/img/partner/GeneralInsurance/edelweiss.png"},
        {img: "./assets/img/partner/GeneralInsurance/future-generali.png"},
        {img: "./assets/img/partner/GeneralInsurance/hdfc-ergo.png"},
        {img: "./assets/img/partner/GeneralInsurance/icici-lombard.png"},
        {img: "./assets/img/partner/GeneralInsurance/iifco-tokio.png"},
        {img: "./assets/img/partner/GeneralInsurance/kotak.png"},
        {img: "./assets/img/partner/GeneralInsurance/liberty-videocon.png"},
        {img: "./assets/img/partner/GeneralInsurance/magma-hdi.png"},
        {img: "./assets/img/partner/GeneralInsurance/max-bupa.png"},
        {img: "./assets/img/partner/GeneralInsurance/national-insurance.png"},
        {img: "./assets/img/partner/GeneralInsurance/new-india-insurance.png"},
        {img: "./assets/img/partner/GeneralInsurance/oriental.png"},
        {img: "./assets/img/partner/GeneralInsurance/reliance-general.png"},
        {img: "./assets/img/partner/GeneralInsurance/religare.png"},
        {img: "./assets/img/partner/GeneralInsurance/royal-sundaram.png"},
        {img: "./assets/img/partner/GeneralInsurance/sbi-general.png"},
        {img: "./assets/img/partner/GeneralInsurance/shriram.png"},
        {img: "./assets/img/partner/GeneralInsurance/star-health.png"},
        {img: "./assets/img/partner/GeneralInsurance/tata-aig.png"},
        {img: "./assets/img/partner/GeneralInsurance/united-india-insurance.png"},
        {img: "./assets/img/partner/GeneralInsurance/universal-sampo.png"}
    ];
    slideConfig = {"slidesToShow": 8, "slidesToScroll": 1,  "autoplay": true, "cssEase": 'linear', "speed": 2000, "autoplaySpeed": 0};
    slideConfig3 = {"slidesToShow": 3, "slidesToScroll": 1,  "autoplay": true, "cssEase": 'linear', "speed": 2000, "autoplaySpeed": 0};
    slides2 = [
        {img: "./assets/img/partner/lifeinsurance/aditya-birla.png"},
        {img: "./assets/img/partner/lifeinsurance/aegon.png"},
        {img: "./assets/img/partner/lifeinsurance/aviva-life.png"},
        {img: "./assets/img/partner/lifeinsurance/bajaj-allianz.png"},
        {img: "./assets/img/partner/lifeinsurance/Bharti-Axa.png"},
        {img: "./assets/img/partner/lifeinsurance/edelweiss-tokio.png"},
        {img: "./assets/img/partner/lifeinsurance/exide-life.png"},
        {img: "./assets/img/partner/lifeinsurance/future-generali.png"},
        {img: "./assets/img/partner/lifeinsurance/hdfc-life.png"},
        {img: "./assets/img/partner/lifeinsurance/icici-prudential.png"},
        {img: "./assets/img/partner/lifeinsurance/idbi-federal.png"},
        {img: "./assets/img/partner/lifeinsurance/india-first.png"},
        {img: "./assets/img/partner/lifeinsurance/kotak-life.png"},
        {img: "./assets/img/partner/lifeinsurance/lic.png"},
        {img: "./assets/img/partner/lifeinsurance/max-life.png"},
        {img: "./assets/img/partner/lifeinsurance/pnb-metlife.png"},
        {img: "./assets/img/partner/lifeinsurance/reliance-nippon.png"},
        {img: "./assets/img/partner/lifeinsurance/sbi-life.png"},
        {img: "./assets/img/partner/lifeinsurance/shriram.png"},
        {img: "./assets/img/partner/lifeinsurance/tata-aia.png"}
    ];
    slideConfig2 = {"slidesToShow": 8, "slidesToScroll": 1,  "autoplay": true, "cssEase": 'linear', "speed": 2000, "autoplaySpeed": 0, "rtl": true};
    slideConfig4 = {"slidesToShow": 3, "slidesToScroll": 1,  "autoplay": true, "cssEase": 'linear', "speed": 2000, "autoplaySpeed": 0, "rtl": true};

    addEvent(event) {
        this.selectDate = event.value;
        this.setDate = this.datepipe.transform(this.selectDate, 'y-MM-dd');
    }
    chooseDate(event, type) {
        this.maxDate = '';
        if (event.value != null) {
            if (typeof event.value._i == 'string') {
                const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
                if (pattern.test(event.value._i) && event.value._i.length == 10) {
                    this.dateError = '';
                } else {
                    this.dateError = 'Enter Valid Date';
                }
                let selectedDate;
                selectedDate = event.value._i;

                if (selectedDate.length == 10) {
                    if (type == 'sDate') {
                        this.maxDate = event.value;
                    }
                }
            } else if (typeof event.value._i == 'object') {
                this.dateError = '';
                if (type == 'sDate') {
                    this.maxDate = event.value;
                }
            }
        }
    }


    // @HostListener('window:resize')
    // public onWindowResize():void {
    //     if (window.innerWidth >= 768) {
    //         this.settings.sidenavIsOpened = true;
    //         this.settings.sidenavIsPinned = true;
    //         this.settings.menu = 'vertical'
    //     }
    // }


    testiComments() {
        // this.commentBox = true;
        let dialogRef = this.dialog.open(TestimonialComponent, {
            width: '800px' });
        dialogRef.disableClose = true;

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.testimonialList();
            }

        });

    }
    onNoClick() {
        this.commentBox = false;
    }



    testimonialList() {
        const data = {
            'platform': 'web'
        }
        this.common.getTestimonialList(data).subscribe(
            (successData) => {
                this.testimonialListSuccess(successData);
            },
            (error) => {
                this.testimonialListFailure(error);
            }
        );
    }
    public testimonialListSuccess(successData) {
        if (successData.IsSuccess == true) {
            this.testimonialLists = successData.ResponseObject;

        }
    }
    public testimonialListFailure(error) {
    }
    // selectPolicyType(compId) {
    //     this.getcompanyList(compId);
    // }
    // getPolicyTypes() {
    //     const data = {
    //         'platform': 'web',
    //         "user_id": this.auth.getPosUserId() != null  ? this.auth.getPosUserId() : '0',
    //         "role_id": this.auth.getPosRoleId() != null  ? this.auth.getPosRoleId() : '4'
    //     }
    //     this.common.policyTypes(data).subscribe(
    //         (successData) => {
    //             this.getpolicytypeSuccess(successData);
    //         },
    //         (error) => {
    //             this.getpolicytypeFailure(error);
    //         }
    //     );
    // }
    // public getpolicytypeSuccess(successData) {
    //     if (successData.IsSuccess) {
    //         this.policyTypes = successData.ResponseObject;
    //     }
    // }
    // public getpolicytypeFailure(error) {
    // }

    // getcompanyList(cid) {
    //     const data = {
    //         'platform': 'web',
    //         "user_id": this.auth.getPosUserId() != null  ? this.auth.getPosUserId() : '4',
    //         "role_id": this.auth.getPosRoleId() != null  ? this.auth.getPosRoleId() : '0',
    //         "insure_company_type_id": cid
    //     };
    //     this.common.getcompanyList(data).subscribe(
    //         (successData) => {
    //             this.setcompanyListSuccess(successData);
    //         },
    //         (error) => {
    //             this.setcompanyListFailure(error);
    //         }
    //     );
    // }
    // public setcompanyListSuccess(successData) {
    //     if (successData.IsSuccess == true) {
    //         this.companyList = successData.ResponseObject;
    //
    //     }
    // }
    // public setcompanyListFailure(error) {
    // }


    // renewal(values){
    //     if (this.form.valid) {
    //         let sdate = this.datepipe.transform(this.form.controls['startdate'].value, 'y-MM-dd');
    //         let edate = this.datepipe.transform(this.form.controls['enddate'].value, 'y-MM-dd');
    //         const data = {
    //             'platform': 'web',
    //             'user_id': this.auth.getPosUserId() != null  ? this.auth.getPosUserId() : '0',
    //             'role_id': this.auth.getPosRoleId() != null  ? this.auth.getPosRoleId() : '4',
    //             'insure_name': this.form.controls['insurename'].value,
    //             'insure_start_date': sdate,
    //             'insure_end_date': edate,
    //             'insure_email': this.form.controls['insureemail'].value,
    //             'insure_policy_type': this.form.controls['insurepolicytype'].value,
    //             'insure_mobile': this.form.controls['insuremobile'].value,
    //             'insure_policy_no': this.form.controls['insurepolicyno'].value,
    //             'insure_premium_amount' : this.form.controls['insurepremiumamount'].value,
    //             'insure_company_name': this.form.controls['insurecompanyname'].value,
    //             'insure_payment_frequency': this.form.controls['paymentfrequeny'].value
    //         };
    //
    //         this.common.policyRenewal(data).subscribe(
    //             (successData) => {
    //                 this.policyRenewalSuccess(successData);
    //             },
    //             (error) => {
    //                 this.policyRenewalFailure(error);
    //             }
    //         );
    //     }
    // }
    // policyRenewalSuccess(successData) {
    //     if (successData.IsSuccess) {
    //         this.toastr.success(successData.ResponseObject);
    //         this.form =  this.fb.group({
    //             'insurename': '',
    //             'startdate': '',
    //             'enddate': '',
    //             'insureemail': '',
    //             'insurepolicytype':  '',
    //             'insuremobile': '',
    //             'insurepolicyno': '',
    //             'insurepremiumamount': '',
    //             'insurecompanyname': '',
    //             'paymentfrequeny': ''
    //         });
    //     } else {
    //         this.toastr.error(successData.ErrorObject);
    //     }
    // }
    // policyRenewalFailure(error) {
    // }
    public keyPress(event: any) {
        if (event.charCode !== 0) {
            const pattern = /[0-9]/;
            const inputChar = String.fromCharCode(event.charCode);

            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }


    readUrl(event: any) {
        this.getUrl = '';
        let getUrlEdu = [];
        this.fileDetails = [];
        for (let i = 0; i < event.target.files.length; i++) {
            this.fileDetails.push({'image': '', 'size': event.target.files[i].size, 'type': event.target.files[i].type, 'name': event.target.files[i].name});
        }
        for (let i = 0; i < event.target.files.length; i++) {
            const reader = new FileReader();
            reader.onload = (event: any) => {
                this.url = event.target.result;
                getUrlEdu.push(this.url.split(','));
                this.onUploadFinished(getUrlEdu);
            };
            reader.readAsDataURL(event.target.files[i]);
        }

    }
    onUploadFinished(event) {
        this.allImage.push(event);
    }
    onUpload() {
        const data = {
            'platform': 'web',
            'image_path': ''
        };
        let length = this.allImage.length-1;
        for (let k = 0; k < this.allImage[length].length; k++) {
            this.fileDetails[k].image = this.allImage[length][k][1];
        }
        data.image_path = this.fileDetails;
        this.common.fileUploadPolicy(data).subscribe(
            (successData) => {
                this.fileUploadSuccess(successData);
            },
            (error) => {
                this.fileUploadFailure(error);
            }
        );
    }

    public fileUploadSuccess(successData) {
        if (successData.IsSuccess) {
            this.fileUploadPath = successData.ResponseObject.imagePath;
            this.toastr.success( successData.ResponseObject.message);
        } else {
            this.toastr.error(successData.ErrorObject, 'Failed');
        }
    }

    public fileUploadFailure(error) {
    }
    public data(event: any) {
        if (event.charCode !== 0) {
            const pattern = /[a-zA-Z\\ ]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }
    DisclaimerDialog(){
        const dialogRef = this.dialog.open(DisclaimerDialog, {
            width: '800px',
        });
        dialogRef.disableClose = true;
    }
    }

@Component({
    selector: 'disclaimerdialog',
    template: `        
        <div class="container">
        <div  class="row text-justify">
        
            <div class="col-sm-2">
            </div>
            <div class="col-sm-8">
                <h4 class="text-center" style="color: #DF6600 ">Disclaimer</h4>
            </div>
            <div class="col-sm-2 text-right">
                <mat-icon (click)="onNoClick()" style="cursor: pointer">close</mat-icon>
            </div>
                <ul style="list-style-type: none;">
                    <li><strong>* </strong>Insurance is the subject matter of solicitation.</li>
                    <li><strong>* </strong>Visitors are hereby informed that their information submitted on the website may be shared with insurers.</li>
                    <li><strong>* </strong>The product information for comparison displayed on this website is of the insurers with whom our company has an agreement.</li>
                    <li><strong>* </strong>Product information is authentic and solely based on the information received from the Insurer</li>
                </ul>
         </div>
        </div>`,
})
export class DisclaimerDialog {

    constructor(
        public dialogRef: MatDialogRef<DisclaimerDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

}
