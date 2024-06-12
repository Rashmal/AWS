import { Subscription } from "rxjs";
import { AuthenticationService } from "../services/authentication.service";
import { AccessLevel } from "../core/authenticationModals/accessLevel";

export class AuthenticationModel {
    //Store subscriptions
    allSubscriptions: Subscription[] = [];

    // Constructor
    constructor(private authenticationService: AuthenticationService) {

    }

    // Unsubscribe all
    UnsubscribeAll() {
        // Loop through the services
        for (let i = 0; i < this.allSubscriptions.length; i++) {
            this.allSubscriptions[i].unsubscribe();
        }
        // End of Loop through the services
    }

    // Authenticating the login
    LoginAuthenticationService(email: string, password: string) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.authenticationService.LoginAuthentication(email, password).subscribe(
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

    // Logout user
    LogoutUserService(email: string, companyId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.authenticationService.LogoutUser(email, companyId).subscribe(
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

    // Getting the user access level
    GetUserAccessLevelsService(userId: string) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this.authenticationService.GetUserAccessLevels(userId).subscribe(
                data => {
                    let returnData = <AccessLevel[]>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }
}