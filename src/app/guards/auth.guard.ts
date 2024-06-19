import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Router, RouterStateSnapshot } from '@angular/router';
import { CommonModel } from '../modules/common/models/commonModel';
import { CommonService } from '../modules/common/services/common.service';
import { OverallCookieInterface } from '../modules/common/core/overallCookieInterface';
import { OverallCookieModel } from '../modules/common/core/overallCookieModel';
import { Module } from '../modules/common/core/module';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  // Store the module code
  moduleCode: string = "";
  // Store common module
  commonModel: CommonModel;
  // Store the cookie interface
  overallCookieInterface: OverallCookieInterface;

  constructor(private router: Router, private commonService: CommonService) {
    // Initialize the common modal
    this.commonModel = new CommonModel(this.commonService);
    this.overallCookieInterface = new OverallCookieModel();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Check if the module code exists
    if (route.data['moduleCode']) {
      // Setting the module code
      this.moduleCode = route.data['moduleCode'] as string;

      // Calling the service to retrieve all the module list
      this.commonModel.GetViewAccessListBasedUserRole(this.overallCookieInterface.GetUserRole(), this.overallCookieInterface.GetCompanyId(), this.overallCookieInterface.GetUserId())
        .then((data: Module[]) => {
          // Getting the module list
          let moduleList: Module[] = data;
          // Getting the index
          let indexObj = moduleList.findIndex(obj => obj.ModuleCode == this.moduleCode && obj.IsDisable == false);
          // Check if the index exists or not
          if (indexObj != -1) {
            return true;
          } else {
            // Redirect to the home page
            this.router.navigate(['/']);
            return false;
          }
          // End of Check if the index exists or not
        }
        );
      // End of Calling the service to retrieve all the module list
      return true;
    } else {
      return true;
    }
    // End of Check if the module code exists
  }

  canActivateChild(): boolean {
    debugger
    return this.checkAuth();
  }

  canDeactivate(): boolean {
    debugger
    return true;
  }

  canLoad(): boolean {
    return this.checkAuth();
  }

  private checkAuth(): boolean {
    debugger
    if (true) {
      return true;
    } else {
      // Redirect to the login page if the user is not authenticated
      this.router.navigate(['/login']);
      return false;
    }
  }

}