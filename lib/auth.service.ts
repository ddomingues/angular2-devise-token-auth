import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {AuthHttp} from './auth.http';
import {SessionController} from './session.controller';

@Injectable()
export class AuthService {
  constructor(private http:AuthHttp, private endpoint:string) {
  }

  signUp(params:Object):Observable<Response> {
    return this.http.post(this.endpoint, JSON.stringify(params))
  }

  signIn(params:Object):Observable<Response> {
    return this.http.post(`${this.endpoint}/sign_in`, JSON.stringify(params))
      .do((response:Response) => {
        SessionController.setUser(response.headers);
      });
  }

  signOut():Observable<Response> {
    return this.http.delete(`${this.endpoint}/sign_out`)
      .do(() => {
        SessionController.removeUser();
      });
  }
}
