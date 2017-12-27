import { Injectable } from '@angular/core';

@Injectable()
export class PaymentData {
  payment: any;

  getPaymentData(){
    return this.payment;
  }
  setPaymentData(data:any[]){
    this.payment = data;
  }
}
