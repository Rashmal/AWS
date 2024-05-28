import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { Location } from '@angular/common';

@Component({
    selector: 'app-client-modifications',
    templateUrl: './client-modifications.component.html',
    styleUrl: './client-modifications.component.scss',
})
export class ClientModificationsComponent {
    modificationMode = 'NEW';
    selectedClientId = 0;

    // Store the tab list
    TabViewList: SelectItem[] = [
        {
            value: 'GeneralInfo',
            label: 'General Info',
        },
        {
            value: 'ImgDcFi',
            label: 'Images/Documents/Files',
        },
        {
            value: 'ClientReq',
            label: 'Client Requirements',
        },
    ];
    // Store the tab selection
    tabSelection: SelectItem;

    // Constructor
    constructor(private route: Router, private location: Location) {}

    // Ng on init
    ngOnInit() {
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
                    ['/layout/client/client_main/client_mod/gen_inf'],
                    {
                        state: {
                            ClientId: this.selectedClientId,
                            EditingMode: this.modificationMode,
                        },
                    }
                );
                break;
            case 'ImgDcFi'.toUpperCase():
                this.route.navigate(
                    ['/layout/client/client_main/client_mod/media'],
                    {
                        state: {
                            ClientId: this.selectedClientId,
                            EditingMode: this.modificationMode,
                        },
                    }
                );
                break;
            case 'ClientReq'.toUpperCase():
                this.route.navigate(
                    ['/layout/client/client_main/client_mod/cli_req'],
                    {
                        state: {
                            ClientId: this.selectedClientId,
                            EditingMode: this.modificationMode,
                        },
                    }
                );
                break;
        }
        // End of Check the selected tab
    }
}
