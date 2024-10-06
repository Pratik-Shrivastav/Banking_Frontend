import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../service/client.service'; // Adjust path if necessary
import { Employee } from '../../../../models/employee'; // Import the Employee model
import { ToastService } from '../../../../service/toast.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  employeeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router,
    private toast:ToastService
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      employeeId: [0],  // Optional, but defaults to 0 for new employees
      name: ['', Validators.required],
      email:['',Validators.required],
      designation: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]],
      accountDetailsObject: this.fb.group({   // Nesting account details inside a group
        id: [0], // Optional for new account details
        accountNumber: ['', Validators.required],
        ifsc: ['', Validators.required],
        branch: ['', Validators.required],
        accountBalance:0
      }),
      isActive: [true],  // Defaulting to true
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
        const employeeData: Employee = this.employeeForm.value;
        
        // Make sure salary is a number
        employeeData.salary = +employeeData.salary; // Convert to number
        
        this.clientService.addEmployee(employeeData).subscribe(
            () => {
              alert('Employee Added Successfully');
                this.router.navigate(['/Client']);
            },
            error => {
                console.error('Error adding employee', error);
                this.toast.showToast("Invalid IFSC Code")
            }
        );
    }
}

}
