import {Component, OnInit, ViewChild} from '@angular/core';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Settings} from '../../app.settings.model';
import {AuthService} from '../../shared/services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {BranchService} from '../../shared/services/branch.service';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {PathPopupComponent} from './path-popup/path-popup.component';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { saveAs } from 'file-saver';
import { ResponseType } from '@angular/http';

@Component({
  selector: 'app-career-list',
  templateUrl: './career-list.component.html',
  styleUrls: ['./career-list.component.scss']
})
export class CareerListComponent implements OnInit {
  public webhost: any;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  editing = {};
  rows = [];
  temp = [];
  selected = [];
  loadingIndicator: boolean = true;
  public response: any;
  public status: any;
  public total: any;
  public settings: Settings;
  val: any;
  col: any;
  list: boolean;
  img: any;
  statusList: any;
  statusValue: any;
  constructor(public auth: AuthService, public http: HttpClient, private toastr: ToastrService, public config: ConfigurationService, public branchservice: BranchService, public dialog: MatDialog, public router: Router) {
  this.col = ['one'];
  this.list = false;
  }

  ngOnInit() {
    this.careerList();
    this.getStatusDetails();
  }
  public careerList() {
    const data = {
      'platform': 'web',
    };

    this.branchservice.careerDetails(data).subscribe(
        (successData) => {
          this.careerSuccess(successData);
        },
        (error) => {
          this.careerFailure(error);
        }
    );
  }

  public careerSuccess(success) {
    console.log(success);
    this.loadingIndicator = false;
    if (success.IsSuccess) {
      this.total = success.ResponseObject.length;
      this.rows = success.ResponseObject;
      console.log(this.rows, 'this.rows');
      this.temp = success.ResponseObject;
    } else {
    }
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      if(d.applicant_name.toLowerCase().indexOf(val) !== -1  || d.applicant_email.toLowerCase().indexOf(val) !== -1 || d.applicant_mobile.toLowerCase().indexOf(val) !== -1 || !val){
        return d.applicant_name.toLowerCase().indexOf(val) !== -1 ||  d.applicant_email.toLowerCase().indexOf(val) !== -1 || d.applicant_mobile.toLowerCase().indexOf(val) !== -1 || !val;

      }
    });
    this.rows = temp;
    this.table.offset = 0;
  }
  searchFilter(event){
    console.log(event, 'event');
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      if(d.status.toLowerCase().indexOf(val) !== -1){
        return d.status.toLowerCase().indexOf(val) !== -1;
      }
    });
    this.rows = temp;
    this.table.offset = 0;
  }
  public careerFailure(error) {
    this.loadingIndicator = false;


  }
  getMail(value){
    const dialogRef = this.dialog.open(PathPopupComponent, {
      width: '900px', data: {careerid : value.id, email: value.applicant_email},
        height: '500px'
    });
    dialogRef.afterClosed().subscribe(res => {

    });  }

  path(i){
    this.list = true;
  }
imageDownload() {
  alert();
  // let currenturl = this.config.getimgUrl();
  // // window.open(currenturl + '/' + value.file_path, '_top');
// public downloadCSVFile(){
//     this.downloadPdf().subscribe(
//         (res) => {
//           saveAs(res,'test.pdf')
//         }
//     );
//
//
//   }
//   this.downloadPdf().subscribe(
//       (res) => {
//         saveAs(res, 'test.pdf')
//       }
//   );
}

  public downloadPdf(){
    let url= 'http://13.127.24.123/vizza/uploads/careers/GVvuUlv.pdf';
  // const httpOptions = {
  //   headers: new HttpHeaders({'Content-Type': 'application/pdf'})
  // };
  // return this.http.get(url , httpOptions)
  // // return this.http.post(url , httpOptions).map(
  // //     (res) => {
  // //       saveAs(res, 'test.pdf')
  // //
  // //
  // //     })
    let headers = new Headers();
    // headers.append('Authorization', 'JWT ' + localStorage.getItem('id_token'));
    // return this.http.get(url,{  headers: headers, responseType: ResponseContentType.Blob }).map(
    //     (res) => {
    //       return new Blob([res.blob()], { type: 'application/pdf' })
    //     })
}
// status DropDown
  getStatusDetails(){
    const data = {
      'platform': 'web',
    };
    this.branchservice.getStatus(data).subscribe(
        (successData) => {
          this.getStatusSuccess(successData);
        },
        (error) => {
          this.getStatusFailure(error);
        }
    );
  }
     public getStatusSuccess(successData){
       if (successData.IsSuccess) {
         this.statusList = successData.ResponseObject;
       }
   }
      public getStatusFailure(error){

  }

  //update status
  updateStatusDetails(row){
      const data = {
        'platform': 'web',
        'status' : row.status,
        'id' : row.id
      };
      this.branchservice.updateStatus(data).subscribe(
          (successData) => {
            this.updateStatusSuccess(successData);
          },
          (error) => {
            this.updateStatusFailure(error);
          }
      );
    }
      public updateStatusSuccess(successData){
        this.careerList();
      }
      public updateStatusFailure(error){

      }

}
