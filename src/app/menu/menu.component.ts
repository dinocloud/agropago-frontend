import { Component } from '@angular/core';
import { Router } from '@angular/router';
//@Models
import { UserData } from '../models/userData';
//@Services
import { AuthenticationService } from '../services/authentication';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  pages: Array<any>;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    public userData: UserData
  ) {
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

  showInfo(p) {
    this.router.navigate([p.route], { queryParams: { section: p.section } });
  }

  logout() {
    let credentials = this.userData.getCredentials();

    this.authService.logout(credentials)
      .subscribe(res => {
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
      })
  }
}
