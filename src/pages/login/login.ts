import { LoginProvider } from './../../providers/login/login.provider';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public toastCtrl: ToastController, 
              public _loadingController: LoadingController, 
              private loginProvider: LoginProvider) {}

  fazerLogin(login) {
   
    let loading = this._loadingController.create({ content: 'Efetuando login...' });
    let self = this;
    let toast = this.toastCtrl.create({ duration: 1500 });

    loading.present();

    this.loginProvider.fazerLogin(login).then((success) => {
      
      loading.dismiss();
      toast.setMessage('Logado! Carregando ambiente...');
      toast.present();
      toast.onDidDismiss(() => {
        self.navCtrl.setRoot(HomePage);
      });

    }).catch((err) => {
      toast.setMessage('Login ou senha inválido : ' + err);
      toast.present();
      loading.dismiss();

    });
  }

}
