import {
  describe,
  expect,
  it,
} from '@angular/core/testing';
import {AuthConfig} from "./auth.config";

describe('AuthConfig', ()=> {
  'use strict';

  it('is initialized with default values', ()=> {
    const config = new AuthConfig();
    expect(config).toBeDefined();
    expect(config.accessToken).toBe("access-token");
    expect(config.tokenType).toBe("token-type");
    expect(config.client).toBe("client");
    expect(config.expiry).toBe('expiry');
    expect(config.uid).toBe('uid');
    expect(config.globalHeaders).toEqual([]);
  });

  it('is initialized with the passed values', ()=> {
    let configExpected = {
      accessToken: "Foo",
      tokenType: "Bar",
      client: "token",
      expiry: 'no-expiry',
      uid: 'foo@bar.com',
      globalHeaders: [{"header": "value"}, {"header2": "value2"}]
    };

    let config = new AuthConfig(configExpected);

    expect(config).toBeDefined();
    expect(config.accessToken).toBe(configExpected.accessToken);
    expect(config.tokenType).toBe(configExpected.tokenType);
    expect(config.client).toBe(configExpected.client);
    expect(config.expiry).toBe(configExpected.expiry);
    expect(config.uid).toBe(configExpected.uid);
    expect(config.globalHeaders).toEqual(configExpected.globalHeaders);
  });
});
