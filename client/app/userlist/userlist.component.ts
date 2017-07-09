import { Component, OnInit} from '@angular/core';
import {Http, Response} from '@angular/http';
import {UserService} from '../user.service.ts';

@Component ({
  selector: "user-list",
  template: require("./userlist.component.html"),
  providers: [UserService]
})
export class UserListComponent {
  ids: Array<number>;

  constructor(private userServcie: UserService) {
    this.ids;
    userServcie.getUsers((err, data) => {
      this.ids = data.users;
    });
  }
}