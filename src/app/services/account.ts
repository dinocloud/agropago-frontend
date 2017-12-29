import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
//@Configurations
import { APP_CONFIG, AppConfig } from "../app.config";
//@Services
import { HeaderService } from './header';

@Injectable()
export class AccountService {
  API_URL: string;

  constructor(
    private http: HttpClient,
    public headerService: HeaderService,
    @Inject(APP_CONFIG) config: AppConfig
  ) {
    this.API_URL = config.apiEndpoint;
  }

  getAccounts(status): Observable<any> {
    let headers = this.headerService.create();

    return this.http.get(`${this.API_URL}/admin/user-bank-account/`+status, {headers: headers});
  }
}
