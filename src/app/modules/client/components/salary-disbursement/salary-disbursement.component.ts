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
  selectAll: boolean = false; // Track the state of the "Select All" checkbox
  router: Router;
allSelected: any;
  status: string | undefined;

  constructor(private clientService: ClientService, private _router: Router) {
    this.router = _router;
  }

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

  // Function to handle individual employee selection changes
  onEmployeeSelectionChange(employeeId: number, event: MatCheckboxChange): void {
    const isChecked = event.checked;
    if (isChecked) {
      this.selectedEmployeeIds.push(employeeId);
    } else {
      const index = this.selectedEmployeeIds.indexOf(employeeId);
      if (index !== -1) {
        this.selectedEmployeeIds.splice(index, 1);
      }
    }

    // Update selectAll state based on employee selection
    this.selectAll = this.selectedEmployeeIds.length === this.employees.length;

    // Recalculate total salary
    this.calculateTotalSalary();
  }

  // Function to handle the "Select All" checkbox toggle
  toggleSelectAll(): void {
    this.selectAll = !this.selectAll;
    
    if (this.selectAll) {
      // If "Select All" is checked, add all employee IDs to selectedEmployeeIds
      this.selectedEmployeeIds = this.employees.map(emp => emp.employeeId!);
    } else {
      // If "Select All" is unchecked, clear selectedEmployeeIds
      this.selectedEmployeeIds = [];
    }

    // Mark all employees as selected/deselected
    this.employees.forEach(emp => emp.selected = this.selectAll);

    // Recalculate total salary
    this.calculateTotalSalary();
  }

  // Helper function to calculate total salary of selected employees
  calculateTotalSalary(): void {
    this.totalSalary = this.employees
      .filter(emp => this.selectedEmployeeIds.includes(emp.employeeId!))
      .reduce((sum, emp) => sum + emp.salary, 0);
  }

  // Function to disburse selected employee salaries
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
        this.router.navigate(['/Client']);
      },
      error => {
        console.error('Error disbursing salaries', error);
        alert('Failed to disburse salaries. Please try again.');
      }
    );
  }
}
