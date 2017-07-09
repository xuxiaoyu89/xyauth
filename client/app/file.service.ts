import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';

@Injectable()
export class FileService {
  constructor (public http: Http) {}

  uploadFile(file, callback) {
    //console.log('file: ', file);
    /*this.http.post('http://localhost:3000/api/file', {"data": file})
    .subscribe(
      data => { 
        callback(null, data);
      },
      err => {
        callback(err);
      }
    )*/

    var xhr = new XMLHttpRequest();
    var formData = new FormData();
    var endpoint = 'http://localhost:3000/api/upload-direct';


    formData.append('file', file);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          callback(null, xhr.response);
        }
      }
    }

    xhr.open('POST', endpoint, true);
    xhr.send(formData);
  }
}