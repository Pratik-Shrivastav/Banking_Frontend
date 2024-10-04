import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperAdminDashboardComponent } from './components/super-admin-dashboard/super-admin-dashboard.component';
import { ViewClientComponent } from './components/view-client/view-client.component';
import { ClientsComponent } from './components/clients/clients.component';
import { PendingRequestComponent } from './components/pending-request/pending-request.component';
import { DisplayPendingClientComponent } from './components/display-pending-client/display-pending-client.component';
import { ReportsComponent } from './components/reports/reports.component';
import { NavbarComponent } from './components/navbar/navbar.component';
const routes: Routes = [
  {path:"", component:SuperAdminDashboardComponent},
  {
    path:"ViewClients", component:ClientsComponent
  },
  {
    path:"Pending", component:PendingRequestComponent
  },
  {
    path:'Reports',component:ReportsComponent
  },
  {
    path:'Navbar',component:NavbarComponent
  },
  {
    path:"ViewClient/:clientId", component:ViewClientComponent
  },
  {
    path:"DisplayPendingClient/:clientId", component:DisplayPendingClientComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
