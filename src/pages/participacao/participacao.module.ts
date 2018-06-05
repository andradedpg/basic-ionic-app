import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParticipacaoPage } from './participacao';
import { ParticipacaoProvider } from '../../providers/participacao/partipacao.provider';
import { ContratoSearchPage } from '../contratos/contrato-search/contrato-search';


@NgModule({
  declarations: [
    ParticipacaoPage,
  ],
  imports: [
    IonicPageModule.forChild([ParticipacaoPage, ContratoSearchPage]),
  ],
  providers: [ParticipacaoProvider]
})
export class ParticipacaoPageModule {}
