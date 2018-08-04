import {Component, OnInit, ViewChild} from '@angular/core';
import {BranchService} from '../../shared/services/branch.service';
import {AuthService} from '../../shared/services/auth.service';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {MatDialog} from '@angular/material';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Settings} from '../../app.settings.model';

@Component({
  selector: 'app-branchcoordinator',
  templateUrl: './branchcoordinator.component.html',
  styleUrls: ['./branchcoordinator.component.scss']
})
export class BranchcoordinatorComponent implements OnInit {
    public webhost: any;
    public data: any;
    @ViewChild(DatatableComponent) table: DatatableComponent;
    editing = {};
    rows = [];
    temp = [];
    selected = [];
    public response: any;
    public status: any;
    public selectedBranch: any;
    loadingIndicator: boolean = true;
    public total: any;
    public  branchLists: any;
    public settings: Settings;
  constructor(public auth: AuthService, public config: ConfigurationService, public branchservice: BranchService, public dialog: MatDialog) { }

  ngOnInit() {
  }
    public branchcoordinatorList() {

        const data = {
            'platform': 'web',
            'roleid': this.auth.getAdminRoleId(),
            'userid': this.auth.getAdminId(),

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
            'branch_id': []
        };
        this.loadingIndicator = false;

        this.branchservice.branchCoordinatorList(data).subscribe(
            (successData) => {
                this.coordinatorListSuccess(successData);
            },
            (error) => {
                this.coordinatorListFailure(error);
            }
        );
    }
    public coordinatorListSuccess(success) {
        this.loadingIndicator = false;

        console.log(success);
        if (success.IsSuccess) {
            this.branchLists = success.ResponseObject;

        } else {
        }
    }

    public coordinatorListFailure(error) {

    }
}
