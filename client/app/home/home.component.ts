import { Component } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../user.service.ts';
import {CookieService} from '../cookie.service.ts';
import {FileService} from '../file.service.ts';

@Component({
  selector: 'home',
  template: require('./home.component.html'),
  styles: [require('./home.component.scss')],
  providers: [UserService, CookieService, FileService]
})

export class HomeComponent {
  username: string
  avatar: string
  noAvatar: boolean

  constructor (
    userService: UserService, 
    private router: Router,
    private cookieService: CookieService,
    private fileService: FileService,
    private http: Http
    ) {
    userService.getUser((err, data) => {
      if (err) {
        router.navigate(['./login'])
      } else {
        this.username = data.user.username;
        this.avatar = data.user.avatar;
        this.noAvatar = false;
        if (!this.avatar) {
          this.avatar = 'https://s3-us-west-2.amazonaws.com/changwangnoodle/images/default-placeholder.png';
          this.noAvatar = true;
        }
      }
    })
  }

  logout(): void {
    this.cookieService.deleteCookie('access-token');
    this.router.navigate(['./login']);
  }
}