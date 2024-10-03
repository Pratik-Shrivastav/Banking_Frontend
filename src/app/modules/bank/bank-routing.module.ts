import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankDashboardComponent } from './components/bank-dashboard/bank-dashboard.component';

const routes: Routes = [
  {path:"", component:BankDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankRoutingModule { }
