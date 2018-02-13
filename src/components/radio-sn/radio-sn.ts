import { Component } from '@angular/core';

/**
 * Generated class for the RadioSnComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'radio-sn',
  templateUrl: 'radio-sn.html'
})
export class RadioSnComponent {

  text: string;

  constructor() {
    console.log('Hello RadioSnComponent Component');
    this.text = 'Hello World';
  }

}
