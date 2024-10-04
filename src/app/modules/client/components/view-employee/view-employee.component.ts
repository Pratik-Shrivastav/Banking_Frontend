import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from '../../service/client.service'; // Adjust path if necessary
import { Employee } from '../../../../models/employee'; // Import the employee model
import { MatPaginator } from '@angular/material/paginator'; // Import MatPaginator
import { PageEvent } from '@angular/material/paginator'; // Import PageEvent

@Component({
  selector: 'app-view-employees',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeesComponent implements OnInit {
  employees: Employee[] = [];
  displayedEmployees: Employee[] = []; // To store the paginated data
  pageSize = 5; // Number of entries per page
  pageIndex = 0; // Current page index

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Get the paginator reference

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.clientService.getEmployees().subscribe(
      (data: Employee[]) => {
        this.employees = data.filter(employee => employee.isActive);
        this.updateDisplayedEmployees(); // Update displayed employees after fetching
      },
      (error) => {
        console.error('Error fetching employees', error);
      }
    );
  }

  updateDisplayedEmployees() {
    const startIndex = this.pageIndex * this.pageSize;
    this.displayedEmployees = this.employees.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex; // Update page index
    this.pageSize = event.pageSize; // Update page size
    this.updateDisplayedEmployees(); // Update displayed employees
  }

  deleteEmployee(id: number): void {
    if (confirm("Are you sure you want to delete this employee?")) {
      this.clientService.deleteEmployee(id).subscribe(() => {
        alert("Employee deleted successfully");
        this.getEmployees(); // Refresh the list
      }, error => {
        console.error("Error deleting employee", error);
      });
    }
  }
}
