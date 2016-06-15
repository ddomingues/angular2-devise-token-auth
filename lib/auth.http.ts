import {Injectable} from '@angular/core';
import {
  Http,
  Headers,
  Request,
  RequestOptions,
  RequestOptionsArgs,
  RequestMethod,
  Response
} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import {AuthConfig} from './auth.config';

@Injectable()
export class AuthHttp {
  constructor(public config:AuthConfig, private http:Http) {
  }

  private setGlobalHeaders(headers:Array<Object>, request:Request | RequestOptionsArgs) {
    headers.forEach((header:Object) => {
      let key:string = Object.keys(header)[0];
      let headerValue:string = (<any>header)[key];
      request.headers.set(key, headerValue);
    });
  }

  private setAuthHeaders(request:Request | RequestOptionsArgs) {
    let uid:string = localStorage.getItem(this.config.uid);

    if (uid) {
      request.headers.set(this.config.accessToken, localStorage.getItem(this.config.accessToken));
      request.headers.set(this.config.tokenType, localStorage.getItem(this.config.tokenType));
      request.headers.set(this.config.client, localStorage.getItem(this.config.client));
      request.headers.set(this.config.expiry, localStorage.getItem(this.config.expiry));
      request.headers.set(this.config.uid, uid);
    }
  }

  request(url:string | Request, options?:RequestOptionsArgs):Observable<Response> {
    let request:any;
    let globalHeaders = this.config.globalHeaders;

    if (typeof url === 'string') {
      let reqOpts:RequestOptionsArgs = options || {};

      if (!reqOpts.headers) {
        reqOpts.headers = new Headers();
      }

      if (globalHeaders) {
        this.setGlobalHeaders(globalHeaders, reqOpts);
      }

      this.setAuthHeaders(reqOpts);
      request = this.http.request(url, reqOpts);

    } else {
      let req:Request = <Request>url;

      if (!req.headers) {
        req.headers = new Headers();
      }

      if (globalHeaders) {
        this.setGlobalHeaders(globalHeaders, req);
      }

      this.setAuthHeaders(req);
      request = this.http.request(req);
    }

    return request
      .do(response => {
        console.log(response);
        localStorage.setItem(this.config.accessToken, response.headers[this.config.accessToken]);
      })
      .catch((error:any) => {
        return Observable.throw(error.json() || 'Server error');
      });
  }

  private requestHelper(requestArgs:RequestOptionsArgs, additionalOptions:RequestOptionsArgs):Observable<Response> {
    let options:RequestOptions = new RequestOptions(requestArgs);

    if (additionalOptions) {
      options = options.merge(additionalOptions)
    }

    return this.request(new Request(options))
  }

  get(url:string, options?:RequestOptionsArgs):Observable<Response> {
    return this.requestHelper({url: url, method: RequestMethod.Get}, options);
  }

  post(url:string, body:string, options?:RequestOptionsArgs):Observable<Response> {
    return this.requestHelper({url: url, body: body, method: RequestMethod.Post}, options);
  }

  put(url:string, body:string, options ?:RequestOptionsArgs):Observable<Response> {
    return this.requestHelper({url: url, body: body, method: RequestMethod.Put}, options);
  }

  delete(url:string, options ?:RequestOptionsArgs):Observable<Response> {
    return this.requestHelper({url: url, method: RequestMethod.Delete}, options);
  }

  patch(url:string, body:string, options?:RequestOptionsArgs):Observable<Response> {
    return this.requestHelper({url: url, body: body, method: RequestMethod.Patch}, options);
  }

  head(url:string, options?:RequestOptionsArgs):Observable<Response> {
    return this.requestHelper({url: url, method: RequestMethod.Head}, options);
  }
}
