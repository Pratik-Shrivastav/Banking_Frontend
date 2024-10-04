import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from '../../service/client.service';  
import { Employee } from '../../../../models/employee';  
import { MatPaginator } from '@angular/material/paginator';  
import { PageEvent } from '@angular/material/paginator';  
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-employees',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeesComponent implements OnInit {
  employees: Employee[] = [];
  displayedEmployees: Employee[] = [];  
  totalEmployeesCount: number = 0;  
  pageSize = 5;  
  pageIndex = 1;  
  searchForm:FormGroup;
  searchTerm: string = '';  // Declare searchTerm

  @ViewChild(MatPaginator) paginator!: MatPaginator;  
  constructor(private fb:FormBuilder,private clientService: ClientService, private router:Router) 
  {
    this.searchForm = this.fb.group({
      searchTerm: [''] 
    });
   }

 

  ngOnInit(): void {
    this.getEmployeesPaged(this.pageIndex, this.pageSize);
    this.searchForm.get('searchTerm')?.valueChanges
      .pipe(debounceTime(500)) 
      .subscribe(() => this.onSearch());
  }

 
  
  getEmployeesPaged(pageIndex: number, pageSize: number): void {
    this.clientService.getEmployeesPaged(pageIndex, pageSize).subscribe(
      (data: any) => {
        console.log(data)
        this.employees = data.employees;
        this.displayedEmployees = this.employees;
        console.log((this.employees));
        
        this.totalEmployeesCount = data.totalCount;  
        this.displayedEmployees = this.employees;  
      },
      (error) => {
        console.error('Error fetching employees', error);
      }
    );
  }
  
  onSearch(): void {
    const searchTerm = this.searchForm.get('searchTerm')?.value;
    if (searchTerm) {
      this.clientService.searchEmployeesPaged(searchTerm).subscribe((clientsByName) => {
        console.log(clientsByName);
        
        this.employees = clientsByName;
      });
    } else {
      this.employees = this.displayedEmployees;
    }
  }
  

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex + 1;  
    this.pageSize = event.pageSize;  
    this.getEmployeesPaged(this.pageIndex, this.pageSize);  
  }

  deleteEmployee(id: number): void {
    if (confirm("Are you sure you want to delete this employee?")) {
      this.clientService.deleteEmployee(id).subscribe(() => {
        alert("Employee deleted successfully");
        this.getEmployeesPaged(this.pageIndex, this.pageSize);  
      }, error => {
        console.error("Error deleting employee", error);
      });
    }
  }
}
