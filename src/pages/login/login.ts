import { LoginProvider } from './../../providers/login/login.provider';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public toastCtrl: ToastController, 
              public alertCtrl: AlertController,
              public _loadingController: LoadingController, 
              private loginProvider: LoginProvider) {}

  fazerLogin(login) {
   
    let loading = this._loadingController.create({ content: 'Efetuando login...' });
    let self = this;
    let toast = this.toastCtrl.create({ duration: 1500 });

    loading.present();

    this.loginProvider.fazerLogin(login).then((success:any) => {
      
      loading.dismiss();
      toast.setMessage('Logado! Carregando ambiente...');
      toast.present();
      toast.onDidDismiss(() => {
        self.navCtrl.setRoot(HomePage);
      });

    }).catch((err:any) => {
      toast.setMessage('Login ou senha inválido : ' + err);
      toast.present();
      loading.dismiss();

    });
  }

  recuperarSenha(){
    let alert = this.alertCtrl.create({
      title: 'RECUPERAR SENHA',
      subTitle: 'Informe seu email e uma nova senha enviada para você',
      inputs: [
        {
          name: 'email',
          placeholder: 'email@provedor.com'
        }
      ],
      buttons: [
        {
          text: 'Voltar',
          role: 'voltar',
          handler: () => {
              
          }
        },
        {
          text: 'ENVIAR',
          handler: () => {
            // Quando a pagina de Reciclagem existir, informar ela aqui
            console.log('Ir Para reciclagem');
          }
        }
      ]
    });
    alert.present();
  }

}
