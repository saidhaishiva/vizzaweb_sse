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
import { GoogleMapsAPIWrapper } from '@agm/core';
import { AgmCoreModule } from '@agm/core';
import {DoctornotesComponent} from './doctornotes/doctornotes.component';
import { ToastrService } from 'ngx-toastr';
import {Router } from '@angular/router';


declare var google: any;

@Component({
  selector: 'app-doctorprofile',
  templateUrl: './doctorprofile.component.html',
  styleUrls: ['./doctorprofile.component.scss'],
    animations: [ listTransition ],
    host: {
        '[@listTransition]': ''
    }
})
export class DoctorprofileComponent implements OnInit {
    public settings: Settings;
    public personal: any;
    public clinicDetails: any;
    public professional: any;
    public signature: any;
    public webhost: any;
    public doctorid: number;
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


    constructor(public route: ActivatedRoute, public auth: AuthService, public doctorService: DoctorsService, private toastr: ToastrService, public router: Router, public authService: AuthService,
                public appSettings: AppSettings, public config: ConfigurationService, public dialog: MatDialog) {

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
            this.doctorid = params.id;
        });

    }

  ngOnInit() {
        this.zoom = 15;
      this.settings = this.appSettings.settings;
      this.webhost = this.config.getimgUrl();


      this.settings.loadingSpinner = false;

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


    getNotes(title) {
        const dialogRef = this.dialog.open(DoctornotesComponent, {
            width: '800px',
            data: {title: title, doctorid: this.doctorid}
        });

        dialogRef.afterClosed().subscribe(result => {

            if (result.title === 'Notify') {
                this.onlineVerificationMessage = result.type;
            } if (result.title === 'Physical Comments') {
                this.physicalVerificationNotes = result.type;
            } if (result.title === 'Online Comments') {
                this.onlineVerificationNotes = result.type;
            }

        });
    }
    getDoctorProfileSuccess(successData) {
    if (successData.IsSuccess) {
      this.personal = successData.ResponseObject.personalDetails;
      console.log(this.personal);
      this.clinicDetails = successData.ResponseObject.clinicDetails;
      this.professional = successData.ResponseObject.professionalDetails;
      this.qualifications = this.professional.qualifications;
      this.doctorExperience = this.professional.doctorExperience[0];
      console.log(this.doctorExperience);
      this.specialityDetails = this.professional.specialityDetails;
      this.registrationDetails = this.professional.registrationDetails;
      this.doctor = this.professional.doctor;
      this.signature = successData.ResponseObject.signatureDetails;
      this.images = this.professional.images;
      this.lat = parseFloat(successData.ResponseObject.clinicDetails[0].latitude);
      this.lng = parseFloat(successData.ResponseObject.clinicDetails[0].longitude);
      }
    }
    VerificationStatusFailure(error) {
    console.log(error);
    }


    VerificationStatusSuccess(successData) {

        this.verification = successData.ResponseObject.verificationData;
        console.log(this.verification, 'verification');
        for (let i = 0; i < this.verification.length; i++) {
            if (this.verification[i].type == 'physical') {
                this.verification[i].checked = (this.verification[i].verification_status == 1) ? true : false;
                this.physical.push(this.verification[i]);
                } else {
                if (this.verification[i].type == 'online') {
                    this.verification[i].checked = (this.verification[i].verification_status == 1) ? true : false;
                    this.online.push(this.verification[i]);
                }
            }
        }
        console.log(this.verification, 'llkl');
    }
    getDoctorProfileFailure(error) {
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
    rejectConfirm() {
        const dialogRef = this.dialog.open(RejectDoctor, {
            width: '350px',
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result == 'Yes') {
                this.toastr.success('Doctor rejected successfully');
                this.router.navigate(['/pos']);

            }
        });
    }
}

@Component({
    selector: 'rejectdoctor',
    template: `
        <h1 mat-dialog-title>Reject Doctor</h1>
        <div mat-dialog-content>
            <label>Are you sure. Do you want to Reject?</label>
        </div>
        <div mat-dialog-actions style="justify-content: center">
            <button mat-button class="secondary-bg-color" (click)="onNoClick('No')" >Cancel</button>
            <button mat-raised-button color="primary" (click)="onNoClick('Yes')">Ok</button>
        </div>
    `
})
export class RejectDoctor {

    constructor(
        public dialogRef: MatDialogRef<RejectDoctor>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    onNoClick(value) {
        this.dialogRef.close(value);
    }

}

