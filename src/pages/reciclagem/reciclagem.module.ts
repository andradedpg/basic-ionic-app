import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReciclagemPage } from './reciclagem';

import { ParticipacaoProvider } from '../../providers/participacao/partipacao.provider';
import { ResiduoProvider } from '../../providers/reciclagem/residuo.provider';
import { ReciclagemProvider } from '../../providers/reciclagem/reciclagem.provider';

@NgModule({
  declarations: [
    ReciclagemPage
  ],
  imports: [
    IonicPageModule.forChild(ReciclagemPage),
  ],
  providers:[
    ParticipacaoProvider, ResiduoProvider, ReciclagemProvider
  ]
})
export class ReciclagemPageModule {}
