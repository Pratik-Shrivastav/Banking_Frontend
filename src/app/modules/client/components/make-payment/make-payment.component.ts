import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientService } from '../../service/client.service'; // Adjust as per your path
import { Payment } from '../../../../models/payment'; // Update with your Payment model

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.css']
})
export class MakePaymentComponent implements OnInit {
  paymentForm!: FormGroup;
  beneficiaryControl = new FormControl('');  // Control for the searchable input
  beneficiaries: any[] = [];
  filteredBeneficiaries: any[] = [];

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      paymentType: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(1)]],
      beneficiaryId: ['', Validators.required]
    });

    this.loadBeneficiaries();

    // Initialize the beneficiary search to show all at first
    this.beneficiaryControl.valueChanges.subscribe(value => {
      this.filterBeneficiaries(value);  // Pass the search term
    });
  }

  loadBeneficiaries(): void {
    this.clientService.getBeneficiaries().subscribe(
      (data: any) => {
        this.beneficiaries = data;
        this.filteredBeneficiaries = this.beneficiaries;
      },
      error => {
        console.error('Error fetching beneficiaries', error);
      }
    );
  }

  // Filter beneficiaries based on search input
  filterBeneficiaries(search: string | null): void {
    if (!search) {
      this.filteredBeneficiaries = this.beneficiaries;
    } else {
      this.filteredBeneficiaries = this.beneficiaries.filter(beneficiary =>
        beneficiary.benificiaryName.toLowerCase().includes(search.toLowerCase())
      );
    }
  }

  // Set the selected beneficiary's id in the payment form
  onSelectBeneficiary(event: any): void {
    if (event.isUserInput) {
      this.paymentForm.patchValue({ beneficiaryId: event.source.value });
    }
  }

  onSubmit(): void {
    if (this.paymentForm.invalid) {
      alert('Please fill in all required fields.');
      return;
    }

    const payment: Payment = {
      id: 0,
      paymentType: this.paymentForm.value.paymentType,
      amount: this.paymentForm.value.amount,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      approvedBy: 0,
      approvedAt: '',
      transactions: []
    };

    const beneficiaryId = this.paymentForm.value.beneficiaryId;
    console.log('Beneficiary ID:', beneficiaryId);

    this.clientService.makePayment(payment, beneficiaryId).subscribe(
      response => {
        alert('Payment sent for approval!');
      },
      error => {
        console.error('Error making payment', error);
        alert('Payment failed.');
      }
    );
  }
}
