import { Component, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
//@Services
import { PaymentData } from '../../services/paymentData';
import { PaymentService } from '../../services/payment';
import { AccountService } from '../../services/account';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ListComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  displayedColumnsWithActions;
  displayedColumns;
  dataSourcePending: MatTableDataSource<any> | null;
  dataSourceClosed: MatTableDataSource<any> | null;
  selectedValue: string;
  payment: any;
  title: string;
  action: string;
  activeTab: number = 0;
  columns: Array<any> = [];

  constructor(
    private _paymentData: PaymentData,
    private paymentService: PaymentService,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      switch (params.section) {
        case "payment":
          this.getPayments('pending');
          this.title = "Pagos";
          this.action = "Procesar";
          if(this.activeTab == 0) {
            this.displayedColumnsWithActions = ['code', 'date', 'card', 'amount', 'deadline', 'titular',
              'beneficiary', 'actions'];
          }
          this.buildPaymentColumns();
          break;
        case "account_banks":
          this.getAccounts('pending');
          this.title = "Cuentas Bancarias";
          this.action = "Validar";
          if(this.activeTab == 0) {
            alert("si")
            this.displayedColumnsWithActions = ['account_number', 'bank_name', 'cbu', 'cuit',
              'user', 'legal_name'];
            console.log(this.displayedColumnsWithActions)
          }
          this.buildAccountColumns();
          break;
        case "available":
          this.title = "Disponibles";
          this.action = "Acreditar";
          break;
        case "transfers":
          this.title = "Transferencias";
          this.action = "Transferir";
          break;
      }
    })
  }

  buildPaymentColumns() {
    this.columns = [
      { columnDef: 'code', header: 'Cód. O',
        cell: (row) => `${row.code}`
      },
      { columnDef: 'date', header: 'Fecha',
        cell: (row) => `${row.date}`
      },
      { columnDef: 'card', header: 'Tarjeta',
        cell: (row) => `${row.payment_order.credit_card.name}`
      },
      { columnDef: 'amount', header: 'Monto',
        cell: (row) => `${row.payment_order.amount}`
      },
      { columnDef: 'deadline', header: 'Plazo',
        cell: (row) => `${row.payment_order.term}`
      },
      { columnDef: 'titular', header: 'Titular del Pago',
        cell: (row) => `${row.payer.last_name}, ${row.payer.first_name}`
      },
      { columnDef: 'beneficiary', header: 'Beneficiario',
        cell: (row) => `${row.payment_order.beneficiary.last_name}, 
              ${row.payment_order.beneficiary.first_name}`
      },
      { columnDef: 'status', header: 'Estado',
        cell: (row) => `${row.status.name}`
      },
      { columnDef: 'actions', header: 'Opciones' }
    ];
  }

  buildAccountColumns() {
    this.columns = [
      { columnDef: 'account_number', header: 'Nro. Cuenta',
        cell: (row) => `${row.account_number}`
      },
      { columnDef: 'bank_name', header: 'Banco',
        cell: (row) => `${row.bank.name} (${row.bank.initials})`
      },
      { columnDef: 'cbu', header: 'CBU',
        cell: (row) => `${row.cbu}`
      },
      { columnDef: 'cuit', header: 'CUIT',
        cell: (row) => `${row.user.cuit}`
      },
      { columnDef: 'user', header: 'Usuario',
        cell: (row) => `${row.user.last_name}, ${row.user.first_name}`
      },
      { columnDef: 'legal_name', header: 'Nombre Legal',
        cell: (row) => `${row.user.legal_name}`
      }
    ];
    console.log("columns: ", this.columns);
  }

  getPayments(status) {
    this.paymentService.getPayments(status).subscribe(res => {
      if (status == 'pending') {
        this.dataSourcePending = new MatTableDataSource(res);
      } else {
        this.dataSourceClosed = new MatTableDataSource(res);
      }
    }, error => {
      console.log("error: ", error);
    })
  }

  getAccounts(status) {
    this.accountService.getAccounts(status).subscribe(res => {
      if(status == 'pending') {
        this.dataSourcePending = new MatTableDataSource(res);
      } else {
        this.dataSourceClosed = new MatTableDataSource(res);
      }
    }, error => {
      console.log("error: ", error);
    })
  }

  onSelect(event) {
    switch (event.index) {
      case 0:
        this.activeTab = 0;
        this.getPayments('pending');
        break;
      case 1:
        this.displayedColumns = ['code', 'date', 'card', 'amount', 'deadline', 'titular',
          'beneficiary', 'status'];
        this.activeTab = 1;
        this.getPayments('closed');
        break;
    };
  }

  ngAfterViewInit() {
    // this.dataSourcePending.sort = this.sort;
    // this.dataSourceClosed.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    if(this.activeTab == 0) {
      this.dataSourcePending.filter = filterValue;
    } else {
      this.dataSourceClosed.filter = filterValue;
    }
  }

  edit(e){
    this.payment = e;
    this._paymentData.setPaymentData(this.payment);
    this.router.navigate(['/dashboard/list/edit']);
  }
}
