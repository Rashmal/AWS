import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GlobalNotesComponent } from './global-notes/global-notes.component';
import { GlobalNotesRoutingModule } from './globalNotesRouting.module';
import { TabViewComponent } from '../common/components/tab-view/tab-view.component';

@NgModule({
    declarations: [
        GlobalNotesComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        GlobalNotesRoutingModule,
        TabViewComponent
    ]
})
export class GlobalNotesModule { }
