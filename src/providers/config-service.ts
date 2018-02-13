import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as properties from '../properties/config';

@Injectable()
export class ConfigService {

  // Caio: http://192.168.7.57:8081/mvsaudeweb/messagebroker
  // MvWeb: http://mvweb.mv.com.br:8086/mvsaudeweb/messagebroker

  public static get _wsUrl(): string { return properties.default.urlWs};
  public static get _portalUrl(): string { return properties.default.urlPortal };
  public googleApiKey: string = 'AIzaSyBEOhhiR4-t0fJdXlUhbjKt9h3NHjB3t7Q';

  constructor(public _http: Http) {
  
  }
}