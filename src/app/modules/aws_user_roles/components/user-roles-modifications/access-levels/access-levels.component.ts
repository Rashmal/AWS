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
    subTabs: SubTabList[] = [
        {
            Name: 'User Management',
            OverallAccess: true,
            TotalRecords: 4,
            Features: [
                {
                    Feature: 'Add User',
                    OverallAccess: true,
                    AddItem: true,
                    EditItem: false,
                    DeleteItem: false,
                },
                {
                    Feature: 'Edit User',
                    OverallAccess: true,
                    AddItem: false,
                    EditItem: true,
                    DeleteItem: false,
                },
                {
                    Feature: 'Delete User',
                    OverallAccess: true,
                    AddItem: false,
                    EditItem: false,
                    DeleteItem: true,
                },
            ],
        },
        {
            Name: 'Product Management',
            OverallAccess: true,
            TotalRecords: 4,
            Features: [
                {
                    Feature: 'Add Product',
                    OverallAccess: true,
                    AddItem: true,
                    EditItem: false,
                    DeleteItem: false,
                },
                {
                    Feature: 'Edit Product',
                    OverallAccess: true,
                    AddItem: false,
                    EditItem: true,
                    DeleteItem: false,
                },
                {
                    Feature: 'Delete Product',
                    OverallAccess: true,
                    AddItem: false,
                    EditItem: false,
                    DeleteItem: true,
                },
            ],
        },
        // {
        //     Name: 'Order Management',
        //     OverallAccess: true,
        //     TotalRecords: 4,
        //     Features: [
        //         {
        //             Feature: 'Add Order',
        //             OverallAccess: true,
        //             AddItem: true,
        //             EditItem: false,
        //             DeleteItem: false,
        //         },
        //         {
        //             Feature: 'Edit Order',
        //             OverallAccess: true,
        //             AddItem: false,
        //             EditItem: true,
        //             DeleteItem: false,
        //         },
        //         {
        //             Feature: 'Delete Order',
        //             OverallAccess: true,
        //             AddItem: false,
        //             EditItem: false,
        //             DeleteItem: true,
        //         },
        //     ],
        // },
        // {
        //     Name: 'Inventory Management',
        //     OverallAccess: true,
        //     TotalRecords: 4,
        //     Features: [
        //         {
        //             Feature: 'Add Inventory',
        //             OverallAccess: true,
        //             AddItem: true,
        //             EditItem: false,
        //             DeleteItem: false,
        //         },
        //         {
        //             Feature: 'Edit Inventory',
        //             OverallAccess: true,
        //             AddItem: false,
        //             EditItem: true,
        //             DeleteItem: false,
        //         },
        //         {
        //             Feature: 'Delete Inventory',
        //             OverallAccess: true,
        //             AddItem: false,
        //             EditItem: false,
        //             DeleteItem: true,
        //         },
        //     ],
        // },
    ];

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

    //Get all accessible modules
    getAccessibleModules() {
         //Call services to get modules by user role
         this.userRoleModel.GetAccessibleModules(this.overallCookieInterface.GetCompanyId(), this.selectedRoleId).then(
            (data: Module[]) => {
                //Check data is not undefined
                if (data) {
                    this.accessibleModules = data;
                    
                }

            }
        );
    }

    //On change module access
    onChangeModuleAccess(module: Module) {
        //set module access on change toggle
        this.SetModuleAccess(module);

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

    //On bluer event of input
    onBlurEvent(type: string) { }

    //on change module list paginator
    onPageChange(event: any) {
        this.filter.CurrentPage = event.page + 1;
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
        //Call services to update role
        this.userRoleModel.SetUserRoles(this.overallCookieInterface.GetCompanyId(), role, 'UPDATE').then(
            (data) => {
                // Update role logic here
                this.editingUserRole = -1;
                //Refresh user role list
                this.getAllUserRoles();
            }
        );

    }

    // Handles creating a new role.
    onClickCreateRole() {

        //Call services to add role
        this.userRoleModel.SetUserRoles(this.overallCookieInterface.GetCompanyId(), { Id: 0, Name: this.newUserRoleName }, 'NEW').then(
            (data) => {

                this.editingUserRole = -1;
                this.userRoleModState = 'INITIAL';
                //Refresh user role list
                this.getAllUserRoles();
            }
        );


    }

    // Handles canceling the role operation.
    onClickCancelRole() {
        // Cancel role logic here
        this.editingUserRole = -1;
        this.userRoleModState = 'INITIAL';
        this.newUserRoleName = '';
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
}
