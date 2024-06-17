import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { API$DOMAIN } from 'src/app/core/apiConfigurations';
import { catchError } from 'rxjs';
import { StaffDetails } from '../core/staffDetails';
import { ErrorMessage } from '../../common/core/errorMessage';
import { Filter } from '../../common/core/filters';
import { DisplayStaffDetails } from '../core/displayStaffDetails';
import { UserRole } from '../../common/core/userRole';
import { AccessSubTabDetails } from '../core/subTabDetails';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  // API Urls
  private SetStaffDetailsUrl = API$DOMAIN + 'api/Staff/SetStaffDetails';
  private UpdateStaffPasswordUrl = API$DOMAIN + 'api/Staff/UpdateStaffPassword';
  private UploadStaffAvatarUrl = API$DOMAIN + 'api/Staff/UploadStaffAvatar';
  private GetStaffPasswordUrl = API$DOMAIN + 'api/Staff/GetStaffPassword';
  private GetDisplayStaffDetailsUrl = API$DOMAIN + 'api/Staff/GetDisplayStaffDetails';
  private GetStaffDetailsUrl = API$DOMAIN + 'api/Staff/GetStaffDetails';
  private GetAllUserRolesUrl = API$DOMAIN + 'api/Staff/GetAllUserRoles';
  private GetStaffAvatarUrl = API$DOMAIN + 'api/Staff/GetStaffAvatar';
  private RemoveStaffAvatarUrl = API$DOMAIN + 'api/Staff/RemoveStaffAvatar';
  private GetTabDetailsBasedOnModuleCodeUrl = API$DOMAIN + 'api/Staff/GetTabDetailsBasedOnModuleCode';

  // Constructor
  constructor(private http: HttpClient, private router: Router) {

  }

  // Getting all access level tab details by module code
  GetTabDetailsBasedOnModuleCode(selectedModuleCode: string, userRoleCode: string, companyId: number) {
    // Setting the params
    let my_params = new HttpParams()
      .set("userRoleCode", userRoleCode.toString())
      .set("selectedModuleCode", selectedModuleCode.toString())
      .set("companyId", companyId.toString());

    return this.http.get<AccessSubTabDetails[]>(this.GetTabDetailsBasedOnModuleCodeUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetTabDetailsBasedOnModuleCode', error)
      })
    );
  }

  // Remove the staff avatar
  RemoveStaffAvatar(staffId: string, companyId: number) {
    // Setting the params
    let my_params = new HttpParams()
      .set("staffId", staffId.toString())
      .set("companyId", companyId.toString());

    return this.http.get<boolean>(this.RemoveStaffAvatarUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('RemoveStaffAvatar', error)
      })
    );
  }

  // Getting the staff avatar
  GetStaffAvatar(staffId: string, companyId: number) {
    // Setting the params
    let my_params = new HttpParams()
      .set("staffId", staffId.toString())
      .set("companyId", companyId.toString());

    return this.http.get<string>(this.GetStaffAvatarUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetAllUserRoles', error)
      })
    );
  }

  // Getting all the user roles
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

  // Getting the basic information of the user
  GetStaffDetails(staffId: string, companyId: number) {
    // Setting the params
    let my_params = new HttpParams()
      .set("companyId", companyId.toString())
      .set("staffId", staffId.toString());

    return this.http.get<StaffDetails>(this.GetStaffDetailsUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetStaffDetails', error)
      })
    );
  }

  // Get Display staff details
  GetDisplayStaffDetails(filter: Filter, companyId: number) {
    // Setting the params
    let my_params = new HttpParams()
      .set("companyId", companyId.toString());

    return this.http.post<DisplayStaffDetails[]>(this.GetDisplayStaffDetailsUrl, filter, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetDisplayStaffDetails', error)
      })
    );
  }

  // Setting the basic information of the user
  SetStaffDetails(staffDetails: StaffDetails, companyId: number, loggedUserId: string, actionType: string) {
    // Setting the params
    let my_params = new HttpParams()
      .set("companyId", companyId.toString())
      .set("actionType", actionType.toString())
      .set("loggedUserId", loggedUserId.toString());

    return this.http.post<string>(this.SetStaffDetailsUrl, staffDetails, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetAllSocialMediaList', error)
      })
    );
  }

  // Setting the staff password details
  UpdateStaffPassword(newPassword: string, staffId: string, companyId: number) {
    // Setting the params
    let my_params = new HttpParams()
      .set("newPassword", newPassword.toString())
      .set("staffId", staffId.toString())
      .set("companyId", companyId.toString());

    return this.http.get<string>(this.UpdateStaffPasswordUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('UpdateStaffPassword', error)
      })
    );
  }

  // Updating the staff avatar
  UploadStaffAvatar(staffId: string, companyId: number, files: any) {
    // Setting the params
    let my_params = new HttpParams()
      .set("staffId", staffId.toString())
      .set("companyId", companyId.toString());

    return this.http.post<string>(this.UploadStaffAvatarUrl, files, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('UploadStaffAvatar', error)
      })
    );
  }

  // Getting the staff password
  GetStaffPassword(staffId: string, companyId: number) {
    // Setting the params
    let my_params = new HttpParams()
      .set("staffId", staffId.toString())
      .set("companyId", companyId.toString());

    return this.http.get<string>(this.GetStaffPasswordUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetStaffPassword', error)
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
