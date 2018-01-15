import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AlertComponent } from '../commons/alert/alert.component';
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

  alertDialogRef: MatDialogRef<AlertComponent>;
  pages: Array<any>;

  constructor(
    private router: Router,
    public dialog: MatDialog,
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
    let credentials = JSON.parse(localStorage.getItem('currentUser'));

    this.authService.logout(credentials)
      .subscribe(res => {
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
      },
      error => {
        this.alertDialogRef = this.dialog.open(AlertComponent, {
          data: {
            message: "No se pudo cerrar sesión. Intente más tarde.",
            title: "Error",
            type: "error"
          }
        });
      })
  }
}
