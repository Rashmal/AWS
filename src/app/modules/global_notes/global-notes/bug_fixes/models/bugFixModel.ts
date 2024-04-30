import { Subscription } from "rxjs";
import { Filter } from "src/app/modules/common/core/filters";
import { DisplayModule } from "src/app/modules/common/core/displayModule";
import { StatisticsBoxData } from "src/app/modules/common/core/statisticsBoxData";
import { BugFixesService } from "../services/bug-fixes.service";
import { BugFix } from "../core/bugFixesModels/bugFix";
import { ViewBugFix } from "../core/bugFixesModels/viewBugFix";
import { BugFixChangeDate } from "../core/bugFixesModels/bugFixChangeDate";
import { ViewBugFixChangeDate } from "../core/bugFixesModels/viewBugFixChangeDate";
import { BugFixComment } from "../core/bugFixesModels/bugFixComment";
import { ViewBugFixComment } from "../core/bugFixesModels/viewBugFixComment";

export class BugFixModel {
    //Store subscriptions
    allSubscriptions: Subscription[] = [];

    // Constructor
    constructor(private bugFixesService: BugFixesService) {

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
    SetBugFixesDetailsService(bugFix: BugFix, actionState: string, userId: string) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.bugFixesService.SetBugFixesDetails(bugFix, actionState, userId).subscribe(
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
    GetBugFixesDisplayModulesService(filter: Filter) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.bugFixesService.GetBugFixesDisplayModules(filter).subscribe(
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
    GetBugFixesDisplayListService(filter: Filter, userId: string) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.bugFixesService.GetBugFixesDisplayList(filter, userId).subscribe(
                data => {
                    let returnData = <ViewBugFix[]>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Getting the system enhancements details based on the Id
    GetBugFixesDetailsByIdService(bugFixId: string, userId: string) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.bugFixesService.GetBugFixesDetailsById(bugFixId, userId).subscribe(
                data => {
                    let returnData = <BugFix>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Updating the status of the system enhancement
    UpdateBugFixesStatusStatus(bugFixId: string, statusId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.bugFixesService.UpdateBugFixesStatus(bugFixId, statusId).subscribe(
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
    SetBugFixesChangeDateService(bugFixChangeDate: BugFixChangeDate, actionState: string) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.bugFixesService.SetBugFixesChangeDate(bugFixChangeDate, actionState).subscribe(
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
    GetBugFixesChangeDateService(filter: Filter, bugFixId: string) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.bugFixesService.GetBugFixesChangeDate(filter, bugFixId).subscribe(
                data => {
                    let returnData = <ViewBugFixChangeDate[]>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    // Set System Enhancement Comment
    SetBugFixesCommentService(bugFixComment: BugFixComment, actionState: string) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.bugFixesService.SetBugFixesComment(bugFixComment, actionState).subscribe(
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
    GetBugFixesCommentService(filter: Filter) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.bugFixesService.GetBugFixesComment(filter).subscribe(
                data => {
                    let returnData = <ViewBugFixComment[]>data;
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
            this.allSubscriptions.push(this.bugFixesService.GetStatBoxes().subscribe(
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
    ApprovalChangeDate(BugFixChangeHistoryId: number, approval: string) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.bugFixesService.ApprovalChangeDate(BugFixChangeHistoryId, approval).subscribe(
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
            this.allSubscriptions.push(this.bugFixesService.AddViewId(itemId, userId).subscribe(
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