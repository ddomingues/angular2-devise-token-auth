import {
  describe,
  expect,
  it,
  inject,
  beforeEachProviders
} from '@angular/core/testing';
import {Http, BaseRequestOptions} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {provide} from '@angular/core';
import {AuthConfig} from "./auth.config";
import {AuthHttp} from "./auth.http";

describe('AuthHttp', ()=> {
  beforeEachProviders(() => {
    return [
      BaseRequestOptions,
      MockBackend,
      provide(Http, {
        useFactory: function (backend, defaultOptions) {
          return new AuthHttp(
            new AuthConfig({
              globalHeaders: [{'Content-Type': 'application/json'}]
            }),
            new Http(backend, defaultOptions)
          );
        },
        deps: [MockBackend, BaseRequestOptions]
      })
    ];
  });

  it('provides an instance of AuthHttp as Http', inject([Http], (http) => {
    expect(http).toBeAnInstanceOf(AuthHttp);
  }));
});
