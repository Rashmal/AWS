import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { UserRolesMainComponent } from "./components/user-roles-main/user-roles-main.component";
import { UserRolesModificationsComponent } from "./components/user-roles-modifications/user-roles-modifications.component";
import { AccessLevelsComponent } from "./components/user-roles-modifications/access-levels/access-levels.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', redirectTo: 'user_roles_main', pathMatch: 'full' },
            {
                path: 'user_roles_main',
                component: UserRolesMainComponent,
                children: [
                    { path: '', redirectTo: 'user_roles_mod', pathMatch: 'full' },
                  
                    {
                        path: 'user_roles_mod',
                        component: UserRolesModificationsComponent,
                        children: [
                            {
                                path: '',
                                redirectTo: 'access_levels',
                                pathMatch: 'full',
                            },
                            {
                                path: 'access_levels',
                                component: AccessLevelsComponent,
                            }
                        ]
                    }
                ],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class AWSUserRolesRoutingModule {}