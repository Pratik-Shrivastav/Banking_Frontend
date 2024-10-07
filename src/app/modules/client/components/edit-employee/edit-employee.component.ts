import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../service/client.service';
import { Employee } from '../../../../models/employee'; // Adjust path as necessary

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  employeeId!: number;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.employeeId = Number(this.route.snapshot.paramMap.get('id')); // Get the ID from route parameters
    this.initializeForm();
    this.getEmployee();
  }

  initializeForm() {
    this.employeeForm = this.fb.group({
      employeeId: [0],
      name: ['', Validators.required],
      email:['',Validators.required],
      designation: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]],
      accountDetailsObject: this.fb.group({
        id: [0],
        accountNumber: ['', Validators.required],
        ifsc: ['', Validators.required],
        branch: ['', Validators.required],
      }),
      isActive: [true]
    });
  }

  getEmployee(): void {
    this.clientService.getEmployeeById(this.employeeId).subscribe(employee => {
      this.employeeForm.patchValue(employee); // Populate form with employee data
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const updatedEmployee = this.employeeForm.value;
      this.clientService.updateEmployee(this.employeeId, updatedEmployee).subscribe(() => {
        alert("Employee updated successfully");
        this.router.navigate(['/Client/view-employees']); // Redirect to the view employees page
      }, error => {
        console.error('Error updating employee', error);
      });
    }
  }
}
