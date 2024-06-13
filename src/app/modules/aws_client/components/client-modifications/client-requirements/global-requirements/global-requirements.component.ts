import { Component } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ClientRequirement } from 'src/app/modules/aws_client/core/clientRequirement';
import { ClientModel } from 'src/app/modules/aws_client/models/clientModel';
import { ClientService } from 'src/app/modules/aws_client/services/client.service';
import { DeleteConfirmationComponent } from 'src/app/modules/common/components/delete-confirmation/delete-confirmation.component';
import { Filter } from 'src/app/modules/common/core/filters';
import { OverallCookieInterface } from 'src/app/modules/common/core/overallCookieInterface';
import { OverallCookieModel } from 'src/app/modules/common/core/overallCookieModel';

@Component({
    selector: 'app-global-requirements',
    templateUrl: './global-requirements.component.html',
    styleUrl: './global-requirements.component.scss',
    providers: [DialogService],
})
export class GlobalRequirementsComponent {
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
    selectedProducts!: any;

    // Store the Global Client Requirements
    globalClientRequirements: ClientRequirement[] = [];
    // Store the client model
    clientModel: ClientModel;
    // Store the selected client Id
    selectedClientId = 0;
    // Store the company Id
    companyId: number = 0;
    // Store the cookie interface
    overallCookieInterface: OverallCookieInterface;

    constructor(public ref: DynamicDialogRef, private config: DynamicDialogConfig,
        private clientService: ClientService, public dialogService: DialogService
    ) {
        // Initialize the model
        this.clientModel = new ClientModel(this.clientService);
        this.overallCookieInterface = new OverallCookieModel();
    }

    ngOnInit() {
        // Getting the data from the parent
        if (this.config.data['selectedClientId']) {
            this.selectedClientId = this.config.data['selectedClientId'];

            // Getting all the global client requirements
            this.GetAllGlobalClientRequirements();
        }
        // End of Getting the data from the parent
    }

    //On  click cancel
    onClickCancel() {
        //Send data to component
        this.ref.close(null);
    }

    //on change module list paginator
    onPageChange(event: any) {
        // Setting the filter
        this.filter.CurrentPage = event.page + 1;
        // Getting all the list
        this.GetAllGlobalClientRequirements();
    }

    // Getting all the global client requirements
    GetAllGlobalClientRequirements() {
        // Calling the object model to access the service
        this.clientModel.GetGlobalClientRequirement(this.filter, this.selectedClientId, this.overallCookieInterface.GetCompanyId()).then(
            (data) => {
                // Setting the business address Id
                this.globalClientRequirements = <ClientRequirement[]>data;
            }
        );
        // End of Calling the object model to access the service
    }

    // On click event og removing the global client requirement
    deleteGlobalClientRequirement(globalClientRequirement: ClientRequirement) {
        // Open popup to confirm action
        this.ref = this.dialogService.open(DeleteConfirmationComponent, {
            header: 'Delete confirmation'
        });
        // Perform an action on close the popup
        this.ref.onClose.subscribe((confirmation: boolean) => {
            if (confirmation) {
                // Calling the object model to access the service
                this.clientModel.SetGlobalClientRequirement(globalClientRequirement, "REMOVE", this.selectedClientId, this.overallCookieInterface.GetCompanyId()).then(
                    (data) => {
                        // Getting all the global client requirements
                        this.GetAllGlobalClientRequirements();
                    }
                );
                // End of Calling the object model to access the service
            }
        });
    }

    // On click event of adding the client requirement to local
    addToLocalClientRequirement(globalClientRequirement: ClientRequirement) {
        //Send data to component
        this.ref.close(globalClientRequirement);
    }
}
