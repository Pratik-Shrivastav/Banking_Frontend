import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankDashboardComponent } from './components/bank-dashboard/bank-dashboard.component';
import { ViewClientPendingComponent } from './components/view-client-pending/view-client-pending.component';
import { ViewClientSucessComponent } from './components/view-client-sucess/view-client-sucess.component';
import { NavbarComponent } from './components/navbar/navbar.component';

const routes: Routes = [
  {path:"", component:BankDashboardComponent},
  {path:'navbar',component:NavbarComponent},
  {
    path:"PendingClient/:clientId",
    component: ViewClientPendingComponent
  },
  {
    path:"SuccessClient/:clientId",
    component:ViewClientSucessComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankRoutingModule { }
