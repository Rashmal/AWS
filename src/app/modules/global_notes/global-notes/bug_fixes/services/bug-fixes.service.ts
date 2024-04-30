import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { API$DOMAIN } from 'src/app/core/apiConfigurations';
import { BugFix } from '../core/bugFixesModels/bugFix';
import { catchError } from 'rxjs';
import { Filter } from 'src/app/modules/common/core/filters';
import { DisplayModule } from 'src/app/modules/common/core/displayModule';
import { ViewBugFix } from '../core/bugFixesModels/viewBugFix';
import { BugFixChangeDate } from '../core/bugFixesModels/bugFixChangeDate';
import { ViewBugFixChangeDate } from '../core/bugFixesModels/viewBugFixChangeDate';
import { BugFixComment } from '../core/bugFixesModels/bugFixComment';
import { ViewBugFixComment } from '../core/bugFixesModels/viewBugFixComment';
import { StatisticsBoxData } from 'src/app/modules/common/core/statisticsBoxData';
import { ErrorMessage } from 'src/app/modules/common/core/errorMessage';

@Injectable({
  providedIn: 'root'
})
export class BugFixesService {
  // API Urls
  private SetBugFixesDetailsUrl = API$DOMAIN + 'api/BugFixes/SetBugFixesDetails';
  private GetBugFixesDisplayModulesUrl = API$DOMAIN + 'api/BugFixes/GetBugFixesDisplayModules';
  private GetBugFixesDisplayListUrl = API$DOMAIN + 'api/BugFixes/GetBugFixesDisplayList';
  private GetBugFixesDetailsByIdUrl = API$DOMAIN + 'api/BugFixes/GetBugFixesDetailsById';
  private UpdateBugFixesStatusUrl = API$DOMAIN + 'api/BugFixes/UpdateBugFixesStatus';
  private SetBugFixesChangeDateUrl = API$DOMAIN + 'api/BugFixes/SetBugFixesChangeDate';
  private GetBugFixesChangeDateUrl = API$DOMAIN + 'api/BugFixes/GetBugFixesChangeDate';
  private SetBugFixesCommentUrl = API$DOMAIN + 'api/BugFixes/SetBugFixesComment';
  private GetBugFixesCommentUrl = API$DOMAIN + 'api/BugFixes/GetBugFixesComment';
  private GetStatBoxesUrl = API$DOMAIN + 'api/BugFixes/GetStatBoxes';
  private ApprovalChangeDateUrl = API$DOMAIN + 'api/BugFixes/ApprovalChangeDate';
  private AddViewIdUrl = API$DOMAIN + 'api/BugFixes/AddViewId';

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
  ApprovalChangeDate(BugFixChangeHistoryId: number, approval: string) {
    // Setting the params
    let my_params = new HttpParams()
      .set("BugFixChangeHistoryId", BugFixChangeHistoryId.toString())
      .set("approval", approval.toString());

    return this.http.get<boolean>(this.ApprovalChangeDateUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('ApprovalChangeDate', error)
      })
    );
  }

  // Set System Enhancement Details
  SetBugFixesDetails(bugFixes: BugFix, actionState: string, userId: string) {
    // Setting the params
    let my_params = new HttpParams()
      .set("actionState", actionState.toString())
      .set("userId", userId.toString());

    return this.http.post<string>(this.SetBugFixesDetailsUrl, bugFixes, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('SetBugFixesDetails', error)
      })
    );
  }

  // Getting the system enhancements modules to display
  GetBugFixesDisplayModules(filter: Filter) {
    // Setting the params
    let my_params = new HttpParams();

    return this.http.post<DisplayModule[]>(this.GetBugFixesDisplayModulesUrl, filter, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetBugFixesDisplayModules', error)
      })
    );
  }

  // Getting the system enhancements display list
  GetBugFixesDisplayList(filter: Filter, userId: string) {
    // Setting the params
    let my_params = new HttpParams()
      .set("UserId", userId.toString());

    return this.http.post<ViewBugFix[]>(this.GetBugFixesDisplayListUrl, filter, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetBugFixesDisplayList', error)
      })
    );
  }

  // Getting the system enhancements details based on the Id
  GetBugFixesDetailsById(bugFixesId: string, userId: string) {
    // Setting the params
    let my_params = new HttpParams()
    .set("userId", userId.toString())
      .set("bugFixesId", bugFixesId.toString());

    return this.http.get<BugFix>(this.GetBugFixesDetailsByIdUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetBugFixesDetailsById', error)
      })
    );
  }

  // Updating the status of the system enhancement
  UpdateBugFixesStatus(bugFixesId: string, statusId: number) {
    // Setting the params
    let my_params = new HttpParams()
      .set("bugFixesId", bugFixesId.toString())
      .set("statusId", statusId.toString());

    return this.http.get<boolean>(this.UpdateBugFixesStatusUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('UpdateBugFixesStatus', error)
      })
    );
  }

  // Set System Enhancement Change date history
  SetBugFixesChangeDate(bugFixesChangeDate: BugFixChangeDate, actionState: string) {
    // Setting the params
    let my_params = new HttpParams()
      .set("actionState", actionState.toString());

    return this.http.post<string>(this.SetBugFixesChangeDateUrl, bugFixesChangeDate, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('SetBugFixesChangeDate', error)
      })
    );
  }

  // Get System Enhancement Change date history
  GetBugFixesChangeDate(filter: Filter, bugFixesId: string) {
    // Setting the params
    let my_params = new HttpParams()
      .set("bugFixesId", bugFixesId.toString());

    return this.http.post<ViewBugFixChangeDate[]>(this.GetBugFixesChangeDateUrl, filter, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetBugFixesChangeDate', error)
      })
    );
  }

  // Set System Enhancement Comment
  SetBugFixesComment(bugFixComment: BugFixComment, actionState: string) {
    // Setting the params
    let my_params = new HttpParams()
      .set("actionState", actionState.toString());

    return this.http.post<string>(this.SetBugFixesCommentUrl, bugFixComment, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('SetBugFixesComment', error)
      })
    );
  }

  // Get System Enhancement Comment
  GetBugFixesComment(filter: Filter) {
    // Setting the params
    let my_params = new HttpParams();

    return this.http.post<ViewBugFixComment[]>(this.GetBugFixesCommentUrl, filter, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetBugFixesComment', error)
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
