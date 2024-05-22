import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';

@Component({
    selector: 'app-client-modifications',
    templateUrl: './client-modifications.component.html',
    styleUrl: './client-modifications.component.scss',
})
export class ClientModificationsComponent {
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
    constructor(private route: Router) {}

    // Ng on init
    ngOnInit() {
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
                this.route.navigate([
                    '/layout/client/client_main/client_mod/gen_inf',
                ]);
                break;
            case 'ImgDcFi'.toUpperCase():
                this.route.navigate([
                    '/layout/client/client_main/client_mod/media',
                ]);
                break;
            case 'ClientReq'.toUpperCase():
                this.route.navigate([
                    '/layout/client/client_main/client_mod/cli_req',
                ]);
                break;
        }
        // End of Check the selected tab
    }
}
