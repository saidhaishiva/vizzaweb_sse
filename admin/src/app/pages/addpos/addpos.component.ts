import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CommonService } from '../../shared/services/common.service';
import { AuthService } from '../../shared/services/auth.service';
import { ConfigurationService} from '../../shared/services/configuration.service';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../shared/services/login.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-addpos',
    templateUrl: './addpos.component.html',
})
export class AddposComponent implements OnInit {
    public form: FormGroup;
    response: any;
    formdata: any;
    pin: any;
    fixed: boolean;
    range: boolean;
    header: boolean;
    pdfpreview: boolean;
    previewheader: boolean;
    headersize: number;
    footersize: number;
    headersize1: number;
    footersize1: number;
    checked: boolean;
    pdfback: boolean;
    public fileUploadPath: any;
    imgurl: any;
    getUrl: any;
    imagepath: any;
    image: any;
    webhost: any;
    defaultchecked: boolean;
    defaultheader: string;
    creditCard: string;
    creditChecked: boolean;
    getUrl1: any;
    size: number;
    url: string;
    initialValue: number;
    subsequentValue: number;
    subsequentError: string;
    fromValue: number;
    toValue: number;
    fromtoValueError: string;
    selectedtab: number;
    headerError: boolean;

    public passwordHide: boolean = true;
    constructor(public config: ConfigurationService,
                public fb: FormBuilder,public router: Router, public login: LoginService, public common: CommonService, public auth: AuthService, private toastr: ToastrService) {
        this.fixed = false;
        this.range = false;
        this.subsequentError = '';
        this.fromtoValueError = '';
        this.webhost = this.config.getimgUrl();
        this.previewheader = false;
        this.header = false;
        this.pdfpreview = true;
        this.pdfback = true;
        this.defaultchecked = false;
        this.selectedtab = 0;
        this.imagepath = '';
        this.form = this.fb.group({
            id: null,
            firstname: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
            lastname: ['', Validators.compose([Validators.required])],
            // profileimage: '',
            birthday: null,
            gender: null,
            // profile: this.fb.group({
            //   name: null,
            //   surname: null,
            //   relationship: null,
            //   birthday: null,
            //   gender: null,
            //   image: null
            // }),
            // work: this.fb.group({
            //   company: null,
            //   position: null,
            //   salary: null
            // }),
            contacts: this.fb.group({
                email: '',
                phone1: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
                phone2: '',
                address1: ['', Validators.compose([Validators.required])],
                address2: '',
                pincode: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
                city: '',
                state: '',
                country: ''
            }),
            documents: this.fb.group({
                aadharnumber: ['', Validators.compose([Validators.required])],
                pannumber: '',
                // subsequentvisit: '',
                // from: '',
                // to: '',
                // creditcard: 'No'
            }),
            education: this.fb.group({
                qualification: '',
                // footer: '',
                // defaultheader: 'No',
                // defaultfooter: 'No'
            })
        });
    }

    ngOnInit() {
        // this.formdata = this.user;
        // if (this.user) {
        //     console.log(this.formdata, 'formdattatattatatatat');
        //     if (this.formdata.hospitalimages.length == 0) {
        //         this.imagepath = '';
        //     } else {
        //         this.imagepath = this.formdata.hospitalimages[0].imagepath;
        //     }
        //     this.form = this.fb.group({
        //         clinicname: this.formdata.hospitalname,
        //         shortname: this.formdata.hospitalshortname,
        //         profileimage: this.imagepath,
        //
        //         contacts: this.fb.group({
        //             email: this.formdata.emailid,
        //             phone1: this.formdata.phone1,
        //             phone2: this.formdata.phone2,
        //             address1: this.formdata.hospitaladdressone,
        //             address2: this.formdata.hospitaladdresstwo,
        //             pincode: this.formdata.pincode,
        //             city: this.formdata.cityname,
        //             state: this.formdata.statename,
        //             country: this.formdata.countryname
        //         }),
        //         payment: this.fb.group({
        //             fees: this.formdata.paymentdetails.paymenttype,
        //             initialvisit: '',
        //             subsequentvisit: '',
        //             from: '',
        //             to: '',
        //             creditcard: 'No'
        //         }),
        //         prescriptionsettings: this.fb.group ( {
        //             defaultheader: 'No',
        //             defaultfooter: 'No',
        //             header: this.formdata.headersize,
        //             footer: this.formdata.footersize
        //         })
        //     });
        //
        //     if ( this.form.controls.payment.value.fees == 1) {
        //         this.fixed = true;
        //         this.range = false;
        //         this.form.controls.payment.patchValue({'initialvisit': this.formdata.paymentdetails.maxrate});
        //         this.form.controls.payment.patchValue({'subsequentvisit': this.formdata.paymentdetails.minmrate});
        //     } else if ( this.form.controls.payment.value.fees == 2) {
        //         this.fixed = false;
        //         this.range = true;
        //         this.form.controls.payment.patchValue({'from': this.formdata.paymentdetails.minmrate});
        //         this.form.controls.payment.patchValue({'to': this.formdata.paymentdetails.maxrate});
        //     }
        //     if (this.formdata.headersize != 0) {
        //         this.form.controls.prescriptionsettings.patchValue({'defaultheader': 'Yes'});
        //         this.form.controls.prescriptionsettings.patchValue({'defaultfooter': 'Yes'});
        //         this.defaultchecked = true;
        //         this.header = true;
        //         this.previewheader = false;
        //     } else {
        //         this.form.controls.prescriptionsettings.patchValue({'defaultheader': 'No'});
        //         this.form.controls.prescriptionsettings.patchValue({'defaultfooter': 'No'});
        //         this.defaultchecked = false;
        //         this.header = false;
        //         this.previewheader = false;
        //     }
        //     if (this.formdata.paymentdetails.creditcard == 'No') {
        //         this.creditChecked = false;
        //         this.form.controls.payment.patchValue({'creditcard': 'No'});
        //     } else if (this.formdata.paymentdetails.creditcard == 'Yes') {
        //         this.creditChecked = true;
        //         this.form.controls.payment.patchValue({'creditcard': 'Yes'});
        //     }
        //     this.headersize1 = this.formdata.headersize;
        //     this.footersize1 = this.formdata.footersize;
        // } else {
        //     this.user = new User();
        //     this.user.profile = new UserProfile();
        //     this.user.work = new UserWork();
        //     this.user.contacts = new UserContacts();
        //     this.user.social = new UserSocial();
        //     this.user.settings = new UserSettings();
        // }
    }
    readUrl(event: any) {
        this.size = event.srcElement.files[0].size;
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();

            reader.onload = (event: any) => {
                this.getUrl1 = [];
                this.url = event.target.result;
                this.getUrl = this.url.split(',');
                this.getUrl1.push(this.url.split(','));
                // this.onUploadFinished(this.getUrl);

            }
            reader.readAsDataURL(event.target.files[0]);
        }

    }
    onUploadFinished(event) {
        this.getUrl = event[1];
        // const data = {
        //     'platform': 'web',
        //     'images': this.getUrl,
        //     'uploadtype': 'single'
        // }
        // this.clinic.fileUpload(data).subscribe(
        //     (successData) => {
        //         this.fileUploadSuccess(successData);
        //     },
        //     (error) => {
        //         this.fileUploadFailure(error);
        //     }
        // );
    }
    // public fileUploadSuccess(successData) {
    //     if (successData.IsSuccess == true) {
    //         this.fileUploadPath =  successData.ResponseObject.imagePath;
    //         this.imagepath = this.fileUploadPath;
    //     } else {
    //         this.toastr.error(successData.ErrorObject, 'Failed');
    //     }
    //
    //
    // }
    // public fileUploadFailure(error) {
    //     console.log(error);
    // }
    submit() {
        const data = {
            'admin_id': this.auth.getAdminId(),
            'admin_roleid': this.auth.getAdminRoleId(),
            'platform': 'web',
            'pos_firstname': this.form.controls['firstname'].value,
            'pos_lastname': this.form.controls['lastname'].value,
            'pos_dob': '10-03-1990',
            'pos_mobileno': this.form.value['contacts']['phone1'],
            'pos_email': this.form.value['contacts']['email'],
            'pos_address1': this.form.value['contacts']['address1'],
            'pos_address2': this.form.value['contacts']['address2'],
            'pos_postalcode': this.form.value['contacts']['pincode'],
            'pos_cityid': '1',
            'pos_stateid': '1',
            'pos_countryid': '1',
            'pos_aadhar_no': this.form.value['documents']['aadharnumber'],
            'pos_aadhar_front_img': '/images/front.jpg',
            'pos_aadhar_back_img': '/images/back.jpg',
            'pos_pan_no': this.form.value['documents']['pannumber'],
            'pos_pan_img': '/images/pancard.jpg',
            'pos_education': this.form.value['education']['qualification'],
            'pos_education_doc_img': '/images/edu_certificate.jpg'
        };
        console.log(data);
        this.login.RegisterPos(data).subscribe(
            (successData) => {
                this.RegisterPosSuccess(successData);
            },
            (error) => {
                this.RegisterPosFailure(error);
            }
        );
    }
    RegisterPosSuccess(successData) {
        console.log(successData);
        if (successData.IsSuccess) {
            // this.router.navigate(['/login']);
            this.toastr.success('Registration Completed', 'Success!!!');
        }
    }
    RegisterPosFailure(error) {
        console.log(error);
    }
    // getPostal(pin) {
    //     this.pin = pin;
    //     const data = {
    //         'platform': 'web',
    //         'roleid': this.auth.getRoleId(),
    //         'doctorid': this.auth.getDoctorId(),
    //         'userid': this.auth.getUserId(),
    //         'pincode': this.pin
    //     }
    //     if (pin.length == 6) {
    //         this.common.getPostal(data).subscribe(
    //             (successData) => {
    //                 this.getpostalSuccess(successData);
    //             },
    //             (error) => {
    //                 this.getpostalFailure(error);
    //             }
    //         );
    //     }
    // }
    // public getpostalSuccess(successData) {
    //     this.response = successData.ResponseObject;
    //     if (successData.IsSuccess == true) {
    //         this.form.controls.contacts.patchValue({'city': this.response.city});
    //         this.form.controls.contacts.patchValue({'state': this.response.state});
    //         this.form.controls.contacts.patchValue({'country': this.response.country});
    //     } else {
    //         this.toastr.error(successData.ErrorObject, 'Failed');
    //     }
    //     // this.form = this.fb.group({
    //     //     username: this.formdata.patientname ? this.formdata.patientname : '',
    //     //     password: this.formdata.patientname ? this.formdata.patientname : '',
    //     //     profile: this.fb.group({
    //     //         name: this.formdata.patientname ? this.formdata.patientname : '',
    //     //         relationship: this.formdata.relationship ? this.formdata.relationship : '',
    //     //         surname: null,
    //     //         birthday: this.formdata.dateofbirth ? this.formdata.dateofbirth : '',
    //     //         gender: this.formdata.gender ? this.formdata.gender : '',
    //     //         image: null
    //     //     }),
    //     //     contacts: this.fb.group({
    //     //         email: this.formdata.emailid ? this.formdata.emailid : '',
    //     //         phone: this.formdata.mobilenumber ? this.formdata.mobilenumber : '',
    //     //         address1: this.formdata.address1 ? this.formdata.address1 : '',
    //     //         address2: this.formdata.address2 ? this.formdata.address2 : '',
    //     //         pincode: this.formdata.pincode ? this.formdata.pincode : this.pin,
    //     //         city: this.formdata.city ? this.formdata.city : this.response.city,
    //     //         state: this.formdata.state ? this.formdata.state : this.response.state,
    //     //         country: this.formdata.country ? this.formdata.country : this.response.country
    //     //     }),
    //     // });
    // }
    //
    // public getpostalFailure(error) {
    //     console.log(error);
    // }

    public keyPress(event: any) {
        if (event.charCode !== 0) {
            const pattern = /[0-9\\ ]/;
            const inputChar = String.fromCharCode(event.charCode);

            if (!pattern.test(inputChar)) {
                // invalid character, prevent input
                event.preventDefault();
            }
        }
    }

}
