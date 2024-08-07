import { Component } from '@angular/core';
import { Module } from 'src/app/modules/common/core/module';
import { Location } from '@angular/common';
import { SelectItem } from 'primeng/api';
import { Filter } from 'src/app/modules/common/core/filters';
import { CommonModel } from 'src/app/modules/common/models/commonModel';
import { CommonService } from 'src/app/modules/common/services/common.service';
import { OverallCookieInterface } from 'src/app/modules/common/core/overallCookieInterface';
import { OverallCookieModel } from 'src/app/modules/common/core/overallCookieModel';
import { UserRoleAccessDetail } from 'src/app/modules/common/core/userRoleAccessDetail';
import { UserRole } from 'src/app/modules/common/core/userRole';
import { UserRolesModel } from '../../../models/userRoleModel';
import { UserRolesService } from '../../../services/user-roles.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DeleteConfirmationComponent } from 'src/app/modules/common/components/delete-confirmation/delete-confirmation.component';
import { SubTabDetails } from 'src/app/modules/common/core/subTabDetails';
import { AccessLevelFeatureDetails } from 'src/app/modules/common/core/accessLevelFeatureDetails';
import { ActionConfirmationComponent } from 'src/app/modules/common/components/action-confirmation/action-confirmation.component';
interface SubTabList {
    Name: string;
    OverallAccess: boolean;
    Features: Features[];
    TotalRecords: number;
}
interface Features {
    Feature: string;
    OverallAccess: boolean;
    AddItem: boolean;
    EditItem: boolean;
    DeleteItem: boolean;
}

@Component({
    selector: 'app-access-levels',
    templateUrl: './access-levels.component.html',
    styleUrl: './access-levels.component.scss',
    providers: [DialogService]
})
export class AccessLevelsComponent {

    // Store the modification mode
    modificationMode = 'NEW';
    // Store the cookie interface
    overallCookieInterface: OverallCookieInterface;
    // Store the common model
    commonModel: CommonModel;
    numbers: number[] = [];
    // Store the user role code
    userRoleCode: string = '';

    //Store module list
    moduleList: Module[] = [];
    //sub tab list
    subTabs: SubTabDetails[] = [];

    //Store filter settings
    filter: Filter = {
        CurrentPage: 1,
        EndDate: new Date(),
        Id: '',
        ModuleId: 0,
        ParentId: 0,
        PriorityId: 0,
        RecordsPerPage: 2,
        SearchQuery: '',
        SortColumn: '',
        SortDirection: 'DESC',
        StaffId: '',
        StartDate: new Date(),
        StatusId: 0,
        Param1: 'ALL',
    };
    userRoles: UserRole[] = [];
    //Selected user role from table
    selectedRoleId: number = -1;

    userRoleModState = 'INITIAL';
    //Store user role model
    userRoleModel: UserRolesModel;
    //Store editing using role Id
    editingUserRole = -1;
    //Store user role name
    newUserRoleName = '';
    // Store dynamic dialog ref
    ref: DynamicDialogRef | undefined;
    // Store error message
    errorMessage = '';
    errorMessageUpdate = '';

    //Store accessible module list for dropdown
    accessibleModules: Module[] = [];
    //Selected accessible module
    selectedAccModule: Module;

    constructor(
        private location: Location,
        private commonService: CommonService,
        private userRoleService: UserRolesService,
        public dialogService: DialogService,
    ) {
        // Initialize the model
        this.commonModel = new CommonModel(this.commonService);
        this.overallCookieInterface = new OverallCookieModel();
        // Setting the user role
        this.userRoleCode = this.overallCookieInterface
            .GetUserRole()
            .toUpperCase();
        this.commonModel = new CommonModel(this.commonService);
        this.userRoleModel = new UserRolesModel(this.userRoleService);
    }

    ngOnInit(): void {
        // Getting the passed params
        let paramObject = this.location.getState();
        //Set editing mode
        if (paramObject['EditingMode']) {
            this.modificationMode = paramObject['EditingMode'];
        }
        //Check user role
        if (this.userRoleCode) {
            //Get system user roles
            this.getAllUserRoles(true);
        }
    }

    //on Change Sub Tab Feature Access Level
    onChangeSubTabFeature(feature: AccessLevelFeatureDetails) {
        //Set sub tab Feature access
        this.userRoleModel.SetSubTabFeatureAccessLevel(this.overallCookieInterface.GetCompanyId(), feature.DeleteAccess, feature.EditAccess, feature.AddAccess, feature.ViewAccess, feature.Id).then(
            (data: boolean) => {


            }
        );
    }

    //on Change Sub Tab Access Level
    onChangeSubTabAccessLevel(subTab: SubTabDetails) {
        //Set sub tab access
        this.userRoleModel.SetTabDetailsAccessLevelBasedOnModuleUserRole(this.overallCookieInterface.GetCompanyId(), subTab.EnableAccess, subTab.Id).then(
            (data: boolean) => {


            }
        );
    }

    //On changeAccessible Module
    onChangeAccessibleModule(pageNum: number) {
        this.filter.CurrentPage = pageNum;
        //Get sub tab list
        this.userRoleModel.GetTabDetailsBasedOnModuleUserRole(this.overallCookieInterface.GetCompanyId(), this.selectedRoleId, this.filter, this.selectedAccModule.Id).then(
            (subTabs: SubTabDetails[]) => {
                if (subTabs) {
                    this.subTabs = subTabs;
                }

            }
        );
    }

    //Get all accessible modules
    getAccessibleModules() {
        //Call services to get modules by user role
        this.userRoleModel.GetAccessibleModules(this.overallCookieInterface.GetCompanyId(), this.selectedRoleId).then(
            (data: Module[]) => {
                //Check data is not undefined
                if (data) {
                    this.selectedAccModule = null;
                    this.accessibleModules = data;

                }

            }
        );
    }

    //On change module access
    onChangeModuleAccess(module: Module) {
        // Original value
        let originalValue = !module.IsDisable;
        // Check the tab code
        if (module.ModuleCode == 'USRL') {
            // Display the confirmation box
            // Open popup to confirm action
            this.ref = this.dialogService.open(ActionConfirmationComponent, {
                header: 'Change confirmation',
                data: "Confirmation"
            });
            // Perform an action on close the popup
            this.ref.onClose.subscribe((confirmation: boolean) => {
                if (confirmation) {
                    //set module access on change toggle
                    this.SetModuleAccess(module);
                } else {
                    // Getting the module index
                    let moduleINdex = this.moduleList.findIndex(obj => obj.Id == module.Id);
                    // Setting the value
                    this.moduleList[moduleINdex].IsDisable = originalValue;
                }
            });

            // End of Display the confirmation box
        } else {
            //set module access on change toggle
            this.SetModuleAccess(module);
        }
        // End of Check the tab code
    }

    //Set module access
    SetModuleAccess(module: Module) {
        //Call services to set module access
        this.userRoleModel.SetModuleAccess(this.overallCookieInterface.GetCompanyId(), this.selectedRoleId, module.IsDisable, module.Id).then(
            (data: boolean) => {
                //Get all accessible modules
                this.getAccessibleModules();


            }
        );
    }

    //Get all modules by user role
    getAllModulesBasedUserRole() {
        //Call services to get modules by user role
        this.userRoleModel.GetAllModulesBasedUserRole(this.overallCookieInterface.GetCompanyId(), this.selectedRoleId).then(
            (data: Module[]) => {
                //Check data is not undefined
                if (data) {
                    this.moduleList = data;
                    //Get all accessible modules
                    this.getAccessibleModules();
                }

            }
        );
    }

    //On click select user role from table
    selectUserRole(role: UserRole) {
        //Set selected user role Id
        this.selectedRoleId = role.Id;
        //Get module list
        this.getAllModulesBasedUserRole();

    }

    //Get system user roles
    getAllUserRoles(isInitial = false) {
        //Call services to get user roles
        this.userRoleModel.GetAllUserRoles(this.overallCookieInterface.GetCompanyId()).then(
            (data: UserRole[]) => {
                //Check data is not undefined
                if (data) {
                    this.userRoles = data;
                    //Set first selected if it is initial
                    if (isInitial) {
                        this.selectedRoleId = this.userRoles.length > 0 ? this.userRoles[0].Id : -1;
                    }

                    //Get module list
                    this.getAllModulesBasedUserRole();
                }

            }
        );
    }

    //Get system user roles
    checkUserRoleExist(roleName: string) {
        //Call services to get user roles
        this.userRoleModel.CheckUserRoleExist(this.overallCookieInterface.GetCompanyId(), roleName).then(
            (data: boolean) => {
                //Check data is not undefined

            }
        );
    }

    //On bluer event of input
    onBlurEvent(type: string) { }

    //on change module list paginator
    onPageChange(event: any) {
        this.filter.CurrentPage = event.page + 1;
        this.onChangeAccessibleModule(this.filter.CurrentPage);
    }
    // Handles adding a new role.
    onClickAddNewRole() {
        // Add new role logic here
        this.userRoleModState = 'NEW';
    }

    // Handles editing an existing role.
    onClickEditRole(roleId: number) {
        // Edit role logic here
        this.userRoleModState = 'UPDATE';
        this.editingUserRole = roleId;
    }

    // Handles deleting an existing role.
    onClickDeleteRole(role: UserRole) {
        // Open popup to confirm action
        this.ref = this.dialogService.open(DeleteConfirmationComponent, {
            header: 'Delete confirmation'
        });
        // Perform an action on close the popup
        this.ref.onClose.subscribe((confirmation: boolean) => {
            if (confirmation) {
                //Call services to update role
                this.userRoleModel.SetUserRoles(this.overallCookieInterface.GetCompanyId(), role, 'DELETE').then(
                    (data) => {
                        // Update role logic here
                        this.editingUserRole = -1;
                        //Refresh user role list
                        this.getAllUserRoles();
                    }
                );
            }
        });


    }

    // Handles updating role details.
    onClickUpdateRole(role: UserRole) {
        if (role.Name != '' && role.Name.trim().length > 0) {
            //Call services to get user roles
            this.userRoleModel.CheckUserRoleExist(this.overallCookieInterface.GetCompanyId(), role.Name).then(
                (data: boolean) => {
                    if (!data) {
                        //Call services to add role
                        //Call services to update role
                        this.userRoleModel.SetUserRoles(this.overallCookieInterface.GetCompanyId(), role, 'UPDATE').then(
                            (data) => {
                                // Update role logic here
                                this.editingUserRole = -1;
                                this.errorMessageUpdate = '';
                                //Refresh user role list
                                this.getAllUserRoles();
                            }
                        );
                    }
                    else {
                        this.errorMessageUpdate = 'Role name already exist!'
                    }

                }
            );
        } else {
             this.errorMessageUpdate = 'Role name can not be empty!'
        }


    }

    // Handles creating a new role.
    onClickCreateRole() {
        if (this.newUserRoleName != '' && this.newUserRoleName.trim().length > 0) {
            //Call services to get user roles
            this.userRoleModel.CheckUserRoleExist(this.overallCookieInterface.GetCompanyId(), this.newUserRoleName).then(
                (data: boolean) => {
                    if (!data) {
                        //Call services to add role
                        this.userRoleModel.SetUserRoles(this.overallCookieInterface.GetCompanyId(), { Id: 0, Name: this.newUserRoleName }, 'NEW').then(
                            (data) => {

                                this.editingUserRole = -1;
                                this.userRoleModState = 'INITIAL';
                                this.errorMessage = '';
                                //Refresh user role list
                                this.getAllUserRoles();
                            }
                        );
                    }
                    else {
                        this.errorMessage = 'Role name already exist!'
                    }

                }
            );
        } else {
            this.errorMessage = 'Role name can not be empty!'
        }





    }

    // Handles canceling the role operation.
    onClickCancelRole() {
        // Cancel role logic here
        this.editingUserRole = -1;
        this.userRoleModState = 'INITIAL';
        this.newUserRoleName = '';
        this.errorMessageUpdate = '';
        this.errorMessage = '';

    }

    // Handles duplicating an existing role.
    onClickDuplicateRole(role: UserRole) {
        // Duplicate role logic here
        //Call services to update role
        this.userRoleModel.SetUserRoles(this.overallCookieInterface.GetCompanyId(), role, 'DUPLICATE').then(
            (data) => {
                // Update role logic here
                this.editingUserRole = -1;
                //Refresh user role list
                this.getAllUserRoles();
            }
        );
    }

    // Check if the option is default disabled
    checkIfDefaultDisabled(tab: SubTabDetails, feature: AccessLevelFeatureDetails, switchType: string) {
        // Status
        let status = false;
        // Getting the accessble list
        let accessibleList = feature.Accessible;
        // Split by commar
        let splittedList = accessibleList.split(',');
        // Check if the type exists
        let indexObj = splittedList.findIndex(obj => obj.toUpperCase() == switchType.toUpperCase());
        // Setting the option
        status = (indexObj == -1) ? true : false;
        // Return the value
        return { value: status }
    }
}
