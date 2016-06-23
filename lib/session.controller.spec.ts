import {
  describe,
  expect,
  it,
  beforeEach
} from '@angular/core/testing';
import { Headers } from '@angular/http';
import { SessionController } from "./session.controller";

describe('SessionController', () => {
  'use strict';

  describe('.userSignedIn', () => {
    it('returns true if user sis signed in', () => {
      localStorage.setItem(SessionController.config.uid, 'foo@bar.com');

      expect(SessionController.userSignedIn()).toBeTruthy();
    });
  });

  describe('.getUserUid', () => {
    it('returns the user uid', () => {
      let userUid = 'foo@bar.com';
      localStorage.setItem(SessionController.config.uid, userUid);

      expect(SessionController.getUserUid()).toBe(userUid);
    });
  });

  describe('.setUser', () => {
    it('sets the user headers on storage', () => {
      let headers = {
        'access-token': "Foo",
        'token-type': "Bar",
        'client': "token",
        'expiry': 'no-expiry',
        'uid': 'foo@bar.com',
        'foo': 'bar'
      };

      SessionController.setUser(new Headers(headers));

      let authHeaders = SessionController.getAuthHeaders();
      expect(authHeaders['access-token']).toBe("Foo");
      expect(authHeaders['token-type']).toBe("Bar");
      expect(authHeaders['client']).toBe("token");
      expect(authHeaders['expiry']).toBe('no-expiry');
      expect(authHeaders['uid']).toBe('foo@bar.com');
      expect(authHeaders['foo']).toBeUndefined();
    });
  });

  describe('.removeUser', () => {
    beforeEach(() => {
      let headers = {
        'access-token': "Foo",
        'token-type': "Bar",
        'client': "token",
        'expiry': 'no-expiry',
        'uid': 'foo@bar.com',
        'foo': 'bar'
      };

      SessionController.setUser(new Headers(headers));
    });
    
    it('sets the user headers on storage', () => {
      SessionController.removeUser();

      let authHeaders = SessionController.getAuthHeaders();
      expect(authHeaders['access-token']).toBeNull();
      expect(authHeaders['token-type']).toBeNull();
      expect(authHeaders['client']).toBeNull();
      expect(authHeaders['expiry']).toBeNull();
      expect(authHeaders['uid']).toBeNull();
    });
  });

  describe('.renewAccess', () => {
    beforeEach(() => {
      let headers = {
        'access-token': "Foo",
        'token-type': "Bar",
        'client': "token",
        'expiry': 'no-expiry',
        'uid': 'foo@bar.com',
        'foo': 'bar'
      };

      SessionController.setUser(new Headers(headers));
    });

    it('renews the access', () => {
      let newHeaders = {
        'access-token': "new",
        'client': "access"
      };
      
      SessionController.renewAccess(new Headers(newHeaders));

      expect(SessionController.getAuthHeaders()['access-token']).toBe('new');
      expect(SessionController.getAuthHeaders()['client']).toBe('access');
    });
  });

  describe('.getAuthHeaders', () => {
    beforeEach(() => {
      localStorage.setItem('access-token', "Foo");
      localStorage.setItem('token-type', "Bar");
      localStorage.setItem('client', "token");
      localStorage.setItem('expiry', 'no-expiry');
      localStorage.setItem('uid', 'foo@bar.com');
    });

    it('returns the auth headers', () => {
      let authHeaders = SessionController.getAuthHeaders();

      expect(authHeaders['access-token']).toBe("Foo");
      expect(authHeaders['token-type']).toBe("Bar");
      expect(authHeaders['client']).toBe("token");
      expect(authHeaders['expiry']).toBe('no-expiry');
      expect(authHeaders['uid']).toBe('foo@bar.com');
      expect(authHeaders['foo']).toBeUndefined();
    });
  });
});
