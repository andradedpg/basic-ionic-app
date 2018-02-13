import { Question } from './../../domain/question';
import { Component, Input } from '@angular/core';

/**
 * Generated class for the DropdownlistComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'select-list',
  templateUrl: 'select-list.html'
})
export class SelectListComponent {
  
  @Input() question: Question;
  
  constructor() {
    console.log('Hello SelectListComponent Component');
  }

}
