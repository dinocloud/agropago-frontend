import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  pages: Array<any>;

  constructor() {
    this.pages = [
        {
          title: "Pagos",
          icon: "payment",
          route: "/payments"
        },
        {
          title: "Cuentas Bancarias",
          icon: "account_balance",
          route: "/accounts"
        },
        {
          title: "Disponibles",
          icon: "check",
          route: "/available"
        },
        {
          title: "Transferencias",
          icon: "compare_arrows",
          route: "/transfers"
        }
      ];
  }

  ngOnInit() {
  }
}
