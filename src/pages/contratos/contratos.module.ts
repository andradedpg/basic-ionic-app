import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ContratoFormModule } from './contrato-form/contrato-form.module';

import { ContratosPage }      from './contratos';
import { ContratoSearchPage } from './contrato-search/contrato-search';
import { ContratoProvider }   from './../../providers/contrato/contrato.provider';

@NgModule({
  declarations: [
    ContratosPage,
    ContratoSearchPage
  ],
  imports: [
    IonicPageModule.forChild([ContratosPage, ContratoSearchPage]),
    TranslateModule.forChild(),
    ContratoFormModule
  ],
  exports: [
    ContratosPage,
    ContratoSearchPage
  ],
  providers:[ ContratoProvider ]
})
export class ContratoModule { }