import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CommonModel } from '../../models/commonModel';
import { CommonService } from '../../services/common.service';


@Component({
  selector: 'app-user-roles',

  templateUrl: './user-roles.component.html',
  styleUrl: './user-roles.component.scss'
})
export class UserRolesComponent implements OnInit {

  products: any[] = [
    {
      code: 'P001',
      name: 'Product 1',
      category: 'Category 1',
      TotalRecords: 10,
    },
    {
      code: 'P002',
      name: 'Product 2',
      category: 'Category 2',
      TotalRecords: 10,
    },
    {
      code: 'P003',
      name: 'Product 3',
      category: 'Category 3',
      TotalRecords: 10,
    },
  ];

  selectedProducts!: any;

  //Store client details
  userRoles: any[] = [];
  // Store the common model
  commonModel: CommonModel;

  constructor(public ref: DynamicDialogRef, private config: DynamicDialogConfig,
    private commonService: CommonService) {
    // Initializing the model
    this.commonModel = new CommonModel(this.commonService);

    // Getting the passed data
    if (JSON.stringify(this.config.data)) {
      this.userRoles = <any[]>this.config.data;
    }
    // End of Getting the passed data
  }

  ngOnInit(): void {

  }

  //On  click cancel
  onClickCancel() {
    //Send data to component
    this.ref.close([]);
  }

  //ON click save select roles
  onClickSave() {
    //Send data to component
    this.ref.close([]);
  }


}
