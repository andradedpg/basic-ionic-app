import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { FormControl } from '@angular/forms';

import { ContratoProvider } from './../../../providers/contrato/contrato.provider';
import { Contrato } from '../../../domain/contrato';
import { Evento } from '../../../domain/evento';

import { ContratoFormPage } from './../contrato-form/contrato-form';
import { ParticipacaoPage } from '../../participacao/participacao';

@Component({
  selector: 'contrato-search',
  templateUrl: 'contrato-search.html'
})
export class ContratoSearchPage {
 
    searchTerm: string = '';
    searchControl: FormControl;
    contratos: any;
    searching: any = false;
    buttons: any;
    public evento_aberto: Evento;
 
    constructor(public navCtrl: NavController, 
                public contratoProvider: ContratoProvider,
                public toastCtrl: ToastController) {
        
        this.getEventoAberto();            
        this.searchControl = new FormControl();
        this.acoes();
    }

    acoes() {
        this.buttons = [
            {nome:'Editar', icon:'create', color:'danger', pageDestino:ContratoFormPage},
            {nome:'Reciclar', icon:'ios-git-compare', color:'lightrecicla', pageDestino:ParticipacaoPage}
        ];
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

    goToPage(button:any, id){
        this.navCtrl.push(button.pageDestino, {
            'id':id
        });
    }
 
    setFilteredItems() {
        if(this.searchTerm != ''){
            let busca = this.contratoProvider.search(this.searchTerm.toUpperCase());
            busca.subscribe(result => {
                this.contratos = result.json().contratos as Contrato[];
            })
        }else{
            this.contratos = false;
        }
        
    }

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