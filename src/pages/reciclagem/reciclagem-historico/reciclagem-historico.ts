import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';

import { ReciclagemProvider } from '../../../providers/reciclagem/reciclagem.provider';
import { ReciboProvider } from '../../../providers/reciclagem/recibo.provider';
import { ParticipacaoProvider } from '../../../providers/participacao/partipacao.provider';

import { Reciclagem } from '../../../domain/reciclagem';
import { ParticipacaoPage } from '../../participacao/participacao';

@IonicPage({
  name: 'page-reciclagem-historico',
  segment: 'page-reciclagem-historico/:id'
})

@Component({
  selector: 'page-reciclagem-historico',
  templateUrl: 'reciclagem-historico.html',
})
export class ReciclagemHistoricoPage {
  evento_aberto:any;
  participante: any | false = false;
  reciclagens: any | false = false;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public reciclagemProvider: ReciclagemProvider,
              public participacaoProvider: ParticipacaoProvider,
              public reciboProvider: ReciboProvider,
              public alertCtrl: AlertController,
              public loadCtrl: LoadingController,
              public toastCtrl: ToastController
            ) {
      this.getParticipante(this.navParams.get('id'));        
      this.getReciclagems(this.navParams.get('id'));
  }

  enviarRecibo(tipo:string){
    if(tipo === 'EMAIL') this.promptEmail();
    if(tipo === 'SMS')   this.promptSMS();
  }

  goToParticipacao(){
    this.navCtrl.popTo(ParticipacaoPage);
  }

  /* Privates */
  private getParticipante(participacao_id){
    let load  = this.loadCtrl.create({content: 'Buscando dados do Cliente...'});
    load.present();

    this.participacaoProvider.getById(participacao_id).subscribe(participante =>{
      this.participante = participante;
      load.dismiss();
    });
  }

  private getReciclagems(participacao_id){
    let load  = this.loadCtrl.create({content: 'Buscando reciclagems...'});
    load.present();

    this.reciclagemProvider.getByParticipacao(participacao_id).subscribe(reciclagens =>{
      this.reciclagens = reciclagens;
      console.log(this.reciclagens);
      load.dismiss();
    });
  }

  private promptEmail(){
    let alert = this.alertCtrl.create({
      title: 'Recibo via E-mail',
      inputs: [
        {
          name: 'email',
          placeholder: 'email@provedor.com',
          value: ''//this.reciclagem.participacao.cliente.email
        }
      ],
      buttons: [
        {
          text: 'Desistir',
          role: 'cancel'
        },
        {
          text: 'ENVIAR',
          handler: data => {
            if (data.email !== '') {
              //this.reciboProvider.enviarEmail(this.reciclagem);
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
    let alert = this.alertCtrl.create({
      title: 'Recibo SMS',
      inputs: [
        {
          name: 'celular',
          placeholder: '99 99999 9999',
          value:''// this.reciclagem.participacao.cliente.celular
        }
      ],
      buttons: [
        {
          text: 'Desistir',
          role: 'cancel'
        },
        {
          text: 'ENVIAR',
          handler: data => {
            if (data.celular !== '') {
              /*
              let load  = this.loadCtrl.create({content: 'Buscando reciclagem...'});
              load.present();
              this.reciclagem.data = new Date();
              this.reciboProvider.enviarSMS(this.reciclagem, data.celular).subscribe(result => {
                console.log(result);
                load.dismiss();
              });
              */
            } else {
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }

}
