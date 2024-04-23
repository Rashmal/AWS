import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';
import { Module } from 'src/app/modules/common/core/module';
import { CommonModel } from 'src/app/modules/common/models/commonModel';
import { CommonService } from 'src/app/modules/common/services/common.service';
import { MenuService } from '../app.menu.service';

@Component({
  selector: 'app-new-side-bar',
  templateUrl: './new-side-bar.component.html',
  styleUrl: './new-side-bar.component.scss',
})
export class NewSideBarComponent implements OnInit {
  // On mouse enter on side bar
  @Input() mouseEnter: boolean = false;
  // Store notification count
  @Input() ttlNotCount: number = 0;
  // Store the model list objects
  model: any[] = [];
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
  //Store models
  commonModel: CommonModel;
  //store key
  key: string = '';
  // Constructor
  constructor(public layoutService: LayoutService, private commonService: CommonService, private menuService: MenuService, public el: ElementRef) {
    this.commonModel = new CommonModel(this.commonService);
  }

  // Ng on init function
  ngOnInit() {
    // Initialize the model list
    this.getMenuItems();
    // End of Initialize the model list
  }

  //Get site menu items
  getMenuItems() {
    //call services to get menu items
    this.commonModel.GetModuleListService().then(
      (data: Module[]) => {
        this.sideMenuItems = data;

      }
    );
  }

  itemClick(event: Event, item?: any) {
    // avoid processing disabled items
    if (item.IsDisable) {
      event.preventDefault();
      return;
    }



    this.menuService.onMenuStateChange({ key: this.key });
  }
}
