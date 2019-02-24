import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ReciclagemReciboPage } from './reciclagem-recibo';
import { ReciclagemProvider } from '../../../providers/reciclagem/reciclagem.provider';
import { ReciboProvider } from '../../../providers/reciclagem/recibo.provider';
import { CampanhaProvider } from '../../../providers/campanhas/campanha.provider';

@NgModule({
  declarations: [
    ReciclagemReciboPage
  ],
  imports: [
    IonicPageModule.forChild(ReciclagemReciboPage),
  ],
  providers:[
    ReciclagemProvider, ReciboProvider, CampanhaProvider
  ]
})
export class ReciclagemReciboModule {}
