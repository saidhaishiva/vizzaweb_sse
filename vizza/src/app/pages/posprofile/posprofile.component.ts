import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import {Settings} from '../../app.settings.model';
import {AppSettings} from '../../app.settings';
import { ConfigurationService } from '../../shared/services/configuration.service';
import { listTransition } from '../../theme/utils/app-animation';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ActivatedRoute, Params } from '@angular/router';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { AgmCoreModule } from '@agm/core';
import { CommonService } from '../../shared/services/common.service';

declare var google: any;

@Component({
  selector: 'app-posprofile',
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
    public webhost: any;
    public doctorid: number;
    public lat: any;
    public lng: any;
    public zoom: any;
    public clinic: any;
    public selectClinic: any;
    public hospitalimages: any;
    recordsperpage: any;
    pageno: any;
    pageOffSet: any;
    rows = [];
    temp = [];
    feedbackcount: any;


    constructor(public route: ActivatedRoute, public auth: AuthService, public common: CommonService, public appSettings: AppSettings, public config: ConfigurationService, public dialog: MatDialog) {
        this.settings = this.appSettings.settings;
        this.recordsperpage = 10;
        this.pageno = 1;
    }

  ngOnInit() {
      console.log(this.settings, 'settings');
      this.zoom = 15;
      this.webhost = this.config.getimgUrl();
      this.route.params.forEach((params: Params) => {
          console.log(params.id, 'paramssssss');
       this.doctorid = params.id;
       this.selectClinic = params.hospitalid;
      });
      this.getPosProfile();
      this.getFeedback();
      // this.settings.loadingSpinner = false;

  }
    setPage(pageInfo) {
        this.pageno = pageInfo.offset + 1;
        this.pageOffSet = pageInfo.offset;
        this.getFeedback();
    }
  public getPosProfile() {
      console.log(this.settings.loadingSpinner);
      this.settings.loadingSpinner = true;
      console.log(this.settings, 'settings');
      const data = {
      'platform': 'web',
        'roleid': '5',
        'userid': this.auth.getPosUserId(),
        'pos_id': this.auth.getPosUserId()
    };
      this.common.getPosProfile(data).subscribe(
          (successData) => {
              this.getPosProfileSuccess(successData);

          },
          (error) => {
              this.getPosProfileFailure(error);
          }
      );
  }
    getPosProfileSuccess(successData) {
        console.log(successData);
        if (successData.IsSuccess) {
            this.settings.loadingSpinner = false;
            this.personal = successData.ResponseObject[0];
        }
    }
    getPosProfileFailure(error) {
    console.log(error);
    }
    getFeedback() {
        this.rows = [];
        this.temp = [];
        // this.feedbackcount = 0;
        // const data = {
        //     'patientid': this.auth.getPatientid(),
        //     'platform': 'web',
        //     'roleid': 2,
        //     'userid': this.auth.getPatientid(),
        //     'doctorid': this.doctorid,
        //     'recordsperpage': this.recordsperpage,
        //     'pageno': this.pageno
        // };
        // this.patientService.getFeedback(data).subscribe(
        //     (successData) => {
        //         this.getFeedbackSuccess(successData);
        //
        //     },
        //     (error) => {
        //         this.getFeedbackFailure(error);
        //     }
        // );
    }
    getFeedbackSuccess(successData) {
        console.log(successData);
        if (successData.IsSuccess) {
            if (successData.ResponseObject.total > 0 ) {
                console.log(successData.ResponseObject.records, 'records');
                this.rows = successData.ResponseObject.records;
                this.temp = successData.ResponseObject.records;
                this.feedbackcount = successData.ResponseObject.records.length;
            } else {
                this.feedbackcount = 0;
                this.rows = [];
                this.temp = [];
            }
        }
    }
    getFeedbackFailure(error) {
        console.log(error);
    }
    changeClinic(clinic, index) {
      this.clinic = this.clinicDetails[index];
        this.lat = parseFloat(this.clinicDetails[index].latitude);
        this.lng = parseFloat(this.clinicDetails[index].longitude);
        if (this.clinic.hospitalimage == null) {
            this.hospitalimages = '';
        } else {
            this.hospitalimages = this.clinicDetails[index].hospitalimage.split(',');
        }
      console.log(this.clinic, 'clinicccccc');
    }


}
