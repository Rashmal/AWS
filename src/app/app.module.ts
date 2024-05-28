import { NgModule } from '@angular/core';
import {
    HashLocationStrategy,
    LocationStrategy,
    PathLocationStrategy,
} from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { InputrestrictionDirective } from './modules/common/directives/inputrestriction.directive';
import { DeleteConfirmationComponent } from './modules/common/components/delete-confirmation/delete-confirmation.component';
import { UserRolesComponent } from './modules/common/components/user-roles/user-roles.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { TableCheckbox, TableHeaderCheckbox, TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { ActionConfirmationComponent } from './modules/common/components/action-confirmation/action-confirmation.component';
import { UploadFilesComponent } from './modules/common/components/upload-files/upload-files.component';

@NgModule({
    declarations: [
        AppComponent,
        NotfoundComponent,
        DeleteConfirmationComponent,
        UserRolesComponent,
        ActionConfirmationComponent,
        UploadFilesComponent
    ],
    imports: [AppRoutingModule, AppLayoutModule, DynamicDialogModule, TableModule,  FormsModule, CommonModule, CheckboxModule],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        CountryService,
        CustomerService,
        EventService,
        IconService,
        NodeService,
        PhotoService,
        ProductService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
