import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ContratoFormPage }   from './contrato-form';
import { EnderecoProvider } from '../../../providers/endereco/endereco.provider';
import { ContratoValidate } from '../contratos.validate';

@NgModule({
  declarations: [
    ContratoFormPage
  ],
  imports: [
    IonicPageModule.forChild([ContratoFormPage]),
    TranslateModule.forChild()
  ],
  exports: [
    ContratoFormPage
  ],
  providers: [ContratoValidate, EnderecoProvider]
})
export class ContratoFormModule { }