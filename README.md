# angular2-devise-token-auth
[![Build Status](https://travis-ci.org/equalize-squad/angular2-devise-token-auth.svg?branch=master)](https://travis-ci.org/equalize-squad/angular2-devise-token-auth)
[![npm version](https://img.shields.io/npm/v/angular2-devise-token-auth.svg)](https://www.npmjs.com/package/angular2-devise-token-auth)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![license](https://img.shields.io/npm/l/angular2-jwt.svg)](https://www.npmjs.com/package/angular2-jwt)

**angular2-devise-token-auth** is a helper library for working with [Devise Token Auth](https://github.com/lynndylanhurley/devise_token_auth#readme) in your Angular 2 applications.

## Installation

```bash
npm install angular2-devise-token-auth --save
``` 

The library comes with some helpers that are useful in your Angular 2 apps.

1. `AuthHttp` - allows for individual and explicit authenticated HTTP requests
2. `AuthService` - provide the following features according the api:
    * `sign in`
    * `sign up`
    * `sign out`
    
## How it works

After you did the `sign in` all requests will be authorized through the headers that will be sent automatically each request. 
You don't need to worry about it :sunglasses:.

## Setup

It's supposed that you used [Angular CLI](https://github.com/angular/angular-cli) to create your app.

1. Include Auth library in the vendor files
   
    Open `angular-cli-build.js`.
   
    Include the library in the vendorNpmFiles array:
  
    ```js
    var Angular2App = require('angular-cli/lib/broccoli/angular2-app');
    
    module.exports = function(defaults) {
      return new Angular2App(defaults, {
        vendorNpmFiles: [
          ...
          'angular2-devise-token-auth/**/*.+(js|js.map)',
        ]
      });
    };
    ```

2. System.js
   
    Open `/src/system-config.ts`. Modify the file like below:

    ```ts
    /** Map relative paths to URLs. */
    const map:any = {
      'angular2-devise-token-auth': 'vendor/angular2-devise-token-auth/dist'
    };
    
    /** User packages configuration. */
    const packages: any = {
      'angular2-devise-token-auth': {
        main: 'angular2-devise-token-auth.js'
      }
    };
    ```

3. Bootstrap:
    The AuthService need to know where the `auth` endpoint is. So you need to pass it as an argument.
    So open `/src/main.ts`, inject the Auth providers, and specify your default endpoint:


    ```ts
    import {AUTH_PROVIDERS, authService} from 'angular2-devise-token-auth';
    
    class App {
      constructor() {}
    }
    
    bootstrap(App, [
      AUTH_PROVIDERS,
      authService('http://url-to-auth-endpoint')
    ])
    ```

## How to use
 
### AuthHttp 

```ts
import {AuthHttp} from 'angular2-devise-token-auth';

@Injectable()
export class SomeService {
  thing: string;

  constructor(private authHttp: AuthHttp) {}

  getThing() {
    return this.authHttp.get('http://example.com/api/thing');
  }
}
```


### AuthService

```ts
import {AuthService} from 'angular2-devise-token-auth';

@Component({ ... })
export class SomeComponent {

  constructor(private authService: AuthService) {
  }

  doIt() {
    this.authService.signUp({
      email: 'foo@bar.com',
      password: '123456',
      password_confirmation: '123456',
    }).subscribe(res => console.log('LoL', res));
  }
}
```

## Running unit tests

```bash
npm test
```

## How to contribute :heart_eyes:

Follow the [GitHub Flow](https://guides.github.com/introduction/flow/)

Pull Requests always will be welcome :metal:
