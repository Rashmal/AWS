import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Filter } from 'src/app/modules/common/core/filters';
import { CommonModel } from 'src/app/modules/common/models/commonModel';
import { BugFixModel } from '../../models/bugFixModel';
import { NO$OF$RECORDS$PER$PAGE } from 'src/app/core/apiConfigurations';
import { StatisticsBoxData } from 'src/app/modules/common/core/statisticsBoxData';
import { DisplayModule } from 'src/app/modules/common/core/displayModule';
import { ViewBugFix } from '../../core/bugFixesModels/viewBugFix';
import { DisplayTable } from '../../core/bugFixesModels/displayContent';
import { Status } from 'src/app/modules/common/core/status';
import { OverallCookieInterface } from 'src/app/modules/common/core/overallCookieInterface';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Paginator } from 'primeng/paginator';
import { CommonService } from 'src/app/modules/common/services/common.service';
import { BugFixesService } from '../../services/bug-fixes.service';
import { Router } from '@angular/router';
import { OverallCookieModel } from 'src/app/modules/common/core/overallCookieModel';
import { BasicUserDetails } from 'src/app/modules/authentication/core/authenticationModals/basicUserDetails';
import { Priority } from 'src/app/modules/common/core/priority';
import { DeleteConfirmationComponent } from 'src/app/modules/common/components/delete-confirmation/delete-confirmation.component';
import { BugFix } from '../../core/bugFixesModels/bugFix';
import { SystemEnhancement } from '../../../system_enhancements/core/systemEnhancementModels/systemEnhancement';

@Component({
  selector: 'app-view-bug-fixes',
  standalone: false,
  templateUrl: './view-bug-fixes.component.html',
  styleUrl: './view-bug-fixes.component.scss',
  providers: [DialogService],
})
export class ViewBugFixesComponent implements OnInit, OnDestroy {
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
    SortColumn: 'TITLE',
    SortDirection: 'ASC'
  };
  // Store the modules filter object
  modulesFilter: Filter = {
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
    SortColumn: 'TITLE',
    SortDirection: 'ASC'
  };
  // Store the Common model
  commonModel: CommonModel;
  // Store the Bug Fix model
  bugFixModel: BugFixModel;
  // Store records per page
  recordsPerPage: SelectItem[] = NO$OF$RECORDS$PER$PAGE;
  // Storing the stats boxes
  statBoxesList: StatisticsBoxData[] = [];
  // Storing the display module list
  displayModuleList: DisplayModule[] = [];

  // Store view bugFix
  bugFixesList: ViewBugFix[] = [];
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
  // Store the local module dropdown
  localModuleDropdownSelection: number = -1;
  // Store Paginator reference
  @ViewChild('bugFixesPaginator') bugFixesPaginator: Paginator;
  @ViewChild('modulePaginator') modulePaginator: Paginator;
  // Store display full table
  displayFullTable: boolean = true;
  // Store the start filter date
  filterStartDate: Date = new Date();
  // Store the end filter date
  filterEndDate: Date = new Date();

  // Constructor
  constructor(
    private commonService: CommonService,
    private bugFixesService: BugFixesService,
    private route: Router,
    public dialogService: DialogService
  ) {
    // Initialize the model
    this.commonModel = new CommonModel(this.commonService);
    this.bugFixModel = new BugFixModel(
      this.bugFixesService
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
    this.bugFixModel.UnsubscribeAll();
  }

  ngOnInit(): void {
    // Initiate start date for filter
    this.setOneYerBefore();
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
    this.getAllBugFixesModuleList();
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
    this.commonModel.GetStatusListService('BG').then((data) => {
      // Getting the staff list
      let statusListLocal: Status[] = <Status[]>data;
      this.originalStatusListLocal = statusListLocal;
      // Setting the all option
      this.viewStatusDropdownList.push({
        label: 'All',
        value: -1,
      });
      debugger
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
    this.bugFixModel.GetStatBoxes().then((data) => {
      // Getting the staff list
      this.statBoxesList = <StatisticsBoxData[]>data;
    });
    // End of Calling the model to retrieve the data
  }

  // Getting all the display module list
  getAllBugFixesModuleList(status: boolean = false) {
    // Start loading
    this.showLoading = true;
    // Clear the list
    this.displayModuleList = [];
    // Setting the filter
    this.modulesFilter.ModuleId = status ? -1 : this.filter.ModuleId;
    this.modulesFilter.SearchQuery = status ? '' : this.filter.SearchQuery;
    this.modulesFilter.StaffId = status ? '-1' : this.filter.StaffId;
    this.modulesFilter.StatusId = status ? -1 : this.filter.StatusId;
    this.modulesFilter.PriorityId = status ? -1 : this.filter.PriorityId;
    this.modulesFilter.StartDate = this.filter.StartDate;
    this.modulesFilter.EndDate = this.filter.EndDate;

    // if (this.modulePaginator && status == false) {
    //     this.modulePaginator.changePage(0);
    // } else {
    if (this.localModuleDropdownSelection != -1) {
      this.modulesFilter.ModuleId = this.localModuleDropdownSelection;
    }
    // Calling the model to retrieve the data

    this.bugFixModel
      .GetBugFixesDisplayModulesService(this.modulesFilter)
      .then((data) => {
        // Getting the staff list
        this.displayModuleList = <DisplayModule[]>data;
        //this.filter.ModuleId = this.filter.ModuleId;
        if (this.localModuleDropdownSelection == -1) {
          this.filter.ModuleId = this.displayModuleList[0].Id;
        } else {
          this.filter.ModuleId = this.localModuleDropdownSelection;
        }

        // Set first module selected
        //this.clickOnModule();

        this.clickOnModule();

        // Start loading
        this.showLoading = false;
        this.displayFullTable = true;
      });
    // End of Calling the model to retrieve the data
    // }
  }

  // Getting all the display module list only
  getAllBugFixesModuleListTemp(status: boolean = false) {
    // Start loading
    this.showLoading = true;
    let modulesFilter = this.deep(this.modulesFilter);
    // Setting the filter
    modulesFilter.SearchQuery = status ? '' : this.filter.SearchQuery;
    modulesFilter.StaffId = status ? '-1' : this.filter.StaffId;
    modulesFilter.StatusId = status ? -1 : this.filter.StatusId;
    modulesFilter.PriorityId = status ? -1 : this.filter.PriorityId;
    modulesFilter.StartDate = this.filter.StartDate;
    modulesFilter.EndDate = this.filter.EndDate;

    // if (this.modulePaginator && status == false) {
    //     this.modulePaginator.changePage(0);
    // } else {
    if (this.localModuleDropdownSelection != -1) {
      modulesFilter.ModuleId = this.localModuleDropdownSelection;
    }
    // Calling the model to retrieve the data

    this.bugFixModel
      .GetBugFixesDisplayModulesService(modulesFilter)
      .then((data) => {
        // Getting the staff list
        let displayModuleList = <DisplayModule[]>data;

        // Loop through the existing list
        for (let i = 0; i < this.displayTable.length; i++) {
          // Getting the module ID
          let moduleId = this.displayTable[i].Module.Id;
          // Getting the count
          let totalCount = (moduleId == -1) ? 0 : displayModuleList.find(obj => obj.Id == moduleId).TotalList;
          // Update the count
          this.displayTable[i].TotalList = totalCount;
        }
        // End of Loop through the existing list

        // Start loading
        this.showLoading = false;
        this.displayFullTable = true;
      });
    // End of Calling the model to retrieve the data
    // }
  }

  // Generate display table
  generateDisplayTable() {
    // Empty display table
    this.displayTable = [];
    //Add content to display table
    this.displayModuleList.forEach((item) => {
      this.displayTable.push({
        Module: item,
        TotalList: item.TotalList,
        ExpandedContent:
          item.Id == this.filter.ModuleId ||
            (this.filter.ModuleId == -1 &&
              item.Id == this.displayModuleList[0].Id)
            ? this.bugFixesList
            : [],
      });
    });

    // Binding the no of lists
    this.getAllBugFixesModuleListTemp();
  }

  // On click event of the add new bugFix
  addNewBugFixClick() {
    // Routing to the new bugFix page
    this.route.navigate([
      '/layout/global/globalNotes/bugFixes/manageBugFix',
    ]);
    // Passing params
    //this.route.navigate(['/layout/global/globalNotes/bugFixes/manageBugFix'], { state: { BugFixesID: 'A27104EA-10A0-4439-8C00-369575CD2399', BugFixesTitle: 'Test Enhancement Rashmal 1' } });
    //this.route.navigate(['/layout/global/globalNotes/bugFixes/changeDateBugFix'], { state: { BugFixesID: '57C5B0A3-40CC-4E91-B33B-17B8D844848F' } });
  }

  // On click function of the comments
  commentOnClickFunction(bugFix: ViewBugFix) {
    // Routing the page
    this.route.navigate(
      [
        '/layout/global/globalNotes/bugFixes/commentsBugFix',
      ],
      {
        state: {
          BugFixesID: bugFix.Id,
          BugFixesTitle: bugFix.Title,
        },
      }
    );
  }

  // On click function of the change date history
  changeDateHistoryOnClick(bugFix: ViewBugFix) {
    // Routing the page
    this.route.navigate(
      [
        '/layout/global/globalNotes/bugFixes/changeDateBugFix',
      ],
      { state: { BugFixesID: bugFix.Id } }
    );
  }

  // On click function of edit
  editOnClickFunction(bugFix: ViewBugFix) {
    // Routing the page
    this.route.navigate(
      [
        '/layout/global/globalNotes/bugFixes/manageBugFix',
      ],
      {
        state: {
          BugFixesID: bugFix.Id,
          BugFixesTitle: bugFix.Title,
        },
      }
    );
  }

  // On click function of view
  titleOnClickFunction(bugFix: ViewBugFix) {
    // Routing the page
    this.route.navigate(
      [
        '/layout/global/globalNotes/bugFixes/manageBugFix',
      ],
      {
        state: {
          BugFixesID: bugFix.Id,
          BugFixesTitle: bugFix.Title,
          Type: 'VIEW',
        },
      }
    );
  }

  // Open delete confirmation
  deleteConfirmation(bugFix: ViewBugFix) {
    // Open popup to confirm action
    this.ref = this.dialogService.open(DeleteConfirmationComponent, {
      header: 'Delete a bug fix',
      data: bugFix,
    });
    // Perform an action on close the popup
    this.ref.onClose.subscribe((confirmation: boolean) => {
      if (confirmation) {
        this.deleteABugFix(bugFix);
      }
    });
  }

  // On delete bugFix
  deleteABugFix(bugFix: ViewBugFix) {
    //store bugFix
    let bug: BugFix = {
      Id: bugFix.Id,
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
      HasRequest: 0,
      IsNew: false
    };
    // Calling the modal to save the data
    this.bugFixModel
      .SetBugFixesDetailsService(bug, 'DELETE', this.overallCookieInterface.GetUserId())
      .then(() => {
        this.filter.CurrentPage = 1;
        // Refresh the bugFix list
        this.getBugFixesDisplayList();
      });
    // End of Calling the modal to save the data
  }

  //Click on module row
  clickOnModule() {
    this.filter.CurrentPage = 1;
    // Retrieve bugFix list for selected module
    this.getBugFixesDisplayList();
  }

  // Get bugFix display list individually
  getBugFixesIndividuallyDisplayList(moduleId: number) {
    // Start loading
    this.showLoading = true;
    // Clear the list
    this.bugFixesList = [];
    // Setting the filter
    let localFilter: Filter = this.deep(this.filter);
    // Setting the module ID
    localFilter.ModuleId = moduleId;
    // Calling the model to retrieve the data
    this.bugFixModel
      .GetBugFixesDisplayListService(localFilter, this.overallCookieInterface.GetUserId())
      .then((data) => {
        // Getting the staff list
        this.bugFixesList = <ViewBugFix[]>data;
        // Generate display table with module list and bugFix list
        // Empty display table
        this.displayTable = [];
        //Add content to display table
        this.displayModuleList.forEach((item) => {
          this.displayTable.push({
            Module: item,
            TotalList: item.TotalList,
            ExpandedContent:
              item.Id == moduleId
                ? this.bugFixesList
                : [],
          });
        });
      });

    // Stop loading
    this.showLoading = false;
    // End of Calling the model to retrieve the data
  }

  // Get bugFix display list
  getBugFixesDisplayList() {
    // Start loading
    this.showLoading = true;
    // Clear the list
    this.bugFixesList = [];
    // Calling the model to retrieve the data
    this.bugFixModel
      .GetBugFixesDisplayListService(this.filter, this.overallCookieInterface.GetUserId())
      .then((data) => {
        // Getting the staff list
        this.bugFixesList = <ViewBugFix[]>data;
        // Generate display table with module list and bugFix list
        this.generateDisplayTable();
        // Getting all the stat boxes list
        this.getAllStatBoxesList();
      });

    // Stop loading
    this.showLoading = false;
    // End of Calling the model to retrieve the data
  }

  // Get requesters names
  getRequestByNames(bugFix: ViewBugFix) {
    let requestNames = '';

    bugFix.RequestedStaffList.forEach((item, index) => {
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
  onPageChange(event: any) {
    // Set current page to filter
    this.modulesFilter.CurrentPage = event.page + 1;
    // Reset selected module id
    this.modulesFilter.ModuleId = -1;
    this.localModuleDropdownSelection = -1;
    //Get modules
    this.getAllBugFixesModuleList(true);
  }

  //on change bugFix list paginator
  onEnhancementPageChange(event: any, moduleId: number) {
    // Set current page to filter
    this.filter.CurrentPage = event.page + 1;

    // Start loading
    this.showLoading = true;
    // Clear the list
    this.bugFixesList = [];
    // Calling the model to retrieve the data
    this.bugFixModel
      .GetBugFixesDisplayListService(this.filter, this.overallCookieInterface.GetUserId())
      .then((data) => {
        // Getting the staff list
        this.bugFixesList = <ViewBugFix[]>data;
        // Generate display table with module list and bugFix list
        let indexObj = this.displayModuleList.findIndex(obj => obj.Id == moduleId);
        // Setting the new list
        this.displayTable[indexObj].ExpandedContent = this.bugFixesList;
      });

    // Stop loading
    this.showLoading = false;
    // End of Calling the model to retrieve the data

  }

  // On change drop down or input to filter data
  onChangeFilterItem(type: string) {
    this.filter.CurrentPage = 1;
    // Set filter properties according to type
    switch (type) {
      case 'START':
        // Getting the selected date
        let localStartDate = new Date(this.deep(this.filterStartDate));
        // Adding extra day to the date
        this.filter.StartDate = new Date(
          localStartDate.setDate(
            localStartDate.getDate() + 1
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
          SortColumn: 'TITLE',
          SortDirection: 'ASC'
        };
        this.filterStartDate = new Date();
        this.filterEndDate = new Date();
        this.setOneYerBefore();
        break;

      case 'END':
        // Getting the selected date
        let localEndDate: Date = new Date(this.deep(this.filterEndDate));

        this.filter.EndDate = new Date(
          localEndDate.setDate(
            localEndDate.getDate() + 1
          )
        );
        break;
    }

    //If module changed refresh module list
    if (type == 'MODULE') {
      this.displayFullTable = false;
      // Setting the module Id
      this.filter.ModuleId = this.deep(this.localModuleDropdownSelection);
      // Setting the module filter current page to be 1
      this.modulesFilter.CurrentPage = 1;
      // Get module list
      this.getAllBugFixesModuleList(false);
    } else {
      // Setting the module filter current page to be 1
      this.modulesFilter.CurrentPage = 1;
      // Get bugFix list
      this.getBugFixesDisplayList();
      // Getting all the modules based on the filter
      this.getAllBugFixesModuleListTemp();
    }
  }

  // Set one year before date to filter start date
  setOneYerBefore() {
    // Initiate start date for filter
    let today = new Date();
    let oneYearBefore = new Date(today);
    this.filter.StartDate.setFullYear(oneYearBefore.getFullYear() - 1);
    this.modulesFilter.StartDate.setFullYear(oneYearBefore.getFullYear() - 1);
    this.filterStartDate = this.filter.StartDate;
  }

  // Making a deep copy
  deep<T extends any>(source: T): T {
    return JSON.parse(JSON.stringify(source));
  }

  // On Select status on click function
  onSelectStatusOnClick(status: Status, bugFix: ViewBugFix) {
    // Start loading
    this.showLoading = true;
    // Calling the model to update the status
    this.bugFixModel
      .UpdateBugFixesStatusStatus(bugFix.Id, status.Id)
      .then((data) => {
        //this.filter.CurrentPage = 1;
        // Refresh the list
        //this.getBugFixesDisplayList();
        // Check if the filter is there
        if (this.bugFixesList && this.bugFixesList.length > 0 && this.bugFixesList[0].Total > this.filter.RecordsPerPage) {
          this.bugFixesPaginator.changePage(this.filter.CurrentPage - 1);
          // Getting all the stat boxes list
          this.getAllStatBoxesList();
        } else {
          this.filter.CurrentPage = 1;
          this.getBugFixesDisplayList();
        }
        // End of Check if the filter is there
      });
    // End of Calling the model to update the status
  }

  // toggle the status options visible
  toggleStatusOptionsVisible() {
    this.displayStatusOptions = !this.displayStatusOptions;
  }

  // On change event of bugFix
  onChangeBugFixesStatus(bugFix: ViewBugFix) {
    // Getting the ID
    let statusID = this.originalStatusListLocal.find(
      (obj) => obj.Name == bugFix.StatusName
    ).Id;

    // Calling the model to update the status
    this.bugFixModel
      .UpdateBugFixesStatusStatus(bugFix.Id, statusID)
      .then((data) => {
        // Setting the module filter current page to be 1
        this.modulesFilter.CurrentPage = 1;
        // Refresh the list
        this.getBugFixesDisplayList();
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

  // Getting the status color code by status name
  getStatusColorCodeByName(statusName: string) {
    if (statusName == '') {
      return 'white';
    } else {
      return this.originalStatusListLocal.find(
        (obj) => obj.Name.trim().toLocaleUpperCase() == statusName.trim().toLocaleUpperCase()
      ).ColorCode;
    }
  }

  // Sort bugFix items
  sortItems(column: string) {
    this.filter.SortColumn = column;
    this.filter.SortDirection = this.filter.SortDirection == 'ASC' ? 'DESC' : 'ASC';
    this.onChangeFilterItem('SORT');
  }

  // Get colors for dropdown
  getColorForDD(item: SelectItem, type: string) {
    let status = this.originalStatusListLocal.find(k => (k.Name.toLocaleUpperCase() == item.label.toLocaleUpperCase()));
    return status ? status.ColorCode : (type == 'BG' ? '#ffffff' : '#000000')
  }

}

