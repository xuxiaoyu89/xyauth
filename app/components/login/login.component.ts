import { Component } from '@angular/core';
import { HttpModule, Response } from '@angular/http';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'login',
    template: require('./login.component.html'),
    styles: [require('./login.component.scss')],
    providers: [UserService],
})
export class LoginComponent {
    // properties
    loginForm: FormGroup;
    status: string;
    errorMessage: string;
    // constructor
    constructor(
        http: HttpModule,
        private userService: UserService,
        router: Router
    ){ }

    ngOnInit() {
        this.loginForm = new FormGroup({
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
        });
        this.status = 'Not logged in!';
    }

    // methods
    onSubmit() {
        console.log('in onSubmit function');

        let username = this.loginForm.controls.username.value;
        let password = this.loginForm.controls.password.value;

        this.userService.login(username, password);
    }
}
