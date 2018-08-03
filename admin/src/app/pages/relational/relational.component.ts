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
    public total: any;
    public settings: Settings;
  constructor(public auth: AuthService, public config: ConfigurationService, public branchservice: BranchService,public dialog: MatDialog
  ) { }

  ngOnInit() {
  }
    public relationalManagerList(value) {

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
    }


