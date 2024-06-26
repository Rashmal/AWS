import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { SelectItem } from 'primeng/api';
import { Country } from 'src/app/modules/common/core/country';
import { CommonService } from 'src/app/modules/common/services/common.service';
import { OverallCookieInterface } from 'src/app/modules/common/core/overallCookieInterface';
import { OverallCookieModel } from 'src/app/modules/common/core/overallCookieModel';
import { CommonModel } from 'src/app/modules/common/models/commonModel';
import { StaffModel } from '../../../models/staffModel';
import { StaffService } from '../../../services/staff.service';
import { StaffDetails } from '../../../core/staffDetails';
import { UserRole } from 'src/app/modules/common/core/userRole';
import { CommonClientService } from 'src/app/modules/aws_client/services/common-client.service';
import { CommonStaffService } from '../../../services/common-staff.service';
import { IErrorMessage } from 'src/app/modules/common/core/iErrorMessage';
import { ClientModel } from 'src/app/modules/aws_client/models/clientModel';
import { ClientService } from 'src/app/modules/aws_client/services/client.service';

@Component({
    selector: 'app-general-info',
    templateUrl: './general-info.component.html',
    styleUrl: './general-info.component.scss',
})
export class GeneralInfoComponent implements OnInit {
    // Store the modification mode
    modificationMode = 'NEW';
    // Store the selected client Id
    selectedStaffId: string = "";
    // Store the display country list
    displayCountryList: SelectItem[] = [{ value: 'ADM', label: 'Administrator' }, { value: 'MAN', label: 'Manager' }, { value: 'GEN', label: 'General' }];
    selectedRoles: SelectItem[] = [];
    // Store the cookie interface
    overallCookieInterface: OverallCookieInterface;
    // Store the common model
    commonModel: CommonModel;
    //Store staff model
    staffModel !: StaffModel;
    // Store the client model
    clientModel!: ClientModel;
    // Store the staff details
    staffDetails!: StaffDetails;
    // Store all the user roles list
    userRolesList: UserRole[] = [];
    // Store all the user roles list
    displayUserRolesList: SelectItem[] = [];
    // Store the error messages
    errorMessagesList: IErrorMessage[] = [];

    // Store the products list
    constructor(private location: Location, private commonService: CommonService,
        private staffService: StaffService, private commonStaffService: CommonStaffService,
        private clientService: ClientService
    ) {
        // Initialize the model
        this.commonModel = new CommonModel(this.commonService);
        this.clientModel = new ClientModel(this.clientService);
        this.overallCookieInterface = new OverallCookieModel();
        this.staffModel = new StaffModel(this.staffService);
    }

    ngOnInit(): void {
        // Initializing the main object
        this.staffDetails = {
            AccountId: '',
            DateOfBirth: new Date(),
            Email: '',
            FirstName: '',
            Id: '',
            LastName: '',
            UserRoleList: [],
            BusinessAddress: {
                Id: 0,
                BuildingName: '',
                Country: {
                    Id: 0,
                    Code: '',
                    FlagIcon: '',
                    Name: ''
                },
                PostalCode: '',
                State: '',
                StreetName: '',
                Suburb: ''
            }
        };

        // Getting all the user roles
        this.GetAllUserRoles();
        // Initializing the country list
        this.InitCountryList();

        // Getting the passed params
        let paramObject = this.location.getState();
        //Set editing mode
        if (paramObject['EditingMode']) {
            this.modificationMode = paramObject['EditingMode'];
        }
        //Set editing staff id
        if (paramObject['StaffId']) {
            this.selectedStaffId = paramObject['StaffId'];
            // Getting the Staff details
            this.GetStaffDetailsById();
        }
    }

    // Getting all the user roles
    GetAllUserRoles() {
        // Calling the object model to access the service
        this.staffModel.GetAllUserRoles(this.overallCookieInterface.GetCompanyId()).then(
            (data) => {
                // Getting the list of social media list
                this.userRolesList = <UserRole[]>data;
                // Loop through the user role list
                for (let i = 0; i < this.userRolesList.length; i++) {
                    // Setting the display user role
                    this.displayUserRolesList.push(
                        {
                            value: this.userRolesList[i].Id,
                            label: this.userRolesList[i].Name
                        }
                    );
                }
                // End of Loop through the user role list
            }
        );
        // End of Calling the object model to access the service
    }

    // Getting the staff details by Id
    GetStaffDetailsById() {
        // Calling the object model to access the service
        this.staffModel.GetStaffDetails(this.selectedStaffId, this.overallCookieInterface.GetCompanyId()).then(
            (data) => {
                // Getting the list of social media list
                this.staffDetails = <StaffDetails>data;
            }
        );
        // End of Calling the object model to access the service
    }

    //On bluer event of input
    onBlurEvent(type: string) {

        // Check the save type
        switch (type) {
            case "STAFF$DETAILS":
                // Validate fields
                this.validateFields();

                // Check if the error messages length
                if (this.errorMessagesList.length > 0) {
                    return;
                }
                // End of Check if the error messages length

                // Update the staff object
                this.updateStaffObject();
                break;
        }
        // End of Check the save type
    }

    // Update the staff object
    updateStaffObject() {
        // Check the action state
        let actionState = (this.selectedStaffId == "") ? "NEW" : "UPDATE";

        // Check if its a new insert
        if (actionState == 'NEW') {
            // Check if the email is in the correct format
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

            if (!emailPattern.test(this.staffDetails.Email)) {
                // Pushing the error message
                this.errorMessagesList.push(
                    {
                        ErrorCode: 'INVALID$EMAIL',
                        ErrorMessage: 'Invalid email'
                    }
                );
                return;
            }
            // End of Check if the email is in the correct format

            // Check if the email already exists
            this.clientModel.CheckEmailExists(this.staffDetails.Email, this.overallCookieInterface.GetCompanyId()).then(
                (exists) => {
                    // Check if the email exists
                    if (exists == true) {
                        // Pushing the error message
                        this.errorMessagesList.push(
                            {
                                ErrorCode: 'EXISTS$EMAIL',
                                ErrorMessage: 'This email is already taken'
                            }
                        );
                        return;
                    } else {
                        // Calling the object model to access the service
                        this.staffModel.SetStaffDetails(this.staffDetails, this.overallCookieInterface.GetCompanyId(), this.overallCookieInterface.GetUserId(), actionState).then(
                            (data) => {
                                // Assign new client Id
                                this.selectedStaffId = <string>data;
                                // Check if the action state is new
                                if (actionState == "NEW" && this.selectedStaffId != "") {
                                    // Setting the new id
                                    this.commonStaffService.selectedStaffFunc(this.selectedStaffId);
                                }
                                // End of Check if the action state is new
                                this.staffDetails.Id = this.selectedStaffId;
                                this.modificationMode = "EDIT";
                            }
                        );
                        // End of Calling the object model to access the service
                    }
                    // End of Check if the email exists
                }
            );
            // End of Check if the email already exists
        } else {
            // Calling the object model to access the service
            this.staffModel.SetStaffDetails(this.staffDetails, this.overallCookieInterface.GetCompanyId(), this.overallCookieInterface.GetUserId(), actionState).then(
                (data) => {
                    // Assign new client Id
                    this.selectedStaffId = <string>data;
                    // Check if the action state is new
                    if (actionState == "NEW" && this.selectedStaffId != "") {
                        // Setting the new id
                        this.commonStaffService.selectedStaffFunc(this.selectedStaffId);
                    }
                    // End of Check if the action state is new
                    this.staffDetails.Id = this.selectedStaffId;
                    this.modificationMode = "EDIT";
                }
            );
            // End of Calling the object model to access the service
        }
        // End of Check if its a new insert
    }

    // Initializing the country list
    InitCountryList() {
        // Clear the data
        this.displayCountryList = [];
        // Calling the model to retrieve the data
        this.commonModel.GetAllCountries().then((data) => {
            // Getting the country list
            let countryList: Country[] = <Country[]>data;
            // Loop through the country list
            for (let i = 0; i < countryList.length; i++) {
                // Pushing the object
                this.displayCountryList.push({
                    value: countryList[i].Id,
                    label: countryList[i].Name,
                });
            }
            // End of Loop through the country list

            // Check if the country in the address is empty
            if (!(this.staffDetails.BusinessAddress.Country && this.staffDetails.BusinessAddress.Country.Id != 0)) {
                this.staffDetails.BusinessAddress.Country.Id = this.displayCountryList[0].value;
            }
            // End of Check if the country in the address is empty
        });
        // End of Calling the model to retrieve the data
    }

    // Validate fields
    validateFields() {
        // Clear the error message list
        this.errorMessagesList = [];

        // Check if the email is not empty
        if (!(this.staffDetails.Email && this.staffDetails.Email != '')) {
            // Pushing the error message
            this.errorMessagesList.push(
                {
                    ErrorCode: 'EMPTY$EMAIL',
                    ErrorMessage: 'Email is mandatory'
                }
            );
            return;
        }
        // End of Check if the email is not empty

        // Check if user roles list is empty
        if (!(this.staffDetails.UserRoleList && this.staffDetails.UserRoleList.length != 0)) {
            // Pushing the error message
            this.errorMessagesList.push(
                {
                    ErrorCode: 'EMPTY$USER_ROLE',
                    ErrorMessage: 'User role is mandatory'
                }
            );
            return;
        }
        // End of Check if user roles list is empty

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
