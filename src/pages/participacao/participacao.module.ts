import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParticipacaoPage } from './participacao';
import { ParticipacaoProvider } from '../../providers/participacao/partipacao.provider';
import { ContratoSearchPage } from '../contratos/contrato-search/contrato-search';
import { ContratoProvider } from '../../providers/contrato/contrato.provider';


@NgModule({
  declarations: [
    ParticipacaoPage,
  ],
  imports: [
    IonicPageModule.forChild([ParticipacaoPage, ContratoSearchPage]),
  ],
  providers: [ParticipacaoProvider, ContratoProvider]
})
export class ParticipacaoPageModule {}
