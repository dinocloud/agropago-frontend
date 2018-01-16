import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material';
//@Components
import { AlertComponent } from '../../commons/alert/alert.component';
//@Services
import { CurrentData } from '../../services/currentData';
import { AvailableService } from '../../services/available';

@Component({
  selector: 'app-edit',
  templateUrl: './editAvailable.component.html',
  styleUrls: ['./editAvailable.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class EditAvailableComponent implements OnInit {
  available: any;
  form: FormGroup;
  alertDialogRef: MatDialogRef<AlertComponent>;

  constructor(
    private _location: Location,
    public dialog: MatDialog,
    private _currentData: CurrentData,
    private fb: FormBuilder,
    private availableService: AvailableService
  ) {

  }

  ngOnInit() {
    this.available = this._currentData.getCurrentData();

    this.form = this.fb.group({
      available_amount: new FormControl({value: ""}),
      amount_to_transfer: new FormControl({value: ""})
    });
  }

  process() {
    let body = {
      "id": this.available.id || "",
      "available_amount": this.form.value.available_amount,
      "amount_to_transfer": this.form.value.amount_to_transfer
    };

    this.availableService.process(body).subscribe(res => {
      this.showMsg("Disponible procesado exitosamente", "Carga Exitosa", "success");
    }, error => {
      this.showMsg("Error al intentar cargar el disponible. Intente más tarde.", "Error", "error");
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
