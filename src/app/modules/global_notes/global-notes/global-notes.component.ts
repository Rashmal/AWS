import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-global-notes',
  templateUrl: './global-notes.component.html',
  styleUrl: './global-notes.component.scss'
})
export class GlobalNotesComponent {
  // Store the tab list
  TabViewList: SelectItem[] = [
    {
      value: "NotesAgreements",
      label: "Notes - Agreements",
    },
    {
      value: "EstimatorTasks",
      label: "Estimator Tasks",
    },
    {
      value: "CATasks",
      label: "CA Tasks",
    },
    {
      value: "PMTasks",
      label: "PM Tasks",
    },
    {
      value: "SystemEnhancement",
      label: "System Enhancement",
    },
    {
      value: "BugFixes",
      label: "Bug Fixes",
    },
    {
      value: "SystemFeatureList",
      label: "System Feature List",
    }
  ];
  // Store the tab selection
  tabSelection: SelectItem;

  // Constructor
  constructor(private route: Router) { }

  // Ng on init
  ngOnInit() {
    

    // Setting the default selection
    this.onChangeTab(this.TabViewList[0].value);
  }

  // Change function of dropdown section
  onChangeTab(selectedTab: string) {
    // Getting the object of the selected tab
    let selectedObj = this.TabViewList.find(obj => obj.value == selectedTab);
    // setting the tab selection
    this.tabSelection = selectedObj;
    // Check the selected tab
    switch (selectedTab.toUpperCase()) {
      case 'SystemEnhancement'.toUpperCase():
        this.route.navigate(['/layout/global/globalNotes/systemEnhancements']);
        break;
      case 'BugFixes'.toUpperCase():
        this.route.navigate(['/layout/global/globalNotes/bugFixes']);
        break;
      default:
        this.route.navigate(['/layout/global/globalNotes/defaultPage']);
        break;
    }
    // End of Check the selected tab
  }

}
