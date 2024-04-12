import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectItem } from 'primeng/api';

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

  constructor() { }

  ngOnInit() {
    // Set the first as the default selection
    if (this.TabViewList.length > 0 && !this.SelectedTab) {
      this.SelectedTab = this.TabViewList[0];
    }
  }

  // On click event for tab
  onclickTabView(i) {
    this.SelectedTab = this.TabViewList[i];
    // emitting the selection
    this.onChangeTab.emit(this.SelectedTab.value);
  }
}
