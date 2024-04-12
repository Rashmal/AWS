import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthenticationModel } from 'src/app/modules/authentication/models/authenticationModel';
import { AuthenticationService } from 'src/app/modules/authentication/services/authentication.service';
import { OverallCookieInterface } from 'src/app/modules/common/core/overallCookieInterface';
import { OverallCookieModel } from 'src/app/modules/common/core/overallCookieModel';
import { LayoutService } from '../service/app.layout.service';

@Component({
  selector: 'app-new-top-bar',
  templateUrl: './new-top-bar.component.html',
  styleUrl: './new-top-bar.component.scss'
})
export class NewTopBarComponent {

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
        this.authenticationModel.LogoutUserService(this.overallCookieInterface.GetUserEmail()).then(
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
