import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff-main',
  templateUrl: './staff-main.component.html',
  styleUrl: './staff-main.component.scss'
})
export class StaffMainComponent {
  hideButton: boolean = false;
  constructor(private route: Router){}
  ngOnInit() {
    
  }

  goBackToList(){
    this.route.navigate(
      ['/layout/staff/staff_main/staff_list']
    )
  }
  checkRoute(){
    return this.route.url === '/layout/staff/staff_main/staff_list';
  }

}
