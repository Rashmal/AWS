import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ViewSystemEnhancementsComponent } from './components/view-system-enhancements/view-system-enhancements.component';
import { ManageSystemEnhancementComponent } from './components/manage-system-enhancement/manage-system-enhancement.component';
import { DateChangeHistoryComponent } from './components/date-change-history/date-change-history.component';
import { ManageCommentsSystemEnhancementComponent } from './components/manage-comments-system-enhancement/manage-comments-system-enhancement.component';
@NgModule({
    imports: [RouterModule.forChild([
        { path: '', redirectTo: 'viewSystemEnhancements', pathMatch: 'full' },
        { path: 'viewSystemEnhancements', component: ViewSystemEnhancementsComponent },
        { path: 'manageSystemEnhancement', component: ManageSystemEnhancementComponent },
        { path: 'changeDateEnhancement', component: DateChangeHistoryComponent },
        { path: 'commentsSystemEnhancement', component: ManageCommentsSystemEnhancementComponent }
    ])],
    exports: [RouterModule]
})
export class SystemEnhancementsRoutingModule { }
