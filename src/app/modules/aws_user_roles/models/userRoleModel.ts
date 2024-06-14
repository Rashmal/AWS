import { Subscription } from "rxjs";
import { UserRolesService } from "../services/user-roles.service";
import { UserRole } from "../../common/core/userRole";
import { Module } from "../../common/core/module";

export class UserRolesModel{
     //Store subscriptions
     allSubscriptions: Subscription[] = [];

      // Constructor
    constructor(private clientService: UserRolesService) {

    }

    // Unsubscribe all
    UnsubscribeAll() {
        // Loop through the services
        for (let i = 0; i < this.allSubscriptions.length; i++) {
            this.allSubscriptions[i].unsubscribe();
        }
        // End of Loop through the services
    }

     // Get all user roles
     GetAllUserRoles(companyId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.clientService.GetAllUserRoles(companyId).subscribe(
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
     // Set user role details
     SetUserRoles(companyId: number, userRole: UserRole, actionType: string) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.clientService.SetUserRoles(companyId, userRole, actionType).subscribe(
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

    // Get all modules by user role
    GetAllModulesBasedUserRole(companyId: number, userRoleId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.clientService.GetAllModulesBasedUserRole(companyId, userRoleId).subscribe(
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

    // Get all accessible modules by user role
    GetAccessibleModules(companyId: number, userRoleId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.clientService.GetAccessibleModules(companyId, userRoleId).subscribe(
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

    // Set module access
    SetModuleAccess(companyId: number, userRoleId: number, moduleAccess: boolean, moduleId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.clientService.SetModuleAccess(companyId, userRoleId, moduleAccess, moduleId).subscribe(
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