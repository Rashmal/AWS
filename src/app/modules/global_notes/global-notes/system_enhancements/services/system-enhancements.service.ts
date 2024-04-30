import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { API$DOMAIN } from 'src/app/core/apiConfigurations';
import { SystemEnhancement } from '../core/systemEnhancementModels/systemEnhancement';
import { catchError } from 'rxjs';
import { ErrorMessage } from 'src/app/modules/common/core/errorMessage';
import { Filter } from 'src/app/modules/common/core/filters';
import { DisplayModule } from 'src/app/modules/common/core/displayModule';
import { ViewSystemEnhancement } from '../core/systemEnhancementModels/viewSystemEnhancement';
import { SystemEnhancementChangeDate } from '../core/systemEnhancementModels/systemEnhancementChangeDate';
import { SystemEnhancementComment } from '../core/systemEnhancementModels/systemEnhancementComment';
import { ViewSystemEnhancementChangeDate } from '../core/systemEnhancementModels/viewSystemEnhancementChangeDate';
import { ViewSystemEnhancementComment } from '../core/systemEnhancementModels/viewSystemEnhancementComment';
import { StatisticsBoxData } from 'src/app/modules/common/core/statisticsBoxData';

@Injectable({
  providedIn: 'root'
})
export class SystemEnhancementsService {
  // API Urls
  private SetSystemEnhancementDetailsUrl = API$DOMAIN + 'api/SystemEnhancement/SetSystemEnhancementDetails';
  private GetSystemEnhancementDisplayModulesUrl = API$DOMAIN + 'api/SystemEnhancement/GetSystemEnhancementDisplayModules';
  private GetSystemEnhancementDisplayListUrl = API$DOMAIN + 'api/SystemEnhancement/GetSystemEnhancementDisplayList';
  private GetSystemEnhancementDetailsByIdUrl = API$DOMAIN + 'api/SystemEnhancement/GetSystemEnhancementDetailsById';
  private UpdateSystemEnhancementStatusUrl = API$DOMAIN + 'api/SystemEnhancement/UpdateSystemEnhancementStatus';
  private SetSystemEhancementChangeDateUrl = API$DOMAIN + 'api/SystemEnhancement/SetSystemEhancementChangeDate';
  private GetSystemEhancementChangeDateUrl = API$DOMAIN + 'api/SystemEnhancement/GetSystemEhancementChangeDate';
  private SetSystemEhancementCommentUrl = API$DOMAIN + 'api/SystemEnhancement/SetSystemEhancementComment';
  private GetSystemEhancementCommentUrl = API$DOMAIN + 'api/SystemEnhancement/GetSystemEhancementComment';
  private GetStatBoxesUrl = API$DOMAIN + 'api/SystemEnhancement/GetStatBoxes';
  private ApprovalChangeDateUrl = API$DOMAIN + 'api/SystemEnhancement/ApprovalChangeDate';
  private AddViewIdUrl = API$DOMAIN + 'api/SystemEnhancement/AddViewId';

  // Constructor
  constructor(private http: HttpClient, private router: Router) {

  }

  // Adding the view Id for the system enhancement
  AddViewId(itemId: string, userId: string) {
    // Setting the params
    let my_params = new HttpParams()
      .set("itemId", itemId.toString())
      .set("userId", userId.toString());

    return this.http.get<boolean>(this.AddViewIdUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('AddViewId', error)
      })
    );
  }

  // Approval of change date history
  ApprovalChangeDate(SystemEnhancementsChangeHistoryId: number, approval: string) {
    // Setting the params
    let my_params = new HttpParams()
      .set("SystemEnhancementsChangeHistoryId", SystemEnhancementsChangeHistoryId.toString())
      .set("approval", approval.toString());

    return this.http.get<boolean>(this.ApprovalChangeDateUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('ApprovalChangeDate', error)
      })
    );
  }

  // Set System Enhancement Details
  SetSystemEnhancementDetails(systemEnhancement: SystemEnhancement, actionState: string, userId: string) {
    // Setting the params
    let my_params = new HttpParams()
      .set("actionState", actionState.toString())
      .set("userId", userId.toString());

    return this.http.post<string>(this.SetSystemEnhancementDetailsUrl, systemEnhancement, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('SetSystemEnhancementDetails', error)
      })
    );
  }

  // Getting the system enhancements modules to display
  GetSystemEnhancementDisplayModules(filter: Filter) {
    // Setting the params
    let my_params = new HttpParams();

    return this.http.post<DisplayModule[]>(this.GetSystemEnhancementDisplayModulesUrl, filter, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetSystemEnhancementDisplayModules', error)
      })
    );
  }

  // Getting the system enhancements display list
  GetSystemEnhancementDisplayList(filter: Filter, userId: string) {
    // Setting the params
    let my_params = new HttpParams()
      .set("UserId", userId.toString());

    return this.http.post<ViewSystemEnhancement[]>(this.GetSystemEnhancementDisplayListUrl, filter, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetSystemEnhancementDisplayList', error)
      })
    );
  }

  // Getting the system enhancements details based on the Id
  GetSystemEnhancementDetailsById(systemEnhancementId: string, userId: string) {
    // Setting the params
    let my_params = new HttpParams()
    .set("userId", userId.toString())
      .set("systemEnhancementId", systemEnhancementId.toString());

    return this.http.get<SystemEnhancement>(this.GetSystemEnhancementDetailsByIdUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetSystemEnhancementDetailsById', error)
      })
    );
  }

  // Updating the status of the system enhancement
  UpdateSystemEnhancementStatus(systemEnhancementId: string, statusId: number) {
    // Setting the params
    let my_params = new HttpParams()
      .set("systemEnhancementId", systemEnhancementId.toString())
      .set("statusId", statusId.toString());

    return this.http.get<boolean>(this.UpdateSystemEnhancementStatusUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('UpdateSystemEnhancementStatus', error)
      })
    );
  }

  // Set System Enhancement Change date history
  SetSystemEhancementChangeDate(systemEnhancementChangeDate: SystemEnhancementChangeDate, actionState: string) {
    // Setting the params
    let my_params = new HttpParams()
      .set("actionState", actionState.toString());

    return this.http.post<string>(this.SetSystemEhancementChangeDateUrl, systemEnhancementChangeDate, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('SetSystemEhancementChangeDate', error)
      })
    );
  }

  // Get System Enhancement Change date history
  GetSystemEhancementChangeDate(filter: Filter, systemEnhancementId: string) {
    // Setting the params
    let my_params = new HttpParams()
      .set("systemEnhancementId", systemEnhancementId.toString());

    return this.http.post<ViewSystemEnhancementChangeDate[]>(this.GetSystemEhancementChangeDateUrl, filter, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetSystemEhancementChangeDate', error)
      })
    );
  }

  // Set System Enhancement Comment
  SetSystemEhancementComment(systemEnhancementComment: SystemEnhancementComment, actionState: string) {
    // Setting the params
    let my_params = new HttpParams()
      .set("actionState", actionState.toString());

    return this.http.post<string>(this.SetSystemEhancementCommentUrl, systemEnhancementComment, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('SetSystemEhancementComment', error)
      })
    );
  }

  // Get System Enhancement Comment
  GetSystemEhancementComment(filter: Filter) {
    // Setting the params
    let my_params = new HttpParams();

    return this.http.post<ViewSystemEnhancementComment[]>(this.GetSystemEhancementCommentUrl, filter, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetSystemEhancementComment', error)
      })
    );
  }

  // Getting the stat boxes
  GetStatBoxes() {
    // Setting the params
    let my_params = new HttpParams();

    return this.http.get<StatisticsBoxData[]>(this.GetStatBoxesUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetStatBoxes', error)
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
