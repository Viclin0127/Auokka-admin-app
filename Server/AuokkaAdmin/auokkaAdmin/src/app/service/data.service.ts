import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public http: HttpClient) { }

  /**
  * Send http request to an api with GET method
  * @param api
  */
  get(api: string, type: string = 'auokkaadmintoken', contentType = 'application/json') {
    return this.http.get(api, this.getHttpOptions(type, contentType));
  }

  /**
  * Send http request to an api with POST method
  * @param api
  * @param param
  */
  post(api: string, param: any, type: string = 'auokkaadmintoken', contentType = 'application/json') {
    return this.http.post(api, param, this.getHttpOptions(type, contentType));
  }

  put(api: string, param: any, type: string = 'auokkaadmintoken', contentType = 'application/json') {
    return this.http.put(api, param, this.getHttpOptions(type, contentType));
  }

  delete(api: string, type: string = 'auokkaadmintoken', contentType = 'application/json') {
    return this.http.delete(api, this.getHttpOptions(type, contentType));
  }

  getHttpOptions(type: string = 'auokkaadmintoken', contentType = 'application/json') {
    let token = localStorage.getItem(type);
    token = token == null ? '' : token;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': contentType,
        'Authorization': token
      })
    };
    return httpOptions;
  }
}
