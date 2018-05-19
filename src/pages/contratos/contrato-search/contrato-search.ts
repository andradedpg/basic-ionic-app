import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormControl } from '@angular/forms';

import { ContratoProvider } from './../../../providers/contrato/contrato.provider';
import { Contrato } from '../../../domain/contrato';

import { ContratoFormPage } from './../contrato-form/contrato-form';

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
 
    constructor(public navCtrl: NavController, public contratoProvider: ContratoProvider) {
        this.searchControl = new FormControl();
        this.acoes();
    }

    acoes() {
        this.buttons = [
            {nome:'Editar', icon:'create', color:'danger', pageDestino:ContratoFormPage},
            {nome:'Reciclar', icon:'ios-git-compare', color:'lightrecicla', pageDestino:ContratoFormPage}
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
        console.log(id);
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
}