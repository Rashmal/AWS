import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ViewSystemEnhancementsComponent } from './view-system-enhancements/view-system-enhancements.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', redirectTo: 'viewSystemEnhancements', pathMatch: 'full' },
        { path: 'viewSystemEnhancements', component: ViewSystemEnhancementsComponent }
    ])],
    exports: [RouterModule]
})
export class SystemEnhancementsRoutingModule { }
