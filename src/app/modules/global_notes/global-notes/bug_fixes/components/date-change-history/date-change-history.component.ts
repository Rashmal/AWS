import { Component, OnDestroy, OnInit } from '@angular/core';
import { BugFixChangeDate } from '../../core/bugFixesModels/bugFixChangeDate';
import { Filter } from 'src/app/modules/common/core/filters';
import { ViewBugFixChangeDate } from '../../core/bugFixesModels/viewBugFixChangeDate';
import { BugFixModel } from '../../models/bugFixModel';
import { IErrorMessage } from 'src/app/modules/common/core/iErrorMessage';
import { OverallCookieInterface } from 'src/app/modules/common/core/overallCookieInterface';
import { Router } from '@angular/router';
import { BugFixesService } from '../../services/bug-fixes.service';
import { OverallCookieModel } from 'src/app/modules/common/core/overallCookieModel';
import { Location } from '@angular/common';
import { BugFix } from '../../core/bugFixesModels/bugFix';

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
  bugFixChangeDate: BugFixChangeDate;
  // Store the bug fixes ID
  bugFixesId: string = "";
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
  viewBugFixChangeDate: ViewBugFixChangeDate[] = [];
  // Store the bug fixes model
  bugFixModel: BugFixModel;
  // Store total records
  totalRecords: number = 0;
  // Store the error messages
  errorMessagesList: IErrorMessage[] = [];
  // Store the cookie interface
  overallCookieInterface: OverallCookieInterface;
  // Store loading
  showLoading: boolean = false;
  // Store the bugFixDetails details
  bugFixDetails: BugFix;

  // Constructor
  constructor(private route: Router, private location: Location,
    private bugFixesService: BugFixesService
  ) {
    // Initialize the object
    this.bugFixChangeDate = {
      Id: 0,
      NewDuration: 0,
      NewFromDate: new Date(),
      NewToDate: new Date(),
      OldDuration: 0,
      OldFromDate: new Date(),
      OldToDate: new Date(),
      Reason: '',
      BugFixesId: '',
      UserId: ''
    };
    this.bugFixModel = new BugFixModel(this.bugFixesService);
    this.overallCookieInterface = new OverallCookieModel();
  }

  ngOnDestroy() {
    // Unsubscribe all
    this.bugFixModel.UnsubscribeAll();
  }

  ngOnInit(): void {
    // Getting the passed params
    let paramObject = this.location.getState();
    // Getting the bug fixes Id
    this.bugFixesId = paramObject['BugFixesID'];
    // Getting the bug fixes details
    this.initBugFixesDetails();
  }

  // Getting the bug fixes details
  initBugFixesDetails() {
    // Start loading
    this.showLoading = true;
    // Getting the bug fixes old details
    this.bugFixModel.GetBugFixesDetailsByIdService(this.bugFixesId, this.overallCookieInterface.GetUserId()).then(
      (data) => {
        // Getting the bug fixes details
        let bugFix = <BugFix>data;
        this.bugFixDetails = bugFix;
        // Setting the old data
        this.bugFixChangeDate.OldDuration = bugFix.EstimatedHours;
        this.bugFixChangeDate.OldFromDate = bugFix.StartDate;
        this.bugFixChangeDate.OldToDate = bugFix.EndDate;
        this.bugFixChangeDate.BugFixesId = this.bugFixesId;
        this.bugFixChangeDate.UserId = this.overallCookieInterface.GetUserId();
        // Getting the change date history list
        this.getChangeDateHistoryList();
      }
    );
    // End of Getting the bug fixes old details
  }

  // Getting the change date history list
  getChangeDateHistoryList() {
    // Start loading
    this.showLoading = true;
    // Calling the model to retrieve the data list
    this.bugFixModel.GetBugFixesChangeDateService(this.filter, this.bugFixesId).then(
      (data) => {
        // Getting the change date history list
        this.viewBugFixChangeDate = <ViewBugFixChangeDate[]>data;
        // Setting the total records
        this.totalRecords = (this.viewBugFixChangeDate.length > 0) ? this.viewBugFixChangeDate[0].Total : 0;
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
    if (!(this.bugFixChangeDate.Reason && this.bugFixChangeDate.Reason.trim() && this.bugFixChangeDate.Reason.trim() != '')) {
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
    if (!(this.bugFixChangeDate.NewDuration && this.bugFixChangeDate.NewDuration != 0)) {
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
    this.bugFixChangeDate.NewFromDate = new Date(this.fromDate.setDate(this.fromDate.getDate() + 1));
    this.bugFixChangeDate.NewToDate = new Date(this.toDate.setDate(this.toDate.getDate() + 1));

    // Calling the modal to save the data
    this.bugFixModel.SetBugFixesChangeDateService(this.bugFixChangeDate, "NEW").then(
      () => {
        // Clear the object
        this.bugFixChangeDate = {
          Id: 0,
          NewDuration: 0,
          NewFromDate: new Date(),
          NewToDate: new Date(),
          OldDuration: 0,
          OldFromDate: new Date(),
          OldToDate: new Date(),
          Reason: '',
          BugFixesId: '',
          UserId: ''
        };
        // Getting the bug fixes details
        this.initBugFixesDetails();
      }
    );
    // End of Calling the modal to save the data
  }

  // On click function of close button
  closeOnClickFunction() {
    // Route to the list
    this.route.navigate(['/layout/global/globalNotes/bugFixes']);
  }

  // Approve on click function
  approveOnClick(changeHistoryId: number) {
    // Calling the model to update
    this.bugFixModel.ApprovalChangeDate(changeHistoryId, "APPROVE").then(
      () => {
        // Getting the change date history list
        this.getChangeDateHistoryList();
      }
    );
    // End of Calling the model to update
  }

  // Approve on click function
  declineOnClick(changeHistoryId: number) {
    // Calling the model to update
    this.bugFixModel.ApprovalChangeDate(changeHistoryId, "DECLINE").then(
      () => {
        // Getting the change date history list
        this.getChangeDateHistoryList();
      }
    );
    // End of Calling the model to update
  }

  // Check the length of the duration
  checkLengthDuration(e) {
    const keyValue = +e.key;
    const numberOnlyPattern = '[0-9]+';
    const newValue = this.bugFixChangeDate.NewDuration + (isNaN(keyValue) ? '' : keyValue.toString());
    const match = newValue.match(numberOnlyPattern);

    if (+newValue > 999999 || !match || newValue === '') {
      e.preventDefault();
    }
  }
}

