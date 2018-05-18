import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ContratosPage }      from './contratos';
import { ContratoFormPage }   from './contrato-form/contrato-form';
import { ContratoSearchPage } from './contrato-search/contrato-search';

import { ContratoProvider }   from './../../providers/contrato/contrato.provider';
import { ContratoValidate }   from './contratos.validate';

@NgModule({
  declarations: [
    ContratosPage,
    ContratoFormPage,
    ContratoSearchPage
  ],
  imports: [
    IonicPageModule.forChild([ContratosPage, ContratoFormPage, ContratoSearchPage]),
    TranslateModule.forChild()
  ],
  exports: [
    ContratosPage,
    ContratoFormPage, 
    ContratoSearchPage
  ],
  providers:[
    ContratoProvider,
    ContratoValidate
  ]
})
export class ContratoModule { }