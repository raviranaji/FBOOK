import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req);

    // access the token from the storage
    const bearerToken = sessionStorage.getItem('token');
    console.log(bearerToken);

    // clone the req, in order to modify req header
    req = req.clone({ // and then, inside the cloned req, attach the token
      setHeaders: {
        Authorization: 'Bearer ' + bearerToken
      }
    });

    console.log(req);
    return next.handle(req);
  }
}
