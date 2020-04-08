import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpEventType, HttpRequest, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { OAuthService, OAuthResourceServerErrorHandler } from 'angular-oauth2-oidc';
import { catchError } from 'rxjs/operators';

import { LoginService } from './login/services/login/login.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    public loginService: LoginService,
    private errorHandler: OAuthResourceServerErrorHandler,

) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let accessToken = this.loginService.getAccessToken();
    if (accessToken) {
      req = this.addToken(req, accessToken);
    }

    return next
      .handle(req)
      .pipe(catchError(err => throwError(err)))
  }

  private addToken(req: HttpRequest<any>, token: string) {
    return req.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
}