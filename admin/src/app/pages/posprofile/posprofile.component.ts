import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { DoctorsService} from '../../shared/services/doctors.service';
import {Settings} from '../../app.settings.model';
import {AppSettings} from '../../app.settings';
import { ConfigurationService } from '../../shared/services/configuration.service';
import { listTransition } from '../../theme/utils/app-animation';
import {ClinicimageviewComponent} from './clinicimageview/clinicimageview.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ActivatedRoute, Params } from '@angular/router';
// import { GoogleMapsAPIWrapper } from '@agm/core';
import { AgmCoreModule } from '@agm/core';
import { ToastrService } from 'ngx-toastr';
import {Router } from '@angular/router';
import { CommonService } from '../../shared/services/common.service';
import {DatePipe} from '@angular/common';
import {PosnotesComponent} from './posnotes/posnotes.component';
declare var google: any;
import {FileSelectDirective, FileDropDirective, FileUploader} from 'ng2-file-upload';


const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
    selector: 'app-doctorprofile',
    templateUrl: './posprofile.component.html',
    styleUrls: ['./posprofile.component.scss'],
    animations: [ listTransition ],
    host: {
        '[@listTransition]': ''
    }
})
export class PosprofileComponent implements OnInit {
    public settings: Settings;
    public personal: any;
    public clinicDetails: any;
    public professional: any;
    public signature: any;
    public webhost: any;
    public posid: any;
    public posstatus: any;
    public lat: any;
    public lng: any;
    public zoom: any;
    public physical: any;
    public verification: any;
    public online: any;
    public currentTap: any;
    public field: any;
    public appointmentdate: any;
    public onlineVerificationMessage: any;
    public onlineVerificationNotes: any;
    public physicalVerificationNotes: any;
    public qualifications: Array<any>;
    public specialityDetails: Array<any>;
    public registrationDetails: Array<any>;
    public images: Array<any>;
    public doctor: Array<any>;
    public doctorExperience: Array<any>;
    response: any;
    documentslist: any;
    notesListCount: any;
    commentsListCount: any;
    posData: any;
    trainingDetails: any;
    startTrainingDate: any;
    examDetails: any;
    aadharBack: any;
    aadharFront: any;
    educationalDoc: any;
    panImage: any;
    panDocId: any;
    educationalDocId: any;
    aadharBackDocId: any;
    aadharfrontDocId: any;
    size: any;
    fileUploadPath: any;
    getUrl1: any;
    url: any;
    getUrl: any;
    doaError: any;
    step: any;
    recentMark: any;
    bankDocId: any;
    bankDoc: any;
    isAlreadyAgent: any;
    isAlreadyAgentId: any;
    allManagerLists: any;
    fileDetails: any;
    allImage: any;
    pdfSrc: any;
    posManager: any;
    roleId: any;
    companyLogo: any;
    companySuccess: any;

    comments: string;
    notes: string;
    rows = [];
    rows1 = [];
    temp = [];

    public uploader:FileUploader = new FileUploader({url: URL});
    public hasBaseDropZoneOver:boolean = false;
    public hasAnotherDropZoneOver:boolean = false;

    public fileOverBase(e:any):void {
        this.hasBaseDropZoneOver = e;
    }

    public fileOverAnother(e:any):void {
        this.hasAnotherDropZoneOver = e;
    }

    constructor(public route: ActivatedRoute, public datepipe: DatePipe, public auth: AuthService, public doctorService: DoctorsService, private toastr: ToastrService, public router: Router, public authService: AuthService,
                public appSettings: AppSettings, public common: CommonService, public config: ConfigurationService, public dialog: MatDialog) {
        this.roleId = this.auth.getAdminRoleId();
        this.physical = [];
        this.fileDetails = [];
        this.online = [];
        this.allImage = [];
        this.currentTap = 0;
        this.onlineVerificationMessage = '';
        this.physicalVerificationNotes = '';
        this.onlineVerificationNotes = '';
        this.appointmentdate = '';
        this.fileUploadPath = [];
        this.qualifications = [];
        this.registrationDetails = [];
        this.specialityDetails = [];
        this.images = [];
        this.signature = [];
        this.doctor = [];
        this.personal = [];
        this.doctorExperience = [];
        this.notes = '';
        this.comments = '';
        this.posManager = '';
        this.step = 0;
        // this.professional = [];
        //  this.personal.profileimagepath = '';
        //   this.professional.doctorExperience.exp = 0;
        //   this.professional.doctorExperience.experiencemonths = 0;

        this.route.params.forEach((params: Params) => {
            console.log(params, 'params');
            this.posid = params.id;
            this.posstatus = params.status;
        });

    }

    ngOnInit() {
        this.zoom = 15;
        this.settings = this.appSettings.settings;
        this.webhost = this.config.getimgUrl();
        // this.settings.loadingSpinner = false;
        this.getPosProfile();
        this.getFields();
        this.getNotify();
        this.getComments();
        this.getTrainingDetails(this.posid);
        this.getExamDetails(this.posid);
        this.managerList();
        this.getCompanyAddress();
        this.getCompany();

    }

    onChange(event: any, input: any) {
        let files = [].slice.call(event.target.files);

        input.value = files.map(f => f.name).join(', ');
        console.log(input.value, 'input.value');
    }

    viewImage(path, title) {
        const dialogRef = this.dialog.open(ClinicimageviewComponent, {
            width: '900px',
            data: {'img': path, 'title': title}

        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }
    getPosProfile() {
        this.settings.loadingSpinner = true;
        const data = {
            'platform': 'web',
            'roleid': this.auth.getAdminRoleId(),
            'adminid': this.auth.getAdminId(),
            'pos_id': this.posid
        };
        this.common.getPosProfileList(data).subscribe(
            (successData) => {
                this.getPosProfileSuccess(successData);
            },
            (error) => {
                this.getPosProfileFailure(error);
            }
        );
    }
    getPosProfileSuccess(successData) {
        console.log(successData, 'successDatasuccessData');
        this.settings.loadingSpinner = false;

        if (successData.IsSuccess) {
            this.posData = successData.ResponseObject;
            if (this.posData.pos_manager_id != null) {
                this.posManager = this.posData.pos_manager_id;
            }
        } else {
            this.settings.loadingSpinner = false;
        }
    }
    getPosProfileFailure(error) {
        console.log(error);
        this.settings.loadingSpinner = false;

    }
    getCompanyAddress() {
        this.settings.loadingSpinner = true;
        const data = {
            'platform': 'web',
            'roleid': this.auth.getAdminRoleId(),
            'adminid': this.auth.getAdminId(),
            // 'pos_id': this.posid
        };
        this.common.getCompanyAddress(data).subscribe(
            (successData) => {
                this.getCompanySuccess(successData);
            },
            (error) => {
                this.getCompanyFailure(error);
            }
        );
    }
    getCompanySuccess(successData) {
        console.log(successData, 'successDatasuccessData');
        this.settings.loadingSpinner = false;

        if (successData.IsSuccess) {
            this.companySuccess = successData.ResponseObject;

        }
    }
    getCompanyFailure(error) {
        console.log(error);
        this.settings.loadingSpinner = false;

    }


    getCompany() {
        this.settings.loadingSpinner = true;
        const data = {
            'platform': 'web',
            'roleid': this.auth.getAdminRoleId(),
            'adminid': this.auth.getAdminId(),
            // 'pos_id': this.posid
        };
        this.common.getLogo1(data).subscribe(
            (successData) => {
                this.getLogoSuccess(successData);
            },
            (error) => {
                this.getLogoFailure(error);
            }
        );
    }
    getLogoSuccess(successData) {
        console.log(successData, 'successDatasuccessData');
        this.settings.loadingSpinner = false;

        if (successData.IsSuccess) {
            this.companyLogo = successData.ResponseObject;

        }
    }
    getLogoFailure(error) {
        console.log(error);
        this.settings.loadingSpinner = false;

    }

    public getTrainingDetails(posid) {
        const data = {
            'platform': 'web',
            'roleid': this.auth.getAdminRoleId(),
            'adminid': this.auth.getAdminId(),
            'pos_id': posid
        };
        this.common.getTrainingDetails(data).subscribe(
            (successData) => {
                this.getTrainingDetailSuccess(successData);

            },
            (error) => {
                this.getTrainingDetailFailure(error);
            }
        );
    }
    getTrainingDetailSuccess(successData) {
        console.log(successData);
        if (successData.IsSuccess) {
            this.trainingDetails = successData.ResponseObject;
            if (typeof (this.trainingDetails) != 'string') {

                for (let i = 0; i < this.trainingDetails.length; i++) {
                    let num = this.trainingDetails[i].entry_time;
                    let hours = (num / 60);
                    let rhours = Math.floor(hours);
                    let minutes = (hours - rhours) * 60;
                    let rminutes = Math.round(minutes);
                    this.trainingDetails[i].time = rhours + " hour(s) and " + rminutes + " minute(s).";
                }
                this.startTrainingDate = this.trainingDetails[0].training_attend_date;
            }


        }
    }
    getTrainingDetailFailure(error) {
        console.log(error);
    }
    public getExamDetails(posid) {
        const data = {
            'platform': 'web',
            'roleid': this.auth.getAdminRoleId(),
            'adminid': this.auth.getAdminId(),
            'pos_id': posid
        };
        this.common.getExamDetails(data).subscribe(
            (successData) => {
                this.getExamDetailSuccess(successData);

            },
            (error) => {
                this.getExamDetailFailure(error);
            }
        );
    }
    getExamDetailSuccess(successData) {
        console.log(successData);
        if (successData.IsSuccess) {
            this.examDetails = successData.ResponseObject;
            let len = successData.ResponseObject.length-1;
            this.recentMark = this.examDetails[len].percentage_in_exam;
        }
    }
    getExamDetailFailure(error) {
        console.log(error);
    }



    getFields() {
        const data = {
            'platform': 'web',
            'role_id': this.auth.getAdminRoleId(),
            'admin_id': this.auth.getAdminId(),
            'pos_id': this.posid

        }
        this.common.getFields(data).subscribe(
            (successData) => {
                this.getFieldsSuccess(successData);
            },
            (error) => {
                this.getFieldsFailure(error);
            }
        );
    }
    getFieldsSuccess(successData) {
        console.log(successData.ResponseObject, 'filedlistsss');
        if (successData.IsSuccess) {
            this.documentslist = successData.ResponseObject;
            for (let i = 0; i < this.documentslist.length; i++) {
                if (this.documentslist[i].doc_verified_status == "0") {
                    this.documentslist[i].checked = false;
                } else  if (this.documentslist[i].doc_verified_status == "1") {
                    this.documentslist[i].checked = true;
                }
            }
            this.aadharFront = this.documentslist[1].checked;
            this.aadharfrontDocId = this.documentslist[1].doc_field_id;
            this.aadharBack = this.documentslist[2].checked;
            this.aadharBackDocId = this.documentslist[2].doc_field_id;
            this.panImage = this.documentslist[0].checked;
            this.panDocId = this.documentslist[0].doc_field_id;
            this.educationalDoc = this.documentslist[3].checked;
            this.educationalDocId = this.documentslist[3].doc_field_id;
            this.bankDoc = this.documentslist[4].checked;
            this.bankDocId = this.documentslist[4].doc_field_id;
            this.isAlreadyAgent = this.documentslist[5].checked;
            this.isAlreadyAgentId = this.documentslist[5].doc_field_id;
            console.log(this.documentslist);

        }
    }
    getFieldsFailure(error) {
        console.log(error);
    }


    getNotes(title) {
        const dialogRef = this.dialog.open(PosnotesComponent, {
            width: '800px',
            data: {title: title, posid: this.posid}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            if (result.title.title =='Notify') {
                this.onlineVerificationNotes = result.type;
            }
            if (result.title.title == 'Physical Comments') {
                this.physicalVerificationNotes = result.type;
            }
            if (result.title.title == 'Online Comments') {
                this.onlineVerificationNotes = result.type;
            }

        });
    }
    readUrl(event: any) {
        console.log(event.target.files, 'event');
        this.pdfSrc = event.target.files[0].name;
        this.getUrl1 = [];
        this.fileDetails = [];
        for (let i = 0; i < event.target.files.length; i++) {
            this.fileDetails.push({'image': '', 'size': event.target.files[i].size, 'type': event.target.files[i].type, 'name': event.target.files[i].name});
        }
        for (let i = 0; i < event.target.files.length; i++) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
            this.url = event.target.result;
            this.getUrl1.push(this.url.split(','));
            this.onUploadFinished(this.getUrl1);
        };
        reader.readAsDataURL(event.target.files[i]);
        }

    }
    onUploadFinished(event) {
        this.allImage.push(event);
        console.log(this.allImage, 'eventevent');
    }
    public fileUploadSuccess(successData) {
        if (successData.IsSuccess == true) {
            this.fileUploadPath =  successData.ResponseObject.filePath;

        } else {
            this.toastr.error(successData.ErrorObject, 'Failed');
        }


    }
    public fileUploadFailure(error) {
        console.log(error);
    }
    addEvent(event) {
        if (event.value != null) {
            console.log(event.value._i,  'kjfhasdjfh');
            let selectedDate = '';
            if (typeof event.value._i == 'string') {
                const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;

                if (pattern.test(event.value._i) && event.value._i.length == 10) {
                    this.doaError = '';
                } else {
                    this.doaError = 'Enter Valid Date';
                }
                selectedDate = event.value._i;
                // this.dob = event.value._i;
            } else if (typeof event.value._i == 'object') {
                console.log(event.value._i.date, 'objectttttt');
                this.doaError = '';
                let date = event.value._i.date;
                if (date.toString().length == 1) {
                    date = '0'+date;
                }
                let month =  (parseInt(event.value._i.month)+1).toString();

                if (month.length == 1) {
                    month = '0' + month;
                }
                let year = event.value._i.year;
                // this.dob = date + '-' + month + '-' + year;
            }
        }
    }

    verificationSubmit() {
        console.log(this.fileDetails, 'this.notes');
        console.log(this.allImage, 'this.this.allImage');
        this.field = [];
        this.field= [{
            verification_status: (this.aadharFront == true) ? '1' : '0',
            fieldid: this.aadharfrontDocId
        },
            {
                verification_status: (this.aadharBack == true) ? '1' : '0',
                fieldid: this.aadharBackDocId
            },
            {
                verification_status: (this.panImage == true) ? '1' : '0',
                fieldid: this.panDocId
            },
            {
                verification_status: (this.educationalDoc == true) ? '1' : '0',
                fieldid: this.educationalDocId
            },
            {
                verification_status: (this.bankDoc == true) ? '1' : '0',
                fieldid: this.bankDocId
            },
            {
                verification_status: (this.isAlreadyAgent == true) ? '1' : '0',
                fieldid: this.isAlreadyAgentId
            }

        ];
        if (this.allImage != '') {
            let length = this.allImage.length-1;
            for (let k = 0; k < this.allImage[length].length; k++) {
                this.fileDetails[k].image = this.allImage[length][k][1];
            }
        }
        //
        //
        //
        // console.log(this.fileUploadPath, 'this.fileUploadPath');
        // console.log(this.fileDetails, 'this.fileDetails');

        let appointDate = this.datepipe.transform(this.appointmentdate, 'y-MM-dd');
        const data = {
            'platform': 'web',
            'role_id': this.auth.getAdminRoleId(),
            'admin_id':  this.auth.getAdminId(),
            'fields': this.field,
            'online_verification_notes': this.notes,
            'online_verification_message': this.comments,
            'pos_id': this.posid,
            'flag': 'pos',
            'pos_manager_id': this.posManager,
            'appointment_date': appointDate == undefined ? '' : appointDate,
            'agreement_filepath': this.fileDetails ? this.fileDetails : '',
            'already_aget': this.isAlreadyAgent ? 1 : 0
        };
        this.settings.loadingSpinner = true;
        this.common.updateVerification(data).subscribe(
            (successData) => {
                this.verificationSuccess(successData);
            },
            (error) => {
                this.verificationFailure(error);
            }
        );


    }
    verificationSuccess(successData) {
        console.log(successData);
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {
            this.getPosProfile();
            this.toastr.success('Verification successfully');
            this.getNotify();
            this.getComments();
            this.comments = '';
            this.notes = '';
            this.router.navigate(['/pos']);
        }
    }
    verificationFailure(error) {
        console.log(error);
        this.settings.loadingSpinner = false;
    }
    onSelectedIndexChange(newTabIndex) {
        this.currentTap = newTabIndex;
    }

    updateVerificationSuccess(successData) {
        console.log(successData);
        if (successData.IsSuccess) {
            this.router.navigate(['/pos']);
        }
    }
    updateVerificationFailure(error) {
        console.log(error);
    }

    getNotify() {
        const data = {
            'platform': 'web',
            'role_id': this.auth.getAdminRoleId(),
            'admin_id': this.auth.getAdminId(),
            'pos_id': this.posid,
            'message_type': 'notes'

        }
        this.common.getNotes(data).subscribe(
            (successData) => {
                this.getNotifySuccess(successData);
            },
            (error) => {
                this.getNotifyFailure(error);
            }
        );
    }
    getNotifySuccess(successData) {
        console.log(successData, 'filedlistsss');
        if (successData.IsSuccess) {
            this.notesListCount = successData.ResponseObject.length;
            this.rows =  successData.ResponseObject;

            console.log(this.notesListCount);

        }
    }
    getNotifyFailure(error) {
        console.log(error);
    }

    public managerList() {
        const data = {
            'platform': 'web',
            'role_id': this.auth.getAdminRoleId(),
            'adminid': this.auth.getAdminId()
        };
        this.common.branchList(data).subscribe(
            (successData) => {
                this.branchListSuccess(successData);
            },
            (error) => {
                this.branchListFailure(error);
            }
        );
    }
    public branchListSuccess(success) {
        console.log(success);
        if (success.IsSuccess) {
            this.allManagerLists = success.ResponseObject;

        } else {
        }
    }

    public branchListFailure(error) {

    }

    getComments() {
        const data = {
            'platform': 'web',
            'role_id': this.auth.getAdminRoleId(),
            'admin_id': this.auth.getAdminId(),
            'pos_id': this.posid,
            'message_type': 'comments'

        }
        this.common.getComments(data).subscribe(
            (successData) => {
                this.getCommentSuccess(successData);
            },
            (error) => {
                this.getCommentFailure(error);
            }
        );
    }
    getCommentSuccess(successData) {
        console.log(successData, 'filedlistsss');
        if (successData.IsSuccess) {
            this.commentsListCount = successData.ResponseObject.length;
            this.rows1 =  successData.ResponseObject;
        }
    }
    getCommentFailure(error) {
        console.log(error);
    }
    openPdf(adress) {
        window.open(adress);
    }




    rejectPOS() {
        const data = {
            'platform': 'web',
            'role_id': this.auth.getAdminRoleId(),
            'admin_id':  this.auth.getAdminId(),
            'online_verification_notes': this.notes,
            'online_verification_message': this.comments,
            'pos_id': this.posid
        };
        this.settings.loadingSpinner = true;
        this.common.rejectPOS(data).subscribe(
            (successData) => {
                this.rejectPOSSuccess(successData);
            },
            (error) => {
                this.rejectPOSFailure(error);
            }
        );
    }
    rejectPOSSuccess(successData) {
        console.log(successData);
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {
            this.toastr.success('Rejected successfully');
            this.router.navigate(['/pos']);
        }

    }
    rejectPOSFailure(error) {
        console.log(error);
        this.settings.loadingSpinner = false;
    }
    rejectConfirm() {
        const dialogRef = this.dialog.open(RejectPOS, {
            width: '350px',
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result == 'Yes') {
                this.rejectPOS();

            }
        });
    }

    // print the Appointment letter
    printAppointment () {
        alert()
        let printContents, popupWin;
        printContents = document.getElementById('appointment').innerHTML;
        popupWin = window.open('', '_blank', 'top=100,left=0, bottom=100,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write(`
      <html>
        <head >
         <style>
    .c-card li {
      display: block;
    }
    .c-card header {
      border-bottom: 1px solid #000;
      padding-bottom: 15px;
      }
      .c-card header img {
        width: 320px;
      }
    .c-card .c-content, .c-card .c-address, .c-card p, .c-card table {
      font-size: 16px
    }
    .c-card .print-title{
    width: 100%;
    margin: 0;
    padding: 0;
    margin-bottom: 10px;
    margin-top: 10px;
    text-align: center;
    }
    .c-card footer {
      border-top: 2px solid #1c9a42;
      }
      .c-card footer h5 {
        color: #1c9a42;
      }
      .c-card footer p {
        font-size: 19px;
        margin-bottom: 0;
      }
       .c-card table  tr td {
        padding: 0;
         padding-bottom: 8px;
         padding-right: 8px;
        vertical-align: top;
      }
      .c-card table  tr td p{
          margin: 0;
          margin-bottom: 8px;
      }
       .c-card table  tr td:first-child {
        color: #1c9a42;
      }
      .c-card .print-footer, .c-card .print-sign,  .c-card .c-content{
      width: 100%;
      float: left;
      }
      .print-footer{
      text-align: center;
      }
    
    .view-profile img{
      width:200px
    }
    .c-card .print-profile{
    text-align: right;
    }
    .c-card .print-profile img{
     width: 200px;
     margin-top: 15px;
    }
    .c-card .print-address{
         float: left;
    }
        </style>
        </head>
       <body onload="window.print();window.close()" >${printContents}
       </body>
        
      
      </html>`
        );
        popupWin.document.close();
    }
    // print the training letter
    printTraining () {
        let printContents, popupWin;
        printContents = document.getElementById('training').innerHTML;
        popupWin = window.open('', '_blank', 'top=100,left=0, bottom=100,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write(`
      <html>
        <head >
         <style>
     @media print {
     .c2-card{
  background-image: url("../assets/img/pos-bg.png") !important;
  width: 100%;
  background-size: cover !important;
  }
  .c2-card header{
    border-bottom: 1px solid #006738;
    padding-bottom: 20px;
    }
    .print-head .print-title{
    padding: 0 15px;
    }
     .print-head h5{
     font-size: 12px;
     padding-right: 15px;
     margin-bottom: 5px;
     }
    .c2-card h5{
      color: #006738;
    }
    .c2-card img{
      width: 350px;
    }
    .c2-card .c-profile{
       margin-top: 30px;
    }
    .c2-card .c-profile .c-font{
      font-family: 'Parisienne', cursive;
      font-size: 70px;
      color: #443034;
      text-align: right;
    }
    .c2-card .c-profile h5 span{
      background-color:  #443034;
      color: #666;
      font-size: 20px;
    }
     .c2-card .c-profile h1{
      margin: 0;
      margin-left: 10px;
     }
     .c2-card .profile-pic{
     text-align: left;
     }
     .c2-card .profile-pic img{
     margin-right: 25px;
     
     }
     
    .c2-card .c-profile h5{
    margin-bottom: 0;
    text-align: right;
    }
    
  
  .c2-card .c-content{
    position: relative;
    border: 2px solid #443034;
    border-radius: 30px;
    padding: 25px;
    background: rgba(255, 255, 255, 0.6);
    margin-top: 45px;
    margin-bottom: 30px;
    }
    .c2-card .c-title{
      position: absolute;
      top: -40px;
      right: 0px;
      bottom: 0;
      width: 100%;
      text-align: center;
      }
       .c2-card .c-title span{
        padding: 10px 10px;
        color: #443034;
        font-size: 25px;
        background: rgba(240,24,24,1);
        background: linear-gradient(to right, rgba(240,24,24,1) 0%, rgba(247,148,123,1) 64%, rgba(255,33,33,1) 100%);
      }

    
    .c2-card p{
      font-size: 22px;
    }
 
  .c2-card table {
    font-size: 20px;
    margin: 20px ;
    }
   .c2-card .print-sign{
        text-align: center;
   }
    .c2-card table  tr td {
      padding: 3px 5px;
      vertical-align: top;
    }
    .c2-card table  tr td:first-child {
      color: #443034;
  }
  .c2-card footer{
    font-size: 20px;
     margin-top: 0;
  }
  .c2-card footer.print-sign p{
    margin: 0;
  }
  .c2-card footer img{
     width: 250px;
     margin-top: 15px;
  }
  }
  
        </style>
        </head>
       <body onload="window.print();window.close()" >${printContents}
       </body>
        
      
      </html>`
        );
        popupWin.document.close();
    }
    // print the examination letter
    printExamination () {
        let printContents, popupWin;
        printContents = document.getElementById('examination').innerHTML;
        popupWin = window.open('', '_blank', 'top=100,left=0, bottom=100,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write(`
      <html>
        <head >
         <style>
         @media print {
     .c2-card{
  background-image: url("../assets/img/pos-bg.png") !important;
  width: 100%;
  background-size: cover !important;
  }
  .c2-card header{
    border-bottom: 1px solid #006738;
    padding-bottom: 20px;
    }
    .print-head .print-title{
    padding: 0 15px;
    }
     .print-head h5{
     font-size: 12px;
     padding-right: 15px;
     margin-bottom: 5px;
     }
    .c2-card h5{
      color: #006738;
    }
    .c2-card img{
      width: 350px;
    }
    .c2-card .c-profile{
       margin-top: 30px;
    }
    .c2-card .c-profile .c-font{
      font-family: 'Parisienne', cursive;
      font-size: 70px;
      color: #443034;
      text-align: right;
    }
    .c2-card .c-profile h5 span{
      background-color:  #443034;
      color: #666;
      font-size: 20px;
    }
     .c2-card .c-profile h1{
      margin: 0;
      margin-left: 10px;
     }
     .c2-card .profile-pic{
     text-align: left;
     }
     .c2-card .profile-pic img{
     margin-right: 25px;
     
     }
     
    .c2-card .c-profile h5{
    margin-bottom: 0;
    text-align: right;
    }
    
  
  .c2-card .c-content{
    position: relative;
    border: 2px solid #443034;
    border-radius: 30px;
    padding: 20px;
    background: rgba(255, 255, 255, 0.6);
    margin-top: 45px;
    margin-bottom: 30px;
    text-align: center;
    }
     .c2-card .c-content p{
     margin: 0;
     margin-bottom: 8px;
     }
    .c2-card .c-title{
      position: absolute;
      top: -40px;
      right: 0px;
      bottom: 0;
      width: 100%;
      text-align: center;
      }
       .c2-card .c-title span{
        padding: 10px 10px;
        color: #443034;
        font-size: 25px;
        background: rgba(240,24,24,1);
        background: linear-gradient(to right, rgba(240,24,24,1) 0%, rgba(247,148,123,1) 64%, rgba(255,33,33,1) 100%);
      }

    
    .c2-card p{
      font-size: 22px;
    }
 
  .c2-card table {
    font-size: 20px;
    margin: 20px ;
    }
   .c2-card .print-sign{
        text-align: center;
   }
    .c2-card table  tr td {
      padding: 3px 5px;
      vertical-align: top;
    }
    .c2-card table  tr td:first-child {
      color: #443034;
  }
  .c2-card footer{
    font-size: 20px;
     margin-top: 0;
  }
  .c2-card footer.print-sign p{
    margin: 0;
  }
  .c2-card footer img{
     width: 250px;
     margin-top: 15px;
  }
  }
        </style>
        </head>
       <body onload="window.print();window.close()" >${printContents}
       </body>
        
      
      </html>`
        );
        popupWin.document.close();
    }
}

@Component({
    selector: 'rejectpos',
    template: `
        <!--<h1 mat-dialog-title>Reject POS</h1>-->
        <div mat-dialog-content>
            <label>Are you sure. Do you want to Reject?</label>
        </div>
        <div mat-dialog-actions style="justify-content: center">
            <button mat-button class="secondary-bg-color" (click)="onNoClick('No')" >Cancel</button>
            <button mat-raised-button color="primary" (click)="onNoClick('Yes')">Ok</button>
        </div>
    `
})
export class RejectPOS {

    constructor(
        public dialogRef: MatDialogRef<RejectPOS>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    onNoClick(value) {
        this.dialogRef.close(value);
    }


}

