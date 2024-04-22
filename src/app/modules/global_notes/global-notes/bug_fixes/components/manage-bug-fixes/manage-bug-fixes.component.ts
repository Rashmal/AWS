import { Component } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { BasicUserDetails } from 'src/app/modules/authentication/core/authenticationModals/basicUserDetails';
import { CommonModel } from 'src/app/modules/common/models/commonModel';
import { BugFixModel } from '../../models/bugFixModel';
import { BugFix } from '../../core/bugFixesModels/bugFix';
import { IErrorMessage } from 'src/app/modules/common/core/iErrorMessage';
import { SYSTEM_ENHANCEMENT$TITLE$LIMIT } from 'src/app/core/apiConfigurations';
import { OverallCookieInterface } from 'src/app/modules/common/core/overallCookieInterface';
import { CommonService } from 'src/app/modules/common/services/common.service';
import { BugFixesService } from '../../services/bug-fixes.service';
import { Router } from '@angular/router';
import { OverallCookieModel } from 'src/app/modules/common/core/overallCookieModel';
import { Location } from '@angular/common';
import { Status } from 'src/app/modules/common/core/status';
import { Priority } from 'src/app/modules/common/core/priority';

@Component({
  selector: 'app-manage-bug-fixes',
  standalone: false,
  templateUrl: './manage-bug-fixes.component.html',
  styleUrl: './manage-bug-fixes.component.scss'
})
export class ManageBugFixesComponent {
  // Store the priority dropdown view list
  viewPriorityDropdownList: SelectItem[] = [];
  // Store the status dropdown view list
  viewStatusDropdownList: SelectItem[] = [];
  // Store the module dropdown view list
  viewModulesDropdownList: SelectItem[] = [];
  // Store the managed staff dropdown view list
  viewManagedStaffDropdownList: BasicUserDetails[] = [];
  // Store the requested staff dropdown view list
  viewRequestedStaffDropdownList: BasicUserDetails[] = [];
  // Store the Common model
  commonModel: CommonModel;
  // Store the Bug Fix model
  bugFixModel: BugFixModel;
  // Store the Bug Fix object
  bugFix: BugFix;
  // Store the error messages
  errorMessagesList: IErrorMessage[] = [];
  // Store the title limit
  titleLimit: number = SYSTEM_ENHANCEMENT$TITLE$LIMIT;
  // Store the cookie interface
  overallCookieInterface: OverallCookieInterface;
  // Store the start date
  startDate: Date = new Date();
  // Store the end date
  endDate: Date = new Date();
  // Store show loading
  showLoading: boolean = false;
  // Store the Bug Fix Id
  bugFixId: string = "";
  // Store managing type
  editingType: string = 'EDIT';
  // Constructor
  constructor(private commonService: CommonService, private bugFixesService: BugFixesService,
    private route: Router, private location: Location
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
    debugger
    // Getting the passed params
    let paramObject = this.location.getState();
    if (paramObject['BugFixesID']) {
      this.bugFixId = paramObject['BugFixesID'];
      // Initialize default data
      this.initDefaultData();
    } else {
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
        RequestedStaffList: []
      };
      // Initialize default data
      this.initDefaultData();
    };
    // End of Getting the passed params

    // Set editing type
    if (paramObject['Type']) {
      this.editingType = paramObject['Type'];
    }
  }

  // Getting the Bug Fix details by Id
  getEnhancementDetailsById() {
    // Start loading
    this.showLoading = true;

    let paramObject = this.location.getState();
    // Initialize the object
    this.bugFix = {
      Id: paramObject['BugFixesID'],
      AddedUserId: this.overallCookieInterface.GetUserId(),
      Title: paramObject['BugFixesTitle'],
      Description: '',
      StartDate: new Date(),
      EndDate: new Date(),
      ModuleId: 0,
      PriorityId: 0,
      StatusId: 0,
      EstimatedHours: 0,
      AssignedStaffList: [],
      RequestedStaffList: []
    };
    // Getting the Bug Fix details by ID
    this.bugFixModel.GetBugFixesDetailsByIdService(paramObject['BugFixesID']).then(
      (data) => {
        // Getting the Bug Fix details
        this.bugFix = <BugFix>data;
        // Setting the start date
        this.startDate = new Date(this.bugFix.StartDate);
        // Setting the end date
        this.endDate = new Date(this.bugFix.EndDate);
        // Stop loading
        this.showLoading = false;
      }
    );
    // End of Getting the Bug Fix details by ID
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
    this.commonModel.GetAllStaffListService().then(
      (data) => {
        // Getting the staff list
        let staffListLocal: BasicUserDetails[] = <BasicUserDetails[]>data;
        // Setting the option
        this.viewManagedStaffDropdownList = staffListLocal;
        this.viewRequestedStaffDropdownList = staffListLocal;
      }
    );
    // End of Calling the model to retrieve the data
  }

  // Getting all the priority list
  getAllPriorityList() {
    // Clear the list
    this.viewPriorityDropdownList = [];
    // Calling the model to retrieve the data
    this.commonModel.GetPriorityListService().then(
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
        if (this.bugFixId && this.bugFixId != '') {
          // Getting the Bug Fix details by Id
          this.getEnhancementDetailsById();
        } else {
          this.bugFix.PriorityId = this.viewPriorityDropdownList[0].value;
        }
      }
    );
    // End of Calling the model to retrieve the data
  }

  // Getting all the status list
  getAllStatusList() {
    // Clear the list
    this.viewStatusDropdownList = [];
    // Calling the model to retrieve the data
    this.commonModel.GetStatusListService("BG").then(
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
        if (this.bugFix && this.bugFix.Id != '') {
          this.bugFix.StatusId = this.viewStatusDropdownList[0].value;
        } else {
          this.bugFix.StatusId = this.viewStatusDropdownList[0].value;
        }
      }
    );
    // End of Calling the model to retrieve the data
  }

  // Getting all the module list
  getAllModulesList() {
    // Clear the list
    this.viewModulesDropdownList = [];
    // Calling the model to retrieve the data
    this.commonModel.GetModuleListService().then(
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

        // Setting the default selection
        if (this.bugFix && this.bugFix.Id != '') {
          this.bugFix.ModuleId = this.viewModulesDropdownList[0].value;
        } else {
          this.bugFix.ModuleId = this.viewModulesDropdownList[0].value;
        }
      }
    );
    // End of Calling the model to retrieve the data
  }

  // On click event of assigned staff
  assignedStaffOnClick(elm) {
    this.bugFix.AssignedStaffList = elm.value;
  }

  // On click event of requested staff
  requestedStaffOnClick(elm) {
    //this.bugFix.RequestedStaffList = elm.value;
  }

  // On click function of close button
  closeOnClickFunction() {
    // Route to the list
    this.route.navigate(['/layout/global/globalNotes/bugFixes']);
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

    // Setting the start and end date
    this.bugFix.StartDate = new Date(this.startDate.setDate(this.startDate.getDate() + 1));
    this.bugFix.EndDate = new Date(this.endDate.setDate(this.endDate.getDate() + 1));

    // Check if the bug fix ID exists
    if (this.bugFix.Id && this.bugFix.Id != '') {
      // Calling the modal to save the data
      this.bugFixModel.SetBugFixesDetailsService(this.bugFix, "UPDATE").then(
        () => {
          // Route to the list
          this.route.navigate(['/layout/global/globalNotes/bugFixes']);
        }
      );
      // End of Calling the modal to save the data
    } else {
      // Calling the modal to save the data
      this.bugFixModel.SetBugFixesDetailsService(this.bugFix, "NEW").then(
        () => {
          // Route to the list
          this.route.navigate(['/layout/global/globalNotes/bugFixes']);
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

    // Check if the estimated hours exists
    if (!(this.bugFix.EstimatedHours && this.bugFix.EstimatedHours != 0)) {
      // Pushing the error message
      this.errorMessagesList.push(
        {
          ErrorCode: 'EMPTY$EST$HOURS',
          ErrorMessage: 'Estimated hours is mandatory'
        }
      );
    }
    // End of Check if the estimated hours exists

    // Check if the assigned staff list is not empty
    if (!(this.bugFix.AssignedStaffList && this.bugFix.AssignedStaffList.length != 0)) {
      // Pushing the error message
      this.errorMessagesList.push(
        {
          ErrorCode: 'EMPTY$ASS$STAFF',
          ErrorMessage: 'Assigned staff is mandatory'
        }
      );
    }
    // End of Check if the assigned staff list is not empty

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

  // On change event of the title input
  onPasteTitleFunction(event) {
    // Getting the current text
    let currentText = event.target.value;
    // Cutting the extra characters from the word
    this.bugFix.Title = currentText.substr(0, this.titleLimit);
  }

  // Convert the date
  convertDate(currentDate) {
    return { date: new Date(currentDate) };
  }

  // On change event of the estimate value
  inputEstimateValue() {
    // Check if the value is numeric
    if ((!this.bugFix.EstimatedHours) || isNaN(+this.bugFix.EstimatedHours)) {
      this.bugFix.EstimatedHours = 0;
    }
    // End of Check if the value is numeric

    // Check if the value is less than 0
    if (this.bugFix.EstimatedHours < 0) {
      this.bugFix.EstimatedHours = 0;
    }
    // End of Check if the value is less than 0
  }
}
