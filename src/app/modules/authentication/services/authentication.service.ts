import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { API$DOMAIN } from 'src/app/core/apiConfigurations';
import { AccessLevel } from '../core/authenticationModals/accessLevel';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // API Urls
  private LoginAuthenticationUrl = API$DOMAIN + 'api/Authentication/LoginAuthentication';
  private LogoutUserUrl = API$DOMAIN + 'api/Authentication/LogoutUser';
  private GetUserAccessLevelsUrl = API$DOMAIN + 'api/Authentication/GetUserAccessLevels';

  // Constructor
  constructor(private http: HttpClient) {

  }

  // Authenticating the login
  LoginAuthentication(email: string, password: string) {
    // Setting the params
    let my_params = new HttpParams()
      .set("email", email.toString())
      .set("password", password.toString());

    return this.http.get<string>(this.LoginAuthenticationUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('LoginAuthentication', error)
      })
    );
  }

  // Logout user
  LogoutUser(email: string) {
    // Setting the params
    let my_params = new HttpParams()
      .set("email", email.toString());

    return this.http.get<boolean>(this.LogoutUserUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('LogoutUser', error)
      })
    );
  }

  // Getting the user access level
  GetUserAccessLevels(userId: string) {
    // Setting the params
    let my_params = new HttpParams()
      .set("userId", userId.toString());

    return this.http.get<AccessLevel[]>(this.GetUserAccessLevelsUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetUserAccessLevels', error)
      })
    );
  }

  //----------- Common methods------------------//
  //The function of handling the error
  private handleError(methodName: string, exception: Error) {
    return ('Server error');
  }
}
