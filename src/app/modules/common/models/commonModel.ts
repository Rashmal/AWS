import { Subscription } from "rxjs";
import { CommonService } from "../services/common.service";
import { Priority } from "../core/priority";
import { Status } from "../core/status";
import { Module } from "../core/module";
import { BasicUserDetails } from "../../authentication/core/authenticationModals/basicUserDetails";
import { UserRoleAccessDetail } from "../core/userRoleAccessDetail";
import { AccountDetails } from "../core/accountDetails";
import { BusinessNumberType } from "../core/businessNumberType";
import { ClientSize } from "../core/clientSize";
import { ContactType } from "../core/contactType";
import { Country } from "../core/country";
import { DayDetails } from "../core/dayDetails";
import { PriceClassification } from "../core/priceClassification";
import { RatingDetails } from "../core/ratingDetails";
import { SocialMediaType } from "../core/socialMediaType";
import { TermType } from "../core/termType";
import { RoleDetails } from "../core/roleDetails";
import { Filter } from "../core/filters";

export class CommonModel {
    //Store subscriptions
    allSubscriptions: Subscription[] = [];

    // Constructor
    constructor(private commonService: CommonService) {

    }

    // Unsubscribe all
    UnsubscribeAll() {
        // Loop through the services
        for (let i = 0; i < this.allSubscriptions.length; i++) {
            this.allSubscriptions[i].unsubscribe();
        }
        // End of Loop through the services
    }

    // Check if the email exists
    CheckEmailExistsService(userEmail: string) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.commonService.CheckEmailExists(userEmail).subscribe(
                data => {
                    let returnData = <boolean>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Getting the priority list
    GetPriorityListService() {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.commonService.GetPriorityList().subscribe(
                data => {
                    let returnData = <Priority[]>data;;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Getting the status list
    GetStatusListService(moduleCode: string) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.commonService.GetStatusList(moduleCode).subscribe(
                data => {
                    let returnData = <Status[]>data;;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Getting the module list
    GetModuleListService() {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.commonService.GetModuleList().subscribe(
                data => {
                    let returnData = <Module[]>data;;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Getting the module list
    GetModuleListServiceLocal() {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.commonService.GetModuleListLocal().subscribe(
                data => {
                    let returnData = <Module[]>data;;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Getting all the staff list
    GetAllStaffListService() {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.commonService.GetAllStaffList().subscribe(
                data => {
                    let returnData = <BasicUserDetails[]>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Get notification count for tabs
    GetNotificationCount(tabSelection: string, userId: string) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.commonService.GetNotificationCount(tabSelection, userId).subscribe(
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

    // Getting the module list based on user role
    GetModuleListBasedUserRoleService(userRole: string, isStatic: boolean) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.commonService.GetModuleListBasedUserRole(userRole, isStatic).subscribe(
                data => {
                    let returnData = <Module[]>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Getting all the access list based on the user role
    GetAccessListBasedUserRoleService(userRole: string) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.commonService.GetAccessListBasedUserRole(userRole).subscribe(
                data => {
                    let returnData = <UserRoleAccessDetail[]>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Getting all the access list based on the user role for view
    GetViewAccessListBasedUserRole(userRole: string) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.commonService.GetViewAccessListBasedUserRole(userRole).subscribe(
                data => {
                    let returnData = <Module[]>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Getting all the account details
    GetAccountDetails(filter: Filter) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.commonService.GetAccountDetails(filter).subscribe(
                data => {
                    let returnData = <AccountDetails[]>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Getting all the business number type details
    GetAllBusinessNumberTypes() {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.commonService.GetAllBusinessNumberTypes().subscribe(
                data => {
                    let returnData = <BusinessNumberType[]>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Getting all the client size details
    GetAllClientSizes() {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.commonService.GetAllClientSizes().subscribe(
                data => {
                    let returnData = <ClientSize[]>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Getting all the contact type details
    GetAllContactTypes() {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.commonService.GetAllContactTypes().subscribe(
                data => {
                    let returnData = <ContactType[]>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Getting all the country details
    GetAllCountries() {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.commonService.GetAllCountries().subscribe(
                data => {
                    let returnData = <Country[]>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Getting all the day details
    GetAllDays() {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.commonService.GetAllDays().subscribe(
                data => {
                    let returnData = <DayDetails[]>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Getting all the price classfication details
    GetAllPriceClassifications() {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.commonService.GetAllPriceClassifications().subscribe(
                data => {
                    let returnData = <PriceClassification[]>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Getting all the rating details
    GetAllRatings() {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.commonService.GetAllRatings().subscribe(
                data => {
                    let returnData = <RatingDetails[]>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Getting all the social media type details
    GetAllSocialMediaTypes() {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.commonService.GetAllSocialMediaTypes().subscribe(
                data => {
                    let returnData = <SocialMediaType[]>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Getting all the term type details
    GetAllTermTypes() {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.commonService.GetAllTermTypes().subscribe(
                data => {
                    let returnData = <TermType[]>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Getting all the role details
    GetAllRoleDetails() {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.commonService.GetAllRoleDetails().subscribe(
                data => {
                    let returnData = <RoleDetails[]>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }
}