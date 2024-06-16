import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonClientService {

  // Store the common methods
  selectedClientFunc: (value: number) => void;
  selectedStaffFunc: (value: string) => void;

  constructor() { }

  // Assigning the method
  executeSelectedClientFunc(fn: () => void) {
    this.selectedClientFunc = fn;
  }
  executeSelectedStaffFunc(fn: () => void) {
    this.selectedStaffFunc = fn;
  }
}
