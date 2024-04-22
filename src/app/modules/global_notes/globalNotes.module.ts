import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GlobalNotesComponent } from './global-notes/global-notes.component';
import { GlobalNotesRoutingModule } from './globalNotesRouting.module';
import { TabViewComponent } from '../common/components/tab-view/tab-view.component';
import { CalendarModule } from 'primeng/calendar';
import { DefaultPageComponent } from './default-page/default-page.component';

@NgModule({
    declarations: [
        GlobalNotesComponent,
        DefaultPageComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        GlobalNotesRoutingModule,
        TabViewComponent,
        CalendarModule 
    ]
})
export class GlobalNotesModule { }
