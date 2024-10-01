import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../service/client.service';
import { Employee } from '../../../../models/employee';

@Component({
  selector: 'app-salary-disbursement',
  templateUrl: './salary-disbursement.component.html',
  styleUrls: ['./salary-disbursement.component.css']
})
export class SalaryDisbursementComponent implements OnInit {
  employees: Employee[] = [];
  selectedEmployeeIds: number[] = [];
  totalSalary: number = 0;

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.clientService.getEmployees().subscribe(
      (data: Employee[]) => {
        this.employees = data;
      },
      (error) => {
        console.error('Error fetching employees', error);
      }
    );
  }

  onEmployeeSelectionChange(employeeId: number, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
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
        this.getEmployees(); // Optionally refresh employee list
      },
      error => {
        console.error('Error disbursing salaries', error);
        alert('Failed to disburse salaries. Please try again.');
      }
    );
  }
}
