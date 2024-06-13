import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { BUG_FIXES$TITLE$LIMIT } from 'src/app/core/apiConfigurations';
import { BasicUserDetails } from 'src/app/modules/authentication/core/authenticationModals/basicUserDetails';
import { IErrorMessage } from 'src/app/modules/common/core/iErrorMessage';
import { OverallCookieInterface } from 'src/app/modules/common/core/overallCookieInterface';
import { OverallCookieModel } from 'src/app/modules/common/core/overallCookieModel';
import { Priority } from 'src/app/modules/common/core/priority';
import { Status } from 'src/app/modules/common/core/status';
import { CommonModel } from 'src/app/modules/common/models/commonModel';
import { CommonService } from 'src/app/modules/common/services/common.service';
import { BugFix } from 'src/app/modules/global_notes/global-notes/bug_fixes/core/bugFixesModels/bugFix';
import { BugFixModel } from 'src/app/modules/global_notes/global-notes/bug_fixes/models/bugFixModel';
import { BugFixesService } from 'src/app/modules/global_notes/global-notes/bug_fixes/services/bug-fixes.service';

@Component({
  selector: 'app-report-bug',
  standalone: false,
  templateUrl: './report-bug.component.html',
  styleUrl: './report-bug.component.scss'
})
export class ReportBugComponent {
  // Store the Bug Fix object
  bugFix: BugFix;
  // Store the Common model
  commonModel: CommonModel;
  // Store the Bug Fix model
  bugFixModel: BugFixModel;
  // Store the cookie interface
  overallCookieInterface: OverallCookieInterface;
  // Store the priority dropdown view list
  viewPriorityDropdownList: SelectItem[] = [];
  // Store the status dropdown view list
  viewStatusDropdownList: SelectItem[] = [];
  // Store the module dropdown view list
  viewModulesDropdownList: SelectItem[] = [];
  // Store show loading
  showLoading: boolean = false;
  // Store the error messages
  errorMessagesList: IErrorMessage[] = [];
  // Store the title limit
  titleLimit: number = BUG_FIXES$TITLE$LIMIT;
  // Store the managed staff dropdown view list
  viewManagedStaffDropdownList: BasicUserDetails[] = [];
  // Store the requested staff dropdown view list
  viewRequestedStaffDropdownList: BasicUserDetails[] = [];

  // Constructor
  constructor(private commonService: CommonService, private bugFixesService: BugFixesService,
    private route: Router
  ) {
    // Initialize the model
    this.commonModel = new CommonModel(this.commonService);
    this.bugFixModel = new BugFixModel(this.bugFixesService);
    this.overallCookieInterface = new OverallCookieModel();
  }

  ngOnDestroy() {
    // Unsubscribe all
    this.commonModel.UnsubscribeAll();
    this.bugFixModel.UnsubscribeAll();
  }

  ngOnInit(): void {
    // Initialize the object
    this.bugFix = {
      Id: '',
      AddedUserId: this.overallCookieInterface.GetUserId(),
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
    // Initialize default data
    this.initDefaultData();
  }

  // Initialize default data
  initDefaultData() {
    // Getting all the priority list
    this.getAllPriorityList();
    // Getting all the status list
    this.getAllStatusList();
    // Getting all the module list
    this.getAllModulesList();
    // Getting all the staff list
    this.getAllStaffList();
  }

  // Getting all the staff list
  getAllStaffList() {
    // Clear the list
    this.viewManagedStaffDropdownList = [];
    this.viewRequestedStaffDropdownList = [];
    // Calling the model to retrieve the data
    this.commonModel.GetAllStaffListService(this.overallCookieInterface.GetCompanyId()).then(
      (data) => {
        // Getting the staff list
        let staffListLocal: BasicUserDetails[] = <BasicUserDetails[]>data;
        // Setting the option
        this.viewManagedStaffDropdownList = staffListLocal;
        this.viewRequestedStaffDropdownList = staffListLocal;

        // Setting the logged user as requested staff
        let indexObj = this.viewRequestedStaffDropdownList.findIndex(obj => obj.Id == this.overallCookieInterface.GetUserId());
        if (indexObj != -1) {
          this.bugFix.RequestedStaffList.push(this.viewRequestedStaffDropdownList[indexObj]);
        }
        // End of Setting the logged user as requested staff
      }
    );
    // End of Calling the model to retrieve the data
  }

  // Getting all the priority list
  getAllPriorityList() {
    // Clear the list
    this.viewPriorityDropdownList = [];
    // Calling the model to retrieve the data
    this.commonModel.GetPriorityListService(this.overallCookieInterface.GetCompanyId()).then(
      (data) => {
        // Getting the staff list
        let priorityListLocal: Priority[] = <Priority[]>data;
        // Loop through the list
        for (let i = 0; i < priorityListLocal.length; i++) {
          // Setting the option
          this.viewPriorityDropdownList.push({
            label: priorityListLocal[i].Name,
            value: +priorityListLocal[i].Id
          });
        }
        // End of Loop through the list

        // Setting the default selection
        this.bugFix.PriorityId = this.viewPriorityDropdownList[0].value;
      }
    );
    // End of Calling the model to retrieve the data
  }

  // Getting all the status list
  getAllStatusList() {
    // Clear the list
    this.viewStatusDropdownList = [];
    // Calling the model to retrieve the data
    this.commonModel.GetStatusListService("BG", this.overallCookieInterface.GetCompanyId()).then(
      (data) => {
        // Getting the staff list
        let statusListLocal: Status[] = <Status[]>data;
        // Loop through the list
        for (let i = 0; i < statusListLocal.length; i++) {
          // Setting the option
          this.viewStatusDropdownList.push({
            label: statusListLocal[i].Name,
            value: +statusListLocal[i].Id
          });
        }
        // End of Loop through the list

        // Setting the default selection
        this.bugFix.StatusId = this.viewStatusDropdownList[0].value;
      }
    );
    // End of Calling the model to retrieve the data
  }

  // Getting all the module list
  getAllModulesList() {
    // Clear the list
    this.viewModulesDropdownList = [];
    // Calling the model to retrieve the data
    this.commonModel.GetModuleListService(this.overallCookieInterface.GetCompanyId()).then(
      (data) => {
        // Getting the staff list
        let modulesListLocal: Status[] = <Status[]>data;
        // Loop through the list
        for (let i = 0; i < modulesListLocal.length; i++) {
          // Setting the option
          this.viewModulesDropdownList.push({
            label: modulesListLocal[i].Name,
            value: +modulesListLocal[i].Id
          });
        }
        // End of Loop through the list

        // Check the current selected module
        let currentModuleId = localStorage.getItem("MODULE");
        // Check if the module id exists
        if (currentModuleId) {
          // Getting the index
          let indexObj = this.viewModulesDropdownList.findIndex(obj => obj.value == +currentModuleId);
          // Check if the Id is not -1
          if (indexObj != -1) {
            // Setting the default selection
            this.bugFix.ModuleId = this.viewModulesDropdownList[indexObj].value;
          } else {
            // Setting the default selection
            this.bugFix.ModuleId = this.viewModulesDropdownList[0].value;
          }
          // End of Check if the Id is not -1
        } else {
          // Setting the default selection
          this.bugFix.ModuleId = this.viewModulesDropdownList[0].value;
        }
        // End of Check if the module id exists
      }
    );
    // End of Calling the model to retrieve the data
  }

  // Check if the error exists
  CheckErrorCode(errorCode: string) {
    // Find for the code
    let indexObject = this.errorMessagesList.findIndex(obj => obj.ErrorCode == errorCode);
    // Return the error object
    if (indexObject < 0) {
      return null;
    } else {
      return this.errorMessagesList[indexObject];
    }
  }

  // On click function of close button
  closeOnClickFunction() {
    // Route to the list
    this.route.navigate(['/layout']);
  }

  // On click function of save button
  saveOnClickFunction() {
    // Validate the fields in the login page
    this.fieldValidation();
    // End of Validate the fields in the login page

    // Check if the error messages length
    if (this.errorMessagesList.length > 0) {
      return;
    }
    // End of Check if the error messages length

    // Check if the bug fix ID exists
    if (this.bugFix.Id && this.bugFix.Id != '') {
      // Calling the modal to save the data
      this.bugFixModel.SetBugFixesDetailsService(this.bugFix, "UPDATE", this.overallCookieInterface.GetUserId(), this.overallCookieInterface.GetCompanyId()).then(
        () => {
          // Route to the list
          this.route.navigate(['/layout']);
        }
      );
      // End of Calling the modal to save the data
    } else {
      // Calling the modal to save the data
      this.bugFixModel.SetBugFixesDetailsService(this.bugFix, "NEW", this.overallCookieInterface.GetUserId(), this.overallCookieInterface.GetCompanyId()).then(
        () => {
          // Route to the list
          this.route.navigate(['/layout']);
        }
      );
      // End of Calling the modal to save the data
    }
    // End of Check if the bug fix ID exists
  }

  // Validation of the fields
  fieldValidation() {
    // Clear the error message list
    this.errorMessagesList = [];

    // Check if the title exists
    if (!(this.bugFix.Title && this.bugFix.Title.trim() && this.bugFix.Title.trim() != '')) {
      // Pushing the error message
      this.errorMessagesList.push(
        {
          ErrorCode: 'EMPTY$TITLE',
          ErrorMessage: 'Title is mandatory'
        }
      );
    }
    // End of Check if the title exists

    // Check if the description exists
    if (!(this.bugFix.Description && this.bugFix.Description.trim() && this.bugFix.Description.trim() != '')) {
      // Pushing the error message
      this.errorMessagesList.push(
        {
          ErrorCode: 'EMPTY$DESCRIPTION',
          ErrorMessage: 'Description is mandatory'
        }
      );
    }
    // End of Check if the description exists

    // Check if the requested staff list is not empty
    if (!(this.bugFix.RequestedStaffList && this.bugFix.RequestedStaffList.length != 0)) {
      // Pushing the error message
      this.errorMessagesList.push(
        {
          ErrorCode: 'EMPTY$REQ$STAFF',
          ErrorMessage: 'Requested staff is mandatory'
        }
      );
    }
    // End of Check if the requested staff list is not empty

    // Check if error message is empty
    if (this.errorMessagesList.length > 0) {
      return;
    }
    // End of Check if error message is empty
  }
}
