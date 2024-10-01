import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperAdminDashboardComponent } from './components/super-admin-dashboard/super-admin-dashboard.component';
import { ViewClientComponent } from './components/view-client/view-client.component';
import { ClientsComponent } from './components/clients/clients.component';
import { PendingRequestComponent } from './components/pending-request/pending-request.component';

const routes: Routes = [
  {path:"", component:SuperAdminDashboardComponent},
  {
    path:"ViewClients", component:ClientsComponent
  },
  {
    path:"Pending", component:PendingRequestComponent
  },
  {
    path:"ViewClient/:clientId", component:ViewClientComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
