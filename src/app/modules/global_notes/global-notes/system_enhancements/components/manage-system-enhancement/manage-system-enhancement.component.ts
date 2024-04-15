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

  // Constructor
  constructor(private commonService: CommonService, private systemEnhancementsService: SystemEnhancementsService,
    private route: Router
  ) {
    // Initialize the model
    this.commonModel = new CommonModel(this.commonService);
    this.systemEnhancementModel = new SystemEnhancementModel(this.systemEnhancementsService);
  }

  ngOnDestroy() {
    // Unsubscribe all
    this.commonModel.UnsubscribeAll();
  }

  ngOnInit(): void {
    // Initialize the object
    this.systemEnhancement = {
      Id: '',
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
      RequestedStaffList: []
    };
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
        this.systemEnhancement.PriorityId = this.viewPriorityDropdownList[0].value;
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
    this.systemEnhancement.RequestedStaffList = elm.value;
  }
}
