import { Component } from '@angular/core';
import { OverallCookieInterface } from 'src/app/modules/common/core/overallCookieInterface';
import { OverallCookieModel } from 'src/app/modules/common/core/overallCookieModel';
import { CommonModel } from 'src/app/modules/common/models/commonModel';
import { CommonService } from 'src/app/modules/common/services/common.service';
import { Location } from '@angular/common';

@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrl: './authentication.component.scss',
})
export class AuthenticationComponent {
   // Store the modification mode
   modificationMode = 'NEW';
   // Store the selected client Id
   selectedStaffId = 0;
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
    //store selected staff
    staffDetails: any;
    //On bluer event of input
    onBlurEvent(type: string) {}
}
