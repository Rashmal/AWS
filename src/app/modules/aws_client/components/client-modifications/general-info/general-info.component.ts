import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Filter } from '../../../core/filter';



@Component({
    selector: 'app-general-info',
    templateUrl: './general-info.component.html',
    styleUrl: './general-info.component.scss',
})
export class GeneralInfoComponent implements OnInit {
    modificationMode = 'NEW';
    selectedClientId = 0;
     products: any[] = [
        { code: 'P001', name: 'Product 1', category: 'Category 1', TotalRecords: 10 },
        { code: 'P002', name: 'Product 2', category: 'Category 2', TotalRecords: 10 },
        { code: 'P003', name: 'Product 3', category: 'Category 3', TotalRecords: 10 },
      ];

      cities: any[] =  [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];
      checked = true;
      //Store filter settings
    filter: Filter = {
        Type: { label: 'All', value: 'ALL' },
        Search: '',
        ItemsPerPage: 10,
        CurrentPage: 1,
    };

    constructor(private location: Location) {}

    ngOnInit(): void {
        
        // Getting the passed params
        let paramObject = this.location.getState();
        //Set editing mode
        if (paramObject['EditingMode']) {
            this.modificationMode = paramObject['EditingMode'];
        }
        //Set editing client id
        if (paramObject['ClientId']) {
            this.selectedClientId = paramObject['ClientId'];
        }
    }

    //on change module list paginator
    onPageChange(event: any) {}

}
