import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { NO$OF$RECORDS$PER$PAGE } from 'src/app/core/apiConfigurations';
import { BasicUserDetails } from 'src/app/modules/authentication/core/authenticationModals/basicUserDetails';
import { Filter } from 'src/app/modules/common/core/filters';
import { Priority } from 'src/app/modules/common/core/priority';
import { StatisticsBoxData } from 'src/app/modules/common/core/statisticsBoxData';
import { Status } from 'src/app/modules/common/core/status';
import { CommonModel } from 'src/app/modules/common/models/commonModel';
import { CommonService } from 'src/app/modules/common/services/common.service';
import { SystemEnhancementModel } from '../../models/systemEnhancementModel';
import { SystemEnhancementsService } from '../../services/system-enhancements.service';
import { DisplayModule } from 'src/app/modules/common/core/displayModule';
import { Router } from '@angular/router';
import { ViewSystemEnhancement } from '../../core/systemEnhancementModels/viewSystemEnhancement';
import { DisplayTable } from '../../core/systemEnhancementModels/displayContent';
import { SystemEnhancement } from '../../core/systemEnhancementModels/systemEnhancement';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OverallCookieInterface } from 'src/app/modules/common/core/overallCookieInterface';
import { OverallCookieModel } from 'src/app/modules/common/core/overallCookieModel';
import { DeleteConfirmationComponent } from 'src/app/modules/common/components/delete-confirmation/delete-confirmation.component';
@Component({
    selector: 'app-view-system-enhancements',
    standalone: false,
    templateUrl: './view-system-enhancements.component.html',
    styleUrl: './view-system-enhancements.component.scss',
    providers: [DialogService],
})
export class ViewSystemEnhancementsComponent implements OnInit, OnDestroy {
    // Store the staff dropdown view list
    viewStaffDropdownList: SelectItem[] = [];
    // Store the priority dropdown view list
    viewPriorityDropdownList: SelectItem[] = [];
    // Store the status dropdown view list
    viewStatusDropdownList: SelectItem[] = [];
    // Store the status dropdown view list for mobile
    viewStatusMobileDropdownList: SelectItem[] = [];
    // Store the module dropdown view list
    viewModulesDropdownList: SelectItem[] = [];
    // Store the filter object
    filter: Filter = {
        Id: '',
        CurrentPage: 1,
        EndDate: new Date(),
        ModuleId: -1,
        ParentId: 0,
        PriorityId: -1,
        RecordsPerPage: 10,
        SearchQuery: '',
        StaffId: '-1',
        StartDate: new Date(),
        StatusId: -1,
    };
    // Store the Common model
    commonModel: CommonModel;
    // Store the System Enhancement model
    systemEnhancementModel: SystemEnhancementModel;
    // Store records per page
    recordsPerPage: SelectItem[] = NO$OF$RECORDS$PER$PAGE;
    // Storing the stats boxes
    statBoxesList: StatisticsBoxData[] = [];
    // Storing the display module list
    displayModuleList: DisplayModule[] = [];

    // Store view system enhancement
    systemEnhancementList: ViewSystemEnhancement[] = [];
    // Store display table data
    displayTable: DisplayTable[] = [];
    // Store the status list
    originalStatusListLocal: Status[] = [];
    // Store the user role code
    userRoleCode: string = '';
    // Store the cookie interface
    overallCookieInterface: OverallCookieInterface;
    // Store display status options
    displayStatusOptions: boolean = false;
    // Store the loading
    showLoading: boolean = false;
    // Store dynamic dialog ref
    ref: DynamicDialogRef | undefined;
    // Constructor
    constructor(
        private commonService: CommonService,
        private systemEnhancementsService: SystemEnhancementsService,
        private route: Router,
        public dialogService: DialogService
    ) {
        // Initialize the model
        this.commonModel = new CommonModel(this.commonService);
        this.systemEnhancementModel = new SystemEnhancementModel(
            this.systemEnhancementsService
        );
        this.overallCookieInterface = new OverallCookieModel();
        // Setting the user role
        this.userRoleCode = this.overallCookieInterface
            .GetUserRole()
            .toUpperCase();
    }

    ngOnDestroy() {
        // Unsubscribe all
        this.commonModel.UnsubscribeAll();
        this.systemEnhancementModel.UnsubscribeAll();
    }

    ngOnInit(): void {
        // Getting all the staff list
        this.getAllStaffList();
        // Getting all the priority list
        this.getAllPriorityList();
        // Getting all the status list
        this.getAllStatusList();
        // Getting all the module list
        this.getAllModulesList();
        // Getting all the stat boxes list
        this.getAllStatBoxesList();
        // Getting all the display module list
        this.getAllSystemEnhancementModuleList();
    }

    // Getting all the staff list
    getAllStaffList() {
        // Clear the list
        this.viewStaffDropdownList = [];
        // Calling the model to retrieve the data
        this.commonModel.GetAllStaffListService().then((data) => {
            // Getting the staff list
            let staffListLocal: BasicUserDetails[] = <BasicUserDetails[]>data;
            // Setting the all option
            this.viewStaffDropdownList.push({
                label: 'All',
                value: '-1',
            });
            // Loop through the list
            for (let i = 0; i < staffListLocal.length; i++) {
                // Setting the option
                this.viewStaffDropdownList.push({
                    label:
                        staffListLocal[i].FirstName +
                        ' ' +
                        staffListLocal[i].LastName,
                    value: staffListLocal[i].Id,
                });
            }
            // End of Loop through the list
        });
        // End of Calling the model to retrieve the data
    }

    // Getting all the priority list
    getAllPriorityList() {
        // Clear the list
        this.viewPriorityDropdownList = [];
        // Calling the model to retrieve the data
        this.commonModel.GetPriorityListService().then((data) => {
            // Getting the staff list
            let priorityListLocal: Priority[] = <Priority[]>data;
            // Setting the all option
            this.viewPriorityDropdownList.push({
                label: 'All',
                value: -1,
            });
            // Loop through the list
            for (let i = 0; i < priorityListLocal.length; i++) {
                // Setting the option
                this.viewPriorityDropdownList.push({
                    label: priorityListLocal[i].Name,
                    value: +priorityListLocal[i].Id,
                });
            }
            // End of Loop through the list
        });
        // End of Calling the model to retrieve the data
    }

    // Getting all the status list
    getAllStatusList() {
        // Clear the list
        this.viewStatusDropdownList = [];
        this.viewStatusMobileDropdownList = [];
        // Calling the model to retrieve the data
        this.commonModel.GetStatusListService('SE').then((data) => {
            // Getting the staff list
            let statusListLocal: Status[] = <Status[]>data;
            this.originalStatusListLocal = statusListLocal;
            // Setting the all option
            this.viewStatusDropdownList.push({
                label: 'All',
                value: -1,
            });
            // Loop through the list
            for (let i = 0; i < statusListLocal.length; i++) {
                // Setting the option
                this.viewStatusDropdownList.push({
                    label: statusListLocal[i].Name,
                    value: +statusListLocal[i].Id,
                });
                this.viewStatusMobileDropdownList.push({
                    label: statusListLocal[i].Name,
                    value: +statusListLocal[i].Id,
                });
            }
            // End of Loop through the list
        });
        // End of Calling the model to retrieve the data
    }

    // Getting all the module list
    getAllModulesList() {
        // Clear the list
        this.viewModulesDropdownList = [];
        // Calling the model to retrieve the data
        this.commonModel.GetModuleListService().then((data) => {
            // Getting the staff list
            let modulesListLocal: Status[] = <Status[]>data;
            // Setting the all option
            this.viewModulesDropdownList.push({
                label: 'All',
                value: -1,
            });
            // Loop through the list
            for (let i = 0; i < modulesListLocal.length; i++) {
                // Setting the option
                this.viewModulesDropdownList.push({
                    label: modulesListLocal[i].Name,
                    value: +modulesListLocal[i].Id,
                });
            }
            // End of Loop through the list
        });
        // End of Calling the model to retrieve the data
    }

    // Getting all the stat boxes list
    getAllStatBoxesList() {
        // Clear the list
        this.statBoxesList = [];
        // Calling the model to retrieve the data
        this.systemEnhancementModel.GetStatBoxes().then((data) => {
            // Getting the staff list
            this.statBoxesList = <StatisticsBoxData[]>data;
        });
        // End of Calling the model to retrieve the data
    }

    // Getting all the display module list
    getAllSystemEnhancementModuleList() {
        // Start loading
        this.showLoading = true;
        // Clear the list
        this.displayModuleList = [];
        // Calling the model to retrieve the data
        this.systemEnhancementModel
            .GetSystemEnhancementDisplayModulesService(this.filter)
            .then((data) => {
                // Getting the staff list
                this.displayModuleList = <DisplayModule[]>data;
                // Check module list is not undefined
                if (this.displayModuleList.length > 0) {
                    debugger
                    // Set first module selected
                    this.clickOnModule();
                } else {
                    // Stop loading
                    this.showLoading = false;
                }
            });
        // End of Calling the model to retrieve the data
    }

    // Generate display table
    generateDisplayTable() {
        // Empty display table
        this.displayTable = [];
        //Add content to display table
        this.displayModuleList.forEach((item) => {
            this.displayTable.push({
                Module: item,
                ExpandedContent:
                    (item.Id == this.filter.ModuleId || this.filter.ModuleId == -1 && item.Id == this.displayModuleList[0].Id)
                        ? this.systemEnhancementList
                        : [],
            });
        });
    }

    // On click event of the add new system enhancement
    addNewSystemEnhancementClick() {
        // Routing to the new enhancement page
        this.route.navigate([
            '/layout/global/globalNotes/systemEnhancements/manageSystemEnhancement',
        ]);
        // Passing params
        //this.route.navigate(['/layout/global/globalNotes/systemEnhancements/manageSystemEnhancement'], { state: { SystemEnhancementID: 'A27104EA-10A0-4439-8C00-369575CD2399', SystemEnhancementTitle: 'Test Enhancement Rashmal 1' } });
        //this.route.navigate(['/layout/global/globalNotes/systemEnhancements/changeDateEnhancement'], { state: { SystemEnhancementID: '57C5B0A3-40CC-4E91-B33B-17B8D844848F' } });
    }

    // On click function of the comments
    commentOnClickFunction(enhancement: ViewSystemEnhancement) {
        // Routing the page
        this.route.navigate(
            [
                '/layout/global/globalNotes/systemEnhancements/commentsSystemEnhancement',
            ],
            {
                state: {
                    SystemEnhancementID: enhancement.Id,
                    SystemEnhancementTitle: enhancement.Title,
                },
            }
        );
    }

    // On click function of the change date history
    changeDateHistoryOnClick(enhancement: ViewSystemEnhancement) {
        // Routing the page
        this.route.navigate(
            [
                '/layout/global/globalNotes/systemEnhancements/changeDateEnhancement',
            ],
            { state: { SystemEnhancementID: enhancement.Id } }
        );
    }

    // On click function of edit
    editOnClickFunction(enhancement: ViewSystemEnhancement) {
        // Routing the page
        this.route.navigate(
            [
                '/layout/global/globalNotes/systemEnhancements/manageSystemEnhancement',
            ],
            {
                state: {
                    SystemEnhancementID: enhancement.Id,
                    SystemEnhancementTitle: enhancement.Title,
                },
            }
        );
    }

    // On click function of view
    titleOnClickFunction(enhancement: ViewSystemEnhancement) {
        // Routing the page
        this.route.navigate(
            [
                '/layout/global/globalNotes/systemEnhancements/manageSystemEnhancement',
            ],
            {
                state: {
                    SystemEnhancementID: enhancement.Id,
                    SystemEnhancementTitle: enhancement.Title,
                    Type: 'VIEW',
                },
            }
        );
    }

    // Open delete confirmation
    deleteConfirmation(enhancement: ViewSystemEnhancement) {
        // Open popup to confirm action
        this.ref = this.dialogService.open(DeleteConfirmationComponent, {
            header: 'Delete an enhancement',
            data: enhancement,
        });
        // Perform an action on close the popup
        this.ref.onClose.subscribe((confirmation: boolean) => {
            if (confirmation) {
                this.deleteAnEnhancement(enhancement);
            }
        });
    }

    // On delete enhancement
    deleteAnEnhancement(enhancement: ViewSystemEnhancement) {
        //store system enhancement
        let enhance: SystemEnhancement = {
            Id: enhancement.Id,
            AddedUserId: '',
            Title: '',
            Description: '',
            StartDate: new Date(),
            EndDate: new Date(),
            ModuleId: 0,
            PriorityId: 0,
            StatusId: 0,
            EstimatedHours: 0,
            AssignedStaffList: [],
            RequestedStaffList: [],
        };
        // Calling the modal to save the data
        this.systemEnhancementModel
            .SetSystemEnhancementDetailsService(enhance, 'DELETE')
            .then(() => {
                // Refresh the enhancement list
                this.getSystemEnhancementDisplayList();
            });
        // End of Calling the modal to save the data
    }

    //Click on module row
    clickOnModule() {
        // Set selected module
        this.filter.ModuleId = this.filter.ModuleId;
        // Retrieve system enhancement list for selected module
        this.getSystemEnhancementDisplayList();
    }

    // Get system enhancement display list
    getSystemEnhancementDisplayList() {
        // Start loading
        this.showLoading = true;
        // Clear the list
        this.systemEnhancementList = [];
        // Calling the model to retrieve the data
        this.systemEnhancementModel
            .GetSystemEnhancementDisplayListService(this.filter)
            .then((data) => {
                // Getting the staff list
                this.systemEnhancementList = <ViewSystemEnhancement[]>data;
                // Generate display table with module list and enhancement list
                this.generateDisplayTable();
            });

        // Stop loading
        this.showLoading = false;
        // End of Calling the model to retrieve the data
    }

    // Get requesters names
    getRequestByNames(enhancement: ViewSystemEnhancement) {
        let requestNames = '';

        enhancement.RequestedStaffList.forEach((item, index) => {
            if (requestNames == '') {
                requestNames = item.FirstName + ' ' + item.LastName;
            } else {
                requestNames =
                    requestNames + ', ' + item.FirstName + ' ' + item.LastName;
            }
        });
        return requestNames;
    }

    //on change module list paginator
    onPageChange(event: any) { }

    //on change enhancement list paginator
    onEnhancementPageChange(event: any) {
        // Set current page to filter
        this.filter.CurrentPage = event.page + 1;
        //Get enhancement list for the selected page
        this.getSystemEnhancementDisplayList();
    }

    // On change drop down or input to filter data
    onChangeFilterItem(type: string) {
        // Set filter properties according to type
        switch (type) {
            case 'START':
                this.filter.StartDate = new Date(
                    this.filter.StartDate.setDate(
                        this.filter.StartDate.getDate() + 1
                    )
                );
                break;

            case 'CLEAR':
                this.filter = {
                    Id: '',
                    CurrentPage: 1,
                    EndDate: new Date(),
                    ModuleId: -1,
                    ParentId: 0,
                    PriorityId: -1,
                    RecordsPerPage: 10,
                    SearchQuery: '',
                    StaffId: '-1',
                    StartDate: new Date(),
                    StatusId: -1,
                };
                break;

            case 'END':
                this.filter.EndDate = new Date(
                    this.filter.EndDate.setDate(
                        this.filter.EndDate.getDate() + 1
                    )
                );
                break;
        }

        //If module changed refresh module list
        if (type == 'MODULE') {
            // Get module list
            this.getAllSystemEnhancementModuleList();
        } else {
            // Get enhancement list
            this.getSystemEnhancementDisplayList();
        }
    }

    // Making a deep copy
    deep<T extends object>(source: T): T {
        return JSON.parse(JSON.stringify(source));
        return JSON.parse(JSON.stringify(source));
    }

    // On Select status on click function
    onSelectStatusOnClick(status: Status, enhancement: ViewSystemEnhancement) {
        // Start loading
        this.showLoading = true;
        // Calling the model to update the status
        this.systemEnhancementModel
            .UpdateSystemEnhancementStatus(enhancement.Id, status.Id)
            .then((data) => {
                // Refresh the list
                this.getSystemEnhancementDisplayList();
            });
        // End of Calling the model to update the status
    }

    // toggle the status options visible
    toggleStatusOptionsVisible() {
        this.displayStatusOptions = !this.displayStatusOptions;
    }

    // On change event of system enhancement
    onChangeSystemEnhancementStatus(enhancement: ViewSystemEnhancement) {
        // Getting the ID
        let statusID = this.originalStatusListLocal.find(
            (obj) => obj.Name == enhancement.StatusName
        ).Id;

        // Calling the model to update the status
        this.systemEnhancementModel
            .UpdateSystemEnhancementStatus(enhancement.Id, statusID)
            .then((data) => {
                // Refresh the list
                this.getSystemEnhancementDisplayList();
            });
        // End of Calling the model to update the status
    }

    // Getting the status color code
    getStatusColorCode(statusCode: number) {
        if (statusCode == -1) {
            return 'white';
        } else {
            return this.originalStatusListLocal.find(
                (obj) => obj.Id == statusCode
            ).ColorCode;
        }
    }
}