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
import { SessionController } from './session.controller';

@Injectable()
export class AuthHttp {
  constructor(private http:Http) {
  }

  private setHeaders(headers:Array<Object>, request:Request | RequestOptionsArgs) {
    headers.forEach((header:Object) => {
      let key:string = Object.keys(header)[0];
      let headerValue:string = (<any>header)[key];
      request.headers.set(key, headerValue);
    });
  }

  private setAuthHeaders(request:Request | RequestOptionsArgs) {
    if (SessionController.userSignedIn()) {
      this.setHeaders(SessionController.getAuthHeaders(), request);
    }
  }

  private checkAuthorization(response:Response):void {
    if (response.status === 401) {
      SessionController.removeUser();
    } else {
      SessionController.renewAccess(response.headers);
    }
  }

  private requestHelper(requestArgs:RequestOptionsArgs, additionalOptions:RequestOptionsArgs):Observable<Response> {
    let options:RequestOptions = new RequestOptions(requestArgs);

    if (additionalOptions) {
      options = options.merge(additionalOptions)
    }

    return this.request(new Request(options))
  }

  request(url:string | Request, options?:RequestOptionsArgs):Observable<Response> {
    let request:any;
    let globalHeaders = SessionController.config.globalHeaders;

    if (typeof url === 'string') {
      let reqOpts:RequestOptionsArgs = options || {};

      if (!reqOpts.headers) {
        reqOpts.headers = new Headers();
      }

      if (globalHeaders) {
        this.setHeaders(globalHeaders, reqOpts);
      }

      this.setAuthHeaders(reqOpts);
      request = this.http.request(url, reqOpts);

    } else {
      let req:Request = <Request>url;

      if (!req.headers) {
        req.headers = new Headers();
      }

      if (globalHeaders) {
        this.setHeaders(globalHeaders, req);
      }

      this.setAuthHeaders(req);
      request = this.http.request(req);
    }

    return request
      .do((response:Response) => {
        if (SessionController.userSignedIn())
          this.checkAuthorization(response);
      })
      .catch((error:any) => {
        return Observable.throw(error.json() || 'Server error');
      });
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
