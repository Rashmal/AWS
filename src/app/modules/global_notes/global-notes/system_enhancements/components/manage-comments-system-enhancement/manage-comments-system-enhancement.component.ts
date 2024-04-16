import { Component, OnDestroy, OnInit } from '@angular/core';
import { SystemEnhancementComment } from '../../core/systemEnhancementModels/systemEnhancementComment';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Filter } from 'src/app/modules/common/core/filters';
import { ViewSystemEnhancementComment } from '../../core/systemEnhancementModels/viewSystemEnhancementComment';
import { OverallCookieInterface } from 'src/app/modules/common/core/overallCookieInterface';
import { SystemEnhancementModel } from '../../models/systemEnhancementModel';
import { SystemEnhancementsService } from '../../services/system-enhancements.service';
import { OverallCookieModel } from 'src/app/modules/common/core/overallCookieModel';
import { IErrorMessage } from 'src/app/modules/common/core/iErrorMessage';

@Component({
  selector: 'app-manage-comments-system-enhancement',
  standalone: false,
  templateUrl: './manage-comments-system-enhancement.component.html',
  styleUrl: './manage-comments-system-enhancement.component.scss'
})
export class ManageCommentsSystemEnhancementComponent implements OnInit, OnDestroy {
  // Store the comments object
  systemEnhancementComment: SystemEnhancementComment;
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
    StatusId: -1
  };
  // Store the comments list
  viewSystemEnhancementComment: ViewSystemEnhancementComment[] = [];
  // Store the cookie interface
  overallCookieInterface: OverallCookieInterface;
  // Store the System Enhancement model
  systemEnhancementModel: SystemEnhancementModel;
  // Store the system enhancement ID
  systemEnhancementId: string = "";
  // Store the system enhancement title
  systemEnhancementTitle: string = "";
  // Store total records
  totalRecords: number = 0;
  // Store the error messages
  errorMessagesList: IErrorMessage[] = [];
  // Store loading
  showLoading: boolean = false;

  // Constructor
  constructor(private route: Router, private location: Location,
    private systemEnhancementsService: SystemEnhancementsService) {
    this.systemEnhancementModel = new SystemEnhancementModel(this.systemEnhancementsService);
    this.overallCookieInterface = new OverallCookieModel();
  }

  ngOnDestroy() {
    // Unsubscribe all
    this.systemEnhancementModel.UnsubscribeAll();
  }

  // On click function of back to list
  backToListOnClickFunction() {
    // Route to the list
    this.route.navigate(['/layout/global/globalNotes/systemEnhancements']);
  }

  ngOnInit(): void {
    // Getting the passed params
    let paramObject = this.location.getState();
    // Getting the system enhancement Id
    this.systemEnhancementId = paramObject['SystemEnhancementID'];
    // Getting the system enhancement title
    this.systemEnhancementTitle = paramObject['SystemEnhancementTitle'];
    // Initialize the object
    this.systemEnhancementComment = {
      Id: 0,
      Description: '',
      ParentId: 0,
      SystemEnhancementId: this.systemEnhancementId,
      UserId: this.overallCookieInterface.GetUserId()
    };
    // Setting the Id
    this.filter.Id = this.systemEnhancementId;
    // Getting all the comments list
    this.getAllCommentsList();
  }

  // Getting all the comments list
  getAllCommentsList() {
    // Start loading
    this.showLoading = true;
    // Calling the model to retrieve all the comments list
    this.systemEnhancementModel.GetSystemEhancementCommentService(this.filter).then(
      (data) => {
        // Getting all the comments
        this.viewSystemEnhancementComment = <ViewSystemEnhancementComment[]>data;
        // Setting the total
        this.totalRecords = (this.viewSystemEnhancementComment.length > 0) ? this.viewSystemEnhancementComment[0].Total : 0;
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
    if (!(this.systemEnhancementComment.Description && this.systemEnhancementComment.Description.trim() && this.systemEnhancementComment.Description.trim() != '')) {
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
    this.systemEnhancementModel.SetSystemEhancementCommentService(this.systemEnhancementComment, "NEW").then(
      () => {
        // Clear the object
        this.systemEnhancementComment = {
          Id: 0,
          Description: '',
          ParentId: 0,
          SystemEnhancementId: this.systemEnhancementId,
          UserId: this.overallCookieInterface.GetUserId()
        };
        // Getting all the comments list
        this.getAllCommentsList();
      }
    );
    // End of Calling the modal to save the data
  }
}
