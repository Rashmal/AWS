import { NgModule } from "@angular/core";
import { AWSUserRolesRoutingModule } from "./awsUserRolesRouting.module";
import { UserRolesMainComponent } from "./components/user-roles-main/user-roles-main.component";
import { UserRolesModificationsComponent } from "./components/user-roles-modifications/user-roles-modifications.component";
import { AccessLevelsComponent } from "./components/user-roles-modifications/access-levels/access-levels.component";
import { TabViewComponent } from "../common/components/tab-view/tab-view.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AccordionModule } from "primeng/accordion";
import { DropdownModule } from "primeng/dropdown";
import { InputSwitchModule } from "primeng/inputswitch";
import { PaginatorModule } from "primeng/paginator";
import { TableModule } from "primeng/table";
import { AuthenticationModule } from '../authentication/authentication.module';


@NgModule({
    declarations: [
        UserRolesMainComponent,
        UserRolesModificationsComponent,
        AccessLevelsComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        AWSUserRolesRoutingModule,
        TabViewComponent,
        TableModule,
        DropdownModule,
        TabViewComponent,
        AccordionModule,
        InputSwitchModule,
        PaginatorModule,
        AuthenticationModule
    ]
})

export class AWSUserRolesModule { }