import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {BranchService} from '../../shared/services/branch.service';
import {DatatableComponent} from '@swimlane/ngx-datatable';


@Component({
  selector: 'app-meta-details',
  templateUrl: './meta-details.component.html',
  styleUrls: ['./meta-details.component.scss']
})
export class MetaDetailsComponent implements OnInit {
  public data: any;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  rows = [];
  temp = [];
  selected = [];
  loadingIndicator: boolean = true;
  public total: any;
  public testeditor: any;



  constructor(public auth: AuthService, public config: ConfigurationService, public branchservice: BranchService) { }

  ngOnInit() {
    this.mmetaDetailList();
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      return d.title.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows = temp;
    this.table.offset = 0;
  }

  public mmetaDetailList() {
    const data = {
      'platform': 'web',
      'role_id': this.auth.getAdminRoleId(),
      'adminid': this.auth.getAdminId(),
    };
    this.loadingIndicator = true;

    this.branchservice.metaDetail(data).subscribe(
        (successData) => {
          this.metaDetailSuccess(successData);
        },
        (error) => {
          this.metaDetailFailure(error);
        }
    );
  }
  public metaDetailSuccess(success) {
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
  public metaDetailFailure(error) {
    console.log(error);
  }

}
