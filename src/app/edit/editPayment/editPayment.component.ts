import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material';
//@Components
import { AlertComponent } from '../../commons/alert/alert.component';
//@Services
import { CurrentData } from '../../services/currentData';
import { PaymentService } from '../../services/payment';
//@Plugins
import * as moment from 'moment';

@Component({
  selector: 'app-edit',
  templateUrl: './editPayment.component.html',
  styleUrls: ['./editPayment.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class EditPaymentComponent implements OnInit {
  form: FormGroup;
  disabled: boolean;
  results = [
    {id: 4, name: 'Aprobado'},
    {id: 5, name: 'Rechazado'},
    {id: 6, name: 'Cancelado'},
    {id: 3, name: 'Referido'}
  ];
  payment: any;
  alertDialogRef: MatDialogRef<AlertComponent>;

  constructor(
    private fb: FormBuilder,
    private _currentData: CurrentData,
    private _location: Location,
    private paymentService: PaymentService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.payment = this._currentData.getCurrentData();
    this.disabled = this._currentData.getReadOnly();

    this.form = this.fb.group({
      today: new FormControl({value: new Date()}),
      date: new FormControl({value: this.payment.date, disabled: true}),
      amount: new FormControl({value: this.payment.payment_order.amount, disabled: true}),
      card: new FormControl({value: this.payment.payment_order.credit_card.name, disabled: true}),
      deadline: new FormControl({value: this.payment.payment_order.term, disabled: true}),
      voucher: new FormControl('', Validators.required),
      aut: new FormControl('', Validators.required),
      result: new FormControl('', Validators.required),
      observation: new FormControl('', Validators.required),
      card_name: new FormControl({value: this.payment.owner_name, disabled: this.disabled}, Validators.required),
      card_number: new FormControl({value: this.payment.number, disabled: this.disabled}, Validators.required),
      card_expiration: new FormControl({value: this.payment.expiration, disabled: this.disabled}, Validators.required)
    });
  }

  editCreditCard() {
    let body = {
      "owner_name": this.form.value.card_name,
      "number": this.form.value.card_number,
      "expiration": this.form.value.card_expiration
    };
    let idPayment = this.payment.id;

    this.paymentService.edit(idPayment, body).subscribe(res => {
      this.showMsg("Datos actualizados exitosamente", "Actualización Exitosa", "success");
    }, error => {
      this.showMsg("Error al intentar modificar los datos. Intente más tarde.", "Error", "error");
    })
  }

  process() {
    let process_date = moment(this.form.value.today).format("YYYY-MM-DD");
    let body = {
      "id": this.payment.id,
      "status": this.form.value.result.id,
      "process_date": process_date,
      "cupon": this.form.value.voucher,
      "aut": this.form.value.aut,
      "observations": this.form.value.observation
    };

    this.paymentService.process(body).subscribe(res => {
      this.showMsg("Pago procesado exitosamente", "Carga Exitosa", "success");
    }, error => {
      this.showMsg("Error al intentar procesar el pago. Intente más tarde.", "Error", "error");
    })
  }

  back() {
    this._location.back();
  }

  showMsg(message, title, type) {
    this.alertDialogRef = this.dialog.open(AlertComponent, {
      data: {
        message,
        title,
        type
      }
    });
  }
}
