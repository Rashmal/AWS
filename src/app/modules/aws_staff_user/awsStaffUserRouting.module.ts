import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StaffMainComponent } from './components/staff-main/staff-main.component';
import { StaffListComponent } from './components/staff-list/staff-list.component';
import { StaffModificationsComponent } from './components/staff-modifications/staff-modifications.component';
import { GeneralInfoComponent } from './components/staff-modifications/general-info/general-info.component';
import { RolesAccessComponent } from './components/staff-modifications/roles-access/roles-access.component';
import { AvatarComponent } from './components/staff-modifications/avatar/avatar.component';
import { AuthenticationComponent } from './components/staff-modifications/authentication/authentication.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', redirectTo: 'staff_main', pathMatch: 'full' },
            {
                path: 'staff_main',
                component: StaffMainComponent,
                children: [
                    { path: '', redirectTo: 'staff_list', pathMatch: 'full' },
                    { path: 'staff_list', component: StaffListComponent },
                    {
                        path: 'staff_mod',
                        component: StaffModificationsComponent,
                        children: [
                            {
                                path: '',
                                redirectTo: 'gen_inf',
                                pathMatch: 'full',
                            },
                            {
                                path: 'gen_inf',
                                component: GeneralInfoComponent,
                            },
                            {
                                path: 'roles_access',
                                component: RolesAccessComponent,
                            },
                            {
                                path: 'avatar',
                                component: AvatarComponent,
                            },
                            {
                                path: 'authentication',
                                component: AuthenticationComponent,
                            }
                        ]
                    }
                ],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class AWSStaffUserRoutingModule {}
