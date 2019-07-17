import {Component, OnInit, ViewChild} from '@angular/core';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Settings} from '../../app.settings.model';
import {AuthService} from '../../shared/services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {BranchService} from '../../shared/services/branch.service';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {AddtestimonialComponent} from '../testimonial/addtestimonial/addtestimonial.component';
import {PathPopupComponent} from './path-popup/path-popup.component';

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
  constructor(public auth: AuthService,  private toastr: ToastrService, public config: ConfigurationService, public branchservice: BranchService, public dialog: MatDialog, public router: Router) {
  this.col = ['one'];
  this.list = false;
  }

  ngOnInit() {
    this.careerList();
  }
  public careerList() {
    // alert();
    const data = {
      'platform': 'web',
    };
    // this.loadingIndicator = true;

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
    // this.loadingIndicator = false;
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
      return d.applicant_name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows = temp;
    this.table.offset = 0;
  }

  public careerFailure(error) {

  }
  getMail(value){
    const dialogRef = this.dialog.open(PathPopupComponent, {
      width: '900px', data: {careerid : value.id, email: value.applicant_email}
        // height: '500px'
    });
    dialogRef.afterClosed().subscribe(res => {

    });  }

  path(i){
    this.list = true;
  }
imageDownload(value){
  let currenturl = this.config.getimgUrl();
  window.open(currenturl + '/' + value.file_path, '_blank');

}

}
