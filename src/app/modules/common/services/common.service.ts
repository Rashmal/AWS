import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { API$DOMAIN } from 'src/app/core/apiConfigurations';
import { Priority } from '../core/priority';
import { Status } from '../core/status';
import { Module } from '../core/module';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  // API Urls
  private CheckEmailExistsUrl = API$DOMAIN + 'api/Common/CheckEmailExists';
  private GetPriorityListUrl = API$DOMAIN + 'api/Common/GetPriorityList';
  private GetStatusListUrl = API$DOMAIN + 'api/Common/GetStatusList';
  private GetModuleListUrl = API$DOMAIN + 'api/Common/GetModuleList';

  // Constructor
  constructor(private http: HttpClient) {

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

  //----------- Common methods------------------//
  //The function of handling the error
  private handleError(methodName: string, exception: Error) {
    return ('Server error');
  }

}
