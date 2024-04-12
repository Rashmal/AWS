import { Component, OnInit, Input } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';
import { Module } from 'src/app/modules/common/core/module';
import { CommonModel } from 'src/app/modules/common/models/commonModel';
import { CommonService } from 'src/app/modules/common/services/common.service';

@Component({
    selector: 'app-new-side-bar',
    templateUrl: './new-side-bar.component.html',
    styleUrl: './new-side-bar.component.scss',
})
export class NewSideBarComponent implements OnInit {
    //On mouse enter on side bar
    @Input() mouseEnter: boolean = false;
    // Store the model list objects
    model: any[] = [];
    //Store side menu content
    sideMenuItems: Module[] = [];
    //Store models
    commonModel: CommonModel;
    // Constructor
    constructor(public layoutService: LayoutService, private commonService: CommonService) {
        this.commonModel = new CommonModel(this.commonService);
    }

    // Ng on init function
    ngOnInit() {
        // Initialize the model list
        this.getMenuItems();
        // End of Initialize the model list

        
       
    }

    //Get site menu items
    getMenuItems(){
        //call services to get menu items
        this.commonModel.GetModuleListServiceLocal().then(
            (data: Module[]) => {
                this.sideMenuItems =  data;
               
            }
        );
    }
}
