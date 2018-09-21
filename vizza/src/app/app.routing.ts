import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PagesComponent } from './pages/pages.component';
import { BlankComponent } from './pages/blank/blank.component';
import { SearchComponent } from './pages/search/search.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { ErrorComponent } from './pages/errors/error/error.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { HealthinsurancelistComponent} from './pages/healthinsurancelist/healthinsurancelist.component';
import { HomeComponent} from './pages/home/home.component';
import {ContactComponent} from './pages/contact/contact.component';
import {FixappointmentComponent} from './pages/fixappointment/fixappointment.component';
import {ShopkeeperpolicyComponent} from './pages/shopkeeperpolicy/shopkeeperpolicy.component';
import {MarinecargoComponent} from './pages/marinecargo/marinecargo.component';
import {MoneyComponent} from './pages/money/money.component';
import {FireComponent} from './pages/fire/fire.component';
import { BurglaryComponent} from './pages/burglary/burglary.component';
import { MachineryComponent} from './pages/machinery/machinery.component';
import { ElectronicsComponent} from './pages/electronics/electronics.component';
import { ContractorsComponent} from './pages/contractors/contractors.component';
import { ProfessionalComponent} from './pages/professional/professional.component';
import {PosComponent} from './pages/pos/pos.component';
import {RegisterComponent} from './pages/register/register.component';
import {ProposalComponent} from './pages/proposal/proposal.component';
import {HealthInsuranceComponent} from './pages/health-insurance/health-insurance.component';
import { ConfirmpasswordComponent } from './pages/confirmpassword/confirmpassword.component';
import { PosprofileComponent } from './pages/posprofile/posprofile.component';
import { EditposComponent } from './pages/editpos/editpos.component';
import {PaymentSuccessComponent} from './pages/payment-success/payment-success.component';
import {DownloadPolicyComponent} from './pages/download-policy/download-policy.component';
import {DeactivateGuard} from './shared/deactivate-guard';
import {ReligareComponent} from './pages/religare/religare.component';
import {RelianceComponent} from './pages/reliance/reliance.component';
import {DeactivatetimeGuard} from './shared/deactivatetime-guard';
import {ExamComponent} from './pages/exam/exam.component';
import {ExamactivateGuard} from './shared/activate-guard';
import {ExamdeactivatetimeGuard} from './shared/examdeactivatetime-guard';
import { ViewresultComponent} from './pages/viewresult/viewresult.component';
import { EntranceexamComponent} from './pages/entranceexam/entranceexam.component';
import {PersonalaccidentComponent} from './pages/personalaccident/personalaccident.component';
import {TravelComponent} from './pages/travel/travel.component';
import {PersonalAccidentProposalComponent} from './pages/personal-accident-proposal/personal-accident-proposal.component';
import {PosCertificateComponent} from './pages/pos-certificate/pos-certificate.component';
import {TrainingComponent} from './pages/training/training.component';
import {HouseholdComponent} from './pages/household/household.component';
import {PublicComponent} from './pages/public/public.component';
import {WorkmenComponent} from './pages/workmen/workmen.component';
import {GroupmedicalComponent} from './pages/groupmedical/groupmedical.component';
import {GrouppersonalComponent} from './pages/grouppersonal/grouppersonal.component';
import {GrouptermComponent} from './pages/groupterm/groupterm.component';
import {JewelersblockComponent} from './pages/jewelersblock/jewelersblock.component';
import {BankersComponent} from './pages/bankers/bankers.component';
import {MarinehullComponent} from './pages/marinehull/marinehull.component';
import {AviationComponent} from './pages/aviation/aviation.component';
import {ErectionComponent} from './pages/erection/erection.component';
import {DirectorsComponent} from './pages/directors/directors.component';


export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { 
        path: '',
        component: PagesComponent, children: [
            { path: 'home', component: HomeComponent, data: { breadcrumb: 'Home' } },
            { path: 'contact', component: ContactComponent, data: { breadcrumb: 'Contact us' } },
            { path: 'dashboard', loadChildren: 'app/pages/dashboard/dashboard.module#DashboardModule', data: { breadcrumb: 'Dashboard' } },
            { path: 'insurancelist', component: HealthinsurancelistComponent, data: { breadcrumb: 'List' } },
            { path: 'users', loadChildren: 'app/pages/users/users.module#UsersModule', data: { breadcrumb: 'Users' } },
            { path: 'ui', loadChildren: 'app/pages/ui/ui.module#UiModule', data: { breadcrumb: 'UI' } },
            { path: 'form-controls', loadChildren: 'app/pages/form-controls/form-controls.module#FormControlsModule', data: { breadcrumb: 'Form Controls' } },
            { path: 'tables', loadChildren: 'app/pages/tables/tables.module#TablesModule', data: { breadcrumb: 'Tables' } },
            { path: 'icons', loadChildren: 'app/pages/icons/icons.module#IconsModule', data: { breadcrumb: 'Material Icons' } },
            { path: 'drag-drop', loadChildren: 'app/pages/drag-drop/drag-drop.module#DragDropModule', data: { breadcrumb: 'Drag & Drop' } },
            { path: 'schedule', loadChildren: 'app/pages/schedule/schedule.module#ScheduleModule', data: { breadcrumb: 'Schedule' } },
            { path: 'mailbox', loadChildren: 'app/pages/mailbox/mailbox.module#MailboxModule', data: { breadcrumb: 'Mailbox' } },
            { path: 'chat', loadChildren: 'app/pages/chat/chat.module#ChatModule', data: { breadcrumb: 'Chat' } },
            { path: 'maps', loadChildren: 'app/pages/maps/maps.module#MapsModule', data: { breadcrumb: 'Maps' } },
            { path: 'charts', loadChildren: 'app/pages/charts/charts.module#ChartsModule', data: { breadcrumb: 'Charts' } },
            { path: 'dynamic-menu', loadChildren: 'app/pages/dynamic-menu/dynamic-menu.module#DynamicMenuModule', data: { breadcrumb: 'Dynamic Menu' }  },          
            { path: 'blank', component: BlankComponent, data: { breadcrumb: 'Blank page' } },
            { path: 'pos-profile', component: PosprofileComponent, data: { breadcrumb: 'Pos Profile' } },
            { path: 'pos-edit', component: EditposComponent, data: { breadcrumb: 'Pos Profile Edit' } },
            { path: 'search', component: SearchComponent, data: { breadcrumb: 'Search' } },
            { path: 'forgotpassword', component: ForgotPasswordComponent, data: { breadcrumb: 'forgot password' } },
            { path: 'confirmpassword', component: ConfirmpasswordComponent, data: { breadcrumb: 'Confirm Password' } },
            { path: 'pos', component: PosComponent, data: { breadcrumb: 'POS' } },
            { path: 'fix-appointment/:id', component: FixappointmentComponent, data: { breadcrumb: 'Fix Appointment' } },
            { path: 'shopkeeperpolicy', component: ShopkeeperpolicyComponent, data: { breadcrumb: 'Shopkeeper Policy'} },
            { path: 'marinecargo', component: MarinecargoComponent, data: {breadcrumb: 'Marine Cargo Policy'}},
            { path: 'marinehull', component: MarinehullComponent, data: {breadcrumb: 'Marine Hull policy'}},
            { path: 'aviation', component: AviationComponent, data: {breadcrumb: 'Aviation Insurance'}},
            { path: 'money', component: MoneyComponent, data: {breadcrumb: ' Money Insurance'}},
            { path: 'fire', component: FireComponent, data: {breadcrumb: 'Fire Policy'}},
            { path: 'burglary', component: BurglaryComponent, data: {breadcrumb: 'Burglary Policy'}},
            { path: 'machinery', component: MachineryComponent, data: {breadcrumb: 'Machinery Breakdown Policy'}},
            { path: 'electronics', component: ElectronicsComponent, data: {breadcrumb: 'Electronics Equiptment Policy'}},
            { path: 'contractors', component: ContractorsComponent, data: {breadcrumb: 'Contractors All Risk Policy'}},
            { path: 'household', component: HouseholdComponent, data: {breadcrumb: 'House Holders Policy'}},
            { path: 'public', component: PublicComponent, data: {breadcrumb: 'Public Liability Policy'}},
            { path: 'professional', component: ProfessionalComponent, data: {breadcrumb: 'Professional Indemnity Policy'}},
            { path: 'workmen', component: WorkmenComponent, data: {breadcrumb: 'Workmen Compensation'}},
            { path: 'groupmedical', component: GroupmedicalComponent, data: {breadcrumb: 'Group Medical Insurance'}},
            { path: 'grouppersonal', component: GrouppersonalComponent, data: {breadcrumb: 'Group Personal Accident'}},
            { path: 'groupterm', component: GrouptermComponent, data: {breadcrumb: 'Group Term Life Insurance'}},
            { path: 'jewelersblock', component: JewelersblockComponent, data: {breadcrumb: 'Jewelers Block Policy'}},
            { path: 'directors', component: DirectorsComponent, data: {breadcrumb: 'Directors and Officers Liability Policy'}},
            { path: 'bankers', component: BankersComponent, data: {breadcrumb: 'Bankers Identity Policy'}},
            { path: 'erection', component: ErectionComponent, data: {breadcrumb: 'Erection All rick Policy'}},
            { path: 'register', component: RegisterComponent, data: { breadcrumb: 'Register' } },
            { path: 'proposal', component: ProposalComponent, data: { breadcrumb: 'Proposal' }, canDeactivate: [DeactivateGuard] },
            { path: 'healthinsurance', component: HealthInsuranceComponent, data: { breadcrumb: 'Health' }},
            { path: 'paymentSuccess', component: PaymentSuccessComponent, data: { breadcrumb: 'Payment Success' } },
            { path: 'downloadPolicy/:id', component: DownloadPolicyComponent, data: { breadcrumb: 'Download Policy' } },
            { path: 'religare', component: ReligareComponent, data: { breadcrumb: 'Religare' } },
            { path: 'viewresult', component: ViewresultComponent, data: { breadcrumb: 'view' } },
            { path: 'startexam', component: EntranceexamComponent, data: { breadcrumb: 'Exam' }, canActivate: [ExamactivateGuard]},
            { path: 'exam', component: ExamComponent, data: { breadcrumb: 'Exam' }, canDeactivate: [ExamdeactivatetimeGuard] },
            { path: 'training', component: TrainingComponent, data: { breadcrumb: 'Training' }, canDeactivate: [DeactivatetimeGuard] },
            { path: 'personalaccident', component: PersonalaccidentComponent, data: {breadcrumb: 'Personal Accident'} },
            { path: 'travel', component: TravelComponent, data: {breadcrumb: 'Travel' } },
            { path: 'Personal-accident-proposal', component: PersonalAccidentProposalComponent, data: { breadcrumb: 'Personal Accident Proposal'} },
            { path: 'pos-certificate', component: PosCertificateComponent, data: { breadcrumb: 'Pos Certificate'} },
            { path: 'reliance', component: RelianceComponent, data: { breadcrumb: 'Reliance'} }

        ]
    },
    { path: 'login', loadChildren: 'app/pages/login/login.module#LoginModule' },
    { path: 'error', component: ErrorComponent, data: { breadcrumb: 'Error' } },
    { path: '**', component: NotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
   // preloadingStrategy: PreloadAllModules,  // <- comment this line for activate lazy load
   useHash: true
});