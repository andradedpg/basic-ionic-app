import { RadioYnComponent } from './../../components/radio-yn/radio-yn';
import { RadioComponent } from './../../components/radio/radio';
import { CheckboxComponent } from './../../components/checkbox/checkbox';
import { InputComponent } from './../../components/input/input';
import { SelectListComponent } from './../../components/select-list/select-list';
import { FormPage } from './form-page';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    FormPage,
  ],
  imports: [
    IonicPageModule.forChild(FormPage),
    SelectListComponent,
    InputComponent,
    CheckboxComponent,
    RadioComponent,
    RadioYnComponent
  ],
  exports: [
    FormPage,
  ]
})
export class FormPageModule {}
