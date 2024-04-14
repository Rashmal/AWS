import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ViewBugFixesComponent } from './components/view-bug-fixes/view-bug-fixes.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', redirectTo: 'viewBugFixes', pathMatch: 'full' },
        { path: 'viewBugFixes', component: ViewBugFixesComponent }
    ])],
    exports: [RouterModule]
})
export class BugFixesRoutingModule { }
