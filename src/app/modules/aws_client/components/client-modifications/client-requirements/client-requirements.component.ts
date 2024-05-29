import { Component, OnInit } from '@angular/core';
import { Filter } from '../../../core/filter';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserRolesComponent } from 'src/app/modules/common/components/user-roles/user-roles.component';
import { ActionConfirmationComponent } from 'src/app/modules/common/components/action-confirmation/action-confirmation.component';
import { UploadFilesComponent } from 'src/app/modules/common/components/upload-files/upload-files.component';
import { GlobalRequirementsComponent } from './global-requirements/global-requirements.component';
import { Location } from '@angular/common';
import { ClientRequirement } from '../../../core/clientRequirement';

@Component({
    selector: 'app-client-requirements',
    templateUrl: './client-requirements.component.html',
    styleUrl: './client-requirements.component.scss',
    providers: [DialogService],
})
export class ClientRequirementsComponent implements OnInit {
    editingItem_index = -1;
    products: any[] = [
        {
            code: 'P001',
            name: 'Product 1',
            category: 'Category 1',
            TotalRecords: 10,
        },
        {
            code: 'P002',
            name: 'Product 2',
            category: 'Category 2',
            TotalRecords: 10,
        },
        {
            code: 'P003',
            name: 'Product 3',
            category: 'Category 3',
            TotalRecords: 10,
        },
    ];
    //Store filter settings
    filter: Filter = {
        Type: { label: 'All', value: 'ALL' },
        Search: '',
        ItemsPerPage: 10,
        CurrentPage: 1,
    };

    // Store dynamic dialog ref
    ref: DynamicDialogRef | undefined;
    // Store the selected client Id
    selectedClientId = 0;
    // Store the client requirements
    clientRequirementList: ClientRequirement[] = [];

    constructor(public dialogService: DialogService, private location: Location) {

    }

    ngOnInit(): void {
        // Getting the passed params
        let paramObject = this.location.getState();

        // Initializing the object
        this.clientRequirementList.push(
            {
                Id: 0,
                AdditionalData: '',
                ClientRequirementFiles: [],
                RoleDetails: [],
                Title: '',
                TotalRecords: 0
            }
        );

        //Set editing client id
        if (paramObject['ClientId']) {
            this.selectedClientId = paramObject['ClientId'];
        }
    }
    //On enter editing editor
    enterEditingItem(index: number) {
        this.editingItem_index = index;
    }

    //On leave editing editor
    enterLeaveItem() {
        this.editingItem_index = -1;
    }

    //on change module list paginator
    onPageChange(event: any) { }

    //On click select user role button
    onClickUserRole(client: any) {
        // Open popup to select user roles
        this.ref = this.dialogService.open(UserRolesComponent, {
            header: 'Select User Roles',
            //Send user roles to popup
            data: [],
        });
        // Perform an action on close the popup
        this.ref.onClose.subscribe((userRoles: any[]) => {
            if (userRoles) {
                //Set selected user roles
            }
        });
    }

    //On click add a requirement to the global
    clickOnAddToGlobal(requirement: any) {
        // Open popup to select user roles
        this.ref = this.dialogService.open(ActionConfirmationComponent, {
            header: 'Add This To Global?',
            //Send user roles to popup
            data: [],
        });
        // Perform an action on close the popup
        this.ref.onClose.subscribe((userRoles: any[]) => {
            if (userRoles) {
                //Set selected user roles
            }
        });
    }

    //On click upload files global
    clickOnUploadGlobalFile() {
        // Open popup to select user roles
        this.ref = this.dialogService.open(UploadFilesComponent, {
            header: 'Upload Your Files Here',
            //Send user roles to popup
            data: [],
        });
        // Perform an action on close the popup
        this.ref.onClose.subscribe((userRoles: any[]) => {
            if (userRoles) {
                //Set selected user roles
            }
        });
    }

    //On click upload files for requirement
    clickOnUploadRequirementFile(requirement: any) {
        // Open popup to select user roles
        this.ref = this.dialogService.open(UploadFilesComponent, {
            header: 'Upload Your Files Here',
            //Send user roles to popup
            data: [],
        });
        // Perform an action on close the popup
        this.ref.onClose.subscribe((userRoles: any[]) => {
            if (userRoles) {
                //Set selected user roles
            }
        });
    }

    //On click add from global retirements
    onClickAddFromGlobalReq() {
        // Open popup to select user roles
        this.ref = this.dialogService.open(GlobalRequirementsComponent, {
            header: 'Add New Requirement From Global',
            //Send user roles to popup
            data: [],
        });
        // Perform an action on close the popup
        this.ref.onClose.subscribe((userRoles: any[]) => {
            if (userRoles) {
                //Set selected user roles
            }
        });
    }

    // On blur event
    onBlurEvent(currentSection: string) {
        // Check the current section
        switch (currentSection) {
            case 'CLIENT$REQUIREMENTS':

                break;
        }
        // End of Check the current section
    }

    

}
