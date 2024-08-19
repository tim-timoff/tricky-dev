import { Directive } from '@angular/core';

@Directive({
  selector: 'tricky-tag[trickyCheckAllTag]',
  standalone: true,
})
export class CheckAllTagDirective {}
