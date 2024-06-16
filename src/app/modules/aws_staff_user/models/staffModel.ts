import { Subscription } from "rxjs";
import { StaffService } from "../services/staff.service";
import { StaffDetails } from "../core/staffDetails";
import { Filter } from "../../common/core/filters";
import { DisplayStaffDetails } from "../core/displayStaffDetails";
import { UserRole } from "../../common/core/userRole";

export class StaffModel {
    //Store subscriptions
    allSubscriptions: Subscription[] = [];

    // Constructor
    constructor(private staffService: StaffService) {

    }

    // Unsubscribe all
    UnsubscribeAll() {
        // Loop through the services
        for (let i = 0; i < this.allSubscriptions.length; i++) {
            this.allSubscriptions[i].unsubscribe();
        }
        // End of Loop through the services
    }

    // Setting the basic information of the user
    SetStaffDetails(staffDetails: StaffDetails, companyId: number, loggedUserId: string, actionType: string) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.staffService.SetStaffDetails(staffDetails, companyId, loggedUserId, actionType).subscribe(
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

    // Setting the staff password details
    UpdateStaffPassword(newPassword: string, staffId: string, companyId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.staffService.UpdateStaffPassword(newPassword, staffId, companyId).subscribe(
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

    // Updating the staff avatar
    UploadStaffAvatar(staffId: string, companyId: number, files: any) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.staffService.UploadStaffAvatar(staffId, companyId, files).subscribe(
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

    // Getting the staff password
    GetStaffPassword(staffId: string, companyId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.staffService.GetStaffPassword(staffId, companyId).subscribe(
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

    // Get Display staff details
    GetDisplayStaffDetails(filter: Filter, companyId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.staffService.GetDisplayStaffDetails(filter, companyId).subscribe(
                data => {
                    let returnData = <DisplayStaffDetails[]>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Getting the basic information of the user
    GetStaffDetails(staffId: string, companyId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.staffService.GetStaffDetails(staffId, companyId).subscribe(
                data => {
                    let returnData = <StaffDetails>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Getting all the user roles
    GetAllUserRoles(companyId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.staffService.GetAllUserRoles(companyId).subscribe(
                data => {
                    let returnData = <UserRole[]>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Getting the staff avatar
    GetStaffAvatar(staffId: string, companyId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.staffService.GetStaffAvatar(staffId, companyId).subscribe(
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

    // Remove the staff avatar
    RemoveStaffAvatar(staffId: string, companyId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.staffService.RemoveStaffAvatar(staffId, companyId).subscribe(
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

}