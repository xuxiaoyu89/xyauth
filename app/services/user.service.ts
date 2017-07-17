import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
    constructor(
        private http: Http,
        private router: Router
    ) {

    } 

    login(username, password) {
        console.log(username, password);
        this.http.post('http://localhost:3000/api/login', {
            username: username,
            password: password,
            originSite: 'http://localhost:3000',
        })
        .subscribe((data) => {
            console.log('Got data from the service');
            console.log(JSON.stringify(data));
            this.router.navigateByUrl('');
        });
    }
}