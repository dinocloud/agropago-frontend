import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
//@Services
import { CurrentData } from '../services/currentData';

@Component({
  selector: 'app-edit',
  templateUrl: './editPayment.component.html',
  styleUrls: ['./editPayment.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class EditPaymentComponent implements OnInit {
  form: FormGroup;
  results = [
    {value: 0, viewValue: 'Aprobado'},
    {value: 1, viewValue: 'Rechazado'},
    {value: 2, viewValue: 'Referido'}
  ];
  payment: any;

  constructor(
    private fb: FormBuilder,
    private _currentData: CurrentData,
    private _location: Location
  ) { }

  ngOnInit() {
    this.payment = this._currentData.getCurrentData();
    this.form = this.fb.group({
      today: new FormControl({value: new Date(), disabled: true}),
      date: new FormControl({value: this.payment.date, disabled: true}),
      amount: new FormControl({value: this.payment.payment_order.amount, disabled: true}),
      card: new FormControl({value: this.payment.payment_order.credit_card.name, disabled: true}),
      deadline: new FormControl({value: this.payment.payment_order.term, disabled: true}),
      voucher: new FormControl('', Validators.required),
      aut: new FormControl('', Validators.required),
      // file: new FormControl('', Validators.required),
      result: new FormControl('', Validators.required),
      observation: new FormControl('', Validators.required),
      card_name: new FormControl(this.payment.owner_name, Validators.required),
      card_number: new FormControl(this.payment.number, Validators.required),
      card_expiration: new FormControl(this.payment.expiration, Validators.required)
    });
  }

  back() {
    this._location.back();
  }
}
