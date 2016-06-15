import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {AuthHttp} from './auth.http';

@Injectable()
export class AuthService {
  constructor(private http:AuthHttp, private endpoint:string) {
  }

  signUp(params:Object):Observable<Response> {
    return this.http.post(this.endpoint, JSON.stringify(params))
  }

  signIn(params:Object):Observable<Response> {
    return this.http.post(`${this.endpoint}/sign_in`, JSON.stringify(params))
      .do(response => {
        [
          this.http.config.accessToken,
          this.http.config.tokenType,
          this.http.config.client,
          this.http.config.expiry,
          this.http.config.uid
        ].forEach(header => localStorage.setItem(header, response.headers.get(header)));
      });
  }
}
