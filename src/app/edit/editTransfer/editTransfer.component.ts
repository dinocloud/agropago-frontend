import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material';
//@Components
import { AlertComponent } from '../../commons/alert/alert.component';
//@Services
import { CurrentData } from '../../services/currentData';
import { TransferService } from '../../services/transfer';

@Component({
  selector: 'app-edit',
  templateUrl: './editTransfer.component.html',
  styleUrls: ['./editTransfer.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class EditTransferComponent implements OnInit {
  transfer: any;
  form: FormGroup;
  alertDialogRef: MatDialogRef<AlertComponent>;

  constructor(
    private _location: Location,
    public dialog: MatDialog,
    private _currentData: CurrentData,
    private fb: FormBuilder,
    private transferService: TransferService
  ) {

  }

  ngOnInit() {
    this.transfer = this._currentData.getCurrentData();

    this.form = this.fb.group({
      reference_number: new FormControl('', Validators.required),
    });
  }

  process() {
    let body = {
      "id": this.transfer.id || "",
      "reference_number": this.form.value.reference_number
    };

    this.transferService.process(body).subscribe(res => {
      this.showMsg("Transferencia procesado exitosamente", "Carga Exitosa", "success");
    }, error => {
      this.showMsg("Error al intentar cargar la transferencia. Intente más tarde.", "Error", "error");
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
