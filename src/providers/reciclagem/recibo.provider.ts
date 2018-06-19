import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Rx'
import { Reciclagem } from '../../domain/reciclagem';
import * as properties from '../../properties/config';

@Injectable()
export class ReciboProvider {
  public reciclagem: Reciclagem;
  private _properties: any;

  constructor(public http: Http) { 
   }
 
  enviarEmail(reciclagem: Reciclagem){
    
  }

  enviarSMS(reciclagem: any, celular):Observable <any>{
    this._properties = this.getSMSProperties();
      
      let msg     = 'LIGHTRECICLA - PEDIDO N:'+ reciclagem.codigo +' em ';
      
          msg    += reciclagem.data.toLocaleString()+'\n';
          msg    += "Bonus total: R$"+reciclagem.bonus_total+'\n';
          msg    += "O planeta agradece ;)";

      let mobile  = "55"+celular;
          msg     = encodeURIComponent(msg);
      let query   = "?Credencial="+this._properties.credencial+
                    "&Token="+this._properties.token+
                    "&Principal_User="+this._properties.user+
                    "&Aux_User="+reciclagem.codigo+
                    "&Mobile="+mobile+
                    "&Send_Project=N&Message="+msg;
      
      let headers = new Headers();
      headers.append('Content-Type', '');

      let _options = new RequestOptions({ headers:headers });              
      
     return this.http.request(this._properties.url+query, _options)
                      .map(result => {
                        console.log(result.json());
                        console.log(result);
                        return result;
                      })
                      .catch((error: Response | any) => {
                        console.log(error);
                        return Observable.throw(error.json());
                      });                
          
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

  
