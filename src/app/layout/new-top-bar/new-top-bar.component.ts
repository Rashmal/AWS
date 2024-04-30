import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthenticationModel } from 'src/app/modules/authentication/models/authenticationModel';
import { AuthenticationService } from 'src/app/modules/authentication/services/authentication.service';
import { OverallCookieInterface } from 'src/app/modules/common/core/overallCookieInterface';
import { OverallCookieModel } from 'src/app/modules/common/core/overallCookieModel';
import { LayoutService } from '../service/app.layout.service';
import { Module } from 'src/app/modules/common/core/module';
import { CommonModel } from 'src/app/modules/common/models/commonModel';
import { CommonService } from 'src/app/modules/common/services/common.service';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { API$DOMAIN } from 'src/app/core/apiConfigurations';

@Component({
    selector: 'app-new-top-bar',
    templateUrl: './new-top-bar.component.html',
    styleUrl: './new-top-bar.component.scss'
})
export class NewTopBarComponent {

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    @Output() toggleMenus: EventEmitter<any> = new EventEmitter();

    // Store the cookie interface
    overallCookieInterface: OverallCookieInterface;
    // Store the authentication model
    authenticationModel: AuthenticationModel;
    //Store side menu content
    sideMenuItems: Module[] = [];
    //Store static side menu items
    staticMenuItems: Module[] = [{
        Id: 1,
        ModuleCode: "STAT1",
        Name: "Global Notes",
        ModuleIcon: "pi pi-fw pi-home",
        RedirectUrl: "/layout/global",
        IsDisable: false
    },
    {
        Id: 2,
        ModuleCode: "STAT2",
        Name: "Dashboard",
        ModuleIcon: "pi pi-fw pi-id-card",
        RedirectUrl: "/layout/global",
        IsDisable: false
    },
    {
        Id: 3,
        ModuleCode: "STAT3",
        Name: "View/Add Appoiment",
        ModuleIcon: "pi pi-fw pi-check-square",
        RedirectUrl: "/layout/dashboard",
        IsDisable: false
    },
    {
        Id: 4,
        ModuleCode: "STAT4",
        Name: "Request / New",
        ModuleIcon: "pi pi-fw pi-bookmark",
        RedirectUrl: "/layout/dashboard",
        IsDisable: false
    },
    {
        Id: 5,
        ModuleCode: "STAT5",
        Name: "Document Repository",
        ModuleIcon: "pi pi-fw pi-exclamation-circle",
        RedirectUrl: "/layout/dashboard",
        IsDisable: false
    },
    {
        Id: 6,
        ModuleCode: "STAT6",
        Name: "Trello",
        ModuleIcon: "pi pi-fw pi-box",
        RedirectUrl: "/layout/dashboard",
        IsDisable: false
    }];
    //Store static side menu items
    staticMenuItemsDisplay: Module[] = [];
    //Store models
    commonModel: CommonModel;
    // Store notification count
    ttlNotCount: number = 0;
    private hubConnectionBuilder!: HubConnection;
    // Store common modal
    commonModal: CommonModel;

    
    url = API$DOMAIN + 'notificationHub';

    // Constructor
    constructor(public layoutService: LayoutService, private authenticationService: AuthenticationService,
        private router: Router, private commonService: CommonService) {
        // Initialize the model
        this.authenticationModel = new AuthenticationModel(this.authenticationService);
        this.overallCookieInterface = new OverallCookieModel();
        this.commonModel = new CommonModel(this.commonService);
        // Initialize the model list
        this.getMenuItems();
        this.getNotificationCount();
        // Get global notes notification count
        this.getGlobalNotesNotCount();
    }

    //Get site menu items
    getMenuItems() {
        //call services to get menu items
        this.commonModel.GetModuleListService().then(
            (data: Module[]) => {
                this.sideMenuItems = data;
                this.staticMenuItemsDisplay = this.staticMenuItems;
                // Loop through the side menus
                for (let i = 0; i < this.sideMenuItems.length; i++) {
                    this.staticMenuItemsDisplay.push(this.sideMenuItems[i]);
                }
            }
        );
    }

    // On click function of the logout
    logoutOnClick() {
        // Calling the model to logout function
        this.authenticationModel.LogoutUserService(this.overallCookieInterface.GetUserEmail()).then(
            (data) => {
                // Clear the local storage cookie data
                this.overallCookieInterface.ClearCookies();
                // Redirect to the login page
                this.router.navigate(['/auth']);
            }
        );
        // End of Calling the model to logout function
    }

    isMouseDown: boolean = false;
    initialX: number = 0;
    scrollX: number = 0;

    onMouseDown(event: MouseEvent) {
        this.isMouseDown = true;
        this.initialX = event.clientX - this.scrollX;
    }

    onMouseMove(event: MouseEvent) {
        if (this.isMouseDown) {
            const newX = event.clientX;
            const dx = newX - this.initialX;
            this.scrollX = Math.max(0, this.scrollX + dx);
            this.initialX = newX;
        }
    }

    onMouseUp(event: MouseEvent) {
        this.isMouseDown = false;
    }

    @HostListener('document:mouseup')
    onMouseLeave() {
        this.isMouseDown = false;
    }

    getNotificationCount() {
        this.hubConnectionBuilder = new HubConnectionBuilder()
            .withUrl(this.url)
            .configureLogging(LogLevel.Information)
            .build();
        this.hubConnectionBuilder
            .start()
            .then(() => console.log('Connection started.......!'))
            .catch((err) => console.log('Error while connect with server'));
        this.hubConnectionBuilder.on('NotificationCountGN', (result: any) => {
            this.ttlNotCount = result;
        });

       
    }

    // Get global notes notification count
    getGlobalNotesNotCount() {
        this.commonModel.GetNotificationCount('TOTAL').then(
            (data: number) => {
                // Set notification count
                this.ttlNotCount = data;
            }
        );
    }

    // On click event of toggle navigation
    toggleNavigation() {
        this.toggleMenus.emit(true);
    }
}
