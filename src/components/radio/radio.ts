import { Alternative } from './../../domain/alternative';
import { Component, Input } from '@angular/core';

/**
 * Generated class for the RadioComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */@Component({
  selector: 'radio',
  templateUrl: 'radio.html'
})
export class RadioComponent {

  @Input() alternatives: Array<Alternative>;
  @Input() questionDescription: string;
  
  constructor() {
    console.log('Hello RadioComponent Component');
  }

}
