import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  pages: Array<any>;

  constructor(private router: Router) {
    this.pages = [
        {
          title: "Pagos",
          icon: "payment",
          route: "/dashboard/list"
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

  showInfo(route) {
    this.router.navigate([route]);
  }
}
