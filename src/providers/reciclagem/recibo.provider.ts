import { Injectable } from '@angular/core';
import { HttpService } from './../http-service';

import { Observable } from 'rxjs/Rx'
import { Reciclagem } from '../../domain/reciclagem';
import * as properties from '../../properties/config';

@Injectable()
export class ReciboProvider {
  public reciclagem: Reciclagem;
  private _url: string;

  constructor(public http: HttpService) {
    let properties:any = this.getSMSProperties();
    this._url = properties.url; 
   }
 
  enviarEmail(reciclagem: Reciclagem){
    
  }

  enviarSMS(reciclagem: any){
      /// Daqui é possível chamar a api do pitchwink sem problemas
      let msg     = 'LIGHTRECICLA - PEDIDO N:'+ reciclagem.codigo +' em '; // Formatar msg em outro metodo
      let mobile  = "55"+reciclagem.celularInformado;
          msg     = encodeURIComponent(msg);
          
  }


  

  /** Privates  */
  private getSMSProperties(){
    return {
      url: properties.default._servico_sms_url,
      credencial: properties.default._servico_sms_credencial,
      user: properties.default._servico_sms_user,
      token: properties.default._servico_sms_token,
    };
  }

  private removerCaracterEspecial(telefone){
    let re = /[(,),-]/gi;
    return telefone.replace(re, '');
  }
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

  
