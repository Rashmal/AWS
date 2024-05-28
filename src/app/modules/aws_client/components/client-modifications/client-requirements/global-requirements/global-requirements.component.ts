import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Filter } from 'src/app/modules/aws_client/core/filter';

@Component({
    selector: 'app-global-requirements',
    templateUrl: './global-requirements.component.html',
    styleUrl: './global-requirements.component.scss',
})
export class GlobalRequirementsComponent {
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

    //On  click cancel
    onClickCancel() {
        //Send data to component
        this.ref.close([]);
    }

    //on change module list paginator
    onPageChange(event: any) {}
}
