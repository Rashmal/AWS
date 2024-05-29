import { Component } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AccountDetails } from 'src/app/modules/common/core/accountDetails';
import { Filter } from 'src/app/modules/common/core/filters';
import { CommonModel } from 'src/app/modules/common/models/commonModel';
import { CommonService } from 'src/app/modules/common/services/common.service';

@Component({
    selector: 'app-expense-accounts',
    templateUrl: './expense-accounts.component.html',
    styleUrl: './expense-accounts.component.scss',
})
export class ExpenseAccountsComponent {
    //Store client details
    userRoles: any[] = [];
    // Store the common model
    commonModel: CommonModel;
    // Store the display account details list
    displayAccountDetailsList: SelectItem[] = [];
    // Store selected account
    selectedAccount!: SelectItem;
    initialValue!: SelectItem;
    //store total records
    totalRecords = 0;
    recordsPerPage = 10;
    filter: Filter = {
        CurrentPage: 1,
        EndDate: new Date(),
        Id: '',
        ModuleId: 0,
        ParentId: 0,
        PriorityId: 0,
        RecordsPerPage: 10,
        SearchQuery: '',
        SortColumn: '',
        SortDirection: 'DESC',
        StaffId: '',
        StartDate: new Date(),
        StatusId: 0,
        Param1: 'ALL',
    };

    constructor(
        public ref: DynamicDialogRef,
        private config: DynamicDialogConfig,
        private commonService: CommonService
    ) {
        // Initialize the model
        this.commonModel = new CommonModel(this.commonService);
        if (JSON.stringify(this.config.data)) {
            this.initialValue = <SelectItem>{
                value: this.config.data.Id,
                label: this.config.data.Name,
            };
            this.selectedAccount = <SelectItem>{
                value: this.config.data.Id,
                label: this.config.data.Name,
            };
        }
    }

    ngOnInit(): void {
        // Initializing the account details list
        this.InitAccountDetailsList();
    }

    //On  click cancel
    onClickCancel() {
        //Send data to component
        this.ref.close({
            Id: this.initialValue.value,
            Name: this.initialValue.label,
        });
    }

    //ON click save select roles
    onClickSave() {
        //Send data to component
        this.ref.close({
            Id: this.selectedAccount.value,
            Name: this.selectedAccount.label,
        });
    }

    // Initializing the account details list
    InitAccountDetailsList() {
        // Clear the data
        this.displayAccountDetailsList = [];
        // Calling the model to retrieve the data
        this.commonModel.GetAccountDetails(this.filter).then((data) => {
            // Getting the country list
            let dataList: AccountDetails[] = <AccountDetails[]>data;
            if(dataList && dataList.length > 0){
                this.totalRecords = dataList[0].Total;
            }
            // Loop through the country list
            for (let i = 0; i < dataList.length; i++) {
                // Pushing the object
                this.displayAccountDetailsList.push({
                    value: dataList[i].Id,
                    label: dataList[i].Name,
                });
            }
            // End of Loop through the country list
        });
        // End of Calling the model to retrieve the data
    }
    //on change module list paginator
    onPageChange(event: any) {
        this.filter.CurrentPage = event.page + 1;
        this.InitAccountDetailsList();
    }
}
