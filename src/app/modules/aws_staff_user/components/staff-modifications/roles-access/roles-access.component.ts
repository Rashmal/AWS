import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { SelectItem } from 'primeng/api';
import { Country } from 'src/app/modules/common/core/country';
import { CommonService } from 'src/app/modules/common/services/common.service';
import { OverallCookieInterface } from 'src/app/modules/common/core/overallCookieInterface';
import { OverallCookieModel } from 'src/app/modules/common/core/overallCookieModel';
import { CommonModel } from 'src/app/modules/common/models/commonModel';
import { Module } from 'src/app/modules/common/core/module';
import { Filter } from 'src/app/modules/common/core/filters';

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
    selector: 'app-roles-access',
    templateUrl: './roles-access.component.html',
    styleUrl: './roles-access.component.scss',
})
export class RolesAccessComponent implements OnInit {
    // Store the display country list
    displayCountryList: SelectItem[] = [];
    // Store the modification mode
    modificationMode = 'NEW';
    // Store the selected client Id
    selectedStaffId = 0;
    //store selected staff
    staffDetails: any;

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
    // Store the products list
    constructor(
        private location: Location,
        private commonService: CommonService
    ) {
        // Initialize the model
        this.commonModel = new CommonModel(this.commonService);
        this.overallCookieInterface = new OverallCookieModel();
        // Setting the user role
        this.userRoleCode = this.overallCookieInterface
            .GetUserRole()
            .toUpperCase();
        this.commonModel = new CommonModel(this.commonService);
    }

    ngOnInit(): void {
        // Getting the passed params
        let paramObject = this.location.getState();
        //Set editing mode
        if (paramObject['EditingMode']) {
            this.modificationMode = paramObject['EditingMode'];
        }
        //Set editing staff id
        if (paramObject['StaffId']) {
            this.selectedStaffId = paramObject['StaffId'];
            this.getModuleAccessList();
        }
    }
    //On bluer event of input
    onBlurEvent(type: string) {}

    // Getting all the access list based on the user role for view
    getModuleAccessList() {
        this.commonModel
            .GetViewAccessListBasedUserRole(this.userRoleCode, this.overallCookieInterface.GetCompanyId(),  this.overallCookieInterface.GetUserId())
            .then((data: Module[]) => {
                this.moduleList = data;
            });
    }
    //on change module list paginator
    onPageChange(event: any) {
        this.filter.CurrentPage = event.page + 1;
        
    }
}
