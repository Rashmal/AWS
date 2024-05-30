import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserRolesComponent } from 'src/app/modules/common/components/user-roles/user-roles.component';
import { ActionConfirmationComponent } from 'src/app/modules/common/components/action-confirmation/action-confirmation.component';
import { UploadFilesComponent } from 'src/app/modules/common/components/upload-files/upload-files.component';
import { GlobalRequirementsComponent } from './global-requirements/global-requirements.component';
import { Location } from '@angular/common';
import { ClientRequirement } from '../../../core/clientRequirement';
import { ClientModel } from '../../../models/clientModel';
import { ClientService } from '../../../services/client.service';
import { RoleDetails } from 'src/app/modules/common/core/roleDetails';
import { Filter } from 'src/app/modules/common/core/filters';
import { ClientRequirementFile } from '../../../core/clientRequirementFile';
import { GlobalFileDetails } from '../../../core/globalFileDetails';
import { HourlyOtherRates } from '../../../core/hourlyOtherRates';

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
    //Store filter settings for client requirements
    filterClientRequirements: Filter = {
        Param1: 'ALL',
        SearchQuery: '',
        RecordsPerPage: 10,
        CurrentPage: 1,
        StaffId: '',
        PriorityId: 0,
        ModuleId: 0,
        StartDate: new Date(),
        EndDate: new Date(),
        Id: '',
        ParentId: 0,
        SortColumn: '',
        SortDirection: '',
        StatusId: 0
    };
    //Store filter settings for global files
    filterGlobalFiles: Filter = {
        Param1: 'ALL',
        SearchQuery: '',
        RecordsPerPage: 10,
        CurrentPage: 1,
        StaffId: '',
        PriorityId: 0,
        ModuleId: 0,
        StartDate: new Date(),
        EndDate: new Date(),
        Id: '',
        ParentId: 0,
        SortColumn: '',
        SortDirection: '',
        StatusId: 0
    };
    //Store filter settings
    filterHoursOtherRates: Filter = {
        Param1: 'ALL',
        SearchQuery: '',
        RecordsPerPage: 10,
        CurrentPage: 1,
        StaffId: '',
        PriorityId: 0,
        ModuleId: 0,
        StartDate: new Date(),
        EndDate: new Date(),
        Id: '',
        ParentId: 0,
        SortColumn: '',
        SortDirection: '',
        StatusId: 0
    };

    // Store dynamic dialog ref
    ref: DynamicDialogRef | undefined;
    // Store the selected client Id
    selectedClientId = 0;
    // Store the client requirements
    clientRequirementList: ClientRequirement[] = [];
    // Store the client model
    clientModel: ClientModel;
    // Store the company Id
    companyId: number = 0;
    // Store all the global files
    globalFilesList: GlobalFileDetails[] = [];
    // Store the hours and other rates list
    hoursOthersRatesList: HourlyOtherRates[] = [];

    constructor(public dialogService: DialogService, private location: Location,
        private clientService: ClientService
    ) {
        // Initialize the model
        this.clientModel = new ClientModel(this.clientService);
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

        // Set editing client id
        if (paramObject['ClientId']) {
            this.selectedClientId = paramObject['ClientId'];

            // Getting the client requirements
            this.GetAllClientRequirements();

            // Getting all the hours and other rates list
            this.GetAllCHoursOthersRates();
        }
        // End of Set editing client id

        // Getting all the Global files
        this.GetAllGlobalFiles();
    }

    // Getting the client requirements
    GetAllClientRequirements() {
        // Calling the object model to access the service
        this.clientModel.GetClientRequirement(this.filterClientRequirements, this.selectedClientId, this.companyId).then(
            (data) => {
                // Setting the business address Id
                this.clientRequirementList = <ClientRequirement[]>data;

                // Check if the list is empty
                if (this.clientRequirementList.length == 0) {
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
                }
                // End of Check if the list is empty
            }
        );
        // End of Calling the object model to access the service
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
    onPageChange(event: any, sectionType: string) {
        // Check the section type
        switch (sectionType) {
            case 'CLIENT$REQUIREMENTS':
                // Setting the filter
                this.filterClientRequirements.CurrentPage = event.page + 1;
                // Getting all the list
                this.GetAllClientRequirements();
                break;
            case 'GLOBAL$FILES':
                // Setting the filter
                this.filterGlobalFiles.CurrentPage = event.page + 1;
                // Getting all the list
                this.GetAllGlobalFiles();
                break;
        }
        // End of Check the section type
    }

    //On click select user role button
    onClickUserRole(clientRequirement: ClientRequirement, rowIndex: number) {
        // Open popup to select user roles
        this.ref = this.dialogService.open(UserRolesComponent, {
            header: 'Select User Roles',
            //Send user roles to popup
            data: clientRequirement.RoleDetails,
        });
        // Perform an action on close the popup
        this.ref.onClose.subscribe((userRoles: RoleDetails[]) => {
            if (userRoles) {
                // Set selected user roles
                this.clientRequirementList[rowIndex].RoleDetails = userRoles;
                // On blur event
                this.onBlurEvent('CLIENT$REQUIREMENTS', rowIndex, this.clientRequirementList[rowIndex]);
            }
        });
    }

    //On click add a requirement to the global
    clickOnAddToGlobal(clientRequirement: ClientRequirement) {
        // Open popup to select user roles
        this.ref = this.dialogService.open(ActionConfirmationComponent, {
            header: 'Add This To Global?',
            //Send user roles to popup
            data: [],
        });
        // Perform an action on close the popup
        this.ref.onClose.subscribe((userRoles: any[]) => {
            if (userRoles) {
                // On click event of adding the client requirement to the global
                this.addClientRequirementToGlobal(clientRequirement);
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
        this.ref.onClose.subscribe((reqFiles: File[]) => {
            // Check if there are any files
            if (reqFiles && reqFiles.length > 0) {
                //Setting the form data
                const frmDataObj = new FormData();
                // Loop through the files
                for (let i = 0; i < reqFiles.length; i++) {
                    frmDataObj.append("fileUpload", reqFiles[i]);
                }
                // End of Loop through the files

                // Calling the object model to access the service
                this.clientModel.UploadGlobalFile(frmDataObj, this.selectedClientId, this.companyId).then(
                    (data) => {
                        // Getting all the Global files
                        this.GetAllGlobalFiles();
                    }
                );
                // End of Calling the object model to access the service
            }
            // End of Check if there are any files
        });
    }

    // Getting all the Global files
    GetAllGlobalFiles() {
        // Calling the object model to access the service
        this.clientModel.GetAllFilesList(this.filterGlobalFiles, this.selectedClientId, this.companyId).then(
            (data) => {
                // Setting the global files
                this.globalFilesList = <GlobalFileDetails[]>data;
            }
        );
        // End of Calling the object model to access the service
    }

    //On click upload files for requirement
    clickOnUploadRequirementFile(clientRequirement: ClientRequirement) {
        // Open popup to select user roles
        this.ref = this.dialogService.open(UploadFilesComponent, {
            header: 'Upload Your Files Here',
            //Send user roles to popup
            data: [],
        });
        // Perform an action on close the popup
        this.ref.onClose.subscribe((reqFiles: File[]) => {
            // Check if there are any files
            if (reqFiles && reqFiles.length > 0) {
                //Setting the form data
                const frmDataObj = new FormData();
                // Loop through the files
                for (let i = 0; i < reqFiles.length; i++) {
                    frmDataObj.append("fileUpload", reqFiles[i]);
                }
                // End of Loop through the files

                // Calling the object model to access the service
                this.clientModel.SetClientRequirementFile(clientRequirement.Id, "", this.selectedClientId, this.companyId, frmDataObj).then(
                    (data) => {
                        // Getting the client requirements
                        this.GetAllClientRequirements();
                    }
                );
                // End of Calling the object model to access the service
            }
            // End of Check if there are any files
        });
    }

    //On click add from global retirements
    onClickAddFromGlobalReq() {
        // Open popup to select user roles
        this.ref = this.dialogService.open(GlobalRequirementsComponent, {
            header: 'Add New Requirement From Global',
            //Send user roles to popup
            data: {
                selectedClientId: this.selectedClientId
            },
        });
        // Perform an action on close the popup
        this.ref.onClose.subscribe((clientRequirement: ClientRequirement) => {
            if (clientRequirement) {
                // Adding the requirement
                this.clientRequirementList.push(clientRequirement);
                this.clientRequirementList[this.clientRequirementList.length - 1].Id = 0;
                // Saving the requirement
                this.onBlurEvent("CLIENT$REQUIREMENTS", this.clientRequirementList.length - 1, this.clientRequirementList[this.clientRequirementList.length - 1]);
            }
        });
    }

    // On blur event
    onBlurEvent(currentSection: string, currentIndex: number, clientRequirementObject: ClientRequirement = null, event: any = null, hourlyOtherRates: HourlyOtherRates = null) {
        // Check the current section
        switch (currentSection) {
            case 'CLIENT$REQUIREMENTS':
                // Check if the event is not null
                if (event) {
                    clientRequirementObject.AdditionalData = event.htmlValue;
                }
                // End of Check if the event is not null
                // Update the client requirement object
                this.updateClientRequirementObject(currentIndex, clientRequirementObject);
                break;
            case 'HOURLY$OTHER$RATES':
                // Update the hours others rates object
                this.updateHoursOthersRatesObject(currentIndex, hourlyOtherRates);
                break;
        }
        // End of Check the current section
    }

    // Update the client requirement object
    updateClientRequirementObject(currentIndex: number, clientRequirementObject: ClientRequirement) {
        // Check the action state
        let actionState = (clientRequirementObject.Id == 0) ? "NEW" : "UPDATE";

        // Calling the object model to access the service
        this.clientModel.SetClientRequirement(clientRequirementObject, actionState, this.selectedClientId, this.companyId).then(
            (data) => {
                // Setting the business address Id
                this.clientRequirementList[currentIndex].Id = <number>data;

                // Check if the action type is NEW
                // if (actionState == "NEW") {
                //     // Initializing the object
                //     this.clientRequirementList.push(
                //         {
                //             Id: 0,
                //             AdditionalData: '',
                //             ClientRequirementFiles: [],
                //             RoleDetails: [],
                //             Title: '',
                //             TotalRecords: 0
                //         }
                //     );
                // }
                // End of Check if the action type is NEW

                // Getting the client requirements
                this.GetAllClientRequirements();
            }
        );
        // End of Calling the object model to access the service
    }

    // On click event of removing the client requirement role
    removeClientRequirementRole(clientRequirement: ClientRequirement, roleIndex: number) {
        // Removing the role based on the index
        clientRequirement.RoleDetails.splice(roleIndex, 1);
        // Calling the object model to access the service
        this.clientModel.SetClientRequirement(clientRequirement, "UPDATE", this.selectedClientId, this.companyId).then(
            (data) => {
                // Getting the client requirements
                this.GetAllClientRequirements();
            }
        );
        // End of Calling the object model to access the service
    }

    // On click event of removing the client requirement
    removeClientRequirement(clientRequirement: ClientRequirement) {
        // Calling the object model to access the service
        this.clientModel.SetClientRequirement(clientRequirement, "REMOVE", this.selectedClientId, this.companyId).then(
            (data) => {
                // Getting the client requirements
                this.GetAllClientRequirements();
            }
        );
        // End of Calling the object model to access the service
    }

    // On change event of the client requirement ranking
    rankChangeClientRequirement(clientRequirement: ClientRequirement, rankDirection: string) {
        // Calling the object model to access the service
        this.clientModel.UpdateClientRequirementRanking(clientRequirement.Id, rankDirection, this.selectedClientId, this.companyId).then(
            (data) => {
                // Getting the client requirements
                this.GetAllClientRequirements();
            }
        );
        // End of Calling the object model to access the service
    }

    // On click event of add new empty client requirement
    addNewEmptyClientRequirement() {
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
    }

    // On click event of adding the client requirement to the global
    addClientRequirementToGlobal(clientRequirement: ClientRequirement) {
        // Getting the copy of the client requirement
        let globalClientRequirement: ClientRequirement = clientRequirement;
        // Making its ID as 0
        globalClientRequirement.Id = 0;
        // Calling the object model to access the service
        this.clientModel.SetGlobalClientRequirement(globalClientRequirement, "NEW", this.selectedClientId, this.companyId).then(
            (data) => {
                // Getting the client requirements
                this.GetAllClientRequirements();
            }
        );
        // End of Calling the object model to access the service
    }

    // On click event of removing the client requirement file
    removeClientRequirementFile(clientRequirement: ClientRequirement, ClientRequirementFiles: ClientRequirementFile) {
        // Calling the object model to access the service
        this.clientModel.RemoveClientRequirementFile(ClientRequirementFiles.Id, this.selectedClientId, this.companyId).then(
            (data) => {
                // Getting the client requirements
                this.GetAllClientRequirements();
            }
        );
        // End of Calling the object model to access the service
    }

    // On click event of removing the global file
    removeGlobalFile(globalFile: GlobalFileDetails) {
        // Calling the object model to access the service
        this.clientModel.RemoveGlobalFile(globalFile.Id, this.selectedClientId, this.companyId).then(
            (data) => {
                // Getting the client requirements
                this.GetAllGlobalFiles();
            }
        );
        // End of Calling the object model to access the service
    }

    // Getting all the hours and other rates list
    GetAllCHoursOthersRates() {
        // Calling the object model to access the service
        this.clientModel.GetHourlyOtherRateListDetails(this.filterHoursOtherRates, this.selectedClientId, this.companyId).then(
            (data) => {
                // Setting the business address Id
                this.hoursOthersRatesList = <HourlyOtherRates[]>data;

                // Check if the list is empty
                if (this.hoursOthersRatesList.length == 0) {
                    // Initializing the object
                    this.hoursOthersRatesList.push(
                        {
                            Id: 0,
                            Rate: 0,
                            RateName: '',
                            RateType: '',
                            TotalRecords: 0
                        }
                    );
                }
                // End of Check if the list is empty
            }
        );
        // End of Calling the object model to access the service
    }

    // Update the hours others rates object
    updateHoursOthersRatesObject(currentIndex: number, hourlyOtherRates: HourlyOtherRates) {
        // Check the action state
        let actionState = (hourlyOtherRates.Id == 0) ? "NEW" : "UPDATE";

        // Calling the object model to access the service
        this.clientModel.SetOtherRateDetails(hourlyOtherRates, actionState, this.selectedClientId, this.companyId).then(
            (data) => {
                // Setting the business address Id
                this.hoursOthersRatesList[currentIndex].Id = <number>data;

                // Check if the action type is NEW
                if (actionState == "NEW") {
                    // Initializing the object
                    this.hoursOthersRatesList.push(
                        {
                            Id: 0,
                            Rate: 0,
                            RateName: '',
                            RateType: '',
                            TotalRecords: 0
                        }
                    );
                }
                // End of Check if the action type is NEW

                // Getting the client requirements
                this.GetAllCHoursOthersRates();
            }
        );
        // End of Calling the object model to access the service
    }

}
