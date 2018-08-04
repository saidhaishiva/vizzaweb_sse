import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';
import { CustomOverlayContainer } from './theme/utils/custom-overlay-container';
import {HttpClientModule} from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpModule } from '@angular/http';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule} from '@angular/material';

import { NgxDatatableModule} from '@swimlane/ngx-datatable';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    wheelPropagation: true,
    suppressScrollX: true};
import { CalendarModule } from 'angular-calendar';
import { SharedModule } from './shared/shared.module';
import { PipesModule } from './theme/pipes/pipes.module';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
// import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { ErrorComponent } from './pages/errors/error/error.component';
import { AppSettings } from './app.settings';

import { SidenavComponent } from './theme/components/sidenav/sidenav.component';
import { VerticalMenuComponent } from './theme/components/menu/vertical-menu/vertical-menu.component';
import { HorizontalMenuComponent } from './theme/components/menu/horizontal-menu/horizontal-menu.component';
import { BreadcrumbComponent } from './theme/components/breadcrumb/breadcrumb.component';
import { FlagsMenuComponent } from './theme/components/flags-menu/flags-menu.component';
import { FullScreenComponent } from './theme/components/fullscreen/fullscreen.component';
import { ApplicationsComponent } from './theme/components/applications/applications.component';
import { MessagesComponent } from './theme/components/messages/messages.component';
import { UserMenuComponent } from './theme/components/user-menu/user-menu.component';

import { ConfigurationService } from './shared/services/configuration.service';
import { AuthService } from './shared/services/auth.service';
import { AuthGuardService } from './shared/services/auth-guard.service';

import { LoginService } from './shared/services/login.service';
import { UsersService } from './shared/services/users.service';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { CommonService } from './shared/services/common.service';
import { ConfirmPasswordComponent } from './pages/confirm-password/confirm-password.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { FaqComponent } from './pages/faq/faq.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import {ClinicimageviewComponent} from './pages/posprofile/clinicimageview/clinicimageview.component';
import { DoctorsService } from './shared/services/doctors.service';
import {DashboardService} from './shared/services/dashboard.service';
import { AddposComponent } from './pages/addpos/addpos.component';
import { PosComponent } from './pages/pos/pos.component';
import { PosprofileComponent } from './pages/posprofile/posprofile.component';
import { PosnotesComponent} from './pages/posprofile/posnotes/posnotes.component';
import { RejectPOS } from './pages/posprofile/posprofile.component';
import { LearningcenterComponent } from './pages/learningcenter/learningcenter.component';
import { CategoryComponent } from './pages/category/category.component';
import { SubjectComponent } from './pages/subject/subject.component';
import { QuestionComponent } from './pages/question/question.component';
import {CategoryService} from './shared/services/category.service';
import { AddsubjectComponent } from './pages/subject/addsubject/addsubject.component';
import { AddcategoryComponent } from './pages/category/addcategory/addcategory.component';
import { UpdatecategoryComponent } from './pages/category/updatecategory/updatecategory.component';
import { UpdatesubjectComponent } from './pages/subject/updatesubject/updatesubject.component';
import { BranchmanagerComponent} from './pages/category/branchmanager.component';
import { BranchService} from './shared/services/branch.service';
import { AddbranchmanagerComponent } from './pages/branchmanager/addbranchmanager/addbranchmanager.component';
import {DatePipe} from '@angular/common';
import { SalesmanagerComponent } from './pages/salesmanager/salesmanager.component';
import { AddsalesmanagerComponent } from './pages/salesmanager/addsalesmanager/addsalesmanager.component';
import { RelationalComponent } from './pages/relational/relational.component';
import { AddrelationalmanagerComponent } from './pages/relational/addrelationalmanager/addrelationalmanager.component';
import { BranchcoordinatorComponent } from './pages/branchcoordinator/branchcoordinator.component';
import { AddbranchcoordinatorComponent } from './pages/branchcoordinator/addbranchcoordinator/addbranchcoordinator.component';
import { BranchComponent } from './pages/branch/branch.component';
import { AddbranchComponent } from './pages/branch/addbranch/addbranch.component';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        NgxDatatableModule,
        ToastrModule.forRoot(),
        FormsModule,
        HttpClientModule,
        MatDialogModule,
        HttpModule,
        ReactiveFormsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDe_oVpi9eRSN99G4o6TwVjJbFBNr58NxE'
        }),
        PerfectScrollbarModule,
        CalendarModule.forRoot(),
        SharedModule,
        PipesModule,
        NgxPaginationModule,
        routing
    ],
    declarations: [
        AppComponent,
        PagesComponent,
        NotFoundComponent,
        ErrorComponent,
        SidenavComponent,
        VerticalMenuComponent,
        HorizontalMenuComponent,
        BreadcrumbComponent,
        FlagsMenuComponent,
        FullScreenComponent,
        ApplicationsComponent,
        MessagesComponent,
        UserMenuComponent,
        ForgotPasswordComponent,
        ConfirmPasswordComponent,
        AboutUsComponent,
        FaqComponent,
        ContactUsComponent,
        ClinicimageviewComponent,
        RejectPOS,
        AddposComponent,
        PosComponent,
        PosprofileComponent,
        PosnotesComponent,
        LearningcenterComponent,
        CategoryComponent,
        SubjectComponent,
        QuestionComponent,
        AddsubjectComponent,
        AddcategoryComponent,
        UpdatecategoryComponent,
        UpdatesubjectComponent,
        BranchmanagerComponent,
        AddbranchmanagerComponent,
        SalesmanagerComponent,
        AddsalesmanagerComponent,
        RelationalComponent,
        AddrelationalmanagerComponent,
        BranchcoordinatorComponent,
        AddbranchcoordinatorComponent,
        BranchComponent,
        AddbranchComponent,

    ],
    providers: [
        AppSettings,
        ConfigurationService,
        AuthService,
        LoginService,
        UsersService,
        CategoryService,
        AuthGuardService,
        DoctorsService,
        CommonService,
        DashboardService,
        BranchService,
        DatePipe,
        { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
        { provide: OverlayContainer, useClass: CustomOverlayContainer }
    ],
    bootstrap: [AppComponent],
    entryComponents: [ ClinicimageviewComponent, PosnotesComponent, RejectPOS, AddsubjectComponent, AddcategoryComponent, UpdatecategoryComponent, UpdatesubjectComponent, AddbranchComponent, ]
})
export class AppModule { }