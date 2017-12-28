import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HeaderService {

  constructor() { }

  create(): HttpHeaders {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let token = currentUser.token;
    let headers = new HttpHeaders().set(
      'Authorization', `Token ${token}`
    );

    return headers;
  }


}
