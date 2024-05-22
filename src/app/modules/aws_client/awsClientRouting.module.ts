import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClientListComponent } from './components/client-list/client-list.component';
import { ClientMainComponent } from './components/client-main/client-main.component';
import { ClientModificationsComponent } from './components/client-modifications/client-modifications.component';
import { GeneralInfoComponent } from './components/client-modifications/general-info/general-info.component';
import { ImagesFilesDocsComponent } from './components/client-modifications/images-files-docs/images-files-docs.component';
import { ClientRequirementsComponent } from './components/client-modifications/client-requirements/client-requirements.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', redirectTo: 'client_main', pathMatch: 'full' },
            {
                path: 'client_main',
                component: ClientMainComponent,
                children: [
                    { path: '', redirectTo: 'client_list', pathMatch: 'full' },
                    { path: 'client_list', component: ClientListComponent },
                    {
                        path: 'client_mod',
                        component: ClientModificationsComponent,
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
                                path: 'media',
                                component: ImagesFilesDocsComponent,
                            },
                            {
                                path: 'cli_req',
                                component: ClientRequirementsComponent,
                            },
                        ],
                    },
                ],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class AWSClientRoutingModule {}
