import { Component, OnInit, ViewChild } from '@angular/core';
import { Settings} from '../../app.settings.model';
import { AppSettings} from '../../app.settings';
import {AuthService} from '../../shared/services/auth.service';
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute,Router} from '@angular/router';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {CategoryService} from '../../shared/services/category.service';
import {AddsubjectComponent} from './addsubject/addsubject.component';
import { DatatableComponent} from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
    public webhost: string;
    public settings: Settings;
    @ViewChild(DatatableComponent) table: DatatableComponent;
    rows = [];
    temp = [];
    subList: any;
    categoryList: any;
    selectedCategory: any;
    selected = [];

  constructor(public router: Router, public route: ActivatedRoute,
              public appSettings: AppSettings, private toastr: ToastrService, public dialog: MatDialog, public auth: AuthService,
              public config: ConfigurationService, public categoryService: CategoryService) {
      this.settings = this.appSettings.settings;
      this.webhost = this.config.getimgUrl();
  }

  ngOnInit() {
     this.getCategoryList();
     this.getSubjects('');
  }


    getSubjects(selected) {
      console.log(this.selectedCategory, 'pop');
        this.getSubjectList(selected);
    }

    public getSubjectList(values) {

      // let selectedCid = values.toString();
        // console.log(selectedCid, 'values');

        // this.settings.loadingSpinner = true;
        const data = {
            'adminid': this.auth.getAdminId(),
            'platform': 'web',
            'categoryid': values ? values : []
        };
        this.categoryService.getSubjectList(data).subscribe(
            (successData) => {
                this.getSubjectSuccess(successData);

            },
            (error) => {
                this.getSubjectFailure(error);
            }
        );
    }
    public getSubjectSuccess(successData) {
        console.log(successData, 'successData');
        this.settings.loadingSpinner = false;
        this.subList = successData.ResponseObject;
        this.rows = this.subList;
        this.temp = this.subList;
        console.log(this.rows, 'this.rowsthis.rowsthis.rows');

    }
    public getSubjectFailure(error) {
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
        console.log(this.rows, 'this.rowsthis.rowsthis.rows');

    }
    public getCategoryFailure(error) {
    }
    openDialog(): void {
        let dialogRef = this.dialog.open(AddsubjectComponent, {
            width: '500px',
            data: this.subList
        });
        dialogRef.afterClosed().subscribe((result) => {
            console.log(result);
            if(result){
                this.getSubjects('');
            }
        });

    }
    updateFilter(event) {
        const val = event.target.value.toLowerCase();

        // filter our data
        const temp = this.temp.filter(function(d) {
            return d.subject_name.toLowerCase().indexOf(val) !== -1 || !val;
        });

        // update the rows
        this.rows = temp;
        // Whenever the filter changes, always go back to the first page
        this.table.offset = 0;

    }

}
