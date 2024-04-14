import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SystemEnhancementsRoutingModule } from './systemEnhancementsRouting.module';
import { ViewSystemEnhancementsComponent } from './components/view-system-enhancements/view-system-enhancements.component';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';

@NgModule({
    declarations: [
        ViewSystemEnhancementsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        SystemEnhancementsRoutingModule,
        DropdownModule,
        CalendarModule,
        TableModule 
    ]
})
export class SystemEnhancementsModule { }
