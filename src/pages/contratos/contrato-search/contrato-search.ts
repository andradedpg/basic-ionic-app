import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { ContratoProvider } from './../../../providers/contrato/contrato.provider';
import { Contrato } from '../../../domain/contrato';
 
@Component({
  selector: 'contrato-search',
  templateUrl: 'contrato-search.html'
})
export class ContratoSearchPage {
 
    searchTerm: string = '';
    searchControl: FormControl;
    items: any;
    searching: any = false;
 
    constructor(public navCtrl: NavController, public contratoProvider: ContratoProvider) {
        this.searchControl = new FormControl();
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

    gotoPage(id){
        console.log(id);
    }
 
    setFilteredItems() {
        if(this.searchTerm != ''){
            let busca = this.contratoProvider.search(this.searchTerm);
            busca.subscribe(result => {
                this.items = result.json().contratos as Contrato[];
            })
        }else{
            this.items = {};
        }
        
    }
}