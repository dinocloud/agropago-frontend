import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

// @Material Design
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule,
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule
} from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import 'hammerjs';
//@Configurations
import { APP_CONFIG, AGROPAGO_CONFIG } from './app.config';
//@Components
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { ListComponent } from './commons/list/list.component';
import { AlertComponent } from './commons/alert/alert.component';
import { EditPaymentComponent } from './edit/editPayment/editPayment.component';
import { EditAvailableComponent } from './edit/editAvailable/editAvailable.component';
import { EditTransferComponent } from './edit/editTransfer/editTransfer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
//@Plugins
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material';
import { MAT_DATE_LOCALE } from '@angular/material/core';
//@Services
import { CurrentData } from './services/currentData';
import { AuthenticationService } from './services/authentication';
import { PaymentService } from './services/payment';
import { AccountService } from './services/account';
import { AvailableService } from './services/available';
import { TransferService } from './services/transfer';
import { HeaderService } from './services/header';
//@Models
import { UserData } from './models/userData';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    ListComponent,
    EditPaymentComponent,
    EditAvailableComponent,
    EditTransferComponent,
    DashboardComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatSortModule,
    MatTabsModule,
    MatPaginatorModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    routing
  ],
  providers: [
    CurrentData,
    AuthenticationService,
    PaymentService,
    AccountService,
    AvailableService,
    TransferService,
    HeaderService,
    UserData,
    {provide: APP_CONFIG, useValue: AGROPAGO_CONFIG},
    {provide: MAT_DATE_LOCALE, useValue: 'es-AR'},
  ],
  entryComponents: [AlertComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
