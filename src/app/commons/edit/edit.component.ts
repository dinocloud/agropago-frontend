import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
//@Services
import { PaymentData } from '../../services/paymentData';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class EditComponent implements OnInit {
  form: FormGroup;
  results = [
    {value: 0, viewValue: 'Aprobado'},
    {value: 1, viewValue: 'Rechazado'},
    {value: 2, viewValue: 'Referido'}
  ];
  payment: any;

  constructor(
    private fb: FormBuilder,
    private _paymentData: PaymentData,
    private _location: Location
  ) { }

  ngOnInit() {
    this.payment = this._paymentData.getPaymentData();
    console.log("llego el payment: ", this.payment);
    this.form = this.fb.group({
      today: new FormControl({value: new Date(), disabled: true}),
      date: new FormControl({value: this.payment.date, disabled: true}),
      amount: new FormControl({value: this.payment.amount, disabled: true}),
      card: new FormControl({value: this.payment.card, disabled: true}),
      deadline: new FormControl({value: this.payment.deadline, disabled: true}),
      voucher: new FormControl('', Validators.required),
      aut: new FormControl('', Validators.required),
      // file: new FormControl('', Validators.required),
      result: new FormControl('', Validators.required),
      observation: new FormControl('', Validators.required),
      card_name: new FormControl(this.payment.card_name, Validators.required),
      card_number: new FormControl(this.payment.card_number, Validators.required),
      card_expiration: new FormControl(this.payment.card_expiration, Validators.required)
    });
  }

  back() {
    this._location.back();
  }
}
