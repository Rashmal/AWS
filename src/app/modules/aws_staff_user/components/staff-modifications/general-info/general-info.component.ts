import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { SelectItem } from 'primeng/api';
import { Country } from 'src/app/modules/common/core/country';
import { CommonService } from 'src/app/modules/common/services/common.service';
import { OverallCookieInterface } from 'src/app/modules/common/core/overallCookieInterface';
import { OverallCookieModel } from 'src/app/modules/common/core/overallCookieModel';
import { CommonModel } from 'src/app/modules/common/models/commonModel';

@Component({
    selector: 'app-general-info',
    templateUrl: './general-info.component.html',
    styleUrl: './general-info.component.scss',
})
export class GeneralInfoComponent implements OnInit {
    // Store the modification mode
    modificationMode = 'NEW';
    // Store the selected client Id
    selectedStaffId = 0;
    //store selected staff
    staffDetails: any;
    // Store the display country list
    displayCountryList: SelectItem[] = [{value: 'ADM', label: 'Administrator'}, {value: 'MAN', label: 'Manager'}, {value: 'GEN', label: 'General'}];
    selectedRoles: SelectItem[] = [];
    // Store the cookie interface
    overallCookieInterface: OverallCookieInterface;
    // Store the common model
    commonModel: CommonModel;

    // Store the products list
    constructor(
        private location: Location,
        private commonService: CommonService
    ) {
        // Initialize the model
        this.commonModel = new CommonModel(this.commonService);
        this.overallCookieInterface = new OverallCookieModel();
    }

    ngOnInit(): void {
        // Initializing the country list
        //this.InitCountryList();
        // Getting the passed params
        let paramObject = this.location.getState();
        //Set editing mode
        if (paramObject['EditingMode']) {
            this.modificationMode = paramObject['EditingMode'];
        }
        //Set editing staff id
        if (paramObject['StaffId']) {
            this.selectedStaffId = paramObject['StaffId'];
        }
    }

    //On bluer event of input
    onBlurEvent(type: string) {}

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
        });
        // End of Calling the model to retrieve the data
    }
}
