import { Component, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
//@Services
import { CurrentData } from '../../services/currentData';
import { PaymentService } from '../../services/payment';
import { AccountService } from '../../services/account';
import { AvailableService } from '../../services/available';
import { TransferService } from '../../services/transfer';

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
  isFetching: boolean;
  selectedValue: string;
  activeSection: string;
  errorMsg: string;
  currentData: any;
  title: string;
  action: string;
  activeTab: number = 0;
  columns: Array<any> = [];

  constructor(
    private _currentData: CurrentData,
    private paymentService: PaymentService,
    private accountService: AccountService,
    private availableService: AvailableService,
    private transferService: TransferService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.activeSection = params.section;
      this.clearFields();
      this.getAllInfo();
    })
  }

  getAllInfo() {
    switch (this.activeSection) {
      case "payment":
        this.title = "Pagos";
        this.action = "Procesar";
        this.buildPaymentColumns();
        break;
      case "account_banks":
        this.title = "Cuentas Bancarias";
        this.action = "Validar";
        this.buildAccountColumns();
        break;
      case "available":
        this.title = "Disponibles";
        this.action = "Acreditar";
        this.buildAvailableColumns();
        break;
      case "transfers":
        this.title = "Transferencias";
        this.action = "Transferir";
        this.buildTransferColumns();
        break;
    }

    if(this.activeTab == 0) {
      this.getData('pending');
    } else {
      this.getData('closed');
    }
  }

  buildPaymentColumns() {
    this.columns = [
      { columnDef: 'code', header: 'Cód. O',
        cell: (row) => {
          if(row.code) {
            return `${row.code}`
          }
        }
      },
      { columnDef: 'date', header: 'Fecha',
        cell: (row) => {
        if(row.date) {
          return `${row.date}`
        }
      }
      },
      { columnDef: 'card', header: 'Tarjeta',
        cell: (row) => {
        if(row.payment_order.credit_card.name) {
          return `${row.payment_order.credit_card.name}`
        }
      }
      },
      { columnDef: 'amount', header: 'Monto',
        cell: (row) => {
        if(row.payment_order.amount) {
          return `${row.payment_order.amount}`
        }
      }
      },
      { columnDef: 'deadline', header: 'Plazo',
        cell: (row) => {
        if(row.payment_order.term) {
          return `${row.payment_order.term}`
        }
      }
      },
      { columnDef: 'titular', header: 'Titular del Pago',
        cell: (row) => {
        if(row.payer.last_name && row.payer.first_name) {
          return `${row.payer.last_name}, ${row.payer.first_name}`
        }
      }
      },
      { columnDef: 'beneficiary', header: 'Beneficiario',
        cell: (row) => {
        if(row.payment_order.beneficiary.last_name && row.payment_order.beneficiary.first_name) {
          return `${row.payment_order.beneficiary.last_name}, ${row.payment_order.beneficiary.first_name}`
        }
      }
      },
      { columnDef: 'status', header: 'Estado',
        cell: (row) => {
        if(row.status.name) {
          return `${row.status.name}`
        }
      }
      },
      { columnDef: 'actions', header: 'Opciones' }
    ];
  }

  buildAccountColumns() {
    this.columns = [
      { columnDef: 'account_number', header: 'Nro. Cuenta',
        cell: (row) => {
          if(row.account_number) {
            return `${row.account_number}`
          }
        }
      },
      { columnDef: 'bank_name', header: 'Banco',
        cell: (row) => {
          if(row.bank) {
            return `${row.bank.name} (${row.bank.initials})`
          }
        }
      },
      { columnDef: 'cbu', header: 'CBU',
        cell: (row) => {
          if(row.cbu) {
            return `${row.cbu}`
          }
        }
      },
      { columnDef: 'cuit', header: 'CUIT',
        cell: (row) => {
          if(row.user.cuit) {
            return `${row.user.cuit}`
          }
        }
      },
      { columnDef: 'user', header: 'Usuario',
        cell: (row) => {
          if(row.user.last_name && row.user.first_name) {
            return `${row.user.last_name}, ${row.user.first_name}`
          }
        }
      },
      { columnDef: 'legal_name', header: 'Nombre Legal',
        cell: (row) => {
          if(row.user.legal_name) {
            return `${row.user.legal_name}`
          }
        }
      },
      { columnDef: 'who_valid_account', header: 'Validador',
        cell: (row) => {
          if(row.who_valid_account.last_name && row.who_valid_account.first_name) {
            return `${row.who_valid_account.last_name} , ${row.who_valid_account.first_name}`
          }
        }
      },
      { columnDef: 'when_valid_account', header: 'Fecha Validación',
        cell: (row) => {
          if(row.when_valid_account) {
            return `${row.when_valid_account}`
          }
        }
      },
      { columnDef: 'actions', header: 'Opciones' }
    ];
  }

  buildAvailableColumns() {

  }

  buildTransferColumns() {

  }

  clearFields() {
    this.errorMsg = "";
    this.columns = [];
    this.displayedColumns = [];
    this.displayedColumnsWithActions = [];
    this.dataSourcePending = null;
    this.dataSourceClosed = null;
  }

  getPayments(status) {
    this.paymentService.getPayments(status).subscribe(res => {
      if (status == 'pending') {
        this.dataSourcePending = new MatTableDataSource(res);
         this.isFetching = false;
      } else {
        this.dataSourceClosed = new MatTableDataSource(res);
         this.isFetching = false;
      }
    }, error => {
      this.errorMsg = "No se pudieron cargar los pagos correctamente.";
       this.isFetching = false;
    })
  }

  getAccounts(status) {
    this.accountService.getAccounts(status).subscribe(res => {
      if(status == 'pending') {
        this.dataSourcePending = new MatTableDataSource(res);
         this.isFetching = false;
      } else {
        this.dataSourceClosed = new MatTableDataSource(res);
         this.isFetching = false;
      }
    }, error => {
      this.errorMsg = "No se pudieron cargar las cuentas correctamente.";
       this.isFetching = false;
    })
  }

  getAvailables(status) {
    this.availableService.getAvailables(status).subscribe(res => {
      if(status == 'pending') {
        this.dataSourcePending = new MatTableDataSource(res);
         this.isFetching = false;
      } else {
        this.dataSourceClosed = new MatTableDataSource(res);
         this.isFetching = false;
      }
    }, error => {
      this.errorMsg = "No se pudieron cargar los disponibles correctamente.";
       this.isFetching = false;
    })
  }

  getTransfers(status) {
    this.transferService.getTransfers(status).subscribe(res => {
      if(status == 'pending') {
        this.dataSourcePending = new MatTableDataSource(res);
         this.isFetching = false;
      } else {
        this.dataSourceClosed = new MatTableDataSource(res);
         this.isFetching = false;
      }
    }, error => {
      this.errorMsg = "No se pudieron cargar las transferencias correctamente.";
       this.isFetching = false;
    })
  }

  onSelect(event) {
    switch (event.index) {
      case 0:
        this.activeTab = 0;
        this.getData('pending');
        break;
      case 1:
        this.activeTab = 1;
        this.getData('closed');
        break;
    };
  }

  getData(status) {
    this.isFetching = true;
    switch (this.activeSection) {
      case "payment":
        if(this.activeTab == 0) {
          this.displayedColumnsWithActions = ['code', 'date', 'card', 'amount', 'deadline', 'titular',
            'beneficiary', 'actions'];
        } else {
          this.displayedColumns = ['code', 'date', 'card', 'amount', 'deadline', 'titular', 'beneficiary', 'status'];
        }
        this.getPayments(status);
        break;
      case "account_banks":
        if(this.activeTab == 0) {
          this.displayedColumnsWithActions = ['account_number', 'bank_name', 'cbu', 'cuit', 'user', 'legal_name',
            'actions'];
        } else {
          this.displayedColumns = ['account_number', 'bank_name', 'cbu', 'user', 'who_valid_account',
            'when_valid_account'];
        }
        this.getAccounts(status);
        break;
      case "available":
        if(this.activeTab == 0) {
          // this.displayedColumnsWithActions = ['code', 'date', 'card', 'amount', 'deadline', 'titular',
          //   'beneficiary', 'actions'];
        } else {
          // this.displayedColumns = ['code', 'date', 'card', 'amount', 'deadline', 'titular', 'beneficiary', 'status'];
        }
        this.getAvailables(status);
        break;
      case "transfers":
        if(this.activeTab == 0) {
          // this.displayedColumnsWithActions = ['code', 'date', 'card', 'amount', 'deadline', 'titular',
          //   'beneficiary', 'actions'];
        } else {
          // this.displayedColumns = ['code', 'date', 'card', 'amount', 'deadline', 'titular', 'beneficiary', 'status'];
        }
        this.getTransfers(status);
        break;
    }
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
    this.currentData = e;
    this._currentData.setCurrentData(this.currentData);
    this.router.navigate(['/dashboard/list/payment/edit']);
  }
}
