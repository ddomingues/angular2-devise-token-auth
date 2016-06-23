import {provide, Provider} from '@angular/core';
import {HTTP_PROVIDERS, Http} from '@angular/http';
import {AuthConfig} from './auth.config';
import {AuthHttp} from './auth.http';
import {AuthService} from './auth.service';

export * from './auth.config';
export * from './auth.http';
export * from './auth.service';

/**
 * Used to define the default Auth Endpoint location to be
 * used throughout an application.
 *
 * @param url
 * @returns {Provider}
 */
export const authService = (url: string): Provider => {
  return provide(AuthService, {
    useFactory: (http) => {
      return new AuthService(http, url);
    },
    deps: [AuthHttp]
  });
};

/**
 * Default Providers
 *
 * @type {any[]|Provider[]}
 */
export const AUTH_PROVIDERS:any[] = [
  HTTP_PROVIDERS,
  provide(AuthHttp, {
    useFactory: (http) => {
      return new AuthHttp(http);
    },
    deps: [Http]
  })
];
