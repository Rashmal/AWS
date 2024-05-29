import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Filter } from 'src/app/modules/aws_client/core/filter';

@Component({
    selector: 'app-config-resource-type',
    templateUrl: './config-resource-type.component.html',
    styleUrl: './config-resource-type.component.scss',
})
export class ConfigResourceTypeComponent implements OnInit {
    products: any[] = [
        {
            Id: 1,
            code: 'P001',
            name: 'Product 1',
            category: 'Category 1',
            TotalRecords: 10,
        },
        {
            Id: 2,
            code: 'P002',
            name: 'Product 2',
            category: 'Category 2',
            TotalRecords: 10,
        },
        {
            Id: 3,
            code: 'P003',
            name: 'Product 3',
            category: 'Category 3',
            TotalRecords: 10,
        },
    ];

    //Store filter settings
    filter: Filter = {
        Type: { label: 'All', value: 'ALL' },
        Search: '',
        ItemsPerPage: 10,
        CurrentPage: 1,
    };
    selectedProducts!: any;

    constructor(
        public ref: DynamicDialogRef,
        private config: DynamicDialogConfig
    ) {}

    ngOnInit(): void {
        //Add empty one on initializing
        this.products.push({
            Id: 0,
            code: '',
            name: '',
            category: '',
            TotalRecords: 10,
        });
    }

    //Store editing index
    editingIndex = -1;
    //On  click cancel
    onClickCancel() {
        //Send data to component
        this.ref.close([]);
    }

    //on change module list paginator
    onPageChange(event: any) {}

    //On click edit item
    onClickEditItem(index: number) {
        this.editingIndex = index;
    }

    //On click update items
    onClickUpdateItem() {
        this.editingIndex = -1;
    }

    //On click add new
    onClickAddNew(){
      
    }
}
