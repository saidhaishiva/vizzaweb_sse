import {Component, OnInit, ViewChild} from '@angular/core';
import { ConfigurationService} from '../../shared/services/configuration.service';
import { AuthService} from '../../shared/services/auth.service';
import { BranchService} from '../../shared/services/branch.service';
import {MatDialog} from '@angular/material';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Settings} from '../../app.settings.model';

@Component({
  selector: 'app-relational',
  templateUrl: './relational.component.html',
  styleUrls: ['./relational.component.scss']
})
export class RelationalComponent implements OnInit {
    public webhost: any;
    public data: any;
    @ViewChild(DatatableComponent) table: DatatableComponent;
    editing = {};
    rows = [];
    temp = [];
    selected = [];
     // loadingIndicator: boolean = true;
    public response: any;
    public status: any;
    public selectedBranch: any;
    loadingIndicator: boolean = true;
    public total: any;
    public  branchLists: any;
    public settings: Settings;
  constructor(public auth: AuthService, public config: ConfigurationService, public branchservice: BranchService,public dialog: MatDialog
  ) { }

  ngOnInit() {
      this.branchList();
      this.relationalManagerList();
  }
    public relationalManagerList() {

        const data = {
            'platform': 'web',
            'roleid': this.auth.getAdminRoleId(),
            'userid': this.auth.getAdminId(),
            'salesmanagerid': ''

        };

        this.branchservice.relationalManagerList(data).subscribe(
            (successData) => {
                this.relationalSuccess(successData);
            },
            (error) => {
                this.relationalFailure(error);
            }
        );
    }
    public relationalSuccess(success) {
        console.log(success);
        // this.loadingIndicator = false;
        if (success.IsSuccess) {
            this.data = success.ResponseObject;
            this.total = success.ResponseObject.length;
            this.rows = this.data;
            this.temp = this.data;
        } else {
        }
    }
    public relationalFailure(error){

        }
    public branchList() {
        const data = {
            'platform': 'web',
            'roleid': this.auth.getAdminRoleId(),
            'userid': this.auth.getAdminId(),
            'branchmanagerid': '',
            'branch_id': []
        };
        this.loadingIndicator = false;

        this.branchservice.branchList(data).subscribe(
            (successData) => {
                this.branchListSuccess(successData);
            },
            (error) => {
                this.branchListFailure(error);
            }
        );
    }
    public branchListSuccess(success) {
        this.loadingIndicator = false;

        console.log(success);
        if (success.IsSuccess) {
            this.branchLists = success.ResponseObject;

        } else {
        }
    }

    public branchListFailure(error) {

    }
    changeManagerList() {
      //  this.relationalManagerList(this.selectedBranch);

    }
    public salesManagerList(value) {

        const data = {
            'platform': 'web',
            'roleid': this.auth.getAdminRoleId(),
            'userid': this.auth.getAdminId(),
            'bm_id': '',
            'branch_id': [],
        };

        this.branchservice.salesManagerList(data).subscribe(
            (successData) => {
                this.salesSuccess(successData);
            },
            (error) => {
                this.salesFailure(error);
            }
        );
    }
    public salesSuccess(success) {
        console.log(success);
        this.loadingIndicator = false;
        if (success.IsSuccess) {
            this.data = success.ResponseObject;
            this.total = success.ResponseObject.length;
} else {
        }
    }
    public salesFailure(error) {

    }
    }


