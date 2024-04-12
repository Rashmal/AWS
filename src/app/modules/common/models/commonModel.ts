import { Subscription } from "rxjs";
import { CommonService } from "../services/common.service";
import { Priority } from "../core/priority";
import { Status } from "../core/status";
import { Module } from "../core/module";

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
                    let returnData = <boolean>data;;
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
}