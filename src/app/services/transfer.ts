import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
//@Configurations
import { APP_CONFIG, AppConfig } from "../app.config";
//@Services
import { HeaderService } from './header';

@Injectable()
export class TransferService {
  API_URL: string;

  constructor(
    private http: HttpClient,
    public headerService: HeaderService,
    @Inject(APP_CONFIG) config: AppConfig
  ) {
    this.API_URL = config.apiEndpoint;
  }

  getTransfers(status): Observable<any> {
    let headers = this.headerService.create();

    return this.http.get(`${this.API_URL}/admin/transfer/`+status+`/`, {headers: headers});
  }

  process(body): Observable<any> {
    let headers = this.headerService.create();

    return this.http.post(`${this.API_URL}/admin/transfer/process/`, body, {headers: headers});
  }
}

