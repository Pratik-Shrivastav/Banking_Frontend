import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankRoutingModule } from './bank-routing.module';
import { BankDashboardComponent } from './components/bank-dashboard/bank-dashboard.component';
import { MatCard, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatCardContent } from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';
import { ViewClientSucessComponent } from './components/view-client-sucess/view-client-sucess.component';
import { ViewClientPendingComponent } from './components/view-client-pending/view-client-pending.component';
import { ViewpendingpaymentComponent } from './components/viewpendingpayment/viewpendingpayment.component';
import { ViewsuccesspaymentComponent } from './components/viewsuccesspayment/viewsuccesspayment.component';
import { ViewSuccessSalaryComponent } from './components/view-success-salary/view-success-salary.component';
import { ViewPendingSalaryComponent } from './components/view-pending-salary/view-pending-salary.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
  declarations: [
    BankDashboardComponent,
    ViewClientSucessComponent,
    ViewClientPendingComponent,
    ViewpendingpaymentComponent,
    ViewsuccesspaymentComponent,
    ViewSuccessSalaryComponent,
    ViewPendingSalaryComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    BankRoutingModule,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatIcon,
    MatProgressSpinnerModule,
    FormsModule,
    MatDialogModule
  ]
})
export class BankModule { }
