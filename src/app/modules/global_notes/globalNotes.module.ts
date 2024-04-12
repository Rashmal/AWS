import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GlobalNotesComponent } from './global-notes/global-notes.component';
import { GlobalNotesRoutingModule } from './globalNotesRouting.module';

@NgModule({
    declarations: [
        GlobalNotesComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        GlobalNotesRoutingModule
    ]
})
export class GlobalNotesModule { }
