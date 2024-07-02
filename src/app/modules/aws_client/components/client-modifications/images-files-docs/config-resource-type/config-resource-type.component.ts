import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ResourceType } from 'src/app/modules/aws_client/core/resourceType';
import { ClientModel } from 'src/app/modules/aws_client/models/clientModel';
import { ClientService } from 'src/app/modules/aws_client/services/client.service';
import { DeleteConfirmationComponent } from 'src/app/modules/common/components/delete-confirmation/delete-confirmation.component';
import { Filter } from 'src/app/modules/common/core/filters';
import { OverallCookieInterface } from 'src/app/modules/common/core/overallCookieInterface';
import { OverallCookieModel } from 'src/app/modules/common/core/overallCookieModel';

@Component({
    selector: 'app-config-resource-type',
    templateUrl: './config-resource-type.component.html',
    styleUrl: './config-resource-type.component.scss',
    providers: [DialogService],
})
export class ConfigResourceTypeComponent implements OnInit {
    // Store the client model
    clientModel: ClientModel;
    //Store filter settings
    filter: Filter = {
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
        StatusId: 0,
    };

    // Store resource file types
    resourceTypes: ResourceType[] = [];
    // Store the selected client Id
    selectedClientId = 0;
    // Store the cookie interface
    overallCookieInterface: OverallCookieInterface;

    constructor(
        public refLocal: DynamicDialogRef,
        public refDel: DynamicDialogRef,
        private config: DynamicDialogConfig,
        private clientService: ClientService,
        public dialogService: DialogService,
    ) {
        // Initialize the model
        this.clientModel = new ClientModel(this.clientService);
        this.overallCookieInterface = new OverallCookieModel();

        if (JSON.stringify(this.config.data)) {
            this.selectedClientId = <number>this.config.data.clientId;
            if (this.selectedClientId && this.selectedClientId > 0) {
                this.getAllResourceFileTypes();
            }
        }
    }

    ngOnInit(): void {
        //Add empty one on initializing
    }

    //Get All Resource File Types
    getAllResourceFileTypes(type = 'NEW') {
        // Call services
        this.clientModel
            .GetAllResourceFilesWithPagination(
                this.filter,
                this.selectedClientId,
                this.overallCookieInterface.GetCompanyId()
            )
            .then((data: ResourceType[]) => {
                if (data) {
                    this.resourceTypes = data;

                    this.resourceTypes.push({
                        Id: 0,
                        Name: '',
                        Code: '',
                        TotalRecords: 10,
                    });


                }
            });
    }

    //Set new resource type
    setResource(type: string, resource: ResourceType,) {
        // Call services
        this.clientModel
            .SetResourceTypeDetails(
                resource,
                type,
                this.selectedClientId,
                this.overallCookieInterface.GetCompanyId()
            )
            .then((data: number) => {

                this.getAllResourceFileTypes();

            });
    }

    //Store editing index
    editingIndex = -1;
    //On  click cancel
    onClickCancel() {
        
        //Send data to component
        this.refLocal.close([]);
    }

    //on change module list paginator
    onPageChange(event: any) {
        this.filter.CurrentPage = event.page + 1;
        this.getAllResourceFileTypes();
    }

    //On click edit item
    onClickEditItem(index: number) {
        this.editingIndex = index;
    }

    //On click update items
    onClickUpdateItem(resource: ResourceType) {
        this.setResource('UPDATE', resource);
        this.editingIndex = -1;
    }

    //Remove resource
    onClickDeleteItem(resource: ResourceType) {
         // Open popup to confirm action
         this.refDel = this.dialogService.open(DeleteConfirmationComponent, {
            header: 'Delete confirmation',
        });
        // Perform an action on close the popup
        this.refDel.onClose.subscribe((confirmation: boolean) => {
            if (confirmation) {
                this.setResource('REMOVE', resource);
            }
        });
       
    }

    //On click add new
    onClickAddNew(resource: ResourceType) {
        this.setResource('NEW', resource);
    }
}
