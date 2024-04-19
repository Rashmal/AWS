import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SystemEnhancementsRoutingModule } from './systemEnhancementsRouting.module';
import { ViewSystemEnhancementsComponent } from './components/view-system-enhancements/view-system-enhancements.component';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ManageSystemEnhancementComponent } from './components/manage-system-enhancement/manage-system-enhancement.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { EditorModule } from 'primeng/editor';
import { DateChangeHistoryComponent } from './components/date-change-history/date-change-history.component';
import { ManageCommentsSystemEnhancementComponent } from './components/manage-comments-system-enhancement/manage-comments-system-enhancement.component';
import { TooltipModule } from 'primeng/tooltip';
import { InputrestrictionDirective } from 'src/app/modules/common/directives/inputrestriction.directive';
import { AuthenticationModule } from 'src/app/modules/authentication/authentication.module';

@NgModule({
    declarations: [
        ViewSystemEnhancementsComponent,
        ManageSystemEnhancementComponent,
        DateChangeHistoryComponent,
        ManageCommentsSystemEnhancementComponent
        
    ],
    imports: [
        CommonModule,
        FormsModule,
        SystemEnhancementsRoutingModule,
        DropdownModule,
        CalendarModule,
        TableModule,
        PaginatorModule,
        MultiSelectModule,
        EditorModule,
        TooltipModule,
        AuthenticationModule
    ]
})
export class SystemEnhancementsModule { }
