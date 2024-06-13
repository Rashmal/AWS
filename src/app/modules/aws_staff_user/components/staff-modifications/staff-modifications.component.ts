import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { Location } from '@angular/common';
import { CommonStaffService } from '../../services/common-staff.service';

@Component({
    selector: 'app-staff-modifications',
    templateUrl: './staff-modifications.component.html',
    styleUrl: './staff-modifications.component.scss',
})
export class StaffModificationsComponent {
    modificationMode = 'NEW';
    selectedStaffId = 0;

    // Store the tab list
    TabViewList: SelectItem[] = [
        {
            value: 'GeneralInfo',
            label: 'General Info',
        },
        {
            value: 'Avatar',
            label: 'Avatar',
        },
        {
            value: 'Authentication',
            label: 'Authentication',
        },
    ];
    // Store the tab selection
    tabSelection: SelectItem;

    // Constructor
    constructor(
        private route: Router,
        private location: Location,
        private commonStaffService: CommonStaffService
    ) {
        this.commonStaffService.executeSelectedStaffFunc(
            this.updateSelectedStaffId.bind(this)
        );
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

    // Updating the selected staff Id
    updateSelectedStaffId(selectedStaffId: number) {
        // Setting the selected staff id
        this.selectedStaffId = selectedStaffId;
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
                    ['/layout/staff/staff_main/staff_mod/gen_inf'],
                    {
                        state: {
                            StaffId: this.selectedStaffId,
                            EditingMode: this.modificationMode,
                        },
                    }
                );
                break;
            case 'RolesAccess'.toUpperCase():
                this.route.navigate(
                    ['/layout/staff/staff_main/staff_mod/roles_access'],
                    {
                        state: {
                            StaffId: this.selectedStaffId,
                            EditingMode: this.modificationMode,
                        },
                    }
                );
                break;
            case 'Avatar'.toUpperCase():
                this.route.navigate(
                    ['/layout/staff/staff_main/staff_mod/avatar'],
                    {
                        state: {
                            StaffId: this.selectedStaffId,
                            EditingMode: this.modificationMode,
                        },
                    }
                );
                break;
            case 'Authentication'.toUpperCase():
                this.route.navigate(
                    ['/layout/staff/staff_main/staff_mod/authentication'],
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
