import { Component, OnInit, Input } from '@angular/core';
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
    //On mouse enter on side bar
    @Input() mouseEnter: boolean = false;
    // Store the model list objects
    model: any[] = [];
    //Store side menu content
    sideMenuItems: Module[] = [];
    //Store static side menu items
    staticMenuItems: Module[] = [{
        Id: 1,
       ModuleCode: "DSH",
       Name: "Dashboard",
       ModuleIcon: "pi pi-fw pi-home",
       RedirectUrl: "/layout/dashboard",
        IsDisable: false
      },
      {
        Id: 2,
       ModuleCode: "MD1",
       Name: "Module 1",
       ModuleIcon: "pi pi-fw pi-id-card",
       RedirectUrl: "/layout/global",
        IsDisable: false
      },
      {
        Id: 3,
       ModuleCode: "MD2",
       Name: "Module 2",
       ModuleIcon: "pi pi-fw pi-check-square",
       RedirectUrl: "/layout/dashboard",
        IsDisable: false
      },
      {
        Id: 4,
       ModuleCode: "MD3",
       Name: "Module 3",
       ModuleIcon: "pi pi-fw pi-bookmark",
       RedirectUrl: "/layout/dashboard",
        IsDisable: false
      },
      {
        Id: 5,
       ModuleCode: "MD4",
       Name: "Module 4",
       ModuleIcon: "pi pi-fw pi-exclamation-circle",
       RedirectUrl: "/layout/dashboard",
        IsDisable: false
      },
      {
        Id: 6,
       ModuleCode: "MD5",
       Name: "Module 5",
       ModuleIcon: "pi pi-fw pi-box",
       RedirectUrl: "/layout/dashboard",
        IsDisable: false
      }];
    //Store models
    commonModel: CommonModel;
    //store key
    key: string = '';
    // Constructor
    constructor(public layoutService: LayoutService, private commonService: CommonService, private menuService: MenuService) {
        this.commonModel = new CommonModel(this.commonService);
    }

    // Ng on init function
    ngOnInit() {
        // Initialize the model list
        this.getMenuItems();
        // End of Initialize the model list

        
       
    }

    //Get site menu items
    getMenuItems(){
        //call services to get menu items
        this.commonModel.GetModuleListServiceLocal().then(
            (data: Module[]) => {
                this.sideMenuItems =  data;
               
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
