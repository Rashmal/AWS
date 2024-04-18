import { Component, OnDestroy, OnInit } from '@angular/core';
import { SystemEnhancementChangeDate } from '../../core/systemEnhancementModels/systemEnhancementChangeDate';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Filter } from 'src/app/modules/common/core/filters';
import { ViewSystemEnhancementChangeDate } from '../../core/systemEnhancementModels/viewSystemEnhancementChangeDate';
import { SystemEnhancementModel } from '../../models/systemEnhancementModel';
import { SystemEnhancementsService } from '../../services/system-enhancements.service';
import { IErrorMessage } from 'src/app/modules/common/core/iErrorMessage';
import { SystemEnhancement } from '../../core/systemEnhancementModels/systemEnhancement';
import { OverallCookieInterface } from 'src/app/modules/common/core/overallCookieInterface';
import { OverallCookieModel } from 'src/app/modules/common/core/overallCookieModel';

@Component({
  selector: 'app-date-change-history',
  standalone: false,
  templateUrl: './date-change-history.component.html',
  styleUrl: './date-change-history.component.scss'
})
export class DateChangeHistoryComponent implements OnInit, OnDestroy {
  // Store the from date
  fromDate: Date = new Date();
  // Store the to date
  toDate: Date = new Date();
  // Store the change date history object
  systemEnhancementChangeDate: SystemEnhancementChangeDate;
  // Store the system enhancement ID
  systemEnhancementId: string = "";
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
  // Store the change date history list
  viewSystemEnhancementChangeDate: ViewSystemEnhancementChangeDate[] = [];
  // Store the System Enhancement model
  systemEnhancementModel: SystemEnhancementModel;
  // Store total records
  totalRecords: number = 0;
  // Store the error messages
  errorMessagesList: IErrorMessage[] = [];
  // Store the cookie interface
  overallCookieInterface: OverallCookieInterface;
  // Store loading
  showLoading: boolean = false;

  // Constructor
  constructor(private route: Router, private location: Location,
    private systemEnhancementsService: SystemEnhancementsService
  ) {
    // Initialize the object
    this.systemEnhancementChangeDate = {
      Id: 0,
      NewDuration: 0,
      NewFromDate: new Date(),
      NewToDate: new Date(),
      OldDuration: 0,
      OldFromDate: new Date(),
      OldToDate: new Date(),
      Reason: '',
      SystemEnhancementId: '',
      UserId: ''
    };
    this.systemEnhancementModel = new SystemEnhancementModel(this.systemEnhancementsService);
    this.overallCookieInterface = new OverallCookieModel();
  }

  ngOnDestroy() {
    // Unsubscribe all
    this.systemEnhancementModel.UnsubscribeAll();
  }

  ngOnInit(): void {
    // Getting the passed params
    let paramObject = this.location.getState();
    // Getting the system enhancement Id
    this.systemEnhancementId = paramObject['SystemEnhancementID'];
    // Getting the system enhancement details
    this.initSystemEnhancementDetails();
  }

  // Getting the system enhancement details
  initSystemEnhancementDetails() {
    // Start loading
    this.showLoading = true;
    // Getting the system enhancement old details
    this.systemEnhancementModel.GetSystemEnhancementDetailsByIdService(this.systemEnhancementId).then(
      (data) => {
        // Getting the system enhancement details
        let systemEnhancement = <SystemEnhancement>data;
        // Setting the old data
        this.systemEnhancementChangeDate.OldDuration = systemEnhancement.EstimatedHours;
        this.systemEnhancementChangeDate.OldFromDate = systemEnhancement.StartDate;
        this.systemEnhancementChangeDate.OldToDate = systemEnhancement.EndDate;
        this.systemEnhancementChangeDate.SystemEnhancementId = this.systemEnhancementId;
        this.systemEnhancementChangeDate.UserId = this.overallCookieInterface.GetUserId();
        // Getting the change date history list
        this.getChangeDateHistoryList();
      }
    );
    // End of Getting the system enhancement old details
  }

  // Getting the change date history list
  getChangeDateHistoryList() {
    // Start loading
    this.showLoading = true;
    // Calling the model to retrieve the data list
    this.systemEnhancementModel.GetSystemEhancementChangeDateService(this.filter, this.systemEnhancementId).then(
      (data) => {
        // Getting the change date history list
        this.viewSystemEnhancementChangeDate = <ViewSystemEnhancementChangeDate[]>data;
        // Setting the total records
        this.totalRecords = (this.viewSystemEnhancementChangeDate.length > 0) ? this.viewSystemEnhancementChangeDate[0].Total : 0;
        // Stop loading
        this.showLoading = false;
      }
    );
    // End of Calling the model to retrieve the data list
  }

  // On change event of the pagination
  onPageChangeDateHistory(event) {
    // Setting the filter
    this.filter.CurrentPage = event.page + 1;
    // Getting the change date history list
    this.getChangeDateHistoryList();
  }

  // Validation of the fields
  fieldValidation() {
    // Clear the error message list
    this.errorMessagesList = [];

    // Check if the reason exists
    if (!(this.systemEnhancementChangeDate.Reason && this.systemEnhancementChangeDate.Reason.trim() && this.systemEnhancementChangeDate.Reason.trim() != '')) {
      // Pushing the error message
      this.errorMessagesList.push(
        {
          ErrorCode: 'EMPTY$REASON',
          ErrorMessage: 'Reason is mandatory'
        }
      );
    }
    // End of Check if the reason exists

    // Check if the estimated hours exists
    if (!(this.systemEnhancementChangeDate.NewDuration && this.systemEnhancementChangeDate.NewDuration != 0)) {
      // Pushing the error message
      this.errorMessagesList.push(
        {
          ErrorCode: 'EMPTY$DURATION',
          ErrorMessage: 'Duration is mandatory'
        }
      );
    }
    // End of Check if the estimated hours exists

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

    // Setting the date
    this.systemEnhancementChangeDate.NewFromDate = new Date(this.fromDate.setDate(this.fromDate.getDate() + 1));
    this.systemEnhancementChangeDate.NewToDate = new Date(this.toDate.setDate(this.toDate.getDate() + 1));

    // Calling the modal to save the data
    this.systemEnhancementModel.SetSystemEhancementChangeDateService(this.systemEnhancementChangeDate, "NEW").then(
      () => {
        // Clear the object
        this.systemEnhancementChangeDate = {
          Id: 0,
          NewDuration: 0,
          NewFromDate: new Date(),
          NewToDate: new Date(),
          OldDuration: 0,
          OldFromDate: new Date(),
          OldToDate: new Date(),
          Reason: '',
          SystemEnhancementId: '',
          UserId: ''
        };
        // Getting the system enhancement details
        this.initSystemEnhancementDetails();
      }
    );
    // End of Calling the modal to save the data
  }

  // On click function of close button
  closeOnClickFunction() {
    // Route to the list
    this.route.navigate(['/layout/global/globalNotes/systemEnhancements']);
  }
}
