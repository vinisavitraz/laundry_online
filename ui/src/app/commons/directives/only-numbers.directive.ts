import {Directive, HostListener} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";

@Directive({
  selector: '[onlyNumbers]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: OnlyNumbersDirective,
    multi: true,
  }],
})
export class OnlyNumbersDirective {

  constructor() { }

  @HostListener('keyup', ['$event'])
  onKeyUp($event: any) {
    let valor: any = $event.target.value;

    valor = valor.replace(/[\D]/g, '');

    $event.target.value = valor;
  }
}
