import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorMessage } from '../../core/errorMessage';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthenticationService } from 'src/app/modules/authentication/services/authentication.service';
import { AuthenticationModel } from 'src/app/modules/authentication/models/authenticationModel';
import { OverallCookieInterface } from '../../core/overallCookieInterface';
import { OverallCookieModel } from '../../core/overallCookieModel';

@Component({
  selector: 'app-error-message',
  standalone: false,
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.scss'
})
export class ErrorMessageComponent {
  // Store the error message
  errorMessage: ErrorMessage;
  // Store the cookie interface
  overallCookieInterface: OverallCookieInterface;
  // Store the authentication model
  authenticationModel: AuthenticationModel;
  // Storing the loading
  showLoading: boolean = false;

  // Constructor
  constructor(private router: Router, public layoutService: LayoutService,
    private authenticationService: AuthenticationService
  ) {
    // Getting the error message
    this.errorMessage = this.router.getCurrentNavigation().extras.state?.['response'];
    // End of Getting the error message

    // Initialize the model
    this.authenticationModel = new AuthenticationModel(this.authenticationService);
    this.overallCookieInterface = new OverallCookieModel();
  }

  // On click function of the login button
  loginClick() {
    // Starting the loading
    this.showLoading = true;
    // Calling the model to logout function
    this.authenticationModel.LogoutUserService(this.overallCookieInterface.GetUserEmail()).then(
      (data) => {
        // Clear the local storage cookie data
        this.overallCookieInterface.ClearCookies();
        // Redirect to the login page
        this.router.navigate(['/auth']);
        // Stop the loading
        this.showLoading = false;
      }
    );
    // End of Calling the model to logout function
  }
}
