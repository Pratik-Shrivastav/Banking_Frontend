import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../service/client.service';

@Component({
  selector: 'app-add-beneficiary',
  templateUrl: './add-beneficiary.component.html',
  styleUrls: ['./add-beneficiary.component.css']
})
export class AddBeneficiaryComponent implements OnInit {
  beneficiaryForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.beneficiaryForm = this.fb.group({
      benificiaryName: ['', Validators.required], // Match with the model
      accountDetailsObject: this.fb.group({       // Create a FormGroup for account details
        id: [0],                                   // Optional ID for new account details
        accountNumber: ['', Validators.required],   // Required field
        ifsc: ['', Validators.required],           // Required field
        branch: ['', Validators.required],         // Required field
      }),
      createdOn: [new Date().toISOString()],      // Optional if you want to handle it in the backend
      isActive: [true]                            // Default value
    });
  }

  onSubmit(): void {
    if (this.beneficiaryForm.valid) {
      const beneficiaryData = this.beneficiaryForm.value; // Get the form value
      
      beneficiaryData.createdOn = new Date().toISOString(); // Set createdOn date

      this.clientService.addBeneficiary(beneficiaryData).subscribe(
        () => {
          alert("Beneficiary Added Successfully");
          this.router.navigate(['/Client']);  // Navigate back to dashboard after submission
        },
        error => {
          console.error('Error adding beneficiary', error);
        }
      );
      console.log(this.beneficiaryForm.controls);
    }
  }
}
