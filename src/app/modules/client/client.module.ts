import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientdashboardComponent } from './components/clientdashboard/clientdashboard.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { AddBeneficiaryComponent } from './components/add-beneficiary/add-beneficiary.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewEmployeesComponent } from './components/view-employee/view-employee.component';
import { ViewBeneficiariesComponent } from './components/view-beneficiary/view-beneficiary.component';

@NgModule({
  declarations: [
    ClientdashboardComponent,
    AddEmployeeComponent,
    AddBeneficiaryComponent,
    ViewEmployeesComponent,
    ViewBeneficiariesComponent
    
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule
    

  ]
})
export class ClientModule { }
