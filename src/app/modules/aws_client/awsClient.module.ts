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
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { AccordionModule } from 'primeng/accordion';
import { InputSwitchModule } from 'primeng/inputswitch';
import { EditorModule } from 'primeng/editor';
import { ChipsModule } from 'primeng/chips';
import { GlobalRequirementsComponent } from './components/client-modifications/client-requirements/global-requirements/global-requirements.component';
import { ConfigResourceTypeComponent } from './components/client-modifications/images-files-docs/config-resource-type/config-resource-type.component';
import { ExpenseAccountsComponent } from './components/client-modifications/general-info/expense-accounts/expense-accounts.component';
import { RadioButtonModule } from 'primeng/radiobutton';

@NgModule({
    declarations: [
        ClientListComponent,
        ClientMainComponent,
        ClientModificationsComponent,
        GeneralInfoComponent,
        ImagesFilesDocsComponent,
        ClientRequirementsComponent,
        GlobalRequirementsComponent,
        ConfigResourceTypeComponent,
        ExpenseAccountsComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        AWSClientRoutingModule,
        TableModule,
        TabViewComponent,
        DropdownModule,
        PaginatorModule,
        AccordionModule,
        InputSwitchModule,
        EditorModule,
        ChipsModule,
        RadioButtonModule
    ],
})
export class AWSClientModule {}
