// import { Chart } from 'chart.js';
import { HttpService } from './../../providers/http-service';
import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { UserProvider } from './../../providers/user/user.provider';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('doughnutCanvas') doughnutCanvas;

  doughnutChart: any;

  public get url(): string {
    return this._url;
  }

  public set url(value: string) {
    this._url = value;
  }
  private _url: string;
  
  public user: any;
  public dados: any;

  constructor(public navCtrl: NavController, 
              public modalCtrl: ModalController, 
              public http: HttpService,
              private userProvider: UserProvider) {

  }

  ionViewDidLoad() {
    this.user = this.userProvider.getUserAuth();
    console.log(this.user);
    // let data = this.http.get('/app-beneficiario/10073/grafico-utilizacao', this.url).map(data => data.json()).toPromise()
    //   .then(data => { 
    //     this.dados = data.grafico;
    //   })
    //   .then(() => {
    //     this.doughnutCanvas = new Chart(this.doughnutCanvas.nativeElement, this.dados);
    //   })
    //   .catch(error => console.log(error));
  }


}