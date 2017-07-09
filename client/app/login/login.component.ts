import { Component } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {
  FormBuilder,
  FormGroup, 
  Validators,
  AbstractControl
} from '@angular/forms';
import {UserService} from '../user.service.ts';
import {CookieService} from '../cookie.service.ts';

@Component({
  selector: "login",
  template: require('./login.component.html'),
  styles: [require('./login.component.scss'), require('../shared/styles/base.scss')],
  providers: [UserService, CookieService]
})
export class LoginComponent {
  loginForm: FormGroup;
  username: AbstractControl;
  password: AbstractControl;
  submitted: Boolean;
  error: String;

  constructor(
    fb: FormBuilder,
    private http: Http, 
    private cookieService: CookieService,
    private router: Router
    ) {
    this.loginForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.username = this.loginForm.controls['username'];
    this.password = this.loginForm.controls['password'];
    this.submitted = false;


    let accessToken = cookieService.getCookie('access-token');
    // to do check if the tooken is valid by sending a request to server;
    if (accessToken && accessToken.length > 0) {
      this.http.get('http://localhost:3000/api/token')
      .subscribe(
        data => {
          let response = JSON.parse(data.text());
          console.log("log in test access token: ", response);
          if(!response.error) {
            router.navigate(['./home']);
          }
        }
      )
    }

  }

  onSubmit(form: any): void {
  	this.submitted = true;
    let password = form.controls.password.value;
    let username = form.controls.username.value;

    this.http.post('http://localhost:3000/api/login', {
      "username": username,
      "password": password
    })
    .subscribe(
      data => {
        let response = JSON.parse(data.text());
        console.log(response);
        if (response.status == 'success') {
          this.router.navigate(['./home']);
        } else {
          this.error = "incorrect username/password";
        }         
      },
      err => console.log(err),
      () => console.log('Secret Quote Complete')
    );
  }

  onChange() {
    this.error = '';
  }

}