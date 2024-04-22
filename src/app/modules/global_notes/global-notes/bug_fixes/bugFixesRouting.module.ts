import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ViewBugFixesComponent } from './components/view-bug-fixes/view-bug-fixes.component';
import { ManageBugFixesComponent } from './components/manage-bug-fixes/manage-bug-fixes.component';
import { DateChangeHistoryComponent } from './components/date-change-history/date-change-history.component';
import { ManageCommentsBugFixesComponent } from './components/manage-comments-bug-fixes/manage-comments-bug-fixes.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', redirectTo: 'viewBugFixes', pathMatch: 'full' },
        { path: 'viewBugFixes', component: ViewBugFixesComponent },
        { path: 'manageBugFix', component: ManageBugFixesComponent },
        { path: 'changeDateBugFix', component: DateChangeHistoryComponent },
        { path: 'commentsBugFix', component: ManageCommentsBugFixesComponent }
    ])],
    exports: [RouterModule]
})
export class BugFixesRoutingModule { }
