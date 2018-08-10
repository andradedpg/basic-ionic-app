import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';

import { ParticipacaoProvider } from '../../providers/participacao/partipacao.provider';
import { Participacao } from '../../domain/participacao';

import { ResiduoProvider } from '../../providers/reciclagem/residuo.provider';

import { ReciclagemProvider } from '../../providers/reciclagem/reciclagem.provider';
//import { Reciclagem } from '../../domain/reciclagem';
import { ReciclagemReciboPage } from './reciclagem-recibo/reciclagem-recibo';

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

  adicionarResiduo(){
    if(!this.residuoOnSelected)     return this.alertInfo('Selecione uma resíduo primeiro');
    if(this.inputPeso == undefined) return this.alertInfo('Informe o peso do resíduo');

    let load = this.loadCtrl.create({content: 'Adicionando resíduo...' });
    load.present();

    this.residuoOnSelected.quantidade  = this.inputPeso;
    // Formula do arredondar (?)
    this.residuoOnSelected.bonus_valor = (this.residuoOnSelected.quantidade * this.residuoOnSelected.valor);
    this.residuoOnSelected.bonus_valor = this.residuoOnSelected.bonus_valor.toFixed(2);

    this.residuosAdded.push({bonus_valor:this.residuoOnSelected.bonus_valor,
                             medidoem: this.residuoOnSelected.medidoem,
                             nome: this.residuoOnSelected.nome,
                             quantidade: this.residuoOnSelected.quantidade,
                             recurso_id: this.residuoOnSelected.recurso_id,
                             valor: this.residuoOnSelected.valor,
                             reciclador_id: this.residuoOnSelected.reciclador_id,
                             vigencia_id: this.residuoOnSelected.vigencia_id});
    
    this.inputPeso         = undefined;
    this.residuoOnSelected = false;
    this.showInputPeso     = false;

    if(!this.showResiduosAdded) this.showResiduosAdded = true;
    this.infoReciclagem = this.getInfoTotal();
    
    load.dismiss();
  }

  removerResiduoAdicionado(i:number){
    this.residuosAdded.splice(i, 1);
    this.alertInfo('Resíduo removido');
    this.infoReciclagem = this.getInfoTotal();
  }

  mostrarPeso(){ 
    this.showInputPeso = true; 
  }

  salvarReciclagem(){
    let load = this.loadCtrl.create({content: 'Salvando reciclagem...' });
    load.present();

    let reciclagem:any = {cliente_evento_contrato_id: this.cec_id,
                          bonus_total: this.infoReciclagem.bonus_total,
                          bonus_percentual: 100,
                          residuos: this.residuosAdded};
    
    this.reciclagemProvider.save(reciclagem).then((success:any) => {
      load.dismiss();
      this.alertInfo('Reciclagem Realizada com Sucesso!');
      
      this.navCtrl.push(ReciclagemReciboPage, {'id':success.id});
    })
  }

  /* Privates */
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
    let peso_total  = 0;
    let bonus_total = 0;

    this.residuosAdded.forEach(function(item, i){
      
      peso_total  += parseFloat(item.quantidade);
      bonus_total += parseFloat(item.bonus_valor);

    });

    return {
        peso_total: String(this.arredondar(peso_total)), 
        bonus_total:String(this.arredondar(bonus_total))
      };
  }

  private alertInfo(msg:string):void{
    let toast = this.toastCtrl.create({ duration: 2000 }); 
    
    toast.setMessage(msg);
    toast.present();
  
  }

  private arredondar(valor) {
    valor = (valor >= parseFloat('0.005') && valor <= parseFloat('0.009')) ? parseFloat('0.01') : valor;
    return Math.floor(valor * 100) / 100;
  }

}
