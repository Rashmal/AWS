import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GlobalNotesComponent } from './global-notes/global-notes.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', redirectTo: 'global', pathMatch: 'full' },
        { path: 'global', component: GlobalNotesComponent }
    ])],
    exports: [RouterModule]
})
export class GlobalNotesRoutingModule { }
