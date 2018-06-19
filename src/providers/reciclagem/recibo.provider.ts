import { Injectable } from '@angular/core';
import { HttpService } from './../http-service';

import { Observable } from 'rxjs/Rx'
import { Reciclagem } from '../../domain/reciclagem';

@Injectable()
export class ReciboProvider {
  public reciclagem: Reciclagem;
  private _url: string = '/recibos/reciclagem';

  constructor(public http: HttpService) { }
 
  enviarEmail(reciclagem: Reciclagem){
    // Fazer daqui... o email não será requisitado ao servidor?
  }

  enviarSMS(){
      /// Daqui é possível chamar a api do pitchwink sem problemas
  }


  

  /** Privates  */
  private _manageMessage(retorno){
    
    let msgs = JSON.parse(retorno._body);
    let r = { status: 0, msg:'', participacao: null};
    for (var key in msgs) {
      if (msgs.hasOwnProperty(key)) {
        r = msgs;
      }
    }

    return r;
  }
}

  
