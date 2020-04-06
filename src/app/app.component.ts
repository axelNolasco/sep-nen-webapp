import { Component } from '@angular/core';
// import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sep-nen-webapp';

  constructor() {
  //   this.oauthService.tokenEndpoint = "https://taquilla.plazasanjavier.com/oauth/token";
  //   this.oauthService.userinfoEndpoint = "https://taquilla.plazasanjavier.com/identity";
  //   //this.oauthService.tokenEndpoint = "http://taquilla.localhost/oauth/token";
  //   //this.oauthService.userinfoEndpoint = "http://taquilla.localhost/identity";
  //   this.oauthService.clientId = "taquillaClient";
  //   this.oauthService.scope = "openid offline_access";
  //   this.oauthService.dummyClientSecret = "@4816152342";
  //   this.oauthService.oidc = false;
  //   this.oauthService.requireHttps = false;
  }
}
