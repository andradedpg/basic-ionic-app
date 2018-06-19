import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';

import { ParticipacaoProvider } from '../../../providers/participacao/partipacao.provider';
import { ReciclagemProvider } from '../../../providers/reciclagem/reciclagem.provider';

import { Reciclagem } from '../../../domain/reciclagem';
import { ParticipacaoPage } from '../../participacao/participacao';

@IonicPage({
  name: 'page-reciclagem-recibo',
  segment: 'page-reciclagem-recibo/:id'
})

@Component({
  selector: 'page-reciclagem-recibo',
  templateUrl: 'reciclagem-recibo.html',
})
export class ReciclagemReciboPage {
  evento_aberto:any;
  reciclagem: any | false = false;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public participacaoProvider: ParticipacaoProvider,
              public reciclagemProvider: ReciclagemProvider,
              public alertCtrl: AlertController,
              public loadCtrl: LoadingController,
              public toastCtrl: ToastController
            ) {
      this.getReciclagem(this.navParams.get('id'));

  }

  enviarRecibo(tipo:string){
    if(tipo === 'EMAIL') this.promptEmail();
    if(tipo === 'SMS')   this.promptSMS();
  }

  goToParticipacao(){
    this.navCtrl.push(ParticipacaoPage);
  }

  /* Privates */
  private getReciclagem(reciclagem_id){
    let load  = this.loadCtrl.create({content: 'Buscando reciclagem...'});
    load.present();

    this.reciclagemProvider.getById(reciclagem_id).subscribe(reciclagem =>{
      this.reciclagem = reciclagem;
      console.log(this.reciclagem);
      load.dismiss();
    });
  }

  private promptEmail(){
    let alert = this.alertCtrl.create({
      title: 'Recibo via E-mail',
      inputs: [
        {
          name: 'email',
          placeholder: 'email@provedor.com'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
          }
        },
        {
          text: 'ENVIAR',
          handler: data => {
            if (data.email !== '') {
              
            } else {
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }

  private promptSMS(){

  }

}
