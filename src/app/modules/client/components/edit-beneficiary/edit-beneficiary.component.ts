import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../service/client.service';
import { Beneficiary } from '../../../../models/beneficiary'; // Adjust path as necessary

@Component({
  selector: 'app-edit-beneficiary',
  templateUrl: './edit-beneficiary.component.html',
  styleUrls: ['./edit-beneficiary.component.css']
})
export class EditBeneficiaryComponent implements OnInit {
  beneficiaryForm!: FormGroup;
  beneficiaryId!: number;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.beneficiaryId = Number(this.route.snapshot.paramMap.get('id')); // Get the ID from route parameters
    this.initializeForm();
    this.getBeneficiary();
  }

  initializeForm() {
    this.beneficiaryForm = this.fb.group({
      id: [0],
      benificiaryName: ['', Validators.required],
      accountDetailsObject: this.fb.group({
        id: [0],
        accountNumber: ['', Validators.required],
        ifsc: ['', Validators.required],
        branch: ['', Validators.required],
      }),
      createdOn: [new Date().toISOString()],
      isActive: [true]
    });
  }

  getBeneficiary(): void {
    this.clientService.getBeneficiaryById(this.beneficiaryId).subscribe(beneficiary => {
      this.beneficiaryForm.patchValue(beneficiary); // Populate form with beneficiary data
    });
  }

  onSubmit(): void {
    if (this.beneficiaryForm.valid) {
      const updatedBeneficiary = this.beneficiaryForm.value;
      this.clientService.updateBeneficiary(this.beneficiaryId, updatedBeneficiary).subscribe(() => {
        alert("Beneficiary updated successfully");
        this.router.navigate(['/Client/view-beneficiaries']); // Redirect to the view beneficiaries page
      }, error => {
        console.error('Error updating beneficiary', error);
      });
    }
  }
}
