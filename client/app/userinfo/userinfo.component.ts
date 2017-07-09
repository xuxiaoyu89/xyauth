import { Component, OnInit} from '@angular/core';
import {Http, Response} from '@angular/http';
import {UserService} from '../user.service.ts';
import {Router, ActivatedRoute, Params} from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component ({
  selector: "user-info",
  template: require("./userinfo.component.html"),
  providers: [UserService]
})
export class UserInfoComponent {
  id: number;

  constructor(private router: Router, private route: ActivatedRoute) {
    //this.id = 1;
    console.log(this.router.url);
  }

  ngOnInit() {
  	this.route.params.subscribe ((params: Params) => {
  		this.id = params['id'];
  	})
  }
}