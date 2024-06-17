import { Directive, ElementRef, Inject, Input } from '@angular/core';
import { OverallCookieInterface } from '../core/overallCookieInterface';
import { OverallCookieModel } from '../core/overallCookieModel';
import { DOCUMENT } from '@angular/common';
import { CommonModel } from '../models/commonModel';
import { CommonService } from '../services/common.service';
import { UserRoleAccessDetail } from '../core/userRoleAccessDetail';
import { StaffModel } from '../../aws_staff_user/models/staffModel';
import { StaffService } from '../../aws_staff_user/services/staff.service';
import { AccessSubTabDetails } from '../../aws_staff_user/core/subTabDetails';

@Directive({
  selector: '[appAccessLevelVerification]',
  standalone: false
})
export class AccessLevelVerificationDirective {
  // Get component name what's need to hide
  @Input() SelectedModuleCode = '';
  @Input() SelectedModuleAccessCode = '';
  @Input() SelectedFeatureAccessCode = '';
  @Input() IsTab = false;
  @Input() ActionState = 'ADD'; // ADD,EDIT,DELETE,VIEW
  // Storing the cookie modal
  OverallCookieAccessible: OverallCookieInterface;
  // Storing the common model
  commonModel: CommonModel;
  //Store staff model
  staffModel !: StaffModel;

  constructor(private elf: ElementRef<HTMLElement>, @Inject(DOCUMENT) private document: any,
    private commonService: CommonService, private staffService: StaffService) {
    // Initializing the model
    this.OverallCookieAccessible = new OverallCookieModel();
    this.commonModel = new CommonModel(this.commonService);
    this.staffModel = new StaffModel(this.staffService);
  }

  ngOnInit(): void {

    // Getting the access list
    this.staffModel.GetTabDetailsBasedOnModuleCode(this.SelectedModuleCode, this.OverallCookieAccessible.GetUserRole(), this.OverallCookieAccessible.GetCompanyId()).then(
      (data) => {
        // Getting the access list
        let userAccessList: AccessSubTabDetails[] = <AccessSubTabDetails[]>data;

        // Check whether to check only the tab
        if (this.IsTab == true) {
          // Check whether access level exists
          let tabAccessLevelIndex = userAccessList.findIndex(obj => obj.SubTabCode == this.SelectedModuleAccessCode);
          if (tabAccessLevelIndex !== -1 && userAccessList[tabAccessLevelIndex].EnableAccess == false) {
            this.elf.nativeElement.remove();
          }
        } else {
          debugger
          // Check for the access level feature code
          let tabAccessLevelIndex = userAccessList.findIndex(obj => obj.SubTabCode == this.SelectedModuleAccessCode);

          if (tabAccessLevelIndex !== -1) {
            // Getting the feature access code
            let featureAccessCode = userAccessList[tabAccessLevelIndex].AccessLevelFeatureDetailsList.findIndex(obj => obj.Code == this.SelectedFeatureAccessCode)

            // Checking the ADD access
            if (featureAccessCode != -1 && this.ActionState == 'ADD' && userAccessList[tabAccessLevelIndex].AccessLevelFeatureDetailsList[featureAccessCode].AddAccess == false) {
              this.elf.nativeElement.remove();
            }
            // End of Checking the ADD access

            // Checking the EDIT access
            else if (featureAccessCode != -1 && this.ActionState == 'EDIT' && userAccessList[tabAccessLevelIndex].AccessLevelFeatureDetailsList[featureAccessCode].EditAccess == false) {
              this.elf.nativeElement.remove();
            }
            // End of Checking the EDIT access

            // Checking the DELETE access
            else if (featureAccessCode != -1 && this.ActionState == 'DELETE' && userAccessList[tabAccessLevelIndex].AccessLevelFeatureDetailsList[featureAccessCode].DeleteAccess == false) {
              this.elf.nativeElement.remove();
            }
            // End of Checking the DELETE access

            // Checking the VIEW access
            else if (featureAccessCode != -1 && this.ActionState == 'VIEW' && userAccessList[tabAccessLevelIndex].AccessLevelFeatureDetailsList[featureAccessCode].ViewAccess == false) {
              this.elf.nativeElement.remove();
            }
            // End of Checking the VIEW access
          }
          // End of Check for the access level feature code
        }
        // End of Check whether to check only the tab

      }
    );
    // End of Getting the access list

    // Getting the access list
    // this.commonModel.GetAccessListBasedUserRoleService(this.OverallCookieAccessible.GetUserRole(), this.OverallCookieAccessible.GetCompanyId()).then(
    //   (data) => {
    //     // Getting the access list
    //     let userAccessList: UserRoleAccessDetail[] = <UserRoleAccessDetail[]>data;
    //     // Filter by the list
    //     let userAccessListObject: UserRoleAccessDetail = userAccessList.filter(obj => obj.ModuleCode == this.SelectedModuleCode)[0];
    //     // Check whether access level exists
    //     let accessExistsAll = userAccessListObject.AccessList.split(',').findIndex(obj => obj.toUpperCase() == 'ALL');
    //     let accessExistsCode = userAccessListObject.AccessList.split(',').findIndex(obj => obj.toUpperCase() == this.SelectedModuleAccessCode.toUpperCase());

    //     // Check if the user has no access
    //     if (accessExistsAll == -1 && accessExistsCode == -1) {
    //       this.elf.nativeElement.remove();
    //     }
    //     // End of Check if the user has no access
    //   }
    // );
    // End of Getting the access list
  }

}
