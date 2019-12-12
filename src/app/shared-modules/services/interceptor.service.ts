import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const username = JSON.parse(localStorage.getItem('currentUser'));
    const authReq = req.clone({
      headers: new HttpHeaders({
        username: username != null ? username.Email : ''
      })
    });
    return next.handle(authReq);
  }
}
