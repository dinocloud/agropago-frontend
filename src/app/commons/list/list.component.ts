import { Component, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
//@Services
import { PaymentData } from '../../services/paymentData';
import { PaymentService } from '../../services/payment';

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

  constructor(
    private _paymentData: PaymentData,
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.displayedColumns = ['code', 'date', 'card', 'amount', 'deadline', 'titular', 'beneficiary', 'status'];
    this.displayedColumnsWithActions = ['code', 'date', 'card', 'amount', 'deadline', 'titular',
      'beneficiary', 'actions'];

    this.route.queryParams.subscribe(params => {
      switch (params.section) {
        case "payment":
          this.title = "Pagos";
          this.action = "Procesar";
          this.getPayments('pending');
          break;
        case "account_banks":
          this.title = "Cuentas Bancarias";
          this.action = "Validar";
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

  getPayments(status) {
    this.paymentService.getPayments(status).subscribe(res => {
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
