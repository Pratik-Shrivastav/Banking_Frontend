import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { SuperAdminDashboardComponent } from './components/super-admin-dashboard/super-admin-dashboard.component';
import { ViewClientComponent } from './components/view-client/view-client.component';
import { ClientsComponent } from './components/clients/clients.component';
import { PendingRequestComponent } from './components/pending-request/pending-request.component';
import { ApprovedPaymentComponent } from './components/approved-payment/approved-payment.component';
import { MatCardModule } from '@angular/material/card';
import { DisplayPendingClientComponent } from './components/display-pending-client/display-pending-client.component';
import { ViewPaymentComponent } from './components/view-payment/view-payment.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ViewSuccessPaymentComponent } from './components/view-success-payment/view-success-payment.component';
import { ViewSuccessSalaryDisbursementComponent } from './components/view-success-salary-disbursement/view-success-salary-disbursement.component';
import { ViewSalaryDisbursementComponent } from './components/view-salary-disbursement/view-salary-disbursement.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon'; // Correct import for MatIcon
import { ReportsComponent } from './components/reports/reports.component';
import { NgChartjsModule } from 'ng-chartjs';

@NgModule({
  declarations: [
    SuperAdminDashboardComponent,
    ViewClientComponent,
    ClientsComponent,
    PendingRequestComponent,
    ApprovedPaymentComponent,
    DisplayPendingClientComponent,
    ViewPaymentComponent,
    ViewSuccessPaymentComponent,
    ViewSuccessSalaryDisbursementComponent,
    ViewSalaryDisbursementComponent,
    ReportsComponent
  ],
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule, // Use MatIconModule instead of MatIcon
    NgChartjsModule // No need to import Chart class here
  ]
})
export class SuperAdminModule { }
