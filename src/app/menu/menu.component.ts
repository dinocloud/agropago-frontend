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
          route: "/dashboard/list",
          section: "payment"
        },
        {
          title: "Cuentas Bancarias",
          icon: "account_balance",
          route: "/dashboard/list",
          section: "account_banks"
        },
        {
          title: "Disponibles",
          icon: "check",
          route: "/dashboard/list",
          section: "available"
        },
        {
          title: "Transferencias",
          icon: "compare_arrows",
          route: "/dashboard/list",
          section: "transfers"
        }
      ];
  }

  ngOnInit() {
  }

  showInfo(p) {
    this.router.navigate([p.route], { queryParams: { section: p.section } });
  }
}
