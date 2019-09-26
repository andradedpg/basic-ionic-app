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
  private _urlSendSMS:string = '/sms/send';

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

  async enviarSMS(reciclagem: any, celular) {
    let action = this.apihttp.post(this._urlSendSMS+'/recibo', null, {reciclagem_id:reciclagem.id, number:celular});
    
    action.subscribe((result:any) => {
      let r = JSON.parse(result._body);
      return (r.status === 'success') ? true : false;
    });

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

  
