import { ConfigService } from './config-service';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class HttpService {

  private _baseApi: string;
  private headers: Headers;

  constructor(private http: Http, private _configService: ConfigService) {
    this.headers = new Headers();
    this.baseApi = ConfigService._wsUrl;
    this.headers.append('Client-Token', JSON.parse(localStorage.getItem('token')));
    this.headers.append('Client-Type', '1');
  }

  get(url: any, baseUrl?:string) {
    let _options = new RequestOptions({ headers: this.headers });
    if (!!baseUrl) {
      return this.http.get(`${baseUrl}${url}`, _options);
    } 
    return this.http.get(`${this._baseApi}${url}`, _options);
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