import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
  name: 'page-reciclagem',
  segment: 'page-reciclagem/:id'
})

@Component({
  selector: 'page-reciclagem',
  templateUrl: 'reciclagem.html',
})
export class ReciclagemPage {

  cec_id:any; //ClienteEventoContrato (ID) || Participacao (ID)

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.cec_id = this.navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('cecid: '+this.cec_id);
  }

}
