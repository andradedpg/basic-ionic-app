import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';

import { ParticipacaoProvider } from '../../providers/participacao/partipacao.provider';
import { Participacao } from '../../domain/participacao';

import { ResiduoProvider } from '../../providers/reciclagem/residuo.provider';

import { ReciclagemProvider } from '../../providers/reciclagem/reciclagem.provider';
import { Reciclagem } from '../../domain/reciclagem';

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
  
  residuosAvaiable:  any | false = false;
  residuoOnSelected: any | false = false;
  residuosAdded:     Array<any>  = [];

  inputPeso:number;
  
  showInputPeso: boolean = false;
  showResiduosAdded: boolean = false;

  infoReciclagem: any | false = false;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public participacaoProvider: ParticipacaoProvider,
              public residuoProvider: ResiduoProvider,
              public reciclagemProvider: ReciclagemProvider,
              public alertCtrl: AlertController,
              public loadCtrl: LoadingController,
              public toastCtrl: ToastController
            ) {
      this.cec_id = this.navParams.get('id');
      
      this.getParticipante();    
      this.getEventoAberto();
      this.getResiduos();        
      
  }

  ionViewDidLoad() {
    
  }

  adicionarResiduo(){
    if(!this.residuoOnSelected)     return this.alertInfo('Selecione uma resíduo primeiro');
    if(this.inputPeso == undefined) return this.alertInfo('Informe o peso do resíduo');

    this.residuoOnSelected.peso  = this.inputPeso;
    // Formula do arredondar (?)
    this.residuoOnSelected.total = (this.residuoOnSelected.peso * this.residuoOnSelected.valor);
    this.residuoOnSelected.total = this.residuoOnSelected.total.toFixed(2);

    this.residuosAdded.push(this.residuoOnSelected);

    this.inputPeso         = undefined;
    this.residuoOnSelected = false;
    this.showInputPeso     = false;

    if(!this.showResiduosAdded) this.showResiduosAdded = true;
    this.infoReciclagem = this.getInfoTotal();
  }

  removerResiduoAdicionado(i:number){
    this.residuosAdded.splice(i);
  }

  mostrarPeso(){ this.showInputPeso = true; }

  salvarReciclagem(){
    let reciclagem:any = {cliente_evento_contrato_id: this.cec_id,
                          residuos: this.residuosAdded};
    
    this.reciclagemProvider.adicionarReciclagem(reciclagem as Reciclagem).then(function(result){
        console.log(result);
    })
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

  private getResiduos(){
    let load = this.loadCtrl.create({content: 'Buscando resíduos recicláveis...' });
    load.present();
    this.residuoProvider.getResiduoAtivoByEventoId(this.evento_aberto.id)
                             .subscribe(result =>{
                                this.residuosAvaiable = result;  
                                load.dismiss();
                             });
  }

  private getInfoTotal():any{
    let peso;
    let bonus;

    this.residuosAdded.forEach(function(item, i){
      
      peso  = parseFloat(item.peso  + peso);
      bonus = parseFloat(item.total + bonus);

      console.log('peso:', item.peso, peso);
      console.log('bonus:', item.total, bonus);
    });

    return {peso_total: peso, bonus_total:bonus};
  }


  private alertInfo(msg:string):void{
    let toast = this.toastCtrl.create({ duration: 2000 }); 
    
    toast.setMessage(msg);
    toast.present();
  
  }


}
