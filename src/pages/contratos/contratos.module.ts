import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ContratosPage } from './contratos';
import { ContratoAddPage } from './contrato-add/contrato-add';

@NgModule({
  declarations: [
    ContratosPage,
    ContratoAddPage
  ],
  imports: [
    IonicPageModule.forChild([ContratosPage, ContratoAddPage]),
    TranslateModule.forChild()
  ],
  exports: [
    ContratosPage,
    ContratoAddPage
  ]
})
export class ContratoModule { }