import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

@Component({
  selector: 'app-tab-view',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './tab-view.component.html',
  styleUrl: './tab-view.component.scss'
})
export class TabViewComponent {
  // Input fields
  @Input() TabViewType: string;
  @Input()
  TabViewList: SelectItem[] = [
    {
      value: 'Dashboard',
      label: 'Dashboard'
    },
    {
      value: 'OpenDeals',
      label: 'Open deals'
    },
    {
      value: 'ClosedDeals',
      label: 'Closed deals'
    },
    {
      value: 'Marketing',
      label: 'Marketing'
    }
  ];
  @Input()
  // Selected tab
  SelectedTab: SelectItem;
  @Input()
  WithSettings: string = "NO";
  // Output events
  @Output() onChangeTab: EventEmitter<string> = new EventEmitter<string>();

  private hubConnectionBuilder!: HubConnection;

  constructor() { }

  ngOnInit() {
    // Set the first as the default selection
    if (this.TabViewList.length > 0 && !this.SelectedTab) {
      this.SelectedTab = this.TabViewList[0];
    }
    this.getNotificationCount();
  }

  // On click event for tab
  onclickTabView(i) {
    this.SelectedTab = this.TabViewList[i];
    // emitting the selection
    this.onChangeTab.emit(this.SelectedTab.value);
  }

  getNotificationCount(){
    this.hubConnectionBuilder = new HubConnectionBuilder().withUrl('https://localhost:7198/notificationHub').configureLogging(LogLevel.Information).build();
    this.hubConnectionBuilder.start().then(() => console.log('Connection started.......!')).catch(err => console.log('Error while connect with server'));
    this.hubConnectionBuilder.on('NotificationCountGN', (result: any) => {
        console.log(result)
    });
  }
}
