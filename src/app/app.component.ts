import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sep-nen-webapp';

  constructor(private oauthService: OAuthService) {
    this.oauthService.tokenEndpoint = "http://187.188.123.199:8085/oauth/token";
    this.oauthService.clientId = "other-app";
    this.oauthService.dummyClientSecret = "S3cre3t";
    this.oauthService.requireHttps = false;
    this.oauthService.useHttpBasicAuth = true;
    // this.oauthService.userinfoEndpoint = "https://taquilla.plazasanjavier.com/identity";
    this.oauthService.scope = 'read';
    this.oauthService.oidc = false;
    this.oauthService.customTokenParameters = [];
  }
}
