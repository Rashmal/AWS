import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { API$DOMAIN } from 'src/app/core/apiConfigurations';
import { Priority } from '../core/priority';
import { Status } from '../core/status';
import { Module } from '../core/module';
import { Router } from '@angular/router';
import { ErrorMessage } from '../core/errorMessage';
import { BasicUserDetails } from '../../authentication/core/authenticationModals/basicUserDetails';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  // API Urls
  private CheckEmailExistsUrl = API$DOMAIN + 'api/Common/CheckEmailExists';
  private GetPriorityListUrl = API$DOMAIN + 'api/Common/GetPriorityList';
  private GetStatusListUrl = API$DOMAIN + 'api/Common/GetStatusList';
  private GetModuleListUrl = API$DOMAIN + 'api/Common/GetModuleList';
  private GetAllStaffListUrl = API$DOMAIN + 'api/Common/GetAllStaffList';
  private GetNotificationCountUrl = API$DOMAIN + 'api/Common/TotalGlobalNotes';


  // Constructor
  constructor(private http: HttpClient, private router: Router) {

  }

  // Check if the email exists
  CheckEmailExists(userEmail: string) {
    // Setting the params
    let my_params = new HttpParams()
      .set("userEmail", userEmail.toString());

    return this.http.get<boolean>(this.CheckEmailExistsUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('CheckEmailExists', error)
      })
    );
  }

  // Getting the priority list
  GetPriorityList() {
    // Setting the params
    let my_params = new HttpParams();

    return this.http.get<Priority[]>(this.GetPriorityListUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetPriorityList', error)
      })
    );
  }

  // Getting the status list
  GetStatusList(moduleCode: string) {
    // Setting the params
    let my_params = new HttpParams()
      .set("moduleCode", moduleCode.toString());

    return this.http.get<Status[]>(this.GetStatusListUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetStatusList', error)
      })
    );
  }

  // Getting the module list
  GetModuleList() {
    // Setting the params
    let my_params = new HttpParams();

    return this.http.get<Module[]>(this.GetModuleListUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetModuleList', error)
      })
    );
  }

  // Getting the module list
  GetModuleListLocal() {
    // Setting the params
    let my_params = new HttpParams();

    return this.http.get<Module[]>('assets/sidemenuItems.json');
  }

  // Getting all the staff list
  GetAllStaffList() {
    // Setting the params
    let my_params = new HttpParams();

    return this.http.get<BasicUserDetails[]>(this.GetAllStaffListUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetAllStaffList', error)
      })
    );
  }

  // Getting all the staff list
  GetNotificationCount(tabSelection: string, userId: string) {
    // Setting the params
    let my_params = new HttpParams()
      .set("tabSection", tabSelection.toString())
      .set("userId", userId.toString());

    return this.http.get<number>(this.GetNotificationCountUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetNotificationCount', error)
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
