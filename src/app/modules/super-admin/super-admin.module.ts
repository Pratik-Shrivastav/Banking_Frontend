import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { SuperAdminDashboardComponent } from './components/super-admin-dashboard/super-admin-dashboard.component';
import { ViewClientComponent } from './components/view-client/view-client.component';
import { ClientsComponent } from './components/clients/clients.component';
import { PendingRequestComponent } from './components/pending-request/pending-request.component';
import { ApprovedPaymentComponent } from './components/approved-payment/approved-payment.component';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    SuperAdminDashboardComponent,
    ViewClientComponent,
    ClientsComponent,
    PendingRequestComponent,
    ApprovedPaymentComponent
  ],
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    MatCardModule
  ]
})
export class SuperAdminModule { }
