import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { API$DOMAIN } from 'src/app/core/apiConfigurations';
import { Filter } from '../../common/core/filters';
import { Observable, catchError } from 'rxjs';
import { ErrorMessage } from '../../common/core/errorMessage';
import { ClientCustomer, DisplayClientDetails } from '../core/client';
import { Contact } from '../core/contact';
import { BusinessAddress } from '../core/businessAddress';
import { SocialMedia } from '../core/socialMedia';
import { RelationshipDetails } from '../core/relationshipDetails';
import { HourlyOtherRates } from '../core/hourlyOtherRates';
import { ResourceType } from '../core/resourceType';
import { ImageFiles } from '../core/imageFiles';
import { ClientRequirement } from '../core/clientRequirement';
import { GlobalFileDetails } from '../core/globalFileDetails';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  // API Urls
  private GetDisplayClientDetailsUrl = API$DOMAIN + 'api/Client/GetDisplayClientDetails';
  private GetAllContactListUrl = API$DOMAIN + 'api/Client/GetAllContactList';
  private SetClientCustomerUrl = API$DOMAIN + 'api/Client/SetClientCustomer';
  private GetClientCustomerUrl = API$DOMAIN + 'api/Client/GetClientCustomer';
  private SetBillingAddressUrl = API$DOMAIN + 'api/Client/SetBillingAddress';
  private GetBillingAddressUrl = API$DOMAIN + 'api/Client/GetBillingAddress';
  private SetContactDetailsUrl = API$DOMAIN + 'api/Client/SetContactDetails';
  private GetContactListDetailsUrl = API$DOMAIN + 'api/Client/GetContactListDetails';
  private SetSocialMediaDetailsUrl = API$DOMAIN + 'api/Client/SetSocialMediaDetails';
  private SetRelationshipDetailsUrl = API$DOMAIN + 'api/Client/SetRelationshipDetails';
  private GetRelationshipDetailsUrl = API$DOMAIN + 'api/Client/GetRelationshipDetails';
  private SetOtherRateDetailsUrl = API$DOMAIN + 'api/Client/SetOtherRateDetails';
  private GetHourlyOtherRateListDetailsUrl = API$DOMAIN + 'api/Client/GetHourlyOtherRateListDetails';
  private GetAllFilesListUrl = API$DOMAIN + 'api/Client/GetAllFilesList';
  private RemoveGlobalFileUrl = API$DOMAIN + 'api/Client/RemoveGlobalFile';
  private UploadGlobalFileUrl = API$DOMAIN + 'api/Client/UploadGlobalFile';
  private GetAllResourceFilesUrl = API$DOMAIN + 'api/Client/GetAllResourceFiles';
  private GetAllResourceFilesWithPaginationUrl = API$DOMAIN + 'api/Client/GetAllResourceFilesWithPagination';
  private SetResourceTypeDetailsUrl = API$DOMAIN + 'api/Client/SetResourceTypeDetails';
  private UploadImageDocFileUrl = API$DOMAIN + 'api/Client/UploadImageDocFile';
  private UpdateImageDocFileUrl = API$DOMAIN + 'api/Client/UpdateImageDocFile';
  private RemoveImageDocFileUrl = API$DOMAIN + 'api/Client/RemoveImageDocFile';
  private GetAllImageDocFilesUrl = API$DOMAIN + 'api/Client/GetAllImageDocFiles';
  private SetClientRequirementUrl = API$DOMAIN + 'api/Client/SetClientRequirement';
  private SetClientRequirementFileUrl = API$DOMAIN + 'api/Client/SetClientRequirementFile';
  private RemoveClientRequirementFileUrl = API$DOMAIN + 'api/Client/RemoveClientRequirementFile';
  private UpdateClientRequirementRankingUrl = API$DOMAIN + 'api/Client/UpdateClientRequirementRanking';
  private SetGlobalClientRequirementUrl = API$DOMAIN + 'api/Client/SetGlobalClientRequirement';
  private GetGlobalClientRequirementUrl = API$DOMAIN + 'api/Client/GetGlobalClientRequirement';
  private GetClientRequirementUrl = API$DOMAIN + 'api/Client/GetClientRequirement';
  private GetAllSocialMediaListUrl = API$DOMAIN + 'api/Client/GetAllSocialMediaList';
  private GetFileBlobDataUrl = API$DOMAIN + 'api/Common/GetFileBlobData';

  // Constructor
  constructor(private http: HttpClient, private router: Router) {

  }

  // Getting the social media list
  GetAllSocialMediaList(filter: Filter, customerId: number, companyId: number) {
    // Setting the params
    let my_params = new HttpParams()
      .set("companyId", companyId.toString())
      .set("customerId", customerId.toString());

    return this.http.post<SocialMedia[]>(this.GetAllSocialMediaListUrl, filter, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetAllSocialMediaList', error)
      })
    );
  }

  // Get Display client details
  GetDisplayClientDetails(filter: Filter, companyId: number) {
    // Setting the params
    let my_params = new HttpParams()
      .set("companyId", companyId.toString());

    return this.http.post<DisplayClientDetails[]>(this.GetDisplayClientDetailsUrl, filter, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetDisplayClientDetails', error)
      })
    );
  }

  // Get all the contact list
  SetClientCustomer(clientCustomer: ClientCustomer, staffId: string, actionType: string, companyId: number) {
    // Setting the params
    let my_params = new HttpParams()
      .set("companyId", companyId.toString())
      .set("staffId", staffId.toString())
      .set("actionType", actionType.toString());

    return this.http.post<number>(this.SetClientCustomerUrl, clientCustomer, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('SetClientCustomer', error)
      })
    );
  }

  // Setting the client customer
  GetAllContactList(filter: Filter, clientId: number, companyId: number) {
    // Setting the params
    let my_params = new HttpParams()
      .set("companyId", companyId.toString())
      .set("clientId", clientId.toString());

    return this.http.post<Contact[]>(this.GetAllContactListUrl, filter, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetAllContactList', error)
      })
    );
  }

  // Getting the client customer
  GetClientCustomer(clientId: number, companyId: number) {
    // Setting the params
    let my_params = new HttpParams()
      .set("companyId", companyId.toString())
      .set("clientId", clientId.toString());

    return this.http.get<ClientCustomer>(this.GetClientCustomerUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetClientCustomer', error)
      })
    );
  }

  // Getting the client customer
  SetBillingAddress(businessAddress: BusinessAddress, actionType: string, customerId: number, companyId: number) {
    // Setting the params
    let my_params = new HttpParams()
      .set("companyId", companyId.toString())
      .set("actionType", actionType.toString())
      .set("customerId", customerId.toString());

    return this.http.post<number>(this.SetBillingAddressUrl, businessAddress, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('SetBillingAddress', error)
      })
    );
  }

  // Getting the billing address
  GetBillingAddress(clientId: number, companyId: number) {
    // Setting the params
    let my_params = new HttpParams()
      .set("companyId", companyId.toString())
      .set("clientId", clientId.toString());

    return this.http.get<BusinessAddress>(this.GetBillingAddressUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetBillingAddress', error)
      })
    );
  }

  // Setting the Contact details
  SetContactDetails(contact: Contact, actionType: string, customerId: number, companyId: number) {
    // Setting the params
    let my_params = new HttpParams()
      .set("companyId", companyId.toString())
      .set("actionType", actionType.toString())
      .set("customerId", customerId.toString());

    return this.http.post<number>(this.SetContactDetailsUrl, contact, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('SetContactDetails', error)
      })
    );
  }

  // Getting the Contact list details
  GetContactListDetails(filter: Filter, customerId: number, companyId: number) {
    // Setting the params
    let my_params = new HttpParams()
      .set("companyId", companyId.toString())
      .set("customerId", customerId.toString());

    return this.http.post<Contact[]>(this.GetContactListDetailsUrl, filter, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetContactListDetails', error)
      })
    );
  }

  // Setting the social media details
  SetSocialMediaDetails(socialMedia: SocialMedia, actionType: string, customerId: number, companyId: number) {
    // Setting the params
    let my_params = new HttpParams()
      .set("companyId", companyId.toString())
      .set("customerId", customerId.toString())
      .set("actionType", actionType.toString());

    return this.http.post<number>(this.SetSocialMediaDetailsUrl, socialMedia, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('SetSocialMediaDetails', error)
      })
    );
  }

  // Setting the relationship details
  SetRelationshipDetails(relationshipDetails: RelationshipDetails, actionType: string, customerId: number, companyId: number) {
    // Setting the params
    let my_params = new HttpParams()
      .set("companyId", companyId.toString())
      .set("customerId", customerId.toString())
      .set("actionType", actionType.toString());

    return this.http.post<number>(this.SetRelationshipDetailsUrl, relationshipDetails, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('SetRelationshipDetails', error)
      })
    );
  }

  // Getting the relationship details
  GetRelationshipDetails(customerId: number, companyId: number) {
    // Setting the params
    let my_params = new HttpParams()
      .set("companyId", companyId.toString())
      .set("customerId", customerId.toString());

    return this.http.get<RelationshipDetails>(this.GetRelationshipDetailsUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetRelationshipDetails', error)
      })
    );
  }

  // Setting the other rates details
  SetOtherRateDetails(hourlyOtherRates: HourlyOtherRates, actionType: string, customerId: number, companyId: number) {
    // Setting the params
    let my_params = new HttpParams()
      .set("companyId", companyId.toString())
      .set("customerId", customerId.toString())
      .set("actionType", actionType.toString());

    return this.http.post<number>(this.SetOtherRateDetailsUrl, hourlyOtherRates, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('SetOtherRateDetails', error)
      })
    );
  }

  // Getting the Hourly Other Rate details
  GetHourlyOtherRateListDetails(filter: Filter, customerId: number, companyId: number) {
    // Setting the params
    let my_params = new HttpParams()
      .set("companyId", companyId.toString())
      .set("customerId", customerId.toString());

    return this.http.post<HourlyOtherRates[]>(this.GetHourlyOtherRateListDetailsUrl, filter, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetHourlyOtherRateListDetails', error)
      })
    );
  }

  // Getting all the global files
  GetAllFilesList(filter: Filter, customerId: number, companyId: number) {
    // Setting the params
    let my_params = new HttpParams()
      .set("companyId", companyId.toString())
      .set("customerId", customerId.toString());

    return this.http.post<GlobalFileDetails[]>(this.GetAllFilesListUrl, filter, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetAllFilesList', error)
      })
    );
  }

  // Removing global files
  RemoveGlobalFile(globalFileId: number, customerId: number, companyId: number) {
    // Setting the params
    let my_params = new HttpParams()
      .set("companyId", companyId.toString())
      .set("customerId", customerId.toString())
      .set("globalFileId", globalFileId.toString());

    return this.http.get<number>(this.RemoveGlobalFileUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('RemoveGlobalFile', error)
      })
    );
  }

  // Upload global file
  UploadGlobalFile(files: any, customerId: number, companyId: number) {
    // Setting the params
    let my_params = new HttpParams()
      .set("companyId", companyId.toString())
      .set("customerId", customerId.toString());

    return this.http.post<string>(this.UploadGlobalFileUrl, files, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('UploadGlobalFile', error)
      })
    );
  }

  // Getting all the resource files
  GetAllResourceFiles(customerId: number, companyId: number) {
    // Setting the params
    let my_params = new HttpParams()
      .set("companyId", companyId.toString())
      .set("customerId", customerId.toString());

    return this.http.get<ResourceType[]>(this.GetAllResourceFilesUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetAllResourceFiles', error)
      })
    );
  }

  // Getting all the resource files
  GetAllResourceFilesWithPagination(filter: Filter, customerId: number, companyId: number) {
    // Setting the params
    let my_params = new HttpParams()
      .set("companyId", companyId.toString())
      .set("customerId", customerId.toString());

    return this.http.post<ResourceType[]>(this.GetAllResourceFilesWithPaginationUrl, filter, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetAllResourceFilesWithPagination', error)
      })
    );
  }

  // Setting the resource type details
  SetResourceTypeDetails(resourceType: ResourceType, actionType: string, customerId: number, companyId: number) {
    // Setting the params
    let my_params = new HttpParams()
      .set("companyId", companyId.toString())
      .set("customerId", customerId.toString())
      .set("actionType", actionType.toString());

    return this.http.post<number>(this.SetResourceTypeDetailsUrl, resourceType, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('SetResourceTypeDetails', error)
      })
    );
  }

  // Setting the image doc files
  UploadImageDocFile(files: any, resourceTypeId: number, customerId: number, companyId: number, staffId: string) {
    // Setting the params
    let my_params = new HttpParams()
      .set("companyId", companyId.toString())
      .set("customerId", customerId.toString())
      .set("staffId", staffId.toString())
      .set("resourceTypeId", resourceTypeId.toString());

    return this.http.post<string>(this.UploadImageDocFileUrl, files, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('UploadImageDocFile', error)
      })
    );
  }

  // Updating the image doc files
  UpdateImageDocFile(imageFiles: ImageFiles, customerId: number, companyId: number, staffId: string) {
    // Setting the params
    let my_params = new HttpParams()
      .set("companyId", companyId.toString())
      .set("staffId", staffId.toString())
      .set("customerId", customerId.toString());

    return this.http.post<number>(this.UpdateImageDocFileUrl, imageFiles, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('UpdateImageDocFile', error)
      })
    );
  }

  // Removing the image doc files
  RemoveImageDocFile(imageFilesId: number, customerId: number, companyId: number) {
    // Setting the params
    let my_params = new HttpParams()
      .set("companyId", companyId.toString())
      .set("customerId", customerId.toString())
      .set("imageFilesId", imageFilesId.toString());

    return this.http.get<number>(this.RemoveImageDocFileUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('RemoveImageDocFile', error)
      })
    );
  }

  // Getting all the image doc files
  GetAllImageDocFiles(filter: Filter, customerId: number, companyId: number) {
    // Setting the params
    let my_params = new HttpParams()
      .set("companyId", companyId.toString())
      .set("customerId", customerId.toString());

    return this.http.post<ImageFiles[]>(this.GetAllImageDocFilesUrl, filter, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetAllImageDocFiles', error)
      })
    );
  }

  // Setting the client requirement
  SetClientRequirement(clientRequirement: ClientRequirement, actionType: string, customerId: number, companyId: number) {
    // Setting the params
    let my_params = new HttpParams()
      .set("companyId", companyId.toString())
      .set("customerId", customerId.toString())
      .set("actionType", actionType.toString());

    return this.http.post<number>(this.SetClientRequirementUrl, clientRequirement, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('SetClientRequirement', error)
      })
    );
  }

  // Setting the client requirement file
  SetClientRequirementFile(clientRequirementId: number, actionType: string, customerId: number, companyId: number, files: any) {
    // Setting the params
    let my_params = new HttpParams()
      .set("companyId", companyId.toString())
      .set("customerId", customerId.toString())
      .set("actionType", actionType.toString())
      .set("clientRequirementId", clientRequirementId.toString());

    return this.http.post<string>(this.SetClientRequirementFileUrl, files, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('SetClientRequirementFile', error)
      })
    );
  }

  // Removing the client requirement file
  RemoveClientRequirementFile(clientRequirementFileId: number, customerId: number, companyId: number) {
    // Setting the params
    let my_params = new HttpParams()
      .set("companyId", companyId.toString())
      .set("customerId", customerId.toString())
      .set("clientRequirementFileId", clientRequirementFileId.toString());

    return this.http.get<number>(this.RemoveClientRequirementFileUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('RemoveClientRequirementFile', error)
      })
    );
  }

  // Updating the client requirement ranking
  UpdateClientRequirementRanking(clientRequirementId: number, moveDirection: string, customerId: number, companyId: number) {
    // Setting the params
    let my_params = new HttpParams()
      .set("companyId", companyId.toString())
      .set("customerId", customerId.toString())
      .set("moveDirection", moveDirection.toString())
      .set("clientRequirementId", clientRequirementId.toString());

    return this.http.get<number>(this.UpdateClientRequirementRankingUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('UpdateClientRequirementRanking', error)
      })
    );
  }

  // Setting the client requirement
  SetGlobalClientRequirement(clientRequirement: ClientRequirement, actionType: string, customerId: number, companyId: number) {
    // Setting the params
    let my_params = new HttpParams()
      .set("companyId", companyId.toString())
      .set("customerId", customerId.toString())
      .set("actionType", actionType.toString());

    return this.http.post<number>(this.SetGlobalClientRequirementUrl, clientRequirement, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('SetGlobalClientRequirement', error)
      })
    );
  }

  // Getting the client requirement
  GetGlobalClientRequirement(filter: Filter, customerId: number, companyId: number) {
    // Setting the params
    let my_params = new HttpParams()
      .set("companyId", companyId.toString())
      .set("customerId", customerId.toString());

    return this.http.post<ClientRequirement[]>(this.GetGlobalClientRequirementUrl, filter, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetGlobalClientRequirement', error)
      })
    );
  }

  // Getting the client requirement
  GetClientRequirement(filter: Filter, customerId: number, companyId: number) {
    // Setting the params
    let my_params = new HttpParams()
      .set("companyId", companyId.toString())
      .set("customerId", customerId.toString());

    return this.http.post<ClientRequirement[]>(this.GetClientRequirementUrl, filter, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetClientRequirement', error)
      })
    );
  }

  // Downloading the file
  DownloadFile(url: string, fileName: string): Observable<Blob> {
    // Setting the params
    let my_params = new HttpParams()
      .set("fileUrl", url.toString())
      .set("fileName", fileName.toString());

    return this.http.get(this.GetFileBlobDataUrl + "?fileUrl=" + url.toString() + "&" + "fileName=" + fileName.toString(), { responseType: 'blob' });
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
