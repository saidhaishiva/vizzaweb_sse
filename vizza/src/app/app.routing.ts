import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PagesComponent } from './pages/pages.component';
import { BlankComponent } from './pages/blank/blank.component';
import { SearchComponent } from './pages/search/search.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { ErrorComponent } from './pages/errors/error/error.component';
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
import {PersonalaccidentComponent} from './pages/personal-accident-home/personal-accident-home.component';
import {TravelComponent} from './pages/travel/travel.component';
import {DmViewresultComponent} from './pages/dm-exam/dm-viewresult/dm-viewresult.component';
import {PaymentSuccessTravelComponent} from './pages/payment-success-travel/payment-success-travel.component';
import {AppolloMunichComponent} from './pages/appollo-munich-health/appollo-munich-health.component';
import {IffcoTokioComponent} from './pages/iffco-tokio/iffco-tokio.component';
import {ApollomunichPaymentSuccessComponent} from './pages/apollomunich-payment-success/apollomunich-payment-success.component';
import {CarInsuranceComponent} from './pages/car-insurance/car-insurance.component';
import {BikeInsuranceComponent } from './pages/bike-insurance/bike-insurance.component';
import {TermLifeInsuranceComponent} from './pages/term-life-insurance/term-life-insurance.component';
import {LifeInsuranceComponent} from './pages/life-insurance/life-insurance.component';
import {HdfcHealthInsuranceComponent} from './pages/hdfc-health-insurance/hdfc-health-insurance.component';

//import {PersonalAccidentProposalComponent} from './pages/personal-accident-proposal/personal-accident-proposal.component';
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
import {HealthComponent} from './health/health.component';
import {ReligarePaymentSuccessComponent} from './pages/religare-payment-success/religare-payment-success.component';
import {DmRegisterComponent} from './pages/dm-register/dm-register.component';
import {DmLoginComponent} from './pages/dm-login/dm-login.component';
import {DmProfileComponent} from './pages/dm-profile/dm-profile.component';
import {DmTrainingComponent} from './pages/dm-training/dm-training.component';
import {DmExamComponent} from './pages/dm-exam/dm-exam.component';
import {DmexamactivateGuard} from './shared/dmactivate-guard';
import {ReligareDownloadPolicyComponent} from './pages/religare-download-policy/religare-download-policy.component';
import {DmdeactivatetimeGuard} from './shared/dmdeactivatetime-guard';
import {DmexamdeactivatetimeGuard} from './shared/dmexamdeactivatetime-guard';
import {CareerComponent} from './pages/career/career.component';
import {AboutPosComponent} from './pages/about-pos/about-pos.component';
import {DmForgotpasswordComponent} from './pages/dm-forgotpassword/dm-forgotpassword.component';
import {DmConfirmpasswordComponent} from './pages/dm-confirmpassword/dm-confirmpassword.component';
import {AboutVizzaComponent} from './pages/about-vizza/about-vizza.component';
import {MediaCenterComponent} from './pages/media-center/media-center.component';
import {ViewmediaComponent} from './pages/media-center/viewmedia/viewmedia.component';
import {ReliancePaymentSuccessComponent} from './pages/reliance-payment-success/reliance-payment-success.component';
import {PersonalaccidentformComponent} from './pages/personalaccidentform/personalaccidentform.component';
import {PreligareComponent} from './pages/preligare/preligare.component';
import {TravelPremiumListComponent} from './pages/travel-premium-list/travel-premium-list.component';
import {TravelProposalComponent} from './pages/travel-starthealth-proposal/travel-starthealth-proposal.component';
import {ReligarePaymentSuccessPaComponent} from './pages/religare-payment-success-pa/religare-payment-success-pa.component';
import {BajajAlianzComponent} from './pages/bajaj-alianz/bajaj-alianz.component';
import {BajajalianzPaymentSuccessComponent} from './pages/bajajalianz-payment-success/bajajalianz-payment-success.component';
import {AppollomunichpaComponent} from './pages/appollo-munich-pa/appollo-munich-pa.component';
import { ApollomunichPaPaymentSuccessComponent } from './pages/apollomunich-pa-payment-success/apollomunich-pa-payment-success.component';
import {ReliagretravelproposalComponent} from './pages/travel-religare-proposal/travel-religare-proposal.component';
import {HdfcPersonalaccidentComponent} from './pages/hdfc-personalaccident/hdfc-personalaccident.component';
import {TravelShriramProposalComponent} from './pages/travel-shriram-proposal/travel-shriram-proposal.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { 
        path: '',
        component: PagesComponent, children: [
            { path: 'home', component: HomeComponent, data: { breadcrumb: 'Home' } },
            { path: 'contact', component: ContactComponent, data: { breadcrumb: 'Contact us' } },
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
            { path: 'forgotpassword', component: ForgotPasswordComponent, data: { breadcrumb: 'Forgot password' } },
            { path: 'dm-forgotpassword', component: DmForgotpasswordComponent, data: { breadcrumb: 'Dm Forgot password' } },
            { path: 'confirmpassword', component: ConfirmpasswordComponent, data: { breadcrumb: 'Confirm Password' } },
            { path: 'dm-confirmpassword', component: DmConfirmpasswordComponent, data: { breadcrumb: 'Dm Confirm Password' } },
            { path: 'pos', component: PosComponent, data: { breadcrumb: 'POS' } },
            { path: 'dm-login', component: DmLoginComponent, data: { breadcrumb: 'Dm Login' } },
            { path: 'dm-register', component: DmRegisterComponent, data: { breadcrumb: 'Dm Login' } },
            { path: 'dm-profile', component: DmProfileComponent, data: { breadcrumb: 'DM Profile' } },
            { path: 'dm-training', component: DmTrainingComponent, data: { breadcrumb: 'DM Training' }, canDeactivate: [DmdeactivatetimeGuard] },
            { path: 'dm-exam', component: DmExamComponent, data: { breadcrumb: 'DM Exam' }, canActivate: [DmexamactivateGuard], canDeactivate: [DmexamdeactivatetimeGuard]  },
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
            { path: 'grouphealth', component: GroupmedicalComponent, data: {breadcrumb: 'Group Health Insurance'}},
            { path: 'grouppersonal', component: GrouppersonalComponent, data: {breadcrumb: 'Group Personal Accident'}},
            { path: 'groupterm', component: GrouptermComponent, data: {breadcrumb: 'Group Term Life Insurance'}},
            { path: 'jewelersblock', component: JewelersblockComponent, data: {breadcrumb: 'Jewelers Block Policy'}},
            { path: 'directors', component: DirectorsComponent, data: {breadcrumb: 'Directors and Officers Liability Policy'}},
            { path: 'bankers', component: BankersComponent, data: {breadcrumb: 'Bankers Identity Policy'}},
            { path: 'erection', component: ErectionComponent, data: {breadcrumb: 'Erection All rick Policy'}},
            { path: 'register', component: RegisterComponent, data: { breadcrumb: 'Register' } },
            { path: 'proposal', component: ProposalComponent, data: { breadcrumb: 'Proposal' }, canDeactivate: [DeactivateGuard] },
            { path: 'healthinsurance', component: HealthInsuranceComponent, data: { breadcrumb: 'Health' }},
            { path: 'health', component: HealthComponent, data: { breadcrumb: 'Health Form' }},
            { path: 'paymentSuccess', component: PaymentSuccessComponent, data: { breadcrumb: 'Payment Success' } },
            { path: 'downloadPolicy/:id', component: DownloadPolicyComponent, data: { breadcrumb: 'Download Policy' } },
            { path: 'religareDownloadPolicy/:status/:proId', component: ReligareDownloadPolicyComponent, data: { breadcrumb: 'Religare Download Policy' } },
            { path: 'religare', component: ReligareComponent, data: { breadcrumb: 'Religare' } },
            { path: 'viewresult', component: ViewresultComponent, data: { breadcrumb: 'Result' } },
            { path: 'dm-viewresult', component: DmViewresultComponent, data: { breadcrumb: 'Result' } },
            { path: 'startexam', component: EntranceexamComponent, data: { breadcrumb: 'Exam' }, canActivate: [ExamactivateGuard]},
            { path: 'exam', component: ExamComponent, data: { breadcrumb: 'Exam' }, canDeactivate: [ExamdeactivatetimeGuard] },
            { path: 'training', component: TrainingComponent, data: { breadcrumb: 'Training' }, canDeactivate: [DeactivatetimeGuard] },
            { path: 'personalaccident', component: PersonalaccidentComponent, data: {breadcrumb: 'Personal Accident'} },
            { path: 'travel', component: TravelComponent, data: {breadcrumb: 'Travel' } },
            //{ path: 'Personal-accident-proposal', component: PersonalAccidentProposalComponent, data: { breadcrumb: 'Personal Accident Proposal'} },
            { path: 'pos-certificate', component: PosCertificateComponent, data: { breadcrumb: 'Pos Certificate'} },
            { path: 'reliance', component: RelianceComponent, data: { breadcrumb: 'Reliance'} },
            { path: 'religare-payment-success/:status/:proId', component: ReligarePaymentSuccessComponent, data: { breadcrumb: 'Religare payment Success'} },
            { path: 'reliance-payment-success/:status/:proId/:mailstatus', component: ReliancePaymentSuccessComponent, data: { breadcrumb: 'Religare payment Success'} },
            { path: 'apollomunich-payment-success/:status/:proId', component: ApollomunichPaymentSuccessComponent, data: { breadcrumb: 'Apollo munich payment Success'} },
            { path: 'careers', component:CareerComponent, data: { breadcrumb: 'Career'} },
            { path: 'about-pos', component:AboutPosComponent, data: { breadcrumb: 'About Pos'} },
            { path: 'about-vizza', component:AboutVizzaComponent, data: { breadcrumb: 'About Vizza'} },
            { path: 'mediacenter', component:MediaCenterComponent, data: { breadcrumb: 'Learning Center'} },
            { path: 'viewmedia', component:ViewmediaComponent, data: { breadcrumb: 'View Media Center'} },
            { path: 'personalaccidentform', component:PersonalaccidentformComponent, data: { breadcrumb: 'Personal Accident Form'} },
            { path: 'preligare', component:PreligareComponent, data: { breadcrumb: 'Personal Accident'} },
            { path: 'appollo-munich-health', component:AppolloMunichComponent, data:{ breadcrumb: 'Appollo Munich'}},
            { path: 'travelpremium', component:TravelPremiumListComponent, data: { breadcrumb: 'Travel Premium'} },
            { path: 'travelproposal', component:TravelProposalComponent, data: { breadcrumb: 'Travel Proposal'} },
            { path: 'paymentSuccessTravel', component:PaymentSuccessTravelComponent, data: { breadcrumb: 'Payment Success'} },
            { path: 'iffco', component:IffcoTokioComponent, data: { breadcrumb: 'Iffco Tokio'} },
            { path: 'religare-payment-success-pa/:status/:proId', component:ReligarePaymentSuccessPaComponent, data: { breadcrumb: 'personalAccidentPayment Success'} },
            { path: 'apollomunich-pa-payment-success/:status/:proId', component:ApollomunichPaPaymentSuccessComponent, data: { breadcrumb: 'personalAccidentPayment Success'} },
            { path: 'bajaj', component: BajajAlianzComponent, data: { breadcrumb: 'Bajaj Alianz'} },
            { path: 'bajajalianz-payment-success/:status/:proId', component: BajajalianzPaymentSuccessComponent, data: { breadcrumb: 'Bajaj Alianz Payment Success'} },
            { path: 'appollopa',component: AppollomunichpaComponent, data:{ breadcrumb: 'Appllo PA'}},
            { path: 'car-insurance', component: CarInsuranceComponent, data:{breadcrumb: 'Car Insurance'}},
            { path: 'bike-insurance', component: BikeInsuranceComponent, data:{breadcrumb: 'Bike Insurance'}},
            { path: 'religaretravel', component: ReliagretravelproposalComponent, data:{breadcrumb: 'Religare Travel Proposal'}},
            { path: 'term-life-insurance', component: TermLifeInsuranceComponent, data:{breadcrumb: 'Term Life Insurance'}},
            { path: 'life-insurance', component: LifeInsuranceComponent, data:{breadcrumb: 'Life Insurance'}},
            { path: 'hdfc-insurance', component: HdfcHealthInsuranceComponent, data:{breadcrumb: 'HDFC Insurance'}},
            { path: 'hdfc-personalAccident', component: HdfcPersonalaccidentComponent, data:{breadcrumb: 'HDFC PersonalAccident'}},
            { path: 'shriram-travel', component: TravelShriramProposalComponent, data:{breadcrumb: 'Shriram Travel'}},
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