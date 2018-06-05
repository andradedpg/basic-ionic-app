import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';

import { ParticipacaoProvider } from '../../providers/participacao/partipacao.provider';

import { Evento } from '../../domain/evento';
import { Participacao } from '../../domain/participacao';
import { ReciclagemPage } from '../reciclagem/reciclagem';
import { ContratoSearchPage } from '../contratos/contrato-search/contrato-search';

//@IonicPage()
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
              public loading: LoadingController,
              public alertCtrl: AlertController,
              public participacaoProvider: ParticipacaoProvider) {
      
      this.searchControl = new FormControl();     
      this.getEventoAberto();
      this.acoes();
  }

  ionViewDidLoad() {
    this.setFilteredItems();
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {    
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
            this.searching     = false;
        })
    }else{
        this.participacoes = false;
        this.searching     = false;
    }  
  }

  acoes() {
    this.buttons = [
        {nome:'Remover', icon:'cancel', color:'danger', action:'remover' },
        {nome:'Reciclar', icon:'ios-git-compare', color:'lightrecicla', action:'reciclar'}
    ];  
  }

  buttonClicked(button:any, participante:Participacao): void{
    if(button.action === 'remover')  this.removerParticipante(participante); 
    if(button.action === 'reciclar') this.reciclar(participante); 
  }

  reciclar(participante:Participacao): void{
    this.navCtrl.push(ReciclagemPage, {'id':participante.id});
  }

  removerParticipante(participante:any){
    let alert = this.alertCtrl.create({
      title: 'CONFIRMAR REMOÇÃO',
      message: 'Remover '+participante.cliente.nome+' <br /> do evento <br />'+this.evento_aberto.acao.nome+' - '+this.evento_aberto.local.nome,
      buttons: [
        {
          text: 'VOLTAR',
          role: 'cancel',
          handler: () => { }
        },
        {
          text: 'REMOVER',
          handler: () => {
            var load  = this.loading.create({content: 'Removendo participante...'});
            let toast = this.toastCtrl.create({ duration: 2000 });
            load.present();

            this.participacaoProvider.removerParticipante(participante).then(function(result:any){  
              load.dismiss();
              toast.setMessage(result.success);
              toast.present();
            }).catch(function(reject){
              if(reject.status === 500){
                load.dismiss();
                toast.setMessage(reject.msg);
                toast.present();
              }
            });
            
          }
        }
      ]
    });
    alert.present();
  }

  goToContratos(){
    this.navCtrl.push(ContratoSearchPage, {});
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
