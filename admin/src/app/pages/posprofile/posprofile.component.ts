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

import {PosnotesComponent} from './posnotes/posnotes.component';
declare var google: any;

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
    posData: any;


    constructor(public route: ActivatedRoute, public auth: AuthService, public doctorService: DoctorsService, private toastr: ToastrService, public router: Router, public authService: AuthService,
                public appSettings: AppSettings, public common: CommonService, public config: ConfigurationService, public dialog: MatDialog) {

        this.physical = [];
        this.online = [];
        this.currentTap = 0;
        this.onlineVerificationMessage = '';
        this.physicalVerificationNotes = '';
        this.onlineVerificationNotes = '';
        this.qualifications = [];
        this.registrationDetails = [];
        this.specialityDetails = [];
        this.images = [];
        this.signature = [];
        this.doctor = [];
        this.personal = [];
        this.doctorExperience = [];
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
      this.getPOSList();
      this.getFields();

  }

    viewImage(path, title) {
        const dialogRef = this.dialog.open(ClinicimageviewComponent, {
            width: '800px',
            data: {'img': path, 'title': title}

        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }
    getPOSList() {
        // this.settings.loadingSpinner = true;
        const data = {
            'platform': 'web',
            'role_id': this.auth.getAdminRoleId(),
            'admin_id': this.auth.getAdminId(),
            'status': this.posstatus
        };
        this.common.getPOSList(data).subscribe(
            (successData) => {
                this.getPOSListSuccess(successData);
            },
            (error) => {
                this.getPOSListFailure(error);
            }
        );
    }
    getPOSListSuccess(successData) {
        if (successData.IsSuccess) {
            this.settings.loadingSpinner = false;
            this.response = successData.ResponseObject;
            if (successData.ResponseObject.length > 0) {
                for (let i = 0; i < this.response.length; i++) {
                    if (this.response[i].pos_status == this.posstatus && this.response[i].pos_id == this.posid) {
                        this.posData = this.response[i];
                    }
                }
            } else {
                this.posData = this.response;
            }
        } else {
            this.settings.loadingSpinner = false;
        }
    }
    getPOSListFailure(error) {
        console.log(error);
    }
    getFields() {
        const data = {
            'platform': 'web',
            'role_id': this.auth.getAdminRoleId(),
            'admin_id': this.auth.getAdminId(),
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
        console.log(successData, 'filedlistsss');
        if (successData.IsSuccess) {
            this.online = successData.ResponseObject;
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
    verificationSubmit() {
        this.field = [];

        for (let i=0; i < this.online.length; i++) {
            // if (i == 0) {
                this.field.push({
                    verification_status: (this.online[i].checked == true) ? '1' : '0',
                    // verifiedby: 1,
                    fieldid: this.online[i].doc_field_id,
                });
            // } else {
                // this.field.push({
                //     verification_status: (this.online[i].checked == true) ? '1' : '0',
                //     fieldid: this.online[i].doc_field_id,
                // });
            // }
        }
        const data = {
            'platform': 'web',
            'role_id': this.auth.getAdminRoleId(),
            'admin_id':  this.auth.getAdminId(),
            'fields': this.field,
            'online_verification_notes': this.onlineVerificationNotes,
            'online_verification_message': this.onlineVerificationMessage,
            'pos_id': this.posid
        };
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
    }
    verificationFailure(error) {
    console.log(error);
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
    rejectPOS() {
        const data = {
            'platform': 'web',
            'role_id': this.auth.getAdminRoleId(),
            'admin_id':  this.auth.getAdminId(),
            'online_verification_notes': this.onlineVerificationNotes,
            'online_verification_message': this.onlineVerificationMessage,
            'pos_id': this.posid
        };
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
        if (successData.IsSuccess) {
            this.toastr.success('Doctor rejected successfully');
            this.router.navigate(['/pos']);
        }

    }
    rejectPOSFailure(error) {
        console.log(error);
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

