import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationModel } from '../../models/authenticationModel';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonModel } from 'src/app/modules/common/models/commonModel';
import { CommonService } from 'src/app/modules/common/services/common.service';
import { IErrorMessage } from 'src/app/modules/common/core/iErrorMessage';
import { Router } from '@angular/router';
import { OverallCookieInterface } from 'src/app/modules/common/core/overallCookieInterface';
import { OverallCookieModel } from 'src/app/modules/common/core/overallCookieModel';
import { LOGIN$USER_EMAIL$LIMIT, LOGIN$USER_PASSWORD$LIMIT } from 'src/app/core/apiConfigurations';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {

  // Store the variable to store user email
  user_email: string = "";
  // Store the variable to store user password
  user_password: string = "";
  // Store the authentication model
  authenticationModel: AuthenticationModel;
  // Store the common model
  commonModel: CommonModel;
  // Store the error messages
  errorMessagesList: IErrorMessage[] = [];
  // Store the cookie interface
  overallCookieInterface: OverallCookieInterface;
  // Store the email list
  emailLimit: number = LOGIN$USER_EMAIL$LIMIT;
  // Store the password list
  passwordLimit: number = LOGIN$USER_PASSWORD$LIMIT;

  // Constructor
  constructor(private authenticationService: AuthenticationService, private commonService: CommonService,
    private router: Router) {
    // Initialize the model
    this.authenticationModel = new AuthenticationModel(this.authenticationService);
    this.commonModel = new CommonModel(this.commonService);
    this.overallCookieInterface = new OverallCookieModel();
  }

  ngOnDestroy() {
    // Unsubscribe all
    this.authenticationModel.UnsubscribeAll();
  }

  ngOnInit(): void {
    // Check if the cookie model exists the ID
    // if (this.overallCookieInterface.GetUserId() && this.overallCookieInterface.GetUserId().trim() != '') {
    //   // Redirect to the main dashboard
    //   this.router.navigate(['/layout']);
    // }
    // End of Check if the cookie model exists the ID
  }

  // On click button of login button
  loginOnClick() {
    // Validate the fields in the login page
    this.validateFields();
    // End of Validate the fields in the login page

    // Check if the error messages length
    if (this.errorMessagesList.length > 0) {
      return;
    }
    // End of Check if the error messages length

    // Check if the email exists in the DB
    this.commonModel.CheckEmailExistsService(this.user_email).then(
      (data) => {
        // Getting the email validation
        let emailExists: boolean = <boolean>data;
        // Check if the email exists
        if (emailExists) {
          // Validate the login details
          this.authenticationModel.LoginAuthenticationService(this.user_email, this.user_password).then(
            (data) => {
              debugger
              // Getting the login validation
              let loginToken: string = <string>data;
              // Check if the token is valid
              if (loginToken.includes("ERROR")) {
                // Pushing the error message
                this.errorMessagesList.push(
                  {
                    ErrorCode: 'INVALID$LOGIN',
                    ErrorMessage: 'Invalid password'
                  }
                );
              } else {
                // Setting the user token
                this.overallCookieInterface.SetUserToken(loginToken);
                // Navigate to the layout
                this.router.navigate(['/layout']);
              }
              // End of Check if the token is valid
            }
          );
          // End of Validate the login details
        } else {
          // Pushing the error message
          this.errorMessagesList.push(
            {
              ErrorCode: 'NOT$EXISTS$USER$EMAIL',
              ErrorMessage: 'User email does not exists'
            }
          );
        }
        // End of Check if the email exists
      }
    );
    // End of Check if the email exists in the DB  
  }

  // Validate the login fields
  validateFields() {
    // Clear the error message list
    this.errorMessagesList = [];

    // Check if the user email exists
    if (!(this.user_email && this.user_email != '')) {
      // Pushing the error message
      this.errorMessagesList.push(
        {
          ErrorCode: 'EMPTY$USER$EMAIL',
          ErrorMessage: 'User email is mandatory'
        }
      );
    } else {
      // Check if the email is proper format
      let regex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,300})+$/);
      if (!regex.test(this.user_email)) {
        // Pushing the error message
        this.errorMessagesList.push(
          {
            ErrorCode: 'EMAIL$FORMAT',
            ErrorMessage: 'Email is not valid !!'
          }
        );
      }
      // End of Check if the email is proper format
    }
    // End of Check if the user email exists

    // Check if the user password exists
    if (!(this.user_password && this.user_password != '')) {
      // Pushing the error message
      this.errorMessagesList.push(
        {
          ErrorCode: 'EMPTY$USER$PASSWORD',
          ErrorMessage: 'User password is mandatory'
        }
      );
    } else {
      // Check if the stakeholder name length
      if (!(this.user_password && this.user_password.length > 2)) {
        // Pushing the error message
        this.errorMessagesList.push(
          {
            ErrorCode: 'LENGTH$USER$PASSWORD',
            ErrorMessage: 'User password is must be more than 2 characters'
          }
        );
      }
      // End of Check if the stakeholder name length
    }
    // End of Check if the user password exists

    // Check if error message is empty
    if (this.errorMessagesList.length > 0) {
      return;
    }
    // End of Check if error message is empty
  }

  // Check if the error exists
  CheckErrorCode(errorCode: string) {
    // Find for the code
    let indexObject = this.errorMessagesList.findIndex(obj => obj.ErrorCode == errorCode);
    // Return the error object
    if (indexObject < 0) {
      return null;
    } else {
      return this.errorMessagesList[indexObject];
    }
  }

  // On change event of the email input
  onPasteEmailFunction(event) {
    // Getting the current text
    let currentText = event.target.value;
    // Removing the special characters
    currentText = currentText.replace(/[^a-zA-Z0-9@_.]/g, "")
    // Cutting the extra characters from the word
    this.user_email = currentText.substr(0, this.emailLimit);
  }

  // On change event of the password input
  onPastePasswordFunction(event) {
    // Getting the current text
    let currentText = event.target.value;
    // Cutting the extra characters from the word
    this.user_password = currentText.substr(0, this.passwordLimit);
  }

}
