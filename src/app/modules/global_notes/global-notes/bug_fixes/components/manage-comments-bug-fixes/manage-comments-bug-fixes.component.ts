import { Component, OnDestroy, OnInit } from '@angular/core';
import { BugFixComment } from '../../core/bugFixesModels/bugFixComment';
import { Filter } from 'src/app/modules/common/core/filters';
import { ViewBugFixComment } from '../../core/bugFixesModels/viewBugFixComment';
import { OverallCookieInterface } from 'src/app/modules/common/core/overallCookieInterface';
import { BugFixModel } from '../../models/bugFixModel';
import { IErrorMessage } from 'src/app/modules/common/core/iErrorMessage';
import { Router } from '@angular/router';
import { BugFixesService } from '../../services/bug-fixes.service';
import { OverallCookieModel } from 'src/app/modules/common/core/overallCookieModel';
import { Location } from '@angular/common';

@Component({
  selector: 'app-manage-comments-bug-fixes',
  standalone: false,
  templateUrl: './manage-comments-bug-fixes.component.html',
  styleUrl: './manage-comments-bug-fixes.component.scss'
})
export class ManageCommentsBugFixesComponent implements OnInit, OnDestroy {
  // Store the comments object
  bugFixComment: BugFixComment;
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
  // Store the comments list
  viewBugFixComment: ViewBugFixComment[] = [];
  // Store the cookie interface
  overallCookieInterface: OverallCookieInterface;
  // Store the Bug Fixes model
  bugFixModel: BugFixModel;
  // Store the bug fixes ID
  bugFixId: string = "";
  // Store the bug fixes title
  bugFixesTitle: string = "";
  // Store total records
  totalRecords: number = 0;
  // Store the error messages
  errorMessagesList: IErrorMessage[] = [];
  // Store loading
  showLoading: boolean = false;

  // Constructor
  constructor(private route: Router, private location: Location,
    private bugFixesService: BugFixesService) {
    this.bugFixModel = new BugFixModel(this.bugFixesService);
    this.overallCookieInterface = new OverallCookieModel();
  }

  ngOnDestroy() {
    // Unsubscribe all
    this.bugFixModel.UnsubscribeAll();
  }

  // On click function of back to list
  backToListOnClickFunction() {
    // Route to the list
    this.route.navigate(['/layout/global/globalNotes/bugFixes']);
  }

  ngOnInit(): void {
    // Getting the passed params
    let paramObject = this.location.getState();
    // Getting the bug fixes Id
    this.bugFixId = paramObject['BugFixesID'];
    // Getting the bug fixes title
    this.bugFixesTitle = paramObject['BugFixesTitle'];
    // Initialize the object
    this.bugFixComment = {
      Id: 0,
      Description: '',
      ParentId: 0,
      BugFixesId: this.bugFixId,
      UserId: this.overallCookieInterface.GetUserId()
    };
    // Setting the Id
    this.filter.Id = this.bugFixId;
    // Getting all the comments list
    this.getAllCommentsList();
  }

  // Getting all the comments list
  getAllCommentsList() {
    // Start loading
    this.showLoading = true;
    // Calling the model to retrieve all the comments list
    this.bugFixModel.GetBugFixesCommentService(this.filter, this.overallCookieInterface.GetCompanyId()).then(
      (data) => {
        // Getting all the comments
        this.viewBugFixComment = <ViewBugFixComment[]>data;
        // Setting the total
        this.totalRecords = (this.viewBugFixComment.length > 0) ? this.viewBugFixComment[0].Total : 0;
        // Stop loading
        this.showLoading = false;
      }
    );
    // End of Calling the model to retrieve all the comments list
  }

  // On change event of the pagination
  onPageChangeComments(event) {
    // Setting the filter
    this.filter.CurrentPage = event.page + 1;
    // Getting all the comments list
    this.getAllCommentsList();
  }

  // Validation of the fields
  fieldValidation() {
    // Clear the error message list
    this.errorMessagesList = [];

    // Check if the comment exists
    if (!(this.bugFixComment.Description && this.bugFixComment.Description.trim() && this.bugFixComment.Description.trim() != '')) {
      // Pushing the error message
      this.errorMessagesList.push(
        {
          ErrorCode: 'EMPTY$DESCRIPTION',
          ErrorMessage: 'Comment is mandatory'
        }
      );
    }
    // End of Check if the comment exists

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

  // On click function of add reply
  addReplyOnClick() {
    // Validate the fields in the login page
    this.fieldValidation();
    // End of Validate the fields in the login page

    // Check if the error messages length
    if (this.errorMessagesList.length > 0) {
      return;
    }
    // End of Check if the error messages length

    // Calling the modal to save the data
    this.bugFixModel.SetBugFixesCommentService(this.bugFixComment, "NEW", this.overallCookieInterface.GetCompanyId()).then(
      () => {
        // Clear the object
        this.bugFixComment = {
          Id: 0,
          Description: '',
          ParentId: 0,
          BugFixesId: this.bugFixId,
          UserId: this.overallCookieInterface.GetUserId()
        };
        // Getting all the comments list
        this.getAllCommentsList();
      }
    );
    // End of Calling the modal to save the data
  }
}

