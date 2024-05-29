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
import { UserRoleAccessDetail } from '../core/userRoleAccessDetail';
import { RoleDetails } from '../core/roleDetails';
import { TermType } from '../core/termType';
import { SocialMediaType } from '../core/socialMediaType';
import { RatingDetails } from '../core/ratingDetails';
import { PriceClassification } from '../core/priceClassification';
import { DayDetails } from '../core/dayDetails';
import { Country } from '../core/country';
import { ContactType } from '../core/contactType';
import { ClientSize } from '../core/clientSize';
import { BusinessNumberType } from '../core/businessNumberType';
import { AccountDetails } from '../core/accountDetails';
import { Filter } from '../core/filters';

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
  private GetModuleListBasedUserRoleUrl = API$DOMAIN + 'api/Common/GetModuleListBasedUserRole';
  private GetAccessListBasedUserRoleUrl = API$DOMAIN + 'api/Common/GetAccessListBasedUserRole';
  private GetViewAccessListBasedUserRoleUrl = API$DOMAIN + 'api/Common/GetViewAccessListBasedUserRole';
  private GetAccountDetailsUrl = API$DOMAIN + 'api/Common/GetAccountDetails';
  private GetAllBusinessNumberTypesUrl = API$DOMAIN + 'api/Common/GetAllBusinessNumberTypes';
  private GetAllClientSizesUrl = API$DOMAIN + 'api/Common/GetAllClientSizes';
  private GetAllContactTypesUrl = API$DOMAIN + 'api/Common/GetAllContactTypes';
  private GetAllCountriesUrl = API$DOMAIN + 'api/Common/GetAllCountries';
  private GetAllDaysUrl = API$DOMAIN + 'api/Common/GetAllDays';
  private GetAllPriceClassificationsUrl = API$DOMAIN + 'api/Common/GetAllPriceClassifications';
  private GetAllRatingsUrl = API$DOMAIN + 'api/Common/GetAllRatings';
  private GetAllSocialMediaTypesUrl = API$DOMAIN + 'api/Common/GetAllSocialMediaTypes';
  private GetAllTermTypesUrl = API$DOMAIN + 'api/Common/GetAllTermTypes';
  private GetAllRoleDetailsUrl = API$DOMAIN + 'api/Common/GetAllRoleDetails';

  // Constructor
  constructor(private http: HttpClient, private router: Router) {

  }

  // Getting all the account details
  GetAccountDetails(filter: Filter) {
    // Setting the params
    let my_params = new HttpParams();

    return this.http.post<AccountDetails[]>(this.GetAccountDetailsUrl, filter, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetAccountDetails', error)
      })
    );
  }

  // Getting all the business number type details
  GetAllBusinessNumberTypes() {
    // Setting the params
    let my_params = new HttpParams();

    return this.http.get<BusinessNumberType[]>(this.GetAllBusinessNumberTypesUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetAllBusinessNumberTypes', error)
      })
    );
  }

  // Getting all the client size details
  GetAllClientSizes() {
    // Setting the params
    let my_params = new HttpParams();

    return this.http.get<ClientSize[]>(this.GetAllClientSizesUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetAllClientSizes', error)
      })
    );
  }

  // Getting all the contact type details
  GetAllContactTypes() {
    // Setting the params
    let my_params = new HttpParams();

    return this.http.get<ContactType[]>(this.GetAllContactTypesUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetAllContactTypes', error)
      })
    );
  }

  // Getting all the country details
  GetAllCountries() {
    // Setting the params
    let my_params = new HttpParams();

    return this.http.get<Country[]>(this.GetAllCountriesUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetAllCountries', error)
      })
    );
  }

  // Getting all the day details
  GetAllDays() {
    // Setting the params
    let my_params = new HttpParams();

    return this.http.get<DayDetails[]>(this.GetAllDaysUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetAllDays', error)
      })
    );
  }

  // Getting all the price classfication details
  GetAllPriceClassifications() {
    // Setting the params
    let my_params = new HttpParams();

    return this.http.get<PriceClassification[]>(this.GetAllPriceClassificationsUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetAllPriceClassifications', error)
      })
    );
  }

  // Getting all the rating details
  GetAllRatings() {
    // Setting the params
    let my_params = new HttpParams();

    return this.http.get<RatingDetails[]>(this.GetAllRatingsUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetAllRatings', error)
      })
    );
  }

  // Getting all the social media type details
  GetAllSocialMediaTypes() {
    // Setting the params
    let my_params = new HttpParams();

    return this.http.get<SocialMediaType[]>(this.GetAllSocialMediaTypesUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetAllSocialMediaTypes', error)
      })
    );
  }

  // Getting all the term type details
  GetAllTermTypes() {
    // Setting the params
    let my_params = new HttpParams();

    return this.http.get<TermType[]>(this.GetAllTermTypesUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetAllTermTypes', error)
      })
    );
  }

  // Getting all the role details
  GetAllRoleDetails() {
    // Setting the params
    let my_params = new HttpParams();

    return this.http.get<RoleDetails[]>(this.GetAllRoleDetailsUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetAllRoleDetails', error)
      })
    );
  }

  // Getting all the access list based on the user role for view
  GetViewAccessListBasedUserRole(userRole: string) {
    // Setting the params
    let my_params = new HttpParams()
      .set("userRole", userRole.toString());

    return this.http.get<Module[]>(this.GetViewAccessListBasedUserRoleUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetViewAccessListBasedUserRole', error)
      })
    );
  }

  // Getting all the access list based on the user role
  GetAccessListBasedUserRole(userRole: string) {
    // Setting the params
    let my_params = new HttpParams()
      .set("userRole", userRole.toString());

    return this.http.get<UserRoleAccessDetail[]>(this.GetAccessListBasedUserRoleUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetAccessListBasedUserRole', error)
      })
    );
  }

  // Getting the module list based on user role
  GetModuleListBasedUserRole(userRole: string, isStatic: boolean) {
    // Setting the params
    let my_params = new HttpParams()
      .set("userRole", userRole.toString())
      .set("isStatic", isStatic.toString());

    return this.http.get<Module[]>(this.GetModuleListBasedUserRoleUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetModuleListBasedUserRole', error)
      })
    );
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
