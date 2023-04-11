import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('/counter')) {
      const authToken = this.auth.getToken();
      const authReq = request.clone({
        headers: request.headers
          .set('Authorization', authToken)
          .set('Access-Control-Allow-Origin', 'http://localhost:3000/api/v1')
      });
      return next.handle(authReq);
    } else {
      return next.handle(request);
    }
  }
}
