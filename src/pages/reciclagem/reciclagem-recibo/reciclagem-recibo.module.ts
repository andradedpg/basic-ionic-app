import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ReciclagemReciboPage } from './reciclagem-recibo';
import { ReciclagemProvider } from '../../../providers/reciclagem/reciclagem.provider';

@NgModule({
  declarations: [
    ReciclagemReciboPage
  ],
  imports: [
    IonicPageModule.forChild(ReciclagemReciboPage),
  ],
  providers:[
    ReciclagemProvider
  ]
})
export class ReciclagemReciboModule {}
