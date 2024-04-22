import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GlobalNotesComponent } from './global-notes/global-notes.component';
import { DefaultPageComponent } from './default-page/default-page.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', redirectTo: 'globalNotes', pathMatch: 'full' },
        {
            path: 'globalNotes', component: GlobalNotesComponent,
            children: [
                { path: 'systemEnhancements', loadChildren: () => import('./global-notes/system_enhancements/systemEnhancements.module').then(m => m.SystemEnhancementsModule) },
                { path: 'bugFixes', loadChildren: () => import('./global-notes/bug_fixes/bugFixes.module').then(m => m.BugFixesModule) },
                { path: 'defaultPage', component: DefaultPageComponent }
            ]
        }
    ])],
    exports: [RouterModule]
})
export class GlobalNotesRoutingModule { }
