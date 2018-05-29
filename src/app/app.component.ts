import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, ToastController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { HomePage } from './../pages/home/home';
import { ContratosPage } from '../pages/contratos/contratos';
import { ParticipacaoPage } from '../pages/participacao/participacao';

import { LoginProvider } from '../providers/login/login.provider';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage: any = LoginPage;
  pages: Array<{ title: string, component: any, icon: string }>;

  loginProdiver: any = '';
  showSubmenu: boolean = false;

  constructor(platform: Platform, 
              statusBar: StatusBar, 
              splashScreen: SplashScreen, 
              
              public toastCtrl: ToastController, 
              public _loadingController: LoadingController,

              loginProvider: LoginProvider) {
    platform.ready().then(() => {
      this.loginProdiver = loginProvider;
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.pages = [
      { title: 'Início', component: HomePage, icon: 'home'},
      { title: 'Contratos', component: ContratosPage, icon: 'contacts'},
      { title: 'Reciclagem', component: ParticipacaoPage, icon: 'ios-git-compare' }
    ];
  }

  navegarPara(page) {
    this.nav.push(page, {
    });
  }

  logout(){
    let loading = this._loadingController.create({ content: 'Saindo...' });

    this.loginProdiver.logout().then((success) => {
      loading.dismiss();
      this.reload('Ambiente encerrado!');
    }).catch((err) => {
      console.log(err);
    });
  }

  private reload(mensagem:string){
    let toast = this.toastCtrl.create({ duration: 1500 });
    let self = this;

    toast.setMessage(mensagem);
    toast.present();
    toast.onDidDismiss(() => {
      self.nav.setRoot(LoginPage);
    });
  }

}