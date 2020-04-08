import { OAuthService } from 'angular-oauth2-oidc';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate, ActivatedRoute } from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate {

  private authenticated: boolean;
  private userAccess: any;

  constructor(
    private router: Router,
    private oauthService: OAuthService,
    private activatedRoute: ActivatedRoute) {
    this.authenticated = this.oauthService.hasValidAccessToken()
    this.userAccess = this.oauthService.getIdentityClaims();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authenticated) {
      const currentRoute: string = state.url.replace('/', '');
      const allowedRoute: boolean = this.userAccess.permisos.some(access => access.key.includes(currentRoute));

      if (allowedRoute) {
        return true;
      } else {
        this.router.navigate(['taquilla']);
        return true;
      }
    }
    this.router.navigate(['/']);
  }
}