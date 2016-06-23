import {Headers} from '@angular/http';
import {AuthConfig} from './auth.config'

export class SessionController {
  static config:AuthConfig = new AuthConfig({
    globalHeaders: [{'Content-Type': 'application/json'}]
  });

  constructor() {
  }

  static userSignedIn():boolean {
    return this.getUserUid() !== null;
  }

  static getUserUid() {
    return localStorage.getItem(this.config.uid);
  }
  
  static setUser(headers:Headers) {
    this.config.authHeaders.forEach(header => localStorage.setItem(header, headers.get(header)));
  }

  static removeUser() {
    this.config.authHeaders.forEach(header => localStorage.removeItem(header));
  }

  static renewAccess(headers:Headers) {
    [
      this.config.accessToken,
      this.config.client,
    ].forEach(header => localStorage.setItem(header, headers.get(header)));
  }

  static getAuthHeaders(): any[] {
    let headers = [];

    this.config.authHeaders.forEach(header => headers[header] = localStorage.getItem(header));

    return headers;
  }
}
