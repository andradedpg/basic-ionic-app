import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';

import { ParticipacaoProvider } from '../../../providers/participacao/partipacao.provider';
import { ReciclagemProvider } from '../../../providers/reciclagem/reciclagem.provider';
import { ReciboProvider } from '../../../providers/reciclagem/recibo.provider';
import { CampanhaProvider } from '../../../providers/campanhas/campanha.provider';

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
  campanhas:boolean | any = false;
  showCampanhas:boolean = false;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public participacaoProvider: ParticipacaoProvider,
              public reciclagemProvider: ReciclagemProvider,
              public reciboProvider: ReciboProvider,
              public campanhaProvider: CampanhaProvider,
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

  participarCampanha(campanha_id){
    let reciclagem_id:number = this.reciclagem.id;
    let contrato_id:number = this.reciclagem.participacao.contrato_id;

    this.campanhaProvider.participar(contrato_id, campanha_id, reciclagem_id).then((success:any) => {
      this.alertInfo('Participação realizada!');
      this.showCampanhas = false;
    }); 
  }

  /* Privates */
  private getReciclagem(reciclagem_id){
    let load  = this.loadCtrl.create({content: 'Buscando reciclagem...'});
    load.present();

    this.reciclagemProvider.getById(reciclagem_id).subscribe(reciclagem =>{
      this.reciclagem = reciclagem;
      this.getCampanhasAtivas();

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
          value: this.reciclagem.participacao.cliente.email
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
              let load  = this.loadCtrl.create({content: 'Enviando E-mail...'});
              load.present();
              this.reciboProvider.enviarEmail(this.reciclagem, data.email).then((success) =>{
                load.dismiss();
                console.log('sucesso:', success);
              }).catch((reject)=>{
                load.dismiss();
                console.log('error:', reject);
              })
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
          value: this.reciclagem.participacao.cliente.celular
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
              let load  = this.loadCtrl.create({content: 'Enviando SMS...'});
              load.present();
              this.reciclagem.data = new Date();
              this.reciboProvider.enviarSMS(this.reciclagem, data.celular).subscribe((retorno:any) => {
                load.dismiss();
                let toast = this.toastCtrl.create({ duration: 1500 });
                let msg = (retorno._body === '000') ? 'SMS Enviado com Sucesso!' : 'Falha no Envio! Tente mais tarde';

                toast.setMessage(msg);
                toast.present();
              });
            } else {
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }

  private getCampanhasAtivas(){
    this.campanhaProvider.getAtivasByContrato(this.reciclagem.participacao.contrato).subscribe((retorno:any) => {
      if(retorno !== null){
        this.showCampanhas = true;
        this.campanhas     = retorno;
      }
    });    
  }

  private alertInfo(msg:string):void{
    let toast = this.toastCtrl.create({ duration: 2000 }); 
    
    toast.setMessage(msg);
    toast.present();
  
  }

}
