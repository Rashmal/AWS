import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { OverallCookieInterface } from 'src/app/modules/common/core/overallCookieInterface';
import { CommonModel } from 'src/app/modules/common/models/commonModel';
import { CommonService } from 'src/app/modules/common/services/common.service';
import { OverallCookieModel } from 'src/app/modules/common/core/overallCookieModel';

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
  }
}
