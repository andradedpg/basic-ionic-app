import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';

import { ParticipacaoProvider } from '../../providers/participacao/partipacao.provider';

import { Evento } from '../../domain/evento';
import { Participacao } from '../../domain/participacao';
import { ReciclagemPage } from '../reciclagem/reciclagem';
import { ContratoSearchPage } from '../contratos/contrato-search/contrato-search';
import { ContratoProvider } from '../../providers/contrato/contrato.provider';
import { ReciclagemHistoricoPage } from '../reciclagem/reciclagem-historico/reciclagem-historico';

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
              public participacaoProvider: ParticipacaoProvider,
              public contratoProvider: ContratoProvider) {
      
      if(this.navParams.get('id') !== undefined && this.navParams.get('id') > 0){
        let load  = this.loading.create({content: 'Consultados dados...'});
        load.present();

        this.contratoProvider.getById(this.navParams.get('id'))
                             .subscribe(contrato => {
                                this.getEventoAberto();
                                load.dismiss();
                                this.adicionarParticipante(contrato);
                             });
      } 
      
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
      {nome:'Reciclar', icon:'git-compare', color:'lightrecicla', action:'reciclar'},
      {nome:'Histórico', icon:'stats', color:'primary', action:'historico'},
      {nome:'Remover', icon:'close', color:'danger', action:'remover' }
    ];  
  }

  buttonClicked(button:any, participante:Participacao): void{
    if(button.action === 'remover')   this.removerParticipante(participante); 
    if(button.action === 'reciclar')  this.goTo('reciclar', participante); 
    if(button.action === 'historico') this.goTo('historico', participante);
  }
  
  goTo(local:string, participante:any | Participacao): void{
    switch(local){
      case 'contratos':
        this.navCtrl.push(ContratoSearchPage, {});
        break;
      case 'historico':
        this.navCtrl.push(ReciclagemHistoricoPage, {'id':participante.id});
        break;
      case 'reciclar':
        this.navCtrl.push(ReciclagemPage, {'id':participante.id});
        break;  
    }
    
  }

  adicionarParticipante(contrato:any){
    let load  = this.loading.create({content: 'Adicionando participante...'});
    let toast = this.toastCtrl.create({ duration: 2000 });
    let self  = this;
    load.present();
    
    let participacao:any = {cliente_id:  contrato.cliente.id,
                            evento_id:   this.evento_aberto.id,
                            contrato_id: contrato.id,
                            modulo_id:  4 ,
                            status: 'A'};
    
    this.participacaoProvider.adicionarParticipante(participacao).then(function(result:any){
      load.dismiss();
      self.navCtrl.push(ReciclagemPage, {
        'id':result.id
      })
    }).catch(function(reject){
      load.dismiss();
      toast.setMessage(reject.msg);
      toast.present();
      self.navCtrl.push(ReciclagemPage, {
        'id':reject.participacao.id
      })
      
    });

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
            let load  = this.loading.create({content: 'Removendo participante...'});
            let toast = this.toastCtrl.create({ duration: 2000 });
            let self  = this;
            load.present();

            this.participacaoProvider.removerParticipante(participante).then(function(result:any){  
              load.dismiss();
              toast.setMessage('Partipante removido!');
              toast.present();
              
              self.navCtrl.setRoot(ParticipacaoPage);
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
