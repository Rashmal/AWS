import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import {
    HubConnection,
    HubConnectionBuilder,
    LogLevel,
} from '@microsoft/signalr';
import { CommonModel } from '../../models/commonModel';
import { CommonService } from '../../services/common.service';
import { API$DOMAIN } from 'src/app/core/apiConfigurations';
import { OverallCookieInterface } from '../../core/overallCookieInterface';
import { OverallCookieModel } from '../../core/overallCookieModel';
import { AuthenticationModule } from 'src/app/modules/authentication/authentication.module';

@Component({
    selector: 'app-tab-view',
    standalone: true,
    imports: [CommonModule, FormsModule, AuthenticationModule],
    templateUrl: './tab-view.component.html',
    styleUrl: './tab-view.component.scss',
})
export class TabViewComponent {
    // Input fields
    @Input() TabViewType: string;
    @Input()
    TabViewList: SelectItem[] = [
        {
            value: 'Dashboard',
            label: 'Dashboard',
        },
        {
            value: 'OpenDeals',
            label: 'Open deals',
        },
        {
            value: 'ClosedDeals',
            label: 'Closed deals',
        },
        {
            value: 'Marketing',
            label: 'Marketing',
        },
    ];
    @Input()
    // Selected tab
    SelectedTab: SelectItem;
    @Input()
    WithSettings: string = 'NO';
    // Output events
    @Output() onChangeTab: EventEmitter<string> = new EventEmitter<string>();
    // Store system enhancement notification count
    countSE: number = 0;
    // Store bug fixes notification count
    countBF: number = 0;
    totalCount: number = 0;
    // Store common modal
    commonModal: CommonModel;
    // Store the cookie interface
    overallCookieInterface: OverallCookieInterface;

    private hubConnectionBuilder!: HubConnection;
    url = API$DOMAIN + 'notificationHub';

    constructor(private commonService: CommonService) {
        this.commonModal = new CommonModel(this.commonService);
        this.overallCookieInterface = new OverallCookieModel();
    }

    ngOnInit() {
        // Set the first as the default selection
        if (this.TabViewList.length > 0 && !this.SelectedTab) {
            this.SelectedTab = this.TabViewList[0];
        }
        this.getNotificationCount();
        this.getBugFixesCount();
        this.getSystemEnhancementCount();
    }

    // On click event for tab
    onclickTabView(i) {
        this.SelectedTab = this.TabViewList[i];
        // emitting the selection
        this.onChangeTab.emit(this.SelectedTab.value);
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
            this.totalCount = result;
        });

        this.hubConnectionBuilder = new HubConnectionBuilder()
            .withUrl(this.url)
            .configureLogging(LogLevel.Information)
            .build();
        this.hubConnectionBuilder
            .start()
            .then(() => console.log('Connection started.......!'))
            .catch((err) => console.log('Error while connect with server'));
        this.hubConnectionBuilder.on('NotificationCountBF', (result: any) => {
            this.countBF = result;
        });

        this.hubConnectionBuilder = new HubConnectionBuilder()
            .withUrl(this.url)
            .configureLogging(LogLevel.Information)
            .build();
        this.hubConnectionBuilder
            .start()
            .then(() => console.log('Connection started.......!'))
            .catch((err) => console.log('Error while connect with server'));
        this.hubConnectionBuilder.on('NotificationCountSE', (result: any) => {
            this.countSE = result;
        });
    }

    // Get SystemEnhancement notification count
    getSystemEnhancementCount() {
        this.commonModal.GetNotificationCount('SE', this.overallCookieInterface.GetUserId()).then((data: number) => {
            // Set notification count
            this.countSE = data;
        });
    }

    // Get SystemEnhancement notification count
    getBugFixesCount() {
        this.commonModal.GetNotificationCount('BGF', this.overallCookieInterface.GetUserId()).then((data: number) => {
            // Set notification count
            this.countBF = data;
        });
    }
}
