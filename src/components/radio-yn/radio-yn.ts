import { Component, Input } from '@angular/core';

/**
 * Generated class for the RadioSnComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'radio-yn',
  templateUrl: 'radio-yn.html'
})
export class RadioYnComponent {
  
  @Input() questionDescription: string;

  constructor() {
  }

}
