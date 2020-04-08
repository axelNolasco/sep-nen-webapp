import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UtilsService } from '../../../shared/utils/utils';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public showLoginError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
  ) {}
  
  ngOnInit(): void {
    this.initLoginForm();
  }

  private initLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  public handleLogin(): void {
    if (this.loginForm.invalid) {
      UtilsService.validateAllFormFields(this.loginForm);
      return;
    }

    this.loginService.login(this.loginForm.value)
    .subscribe(
      loginResponse => {
        console.log('Login respone', loginResponse);
        this.loginService.loginSuccess(loginResponse);
        this.handleLoginSucces();
      },
      err => {
        console.log('Login error', err);
        this.loginErrorHandler(err.code);
      }
    );
  }

  private handleLoginSucces(): void {
    console.log("Login succes...", this.loginService.getUserTokenData());
    let userType = this.loginService.getUserTokenData().authorities[0].toLowerCase();

    this.showLoginError = false;

    switch(userType) {
      case 'role_third':
        console.log('Usuario de tipo ', userType);
        this.router.navigate(['/admin/users']);
        break;
        case 'role_client': 
        console.log('Usuario de tipo ', userType);
        this.router.navigate(['/user']);
        break;
      default:
        this.router.navigate(['/']);
        break;
    }
  }

  private loginErrorHandler(code: number): void {
    switch (code) {
      case 400:
        this.showLoginError = true;
        break;
      default:
        this.showLoginError = true;
    }
  }
}
