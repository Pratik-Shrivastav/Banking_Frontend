import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from '../../service/client.service';  // Adjust path if necessary
import { Employee } from '../../../../models/employee';  // Import the employee model
import { MatPaginator } from '@angular/material/paginator';  // Import MatPaginator
import { PageEvent } from '@angular/material/paginator';  // Import PageEvent

@Component({
  selector: 'app-view-employees',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeesComponent implements OnInit {
  employees: Employee[] = [];
  displayedEmployees: Employee[] = [];  // To store the paginated data
  totalEmployeesCount: number = 0;  // Total count of employees from the API
  pageSize = 5;  // Number of entries per page
  pageIndex = 1;  // Current page index

  @ViewChild(MatPaginator) paginator!: MatPaginator;  // Get the paginator reference

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.getEmployeesPaged(this.pageIndex, this.pageSize);
  }

  // Modify to accept pagination parameters
  getEmployeesPaged(pageIndex: number, pageSize: number): void {
    this.clientService.getEmployeesPaged(pageIndex, pageSize).subscribe(
      (data: any) => {
        console.log('API Response:', data);  // Log the full API response
        
        // Ensure data contains employees array and total count
        if (data && Array.isArray(data.employees)) {
          this.employees = data.employees.filter((employee: { isActive: boolean; }) => employee.isActive);
          this.totalEmployeesCount = data.totalCount;  // Set the total count for pagination
          this.displayedEmployees = this.employees;  // Display current page employees
        } else {
          console.error('Error: Expected employees array but received', data);
        }
      },
      (error) => {
        console.error('Error fetching employees', error);
      }
    );
  }

  // Handle page change and fetch data for that page
  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex + 1;  // Update page index
    this.pageSize = event.pageSize;  // Update page size
    this.getEmployeesPaged(this.pageIndex, this.pageSize);  // Fetch the new page data
  }

  deleteEmployee(id: number): void {
    if (confirm("Are you sure you want to delete this employee?")) {
      this.clientService.deleteEmployee(id).subscribe(() => {
        alert("Employee deleted successfully");
        this.getEmployeesPaged(this.pageIndex, this.pageSize);  // Refresh the list
      }, error => {
        console.error("Error deleting employee", error);
      });
    }
  }
}
