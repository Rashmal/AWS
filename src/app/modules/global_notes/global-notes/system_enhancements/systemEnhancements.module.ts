import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SystemEnhancementsRoutingModule } from './systemEnhancementsRouting.module';
import { ViewSystemEnhancementsComponent } from './components/view-system-enhancements/view-system-enhancements.component';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ManageSystemEnhancementComponent } from './components/manage-system-enhancement/manage-system-enhancement.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { EditorModule } from 'primeng/editor';

@NgModule({
    declarations: [
        ViewSystemEnhancementsComponent,
        ManageSystemEnhancementComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        SystemEnhancementsRoutingModule,
        DropdownModule,
        CalendarModule,
        TableModule,
        PaginatorModule,
        MultiSelectModule,
        EditorModule 
    ]
})
export class SystemEnhancementsModule { }
