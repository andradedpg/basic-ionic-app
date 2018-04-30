// import { Chart } from 'chart.js';
import { IonicPage, NavController, ModalController, NavParams } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';

import { HttpService } from './../../providers/http-service';
import { UserProvider } from './../../providers/user/user.provider';
import { User } from './../../domain/user';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public usuario: User;
  public loaded: boolean = false;

  constructor(public navCtrl: NavController, 
              public modalCtrl: ModalController, 
              public http: HttpService,
              private userProvider: UserProvider) {

  }

  ionViewDidLoad() {
    this.userProvider.getUserAuth().subscribe((user) => {
      this.usuario = user as User;
      this.loaded = true;
    },
    (error) => {
      console.log('userProvider error : ' + error);
    });

  }


}