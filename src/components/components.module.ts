import { NgModule } from '@angular/core';
import { SelectListComponent } from "./select-list/select-list";
import { InputComponent } from './input/input';
import { RadioSnComponent } from './radio-sn/radio-sn';
@NgModule({
	declarations: [SelectListComponent,
    InputComponent,
    RadioSnComponent],
	imports: [],
	exports: [SelectListComponent,
    InputComponent,
    RadioSnComponent]
})
export class ComponentsModule {}
