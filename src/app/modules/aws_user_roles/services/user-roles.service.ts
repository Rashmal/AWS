import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorMessage } from '../../common/core/errorMessage';
import { catchError } from 'rxjs';
import { UserRole } from '../../common/core/userRole';
import { API$DOMAIN } from 'src/app/core/apiConfigurations';
import { Module } from '../../common/core/module';

@Injectable({
  providedIn: 'root'
})
export class UserRolesService {
   // API Urls
   private GetAllUserRolesUrl = API$DOMAIN + 'api/Staff/GetAllUserRoles';
   private SetUserRolesUrl = API$DOMAIN + 'api/Staff/SetUserRoles';
   private GetAllModulesBasedUserRoleUrl = API$DOMAIN + 'api/Staff/GetAllModulesbasedUserRole';
   private SetModuleAccessUrl = API$DOMAIN + 'api/Staff/SetModuleAccess';
   private GetAccessibleModulesUrl = API$DOMAIN + 'api/Staff/GetAccessibleModules';

 

  constructor(private http: HttpClient, private router: Router) {

   }

  // Get all modules based on role
  GetAccessibleModules(companyId: number, userRoleId: number) {
    // Setting the params
    let my_params = new HttpParams()
      .set("companyId", companyId.toString())
      .set("userRoleId", userRoleId.toString());

    return this.http.get<Module[]>(this.GetAccessibleModulesUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetAccessibleModules', error)
      })
    );
  }

  // Get all modules based on role
  SetModuleAccess(companyId: number, userRoleId: number, moduleAccess: boolean, moduleId: number) {
    // Setting the params
    let my_params = new HttpParams()
      .set("companyId", companyId.toString())
      .set("userRoleId", userRoleId.toString())
      .set("moduleAccess", moduleAccess.toString())
      .set("moduleId", moduleId.toString());

    return this.http.get<boolean>(this.SetModuleAccessUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('SetModuleAccess', error)
      })
    );
  }


  // Get all modules based on role
  GetAllModulesBasedUserRole(companyId: number, userRoleId: number) {
    // Setting the params
    let my_params = new HttpParams()
      .set("companyId", companyId.toString())
      .set("userRoleId", userRoleId.toString());

    return this.http.get<Module[]>(this.GetAllModulesBasedUserRoleUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetAllModulesBasedUserRole', error)
      })
    );
  }

   // Set the user role
   SetUserRoles(companyId: number, userRole: UserRole, actionType: string) {
    // Setting the params
    let my_params = new HttpParams()
      .set("companyId", companyId.toString())
      .set("actionType", actionType.toString());

    return this.http.post<number>(this.SetUserRolesUrl, userRole, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('SetUserRoles', error)
      })
    );
  }

   // Getting the user role list
   GetAllUserRoles(companyId: number) {
    // Setting the params
    let my_params = new HttpParams()
      .set("companyId", companyId.toString());

    return this.http.get<UserRole[]>(this.GetAllUserRolesUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetAllUserRoles', error)
      })
    );
  }

  
    //----------- Common methods------------------//
  //The function of handling the error
  private handleError(methodName: string, exception: Error) {
    // Creating the error message object 
    let errorMessage: ErrorMessage = {
      Name: exception.name,
      Message: exception.message,
      StatusText: exception['statusText'],
      Url: exception['url']
    };
    // Redirect to the error message
    this.router.navigate(['errorMessage'], { state: { response: errorMessage } });
    return ('Server error');
  }
}
