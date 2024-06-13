import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { Location } from '@angular/common';


@Component({
  selector: 'app-user-roles-modifications',
  templateUrl: './user-roles-modifications.component.html',
  styleUrl: './user-roles-modifications.component.scss'
})
export class UserRolesModificationsComponent {
  modificationMode = 'NEW';
    selectedStaffId = 0;

    // Store the tab list
    TabViewList: SelectItem[] = [
        {
            value: 'AccessLevels',
            label: 'Access Levels',
        },
        
    ];
    // Store the tab selection
    tabSelection: SelectItem;

    // Constructor
    constructor(
        private route: Router,
        private location: Location
    ) {
        
    }

    // Ng on init
    ngOnInit() {
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
        // Setting the default selection
        this.onChangeTab(this.TabViewList[0].value);
    }

    

    // Change function of dropdown section
    onChangeTab(selectedTab: string) {
        // Getting the object of the selected tab
        let selectedObj = this.TabViewList.find(
            (obj) => obj.value == selectedTab
        );
        // setting the tab selection
        this.tabSelection = selectedObj;
        // Check the selected tab
        switch (selectedTab.toUpperCase()) {
            case 'GeneralInfo'.toUpperCase():
                this.route.navigate(
                    ['/layout/staff/user_roles_main/user_roles_mod/access_levels'],
                    {
                        state: {
                            StaffId: this.selectedStaffId,
                            EditingMode: this.modificationMode,
                        },
                    }
                );
                break;
            
              
        }
        // End of Check the selected tab
    }
}
