import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
//@Configurations
import { APP_CONFIG, AppConfig } from "../app.config";
//@Services
import { HeaderService } from './header';

@Injectable()
export class PaymentService {
  API_URL: string;

  constructor(
    private http: HttpClient,
    public headerService: HeaderService,
    @Inject(APP_CONFIG) config: AppConfig
  ) {
    this.API_URL = config.apiEndpoint;
  }

  getPayments(status): Observable<any> {
    let headers = this.headerService.create();

    return this.http.get(`${this.API_URL}/admin/payment/`+status, {headers: headers});
  }

  edit(idPayment, body): Observable<any> {
    let headers = this.headerService.create();

    return this.http.put(`${this.API_URL}/admin/payment/edit/` + idPayment, body, {headers: headers});
  }

  process(body): Observable<any> {
    let headers = this.headerService.create();

    return this.http.post(`${this.API_URL}/admin/payment/process/`, body, {headers: headers});
  }
}
