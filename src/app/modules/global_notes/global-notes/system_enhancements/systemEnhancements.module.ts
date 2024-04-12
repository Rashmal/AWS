import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViewSystemEnhancementsComponent } from './view-system-enhancements/view-system-enhancements.component';
import { SystemEnhancementsRoutingModule } from './systemEnhancementsRouting.module';

@NgModule({
    declarations: [
        ViewSystemEnhancementsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        SystemEnhancementsRoutingModule
    ]
})
export class SystemEnhancementsModule { }
