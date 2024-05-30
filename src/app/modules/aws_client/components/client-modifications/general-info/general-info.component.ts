import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ClientModel } from '../../../models/clientModel';
import { ClientService } from '../../../services/client.service';
import { CommonModel } from 'src/app/modules/common/models/commonModel';
import { CommonService } from 'src/app/modules/common/services/common.service';
import { SelectItem } from 'primeng/api';
import { Country } from 'src/app/modules/common/core/country';
import { BusinessNumberType } from 'src/app/modules/common/core/businessNumberType';
import { PriceClassification } from 'src/app/modules/common/core/priceClassification';
import { RatingDetails } from 'src/app/modules/common/core/ratingDetails';
import { TermType } from 'src/app/modules/common/core/termType';
import { AccountDetails } from 'src/app/modules/common/core/accountDetails';
import { DayDetails } from 'src/app/modules/common/core/dayDetails';
import { ClientCustomer } from '../../../core/client';
import { OverallCookieInterface } from 'src/app/modules/common/core/overallCookieInterface';
import { OverallCookieModel } from 'src/app/modules/common/core/overallCookieModel';
import { BusinessAddress } from '../../../core/businessAddress';
import { RelationshipDetails } from '../../../core/relationshipDetails';
import { Contact } from '../../../core/contact';
import { Filter } from 'src/app/modules/common/core/filters';
import { ContactType } from 'src/app/modules/common/core/contactType';
import { SocialMedia } from '../../../core/socialMedia';
import { SocialMediaType } from 'src/app/modules/common/core/socialMediaType';
import { aC } from '@fullcalendar/core/internal-common';
import { CommonClientService } from '../../../services/common-client.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ExpenseAccountsComponent } from './expense-accounts/expense-accounts.component';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'app-general-info',
    templateUrl: './general-info.component.html',
    styleUrl: './general-info.component.scss',
    providers: [DialogService],
})
export class GeneralInfoComponent implements OnInit {
    // Store the modification mode
    modificationMode = 'NEW';
    // Store the selected client Id
    selectedClientId = 0;
    // Store the products list
    products: any[] = [
        { code: 'P001', name: 'Product 1', category: 'Category 1', TotalRecords: 10 },
        { code: 'P002', name: 'Product 2', category: 'Category 2', TotalRecords: 10 },
        { code: 'P003', name: 'Product 3', category: 'Category 3', TotalRecords: 10 },
    ];
    // Store the is checked
    checked = true;
    //Store filter settings
    socialMediaFilter: Filter = {
        Param1: 'ALL',
        SearchQuery: '',
        RecordsPerPage: 10,
        CurrentPage: 1,
        StaffId: '',
        PriorityId: 0,
        ModuleId: 0,
        StartDate: new Date(),
        EndDate: new Date(),
        Id: '',
        ParentId: 0,
        SortColumn: '',
        SortDirection: '',
        StatusId: 0
    };
    //Store contact filter settings
    contactFilter: Filter = {
        Param1: 'ALL',
        SearchQuery: '',
        RecordsPerPage: 10,
        CurrentPage: 1,
        StaffId: '',
        PriorityId: 0,
        ModuleId: 0,
        StartDate: new Date(),
        EndDate: new Date(),
        Id: '',
        ParentId: 0,
        SortColumn: '',
        SortDirection: '',
        StatusId: 0
    };
    // Store the client model
    clientModel: ClientModel;
    // Store the common model
    commonModel: CommonModel;
    // Store the display country list
    displayCountryList: SelectItem[] = [];
    // Store the display business number type list
    displayBusinessNumberTypeList: SelectItem[] = [];
    // Store the display price classification list
    displayPriceClassificationList: SelectItem[] = [];
    // Store the display client rating list
    displayClientRatingList: SelectItem[] = [];
    // Store the display term types list
    displayTermTypeList: SelectItem[] = [];
    // Store the display account details list
    displayAccountDetailsList: SelectItem[] = [];
    // Store the display day details list
    displayDayDetailsList: SelectItem[] = [];
    // Store the display contact type list
    displayContactTypeList: SelectItem[] = [];
    // Store the display social media type list
    displaySocialMediaTypeList: SelectItem[] = [];
    // Store the client customer details
    clientCustomer: ClientCustomer;
    // Store the Business Address
    businessAddress: BusinessAddress;
    // Store the Relationship details
    relationshipDetails: RelationshipDetails;
    // Store the cookie interface
    overallCookieInterface: OverallCookieInterface;
    // Store the company Id
    companyId: number = 0;
    // Store the contact list details
    contactList: Contact[] = [];
    // Store the social media list details
    socialMediaList: SocialMedia[] = [];
    // Store dynamic dialog ref
    ref: DynamicDialogRef | undefined;

    constructor(public dialogService: DialogService, private location: Location, private clientService: ClientService,
        private commonService: CommonService, private commonClientService: CommonClientService) {
        // Initialize the model
        this.clientModel = new ClientModel(this.clientService);
        this.commonModel = new CommonModel(this.commonService);
        this.overallCookieInterface = new OverallCookieModel();

        // Initializing the client customer
        this.clientCustomer = {
            Id: 0,
            BusinessName: '',
            BusinessNumber: '',
            BusinessNumberType: {
                Id: 0,
                Code: '',
                Name: ''
            },
            FirstName: '',
            MiddleInitial: ''
        }
        // Initializing the business address
        this.businessAddress = {
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
        };
        // Initializing the relationship details
        this.relationshipDetails = {
            Id: 0,
            ClientSize: {
                Id: 0,
                Code: '',
                Name: ''
            },
            ClientTerms: 0,
            ClientTermType: {
                Id: 0,
                Code: '',
                Name: ''
            },
            DayDetails: {
                Id: 0,
                Code: '',
                Name: ''
            },
            DefaultDeposit: 0,
            ExpenseAccount: {
                Id: 0,
                Name: '',
                Total: 0
            },
            FinancialNotes: '',
            IsAutoProgressReport: false,
            IsClient: false,
            IsSubcontractor: false,
            IsSupplier: false,
            MonthDayAlert: 0,
            NextReportDateTime: new Date(),
            OfficeJob: 0,
            PriceClassification: {
                Id: 0,
                Code: '',
                Name: ''
            },
            RatingDetails: {
                Id: 0,
                Code: '',
                Name: ''
            },
            SupplierTerms: 0,
            SupplierTermType: {
                Id: 0,
                Code: '',
                Name: ''
            },
            WorkCredit: 0
        };
        // Initializing the contact details
        this.contactList = [];
        this.contactList.push(
            {
                Id: 0,
                ContactType: {
                    Id: 0,
                    Code: '',
                    Name: ''
                },
                ContactValue: '',
                Name: '',
                TotalRecords: 0
            }
        );
        // Initializing the social media list
        this.socialMediaList = [];
        this.socialMediaList.push(
            {
                Id: 0,
                Setting: '',
                SocialMediaType: {
                    Id: 0,
                    Code: '',
                    Name: ''
                },
                TotalRecords: 0
            }
        );
    }

    ngOnInit(): void {
        // Initializing the country list
        this.InitCountryList();
        // Initializing the business number type list
        this.InitBusinessNumberTypeList();
        // Initializing the price classification list
        this.InitPriceClassificationList();
        // Initializing the client rating list
        this.InitClientRatingList();
        // Initializing the term types list
        this.InitTermTypeList();

        // Initializing the day details list
        this.InitDayDetailsList();
        // Initializing the contact type list
        this.InitContactTypeList();
        // Initializing the social media type list
        this.InitSocialMediaTypeList();


        // Getting the passed params
        let paramObject = this.location.getState();
        //Set editing mode
        if (paramObject['EditingMode']) {
            this.modificationMode = paramObject['EditingMode'];
        }
        //Set editing client id
        if (paramObject['ClientId']) {
            this.selectedClientId = paramObject['ClientId'];
            // getting the Client Customer details based on the selected client Id
            this.GetClientCustomerDetails();
            // getting the Client Business details based on the selected client Id
            this.GetBusinessCustomerDetails();
            // getting the Client Relationship details based on the selected client Id
            this.GetRelationshipDetails();
            // getting the Client Contact details based on the selected client Id
            this.GetContactListDetails();
            // getting the Client Social Media details based on the selected client Id
            this.GetSocialMediaListDetails();
        }
    }

    // getting the Client Customer details based on the selected client Id
    GetClientCustomerDetails() {
        // Calling the object model to access the service
        this.clientModel.GetClientCustomer(this.selectedClientId, this.companyId).then(
            (data) => {
                // Getting the list of social media list
                this.clientCustomer = <ClientCustomer>data;
            }
        );
        // End of Calling the object model to access the service
    }

    // getting the Client Business details based on the selected client Id
    GetBusinessCustomerDetails() {
        // Calling the object model to access the service
        this.clientModel.GetBillingAddress(this.selectedClientId, this.companyId).then(
            (data) => {
                // Getting the list of social media list
                this.businessAddress = <BusinessAddress>data;
            }
        );
        // End of Calling the object model to access the service
    }

    // getting the Client Relationship details based on the selected client Id
    GetRelationshipDetails() {
        // Calling the object model to access the service
        this.clientModel.GetRelationshipDetails(this.selectedClientId, this.companyId).then(
            (data) => {
                // Getting the list of social media list
                this.relationshipDetails = <RelationshipDetails>data;
            }
        );
        // End of Calling the object model to access the service
    }

    // getting the Client Contact details based on the selected client Id
    GetContactListDetails() {
        // Getting all the contacts list
        this.getAllContactList();
    }

    // getting the Client Social Media details based on the selected client Id
    GetSocialMediaListDetails() {
        // Getting all the social media list
        this.getAllSocialMediaList();
    }

    //on change module list paginator
    onPageChange(event: any, sectionType: string) {
        // Check the section type
        switch (sectionType) {
            case 'CONTACT':
                // Setting the filter
                this.contactFilter.CurrentPage = event.page + 1;
                // Getting all the list
                this.getAllContactList();
                break;
            case 'SOCIAL$MEDIA':
                // Setting the filter
                this.socialMediaFilter.CurrentPage = event.page + 1;
                // Getting all the list
                this.getAllSocialMediaList();
                break;
        }
        // End of Check the section type
    }

    // Initializing the country list
    InitCountryList() {
        // Clear the data
        this.displayCountryList = [];
        // Calling the model to retrieve the data
        this.commonModel.GetAllCountries().then(
            (data) => {
                // Getting the country list
                let countryList: Country[] = <Country[]>data;
                // Loop through the country list
                for (let i = 0; i < countryList.length; i++) {
                    // Pushing the object
                    this.displayCountryList.push({
                        value: countryList[i].Id,
                        label: countryList[i].Name
                    });
                }
                // End of Loop through the country list
            }
        );
        // End of Calling the model to retrieve the data
    }

    // Initializing the business number type list
    InitBusinessNumberTypeList() {
        // Clear the data
        this.displayBusinessNumberTypeList = [];
        // Calling the model to retrieve the data
        this.commonModel.GetAllBusinessNumberTypes().then(
            (data) => {
                // Getting the country list
                let dataList: BusinessNumberType[] = <BusinessNumberType[]>data;
                // Loop through the country list
                for (let i = 0; i < dataList.length; i++) {
                    // Pushing the object
                    this.displayBusinessNumberTypeList.push({
                        value: dataList[i].Id,
                        label: dataList[i].Name
                    });
                }
                // End of Loop through the country list
            }
        );
        // End of Calling the model to retrieve the data
    }

    // Initializing the price classification list
    InitPriceClassificationList() {
        // Clear the data
        this.displayPriceClassificationList = [];
        // Calling the model to retrieve the data
        this.commonModel.GetAllPriceClassifications().then(
            (data) => {
                // Getting the country list
                let dataList: PriceClassification[] = <PriceClassification[]>data;
                // Loop through the country list
                for (let i = 0; i < dataList.length; i++) {
                    // Pushing the object
                    this.displayPriceClassificationList.push({
                        value: dataList[i].Id,
                        label: dataList[i].Name
                    });
                }
                // End of Loop through the country list
            }
        );
        // End of Calling the model to retrieve the data
    }

    // Initializing the client rating list
    InitClientRatingList() {
        // Clear the data
        this.displayClientRatingList = [];
        // Calling the model to retrieve the data
        this.commonModel.GetAllRatings().then(
            (data) => {
                // Getting the country list
                let dataList: RatingDetails[] = <RatingDetails[]>data;
                // Loop through the country list
                for (let i = 0; i < dataList.length; i++) {
                    // Pushing the object
                    this.displayClientRatingList.push({
                        value: dataList[i].Id,
                        label: dataList[i].Name
                    });
                }
                // End of Loop through the country list
            }
        );
        // End of Calling the model to retrieve the data
    }

    // Initializing the term types list
    InitTermTypeList() {
        // Clear the data
        this.displayTermTypeList = [];
        // Calling the model to retrieve the data
        this.commonModel.GetAllTermTypes().then(
            (data) => {
                // Getting the country list
                let dataList: TermType[] = <TermType[]>data;
                // Loop through the country list
                for (let i = 0; i < dataList.length; i++) {
                    // Pushing the object
                    this.displayTermTypeList.push({
                        value: dataList[i].Id,
                        label: dataList[i].Name
                    });
                }
                // End of Loop through the country list
            }
        );
        // End of Calling the model to retrieve the data
    }

    //On click expense account dropdown to get full account list
    onClickExpAccountDD() {
        // Open popup to select user roles
        this.ref = this.dialogService.open(ExpenseAccountsComponent, {
            header: 'Select An Expense Account',
            //Send user roles to popup
            data: this.relationshipDetails.ExpenseAccount,
        });
        // Perform an action on close the popup
        this.ref.onClose.subscribe((expenseAccount: AccountDetails) => {
            if (expenseAccount) {
                //Set selected expense account
                this.relationshipDetails.ExpenseAccount = expenseAccount;
                // Save data On change value
                this.onBlurEvent('RELATIONSHIP$DETAILS');
            }
        });

    }



    // Initializing the day details list
    InitDayDetailsList() {
        // Clear the data
        this.displayDayDetailsList = [];
        // Calling the model to retrieve the data
        this.commonModel.GetAllDays().then(
            (data) => {
                // Getting the country list
                let dataList: DayDetails[] = <DayDetails[]>data;
                // Loop through the country list
                for (let i = 0; i < dataList.length; i++) {
                    // Pushing the object
                    this.displayDayDetailsList.push({
                        value: dataList[i].Id,
                        label: dataList[i].Name
                    });
                }
                // End of Loop through the country list
            }
        );
        // End of Calling the model to retrieve the data
    }

    // Initializing the contact type list
    InitContactTypeList() {
        // Clear the data
        this.displayContactTypeList = [];
        // Calling the model to retrieve the data
        this.commonModel.GetAllContactTypes().then(
            (data) => {
                // Getting the country list
                let dataList: ContactType[] = <ContactType[]>data;
                // Loop through the country list
                for (let i = 0; i < dataList.length; i++) {
                    // Pushing the object
                    this.displayContactTypeList.push({
                        value: dataList[i].Id,
                        label: dataList[i].Name
                    });
                }
                // End of Loop through the country list
            }
        );
        // End of Calling the model to retrieve the data
    }

    // Initializing the social media type list
    InitSocialMediaTypeList() {
        // Clear the data
        this.displaySocialMediaTypeList = [];
        // Calling the model to retrieve the data
        this.commonModel.GetAllSocialMediaTypes().then(
            (data) => {
                // Getting the country list
                let dataList: SocialMediaType[] = <SocialMediaType[]>data;
                // Loop through the country list
                for (let i = 0; i < dataList.length; i++) {
                    // Pushing the object
                    this.displaySocialMediaTypeList.push({
                        value: dataList[i].Id,
                        label: dataList[i].Name
                    });
                }
                // End of Loop through the country list
            }
        );
        // End of Calling the model to retrieve the data
    }

    // On blur event of fields
    onBlurEvent(currentEvent: string, currentIndex: number = 0, contactObject: Contact = null, socialMediaObject: SocialMedia = null) {
        // Check if the business name is not empty
        if (this.clientCustomer.BusinessName) {
            // Check the event
            switch (currentEvent) {
                case 'CLIENT$CUSTOMER':
                    // Update the client customer object
                    this.updateClientCustomerObject();
                    break;
                case 'BUSINESS$ADDRESS':
                    // Update the business address object
                    this.updateBusinessAddressObject();
                    break;
                case 'RELATIONSHIP$DETAILS':
                    // Update the relationship details object
                    this.updateRelationshipDetailsObject();
                    break;
                case 'CONTACT$DETAILS':
                    // Check if the values are not empty
                    if (!(contactObject && contactObject.ContactValue == '' && contactObject.ContactType.Id == 0)) {
                        // Update the contact list details object
                        this.updateContactListDetailsObject(contactObject, currentIndex);
                    }
                    // End of Check if the values are not empty
                    break;
                case 'SOCIAL$MEDIA$DETAILS':
                    // Check if the values are not empty
                    if (!(socialMediaObject && socialMediaObject.Setting == '' && socialMediaObject.SocialMediaType.Id == 0)) {
                        // Update the contact list details object
                        this.updateSocialMediaListDetailsObject(socialMediaObject, currentIndex);
                    }
                    // End of Check if the values are not empty
                    break;
            }
            // End of Check the event
        }
        // End of Check if the business name is not empty
    }

    // Update the client customer object
    updateClientCustomerObject() {
        // Check the action state
        let actionState = (this.selectedClientId == 0) ? "NEW" : "UPD";

        // Calling the object model to access the service
        this.clientModel.SetClientCustomer(this.clientCustomer, this.overallCookieInterface.GetUserId(), actionState, this.companyId).then(
            (data) => {
                // Assign new client Id
                this.selectedClientId = <number>data;
                // Check if the action state is new
                if (actionState == "NEW" && this.selectedClientId != 0) {
                    // Setting the new id
                    this.commonClientService.selectedClientFunc(this.selectedClientId);
                }
                // End of Check if the action state is new
                this.clientCustomer.Id = this.selectedClientId;
                this.modificationMode = "EDIT";
            }
        );
        // End of Calling the object model to access the service
    }

    // Update the business address object
    updateBusinessAddressObject() {
        // Check the action state
        let actionState = (this.businessAddress.Id == 0) ? "NEW" : "UPD";

        // Calling the object model to access the service
        this.clientModel.SetBillingAddress(this.businessAddress, actionState, this.selectedClientId, this.companyId).then(
            (data) => {
                // Setting the business address Id
                this.businessAddress.Id = <number>data;
            }
        );
        // End of Calling the object model to access the service
    }

    // Update the relationship details object
    updateRelationshipDetailsObject() {
        // Check the action state
        let actionState = (this.relationshipDetails.Id == 0) ? "NEW" : "UPD";

        // Calling the object model to access the service
        this.clientModel.SetRelationshipDetails(this.relationshipDetails, actionState, this.selectedClientId, this.companyId).then(
            (data) => {
                // Setting the business address Id
                this.relationshipDetails.Id = <number>data;
            }
        );
        // End of Calling the object model to access the service
    }

    // Update the contact list details object
    updateContactListDetailsObject(contactObject: Contact, currentIndex: number) {
        // Check the action state
        let actionState = (contactObject.Id == 0) ? "NEW" : "UPDATE";

        // Check if the action is new
        if (actionState == "NEW") {
            // Adding another contact object to the list
            this.contactList.push(
                {
                    Id: 0,
                    ContactType: {
                        Id: 0,
                        Code: '',
                        Name: ''
                    },
                    ContactValue: '',
                    Name: '',
                    TotalRecords: 0
                }
            );
        }
        // End of Check if the action is new

        // Calling the object model to access the service
        this.clientModel.SetContactDetails(contactObject, actionState, this.selectedClientId, this.companyId).then(
            (data) => {
                // Setting the business address Id
                this.contactList[currentIndex].Id = <number>data;
                /// Getting all the contacts list
                this.getAllContactList();
            }
        );
        // End of Calling the object model to access the service
    }

    // Update the social media list details object
    updateSocialMediaListDetailsObject(socialMediaObject: SocialMedia, currentIndex: number) {
        // Check the action state
        let actionState = (socialMediaObject.Id == 0) ? "NEW" : "UPDATE";

        // Check if the action is new
        if (actionState == "NEW") {
            // Adding another contact object to the list
            this.socialMediaList.push(
                {
                    Id: 0,
                    Setting: '',
                    SocialMediaType: {
                        Id: 0,
                        Code: '',
                        Name: ''
                    },
                    TotalRecords: 0
                }
            );
        }
        // End of Check if the action is new

        // Calling the object model to access the service
        this.clientModel.SetSocialMediaDetails(socialMediaObject, actionState, this.selectedClientId, this.companyId).then(
            (data) => {
                // Setting the business address Id
                this.socialMediaList[currentIndex].Id = <number>data;
                // Getting all the social media list
                this.getAllSocialMediaList();
            }
        );
        // End of Calling the object model to access the service
    }

    // On delete function for contact
    onDeleteContact(contactObject: Contact) {
        // Calling the object model to access the service
        this.clientModel.SetContactDetails(contactObject, "REMOVE", this.selectedClientId, this.companyId).then(
            (data) => {
                /// Getting all the contacts list
                this.getAllContactList();
            }
        );
        // End of Calling the object model to access the service
    }

    // Getting all the contacts list
    getAllContactList() {
        // Calling the object model to access the service
        this.clientModel.GetAllContactList(this.contactFilter, this.selectedClientId, this.companyId).then(
            (data) => {
                // Getting the list of contacts
                this.contactList = <Contact[]>data;
                // Adding another contact object to the list
                this.contactList.push(
                    {
                        Id: 0,
                        ContactType: {
                            Id: 0,
                            Code: '',
                            Name: ''
                        },
                        ContactValue: '',
                        Name: '',
                        TotalRecords: 0
                    }
                );
            }
        );
        // End of Calling the object model to access the service
    }

    // On delete function for social media
    onDeleteSocialMedia(socialMediaObject: SocialMedia) {
        // Calling the object model to access the service
        this.clientModel.SetSocialMediaDetails(socialMediaObject, "REMOVE", this.selectedClientId, this.companyId).then(
            (data) => {
                // Getting all the social media list
                this.getAllSocialMediaList();
            }
        );
        // End of Calling the object model to access the service
    }

    // Getting all the social media list
    getAllSocialMediaList() {
        // Calling the object model to access the service
        this.clientModel.GetAllSocialMediaList(this.socialMediaFilter, this.selectedClientId, this.companyId).then(
            (data) => {
                // Getting the list of social media list
                this.socialMediaList = <SocialMedia[]>data;
                // Adding another contact object to the list
                this.socialMediaList.push(
                    {
                        Id: 0,
                        Setting: '',
                        SocialMediaType: {
                            Id: 0,
                            Code: '',
                            Name: ''
                        },
                        TotalRecords: 0
                    }
                );
            }
        );
        // End of Calling the object model to access the service
    }
}
