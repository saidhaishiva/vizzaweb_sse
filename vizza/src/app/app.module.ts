import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';
import { CustomOverlayContainer } from './theme/utils/custom-overlay-container';
import {HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ToastrModule } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

// services
import { LoginService } from './shared/services/login.service';
import { ConfigurationService } from './shared/services/configuration.service';
import { AuthService } from './shared/services/auth.service';
import { CommonService } from './shared/services/common.service';
import { ProposalService} from './shared/services/proposal.service';
import { LearningcenterService} from './shared/services/learningcenter.service';
import { DeactivateGuard} from './shared/deactivate-guard';
import { DeactivatetimeGuard} from './shared/deactivatetime-guard';
import { ExamactivateGuard} from './shared/activate-guard';
import { ExamdeactivatetimeGuard} from './shared/examdeactivatetime-guard';
import { AgmCoreModule } from '@agm/core';
import { NgxDatatableModule} from '@swimlane/ngx-datatable';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true,
  suppressScrollX: true
};
import { CalendarModule } from 'angular-calendar';
import { SharedModule } from './shared/shared.module';
import { PipesModule } from './theme/pipes/pipes.module';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { BlankComponent } from './pages/blank/blank.component';
import { SearchComponent } from './pages/search/search.component';
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
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { HealthinsurancelistComponent } from './pages/healthinsurancelist/healthinsurancelist.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';

import { FixappointmentComponent } from './pages/fixappointment/fixappointment.component';
import { NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { PosComponent } from './pages/pos/pos.component';
import { RegisterComponent} from './pages/register/register.component';
import { ProposalComponent } from './pages/proposal/proposal.component';
import { ProposalmessageComponent } from './pages/proposal/proposalmessage/proposalmessage.component';
import { HealthInsuranceComponent } from './pages/health-insurance/health-insurance.component';
import { GroupmembersAlert} from './pages/health-insurance/health-insurance.component';
import { ComparelistComponent} from './pages/health-insurance/comparelist/comparelist.component';
import { GrouppopupComponent} from './pages/health-insurance/grouppopup/grouppopup.component';
import { ConfirmpasswordComponent } from './pages/confirmpassword/confirmpassword.component';
import { PosprofileComponent } from './pages/posprofile/posprofile.component';
import { EditposComponent } from './pages/editpos/editpos.component';
import { ChangepasswordComponent } from './pages/changepassword/changepassword.component';
import { PaymentSuccessComponent } from './pages/payment-success/payment-success.component';
import { DownloadPolicyComponent } from './pages/download-policy/download-policy.component';
import {DownloadMessage} from './pages/payment-success/payment-success.component';
import { PosstatusAlert} from './pages/health-insurance/health-insurance.component';
import { TruncatePipe} from '../limit.pipe';
import { ReligareComponent } from './pages/religare/religare.component';
import { ViewdetailsComponent } from './pages/health-insurance/viewdetails/viewdetails.component';
import { SplitLastPipe} from '../splitpipe';
import { TestimonialComponent } from './pages/home/testimonial/testimonial.component';
import { ExamComponent } from './pages/exam/exam.component';
import { ResultpageComponent } from './pages/exam/resultpage/resultpage.component';
import { ConfrimAlert} from './pages/exam/exam.component';
import { ViewresultComponent } from './pages/viewresult/viewresult.component';
import { NgxChartsModule} from '@swimlane/ngx-charts';
import { PersonalaccidentComponent } from './pages/personalaccident/personalaccident.component';
import { TravelComponent } from './pages/travel/travel.component';
import { EntranceexamComponent } from './pages/entranceexam/entranceexam.component';
import { PersonalAccidentProposalComponent } from './pages/personal-accident-proposal/personal-accident-proposal.component';
import { PosCertificateComponent } from './pages/pos-certificate/pos-certificate.component';
import { TrainingComponent } from './pages/training/training.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
      ToastrModule.forRoot(),
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      HttpModule,
      NgxDatatableModule,
      NgxChartsModule,
      AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDe_oVpi9eRSN99G4o6TwVjJbFBNr58NxE'
    }),
    PerfectScrollbarModule,
    CalendarModule.forRoot(),
    SharedModule,
    PipesModule,
      NgxMaterialTimepickerModule.forRoot(),
      AmazingTimePickerModule,
    routing
  ],
  declarations: [
    AppComponent,
    PagesComponent,
    BlankComponent,
    SearchComponent,
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
      HealthinsurancelistComponent,
      ComparelistComponent,
      HomeComponent,
      ContactComponent,
      HomeComponent,
      GrouppopupComponent,
      FixappointmentComponent,
      PosComponent,
      RegisterComponent,
      ProposalComponent,
      ProposalmessageComponent,
      GroupmembersAlert,
      HealthInsuranceComponent,
      ConfirmpasswordComponent,
      PosprofileComponent,
      EditposComponent,
      ChangepasswordComponent,
      PaymentSuccessComponent,
      DownloadPolicyComponent,
      DownloadMessage,
      PosstatusAlert,
      TruncatePipe,
      ReligareComponent,
      ViewdetailsComponent,
      SplitLastPipe,
      TestimonialComponent,
      ExamComponent,
      ResultpageComponent,
      ConfrimAlert,
      ViewresultComponent,
      EntranceexamComponent,
      PersonalaccidentComponent,
      TravelComponent,
      PersonalAccidentProposalComponent,
      PosCertificateComponent,
      TrainingComponent
  ],
  providers: [
      AppSettings,
      LoginService,
      ConfigurationService,
      AuthService,
      CommonService,
      LearningcenterService,
      ProposalService,
      DeactivateGuard,
      DeactivatetimeGuard,
      ExamactivateGuard,
      ExamdeactivatetimeGuard,
      DatePipe,
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    { provide: OverlayContainer, useClass: CustomOverlayContainer }
  ],
    bootstrap: [AppComponent],
    entryComponents: [
        ComparelistComponent, GrouppopupComponent, GroupmembersAlert, ProposalmessageComponent, ChangepasswordComponent, DownloadMessage, PosstatusAlert, ViewdetailsComponent, TestimonialComponent, ResultpageComponent, ConfrimAlert
    ]
})
export class AppModule { }