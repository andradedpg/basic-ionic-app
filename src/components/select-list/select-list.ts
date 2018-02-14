import { Alternatives } from './../../domain/alternatives';
import { Question } from './../../domain/question';
import { Component, Input, EventEmitter, Output } from '@angular/core';

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
  
  @Input() alternatives: Alternatives;
  @Input() questionDescription : string;
  
  constructor() {
    console.log(this.alternatives);
    console.log(this.questionDescription);
  }
  
  teste(){
    console.log("entrou");
  }


}
