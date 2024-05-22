import { Component } from '@angular/core';
import { Client } from '../../core/client';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss'
})
export class ClientListComponent {
  //Store clients
  clientList: Client[] = [];
  

  
}
