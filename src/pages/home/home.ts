// import { Chart } from 'chart.js';
import { IonicPage, NavController,  NavParams, ModalController, LoadingController, AlertController } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { HttpService } from './../../providers/http-service';

import { UserProvider } from './../../providers/user/user.provider';
import { EventoProvider } from '../../providers/evento/evento.provider';
import { Evento } from '../../domain/evento';

import { User } from './../../domain/user';

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

  constructor(public navCtrl: NavController, 
              public modalCtrl: ModalController, 
              private _loading: LoadingController,
              private _alertCtrl: AlertController,
              public http: HttpService,
              private userProvider: UserProvider,
              private eventoProvider: EventoProvider
              ) {  }

  ionViewDidLoad() {
    let loading = this._loading.create({content: 'Resgantando seus dados...'});
    loading.present();

    this.userProvider.getUserAuth().subscribe((user) => {
      this.usuario = user as User;
      this.loaded = true;
      loading.dismiss();
    },
    (error) => {
      console.log('userProvider error : ' + error);
    });

    this.checkEventoAberto();
  }

  abrirEvento(id){
    let alert = this._alertCtrl.create({
      title: 'Confirmar Abertura',
      subTitle: ' Evento TAL será aberto agora',
      buttons: [
        {
          text: 'Desistir',
          role: 'voltar'
        },
        {
          text: 'CONFIRMAR',
          handler: () => {
            // Abrir evento e por em localStorage()
            console.log('Ir Para reciclagem');
          }
        }
      ]
    });
    alert.present();
  }

  /* Privates */

  private checkEventoAberto(){
    if(localStorage.getItem('evento_aberto')){
      this.evento_aberto = true;
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

    console.log(this.eventos);
  }

}