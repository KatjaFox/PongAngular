import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    let token;

    if (currentUser != null) 
    {
      token = currentUser.token;
      request = request.clone({
        setHeaders: {
          Authorization: token
        }
      });
    } 
    else 
    {
      request = request.clone();
    }

    return next.handle(request);
  }
}
