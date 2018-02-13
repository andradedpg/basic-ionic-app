import { Question } from './../../domain/question';
import { Component, Input } from '@angular/core';

/**
 * Generated class for the InputComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'input',
  templateUrl: 'input.html'
})
export class InputComponent {

  @Input() question: Question;

  constructor() {
    console.log('Hello InputComponent Component');
  }

}
