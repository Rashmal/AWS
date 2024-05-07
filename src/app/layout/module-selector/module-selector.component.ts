import { Component } from '@angular/core';

@Component({
  selector: 'app-module-selector',
  templateUrl: './module-selector.component.html',
  styleUrl: './module-selector.component.scss'
})
export class ModuleSelectorComponent {
  numbers: number[] = [];
  constructor(){
    this.numbers = Array.from({length: 50}, (_, i) => i + 1);
  }
  
}
