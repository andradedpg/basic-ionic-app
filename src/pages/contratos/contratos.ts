// import { Chart } from 'chart.js';
import { IonicPage, NavController, ModalController, ToastController, NavParams } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';

import { HttpService } from './../../providers/http-service';
import { ContratoProvider } from './../../providers/contrato/contrato.provider';

import { ContratoFormPage } from './contrato-form/contrato-form';
import { ContratoSearchPage } from './contrato-search/contrato-search';

import { Contrato } from './../../domain/contrato';



@IonicPage()
@Component({
  selector: 'contratos-home',
  templateUrl: 'contratos.html'
})
export class ContratosPage {

  public contrato: Contrato;
  public loaded: boolean = false;

  public pages: Array<{title:string, component:any, icon:string}>;

  constructor(public navCtrl: NavController, 
              public modalCtrl: ModalController, 
              public toastCtrl: ToastController,
              public http: HttpService,
              private contratoProvider: ContratoProvider) {

  }

  ionViewDidLoad() {
    this.pages = [
      {title: 'Novo', component: ContratoFormPage, icon: 'person-add'},
      {title: 'Buscar', component: ContratoSearchPage, icon: 'search'}
    ]
  }

  navegarPara(page) {
    this.navCtrl.push(page, {
    });
  }

}