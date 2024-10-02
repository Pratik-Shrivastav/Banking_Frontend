import { Component, Inject } from '@angular/core';
import { SuperAdminService } from '../../service/super-admin.service';
import { ViewPaymentComponent } from '../view-payment/view-payment.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-success-payment',
  templateUrl: './view-success-payment.component.html',
  styleUrl: './view-success-payment.component.css'
})
export class ViewSuccessPaymentComponent {
  
  constructor(
    private superAdminService:SuperAdminService,
    public dialogRef: MatDialogRef<ViewPaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public payment: any
  ) {}

}
