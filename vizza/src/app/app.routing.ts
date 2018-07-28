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
import {PosComponent} from './pages/pos/pos.component';
import {RegisterComponent} from './pages/register/register.component';
import {ProposalComponent} from './pages/proposal/proposal.component';
import {HealthInsuranceComponent} from './pages/health-insurance/health-insurance.component';
import { ConfirmpasswordComponent } from './pages/confirmpassword/confirmpassword.component';
import { PosprofileComponent } from './pages/posprofile/posprofile.component';
import { EditposComponent } from './pages/editpos/editpos.component';
import {PaymentSuccessComponent} from './pages/payment-success/payment-success.component';
import {DownloadPolicyComponent} from './pages/download-policy/download-policy.component';

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
            { path: 'register', component: RegisterComponent, data: { breadcrumb: 'Register' } },
            { path: 'proposal', component: ProposalComponent, data: { breadcrumb: 'Proposal' } },
            { path: 'healthinsurance', component: HealthInsuranceComponent, data: { breadcrumb: 'Health' } },
            { path: 'paymentSuccess', component: PaymentSuccessComponent, data: { breadcrumb: 'Payment Success' } },
            { path: 'downloadPolicy/:id', component: DownloadPolicyComponent, data: { breadcrumb: 'Download Policy' } },

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