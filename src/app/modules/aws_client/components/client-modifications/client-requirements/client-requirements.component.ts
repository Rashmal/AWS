import { Component } from '@angular/core';
import { Filter } from '../../../core/filter';

@Component({
  selector: 'app-client-requirements',
  templateUrl: './client-requirements.component.html',
  styleUrl: './client-requirements.component.scss'
})
export class ClientRequirementsComponent {
  editingItem_index = -1;
  products: any[] = [
    { code: 'P001', name: 'Product 1', category: 'Category 1', TotalRecords: 10 },
    { code: 'P002', name: 'Product 2', category: 'Category 2', TotalRecords: 10 },
    { code: 'P003', name: 'Product 3', category: 'Category 3', TotalRecords: 10 },
  ];
   //Store filter settings
   filter: Filter = {
    Type: { label: 'All', value: 'ALL' },
    Search: '',
    ItemsPerPage: 10,
    CurrentPage: 1,
};

//On enter editing editor
enterEditingItem(index: number){
  this.editingItem_index = index;
}

//On leave editing editor
enterLeaveItem(){
  this.editingItem_index = -1;
}

 //on change module list paginator
 onPageChange(event: any) {}

}
