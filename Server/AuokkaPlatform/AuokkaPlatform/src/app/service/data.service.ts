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
  get(api: string, type: string = 'auokkaplatformtoken') {
    return this.http.get(api, this.getHttpOptions(type));
  }

  /**
  * Send http request to an api with POST method
  * @param api
  * @param param
  */
  post(api: string, param: any, type: string = 'auokkaplatformtoken') {
    return this.http.post(api, param, this.getHttpOptions(type));
  }

  put(api: string, param: any, type: string = 'auokkaplatformtoken') {
    return this.http.put(api, param, this.getHttpOptions(type));
  }

  delete(api: string, type: string = 'auokkaplatformtoken') {
    return this.http.delete(api, this.getHttpOptions(type));
  }

  getHttpOptions(type: string = 'auokkaplatformtoken') {
    let token = localStorage.getItem(type);
    token = token == null ? '' : token;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return httpOptions;
  }
}
