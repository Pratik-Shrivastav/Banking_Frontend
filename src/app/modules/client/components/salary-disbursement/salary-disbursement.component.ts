import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../service/client.service';
import { Employee } from '../../../../models/employee';
import { MatCheckboxChange } from '@angular/material/checkbox'; // Import MatCheckboxChange
import { Router } from '@angular/router';

@Component({
  selector: 'app-salary-disbursement',
  templateUrl: './salary-disbursement.component.html',
  styleUrls: ['./salary-disbursement.component.css']
})
export class SalaryDisbursementComponent implements OnInit {
  employees: Employee[] = [];
  selectedEmployeeIds: number[] = [];
  totalSalary: number = 0;
  router: any;
  status: string | undefined;
  

  constructor(private clientService: ClientService,
    router:Router
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.clientService.getEmployees().subscribe(
      (data: Employee[]) => {
        this.employees = data.filter(emp => emp.isActive); // Filter to get only active employees
      },
      (error) => {
        console.error('Error fetching employees', error);
      }
    );
  }

  // Change the parameter type to MatCheckboxChange
  onEmployeeSelectionChange(employeeId: number, event: MatCheckboxChange): void {
    const isChecked = event.checked; // Use event.checked instead of event.target.checked
    if (isChecked) {
      this.selectedEmployeeIds.push(employeeId);
    } else {
      const index = this.selectedEmployeeIds.indexOf(employeeId);
      if (index !== -1) {
        this.selectedEmployeeIds.splice(index, 1);
      }
    }

    // Recalculate total salary
    this.totalSalary = this.employees
      .filter(emp => this.selectedEmployeeIds.includes(emp.employeeId!))
      .reduce((sum, emp) => sum + emp.salary, 0);
  }

  disburseSalaries(): void {
    if (this.selectedEmployeeIds.length === 0) {
      alert('No employees selected for salary disbursement.');
      return;
    }

    const salaryDisbursementRequest = {
      amount: this.totalSalary,
      employeeIds: this.selectedEmployeeIds
    };

    console.log('Salary Disbursement Request:', salaryDisbursementRequest);

    this.clientService.disburseSalaries(salaryDisbursementRequest).subscribe(
      (res) => {
        alert('Salaries disbursed successfully!');
        this.selectedEmployeeIds = []; // Clear selected employees
        this.totalSalary = 0; // Reset total salary
        this.getEmployees();
        this.router.navigate[('/Client')]
         // Optionally refresh employee list
      },
      error => {
        console.error('Error disbursing salaries', error);
        alert('Failed to disburse salaries. Please try again.');
      }
    );
  }
}
