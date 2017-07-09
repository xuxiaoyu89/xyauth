import {Injectable} from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class UserService {
	constructor (public http: Http) {}

	getUsers(callback) {
		this.http.get('http://localhost:3000/api/users')
		.subscribe(
			(data) => {callback(null, JSON.parse(data.text()))},
			(err) => {callback(err, null);},
			() => console.log("nothing")
		);
	}

	getUser(callback) {
		this.http.get('http://localhost:3000/api/user')
		.subscribe(
			(data) => {
				let result = JSON.parse(data.text());
				if (result.error) {
					callback(result.error);
				} else {
					callback(null, JSON.parse(data.text()));
				}
			},
			(err) => {callback(err, null)},
			() => console.log("nothing")
		)
	}
}