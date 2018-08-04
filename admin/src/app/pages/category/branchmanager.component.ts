import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService} from '../../shared/services/auth.service';
import { ConfigurationService} from '../../shared/services/configuration.service';
import { BranchService} from '../../shared/services/branch.service';
import { DatatableComponent} from '@swimlane/ngx-datatable';
import { MatDialog } from '@angular/material';
import { DateAdapter} from '@angular/material';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import { MomentDateAdapter} from '@angular/material-moment-adapter';
import { Settings} from '../../app.settings.model';

export const MY_FORMATS = {
    parse: {
        dateInput: 'DD/MM/YYYY',
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MM YYYY',
        dateA11yLabel: 'DD/MM/YYYY',

        monthYearA11yLabel: 'MM YYYY',
    },
};
@Component({
  selector: 'app-branchmanager',
  templateUrl: '../branchmanager/branchmanager.component.html',
  styleUrls: ['../branchmanager/branchmanager.component.scss'],
    providers: [
{provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
{provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
]
})
export class BranchmanagerComponent implements OnInit {
    public webhost: any;
    public data: any;
    @ViewChild(DatatableComponent) table: DatatableComponent;
    editing = {};
    rows = [];
    temp = [];
    selected = [];
    loadingIndicator: boolean = true;
    public response: any;
    public status: any;
    public selectedBranch: any;
    public branchLists: any;
    public total: any;
    public settings: Settings;

    constructor(public auth: AuthService, public config: ConfigurationService, public branch: BranchService, public dialog: MatDialog) {
    }

    ngOnInit() {
        this.branchManagerList([]);
        this.branchList();
    }

    public branchManagerList(value) {
        const data = {
            'platform': 'web',
            'roleid': this.auth.getAdminRoleId(),
            'userid': this.auth.getAdminId(),
            'branch_id': value,
        };

        this.branch.branchManagerList(data).subscribe(
            (successData) => {
                this.branchSuccess(successData);
            },
            (error) => {
                this.branchFailure(error);
            }
        );
    }

    public branchSuccess(success) {
        console.log(success);
        this.loadingIndicator = false;
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
                return d.Firstname.toLowerCase().indexOf(val) !== -1 || !val;
            });
            this.rows = temp;
            console.log(this.rows, 'opo');
            this.table.offset = 0;
        }

        public branchFailure(error) {

    }

    public branchList() {
        const data = {
            'platform': 'web',
            'roleid': this.auth.getAdminRoleId(),
            'userid': this.auth.getAdminId()
        };
        this.loadingIndicator = true;

        this.branch.branchList(data).subscribe(
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
    changeList() {
       this.branchManagerList(this.selectedBranch);

    }
    }


