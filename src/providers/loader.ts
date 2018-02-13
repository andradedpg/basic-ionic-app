import { LoadingController } from 'ionic-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class LoaderService {
    private load : any;

    public constructor(private loadingCtrl: LoadingController){
    }
    
    public start(mensagem?: string){
        this.load =  this.loadingCtrl.create({content:mensagem});
        this.load.present();
    }
    
    public stop(){
        this.load.dismiss();
    }
}
