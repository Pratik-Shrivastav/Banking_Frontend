import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SuperAdminService } from '../../service/super-admin.service';
import { ToastService } from '../../../../service/toast.service';

declare var paypal: any; // Declare PayPal variable

@Component({
  selector: 'app-view-payment',
  templateUrl: './view-payment.component.html',
  styleUrls: ['./view-payment.component.css'] // Fix styleUrls typo
})
export class ViewPaymentComponent implements OnInit {
  constructor(
    private superAdminService: SuperAdminService,
    public dialogRef: MatDialogRef<ViewPaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toast:ToastService
  ) {}

  ngOnInit(): void {
    // Load PayPal script
    const script = document.createElement('script');
    script.src = "https://www.paypal.com/sdk/js?client-id=ARZtSfFk8EGczNANZ5TstL8fI9ccl82exlcxVjKMLnos2DjFZtBwwpQMtrsRA_rVX4DYPorO6yBvpsvT&currency=USD"; // Replace with your client ID
    script.onload = () => this.initPayPalButton();
    document.body.appendChild(script);
  }

  get benificiary() {
    return this.data.benificiary;
  }

  get payment() {
    return this.data.payment;
  }

  get clientId() {
    return this.data.clientId;
  }

  initPayPalButton() {
    paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: this.payment.amount.toString() // Use payment amount
            }
          }]
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          console.log('Transaction completed by ' + details.payer.name.given_name);
          this.handlePaymentResponse(true); // Payment approved
        });
      },
      onCancel: (data: any) => {
        console.log('Transaction was canceled.');
        this.handlePaymentResponse(false); // Payment canceled
      },
      onError: (err: any) => {
        console.error('Error during the transaction', err);
        this.handlePaymentResponse(false); // Payment error
      }
    }).render('#paypal-button-container'); // Ensure the PayPal button renders correctly
  }

  handlePaymentResponse(isApproved: boolean) {
    if (isApproved) {
      // Call the method to update the payment status
      this.superAdminService.paymentStatus(this.payment.id, this.benificiary.id, "Success", this.clientId).subscribe(
        (response) => {
          console.log(response);
          this.toast.showToast("Payment Successful")
          this.dialogRef.close('approved');
        },
        (err) => {
          this.toast.showToast('Insufficient Balance');
          console.log("Cannot Update ", err);
        }
      );
    } else {
      // Handle rejection or cancellation
      this.superAdminService.paymentStatus(this.payment.id, this.benificiary.id, "Reject", this.clientId).subscribe(
        (response) => {
          console.log(response);
          this.toast.showToast("Payment Rejected");
          this.dialogRef.close('rejected');
        },
        (err) => {
          console.log("Cannot Update ", err);
        }
      );
    }
  }

  reject() {
    console.log('Payment Rejected:', this.data);
    this.superAdminService.paymentStatus(this.payment.id, this.benificiary.id, "Reject", this.clientId).subscribe(
      (response) => {
        this.toast.showToast("Payment Rejected")
        console.log(response);
      },
      (err) => {
        console.log("Cannot Update ", err);
      }
    );
    this.dialogRef.close('rejected');
  }
}
