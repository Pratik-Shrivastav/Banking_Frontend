import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../../service/client.service'; // Update with your service path
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import for Reactive Forms
import { Payment } from '../../../../models/payment'; // Update with your Payment model

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.css']
})
export class MakePaymentComponent implements OnInit {
  paymentForm!: FormGroup; // FormGroup to manage the form
  beneficiaries: any[] = [];  // List of beneficiaries

  constructor(
    private clientService: ClientService,
    private fb: FormBuilder, // FormBuilder for form controls
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize the form
    this.paymentForm = this.fb.group({
      paymentType: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(1)]],
      beneficiaryId: ['', Validators.required]
    });

    // Load beneficiaries on component initialization
    this.loadBeneficiaries();
  }

  // Load beneficiaries for the client
  loadBeneficiaries(): void {
    this.clientService.getBeneficiaries().subscribe(
      (data: any) => {
        this.beneficiaries = data;
        console.log('Beneficiaries loaded:', this.beneficiaries); // Log the loaded beneficiaries
      },
      error => {
        console.error('Error fetching beneficiaries', error);
      }
    );
  }

  // Submit the payment form
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
      approvedAt: "", // Set to null if no approval yet
      transactions: []
    };

    const beneficiaryId = this.paymentForm.value.beneficiaryId;
    console.log(beneficiaryId);
    

    this.clientService.makePayment(payment, beneficiaryId).subscribe(
      response => {
        alert('Payment successful!');
        this.router.navigate(['/Client']);
      },
      error => {
        console.error('Error making payment', error);
        alert('Payment failed.');
      }
    );
  }
}
