import { Alternative } from './../../domain/alternative';
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

  @Input() alternatives: Array<Alternative>;
  @Input() questionDescription: string;

  constructor() {
    this.alternatives = new Array<Alternative>();
  }

  compareFn(a1: Alternative, a2: Alternative): boolean {
    return a1 && a2 ? a1.id === a2.id : a1 === a2;
  }

  teste(){
    console.log("teste: ",this.alternatives);
    
  }


}
