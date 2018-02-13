import { HttpService } from './../http-service';
// import { ConfigService } from './../config-service';
import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the CameraServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CameraServiceProvider {

  constructor(public _http: HttpService) {
    console.log('Hello CameraServiceProvider Provider');
  }

  public getPicture(options:any){
    // let params: URLSearchParams = new URLSearchParams();
    // return this._http.get('/consultar-arquivos/'+cdSolicitacaoWeb,ConfigService._portalUrl);
  }
  

  
}
