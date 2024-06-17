import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { OverallCookieInterface } from 'src/app/modules/common/core/overallCookieInterface';
import { CommonModel } from 'src/app/modules/common/models/commonModel';
import { CommonService } from 'src/app/modules/common/services/common.service';
import { OverallCookieModel } from 'src/app/modules/common/core/overallCookieModel';
import { StaffModel } from '../../../models/staffModel';
import { StaffService } from '../../../services/staff.service';

@Component({
    selector: 'app-avatar',
    templateUrl: './avatar.component.html',
    styleUrl: './avatar.component.scss',
})
export class AvatarComponent {
    files: File[] = [];
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
    // Store the user avatar
    userAvatar: string = "";

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
            // Getting the current user avatar
            this.GetUserAvatar();
        }
    }

    // Getting the user avatar
    GetUserAvatar() {
        // Calling the object model to access the service
        this.staffModel.GetStaffAvatar(this.selectedStaffId, this.overallCookieInterface.GetCompanyId()).then(
            (data) => {
                // Getting the list of social media list
                this.userAvatar = <string>data;
            }
        );
        // End of Calling the object model to access the service
    }

    // Handle files selected via the file input element
    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files) {
            this.handleFiles(input.files);
        }
    }

    // Process the file list and add to the files array
    handleFiles(fileList: FileList) {
        for (let i = 0; i < fileList.length; i++) {
            this.files.push(fileList[i]);
        }

        //Setting the form data
        const frmDataObj = new FormData();
        // Loop through the files
        for (let i = 0; i < this.files.length; i++) {
            frmDataObj.append('fileUpload', this.files[i]);
        }
        // End of Loop through the files
        this.staffModel.UploadStaffAvatar(this.selectedStaffId, this.overallCookieInterface.GetCompanyId(), frmDataObj)
            .then((data: string) => {
                // Getting the user avatar
                this.GetUserAvatar();
            });
    }

    // On click event of remove avatar
    removeAvatar() {
        // Calling the object model to access the service
        this.staffModel.RemoveStaffAvatar(this.selectedStaffId, this.overallCookieInterface.GetCompanyId()).then(
            (data) => {
                // Getting the user avatar
                this.GetUserAvatar();
            }
        );
        // End of Calling the object model to access the service
    }
}
