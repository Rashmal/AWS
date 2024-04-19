import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { CommonModel } from 'src/app/modules/common/models/commonModel';
import { CommonService } from 'src/app/modules/common/services/common.service';
import { SystemEnhancementModel } from '../../models/systemEnhancementModel';
import { SystemEnhancementsService } from '../../services/system-enhancements.service';
import { Priority } from 'src/app/modules/common/core/priority';
import { SystemEnhancement } from '../../core/systemEnhancementModels/systemEnhancement';
import { Status } from 'src/app/modules/common/core/status';
import { BasicUserDetails } from 'src/app/modules/authentication/core/authenticationModals/basicUserDetails';
import { IErrorMessage } from 'src/app/modules/common/core/iErrorMessage';
import { SYSTEM_ENHANCEMENT$TITLE$LIMIT } from 'src/app/core/apiConfigurations';
import { OverallCookieInterface } from 'src/app/modules/common/core/overallCookieInterface';
import { OverallCookieModel } from 'src/app/modules/common/core/overallCookieModel';
import { Location } from '@angular/common';

@Component({
  selector: 'app-manage-system-enhancement',
  standalone: false,
  templateUrl: './manage-system-enhancement.component.html',
  styleUrl: './manage-system-enhancement.component.scss'
})
export class ManageSystemEnhancementComponent implements OnInit, OnDestroy {
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
  // Store the System Enhancement model
  systemEnhancementModel: SystemEnhancementModel;
  // Store the system enhancement object
  systemEnhancement: SystemEnhancement;
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
  // Store the system enhancement Id
  systemEnhancementId: string = "";
// Store managing type
  editingType: string = 'EDIT';
  // Constructor
  constructor(private commonService: CommonService, private systemEnhancementsService: SystemEnhancementsService,
    private route: Router, private location: Location
  ) {
    // Initialize the model
    this.commonModel = new CommonModel(this.commonService);
    this.systemEnhancementModel = new SystemEnhancementModel(this.systemEnhancementsService);
    this.overallCookieInterface = new OverallCookieModel();
  }

  ngOnDestroy() {
    // Unsubscribe all
    this.commonModel.UnsubscribeAll();
    this.systemEnhancementModel.UnsubscribeAll();
  }

  ngOnInit(): void {
    debugger
    // Getting the passed params
    let paramObject = this.location.getState();
    if (paramObject['SystemEnhancementID']) {
      this.systemEnhancementId = paramObject['SystemEnhancementID'];
      // Initialize default data
      this.initDefaultData();
    } else {
      // Initialize the object
      this.systemEnhancement = {
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
    if(paramObject['Type']){
      this.editingType = paramObject['Type'];
    } 
  }

  // Getting the system enhancement details by Id
  getEnhancementDetailsById() {
    // Start loading
    this.showLoading = true;

    let paramObject = this.location.getState();
    // Initialize the object
    this.systemEnhancement = {
      Id: paramObject['SystemEnhancementID'],
      AddedUserId: this.overallCookieInterface.GetUserId(),
      Title: paramObject['SystemEnhancementTitle'],
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
    // Getting the system enhancement details by ID
    this.systemEnhancementModel.GetSystemEnhancementDetailsByIdService(paramObject['SystemEnhancementID']).then(
      (data) => {
        // Getting the system enhancement details
        this.systemEnhancement = <SystemEnhancement>data;
        // Setting the start date
        this.startDate = new Date(this.systemEnhancement.StartDate);
        // Setting the end date
        this.endDate = new Date(this.systemEnhancement.EndDate);
        // Stop loading
        this.showLoading = false;
      }
    );
    // End of Getting the system enhancement details by ID
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
        if (this.systemEnhancementId && this.systemEnhancementId != '') {
        // Getting the system enhancement details by Id
        this.getEnhancementDetailsById();
        } else {
          this.systemEnhancement.PriorityId = this.viewPriorityDropdownList[0].value;
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
    this.commonModel.GetStatusListService("SE").then(
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
        if (this.systemEnhancement && this.systemEnhancement.Id != '')
          this.systemEnhancement.StatusId = this.viewStatusDropdownList[0].value;
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
        if (this.systemEnhancement && this.systemEnhancement.Id != '')
          this.systemEnhancement.ModuleId = this.viewModulesDropdownList[0].value;
      }
    );
    // End of Calling the model to retrieve the data
  }

  // On click event of assigned staff
  assignedStaffOnClick(elm) {
    this.systemEnhancement.AssignedStaffList = elm.value;
  }

  // On click event of requested staff
  requestedStaffOnClick(elm) {
    debugger
    //this.systemEnhancement.RequestedStaffList = elm.value;
  }

  // On click function of close button
  closeOnClickFunction() {
    // Route to the list
    this.route.navigate(['/layout/global/globalNotes/systemEnhancements']);
  }

  // On click function of save button
  saveOnClickFunction() {
    debugger
    // Validate the fields in the login page
    this.fieldValidation();
    // End of Validate the fields in the login page

    // Check if the error messages length
    if (this.errorMessagesList.length > 0) {
      return;
    }
    // End of Check if the error messages length

    // Setting the start and end date
    this.systemEnhancement.StartDate = new Date(this.startDate.setDate(this.startDate.getDate() + 1));
    this.systemEnhancement.EndDate = new Date(this.endDate.setDate(this.endDate.getDate() + 1));

    // Check if the system ID exists
    if (this.systemEnhancement.Id && this.systemEnhancement.Id != '') {
      // Calling the modal to save the data
      this.systemEnhancementModel.SetSystemEnhancementDetailsService(this.systemEnhancement, "UPDATE").then(
        () => {
          // Route to the list
          this.route.navigate(['/layout/global/globalNotes/systemEnhancements']);
        }
      );
      // End of Calling the modal to save the data
    } else {
      // Calling the modal to save the data
      this.systemEnhancementModel.SetSystemEnhancementDetailsService(this.systemEnhancement, "NEW").then(
        () => {
          // Route to the list
          this.route.navigate(['/layout/global/globalNotes/systemEnhancements']);
        }
      );
      // End of Calling the modal to save the data
    }
    // End of Check if the system ID exists
  }

  // Validation of the fields
  fieldValidation() {
    // Clear the error message list
    this.errorMessagesList = [];

    // Check if the title exists
    if (!(this.systemEnhancement.Title && this.systemEnhancement.Title.trim() && this.systemEnhancement.Title.trim() != '')) {
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
    if (!(this.systemEnhancement.Description && this.systemEnhancement.Description.trim() && this.systemEnhancement.Description.trim() != '')) {
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
    if (!(this.systemEnhancement.EstimatedHours && this.systemEnhancement.EstimatedHours != 0)) {
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
    if (!(this.systemEnhancement.AssignedStaffList && this.systemEnhancement.AssignedStaffList.length != 0)) {
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
    if (!(this.systemEnhancement.RequestedStaffList && this.systemEnhancement.RequestedStaffList.length != 0)) {
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
    this.systemEnhancement.Title = currentText.substr(0, this.titleLimit);
  }

  // Convert the date
  convertDate(currentDate) {
    return { date: new Date(currentDate) };
  }
}
