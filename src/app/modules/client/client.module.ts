import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientdashboardComponent } from './components/clientdashboard/clientdashboard.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { AddBeneficiaryComponent } from './components/add-beneficiary/add-beneficiary.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewEmployeesComponent } from './components/view-employee/view-employee.component';
import { ViewBeneficiariesComponent } from './components/view-beneficiary/view-beneficiary.component';
import { EditBeneficiaryComponent } from './components/edit-beneficiary/edit-beneficiary.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { SalaryDisbursementComponent } from './components/salary-disbursement/salary-disbursement.component';
import { MakePaymentComponent } from './components/make-payment/make-payment.component';
import { ViewRecentComponent } from './components/view-recent/view-recent.component';
import { DetailsModalComponent } from './components/details-modal/details-modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCard } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatCardHeader } from '@angular/material/card';
import { MatCardActions } from '@angular/material/card';
import { MatCardTitle } from '@angular/material/card';
import { MatCardContent } from '@angular/material/card';
import { MatOption } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';
import { ReportsStatisticsComponent } from './components/reports-statistics/reports-statistics.component';
import { NgChartjsModule } from 'ng-chartjs';
import { AuditLogComponent } from './components/audit-logs/audit-logs.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatTable } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator'; // Import MatPaginatorModule
import { MatTableModule } from '@angular/material/table'; // Import MatTableModule
@NgModule({
  declarations: [
    ClientdashboardComponent,
    AddEmployeeComponent,
    AddBeneficiaryComponent,
    ViewEmployeesComponent,
    ViewBeneficiariesComponent,
    EditBeneficiaryComponent,
    EditEmployeeComponent,
    SalaryDisbursementComponent,
    MakePaymentComponent,
    ViewRecentComponent,
    DetailsModalComponent,
    ReportsStatisticsComponent,
    AuditLogComponent,
    NavbarComponent,
    
    
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCard,
    MatCheckbox,
    MatCardActions,
    MatCardContent,
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    MatOption,
    MatCardModule,
    MatSelect,
    MatIcon,
    NgChartjsModule,
    MatToolbarModule,
    MatTable,
    MatPaginatorModule,
    MatTableModule

    
    

  ]
})
export class ClientModule { }
