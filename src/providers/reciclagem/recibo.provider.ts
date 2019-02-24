import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpService } from '../http-service';

//import { Observable } from 'rxjs/Rx'
import { Reciclagem } from '../../domain/reciclagem';
import * as properties from '../../properties/config';

@Injectable()
export class ReciboProvider {
  public reciclagem: Reciclagem;
  private _properties: any;
  private _urlSendMail:string = '/mail/send';

  constructor(public http: Http, 
              public apihttp:HttpService) { 

  }
 
  enviarEmail(reciclagem: Reciclagem, email:string){
    return new Promise((success, reject) => {
      let _error = this._manageMessage;
      let action = this.apihttp.post(this._urlSendMail+'/recibo', null, {reciclagem_id:reciclagem.id, emailTo:email});
      
      action.map(res => res.json().data)
              .toPromise().then(function (data){
                success(data);
              }).catch(function (err) {
                reject(err);
              });
    });
        
  }

  enviarSMS(reciclagem: any, celular){
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
      
      return this.http.get(this._properties.url+query);

      /*
      return new Promise((success, reject) => {
        let _error = this._manageMessage;
        let action = this.http.request(this._properties.url+query);
        
        action.map(res => res.json().data)
              .toPromise().then(function (data){
                console.log(data);
                success(data);
              }).catch(function (err) {
                console.log(err);
                reject(err);
              });
      });
      */ 
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

  
