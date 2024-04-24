import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appNumberValidation]'
})
export class NumberValidationDirective {

  constructor() { }

  @Input('appNumberValidation') e:any;

  @HostListener('input', ['$event'])
  onInputChange(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const sanitized = input.value.replace(/[^(0-9)]*/g, '');

    input.value = sanitized;
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const input = event.target as HTMLInputElement;
    input.value = '';
  }

}
