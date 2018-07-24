import { Component, OnInit, ViewChild } from '@angular/core';
import { Settings} from '../../app.settings.model';
import { AppSettings} from '../../app.settings';
import { AuthService} from '../../shared/services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute,Router} from '@angular/router';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {CategoryService} from '../../shared/services/category.service';
import {AddsubjectComponent} from '../subject/addsubject/addsubject.component';
import {AddcategoryComponent} from './addcategory/addcategory.component';
import {MatDialog} from '@angular/material';
import {DatatableComponent} from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
    public webhost: string;
    public settings: Settings;
    @ViewChild(DatatableComponent) table: DatatableComponent;
    rows = [];
    temp = [];
    categoryList: any;
    selected = [];
    loadingIndicator: boolean = true;
    pageOffSet: any;
    pageno: string;
    columns = [
        {prop: 'categoryid'},
        {prop: 'categoryname'},
        {prop: 'categorystatus'}
    ];

  constructor(public router: Router, public route: ActivatedRoute,
              public appSettings: AppSettings, private toastr: ToastrService, public dialog: MatDialog, public auth: AuthService,
              public config: ConfigurationService, public categoryService: CategoryService ) {
      this.settings = this.appSettings.settings;
      this.webhost = this.config.getimgUrl();
  }

  ngOnInit() {
     this.getCategoryList();
  }
    public getCategoryList() {
        // this.settings.loadingSpinner = true;
        const data = {
            'adminid': this.auth.getAdminId(),
            'platform': 'web',
        };
        this.categoryService.getCategoryList(data).subscribe(
            (successData) => {
                this.getCategorySuccess(successData);

            },
            (error) => {
                this.getCategoryFailure(error);
            }
        );
    }
    public getCategorySuccess(successData) {
        console.log(successData, 'successData');
        this.settings.loadingSpinner = false;
        this.categoryList = successData.ResponseObject;
        this.rows = this.categoryList;
        this.temp = this.categoryList;
        console.log(this.rows, 'this.rowsthis.rowsthis.rows');

    }
    public getCategoryFailure(error) {
    }
    openDialog(): void {
        let dialogRef = this.dialog.open(AddcategoryComponent, {
            width: '500px'
        });
        dialogRef.afterClosed().subscribe((result) => {
            console.log(result);
            if(result){
                this.getCategoryList();
            }
        });

    }
    updateFilter(event) {
        const val = event.target.value.toLowerCase();

        // filter our data
        const temp = this.temp.filter(function(d) {
            return d.category_name.toLowerCase().indexOf(val) !== -1 || !val;
        });

        // update the rows
        this.rows = temp;
        // Whenever the filter changes, always go back to the first page
        this.table.offset = 0;

    }

}
