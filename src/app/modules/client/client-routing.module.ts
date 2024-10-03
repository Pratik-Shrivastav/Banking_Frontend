import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientdashboardComponent } from './components/clientdashboard/clientdashboard.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { AddBeneficiaryComponent } from './components/add-beneficiary/add-beneficiary.component';
import { ViewEmployeesComponent } from './components/view-employee/view-employee.component';
import { ViewBeneficiariesComponent } from './components/view-beneficiary/view-beneficiary.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { EditBeneficiaryComponent } from './components/edit-beneficiary/edit-beneficiary.component';
import { SalaryDisbursementComponent } from './components/salary-disbursement/salary-disbursement.component';
import { MakePaymentComponent } from './components/make-payment/make-payment.component';
import { ViewRecentComponent } from './components/view-recent/view-recent.component';
import { ReportsStatisticsComponent } from './components/reports-statistics/reports-statistics.component';
const routes: Routes = [
  { path: '', component: ClientdashboardComponent },
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: 'add-beneficiary', component: AddBeneficiaryComponent },
  { path: 'view-employees', component: ViewEmployeesComponent },
  { path: 'view-beneficiaries', component: ViewBeneficiariesComponent },
  { path: 'disburse-salary', component:SalaryDisbursementComponent},
  { path: 'make-payment', component: MakePaymentComponent },
  {path: 'recent-transactions',component:ViewRecentComponent },
  {path:'reports-statistics',component:ReportsStatisticsComponent},
  { path: 'edit-employee/:id', component: EditEmployeeComponent }, // New route for editing employee
  { path: 'edit-beneficiary/:id', component: EditBeneficiaryComponent }
  
 
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
