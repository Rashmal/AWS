import { Component } from '@angular/core';
import { OverallCookieInterface } from 'src/app/modules/common/core/overallCookieInterface';
import { OverallCookieModel } from 'src/app/modules/common/core/overallCookieModel';
import { CommonModel } from 'src/app/modules/common/models/commonModel';
import { CommonService } from 'src/app/modules/common/services/common.service';
import { Location } from '@angular/common';
import { StaffModel } from '../../../models/staffModel';
import { StaffService } from '../../../services/staff.service';
import { IErrorMessage } from 'src/app/modules/common/core/iErrorMessage';

@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrl: './authentication.component.scss',
})
export class AuthenticationComponent {
    // Store the modification mode
    modificationMode = 'NEW';
    // Store the selected client Id
    selectedStaffId = "";
    // Store the cookie interface
    overallCookieInterface: OverallCookieInterface;
    // Store the common model
    commonModel: CommonModel;
    //Store staff model
    staffModel !: StaffModel;
    //store selected staff
    staffDetails: any;
    // Store the current password
    currentPassword: string = "";
    // Store user prompt current password
    userPromptCurrentPassword: string = "";
    // Store user prompt new password
    userPromptNewPassword: string = "";
    // Store user prompt new re password
    userPromptNewRePassword: string = "";
    // Store the error messages
    errorMessagesList: IErrorMessage[] = [];

    // Store the products list
    constructor(
        private location: Location, private staffService: StaffService,
        private commonService: CommonService
    ) {
        // Initialize the model
        this.commonModel = new CommonModel(this.commonService);
        this.overallCookieInterface = new OverallCookieModel();
        this.staffModel = new StaffModel(this.staffService);
    }
    ngOnInit(): void {
        // Getting the passed params
        let paramObject = this.location.getState();
        //Set editing mode
        if (paramObject['EditingMode']) {
            this.modificationMode = paramObject['EditingMode'];
        }
        //Set editing staff id
        if (paramObject['StaffId']) {
            this.selectedStaffId = paramObject['StaffId'];
            // Getting the current user password
            this.GetUserCurrentPass();
        }
    }

    //On bluer event of input
    onBlurEvent(type: string) { }

    // Getting the current user password
    GetUserCurrentPass() {
        // Calling the object model to access the service
        this.staffModel.GetStaffPassword(this.selectedStaffId, this.overallCookieInterface.GetCompanyId()).then(
            (data) => {
                // Getting the list of social media list
                this.currentPassword = <string>data;
            }
        );
        // End of Calling the object model to access the service
    }

    // On click event of change password
    onClickChangePassword() {
        // Validate fields
        this.validateFields();

        // Check if the error messages length
        if (this.errorMessagesList.length > 0) {
            return;
        }
        // End of Check if the error messages length

        // Update the password
        this.staffModel.UpdateStaffPassword(this.userPromptNewPassword, this.selectedStaffId, this.overallCookieInterface.GetCompanyId()).then(
            (data) => {
                // Getting the list of social media list
                this.userPromptCurrentPassword = "";
                this.userPromptNewPassword = "";
                this.userPromptNewRePassword = "";
            }
        );
        // End of Update the password
    }

    // Validate fields
    validateFields() {
        // Clear the error message list
        this.errorMessagesList = [];

        // Check if current password is not empty
        if (!(this.userPromptCurrentPassword && this.userPromptCurrentPassword != "")) {
            // Pushing the error message
            this.errorMessagesList.push(
                {
                    ErrorCode: 'CP$EMPTY',
                    ErrorMessage: 'Current password is empty'
                }
            );
            return;
        }
        // End of Check if current password is not empty

        // Check if current password is correct
        if (!(this.userPromptCurrentPassword && this.userPromptCurrentPassword != "" && this.userPromptCurrentPassword == this.currentPassword)) {
            // Pushing the error message
            this.errorMessagesList.push(
                {
                    ErrorCode: 'CP_NOT$MATCH',
                    ErrorMessage: 'Current password is not matching'
                }
            );
            return;
        }
        // End of Check if current password is correct

        // Check if the new password is not empty
        if (!(this.userPromptNewPassword && this.userPromptNewPassword != "")) {
            // Pushing the error message
            this.errorMessagesList.push(
                {
                    ErrorCode: 'NP$EMPTY',
                    ErrorMessage: 'New password is empty'
                }
            );
            return;
        }
        // End of Check if the new password is not empty

        // Check if the new re password is not empty
        if (!(this.userPromptNewRePassword && this.userPromptNewRePassword != "")) {
            // Pushing the error message
            this.errorMessagesList.push(
                {
                    ErrorCode: 'RNP$EMPTY',
                    ErrorMessage: 'Reenter new password is empty'
                }
            );
            return;
        }
        // End of Check if the new re password is not empty

        // Check if the new re password and new password matches
        if (!(this.userPromptNewRePassword && this.userPromptNewPassword && this.userPromptNewRePassword == this.userPromptNewPassword)) {
            // Pushing the error message
            this.errorMessagesList.push(
                {
                    ErrorCode: 'NP_NOT$MATCH',
                    ErrorMessage: 'New password does not match'
                }
            );
            return;
        }
        // End of Check if the new re password and new password matches

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


}
