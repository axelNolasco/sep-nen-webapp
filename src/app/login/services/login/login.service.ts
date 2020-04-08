import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public login(loginData: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': "Basic " + btoa('other-app' + ":" + 'S3cre3t')
      })
    };
    loginData.grant_type = 'password';
    delete loginData.rememberMe;
    return this.httpClient.post(`${environment.loginApi}`, loginData, httpOptions);
  }

  public loginSuccess(loginResponse: any) {
    console.log(loginResponse);
    let tokenData: any = null;

    try {
      tokenData = jwt_decode(loginResponse.access_token);
    }
    catch(err) {
      console.log(err);
    }
    localStorage.setItem('token', loginResponse.access_token);
    localStorage.setItem('user', JSON.stringify(tokenData));
    localStorage.setItem('refresh-token', loginResponse.refresh_token);
    this.userRoleRedirection(tokenData.authorities[0]);
  }

  private userRoleRedirection(userRole: string) {
    switch(userRole.toLowerCase()) {
      case 'role_third':
        break;
      case 'role_client':
        break;
      default:
      
      break;
    }
  }

  public getAccessToken(): string {
    return localStorage.getItem('token');
  }

  public getUserTokenData(): any {
    return JSON.parse(localStorage.getItem('user'));
  }

  public logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('refresh-token');
  }
}
