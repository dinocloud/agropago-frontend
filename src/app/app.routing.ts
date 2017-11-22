import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },

  // otherwise redirect to login
  { path: '**', redirectTo: 'login'}
];

export const routing = RouterModule.forRoot(appRoutes);

