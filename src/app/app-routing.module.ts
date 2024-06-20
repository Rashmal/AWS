import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { ErrorMessageComponent } from './modules/common/components/error-message/error-message.component';
import { ModuleSelectorComponent } from './layout/common/module-selector/module-selector.component';
import { ReportBugComponent } from './layout/common/report-bug/report-bug.component';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', redirectTo: 'auth', pathMatch: 'full' },
            // { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'auth', loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule) },
            { path: 'module-selector', component: ModuleSelectorComponent },
            {
                path: 'layout', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'dashboard', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { 
                        path: 'global', 
                        loadChildren: () => import('./modules/global_notes/globalNotes.module').then(m => m.GlobalNotesModule),
                        canActivate: [AuthGuard],
                        data: { moduleCode: 'STAT1' }
                    },
                    { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
                    { path: 'compliance', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'pm', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'hr', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'estimating', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'stats', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'accounts', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'procurements', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'documents', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'safety', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'payroll', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'system', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'appointment', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'request', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'repository', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'trello', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { 
                        path: 'client', 
                        loadChildren: () => import('./modules/aws_client/awsClient.module').then(m => m.AWSClientModule),
                        canActivate: [AuthGuard],
                        data: { moduleCode: 'CLIEN' }
                     },
                    { path: 'company', loadChildren: () => import('./modules/aws_company/awsCompany.module').then(m => m.AWSCompanyModule) },
                    { 
                        path: 'staff', 
                        loadChildren: () => import('./modules/aws_staff_user/awsStaffUser.module').then(m => m.AWSStaffUserModule),
                        canActivate: [AuthGuard],
                        data: { moduleCode: 'STAFF' }
                    },
                    {
                        path: 'user_roles',
                        loadChildren: () => import('./modules/aws_user_roles/awsUserRoles.module').then(m => m.AWSUserRolesModule),
                        canActivate: [AuthGuard],
                        data: { moduleCode: 'USRL' }
                    },
                    { path: 'report-bug', component: ReportBugComponent }
                ]
            },
            // { path: 'layout', loadChildren: () => import('./modules/layout/appDasboard.layout.module').then(m => m.AppDashboardLayoutModule) },
            { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: 'errorMessage', component: ErrorMessageComponent },
            // { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
