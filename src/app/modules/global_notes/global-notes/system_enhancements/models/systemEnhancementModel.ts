import { Subscription } from "rxjs";
import { SystemEnhancementsService } from "../services/system-enhancements.service";
import { SystemEnhancement } from "../core/systemEnhancementModels/systemEnhancement";
import { Filter } from "src/app/modules/common/core/filters";
import { DisplayModule } from "src/app/modules/common/core/displayModule";
import { ViewSystemEnhancement } from "../core/systemEnhancementModels/viewSystemEnhancement";
import { SystemEnhancementChangeDate } from "../core/systemEnhancementModels/systemEnhancementChangeDate";
import { ViewSystemEnhancementChangeDate } from "../core/systemEnhancementModels/viewSystemEnhancementChangeDate";
import { SystemEnhancementComment } from "../core/systemEnhancementModels/systemEnhancementComment";
import { ViewSystemEnhancementComment } from "../core/systemEnhancementModels/viewSystemEnhancementComment";
import { StatisticsBoxData } from "src/app/modules/common/core/statisticsBoxData";

export class SystemEnhancementModel {
    //Store subscriptions
    allSubscriptions: Subscription[] = [];

    // Constructor
    constructor(private systemEnhancementsService: SystemEnhancementsService) {

    }

    // Unsubscribe all
    UnsubscribeAll() {
        // Loop through the services
        for (let i = 0; i < this.allSubscriptions.length; i++) {
            this.allSubscriptions[i].unsubscribe();
        }
        // End of Loop through the services
    }

    // Set System Enhancement Details
    SetSystemEnhancementDetailsService(systemEnhancement: SystemEnhancement, actionState: string, userId: string) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.systemEnhancementsService.SetSystemEnhancementDetails(systemEnhancement, actionState, userId).subscribe(
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

    // Getting the system enhancements modules to display
    GetSystemEnhancementDisplayModulesService(filter: Filter) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.systemEnhancementsService.GetSystemEnhancementDisplayModules(filter).subscribe(
                data => {
                    let returnData = <DisplayModule[]>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Getting the system enhancements display list
    GetSystemEnhancementDisplayListService(filter: Filter, userId: string) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.systemEnhancementsService.GetSystemEnhancementDisplayList(filter, userId).subscribe(
                data => {
                    let returnData = <ViewSystemEnhancement[]>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Getting the system enhancements details based on the Id
    GetSystemEnhancementDetailsByIdService(systemEnhancementId: string) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.systemEnhancementsService.GetSystemEnhancementDetailsById(systemEnhancementId).subscribe(
                data => {
                    let returnData = <SystemEnhancement>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Updating the status of the system enhancement
    UpdateSystemEnhancementStatus(systemEnhancementId: string, statusId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.systemEnhancementsService.UpdateSystemEnhancementStatus(systemEnhancementId, statusId).subscribe(
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

    // Set System Enhancement Change date history
    SetSystemEhancementChangeDateService(systemEnhancementId: SystemEnhancementChangeDate, actionState: string) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.systemEnhancementsService.SetSystemEhancementChangeDate(systemEnhancementId, actionState).subscribe(
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

    // Get System Enhancement Change date history
    GetSystemEhancementChangeDateService(filter: Filter, systemEnhancementId: string) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.systemEnhancementsService.GetSystemEhancementChangeDate(filter, systemEnhancementId).subscribe(
                data => {
                    let returnData = <ViewSystemEnhancementChangeDate[]>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Set System Enhancement Comment
    SetSystemEhancementCommentService(systemEnhancementComment: SystemEnhancementComment, actionState: string) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.systemEnhancementsService.SetSystemEhancementComment(systemEnhancementComment, actionState).subscribe(
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

    // Get System Enhancement Comment
    GetSystemEhancementCommentService(filter: Filter) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.systemEnhancementsService.GetSystemEhancementComment(filter).subscribe(
                data => {
                    let returnData = <ViewSystemEnhancementComment[]>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Getting the stat boxes
    GetStatBoxes() {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.systemEnhancementsService.GetStatBoxes().subscribe(
                data => {
                    let returnData = <StatisticsBoxData[]>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Approval of change date history
    ApprovalChangeDate(SystemEnhancementsChangeHistoryId: number, approval: string) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.systemEnhancementsService.ApprovalChangeDate(SystemEnhancementsChangeHistoryId, approval).subscribe(
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

    // Adding the view Id for the system enhancement
    AddViewId(itemId: string, userId: string) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.systemEnhancementsService.AddViewId(itemId, userId).subscribe(
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