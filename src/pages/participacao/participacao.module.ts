import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParticipacaoPage } from './participacao';
import { ParticipacaoProvider } from '../../providers/participacao/partipacao.provider';

@NgModule({
  declarations: [
    ParticipacaoPage,
  ],
  imports: [
    IonicPageModule.forChild(ParticipacaoPage),
  ],
  providers: [ParticipacaoProvider]
})
export class ParticipacaoPageModule {}
