import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonStaffService {

  // Store the common methods
  selectedStaffFunc: (value: number) => void;

  constructor() { }

  // Assigning the method
  executeSelectedStaffFunc(fn: () => void) {
    this.selectedStaffFunc = fn;
  }
}
