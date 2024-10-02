import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SuperAdminService } from '../../service/super-admin.service';
import { ViewPaymentComponent } from '../view-payment/view-payment.component';

@Component({
  selector: 'app-view-success-salary-disbursement',
  templateUrl: './view-success-salary-disbursement.component.html',
  styleUrl: './view-success-salary-disbursement.component.css'
})
export class ViewSuccessSalaryDisbursementComponent {

  constructor(
    private superAdminService:SuperAdminService,
    public dialogRef: MatDialogRef<ViewPaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public salaryDisbursement: any
  ) {
    console.log(salaryDisbursement);
    
  }
}
