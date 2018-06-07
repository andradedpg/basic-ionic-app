import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReciclagemPage } from './reciclagem';
import { ParticipacaoProvider } from '../../providers/participacao/partipacao.provider';

@NgModule({
  declarations: [
    ReciclagemPage
  ],
  imports: [
    IonicPageModule.forChild(ReciclagemPage),
  ],
  providers:[
    ParticipacaoProvider
  ]
})
export class ReciclagemPageModule {}
