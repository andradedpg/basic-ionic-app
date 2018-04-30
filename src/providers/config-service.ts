import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as properties from '../properties/config';

@Injectable()
export class ConfigService {

  // Ainda sobre a MV ... remover 
  public static get _wsUrl(): string { return properties.default.urlWs};
  public static get _portalUrl(): string { return properties.default.urlPortal };
  public googleApiKey: string = 'AIzaSyBEOhhiR4-t0fJdXlUhbjKt9h3NHjB3t7Q';

  public url: string;
  public client_id: string;
  public client_secret: string;

  constructor(public _http: Http) {
    this.url = this._url();
    this.client_id = this._client_id();
    this.client_secret = this._client_secret();
  }

  private _url(): string { return properties.default._url };
  private _client_id(): string { return properties.default._client_id };
  private _client_secret(): string { return properties.default._client_secret };
}