import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-viewsuccesspayment',
  templateUrl: './viewsuccesspayment.component.html',
  styleUrl: './viewsuccesspayment.component.css'
})
export class ViewsuccesspaymentComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewsuccesspaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public payment: any
  ) {}

}
