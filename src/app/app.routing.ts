import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ListComponent } from './commons/list/list.component';
import { EditPaymentComponent } from './edit/editPayment/editPayment.component';
import { EditAvailableComponent } from './edit/editAvailable/editAvailable.component';
import { EditTransferComponent } from './edit/editTransfer/editTransfer.component';
import { DashboardComponent } from "./dashboard/dashboard.component";

const appRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    // canActivate: true,
    children: [
      {
        path: 'list',
        component: ListComponent
      },
      {
        path: 'list/payment/edit',
        component: EditPaymentComponent
      },
      {
        path: 'list/available/edit',
        component: EditAvailableComponent
      },
      {
        path: 'list/transfers/edit',
        component: EditTransferComponent
      },
      {
        path: 'home',
        component: HomeComponent
      }
    ]
  },
  { path: 'login', component: LoginComponent },
  // otherwise redirect to login
  { path: '**', redirectTo: 'login'}
];

export const routing = RouterModule.forRoot(appRoutes);

