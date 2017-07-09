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
  selector: "signup",
  template: require('./signup.component.html'),
  styles: [require('./signup.component.scss'), require('../shared/styles/base.scss')],
  providers: [UserService, CookieService]
})
export class SignupComponent {
  signupForm: FormGroup;
  email: AbstractControl;
  username: AbstractControl;
  password: AbstractControl;
  confirm_password: AbstractControl;
  submitted: Boolean;

  constructor(fb: FormBuilder, public http: Http, public router: Router, public cookieService: CookieService) {
    this.signupForm = fb.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required]
    });
    this.email = this.signupForm.controls['email'];
    this.username = this.signupForm.controls['username'];
    this.password = this.signupForm.controls['password'];
    this.confirm_password = this.signupForm.controls['confirm_password'];
    this.submitted = false;
  }

  onSubmit(form: any): void {

    console.log('on submit');

  	this.submitted = true;

    if(form.status === 'INVALID') {
      return;
    }

    let password = form.controls.password.value;
    let username = form.controls.username.value;
    let email = form.controls.email.value;

    this.http.post('http://localhost:3000/api/signup', {
      "username": username,
      "password": password,
      "email": email
    })
    .subscribe(
      data => { 
        let result = JSON.parse(data.text());
        console.log("response: ", result);
        if (result.error) {
          // show error in this page
        } else {
          this.router.navigate(['./home']);
        }
      },
      err => console.log(err),
      () => console.log('Secret Quote Complete')
    );
  }


}