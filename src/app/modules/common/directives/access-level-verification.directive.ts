import { Directive, ElementRef, Inject, Input, Renderer2 } from '@angular/core';
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
  @Input() ActionState = 'ADD'; // ADD,EDIT,DELETE
  @Input() ActionType = 'HIDE'; // HIDE,DISABLE
  //@Input() isViewClickable = false;
  // Storing the cookie modal
  OverallCookieAccessible: OverallCookieInterface;
  // Storing the common model
  commonModel: CommonModel;
  //Store staff model
  staffModel !: StaffModel;

  constructor(private elf: ElementRef<HTMLElement>, @Inject(DOCUMENT) private document: any,
    private commonService: CommonService, private staffService: StaffService,
    private renderer: Renderer2) {
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
            // Performing the action
            this.performDisabledAction();
          }
        } else {
          // Check for the access level feature code
          let tabAccessLevelIndex = userAccessList.findIndex(obj => obj.SubTabCode == this.SelectedModuleAccessCode);

          if (tabAccessLevelIndex !== -1) {
            // Getting the feature access code
            let featureAccessCode = userAccessList[tabAccessLevelIndex].AccessLevelFeatureDetailsList.findIndex(obj => obj.Code == this.SelectedFeatureAccessCode)

            // Checking the ADD access
            if (featureAccessCode != -1 && this.ActionState == 'ADD' && userAccessList[tabAccessLevelIndex].AccessLevelFeatureDetailsList[featureAccessCode].AddAccess == false) {
              // Performing the action
              this.performDisabledAction();
            }
            // End of Checking the ADD access

            // Checking the EDIT access
            else if (featureAccessCode != -1 && this.ActionState == 'EDIT' && userAccessList[tabAccessLevelIndex].AccessLevelFeatureDetailsList[featureAccessCode].EditAccess == false) {
              // Performing the action
              this.performDisabledAction();
            }
            // End of Checking the EDIT access

            // Checking the DELETE access
            else if (featureAccessCode != -1 && this.ActionState == 'DELETE' && userAccessList[tabAccessLevelIndex].AccessLevelFeatureDetailsList[featureAccessCode].DeleteAccess == false) {
              // Performing the action
              this.performDisabledAction();
            }
            // End of Checking the DELETE access

            // Checking the VIEW access
            else if (featureAccessCode != -1 && this.ActionState == 'VIEW' && userAccessList[tabAccessLevelIndex].AccessLevelFeatureDetailsList[featureAccessCode].ViewAccess == false) {
              // Performing the action
              this.performDisabledAction();
            }
            // End of Checking the VIEW access
          }
          // End of Check for the access level feature code
        }
        // End of Check whether to check only the tab

      }
    );
    // End of Getting the access list
  }

  // Performing the action
  performDisabledAction() {
    // Checking the action type
    switch (this.ActionType) {
      case 'HIDE':
        this.elf.nativeElement.remove();
        break;
      case 'DISABLE':
        // Making the element disabled
        this.elf.nativeElement.setAttribute('disabled', 'true');

        // Check if its a prime ng dropdown and disabling it
        const dropdownElement = this.elf.nativeElement.querySelector('.p-dropdown');
        if (dropdownElement) {
          dropdownElement.classList.add('p-disabled');
        }
        // End of Check if its a prime ng dropdown and disabling it
        break;
      case 'DISABLE$DIV':
        // Disabling any normal click event
        const divElement = this.elf.nativeElement.querySelector('.access_div');
        if (divElement) {
          divElement.classList.add('disabled_div');
        }
        // End of Disabling any normal click event
        break;
    }
    // End of Checking the action type
  }

  private preventClick(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
  }

}
