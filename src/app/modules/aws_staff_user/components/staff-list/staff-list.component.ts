import { Component, OnInit } from '@angular/core';
import { ContactType } from 'src/app/modules/common/core/contactType';
import { SelectItem } from 'primeng/api';
import { Router } from '@angular/router';
import { Filter } from 'src/app/modules/common/core/filters';
import { OverallCookieInterface } from 'src/app/modules/common/core/overallCookieInterface';
import { OverallCookieModel } from 'src/app/modules/common/core/overallCookieModel';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DeleteConfirmationComponent } from 'src/app/modules/common/components/delete-confirmation/delete-confirmation.component';
import { ClientCustomer, DisplayClientDetails } from 'src/app/modules/aws_client/core/client';
import { ClientModel } from 'src/app/modules/aws_client/models/clientModel';
import { ClientService } from 'src/app/modules/aws_client/services/client.service';
import { StaffModel } from '../../models/staffModel';
import { StaffService } from '../../services/staff.service';
import { DisplayStaffDetails } from '../../core/displayStaffDetails';
import { StaffDetails } from '../../core/staffDetails';

@Component({
    selector: 'app-staff-list',
    templateUrl: './staff-list.component.html',
    styleUrl: './staff-list.component.scss',
    providers: [DialogService],
})

export class StaffListComponent implements OnInit {
    contactTypes: ContactType[] = [
        { Id: 1, Name: 'Email', Code: 'EM' },
        { Id: 2, Name: 'Phone', Code: 'PH' },
    ];

    //Store Person status
    personTypes: SelectItem[] = [
        { label: 'All', value: 'ALL' },
        { label: 'Supplier', value: 'SP' },
        { label: 'Client', value: 'C' },
        { label: 'Subcontractor', value: 'SB' },
    ];
    //Store clients
    staffList: DisplayStaffDetails[] = [];
    //Store filter settings
    filter: Filter = {

        CurrentPage: 1,
        EndDate: new Date(),
        Id: '',
        ModuleId: 0,
        ParentId: 0,
        PriorityId: 0,
        RecordsPerPage: 20,
        SearchQuery: '',
        SortColumn: '',
        SortDirection: 'DESC',
        StaffId: '',
        StartDate: new Date(),
        StatusId: 0,
        Param1: 'ALL'

    };

    //Store client model
    clientModel !: ClientModel;
    // Store the cookie interface
    overallCookieInterface: OverallCookieInterface;
    // Store the company Id
    companyId: number = 0;
    // Store dynamic dialog ref
    ref: DynamicDialogRef | undefined;
    //Store staff model
    staffModel !: StaffModel;

    constructor(private route: Router, private clientService: ClientService, public dialogService: DialogService,
        private staffService: StaffService) {
        // Initializing the model
        this.clientModel = new ClientModel(this.clientService);
        this.staffModel = new StaffModel(this.staffService);
        this.overallCookieInterface = new OverallCookieModel();
        this.companyId = this.overallCookieInterface.GetCompanyId();
    }

    ngOnInit(): void {
        //get client list
        this.getDisplayStaffList();
    }

    //on change module list paginator
    onPageChange(event: any) {
        this.filter.CurrentPage = event.page + 1;
        this.getDisplayStaffList();
    }

    //Click on client
    onClickClientModifications(type: string, clientId: number) {
        this.route.navigate(
            ['/layout/staff/staff_main/staff_mod'],
            {
                state: {
                    StaffId: clientId,
                    EditingMode: type,
                },
            }
        );
    }

    //Get display client list from db
    getDisplayStaffList() {
        //Call service to get data
        this.staffModel.GetDisplayStaffDetails(this.filter, this.overallCookieInterface.GetCompanyId()).then(
            (data: DisplayStaffDetails[]) => {
                if (data) {
                    this.staffList = data;
                }
            }
        );
    }

    //On change filter
    onChangeFilter(type: string) {
        if (this.filter.RecordsPerPage < 1) {
            this.filter.RecordsPerPage = 1;
          }
        this.filter.CurrentPage = 1;
        this.getDisplayStaffList();
    }

    //Get display client list from db
    onRemoveCLientCustomer(client: DisplayStaffDetails) {
        // Open popup to confirm action
        this.ref = this.dialogService.open(DeleteConfirmationComponent, {
            header: 'Delete confirmation'
        });
        // Perform an action on close the popup
        this.ref.onClose.subscribe((confirmation: boolean) => {
            if (confirmation) {
                // Client object
                let staffDetails: StaffDetails = {
                    AccountId: '',
                    DateOfBirth: new Date(),
                    Email: '',
                    FirstName: '',
                    Id: client.Id,
                    LastName: '',
                    UserRoleList: [],
                    BusinessAddress: {
                        Id: 0,
                        BuildingName: '',
                        Country: {
                            Id: 0,
                            Code: '',
                            FlagIcon: '',
                            Name: ''
                        },
                        PostalCode: '',
                        State: '',
                        StreetName: '',
                        Suburb: ''
                    }
                };
                //Call service to get data
                this.staffModel.SetStaffDetails(staffDetails, this.overallCookieInterface.GetCompanyId(), this.overallCookieInterface.GetUserId(), "DELETE").then(
                    (data: DisplayClientDetails[]) => {
                        if (data) {
                            this.getDisplayStaffList();
                        }
                    }
                );
            }
        });
    }
}