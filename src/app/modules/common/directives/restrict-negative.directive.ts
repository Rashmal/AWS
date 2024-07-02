import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appRestrictNegative]'
})
export class RestrictNegativeDirective {

  @HostListener('input', ['$event'])
  onInput(event: any) {
    const inputValue = event.target.value;

    if (inputValue < 0) {
      event.target.value = 0; // Reset the input to 0 if the value is negative
    }
  }
}
