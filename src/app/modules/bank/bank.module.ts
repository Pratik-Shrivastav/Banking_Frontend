import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankRoutingModule } from './bank-routing.module';
import { BankDashboardComponent } from './components/bank-dashboard/bank-dashboard.component';


@NgModule({
  declarations: [
    BankDashboardComponent
  ],
  imports: [
    CommonModule,
    BankRoutingModule
  ]
})
export class BankModule { }
