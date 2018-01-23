import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
//@Configurations
import { APP_CONFIG, AppConfig } from "../app.config";
//@Services
import { HeaderService } from '../services/header';

@Injectable()
export class AuthenticationService {
  API_URL : string;
  credentials = {
    email: <string> null,
    password: <string> null
  };

  constructor(
    private http: HttpClient,
    public headerService: HeaderService,
    @Inject(APP_CONFIG) config : AppConfig
  ) {
    this.API_URL = config.apiEndpoint;
  }

  login(credentials): Observable<any> {
    return this.http.post(this.API_URL + '/login/', credentials);
  }

  logout(credentials): Observable<any> {
    let headers = this.headerService.create();

    return this.http.get(this.API_URL + '/logout/', credentials);
  }
}
