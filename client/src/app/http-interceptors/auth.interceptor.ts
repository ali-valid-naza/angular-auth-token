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

  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('request ' + Object.keys(request) + Object.values(request));
    const authToken = this.auth.getToken();
    const authReq = request.clone({
      headers: request.headers
        .set('Authorization', authToken)
        // .set('Access-Control-Allow-Origin', '*')
    });
    return next.handle(authReq);
  }
}
//todo:
// create check for url /counter
// explore headers
