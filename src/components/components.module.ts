import { CheckboxComponent } from './checkbox/checkbox';
import { RadioComponent } from './radio/radio';
import { NgModule } from '@angular/core';
import { SelectListComponent } from "./select-list/select-list";
import { InputComponent } from './input/input';
import { RadioYnComponent } from './radio-yn/radio-yn';
@NgModule({
    declarations: [
        SelectListComponent,
        InputComponent,
        RadioComponent,
        RadioYnComponent,
        CheckboxComponent,
    ],
    imports: [],
    exports: [
        SelectListComponent,
        InputComponent,
        RadioComponent,
        RadioYnComponent,
        CheckboxComponent,
    ]
})
export class ComponentsModule { }
