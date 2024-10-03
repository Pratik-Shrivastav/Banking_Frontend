import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-viewpendingpayment',
  templateUrl: './viewpendingpayment.component.html',
  styleUrl: './viewpendingpayment.component.css'
})
export class ViewpendingpaymentComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewpendingpaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  get benificiary() {
    return this.data.benificiary;
  }

  get payment() {
    return this.data.payment;
  }

}
