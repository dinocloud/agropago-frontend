import { Component, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
//@Services
import { PaymentData } from '../../services/paymentData';

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
  dataSource = new MatTableDataSource(items);
  selectedValue: string;
  payment: any;
  title: string;
  action: string;

  constructor(
    private _paymentData: PaymentData,
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
          this.getItems();
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

  getItems() {

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  edit(e){
    this.payment = e;
    this._paymentData.setPaymentData(this.payment);
    this.router.navigate(['/dashboard/list/edit']);
  }
}


export interface Element {
  code: number;
  date: string;
  card: string;
  amount: number;
  deadline: number,
  titular: string,
  beneficiary: string,
  card_name: string,
  card_number: string,
  card_expiration: string
}

const items: Element[] = [
  { code: 123,
    date: "22/12/2018",
    card: "Galicia Rural",
    amount: 1233,
    deadline: 160,
    titular: "Juan Perez",
    beneficiary: "Pedro Juarez",
    card_name: "Pablo Gonzalez",
    card_number: "1111 1111 1111 1111",
    card_expiration: "13/12/2018"
  },
  {
    code: 123,
    date: "23/12/2018",
    card: "Galicia Rural",
    amount: 123123,
    deadline: 160,
    titular: "Juan Perez",
    beneficiary: "Pedro Juarez",
    card_name: "Pablo Gonzalez",
    card_number: "2222 2222 2222 2222",
    card_expiration: "13/12/2018"
  },
  {
    code: 123,
    date: "22/12/2018",
    card: "Visa Rural",
    amount: 123123,
    deadline: 160,
    titular: "Juan Perez",
    beneficiary: "Pedro Juarez",
    card_name: "Pablo Gonzalez",
    card_number: "1111 1111 1111 1111",
    card_expiration: "13/12/2018"
  },
  {
    code: 123,
    date: "22/12/2018",
    card: "Naranja Rural",
    amount: 5543,
    deadline: 160,
    titular: "Juan Perez",
    beneficiary: "Pedro Juarez",
    card_name: "Pablo Gonzalez",
    card_number: "3333 3333 3333 3333",
    card_expiration: "13/12/2018"
  },
  {
    code: 123,
    date: "22/12/2018",
    card: "Galicia Rural",
    amount: 4,
    deadline: 160,
    titular: "Juan Perez",
    beneficiary: "Pedro Juarez",
    card_name: "Pablo Gonzalez",
    card_number: "1111 1111 1111 1111",
    card_expiration: "13/12/2018"
  },
  {
    code: 123,
    date: "22/12/2018",
    card: "Mastercard rural",
    amount: 4444,
    deadline: 160,
    titular: "Juan Perez",
    beneficiary: "Pedro Juarez",
    card_name: "Pablo Gonzalez",
    card_number: "4444 4444 4444 4444",
    card_expiration: "13/12/2018"
  }
];
