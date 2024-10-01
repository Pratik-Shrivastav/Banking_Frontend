import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientdashboardComponent } from './components/clientdashboard/clientdashboard.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { AddBeneficiaryComponent } from './components/add-beneficiary/add-beneficiary.component';
import { ViewEmployeesComponent } from './components/view-employee/view-employee.component';
import { ViewBeneficiariesComponent } from './components/view-beneficiary/view-beneficiary.component';

const routes: Routes = [
  { path: '', component: ClientdashboardComponent },
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: 'add-beneficiary', component: AddBeneficiaryComponent },
  { path: 'view-employees', component: ViewEmployeesComponent },
  { path: 'view-beneficiaries', component: ViewBeneficiariesComponent },
 
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
