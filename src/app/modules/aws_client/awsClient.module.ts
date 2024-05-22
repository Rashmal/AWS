import { NgModule } from '@angular/core';
import { ClientListComponent } from './components/client-list/client-list.component';
import { AWSClientRoutingModule } from './awsClientRouting.module';
import { TableModule } from 'primeng/table';
import { ClientMainComponent } from './components/client-main/client-main.component';
import { TabViewComponent } from '../common/components/tab-view/tab-view.component';
import { ClientModificationsComponent } from './components/client-modifications/client-modifications.component';
import { GeneralInfoComponent } from './components/client-modifications/general-info/general-info.component';
import { ImagesFilesDocsComponent } from './components/client-modifications/images-files-docs/images-files-docs.component';
import { ClientRequirementsComponent } from './components/client-modifications/client-requirements/client-requirements.component';

@NgModule({
    declarations: [
        ClientListComponent,
        ClientMainComponent,
        ClientModificationsComponent,
        GeneralInfoComponent,
        ImagesFilesDocsComponent,
        ClientRequirementsComponent
    ],
    imports: [AWSClientRoutingModule, TableModule, TabViewComponent],
})
export class AWSClientModule {}
