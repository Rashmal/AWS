import { Subscription } from "rxjs";
import { ClientService } from "../services/client.service";
import { Filter } from "../../common/core/filters";
import { ClientCustomer, DisplayClientDetails } from "../core/client";
import { Contact } from "../core/contact";
import { BusinessAddress } from "../core/businessAddress";
import { SocialMedia } from "../core/socialMedia";
import { RelationshipDetails } from "../core/relationshipDetails";
import { HourlyOtherRates } from "../core/hourlyOtherRates";
import { GlobalFileDetails } from "../core/globalFileDetails";
import { ResourceType } from "../core/resourceType";
import { ImageFiles } from "../core/imageFiles";
import { ClientRequirement } from "../core/clientRequirement";

export class ClientModel {
    //Store subscriptions
    allSubscriptions: Subscription[] = [];

    // Constructor
    constructor(private clientService: ClientService) {

    }

    // Unsubscribe all
    UnsubscribeAll() {
        // Loop through the services
        for (let i = 0; i < this.allSubscriptions.length; i++) {
            this.allSubscriptions[i].unsubscribe();
        }
        // End of Loop through the services
    }

    // Get Display client details
    GetDisplayClientDetails(filter: Filter, companyId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.clientService.GetDisplayClientDetails(filter, companyId).subscribe(
                data => {
                    let returnData = <DisplayClientDetails[]>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Get all the contact list
    SetClientCustomer(clientCustomer: ClientCustomer, staffId: number, actionType: string, companyId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.clientService.SetClientCustomer(clientCustomer, staffId, actionType, companyId).subscribe(
                data => {
                    let returnData = <string>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Setting the client customer
    GetAllContactList(clientId: number, companyId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.clientService.GetAllContactList(clientId, companyId).subscribe(
                data => {
                    let returnData = <Contact[]>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Getting the client customer
    GetClientCustomer(clientId: number, companyId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.clientService.GetClientCustomer(clientId, companyId).subscribe(
                data => {
                    let returnData = <ClientCustomer>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Getting the client customer
    SetBillingAddress(businessAddress: BusinessAddress, actionType: string, customerId: number, companyId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.clientService.SetBillingAddress(businessAddress, actionType, customerId, companyId).subscribe(
                data => {
                    let returnData = <number>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Getting the billing address
    GetBillingAddress(clientId: number, companyId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.clientService.GetBillingAddress(clientId, companyId).subscribe(
                data => {
                    let returnData = <BusinessAddress>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Setting the Contact details
    SetContactDetails(contact: Contact, actionType: string, customerId: number, companyId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.clientService.SetContactDetails(contact, actionType, customerId, companyId).subscribe(
                data => {
                    let returnData = <number>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Getting the Contact list details
    GetContactListDetails(filter: Filter, customerId: number, companyId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.clientService.GetContactListDetails(filter, customerId, companyId).subscribe(
                data => {
                    let returnData = <Contact[]>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Setting the social media details
    SetSocialMediaDetails(socialMedia: SocialMedia, actionType: string, customerId: number, companyId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.clientService.SetSocialMediaDetails(socialMedia, actionType, customerId, companyId).subscribe(
                data => {
                    let returnData = <number>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Setting the relationship details
    SetRelationshipDetails(relationshipDetails: RelationshipDetails, actionType: string, customerId: number, companyId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.clientService.SetRelationshipDetails(relationshipDetails, actionType, customerId, companyId).subscribe(
                data => {
                    let returnData = <number>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Getting the relationship details
    GetRelationshipDetails(customerId: number, companyId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.clientService.GetRelationshipDetails(customerId, companyId).subscribe(
                data => {
                    let returnData = <RelationshipDetails>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Setting the other rates details
    SetOtherRateDetails(hourlyOtherRates: HourlyOtherRates, actionType: string, customerId: number, companyId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.clientService.SetOtherRateDetails(hourlyOtherRates, actionType, customerId, companyId).subscribe(
                data => {
                    let returnData = <number>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Getting the Hourly Other Rate details
    GetHourlyOtherRateListDetails(filter: Filter, customerId: number, companyId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.clientService.GetHourlyOtherRateListDetails(filter, customerId, companyId).subscribe(
                data => {
                    let returnData = <HourlyOtherRates[]>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Getting all the global files
    GetAllFilesList(filter: Filter, customerId: number, companyId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.clientService.GetAllFilesList(filter, customerId, companyId).subscribe(
                data => {
                    let returnData = <GlobalFileDetails[]>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Removing global files
    RemoveGlobalFile(globalFileId: number, customerId: number, companyId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.clientService.RemoveGlobalFile(globalFileId, customerId, companyId).subscribe(
                data => {
                    let returnData = <number>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Upload global file
    UploadGlobalFile(customerId: number, companyId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.clientService.UploadGlobalFile(customerId, companyId).subscribe(
                data => {
                    let returnData = <string>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Getting all the resource files
    GetAllResourceFiles(customerId: number, companyId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.clientService.GetAllResourceFiles(customerId, companyId).subscribe(
                data => {
                    let returnData = <ResourceType[]>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Getting all the resource files
    GetAllResourceFilesWithPagination(filter: Filter, customerId: number, companyId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.clientService.GetAllResourceFilesWithPagination(filter, customerId, companyId).subscribe(
                data => {
                    let returnData = <ResourceType[]>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Setting the resource type details
    SetResourceTypeDetails(resourceType: ResourceType, actionType: string, customerId: number, companyId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.clientService.SetResourceTypeDetails(resourceType, actionType, customerId, companyId).subscribe(
                data => {
                    let returnData = <number>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Setting the image doc files
    UploadImageDocFile(files: any, resourceTypeId: number, customerId: number, companyId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.clientService.UploadImageDocFile(files, resourceTypeId, customerId, companyId).subscribe(
                data => {
                    let returnData = <string>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Updating the image doc files
    UpdateImageDocFile(imageFiles: ImageFiles, customerId: number, companyId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.clientService.UpdateImageDocFile(imageFiles, customerId, companyId).subscribe(
                data => {
                    let returnData = <number>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Removing the image doc files
    RemoveImageDocFile(imageFilesId: number, customerId: number, companyId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.clientService.RemoveImageDocFile(imageFilesId, customerId, companyId).subscribe(
                data => {
                    let returnData = <number>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Getting all the image doc files
    GetAllImageDocFiles(filter: Filter, customerId: number, companyId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.clientService.GetAllImageDocFiles(filter, customerId, companyId).subscribe(
                data => {
                    let returnData = <ImageFiles[]>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Setting the client requirement
    SetClientRequirement(clientRequirement: ClientRequirement, actionType: string, customerId: number, companyId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.clientService.SetClientRequirement(clientRequirement, actionType, customerId, companyId).subscribe(
                data => {
                    let returnData = <number>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Setting the client requirement file
    SetClientRequirementFile(clientRequirementId: number, actionType: string, customerId: number, companyId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.clientService.SetClientRequirementFile(clientRequirementId, actionType, customerId, companyId).subscribe(
                data => {
                    let returnData = <string>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Removing the client requirement file
    RemoveClientRequirementFile(clientRequirementFileId: number, customerId: number, companyId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.clientService.RemoveClientRequirementFile(clientRequirementFileId, customerId, companyId).subscribe(
                data => {
                    let returnData = <number>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Updating the client requirement ranking
    UpdateClientRequirementRanking(clientRequirementId: number, moveDirection: string, customerId: number, companyId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.clientService.UpdateClientRequirementRanking(clientRequirementId, moveDirection, customerId, companyId).subscribe(
                data => {
                    let returnData = <number>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Setting the client requirement
    SetGlobalClientRequirement(clientRequirement: ClientRequirement, actionType: string, customerId: number, companyId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.clientService.SetGlobalClientRequirement(clientRequirement, actionType, customerId, companyId).subscribe(
                data => {
                    let returnData = <number>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Getting the client requirement
    GetGlobalClientRequirement(filter: Filter, customerId: number, companyId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.clientService.GetGlobalClientRequirement(filter, customerId, companyId).subscribe(
                data => {
                    let returnData = <ClientRequirement[]>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Getting the client requirement
    GetClientRequirement(filter: Filter, customerId: number, companyId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.clientService.GetClientRequirement(filter, customerId, companyId).subscribe(
                data => {
                    let returnData = <ClientRequirement[]>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }
}