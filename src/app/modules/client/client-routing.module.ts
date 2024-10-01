import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientdashboardComponent } from './components/clientdashboard/clientdashboard.component';

const routes: Routes = [
  {
    path:"", component:ClientdashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
