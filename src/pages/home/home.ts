// import { Chart } from 'chart.js';
import { IonicPage, NavController,  NavParams, ModalController, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { HttpService } from './../../providers/http-service';

import { UserProvider } from './../../providers/user/user.provider';
import { EventoProvider } from '../../providers/evento/evento.provider';
import { Evento } from '../../domain/evento';

import { User } from './../../domain/user';
import { ParticipacaoPage } from '../participacao/participacao';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  public usuario: User;
  public loaded: boolean = false;

  public evento_aberto:any;
  public eventos: Array<Evento> = [];
  
  public eventos_abertos: any;
  public eventos_fechados: any;

  constructor(public navCtrl: NavController, 
              public modalCtrl: ModalController, 
              public toastCtrl: ToastController, 
              private _loading: LoadingController,
              private _alertCtrl: AlertController,
              public http: HttpService,
              private userProvider: UserProvider,
              private eventoProvider: EventoProvider
              ) { this.checkEventoAberto(); }

  ionViewDidLoad() {
    let loading = this._loading.create({content: 'Resgatando seus dados...'});
    loading.present();

    this.userProvider.getUserAuth().subscribe((user) => {
      this.usuario = user as User;
      this.loaded = true;
      loading.dismiss();
    },
    (error) => {
      console.log('userProvider error : ' + error);
    });
  }

  goParticipacao() {
    this.navCtrl.push(ParticipacaoPage, {
    });
  }

  fecharEvento(){
    let alert = this._alertCtrl.create({
      title: 'Confirmar Fechamento',
      subTitle: this.evento_aberto.acao.nome+' ('+this.evento_aberto.local.nome+') será fechado agora.',
      buttons: [
        {
          text: 'Desistir',
          role: 'voltar'
        },
        {
          text: 'CONFIRMAR',
          handler: () => {            
            let load = this._loading.create({content : 'Fechando evento ...'});
            load.present();

            this.evento_aberto.status = 'F';  
            this.eventoProvider.update(this.evento_aberto).then((success) => {
              localStorage.removeItem('evento_aberto');
              load.dismiss();
              this.reload('Evento fechado! Recarregando ambiente...');
            });
          }
        }
      ]
    });
    alert.present();
  }

  setEvento(id){
    let evento = this.eventos.find(evento => evento.id == id);
    let msg = (evento.status === 'A') ? 'Selecionando evento...' : 'Abrindo e selecionando evento...';

    let alert = this._alertCtrl.create({
      title: 'Confirmar Abertura',
      subTitle: evento.acao.nome+' ('+evento.local.nome+') será aberto agora.',
      buttons: [
        {
          text: 'Desistir',
          role: 'voltar'
        },
        {
          text: 'CONFIRMAR',
          handler: () => {            
            let load   = this._loading.create({content : msg});
            load.present();

            if(evento.status === 'F'){
              evento.status = 'C';  
              this.eventoProvider.update(evento).then((success) => {
                /* Caso já exista um evento aberto */
                localStorage.removeItem('evento_aberto');
                localStorage.setItem('evento_aberto', JSON.stringify(evento));
                load.dismiss();
                this.reload('Evento selecionado! Recarregando ambiente');
              })
            }else{
              localStorage.setItem('evento_aberto', JSON.stringify(evento));
              load.dismiss();
              this.reload('Evento selecionado! Recarregando ambiente');
            }
          }
        }
      ]
    });
    alert.present();
  }

  /* Privates */

  private checkEventoAberto(){
    if(localStorage.getItem('evento_aberto')){
      this.evento_aberto = JSON.parse(localStorage.getItem('evento_aberto'));
    }else{
      this.eventoProvider.getDisponiveis().subscribe((eventos) => {
        this.formatEventos(eventos);
      })
    }
  }

  private formatEventos(data: any){
    for(var item in data){
      var evento = new Evento();
      
      evento.id     = data[item].id;
      evento.acao   = data[item].acao;
      evento.local  = data[item].localidade; 
      evento.status = data[item].status;

      this.eventos.push(evento);
    }
    
    this.eventos_abertos  = this.divideEventos('C');
    this.eventos_fechados = this.divideEventos('F');
  }

  private divideEventos(status:string){
    let eventos = this.eventos.filter(evento => evento.status === status);
    return (eventos.length > 0) ? eventos : false;
  }

  private reload(mensagem:string){
    let toast = this.toastCtrl.create({ duration: 1500 });
    let self = this;

    toast.setMessage(mensagem);
    toast.present();
    toast.onDidDismiss(() => {
      self.navCtrl.setRoot(HomePage);
    });
  }

}