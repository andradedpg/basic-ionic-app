import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormControl } from '@angular/forms';

import { ParticipacaoProvider } from '../../providers/participacao/partipacao.provider';

import { Evento } from '../../domain/evento';
import { Participacao } from '../../domain/participacao';
import { ReciclagemPage } from '../reciclagem/reciclagem';

@IonicPage()
@Component({
  selector: 'page-participacao',
  templateUrl: 'participacao.html',
})
export class ParticipacaoPage {
  evento_aberto: Evento;
  participacoes: any;

  searchTerm: string = '';
  searchControl: FormControl;
  searching: any = false;

  buttons:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public participacaoProvider: ParticipacaoProvider  ) {
      this.searchControl = new FormControl();          
      this.getEventoAberto();
      this.acoes();
  }

  ionViewDidLoad() {
    this.setFilteredItems();
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
        this.searching = false;
        this.setFilteredItems();
    });
  }

  onSearchInput(){
    this.searching = true;
  }

  setFilteredItems() {
    if(this.searchTerm != ''){
        let busca = this.participacaoProvider.searchInEvento(this.evento_aberto, this.searchTerm.toUpperCase());
        busca.subscribe(result => {
            this.participacoes = result as Participacao[];
        })
    }else{
        this.participacoes = false;
    }
    
  }

  acoes() {
    this.buttons = [
        {nome:'Remover', icon:'cancel', color:'danger', pageDestino: ReciclagemPage},
        {nome:'Reciclar', icon:'ios-git-compare', color:'lightrecicla', pageDestino:ReciclagemPage}
    ];
}

  /* Privates  */
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
  

}
