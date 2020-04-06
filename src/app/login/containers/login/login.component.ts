import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UtilsService } from '../../../shared/utils/utils';
import { LoginService } from '../../services/login/login.service';

const mockAdminData = {
  email: 'admin@sep.com',
  password: 'password'
};

const mockUserData = {
  email: 'user@sep.com',
  password: 'password'
};

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
    private loginService: LoginService
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
    const user = this.loginForm.controls.username.value;
    const password = this.loginForm.controls.password.value;

    if (this.loginForm.invalid) {
      UtilsService.validateAllFormFields(this.loginForm);
      return;
    }
    // if (user === mockAdminData.email && password === mockAdminData.password) {
    //   this.handleLoginSucces('admin');
    // } else if (user === mockUserData.email && password === mockUserData.password) {
    //   this.handleLoginSucces('user');
    // } else {
    //   this.showLoginError = true;
    // }
    this.loginService.login(this.loginForm.value)
    .subscribe(
      loginResponse => {
        console.log('Login respone', loginResponse);
      },
      err => {
        console.log('Login erros', err);
      }
    );
  }

  handleLoginSucces(userType: string): void {
    console.log("Login succes...");
    this.showLoginError = false;
    switch(userType) {
      case 'admin':
        console.log('Usuario de tipo ', userType);
        break;
        case 'user': 
        console.log('Usuario de tipo ', userType);
        break;
      default: 
        break;
    }
  }
}
