import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';

import { ReciclagemProvider } from '../../../providers/reciclagem/reciclagem.provider';
import { ReciboProvider } from '../../../providers/reciclagem/recibo.provider';
import { ParticipacaoProvider } from '../../../providers/participacao/partipacao.provider';

//import { Reciclagem } from '../../../domain/reciclagem';
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

  enviarRecibo(tipo:string, reciclagem_id){
    if(tipo === 'EMAIL') this.prompt(reciclagem_id, 'email');
    if(tipo === 'SMS')   this.prompt(reciclagem_id, 'sms');
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
      load.dismiss();
    });
  }

  private prompt(reciclagem_id, forma:string){
    this.reciclagemProvider.getById(reciclagem_id)  
                           .subscribe(reciclagem => {
                              this.showPrompt(reciclagem, forma);              
                           });
  }

  private showPrompt(reciclagem, forma:string){
    let title, input, placeholder, inputvalue;
    if(forma === 'email'){
      title = 'E-mail';
      input = 'email';
      placeholder = 'email@provedor.com';
      inputvalue = reciclagem.participacao.cliente.celular;
    }else if(forma === 'sms'){
      title = 'SMS';
      input = 'celular';
      placeholder = '99 9 9999 9999';
      inputvalue = reciclagem.participacao.cliente.celular;
    }

    let alert = this.alertCtrl.create({
      title: 'Recibo via '+title,
      inputs: [
        {
          name: input,
          placeholder: placeholder,
          value: inputvalue
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
            let self = this;
            if(forma === 'email'){
              if (data.email !== '') {
                let load  = this.loadCtrl.create({content: 'Enviando E-mail...'});
                load.present();
                this.reciboProvider.enviarEmail(reciclagem, data.email).then((success) =>{
                  load.dismiss();
                  console.log('sucesso:', success);
                }).catch((reject)=>{
                  load.dismiss();
                  console.log('error:', reject);
                })
              } else {
                return false;
              }
            }else if(forma === 'sms'){
              if (data.celular !== '') {
                let load  = this.loadCtrl.create({content: 'Enviando SMS...'});
                let mobile = data.celular;
                load.present();
                reciclagem.data = new Date();
                
                let send = this.reciboProvider.enviarSMS(reciclagem, mobile);
                if(send){
                  load.dismiss();  
                  let toast = this.toastCtrl.create({ duration: 1500 });

                  toast.setMessage('SMS Enviado com Sucesso!');
                  toast.present();
                }else{
                  load.dismiss();
                  
                  let toast = this.toastCtrl.create({ duration: 1500 });
                  toast.setMessage('Houve um erro ao enviar o SMS :(');
                  toast.present();
                }

              } else {
                return false;
              }
            }
            
          }
        }
      ]
    });

    alert.present();
  }

}
