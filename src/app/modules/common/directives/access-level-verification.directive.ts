import { Directive, ElementRef, Inject, Input } from '@angular/core';
import { OverallCookieInterface } from '../core/overallCookieInterface';
import { OverallCookieModel } from '../core/overallCookieModel';
import { DOCUMENT } from '@angular/common';
import { CommonModel } from '../models/commonModel';
import { CommonService } from '../services/common.service';
import { UserRoleAccessDetail } from '../core/userRoleAccessDetail';

@Directive({
  selector: '[appAccessLevelVerification]',
  standalone: false
})
export class AccessLevelVerificationDirective {
  // Get component name what's need to hide
  @Input() SelectedModuleCode = '';
  @Input() SelectedModuleAccessCode = '';
  // Storing the cookie modal
  OverallCookieAccessible: OverallCookieInterface;
  // Storing the common model
  commonModel: CommonModel;

  constructor(private elf: ElementRef<HTMLElement>, @Inject(DOCUMENT) private document: any,
    private commonService: CommonService) {
    // Initializing the model
    this.OverallCookieAccessible = new OverallCookieModel();
    this.commonModel = new CommonModel(this.commonService);
  }

  ngOnInit(): void {
    // Getting the access list
    this.commonModel.GetAccessListBasedUserRoleService(this.OverallCookieAccessible.GetUserRole()).then(
      (data) => {
        // Getting the access list
        let userAccessList: UserRoleAccessDetail[] = <UserRoleAccessDetail[]>data;
        // Filter by the list
        let userAccessListObject: UserRoleAccessDetail = userAccessList.filter(obj => obj.ModuleCode == this.SelectedModuleCode)[0];
        // Check whether access level exists
        let accessExistsAll = userAccessListObject.AccessList.split(',').findIndex(obj => obj.toUpperCase() == 'ALL');
        let accessExistsCode = userAccessListObject.AccessList.split(',').findIndex(obj => obj.toUpperCase() == this.SelectedModuleAccessCode.toUpperCase());

        // Check if the user has no access
        if (accessExistsAll == -1 && accessExistsCode == -1) {
          this.elf.nativeElement.remove();
        }
        // End of Check if the user has no access
      }
    );
    // End of Getting the access list
  }

}
