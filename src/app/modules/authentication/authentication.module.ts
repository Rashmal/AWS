import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationRoutingModule } from './authenticationRouting.module';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TooltipModule } from 'primeng/tooltip';
import { InputrestrictionDirective } from '../common/directives/inputrestriction.directive';

@NgModule({
    declarations: [
        LoginComponent,
        InputrestrictionDirective
    ],
    imports: [
        CommonModule,
        FormsModule,
        AuthenticationRoutingModule,
        TooltipModule 
    ],
    exports:[
        InputrestrictionDirective
    ]
})
export class AuthenticationModule { }
