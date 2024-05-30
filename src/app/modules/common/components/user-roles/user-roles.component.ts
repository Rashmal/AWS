import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CommonModel } from '../../models/commonModel';
import { CommonService } from '../../services/common.service';
import { RoleDetails } from '../../core/roleDetails';


@Component({
  selector: 'app-user-roles',

  templateUrl: './user-roles.component.html',
  styleUrl: './user-roles.component.scss'
})
export class UserRolesComponent implements OnInit {
  //Store client details
  userRoles: RoleDetails[] = [];
  // Store the common model
  commonModel: CommonModel;
  // Store the selected user roles
  selectedUserRoles: RoleDetails[] = [];

  constructor(public ref: DynamicDialogRef, private config: DynamicDialogConfig,
    private commonService: CommonService) {
    // Initializing the model
    this.commonModel = new CommonModel(this.commonService);

    // Getting the passed data
    if (JSON.stringify(this.config.data)) {
      this.selectedUserRoles = <RoleDetails[]>this.config.data;
    }
    // End of Getting the passed data
  }

  ngOnInit(): void {
    // Initialize the user roles
    this.InitUserRoles();
  }

  // Initialize the user roles
  InitUserRoles() {
    // Calling the model to retrieve the data
    this.commonModel.GetAllRoleDetails().then((data) => {
      // Getting the list
      this.userRoles = <RoleDetails[]>data;
    });
    // End of Calling the model to retrieve the data
  }

  //On  click cancel
  onClickCancel() {
    //Send data to component
    this.ref.close();
  }

  //ON click save select roles
  onClickSave() {
    //Send data to component
    this.ref.close(this.selectedUserRoles);
  }


}
