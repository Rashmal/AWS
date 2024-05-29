import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Filter } from '../../../core/filter';
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

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'app-general-info',
    templateUrl: './general-info.component.html',
    styleUrl: './general-info.component.scss',
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
    filter: Filter = {
        Type: { label: 'All', value: 'ALL' },
        Search: '',
        ItemsPerPage: 10,
        CurrentPage: 1,
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

    constructor(private location: Location, private clientService: ClientService,
        private commonService: CommonService) {
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
                Name: ''
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
        // Initializing the account details list
        this.InitAccountDetailsList();
        // Initializing the day details list
        this.InitDayDetailsList();


        // Getting the passed params
        let paramObject = this.location.getState();
        //Set editing mode
        if (paramObject['EditingMode']) {
            this.modificationMode = paramObject['EditingMode'];
        }
        //Set editing client id
        if (paramObject['ClientId']) {
            this.selectedClientId = paramObject['ClientId'];
        }
    }

    //on change module list paginator
    onPageChange(event: any) { }

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

    // Initializing the account details list
    InitAccountDetailsList() {
        // Clear the data
        this.displayAccountDetailsList = [];
        // Calling the model to retrieve the data
        this.commonModel.GetAccountDetails().then(
            (data) => {
                // Getting the country list
                let dataList: AccountDetails[] = <AccountDetails[]>data;
                // Loop through the country list
                for (let i = 0; i < dataList.length; i++) {
                    // Pushing the object
                    this.displayAccountDetailsList.push({
                        value: dataList[i].Id,
                        label: dataList[i].Name
                    });
                }
                // End of Loop through the country list
            }
        );
        // End of Calling the model to retrieve the data
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

    // On blur event of fields
    onBlurEvent(currentEvent: string) {
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
}
