import { NgModule } from "@angular/core";
import { AWSStaffUserRoutingModule } from "./awsStaffUserRouting.module";
import { StaffMainComponent } from "./components/staff-main/staff-main.component";
import { StaffListComponent } from "./components/staff-list/staff-list.component";
import { StaffModificationsComponent } from "./components/staff-modifications/staff-modifications.component";
import { RolesAccessComponent } from "./components/staff-modifications/roles-access/roles-access.component";
import { GeneralInfoComponent } from "./components/staff-modifications/general-info/general-info.component";
import { AuthenticationComponent } from "./components/staff-modifications/authentication/authentication.component";
import { AvatarComponent } from "./components/staff-modifications/avatar/avatar.component";
import { TableModule } from "primeng/table";
import { DropdownModule } from "primeng/dropdown";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TabViewComponent } from "../common/components/tab-view/tab-view.component";
import { AccordionModule } from "primeng/accordion";
import { InputSwitchModule } from "primeng/inputswitch";
import { PaginatorModule } from "primeng/paginator";
import { MultiSelectModule } from 'primeng/multiselect';
import { TooltipModule } from "primeng/tooltip";
import { AuthenticationModule } from "../authentication/authentication.module";

@NgModule({
    declarations: [
        StaffMainComponent,
        StaffListComponent,
        StaffModificationsComponent,
        RolesAccessComponent,
        GeneralInfoComponent,
        AvatarComponent,
        AuthenticationComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        AWSStaffUserRoutingModule,
        TableModule,
        DropdownModule,
        TabViewComponent,
        AccordionModule,
        InputSwitchModule,
        PaginatorModule,
        MultiSelectModule,
        TooltipModule,
        AuthenticationModule,
    ]
})

export class AWSStaffUserModule { }