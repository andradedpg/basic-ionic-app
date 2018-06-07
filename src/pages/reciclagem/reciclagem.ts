import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';

import { ParticipacaoProvider } from '../../providers/participacao/partipacao.provider';
import { Participacao } from '../../domain/participacao';

@IonicPage({
  name: 'page-reciclagem',
  segment: 'page-reciclagem/:id'
})

@Component({
  selector: 'page-reciclagem',
  templateUrl: 'reciclagem.html',
})
export class ReciclagemPage {
  evento_aberto:any;
  cec_id:any; //ClienteEventoContrato (ID) || Participacao (ID)
  participante: Participacao | false = false;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public participacaoProvider: ParticipacaoProvider,
              public alertCtrl: AlertController,
              public loadCtrl: LoadingController,
              public toastCtrl: ToastController
            ) {
      this.cec_id = this.navParams.get('id');
      this.getParticipante();    
      this.getEventoAberto();

      
  }

  ionViewDidLoad() {
    console.log('cecid: '+this.cec_id);
  }

  /** Privates */
  private getEventoAberto():any{
    if(localStorage.getItem('evento_aberto')){
      this.evento_aberto = JSON.parse(localStorage.getItem('evento_aberto'));
      return true;
    }else{
      let toast = this.toastCtrl.create({ duration: 1500 });
      let self = this;
      toast.setMessage('Selecione um evento antes de continuar!');
      toast.present();
      toast.onDidDismiss(() => {
        self.navCtrl.setRoot('HomePage');
      });
      return false;
    }
  }

  private getParticipante(){
    let load = this.loadCtrl.create({content: 'Buscando cliente...' });
    load.present();
    this.participacaoProvider.getById(this.cec_id)
                             .subscribe(result =>{
                                this.participante = result;  
                                load.dismiss();
                             });
  }


}
