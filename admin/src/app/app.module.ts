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
import { PdfViewerModule} from 'ng2-pdf-viewer';
import { NgxDatatableModule} from '@swimlane/ngx-datatable';
import { TruncatePipe} from './shared/limitTo';
import { QuillModule } from 'ngx-quill';
import {MatChipsModule} from '@angular/material/chips';


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
import { ConfirmPasswordComponent} from './pages/confirm-password/confirm-password.component';
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
import { RejectDm} from './pages/dm-profile/dm-profile.component';
import { LearningcenterComponent } from './pages/learningcenter/learningcenter.component';
import { CategoryComponent } from './pages/category/category.component';
import { SubjectComponent } from './pages/subject/subject.component';
import { QuestionComponent } from './pages/question/question.component';
import { ListquestionComponent} from './pages/question/listquestion/listquestion.component';
import {CategoryService} from './shared/services/category.service';
import { AddsubjectComponent } from './pages/subject/addsubject/addsubject.component';
import { AddcategoryComponent } from './pages/category/addcategory/addcategory.component';
import { UpdatecategoryComponent } from './pages/category/updatecategory/updatecategory.component';
import { UpdatesubjectComponent } from './pages/subject/updatesubject/updatesubject.component';
import { BranchmanagerComponent} from './pages/branchmanager/branchmanager.component';
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
import { EditbranchComponent } from './pages/branch/editbranch/editbranch.component';
import { EditquestionComponent } from './pages/question/editquestion/editquestion.component';
import { UploadExcel} from './pages/question/listquestion/listquestion.component';
import { ImageUploadModule} from 'angular2-image-upload';
// import { FileUploader} from 'ng2-file-upload';
import { PosmanagerComponent } from './pages/posmanager/posmanager.component';
import { AddposmanagerComponent } from './pages/posmanager/addposmanager/addposmanager.component';
import { EditposmanagerComponent} from './pages/posmanager/editposmanager/editposmanager.component';
import { PosEditComponent } from './pages/pos-edit/pos-edit.component';
import { RenewalComponent } from './pages/renewal/renewal.component';
import { AddrenewalComponent } from './pages/renewal/addrenewal/addrenewal.component';
import { DmmanagerComponent } from './pages/dmmanager/dmmanager.component';
import { AdddmComponent } from './pages/dmmanager/adddm/adddm.component';
import { EditdmComponent } from './pages/dmmanager/editdm/editdm.component';
import { MediacenterComponent} from './pages/mediacenter/mediacenter.component';
import { AddcenterComponent } from './pages/mediacenter/addcenter/addcenter.component';
import { DistanceMarketingComponent } from './pages/distance-marketing/distance-marketing.component';
import { DmProfileComponent } from './pages/dm-profile/dm-profile.component';
import { ViewDocumentsComponent } from './pages/dm-profile/view-documents/view-documents.component';
import { AddDmComponent } from './pages/add-dm/add-dm.component';
import { EditDmComponent } from './pages/edit-dm/edit-dm.component';
import { EditmediaComponent } from './pages/mediacenter/editmedia/editmedia.component';
import { TestimonialComponent } from './pages/testimonial/testimonial.component';
import { AddtestimonialComponent } from './pages/testimonial/addtestimonial/addtestimonial.component';
import { EdittestimonialComponent } from './pages/testimonial/edittestimonial/edittestimonial.component';
import { CareerListComponent } from './pages/career-list/career-list.component';
import { PathPopupComponent } from './pages/career-list/path-popup/path-popup.component';
import { MetaDetailsComponent } from './pages/meta-details/meta-details.component';
import { AddMetaDetailComponent } from './pages/meta-details/add-meta-detail/add-meta-detail.component';
import { EditMetaDetailComponent } from './pages/meta-details/edit-meta-detail/edit-meta-detail.component';
import { ComponentComponent } from './pages/component/component.component';
import { AddComponentComponent } from './pages/component/add-component/add-component.component';
import { EditComponentComponent } from './pages/component/edit-component/edit-component.component';

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
        PdfViewerModule,
        QuillModule,
        MatChipsModule,
        routing
    ],
    declarations: [
        AppComponent,
        PagesComponent,
        NotFoundComponent,
        ErrorComponent,
        SidenavComponent,
        TruncatePipe,
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
        RejectDm,
        AddposComponent,
        PosComponent,
        PosprofileComponent,
        PosnotesComponent,
        LearningcenterComponent,
        CategoryComponent,
        SubjectComponent,
        QuestionComponent,
        ListquestionComponent,
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
        EditquestionComponent,
        EditbranchComponent,
        UploadExcel,

        UploadExcel,
        PosmanagerComponent,
        AddposmanagerComponent,
        EditposmanagerComponent,
        PosEditComponent,
        RenewalComponent,
        AddrenewalComponent,
        DmmanagerComponent,
        AdddmComponent,
        EditdmComponent,
        MediacenterComponent,
        AddcenterComponent,
        DistanceMarketingComponent,
        DmProfileComponent,
        ViewDocumentsComponent,
        AddDmComponent,
        EditDmComponent,
        EditmediaComponent,
        TestimonialComponent,
        AddtestimonialComponent,
        EdittestimonialComponent,
        CareerListComponent,
        PathPopupComponent,
        MetaDetailsComponent,
        AddMetaDetailComponent,
        EditMetaDetailComponent,
        ComponentComponent,
        AddComponentComponent,
        EditComponentComponent,
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
    entryComponents: [ ClinicimageviewComponent, PosnotesComponent, RejectPOS, RejectDm, AddsubjectComponent, AddcategoryComponent, UpdatecategoryComponent, UpdatesubjectComponent, AddbranchComponent,ListquestionComponent, EditquestionComponent, EditbranchComponent, UploadExcel, EditposmanagerComponent, AddposmanagerComponent, AddrenewalComponent, AdddmComponent, EditdmComponent,AddtestimonialComponent,EdittestimonialComponent, PathPopupComponent]
})
export class AppModule { }
