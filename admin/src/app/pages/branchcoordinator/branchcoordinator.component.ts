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
    // public selectedBranch: any;
    loadingIndicator: boolean = true;
    public total: any;
    public  branchLists: any;
    public settings: Settings;
  constructor(public auth: AuthService, public config: ConfigurationService, public branchservice: BranchService, public dialog: MatDialog) { }

  ngOnInit() {
      this.branchcoordinatorList();
      this.branchList();
  }
    public branchcoordinatorList() {

        const data = {
            'platform': 'web',
            'roleid': this.auth.getAdminRoleId(),
            'userid': this.auth.getAdminId(),
            'branch_id':''
        };

        this.branchservice.branchCoordinatorList(data).subscribe(
            (successData) => {
                this.CoordinatorListSuccess(successData);
            },
            (error) => {
                this.CoordinatorListFailure(error);
            }
        );
    }
    public CoordinatorListSuccess(success) {
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
    updateFilter(event) {

            const val = event.target.value.toLowerCase();
            const temp = this.temp.filter(function(d) {
                return d.firstname.toLowerCase().indexOf(val) !== -1 || !val;
            });
            this.rows = temp;
            console.log(this.rows, 'opo');
            this.table.offset = 0;
        }

    
    public CoordinatorListFailure(error){

    }
    public branchList() {
        const data = {
            'platform': 'web',
            'roleid': this.auth.getAdminRoleId(),
            'userid': this.auth.getAdminId(),
            'branchmanagerid': '',
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
}
