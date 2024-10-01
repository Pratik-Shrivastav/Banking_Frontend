import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../service/client.service';  // Adjust path if necessary
import { Employee } from '../../../../models/employee'; // Import the employee model

@Component({
  selector: 'app-view-employees',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeesComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.clientService.getEmployees().subscribe(
      (data) => {
        this.employees = data;
      },
      (error) => {
        console.error('Error fetching employees', error);
      }
    );
  }
}
