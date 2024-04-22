import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BugFixesRoutingModule } from './bugFixesRouting.module';
import { ViewBugFixesComponent } from './components/view-bug-fixes/view-bug-fixes.component';
import { ManageBugFixesComponent } from './components/manage-bug-fixes/manage-bug-fixes.component';
import { DateChangeHistoryComponent } from './components/date-change-history/date-change-history.component';
import { ManageCommentsBugFixesComponent } from './components/manage-comments-bug-fixes/manage-comments-bug-fixes.component';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { AuthenticationModule } from 'src/app/modules/authentication/authentication.module';

@NgModule({
    declarations: [
        ViewBugFixesComponent,
        ManageBugFixesComponent,
        DateChangeHistoryComponent,
        ManageCommentsBugFixesComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        BugFixesRoutingModule,
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
export class BugFixesModule { }
