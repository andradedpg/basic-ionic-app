import { FormPage } from './form-page';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    FormPage,
  ],
  imports: [
    IonicPageModule.forChild(FormPage),
  ],
  exports: [
    FormPage
  ]
})
export class FormPageModule {}
