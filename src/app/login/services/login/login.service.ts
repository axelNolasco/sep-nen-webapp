import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public login(loginData: any) {
    console.log('login service', loginData);
    loginData.grant_type = 'password';
    delete loginData.rememberMe;
    return this.httpClient.post(`${environment.loginApi}`, loginData);
  }
}
