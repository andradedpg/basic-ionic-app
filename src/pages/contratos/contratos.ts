// import { Chart } from 'chart.js';
import { IonicPage, NavController, ModalController, ToastController, NavParams } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';

import { HttpService } from './../../providers/http-service';
import { ContratoProvider } from './../../providers/contrato/contrato.provider';
import { ContratoAddPage } from './contrato-add/contrato-add';
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
      {title: 'Novo', component: ContratoAddPage, icon: 'person-add'}
    ]
  }

  navegarPara(page) {
    this.navCtrl.push(page, {
    });
  }

}