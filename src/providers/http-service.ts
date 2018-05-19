import { ConfigService } from './config-service';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { contentHeaders } from './../properties/headers';

@Injectable()
export class HttpService {

  private headers: Headers;
  private _baseApi: string;

  constructor(private http: Http, private _configService: ConfigService) {
    this.headers = contentHeaders;
    this.baseApi = this._configService.url;
    /*this.headers.append('Client-Token', JSON.parse(localStorage.getItem('token')));
    this.headers.append('Client-Type', '1');*/
  }

  get(url: any, baseUrl?:string) {
    let _options = new RequestOptions({ headers: this.headers });

    if (!!baseUrl) {
      return this.http.get(`${baseUrl}${url}`, _options);
    } 
    return this.http.get(`${this._baseApi}${url}`, _options);
  }

  put(url, data, id){
    let _options = new RequestOptions({ headers: this.headers });
    return this.http.put(`${this._baseApi}${url}`, data ,_options);
  }

  post(url, baseUrl:string = null, data, options:RequestOptions = null ) {
    if(!options){
      options = new RequestOptions({ headers: this.headers });
    }
    if (!!baseUrl) {      
      return this.http.post(`${baseUrl}${url}`, data, options);
    }
    return this.http.post(`${this._baseApi}${url}`, data, options);
  }

	public get baseApi(): string {
		return this._baseApi;
	}

	public set baseApi(value: string) {
		this._baseApi = value;
	}
  
}