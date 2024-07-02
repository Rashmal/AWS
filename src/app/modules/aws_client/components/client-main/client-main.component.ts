import { Component } from '@angular/core';
import {Router } from '@angular/router';


@Component({
  selector: 'app-client-main',
  templateUrl: './client-main.component.html',
  styleUrl: './client-main.component.scss'
})
export class ClientMainComponent {

  hideButton: boolean = false;

  // Constructor
  constructor(private route: Router){}
  ngOnInit() {
    
  }

  

  goBackToList(){
    this.route.navigate(
      ['/layout/client/client_main/client_list']
    )
  }
  checkRoute(){
    return this.route.url === '/layout/client/client_main/client_list';
  }
   
}
