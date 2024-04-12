import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BugFixesRoutingModule } from './bugFixesRouting.module';
import { ViewBugFixesComponent } from './view-bug-fixes/view-bug-fixes.component';

@NgModule({
    declarations: [
        ViewBugFixesComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        BugFixesRoutingModule
    ]
})
export class BugFixesModule { }
