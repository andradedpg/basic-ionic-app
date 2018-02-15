import { Alternative } from './../../domain/alternative';
import { Question } from './../../domain/question';
import { Component, Input } from '@angular/core';

/**
 * Generated class for the CheckboxComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'checkbox',
  templateUrl: 'checkbox.html'
})
export class CheckboxComponent {
  
  @Input() alternatives: Array<Alternative>;
  @Input() questionDescription: string;
  
  constructor() {
    console.log('Hello CheckboxComponent Component');
  }

}
