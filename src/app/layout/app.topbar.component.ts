import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { OverallCookieInterface } from '../modules/common/core/overallCookieInterface';
import { AuthenticationModel } from '../modules/authentication/models/authenticationModel';
import { AuthenticationService } from '../modules/authentication/services/authentication.service';
import { OverallCookieModel } from '../modules/common/core/overallCookieModel';
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    // Store the cookie interface
    overallCookieInterface: OverallCookieInterface;
    // Store the authentication model
    authenticationModel: AuthenticationModel;

    // Constructor
    constructor(public layoutService: LayoutService, private authenticationService: AuthenticationService,
        private router: Router) {
        // Initialize the model
        this.authenticationModel = new AuthenticationModel(this.authenticationService);
        this.overallCookieInterface = new OverallCookieModel();
    }

    // On click function of the logout
    logoutOnClick() {
        // Calling the model to logout function
        this.authenticationModel.LogoutUserService(this.overallCookieInterface.GetUserEmail(), this.overallCookieInterface.GetCompanyId()).then(
            (data) => {
                // Clear the local storage cookie data
                this.overallCookieInterface.ClearCookies();
                // Redirect to the login page
                this.router.navigate(['/auth']);
            }
        );
        // End of Calling the model to logout function
    }
}
