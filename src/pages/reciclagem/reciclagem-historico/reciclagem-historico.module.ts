import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ReciclagemProvider } from '../../../providers/reciclagem/reciclagem.provider';
import { ReciboProvider } from '../../../providers/reciclagem/recibo.provider';
import { ParticipacaoProvider } from '../../../providers/participacao/partipacao.provider';

import { ReciclagemHistoricoPage } from './reciclagem-historico';


@NgModule({
  declarations: [
    ReciclagemHistoricoPage
  ],
  imports: [
    IonicPageModule.forChild(ReciclagemHistoricoPage),
  ],
  providers:[
    ReciclagemProvider, ReciboProvider, ParticipacaoProvider
  ]
})
export class ReciclagemHistoricoModule {}
